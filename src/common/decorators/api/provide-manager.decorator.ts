import { EntityManager } from 'typeorm';

export const ProvideManager =
  () =>
  (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args) {
      const manager =
        args.find((arg) => arg instanceof EntityManager) || this.manager;

      return await originalMethod.apply(this, [...args, manager]);
    };

    return descriptor;
  };
