import { Component } from '@angular/core';
import { StudentAddComponent } from '../student-add/student-add.component';
import { StudentListComponent } from '../student-list/student-list.component';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [StudentAddComponent,StudentListComponent],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent {

}
