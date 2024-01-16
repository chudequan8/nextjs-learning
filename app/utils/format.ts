import prettier from 'prettier/standalone.mjs';
import prettierPluginTypescript from 'prettier/plugins/typescript.mjs';
import prettierPluginEstree from 'prettier/plugins/estree.mjs';

export const formatTsString = async (str: string) => {
  const formatString = await prettier.format(str, {
    parser: 'typescript',
    plugins: [prettierPluginTypescript, prettierPluginEstree],
  });
  return formatString;
};

export const formatWithWrapper = async (
  typeName: string,
  typeBody: string,
  description?: string,
) => {
  const formatString = await formatTsString(`
    /* ${description || typeName} */
    type ${typeName} = {
      ${typeBody}
    }
  `);
  return formatString;
};
