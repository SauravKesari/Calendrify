import { Component, ElementRef, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { StringHelper } from '@helper/string.helper';
import { EventModel } from '@model/eventmodel';
import { StorageHelper } from '@helper/storage.helper';
import Swal from 'sweetalert2';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { EventCategoryModel } from '@model/eventcategory.model';
import { UserModel } from '@model/usermodel';
import { UserGroup } from '@model/usergroup.model';
import { GroupId, UserGroupMapping } from '@model/groupmapping.model';
import { userGroupApiService } from '@service/usergroup.service';
import { eventCategoryApiService } from '@service/eventcategory.service';
import { eventApiService } from '@service/event.service';
import { UserApiService } from '@service/user.service';
import { UserGroupMappingApiService } from '@service/usergroupmapping.service';
@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.css'],
})
export class EventAddComponent {
  dropdownList: UserModel[] = [];
  selectedItems: any = [];
  dropdownSettings: any = {};
  usersList: UserModel[] = [];
  groupName: string = '';
  groupDescription: string = '';
  showGroupModal: boolean = true;
  userGroup: any;
  eventCategoryList: any;
  title: any = '';
  description: any = '';
  otherCat: any = '';
  online: any = '';
  url: any = '';
  venue: any = '';
  availabilty: any = '';
  hostId: any = '';
  groupID: any = '';
  eventCatID: number | undefined;
  startdate: any = '';
  enddate: any = '';
  link: any = '';
  showTextBox: boolean = false;
  eemailAddresses: string[] = [];
  // Update Event variables
  selectedEventId: number = 0;
  category: string = '';
  selectedGroup: any = '';
  selectedApiResponse: any = '';
  isChecked: boolean = false;
  btnTitle: string = 'Create';
  selectedEvent: any | null = null;
  @ViewChild('membersInput') membersInput!: ElementRef<HTMLInputElement>;
  constructor(
    private userGroupAPI: userGroupApiService,
    private eventCatAPI: eventCategoryApiService,
    private eventAPI: eventApiService,
    private _location: Location,
    private usersAPI: UserApiService,
    private userGroupMappingApi: UserGroupMappingApiService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  async ngOnInit(): Promise<void> {
    this.getUserGroups();
    this.getCategory();
    this.getAllUsers();
    this.loadEventDetailsToUpdate();
  }

  async loadEventDetailsToUpdate() {
    this.route.params.subscribe((params) => {
      this.selectedEventId = params['id'];
      // Update the name of button
      this.btnTitle = StringHelper.isNullorEmpty(params['id'])
        ? this.btnTitle
        : 'Update';
    });
    this.selectedApiResponse = await this.eventAPI.getEventsAPI({});
    this.selectedEvent = this.selectedApiResponse?.data.filter(
      (event: EventModel) => event.id == this.selectedEventId
    );
    let curDate = new Date().toISOString().slice(0, 10).toString();
    this.title = this.selectedEvent[0].title;
    this.description = this.selectedEvent[0].description;
    this.link = this.selectedEvent[0].url;
    this.startdate = StringHelper.convertDateTimeforDB(
      this.selectedEvent[0].startDateTime
    );
    this.enddate = StringHelper.convertDateTimeforDB(
      this.selectedEvent[0].endDateTime
    );
    this.venue = this.selectedEvent[0].venueName;
    this.category = this.selectedEvent[0].eventCatID.id;
    this.eventCatID = this.selectedEvent[0].eventCatID.id;
    this.groupID = this.selectedEvent[0].groupid.id;
    this.selectedGroup = this.selectedEvent[0].groupid.id;
    this.isChecked = this.venue == '' ? this.isChecked : !this.isChecked;
    // toggle switching based on Update details
    const additionalFields = document.getElementById(
      'additionalFields'
    ) as HTMLElement;
    const switchElement = document.getElementById(
      'showFieldsSwitch'
    ) as HTMLInputElement;

    if (this.isChecked) {
      switchElement.checked = false;
      additionalFields.style.display = 'none';
      this.online = true;
    } else {
      switchElement.checked = true;
      additionalFields.style.display = 'block';
      this.online = false;
    }
    // Calling UpdateEvent  Api
  }

  async getUserGroups() {
    const userGroup = await this.userGroupAPI.getUserGroupAPI({});

    if (userGroup != null) {
      this.userGroup = userGroup.data;
    }
  }

  async getCategory() {
    const eventCat = await this.eventCatAPI.geteventCategoryAPI({});

    if (eventCat != null) {
      this.eventCategoryList = eventCat.data;
    }
  }

  toggleFields(): void {
    const additionalFields = document.getElementById(
      'additionalFields'
    ) as HTMLElement;
    if (
      (document.getElementById('showFieldsSwitch') as HTMLInputElement).checked
    ) {
      additionalFields.style.display = 'block';
      this.isChecked = true;
      this.online = false;
    } else {
      additionalFields.style.display = 'none';
      this.isChecked = false;
      this.online = true;
    }
  }

  categoryValueChange($event: any): void {
    this.showTextBox = $event.target.value == 'other';
    this.eventCatID = $event.target.value;
  }

  groupValueChange($event: any): void {
    this.groupID = $event.target.value;
  }

  endDatevalueChange($event: any): void {
    this.enddate = StringHelper.convertDateTimeforDB($event.target.value);
  }
  startDatevalueChange($event: any): void {
    this.startdate = StringHelper.convertDateTimeforDB($event.target.value);
  }

  ToLastPage() {
    this._location.back();
  }

  // Event's related Api calling
  async AddEvent() {
    let curDate = new Date().toISOString().slice(0, 10).toString();

    if (this.showTextBox) {
      const userID: UserModel = {
        id: parseInt(StorageHelper.getUserID()),
      };
      const eventCategory: EventCategoryModel = {
        name: this.otherCat,
        createdAt: curDate,
        createdBy: userID,
      };
      const newEvent = await this.eventCatAPI.addEventCategoryAPI(
        eventCategory
      );
      if (newEvent?.status) {
        let eventCategory: EventCategoryModel = newEvent.data;
        this.eventCatID = eventCategory?.id;
        this.createEvent();
      }
    } else {
      this.createEvent();
    }
  }

  async createEvent() {
    if (
      StringHelper.isNullorEmpty(this.title) ||
      StringHelper.isNullorEmpty(this.startdate) ||
      StringHelper.isNullorEmpty(this.enddate) ||
      StringHelper.isNullorEmpty(this.link) ||
      StringHelper.isNullorEmpty(this.groupID) ||
      this.eventCatID == undefined
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Please fill the form properly !',
        showConfirmButton: true,
        confirmButtonText: 'OK',
      });
      return;
    }

    let curDate = new Date().toISOString().slice(0, 10).toString();
    const hostID: UserModel = {
      id: parseInt(StorageHelper.getUserID() ?? ''),
    };
    const eventCatID: EventCategoryModel = {
      id: this.eventCatID,
    };

    const groupid: UserGroup = {
      id: parseInt(this.groupID),
    };
    const eventBody: EventModel = {
      title: this.title,
      description: this.description,
      startDateTime: this.startdate,
      endDateTime: this.enddate,
      online: this.online,
      url: this.link,
      venueName: this.venue,
      availability: false,
      hostID: hostID,
      groupid: groupid,
      eventCatID: eventCatID,
      createdAt: curDate,
      lastModify: curDate,
      isDeleted: false,
    };
    if (this.btnTitle == 'Create') {
      const newEvent = await this.eventAPI.addEventAPI(eventBody);

      if (newEvent != null) {
        Swal.fire({
          icon: 'success',
          title: 'Your Event has beed added!',
          showConfirmButton: true,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['']);
          }
        });
      }
    } else {
      const eventBody: EventModel = {
        title: this.title,
        description: this.description,
        startDateTime: StringHelper.convertDateTimeforDB(this.startdate),
        endDateTime: StringHelper.convertDateTimeforDB(this.enddate),
        online: this.online,
        url: this.link,
        venueName: this.venue,
        availability: false,
        hostID: hostID,
        groupid: groupid,
        eventCatID: eventCatID,
        createdAt: curDate,
        lastModify: curDate,
        isDeleted: false,
      };
      console.log('Update Body', eventBody);
      const updateEventApi = await this.eventAPI.updateEvent(
        eventBody,
        this.selectedEventId
      );
      console.log('Update Event', updateEventApi);

      if (updateEventApi?.status) {
        console.log(updateEventApi.data);
        Swal.fire({
          icon: 'success',
          title: 'Your Event has beed updated!',
          showConfirmButton: true,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['']);
          }
        });
      }
    }
  }

  // Modal opening and closing logic
  openModal() {
    const addModal = document.getElementById('exampleModal');
    if (addModal != null) {
      addModal.classList.add('show');
      addModal.style.display = 'block';
    }
  }

  closeModal() {
    const addModal = document.getElementById('exampleModal');
    if (addModal != null) {
      addModal.classList.remove('show');
      addModal.style.display = 'none';
    }
  }

  // User Group Creation
  // Members dropdown logic

  fillDropDownList() {
    this.dropdownList = this.usersList;
    this.selectedItems = [];
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
  onItemSelect(item: any) {
    this.selectedItems.push(item);
  }
  onSelectAll(items: any) {
    this.selectedItems = items;
  }

  // Getting all user's list and Showing list of uses except logged user
  async getAllUsers() {
    const allUsers = await this.usersAPI.getAllUsersAPI({});
    const loggedUser = StorageHelper.getUserID();
    if (allUsers != null) {
      this.usersList = allUsers.data.filter(
        (element: any) => element.id != loggedUser
      );

      this.fillDropDownList();
    }
  }

  async addGroup() {
    if (
      this.selectedItems.length > 0 &&
      this.groupName != '' &&
      this.groupDescription != ''
    ) {
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
              this.getUserGroups();
            }
          });
        }
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'You have not selected any Member!',
        showConfirmButton: true,
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['event-add']);
        }
      });
    }
  }

  async addGroupMapping(groupMappingList: UserGroupMapping[]) {
    const groupMapResponse = await this.userGroupMappingApi.saveUserToGroup(
      groupMappingList
    );
    return groupMapResponse?.status;
  }
}
