function fixUrlsEndingInAParen(canidate) {
  const matches = canidate.match(/(\(<[^>]+>\))|<([^>]+)>\)/);

  if ((matches !== undefined) && (matches !== null)) {
    const brokenLink = matches[2];
    
    if((brokenLink !== undefined) && (brokenLink !== null)) {
      const fixedCanidate = canidate.replace("<" + matches[2] + ">)", "<" + matches[2] + ")>");
      return fixUrlsEndingInAParen(fixedCanidate);
    }
  }

  return canidate;
}

function replaceUrlTextWithAutoLinkUrl(text) {
  const urlMatcher = /([a-z-_.:]+:\/\/\S+[^)\W]-?\/?)/ig;
  var urlSMatcher = "([^>]+)\>s+$";
  var firstPass = text.replace(urlMatcher, "<$1>");
  var sequenceOfString = "";
  
  if(firstPass.match(urlSMatcher)) {
     var index = firstPass.lastIndexOf('>');
     sequenceOfString = firstPass.substring(index + 1, firstPass.length)
  }

  return fixUrlsEndingInAParen(firstPass)
    .replace(/(<_([^>]+)_>)/, "_[$2]($2)_")                   // Fix for URLs included in _<url>_
    .replace(/\[([^\]]+)\]\(<([^>]+)>\)/, "[$1]($2)")         // Fix for URLs already in markdown syntax []()
    .replace(/<(onenote:[^>]+)>/, "[$1]($1)")                 // Fix for onenote urls
    .replace(/<<([^>]+)>>/ig, "<$1>")                         // Fix for URLs already surrounded by <>
    .replace(/<([^>]+)\>s+$/, "<$1"+sequenceOfString+">");    // Fix for URLs ended with 's'           
}

function dealWithCodeBlock(text) {
  const startOfCodeBlock = text.indexOf('`');

  if(startOfCodeBlock === -1) {
    return replaceUrlTextWithAutoLinkUrl(text);
  }

  const frontPart = text.slice(0, startOfCodeBlock);
  const nextCodeBlockMarker = text.indexOf('`', startOfCodeBlock + 1);
  const endOfCodeBlock = nextCodeBlockMarker === -1 ? text.length : nextCodeBlockMarker + 1;
  const codeBlock = text.slice(startOfCodeBlock, endOfCodeBlock);

  return replaceUrlTextWithAutoLinkUrl(frontPart) + codeBlock + dealWithCodeBlock(text.slice(endOfCodeBlock));
}

function flowdockUrl(state) {
  var tokens = state.tokens;
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];
    if (token.type !== 'inline') { continue; }

    token.content = dealWithCodeBlock(token.content);
  }
}

export default function(md, options) {
  md.core.ruler.after('block', 'flowdock-url', flowdockUrl);
}
