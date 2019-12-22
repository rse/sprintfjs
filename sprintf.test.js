/*
**  sprintf.js -- POSIX sprintf(3)-style String Formatting for JavaScript
**  Copyright (c) 2006-2019 Dr. Ralf S. Engelschall <rse@engelschall.com>
**
**  Permission is hereby granted, free of charge, to any person obtaining
**  a copy of this software and associated documentation files (the
**  "Software"), to deal in the Software without restriction, including
**  without limitation the rights to use, copy, modify, merge, publish,
**  distribute, sublicense, and/or sell copies of the Software, and to
**  permit persons to whom the Software is furnished to do so, subject to
**  the following conditions:
**
**  The above copyright notice and this permission notice shall be included
**  in all copies or substantial portions of the Software.
**
**  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
**  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
**  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
**  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
**  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
**  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
**  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/* eslint no-redeclare: off */
/* global require: true */
/* global global: true */
/* global describe: true */
/* global it: true */
/* global expect: true */

global.chai = require("chai");
global.chai.config.includeStack = true;
global.expect = global.chai.expect;

var sprintf = require("./sprintf.js");

describe("sprintf should be POSIX sprintf(3) compatible", function () {
    /*  our test cases  */
    var tests = [
        /*  basic tests for %d  */
        [ "%d",    42,   "42"   ],
        [ "%2d",   42,   "42"   ],
        [ "%02d",  42,   "42"   ],
        [ "%3d",   42,   " 42"  ],
        [ "%03d",  42,   "042"  ],
        [ "%-3d",  42,   "42 "  ],
        [ "%-03d", 42,   "42 "  ],
        [ "%d",    "xx", "0"    ], /* error case */

        /*  basic tests for %x  */
        [ "%x",    10,   "a"    ],
        [ "%2x",   10,   " a"   ],
        [ "%02x",  10,   "0a"   ],
        [ "%#02x", 10,   "0xa"  ],
        [ "%#04x", 10,   "0x0a" ],

        /*  basic tests for %f  */
        [ "%f",    4.2,  "4.2"  ],
        [ "%.1f",  4.2,  "4.2"  ],
        [ "%.2f",  4.2,  "4.20" ],
        [ "%8.4f", 4.12, "  4.1200" ],
        [ "%8.4f", 4.123456789, "  4.1235" ],

        /*  basic tests for %s  */
        [ "%2s",  "test", "test"   ],
        [ "%6s",  "test", "  test" ],
        [ "%-6s", "test", "test  " ],
        [ "%s",   42,     "42"     ], /* error case */

        /*  complex tests for various features  */
        [ "%s-%d-%.2f", [ "foo", 42, 7.1 ], "foo-42-7.10" ],
        [ "%2$s baz %3$s baz %1$s", [ "foo", "bar", "quux" ], "bar baz quux baz foo" ],
        [ "%(bar)s baz %(quux)s baz %(foo)s", { foo: "foo", bar: "bar", quux: "quux" }, "bar baz quux baz foo" ],

        /*  special cases of embedded newlines  */
        [ "%s\n%d", [ "foo", 42 ], "foo\n42" ]
    ];

    /*  the corresponding generic test driver  */
    for (var i = 0; i < tests.length; i++) {
        (function (test) {
            var args = [ test[0] ];
            if (test[1] instanceof Array)
                args = args.concat(test[1]);
            else
                args.push(test[1]);
            var desc = "";
            for (var j = 0; j < args.length; j++) {
                if (desc !== "")
                    desc += ", ";
                if (typeof args[j] === "number")
                    desc += args[j];
                else if (typeof args[j] === "string")
                    desc += "\"" + args[j] + "\"";
            }
            desc = "sprintf(" + desc.replace(/\n/g, "\\n") + ") -> \"" + test[2].replace(/\n/g, "\\n") + "\"";
            it(desc, function () {
                expect(sprintf.apply(undefined, args)).to.be.equal(test[2]);
            });
        })(tests[i]);
    }
});

