import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CourseDTO, SubjectDTO } from '../../../models';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  http = inject(HttpClient);

  getAll() {
    return this.http.get<SubjectDTO[]>('/api/subject');    
  }

  getOne(id: number) {
    console.log(this.http.get<SubjectDTO>('/api/subject/' + id));
    return this.http.get<SubjectDTO>('/api/subject/' + id);    
  }
  create(subject: SubjectDTO) {
    return this.http.post<SubjectDTO>('/api/subject', subject);
  }
  subjectsOfInstructor(instructorId: number){
    return this.http.get<SubjectDTO[]>('/api/subject/taught-by/' + instructorId);
  }
  coursesOfSubject(subjectId: number) {
    return this.http.get<CourseDTO[]>('/api/subject/list-by/' + subjectId);
  }
  delete(id: number) {
    return this.http.delete('/api/subject/' + id); 
  }
}