import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Tree, readProjectConfiguration } from '@nrwl/devkit';

import generator from './generator';
import { MyGeneratorGeneratorSchema } from './schema';

describe('my-generator generator', () => {
  let appTree: Tree;
  const options: MyGeneratorGeneratorSchema = { name: 'test', type: 'util', scope: "shared", domain: "cats" };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'shared-cats-util-test');
    expect(config).toBeDefined();
  });
});
