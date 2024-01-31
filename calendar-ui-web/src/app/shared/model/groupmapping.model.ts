import { UserModel } from "./usermodel";

export interface UserGroupMapping {
  id?: number;
  groupID: GroupId;
  userID: UserModel;
}
export interface GroupId {
  id?: number;
  name?: string;
  description?: string;
  createBy?: UserModel;
}