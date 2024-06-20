import { Component, OnInit, ViewChild, AfterViewInit, inject } from '@angular/core';
import { InstructorService } from '../services/instructor.service';
import { InstructorDto } from '../models/instructor-dto.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-instructor-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    FormsModule
  ],
  templateUrl: './instructor-list.component.html',
  styleUrls: ['./instructor-list.component.css']
})
export class InstructorListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'department',
    'email',
    'subjectTaught'
  ];
  dataSource: MatTableDataSource<InstructorDto>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  instructors: InstructorDto[] = [];
  instructorForm: FormGroup;

  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  discardId: string | undefined;
  updateItem: any;

  constructor(
    private instructorService: InstructorService,
    private formBuilder: FormBuilder,
    public authService: AuthService
  ) {
    this.instructorForm = this.formBuilder.group({
      id: [0],
      name: [''],
      department: [''],
      email: [''],
      subjectTaught: ['']
    });

    this.dataSource = new MatTableDataSource(this.instructors);
  }

  ngOnInit(): void {
    this.getInstructors();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getInstructors(): void {
    this.instructorService.getAll().subscribe({
      next: (data) => {
        console.log('Data received:', data);
        this.instructors = data;
        this.dataSource.data = this.instructors;
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }
  deleteInstructor(instructor: InstructorDto) {
    this.instructorService.delete(instructor.id).subscribe({
      next: () => {
        const index = this.instructors.indexOf(instructor);
        if (index > -1) {
          this.instructors.splice(index, 1);
        }
      },
      error: (err) => {
        // TODO: notification
        console.error(err);
      }
    });
  }
  
  // async onSubmit() {
  //   if (this.instructorForm.valid) {
  //     const itemData: InstructorDto = this.instructorForm.value;
  //     this.instructorService.create(itemData).subscribe({
  //       next: (instructorCreated) => {
  //         this.router.navigateByUrl('/instructor');
  //         this.instructorForm.reset();
  //         this.getInstructors();
  //       },
  //       error: (err) => {
  //         console.error('Error:', err);
  //       }
  //     });
  //   }
  // }
  goToInstructorForm(id: number) {
    this.router.navigate([ '/instructor-edit', id ]);
  }
  
}
