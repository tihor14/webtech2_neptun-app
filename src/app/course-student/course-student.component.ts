import { Component, inject } from '@angular/core';
import { CourseService } from '../services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseDTO, StudentDTO } from '../../../models';
import { StudentService } from '../services/student.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SubjectService } from '../services/subject.service';

@Component({
  selector: 'app-course-student',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './course-student.component.html',
  styleUrl: './course-student.component.css'
})
export class CourseStudentComponent {
  courseService = inject(CourseService);
  studentService = inject(StudentService);

  router = inject(Router);

  courses: CourseDTO[] = [];
  students: StudentDTO[] = [];
  constructor(
    private subjectService: SubjectService,
    // private courseService: CourseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getStudentsOfCourse(this.route.snapshot.params['id']);
  }

  getStudentsOfCourse(courseId: number): void {
    this.courseService.getStudentsOfCourse(courseId).subscribe({
      next: students => this.students = students,
      error: err => console.error(err)
    });
  }
}
