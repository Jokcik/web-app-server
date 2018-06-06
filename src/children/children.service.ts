import { Model, Schema } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { CronService } from '../cron/cron.service';
import { Children, ChildrenCompetition } from './interfaces/children.interface';
import { ChildrenModelToken, InstrumentsModelToken, SpecializationModelToken } from '../constants';
import { CreateChildrenDto } from './dto/create-children.dto';
import { Specialization } from '../others/interface/specialization.interface';
import { Instruments } from '../others/interface/instruments.interface';
import { RatingService } from './rating/rating';
import * as _ from 'lodash';
import ObjectId = Schema.Types.ObjectId;
import { QueryChildrenParams } from './children.controller';

@Injectable()
export class ChildrenService {
  constructor(@Inject(ChildrenModelToken) private readonly childrenModel: Model<Children>,
              @Inject(InstrumentsModelToken) private readonly instrumentsModel: Model<Instruments>,
              @Inject(SpecializationModelToken) private readonly specializationModel: Model<Specialization>,
              private readonly cronService: CronService,
              private readonly ratingService: RatingService) {
    this.cronService.start10Min(() => this.updateRating(), this);
  }

  async findAllSpecialization() {
    return await this.specializationModel.find();
  }

  async findById(id: string) {
    return this.childrenModel.findById(id)
      .populate({path: 'instruments', populate: {path: 'specialization'}})
      .populate({path: 'schools', populate: {path: 'region'}})
      .populate({path: 'ssuzInfo.specialization'})
      .populate({path: 'competitions.place'})
      .populate({path: 'competitions.level'})
      .populate({path: 'competitions.specialization'})
      .populate({path: 'competitions.teacher'})
      .populate({path: 'competitions.competition', select: '-files', populate: [{path: 'level'}, {path: 'specialization'}]});
      // .populate({path: 'competitions.competition', populate: {path: 'level'}});
  }

  async findAllInstruments(specializationId: ObjectId) {
    return this.instrumentsModel.find({specialization: specializationId});
  }

  async updateRating() {
    const childrens = await this.childrenModel.find()
      .populate('schools')
      .populate({path: 'competitions.competition'})
      .populate({path: 'competitions.place'})
      .populate({path: 'competitions.level'});

    let result = [];
    childrens.forEach(children => {
      const childrenObj = children.toObject();
      childrenObj['rating'] = this.getRatingByChidren(children);
      return result.push(childrenObj);
    });

    result = _.sortBy(result, [function(o) { return -o.rating; }]);

    result.forEach(async (children, idx) => {
      await this.childrenModel.findByIdAndUpdate(children._id, {rating: children.rating, place: idx + 1}, {new: true})
    });
  }

  async getRating(query: QueryChildrenParams): Promise<Children[]> {
    if (query.school_id && query.instrument_id) {
      return await this.childrenModel.find({schools: query.school_id, instruments: query.instrument_id})
        .populate('schools')
        .sort('-rating');
    }

    if (query.school_id && query.specialization_id) {
      const childrens = await this.childrenModel.find({schools: query.school_id}).populate('schools').populate('instruments').sort('-rating');
      return childrens.filter(child => child.instruments.specialization.toString() == query.specialization_id.toString())
    }

    if (query.region_id && query.instrument_id) {
      const childrens = await this.childrenModel.find({instruments: query.instrument_id}).populate('schools').sort('-rating');
      return childrens.filter(child => child.schools.region.toString() == query.region_id.toString());
    }

    if (query.region_id && query.specialization_id) {
      const childrens = await this.childrenModel.find().populate('schools').populate('instruments').sort('-rating');
      return childrens
        .filter(child => child.schools.region.toString() == query.region_id.toString())
        .filter(child => child.instruments.specialization.toString() == query.specialization_id.toString());
    }

    if (query.instrument_id) {
      return await this.childrenModel.find({instruments: query.instrument_id})
        .populate('schools')
        .sort('-rating');
    }

    if (query.specialization_id) {
      const childrens = await this.childrenModel.find().populate('schools').populate('instruments').sort('-rating');
      return childrens.filter(child => child.instruments.specialization.toString() == query.specialization_id.toString());
    }

    if (query.school_id) {
      return await this.childrenModel.find({schools: query.school_id})
        .populate('schools')
        .sort('-rating');
    }

    if (query.region_id) {
      const childrens = await this.childrenModel.find().populate('schools').sort('-rating');
      return childrens.filter(child => child.schools.region.toString() == query.region_id.toString());
    }

    return await this.childrenModel.find()
      .populate('schools')
      .sort('-rating');
  }

  private getRatingByChidren(children: Children) {
    let rating = 0;
    for (let i = 0; i < children.competitions.length; ++i) {
      const [rateLevel, ratePlace] = this.getRatingByCompetition(children.competitions[i]);
      rating += this.ratingService.getRating(rateLevel, ratePlace);
    }

    return rating;
  }

  private getRatingByCompetition(competition: ChildrenCompetition) {
    const rateCompetitionLevel = competition.competition.rateLevel || competition.level.rate;
    const rateCompetitionPlace = competition.place.rate;

    return [rateCompetitionLevel, rateCompetitionPlace];
  }

  async create(createChildrenDto: CreateChildrenDto): Promise<Children> {
    const children = new this.childrenModel(createChildrenDto);
    return await children.save();
  }

  async update(id: ObjectId, createChildrenDto: CreateChildrenDto): Promise<Children> {
    return await this.childrenModel.findByIdAndUpdate(id, createChildrenDto, {new: true});
  }

  async findAll(schoolId: ObjectId, long: boolean): Promise<Children[]> {
    let obj = schoolId ? {schools: schoolId} : {};
    if (long) {
      return await this.childrenModel.find(obj)
        .populate('schools')
        .populate('instruments')
        .populate({path: 'competitions.place'})
        .populate({path: 'competitions.level'})
        .sort('-rating');
    }

    return await this.childrenModel.find(obj);
  }

  public remove(id: Schema.Types.ObjectId) {
    return this.childrenModel.remove({_id: id});
  }
}
