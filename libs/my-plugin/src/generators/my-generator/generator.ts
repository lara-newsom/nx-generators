import {
  Tree,
} from '@nrwl/devkit';
import { MyGeneratorGeneratorSchema } from './schema';
import { libraryGenerator } from '@nrwl/angular/generators';

const ALL_TYPES = ['feature', 'ui', 'util', 'data-access'];

export default async function (tree: Tree, options: MyGeneratorGeneratorSchema) {
  if (options.type === 'all') {
    for(const x of ALL_TYPES) {
      const libOptions = {
        ...options,
        type: x
      }
      await generateLibrary(tree, libOptions)
    }
  } else {
    await libraryGenerator(tree, options);
  }
}

async function generateLibrary(tree, options) {
  options.tags = `scope:${options.scope},domain:${options.domain},type:${options.type}`;
  options.importPath = `@nxConfApp/${options.scope}/${options.domain}/${options.type}/${options.name}`;
  options.directory = `${options.scope}/${options.domain}/${options.type}`;

  await libraryGenerator(tree, options);
}



