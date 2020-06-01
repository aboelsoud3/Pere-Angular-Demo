import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {

  companyForm: FormGroup;
  id = '';
  name = '';
  email = '';
  address = '';
  isloadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private route: ActivatedRoute, private api: CompanyApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getCompany(this.route.snapshot.params['id']);
    this.companyForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'email' : [null, Validators.required],
      'address' : [null, Validators.required]
    });
  }

  getCompany(id: any) {
    this.api.getCompany(id).subscribe((data: any) => {
      this.id = data.id;
      this.companyForm.setValue({
        name: data.name,
        email: data.email,
        address: data.address
      });
    });
  }

  onFormSubmit() {
    this.isloadingResults = true;
    this.api.updateCompany(this.id, this.companyForm.value)
      .subscribe((res: any) => {
          const id = res.id;
          this.isloadingResults = false;
          this.router.navigate(['/company-details', id]);
        }, (err: any) => {
          console.log(err);
          this.isloadingResults = false;
        }
      );
  }

  companyDetails() {
    this.router.navigate(['/company-details', this.id]);
  }


}
