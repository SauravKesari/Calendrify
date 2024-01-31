import { Component } from '@angular/core';
import { StorageHelper } from '@helper/storage.helper';
import { GroupWithUsersModel } from '@model/groupwithusers.model';
import { userGroupApiService } from '@service/usergroup.service';
import { UserGroupMappingApiService } from '@service/usergroupmapping.service';
import { GroupId, UserGroupMapping } from '@model/groupmapping.model';
import { UserGroup } from '@model/usergroup.model';
import { UserModel } from '@model/usermodel';
import { Router } from '@angular/router';
import { UserApiService } from '@service/user.service';

import Swal from 'sweetalert2';
import { PaginationInstance } from 'ngx-pagination';

interface Group {
  id: number;
  name: string;
  groupId: number;
  createdDate: string;
  showUserList: boolean;
  users: User[];
}

interface User {
  email: string;
  joiningDate: string;
}

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css'],
})
export class GroupListComponent {
  constructor(
    private userGroupAPI: userGroupApiService,
    private userGroupMapAPI: UserGroupMappingApiService,
    private userGroupMappingApi: UserGroupMappingApiService,
    private router: Router,
    private usersAPI: UserApiService
  ) {}

  dropdownList: UserModel[] = [];
  selectedItems: UserModel[] = [];
  paginationConfig: PaginationInstance = {
    itemsPerPage: 1, // number of items to display per page
    currentPage: 1, // initial current page
    totalItems: 0, // total number of items
  };

  dropdownSettings: any = {};
  usersList: UserModel[] = [];
  groupName: string = '';
  searchText: string = '';
  groupDescription: string = '';
  groupDialogTitle?: string = '';
  groupDialogButtonTitle: string = '';
  groupWithUsersList: GroupWithUsersModel[] = [];
  allgroupWithUsersList: GroupWithUsersModel[] = [];
  joinedgroupWithUsersList: GroupWithUsersModel[] = [];
  mygroupWithUsersList: GroupWithUsersModel[] = [];
  selectedGroup: number | undefined;
  updateUserGroup: GroupWithUsersModel | undefined;
  p: number = 1;
  async ngOnInit(): Promise<void> {
    this.getGroupWithUser();
    this.getUserGroups();
    this.getAllUsers();
  }

  async getUserGroups() {
    const userGroup = await this.userGroupAPI.getUserGroupAPI({});
    if (userGroup != null) {
      console.log('userGroup', userGroup);
      this.usersList = userGroup.data;
    }
  }

  async getGroupWithUser() {
    this.groupWithUsersList = [];
    this.allgroupWithUsersList = [];
    this.mygroupWithUsersList = [];
    this.joinedgroupWithUsersList = [];
    const groupMappingResponse = await this.userGroupAPI.getGroupWithUsersAPI();
    if (groupMappingResponse != null) {
      this.groupWithUsersList = groupMappingResponse.data;
      this.allgroupWithUsersList = this.groupWithUsersList;
      this.groupWithUsersList.forEach((element: GroupWithUsersModel) => {
        console.log('createBy==', element?.userGroup?.createBy?.id);
        if (
          element.userGroup.createBy?.id == parseInt(StorageHelper.getUserID())
        ) {
          this.mygroupWithUsersList.push(element);
        } else {
          this.joinedgroupWithUsersList.push(element);
        }
      });
    }
  }

  async deleteUserFromGroup(mapID: number, name: string, role: string) {
    if (role === 'Admin') {
      Swal.fire({
        title: 'You can not delete Admin ' + name,
        icon: 'error',
        showConfirmButton: true,
        confirmButtonText: 'Ok',
      });
    } else {
      Swal.fire({
        title: 'Are you sure you want to remove ' + name + ' ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
      }).then(async (result) => {
        if (result.isConfirmed) {
          const userMapDeleteRes = await this.userGroupMapAPI.deleteMapping(
            mapID
          );
          if (userMapDeleteRes?.status) {
            Swal.fire({
              icon: 'success',
              title: name + ' has been removed !',
              showConfirmButton: true,
              confirmButtonText: 'OK',
            });
            this.getGroupWithUser();
          }
        }
      });
    }
  }

  isUserListOpen: boolean[] = [];

  toggleUserList(index: number) {
    this.selectedGroup = index == this.selectedGroup ? undefined : index;
    this.isUserListOpen[index] = !this.isUserListOpen[index];
  }
  selectedCard: string | null = 'allGroups';

  handleCardClick(card: string) {
    this.groupWithUsersList = [];
    this.selectedGroup = undefined;
    this.selectedCard = card;
    if (card == 'allGroups') {
      this.groupWithUsersList = this.allgroupWithUsersList;
    }
    if (card == 'myGroups') {
      this.groupWithUsersList = this.mygroupWithUsersList;
    }
    if (card == 'joinGroups') {
      this.groupWithUsersList = this.joinedgroupWithUsersList;
    }
  }
  onItemSelect(item: any) {
    this.selectedItems.push(item);
  }
  onSelectAll(items: any) {
    console.log(items);
    this.selectedItems = items;
  }

  onUnselect(items: any) {
    this.selectedItems = this.selectedItems.filter(
      (item: any) => item.id !== items.id
    );
  }

  // Getting all user's list and Showing list of uses except logged user
  async getAllUsers() {
    const allUsers = await this.usersAPI.getAllUsersAPI({});
    const loggedUser = StorageHelper.getUserID();
    console.log(loggedUser);
    if (allUsers != null) {
      console.log('users', allUsers);
      this.usersList = allUsers.data.filter(
        (element: any) => element.id != loggedUser
      );

      this.fillDropDownList();
    }
  }

  openModal(value: string, userGroup?: GroupWithUsersModel) {
    this.selectedItems = [];
    if (userGroup != null) {
      this.groupDescription = userGroup.userGroup.description ?? '';
      this.groupName = userGroup.userGroup.name ?? '';
      this.updateUserGroup = userGroup;
      this.updateUserGroup.userGroupMappingList =
        this.updateUserGroup.userGroupMappingList.filter(
          (item) => item.userID.id !== parseInt(StorageHelper.getUserID())
        );
      this.updateUserGroup.userGroupMappingList.forEach(
        (element: UserGroupMapping) => {
          this.selectedItems.push(element.userID);
        }
      );
    } else {
      this.groupDescription = '';
      this.groupName = '';
    }
    console.log('OpenModal', this.selectedItems);
    this.groupDialogTitle = value == 'add' ? 'Add Group' : 'Edit Group';
    this.groupDialogButtonTitle = value == 'add' ? 'Create' : 'Update';
    const addModal = document.getElementById('exampleModal');
    if (addModal != null) {
      addModal.classList.add('show');
      addModal.style.display = 'block';
    }
  }

  closeModal() {
    this.selectedItems = [];
    const addModal = document.getElementById('exampleModal');
    if (addModal != null) {
      addModal.classList.remove('show');
      addModal.style.display = 'none';
    }
  }

  fillDropDownList() {
    this.dropdownList = this.usersList;
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'email',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }

  getRole(adminUser?: string, userEmail?: string): string {
    return adminUser?.toLowerCase().trim() == userEmail?.toLowerCase().trim()
      ? 'Admin'
      : 'Member';
  }

  groupAddUpdateEvent() {
    if (
      this.selectedItems.length === 0 ||
      this.groupName === '' ||
      this.groupDescription === ''
    ) {
      Swal.fire({
        icon: 'error',
        title: 'You have not selected any Member!',
        showConfirmButton: true,
        confirmButtonText: 'OK',
      });
      return;
    }

    if (this.groupDialogButtonTitle == 'Create') {
      this.addGroup();
    } else {
      this.updateGroup();
    }
  }

  async addGroup() {
    const userGroupBody: UserGroup = {
      name: this.groupName,
      description: this.groupDescription,
      createBy: {
        id: parseInt(StorageHelper.getUserID()),
      },
    };
    const groupResponse = await this.userGroupAPI.addUserGroupAPI(
      userGroupBody
    );

    if (groupResponse?.status) {
      const groupMappingList: UserGroupMapping[] = [];

      this.selectedItems.forEach((element: any) => {
        const newMapping: UserGroupMapping = {
          groupID: { id: groupResponse?.data.id },
          userID: { id: element.id },
        };

        if (
          !groupMappingList.some(
            (mapping) =>
              mapping.groupID.id === newMapping.groupID.id &&
              mapping.userID.id === newMapping.userID.id
          )
        ) {
          groupMappingList.push(newMapping);
        }
      });

      const userGroupMap: UserGroupMapping = {
        groupID: { id: groupResponse?.data.id },
        userID: { id: parseInt(StorageHelper.getUserID()) },
      };
      groupMappingList.push(userGroupMap);

      if (await this.addGroupMapping(groupMappingList)) {
        Swal.fire({
          icon: 'success',
          title: 'Your Group is created Successfully !',
          showConfirmButton: true,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            const addModal = document.getElementById('exampleModal');
            if (addModal) {
              addModal.classList.remove('show');
              addModal.style.display = 'none';
            }
            this.getGroupWithUser();
            this.getUserGroups();
            this.getAllUsers();
          }
        });
      }
    }
  }

  async updateGroup() {
    if (
      this.selectedItems.length === 0 ||
      this.groupName === '' ||
      this.groupDescription === ''
    ) {
      Swal.fire({
        icon: 'error',
        title: 'You have not selected any Member!',
        showConfirmButton: true,
        confirmButtonText: 'OK',
      });
      return;
    }

    const userGroupBody: UserGroup = {
      name: this.groupName,
      description: this.groupDescription,
      createBy: {
        id: parseInt(StorageHelper.getUserID()),
      },
    };
    const groupResponse = await this.userGroupAPI.updateUserGroupAPI(
      userGroupBody,
      this.updateUserGroup?.userGroup.id
    );

    if (groupResponse?.status) {
      const groupMappingList: UserGroupMapping[] = this.selectedItems.map(
        (element: any) => ({
          groupID: { id: groupResponse?.data.id },
          userID: { id: element.id },
        })
      );

      const deleteMappingList =
        this.updateUserGroup?.userGroupMappingList.filter(
          (item: UserGroupMapping) =>
            !groupMappingList.some(
              (groupItem: UserGroupMapping) =>
                groupItem.userID.id === item.userID.id &&
                groupItem.groupID.id === item.groupID.id
            )
        );

      const addMappingList = groupMappingList.filter(
        (groupItem: UserGroupMapping) =>
          !this.updateUserGroup?.userGroupMappingList.some(
            (item: UserGroupMapping) => item.userID.id === groupItem.userID.id
          )
      );
      const uniqueAddMappingList = addMappingList.filter(
        (
          groupItem: UserGroupMapping,
          index: number,
          self: UserGroupMapping[]
        ) =>
          index ===
          self.findIndex(
            (item: UserGroupMapping) => item.userID.id === groupItem.userID.id
          )
      );
      let isAnyGroupMemberAdded = false;
      let isAnyGroupMemberDeleted = false;
      if (deleteMappingList!.length > 0) {
        isAnyGroupMemberDeleted = await this.deleteGroupMapping(
          deleteMappingList!
        );
      }

      if (uniqueAddMappingList!.length > 0) {
        isAnyGroupMemberAdded = await this.addGroupMapping(
          uniqueAddMappingList
        );
      }

      if (isAnyGroupMemberAdded || isAnyGroupMemberDeleted) {
        Swal.fire({
          icon: 'success',
          title: 'Your Group is updated Successfully !',
          showConfirmButton: true,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            const addModal = document.getElementById('exampleModal');
            if (addModal) {
              addModal.classList.remove('show');
              addModal.style.display = 'none';
            }
            this.getGroupWithUser();
            this.getUserGroups();
            this.getAllUsers();
          }
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Your Group is updated Successfully !',
          showConfirmButton: true,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            const addModal = document.getElementById('exampleModal');
            if (addModal) {
              addModal.classList.remove('show');
              addModal.style.display = 'none';
            }
            this.getGroupWithUser();
            this.getUserGroups();
            this.getAllUsers();
          }
        });
      }
    }
  }

  async addGroupMapping(groupMappingList: UserGroupMapping[]) {
    const groupMapResponse = await this.userGroupMappingApi.saveUserToGroup(
      groupMappingList
    );
    return groupMapResponse?.status;
  }
  async deleteGroupMapping(groupMappingList: UserGroupMapping[]) {
    const groupMapResponse = await this.userGroupMappingApi.deleteUserToGroup(
      groupMappingList
    );
    return groupMapResponse?.status;
  }
}
