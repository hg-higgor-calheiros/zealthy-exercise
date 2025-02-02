import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  Validate,
} from 'class-validator';

const ALLOWED_COMPONENTS = ['about_me', 'birthday', 'address_form'];

@ValidatorConstraint({ async: false })
export class AllowedComponents implements ValidatorConstraintInterface {
  validate(components: string[]) {
    return components.every((component) =>
      ALLOWED_COMPONENTS.includes(component),
    );
  }
}

export class CreateStepDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  path: string;

  @IsArray()
  @IsNotEmpty()
  @Validate(AllowedComponents, {
    message: 'Invalid component name',
  })
  components: string[];
}
