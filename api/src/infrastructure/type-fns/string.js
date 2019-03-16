const capitalize = str => str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);

const camelCase = (str) => {
  const string = str
    .replace(/[-_]/g, ' ')
    .replace(/[^A-Za-z0-9]/g, ' ')
    .split(' ')
    .reduce((result, word) => result + capitalize(word.toLowerCase()));

  return string.charAt(0).toLowerCase() + string.slice(1);
};

module.exports = {
  capitalize,
  camelCase,
};
