import path from 'path';
import { SchemaType } from '@eva-design/dss';
import { writeFileSync } from 'fs';

interface RawSchemaDefinitions {
  [controlName: string]: RawControlDefinitions;
}

interface RawControlDefinitions {
  [parameterName: string]: 'string' | 'number';
}

const scriptArguments: string[] = process.argv.splice(2);

if (scriptArguments.length === 0) {
  console.error('No specified mapping package.\n');
  process.exit(1);
}

const { [0]: packageNameArgument } = scriptArguments;

main();

function main() {
  const schemaPackagePath: string = path.resolve('packages', packageNameArgument);
  const schemaDefinitionsFilePath: string = `${schemaPackagePath}/${packageNameArgument}.d.ts`;

  const schema: SchemaType = require(`${schemaPackagePath}/mapping.json`);

  const rawSchemaDefinitions: RawSchemaDefinitions = createRawDefinitionsForSchema(schema);
  const writableSchemaDefinitions: string = createWritableSchemaDefinitionsFromRawSource(rawSchemaDefinitions);

  writeFileSync(schemaDefinitionsFilePath, writableSchemaDefinitions);
}

/**
 * @returns object with control definitions
 * key - control name,
 * value `raw` definition of control parameters
 *
 * e.g { Button: { backgroundColor: 'string', ... } }
 */
function createRawDefinitionsForSchema(schema: SchemaType): RawSchemaDefinitions {
  return Object.keys(schema.components).reduce((acc: RawSchemaDefinitions, controlName: string) => {
    const controlDefinitions = createRawDefinitionsForControl(schema, controlName);
    return { ...acc, [controlName]: controlDefinitions };
  }, {});
}

/**
 * @returns object with control definitions
 * key - parameter name,
 * value `raw` definition parameter
 *
 * e.g { backgroundColor: 'string', ... }
 */
function createRawDefinitionsForControl(schema: SchemaType, controlName: string): RawControlDefinitions {
  const { [controlName]: componentMapping } = schema.components;

  return Object.keys(componentMapping.meta.parameters).reduce((acc: RawControlDefinitions, parameterKey: string) => {
    const { [parameterKey]: parameterMeta } = componentMapping.meta.parameters;
    return { ...acc, [parameterKey]: parameterMeta.type } as RawControlDefinitions;
  }, {});
}

function createWritableSchemaDefinitionsFromRawSource(rawSource: RawSchemaDefinitions): string {
  return Object.keys(rawSource).reduce((acc: string, controlName: string): string => {
    const controlDefinitionsOutput = createWritableControlDefinitionsFromRawSource(rawSource, controlName);
    return acc.concat(controlDefinitionsOutput);
  }, '');
}

/**
 * @returns raw control definitions mapped to TypeScript interfaces
 *
 * e.g { Button: { backgroundColor: 'string', ... } }
 * -> `export interface ButtonParameters { backgroundColor: string; ... }`
 */
function createWritableControlDefinitionsFromRawSource(rawSource: RawSchemaDefinitions, controlName: string): string {
  const { [controlName]: rawControlDefinitions } = rawSource;

  const jsonDefinitions: string = JSON.stringify(rawControlDefinitions, null, 2);
  const noQuotesDefinitions: string = jsonDefinitions.replace(/["']/g, '');
  const writableDefinitions: string = noQuotesDefinitions.replace(/,/g, ';');

  return `export interface ${controlName}Parameters ${writableDefinitions}`;
}

