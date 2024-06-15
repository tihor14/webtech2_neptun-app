import { Component, OnInit, inject } from '@angular/core';
import { InstructorService } from '../services/instructor.service';
import { InstructorDTO } from '../../../models';
import { Router } from '@angular/router';
import { SubjectService } from '../services/subject.service';

@Component({
  selector: 'app-instructor-list',
  standalone: true,
  imports: [],
  templateUrl: './instructor-list.component.html',
  styleUrl: './instructor-list.component.css'
})
export class InstructorListComponent implements OnInit{
  instructorService = inject(InstructorService);

  subjectService = inject(SubjectService);

  router = inject(Router);

  instructors: InstructorDTO[] = [];

  ngOnInit(): void {
    this.instructorService.getAll().subscribe({
      next: instructors => this.instructors = instructors,
      error: err => console.error(err)
    });
  }
  goToInstructorForm(id: number) {
    this.router.navigate([ '/instructor-edit', id ]);
  }

  goToTaughtSubjects(id: number){
    this.router.navigate([ '/instructor-subjects', id ]);
    
  }

  deleteInstructor(instructor: InstructorDTO) {
    this.instructorService.delete(instructor.id).subscribe({
      next: () => {
        const index = this.instructors.indexOf(instructor);
        if (index > -1) {
          this.instructors.splice(index, 1);
        }
      },
      error: (err) => {
        // TODO: notification
        console.error(err);
      }
    });
  }
}
