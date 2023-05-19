import { ActivationTokenConstraint } from 'src/decorators/constraints/user/activationTokenConstraint.decorator';
import { EmailConstraint } from 'src/decorators/constraints/user/emailConstraint.decorator';
import { PasswordConstraint } from 'src/decorators/constraints/user/passwordConstraint.decorator';
import { UsernameConstraint } from 'src/decorators/constraints/user/usernameConstraint.decorator';

export class RegisterDto {
  @UsernameConstraint()
  username: string;

  @EmailConstraint()
  email: string;

  @PasswordConstraint()
  password: string;
}

export class ActivateDto {
  @ActivationTokenConstraint()
  activationToken: string;
}

export class LoginDto {
  @UsernameConstraint()
  username: string;

  @PasswordConstraint()
  password: string;
}
