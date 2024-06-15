import { Routes } from '@angular/router';
import { InstructorListComponent } from './instructor-list/instructor-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { InstructorComponent } from './instructor/instructor.component';
import { InstructorFormComponent } from './instructor-form/instructor-form.component';
import { InstructorSubjectsComponent } from './instructor-subjects/instructor-subjects.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { StudentComponent } from './student/student.component';
import { SubjectCoursesComponent } from './subject-courses/subject-courses.component';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseStudentComponent } from './course-student/course-student.component';
import { GradeComponent } from './grade/grade.component';

export const routes: Routes = [
    {
        path: 'instructor',
        component: InstructorComponent
    },
    {
        path: 'instructor-add',
        component: InstructorFormComponent
    },
    {
        path: 'instructor-edit/:id',
        component: InstructorFormComponent
    },
    {
        path: 'instructor-subjects/:id',
        component: InstructorSubjectsComponent
    },
    {
        path: 'student',
        component: StudentComponent
    },
    {
        path: 'student-add',
        component: StudentFormComponent
    },
    {
        path: 'student-edit/:id',
        component: StudentFormComponent
    },
    {
        path: 'subject-list',
        component: SubjectListComponent
    },
    {
        path: 'subject-courses/:id',
        component: SubjectCoursesComponent
    },
    {
        path: 'course-student/:id',
        component: CourseStudentComponent
    },
    {
        path: 'grade',
        component: GradeComponent
    }
];
