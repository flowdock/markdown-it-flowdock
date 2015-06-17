import parser from './parser';

function flowdockMention(tokens, idx) {
  var tag = tokens[idx].content;
  var markup = tokens[idx].markup;
  return '<a class="mention">' + markup + tag + '</a>';
}

export default function(md, options) {
  const split = "@|＠";
  const mention = parser(md, 'mention', new RegExp(split));
  md.core.ruler.push('mention', mention);
  md.renderer.rules.mention = flowdockMention;
};
