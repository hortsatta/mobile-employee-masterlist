module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        require.resolve('babel-plugin-module-resolver'),
        {
          root: ['.'],
          alias: {
            assets: './src/assets',
            config: './src/config',
            features: './src/features',
            helpers: './src/helpers',
            models: './src/models',
            services: './src/services',
            store: './src/store',
            types: './src/@types'
          }
        }
      ],
      [
        'module:react-native-dotenv',
        {
          'moduleName': '@env',
          'path': '.env',
          'blocklist': null,
          'allowlist': null,
          'safe': false,
          'allowUndefined': true,
          'verbose': false
        }
      ],
      'react-native-reanimated/plugin'
    ],
    env: {
      production: {
        plugins: ['react-native-paper/babel']
      }
    }
  };
};
