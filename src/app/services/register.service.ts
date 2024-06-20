import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { InstructorDto } from '../models/instructor-dto.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor() { }
  
  http = inject(HttpClient);

  getAll() {
    return this.http.get<InstructorDto[]>('/api/instructor');    
  }

  getOne(id: number) {
    console.log(this.http.get<InstructorDto>('/api/instructor/' + id));
    return this.http.get<InstructorDto>('/api/instructor/' + id);    
  }

  create(instructor: InstructorDto) {
    return this.http.post<InstructorDto>('/api/instructor', instructor);
  }

  update(instructor: InstructorDto) {
    return this.http.put<InstructorDto>('/api/instructor', instructor);
  }

  delete(id: number) {
    return this.http.delete('/api/instructor/' + id); 
  }
}