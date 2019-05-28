import { generateMappingPackage } from './generate';

const packages: string[] = process.argv.splice(2);

if (packages.length === 0) {
  console.error('No specified mapping package.\n');
  process.exit(1);
}

packages.forEach(generateMappingPackage);
