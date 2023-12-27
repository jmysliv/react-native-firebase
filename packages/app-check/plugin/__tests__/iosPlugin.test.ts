import fs from 'fs/promises';
import path from 'path';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { modifyAppDelegate } from '../src/ios/appDelegate';

describe('Config Plugin iOS Tests', function () {
  beforeEach(function () {
    jest.resetAllMocks();
  });

  it('initialiazes App Check', async function () {
    const appDelegate = await fs.readFile(path.join(__dirname, './fixtures/AppDelegate.mm'), {
      encoding: 'utf8',
    });
    const result = modifyAppDelegate(appDelegate);
    expect(result).toMatchSnapshot();
  });

  it('does not add the app check import multiple times', async function () {
    const singleImport = '#import "AppDelegate.h"\n#import "RNFBAppCheckModule.h"\n';
    const doubleImport = singleImport + '#import "RNFBAppCheckModule.h"\n';

    const appDelegate = await fs.readFile(path.join(__dirname, './fixtures/AppDelegate.mm'), {
      encoding: 'utf8',
    });
    expect(appDelegate).not.toContain(singleImport);

    const onceModifiedAppDelegate = modifyAppDelegate(appDelegate);
    expect(onceModifiedAppDelegate).toContain(singleImport);
    expect(onceModifiedAppDelegate).not.toContain(doubleImport);

    const twiceModifiedAppDelegate = modifyAppDelegate(onceModifiedAppDelegate);
    expect(twiceModifiedAppDelegate).toContain(singleImport);
    expect(twiceModifiedAppDelegate).not.toContain(doubleImport);
  });
});
