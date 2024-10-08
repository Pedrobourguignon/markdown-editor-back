import { ReturnUserDto } from 'src/users/dtos/returnUser.dto';

export class ReturnLoginDto {
  user: ReturnUserDto;
  accessToken: string;
}
