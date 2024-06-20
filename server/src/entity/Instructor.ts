
export class Instructor {

    id: number;
    
    name: string;

    department: string;

    email: string;

    subjectTaught: string;

    constructor(instructor: any) {
        this.id = instructor.id
        this.name = instructor.name
        this.department = instructor.department
        this.email = instructor.email
        this.subjectTaught = instructor.subjectTaught
    }
}