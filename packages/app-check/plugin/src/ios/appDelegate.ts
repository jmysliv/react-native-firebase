import { withAppDelegate, ConfigPlugin } from '@expo/config-plugins';

const APP_DELEGATE_IMPORT = '#import "AppDelegate.h"\n';
const APP_CHECK_IMPORT = '#import "RNFBAppCheckModule.h"\n';
const RNFI_CONFIGURE = '[FIRApp configure];\n';
const APP_CHECK_MODULE = '[RNFBAppCheckModule sharedInstance];\n';

export const modifyAppDelegate = (contents: string): string => {
  if (!contents.includes(APP_CHECK_IMPORT)) {
    contents = contents.replace(APP_DELEGATE_IMPORT, APP_DELEGATE_IMPORT + APP_CHECK_IMPORT);
  }
  if (contents.includes(RNFI_CONFIGURE) && !contents.includes(APP_CHECK_MODULE)) {
    const block = APP_CHECK_MODULE + RNFI_CONFIGURE;
    contents = contents.replace(RNFI_CONFIGURE, block);
  }
  return contents;
};

export const withAppCheckModule: ConfigPlugin = config =>
  withAppDelegate(config, async config => {
    // Add import
    const contents = modifyAppDelegate(config.modResults.contents);
    config.modResults.contents = contents;
    return config;
  });
