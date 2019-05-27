import { Document } from 'mongoose';

export interface CompetitionLevel extends Document {
  _id: string;
  title: string;
  rate: number;
}
