module.exports = {
  presets: [
    [
      "@babel/preset-react"
    ],
    [
      "@babel/preset-env",{"modules": "false"}
    ]
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-private-property-in-object',
    'babel-plugin-transform-import-meta',
    'babel-plugin-transform-esm',
    'babel-plugin-styled-components',
    '@babel/plugin-proposal-class-properties',
  ],
};