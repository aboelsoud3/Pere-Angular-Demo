import { Injectable } from '@angular/core';
import { Observable, of , throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Company } from './company';

const httpOptions = {
  headers: new HttpHeaders({'content-type':'application/json'})
};
const apiUrl = 'http://localhost:8080/company/';
@Injectable({
  providedIn: 'root'
})
export class CompanyApiService {

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }

  getCompanyList(pageNumber: number, pageSize: number , sortBy: string, sortDirection: string): Observable<Company[]> {
    const url = `${apiUrl}?page=${pageNumber}&size=${pageSize}&sortBy=${sortBy}&sortDirection=${sortDirection}`;
    return this.http.get<Company[]>(url).pipe(
      tap(company => console.log('get Company List')),
      catchError(this.handleError('getCompanyList',[]))
    );
  }

  getCompany(id: any): Observable<Company>{
    const url = `${apiUrl}${id}`;
    console.log('getCompanyUrl = ',url);
    return this.http.get<Company>(url).pipe(
      tap(_ => console.log(`get company with id=${id}`)),
      catchError(this.handleError<Company>('getCompany'))
    );
  }
  
  addCompany(company: Company): Observable<Company>{
    return this.http.post<Company>(apiUrl, company, httpOptions).pipe(
      tap((comp: any) => console.log(`new company added wi id=${comp.id}`)),
      catchError(this.handleError<Company>('addCompany'))
    );
  }

  updateCompany(id: any, company: Company): Observable<any>{
    const url = `${apiUrl}${id}`;
    return this.http.put(url, company,httpOptions).pipe(
      tap(_ => console.log(`company updated with id=${id}`)),
      catchError(this.handleError<any>('updateCompany'))
    );
  }

  deleteCompany(id: any): Observable<Company>{
    const url = `${apiUrl}${id}`;

    return this.http.delete<Company>(url, httpOptions).pipe(
      tap(_ => console.log(`company deleted with id=${id}`)),
      catchError(this.handleError<any>('updateCompany'))
    );
  }

  filterCompanyList(filterBy: string, filterValue: string): Observable<Company[]> {    
    const url = `${apiUrl}?${filterBy}=${filterValue}`;
    
    return this.http.get<Company[]>(url).pipe(
      tap(company => console.log('filter Company List')),
      catchError(this.handleError('filterCompanyList',[]))
    );
  }

  sortByName(): Observable<Company[]> {    
    const url = `${apiUrl}sortByName`;
    return this.http.get<Company[]>(url).pipe(
      tap(company => console.log('get Company List')),
      catchError(this.handleError('getCompanyList',[]))
    );
  }  
}
