import {tagEnd, tagCharacter} from './unicode';
import parser from './parser';

function flowdockHashtag(tokens, idx) {
  var tag = tokens[idx].content;
  var markup = tokens[idx].markup;
  return '<a class="tag">' + markup + tag + '</a>';
}

export default function(md, options) {
  const split = "#|＃";
  const regex = new RegExp("(?:^|$|[^" + tagEnd.slice(1) + ")((?:" + split + ")(?:" + tagCharacter + ")*(?:" + tagEnd + ")+)", "g");
  const hashtag = parser(md, 'hashtag', new RegExp(split), regex);
  md.core.ruler.push('hashtag', hashtag);
  md.renderer.rules.hashtag = flowdockHashtag;
};
