import { CommanderStatic } from 'commander';
import BootstrapService from '../services/bootstrap.service';

export default (program: CommanderStatic): void => {
  program.command('bootstrap')
         .action(BootstrapService.run);
};
