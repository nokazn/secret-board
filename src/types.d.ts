import { IncomingMessage } from 'http';

export type AuthorizedIncomingMessage = IncomingMessage & { user: string };
