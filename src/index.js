import hashtag from './hashtag';
import mention from './mention';
import url from './url';

export default function(md, options) {
  hashtag(md, options);
  mention(md, options);
  url(md, options);
};
