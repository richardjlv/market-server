module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [['@babel/plugin-proposal-class-properties', { loose: true }]],
  ignore: ['**/*.spec.ts'],
};
