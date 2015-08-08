'use strict';
var jsonPatch = require('fast-json-patch');
function isEmpty(obj) {
  if (!(obj)) {
    return true;
  }

  //is it an empty array?
  if (Array.isArray(obj)) {
    if (obj.length > 0) {
      return false;
    }
    else {
      return true;
    }
  }

  //is it an empty object?
  if (typeof obj === 'object') {
    if (Object.keys(obj).length === 0) {
      return true;
    }
  }

  return false;
}

var FastJsonPatch = {
  hasDiff: function(obj1, obj2) {
    var cont = false;
    var diffView = {};

    if (isEmpty(obj1) && (!isEmpty(obj2))) {
      cont = true;
    }

    if (!cont) {
      if (!(isEmpty(obj1)) && !isEmpty(obj2)) {
        if ((typeof obj1 === 'object') && (typeof obj2 === 'object')) {
          diffView = jsonPatch.compare(obj1, obj2);
        }
        if ((typeof obj1 === 'string') && (typeof obj2 === 'string')) {
          if (obj1 !== obj2) {
            diffView = {'diff':true};
          }
        }
      }
    }

    if (!(isEmpty(diffView)) || cont) {
      return true;
    }

    return false;
  }
};

module.exports = FastJsonPatch;