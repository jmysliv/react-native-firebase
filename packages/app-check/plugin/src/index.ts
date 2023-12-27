import { ConfigPlugin, withPlugins, createRunOncePlugin } from '@expo/config-plugins';

import { withAppCheckModule } from './ios';

/**
 * A config plugin for configuring `@react-native-firebase/app-check`
 */
const withRnFirebaseAppCheck: ConfigPlugin = config => {
  return withPlugins(config, [withAppCheckModule]);
};

const pak = require('@react-native-firebase/app-check/package.json');
export default createRunOncePlugin(withRnFirebaseAppCheck, pak.name, pak.version);
