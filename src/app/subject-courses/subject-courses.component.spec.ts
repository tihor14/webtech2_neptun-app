import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectCoursesComponent } from './subject-courses.component';

describe('SubjectCoursesComponent', () => {
  let component: SubjectCoursesComponent;
  let fixture: ComponentFixture<SubjectCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectCoursesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubjectCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
