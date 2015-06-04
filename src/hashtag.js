import FlowdockText from 'flowdock-text'
import parser from './parser'

function flowdockHashtag(tokens, idx) {
  var tag = tokens[idx].content;
  var markup = tokens[idx].markup;
  return '<a class="tag">' + markup + tag + '</a>';
}

export default function(md, options) {
  const hashtag = parser(md, 'hashtag', /#|＃/, FlowdockText.regexen.autoLinkHashtags);
  md.core.ruler.push('hashtag', hashtag);
  md.renderer.rules.hashtag = flowdockHashtag;
};
