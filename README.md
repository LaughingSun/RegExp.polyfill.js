# RegExp.polyfill.js

A RegExp polyfill hack to add support for Firedox's version of RegExp methods and properties.

Specifically it adds support for:
+ RegExp.prototype.flags
+ RegExp.prototype.sticky
+ RegExp.prototype.exec
+ RegExp.prototype.test

It does NOT add support for the sticky flag in the String Object or native strings, so you will have to do any sticky stuff on the regex side.


