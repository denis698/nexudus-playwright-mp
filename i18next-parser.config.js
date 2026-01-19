module.exports = {
  output: 'src/public/assets/locales/$LOCALE/$NAMESPACE.json',
  input: ['./src/**/*.ts', './src/**/*.tsx'],
  sort: true,
  keySeparator: false,
  nsSeparator: false,
  namespaceSeparator: false,
  useKeysAsDefaultValue: true,

  locales: ['en', 'es'],
  lexers: { js: ['JsxLexer'] },
};
