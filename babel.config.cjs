module.exports = {
  presets: [
    ['@babel/preset-env', {
      modules: 'commonjs'
    }],
    '@babel/preset-react'
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-private-property-in-object',
    'babel-plugin-styled-components',
    '@babel/plugin-proposal-class-properties',
  ],
};