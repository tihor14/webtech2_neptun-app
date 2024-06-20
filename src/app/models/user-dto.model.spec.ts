import { UserDtoClass } from './user-dto.model';

describe('UserDtoClass', () => {
  it('should create an instance', () => {
    const userDto = new UserDtoClass('1', '2', 'John Doe', '123 Street', '123456789', 'ID12345', 'active');
    expect(userDto).toBeTruthy();
  });
});
