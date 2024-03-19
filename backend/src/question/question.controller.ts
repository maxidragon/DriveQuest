import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { QuestionService } from './question.service';
import { GetUser } from '../auth/decorator/getUser.decorator';
import { JwtAuthDto } from '../auth/dto/jwt-auth.dto';
import { SubmitAnswerDto } from './dto/submitAnswer.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  async getQuestions(
    @Query('page') page: number,
    @Query('category') category: string,
    @Query('search') search: string,
    @GetUser() user: JwtAuthDto,
  ) {
    return this.questionService.getQuestions(
      page,
      user.userId,
      category,
      search,
    );
  }

  @Get('random')
  async getRandomUnansweredQuestion(@Query('category') category: string, @GetUser() user: JwtAuthDto) {
    return this.questionService.getRandomUnansweredQuestion(user.userId, category);
  }

  @Get('exam')
  async getRandomSet(@Query('category') category: string) {
    return this.questionService.getRandomSet(category);
  }

  @Post('answer')
  async submitAnswer(
    @Body() data: SubmitAnswerDto,
    @GetUser() user: JwtAuthDto,
  ) {
    return this.questionService.submitAnswer(user.userId, data.answerId);
  }
}
