import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CourseDTO, SubjectDTO } from '../../../models';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectService } from '../services/subject.service';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-subject-courses',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './subject-courses.component.html',
  styleUrl: './subject-courses.component.css'
})
export class SubjectCoursesComponent implements OnInit{
  subjects: SubjectDTO[] = [];
  selectedSubject: SubjectDTO | null = null;
  courses: CourseDTO[] = [];
  router = inject(Router);
  formBuilder = inject(FormBuilder);
  courseService = inject(CourseService);
  showCourseForm: boolean = false;

  activedRoute = inject(ActivatedRoute);

  constructor(
    private subjectService: SubjectService,
    // private courseService: CourseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.courseService.coursesOfSubject(id).subscribe(courses => {
      this.courses = courses;
    });
    // this.courseService.getAll().subscribe({
    //   next: courses => this.courses = courses,
    //   error: err => console.error(err)
    // });
  }
  deleteCourseFromSubject(course: CourseDTO) {
    this.courseService.delete(course.id).subscribe({
      next: () => {
        const index = this.courses.indexOf(course);
        if (index > -1) {
          this.courses.splice(index, 1);
        }
      },
      error: (err) => {
        // TODO: notification
        console.error(err);
      }
    });
  }
  courseForm = this.formBuilder.group<CourseDTO>({
    id: 0,
    name: '',
    subject: this.route.snapshot.params['id'],
    studentsEnrolled: null,
    grades: null
  });

  saveCourse() {
    const course = this.courseForm.value as CourseDTO;
    console.log(course);
    this.showCourseForm = false;
    const id=this.route.snapshot.params['id'];
    console.log(id);
    this.courseService.create(course).subscribe({
      next: () => {
        // TODO: notification
        this.router.navigateByUrl('subject-list');
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  toggleCourseForm(): void {
    this.showCourseForm = !this.showCourseForm;
  }
  goToCourseStudents(id: number) {
    this.router.navigate([ '/course-student', id ]);
  }
}
