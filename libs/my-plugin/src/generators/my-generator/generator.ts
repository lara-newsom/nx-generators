import {
  Tree,
} from '@nrwl/devkit';
import { MyGeneratorGeneratorSchema } from './schema';
import { libraryGenerator } from '@nrwl/angular/generators';

export default async function (tree: Tree, options: MyGeneratorGeneratorSchema) {
  options.importPath = `@nxConfApp/${options.name}`;

  await libraryGenerator(tree, options);
}



