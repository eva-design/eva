import path from 'path';
import { generateMappingPackage } from './generate';

const packages: string[] = process.argv.splice(2);

if (packages.length === 0) {
  console.error('No specified source mapping package name. Stopping\n');
  process.exit(1);
}

const mappingDir: string = path.resolve('packages', 'mapping');

packages.forEach((name: string) => {
  const source: string = path.resolve(mappingDir, name);
  generateMappingPackage(source);
});
