import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: DbService) {}

  async getQuestions(
    page: number,
    userId: string,
    category: string,
    search?: string,
  ) {
    const whereParams = {
      categories: {
        has: category,
      },
    };
    if (search) {
      whereParams['OR'] = [
        { text: { contains: search } },
        { answers: { some: { text: { contains: search } } } },
      ];
    }
    const questions = await this.prisma.question.findMany({
      take: 20,
      skip: (page - 1) * 20,
      where: whereParams,
      include: {
        answers: {
          include: {
            userAnswers: {
              where: {
                userId: userId,
              },
            },
          },
        },
      },
    });
    const count = await this.prisma.question.count({
      where: whereParams,
    });
    return { questions, count };
  }

  async getRandomSet(category: string) {
    const everyIdInTable = await this.prisma.question.findMany({
      select: { id: true },
      where: {
        categories: {
          has: category,
        },
      },
    });
    const idArray = everyIdInTable.map((element) => element.id);
    const questionsIds = [];
    for (let i = 0; i < 32; i++) {
      const randomIndex = Math.floor(Math.random() * idArray.length);
      const randomIdFromTable = idArray[randomIndex];
      if (!questionsIds.includes(randomIdFromTable)) {
        questionsIds.push(randomIdFromTable);
      }
    }
    const questions = await this.prisma.question.findMany({
      where: {
        id: {
          in: questionsIds,
        },
      },
      include: {
        answers: true,
      },
    });
    return questions.map((question) => ({
      ...question,
      answers: question.answers.sort(() => Math.random() - 0.5),
    }));
  }

  async getRandomUnansweredQuestion(userId: string, category: string) {
    const answeredQuestions = await this.prisma.userAnswer.findMany({
      where: {
        userId,
        answer: {
          question: {
            categories: {
              has: category,
            },
          },
        },
      },
      select: {
        answer: {
          select: {
            questionId: true,
          },
        },
      },
    });
    const answeredQuestionIds = answeredQuestions.map(
      (a) => a.answer.questionId,
    );
    const allQuestions = await this.prisma.question.findMany({
      select: {
        id: true,
      },
      where: {
        categories: {
          has: category,
        },
        id: {
          notIn: answeredQuestionIds,
        },
      },
    });
    const allQuestionIds = allQuestions.map((q) => q.id);
    const randomIndex = Math.floor(Math.random() * allQuestionIds.length);
    const question = await this.prisma.question.findFirst({
      where: {
        id: allQuestionIds[randomIndex],
      },
      include: {
        answers: true,
      },
    });
    const randomAnswersOrder = question.answers.sort(() => Math.random() - 0.5);
    return {
      ...question,
      answers: randomAnswersOrder,
    };
  }

  async getQuestionById(questionId: string, userId: string) {
    return this.prisma.question.findFirst({
      where: {
        id: questionId,
      },
      include: {
        answers: {
          include: {
            userAnswers: {
              where: {
                userId: userId,
              },
            },
          },
        },
      },
    });
  }

  async submitAnswer(userId: string, answerId: string) {
    return this.prisma.userAnswer.create({
      data: {
        userId,
        answerId,
      },
      include: {
        answer: {
          include: {
            question: true,
          },
        },
      },
    });
  }
}
