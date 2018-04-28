module.exports = {
  prepSearch(search) {
    let result = search.split('/').join("");
    result = result.split("'").join("''");
    result = result.split(' ').join(' | ');
    return result;
  }
}
