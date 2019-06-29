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
  var urlMatcher = /([a-z-_.:]+:\/\/\S+[^)\W]-?\/?)/ig;
  var urlSMatcher = "([^>]+)\>s+$";
  var firstPass = text.replace(urlMatcher, "<$1>");
  var sSubstring = "";
  var formattedString = "";

  var isChrome = checkForChrome()
  if(firstPass.match(urlSMatcher) && isChrome) {
     var index = firstPass.lastIndexOf('>');
     sSubstring = firstPass.substring(index+1, firstPass.length)
  }
  
  formattedString = fixUrlsEndingInAParen(firstPass)
  .replace(/(<_([^>]+)_>)/, "_[$2]($2)_") // Fix for URLs included in _<url>_
  .replace(/\[([^\]]+)\]\(<([^>]+)>\)/, "[$1]($2)") // Fix for URLs already in markdown syntax []()
  .replace(/<(onenote:[^>]+)>/, "[$1]($1)") // Fix for onenote urls
  .replace(/<<([^>]+)>>/ig, "<$1>") // Fix for URLs already surrounded by <>
  .replace(/<([^>]+)\>s+$/, "<$1"+sSubstring+">");

  if(isChrome) {
    formattedString = fixUrlsEndingInAParen(firstPass).replace(/<([^>]+)\>s+$/, "<$1"+sSubstring+">")
  }

  return formattedString;        
}

function checkForChrome() {
  var isChromium = window.chrome;
  var winNav = window.navigator;
  var vendorName = winNav.vendor;
  var isOpera = typeof window.opr !== "undefined";
  var isIEedge = winNav.userAgent.indexOf("Edge") > -1;
  
  if(
    isChromium !== null &&
    typeof isChromium !== "undefined" &&
    vendorName === "Google Inc." &&
    isOpera === false &&
    isIEedge === false
  ) {
     return true;
  } else { 
     return false;
  }
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
