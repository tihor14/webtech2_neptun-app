import { Component, inject } from '@angular/core';
import { CourseService } from '../services/course.service';
import { Router } from '@angular/router';
import { CourseDTO } from '../../../models';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  courseService = inject(CourseService);

  router = inject(Router);

  courses: CourseDTO[] = [];

  ngOnInit(): void {
    this.courseService.getAll().subscribe({
      next: courses => this.courses = courses,
      error: err => console.error(err)
    });
  }
}
