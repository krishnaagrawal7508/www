// modules are defined as an array
// [ module function, map of requireuires ]
//
// map of requireuires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the requireuire for previous bundles

(function outer (modules, cache, entry) {
    // Save the require from previous bundle to this closure if any
    var previousRequire = typeof require == "function" && require;

    function findProxyquireifyName() {
        var deps = Object.keys(modules)
            .map(function (k) { return modules[k][1]; });

        for (var i = 0; i < deps.length; i++) {
            var pq = deps[i]['proxyquireify'];
            if (pq) return pq;
        }
    }

    var proxyquireifyName = findProxyquireifyName();

    function newRequire(name, jumped){
        // Find the proxyquireify module, if present
        var pqify = (proxyquireifyName != null) && cache[proxyquireifyName];

        // Proxyquireify provides a separate cache that is used when inside
        // a proxyquire call, and is set to null outside a proxyquire call.
        // This allows the regular caching semantics to work correctly both
        // inside and outside proxyquire calls while keeping the cached
        // modules isolated.
        // When switching from one proxyquire call to another, it clears
        // the cache to prevent contamination between different sets
        // of stubs.
        var currentCache = (pqify && pqify.exports._cache) || cache;

        if(!currentCache[name]) {
            if(!modules[name]) {
                // if we cannot find the the module within our internal map or
                // cache jump to the current global require ie. the last bundle
                // that was added to the page.
                var currentRequire = typeof require == "function" && require;
                if (!jumped && currentRequire) return currentRequire(name, true);

                // If there are other bundles on this page the require from the
                // previous one is saved to 'previousRequire'. Repeat this as
                // many times as there are bundles until the module is found or
                // we exhaust the require chain.
                if (previousRequire) return previousRequire(name, true);
                var err = new Error('Cannot find module \'' + name + '\'');
                err.code = 'MODULE_NOT_FOUND';
                throw err;
            }
            var m = currentCache[name] = {exports:{}};

            // The normal browserify require function
            var req = function(x){
                var id = modules[name][1][x];
                return newRequire(id ? id : x);
            };

            // The require function substituted for proxyquireify
            var moduleRequire = function(x){
                var pqify = (proxyquireifyName != null) && cache[proxyquireifyName];
                // Only try to use the proxyquireify version if it has been `require`d
                if (pqify && pqify.exports._proxy) {
                    return pqify.exports._proxy(req, x);
                } else {
                    return req(x);
                }
            };

            modules[name][0].call(m.exports,moduleRequire,m,m.exports,outer,modules,currentCache,entry);
        }
        return currentCache[name].exports;
    }
    for(var i=0;i<entry.length;i++) newRequire(entry[i]);

    // Override the current require with this new one
    return newRequire;
})
({1:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

var ctor = ( typeof Float32Array === 'function' ) ? Float32Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

},{}],2:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Typed array constructor which returns a typed array representing an array of single-precision floating-point numbers in the platform byte order.
*
* @module @stdlib/array/float32
*
* @example
* var ctor = require( '@stdlib/array/float32' );
*
* var arr = new ctor( 10 );
* // returns <Float32Array>
*/

// MODULES //

var hasFloat32ArraySupport = require( '@stdlib/assert/has-float32array-support' );
var builtin = require( './float32array.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var ctor;
if ( hasFloat32ArraySupport() ) {
	ctor = builtin;
} else {
	ctor = polyfill;
}


// EXPORTS //

module.exports = ctor;

},{"./float32array.js":1,"./polyfill.js":3,"@stdlib/assert/has-float32array-support":32}],3:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// TODO: write polyfill

// MAIN //

/**
* Typed array which represents an array of single-precision floating-point numbers in the platform byte order.
*
* @throws {Error} not implemented
*/
function polyfill() {
	throw new Error( 'not implemented' );
}


// EXPORTS //

module.exports = polyfill;

},{}],4:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

var ctor = ( typeof Float64Array === 'function' ) ? Float64Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

},{}],5:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Typed array constructor which returns a typed array representing an array of double-precision floating-point numbers in the platform byte order.
*
* @module @stdlib/array/float64
*
* @example
* var ctor = require( '@stdlib/array/float64' );
*
* var arr = new ctor( 10 );
* // returns <Float64Array>
*/

// MODULES //

var hasFloat64ArraySupport = require( '@stdlib/assert/has-float64array-support' );
var builtin = require( './float64array.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var ctor;
if ( hasFloat64ArraySupport() ) {
	ctor = builtin;
} else {
	ctor = polyfill;
}


// EXPORTS //

module.exports = ctor;

},{"./float64array.js":4,"./polyfill.js":6,"@stdlib/assert/has-float64array-support":35}],6:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// TODO: write polyfill

// MAIN //

/**
* Typed array which represents an array of double-precision floating-point numbers in the platform byte order.
*
* @throws {Error} not implemented
*/
function polyfill() {
	throw new Error( 'not implemented' );
}


// EXPORTS //

module.exports = polyfill;

},{}],7:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Typed array constructor which returns a typed array representing an array of twos-complement 16-bit signed integers in the platform byte order.
*
* @module @stdlib/array/int16
*
* @example
* var ctor = require( '@stdlib/array/int16' );
*
* var arr = new ctor( 10 );
* // returns <Int16Array>
*/

// MODULES //

var hasInt16ArraySupport = require( '@stdlib/assert/has-int16array-support' );
var builtin = require( './int16array.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var ctor;
if ( hasInt16ArraySupport() ) {
	ctor = builtin;
} else {
	ctor = polyfill;
}


// EXPORTS //

module.exports = ctor;

},{"./int16array.js":8,"./polyfill.js":9,"@stdlib/assert/has-int16array-support":37}],8:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

var ctor = ( typeof Int16Array === 'function' ) ? Int16Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

},{}],9:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// TODO: write polyfill

// MAIN //

/**
* Typed array which represents an array of twos-complement 16-bit signed integers in the platform byte order.
*
* @throws {Error} not implemented
*/
function polyfill() {
	throw new Error( 'not implemented' );
}


// EXPORTS //

module.exports = polyfill;

},{}],10:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Typed array constructor which returns a typed array representing an array of twos-complement 32-bit signed integers in the platform byte order.
*
* @module @stdlib/array/int32
*
* @example
* var ctor = require( '@stdlib/array/int32' );
*
* var arr = new ctor( 10 );
* // returns <Int32Array>
*/

// MODULES //

var hasInt32ArraySupport = require( '@stdlib/assert/has-int32array-support' );
var builtin = require( './int32array.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var ctor;
if ( hasInt32ArraySupport() ) {
	ctor = builtin;
} else {
	ctor = polyfill;
}


// EXPORTS //

module.exports = ctor;

},{"./int32array.js":11,"./polyfill.js":12,"@stdlib/assert/has-int32array-support":40}],11:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

var ctor = ( typeof Int32Array === 'function' ) ? Int32Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

},{}],12:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// TODO: write polyfill

// MAIN //

/**
* Typed array which represents an array of twos-complement 32-bit signed integers in the platform byte order.
*
* @throws {Error} not implemented
*/
function polyfill() {
	throw new Error( 'not implemented' );
}


// EXPORTS //

module.exports = polyfill;

},{}],13:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Typed array constructor which returns a typed array representing an array of twos-complement 8-bit signed integers in the platform byte order.
*
* @module @stdlib/array/int8
*
* @example
* var ctor = require( '@stdlib/array/int8' );
*
* var arr = new ctor( 10 );
* // returns <Int8Array>
*/

// MODULES //

var hasInt8ArraySupport = require( '@stdlib/assert/has-int8array-support' );
var builtin = require( './int8array.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var ctor;
if ( hasInt8ArraySupport() ) {
	ctor = builtin;
} else {
	ctor = polyfill;
}


// EXPORTS //

module.exports = ctor;

},{"./int8array.js":14,"./polyfill.js":15,"@stdlib/assert/has-int8array-support":43}],14:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

var ctor = ( typeof Int8Array === 'function' ) ? Int8Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

},{}],15:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// TODO: write polyfill

// MAIN //

/**
* Typed array which represents an array of twos-complement 8-bit signed integers in the platform byte order.
*
* @throws {Error} not implemented
*/
function polyfill() {
	throw new Error( 'not implemented' );
}


// EXPORTS //

module.exports = polyfill;

},{}],16:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Typed array constructor which returns a typed array representing an array of 16-bit unsigned integers in the platform byte order.
*
* @module @stdlib/array/uint16
*
* @example
* var ctor = require( '@stdlib/array/uint16' );
*
* var arr = new ctor( 10 );
* // returns <Uint16Array>
*/

// MODULES //

var hasUint16ArraySupport = require( '@stdlib/assert/has-uint16array-support' );
var builtin = require( './uint16array.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var ctor;
if ( hasUint16ArraySupport() ) {
	ctor = builtin;
} else {
	ctor = polyfill;
}


// EXPORTS //

module.exports = ctor;

},{"./polyfill.js":17,"./uint16array.js":18,"@stdlib/assert/has-uint16array-support":57}],17:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// TODO: write polyfill

// MAIN //

/**
* Typed array which represents an array of 16-bit unsigned integers in the platform byte order.
*
* @throws {Error} not implemented
*/
function polyfill() {
	throw new Error( 'not implemented' );
}


// EXPORTS //

module.exports = polyfill;

},{}],18:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

var ctor = ( typeof Uint16Array === 'function' ) ? Uint16Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

},{}],19:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Typed array constructor which returns a typed array representing an array of 32-bit unsigned integers in the platform byte order.
*
* @module @stdlib/array/uint32
*
* @example
* var ctor = require( '@stdlib/array/uint32' );
*
* var arr = new ctor( 10 );
* // returns <Uint32Array>
*/

// MODULES //

var hasUint32ArraySupport = require( '@stdlib/assert/has-uint32array-support' );
var builtin = require( './uint32array.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var ctor;
if ( hasUint32ArraySupport() ) {
	ctor = builtin;
} else {
	ctor = polyfill;
}


// EXPORTS //

module.exports = ctor;

},{"./polyfill.js":20,"./uint32array.js":21,"@stdlib/assert/has-uint32array-support":60}],20:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// TODO: write polyfill

// MAIN //

/**
* Typed array which represents an array of 32-bit unsigned integers in the platform byte order.
*
* @throws {Error} not implemented
*/
function polyfill() {
	throw new Error( 'not implemented' );
}


// EXPORTS //

module.exports = polyfill;

},{}],21:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

var ctor = ( typeof Uint32Array === 'function' ) ? Uint32Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

},{}],22:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Typed array constructor which returns a typed array representing an array of 8-bit unsigned integers in the platform byte order.
*
* @module @stdlib/array/uint8
*
* @example
* var ctor = require( '@stdlib/array/uint8' );
*
* var arr = new ctor( 10 );
* // returns <Uint8Array>
*/

// MODULES //

var hasUint8ArraySupport = require( '@stdlib/assert/has-uint8array-support' );
var builtin = require( './uint8array.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var ctor;
if ( hasUint8ArraySupport() ) {
	ctor = builtin;
} else {
	ctor = polyfill;
}


// EXPORTS //

module.exports = ctor;

},{"./polyfill.js":23,"./uint8array.js":24,"@stdlib/assert/has-uint8array-support":63}],23:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// TODO: write polyfill

// MAIN //

/**
* Typed array which represents an array of 8-bit unsigned integers in the platform byte order.
*
* @throws {Error} not implemented
*/
function polyfill() {
	throw new Error( 'not implemented' );
}


// EXPORTS //

module.exports = polyfill;

},{}],24:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

var ctor = ( typeof Uint8Array === 'function' ) ? Uint8Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

},{}],25:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Typed array constructor which returns a typed array representing an array of 8-bit unsigned integers in the platform byte order clamped to 0-255.
*
* @module @stdlib/array/uint8c
*
* @example
* var ctor = require( '@stdlib/array/uint8c' );
*
* var arr = new ctor( 10 );
* // returns <Uint8ClampedArray>
*/

// MODULES //

var hasUint8ClampedArraySupport = require( '@stdlib/assert/has-uint8clampedarray-support' ); // eslint-disable-line id-length
var builtin = require( './uint8clampedarray.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var ctor;
if ( hasUint8ClampedArraySupport() ) {
	ctor = builtin;
} else {
	ctor = polyfill;
}


// EXPORTS //

module.exports = ctor;

},{"./polyfill.js":26,"./uint8clampedarray.js":27,"@stdlib/assert/has-uint8clampedarray-support":66}],26:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// TODO: write polyfill

// MAIN //

/**
* Typed array which represents an array of 8-bit unsigned integers in the platform byte order clamped to 0-255.
*
* @throws {Error} not implemented
*/
function polyfill() {
	throw new Error( 'not implemented' );
}


// EXPORTS //

module.exports = polyfill;

},{}],27:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

var ctor = ( typeof Uint8ClampedArray === 'function' ) ? Uint8ClampedArray : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

},{}],28:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

var main = ( typeof Object.defineProperty === 'function' ) ? Object.defineProperty : null;


// EXPORTS //

module.exports = main;

},{}],29:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test for `Object.defineProperty` support.
*
* @module @stdlib/assert/has-define-property-support
*
* @example
* var hasDefinePropertySupport = require( '@stdlib/assert/has-define-property-support' );
*
* var bool = hasDefinePropertySupport();
* // returns <boolean>
*/

// MODULES //

var hasDefinePropertySupport = require( './main.js' );


// EXPORTS //

module.exports = hasDefinePropertySupport;

},{"./main.js":30}],30:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var defineProperty = require( './define_property.js' );


// MAIN //

/**
* Tests for `Object.defineProperty` support.
*
* @returns {boolean} boolean indicating if an environment has `Object.defineProperty` support
*
* @example
* var bool = hasDefinePropertySupport();
* // returns <boolean>
*/
function hasDefinePropertySupport() {
	var bool;

	if ( typeof defineProperty !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		defineProperty( {}, 'x', {} );
		bool = true;
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasDefinePropertySupport;

},{"./define_property.js":28}],31:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

var main = ( typeof Float32Array === 'function' ) ? Float32Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = main;

},{}],32:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test for native `Float32Array` support.
*
* @module @stdlib/assert/has-float32array-support
*
* @example
* var hasFloat32ArraySupport = require( '@stdlib/assert/has-float32array-support' );
*
* var bool = hasFloat32ArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasFloat32ArraySupport = require( './main.js' );


// EXPORTS //

module.exports = hasFloat32ArraySupport;

},{"./main.js":33}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isFloat32Array = require( '@stdlib/assert/is-float32array' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var GlobalFloat32Array = require( './float32array.js' );


// MAIN //

/**
* Tests for native `Float32Array` support.
*
* @returns {boolean} boolean indicating if an environment has `Float32Array` support
*
* @example
* var bool = hasFloat32ArraySupport();
* // returns <boolean>
*/
function hasFloat32ArraySupport() {
	var bool;
	var arr;

	if ( typeof GlobalFloat32Array !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		arr = new GlobalFloat32Array( [ 1.0, 3.14, -3.14, 5.0e40 ] );
		bool = (
			isFloat32Array( arr ) &&
			arr[ 0 ] === 1.0 &&
			arr[ 1 ] === 3.140000104904175 &&
			arr[ 2 ] === -3.140000104904175 &&
			arr[ 3 ] === PINF
		);
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasFloat32ArraySupport;

},{"./float32array.js":31,"@stdlib/assert/is-float32array":94,"@stdlib/constants/math/float64-pinf":230}],34:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

var main = ( typeof Float64Array === 'function' ) ? Float64Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = main;

},{}],35:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test for native `Float64Array` support.
*
* @module @stdlib/assert/has-float64array-support
*
* @example
* var hasFloat64ArraySupport = require( '@stdlib/assert/has-float64array-support' );
*
* var bool = hasFloat64ArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasFloat64ArraySupport = require( './main.js' );


// EXPORTS //

module.exports = hasFloat64ArraySupport;

},{"./main.js":36}],36:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isFloat64Array = require( '@stdlib/assert/is-float64array' );
var GlobalFloat64Array = require( './float64array.js' );


// MAIN //

/**
* Tests for native `Float64Array` support.
*
* @returns {boolean} boolean indicating if an environment has `Float64Array` support
*
* @example
* var bool = hasFloat64ArraySupport();
* // returns <boolean>
*/
function hasFloat64ArraySupport() {
	var bool;
	var arr;

	if ( typeof GlobalFloat64Array !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		arr = new GlobalFloat64Array( [ 1.0, 3.14, -3.14, NaN ] );
		bool = (
			isFloat64Array( arr ) &&
			arr[ 0 ] === 1.0 &&
			arr[ 1 ] === 3.14 &&
			arr[ 2 ] === -3.14 &&
			arr[ 3 ] !== arr[ 3 ]
		);
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasFloat64ArraySupport;

},{"./float64array.js":34,"@stdlib/assert/is-float64array":96}],37:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test for native `Int16Array` support.
*
* @module @stdlib/assert/has-int16array-support
*
* @example
* var hasInt16ArraySupport = require( '@stdlib/assert/has-int16array-support' );
*
* var bool = hasInt16ArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasInt16ArraySupport = require( './main.js' );


// EXPORTS //

module.exports = hasInt16ArraySupport;

},{"./main.js":39}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

var main = ( typeof Int16Array === 'function' ) ? Int16Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = main;

},{}],39:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isInt16Array = require( '@stdlib/assert/is-int16array' );
var INT16_MAX = require( '@stdlib/constants/math/int16-max' );
var INT16_MIN = require( '@stdlib/constants/math/int16-min' );
var GlobalInt16Array = require( './int16array.js' );


// MAIN //

/**
* Tests for native `Int16Array` support.
*
* @returns {boolean} boolean indicating if an environment has `Int16Array` support
*
* @example
* var bool = hasInt16ArraySupport();
* // returns <boolean>
*/
function hasInt16ArraySupport() {
	var bool;
	var arr;

	if ( typeof GlobalInt16Array !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		arr = new GlobalInt16Array( [ 1, 3.14, -3.14, INT16_MAX+1 ] );
		bool = (
			isInt16Array( arr ) &&
			arr[ 0 ] === 1 &&
			arr[ 1 ] === 3 &&      // truncation
			arr[ 2 ] === -3 &&     // truncation
			arr[ 3 ] === INT16_MIN // wrap around
		);
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasInt16ArraySupport;

},{"./int16array.js":38,"@stdlib/assert/is-int16array":100,"@stdlib/constants/math/int16-max":231,"@stdlib/constants/math/int16-min":232}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test for native `Int32Array` support.
*
* @module @stdlib/assert/has-int32array-support
*
* @example
* var hasInt32ArraySupport = require( '@stdlib/assert/has-int32array-support' );
*
* var bool = hasInt32ArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasInt32ArraySupport = require( './main.js' );


// EXPORTS //

module.exports = hasInt32ArraySupport;

},{"./main.js":42}],41:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

var main = ( typeof Int32Array === 'function' ) ? Int32Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = main;

},{}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isInt32Array = require( '@stdlib/assert/is-int32array' );
var INT32_MAX = require( '@stdlib/constants/math/int32-max' );
var INT32_MIN = require( '@stdlib/constants/math/int32-min' );
var GlobalInt32Array = require( './int32array.js' );


// MAIN //

/**
* Tests for native `Int32Array` support.
*
* @returns {boolean} boolean indicating if an environment has `Int32Array` support
*
* @example
* var bool = hasInt32ArraySupport();
* // returns <boolean>
*/
function hasInt32ArraySupport() {
	var bool;
	var arr;

	if ( typeof GlobalInt32Array !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		arr = new GlobalInt32Array( [ 1, 3.14, -3.14, INT32_MAX+1 ] );
		bool = (
			isInt32Array( arr ) &&
			arr[ 0 ] === 1 &&
			arr[ 1 ] === 3 &&      // truncation
			arr[ 2 ] === -3 &&     // truncation
			arr[ 3 ] === INT32_MIN // wrap around
		);
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasInt32ArraySupport;

},{"./int32array.js":41,"@stdlib/assert/is-int32array":102,"@stdlib/constants/math/int32-max":233,"@stdlib/constants/math/int32-min":234}],43:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test for native `Int8Array` support.
*
* @module @stdlib/assert/has-int8array-support
*
* @example
* var hasInt8ArraySupport = require( '@stdlib/assert/has-int8array-support' );
*
* var bool = hasInt8ArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasInt8ArraySupport = require( './main.js' );


// EXPORTS //

module.exports = hasInt8ArraySupport;

},{"./main.js":45}],44:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

var main = ( typeof Int8Array === 'function' ) ? Int8Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = main;

},{}],45:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isInt8Array = require( '@stdlib/assert/is-int8array' );
var INT8_MAX = require( '@stdlib/constants/math/int8-max' );
var INT8_MIN = require( '@stdlib/constants/math/int8-min' );
var GlobalInt8Array = require( './int8array.js' );


// MAIN //

/**
* Tests for native `Int8Array` support.
*
* @returns {boolean} boolean indicating if an environment has `Int8Array` support
*
* @example
* var bool = hasInt8ArraySupport();
* // returns <boolean>
*/
function hasInt8ArraySupport() {
	var bool;
	var arr;

	if ( typeof GlobalInt8Array !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		arr = new GlobalInt8Array( [ 1, 3.14, -3.14, INT8_MAX+1 ] );
		bool = (
			isInt8Array( arr ) &&
			arr[ 0 ] === 1 &&
			arr[ 1 ] === 3 &&     // truncation
			arr[ 2 ] === -3 &&    // truncation
			arr[ 3 ] === INT8_MIN // wrap around
		);
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasInt8ArraySupport;

},{"./int8array.js":44,"@stdlib/assert/is-int8array":104,"@stdlib/constants/math/int8-max":235,"@stdlib/constants/math/int8-min":236}],46:[function(require,module,exports){
(function (Buffer){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

var main = ( typeof Buffer === 'function' ) ? Buffer : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = main;

}).call(this,require("buffer").Buffer)
},{"buffer":372}],47:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test for native `Buffer` support.
*
* @module @stdlib/assert/has-node-buffer-support
*
* @example
* var hasNodeBufferSupport = require( '@stdlib/assert/has-node-buffer-support' );
*
* var bool = hasNodeBufferSupport();
* // returns <boolean>
*/

// MODULES //

var hasNodeBufferSupport = require( './main.js' );


// EXPORTS //

module.exports = hasNodeBufferSupport;

},{"./main.js":48}],48:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isBuffer = require( '@stdlib/assert/is-buffer' );
var GlobalBuffer = require( './buffer.js' );


// MAIN //

/**
* Tests for native `Buffer` support.
*
* @returns {boolean} boolean indicating if an environment has `Buffer` support
*
* @example
* var bool = hasNodeBufferSupport();
* // returns <boolean>
*/
function hasNodeBufferSupport() {
	var bool;
	var b;

	if ( typeof GlobalBuffer !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		if ( typeof GlobalBuffer.from === 'function' ) {
			b = GlobalBuffer.from( [ 1, 2, 3, 4 ] );
		} else {
			b = new GlobalBuffer( [ 1, 2, 3, 4 ] ); // Note: this is deprecated behavior starting in Node v6 (see https://nodejs.org/api/buffer.html#buffer_new_buffer_array)
		}
		bool = (
			isBuffer( b ) &&
			b[ 0 ] === 1 &&
			b[ 1 ] === 2 &&
			b[ 2 ] === 3 &&
			b[ 3 ] === 4
		);
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasNodeBufferSupport;

},{"./buffer.js":46,"@stdlib/assert/is-buffer":84}],49:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test whether an object has a specified property.
*
* @module @stdlib/assert/has-own-property
*
* @example
* var hasOwnProp = require( '@stdlib/assert/has-own-property' );
*
* var beep = {
*     'boop': true
* };
*
* var bool = hasOwnProp( beep, 'boop' );
* // returns true
*
* bool = hasOwnProp( beep, 'bop' );
* // returns false
*/

// MODULES //

var hasOwnProp = require( './main.js' );


// EXPORTS //

module.exports = hasOwnProp;

},{"./main.js":50}],50:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// FUNCTIONS //

var has = Object.prototype.hasOwnProperty;


// MAIN //

/**
* Tests if an object has a specified property.
*
* @param {*} value - value to test
* @param {*} property - property to test
* @returns {boolean} boolean indicating if an object has a specified property
*
* @example
* var beep = {
*     'boop': true
* };
*
* var bool = hasOwnProp( beep, 'boop' );
* // returns true
*
* @example
* var beep = {
*     'boop': true
* };
*
* var bool = hasOwnProp( beep, 'bap' );
* // returns false
*/
function hasOwnProp( value, property ) {
	if (
		value === void 0 ||
		value === null
	) {
		return false;
	}
	return has.call( value, property );
}


// EXPORTS //

module.exports = hasOwnProp;

},{}],51:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test whether an object has a specified property, either own or inherited.
*
* @module @stdlib/assert/has-property
*
* @example
* var hasProp = require( '@stdlib/assert/has-property' );
*
* var beep = {
*     'boop': true
* };
*
* var bool = hasProp( beep, 'boop' );
* // returns true
*
* bool = hasProp( beep, 'bop' );
* // returns false
*/

// MODULES //

var hasProp = require( './main.js' );


// EXPORTS //

module.exports = hasProp;

},{"./main.js":52}],52:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

/**
* Tests if an object has a specified property, either own or inherited.
*
* @param {*} value - value to test
* @param {*} property - property to test
* @returns {boolean} boolean indicating if an object has a specified property
*
* @example
* var beep = {
*     'boop': true
* };
*
* var bool = hasProp( beep, 'boop' );
* // returns true
*
* @example
* var beep = {
*     'boop': true
* };
*
* var bool = hasProp( beep, 'bap' );
* // returns false
*/
function hasProp( value, property ) {
	if ( value === void 0 || value === null ) {
		return false;
	}
	if ( typeof property === 'symbol' ) {
		return property in Object( value );
	}
	return ( String( property ) in Object( value ) );
}


// EXPORTS //

module.exports = hasProp;

},{}],53:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test for native `Symbol` support.
*
* @module @stdlib/assert/has-symbol-support
*
* @example
* var hasSymbolSupport = require( '@stdlib/assert/has-symbol-support' );
*
* var bool = hasSymbolSupport();
* // returns <boolean>
*/

// MODULES //

var hasSymbolSupport = require( './main.js' );


// EXPORTS //

module.exports = hasSymbolSupport;

},{"./main.js":54}],54:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

/**
* Tests for native `Symbol` support.
*
* @returns {boolean} boolean indicating if an environment has `Symbol` support
*
* @example
* var bool = hasSymbolSupport();
* // returns <boolean>
*/
function hasSymbolSupport() {
	return (
		typeof Symbol === 'function' &&
		typeof Symbol( 'foo' ) === 'symbol'
	);
}


// EXPORTS //

module.exports = hasSymbolSupport;

},{}],55:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test for native `toStringTag` support.
*
* @module @stdlib/assert/has-tostringtag-support
*
* @example
* var hasToStringTagSupport = require( '@stdlib/assert/has-tostringtag-support' );
*
* var bool = hasToStringTagSupport();
* // returns <boolean>
*/

// MODULES //

var hasToStringTagSupport = require( './main.js' );


// EXPORTS //

module.exports = hasToStringTagSupport;

},{"./main.js":56}],56:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var hasSymbols = require( '@stdlib/assert/has-symbol-support' );


// VARIABLES //

var FLG = hasSymbols();


// MAIN //

/**
* Tests for native `toStringTag` support.
*
* @returns {boolean} boolean indicating if an environment has `toStringTag` support
*
* @example
* var bool = hasToStringTagSupport();
* // returns <boolean>
*/
function hasToStringTagSupport() {
	return ( FLG && typeof Symbol.toStringTag === 'symbol' );
}


// EXPORTS //

module.exports = hasToStringTagSupport;

},{"@stdlib/assert/has-symbol-support":53}],57:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test for native `Uint16Array` support.
*
* @module @stdlib/assert/has-uint16array-support
*
* @example
* var hasUint16ArraySupport = require( '@stdlib/assert/has-uint16array-support' );
*
* var bool = hasUint16ArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasUint16ArraySupport = require( './main.js' );


// EXPORTS //

module.exports = hasUint16ArraySupport;

},{"./main.js":58}],58:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isUint16Array = require( '@stdlib/assert/is-uint16array' );
var UINT16_MAX = require( '@stdlib/constants/math/uint16-max' );
var GlobalUint16Array = require( './uint16array.js' );


// MAIN //

/**
* Tests for native `Uint16Array` support.
*
* @returns {boolean} boolean indicating if an environment has `Uint16Array` support
*
* @example
* var bool = hasUint16ArraySupport();
* // returns <boolean>
*/
function hasUint16ArraySupport() {
	var bool;
	var arr;

	if ( typeof GlobalUint16Array !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		arr = [ 1, 3.14, -3.14, UINT16_MAX+1, UINT16_MAX+2 ];
		arr = new GlobalUint16Array( arr );
		bool = (
			isUint16Array( arr ) &&
			arr[ 0 ] === 1 &&
			arr[ 1 ] === 3 &&            // truncation
			arr[ 2 ] === UINT16_MAX-2 && // truncation and wrap around
			arr[ 3 ] === 0 &&            // wrap around
			arr[ 4 ] === 1               // wrap around
		);
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasUint16ArraySupport;

},{"./uint16array.js":59,"@stdlib/assert/is-uint16array":160,"@stdlib/constants/math/uint16-max":237}],59:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

var main = ( typeof Uint16Array === 'function' ) ? Uint16Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = main;

},{}],60:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test for native `Uint32Array` support.
*
* @module @stdlib/assert/has-uint32array-support
*
* @example
* var hasUint32ArraySupport = require( '@stdlib/assert/has-uint32array-support' );
*
* var bool = hasUint32ArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasUint32ArraySupport = require( './main.js' );


// EXPORTS //

module.exports = hasUint32ArraySupport;

},{"./main.js":61}],61:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isUint32Array = require( '@stdlib/assert/is-uint32array' );
var UINT32_MAX = require( '@stdlib/constants/math/uint32-max' );
var GlobalUint32Array = require( './uint32array.js' );


// MAIN //

/**
* Tests for native `Uint32Array` support.
*
* @returns {boolean} boolean indicating if an environment has `Uint32Array` support
*
* @example
* var bool = hasUint32ArraySupport();
* // returns <boolean>
*/
function hasUint32ArraySupport() {
	var bool;
	var arr;

	if ( typeof GlobalUint32Array !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		arr = [ 1, 3.14, -3.14, UINT32_MAX+1, UINT32_MAX+2 ];
		arr = new GlobalUint32Array( arr );
		bool = (
			isUint32Array( arr ) &&
			arr[ 0 ] === 1 &&
			arr[ 1 ] === 3 &&            // truncation
			arr[ 2 ] === UINT32_MAX-2 && // truncation and wrap around
			arr[ 3 ] === 0 &&            // wrap around
			arr[ 4 ] === 1               // wrap around
		);
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasUint32ArraySupport;

},{"./uint32array.js":62,"@stdlib/assert/is-uint32array":162,"@stdlib/constants/math/uint32-max":238}],62:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

var main = ( typeof Uint32Array === 'function' ) ? Uint32Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = main;

},{}],63:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test for native `Uint8Array` support.
*
* @module @stdlib/assert/has-uint8array-support
*
* @example
* var hasUint8ArraySupport = require( '@stdlib/assert/has-uint8array-support' );
*
* var bool = hasUint8ArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasUint8ArraySupport = require( './main.js' );


// EXPORTS //

module.exports = hasUint8ArraySupport;

},{"./main.js":64}],64:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isUint8Array = require( '@stdlib/assert/is-uint8array' );
var UINT8_MAX = require( '@stdlib/constants/math/uint8-max' );
var GlobalUint8Array = require( './uint8array.js' );


// MAIN //

/**
* Tests for native `Uint8Array` support.
*
* @returns {boolean} boolean indicating if an environment has `Uint8Array` support
*
* @example
* var bool = hasUint8ArraySupport();
* // returns <boolean>
*/
function hasUint8ArraySupport() {
	var bool;
	var arr;

	if ( typeof GlobalUint8Array !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		arr = [ 1, 3.14, -3.14, UINT8_MAX+1, UINT8_MAX+2 ];
		arr = new GlobalUint8Array( arr );
		bool = (
			isUint8Array( arr ) &&
			arr[ 0 ] === 1 &&
			arr[ 1 ] === 3 &&           // truncation
			arr[ 2 ] === UINT8_MAX-2 && // truncation and wrap around
			arr[ 3 ] === 0 &&           // wrap around
			arr[ 4 ] === 1              // wrap around
		);
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasUint8ArraySupport;

},{"./uint8array.js":65,"@stdlib/assert/is-uint8array":164,"@stdlib/constants/math/uint8-max":239}],65:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

var main = ( typeof Uint8Array === 'function' ) ? Uint8Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = main;

},{}],66:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test for native `Uint8ClampedArray` support.
*
* @module @stdlib/assert/has-uint8clampedarray-support
*
* @example
* var hasUint8ClampedArraySupport = require( '@stdlib/assert/has-uint8clampedarray-support' );
*
* var bool = hasUint8ClampedArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasUint8ClampedArraySupport = require( './main.js' );


// EXPORTS //

module.exports = hasUint8ClampedArraySupport;

},{"./main.js":67}],67:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isUint8ClampedArray = require( '@stdlib/assert/is-uint8clampedarray' );
var GlobalUint8ClampedArray = require( './uint8clampedarray.js' );


// MAIN //

/**
* Tests for native `Uint8ClampedArray` support.
*
* @returns {boolean} boolean indicating if an environment has `Uint8ClampedArray` support
*
* @example
* var bool = hasUint8ClampedArraySupport();
* // returns <boolean>
*/
function hasUint8ClampedArraySupport() { // eslint-disable-line id-length
	var bool;
	var arr;

	if ( typeof GlobalUint8ClampedArray !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		arr = new GlobalUint8ClampedArray( [ -1, 0, 1, 3.14, 4.99, 255, 256 ] );
		bool = (
			isUint8ClampedArray( arr ) &&
			arr[ 0 ] === 0 &&   // clamped
			arr[ 1 ] === 0 &&
			arr[ 2 ] === 1 &&
			arr[ 3 ] === 3 &&   // round to nearest
			arr[ 4 ] === 5 &&   // round to nearest
			arr[ 5 ] === 255 &&
			arr[ 6 ] === 255    // clamped
		);
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasUint8ClampedArraySupport;

},{"./uint8clampedarray.js":68,"@stdlib/assert/is-uint8clampedarray":166}],68:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

var main = ( typeof Uint8ClampedArray === 'function' ) ? Uint8ClampedArray : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = main;

},{}],69:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isArguments = require( './main.js' );


// VARIABLES //

var bool;


// FUNCTIONS //

/**
* Detects whether an environment returns the expected internal class of the `arguments` object.
*
* @private
* @returns {boolean} boolean indicating whether an environment behaves as expected
*
* @example
* var bool = detect();
* // returns <boolean>
*/
function detect() {
	return isArguments( arguments );
}


// MAIN //

bool = detect();


// EXPORTS //

module.exports = bool;

},{"./main.js":71}],70:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is an `arguments` object.
*
* @module @stdlib/assert/is-arguments
*
* @example
* var isArguments = require( '@stdlib/assert/is-arguments' );
*
* function foo() {
*     return arguments;
* }
*
* var bool = isArguments( foo() );
* // returns true
*
* bool = isArguments( [] );
* // returns false
*/

// MODULES //

var hasArgumentsClass = require( './detect.js' );
var main = require( './main.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var isArguments;
if ( hasArgumentsClass ) {
	isArguments = main;
} else {
	isArguments = polyfill;
}


// EXPORTS //

module.exports = isArguments;

},{"./detect.js":69,"./main.js":71,"./polyfill.js":72}],71:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var nativeClass = require( '@stdlib/utils/native-class' );


// MAIN //

/**
* Tests whether a value is an `arguments` object.
*
* @private
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether a value is an `arguments` object
*
* @example
* function foo() {
*     return arguments;
* }
*
* var bool = isArguments( foo() );
* // returns true
*
* @example
* var bool = isArguments( [] );
* // returns false
*/
function isArguments( value ) {
	return ( nativeClass( value ) === '[object Arguments]' );
}


// EXPORTS //

module.exports = isArguments;

},{"@stdlib/utils/native-class":342}],72:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var isEnumerableProperty = require( '@stdlib/assert/is-enumerable-property' );
var isArray = require( '@stdlib/assert/is-array' );
var isInteger = require( '@stdlib/math/base/assert/is-integer' );
var MAX_LENGTH = require( '@stdlib/constants/math/uint32-max' );


// MAIN //

/**
* Tests whether a value is an `arguments` object.
*
* @private
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether a value is an `arguments` object
*
* @example
* function foo() {
*     return arguments;
* }
*
* var bool = isArguments( foo() );
* // returns true
*
* @example
* var bool = isArguments( [] );
* // returns false
*/
function isArguments( value ) {
	return (
		value !== null &&
		typeof value === 'object' &&
		!isArray( value ) &&
		typeof value.length === 'number' &&
		isInteger( value.length ) &&
		value.length >= 0 &&
		value.length <= MAX_LENGTH &&
		hasOwnProp( value, 'callee' ) &&
		!isEnumerableProperty( value, 'callee' )
	);
}


// EXPORTS //

module.exports = isArguments;

},{"@stdlib/assert/has-own-property":49,"@stdlib/assert/is-array":75,"@stdlib/assert/is-enumerable-property":89,"@stdlib/constants/math/uint32-max":238,"@stdlib/math/base/assert/is-integer":247}],73:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is array-like.
*
* @module @stdlib/assert/is-array-like
*
* @example
* var isArrayLike = require( '@stdlib/assert/is-array-like' );
*
* var bool = isArrayLike( [] );
* // returns true
*
* bool = isArrayLike( { 'length': 10 } );
* // returns true
*
* bool = isArrayLike( 'beep' );
* // returns true
*/

// MODULES //

var isArrayLike = require( './main.js' );


// EXPORTS //

module.exports = isArrayLike;

},{"./main.js":74}],74:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isInteger = require( '@stdlib/math/base/assert/is-integer' );
var MAX_LENGTH = require( '@stdlib/constants/array/max-array-length' );


// MAIN //

/**
* Tests if a value is array-like.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is array-like
*
* @example
* var bool = isArrayLike( [] );
* // returns true
*
* @example
* var bool = isArrayLike( {'length':10} );
* // returns true
*/
function isArrayLike( value ) {
	return (
		value !== void 0 &&
		value !== null &&
		typeof value !== 'function' &&
		typeof value.length === 'number' &&
		isInteger( value.length ) &&
		value.length >= 0 &&
		value.length <= MAX_LENGTH
	);
}


// EXPORTS //

module.exports = isArrayLike;

},{"@stdlib/constants/array/max-array-length":224,"@stdlib/math/base/assert/is-integer":247}],75:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is an array.
*
* @module @stdlib/assert/is-array
*
* @example
* var isArray = require( '@stdlib/assert/is-array' );
*
* var bool = isArray( [] );
* // returns true
*
* bool = isArray( {} );
* // returns false
*/

// MODULES //

var isArray = require( './main.js' );


// EXPORTS //

module.exports = isArray;

},{"./main.js":76}],76:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var nativeClass = require( '@stdlib/utils/native-class' );


// VARIABLES //

var f;


// FUNCTIONS //

/**
* Tests if a value is an array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is an array
*
* @example
* var bool = isArray( [] );
* // returns true
*
* @example
* var bool = isArray( {} );
* // returns false
*/
function isArray( value ) {
	return ( nativeClass( value ) === '[object Array]' );
}


// MAIN //

if ( Array.isArray ) {
	f = Array.isArray;
} else {
	f = isArray;
}


// EXPORTS //

module.exports = f;

},{"@stdlib/utils/native-class":342}],77:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is a boolean.
*
* @module @stdlib/assert/is-boolean
*
* @example
* var isBoolean = require( '@stdlib/assert/is-boolean' );
*
* var bool = isBoolean( false );
* // returns true
*
* bool = isBoolean( new Boolean( false ) );
* // returns true
*
* @example
* // Use interface to check for boolean primitives...
* var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;
*
* var bool = isBoolean( false );
* // returns true
*
* bool = isBoolean( new Boolean( true ) );
* // returns false
*
* @example
* // Use interface to check for boolean objects...
* var isBoolean = require( '@stdlib/assert/is-boolean' ).isObject;
*
* var bool = isBoolean( true );
* // returns false
*
* bool = isBoolean( new Boolean( false ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var isBoolean = require( './main.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isBoolean, 'isPrimitive', isPrimitive );
setReadOnly( isBoolean, 'isObject', isObject );


// EXPORTS //

module.exports = isBoolean;

},{"./main.js":78,"./object.js":79,"./primitive.js":80,"@stdlib/utils/define-nonenumerable-read-only-property":299}],78:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is a boolean.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a boolean
*
* @example
* var bool = isBoolean( false );
* // returns true
*
* @example
* var bool = isBoolean( true );
* // returns true
*
* @example
* var bool = isBoolean( new Boolean( false ) );
* // returns true
*
* @example
* var bool = isBoolean( new Boolean( true ) );
* // returns true
*/
function isBoolean( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
}


// EXPORTS //

module.exports = isBoolean;

},{"./object.js":79,"./primitive.js":80}],79:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var hasToStringTag = require( '@stdlib/assert/has-tostringtag-support' );
var nativeClass = require( '@stdlib/utils/native-class' );
var test = require( './try2serialize.js' );


// VARIABLES //

var FLG = hasToStringTag();


// MAIN //

/**
* Tests if a value is a boolean object.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a boolean object
*
* @example
* var bool = isBoolean( true );
* // returns false
*
* @example
* var bool = isBoolean( new Boolean( false ) );
* // returns true
*/
function isBoolean( value ) {
	if ( typeof value === 'object' ) {
		if ( value instanceof Boolean ) {
			return true;
		}
		if ( FLG ) {
			return test( value );
		}
		return ( nativeClass( value ) === '[object Boolean]' );
	}
	return false;
}


// EXPORTS //

module.exports = isBoolean;

},{"./try2serialize.js":82,"@stdlib/assert/has-tostringtag-support":55,"@stdlib/utils/native-class":342}],80:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Tests if a value is a boolean primitive.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a boolean primitive
*
* @example
* var bool = isBoolean( true );
* // returns true
*
* @example
* var bool = isBoolean( false );
* // returns true
*
* @example
* var bool = isBoolean( new Boolean( true ) );
* // returns false
*/
function isBoolean( value ) {
	return ( typeof value === 'boolean' );
}


// EXPORTS //

module.exports = isBoolean;

},{}],81:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// eslint-disable-next-line stdlib/no-redeclare
var toString = Boolean.prototype.toString; // non-generic


// EXPORTS //

module.exports = toString;

},{}],82:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var toString = require( './tostring.js' ); // eslint-disable-line stdlib/no-redeclare


// MAIN //

/**
* Attempts to serialize a value to a string.
*
* @private
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value can be serialized
*/
function test( value ) {
	try {
		toString.call( value );
		return true;
	} catch ( err ) { // eslint-disable-line no-unused-vars
		return false;
	}
}


// EXPORTS //

module.exports = test;

},{"./tostring.js":81}],83:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// EXPORTS //

module.exports = true;

},{}],84:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is a Buffer instance.
*
* @module @stdlib/assert/is-buffer
*
* @example
* var isBuffer = require( '@stdlib/assert/is-buffer' );
*
* var v = isBuffer( new Buffer( 'beep' ) );
* // returns true
*
* v = isBuffer( {} );
* // returns false
*/

// MODULES //

var isBuffer = require( './main.js' );


// EXPORTS //

module.exports = isBuffer;

},{"./main.js":85}],85:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isObjectLike = require( '@stdlib/assert/is-object-like' );


// MAIN //

/**
* Tests if a value is a Buffer instance.
*
* @param {*} value - value to validate
* @returns {boolean} boolean indicating if a value is a Buffer instance
*
* @example
* var v = isBuffer( new Buffer( 'beep' ) );
* // returns true
*
* @example
* var v = isBuffer( new Buffer( [1,2,3,4] ) );
* // returns true
*
* @example
* var v = isBuffer( {} );
* // returns false
*
* @example
* var v = isBuffer( [] );
* // returns false
*/
function isBuffer( value ) {
	return (
		isObjectLike( value ) &&
		(
			// eslint-disable-next-line no-underscore-dangle
			value._isBuffer || // for envs missing Object.prototype.constructor (e.g., Safari 5-7)
			(
				value.constructor &&

				// WARNING: `typeof` is not a foolproof check, as certain envs consider RegExp and NodeList instances to be functions
				typeof value.constructor.isBuffer === 'function' &&
				value.constructor.isBuffer( value )
			)
		)
	);
}


// EXPORTS //

module.exports = isBuffer;

},{"@stdlib/assert/is-object-like":139}],86:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is a collection.
*
* @module @stdlib/assert/is-collection
*
* @example
* var isCollection = require( '@stdlib/assert/is-collection' );
*
* var bool = isCollection( [] );
* // returns true
*
* bool = isCollection( {} );
* // returns false
*/

// MODULES //

var isCollection = require( './main.js' );


// EXPORTS //

module.exports = isCollection;

},{"./main.js":87}],87:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isInteger = require( '@stdlib/math/base/assert/is-integer' );
var MAX_LENGTH = require( '@stdlib/constants/array/max-typed-array-length' );


// MAIN //

/**
* Tests if a value is a collection.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether a value is a collection
*
* @example
* var bool = isCollection( [] );
* // returns true
*
* @example
* var bool = isCollection( {} );
* // returns false
*/
function isCollection( value ) {
	return (
		typeof value === 'object' &&
		value !== null &&
		typeof value.length === 'number' &&
		isInteger( value.length ) &&
		value.length >= 0 &&
		value.length <= MAX_LENGTH
	);
}


// EXPORTS //

module.exports = isCollection;

},{"@stdlib/constants/array/max-typed-array-length":225,"@stdlib/math/base/assert/is-integer":247}],88:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isEnum = require( './native.js' );


// VARIABLES //

var bool;


// FUNCTIONS //

/**
* Detects whether an environment has a bug where String indices are not detected as "enumerable" properties. Observed in Node v0.10.
*
* @private
* @returns {boolean} boolean indicating whether an environment has the bug
*/
function detect() {
	return !isEnum.call( 'beep', '0' );
}


// MAIN //

bool = detect();


// EXPORTS //

module.exports = bool;

},{"./native.js":91}],89:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test whether an object's own property is enumerable.
*
* @module @stdlib/assert/is-enumerable-property
*
* @example
* var isEnumerableProperty = require( '@stdlib/assert/is-enumerable-property' );
*
* var beep = {
*     'boop': true
* };
*
* var bool = isEnumerableProperty( beep, 'boop' );
* // returns true
*
* bool = isEnumerableProperty( beep, 'hasOwnProperty' );
* // returns false
*/

// MODULES //

var isEnumerableProperty = require( './main.js' );


// EXPORTS //

module.exports = isEnumerableProperty;

},{"./main.js":90}],90:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' );
var isnan = require( '@stdlib/assert/is-nan' ).isPrimitive;
var isInteger = require( '@stdlib/assert/is-integer' ).isPrimitive;
var isEnum = require( './native.js' );
var hasStringEnumBug = require( './has_string_enumerability_bug.js' );


// MAIN //

/**
* Tests if an object's own property is enumerable.
*
* @param {*} value - value to test
* @param {*} property - property to test
* @returns {boolean} boolean indicating if an object property is enumerable
*
* @example
* var beep = {
*     'boop': true
* };
*
* var bool = isEnumerableProperty( beep, 'boop' );
* // returns true
*
* @example
* var beep = {
*     'boop': true
* };
*
* var bool = isEnumerableProperty( beep, 'hasOwnProperty' );
* // returns false
*/
function isEnumerableProperty( value, property ) {
	var bool;
	if (
		value === void 0 ||
		value === null
	) {
		return false;
	}
	bool = isEnum.call( value, property );
	if ( !bool && hasStringEnumBug && isString( value ) ) {
		// Note: we only check for indices, as properties attached to a `String` object are properly detected as enumerable above.
		property = +property;
		return (
			!isnan( property ) &&
			isInteger( property ) &&
			property >= 0 &&
			property < value.length
		);
	}
	return bool;
}


// EXPORTS //

module.exports = isEnumerableProperty;

},{"./has_string_enumerability_bug.js":88,"./native.js":91,"@stdlib/assert/is-integer":106,"@stdlib/assert/is-nan":114,"@stdlib/assert/is-string":154}],91:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

/**
* Tests if an object's own property is enumerable.
*
* @private
* @name isEnumerableProperty
* @type {Function}
* @param {*} value - value to test
* @param {*} property - property to test
* @returns {boolean} boolean indicating if an object property is enumerable
*
* @example
* var beep = {
*     'boop': true
* };
*
* var bool = isEnumerableProperty( beep, 'boop' );
* // returns true
*
* @example
* var beep = {
*     'boop': true
* };
*
* var bool = isEnumerableProperty( beep, 'hasOwnProperty' );
* // returns false
*/
var isEnumerableProperty = Object.prototype.propertyIsEnumerable;


// EXPORTS //

module.exports = isEnumerableProperty;

},{}],92:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is an `Error` object.
*
* @module @stdlib/assert/is-error
*
* @example
* var isError = require( '@stdlib/assert/is-error' );
*
* var bool = isError( new Error( 'beep' ) );
* // returns true
*
* bool = isError( {} );
* // returns false
*/

// MODULES //

var isError = require( './main.js' );


// EXPORTS //

module.exports = isError;

},{"./main.js":93}],93:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var getPrototypeOf = require( '@stdlib/utils/get-prototype-of' );
var nativeClass = require( '@stdlib/utils/native-class' );


// MAIN //

/**
* Tests if a value is an `Error` object.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether a value is an `Error` object
*
* @example
* var bool = isError( new Error( 'beep' ) );
* // returns true
*
* @example
* var bool = isError( {} );
* // returns false
*/
function isError( value ) {
	if ( typeof value !== 'object' || value === null ) {
		return false;
	}
	// Check for `Error` objects from the same realm (same Node.js `vm` or same `Window` object)...
	if ( value instanceof Error ) {
		return true;
	}
	// Walk the prototype tree until we find an object having the desired native class...
	while ( value ) {
		if ( nativeClass( value ) === '[object Error]' ) {
			return true;
		}
		value = getPrototypeOf( value );
	}
	return false;
}


// EXPORTS //

module.exports = isError;

},{"@stdlib/utils/get-prototype-of":308,"@stdlib/utils/native-class":342}],94:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is a Float32Array.
*
* @module @stdlib/assert/is-float32array
*
* @example
* var isFloat32Array = require( '@stdlib/assert/is-float32array' );
*
* var bool = isFloat32Array( new Float32Array( 10 ) );
* // returns true
*
* bool = isFloat32Array( [] );
* // returns false
*/

// MODULES //

var isFloat32Array = require( './main.js' );


// EXPORTS //

module.exports = isFloat32Array;

},{"./main.js":95}],95:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var nativeClass = require( '@stdlib/utils/native-class' );


// VARIABLES //

var hasFloat32Array = ( typeof Float32Array === 'function' );// eslint-disable-line stdlib/require-globals


// MAIN //

/**
* Tests if a value is a Float32Array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a Float32Array
*
* @example
* var bool = isFloat32Array( new Float32Array( 10 ) );
* // returns true
*
* @example
* var bool = isFloat32Array( [] );
* // returns false
*/
function isFloat32Array( value ) {
	return (
		( hasFloat32Array && value instanceof Float32Array ) || // eslint-disable-line stdlib/require-globals
		nativeClass( value ) === '[object Float32Array]'
	);
}


// EXPORTS //

module.exports = isFloat32Array;

},{"@stdlib/utils/native-class":342}],96:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is a Float64Array.
*
* @module @stdlib/assert/is-float64array
*
* @example
* var isFloat64Array = require( '@stdlib/assert/is-float64array' );
*
* var bool = isFloat64Array( new Float64Array( 10 ) );
* // returns true
*
* bool = isFloat64Array( [] );
* // returns false
*/

// MODULES //

var isFloat64Array = require( './main.js' );


// EXPORTS //

module.exports = isFloat64Array;

},{"./main.js":97}],97:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var nativeClass = require( '@stdlib/utils/native-class' );


// VARIABLES //

var hasFloat64Array = ( typeof Float64Array === 'function' ); // eslint-disable-line stdlib/require-globals


// MAIN //

/**
* Tests if a value is a Float64Array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a Float64Array
*
* @example
* var bool = isFloat64Array( new Float64Array( 10 ) );
* // returns true
*
* @example
* var bool = isFloat64Array( [] );
* // returns false
*/
function isFloat64Array( value ) {
	return (
		( hasFloat64Array && value instanceof Float64Array ) || // eslint-disable-line stdlib/require-globals
		nativeClass( value ) === '[object Float64Array]'
	);
}


// EXPORTS //

module.exports = isFloat64Array;

},{"@stdlib/utils/native-class":342}],98:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is a function.
*
* @module @stdlib/assert/is-function
*
* @example
* var isFunction = require( '@stdlib/assert/is-function' );
*
* function beep() {
*     return 'beep';
* }
*
* var bool = isFunction( beep );
* // returns true
*/

// MODULES //

var isFunction = require( './main.js' );


// EXPORTS //

module.exports = isFunction;

},{"./main.js":99}],99:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var typeOf = require( '@stdlib/utils/type-of' );


// MAIN //

/**
* Tests if a value is a function.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a function
*
* @example
* function beep() {
*     return 'beep';
* }
*
* var bool = isFunction( beep );
* // returns true
*/
function isFunction( value ) {
	// Note: cannot use `typeof` directly, as various browser engines incorrectly return `'function'` when operating on non-function objects, such as regular expressions and NodeLists.
	return ( typeOf( value ) === 'function' );
}


// EXPORTS //

module.exports = isFunction;

},{"@stdlib/utils/type-of":367}],100:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is an Int16Array.
*
* @module @stdlib/assert/is-int16array
*
* @example
* var isInt16Array = require( '@stdlib/assert/is-int16array' );
*
* var bool = isInt16Array( new Int16Array( 10 ) );
* // returns true
*
* bool = isInt16Array( [] );
* // returns false
*/

// MODULES //

var isInt16Array = require( './main.js' );


// EXPORTS //

module.exports = isInt16Array;

},{"./main.js":101}],101:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var nativeClass = require( '@stdlib/utils/native-class' );


// VARIABLES //

var hasInt16Array = ( typeof Int16Array === 'function' ); // eslint-disable-line stdlib/require-globals


// MAIN //

/**
* Tests if a value is an Int16Array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is an Int16Array
*
* @example
* var bool = isInt16Array( new Int16Array( 10 ) );
* // returns true
*
* @example
* var bool = isInt16Array( [] );
* // returns false
*/
function isInt16Array( value ) {
	return (
		( hasInt16Array && value instanceof Int16Array ) || // eslint-disable-line stdlib/require-globals
		nativeClass( value ) === '[object Int16Array]'
	);
}


// EXPORTS //

module.exports = isInt16Array;

},{"@stdlib/utils/native-class":342}],102:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is an Int32Array.
*
* @module @stdlib/assert/is-int32array
*
* @example
* var isInt32Array = require( '@stdlib/assert/is-int32array' );
*
* var bool = isInt32Array( new Int32Array( 10 ) );
* // returns true
*
* bool = isInt32Array( [] );
* // returns false
*/

// MODULES //

var isInt32Array = require( './main.js' );


// EXPORTS //

module.exports = isInt32Array;

},{"./main.js":103}],103:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var nativeClass = require( '@stdlib/utils/native-class' );


// VARIABLES //

var hasInt32Array = ( typeof Int32Array === 'function' ); // eslint-disable-line stdlib/require-globals


// MAIN //

/**
* Tests if a value is an Int32Array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is an Int32Array
*
* @example
* var bool = isInt32Array( new Int32Array( 10 ) );
* // returns true
*
* @example
* var bool = isInt32Array( [] );
* // returns false
*/
function isInt32Array( value ) {
	return (
		( hasInt32Array && value instanceof Int32Array ) || // eslint-disable-line stdlib/require-globals
		nativeClass( value ) === '[object Int32Array]'
	);
}


// EXPORTS //

module.exports = isInt32Array;

},{"@stdlib/utils/native-class":342}],104:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is an Int8Array.
*
* @module @stdlib/assert/is-int8array
*
* @example
* var isInt8Array = require( '@stdlib/assert/is-int8array' );
*
* var bool = isInt8Array( new Int8Array( 10 ) );
* // returns true
*
* bool = isInt8Array( [] );
* // returns false
*/

// MODULES //

var isInt8Array = require( './main.js' );


// EXPORTS //

module.exports = isInt8Array;

},{"./main.js":105}],105:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var nativeClass = require( '@stdlib/utils/native-class' );


// VARIABLES //

var hasInt8Array = ( typeof Int8Array === 'function' ); // eslint-disable-line stdlib/require-globals


// MAIN //

/**
* Tests if a value is an Int8Array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is an Int8Array
*
* @example
* var bool = isInt8Array( new Int8Array( 10 ) );
* // returns true
*
* @example
* var bool = isInt8Array( [] );
* // returns false
*/
function isInt8Array( value ) {
	return (
		( hasInt8Array && value instanceof Int8Array ) || // eslint-disable-line stdlib/require-globals
		nativeClass( value ) === '[object Int8Array]'
	);
}


// EXPORTS //

module.exports = isInt8Array;

},{"@stdlib/utils/native-class":342}],106:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is an integer.
*
* @module @stdlib/assert/is-integer
*
* @example
* var isInteger = require( '@stdlib/assert/is-integer' );
*
* var bool = isInteger( 5.0 );
* // returns true
*
* bool = isInteger( new Number( 5.0 ) );
* // returns true
*
* bool = isInteger( -3.14 );
* // returns false
*
* bool = isInteger( null );
* // returns false
*
* @example
* // Use interface to check for integer primitives...
* var isInteger = require( '@stdlib/assert/is-integer' ).isPrimitive;
*
* var bool = isInteger( -3.0 );
* // returns true
*
* bool = isInteger( new Number( -3.0 ) );
* // returns false
*
* @example
* // Use interface to check for integer objects...
* var isInteger = require( '@stdlib/assert/is-integer' ).isObject;
*
* var bool = isInteger( 3.0 );
* // returns false
*
* bool = isInteger( new Number( 3.0 ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var isInteger = require( './main.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isInteger, 'isPrimitive', isPrimitive );
setReadOnly( isInteger, 'isObject', isObject );


// EXPORTS //

module.exports = isInteger;

},{"./main.js":108,"./object.js":109,"./primitive.js":110,"@stdlib/utils/define-nonenumerable-read-only-property":299}],107:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var isInt = require( '@stdlib/math/base/assert/is-integer' );


// MAIN //

/**
* Tests if a number primitive is an integer value.
*
* @private
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a number primitive is an integer value
*/
function isInteger( value ) {
	return (
		value < PINF &&
		value > NINF &&
		isInt( value )
	);
}


// EXPORTS //

module.exports = isInteger;

},{"@stdlib/constants/math/float64-ninf":229,"@stdlib/constants/math/float64-pinf":230,"@stdlib/math/base/assert/is-integer":247}],108:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is an integer.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is an integer
*
* @example
* var bool = isInteger( 5.0 );
* // returns true
*
* @example
* var bool = isInteger( new Number( 5.0 ) );
* // returns true
*
* @example
* var bool = isInteger( -3.14 );
* // returns false
*
* @example
* var bool = isInteger( null );
* // returns false
*/
function isInteger( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
}


// EXPORTS //

module.exports = isInteger;

},{"./object.js":109,"./primitive.js":110}],109:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isObject;
var isInt = require( './integer.js' );


// MAIN //

/**
* Tests if a value is a number object having an integer value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number object having an integer value
*
* @example
* var bool = isInteger( 3.0 );
* // returns false
*
* @example
* var bool = isInteger( new Number( 3.0 ) );
* // returns true
*/
function isInteger( value ) {
	return (
		isNumber( value ) &&
		isInt( value.valueOf() )
	);
}


// EXPORTS //

module.exports = isInteger;

},{"./integer.js":107,"@stdlib/assert/is-number":133}],110:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;
var isInt = require( './integer.js' );


// MAIN //

/**
* Tests if a value is a number primitive having an integer value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number primitive having an integer value
*
* @example
* var bool = isInteger( -3.0 );
* // returns true
*
* @example
* var bool = isInteger( new Number( -3.0 ) );
* // returns false
*/
function isInteger( value ) {
	return (
		isNumber( value ) &&
		isInt( value )
	);
}


// EXPORTS //

module.exports = isInteger;

},{"./integer.js":107,"@stdlib/assert/is-number":133}],111:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var Uint8Array = require( '@stdlib/array/uint8' );
var Uint16Array = require( '@stdlib/array/uint16' );


// MAIN //

var ctors = {
	'uint16': Uint16Array,
	'uint8': Uint8Array
};


// EXPORTS //

module.exports = ctors;

},{"@stdlib/array/uint16":16,"@stdlib/array/uint8":22}],112:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Return a boolean indicating if an environment is little endian.
*
* @module @stdlib/assert/is-little-endian
*
* @example
* var IS_LITTLE_ENDIAN = require( '@stdlib/assert/is-little-endian' );
*
* var bool = IS_LITTLE_ENDIAN;
* // returns <boolean>
*/

// MODULES //

var IS_LITTLE_ENDIAN = require( './main.js' );


// EXPORTS //

module.exports = IS_LITTLE_ENDIAN;

},{"./main.js":113}],113:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var ctors = require( './ctors.js' );


// VARIABLES //

var bool;


// FUNCTIONS //

/**
* Returns a boolean indicating if an environment is little endian.
*
* @private
* @returns {boolean} boolean indicating if an environment is little endian
*
* @example
* var bool = isLittleEndian();
* // returns <boolean>
*/
function isLittleEndian() {
	var uint16view;
	var uint8view;

	uint16view = new ctors[ 'uint16' ]( 1 );

	/*
	* Set the uint16 view to a value having distinguishable lower and higher order words.
	*
	* 4660 => 0x1234 => 0x12 0x34 => '00010010 00110100' => (0x12,0x34) == (18,52)
	*/
	uint16view[ 0 ] = 0x1234;

	// Create a uint8 view on top of the uint16 buffer:
	uint8view = new ctors[ 'uint8' ]( uint16view.buffer );

	// If little endian, the least significant byte will be first...
	return ( uint8view[ 0 ] === 0x34 );
}


// MAIN //

bool = isLittleEndian();


// EXPORTS //

module.exports = bool;

},{"./ctors.js":111}],114:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is `NaN`.
*
* @module @stdlib/assert/is-nan
*
* @example
* var isnan = require( '@stdlib/assert/is-nan' );
*
* var bool = isnan( NaN );
* // returns true
*
* bool = isnan( new Number( NaN ) );
* // returns true
*
* bool = isnan( 3.14 );
* // returns false
*
* bool = isnan( null );
* // returns false
*
* @example
* var isnan = require( '@stdlib/assert/is-nan' ).isPrimitive;
*
* var bool = isnan( NaN );
* // returns true
*
* bool = isnan( 3.14 );
* // returns false
*
* bool = isnan( new Number( NaN ) );
* // returns false
*
* @example
* var isnan = require( '@stdlib/assert/is-nan' ).isObject;
*
* var bool = isnan( NaN );
* // returns false
*
* bool = isnan( new Number( NaN ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var isnan = require( './main.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isnan, 'isPrimitive', isPrimitive );
setReadOnly( isnan, 'isObject', isObject );


// EXPORTS //

module.exports = isnan;

},{"./main.js":115,"./object.js":116,"./primitive.js":117,"@stdlib/utils/define-nonenumerable-read-only-property":299}],115:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is `NaN`.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is `NaN`
*
* @example
* var bool = isnan( NaN );
* // returns true
*
* @example
* var bool = isnan( new Number( NaN ) );
* // returns true
*
* @example
* var bool = isnan( 3.14 );
* // returns false
*
* @example
* var bool = isnan( null );
* // returns false
*/
function isnan( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
}


// EXPORTS //

module.exports = isnan;

},{"./object.js":116,"./primitive.js":117}],116:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isObject;
var isNan = require( '@stdlib/math/base/assert/is-nan' );


// MAIN //

/**
* Tests if a value is a number object having a value of `NaN`.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number object having a value of `NaN`
*
* @example
* var bool = isnan( NaN );
* // returns false
*
* @example
* var bool = isnan( new Number( NaN ) );
* // returns true
*/
function isnan( value ) {
	return (
		isNumber( value ) &&
		isNan( value.valueOf() )
	);
}


// EXPORTS //

module.exports = isnan;

},{"@stdlib/assert/is-number":133,"@stdlib/math/base/assert/is-nan":249}],117:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;
var isNan = require( '@stdlib/math/base/assert/is-nan' );


// MAIN //

/**
* Tests if a value is a `NaN` number primitive.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a `NaN` number primitive
*
* @example
* var bool = isnan( NaN );
* // returns true
*
* @example
* var bool = isnan( 3.14 );
* // returns false
*
* @example
* var bool = isnan( new Number( NaN ) );
* // returns false
*/
function isnan( value ) {
	return (
		isNumber( value ) &&
		isNan( value )
	);
}


// EXPORTS //

module.exports = isnan;

},{"@stdlib/assert/is-number":133,"@stdlib/math/base/assert/is-nan":249}],118:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is Node stream-like.
*
* @module @stdlib/assert/is-node-stream-like
*
* @example
* var transformStream = require( '@stdlib/streams/node/transform' );
* var isNodeStreamLike = require( '@stdlib/assert/is-node-stream-like' );
*
* var stream = transformStream();
*
* var bool = isNodeStreamLike( stream );
* // returns true
*
* bool = isNodeStreamLike( {} );
* // returns false
*/

// MODULES //

var isNodeStreamLike = require( './main.js' );


// EXPORTS //

module.exports = isNodeStreamLike;

},{"./main.js":119}],119:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

/**
* Tests if a value is Node stream-like.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is Node stream-like
*
* @example
* var transformStream = require( '@stdlib/streams/node/transform' );
*
* var stream = transformStream();
*
* var bool = isNodeStreamLike( stream );
* // returns true
*
* bool = isNodeStreamLike( {} );
* // returns false
*/
function isNodeStreamLike( value ) {
	return (
		// Must be an object:
		value !== null &&
		typeof value === 'object' &&

		// Should be an event emitter:
		typeof value.on === 'function' &&
		typeof value.once === 'function' &&
		typeof value.emit === 'function' &&
		typeof value.addListener === 'function' &&
		typeof value.removeListener === 'function' &&
		typeof value.removeAllListeners === 'function' &&

		// Should have a `pipe` method (Node streams inherit from `Stream`, including writable streams):
		typeof value.pipe === 'function'
	);
}


// EXPORTS //

module.exports = isNodeStreamLike;

},{}],120:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is Node writable stream-like.
*
* @module @stdlib/assert/is-node-writable-stream-like
*
* @example
* var transformStream = require( '@stdlib/streams/node/transform' );
* var isNodeWritableStreamLike = require( '@stdlib/assert/is-node-writable-stream-like' );
*
* var stream = transformStream();
*
* var bool = isNodeWritableStreamLike( stream );
* // returns true
*
* bool = isNodeWritableStreamLike( {} );
* // returns false
*/

// MODULES //

var isNodeWritableStreamLike = require( './main.js' );


// EXPORTS //

module.exports = isNodeWritableStreamLike;

},{"./main.js":121}],121:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

/* eslint-disable no-underscore-dangle */

'use strict';

// MODULES //

var isNodeStreamLike = require( '@stdlib/assert/is-node-stream-like' );


// MAIN //

/**
* Tests if a value is Node writable stream-like.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is Node writable stream-like
*
* @example
* var transformStream = require( '@stdlib/streams/node/transform' );
*
* var stream = transformStream();
*
* var bool = isNodeWritableStreamLike( stream );
* // returns true
*
* bool = isNodeWritableStreamLike( {} );
* // returns false
*/
function isNodeWritableStreamLike( value ) {
	return (
		// Must be stream-like:
		isNodeStreamLike( value ) &&

		// Should have writable stream methods:
		typeof value._write === 'function' &&

		// Should have writable stream state:
		typeof value._writableState === 'object'
	);
}


// EXPORTS //

module.exports = isNodeWritableStreamLike;

},{"@stdlib/assert/is-node-stream-like":118}],122:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is an array-like object containing only nonnegative integers.
*
* @module @stdlib/assert/is-nonnegative-integer-array
*
* @example
* var isNonNegativeIntegerArray = require( '@stdlib/assert/is-nonnegative-integer-array' );
*
* var bool = isNonNegativeIntegerArray( [ 3.0, new Number(3.0) ] );
* // returns true
*
* bool = isNonNegativeIntegerArray( [ 3.0, '3.0' ] );
* // returns false
*
* @example
* var isNonNegativeIntegerArray = require( '@stdlib/assert/is-nonnegative-integer-array' ).primitives;
*
* var bool = isNonNegativeIntegerArray( [ 1.0, 0.0, 10.0 ] );
* // returns true
*
* bool = isNonNegativeIntegerArray( [ 3.0, new Number(1.0) ] );
* // returns false
*
* @example
* var isNonNegativeIntegerArray = require( '@stdlib/assert/is-nonnegative-integer-array' ).objects;
*
* var bool = isNonNegativeIntegerArray( [ new Number(3.0), new Number(1.0) ] );
* // returns true
*
* bool = isNonNegativeIntegerArray( [ 1.0, 0.0, 10.0 ] );
* // returns false
*/

// MODULES //

var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' );
var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var arrayfun = require( '@stdlib/assert/tools/array-like-function' );


// MAIN //

var isNonNegativeIntegerArray = arrayfun( isNonNegativeInteger );
setReadOnly( isNonNegativeIntegerArray, 'primitives', arrayfun( isNonNegativeInteger.isPrimitive ) );
setReadOnly( isNonNegativeIntegerArray, 'objects', arrayfun( isNonNegativeInteger.isObject ) );


// EXPORTS //

module.exports = isNonNegativeIntegerArray;

},{"@stdlib/assert/is-nonnegative-integer":123,"@stdlib/assert/tools/array-like-function":171,"@stdlib/utils/define-nonenumerable-read-only-property":299}],123:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is a nonnegative integer.
*
* @module @stdlib/assert/is-nonnegative-integer
*
* @example
* var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' );
*
* var bool = isNonNegativeInteger( 5.0 );
* // returns true
*
* bool = isNonNegativeInteger( new Number( 5.0 ) );
* // returns true
*
* bool = isNonNegativeInteger( -5.0 );
* // returns false
*
* bool = isNonNegativeInteger( 3.14 );
* // returns false
*
* bool = isNonNegativeInteger( null );
* // returns false
*
* @example
* var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;
*
* var bool = isNonNegativeInteger( 3.0 );
* // returns true
*
* bool = isNonNegativeInteger( new Number( 3.0 ) );
* // returns false
*
* @example
* var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isObject;
*
* var bool = isNonNegativeInteger( 3.0 );
* // returns false
*
* bool = isNonNegativeInteger( new Number( 3.0 ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var isNonNegativeInteger = require( './main.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isNonNegativeInteger, 'isPrimitive', isPrimitive );
setReadOnly( isNonNegativeInteger, 'isObject', isObject );


// EXPORTS //

module.exports = isNonNegativeInteger;

},{"./main.js":124,"./object.js":125,"./primitive.js":126,"@stdlib/utils/define-nonenumerable-read-only-property":299}],124:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is a nonnegative integer.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a nonnegative integer
*
* @example
* var bool = isNonNegativeInteger( 5.0 );
* // returns true
*
* @example
* var bool = isNonNegativeInteger( new Number( 5.0 ) );
* // returns true
*
* @example
* var bool = isNonNegativeInteger( -5.0 );
* // returns false
*
* @example
* var bool = isNonNegativeInteger( 3.14 );
* // returns false
*
* @example
* var bool = isNonNegativeInteger( null );
* // returns false
*/
function isNonNegativeInteger( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
}


// EXPORTS //

module.exports = isNonNegativeInteger;

},{"./object.js":125,"./primitive.js":126}],125:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isInteger = require( '@stdlib/assert/is-integer' ).isObject;


// MAIN //

/**
* Tests if a value is a number object having a nonnegative integer value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number object having a nonnegative integer value
*
* @example
* var bool = isNonNegativeInteger( 3.0 );
* // returns false
*
* @example
* var bool = isNonNegativeInteger( new Number( 3.0 ) );
* // returns true
*/
function isNonNegativeInteger( value ) {
	return (
		isInteger( value ) &&
		value.valueOf() >= 0
	);
}


// EXPORTS //

module.exports = isNonNegativeInteger;

},{"@stdlib/assert/is-integer":106}],126:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isInteger = require( '@stdlib/assert/is-integer' ).isPrimitive;


// MAIN //

/**
* Tests if a value is a number primitive having a nonnegative integer value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number primitive having a nonnegative integer value
*
* @example
* var bool = isNonNegativeInteger( 3.0 );
* // returns true
*
* @example
* var bool = isNonNegativeInteger( new Number( 3.0 ) );
* // returns false
*/
function isNonNegativeInteger( value ) {
	return (
		isInteger( value ) &&
		value >= 0
	);
}


// EXPORTS //

module.exports = isNonNegativeInteger;

},{"@stdlib/assert/is-integer":106}],127:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is a nonnegative number.
*
* @module @stdlib/assert/is-nonnegative-number
*
* @example
* var isNonNegativeNumber = require( '@stdlib/assert/is-nonnegative-number' );
*
* var bool = isNonNegativeNumber( 5.0 );
* // returns true
*
* bool = isNonNegativeNumber( new Number( 5.0 ) );
* // returns true
*
* bool = isNonNegativeNumber( 3.14 );
* // returns true
*
* bool = isNonNegativeNumber( -5.0 );
* // returns false
*
* bool = isNonNegativeNumber( null );
* // returns false
*
* @example
* var isNonNegativeNumber = require( '@stdlib/assert/is-nonnegative-number' ).isPrimitive;
*
* var bool = isNonNegativeNumber( 3.0 );
* // returns true
*
* bool = isNonNegativeNumber( new Number( 3.0 ) );
* // returns false
*
* @example
* var isNonNegativeNumber = require( '@stdlib/assert/is-nonnegative-number' ).isObject;
*
* var bool = isNonNegativeNumber( 3.0 );
* // returns false
*
* bool = isNonNegativeNumber( new Number( 3.0 ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var isNonNegativeNumber = require( './main.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isNonNegativeNumber, 'isPrimitive', isPrimitive );
setReadOnly( isNonNegativeNumber, 'isObject', isObject );


// EXPORTS //

module.exports = isNonNegativeNumber;

},{"./main.js":128,"./object.js":129,"./primitive.js":130,"@stdlib/utils/define-nonenumerable-read-only-property":299}],128:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is a nonnegative number.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a nonnegative number
*
* @example
* var bool = isNonNegativeNumber( 5.0 );
* // returns true
*
* @example
* var bool = isNonNegativeNumber( new Number( 5.0 ) );
* // returns true
*
* @example
* var bool = isNonNegativeNumber( 3.14 );
* // returns true
*
* @example
* var bool = isNonNegativeNumber( -5.0 );
* // returns false
*
* @example
* var bool = isNonNegativeNumber( null );
* // returns false
*/
function isNonNegativeNumber( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
}


// EXPORTS //

module.exports = isNonNegativeNumber;

},{"./object.js":129,"./primitive.js":130}],129:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isObject;


// MAIN //

/**
* Tests if a value is a number object having a nonnegative value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number object having a nonnegative number value
*
* @example
* var bool = isNonNegativeNumber( 3.0 );
* // returns false
*
* @example
* var bool = isNonNegativeNumber( new Number( 3.0 ) );
* // returns true
*/
function isNonNegativeNumber( value ) {
	return (
		isNumber( value ) &&
		value.valueOf() >= 0.0
	);
}


// EXPORTS //

module.exports = isNonNegativeNumber;

},{"@stdlib/assert/is-number":133}],130:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;


// MAIN //

/**
* Tests if a value is a number primitive having a nonnegative value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number primitive having a nonnegative number value
*
* @example
* var bool = isNonNegativeNumber( 3.0 );
* // returns true
*
* @example
* var bool = isNonNegativeNumber( new Number( 3.0 ) );
* // returns false
*/
function isNonNegativeNumber( value ) {
	return (
		isNumber( value ) &&
		value >= 0.0
	);
}


// EXPORTS //

module.exports = isNonNegativeNumber;

},{"@stdlib/assert/is-number":133}],131:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is `null`.
*
* @module @stdlib/assert/is-null
*
* @example
* var isNull = require( '@stdlib/assert/is-null' );
*
* var value = null;
*
* var bool = isNull( value );
* // returns true
*/

// MODULES //

var isNull = require( './main.js' );


// EXPORTS //

module.exports = isNull;

},{"./main.js":132}],132:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Tests if a value is `null`.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is null
*
* @example
* var bool = isNull( null );
* // returns true
*
* bool = isNull( true );
* // returns false
*/
function isNull( value ) {
	return value === null;
}


// EXPORTS //

module.exports = isNull;

},{}],133:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is a number.
*
* @module @stdlib/assert/is-number
*
* @example
* var isNumber = require( '@stdlib/assert/is-number' );
*
* var bool = isNumber( 3.14 );
* // returns true
*
* bool = isNumber( new Number( 3.14 ) );
* // returns true
*
* bool = isNumber( NaN );
* // returns true
*
* bool = isNumber( null );
* // returns false
*
* @example
* var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;
*
* var bool = isNumber( 3.14 );
* // returns true
*
* bool = isNumber( NaN );
* // returns true
*
* bool = isNumber( new Number( 3.14 ) );
* // returns false
*
* @example
* var isNumber = require( '@stdlib/assert/is-number' ).isObject;
*
* var bool = isNumber( 3.14 );
* // returns false
*
* bool = isNumber( new Number( 3.14 ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var isNumber = require( './main.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isNumber, 'isPrimitive', isPrimitive );
setReadOnly( isNumber, 'isObject', isObject );


// EXPORTS //

module.exports = isNumber;

},{"./main.js":134,"./object.js":135,"./primitive.js":136,"@stdlib/utils/define-nonenumerable-read-only-property":299}],134:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is a number.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a number
*
* @example
* var bool = isNumber( 3.14 );
* // returns true
*
* @example
* var bool = isNumber( new Number( 3.14 ) );
* // returns true
*
* @example
* var bool = isNumber( NaN );
* // returns true
*
* @example
* var bool = isNumber( null );
* // returns false
*/
function isNumber( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
}


// EXPORTS //

module.exports = isNumber;

},{"./object.js":135,"./primitive.js":136}],135:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var hasToStringTag = require( '@stdlib/assert/has-tostringtag-support' );
var nativeClass = require( '@stdlib/utils/native-class' );
var Number = require( '@stdlib/number/ctor' );
var test = require( './try2serialize.js' );


// VARIABLES //

var FLG = hasToStringTag();


// MAIN //

/**
* Tests if a value is a number object.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number object
*
* @example
* var bool = isNumber( 3.14 );
* // returns false
*
* @example
* var bool = isNumber( new Number( 3.14 ) );
* // returns true
*/
function isNumber( value ) {
	if ( typeof value === 'object' ) {
		if ( value instanceof Number ) {
			return true;
		}
		if ( FLG ) {
			return test( value );
		}
		return ( nativeClass( value ) === '[object Number]' );
	}
	return false;
}


// EXPORTS //

module.exports = isNumber;

},{"./try2serialize.js":138,"@stdlib/assert/has-tostringtag-support":55,"@stdlib/number/ctor":258,"@stdlib/utils/native-class":342}],136:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Tests if a value is a number primitive.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number primitive
*
* @example
* var bool = isNumber( 3.14 );
* // returns true
*
* @example
* var bool = isNumber( NaN );
* // returns true
*
* @example
* var bool = isNumber( new Number( 3.14 ) );
* // returns false
*/
function isNumber( value ) {
	return ( typeof value === 'number' );
}


// EXPORTS //

module.exports = isNumber;

},{}],137:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var Number = require( '@stdlib/number/ctor' );


// MAIN //

// eslint-disable-next-line stdlib/no-redeclare
var toString = Number.prototype.toString; // non-generic


// EXPORTS //

module.exports = toString;

},{"@stdlib/number/ctor":258}],138:[function(require,module,exports){
arguments[4][82][0].apply(exports,arguments)
},{"./tostring.js":137,"dup":82}],139:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is object-like.
*
* @module @stdlib/assert/is-object-like
*
* @example
* var isObjectLike = require( '@stdlib/assert/is-object-like' );
*
* var bool = isObjectLike( {} );
* // returns true
*
* bool = isObjectLike( [] );
* // returns true
*
* bool = isObjectLike( null );
* // returns false
*
* @example
* var isObjectLike = require( '@stdlib/assert/is-object-like' ).isObjectLikeArray;
*
* var bool = isObjectLike( [ {}, [] ] );
* // returns true
*
* bool = isObjectLike( [ {}, '3.0' ] );
* // returns false
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var arrayfun = require( '@stdlib/assert/tools/array-function' );
var isObjectLike = require( './main.js' );


// MAIN //

setReadOnly( isObjectLike, 'isObjectLikeArray', arrayfun( isObjectLike ) );


// EXPORTS //

module.exports = isObjectLike;

},{"./main.js":140,"@stdlib/assert/tools/array-function":169,"@stdlib/utils/define-nonenumerable-read-only-property":299}],140:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Tests if a value is object-like.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether a value is object-like
*
* @example
* var bool = isObjectLike( {} );
* // returns true
*
* @example
* var bool = isObjectLike( [] );
* // returns true
*
* @example
* var bool = isObjectLike( null );
* // returns false
*/
function isObjectLike( value ) {
	return (
		value !== null &&
		typeof value === 'object'
	);
}


// EXPORTS //

module.exports = isObjectLike;

},{}],141:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is an object.
*
* @module @stdlib/assert/is-object
*
* @example
* var isObject = require( '@stdlib/assert/is-object' );
*
* var bool = isObject( {} );
* // returns true
*
* bool = isObject( true );
* // returns false
*/

// MODULES //

var isObject = require( './main.js' );


// EXPORTS //

module.exports = isObject;

},{"./main.js":142}],142:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isArray = require( '@stdlib/assert/is-array' );


// MAIN //

/**
* Tests if a value is an object; e.g., `{}`.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is an object
*
* @example
* var bool = isObject( {} );
* // returns true
*
* @example
* var bool = isObject( null );
* // returns false
*/
function isObject( value ) {
	return (
		typeof value === 'object' &&
		value !== null &&
		!isArray( value )
	);
}


// EXPORTS //

module.exports = isObject;

},{"@stdlib/assert/is-array":75}],143:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is a plain object.
*
* @module @stdlib/assert/is-plain-object
*
* @example
* var isPlainObject = require( '@stdlib/assert/is-plain-object' );
*
* var bool = isPlainObject( {} );
* // returns true
*
* bool = isPlainObject( null );
* // returns false
*/

// MODULES //

var isPlainObject = require( './main.js' );


// EXPORTS //

module.exports = isPlainObject;

},{"./main.js":144}],144:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isObject = require( '@stdlib/assert/is-object' );
var isFunction = require( '@stdlib/assert/is-function' );
var getPrototypeOf = require( '@stdlib/utils/get-prototype-of' );
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var nativeClass = require( '@stdlib/utils/native-class' );


// VARIABLES //

var objectPrototype = Object.prototype;


// FUNCTIONS //

/**
* Tests that an object only has own properties.
*
* @private
* @param {Object} obj - value to test
* @returns {boolean} boolean indicating if an object only has own properties
*/
function ownProps( obj ) {
	var key;

	// NOTE: possibility of perf boost if key enumeration order is known (see http://stackoverflow.com/questions/18531624/isplainobject-thing).
	for ( key in obj ) {
		if ( !hasOwnProp( obj, key ) ) {
			return false;
		}
	}
	return true;
}


// MAIN //

/**
* Tests if a value is a plain object.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a plain object
*
* @example
* var bool = isPlainObject( {} );
* // returns true
*
* @example
* var bool = isPlainObject( null );
* // returns false
*/
function isPlainObject( value ) {
	var proto;

	// Screen for obvious non-objects...
	if ( !isObject( value ) ) {
		return false;
	}
	// Objects with no prototype (e.g., `Object.create( null )`) are plain...
	proto = getPrototypeOf( value );
	if ( !proto ) {
		return true;
	}
	// Objects having a prototype are plain if and only if they are constructed with a global `Object` function and the prototype points to the prototype of a plain object...
	return (
		// Cannot have own `constructor` property:
		!hasOwnProp( value, 'constructor' ) &&

		// Prototype `constructor` property must be a function (see also https://bugs.jquery.com/ticket/9897 and http://stackoverflow.com/questions/18531624/isplainobject-thing):
		hasOwnProp( proto, 'constructor' ) &&
		isFunction( proto.constructor ) &&
		nativeClass( proto.constructor ) === '[object Function]' &&

		// Test for object-specific method:
		hasOwnProp( proto, 'isPrototypeOf' ) &&
		isFunction( proto.isPrototypeOf ) &&

		(
			// Test if the prototype matches the global `Object` prototype (same realm):
			proto === objectPrototype ||

			// Test that all properties are own properties (cross-realm; *most* likely a plain object):
			ownProps( value )
		)
	);
}


// EXPORTS //

module.exports = isPlainObject;

},{"@stdlib/assert/has-own-property":49,"@stdlib/assert/is-function":98,"@stdlib/assert/is-object":141,"@stdlib/utils/get-prototype-of":308,"@stdlib/utils/native-class":342}],145:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is a positive integer.
*
* @module @stdlib/assert/is-positive-integer
*
* @example
* var isPositiveInteger = require( '@stdlib/assert/is-positive-integer' );
*
* var bool = isPositiveInteger( 5.0 );
* // returns true
*
* bool = isPositiveInteger( new Number( 5.0 ) );
* // returns true
*
* bool = isPositiveInteger( -5.0 );
* // returns false
*
* bool = isPositiveInteger( 3.14 );
* // returns false
*
* bool = isPositiveInteger( null );
* // returns false
*
* @example
* var isPositiveInteger = require( '@stdlib/assert/is-positive-integer' ).isPrimitive;
*
* var bool = isPositiveInteger( 3.0 );
* // returns true
*
* bool = isPositiveInteger( new Number( 3.0 ) );
* // returns false
*
* @example
* var isPositiveInteger = require( '@stdlib/assert/is-positive-integer' ).isObject;
*
* var bool = isPositiveInteger( 3.0 );
* // returns false
*
* bool = isPositiveInteger( new Number( 3.0 ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var isPositiveInteger = require( './main.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isPositiveInteger, 'isPrimitive', isPrimitive );
setReadOnly( isPositiveInteger, 'isObject', isObject );


// EXPORTS //

module.exports = isPositiveInteger;

},{"./main.js":146,"./object.js":147,"./primitive.js":148,"@stdlib/utils/define-nonenumerable-read-only-property":299}],146:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is a positive integer.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a positive integer
*
* @example
* var bool = isPositiveInteger( 5.0 );
* // returns true
*
* @example
* var bool = isPositiveInteger( new Number( 5.0 ) );
* // returns true
*
* @example
* var bool = isPositiveInteger( 0.0 );
* // returns false
*
* @example
* var bool = isPositiveInteger( -5.0 );
* // returns false
*
* @example
* var bool = isPositiveInteger( 3.14 );
* // returns false
*
* @example
* var bool = isPositiveInteger( null );
* // returns false
*/
function isPositiveInteger( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
}


// EXPORTS //

module.exports = isPositiveInteger;

},{"./object.js":147,"./primitive.js":148}],147:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isInteger = require( '@stdlib/assert/is-integer' ).isObject;


// MAIN //

/**
* Tests if a value is a number object having a positive integer value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number object having a positive integer value
*
* @example
* var bool = isPositiveInteger( 3.0 );
* // returns false
*
* @example
* var bool = isPositiveInteger( new Number( 3.0 ) );
* // returns true
*/
function isPositiveInteger( value ) {
	return (
		isInteger( value ) &&
		value.valueOf() > 0.0
	);
}


// EXPORTS //

module.exports = isPositiveInteger;

},{"@stdlib/assert/is-integer":106}],148:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isInteger = require( '@stdlib/assert/is-integer' ).isPrimitive;


// MAIN //

/**
* Tests if a value is a number primitive having a positive integer value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number primitive having a positive integer value
*
* @example
* var bool = isPositiveInteger( 3.0 );
* // returns true
*
* @example
* var bool = isPositiveInteger( new Number( 3.0 ) );
* // returns false
*/
function isPositiveInteger( value ) {
	return (
		isInteger( value ) &&
		value > 0.0
	);
}


// EXPORTS //

module.exports = isPositiveInteger;

},{"@stdlib/assert/is-integer":106}],149:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

var exec = RegExp.prototype.exec; // non-generic


// EXPORTS //

module.exports = exec;

},{}],150:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is a regular expression.
*
* @module @stdlib/assert/is-regexp
*
* @example
* var isRegExp = require( '@stdlib/assert/is-regexp' );
*
* var bool = isRegExp( /\.+/ );
* // returns true
*
* bool = isRegExp( {} );
* // returns false
*/

// MODULES //

var isRegExp = require( './main.js' );


// EXPORTS //

module.exports = isRegExp;

},{"./main.js":151}],151:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var hasToStringTag = require( '@stdlib/assert/has-tostringtag-support' );
var nativeClass = require( '@stdlib/utils/native-class' );
var test = require( './try2exec.js' );


// VARIABLES //

var FLG = hasToStringTag();


// MAIN //

/**
* Tests if a value is a regular expression.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a regular expression
*
* @example
* var bool = isRegExp( /\.+/ );
* // returns true
*
* @example
* var bool = isRegExp( {} );
* // returns false
*/
function isRegExp( value ) {
	if ( typeof value === 'object' ) {
		if ( value instanceof RegExp ) {
			return true;
		}
		if ( FLG ) {
			return test( value );
		}
		return ( nativeClass( value ) === '[object RegExp]' );
	}
	return false;
}


// EXPORTS //

module.exports = isRegExp;

},{"./try2exec.js":152,"@stdlib/assert/has-tostringtag-support":55,"@stdlib/utils/native-class":342}],152:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var exec = require( './exec.js' );


// MAIN //

/**
* Attempts to call a `RegExp` method.
*
* @private
* @param {*} value - value to test
* @returns {boolean} boolean indicating if able to call a `RegExp` method
*/
function test( value ) {
	try {
		exec.call( value );
		return true;
	} catch ( err ) { // eslint-disable-line no-unused-vars
		return false;
	}
}


// EXPORTS //

module.exports = test;

},{"./exec.js":149}],153:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is an array of strings.
*
* @module @stdlib/assert/is-string-array
*
* @example
* var isStringArray = require( '@stdlib/assert/is-string-array' );
*
* var bool = isStringArray( [ 'abc', 'def' ] );
* // returns true
*
* bool = isStringArray( [ 'abc', 123 ] );
* // returns false
*
* @example
* var isStringArray = require( '@stdlib/assert/is-string-array' ).primitives;
*
* var bool = isStringArray( [ 'abc', 'def' ] );
* // returns true
*
* bool = isStringArray( [ 'abc', new String( 'def' ) ] );
* // returns false
*
* @example
* var isStringArray = require( '@stdlib/assert/is-string-array' ).objects;
*
* var bool = isStringArray( [ new String( 'abc' ), new String( 'def' ) ] );
* // returns true
*
* bool = isStringArray( [ new String( 'abc' ), 'def' ] );
* // returns false
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var arrayfun = require( '@stdlib/assert/tools/array-function' );
var isString = require( '@stdlib/assert/is-string' );


// MAIN //

var isStringArray = arrayfun( isString );
setReadOnly( isStringArray, 'primitives', arrayfun( isString.isPrimitive ) );
setReadOnly( isStringArray, 'objects', arrayfun( isString.isObject ) );


// EXPORTS //

module.exports = isStringArray;

},{"@stdlib/assert/is-string":154,"@stdlib/assert/tools/array-function":169,"@stdlib/utils/define-nonenumerable-read-only-property":299}],154:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is a string.
*
* @module @stdlib/assert/is-string
*
* @example
* var isString = require( '@stdlib/assert/is-string' );
*
* var bool = isString( 'beep' );
* // returns true
*
* bool = isString( new String( 'beep' ) );
* // returns true
*
* bool = isString( 5 );
* // returns false
*
* @example
* var isString = require( '@stdlib/assert/is-string' ).isObject;
*
* var bool = isString( new String( 'beep' ) );
* // returns true
*
* bool = isString( 'beep' );
* // returns false
*
* @example
* var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
*
* var bool = isString( 'beep' );
* // returns true
*
* bool = isString( new String( 'beep' ) );
* // returns false
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var isString = require( './main.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isString, 'isPrimitive', isPrimitive );
setReadOnly( isString, 'isObject', isObject );


// EXPORTS //

module.exports = isString;

},{"./main.js":155,"./object.js":156,"./primitive.js":157,"@stdlib/utils/define-nonenumerable-read-only-property":299}],155:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is a string.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a string
*
* @example
* var bool = isString( new String( 'beep' ) );
* // returns true
*
* @example
* var bool = isString( 'beep' );
* // returns true
*/
function isString( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
}


// EXPORTS //

module.exports = isString;

},{"./object.js":156,"./primitive.js":157}],156:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var hasToStringTag = require( '@stdlib/assert/has-tostringtag-support' );
var nativeClass = require( '@stdlib/utils/native-class' );
var test = require( './try2valueof.js' );


// VARIABLES //

var FLG = hasToStringTag();


// MAIN //

/**
* Tests if a value is a string object.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a string object
*
* @example
* var bool = isString( new String( 'beep' ) );
* // returns true
*
* @example
* var bool = isString( 'beep' );
* // returns false
*/
function isString( value ) {
	if ( typeof value === 'object' ) {
		if ( value instanceof String ) {
			return true;
		}
		if ( FLG ) {
			return test( value );
		}
		return ( nativeClass( value ) === '[object String]' );
	}
	return false;
}


// EXPORTS //

module.exports = isString;

},{"./try2valueof.js":158,"@stdlib/assert/has-tostringtag-support":55,"@stdlib/utils/native-class":342}],157:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Tests if a value is a string primitive.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a string primitive
*
* @example
* var bool = isString( 'beep' );
* // returns true
*
* @example
* var bool = isString( new String( 'beep' ) );
* // returns false
*/
function isString( value ) {
	return ( typeof value === 'string' );
}


// EXPORTS //

module.exports = isString;

},{}],158:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var valueOf = require( './valueof.js' ); // eslint-disable-line stdlib/no-redeclare


// MAIN //

/**
* Attempts to extract a string value.
*
* @private
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a string can be extracted
*/
function test( value ) {
	try {
		valueOf.call( value );
		return true;
	} catch ( err ) { // eslint-disable-line no-unused-vars
		return false;
	}
}


// EXPORTS //

module.exports = test;

},{"./valueof.js":159}],159:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// eslint-disable-next-line stdlib/no-redeclare
var valueOf = String.prototype.valueOf; // non-generic


// EXPORTS //

module.exports = valueOf;

},{}],160:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is a Uint16Array.
*
* @module @stdlib/assert/is-uint16array
*
* @example
* var isUint16Array = require( '@stdlib/assert/is-uint16array' );
*
* var bool = isUint16Array( new Uint16Array( 10 ) );
* // returns true
*
* bool = isUint16Array( [] );
* // returns false
*/

// MODULES //

var isUint16Array = require( './main.js' );


// EXPORTS //

module.exports = isUint16Array;

},{"./main.js":161}],161:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var nativeClass = require( '@stdlib/utils/native-class' );


// VARIABLES //

var hasUint16Array = ( typeof Uint16Array === 'function' ); // eslint-disable-line stdlib/require-globals


// MAIN //

/**
* Tests if a value is a Uint16Array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a Uint16Array
*
* @example
* var bool = isUint16Array( new Uint16Array( 10 ) );
* // returns true
*
* @example
* var bool = isUint16Array( [] );
* // returns false
*/
function isUint16Array( value ) {
	return (
		( hasUint16Array && value instanceof Uint16Array ) || // eslint-disable-line stdlib/require-globals
		nativeClass( value ) === '[object Uint16Array]'
	);
}


// EXPORTS //

module.exports = isUint16Array;

},{"@stdlib/utils/native-class":342}],162:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is a Uint32Array.
*
* @module @stdlib/assert/is-uint32array
*
* @example
* var isUint32Array = require( '@stdlib/assert/is-uint32array' );
*
* var bool = isUint32Array( new Uint32Array( 10 ) );
* // returns true
*
* bool = isUint32Array( [] );
* // returns false
*/

// MODULES //

var isUint32Array = require( './main.js' );


// EXPORTS //

module.exports = isUint32Array;

},{"./main.js":163}],163:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var nativeClass = require( '@stdlib/utils/native-class' );


// VARIABLES //

var hasUint32Array = ( typeof Uint32Array === 'function' ); // eslint-disable-line stdlib/require-globals


// MAIN //

/**
* Tests if a value is a Uint32Array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a Uint32Array
*
* @example
* var bool = isUint32Array( new Uint32Array( 10 ) );
* // returns true
*
* @example
* var bool = isUint32Array( [] );
* // returns false
*/
function isUint32Array( value ) {
	return (
		( hasUint32Array && value instanceof Uint32Array ) || // eslint-disable-line stdlib/require-globals
		nativeClass( value ) === '[object Uint32Array]'
	);
}


// EXPORTS //

module.exports = isUint32Array;

},{"@stdlib/utils/native-class":342}],164:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is a Uint8Array.
*
* @module @stdlib/assert/is-uint8array
*
* @example
* var isUint8Array = require( '@stdlib/assert/is-uint8array' );
*
* var bool = isUint8Array( new Uint8Array( 10 ) );
* // returns true
*
* bool = isUint8Array( [] );
* // returns false
*/

// MODULES //

var isUint8Array = require( './main.js' );


// EXPORTS //

module.exports = isUint8Array;

},{"./main.js":165}],165:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var nativeClass = require( '@stdlib/utils/native-class' );


// VARIABLES //

var hasUint8Array = ( typeof Uint8Array === 'function' ); // eslint-disable-line stdlib/require-globals


// MAIN //

/**
* Tests if a value is a Uint8Array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a Uint8Array
*
* @example
* var bool = isUint8Array( new Uint8Array( 10 ) );
* // returns true
*
* @example
* var bool = isUint8Array( [] );
* // returns false
*/
function isUint8Array( value ) {
	return (
		( hasUint8Array && value instanceof Uint8Array ) || // eslint-disable-line stdlib/require-globals
		nativeClass( value ) === '[object Uint8Array]'
	);
}


// EXPORTS //

module.exports = isUint8Array;

},{"@stdlib/utils/native-class":342}],166:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is a Uint8ClampedArray.
*
* @module @stdlib/assert/is-uint8clampedarray
*
* @example
* var isUint8ClampedArray = require( '@stdlib/assert/is-uint8clampedarray' );
*
* var bool = isUint8ClampedArray( new Uint8ClampedArray( 10 ) );
* // returns true
*
* bool = isUint8ClampedArray( [] );
* // returns false
*/

// MODULES //

var isUint8ClampedArray = require( './main.js' );


// EXPORTS //

module.exports = isUint8ClampedArray;

},{"./main.js":167}],167:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var nativeClass = require( '@stdlib/utils/native-class' );


// VARIABLES //

var hasUint8ClampedArray = ( typeof Uint8ClampedArray === 'function' ); // eslint-disable-line stdlib/require-globals


// MAIN //

/**
* Tests if a value is a Uint8ClampedArray.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a Uint8ClampedArray
*
* @example
* var bool = isUint8ClampedArray( new Uint8ClampedArray( 10 ) );
* // returns true
*
* @example
* var bool = isUint8ClampedArray( [] );
* // returns false
*/
function isUint8ClampedArray( value ) {
	return (
		( hasUint8ClampedArray && value instanceof Uint8ClampedArray ) || // eslint-disable-line stdlib/require-globals
		nativeClass( value ) === '[object Uint8ClampedArray]'
	);
}


// EXPORTS //

module.exports = isUint8ClampedArray;

},{"@stdlib/utils/native-class":342}],168:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isArray = require( '@stdlib/assert/is-array' );


// MAIN //

/**
* Returns a function which tests if every element in an array passes a test condition.
*
* @param {Function} predicate - function to apply
* @throws {TypeError} must provide a function
* @returns {Function} an array function
*
* @example
* var isOdd = require( '@stdlib/assert/is-odd' );
*
* var arr1 = [ 1, 3, 5, 7 ];
* var arr2 = [ 3, 5, 8 ];
*
* var validate = arrayfcn( isOdd );
*
* var bool = validate( arr1 );
* // returns true
*
* bool = validate( arr2 );
* // returns false
*/
function arrayfcn( predicate ) {
	if ( typeof predicate !== 'function' ) {
		throw new TypeError( 'invalid argument. Must provide a function. Value: `' + predicate + '`.' );
	}
	return every;

	/**
	* Tests if every element in an array passes a test condition.
	*
	* @private
	* @param {*} value - value to test
	* @returns {boolean} boolean indicating whether a value is an array for which all elements pass a test condition
	*/
	function every( value ) {
		var len;
		var i;
		if ( !isArray( value ) ) {
			return false;
		}
		len = value.length;
		if ( len === 0 ) {
			return false;
		}
		for ( i = 0; i < len; i++ ) {
			if ( predicate( value[ i ] ) === false ) {
				return false;
			}
		}
		return true;
	}
}


// EXPORTS //

module.exports = arrayfcn;

},{"@stdlib/assert/is-array":75}],169:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Return a function which tests if every element in an array passes a test condition.
*
* @module @stdlib/assert/tools/array-function
*
* @example
* var isOdd = require( '@stdlib/assert/is-odd' );
* var arrayfcn = require( '@stdlib/assert/tools/array-function' );
*
* var arr1 = [ 1, 3, 5, 7 ];
* var arr2 = [ 3, 5, 8 ];
*
* var validate = arrayfcn( isOdd );
*
* var bool = validate( arr1 );
* // returns true
*
* bool = validate( arr2 );
* // returns false
*/

// MODULES //

var arrayfcn = require( './arrayfcn.js' );


// EXPORTS //

module.exports = arrayfcn;

},{"./arrayfcn.js":168}],170:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isArrayLike = require( '@stdlib/assert/is-array-like' );


// MAIN //

/**
* Returns a function which tests if every element in an array-like object passes a test condition.
*
* @param {Function} predicate - function to apply
* @throws {TypeError} must provide a function
* @returns {Function} an array-like object function
*
* @example
* var isOdd = require( '@stdlib/assert/is-odd' );
*
* var arr1 = [ 1, 3, 5, 7 ];
* var arr2 = [ 3, 5, 8 ];
*
* var validate = arraylikefcn( isOdd );
*
* var bool = validate( arr1 );
* // returns true
*
* bool = validate( arr2 );
* // returns false
*/
function arraylikefcn( predicate ) {
	if ( typeof predicate !== 'function' ) {
		throw new TypeError( 'invalid argument. Must provide a function. Value: `' + predicate + '`.' );
	}
	return every;

	/**
	* Tests if every element in an array-like object passes a test condition.
	*
	* @private
	* @param {*} value - value to test
	* @returns {boolean} boolean indicating whether a value is an array-like object for which all elements pass a test condition
	*/
	function every( value ) {
		var len;
		var i;
		if ( !isArrayLike( value ) ) {
			return false;
		}
		len = value.length;
		if ( len === 0 ) {
			return false;
		}
		for ( i = 0; i < len; i++ ) {
			if ( predicate( value[ i ] ) === false ) {
				return false;
			}
		}
		return true;
	}
}


// EXPORTS //

module.exports = arraylikefcn;

},{"@stdlib/assert/is-array-like":73}],171:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Return a function which tests if every element in an array-like object passes a test condition.
*
* @module @stdlib/assert/tools/array-like-function
*
* @example
* var isOdd = require( '@stdlib/assert/is-odd' );
* var arraylikefcn = require( '@stdlib/assert/tools/array-like-function' );
*
* var arr1 = [ 1, 3, 5, 7 ];
* var arr2 = [ 3, 5, 8 ];
*
* var validate = arraylikefcn( isOdd );
*
* var bool = validate( arr1 );
* // returns true
*
* bool = validate( arr2 );
* // returns false
*/

// MODULES //

var arraylikefcn = require( './arraylikefcn.js' );


// EXPORTS //

module.exports = arraylikefcn;

},{"./arraylikefcn.js":170}],172:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var TransformStream = require( '@stdlib/streams/node/transform' );
var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var isFunction = require( '@stdlib/assert/is-function' );
var createHarness = require( './harness' );
var harness = require( './get_harness.js' );


// VARIABLES //

var listeners = [];


// FUNCTIONS //

/**
* Callback invoked when a harness finishes running all benchmarks.
*
* @private
*/
function done() {
	var len;
	var f;
	var i;

	len = listeners.length;

	// Inform all the listeners that the harness has finished...
	for ( i = 0; i < len; i++ ) {
		f = listeners.shift();
		f();
	}
}

/**
* Creates a results stream.
*
* @private
* @param {Options} [options] - stream options
* @throws {Error} must provide valid stream options
* @returns {TransformStream} results stream
*/
function createStream( options ) {
	var stream;
	var bench;
	var opts;
	if ( arguments.length ) {
		opts = options;
	} else {
		opts = {};
	}
	// If we have already created a harness, calling this function simply creates another results stream...
	if ( harness.cached ) {
		bench = harness();
		return bench.createStream( opts );
	}
	stream = new TransformStream( opts );
	opts.stream = stream;

	// Create a harness which uses the created output stream:
	harness( opts, done );

	return stream;
}

/**
* Adds a listener for when a harness finishes running all benchmarks.
*
* @private
* @param {Callback} clbk - listener
* @throws {TypeError} must provide a function
* @throws {Error} must provide a listener only once
* @returns {void}
*/
function onFinish( clbk ) {
	var i;
	if ( !isFunction( clbk ) ) {
		throw new TypeError( 'invalid argument. Must provide a function. Value: `'+clbk+'`.' );
	}
	// Allow adding a listener only once...
	for ( i = 0; i < listeners.length; i++ ) {
		if ( clbk === listeners[ i ] ) {
			throw new Error( 'invalid argument. Attempted to add duplicate listener.' );
		}
	}
	listeners.push( clbk );
}


// MAIN //

/**
* Runs a benchmark.
*
* @param {string} name - benchmark name
* @param {Options} [options] - benchmark options
* @param {boolean} [options.skip=false] - boolean indicating whether to skip a benchmark
* @param {(PositiveInteger|null)} [options.iterations=null] - number of iterations
* @param {PositiveInteger} [options.repeats=3] - number of repeats
* @param {PositiveInteger} [options.timeout=300000] - number of milliseconds before a benchmark automatically fails
* @param {Function} [benchmark] - function containing benchmark code
* @throws {TypeError} first argument must be a string
* @throws {TypeError} options argument must be an object
* @throws {TypeError} must provide valid options
* @throws {TypeError} benchmark argument must a function
* @returns {Benchmark} benchmark harness
*
* @example
* bench( 'beep', function benchmark( b ) {
*     var x;
*     var i;
*     b.tic();
*     for ( i = 0; i < b.iterations; i++ ) {
*         x = Math.sin( Math.random() );
*         if ( x !== x ) {
*             b.ok( false, 'should not return NaN' );
*         }
*     }
*     b.toc();
*     if ( x !== x ) {
*         b.ok( false, 'should not return NaN' );
*     }
*     b.end();
* });
*/
function bench( name, options, benchmark ) {
	var h = harness( done );
	if ( arguments.length < 2 ) {
		h( name );
	} else if ( arguments.length === 2 ) {
		h( name, options );
	} else {
		h( name, options, benchmark );
	}
	return bench;
}

/**
* Creates a benchmark harness.
*
* @name createHarness
* @memberof bench
* @type {Function}
* @param {Options} [options] - harness options
* @param {Callback} [clbk] - callback to invoke when a harness finishes running all benchmarks
* @throws {TypeError} options argument must be an object
* @throws {TypeError} must provide valid options
* @throws {TypeError} callback argument must be a function
* @returns {Function} benchmark harness
*/
setReadOnly( bench, 'createHarness', createHarness );

/**
* Creates a results stream.
*
* @name createStream
* @memberof bench
* @type {Function}
* @param {Options} [options] - stream options
* @throws {Error} must provide valid stream options
* @returns {TransformStream} results stream
*/
setReadOnly( bench, 'createStream', createStream );

/**
* Adds a listener for when a harness finishes running all benchmarks.
*
* @name onFinish
* @memberof bench
* @type {Function}
* @param {Callback} clbk - listener
* @throws {TypeError} must provide a function
* @throws {Error} must provide a listener only once
* @returns {void}
*/
setReadOnly( bench, 'onFinish', onFinish );


// EXPORTS //

module.exports = bench;

},{"./get_harness.js":194,"./harness":195,"@stdlib/assert/is-function":98,"@stdlib/streams/node/transform":275,"@stdlib/utils/define-nonenumerable-read-only-property":299}],173:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var hasOwnProp = require( '@stdlib/assert/has-own-property' );


// MAIN //

/**
* Generates an assertion.
*
* @private
* @param {boolean} ok - assertion outcome
* @param {Options} opts - options
*/
function assert( ok, opts ) {
	/* eslint-disable no-invalid-this, no-unused-vars */ // TODO: remove no-unused-vars once `err` is used
	var result;
	var err;

	result = {
		'id': this._count,
		'ok': ok,
		'skip': opts.skip,
		'todo': opts.todo,
		'name': opts.message || '(unnamed assert)',
		'operator': opts.operator
	};
	if ( hasOwnProp( opts, 'actual' ) ) {
		result.actual = opts.actual;
	}
	if ( hasOwnProp( opts, 'expected' ) ) {
		result.expected = opts.expected;
	}
	if ( !ok ) {
		result.error = opts.error || new Error( this.name );
		err = new Error( 'exception' );

		// TODO: generate an exception in order to locate the calling function (https://github.com/substack/tape/blob/master/lib/test.js#L215)
	}
	this._count += 1;
	this.emit( 'result', result );
}


// EXPORTS //

module.exports = assert;

},{"@stdlib/assert/has-own-property":49}],174:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// EXPORTS //

module.exports = clearTimeout;

},{}],175:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var trim = require( '@stdlib/string/trim' );
var replace = require( '@stdlib/string/replace' );
var EOL = require( '@stdlib/regexp/eol' );


// VARIABLES //

var RE_COMMENT = /^#\s*/;


// MAIN //

/**
* Writes a comment.
*
* @private
* @param {string} msg - comment message
*/
function comment( msg ) {
	/* eslint-disable no-invalid-this */
	var lines;
	var i;
	msg = trim( msg );
	lines = msg.split( EOL );
	for ( i = 0; i < lines.length; i++ ) {
		msg = trim( lines[ i ] );
		msg = replace( msg, RE_COMMENT, '' );
		this.emit( 'result', msg );
	}
}


// EXPORTS //

module.exports = comment;

},{"@stdlib/regexp/eol":267,"@stdlib/string/replace":281,"@stdlib/string/trim":283}],176:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

/**
* Asserts that `actual` is deeply equal to `expected`.
*
* @private
* @param {*} actual - actual value
* @param {*} expected - expected value
* @param {string} [msg] message
*/
function deepEqual( actual, expected, msg ) {
	/* eslint-disable no-invalid-this */
	this.comment( 'actual: '+actual+'. expected: '+expected+'. msg: '+msg+'.' );

	// TODO: implement
}


// EXPORTS //

module.exports = deepEqual;

},{}],177:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var nextTick = require( './../utils/next_tick.js' );


// MAIN //

/**
* Ends a benchmark.
*
* @private
*/
function end() {
	/* eslint-disable no-invalid-this */
	var self = this;
	if ( this._ended ) {
		this.fail( '.end() called more than once' );
	} else {
		// Prevents releasing the zalgo when running synchronous benchmarks.
		nextTick( onTick );
	}
	this._ended = true;
	this._running = false;

	/**
	* Callback invoked upon a subsequent tick of the event loop.
	*
	* @private
	*/
	function onTick() {
		self.emit( 'end' );
	}
}


// EXPORTS //

module.exports = end;

},{"./../utils/next_tick.js":214}],178:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

/**
* Returns a `boolean` indicating if a benchmark has ended.
*
* @private
* @returns {boolean} boolean indicating if a benchmark has ended
*/
function ended() {
	/* eslint-disable no-invalid-this */
	return this._ended;
}


// EXPORTS //

module.exports = ended;

},{}],179:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

/**
* Asserts that `actual` is strictly equal to `expected`.
*
* @private
* @param {*} actual - actual value
* @param {*} expected - expected value
* @param {string} [msg] - message
*/
function equal( actual, expected, msg ) {
	/* eslint-disable no-invalid-this */
	this._assert( actual === expected, {
		'message': msg || 'should be equal',
		'operator': 'equal',
		'expected': expected,
		'actual': actual
	});
}


// EXPORTS //

module.exports = equal;

},{}],180:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

/**
* Forcefully ends a benchmark.
*
* @private
* @returns {void}
*/
function exit() {
	/* eslint-disable no-invalid-this */
	if ( this._exited ) {
		// If we have already "exited", do not create more failing assertions when one should suffice...
		return;
	}
	// Only "exit" when a benchmark has either not yet been run or is currently running. If a benchmark has already ended, no need to generate a failing assertion.
	if ( !this._ended ) {
		this._exited = true;
		this.fail( 'benchmark exited without ending' );

		// Allow running benchmarks to call `end` on their own...
		if ( !this._running ) {
			this.end();
		}
	}
}


// EXPORTS //

module.exports = exit;

},{}],181:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

/**
* Generates a failing assertion.
*
* @private
* @param {string} msg - message
*/
function fail( msg ) {
	/* eslint-disable no-invalid-this */
	this._assert( false, {
		'message': msg,
		'operator': 'fail'
	});
}


// EXPORTS //

module.exports = fail;

},{}],182:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var EventEmitter = require( 'events' ).EventEmitter;
var inherit = require( '@stdlib/utils/inherit' );
var defineProperty = require( '@stdlib/utils/define-property' );
var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var tic = require( '@stdlib/time/tic' );
var toc = require( '@stdlib/time/toc' );


// MAIN //

/**
* Benchmark constructor.
*
* @constructor
* @param {string} name - benchmark name
* @param {Options} opts - benchmark options
* @param {boolean} opts.skip - boolean indicating whether to skip a benchmark
* @param {PositiveInteger} opts.iterations - number of iterations
* @param {PositiveInteger} opts.timeout - number of milliseconds before a benchmark automatically fails
* @param {Function} [benchmark] - function containing benchmark code
* @returns {Benchmark} Benchmark instance
*
* @example
* var bench = new Benchmark( 'beep', function benchmark( b ) {
*     var x;
*     var i;
*     b.comment( 'Running benchmarks...' );
*     b.tic();
*     for ( i = 0; i < b.iterations; i++ ) {
*         x = Math.sin( Math.random() );
*         if ( x !== x ) {
*             b.ok( false, 'should not return NaN' );
*         }
*     }
*     b.toc();
*     if ( x !== x ) {
*         b.ok( false, 'should not return NaN' );
*     }
*     b.comment( 'Finished running benchmarks.' );
*     b.end();
* });
*/
function Benchmark( name, opts, benchmark ) {
	var hasTicked;
	var hasTocked;
	var self;
	var time;
	if ( !( this instanceof Benchmark ) ) {
		return new Benchmark( name, opts, benchmark );
	}
	self = this;
	hasTicked = false;
	hasTocked = false;

	EventEmitter.call( this );

	// Private properties:
	setReadOnly( this, '_benchmark', benchmark );
	setReadOnly( this, '_skip', opts.skip );

	defineProperty( this, '_ended', {
		'configurable': false,
		'enumerable': false,
		'writable': true,
		'value': false
	});

	defineProperty( this, '_running', {
		'configurable': false,
		'enumerable': false,
		'writable': true,
		'value': false
	});

	defineProperty( this, '_exited', {
		'configurable': false,
		'enumerable': false,
		'writable': true,
		'value': false
	});

	defineProperty( this, '_count', {
		'configurable': false,
		'enumerable': false,
		'writable': true,
		'value': 0
	});

	// Read-only:
	setReadOnly( this, 'name', name );
	setReadOnly( this, 'tic', start );
	setReadOnly( this, 'toc', stop );
	setReadOnly( this, 'iterations', opts.iterations );
	setReadOnly( this, 'timeout', opts.timeout );

	return this;

	/**
	* Starts a benchmark timer.
	*
	* ## Notes
	*
	* -   Using a scoped variable prevents nefarious mutation by bad actors hoping to manipulate benchmark results.
	* -   The one attack vector which remains is manipulation of the `require` cache for `tic` and `toc`.
	* -   One way to combat cache manipulation is by comparing the checksum of `Function#toString()` against known values.
	*
	* @private
	*/
	function start() {
		if ( hasTicked ) {
			self.fail( '.tic() called more than once' );
		} else {
			self.emit( 'tic' );
			hasTicked = true;
			time = tic();
		}
	}

	/**
	* Stops a benchmark timer.
	*
	* @private
	* @returns {void}
	*/
	function stop() {
		var elapsed;
		var secs;
		var rate;
		var out;

		if ( hasTicked === false ) {
			return self.fail( '.toc() called before .tic()' );
		}
		elapsed = toc( time );
		if ( hasTocked ) {
			return self.fail( '.toc() called more than once' );
		}
		hasTocked = true;
		self.emit( 'toc' );

		secs = elapsed[ 0 ] + ( elapsed[ 1 ]/1e9 );
		rate = self.iterations / secs;

		out = {
			'ok': true,
			'operator': 'result',
			'iterations': self.iterations,
			'elapsed': secs,
			'rate': rate
		};
		self.emit( 'result', out );
	}
}

/*
* Inherit from the `EventEmitter` prototype.
*/
inherit( Benchmark, EventEmitter );

/**
* Runs a benchmark.
*
* @private
* @name run
* @memberof Benchmark.prototype
* @type {Function}
*/
setReadOnly( Benchmark.prototype, 'run', require( './run.js' ) );

/**
* Forcefully ends a benchmark.
*
* @private
* @name exit
* @memberof Benchmark.prototype
* @type {Function}
*/
setReadOnly( Benchmark.prototype, 'exit', require( './exit.js' ) );

/**
* Returns a `boolean` indicating if a benchmark has ended.
*
* @private
* @name ended
* @memberof Benchmark.prototype
* @type {Function}
* @returns {boolean} boolean indicating if a benchmark has ended
*/
setReadOnly( Benchmark.prototype, 'ended', require( './ended.js' ) );

/**
* Generates an assertion.
*
* @private
* @name _assert
* @memberof Benchmark.prototype
* @type {Function}
* @param {boolean} ok - assertion outcome
* @param {Options} opts - options
*/
setReadOnly( Benchmark.prototype, '_assert', require( './assert.js' ) );

/**
* Writes a comment.
*
* @name comment
* @memberof Benchmark.prototype
* @type {Function}
* @param {string} msg - comment message
*/
setReadOnly( Benchmark.prototype, 'comment', require( './comment.js' ) );

/**
* Generates an assertion which will be skipped.
*
* @name skip
* @memberof Benchmark.prototype
* @type {Function}
* @param {*} value - value
* @param {string} msg - message
*/
setReadOnly( Benchmark.prototype, 'skip', require( './skip.js' ) );

/**
* Generates an assertion which should be implemented.
*
* @name todo
* @memberof Benchmark.prototype
* @type {Function}
* @param {*} value - value
* @param {string} msg - message
*/
setReadOnly( Benchmark.prototype, 'todo', require( './todo.js' ) );

/**
* Generates a failing assertion.
*
* @name fail
* @memberof Benchmark.prototype
* @type {Function}
* @param {string} msg - message
*/
setReadOnly( Benchmark.prototype, 'fail', require( './fail.js' ) );

/**
* Generates a passing assertion.
*
* @name pass
* @memberof Benchmark.prototype
* @type {Function}
* @param {string} msg - message
*/
setReadOnly( Benchmark.prototype, 'pass', require( './pass.js' ) );

/**
* Asserts that a `value` is truthy.
*
* @name ok
* @memberof Benchmark.prototype
* @type {Function}
* @param {*} value - value
* @param {string} [msg] - message
*/
setReadOnly( Benchmark.prototype, 'ok', require( './ok.js' ) );

/**
* Asserts that a `value` is falsy.
*
* @name notOk
* @memberof Benchmark.prototype
* @type {Function}
* @param {*} value - value
* @param {string} [msg] - message
*/
setReadOnly( Benchmark.prototype, 'notOk', require( './not_ok.js' ) );

/**
* Asserts that `actual` is strictly equal to `expected`.
*
* @name equal
* @memberof Benchmark.prototype
* @type {Function}
* @param {*} actual - actual value
* @param {*} expected - expected value
* @param {string} [msg] - message
*/
setReadOnly( Benchmark.prototype, 'equal', require( './equal.js' ) );

/**
* Asserts that `actual` is not strictly equal to `expected`.
*
* @name notEqual
* @memberof Benchmark.prototype
* @type {Function}
* @param {*} actual - actual value
* @param {*} expected - expected value
* @param {string} [msg] - message
*/
setReadOnly( Benchmark.prototype, 'notEqual', require( './not_equal.js' ) );

/**
* Asserts that `actual` is deeply equal to `expected`.
*
* @name deepEqual
* @memberof Benchmark.prototype
* @type {Function}
* @param {*} actual - actual value
* @param {*} expected - expected value
* @param {string} [msg] message
*/
setReadOnly( Benchmark.prototype, 'deepEqual', require( './deep_equal.js' ) );

/**
* Asserts that `actual` is not deeply equal to `expected`.
*
* @name notDeepEqual
* @memberof Benchmark.prototype
* @type {Function}
* @param {*} actual - actual value
* @param {*} expected - expected value
* @param {string} [msg] message
*/
setReadOnly( Benchmark.prototype, 'notDeepEqual', require( './not_deep_equal.js' ) );

/**
* Ends a benchmark.
*
* @name end
* @memberof Benchmark.prototype
* @type {Function}
*/
setReadOnly( Benchmark.prototype, 'end', require( './end.js' ) );


// EXPORTS //

module.exports = Benchmark;

},{"./assert.js":173,"./comment.js":175,"./deep_equal.js":176,"./end.js":177,"./ended.js":178,"./equal.js":179,"./exit.js":180,"./fail.js":181,"./not_deep_equal.js":183,"./not_equal.js":184,"./not_ok.js":185,"./ok.js":186,"./pass.js":187,"./run.js":188,"./skip.js":190,"./todo.js":191,"@stdlib/time/tic":285,"@stdlib/time/toc":289,"@stdlib/utils/define-nonenumerable-read-only-property":299,"@stdlib/utils/define-property":302,"@stdlib/utils/inherit":321,"events":376}],183:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

/**
* Asserts that `actual` is not deeply equal to `expected`.
*
* @private
* @param {*} actual - actual value
* @param {*} expected - expected value
* @param {string} [msg] message
*/
function notDeepEqual( actual, expected, msg ) {
	/* eslint-disable no-invalid-this */
	this.comment( 'actual: '+actual+'. expected: '+expected+'. msg: '+msg+'.' );

	// TODO: implement
}


// EXPORTS //

module.exports = notDeepEqual;

},{}],184:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

/**
* Asserts that `actual` is not strictly equal to `expected`.
*
* @private
* @param {*} actual - actual value
* @param {*} expected - expected value
* @param {string} [msg] - message
*/
function notEqual( actual, expected, msg ) {
	/* eslint-disable no-invalid-this */
	this._assert( actual !== expected, {
		'message': msg || 'should not be equal',
		'operator': 'notEqual',
		'expected': expected,
		'actual': actual
	});
}


// EXPORTS //

module.exports = notEqual;

},{}],185:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

/**
* Asserts that a `value` is falsy.
*
* @private
* @param {*} value - value
* @param {string} [msg] - message
*/
function notOk( value, msg ) {
	/* eslint-disable no-invalid-this */
	this._assert( !value, {
		'message': msg || 'should be falsy',
		'operator': 'notOk',
		'expected': false,
		'actual': value
	});
}


// EXPORTS //

module.exports = notOk;

},{}],186:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

/**
* Asserts that a `value` is truthy.
*
* @private
* @param {*} value - value
* @param {string} [msg] - message
*/
function ok( value, msg ) {
	/* eslint-disable no-invalid-this */
	this._assert( !!value, {
		'message': msg || 'should be truthy',
		'operator': 'ok',
		'expected': true,
		'actual': value
	});
}


// EXPORTS //

module.exports = ok;

},{}],187:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

/**
* Generates a passing assertion.
*
* @private
* @param {string} msg - message
*/
function pass( msg ) {
	/* eslint-disable no-invalid-this */
	this._assert( true, {
		'message': msg,
		'operator': 'pass'
	});
}


// EXPORTS //

module.exports = pass;

},{}],188:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var timeout = require( './set_timeout.js' );
var clear = require( './clear_timeout.js' );


// MAIN //

/**
* Runs a benchmark.
*
* @private
* @returns {void}
*/
function run() {
	/* eslint-disable no-invalid-this */
	var self;
	var id;
	if ( this._skip ) {
		this.comment( 'SKIP '+this.name );
		return this.end();
	}
	if ( !this._benchmark ) {
		this.comment( 'TODO '+this.name );
		return this.end();
	}
	self = this;
	this._running = true;

	id = timeout( onTimeout, this.timeout );
	this.once( 'end', endTimeout );

	this.emit( 'prerun' );
	this._benchmark( this );
	this.emit( 'run' );

	/**
	* Callback invoked once a timeout ends.
	*
	* @private
	*/
	function onTimeout() {
		self.fail( 'benchmark timed out after '+self.timeout+'ms' );
	}

	/**
	* Clears a timeout.
	*
	* @private
	*/
	function endTimeout() {
		clear( id );
	}
}


// EXPORTS //

module.exports = run;

},{"./clear_timeout.js":174,"./set_timeout.js":189}],189:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// EXPORTS //

module.exports = setTimeout;

},{}],190:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

/**
* Generates an assertion which will be skipped.
*
* @private
* @param {*} value - value
* @param {string} msg - message
*/
function skip( value, msg ) {
	/* eslint-disable no-invalid-this */
	this._assert( true, {
		'message': msg,
		'operator': 'skip',
		'skip': true
	});
}


// EXPORTS //

module.exports = skip;

},{}],191:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

/**
* Generates an assertion which should be implemented.
*
* @private
* @param {*} value - value
* @param {string} msg - message
*/
function todo( value, msg ) {
	/* eslint-disable no-invalid-this */
	this._assert( !!value, {
		'message': msg,
		'operator': 'todo',
		'todo': true
	});
}


// EXPORTS //

module.exports = todo;

},{}],192:[function(require,module,exports){
module.exports={
	"skip": false,
	"iterations": null,
	"repeats": 3,
	"timeout": 300000
}

},{}],193:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isFunction = require( '@stdlib/assert/is-function' );
var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;
var isObject = require( '@stdlib/assert/is-plain-object' );
var isNodeWritableStreamLike = require( '@stdlib/assert/is-node-writable-stream-like' );
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var pick = require( '@stdlib/utils/pick' );
var omit = require( '@stdlib/utils/omit' );
var noop = require( '@stdlib/utils/noop' );
var createHarness = require( './harness' );
var logStream = require( './log' );
var canEmitExit = require( './utils/can_emit_exit.js' );
var proc = require( './utils/process.js' );


// MAIN //

/**
* Creates a benchmark harness which supports closing when a process exits.
*
* @private
* @param {Options} [options] - function options
* @param {boolean} [options.autoclose] - boolean indicating whether to automatically close a harness after a harness finishes running all benchmarks
* @param {Stream} [options.stream] - output writable stream
* @param {Callback} [clbk] - callback to invoke when a harness finishes running all benchmarks
* @throws {TypeError} options argument must be an object
* @throws {TypeError} must provide valid options
* @throws {TypeError} callback argument must be a function
* @returns {Function} benchmark harness
*
* @example
* var bench = createExitHarness( onFinish );
*
* function onFinish() {
*     bench.close();
* }
*
* bench( 'beep', function benchmark( b ) {
*     var x;
*     var i;
*     b.tic();
*     for ( i = 0; i < b.iterations; i++ ) {
*         x = Math.sin( Math.random() );
*         if ( x !== x ) {
*             b.ok( false, 'should not return NaN' );
*         }
*     }
*     b.toc();
*     if ( x !== x ) {
*         b.ok( false, 'should not return NaN' );
*     }
*     b.end();
* });
*
* @example
* var stream = createExitHarness().createStream();
* stream.pipe( process.stdout );
*/
function createExitHarness() {
	var exitCode;
	var pipeline;
	var harness;
	var options;
	var stream;
	var topts;
	var opts;
	var clbk;

	if ( arguments.length === 0 ) {
		options = {};
		clbk = noop;
	} else if ( arguments.length === 1 ) {
		if ( isFunction( arguments[ 0 ] ) ) {
			options = {};
			clbk = arguments[ 0 ];
		} else if ( isObject( arguments[ 0 ] ) ) {
			options = arguments[ 0 ];
			clbk = noop;
		} else {
			throw new TypeError( 'invalid argument. Must provide either an options object or a callback function. Value: `'+arguments[ 0 ]+'`.' );
		}
	} else {
		options = arguments[ 0 ];
		if ( !isObject( options ) ) {
			throw new TypeError( 'invalid argument. First argument must be an object. Value: `'+options+'`.' );
		}
		clbk = arguments[ 1 ];
		if ( !isFunction( clbk ) ) {
			throw new TypeError( 'invalid argument. Second argument must be a function. Value: `'+clbk+'`.' );
		}
	}
	opts = {};
	if ( hasOwnProp( options, 'autoclose' ) ) {
		opts.autoclose = options.autoclose;
		if ( !isBoolean( opts.autoclose ) ) {
			throw new TypeError( 'invalid option. `autoclose` option must be a boolean primitive. Option: `'+opts.autoclose+'`.' );
		}
	}
	if ( hasOwnProp( options, 'stream' ) ) {
		opts.stream = options.stream;
		if ( !isNodeWritableStreamLike( opts.stream ) ) {
			throw new TypeError( 'invalid option. `stream` option must be a writable stream. Option: `'+opts.stream+'`.' );
		}
	}
	exitCode = 0;

	// Create a new harness:
	topts = pick( opts, [ 'autoclose' ] );
	harness = createHarness( topts, done );

	// Create a results stream:
	topts = omit( options, [ 'autoclose', 'stream' ] );
	stream = harness.createStream( topts );

	// Pipe results to an output stream:
	pipeline = stream.pipe( opts.stream || logStream() );

	// If a process can emit an 'exit' event, capture errors in order to set the exit code...
	if ( canEmitExit ) {
		pipeline.on( 'error', onError );
		proc.on( 'exit', onExit );
	}
	return harness;

	/**
	* Callback invoked when a harness finishes.
	*
	* @private
	* @returns {void}
	*/
	function done() {
		return clbk();
	}

	/**
	* Callback invoked upon a stream `error` event.
	*
	* @private
	* @param {Error} error - error object
	*/
	function onError() {
		exitCode = 1;
	}

	/**
	* Callback invoked upon an `exit` event.
	*
	* @private
	* @param {integer} code - exit code
	*/
	function onExit( code ) {
		if ( code !== 0 ) {
			// Allow the process to exit...
			return;
		}
		harness.close();
		proc.exit( exitCode || harness.exitCode );
	}
}


// EXPORTS //

module.exports = createExitHarness;

},{"./harness":195,"./log":201,"./utils/can_emit_exit.js":212,"./utils/process.js":215,"@stdlib/assert/has-own-property":49,"@stdlib/assert/is-boolean":77,"@stdlib/assert/is-function":98,"@stdlib/assert/is-node-writable-stream-like":120,"@stdlib/assert/is-plain-object":143,"@stdlib/utils/noop":347,"@stdlib/utils/omit":349,"@stdlib/utils/pick":351}],194:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var canEmitExit = require( './utils/can_emit_exit.js' );
var createExitHarness = require( './exit_harness.js' );


// VARIABLES //

var harness;


// MAIN //

/**
* Returns a benchmark harness. If a harness has already been created, returns the cached harness.
*
* @private
* @param {Options} [options] - harness options
* @param {Callback} [clbk] - callback to invoke when a harness finishes running all benchmarks
* @returns {Function} benchmark harness
*/
function getHarness( options, clbk ) {
	var opts;
	var cb;
	if ( harness ) {
		return harness;
	}
	if ( arguments.length > 1 ) {
		opts = options;
		cb = clbk;
	} else {
		opts = {};
		cb = options;
	}
	opts.autoclose = !canEmitExit;
	harness = createExitHarness( opts, cb );

	// Update state:
	getHarness.cached = true;

	return harness;
}


// EXPORTS //

module.exports = getHarness;

},{"./exit_harness.js":193,"./utils/can_emit_exit.js":212}],195:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var setReadOnlyAccessor = require( '@stdlib/utils/define-nonenumerable-read-only-accessor' );
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var isFunction = require( '@stdlib/assert/is-function' );
var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;
var isObject = require( '@stdlib/assert/is-plain-object' );
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var copy = require( '@stdlib/utils/copy' );
var Benchmark = require( './../benchmark-class' );
var Runner = require( './../runner' );
var nextTick = require( './../utils/next_tick.js' );
var DEFAULTS = require( './../defaults.json' );
var validate = require( './validate.js' );
var init = require( './init.js' );


// MAIN //

/**
* Creates a benchmark harness.
*
* @param {Options} [options] - function options
* @param {boolean} [options.autoclose] - boolean indicating whether to automatically close a harness after a harness finishes running all benchmarks
* @param {Callback} [clbk] - callback to invoke when a harness finishes running all benchmarks
* @throws {TypeError} options argument must be an object
* @throws {TypeError} must provide valid options
* @throws {TypeError} callback argument must be a function
* @returns {Function} benchmark harness
*
* @example
* var bench = createHarness( onFinish );
*
* function onFinish() {
*     bench.close();
*     console.log( 'Exit code: %d', bench.exitCode );
* }
*
* bench( 'beep', function benchmark( b ) {
*     var x;
*     var i;
*     b.tic();
*     for ( i = 0; i < b.iterations; i++ ) {
*         x = Math.sin( Math.random() );
*         if ( x !== x ) {
*             b.ok( false, 'should not return NaN' );
*         }
*     }
*     b.toc();
*     if ( x !== x ) {
*         b.ok( false, 'should not return NaN' );
*     }
*     b.end();
* });
*
* @example
* var stream = createHarness().createStream();
* stream.pipe( process.stdout );
*/
function createHarness( options, clbk ) {
	var exitCode;
	var runner;
	var queue;
	var opts;
	var cb;

	opts = {};
	if ( arguments.length === 1 ) {
		if ( isFunction( options ) ) {
			cb = options;
		} else if ( isObject( options ) ) {
			opts = options;
		} else {
			throw new TypeError( 'invalid argument. Must provide either an options object or a callback function. Value: `'+options+'`.' );
		}
	} else if ( arguments.length > 1 ) {
		if ( !isObject( options ) ) {
			throw new TypeError( 'invalid argument. First argument must be an object. Value: `'+options+'`.' );
		}
		if ( hasOwnProp( options, 'autoclose' ) ) {
			opts.autoclose = options.autoclose;
			if ( !isBoolean( opts.autoclose ) ) {
				throw new TypeError( 'invalid option. `autoclose` option must be a boolean primitive. Option: `'+opts.autoclose+'`.' );
			}
		}
		cb = clbk;
		if ( !isFunction( cb ) ) {
			throw new TypeError( 'invalid argument. Second argument must be a function. Value: `'+cb+'`.' );
		}
	}
	runner = new Runner();
	if ( opts.autoclose ) {
		runner.once( 'done', close );
	}
	if ( cb ) {
		runner.once( 'done', cb );
	}
	exitCode = 0;
	queue = [];

	/**
	* Benchmark harness.
	*
	* @private
	* @param {string} name - benchmark name
	* @param {Options} [options] - benchmark options
	* @param {boolean} [options.skip=false] - boolean indicating whether to skip a benchmark
	* @param {(PositiveInteger|null)} [options.iterations=null] - number of iterations
	* @param {PositiveInteger} [options.repeats=3] - number of repeats
	* @param {PositiveInteger} [options.timeout=300000] - number of milliseconds before a benchmark automatically fails
	* @param {Function} [benchmark] - function containing benchmark code
	* @throws {TypeError} first argument must be a string
	* @throws {TypeError} options argument must be an object
	* @throws {TypeError} must provide valid options
	* @throws {TypeError} benchmark argument must a function
	* @throws {Error} benchmark error
	* @returns {Function} benchmark harness
	*/
	function harness( name, options, benchmark ) {
		var opts;
		var err;
		var b;
		if ( !isString( name ) ) {
			throw new TypeError( 'invalid argument. First argument must be a string. Value: `'+name+'`.' );
		}
		opts = copy( DEFAULTS );
		if ( arguments.length === 2 ) {
			if ( isFunction( options ) ) {
				b = options;
			} else {
				err = validate( opts, options );
				if ( err ) {
					throw err;
				}
			}
		} else if ( arguments.length > 2 ) {
			err = validate( opts, options );
			if ( err ) {
				throw err;
			}
			b = benchmark;
			if ( !isFunction( b ) ) {
				throw new TypeError( 'invalid argument. Third argument must be a function. Value: `'+b+'`.' );
			}
		}
		// Add the benchmark to the initialization queue:
		queue.push( [ name, opts, b ] );

		// Perform initialization on the next turn of the event loop (note: this allows all benchmarks to be "registered" within the same turn of the loop; otherwise, we run the risk of registration-execution race conditions (i.e., a benchmark registers and executes before other benchmarks can register, depleting the benchmark queue and leading the harness to close)):
		if ( queue.length === 1 ) {
			nextTick( initialize );
		}
		return harness;
	}

	/**
	* Initializes each benchmark.
	*
	* @private
	* @returns {void}
	*/
	function initialize() {
		var idx = -1;
		return next();

		/**
		* Initialize the next benchmark.
		*
		* @private
		* @returns {void}
		*/
		function next() {
			var args;

			idx += 1;

			// If all benchmarks have been initialized, begin running the benchmarks:
			if ( idx === queue.length ) {
				queue.length = 0;
				return runner.run();
			}
			// Initialize the next benchmark:
			args = queue[ idx ];
			init( args[ 0 ], args[ 1 ], args[ 2 ], onInit );
		}

		/**
		* Callback invoked after performing initialization tasks.
		*
		* @private
		* @param {string} name - benchmark name
		* @param {Options} opts - benchmark options
		* @param {(Function|undefined)} benchmark - function containing benchmark code
		* @returns {void}
		*/
		function onInit( name, opts, benchmark ) {
			var b;
			var i;

			// Create a `Benchmark` instance for each repeat to ensure each benchmark has its own state...
			for ( i = 0; i < opts.repeats; i++ ) {
				b = new Benchmark( name, opts, benchmark );
				b.on( 'result', onResult );
				runner.push( b );
			}
			return next();
		}
	}

	/**
	* Callback invoked upon a `result` event.
	*
	* @private
	* @param {(string|Object)} result - result
	*/
	function onResult( result ) {
		if (
			!isString( result ) &&
			!result.ok &&
			!result.todo
		) {
			exitCode = 1;
		}
	}

	/**
	* Returns a results stream.
	*
	* @private
	* @param {Object} [options] - options
	* @returns {TransformStream} transform stream
	*/
	function createStream( options ) {
		if ( arguments.length ) {
			return runner.createStream( options );
		}
		return runner.createStream();
	}

	/**
	* Closes a benchmark harness.
	*
	* @private
	*/
	function close() {
		runner.close();
	}

	/**
	* Forcefully exits a benchmark harness.
	*
	* @private
	*/
	function exit() {
		runner.exit();
	}

	/**
	* Returns the harness exit code.
	*
	* @private
	* @returns {NonNegativeInteger} exit code
	*/
	function getExitCode() {
		return exitCode;
	}

	setReadOnly( harness, 'createStream', createStream );
	setReadOnly( harness, 'close', close );
	setReadOnly( harness, 'exit', exit );
	setReadOnlyAccessor( harness, 'exitCode', getExitCode );

	return harness;
}


// EXPORTS //

module.exports = createHarness;

},{"./../benchmark-class":182,"./../defaults.json":192,"./../runner":209,"./../utils/next_tick.js":214,"./init.js":196,"./validate.js":199,"@stdlib/assert/has-own-property":49,"@stdlib/assert/is-boolean":77,"@stdlib/assert/is-function":98,"@stdlib/assert/is-plain-object":143,"@stdlib/assert/is-string":154,"@stdlib/utils/copy":295,"@stdlib/utils/define-nonenumerable-read-only-accessor":297,"@stdlib/utils/define-nonenumerable-read-only-property":299}],196:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var pretest = require( './pretest.js' );
var iterations = require( './iterations.js' );


// MAIN //

/**
* Performs benchmark initialization tasks.
*
* @private
* @param {string} name - benchmark name
* @param {Options} opts - benchmark options
* @param {(Function|undefined)} benchmark - function containing benchmark code
* @param {Callback} clbk - callback to invoke after completing initialization tasks
* @returns {void}
*/
function init( name, opts, benchmark, clbk ) {
	// If no benchmark function, then the benchmark is considered a "todo", so no need to repeat multiple times...
	if ( !benchmark ) {
		opts.repeats = 1;
		return clbk( name, opts, benchmark );
	}
	// If the `skip` option to `true`, no need to initialize or repeat multiple times as will not be running the benchmark:
	if ( opts.skip ) {
		opts.repeats = 1;
		return clbk( name, opts, benchmark );
	}
	// Perform pretests:
	pretest( name, opts, benchmark, onPreTest );

	/**
	* Callback invoked upon completing pretests.
	*
	* @private
	* @param {Error} [error] - error object
	* @returns {void}
	*/
	function onPreTest( error ) {
		// If the pretests failed, don't run the benchmark multiple times...
		if ( error ) {
			opts.repeats = 1;
			opts.iterations = 1;
			return clbk( name, opts, benchmark );
		}
		// If a user specified an iteration number, we can begin running benchmarks...
		if ( opts.iterations ) {
			return clbk( name, opts, benchmark );
		}
		// Determine iteration number:
		iterations( name, opts, benchmark, onIterations );
	}

	/**
	* Callback invoked upon determining an iteration number.
	*
	* @private
	* @param {(Error|null)} error - error object
	* @param {PositiveInteger} iter - number of iterations
	* @returns {void}
	*/
	function onIterations( error, iter ) {
		// If provided an error, then a benchmark failed, and, similar to pretests, don't run the benchmark multiple times...
		if ( error ) {
			opts.repeats = 1;
			opts.iterations = 1;
			return clbk( name, opts, benchmark );
		}
		opts.iterations = iter;
		return clbk( name, opts, benchmark );
	}
}


// EXPORTS //

module.exports = init;

},{"./iterations.js":197,"./pretest.js":198}],197:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var copy = require( '@stdlib/utils/copy' );
var Benchmark = require( './../benchmark-class' );


// VARIABLES //

var MIN_TIME = 0.1; // seconds
var ITERATIONS = 10; // 10^1
var MAX_ITERATIONS = 10000000000; // 10^10


// MAIN //

/**
* Determines the number of iterations.
*
* @private
* @param {string} name - benchmark name
* @param {Options} options - benchmark options
* @param {(Function|undefined)} benchmark - function containing benchmark code
* @param {Callback} clbk - callback to invoke after determining number of iterations
* @returns {void}
*/
function iterations( name, options, benchmark, clbk ) {
	var opts;
	var time;

	// Elapsed time (in seconds):
	time = 0;

	// Create a local copy:
	opts = copy( options );
	opts.iterations = ITERATIONS;

	// Begin running benchmarks:
	return next();

	/**
	* Run a new benchmark.
	*
	* @private
	*/
	function next() {
		var b = new Benchmark( name, opts, benchmark );
		b.on( 'result', onResult );
		b.once( 'end', onEnd );
		b.run();
	}

	/**
	* Callback invoked upon a `result` event.
	*
	* @private
	* @param {(string|Object)} result - result
	*/
	function onResult( result ) {
		if ( !isString( result ) && result.operator === 'result' ) {
			time = result.elapsed;
		}
	}

	/**
	* Callback invoked upon an `end` event.
	*
	* @private
	* @returns {void}
	*/
	function onEnd() {
		if (
			time < MIN_TIME &&
			opts.iterations < MAX_ITERATIONS
		) {
			opts.iterations *= 10;
			return next();
		}
		clbk( null, opts.iterations );
	}
}


// EXPORTS //

module.exports = iterations;

},{"./../benchmark-class":182,"@stdlib/assert/is-string":154,"@stdlib/utils/copy":295}],198:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var copy = require( '@stdlib/utils/copy' );
var Benchmark = require( './../benchmark-class' );


// MAIN //

/**
* Runs pretests to sanity check and/or catch failures.
*
* @private
* @param {string} name - benchmark name
* @param {Options} options - benchmark options
* @param {(Function|undefined)} benchmark - function containing benchmark code
* @param {Callback} clbk - callback to invoke after completing pretests
*/
function pretest( name, options, benchmark, clbk ) {
	var fail;
	var opts;
	var tic;
	var toc;
	var b;

	// Counters to determine the number of `tic` and `toc` events:
	tic = 0;
	toc = 0;

	// Local copy:
	opts = copy( options );
	opts.iterations = 1;

	// Pretest to check for minimum requirements and/or errors...
	b = new Benchmark( name, opts, benchmark );
	b.on( 'result', onResult );
	b.on( 'tic', onTic );
	b.on( 'toc', onToc );
	b.once( 'end', onEnd );
	b.run();

	/**
	* Callback invoked upon a `result` event.
	*
	* @private
	* @param {(string|Object)} result - result
	*/
	function onResult( result ) {
		if (
			!isString( result ) &&
			!result.ok &&
			!result.todo
		) {
			fail = true;
		}
	}

	/**
	* Callback invoked upon a `tic` event.
	*
	* @private
	*/
	function onTic() {
		tic += 1;
	}

	/**
	* Callback invoked upon a `toc` event.
	*
	* @private
	*/
	function onToc() {
		toc += 1;
	}

	/**
	* Callback invoked upon an `end` event.
	*
	* @private
	* @returns {void}
	*/
	function onEnd() {
		var err;
		if ( fail ) {
			// Possibility that failure is intermittent, but we will assume that the usual case is that the failure would persist across all repeats and no sense failing multiple times when once suffices.
			err = new Error( 'benchmark failed' );
		} else if ( tic !== 1 || toc !== 1 ) {
			// Unable to do anything definitive with timing information (e.g., a tic with no toc or vice versa, or benchmark function calls neither tic nor toc).
			err = new Error( 'invalid benchmark' );
		}
		if ( err ) {
			return clbk( err );
		}
		return clbk();
	}
}


// EXPORTS //

module.exports = pretest;

},{"./../benchmark-class":182,"@stdlib/assert/is-string":154,"@stdlib/utils/copy":295}],199:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isObject = require( '@stdlib/assert/is-plain-object' );
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;
var isNull = require( '@stdlib/assert/is-null' );
var isPositiveInteger = require( '@stdlib/assert/is-positive-integer' ).isPrimitive;


// MAIN //

/**
* Validates function options.
*
* @private
* @param {Object} opts - destination object
* @param {Options} options - function options
* @param {boolean} [options.skip] - boolean indicating whether to skip a benchmark
* @param {(PositiveInteger|null)} [options.iterations] - number of iterations
* @param {PositiveInteger} [options.repeats] - number of repeats
* @param {PositiveInteger} [options.timeout] - number of milliseconds before a benchmark automatically fails
* @returns {(Error|null)} error object or null
*
* @example
* var opts = {};
* var options = {
*     'skip': false,
*     'iterations': 1e6,
*     'repeats': 3,
*     'timeout': 10000
* };
*
* var err = validate( opts, options );
* if ( err ) {
*    throw err;
* }
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'invalid argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	if ( hasOwnProp( options, 'skip' ) ) {
		opts.skip = options.skip;
		if ( !isBoolean( opts.skip ) ) {
			return new TypeError( 'invalid option. `skip` option must be a boolean primitive. Option: `' + opts.skip + '`.' );
		}
	}
	if ( hasOwnProp( options, 'iterations' ) ) {
		opts.iterations = options.iterations;
		if (
			!isPositiveInteger( opts.iterations ) &&
			!isNull( opts.iterations )
		) {
			return new TypeError( 'invalid option. `iterations` option must be either a positive integer or `null`. Option: `' + opts.iterations + '`.' );
		}
	}
	if ( hasOwnProp( options, 'repeats' ) ) {
		opts.repeats = options.repeats;
		if ( !isPositiveInteger( opts.repeats ) ) {
			return new TypeError( 'invalid option. `repeats` option must be a positive integer. Option: `' + opts.repeats + '`.' );
		}
	}
	if ( hasOwnProp( options, 'timeout' ) ) {
		opts.timeout = options.timeout;
		if ( !isPositiveInteger( opts.timeout ) ) {
			return new TypeError( 'invalid option. `timeout` option must be a positive integer. Option: `' + opts.timeout + '`.' );
		}
	}
	return null;
}


// EXPORTS //

module.exports = validate;

},{"@stdlib/assert/has-own-property":49,"@stdlib/assert/is-boolean":77,"@stdlib/assert/is-null":131,"@stdlib/assert/is-plain-object":143,"@stdlib/assert/is-positive-integer":145}],200:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Benchmark harness.
*
* @module @stdlib/bench/harness
*
* @example
* var bench = require( '@stdlib/bench/harness' );
*
* bench( 'beep', function benchmark( b ) {
*     var x;
*     var i;
*     b.tic();
*     for ( i = 0; i < b.iterations; i++ ) {
*         x = Math.sin( Math.random() );
*         if ( x !== x ) {
*             b.ok( false, 'should not return NaN' );
*         }
*     }
*     b.toc();
*     if ( x !== x ) {
*         b.ok( false, 'should not return NaN' );
*     }
*     b.end();
* });
*/

// MODULES //

var bench = require( './bench.js' );


// EXPORTS //

module.exports = bench;

},{"./bench.js":172}],201:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var TransformStream = require( '@stdlib/streams/node/transform' );
var fromCodePoint = require( '@stdlib/string/from-code-point' );
var log = require( './log.js' );


// MAIN //

/**
* Returns a Transform stream for logging to the console.
*
* @private
* @returns {TransformStream} transform stream
*/
function createStream() {
	var stream;
	var line;

	stream = new TransformStream({
		'transform': transform,
		'flush': flush
	});
	line = '';

	return stream;

	/**
	* Callback invoked upon receiving a new chunk.
	*
	* @private
	* @param {(Buffer|string)} chunk - chunk
	* @param {string} enc - Buffer encoding
	* @param {Callback} clbk - callback to invoke after transforming the streamed chunk
	*/
	function transform( chunk, enc, clbk ) {
		var c;
		var i;

		for ( i = 0; i < chunk.length; i++ ) {
			c = fromCodePoint( chunk[ i ] );
			if ( c === '\n' ) {
				flush();
			} else {
				line += c;
			}
		}
		clbk();
	}

	/**
	* Callback to flush data to `stdout`.
	*
	* @private
	* @param {Callback} [clbk] - callback to invoke after processing data
	* @returns {void}
	*/
	function flush( clbk ) {
		try {
			log( line );
		} catch ( err ) {
			stream.emit( 'error', err );
		}
		line = '';
		if ( clbk ) {
			return clbk();
		}
	}
}


// EXPORTS //

module.exports = createStream;

},{"./log.js":202,"@stdlib/streams/node/transform":275,"@stdlib/string/from-code-point":279}],202:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

/**
* Writes a string to the console.
*
* @private
* @param {string} str - string to write
*/
function log( str ) {
	console.log( str ); // eslint-disable-line no-console
}


// EXPORTS //

module.exports = log;

},{}],203:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

/**
* Removes any pending benchmarks.
*
* @private
*/
function clear() {
	/* eslint-disable no-invalid-this */
	this._benchmarks.length = 0;
}


// EXPORTS //

module.exports = clear;

},{}],204:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

/**
* Closes a benchmark runner.
*
* @private
* @returns {void}
*/
function closeRunner() {
	/* eslint-disable no-invalid-this */
	var self = this;
	if ( this._closed ) {
		return;
	}
	this._closed = true;
	if ( this._benchmarks.length ) {
		this.clear();
		this._stream.write( '# WARNING: harness closed before completion.\n' );
	} else {
		this._stream.write( '#\n' );
		this._stream.write( '1..'+this.total+'\n' );
		this._stream.write( '# total '+this.total+'\n' );
		this._stream.write( '# pass  '+this.pass+'\n' );
		if ( this.fail ) {
			this._stream.write( '# fail  '+this.fail+'\n' );
		}
		if ( this.skip ) {
			this._stream.write( '# skip  '+this.skip+'\n' );
		}
		if ( this.todo ) {
			this._stream.write( '# todo  '+this.todo+'\n' );
		}
		if ( !this.fail ) {
			this._stream.write( '#\n# ok\n' );
		}
	}
	this._stream.once( 'close', onClose );
	this._stream.destroy();

	/**
	* Callback invoked upon a `close` event.
	*
	* @private
	*/
	function onClose() {
		self.emit( 'close' );
	}
}


// EXPORTS //

module.exports = closeRunner;

},{}],205:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

/* eslint-disable no-underscore-dangle */

'use strict';

// MODULES //

var TransformStream = require( '@stdlib/streams/node/transform' );
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var nextTick = require( './../utils/next_tick.js' );


// VARIABLES //

var TAP_HEADER = 'TAP version 13';


// MAIN //

/**
* Creates a results stream.
*
* @private
* @param {Options} [options] - stream options
* @throws {TypeError} options argument must be an object
* @throws {TypeError} must provide valid options
* @returns {TransformStream} transform stream
*/
function createStream( options ) {
	/* eslint-disable no-invalid-this */
	var stream;
	var opts;
	var self;
	var id;

	self = this;
	if ( arguments.length ) {
		opts = options;
	} else {
		opts = {};
	}
	stream = new TransformStream( opts );
	if ( opts.objectMode ) {
		id = 0;
		this.on( '_push', onPush );
		this.on( 'done', onDone );
	} else {
		stream.write( TAP_HEADER+'\n' );
		this._stream.pipe( stream );
	}
	this.on( '_run', onRun );
	return stream;

	/**
	* Runs the next benchmark.
	*
	* @private
	*/
	function next() {
		nextTick( onTick );
	}

	/**
	* Callback invoked upon the next tick.
	*
	* @private
	* @returns {void}
	*/
	function onTick() {
		var b = self._benchmarks.shift();
		if ( b ) {
			b.run();
			if ( !b.ended() ) {
				return b.once( 'end', next );
			}
			return next();
		}
		self._running = false;
		self.emit( 'done' );
	}

	/**
	* Callback invoked upon a run event.
	*
	* @private
	* @returns {void}
	*/
	function onRun() {
		if ( !self._running ) {
			self._running = true;
			return next();
		}
	}

	/**
	* Callback invoked upon a push event.
	*
	* @private
	* @param {Benchmark} b - benchmark
	*/
	function onPush( b ) {
		var bid = id;
		id += 1;

		b.once( 'prerun', onPreRun );
		b.on( 'result', onResult );
		b.on( 'end', onEnd );

		/**
		* Callback invoked upon a `prerun` event.
		*
		* @private
		*/
		function onPreRun() {
			var row = {
				'type': 'benchmark',
				'name': b.name,
				'id': bid
			};
			stream.write( row );
		}

		/**
		* Callback invoked upon a `result` event.
		*
		* @private
		* @param {(Object|string)} res - result
		*/
		function onResult( res ) {
			if ( isString( res ) ) {
				res = {
					'benchmark': bid,
					'type': 'comment',
					'name': res
				};
			} else if ( res.operator === 'result' ) {
				res.benchmark = bid;
				res.type = 'result';
			} else {
				res.benchmark = bid;
				res.type = 'assert';
			}
			stream.write( res );
		}

		/**
		* Callback invoked upon an `end` event.
		*
		* @private
		*/
		function onEnd() {
			stream.write({
				'benchmark': bid,
				'type': 'end'
			});
		}
	}

	/**
	* Callback invoked upon a `done` event.
	*
	* @private
	*/
	function onDone() {
		stream.destroy();
	}
}


// EXPORTS //

module.exports = createStream;

},{"./../utils/next_tick.js":214,"@stdlib/assert/is-string":154,"@stdlib/streams/node/transform":275}],206:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var replace = require( '@stdlib/string/replace' );
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var RE_EOL = require( '@stdlib/regexp/eol' );


// VARIABLES //

var RE_WHITESPACE = /\s+/g;


// MAIN //

/**
* Encodes an assertion.
*
* @private
* @param {Object} result - result
* @param {PositiveInteger} count - result count
* @returns {string} encoded assertion
*/
function encodeAssertion( result, count ) {
	var actualStack;
	var errorStack;
	var expected;
	var actual;
	var indent;
	var stack;
	var lines;
	var out;
	var i;

	out = '';

	if ( !result.ok ) {
		out += 'not ';
	}
	// Add result count:
	out += 'ok ' + count;

	// Add description:
	if ( result.name ) {
		out += ' ' + replace( result.name.toString(), RE_WHITESPACE, ' ' );
	}
	// Append directives:
	if ( result.skip ) {
		out += ' # SKIP';
	} else if ( result.todo ) {
		out += ' # TODO';
	}
	out += '\n';
	if ( result.ok ) {
		return out;
	}
	// Format diagnostics as YAML...
	indent = '  ';
	out += indent + '---\n';
	out += indent + 'operator: ' + result.operator + '\n';
	if (
		hasOwnProp( result, 'actual' ) ||
		hasOwnProp( result, 'expected' )
	) {
		// TODO: inspect object logic (https://github.com/substack/tape/blob/master/lib/results.js#L145)
		expected = result.expected;
		actual = result.actual;
		if ( actual !== actual && expected !== expected ) {
			throw new Error( 'TODO: remove me' );
		}
	}
	if ( result.at ) {
		out += indent + 'at: ' + result.at + '\n';
	}
	if ( result.actual ) {
		actualStack = result.actual.stack;
	}
	if ( result.error ) {
		errorStack = result.error.stack;
	}
	if ( actualStack ) {
		stack = actualStack;
	} else {
		stack = errorStack;
	}
	if ( stack ) {
		lines = stack.toString().split( RE_EOL );
		out += indent + 'stack: |-\n';
		for ( i = 0; i < lines.length; i++ ) {
			out += indent + '  ' + lines[ i ] + '\n';
		}
	}
	out += indent + '...\n';
	return out;
}


// EXPORTS //

module.exports = encodeAssertion;

},{"@stdlib/assert/has-own-property":49,"@stdlib/regexp/eol":267,"@stdlib/string/replace":281}],207:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// VARIABLES //

var YAML_INDENT = '  ';
var YAML_BEGIN = YAML_INDENT + '---\n';
var YAML_END = YAML_INDENT + '...\n';


// MAIN //

/**
* Encodes a result as a YAML block.
*
* @private
* @param {Object} result - result
* @returns {string} encoded result
*/
function encodeResult( result ) {
	var out = YAML_BEGIN;
	out += YAML_INDENT + 'iterations: '+result.iterations+'\n';
	out += YAML_INDENT + 'elapsed: '+result.elapsed+'\n';
	out += YAML_INDENT + 'rate: '+result.rate+'\n';
	out += YAML_END;
	return out;
}


// EXPORTS //

module.exports = encodeResult;

},{}],208:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

/**
* Forcefully exits a benchmark runner.
*
* @private
*/
function exit() {
	/* eslint-disable no-invalid-this */
	var self;
	var i;
	for ( i = 0; i < this._benchmarks.length; i++ ) {
		this._benchmarks[ i ].exit();
	}
	self = this;
	this.clear();
	this._stream.once( 'close', onClose );
	this._stream.destroy();

	/**
	* Callback invoked upon a `close` event.
	*
	* @private
	*/
	function onClose() {
		self.emit( 'close' );
	}
}


// EXPORTS //

module.exports = exit;

},{}],209:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var EventEmitter = require( 'events' ).EventEmitter;
var inherit = require( '@stdlib/utils/inherit' );
var defineProperty = require( '@stdlib/utils/define-property' );
var TransformStream = require( '@stdlib/streams/node/transform' );


// MAIN //

/**
* Benchmark runner.
*
* @private
* @constructor
* @returns {Runner} Runner instance
*
* @example
* var runner = new Runner();
*/
function Runner() {
	if ( !( this instanceof Runner ) ) {
		return new Runner();
	}
	EventEmitter.call( this );

	// Private properties:
	defineProperty( this, '_benchmarks', {
		'value': [],
		'configurable': false,
		'writable': false,
		'enumerable': false
	});

	defineProperty( this, '_stream', {
		'value': new TransformStream(),
		'configurable': false,
		'writable': false,
		'enumerable': false
	});

	defineProperty( this, '_closed', {
		'value': false,
		'configurable': false,
		'writable': true,
		'enumerable': false
	});

	defineProperty( this, '_running', {
		'value': false,
		'configurable': false,
		'writable': true,
		'enumerable': false
	});

	// Public properties:
	defineProperty( this, 'total', {
		'value': 0,
		'configurable': false,
		'writable': true,
		'enumerable': true
	});

	defineProperty( this, 'fail', {
		'value': 0,
		'configurable': false,
		'writable': true,
		'enumerable': true
	});

	defineProperty( this, 'pass', {
		'value': 0,
		'configurable': false,
		'writable': true,
		'enumerable': true
	});

	defineProperty( this, 'skip', {
		'value': 0,
		'configurable': false,
		'writable': true,
		'enumerable': true
	});

	defineProperty( this, 'todo', {
		'value': 0,
		'configurable': false,
		'writable': true,
		'enumerable': true
	});

	return this;
}

/*
* Inherit from the `EventEmitter` prototype.
*/
inherit( Runner, EventEmitter );

/**
* Adds a new benchmark.
*
* @private
* @memberof Runner.prototype
* @function push
* @param {Benchmark} b - benchmark
*/
defineProperty( Runner.prototype, 'push', {
	'value': require( './push.js' ),
	'configurable': false,
	'writable': false,
	'enumerable': false
});

/**
* Creates a results stream.
*
* @private
* @memberof Runner.prototype
* @function createStream
* @param {Options} [options] - stream options
* @returns {TransformStream} transform stream
*/
defineProperty( Runner.prototype, 'createStream', {
	'value': require( './create_stream.js' ),
	'configurable': false,
	'writable': false,
	'enumerable': false
});

/**
* Runs pending benchmarks.
*
* @private
* @memberof Runner.prototype
* @function run
*/
defineProperty( Runner.prototype, 'run', {
	'value': require( './run.js' ),
	'configurable': false,
	'writable': false,
	'enumerable': false
});

/**
* Removes any pending benchmarks.
*
* @private
* @memberof Runner.prototype
* @function clear
*/
defineProperty( Runner.prototype, 'clear', {
	'value': require( './clear.js' ),
	'configurable': false,
	'writable': false,
	'enumerable': false
});

/**
* Closes a benchmark runner.
*
* @private
* @memberof Runner.prototype
* @function close
*/
defineProperty( Runner.prototype, 'close', {
	'value': require( './close.js' ),
	'configurable': false,
	'writable': false,
	'enumerable': false
});

/**
* Forcefully exits a benchmark runner.
*
* @private
* @memberof Runner.prototype
* @function exit
*/
defineProperty( Runner.prototype, 'exit', {
	'value': require( './exit.js' ),
	'configurable': false,
	'writable': false,
	'enumerable': false
});


// EXPORTS //

module.exports = Runner;

},{"./clear.js":203,"./close.js":204,"./create_stream.js":205,"./exit.js":208,"./push.js":210,"./run.js":211,"@stdlib/streams/node/transform":275,"@stdlib/utils/define-property":302,"@stdlib/utils/inherit":321,"events":376}],210:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

/* eslint-disable no-underscore-dangle */

'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var encodeAssertion = require( './encode_assertion.js' );
var encodeResult = require( './encode_result.js' );


// MAIN //

/**
* Adds a new benchmark.
*
* @private
* @param {Benchmark} b - benchmark
*/
function push( b ) {
	/* eslint-disable no-invalid-this */
	var self = this;

	this._benchmarks.push( b );

	b.once( 'prerun', onPreRun );
	b.on( 'result', onResult );

	this.emit( '_push', b );

	/**
	* Callback invoked upon a `prerun` event.
	*
	* @private
	*/
	function onPreRun() {
		self._stream.write( '# '+b.name+'\n' );
	}

	/**
	* Callback invoked upon a `result` event.
	*
	* @private
	* @param {(Object|string)} res - result
	* @returns {void}
	*/
	function onResult( res ) {
		// Check for a comment...
		if ( isString( res ) ) {
			return self._stream.write( '# '+res+'\n' );
		}
		if ( res.operator === 'result' ) {
			res = encodeResult( res );
			return self._stream.write( res );
		}
		self.total += 1;
		if ( res.ok ) {
			if ( res.skip ) {
				self.skip += 1;
			} else if ( res.todo ) {
				self.todo += 1;
			}
			self.pass += 1;
		}
		// According to the TAP spec, todos pass even if not "ok"...
		else if ( res.todo ) {
			self.pass += 1;
			self.todo += 1;
		}
		// Everything else is a failure...
		else {
			self.fail += 1;
		}
		res = encodeAssertion( res, self.total );
		self._stream.write( res );
	}
}


// EXPORTS //

module.exports = push;

},{"./encode_assertion.js":206,"./encode_result.js":207,"@stdlib/assert/is-string":154}],211:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

/**
* Runs pending benchmarks.
*
* @private
*/
function run() {
	/* eslint-disable no-invalid-this */
	this.emit( '_run' );
}


// EXPORTS //

module.exports = run;

},{}],212:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var IS_BROWSER = require( '@stdlib/assert/is-browser' );
var canExit = require( './can_exit.js' );


// MAIN //

var bool = ( !IS_BROWSER && canExit );


// EXPORTS //

module.exports = bool;

},{"./can_exit.js":213,"@stdlib/assert/is-browser":83}],213:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var proc = require( './process.js' );


// MAIN //

var bool = ( proc && typeof proc.exit === 'function' );


// EXPORTS //

module.exports = bool;

},{"./process.js":215}],214:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

/**
* Runs a function on a subsequent turn of the event loop.
*
* ## Notes
*
* -   `process.nextTick` is only Node.js.
* -   `setImmediate` is non-standard.
* -   Everything else is browser based (e.g., mutation observer, requestAnimationFrame, etc).
* -   Only API which is universal is `setTimeout`.
* -   Note that `0` is not actually `0ms`. Browser environments commonly have a minimum delay of `4ms`. This is acceptable. Here, the main intent of this function is to give the runtime a chance to run garbage collection, clear state, and tend to any other pending tasks before returning control to benchmark tasks. The larger aim (attainable or not) is to provide each benchmark run with as much of a fresh state as possible.
*
*
* @private
* @param {Function} fcn - function to run upon a subsequent turn of the event loop
*/
function nextTick( fcn ) {
	setTimeout( fcn, 0 );
}


// EXPORTS //

module.exports = nextTick;

},{}],215:[function(require,module,exports){
(function (process){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// EXPORTS //

module.exports = process;

}).call(this,require('_process'))
},{"_process":383}],216:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Benchmark harness.
*
* @module @stdlib/bench
*
* @example
* var bench = require( '@stdlib/bench' );
*
* bench( 'beep', function benchmark( b ) {
*     var x;
*     var i;
*     b.tic();
*     for ( i = 0; i < b.iterations; i++ ) {
*         x = Math.sin( Math.random() );
*         if ( x !== x ) {
*             b.ok( false, 'should not return NaN' );
*         }
*     }
*     b.toc();
*     if ( x !== x ) {
*         b.ok( false, 'should not return NaN' );
*     }
*     b.end();
* });
*/

// MODULES //

var bench = require( '@stdlib/bench/harness' );


// EXPORTS //

module.exports = bench;

},{"@stdlib/bench/harness":200}],217:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

var ctor = require( 'buffer' ).Buffer; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

},{"buffer":372}],218:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Buffer constructor.
*
* @module @stdlib/buffer/ctor
*
* @example
* var ctor = require( '@stdlib/buffer/ctor' );
*
* var b = new ctor( [ 1, 2, 3, 4 ] );
* // returns <Buffer>
*/

// MODULES //

var hasNodeBufferSupport = require( '@stdlib/assert/has-node-buffer-support' );
var main = require( './buffer.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var ctor;
if ( hasNodeBufferSupport() ) {
	ctor = main;
} else {
	ctor = polyfill;
}


// EXPORTS //

module.exports = ctor;

},{"./buffer.js":217,"./polyfill.js":219,"@stdlib/assert/has-node-buffer-support":47}],219:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// TODO: write (browser) polyfill

// MAIN //

/**
* Buffer constructor.
*
* @throws {Error} not implemented
*/
function polyfill() {
	throw new Error( 'not implemented' );
}


// EXPORTS //

module.exports = polyfill;

},{}],220:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isFunction = require( '@stdlib/assert/is-function' );
var Buffer = require( '@stdlib/buffer/ctor' );


// MAIN //

var bool = isFunction( Buffer.from );


// EXPORTS //

module.exports = bool;

},{"@stdlib/assert/is-function":98,"@stdlib/buffer/ctor":218}],221:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Copy buffer data to a new `Buffer` instance.
*
* @module @stdlib/buffer/from-buffer
*
* @example
* var fromArray = require( '@stdlib/buffer/from-array' );
* var copyBuffer = require( '@stdlib/buffer/from-buffer' );
*
* var b1 = fromArray( [ 1, 2, 3, 4 ] );
* // returns <Buffer>
*
* var b2 = copyBuffer( b1 );
* // returns <Buffer>
*/

// MODULES //

var hasFrom = require( './has_from.js' );
var main = require( './main.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var copyBuffer;
if ( hasFrom ) {
	copyBuffer = main;
} else {
	copyBuffer = polyfill;
}


// EXPORTS //

module.exports = copyBuffer;

},{"./has_from.js":220,"./main.js":222,"./polyfill.js":223}],222:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isBuffer = require( '@stdlib/assert/is-buffer' );
var Buffer = require( '@stdlib/buffer/ctor' );


// MAIN //

/**
* Copies buffer data to a new `Buffer` instance.
*
* @param {Buffer} buffer - buffer from which to copy
* @throws {TypeError} must provide a `Buffer` instance
* @returns {Buffer} new `Buffer` instance
*
* @example
* var fromArray = require( '@stdlib/buffer/from-array' );
*
* var b1 = fromArray( [ 1, 2, 3, 4 ] );
* // returns <Buffer>
*
* var b2 = fromBuffer( b1 );
* // returns <Buffer>
*/
function fromBuffer( buffer ) {
	if ( !isBuffer( buffer ) ) {
		throw new TypeError( 'invalid argument. Must provide a Buffer. Value: `' + buffer + '`' );
	}
	return Buffer.from( buffer );
}


// EXPORTS //

module.exports = fromBuffer;

},{"@stdlib/assert/is-buffer":84,"@stdlib/buffer/ctor":218}],223:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isBuffer = require( '@stdlib/assert/is-buffer' );
var Buffer = require( '@stdlib/buffer/ctor' );


// MAIN //

/**
* Copies buffer data to a new `Buffer` instance.
*
* @param {Buffer} buffer - buffer from which to copy
* @throws {TypeError} must provide a `Buffer` instance
* @returns {Buffer} new `Buffer` instance
*
* @example
* var fromArray = require( '@stdlib/buffer/from-array' );
*
* var b1 = fromArray( [ 1, 2, 3, 4 ] );
* // returns <Buffer>
*
* var b2 = fromBuffer( b1 );
* // returns <Buffer>
*/
function fromBuffer( buffer ) {
	if ( !isBuffer( buffer ) ) {
		throw new TypeError( 'invalid argument. Must provide a Buffer. Value: `' + buffer + '`' );
	}
	return new Buffer( buffer ); // eslint-disable-line no-buffer-constructor
}


// EXPORTS //

module.exports = fromBuffer;

},{"@stdlib/assert/is-buffer":84,"@stdlib/buffer/ctor":218}],224:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Maximum length of a generic array.
*
* @module @stdlib/constants/array/max-array-length
*
* @example
* var MAX_ARRAY_LENGTH = require( '@stdlib/constants/array/max-array-length' );
* // returns 4294967295
*/

// MAIN //

/**
* Maximum length of a generic array.
*
* ```tex
* 2^{32} - 1
* ```
*
* @constant
* @type {uinteger32}
* @default 4294967295
*/
var MAX_ARRAY_LENGTH = 4294967295>>>0; // asm type annotation


// EXPORTS //

module.exports = MAX_ARRAY_LENGTH;

},{}],225:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Maximum length of a typed array.
*
* @module @stdlib/constants/array/max-typed-array-length
*
* @example
* var MAX_TYPED_ARRAY_LENGTH = require( '@stdlib/constants/array/max-typed-array-length' );
* // returns 9007199254740991
*/

// MAIN //

/**
* Maximum length of a typed array.
*
* ```tex
* 2^{53} - 1
* ```
*
* @constant
* @type {number}
* @default 9007199254740991
*/
var MAX_TYPED_ARRAY_LENGTH = 9007199254740991;


// EXPORTS //

module.exports = MAX_TYPED_ARRAY_LENGTH;

},{}],226:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* The bias of a double-precision floating-point number's exponent.
*
* @module @stdlib/constants/math/float64-exponent-bias
* @type {integer32}
*
* @example
* var FLOAT64_EXPONENT_BIAS = require( '@stdlib/constants/math/float64-exponent-bias' );
* // returns 1023
*/


// MAIN //

/**
* Bias of a double-precision floating-point number's exponent.
*
* ## Notes
*
* The bias can be computed via
*
* ```tex
* \mathrm{bias} = 2^{k-1} - 1
* ```
*
* where \\(k\\) is the number of bits in the exponent; here, \\(k = 11\\).
*
* @constant
* @type {integer32}
* @default 1023
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_EXPONENT_BIAS = 1023|0; // asm type annotation


// EXPORTS //

module.exports = FLOAT64_EXPONENT_BIAS;

},{}],227:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* High word mask for the exponent of a double-precision floating-point number.
*
* @module @stdlib/constants/math/float64-high-word-exponent-mask
* @type {uinteger32}
*
* @example
* var FLOAT64_HIGH_WORD_EXPONENT_MASK = require( '@stdlib/constants/math/float64-high-word-exponent-mask' );
* // returns 2146435072
*/


// MAIN //

/**
* High word mask for the exponent of a double-precision floating-point number.
*
* ## Notes
*
* The high word mask for the exponent of a double-precision floating-point number is an unsigned 32-bit integer with the value \\( 2146435072 \\), which corresponds to the bit sequence
*
* ```binarystring
* 0 11111111111 00000000000000000000
* ```
*
* @constant
* @type {uinteger32}
* @default 0x7ff00000
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_HIGH_WORD_EXPONENT_MASK = 0x7ff00000;


// EXPORTS //

module.exports = FLOAT64_HIGH_WORD_EXPONENT_MASK;

},{}],228:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* High word mask for the significand of a double-precision floating-point number.
*
* @module @stdlib/constants/math/float64-high-word-significand-mask
* @type {uinteger32}
*
* @example
* var FLOAT64_HIGH_WORD_SIGNIFICAND_MASK = require( '@stdlib/constants/math/float64-high-word-significand-mask' );
* // returns 1048575
*/


// MAIN //

/**
* High word mask for the significand of a double-precision floating-point number.
*
* ## Notes
*
* The high word mask for the significand of a double-precision floating-point number is an unsigned 32-bit integer with the value \\( 1048575 \\), which corresponds to the bit sequence
*
* ```binarystring
* 0 00000000000 11111111111111111111
* ```
*
* @constant
* @type {uinteger32}
* @default 0x000fffff
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_HIGH_WORD_SIGNIFICAND_MASK = 0x000fffff;


// EXPORTS //

module.exports = FLOAT64_HIGH_WORD_SIGNIFICAND_MASK;

},{}],229:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Double-precision floating-point negative infinity.
*
* @module @stdlib/constants/math/float64-ninf
* @type {number}
*
* @example
* var FLOAT64_NINF = require( '@stdlib/constants/math/float64-ninf' );
* // returns -Infinity
*/

// MODULES //

var Number = require( '@stdlib/number/ctor' );


// MAIN //

/**
* Double-precision floating-point negative infinity.
*
* ## Notes
*
* Double-precision floating-point negative infinity has the bit sequence
*
* ```binarystring
* 1 11111111111 00000000000000000000 00000000000000000000000000000000
* ```
*
* @constant
* @type {number}
* @default Number.NEGATIVE_INFINITY
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_NINF = Number.NEGATIVE_INFINITY;


// EXPORTS //

module.exports = FLOAT64_NINF;

},{"@stdlib/number/ctor":258}],230:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Double-precision floating-point positive infinity.
*
* @module @stdlib/constants/math/float64-pinf
* @type {number}
*
* @example
* var FLOAT64_PINF = require( '@stdlib/constants/math/float64-pinf' );
* // returns Infinity
*/


// MAIN //

/**
* Double-precision floating-point positive infinity.
*
* ## Notes
*
* Double-precision floating-point positive infinity has the bit sequence
*
* ```binarystring
* 0 11111111111 00000000000000000000 00000000000000000000000000000000
* ```
*
* @constant
* @type {number}
* @default Number.POSITIVE_INFINITY
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_PINF = Number.POSITIVE_INFINITY; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = FLOAT64_PINF;

},{}],231:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Maximum signed 16-bit integer.
*
* @module @stdlib/constants/math/int16-max
* @type {integer32}
*
* @example
* var INT16_MAX = require( '@stdlib/constants/math/int16-max' );
* // returns 32767
*/


// MAIN //

/**
* Maximum signed 16-bit integer.
*
* ## Notes
*
* The number has the value
*
* ```tex
* 2^{15} - 1
* ```
*
* which corresponds to the bit sequence
*
* ```binarystring
* 0111111111111111
* ```
*
* @constant
* @type {integer32}
* @default 32767
*/
var INT16_MAX = 32767|0; // asm type annotation


// EXPORTS //

module.exports = INT16_MAX;

},{}],232:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Minimum signed 16-bit integer.
*
* @module @stdlib/constants/math/int16-min
* @type {integer32}
*
* @example
* var INT16_MIN = require( '@stdlib/constants/math/int16-min' );
* // returns -32768
*/


// MAIN //

/**
* Minimum signed 16-bit integer.
*
* ## Notes
*
* The number has the value
*
* ```tex
* -(2^{15})
* ```
*
* which corresponds to the two's complement bit sequence
*
* ```binarystring
* 1000000000000000
* ```
*
* @constant
* @type {integer32}
* @default -32768
*/
var INT16_MIN = -32768|0; // asm type annotation


// EXPORTS //

module.exports = INT16_MIN;

},{}],233:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Maximum signed 32-bit integer.
*
* @module @stdlib/constants/math/int32-max
* @type {integer32}
*
* @example
* var INT32_MAX = require( '@stdlib/constants/math/int32-max' );
* // returns 2147483647
*/


// MAIN //

/**
* Maximum signed 32-bit integer.
*
* ## Notes
*
* The number has the value
*
* ```tex
* 2^{31} - 1
* ```
*
* which corresponds to the bit sequence
*
* ```binarystring
* 01111111111111111111111111111111
* ```
*
* @constant
* @type {integer32}
* @default 2147483647
*/
var INT32_MAX = 2147483647|0; // asm type annotation


// EXPORTS //

module.exports = INT32_MAX;

},{}],234:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Minimum signed 32-bit integer.
*
* @module @stdlib/constants/math/int32-min
* @type {integer32}
*
* @example
* var INT32_MIN = require( '@stdlib/constants/math/int32-min' );
* // returns -2147483648
*/


// MAIN //

/**
* Minimum signed 32-bit integer.
*
* ## Notes
*
* The number has the value
*
* ```tex
* -(2^{31})
* ```
*
* which corresponds to the two's complement bit sequence
*
* ```binarystring
* 10000000000000000000000000000000
* ```
*
* @constant
* @type {integer32}
* @default -2147483648
*/
var INT32_MIN = -2147483648|0; // asm type annotation


// EXPORTS //

module.exports = INT32_MIN;

},{}],235:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Maximum signed 8-bit integer.
*
* @module @stdlib/constants/math/int8-max
* @type {integer32}
*
* @example
* var INT8_MAX = require( '@stdlib/constants/math/int8-max' );
* // returns 127
*/


// MAIN //

/**
* Maximum signed 8-bit integer.
*
* ## Notes
*
* The number is given by
*
* ```tex
* 2^{7} - 1
* ```
*
* which corresponds to the bit sequence
*
* ```binarystring
* 01111111
* ```
*
* @constant
* @type {integer32}
* @default 127
*/
var INT8_MAX = 127|0; // asm type annotation


// EXPORTS //

module.exports = INT8_MAX;

},{}],236:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Minimum signed 8-bit integer.
*
* @module @stdlib/constants/math/int8-min
* @type {integer32}
*
* @example
* var INT8_MIN = require( '@stdlib/constants/math/int8-min' );
* // returns -128
*/


// MAIN //

/**
* Minimum signed 8-bit integer.
*
* ## Notes
*
* The number is given by
*
* ```tex
* -(2^{7})
* ```
*
* which corresponds to the two's complement bit sequence
*
* ```binarystring
* 10000000
* ```
*
* @constant
* @type {integer32}
* @default -128
*/
var INT8_MIN = -128|0; // asm type annotation


// EXPORTS //

module.exports = INT8_MIN;

},{}],237:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Maximum unsigned 16-bit integer.
*
* @module @stdlib/constants/math/uint16-max
* @type {integer32}
*
* @example
* var UINT16_MAX = require( '@stdlib/constants/math/uint16-max' );
* // returns 65535
*/


// MAIN //

/**
* Maximum unsigned 16-bit integer.
*
* ## Notes
*
* The number has the value
*
* ```tex
* 2^{16} - 1
* ```
*
* which corresponds to the bit sequence
*
* ```binarystring
* 1111111111111111
* ```
*
* @constant
* @type {integer32}
* @default 65535
*/
var UINT16_MAX = 65535|0; // asm type annotation


// EXPORTS //

module.exports = UINT16_MAX;

},{}],238:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Maximum unsigned 32-bit integer.
*
* @module @stdlib/constants/math/uint32-max
* @type {uinteger32}
*
* @example
* var UINT32_MAX = require( '@stdlib/constants/math/uint32-max' );
* // returns 4294967295
*/


// MAIN //

/**
* Maximum unsigned 32-bit integer.
*
* ## Notes
*
* The number has the value
*
* ```tex
* 2^{32} - 1
* ```
*
* which corresponds to the bit sequence
*
* ```binarystring
* 11111111111111111111111111111111
* ```
*
* @constant
* @type {uinteger32}
* @default 4294967295
*/
var UINT32_MAX = 4294967295;


// EXPORTS //

module.exports = UINT32_MAX;

},{}],239:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Maximum unsigned 8-bit integer.
*
* @module @stdlib/constants/math/uint8-max
* @type {integer32}
*
* @example
* var UINT8_MAX = require( '@stdlib/constants/math/uint8-max' );
* // returns 255
*/


// MAIN //

/**
* Maximum unsigned 8-bit integer.
*
* ## Notes
*
* The number has the value
*
* ```tex
* 2^{8} - 1
* ```
*
* which corresponds to the bit sequence
*
* ```binarystring
* 11111111
* ```
*
* @constant
* @type {integer32}
* @default 255
*/
var UINT8_MAX = 255|0; // asm type annotation


// EXPORTS //

module.exports = UINT8_MAX;

},{}],240:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Maximum Unicode code point in the Basic Multilingual Plane (BMP).
*
* @module @stdlib/constants/string/unicode-max-bmp
* @type {integer32}
*
* @example
* var UNICODE_MAX_BMP = require( '@stdlib/constants/string/unicode-max-bmp' );
* // returns 65535
*/


// MAIN //

/**
* Maximum Unicode code point in the Basic Multilingual Plane (BMP).
*
* @constant
* @type {integer32}
* @default 65535
* @see [Unicode]{@link https://en.wikipedia.org/wiki/Unicode}
*/
var UNICODE_MAX_BMP = 0xFFFF|0; // asm type annotation


// EXPORTS //

module.exports = UNICODE_MAX_BMP;

},{}],241:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Maximum Unicode code point.
*
* @module @stdlib/constants/string/unicode-max
* @type {integer32}
*
* @example
* var UNICODE_MAX = require( '@stdlib/constants/string/unicode-max' );
* // returns 1114111
*/


// MAIN //

/**
* Maximum Unicode code point.
*
* @constant
* @type {integer32}
* @default 1114111
* @see [Unicode]{@link https://en.wikipedia.org/wiki/Unicode}
*/
var UNICODE_MAX = 0x10FFFF|0; // asm type annotation


// EXPORTS //

module.exports = UNICODE_MAX;

},{}],242:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var bench = require( '@stdlib/bench' );
var isArray = require( '@stdlib/assert/is-array' );
var pkg = require( './../package.json' ).name;
var dataset = require( './../lib/browser.js' );


// MAIN //

bench( pkg+'::browser', function benchmark( b ) {
	var data;
	var i;
	b.tic();
	for ( i = 0; i < b.iterations; i++ ) {
		data = dataset();
		if ( data.length === 0 ) {
			b.fail( 'should have a length greater than 0' );
		}
	}
	b.toc();
	if ( !isArray( data ) ) {
		b.fail( 'should return an array' );
	}
	b.pass( 'benchmark finished' );
	b.end();
});

},{"./../lib/browser.js":245,"./../package.json":246,"@stdlib/assert/is-array":75,"@stdlib/bench":216}],243:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var bench = require( '@stdlib/bench' );
var IS_BROWSER = require( '@stdlib/assert/is-browser' );
var isArray = require( '@stdlib/assert/is-array' );
var pkg = require( './../package.json' ).name;
var dataset = require( './../lib' );


// VARIABLES //

var opts = {
	'skip': IS_BROWSER
};


// MAIN //

bench( pkg, opts, function benchmark( b ) {
	var data;
	var i;
	b.tic();
	for ( i = 0; i < b.iterations; i++ ) {
		data = dataset();
		if ( data.length === 0 ) {
			b.fail( 'should have a length greater than 0' );
		}
	}
	b.toc();
	if ( !isArray( data ) ) {
		b.fail( 'should return an array' );
	}
	b.pass( 'benchmark finished' );
	b.end();
});

},{"./../lib":245,"./../package.json":246,"@stdlib/assert/is-array":75,"@stdlib/assert/is-browser":83,"@stdlib/bench":216}],244:[function(require,module,exports){
module.exports=[{"obs":1,"town":"Nahant","town_id":0,"tract":2011,"lon":-70.955000,"lat":42.255000,"medv":24.0,"cmedv":24.0,"crim":0.00632,"zn":18.0,"indus":2.31,"chas":0,"nox":0.538,"rm":6.575,"age":65.2,"dis":4.0900,"rad":1,"tax":296,"ptratio":15.3,"b":396.90,"lstat":4.98},{"obs":2,"town":"Swampscott","town_id":1,"tract":2021,"lon":-70.950000,"lat":42.287500,"medv":21.6,"cmedv":21.6,"crim":0.02731,"zn":0.0,"indus":7.07,"chas":0,"nox":0.469,"rm":6.421,"age":78.9,"dis":4.9671,"rad":2,"tax":242,"ptratio":17.8,"b":396.90,"lstat":9.14},{"obs":3,"town":"Swampscott","town_id":1,"tract":2022,"lon":-70.936000,"lat":42.283000,"medv":34.7,"cmedv":34.7,"crim":0.02729,"zn":0.0,"indus":7.07,"chas":0,"nox":0.469,"rm":7.185,"age":61.1,"dis":4.9671,"rad":2,"tax":242,"ptratio":17.8,"b":392.83,"lstat":4.03},{"obs":4,"town":"Marblehead","town_id":2,"tract":2031,"lon":-70.928000,"lat":42.293000,"medv":33.4,"cmedv":33.4,"crim":0.03237,"zn":0.0,"indus":2.18,"chas":0,"nox":0.458,"rm":6.998,"age":45.8,"dis":6.0622,"rad":3,"tax":222,"ptratio":18.7,"b":394.63,"lstat":2.94},{"obs":5,"town":"Marblehead","town_id":2,"tract":2032,"lon":-70.922000,"lat":42.298000,"medv":36.2,"cmedv":36.2,"crim":0.06905,"zn":0.0,"indus":2.18,"chas":0,"nox":0.458,"rm":7.147,"age":54.2,"dis":6.0622,"rad":3,"tax":222,"ptratio":18.7,"b":396.90,"lstat":5.33},{"obs":6,"town":"Marblehead","town_id":2,"tract":2033,"lon":-70.916500,"lat":42.304000,"medv":28.7,"cmedv":28.7,"crim":0.02985,"zn":0.0,"indus":2.18,"chas":0,"nox":0.458,"rm":6.430,"age":58.7,"dis":6.0622,"rad":3,"tax":222,"ptratio":18.7,"b":394.12,"lstat":5.21},{"obs":7,"town":"Salem","town_id":3,"tract":2041,"lon":-70.936000,"lat":42.297000,"medv":22.9,"cmedv":22.9,"crim":0.08829,"zn":12.5,"indus":7.87,"chas":0,"nox":0.524,"rm":6.012,"age":66.6,"dis":5.5605,"rad":5,"tax":311,"ptratio":15.2,"b":395.60,"lstat":12.43},{"obs":8,"town":"Salem","town_id":3,"tract":2042,"lon":-70.937500,"lat":42.310000,"medv":27.1,"cmedv":22.1,"crim":0.14455,"zn":12.5,"indus":7.87,"chas":0,"nox":0.524,"rm":6.172,"age":96.1,"dis":5.9505,"rad":5,"tax":311,"ptratio":15.2,"b":396.90,"lstat":19.15},{"obs":9,"town":"Salem","town_id":3,"tract":2043,"lon":-70.933000,"lat":42.312000,"medv":16.5,"cmedv":16.5,"crim":0.21124,"zn":12.5,"indus":7.87,"chas":0,"nox":0.524,"rm":5.631,"age":100.0,"dis":6.0821,"rad":5,"tax":311,"ptratio":15.2,"b":386.63,"lstat":29.93},{"obs":10,"town":"Salem","town_id":3,"tract":2044,"lon":-70.929000,"lat":42.316000,"medv":18.9,"cmedv":18.9,"crim":0.17004,"zn":12.5,"indus":7.87,"chas":0,"nox":0.524,"rm":6.004,"age":85.9,"dis":6.5921,"rad":5,"tax":311,"ptratio":15.2,"b":386.71,"lstat":17.10},{"obs":11,"town":"Salem","town_id":3,"tract":2045,"lon":-70.935000,"lat":42.316000,"medv":15.0,"cmedv":15.0,"crim":0.22489,"zn":12.5,"indus":7.87,"chas":0,"nox":0.524,"rm":6.377,"age":94.3,"dis":6.3467,"rad":5,"tax":311,"ptratio":15.2,"b":392.52,"lstat":20.45},{"obs":12,"town":"Salem","town_id":3,"tract":2046,"lon":-70.944000,"lat":42.317000,"medv":18.9,"cmedv":18.9,"crim":0.11747,"zn":12.5,"indus":7.87,"chas":0,"nox":0.524,"rm":6.009,"age":82.9,"dis":6.2267,"rad":5,"tax":311,"ptratio":15.2,"b":396.90,"lstat":13.27},{"obs":13,"town":"Salem","town_id":3,"tract":2047,"lon":-70.951000,"lat":42.306000,"medv":21.7,"cmedv":21.7,"crim":0.09378,"zn":12.5,"indus":7.87,"chas":0,"nox":0.524,"rm":5.889,"age":39.0,"dis":5.4509,"rad":5,"tax":311,"ptratio":15.2,"b":390.50,"lstat":15.71},{"obs":14,"town":"Lynn","town_id":4,"tract":2051,"lon":-70.964500,"lat":42.292000,"medv":20.4,"cmedv":20.4,"crim":0.62976,"zn":0.0,"indus":8.14,"chas":0,"nox":0.538,"rm":5.949,"age":61.8,"dis":4.7075,"rad":4,"tax":307,"ptratio":21.0,"b":396.90,"lstat":8.26},{"obs":15,"town":"Lynn","town_id":4,"tract":2052,"lon":-70.972000,"lat":42.287000,"medv":18.2,"cmedv":18.2,"crim":0.63796,"zn":0.0,"indus":8.14,"chas":0,"nox":0.538,"rm":6.096,"age":84.5,"dis":4.4619,"rad":4,"tax":307,"ptratio":21.0,"b":380.02,"lstat":10.26},{"obs":16,"town":"Lynn","town_id":4,"tract":2053,"lon":-70.976500,"lat":42.294000,"medv":19.9,"cmedv":19.9,"crim":0.62739,"zn":0.0,"indus":8.14,"chas":0,"nox":0.538,"rm":5.834,"age":56.5,"dis":4.4986,"rad":4,"tax":307,"ptratio":21.0,"b":395.62,"lstat":8.47},{"obs":17,"town":"Lynn","town_id":4,"tract":2054,"lon":-70.987000,"lat":42.298500,"medv":23.1,"cmedv":23.1,"crim":1.05393,"zn":0.0,"indus":8.14,"chas":0,"nox":0.538,"rm":5.935,"age":29.3,"dis":4.4986,"rad":4,"tax":307,"ptratio":21.0,"b":386.85,"lstat":6.58},{"obs":18,"town":"Lynn","town_id":4,"tract":2055,"lon":-70.978000,"lat":42.285000,"medv":17.5,"cmedv":17.5,"crim":0.78420,"zn":0.0,"indus":8.14,"chas":0,"nox":0.538,"rm":5.990,"age":81.7,"dis":4.2579,"rad":4,"tax":307,"ptratio":21.0,"b":386.75,"lstat":14.67},{"obs":19,"town":"Lynn","town_id":4,"tract":2056,"lon":-70.992500,"lat":42.282500,"medv":20.2,"cmedv":20.2,"crim":0.80271,"zn":0.0,"indus":8.14,"chas":0,"nox":0.538,"rm":5.456,"age":36.6,"dis":3.7965,"rad":4,"tax":307,"ptratio":21.0,"b":288.99,"lstat":11.69},{"obs":20,"town":"Lynn","town_id":4,"tract":2057,"lon":-70.988000,"lat":42.277600,"medv":18.2,"cmedv":18.2,"crim":0.72580,"zn":0.0,"indus":8.14,"chas":0,"nox":0.538,"rm":5.727,"age":69.5,"dis":3.7965,"rad":4,"tax":307,"ptratio":21.0,"b":390.95,"lstat":11.28},{"obs":21,"town":"Lynn","town_id":4,"tract":2058,"lon":-70.983500,"lat":42.277000,"medv":13.6,"cmedv":13.6,"crim":1.25179,"zn":0.0,"indus":8.14,"chas":0,"nox":0.538,"rm":5.570,"age":98.1,"dis":3.7979,"rad":4,"tax":307,"ptratio":21.0,"b":376.57,"lstat":21.02},{"obs":22,"town":"Lynn","town_id":4,"tract":2059,"lon":-70.982000,"lat":42.281000,"medv":19.6,"cmedv":19.6,"crim":0.85204,"zn":0.0,"indus":8.14,"chas":0,"nox":0.538,"rm":5.965,"age":89.2,"dis":4.0123,"rad":4,"tax":307,"ptratio":21.0,"b":392.53,"lstat":13.83},{"obs":23,"town":"Lynn","town_id":4,"tract":2060,"lon":-70.977500,"lat":42.279000,"medv":15.2,"cmedv":15.2,"crim":1.23247,"zn":0.0,"indus":8.14,"chas":0,"nox":0.538,"rm":6.142,"age":91.7,"dis":3.9769,"rad":4,"tax":307,"ptratio":21.0,"b":396.90,"lstat":18.72},{"obs":24,"town":"Lynn","town_id":4,"tract":2061,"lon":-70.973000,"lat":42.279000,"medv":14.5,"cmedv":14.5,"crim":0.98843,"zn":0.0,"indus":8.14,"chas":0,"nox":0.538,"rm":5.813,"age":100.0,"dis":4.0952,"rad":4,"tax":307,"ptratio":21.0,"b":394.54,"lstat":19.88},{"obs":25,"town":"Lynn","town_id":4,"tract":2062,"lon":-70.969300,"lat":42.281600,"medv":15.6,"cmedv":15.6,"crim":0.75026,"zn":0.0,"indus":8.14,"chas":0,"nox":0.538,"rm":5.924,"age":94.1,"dis":4.3996,"rad":4,"tax":307,"ptratio":21.0,"b":394.33,"lstat":16.30},{"obs":26,"town":"Lynn","town_id":4,"tract":2063,"lon":-70.964000,"lat":42.284000,"medv":13.9,"cmedv":13.9,"crim":0.84054,"zn":0.0,"indus":8.14,"chas":0,"nox":0.538,"rm":5.599,"age":85.7,"dis":4.4546,"rad":4,"tax":307,"ptratio":21.0,"b":303.42,"lstat":16.51},{"obs":27,"town":"Lynn","town_id":4,"tract":2064,"lon":-70.959700,"lat":42.287000,"medv":16.6,"cmedv":16.6,"crim":0.67191,"zn":0.0,"indus":8.14,"chas":0,"nox":0.538,"rm":5.813,"age":90.3,"dis":4.6820,"rad":4,"tax":307,"ptratio":21.0,"b":376.88,"lstat":14.81},{"obs":28,"town":"Lynn","town_id":4,"tract":2065,"lon":-70.959700,"lat":42.282500,"medv":14.8,"cmedv":14.8,"crim":0.95577,"zn":0.0,"indus":8.14,"chas":0,"nox":0.538,"rm":6.047,"age":88.8,"dis":4.4534,"rad":4,"tax":307,"ptratio":21.0,"b":306.38,"lstat":17.28},{"obs":29,"town":"Lynn","town_id":4,"tract":2066,"lon":-70.957000,"lat":42.280000,"medv":18.4,"cmedv":18.4,"crim":0.77299,"zn":0.0,"indus":8.14,"chas":0,"nox":0.538,"rm":6.495,"age":94.4,"dis":4.4547,"rad":4,"tax":307,"ptratio":21.0,"b":387.94,"lstat":12.80},{"obs":30,"town":"Lynn","town_id":4,"tract":2067,"lon":-70.951000,"lat":42.278000,"medv":21.0,"cmedv":21.0,"crim":1.00245,"zn":0.0,"indus":8.14,"chas":0,"nox":0.538,"rm":6.674,"age":87.3,"dis":4.2390,"rad":4,"tax":307,"ptratio":21.0,"b":380.23,"lstat":11.98},{"obs":31,"town":"Lynn","town_id":4,"tract":2068,"lon":-70.967000,"lat":42.279000,"medv":12.7,"cmedv":12.7,"crim":1.13081,"zn":0.0,"indus":8.14,"chas":0,"nox":0.538,"rm":5.713,"age":94.1,"dis":4.2330,"rad":4,"tax":307,"ptratio":21.0,"b":360.17,"lstat":22.60},{"obs":32,"town":"Lynn","town_id":4,"tract":2069,"lon":-70.964000,"lat":42.276500,"medv":14.5,"cmedv":14.5,"crim":1.35472,"zn":0.0,"indus":8.14,"chas":0,"nox":0.538,"rm":6.072,"age":100.0,"dis":4.1750,"rad":4,"tax":307,"ptratio":21.0,"b":376.73,"lstat":13.04},{"obs":33,"town":"Lynn","town_id":4,"tract":2070,"lon":-70.972000,"lat":42.276500,"medv":13.2,"cmedv":13.2,"crim":1.38799,"zn":0.0,"indus":8.14,"chas":0,"nox":0.538,"rm":5.950,"age":82.0,"dis":3.9900,"rad":4,"tax":307,"ptratio":21.0,"b":232.60,"lstat":27.71},{"obs":34,"town":"Lynn","town_id":4,"tract":2071,"lon":-70.979500,"lat":42.276000,"medv":13.1,"cmedv":13.1,"crim":1.15172,"zn":0.0,"indus":8.14,"chas":0,"nox":0.538,"rm":5.701,"age":95.0,"dis":3.7872,"rad":4,"tax":307,"ptratio":21.0,"b":358.77,"lstat":18.35},{"obs":35,"town":"Lynn","town_id":4,"tract":2072,"lon":-70.977500,"lat":42.272000,"medv":13.5,"cmedv":13.5,"crim":1.61282,"zn":0.0,"indus":8.14,"chas":0,"nox":0.538,"rm":6.096,"age":96.9,"dis":3.7598,"rad":4,"tax":307,"ptratio":21.0,"b":248.31,"lstat":20.34},{"obs":36,"town":"Sargus","town_id":5,"tract":2081,"lon":-71.000000,"lat":42.270000,"medv":18.9,"cmedv":18.9,"crim":0.06417,"zn":0.0,"indus":5.96,"chas":0,"nox":0.499,"rm":5.933,"age":68.2,"dis":3.3603,"rad":5,"tax":279,"ptratio":19.2,"b":396.90,"lstat":9.68},{"obs":37,"town":"Sargus","town_id":5,"tract":2082,"lon":-71.008000,"lat":42.274500,"medv":20.0,"cmedv":20.0,"crim":0.09744,"zn":0.0,"indus":5.96,"chas":0,"nox":0.499,"rm":5.841,"age":61.4,"dis":3.3779,"rad":5,"tax":279,"ptratio":19.2,"b":377.56,"lstat":11.41},{"obs":38,"town":"Sargus","town_id":5,"tract":2083,"lon":-71.004000,"lat":42.286500,"medv":21.0,"cmedv":21.0,"crim":0.08014,"zn":0.0,"indus":5.96,"chas":0,"nox":0.499,"rm":5.850,"age":41.5,"dis":3.9342,"rad":5,"tax":279,"ptratio":19.2,"b":396.90,"lstat":8.77},{"obs":39,"town":"Sargus","town_id":5,"tract":2084,"lon":-71.020000,"lat":42.287500,"medv":24.7,"cmedv":24.2,"crim":0.17505,"zn":0.0,"indus":5.96,"chas":0,"nox":0.499,"rm":5.966,"age":30.2,"dis":3.8473,"rad":5,"tax":279,"ptratio":19.2,"b":393.43,"lstat":10.13},{"obs":40,"town":"Lynnfield","town_id":6,"tract":2091,"lon":-71.013000,"lat":42.313000,"medv":30.8,"cmedv":30.8,"crim":0.02763,"zn":75.0,"indus":2.95,"chas":0,"nox":0.428,"rm":6.595,"age":21.8,"dis":5.4011,"rad":3,"tax":252,"ptratio":18.3,"b":395.63,"lstat":4.32},{"obs":41,"town":"Lynnfield","town_id":6,"tract":2092,"lon":-71.030000,"lat":42.324000,"medv":34.9,"cmedv":34.9,"crim":0.03359,"zn":75.0,"indus":2.95,"chas":0,"nox":0.428,"rm":7.024,"age":15.8,"dis":5.4011,"rad":3,"tax":252,"ptratio":18.3,"b":395.62,"lstat":1.98},{"obs":42,"town":"Peabody","town_id":7,"tract":2101,"lon":-71.004000,"lat":42.335000,"medv":26.6,"cmedv":26.6,"crim":0.12744,"zn":0.0,"indus":6.91,"chas":0,"nox":0.448,"rm":6.770,"age":2.9,"dis":5.7209,"rad":3,"tax":233,"ptratio":17.9,"b":385.41,"lstat":4.84},{"obs":43,"town":"Peabody","town_id":7,"tract":2102,"lon":-71.003000,"lat":42.323500,"medv":25.3,"cmedv":25.3,"crim":0.14150,"zn":0.0,"indus":6.91,"chas":0,"nox":0.448,"rm":6.169,"age":6.6,"dis":5.7209,"rad":3,"tax":233,"ptratio":17.9,"b":383.37,"lstat":5.81},{"obs":44,"town":"Peabody","town_id":7,"tract":2103,"lon":-70.977500,"lat":42.323700,"medv":24.7,"cmedv":24.7,"crim":0.15936,"zn":0.0,"indus":6.91,"chas":0,"nox":0.448,"rm":6.211,"age":6.5,"dis":5.7209,"rad":3,"tax":233,"ptratio":17.9,"b":394.46,"lstat":7.44},{"obs":45,"town":"Peabody","town_id":7,"tract":2104,"lon":-70.967500,"lat":42.317000,"medv":21.2,"cmedv":21.2,"crim":0.12269,"zn":0.0,"indus":6.91,"chas":0,"nox":0.448,"rm":6.069,"age":40.0,"dis":5.7209,"rad":3,"tax":233,"ptratio":17.9,"b":389.39,"lstat":9.55},{"obs":46,"town":"Peabody","town_id":7,"tract":2105,"lon":-70.972500,"lat":42.307500,"medv":19.3,"cmedv":19.3,"crim":0.17142,"zn":0.0,"indus":6.91,"chas":0,"nox":0.448,"rm":5.682,"age":33.8,"dis":5.1004,"rad":3,"tax":233,"ptratio":17.9,"b":396.90,"lstat":10.21},{"obs":47,"town":"Peabody","town_id":7,"tract":2106,"lon":-70.965000,"lat":42.307500,"medv":20.0,"cmedv":20.0,"crim":0.18836,"zn":0.0,"indus":6.91,"chas":0,"nox":0.448,"rm":5.786,"age":33.3,"dis":5.1004,"rad":3,"tax":233,"ptratio":17.9,"b":396.90,"lstat":14.15},{"obs":48,"town":"Peabody","town_id":7,"tract":2107,"lon":-70.956000,"lat":42.312500,"medv":16.6,"cmedv":16.6,"crim":0.22927,"zn":0.0,"indus":6.91,"chas":0,"nox":0.448,"rm":6.030,"age":85.5,"dis":5.6894,"rad":3,"tax":233,"ptratio":17.9,"b":392.74,"lstat":18.80},{"obs":49,"town":"Peabody","town_id":7,"tract":2108,"lon":-70.955000,"lat":42.316500,"medv":14.4,"cmedv":14.4,"crim":0.25387,"zn":0.0,"indus":6.91,"chas":0,"nox":0.448,"rm":5.399,"age":95.3,"dis":5.8700,"rad":3,"tax":233,"ptratio":17.9,"b":396.90,"lstat":30.81},{"obs":50,"town":"Peabody","town_id":7,"tract":2109,"lon":-70.952500,"lat":42.320800,"medv":19.4,"cmedv":19.4,"crim":0.21977,"zn":0.0,"indus":6.91,"chas":0,"nox":0.448,"rm":5.602,"age":62.0,"dis":6.0877,"rad":3,"tax":233,"ptratio":17.9,"b":396.90,"lstat":16.20},{"obs":51,"town":"Danvers","town_id":8,"tract":2111,"lon":-70.951000,"lat":42.334000,"medv":19.7,"cmedv":19.7,"crim":0.08873,"zn":21.0,"indus":5.64,"chas":0,"nox":0.439,"rm":5.963,"age":45.7,"dis":6.8147,"rad":4,"tax":243,"ptratio":16.8,"b":395.56,"lstat":13.45},{"obs":52,"town":"Danvers","town_id":8,"tract":2112,"lon":-70.963000,"lat":42.338200,"medv":20.5,"cmedv":20.5,"crim":0.04337,"zn":21.0,"indus":5.64,"chas":0,"nox":0.439,"rm":6.115,"age":63.0,"dis":6.8147,"rad":4,"tax":243,"ptratio":16.8,"b":393.97,"lstat":9.43},{"obs":53,"town":"Danvers","town_id":8,"tract":2113,"lon":-70.958000,"lat":42.346000,"medv":25.0,"cmedv":25.0,"crim":0.05360,"zn":21.0,"indus":5.64,"chas":0,"nox":0.439,"rm":6.511,"age":21.1,"dis":6.8147,"rad":4,"tax":243,"ptratio":16.8,"b":396.90,"lstat":5.28},{"obs":54,"town":"Danvers","town_id":8,"tract":2114,"lon":-70.978000,"lat":42.342500,"medv":23.4,"cmedv":23.4,"crim":0.04981,"zn":21.0,"indus":5.64,"chas":0,"nox":0.439,"rm":5.998,"age":21.4,"dis":6.8147,"rad":4,"tax":243,"ptratio":16.8,"b":396.90,"lstat":8.43},{"obs":55,"town":"Middleton","town_id":9,"tract":2121,"lon":-71.017500,"lat":42.371500,"medv":18.9,"cmedv":18.9,"crim":0.01360,"zn":75.0,"indus":4,"chas":0,"nox":0.41,"rm":5.888,"age":47.6,"dis":7.3197,"rad":3,"tax":469,"ptratio":21.1,"b":396.90,"lstat":14.80},{"obs":56,"town":"Topsfield","town_id":10,"tract":2141,"lon":-70.962500,"lat":42.381000,"medv":35.4,"cmedv":35.4,"crim":0.01311,"zn":90.0,"indus":1.22,"chas":0,"nox":0.403,"rm":7.249,"age":21.9,"dis":8.6966,"rad":5,"tax":226,"ptratio":17.9,"b":395.93,"lstat":4.81},{"obs":57,"town":"Hamilton","town_id":11,"tract":2151,"lon":-70.930000,"lat":42.374000,"medv":24.7,"cmedv":24.7,"crim":0.02055,"zn":85.0,"indus":0.74,"chas":0,"nox":0.41,"rm":6.383,"age":35.7,"dis":9.1876,"rad":2,"tax":313,"ptratio":17.3,"b":396.90,"lstat":5.77},{"obs":58,"town":"Wenham","town_id":12,"tract":2161,"lon":-70.929500,"lat":42.371500,"medv":31.6,"cmedv":31.6,"crim":0.01432,"zn":100.0,"indus":1.32,"chas":0,"nox":0.411,"rm":6.816,"age":40.5,"dis":8.3248,"rad":5,"tax":256,"ptratio":15.1,"b":392.90,"lstat":3.95},{"obs":59,"town":"Beverly","town_id":13,"tract":2171,"lon":-70.938500,"lat":42.346000,"medv":23.3,"cmedv":23.3,"crim":0.15445,"zn":25.0,"indus":5.13,"chas":0,"nox":0.453,"rm":6.145,"age":29.2,"dis":7.8148,"rad":8,"tax":284,"ptratio":19.7,"b":390.68,"lstat":6.86},{"obs":60,"town":"Beverly","town_id":13,"tract":2172,"lon":-70.940000,"lat":42.332000,"medv":19.6,"cmedv":19.6,"crim":0.10328,"zn":25.0,"indus":5.13,"chas":0,"nox":0.453,"rm":5.927,"age":47.2,"dis":6.9320,"rad":8,"tax":284,"ptratio":19.7,"b":396.90,"lstat":9.22},{"obs":61,"town":"Beverly","town_id":13,"tract":2173,"lon":-70.930000,"lat":42.337000,"medv":18.7,"cmedv":18.7,"crim":0.14932,"zn":25.0,"indus":5.13,"chas":0,"nox":0.453,"rm":5.741,"age":66.2,"dis":7.2254,"rad":8,"tax":284,"ptratio":19.7,"b":395.11,"lstat":13.15},{"obs":62,"town":"Beverly","town_id":13,"tract":2174,"lon":-70.930000,"lat":42.327500,"medv":16.0,"cmedv":16.0,"crim":0.17171,"zn":25.0,"indus":5.13,"chas":0,"nox":0.453,"rm":5.966,"age":93.4,"dis":6.8185,"rad":8,"tax":284,"ptratio":19.7,"b":378.08,"lstat":14.44},{"obs":63,"town":"Beverly","town_id":13,"tract":2175,"lon":-70.921500,"lat":42.332000,"medv":22.2,"cmedv":22.2,"crim":0.11027,"zn":25.0,"indus":5.13,"chas":0,"nox":0.453,"rm":6.456,"age":67.8,"dis":7.2255,"rad":8,"tax":284,"ptratio":19.7,"b":396.90,"lstat":6.73},{"obs":64,"town":"Beverly","town_id":13,"tract":2176,"lon":-70.907500,"lat":42.339000,"medv":25.0,"cmedv":25.0,"crim":0.12650,"zn":25.0,"indus":5.13,"chas":0,"nox":0.453,"rm":6.762,"age":43.4,"dis":7.9809,"rad":8,"tax":284,"ptratio":19.7,"b":395.58,"lstat":9.50},{"obs":65,"town":"Manchester","town_id":14,"tract":2181,"lon":-70.860000,"lat":42.345000,"medv":33.0,"cmedv":33.0,"crim":0.01951,"zn":17.5,"indus":1.38,"chas":0,"nox":0.4161,"rm":7.104,"age":59.5,"dis":9.2229,"rad":3,"tax":216,"ptratio":18.6,"b":393.24,"lstat":8.05},{"obs":66,"town":"North Reading","town_id":15,"tract":3301,"lon":-71.045000,"lat":42.345000,"medv":23.5,"cmedv":23.5,"crim":0.03584,"zn":80.0,"indus":3.37,"chas":0,"nox":0.398,"rm":6.290,"age":17.8,"dis":6.6115,"rad":4,"tax":337,"ptratio":16.1,"b":396.90,"lstat":4.67},{"obs":67,"town":"North Reading","town_id":15,"tract":3302,"lon":-71.069000,"lat":42.352500,"medv":19.4,"cmedv":19.4,"crim":0.04379,"zn":80.0,"indus":3.37,"chas":0,"nox":0.398,"rm":5.787,"age":31.1,"dis":6.6115,"rad":4,"tax":337,"ptratio":16.1,"b":396.90,"lstat":10.24},{"obs":68,"town":"Wilmington","town_id":16,"tract":3311,"lon":-71.090000,"lat":42.336200,"medv":22.0,"cmedv":22.0,"crim":0.05789,"zn":12.5,"indus":6.07,"chas":0,"nox":0.409,"rm":5.878,"age":21.4,"dis":6.4980,"rad":4,"tax":345,"ptratio":18.9,"b":396.21,"lstat":8.10},{"obs":69,"town":"Wilmington","town_id":16,"tract":3312,"lon":-71.108000,"lat":42.340000,"medv":17.4,"cmedv":17.4,"crim":0.13554,"zn":12.5,"indus":6.07,"chas":0,"nox":0.409,"rm":5.594,"age":36.8,"dis":6.4980,"rad":4,"tax":345,"ptratio":18.9,"b":396.90,"lstat":13.09},{"obs":70,"town":"Wilmington","town_id":16,"tract":3313,"lon":-71.111000,"lat":42.327000,"medv":20.9,"cmedv":20.9,"crim":0.12816,"zn":12.5,"indus":6.07,"chas":0,"nox":0.409,"rm":5.885,"age":33.0,"dis":6.4980,"rad":4,"tax":345,"ptratio":18.9,"b":396.90,"lstat":8.79},{"obs":71,"town":"Burlington","town_id":17,"tract":3321,"lon":-71.121000,"lat":42.316000,"medv":24.2,"cmedv":24.2,"crim":0.08826,"zn":0.0,"indus":10.81,"chas":0,"nox":0.413,"rm":6.417,"age":6.6,"dis":5.2873,"rad":4,"tax":305,"ptratio":19.2,"b":383.73,"lstat":6.72},{"obs":72,"town":"Burlington","town_id":17,"tract":3322,"lon":-71.109500,"lat":42.300800,"medv":21.7,"cmedv":21.7,"crim":0.15876,"zn":0.0,"indus":10.81,"chas":0,"nox":0.413,"rm":5.961,"age":17.5,"dis":5.2873,"rad":4,"tax":305,"ptratio":19.2,"b":376.94,"lstat":9.88},{"obs":73,"town":"Burlington","town_id":17,"tract":3323,"lon":-71.130000,"lat":42.305000,"medv":22.8,"cmedv":22.8,"crim":0.09164,"zn":0.0,"indus":10.81,"chas":0,"nox":0.413,"rm":6.065,"age":7.8,"dis":5.2873,"rad":4,"tax":305,"ptratio":19.2,"b":390.91,"lstat":5.52},{"obs":74,"town":"Burlington","town_id":17,"tract":3324,"lon":-71.123000,"lat":42.292000,"medv":23.4,"cmedv":23.4,"crim":0.19539,"zn":0.0,"indus":10.81,"chas":0,"nox":0.413,"rm":6.245,"age":6.2,"dis":5.2873,"rad":4,"tax":305,"ptratio":19.2,"b":377.17,"lstat":7.54},{"obs":75,"town":"Woburn","town_id":18,"tract":3331,"lon":-71.110500,"lat":42.289000,"medv":24.1,"cmedv":24.1,"crim":0.07896,"zn":0.0,"indus":12.83,"chas":0,"nox":0.437,"rm":6.273,"age":6.0,"dis":4.2515,"rad":5,"tax":398,"ptratio":18.7,"b":394.92,"lstat":6.78},{"obs":76,"town":"Woburn","town_id":18,"tract":3332,"lon":-71.100000,"lat":42.287500,"medv":21.4,"cmedv":21.4,"crim":0.09512,"zn":0.0,"indus":12.83,"chas":0,"nox":0.437,"rm":6.286,"age":45.0,"dis":4.5026,"rad":5,"tax":398,"ptratio":18.7,"b":383.23,"lstat":8.94},{"obs":77,"town":"Woburn","town_id":18,"tract":3333,"lon":-71.090000,"lat":42.283500,"medv":20.0,"cmedv":20.0,"crim":0.10153,"zn":0.0,"indus":12.83,"chas":0,"nox":0.437,"rm":6.279,"age":74.5,"dis":4.0522,"rad":5,"tax":398,"ptratio":18.7,"b":373.66,"lstat":11.97},{"obs":78,"town":"Woburn","town_id":18,"tract":3334,"lon":-71.076000,"lat":42.289500,"medv":20.8,"cmedv":20.8,"crim":0.08707,"zn":0.0,"indus":12.83,"chas":0,"nox":0.437,"rm":6.140,"age":45.8,"dis":4.0905,"rad":5,"tax":398,"ptratio":18.7,"b":386.96,"lstat":10.27},{"obs":79,"town":"Woburn","town_id":18,"tract":3335,"lon":-71.090500,"lat":42.295000,"medv":21.2,"cmedv":21.2,"crim":0.05646,"zn":0.0,"indus":12.83,"chas":0,"nox":0.437,"rm":6.232,"age":53.7,"dis":5.0141,"rad":5,"tax":398,"ptratio":18.7,"b":386.40,"lstat":12.34},{"obs":80,"town":"Woburn","town_id":18,"tract":3336,"lon":-71.091000,"lat":42.305000,"medv":20.3,"cmedv":20.3,"crim":0.08387,"zn":0.0,"indus":12.83,"chas":0,"nox":0.437,"rm":5.874,"age":36.6,"dis":4.5026,"rad":5,"tax":398,"ptratio":18.7,"b":396.06,"lstat":9.10},{"obs":81,"town":"Reading","town_id":19,"tract":3341,"lon":-71.068500,"lat":42.308000,"medv":28.0,"cmedv":28.0,"crim":0.04113,"zn":25.0,"indus":4.86,"chas":0,"nox":0.426,"rm":6.727,"age":33.5,"dis":5.4007,"rad":4,"tax":281,"ptratio":19.0,"b":396.90,"lstat":5.29},{"obs":82,"town":"Reading","town_id":19,"tract":3342,"lon":-71.069000,"lat":42.315000,"medv":23.9,"cmedv":23.9,"crim":0.04462,"zn":25.0,"indus":4.86,"chas":0,"nox":0.426,"rm":6.619,"age":70.4,"dis":5.4007,"rad":4,"tax":281,"ptratio":19.0,"b":395.63,"lstat":7.22},{"obs":83,"town":"Reading","town_id":19,"tract":3343,"lon":-71.067500,"lat":42.326000,"medv":24.8,"cmedv":24.8,"crim":0.03659,"zn":25.0,"indus":4.86,"chas":0,"nox":0.426,"rm":6.302,"age":32.2,"dis":5.4007,"rad":4,"tax":281,"ptratio":19.0,"b":396.90,"lstat":6.72},{"obs":84,"town":"Reading","town_id":19,"tract":3344,"lon":-71.057500,"lat":42.317000,"medv":22.9,"cmedv":22.9,"crim":0.03551,"zn":25.0,"indus":4.86,"chas":0,"nox":0.426,"rm":6.167,"age":46.7,"dis":5.4007,"rad":4,"tax":281,"ptratio":19.0,"b":390.64,"lstat":7.51},{"obs":85,"town":"Wakefield","town_id":20,"tract":3351,"lon":-71.043000,"lat":42.307500,"medv":23.9,"cmedv":23.9,"crim":0.05059,"zn":0.0,"indus":4.49,"chas":0,"nox":0.449,"rm":6.389,"age":48.0,"dis":4.7794,"rad":3,"tax":247,"ptratio":18.5,"b":396.90,"lstat":9.62},{"obs":86,"town":"Wakefield","town_id":20,"tract":3352,"lon":-71.050000,"lat":42.300000,"medv":26.6,"cmedv":26.6,"crim":0.05735,"zn":0.0,"indus":4.49,"chas":0,"nox":0.449,"rm":6.630,"age":56.1,"dis":4.4377,"rad":3,"tax":247,"ptratio":18.5,"b":392.30,"lstat":6.53},{"obs":87,"town":"Wakefield","town_id":20,"tract":3353,"lon":-71.033000,"lat":42.305000,"medv":22.5,"cmedv":22.5,"crim":0.05188,"zn":0.0,"indus":4.49,"chas":0,"nox":0.449,"rm":6.015,"age":45.1,"dis":4.4272,"rad":3,"tax":247,"ptratio":18.5,"b":395.99,"lstat":12.86},{"obs":88,"town":"Wakefield","town_id":20,"tract":3354,"lon":-71.039000,"lat":42.288500,"medv":22.2,"cmedv":22.2,"crim":0.07151,"zn":0.0,"indus":4.49,"chas":0,"nox":0.449,"rm":6.121,"age":56.8,"dis":3.7476,"rad":3,"tax":247,"ptratio":18.5,"b":395.15,"lstat":8.44},{"obs":89,"town":"Melrose","town_id":21,"tract":3361,"lon":-71.042000,"lat":42.279600,"medv":23.6,"cmedv":23.6,"crim":0.05660,"zn":0.0,"indus":3.41,"chas":0,"nox":0.489,"rm":7.007,"age":86.3,"dis":3.4217,"rad":2,"tax":270,"ptratio":17.8,"b":396.90,"lstat":5.50},{"obs":90,"town":"Melrose","town_id":21,"tract":3362,"lon":-71.034500,"lat":42.278500,"medv":28.7,"cmedv":28.7,"crim":0.05302,"zn":0.0,"indus":3.41,"chas":0,"nox":0.489,"rm":7.079,"age":63.1,"dis":3.4145,"rad":2,"tax":270,"ptratio":17.8,"b":396.06,"lstat":5.70},{"obs":91,"town":"Melrose","town_id":21,"tract":3363,"lon":-71.030000,"lat":42.272000,"medv":22.6,"cmedv":22.6,"crim":0.04684,"zn":0.0,"indus":3.41,"chas":0,"nox":0.489,"rm":6.417,"age":66.1,"dis":3.0923,"rad":2,"tax":270,"ptratio":17.8,"b":392.18,"lstat":8.81},{"obs":92,"town":"Melrose","town_id":21,"tract":3364,"lon":-71.042500,"lat":42.271500,"medv":22.0,"cmedv":22.0,"crim":0.03932,"zn":0.0,"indus":3.41,"chas":0,"nox":0.489,"rm":6.405,"age":73.9,"dis":3.0921,"rad":2,"tax":270,"ptratio":17.8,"b":393.55,"lstat":8.20},{"obs":93,"town":"Stoneham","town_id":22,"tract":3371,"lon":-71.053000,"lat":42.283000,"medv":22.9,"cmedv":22.9,"crim":0.04203,"zn":28.0,"indus":15.04,"chas":0,"nox":0.464,"rm":6.442,"age":53.6,"dis":3.6659,"rad":4,"tax":270,"ptratio":18.2,"b":395.01,"lstat":8.16},{"obs":94,"town":"Stoneham","town_id":22,"tract":3372,"lon":-71.062000,"lat":42.296000,"medv":25.0,"cmedv":25.0,"crim":0.02875,"zn":28.0,"indus":15.04,"chas":0,"nox":0.464,"rm":6.211,"age":28.9,"dis":3.6659,"rad":4,"tax":270,"ptratio":18.2,"b":396.33,"lstat":6.21},{"obs":95,"town":"Stoneham","town_id":22,"tract":3373,"lon":-71.061500,"lat":42.284000,"medv":20.6,"cmedv":20.6,"crim":0.04294,"zn":28.0,"indus":15.04,"chas":0,"nox":0.464,"rm":6.249,"age":77.3,"dis":3.6150,"rad":4,"tax":270,"ptratio":18.2,"b":396.90,"lstat":10.59},{"obs":96,"town":"Winchester","town_id":23,"tract":3381,"lon":-71.076000,"lat":42.277500,"medv":28.4,"cmedv":28.4,"crim":0.12204,"zn":0.0,"indus":2.89,"chas":0,"nox":0.445,"rm":6.625,"age":57.8,"dis":3.4952,"rad":2,"tax":276,"ptratio":18.0,"b":357.98,"lstat":6.65},{"obs":97,"town":"Winchester","town_id":23,"tract":3382,"lon":-71.085000,"lat":42.277500,"medv":21.4,"cmedv":21.4,"crim":0.11504,"zn":0.0,"indus":2.89,"chas":0,"nox":0.445,"rm":6.163,"age":69.6,"dis":3.4952,"rad":2,"tax":276,"ptratio":18.0,"b":391.83,"lstat":11.34},{"obs":98,"town":"Winchester","town_id":23,"tract":3383,"lon":-71.089000,"lat":42.271500,"medv":38.7,"cmedv":38.7,"crim":0.12083,"zn":0.0,"indus":2.89,"chas":0,"nox":0.445,"rm":8.069,"age":76.0,"dis":3.4952,"rad":2,"tax":276,"ptratio":18.0,"b":396.90,"lstat":4.21},{"obs":99,"town":"Winchester","town_id":23,"tract":3384,"lon":-71.098200,"lat":42.268500,"medv":43.8,"cmedv":43.8,"crim":0.08187,"zn":0.0,"indus":2.89,"chas":0,"nox":0.445,"rm":7.820,"age":36.9,"dis":3.4952,"rad":2,"tax":276,"ptratio":18.0,"b":393.53,"lstat":3.57},{"obs":100,"town":"Winchester","town_id":23,"tract":3385,"lon":-71.080000,"lat":42.268000,"medv":33.2,"cmedv":33.2,"crim":0.06860,"zn":0.0,"indus":2.89,"chas":0,"nox":0.445,"rm":7.416,"age":62.5,"dis":3.4952,"rad":2,"tax":276,"ptratio":18.0,"b":396.90,"lstat":6.19},{"obs":101,"town":"Medford","town_id":24,"tract":3391,"lon":-71.066800,"lat":42.254500,"medv":27.5,"cmedv":27.5,"crim":0.14866,"zn":0.0,"indus":8.56,"chas":0,"nox":0.52,"rm":6.727,"age":79.9,"dis":2.7778,"rad":5,"tax":384,"ptratio":20.9,"b":394.76,"lstat":9.42},{"obs":102,"town":"Medford","town_id":24,"tract":3392,"lon":-71.081000,"lat":42.245000,"medv":26.5,"cmedv":26.5,"crim":0.11432,"zn":0.0,"indus":8.56,"chas":0,"nox":0.52,"rm":6.781,"age":71.3,"dis":2.8561,"rad":5,"tax":384,"ptratio":20.9,"b":395.58,"lstat":7.67},{"obs":103,"town":"Medford","town_id":24,"tract":3393,"lon":-71.081200,"lat":42.251500,"medv":18.6,"cmedv":18.6,"crim":0.22876,"zn":0.0,"indus":8.56,"chas":0,"nox":0.52,"rm":6.405,"age":85.4,"dis":2.7147,"rad":5,"tax":384,"ptratio":20.9,"b":70.80,"lstat":10.63},{"obs":104,"town":"Medford","town_id":24,"tract":3394,"lon":-71.077000,"lat":42.249000,"medv":19.3,"cmedv":19.3,"crim":0.21161,"zn":0.0,"indus":8.56,"chas":0,"nox":0.52,"rm":6.137,"age":87.4,"dis":2.7147,"rad":5,"tax":384,"ptratio":20.9,"b":394.47,"lstat":13.44},{"obs":105,"town":"Medford","town_id":24,"tract":3395,"lon":-71.069000,"lat":42.248000,"medv":20.1,"cmedv":20.1,"crim":0.13960,"zn":0.0,"indus":8.56,"chas":0,"nox":0.52,"rm":6.167,"age":90.0,"dis":2.4210,"rad":5,"tax":384,"ptratio":20.9,"b":392.69,"lstat":12.33},{"obs":106,"town":"Medford","town_id":24,"tract":3396,"lon":-71.066200,"lat":42.242500,"medv":19.5,"cmedv":19.5,"crim":0.13262,"zn":0.0,"indus":8.56,"chas":0,"nox":0.52,"rm":5.851,"age":96.7,"dis":2.1069,"rad":5,"tax":384,"ptratio":20.9,"b":394.05,"lstat":16.47},{"obs":107,"town":"Medford","town_id":24,"tract":3397,"lon":-71.062200,"lat":42.243100,"medv":19.5,"cmedv":19.5,"crim":0.17120,"zn":0.0,"indus":8.56,"chas":0,"nox":0.52,"rm":5.836,"age":91.9,"dis":2.2110,"rad":5,"tax":384,"ptratio":20.9,"b":395.67,"lstat":18.66},{"obs":108,"town":"Medford","town_id":24,"tract":3398,"lon":-71.055300,"lat":42.246500,"medv":20.4,"cmedv":20.4,"crim":0.13117,"zn":0.0,"indus":8.56,"chas":0,"nox":0.52,"rm":6.127,"age":85.2,"dis":2.1224,"rad":5,"tax":384,"ptratio":20.9,"b":387.69,"lstat":14.09},{"obs":109,"town":"Medford","town_id":24,"tract":3399,"lon":-71.055000,"lat":42.250500,"medv":19.8,"cmedv":19.8,"crim":0.12802,"zn":0.0,"indus":8.56,"chas":0,"nox":0.52,"rm":6.474,"age":97.1,"dis":2.4329,"rad":5,"tax":384,"ptratio":20.9,"b":395.24,"lstat":12.27},{"obs":110,"town":"Medford","town_id":24,"tract":3400,"lon":-71.060000,"lat":42.254000,"medv":19.4,"cmedv":19.4,"crim":0.26363,"zn":0.0,"indus":8.56,"chas":0,"nox":0.52,"rm":6.229,"age":91.2,"dis":2.5451,"rad":5,"tax":384,"ptratio":20.9,"b":391.23,"lstat":15.55},{"obs":111,"town":"Medford","town_id":24,"tract":3401,"lon":-71.056000,"lat":42.260500,"medv":21.7,"cmedv":21.7,"crim":0.10793,"zn":0.0,"indus":8.56,"chas":0,"nox":0.52,"rm":6.195,"age":54.4,"dis":2.7778,"rad":5,"tax":384,"ptratio":20.9,"b":393.49,"lstat":13.00},{"obs":112,"town":"Malden","town_id":25,"tract":3411,"lon":-71.047500,"lat":42.261000,"medv":22.8,"cmedv":22.8,"crim":0.10084,"zn":0.0,"indus":10.01,"chas":0,"nox":0.547,"rm":6.715,"age":81.6,"dis":2.6775,"rad":6,"tax":432,"ptratio":17.8,"b":395.59,"lstat":10.16},{"obs":113,"town":"Malden","town_id":25,"tract":3412,"lon":-71.049000,"lat":42.253000,"medv":18.8,"cmedv":18.8,"crim":0.12329,"zn":0.0,"indus":10.01,"chas":0,"nox":0.547,"rm":5.913,"age":92.9,"dis":2.3534,"rad":6,"tax":432,"ptratio":17.8,"b":394.95,"lstat":16.21},{"obs":114,"town":"Malden","town_id":25,"tract":3413,"lon":-71.042800,"lat":42.258000,"medv":18.7,"cmedv":18.7,"crim":0.22212,"zn":0.0,"indus":10.01,"chas":0,"nox":0.547,"rm":6.092,"age":95.4,"dis":2.5480,"rad":6,"tax":432,"ptratio":17.8,"b":396.90,"lstat":17.09},{"obs":115,"town":"Malden","town_id":25,"tract":3414,"lon":-71.039600,"lat":42.251200,"medv":18.5,"cmedv":18.5,"crim":0.14231,"zn":0.0,"indus":10.01,"chas":0,"nox":0.547,"rm":6.254,"age":84.2,"dis":2.2565,"rad":6,"tax":432,"ptratio":17.8,"b":388.74,"lstat":10.45},{"obs":116,"town":"Malden","town_id":25,"tract":3415,"lon":-71.035500,"lat":42.254500,"medv":18.3,"cmedv":18.3,"crim":0.17134,"zn":0.0,"indus":10.01,"chas":0,"nox":0.547,"rm":5.928,"age":88.2,"dis":2.4631,"rad":6,"tax":432,"ptratio":17.8,"b":344.91,"lstat":15.76},{"obs":117,"town":"Malden","town_id":25,"tract":3416,"lon":-71.036000,"lat":42.260800,"medv":21.2,"cmedv":21.2,"crim":0.13158,"zn":0.0,"indus":10.01,"chas":0,"nox":0.547,"rm":6.176,"age":72.5,"dis":2.7301,"rad":6,"tax":432,"ptratio":17.8,"b":393.30,"lstat":12.04},{"obs":118,"town":"Malden","town_id":25,"tract":3417,"lon":-71.028500,"lat":42.262000,"medv":19.2,"cmedv":19.2,"crim":0.15098,"zn":0.0,"indus":10.01,"chas":0,"nox":0.547,"rm":6.021,"age":82.6,"dis":2.7474,"rad":6,"tax":432,"ptratio":17.8,"b":394.51,"lstat":10.30},{"obs":119,"town":"Malden","town_id":25,"tract":3418,"lon":-71.028500,"lat":42.258000,"medv":20.4,"cmedv":20.4,"crim":0.13058,"zn":0.0,"indus":10.01,"chas":0,"nox":0.547,"rm":5.872,"age":73.1,"dis":2.4775,"rad":6,"tax":432,"ptratio":17.8,"b":338.63,"lstat":15.37},{"obs":120,"town":"Malden","town_id":25,"tract":3419,"lon":-71.019000,"lat":42.260500,"medv":19.3,"cmedv":19.3,"crim":0.14476,"zn":0.0,"indus":10.01,"chas":0,"nox":0.547,"rm":5.731,"age":65.2,"dis":2.7592,"rad":6,"tax":432,"ptratio":17.8,"b":391.50,"lstat":13.61},{"obs":121,"town":"Everett","town_id":26,"tract":3421,"lon":-71.024300,"lat":42.248300,"medv":22.0,"cmedv":22.0,"crim":0.06899,"zn":0.0,"indus":25.65,"chas":0,"nox":0.581,"rm":5.870,"age":69.7,"dis":2.2577,"rad":2,"tax":188,"ptratio":19.1,"b":389.15,"lstat":14.37},{"obs":122,"town":"Everett","town_id":26,"tract":3422,"lon":-71.031200,"lat":42.250500,"medv":20.3,"cmedv":20.3,"crim":0.07165,"zn":0.0,"indus":25.65,"chas":0,"nox":0.581,"rm":6.004,"age":84.1,"dis":2.1974,"rad":2,"tax":188,"ptratio":19.1,"b":377.67,"lstat":14.27},{"obs":123,"town":"Everett","town_id":26,"tract":3423,"lon":-71.037700,"lat":42.247000,"medv":20.5,"cmedv":20.5,"crim":0.09299,"zn":0.0,"indus":25.65,"chas":0,"nox":0.581,"rm":5.961,"age":92.9,"dis":2.0869,"rad":2,"tax":188,"ptratio":19.1,"b":378.09,"lstat":17.93},{"obs":124,"town":"Everett","town_id":26,"tract":3424,"lon":-71.037000,"lat":42.243500,"medv":17.3,"cmedv":17.3,"crim":0.15038,"zn":0.0,"indus":25.65,"chas":0,"nox":0.581,"rm":5.856,"age":97.0,"dis":1.9444,"rad":2,"tax":188,"ptratio":19.1,"b":370.31,"lstat":25.41},{"obs":125,"town":"Everett","town_id":26,"tract":3425,"lon":-71.030800,"lat":42.245000,"medv":18.8,"cmedv":18.8,"crim":0.09849,"zn":0.0,"indus":25.65,"chas":0,"nox":0.581,"rm":5.879,"age":95.8,"dis":2.0063,"rad":2,"tax":188,"ptratio":19.1,"b":379.38,"lstat":17.58},{"obs":126,"town":"Everett","town_id":26,"tract":3426,"lon":-71.026200,"lat":42.243100,"medv":21.4,"cmedv":21.4,"crim":0.16902,"zn":0.0,"indus":25.65,"chas":0,"nox":0.581,"rm":5.986,"age":88.4,"dis":1.9929,"rad":2,"tax":188,"ptratio":19.1,"b":385.02,"lstat":14.81},{"obs":127,"town":"Everett","town_id":26,"tract":3427,"lon":-71.033300,"lat":42.239500,"medv":15.7,"cmedv":15.7,"crim":0.38735,"zn":0.0,"indus":25.65,"chas":0,"nox":0.581,"rm":5.613,"age":95.6,"dis":1.7572,"rad":2,"tax":188,"ptratio":19.1,"b":359.29,"lstat":27.26},{"obs":128,"town":"Somerville","town_id":27,"tract":3501,"lon":-71.053000,"lat":42.235500,"medv":16.2,"cmedv":16.2,"crim":0.25915,"zn":0.0,"indus":21.89,"chas":0,"nox":0.624,"rm":5.693,"age":96.0,"dis":1.7883,"rad":4,"tax":437,"ptratio":21.2,"b":392.11,"lstat":17.19},{"obs":129,"town":"Somerville","town_id":27,"tract":3502,"lon":-71.058000,"lat":42.235000,"medv":18.0,"cmedv":18.0,"crim":0.32543,"zn":0.0,"indus":21.89,"chas":0,"nox":0.624,"rm":6.431,"age":98.8,"dis":1.8125,"rad":4,"tax":437,"ptratio":21.2,"b":396.90,"lstat":15.39},{"obs":130,"town":"Somerville","town_id":27,"tract":3503,"lon":-71.063800,"lat":42.236800,"medv":14.3,"cmedv":14.3,"crim":0.88125,"zn":0.0,"indus":21.89,"chas":0,"nox":0.624,"rm":5.637,"age":94.7,"dis":1.9799,"rad":4,"tax":437,"ptratio":21.2,"b":396.90,"lstat":18.34},{"obs":131,"town":"Somerville","town_id":27,"tract":3504,"lon":-71.069200,"lat":42.239000,"medv":19.2,"cmedv":19.2,"crim":0.34006,"zn":0.0,"indus":21.89,"chas":0,"nox":0.624,"rm":6.458,"age":98.9,"dis":2.1185,"rad":4,"tax":437,"ptratio":21.2,"b":395.04,"lstat":12.60},{"obs":132,"town":"Somerville","town_id":27,"tract":3505,"lon":-71.075000,"lat":42.240000,"medv":19.6,"cmedv":19.6,"crim":1.19294,"zn":0.0,"indus":21.89,"chas":0,"nox":0.624,"rm":6.326,"age":97.7,"dis":2.2710,"rad":4,"tax":437,"ptratio":21.2,"b":396.90,"lstat":12.26},{"obs":133,"town":"Somerville","town_id":27,"tract":3506,"lon":-71.074500,"lat":42.240500,"medv":23.0,"cmedv":23.0,"crim":0.59005,"zn":0.0,"indus":21.89,"chas":0,"nox":0.624,"rm":6.372,"age":97.9,"dis":2.3274,"rad":4,"tax":437,"ptratio":21.2,"b":385.76,"lstat":11.12},{"obs":134,"town":"Somerville","town_id":27,"tract":3507,"lon":-71.079000,"lat":42.245000,"medv":18.4,"cmedv":18.4,"crim":0.32982,"zn":0.0,"indus":21.89,"chas":0,"nox":0.624,"rm":5.822,"age":95.4,"dis":2.4699,"rad":4,"tax":437,"ptratio":21.2,"b":388.69,"lstat":15.03},{"obs":135,"town":"Somerville","town_id":27,"tract":3508,"lon":-71.076000,"lat":42.240500,"medv":15.6,"cmedv":15.6,"crim":0.97617,"zn":0.0,"indus":21.89,"chas":0,"nox":0.624,"rm":5.757,"age":98.4,"dis":2.3460,"rad":4,"tax":437,"ptratio":21.2,"b":262.76,"lstat":17.31},{"obs":136,"town":"Somerville","town_id":27,"tract":3509,"lon":-71.075000,"lat":42.236200,"medv":18.1,"cmedv":18.1,"crim":0.55778,"zn":0.0,"indus":21.89,"chas":0,"nox":0.624,"rm":6.335,"age":98.2,"dis":2.1107,"rad":4,"tax":437,"ptratio":21.2,"b":394.67,"lstat":16.96},{"obs":137,"town":"Somerville","town_id":27,"tract":3510,"lon":-71.067700,"lat":42.233500,"medv":17.4,"cmedv":17.4,"crim":0.32264,"zn":0.0,"indus":21.89,"chas":0,"nox":0.624,"rm":5.942,"age":93.5,"dis":1.9669,"rad":4,"tax":437,"ptratio":21.2,"b":378.25,"lstat":16.90},{"obs":138,"town":"Somerville","town_id":27,"tract":3511,"lon":-71.063000,"lat":42.232500,"medv":17.1,"cmedv":17.1,"crim":0.35233,"zn":0.0,"indus":21.89,"chas":0,"nox":0.624,"rm":6.454,"age":98.4,"dis":1.8498,"rad":4,"tax":437,"ptratio":21.2,"b":394.08,"lstat":14.59},{"obs":139,"town":"Somerville","town_id":27,"tract":3512,"lon":-71.062000,"lat":42.227500,"medv":13.3,"cmedv":13.3,"crim":0.24980,"zn":0.0,"indus":21.89,"chas":0,"nox":0.624,"rm":5.857,"age":98.2,"dis":1.6686,"rad":4,"tax":437,"ptratio":21.2,"b":392.04,"lstat":21.32},{"obs":140,"town":"Somerville","town_id":27,"tract":3513,"lon":-71.056800,"lat":42.230000,"medv":17.8,"cmedv":17.8,"crim":0.54452,"zn":0.0,"indus":21.89,"chas":0,"nox":0.624,"rm":6.151,"age":97.9,"dis":1.6687,"rad":4,"tax":437,"ptratio":21.2,"b":396.90,"lstat":18.46},{"obs":141,"town":"Somerville","town_id":27,"tract":3514,"lon":-71.051800,"lat":42.231200,"medv":14.0,"cmedv":14.0,"crim":0.29090,"zn":0.0,"indus":21.89,"chas":0,"nox":0.624,"rm":6.174,"age":93.6,"dis":1.6119,"rad":4,"tax":437,"ptratio":21.2,"b":388.08,"lstat":24.16},{"obs":142,"town":"Somerville","town_id":27,"tract":3515,"lon":-71.054300,"lat":42.226500,"medv":14.4,"cmedv":14.4,"crim":1.62864,"zn":0.0,"indus":21.89,"chas":0,"nox":0.624,"rm":5.019,"age":100.0,"dis":1.4394,"rad":4,"tax":437,"ptratio":21.2,"b":396.90,"lstat":34.41},{"obs":143,"town":"Cambridge","town_id":28,"tract":3521,"lon":-71.048000,"lat":42.222200,"medv":13.4,"cmedv":13.4,"crim":3.32105,"zn":0.0,"indus":19.58,"chas":1,"nox":0.871,"rm":5.403,"age":100.0,"dis":1.3216,"rad":5,"tax":403,"ptratio":14.7,"b":396.90,"lstat":26.82},{"obs":144,"town":"Cambridge","town_id":28,"tract":3522,"lon":-71.051900,"lat":42.223000,"medv":15.6,"cmedv":15.6,"crim":4.09740,"zn":0.0,"indus":19.58,"chas":0,"nox":0.871,"rm":5.468,"age":100.0,"dis":1.4118,"rad":5,"tax":403,"ptratio":14.7,"b":396.90,"lstat":26.42},{"obs":145,"town":"Cambridge","town_id":28,"tract":3523,"lon":-71.051000,"lat":42.220500,"medv":11.8,"cmedv":11.8,"crim":2.77974,"zn":0.0,"indus":19.58,"chas":0,"nox":0.871,"rm":4.903,"age":97.8,"dis":1.3459,"rad":5,"tax":403,"ptratio":14.7,"b":396.90,"lstat":29.29},{"obs":146,"town":"Cambridge","town_id":28,"tract":3524,"lon":-71.054000,"lat":42.219000,"medv":13.8,"cmedv":13.8,"crim":2.37934,"zn":0.0,"indus":19.58,"chas":0,"nox":0.871,"rm":6.130,"age":100.0,"dis":1.4191,"rad":5,"tax":403,"ptratio":14.7,"b":172.91,"lstat":27.80},{"obs":147,"town":"Cambridge","town_id":28,"tract":3525,"lon":-71.059000,"lat":42.221000,"medv":15.6,"cmedv":15.6,"crim":2.15505,"zn":0.0,"indus":19.58,"chas":0,"nox":0.871,"rm":5.628,"age":100.0,"dis":1.5166,"rad":5,"tax":403,"ptratio":14.7,"b":169.27,"lstat":16.65},{"obs":148,"town":"Cambridge","town_id":28,"tract":3526,"lon":-71.055500,"lat":42.222200,"medv":14.6,"cmedv":14.6,"crim":2.36862,"zn":0.0,"indus":19.58,"chas":0,"nox":0.871,"rm":4.926,"age":95.7,"dis":1.4608,"rad":5,"tax":403,"ptratio":14.7,"b":391.71,"lstat":29.53},{"obs":149,"town":"Cambridge","town_id":28,"tract":3527,"lon":-71.056700,"lat":42.224000,"medv":17.8,"cmedv":17.8,"crim":2.33099,"zn":0.0,"indus":19.58,"chas":0,"nox":0.871,"rm":5.186,"age":93.8,"dis":1.5296,"rad":5,"tax":403,"ptratio":14.7,"b":356.99,"lstat":28.32},{"obs":150,"town":"Cambridge","town_id":28,"tract":3528,"lon":-71.058000,"lat":42.223000,"medv":15.4,"cmedv":15.4,"crim":2.73397,"zn":0.0,"indus":19.58,"chas":0,"nox":0.871,"rm":5.597,"age":94.9,"dis":1.5257,"rad":5,"tax":403,"ptratio":14.7,"b":351.85,"lstat":21.45},{"obs":151,"town":"Cambridge","town_id":28,"tract":3529,"lon":-71.062000,"lat":42.223600,"medv":21.5,"cmedv":21.5,"crim":1.65660,"zn":0.0,"indus":19.58,"chas":0,"nox":0.871,"rm":6.122,"age":97.3,"dis":1.6180,"rad":5,"tax":403,"ptratio":14.7,"b":372.80,"lstat":14.10},{"obs":152,"town":"Cambridge","town_id":28,"tract":3530,"lon":-71.062200,"lat":42.220500,"medv":19.6,"cmedv":19.6,"crim":1.49632,"zn":0.0,"indus":19.58,"chas":0,"nox":0.871,"rm":5.404,"age":100.0,"dis":1.5916,"rad":5,"tax":403,"ptratio":14.7,"b":341.60,"lstat":13.28},{"obs":153,"town":"Cambridge","town_id":28,"tract":3531,"lon":-71.059000,"lat":42.217000,"medv":15.3,"cmedv":15.3,"crim":1.12658,"zn":0.0,"indus":19.58,"chas":1,"nox":0.871,"rm":5.012,"age":88.0,"dis":1.6102,"rad":5,"tax":403,"ptratio":14.7,"b":343.28,"lstat":12.12},{"obs":154,"town":"Cambridge","town_id":28,"tract":3532,"lon":-71.064500,"lat":42.215000,"medv":19.4,"cmedv":19.4,"crim":2.14918,"zn":0.0,"indus":19.58,"chas":0,"nox":0.871,"rm":5.709,"age":98.5,"dis":1.6232,"rad":5,"tax":403,"ptratio":14.7,"b":261.95,"lstat":15.79},{"obs":155,"town":"Cambridge","town_id":28,"tract":3533,"lon":-71.066200,"lat":42.216200,"medv":17.0,"cmedv":17.0,"crim":1.41385,"zn":0.0,"indus":19.58,"chas":1,"nox":0.871,"rm":6.129,"age":96.0,"dis":1.7494,"rad":5,"tax":403,"ptratio":14.7,"b":321.02,"lstat":15.12},{"obs":156,"town":"Cambridge","town_id":28,"tract":3534,"lon":-71.068000,"lat":42.215000,"medv":15.6,"cmedv":15.6,"crim":3.53501,"zn":0.0,"indus":19.58,"chas":1,"nox":0.871,"rm":6.152,"age":82.6,"dis":1.7455,"rad":5,"tax":403,"ptratio":14.7,"b":88.01,"lstat":15.02},{"obs":157,"town":"Cambridge","town_id":28,"tract":3535,"lon":-71.066700,"lat":42.220000,"medv":13.1,"cmedv":13.1,"crim":2.44668,"zn":0.0,"indus":19.58,"chas":0,"nox":0.871,"rm":5.272,"age":94.0,"dis":1.7364,"rad":5,"tax":403,"ptratio":14.7,"b":88.63,"lstat":16.14},{"obs":158,"town":"Cambridge","town_id":28,"tract":3536,"lon":-71.069000,"lat":42.228500,"medv":41.3,"cmedv":41.3,"crim":1.22358,"zn":0.0,"indus":19.58,"chas":0,"nox":0.605,"rm":6.943,"age":97.4,"dis":1.8773,"rad":5,"tax":403,"ptratio":14.7,"b":363.43,"lstat":4.59},{"obs":159,"town":"Cambridge","town_id":28,"tract":3537,"lon":-71.067000,"lat":42.224500,"medv":24.3,"cmedv":24.3,"crim":1.34284,"zn":0.0,"indus":19.58,"chas":0,"nox":0.605,"rm":6.066,"age":100.0,"dis":1.7573,"rad":5,"tax":403,"ptratio":14.7,"b":353.89,"lstat":6.43},{"obs":160,"town":"Cambridge","town_id":28,"tract":3538,"lon":-71.065000,"lat":42.222300,"medv":23.3,"cmedv":23.3,"crim":1.42502,"zn":0.0,"indus":19.58,"chas":0,"nox":0.871,"rm":6.510,"age":100.0,"dis":1.7659,"rad":5,"tax":403,"ptratio":14.7,"b":364.31,"lstat":7.39},{"obs":161,"town":"Cambridge","town_id":28,"tract":3539,"lon":-71.070000,"lat":42.221400,"medv":27.0,"cmedv":27.0,"crim":1.27346,"zn":0.0,"indus":19.58,"chas":1,"nox":0.605,"rm":6.250,"age":92.6,"dis":1.7984,"rad":5,"tax":403,"ptratio":14.7,"b":338.92,"lstat":5.50},{"obs":162,"town":"Cambridge","town_id":28,"tract":3540,"lon":-71.073500,"lat":42.228200,"medv":50.0,"cmedv":50.0,"crim":1.46336,"zn":0.0,"indus":19.58,"chas":0,"nox":0.605,"rm":7.489,"age":90.8,"dis":1.9709,"rad":5,"tax":403,"ptratio":14.7,"b":374.43,"lstat":1.73},{"obs":163,"town":"Cambridge","town_id":28,"tract":3541,"lon":-71.077000,"lat":42.225000,"medv":50.0,"cmedv":50.0,"crim":1.83377,"zn":0.0,"indus":19.58,"chas":1,"nox":0.605,"rm":7.802,"age":98.2,"dis":2.0407,"rad":5,"tax":403,"ptratio":14.7,"b":389.61,"lstat":1.92},{"obs":164,"town":"Cambridge","town_id":28,"tract":3542,"lon":-71.081500,"lat":42.225000,"medv":50.0,"cmedv":50.0,"crim":1.51902,"zn":0.0,"indus":19.58,"chas":1,"nox":0.605,"rm":8.375,"age":93.9,"dis":2.1620,"rad":5,"tax":403,"ptratio":14.7,"b":388.45,"lstat":3.32},{"obs":165,"town":"Cambridge","town_id":28,"tract":3543,"lon":-71.091800,"lat":42.226500,"medv":22.7,"cmedv":22.7,"crim":2.24236,"zn":0.0,"indus":19.58,"chas":0,"nox":0.605,"rm":5.854,"age":91.8,"dis":2.4220,"rad":5,"tax":403,"ptratio":14.7,"b":395.11,"lstat":11.64},{"obs":166,"town":"Cambridge","town_id":28,"tract":3544,"lon":-71.082000,"lat":42.229500,"medv":25.0,"cmedv":25.0,"crim":2.92400,"zn":0.0,"indus":19.58,"chas":0,"nox":0.605,"rm":6.101,"age":93.0,"dis":2.2834,"rad":5,"tax":403,"ptratio":14.7,"b":240.16,"lstat":9.81},{"obs":167,"town":"Cambridge","town_id":28,"tract":3545,"lon":-71.077000,"lat":42.230500,"medv":50.0,"cmedv":50.0,"crim":2.01019,"zn":0.0,"indus":19.58,"chas":0,"nox":0.605,"rm":7.929,"age":96.2,"dis":2.0459,"rad":5,"tax":403,"ptratio":14.7,"b":369.30,"lstat":3.70},{"obs":168,"town":"Cambridge","town_id":28,"tract":3546,"lon":-71.086600,"lat":42.234500,"medv":23.8,"cmedv":23.8,"crim":1.80028,"zn":0.0,"indus":19.58,"chas":0,"nox":0.605,"rm":5.877,"age":79.2,"dis":2.4259,"rad":5,"tax":403,"ptratio":14.7,"b":227.61,"lstat":12.14},{"obs":169,"town":"Cambridge","town_id":28,"tract":3547,"lon":-71.074000,"lat":42.233100,"medv":23.8,"cmedv":23.8,"crim":2.30040,"zn":0.0,"indus":19.58,"chas":0,"nox":0.605,"rm":6.319,"age":96.1,"dis":2.1000,"rad":5,"tax":403,"ptratio":14.7,"b":297.09,"lstat":11.10},{"obs":170,"town":"Cambridge","town_id":28,"tract":3548,"lon":-71.077500,"lat":42.235100,"medv":22.3,"cmedv":22.3,"crim":2.44953,"zn":0.0,"indus":19.58,"chas":0,"nox":0.605,"rm":6.402,"age":95.2,"dis":2.2625,"rad":5,"tax":403,"ptratio":14.7,"b":330.04,"lstat":11.32},{"obs":171,"town":"Cambridge","town_id":28,"tract":3549,"lon":-71.081000,"lat":42.236800,"medv":17.4,"cmedv":17.4,"crim":1.20742,"zn":0.0,"indus":19.58,"chas":0,"nox":0.605,"rm":5.875,"age":94.6,"dis":2.4259,"rad":5,"tax":403,"ptratio":14.7,"b":292.29,"lstat":14.43},{"obs":172,"town":"Cambridge","town_id":28,"tract":3550,"lon":-71.079200,"lat":42.239000,"medv":19.1,"cmedv":19.1,"crim":2.31390,"zn":0.0,"indus":19.58,"chas":0,"nox":0.605,"rm":5.880,"age":97.3,"dis":2.3887,"rad":5,"tax":403,"ptratio":14.7,"b":348.13,"lstat":12.03},{"obs":173,"town":"Arlington","town_id":29,"tract":3561,"lon":-71.087000,"lat":42.241600,"medv":23.1,"cmedv":23.1,"crim":0.13914,"zn":0.0,"indus":4.05,"chas":0,"nox":0.51,"rm":5.572,"age":88.5,"dis":2.5961,"rad":5,"tax":296,"ptratio":16.6,"b":396.90,"lstat":14.69},{"obs":174,"town":"Arlington","town_id":29,"tract":3562,"lon":-71.085500,"lat":42.245000,"medv":23.6,"cmedv":23.6,"crim":0.09178,"zn":0.0,"indus":4.05,"chas":0,"nox":0.51,"rm":6.416,"age":84.1,"dis":2.6463,"rad":5,"tax":296,"ptratio":16.6,"b":395.50,"lstat":9.04},{"obs":175,"town":"Arlington","town_id":29,"tract":3563,"lon":-71.083300,"lat":42.247500,"medv":22.6,"cmedv":22.6,"crim":0.08447,"zn":0.0,"indus":4.05,"chas":0,"nox":0.51,"rm":5.859,"age":68.7,"dis":2.7019,"rad":5,"tax":296,"ptratio":16.6,"b":393.23,"lstat":9.64},{"obs":176,"town":"Arlington","town_id":29,"tract":3564,"lon":-71.094000,"lat":42.257500,"medv":29.4,"cmedv":29.4,"crim":0.06664,"zn":0.0,"indus":4.05,"chas":0,"nox":0.51,"rm":6.546,"age":33.1,"dis":3.1323,"rad":5,"tax":296,"ptratio":16.6,"b":390.96,"lstat":5.33},{"obs":177,"town":"Arlington","town_id":29,"tract":3565,"lon":-71.112500,"lat":42.255000,"medv":23.2,"cmedv":23.2,"crim":0.07022,"zn":0.0,"indus":4.05,"chas":0,"nox":0.51,"rm":6.020,"age":47.2,"dis":3.5549,"rad":5,"tax":296,"ptratio":16.6,"b":393.23,"lstat":10.11},{"obs":178,"town":"Arlington","town_id":29,"tract":3566,"lon":-71.106000,"lat":42.251200,"medv":24.6,"cmedv":24.6,"crim":0.05425,"zn":0.0,"indus":4.05,"chas":0,"nox":0.51,"rm":6.315,"age":73.4,"dis":3.3175,"rad":5,"tax":296,"ptratio":16.6,"b":395.60,"lstat":6.29},{"obs":179,"town":"Arlington","town_id":29,"tract":3567,"lon":-71.096500,"lat":42.247000,"medv":29.9,"cmedv":29.9,"crim":0.06642,"zn":0.0,"indus":4.05,"chas":0,"nox":0.51,"rm":6.860,"age":74.4,"dis":2.9153,"rad":5,"tax":296,"ptratio":16.6,"b":391.27,"lstat":6.92},{"obs":180,"town":"Belmont","town_id":30,"tract":3571,"lon":-71.100000,"lat":42.240800,"medv":37.2,"cmedv":37.2,"crim":0.05780,"zn":0.0,"indus":2.46,"chas":0,"nox":0.488,"rm":6.980,"age":58.4,"dis":2.8290,"rad":3,"tax":193,"ptratio":17.8,"b":396.90,"lstat":5.04},{"obs":181,"town":"Belmont","town_id":30,"tract":3572,"lon":-71.099500,"lat":42.234500,"medv":39.8,"cmedv":39.8,"crim":0.06588,"zn":0.0,"indus":2.46,"chas":0,"nox":0.488,"rm":7.765,"age":83.3,"dis":2.7410,"rad":3,"tax":193,"ptratio":17.8,"b":395.56,"lstat":7.56},{"obs":182,"town":"Belmont","town_id":30,"tract":3573,"lon":-71.096600,"lat":42.228200,"medv":36.2,"cmedv":36.2,"crim":0.06888,"zn":0.0,"indus":2.46,"chas":0,"nox":0.488,"rm":6.144,"age":62.2,"dis":2.5979,"rad":3,"tax":193,"ptratio":17.8,"b":396.90,"lstat":9.45},{"obs":183,"town":"Belmont","town_id":30,"tract":3574,"lon":-71.100500,"lat":42.228700,"medv":37.9,"cmedv":37.9,"crim":0.09103,"zn":0.0,"indus":2.46,"chas":0,"nox":0.488,"rm":7.155,"age":92.2,"dis":2.7006,"rad":3,"tax":193,"ptratio":17.8,"b":394.12,"lstat":4.82},{"obs":184,"town":"Belmont","town_id":30,"tract":3575,"lon":-71.106500,"lat":42.230000,"medv":32.5,"cmedv":32.5,"crim":0.10008,"zn":0.0,"indus":2.46,"chas":0,"nox":0.488,"rm":6.563,"age":95.6,"dis":2.8470,"rad":3,"tax":193,"ptratio":17.8,"b":396.90,"lstat":5.68},{"obs":185,"town":"Belmont","town_id":30,"tract":3576,"lon":-71.112000,"lat":42.230000,"medv":26.4,"cmedv":26.4,"crim":0.08308,"zn":0.0,"indus":2.46,"chas":0,"nox":0.488,"rm":5.604,"age":89.8,"dis":2.9879,"rad":3,"tax":193,"ptratio":17.8,"b":391.00,"lstat":13.98},{"obs":186,"town":"Belmont","town_id":30,"tract":3577,"lon":-71.117500,"lat":42.235000,"medv":29.6,"cmedv":29.6,"crim":0.06047,"zn":0.0,"indus":2.46,"chas":0,"nox":0.488,"rm":6.153,"age":68.8,"dis":3.2797,"rad":3,"tax":193,"ptratio":17.8,"b":387.11,"lstat":13.15},{"obs":187,"town":"Belmont","town_id":30,"tract":3578,"lon":-71.111500,"lat":42.244200,"medv":50.0,"cmedv":50.0,"crim":0.05602,"zn":0.0,"indus":2.46,"chas":0,"nox":0.488,"rm":7.831,"age":53.6,"dis":3.1992,"rad":3,"tax":193,"ptratio":17.8,"b":392.63,"lstat":4.45},{"obs":188,"town":"Lexington","town_id":31,"tract":3581,"lon":-71.122000,"lat":42.256500,"medv":32.0,"cmedv":32.0,"crim":0.07875,"zn":45.0,"indus":3.44,"chas":0,"nox":0.437,"rm":6.782,"age":41.1,"dis":3.7886,"rad":5,"tax":398,"ptratio":15.2,"b":393.87,"lstat":6.68},{"obs":189,"town":"Lexington","town_id":31,"tract":3583,"lon":-71.140800,"lat":42.255000,"medv":29.8,"cmedv":29.8,"crim":0.12579,"zn":45.0,"indus":3.44,"chas":0,"nox":0.437,"rm":6.556,"age":29.1,"dis":4.5667,"rad":5,"tax":398,"ptratio":15.2,"b":382.84,"lstat":4.56},{"obs":190,"town":"Lexington","town_id":31,"tract":3584,"lon":-71.145000,"lat":42.265100,"medv":34.9,"cmedv":34.9,"crim":0.08370,"zn":45.0,"indus":3.44,"chas":0,"nox":0.437,"rm":7.185,"age":38.9,"dis":4.5667,"rad":5,"tax":398,"ptratio":15.2,"b":396.90,"lstat":5.39},{"obs":191,"town":"Lexington","town_id":31,"tract":3585,"lon":-71.121600,"lat":42.270000,"medv":37.0,"cmedv":33.0,"crim":0.09068,"zn":45.0,"indus":3.44,"chas":0,"nox":0.437,"rm":6.951,"age":21.5,"dis":6.4798,"rad":5,"tax":398,"ptratio":15.2,"b":377.68,"lstat":5.10},{"obs":192,"town":"Lexington","town_id":31,"tract":3586,"lon":-71.148500,"lat":42.276500,"medv":30.5,"cmedv":30.5,"crim":0.06911,"zn":45.0,"indus":3.44,"chas":0,"nox":0.437,"rm":6.739,"age":30.8,"dis":6.4798,"rad":5,"tax":398,"ptratio":15.2,"b":389.71,"lstat":4.69},{"obs":193,"town":"Lexington","town_id":31,"tract":3587,"lon":-71.134000,"lat":42.278500,"medv":36.4,"cmedv":36.4,"crim":0.08664,"zn":45.0,"indus":3.44,"chas":0,"nox":0.437,"rm":7.178,"age":26.3,"dis":6.4798,"rad":5,"tax":398,"ptratio":15.2,"b":390.49,"lstat":2.87},{"obs":194,"town":"Bedford","town_id":32,"tract":3591,"lon":-71.152500,"lat":42.300000,"medv":31.1,"cmedv":31.1,"crim":0.02187,"zn":60.0,"indus":2.93,"chas":0,"nox":0.401,"rm":6.800,"age":9.9,"dis":6.2196,"rad":1,"tax":265,"ptratio":15.6,"b":393.37,"lstat":5.03},{"obs":195,"town":"Bedford","town_id":32,"tract":3592,"lon":-71.163300,"lat":42.303000,"medv":29.1,"cmedv":29.1,"crim":0.01439,"zn":60.0,"indus":2.93,"chas":0,"nox":0.401,"rm":6.604,"age":18.8,"dis":6.2196,"rad":1,"tax":265,"ptratio":15.6,"b":376.70,"lstat":4.38},{"obs":196,"town":"Lincoln","town_id":33,"tract":3602,"lon":-71.189000,"lat":42.252500,"medv":50.0,"cmedv":50.0,"crim":0.01381,"zn":80.0,"indus":0.46,"chas":0,"nox":0.422,"rm":7.875,"age":32.0,"dis":5.6484,"rad":4,"tax":255,"ptratio":14.4,"b":394.23,"lstat":2.97},{"obs":197,"town":"Concord","town_id":34,"tract":3611,"lon":-71.220000,"lat":42.271500,"medv":33.3,"cmedv":33.3,"crim":0.04011,"zn":80.0,"indus":1.52,"chas":0,"nox":0.404,"rm":7.287,"age":34.1,"dis":7.3090,"rad":2,"tax":329,"ptratio":12.6,"b":396.90,"lstat":4.08},{"obs":198,"town":"Concord","town_id":34,"tract":3612,"lon":-71.240000,"lat":42.272500,"medv":30.3,"cmedv":30.3,"crim":0.04666,"zn":80.0,"indus":1.52,"chas":0,"nox":0.404,"rm":7.107,"age":36.6,"dis":7.3090,"rad":2,"tax":329,"ptratio":12.6,"b":354.31,"lstat":8.61},{"obs":199,"town":"Concord","town_id":34,"tract":3613,"lon":-71.222000,"lat":42.289000,"medv":34.6,"cmedv":34.6,"crim":0.03768,"zn":80.0,"indus":1.52,"chas":0,"nox":0.404,"rm":7.274,"age":38.3,"dis":7.3090,"rad":2,"tax":329,"ptratio":12.6,"b":392.20,"lstat":6.62},{"obs":200,"town":"Sudbury","town_id":35,"tract":3651,"lon":-71.244000,"lat":42.242500,"medv":34.9,"cmedv":34.9,"crim":0.03150,"zn":95.0,"indus":1.47,"chas":0,"nox":0.403,"rm":6.975,"age":15.3,"dis":7.6534,"rad":3,"tax":402,"ptratio":17.0,"b":396.90,"lstat":4.56},{"obs":201,"town":"Sudbury","town_id":35,"tract":3652,"lon":-71.263000,"lat":42.222500,"medv":32.9,"cmedv":32.9,"crim":0.01778,"zn":95.0,"indus":1.47,"chas":0,"nox":0.403,"rm":7.135,"age":13.9,"dis":7.6534,"rad":3,"tax":402,"ptratio":17.0,"b":384.30,"lstat":4.45},{"obs":202,"town":"Wayland","town_id":36,"tract":3661,"lon":-71.218500,"lat":42.195500,"medv":24.1,"cmedv":24.1,"crim":0.03445,"zn":82.5,"indus":2.03,"chas":0,"nox":0.415,"rm":6.162,"age":38.4,"dis":6.2700,"rad":2,"tax":348,"ptratio":14.7,"b":393.77,"lstat":7.43},{"obs":203,"town":"Wayland","town_id":36,"tract":3662,"lon":-71.214000,"lat":42.218000,"medv":42.3,"cmedv":42.3,"crim":0.02177,"zn":82.5,"indus":2.03,"chas":0,"nox":0.415,"rm":7.610,"age":15.7,"dis":6.2700,"rad":2,"tax":348,"ptratio":14.7,"b":395.38,"lstat":3.11},{"obs":204,"town":"Weston","town_id":37,"tract":3671,"lon":-71.199000,"lat":42.232000,"medv":48.5,"cmedv":48.5,"crim":0.03510,"zn":95.0,"indus":2.68,"chas":0,"nox":0.4161,"rm":7.853,"age":33.2,"dis":5.1180,"rad":4,"tax":224,"ptratio":14.7,"b":392.78,"lstat":3.81},{"obs":205,"town":"Weston","town_id":37,"tract":3672,"lon":-71.199000,"lat":42.205800,"medv":50.0,"cmedv":50.0,"crim":0.02009,"zn":95.0,"indus":2.68,"chas":0,"nox":0.4161,"rm":8.034,"age":31.9,"dis":5.1180,"rad":4,"tax":224,"ptratio":14.7,"b":390.55,"lstat":2.88},{"obs":206,"town":"Waltham","town_id":38,"tract":3681,"lon":-71.147500,"lat":42.244500,"medv":22.6,"cmedv":22.6,"crim":0.13642,"zn":0.0,"indus":10.59,"chas":0,"nox":0.489,"rm":5.891,"age":22.3,"dis":3.9454,"rad":4,"tax":277,"ptratio":18.6,"b":396.90,"lstat":10.87},{"obs":207,"town":"Waltham","town_id":38,"tract":3682,"lon":-71.150000,"lat":42.230800,"medv":24.4,"cmedv":24.4,"crim":0.22969,"zn":0.0,"indus":10.59,"chas":0,"nox":0.489,"rm":6.326,"age":52.5,"dis":4.3549,"rad":4,"tax":277,"ptratio":18.6,"b":394.87,"lstat":10.97},{"obs":208,"town":"Waltham","town_id":38,"tract":3683,"lon":-71.149000,"lat":42.226800,"medv":22.5,"cmedv":22.5,"crim":0.25199,"zn":0.0,"indus":10.59,"chas":0,"nox":0.489,"rm":5.783,"age":72.7,"dis":4.3549,"rad":4,"tax":277,"ptratio":18.6,"b":389.43,"lstat":18.06},{"obs":209,"town":"Waltham","town_id":38,"tract":3684,"lon":-71.150300,"lat":42.222000,"medv":24.4,"cmedv":24.4,"crim":0.13587,"zn":0.0,"indus":10.59,"chas":1,"nox":0.489,"rm":6.064,"age":59.1,"dis":4.2392,"rad":4,"tax":277,"ptratio":18.6,"b":381.32,"lstat":14.66},{"obs":210,"town":"Waltham","town_id":38,"tract":3685,"lon":-71.143000,"lat":42.221700,"medv":20.0,"cmedv":20.0,"crim":0.43571,"zn":0.0,"indus":10.59,"chas":1,"nox":0.489,"rm":5.344,"age":100.0,"dis":3.8750,"rad":4,"tax":277,"ptratio":18.6,"b":396.90,"lstat":23.09},{"obs":211,"town":"Waltham","town_id":38,"tract":3686,"lon":-71.143500,"lat":42.217700,"medv":21.7,"cmedv":21.7,"crim":0.17446,"zn":0.0,"indus":10.59,"chas":1,"nox":0.489,"rm":5.960,"age":92.1,"dis":3.8771,"rad":4,"tax":277,"ptratio":18.6,"b":393.25,"lstat":17.27},{"obs":212,"town":"Waltham","town_id":38,"tract":3687,"lon":-71.138000,"lat":42.221600,"medv":19.3,"cmedv":19.3,"crim":0.37578,"zn":0.0,"indus":10.59,"chas":1,"nox":0.489,"rm":5.404,"age":88.6,"dis":3.6650,"rad":4,"tax":277,"ptratio":18.6,"b":395.24,"lstat":23.98},{"obs":213,"town":"Waltham","town_id":38,"tract":3688,"lon":-71.133500,"lat":42.225000,"medv":22.4,"cmedv":22.4,"crim":0.21719,"zn":0.0,"indus":10.59,"chas":1,"nox":0.489,"rm":5.807,"age":53.8,"dis":3.6526,"rad":4,"tax":277,"ptratio":18.6,"b":390.94,"lstat":16.03},{"obs":214,"town":"Waltham","town_id":38,"tract":3689,"lon":-71.137500,"lat":42.235500,"medv":28.1,"cmedv":28.1,"crim":0.14052,"zn":0.0,"indus":10.59,"chas":0,"nox":0.489,"rm":6.375,"age":32.3,"dis":3.9454,"rad":4,"tax":277,"ptratio":18.6,"b":385.81,"lstat":9.38},{"obs":215,"town":"Waltham","town_id":38,"tract":3690,"lon":-71.127000,"lat":42.235000,"medv":23.7,"cmedv":23.7,"crim":0.28955,"zn":0.0,"indus":10.59,"chas":0,"nox":0.489,"rm":5.412,"age":9.8,"dis":3.5875,"rad":4,"tax":277,"ptratio":18.6,"b":348.93,"lstat":29.55},{"obs":216,"town":"Waltham","town_id":38,"tract":3691,"lon":-71.124500,"lat":42.227700,"medv":25.0,"cmedv":25.0,"crim":0.19802,"zn":0.0,"indus":10.59,"chas":0,"nox":0.489,"rm":6.182,"age":42.4,"dis":3.9454,"rad":4,"tax":277,"ptratio":18.6,"b":393.63,"lstat":9.47},{"obs":217,"town":"Watertown","town_id":39,"tract":3701,"lon":-71.116600,"lat":42.223000,"medv":23.3,"cmedv":23.3,"crim":0.04560,"zn":0.0,"indus":13.89,"chas":1,"nox":0.55,"rm":5.888,"age":56.0,"dis":3.1121,"rad":5,"tax":276,"ptratio":16.4,"b":392.80,"lstat":13.51},{"obs":218,"town":"Watertown","town_id":39,"tract":3702,"lon":-71.105000,"lat":42.223500,"medv":28.7,"cmedv":28.7,"crim":0.07013,"zn":0.0,"indus":13.89,"chas":0,"nox":0.55,"rm":6.642,"age":85.1,"dis":3.4211,"rad":5,"tax":276,"ptratio":16.4,"b":392.78,"lstat":9.69},{"obs":219,"town":"Watertown","town_id":39,"tract":3703,"lon":-71.093300,"lat":42.222000,"medv":21.5,"cmedv":21.5,"crim":0.11069,"zn":0.0,"indus":13.89,"chas":1,"nox":0.55,"rm":5.951,"age":93.8,"dis":2.8893,"rad":5,"tax":276,"ptratio":16.4,"b":396.90,"lstat":17.92},{"obs":220,"town":"Watertown","town_id":39,"tract":3704,"lon":-71.106000,"lat":42.218500,"medv":23.0,"cmedv":23.0,"crim":0.11425,"zn":0.0,"indus":13.89,"chas":1,"nox":0.55,"rm":6.373,"age":92.4,"dis":3.3633,"rad":5,"tax":276,"ptratio":16.4,"b":393.74,"lstat":10.50},{"obs":221,"town":"Newton","town_id":40,"tract":3731,"lon":-71.110000,"lat":42.213700,"medv":26.7,"cmedv":26.7,"crim":0.35809,"zn":0.0,"indus":6.2,"chas":1,"nox":0.507,"rm":6.951,"age":88.5,"dis":2.8617,"rad":8,"tax":307,"ptratio":17.4,"b":391.70,"lstat":9.71},{"obs":222,"town":"Newton","town_id":40,"tract":3732,"lon":-71.121000,"lat":42.216600,"medv":21.7,"cmedv":21.7,"crim":0.40771,"zn":0.0,"indus":6.2,"chas":1,"nox":0.507,"rm":6.164,"age":91.3,"dis":3.0480,"rad":8,"tax":307,"ptratio":17.4,"b":395.24,"lstat":21.46},{"obs":223,"town":"Newton","town_id":40,"tract":3733,"lon":-71.125000,"lat":42.213400,"medv":27.5,"cmedv":27.5,"crim":0.62356,"zn":0.0,"indus":6.2,"chas":1,"nox":0.507,"rm":6.879,"age":77.7,"dis":3.2721,"rad":8,"tax":307,"ptratio":17.4,"b":390.39,"lstat":9.93},{"obs":224,"town":"Newton","town_id":40,"tract":3734,"lon":-71.120800,"lat":42.218300,"medv":30.1,"cmedv":30.1,"crim":0.61470,"zn":0.0,"indus":6.2,"chas":0,"nox":0.507,"rm":6.618,"age":80.8,"dis":3.2721,"rad":8,"tax":307,"ptratio":17.4,"b":396.90,"lstat":7.60},{"obs":225,"town":"Newton","town_id":40,"tract":3735,"lon":-71.110000,"lat":42.206000,"medv":44.8,"cmedv":44.8,"crim":0.31533,"zn":0.0,"indus":6.2,"chas":0,"nox":0.504,"rm":8.266,"age":78.3,"dis":2.8944,"rad":8,"tax":307,"ptratio":17.4,"b":385.05,"lstat":4.14},{"obs":226,"town":"Newton","town_id":40,"tract":3736,"lon":-71.101200,"lat":42.197500,"medv":50.0,"cmedv":50.0,"crim":0.52693,"zn":0.0,"indus":6.2,"chas":0,"nox":0.504,"rm":8.725,"age":83.0,"dis":2.8944,"rad":8,"tax":307,"ptratio":17.4,"b":382.00,"lstat":4.63},{"obs":227,"town":"Newton","town_id":40,"tract":3737,"lon":-71.121500,"lat":42.202500,"medv":37.6,"cmedv":37.6,"crim":0.38214,"zn":0.0,"indus":6.2,"chas":0,"nox":0.504,"rm":8.040,"age":86.5,"dis":3.2157,"rad":8,"tax":307,"ptratio":17.4,"b":387.38,"lstat":3.13},{"obs":228,"town":"Newton","town_id":40,"tract":3738,"lon":-71.116000,"lat":42.194700,"medv":31.6,"cmedv":31.6,"crim":0.41238,"zn":0.0,"indus":6.2,"chas":0,"nox":0.504,"rm":7.163,"age":79.9,"dis":3.2157,"rad":8,"tax":307,"ptratio":17.4,"b":372.08,"lstat":6.36},{"obs":229,"town":"Newton","town_id":40,"tract":3739,"lon":-71.110000,"lat":42.185000,"medv":46.7,"cmedv":46.7,"crim":0.29819,"zn":0.0,"indus":6.2,"chas":0,"nox":0.504,"rm":7.686,"age":17.0,"dis":3.3751,"rad":8,"tax":307,"ptratio":17.4,"b":377.51,"lstat":3.92},{"obs":230,"town":"Newton","town_id":40,"tract":3740,"lon":-71.119000,"lat":42.180700,"medv":31.5,"cmedv":31.5,"crim":0.44178,"zn":0.0,"indus":6.2,"chas":0,"nox":0.504,"rm":6.552,"age":21.4,"dis":3.3751,"rad":8,"tax":307,"ptratio":17.4,"b":380.34,"lstat":3.76},{"obs":231,"town":"Newton","town_id":40,"tract":3741,"lon":-71.130000,"lat":42.188000,"medv":24.3,"cmedv":24.3,"crim":0.53700,"zn":0.0,"indus":6.2,"chas":0,"nox":0.504,"rm":5.981,"age":68.1,"dis":3.6715,"rad":8,"tax":307,"ptratio":17.4,"b":378.35,"lstat":11.65},{"obs":232,"town":"Newton","town_id":40,"tract":3742,"lon":-71.128500,"lat":42.193000,"medv":31.7,"cmedv":31.7,"crim":0.46296,"zn":0.0,"indus":6.2,"chas":0,"nox":0.504,"rm":7.412,"age":76.9,"dis":3.6715,"rad":8,"tax":307,"ptratio":17.4,"b":376.14,"lstat":5.25},{"obs":233,"town":"Newton","town_id":40,"tract":3743,"lon":-71.140000,"lat":42.194600,"medv":41.7,"cmedv":41.7,"crim":0.57529,"zn":0.0,"indus":6.2,"chas":0,"nox":0.507,"rm":8.337,"age":73.3,"dis":3.8384,"rad":8,"tax":307,"ptratio":17.4,"b":385.91,"lstat":2.47},{"obs":234,"town":"Newton","town_id":40,"tract":3744,"lon":-71.134000,"lat":42.204000,"medv":48.3,"cmedv":48.3,"crim":0.33147,"zn":0.0,"indus":6.2,"chas":0,"nox":0.507,"rm":8.247,"age":70.4,"dis":3.6519,"rad":8,"tax":307,"ptratio":17.4,"b":378.95,"lstat":3.95},{"obs":235,"town":"Newton","town_id":40,"tract":3745,"lon":-71.132000,"lat":42.214200,"medv":29.0,"cmedv":29.0,"crim":0.44791,"zn":0.0,"indus":6.2,"chas":1,"nox":0.507,"rm":6.726,"age":66.5,"dis":3.6519,"rad":8,"tax":307,"ptratio":17.4,"b":360.20,"lstat":8.05},{"obs":236,"town":"Newton","town_id":40,"tract":3746,"lon":-71.138000,"lat":42.214100,"medv":24.0,"cmedv":24.0,"crim":0.33045,"zn":0.0,"indus":6.2,"chas":0,"nox":0.507,"rm":6.086,"age":61.5,"dis":3.6519,"rad":8,"tax":307,"ptratio":17.4,"b":376.75,"lstat":10.88},{"obs":237,"town":"Newton","town_id":40,"tract":3747,"lon":-71.148500,"lat":42.211000,"medv":25.1,"cmedv":25.1,"crim":0.52058,"zn":0.0,"indus":6.2,"chas":1,"nox":0.507,"rm":6.631,"age":76.5,"dis":4.1480,"rad":8,"tax":307,"ptratio":17.4,"b":388.45,"lstat":9.54},{"obs":238,"town":"Newton","town_id":40,"tract":3748,"lon":-71.149100,"lat":42.203000,"medv":31.5,"cmedv":31.5,"crim":0.51183,"zn":0.0,"indus":6.2,"chas":0,"nox":0.507,"rm":7.358,"age":71.6,"dis":4.1480,"rad":8,"tax":307,"ptratio":17.4,"b":390.07,"lstat":4.73},{"obs":239,"town":"Natick","town_id":41,"tract":3821,"lon":-71.205500,"lat":42.187500,"medv":23.7,"cmedv":23.7,"crim":0.08244,"zn":30.0,"indus":4.93,"chas":0,"nox":0.428,"rm":6.481,"age":18.5,"dis":6.1899,"rad":6,"tax":300,"ptratio":16.6,"b":379.41,"lstat":6.36},{"obs":240,"town":"Natick","town_id":41,"tract":3822,"lon":-71.203500,"lat":42.187000,"medv":23.3,"cmedv":23.3,"crim":0.09252,"zn":30.0,"indus":4.93,"chas":0,"nox":0.428,"rm":6.606,"age":42.2,"dis":6.1899,"rad":6,"tax":300,"ptratio":16.6,"b":383.78,"lstat":7.37},{"obs":241,"town":"Natick","town_id":41,"tract":3823,"lon":-71.196600,"lat":42.164000,"medv":22.0,"cmedv":27.0,"crim":0.11329,"zn":30.0,"indus":4.93,"chas":0,"nox":0.428,"rm":6.897,"age":54.3,"dis":6.3361,"rad":6,"tax":300,"ptratio":16.6,"b":391.25,"lstat":11.38},{"obs":242,"town":"Natick","town_id":41,"tract":3824,"lon":-71.213800,"lat":42.164500,"medv":20.1,"cmedv":20.1,"crim":0.10612,"zn":30.0,"indus":4.93,"chas":0,"nox":0.428,"rm":6.095,"age":65.1,"dis":6.3361,"rad":6,"tax":300,"ptratio":16.6,"b":394.62,"lstat":12.40},{"obs":243,"town":"Natick","town_id":41,"tract":3825,"lon":-71.220000,"lat":42.178200,"medv":22.2,"cmedv":22.2,"crim":0.10290,"zn":30.0,"indus":4.93,"chas":0,"nox":0.428,"rm":6.358,"age":52.9,"dis":7.0355,"rad":6,"tax":300,"ptratio":16.6,"b":372.75,"lstat":11.22},{"obs":244,"town":"Natick","town_id":41,"tract":3826,"lon":-71.232000,"lat":42.172500,"medv":23.7,"cmedv":23.7,"crim":0.12757,"zn":30.0,"indus":4.93,"chas":0,"nox":0.428,"rm":6.393,"age":7.8,"dis":7.0355,"rad":6,"tax":300,"ptratio":16.6,"b":374.71,"lstat":5.19},{"obs":245,"town":"Framingham","town_id":42,"tract":3831,"lon":-71.243500,"lat":42.163000,"medv":17.6,"cmedv":17.6,"crim":0.20608,"zn":22.0,"indus":5.86,"chas":0,"nox":0.431,"rm":5.593,"age":76.5,"dis":7.9549,"rad":7,"tax":330,"ptratio":19.1,"b":372.49,"lstat":12.50},{"obs":246,"town":"Framingham","town_id":42,"tract":3832,"lon":-71.257500,"lat":42.161800,"medv":18.5,"cmedv":18.5,"crim":0.19133,"zn":22.0,"indus":5.86,"chas":0,"nox":0.431,"rm":5.605,"age":70.2,"dis":7.9549,"rad":7,"tax":330,"ptratio":19.1,"b":389.13,"lstat":18.46},{"obs":247,"town":"Framingham","town_id":42,"tract":3833,"lon":-71.262000,"lat":42.169000,"medv":24.3,"cmedv":24.3,"crim":0.33983,"zn":22.0,"indus":5.86,"chas":0,"nox":0.431,"rm":6.108,"age":34.9,"dis":8.0555,"rad":7,"tax":330,"ptratio":19.1,"b":390.18,"lstat":9.16},{"obs":248,"town":"Framingham","town_id":42,"tract":3834,"lon":-71.247000,"lat":42.170300,"medv":20.5,"cmedv":20.5,"crim":0.19657,"zn":22.0,"indus":5.86,"chas":0,"nox":0.431,"rm":6.226,"age":79.2,"dis":8.0555,"rad":7,"tax":330,"ptratio":19.1,"b":376.14,"lstat":10.15},{"obs":249,"town":"Framingham","town_id":42,"tract":3835,"lon":-71.255000,"lat":42.176700,"medv":24.5,"cmedv":24.5,"crim":0.16439,"zn":22.0,"indus":5.86,"chas":0,"nox":0.431,"rm":6.433,"age":49.1,"dis":7.8265,"rad":7,"tax":330,"ptratio":19.1,"b":374.71,"lstat":9.52},{"obs":250,"town":"Framingham","town_id":42,"tract":3836,"lon":-71.247500,"lat":42.182500,"medv":26.2,"cmedv":26.2,"crim":0.19073,"zn":22.0,"indus":5.86,"chas":0,"nox":0.431,"rm":6.718,"age":17.5,"dis":7.8265,"rad":7,"tax":330,"ptratio":19.1,"b":393.74,"lstat":6.56},{"obs":251,"town":"Framingham","town_id":42,"tract":3837,"lon":-71.238000,"lat":42.191000,"medv":24.4,"cmedv":24.4,"crim":0.14030,"zn":22.0,"indus":5.86,"chas":0,"nox":0.431,"rm":6.487,"age":13.0,"dis":7.3967,"rad":7,"tax":330,"ptratio":19.1,"b":396.28,"lstat":5.90},{"obs":252,"town":"Framingham","town_id":42,"tract":3838,"lon":-71.243500,"lat":42.198200,"medv":24.8,"cmedv":24.8,"crim":0.21409,"zn":22.0,"indus":5.86,"chas":0,"nox":0.431,"rm":6.438,"age":8.9,"dis":7.3967,"rad":7,"tax":330,"ptratio":19.1,"b":377.07,"lstat":3.59},{"obs":253,"town":"Framingham","town_id":42,"tract":3839,"lon":-71.268500,"lat":42.193500,"medv":29.6,"cmedv":29.6,"crim":0.08221,"zn":22.0,"indus":5.86,"chas":0,"nox":0.431,"rm":6.957,"age":6.8,"dis":8.9067,"rad":7,"tax":330,"ptratio":19.1,"b":386.09,"lstat":3.53},{"obs":254,"town":"Framingham","town_id":42,"tract":3840,"lon":-71.280700,"lat":42.172700,"medv":42.8,"cmedv":42.8,"crim":0.36894,"zn":22.0,"indus":5.86,"chas":0,"nox":0.431,"rm":8.259,"age":8.4,"dis":8.9067,"rad":7,"tax":330,"ptratio":19.1,"b":396.90,"lstat":3.54},{"obs":255,"town":"Ashland","town_id":43,"tract":3851,"lon":-71.289500,"lat":42.157500,"medv":21.9,"cmedv":21.9,"crim":0.04819,"zn":80.0,"indus":3.64,"chas":0,"nox":0.392,"rm":6.108,"age":32.0,"dis":9.2203,"rad":1,"tax":315,"ptratio":16.4,"b":392.89,"lstat":6.57},{"obs":256,"town":"Ashland","town_id":43,"tract":3852,"lon":-71.269000,"lat":42.148200,"medv":20.9,"cmedv":20.9,"crim":0.03548,"zn":80.0,"indus":3.64,"chas":0,"nox":0.392,"rm":5.876,"age":19.1,"dis":9.2203,"rad":1,"tax":315,"ptratio":16.4,"b":395.18,"lstat":9.25},{"obs":257,"town":"Sherborn","town_id":44,"tract":3861,"lon":-71.223000,"lat":42.145000,"medv":44.0,"cmedv":44.0,"crim":0.01538,"zn":90.0,"indus":3.75,"chas":0,"nox":0.394,"rm":7.454,"age":34.2,"dis":6.3361,"rad":3,"tax":244,"ptratio":15.9,"b":386.34,"lstat":3.11},{"obs":258,"town":"Brookline","town_id":45,"tract":4001,"lon":-71.067900,"lat":42.207300,"medv":50.0,"cmedv":50.0,"crim":0.61154,"zn":20.0,"indus":3.97,"chas":0,"nox":0.647,"rm":8.704,"age":86.9,"dis":1.8010,"rad":5,"tax":264,"ptratio":13.0,"b":389.70,"lstat":5.12},{"obs":259,"town":"Brookline","town_id":45,"tract":4002,"lon":-71.072700,"lat":42.207700,"medv":36.0,"cmedv":36.0,"crim":0.66351,"zn":20.0,"indus":3.97,"chas":0,"nox":0.647,"rm":7.333,"age":100.0,"dis":1.8946,"rad":5,"tax":264,"ptratio":13.0,"b":383.29,"lstat":7.79},{"obs":260,"town":"Brookline","town_id":45,"tract":4003,"lon":-71.076500,"lat":42.207500,"medv":30.1,"cmedv":30.1,"crim":0.65665,"zn":20.0,"indus":3.97,"chas":0,"nox":0.647,"rm":6.842,"age":100.0,"dis":2.0107,"rad":5,"tax":264,"ptratio":13.0,"b":391.93,"lstat":6.90},{"obs":261,"town":"Brookline","town_id":45,"tract":4004,"lon":-71.080000,"lat":42.204000,"medv":33.8,"cmedv":33.8,"crim":0.54011,"zn":20.0,"indus":3.97,"chas":0,"nox":0.647,"rm":7.203,"age":81.8,"dis":2.1121,"rad":5,"tax":264,"ptratio":13.0,"b":392.80,"lstat":9.59},{"obs":262,"town":"Brookline","town_id":45,"tract":4005,"lon":-71.079000,"lat":42.202000,"medv":43.1,"cmedv":43.1,"crim":0.53412,"zn":20.0,"indus":3.97,"chas":0,"nox":0.647,"rm":7.520,"age":89.4,"dis":2.1398,"rad":5,"tax":264,"ptratio":13.0,"b":388.37,"lstat":7.26},{"obs":263,"town":"Brookline","town_id":45,"tract":4006,"lon":-71.083500,"lat":42.200000,"medv":48.8,"cmedv":48.8,"crim":0.52014,"zn":20.0,"indus":3.97,"chas":0,"nox":0.647,"rm":8.398,"age":91.5,"dis":2.2885,"rad":5,"tax":264,"ptratio":13.0,"b":386.86,"lstat":5.91},{"obs":264,"town":"Brookline","town_id":45,"tract":4007,"lon":-71.075000,"lat":42.198000,"medv":31.0,"cmedv":31.0,"crim":0.82526,"zn":20.0,"indus":3.97,"chas":0,"nox":0.647,"rm":7.327,"age":94.5,"dis":2.0788,"rad":5,"tax":264,"ptratio":13.0,"b":393.42,"lstat":11.25},{"obs":265,"town":"Brookline","town_id":45,"tract":4008,"lon":-71.071000,"lat":42.203000,"medv":36.5,"cmedv":36.5,"crim":0.55007,"zn":20.0,"indus":3.97,"chas":0,"nox":0.647,"rm":7.206,"age":91.6,"dis":1.9301,"rad":5,"tax":264,"ptratio":13.0,"b":387.89,"lstat":8.10},{"obs":266,"town":"Brookline","town_id":45,"tract":4009,"lon":-71.070000,"lat":42.200000,"medv":22.8,"cmedv":22.8,"crim":0.76162,"zn":20.0,"indus":3.97,"chas":0,"nox":0.647,"rm":5.560,"age":62.8,"dis":1.9865,"rad":5,"tax":264,"ptratio":13.0,"b":392.40,"lstat":10.45},{"obs":267,"town":"Brookline","town_id":45,"tract":4010,"lon":-71.072500,"lat":42.196500,"medv":30.7,"cmedv":30.7,"crim":0.78570,"zn":20.0,"indus":3.97,"chas":0,"nox":0.647,"rm":7.014,"age":84.6,"dis":2.1329,"rad":5,"tax":264,"ptratio":13.0,"b":384.07,"lstat":14.79},{"obs":268,"town":"Brookline","town_id":45,"tract":4011,"lon":-71.085000,"lat":42.192500,"medv":50.0,"cmedv":50.0,"crim":0.57834,"zn":20.0,"indus":3.97,"chas":0,"nox":0.575,"rm":8.297,"age":67.0,"dis":2.4216,"rad":5,"tax":264,"ptratio":13.0,"b":384.54,"lstat":7.44},{"obs":269,"town":"Brookline","town_id":45,"tract":4012,"lon":-71.092500,"lat":42.207500,"medv":43.5,"cmedv":43.5,"crim":0.54050,"zn":20.0,"indus":3.97,"chas":0,"nox":0.575,"rm":7.470,"age":52.6,"dis":2.8720,"rad":5,"tax":264,"ptratio":13.0,"b":390.30,"lstat":3.16},{"obs":270,"town":"Dedham","town_id":46,"tract":4021,"lon":-71.098000,"lat":42.154000,"medv":20.7,"cmedv":20.7,"crim":0.09065,"zn":20.0,"indus":6.96,"chas":1,"nox":0.464,"rm":5.920,"age":61.5,"dis":3.9175,"rad":3,"tax":223,"ptratio":18.6,"b":391.34,"lstat":13.65},{"obs":271,"town":"Dedham","town_id":46,"tract":4022,"lon":-71.087000,"lat":42.141000,"medv":21.1,"cmedv":21.1,"crim":0.29916,"zn":20.0,"indus":6.96,"chas":0,"nox":0.464,"rm":5.856,"age":42.1,"dis":4.4290,"rad":3,"tax":223,"ptratio":18.6,"b":388.65,"lstat":13.00},{"obs":272,"town":"Dedham","town_id":46,"tract":4023,"lon":-71.094000,"lat":42.135500,"medv":25.2,"cmedv":25.2,"crim":0.16211,"zn":20.0,"indus":6.96,"chas":0,"nox":0.464,"rm":6.240,"age":16.3,"dis":4.4290,"rad":3,"tax":223,"ptratio":18.6,"b":396.90,"lstat":6.59},{"obs":273,"town":"Dedham","town_id":46,"tract":4024,"lon":-71.098200,"lat":42.144500,"medv":24.4,"cmedv":24.4,"crim":0.11460,"zn":20.0,"indus":6.96,"chas":0,"nox":0.464,"rm":6.538,"age":58.7,"dis":3.9175,"rad":3,"tax":223,"ptratio":18.6,"b":394.96,"lstat":7.73},{"obs":274,"town":"Dedham","town_id":46,"tract":4025,"lon":-71.117000,"lat":42.151000,"medv":35.2,"cmedv":35.2,"crim":0.22188,"zn":20.0,"indus":6.96,"chas":1,"nox":0.464,"rm":7.691,"age":51.8,"dis":4.3665,"rad":3,"tax":223,"ptratio":18.6,"b":390.77,"lstat":6.58},{"obs":275,"town":"Needham","town_id":47,"tract":4031,"lon":-71.130500,"lat":42.167500,"medv":32.4,"cmedv":32.4,"crim":0.05644,"zn":40.0,"indus":6.41,"chas":1,"nox":0.447,"rm":6.758,"age":32.9,"dis":4.0776,"rad":4,"tax":254,"ptratio":17.6,"b":396.90,"lstat":3.53},{"obs":276,"town":"Needham","town_id":47,"tract":4032,"lon":-71.138000,"lat":42.173300,"medv":32.0,"cmedv":32.0,"crim":0.09604,"zn":40.0,"indus":6.41,"chas":0,"nox":0.447,"rm":6.854,"age":42.8,"dis":4.2673,"rad":4,"tax":254,"ptratio":17.6,"b":396.90,"lstat":2.98},{"obs":277,"town":"Needham","town_id":47,"tract":4033,"lon":-71.140500,"lat":42.163200,"medv":33.2,"cmedv":33.2,"crim":0.10469,"zn":40.0,"indus":6.41,"chas":1,"nox":0.447,"rm":7.267,"age":49.0,"dis":4.7872,"rad":4,"tax":254,"ptratio":17.6,"b":389.25,"lstat":6.05},{"obs":278,"town":"Needham","town_id":47,"tract":4034,"lon":-71.149500,"lat":42.173000,"medv":33.1,"cmedv":33.1,"crim":0.06127,"zn":40.0,"indus":6.41,"chas":1,"nox":0.447,"rm":6.826,"age":27.6,"dis":4.8628,"rad":4,"tax":254,"ptratio":17.6,"b":393.45,"lstat":4.16},{"obs":279,"town":"Needham","town_id":47,"tract":4035,"lon":-71.139500,"lat":42.181300,"medv":29.1,"cmedv":29.1,"crim":0.07978,"zn":40.0,"indus":6.41,"chas":0,"nox":0.447,"rm":6.482,"age":32.1,"dis":4.1403,"rad":4,"tax":254,"ptratio":17.6,"b":396.90,"lstat":7.19},{"obs":280,"town":"Wellesley","town_id":48,"tract":4041,"lon":-71.148000,"lat":42.188000,"medv":35.1,"cmedv":35.1,"crim":0.21038,"zn":20.0,"indus":3.33,"chas":0,"nox":0.4429,"rm":6.812,"age":32.2,"dis":4.1007,"rad":5,"tax":216,"ptratio":14.9,"b":396.90,"lstat":4.85},{"obs":281,"town":"Wellesley","town_id":48,"tract":4042,"lon":-71.166000,"lat":42.187000,"medv":45.4,"cmedv":45.4,"crim":0.03578,"zn":20.0,"indus":3.33,"chas":0,"nox":0.4429,"rm":7.820,"age":64.5,"dis":4.6947,"rad":5,"tax":216,"ptratio":14.9,"b":387.31,"lstat":3.76},{"obs":282,"town":"Wellesley","town_id":48,"tract":4043,"lon":-71.185000,"lat":42.184800,"medv":35.4,"cmedv":35.4,"crim":0.03705,"zn":20.0,"indus":3.33,"chas":0,"nox":0.4429,"rm":6.968,"age":37.2,"dis":5.2447,"rad":5,"tax":216,"ptratio":14.9,"b":392.23,"lstat":4.59},{"obs":283,"town":"Wellesley","town_id":48,"tract":4044,"lon":-71.177500,"lat":42.173500,"medv":46.0,"cmedv":46.0,"crim":0.06129,"zn":20.0,"indus":3.33,"chas":1,"nox":0.4429,"rm":7.645,"age":49.7,"dis":5.2119,"rad":5,"tax":216,"ptratio":14.9,"b":377.07,"lstat":3.01},{"obs":284,"town":"Dover","town_id":49,"tract":4051,"lon":-71.173000,"lat":42.147500,"medv":50.0,"cmedv":50.0,"crim":0.01501,"zn":90.0,"indus":1.21,"chas":1,"nox":0.401,"rm":7.923,"age":24.8,"dis":5.8850,"rad":1,"tax":198,"ptratio":13.6,"b":395.52,"lstat":3.16},{"obs":285,"town":"Medfield","town_id":50,"tract":4061,"lon":-71.180000,"lat":42.110500,"medv":32.2,"cmedv":32.2,"crim":0.00906,"zn":90.0,"indus":2.97,"chas":0,"nox":0.4,"rm":7.088,"age":20.8,"dis":7.3073,"rad":1,"tax":285,"ptratio":15.3,"b":394.72,"lstat":7.85},{"obs":286,"town":"Millis","town_id":51,"tract":4071,"lon":-71.213500,"lat":42.100000,"medv":22.0,"cmedv":22.0,"crim":0.01096,"zn":55.0,"indus":2.25,"chas":0,"nox":0.389,"rm":6.453,"age":31.9,"dis":7.3073,"rad":1,"tax":300,"ptratio":15.3,"b":394.72,"lstat":8.23},{"obs":287,"town":"Norfolk","town_id":52,"tract":4091,"lon":-71.195000,"lat":42.067500,"medv":20.1,"cmedv":20.1,"crim":0.01965,"zn":80.0,"indus":1.76,"chas":0,"nox":0.385,"rm":6.230,"age":31.5,"dis":9.0892,"rad":1,"tax":241,"ptratio":18.2,"b":341.60,"lstat":12.93},{"obs":288,"town":"Walpole","town_id":53,"tract":4111,"lon":-71.148000,"lat":42.077500,"medv":23.2,"cmedv":23.2,"crim":0.03871,"zn":52.5,"indus":5.32,"chas":0,"nox":0.405,"rm":6.209,"age":31.3,"dis":7.3172,"rad":6,"tax":293,"ptratio":16.6,"b":396.90,"lstat":7.14},{"obs":289,"town":"Walpole","town_id":53,"tract":4112,"lon":-71.132500,"lat":42.094000,"medv":22.3,"cmedv":22.3,"crim":0.04590,"zn":52.5,"indus":5.32,"chas":0,"nox":0.405,"rm":6.315,"age":45.6,"dis":7.3172,"rad":6,"tax":293,"ptratio":16.6,"b":396.90,"lstat":7.60},{"obs":290,"town":"Walpole","town_id":53,"tract":4113,"lon":-71.155000,"lat":42.098000,"medv":24.8,"cmedv":24.8,"crim":0.04297,"zn":52.5,"indus":5.32,"chas":0,"nox":0.405,"rm":6.565,"age":22.9,"dis":7.3172,"rad":6,"tax":293,"ptratio":16.6,"b":371.72,"lstat":9.51},{"obs":291,"town":"Westwood","town_id":54,"tract":4121,"lon":-71.138500,"lat":42.123500,"medv":28.5,"cmedv":28.5,"crim":0.03502,"zn":80.0,"indus":4.95,"chas":0,"nox":0.411,"rm":6.861,"age":27.9,"dis":5.1167,"rad":4,"tax":245,"ptratio":19.2,"b":396.90,"lstat":3.33},{"obs":292,"town":"Westwood","town_id":54,"tract":4122,"lon":-71.133000,"lat":42.140800,"medv":37.3,"cmedv":37.3,"crim":0.07886,"zn":80.0,"indus":4.95,"chas":0,"nox":0.411,"rm":7.148,"age":27.7,"dis":5.1167,"rad":4,"tax":245,"ptratio":19.2,"b":396.90,"lstat":3.56},{"obs":293,"town":"Westwood","town_id":54,"tract":4123,"lon":-71.107000,"lat":42.130700,"medv":27.9,"cmedv":27.9,"crim":0.03615,"zn":80.0,"indus":4.95,"chas":0,"nox":0.411,"rm":6.630,"age":23.4,"dis":5.1167,"rad":4,"tax":245,"ptratio":19.2,"b":396.90,"lstat":4.70},{"obs":294,"town":"Norwood","town_id":55,"tract":4131,"lon":-71.109000,"lat":42.110000,"medv":23.9,"cmedv":23.9,"crim":0.08265,"zn":0.0,"indus":13.92,"chas":0,"nox":0.437,"rm":6.127,"age":18.4,"dis":5.5027,"rad":4,"tax":289,"ptratio":16.0,"b":396.90,"lstat":8.58},{"obs":295,"town":"Norwood","town_id":55,"tract":4132,"lon":-71.118000,"lat":42.121700,"medv":21.7,"cmedv":21.7,"crim":0.08199,"zn":0.0,"indus":13.92,"chas":0,"nox":0.437,"rm":6.009,"age":42.3,"dis":5.5027,"rad":4,"tax":289,"ptratio":16.0,"b":396.90,"lstat":10.40},{"obs":296,"town":"Norwood","town_id":55,"tract":4133,"lon":-71.130900,"lat":42.116600,"medv":28.6,"cmedv":28.6,"crim":0.12932,"zn":0.0,"indus":13.92,"chas":0,"nox":0.437,"rm":6.678,"age":31.1,"dis":5.9604,"rad":4,"tax":289,"ptratio":16.0,"b":396.90,"lstat":6.27},{"obs":297,"town":"Norwood","town_id":55,"tract":4134,"lon":-71.128000,"lat":42.110800,"medv":27.1,"cmedv":27.1,"crim":0.05372,"zn":0.0,"indus":13.92,"chas":0,"nox":0.437,"rm":6.549,"age":51.0,"dis":5.9604,"rad":4,"tax":289,"ptratio":16.0,"b":392.85,"lstat":7.39},{"obs":298,"town":"Norwood","town_id":55,"tract":4135,"lon":-71.121000,"lat":42.102500,"medv":20.3,"cmedv":20.3,"crim":0.14103,"zn":0.0,"indus":13.92,"chas":0,"nox":0.437,"rm":5.790,"age":58.0,"dis":6.3200,"rad":4,"tax":289,"ptratio":16.0,"b":396.90,"lstat":15.84},{"obs":299,"town":"Sharon","town_id":56,"tract":4141,"lon":-71.120000,"lat":42.072500,"medv":22.5,"cmedv":22.5,"crim":0.06466,"zn":70.0,"indus":2.24,"chas":0,"nox":0.4,"rm":6.345,"age":20.1,"dis":7.8278,"rad":5,"tax":358,"ptratio":14.8,"b":368.24,"lstat":4.97},{"obs":300,"town":"Sharon","town_id":56,"tract":4142,"lon":-71.100000,"lat":42.059000,"medv":29.0,"cmedv":29.0,"crim":0.05561,"zn":70.0,"indus":2.24,"chas":0,"nox":0.4,"rm":7.041,"age":10.0,"dis":7.8278,"rad":5,"tax":358,"ptratio":14.8,"b":371.58,"lstat":4.74},{"obs":301,"town":"Sharon","town_id":56,"tract":4143,"lon":-71.103500,"lat":42.073500,"medv":24.8,"cmedv":24.8,"crim":0.04417,"zn":70.0,"indus":2.24,"chas":0,"nox":0.4,"rm":6.871,"age":47.4,"dis":7.8278,"rad":5,"tax":358,"ptratio":14.8,"b":390.86,"lstat":6.07},{"obs":302,"town":"Canton","town_id":57,"tract":4151,"lon":-71.087500,"lat":42.095000,"medv":22.0,"cmedv":22.0,"crim":0.03537,"zn":34.0,"indus":6.09,"chas":0,"nox":0.433,"rm":6.590,"age":40.4,"dis":5.4917,"rad":7,"tax":329,"ptratio":16.1,"b":395.75,"lstat":9.50},{"obs":303,"town":"Canton","town_id":57,"tract":4152,"lon":-71.062500,"lat":42.102000,"medv":26.4,"cmedv":26.4,"crim":0.09266,"zn":34.0,"indus":6.09,"chas":0,"nox":0.433,"rm":6.495,"age":18.4,"dis":5.4917,"rad":7,"tax":329,"ptratio":16.1,"b":383.61,"lstat":8.67},{"obs":304,"town":"Canton","town_id":57,"tract":4153,"lon":-71.086500,"lat":42.120000,"medv":33.1,"cmedv":33.1,"crim":0.10000,"zn":34.0,"indus":6.09,"chas":0,"nox":0.433,"rm":6.982,"age":17.7,"dis":5.4917,"rad":7,"tax":329,"ptratio":16.1,"b":390.43,"lstat":4.86},{"obs":305,"town":"Milton","town_id":58,"tract":4161,"lon":-71.046500,"lat":42.145000,"medv":36.1,"cmedv":36.1,"crim":0.05515,"zn":33.0,"indus":2.18,"chas":0,"nox":0.472,"rm":7.236,"age":41.1,"dis":4.0220,"rad":7,"tax":222,"ptratio":18.4,"b":393.68,"lstat":6.93},{"obs":306,"town":"Milton","town_id":58,"tract":4162,"lon":-71.057000,"lat":42.152500,"medv":28.4,"cmedv":28.4,"crim":0.05479,"zn":33.0,"indus":2.18,"chas":0,"nox":0.472,"rm":6.616,"age":58.1,"dis":3.3700,"rad":7,"tax":222,"ptratio":18.4,"b":393.36,"lstat":8.93},{"obs":307,"town":"Milton","town_id":58,"tract":4163,"lon":-71.045000,"lat":42.159000,"medv":33.4,"cmedv":33.4,"crim":0.07503,"zn":33.0,"indus":2.18,"chas":0,"nox":0.472,"rm":7.420,"age":71.9,"dis":3.0992,"rad":7,"tax":222,"ptratio":18.4,"b":396.90,"lstat":6.47},{"obs":308,"town":"Milton","town_id":58,"tract":4164,"lon":-71.028000,"lat":42.156500,"medv":28.2,"cmedv":28.2,"crim":0.04932,"zn":33.0,"indus":2.18,"chas":0,"nox":0.472,"rm":6.849,"age":70.3,"dis":3.1827,"rad":7,"tax":222,"ptratio":18.4,"b":396.90,"lstat":7.53},{"obs":309,"town":"Quincy","town_id":59,"tract":4171,"lon":-71.013800,"lat":42.155500,"medv":22.8,"cmedv":22.8,"crim":0.49298,"zn":0.0,"indus":9.9,"chas":0,"nox":0.544,"rm":6.635,"age":82.5,"dis":3.3175,"rad":4,"tax":304,"ptratio":18.4,"b":396.90,"lstat":4.54},{"obs":310,"town":"Quincy","town_id":59,"tract":4172,"lon":-71.020100,"lat":42.160000,"medv":20.3,"cmedv":20.3,"crim":0.34940,"zn":0.0,"indus":9.9,"chas":0,"nox":0.544,"rm":5.972,"age":76.7,"dis":3.1025,"rad":4,"tax":304,"ptratio":18.4,"b":396.24,"lstat":9.97},{"obs":311,"town":"Quincy","town_id":59,"tract":4173,"lon":-71.016000,"lat":42.176000,"medv":16.1,"cmedv":16.1,"crim":2.63548,"zn":0.0,"indus":9.9,"chas":0,"nox":0.544,"rm":4.973,"age":37.8,"dis":2.5194,"rad":4,"tax":304,"ptratio":18.4,"b":350.45,"lstat":12.64},{"obs":312,"town":"Quincy","town_id":59,"tract":4174,"lon":-71.007500,"lat":42.178000,"medv":22.1,"cmedv":22.1,"crim":0.79041,"zn":0.0,"indus":9.9,"chas":0,"nox":0.544,"rm":6.122,"age":52.8,"dis":2.6403,"rad":4,"tax":304,"ptratio":18.4,"b":396.90,"lstat":5.98},{"obs":313,"town":"Quincy","town_id":59,"tract":4175,"lon":-71.015000,"lat":42.167000,"medv":19.4,"cmedv":19.4,"crim":0.26169,"zn":0.0,"indus":9.9,"chas":0,"nox":0.544,"rm":6.023,"age":90.4,"dis":2.8340,"rad":4,"tax":304,"ptratio":18.4,"b":396.30,"lstat":11.72},{"obs":314,"town":"Quincy","town_id":59,"tract":4176,"lon":-71.007500,"lat":42.161300,"medv":21.6,"cmedv":21.6,"crim":0.26938,"zn":0.0,"indus":9.9,"chas":0,"nox":0.544,"rm":6.266,"age":82.8,"dis":3.2628,"rad":4,"tax":304,"ptratio":18.4,"b":393.39,"lstat":7.90},{"obs":315,"town":"Quincy","town_id":59,"tract":4177,"lon":-71.000000,"lat":42.153000,"medv":23.8,"cmedv":23.8,"crim":0.36920,"zn":0.0,"indus":9.9,"chas":0,"nox":0.544,"rm":6.567,"age":87.3,"dis":3.6023,"rad":4,"tax":304,"ptratio":18.4,"b":395.69,"lstat":9.28},{"obs":316,"town":"Quincy","town_id":59,"tract":4178,"lon":-70.979500,"lat":42.158000,"medv":16.2,"cmedv":16.2,"crim":0.25356,"zn":0.0,"indus":9.9,"chas":0,"nox":0.544,"rm":5.705,"age":77.7,"dis":3.9450,"rad":4,"tax":304,"ptratio":18.4,"b":396.42,"lstat":11.50},{"obs":317,"town":"Quincy","town_id":59,"tract":4179,"lon":-70.988000,"lat":42.148500,"medv":17.8,"cmedv":17.8,"crim":0.31827,"zn":0.0,"indus":9.9,"chas":0,"nox":0.544,"rm":5.914,"age":83.2,"dis":3.9986,"rad":4,"tax":304,"ptratio":18.4,"b":390.70,"lstat":18.33},{"obs":318,"town":"Quincy","town_id":59,"tract":4180,"lon":-71.004000,"lat":42.142500,"medv":19.8,"cmedv":19.8,"crim":0.24522,"zn":0.0,"indus":9.9,"chas":0,"nox":0.544,"rm":5.782,"age":71.7,"dis":4.0317,"rad":4,"tax":304,"ptratio":18.4,"b":396.90,"lstat":15.94},{"obs":319,"town":"Quincy","town_id":59,"tract":4181,"lon":-71.010000,"lat":42.150000,"medv":23.1,"cmedv":23.1,"crim":0.40202,"zn":0.0,"indus":9.9,"chas":0,"nox":0.544,"rm":6.382,"age":67.2,"dis":3.5325,"rad":4,"tax":304,"ptratio":18.4,"b":395.21,"lstat":10.36},{"obs":320,"town":"Quincy","town_id":59,"tract":4182,"lon":-71.020000,"lat":42.151000,"medv":21.0,"cmedv":21.0,"crim":0.47547,"zn":0.0,"indus":9.9,"chas":0,"nox":0.544,"rm":6.113,"age":58.8,"dis":4.0019,"rad":4,"tax":304,"ptratio":18.4,"b":396.23,"lstat":12.73},{"obs":321,"town":"Braintree","town_id":60,"tract":4191,"lon":-71.008500,"lat":42.129000,"medv":23.8,"cmedv":23.8,"crim":0.16760,"zn":0.0,"indus":7.38,"chas":0,"nox":0.493,"rm":6.426,"age":52.3,"dis":4.5404,"rad":5,"tax":287,"ptratio":19.6,"b":396.90,"lstat":7.20},{"obs":322,"town":"Braintree","town_id":60,"tract":4192,"lon":-70.997500,"lat":42.134000,"medv":23.1,"cmedv":23.1,"crim":0.18159,"zn":0.0,"indus":7.38,"chas":0,"nox":0.493,"rm":6.376,"age":54.3,"dis":4.5404,"rad":5,"tax":287,"ptratio":19.6,"b":396.90,"lstat":6.87},{"obs":323,"town":"Braintree","town_id":60,"tract":4193,"lon":-70.990000,"lat":42.136700,"medv":20.4,"cmedv":20.4,"crim":0.35114,"zn":0.0,"indus":7.38,"chas":0,"nox":0.493,"rm":6.041,"age":49.9,"dis":4.7211,"rad":5,"tax":287,"ptratio":19.6,"b":396.90,"lstat":7.70},{"obs":324,"town":"Braintree","town_id":60,"tract":4194,"lon":-70.983400,"lat":42.137500,"medv":18.5,"cmedv":18.5,"crim":0.28392,"zn":0.0,"indus":7.38,"chas":0,"nox":0.493,"rm":5.708,"age":74.3,"dis":4.7211,"rad":5,"tax":287,"ptratio":19.6,"b":391.13,"lstat":11.74},{"obs":325,"town":"Braintree","town_id":60,"tract":4195,"lon":-70.989500,"lat":42.126500,"medv":25.0,"cmedv":25.0,"crim":0.34109,"zn":0.0,"indus":7.38,"chas":0,"nox":0.493,"rm":6.415,"age":40.1,"dis":4.7211,"rad":5,"tax":287,"ptratio":19.6,"b":396.90,"lstat":6.12},{"obs":326,"town":"Braintree","town_id":60,"tract":4196,"lon":-71.000000,"lat":42.106600,"medv":24.6,"cmedv":24.6,"crim":0.19186,"zn":0.0,"indus":7.38,"chas":0,"nox":0.493,"rm":6.431,"age":14.7,"dis":5.4159,"rad":5,"tax":287,"ptratio":19.6,"b":393.68,"lstat":5.08},{"obs":327,"town":"Braintree","town_id":60,"tract":4197,"lon":-70.999500,"lat":42.117500,"medv":23.0,"cmedv":23.0,"crim":0.30347,"zn":0.0,"indus":7.38,"chas":0,"nox":0.493,"rm":6.312,"age":28.9,"dis":5.4159,"rad":5,"tax":287,"ptratio":19.6,"b":396.90,"lstat":6.15},{"obs":328,"town":"Braintree","town_id":60,"tract":4198,"lon":-71.010000,"lat":42.121500,"medv":22.2,"cmedv":22.2,"crim":0.24103,"zn":0.0,"indus":7.38,"chas":0,"nox":0.493,"rm":6.083,"age":43.7,"dis":5.4159,"rad":5,"tax":287,"ptratio":19.6,"b":396.90,"lstat":12.79},{"obs":329,"town":"Randolph","town_id":61,"tract":4201,"lon":-71.027500,"lat":42.113000,"medv":19.3,"cmedv":19.3,"crim":0.06617,"zn":0.0,"indus":3.24,"chas":0,"nox":0.46,"rm":5.868,"age":25.8,"dis":5.2146,"rad":4,"tax":430,"ptratio":16.9,"b":382.44,"lstat":9.97},{"obs":330,"town":"Randolph","town_id":61,"tract":4202,"lon":-71.041500,"lat":42.115000,"medv":22.6,"cmedv":22.6,"crim":0.06724,"zn":0.0,"indus":3.24,"chas":0,"nox":0.46,"rm":6.333,"age":17.2,"dis":5.2146,"rad":4,"tax":430,"ptratio":16.9,"b":375.21,"lstat":7.34},{"obs":331,"town":"Randolph","town_id":61,"tract":4203,"lon":-71.025000,"lat":42.098000,"medv":19.8,"cmedv":19.8,"crim":0.04544,"zn":0.0,"indus":3.24,"chas":0,"nox":0.46,"rm":6.144,"age":32.2,"dis":5.8736,"rad":4,"tax":430,"ptratio":16.9,"b":368.57,"lstat":9.09},{"obs":332,"town":"Holbrook","town_id":62,"tract":4211,"lon":-71.011500,"lat":42.086500,"medv":17.1,"cmedv":17.1,"crim":0.05023,"zn":35.0,"indus":6.06,"chas":0,"nox":0.4379,"rm":5.706,"age":28.4,"dis":6.6407,"rad":1,"tax":304,"ptratio":16.9,"b":394.02,"lstat":12.43},{"obs":333,"town":"Holbrook","town_id":62,"tract":4212,"lon":-70.996000,"lat":42.089500,"medv":19.4,"cmedv":19.4,"crim":0.03466,"zn":35.0,"indus":6.06,"chas":0,"nox":0.4379,"rm":6.031,"age":23.3,"dis":6.6407,"rad":1,"tax":304,"ptratio":16.9,"b":362.25,"lstat":7.83},{"obs":334,"town":"Weymouth","town_id":63,"tract":4221,"lon":-70.979500,"lat":42.099500,"medv":22.2,"cmedv":22.2,"crim":0.05083,"zn":0.0,"indus":5.19,"chas":0,"nox":0.515,"rm":6.316,"age":38.1,"dis":6.4584,"rad":5,"tax":224,"ptratio":20.2,"b":389.71,"lstat":5.68},{"obs":335,"town":"Weymouth","town_id":63,"tract":4222,"lon":-70.965000,"lat":42.101000,"medv":20.7,"cmedv":20.7,"crim":0.03738,"zn":0.0,"indus":5.19,"chas":0,"nox":0.515,"rm":6.310,"age":38.5,"dis":6.4584,"rad":5,"tax":224,"ptratio":20.2,"b":389.40,"lstat":6.75},{"obs":336,"town":"Weymouth","town_id":63,"tract":4223,"lon":-70.970000,"lat":42.115000,"medv":21.1,"cmedv":21.1,"crim":0.03961,"zn":0.0,"indus":5.19,"chas":0,"nox":0.515,"rm":6.037,"age":34.5,"dis":5.9853,"rad":5,"tax":224,"ptratio":20.2,"b":396.90,"lstat":8.01},{"obs":337,"town":"Weymouth","town_id":63,"tract":4224,"lon":-70.976000,"lat":42.128000,"medv":19.5,"cmedv":19.5,"crim":0.03427,"zn":0.0,"indus":5.19,"chas":0,"nox":0.515,"rm":5.869,"age":46.3,"dis":5.2311,"rad":5,"tax":224,"ptratio":20.2,"b":396.90,"lstat":9.80},{"obs":338,"town":"Weymouth","town_id":63,"tract":4225,"lon":-70.960200,"lat":42.127000,"medv":18.5,"cmedv":18.5,"crim":0.03041,"zn":0.0,"indus":5.19,"chas":0,"nox":0.515,"rm":5.895,"age":59.6,"dis":5.6150,"rad":5,"tax":224,"ptratio":20.2,"b":394.81,"lstat":10.56},{"obs":339,"town":"Weymouth","town_id":63,"tract":4226,"lon":-70.963300,"lat":42.137400,"medv":20.6,"cmedv":20.6,"crim":0.03306,"zn":0.0,"indus":5.19,"chas":0,"nox":0.515,"rm":6.059,"age":37.3,"dis":4.8122,"rad":5,"tax":224,"ptratio":20.2,"b":396.14,"lstat":8.51},{"obs":340,"town":"Weymouth","town_id":63,"tract":4227,"lon":-70.967500,"lat":42.144000,"medv":19.0,"cmedv":19.0,"crim":0.05497,"zn":0.0,"indus":5.19,"chas":0,"nox":0.515,"rm":5.985,"age":45.4,"dis":4.8122,"rad":5,"tax":224,"ptratio":20.2,"b":396.90,"lstat":9.74},{"obs":341,"town":"Weymouth","town_id":63,"tract":4228,"lon":-70.965000,"lat":42.150300,"medv":18.7,"cmedv":18.7,"crim":0.06151,"zn":0.0,"indus":5.19,"chas":0,"nox":0.515,"rm":5.968,"age":58.5,"dis":4.8122,"rad":5,"tax":224,"ptratio":20.2,"b":396.90,"lstat":9.29},{"obs":342,"town":"Cohasset","town_id":64,"tract":4231,"lon":-70.887500,"lat":42.146500,"medv":32.7,"cmedv":32.7,"crim":0.01301,"zn":35.0,"indus":1.52,"chas":0,"nox":0.442,"rm":7.241,"age":49.3,"dis":7.0379,"rad":1,"tax":284,"ptratio":15.5,"b":394.74,"lstat":5.49},{"obs":343,"town":"Hull","town_id":65,"tract":5001,"lon":-70.915000,"lat":42.160000,"medv":16.5,"cmedv":16.5,"crim":0.02498,"zn":0.0,"indus":1.89,"chas":0,"nox":0.518,"rm":6.540,"age":59.7,"dis":6.2669,"rad":1,"tax":422,"ptratio":15.9,"b":389.96,"lstat":8.65},{"obs":344,"town":"Hingham","town_id":66,"tract":5011,"lon":-70.937000,"lat":42.147500,"medv":23.9,"cmedv":23.9,"crim":0.02543,"zn":55.0,"indus":3.78,"chas":0,"nox":0.484,"rm":6.696,"age":56.4,"dis":5.7321,"rad":5,"tax":370,"ptratio":17.6,"b":396.90,"lstat":7.18},{"obs":345,"town":"Hingham","town_id":66,"tract":5012,"lon":-70.932500,"lat":42.123000,"medv":31.2,"cmedv":31.2,"crim":0.03049,"zn":55.0,"indus":3.78,"chas":0,"nox":0.484,"rm":6.874,"age":28.1,"dis":6.4654,"rad":5,"tax":370,"ptratio":17.6,"b":387.97,"lstat":4.61},{"obs":346,"town":"Rockland","town_id":67,"tract":5021,"lon":-70.947000,"lat":42.072500,"medv":17.5,"cmedv":17.5,"crim":0.03113,"zn":0.0,"indus":4.39,"chas":0,"nox":0.442,"rm":6.014,"age":48.5,"dis":8.0136,"rad":3,"tax":352,"ptratio":18.8,"b":385.64,"lstat":10.53},{"obs":347,"town":"Rockland","town_id":67,"tract":5022,"lon":-70.950100,"lat":42.082500,"medv":17.2,"cmedv":17.2,"crim":0.06162,"zn":0.0,"indus":4.39,"chas":0,"nox":0.442,"rm":5.898,"age":52.3,"dis":8.0136,"rad":3,"tax":352,"ptratio":18.8,"b":364.61,"lstat":12.67},{"obs":348,"town":"Hanover","town_id":68,"tract":5031,"lon":-70.927500,"lat":42.079500,"medv":23.1,"cmedv":23.1,"crim":0.01870,"zn":85.0,"indus":4.15,"chas":0,"nox":0.429,"rm":6.516,"age":27.7,"dis":8.5353,"rad":4,"tax":351,"ptratio":17.9,"b":392.43,"lstat":6.36},{"obs":349,"town":"Norwell","town_id":69,"tract":5041,"lon":-70.920000,"lat":42.101600,"medv":24.5,"cmedv":24.5,"crim":0.01501,"zn":80.0,"indus":2.01,"chas":0,"nox":0.435,"rm":6.635,"age":29.7,"dis":8.3440,"rad":4,"tax":280,"ptratio":17.0,"b":390.94,"lstat":5.99},{"obs":350,"town":"Scituate","town_id":70,"tract":5051,"lon":-70.855000,"lat":42.130000,"medv":26.6,"cmedv":26.6,"crim":0.02899,"zn":40.0,"indus":1.25,"chas":0,"nox":0.429,"rm":6.939,"age":34.5,"dis":8.7921,"rad":1,"tax":335,"ptratio":19.7,"b":389.85,"lstat":5.89},{"obs":351,"town":"Scituate","town_id":70,"tract":5052,"lon":-70.833000,"lat":42.115000,"medv":22.9,"cmedv":22.9,"crim":0.06211,"zn":40.0,"indus":1.25,"chas":0,"nox":0.429,"rm":6.490,"age":44.4,"dis":8.7921,"rad":1,"tax":335,"ptratio":19.7,"b":396.90,"lstat":5.98},{"obs":352,"town":"Marshfield","town_id":71,"tract":5061,"lon":-70.830000,"lat":42.077500,"medv":24.1,"cmedv":24.1,"crim":0.07950,"zn":60.0,"indus":1.69,"chas":0,"nox":0.411,"rm":6.579,"age":35.9,"dis":10.7103,"rad":4,"tax":411,"ptratio":18.3,"b":370.78,"lstat":5.49},{"obs":353,"town":"Marshfield","town_id":71,"tract":5062,"lon":-70.810000,"lat":42.059000,"medv":18.6,"cmedv":18.6,"crim":0.07244,"zn":60.0,"indus":1.69,"chas":0,"nox":0.411,"rm":5.884,"age":18.5,"dis":10.7103,"rad":4,"tax":411,"ptratio":18.3,"b":392.33,"lstat":7.79},{"obs":354,"town":"Duxbury","town_id":72,"tract":5071,"lon":-70.830000,"lat":42.048500,"medv":30.1,"cmedv":30.1,"crim":0.01709,"zn":90.0,"indus":2.02,"chas":0,"nox":0.41,"rm":6.728,"age":36.1,"dis":12.1265,"rad":5,"tax":187,"ptratio":17.0,"b":384.46,"lstat":4.50},{"obs":355,"town":"Pembroke","town_id":73,"tract":5081,"lon":-70.853000,"lat":42.052000,"medv":18.2,"cmedv":18.2,"crim":0.04301,"zn":80.0,"indus":1.91,"chas":0,"nox":0.413,"rm":5.663,"age":21.9,"dis":10.5857,"rad":4,"tax":334,"ptratio":22.0,"b":382.80,"lstat":8.05},{"obs":356,"town":"Pembroke","town_id":73,"tract":5082,"lon":-70.852500,"lat":42.030000,"medv":20.6,"cmedv":20.6,"crim":0.10659,"zn":80.0,"indus":1.91,"chas":0,"nox":0.413,"rm":5.936,"age":19.5,"dis":10.5857,"rad":4,"tax":334,"ptratio":22.0,"b":376.04,"lstat":5.57},{"obs":357,"town":"Boston Allston-Brighton","town_id":74,"tract":1,"lon":-71.083000,"lat":42.217200,"medv":17.8,"cmedv":17.8,"crim":8.98296,"zn":0.0,"indus":18.1,"chas":1,"nox":0.77,"rm":6.212,"age":97.4,"dis":2.1222,"rad":24,"tax":666,"ptratio":20.2,"b":377.73,"lstat":17.60},{"obs":358,"town":"Boston Allston-Brighton","town_id":74,"tract":2,"lon":-71.095000,"lat":42.212000,"medv":21.7,"cmedv":21.7,"crim":3.84970,"zn":0.0,"indus":18.1,"chas":1,"nox":0.77,"rm":6.395,"age":91.0,"dis":2.5052,"rad":24,"tax":666,"ptratio":20.2,"b":391.34,"lstat":13.27},{"obs":359,"town":"Boston Allston-Brighton","town_id":74,"tract":3,"lon":-71.100700,"lat":42.210000,"medv":22.7,"cmedv":22.7,"crim":5.20177,"zn":0.0,"indus":18.1,"chas":1,"nox":0.77,"rm":6.127,"age":83.4,"dis":2.7227,"rad":24,"tax":666,"ptratio":20.2,"b":395.43,"lstat":11.48},{"obs":360,"town":"Boston Allston-Brighton","town_id":74,"tract":4,"lon":-71.093000,"lat":42.207000,"medv":22.6,"cmedv":22.6,"crim":4.26131,"zn":0.0,"indus":18.1,"chas":0,"nox":0.77,"rm":6.112,"age":81.3,"dis":2.5091,"rad":24,"tax":666,"ptratio":20.2,"b":390.74,"lstat":12.67},{"obs":361,"town":"Boston Allston-Brighton","town_id":74,"tract":5,"lon":-71.090500,"lat":42.203300,"medv":25.0,"cmedv":25.0,"crim":4.54192,"zn":0.0,"indus":18.1,"chas":0,"nox":0.77,"rm":6.398,"age":88.0,"dis":2.5182,"rad":24,"tax":666,"ptratio":20.2,"b":374.56,"lstat":7.79},{"obs":362,"town":"Boston Allston-Brighton","town_id":74,"tract":6,"lon":-71.086500,"lat":42.210000,"medv":19.9,"cmedv":19.9,"crim":3.83684,"zn":0.0,"indus":18.1,"chas":0,"nox":0.77,"rm":6.251,"age":91.1,"dis":2.2955,"rad":24,"tax":666,"ptratio":20.2,"b":350.65,"lstat":14.19},{"obs":363,"town":"Boston Allston-Brighton","town_id":74,"tract":7,"lon":-71.081000,"lat":42.208000,"medv":20.8,"cmedv":20.8,"crim":3.67822,"zn":0.0,"indus":18.1,"chas":0,"nox":0.77,"rm":5.362,"age":96.2,"dis":2.1036,"rad":24,"tax":666,"ptratio":20.2,"b":380.79,"lstat":10.19},{"obs":364,"town":"Boston Allston-Brighton","town_id":74,"tract":8,"lon":-71.086500,"lat":42.215000,"medv":16.8,"cmedv":16.8,"crim":4.22239,"zn":0.0,"indus":18.1,"chas":1,"nox":0.77,"rm":5.803,"age":89.0,"dis":1.9047,"rad":24,"tax":666,"ptratio":20.2,"b":353.04,"lstat":14.64},{"obs":365,"town":"Boston Back Bay","town_id":75,"tract":101,"lon":-71.059000,"lat":42.209800,"medv":21.9,"cmedv":21.9,"crim":3.47428,"zn":0.0,"indus":18.1,"chas":1,"nox":0.718,"rm":8.780,"age":82.9,"dis":1.9047,"rad":24,"tax":666,"ptratio":20.2,"b":354.55,"lstat":5.29},{"obs":366,"town":"Boston Back Bay","town_id":75,"tract":102,"lon":-71.059500,"lat":42.207500,"medv":27.5,"cmedv":27.5,"crim":4.55587,"zn":0.0,"indus":18.1,"chas":0,"nox":0.718,"rm":3.561,"age":87.9,"dis":1.6132,"rad":24,"tax":666,"ptratio":20.2,"b":354.70,"lstat":7.12},{"obs":367,"town":"Boston Back Bay","town_id":75,"tract":104,"lon":-71.054000,"lat":42.205200,"medv":21.9,"cmedv":21.9,"crim":3.69695,"zn":0.0,"indus":18.1,"chas":0,"nox":0.718,"rm":4.963,"age":91.4,"dis":1.7523,"rad":24,"tax":666,"ptratio":20.2,"b":316.03,"lstat":14.00},{"obs":368,"town":"Boston Back Bay","town_id":75,"tract":105,"lon":-71.050800,"lat":42.207000,"medv":23.1,"cmedv":23.1,"crim":13.52220,"zn":0.0,"indus":18.1,"chas":0,"nox":0.631,"rm":3.863,"age":100.0,"dis":1.5106,"rad":24,"tax":666,"ptratio":20.2,"b":131.42,"lstat":13.33},{"obs":369,"town":"Boston Back Bay","town_id":75,"tract":107,"lon":-71.048000,"lat":42.210500,"medv":50.0,"cmedv":50.0,"crim":4.89822,"zn":0.0,"indus":18.1,"chas":0,"nox":0.631,"rm":4.970,"age":100.0,"dis":1.3325,"rad":24,"tax":666,"ptratio":20.2,"b":375.52,"lstat":3.26},{"obs":370,"town":"Boston Back Bay","town_id":75,"tract":108,"lon":-71.049700,"lat":42.212500,"medv":50.0,"cmedv":50.0,"crim":5.66998,"zn":0.0,"indus":18.1,"chas":1,"nox":0.631,"rm":6.683,"age":96.8,"dis":1.3567,"rad":24,"tax":666,"ptratio":20.2,"b":375.33,"lstat":3.73},{"obs":371,"town":"Boston Beacon Hill","town_id":76,"tract":201,"lon":-71.042200,"lat":42.214400,"medv":50.0,"cmedv":50.0,"crim":6.53876,"zn":0.0,"indus":18.1,"chas":1,"nox":0.631,"rm":7.016,"age":97.5,"dis":1.2024,"rad":24,"tax":666,"ptratio":20.2,"b":392.05,"lstat":2.96},{"obs":372,"town":"Boston Beacon Hill","town_id":76,"tract":202,"lon":-71.041700,"lat":42.216000,"medv":50.0,"cmedv":50.0,"crim":9.23230,"zn":0.0,"indus":18.1,"chas":0,"nox":0.631,"rm":6.216,"age":100.0,"dis":1.1691,"rad":24,"tax":666,"ptratio":20.2,"b":366.15,"lstat":9.53},{"obs":373,"town":"Boston Beacon Hill","town_id":76,"tract":203,"lon":-71.039700,"lat":42.218200,"medv":50.0,"cmedv":50.0,"crim":8.26725,"zn":0.0,"indus":18.1,"chas":1,"nox":0.668,"rm":5.875,"age":89.6,"dis":1.1296,"rad":24,"tax":666,"ptratio":20.2,"b":347.88,"lstat":8.88},{"obs":374,"town":"Boston North End","town_id":77,"tract":301,"lon":-71.033900,"lat":42.220700,"medv":13.8,"cmedv":13.8,"crim":11.10810,"zn":0.0,"indus":18.1,"chas":0,"nox":0.668,"rm":4.906,"age":100.0,"dis":1.1742,"rad":24,"tax":666,"ptratio":20.2,"b":396.90,"lstat":34.77},{"obs":375,"town":"Boston North End","town_id":77,"tract":302,"lon":-71.034600,"lat":42.218700,"medv":13.8,"cmedv":13.8,"crim":18.49820,"zn":0.0,"indus":18.1,"chas":0,"nox":0.668,"rm":4.138,"age":100.0,"dis":1.1370,"rad":24,"tax":666,"ptratio":20.2,"b":396.90,"lstat":37.97},{"obs":376,"town":"Boston Charlestown","town_id":78,"tract":401,"lon":-71.036700,"lat":42.224000,"medv":15.0,"cmedv":15.0,"crim":19.60910,"zn":0.0,"indus":18.1,"chas":0,"nox":0.671,"rm":7.313,"age":97.9,"dis":1.3163,"rad":24,"tax":666,"ptratio":20.2,"b":396.90,"lstat":13.44},{"obs":377,"town":"Boston Charlestown","town_id":78,"tract":402,"lon":-71.034000,"lat":42.226000,"medv":13.9,"cmedv":13.9,"crim":15.28800,"zn":0.0,"indus":18.1,"chas":0,"nox":0.671,"rm":6.649,"age":93.3,"dis":1.3449,"rad":24,"tax":666,"ptratio":20.2,"b":363.02,"lstat":23.24},{"obs":378,"town":"Boston Charlestown","town_id":78,"tract":403,"lon":-71.038000,"lat":42.226500,"medv":13.3,"cmedv":13.3,"crim":9.82349,"zn":0.0,"indus":18.1,"chas":0,"nox":0.671,"rm":6.794,"age":98.8,"dis":1.3580,"rad":24,"tax":666,"ptratio":20.2,"b":396.90,"lstat":21.24},{"obs":379,"town":"Boston Charlestown","town_id":78,"tract":404,"lon":-71.040000,"lat":42.224800,"medv":13.1,"cmedv":13.1,"crim":23.64820,"zn":0.0,"indus":18.1,"chas":0,"nox":0.671,"rm":6.380,"age":96.2,"dis":1.3861,"rad":24,"tax":666,"ptratio":20.2,"b":396.90,"lstat":23.69},{"obs":380,"town":"Boston Charlestown","town_id":78,"tract":405,"lon":-71.040000,"lat":42.227500,"medv":10.2,"cmedv":10.2,"crim":17.86670,"zn":0.0,"indus":18.1,"chas":0,"nox":0.671,"rm":6.223,"age":100.0,"dis":1.3861,"rad":24,"tax":666,"ptratio":20.2,"b":393.74,"lstat":21.78},{"obs":381,"town":"Boston Charlestown","town_id":78,"tract":406,"lon":-71.046000,"lat":42.230000,"medv":10.4,"cmedv":10.4,"crim":88.97620,"zn":0.0,"indus":18.1,"chas":0,"nox":0.671,"rm":6.968,"age":91.9,"dis":1.4165,"rad":24,"tax":666,"ptratio":20.2,"b":396.90,"lstat":17.21},{"obs":382,"town":"Boston East Boston","town_id":79,"tract":407,"lon":-71.041000,"lat":42.229000,"medv":10.9,"cmedv":10.9,"crim":15.87440,"zn":0.0,"indus":18.1,"chas":0,"nox":0.671,"rm":6.545,"age":99.1,"dis":1.5192,"rad":24,"tax":666,"ptratio":20.2,"b":396.90,"lstat":21.08},{"obs":383,"town":"Boston East Boston","town_id":79,"tract":501,"lon":-71.023000,"lat":42.228700,"medv":11.3,"cmedv":11.3,"crim":9.18702,"zn":0.0,"indus":18.1,"chas":0,"nox":0.7,"rm":5.536,"age":100.0,"dis":1.5804,"rad":24,"tax":666,"ptratio":20.2,"b":396.90,"lstat":23.60},{"obs":384,"town":"Boston East Boston","town_id":79,"tract":502,"lon":-71.021500,"lat":42.227000,"medv":12.3,"cmedv":12.3,"crim":7.99248,"zn":0.0,"indus":18.1,"chas":0,"nox":0.7,"rm":5.520,"age":100.0,"dis":1.5331,"rad":24,"tax":666,"ptratio":20.2,"b":396.90,"lstat":24.56},{"obs":385,"town":"Boston East Boston","town_id":79,"tract":503,"lon":-71.024500,"lat":42.223500,"medv":8.8,"cmedv":8.8,"crim":20.08490,"zn":0.0,"indus":18.1,"chas":0,"nox":0.7,"rm":4.368,"age":91.2,"dis":1.4395,"rad":24,"tax":666,"ptratio":20.2,"b":285.83,"lstat":30.63},{"obs":386,"town":"Boston East Boston","town_id":79,"tract":504,"lon":-71.023500,"lat":42.221300,"medv":7.2,"cmedv":7.2,"crim":16.81180,"zn":0.0,"indus":18.1,"chas":0,"nox":0.7,"rm":5.277,"age":98.1,"dis":1.4261,"rad":24,"tax":666,"ptratio":20.2,"b":396.90,"lstat":30.81},{"obs":387,"town":"Boston East Boston","town_id":79,"tract":506,"lon":-71.022800,"lat":42.223100,"medv":10.5,"cmedv":10.5,"crim":24.39380,"zn":0.0,"indus":18.1,"chas":0,"nox":0.7,"rm":4.652,"age":100.0,"dis":1.4672,"rad":24,"tax":666,"ptratio":20.2,"b":396.90,"lstat":28.28},{"obs":388,"town":"Boston East Boston","town_id":79,"tract":507,"lon":-71.021500,"lat":42.224800,"medv":7.4,"cmedv":7.4,"crim":22.59710,"zn":0.0,"indus":18.1,"chas":0,"nox":0.7,"rm":5.000,"age":89.5,"dis":1.5184,"rad":24,"tax":666,"ptratio":20.2,"b":396.90,"lstat":31.99},{"obs":389,"town":"Boston East Boston","town_id":79,"tract":508,"lon":-71.019500,"lat":42.225500,"medv":10.2,"cmedv":10.2,"crim":14.33370,"zn":0.0,"indus":18.1,"chas":0,"nox":0.7,"rm":4.880,"age":100.0,"dis":1.5895,"rad":24,"tax":666,"ptratio":20.2,"b":372.92,"lstat":30.62},{"obs":390,"town":"Boston East Boston","town_id":79,"tract":509,"lon":-71.016800,"lat":42.228100,"medv":11.5,"cmedv":11.5,"crim":8.15174,"zn":0.0,"indus":18.1,"chas":0,"nox":0.7,"rm":5.390,"age":98.9,"dis":1.7281,"rad":24,"tax":666,"ptratio":20.2,"b":396.90,"lstat":20.85},{"obs":391,"town":"Boston East Boston","town_id":79,"tract":510,"lon":-71.010900,"lat":42.230000,"medv":15.1,"cmedv":15.1,"crim":6.96215,"zn":0.0,"indus":18.1,"chas":0,"nox":0.7,"rm":5.713,"age":97.0,"dis":1.9265,"rad":24,"tax":666,"ptratio":20.2,"b":394.43,"lstat":17.11},{"obs":392,"town":"Boston East Boston","town_id":79,"tract":511,"lon":-71.003500,"lat":42.233000,"medv":23.2,"cmedv":23.2,"crim":5.29305,"zn":0.0,"indus":18.1,"chas":0,"nox":0.7,"rm":6.051,"age":82.5,"dis":2.1678,"rad":24,"tax":666,"ptratio":20.2,"b":378.38,"lstat":18.76},{"obs":393,"town":"Boston East Boston","town_id":79,"tract":512,"lon":-71.020000,"lat":42.220500,"medv":9.7,"cmedv":9.7,"crim":11.57790,"zn":0.0,"indus":18.1,"chas":0,"nox":0.7,"rm":5.036,"age":97.0,"dis":1.7700,"rad":24,"tax":666,"ptratio":20.2,"b":396.90,"lstat":25.68},{"obs":394,"town":"Boston South Boston","town_id":80,"tract":601,"lon":-71.016700,"lat":42.201000,"medv":13.8,"cmedv":13.8,"crim":8.64476,"zn":0.0,"indus":18.1,"chas":0,"nox":0.693,"rm":6.193,"age":92.6,"dis":1.7912,"rad":24,"tax":666,"ptratio":20.2,"b":396.90,"lstat":15.17},{"obs":395,"town":"Boston South Boston","town_id":80,"tract":602,"lon":-71.020000,"lat":42.199300,"medv":12.7,"cmedv":12.7,"crim":13.35980,"zn":0.0,"indus":18.1,"chas":0,"nox":0.693,"rm":5.887,"age":94.7,"dis":1.7821,"rad":24,"tax":666,"ptratio":20.2,"b":396.90,"lstat":16.35},{"obs":396,"town":"Boston South Boston","town_id":80,"tract":603,"lon":-71.022000,"lat":42.199600,"medv":13.1,"cmedv":13.1,"crim":8.71675,"zn":0.0,"indus":18.1,"chas":0,"nox":0.693,"rm":6.471,"age":98.8,"dis":1.7257,"rad":24,"tax":666,"ptratio":20.2,"b":391.98,"lstat":17.12},{"obs":397,"town":"Boston South Boston","town_id":80,"tract":604,"lon":-71.026000,"lat":42.199300,"medv":12.5,"cmedv":12.5,"crim":5.87205,"zn":0.0,"indus":18.1,"chas":0,"nox":0.693,"rm":6.405,"age":96.0,"dis":1.6768,"rad":24,"tax":666,"ptratio":20.2,"b":396.90,"lstat":19.37},{"obs":398,"town":"Boston South Boston","town_id":80,"tract":605,"lon":-71.025000,"lat":42.202400,"medv":8.5,"cmedv":8.5,"crim":7.67202,"zn":0.0,"indus":18.1,"chas":0,"nox":0.693,"rm":5.747,"age":98.9,"dis":1.6334,"rad":24,"tax":666,"ptratio":20.2,"b":393.10,"lstat":19.92},{"obs":399,"town":"Boston South Boston","town_id":80,"tract":606,"lon":-71.023000,"lat":42.209000,"medv":5.0,"cmedv":5.0,"crim":38.35180,"zn":0.0,"indus":18.1,"chas":0,"nox":0.693,"rm":5.453,"age":100.0,"dis":1.4896,"rad":24,"tax":666,"ptratio":20.2,"b":396.90,"lstat":30.59},{"obs":400,"town":"Boston South Boston","town_id":80,"tract":607,"lon":-71.033000,"lat":42.203200,"medv":6.3,"cmedv":6.3,"crim":9.91655,"zn":0.0,"indus":18.1,"chas":0,"nox":0.693,"rm":5.852,"age":77.8,"dis":1.5004,"rad":24,"tax":666,"ptratio":20.2,"b":338.16,"lstat":29.97},{"obs":401,"town":"Boston South Boston","town_id":80,"tract":608,"lon":-71.032600,"lat":42.201100,"medv":5.6,"cmedv":5.6,"crim":25.04610,"zn":0.0,"indus":18.1,"chas":0,"nox":0.693,"rm":5.987,"age":100.0,"dis":1.5888,"rad":24,"tax":666,"ptratio":20.2,"b":396.90,"lstat":26.77},{"obs":402,"town":"Boston South Boston","town_id":80,"tract":609,"lon":-71.030000,"lat":42.201500,"medv":7.2,"cmedv":7.2,"crim":14.23620,"zn":0.0,"indus":18.1,"chas":0,"nox":0.693,"rm":6.343,"age":100.0,"dis":1.5741,"rad":24,"tax":666,"ptratio":20.2,"b":396.90,"lstat":20.32},{"obs":403,"town":"Boston South Boston","town_id":80,"tract":610,"lon":-71.030000,"lat":42.198800,"medv":12.1,"cmedv":12.1,"crim":9.59571,"zn":0.0,"indus":18.1,"chas":0,"nox":0.693,"rm":6.404,"age":100.0,"dis":1.6390,"rad":24,"tax":666,"ptratio":20.2,"b":376.11,"lstat":20.31},{"obs":404,"town":"Boston South Boston","town_id":80,"tract":612,"lon":-71.033200,"lat":42.198000,"medv":8.3,"cmedv":8.3,"crim":24.80170,"zn":0.0,"indus":18.1,"chas":0,"nox":0.693,"rm":5.349,"age":96.0,"dis":1.7028,"rad":24,"tax":666,"ptratio":20.2,"b":396.90,"lstat":19.77},{"obs":405,"town":"Boston South Boston","town_id":80,"tract":613,"lon":-71.034500,"lat":42.200100,"medv":8.5,"cmedv":8.5,"crim":41.52920,"zn":0.0,"indus":18.1,"chas":0,"nox":0.693,"rm":5.531,"age":85.4,"dis":1.6074,"rad":24,"tax":666,"ptratio":20.2,"b":329.46,"lstat":27.38},{"obs":406,"town":"Boston South Boston","town_id":80,"tract":614,"lon":-71.032000,"lat":42.205700,"medv":5.0,"cmedv":5.0,"crim":67.92080,"zn":0.0,"indus":18.1,"chas":0,"nox":0.693,"rm":5.683,"age":100.0,"dis":1.4254,"rad":24,"tax":666,"ptratio":20.2,"b":384.97,"lstat":22.98},{"obs":407,"town":"Boston Downtown","town_id":81,"tract":702,"lon":-71.039000,"lat":42.219800,"medv":11.9,"cmedv":11.9,"crim":20.71620,"zn":0.0,"indus":18.1,"chas":0,"nox":0.659,"rm":4.138,"age":100.0,"dis":1.1781,"rad":24,"tax":666,"ptratio":20.2,"b":370.22,"lstat":23.34},{"obs":408,"town":"Boston Downtown","town_id":81,"tract":703,"lon":-71.042700,"lat":42.209000,"medv":27.9,"cmedv":27.9,"crim":11.95110,"zn":0.0,"indus":18.1,"chas":0,"nox":0.659,"rm":5.608,"age":100.0,"dis":1.2852,"rad":24,"tax":666,"ptratio":20.2,"b":332.09,"lstat":12.13},{"obs":409,"town":"Boston Downtown","town_id":81,"tract":705,"lon":-71.043700,"lat":42.205000,"medv":17.2,"cmedv":17.2,"crim":7.40389,"zn":0.0,"indus":18.1,"chas":0,"nox":0.597,"rm":5.617,"age":97.9,"dis":1.4547,"rad":24,"tax":666,"ptratio":20.2,"b":314.64,"lstat":26.40},{"obs":410,"town":"Boston Downtown","town_id":81,"tract":706,"lon":-71.045500,"lat":42.206000,"medv":27.5,"cmedv":27.5,"crim":14.43830,"zn":0.0,"indus":18.1,"chas":0,"nox":0.597,"rm":6.852,"age":100.0,"dis":1.4655,"rad":24,"tax":666,"ptratio":20.2,"b":179.36,"lstat":19.78},{"obs":411,"town":"Boston Downtown","town_id":81,"tract":707,"lon":-71.046200,"lat":42.207500,"medv":15.0,"cmedv":15.0,"crim":51.13580,"zn":0.0,"indus":18.1,"chas":0,"nox":0.597,"rm":5.757,"age":100.0,"dis":1.4130,"rad":24,"tax":666,"ptratio":20.2,"b":2.60,"lstat":10.11},{"obs":412,"town":"Boston Downtown","town_id":81,"tract":708,"lon":-71.048700,"lat":42.204800,"medv":17.2,"cmedv":17.2,"crim":14.05070,"zn":0.0,"indus":18.1,"chas":0,"nox":0.597,"rm":6.657,"age":100.0,"dis":1.5275,"rad":24,"tax":666,"ptratio":20.2,"b":35.05,"lstat":21.22},{"obs":413,"town":"Boston Downtown","town_id":81,"tract":709,"lon":-71.047000,"lat":42.203000,"medv":17.9,"cmedv":17.9,"crim":18.81100,"zn":0.0,"indus":18.1,"chas":0,"nox":0.597,"rm":4.628,"age":100.0,"dis":1.5539,"rad":24,"tax":666,"ptratio":20.2,"b":28.79,"lstat":34.37},{"obs":414,"town":"Boston Downtown","town_id":81,"tract":710,"lon":-71.045100,"lat":42.201500,"medv":16.3,"cmedv":16.3,"crim":28.65580,"zn":0.0,"indus":18.1,"chas":0,"nox":0.597,"rm":5.155,"age":100.0,"dis":1.5894,"rad":24,"tax":666,"ptratio":20.2,"b":210.97,"lstat":20.08},{"obs":415,"town":"Boston Roxbury","town_id":82,"tract":801,"lon":-71.042000,"lat":42.198500,"medv":7.0,"cmedv":7.0,"crim":45.74610,"zn":0.0,"indus":18.1,"chas":0,"nox":0.693,"rm":4.519,"age":100.0,"dis":1.6582,"rad":24,"tax":666,"ptratio":20.2,"b":88.27,"lstat":36.98},{"obs":416,"town":"Boston Roxbury","town_id":82,"tract":802,"lon":-71.045500,"lat":42.195300,"medv":7.2,"cmedv":7.2,"crim":18.08460,"zn":0.0,"indus":18.1,"chas":0,"nox":0.679,"rm":6.434,"age":100.0,"dis":1.8347,"rad":24,"tax":666,"ptratio":20.2,"b":27.25,"lstat":29.05},{"obs":417,"town":"Boston Roxbury","town_id":82,"tract":803,"lon":-71.047700,"lat":42.196500,"medv":7.5,"cmedv":7.5,"crim":10.83420,"zn":0.0,"indus":18.1,"chas":0,"nox":0.679,"rm":6.782,"age":90.8,"dis":1.8195,"rad":24,"tax":666,"ptratio":20.2,"b":21.57,"lstat":25.79},{"obs":418,"town":"Boston Roxbury","town_id":82,"tract":805,"lon":-71.049800,"lat":42.200700,"medv":10.4,"cmedv":10.4,"crim":25.94060,"zn":0.0,"indus":18.1,"chas":0,"nox":0.679,"rm":5.304,"age":89.1,"dis":1.6475,"rad":24,"tax":666,"ptratio":20.2,"b":127.36,"lstat":26.64},{"obs":419,"town":"Boston Roxbury","town_id":82,"tract":807,"lon":-71.052500,"lat":42.198900,"medv":8.8,"cmedv":8.8,"crim":73.53410,"zn":0.0,"indus":18.1,"chas":0,"nox":0.679,"rm":5.957,"age":100.0,"dis":1.8026,"rad":24,"tax":666,"ptratio":20.2,"b":16.45,"lstat":20.62},{"obs":420,"town":"Boston Roxbury","town_id":82,"tract":808,"lon":-71.058600,"lat":42.199900,"medv":8.4,"cmedv":8.4,"crim":11.81230,"zn":0.0,"indus":18.1,"chas":0,"nox":0.718,"rm":6.824,"age":76.5,"dis":1.7940,"rad":24,"tax":666,"ptratio":20.2,"b":48.45,"lstat":22.74},{"obs":421,"town":"Boston Roxbury","town_id":82,"tract":809,"lon":-71.061800,"lat":42.199000,"medv":16.7,"cmedv":16.7,"crim":11.08740,"zn":0.0,"indus":18.1,"chas":0,"nox":0.718,"rm":6.411,"age":100.0,"dis":1.8589,"rad":24,"tax":666,"ptratio":20.2,"b":318.75,"lstat":15.02},{"obs":422,"town":"Boston Roxbury","town_id":82,"tract":810,"lon":-71.065000,"lat":42.201800,"medv":14.2,"cmedv":14.2,"crim":7.02259,"zn":0.0,"indus":18.1,"chas":0,"nox":0.718,"rm":6.006,"age":95.3,"dis":1.8746,"rad":24,"tax":666,"ptratio":20.2,"b":319.98,"lstat":15.70},{"obs":423,"town":"Boston Roxbury","town_id":82,"tract":811,"lon":-71.066500,"lat":42.197000,"medv":20.8,"cmedv":20.8,"crim":12.04820,"zn":0.0,"indus":18.1,"chas":0,"nox":0.614,"rm":5.648,"age":87.6,"dis":1.9512,"rad":24,"tax":666,"ptratio":20.2,"b":291.55,"lstat":14.10},{"obs":424,"town":"Boston Roxbury","town_id":82,"tract":812,"lon":-71.061900,"lat":42.194800,"medv":13.4,"cmedv":13.4,"crim":7.05042,"zn":0.0,"indus":18.1,"chas":0,"nox":0.614,"rm":6.103,"age":85.1,"dis":2.0218,"rad":24,"tax":666,"ptratio":20.2,"b":2.52,"lstat":23.29},{"obs":425,"town":"Boston Roxbury","town_id":82,"tract":813,"lon":-71.059000,"lat":42.192000,"medv":11.7,"cmedv":11.7,"crim":8.79212,"zn":0.0,"indus":18.1,"chas":0,"nox":0.584,"rm":5.565,"age":70.6,"dis":2.0635,"rad":24,"tax":666,"ptratio":20.2,"b":3.65,"lstat":17.16},{"obs":426,"town":"Boston Roxbury","town_id":82,"tract":814,"lon":-71.057700,"lat":42.196700,"medv":8.3,"cmedv":8.3,"crim":15.86030,"zn":0.0,"indus":18.1,"chas":0,"nox":0.679,"rm":5.896,"age":95.4,"dis":1.9096,"rad":24,"tax":666,"ptratio":20.2,"b":7.68,"lstat":24.39},{"obs":427,"town":"Boston Roxbury","town_id":82,"tract":815,"lon":-71.055800,"lat":42.193700,"medv":10.2,"cmedv":10.2,"crim":12.24720,"zn":0.0,"indus":18.1,"chas":0,"nox":0.584,"rm":5.837,"age":59.7,"dis":1.9976,"rad":24,"tax":666,"ptratio":20.2,"b":24.65,"lstat":15.69},{"obs":428,"town":"Boston Roxbury","town_id":82,"tract":816,"lon":-71.054200,"lat":42.196100,"medv":10.9,"cmedv":10.9,"crim":37.66190,"zn":0.0,"indus":18.1,"chas":0,"nox":0.679,"rm":6.202,"age":78.7,"dis":1.8629,"rad":24,"tax":666,"ptratio":20.2,"b":18.82,"lstat":14.52},{"obs":429,"town":"Boston Roxbury","town_id":82,"tract":817,"lon":-71.052100,"lat":42.194000,"medv":11.0,"cmedv":11.0,"crim":7.36711,"zn":0.0,"indus":18.1,"chas":0,"nox":0.679,"rm":6.193,"age":78.1,"dis":1.9356,"rad":24,"tax":666,"ptratio":20.2,"b":96.73,"lstat":21.52},{"obs":430,"town":"Boston Roxbury","town_id":82,"tract":818,"lon":-71.048500,"lat":42.192000,"medv":9.5,"cmedv":9.5,"crim":9.33889,"zn":0.0,"indus":18.1,"chas":0,"nox":0.679,"rm":6.380,"age":95.6,"dis":1.9682,"rad":24,"tax":666,"ptratio":20.2,"b":60.72,"lstat":24.08},{"obs":431,"town":"Boston Roxbury","town_id":82,"tract":819,"lon":-71.054700,"lat":42.189000,"medv":14.5,"cmedv":14.5,"crim":8.49213,"zn":0.0,"indus":18.1,"chas":0,"nox":0.584,"rm":6.348,"age":86.1,"dis":2.0527,"rad":24,"tax":666,"ptratio":20.2,"b":83.45,"lstat":17.64},{"obs":432,"town":"Boston Roxbury","town_id":82,"tract":820,"lon":-71.050500,"lat":42.188000,"medv":14.1,"cmedv":14.1,"crim":10.06230,"zn":0.0,"indus":18.1,"chas":0,"nox":0.584,"rm":6.833,"age":94.3,"dis":2.0882,"rad":24,"tax":666,"ptratio":20.2,"b":81.33,"lstat":19.69},{"obs":433,"town":"Boston Roxbury","town_id":82,"tract":821,"lon":-71.052000,"lat":42.185400,"medv":16.1,"cmedv":16.1,"crim":6.44405,"zn":0.0,"indus":18.1,"chas":0,"nox":0.584,"rm":6.425,"age":74.8,"dis":2.2004,"rad":24,"tax":666,"ptratio":20.2,"b":97.95,"lstat":12.03},{"obs":434,"town":"Boston Savin Hill","town_id":83,"tract":901,"lon":-71.049500,"lat":42.181500,"medv":14.3,"cmedv":14.3,"crim":5.58107,"zn":0.0,"indus":18.1,"chas":0,"nox":0.713,"rm":6.436,"age":87.9,"dis":2.3158,"rad":24,"tax":666,"ptratio":20.2,"b":100.19,"lstat":16.22},{"obs":435,"town":"Boston Savin Hill","town_id":83,"tract":902,"lon":-71.047500,"lat":42.184200,"medv":11.7,"cmedv":11.7,"crim":13.91340,"zn":0.0,"indus":18.1,"chas":0,"nox":0.713,"rm":6.208,"age":95.0,"dis":2.2222,"rad":24,"tax":666,"ptratio":20.2,"b":100.63,"lstat":15.17},{"obs":436,"town":"Boston Savin Hill","town_id":83,"tract":903,"lon":-71.046000,"lat":42.186700,"medv":13.4,"cmedv":13.4,"crim":11.16040,"zn":0.0,"indus":18.1,"chas":0,"nox":0.74,"rm":6.629,"age":94.6,"dis":2.1247,"rad":24,"tax":666,"ptratio":20.2,"b":109.85,"lstat":23.27},{"obs":437,"town":"Boston Savin Hill","town_id":83,"tract":904,"lon":-71.045500,"lat":42.189300,"medv":9.6,"cmedv":9.6,"crim":14.42080,"zn":0.0,"indus":18.1,"chas":0,"nox":0.74,"rm":6.461,"age":93.3,"dis":2.0026,"rad":24,"tax":666,"ptratio":20.2,"b":27.49,"lstat":18.05},{"obs":438,"town":"Boston Savin Hill","town_id":83,"tract":905,"lon":-71.044500,"lat":42.191700,"medv":8.7,"cmedv":8.2,"crim":15.17720,"zn":0.0,"indus":18.1,"chas":0,"nox":0.74,"rm":6.152,"age":100.0,"dis":1.9142,"rad":24,"tax":666,"ptratio":20.2,"b":9.32,"lstat":26.45},{"obs":439,"town":"Boston Savin Hill","town_id":83,"tract":906,"lon":-71.044500,"lat":42.193800,"medv":8.4,"cmedv":8.4,"crim":13.67810,"zn":0.0,"indus":18.1,"chas":0,"nox":0.74,"rm":5.935,"age":87.9,"dis":1.8206,"rad":24,"tax":666,"ptratio":20.2,"b":68.95,"lstat":34.02},{"obs":440,"town":"Boston Savin Hill","town_id":83,"tract":907,"lon":-71.037000,"lat":42.194000,"medv":12.8,"cmedv":12.8,"crim":9.39063,"zn":0.0,"indus":18.1,"chas":0,"nox":0.74,"rm":5.627,"age":93.9,"dis":1.8172,"rad":24,"tax":666,"ptratio":20.2,"b":396.90,"lstat":22.88},{"obs":441,"town":"Boston Savin Hill","town_id":83,"tract":908,"lon":-71.032100,"lat":42.192500,"medv":10.5,"cmedv":10.5,"crim":22.05110,"zn":0.0,"indus":18.1,"chas":0,"nox":0.74,"rm":5.818,"age":92.4,"dis":1.8662,"rad":24,"tax":666,"ptratio":20.2,"b":391.45,"lstat":22.11},{"obs":442,"town":"Boston Savin Hill","town_id":83,"tract":910,"lon":-71.034500,"lat":42.185000,"medv":17.1,"cmedv":17.1,"crim":9.72418,"zn":0.0,"indus":18.1,"chas":0,"nox":0.74,"rm":6.406,"age":97.2,"dis":2.0651,"rad":24,"tax":666,"ptratio":20.2,"b":385.96,"lstat":19.52},{"obs":443,"town":"Boston Savin Hill","town_id":83,"tract":911,"lon":-71.034000,"lat":42.189000,"medv":18.4,"cmedv":14.8,"crim":5.66637,"zn":0.0,"indus":18.1,"chas":0,"nox":0.74,"rm":6.219,"age":100.0,"dis":2.0048,"rad":24,"tax":666,"ptratio":20.2,"b":395.69,"lstat":16.59},{"obs":444,"town":"Boston Savin Hill","town_id":83,"tract":912,"lon":-71.037800,"lat":42.189200,"medv":15.4,"cmedv":15.4,"crim":9.96654,"zn":0.0,"indus":18.1,"chas":0,"nox":0.74,"rm":6.485,"age":100.0,"dis":1.9784,"rad":24,"tax":666,"ptratio":20.2,"b":386.73,"lstat":18.85},{"obs":445,"town":"Boston Savin Hill","town_id":83,"tract":913,"lon":-71.040500,"lat":42.192000,"medv":10.8,"cmedv":10.8,"crim":12.80230,"zn":0.0,"indus":18.1,"chas":0,"nox":0.74,"rm":5.854,"age":96.6,"dis":1.8956,"rad":24,"tax":666,"ptratio":20.2,"b":240.52,"lstat":23.79},{"obs":446,"town":"Boston Savin Hill","town_id":83,"tract":914,"lon":-71.042500,"lat":42.189000,"medv":11.8,"cmedv":11.8,"crim":10.67180,"zn":0.0,"indus":18.1,"chas":0,"nox":0.74,"rm":6.459,"age":94.8,"dis":1.9879,"rad":24,"tax":666,"ptratio":20.2,"b":43.06,"lstat":23.98},{"obs":447,"town":"Boston Savin Hill","town_id":83,"tract":915,"lon":-71.039000,"lat":42.186800,"medv":14.9,"cmedv":14.9,"crim":6.28807,"zn":0.0,"indus":18.1,"chas":0,"nox":0.74,"rm":6.341,"age":96.4,"dis":2.0720,"rad":24,"tax":666,"ptratio":20.2,"b":318.01,"lstat":17.79},{"obs":448,"town":"Boston Savin Hill","town_id":83,"tract":916,"lon":-71.037000,"lat":42.184000,"medv":12.6,"cmedv":12.6,"crim":9.92485,"zn":0.0,"indus":18.1,"chas":0,"nox":0.74,"rm":6.251,"age":96.6,"dis":2.1980,"rad":24,"tax":666,"ptratio":20.2,"b":388.52,"lstat":16.44},{"obs":449,"town":"Boston Savin Hill","town_id":83,"tract":917,"lon":-71.040000,"lat":42.182000,"medv":14.1,"cmedv":14.1,"crim":9.32909,"zn":0.0,"indus":18.1,"chas":0,"nox":0.713,"rm":6.185,"age":98.7,"dis":2.2616,"rad":24,"tax":666,"ptratio":20.2,"b":396.90,"lstat":18.13},{"obs":450,"town":"Boston Savin Hill","town_id":83,"tract":918,"lon":-71.042800,"lat":42.184500,"medv":13.0,"cmedv":13.0,"crim":7.52601,"zn":0.0,"indus":18.1,"chas":0,"nox":0.713,"rm":6.417,"age":98.3,"dis":2.1850,"rad":24,"tax":666,"ptratio":20.2,"b":304.21,"lstat":19.31},{"obs":451,"town":"Boston Savin Hill","town_id":83,"tract":919,"lon":-71.046000,"lat":42.181000,"medv":13.4,"cmedv":13.4,"crim":6.71772,"zn":0.0,"indus":18.1,"chas":0,"nox":0.713,"rm":6.749,"age":92.6,"dis":2.3236,"rad":24,"tax":666,"ptratio":20.2,"b":0.32,"lstat":17.44},{"obs":452,"town":"Boston Savin Hill","town_id":83,"tract":920,"lon":-71.041000,"lat":42.179500,"medv":15.2,"cmedv":15.2,"crim":5.44114,"zn":0.0,"indus":18.1,"chas":0,"nox":0.713,"rm":6.655,"age":98.2,"dis":2.3552,"rad":24,"tax":666,"ptratio":20.2,"b":355.29,"lstat":17.73},{"obs":453,"town":"Boston Savin Hill","town_id":83,"tract":921,"lon":-71.034000,"lat":42.179000,"medv":16.1,"cmedv":16.1,"crim":5.09017,"zn":0.0,"indus":18.1,"chas":0,"nox":0.713,"rm":6.297,"age":91.8,"dis":2.3682,"rad":24,"tax":666,"ptratio":20.2,"b":385.09,"lstat":17.27},{"obs":454,"town":"Boston Savin Hill","town_id":83,"tract":922,"lon":-71.040000,"lat":42.177000,"medv":17.8,"cmedv":17.8,"crim":8.24809,"zn":0.0,"indus":18.1,"chas":0,"nox":0.713,"rm":7.393,"age":99.3,"dis":2.4527,"rad":24,"tax":666,"ptratio":20.2,"b":375.87,"lstat":16.74},{"obs":455,"town":"Boston Savin Hill","town_id":83,"tract":923,"lon":-71.045500,"lat":42.176800,"medv":14.9,"cmedv":14.4,"crim":9.51363,"zn":0.0,"indus":18.1,"chas":0,"nox":0.713,"rm":6.728,"age":94.1,"dis":2.4961,"rad":24,"tax":666,"ptratio":20.2,"b":6.68,"lstat":18.71},{"obs":456,"town":"Boston Savin Hill","town_id":83,"tract":924,"lon":-71.051000,"lat":42.178000,"medv":14.1,"cmedv":14.1,"crim":4.75237,"zn":0.0,"indus":18.1,"chas":0,"nox":0.713,"rm":6.525,"age":86.5,"dis":2.4358,"rad":24,"tax":666,"ptratio":20.2,"b":50.92,"lstat":18.13},{"obs":457,"town":"Boston Dorchester","town_id":84,"tract":1001,"lon":-71.051700,"lat":42.173500,"medv":12.7,"cmedv":12.7,"crim":4.66883,"zn":0.0,"indus":18.1,"chas":0,"nox":0.713,"rm":5.976,"age":87.9,"dis":2.5806,"rad":24,"tax":666,"ptratio":20.2,"b":10.48,"lstat":19.01},{"obs":458,"town":"Boston Dorchester","town_id":84,"tract":1002,"lon":-71.051500,"lat":42.170000,"medv":13.5,"cmedv":13.5,"crim":8.20058,"zn":0.0,"indus":18.1,"chas":0,"nox":0.713,"rm":5.936,"age":80.3,"dis":2.7792,"rad":24,"tax":666,"ptratio":20.2,"b":3.50,"lstat":16.94},{"obs":459,"town":"Boston Dorchester","town_id":84,"tract":1003,"lon":-71.047500,"lat":42.169000,"medv":14.9,"cmedv":14.9,"crim":7.75223,"zn":0.0,"indus":18.1,"chas":0,"nox":0.713,"rm":6.301,"age":83.7,"dis":2.7831,"rad":24,"tax":666,"ptratio":20.2,"b":272.21,"lstat":16.23},{"obs":460,"town":"Boston Dorchester","town_id":84,"tract":1004,"lon":-71.043000,"lat":42.169000,"medv":20.0,"cmedv":20.0,"crim":6.80117,"zn":0.0,"indus":18.1,"chas":0,"nox":0.713,"rm":6.081,"age":84.4,"dis":2.7175,"rad":24,"tax":666,"ptratio":20.2,"b":396.90,"lstat":14.70},{"obs":461,"town":"Boston Dorchester","town_id":84,"tract":1005,"lon":-71.043000,"lat":42.172800,"medv":16.4,"cmedv":16.4,"crim":4.81213,"zn":0.0,"indus":18.1,"chas":0,"nox":0.713,"rm":6.701,"age":90.0,"dis":2.5975,"rad":24,"tax":666,"ptratio":20.2,"b":255.23,"lstat":16.42},{"obs":462,"town":"Boston Dorchester","town_id":84,"tract":1006,"lon":-71.035000,"lat":42.174500,"medv":17.7,"cmedv":17.7,"crim":3.69311,"zn":0.0,"indus":18.1,"chas":0,"nox":0.713,"rm":6.376,"age":88.4,"dis":2.5671,"rad":24,"tax":666,"ptratio":20.2,"b":391.43,"lstat":14.65},{"obs":463,"town":"Boston Dorchester","town_id":84,"tract":1007,"lon":-71.031000,"lat":42.169500,"medv":19.5,"cmedv":19.5,"crim":6.65492,"zn":0.0,"indus":18.1,"chas":0,"nox":0.713,"rm":6.317,"age":83.0,"dis":2.7344,"rad":24,"tax":666,"ptratio":20.2,"b":396.90,"lstat":13.99},{"obs":464,"town":"Boston Dorchester","town_id":84,"tract":1008,"lon":-71.035800,"lat":42.167500,"medv":20.2,"cmedv":20.2,"crim":5.82115,"zn":0.0,"indus":18.1,"chas":0,"nox":0.713,"rm":6.513,"age":89.9,"dis":2.8016,"rad":24,"tax":666,"ptratio":20.2,"b":393.82,"lstat":10.29},{"obs":465,"town":"Boston Dorchester","town_id":84,"tract":1009,"lon":-71.045000,"lat":42.164000,"medv":21.4,"cmedv":21.4,"crim":7.83932,"zn":0.0,"indus":18.1,"chas":0,"nox":0.655,"rm":6.209,"age":65.4,"dis":2.9634,"rad":24,"tax":666,"ptratio":20.2,"b":396.90,"lstat":13.22},{"obs":466,"town":"Boston Dorchester","town_id":84,"tract":1010,"lon":-71.055000,"lat":42.165000,"medv":19.9,"cmedv":19.9,"crim":3.16360,"zn":0.0,"indus":18.1,"chas":0,"nox":0.655,"rm":5.759,"age":48.2,"dis":3.0665,"rad":24,"tax":666,"ptratio":20.2,"b":334.40,"lstat":14.13},{"obs":467,"town":"Boston Dorchester","town_id":84,"tract":1011,"lon":-71.055000,"lat":42.168500,"medv":19.0,"cmedv":19.0,"crim":3.77498,"zn":0.0,"indus":18.1,"chas":0,"nox":0.655,"rm":5.952,"age":84.7,"dis":2.8715,"rad":24,"tax":666,"ptratio":20.2,"b":22.01,"lstat":17.15},{"obs":468,"town":"Boston Mattapan","town_id":85,"tract":1101,"lon":-71.066000,"lat":42.178000,"medv":19.1,"cmedv":19.1,"crim":4.42228,"zn":0.0,"indus":18.1,"chas":0,"nox":0.584,"rm":6.003,"age":94.5,"dis":2.5403,"rad":24,"tax":666,"ptratio":20.2,"b":331.29,"lstat":21.32},{"obs":469,"town":"Boston Mattapan","town_id":85,"tract":1102,"lon":-71.070000,"lat":42.168000,"medv":19.1,"cmedv":19.1,"crim":15.57570,"zn":0.0,"indus":18.1,"chas":0,"nox":0.58,"rm":5.926,"age":71.0,"dis":2.9084,"rad":24,"tax":666,"ptratio":20.2,"b":368.74,"lstat":18.13},{"obs":470,"town":"Boston Mattapan","town_id":85,"tract":1103,"lon":-71.069000,"lat":42.172500,"medv":20.1,"cmedv":20.1,"crim":13.07510,"zn":0.0,"indus":18.1,"chas":0,"nox":0.58,"rm":5.713,"age":56.7,"dis":2.8237,"rad":24,"tax":666,"ptratio":20.2,"b":396.90,"lstat":14.76},{"obs":471,"town":"Boston Mattapan","town_id":85,"tract":1104,"lon":-71.074000,"lat":42.168000,"medv":19.9,"cmedv":19.9,"crim":4.34879,"zn":0.0,"indus":18.1,"chas":0,"nox":0.58,"rm":6.167,"age":84.0,"dis":3.0334,"rad":24,"tax":666,"ptratio":20.2,"b":396.90,"lstat":16.29},{"obs":472,"town":"Boston Mattapan","town_id":85,"tract":1105,"lon":-71.082500,"lat":42.169800,"medv":19.6,"cmedv":19.6,"crim":4.03841,"zn":0.0,"indus":18.1,"chas":0,"nox":0.532,"rm":6.229,"age":90.7,"dis":3.0993,"rad":24,"tax":666,"ptratio":20.2,"b":395.33,"lstat":12.87},{"obs":473,"town":"Boston Mattapan","town_id":85,"tract":1106,"lon":-71.083300,"lat":42.175000,"medv":23.2,"cmedv":23.2,"crim":3.56868,"zn":0.0,"indus":18.1,"chas":0,"nox":0.58,"rm":6.437,"age":75.0,"dis":2.8965,"rad":24,"tax":666,"ptratio":20.2,"b":393.37,"lstat":14.36},{"obs":474,"town":"Boston Forest Hills","town_id":86,"tract":1201,"lon":-71.073200,"lat":42.184000,"medv":29.8,"cmedv":29.8,"crim":4.64689,"zn":0.0,"indus":18.1,"chas":0,"nox":0.614,"rm":6.980,"age":67.6,"dis":2.5329,"rad":24,"tax":666,"ptratio":20.2,"b":374.68,"lstat":11.66},{"obs":475,"town":"Boston Forest Hills","town_id":86,"tract":1202,"lon":-71.055000,"lat":42.183000,"medv":13.8,"cmedv":13.8,"crim":8.05579,"zn":0.0,"indus":18.1,"chas":0,"nox":0.584,"rm":5.427,"age":95.4,"dis":2.4298,"rad":24,"tax":666,"ptratio":20.2,"b":352.58,"lstat":18.14},{"obs":476,"town":"Boston Forest Hills","town_id":86,"tract":1203,"lon":-71.051100,"lat":42.187900,"medv":13.3,"cmedv":13.3,"crim":6.39312,"zn":0.0,"indus":18.1,"chas":0,"nox":0.584,"rm":6.162,"age":97.4,"dis":2.2060,"rad":24,"tax":666,"ptratio":20.2,"b":302.76,"lstat":24.10},{"obs":477,"town":"Boston Forest Hills","town_id":86,"tract":1204,"lon":-71.056500,"lat":42.188000,"medv":16.7,"cmedv":16.7,"crim":4.87141,"zn":0.0,"indus":18.1,"chas":0,"nox":0.614,"rm":6.484,"age":93.6,"dis":2.3053,"rad":24,"tax":666,"ptratio":20.2,"b":396.21,"lstat":18.68},{"obs":478,"town":"Boston Forest Hills","town_id":86,"tract":1205,"lon":-71.052800,"lat":42.192000,"medv":12.0,"cmedv":12.0,"crim":15.02340,"zn":0.0,"indus":18.1,"chas":0,"nox":0.614,"rm":5.304,"age":97.3,"dis":2.1007,"rad":24,"tax":666,"ptratio":20.2,"b":349.48,"lstat":24.91},{"obs":479,"town":"Boston Forest Hills","town_id":86,"tract":1206,"lon":-71.055800,"lat":42.191300,"medv":14.6,"cmedv":14.6,"crim":10.23300,"zn":0.0,"indus":18.1,"chas":0,"nox":0.614,"rm":6.185,"age":96.7,"dis":2.1705,"rad":24,"tax":666,"ptratio":20.2,"b":379.70,"lstat":18.03},{"obs":480,"town":"Boston Forest Hills","town_id":86,"tract":1207,"lon":-71.067000,"lat":42.194500,"medv":21.4,"cmedv":21.4,"crim":14.33370,"zn":0.0,"indus":18.1,"chas":0,"nox":0.614,"rm":6.229,"age":88.0,"dis":1.9512,"rad":24,"tax":666,"ptratio":20.2,"b":383.32,"lstat":13.11},{"obs":481,"town":"Boston West Roxbury","town_id":87,"tract":1301,"lon":-71.100800,"lat":42.174000,"medv":23.0,"cmedv":23.0,"crim":5.82401,"zn":0.0,"indus":18.1,"chas":0,"nox":0.532,"rm":6.242,"age":64.7,"dis":3.4242,"rad":24,"tax":666,"ptratio":20.2,"b":396.90,"lstat":10.74},{"obs":482,"town":"Boston West Roxbury","town_id":87,"tract":1302,"lon":-71.095000,"lat":42.173000,"medv":23.7,"cmedv":23.7,"crim":5.70818,"zn":0.0,"indus":18.1,"chas":0,"nox":0.532,"rm":6.750,"age":74.9,"dis":3.3317,"rad":24,"tax":666,"ptratio":20.2,"b":393.07,"lstat":7.74},{"obs":483,"town":"Boston West Roxbury","town_id":87,"tract":1303,"lon":-71.090000,"lat":42.166500,"medv":25.0,"cmedv":25.0,"crim":5.73116,"zn":0.0,"indus":18.1,"chas":0,"nox":0.532,"rm":7.061,"age":77.0,"dis":3.4106,"rad":24,"tax":666,"ptratio":20.2,"b":395.28,"lstat":7.01},{"obs":484,"town":"Boston West Roxbury","town_id":87,"tract":1304,"lon":-71.097500,"lat":42.160800,"medv":21.8,"cmedv":21.8,"crim":2.81838,"zn":0.0,"indus":18.1,"chas":0,"nox":0.532,"rm":5.762,"age":40.3,"dis":4.0983,"rad":24,"tax":666,"ptratio":20.2,"b":392.92,"lstat":10.42},{"obs":485,"town":"Boston Hyde Park","town_id":88,"tract":1401,"lon":-71.080400,"lat":42.154000,"medv":20.6,"cmedv":20.6,"crim":2.37857,"zn":0.0,"indus":18.1,"chas":0,"nox":0.583,"rm":5.871,"age":41.9,"dis":3.7240,"rad":24,"tax":666,"ptratio":20.2,"b":370.73,"lstat":13.34},{"obs":486,"town":"Boston Hyde Park","town_id":88,"tract":1402,"lon":-71.075000,"lat":42.145500,"medv":21.2,"cmedv":21.2,"crim":3.67367,"zn":0.0,"indus":18.1,"chas":0,"nox":0.583,"rm":6.312,"age":51.9,"dis":3.9917,"rad":24,"tax":666,"ptratio":20.2,"b":388.62,"lstat":10.58},{"obs":487,"town":"Boston Hyde Park","town_id":88,"tract":1403,"lon":-71.071500,"lat":42.155000,"medv":19.1,"cmedv":19.1,"crim":5.69175,"zn":0.0,"indus":18.1,"chas":0,"nox":0.583,"rm":6.114,"age":79.8,"dis":3.5459,"rad":24,"tax":666,"ptratio":20.2,"b":392.68,"lstat":14.98},{"obs":488,"town":"Boston Hyde Park","town_id":88,"tract":1404,"lon":-71.065000,"lat":42.161000,"medv":20.6,"cmedv":20.6,"crim":4.83567,"zn":0.0,"indus":18.1,"chas":0,"nox":0.583,"rm":5.905,"age":53.2,"dis":3.1523,"rad":24,"tax":666,"ptratio":20.2,"b":388.22,"lstat":11.45},{"obs":489,"town":"Chelsea","town_id":89,"tract":1601,"lon":-71.018900,"lat":42.234400,"medv":15.2,"cmedv":15.2,"crim":0.15086,"zn":0.0,"indus":27.74,"chas":0,"nox":0.609,"rm":5.454,"age":92.7,"dis":1.8209,"rad":4,"tax":711,"ptratio":20.1,"b":395.09,"lstat":18.06},{"obs":490,"town":"Chelsea","town_id":89,"tract":1602,"lon":-71.022800,"lat":42.233500,"medv":7.0,"cmedv":7.0,"crim":0.18337,"zn":0.0,"indus":27.74,"chas":0,"nox":0.609,"rm":5.414,"age":98.3,"dis":1.7554,"rad":4,"tax":711,"ptratio":20.1,"b":344.05,"lstat":23.97},{"obs":491,"town":"Chelsea","town_id":89,"tract":1604,"lon":-71.024500,"lat":42.236800,"medv":8.1,"cmedv":8.1,"crim":0.20746,"zn":0.0,"indus":27.74,"chas":0,"nox":0.609,"rm":5.093,"age":98.0,"dis":1.8226,"rad":4,"tax":711,"ptratio":20.1,"b":318.43,"lstat":29.68},{"obs":492,"town":"Chelsea","town_id":89,"tract":1605,"lon":-71.016000,"lat":42.238200,"medv":13.6,"cmedv":13.6,"crim":0.10574,"zn":0.0,"indus":27.74,"chas":0,"nox":0.609,"rm":5.983,"age":98.8,"dis":1.8681,"rad":4,"tax":711,"ptratio":20.1,"b":390.11,"lstat":18.07},{"obs":493,"town":"Chelsea","town_id":89,"tract":1606,"lon":-71.029700,"lat":42.244700,"medv":20.1,"cmedv":20.1,"crim":0.11132,"zn":0.0,"indus":27.74,"chas":0,"nox":0.609,"rm":5.983,"age":83.5,"dis":2.1099,"rad":4,"tax":711,"ptratio":20.1,"b":396.90,"lstat":13.35},{"obs":494,"town":"Revere","town_id":90,"tract":1701,"lon":-71.012500,"lat":42.246200,"medv":21.8,"cmedv":21.8,"crim":0.17331,"zn":0.0,"indus":9.69,"chas":0,"nox":0.585,"rm":5.707,"age":54.0,"dis":2.3817,"rad":6,"tax":391,"ptratio":19.2,"b":396.90,"lstat":12.01},{"obs":495,"town":"Revere","town_id":90,"tract":1702,"lon":-71.012500,"lat":42.250000,"medv":24.5,"cmedv":24.5,"crim":0.27957,"zn":0.0,"indus":9.69,"chas":0,"nox":0.585,"rm":5.926,"age":42.6,"dis":2.3817,"rad":6,"tax":391,"ptratio":19.2,"b":396.90,"lstat":13.59},{"obs":496,"town":"Revere","town_id":90,"tract":1703,"lon":-71.010500,"lat":42.254700,"medv":23.1,"cmedv":23.1,"crim":0.17899,"zn":0.0,"indus":9.69,"chas":0,"nox":0.585,"rm":5.670,"age":28.8,"dis":2.7986,"rad":6,"tax":391,"ptratio":19.2,"b":393.29,"lstat":17.60},{"obs":497,"town":"Revere","town_id":90,"tract":1704,"lon":-71.001000,"lat":42.252500,"medv":19.7,"cmedv":19.7,"crim":0.28960,"zn":0.0,"indus":9.69,"chas":0,"nox":0.585,"rm":5.390,"age":72.9,"dis":2.7986,"rad":6,"tax":391,"ptratio":19.2,"b":396.90,"lstat":21.14},{"obs":498,"town":"Revere","town_id":90,"tract":1705,"lon":-70.994700,"lat":42.249600,"medv":18.3,"cmedv":18.3,"crim":0.26838,"zn":0.0,"indus":9.69,"chas":0,"nox":0.585,"rm":5.794,"age":70.6,"dis":2.8927,"rad":6,"tax":391,"ptratio":19.2,"b":396.90,"lstat":14.10},{"obs":499,"town":"Revere","town_id":90,"tract":1706,"lon":-71.005000,"lat":42.245500,"medv":21.2,"cmedv":21.2,"crim":0.23912,"zn":0.0,"indus":9.69,"chas":0,"nox":0.585,"rm":6.019,"age":65.3,"dis":2.4091,"rad":6,"tax":391,"ptratio":19.2,"b":396.90,"lstat":12.92},{"obs":500,"town":"Revere","town_id":90,"tract":1707,"lon":-70.998500,"lat":42.243000,"medv":17.5,"cmedv":17.5,"crim":0.17783,"zn":0.0,"indus":9.69,"chas":0,"nox":0.585,"rm":5.569,"age":73.5,"dis":2.3999,"rad":6,"tax":391,"ptratio":19.2,"b":395.77,"lstat":15.10},{"obs":501,"town":"Revere","town_id":90,"tract":1708,"lon":-70.992000,"lat":42.238000,"medv":16.8,"cmedv":16.8,"crim":0.22438,"zn":0.0,"indus":9.69,"chas":0,"nox":0.585,"rm":6.027,"age":79.7,"dis":2.4982,"rad":6,"tax":391,"ptratio":19.2,"b":396.90,"lstat":14.33},{"obs":502,"town":"Winthrop","town_id":91,"tract":1801,"lon":-70.986000,"lat":42.231200,"medv":22.4,"cmedv":22.4,"crim":0.06263,"zn":0.0,"indus":11.93,"chas":0,"nox":0.573,"rm":6.593,"age":69.1,"dis":2.4786,"rad":1,"tax":273,"ptratio":21.0,"b":391.99,"lstat":9.67},{"obs":503,"town":"Winthrop","town_id":91,"tract":1802,"lon":-70.991000,"lat":42.227500,"medv":20.6,"cmedv":20.6,"crim":0.04527,"zn":0.0,"indus":11.93,"chas":0,"nox":0.573,"rm":6.120,"age":76.7,"dis":2.2875,"rad":1,"tax":273,"ptratio":21.0,"b":396.90,"lstat":9.08},{"obs":504,"town":"Winthrop","town_id":91,"tract":1803,"lon":-70.994800,"lat":42.226000,"medv":23.9,"cmedv":23.9,"crim":0.06076,"zn":0.0,"indus":11.93,"chas":0,"nox":0.573,"rm":6.976,"age":91.0,"dis":2.1675,"rad":1,"tax":273,"ptratio":21.0,"b":396.90,"lstat":5.64},{"obs":505,"town":"Winthrop","town_id":91,"tract":1804,"lon":-70.987500,"lat":42.224000,"medv":22.0,"cmedv":22.0,"crim":0.10959,"zn":0.0,"indus":11.93,"chas":0,"nox":0.573,"rm":6.794,"age":89.3,"dis":2.3889,"rad":1,"tax":273,"ptratio":21.0,"b":393.45,"lstat":6.48},{"obs":506,"town":"Winthrop","town_id":91,"tract":1805,"lon":-70.982500,"lat":42.221000,"medv":11.9,"cmedv":19.0,"crim":0.04741,"zn":0.0,"indus":11.93,"chas":0,"nox":0.573,"rm":6.030,"age":80.8,"dis":2.5050,"rad":1,"tax":273,"ptratio":21.0,"b":396.90,"lstat":7.88}]

},{}],245:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var copy = require( '@stdlib/utils/copy' );
var data = require( './../data/data.json' );


// MAIN //

/**
* Returns a (corrected) dataset derived from information collected by the US Census Service concerning housing in Boston, Massachusetts (1978).
*
* @returns {ObjectArray} housing data
*
* @example
* var data = dataset();
* // returns [ {...}, {...}, ... ]
*/
function dataset() {
	return copy( data );
}


// EXPORTS //

module.exports = dataset;

},{"./../data/data.json":244,"@stdlib/utils/copy":295}],246:[function(require,module,exports){
module.exports={
  "name": "@stdlib/datasets/pace-boston-house-prices",
  "version": "0.0.0",
  "description": "A (corrected) dataset derived from information collected by the US Census Service concerning housing in Boston, Massachusetts (1978).",
  "license": "Apache-2.0",
  "author": {
    "name": "The Stdlib Authors",
    "url": "https://github.com/stdlib-js/stdlib/graphs/contributors"
  },
  "contributors": [
    {
      "name": "The Stdlib Authors",
      "url": "https://github.com/stdlib-js/stdlib/graphs/contributors"
    }
  ],
  "bin": {
    "pace-boston-house-prices": "./bin/cli"
  },
  "main": "./lib",
  "browser": "./lib/browser.js",
  "directories": {
    "benchmark": "./benchmark",
    "bin": "./bin",
    "data": "./data",
    "doc": "./docs",
    "example": "./examples",
    "lib": "./lib",
    "test": "./test"
  },
  "scripts": {},
  "homepage": "https://github.com/stdlib-js/stdlib",
  "repository": {
    "type": "git",
    "url": "git://github.com/stdlib-js/stdlib.git"
  },
  "bugs": {
    "url": "https://github.com/stdlib-js/stdlib/issues"
  },
  "dependencies": {},
  "devDependencies": {},
  "engines": {
    "node": ">=0.10.0",
    "npm": ">2.7.0"
  },
  "os": [
    "aix",
    "darwin",
    "freebsd",
    "linux",
    "macos",
    "openbsd",
    "sunos",
    "win32",
    "windows"
  ],
  "keywords": [
    "stdlib",
    "datasets",
    "dataset",
    "data",
    "house",
    "housing",
    "prices",
    "value",
    "boston",
    "stats",
    "statistics",
    "linear regression",
    "prediction"
  ]
}

},{}],247:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a finite double-precision floating-point number is an integer.
*
* @module @stdlib/math/base/assert/is-integer
*
* @example
* var isInteger = require( '@stdlib/math/base/assert/is-integer' );
*
* var bool = isInteger( 1.0 );
* // returns true
*
* bool = isInteger( 3.14 );
* // returns false
*/

// MODULES //

var isInteger = require( './is_integer.js' );


// EXPORTS //

module.exports = isInteger;

},{"./is_integer.js":248}],248:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var floor = require( '@stdlib/math/base/special/floor' );


// MAIN //

/**
* Tests if a finite double-precision floating-point number is an integer.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is an integer
*
* @example
* var bool = isInteger( 1.0 );
* // returns true
*
* @example
* var bool = isInteger( 3.14 );
* // returns false
*/
function isInteger( x ) {
	return (floor(x) === x);
}


// EXPORTS //

module.exports = isInteger;

},{"@stdlib/math/base/special/floor":252}],249:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a numeric value is `NaN`.
*
* @module @stdlib/math/base/assert/is-nan
*
* @example
* var isnan = require( '@stdlib/math/base/assert/is-nan' );
*
* var bool = isnan( NaN );
* // returns true
*
* bool = isnan( 7.0 );
* // returns false
*/

// MODULES //

var isnan = require( './is_nan.js' );


// EXPORTS //

module.exports = isnan;

},{"./is_nan.js":250}],250:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

/**
* Tests if a numeric value is `NaN`.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is `NaN`
*
* @example
* var bool = isnan( NaN );
* // returns true
*
* @example
* var bool = isnan( 7.0 );
* // returns false
*/
function isnan( x ) {
	return ( x !== x );
}


// EXPORTS //

module.exports = isnan;

},{}],251:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// TODO: implementation (?)

/**
* Rounds a numeric value toward negative infinity.
*
* @param {number} x - input value
* @returns {number} rounded value
*
* @example
* var v = floor( -4.2 );
* // returns -5.0
*
* @example
* var v = floor( 9.99999 );
* // returns 9.0
*
* @example
* var v = floor( 0.0 );
* // returns 0.0
*
* @example
* var v = floor( NaN );
* // returns NaN
*/
var floor = Math.floor; // eslint-disable-line stdlib/no-builtin-math


// EXPORTS //

module.exports = floor;

},{}],252:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Round a numeric value toward negative infinity.
*
* @module @stdlib/math/base/special/floor
*
* @example
* var floor = require( '@stdlib/math/base/special/floor' );
*
* var v = floor( -4.2 );
* // returns -5.0
*
* v = floor( 9.99999 );
* // returns 9.0
*
* v = floor( 0.0 );
* // returns 0.0
*
* v = floor( NaN );
* // returns NaN
*/

// MODULES //

var floor = require( './floor.js' );


// EXPORTS //

module.exports = floor;

},{"./floor.js":251}],253:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Decompose a double-precision floating-point number into integral and fractional parts.
*
* @module @stdlib/math/base/special/modf
*
* @example
* var modf = require( '@stdlib/math/base/special/modf' );
*
* var parts = modf( 3.14 );
* // returns [ 3.0, 0.14000000000000012 ]
*
* @example
* var Float64Array = require( '@stdlib/array/float64' );
* var modf = require( '@stdlib/math/base/special/modf' );
*
* var out = new Float64Array( 2 );
*
* var parts = modf( out, 3.14 );
* // returns [ 3.0, 0.14000000000000012 ]
*
* var bool = ( parts === out );
* // returns true
*/

// MODULES //

var modf = require( './main.js' );


// EXPORTS //

module.exports = modf;

},{"./main.js":254}],254:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var fcn = require( './modf.js' );


// MAIN //

/**
* Decomposes a double-precision floating-point number into integral and fractional parts, each having the same type and sign as the input value.
*
* @param {(Array|TypedArray|Object)} [out] - output array
* @param {number} x - input value
* @returns {(Array|TypedArray|Object)} output array
*
* @example
* var parts = modf( 3.14 );
* // returns [ 3.0, 0.14000000000000012 ]
*
* @example
* var Float64Array = require( '@stdlib/array/float64' );
*
* var out = new Float64Array( 2 );
*
* var parts = modf( out, 3.14 );
* // returns <Float64Array>[ 3.0, 0.14000000000000012 ]
*
* var bool = ( parts === out );
* // returns true
*/
function modf( out, x ) {
	if ( arguments.length === 1 ) {
		return fcn( [ 0.0, 0.0 ], out );
	}
	return fcn( out, x );
}


// EXPORTS //

module.exports = modf;

},{"./modf.js":255}],255:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var toWords = require( '@stdlib/number/float64/base/to-words' );
var fromWords = require( '@stdlib/number/float64/base/from-words' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var FLOAT64_EXPONENT_BIAS = require( '@stdlib/constants/math/float64-exponent-bias' );
var FLOAT64_HIGH_WORD_EXPONENT_MASK = require( '@stdlib/constants/math/float64-high-word-exponent-mask' ); // eslint-disable-line id-length
var FLOAT64_HIGH_WORD_SIGNIFICAND_MASK = require( '@stdlib/constants/math/float64-high-word-significand-mask' ); // eslint-disable-line id-length


// VARIABLES //

// 4294967295 => 0xffffffff => 11111111111111111111111111111111
var ALL_ONES = 4294967295>>>0; // asm type annotation

// High/low words workspace:
var WORDS = [ 0|0, 0|0 ]; // WARNING: not thread safe


// MAIN //

/**
* Decomposes a double-precision floating-point number into integral and fractional parts, each having the same type and sign as the input value.
*
* @private
* @param {(Array|TypedArray|Object)} out - output array
* @param {number} x - input value
* @returns {(Array|TypedArray|Object)} output array
*
* @example
* var parts = modf( new Array( 2 ), 3.14 );
* // returns [ 3.0, 0.14000000000000012 ]
*/
function modf( out, x ) {
	var high;
	var low;
	var exp;
	var i;

	// Special cases...
	if ( x < 1.0 ) {
		if ( x < 0.0 ) {
			modf( out, -x );
			out[ 0 ] *= -1.0;
			out[ 1 ] *= -1.0;
			return out;
		}
		if ( x === 0.0 ) { // [ +-0, +-0 ]
			out[ 0 ] = x;
			out[ 1 ] = x;
			return out;
		}
		out[ 0 ] = 0.0;
		out[ 1 ] = x;
		return out;
	}
	if ( isnan( x ) ) {
		out[ 0 ] = NaN;
		out[ 1 ] = NaN;
		return out;
	}
	if ( x === PINF ) {
		out[ 0 ] = PINF;
		out[ 1 ] = 0.0;
		return out;
	}
	// Decompose |x|...

	// Extract the high and low words:
	toWords( WORDS, x );
	high = WORDS[ 0 ];
	low = WORDS[ 1 ];

	// Extract the unbiased exponent from the high word:
	exp = ((high & FLOAT64_HIGH_WORD_EXPONENT_MASK) >> 20)|0; // asm type annotation
	exp -= FLOAT64_EXPONENT_BIAS|0; // asm type annotation

	// Handle smaller values (x < 2**20 = 1048576)...
	if ( exp < 20 ) {
		i = (FLOAT64_HIGH_WORD_SIGNIFICAND_MASK >> exp)|0; // asm type annotation

		// Determine if `x` is integral by checking for significand bits which cannot be exponentiated away...
		if ( ((high&i)|low) === 0 ) {
			out[ 0 ] = x;
			out[ 1 ] = 0.0;
			return out;
		}
		// Turn off all the bits which cannot be exponentiated away:
		high &= (~i);

		// Generate the integral part:
		i = fromWords( high, 0 );

		// The fractional part is whatever is leftover:
		out[ 0 ] = i;
		out[ 1 ] = x - i;
		return out;
	}
	// Check if `x` can even have a fractional part...
	if ( exp > 51 ) {
		// `x` is integral:
		out[ 0 ] = x;
		out[ 1 ] = 0.0;
		return out;
	}
	i = ALL_ONES >>> (exp-20);

	// Determine if `x` is integral by checking for less significant significand bits which cannot be exponentiated away...
	if ( (low&i) === 0 ) {
		out[ 0 ] = x;
		out[ 1 ] = 0.0;
		return out;
	}
	// Turn off all the bits which cannot be exponentiated away:
	low &= (~i);

	// Generate the integral part:
	i = fromWords( high, low );

	// The fractional part is whatever is leftover:
	out[ 0 ] = i;
	out[ 1 ] = x - i;
	return out;
}


// EXPORTS //

module.exports = modf;

},{"@stdlib/constants/math/float64-exponent-bias":226,"@stdlib/constants/math/float64-high-word-exponent-mask":227,"@stdlib/constants/math/float64-high-word-significand-mask":228,"@stdlib/constants/math/float64-pinf":230,"@stdlib/math/base/assert/is-nan":249,"@stdlib/number/float64/base/from-words":260,"@stdlib/number/float64/base/to-words":263}],256:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// TODO: implementation

/**
* Round a numeric value to the nearest integer.
*
* @module @stdlib/math/base/special/round
*
* @example
* var round = require( '@stdlib/math/base/special/round' );
*
* var v = round( -4.2 );
* // returns -4.0
*
* v = round( -4.5 );
* // returns -4.0
*
* v = round( -4.6 );
* // returns -5.0
*
* v = round( 9.99999 );
* // returns 10.0
*
* v = round( 9.5 );
* // returns 10.0
*
* v = round( 9.2 );
* // returns 9.0
*
* v = round( 0.0 );
* // returns 0.0
*
* v = round( -0.0 );
* // returns -0.0
*
* v = round( Infinity );
* // returns Infinity
*
* v = round( -Infinity );
* // returns -Infinity
*
* v = round( NaN );
* // returns NaN
*/

// MODULES //

var round = require( './round.js' );


// EXPORTS //

module.exports = round;

},{"./round.js":257}],257:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// TODO: implementation

/**
* Rounds a numeric value to the nearest integer.
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = round( -4.2 );
* // returns -4.0
*
* @example
* var v = round( -4.5 );
* // returns -4.0
*
* @example
* var v = round( -4.6 );
* // returns -5.0
*
* @example
* var v = round( 9.99999 );
* // returns 10.0
*
* @example
* var v = round( 9.5 );
* // returns 10.0
*
* @example
* var v = round( 9.2 );
* // returns 9.0
*
* @example
* var v = round( 0.0 );
* // returns 0.0
*
* @example
* var v = round( -0.0 );
* // returns -0.0
*
* @example
* var v = round( Infinity );
* // returns Infinity
*
* @example
* var v = round( -Infinity );
* // returns -Infinity
*
* @example
* var v = round( NaN );
* // returns NaN
*/
var round = Math.round; // eslint-disable-line stdlib/no-builtin-math


// EXPORTS //

module.exports = round;

},{}],258:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Constructor which returns a `Number` object.
*
* @module @stdlib/number/ctor
*
* @example
* var Number = require( '@stdlib/number/ctor' );
*
* var v = new Number( 10.0 );
* // returns <Number>
*/

// MODULES //

var Number = require( './number.js' );


// EXPORTS //

module.exports = Number;

},{"./number.js":259}],259:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// EXPORTS //

module.exports = Number; // eslint-disable-line stdlib/require-globals

},{}],260:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Create a double-precision floating-point number from a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
*
* @module @stdlib/number/float64/base/from-words
*
* @example
* var fromWords = require( '@stdlib/number/float64/base/from-words' );
*
* var v = fromWords( 1774486211, 2479577218 );
* // returns 3.14e201
*
* v = fromWords( 3221823995, 1413754136 );
* // returns -3.141592653589793
*
* v = fromWords( 0, 0 );
* // returns 0.0
*
* v = fromWords( 2147483648, 0 );
* // returns -0.0
*
* v = fromWords( 2146959360, 0 );
* // returns NaN
*
* v = fromWords( 2146435072, 0 );
* // returns Infinity
*
* v = fromWords( 4293918720, 0 );
* // returns -Infinity
*/

// MODULES //

var fromWords = require( './main.js' );


// EXPORTS //

module.exports = fromWords;

},{"./main.js":262}],261:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isLittleEndian = require( '@stdlib/assert/is-little-endian' );


// MAIN //

var indices;
var HIGH;
var LOW;

if ( isLittleEndian === true ) {
	HIGH = 1; // second index
	LOW = 0; // first index
} else {
	HIGH = 0; // first index
	LOW = 1; // second index
}
indices = {
	'HIGH': HIGH,
	'LOW': LOW
};


// EXPORTS //

module.exports = indices;

},{"@stdlib/assert/is-little-endian":112}],262:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var Uint32Array = require( '@stdlib/array/uint32' );
var Float64Array = require( '@stdlib/array/float64' );
var indices = require( './indices.js' );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );

var HIGH = indices.HIGH;
var LOW = indices.LOW;


// MAIN //

/**
* Creates a double-precision floating-point number from a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
*
* ## Notes
*
* ```text
* float64 (64 bits)
* f := fraction (significand/mantissa) (52 bits)
* e := exponent (11 bits)
* s := sign bit (1 bit)
*
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |                                Float64                                |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |              Uint32               |               Uint32              |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* ```
*
* If little endian (more significant bits last):
*
* ```text
*                         <-- lower      higher -->
* |   f7       f6       f5       f4       f3       f2    e2 | f1 |s|  e1  |
* ```
*
* If big endian (more significant bits first):
*
* ```text
*                         <-- higher      lower -->
* |s| e1    e2 | f1     f2       f3       f4       f5        f6      f7   |
* ```
*
*
* In which Uint32 should we place the higher order bits? If little endian, the second; if big endian, the first.
*
*
* ## References
*
* -   [Open Group][1]
*
* [1]: http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm
*
* @param {uinteger32} high - higher order word (unsigned 32-bit integer)
* @param {uinteger32} low - lower order word (unsigned 32-bit integer)
* @returns {number} floating-point number
*
* @example
* var v = fromWords( 1774486211, 2479577218 );
* // returns 3.14e201
*
* @example
* var v = fromWords( 3221823995, 1413754136 );
* // returns -3.141592653589793
*
* @example
* var v = fromWords( 0, 0 );
* // returns 0.0
*
* @example
* var v = fromWords( 2147483648, 0 );
* // returns -0.0
*
* @example
* var v = fromWords( 2146959360, 0 );
* // returns NaN
*
* @example
* var v = fromWords( 2146435072, 0 );
* // returns Infinity
*
* @example
* var v = fromWords( 4293918720, 0 );
* // returns -Infinity
*/
function fromWords( high, low ) {
	UINT32_VIEW[ HIGH ] = high;
	UINT32_VIEW[ LOW ] = low;
	return FLOAT64_VIEW[ 0 ];
}


// EXPORTS //

module.exports = fromWords;

},{"./indices.js":261,"@stdlib/array/float64":5,"@stdlib/array/uint32":19}],263:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Split a floating-point number into a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
*
* @module @stdlib/number/float64/base/to-words
*
* @example
* var toWords = require( '@stdlib/number/float64/base/to-words' );
*
* var w = toWords( 3.14e201 );
* // returns [ 1774486211, 2479577218 ]
*
* @example
* var Uint32Array = require( '@stdlib/array/uint32' );
* var toWords = require( '@stdlib/number/float64/base/to-words' );
*
* var out = new Uint32Array( 2 );
*
* var w = toWords( out, 3.14e201 );
* // returns <Uint32Array>[ 1774486211, 2479577218 ]
*
* var bool = ( w === out );
* // returns true
*/

// MODULES //

var toWords = require( './main.js' );


// EXPORTS //

module.exports = toWords;

},{"./main.js":265}],264:[function(require,module,exports){
arguments[4][261][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":112,"dup":261}],265:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var fcn = require( './to_words.js' );


// MAIN //

/**
* Splits a floating-point number into a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
*
* @param {(Array|TypedArray|Object)} [out] - output array
* @param {number} x - input value
* @returns {(Array|TypedArray|Object)} output array
*
* @example
* var w = toWords( 3.14e201 );
* // returns [ 1774486211, 2479577218 ]
*
* @example
* var Uint32Array = require( '@stdlib/array/uint32' );
*
* var out = new Uint32Array( 2 );
*
* var w = toWords( out, 3.14e201 );
* // returns <Uint32Array>[ 1774486211, 2479577218 ]
*
* var bool = ( w === out );
* // returns true
*/
function toWords( out, x ) {
	if ( arguments.length === 1 ) {
		return fcn( [ 0, 0 ], out );
	}
	return fcn( out, x );
}


// EXPORTS //

module.exports = toWords;

},{"./to_words.js":266}],266:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var Uint32Array = require( '@stdlib/array/uint32' );
var Float64Array = require( '@stdlib/array/float64' );
var indices = require( './indices.js' );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );

var HIGH = indices.HIGH;
var LOW = indices.LOW;


// MAIN //

/**
* Splits a floating-point number into a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
*
* ## Notes
*
* ```text
* float64 (64 bits)
* f := fraction (significand/mantissa) (52 bits)
* e := exponent (11 bits)
* s := sign bit (1 bit)
*
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |                                Float64                                |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |              Uint32               |               Uint32              |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* ```
*
* If little endian (more significant bits last):
*
* ```text
*                         <-- lower      higher -->
* |   f7       f6       f5       f4       f3       f2    e2 | f1 |s|  e1  |
* ```
*
* If big endian (more significant bits first):
*
* ```text
*                         <-- higher      lower -->
* |s| e1    e2 | f1     f2       f3       f4       f5        f6      f7   |
* ```
*
* In which Uint32 can we find the higher order bits? If little endian, the second; if big endian, the first.
*
*
* ## References
*
* -   [Open Group][1]
*
* [1]: http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm
*
*
* @private
* @param {(Array|TypedArray|Object)} out - output array
* @param {number} x - input value
* @returns {(Array|TypedArray|Object)} output array
*
* @example
* var Uint32Array = require( '@stdlib/array/uint32' );
*
* var out = new Uint32Array( 2 );
*
* var w = toWords( out, 3.14e201 );
* // returns <Uint32Array>[ 1774486211, 2479577218 ]
*
* var bool = ( w === out );
* // returns true
*/
function toWords( out, x ) {
	FLOAT64_VIEW[ 0 ] = x;
	out[ 0 ] = UINT32_VIEW[ HIGH ];
	out[ 1 ] = UINT32_VIEW[ LOW ];
	return out;
}


// EXPORTS //

module.exports = toWords;

},{"./indices.js":264,"@stdlib/array/float64":5,"@stdlib/array/uint32":19}],267:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Regular expression to match a newline character sequence.
*
* @module @stdlib/regexp/eol
* @type {RegExp}
*
* @example
* var RE_EOL = require( '@stdlib/regexp/eol' );
*
* var bool = RE_EOL.test( '\n' );
* // returns true
*
* bool = RE_EOL.test( '\r\n' );
* // returns true
*
* bool = RE_EOL.test( '\\r\\n' );
* // returns false
*/


// MAIN //

/**
* Matches a newline character sequence.
*
* Regular expression: `/\r?\n/`
*
* -   `\r?`
*     -   match a carriage return character (optional)
*
* -   `\n`
*     -   match a line feed character
*
* @constant
* @type {RegExp}
* @default /\r?\n/
*/
var RE_EOL = /\r?\n/;


// EXPORTS //

module.exports = RE_EOL;

},{}],268:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Regular expression to capture everything that is not a space immediately after the `function` keyword and before the first left parenthesis.
*
* @module @stdlib/regexp/function-name
* @type {RegExp}
*
* @example
* var RE_FUNCTION_NAME = require( '@stdlib/regexp/function-name' );
*
* function fname( fcn ) {
*     return RE_FUNCTION_NAME.exec( fcn.toString() )[ 1 ];
* }
*
* var fn = fname( Math.sqrt );
* // returns 'sqrt'
*
* fn = fname( Int8Array );
* // returns 'Int8Array'
*
* fn = fname( Object.prototype.toString );
* // returns 'toString'
*
* fn = fname( function(){} );
* // returns ''
*/


// MAIN //

/**
* Captures everything that is not a space immediately after the `function` keyword and before the first left parenthesis.
*
* Regular expression: `/^\s*function\s*([^(]*)/i`
*
* -   `/^\s*`
*     -   Match zero or more spaces at beginning
*
* -   `function`
*     -   Match the word `function`
*
* -   `\s*`
*     -   Match zero or more spaces after the word `function`
*
* -   `()`
*     -   Capture
*
* -   `[^(]*`
*     -   Match anything except a left parenthesis `(` zero or more times
*
* -   `/i`
*     -   ignore case
*
* @constant
* @type {RegExp}
* @default /^\s*function\s*([^(]*)/i
*/
var RE_FUNCTION_NAME = /^\s*function\s*([^(]*)/i;


// EXPORTS //

module.exports = RE_FUNCTION_NAME;

},{}],269:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Regular expression to parse a regular expression string.
*
* @module @stdlib/regexp/regexp
* @type {RegExp}
*
* @example
* var RE_REGEXP = require( '@stdlib/regexp/regexp' );
*
* var bool = RE_REGEXP.test( '/^beep$/' );
* // returns true
*
* bool = RE_REGEXP.test( '' );
* // returns false
*
* @example
* var RE_REGEXP = require( '@stdlib/regexp/regexp' );
*
* var parts = RE_REGEXP.exec( '/^.*$/ig' );
* // returns [ '/^.*$/ig', '^.*$', 'ig', 'index': 0, 'input': '/^.*$/ig' ]
*/


// MAIN //

/**
* Matches parts of a regular expression string.
*
* Regular expression: `/^\/((?:\\\/|[^\/])+)\/([imgy]*)$/`
*
* -   `/^\/`
*     -   match a string that begins with a `/`
*
* -   `()`
*     -   capture
*
* -   `(?:)+`
*     -   capture, but do not remember, a group of characters which occur one or more times
*
* -   `\\\/`
*     -   match the literal `\/`
*
* -   `|`
*     -   OR
*
* -   `[^\/]`
*     -   anything which is not the literal `\/`
*
* -   `\/`
*     -   match the literal `/`
*
* -   `([imgy]*)`
*     -   capture any characters matching `imgy` occurring zero or more times
*
* -   `$/`
*     -   string end
*
*
* @constant
* @type {RegExp}
* @default /^\/((?:\\\/|[^\/])+)\/([imgy]*)$/
*/
var RE_REGEXP = /^\/((?:\\\/|[^\/])+)\/([imgy]*)$/; // eslint-disable-line no-useless-escape


// EXPORTS //

module.exports = RE_REGEXP;

},{}],270:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var logger = require( 'debug' );


// VARIABLES //

var debug = logger( 'transform-stream:transform' );


// MAIN //

/**
* Implements the `_transform` method as a pass through.
*
* @private
* @param {(Uint8Array|Buffer|string)} chunk - streamed chunk
* @param {string} encoding - Buffer encoding
* @param {Callback} clbk - callback to invoke after transforming the streamed chunk
*/
function transform( chunk, encoding, clbk ) {
	debug( 'Received a new chunk. Chunk: %s. Encoding: %s.', chunk.toString(), encoding );
	clbk( null, chunk );
}


// EXPORTS //

module.exports = transform;

},{"debug":374}],271:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var logger = require( 'debug' );
var Transform = require( 'readable-stream' ).Transform;
var inherit = require( '@stdlib/utils/inherit' );
var copy = require( '@stdlib/utils/copy' );
var DEFAULTS = require( './defaults.json' );
var validate = require( './validate.js' );
var destroy = require( './destroy.js' );
var _transform = require( './_transform.js' ); // eslint-disable-line no-underscore-dangle


// VARIABLES //

var debug = logger( 'transform-stream:ctor' );


// MAIN //

/**
* Transform stream constructor factory.
*
* @param {Options} [options] - stream options
* @param {Function} [options.transform] - callback to invoke upon receiving a new chunk
* @param {Function} [options.flush] - callback to invoke after receiving all chunks and prior to the stream closing
* @param {boolean} [options.objectMode=false] - specifies whether a stream should operate in object mode
* @param {(string|null)} [options.encoding=null] - specifies how `Buffer` objects should be decoded to `strings`
* @param {NonNegativeNumber} [options.highWaterMark] - specifies the `Buffer` level for when `write()` starts returning `false`
* @param {boolean} [options.allowHalfOpen=false] - specifies whether the stream should remain open even if one side ends
* @param {boolean} [options.decodeStrings=true] - specifies whether to decode `strings` into `Buffer` objects when writing
* @throws {TypeError} options argument must be an object
* @throws {TypeError} must provide valid options
* @returns {Function} Transform stream constructor
*
* @example
* var stdout = require( '@stdlib/streams/node/stdout' );
*
* function transform( chunk, enc, clbk ) {
*     clbk( null, chunk.toString()+'\n' );
* }
*
* var opts = {
*     'transform': transform
* };
*
* var TransformStream = ctor( opts );
*
* var stream = new TransformStream();
*
* stream.pipe( stdout );
*
* stream.write( '1' );
* stream.write( '2' );
* stream.write( '3' );
*
* stream.end();
*
* // prints: '1\n2\n3\n'
*/
function ctor( options ) {
	var transform;
	var copts;
	var err;

	copts = copy( DEFAULTS );
	if ( arguments.length ) {
		err = validate( copts, options );
		if ( err ) {
			throw err;
		}
	}
	if ( copts.transform ) {
		transform = copts.transform;
	} else {
		transform = _transform;
	}
	/**
	* Transform stream constructor.
	*
	* @private
	* @constructor
	* @param {Options} [options] - stream options
	* @param {boolean} [options.objectMode=false] - specifies whether a stream should operate in object mode
	* @param {(string|null)} [options.encoding=null] - specifies how `Buffer` objects should be decoded to `strings`
	* @param {NonNegativeNumber} [options.highWaterMark] - specifies the `Buffer` level for when `write()` starts returning `false`
	* @param {boolean} [options.allowHalfOpen=false] - specifies whether the stream should remain open even if one side ends
	* @param {boolean} [options.decodeStrings=true] - specifies whether to decode `strings` into `Buffer` objects when writing
	* @throws {TypeError} options argument must be an object
	* @throws {TypeError} must provide valid options
	* @returns {TransformStream} transform stream
	*
	* @example
	* var stdout = require( '@stdlib/streams/node/stdout' );
	*
	* var stream = new TransformStream();
	*
	* stream.pipe( stdout );
	*
	* stream.write( '1' );
	* stream.write( '2' );
	* stream.write( '3' );
	*
	* stream.end();
	*
	* // prints: '1\n2\n3\n'
	*/
	function TransformStream( options ) {
		var opts;
		var err;
		if ( !( this instanceof TransformStream ) ) {
			if ( arguments.length ) {
				return new TransformStream( options );
			}
			return new TransformStream();
		}
		opts = copy( copts );
		if ( arguments.length ) {
			err = validate( opts, options );
			if ( err ) {
				throw err;
			}
		}
		debug( 'Creating a transform stream configured with the following options: %s.', JSON.stringify( opts ) );
		Transform.call( this, opts );
		this._destroyed = false;
		return this;
	}

	/**
	* Inherit from the `Transform` prototype.
	*/
	inherit( TransformStream, Transform );

	/**
	* Implements the `_transform` method.
	*
	* @private
	* @name _transform
	* @memberof TransformStream.prototype
	* @type {Function}
	* @param {(Buffer|string)} chunk - streamed chunk
	* @param {string} encoding - Buffer encoding
	* @param {Callback} clbk - callback to invoke after transforming the streamed chunk
	*/
	TransformStream.prototype._transform = transform; // eslint-disable-line no-underscore-dangle

	if ( copts.flush ) {
		/**
		* Implements the `_flush` method.
		*
		* @private
		* @name _flush
		* @memberof TransformStream.prototype
		* @type {Function}
		* @param {Callback} callback to invoke after performing flush tasks
		*/
		TransformStream.prototype._flush = copts.flush; // eslint-disable-line no-underscore-dangle
	}

	/**
	* Gracefully destroys a stream, providing backward compatibility.
	*
	* @private
	* @name destroy
	* @memberof TransformStream.prototype
	* @type {Function}
	* @param {Object} [error] - optional error message
	* @returns {TransformStream} stream instance
	*/
	TransformStream.prototype.destroy = destroy;

	return TransformStream;
}


// EXPORTS //

module.exports = ctor;

},{"./_transform.js":270,"./defaults.json":272,"./destroy.js":273,"./validate.js":278,"@stdlib/utils/copy":295,"@stdlib/utils/inherit":321,"debug":374,"readable-stream":392}],272:[function(require,module,exports){
module.exports={
	"objectMode": false,
	"encoding": null,
	"allowHalfOpen": false,
	"decodeStrings": true
}

},{}],273:[function(require,module,exports){
(function (process){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var logger = require( 'debug' );


// VARIABLES //

var debug = logger( 'transform-stream:destroy' );


// MAIN //

/**
* Gracefully destroys a stream, providing backward compatibility.
*
* @private
* @param {Object} [error] - optional error message
* @returns {Stream} stream instance
*/
function destroy( error ) {
	/* eslint-disable no-invalid-this */
	var self;
	if ( this._destroyed ) {
		debug( 'Attempted to destroy an already destroyed stream.' );
		return this;
	}
	self = this;
	this._destroyed = true;

	// TODO: replace with polyfill
	process.nextTick( close );

	return this;

	/**
	* Closes a stream.
	*
	* @private
	*/
	function close() {
		if ( error ) {
			debug( 'Stream was destroyed due to an error. Error: %s.', JSON.stringify( error ) );
			self.emit( 'error', error );
		}
		debug( 'Closing the stream...' );
		self.emit( 'close' );
	}
}


// EXPORTS //

module.exports = destroy;

}).call(this,require('_process'))
},{"_process":383,"debug":374}],274:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isObject = require( '@stdlib/assert/is-plain-object' );
var copy = require( '@stdlib/utils/copy' );
var Stream = require( './main.js' );


// MAIN //

/**
* Creates a reusable transform stream factory.
*
* @param {Options} [options] - stream options
* @param {boolean} [options.objectMode=false] - specifies whether a stream should operate in object mode
* @param {(string|null)} [options.encoding=null] - specifies how `Buffer` objects should be decoded to `strings`
* @param {NonNegativeNumber} [options.highWaterMark] - specifies the `Buffer` level for when `write()` starts returning `false`
* @param {boolean} [options.allowHalfOpen=false] - specifies whether the stream should remain open even if one side ends
* @param {boolean} [options.decodeStrings=true] - specifies whether to decode `strings` into `Buffer` objects when writing
* @throws {TypeError} options argument must be an object
* @returns {Function} transform stream factory
*
* @example
* function transform( chunk, enc, clbk ) {
*     clbk( null, chunk.toString()+'\n' );
* }
*
* var opts = {
*     'objectMode': true,
*     'encoding': 'utf8',
*     'highWaterMark': 64,
*     'decodeStrings': false
* };
*
* var factory = streamFactory( opts );
*
* // Create 10 identically configured streams...
* var streams = [];
* var i;
* for ( i = 0; i < 10; i++ ) {
*     streams.push( factory( transform ) );
* }
*/
function streamFactory( options ) {
	var opts;
	if ( arguments.length ) {
		if ( !isObject( options ) ) {
			throw new TypeError( 'invalid argument. Options argument must be an object. Value: `' + options + '`.' );
		}
		opts = copy( options );
	} else {
		opts = {};
	}
	return createStream;

	/**
	* Creates a transform stream.
	*
	* @private
	* @param {Function} transform - callback to invoke upon receiving a new chunk
	* @param {Function} [flush] - callback to invoke after receiving all chunks and prior to the stream closing
	* @throws {TypeError} must provide valid options
	* @throws {TypeError} transform callback must be a function
	* @throws {TypeError} flush callback must be a function
	* @returns {TransformStream} transform stream
	*/
	function createStream( transform, flush ) {
		opts.transform = transform;
		if ( arguments.length > 1 ) {
			opts.flush = flush;
		} else {
			delete opts.flush; // clear any previous `flush`
		}
		return new Stream( opts );
	}
}


// EXPORTS //

module.exports = streamFactory;

},{"./main.js":276,"@stdlib/assert/is-plain-object":143,"@stdlib/utils/copy":295}],275:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Transform stream.
*
* @module @stdlib/streams/node/transform
*
* @example
* var stdout = require( '@stdlib/streams/node/stdout' );
* var transformStream = require( '@stdlib/streams/node/transform' );
*
* function transform( chunk, enc, clbk ) {
*     clbk( null, chunk.toString()+'\n' );
* }
*
* var opts = {
*     'transform': transform
* };
* var stream = transformStream( opts );
*
* stream.pipe( stdout );
*
* stream.write( '1' );
* stream.write( '2' );
* stream.write( '3' );
*
* stream.end();
* // => '1\n2\n3\n'
*
*
* @example
* var transformStream = require( '@stdlib/streams/node/transform' );
*
* function transform( chunk, enc, clbk ) {
*     clbk( null, chunk.toString()+'\n' );
* }
*
* var opts = {
*     'objectMode': true,
*     'encoding': 'utf8',
*     'highWaterMark': 64,
*     'decodeStrings': false
* };
*
* var factory = transformStream.factory( opts );
*
* // Create 10 identically configured streams...
* var streams = [];
* var i;
* for ( i = 0; i < 10; i++ ) {
*     streams.push( factory( transform ) );
* }
*
*
* @example
* var stdout = require( '@stdlib/streams/node/stdout' );
* var transformStream = require( '@stdlib/streams/node/transform' );
*
* function stringify( chunk, enc, clbk ) {
*     clbk( null, JSON.stringify( chunk ) );
* }
*
* function newline( chunk, enc, clbk ) {
*     clbk( null, chunk+'\n' );
* }
*
* var s1 = transformStream.objectMode({
*     'transform': stringify
* });
*
* var s2 = transformStream.objectMode({
*     'transform': newline
* });
*
* s1.pipe( s2 ).pipe( stdout );
*
* s1.write( {'value': 'a'} );
* s1.write( {'value': 'b'} );
* s1.write( {'value': 'c'} );
*
* s1.end();
* // => '{"value":"a"}\n{"value":"b"}\n{"value":"c"}\n'
*
*
* @example
* var stdout = require( '@stdlib/streams/node/stdout' );
* var transformStream = require( '@stdlib/streams/node/transform' );
*
* function transform( chunk, enc, clbk ) {
*     clbk( null, chunk.toString()+'\n' );
* }
*
* var opts = {
*     'transform': transform
* };
*
* var Stream = transformStream.ctor( opts );
*
* var stream = new Stream();
*
* stream.pipe( stdout );
*
* stream.write( '1' );
* stream.write( '2' );
* stream.write( '3' );
*
* stream.end();
* // => '1\n2\n3\n'
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var transform = require( './main.js' );
var objectMode = require( './object_mode.js' );
var factory = require( './factory.js' );
var ctor = require( './ctor.js' );


// MAIN //

setReadOnly( transform, 'objectMode', objectMode );
setReadOnly( transform, 'factory', factory );
setReadOnly( transform, 'ctor', ctor );


// EXPORTS //

module.exports = transform;

},{"./ctor.js":271,"./factory.js":274,"./main.js":276,"./object_mode.js":277,"@stdlib/utils/define-nonenumerable-read-only-property":299}],276:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var logger = require( 'debug' );
var Transform = require( 'readable-stream' ).Transform;
var inherit = require( '@stdlib/utils/inherit' );
var copy = require( '@stdlib/utils/copy' );
var DEFAULTS = require( './defaults.json' );
var validate = require( './validate.js' );
var destroy = require( './destroy.js' );
var _transform = require( './_transform.js' ); // eslint-disable-line no-underscore-dangle


// VARIABLES //

var debug = logger( 'transform-stream:main' );


// MAIN //

/**
* Transform stream constructor.
*
* @constructor
* @param {Options} [options] - stream options
* @param {Function} [options.transform] - callback to invoke upon receiving a new chunk
* @param {Function} [options.flush] - callback to invoke after receiving all chunks and prior to the stream closing
* @param {boolean} [options.objectMode=false] - specifies whether stream should operate in object mode
* @param {(string|null)} [options.encoding=null] - specifies how `Buffer` objects should be decoded to `strings`
* @param {NonNegativeNumber} [options.highWaterMark] - specifies the `Buffer` level for when `write()` starts returning `false`
* @param {boolean} [options.allowHalfOpen=false] - specifies whether the stream should remain open even if one side ends
* @param {boolean} [options.decodeStrings=true] - specifies whether to decode `strings` into `Buffer` objects when writing
* @throws {TypeError} must provide valid options
* @returns {TransformStream} transform stream
*
* @example
* var stdout = require( '@stdlib/streams/node/stdout' );
*
* function transform( chunk, enc, clbk ) {
*     clbk( null, chunk.toString()+'\n' );
* }
*
* var opts = {
*     'transform': transform
* };
* var stream = new TransformStream( opts );
*
* stream.pipe( stdout );
*
* stream.write( '1' );
* stream.write( '2' );
* stream.write( '3' );
*
* stream.end();
*
* // prints: '1\n2\n3\n'
*/
function TransformStream( options ) {
	var opts;
	var err;
	if ( !( this instanceof TransformStream ) ) {
		if ( arguments.length ) {
			return new TransformStream( options );
		}
		return new TransformStream();
	}
	opts = copy( DEFAULTS );
	if ( arguments.length ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	debug( 'Creating a transform stream configured with the following options: %s.', JSON.stringify( opts ) );
	Transform.call( this, opts );
	this._destroyed = false;
	if ( opts.transform ) {
		this._transform = opts.transform;
	} else {
		this._transform = _transform;
	}
	if ( opts.flush ) {
		this._flush = opts.flush;
	}
	return this;
}

/*
* Inherit from the `Transform` prototype.
*/
inherit( TransformStream, Transform );

/**
* Gracefully destroys a stream, providing backward compatibility.
*
* @name destroy
* @memberof TransformStream.prototype
* @type {Function}
* @param {Object} [error] - optional error message
* @returns {TransformStream} stream instance
*/
TransformStream.prototype.destroy = destroy;


// EXPORTS //

module.exports = TransformStream;

},{"./_transform.js":270,"./defaults.json":272,"./destroy.js":273,"./validate.js":278,"@stdlib/utils/copy":295,"@stdlib/utils/inherit":321,"debug":374,"readable-stream":392}],277:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isObject = require( '@stdlib/assert/is-plain-object' );
var copy = require( '@stdlib/utils/copy' );
var Stream = require( './main.js' );


// MAIN //

/**
* Returns a transform stream with `objectMode` set to `true`.
*
* @param {Options} [options] - stream options
* @param {Function} [options.transform] - callback to invoke upon receiving a new chunk
* @param {Function} [options.flush] - callback to invoke after receiving all chunks and prior to the stream closing
* @param {(string|null)} [options.encoding=null] - specifies how `Buffer` objects should be decoded to `strings`
* @param {NonNegativeNumber} [options.highWaterMark] - specifies the `Buffer` level for when `write()` starts returning `false`
* @param {boolean} [options.allowHalfOpen=false] - specifies whether the stream should remain open even if one side ends
* @param {boolean} [options.decodeStrings=true] - specifies whether to decode `strings` into `Buffer` objects when writing
* @throws {TypeError} options argument must be an object
* @throws {TypeError} must provide valid options
* @returns {TransformStream} transform stream
*
* @example
* var stdout = require( '@stdlib/streams/node/stdout' );
*
* function stringify( chunk, enc, clbk ) {
*     clbk( null, JSON.stringify( chunk ) );
* }
*
* function newline( chunk, enc, clbk ) {
*     clbk( null, chunk+'\n' );
* }
*
* var s1 = objectMode({
*     'transform': stringify
* });
*
* var s2 = objectMode({
*     'transform': newline
* });
*
* s1.pipe( s2 ).pipe( stdout );
*
* s1.write( {'value': 'a'} );
* s1.write( {'value': 'b'} );
* s1.write( {'value': 'c'} );
*
* s1.end();
*
* // prints: '{"value":"a"}\n{"value":"b"}\n{"value":"c"}\n'
*/
function objectMode( options ) {
	var opts;
	if ( arguments.length ) {
		if ( !isObject( options ) ) {
			throw new TypeError( 'invalid argument. Options argument must be an object. Value: `' + options + '`.' );
		}
		opts = copy( options );
	} else {
		opts = {};
	}
	opts.objectMode = true;
	return new Stream( opts );
}


// EXPORTS //

module.exports = objectMode;

},{"./main.js":276,"@stdlib/assert/is-plain-object":143,"@stdlib/utils/copy":295}],278:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isObject = require( '@stdlib/assert/is-plain-object' );
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var isFunction = require( '@stdlib/assert/is-function' );
var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;
var isNonNegative = require( '@stdlib/assert/is-nonnegative-number' ).isPrimitive;
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;


// MAIN //

/**
* Validates function options.
*
* @private
* @param {Object} opts - destination object
* @param {Options} options - function options
* @param {Function} [options.transform] - callback to invoke upon receiving a new chunk
* @param {Function} [options.flush] - callback to invoke after receiving all chunks and prior to the stream closing
* @param {boolean} [options.objectMode] - specifies whether a stream should operate in object mode
* @param {(string|null)} [options.encoding] - specifies how `Buffer` objects should be decoded to `strings`
* @param {NonNegativeNumber} [options.highWaterMark] - specifies the `Buffer` level for when `write()` starts returning `false`
* @param {boolean} [options.allowHalfOpen] - specifies whether the stream should remain open even if one side ends
* @param {boolean} [options.decodeStrings] - specifies whether to decode `strings` into `Buffer` objects when writing
* @returns {(Error|null)} null or an error object
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'invalid argument. Options must be an object. Value: `' + options + '`.' );
	}
	if ( hasOwnProp( options, 'transform' ) ) {
		opts.transform = options.transform;
		if ( !isFunction( opts.transform ) ) {
			return new TypeError( 'invalid option. `transform` option must be a function. Option: `' + opts.transform + '`.' );
		}
	}
	if ( hasOwnProp( options, 'flush' ) ) {
		opts.flush = options.flush;
		if ( !isFunction( opts.flush ) ) {
			return new TypeError( 'invalid option. `flush` option must be a function. Option: `' + opts.flush + '`.' );
		}
	}
	if ( hasOwnProp( options, 'objectMode' ) ) {
		opts.objectMode = options.objectMode;
		if ( !isBoolean( opts.objectMode ) ) {
			return new TypeError( 'invalid option. `objectMode` option must be a primitive boolean. Option: `' + opts.objectMode + '`.' );
		}
	}
	if ( hasOwnProp( options, 'encoding' ) ) {
		opts.encoding = options.encoding;
		if ( !isString( opts.encoding ) ) {
			return new TypeError( 'invalid option. `encoding` option must be a primitive string. Option: `' + opts.encoding + '`.' );
		}
	}
	if ( hasOwnProp( options, 'allowHalfOpen' ) ) {
		opts.allowHalfOpen = options.allowHalfOpen;
		if ( !isBoolean( opts.allowHalfOpen ) ) {
			return new TypeError( 'invalid option. `allowHalfOpen` option must be a primitive boolean. Option: `' + opts.allowHalfOpen + '`.' );
		}
	}
	if ( hasOwnProp( options, 'highWaterMark' ) ) {
		opts.highWaterMark = options.highWaterMark;
		if ( !isNonNegative( opts.highWaterMark ) ) {
			return new TypeError( 'invalid option. `highWaterMark` option must be a nonnegative number. Option: `' + opts.highWaterMark + '`.' );
		}
	}
	if ( hasOwnProp( options, 'decodeStrings' ) ) {
		opts.decodeStrings = options.decodeStrings;
		if ( !isBoolean( opts.decodeStrings ) ) {
			return new TypeError( 'invalid option. `decodeStrings` option must be a primitive boolean. Option: `' + opts.decodeStrings + '`.' );
		}
	}
	return null;
}


// EXPORTS //

module.exports = validate;

},{"@stdlib/assert/has-own-property":49,"@stdlib/assert/is-boolean":77,"@stdlib/assert/is-function":98,"@stdlib/assert/is-nonnegative-number":127,"@stdlib/assert/is-plain-object":143,"@stdlib/assert/is-string":154}],279:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Create a string from a sequence of Unicode code points.
*
* @module @stdlib/string/from-code-point
*
* @example
* var fromCodePoint = require( '@stdlib/string/from-code-point' );
*
* var str = fromCodePoint( 9731 );
* // returns '☃'
*/

// MODULES //

var fromCodePoint = require( './main.js' );


// EXPORTS //

module.exports = fromCodePoint;

},{"./main.js":280}],280:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;
var isCollection = require( '@stdlib/assert/is-collection' );
var UNICODE_MAX = require( '@stdlib/constants/string/unicode-max' );
var UNICODE_MAX_BMP = require( '@stdlib/constants/string/unicode-max-bmp' );


// VARIABLES //

var fromCharCode = String.fromCharCode;

// Factor to rescale a code point from a supplementary plane:
var Ox10000 = 0x10000|0; // 65536

// Factor added to obtain a high surrogate:
var OxD800 = 0xD800|0; // 55296

// Factor added to obtain a low surrogate:
var OxDC00 = 0xDC00|0; // 56320

// 10-bit mask: 2^10-1 = 1023 => 0x3ff => 00000000 00000000 00000011 11111111
var Ox3FF = 1023|0;


// MAIN //

/**
* Creates a string from a sequence of Unicode code points.
*
* ## Notes
*
* -   UTF-16 encoding uses one 16-bit unit for non-surrogates (U+0000 to U+D7FF and U+E000 to U+FFFF).
* -   UTF-16 encoding uses two 16-bit units (surrogate pairs) for U+10000 to U+10FFFF and encodes U+10000-U+10FFFF by subtracting 0x10000 from the code point, expressing the result as a 20-bit binary, and splitting the 20 bits of 0x0-0xFFFFF as upper and lower 10-bits. The respective 10-bits are stored in two 16-bit words: a high and a low surrogate.
*
*
* @param {...NonNegativeInteger} args - sequence of code points
* @throws {Error} must provide either an array-like object of code points or one or more code points as separate arguments
* @throws {TypeError} a code point must be a nonnegative integer
* @throws {RangeError} must provide a valid Unicode code point
* @returns {string} created string
*
* @example
* var str = fromCodePoint( 9731 );
* // returns '☃'
*/
function fromCodePoint( args ) {
	var len;
	var str;
	var arr;
	var low;
	var hi;
	var pt;
	var i;

	len = arguments.length;
	if ( len === 1 && isCollection( args ) ) {
		arr = arguments[ 0 ];
		len = arr.length;
	} else {
		arr = new Array( len );
		for ( i = 0; i < len; i++ ) {
			arr[ i ] = arguments[ i ];
		}
	}
	if ( len === 0 ) {
		throw new Error( 'insufficient input arguments. Must provide either an array of code points or one or more code points as separate arguments.' );
	}
	str = '';
	for ( i = 0; i < len; i++ ) {
		pt = arr[ i ];
		if ( !isNonNegativeInteger( pt ) ) {
			throw new TypeError( 'invalid argument. Must provide valid code points (nonnegative integers). Value: `'+pt+'`.' );
		}
		if ( pt > UNICODE_MAX ) {
			throw new RangeError( 'invalid argument. Must provide a valid code point (cannot exceed max). Value: `'+pt+'`.' );
		}
		if ( pt <= UNICODE_MAX_BMP ) {
			str += fromCharCode( pt );
		} else {
			// Code point from a supplementary plane. Split into two 16-bit code units (surrogate pair).
			pt -= Ox10000;
			hi = (pt >> 10) + OxD800;
			low = (pt & Ox3FF) + OxDC00;
			str += fromCharCode( hi, low );
		}
	}
	return str;
}


// EXPORTS //

module.exports = fromCodePoint;

},{"@stdlib/assert/is-collection":86,"@stdlib/assert/is-nonnegative-integer":123,"@stdlib/constants/string/unicode-max":241,"@stdlib/constants/string/unicode-max-bmp":240}],281:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Replace search occurrences with a replacement string.
*
* @module @stdlib/string/replace
*
* @example
* var replace = require( '@stdlib/string/replace' );
*
* var str = 'beep';
* var out = replace( str, 'e', 'o' );
* // returns 'boop'
*
* str = 'Hello World';
* out = replace( str, /world/i, 'Mr. President' );
* // returns 'Hello Mr. President'
*/

// MODULES //

var replace = require( './replace.js' );


// EXPORTS //

module.exports = replace;

},{"./replace.js":282}],282:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var rescape = require( '@stdlib/utils/escape-regexp-string' );
var isFunction = require( '@stdlib/assert/is-function' );
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var isRegExp = require( '@stdlib/assert/is-regexp' );


// MAIN //

/**
* Replace search occurrences with a replacement string.
*
* @param {string} str - input string
* @param {(string|RegExp)} search - search expression
* @param {(string|Function)} newval - replacement value or function
* @throws {TypeError} first argument must be a string primitive
* @throws {TypeError} second argument argument must be a string primitive or regular expression
* @throws {TypeError} third argument must be a string primitive or function
* @returns {string} new string containing replacement(s)
*
* @example
* var str = 'beep';
* var out = replace( str, 'e', 'o' );
* // returns 'boop'
*
* @example
* var str = 'Hello World';
* var out = replace( str, /world/i, 'Mr. President' );
* // returns 'Hello Mr. President'
*
* @example
* var capitalize = require( '@stdlib/string/capitalize' );
*
* var str = 'Oranges and lemons say the bells of St. Clement\'s';
*
* function replacer( match, p1 ) {
*     return capitalize( p1 );
* }
*
* var out = replace( str, /([^\s]*)/gi, replacer);
* // returns 'Oranges And Lemons Say The Bells Of St. Clement\'s'
*/
function replace( str, search, newval ) {
	if ( !isString( str ) ) {
		throw new TypeError( 'invalid argument. First argument must be a string primitive. Value: `' + str + '`.' );
	}
	if ( isString( search ) ) {
		search = rescape( search );
		search = new RegExp( search, 'g' );
	}
	else if ( !isRegExp( search ) ) {
		throw new TypeError( 'invalid argument. Second argument must be a string primitive or regular expression. Value: `' + search + '`.' );
	}
	if ( !isString( newval ) && !isFunction( newval ) ) {
		throw new TypeError( 'invalid argument. Third argument must be a string primitive or replacement function. Value: `' + newval + '`.' );
	}
	return str.replace( search, newval );
}


// EXPORTS //

module.exports = replace;

},{"@stdlib/assert/is-function":98,"@stdlib/assert/is-regexp":150,"@stdlib/assert/is-string":154,"@stdlib/utils/escape-regexp-string":304}],283:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Trim whitespace characters from the beginning and end of a string.
*
* @module @stdlib/string/trim
*
* @example
* var trim = require( '@stdlib/string/trim' );
*
* var out = trim( '   Whitespace   ' );
* // returns 'Whitespace'
*
* out = trim( '\t\t\tTabs\t\t\t' );
* // returns 'Tabs'
*
* out = trim( '\n\n\nNew Lines\n\n\n' );
* // returns 'New Lines'
*/

// MODULES //

var trim = require( './trim.js' );


// EXPORTS //

module.exports = trim;

},{"./trim.js":284}],284:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var replace = require( '@stdlib/string/replace' );


// VARIABLES //

// The following regular expression should suffice to polyfill (most?) all environments.
var RE = /^[\u0020\f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]*([\S\s]*?)[\u0020\f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]*$/;


// MAIN //

/**
* Trim whitespace characters from beginning and end of a string.
*
* @param {string} str - input string
* @throws {TypeError} must provide a string primitive
* @returns {string} trimmed string
*
* @example
* var out = trim( '   Whitespace   ' );
* // returns 'Whitespace'
*
* @example
* var out = trim( '\t\t\tTabs\t\t\t' );
* // returns 'Tabs'
*
* @example
* var out = trim( '\n\n\nNew Lines\n\n\n' );
* // returns 'New Lines'
*/
function trim( str ) {
	if ( !isString( str ) ) {
		throw new TypeError( 'invalid argument. Must provide a string primitive. Value: `' + str + '`.' );
	}
	return replace( str, RE, '$1' );
}


// EXPORTS //

module.exports = trim;

},{"@stdlib/assert/is-string":154,"@stdlib/string/replace":281}],285:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var getGlobal = require( '@stdlib/utils/global' );
var isObject = require( '@stdlib/assert/is-object' );
var modf = require( '@stdlib/math/base/special/modf' );
var round = require( '@stdlib/math/base/special/round' );
var now = require( './now.js' );


// VARIABLES //

var Global = getGlobal();
var ts;
var ns;

if ( isObject( Global.performance ) ) {
	ns = Global.performance;
} else {
	ns = {};
}
if ( ns.now ) {
	ts = ns.now.bind( ns );
} else if ( ns.mozNow ) {
	ts = ns.mozNow.bind( ns );
} else if ( ns.msNow ) {
	ts = ns.msNow.bind( ns );
} else if ( ns.oNow ) {
	ts = ns.oNow.bind( ns );
} else if ( ns.webkitNow ) {
	ts = ns.webkitNow.bind( ns );
} else {
	ts = now;
}


// MAIN //

/**
* Returns a high-resolution time.
*
* ## Notes
*
* -   Output format: `[seconds, nanoseconds]`.
*
*
* @private
* @returns {NumberArray} high-resolution time
*
* @example
* var t = tic();
* // returns [<number>,<number>]
*/
function tic() {
	var parts;
	var t;

	// Get a millisecond timestamp and convert to seconds:
	t = ts() / 1000;

	// Decompose the timestamp into integer (seconds) and fractional parts:
	parts = modf( t );

	// Convert the fractional part to nanoseconds:
	parts[ 1 ] = round( parts[1] * 1.0e9 );

	// Return the high-resolution time:
	return parts;
}


// EXPORTS //

module.exports = tic;

},{"./now.js":287,"@stdlib/assert/is-object":141,"@stdlib/math/base/special/modf":253,"@stdlib/math/base/special/round":256,"@stdlib/utils/global":314}],286:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isFunction = require( '@stdlib/assert/is-function' );


// MAIN //

var bool = isFunction( Date.now );


// EXPORTS //

module.exports = bool;

},{"@stdlib/assert/is-function":98}],287:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var bool = require( './detect.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var now;
if ( bool ) {
	now = Date.now;
} else {
	now = polyfill;
}


// EXPORTS //

module.exports = now;

},{"./detect.js":286,"./polyfill.js":288}],288:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

/**
* Returns the time in milliseconds since the epoch.
*
* @private
* @returns {number} time
*
* @example
* var ts = now();
* // returns <number>
*/
function now() {
	var d = new Date();
	return d.getTime();
}


// EXPORTS //

module.exports = now;

},{}],289:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Return a high-resolution time difference.
*
* @module @stdlib/time/toc
*
* @example
* var tic = require( '@stdlib/time/tic' );
* var toc = require( '@stdlib/time/toc' );
*
* var start = tic();
* var delta = toc( start );
* // returns [<number>,<number>]
*/

// MODULES //

var toc = require( './toc.js' );


// EXPORTS //

module.exports = toc;

},{"./toc.js":290}],290:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isNonNegativeIntegerArray = require( '@stdlib/assert/is-nonnegative-integer-array' ).primitives;
var tic = require( '@stdlib/time/tic' );


// MAIN //

/**
* Returns a high-resolution time difference.
*
* ## Notes
*
* -   Output format: `[seconds, nanoseconds]`.
*
*
* @param {NonNegativeIntegerArray} time - high-resolution time
* @throws {TypeError} must provide a nonnegative integer array
* @throws {RangeError} input array must have length `2`
* @returns {NumberArray} high resolution time difference
*
* @example
* var tic = require( '@stdlib/time/tic' );
*
* var start = tic();
* var delta = toc( start );
* // returns [<number>,<number>]
*/
function toc( time ) {
	var now = tic();
	var sec;
	var ns;
	if ( !isNonNegativeIntegerArray( time ) ) {
		throw new TypeError( 'invalid argument. Must provide an array of nonnegative integers. Value: `' + time + '`.' );
	}
	if ( time.length !== 2 ) {
		throw new RangeError( 'invalid argument. Input array must have length `2`.' );
	}
	sec = now[ 0 ] - time[ 0 ];
	ns = now[ 1 ] - time[ 1 ];
	if ( sec > 0 && ns < 0 ) {
		sec -= 1;
		ns += 1e9;
	}
	else if ( sec < 0 && ns > 0 ) {
		sec += 1;
		ns -= 1e9;
	}
	return [ sec, ns ];
}


// EXPORTS //

module.exports = toc;

},{"@stdlib/assert/is-nonnegative-integer-array":122,"@stdlib/time/tic":285}],291:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Determine the name of a value's constructor.
*
* @module @stdlib/utils/constructor-name
*
* @example
* var constructorName = require( '@stdlib/utils/constructor-name' );
*
* var v = constructorName( 'a' );
* // returns 'String'
*
* v = constructorName( {} );
* // returns 'Object'
*
* v = constructorName( true );
* // returns 'Boolean'
*/

// MODULES //

var constructorName = require( './main.js' );


// EXPORTS //

module.exports = constructorName;

},{"./main.js":292}],292:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var nativeClass = require( '@stdlib/utils/native-class' );
var RE = require( '@stdlib/regexp/function-name' );
var isBuffer = require( '@stdlib/assert/is-buffer' );


// MAIN //

/**
* Determines the name of a value's constructor.
*
* @param {*} v - input value
* @returns {string} name of a value's constructor
*
* @example
* var v = constructorName( 'a' );
* // returns 'String'
*
* @example
* var v = constructorName( 5 );
* // returns 'Number'
*
* @example
* var v = constructorName( null );
* // returns 'Null'
*
* @example
* var v = constructorName( undefined );
* // returns 'Undefined'
*
* @example
* var v = constructorName( function noop() {} );
* // returns 'Function'
*/
function constructorName( v ) {
	var match;
	var name;
	var ctor;
	name = nativeClass( v ).slice( 8, -1 );
	if ( (name === 'Object' || name === 'Error') && v.constructor ) {
		ctor = v.constructor;
		if ( typeof ctor.name === 'string' ) {
			return ctor.name;
		}
		match = RE.exec( ctor.toString() );
		if ( match ) {
			return match[ 1 ];
		}
	}
	if ( isBuffer( v ) ) {
		return 'Buffer';
	}
	return name;
}


// EXPORTS //

module.exports = constructorName;

},{"@stdlib/assert/is-buffer":84,"@stdlib/regexp/function-name":268,"@stdlib/utils/native-class":342}],293:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isArray = require( '@stdlib/assert/is-array' );
var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var deepCopy = require( './deep_copy.js' );


// MAIN //

/**
* Copies or deep clones a value to an arbitrary depth.
*
* @param {*} value - value to copy
* @param {NonNegativeInteger} [level=+infinity] - copy depth
* @throws {TypeError} `level` must be a nonnegative integer
* @returns {*} value copy
*
* @example
* var out = copy( 'beep' );
* // returns 'beep'
*
* @example
* var value = [
*     {
*         'a': 1,
*         'b': true,
*         'c': [ 1, 2, 3 ]
*     }
* ];
* var out = copy( value );
* // returns [ { 'a': 1, 'b': true, 'c': [ 1, 2, 3 ] } ]
*
* var bool = ( value[0].c === out[0].c );
* // returns false
*/
function copy( value, level ) {
	var out;
	if ( arguments.length > 1 ) {
		if ( !isNonNegativeInteger( level ) ) {
			throw new TypeError( 'invalid argument. `level` must be a nonnegative integer. Value: `' + level + '`.' );
		}
		if ( level === 0 ) {
			return value;
		}
	} else {
		level = PINF;
	}
	out = ( isArray( value ) ) ? new Array( value.length ) : {};
	return deepCopy( value, out, [value], [out], level );
}


// EXPORTS //

module.exports = copy;

},{"./deep_copy.js":294,"@stdlib/assert/is-array":75,"@stdlib/assert/is-nonnegative-integer":123,"@stdlib/constants/math/float64-pinf":230}],294:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var isArray = require( '@stdlib/assert/is-array' );
var isBuffer = require( '@stdlib/assert/is-buffer' );
var isError = require( '@stdlib/assert/is-error' );
var typeOf = require( '@stdlib/utils/type-of' );
var regexp = require( '@stdlib/utils/regexp-from-string' );
var indexOf = require( '@stdlib/utils/index-of' );
var objectKeys = require( '@stdlib/utils/keys' );
var propertyNames = require( '@stdlib/utils/property-names' );
var propertyDescriptor = require( '@stdlib/utils/property-descriptor' );
var getPrototypeOf = require( '@stdlib/utils/get-prototype-of' );
var defineProperty = require( '@stdlib/utils/define-property' );
var copyBuffer = require( '@stdlib/buffer/from-buffer' );
var typedArrays = require( './typed_arrays.js' );


// FUNCTIONS //

/**
* Clones a class instance.
*
* ## Notes
*
* -   This should **only** be used for simple cases. Any instances with privileged access to variables (e.g., within closures) cannot be cloned. This approach should be considered **fragile**.
* -   The function is greedy, disregarding the notion of a `level`. Instead, the function deep copies all properties, as we assume the concept of `level` applies only to the class instance reference but not to its internal state. This prevents, in theory, two instances from sharing state.
*
*
* @private
* @param {Object} val - class instance
* @returns {Object} new instance
*/
function cloneInstance( val ) {
	var cache;
	var names;
	var name;
	var refs;
	var desc;
	var tmp;
	var ref;
	var i;

	cache = [];
	refs = [];

	ref = Object.create( getPrototypeOf( val ) );
	cache.push( val );
	refs.push( ref );

	names = propertyNames( val );
	for ( i = 0; i < names.length; i++ ) {
		name = names[ i ];
		desc = propertyDescriptor( val, name );
		if ( hasOwnProp( desc, 'value' ) ) {
			tmp = ( isArray( val[name] ) ) ? [] : {};
			desc.value = deepCopy( val[name], tmp, cache, refs, -1 );
		}
		defineProperty( ref, name, desc );
	}
	if ( !Object.isExtensible( val ) ) {
		Object.preventExtensions( ref );
	}
	if ( Object.isSealed( val ) ) {
		Object.seal( ref );
	}
	if ( Object.isFrozen( val ) ) {
		Object.freeze( ref );
	}
	return ref;
}

/**
* Copies an error object.
*
* @private
* @param {(Error|TypeError|SyntaxError|URIError|ReferenceError|RangeError|EvalError)} error - error to copy
* @returns {(Error|TypeError|SyntaxError|URIError|ReferenceError|RangeError|EvalError)} error copy
*
* @example
* var err1 = new TypeError( 'beep' );
*
* var err2 = copyError( err1 );
* // returns <TypeError>
*/
function copyError( error ) {
	var cache = [];
	var refs = [];
	var keys;
	var desc;
	var tmp;
	var key;
	var err;
	var i;

	// Create a new error...
	err = new error.constructor( error.message );

	cache.push( error );
	refs.push( err );

	// If a `stack` property is present, copy it over...
	if ( error.stack ) {
		err.stack = error.stack;
	}
	// Node.js specific (system errors)...
	if ( error.code ) {
		err.code = error.code;
	}
	if ( error.errno ) {
		err.errno = error.errno;
	}
	if ( error.syscall ) {
		err.syscall = error.syscall;
	}
	// Any enumerable properties...
	keys = objectKeys( error );
	for ( i = 0; i < keys.length; i++ ) {
		key = keys[ i ];
		desc = propertyDescriptor( error, key );
		if ( hasOwnProp( desc, 'value' ) ) {
			tmp = ( isArray( error[ key ] ) ) ? [] : {};
			desc.value = deepCopy( error[ key ], tmp, cache, refs, -1 );
		}
		defineProperty( err, key, desc );
	}
	return err;
}


// MAIN //

/**
* Recursively performs a deep copy of an input object.
*
* @private
* @param {*} val - value to copy
* @param {(Array|Object)} copy - copy
* @param {Array} cache - an array of visited objects
* @param {Array} refs - an array of object references
* @param {NonNegativeInteger} level - copy depth
* @returns {*} deep copy
*/
function deepCopy( val, copy, cache, refs, level ) {
	var parent;
	var keys;
	var name;
	var desc;
	var ctor;
	var key;
	var ref;
	var x;
	var i;
	var j;

	level -= 1;

	// Primitives and functions...
	if (
		typeof val !== 'object' ||
		val === null
	) {
		return val;
	}
	if ( isBuffer( val ) ) {
		return copyBuffer( val );
	}
	if ( isError( val ) ) {
		return copyError( val );
	}
	// Objects...
	name = typeOf( val );

	if ( name === 'date' ) {
		return new Date( +val );
	}
	if ( name === 'regexp' ) {
		return regexp( val.toString() );
	}
	if ( name === 'set' ) {
		return new Set( val );
	}
	if ( name === 'map' ) {
		return new Map( val );
	}
	if (
		name === 'string' ||
		name === 'boolean' ||
		name === 'number'
	) {
		// If provided an `Object`, return an equivalent primitive!
		return val.valueOf();
	}
	ctor = typedArrays[ name ];
	if ( ctor ) {
		return ctor( val );
	}
	// Class instances...
	if (
		name !== 'array' &&
		name !== 'object'
	) {
		// Cloning requires ES5 or higher...
		if ( typeof Object.freeze === 'function' ) {
			return cloneInstance( val );
		}
		return {};
	}
	// Arrays and plain objects...
	keys = objectKeys( val );
	if ( level > 0 ) {
		parent = name;
		for ( j = 0; j < keys.length; j++ ) {
			key = keys[ j ];
			x = val[ key ];

			// Primitive, Buffer, special class instance...
			name = typeOf( x );
			if (
				typeof x !== 'object' ||
				x === null ||
				(
					name !== 'array' &&
					name !== 'object'
				) ||
				isBuffer( x )
			) {
				if ( parent === 'object' ) {
					desc = propertyDescriptor( val, key );
					if ( hasOwnProp( desc, 'value' ) ) {
						desc.value = deepCopy( x );
					}
					defineProperty( copy, key, desc );
				} else {
					copy[ key ] = deepCopy( x );
				}
				continue;
			}
			// Circular reference...
			i = indexOf( cache, x );
			if ( i !== -1 ) {
				copy[ key ] = refs[ i ];
				continue;
			}
			// Plain array or object...
			ref = ( isArray( x ) ) ? new Array( x.length ) : {};
			cache.push( x );
			refs.push( ref );
			if ( parent === 'array' ) {
				copy[ key ] = deepCopy( x, ref, cache, refs, level );
			} else {
				desc = propertyDescriptor( val, key );
				if ( hasOwnProp( desc, 'value' ) ) {
					desc.value = deepCopy( x, ref, cache, refs, level );
				}
				defineProperty( copy, key, desc );
			}
		}
	} else if ( name === 'array' ) {
		for ( j = 0; j < keys.length; j++ ) {
			key = keys[ j ];
			copy[ key ] = val[ key ];
		}
	} else {
		for ( j = 0; j < keys.length; j++ ) {
			key = keys[ j ];
			desc = propertyDescriptor( val, key );
			defineProperty( copy, key, desc );
		}
	}
	if ( !Object.isExtensible( val ) ) {
		Object.preventExtensions( copy );
	}
	if ( Object.isSealed( val ) ) {
		Object.seal( copy );
	}
	if ( Object.isFrozen( val ) ) {
		Object.freeze( copy );
	}
	return copy;
}


// EXPORTS //

module.exports = deepCopy;

},{"./typed_arrays.js":296,"@stdlib/assert/has-own-property":49,"@stdlib/assert/is-array":75,"@stdlib/assert/is-buffer":84,"@stdlib/assert/is-error":92,"@stdlib/buffer/from-buffer":221,"@stdlib/utils/define-property":302,"@stdlib/utils/get-prototype-of":308,"@stdlib/utils/index-of":318,"@stdlib/utils/keys":335,"@stdlib/utils/property-descriptor":355,"@stdlib/utils/property-names":359,"@stdlib/utils/regexp-from-string":362,"@stdlib/utils/type-of":367}],295:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Copy or deep clone a value to an arbitrary depth.
*
* @module @stdlib/utils/copy
*
* @example
* var copy = require( '@stdlib/utils/copy' );
*
* var out = copy( 'beep' );
* // returns 'beep'
*
* @example
* var copy = require( '@stdlib/utils/copy' );
*
* var value = [
*     {
*         'a': 1,
*         'b': true,
*         'c': [ 1, 2, 3 ]
*     }
* ];
* var out = copy( value );
* // returns [ {'a': 1, 'b': true, 'c': [ 1, 2, 3 ] } ]
*
* var bool = ( value[0].c === out[0].c );
* // returns false
*/

// MODULES //

var copy = require( './copy.js' );


// EXPORTS //

module.exports = copy;

},{"./copy.js":293}],296:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var Int8Array = require( '@stdlib/array/int8' );
var Uint8Array = require( '@stdlib/array/uint8' );
var Uint8ClampedArray = require( '@stdlib/array/uint8c' );
var Int16Array = require( '@stdlib/array/int16' );
var Uint16Array = require( '@stdlib/array/uint16' );
var Int32Array = require( '@stdlib/array/int32' );
var Uint32Array = require( '@stdlib/array/uint32' );
var Float32Array = require( '@stdlib/array/float32' );
var Float64Array = require( '@stdlib/array/float64' );


// VARIABLES //

var hash;


// FUNCTIONS //

/**
* Copies an `Int8Array`.
*
* @private
* @param {Int8Array} arr - array to copy
* @returns {Int8Array} new array
*/
function int8array( arr ) {
	return new Int8Array( arr );
}

/**
* Copies a `Uint8Array`.
*
* @private
* @param {Uint8Array} arr - array to copy
* @returns {Uint8Array} new array
*/
function uint8array( arr ) {
	return new Uint8Array( arr );
}

/**
* Copies a `Uint8ClampedArray`.
*
* @private
* @param {Uint8ClampedArray} arr - array to copy
* @returns {Uint8ClampedArray} new array
*/
function uint8clampedarray( arr ) {
	return new Uint8ClampedArray( arr );
}

/**
* Copies an `Int16Array`.
*
* @private
* @param {Int16Array} arr - array to copy
* @returns {Int16Array} new array
*/
function int16array( arr ) {
	return new Int16Array( arr );
}

/**
* Copies a `Uint16Array`.
*
* @private
* @param {Uint16Array} arr - array to copy
* @returns {Uint16Array} new array
*/
function uint16array( arr ) {
	return new Uint16Array( arr );
}

/**
* Copies an `Int32Array`.
*
* @private
* @param {Int32Array} arr - array to copy
* @returns {Int32Array} new array
*/
function int32array( arr ) {
	return new Int32Array( arr );
}

/**
* Copies a `Uint32Array`.
*
* @private
* @param {Uint32Array} arr - array to copy
* @returns {Uint32Array} new array
*/
function uint32array( arr ) {
	return new Uint32Array( arr );
}

/**
* Copies a `Float32Array`.
*
* @private
* @param {Float32Array} arr - array to copy
* @returns {Float32Array} new array
*/
function float32array( arr ) {
	return new Float32Array( arr );
}

/**
* Copies a `Float64Array`.
*
* @private
* @param {Float64Array} arr - array to copy
* @returns {Float64Array} new array
*/
function float64array( arr ) {
	return new Float64Array( arr );
}

/**
* Returns a hash of functions for copying typed arrays.
*
* @private
* @returns {Object} function hash
*/
function typedarrays() {
	var out = {
		'int8array': int8array,
		'uint8array': uint8array,
		'uint8clampedarray': uint8clampedarray,
		'int16array': int16array,
		'uint16array': uint16array,
		'int32array': int32array,
		'uint32array': uint32array,
		'float32array': float32array,
		'float64array': float64array
	};
	return out;
}


// MAIN //

hash = typedarrays();


// EXPORTS //

module.exports = hash;

},{"@stdlib/array/float32":2,"@stdlib/array/float64":5,"@stdlib/array/int16":7,"@stdlib/array/int32":10,"@stdlib/array/int8":13,"@stdlib/array/uint16":16,"@stdlib/array/uint32":19,"@stdlib/array/uint8":22,"@stdlib/array/uint8c":25}],297:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Define a non-enumerable read-only accessor.
*
* @module @stdlib/utils/define-nonenumerable-read-only-accessor
*
* @example
* var setNonEnumerableReadOnlyAccessor = require( '@stdlib/utils/define-nonenumerable-read-only-accessor' );
*
* function getter() {
*     return 'bar';
* }
*
* var obj = {};
*
* setNonEnumerableReadOnlyAccessor( obj, 'foo', getter );
*
* try {
*     obj.foo = 'boop';
* } catch ( err ) {
*     console.error( err.message );
* }
*/

// MODULES //

var setNonEnumerableReadOnlyAccessor = require( './main.js' ); // eslint-disable-line id-length


// EXPORTS //

module.exports = setNonEnumerableReadOnlyAccessor;

},{"./main.js":298}],298:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var defineProperty = require( '@stdlib/utils/define-property' );


// MAIN //

/**
* Defines a non-enumerable read-only accessor.
*
* @param {Object} obj - object on which to define the property
* @param {(string|symbol)} prop - property name
* @param {Function} getter - accessor
*
* @example
* function getter() {
*     return 'bar';
* }
*
* var obj = {};
*
* setNonEnumerableReadOnlyAccessor( obj, 'foo', getter );
*
* try {
*     obj.foo = 'boop';
* } catch ( err ) {
*     console.error( err.message );
* }
*/
function setNonEnumerableReadOnlyAccessor( obj, prop, getter ) { // eslint-disable-line id-length
	defineProperty( obj, prop, {
		'configurable': false,
		'enumerable': false,
		'get': getter
	});
}


// EXPORTS //

module.exports = setNonEnumerableReadOnlyAccessor;

},{"@stdlib/utils/define-property":302}],299:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Define a non-enumerable read-only property.
*
* @module @stdlib/utils/define-nonenumerable-read-only-property
*
* @example
* var setNonEnumerableReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
*
* var obj = {};
*
* setNonEnumerableReadOnly( obj, 'foo', 'bar' );
*
* try {
*     obj.foo = 'boop';
* } catch ( err ) {
*     console.error( err.message );
* }
*/

// MODULES //

var setNonEnumerableReadOnly = require( './main.js' );


// EXPORTS //

module.exports = setNonEnumerableReadOnly;

},{"./main.js":300}],300:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var defineProperty = require( '@stdlib/utils/define-property' );


// MAIN //

/**
* Defines a non-enumerable read-only property.
*
* @param {Object} obj - object on which to define the property
* @param {(string|symbol)} prop - property name
* @param {*} value - value to set
*
* @example
* var obj = {};
*
* setNonEnumerableReadOnly( obj, 'foo', 'bar' );
*
* try {
*     obj.foo = 'boop';
* } catch ( err ) {
*     console.error( err.message );
* }
*/
function setNonEnumerableReadOnly( obj, prop, value ) {
	defineProperty( obj, prop, {
		'configurable': false,
		'enumerable': false,
		'writable': false,
		'value': value
	});
}


// EXPORTS //

module.exports = setNonEnumerableReadOnly;

},{"@stdlib/utils/define-property":302}],301:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

/**
* Defines (or modifies) an object property.
*
* ## Notes
*
* -   Property descriptors come in two flavors: **data descriptors** and **accessor descriptors**. A data descriptor is a property that has a value, which may or may not be writable. An accessor descriptor is a property described by a getter-setter function pair. A descriptor must be one of these two flavors and cannot be both.
*
* @name defineProperty
* @type {Function}
* @param {Object} obj - object on which to define the property
* @param {(string|symbol)} prop - property name
* @param {Object} descriptor - property descriptor
* @param {boolean} [descriptor.configurable=false] - boolean indicating if property descriptor can be changed and if the property can be deleted from the provided object
* @param {boolean} [descriptor.enumerable=false] - boolean indicating if the property shows up when enumerating object properties
* @param {boolean} [descriptor.writable=false] - boolean indicating if the value associated with the property can be changed with an assignment operator
* @param {*} [descriptor.value] - property value
* @param {(Function|void)} [descriptor.get=undefined] - function which serves as a getter for the property, or, if no getter, undefined. When the property is accessed, a getter function is called without arguments and with the `this` context set to the object through which the property is accessed (which may not be the object on which the property is defined due to inheritance). The return value will be used as the property value.
* @param {(Function|void)} [descriptor.set=undefined] - function which serves as a setter for the property, or, if no setter, undefined. When assigning a property value, a setter function is called with one argument (the value being assigned to the property) and with the `this` context set to the object through which the property is assigned.
* @throws {TypeError} first argument must be an object
* @throws {TypeError} third argument must be an object
* @throws {Error} property descriptor cannot have both a value and a setter and/or getter
* @returns {Object} object with added property
*
* @example
* var obj = {};
*
* defineProperty( obj, 'foo', {
*     'value': 'bar'
* });
*
* var str = obj.foo;
* // returns 'bar'
*/
var defineProperty = Object.defineProperty;


// EXPORTS //

module.exports = defineProperty;

},{}],302:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Define (or modify) an object property.
*
* @module @stdlib/utils/define-property
*
* @example
* var defineProperty = require( '@stdlib/utils/define-property' );
*
* var obj = {};
* defineProperty( obj, 'foo', {
*     'value': 'bar',
*     'writable': false,
*     'configurable': false,
*     'enumerable': false
* });
* obj.foo = 'boop'; // => throws
*/

// MODULES //

var hasDefinePropertySupport = require( '@stdlib/assert/has-define-property-support' );
var builtin = require( './builtin.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var defineProperty;
if ( hasDefinePropertySupport() ) {
	defineProperty = builtin;
} else {
	defineProperty = polyfill;
}


// EXPORTS //

module.exports = defineProperty;

},{"./builtin.js":301,"./polyfill.js":303,"@stdlib/assert/has-define-property-support":29}],303:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

/* eslint-disable no-underscore-dangle, no-proto */

'use strict';

// MODULES //

var hasProperty = require( '@stdlib/assert/has-property' );
var isObject = require( '@stdlib/assert/is-object' );


// VARIABLES //

var objectProtoype = Object.prototype;
var defineGetter = objectProtoype.__defineGetter__;
var defineSetter = objectProtoype.__defineSetter__;
var lookupGetter = objectProtoype.__lookupGetter__;
var lookupSetter = objectProtoype.__lookupSetter__;


// MAIN //

/**
* Defines (or modifies) an object property.
*
* ## Notes
*
* -   Property descriptors come in two flavors: **data descriptors** and **accessor descriptors**. A data descriptor is a property that has a value, which may or may not be writable. An accessor descriptor is a property described by a getter-setter function pair. A descriptor must be one of these two flavors and cannot be both.
*
* @param {Object} obj - object on which to define the property
* @param {string} prop - property name
* @param {Object} descriptor - property descriptor
* @param {boolean} [descriptor.configurable=false] - boolean indicating if property descriptor can be changed and if the property can be deleted from the provided object
* @param {boolean} [descriptor.enumerable=false] - boolean indicating if the property shows up when enumerating object properties
* @param {boolean} [descriptor.writable=false] - boolean indicating if the value associated with the property can be changed with an assignment operator
* @param {*} [descriptor.value] - property value
* @param {(Function|void)} [descriptor.get=undefined] - function which serves as a getter for the property, or, if no getter, undefined. When the property is accessed, a getter function is called without arguments and with the `this` context set to the object through which the property is accessed (which may not be the object on which the property is defined due to inheritance). The return value will be used as the property value.
* @param {(Function|void)} [descriptor.set=undefined] - function which serves as a setter for the property, or, if no setter, undefined. When assigning a property value, a setter function is called with one argument (the value being assigned to the property) and with the `this` context set to the object through which the property is assigned.
* @throws {TypeError} first argument must be an object
* @throws {TypeError} third argument must be an object
* @throws {Error} property descriptor cannot have both a value and a setter and/or getter
* @returns {Object} object with added property
*
* @example
* var obj = {};
*
* defineProperty( obj, 'foo', {
*     'value': 'bar'
* });
*
* var str = obj.foo;
* // returns 'bar'
*/
function defineProperty( obj, prop, descriptor ) {
	var prototype;
	var hasValue;
	var hasGet;
	var hasSet;

	if ( !isObject( obj ) ) {
		throw new TypeError( 'invalid argument. First argument must be an object. Value: `' + obj + '`.' );
	}
	if ( !isObject( descriptor ) ) {
		throw new TypeError( 'invalid argument. Property descriptor must be an object. Value: `' + descriptor + '`.' );
	}
	hasValue = hasProperty( descriptor, 'value' );
	if ( hasValue ) {
		if (
			lookupGetter.call( obj, prop ) ||
			lookupSetter.call( obj, prop )
		) {
			// Override `__proto__` to avoid touching inherited accessors:
			prototype = obj.__proto__;
			obj.__proto__ = objectProtoype;

			// Delete property as existing getters/setters prevent assigning value to specified property:
			delete obj[ prop ];
			obj[ prop ] = descriptor.value;

			// Restore original prototype:
			obj.__proto__ = prototype;
		} else {
			obj[ prop ] = descriptor.value;
		}
	}
	hasGet = hasProperty( descriptor, 'get' );
	hasSet = hasProperty( descriptor, 'set' );

	if ( hasValue && ( hasGet || hasSet ) ) {
		throw new Error( 'invalid argument. Cannot specify one or more accessors and a value or writable attribute in the property descriptor.' );
	}

	if ( hasGet && defineGetter ) {
		defineGetter.call( obj, prop, descriptor.get );
	}
	if ( hasSet && defineSetter ) {
		defineSetter.call( obj, prop, descriptor.set );
	}
	return obj;
}


// EXPORTS //

module.exports = defineProperty;

},{"@stdlib/assert/has-property":51,"@stdlib/assert/is-object":141}],304:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Escape a regular expression string or pattern.
*
* @module @stdlib/utils/escape-regexp-string
*
* @example
* var rescape = require( '@stdlib/utils/escape-regexp-string' );
*
* var str = rescape( '[A-Z]*' );
* // returns '\\[A\\-Z\\]\\*'
*/

// MODULES //

var rescape = require( './main.js' );


// EXPORTS //

module.exports = rescape;

},{"./main.js":305}],305:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;


// VARIABLES //

var RE_CHARS = /[-\/\\^$*+?.()|[\]{}]/g; // eslint-disable-line no-useless-escape


// MAIN //

/**
* Escapes a regular expression string.
*
* @param {string} str - regular expression string
* @throws {TypeError} first argument must be a string primitive
* @returns {string} escaped string
*
* @example
* var str = rescape( '[A-Z]*' );
* // returns '\\[A\\-Z\\]\\*'
*/
function rescape( str ) {
	var len;
	var s;
	var i;

	if ( !isString( str ) ) {
		throw new TypeError( 'invalid argument. Must provide a regular expression string. Value: `' + str + '`.' );
	}
	// Check if the string starts with a forward slash...
	if ( str[ 0 ] === '/' ) {
		// Find the last forward slash...
		len = str.length;
		for ( i = len-1; i >= 0; i-- ) {
			if ( str[ i ] === '/' ) {
				break;
			}
		}
	}
	// If we searched the string to no avail or if the first letter is not `/`, assume that the string is not of the form `/[...]/[guimy]`:
	if ( i === void 0 || i <= 0 ) {
		return str.replace( RE_CHARS, '\\$&' );
	}
	// We need to de-construct the string...
	s = str.substring( 1, i );

	// Only escape the characters between the `/`:
	s = s.replace( RE_CHARS, '\\$&' );

	// Reassemble:
	str = str[ 0 ] + s + str.substring( i );

	return str;
}


// EXPORTS //

module.exports = rescape;

},{"@stdlib/assert/is-string":154}],306:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isFunction = require( '@stdlib/assert/is-function' );
var builtin = require( './native.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var getProto;
if ( isFunction( Object.getPrototypeOf ) ) {
	getProto = builtin;
} else {
	getProto = polyfill;
}


// EXPORTS //

module.exports = getProto;

},{"./native.js":309,"./polyfill.js":310,"@stdlib/assert/is-function":98}],307:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var getProto = require( './detect.js' );


// MAIN //

/**
* Returns the prototype of a provided object.
*
* @param {*} value - input value
* @returns {(Object|null)} prototype
*
* @example
* var proto = getPrototypeOf( {} );
* // returns {}
*/
function getPrototypeOf( value ) {
	if (
		value === null ||
		value === void 0
	) {
		return null;
	}
	// In order to ensure consistent ES5/ES6 behavior, cast input value to an object (strings, numbers, booleans); ES5 `Object.getPrototypeOf` throws when provided primitives and ES6 `Object.getPrototypeOf` casts:
	value = Object( value );

	return getProto( value );
}


// EXPORTS //

module.exports = getPrototypeOf;

},{"./detect.js":306}],308:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Return the prototype of a provided object.
*
* @module @stdlib/utils/get-prototype-of
*
* @example
* var getPrototype = require( '@stdlib/utils/get-prototype-of' );
*
* var proto = getPrototype( {} );
* // returns {}
*/

// MODULES //

var getPrototype = require( './get_prototype_of.js' );


// EXPORTS //

module.exports = getPrototype;

},{"./get_prototype_of.js":307}],309:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

var getProto = Object.getPrototypeOf;


// EXPORTS //

module.exports = getProto;

},{}],310:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var nativeClass = require( '@stdlib/utils/native-class' );
var getProto = require( './proto.js' );


// MAIN //

/**
* Returns the prototype of a provided object.
*
* @private
* @param {Object} obj - input object
* @returns {(Object|null)} prototype
*/
function getPrototypeOf( obj ) {
	var proto = getProto( obj );
	if ( proto || proto === null ) {
		return proto;
	}
	if ( nativeClass( obj.constructor ) === '[object Function]' ) {
		// May break if the constructor has been tampered with...
		return obj.constructor.prototype;
	}
	if ( obj instanceof Object ) {
		return Object.prototype;
	}
	// Return `null` for objects created via `Object.create( null )`. Also return `null` for cross-realm objects on browsers that lack `__proto__` support, such as IE < 11.
	return null;
}


// EXPORTS //

module.exports = getPrototypeOf;

},{"./proto.js":311,"@stdlib/utils/native-class":342}],311:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Returns the value of the `__proto__` property.
*
* @private
* @param {Object} obj - input object
* @returns {*} value of `__proto__` property
*/
function getProto( obj ) {
	// eslint-disable-next-line no-proto
	return obj.__proto__;
}


// EXPORTS //

module.exports = getProto;

},{}],312:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

/**
* Returns the global object using code generation.
*
* @private
* @returns {Object} global object
*/
function getGlobal() {
	return new Function( 'return this;' )(); // eslint-disable-line no-new-func
}


// EXPORTS //

module.exports = getGlobal;

},{}],313:[function(require,module,exports){
(function (global){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

var obj = ( typeof global === 'object' ) ? global : null;


// EXPORTS //

module.exports = obj;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],314:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Return the global object.
*
* @module @stdlib/utils/global
*
* @example
* var getGlobal = require( '@stdlib/utils/global' );
*
* var g = getGlobal();
* // returns {...}
*/

// MODULES //

var getGlobal = require( './main.js' );


// EXPORTS //

module.exports = getGlobal;

},{"./main.js":315}],315:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;
var getThis = require( './codegen.js' );
var Self = require( './self.js' );
var Win = require( './window.js' );
var Global = require( './global.js' );


// MAIN //

/**
* Returns the global object.
*
* ## Notes
*
* -   Using code generation is the **most** reliable way to resolve the global object; however, doing so is likely to violate content security policies (CSPs) in, e.g., Chrome Apps and elsewhere.
*
* @param {boolean} [codegen=false] - boolean indicating whether to use code generation to resolve the global object
* @throws {TypeError} must provide a boolean
* @throws {Error} unable to resolve global object
* @returns {Object} global object
*
* @example
* var g = getGlobal();
* // returns {...}
*/
function getGlobal( codegen ) {
	if ( arguments.length ) {
		if ( !isBoolean( codegen ) ) {
			throw new TypeError( 'invalid argument. Must provide a boolean primitive. Value: `'+codegen+'`.' );
		}
		if ( codegen ) {
			return getThis();
		}
		// Fall through...
	}
	// Case: browsers and web workers
	if ( Self ) {
		return Self;
	}
	// Case: browsers
	if ( Win ) {
		return Win;
	}
	// Case: Node.js
	if ( Global ) {
		return Global;
	}
	// Case: unknown
	throw new Error( 'unexpected error. Unable to resolve global object.' );
}


// EXPORTS //

module.exports = getGlobal;

},{"./codegen.js":312,"./global.js":313,"./self.js":316,"./window.js":317,"@stdlib/assert/is-boolean":77}],316:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

var obj = ( typeof self === 'object' ) ? self : null;


// EXPORTS //

module.exports = obj;

},{}],317:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

var obj = ( typeof window === 'object' ) ? window : null;


// EXPORTS //

module.exports = obj;

},{}],318:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Return the first index at which a given element can be found.
*
* @module @stdlib/utils/index-of
*
* @example
* var indexOf = require( '@stdlib/utils/index-of' );
*
* var arr = [ 4, 3, 2, 1 ];
* var idx = indexOf( arr, 3 );
* // returns 1
*
* arr = [ 4, 3, 2, 1 ];
* idx = indexOf( arr, 5 );
* // returns -1
*
* // Using a `fromIndex`:
* arr = [ 1, 2, 3, 4, 5, 2, 6 ];
* idx = indexOf( arr, 2, 3 );
* // returns 5
*
* // `fromIndex` which exceeds `array` length:
* arr = [ 1, 2, 3, 4, 2, 5 ];
* idx = indexOf( arr, 2, 10 );
* // returns -1
*
* // Negative `fromIndex`:
* arr = [ 1, 2, 3, 4, 5, 2, 6, 2 ];
* idx = indexOf( arr, 2, -4 );
* // returns 5
*
* idx = indexOf( arr, 2, -1 );
* // returns 7
*
* // Negative `fromIndex` exceeding input `array` length:
* arr = [ 1, 2, 3, 4, 5, 2, 6 ];
* idx = indexOf( arr, 2, -10 );
* // returns 1
*
* // Array-like objects:
* var str = 'bebop';
* idx = indexOf( str, 'o' );
* // returns 3
*/

// MODULES //

var indexOf = require( './index_of.js' );


// EXPORTS //

module.exports = indexOf;

},{"./index_of.js":319}],319:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isnan = require( '@stdlib/assert/is-nan' );
var isCollection = require( '@stdlib/assert/is-collection' );
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var isInteger = require( '@stdlib/assert/is-integer' ).isPrimitive;


// MAIN //

/**
* Returns the first index at which a given element can be found.
*
* @param {ArrayLike} arr - array-like object
* @param {*} searchElement - element to find
* @param {integer} [fromIndex] - starting index (if negative, the start index is determined relative to last element)
* @throws {TypeError} must provide an array-like object
* @throws {TypeError} `fromIndex` must be an integer
* @returns {integer} index or -1
*
* @example
* var arr = [ 4, 3, 2, 1 ];
* var idx = indexOf( arr, 3 );
* // returns 1
*
* @example
* var arr = [ 4, 3, 2, 1 ];
* var idx = indexOf( arr, 5 );
* // returns -1
*
* @example
* // Using a `fromIndex`:
* var arr = [ 1, 2, 3, 4, 5, 2, 6 ];
* var idx = indexOf( arr, 2, 3 );
* // returns 5
*
* @example
* // `fromIndex` which exceeds `array` length:
* var arr = [ 1, 2, 3, 4, 2, 5 ];
* var idx = indexOf( arr, 2, 10 );
* // returns -1
*
* @example
* // Negative `fromIndex`:
* var arr = [ 1, 2, 3, 4, 5, 2, 6, 2 ];
* var idx = indexOf( arr, 2, -4 );
* // returns 5
*
* idx = indexOf( arr, 2, -1 );
* // returns 7
*
* @example
* // Negative `fromIndex` exceeding input `array` length:
* var arr = [ 1, 2, 3, 4, 5, 2, 6 ];
* var idx = indexOf( arr, 2, -10 );
* // returns 1
*
* @example
* // Array-like objects:
* var str = 'bebop';
* var idx = indexOf( str, 'o' );
* // returns 3
*/
function indexOf( arr, searchElement, fromIndex ) {
	var len;
	var i;
	if ( !isCollection( arr ) && !isString( arr ) ) {
		throw new TypeError( 'invalid argument. First argument must be an array-like object. Value: `' + arr + '`.' );
	}
	len = arr.length;
	if ( len === 0 ) {
		return -1;
	}
	if ( arguments.length === 3 ) {
		if ( !isInteger( fromIndex ) ) {
			throw new TypeError( 'invalid argument. `fromIndex` must be an integer. Value: `' + fromIndex + '`.' );
		}
		if ( fromIndex >= 0 ) {
			if ( fromIndex >= len ) {
				return -1;
			}
			i = fromIndex;
		} else {
			i = len + fromIndex;
			if ( i < 0 ) {
				i = 0;
			}
		}
	} else {
		i = 0;
	}
	// Check for `NaN`...
	if ( isnan( searchElement ) ) {
		for ( ; i < len; i++ ) {
			if ( isnan( arr[i] ) ) {
				return i;
			}
		}
	} else {
		for ( ; i < len; i++ ) {
			if ( arr[ i ] === searchElement ) {
				return i;
			}
		}
	}
	return -1;
}


// EXPORTS //

module.exports = indexOf;

},{"@stdlib/assert/is-collection":86,"@stdlib/assert/is-integer":106,"@stdlib/assert/is-nan":114,"@stdlib/assert/is-string":154}],320:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var builtin = require( './native.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var createObject;
if ( typeof builtin === 'function' ) {
	createObject = builtin;
} else {
	createObject = polyfill;
}


// EXPORTS //

module.exports = createObject;

},{"./native.js":323,"./polyfill.js":324}],321:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Implement prototypical inheritance by replacing the prototype of one constructor with the prototype of another constructor.
*
* @module @stdlib/utils/inherit
*
* @example
* var inherit = require( '@stdlib/utils/inherit' );
*
* function Foo() {
*     return this;
* }
* Foo.prototype.beep = function beep() {
*     return 'boop';
* };
*
* function Bar() {
*     Foo.call( this );
*     return this;
* }
* inherit( Bar, Foo );
*
* var bar = new Bar();
* var v = bar.beep();
* // returns 'boop'
*/

// MODULES //

var inherit = require( './inherit.js' );


// EXPORTS //

module.exports = inherit;

},{"./inherit.js":322}],322:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var defineProperty = require( '@stdlib/utils/define-property' );
var validate = require( './validate.js' );
var createObject = require( './detect.js' );


// MAIN //

/**
* Implements prototypical inheritance by replacing the prototype of one constructor with the prototype of another constructor.
*
* ## Notes
*
* -   This implementation is not designed to work with ES2015/ES6 classes. For ES2015/ES6 classes, use `class` with `extends`.
* -   For reference, see [node#3455](https://github.com/nodejs/node/pull/3455), [node#4179](https://github.com/nodejs/node/issues/4179), [node#3452](https://github.com/nodejs/node/issues/3452), and [node commit](https://github.com/nodejs/node/commit/29da8cf8d7ab8f66b9091ab22664067d4468461e#diff-3deb3f32958bb937ae05c6f3e4abbdf5).
*
*
* @param {(Object|Function)} ctor - constructor which will inherit
* @param {(Object|Function)} superCtor - super (parent) constructor
* @throws {TypeError} first argument must be either an object or a function which can inherit
* @throws {TypeError} second argument must be either an object or a function from which a constructor can inherit
* @throws {TypeError} second argument must have an inheritable prototype
* @returns {(Object|Function)} child constructor
*
* @example
* function Foo() {
*     return this;
* }
* Foo.prototype.beep = function beep() {
*     return 'boop';
* };
*
* function Bar() {
*     Foo.call( this );
*     return this;
* }
* inherit( Bar, Foo );
*
* var bar = new Bar();
* var v = bar.beep();
* // returns 'boop'
*/
function inherit( ctor, superCtor ) {
	var err = validate( ctor );
	if ( err ) {
		throw err;
	}
	err = validate( superCtor );
	if ( err ) {
		throw err;
	}
	if ( typeof superCtor.prototype === 'undefined' ) {
		throw new TypeError( 'invalid argument. Second argument must have a prototype from which another object can inherit. Value: `'+superCtor.prototype+'`.' );
	}
	// Create a prototype which inherits from the parent prototype:
	ctor.prototype = createObject( superCtor.prototype );

	// Set the constructor to refer to the child constructor:
	defineProperty( ctor.prototype, 'constructor', {
		'configurable': true,
		'enumerable': false,
		'writable': true,
		'value': ctor
	});

	return ctor;
}


// EXPORTS //

module.exports = inherit;

},{"./detect.js":320,"./validate.js":325,"@stdlib/utils/define-property":302}],323:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// EXPORTS //

module.exports = Object.create;

},{}],324:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// FUNCTIONS //

/**
* Dummy constructor.
*
* @private
*/
function Ctor() {
	// Empty...
}


// MAIN //

/**
* An `Object.create` shim for older JavaScript engines.
*
* @private
* @param {Object} proto - prototype
* @returns {Object} created object
*
* @example
* var obj = createObject( Object.prototype );
* // returns {}
*/
function createObject( proto ) {
	Ctor.prototype = proto;
	return new Ctor();
}


// EXPORTS //

module.exports = createObject;

},{}],325:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Tests that a value is a valid constructor.
*
* @private
* @param {*} value - value to test
* @returns {(Error|null)} error object or null
*
* @example
* var ctor = function ctor() {};
*
* var err = validate( ctor );
* // returns null
*
* err = validate( null );
* // returns <TypeError>
*/
function validate( value ) {
	var type = typeof value;
	if (
		value === null ||
		(type !== 'object' && type !== 'function')
	) {
		return new TypeError( 'invalid argument. A provided constructor must be either an object (except null) or a function. Value: `'+value+'`.' );
	}
	return null;
}


// EXPORTS //

module.exports = validate;

},{}],326:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

/**
* Returns an array of an object's own enumerable property names.
*
* ## Notes
*
* -   In contrast to the built-in `Object.keys()`, this function returns an empty array if provided `undefined` or `null`, rather than throwing an error.
*
* @private
* @param {*} value - input object
* @returns {Array} a list of own enumerable property names
*
* @example
* var obj = {
*     'beep': 'boop',
*     'foo': 3.14
* };
*
* var k = keys( obj );
* // e.g., returns [ 'beep', 'foo' ]
*/
function keys( value ) {
	return Object.keys( Object( value ) );
}


// EXPORTS //

module.exports = keys;

},{}],327:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isArguments = require( '@stdlib/assert/is-arguments' );
var builtin = require( './builtin.js' );


// VARIABLES //

var slice = Array.prototype.slice;


// MAIN //

/**
* Returns an array of an object's own enumerable property names.
*
* @private
* @param {*} value - input object
* @returns {Array} a list of own enumerable property names
*
* @example
* var obj = {
*     'beep': 'boop',
*     'foo': 3.14
* };
*
* var k = keys( obj );
* // e.g., returns [ 'beep', 'foo' ]
*/
function keys( value ) {
	if ( isArguments( value ) ) {
		return builtin( slice.call( value ) );
	}
	return builtin( value );
}


// EXPORTS //

module.exports = keys;

},{"./builtin.js":326,"@stdlib/assert/is-arguments":70}],328:[function(require,module,exports){
module.exports=[
	"console",
	"external",
	"frame",
	"frameElement",
	"frames",
	"innerHeight",
	"innerWidth",
	"outerHeight",
	"outerWidth",
	"pageXOffset",
	"pageYOffset",
	"parent",
	"scrollLeft",
	"scrollTop",
	"scrollX",
	"scrollY",
	"self",
	"webkitIndexedDB",
	"webkitStorageInfo",
	"window"
]

},{}],329:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var keys = require( './builtin.js' );


// FUNCTIONS //

/**
* Tests the built-in `Object.keys()` implementation when provided `arguments`.
*
* @private
* @returns {boolean} boolean indicating whether the built-in implementation returns the expected number of keys
*/
function test() {
	return ( keys( arguments ) || '' ).length !== 2;
}


// MAIN //

/**
* Tests whether the built-in `Object.keys()` implementation supports providing `arguments` as an input value.
*
* ## Notes
*
* -   Safari 5.0 does **not** support `arguments` as an input value.
*
* @private
* @returns {boolean} boolean indicating whether a built-in implementation supports `arguments`
*/
function check() {
	return test( 1, 2 );
}


// EXPORTS //

module.exports = check;

},{"./builtin.js":326}],330:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var indexOf = require( '@stdlib/utils/index-of' );
var typeOf = require( '@stdlib/utils/type-of' );
var isConstructorPrototype = require( './is_constructor_prototype.js' );
var EXCLUDED_KEYS = require( './excluded_keys.json' );
var win = require( './window.js' );


// VARIABLES //

var bool;


// FUNCTIONS //

/**
* Determines whether an environment throws when comparing to the prototype of a value's constructor (e.g., [IE9][1]).
*
* [1]: https://stackoverflow.com/questions/7688070/why-is-comparing-the-constructor-property-of-two-windows-unreliable
*
* @private
* @returns {boolean} boolean indicating whether an environment is buggy
*/
function check() {
	var k;
	if ( typeOf( win ) === 'undefined' ) {
		return false;
	}
	for ( k in win ) { // eslint-disable-line guard-for-in
		try {
			if (
				indexOf( EXCLUDED_KEYS, k ) === -1 &&
				hasOwnProp( win, k ) &&
				win[ k ] !== null &&
				typeOf( win[ k ] ) === 'object'
			) {
				isConstructorPrototype( win[ k ] );
			}
		} catch ( err ) { // eslint-disable-line no-unused-vars
			return true;
		}
	}
	return false;
}


// MAIN //

bool = check();


// EXPORTS //

module.exports = bool;

},{"./excluded_keys.json":328,"./is_constructor_prototype.js":336,"./window.js":341,"@stdlib/assert/has-own-property":49,"@stdlib/utils/index-of":318,"@stdlib/utils/type-of":367}],331:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

var bool = ( typeof Object.keys !== 'undefined' );


// EXPORTS //

module.exports = bool;

},{}],332:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isEnumerableProperty = require( '@stdlib/assert/is-enumerable-property' );
var noop = require( '@stdlib/utils/noop' );


// MAIN //

// Note: certain environments treat an object's prototype as enumerable, which, as a matter of convention, it shouldn't be...
var bool = isEnumerableProperty( noop, 'prototype' );


// EXPORTS //

module.exports = bool;

},{"@stdlib/assert/is-enumerable-property":89,"@stdlib/utils/noop":347}],333:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isEnumerableProperty = require( '@stdlib/assert/is-enumerable-property' );


// VARIABLES //

var obj = {
	'toString': null
};


// MAIN //

// Note: certain environments don't allow enumeration of overwritten properties which are considered non-enumerable...
var bool = !isEnumerableProperty( obj, 'toString' );


// EXPORTS //

module.exports = bool;

},{"@stdlib/assert/is-enumerable-property":89}],334:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

var bool = ( typeof window !== 'undefined' );


// EXPORTS //

module.exports = bool;

},{}],335:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Return an array of an object's own enumerable property names.
*
* @module @stdlib/utils/keys
*
* @example
* var keys = require( '@stdlib/utils/keys' );
*
* var obj = {
*     'beep': 'boop',
*     'foo': 3.14
* };
*
* var k = keys( obj );
* // e.g., returns [ 'beep', 'foo' ]
*/

// MODULES //

var keys = require( './main.js' );


// EXPORTS //

module.exports = keys;

},{"./main.js":338}],336:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

/**
* Tests whether a value equals the prototype of its constructor.
*
* @private
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether a value equals the prototype of its constructor
*/
function isConstructorPrototype( value ) {
	return ( value.constructor && value.constructor.prototype === value );
}


// EXPORTS //

module.exports = isConstructorPrototype;

},{}],337:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var hasAutomationEqualityBug = require( './has_automation_equality_bug.js' );
var isConstructorPrototype = require( './is_constructor_prototype.js' );
var HAS_WINDOW = require( './has_window.js' );


// MAIN //

/**
* Wraps the test for constructor prototype equality to accommodate buggy environments (e.g., environments which throw when testing equality).
*
* @private
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether a value equals the prototype of its constructor
*/
function wrapper( value ) {
	if ( HAS_WINDOW === false && !hasAutomationEqualityBug ) {
		return isConstructorPrototype( value );
	}
	try {
		return isConstructorPrototype( value );
	} catch ( error ) { // eslint-disable-line no-unused-vars
		return false;
	}
}


// EXPORTS //

module.exports = wrapper;

},{"./has_automation_equality_bug.js":330,"./has_window.js":334,"./is_constructor_prototype.js":336}],338:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var hasArgumentsBug = require( './has_arguments_bug.js' );
var HAS_BUILTIN = require( './has_builtin.js' );
var builtin = require( './builtin.js' );
var wrapper = require( './builtin_wrapper.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

/**
* Returns an array of an object's own enumerable property names.
*
* @name keys
* @type {Function}
* @param {*} value - input object
* @returns {Array} a list of own enumerable property names
*
* @example
* var obj = {
*     'beep': 'boop',
*     'foo': 3.14
* };
*
* var k = keys( obj );
* // e.g., returns [ 'beep', 'foo' ]
*/
var keys;
if ( HAS_BUILTIN ) {
	if ( hasArgumentsBug() ) {
		keys = wrapper;
	} else {
		keys = builtin;
	}
} else {
	keys = polyfill;
}


// EXPORTS //

module.exports = keys;

},{"./builtin.js":326,"./builtin_wrapper.js":327,"./has_arguments_bug.js":329,"./has_builtin.js":331,"./polyfill.js":340}],339:[function(require,module,exports){
module.exports=[
	"toString",
	"toLocaleString",
	"valueOf",
	"hasOwnProperty",
	"isPrototypeOf",
	"propertyIsEnumerable",
	"constructor"
]

},{}],340:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isObjectLike = require( '@stdlib/assert/is-object-like' );
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var isArguments = require( '@stdlib/assert/is-arguments' );
var HAS_ENUM_PROTO_BUG = require( './has_enumerable_prototype_bug.js' );
var HAS_NON_ENUM_PROPS_BUG = require( './has_non_enumerable_properties_bug.js' );
var isConstructorPrototype = require( './is_constructor_prototype_wrapper.js' );
var NON_ENUMERABLE = require( './non_enumerable.json' );


// MAIN //

/**
* Returns an array of an object's own enumerable property names.
*
* @private
* @param {*} value - input object
* @returns {Array} a list of own enumerable property names
*
* @example
* var obj = {
*     'beep': 'boop',
*     'foo': 3.14
* };
*
* var k = keys( obj );
* // e.g., returns [ 'beep', 'foo' ]
*/
function keys( value ) {
	var skipConstructor;
	var skipPrototype;
	var isFcn;
	var out;
	var k;
	var p;
	var i;

	out = [];
	if ( isArguments( value ) ) {
		// Account for environments which treat `arguments` differently...
		for ( i = 0; i < value.length; i++ ) {
			out.push( i.toString() );
		}
		// Note: yes, we are precluding the `arguments` array-like object from having other enumerable properties; however, this should (1) be very rare and (2) not be encouraged (e.g., doing something like `arguments.a = 'b'`; in certain engines directly manipulating the `arguments` value results in automatic de-optimization).
		return out;
	}
	if ( typeof value === 'string' ) {
		// Account for environments which do not treat string character indices as "own" properties...
		if ( value.length > 0 && !hasOwnProp( value, '0' ) ) {
			for ( i = 0; i < value.length; i++ ) {
				out.push( i.toString() );
			}
		}
	} else {
		isFcn = ( typeof value === 'function' );
		if ( isFcn === false && !isObjectLike( value ) ) {
			return out;
		}
		skipPrototype = ( HAS_ENUM_PROTO_BUG && isFcn );
	}
	for ( k in value ) {
		if ( !( skipPrototype && k === 'prototype' ) && hasOwnProp( value, k ) ) {
			out.push( String( k ) );
		}
	}
	if ( HAS_NON_ENUM_PROPS_BUG ) {
		skipConstructor = isConstructorPrototype( value );
		for ( i = 0; i < NON_ENUMERABLE.length; i++ ) {
			p = NON_ENUMERABLE[ i ];
			if ( !( skipConstructor && p === 'constructor' ) && hasOwnProp( value, p ) ) {
				out.push( String( p ) );
			}
		}
	}
	return out;
}


// EXPORTS //

module.exports = keys;

},{"./has_enumerable_prototype_bug.js":332,"./has_non_enumerable_properties_bug.js":333,"./is_constructor_prototype_wrapper.js":337,"./non_enumerable.json":339,"@stdlib/assert/has-own-property":49,"@stdlib/assert/is-arguments":70,"@stdlib/assert/is-object-like":139}],341:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

var w = ( typeof window === 'undefined' ) ? void 0 : window;


// EXPORTS //

module.exports = w;

},{}],342:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Return a string value indicating a specification defined classification of an object.
*
* @module @stdlib/utils/native-class
*
* @example
* var nativeClass = require( '@stdlib/utils/native-class' );
*
* var str = nativeClass( 'a' );
* // returns '[object String]'
*
* str = nativeClass( 5 );
* // returns '[object Number]'
*
* function Beep() {
*     return this;
* }
* str = nativeClass( new Beep() );
* // returns '[object Object]'
*/

// MODULES //

var hasToStringTag = require( '@stdlib/assert/has-tostringtag-support' );
var builtin = require( './native_class.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var nativeClass;
if ( hasToStringTag() ) {
	nativeClass = polyfill;
} else {
	nativeClass = builtin;
}


// EXPORTS //

module.exports = nativeClass;

},{"./native_class.js":343,"./polyfill.js":344,"@stdlib/assert/has-tostringtag-support":55}],343:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var toStr = require( './tostring.js' );


// MAIN //

/**
* Returns a string value indicating a specification defined classification (via the internal property `[[Class]]`) of an object.
*
* @param {*} v - input value
* @returns {string} string value indicating a specification defined classification of the input value
*
* @example
* var str = nativeClass( 'a' );
* // returns '[object String]'
*
* @example
* var str = nativeClass( 5 );
* // returns '[object Number]'
*
* @example
* function Beep() {
*     return this;
* }
* var str = nativeClass( new Beep() );
* // returns '[object Object]'
*/
function nativeClass( v ) {
	return toStr.call( v );
}


// EXPORTS //

module.exports = nativeClass;

},{"./tostring.js":345}],344:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var toStringTag = require( './tostringtag.js' );
var toStr = require( './tostring.js' );


// MAIN //

/**
* Returns a string value indicating a specification defined classification of an object in environments supporting `Symbol.toStringTag`.
*
* @param {*} v - input value
* @returns {string} string value indicating a specification defined classification of the input value
*
* @example
* var str = nativeClass( 'a' );
* // returns '[object String]'
*
* @example
* var str = nativeClass( 5 );
* // returns '[object Number]'
*
* @example
* function Beep() {
*     return this;
* }
* var str = nativeClass( new Beep() );
* // returns '[object Object]'
*/
function nativeClass( v ) {
	var isOwn;
	var tag;
	var out;

	if ( v === null || v === void 0 ) {
		return toStr.call( v );
	}
	tag = v[ toStringTag ];
	isOwn = hasOwnProp( v, toStringTag );

	// Attempt to override the `toStringTag` property. For built-ins having a `Symbol.toStringTag` property (e.g., `JSON`, `Math`, etc), the `Symbol.toStringTag` property is read-only (e.g., , so we need to wrap in a `try/catch`.
	try {
		v[ toStringTag ] = void 0;
	} catch ( err ) { // eslint-disable-line no-unused-vars
		return toStr.call( v );
	}
	out = toStr.call( v );

	if ( isOwn ) {
		v[ toStringTag ] = tag;
	} else {
		delete v[ toStringTag ];
	}
	return out;
}


// EXPORTS //

module.exports = nativeClass;

},{"./tostring.js":345,"./tostringtag.js":346,"@stdlib/assert/has-own-property":49}],345:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

var toStr = Object.prototype.toString;


// EXPORTS //

module.exports = toStr;

},{}],346:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{}],347:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* No operation.
*
* @module @stdlib/utils/noop
*
* @example
* var noop = require( '@stdlib/utils/noop' );
*
* noop();
* // ...does nothing.
*/

// MODULES //

var noop = require( './noop.js' );


// EXPORTS //

module.exports = noop;

},{"./noop.js":348}],348:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* No operation.
*
* @example
* noop();
* // ...does nothing.
*/
function noop() {
	// Empty function...
}


// EXPORTS //

module.exports = noop;

},{}],349:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Return a partial object copy excluding specified keys.
*
* @module @stdlib/utils/omit
*
* @example
* var omit = require( '@stdlib/utils/omit' );
*
* var obj1 = {
*     'a': 1,
*     'b': 2
* };
*
* var obj2 = omit( obj1, 'b' );
* // returns { 'a': 1 }
*/

// MODULES //

var omit = require( './omit.js' );


// EXPORTS //

module.exports = omit;

},{"./omit.js":350}],350:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var objectKeys = require( '@stdlib/utils/keys' );
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var isStringArray = require( '@stdlib/assert/is-string-array' ).primitives;
var indexOf = require( '@stdlib/utils/index-of' );


// MAIN //

/**
* Returns a partial object copy excluding specified keys.
*
* @param {Object} obj - source object
* @param {(string|StringArray)} keys - keys to exclude
* @throws {TypeError} first argument must be an object
* @throws {TypeError} second argument must be either a string or an array of strings
* @returns {Object} new object
*
* @example
* var obj1 = {
*     'a': 1,
*     'b': 2
* };
*
* var obj2 = omit( obj1, 'b' );
* // returns { 'a': 1 }
*/
function omit( obj, keys ) {
	var ownKeys;
	var out;
	var key;
	var i;
	if ( typeof obj !== 'object' || obj === null ) {
		throw new TypeError( 'invalid argument. First argument must be an object. Value: `'+obj+'`.' );
	}
	ownKeys = objectKeys( obj );
	out = {};
	if ( isString( keys ) ) {
		for ( i = 0; i < ownKeys.length; i++ ) {
			key = ownKeys[ i ];
			if ( key !== keys ) {
				out[ key ] = obj[ key ];
			}
		}
		return out;
	}
	if ( isStringArray( keys ) ) {
		for ( i = 0; i < ownKeys.length; i++ ) {
			key = ownKeys[ i ];
			if ( indexOf( keys, key ) === -1 ) {
				out[ key ] = obj[ key ];
			}
		}
		return out;
	}
	throw new TypeError( 'invalid argument. Second argument must be either a string primitive or an array of string primitives. Value: `'+keys+'`.' );
}


// EXPORTS //

module.exports = omit;

},{"@stdlib/assert/is-string":154,"@stdlib/assert/is-string-array":153,"@stdlib/utils/index-of":318,"@stdlib/utils/keys":335}],351:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Return a partial object copy containing only specified keys.
*
* @module @stdlib/utils/pick
*
* @example
* var pick = require( '@stdlib/utils/pick' );
*
* var obj1 = {
*     'a': 1,
*     'b': 2
* };
*
* var obj2 = pick( obj1, 'b' );
* // returns { 'b': 2 }
*/

// MODULES //

var pick = require( './pick.js' );


// EXPORTS //

module.exports = pick;

},{"./pick.js":352}],352:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var isStringArray = require( '@stdlib/assert/is-string-array' ).primitives;
var hasOwnProp = require( '@stdlib/assert/has-own-property' );


// MAIN //

/**
* Returns a partial object copy containing only specified keys. If a key does not exist as an own property in a source object, the key is ignored.
*
* @param {Object} obj - source object
* @param {(string|StringArray)} keys - keys to copy
* @throws {TypeError} first argument must be an object
* @throws {TypeError} second argument must be either a string or an array of strings
* @returns {Object} new object
*
* @example
* var obj1 = {
*     'a': 1,
*     'b': 2
* };
*
* var obj2 = pick( obj1, 'b' );
* // returns { 'b': 2 }
*/
function pick( obj, keys ) {
	var out;
	var key;
	var i;
	if ( typeof obj !== 'object' || obj === null ) {
		throw new TypeError( 'invalid argument. First argument must be an object. Value: `'+obj+'`.' );
	}
	out = {};
	if ( isString( keys ) ) {
		if ( hasOwnProp( obj, keys ) ) {
			out[ keys ] = obj[ keys ];
		}
		return out;
	}
	if ( isStringArray( keys ) ) {
		for ( i = 0; i < keys.length; i++ ) {
			key = keys[ i ];
			if ( hasOwnProp( obj, key ) ) {
				out[ key ] = obj[ key ];
			}
		}
		return out;
	}
	throw new TypeError( 'invalid argument. Second argument must be either a string primitive or an array of string primitives. Value: `'+keys+'`.' );
}


// EXPORTS //

module.exports = pick;

},{"@stdlib/assert/has-own-property":49,"@stdlib/assert/is-string":154,"@stdlib/assert/is-string-array":153}],353:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// VARIABLES //

var propertyDescriptor = Object.getOwnPropertyDescriptor;


// MAIN //

/**
* Returns a property descriptor for an object's own property.
*
* ## Notes
*
* -   In contrast to the built-in `Object.getOwnPropertyDescriptor()`, this function returns `null` if provided `undefined` or `null`, rather than throwing an error.
* -   In contrast to the built-in `Object.getOwnPropertyDescriptor()`, this function returns `null` if an object does not have a provided property, rather than `undefined`.
*
* @private
* @param {*} value - input object
* @param {(string|symbol)} property - property
* @returns {(Object|null)} property descriptor or null
*
* @example
* var obj = {
*     'beep': 'boop',
*     'foo': 3.14
* };
*
* var desc = getOwnPropertyDescriptor( obj, 'foo' );
* // returns {'configurable':true,'enumerable':true,'writable':true,'value':3.14}
*/
function getOwnPropertyDescriptor( value, property ) {
	var desc;
	if ( value === null || value === void 0 ) {
		return null;
	}
	desc = propertyDescriptor( value, property );
	return ( desc === void 0 ) ? null : desc;
}


// EXPORTS //

module.exports = getOwnPropertyDescriptor;

},{}],354:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

var bool = ( typeof Object.getOwnPropertyDescriptor !== 'undefined' );


// EXPORTS //

module.exports = bool;

},{}],355:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Return a property descriptor for an object's own property.
*
* @module @stdlib/utils/property-descriptor
*
* @example
* var getOwnPropertyDescriptor = require( '@stdlib/utils/property-descriptor' );
*
* var obj = {
*   'foo': 'bar',
*   'beep': 'boop'
* };
*
* var keys = getOwnPropertyDescriptor( obj, 'foo' );
* // returns {'configurable':true,'enumerable':true,'writable':true,'value':'bar'}
*/

// MODULES //

var HAS_BUILTIN = require( './has_builtin.js' );
var builtin = require( './builtin.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var main;
if ( HAS_BUILTIN ) {
	main = builtin;
} else {
	main = polyfill;
}


// EXPORTS //

module.exports = main;

},{"./builtin.js":353,"./has_builtin.js":354,"./polyfill.js":356}],356:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var hasOwnProp = require( '@stdlib/assert/has-own-property' );


// MAIN //

/**
* Returns a property descriptor for an object's own property.
*
* ## Notes
*
* -   In contrast to the built-in `Object.getOwnPropertyDescriptor()`, this function returns `null` if provided `undefined` or `null`, rather than throwing an error.
* -   In contrast to the built-in `Object.getOwnPropertyDescriptor()`, this function returns `null` if an object does not have a provided property, rather than `undefined`.
* -   In environments lacking `Object.getOwnPropertyDescriptor()` support, property descriptors do not exist. In non-supporting environment, if an object has a provided property, this function returns a descriptor object equivalent to that returned in a supporting environment; otherwise, the function returns `null`.
*
* @private
* @param {*} value - input object
* @param {(string|symbol)} property - property
* @returns {(Object|null)} property descriptor or null
*
* @example
* var obj = {
*     'beep': 'boop',
*     'foo': 3.14
* };
*
* var desc = getOwnPropertyDescriptor( obj, 'foo' );
* // returns {'configurable':true,'enumerable':true,'writable':true,'value':3.14}
*/
function getOwnPropertyDescriptor( value, property ) {
	if ( hasOwnProp( value, property ) ) {
		return {
			'configurable': true,
			'enumerable': true,
			'writable': true,
			'value': value[ property ]
		};
	}
	return null;
}


// EXPORTS //

module.exports = getOwnPropertyDescriptor;

},{"@stdlib/assert/has-own-property":49}],357:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// VARIABLES //

var propertyNames = Object.getOwnPropertyNames;


// MAIN //

/**
* Returns an array of an object's own enumerable and non-enumerable property names.
*
* ## Notes
*
* -   In contrast to the built-in `Object.getOwnPropertyNames()`, this function returns an empty array if provided `undefined` or `null`, rather than throwing an error.
*
* @private
* @param {*} value - input object
* @returns {Array} a list of own property names
*
* @example
* var obj = {
*     'beep': 'boop',
*     'foo': 3.14
* };
*
* var keys = getOwnPropertyNames( obj );
* // e.g., returns [ 'beep', 'foo' ]
*/
function getOwnPropertyNames( value ) {
	return propertyNames( Object( value ) );
}


// EXPORTS //

module.exports = getOwnPropertyNames;

},{}],358:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MAIN //

var bool = ( typeof Object.getOwnPropertyNames !== 'undefined' );


// EXPORTS //

module.exports = bool;

},{}],359:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Return an array of an object's own enumerable and non-enumerable property names.
*
* @module @stdlib/utils/property-names
*
* @example
* var getOwnPropertyNames = require( '@stdlib/utils/property-names' );
*
* var keys = getOwnPropertyNames({
*   'foo': 'bar',
*   'beep': 'boop'
* });
* // e.g., returns [ 'foo', 'beep' ]
*/

// MODULES //

var HAS_BUILTIN = require( './has_builtin.js' );
var builtin = require( './builtin.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var main;
if ( HAS_BUILTIN ) {
	main = builtin;
} else {
	main = polyfill;
}


// EXPORTS //

module.exports = main;

},{"./builtin.js":357,"./has_builtin.js":358,"./polyfill.js":360}],360:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var keys = require( '@stdlib/utils/keys' );


// MAIN //

/**
* Returns an array of an object's own enumerable and non-enumerable property names.
*
* ## Notes
*
* -   In contrast to the built-in `Object.getOwnPropertyNames()`, this function returns an empty array if provided `undefined` or `null`, rather than throwing an error.
* -   In environments lacking support for `Object.getOwnPropertyNames()`, property descriptors are unavailable, and thus all properties can be safely assumed to be enumerable. Hence, we can defer to calling `Object.keys`, which retrieves all own enumerable property names.
*
* @private
* @param {*} value - input object
* @returns {Array} a list of own property names
*
* @example
* var obj = {
*     'beep': 'boop',
*     'foo': 3.14
* };
*
* var keys = getOwnPropertyNames( obj );
* // e.g., returns [ 'beep', 'foo' ]
*/
function getOwnPropertyNames( value ) {
	return keys( Object( value ) );
}


// EXPORTS //

module.exports = getOwnPropertyNames;

},{"@stdlib/utils/keys":335}],361:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var RE = require( '@stdlib/regexp/regexp' );


// MAIN //

/**
* Parses a regular expression string and returns a new regular expression.
*
* @param {string} str - regular expression string
* @throws {TypeError} must provide a regular expression string
* @returns {(RegExp|null)} regular expression or null
*
* @example
* var re = reFromString( '/beep/' );
* // returns /beep/
*/
function reFromString( str ) {
	if ( !isString( str ) ) {
		throw new TypeError( 'invalid argument. Must provide a regular expression string. Value: `' + str + '`.' );
	}
	// Capture the regular expression pattern and any flags:
	str = RE.exec( str );

	// Create a new regular expression:
	return ( str ) ? new RegExp( str[1], str[2] ) : null;
}


// EXPORTS //

module.exports = reFromString;

},{"@stdlib/assert/is-string":154,"@stdlib/regexp/regexp":269}],362:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Create a regular expression from a regular expression string.
*
* @module @stdlib/utils/regexp-from-string
*
* @example
* var reFromString = require( '@stdlib/utils/regexp-from-string' );
*
* var re = reFromString( '/beep/' );
* // returns /beep/
*/

// MODULES //

var reFromString = require( './from_string.js' );


// EXPORTS //

module.exports = reFromString;

},{"./from_string.js":361}],363:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var RE = require( './fixtures/re.js' );
var nodeList = require( './fixtures/nodelist.js' );
var typedarray = require( './fixtures/typedarray.js' );


// MAIN //

/**
* Checks whether a polyfill is needed when using the `typeof` operator.
*
* @private
* @returns {boolean} boolean indicating whether a polyfill is needed
*/
function check() {
	if (
		// Chrome 1-12 returns 'function' for regular expression instances (see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof):
		typeof RE === 'function' ||

		// Safari 8 returns 'object' for typed array and weak map constructors (underscore #1929):
		typeof typedarray === 'object' ||

		// PhantomJS 1.9 returns 'function' for `NodeList` instances (underscore #2236):
		typeof nodeList === 'function'
	) {
		return true;
	}
	return false;
}


// EXPORTS //

module.exports = check;

},{"./fixtures/nodelist.js":364,"./fixtures/re.js":365,"./fixtures/typedarray.js":366}],364:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var getGlobal = require( '@stdlib/utils/global' );


// MAIN //

var root = getGlobal();
var nodeList = root.document && root.document.childNodes;


// EXPORTS //

module.exports = nodeList;

},{"@stdlib/utils/global":314}],365:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

var RE = /./;


// EXPORTS //

module.exports = RE;

},{}],366:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

var typedarray = Int8Array; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = typedarray;

},{}],367:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Determine a value's type.
*
* @module @stdlib/utils/type-of
*
* @example
* var typeOf = require( '@stdlib/utils/type-of' );
*
* var str = typeOf( 'a' );
* // returns 'string'
*
* str = typeOf( 5 );
* // returns 'number'
*/

// MODULES //

var usePolyfill = require( './check.js' );
var typeOf = require( './typeof.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var main = ( usePolyfill() ) ? polyfill : typeOf;


// EXPORTS //

module.exports = main;

},{"./check.js":363,"./polyfill.js":368,"./typeof.js":369}],368:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var ctorName = require( '@stdlib/utils/constructor-name' );


// MAIN //

/**
* Determines a value's type.
*
* @param {*} v - input value
* @returns {string} string indicating the value's type
*/
function typeOf( v ) {
	return ctorName( v ).toLowerCase();
}


// EXPORTS //

module.exports = typeOf;

},{"@stdlib/utils/constructor-name":291}],369:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var ctorName = require( '@stdlib/utils/constructor-name' );


// NOTES //

/*
* Built-in `typeof` operator behavior:
*
* ```text
* typeof null => 'object'
* typeof undefined => 'undefined'
* typeof 'a' => 'string'
* typeof 5 => 'number'
* typeof NaN => 'number'
* typeof true => 'boolean'
* typeof false => 'boolean'
* typeof {} => 'object'
* typeof [] => 'object'
* typeof function foo(){} => 'function'
* typeof function* foo(){} => 'object'
* typeof Symbol() => 'symbol'
* ```
*
*/


// MAIN //

/**
* Determines a value's type.
*
* @param {*} v - input value
* @returns {string} string indicating the value's type
*/
function typeOf( v ) {
	var type;

	// Address `typeof null` => `object` (see http://wiki.ecmascript.org/doku.php?id=harmony:typeof_null):
	if ( v === null ) {
		return 'null';
	}
	type = typeof v;

	// If the `typeof` operator returned something other than `object`, we are done. Otherwise, we need to check for an internal class name or search for a constructor.
	if ( type === 'object' ) {
		return ctorName( v ).toLowerCase();
	}
	return type;
}


// EXPORTS //

module.exports = typeOf;

},{"@stdlib/utils/constructor-name":291}],370:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],371:[function(require,module,exports){

},{}],372:[function(require,module,exports){
(function (Buffer){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var customInspectSymbol =
  (typeof Symbol === 'function' && typeof Symbol.for === 'function')
    ? Symbol.for('nodejs.util.inspect.custom')
    : null

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    var proto = { foo: function () { return 42 } }
    Object.setPrototypeOf(proto, Uint8Array.prototype)
    Object.setPrototypeOf(arr, proto)
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  Object.setPrototypeOf(buf, Buffer.prototype)
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species != null &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayLike(value)
  }

  if (value == null) {
    throw new TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  var valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  var b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(
      value[Symbol.toPrimitive]('string'), encodingOrOffset, length
    )
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype)
Object.setPrototypeOf(Buffer, Uint8Array)

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(buf, Buffer.prototype)

  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      buf = Buffer.from(buf)
    }
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  var len = string.length
  var mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}
if (customInspectSymbol) {
  Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  var strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
        : (firstByte > 0xBF) ? 2
          : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += hexSliceLookupTable[buf[i]]
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(newBuf, Buffer.prototype)

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (var i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  } else if (typeof val === 'boolean') {
    val = Number(val)
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    var len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

// Create lookup table for `toString('hex')`
// See: https://github.com/feross/buffer/issues/219
var hexSliceLookupTable = (function () {
  var alphabet = '0123456789abcdef'
  var table = new Array(256)
  for (var i = 0; i < 16; ++i) {
    var i16 = i * 16
    for (var j = 0; j < 16; ++j) {
      table[i16 + j] = alphabet[i] + alphabet[j]
    }
  }
  return table
})()

}).call(this,require("buffer").Buffer)
},{"base64-js":370,"buffer":372,"ieee754":377}],373:[function(require,module,exports){
(function (Buffer){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

}).call(this,{"isBuffer":require("../../insert-module-globals/node_modules/is-buffer/index.js")})
},{"../../insert-module-globals/node_modules/is-buffer/index.js":379}],374:[function(require,module,exports){
(function (process){
/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = require('./debug');
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}

}).call(this,require('_process'))
},{"./debug":375,"_process":383}],375:[function(require,module,exports){

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = require('ms');

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  return debug;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

},{"ms":381}],376:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var objectCreate = Object.create || objectCreatePolyfill
var objectKeys = Object.keys || objectKeysPolyfill
var bind = Function.prototype.bind || functionBindPolyfill

function EventEmitter() {
  if (!this._events || !Object.prototype.hasOwnProperty.call(this, '_events')) {
    this._events = objectCreate(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

var hasDefineProperty;
try {
  var o = {};
  if (Object.defineProperty) Object.defineProperty(o, 'x', { value: 0 });
  hasDefineProperty = o.x === 0;
} catch (err) { hasDefineProperty = false }
if (hasDefineProperty) {
  Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
    enumerable: true,
    get: function() {
      return defaultMaxListeners;
    },
    set: function(arg) {
      // check whether the input is a positive number (whose value is zero or
      // greater and not a NaN).
      if (typeof arg !== 'number' || arg < 0 || arg !== arg)
        throw new TypeError('"defaultMaxListeners" must be a positive number');
      defaultMaxListeners = arg;
    }
  });
} else {
  EventEmitter.defaultMaxListeners = defaultMaxListeners;
}

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || isNaN(n))
    throw new TypeError('"n" argument must be a positive number');
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

// These standalone emit* functions are used to optimize calling of event
// handlers for fast cases because emit() itself often has a variable number of
// arguments and can be deoptimized because of that. These functions always have
// the same number of arguments and thus do not get deoptimized, so the code
// inside them can execute faster.
function emitNone(handler, isFn, self) {
  if (isFn)
    handler.call(self);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self);
  }
}
function emitOne(handler, isFn, self, arg1) {
  if (isFn)
    handler.call(self, arg1);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1);
  }
}
function emitTwo(handler, isFn, self, arg1, arg2) {
  if (isFn)
    handler.call(self, arg1, arg2);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2);
  }
}
function emitThree(handler, isFn, self, arg1, arg2, arg3) {
  if (isFn)
    handler.call(self, arg1, arg2, arg3);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2, arg3);
  }
}

function emitMany(handler, isFn, self, args) {
  if (isFn)
    handler.apply(self, args);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].apply(self, args);
  }
}

EventEmitter.prototype.emit = function emit(type) {
  var er, handler, len, args, i, events;
  var doError = (type === 'error');

  events = this._events;
  if (events)
    doError = (doError && events.error == null);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    if (arguments.length > 1)
      er = arguments[1];
    if (er instanceof Error) {
      throw er; // Unhandled 'error' event
    } else {
      // At least give some kind of context to the user
      var err = new Error('Unhandled "error" event. (' + er + ')');
      err.context = er;
      throw err;
    }
    return false;
  }

  handler = events[type];

  if (!handler)
    return false;

  var isFn = typeof handler === 'function';
  len = arguments.length;
  switch (len) {
      // fast cases
    case 1:
      emitNone(handler, isFn, this);
      break;
    case 2:
      emitOne(handler, isFn, this, arguments[1]);
      break;
    case 3:
      emitTwo(handler, isFn, this, arguments[1], arguments[2]);
      break;
    case 4:
      emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
      break;
      // slower
    default:
      args = new Array(len - 1);
      for (i = 1; i < len; i++)
        args[i - 1] = arguments[i];
      emitMany(handler, isFn, this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');

  events = target._events;
  if (!events) {
    events = target._events = objectCreate(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener) {
      target.emit('newListener', type,
          listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (!existing) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
          prepend ? [listener, existing] : [existing, listener];
    } else {
      // If we've already got an array, just append.
      if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }
    }

    // Check for listener leak
    if (!existing.warned) {
      m = $getMaxListeners(target);
      if (m && m > 0 && existing.length > m) {
        existing.warned = true;
        var w = new Error('Possible EventEmitter memory leak detected. ' +
            existing.length + ' "' + String(type) + '" listeners ' +
            'added. Use emitter.setMaxListeners() to ' +
            'increase limit.');
        w.name = 'MaxListenersExceededWarning';
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        if (typeof console === 'object' && console.warn) {
          console.warn('%s: %s', w.name, w.message);
        }
      }
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    switch (arguments.length) {
      case 0:
        return this.listener.call(this.target);
      case 1:
        return this.listener.call(this.target, arguments[0]);
      case 2:
        return this.listener.call(this.target, arguments[0], arguments[1]);
      case 3:
        return this.listener.call(this.target, arguments[0], arguments[1],
            arguments[2]);
      default:
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; ++i)
          args[i] = arguments[i];
        this.listener.apply(this.target, args);
    }
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = bind.call(onceWrapper, state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');

      events = this._events;
      if (!events)
        return this;

      list = events[type];
      if (!list)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = objectCreate(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else
          spliceOne(list, position);

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (!events)
        return this;

      // not listening for removeListener, no need to emit
      if (!events.removeListener) {
        if (arguments.length === 0) {
          this._events = objectCreate(null);
          this._eventsCount = 0;
        } else if (events[type]) {
          if (--this._eventsCount === 0)
            this._events = objectCreate(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = objectKeys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = objectCreate(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (!events)
    return [];

  var evlistener = events[type];
  if (!evlistener)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
};

// About 1.5x faster than the two-arg version of Array#splice().
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
    list[i] = list[k];
  list.pop();
}

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function objectCreatePolyfill(proto) {
  var F = function() {};
  F.prototype = proto;
  return new F;
}
function objectKeysPolyfill(obj) {
  var keys = [];
  for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k)) {
    keys.push(k);
  }
  return k;
}
function functionBindPolyfill(context) {
  var fn = this;
  return function () {
    return fn.apply(context, arguments);
  };
}

},{}],377:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],378:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}

},{}],379:[function(require,module,exports){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}

},{}],380:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],381:[function(require,module,exports){
/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}

},{}],382:[function(require,module,exports){
(function (process){
'use strict';

if (typeof process === 'undefined' ||
    !process.version ||
    process.version.indexOf('v0.') === 0 ||
    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
  module.exports = { nextTick: nextTick };
} else {
  module.exports = process
}

function nextTick(fn, arg1, arg2, arg3) {
  if (typeof fn !== 'function') {
    throw new TypeError('"callback" argument must be a function');
  }
  var len = arguments.length;
  var args, i;
  switch (len) {
  case 0:
  case 1:
    return process.nextTick(fn);
  case 2:
    return process.nextTick(function afterTickOne() {
      fn.call(null, arg1);
    });
  case 3:
    return process.nextTick(function afterTickTwo() {
      fn.call(null, arg1, arg2);
    });
  case 4:
    return process.nextTick(function afterTickThree() {
      fn.call(null, arg1, arg2, arg3);
    });
  default:
    args = new Array(len - 1);
    i = 0;
    while (i < args.length) {
      args[i++] = arguments[i];
    }
    return process.nextTick(function afterTick() {
      fn.apply(null, args);
    });
  }
}


}).call(this,require('_process'))
},{"_process":383}],383:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],384:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.

'use strict';

/*<replacement>*/

var pna = require('process-nextick-args');
/*</replacement>*/

/*<replacement>*/
var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }return keys;
};
/*</replacement>*/

module.exports = Duplex;

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

var Readable = require('./_stream_readable');
var Writable = require('./_stream_writable');

util.inherits(Duplex, Readable);

{
  // avoid scope creep, the keys array can then be collected
  var keys = objectKeys(Writable.prototype);
  for (var v = 0; v < keys.length; v++) {
    var method = keys[v];
    if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
  }
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false) this.readable = false;

  if (options && options.writable === false) this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

  this.once('end', onend);
}

Object.defineProperty(Duplex.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._writableState.highWaterMark;
  }
});

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended) return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  pna.nextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

Object.defineProperty(Duplex.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }
    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});

Duplex.prototype._destroy = function (err, cb) {
  this.push(null);
  this.end();

  pna.nextTick(cb, err);
};
},{"./_stream_readable":386,"./_stream_writable":388,"core-util-is":373,"inherits":378,"process-nextick-args":382}],385:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.

'use strict';

module.exports = PassThrough;

var Transform = require('./_stream_transform');

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

util.inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};
},{"./_stream_transform":387,"core-util-is":373,"inherits":378}],386:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

/*<replacement>*/

var pna = require('process-nextick-args');
/*</replacement>*/

module.exports = Readable;

/*<replacement>*/
var isArray = require('isarray');
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;

/*<replacement>*/
var EE = require('events').EventEmitter;

var EElistenerCount = function (emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/
var Stream = require('./internal/streams/stream');
/*</replacement>*/

/*<replacement>*/

var Buffer = require('safe-buffer').Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}

/*</replacement>*/

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

/*<replacement>*/
var debugUtil = require('util');
var debug = void 0;
if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function () {};
}
/*</replacement>*/

var BufferList = require('./internal/streams/BufferList');
var destroyImpl = require('./internal/streams/destroy');
var StringDecoder;

util.inherits(Readable, Stream);

var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn);

  // This is a hack to make sure that our error handler is attached before any
  // userland ones.  NEVER DO THIS. This is here only because this code needs
  // to continue to work with older versions of Node.js that do not include
  // the prependListener() method. The goal is to eventually remove this hack.
  if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
}

function ReadableState(options, stream) {
  Duplex = Duplex || require('./_stream_duplex');

  options = options || {};

  // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.
  var isDuplex = stream instanceof Duplex;

  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var readableHwm = options.readableHighWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;

  if (hwm || hwm === 0) this.highWaterMark = hwm;else if (isDuplex && (readableHwm || readableHwm === 0)) this.highWaterMark = readableHwm;else this.highWaterMark = defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()
  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;

  // has it been destroyed
  this.destroyed = false;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex = Duplex || require('./_stream_duplex');

  if (!(this instanceof Readable)) return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  if (options) {
    if (typeof options.read === 'function') this._read = options.read;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;
  }

  Stream.call(this);
}

Object.defineProperty(Readable.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined) {
      return false;
    }
    return this._readableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._readableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
  }
});

Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;
Readable.prototype._destroy = function (err, cb) {
  this.push(null);
  cb(err);
};

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;
  var skipChunkCheck;

  if (!state.objectMode) {
    if (typeof chunk === 'string') {
      encoding = encoding || state.defaultEncoding;
      if (encoding !== state.encoding) {
        chunk = Buffer.from(chunk, encoding);
        encoding = '';
      }
      skipChunkCheck = true;
    }
  } else {
    skipChunkCheck = true;
  }

  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};

function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
  var state = stream._readableState;
  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);
    if (er) {
      stream.emit('error', er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
        chunk = _uint8ArrayToBuffer(chunk);
      }

      if (addToFront) {
        if (state.endEmitted) stream.emit('error', new Error('stream.unshift() after end event'));else addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        stream.emit('error', new Error('stream.push() after EOF'));
      } else {
        state.reading = false;
        if (state.decoder && !encoding) {
          chunk = state.decoder.write(chunk);
          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
        } else {
          addChunk(stream, state, chunk, false);
        }
      }
    } else if (!addToFront) {
      state.reading = false;
    }
  }

  return needMoreData(state);
}

function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    stream.emit('data', chunk);
    stream.read(0);
  } else {
    // update the buffer info.
    state.length += state.objectMode ? 1 : chunk.length;
    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

    if (state.needReadable) emitReadable(stream);
  }
  maybeReadMore(stream, state);
}

function chunkInvalid(state, chunk) {
  var er;
  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}

// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
};

// backwards compatibility.
Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
  return this;
};

// Don't raise the hwm > 8MB
var MAX_HWM = 0x800000;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }
  return n;
}

// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;
  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  }
  // If we're asking for more than the current hwm, then raise the hwm.
  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n;
  // Don't have enough
  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }
  return state.length;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;

  if (n !== 0) state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0) state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
    // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.
    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  } else {
    state.length -= n;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true;

    // If we tried to read() past the EOF, then emit end on the next tick.
    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);

  return ret;
};

function onEofChunk(stream, state) {
  if (state.ended) return;
  if (state.decoder) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // emit 'readable' now to make sure it gets picked up.
  emitReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync) pna.nextTick(emitReadable_, stream);else emitReadable_(stream);
  }
}

function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}

// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    pna.nextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;else len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function (n) {
  this.emit('error', new Error('_read() is not implemented'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;

  var endFn = doEnd ? onend : unpipe;
  if (state.endEmitted) pna.nextTick(endFn);else src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable, unpipeInfo) {
    debug('onunpipe');
    if (readable === src) {
      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
        unpipeInfo.hasUnpiped = true;
        cleanup();
      }
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  var cleanedUp = false;
  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', unpipe);
    src.removeListener('data', ondata);

    cleanedUp = true;

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  // If the user pushes more data while we're writing to dest then we'll end up
  // in ondata again. However, we only want to increase awaitDrain once because
  // dest will only emit one 'drain' event for the multiple writes.
  // => Introduce a guard on increasing awaitDrain.
  var increasedAwaitDrain = false;
  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    increasedAwaitDrain = false;
    var ret = dest.write(chunk);
    if (false === ret && !increasedAwaitDrain) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', src._readableState.awaitDrain);
        src._readableState.awaitDrain++;
        increasedAwaitDrain = true;
      }
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
  }

  // Make sure our error handler is attached before userland ones.
  prependListener(dest, 'error', onerror);

  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function () {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;
    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;
  var unpipeInfo = { hasUnpiped: false };

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0) return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;

    if (!dest) dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this, unpipeInfo);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this, unpipeInfo);
    }return this;
  }

  // try to find the right one.
  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;

  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];

  dest.emit('unpipe', this, unpipeInfo);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  if (ev === 'data') {
    // Start flowing on next tick if stream isn't explicitly paused
    if (this._readableState.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    var state = this._readableState;
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.emittedReadable = false;
      if (!state.reading) {
        pna.nextTick(nReadingNextTick, this);
      } else if (state.length) {
        emitReadable(this);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
}

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function () {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    resume(this, state);
  }
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    pna.nextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  if (!state.reading) {
    debug('resume read 0');
    stream.read(0);
  }

  state.resumeScheduled = false;
  state.awaitDrain = 0;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  while (state.flowing && stream.read() !== null) {}
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function (stream) {
  var _this = this;

  var state = this._readableState;
  var paused = false;

  stream.on('end', function () {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) _this.push(chunk);
    }

    _this.push(null);
  });

  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = _this.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function (method) {
        return function () {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  }

  // proxy certain important events.
  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
  }

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  this._read = function (n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return this;
};

Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._readableState.highWaterMark;
  }
});

// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;

  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = fromListPartial(n, state.buffer, state.decoder);
  }

  return ret;
}

// Extracts only enough buffered data to satisfy the amount requested.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromListPartial(n, list, hasStrings) {
  var ret;
  if (n < list.head.data.length) {
    // slice is the same for buffers and strings
    ret = list.head.data.slice(0, n);
    list.head.data = list.head.data.slice(n);
  } else if (n === list.head.data.length) {
    // first chunk is a perfect match
    ret = list.shift();
  } else {
    // result spans more than one buffer
    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
  }
  return ret;
}

// Copies a specified amount of characters from the list of buffered data
// chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBufferString(n, list) {
  var p = list.head;
  var c = 1;
  var ret = p.data;
  n -= ret.length;
  while (p = p.next) {
    var str = p.data;
    var nb = n > str.length ? str.length : n;
    if (nb === str.length) ret += str;else ret += str.slice(0, n);
    n -= nb;
    if (n === 0) {
      if (nb === str.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = str.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

// Copies a specified amount of bytes from the list of buffered data chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBuffer(n, list) {
  var ret = Buffer.allocUnsafe(n);
  var p = list.head;
  var c = 1;
  p.data.copy(ret);
  n -= p.data.length;
  while (p = p.next) {
    var buf = p.data;
    var nb = n > buf.length ? buf.length : n;
    buf.copy(ret, ret.length - n, 0, nb);
    n -= nb;
    if (n === 0) {
      if (nb === buf.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = buf.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    pna.nextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  // Check that we didn't get one last unshift.
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');
  }
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./_stream_duplex":384,"./internal/streams/BufferList":389,"./internal/streams/destroy":390,"./internal/streams/stream":391,"_process":383,"core-util-is":373,"events":376,"inherits":378,"isarray":380,"process-nextick-args":382,"safe-buffer":393,"string_decoder/":394,"util":371}],387:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.

'use strict';

module.exports = Transform;

var Duplex = require('./_stream_duplex');

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

util.inherits(Transform, Duplex);

function afterTransform(er, data) {
  var ts = this._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb) {
    return this.emit('error', new Error('write callback called multiple times'));
  }

  ts.writechunk = null;
  ts.writecb = null;

  if (data != null) // single equals check for both `null` and `undefined`
    this.push(data);

  cb(er);

  var rs = this._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    this._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);

  Duplex.call(this, options);

  this._transformState = {
    afterTransform: afterTransform.bind(this),
    needTransform: false,
    transforming: false,
    writecb: null,
    writechunk: null,
    writeencoding: null
  };

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;

    if (typeof options.flush === 'function') this._flush = options.flush;
  }

  // When the writable side finishes, then flush out anything remaining.
  this.on('prefinish', prefinish);
}

function prefinish() {
  var _this = this;

  if (typeof this._flush === 'function') {
    this._flush(function (er, data) {
      done(_this, er, data);
    });
  } else {
    done(this, null, null);
  }
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function (chunk, encoding, cb) {
  throw new Error('_transform() is not implemented');
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

Transform.prototype._destroy = function (err, cb) {
  var _this2 = this;

  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
    _this2.emit('close');
  });
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);

  if (data != null) // single equals check for both `null` and `undefined`
    stream.push(data);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  if (stream._writableState.length) throw new Error('Calling transform done when ws.length != 0');

  if (stream._transformState.transforming) throw new Error('Calling transform done when still transforming');

  return stream.push(null);
}
},{"./_stream_duplex":384,"core-util-is":373,"inherits":378}],388:[function(require,module,exports){
(function (process,global,setImmediate){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.

'use strict';

/*<replacement>*/

var pna = require('process-nextick-args');
/*</replacement>*/

module.exports = Writable;

/* <replacement> */
function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}

// It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;
  this.finish = function () {
    onCorkedFinish(_this, state);
  };
}
/* </replacement> */

/*<replacement>*/
var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : pna.nextTick;
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

/*<replacement>*/
var internalUtil = {
  deprecate: require('util-deprecate')
};
/*</replacement>*/

/*<replacement>*/
var Stream = require('./internal/streams/stream');
/*</replacement>*/

/*<replacement>*/

var Buffer = require('safe-buffer').Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}

/*</replacement>*/

var destroyImpl = require('./internal/streams/destroy');

util.inherits(Writable, Stream);

function nop() {}

function WritableState(options, stream) {
  Duplex = Duplex || require('./_stream_duplex');

  options = options || {};

  // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.
  var isDuplex = stream instanceof Duplex;

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var writableHwm = options.writableHighWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;

  if (hwm || hwm === 0) this.highWaterMark = hwm;else if (isDuplex && (writableHwm || writableHwm === 0)) this.highWaterMark = writableHwm;else this.highWaterMark = defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // if _final has been called
  this.finalCalled = false;

  // drain event flag.
  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // has it been destroyed
  this.destroyed = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function (er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.bufferedRequest = null;
  this.lastBufferedRequest = null;

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;

  // count buffered requests
  this.bufferedRequestCount = 0;

  // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two
  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];
  while (current) {
    out.push(current);
    current = current.next;
  }
  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function () {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
    });
  } catch (_) {}
})();

// Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var realHasInstance;
if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function (object) {
      if (realHasInstance.call(this, object)) return true;
      if (this !== Writable) return false;

      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function (object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || require('./_stream_duplex');

  // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.

  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
    return new Writable(options);
  }

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;

    if (typeof options.writev === 'function') this._writev = options.writev;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;

    if (typeof options.final === 'function') this._final = options.final;
  }

  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function () {
  this.emit('error', new Error('Cannot pipe, not readable'));
};

function writeAfterEnd(stream, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  pna.nextTick(cb, er);
}

// Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  var er = false;

  if (chunk === null) {
    er = new TypeError('May not write null values to stream');
  } else if (typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  if (er) {
    stream.emit('error', er);
    pna.nextTick(cb, er);
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;
  var isBuf = !state.objectMode && _isUint8Array(chunk);

  if (isBuf && !Buffer.isBuffer(chunk)) {
    chunk = _uint8ArrayToBuffer(chunk);
  }

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

  if (typeof cb !== 'function') cb = nop;

  if (state.ended) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }

  return ret;
};

Writable.prototype.cork = function () {
  var state = this._writableState;

  state.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;

    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = Buffer.from(chunk, encoding);
  }
  return chunk;
}

Object.defineProperty(Writable.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._writableState.highWaterMark;
  }
});

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    var newChunk = decodeChunk(state, chunk, encoding);
    if (chunk !== newChunk) {
      isBuf = true;
      encoding = 'buffer';
      chunk = newChunk;
    }
  }
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = {
      chunk: chunk,
      encoding: encoding,
      isBuf: isBuf,
      callback: cb,
      next: null
    };
    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }
    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;

  if (sync) {
    // defer the callback if we are being called synchronously
    // to avoid piling up things on the stack
    pna.nextTick(cb, er);
    // this can emit finish, and it will always happen
    // after error
    pna.nextTick(finishMaybe, stream, state);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
  } else {
    // the caller expect this to happen before if
    // it is async
    cb(er);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
    // this can emit finish, but finish must
    // always follow error
    finishMaybe(stream, state);
  }
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;

  onwriteStateUpdate(state);

  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state);

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      /*<replacement>*/
      asyncWrite(afterWrite, stream, state, finished, cb);
      /*</replacement>*/
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}

// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;

    var count = 0;
    var allBuffers = true;
    while (entry) {
      buffer[count] = entry;
      if (!entry.isBuf) allBuffers = false;
      entry = entry.next;
      count += 1;
    }
    buffer.allBuffers = allBuffers;

    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

    // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite
    state.pendingcb++;
    state.lastBufferedRequest = null;
    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }
    state.bufferedRequestCount = 0;
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;

      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      state.bufferedRequestCount--;
      // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.
      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new Error('_write() is not implemented'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished) endWritable(this, state, cb);
};

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}
function callFinal(stream, state) {
  stream._final(function (err) {
    state.pendingcb--;
    if (err) {
      stream.emit('error', err);
    }
    state.prefinished = true;
    stream.emit('prefinish');
    finishMaybe(stream, state);
  });
}
function prefinish(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === 'function') {
      state.pendingcb++;
      state.finalCalled = true;
      pna.nextTick(callFinal, stream, state);
    } else {
      state.prefinished = true;
      stream.emit('prefinish');
    }
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);
  if (need) {
    prefinish(stream, state);
    if (state.pendingcb === 0) {
      state.finished = true;
      stream.emit('finish');
    }
  }
  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished) pna.nextTick(cb);else stream.once('finish', cb);
  }
  state.ended = true;
  stream.writable = false;
}

function onCorkedFinish(corkReq, state, err) {
  var entry = corkReq.entry;
  corkReq.entry = null;
  while (entry) {
    var cb = entry.callback;
    state.pendingcb--;
    cb(err);
    entry = entry.next;
  }
  if (state.corkedRequestsFree) {
    state.corkedRequestsFree.next = corkReq;
  } else {
    state.corkedRequestsFree = corkReq;
  }
}

Object.defineProperty(Writable.prototype, 'destroyed', {
  get: function () {
    if (this._writableState === undefined) {
      return false;
    }
    return this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._writableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._writableState.destroyed = value;
  }
});

Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;
Writable.prototype._destroy = function (err, cb) {
  this.end();
  cb(err);
};
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("timers").setImmediate)
},{"./_stream_duplex":384,"./internal/streams/destroy":390,"./internal/streams/stream":391,"_process":383,"core-util-is":373,"inherits":378,"process-nextick-args":382,"safe-buffer":393,"timers":395,"util-deprecate":396}],389:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Buffer = require('safe-buffer').Buffer;
var util = require('util');

function copyBuffer(src, target, offset) {
  src.copy(target, offset);
}

module.exports = function () {
  function BufferList() {
    _classCallCheck(this, BufferList);

    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  BufferList.prototype.push = function push(v) {
    var entry = { data: v, next: null };
    if (this.length > 0) this.tail.next = entry;else this.head = entry;
    this.tail = entry;
    ++this.length;
  };

  BufferList.prototype.unshift = function unshift(v) {
    var entry = { data: v, next: this.head };
    if (this.length === 0) this.tail = entry;
    this.head = entry;
    ++this.length;
  };

  BufferList.prototype.shift = function shift() {
    if (this.length === 0) return;
    var ret = this.head.data;
    if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
    --this.length;
    return ret;
  };

  BufferList.prototype.clear = function clear() {
    this.head = this.tail = null;
    this.length = 0;
  };

  BufferList.prototype.join = function join(s) {
    if (this.length === 0) return '';
    var p = this.head;
    var ret = '' + p.data;
    while (p = p.next) {
      ret += s + p.data;
    }return ret;
  };

  BufferList.prototype.concat = function concat(n) {
    if (this.length === 0) return Buffer.alloc(0);
    if (this.length === 1) return this.head.data;
    var ret = Buffer.allocUnsafe(n >>> 0);
    var p = this.head;
    var i = 0;
    while (p) {
      copyBuffer(p.data, ret, i);
      i += p.data.length;
      p = p.next;
    }
    return ret;
  };

  return BufferList;
}();

if (util && util.inspect && util.inspect.custom) {
  module.exports.prototype[util.inspect.custom] = function () {
    var obj = util.inspect({ length: this.length });
    return this.constructor.name + ' ' + obj;
  };
}
},{"safe-buffer":393,"util":371}],390:[function(require,module,exports){
'use strict';

/*<replacement>*/

var pna = require('process-nextick-args');
/*</replacement>*/

// undocumented cb() API, needed for core, not for public API
function destroy(err, cb) {
  var _this = this;

  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;

  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err && (!this._writableState || !this._writableState.errorEmitted)) {
      pna.nextTick(emitErrorNT, this, err);
    }
    return this;
  }

  // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks

  if (this._readableState) {
    this._readableState.destroyed = true;
  }

  // if this is a duplex stream mark the writable part as destroyed as well
  if (this._writableState) {
    this._writableState.destroyed = true;
  }

  this._destroy(err || null, function (err) {
    if (!cb && err) {
      pna.nextTick(emitErrorNT, _this, err);
      if (_this._writableState) {
        _this._writableState.errorEmitted = true;
      }
    } else if (cb) {
      cb(err);
    }
  });

  return this;
}

function undestroy() {
  if (this._readableState) {
    this._readableState.destroyed = false;
    this._readableState.reading = false;
    this._readableState.ended = false;
    this._readableState.endEmitted = false;
  }

  if (this._writableState) {
    this._writableState.destroyed = false;
    this._writableState.ended = false;
    this._writableState.ending = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}

function emitErrorNT(self, err) {
  self.emit('error', err);
}

module.exports = {
  destroy: destroy,
  undestroy: undestroy
};
},{"process-nextick-args":382}],391:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":376}],392:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":384,"./lib/_stream_passthrough.js":385,"./lib/_stream_readable.js":386,"./lib/_stream_transform.js":387,"./lib/_stream_writable.js":388}],393:[function(require,module,exports){
/* eslint-disable node/no-deprecated-api */
var buffer = require('buffer')
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}

},{"buffer":372}],394:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

/*<replacement>*/

var Buffer = require('safe-buffer').Buffer;
/*</replacement>*/

var isEncoding = Buffer.isEncoding || function (encoding) {
  encoding = '' + encoding;
  switch (encoding && encoding.toLowerCase()) {
    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
      return true;
    default:
      return false;
  }
};

function _normalizeEncoding(enc) {
  if (!enc) return 'utf8';
  var retried;
  while (true) {
    switch (enc) {
      case 'utf8':
      case 'utf-8':
        return 'utf8';
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 'utf16le';
      case 'latin1':
      case 'binary':
        return 'latin1';
      case 'base64':
      case 'ascii':
      case 'hex':
        return enc;
      default:
        if (retried) return; // undefined
        enc = ('' + enc).toLowerCase();
        retried = true;
    }
  }
};

// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
  var nenc = _normalizeEncoding(enc);
  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
  return nenc || enc;
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
exports.StringDecoder = StringDecoder;
function StringDecoder(encoding) {
  this.encoding = normalizeEncoding(encoding);
  var nb;
  switch (this.encoding) {
    case 'utf16le':
      this.text = utf16Text;
      this.end = utf16End;
      nb = 4;
      break;
    case 'utf8':
      this.fillLast = utf8FillLast;
      nb = 4;
      break;
    case 'base64':
      this.text = base64Text;
      this.end = base64End;
      nb = 3;
      break;
    default:
      this.write = simpleWrite;
      this.end = simpleEnd;
      return;
  }
  this.lastNeed = 0;
  this.lastTotal = 0;
  this.lastChar = Buffer.allocUnsafe(nb);
}

StringDecoder.prototype.write = function (buf) {
  if (buf.length === 0) return '';
  var r;
  var i;
  if (this.lastNeed) {
    r = this.fillLast(buf);
    if (r === undefined) return '';
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }
  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
  return r || '';
};

StringDecoder.prototype.end = utf8End;

// Returns only complete characters in a Buffer
StringDecoder.prototype.text = utf8Text;

// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast = function (buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
};

// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte. If an invalid byte is detected, -2 is returned.
function utf8CheckByte(byte) {
  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
  return byte >> 6 === 0x02 ? -1 : -2;
}

// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
  var j = buf.length - 1;
  if (j < i) return 0;
  var nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 1;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
    }
    return nb;
  }
  return 0;
}

// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
  if ((buf[0] & 0xC0) !== 0x80) {
    self.lastNeed = 0;
    return '\ufffd';
  }
  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xC0) !== 0x80) {
      self.lastNeed = 1;
      return '\ufffd';
    }
    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xC0) !== 0x80) {
        self.lastNeed = 2;
        return '\ufffd';
      }
    }
  }
}

// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
  var p = this.lastTotal - this.lastNeed;
  var r = utf8CheckExtraBytes(this, buf, p);
  if (r !== undefined) return r;
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
}

// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
  var total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed) return buf.toString('utf8', i);
  this.lastTotal = total;
  var end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString('utf8', i, end);
}

// For UTF-8, a replacement character is added when ending on a partial
// character.
function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + '\ufffd';
  return r;
}

// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
  if ((buf.length - i) % 2 === 0) {
    var r = buf.toString('utf16le', i);
    if (r) {
      var c = r.charCodeAt(r.length - 1);
      if (c >= 0xD800 && c <= 0xDBFF) {
        this.lastNeed = 2;
        this.lastTotal = 4;
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
        return r.slice(0, -1);
      }
    }
    return r;
  }
  this.lastNeed = 1;
  this.lastTotal = 2;
  this.lastChar[0] = buf[buf.length - 1];
  return buf.toString('utf16le', i, buf.length - 1);
}

// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) {
    var end = this.lastTotal - this.lastNeed;
    return r + this.lastChar.toString('utf16le', 0, end);
  }
  return r;
}

function base64Text(buf, i) {
  var n = (buf.length - i) % 3;
  if (n === 0) return buf.toString('base64', i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;
  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }
  return buf.toString('base64', i, buf.length - n);
}

function base64End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
  return r;
}

// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
  return buf.toString(this.encoding);
}

function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : '';
}
},{"safe-buffer":393}],395:[function(require,module,exports){
(function (setImmediate,clearImmediate){
var nextTick = require('process/browser.js').nextTick;
var apply = Function.prototype.apply;
var slice = Array.prototype.slice;
var immediateIds = {};
var nextImmediateId = 0;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) { timeout.close(); };

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// That's not how node.js implements it but the exposed api is the same.
exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
  var id = nextImmediateId++;
  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

  immediateIds[id] = true;

  nextTick(function onNextTick() {
    if (immediateIds[id]) {
      // fn.call() is faster so we optimize for the common use-case
      // @see http://jsperf.com/call-apply-segu
      if (args) {
        fn.apply(null, args);
      } else {
        fn.call(null);
      }
      // Prevent ids from leaking
      exports.clearImmediate(id);
    }
  });

  return id;
};

exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
  delete immediateIds[id];
};
}).call(this,require("timers").setImmediate,require("timers").clearImmediate)
},{"process/browser.js":383,"timers":395}],396:[function(require,module,exports){
(function (global){

/**
 * Module exports.
 */

module.exports = deprecate;

/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate (fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */

function config (name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!global.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = global.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[242,243]);