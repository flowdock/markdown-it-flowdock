import FlowdockText from 'flowdock-text'
import parser from './parser'

function flowdockMention(tokens, idx) {
  var tag = tokens[idx].content;
  var markup = tokens[idx].markup;
  return '<a class="mention">' + markup + tag + '</a>';
}

export default function(md, options) {
  const mention = parser(md, 'mention', /@|＠/, FlowdockText.regexen.autoLinkMentions);
  md.core.ruler.push('mention', mention);
  md.renderer.rules.mention = flowdockMention;
};
