import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyApiService } from '../company-api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-company-add',
  templateUrl: './company-add.component.html',
  styleUrls: ['./company-add.component.scss']
})
export class CompanyAddComponent implements OnInit {

  companyForm: FormGroup;
  name = '';
  email = '';
  address = '';
  isloadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private api: CompanyApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.companyForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'email' : [null, Validators.required],
      'address' : [null, Validators.required]
    });
  }

  onFormSubmit() {
    this.isloadingResults = true;
    this.api.addCompany(this.companyForm.value)
      .subscribe((res: any) => {
          const id = res.id;
          this.isloadingResults = false;
          this.router.navigate(['/company-details', id]);
        }, (err: any) => {
          console.log(err);
          this.isloadingResults = false;
        });
  }  

}
