import {tagEnd, tagCharacter} from './unicode';
import parser from './parser';

function flowdockMention(tokens, idx) {
  var tag = tokens[idx].content;
  var markup = tokens[idx].markup;
  return '<a class="mention">' + markup + tag + '</a>';
}

export default function(md, options) {
  const split = "@|＠";
  const regex = new RegExp("(?:^|$|[^" + tagEnd.slice(1) + ")((?:" + split + ")(?:" + tagCharacter + ")*(?:" + tagEnd + ")+)", "g");
  const mention = parser(md, 'mention', new RegExp(split), regex);
  md.core.ruler.push('mention', mention);
  md.renderer.rules.mention = flowdockMention;
};
