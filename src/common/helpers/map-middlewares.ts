import { RequestMethod, MiddlewareConsumer } from '@nestjs/common';

export type MiddlewareRoute = {
  path: string;
  method: RequestMethod;
};

export type MiddlewareConsumerParam = {
  middlewares: Function | Function[];
  routes: MiddlewareRoute | MiddlewareRoute[] | string;
};

export const mapMiddlewares = function (
  consumer: MiddlewareConsumer,
  consumerParams: MiddlewareConsumerParam[],
) {
  consumerParams.forEach(({ middlewares, routes }) => {
    consumer.apply(middlewares as any).forRoutes(routes as any);
  });
};
