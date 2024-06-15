import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CourseDTO, StudentDTO } from '../../../models';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  http = inject(HttpClient);

  getAll() {
    return this.http.get<CourseDTO[]>('/api/course');    
  }

  getOne(id: number) {
    return this.http.get<CourseDTO>('/api/course/' + id);    
  }
  coursesOfSubject(subjectId: number){
    return this.http.get<CourseDTO[]>('/api/course/list-by/' + subjectId);
  }
  getCoursesOfStudent(studentId: number){
    return this.http.get<CourseDTO[]>('/api/course/learned-by/' + studentId);
  }
  delete(id: number) {
    return this.http.delete('/api/course/' + id); 
  }
  create(course: CourseDTO) {
    return this.http.post<CourseDTO>('/api/course', course);
  }
  getStudentsOfCourse(courseId: number){
    return this.http.get<StudentDTO[]>('/api/course/students/' + courseId);
  }
}