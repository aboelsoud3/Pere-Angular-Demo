import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyAddComponent } from './company-add/company-add.component';
import { CompanyEditComponent } from './company-edit/company-edit.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';

const routes: Routes = [
  {
    path:'companies',
    component:CompanyListComponent,
    data:{title:'List of companies'}
  },
  {
    path:'company-add',
    component:CompanyAddComponent,
    data:{title:'Add new company'}
  },
  {
    path:'company-edit/:id',
    component:CompanyEditComponent,
    data:{title:'Edit company'}
  },
  {
    path:'company-details/:id',
    component:CompanyDetailsComponent,
    data:{title:'Company details'}
  },
  { path: '',
    redirectTo: '/companies',
    pathMatch: 'full'
  }      
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
