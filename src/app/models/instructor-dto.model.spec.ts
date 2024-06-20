import { InstructorDtoClass } from './instructor-dto.model';

describe('InstructorDtoClass', () => {
  it('should create an instance', () => {
    const instructorDto = new InstructorDtoClass(1, 'John Doe', 'Math', 'john.doe@example.com', 'Calculus');
    expect(instructorDto).toBeTruthy();
  });
});
