import {
  Tree,
} from '@nrwl/devkit';
import { MyGeneratorGeneratorSchema } from './schema';
import { libraryGenerator } from '@nrwl/angular/generators';

export default async function (tree: Tree, options: MyGeneratorGeneratorSchema) {
  await libraryGenerator(tree, options);
}



