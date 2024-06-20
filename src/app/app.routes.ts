import { Routes } from '@angular/router';
import { InstructorListComponent } from './instructor-list/instructor-list.component';
import { InstructorComponent } from './instructor/instructor.component';
import { InstructorFormComponent } from './instructor-form/instructor-form.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
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
    }    
];
