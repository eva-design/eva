import {SchemaType} from '../../../dss/types/schema';

export const generateMappingTypes = (mapping: SchemaType): string => {
  let fileContent = '';
  Object.entries(mapping.components).forEach((componentEntry: [string, Record<any, any>]) => {
    fileContent += `export type ${componentEntry[0]}Appearance = ${Object.keys(componentEntry[1].meta.appearances).map(x => `\'${x}\'`).join(' | ')};\n`;
    Object.entries(componentEntry[1].meta.variantGroups).forEach(
      (componentVariantGroupEntry: [string, Record<any, any>]) => {
        fileContent += `export type ${componentEntry[0]}${capitalizeFirstLetter(componentVariantGroupEntry[0])} = ${Object.keys(componentVariantGroupEntry[1]).map(x => `\'${x}\'`).join(' | ')};\n`;
      });
    if (Object.keys(componentEntry[1].meta.states).length) {
      fileContent += `export type ${componentEntry[0]}State = ${Object.keys(componentEntry[1].meta.states).map(x => `\'${x}\'`).join(' | ')};\n`;
    }
    fileContent += '\n';
  });
  return fileContent;
};

export const generateThemeTypes = (theme: Record<any, any>): string => {
  return `export type ThemeColors = ${Object.keys(theme).map(x => `\'${x}\'`).join('\n  | ')};\n`;
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
