import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyEditComponent } from './company-edit/company-edit.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { CompanyAddComponent } from './company-add/company-add.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule} from '@angular/material/input';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatSortModule} from '@angular/material/sort';
import { MatTableModule} from '@angular/material/table';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
  declarations: [
    AppComponent,
    CompanyListComponent,
    CompanyEditComponent,
    CompanyDetailsComponent,
    CompanyAddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonToggleModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
