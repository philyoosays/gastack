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

  fetch(url, method, body) {
    if(method.toLowerCase() === 'put') {
      url += '?_method=PUT'
      method = 'post'
    } else if(method.toLowerCase() === 'delete') {
      url += '?_method=DELETE'
      method = 'post'
    }

    return fetch(url, {
      body: JSON.stringify(body),
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'content-type': 'application/json'
      },
      method: 'method',
      mode: 'cors',
      redirect: 'follow',
      referrer: 'no-referrer',
    })
      .then(response => response.json())
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

  // trimHTML(html) {
  //   while(html.indexOf('<br><br>')) {
  //     html.replace('<br><br>', '<br>')
  //   }
  //   while(html.slice(-11) === '<p><br></p>') {
  //     html.slice(0,-11)
  //   }
  //   while(html.slice(0,11) === '<p><br></p>') {
  //     html.slice(11)
  //   }
  //   while(html.slice(-4) === '<br>') {
  //     html = html.slice(0,-4);
  //   }
  //   while(html.slice(0,4) === '<br>') {
  //     html = html.slice(4);
  //   }
  //   return html;
  // },

// recursively kills all extraneous data
  trimHTML(html) {
    let temp = html.slice();
    temp = temp.split('<p><br></p>').join('<br>');
    temp = temp.replace('  ','\t');
    // temp = temp.split(';').join(';<br>');
    temp = temp.split('<br><br>').join('<br>');
    temp = temp.split('<br><br>').join('<br>');
    // temp = temp.split('}').join('<br>}');
    temp = temp.split('&lt;<br>').join('&lt;')
    temp = temp.split('<br> &nbsp;').join('')
    temp = temp.split('&nbsp;').join('')
    // temp = temp.split(') {').join(') { <br>');
    // temp = temp.replace('){').join('){<br>');
    if(temp.trim().slice(-4) === '<br>') {
      temp = temp.trim().slice(0,-4)
    } else if(temp.trim().slice(0,4) === '<br>') {
      temp = temp.trim().slice(4)
    }
    return temp
  },

  recursiveTrim(html) {
    if(temp.slice(-4) === '<br>') {
      temp = temp.slice(0,-4)
      return trimHTML(temp);
    } else if(temp.slice(0,4) === '<br>') {
      temp = temp.slice(4);
      return trimHTML(temp);
    } else {
      temp = temp.split(';').join(';<br>')
      return temp
    }
  },

  // brEnd(html) {
  //   // console.log(html.slice(-4))
  //   return html.slice(-4) === '<br>' ? brEnd(html.slice(0,-4)) : html;
  // },

  // brFront(html) {
  //   return html.slice(0,4) === '<br>' ? brFront(html.slice(4)) : html;
  // },

  // pbrEnd(html) {
  //   return html.slice(-11) === '<p><br></p>' ? pbrEnd(html.slice(0,-11)) : html;
  // },

  // pbrFront(html) {
  //   return html.slice(0,11) === '<p><br></p>' ? pbrFront(html.slice(11)) : html;
  // },

  // shortenBR(html) {
  //   return (html.indexOf('<br><br>') !== -1) ? shortenBR(html.replace('<br><br>', '<br>')) : html
  // },

  // trimHTML(html) {
  //   if(html.indexOf('<br><br>') !== -1) {
  //     console.log('eliminating brs', html)
  //     trimHTML(html.replace('<br><br>', '<br>'))
  //   } else if(html.slice(-4) === '<br>') {
  //     console.log('ending br ', html)
  //     trimHTML(html.slice(0,-4));
  //   } else if(html.slice(0,4) === '<br>') {
  //     console.log('starting br ', html)
  //     trimHTML(html.slice(4));
  //   } else if(html.slice(-11) === '<p><br></p>') {
  //     console.log('ending pbr ', html)
  //     trimHTML(html.slice(0,-11));
  //   } else if(html.slice(0,11) === '<p><br></p>') {
  //     trimHTML(html.slice(11));
  //   }
  //   return result = html;
  // },

// This needs to be targetted to JUST the PRE tags
  // addBRToCode(html) {
  //   let result = html.split('  ').join('<br>');
  //   result = result.split(';').join(';<br>')
  //   return result;
  // },

  killNullInVotes(data) {
    data.map((d, i) => {
      if(d.vote === null) {
        d.vote = 0;
      }
      if(d.votesum === null) {
        d.votesum = 0;
      }
    })
    let result = data.sort((a, b) => {
      return b.votesum - a.votesum
    })
    return result;
  },

  killArray(sessionuser) {
    if(Array.isArray(sessionuser)) {
      return sessionuser[0];
    } else {
      return sessionuser;
    }
  }
}




























