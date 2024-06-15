import { Component, OnInit, inject } from '@angular/core';
import { CourseService } from '../services/course.service';
import { SubjectService } from '../services/subject.service';
import { Router } from '@angular/router';
import { SubjectDTO } from '../../../models';

@Component({
  selector: 'app-subject-list',
  standalone: true,
  imports: [],
  templateUrl: './subject-list.component.html',
  styleUrl: './subject-list.component.css'
})
export class SubjectListComponent implements OnInit {
  courseService = inject(CourseService);

  subjectService = inject(SubjectService);

  router = inject(Router);

  subjects: SubjectDTO[] = [];

  ngOnInit(): void {
    this.subjectService.getAll().subscribe({
      next: subjects => this.subjects = subjects,
      error: err => console.error(err)
    });
  }

  goToSubjectCourses(id: number){
    this.router.navigate([ '/subject-courses', id ]);
  }
  
}
