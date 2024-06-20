export interface InstructorDto {
    id: number;
    name: string;
    department: string;
    email: string;
    subjectTaught: string;
  }
  
  export class InstructorDtoClass implements InstructorDto {
    constructor(
      public id: number,
      public name: string,
      public department: string,
      public email: string,
      public subjectTaught: string
    ) {}
  }
  