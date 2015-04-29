# RegExp.polyfill.js

A RegExp polyfill hack to add support for Firedox's version of RegExp methods and properties.

Specifically it adds support for:
+ RegExp.prototype.flags
+ RegExp.prototype.sticky
+ RegExp.prototype.exec
+ RegExp.prototype.test

It does NOT add support for the sticky flag in the String Object or native strings, so you will have to do any sticky stuff on the regex side.

It also adds the native RegExp class to RegExp.original, so you can use that property to check if it is using the polyfill or to use the native RegExp.

See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp for details on RegExp methods and properties.
