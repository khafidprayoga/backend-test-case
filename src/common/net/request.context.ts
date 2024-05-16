import { v4 as uuid } from 'uuid';

export interface RequestContext {
  requestId: string;
}

type _graphMetadata = {
  operationName: string;
  query: string;
};

export const incomingContextHandler = async ({
  req,
  res,
}: {
  req: any;
  res: any;
}) => {
  const { operationName } = req.body as _graphMetadata;
  if (operationName === 'IntrospectionQuery') {
    return {};
  }

  const reqid = uuid();
  const ctx: RequestContext = {
    requestId: reqid,
  };

  return ctx;
};
