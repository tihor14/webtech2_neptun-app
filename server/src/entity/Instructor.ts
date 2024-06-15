
export class Instructor {

    _id: string;
    
    name: string;

    department: string;

    email: string;

    subjectTaught: string;

    constructor(item: any) {
        this._id = item._id
        this.name = item.name
        this.department = item.department
        this.email = item.email
        this.subjectTaught = item.subjectTaught
    }
}