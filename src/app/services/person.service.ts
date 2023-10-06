import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from '../models/person';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private httpClient: HttpClient) { }
  baseurl = "http://localhost:5012/api/PersonDt";

  GetPerson(): Observable<Person[]> {
    return this.httpClient.get<Person[]>(this.baseurl)
  }

  CreatePerson(per: Person): Observable<Person> {
    per.id = "0"
    return this.httpClient.post<Person>(this.baseurl, per);
  }

  UpdatePerson(per: Person): Observable<Person>  {
    return this.httpClient.put<Person>(this.baseurl + '/' + per.id, per);
  }

  DeletePerson(id: string): Observable<Person>  {
    return this.httpClient.delete<Person>(this.baseurl + '/' +id);
  }
}
