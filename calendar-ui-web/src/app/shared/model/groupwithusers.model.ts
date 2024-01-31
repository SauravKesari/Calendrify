import { UserGroupMapping } from './groupmapping.model';
import { UserGroup } from './usergroup.model';
import { UserModel } from './usermodel';

export interface GroupWithUsersModel {
  userGroup: UserGroup;
  userGroupMappingList: UserGroupMapping[];
}


