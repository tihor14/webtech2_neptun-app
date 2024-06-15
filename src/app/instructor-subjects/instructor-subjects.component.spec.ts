import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorSubjectsComponent } from './instructor-subjects.component';

describe('InstructorSubjectsComponent', () => {
  let component: InstructorSubjectsComponent;
  let fixture: ComponentFixture<InstructorSubjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorSubjectsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstructorSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
