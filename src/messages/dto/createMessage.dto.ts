import User from 'src/users/user.entity';

class CreateMessageDto {
  from: User;
  to: User;
  message: string;
}

export default CreateMessageDto;
