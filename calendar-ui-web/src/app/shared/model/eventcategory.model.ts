import { UserModel } from './usermodel';

export interface EventCategoryModel {
  id?: number;
  name?: string;
  createdAt?: string;
  createdBy?: UserModel;
}

