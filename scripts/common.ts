import * as path from 'path';

export type GulpCompletionCallback = (error?: any) => void;

export const ROOT_DIR: string = path.resolve(__dirname, '../');
export const PACKAGES_DIR: string = path.resolve(ROOT_DIR, 'packages');
export const PACKAGES_BUILD_DIR: string = path.resolve(ROOT_DIR, 'dist');
