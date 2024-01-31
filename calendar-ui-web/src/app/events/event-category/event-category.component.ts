import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageHelper } from '@helper/storage.helper';
import { EventCategoryModel } from '@model/eventcategory.model';
import { UserModel } from '@model/usermodel';
import { eventCategoryApiService } from '@service/eventcategory.service';
import { PaginationInstance } from 'ngx-pagination';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-event-category',
  templateUrl: './event-category.component.html',
  styleUrls: ['./event-category.component.css'],
})
export class EventCategoryComponent {
  categoryList: EventCategoryModel[] = [];
  searchText: string = '';
  categoryName: string = '';
  editCategoryName: string = '';
  isEdit: boolean = true;
  modalTitle: string = 'Add';
  currentEditID: number = 0;
  constructor(
    private categoryAPI: eventCategoryApiService,
    private router: Router
  ) { }
  p: number = 1;

  paginationConfig: PaginationInstance = {
    itemsPerPage: 1, // number of items to display per page
    currentPage: 1,  // initial current page
    totalItems: 0,    // total number of items
  };
  ngOnInit() {
    this.getAllCategories();
  }
  async getAllCategories() {
    const allCategories = await this.categoryAPI.geteventCategoryAPI({});
    if (allCategories != null) {
      this.categoryList = allCategories.data;
    }
  }

  async deleteCategory(id: any, name: string, createBy: any) {
    if (createBy != 6) {
      Swal.fire({
        title: 'Are you sure you want to remove ' + name + ' ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
      }).then(async (result) => {
        if (result.isConfirmed) {
          const categoryDeleteResult = await this.categoryAPI.deleteCategory(id);
          if (categoryDeleteResult?.status) {
            Swal.fire({
              icon: 'success',
              title: name + '  has been removed !',
              showConfirmButton: true,
              confirmButtonText: 'OK',
            });
            this.getAllCategories();
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops.....',
              text: 'Something went wrong!',
              showConfirmButton: true,
              confirmButtonText: 'OK',
            });
          }
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'We can not Delete this Category',
        showConfirmButton: true,
        confirmButtonText: 'OK',
      });
    }
  }

  addModal(value: string) {
    this.editCategoryName = value;
    this.isEdit = value != '';
    this.isEdit ? (this.modalTitle = 'Edit') : this.modalTitle;
    const modal = document.getElementById('exampleModal');
    if (modal != null) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  }

  closeAddModal() {
    const modal = document.getElementById('exampleModal');
    if (modal != null) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }
  async editCategory(id: number, name: string) {
    if (name.toLowerCase().trim() != 'general') {
      this.currentEditID = id;
      this.addModal(name);
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'You can not Edit this Category',
        showConfirmButton: true,
        confirmButtonText: 'OK',
      });
    }
  }

  async addCategory() {
    if (this.categoryName.toLowerCase().trim() != 'general') {
      let curDate = new Date().toISOString().slice(0, 10).toString();
      const userID: UserModel = {
        id: parseInt(StorageHelper.getUserID()),
      };
      const eventCategory: EventCategoryModel = {
        name: this.categoryName,
        createdAt: curDate,
        createdBy: userID,
      };
      let categoryAPIResponse: any;
      if (!this.isEdit) {
        categoryAPIResponse = await this.categoryAPI.addEventCategoryAPI(
          eventCategory
        );
      } else {
        categoryAPIResponse = await this.categoryAPI.updateEventCategoryAPI(
          eventCategory,
          this.currentEditID
        );
      }

      if (categoryAPIResponse?.status) {
        Swal.fire({
          icon: 'success',
          title: 'Your Category has been added !',
          showConfirmButton: true,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            const modal = document.getElementById('exampleModal');
            if (modal != null) {
              modal.classList.remove('show');
              modal.style.display = 'none';
            }
            this.categoryName = '';
            this.getAllCategories();
          }
        });
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: "You can't add the 'General' Category !",
        showConfirmButton: true,
        confirmButtonText: 'OK',
      });
    }
  }
}
