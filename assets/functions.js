/* eslint-disable no-useless-escape */

function closeMenu() {
  this.$store.commit("page", ["menu", false]);
}

function getWordAfterLastSlash(input) {
  return input.substr(input.lastIndexOf("/") + 1);
}

function getWordBetweenSlashes(input) {
  return input
    .replace(/^\/([^\/]*).*$/, "$1")
    .replace(/-/g, " ")
    .toLowerCase();
}

function toTitleCase(input, type) {
  return input
    .replace(`/${type}`, "")
    .replace(/^\/([^\/]*).*$/, "$1")
    .replace(/-/g, " ")
    .toLowerCase()
    .split(" ")
    .map(function(word) {
      return word.replace(word[0], word[0].toUpperCase());
    })
    .join(" ");
}

function urlize(input) {
  return input.replace(/\s/g, "-").toLowerCase();
}

export {
  closeMenu,
  getWordAfterLastSlash,
  getWordBetweenSlashes,
  toTitleCase,
  urlize
};
