import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentDTO } from '../../../models';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent implements OnInit{
  formBuilder = inject(FormBuilder);

  studentService = inject(StudentService);

  router = inject(Router);

  activedRoute = inject(ActivatedRoute);

  studentForm = this.formBuilder.group<StudentDTO>({
    id: 0,
    name: '',
    group: '',
    coursesTaken: null,
    grades: null
  });

  isNewStudent = true;

  ngOnInit(): void {
    const id = this.activedRoute.snapshot.params['id'];
    if (id) {
      this.isNewStudent = false;
      this.studentService.getOne(id).subscribe({
        next: (student) => this.studentForm.patchValue(student),
        error: (err) => {
          // TODO: notification
          console.error(err);
        }
      });
    }
  }

  saveStudent() {
    const student = this.studentForm.value as StudentDTO;
    console.log(student);
    if (this.isNewStudent) {
      this.studentService.create(student).subscribe({
        next: () => {
          // TODO: notification
          this.router.navigateByUrl('student');
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
    else {
      this.studentService.update(student).subscribe({
        next: () => {
          // TODO: notification
          this.router.navigateByUrl('student');
        },
        error: (err) => {
          console.error(err);
        }
      });
    }


  }
}
