import {
  formatFiles,
  generateFiles,
  joinPathFragments,
  readProjectConfiguration,
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
      updateCodeownersFile(tree, codePath, options.codeowners);

      const formattedName = `${options.scope}-${options.domain}-${type}-${options.name}`;
      createTestSetupFile(tree, formattedName);
    }
  } else {
    await generateLibrary(tree, options);

    const codePath = `libs/${options.scope}/${options.domain}/${options.type}/${options.name}`;
    updateCodeownersFile(tree, codePath, options.codeowners);

    const formattedName = `${options.scope}-${options.domain}-${options.type}-${options.name}`;
    createTestSetupFile(tree, formattedName);
  }

  await formatFiles(tree);
}

async function generateLibrary(tree, options) {
  options.tags = `scope:${options.scope},domain:${options.domain},type:${options.type}`;
  options.importPath = `@nxConfApp/${options.scope}/${options.domain}/${options.type}/${options.name}`;
  options.directory = `${options.scope}/${options.domain}/${options.type}`;

  await libraryGenerator(tree, options);
}

function updateCodeownersFile(tree: Tree, path: string, codeowners: string) {
	if (codeowners) {
		const filePath = '.github/CODEOWNERS';
		const codeownersFile = tree.read(filePath);

		if (codeownersFile) {
			tree.write(
				filePath,
				Buffer.concat([codeownersFile, Buffer.from(`\n/${path} ${codeowners}`)]),
			);
		}
	}
}

function createTestSetupFile(
	tree: Tree,
	name: string,
) {
	const libraryRoot = readProjectConfiguration(tree, name).root;
	generateFiles(tree, joinPathFragments(__dirname, 'files'), libraryRoot, {
    template: ''
  });
}

    