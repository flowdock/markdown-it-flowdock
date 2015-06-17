import * as fs from 'fs';
import * as unicode from '../src/unicode';
const data = `
// Automatically compiled with support/unicode.js
module.exports = ${JSON.stringify(unicode)};
`

fs.writeFileSync('dist/unicode.js', data)
