import type { DBDegen, DBNewDegen } from './db/schema.ts';

export type TRawDegen = { theme: string, text: string };
export type TDegen = DBDegen;
export type TNewDegen = DBNewDegen;
export type TTheme = 'career' | 'love' | 'self awareness' | 'family' | 'success' | 'happiness' | 'relationship' | 'self development' | 'security' | 'health';

export type TObjectWithId = { id: number };
export type TGetDegenRequest = { id?: number, theme?: TTheme };