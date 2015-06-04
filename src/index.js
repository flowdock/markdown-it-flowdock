import hashtag from './hashtag';
import mention from './mention';

export default function(md, options) {
  hashtag(md, options);
  mention(md, options);
};
