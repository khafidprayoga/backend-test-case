import { IncomingMessage, ServerResponse } from 'node:http';
import { v4 as uuid } from 'uuid';

export interface RequestContext {
  requestId: string;
}

export const incomingContextHandler = async ({
  req,
  res,
}: {
  req: IncomingMessage;
  res: ServerResponse;
}) => {
  const reqid = uuid();
  const ctx: RequestContext = {
    requestId: reqid,
  };

  console.log(`incoming request with requestId: ${reqid}`);
  return ctx;
};
