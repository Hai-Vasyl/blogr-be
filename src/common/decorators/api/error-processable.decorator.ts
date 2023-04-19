import {
  DatabaseException,
  DefaultException,
} from '@common/classes/exceptions';
import { TypeORMError } from 'typeorm';

export const ErrorProcessable =
  () =>
  (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args) {
      try {
        return await originalMethod.apply(this, args);
      } catch (error) {
        if (error instanceof TypeORMError) {
          throw new DatabaseException(error.message);
        } else if (error instanceof Error) {
          throw new DefaultException(error.message);
        }

        throw error;
      }
    };

    return descriptor;
  };
