import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { InstructorDto } from '../models/instructor-dto.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {
  path = "http://localhost:3000";
  constructor() { }
  http = inject(HttpClient);

  getAll(): Observable<InstructorDto[]> {
    return this.http.get<InstructorDto[]>(this.path + '/api/instructor');    
  }

  getOne(id: number) {
    console.log(this.http.get<InstructorDto>(this.path + '/api/instructor/' + id));
    return this.http.get<InstructorDto>(this.path + '/api/instructor/' + id);    
  }

  create(instructor: InstructorDto) {
    return this.http.post<InstructorDto>(this.path + '/api/instructor', instructor);
  }

  update(instructor: InstructorDto) {
    return this.http.put<InstructorDto>(this.path + '/api/instructor', instructor);
  }

  delete(id: number) {
    return this.http.delete(this.path + '/api/instructor/' + id); 
  }
}