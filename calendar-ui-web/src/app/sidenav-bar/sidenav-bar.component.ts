import { Component, Input } from '@angular/core';
import { StorageHelper } from '@helper/storage.helper';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DataObserverHelper } from '@helper/dataobserver.helper';
import { StringHelper } from '@helper/string.helper';
@Component({
  selector: 'app-sidenav-bar',
  templateUrl: './sidenav-bar.component.html',
  styleUrls: ['./sidenav-bar.component.css'],
})
export class SidenavBarComponent {
  @Input() profileUrl: string = '';
  @Input() userName: string = '';
  selectedItem: string = 'calendar';

  constructor(private router: Router) { }
  ngOnInit(): void {
    this.selectedItem = StringHelper.isNullorEmpty(
      StorageHelper.getSelectedNavbar()
    )
      ? 'calendar'
      : StorageHelper.getSelectedNavbar();
  }

  selectItem(item: string) {
    this.selectedItem = item;
    StorageHelper.setSelectedNavbar(item);
    if (item != 'logout') {
      this.router.navigate([item]);
    } else {
      this.logout();
    }
  }

  logout() {
    Swal.fire({
      title: 'Are you sure you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'logout',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        if (StorageHelper.getUserID() == null) {
          this.router.navigate(['']).then(() => {
            window.location.reload();
          });
        }
      } else {
        this.selectItem('calendar');
      }
    });
  }
  activeButton: string = 'Bootstrap';
}
