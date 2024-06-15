import { Component, OnInit, inject } from '@angular/core';
import { InstructorService } from '../services/instructor.service';
import { InstructorDTO, UserDTO } from '../../../models';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{
  userService = inject(UserService);

  users: UserDTO[] = [];

  ngOnInit(): void {
    this.userService.getAll().subscribe({
      next: instructors => this.users = instructors,
      error: err => console.error(err)
    });
  }
}
