import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InstructorService } from '../services/instructor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InstructorDto } from '../models/instructor-dto.model';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-instructor-form',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf,CommonModule],
  templateUrl: './instructor-form.component.html',
  styleUrls: ['./instructor-form.component.css']
})
export class InstructorFormComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  instructorService = inject(InstructorService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  formInvalidNotification = false;

  instructorForm = this.formBuilder.group({
    id: [{ value: 0, disabled: true }],  // Disabled form control for id
    name: ['', [Validators.required, Validators.pattern(/^[A-Z].*$/)]],
    department: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subjectTaught: ['', Validators.required]
  });

  isNewInstructor = true;

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.isNewInstructor = false;
      this.instructorService.getOne(id).subscribe({
        next: (instructor) => this.instructorForm.patchValue(instructor),
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  saveInstructor() {
    if (this.instructorForm.invalid) {
      this.formInvalidNotification = true;
      console.error('Form is invalid');
      return;
    }

    const instructor = this.instructorForm.getRawValue() as InstructorDto;

    if (this.isNewInstructor) {
      this.instructorService.getAll().subscribe({
        next: (instructors) => {
          instructor.id = instructors.length ? Math.max(...instructors.map(i => i.id || 0)) + 1 : 1;
          // console.log(instructors.length ? Math.max(...instructors.map(i => i.id || 0)) + 1 : 1);
          this.instructorService.create(instructor).subscribe({
            next: () => {
              this.router.navigateByUrl('/instructor');
            },
            error: (err) => {
              this.router.navigateByUrl('/instructor');
              console.error(err);
            }
          });
        },
        error: (err) => {
          console.error(err);
        }
      });
    } else {
      this.instructorService.update(instructor).subscribe({
        next: () => {
          this.router.navigateByUrl('/instructor');
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }
}
