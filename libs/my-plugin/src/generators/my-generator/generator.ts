import {
  Tree,
} from '@nrwl/devkit';
import { MyGeneratorGeneratorSchema } from './schema';
import { libraryGenerator } from '@nrwl/angular/generators';

const ALL_TYPES = ['feature', 'ui', 'util', 'data-access'];

export default async function (tree: Tree, options: MyGeneratorGeneratorSchema) {
  if (options.type === 'all') {
    for(const type of ALL_TYPES) {
      const libOptions = {
        ...options,
        type
      }
      await generateLibrary(tree, libOptions);

      const codePath = `libs/${options.scope}/${options.domain}/${type}/${options.name}`;
      updateCodeowners(tree, codePath, options.codeowners);
    }
  } else {
    await libraryGenerator(tree, options);

    const codePath = `libs/${options.scope}/${options.domain}/${options.type}/${options.name}`;
    updateCodeowners(tree, codePath, options.codeowners);
  }

}

async function generateLibrary(tree, options) {
  options.tags = `scope:${options.scope},domain:${options.domain},type:${options.type}`;
  options.importPath = `@nxConfApp/${options.scope}/${options.domain}/${options.type}/${options.name}`;
  options.directory = `${options.scope}/${options.domain}/${options.type}`;

  await libraryGenerator(tree, options);
}

function updateCodeowners(tree: Tree, path: string, codeowners: string) {
	if (codeowners) {
		const filePath = '.github/CODEOWNERS';
		const contents = tree.read(filePath);
		if (contents) {
			tree.write(
				filePath,
				Buffer.concat([contents, Buffer.from(`\n/${path} ${codeowners}\n`)]),
			);
		}
	}
}


