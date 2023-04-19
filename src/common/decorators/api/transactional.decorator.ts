import { DefaultException } from '@common/classes/exceptions';
import { EntityManager } from 'typeorm';

interface TransactionOptions {}

export const Transactional =
  (options?: TransactionOptions) =>
  (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any) {
      const manager = args.find((arg) => arg instanceof EntityManager);

      if (manager) {
        await originalMethod.apply(this, [...args, manager]);
      } else {
        const queryRunner = this.entityManager.connection.createQueryRunner();
        await queryRunner.startTransaction();
        try {
          await originalMethod.apply(this, [...args, queryRunner.manager]);

          await queryRunner.commitTransaction();
        } catch (error) {
          await queryRunner.rollbackTransaction();

          if (error instanceof Error) {
            throw new DefaultException(error.message);
          }

          throw error;
        } finally {
          await queryRunner.release();
        }
      }
    };

    return descriptor;
  };
