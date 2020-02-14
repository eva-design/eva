import childProcess from 'child_process';

childProcess.execSync('tsc');

/*
 * Move binaries to folder containing tsc output.
 * Could not be handled by configuring tsconfig.json
 */
childProcess.execSync('cp -r ./packages/cli/bin ./dist/cli');
