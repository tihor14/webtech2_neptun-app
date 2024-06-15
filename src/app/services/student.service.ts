import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { StudentDTO } from '../../../models';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<StudentDTO[]>('/api/student');    
  }

  getOne(id: number) {
    return this.http.get<StudentDTO>('/api/student/' + id);    
  }
  create(student: StudentDTO) {
    return this.http.post<StudentDTO>('/api/student', student);
  }

  update(student: StudentDTO) {
    return this.http.put<StudentDTO>('/api/student', student);
  }

  delete(id: number) {
    return this.http.delete('/api/student/' + id); 
  }
}