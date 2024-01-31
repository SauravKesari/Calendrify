import { Component, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { DataObserverHelper } from '@helper/dataobserver.helper';
import { StorageHelper } from '@helper/storage.helper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private dataobserver: DataObserverHelper, private router: Router,) { }
  isUserExist = (StorageHelper.getUserID()) == null;
  ngOnInit(): void {
    this.dataobserver.ObsSessionRefresh().subscribe((val) => {
      this.isUserExist = StorageHelper.getUserID() == null;
    })
    this.dataobserver.ObsScrollRefresh().subscribe((val) => {
      this.scrollToElement(val)
    })
  }

  scrollToElement(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  navigateTo(name: any) {
    this.router.navigate([name]);
  }
}
