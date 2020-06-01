import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { CompanyApiService } from '../company-api.service';
import { Company } from '../company';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {

  company: Company = {id: null, name: '', email: '', address:''};
  isloadingResults = true;

  constructor(private route: ActivatedRoute, private api: CompanyApiService, private router: Router) { }

  ngOnInit() {
    this.getCompanyDetails(this.route.snapshot.params.id);
  }

  getCompanyDetails(id: any) {
    console.log('getCompanyDetails , id =', id);
    this.api.getCompany(id)
      .subscribe((data: any) => {
        this.company = data;
        console.log('getCompanyDetails , ', this.company);
        this.isloadingResults = false;
      });
  }

  deleteCompany(id: any) {
    this.isloadingResults = true;
    this.api.deleteCompany(id)
      .subscribe(res => {
        this.isloadingResults = false;
        this.router.navigate(['/companies']);
      }, (err) =>{
        console.log('deleteCompany error : ',err);
        this.isloadingResults = false;
      });
  }

}
