import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { GradeDTO, StudentDTO } from '../../../models';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  http = inject(HttpClient);

  getAll() {
    return this.http.get<GradeDTO[]>('/api/grade');    
  }

  getOne(id: number) {
    return this.http.get<GradeDTO>('/api/grade/' + id);    
  }
  delete(id: number) {
    return this.http.delete('/api/grade/' + id); 
  }
  create(grade: GradeDTO) {
    return this.http.post<GradeDTO>('/api/grade', grade);
  }
  getAverageGradeByCourse(courseId: number){
    return this.http.get<GradeDTO>('/api/grade/averageByCourse' + courseId);
  }
  getAverageGradeByStudent(studentId: number){
    return this.http.get<GradeDTO>('/api/grade/averageByStudent' + studentId);
  }
}