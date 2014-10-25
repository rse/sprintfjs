
sprintf.js
==========

**POSIX sprintf(3)-style String Formatting for JavaScript**

<p/>
<img src="https://nodei.co/npm/sprintfjs.png?downloads=true&stars=true" alt=""/>

<p/>
<img src="https://david-dm.org/rse/sprintfjs.png" alt=""/>

Abstract
--------

This is a JavaScript implementation of POSIX sprintf(3)-style string formatting
for use in [Node.js](http://nodejs.org/) based server and browser based client
environments.

Getting sprintf.js
------------------

You can conveniently get sprintf.js in various ways:

- Git: directly clone the official repository

  `$ git clone https://github.com/rse/sprintfjs.git`

- Bower: install as client component via the Bower component manager:

  `$ bower install sprintfjs`

- cURL: downloading only the main file from the repository

  `$ curl -O https://raw.github.com/rse/sprintfjs/master/sprintf.js`

API
---

The API is similar to POSIX [sprintf(3)](http://www.unix.com/man-page/posix/3/fprintf/).
It is exposed via AMD and CommonJS under the module name `sprintf`
and on the global `window` object in browser environments. The single
exposed API method is (in TypeScript definition notation):

    sprintf(fmt: String, ...arg: any[]): String;

It supports all standard POSIX [sprintf(3)](http://www.unix.com/man-page/posix/3/fprintf/)
features like `sprintf("%.2f", 12.3456)` &rarr; `12.35` and `sprintf("(%-6s)", "foo")` &rarr; `(foo   )` plus
(in addition to the usual positional arguments) two special argument referencing features:

- Indexed Arguments:<br/>
  `sprintf("%2$s baz %3$s baz %1$s", "foo", "bar", "quux")` &rarr; `bar baz quux baz foo`

- Named Arguments:<br/>
  `sprintf("%(bar)s baz %(quux)s baz %(foo)s", { foo: "foo", bar: "bar", quux: "quux" })` &rarr; `bar baz quux baz foo`

See Also
--------

[sprintf(3)](http://www.unix.com/man-page/posix/3/fprintf/)

License
-------

Copyright (c) 2006-2014 Ralf S. Engelschall (http://engelschall.com/)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

