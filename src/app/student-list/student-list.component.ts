import { Component, OnInit, inject } from '@angular/core';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';
import { CourseDTO, StudentDTO, SubjectDTO } from '../../../models';
import { Student } from '../../../server/src/entity/Student';
import { SubjectService } from '../services/subject.service';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit {
  studentService = inject(StudentService);
  subjectService = inject(SubjectService);
  courseService = inject(CourseService);
  router = inject(Router);

  students: StudentDTO[] = [];
  subjects: SubjectDTO[] = [];
  courses: CourseDTO[] = [];

  ngOnInit(): void {
    this.studentService.getAll().subscribe({
      next: students => this.students = students,
      error: err => console.error(err)
    });
  }
  goToStudentForm(id: number) {
    this.router.navigate([ '/student-edit', id ]);
  }

  deleteStudent(student: StudentDTO) {
    this.studentService.delete(student.id).subscribe({
      next: () => {
        const index = this.students.indexOf(student);
        if (index > -1) {
          this.students.splice(index, 1);
        }
      },
      error: (err) => {
        // TODO: notification
        console.error(err);
      }
    });
  }
  goToStudentSubjects(id: number) {
    // this.courseService.getCoursesOfStudent(id)
    //   .subscribe(courses => console.log(courses));
    this.studentService.getOne(id).subscribe(student => console.log(student));
  }
}
