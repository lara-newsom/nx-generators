import {
  Tree,
} from '@nrwl/devkit';
import { MyGeneratorGeneratorSchema } from './schema';
import { libraryGenerator } from '@nrwl/angular/generators';

export default async function (tree: Tree, options: MyGeneratorGeneratorSchema) {
  options.tags = `scope:${options.scope},domain:${options.domain},type:${options.type}`;
  options.importPath = `@nxConfApp/${options.scope}/${options.domain}/${options.name}`;
  options.directory = `${options.scope}/${options.domain}/${options.type}`;

  await libraryGenerator(tree, options);
}



