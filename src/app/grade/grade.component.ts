import { Component, NgModule, OnInit, inject } from '@angular/core';
import { CourseDTO, GradeDTO, StudentDTO, SubjectDTO } from '../../../models';
import { StudentService } from '../services/student.service';
import { SubjectService } from '../services/subject.service';
import { CourseService } from '../services/course.service';
import { GradeService } from '../services/grade.service';
import { Grade } from '../../../server/src/entity/Grade';
import { Student } from '../../../server/src/entity/Student';
import { Course } from '../../../server/src/entity/Course';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

// @NgModule({
//   imports: [
//     CommonModule,
//     FormsModule
//   ]
// })

@Component({
  selector: 'app-grade',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './grade.component.html',
  styleUrl: './grade.component.css'
})
export class GradeComponent implements OnInit {
  // courseIdInput: number | null = null;
  averageGradeByCourse: number | null = null;
  grades: GradeDTO[] = [];
  students: StudentDTO[] = [];
  courses: CourseDTO[] = [];

  gradeService = inject(GradeService);
  studentService = inject(StudentService);

  formBuilder = inject(FormBuilder);
  router = inject(Router);
  activedRoute = inject(ActivatedRoute);
  gradeForm = this.formBuilder.group<GradeDTO>({
    id: 0,
    student: null,
    course: '',
    grade: 0
  });
  ngOnInit(): void {
    this.gradeService.getAll().subscribe({
      next: grades => this.grades = grades,
      error: err => console.error(err)
    });
    this.studentService.getAll().subscribe({
      next: students => this.students = students,
      error: err => console.error(err)
    });
    // const courseIdInput = this.activedRoute.snapshot.params['courseIdInput'];
    // if (id) {
    //   this.isNewInstructor = false;
    //   this.instructorService.getOne(id).subscribe({
    //     next: (instructor) => this.instructorForm.patchValue(instructor),
    //     error: (err) => {
    //       // TODO: notification
    //       console.error(err);
    //     }
    //   });
    // }
  }

  saveGrade() {
    
    const grade = this.gradeForm.value as GradeDTO;
    //  this.studentService.getOne(1).subscribe({
    //   next: (student: StudentDTO) => {
    //     // Itt kezeljük a kapott hallgató objektumot
    //     grade.student = student; // Ezt csak akkor állítsuk be, ha a student sikeresen le lett kérdezve
    //     console.log(grade.student?.name); // Ellenőrizzük a hallgató nevét
    //     // Itt folytathatjuk a mentést vagy más műveleteket
    //   },
    //   error: (err) => {
    //     console.error('Error fetching student:', err); // Hibakezelés, ha valami nem sikerült
    //   }
    // });
      this.gradeService.create(grade).subscribe({
        next: () => {
          // TODO: notification
          this.router.navigateByUrl('/grade');
        },
        error: (err) => {
          console.error(err);
        }
      });
  }
  // getAverageGradeByCourse(courseId: number) {
  //   this.gradeService.getAverageGradeByCourse(courseId).subscribe(
  //     {
  //       next: average => {
  //         this.averageGradeByCourse = average.grade; // Itt az átlagot kiszedjük az objektumból
  //       },
  //       error: (err) => {
  //         // TODO: notification
  //         console.error(err);
  //       }
  //     });
  // }
}
