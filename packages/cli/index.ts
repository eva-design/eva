import Program from 'commander';

function registerCommands(): void {
  require('./commands/bootstrap').default(Program);
}

registerCommands();

Program.parse(process.argv);

