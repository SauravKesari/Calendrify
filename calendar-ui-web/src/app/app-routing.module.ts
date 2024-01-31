import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EventAddComponent } from './events/event-add/event-add.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { EventCategoryComponent } from './events/event-category/event-category.component';
import { CalendarComponent } from './calendar/calendar.component';
import { GroupListComponent } from './group-list/group-list.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthGuardService } from './shared/auth/auth-guard.service';
import { ContactusComponent } from './contactus/contactus.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'event-add', component: EventAddComponent, canActivate: [AuthGuardService] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'category', component: EventCategoryComponent, canActivate: [AuthGuardService] },
  { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuardService] },
  { path: 'group', component: GroupListComponent, canActivate: [AuthGuardService] },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'contactus', component: ContactusComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
