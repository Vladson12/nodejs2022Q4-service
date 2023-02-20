import { registerDecorator, isUUID, ValidationOptions } from 'class-validator';

export function IsUuidOrNull(
  property: string,
  validationOptions?: ValidationOptions,
) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsUuidOrNull',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return value === null || (typeof value === 'string' && isUUID(value));
        },
      },
    });
  };
}
