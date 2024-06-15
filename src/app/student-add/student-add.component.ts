import { Component, inject } from '@angular/core';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';
import { StudentDTO } from '../../../models';

@Component({
  selector: 'app-student-add',
  standalone: true,
  imports: [],
  templateUrl: './student-add.component.html',
  styleUrl: './student-add.component.css'
})
export class StudentAddComponent {
  studentService = inject(StudentService);

  router = inject(Router);

  students: StudentDTO[] = [];

  ngOnInit(): void {
    this.studentService.getAll().subscribe({
      next: students => this.students = students,
      error: err => console.error(err)
    });
  }
  goToStudentAddForm() {
    this.router.navigate([ '/student-add']);
  }
}
