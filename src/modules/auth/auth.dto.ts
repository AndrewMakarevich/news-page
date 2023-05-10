import { EmailConstraint } from 'src/decorators/constraints/users/emailConstraint.decorator';
import { PasswordConstraint } from 'src/decorators/constraints/users/passwordConstraint.decorator';
import { UsernameConstraint } from 'src/decorators/constraints/users/usernameConstraint.decorator';

export class RegisterDto {
  @UsernameConstraint()
  username: string;

  @EmailConstraint()
  email: string;

  @PasswordConstraint()
  password: string;
}

export class LoginDto {
  @UsernameConstraint()
  username: string;

  @PasswordConstraint()
  password: string;
}
