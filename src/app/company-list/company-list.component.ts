import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyApiService} from '../company-api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Company } from '../company';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
  
  displayedColumns: string[] = ['name', 'email', 'address'];
  data: Company[] = [];
  totalItems = 0;
  totalPages = 1;
  currentPage = 0;
  pageSize=5;
  filterBy = "name";
  sortBy = "id";
  sortDirection = "asc";

  isloadingResults = true;
  myGroup = new FormGroup({
    filter: new FormControl()
 });
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private api: CompanyApiService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getCompanies();
  }

  setData(result: any){
    if(!result) 
    {
        this.setDefalutData();
    }
    else {
      this.data = result.companies;
      this.totalItems = result.totalItems;
      this.totalPages = result.totalPages;
      this.currentPage = result.currentPage;
    }

  }
  setDefalutData(){
    this.data = [];
    this.totalItems = 0;
    this.totalPages = 1;
    this.currentPage = 0;
    this.pageSize=5;
    this.filterBy = "name";    
    this.sortBy = "id";
    this.sortDirection = "asc";    
  }
  getCompanies(){
    this.api.getCompanyList(this.currentPage, this.pageSize ,this.sortBy, this.sortDirection)
    .subscribe((res: any) => {
      this.setData(res);
      console.log('companyList = ',this.data);
      this.isloadingResults = false
    }, err => {
      console.log(err);
      this.setDefalutData();
      this.isloadingResults = false;

    });
  }

  applyFilter(filterValue: string){
    this.api.filterCompanyList(this.filterBy, filterValue)
      .subscribe((res: any) => {
        this.setData(res);
        console.log('companyList = ',this.data);
        this.isloadingResults = false
      }, err => {
        console.log(err);
        this.setDefalutData();
        this.isloadingResults = false;

      });    
  }

  sortByName() {
    this.sortBy = "name";
    this.changeSortDirection();
    console.log('sortDirection : ', this.sortDirection);
    this.getCompanies();
  }  

  changeSortDirection(){
    if(this.sortDirection === "asc")
    {
      this.sortDirection= "desc"
    }
    else{
      this.sortDirection= "asc"
    }
  }
  onChangePagination(pageData: PageEvent){
    this.currentPage = pageData.pageIndex;
    this.pageSize = pageData.pageSize;
    this.getCompanies();
  }

  sortByEmail() {
    this.sortBy = "email";
    this.changeSortDirection();
    console.log('sortDirection : ', this.sortDirection);
    this.getCompanies();
  }
}
