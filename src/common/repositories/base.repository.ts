import {
  DeepPartial,
  DeleteResult,
  EntityManager,
  EntityMetadata,
  EntityTarget,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  ObjectID,
  QueryRunner,
  RemoveOptions,
  Repository as IRepository,
  SaveOptions,
  SelectQueryBuilder,
  UpdateResult,
} from 'typeorm';

export class BaseRepository<Entity> implements IRepository<Entity> {
  metadata: EntityMetadata;
  findOne: (options: FindOneOptions<Entity>) => Promise<Entity>;
  target: EntityTarget<Entity>;
  manager: EntityManager;
  queryRunner: QueryRunner;
  createQueryBuilder: (
    alias?: string,
    queryRunner?: QueryRunner,
  ) => SelectQueryBuilder<Entity>;
  merge: (
    mergeIntoEntity: Entity,
    ...entityLikes: DeepPartial<Entity>[]
  ) => Entity;
  create: {
    (): Entity;
    (entityLikeArray: DeepPartial<Entity>[]): Entity[];
    (entityLike: DeepPartial<Entity>): Entity;
  };
  preload: (entityLike: DeepPartial<Entity>) => Promise<Entity>;
  save: {
    <T extends DeepPartial<Entity>>(
      entities: T[],
      options: SaveOptions & { reload: false },
    ): Promise<T[]>;
    <T extends DeepPartial<Entity>>(
      entities: T[],
      options?: SaveOptions,
    ): Promise<(T & Entity)[]>;
    <T extends DeepPartial<Entity>>(
      entity: T,
      options: SaveOptions & { reload: false },
    ): Promise<T>;
    <T extends DeepPartial<Entity>>(entity: T, options?: SaveOptions): Promise<
      T & Entity
    >;
  };
  remove: {
    (entities: Entity[], options?: RemoveOptions): Promise<Entity[]>;
    (entity: Entity, options?: RemoveOptions): Promise<Entity>;
  };
  softRemove: {
    <T extends DeepPartial<Entity>>(
      entities: T[],
      options: SaveOptions & { reload: false },
    ): Promise<T[]>;
    <T extends DeepPartial<Entity>>(
      entities: T[],
      options?: SaveOptions,
    ): Promise<(T & Entity)[]>;
    <T extends DeepPartial<Entity>>(
      entity: T,
      options: SaveOptions & { reload: false },
    ): Promise<T>;
    <T extends DeepPartial<Entity>>(entity: T, options?: SaveOptions): Promise<
      T & Entity
    >;
  };
  recover: {
    <T extends DeepPartial<Entity>>(
      entities: T[],
      options: SaveOptions & {
        reload: false;
      },
    ): Promise<T[]>;
    <T extends DeepPartial<Entity>>(
      entities: T[],
      options?: SaveOptions,
    ): Promise<(T & Entity)[]>;
    <T extends DeepPartial<Entity>>(
      entity: T,
      options: SaveOptions & { reload: false },
    ): Promise<T>;
    <T extends DeepPartial<Entity>>(entity: T, options?: SaveOptions): Promise<
      T & Entity
    >;
  };
  insert: any;
  update: any;
  upsert: any;
  delete: (
    criteria:
      | string
      | number
      | Date
      | ObjectID
      | string[]
      | number[]
      | Date[]
      | ObjectID[]
      | FindOptionsWhere<Entity>,
  ) => Promise<DeleteResult>;
  softDelete: (
    criteria:
      | string
      | number
      | Date
      | ObjectID
      | string[]
      | number[]
      | Date[]
      | ObjectID[]
      | FindOptionsWhere<Entity>,
  ) => Promise<UpdateResult>;
  restore: (
    criteria:
      | string
      | number
      | Date
      | ObjectID
      | string[]
      | number[]
      | Date[]
      | ObjectID[]
      | FindOptionsWhere<Entity>,
  ) => Promise<UpdateResult>;
  exist: (options?: FindManyOptions<Entity>) => Promise<boolean>;
  count: (options?: FindManyOptions<Entity>) => Promise<number>;
  countBy: (
    where: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[],
  ) => Promise<number>;
  sum: any;
  average: any;
  minimum: any;
  maximum: any;
  find: (options?: FindManyOptions<Entity>) => Promise<Entity[]>;
  findBy: (
    where: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[],
  ) => Promise<Entity[]>;
  findAndCount: (
    options?: FindManyOptions<Entity>,
  ) => Promise<[Entity[], number]>;
  findAndCountBy: (
    where: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[],
  ) => Promise<[Entity[], number]>;
  findByIds: (ids: any[]) => Promise<Entity[]>;
  findOneBy: (
    where: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[],
  ) => Promise<Entity>;
  findOneById: (id: string | number | Date | ObjectID) => Promise<Entity>;
  findOneOrFail: (options: FindOneOptions<Entity>) => Promise<Entity>;
  findOneByOrFail: (
    where: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[],
  ) => Promise<Entity>;
  query: (query: string, parameters?: any[]) => Promise<any>;
  clear: () => Promise<void>;
  increment: (
    conditions: FindOptionsWhere<Entity>,
    propertyPath: string,
    value: string | number,
  ) => Promise<UpdateResult>;
  decrement: (
    conditions: FindOptionsWhere<Entity>,
    propertyPath: string,
    value: string | number,
  ) => Promise<UpdateResult>;
  hasId: (entity: Entity) => boolean;
  getId: (entity: Entity) => any;
  extend<CustomRepository>(
    custom: CustomRepository & ThisType<this & CustomRepository>,
  ): this & CustomRepository {
    throw new Error('Method not implemented.');
  }

  public constructor(private readonly repository: IRepository<Entity>) {
    this.target = repository.target;
    this.manager = repository.manager;
    this.queryRunner = repository.queryRunner;
    this.createQueryBuilder = repository.createQueryBuilder;
    this.hasId = repository.hasId;
    this.getId = repository.getId;
    this.merge = repository.merge;
    this.create = repository.create;
    this.preload = repository.preload;
    this.save = repository.save;
    this.remove = repository.remove;
    this.softRemove = repository.softRemove;
    this.recover = repository.recover;
    this.insert = repository.insert;
    this.update = repository.update;
    this.upsert = repository.upsert;
    this.delete = repository.delete;
    this.softDelete = repository.softDelete;
    this.restore = repository.restore;
    this.exist = repository.exist;
    this.count = repository.count;
    this.countBy = repository.countBy;
    this.sum = repository.sum;
    this.average = repository.average;
    this.minimum = repository.minimum;
    this.maximum = repository.maximum;
    this.find = repository.find;
    this.findBy = repository.findBy;
    this.findAndCount = repository.findAndCount;
    this.findAndCountBy = repository.findAndCountBy;
    this.findByIds = repository.findByIds;
    this.findOne = repository.findOne;
    this.findOneBy = repository.findOneBy;
    this.findOneById = repository.findOneById;
    this.findOneOrFail = repository.findOneOrFail;
    this.findOneByOrFail = repository.findOneByOrFail;
    this.query = repository.query;
    this.clear = repository.clear;
    this.increment = repository.increment;
    this.decrement = repository.decrement;
    this.metadata = repository.metadata;
  }
}
