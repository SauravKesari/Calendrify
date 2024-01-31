import { EventCategoryModel } from "./eventcategory.model";
import { UserGroup } from "./usergroup.model";
import { UserModel } from "./usermodel";

export interface EventModel {
  id?: number;
  title: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  online: boolean;
  url: string;
  venueName: string;
  availability: boolean;
  hostID: UserModel;
  groupid: UserGroup;
  eventCatID: EventCategoryModel;
  createdAt: string;
  lastModify: string;
  isDeleted: boolean;
}

