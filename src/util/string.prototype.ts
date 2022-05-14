declare global {
  interface String {
    removeDash(): string;
    removeHtmlTagAll(): string;
    removeDot(): string;
    removeComma(): string;
    removeColon(): string;
    removeSpace(): string;
  }
}

String.prototype.removeHtmlTagAll = function () {
  return this.replace(/(<([^>]+)>)/gi, '');
};

String.prototype.removeDash = function () {
  return this.replace(/-/g, '');
};

String.prototype.removeDot = function () {
  return this.replace(/\./g, '');
};

String.prototype.removeComma = function () {
  return this.replace(/,/g, '');
};

String.prototype.removeColon = function () {
  return this.replace(/:/g, '');
};

String.prototype.removeSpace = function () {
  return this.replace(/ /g, '');
};

export {};
