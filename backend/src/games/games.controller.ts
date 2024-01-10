import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { GamesService } from './games.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('games')
export class GamesController {
  constructor(private gamesService: GamesService) {}

  @Post('/new')
  @UseGuards(AuthGuard)
  createGame(@Body() body: CreateGameDto) {
    return this.gamesService.create(body);
  }

  @Get('/:id')
  async findGameById(@Param('id') id: string) {
    const game = await this.gamesService.findOne(parseInt(id));
    if (!game) {
      throw new NotFoundException('game not found');
    }
    return game;
  }

  @Get()
  findAllGames(@Query('genre') genre: string) {
    return this.gamesService.find(genre);
  }

  @Get('/search')
  searchGames(@Query('keyword') keyword: string) {
    return this.gamesService.findGames(keyword);
  }

  @Delete('/:id')
  removeGame(@Param('id') id: string) {
    return this.gamesService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateGame(@Param('id') id: string, @Body() body: CreateGameDto) {
    return this.gamesService.update(parseInt(id), body);
  }
}
