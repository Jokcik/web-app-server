import { Injectable } from '@nestjs/common';

@Injectable()
export class RatingService {

  public getRating(levelCompetition: number, placeCompetition: number) {
    return levelCompetition * placeCompetition;
  }
}
