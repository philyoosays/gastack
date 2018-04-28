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
  }
}
