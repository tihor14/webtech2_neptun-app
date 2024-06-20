export interface UserDto {
    _id: string;
    id: string;
    name: string;
    address: string;
    phone: string;
    idCard: string;
    status: string;
  }
  
  export class UserDtoClass implements UserDto {
    constructor(
      public _id: string,
      public id: string,
      public name: string,
      public address: string,
      public phone: string,
      public idCard: string,
      public status: string
    ) {}
  }
  