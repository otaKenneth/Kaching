module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          extensions: [
            '.ios.ts',
            '.android.ts',
            '.ts',
            '.ios.tsx',
            '.android.tsx',
            '.tsx',
            '.jsx',
            '.js',
            '.ios.js',
            '.android.js',
            '.json'
          ],
          alias: {
            "@app/api": "./src/api",
            "@app/components": "./src/components",
            "@app/hooks": "./src/hooks",
            "@app/navigations": "./src/navigations",
            "@app/screens": "./src/screens"
          }
        }
      ]
    ]
  };
};
