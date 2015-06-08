import regenerate from 'regenerate';

const tagBody = regenerate()
  .add(require('unicode-7.0.0/categories/L/code-points'))
  .add(require('unicode-7.0.0/categories/M/code-points'))
  .add(require('unicode-7.0.0/categories/N/code-points'))
  .add(require('unicode-7.0.0/categories/Pc/code-points'))
  .add(require('unicode-7.0.0/categories/Pd/code-points'));

export const tagEnd = tagBody.toString();
export const tagCharacter = tagBody.add(".").toString();
