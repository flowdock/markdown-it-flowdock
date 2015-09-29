function replaceUrlTextWithAutoLinkUrl(text) {
  const urlMatcher = /((https?|ftp|file):\/\/[^ ]+[^ )*_])/ig;
  return text
    .replace(urlMatcher,"<$1>")
    .replace(/<<([^>]+)>>/ig, "<$1>");
}

function dealWithCodeBlock(text) {
  const startOfCodeBlock = text.indexOf('`');

  if(startOfCodeBlock === -1) {
    return replaceUrlTextWithAutoLinkUrl(text);
  }

  const frontPart = text.slice(0, startOfCodeBlock);
  const endOfCodeBlock = text.indexOf('`', startOfCodeBlock + 1) + 1;
  const codeBlock = text.slice(startOfCodeBlock, endOfCodeBlock);

  return replaceUrlTextWithAutoLinkUrl(frontPart) + codeBlock + dealWithCodeBlock(text.slice(endOfCodeBlock));
}

function flowdockUrl(state) {
  for (let token of state.tokens) {
    if (token.type !== 'inline') { continue; }

    token.content = dealWithCodeBlock(token.content);
  }
}

export default function(md, options) {
  md.core.ruler.after('block', 'flowdock-url', flowdockUrl);
}
