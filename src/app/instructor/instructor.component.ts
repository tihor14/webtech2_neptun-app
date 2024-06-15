import { Component } from '@angular/core';
import { InstructorListComponent } from '../instructor-list/instructor-list.component';
import { InstructorAddComponent } from '../instructor-add/instructor-add.component';

@Component({
  selector: 'app-instructor',
  standalone: true,
  imports: [InstructorListComponent,InstructorAddComponent],
  templateUrl: './instructor.component.html',
  styleUrl: './instructor.component.css'
})
export class InstructorComponent {

}
