import { registerDecorator, isUUID } from 'class-validator';

export function IsUuidOrNull() {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsUuidOrNull',
      target: object.constructor,
      propertyName: propertyName,
      validator: {
        validate(value: any) {
          return value === null || (typeof value === 'string' && isUUID(value));
        },
      },
    });
  };
}
