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
      take: 10,
      skip: (page - 1) * 10,
      where: whereParams,
      select: {
        id: true,
        text: true,
        answers: {
          select: {
            id: true,
            text: true,
            isCorrect: true,
            userAnswers: {
              where: {
                userId: userId,
              },
              select: {
                id: true,
                answerId: true,
              },
            },
          },
        },
      },
    });
    const count = await this.prisma.question.count();
    return { questions, count };
  }

  async getRandomSet(category: string) {
    return this.prisma.question.findMany({
      take: 32,
      where: {
        categories: {
          has: category,
        },
      },
      skip: Math.floor(Math.random() * 100),
      include: {
        answers: {
          select: {
            id: true,
            text: true,
          },
        },
      },
    });
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
        answerId: true,
      },
    });
    const answeredQuestionIds = answeredQuestions.map((a) => a.answerId);
    return this.prisma.question.findFirst({
      where: {
        answers: {
          none: {
            id: {
              in: answeredQuestionIds,
            },
          },
        },
        categories: {
          has: category,
        },
      },
      include: {
        answers: {
          select: {
            id: true,
            text: true,
            isCorrect: true,
          },
        },
      },
    });
  }

  async getQuestionById(questionId: string, userId: string) {
    return this.prisma.question.findFirst({
      where: {
        id: questionId,
      },
      include: {
        answers: {
          select: {
            id: true,
            text: true,
            isCorrect: true,
          },
          include: {
            userAnswers: {
              where: {
                userId: userId,
              },
              select: {
                id: true,
                answerId: true,
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
    });
  }
}
