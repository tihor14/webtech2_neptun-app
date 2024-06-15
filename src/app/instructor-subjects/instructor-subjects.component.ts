import { Component, OnInit, inject } from '@angular/core';
import { SubjectService } from '../services/subject.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CourseDTO, InstructorDTO, SubjectDTO } from '../../../models';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CourseService } from '../services/course.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-instructor-subjects',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './instructor-subjects.component.html',
  styleUrl: './instructor-subjects.component.css'
})
export class InstructorSubjectsComponent implements OnInit{
  subjects: SubjectDTO[] = [];
  selectedSubject: SubjectDTO | null = null;
  courses: CourseDTO[] = [];
  router = inject(Router);
  formBuilder = inject(FormBuilder);
  showSubjectForm: boolean = false;

  activedRoute = inject(ActivatedRoute);

  constructor(
    private subjectService: SubjectService,
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.subjectService.subjectsOfInstructor(id).subscribe(subjects => {
      this.subjects = subjects;
    });
  }
  deleteSubjectFromInstructor(subject: SubjectDTO) {
    this.subjectService.delete(subject.id).subscribe({
      next: () => {
        const index = this.subjects.indexOf(subject);
        if (index > -1) {
          this.subjects.splice(index, 1);
        }
      },
      error: (err) => {
        // TODO: notification
        console.error(err);
      }
    });
  }
  subjectForm = this.formBuilder.group<SubjectDTO>({
    id: 0,
    name: '',
    instructor: this.route.snapshot.params['id'],
    course: null
  });

  saveSubject() {
    const subject = this.subjectForm.value as SubjectDTO;
    console.log(subject);
    this.showSubjectForm = false;
    const id=this.route.snapshot.params['id'];
    console.log(id);
    this.subjectService.create(subject).subscribe({
      next: () => {
        // TODO: notification
        this.router.navigateByUrl('instructor');
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  toggleSubjectForm(): void {
    this.showSubjectForm = !this.showSubjectForm;
  }
  // toggleCourses(subject: SubjectDTO): void {
  //   if (this.selectedSubject === subject) {
  //     this.selectedSubject = null;
  //   } else {
  //     this.selectedSubject = subject;
  //     // this.subjectService.coursesOfSubject(subject.id).subscribe(courses => {
  //     //   subject.course = courses;
  //     // });
  //     // this.courseService.coursesOfSubject(subject.id).subscribe(course => {
  //     //     subject.course = course;
  //     //   });
  //     // this.courseService.coursesOfSubject(subject.id).subscribe(courses => {
  //     //   this.courses = courses;
  //     // });
  //     // this.courseService.getAll().subscribe({
  //     //   next: courses => this.courses = courses,
  //     //   error: err => console.error(err)
  //     // });
  //   }
  // }
  
}
