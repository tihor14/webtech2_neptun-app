import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { InstructorDTO } from '../../../models';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  http = inject(HttpClient);

  getAll() {
    return this.http.get<InstructorDTO[]>('/api/instructor');    
  }

  getOne(id: number) {
    console.log(this.http.get<InstructorDTO>('/api/instructor/' + id));
    return this.http.get<InstructorDTO>('/api/instructor/' + id);    
  }

  create(instructor: InstructorDTO) {
    return this.http.post<InstructorDTO>('/api/instructor', instructor);
  }

  update(instructor: InstructorDTO) {
    return this.http.put<InstructorDTO>('/api/instructor', instructor);
  }

  delete(id: number) {
    return this.http.delete('/api/instructor/' + id); 
  }
}