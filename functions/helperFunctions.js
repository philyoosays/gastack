module.exports = {
  prepSearch(search) {
    let result = search.split('/').join("");
    result = result.split("'").join("''");
    result = result.split(' ').join(' | ');
    return result;
  },

  concatWildcard(tag) {
    let wildcard = '%' + tag + '%';
    return wildcard;
  },

  prepLookStart(string) {
    let result = string.split(' | ').join(':* | ') + ':*';
    return result;
  },

  // trimBR(html) {
  //   let string = html;
  //   if(string.slice(-4) === '<br>') {
  //     string = string.slice(0,-4);
  //     removeEndingBR(string);
  //   } else {
  //     return string;
  //   }
  // },

  // trimBR(html) {
  //   let string = html;
  //   while(string.slice(-4) === '<br>') {
  //     string = string.slice(0,-4);
  //   }
  //   while(string.slice(0,4) === '<br>') {
  //     string = string.slice(4);
  //   }
  //   return string;
  // },

  brEnd(html) {
    return html.slice(-4) === '<br>' ? brEnd(html.slice(0,-4)) : html;
  },

  brFront(html) {
    return html.slice(0,4) === '<br>' ? brFront(html.slice(4)) : html;
  },

  pbrEnd(html) {
    return html.slice(-11) === '<p><br></p>' ? pbrEnd(html.slice(0,-11)) : html;
  },

  pbrFront(html) {
    return html.slice(0,11) === '<p><br></p>' ? pbrFront(html.slice(11)) : html;
  },

  trimBR(html) {
    let result = brEnd(html);
    result = brFront(result);
    result = pbrEnd(result);
    result = pbrFront(result);
    return result;
  },

  shortenBR(html) {
  return (html.indexOf('<br><br>') !== -1) ? shortenBR(html.replace('<br><br>', '<br>')) : html
}

}
