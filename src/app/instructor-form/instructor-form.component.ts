import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { InstructorService } from '../services/instructor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InstructorDto } from '../models/instructor-dto.model';

@Component({
  selector: 'app-instructor-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './instructor-form.component.html',
  styleUrl: './instructor-form.component.css'
})
export class InstructorFormComponent implements OnInit{
  formBuilder = inject(FormBuilder);

  instructorService = inject(InstructorService);

  router = inject(Router);

  activedRoute = inject(ActivatedRoute);

  instructorForm = this.formBuilder.group<InstructorDto>({
    id: 0,
    name: '',
    department: '',
    email: '',
    subjectTaught: ''
  });

  isNewInstructor = true;

  ngOnInit(): void {
    const id = this.activedRoute.snapshot.params['id'];
    if (id) {
      this.isNewInstructor = false;
      this.instructorService.getOne(id).subscribe({
        next: (instructor) => this.instructorForm.patchValue(instructor),
        error: (err) => {
          // TODO: notification
          console.error(err);
        }
      });
    }
  }

  saveInstructor() {
    const instructor = this.instructorForm.value as InstructorDto;
    console.log(instructor);
    if (this.isNewInstructor) {
      this.instructorService.create(instructor).subscribe({
        next: () => {
          // TODO: notification
          this.router.navigateByUrl('/instructor');
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
    else {
      this.instructorService.update(instructor).subscribe({
        next: () => {
          // TODO: notification
          this.router.navigateByUrl('/instructor');
        },
        error: (err) => {
          console.error(err);
        }
      });
    }


  }
}
