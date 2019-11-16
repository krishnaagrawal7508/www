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
'use strict';

// MAIN //

var ctor = ( typeof Float64Array === 'function' ) ? Float64Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

},{}],2:[function(require,module,exports){
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

var hasFloat64ArraySupport = require( '@stdlib/utils/detect-float64array-support' );
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

},{"./float64array.js":1,"./polyfill.js":3,"@stdlib/utils/detect-float64array-support":274}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

var hasUint16ArraySupport = require( '@stdlib/utils/detect-uint16array-support' );
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

},{"./polyfill.js":5,"./uint16array.js":6,"@stdlib/utils/detect-uint16array-support":282}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
'use strict';

// MAIN //

var ctor = ( typeof Uint16Array === 'function' ) ? Uint16Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

},{}],7:[function(require,module,exports){
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

var hasUint32ArraySupport = require( '@stdlib/utils/detect-uint32array-support' );
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

},{"./polyfill.js":8,"./uint32array.js":9,"@stdlib/utils/detect-uint32array-support":285}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
'use strict';

// MAIN //

var ctor = ( typeof Uint32Array === 'function' ) ? Uint32Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

},{}],10:[function(require,module,exports){
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

var hasUint8ArraySupport = require( '@stdlib/utils/detect-uint8array-support' );
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

},{"./polyfill.js":11,"./uint8array.js":12,"@stdlib/utils/detect-uint8array-support":288}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
'use strict';

// MAIN //

var ctor = ( typeof Uint8Array === 'function' ) ? Uint8Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

},{}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
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

var hasOwnProp = require( './has_own_property.js' );


// EXPORTS //

module.exports = hasOwnProp;

},{"./has_own_property.js":13}],15:[function(require,module,exports){
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

var isFloat64Array = require( './is_float64array.js' );


// EXPORTS //

module.exports = isFloat64Array;

},{"./is_float64array.js":16}],16:[function(require,module,exports){
'use strict';

// MODULES //

var nativeClass = require( '@stdlib/utils/native-class' );


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
	return ( nativeClass( value ) === '[object Float64Array]' );
}


// EXPORTS //

module.exports = isFloat64Array;

},{"@stdlib/utils/native-class":291}],17:[function(require,module,exports){
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

},{"@stdlib/array/uint16":4,"@stdlib/array/uint8":10}],18:[function(require,module,exports){
'use strict';

/**
* Returns a boolean indicating if an environment is little endian.
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

var IS_LITTLE_ENDIAN = require( './is_little_endian.js' );


// EXPORTS //

module.exports = IS_LITTLE_ENDIAN;

},{"./is_little_endian.js":19}],19:[function(require,module,exports){
'use strict';

// MODULES //

var ctors = require( './ctors.js' );


// MAIN //

/**
* Returns a boolean indicating if an environment is little endian.
*
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
	* 4660 => 0x1234 => 0x12 0x34 => '00010010 00110100' => (0x12,0x34) == (18,52)
	*/
	uint16view[ 0 ] = 0x1234;

	// Create a uint8 view on top of the uint16 buffer:
	uint8view = new ctors[ 'uint8' ]( uint16view.buffer );

	// If little endian, the least significant byte will be first...
	return ( uint8view[ 0 ] === 0x34 );
}


// EXPORTS //

module.exports = isLittleEndian();

},{"./ctors.js":17}],20:[function(require,module,exports){
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

var isUint16Array = require( './is_uint16array.js' );


// EXPORTS //

module.exports = isUint16Array;

},{"./is_uint16array.js":21}],21:[function(require,module,exports){
'use strict';

// MODULES //

var nativeClass = require( '@stdlib/utils/native-class' );


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
	return ( nativeClass( value ) === '[object Uint16Array]' );
}


// EXPORTS //

module.exports = isUint16Array;

},{"@stdlib/utils/native-class":291}],22:[function(require,module,exports){
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

var isUint32Array = require( './is_uint32array.js' );


// EXPORTS //

module.exports = isUint32Array;

},{"./is_uint32array.js":23}],23:[function(require,module,exports){
'use strict';

// MODULES //

var nativeClass = require( '@stdlib/utils/native-class' );


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
	return ( nativeClass( value ) === '[object Uint32Array]' );
}


// EXPORTS //

module.exports = isUint32Array;

},{"@stdlib/utils/native-class":291}],24:[function(require,module,exports){
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

var isUint8Array = require( './is_uint8array.js' );


// EXPORTS //

module.exports = isUint8Array;

},{"./is_uint8array.js":25}],25:[function(require,module,exports){
'use strict';

// MODULES //

var nativeClass = require( '@stdlib/utils/native-class' );


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
	return ( nativeClass( value ) === '[object Uint8Array]' );
}


// EXPORTS //

module.exports = isUint8Array;

},{"@stdlib/utils/native-class":291}],26:[function(require,module,exports){
'use strict';

/**
* Smallest positive single-precision floating-point normal number.
*
* @module @stdlib/constants/math/float32-smallest-normal
* @type {number}
*
* @example
* var FLOAT32_SMALLEST_NORMAL = require( '@stdlib/constants/math/float32-smallest-normal' );
* // returns 1.1754943508222875e-38
*/


// MAIN //

/**
* The smallest positive single-precision floating-point normal number.
*
* ## Notes
*
* The number has the value
*
* ```tex
* \frac{1}{2^{127-1}}
* ```
*
* which corresponds to the bit sequence
*
* ```binarystring
* 0 00000001 00000000000000000000000
* ```
*
* @constant
* @type {number}
* @default 1.1754943508222875e-38
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT32_SMALLEST_NORMAL = 1.1754943508222875e-38;


// EXPORTS //

module.exports = FLOAT32_SMALLEST_NORMAL;


},{}],27:[function(require,module,exports){
'use strict';

/**
* Euler's number.
*
* @module @stdlib/constants/math/float64-e
* @type {number}
*
* @example
* var E = require( '@stdlib/constants/math/float64-e' );
* // returns 2.718281828459045
*/


// MAIN //

/**
* Euler's number.
*
* @constant
* @type {number}
* @default 2.718281828459045
* @see [OEIS]{@link https://oeis.org/A001113}
* @see [Wikipedia]{@link https://en.wikipedia.org/wiki/E_(mathematical_constant)}
*/
var E = 2.718281828459045235360287471352662497757247093699959574966;


// EXPORTS //

module.exports = E;

},{}],28:[function(require,module,exports){
'use strict';

/**
* Difference between one and the smallest value greater than one that can be represented as a double-precision floating-point number.
*
* @module @stdlib/constants/math/float64-eps
* @type {number}
*
* @example
* var FLOAT64_EPSILON = require( '@stdlib/constants/math/float64-eps' );
* // returns 2.220446049250313e-16
*/


// MAIN //

/**
* Difference between one and the smallest value greater than one that can be represented as a double-precision floating-point number.
*
* ## Notes
*
* The difference is
*
* ```tex
* \frac{1}{2^{52}}
* ```
*
* @constant
* @type {number}
* @default 2.220446049250313e-16
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
* @see [Machine Epsilon]{@link https://en.wikipedia.org/wiki/Machine_epsilon}
*/
var FLOAT64_EPSILON = 2.2204460492503130808472633361816E-16;


// EXPORTS //

module.exports = FLOAT64_EPSILON;

},{}],29:[function(require,module,exports){
'use strict';

/**
* The Euler-Mascheroni constant.
*
* @module @stdlib/constants/math/float64-eulergamma
* @type {number}
*
* @example
* var GAMMA = require( '@stdlib/constants/math/float64-eulergamma' );
* // returns 0.5772156649015329
*/


// MAIN //

/**
* The Euler-Mascheroni constant.
*
* @constant
* @type {number}
* @default 0.5772156649015329
* @see [OEIS]{@link http://oeis.org/A001620}
* @see [Mathworld]{@link http://mathworld.wolfram.com/Euler-MascheroniConstant.html}
*/
var GAMMA = 0.577215664901532860606512090082402431042;


// EXPORTS //

module.exports = GAMMA;

},{}],30:[function(require,module,exports){
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

},{}],31:[function(require,module,exports){
'use strict';

/**
* One fourth times the mathematical constant `π`.
*
* @module @stdlib/constants/math/float64-fourth-pi
* @type {number}
*
* @example
* var FOURTH_PI = require( '@stdlib/constants/math/float64-fourth-pi' );
* // returns 7.85398163397448309616e-1
*/


// MAIN //

/**
* One fourth times the mathematical constant `π`.
*
* @constant
* @type {number}
* @default 7.85398163397448309616e-1
* @see [Wikipedia]{@link https://en.wikipedia.org/wiki/Pi}
*/
var FOURTH_PI = 7.85398163397448309616e-1;


// EXPORTS //

module.exports = FOURTH_PI;

},{}],32:[function(require,module,exports){
'use strict';

/**
* Arbitrary constant `g` to be used in Lanczos approximation functions.
*
* @module @stdlib/constants/math/float64-gamma-lanczos-g
* @type {number}
*
* @example
* var FLOAT64_GAMMA_LANCZOS_G = require( '@stdlib/constants/math/float64-gamma-lanczos-g' );
* // returns 10.900511
*/


// MAIN //

/**
* Arbitrary constant `g` to be used in Lanczos approximation functions.
*
* @constant
* @type {number}
* @default 10.900511
* @see [Lanczos Approximation]{@link https://en.wikipedia.org/wiki/Lanczos_approximation}
*/
var FLOAT64_GAMMA_LANCZOS_G = 10.90051099999999983936049829935654997826;


// EXPORTS //

module.exports = FLOAT64_GAMMA_LANCZOS_G;

},{}],33:[function(require,module,exports){
'use strict';

/**
* One half times the natural logarithm of 2.
*
* @module @stdlib/constants/math/float64-half-ln-two
* @type {number}
*
* @example
* var HALF_LN2 = require( '@stdlib/constants/math/float64-half_ln2' );
* // returns 3.46573590279972654709e-01
*/


// MAIN //

/**
* One half times the natural logarithm of 2.
*
* ```tex
* \frac{\ln 2}{2}
* ```
*
* @constant
* @type {number}
* @default 3.46573590279972654709e-01
*/
var HALF_LN2 = 3.46573590279972654709e-01; // 0x3FD62E42 0xFEFA39EF


// EXPORTS //

module.exports = HALF_LN2;

},{}],34:[function(require,module,exports){
'use strict';

/**
* One half times the mathematical constant `π`.
*
* @module @stdlib/constants/math/float64-half-pi
* @type {number}
*
* @example
* var HALF_PI = require( '@stdlib/constants/math/float64-half-pi' );
* // returns 1.5707963267948966
*/


// MAIN //

/**
* One half times the mathematical constant `π`.
*
* @constant
* @type {number}
* @default 1.5707963267948966
* @see [Wikipedia]{@link https://en.wikipedia.org/wiki/Pi}
*/
var HALF_PI = 1.5707963267948966;


// EXPORTS //

module.exports = HALF_PI;

},{}],35:[function(require,module,exports){
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

},{}],36:[function(require,module,exports){
'use strict';

/**
* Natural logarithm of `2`.
*
* @module @stdlib/constants/math/float64-ln-two
* @type {number}
*
* @example
* var LN2 = require( '@stdlib/constants/math/float64-ln-two' );
* // returns 0.6931471805599453
*/


// MAIN //

/**
* Natural logarithm of `2`.
*
* ```tex
* \ln 2
* ```
*
* @constant
* @type {number}
* @default 0.6931471805599453
*/
var LN2 = 6.93147180559945309417232121458176568075500134360255254120680009493393621969694715605863326996418687542001481021e-01; // eslint-disable-line max-len


// EXPORTS //

module.exports = LN2;

},{}],37:[function(require,module,exports){
'use strict';

/**
* The maximum biased base 2 exponent for a subnormal double-precision floating-point number.
*
* @module @stdlib/constants/math/float64-max-base2-exponent-subnormal
* @type {integer32}
*
* @example
* var FLOAT64_MAX_BASE2_EXPONENT_SUBNORMAL = require( '@stdlib/constants/math/float64-max-base2-exponent-subnormal' );
* // returns -1023
*/


// MAIN //

/**
* The maximum biased base 2 exponent for a subnormal double-precision floating-point number.
*
* ```text
* 00000000000 => 0 - BIAS = -1023
* ```
*
* where `BIAS = 1023`.
*
* @constant
* @type {integer32}
* @default -1023
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MAX_BASE2_EXPONENT_SUBNORMAL = -1023|0; // asm type annotation


// EXPORTS //

module.exports = FLOAT64_MAX_BASE2_EXPONENT_SUBNORMAL;

},{}],38:[function(require,module,exports){
'use strict';

/**
* The maximum biased base 2 exponent for a double-precision floating-point number.
*
* @module @stdlib/constants/math/float64-max-base2-exponent
* @type {integer32}
*
* @example
* var FLOAT64_MAX_BASE2_EXPONENT = require( '@stdlib/constants/math/float64-max-base2-exponent' );
* // returns 1023
*/


// MAIN //

/**
* The maximum biased base 2 exponent for a double-precision floating-point number.
*
* ```text
* 11111111110 => 2046 - BIAS = 1023
* ```
*
* where `BIAS = 1023`.
*
* @constant
* @type {integer32}
* @default 1023
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MAX_BASE2_EXPONENT = 1023|0; // asm type annotation


// EXPORTS //

module.exports = FLOAT64_MAX_BASE2_EXPONENT;

},{}],39:[function(require,module,exports){
'use strict';

/**
* Natural logarithm of the maximum double-precision floating-point number.
*
* @module @stdlib/constants/math/float64-max-ln
* @type {number}
*
* @example
* var FLOAT64_MAX_LN = require( '@stdlib/constants/math/float64-max-ln' );
* // returns 709.782712893384
*/


// MAIN //

/**
* Natural logarithm of the maximum double-precision floating-point number.
*
* ## Notes
*
* The natural logarithm of the maximum is given by
*
* ```tex
* \ln \left( 2^{1023} (2 - 2^{-52}) \right)
* ```
*
* @constant
* @type {number}
* @default 709.782712893384
* @see [IEEE 754]{@link http://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MAX_LN = 709.782712893384;


// EXPORTS //

module.exports = FLOAT64_MAX_LN;

},{}],40:[function(require,module,exports){
'use strict';

/**
* Maximum double-precision floating-point number.
*
* @module @stdlib/constants/math/float64-max
* @type {number}
*
* @example
* var FLOAT64_MAX = require( '@stdlib/constants/math/float64-max' );
* // returns 1.7976931348623157e+308
*/


// MAIN //

/**
* Maximum double-precision floating-point number.
*
* ## Notes
*
* The maximum is given by
*
* ```tex
* 2^{1023} (2 - 2^{-52})
* ```
*
* @constant
* @type {number}
* @default 1.7976931348623157e+308
* @see [IEEE 754]{@link http://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MAX = 1.7976931348623157e+308;


// EXPORTS //

module.exports = FLOAT64_MAX;

},{}],41:[function(require,module,exports){
'use strict';

/**
* The minimum biased base 2 exponent for a subnormal double-precision floating-point number.
*
* @module @stdlib/constants/math/float64-min-base2-exponent-subnormal
* @type {integer32}
*
* @example
* var FLOAT64_MIN_BASE2_EXPONENT_SUBNORMAL = require( '@stdlib/constants/math/float64-min-base2-exponent-subnormal' );
* // returns -1074
*/


// MAIN //

/**
* The minimum biased base 2 exponent for a subnormal double-precision floating-point number.
*
* ```text
* -(BIAS+(52-1)) = -(1023+51) = -1074
* ```
*
* where `BIAS = 1023` and `52` is the number of digits in the significand.
*
* @constant
* @type {integer32}
* @default -1074
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MIN_BASE2_EXPONENT_SUBNORMAL = -1074|0; // asm type annotation


// EXPORTS //

module.exports = FLOAT64_MIN_BASE2_EXPONENT_SUBNORMAL;

},{}],42:[function(require,module,exports){
'use strict';

/**
* Natural logarithm of the smallest normalized double-precision floating-point number.
*
* @module @stdlib/constants/math/float64-min-ln
* @type {number}
*
* @example
* var FLOAT64_MIN_LN = require( '@stdlib/constants/math/float64-min-ln' );
* // returns -708.3964185322641
*/


// MAIN //

/**
* Natural logarithm of the smallest normalized double-precision floating-point number.
*
* ## Notes
*
* The number has the value
*
* ```tex
* -\ln \left( 2^{1023-1} \right)
* ```
*
* @constant
* @type {number}
* @default -708.3964185322641
* @see [IEEE 754]{@link http://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MIN_LN = -708.3964185322641;


// EXPORTS //

module.exports = FLOAT64_MIN_LN;

},{}],43:[function(require,module,exports){
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

},{}],44:[function(require,module,exports){
'use strict';

/**
* The mathematical constant `π`.
*
* @module @stdlib/constants/math/float64-pi
* @type {number}
*
* @example
* var PI = require( '@stdlib/constants/math/float64-pi' );
* // returns 3.141592653589793
*/


// MAIN //

/**
* The mathematical constant `π`.
*
* @constant
* @type {number}
* @default 3.141592653589793
* @see [Wikipedia]{@link https://en.wikipedia.org/wiki/Pi}
*/
var PI = 3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679; // eslint-disable-line max-len


// EXPORTS //

module.exports = PI;

},{}],45:[function(require,module,exports){
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
var FLOAT64_PINF = Number.POSITIVE_INFINITY;


// EXPORTS //

module.exports = FLOAT64_PINF;

},{}],46:[function(require,module,exports){
'use strict';

/**
* Smallest positive double-precision floating-point normal number.
*
* @module @stdlib/constants/math/float64-smallest-normal
* @type {number}
*
* @example
* var FLOAT64_SMALLEST_NORMAL = require( '@stdlib/constants/math/float64-smallest-normal' );
* // returns 2.2250738585072014e-308
*/


// MAIN //

/**
* The smallest positive double-precision floating-point normal number.
*
* ## Notes
*
* The number has the value
*
* ```tex
* \frac{1}{2^{1023-1}}
* ```
*
* which corresponds to the bit sequence
*
* ```binarystring
* 0 00000000001 00000000000000000000 00000000000000000000000000000000
* ```
*
* @constant
* @type {number}
* @default 2.2250738585072014e-308
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_SMALLEST_NORMAL = 2.2250738585072014e-308;


// EXPORTS //

module.exports = FLOAT64_SMALLEST_NORMAL;

},{}],47:[function(require,module,exports){
'use strict';

/**
* Square root of double-precision floating-point epsilon.
*
* @module @stdlib/constants/math/float64-sqrt-eps
* @type {number}
*
* @example
* var FLOAT64_SQRT_EPSILON = require( '@stdlib/constants/math/float64-sqrt-eps' );
* // returns 0.14901161193847656e-7
*/


// MAIN //

/**
* Square root of double-precision floating-point epsilon.
*
* ```tex
* \sqrt{\frac{1}{2^{52}}}
* ```
*
* @constant
* @type {number}
* @default 0.14901161193847656e-7
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
* @see [Machine Epsilon]{@link https://en.wikipedia.org/wiki/Machine_epsilon}
*/
var FLOAT64_SQRT_EPSILON = 0.1490116119384765625e-7;


// EXPORTS //

module.exports = FLOAT64_SQRT_EPSILON;

},{}],48:[function(require,module,exports){
'use strict';

/**
* Square root of the mathematical constant `π` times `2`.
*
* @module @stdlib/constants/math/float64-sqrt-two-pi
* @type {number}
*
* @example
* var SQRT_TWO_PI = require( '@stdlib/constants/math/float64-sqrt-two-pi' );
* // returns 2.5066282746310007
*/


// MAIN //

/**
* Square root of the mathematical constant `π` times `2`.
*
* @constant
* @type {number}
* @default 2.5066282746310007
* @see [Wikipedia]{@link https://en.wikipedia.org/wiki/Pi}
*/
var SQRT_TWO_PI = 2.506628274631000502415765284811045253e+00;


// EXPORTS //

module.exports = SQRT_TWO_PI;

},{}],49:[function(require,module,exports){
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

},{}],50:[function(require,module,exports){
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

},{}],51:[function(require,module,exports){
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

},{}],52:[function(require,module,exports){
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

},{}],53:[function(require,module,exports){
'use strict';

/**
* Test if a finite numeric value is an even number.
*
* @module @stdlib/math/base/assert/is-even
*
* @example
* var isEven = require( '@stdlib/math/base/assert/is-even' );
*
* var bool = isEven( 5.0 );
* // returns false
*
* bool = isEven( -2.0 );
* // returns true
*
* bool = isEven( 0.0 );
* // returns true
*
* bool = isEven( NaN );
* // returns false
*/

// MODULES //

var isEven = require( './is_even.js' );


// EXPORTS //

module.exports = isEven;

},{"./is_even.js":54}],54:[function(require,module,exports){
'use strict';

// MODULES //

var isInteger = require( '@stdlib/math/base/assert/is-integer' );


// MAIN //

/**
* Tests if a finite numeric value is an even number.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is an even number
*
* @example
* var bool = isEven( 5.0 );
* // returns false
*
* @example
* var bool = isEven( -2.0 );
* // returns true
*
* @example
* var bool = isEven( 0.0 );
* // returns true
*
* @example
* var bool = isEven( NaN );
* // returns false
*/
function isEven( x ) {
	return isInteger( x/2.0 );
}


// EXPORTS //

module.exports = isEven;

},{"@stdlib/math/base/assert/is-integer":57}],55:[function(require,module,exports){
'use strict';

/**
* Test if a numeric value is infinite.
*
* @module @stdlib/assert/is-infinite
*
* @example
* var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
*
* var bool = isInfinite( Infinity );
* // returns true
*
* bool = isInfinite( -Infinity );
* // returns true
*
* bool = isInfinite( 5.0 );
* // returns false
*
* bool = isInfinite( NaN );
* // returns false
*/

// MODULES //

var isInfinite = require( './is_infinite.js' );


// EXPORTS //

module.exports = isInfinite;

},{"./is_infinite.js":56}],56:[function(require,module,exports){
'use strict';

// MODULES //

var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );


// MAIN //

/**
* Tests if a numeric value is infinite.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is infinite
*
* @example
* var bool = isInfinite( Infinity );
* // returns true
*
* @example
* var bool = isInfinite( -Infinity );
* // returns true
*
* @example
* var bool = isInfinite( 5.0 );
* // returns false
*
* @example
* var bool = isInfinite( NaN );
* // returns false
*/
function isInfinite( x ) {
	return (x === PINF || x === NINF);
}


// EXPORTS //

module.exports = isInfinite;

},{"@stdlib/constants/math/float64-ninf":43,"@stdlib/constants/math/float64-pinf":45}],57:[function(require,module,exports){
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

},{"./is_integer.js":58}],58:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":116}],59:[function(require,module,exports){
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

},{"./is_nan.js":60}],60:[function(require,module,exports){
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

},{}],61:[function(require,module,exports){
'use strict';

/**
* Test if a numeric value is negative zero.
*
* @module @stdlib/math/base/assert/is-negative-zero
*
* @example
* var isNegativeZero = require( '@stdlib/math/base/assert/is-negative-zero' );
*
* var bool = isNegativeZero( -0.0 );
* // returns true
*
* bool = isNegativeZero( 0.0 );
* // returns false
*/

// MODULES //

var isNegativeZero = require( './is_negative_zero.js' );


// EXPORTS //

module.exports = isNegativeZero;

},{"./is_negative_zero.js":62}],62:[function(require,module,exports){
'use strict';

// MODULES //

var NINF = require( '@stdlib/constants/math/float64-ninf' );


// MAIN //

/**
* Tests if a numeric value is negative zero.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is negative zero
*
* @example
* var bool = isNegativeZero( -0.0 );
* // returns true
*
* @example
* var bool = isNegativeZero( 0.0 );
* // returns false
*/
function isNegativeZero( x ) {
	return (x === 0.0 && 1.0/x === NINF);
}


// EXPORTS //

module.exports = isNegativeZero;

},{"@stdlib/constants/math/float64-ninf":43}],63:[function(require,module,exports){
'use strict';

/**
* Test if a finite numeric value is an odd number.
*
* @module @stdlib/math/base/assert/is-odd
*
* @example
* var isOdd = require( '@stdlib/math/base/assert/is-odd' );
*
* var bool = isOdd( 5.0 );
* // returns true
*
* bool = isOdd( -2.0 );
* // returns false
*
* bool = isOdd( 0.0 );
* // returns false
*
* bool = isOdd( NaN );
* // returns false
*/

// MODULES //

var isOdd = require( './is_odd.js' );


// EXPORTS //

module.exports = isOdd;

},{"./is_odd.js":64}],64:[function(require,module,exports){
'use strict';

// MODULES //

var isEven = require( '@stdlib/math/base/assert/is-even' );


// MAIN //

/**
* Tests if a finite numeric value is an odd number.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is an odd number
*
* @example
* var bool = isOdd( 5.0 );
* // returns true
*
* @example
* var bool = isOdd( -2.0 );
* // returns false
*
* @example
* var bool = isOdd( 0.0 );
* // returns false
*
* @example
* var bool = isOdd( NaN );
* // returns false
*/
function isOdd( x ) {
	// Check sign to prevent overflow...
	if ( x > 0.0 ) {
		return isEven( x-1.0 );
	}
	return isEven( x+1.0 );
}


// EXPORTS //

module.exports = isOdd;

},{"@stdlib/math/base/assert/is-even":53}],65:[function(require,module,exports){
'use strict';

/**
* Test if a numeric value is positive zero.
*
* @module @stdlib/math/base/assert/is-positive-zero
*
* @example
* var isPositiveZero = require( '@stdlib/math/base/assert/is-positive-zero' );
*
* var bool = isPositiveZero( 0.0 );
* // returns true
*
* bool = isPositiveZero( -0.0 );
* // returns false
*/

// MODULES //

var isPositiveZero = require( './is_positive_zero.js' );


// EXPORTS //

module.exports = isPositiveZero;

},{"./is_positive_zero.js":66}],66:[function(require,module,exports){
'use strict';

// MODULES //

var PINF = require( '@stdlib/constants/math/float64-pinf' );


// MAIN //

/**
* Tests if a numeric value is positive zero.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is positive zero
*
* @example
* var bool = isPositiveZero( 0.0 );
* // returns true
*
* @example
* var bool = isPositiveZero( -0.0 );
* // returns false
*/
function isPositiveZero( x ) {
	return (x === 0.0 && 1.0/x === PINF);
}


// EXPORTS //

module.exports = isPositiveZero;

},{"@stdlib/constants/math/float64-pinf":45}],67:[function(require,module,exports){
'use strict';

// MODULES //

var betainc = require( '@stdlib/math/base/special/betainc' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );


// MAIN //

/**
* Evaluates the cumulative distribution function (CDF) for a F distribution with numerator degrees of freedom `d1` and denominator degrees of freedom `d2` at a value `x`.
*
* @param {number} x - input value
* @param {PositiveNumber} d1 - numerator degrees of freedom
* @param {PositiveNumber} d2 - denominator degrees of freedom
* @returns {Probability} evaluated CDF
*
* @example
* var y = cdf( 2.0, 1.0, 1.0 );
* // returns ~0.608
*
* @example
* var y = cdf( 2.0, 8.0, 4.0 );
* // returns ~0.737
*
* @example
* var y = cdf( -1.0, 2.0, 2.0 );
* // returns 0.0
*
* @example
* var y = cdf( +Infinity, 4.0, 2.0 );
* // returns 1.0
*
* @example
* var y = cdf( -Infinity, 4.0, 2.0 );
* // returns 0.0
*
* @example
* var y = cdf( NaN, 1.0, 1.0 );
* // returns NaN
*
* @example
* var y = cdf( 0.0, NaN, 1.0 );
* // returns NaN
*
* @example
* var y = cdf( 0.0, 1.0, NaN );
* // returns NaN
*
* @example
* var y = cdf( 2.0, 1.0, -1.0 );
* // returns NaN
*
* @example
* var y = cdf( 2.0, -1.0, 1.0 );
* // returns NaN
*/
function cdf( x, d1, d2 ) {
	if (
		isnan( x ) ||
		isnan( d1 ) ||
		isnan( d2 ) ||
		d1 <= 0.0 ||
		d2 <= 0.0
	) {
		return NaN;
	}
	if ( x <= 0.0 ) {
		return 0.0;
	}
	if ( x === PINF ) {
		return 1.0;
	}
	if ( d1 * x > d2 ) {
		return betainc( (d1*x)/(d2+(d1*x)), d1/2.0, d2 /2.0, true, false );
	}
	return betainc( d2/(d2+(d1*x)), d2/2.0, d1/2.0, true, true );
}


// EXPORTS //

module.exports = cdf;

},{"@stdlib/constants/math/float64-pinf":45,"@stdlib/math/base/assert/is-nan":59,"@stdlib/math/base/special/betainc":86}],68:[function(require,module,exports){
'use strict';

// MODULES //

var constantFunction = require( '@stdlib/utils/constant-function' );
var betainc = require( '@stdlib/math/base/special/betainc' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );


// MAIN //

/**
* Returns a function for evaluating the cumulative distribution function (CDF) for a F distribution with numerator degrees of freedom `d1` and denominator degrees of freedom `d2`.
*
* @param {PositiveNumber} d1 - numerator degrees of freedom
* @param {PositiveNumber} d2 - denominator degrees of freedom
* @returns {Function} CDF
*
* @example
* var cdf = factory( 10.0, 2.0 );
*
* var y = cdf( 10.0 );
* // returns ~0.906
*
* y = cdf( 8.0 );
* // returns ~0.884
*/
function factory( d1, d2 ) {
	if (
		isnan( d1 ) ||
		isnan( d2 ) ||
		d1 <= 0.0 ||
		d2 <= 0.0
	) {
		return constantFunction( NaN );
	}
	return cdf;

	/**
	* Evaluates the cumulative distribution function (CDF) for a F distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {Probability} evaluated CDF
	*
	* @example
	* var y = cdf( 10.0 );
	* // returns <number>
	*/
	function cdf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x <= 0.0 ) {
			return 0.0;
		}
		if ( x === PINF ) {
			return 1.0;
		}
		if ( d1 * x > d2 ) {
			return betainc( (d1*x)/(d2+(d1*x)), d1/2.0, d2/2.0, true, false );
		}
		return betainc( d2/(d2+(d1*x)), d2/2.0, d1/2.0, true, true );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/constants/math/float64-pinf":45,"@stdlib/math/base/assert/is-nan":59,"@stdlib/math/base/special/betainc":86,"@stdlib/utils/constant-function":269}],69:[function(require,module,exports){
'use strict';

/**
* Evaluates the cumulative distribution function (CDF) for a F distribution.
*
* @module @stdlib/math/base/dists/f/cdf
*
* @example
* var cdf = require( '@stdlib/math/base/dists/f/cdf' );
*
* var y = cdf( 2.0, 1.0, 1.0 );
* // returns ~0.608
*
* y = cdf( 2.0, 8.0, 4.0 );
* // returns ~0.737
*
* y = cdf( -1.0, 2.0, 2.0 );
* // returns 0.0
*
* var mycdf = cdf.factory( 10.0, 2.0 );
*
* y = mycdf( 10.0 );
* // returns ~0.906
*
* y = mycdf( 8.0 );
* // returns ~0.884
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var cdf = require( './cdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( cdf, 'factory', factory );


// EXPORTS //

module.exports = cdf;

},{"./cdf.js":67,"./factory.js":68,"@stdlib/utils/define-read-only-property":271}],70:[function(require,module,exports){
module.exports={"expected":[0.9999994144224417,0.98023527470926,0.9999879849607394,0.9890762096442327,0.9999995128485044,0.9999907082226325,0.9998426616459462,0.9903653176282536,0.9999966148661397,0.9999835730166164,0.999999950730112,0.999955444763931,0.9970599933425248,0.9936671873707833,0.9850409690454731,0.9998824567112479,0.5004221528201833,0.9999494633025069,0.9999998097082518,0.900796586721218,0.9999977264195722,0.954289534694277,0.9950754220158464,0.9873976911991023,0.9932137226534721,0.0007537315602403216,0.999999831780781,0.9999590889176406,0.9661192498788708,0.9999999821166026,0.4814251335885086,0.9953335954580393,0.9999784693203004,0.9999837450038827,0.9999001858276976,0.9998217725378433,0.9993768829754295,0.9993624439892816,0.9965712823967277,0.9999999786279994,0.9996970460145516,0.999910270560037,0.9999764588693565,0.9999998290485075,0.9994454700520027,0.9735635207437324,0.9992328380175217,0.9996542436887432,0.2840911463563456,0.9999950574431271,0.9999954298226327,0.9999999364994385,0.9998433495181687,0.9988770728607405,0.9999999552984655,0.9584640353821279,0.9999941196611781,0.9992495882003685,0.9993973074710518,0.977725174666435,0.9999818178250124,0.6096837601674038,0.9999977978953349,0.9621096249978566,0.9982543629298424,0.9999197189877402,0.4015448508222104,0.9999999939879245,0.9999918292813912,0.9999985233082844,0.9999851297052638,0.9999999956084951,0.9999731697734584,0.9867247816901106,0.9982284385410283,0.9922139071960145,0.9999997143241792,0.9108897073919524,0.9967880121239507,0.9953523199470138,0.9997447326530406,0.8671850677760893,0.9999225432196253,0.9998177946182543,0.9999994758287791,0.9297862820167586,0.7233319834631149,0.9999892947280815,0.9999999581351143,0.9983573001366844,0.9997463465065413,0.9989598065742771,0.9751827917724827,0.9999999973736109,0.00021774144999325888,0.9999991894542395,0.9993293964213236,0.9999997892271759,0.9999984518894875,0.9999925707886279,0.9999770881625232,0.9989979738672302,0.7796496773926194,0.9719732292168668,0.9991834690232514,0.957980614933504,0.9999999952797872,0.9998452069954852,0.9667052165312573,0.979853127739811,0.9999473886076335,0.9999999909907691,0.13999585651242996,0.9963126431606563,0.9258673788690689,0.9999985553619142,0.9999960554477285,0.9999019759453889,0.9999586748114523,0.9998673296341909,0.9836732406687178,0.9999997691888163,0.9994421322203155,0.9997678098068665,0.9999974753708365,0.9845132549402644,0.9998320597678062,0.9999159331218316,0.9834299314991013,0.9999999833619944,0.999953166171905,0.9929679255954922,0.9994810947251735,0.9999878665281612,0.9999999535848374,0.9999976352944018,0.9999999078001078,0.5406364589872175,0.9999969077586113,0.9998188911672896,0.9968375901988565,0.9999901754672182,0.9975036445981715,0.9999999865505744,0.9994746270426607,0.9999999461683915,0.9700233190710722,0.8659477692817608,0.9999999985863552,0.9975474296578773,0.9999166587214909,0.9983633393653089,0.9644327221269512,0.9999775257788374,0.9867882746301284,0.9918237949397749,0.9999850511810999,0.9997253295992065,0.021715179606559817,0.9999090459546116,0.9901480275537317,0.9893622016155545,0.39072863512379213,0.999999992726365,0.9926460914024986,0.999120667125043,0.9856502385081343,0.9999914943771937,0.9999910645887466,0.9999999972314959,0.9999999629703873,0.7185892064717433,0.999998946871017,0.930482881625938,0.9981519667887329,0.9989599647337803,0.9983471070746217,0.999999684746659,0.991882694939032,0.9987988012252693,0.9999932813339697,0.9598861200608274,0.9998675070491505,0.9897924938465072,0.9999284373620847,0.9999997403023397,0.9998431039085606,0.9999999324913087,0.9924598625506981,0.9999942293584101,0.9999259350611942,0.9996909324527137,0.9999468731124461,0.7078490180220531,0.9615460134398297,0.9998779885242022,0.9777566145204923,0.9999847348741409,0.9475964857813816,0.9998749302786116,0.9867170582156612,0.9993493829776277,0.9998413101545917,0.9999994075207708,0.9999977699825939,0.9802982191427876,0.9999196729260953,0.9176958454711073,0.948945888972708,0.9999982828872658,0.9258241840192184,0.9992079287640874,0.9996649953835534,0.9998593064689885,0.9999799522185907,0.9999856908386837,0.9993195269147945,0.999875220213362,0.9965681498686734,0.9990910600240854,0.9729811623628863,0.9922963091797468,0.1423243068251888,0.9998418890913578,0.9999993256528878,0.9999994249278876,0.9044765530100531,0.9775733371005674,0.9909925252684354,0.9999891850256781,0.9344866774109267,0.9999999713120951,0.9999999981553903,0.999984423909821,0.9999793723109108,0.999994108733467,0.9993865830115181,0.9997063056955715,0.9850389440975738,0.9408634202335961,0.9995742813820507,0.999998819233185,0.9997467779715192,0.9760474331618603,0.9999999115051376,0.9999917110743248,0.9999999933579666,0.9999999244437612,0.8768274980815303,0.9925952191411749,0.9849751789726896,0.9891251151409817,0.998987721827628,0.9996187895408994,0.8005241049642933,0.999979747813594,0.9999998558026862,0.9999325751547496,0.9999852695074587,0.999999968724816,0.9999946565479887,0.9998777367584496,0.998676858196508,0.9954995493907026,0.9999996553653167,0.9904243602925034,0.05549009893722082,0.9552089584880381,0.9956486282411381,0.9970559101748624,0.8741548498315599,0.9999999119910193,0.9999720784730132,0.9997943508443639,0.9984555499543815,0.9999989490308321,0.9999850615746577,0.6185125852792,0.999445342137002,0.9999690626657599,0.9999999497322378,0.9999004763912465,0.999999576977781,0.9887980891124859,0.9999999983682717,0.39315600285825286,0.9929954277584705,0.9809993271778368,0.9835638566585757,0.9998876805092207,0.999980813141528,0.9998527983528809,0.8801150398597467,0.12548315640104846,0.9999955544798234,0.9999735366617784,0.999999884533841,0.9833765113509125,0.18227294686345843,0.9999991965837286,0.9999884515287975,0.6148095162464619,0.9575405316011744,0.9979525014653099,0.9478511298655845,0.957724345952171,0.00022340379972975998,0.9997419065889628,0.999845204889636,0.9993526518042832,0.9999999853660331,0.999998512251397,0.9999470711446969,0.9986712266926251,0.863386689111703,0.9971423246026463,0.9999999417345136,0.9995859848140096,0.9990174430501733,0.9887730280015672,0.8465054679460955,0.9999999531131707,0.9600089765242223,0.9861377574963806,0.9995533534606394,0.9412307996439483,0.9894194880367707,0.9975346647848259,0.9999999963128465,0.9999986701253791,0.9999759245078044,0.9999320490545629,0.9923091659954605,0.9980795287155908,0.9999849464709825,0.8634377683760294,0.9995149642738038,0.9991638642946616,0.9716631703457392,0.9997786496710294,0.9999985701588037,0.9999987459342684,0.9988656766790047,0.9999873203727045,0.7066497612902259,0.9992676442834019,0.9970026566153043,0.9736845942001893,0.9991056509258125,0.9998790875996459,0.9999997972672754,0.9330782953621274,0.9934977511019468,0.9982055568600325,0.9999965953259025,0.9966143245921838,0.9785803097473905,0.9994921072100897,0.9876748807552934,0.5916788822241393,0.9993905668095027,0.9999994325225723,0.8710532948762194,0.999986172507455,0.976835804899177,0.9961596708790581,0.9999748894398808,0.3550687848163427,0.9999980885614543,0.9997885203489764,0.9999998902934215,0.9989245585355064,0.9999968100790368,0.9999995708517977,0.9999075599840517,0.9999999935128949,0.978834932433168,0.9990509818448771,0.9999550136880287,0.9999999924698182,0.9999983672926307,0.6538976723248267,0.9999959473653839,0.9917924747532186,0.9999570384483758,0.9489247209741695,0.999453656707352,0.9999990261467331,0.9999999994522517,0.9999984346225297,0.999895190401162,0.9941236055376355,0.9997854619998774,0.9999825770058464,0.9999964549759972,0.9999999550489296,0.7040681530008666,0.920239858920041,0.9175331374449903,0.9999870263212358,0.9999985109638134,0.9997378617720105,0.9999839255890526,0.9996467327755068,0.9999978156496487,0.9673749163813172,0.9999991094293146,0.9823002086183885,0.8801870741299163,0.9999780856979,0.9995822053328204,0.9999994102985912,0.9997223004912323,0.9989132199011193,0.9985969637941794,0.9999899433991251,0.9999999828167783,0.9495301222623744,0.9988985934390525,0.9999982532905749,0.8362771294586495,0.9994650767787523,0.9999737021352576,0.9948653131207245,0.986524207409153,0.9750367732798815,0.959426972904102,0.9932711353002874,0.9999934078444135,0.9994665050288263,0.999990752225679,0.9999998965863435,0.9999946618163668,0.9998187268745444,0.9998135291578896,0.999999665851034,0.9999990743968201,0.9999998021808673,0.9999965888348173,0.9999937441992675,0.9967132494736028,0.9982786558924596,0.9169180396211148,0.9501761121581447,0.9988965473833755,0.9990533977199825,0.9999995495036414,0.9999999770784882,0.9788860302889012,0.9570692002758263,0.9999407613478427,0.990392058004578,0.9783005255525867,0.8999385822794183,0.9999910203875002,0.9999735159012073,0.9999999992825438,0.9988562693731244,0.9411628419229702,0.9708668217353853,0.9966147660947362,0.9255044207364385,0.9977705993684778,0.9996733620234268,0.9999572518806443,0.9992216847877093,0.975422290568126,0.9871729211533173,0.9985920026547247,0.999999991474172,0.9999808462856061,0.9987683272515913,0.9999981516946627,0.9999894265022047,0.9983301749374462,0.9247749757766374,0.9999962979947461,0.9940028825261564,0.9997390443134504,0.9999999312189045,0.9998382115602369,0.9994362129287253,0.9999659101534599,0.9930105962876945,0.9999992143087967,0.9999995715132626,0.9978342586482762,0.9999951879435944,0.9978851432491471,0.9999165876221037,0.8245736973797424,0.992693790522952,0.9999996822753097,0.9997209663303026,0.9997554199774676,0.9999674705768391,0.9980911104115928,0.9953516292174878,0.999974576289804,0.9999926617809003,0.4677452631034526,0.9999569194458865,0.9970244862532849,0.9999986609664759,0.9999996332516543,0.9999999821758252,0.9999704891468213,0.999997225459716,0.999999865146421,0.9868082913949918,0.9961568317916154,0.9973423084830577,0.9999587300890038,0.7147334038563393,0.9741168863898987,0.9735893051856099,0.9997392687286675,0.9999761557138291,0.9999999499855595,0.9999904458264044,0.9990609464114868,0.9376866980415354,0.9999471585177082,0.9970226600519219,0.999998110922504,0.6412778901952454,0.9998864654686694,0.997752814375778,0.12354214157618477,0.9995712259728183,0.9786403322956823,0.9999462886904549,0.999999879455362,0.9999980970983434,0.9973907187377262,0.9999911257736602,0.9999792584334666,0.9996485681841756,0.0032502307483239113,0.9999968625870582,0.8881895583059345,0.8048386085285308,0.9990597183614902,0.9728887652140293,0.9999754138170198,0.9999874722611612,0.9737145458811326,0.9999999090626224,0.9922790731282054,0.9992787703929249,0.9999993322885337,0.9999221987299485,0.9977520908195787,0.9999477236750216,0.9997906484338888,0.9999165212469345,0.6728294906008239,0.9845687958715095,0.9999996784084226,0.9970992066213844,0.9998984884651276,0.9997707325966636,0.9996680839511474,0.2533267930625849,0.951808263135062,0.9975063222639546,0.9999999559946005,0.9999759809005582,0.9995349529113711,0.7155453486784356,0.9999990174028996,0.9998968604272612,0.9986104594433858,0.9993394502609809,0.999882231522938,0.03426630530293804,0.999999725428004,0.9989090169471229,0.9999970595735292,0.9998097690283194,0.4725458261332921,0.9822319262106615,0.9540161388061748,0.9994104233084142,0.9999940380887705,0.9988895728481371,0.9999818270445875,0.7246278859255915,0.9813548498439799,0.9977370401890561,0.9998531014468927,0.9997706316231277,0.9999998438029774,0.9999990233533065,0.9977698719674877,0.9999999571983076,0.9999988062162968,0.9999354192394455,0.9997455083560265,0.9934915208029143,0.9988131676291445,0.9999842310242609,0.885856181071357,0.9999850426345287,0.1769512308278049,0.8897149630540009,0.9987248545582936,0.9646167440501503,0.9999871075443884,0.9999743292896248,0.9560410732592611,0.9999999716393365,0.9997572515906357,0.9999999994934102,0.997921363753246,0.9999770913783994,0.9987433608999556,0.9718959722226033,0.9999999914507638,0.999997823480627,0.9992853821677268,0.9999778698188481,0.9996521862511678,0.9999998001000037,0.9999473904111851,0.9999597682592418,0.998538866220368,0.99984050545495,0.9999993799485676,0.999954458181016,0.9961148447222985,0.9230177179737737,0.9247688391477724,0.8388269263148713,0.9982389661478874,0.9999990111747179,0.9999992853711586,0.9998680849079618,0.9999286816470955,0.999999571593767,0.999996575953223,0.9455561092802598,0.9980111690283104,0.9998036442700309,0.9998665130820851,0.8845446477678548,0.9608650979864726,0.9999998997752997,0.9868480898227483,0.9999739312785796,0.9686419191567451,0.955075748485253,0.999999997320832,0.998252112148833,0.996682764927842,0.9636212760524039,0.9995285959079394,0.999999707384085,0.999910227192049,0.9999615691895991,0.9999996503828404,0.9999999724225729,0.999697552406894,0.985940427218947,0.9999922019494984,0.9998629388180696,0.8636837639013444,0.9999254021085497,0.9430885873265464,0.9986510542379516,0.9999320136169205,0.9993010290705415,0.9999969368589123,0.9999970407867448,0.9999949710861815,0.9999999407784028,0.9999998387529438,0.9998698100358943,0.9987994612009786,0.9994080170039261,0.9995183120042517,0.9993600706204996,0.9999995914818227,0.9953691562725513,0.9999815979344154,0.9998769154367038,0.9999297841504895,0.9158813949066176,0.9999951219578747,0.9999999789517094,0.9894476834066306,0.9999915613115549,0.9999999333486622,0.9999854735423598,0.9999783349582267,0.9998021534721026,0.9999995811259635,0.9985780239163183,0.4485117987142791,0.9999842245971764,0.9998233236776959,0.9946493798757019,0.9999465714336662,0.9490614620341539,0.9999993730101833,0.9999999990807372,0.9983583501722859,0.9997262922984833,0.9987648390764536,0.988203237238902,0.9802282697450297,0.9999674081585012,0.9970707528459428,0.9999648726042993,0.9999993786638812,0.9980201145229906,0.9966883120100871,0.9999065121523318,0.9992914598927092,0.9999998851290891,0.9998039003696673,0.9825332427596898,0.858963345117377,0.4945086769719949,0.9989398861761591,0.9865198426125514,0.9916856360501975,0.8926346625312103,0.9999830095570716,0.9999997058910002,0.9661938841845991,0.5820328273362542,0.9152089930191518,0.9999962122736243,0.9976962323984253,0.999995281849249,0.9999908979280911,0.9996349911515043,0.9956602071495062,0.9999999826065404,0.9990298798437092,0.991180558779215,0.9999948630443143,0.999981985964487,0.9999757814519405,0.9999954303259408,0.99944960026723,0.9929102332249871,0.9999593272504177,0.9998796888969581,0.9833829902734548,0.7018007870222441,0.9888016052280288,0.999996827627661,0.9999975981443958,0.9999999723440669,0.9999990433684194,0.999999999524993,0.9997210164567834,0.999989000843536,0.999999907361155,0.9999950977273053,0.9929616349181165,0.9999995529487069,0.9872170385151235,0.8165465760828888,0.999619087064919,0.9357797041406457,0.9999966644368186,0.9999291912048498,0.9999987628034364,0.9333118054202845,0.9997354430722232,0.9998499384055253,0.9996679689547779,0.999573356918397,0.9999999437432873,0.9999998261952874,0.9999500648590889,0.9992449417326741,0.9790083260202875,0.9967082975940763,0.9688373850933277,0.9999998318485999,0.9999997575543527,0.9486198540285784,0.9999717518668468,0.9974068330737238,0.9575544043264866,0.9931821935461582,0.9999372812737031,0.9925430895076569,0.9999289921050484,0.9991843770903612,0.8872946399604067,0.9999981055390701,0.9997344458609982,0.9987361383454052,0.9999362667753551,0.9999998077099816,0.9962837799003361,0.965429972262341,0.9956078388834463,0.965023763878343,0.9713929846589591,0.9981269052493615,0.6232490046876882,0.9875090930488779,0.9978686337274485,0.9999999975604812,0.9999994608315874,0.9593444683067174,0.9999682221779627,0.9999979382981429,0.9094125721215547,0.9997501475360264,0.9943016356877776,0.95840519955646,0.9999997439359547,0.9999999995491207,0.9999993606400711,0.9999977539995013,0.9959948227657397,0.9998431808761169,0.9999532837899898,0.984473144124069,0.9870197426278631,0.9988273957943821,0.9992235952176549,0.996655398096898,0.9659344898868196,0.9900567858509983,0.9835387901617746,0.9693307763290682,0.9999998792594531,0.9999998621751409,0.999992572899178,0.9844182903777996,0.9190006573331884,0.9998959162799209,0.9999393988484262,0.999987448843762,0.9647467891274872,0.9999999822141012,0.010417475348067178,0.9642420202373536,0.9999998933651724,0.989306390878046,0.9999808530207581,0.9057214632387103,0.9994949057994233,0.9991739913088109,0.9998765498194504,0.994231312908983,0.9999875608968976,0.9428951497673244,0.996395572189516,0.9999990403794747,0.9999998917469191,0.999370059904473,0.9999853890506893,0.8882825137742025,0.9092023811390377,0.9912327940997785,0.9999583466559483,0.9715445742719622,0.9998499195511064,0.999943409198885,0.9999602362847576,0.9998735097545399,0.9999745392669133,0.9956417760003025,0.9999999991325629,0.9995444386732805,0.9990808452305904,0.9999999970016132,0.9973316812904363,0.9999970001568432,0.9999832130399409,0.9999989393289482,0.9999931553384489,0.9998252258204097,0.9997540685632078,0.9999910996499082,0.9998110773503988,0.9962498994185995,0.9998619839069225,0.9907986512350118,0.9999994337912284,0.9991272811974437,0.9999992834886018,0.999594246052622,0.983067770762859,0.9823361041474328,0.9999996772806605,0.9999994904419014,0.9999415174022641,0.9999421681550604,0.9999688894338223,0.9285374821087169,0.9532885570095126,0.9473898131830418,0.9433366722373171,0.9992169112724257,0.8978383294721999,0.9996371199624574,0.9992928716020268,0.9989927875428318,0.43299765338647084,0.9673508304397604,0.9653758087112844,0.9992460116151332,0.9373610759133725,0.9923782868565816,0.9999923852611452,0.9956604552698174,0.997538504745318,0.9999999899008969,0.14109268962162974,0.997770473787853,0.43051548759219854,0.978314430080713,0.9999827492986652,0.9830917845570132,0.9999999926063242,0.9262222797734772,0.9958294395868703,0.9963447835582653,0.9999979548250564,0.9746514945810975,0.9999998648244723,0.9997344483178707,0.9993729077670201,0.9999976828156554,0.9974308068409126,0.9804083360292439,0.9999722922267305,0.9914312119953856,0.9999933927190552,0.9996614187562027,0.9418614383710013,0.9999999897508507,0.999999720776714,0.9774354772435411,0.989441603749627,0.9999998838118871,0.07358301345805053,0.1949671499544229,0.9999580295955967,0.9835738839544683,0.7640722070257895,0.9590175175641611,0.5135563374758628,0.9999184378945678,0.9697138146682476,0.9853543346483988,0.9999885951969525,0.00644308024129527,0.9999997315788105,0.8355755937587458,0.9999787127410658,0.9999980045955854,0.9999991584857078,0.46814023738453475,0.9999977351016995,0.8613374521633411,0.9999999994433563,0.9682176196673047,0.9993605930628875,0.999206510057416,0.9999702788484808,0.989359327333551,0.9999998618325232,0.9999971786323578,0.9998713290012797,0.9991266630316384,0.9645614955100248,0.9999769632078426,0.9999991502992077,0.9999509213684992,0.9982752972264045,0.9993650771463207,0.9999999715211254,0.962808777579234,0.9995488864912242,0.9999999942543931,0.7147823686122419,0.9999971584595,0.9999861965307493,0.5012615376318211,0.9997393050431433,0.9999812750277384,0.9992323669380918,0.9303127778457241,0.9979481166736477,0.9998372921623088,0.9996587404403823,0.999999952304186,0.9996996544681689,0.9991950339514557],"d1":[5.765190199954815,5.067713667828951,8.737391882734514,1.333538445846787,8.240907653772267,8.495243749059965,7.248169075636753,0.3497891299788347,5.953682440819639,2.08147174825835,7.224398729216075,3.7036398832469164,3.1959315901275165,1.0758884937677071,0.5484309063309145,8.884359814944997,5.0262650168238405,7.065540704690834,9.571494661896034,2.5576319116391533,7.22807473684875,6.047189970456877,6.328776993458039,1.430168312613962,5.593370465370747,6.280888327965024,6.055157440605137,5.954164204577772,0.44978994422594454,5.883668003465208,4.986264987499263,4.592058609003324,9.643540826102646,7.108134318218244,8.176932316998881,7.021764625095164,1.5110798980759754,7.105365399951243,3.2067431035023075,8.871697464913055,1.0894394184066591,2.8058131150435717,7.245625963082524,5.506857217061052,7.293342491694396,0.16716677504060362,6.984771561825189,1.198871950030902,2.9567369027247503,5.307141307162626,2.248161399776414,9.52983831613036,3.9406556833399953,1.4127399357123571,6.986130136790443,3.1700575636184847,7.849520606637936,5.769034672651978,1.2885892501364116,0.21361455127465012,3.102297008689654,9.653714476659381,9.45267663157393,1.7338753003843466,4.277506643369704,3.853430433665559,4.719290060349346,7.909701392751661,7.446119005941638,8.594044954502573,2.568131059265737,8.341259514708053,6.481434177642509,4.096989684130124,1.4810155033579542,2.512103277926503,6.163557415984206,7.516864826444191,7.189624533528319,5.161654855606937,1.2833776998882107,3.1452725605339826,3.74603609921917,1.353768294821549,7.333562838228904,2.5781313274313655,1.2864532931973294,9.772530590596503,8.601708206858705,2.377003628629051,3.9116179979623245,1.3970225511106893,1.8073882336603764,9.755284286214627,9.229479057811398,7.314280809756982,1.3505407665280744,5.791827553280042,4.4343115463091,4.6768323674205,3.1029628731363568,2.5593273927841764,2.41835977005193,1.3549655463474397,1.1596889809099808,9.739183020580708,9.70606375602709,2.2888695241939527,0.5206090417876386,8.72296137868586,1.5033436649855614,7.4358728140940205,9.264364287559204,0.3495416167902299,6.389490045971737,9.36414898319465,6.029612167458101,3.8997299876118707,4.174159802976436,5.200058327466199,0.2648958471969687,7.071833633762008,0.8809894890596071,3.50029646175698,4.856261642681609,9.70854122045064,0.9738874861524893,8.11376217744641,1.4001417659149573,6.0001115316921645,3.7148247904966913,4.827837908407854,6.158696551838201,4.2105058106539595,8.206747953285031,6.052826110382245,5.655348912721008,3.990882304806833,9.904447994570653,7.988035976053533,8.08266170414882,9.979045775771185,8.66445678211325,8.998071951017426,7.734817135946985,7.363815229449255,4.834697436223272,1.2974706925349833,8.60085210605611,2.4229039248033812,1.7051890877779141,5.3812520515016775,0.045850638876703265,9.114880213200367,8.997283870929456,6.641077402686399,4.382996719472834,6.290463814834693,3.8696580849813333,6.244656366184276,0.9198184365911133,0.3427490856943205,6.619196637417981,9.765497279807228,4.456858207306933,5.8151436921362,4.059618902701336,2.7818000855524683,6.431731432356862,6.9672852041632405,8.20817490236093,0.9560389176805284,5.105994764885635,5.81986435982582,6.230783067527863,2.3602164398244208,1.4065141882962329,5.291853863968923,3.109877968085719,3.541962913465444,6.593767769091061,6.527553900718086,2.6215788521976613,9.248466307841428,8.554736620457433,5.216421844179839,6.10928590028506,6.832148695691034,8.701075352271674,2.928996460264637,8.640247569728059,1.957417911890973,2.609059231379387,6.605187472240221,8.112122386499452,3.803329748508264,7.493091093270802,4.295083953954368,0.1766721167022678,1.8099270988913307,1.7149509570930377,3.5582135467567766,6.917709182897383,9.266512474846012,6.875169329179633,0.19585792623991738,7.031769297642317,5.149332075049255,0.5844638425857585,7.1839155112093,4.060491392105778,0.8667064252045642,1.1110804289082354,1.7183228587343824,5.459351213976111,6.311346467571541,2.1724926499746577,6.238219591356675,7.014781244607939,2.1158634871530024,0.25908107657593105,1.4799445880335793,9.956125444406167,6.218058322652715,5.354678915561437,3.360881826956834,8.63829008970066,5.565331537307127,2.9069350012504547,5.7114641155339445,2.100856351689029,5.865261981228795,6.991258320751839,5.06339986931204,3.5854398978957946,8.322369332757786,3.657093072463915,1.1682677077520687,3.077998682262588,4.912650204361537,1.614577351313462,5.610470961751317,2.330133534873393,1.582484146569183,9.280973372472175,8.080443718340074,9.85048030352356,6.67294961359949,5.907791737209978,0.7440006421046341,4.316458386807263,6.426451225612528,0.7681074742815541,5.634605842476463,4.361431295954123,5.442776649127625,4.995377372665959,4.079005461390275,8.200690315503534,9.334503217178586,9.880919645872961,7.931696977283941,3.5350808209572104,1.3744250021957094,7.079638380945923,0.6959080631159287,6.356147549657212,2.553796621352118,0.4468896866744543,1.9226900954329063,2.148711790825517,5.541117634299992,9.767812828562104,1.92653236698076,9.807622611505248,3.4911568815258187,2.882866844369849,8.719323651003041,2.8575197297356647,9.485952717155195,7.387932219555092,2.6486530251967655,7.293887952443335,6.39397043423394,7.486965725368025,1.4759566182349526,7.990746165373546,0.5954593936197394,8.42163586916384,3.6203990347104975,4.368675329430705,4.698715789007966,0.17487039009032257,7.842401342925798,3.065019074018973,2.003448016272784,9.131722140496233,0.02293676423904767,8.122311637380054,5.003155759774012,4.875041218541436,0.8596750694142097,0.5173018843850663,3.3372820192081365,0.5671199245601422,2.58136121539996,8.526201453748726,2.9460118120543166,1.0783631549235118,7.403096134039511,7.979193317000002,9.397129179026658,1.6266498121712059,5.810880798421825,0.4848997745089956,2.9437114106418316,8.894584712753005,3.638600376802117,7.023288532457244,6.604100126677146,6.388671272769388,9.510703632350232,0.018178770546752876,6.453765412634899,5.613123059605236,5.7976521480833405,4.186690786458556,2.002774168324144,8.629090120797589,7.687726538741875,2.1840926448414866,2.234660213266899,0.6444423698475488,0.8047980584522896,8.964970231511387,8.499167370551184,1.2203007342231498,0.8642284017703883,8.445922652115083,7.471418471288684,6.393291029971236,9.533034593147319,0.9806001875709636,8.59220846283591,1.6589665041206736,5.757785442233068,7.005766681712964,2.021130828631401,2.4854064718488234,2.87361211945524,4.847855485691637,0.1959832713113152,1.2967563655391978,0.6100052031128378,6.735887620524121,1.6854755614050387,4.55253435335687,6.7507788690899435,4.23765542893096,2.3401764796700775,6.4419834191565855,8.69501769081696,3.9491918962108707,8.470490119478873,2.5484119164716157,5.414815276409284,7.300935282152179,5.506515961993424,5.787460661676178,7.089197110412617,6.323332927901342,7.483266861249356,4.6486166658436145,5.822434670073746,9.034868864787558,9.98354088812744,0.08194839838494117,0.7414339189413655,6.848264513976892,8.510892753920913,9.94471226042224,1.8699965484091607,8.396321958190285,3.9623488405063556,9.143436327153937,0.7400473203918834,7.36377637413546,2.7577055768300918,9.592324032796087,8.040683563268763,1.5800951433175703,3.6566344413401763,9.079295191141131,2.859681905011837,4.9881134231640445,9.219999279326881,1.8166306508603403,7.742600575190215,7.645329305703347,2.979059255418941,5.37886415043852,5.922074091147007,3.613098568013966,5.957700686504193,5.637848691582448,3.422823580449823,9.237453342337123,4.125268652947296,9.187277716302283,9.761628244380143,4.207095947738755,5.2007372654958655,9.535097110227186,1.4181387769202214,8.027145553675384,5.509457802628939,8.220840879316453,1.7252484873540408,6.162833576334085,2.842311708235963,5.3714502339186465,4.107427274711998,6.860428047381275,5.7604234727972825,4.475975948431119,7.146281174212918,1.7656875265289096,1.345830737383873,5.285590306687517,4.790718141376786,7.967400754172198,5.5365142398226075,6.579649967966377,7.190283967266935,4.260039684336272,7.078127504247447,8.761506992667421,9.215878898886736,3.8287386948186564,4.181998193579823,5.426727376183105,3.288750681415429,9.029150451839616,9.838300195764722,4.668862236843445,4.7626150116563455,5.720206338115458,6.3685118965665,0.44188407070296254,0.4190735594823858,3.452351599275636,0.5502299533378596,9.76717949731438,2.6709827537637865,3.3633764101907304,5.508674517367796,9.47936470250095,5.936855201413154,7.0787520194576175,3.0730056076938417,2.272582500692304,7.350943824434526,4.470103182170455,2.6294980480073527,5.200745773173794,1.2732191771349988,0.9677726395476616,1.056745883800212,3.440509338324973,8.37141723128649,2.6264904193762995,4.626645178093658,4.11665634930209,9.913642995189262,4.399498903938026,5.392279494745087,9.562528191031996,3.0986606419737606,1.723895722777351,8.664817848711754,8.655984004505724,2.6612141261246713,4.468004430027552,3.687775791820296,8.228831938356716,9.63970453691151,3.815897881007404,7.083623423124585,3.04396181471122,8.355485073874394,9.613155336757517,0.4349003269938301,9.806769937727488,2.6262116240506828,3.1220891963916864,8.270612006378313,4.526698904311843,3.41694249671036,5.828842371053156,3.6360742830977544,4.59767677993759,9.957390580454604,6.136009187047524,4.222141735998203,3.075128971903689,9.966515205292673,6.472048463059259,2.861549652873414,9.603841084169535,0.4106601537800403,7.021745336134035,3.9426334442528277,2.9120605437588454,1.2938743958950472,2.5908864091484607,5.279484008926769,1.7280653679883962,8.849558530591036,8.137859223271223,3.4721317866716594,1.1984163147056437,9.361918962611648,3.0850789130284673,0.8503837363218514,4.160930943856473,1.709145139686048,5.441915121965197,1.96765443607122,6.316464461084159,1.6516157614671356,0.07657335896796402,2.94136904182279,3.6581960694093985,7.533485428831542,0.9947740697710783,5.012715132630225,3.735657641809844,2.3281861301624485,9.70771192815208,9.660265994685552,1.8947856976970612,0.3087720705617758,1.4269579328683335,0.4445166822655966,7.519843698007797,5.8113379764253414,0.3895634610656318,7.082859151572434,3.508308761934571,1.8395800985213628,8.207226586998795,8.142081712899255,1.118070293690654,3.5418973565404532,2.602200533011265,1.6956946846215626,2.0125496638118645,9.439546847689297,7.87974977677438,5.921128071634731,3.3610469386674136,9.709940821679954,2.463899646719867,7.752823916275786,1.6685164875570258,6.520034610969622,7.84626352491113,3.2515572188758535,2.222108209592464,2.6690396308893516,8.213347589546068,8.344128435850795,1.6093912250598952,6.789275417765486,1.6995885844310155,8.601216633920474,7.044660905181996,0.6776071285421725,6.178130583827583,7.90359385046713,2.3817334393761014,1.2968159819200409,6.32518805537313,1.8659153829849107,6.663448488898995,0.9818017025198555,7.294636869445499,9.972982140397251,0.9647098720504177,0.7714566293593794,9.251099531954853,2.3151748456343824,6.010155636616641,9.405980777329571,7.86468765318034,9.710115231138833,6.745855030183909,8.59212325070978,3.0539616211187592,8.557153016219278,9.086938724493843,8.166572619111545,7.523084229125385,5.465476749059772,7.169710171816332,0.44833503138307584,1.1775362549398616,0.24905255321116426,8.67065094799763,6.524594176721365,5.942116260600638,7.186254766491135,9.572377398284944,8.477525721546561,8.114547581955184,9.683228427268645,9.786845831496533,2.6225110377486027,9.465847408291168,5.899131739020909,6.175921218686449,6.9955828883303965,2.2142977011706066,6.5305196223009565,7.596862554482806,7.179739632365257,1.1248729292014792,1.6521624956624792,5.520224142359533,6.906642437743862,4.957359266566681,4.3740784578435825,1.0473542747998632,2.055392680317687,4.589877858639555,8.058594553057768,8.031146285846125,3.419840610685654,2.746738357442775,4.962059484322605,6.856892696347828,1.214505525994991,9.42839390102213,3.104921403538159,1.4776687439816083,1.2979385045255265,0.5015183041864169,5.206501107463655,1.521158048373017,4.081237885698348,9.29593539396256,2.441792891569683,9.071462867338747,1.6138387984422065,0.9895608724652627,1.1791341863087346,3.5861439224522096,6.6111513248105975,2.957812444983934,9.127283545921067,6.237300040568739,9.788303561218282,3.875769411818508,9.143809826525018,7.740190250376784,3.5269187471372354,0.3857856121761549,6.428835949005305,0.22166216274233985,0.8213065701942246,3.411569929263807,8.849351222214931,2.60738187716379,5.816357017348482,4.484700922932361,7.114558190293976,8.998632038994252,8.97887319987465,2.5742134752993318,3.746452923790875,1.391257953491165,1.1680120534931215,7.8186536743336355,0.7976559753238921,7.358495772514464,3.158108681853,7.592399545086312,7.140573725245314,8.701521562716936,5.893377230209178,8.567772362695354,7.879637076932539,8.39947077938793,7.8035318354738115,9.332795256997127,6.232602445552664,9.989150048453057,8.436622027270024,7.660189309338543,3.010265425487173,8.207457433997938,4.466845234540804,3.7522931306921947,1.1572517214998679,8.118366515982789,8.557291556150144,8.833057360499726,7.814196254278043,0.9095971965526783,0.9508901794189217,0.6371242462165716,5.690526481423879,2.1406974351398333,8.757598925893568,8.905504652510539,7.626790672895902,1.1952557987030321,7.439193748100892,5.3660110015381735,4.677449259383312,4.596609566626819,3.619156966811279,0.7060847169365525,0.89402173647529,3.9637349161884217,3.606128212032309,3.5217649003886753,0.2973492889514606,5.884589510729798,6.844442729864122,0.8542739726955206,3.6782392405014197,8.136127323648935,6.140543210584237,1.2658633204183212,4.019423409705151,6.104563756001921,7.8216371287494635,0.6268033611667478,8.65125239783039,0.5819534716363317,2.0460358088246244,4.327584896467888,2.215238047567476,8.630716364729738,2.5897300408788237,2.0998918217532414,3.468510789360748,8.089827125949512,1.526245115119118,5.984027502953508,5.604732228344451,4.797191548269934,2.9657748034350617,9.295845852187325,8.857684776848897,6.475840750966244,9.72909902094635,9.758915541055151,6.383012048491741,7.615493687636812,3.8554837584231016,9.261734474613643,7.097101120755562,1.6231562376501008,4.397762744518099,4.444353567206695,0.5083717928991893,2.289917613220991,1.688479768933231,8.169276465192844,0.06837565797408907,2.716658900820821,2.8800887825846444,5.915238310239319,6.358172037812948,8.389432229933826,7.453302587730715,6.569682503518031,1.5392778205362778,2.628663054069922,2.979569452835089,5.979844641909411,8.984076584937139,9.424779689388345,0.6059745128933769,7.487611738494467,2.0762383048299116,3.0945788774441363,3.399640711998184,4.723138525444586,0.4551193170250478,1.8967678329051552,3.4365318475190376,2.425251270205935,2.872274363327998,9.957801661048563,3.639529519374478,8.566291543904292,7.013547490754353,2.990192879239608,0.6427199667611738,9.199720928081529,2.314234687424692,1.2722076053933695,8.266964907274675,0.35442462174952505,0.32374662049655667,8.61842204665055,9.060103575273025,8.264966377090047,1.1651891164464145,5.714645124648903,4.639298844706272,0.15330298528065223,3.4278416366900943,1.616739836142862,2.8966709550246605,6.113164213658681,9.039357470447866,8.497298705224418,5.7722354601749455,9.131716576062288,2.3409076000123674,5.421267498606355,0.2970979246250738,0.44830786014802726,0.5673527414951618,3.668011452708595,0.554630080751346,5.189446552085013,1.992260503902299,2.5104777944703915,2.256056720408348,9.196432405604572,6.981591141826109,4.328855791646305,1.4762592276025122,3.558521237037051,3.3845467013200414,9.047805538478062,9.441980297159807,1.56115688163172,9.634205609993934,7.21620309578589,6.596698167779447,6.272509554667883,2.149666983452294,8.982174033347414,1.606864680326101,7.2184877856590735,1.4401068760902702,2.9105096611770853,7.4800481212759955,2.9533025561423076,0.4639077986678797,0.49191279228258944,6.1936025723934,6.892037967587505,8.194547374310872,5.723392065374426,4.392020475717128,6.926571337902237,7.393253932156069,1.5146442729556386,8.61961112138313,8.90296083338491,7.9929302378848455,4.39087915722493,8.594062807973586,2.7569837622522453,4.699206103587745,8.299662396960173,7.036052810155211,9.460086460996175,9.690716254575607,0.8227742515534819,3.4366927257313096,6.7344729711644025,8.461753534301673,6.107820962096644,5.604829596233771,1.1937966091046381,3.2356649939525717,6.935954918813754,5.821403580977167,1.139446268039237,0.3139313871581195,7.961534883499168,3.325703551248016,5.406054877212405,6.033297986885149,0.37215513760237906,0.8794175956939521,4.2551063919115,9.551889529868173,4.50191876189961,5.731594072009005,1.771576282567311,9.69425318284152,3.348779400184516,3.7991170618178627,1.0922796100877963,1.0331100724534714,3.2361748971545823,1.3293681959409986,1.3693335076170543,2.021011199546372,2.6104054226215134,7.2173314717068955,0.13565708083065342,9.096023071631286,4.449665110714673,9.170979088539848,5.167698200951714,6.085153508182943,3.315442477947319,7.99154469728081,8.241833213476554,0.8330783648860529,9.107490580070738,0.3205481692414547,9.106750233652107,9.343725295324274,7.49968038896138,5.793501004513613,9.444743570616964,9.860551331357044,6.513089172663495,7.260969801778203,9.841390409204076,7.340764199634997,3.1246554276262195,5.6537766115365535,1.833498553965618,0.7234252564207533,9.534126855941853,9.646920074011332,3.4213747331747513,5.533478323396195,4.479811883523334,9.68437153515946,8.77520921316981,3.064145957679556,9.089753556076785,4.60283182747899,7.403893954039571,6.608745321346756,3.9863248536347973,9.877812414734198,0.475427033793665,6.559483699968347,0.4156839998702888,6.5695207339191715,0.4568320267113246,3.4210624613814256,5.993987122487514,8.389363688884321,3.477708385434095,3.015334254233808,6.8498780669515895,7.213254659877595,9.267732762934822,4.412712508516002,5.928539001273205,5.516699371029084,9.409656204539779,2.770433052206136,8.592265334813057,8.667717470875488,8.038404229438203,3.760596308009485,4.204463350842394,7.747348943344436,3.373489467673514,1.6404173092720398,0.4321542163861247,8.422189449565998,4.520459062056716,3.4752175159033216,8.466112434010299,7.138200751725153,9.062534577146673,0.12443763075922432,2.3952237241368524,9.858779900912577,4.325987758928093,6.979211276554147,6.782368822159668,2.207059386441317,3.9646458572394105,2.369210488733089,4.890304201796496,4.470861442437162,7.35048356847069,4.2855212643159035,1.276084272438327,7.0879440331305155,6.149828083719129,8.982288546441165],"x":[15.745880838064842,3.9629320138861956,11.011775761567488,7.854716837768909,13.626732468188102,16.850251824985406,13.148371228733247,15.500984485871637,19.71923258705871,18.161878718833073,19.760964613024687,11.53388846461147,6.465119695793513,10.247827517093011,9.205700793206884,6.230706975972824,0.9309068519931385,16.258810480420628,19.75728575341612,2.397962198040129,14.704230076367395,2.8960472199747045,6.2800015647184,6.2041378339770015,4.507185913248439,0.05940709148612999,17.93770975552025,16.315774689032793,6.890459941378118,17.78330838242178,0.8727473954975151,4.785760688462695,10.241198599498373,18.784607915912876,11.002129474998558,6.580594499603438,18.649560946578475,5.917433939231551,7.328524861112067,14.121349807696628,16.803842064773317,11.395155198523916,10.625809085983127,19.427811274432788,5.471844947092417,11.509139787961452,8.01723607745149,15.078101628655132,0.4538637212365071,18.44730120054772,18.89198618284968,12.407027490010595,8.614265926698161,11.842575875852788,16.305923545235036,3.1145252894416986,19.057908891996558,6.03272248717543,15.800050190686004,12.117756568137189,13.476915794055948,1.1283181720234836,8.718031340911004,4.2923964255585645,6.629464595030754,12.638702496960047,0.7443967287228581,19.30249219437207,8.807303891231397,14.908692671019,14.660351414203024,17.936215239492178,16.100156448001854,4.51703119969459,11.174102272498017,5.796219740137509,17.255155183848334,2.131183468105644,6.406805536201059,4.4364865476674575,14.672658244597336,2.0886026585372086,18.087479939253498,17.502417387691725,19.01053602545208,3.1281549304814193,1.3186960697805095,16.142053359522123,18.376637231211998,7.846110223598735,7.725095548181717,11.021162409425065,5.260872351983923,16.67317156908578,0.08169323290238228,17.70566305774745,12.529043682144462,17.390098848805398,19.446330025619673,17.34010433171834,15.228026176710244,10.298459414016667,1.6784164182419525,5.278951847658062,18.785328537799813,2.5417971508292103,19.493369155336215,19.901030961791083,6.571145696061826,3.216145783465598,19.667660370556934,16.204770280318638,0.4861968580185927,19.13506933123657,2.408683020525011,12.477376006582915,18.02977212649353,13.466299262299316,12.557587489036756,9.765865312381216,12.009076009239234,15.988179684840059,18.776283500985187,10.343783627127138,18.87805240410167,2.8974483995457723,18.917859559300865,11.974295528000166,5.522862091497993,18.845318238673702,11.027052482817115,4.201524877837062,6.122011811503958,14.370956483870492,17.948338645830674,12.857035995273005,15.260072941058986,0.942204279709955,9.327752739151727,6.716005326081889,5.829200246300381,11.573133804447373,4.924537750914175,16.86028866154185,7.240089981598019,16.682304078604275,3.4456501790153515,2.3787886503668965,17.97582789098136,6.8481169081719395,16.58677995983176,6.658012190337019,6.2047577426932765,9.020613065975809,3.5080286315877007,3.8512492243284724,11.045992830115772,6.227804871378924,0.09978843903355905,16.064478712127176,9.754711969360574,13.414912278853315,0.7717895797934871,18.320250975617736,5.3273020516236125,6.433836540587228,3.9356457761389763,16.959471336981984,10.802725790531063,19.50802110980238,15.046103436115033,1.2155527741114058,15.652305423295548,2.258586305707504,6.582289784077591,8.025630839661556,12.400803596493258,17.086935259557805,5.3328387049274095,9.424676339242257,11.252770680549622,3.0573109285195876,14.129771815948002,3.1487932620999226,9.999867870051919,19.207009174544723,10.879455520534629,16.3774490250217,3.351457282208403,18.897904195631515,12.60413582217225,12.660302861757934,11.986437643218695,1.3649057909361506,2.5139411006617385,11.313952373008313,3.2982751043437064,15.878120994121545,5.840590866232058,13.306685180023873,5.729501727742998,12.913734000836543,9.503868408958382,10.326523096064765,13.058788161946854,12.876119357204146,9.531196417349674,2.2643880305404185,5.103871304981693,13.78270468744374,2.4849137957352108,19.513808964703347,16.91484446680841,19.125599271066683,12.030009075621804,9.71700741256499,9.649980537936319,10.21912173104933,5.019170202870611,12.7470255679367,9.298888697954082,7.7290358631857625,0.5188804106769318,7.213588056667279,15.653943517708765,19.051207402107124,2.076669240058817,4.004202130663401,6.381107958467687,11.781182627557548,2.988222296525813,17.159120822979943,19.21578692513012,13.696662477170477,13.337250612230807,18.35456592677245,8.373930205041615,15.426684590558132,4.426557454498599,2.607965265870633,12.88912553223092,11.953967110204434,14.86500821085353,4.832247262613136,19.497704434720905,8.5348357102625,17.01801874656185,14.78239230357656,1.8658811535543318,9.731374191379594,3.7653720612538866,3.9086054944063697,15.99799440071231,8.252646321382695,1.7009837581247922,12.647629918610907,19.26113575641606,15.441773908872118,9.665421975039479,17.904862539387004,19.269996446211856,9.545644745621633,10.387457093371765,8.772225550336223,18.292713571084896,10.073171691067756,0.28302353647020606,3.256619943694319,15.555450171991367,7.649771278735584,2.2943520906548898,19.913567619116286,15.50609240379627,11.904367470515393,6.960989013911418,15.94009124067366,14.681884064382928,1.172770569333892,10.412420438699105,6.864780203595857,18.849012614290178,14.181559250783655,15.402685937935958,4.795514705725843,19.44146427800277,0.41891618803420627,3.576826409591778,8.253078144733008,3.693990035666963,11.807025382374267,11.406396555976972,7.986684338037997,2.0494208791604906,0.4513321893261013,16.477592921102048,16.25409916320251,19.230684309616247,14.308900672322768,0.5342859297843638,15.750358528885684,11.452534851595871,0.7315770010350819,5.908161706024173,8.328904274603177,4.937049178822148,3.907442544334825,0.07120202340910708,16.704648084364685,18.325692565228493,6.91400506958169,16.37125699661912,12.392342983268897,16.185424736111646,6.164582809411652,2.356369057734198,6.6702162637633355,13.100417262424667,9.812992719585578,6.0313240249745315,3.634877823519913,1.8046591142854007,14.337481035625949,0.7352186366689972,3.629652098203726,6.433259438697894,2.983593215536624,5.554874189713486,11.430840463317873,18.953931221659662,19.390866842247764,16.836160601066137,12.57068281629107,11.32539366547248,15.141679282283782,14.941537941756845,1.9888772448185055,15.358323536033547,19.86540436120361,3.415295112069794,10.156091239744448,19.998642911261616,9.606776130267889,15.976793860474658,7.698115195125679,1.2791052817550774,8.656998010397414,4.093160880469857,4.245212580318678,10.040815179182076,12.582703703978687,17.997759871491418,4.576873843742493,7.813461861526809,18.435802081772167,15.553843886545803,8.093722604206537,3.3049673496114362,9.253644406069906,3.791944104593461,0.9876515733808633,5.594920563247872,13.60078307814183,1.9498078412471909,13.59535497932046,4.018358248407075,4.548675999949485,8.693243728315547,0.6943549789394732,14.2350666883973,9.86518989652669,14.933170459625602,6.549222082929944,19.430686215591336,17.648102343448897,12.750311272419426,16.04324882908746,14.237677009554908,18.442750745335196,8.214409729447137,15.557743754916217,13.878083800240816,1.090545828051237,15.163735142474142,4.461866777638166,6.723777524187753,4.9347646933176925,5.158731173574096,18.556580475007376,19.314414688561044,14.863133904120382,16.32106362889679,5.153175339141458,11.02990520367281,16.54849355524012,12.888622764286124,16.74356187910543,1.2860991701461622,2.318554615900519,2.3934273819098184,15.820222143710287,13.167715715995932,10.353426120245018,17.145006989589504,6.858072337801495,16.866852958437953,4.1185791803392835,16.899795844668027,4.545155800118592,2.1018609687608913,7.533896561699969,8.063158283404963,18.362273418086,11.81623557694146,13.123199857870386,6.587093112644804,15.867227646457822,15.078801826554432,3.572984986290897,9.608533256151262,16.930812654491845,1.9032044604017706,12.774076140558662,12.891084728772464,4.23241724582009,3.63164339203077,3.7755164434306288,4.6386813005475735,9.969362838058306,10.43285569755053,12.113097370948736,13.97476192281073,19.330289856106944,17.87390096126851,11.676153620259612,14.172102628799937,12.386892647456547,13.602808154741739,18.546467503704903,17.98803606057836,14.091187613179347,4.412754112279913,9.027902188540363,2.4048525392462095,2.7607647821379278,7.284644506675626,8.696137456191583,18.947293516469195,19.774092091844135,9.07598744259515,6.011727979327111,18.000487591724582,11.269514712943556,2.6220373496732385,2.5593086808854126,14.315172034148503,13.026395110448842,18.485697683176387,5.696722078359935,2.2830641641864835,3.5626495149512483,8.72973796131436,2.2208073298411346,5.961587522228968,9.098074488353625,12.713597289374157,14.223285602969376,6.1762171129175325,6.927850827189346,9.212026674008946,19.878062811793818,14.123483358323554,5.896485841053591,18.861670821107733,12.75055152377282,7.9431447080539375,2.6629856703577826,9.99167994041025,6.142826445244043,19.954474531102562,18.36011668070396,10.525038632048123,9.309910726328795,11.032487608289653,6.118515416418182,13.54840072662439,17.485504160893598,6.662940984870751,10.232295388361909,9.342447009724362,10.92062660635193,1.545977540266379,13.226460457947864,14.648084131532952,12.658462040417353,9.771556399508373,7.558672181163395,5.3665076623879315,6.691811479014551,9.3402324333019,13.077185730738222,0.8272772308322862,7.766440174065528,6.2796684149410975,17.044074930085422,19.85551745838359,15.971116963507868,15.813964594799184,18.432416686005133,15.934692998107822,10.967993036242788,4.031029909920862,5.4823455197535065,14.15823426756521,1.2541206016253303,4.194497813151177,3.4549510369858805,18.968302479909557,11.82263596019788,18.982476772295914,13.770440851540485,14.024391838326057,2.0923089719667676,15.423015878982946,16.271931827917435,14.749332821947018,1.069632843790469,7.30889365792224,9.849539756079317,0.4049383743489088,11.715956222947458,14.252010719620074,17.954843674648792,19.20309717756098,13.105150227577575,13.975995740438156,14.877113748092317,13.402347585311132,13.275161752216684,0.1660103003423119,17.66057864230494,2.7558841743447715,1.2131513076049272,14.486435514720455,8.124212370979231,10.281699497380572,10.469041844467576,8.249383193391058,19.332564233129773,6.051733251982312,14.337984397440264,18.257992744007808,11.55677595862973,11.909847991455651,11.861676620234736,10.179850786710247,14.679554359191727,1.2323440490336646,3.0264228079261413,15.557004452049332,4.371642012683212,14.933930213867942,5.295260830859441,9.688952350861282,0.6233986571837935,4.031103519521122,5.307127538928724,14.41334573662755,11.756862930175753,17.033253505747297,1.3449768995684819,10.808732825212598,6.697049671208393,9.47733891324399,7.3461271636836445,13.972551913198995,0.28047723475337794,17.087417106055494,19.722285442667488,15.684399539141474,5.882140168284127,0.7073701512682451,7.071296723547711,2.470103382160227,17.381718673375325,9.932117294244929,15.737614304896566,15.129692535964011,1.3172814916560727,7.849538816790824,14.196821619414344,12.69390227206365,13.58430131302697,14.236087597779923,14.908145061057617,5.9138292165468975,15.411626872206057,14.461264101679863,7.003285414228548,10.336214935886767,3.546734870504622,6.782539065621838,17.829365244354037,1.8503704553996947,14.192038709505596,0.5033938035139407,2.931310326534291,11.534451390365348,8.432231893103026,17.03601935559416,12.060210513195333,3.0474338389668754,15.125445311492932,6.137149161748967,19.76612575241045,4.688802347666319,9.65590679358829,5.9063078383923395,3.887455715282986,17.222493254239847,17.97963918973752,5.4118709389940545,8.157811570064197,12.153449137081305,14.15292398611463,9.649202257114538,14.245790372347633,15.45554502641924,18.453403284148166,19.200007048194777,16.583022493753788,4.96577830906292,2.6739701685152184,3.6585249880784376,1.9861164855355895,5.482051704289157,18.736749644995076,15.94715759706573,9.74861366008492,12.3289732448759,17.50019355381035,11.226843936069413,4.118211643876388,4.029337187445128,9.068664002778352,16.32016397891023,2.7188540892092083,5.97713676359326,16.183907152986045,6.226337495509497,19.623918782518093,2.575496559866224,3.268626529676024,17.804287585281067,13.385575751005012,10.251790454826653,5.453621671586686,7.869205815609663,15.261610651728406,11.85880796131463,10.000547498628936,15.427212722154628,12.994019520635893,10.315367785239072,3.0714379610778852,8.919753657825819,12.25910454453006,2.4259508217481596,7.082415575687677,5.510754484613525,18.2961682838055,10.227924605653014,4.905200827664511,18.998103093796225,10.77672235580402,11.798427193104914,17.01793911429938,14.279948873091378,8.875187994052682,8.614342522326668,10.729307628676029,16.05890610114836,13.188147480306348,15.361847790029204,11.207467766136979,12.135017350665581,11.101332935269031,10.827197230818872,2.0866107197465533,10.321462838825202,18.05766439432768,4.490325986774133,12.72422686807348,18.48638547031109,12.242092460745205,9.054307645357348,6.679896078510823,14.9597276763203,5.791894061699598,0.8923845129858554,19.9457626332346,8.050395777972623,5.294088868975626,13.030163133735332,4.515400381189614,10.80594253098258,19.318726814470892,6.460228957912406,9.17621981499181,16.88906800625176,7.743371048672016,7.833832058934278,11.786588418596216,6.968171989193648,17.771716436952193,18.37401149453017,5.959286739880301,9.406739084334808,11.264598076451522,9.248872718815893,18.751233806442094,7.317030268151177,4.692894778803112,2.536720185491692,0.4167741283847315,7.427632287477559,4.886834208670292,4.950482271671994,2.928699734284632,17.795221331706728,13.947803304514323,5.644140950205889,1.046873597279161,2.0900345592035263,14.565533246027606,9.831857832523063,15.397598717924774,15.920988830554442,9.996948210336338,13.788088355964362,15.01031420043752,19.89058258587891,5.999632142688891,14.531430309640431,17.669584800080965,18.326250487702747,16.23429300854664,11.032391923231115,5.678908552218789,7.56962074303984,17.957310330535606,3.64092191491852,1.2884554878063303,4.485118513028419,19.98678143325919,12.92233508862453,16.07535879485281,18.665631891750092,18.97749796671206,7.503235605354575,9.427448584292776,13.124888261849247,16.346804166441306,3.3247416707601207,18.314779825735258,6.430717905532477,1.663387516040209,7.182156311605086,4.495168529118678,19.265445758918183,16.911980521967152,10.280383682548294,2.6010178338973455,10.077411529247025,9.731286934353554,12.351989982818532,9.205777428203623,17.350442463877663,16.07547266234978,9.773745201408701,16.954027492879536,4.2155130566333465,5.747523333146076,2.788068418600722,18.86037312372959,13.75583214069433,5.153131818022976,7.890167551627565,9.32328209367871,3.4199103683579812,4.995244719709566,15.012268079400343,15.735709309414778,16.357615776233377,7.633409587302151,2.3949162439031912,17.50124053533545,11.954257377164502,6.437342808925672,6.470101355226663,16.484977400750523,6.775343578343778,5.806404332339361,5.239748699221778,3.7196925668186775,4.968411493522931,5.402064848493335,0.273245400243991,12.53174345722432,5.471435341558375,18.39587117620229,13.526991703062695,4.551057684573525,9.728931780475282,15.826249188232605,2.8566983938115476,8.279047088105344,9.547059738304583,3.9853872099670795,15.62795433369196,19.44223299385419,14.289280288447106,11.653537059414777,3.6486177075565562,14.728869068268722,16.60014328968189,11.78466626790227,10.558114671288855,19.712750404133704,8.215928869640532,17.542833962362543,3.2097962714876527,6.233563498127941,4.7844253181110785,4.185906963347152,11.661082720404124,13.093148260258944,11.273341305783063,5.772097282284858,2.4200740160078427,11.521175088022906,15.990377680293788,19.69412947259088,4.972193212365257,19.99280013681824,0.17149238273932,3.409903943127919,18.927107922446798,6.41821095980776,17.384389804627002,2.711775058268211,5.688301788042942,11.06705650629294,13.741104185005636,3.5905179595772507,18.491061620429935,5.121713351044304,15.823579128340274,14.551112857230768,16.16843493692354,5.102404472114759,13.570529766884194,2.2674813047240683,2.215241931466454,4.994444672347624,18.36103707552762,3.0895152673743143,7.472829130750016,9.237201844346515,10.338047146610085,9.288326371841094,17.49535055040987,6.158324238464465,19.396337994000202,8.435186786915331,5.180041556952868,17.209850359943783,12.18025899822051,15.239417965894093,11.827027352284883,10.896220959478038,11.57027813565362,9.283605780643573,19.666828939144185,13.933871843352236,12.053044617078212,5.683230578983491,17.923483630459156,15.164680358060316,12.800503061515641,10.786253696756871,13.45253744765619,11.597504261904273,10.6096031200381,7.6109809413210305,19.393704592247026,15.968499740066733,11.850911671214925,8.629774484708271,19.540556428147305,2.2147524861234524,2.893870772892968,2.8660912885404377,4.515864772543572,15.998954639447373,2.2376166674408005,15.578534626864018,11.927304305702261,8.750870156722588,0.6563583371995385,3.100436273164866,8.97784927286093,6.528466098678645,2.556000253048314,3.3545112820069223,13.840724102947256,4.628345535207541,8.795463830339894,15.681249340354366,0.46445594541357327,13.427915858553089,0.8682755713017443,9.888051760811045,15.179802934495346,2.92174118388568,18.96861104048606,2.390405847354198,3.7834495067622287,3.7342326175828644,18.65852842052634,2.9203878484064694,14.23716405573504,11.287994755893429,8.6454236258623,12.796410540492724,7.995110586922012,8.677013877716725,7.778161249141591,4.814516334190824,14.430931126654766,8.154091304658252,3.128789221405457,18.757690787959614,19.772447636482692,3.7784959375228677,3.3884933104217074,17.725265761768163,0.34793047592799553,0.509903819974622,10.348097240845245,3.368679624722737,1.2148282172251212,2.9706136999557264,0.13472466922875626,8.479770979284895,7.239973194999143,4.9218509392302545,14.530645000195697,0.17702910745339473,19.467457845204798,1.989320788801816,12.410760481948504,17.585840517263467,15.225435206351996,0.8295767464604031,12.555254025740744,2.070234397532622,19.736596475914133,3.9751592105035805,6.357502208645056,8.834711644732188,16.67964498707031,5.1100884962318815,18.799335469826573,10.575602480036608,13.48649682148932,12.865915291451259,6.793558059337248,14.62582160231074,17.114701115986634,10.653663847447902,4.753295302527274,8.060836334565309,13.796741821398687,8.26342959817627,13.328597730742672,18.59670297183265,1.3397790146584443,11.443941605807542,9.102067357981745,0.7427203965886964,9.384634290755116,15.371702212178576,7.815574242073371,2.369453168836295,7.7717340813188684,10.340799007192928,17.12267283710259,19.692523580907736,6.41313171309271,4.860632756521195],"d2":[22.45083166959162,13.462167264548338,18.090624760043465,12.44779168266108,22.50445981517721,13.087700199850158,10.82900120214816,12.255509632343893,14.4970038669064,22.67449973990726,21.323215039642204,21.992433171579805,19.052484878115866,12.802758363283292,22.908733352975737,26.016430815066883,10.404987548357596,11.111994804699217,17.219470329734683,25.784033703787962,18.292403915813896,14.451567334115914,10.426607325480614,22.602593642978064,17.62226228005952,28.249683133072807,22.16603060009248,11.937836554481622,21.258913350183253,28.95536346754521,17.784745885662257,22.544914866778477,17.271564114945814,11.744493742519664,13.249351988904557,25.135914426250046,10.429516371589674,21.198588287491678,13.323243799902977,29.193766742254894,24.108649643206476,24.77071454052766,18.29098381769302,21.425203378947522,25.720235358821945,12.217252508743135,12.802685610977216,25.876552961356012,14.659564463598983,15.15020038490604,26.216010368784293,29.15746078206658,25.77549029390984,19.706199003644514,26.235554962698306,25.45192416777879,12.920141619594672,22.7889502632824,15.567349266870245,12.599005871778663,24.619840992951882,19.63760899615474,29.983857918292,15.096974735541524,17.361381234434692,16.2972566996141,12.306369460199505,25.34760320683638,28.002456226993925,17.905009284103123,27.33541265153422,27.221369444408108,12.554872840969562,14.926356746655781,16.370620132947117,18.351500795653074,21.51607857972923,18.18900302574306,11.229761042119852,25.10471527717998,29.28457124723339,19.37550074850315,11.414271778203165,19.42819115393524,17.28605464269996,12.335143367462177,18.87387665197342,12.86987541545782,21.578429647006516,23.00377095396872,28.752574798268707,26.881177501015117,12.208773439815467,28.424184928788385,23.627475357229493,17.474392724913255,24.80064262044956,22.795460115577416,18.183224784650097,15.907854429980555,19.221707839217416,14.352886364761606,14.041505669511753,14.904131638168142,11.329586976929091,17.844317854824332,23.7244382386767,11.174582018803765,22.38078474335496,16.269872348653944,20.677191451020754,29.99510494366188,11.579237232549936,24.50189299782242,15.498626480529506,20.54518117885477,15.212022868069983,14.36059200537905,18.00656474453589,17.2276558075525,29.86752082533014,22.306883962697537,18.411573883042127,17.906803259136908,16.812349331659426,25.111839716673245,29.335958909647715,12.661158392769089,29.725518690760687,27.03445511923626,23.453131432563104,24.92619698798706,23.664471767871834,19.027116794390892,22.18286932918774,22.875239876308253,29.783410582793103,20.517691009177238,25.24135840730333,21.9683974125091,12.322871560769272,16.940383766402682,16.976273160570656,25.32377858961417,15.373760676948663,24.49245803222691,14.706149176686143,19.107363218293504,29.444273659124033,27.20194086539111,21.361599404665192,15.04858574918039,18.464182259282232,20.233377517163312,16.474384751994094,21.04059844086608,26.193667889513232,27.551915156064414,10.709762676122061,10.523660964466796,11.974626597823148,21.560361526144828,29.24268263149136,24.054259932501758,13.623937735435675,18.754422517880332,22.13732626572101,22.083157631883594,22.415009867547703,28.482353826775203,26.836861446759478,18.72010248407829,22.39515583176068,26.85220223493802,13.638264670827024,28.93783057246688,14.29478508494729,23.249047515240576,17.571643070994014,12.440211590330428,21.943587515104692,13.204719269662109,16.103786757460817,25.932334429423356,15.194607411549882,21.21490723570263,13.554572163778218,25.294403129194684,26.84111805452921,19.625063586200216,12.184006363471722,19.763193847543526,28.89225359863869,14.350469855079645,23.667352752736544,17.36940032652566,15.570335113280276,16.145406270093826,29.670576048368563,28.59638293462577,20.715396557606915,10.15486671144954,14.962486483113725,28.65245574522889,21.155641044731798,16.893514743864433,16.933139133123788,21.896423812667418,18.709893421306155,20.256132179113692,20.92008887834367,14.349703873200962,21.622285566967886,14.28361989809353,18.65185119639984,24.300560815534,23.52942403698279,15.071016654653548,16.333843835373987,12.241815074549148,24.80226404782284,15.655090865174891,21.554230368523083,23.919447467953106,23.132243867366324,25.590496133740302,16.756204180394477,11.442733879585845,11.344424338514099,20.773869831104644,26.17072666761198,28.750918906403946,29.91322560651028,17.407314777482657,21.311432535336433,13.08491665908674,18.518825474517616,27.960119479684195,19.7117907507694,19.127322541822707,21.45191643234472,29.74435043452237,13.712822179487745,23.070098596084456,18.79666939451149,27.724122094038535,25.73823270247841,28.43290769483364,27.98195535092499,28.877091365982345,23.290961783772026,17.418009475973548,27.454424470438013,16.181316868652843,14.991684636384374,17.576784429163542,23.176530799725473,13.10002012155735,20.902171353613298,22.00192457824167,12.387022878312681,14.880612909731381,10.653557462001565,18.968677693885432,18.87310284483211,17.95286699768976,21.124115748074065,25.119592986789442,25.907763156349528,24.078558797231942,18.59609459981744,22.42403888348795,11.704428909733164,28.252683157814356,11.423096398678227,29.356613784482505,23.875269425733883,13.701810711842732,15.898452206225254,27.93429852248687,21.97392916465099,17.121099357515767,21.32418548904514,11.161083150169372,28.83370677912221,12.591257925425023,24.49726643917183,19.130588008558252,13.426053586199561,17.236207450720297,23.55159632530119,25.667985453326327,10.432705884954586,23.04724995464356,24.081348562682408,25.90604210538035,18.62117893826063,15.097113751362375,18.073083808480884,23.3678522461086,23.761977566772778,15.348477828533436,18.165119143265773,12.879945794738417,25.130295638967404,11.662925468086275,20.88451857133943,10.569425567606183,27.122885140299843,15.857490344117444,27.287436958675553,20.584811181468904,28.5747858904816,17.67000291803378,29.617623829248416,19.6368102987691,28.642605187893704,15.998243901039647,18.006246977653106,20.592130627475264,17.535180312578028,25.742095437906222,22.310499947826834,18.279134019063147,24.272915164277016,10.581921708622698,10.809885485831416,10.22385649232631,25.884446866428462,15.198111035523683,22.334565195277104,29.835780123250636,17.749397927635847,17.310963555131515,13.282565335751082,11.72080524381245,19.753937345446953,13.531065027155398,11.535341530795638,12.706264321046037,15.53731361379647,28.111936719658527,15.638209435009433,29.183535429804643,20.86812511429232,12.71023141299616,29.470580188469615,23.54866136723805,16.101863595085778,18.32825013382891,24.40099085547113,26.943096815905086,23.10914496350286,16.643416565916663,16.938697490640088,22.3325459100813,26.584667538568137,12.139122165566679,28.650979602451407,14.401946340989703,26.513767734153713,21.66169394276366,29.610071717064397,14.700678475959679,24.50964073405338,24.51760330227945,23.49124282899893,27.112162926602185,21.42340980676078,13.433057567011545,27.79968424846821,14.870341093300166,16.169529328353434,20.61685334620472,11.542960838456647,27.071631821612996,25.05061603979811,18.748654235232078,23.835956342990254,29.651798481814737,17.992512103994024,28.177447808256044,15.767324940644766,23.188430765424144,27.794350460399947,14.642820582847973,29.73949012363068,29.495917966677357,28.28974184739328,18.23451809547801,22.603700423644216,20.25054217600691,11.272399877424801,19.28844824593635,24.272194413192892,22.636507175536988,19.491362853651548,14.465866585927856,12.481832102194378,21.17268944210953,25.65369453597843,13.013654028271775,16.114636083827843,21.718817672829232,17.858820717868266,10.664557715978464,16.73543555776558,12.003645536409167,11.262297478656933,25.13885942410166,20.08443554396441,20.13970940125428,10.08877933041052,15.527728145495704,13.316441536329378,15.463714119316862,28.87142360430434,22.982952729266554,10.010239740777003,29.96416811979842,12.239095689718065,10.21587638919467,14.996125405388451,24.151200049795733,29.2363161753331,10.823535614386902,10.10063671001744,10.323058616943403,28.94655873206961,10.22269697336139,15.435758666392218,22.697512522733415,14.341178916730307,11.698904352444316,11.48262439892649,28.588007378107136,20.410775795528817,18.146050995231366,19.061401396405977,22.060771579403102,29.969965081243792,12.22998644249937,11.382846084885836,12.022976787057104,16.147644746444158,12.810889435611452,19.32281201081619,24.197943593588892,17.403706291908122,26.95496719381389,12.424370204232469,18.484300155592802,28.674221903758202,14.542805931527694,24.010949072907465,16.16169755743659,28.967301997448235,21.620167314555466,25.932588868963585,22.876562641145348,12.611016389070846,19.953564108997437,18.97351966858058,29.631833304072302,15.661823675628037,17.587351157777952,16.832119815287413,26.66491213713092,12.398331077038435,23.456381024354723,26.826414889559768,24.77727558333404,19.01799590055151,15.415512301246732,12.6891693337633,11.712322420612505,22.972588567581838,14.817367331401229,11.431648079708436,20.58107561853969,12.492651948001544,21.268592351653016,21.550449085994213,12.0508907084184,21.41820890018542,17.378586848484957,17.26331719976617,25.2167204517582,11.296737501903017,13.670649454186519,29.085907947416132,27.31553205150984,20.58708792324105,15.400081205456356,21.81351820596092,25.720464371937332,27.07803465412361,13.095577989148195,24.475090980504145,27.135627134804835,29.63731920106648,21.087251855051882,12.580156427007232,21.999660842312935,27.99461828004627,24.926104183398543,12.562654919647,23.628925507045487,20.993690819974866,25.832070233292388,26.888484808165703,25.225404139617783,19.758451524931225,27.393230697445695,16.572934189555518,15.222344277957509,12.129688810541253,15.201489667610613,21.075166211246316,24.53011724452974,17.951487206881996,28.88481443668819,15.89659599721406,10.231101354268404,25.5296804161248,14.245741059311374,29.037029128775977,13.86933195754025,26.37869018505183,27.14975734470538,22.70947637101417,13.675793317525082,29.6538264498443,20.6309238935373,12.681475795936944,17.503705708092884,20.46476189639033,14.658805459458812,20.81700601990892,13.989774054223382,10.274766685301238,26.16352707926467,13.589245979348776,15.629654950022832,18.557395124127822,23.571666215325866,22.93333307201209,20.633483113950426,12.066502540516751,12.348411871742183,16.804861935424178,13.222339937731324,17.884174923120458,20.979001003625328,26.5216552755583,28.9087835715959,11.676011417116289,22.096077818793486,21.090201095568002,29.622032697344434,13.68454271771412,28.575382469986096,27.104168044669812,28.226058308364195,13.60001423493367,17.352948318424875,28.292160730109607,28.510316636720532,10.185044129213114,22.399294480524677,27.051085306682232,24.53956960232585,28.100940809969156,15.062530632426338,28.59215003793325,12.807651531521,20.575366423092603,16.533172558594114,17.713712496815933,28.33859103189742,21.528738451304335,10.664590954882778,27.85991125527041,10.197688074338714,26.501650798932367,16.387689989614795,13.50515012225502,24.73194019605488,10.455284839643436,20.288912117438834,10.700201390908859,16.184983369888677,29.266373990020412,18.233284086453132,13.621310155323641,24.02312290865011,20.76928899913296,24.721200781072277,19.658621713187692,24.640775317448167,12.860548961972057,11.864718309327081,27.02274234426167,16.280212029195674,17.60164443452033,24.23491309532554,28.75815190353146,13.183559521747101,12.407962657482518,16.39918133179596,12.964982753811856,29.474074309924468,21.417841602157353,29.385334049220337,20.87134882966994,18.186335592324802,14.82313566154951,20.317682784950733,25.31864897069433,16.562332578473857,28.496947088799732,27.596904303729623,17.881379962337846,27.06420333400594,17.44868252378733,12.685864990329186,12.48782893655148,14.980245593353914,18.677287204373137,11.181067058157321,20.678463899072078,12.764792392435567,13.89151538420987,21.129658741409077,25.941791860053662,15.889652080602751,18.756365360968537,24.327795038465307,23.110301609427516,22.60204530883733,23.90713700899052,14.853020885768249,27.65056824499701,28.588894389885347,22.718481186025056,13.854291387979366,28.277786299608483,28.952637224815195,18.336177210288582,12.41617184424873,23.071821808698367,26.998924767253367,27.533982095588883,10.780046287261541,29.84478756789345,10.463466547606078,23.938938319316758,23.532179100672522,21.519001990284934,16.48357846622757,23.470712613350354,29.710704721548232,15.543024917579999,23.010116967876968,26.912464494742217,15.855086378373016,11.957056624498259,29.551022983843623,21.218055783902482,13.217368211923798,27.031376189514372,26.081688706038086,24.140388863183837,29.238033350783788,28.644797414362273,24.168699981839914,23.355640443809346,15.25934322081699,18.93921549403658,12.53466499697517,15.228961600772974,29.64264924881291,20.852602776903097,22.492006474518142,16.387643571694092,20.810083930058646,14.62832992884894,23.829810320812697,22.205038412209852,27.940678052263067,11.476840283893882,17.091898856882718,20.743558984246704,16.476578271068295,20.05328529021346,26.239533807654723,19.52919361038511,15.650688502263455,10.395900673496898,15.18695037308634,16.68457843639722,16.287991129199195,17.389443040662727,11.899186884446081,28.974572537711154,28.539262360933485,12.659174888943717,13.333364869952092,14.514149628052703,21.736531152741016,19.831738645074168,17.16536938829247,28.331790588567628,10.55916293083444,16.475641580126215,14.155975000643156,26.611270858056745,13.477438981863923,12.182795392635967,25.52671192842206,29.559443481038848,12.29520484825478,10.960077919764117,15.802271669951011,17.894683034537564,13.422752955022492,18.72375643958341,18.615784627958387,12.735851529256603,25.54969527155679,17.05017921016509,12.367011229452572,20.4327382858876,18.456675712393107,27.50016023993657,21.158553009876524,15.059841647944406,11.538351983098325,17.90122122019623,28.234035003527076,24.376432154847137,19.853960402731076,21.38776739937216,21.756152653355898,10.904649195527725,29.489783539726066,19.390183591588723,14.600882901820857,24.8796977026328,18.501045284958806,16.957082769322827,25.75608505730162,14.99774593389153,20.103824035560418,18.7265037712344,24.95904198105,17.11530577963298,28.86613863652397,15.496506922159616,26.58999266204136,29.658181390168036,20.042791549349054,27.059173898797138,18.320260321679896,15.11885019012793,26.960109032046308,25.30307158244924,22.03225744370628,26.558969791527325,21.94021331934873,28.142723378169915,15.39944439355204,23.334942647783663,29.400661974765725,10.447499876184722,12.967091794819137,22.252580374168307,22.3582523116491,18.569059235016695,10.920996940907909,20.86266535784476,29.1822824489765,26.40385246459209,18.32877319685526,22.778020018519484,15.601508287411253,26.399451314356842,13.70586267461993,15.636038122904345,22.198672774056032,12.869379590059218,10.894796755095975,20.341569077434038,21.582950234062487,17.381670431558327,27.472178473498122,10.00309911785726,25.937606051886483,28.76806763573216,22.167346498115855,15.981463432609901,29.910193394047052,12.326102760526352,22.29829723832514,22.5712712604175,16.252225647258776,20.0066016598847,27.065152304771125,14.980851010173545,26.945155664103623,22.38146348806798,19.689092806676058,22.21234629490068,21.261228168961736,22.147116045661726,28.828040638465737,10.650501185170613,10.269091886518261,24.289806989242564,29.250726938171894,20.556197915952712,27.231485876872,27.61738729264914,15.802393924057556,11.844078338928865,27.681325257178084,26.227961158143827,22.531257431609383,17.614529935372243,13.300280262871308,15.451553364608781,16.10689677832218,17.692056632079645,16.088535643668877,29.854616014775203,29.994186156828494,29.783246479336682,21.796313120006698,25.032219465001152,19.205113258477354,10.432221510660572,11.148520930486967,11.015739080548297,20.955541493509923,22.009756952754984,10.931152558557034,21.756156721574,12.80598829979105,11.554593606371748,27.18531061626512,24.498942137693092,29.36780961356864,15.81337169821731,29.3770327192882,17.440977051044705,16.1910379731713,23.46136690697566,22.13002700305676,24.259473782626024,26.24048172607179,16.772250668085245,13.526346989988415,15.627460070356598,11.018901025991257,25.553553361301194,14.433085513668704,18.376190447286554,17.749022843898757,23.507417661332415,14.816848795856167,17.017086424840087,12.81520600372787,28.96064928631169,13.612919793497728,20.36685058598178,27.379053315303345,28.227481138876513,26.445805565639592,17.696252510082346,26.04630866142578,22.062987861093568,16.632659291701707,16.059903753325393,26.174926177840074,11.398024996284413,13.919718642954173,27.48840112727455,19.13333458615255,24.028331476837437,11.854334133096515,27.70404594545173,10.551291616443311,20.192031862571923,14.167461288148782,22.90875221940916,18.376871916161704,17.272015062255548,23.65127370111373,20.17460923329107,17.367044782834924,29.61821207830248,19.676873247341298,10.16036480448506,17.815279117777454,27.646427633243658,19.32501184174386,27.676321698622402,29.454103330578107,23.113709188060906,14.21036173702145,18.91022779960453,15.147192389157622,21.888965020003912,25.258608304272983,19.12881947219472,19.447217462533914,11.116138601932285,29.562395156508185,10.150639643662371,21.38247249721666,18.193501117276906,21.864973522741835,12.847621724533429,23.606954728294465,25.895339080519967,17.471224986281246,23.588970561493213,25.14740037309748,15.641551301082322,21.328248277676046,23.02128670099217,11.166461933402768,20.04706226933225,24.081152532019836,25.047728762666914,10.24905468885585,23.2809996501009,10.81390035718162,24.84783636646344,17.167746499892665,10.69732655893398,23.00666782391041,16.975308553573065,24.774362357288314,20.365922154003847,27.6170471731148,17.71764021810569,14.492387271887832,25.37285515207571,15.331202430488533,12.067091080315112,14.0521704967461,27.646860501161857,20.486397118331737,22.313380136119267,12.974873260288291,15.960077103359067,29.279280434763194,27.07101725971715,13.228222274062169,16.09373237522712,15.927341681200247,18.28960579210893,19.7000474407983,24.035220065837784,11.642559027100493,27.946780395974727,14.520608854574736,16.802757757404425,10.75072963218557,11.454474543253962,13.648545529520156,26.766748978499333,24.794928123356787,14.610182661702282,15.215808151365797,21.75861322827014,12.9361289144274,22.375481906053743,26.622923013107492,21.091576259531802,13.217440454382544,28.7987841363484,23.208304077124406,13.23096088211598,24.135610048693685,22.65492381033981,23.73707849136427,25.76746919473814,24.26369922605923,18.490996391181632,25.809368413521966,15.67361592901776,29.191630344316586,10.122097288398638,17.03433202968934,17.057785793097544,21.612777596131455,25.564498179691903,25.105439076508187]}
},{}],71:[function(require,module,exports){
module.exports={"expected":[0.3783403250183257,0.9112531910936446,0.8424201656560897,0.9943933510203163,0.706352729672615,0.49162155525001894,0.9091682602587196,0.6768979032904772,0.9690983682940846,0.9990941711651213,0.9976429380706993,0.503819462372147,0.9880863678538269,0.7057074103873107,0.7775902412269708,0.10175291148158214,0.8191279255731667,0.9808807174645866,0.36098748392286995,0.8953468584550077,0.9674983319008696,0.9920454391143387,0.8643744961655074,0.9474278231918178,0.861502121019401,0.9829136854467505,0.9523751080812786,0.8682667634735788,0.968368292993019,0.8331033382615929,0.9241369801461848,0.4055416929296105,0.9945528492389394,0.748071439896844,0.6165850894648235,0.41742516367315774,0.9963916799199131,0.9938447263951546,0.9985379875226765,0.9974816789135947,0.31182782481161897,0.9968806968430977,0.9750145537951127,0.9349634359914887,0.688528356905878,0.8071652920908081,0.7443191463950192,0.4636414600316383,0.9953359133299344,0.8889981478913181,0.9900945140571077,0.9902915835252477,0.9937903681983111,0.02914681306523452,0.9671460487367407,0.9951093636753293,0.20136281541287251,0.9731143269071932,0.692002794408688,0.9970887844439659,0.8764326993810438,0.7464352482302035,0.7831413138896371,0.43712030932294277,0.3451462812645499,0.980900746114733,0.7901139977270382,0.9989820972723829,0.6794268059442379,0.6283787336259705,0.9930124558149093,0.00011898954474784883,0.9963537090909981,0.9857915096228623,0.9574330633859878,0.34485274292593204,0.9811224259071387,0.756905663069366,0.7267813166987949,0.7984269215813451,0.00012464728422059593,0.9918926382656292,0.6842009886189206,0.9855136966239872,0.027914191697136263,0.9588212003644057,0.6085707875194826,0.6852895450035537,0.9970205896576982,0.665674654865992,0.9843689613204765,0.5587641944010601,0.9866465714518216,0.9931157058505792,0.9947432107118281,0.9990384108176451,0.9741510407346653,0.9723275954323346,0.35714491120176833,0.5091594851988446,0.7542511398600973,0.9450993189393144,0.9635796778413115,0.9496646436605676,0.9866737175550293,0.9647642837354192,0.34427500587302007,0.8985973767660516,0.9839674387006925,0.9945912403581454,0.9736852287744444,0.8376505681564576,0.8977266944540817,0.9844362132029809,0.938019786497798,0.3209707492296934,0.9820359073265107,0.9964921141128871,0.9977078368659722,0.1787241726836516,0.988506600245163,0.5193126886857262,0.767924040674349,0.10421471134463813,0.8522712947040888,0.8991092970840903,0.3148303710046598,0.46452869455493195,0.9971968434567351,0.9946618538574552,0.9855882402875837,0.7290955153593055,0.9521165129536737,0.06347357988116992,0.9953892677040896,0.9898934728885831,0.4244023119557797,0.40525582386300685,0.08859487342588622,0.547795407386453,0.9450156576820382,0.9869548386732239,0.9834348504022614,0.8794649615589505,0.981388746132412,0.9030202124987501,0.9749205584824993,0.9845410601313933,0.9784437761212859,0.9071740834239703,0.6042582358130681,0.9993380539903594,0.4332767915214383,0.9515620994472829,0.9919472472368454,0.9898573955437209,0.5621170672402984,0.9898075291382415,0.9582725963874449,0.9984625448401032,0.9940692933202246,0.7035967863099228,0.2615587596148942,0.6399071012753692,0.38293262078702434,0.9831977355922923,0.998803695452136,0.4401806479534035,0.6954863153488386,0.9465606121578023,0.6801462413012158,0.966912980221015,0.8138755473943795,0.3838545605633936,0.7761241347514349,0.9238058500980879,0.9966034405660925,0.9214945570300825,0.9916928767207565,0.9908892561593148,0.989835337448152,0.8207267222961299,0.9964250082784419,0.9904812712456141,0.9236438768493664,0.9987710161000722,0.8204058708529318,0.6878884912153667,0.9876256323308059,0.9488564371764419,0.9991731505348548,0.9849971593810317,0.5256001350315957,0.8611467911252428,0.4617646507465015,0.00041227463813191744,0.7809369954668604,0.997201503527477,0.8717565741824516,0.5494914236453935,0.9350382714674663,0.9934478502431214,0.6865857766815404,0.9971728648788283,0.7726044862717365,0.9813814914812908,0.9844987309169044,0.9735777932139578,0.7602372180969755,0.4842015026504707,0.17765628167432929,0.24497245576310792,0.12937778250019472,0.8107820062517102,0.6950528178768953,0.9762844246139817,0.9965015606846469,0.5191151958975077,0.9963938547309967,0.8534875501518469,0.5888012375275922,0.6433575146974143,0.7457464099305489,0.5177973867149979,0.763220826698757,0.9921626384911362,0.7554860942966393,0.9656395622997626,0.6434331425059638,0.9881418681875358,0.9901484901216387,0.5381903676995031,0.8012460195125397,0.9631724808001954,0.2149493016914102,0.8245904792453072,0.11213948618115333,0.9651123612082518,0.9307891799440627,0.457462950122064,0.9949313418389469,6.265446262334862e-5,0.9881838526501964,0.9068057702959388,0.973417615795083,0.4272068828449891,0.9813020224801337,0.8363516196222007,0.9519703591867976,0.9947679817834233,0.6410939578469159,0.9869999482349344,0.36607457269527854,0.7651768314398666,0.6813032908195215,0.6473066476415186,0.5401919579360983,0.0754359565388528,0.8517133363076765,0.9932853476989292,0.2115639298960863,0.8437312748441066,0.9948367802802727,0.606739459063429,0.9916437028426706,0.7647520426366554,0.632354421180872,0.9798437371425577,0.9949160096777072,0.9135689251489184,0.9912961842815224,0.8469729438875555,1.2275315322885963e-6,0.9692770642265067,0.720496805732064,0.8946622372600848,0.13378777405926345,0.9745306877072275,0.6441529656177161,0.9920901266322169,0.4314435805836089,0.7846361930132513,0.9988103665489763,0.8215580459460836,0.9750623326998178,0.998889171831491,0.004063722209634565,0.5861981616657435,0.9598400241579281,0.15132204578527578,0.8578312694642931,1.7078317735833043e-8,0.9992429874740316,0.9933853023365609,0.9486858588515177,0.9890354065145142,0.9624079191187862,0.9989565816550559,0.22422328106956493,0.6249672155297008,0.9432154335699838,0.9515043734941481,0.6893023252417416,0.9878485371461723,0.6392479901737202,0.7836362480752592,0.9863684112926026,0.7388463982986848,0.90852424329125,0.9176118646295357,0.9896570377883028,0.7329280749218945,0.9931630895828956,0.9955104187918129,0.7941712096511362,0.9587185149582651,0.854663745563609,0.8488342157604353,0.23140312866021165,0.09915029251422876,0.5602153245676251,0.8796580651978365,0.9947227698473344,0.8272851869750211,0.973822812872842,0.9062063376842255,0.9955478169295833,0.7221862431375077,0.9898353470912091,0.6896118992601967,0.011529199146460152,0.9269965176259808,0.9947206333386185,0.8894192725214293,0.9947692847642146,0.991876014897672,0.8653440616018353,0.04119820404171961,0.9963871996528915,0.41405776657167837,0.9412308032582235,0.8654005609760721,0.9933490991371688,0.9911003016386417,0.989691221622335,0.7956008511477828,0.9557372798036899,0.00014688571300884964,0.897253524323973,0.9248689917979683,0.9740494452249201,0.5112812249605152,0.542561134824199,0.8778723987413602,0.9450630296779048,0.0104081476826414,0.24472898800650034,0.519218893599234,0.8850523906892186,0.9889915996593865,0.2917245141666074,0.8995976547949145,0.8777593771298953,0.9969567642782211,0.982872114844973,0.9616148332720131,0.8663149164028597,0.00270268428204222,0.9028128880570382,0.9364852763936471,0.9464039016343063,0.07269235456859331,0.9395784083774767,0.9992236694791778,0.9818937883550481,0.6897207832542314,0.5829860822083055,0.993932770792443,0.9935437618205856,0.4276276455520206,0.941100202663232,0.9715153922218224,0.2626106005880807,0.9969006269320511,0.3891045196772699,0.9364574777998825,0.9730716892922385,0.4291038025847711,0.8645293229564822,0.4972144735633611,0.023133399502356586,0.2198591287341605,0.9459268745337168,0.4010499511727439,0.3894922577952058,0.9932683112855416,0.9859542603734925,0.9828735707634948,0.9337625233582543,0.9896006820399603,0.4806980309907707,0.9168470343351416,0.8571544594039242,0.9960380828883207,0.9744790763808582,0.6623389581920336,0.5887533592657729,0.7329402444173476,0.499978151456676,0.945562759425423,0.9843409984555697,0.9741800988498677,0.061831775579696886,0.8395106932134043,0.8847712047864713,0.9973065050968322,0.9265654382039057,0.938575398153786,0.9919171179210662,0.9401803684115515,0.8605996737920127,0.9809167573565603,0.9916651908209164,0.9861614981434612,0.9738034054018093,0.6533142080537262,0.012453992968082188,0.47470212869597994,0.9509378816278999,0.9600649775325252,0.9156691170614106,0.9760942899465407,0.9709241904019668,0.9895159446485838,0.39747484965529456,0.9688115080791249,0.03750605470603949,0.8606997350988057,0.9662461068322632,0.5096387836284296,0.8671577658018912,0.9739423919442015,0.4902346229754916,0.6642209547758413,0.2212722755481622,0.8048080813095724,0.9736952452677281,0.9970149390400753,0.3919427136859404,0.8474826212866291,0.9929250674761512,0.6961370078757048,0.9532924321520577,0.0005144597919365322,0.8705450024896277,0.9912402852829354,0.9864646010107863,0.997199727556394,0.7577818182454011,0.9239162743173361,0.9085394587957395,0.9959617178597875,0.9147269135527336,0.7719752477477821,0.21480530833243955,0.9717763324923514,0.9188475008102528,0.993973183974874,0.9783785570876964,0.9591739217489836,0.942103431000976,0.18256305794354408,0.808431528763313,0.9927089999101001,0.205726785033901,0.20808976112208072,0.995402885904682,0.9970810275404238,0.9324358439016149,0.9768002396698023,0.9922503307194013,0.9909777022603481,0.8498612645736502,0.7700192085865978,0.9165834107675304,0.6121650116229348,0.9986726838348357,0.980942080015907,0.9975151067977323,0.9689726352013521,0.7102746590768101,0.7865040230108761,0.7415973302668686,0.8259052465130564,0.9751246887309538,0.6601273279955625,0.970428309762607,0.9435613740260655,0.21872669370021972,0.9111991576351961,0.9754995617803002,0.007980928672813718,0.9700477076131552,0.8415888808082378,0.7793935051008921,0.918127508104782,0.8759436991175704,0.5420729415067891,0.9908883118000436,0.4216615160942997,0.9976296263175404,0.06209115701563241,0.9963164620498989,0.8279340037076176,0.3938932494089492,0.20967887090575213,0.6945572766633715,0.7667044355647388,0.7636133088354993,0.5989091752624993,0.9510501860998675,0.996964452236339,0.9975997674355815,0.8720201782314274,0.980669959624032,0.6066008133874606,0.6159162810275821,0.9505183682412952,0.6744585450842884,0.29865096922839274,0.25864276799122815,0.9804113816578179,0.9655257624872817,0.3016473586689702,0.7561159585664969,0.5586778680408457,0.9725060546655033,0.9385013451693485,0.841472542992681,0.35678828311139466,0.7686315061115548,0.9412530203121547,0.9942857805927636,0.880146588586995,0.7625665541439565,0.9995029540173894,0.7015930939150403,0.9735081756687274,0.8552204627858113,0.9022008088985933,0.5378370790017484,0.9486876104358832,0.8202084510987161,0.9855387078430102,0.849579237539361,0.32113819784889375,0.6774084121807815,0.9976673562527165,0.1933992555974252,0.9989045139810585,0.9732198787702309,0.9969051973274061,0.006514079750767077,0.9988645926561615,0.8447676858833232,0.4799548138149977,0.9944698384660932,0.9564423995774071,0.4940332537455886,0.8474466866759329,0.9894546394052943,0.9478860900662827,0.9781238117606219,0.45333980499251947,0.9171872095378508,0.9922020291175473,0.9470826076842069,0.8940895984996657,0.8551669308254846,0.9481380461478164,0.9940168633282073,0.3368053523107748,0.9945292656616427,0.9925734582770392,0.4320139827170163,0.9595475459358227,0.9962160710149063,0.87362448266608,0.9917907269619093,0.9349844309490698,0.9230796306684184,0.8599444172608253,0.45563767465387006,0.28627516728174524,0.9820883290946497,0.9939205965727047,0.6687212708833072,0.7230895882501402,0.9992603642105332,0.38660096156324464,0.860987813369917,0.9700680554518735,0.9780452723011508,0.9971137324838981,0.9940420229128799,0.0008269862084656063,0.9833376691740853,0.9429538975331216,0.9688150943344315,0.9974255140410104,0.8930501379652913,0.9162321988871969,0.7676030789549166,0.8531175920052294,0.967695075432977,0.9606681418818241,0.9280592914801673,0.9966942957649427,0.8782371339996533,0.862882495452662,0.995596830864766,0.9965295777335375,0.982498208580449,0.9865408884657973,0.5822302094905264,0.2306805102196722,0.9010674104198867,0.7161640118172585,0.589847191163803,0.9766525255525438,0.3913540063197528,0.6329541567810182,0.9023804917914895,0.8957675822441253,0.9981399794365428,0.040921666632169736,0.72816539756167,0.7477539494704628,0.9392070345088899,0.9643981624506761,0.337498066736422,0.9363720652058884,0.8994055967955885,0.3600746985138412,0.7283205280838582,0.4128703513743788,0.4872483014510418,0.9540461904436465,0.9504371761783073,0.9494195210554606,0.6131529872684576,0.7018206220893102,0.9681659509372613,0.6268337409373297,0.9586452362396695,0.37651550290482716,0.977129602816118,0.987859661011703,0.9446295460667278,0.7996296940067934,0.9978117031391315,0.016384965426398394,0.9961622061607891,0.9762536821638708,0.9376882481762957,0.9947588321991333,0.6440637313677046,0.9958464754781452,0.8366401268864774,0.9969292716720003,0.8585368867672258,0.9950060894963921,0.5983114595654766,0.981268500269705,0.9193063409346766,0.35972532388072787,0.9755719761747175,0.9543342135148318,0.27592905155541514,0.9823852790791185,0.7488705155487156,0.9764071059174586,0.9804514107054398,0.9845317719579714,0.9243642262229659,0.950132549031557,0.7928096186953892,0.9469312540342133,0.6983581643119535,0.9967229644054736,0.6583159575251664,0.9376847332887632,0.8551466373346066,0.9834761521718189,0.8467459659058598,0.21782576384989585,0.6827275869081626,0.9856785631477267,0.7413958474153713,0.9473675304284069,0.6720962768940418,0.8575075708259852,0.9696595744509638,0.911191246723229,0.9820485487402353,0.999009151571695,0.876887155342803,0.9177359752696073,0.5991064605906928,0.9891116699196181,0.9764914195294987,0.9050969868419185,0.8347394156365224,0.9970185467678541,0.7854068990033335,0.9966914902680861,0.8921038540427642,0.9348438423925816,0.8471311264235273,0.9831450623034521,0.9500372359384921,0.05156165043898326,0.948471293245833,0.7698289200969762,0.9263808785877192,0.998757943861625,0.9642308788729168,0.990833140710746,0.9519345322272948,0.9576902980794619,5.733670297026661e-7,0.9606750162196567,0.6241918150468312,0.9974910304951965,0.9975707882429022,0.7584589983171884,0.9986081389259249,0.737938246790923,0.9606154343850243,0.7642732640449544,0.9609108858912896,0.7836427760319372,0.908757130865848,0.9907994892523735,0.9931353390637184,0.9789090884654383,0.5763324177707994,0.9433142747575917,0.8473247559725979,0.9945961342761898,0.9311553021155579,0.551500943514553,0.6644339912035674,0.9708945585763396,0.6496973029790826,0.9245918502251192,0.9793503357851927,0.8253466613618027,0.7641940004843873,0.987111168338965,0.7726159326007276,0.8108489648145627,0.9954300745220779,0.8865016479516944,0.9861455245781996,0.8180715616423861,0.986255610561209,0.9835926331556608,0.00013500164215636762,0.9775560897797397,0.6543001608151893,0.7748897680981284,0.9871522179818303,0.865599550446431,0.5480952388901168,0.6786146038852008,0.9979473052913415,0.7165528847324939,0.6294811474289528,0.9881861818489255,0.9838696886122813,0.3112351136220943,0.9525739696245007,0.6259459609871144,0.08044442547874184,0.9855718400853787,0.36744035717955015,0.05906746769054865,0.9666014909868696,0.6008432406038839,0.9940568811895236,0.09365147631235132,0.9987858277606073,2.5485496555913794e-8,0.08705689573630962,0.9459482821443805,0.9417483088880103,0.9977614860536451,0.9988935544098253,0.5714296559552392,0.8903262554513565,0.37576290439296106,0.5255280075998131,0.9993307393920294,0.19469006565625155,0.9993043800470107,0.9383080293084832,0.9628854448967528,0.949914891929412,0.8812462668747797,0.041815074278044054,0.9165950420080855,0.8367518740730961,0.9975597994793872,0.9984356217149568,0.9267779006542944,0.9767821771834223,0.7655285128194628,0.08396178994400816,0.9724001874172832,0.015296189047521084,0.4713209936461648,0.9596899249898277,0.44727763206557036,0.9184271213995715,0.27677067558132157,0.9974785904342497,0.9130992132446276,0.5288761717382787,0.39531442422927443,0.5086186988258036,0.9803880744758373,0.9815363429289922,0.7660929656451858,0.9281669753143397,0.9177074690375768,0.9226420597541479,0.7494560466227179,0.1972692798091943,0.9680184629225749,0.7175455472014796,0.505422878907845,0.29130178786783534,0.6166040683687818,0.9877635251541115,0.9913920388205351,0.3913900875632251,0.9593192067157867,0.8004277702244336,0.6519729403701988,0.9635528132771326,0.996731804121914,0.02288069358819757,0.9838463627223488,0.7075371457000548,0.3774271991522534,0.8044095067719772,0.43973801080187847,0.989132881101217,0.9760670315103022,0.6106751820086016,0.9126021607131591,0.5832357775831214,0.906394569970446,0.7727520651273925,0.9708694817283807,0.9986792329213041,0.4094420939005998,0.9384313173049004,0.8584659980355704,0.8041273214544509,0.9992400392948863,0.8755657777875605,0.9891933095862304,0.9689783859414223,0.6642253916426895,0.0006106238986530988,0.5924636359005224,0.9968466509892111,0.9912107461055463,0.9838754839830341,0.9895370434584474,0.9659629964649751,0.5935512248446966,0.45247355813209034,0.896776929379574,0.6692976588345873,0.7817534319015087,0.8587283711853223,0.9751380402025849,0.987664469769707,0.9729571328931944,0.7932147962544892,0.9448639182166454,0.24892379902877623,0.9556897027792821,0.736757009345743,0.717234603486822,0.8095641029978284,0.6737072968142666,0.9928564977129017,0.0432102606710407,0.9981834619736851,0.254448755574573,0.5841132814367282,0.9971815707233682,0.7595002988738185,0.2509481036813215,0.9573802736180165,0.9934977089480597,0.8292095728313013,0.21467758160233424,0.9910067310979496,0.9959410212460214,0.584587720566772,0.9070382517751732,0.6442117116199846,0.9847408281836244,0.954344088213436,0.0005033070625117417,0.5583046453906191,0.9978029798383056,0.9468659267829863,0.0024122112338603573,0.9936130601361677,0.6119244437493185,0.5856305453947004,0.7313816652401537,0.9897733926462096,0.753430853092449,0.9978087995404142,0.9800431752957272,0.9373633658603774,0.9982654806601035,0.479218808588481,0.9867564154164268,0.9938475191421223,0.9936678262702954,0.4762305661114542,0.5304300644694444,0.994052919677858,0.813456480475213,0.9787136305930468,0.8880568312194643,1.0231700083620757e-5,0.7439776842917458,0.9969678977733822,0.998409873308456,0.9938460505811274,0.9548399878610074,0.9916355624637372,0.9953994390770675,0.968515073788666,0.9736763511873144,0.819724741000247,0.8051608107810376,0.6488102104420252,0.28694014341853447,0.3375351692943691,0.9576479864747502,0.7802587422797391,0.4938371003078892,5.08011267180746e-5,0.8462099544045831,0.49782836814006315,0.9061809057670258,0.9898335917424188,0.49737599528018195,0.44522688231319163,0.6317294165878771,0.7816047545930714,0.9955543259737571,0.9559318516886983,0.9683804041552203,0.9982506502761377,0.005564760534737918,0.8852038233897068,0.984971079114304,0.869144293219507,0.9459497359976288,0.998738040952065,0.999203253502236,0.37434392232122776,0.9183763598295543,0.9829405162782019,0.9714852043574431,0.9920155070239288,0.9961551940552049,0.9971098181414857,0.9777004051505345,0.6401194723094095,0.8945054274041051,0.9644718700616748,0.9572385545711553,0.008489062284297764,0.4305139393296144,0.9804015790332614,0.9883554286574912,0.9969696841099875,0.9310877154633594],"d1":[15.251394181581933,11.288156921093417,15.509733117261408,17.695389458671393,17.296576763971764,19.123195058186376,11.678134498504068,10.65506721979517,16.05816082050463,17.345881300421667,10.72868267726238,19.86004980773296,14.267124998556184,17.141310309922922,15.355013351262627,13.526250278922182,10.639129666912924,15.147230748135849,17.871831799114776,18.774336535737135,12.102537396411853,19.567561705355473,11.632758005055354,15.05968993186032,18.922156361936292,16.906837182030934,13.855377182549347,16.988890105208807,15.234853355108731,14.09422577883236,15.181688425909927,14.374742120990831,14.78451541482958,16.774647066280846,15.716485472615195,18.03392558085856,18.023503441317885,10.538545983012996,14.894876865637327,10.826011621567579,14.007093952780114,18.094219580055917,19.113168206363532,13.51448624841761,17.329265613009966,14.260638173851877,12.221352449008796,15.207180089570159,14.06129940933624,19.61610580581433,18.948564159357666,11.00481489196672,19.993268098275205,10.706685271083698,17.971099562774064,11.614862463695978,12.89869051338468,18.164966264588628,11.456941898138801,11.829624502592289,12.464157229385012,12.97375666197101,12.242689452536908,11.892050170143627,11.055826177607011,14.91573590297744,16.46568504140705,12.686500492906882,11.306236027289444,13.511939819266413,19.351307628950174,17.124831628087016,12.867196643700385,14.490921730035968,10.049003822684064,12.174952501399392,11.63608239436119,16.094925254049688,11.103714615951706,10.9561576649877,16.90351974439834,12.663849116050475,10.422249639060785,11.656703046936396,14.680073414677166,12.603949501007838,16.614843677131958,15.20571546582547,14.481376524685183,18.820141003727233,19.23678104402846,14.557788127148603,18.09484249631953,19.586469415492893,15.121221014593653,11.139450922117334,17.085040450663623,13.95373995859549,13.032263385264145,15.353664087820182,16.032939592173634,15.98374178954921,15.610115781319156,19.007756260073695,10.254865860261017,16.147386532539784,16.83646787026885,17.574224673132537,17.989494850073033,15.96033045564993,14.960533127157012,17.59235548733174,15.251352064338358,14.086358159913123,15.558052169341348,13.914129573465587,11.243655901116052,12.46504241411077,16.40428101229952,12.494804340801103,18.793282796245812,10.429583861893052,12.09315874391002,17.315805789119292,14.47193468733784,12.163786238073538,19.533659783232533,13.119981818247062,17.981268162019855,13.384716134040639,14.639082949347921,17.88330138950274,16.8091110402293,12.534344756124092,19.42429795850316,14.223300090207864,16.44513095700229,12.463222095624257,15.470766526569788,16.50169627761765,11.70291486858761,15.733723735610518,12.045739903151834,15.542661336725272,18.991474101151336,12.588890306714703,11.47271110861629,11.582141475584072,18.15646750845211,11.302269284545275,12.090826687308912,17.993710780075066,10.212579802690021,15.652125398492862,10.915625121329747,17.72749803759291,13.36163303887097,16.336723311968676,11.257887810163949,18.00106362794093,10.487523518391093,19.32116126841187,19.605215438892877,10.214047916331609,18.050229477429248,10.23439248017356,14.686744326895287,19.08440204778622,16.869478552296677,19.467693094568485,11.051111817585415,17.771383193986633,13.981655755939206,15.03601182003255,14.720454951595372,17.82045307883521,14.670919003857792,17.397263915556387,12.83697911496568,13.885012367978472,12.203788503657126,14.926559418432387,14.721551847214329,11.566391992687798,12.648096556987849,16.93073763271754,16.30681293867941,17.862639944672466,11.648404669368066,10.01490036601874,17.796470716029887,16.697746782814278,15.699514433766657,11.870462740380553,19.881792128484445,10.040978440950523,16.72230856211715,11.445737417772266,12.046056810480735,10.016097189149749,19.809282387588894,17.699152309825504,18.31701366085081,13.912207416237816,19.87719268974223,10.136938901577054,15.440913934291501,16.981401664799677,19.18771537563098,15.08745231435433,13.121163752967028,13.183527853402328,16.564023935406915,11.8965748762958,13.936810561086748,16.134896785071895,19.451090764826574,16.72007286349108,18.45188083332392,14.967125935755238,18.804068773224927,18.110948191815943,14.284753947210444,13.591390814973439,17.905252910939126,10.099192329955107,13.075052961427184,10.093536716585373,15.506965188641857,18.00350606604377,13.355100637313042,17.794273775134936,13.535270696679964,19.165955398340923,15.915467122225497,13.422138850657833,17.183455595492305,13.641410021147983,11.530810274658222,10.215798275811515,16.404452977653182,13.467213803720703,18.90288141640289,12.630728244371205,12.105161678141707,15.927592276006434,17.635391387276997,14.138567045782864,12.731045257623677,11.596246008082293,17.064142355665876,12.529422455334727,13.408296762988732,14.647748798602834,11.960256868237362,10.307188038747766,15.390337631688455,13.9506726431975,12.669082254650569,13.31782974199079,16.319557183700528,10.210982043506265,17.076147623859896,16.00381439364278,11.563974186570348,15.199460554860122,19.91864338037889,10.9236867161625,10.026539284785104,14.307356746544643,19.208008007139686,12.562406473136036,10.28052012727943,13.13125300931861,16.454556745175758,13.85351756257496,17.903890145887843,13.778840327169162,10.997110683967993,17.89105632504741,14.31221835634074,16.65373575747899,17.686389608404546,17.8476879951017,10.026926241413518,14.628757589802373,12.842758918322442,18.91258720802516,18.442133166830104,14.203538455382795,13.51830387977303,18.610655368897156,11.606629886562448,12.763878081437845,15.190952339770929,17.145477888042446,18.977829463571577,18.24941691144861,10.148310057163375,13.762810463847696,14.655331327248884,19.280390060188914,16.03878775296317,10.209069683346307,10.13172930093998,16.378053703184822,16.127359646154297,18.71474796897323,12.870836661916925,13.251781197559511,12.066725535879836,14.680795568213238,14.336148439730497,18.321658706643625,16.587726697328037,12.747639947694463,12.996371887815688,13.79073267095315,16.38051866653429,10.302692281848127,18.437339391713593,13.442929482247084,10.178917111283761,12.567806815048835,17.137288149080447,18.61487362772032,19.35152363706799,19.450036577888824,14.284996239146485,11.285531178318495,15.383370831495798,18.327403367445662,14.266911744401314,18.304192678999787,17.86890984163265,19.04402019919243,16.27045756298574,10.611698494897633,18.110757944585956,17.33830303691172,10.232136565301552,15.241463998625516,17.54100594643991,19.30215473324548,13.861341910390896,16.24147237032267,12.932370219084444,15.893078255260297,10.571147068975828,10.446847531836458,12.106380277532054,16.992760918006027,18.745043027923632,16.180631575679417,19.07378975636116,13.307935721730642,10.764512701651247,17.008239832065122,15.804258921032554,13.331152519100751,17.21174477898021,15.420472132298658,18.883142879448165,17.50550570578342,13.001870505020907,18.99193782516003,15.26817773634874,15.441234691478666,17.977507361049266,18.115978790152038,14.391200567654343,19.369625004127826,14.142191886513375,12.235343578229651,12.636040577898896,13.304053532034485,10.254320639293548,16.033518526099986,11.246515020447045,16.575741036193506,16.360226110740072,12.515870410941828,14.402802792427334,10.594444138558412,19.528922359427845,15.64989024000727,14.573499730082247,10.918906579697904,17.19764681440337,19.57932570330437,13.14265602884435,10.56021502215356,18.23686133769715,16.11012959118588,12.056766930893266,16.447330256363202,13.65153127906651,15.596269469848181,10.881788461968032,10.621551700690086,19.134113032884564,11.826210999278558,17.471799181057612,17.222027168639183,19.454214680214896,15.026551155577145,11.981141312842169,19.23209787505053,19.72409618591537,11.94770876105265,16.407662545164747,16.112442109226226,11.107058302885287,11.388407603781781,12.542256348715394,15.130151023335275,15.258844286715815,16.6597968297159,14.998831299137333,10.760741575786383,15.972257510574781,10.76368604631384,15.653370955351871,17.270469914147284,10.296350059639504,18.138970263077923,15.082098789226084,17.153053675658416,13.927878773035491,18.13220028105642,11.85566888706088,16.238237407175006,12.793147853879587,17.32206978691847,18.648409337892744,18.90215072678815,15.223211995689443,14.990269550985882,12.862662991274536,14.482761634384751,18.395053148524298,10.809821560606265,15.852895803708067,17.78551485622948,19.460039537655863,13.618400004008048,12.974341605411464,19.83303450545153,15.668739813362798,14.709019981154693,14.850250102231703,14.689478119749298,19.22634827455419,11.859619491617588,10.681470336564198,12.767370547457622,12.837451734781622,18.86077488464192,19.20398353910979,16.328269204259406,14.001905580449005,10.689063459188983,10.252697000023392,12.614035897173519,18.039418842509335,13.42743917163553,11.400862125586304,14.365805280565286,16.932893099130283,12.573837115563663,15.62800969923246,15.325673840914337,12.735651659917197,10.733806264698027,15.419642862301554,16.6623939177131,13.091328715050572,16.344267599933154,14.298054032259495,16.690287479667706,14.34543395174882,10.644731249462822,11.610299678450017,10.38110978046449,15.579948225251934,13.943813156031817,13.635650159863303,14.839372521511567,11.418301977928166,18.133573056408608,12.353197746990077,16.70924828748078,10.816432336996307,14.639699379972797,10.025527339183856,18.401002782545152,15.164191360551868,14.749400310122505,15.887073048304464,17.771978583258147,12.135984525439955,15.2618292525524,10.402725372325117,15.673355096435122,18.6138278082893,12.526949794847603,14.343376372914484,16.74643115069898,10.60385064413424,13.395402437139577,14.458901523697634,17.120921245706164,15.516933586424761,13.623571130641466,16.29641235363275,19.991968443125216,18.57314971182924,12.768568749157032,17.406140622899454,17.75943716274943,13.727818336422224,11.421117347783538,10.21719307356503,12.685040549102496,17.62736525608,18.700772962163835,12.864144940320362,14.07819511478282,12.747628110397454,16.153974175139197,11.943142933176205,15.382465429259458,19.78062436889568,15.721049538292968,15.637303952547137,14.747392407423863,13.29458801402244,19.889693379382727,14.999127333779285,10.136500685503474,12.708236575353267,18.34638021180404,13.648943503803146,17.68905883432094,10.614108305416078,19.302322905273638,11.543351191129375,10.500481523059271,11.327288209426884,18.17868300741258,16.788678865519394,13.8752742744947,11.908349161315323,10.172857797881981,10.31944249180052,15.452606267962041,15.6711150279987,12.015314467522503,11.68457171429323,12.532465837296085,14.191182247254382,12.455690343888078,16.396045409241964,18.62163935989083,17.300805122481908,10.837628305252201,13.465749134644424,18.92605722521374,19.156581533169543,15.706022587682089,18.129076104820182,10.76104099096028,18.862892782711555,10.687998202929714,15.728022018155357,12.775865798772037,16.84306540096074,13.456549698003133,16.44422664326303,16.276602636151125,17.012228970067262,16.06698053906447,15.393206215449684,16.884201596330197,11.442325378676067,17.87630427159749,17.417289371233913,14.461417941455743,14.774085247220487,19.11816617358292,12.5763797895726,11.967627573257394,18.358440317727084,15.25322725770193,10.532844410071773,18.75564959454593,14.411333607685082,18.646373399817392,11.397075718258593,10.731934524585228,13.150167492343968,18.246252397355534,11.622231197331729,13.999335786858559,11.373229606782749,16.236659488225754,16.27672369364305,12.477134103897711,11.081486812290409,19.662928435297573,19.565211290340766,12.664453894669043,15.51437394838324,16.599778347437184,14.321690430726528,12.815492378740919,14.559090735169109,14.085540156455238,14.956959940022207,10.565372995609085,12.673317448034387,13.841731158163546,14.279184973244634,19.413523522554385,18.866780822377677,10.224398846921627,12.007702721326929,12.751887436036588,10.756590972782497,14.931008675254567,13.461519780935621,12.900690969052583,18.030722731131938,12.357566618448663,19.17578926479877,18.62628080695316,18.380269286322555,10.375051113318431,12.027300321589045,18.435167148290237,13.525424817742932,19.551609388021568,18.061478554616578,11.086026791451483,17.46373559343979,18.423812249082708,16.283674020578864,19.282574971061326,10.356922650320373,13.003686369919992,12.658771411349958,15.63618839160399,15.541519571037302,19.98267745099461,18.80291774781259,19.588479012067474,13.499364267849131,17.92653364534018,16.115033157890927,10.543140448258317,11.557657584803813,12.738585586839568,11.618845315409807,14.523964751309165,12.92476526294051,19.50254825365473,16.323959876519385,19.93609554252295,15.182177629554,11.140514456299178,10.07799430473127,17.844726988912768,15.600359817044545,15.672312432709493,11.06462712508044,16.541269812283062,12.862568306215707,12.098696150956194,16.540208346897046,12.621390917248503,12.526458268760264,11.284541832208099,10.834030275675788,17.149329344762275,15.789246757573327,16.54181564340601,19.066779690376407,10.7431736922444,11.635409163072957,15.368242666789333,17.59704823587124,17.853629263740608,14.940808264174139,13.572363261998676,14.115339058325496,13.495281616485729,14.738194295807467,16.504629103195434,17.20932957188591,14.155592958810114,13.357087895048954,19.078224522543834,19.201781608287483,18.675088048791366,15.162244509279862,15.647057271117843,17.310256345203083,15.68757224807236,14.27892989673665,18.97044627049236,11.031882977415876,13.718351061919417,15.124881340176788,15.095242344972753,15.298087549412521,19.681918491562072,10.482891353212054,15.166628146357603,19.1739068173014,18.8296160921816,12.092931099554496,18.658880691489408,16.386492926528916,10.493394590784105,19.327350720514122,12.787696779848526,19.620634131890053,16.42015948474092,11.118226207748599,14.184048402196312,18.474503369136755,16.812135167370315,19.469841031963195,19.27586532107417,16.052547606217196,16.512594246896814,19.89401047578896,19.006987274033087,14.541279814665709,10.199390502048294,13.98121158475567,16.05949327852657,16.402189567104244,17.79550465255397,10.106821237139156,15.352984307428612,13.721157955687183,11.07326476531001,12.089959807070013,14.752990399524574,11.493499364409207,18.908424304354476,10.405351946368317,18.197101637960813,17.343756317243688,13.538504898599664,15.225556978818277,17.779457611226647,16.20932649971941,10.34345097087436,14.560973470417407,13.715142844559871,13.076277654721748,19.11784528463879,13.854338787006,11.351149018472885,10.56544479690423,16.48505385611766,19.808928782899407,13.309310966979485,19.48986482112452,19.275246366345527,12.825283713327504,19.04580128601124,10.887887719385459,16.509726271078456,10.855299378435902,16.408499239695953,15.842061343204143,14.135356887268859,19.244913336119932,16.799379695479928,11.203827104955861,14.416968998638385,16.48367008173617,12.146431952116476,18.812267188014324,16.382318748982172,16.21337265939002,13.40868108859375,16.77882694150891,16.889642861678393,19.090858446876812,15.226431466361717,13.52144241842099,10.343245144976976,10.783921698480723,12.981011830468919,14.909771208191408,13.03091236708336,16.094513246855783,12.070934178004318,17.22959522752259,19.44733626580414,17.65161404770312,18.137641657890708,14.697824440189983,15.711891791664428,15.819355585880832,13.815102607025828,19.20026567599401,19.485591918099225,13.5483070481288,17.725055375053543,15.756389223697811,14.068209739659421,10.48895443055015,12.585969183733036,14.438213275221866,17.08124221278993,18.729885293213634,16.99661659082141,13.4385763817075,16.79528136510381,17.70624412339673,11.835933892689315,13.20614814617507,11.893465901478699,14.68859825060348,11.303300303482562,14.681074962195751,17.68567738365779,16.417552443166326,18.71281612953537,12.128583991081285,15.876323505464347,14.142293842141376,17.41953078865749,11.576232419082476,13.418565703790817,18.35469499961402,11.288534295655026,10.2126585286455,10.907128035783227,14.47364713997948,10.237913769303354,12.937932120917019,13.091437161144114,18.965348687388683,16.920243777557197,10.647678998161375,11.059236698441355,11.070097620946424,15.318820636644828,14.839455151958902,12.27959775878058,15.736577940210324,19.19026888584831,13.419972462168362,12.474208744935666,11.766769434067605,18.888257418994876,10.622837876586399,14.697254517929226,17.024163591313567,16.054237158791523,10.210649009829751,15.727724997353363,17.9021896855659,18.264705917810858,18.16429921791699,15.249947262279873,19.31189545537712,14.27676104524078,18.946031324722945,12.883881057802814,15.352262246504349,10.26177844398797,14.61827149959147,11.14612939596941,18.569815859236392,19.591629854074757,11.39835818231849,18.586709131292675,16.348287314990902,18.715182700661394,14.161833313244816,18.703411209879572,11.175296259793715,17.905945945688288,12.523442242802773,12.898856320796039,19.66689217543394,11.978503401524312,12.08417855010765,18.217645390779516,15.164904389605141,13.143087974675156,16.733729301076302,12.53745024963628,13.396398063244533,17.83214052078231,17.532101463793218,18.783124222769338,16.1612630710275,11.635861996446586,14.801978141945348,13.64871424455498,17.51842162338663,17.32319139669581,15.700969292248388,19.88997443816758,14.520655040502142,12.713294462023532,19.377350327667365,15.314650623735595,17.17101831406528,11.569572339019436,14.934700786144006,18.244653565272564,13.871947343803065,16.547272638378995,10.268857634412079,17.725788786474226,17.507224908258998,17.246301585806968,19.751858256726607,10.69175665034502,12.168749844477249,13.63754326572934,10.176936396730534,10.381852170453481,18.24650194356387,16.082168375454753,17.178290207649766,14.762577353495045,12.880811842265805,12.671979430260027,14.269558702126908,16.792009931064975,16.626180079209796,13.992185342991597,10.951939956077485,13.147962656494833,13.463300480681404,14.527981463578383,16.825084804337948,16.894333380851798,13.37043149415953,19.361331710374387,10.700949023531749,13.566011588803313,19.383332932990523,17.538886847136165,19.373005901745827,13.69414629801504,10.087357257239024,13.926711153375086,13.657035716873938,19.93446850099548,19.987726834594962,19.695720439036624,18.497435350710845,14.19526688745233,10.767735192054959,14.762118804786189,16.545546513412088,10.45521612070614,14.994966928717897,19.440934602046113,10.639854121427375,14.006523117795176,10.364024114061621,12.791202116671364,10.698625776669699,14.797618511448116,10.724906305949226,15.689278630549996,13.49768627582737,13.440889530539996,19.934605066222254,18.142498292191895,14.742319055919408,18.447362598649587,16.79834543727135,11.820179722562298,10.314626483053146,16.495310967595692,10.365503882581992,11.259906521399651,14.593886250725452,19.4848813329397,13.749991326942222,13.32070100561163,13.27047368900759,10.27143315718796,15.031566957230801,10.959669219749628,11.987311735903685,11.582214141389004],"x":[0.8616499643347209,6.792157195012742,2.4624588835851546,8.06644694679093,7.4375976289493035,1.14624343398118,4.254757304364974,3.028340071734563,5.625566244986249,9.28436359652756,9.106254559123752,1.2156665689847679,4.445671327271457,1.5863185946640668,1.7641955821928401,8.284039183736471,5.120310811075108,5.001718288064357,1.754617280490709,2.3622795300742117,3.868937960902461,5.14615540778925,4.011998442157005,8.966078748512414,3.7260581471142773,4.863879808103643,4.678588160561765,2.417211387260554,6.122254099330224,1.9354536782193255,5.608417698309762,2.6100310130334003,5.705910255503051,1.898663485669947,1.787785133587514,0.9524929101711854,8.102666268428095,7.819101260138199,7.613374746595922,7.725656116967013,3.695027670547637,9.335486139724242,8.382179513777416,5.075208561469289,2.6801907660179802,2.4825514408520277,1.5326441027974647,3.7672550335330635,7.923045130711124,3.286568631210669,5.38163096718947,6.109005102077145,5.664816823078532,0.21064552289002503,5.6377793909703255,5.898494202598334,0.5735704513818751,4.633241926821845,6.045981510228263,8.879362322069099,7.653080911348695,2.663814364643007,5.643780275206329,5.225557492284889,0.7830924361522595,4.133489559361864,2.0737750285840395,8.932282851984315,1.4970620500414666,6.5551903788493675,7.1008913184002225,0.09844671096528756,8.886130840452173,5.839347099508217,8.25532760168166,1.4943458112451613,7.261575450911537,1.9688259455600288,2.589179438687119,9.431936739028608,0.11725617610101713,9.199713268180812,1.70112682229979,4.317733384579516,0.28432106137665336,3.728111804686518,5.089088502007037,1.9168419798473968,6.603459621276735,1.5872490413094642,5.523832848577152,2.779299398090971,9.17922888847919,7.668437802642303,5.99565216240749,9.865292767694482,9.418528575904375,3.9393878852772923,0.8176807045873646,1.0574237505205497,4.1486679013745125,4.802401313604745,7.826645193184065,3.9258316030017193,9.211623349766322,3.7840978960440164,0.9219641856872585,2.3116725873805266,9.758387917922057,9.658518749320123,6.549232007025942,2.5769087160184556,4.898499821007809,4.539572919252464,4.2079868975636,7.431365015760143,9.830514900879772,6.269459475164776,8.339170821744695,0.4940510572957013,5.614532258630218,1.7340297772511115,2.3205141547782904,0.5032911884799929,2.03042165399677,2.4353091770870616,9.36057920208161,4.84135079539972,8.621461595998323,7.849474513516832,4.540342287661431,2.430681141422697,4.597641441480961,0.39729790789437835,7.478417426347854,6.0340979026697905,1.6938380129342967,2.617551477442852,0.3930637096854239,4.9232164842191946,4.924690501350961,6.264299087828351,6.697297073277843,2.6406332754165907,4.353873177710206,4.124523860863977,5.85696421756281,9.39804638511507,6.545088505694778,2.4491461122221447,3.1071454326153125,9.097296553557737,0.930844713846859,2.8933825112248446,7.220423670336262,6.161253237326085,3.6687835608752994,8.832546620415119,5.582768833281532,9.020955368417292,9.759182237003705,1.607198637525522,0.6992818024668068,1.376066432781018,0.8770490712925816,4.304586462374125,9.645723713412984,2.178346282432153,1.958857646723382,5.047949441105639,2.6169685426997136,7.467228358537302,4.99804474138668,2.2387032866517242,2.491971829019066,5.628388474449353,7.181978433567133,5.2539211814579385,9.963002219140463,7.347335151527714,8.867243543501091,8.690370797894978,8.524195781286352,9.194137765900848,4.846908484634169,7.946356290608055,7.871909339427086,6.121990639970805,6.364453601793965,3.6852330536617894,9.786980120274029,5.3061480666417875,1.6846679235940187,8.79117338323936,6.799181677086564,0.07335168714821316,1.9718728946571051,7.055201207083295,6.3804795937160215,1.0870796940038452,2.973783146900104,8.700155060736787,1.4750826524858929,7.316936303284212,4.376553181741178,6.5823191525963365,5.153307108470118,6.055793944501375,3.404307716107684,3.6437748284435334,0.8569479438755767,0.6638477174971058,0.535376951582045,3.7075326957843036,7.006431762258034,5.185311968738451,7.601770975681927,1.1006814708104629,8.0387050343097,8.877824214876588,1.3236717470888815,8.611448661903204,4.263523966499239,1.0475797046552193,2.279278988523903,9.744839011731585,2.609143438836403,5.536192006290557,4.842310209202221,8.180618846693246,7.276950347664366,2.149570259648914,2.1026415709375557,6.049557471050242,7.27389285095729,5.407793372950678,0.48906265196807297,6.967354532227716,4.3785401847789345,1.3030629235534241,9.743978815629719,0.07213353244797993,6.252649002086075,5.9151174953996914,4.055794732011277,4.967086391352544,9.972310282761686,5.428634031133348,3.4176607687397254,9.441049902827956,1.4444729471798157,6.499866160049987,5.906877445103518,3.976621264031459,1.5231602629928576,5.152212570836763,1.184417854262585,7.081506641056787,5.2243914382944245,6.903791838552628,0.756627830737151,6.416485459987042,6.101958068605242,1.6454794930475969,8.893812996592521,1.8223401114635296,4.471541082781094,3.9942716932748112,9.217725196987772,8.95068527959068,7.789955216296294,2.9110960201198077,0.026723958269341264,5.282050297955063,7.600037124464314,7.409517146518711,0.4530195292906902,3.6278799106293547,2.119683698677073,8.695810076223642,3.756188486139702,2.5145063737188833,9.136832355698957,2.0096602856459156,4.639875237849857,9.814743518063093,0.18875631638769041,7.884886440774612,9.730734060580701,0.5357362114192687,2.1383209657939473,0.038375613235623884,9.419974244109481,6.295440599981368,3.04041701354016,6.773927981568837,6.149939419017603,8.425152637325308,0.5976758401853766,6.000645599281793,3.11810423787388,6.4164298922543805,4.022968538703989,8.097284016826492,1.2648915998959187,8.421705719428033,8.167013022631483,5.0024994399413,2.956473356814451,2.891245787671457,4.701804943360592,2.767469259005322,7.03129612508026,6.44005345760754,5.812098836784598,4.969574100287639,8.89374235719238,9.335346793875983,0.6743674305720782,0.41370898495599384,1.1983702472918112,2.6673383760779434,6.267342544191921,3.7213425646561116,4.709964377887084,4.544610217354208,6.895509613498847,2.0621935524093993,7.404867262438525,9.637139597450311,0.19591102827470008,2.661909547847221,8.0386241590524,5.816838536765852,7.213015360333051,9.450162345369662,7.069284169754971,0.27739846966170933,9.67086773522679,6.570324018557077,9.81457383282812,3.285633780056627,6.221483142740787,7.576388617104279,4.795913575495662,2.5195265040352233,8.790459321477622,0.057845505186566726,9.410222840510688,5.564618588245072,6.578781765966186,1.5301060769899255,1.3568610006234083,7.994888523654642,3.2125748227661655,0.17429053481035295,9.492431818930338,6.796450043398972,8.945788321633973,6.3306075640406645,7.967120921380628,6.921217344706743,4.6332042223818455,6.330656752062138,5.555436291614171,3.2676550092144807,8.56469803915621,0.1626889530019371,8.575138809766688,9.48032026822216,3.3839859910231618,0.425926197288089,8.634850686509502,9.20997457689423,9.14094903035144,1.5991507743249422,1.1955402896840095,6.9683604182672765,7.755665862568019,1.1580273353101878,3.6313411260970185,7.614569667263041,3.504563611460072,8.32224459125132,2.937384745711271,3.1460397524308226,9.878860360818766,1.228469261603271,3.8956510552202106,1.2383402423846013,6.2276055142866005,0.57171970617379,6.766287977581276,8.677645885211664,2.9069476352105084,9.971273693029858,6.260674781175188,6.5938456477965435,9.92289049921035,4.918809961917596,1.0753722563646018,3.2433841030480592,2.501072963732831,7.348272179213695,4.706781162968802,2.7080022010478033,2.4481620873257315,6.972847454997186,1.8016948167535518,3.6391360843902065,4.754337142291501,9.48230530988037,0.37547013230755155,5.270431454051099,3.5150496469471926,7.722624973809844,3.101233430595831,3.8707977712763952,6.509354525008286,5.033550950665811,1.9725625516222989,4.058912090780138,4.869510200892644,4.855483812348798,3.673964083383894,3.010860260786812,0.26530937857945025,2.662009443322455,6.116610742750208,3.3491609600550953,3.702736013236494,3.9537203596837056,9.97529025905801,9.80669135180522,7.958348480717305,8.914055984741545,0.324746116327137,9.205677928053406,8.811127771295046,1.204424404686777,2.8106275309260975,3.683064689814437,1.254541754349301,1.7273208817535668,0.6651496023901271,3.1965124451908333,4.7672294775819,8.803401314463331,0.9591356865170342,4.057428602988509,5.293978250950477,3.3250562942329775,3.094738474416965,0.09008670424421883,8.847825619677092,6.536679952439648,7.191926803502058,8.11022233424737,3.8322787799406255,2.6667785383289755,2.391128874603745,7.5643839016702845,3.8257467262511136,4.607398619484235,6.910302142845442,4.57548952510797,7.911931213840782,5.386201125045796,7.652264828266418,3.318121599996229,4.156293718520823,0.5767028941834584,1.8064685578661832,9.540457215273415,9.74103752073175,9.920078900422219,8.986131321286186,8.109019925372412,3.2695246982477344,7.497011063974819,8.110761532196411,5.5220519935544115,3.330859298495912,1.9459877468808773,7.327686021941837,1.2486535095834261,9.646145672671167,9.266045058134676,7.280741154636541,3.6762867336038374,9.091608260934684,3.14990928609701,3.149656453886671,9.501691215306423,5.707727095027,1.7059839523591291,7.346590129375514,3.0855668798428826,0.6379368671160313,2.8489423221670784,4.232937868215309,0.16217454013141674,8.073630195846667,2.5164425498382115,4.825072059865612,3.1792251268715543,2.360265514769011,3.9648880557256705,7.566701036026684,7.119045798669463,7.633215559395494,0.4196897502132235,6.305224871733451,1.9325238267170919,1.003669066416304,8.900219296582321,1.4556625568466974,7.102644005098218,2.0097573198103857,2.503856266975808,4.627373914310042,8.515413011183739,8.323415997589205,2.128772656298903,4.062524529225355,7.130015764052975,1.2952310381228482,3.1225317888801807,5.839043564805218,0.8250092201125736,0.6729794400141964,5.28522498058023,3.485865675313,0.7566192418265261,2.588845600767813,1.1465188994586417,4.11612423985382,8.489503605822355,2.8129983738021913,0.7942546584583599,2.5926116662952126,2.7873685081022925,6.312333527077103,8.102691144893537,2.43272871516262,9.427470613333575,2.968667903331439,4.091776721037183,3.8753169433115597,7.646574172750751,7.332612765264708,6.598294925467691,4.051417729491515,6.127175770107023,9.483539216258583,0.7868390404592418,1.732726727546967,8.978261210437173,0.6153911782218313,8.431812602169275,4.05175811479597,7.774339638513141,0.18426194176708544,8.731118620755826,2.1079213985142764,3.923049582209419,6.690476225416086,2.9726193878464136,5.84261686281015,6.136098988829555,7.298965951595424,4.477833865399836,7.3497566166944335,8.848594552143542,4.174538485808055,8.714295155499023,5.389872736317809,7.392081138487705,3.335513959391485,4.271022699916016,8.075093933385727,0.8071397174283468,6.760512028261023,7.060253754146473,0.9270528489535779,3.548095554266979,9.183659367981939,2.2658449211170195,7.780679598315789,3.0609860333827243,2.6690800911574963,4.237436609357463,3.7481867639594313,0.7422712989430424,4.101453930615331,8.18986779292198,3.994044158959338,1.8609975421820057,9.51088287996279,1.2589662988353423,4.8976866949324105,3.905061554885423,8.040741655656308,9.626217246479394,7.718921025328111,0.12078308949730276,4.246484392749932,2.958343682694433,7.65247766815884,8.494111218133568,2.583794051663566,9.24301845424659,7.465161669304711,2.0377648596989673,6.869669323850873,3.922045216494967,3.7539478819570116,9.889544303563172,3.5045738127589,2.096184602913036,5.983693345796899,9.361814887293097,4.240723039120795,7.8937315596955715,2.4282912867629114,7.2317233824193705,2.709089360899646,6.237117476723821,1.2768395080322126,3.7830576734337162,0.9599780263992663,1.3081676214703797,9.049438782689956,2.8050514444771757,8.666401536352243,0.18170113664714105,1.7558375963202244,8.12587285974718,3.8950539850883548,3.254566383204094,0.7916272379239375,4.406057254541804,4.755632856324499,0.8764933181786572,9.690693258329174,9.848031927283088,3.5367152340282937,5.524324384941545,3.394267890695557,6.164818892793653,1.3109901814376523,5.952619985451144,4.793707391842432,1.2566385110015843,4.873469592501398,6.074435686113779,4.252475895895809,5.680759274203435,7.982506464258474,3.2614510422775433,7.80361478684312,3.264132760280276,6.5198182547997945,3.800413993180314,9.037221482375006,5.9585375139988095,5.703143723004487,9.117196630975506,2.6077700073913967,9.378510474874421,2.086798739300313,9.497657816678943,1.325418910868632,4.542792894984751,9.76776935018864,0.8378409367914208,5.173262703650277,4.964068385599729,4.823274997925539,4.055150409257444,8.81626952074239,9.71523273157425,8.104042442164472,7.888076196519913,3.912870122765535,6.646156661026121,2.803290458818599,4.035991966697101,5.104103869974019,6.262495722379276,9.742712755064094,3.4288512988344233,3.694013698763876,6.798208085242283,7.876734419805532,0.6159965787513189,6.646967429993495,4.714844797399262,2.6571692915684597,4.463230359220541,2.6931356854651023,3.0911026387669605,5.244497310795331,6.797560055935332,4.961965897910458,8.095392182753473,5.361188039362961,2.949172522717136,1.3189227348374,5.180264678759807,5.712299456851642,2.473601332005042,3.609244139454346,8.29684585819561,2.3148786268015287,5.947888104615753,5.591250005701786,3.9335596227451175,2.236110381443588,4.362757559573658,4.807087753260775,0.29311933689418757,4.989832814595632,1.7540833977577375,7.050618324519029,8.102254919926505,7.919033062981288,9.58292837748376,8.052915176984001,4.104083149542294,0.040446624667596076,4.778407455564806,2.68430843495461,7.398001904295459,8.52556310575709,7.713140587213026,8.091458158003944,2.2183129326614126,4.159954743914556,8.097587994453734,3.3243334213571707,2.9299276260064744,5.310880226197967,5.687648075420899,9.515620500425662,4.777928746171957,8.141725992002105,7.371513211988456,3.3411960307049338,7.2604206631751005,5.520636676704926,2.710180848278756,4.12175827879582,8.284470114212251,2.82677633260781,3.09628146035563,5.905354286283913,3.8670705900242175,2.867280197166826,4.757661049926492,8.05172040919447,2.4543897526052327,7.2642745011734,6.201899715931008,9.031423556225601,3.0575971910786848,9.606114256573989,7.991667431485984,0.07634603005913121,8.653693223948258,6.988790486422431,6.150751823962484,5.5887190410403225,4.181254709816358,1.513393172629125,5.190849778242637,8.608329054948523,1.977491191809202,3.2837691279271075,6.314972125105309,4.395654785740697,0.771423876533397,4.4472777390602865,1.7420474157449783,0.931757396745132,9.381018958527886,0.8665764506904972,0.4165448670547134,7.20201920346735,3.05148172818112,5.553242985671769,0.296776322998793,8.276011398685075,0.02862525161023921,0.4268592395210691,9.92798744967153,5.285436575262019,9.680396593837008,8.305180924401732,1.7496739125780403,5.731623930516303,0.8381053703078334,3.9888735019634036,9.23092328740738,0.6317032497313724,9.988784454848261,5.730250396166499,7.402884991348804,5.948758709718165,2.7064594257863717,0.3547452702436438,7.755268900023358,7.157619278277494,8.73832183619616,7.834585567689216,3.4505704144608673,4.284273186896492,4.809346713483508,0.3505977948398664,3.430966140995386,0.3131784736811305,0.9950908832928707,8.34427484679871,0.9647327406087136,2.605813339985208,0.6941449609649886,7.355305380506834,4.661794379289715,1.3597300861917816,5.156691810308387,1.4691232330525583,5.8414460542441375,9.898304469489464,6.052724824804512,3.145808403572463,2.454653297389453,7.022045919059199,1.5679251390819848,7.269348782339804,7.473230318723287,5.411403948626392,9.93318890805339,0.6974456031895815,1.7866583170307893,6.420632426943669,7.473599083603812,0.862531273778071,6.30764227826181,1.9322854607994433,6.36345648238944,4.088812268831594,6.435709402253109,0.20550485758494608,9.062037456262473,2.170338204512463,2.6915824440377967,2.530949000069147,1.4698015006043197,8.581487458466032,4.18131234126985,1.8556012090598806,3.323118363862041,3.6785041019454012,5.576077177250971,1.657992416755556,4.406099607080021,8.377202707497615,0.9151995574852756,4.673246159844404,2.06979354287927,2.2180767202487406,8.848245794168195,3.6492194401789257,6.46129919825839,5.7839208019551025,1.4109242990007687,0.09517838882318053,8.767071040290562,7.360434321543483,6.149440075560701,9.805820663307273,8.255517006136053,4.685856434150124,5.045228787409812,8.633022912864604,2.9236009766647975,1.3990725486995759,3.5746849003893777,3.349090745464478,4.206425258284916,5.407451415106732,8.577623543425126,9.90666460853152,3.269440526167986,0.6388778954964813,3.9724277062559987,1.69322633922669,1.8511169066735222,3.701600795775477,7.159617365620807,8.042109879899929,0.3833977269147293,7.161925080603499,0.6819842168440737,6.690904200731587,7.387789094473907,2.3271615285747638,8.113986252276158,8.568905010776168,8.73439547248437,2.5178307690098523,5.926700649194232,4.916249145783061,7.267811639521751,3.357233256546852,4.886067769887661,1.938921106833098,6.261642125246296,4.144136230295143,0.11941987305016388,1.4186790419160245,9.479347791184484,8.499005162475012,0.11487347033811712,6.413646380002717,7.593512326630005,3.043177950880158,2.4856316289160296,9.633651349518024,7.455880450269909,9.279088057223376,5.148228125649941,3.518019086782209,8.229963606955629,1.0597525790218176,8.396398991096676,6.54413437115227,6.1823936257695085,1.2134304019773245,3.268147732239852,7.647815394242555,1.8134299591711067,6.5426846746812695,8.509858577284309,0.0644325747548602,2.375269112701641,8.81557133322713,7.965107820172963,7.673231725259408,4.497792543677912,8.750819582369067,7.059204068045101,9.02389011624702,5.207814478147794,1.9553527609088572,5.500077770568714,5.458673195470844,0.9576267435216979,5.885926842617211,4.8962941891832745,6.254433408937372,1.0441837045179292,0.07302900469308593,7.5608551732562095,8.606180555916483,2.2993512971413255,6.486447639829292,6.847737041043533,7.818273669451472,3.3597795752859816,1.8332994594252527,9.945455922695874,6.411934382155204,4.435822128686726,9.75301863364584,0.22780392285650208,3.149094474640819,6.332599487952737,2.2273910214791814,2.9377232386577568,8.82050620534619,9.267210572505352,0.8479213560696874,2.494565142678007,7.413204439463838,6.480137132843257,6.064367928159566,7.259534746375138,8.978986074324153,4.066242483162044,1.3238515900534775,5.484754950228017,3.453046193161484,8.386037996408982,0.22845802715460772,0.9369850964898041,4.542376986690826,6.891059913080344,9.005003923113833,3.8705342092575634],"d2":[6.71814014269793,2.634119660964147,5.1703814340000775,6.643379101465419,0.9545397870792471,3.7019899291313174,3.883802659317046,1.5810713938224086,5.138834355424828,9.001054589272098,7.863570222839651,3.209842906064573,9.785150317512441,6.064654673136278,7.3078647097308025,0.03845815273637365,1.93822420986699,7.041859523445124,0.5429144048922963,8.192304986600192,7.889085377397683,8.989443671542897,3.073741391113751,2.877739400505852,3.251907864688015,7.4973160236780085,5.080650524033555,6.37808166075442,4.734448353458369,8.53562733810473,3.3300767437044287,0.4990221114241056,9.32948603700849,4.844300201962774,2.4532044522748997,4.7733892678768015,7.391136421169911,6.953794111073095,9.78292639891631,8.908094466524773,0.2487662064722307,6.88268544053265,4.061734459199755,3.975444694069956,1.9471248738490754,4.088209143329844,9.759609743182455,0.5213370516431337,7.203271994819332,4.4817540207443685,8.030052966753644,7.55838760708786,8.724327077567398,2.37731553843584,4.970632674005833,9.66426113739843,3.936594023151714,6.567624680146544,1.0010947892578392,7.53686472200934,1.9753992583208446,2.6118092475944388,1.5318125861456267,0.3878468011132541,9.170787422844043,8.897058235656205,5.18061980988584,9.412838517731103,6.080873638804441,0.7510847326808423,6.8857845429171505,4.993077808095818,7.064245858977031,6.72861069047303,3.364663123864393,0.5617406103327083,5.101587707113751,4.709535343600637,2.437935283008934,1.2138034028439626,7.928947956595421,5.56957425028787,4.157033404245107,9.815913350795311,4.853396053500818,7.3038035938132335,0.8031672916104227,3.212768564388677,9.488551958160139,4.548417737933967,6.712150872995131,1.004361265863416,4.72602835411934,6.495753304519464,8.919327952220986,8.948511195902263,3.7282610112068393,8.145267530322046,7.007568092525194,8.009884069732284,1.7055646454450635,4.563775813449253,3.692466681237989,5.9018997176583525,4.845946243696007,7.52365461655055,1.5483499170813864,8.924728828064667,4.288936185648636,5.923263952966577,4.82561433365301,4.609743156358905,3.11283150195917,8.619499198262833,4.914072626003851,0.198859896721999,4.178492833566154,9.81541966102089,8.102001724190352,0.919166064745065,7.340461230271296,1.39208322500181,3.6355373889857967,9.238102526555966,8.65341161874247,8.415334743296075,0.18036813253896167,0.45429278962738184,7.481465786612496,7.034094581784087,8.826119381906219,2.729305652232543,5.105221049379436,0.060183368311934604,7.370897529683598,7.321519881455112,0.8364593278589183,0.4940110082261917,3.397030331270179,0.6409875249572616,4.513701159933086,6.442016197057503,5.708558313409579,5.903641406332025,8.156069370318233,3.830438003743415,5.5193190856545655,4.521873316662575,5.161414240970139,9.11293711222326,1.111416883480394,9.665615813660867,5.550204857385386,9.791469583696308,6.851643328457113,7.026990930766399,0.8131933083546383,5.286423668550089,4.611090691206902,8.245052669959279,5.910272459029091,5.713394360367763,3.932008316115858,6.075309769431392,7.262928807561426,9.52562699227892,8.416932375793698,0.7033934078892634,3.276183157511545,4.379711231691193,1.892916927828785,3.958221212768691,1.9322739707137049,0.49892273496795037,3.3886465796748366,3.30375903101779,8.46586235831004,3.4424067825750626,5.230349986705045,6.3521572316120185,5.362584901892246,1.4018842023680933,7.240902919624855,5.348086921630468,3.7928520407321087,9.621515413700909,1.479484286679864,0.9882125583839296,6.641734639165513,6.7667146515119425,8.784402571066376,7.17070019050535,1.5724588941176876,1.6810660587630122,0.3883740624444454,4.3002261470783125,5.478144329818377,9.371937189974632,2.1683027767215934,9.706037255160085,7.508541997364979,6.025399120973816,6.87940065972289,8.773545858795572,1.7791768918659856,5.634082902637736,7.364097718391827,5.115972137375316,2.1121904641841693,0.583318510497941,0.2281459850335188,7.837334481067697,9.046017858565968,2.4750657193613557,0.9385633862002107,6.194739616278495,7.78928981685109,6.601062959507651,7.424871595632623,1.6139097044134942,4.83329674503447,0.7016292827915427,1.6014159117058413,9.827006949819573,3.6512234636141727,5.486687412013998,2.820990793703495,5.131148520719682,0.9510245623941538,5.310511417955384,6.271370582929203,1.197895514308589,5.448431358072597,4.44372711170129,0.109393741787005,1.9165222358510214,6.320527859584939,4.109675218603948,4.4793311747366005,1.549461955652851,5.976628422861272,5.120640921981114,6.57652547984463,2.830625890684082,8.14432722094055,0.3834901771005672,4.025860848512703,2.0263515966378276,7.61425161460294,6.209194071526167,5.197514918464526,6.358633440261512,0.2683455234320187,1.8568337494332376,5.790700126914539,0.9175247335853709,5.078179320108234,0.02722176173316937,2.2568369376596698,7.368589175162768,0.4198460750857369,1.8616766437030763,8.677878004239407,2.758991193578655,5.694099678433206,6.04392065168029,0.9634592942233611,9.677565559663588,6.456865608311113,2.23909535655181,6.016133974653122,4.084143478868702,8.660661960524415,5.539835614943851,0.9964038223444116,2.236761276901862,2.300420615087877,9.599527430221027,2.0917632487943627,5.721972619010652,0.44993647721725427,3.5055606921161298,8.619016287886325,6.877134820851898,7.231664039574266,8.437252229018245,8.419548240601642,0.5905483793555666,3.074888999164078,6.880241401124372,7.949113820553004,7.670073885835647,9.694243969915568,8.118155410496396,8.659726738824645,6.323376660984355,4.3464427630431635,9.398144617391061,5.861298177378722,0.7768837028684294,7.821389548153008,3.7469787699165424,1.31439914315443,5.49874116677233,9.751857585257968,1.216909376570463,5.116167814039141,1.3846685458483732,6.213398063162831,6.973682098413216,9.876682581468714,2.324055762359254,7.1583416075694455,8.494710986995715,1.5854759220150738,5.151708414028859,1.6191482804133872,1.5348545363327548,9.83198808084168,6.576582383548382,6.100701469155174,5.870872985776357,9.05252071643863,2.6921695022579506,6.552699431735203,3.518846080431972,7.964829161697593,3.468811041084643,6.0906203634075196,0.7843793899626172,3.0974383428420627,8.538528710707743,6.880474770298539,2.566104844688495,7.396746938344685,5.3482373785398085,1.96038838310296,4.241125535839108,6.4880998054544765,0.3213389576735848,2.595175244093235,3.870205735487775,7.908614203304953,6.104903232906711,9.395878143588456,3.7207147176125943,3.1553017308481013,1.7789924621263697,1.9661520803855526,3.398034257007023,4.888985666006689,1.7282258389958693,2.98811153669023,1.9419509767997556,7.383249891449475,2.8306987667332484,0.12155743162634236,0.48736270842284934,1.8918698728522432,6.8468778682928395,0.16804754524675447,2.4104844472333076,2.8872416898102893,9.590589940216645,6.676909884694357,8.773149726716568,1.7554034779454675,4.811293908154779,2.1476592693175167,2.5416677187389647,7.129985994371452,5.856722972382949,2.7586232205412986,9.748698635771682,4.35153310733297,5.23483039330654,7.1776462728532735,7.385807537635028,6.856093831747709,1.7751701076908866,6.031992042976717,4.190715315306512,0.19103048936517597,7.935425172840946,0.42797827237484487,7.1188251401652,3.5777833023192662,1.42587801060708,3.160120072863297,2.7964576885344794,0.006650094576730048,2.344838507430327,3.4226978491434723,0.2736075066126564,0.424130300567247,5.466657551286282,6.359252540727301,5.61559041231871,2.4300167649869575,9.534714407875954,4.807963361841772,5.811045674520711,5.516898154207128,7.849669183710808,6.563713980152174,1.686376958714353,1.3062115299223565,1.0989649949957925,1.229032253319382,6.487663850468753,7.973470023380431,3.718876061051881,9.661344289846074,2.101398124358298,4.0581167611808855,8.381879334577352,6.635564362708806,5.42297182933114,7.2691013616654265,4.236732624830097,9.956989285567438,9.715226142175135,9.721866142338254,8.095880968005078,9.878530630049482,1.4524680609032758,8.230942186059021,0.7018165490602302,3.9034299700444386,8.314320325383896,4.792765266997126,8.483312871916544,3.465376767080972,4.874339559894905,0.2785073866218024,3.589650607289998,5.5872475105550485,1.6397110082890798,3.5338253917958196,3.3517218958491313,4.84262808209688,9.74773198755667,2.433621234283345,3.5752894762147958,7.597169057961688,2.8255723902843344,6.618035308873081,7.209710121874105,2.570799381434352,2.754734960853409,9.36131666229793,1.5944527402856523,8.598831519970156,4.183104740086061,1.7556823827588253,7.1820918513365894,5.735005827849282,7.815375223804808,1.8628972233745866,8.382521217757482,9.378085279137077,8.043437580724383,4.607002441525568,1.6898398205852416,0.11115359832225113,6.701656510348122,2.5022941291041367,9.694554964694666,4.580216712179775,8.808728554462363,5.17616896635624,5.554672801372464,8.815658094565348,5.660212968871892,0.09492697702665032,0.09613032495606522,6.594479172896863,7.83627483321146,6.504478368730576,4.53471705372718,6.141179544755322,8.695575253628602,3.475492113083316,5.3432636547544465,2.5873119878840756,8.006670697015647,8.303822332459683,4.21228217694523,9.372577682529059,8.219766284354131,0.8722497296840226,2.614684749326861,2.0705616326099285,1.3692583837565486,5.74720033259696,3.594969271672157,4.209882080736891,7.985471815482564,6.382251078166825,6.56813578128244,7.975144939221092,2.4730389140242126,3.965225098543015,4.94355216861349,1.6973409264398787,6.0262845783363606,7.220997160676408,0.7133567921350736,6.350706791352236,0.31981701572468824,8.77431100794742,8.12725407602749,9.31217451640924,8.2593129229573,2.088787556809164,0.10021328367451954,7.769519774065714,1.238876680663863,4.686087343896803,1.3635218937203875,5.070941592706357,7.748901958232839,8.504702723194535,9.183053528243242,8.85183872362456,0.6678642181344996,6.650059072527195,8.552379520920868,0.9556727102958584,1.2117406944370912,8.14640975357684,6.572934542689371,8.35187065372015,8.538439559676199,2.869064442565188,7.835782105772859,7.747781052486835,2.7570945644825406,4.1307638557,6.932774624239522,3.057660752932343,9.063448607892727,8.380065786352189,1.9512762115283988,3.2521563413316446,9.832267870250778,1.8217472446455685,8.2564337133463,3.0194320727567914,2.2945036100733462,0.5064733978720093,3.597168442134957,2.3824161735711824,6.620741397840817,1.521623249412487,3.363880119233833,3.8454625503567264,7.862818094074331,0.4596555836655436,9.75393080338226,7.9393486473576065,8.242608169220185,3.648900697187092,8.965311814250477,7.243201382534378,0.540381154854872,8.01070448214777,9.614014314373122,0.47353591625956204,1.9639933972555568,5.998893976769537,5.16995748241335,4.681024857723761,0.33401840961737594,4.166646731178076,5.854873879883162,4.165251980749605,2.2324465673742377,3.562459475441826,5.315501172968775,6.541620600927313,5.104248610046335,7.839510589656664,6.868321133934769,6.485015179206983,7.593031457234083,6.66991215816968,7.768402680095763,6.225581153745798,7.184777614648754,8.648042474831136,2.8349711966260993,0.5071312247043336,1.7876109320756628,9.89169515474602,6.404578156594905,1.2067711561737093,4.335993120118671,9.689845541637945,0.955364054549388,2.5020194688382658,7.692657984731472,4.463139068442244,6.988191103222561,7.035765715682485,3.8839835662279776,8.956213333332341,8.789007760192133,4.04516681750583,7.662755745361542,6.690726202063297,2.236116592469033,1.2137474442064966,8.465547847004476,4.283340292810484,6.960931725463051,5.163153274125687,6.6357640296213845,3.8796146553521527,9.159860663792568,9.656719607076374,6.831661994387992,8.970346056026603,5.223057992909261,1.3032478184903673,0.12020226045095228,6.8601874839882555,1.0860662896032136,5.361586208953515,9.243927189770995,2.380116975335358,7.487857977963035,2.07647877913669,6.137254062531767,8.121205061470594,0.6804454601661347,5.195597397164306,1.0613389929648331,5.539704727735517,9.220137446421091,8.776831797287434,4.5649122253423275,3.225168602849089,2.218281644447566,0.9132071748850579,0.2761724566798329,0.6042368000910492,4.345760877347824,7.806299112635187,3.829682167958892,6.066119856897143,1.0588529294051807,5.953011869749149,9.248174583873308,5.137090740267336,0.2809875126126937,8.047137978097378,7.15584364431467,3.021684006175205,2.6793904088349607,9.043984532935331,0.004936613165584802,9.301323517817954,9.152155226542789,2.6441394178797117,8.720990480384687,0.8646812263778947,6.502054813139109,4.51170709958083,7.175622339297673,9.003978033567181,6.076307190681702,5.133359697694346,7.895359946037841,2.211487428341403,7.7427982497430285,6.252550175799623,4.922712161442879,0.18268721044167435,9.742737788896559,1.0280232949535084,3.823033373747513,4.646951368692164,5.023265910603685,4.74014220250687,3.611798531259365,3.1307352365933805,5.796617283451296,1.1405850123437489,9.680331709053153,0.7020014720896883,6.265109741496007,3.169944771904878,5.591748732050126,1.6696273432124853,5.474108060888561,0.9213907939001365,8.315370477939117,2.565507770153743,5.065093304864996,1.7717438295429777,3.970592466132219,5.478954963141671,2.6249536950023566,7.277692047713837,9.997708716186821,2.5410767120728273,6.629535373720941,5.235754001841113,8.10513530956136,5.826224512195899,8.418515205401988,2.8966119047582883,7.712243578331184,4.046880535739772,9.850574301494628,2.6955357122189394,5.167407549839112,6.38650448344465,8.45994834701252,4.858126188673724,2.1587308494930824,4.537658827825797,7.2257542892377735,2.840844557326605,9.803753781719307,3.6723444235519875,5.155322308513726,3.229660062691959,6.255713638379381,3.509206778174958,5.396452026823912,1.4309208065438606,8.625463654155435,7.873080992693886,1.1497926006095294,9.080831556922655,3.3192437063053104,6.365719762633804,1.136227143909947,8.835124760568435,2.811899254151462,3.1201299136569416,7.817628151126684,5.797053299002995,7.116708295754329,0.5574949451960842,3.17265026915857,3.4075832464098954,7.416559412788716,3.588258668023432,1.0033886149359827,1.1442145506600832,3.870901785016534,1.521867841282114,6.611029880911197,5.790510560623452,2.5654876975761876,2.611501220352228,9.225303025524909,1.1882148654250457,4.267201679931225,7.859160132089109,2.4064231471920694,4.774183235368497,3.213393679765215,4.6521914910277395,4.8876498933276995,2.375262226933581,4.178675300915855,0.8088981689924735,1.4074014118461298,7.379404123784892,2.9598180751643732,2.175599562858417,1.0504329957280767,8.500908473309254,3.6392650930688775,1.1979759895831243,6.668001946147237,8.502145004092698,6.43229714507269,5.466564317879897,2.727197889778281,0.05481530906586762,4.620366286064153,4.973750495572031,9.07159231348868,4.058817607736412,1.1169796102956164,9.202720858556297,0.6734248352789729,9.206202301642236,7.361026670749313,6.658932896351577,2.682477868600408,4.1025865132026595,7.4296268831223,9.621927617476123,1.9193254360260736,2.610053411282811,7.243304561591762,0.6626978737944311,9.464010868396231,9.23611162985748,8.921864935097918,3.665599743803196,3.810022499958161,3.9392736460012356,5.777998605838349,5.479395133140819,2.491779385912729,1.683902857467512,7.651837851648291,9.330110834710734,5.716082032961851,8.241202340337711,1.5881947746313907,2.3474550070297395,9.724252871782625,9.5197828304037,8.731009935583545,3.397638061148114,7.8408644955061195,8.239562920226682,7.0490024424872395,9.044566667378621,3.6412997294728178,2.5874874434438744,0.32328833252553313,1.8246596491952194,5.904536498300763,4.069203042089981,1.3688888777755914,6.750551644239868,9.441061287095152,2.779758509965704,8.899494160669173,0.09614754217919907,4.0447177012540925,1.2009648151169805,0.392979414289063,3.9877973096391517,2.395881087630125,6.47883942484744,6.558089335309038,8.556312133332547,4.164182742221493,6.536737944117881,0.8398276045276032,7.015762341448275,9.949392766935787,2.7887201116705085,4.513274600631332,2.895705105703814,0.4185757704454973,3.8896832473871346,1.1511945252675448,5.349307679366344,8.160505639164725,2.1662110267034462,5.250401371093149,0.8804787515621548,2.9537837259525657,8.64242150849944,6.786629844682297,9.745028119011936,6.133137719484665,4.392226769375394,8.37351784393729,4.9035337404558454,9.813952430876578,3.62015641396517,6.716289477495372,4.966040876516891,6.879042844135546,2.8124635038832335,0.5691298352559082,8.442110708029006,7.745200263233459,4.2642588059333075,5.457498073258586,6.0801363902725996,0.7622037243952362,0.33935318830979,5.603155228939118,7.513615633558386,2.2294838372400383,3.648944364157891,7.608400163601234,7.779192743418668,3.9259682689170017,1.1701118414928269,7.579011338224253,2.860375202576666,6.232511009835355,6.157171142659901,4.217987230496445,2.4699459144533042,0.8524615657567591,6.360696284930876,8.166588530590396,9.646735791021186,3.4026975090889633,0.6302604959021618,8.924793348389933,3.44704025696571,0.13251580773237848,3.245060771705761,6.028022026553357,4.5618676522832295,0.11648033090137622,9.480774690175291,8.137603426088676,0.9702599957273783,3.3193150362365653,2.484003520361344,6.269955481733538,5.9184506942531545,4.028928865639145,2.851831716271158,7.415580999012423,2.9767649462855306,1.9664137685646965,7.778467850043615,0.6604216737824231,1.059179265696717,2.6431390391281617,5.051110771062557,1.1434240512417726,7.935678096319028,7.005389812671787,6.021496480746045,8.731016735541795,5.090820848780244,5.082687115058235,7.976861561190014,8.385201071253249,2.3554857832708964,0.7756463407171355,6.849481495964382,8.9525942401092,5.346669955910506,1.977498494997727,9.27202467715638,3.0544162202950798,7.261394458885468,9.093648938522742,6.892201127772497,5.340543526348977,5.79718379113404,8.015135658737657,3.5472920820611775,5.8796401955996425,7.244112576109892,1.7267922248454237,0.8910314555891952,0.6594630217747555,0.23432607381285164,5.043668627715361,1.4258015527659285,7.865150846811321,3.165628747310749,1.706022357414303,0.4020978541464171,9.996110802508145,6.739761968351186,0.43979695021234777,0.3413435253009611,1.1931876022497678,6.8814774495414,6.151611616076571,3.996813580046097,6.633472210335329,7.982165130820762,9.681162089248346,4.752834298250377,6.082904810005565,7.873384691061032,9.110497377735713,8.655963265896212,9.196496366215003,8.977535097783125,8.960996416293623,5.0975541083331555,4.772221847984519,8.207031235661917,8.024762232108994,7.602278200865427,8.927997852520393,7.591883815587912,2.7688304241751194,8.772174146198113,3.3012263169775236,8.403091474245741,4.875542558100285,7.793223946515835,6.342491415203757,7.370668187719516,5.184720697061005]}
},{}],72:[function(require,module,exports){
module.exports={"expected":[0.999862983175733,0.8062998931869649,0.9992787752121619,0.9917489585603478,0.9716702709184573,0.9919927474260928,0.9314572446506995,0.832981027052332,0.9888816039184274,0.8741274530477853,0.9993241971906769,0.02137907167202313,0.9776908923338479,0.8588261051746137,0.9325154162175215,0.9513273263007356,0.9884707175005324,0.9947097156346647,0.9932765765258846,0.9836739929291274,0.9994285066457256,0.9994805277633194,0.9974404728345082,0.9922869578764204,0.9998690618478822,0.37701832644544864,0.9999130087195406,0.8657189435329483,0.9196385911336658,0.9986773582928844,0.0030300793484296937,0.8879199138831233,0.997486620664848,0.9973556107279371,0.9968288536347754,0.9689344580797117,0.987506793818657,0.998324481127753,0.9912101180642076,0.7135298910096984,0.9929490119058271,0.5883699299063948,0.9988765614082658,0.9819457772129355,0.9738108931519661,0.9024643580793701,0.9980029152943554,0.7726528550612928,0.9859010530539303,0.9971439332560856,0.4243288473821585,0.8852991073348301,0.9994034682241542,0.9907447923098225,0.9981597963129363,0.9950401472625312,0.9994411467290867,0.9449002425153445,0.9788620352712658,0.710931026591188,0.9890252731543483,0.9981005862326111,0.999802480770471,0.7940508974896017,0.9521183726798632,0.9971112761042689,0.9119107217753405,0.9992045397357392,0.9997256749280228,0.9990098488405676,0.9886922314585397,0.7315450309973962,0.9247894937848179,0.9996623160996606,0.9781474513802269,0.9827588563781116,0.99334198263149,0.998523218394324,0.9998507825671432,0.9989683323201677,0.91915419722891,0.7602623313055916,0.9934370060900792,0.9148226181903436,0.9943350312276105,0.9968953259860216,0.7801777318509113,0.9978444395065768,0.8531770056286442,0.367566559482249,0.5352029933094125,0.9714801496066736,0.9820007220139455,0.9997704747350669,0.8307018316207342,0.9593408479106249,0.9474608781383127,0.9198565074563345,0.9564933860858953,0.9474551561400094,0.10617981667322071,0.9310050212331804,0.3880910827630728,0.6086012073183268,0.93541620729369,0.9784777049207302,0.9070186957877981,0.9729828798577296,0.9835425228519075,0.9996448570732938,0.3820296363075546,0.9972724485179842,0.9991909815415203,0.9488876491961391,0.9664080321985089,0.9944037705305523,0.9999175998166548,0.9998068403233822,0.9979867035800793,0.9990603483040512,0.8236080064475351,0.9987085459891625,0.9544023898767671,0.998594662657214,0.9995333197591025,0.9999674551651483,0.910497861018571,0.9897286799199907,0.91126335953693,0.9999401892973674,0.6865908741298208,0.2563390740387439,0.9985399552675651,0.9332549354035917,0.968680836726296,0.9989501107341889,0.9994874446021802,0.9920648484083674,0.9975569233107204,0.9956887086917814,0.3785627766147595,0.9995076042454365,0.9361658197053293,0.9943082327436077,0.5755464781144063,0.999765475969416,0.9995074558287214,0.8129886044001313,0.990886245850563,0.9883637396367684,0.8633716988046445,0.9971519056044467,0.9656915568945748,0.9969873892728462,0.9931402521091777,0.9965584222048329,0.7858371444501093,0.9990649952481638,0.9994094798287352,0.9922487781930166,0.8791930368871718,0.9145371116276195,0.9998108944707691,0.9977012993357269,0.9881648671088872,0.9990404919560181,0.9998609099449267,0.8907744531453305,0.9989723133428192,0.9848730863964746,0.9422592894931847,0.3551555839931185,0.9932857616045865,0.998664668463056,0.9997501890374241,0.9921717699834744,0.985979297757476,0.6394902401832582,0.9977699933423743,0.9621271403967413,0.9985475474339661,0.9981386596580425,0.9813531128913119,0.9859977789702167,0.9978146692214409,0.9998940998955823,0.9998793461549981,0.9996470970250648,0.9999690344788683,0.9759157122193842,0.3856319896458414,0.9986907487203105,0.892666064939663,0.9984654167172587,0.999748762427793,0.9908971768848562,0.999892120558477,0.515974234086684,0.9126378434396986,0.9690190685038764,0.7535581728615163,0.8849101051494088,0.9989656998417764,0.5065141798791221,0.9998169090627573,0.8872986304276017,0.9996120380719373,0.9997559692308258,0.9853102069640749,0.9465299791768723,0.9269723191138486,0.9707946294287324,0.5380739544850385,0.9253214618233652,0.9563717247545456,0.9953137680443496,0.9901036195706951,0.9760568359008673,0.9999565528107501,0.9860660821390432,0.970145296974065,0.9964774353086201,0.9997074335756488,0.9884824661184605,0.9757789506357867,0.9974966485323054,0.9978845244587864,0.9959272365744116,0.9974362653320424,0.9971833447199349,0.9956685186990415,0.9611472690094294,0.9538923194164017,0.7282432459907278,0.911664135939356,0.9980058945284348,0.9991175128961519,0.8591252928639033,0.997670317335688,0.9984497869196227,0.9852982051107926,0.9983203269592551,0.990794562240144,0.9906958785353264,0.9835114289950866,0.9377040899792293,0.9999085073144235,0.9954745542573598,0.052288318783674854,0.4906691311400234,0.9978544692765365,0.03927240441678766,0.8870422990642717,0.9998564385601098,0.9846049829753192,0.7734162954944094,0.999751133982446,0.9990028724842326,0.999914477053087,0.9970032568601076,0.9984986781722347,0.999940644371319,0.9949409645740594,0.21700767447479277,0.9988545479303887,0.9867165466351997,0.9955383073208566,0.9631392158339617,0.9345842886082185,0.21968758918467135,0.9961346203239612,0.9601288762617433,0.9951188762206433,0.9973052410822374,0.9984232364079324,0.9339792454962477,0.9961690585248939,0.0005483954511075624,0.931046209017967,0.9999555964989952,0.9909103549681845,0.9983595393442948,0.9997033908371383,0.9880359113055955,0.8618374325899143,0.9602772711309252,0.9994643719237004,0.9431816385681109,0.4436896100818839,0.980330399771596,0.9992546921868602,0.9837392022716612,0.9585232143027109,0.9991757746378784,0.936864252389897,0.9974889015837298,0.9490557746404201,0.9541861114189936,0.2610999528201169,0.7866610383303562,0.9987274676362825,0.9812275542724779,0.9836999888963213,0.9773280793708402,0.9801584089799252,0.7337642491217583,0.998988104690914,0.9990963060941277,0.9797434336422968,0.9942451161863637,0.004965938600779283,0.9040006599857109,0.5228027525143929,0.9766572208497396,0.9580681626855525,0.9924648135131393,0.9999107300781245,0.9992827095559431,0.9951241602945022,0.9059123185418159,0.9745865809354857,0.9991721295140247,0.9801924879627939,0.9975069678608084,0.3720515613697078,0.9998655034520723,0.870801611861069,0.9575664983821544,0.9991815743149628,0.9994563219624564,0.9957212866354012,0.9799380327506376,0.8403384205515916,0.9549642874951159,0.9999491028126278,0.9963746390404122,0.9888334905677473,0.5635416514061199,0.9865223246661257,0.7926919235141588,0.999856754934809,0.9993956569920371,0.990059344930981,0.9999767073411484,0.9221890928890344,0.7041965194220661,0.9993977929081888,0.29304531403901346,0.8296837163893891,0.9958237051776972,0.9980163171529953,0.8610670994816378,0.9925321058290149,0.8562799716540981,0.9913978064956751,0.9385481566445604,0.9425542309183508,0.9968408308459836,0.9326484905144549,0.9965195968612408,0.8285097675799371,0.9999485050264684,0.9991491653956663,0.9007472806771003,0.9502931206518814,0.9995174306179246,0.9870472500707271,0.9664362588044434,0.9987557155167652,0.9996209043651776,0.9996913836248971,0.9998854036120566,0.997132552639822,0.9752730684063085,0.9982243841952501,0.9992760103903315,0.9297763337093263,0.8662499676621292,0.9980912368530848,0.9997287758201493,0.9998427396800256,0.9984445180939661,0.005945228569858447,0.9948166122344493,0.9993400067441681,0.6340825010074914,0.9986551606996231,0.8784674208485302,0.9976283015373424,0.9973093212123281,0.8757062471143636,0.9990874285708794,0.904571545838438,0.997560542440451,0.9976172767330841,0.9992904805793631,0.08177153580169985,0.9827114145738918,0.0320997102016223,0.9985562643077293,0.9946696492863525,0.9975979021513589,0.9909601934387009,0.9996830251221482,0.9936002480869812,0.9500936003953574,0.9855238515618479,0.996697994491057,0.9993588195180134,0.9987221433751113,0.999478605811253,0.7145570141220606,0.9990444267756413,0.9918041138094559,0.9998699021893107,0.9972286548752078,0.9994420539227218,0.6061514757417396,0.9814827446842185,0.9941599335147668,0.9947289881399954,0.9994547927945986,0.984501775951524,0.5134911687333031,0.9927666271364175,0.9995408537396531,0.997907575212073,0.8297239738891089,0.9655934451633701,0.9393774830772866,0.915112284714989,0.018118716429033,0.9994805793826373,0.40030625530897707,0.9987932907368897,0.9998209141832135,0.9139608556062508,0.9999291928950438,0.957118797026283,0.9595585206559347,0.999420205418835,0.9993122112593481,0.8013332024873451,0.984764273183836,0.7657687031308188,0.9966779082195172,0.9987479133126229,0.7920110918486486,0.9549858699720187,0.9237335687360886,0.8978871434306348,0.9758036479309025,0.8836806238825001,0.9983671896548285,0.42603419823467314,0.9881626413025533,0.997314933490997,0.99261717178064,0.32570865023802004,0.996129819982011,0.9644706143208404,0.9954203127879331,0.9993295482244972,0.9147904583174594,0.9990565855531243,0.9886583219716265,0.9436307167697975,0.970610261191736,0.9193899855650511,0.9996664095516025,0.9563080906038848,0.9982010052974075,0.7652749354317209,0.9936638365107038,0.23086591241155585,0.9005429845908377,0.9998328243083903,0.9994305935611022,0.7948937885162054,0.9998114723792941,0.9199434736797178,0.9925095065115546,0.4370181116086586,0.997081288244944,0.9998633126240395,0.960575399433373,0.9992638134522525,0.40856752654602363,0.9927140203783251,0.9999051583102391,0.9891192144591958,0.9445984801239662,0.9997124618551524,0.998485739621125,0.9994215310341998,0.21124896759173062,0.9640623975757477,0.19586908269401565,0.997924285739729,0.9740693725883312,0.8747262526127739,0.9989348575315286,0.998229540858739,0.989485775234981,0.9985272213741857,0.9903272603301175,0.9868459014348363,0.598087701917613,0.9996667343474279,0.8229220054011526,0.9996947316904499,0.9921832606629529,0.9619591179008893,0.9912799515879547,0.9988742033376009,0.9983771036075851,0.9574736337786666,0.9142779233198424,0.9994509109400926,0.4497295625366536,0.8274141987517122,0.9968325336924704,0.9992440155283293,0.8917489613937892,0.9865533207332562,0.7040956346062377,0.9473394906051694,0.9532769554722824,0.9919537123728626,0.6529050320607124,0.9689791635428953,0.9980192907485763,0.8815463723708439,0.9881264033300697,0.947445188585927,0.9939664129584685,0.9957846755886871,0.9973682999255384,0.28790064078680183,0.9987819599848338,0.8610309389080255,0.7719073018716651,0.8237908075005904,0.9728382279860441,0.9977715521999052,0.9981937651103785,0.8441936191493704,0.9999106516163412,0.8994722016899199,0.9981515404984632,0.0016666887098270755,0.9999033591406586,0.9851035819719263,0.9995774448256309,0.8839650957252465,0.8722610407296786,0.9844549673737661,0.9999680062543157,0.9998633881988006,0.9978781066271618,0.9607975658509351,0.9977861197052316,0.48075351003128697,0.9980065341208273,0.8746579624298808,0.9995982784439634,0.9993855760966155,0.5954067801291887,0.9900339626906509,0.3043371827893896,0.9924478621195028,0.8814817124069734,0.9617148670291553,0.9967859881966752,0.8092819628978197,0.9801425856564242,0.5612371755863481,0.9301724396917628,0.9971109253445696,0.5547312070976651,0.9918249781591737,0.6551225667075387,0.9925045373992989,0.49550348854554593,0.9773920532499987,0.9928580381454388,0.9923223347396238,0.9993796227560331,0.9566895173044522,0.9754780117078373,0.9995818342545177,0.9965324612592278,0.048282388979103884,0.9995283385773384,0.989680252235208,0.9956981007321137,0.9937786649332407,0.9998504283310456,0.9992692382397388,0.9963870742790909,0.5626319387220138,0.9999153466114896,0.9921857736356718,0.9829533146861369,0.958178022802308,0.9718865974795398,0.9139942175333536,0.9219313906485703,0.9373018460291557,0.9945012299098026,0.7407944468094517,0.9986933986513018,0.999661078148693,0.38415519442512286,0.9989697665108066,0.7015335665544591,0.999203379919495,0.9951925430733766,0.9999544302624201,3.3403021926928194e-5,0.9620100737510853,0.9693934283056687,0.4696991287007614,0.9995324865684092,0.9801029735777016,0.9999342530839368,0.9829103069337903,0.7465656822006763,0.7766997880415903,0.46099610451537015,0.9968603236961044,0.9998698866870215,0.9416120271906849,0.9975353772989761,0.9998721800589745,0.997417663400761,0.012269447416707126,0.998378109764304,0.9963504778922074,0.9995558758086818,0.9998453686779027,0.8887521690801452,0.8946375614651116,0.9790287839414806,0.9264778444660614,0.9582035824832664,0.963421907962186,0.9966379476019877,0.9929740963797679,0.8512905894611746,0.9865451817203176,0.6487616441233851,0.9973221424343869,0.839087224760587,0.6295021828796967,0.9091535274971612,0.8846962277444524,0.9834213903274924,0.8490655578571631,0.9998376668306119,0.9545507933380755,0.9504823595194742,0.9542100476331679,0.9999181917757338,0.05117296316491384,0.996857573474064,0.9267442057391836,0.9982628978036476,0.9705923068998051,0.9582650253913572,0.9991788984078782,0.999972663250126,0.9480818320660331,0.9966023852962729,0.9978182481741724,0.9401387538298978,0.9993635402912071,0.49363677607646184,0.9949056620550147,0.992701417893916,0.7010066236562174,0.9628101005831073,0.9996348670751934,0.9924066280118675,0.9950330026954828,0.9985468247616722,0.019058530695267695,0.9991857692254438,0.989623187033976,0.9998756784629836,0.9996737161926188,8.07386637086764e-5,0.999952262268477,0.9412958647151995,0.9994661202379695,0.9970876702660394,0.9960060850293058,0.9994142789261762,0.9998380548042161,0.9982298625746752,0.9220256855905073,0.973034651476243,0.062078023782342825,0.900242640216608,0.357815065136871,0.9997202744553355,0.9961754369521969,0.5458616050843048,0.6486153091935976,0.7712882199074536,0.9428650720072436,0.9989763593138649,0.9962021857598973,0.4373612891648443,0.9989009915807152,0.9789809894182833,0.502950961695718,0.74709769194403,0.6425025697680158,0.03122961202023283,0.9993708702672228,0.9957980331124225,0.9731905512506944,0.9373053850135116,0.9982884366347722,0.9899009808751732,0.0994768339951557,0.9335851625937925,0.9695883632511844,0.1233918506830805,0.49343887314237894,0.9944191474953626,2.0700171565577764e-8,0.9997476928443071,0.47362784309253936,0.8542298852173429,0.9936283571519182,0.9995475739006385,0.9514482433165496,0.9938968158909891,0.9536082806157242,0.9734844131086713,0.9994816969367735,0.7719984065191716,0.22533091214744858,0.9981799752478695,0.8362996697138554,0.977378532840311,0.9873747481195476,0.9701463538716227,0.9054123918014189,0.6829254186300238,0.8978764143306428,0.8707244723281252,0.8749985531537733,0.9999675160255912,0.9988107009094482,0.9984422557169395,0.9943514490695045,0.8828737719710794,0.9999120897573773,0.21569434656806147,0.9705744613742309,0.9962663158249436,0.9573138216561504,0.9990940895066731,0.7713431381128141,0.9680688986557646,0.9947464705115396,0.9650638390089913,0.9994634845939117,0.945482651765753,0.9739356813548461,0.890943438297087,0.9996230473670307,0.9998223453753694,0.9874101767572852,0.8888039254896167,0.9993663080429206,0.9766032253569663,0.9491708851427523,0.9693202029689517,0.9106844292721625,0.5307057315571614,0.9972114905082337,0.9575048282693353,0.9725457335568952,0.9979336474857374,0.9994289070431929,0.9981383697562531,0.9647030459196773,0.9002220572961752,0.9897888660339258,0.9409752904899671,0.9231679003916688,0.9980937247425685,0.9970331430888293,0.970225735898431,0.9922438308453945,0.997815602068909,0.9968518389646079,0.9776482575161023,0.2823026806587597,0.9967473687204192,0.9955776085680792,0.9998552648084578,0.9704834710872874,0.9475092909062034,0.9189581543148683,0.9936960276931017,0.9960445120987631,0.9741467249099325,0.9999520832115456,0.9963136621804487,0.948812635741054,0.9730206080002584,0.9936947925691135,0.9210140556670586,0.9970760741122398,0.9954287763364936,0.999909187990919,0.9935509751805718,0.9933069237290553,0.9871808543825398,0.9981937087501854,0.8697109849737102,0.7097805090038597,0.9496877405030318,0.9921300756892425,0.983881144666987,0.9952119063758673,0.24639109731361877,0.997534357966418,0.8774932852515804,0.9940234018436569,0.9996856090087796,0.9221957941816741,0.9071840339476895,0.9806636049606723,0.8410951039279563,0.9974666801626162,0.755709604210403,0.9411711865101904,0.9999189641193778,0.5641964532835455,0.9901627606349475,0.9998055722330312,0.9972897447877747,0.9992955014026895,0.981750477929896,0.9771418980641787,0.9931879328555923,0.9988255144275872,0.11755618899978107,0.999072457944799,0.43978852067271934,0.9740309084990182,0.9990906127623393,0.8635075067309099,0.999862211901841,0.9740637617867915,0.9837717965738806,0.9975802596527683,0.4445794423070831,0.6936822014679724,0.9251897988175954,0.9998564486274555,0.9940576500376657,0.8654042723175492,0.999562315672156,0.9907614538811247,0.9638994570891819,0.9993459693566822,0.9998932716963713,0.9999726388001043,0.7502415506891127,0.8067942565927171,0.9880205190201948,0.9994938517296603,0.9998892426961081,0.993145864627023,0.9990105591250609,0.9852358733435445,0.9975293052996218,0.9886292813965056,0.8449986594958048,0.9819595951223102,0.900028786266017,0.2575470494811524,0.9959337616005222,0.9425828356508943,0.8890251570575264,0.9593105550821244,0.5578504599030404,0.9991649794095014,0.9927850312342494,0.9995591024340847,0.9906592706645696,0.9932167766993212,0.5591578442250693,0.9938826674555072,0.9984528779385669,0.828317412654308,0.62431575760233,0.9989522256049439,0.4966396888769573,0.8125724768207434,0.9900402194876171,0.9270971608646269,0.8919661127032901,0.9572103115060036,0.988925794647151,0.997489319536782,0.9949624364458831,0.9792523753232804,0.9987755485949212,0.42868574993753483,0.9996779616309224,0.9997213990301422,0.6673851657894129,0.9967251621087272,0.5553937314604669,0.1383374456311538,0.9999577339050281,0.14007283815438165,0.9996804221030924,0.4583143007947171,0.933500279978634,0.9992914726647827,0.999314082433741,0.04840235459015261,0.8980171072295886,0.9988623355155677,0.9929714462145781,0.8719940160736422,0.8785652982947547,0.9999413968788093,0.9990276026650606,0.3976576994331547,0.004849508957280297,0.9985836269421442,0.9998911873288058,0.9987811279911494,0.9747703417727069,0.9499569714400886,0.9516364988937849,0.9999223717860839,0.9992578835171724,0.9916460751050699,0.6404808801678643,0.952551313257339,0.9997927423305102,0.9118829207678363,0.988533650849001,0.964394775704682,0.9967171397368633,0.9953113519836283,0.9888136800252839,0.991021166149187,0.6730421715323004,0.9846822842398728,0.9999211019245013,0.9917965692548798,0.9700523386538731,0.994028104427999,0.9916869662347576,0.02075063633856388,0.9984376563569364,0.9899161446526521,0.9858588065219611,0.6459046617411213,0.9325721471449955,0.9997594070230289,0.9998977824595097,0.9970231228315327,0.9291013520782414,0.9262888068663473,0.9112370125386084,0.6462870947129173,0.9214779670911748,0.9999734707769438,0.9903361136947322,0.996127557113351,0.8838995272631687,0.9985578059794183,0.7734820773626907,0.9926136236828647,0.9543503734580674,0.9981533475193818,0.9962996693242854,0.9963002549754284,0.9917999609454733,0.9985949504518078,0.997731741635199,0.984198141263168,0.9995404613075196,0.9668483012398388,0.9992568263378819,0.9405965324499241,0.9783832972602331],"d1":[5.765190199954815,5.067713667828951,8.737391882734514,1.333538445846787,8.240907653772267,8.495243749059965,7.248169075636753,0.3497891299788347,5.953682440819639,2.08147174825835,7.224398729216075,3.7036398832469164,3.1959315901275165,1.0758884937677071,0.5484309063309145,8.884359814944997,5.0262650168238405,7.065540704690834,9.571494661896034,2.5576319116391533,7.22807473684875,6.047189970456877,6.328776993458039,1.430168312613962,5.593370465370747,6.280888327965024,6.055157440605137,5.954164204577772,0.44978994422594454,5.883668003465208,4.986264987499263,4.592058609003324,9.643540826102646,7.108134318218244,8.176932316998881,7.021764625095164,1.5110798980759754,7.105365399951243,3.2067431035023075,8.871697464913055,1.0894394184066591,2.8058131150435717,7.245625963082524,5.506857217061052,7.293342491694396,0.16716677504060362,6.984771561825189,1.198871950030902,2.9567369027247503,5.307141307162626,2.248161399776414,9.52983831613036,3.9406556833399953,1.4127399357123571,6.986130136790443,3.1700575636184847,7.849520606637936,5.769034672651978,1.2885892501364116,0.21361455127465012,3.102297008689654,9.653714476659381,9.45267663157393,1.7338753003843466,4.277506643369704,3.853430433665559,4.719290060349346,7.909701392751661,7.446119005941638,8.594044954502573,2.568131059265737,8.341259514708053,6.481434177642509,4.096989684130124,1.4810155033579542,2.512103277926503,6.163557415984206,7.516864826444191,7.189624533528319,5.161654855606937,1.2833776998882107,3.1452725605339826,3.74603609921917,1.353768294821549,7.333562838228904,2.5781313274313655,1.2864532931973294,9.772530590596503,8.601708206858705,2.377003628629051,3.9116179979623245,1.3970225511106893,1.8073882336603764,9.755284286214627,9.229479057811398,7.314280809756982,1.3505407665280744,5.791827553280042,4.4343115463091,4.6768323674205,3.1029628731363568,2.5593273927841764,2.41835977005193,1.3549655463474397,1.1596889809099808,9.739183020580708,9.70606375602709,2.2888695241939527,0.5206090417876386,8.72296137868586,1.5033436649855614,7.4358728140940205,9.264364287559204,0.3495416167902299,6.389490045971737,9.36414898319465,6.029612167458101,3.8997299876118707,4.174159802976436,5.200058327466199,0.2648958471969687,7.071833633762008,0.8809894890596071,3.50029646175698,4.856261642681609,9.70854122045064,0.9738874861524893,8.11376217744641,1.4001417659149573,6.0001115316921645,3.7148247904966913,4.827837908407854,6.158696551838201,4.2105058106539595,8.206747953285031,6.052826110382245,5.655348912721008,3.990882304806833,9.904447994570653,7.988035976053533,8.08266170414882,9.979045775771185,8.66445678211325,8.998071951017426,7.734817135946985,7.363815229449255,4.834697436223272,1.2974706925349833,8.60085210605611,2.4229039248033812,1.7051890877779141,5.3812520515016775,0.045850638876703265,9.114880213200367,8.997283870929456,6.641077402686399,4.382996719472834,6.290463814834693,3.8696580849813333,6.244656366184276,0.9198184365911133,0.3427490856943205,6.619196637417981,9.765497279807228,4.456858207306933,5.8151436921362,4.059618902701336,2.7818000855524683,6.431731432356862,6.9672852041632405,8.20817490236093,0.9560389176805284,5.105994764885635,5.81986435982582,6.230783067527863,2.3602164398244208,1.4065141882962329,5.291853863968923,3.109877968085719,3.541962913465444,6.593767769091061,6.527553900718086,2.6215788521976613,9.248466307841428,8.554736620457433,5.216421844179839,6.10928590028506,6.832148695691034,8.701075352271674,2.928996460264637,8.640247569728059,1.957417911890973,2.609059231379387,6.605187472240221,8.112122386499452,3.803329748508264,7.493091093270802,4.295083953954368,0.1766721167022678,1.8099270988913307,1.7149509570930377,3.5582135467567766,6.917709182897383,9.266512474846012,6.875169329179633,0.19585792623991738,7.031769297642317,5.149332075049255,0.5844638425857585,7.1839155112093,4.060491392105778,0.8667064252045642,1.1110804289082354,1.7183228587343824,5.459351213976111,6.311346467571541,2.1724926499746577,6.238219591356675,7.014781244607939,2.1158634871530024,0.25908107657593105,1.4799445880335793,9.956125444406167,6.218058322652715,5.354678915561437,3.360881826956834,8.63829008970066,5.565331537307127,2.9069350012504547,5.7114641155339445,2.100856351689029,5.865261981228795,6.991258320751839,5.06339986931204,3.5854398978957946,8.322369332757786,3.657093072463915,1.1682677077520687,3.077998682262588,4.912650204361537,1.614577351313462,5.610470961751317,2.330133534873393,1.582484146569183,9.280973372472175,8.080443718340074,9.85048030352356,6.67294961359949,5.907791737209978,0.7440006421046341,4.316458386807263,6.426451225612528,0.7681074742815541,5.634605842476463,4.361431295954123,5.442776649127625,4.995377372665959,4.079005461390275,8.200690315503534,9.334503217178586,9.880919645872961,7.931696977283941,3.5350808209572104,1.3744250021957094,7.079638380945923,0.6959080631159287,6.356147549657212,2.553796621352118,0.4468896866744543,1.9226900954329063,2.148711790825517,5.541117634299992,9.767812828562104,1.92653236698076,9.807622611505248,3.4911568815258187,2.882866844369849,8.719323651003041,2.8575197297356647,9.485952717155195,7.387932219555092,2.6486530251967655,7.293887952443335,6.39397043423394,7.486965725368025,1.4759566182349526,7.990746165373546,0.5954593936197394,8.42163586916384,3.6203990347104975,4.368675329430705,4.698715789007966,0.17487039009032257,7.842401342925798,3.065019074018973,2.003448016272784,9.131722140496233,0.02293676423904767,8.122311637380054,5.003155759774012,4.875041218541436,0.8596750694142097,0.5173018843850663,3.3372820192081365,0.5671199245601422,2.58136121539996,8.526201453748726,2.9460118120543166,1.0783631549235118,7.403096134039511,7.979193317000002,9.397129179026658,1.6266498121712059,5.810880798421825,0.4848997745089956,2.9437114106418316,8.894584712753005,3.638600376802117,7.023288532457244,6.604100126677146,6.388671272769388,9.510703632350232,0.018178770546752876,6.453765412634899,5.613123059605236,5.7976521480833405,4.186690786458556,2.002774168324144,8.629090120797589,7.687726538741875,2.1840926448414866,2.234660213266899,0.6444423698475488,0.8047980584522896,8.964970231511387,8.499167370551184,1.2203007342231498,0.8642284017703883,8.445922652115083,7.471418471288684,6.393291029971236,9.533034593147319,0.9806001875709636,8.59220846283591,1.6589665041206736,5.757785442233068,7.005766681712964,2.021130828631401,2.4854064718488234,2.87361211945524,4.847855485691637,0.1959832713113152,1.2967563655391978,0.6100052031128378,6.735887620524121,1.6854755614050387,4.55253435335687,6.7507788690899435,4.23765542893096,2.3401764796700775,6.4419834191565855,8.69501769081696,3.9491918962108707,8.470490119478873,2.5484119164716157,5.414815276409284,7.300935282152179,5.506515961993424,5.787460661676178,7.089197110412617,6.323332927901342,7.483266861249356,4.6486166658436145,5.822434670073746,9.034868864787558,9.98354088812744,0.08194839838494117,0.7414339189413655,6.848264513976892,8.510892753920913,9.94471226042224,1.8699965484091607,8.396321958190285,3.9623488405063556,9.143436327153937,0.7400473203918834,7.36377637413546,2.7577055768300918,9.592324032796087,8.040683563268763,1.5800951433175703,3.6566344413401763,9.079295191141131,2.859681905011837,4.9881134231640445,9.219999279326881,1.8166306508603403,7.742600575190215,7.645329305703347,2.979059255418941,5.37886415043852,5.922074091147007,3.613098568013966,5.957700686504193,5.637848691582448,3.422823580449823,9.237453342337123,4.125268652947296,9.187277716302283,9.761628244380143,4.207095947738755,5.2007372654958655,9.535097110227186,1.4181387769202214,8.027145553675384,5.509457802628939,8.220840879316453,1.7252484873540408,6.162833576334085,2.842311708235963,5.3714502339186465,4.107427274711998,6.860428047381275,5.7604234727972825,4.475975948431119,7.146281174212918,1.7656875265289096,1.345830737383873,5.285590306687517,4.790718141376786,7.967400754172198,5.5365142398226075,6.579649967966377,7.190283967266935,4.260039684336272,7.078127504247447,8.761506992667421,9.215878898886736,3.8287386948186564,4.181998193579823,5.426727376183105,3.288750681415429,9.029150451839616,9.838300195764722,4.668862236843445,4.7626150116563455,5.720206338115458,6.3685118965665,0.44188407070296254,0.4190735594823858,3.452351599275636,0.5502299533378596,9.76717949731438,2.6709827537637865,3.3633764101907304,5.508674517367796,9.47936470250095,5.936855201413154,7.0787520194576175,3.0730056076938417,2.272582500692304,7.350943824434526,4.470103182170455,2.6294980480073527,5.200745773173794,1.2732191771349988,0.9677726395476616,1.056745883800212,3.440509338324973,8.37141723128649,2.6264904193762995,4.626645178093658,4.11665634930209,9.913642995189262,4.399498903938026,5.392279494745087,9.562528191031996,3.0986606419737606,1.723895722777351,8.664817848711754,8.655984004505724,2.6612141261246713,4.468004430027552,3.687775791820296,8.228831938356716,9.63970453691151,3.815897881007404,7.083623423124585,3.04396181471122,8.355485073874394,9.613155336757517,0.4349003269938301,9.806769937727488,2.6262116240506828,3.1220891963916864,8.270612006378313,4.526698904311843,3.41694249671036,5.828842371053156,3.6360742830977544,4.59767677993759,9.957390580454604,6.136009187047524,4.222141735998203,3.075128971903689,9.966515205292673,6.472048463059259,2.861549652873414,9.603841084169535,0.4106601537800403,7.021745336134035,3.9426334442528277,2.9120605437588454,1.2938743958950472,2.5908864091484607,5.279484008926769,1.7280653679883962,8.849558530591036,8.137859223271223,3.4721317866716594,1.1984163147056437,9.361918962611648,3.0850789130284673,0.8503837363218514,4.160930943856473,1.709145139686048,5.441915121965197,1.96765443607122,6.316464461084159,1.6516157614671356,0.07657335896796402,2.94136904182279,3.6581960694093985,7.533485428831542,0.9947740697710783,5.012715132630225,3.735657641809844,2.3281861301624485,9.70771192815208,9.660265994685552,1.8947856976970612,0.3087720705617758,1.4269579328683335,0.4445166822655966,7.519843698007797,5.8113379764253414,0.3895634610656318,7.082859151572434,3.508308761934571,1.8395800985213628,8.207226586998795,8.142081712899255,1.118070293690654,3.5418973565404532,2.602200533011265,1.6956946846215626,2.0125496638118645,9.439546847689297,7.87974977677438,5.921128071634731,3.3610469386674136,9.709940821679954,2.463899646719867,7.752823916275786,1.6685164875570258,6.520034610969622,7.84626352491113,3.2515572188758535,2.222108209592464,2.6690396308893516,8.213347589546068,8.344128435850795,1.6093912250598952,6.789275417765486,1.6995885844310155,8.601216633920474,7.044660905181996,0.6776071285421725,6.178130583827583,7.90359385046713,2.3817334393761014,1.2968159819200409,6.32518805537313,1.8659153829849107,6.663448488898995,0.9818017025198555,7.294636869445499,9.972982140397251,0.9647098720504177,0.7714566293593794,9.251099531954853,2.3151748456343824,6.010155636616641,9.405980777329571,7.86468765318034,9.710115231138833,6.745855030183909,8.59212325070978,3.0539616211187592,8.557153016219278,9.086938724493843,8.166572619111545,7.523084229125385,5.465476749059772,7.169710171816332,0.44833503138307584,1.1775362549398616,0.24905255321116426,8.67065094799763,6.524594176721365,5.942116260600638,7.186254766491135,9.572377398284944,8.477525721546561,8.114547581955184,9.683228427268645,9.786845831496533,2.6225110377486027,9.465847408291168,5.899131739020909,6.175921218686449,6.9955828883303965,2.2142977011706066,6.5305196223009565,7.596862554482806,7.179739632365257,1.1248729292014792,1.6521624956624792,5.520224142359533,6.906642437743862,4.957359266566681,4.3740784578435825,1.0473542747998632,2.055392680317687,4.589877858639555,8.058594553057768,8.031146285846125,3.419840610685654,2.746738357442775,4.962059484322605,6.856892696347828,1.214505525994991,9.42839390102213,3.104921403538159,1.4776687439816083,1.2979385045255265,0.5015183041864169,5.206501107463655,1.521158048373017,4.081237885698348,9.29593539396256,2.441792891569683,9.071462867338747,1.6138387984422065,0.9895608724652627,1.1791341863087346,3.5861439224522096,6.6111513248105975,2.957812444983934,9.127283545921067,6.237300040568739,9.788303561218282,3.875769411818508,9.143809826525018,7.740190250376784,3.5269187471372354,0.3857856121761549,6.428835949005305,0.22166216274233985,0.8213065701942246,3.411569929263807,8.849351222214931,2.60738187716379,5.816357017348482,4.484700922932361,7.114558190293976,8.998632038994252,8.97887319987465,2.5742134752993318,3.746452923790875,1.391257953491165,1.1680120534931215,7.8186536743336355,0.7976559753238921,7.358495772514464,3.158108681853,7.592399545086312,7.140573725245314,8.701521562716936,5.893377230209178,8.567772362695354,7.879637076932539,8.39947077938793,7.8035318354738115,9.332795256997127,6.232602445552664,9.989150048453057,8.436622027270024,7.660189309338543,3.010265425487173,8.207457433997938,4.466845234540804,3.7522931306921947,1.1572517214998679,8.118366515982789,8.557291556150144,8.833057360499726,7.814196254278043,0.9095971965526783,0.9508901794189217,0.6371242462165716,5.690526481423879,2.1406974351398333,8.757598925893568,8.905504652510539,7.626790672895902,1.1952557987030321,7.439193748100892,5.3660110015381735,4.677449259383312,4.596609566626819,3.619156966811279,0.7060847169365525,0.89402173647529,3.9637349161884217,3.606128212032309,3.5217649003886753,0.2973492889514606,5.884589510729798,6.844442729864122,0.8542739726955206,3.6782392405014197,8.136127323648935,6.140543210584237,1.2658633204183212,4.019423409705151,6.104563756001921,7.8216371287494635,0.6268033611667478,8.65125239783039,0.5819534716363317,2.0460358088246244,4.327584896467888,2.215238047567476,8.630716364729738,2.5897300408788237,2.0998918217532414,3.468510789360748,8.089827125949512,1.526245115119118,5.984027502953508,5.604732228344451,4.797191548269934,2.9657748034350617,9.295845852187325,8.857684776848897,6.475840750966244,9.72909902094635,9.758915541055151,6.383012048491741,7.615493687636812,3.8554837584231016,9.261734474613643,7.097101120755562,1.6231562376501008,4.397762744518099,4.444353567206695,0.5083717928991893,2.289917613220991,1.688479768933231,8.169276465192844,0.06837565797408907,2.716658900820821,2.8800887825846444,5.915238310239319,6.358172037812948,8.389432229933826,7.453302587730715,6.569682503518031,1.5392778205362778,2.628663054069922,2.979569452835089,5.979844641909411,8.984076584937139,9.424779689388345,0.6059745128933769,7.487611738494467,2.0762383048299116,3.0945788774441363,3.399640711998184,4.723138525444586,0.4551193170250478,1.8967678329051552,3.4365318475190376,2.425251270205935,2.872274363327998,9.957801661048563,3.639529519374478,8.566291543904292,7.013547490754353,2.990192879239608,0.6427199667611738,9.199720928081529,2.314234687424692,1.2722076053933695,8.266964907274675,0.35442462174952505,0.32374662049655667,8.61842204665055,9.060103575273025,8.264966377090047,1.1651891164464145,5.714645124648903,4.639298844706272,0.15330298528065223,3.4278416366900943,1.616739836142862,2.8966709550246605,6.113164213658681,9.039357470447866,8.497298705224418,5.7722354601749455,9.131716576062288,2.3409076000123674,5.421267498606355,0.2970979246250738,0.44830786014802726,0.5673527414951618,3.668011452708595,0.554630080751346,5.189446552085013,1.992260503902299,2.5104777944703915,2.256056720408348,9.196432405604572,6.981591141826109,4.328855791646305,1.4762592276025122,3.558521237037051,3.3845467013200414,9.047805538478062,9.441980297159807,1.56115688163172,9.634205609993934,7.21620309578589,6.596698167779447,6.272509554667883,2.149666983452294,8.982174033347414,1.606864680326101,7.2184877856590735,1.4401068760902702,2.9105096611770853,7.4800481212759955,2.9533025561423076,0.4639077986678797,0.49191279228258944,6.1936025723934,6.892037967587505,8.194547374310872,5.723392065374426,4.392020475717128,6.926571337902237,7.393253932156069,1.5146442729556386,8.61961112138313,8.90296083338491,7.9929302378848455,4.39087915722493,8.594062807973586,2.7569837622522453,4.699206103587745,8.299662396960173,7.036052810155211,9.460086460996175,9.690716254575607,0.8227742515534819,3.4366927257313096,6.7344729711644025,8.461753534301673,6.107820962096644,5.604829596233771,1.1937966091046381,3.2356649939525717,6.935954918813754,5.821403580977167,1.139446268039237,0.3139313871581195,7.961534883499168,3.325703551248016,5.406054877212405,6.033297986885149,0.37215513760237906,0.8794175956939521,4.2551063919115,9.551889529868173,4.50191876189961,5.731594072009005,1.771576282567311,9.69425318284152,3.348779400184516,3.7991170618178627,1.0922796100877963,1.0331100724534714,3.2361748971545823,1.3293681959409986,1.3693335076170543,2.021011199546372,2.6104054226215134,7.2173314717068955,0.13565708083065342,9.096023071631286,4.449665110714673,9.170979088539848,5.167698200951714,6.085153508182943,3.315442477947319,7.99154469728081,8.241833213476554,0.8330783648860529,9.107490580070738,0.3205481692414547,9.106750233652107,9.343725295324274,7.49968038896138,5.793501004513613,9.444743570616964,9.860551331357044,6.513089172663495,7.260969801778203,9.841390409204076,7.340764199634997,3.1246554276262195,5.6537766115365535,1.833498553965618,0.7234252564207533,9.534126855941853,9.646920074011332,3.4213747331747513,5.533478323396195,4.479811883523334,9.68437153515946,8.77520921316981,3.064145957679556,9.089753556076785,4.60283182747899,7.403893954039571,6.608745321346756,3.9863248536347973,9.877812414734198,0.475427033793665,6.559483699968347,0.4156839998702888,6.5695207339191715,0.4568320267113246,3.4210624613814256,5.993987122487514,8.389363688884321,3.477708385434095,3.015334254233808,6.8498780669515895,7.213254659877595,9.267732762934822,4.412712508516002,5.928539001273205,5.516699371029084,9.409656204539779,2.770433052206136,8.592265334813057,8.667717470875488,8.038404229438203,3.760596308009485,4.204463350842394,7.747348943344436,3.373489467673514,1.6404173092720398,0.4321542163861247,8.422189449565998,4.520459062056716,3.4752175159033216,8.466112434010299,7.138200751725153,9.062534577146673,0.12443763075922432,2.3952237241368524,9.858779900912577,4.325987758928093,6.979211276554147,6.782368822159668,2.207059386441317,3.9646458572394105,2.369210488733089,4.890304201796496,4.470861442437162,7.35048356847069,4.2855212643159035,1.276084272438327,7.0879440331305155,6.149828083719129,8.982288546441165],"x":[9.609946414123245,1.6678675098543172,8.305620055594957,8.122302700080223,3.1519028942975758,5.169981990152531,2.4925898670959845,1.7607770022830649,4.932175184426317,2.412132979801096,7.02864918892081,0.09446573835566907,4.175983506571326,2.406062526725694,4.36565634309212,2.6588964659592773,4.7690466778478235,4.935011052116714,4.487644530469015,4.62416776634623,6.72520901653882,8.175607728497978,5.486880624335429,8.663512443309022,9.018396445726504,0.7524825680892433,9.201916723095618,2.1591854910536235,3.9537634357916707,8.733512651504892,0.06074199905758082,2.328885855706746,6.24630265676259,5.708862792904603,5.362498777201554,2.852273006897239,6.742613405848714,5.819522887606734,6.437264838569869,1.381820833564733,9.956674262854431,1.0081846491727875,6.956253588858776,4.010758563406791,2.9618556803703067,2.7228822168647615,5.908444156369308,1.6168100341527025,4.970802504667564,6.905557723419058,0.6115675766239748,2.0671703698952992,8.09649216547583,7.0384282599465315,7.626598803993736,6.062661257360206,7.185453276375899,2.5643082966203345,5.939179885018091,0.2537560471494138,6.053057205065048,7.370681062941042,8.207194295797077,1.7407004426521966,2.879649445233672,7.2119917646169185,2.32656538618907,6.399728394805657,9.87846441893581,6.093387977336691,6.260311041813704,1.394125288629433,2.711604637436158,8.69180426182574,5.670288217279649,5.607049443267509,5.316303233087465,5.807972894797215,8.406440232541716,9.462928284925473,3.202019209371658,1.6238076976526616,5.288584376008744,3.2857926889338285,4.323400835977395,8.185292067741955,1.692046233689326,6.5722382026119615,1.9250327506238518,0.5214769310506373,0.9362470346585772,4.923372750160899,5.213680365787061,9.868923777255436,1.7782033227188498,3.0973697927214583,4.000885325635723,2.6834442699013317,2.9137443188320877,2.877038219491519,0.20855003783654347,3.2333269023517452,0.5599693448604692,0.8936683106254462,3.702667200100269,3.276414374141503,2.2725559724798416,4.521742052559139,9.760904360665348,6.5315959464315565,0.4041660025964666,6.3083008367671045,5.406099904875612,6.109617616466831,3.439123959882633,4.605275404052593,9.64007725155274,9.724518146463248,8.818697782287115,6.748972202315544,1.3292535843573239,5.7401009137618875,4.956075755440004,9.52891391021545,8.662704940680317,9.548732071614678,3.500887821770089,4.004165397764925,3.145698209028509,9.494127308112908,1.3459692946584934,0.5318905743072677,6.237617231636136,3.071330711687803,3.0265077084829617,6.6530284409294875,7.997868898564702,5.9775906462529775,4.583841571075844,4.829086726435381,0.7889500351656809,8.766927729546726,2.2671244999901186,4.066816366492663,1.1082913528615257,8.447916891997895,9.574828468053699,1.942181533071179,4.52266462853151,5.984254080056973,2.3311652641652225,5.567988093168705,6.716385666460343,5.0276645909332895,4.071921637896998,4.84053163163749,1.6820605579474601,6.170300472963763,8.996311819176963,5.431030414906381,2.751820177445301,3.812068943682334,8.371568160111009,6.141255922630766,4.509265045010784,8.776595929397475,9.827775142743594,2.4461135408230272,8.344290592591081,3.6768807157053662,2.3837366433107166,0.20710812159697278,6.123613529643337,6.754784938497737,8.231929583962067,6.10167248338848,6.364827530410009,1.2224291921682373,6.968827218267619,3.6513273265859136,5.799122666983396,6.008209211192279,5.0395600235173905,4.2811616361168365,5.336881859620865,9.946610128320707,9.336424869600442,7.313145216405537,8.875898017605689,4.803433151242724,0.8111746096054318,9.756252395722775,2.3937196616535683,6.171745780191764,6.797128314733252,4.769656916562632,8.112545424725875,0.9195101166978792,3.260396771898635,4.72188723165395,1.5131718687210083,2.2073250916610077,8.41345794357638,0.9827835912080496,7.664898469234678,2.3628088011214787,7.89800101002607,8.51504492802583,9.390511559700592,2.4962072473862262,2.6395065387837757,5.929486688587902,0.6071545676274592,3.167044111255668,2.7981295450993304,6.4378488368972615,6.621217931618815,3.479471993493326,9.726880467358672,5.3391761864428915,9.10478875000199,8.953656575614746,8.589296762182826,4.092578468520984,3.392928120651235,8.200102258348656,6.124485907754771,5.726081502744611,9.349099364046445,5.696394549308597,7.931383824799365,3.3413320666059243,3.080925741827214,1.4002250669801697,2.5140111762813744,5.4403711939473105,8.116553738683212,2.4978155561267767,9.708863808685656,6.41476663761974,6.954211619248976,8.840801122941837,6.200803574473839,8.420787681910005,3.8534599581889806,2.426676998610353,8.63482860741383,6.149913393975912,0.24906710379160035,0.3280736864168077,7.993396758094455,0.2454995852181474,2.841598628242168,9.25563926243777,4.25268075618118,1.541384560282355,8.447935334020986,9.139693927272736,8.932950304584013,4.393146214005707,7.496734636763875,8.413155001034045,7.543122296660725,0.14938395004023386,5.6642223128080404,8.86609196439265,6.204755744082513,4.086397597074152,5.020790501890422,0.2411663887618576,8.210557845712124,2.890940415079255,4.118083296505848,8.484610192028565,7.162794862667297,2.791236921660931,6.900479932624832,0.08365532641430029,2.8071308549550467,9.282800465027803,3.8946970175944573,7.873446925931997,9.338901768033885,4.174935811398024,2.0474876833615885,4.633488781942745,7.081566669020951,4.822596526734042,0.8951024990155032,4.578372978190302,9.586947667693842,4.42650837684702,7.509038267948811,5.909878881678006,2.9107800825186714,8.381096795538488,2.41244254521356,0.9152824187146202,0.635799464811484,1.577290768230264,8.925936358117262,7.0568845157512445,9.966349908287516,4.668681161207447,9.29469798082086,1.4219979774277203,5.487106124786969,9.693181572527482,6.287456893989862,5.026213057238986,0.1447420356398288,2.018437725879594,0.7111447505210755,3.961496286450683,6.223048622716574,6.777120316073475,9.402025624671797,8.561706851891698,4.69947780257463,2.182690042532882,3.2384849966425677,6.009093448020948,8.164279428055185,5.1224150735551754,0.7280959593233005,9.874917046565692,2.108098083187595,3.9839696801945212,5.761221603357791,6.554246489715125,9.397861009248324,4.767441488850572,2.12590209837068,5.152051895091985,9.48613415191389,5.133021372410484,7.709135840100052,0.5820248513364668,3.402286551383451,1.55383140889914,9.834349441586221,6.596389740310837,8.793689439414546,9.666167950363118,3.101562948426053,1.3310140541161197,7.272545433734239,0.3572182963394188,1.9208189006014753,6.352642619514084,6.960809993786421,1.6395613768632677,8.610267023993288,2.4532369487379824,4.680141127766264,3.5625644282437374,2.7658098556535937,6.5688465940556,2.578332408868198,7.625483954820316,1.8994748330987687,9.443675699791978,7.542442682045292,2.147604633048368,3.683429611293183,9.290809283160161,4.2082636093304355,3.3926351697819457,6.051360986137311,7.0760556115811335,9.396913606476865,8.552505882707777,5.853400817001386,3.548700152863775,6.386456698824197,8.474997105827386,2.8909522140559574,2.6015047920081913,6.535869529246985,7.399266376053529,7.872513349212338,9.667079000226448,0.15757600253031523,6.419607537522552,7.157729861419617,0.7263088896437964,5.403155541441704,2.2750890549326908,5.148959944337557,6.027639118414498,2.5030424464754164,7.521836249412379,2.168234140134633,7.742174146189584,8.159601336908473,7.490954146562614,0.07014437763187331,3.6828280168396477,0.25613958935773784,9.730700106453142,5.3843741041045545,5.208538003052348,5.146584807295218,9.659053079480518,6.061241869694511,3.0427062085993595,3.630323198093357,7.409940634878611,7.126221999060558,6.569564213191679,9.606416026168908,1.3928625186802845,5.412554794900116,7.322498189237323,8.083914023605432,7.717309884052195,7.4563986363156936,0.9730235397088727,3.6403206256497223,6.601243316828849,5.221492249510193,9.491438559320969,3.5214602973501563,0.9519788781139105,6.070791044396704,9.745664015625064,9.358171706646408,2.124824838405568,3.255814387736282,2.818082177272303,2.120461073663078,0.1500117025608816,7.7246844398031715,0.8094039376504125,7.233510664267855,7.468846978501977,2.073510604345965,8.731504552836496,3.0611015058790514,3.2889394262428273,7.209351951593657,9.195442044930793,1.5698488236332309,3.5448254158163506,1.6302107110842456,5.374927160033143,7.3861241565156615,1.6089736703870683,6.280331302872392,4.295998039706495,2.3933364290466153,8.551347239632918,1.892055553141938,7.96969989462581,0.7098461294084846,4.421240663963819,4.65279851400491,5.497500611030668,0.6997414054120443,7.086887234185921,4.122231972974964,4.270201201154067,9.795438816490298,2.716819486262221,7.472815071609318,7.017647741629949,4.4493926129761485,5.417626192948268,2.5496985229012115,6.633390936925543,3.5047540781660547,7.945861910520096,1.5187799776376498,3.9180319619983828,0.4744094951831057,2.3132383683043756,7.317208670725002,9.63804758686017,1.8127360469347709,8.133141183671416,2.244123987812141,6.088363329661483,0.7861042810564145,7.442783179212977,8.540832958218571,2.544803705623031,7.9796960118602716,0.8153014636886113,6.312400991583294,9.38254477281262,3.894597561202018,5.221240993160723,6.759617717840354,8.589971853958229,9.416124746310167,0.5738929355775246,3.681160081973367,0.363137522665522,6.351006853427405,3.9260811214490454,2.0358697411096927,8.513888622225332,8.163323924264166,4.571899646574709,8.393254378234081,4.399068473896193,4.712551226458386,1.028687131004138,7.82243390704549,1.690119230591327,6.9285481155845225,4.86382316262185,3.4696777903672493,8.750644585481977,9.570806627204991,8.143976445963133,3.919115199066625,2.319734242435161,8.658512203860449,0.7563141605706369,2.060651334965873,5.955849338778152,8.687767841910837,3.078650088708692,4.477089774629189,1.3459913048726713,3.130511528509776,3.707786038123171,4.850342973786949,1.135266760807374,9.73472444685103,9.593495110459962,2.4106822352262536,4.814522283205003,4.484259563009738,5.457368804405873,5.607639029318916,9.372539762919773,0.6961459437463313,6.247923962042908,2.227914170400418,0.9359101861858599,2.052638200006598,8.184890054801599,5.1591820610789085,5.86762454895487,2.0679611462834036,8.329551496421994,2.426692450366086,9.725364452775445,0.10650746995382265,8.405352554510033,7.011227167331729,8.897192786166613,2.304051950944055,2.568972001116936,6.251772273150278,8.642126651647919,9.179477648399407,7.749455318911571,3.4749570264036223,4.819692946927276,0.7425284643300323,5.20278244785816,2.3937175104114217,7.213945150331136,8.406210521899876,1.032181699889354,5.822409618545095,0.457267160687056,4.221218447664075,1.9574681525051374,4.707283191184343,6.427787028698175,1.8315180188531266,3.0452572524960098,1.0462709746480514,4.2482391125796415,5.930329238750165,1.0613598615092013,7.065385063655258,1.0393108831086795,4.1837791080826765,0.6999658919991525,3.3468240350566125,9.883949527160972,4.459664483058217,6.796356787235169,4.913668880080582,7.024734460222395,6.528995539207488,9.533025670283447,0.24836131559950125,6.06565350727119,3.632622214353838,4.751576970626767,4.379849419072315,9.015392044059137,9.943374181040154,5.030024260994139,1.066387314081596,8.692156015220567,4.214643357106478,3.5398293989235774,2.901842744738261,8.692485533012702,3.482693974083342,4.2980692305878065,2.7113133096070685,5.959583923264365,1.449972325045663,6.028053996363827,6.717290712288129,0.8024461928658866,6.07320250579895,1.3790584153926133,8.592405387163787,6.759785327726899,9.510522308549522,0.01713568632549345,3.1065304300369534,2.9692501149339345,0.6925628652295868,7.339603671454212,3.743951865723907,8.668473080469303,6.82826373416953,1.500594846913057,1.5646026499277244,0.8939265912655614,6.16843050604203,9.612896545142952,4.032462367805971,9.718071689382047,9.881582371602697,4.774559085573591,0.1959996082219817,9.11333030009634,6.840799870718747,9.203123423056239,8.653101259519664,2.9277960903178846,1.97333753227388,4.209559867236814,3.2595516826622983,4.404068631626952,6.428351982164504,5.123908313204506,7.325797237820968,2.1219474279475214,4.1007736957568675,1.1333268546803676,5.263363442426019,2.053637691376353,0.8656872497216561,3.270946659783931,2.1895614410365116,3.4053518426495133,2.1477520141310635,7.535046042772504,2.656309815879594,2.5492027436289133,3.2242125292198542,7.69488046060995,0.3124811232685354,7.606204046953464,4.309660228815353,7.221268716677449,9.829030018854219,5.175029305136234,8.676716548129935,9.490922469571652,3.2544235345894146,6.745236100477799,7.500685525488848,2.5331793497311494,6.2405057432864375,0.968678312427671,7.516595322726514,5.579735076002019,1.2656885420741704,4.718865986695048,9.119937775238524,9.912986560914451,5.613960063774456,8.105256637305821,0.21802045564130568,7.729186947027111,3.735215519514352,9.246876043601858,9.339918224605025,0.04458695178400918,9.01849243575522,2.637679254045635,6.491332595815562,6.27278189616427,4.309007313074769,6.445180806490624,9.553980642825518,9.39108667818913,2.2970732062936805,3.8326464031608354,0.17967214096655804,2.899926496864127,0.7610062011350838,9.81633366094144,5.1354803216704115,1.0239934170445442,0.8786951172383195,1.5785634932093684,4.777356274336839,9.456375036650723,9.548722883562608,0.8798704910861477,7.175911978610956,3.599303542728156,0.5677434834264572,1.4281329501171647,1.2087504638631907,0.16138214191999456,9.842412713705118,6.54844521368374,6.75909150142084,4.151104911950889,6.533571698983216,5.113265759367889,0.22822003766068466,4.885275130294491,3.161998108421742,0.4148569902876109,0.3939999503175673,5.3424921797438945,0.005831262224040845,7.580220662006658,0.5152722095499107,1.9493400858976195,4.498752696032362,6.545396128874068,5.4802894587107165,5.0546215548683,5.582045334223187,4.376306217513813,7.977409341645747,1.6589126541333044,0.6023415341435778,9.084775888884035,2.007582987765957,3.890875555595219,4.694050105693821,4.6534298949072,2.4650170788501002,1.3273092394123553,2.464563631890513,2.1627392421204195,1.8347193689886865,9.105897220715065,7.766521416425849,6.833002892241575,4.532488842638676,2.0460437197050507,8.73091305703548,0.42139971802394705,3.0805623939346516,5.123446525161086,4.007201794557318,9.478928346541906,1.5543458209263905,7.2833415483000525,6.896957406272088,4.407794007774408,9.291956949584845,3.947546685294838,4.2473072469977735,2.388528795779561,8.046932124514637,8.7011446687145,4.065801425489191,2.0016551936219984,7.23721509563052,5.518153746131498,3.262686824664758,4.181944601430341,2.298615607772194,1.0288569215671473,4.92940631155713,5.555677520811486,3.752326829696644,9.912880520074573,9.061168760710556,7.355225150360376,3.1437261377997383,3.514651467203418,6.171562053853663,3.3410275685605817,2.9656525307791437,7.309639353466784,5.146722682029488,3.9910501644951335,3.888515168166795,6.786796164072979,6.492185245670036,7.525068480364013,0.6803139024457261,7.85506931635517,9.5320185401508,7.3270451220099275,8.440120373172352,6.068363199438325,2.190953922826724,4.221790102658534,6.455573499791692,5.594004276350459,9.94959258664144,5.8690568575121365,6.174987662595273,4.274154749023616,8.31390065107694,2.653270325335111,5.50826945079722,5.656831177432016,9.12702624447425,4.964215985880327,3.820337281428372,6.094694998899753,7.64967588064388,2.2842131438394064,0.7810295709397064,5.15970736206256,6.570087233454888,9.436211984775515,6.037519967326006,0.2874281875356832,9.704733910581025,2.4988603753274408,4.096313001293668,8.442765486845934,2.7702425201308167,3.1621225039400325,3.9932532652864294,1.9493995314644397,4.920167080624218,1.494495076792659,3.671067429207062,8.546065139186418,1.058313141119247,4.79503207587018,8.203700074461091,8.586932107342522,6.980169193447723,6.108505827698534,3.389687141718898,8.40895260743374,8.981917799211699,0.41600539948969617,9.893003404977526,0.08809033002318056,8.020165814555378,7.650270825901078,1.884362047312762,7.407701063504641,3.6401758258249473,3.847089967314097,7.562980948685311,0.870026446360217,1.2437570567649048,2.1878137211650506,8.4651829922818,4.515324212141023,1.9674070255101728,6.244069777469717,5.6045156221316095,3.481183697416619,5.762582959159193,9.683146550512951,9.266164363975085,1.4549727566956316,1.804387041365454,5.477005309148975,7.936067151780728,9.985765865087268,4.6421563679421745,6.463751703700524,6.794703658120811,7.467591642938418,4.80882486110858,1.844017790044068,6.785858297443472,3.2353624136821924,0.6258897963399157,7.9334442047525915,2.5947065327982877,2.220121849383123,6.7155628431286,0.5595314013528108,9.07217244275586,4.851529051140952,8.371742906548752,4.4862030903012595,8.097538915616818,1.0708818475561133,6.417046656554817,9.27044958146845,2.107201370821734,0.8640843490411809,8.78215484922028,0.592755250174688,1.8624569911536448,6.769305292766439,3.088198838822591,2.1635217666695983,7.351846717394592,3.667383497169132,5.852750917696152,5.89266161109933,4.0934031731711595,8.29457134337276,0.7099461151356135,7.4914621731125735,9.487157682014384,0.9426006402990295,4.710177249417093,0.10735640827219228,0.49248642802198317,9.61926765739628,0.44957556632994944,8.702493807736428,0.9070017332665947,2.2670202196502753,8.953885924821517,9.578361683395649,0.34063026039174327,2.256442280069779,9.436565890603784,5.253656758510097,2.3501508061169596,2.8694833262027375,9.182956965395434,6.8643160529038605,0.6653623942991205,0.09052462997066524,8.366471931760556,8.9758119179704,5.913875016808787,4.335485419555911,2.5822751029775115,2.9658648115747988,8.882856968694243,7.192795658171258,5.9812786183205535,1.1938168623338008,5.931211714474955,7.885518743514622,3.6494760026868867,4.245106138517216,7.2885065370085345,7.084011525983485,6.162943700277676,4.375453775011873,5.700651898420716,1.2308002565762277,3.8011268734515857,8.872430169661374,4.719593372357549,3.472079306534559,4.884406304490943,5.432996040483157,0.2581472206910673,8.370715919955053,3.753709742579616,3.4141056395685876,1.1911693434032156,2.7789326154169802,9.353338157732075,8.602532731735028,8.909956535542992,3.2447904271276684,4.384207570106932,2.1495150961716702,1.1984936708142135,2.6692722605500507,9.345650975307327,4.3047081490956955,4.321021371863796,1.5041887542118948,9.012864723432125,1.5168553774093407,5.2912470293183205,2.6024431108996726,7.800902685431121,8.608975159043634,5.700924677488479,6.399125137333614,7.852806201031573,6.094861573721307,3.664222916719855,9.030353799908497,5.298701448743143,7.031542413286198,2.460170186804367,3.7827731109918505],"d2":[16.52647813371582,17.686658606803068,11.657542501936975,14.641015833626597,14.061954049830483,10.389217247369622,13.85227007971963,13.693483958846397,10.996997079461757,13.463686220476445,15.486908873043854,19.680668869378778,15.461962761997183,14.666020807301054,17.909757749488517,14.21709601462789,12.476997243411184,14.101749748903895,13.2847243921342,19.890789698796908,17.296449875315275,14.611307433935641,16.403740713247313,11.973568331333661,18.539945768668005,13.713492944761597,18.82075436835265,10.106899996152004,17.967689677266897,10.702181137701851,13.920803068467213,11.626421579914775,11.431754610003605,14.211110173347537,13.880446066127268,19.890921166255023,14.649304585998408,16.0446617289835,10.632369969609208,13.447491617342846,12.423972213459484,15.2536933769131,13.686982204710475,13.192922256681294,19.569024525634966,16.008576809968844,14.8971476604375,14.788574647657072,14.830391129538057,11.838937175125748,12.844369845941692,12.520295578520358,18.70301043894044,19.632036782171554,10.801444365485516,16.761803556930076,15.202897682802373,19.408485777505646,15.402806652607033,16.4242792364867,10.735437728360527,10.232381410943622,15.119350770417208,17.5739619180945,19.17989779580153,13.034067066538613,17.911604040645173,16.312006552222112,12.534710955560184,15.927849043241718,11.207133578401514,16.562301096831103,10.183049177241948,19.080255477028494,14.201348245162047,10.761363364140376,12.010163739424087,16.280018245650595,17.34383711508341,10.93224234354809,19.259054319754426,11.025254652985685,17.017182761442136,12.438812530167652,17.53100529648531,13.408272927751561,13.338146145911612,11.189872618709867,11.813365515111032,18.600607358182067,17.122115203570345,19.190114027044835,18.91009780440237,12.083057189872244,12.5880622097468,11.910298853790259,16.060706102534116,10.248433942515485,19.96237043420599,15.414089063837453,12.124573874422722,11.2596471702728,19.72816868955382,14.903168213422575,18.721899172631957,14.101442565848872,11.665471819236203,13.916698284527305,14.826338077730954,18.566501658857568,14.03812949896232,11.92995427318705,19.783832556194803,11.986625184288226,11.379485869964638,13.758417642366226,17.904469893990026,19.205249184448796,10.637266764972306,18.162079450291735,17.06644406231765,17.95846536751315,14.867766215803616,11.723283083926788,15.534762438467968,17.404578574804617,10.723979558381933,14.697922511289594,13.429000032677447,19.589148134849665,10.908506969763867,14.822947751019925,16.148699700541744,10.003159305972872,14.602896373923189,16.2722566918097,15.63234402111605,11.265904016817734,18.274001941964748,14.988185079252114,14.469175538417582,11.59709292531785,19.5236692922945,17.70492145573373,11.015833248137955,15.475727819601826,13.40220801923932,13.26864556380543,12.05375724376809,12.761612970825958,14.962631187560135,17.010313805379887,15.208810480315,14.98387007989701,16.256570717008323,18.221968856462684,12.439204403473065,18.830314796179135,15.80188063117211,10.83931557888901,14.069899845578394,17.113224923123944,17.249361587649137,11.928763849562174,15.125289890264021,11.621879424713107,19.982679369053702,14.279539518568853,11.68105693915525,15.769994844743087,18.495017101691822,14.233012009879072,10.395298549702991,15.042478510925278,17.085243814473653,16.879433377716104,17.76120092300031,11.427812116462022,18.80583836288514,12.534253353549925,17.6881361989275,15.359031561362396,12.666793106302222,10.694144030078299,15.523798125880797,17.63577588763329,17.12351845910828,17.773902000930583,19.97587991854303,10.570685261590427,10.647775394627576,18.800082870193002,18.670079890440583,15.556139469529569,19.713612717092623,17.993214724625986,19.10811481495572,14.771010524483764,19.064135892514905,13.260069740158347,17.602304977207663,17.7782422507546,11.286398969188888,14.631792677080846,19.360572828876478,16.330208678037998,15.349259666055286,18.300045137574024,17.564519092149443,18.56410332072347,15.582589143009532,18.099801315740496,19.349147635322755,16.477675220018014,18.87763356509063,10.27723711110103,12.44595592316178,14.340034805581773,18.557284164002716,18.076169731354973,16.477114114572295,19.189215291699888,13.13056501957619,15.342748066181366,17.17871265908655,12.168329603419302,12.729314860419315,13.619857830352014,10.780591024389633,15.68869246309972,14.490466092149797,11.356061782962112,11.132528304407831,17.669535448334003,15.656856367403755,15.688426398069362,17.251338794026594,10.812690723304165,10.29393708468909,17.43997028554314,10.716726230452014,10.052011227564641,14.428741342576291,10.156198520215383,11.860220196226404,15.945498952531059,16.255957538846744,10.84987133021616,10.367369256078252,17.609135183099745,11.678395548111226,17.939402637956757,19.998314366907167,17.415846506328712,14.972701826242607,17.2220760742492,18.825553436292175,12.747035561550142,16.940994268057768,19.094451347524085,10.605133406749674,19.903680286239457,10.136721853138846,12.938204162905587,19.149643424541644,18.9014427558918,10.958453512774607,12.045029842981116,10.118773508754476,15.330315925450655,13.998661601477353,18.083907070120695,17.58630458226505,18.235307225744705,11.012502355927147,16.738598234596836,15.610662411937525,10.428348432184514,19.42684590802483,17.208025460236527,17.63327944848187,19.563485059406805,13.164175558225553,14.104519320959945,10.781912640553967,12.59290805567786,15.551633943055066,16.851305224258642,10.296355210359913,11.953116359346279,12.579822328309964,12.41006642814007,18.885041245580894,18.456140409855514,17.277300304671154,18.69716741561391,18.744827649910157,11.300195638958051,15.69543112975987,19.361344654077186,11.284337822549942,18.98407571196391,13.915946429759437,10.848262090915973,11.049145228247832,19.896920480560375,18.876937326441745,14.795030243247346,17.866987059365826,12.923666064554398,13.951484043666786,18.017933135262822,17.134854814953943,11.173020203411355,15.066207882660553,11.085903075751052,15.398136635148784,16.889866189030712,16.091873525362978,16.35826682244811,16.56537514558928,16.33951911687481,10.440778252307625,18.819059960733526,12.951494690898569,15.982242104255072,14.777497974010835,14.115741369094925,18.336181237851513,17.66970284281138,10.228667322835241,16.885661321817814,18.330943311653286,14.540225106389176,16.760113152026328,13.991530903253324,14.494997763381692,11.886848810528516,18.332395306188825,18.874735689611384,15.165594175386573,15.492588462779576,14.929562227718078,18.991624825103457,17.617656414182655,17.56914164881138,15.424920177754622,16.826665010721925,17.315576670174906,18.36623372740616,13.892436609852986,16.378278853233518,14.021003880763864,11.766598557900483,12.875066619889532,14.49833611335951,16.46534871848101,11.16197198407108,19.34447468912309,16.1497371395963,10.375289566846849,17.001834768897826,18.91585038699683,13.899623930723163,11.61010949387849,13.28593557127977,12.451954658461057,12.73862589188269,18.804112069952126,17.991850459970813,13.64865835252121,17.578722026264415,17.05496555374015,13.883749722172631,12.482874977857193,11.05639570623185,12.741510022470347,12.920886059633363,13.088541298486652,16.726728721706376,16.301871123258742,18.621292080303967,11.90459539990433,12.199139558967333,13.87125151033812,16.048150517470567,19.380824267329537,16.45909133754724,15.25750570669035,12.401176002098921,14.611576178347041,19.92647654501129,13.651867690241792,15.380153768338193,10.348122632139212,12.894664466370912,15.4078380382745,13.667344848545206,14.46224507041772,12.362555391881063,13.85113799697404,19.67781656729325,15.403339444107276,13.457960011985854,10.348347267911528,18.23425544234599,14.305378254357478,11.415526296437088,14.018758695335098,12.841000444814973,14.112822600323682,14.028308913852294,18.530288340390754,19.112301580193197,17.85325919346554,10.193678194130424,14.238732715055972,11.790505079729803,15.380943775478116,13.79755167606701,14.793757941403117,14.36844620869861,17.64081658761542,14.665824718711306,10.811419220722085,11.561578728981027,18.45586537069178,11.597987618912795,14.417564466274158,13.616011220408879,19.24188429872592,12.40688158449081,15.169897245741797,11.04460473962858,16.928274136974004,19.92107718931659,19.58737076379726,17.206184820475237,19.422997822252647,14.256178928232675,18.26178627320585,16.357663041718425,17.898857685096083,14.260266095512073,10.799656783245556,18.973353140666216,13.536433950847329,15.639385223092706,12.663732811633011,13.245958344887985,15.350348309268846,11.011335628746863,17.862005113149714,18.825339793442357,17.304156307136232,13.662307792249283,17.57168155095916,11.072910376812644,11.0778475330649,13.863318107621641,13.795627322508508,19.941359862976974,12.467903189563305,15.860313367994179,15.226522886991365,18.88351341862178,12.670995580839492,19.284667817713377,18.57140878502905,18.796714552968595,16.507529774045416,12.073765713434465,19.611092792886932,17.379099799329843,12.557594535920593,13.263461680788453,17.921353413705745,16.866228412417772,12.409169026948101,15.907571495450588,15.324604600624347,15.25863726784955,15.675265939712304,12.653404396275285,16.3156316220154,18.96553499801064,18.365779414844745,13.410291782719934,12.656808575882401,15.600212143755448,13.999029115482227,18.564939762205114,17.587192297271518,16.730924632688684,17.39155882390026,15.888176653038519,10.939360101009735,15.84371677037274,14.341304206898432,14.32673021174728,18.202099654080293,10.125380246616484,10.518728264539774,16.53958944122202,15.353137209069942,11.717573270299994,10.59943981058666,17.002313905085813,14.296824582537628,19.534584951133702,19.79944261966176,18.183118319728223,18.710239591659494,11.827314101813108,15.484185026566369,11.401040500026854,19.283725082984763,12.405968408993118,12.09027472037021,18.18889109152777,14.053320631215724,11.43100537829313,18.66489161551973,11.903531777537754,14.947856431174957,10.63372989214528,10.66625777323345,16.977802714685524,12.820512944831915,10.168264750962157,17.957779828955484,11.35734235828541,10.424833349951774,10.186317531509417,14.144588295089974,13.302472986645233,19.065517340776328,12.252221490699188,16.17348893852845,13.904194312049064,17.70387293295967,11.169995265171105,12.105695442005693,14.857677357418595,17.513714595022726,17.38026032467353,11.17107680024211,19.739436410889176,14.549876278371158,17.003226947153752,11.845541785846754,17.897299828961934,16.660865822444748,19.27820099674769,19.004030132321684,10.647011691547707,10.839040330447299,19.80680416622185,15.25161294197827,10.733199456506172,14.920817826188566,17.37547310258001,14.64954532253458,17.616952913036314,18.826496423938526,18.02598976767137,12.301397228438262,19.580960489000823,17.285594597152794,13.533440131221013,15.143196492752294,16.025008946885237,11.393641939636394,11.400538327538802,18.66272386246319,19.46415767930221,16.167166863160098,13.271537692758484,13.856037277865013,12.29852898504287,11.343812864017854,15.65727187196413,18.299443516291767,13.318935765742575,15.950695792038838,14.46739356859102,14.300963139058268,14.578020943144407,15.25455891834511,14.087497833366726,17.37525617391849,10.5969052185999,13.260293811694261,18.70848882013788,18.859410631147256,14.176481290257186,17.198320321472394,14.83193452624124,14.856871154224553,14.442957098425246,15.334465957371705,17.577528311414156,15.673674772040869,19.730579158778422,14.039975518645292,10.09471993385713,10.449104341147626,11.001072896442308,10.878847510329678,10.649432546967269,15.388988257286382,16.278837741398874,17.27179873594473,14.324055387360453,16.251258805054068,11.54009251391811,10.736209157447274,15.828667079307783,16.700393041382164,19.312545200533396,13.666512456545084,17.490469628109828,14.302060809339512,16.841995271845686,12.271119965834469,19.722130812790873,15.050826576366973,14.425840215460425,16.038933008739996,12.2431067099076,14.165532906922744,19.897910181596405,17.950238347832826,13.082830287911055,18.47297107477388,18.55597092655058,16.509299412200928,12.042899230331667,17.241254008566663,14.301005330800987,16.946894455251524,10.84464160201658,17.374841976155057,16.551922263075937,18.513612562166365,17.76770231659706,19.585546135246368,19.582598433425158,19.76903885125749,10.482597476134261,11.68308239027915,19.902297876814785,14.494004249243797,19.723434965256807,11.24768293817571,12.136491937366866,18.51325050233875,19.187816609183454,11.323603018240334,17.687020455841694,19.687842578885324,15.190525634607965,14.127942996405562,19.708145697673878,19.064208803515072,12.177912043096184,18.863807818749116,12.064144668294503,13.665262043749227,17.181638668354623,16.559726264288585,18.669363202702453,17.647139971059577,11.103501539377021,12.483216234652598,15.443029606751299,16.938890194006365,12.503042164652435,12.33930874937505,14.037913115948701,12.987967410929999,19.77410368935736,12.643255834599865,19.962911347832108,11.529210187046349,16.144078217378684,19.18161552922478,13.080137492310214,16.438066535406048,17.56582418970919,12.300138273131427,13.652491027865013,18.440264913380318,13.051682038328195,16.45631564411908,12.607868706037493,17.16402851096155,16.98226796127423,14.264866285145821,12.03914156188432,14.913057411193293,12.616460723528466,13.686106202456081,19.973296446806323,16.22563306372707,12.083784614877937,13.51499285157179,17.18399220440288,16.96308233724376,13.468191976708964,15.487729180513325,10.608603461539676,10.676789684720141,13.805549765090205,12.33193267634542,12.908099495982919,10.894650753750753,18.0315990783033,13.64465990664863,18.146457643488034,12.446925106734062,13.749693803568078,16.77159573465873,15.321505949539917,19.36862366609086,14.583409316765255,14.930897918597353,14.989068674771806,16.32940908954489,16.49667351669764,16.631563798897886,18.688109550206725,12.662926175538036,19.51275320656177,14.484111704565548,17.93715976516502,17.121569564412738,18.418583612140623,12.403173803400287,11.81164405399123,14.707262721413167,19.171060975825235,18.652190032144702,12.930424527774653,19.321789747667843,13.984024022862728,16.904147622375238,17.833145491835865,10.085645706223458,19.85751494024783,10.697369634598118,12.088339074855078,10.681863235290095,17.552314189429474,19.180658650166144,19.044671783165,12.210503917402619,11.66413396215129,13.86395068922965,15.611053189914132,17.90206812100522,12.294657304767217,13.727373474861748,15.102117798269328,18.946227813779995,12.051386934161679,17.154652221050974,13.504300771713673,16.539962479594372,16.077904317943666,11.303856656901639,16.376867000075677,14.808287807502374,15.898680687502939,16.393794286627344,16.938239263302652,12.715304780943502,17.267291891321083,15.80787891076916,13.577513735702894,17.922699153265675,11.98907544669403,15.09302621400275,12.255088369454807,15.672612948603234,19.985135067095626,10.173520829315798,13.570990653250693,18.995669783033303,16.57755940151752,17.475432515501026,10.138818313212068,17.433021499763584,10.179296458342598,13.963495231153525,19.838348907444313,14.014149742231563,12.023640620646647,17.475853674462385,11.834170857031769,19.605206809420892,17.95388905651774,13.93866130186268,15.825535575375849,16.69963556219404,19.744811763001138,15.018738937439494,11.920580057586836,16.68740798935277,15.608504134191513,10.010319362861349,17.24890429136359,19.759721796873844,15.180260647899601,16.038650225895587,11.44240559724537,13.422027059091764,19.431105763480353,15.797064910887684,10.999852775446822,16.117250561521512,14.25935075644388,18.822463886360005,11.728780989215997,11.832654289754334,19.505307228864204,14.20827242293308,19.743494242036093,10.100642206591031,15.912665473735434,12.100762271804628,14.307183885597079,11.299305783841977,11.268443117415629,16.85877229785866,14.842620520797832,11.169011209449742,10.859790733275627,18.476960849075752,15.625567205991686,16.554255848544905,13.296140100652519,15.372764039325336,16.93892751662744,14.875236730502177,11.703626161171083,18.162098356148704,15.418560717339629,14.175052347990444,12.388103117151868,14.529970804438033,14.110073144571135,15.500679780657505,12.047840026354535,14.149169890747771,19.812370864543997,15.354159286454516,13.629683318894706,16.877156429592223,19.72815344538599,12.693768432570918,19.46172860921428,10.12422338644214,15.015703376510572,13.969373498659166,18.713614184788234,15.85011669191411,14.922593642389062,19.750744819041177,19.058868067837174,15.822967881418453,12.312690130006384,19.979173981882354,15.728686711569484,18.683858658110672,14.753971679025764,17.476303550343566,11.623699253261677,14.575003069181909,14.148053708408433,15.37136511077951,18.342402757011875,17.03769867999892,14.794902388920155,10.695996012177492,15.932173397244247,13.995226445328473,16.588260780424783,12.972394552387277,10.618278783656066,18.50138472886819,12.305920598440768,17.060149096508262,18.921721683650794,13.275256387563042,11.439769764397834,17.48530272155205,14.710976237258272,12.338917205942527,13.87355166936331,12.55722393099752,11.317953702753972,12.268972633401345,11.329213489128964,15.468979362559148,11.331847449944881,19.918355699103806,12.583829897414766,12.026483324075528,12.955896845081032,17.12017600010786,16.19082452461147,18.83023695593767,10.084177423624705,11.929520226066018,11.45094443883373,18.44350108261548,16.26142110724133,12.630676036072439,11.585758481859996,16.317214921333104,18.31719559114206,17.38251992177881,16.777815338442558,11.324924309280107,15.47813135247345,19.37422103961351,17.017914392977715,11.783966697336579,10.729042611823981,13.228134686230169,11.915904303415271,13.658813307447373,12.466609782383609,17.456685752851158,11.47911757032362,16.59261392758985,13.078399685397626,18.419709738585116,18.742484268291157,12.32229348004114,15.195348241844634,15.580069748174934,12.750009478391016,15.008059159784912,15.43523485668347,18.180448468153667,15.23638851393692,10.980648228525162,16.984461748124787,13.035497314514277,18.496618668368278,19.85786854865583,13.715157442499242,11.734405924614391,13.810494854806034,11.107983485441732,11.769391840981715,12.588354083115522,18.43625983804659,14.572238350752952,18.382014109600462,11.461066022475176,15.517244341727594,15.03096854423244,11.055587680346298,14.926492242668598,16.528973486462604,16.608998753215012,17.35179913142363,19.247246529673713,15.204944694582673,18.190666857558725,17.570922515599438,10.105644297788036,17.81951062718003,13.682482127819489,16.229877254480584,15.305814683847789,15.148660586699558,19.476540735126562,13.916945962539186,18.191017642210326,17.161486679247645,16.965263311553848,14.900550716130091,14.072970531469766,19.244493532629775,10.611644020763913,12.687100313200048,18.45970290318003,14.211643292492885,12.923124328424178,17.901641722694805,14.990689273116287,15.81853524813204,12.185587835921371,15.22484858761777,19.924473003740985,10.795757199221196]}
},{}],73:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var EPS = require( '@stdlib/constants/math/float64-eps' );
var cdf = require( './../lib' );


// FIXTURES //

var largeD1 = require( './fixtures/julia/large_d1.json' );
var largeD2 = require( './fixtures/julia/large_d2.json' );
var bothLarge = require( './fixtures/julia/both_large.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof cdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = cdf( NaN, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = cdf( 0.0, NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = cdf( 0.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided `+infinity` for `x` and a finite `d1` and `d2`, the function returns `1`', function test( t ) {
	var y = cdf( PINF, 0.5, 1.0 );
	t.equal( y, 1.0, 'returns 1' );
	t.end();
});

tape( 'if provided `-infinity` for `x` and a finite `d1` and `d2`, the function returns `0`', function test( t ) {
	var y = cdf( NINF, 0.5, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided a negative `d1`, the function returns `NaN`', function test( t ) {
	var y;

	y = cdf( 2.0, -1.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0, -1.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NINF, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NINF, PINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NINF, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a negative `d2`, the function returns `NaN`', function test( t ) {
	var y;

	y = cdf( 2.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0, 2.0, -1/0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, 1.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, PINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NaN, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the cdf for `x` given large `d1` and `d2`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var d1;
	var d2;
	var x;
	var y;
	var i;

	expected = bothLarge.expected;
	x = bothLarge.x;
	d1 = bothLarge.d1;
	d2 = bothLarge.d2;
	for ( i = 0; i < x.length; i++ ) {
		y = cdf( x[i], d1[i], d2[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', d1:'+d1[i]+', d2: '+d2[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 50.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. d1: '+d1[i]+'. d2: '+d2[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the cdf for `x` given large parameter `d1`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var d1;
	var d2;
	var x;
	var y;
	var i;

	expected = largeD1.expected;
	x = largeD1.x;
	d1 = largeD1.d1;
	d2 = largeD1.d2;
	for ( i = 0; i < x.length; i++ ) {
		y = cdf( x[i], d1[i], d2[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', d1:'+d1[i]+', d2: '+d2[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 400.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. d1: '+d1[i]+'. d2: '+d2[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the cdf for `x` given large scale parameter `d2`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var d1;
	var d2;
	var x;
	var y;
	var i;

	expected = largeD2.expected;
	x = largeD2.x;
	d1 = largeD2.d1;
	d2 = largeD2.d2;
	for ( i = 0; i < x.length; i++ ) {
		y = cdf( x[i], d1[i], d2[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', d1:'+d1[i]+', d2: '+d2[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 200.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. d1: '+d1[i]+'. d2: '+d2[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/f/cdf/test/test.cdf.js")
},{"./../lib":69,"./fixtures/julia/both_large.json":70,"./fixtures/julia/large_d1.json":71,"./fixtures/julia/large_d2.json":72,"@stdlib/constants/math/float64-eps":28,"@stdlib/constants/math/float64-ninf":43,"@stdlib/constants/math/float64-pinf":45,"@stdlib/math/base/assert/is-nan":59,"@stdlib/math/base/special/abs":77,"tape":350}],74:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var EPS = require( '@stdlib/constants/math/float64-eps' );
var factory = require( './../lib/factory.js' );


// FIXTURES //

var largeD1 = require( './fixtures/julia/large_d1.json' );
var largeD2 = require( './fixtures/julia/large_d2.json' );
var bothLarge = require( './fixtures/julia/both_large.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof factory, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a function', function test( t ) {
	var cdf = factory( 0.0, 1.0 );
	t.equal( typeof cdf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 1.0, 1.0 );
	y = cdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, 1.0 );
	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( 1.0, NaN );
	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, NaN );
	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, NaN );
	y = cdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a finite `d1` and `d2`, the function returns a function which returns `1` when provided `+infinity` for `x`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.5, 1.0 );
	y = cdf( PINF );
	t.equal( y, 1.0, 'returns 1' );

	t.end();
});

tape( 'if provided a finite `d1` and `d2`, the function returns a function which returns `0` when provided `-infinity` for `x`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.5, 1.0 );
	y = cdf( NINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a nonpositive `d2`, the created function always returns `NaN`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.5, 0.0 );

	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( 0.5, -1.0 );

	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( 1.0, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( PINF, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a nonpositive `d1`, the created function always returns `NaN`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.0, 0.5 );

	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( -1.0, 0.5 );

	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NINF, 1.0 );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NINF, PINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NINF, NaN );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the cdf for `x` given large `d1` and `d2`', function test( t ) {
	var expected;
	var delta;
	var cdf;
	var tol;
	var d1;
	var d2;
	var i;
	var x;
	var y;

	expected = bothLarge.expected;
	x = bothLarge.x;
	d1 = bothLarge.d1;
	d2 = bothLarge.d2;
	for ( i = 0; i < x.length; i++ ) {
		cdf = factory( d1[i], d2[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', d1: '+d1[i]+', d2: '+d2[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 50.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. d1: '+d1[i]+'. d2: '+d2[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the cdf for `x` given large parameter `d1`', function test( t ) {
	var expected;
	var delta;
	var cdf;
	var tol;
	var d1;
	var d2;
	var i;
	var x;
	var y;

	expected = largeD1.expected;
	x = largeD1.x;
	d1 = largeD1.d1;
	d2 = largeD1.d2;
	for ( i = 0; i < x.length; i++ ) {
		cdf = factory( d1[i], d2[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', d1: '+d1[i]+', d2: '+d2[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 400.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. d1: '+d1[i]+'. d2: '+d2[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the cdf for `x` given large parameter `d2`', function test( t ) {
	var expected;
	var delta;
	var cdf;
	var tol;
	var d1;
	var d2;
	var i;
	var x;
	var y;

	expected = largeD2.expected;
	x = largeD2.x;
	d1 = largeD2.d1;
	d2 = largeD2.d2;
	for ( i = 0; i < x.length; i++ ) {
		cdf = factory( d1[i], d2[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', d1: '+d1[i]+', d2: '+d2[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 200.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. d1: '+d1[i]+'. d2: '+d2[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/f/cdf/test/test.factory.js")
},{"./../lib/factory.js":68,"./fixtures/julia/both_large.json":70,"./fixtures/julia/large_d1.json":71,"./fixtures/julia/large_d2.json":72,"@stdlib/constants/math/float64-eps":28,"@stdlib/constants/math/float64-ninf":43,"@stdlib/constants/math/float64-pinf":45,"@stdlib/math/base/assert/is-nan":59,"@stdlib/math/base/special/abs":77,"tape":350}],75:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var cdf = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof cdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `cdf` functions', function test( t ) {
	t.equal( typeof cdf.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/f/cdf/test/test.js")
},{"./../lib":69,"tape":350}],76:[function(require,module,exports){
'use strict';

/**
* Computes the absolute value of `x`.
*
* @param {number} x - input value
* @returns {number} absolute value
*
* @example
* var v = abs( -1.0 );
* // returns 1.0
*
* @example
* var v = abs( 2.0 );
* // returns 2.0
*
* @example
* var v = abs( 0.0 );
* // returns 0.0
*
* @example
* var v = abs( -0.0 );
* // returns 0.0
*
* @example
* var v = abs( NaN );
* // returns NaN
*/
function abs( x ) {
	if ( x < 0.0 ) {
		return -x;
	}
	if ( x === 0.0 ) {
		return 0.0; // handle negative zero
	}
	return x;
}


// EXPORTS //

module.exports = abs;

},{}],77:[function(require,module,exports){
'use strict';

/**
* Compute an absolute value.
*
* @module @stdlib/math/base/special/abs
*
* @example
* var abs = require( '@stdlib/math/base/special/abs' );
*
* var v = abs( -1.0 );
* // returns 1.0
*
* v = abs( 2.0 );
* // returns 2.0
*
* v = abs( 0.0 );
* // returns 0.0
*
* v = abs( -0.0 );
* // returns 0.0
*
* v = abs( NaN );
* // returns NaN
*/

// MODULES //

var abs = require( './abs.js' );


// EXPORTS //

module.exports = abs;

},{"./abs.js":76}],78:[function(require,module,exports){
'use strict';

/*
* The original C code, long comment, copyright, license, and constants are from [Cephes]{@link http://www.netlib.org/cephes}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* COPYRIGHT
*
* Cephes Math Library Release 2.8:  June, 2000
* Copyright 1984, 1987, 1989, 1992, 2000 by Stephen L. Moshier
*
*
* LICENSE
*
* The README [file]{@link http://netlib.sandia.gov/cephes/} reads:
*   > Some software in this archive may be from the book _Methods and Programs for Mathematical Functions_ (Prentice-Hall or Simon & Schuster International, 1989) or from the Cephes Mathematical Library, a commercial product. In either event, it is copyrighted by the author. What you see here may be used freely but it comes with no support or guarantee.
*   > The two known misprints in the book are repaired here in the source listings for the gamma function and the incomplete beta integral.
*   > Stephen L. Moshier
*   > moshier@na-net.ornl.gov
*/

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var PIO4 = require( '@stdlib/constants/math/float64-fourth-pi' );
var ratevalPQ = require( './rational_pq.js' );
var ratevalRS = require( './rational_rs.js' );


// VARIABLES //

var MOREBITS = 6.123233995736765886130e-17; // pi/2 = PIO2 + MOREBITS


// MAIN //

/**
* Computes the arcsine of a number.
*
* @param {number} x - input value
* @returns {number} arcsine (in radians)
*
* @example
* var v = asin( 0.0 );
* // returns ~0.0
*
* @example
* var v = asin( Math.PI/2.0 );
* // returns ~1.0
*
* @example
* var v = asin( -Math.PI/6.0 );
* // returns ~-0.5
*
* @example
* var v = asin( NaN );
* // returns NaN
*/
function asin( x ) {
	var sgn;
	var zz;
	var a;
	var p;
	var z;

	if ( isnan( x ) ) {
		return NaN;
	}
	if ( x > 0.0 ) {
		a = x;
	} else {
		sgn = true;
		a = -x;
	}
	if ( a > 1.0 ) {
		return NaN;
	}
	if ( a > 0.625 ) {
		// arcsin(1-x) = pi/2 - sqrt(2x)(1+R(x))
		zz = 1.0 - a;
		p = zz * ratevalRS( zz );
		zz = sqrt( zz + zz );
		z = PIO4 - zz;
		zz = ( zz*p ) - MOREBITS;
		z -= zz;
		z += PIO4;
	} else {
		if ( a < 1.0e-8 ) {
			return x;
		}
		zz = a * a;
		z = zz * ratevalPQ( zz );
		z = ( a*z ) + a;
	}
	return ( sgn ) ? -z : z;
}


// EXPORTS //

module.exports = asin;

},{"./rational_pq.js":80,"./rational_rs.js":81,"@stdlib/constants/math/float64-fourth-pi":31,"@stdlib/math/base/assert/is-nan":59,"@stdlib/math/base/special/sqrt":230}],79:[function(require,module,exports){
'use strict';

/**
* Compute the arcsine of a number.
*
* @module @stdlib/math/base/special/asin
*
* @example
* var PI = require( '@stdlib/constants/math/float64-pi' );
* var asin = require( '@stdlib/math/base/special/asin' );
*
* var v = asin( 0.0 );
* // returns 0.0
*
* v = asin( PI/2.0 );
* // returns ~1.0
*
* v = asin( -PI/6.0 );
* // returns ~-0.5
*
* v = asin( NaN );
* // returns NaN
*/

// MODULES //

var asin = require( './asin.js' );


// EXPORTS //

module.exports = asin;

},{"./asin.js":78}],80:[function(require,module,exports){
/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a rational function, i.e., the ratio of two polynomials described by the coefficients stored in \\(P\\) and \\(Q\\).
*
* ## Notes
*
* -   Coefficients should be sorted in ascending degree.
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the rational function
* @returns {number} evaluated rational function
*/
function evalrational( x ) {
	var ax;
	var s1;
	var s2;
	if ( x === 0.0 ) {
		return 0.16666666666666713;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = -8.198089802484825 + (x * (19.562619833175948 + (x * (-16.262479672107002 + (x * (5.444622390564711 + (x * (-0.6019598008014124 + (x * 0.004253011369004428))))))))); // eslint-disable-line max-len
		s2 = -49.18853881490881 + (x * (139.51056146574857 + (x * (-147.1791292232726 + (x * (70.49610280856842 + (x * (-14.740913729888538 + (x * 1.0))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = 0.004253011369004428 + (x * (-0.6019598008014124 + (x * (5.444622390564711 + (x * (-16.262479672107002 + (x * (19.562619833175948 + (x * -8.198089802484825))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (-14.740913729888538 + (x * (70.49610280856842 + (x * (-147.1791292232726 + (x * (139.51056146574857 + (x * -49.18853881490881))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

},{}],81:[function(require,module,exports){
/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a rational function, i.e., the ratio of two polynomials described by the coefficients stored in \\(P\\) and \\(Q\\).
*
* ## Notes
*
* -   Coefficients should be sorted in ascending degree.
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the rational function
* @returns {number} evaluated rational function
*/
function evalrational( x ) {
	var ax;
	var s1;
	var s2;
	if ( x === 0.0 ) {
		return 0.08333333333333809;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = 28.536655482610616 + (x * (-25.56901049652825 + (x * (6.968710824104713 + (x * (-0.5634242780008963 + (x * 0.002967721961301243))))))); // eslint-disable-line max-len
		s2 = 342.43986579130785 + (x * (-383.8770957603691 + (x * (147.0656354026815 + (x * (-21.947795316429207 + (x * 1.0))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = 0.002967721961301243 + (x * (-0.5634242780008963 + (x * (6.968710824104713 + (x * (-25.56901049652825 + (x * 28.536655482610616))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (-21.947795316429207 + (x * (147.0656354026815 + (x * (-383.8770957603691 + (x * 342.43986579130785))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

},{}],82:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{http://www.boost.org/doc/libs/1_64_0/boost/math/special_functions/beta.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var abs = require( '@stdlib/math/base/special/abs' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var E = require( '@stdlib/constants/math/float64-e' );
var EPSILON = require( '@stdlib/constants/math/float64-eps' );
var lanczosSumExpGScaled = require( './lanczos_sum_expg_scaled.js' ); // Lanczos approximation scaled by exp(G)


// VARIABLES //

var G = 10.90051099999999983936049829935654997826;


// MAIN //

/**
* Evaluate the beta function.
*
* @param {NonNegativeNumber} a - input value
* @param {NonNegativeNumber} b - input value
* @returns {number} evaluated beta function
*
* @example
* var v = beta( 0, 0 );
* // returns Infinity
*
* @example
* var v = beta( 1, 1 );
* // returns 1
*
* @example
* var v = beta( -1, 2 );
* // returns NaN
*
* @example
* var v = beta( 5, 0.2 );
* // returns ~3.382
*
* @example
* var v = beta( 4, 1 );
* // returns 0.25
*
* @example
* var v = beta( NaN, 2 );
* // returns NaN
*/
function beta( a, b ) {
	var ambh;
	var agh;
	var bgh;
	var cgh;
	var res;
	var tmp;
	var c;

	if ( isnan( a ) || isnan( b ) ) {
		return NaN;
	}
	if ( a < 0.0 || b < 0.0 ) {
		return NaN;
	}
	if ( b === 1.0 ) {
		return 1.0 / a;
	}
	if ( a === 1.0 ) {
		return 1.0 / b;
	}
	c = a + b;
	if ( c < EPSILON ) {
		res = c / a;
		res /= b;
		return res;
	}

	// Special cases:
	if ( c === a && b < EPSILON ) {
		return 1.0 / b;
	}
	if ( c === b && a < EPSILON ) {
		return 1.0 / a;
	}

	if ( a < b ) {
		// Swap `a` and `b`:
		tmp = b;
		b = a;
		a = tmp;
	}

	// Lanczos calculation:
	agh = a + G - 0.5;
	bgh = b + G - 0.5;
	cgh = c + G - 0.5;
	res = lanczosSumExpGScaled( a ) * ( lanczosSumExpGScaled( b )/lanczosSumExpGScaled( c ) ); // eslint-disable-line max-len
	ambh = a - 0.5 - b;
	if ( ( abs( b*ambh ) < ( cgh*100.0 ) ) && a > 100.0 ) {
		// Special case where the base of the power term is close to 1; compute `(1+x)^y` instead:
		res *= exp( ambh * log1p( -b/cgh ) );
	} else {
		res *= pow( agh/cgh, ambh );
	}
	if ( cgh > 1.0e10 ) {
		// This avoids possible overflow, but appears to be marginally less accurate:
		res *= pow( (agh/cgh)*(bgh/cgh), b );
	} else {
		res *= pow( (agh*bgh)/(cgh*cgh), b );
	}
	res *= sqrt( E/bgh);
	return res;
}


// EXPORTS //

module.exports = beta;

},{"./lanczos_sum_expg_scaled.js":84,"@stdlib/constants/math/float64-e":27,"@stdlib/constants/math/float64-eps":28,"@stdlib/math/base/assert/is-nan":59,"@stdlib/math/base/special/abs":77,"@stdlib/math/base/special/exp":107,"@stdlib/math/base/special/log1p":196,"@stdlib/math/base/special/pow":207,"@stdlib/math/base/special/sqrt":230}],83:[function(require,module,exports){
'use strict';

/**
* Evaluate the beta function.
*
* @module @stdlib/math/base/special/beta
*
* @example
* var beta = require( '@stdlib/math/base/special/beta' );
*
* var v = beta( 0.0, 0.0 );
* // returns Infinity
*
* v = beta( 1.0, 1.0 );
* // returns 1.0
*
* v = beta( -1.0, 2.0 );
* // returns NaN
*
* v = beta( 5.0, 0.2 );
* // returns ~3.382
*
* v = beta( 4.0, 1.0 );
* // returns 0.25
*
* v = beta( NaN, 2.0 );
* // returns NaN
*/

// MODULES //

var beta = require( './beta.js' );


// EXPORTS //

module.exports = beta;

},{"./beta.js":82}],84:[function(require,module,exports){
/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a rational function, i.e., the ratio of two polynomials described by the coefficients stored in \\(P\\) and \\(Q\\).
*
* ## Notes
*
* -   Coefficients should be sorted in ascending degree.
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the rational function
* @returns {number} evaluated rational function
*/
function evalrational( x ) {
	var ax;
	var s1;
	var s2;
	if ( x === 0.0 ) {
		return Infinity;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = 709811.662581658 + (x * (679979.8474157227 + (x * (293136.7857211597 + (x * (74887.54032914672 + (x * (12555.290582413863 + (x * (1443.4299244417066 + (x * (115.24194596137347 + (x * (6.309239205732627 + (x * (0.22668404630224365 + (x * (0.004826466289237662 + (x * 0.00004624429436045379))))))))))))))))))); // eslint-disable-line max-len
		s2 = 0.0 + (x * (362880.0 + (x * (1026576.0 + (x * (1172700.0 + (x * (723680.0 + (x * (269325.0 + (x * (63273.0 + (x * (9450.0 + (x * (870.0 + (x * (45.0 + (x * 1.0))))))))))))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = 0.00004624429436045379 + (x * (0.004826466289237662 + (x * (0.22668404630224365 + (x * (6.309239205732627 + (x * (115.24194596137347 + (x * (1443.4299244417066 + (x * (12555.290582413863 + (x * (74887.54032914672 + (x * (293136.7857211597 + (x * (679979.8474157227 + (x * 709811.662581658))))))))))))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (45.0 + (x * (870.0 + (x * (9450.0 + (x * (63273.0 + (x * (269325.0 + (x * (723680.0 + (x * (1172700.0 + (x * (1026576.0 + (x * (362880.0 + (x * 0.0))))))))))))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

},{}],85:[function(require,module,exports){
'use strict';

// MODULES //

var kernelBetainc = require( '@stdlib/math/base/special/kernel-betainc' );


// VARIABLES //

var out = new Array( 2 );


// MAIN //

/**
* Evaluates the incomplete beta function.
*
* @param {Probability} x - function parameter
* @param {NonNegativeNumber} a - function parameter
* @param {NonNegativeNumber} b - function parameter
* @param {boolean} [regularized=true] - boolean indicating if the function should evaluate the regularized or non-regularized incomplete beta function
* @param {boolean} [upper=false] - boolean indicating if the function should return the upper tail of the incomplete beta function
* @returns {number} function value
*
* @example
* var y = betainc( 0.5, 2.0, 2.0 );
* // returns 0.5
*
* @example
* var y = betainc( 0.5, 2.0, 2.0, false );
* // returns ~0.083
*
* @example
* var y = betainc( 0.2, 1.0, 2.0 );
* // returns 0.36
*/
function betainc( x, a, b, regularized, upper ) {
	/* eslint-disable no-unneeded-ternary */
	regularized = ( regularized === false ) ? false : true;
	upper = ( upper === true ) ? true : false;
	out = kernelBetainc( out, x, a, b, upper, regularized );
	return out[ 0 ];
}


// EXPORTS //

module.exports = betainc;

},{"@stdlib/math/base/special/kernel-betainc":179}],86:[function(require,module,exports){
'use strict';

/**
* Evaluate the incomplete beta function.
*
* @module @stdlib/math/base/special/betainc
*
* @example
* var betainc = require( '@stdlib/math/base/special/betainc' );
*
* var y = betainc( 0.5, 2.0, 2.0 );
* // returns 0.5
*
* y = betainc( 0.5, 2.0, 2.0, false );
* // returns ~0.083
*
* y = betainc( 0.2, 1.0, 2.0 );
* // returns 0.36
*
* y = betainc( 0.2, 1.0, 2.0, true, true );
* // returns 0.64
*/

// MODULES //

var betainc = require( './betainc.js' );


// EXPORTS //

module.exports = betainc;

},{"./betainc.js":85}],87:[function(require,module,exports){
'use strict';

// MODULES //

var isInteger = require( '@stdlib/math/base/assert/is-integer' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isOdd = require( '@stdlib/math/base/assert/is-odd' );
var round = require( '@stdlib/math/base/special/round' );


// MAIN //

/**
* Computes the binomial coefficient of two integers.
*
* ## Method
*
* -   Instead of evaluating the factorial form, which is inefficient and prone to overflow for large inputs arguments, this module computes the following multiplicative representation of the binomial coefficient for integer arguments
*
*     ```tex
*     \binom nk = \prod_{i=1}^k \frac{n+1-i}{i}
*     ```
*
* @param {integer} n - input value
* @param {integer} k - second input value
* @returns {number} function value
*
* @example
* var v = binomcoef( 8, 2 );
* // returns 28
*
* @example
* var v = binomcoef( 0, 0 );
* // returns 1
*
* @example
* var v = binomcoef( -4, 2 );
* // returns 10
*
* @example
* var v = binomcoef( NaN, 3 );
* // returns NaN
*
* @example
* var v = binomcoef( 5, NaN );
* // returns NaN
*
* @example
* var v = binomcoef( NaN, NaN );
* // returns NaN
*/
function binomcoef( n, k ) {
	var res;
	var j;
	if ( isnan( n ) || isnan( k ) ) {
		return NaN;
	}
	if ( !isInteger( n ) || !isInteger( k ) ) {
		return NaN;
	}
	if ( k < 0 ) {
		return 0;
	}
	if ( n < 0 ) {
		res = binomcoef( -n + k - 1, k );
		if ( isOdd( k ) ) {
			res = -res;
		}
		return res;
	}
	if ( k > n ) {
		return 0;
	}
	if ( k === 0 || k === n ) {
		return 1;
	}
	if ( k === 1 || k === n - 1 ) {
		return n;
	}
	if ( n - k < k ) {
		k = n - k;
	}
	// Use recursive definition...
	res = n;
	for ( j = 2; j <= k; j++ ) {
		res *= ( n - j + 1 ) / j;
	}
	// Correct for rounding errors...
	return isInteger( res ) ? res : round( res );
}


// EXPORTS //

module.exports = binomcoef;

},{"@stdlib/math/base/assert/is-integer":57,"@stdlib/math/base/assert/is-nan":59,"@stdlib/math/base/assert/is-odd":63,"@stdlib/math/base/special/round":224}],88:[function(require,module,exports){
'use strict';

/**
* Compute the binomial coefficient.
*
* @module @stdlib/math/base/special/binomcoef
*
* @example
* var binomcoef = require( '@stdlib/math/base/special/binomcoef' );
*
* var v = binomcoef( 8, 2 );
* // returns 28
*
* v = binomcoef( 0, 0 );
* // returns 1
*
* v = binomcoef( -4, 2 );
* // returns 10
*
* v = binomcoef( 5, 3 );
* // returns 10
*
* v = binomcoef( NaN, 3 );
* // returns NaN
*
* v = binomcoef( 5, NaN );
* // returns NaN
*
* v = binomcoef( NaN, NaN );
* // returns NaN
*/

// MODULES //

var binomcoef = require( './binomcoef.js' );


// EXPORTS //

module.exports = binomcoef;

},{"./binomcoef.js":87}],89:[function(require,module,exports){
'use strict';

// TODO: implementation (?)

/**
* Rounds a numeric value toward positive infinity.
*
* @param {number} x - input value
* @returns {number} rounded value
*
* @example
* var v = ceil( -4.2 );
* // returns -4.0
*
* @example
* var v = ceil( 9.99999 );
* // returns 10.0
*
* @example
* var v = ceil( 0.0 );
* // returns 0.0
*
* @example
* var v = ceil( NaN );
* // returns NaN
*/
var ceil = Math.ceil;


// EXPORTS //

module.exports = ceil;

},{}],90:[function(require,module,exports){
'use strict';

/**
* Round a numeric value toward positive infinity.
*
* @module @stdlib/math/base/special/ceil
*
* @example
* var ceil = require( '@stdlib/math/base/special/ceil' );
*
* var v = ceil( -4.2 );
* // returns -4.0
*
* v = ceil( 9.99999 );
* // returns 10.0
*
* v = ceil( 0.0 );
* // returns 0.0
*
* v = ceil( NaN );
* // returns NaN
*/

// MODULES //

var ceil = require( './ceil.js' );


// EXPORTS //

module.exports = ceil;

},{"./ceil.js":89}],91:[function(require,module,exports){
'use strict';

// MODULES //

var toWords = require( '@stdlib/number/float64/base/to-words' );
var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var fromWords = require( '@stdlib/number/float64/base/from-words' );


// VARIABLES //

// 10000000000000000000000000000000 => 2147483648 => 0x80000000
var SIGN_MASK = 0x80000000>>>0; // asm type annotation

// 01111111111111111111111111111111 => 2147483647 => 0x7fffffff
var MAGNITUDE_MASK = 0x7fffffff|0; // asm type annotation

// High/low words workspace:
var WORDS = [ 0, 0 ]; // WARNING: not thread safe


// MAIN //

/**
* Returns a double-precision floating-point number with the magnitude of `x` and the sign of `y`.
*
* @param {number} x - number from which to derive a magnitude
* @param {number} y - number from which to derive a sign
* @returns {number} a double-precision floating-point number
*
* @example
* var z = copysign( -3.14, 10.0 );
* // returns 3.14
*
* @example
* var z = copysign( 3.14, -1.0 );
* // returns -3.14
*
* @example
* var z = copysign( 1.0, -0.0 );
* // returns -1.0
*
* @example
* var z = copysign( -3.14, -0.0 );
* // returns -3.14
*
* @example
* var z = copysign( -0.0, 1.0 );
* // returns 0.0
*/
function copysign( x, y ) {
	var hx;
	var hy;

	// Split `x` into higher and lower order words:
	toWords( WORDS, x );
	hx = WORDS[ 0 ];

	// Turn off the sign bit of `x`:
	hx &= MAGNITUDE_MASK;

	// Extract the higher order word from `y`:
	hy = getHighWord( y );

	// Leave only the sign bit of `y` turned on:
	hy &= SIGN_MASK;

	// Copy the sign bit of `y` to `x`:
	hx |= hy;

	// Return a new value having the same magnitude as `x`, but with the sign of `y`:
	return fromWords( hx, WORDS[ 1 ] );
}


// EXPORTS //

module.exports = copysign;

},{"@stdlib/number/float64/base/from-words":244,"@stdlib/number/float64/base/get-high-word":248,"@stdlib/number/float64/base/to-words":262}],92:[function(require,module,exports){
'use strict';

/**
* Return a double-precision floating-point number with the magnitude of `x` and the sign of `y`.
*
* @module @stdlib/math/base/special/copysign
*
* @example
* var copysign = require( '@stdlib/math/base/special/copysign' );
*
* var z = copysign( -3.14, 10.0 );
* // returns 3.14
*
* z = copysign( 3.14, -1.0 );
* // returns -3.14
*
* z = copysign( 1.0, -0.0 );
* // returns -1.0
*
* z = copysign( -3.14, -0.0 );
* // returns -3.14
*
* z = copysign( -0.0, 1.0 );
* // returns 0.0
*/

// MODULES //

var copysign = require( './copysign.js' );


// EXPORTS //

module.exports = copysign;

},{"./copysign.js":91}],93:[function(require,module,exports){
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_cos.c?view=log}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* ====================================================
* Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunPro, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*/

// MODULES //

var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var kernelCos = require( '@stdlib/math/base/special/kernel-cos' );
var kernelSin = require( '@stdlib/math/base/special/kernel-sin' );
var rempio2 = require( '@stdlib/math/base/special/rempio2' );


// VARIABLES //

// Scratch array for storing temporary values. Note that, in C, this would not be thread safe.
var buffer = new Array( 2 );

// High word absolute value mask: 0x7fffffff => 01111111111111111111111111111111
var HIGH_WORD_ABS_MASK = 0x7fffffff|0; // asm type annotation

// High word of π/4: 0x3fe921fb => 00111111111010010010000111111011
var HIGH_WORD_PIO4 = 0x3fe921fb|0; // asm type annotation

// High word of 2^-27: 0x3e400000 => 00111110010000000000000000000000
var HIGH_WORD_TWO_NEG_27 = 0x3e400000|0; // asm type annotation

// High word exponent mask: 0x7ff00000 => 01111111111100000000000000000000
var HIGH_WORD_EXPONENT_MASK = 0x7ff00000|0; // asm type annotation


// MAIN //

/**
* Computes the cosine of a number.
*
* @param {number} x - input value (in radians)
* @returns {number} cosine
*
* @example
* var v = cos( 0.0 );
* // returns 1.0
*
* @example
* var v = cos( Math.PI/4.0 );
* // returns ~0.707
*
* @example
* var v = cos( -Math.PI/6.0 );
* // returns ~0.866
*
* @example
* var v = cos( NaN );
* // returns NaN
*/
function cos( x ) {
	var ix;
	var n;

	ix = getHighWord( x );
	ix &= HIGH_WORD_ABS_MASK;

	// Case: |x| ~< pi/4
	if ( ix <= HIGH_WORD_PIO4 ) {
		// Case: x < 2**-27
		if ( ix < HIGH_WORD_TWO_NEG_27 ) {
			return 1.0;
		}
		return kernelCos( x, 0.0 );
	}
	// Case: cos(Inf or NaN) is NaN */
	if ( ix >= HIGH_WORD_EXPONENT_MASK ) {
		return NaN;
	}
	// Case: Argument reduction needed...
	n = rempio2( x, buffer );
	switch ( n & 3 ) {
	case 0:
		return kernelCos( buffer[ 0 ], buffer[ 1 ] );
	case 1:
		return -kernelSin( buffer[ 0 ], buffer[ 1 ] );
	case 2:
		return -kernelCos( buffer[ 0 ], buffer[ 1 ] );
	default:
		return kernelSin( buffer[ 0 ], buffer[ 1 ] );
	}
}


// EXPORTS //

module.exports = cos;

},{"@stdlib/math/base/special/kernel-cos":184,"@stdlib/math/base/special/kernel-sin":188,"@stdlib/math/base/special/rempio2":220,"@stdlib/number/float64/base/get-high-word":248}],94:[function(require,module,exports){
'use strict';

/**
* Compute the cosine of a number.
*
* @module @stdlib/math/base/special/cos
*
* @example
* var cos = require( '@stdlib/math/base/special/cos' );
*
* var v = cos( 0.0 );
* // returns 1.0
*
* v = cos( Math.PI/4.0 );
* // returns ~0.707
*
* v = cos( -Math.PI/6.0 );
* // returns ~0.866
*/

// MODULES //

var cos = require( './cos.js' );


// EXPORTS //

module.exports = cos;

},{"./cos.js":93}],95:[function(require,module,exports){
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_erf.c?revision=268523&view=co}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* ====================================================
* Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunPro, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*/

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var exp = require( '@stdlib/math/base/special/exp' );
var setLowWord = require( '@stdlib/number/float64/base/set-low-word' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var polyvalPP = require( './polyval_pp.js' );
var polyvalQQ = require( './polyval_qq.js' );
var polyvalPA = require( './polyval_pa.js' );
var polyvalQA = require( './polyval_qa.js' );
var polyvalRA = require( './polyval_ra.js' );
var polyvalSA = require( './polyval_sa.js' );
var polyvalRB = require( './polyval_rb.js' );
var polyvalSB = require( './polyval_sb.js' );


// VARIABLES //

var TINY = 1.0e-300;

// 2**-56 = 1/(2**56) = 1/72057594037927940
var SMALL = 1.3877787807814457e-17;

var ERX = 8.45062911510467529297e-1;  // 0x3FEB0AC1, 0x60000000

var PPC = 1.28379167095512558561e-1;  // 0x3FC06EBA, 0x8214DB68
var QQC = 1.0;

var PAC = -2.36211856075265944077e-3; // 0xBF6359B8, 0xBEF77538
var QAC = 1.0;

var RAC = -9.86494403484714822705e-3; // 0xBF843412, 0x600D6435
var SAC = 1.0;

var RBC = -9.86494292470009928597e-3; // 0xBF843412, 0x39E86F4A
var SBC = 1.0;


// MAIN //

/**
* Evaluates the complementary error function.
*
* ```tex
* \operatorname{erf}(x) = \frac{2}{\sqrt{\pi}} \int^{x}_{0} e^{-t^2}\ \mathrm{dt}
* ```
*
* Note that
*
* ```tex
* \begin{align*}
* \operatorname{erfc}(x) &= 1 - \operatorname{erf}(x) \\
* \operatorname{erf}(-x) &= -\operatorname{erf}(x) \\
* \operatorname{erfc}(-x) &= 2 - \operatorname{erfc}(x)
* \end{align*}
* ```
*
* ## Method
*
* 1.  For \\(|x| \in [0, 0.84375)\\),
*
*     ```tex
*     \operatorname{erf}(x) = x + x \cdot \operatorname{R}(x^2)
*     ```
*
*     and
*
*     ```tex
*     \operatorname{erfc}(x) = \begin{cases}
*     1 - \operatorname{erf}(x) & \textrm{if}\ x \in (-.84375,0.25) \\
*     0.5 + ((0.5-x)-x \mathrm{R}) & \textrm{if}\ x \in [0.25,0.84375)
*     \end{cases}
*     ```
*
*     where \\(R = P/Q\\) and where \\(P\\) is an odd polynomial of degree \\(8\\) and \\(Q\\) is an odd polynomial of degree \\(10\\).
*
*     ```tex
*     \biggl| \mathrm{R} - \frac{\operatorname{erf}(x)-x}{x} \biggr| \leq 2^{-57.90}
*     ```
*
*     <!-- <note> -->
*
*     The formula is derived by noting
*
*     ```tex
*     \operatorname{erf}(x) = \frac{2}{\sqrt{\pi}}\biggl(x - \frac{x^3}{3} + \frac{x^5}{10} - \frac{x^7}{42} + \ldots \biggr)
*     ```
*
*     and that
*
*     ```tex
*     \frac{2}{\sqrt{\pi}} = 1.128379167095512573896158903121545171688
*     ```
*
*     is close to unity. The interval is chosen because the fix point of \\(\operatorname{erf}(x)\\) is near \\(0.6174\\) (i.e., \\(\operatorname{erf(x)} = x\\) when \\(x\\) is near \\(0.6174\\)), and, by some experiment, \\(0.84375\\) is chosen to guarantee the error is less than one ulp for \\(\operatorname{erf}(x)\\).
*
*     <!-- </note> -->
*
* 2.  For \\(|x| \in [0.84375,1.25)\\), let \\(s = |x|-1\\), and \\(c = 0.84506291151\\) rounded to single (\\(24\\) bits)
*
*     ```tex
*     \operatorname{erf}(x) = \operatorname{sign}(x) \cdot \biggl(c + \frac{\operatorname{P1}(s)}{\operatorname{Q1}(s)}\biggr)
*     ```
*
*     and
*
*     ```tex
*     \operatorname{erfc}(x) = \begin{cases}
*     (1-c) - \frac{\operatorname{P1}(s)}{\operatorname{Q1}(s)} & \textrm{if}\ x > 0 \\
*     1 + \biggl(c + \frac{\operatorname{P1}(s)}{\operatorname{Q1}(s)}\biggr) & \textrm{if}\ x < 0
*     \end{cases}
*     ```
*
*     where
*
*     ```tex
*     \biggl|\frac{\mathrm{P1}}{\mathrm{Q1}} - (\operatorname{erf}(|x|)-c)\biggr| \leq 2^{-59.06}
*     ```
*
*     <!-- <note> -->
*
*     Here, we use the Taylor series expansion at \\(x = 1\\)
*
*     ```tex
*     \begin{align*}
*     \operatorname{erf}(1+s) &= \operatorname{erf}(1) + s\cdot \operatorname{poly}(s) \\
*     &= 0.845.. + \frac{\operatorname{P1}(s)}{\operatorname{Q1}(s)}
*     \end{align*}
*     ```
*
*     using a rational approximation to approximate
*
*     ```tex
*     \operatorname{erf}(1+s) - (c = (\mathrm{single})0.84506291151)
*     ```
*
*     <!-- </note> -->
*
*     Note that, for \\(x \in [0.84375,1.25)\\), \\(|\mathrm{P1}/\mathrm{Q1}| < 0.078\\), where
*
*     -   \\(\operatorname{P1}(s)\\) is a degree \\(6\\) polynomial in \\(s\\)
*     -   \\(\operatorname{Q1}(s)\\) is a degree \\(6\\) polynomial in \\(s\\)
*
* 3.  For \\(x \in [1.25,1/0.35)\\),
*
*     ```tex
*     \begin{align*}
*     \operatorname{erfc}(x) &= \frac{1}{x}e^{-x^2-0.5625+(\mathrm{R1}/\mathrm{S1})} \\
*     \operatorname{erf}(x) &= 1 - \operatorname{erfc}(x)
*     \end{align*}
*     ```
*
*     where
*
*     -   \\(\operatorname{R1}(z)\\) is a degree \\(7\\) polynomial in \\(z\\), where \\(z = 1/x^2\\)
*     -   \\(\operatorname{S1}(z)\\) is a degree \\(8\\) polynomial in \\(z\\)
*
* 4.  For \\(x \in [1/0.35,28)\\),
*
*     ```tex
*     \operatorname{erfc}(x) = \begin{cases}
*     \frac{1}{x} e^{-x^2-0.5625+(\mathrm{R2}/\mathrm{S2})} & \textrm{if}\ x > 0 \\
*     2.0 - \frac{1}{x} e^{-x^2-0.5625+(\mathrm{R2}/\mathrm{S2})} & \textrm{if}\ -6 < x < 0 \\
*     2.0 - \mathrm{tiny} & \textrm{if}\ x \leq -6
*     \end{cases}
*     ```
*
*     and
*
*     ```tex
*     \operatorname{erf}(x) = \begin{cases}
*     \operatorname{sign}(x) \cdot (1.0 - \operatorname{erfc}(x)) & \textrm{if}\ x < 6 \\
*     \operatorname{sign}(x) \cdot (1.0 - \mathrm{tiny}) & \textrm{otherwise}
*     \end{cases}
*     ```
*
*     where
*
*     -   \\(\operatorname{R2}(z)\\) is a degree \\(6\\) polynomial in \\(z\\), where \\(z = 1/x^2\\)
*     -   \\(\operatorname{S2}(z)\\) is a degree \\(7\\) polynomial in \\(z\\)
*
* 5.  For \\(x \in [28, \infty)\\),
*
*     ```tex
*     \begin{align*}
*     \operatorname{erf}(x) &= \operatorname{sign}(x) \cdot (1 - \mathrm{tiny}) & \textrm{(raise inexact)}
*     \end{align*}
*     ```
*
*     and
*
*     ```tex
*     \operatorname{erfc}(x) = \begin{cases}
*     \mathrm{tiny} \cdot \mathrm{tiny} & \textrm{if}\ x > 0\ \textrm{(raise underflow)} \\
*     2 - \mathrm{tiny} & \textrm{if}\ x < 0
*     \end{cases}
*     ```
*
*
* ## Special Cases
*
* ```tex
* \begin{align*}
* \operatorname{erf}(0) &= 0 \\
* \operatorname{erf}(-0) &= -0 \\
* \operatorname{erf}(\infty) &= 1 \\
* \operatorname{erf}(-\infty) &= -1 \\
* \operatorname{erfc}(0) &= 1 \\
* \operatorname{erfc}(\infty) &= 0 \\
* \operatorname{erfc}(-\infty) &= 2 \\
* \operatorname{erf}(\mathrm{NaN}) &= \mathrm{NaN} \\
* \operatorname{erfc}(\mathrm{NaN}) &= \mathrm{NaN}
* \end{align*}
* ```
*
*
* ## Notes
*
* -   To compute \\(\exp(-x^2-0.5625+(\mathrm{R}/\mathrm{S}))\\), let \\(s\\) be a single precision number and \\(s := x\\); then
*
*     ```tex
*     -x^2 = -s^2 + (s-x)(s+x)
*     ```
*
*     and
*
*     ```tex
*     e^{-x^2-0.5626+(\mathrm{R}/\mathrm{S})} = e^{-s^2-0.5625} e^{(s-x)(s+x)+(\mathrm{R}/\mathrm{S})}
*     ```
*
* -   `#4` and `#5` make use of the asymptotic series
*
*     ```tex
*     \operatorname{erfc}(x) \approx \frac{e^{-x^2}}{x\sqrt{\pi}} (1 + \operatorname{poly}(1/x^2))
*     ```
*
*     We use a rational approximation to approximate
*
*     ```tex
*     g(s) = f(1/x^2) = \ln(\operatorname{erfc}(x) \cdot x) - x^2 + 0.5625
*     ```
*
* -   The error bound for \\(\mathrm{R1}/\mathrm{S1}\\) is
*
*     ```tex
*     |\mathrm{R1}/\mathrm{S1} - f(x)| < 2^{-62.57}
*     ```
*
*     and for \\(\mathrm{R2}/\mathrm{S2}\\) is
*
*     ```tex
*     |\mathrm{R2}/\mathrm{S2} - f(x)| < 2^{-61.52}
*     ```
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var y = erfc( 2.0 );
* // returns ~0.0047
*
* @example
* var y = erfc( -1.0 );
* // returns ~-1.8427
*
* @example
* var y = erfc( 0.0 );
* // returns 1.0
*
* @example
* var y = erfc( Infinity );
* // returns 0.0
*
* @example
* var y = erfc( -Infinity );
* // returns 2.0
*
* @example
* var y = erfc( NaN );
* // returns NaN
*/
function erfc( x ) {
	var sign;
	var ax;
	var z;
	var r;
	var s;
	var y;
	var p;
	var q;

	// Special case: NaN
	if ( isnan( x ) ) {
		return NaN;
	}
	// Special case: +infinity
	if ( x === PINF ) {
		return 0.0;
	}
	// Special case: -infinity
	if ( x === NINF ) {
		return 2.0;
	}
	// Special case: +-0
	if ( x === 0.0 ) {
		return 1.0;
	}
	if ( x < 0.0 ) {
		sign = true;
		ax = -x;
	} else {
		sign = false;
		ax = x;
	}
	// |x| < 0.84375
	if ( ax < 0.84375 ) {
		if ( ax < SMALL ) {
			return 1.0 - x; // raise inexact
		}
		z = x * x;
		r = PPC + ( z*polyvalPP( z ) );
		s = QQC + ( z*polyvalQQ( z ) );
		y = r / s;

		// x < 1/4
		if ( x < 0.25 ) {
			return 1.0 - ( x + (x*y) );
		}
		r = x * y;
		r += x - 0.5;
		return 0.5 - r;
	}
	// 0.84375 <= |x| < 1.25
	if ( ax < 1.25 ) {
		s = ax - 1.0;
		p = PAC + ( s*polyvalPA( s ) );
		q = QAC + ( s*polyvalQA( s ) );
		if ( sign ) {
			return 1.0 + ERX + (p/q);
		}
		return 1.0 - ERX - (p/q);
	}
	// |x| < 28
	if ( ax < 28.0 ) {
		s = 1.0 / (ax*ax);

		// |x| < 1/0.35 ~ 2.857143
		if ( ax < 2.857142857142857 ) {
			r = RAC + ( s*polyvalRA( s ) );
			s = SAC + ( s*polyvalSA( s ) );
		}
		// |x| >= 1/0.35 ~ 2.857143
		else {
			// x < -6
			if ( x < -6.0 ) {
				return 2.0 - TINY; // raise inexact
			}
			r = RBC + ( s*polyvalRB( s ) );
			s = SBC + ( s*polyvalSB( s ) );
		}
		z = setLowWord( ax, 0 ); // pseudo-single (20-bit) precision x
		r = exp( -(z*z) - 0.5625 ) * exp( ((z-ax)*(z+ax)) + (r/s) );
		if ( sign ) {
			return 2.0 - (r/ax);
		}
		return r/ax;
	}
	if ( sign ) {
		return 2.0 - TINY; // raise inexact; ~2
	}
	return TINY * TINY; // raise inexact; ~0
}


// EXPORTS //

module.exports = erfc;

},{"./polyval_pa.js":97,"./polyval_pp.js":98,"./polyval_qa.js":99,"./polyval_qq.js":100,"./polyval_ra.js":101,"./polyval_rb.js":102,"./polyval_sa.js":103,"./polyval_sb.js":104,"@stdlib/constants/math/float64-ninf":43,"@stdlib/constants/math/float64-pinf":45,"@stdlib/math/base/assert/is-nan":59,"@stdlib/math/base/special/exp":107,"@stdlib/number/float64/base/set-low-word":259}],96:[function(require,module,exports){
'use strict';

/**
* Evaluate the complementary error function.
*
* @module @stdlib/math/base/special/erfc
*
* @example
* var erfc = require( '@stdlib/math/base/special/erfc' );
*
* var y = erfc( 2.0 );
* // returns ~0.0047
*
* y = erfc( -1.0 );
* // returns ~-1.8427
*
* y = erfc( 0.0 );
* // returns 1.0
*
* y = erfc( Infinity );
* // returns 0.0
*
* y = erfc( -Infinity );
* // returns 2.0
*
* y = erfc( NaN );
* // returns NaN
*/

// MODULES //

var erfc = require( './erfc.js' );


// EXPORTS //

module.exports = erfc;

},{"./erfc.js":95}],97:[function(require,module,exports){
/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* ## Notes
*
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*/
function evalpoly( x ) {
	if ( x === 0.0 ) {
		return 0.41485611868374833;
	}
	return 0.41485611868374833 + (x * (-0.3722078760357013 + (x * (0.31834661990116175 + (x * (-0.11089469428239668 + (x * (0.035478304325618236 + (x * -0.002166375594868791))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],98:[function(require,module,exports){
/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* ## Notes
*
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*/
function evalpoly( x ) {
	if ( x === 0.0 ) {
		return -0.3250421072470015;
	}
	return -0.3250421072470015 + (x * (-0.02848174957559851 + (x * (-0.005770270296489442 + (x * -0.000023763016656650163))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],99:[function(require,module,exports){
/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* ## Notes
*
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*/
function evalpoly( x ) {
	if ( x === 0.0 ) {
		return 0.10642088040084423;
	}
	return 0.10642088040084423 + (x * (0.540397917702171 + (x * (0.07182865441419627 + (x * (0.12617121980876164 + (x * (0.01363708391202905 + (x * 0.011984499846799107))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],100:[function(require,module,exports){
/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* ## Notes
*
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*/
function evalpoly( x ) {
	if ( x === 0.0 ) {
		return 0.39791722395915535;
	}
	return 0.39791722395915535 + (x * (0.0650222499887673 + (x * (0.005081306281875766 + (x * (0.00013249473800432164 + (x * -0.000003960228278775368))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],101:[function(require,module,exports){
/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* ## Notes
*
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*/
function evalpoly( x ) {
	if ( x === 0.0 ) {
		return -0.6938585727071818;
	}
	return -0.6938585727071818 + (x * (-10.558626225323291 + (x * (-62.375332450326006 + (x * (-162.39666946257347 + (x * (-184.60509290671104 + (x * (-81.2874355063066 + (x * -9.814329344169145))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],102:[function(require,module,exports){
/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* ## Notes
*
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*/
function evalpoly( x ) {
	if ( x === 0.0 ) {
		return -0.799283237680523;
	}
	return -0.799283237680523 + (x * (-17.757954917754752 + (x * (-160.63638485582192 + (x * (-637.5664433683896 + (x * (-1025.0951316110772 + (x * -483.5191916086514))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],103:[function(require,module,exports){
/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* ## Notes
*
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*/
function evalpoly( x ) {
	if ( x === 0.0 ) {
		return 19.651271667439257;
	}
	return 19.651271667439257 + (x * (137.65775414351904 + (x * (434.56587747522923 + (x * (645.3872717332679 + (x * (429.00814002756783 + (x * (108.63500554177944 + (x * (6.570249770319282 + (x * -0.0604244152148581))))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],104:[function(require,module,exports){
/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* ## Notes
*
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*/
function evalpoly( x ) {
	if ( x === 0.0 ) {
		return 30.33806074348246;
	}
	return 30.33806074348246 + (x * (325.7925129965739 + (x * (1536.729586084437 + (x * (3199.8582195085955 + (x * (2553.0504064331644 + (x * (474.52854120695537 + (x * -22.44095244658582))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],105:[function(require,module,exports){
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_exp.c?view=markup}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* ====================================================
* Copyright (C) 2004 by Sun Microsystems, Inc. All rights reserved.
*
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*/

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var trunc = require( '@stdlib/math/base/special/trunc' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var expmulti = require( './expmulti.js' );


// VARIABLES //

var LN2_HI = 6.93147180369123816490e-01;
var LN2_LO = 1.90821492927058770002e-10;
var LOG2_E = 1.44269504088896338700e+00;
var OVERFLOW = 7.09782712893383973096e+02;
var UNDERFLOW = -7.45133219101941108420e+02;
var NEARZERO = 1.0 / (1 << 28); // 2^-28;
var NEG_NEARZERO = -NEARZERO;


// MAIN //

/**
* Evaluates the natural exponential function.
*
* ## Method
*
* 1.  We reduce \\( x \\) to an \\( r \\) so that \\( |r| \leq 0.5 \cdot \ln(2) \approx 0.34658 \\). Given \\( x \\), we find an \\( r \\) and integer \\( k \\) such that
*
*    ```tex
*    \begin{align*}
*    x &= k \cdot \ln(2) + r \\
*    |r| &\leq 0.5 \cdot \ln(2)
*    \end{align*}
*    ```
*
*    <!-- <note> -->
*
*    \\( r \\) can be represented as \\( r = \mathrm{hi} - \mathrm{lo} \\) for better accuracy.
*
*    <!-- </note> -->
*
* 2.  We approximate of \\( e^{r} \\) by a special rational function on the interval \\([0,0.34658]\\):
*
*    ```tex
*    \begin{align*}
*    R\left(r^2\right) &= r \cdot \frac{ e^{r}+1 }{ e^{r}-1 } \\
*    &= 2 + \frac{r^2}{6} - \frac{r^4}{360} + \ldots
*    \end{align*}
*    ```
*
*    We use a special Remes algorithm on \\([0,0.34658]\\) to generate a polynomial of degree \\(5\\) to approximate \\(R\\). The maximum error of this polynomial approximation is bounded by \\(2^{-59}\\). In other words,
*
*    ```tex
*    R(z) \sim 2 + P_1 z + P_2 z^2 + P_3 z^3 + P_4 z^4 + P_5 z^5
*    ```
*
*    where \\( z = r^2 \\) and
*
*    ```tex
*    \left|  2 + P_1 z + \ldots + P_5 z^5  - R(z) \right| \leq 2^{-59}
*    ```
*
*    <!-- <note> -->
*
*    The values of \\( P_1 \\) to \\( P_5 \\) are listed in the source code.
*
*    <!-- </note> -->
*
*    The computation of \\( e^{r} \\) thus becomes
*
*    ```tex
*    \begin{align*}
*    e^{r} &= 1 + \frac{2r}{R-r} \\
*          &= 1 + r + \frac{r \cdot R_1(r)}{2 - R_1(r)}\ \text{for better accuracy}
*    \end{align*}
*    ```
*
*    where
*
*    ```tex
*    R_1(r) = r - P_1\ r^2 + P_2\ r^4 + \ldots + P_5\ r^{10}
*    ```
*
* 3.  We scale back to obtain \\( e^{x} \\). From step 1, we have
*
*    ```tex
*    e^{x} = 2^k e^{r}
*    ```
*
*
* ## Special Cases
*
* ```tex
* \begin{align*}
* e^\infty &= \infty \\
* e^{-\infty} &= 0 \\
* e^{\mathrm{NaN}} &= \mathrm{NaN} \\
* e^0 &= 1\ \mathrm{is\ exact\ for\ finite\ argument\ only}
* \end{align*}
* ```
*
* ## Notes
*
* -   According to an error analysis, the error is always less than \\(1\\) ulp (unit in the last place).
*
* -   For an IEEE double,
*
*     -   if \\(x > 7.09782712893383973096\mbox{e+}02\\), then \\(e^{x}\\) overflows
*     -   if \\(x < -7.45133219101941108420\mbox{e+}02\\), then \\(e^{x}\\) underflows
*
* -   The hexadecimal values included in the source code are the intended ones for the used constants. Decimal values may be used, provided that the compiler will convert from decimal to binary accurately enough to produce the intended hexadecimal values.
*
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = exp( 4.0 );
* // returns ~54.5982
*
* @example
* var v = exp( -9.0 );
* // returns ~1.234e-4
*
* @example
* var v = exp( 0.0 );
* // returns 1.0
*
* @example
* var v = exp( NaN );
* // returns NaN
*/
function exp( x ) {
	var hi;
	var lo;
	var k;

	if ( isnan( x ) || x === PINF ) {
		return x;
	}
	if ( x === NINF ) {
		return 0.0;
	}
	if ( x > OVERFLOW ) {
		return PINF;
	}
	if ( x < UNDERFLOW ) {
		return 0.0;
	}
	if (
		x > NEG_NEARZERO &&
		x < NEARZERO
	) {
		return 1.0 + x;
	}
	// Reduce and compute `r = hi - lo` for extra precision.
	if ( x < 0.0 ) {
		k = trunc( (LOG2_E*x) - 0.5 );
	} else {
		k = trunc( (LOG2_E*x) + 0.5 );
	}
	hi = x - (k*LN2_HI);
	lo = k * LN2_LO;

	return expmulti( hi, lo, k );
}


// EXPORTS //

module.exports = exp;

},{"./expmulti.js":106,"@stdlib/constants/math/float64-ninf":43,"@stdlib/constants/math/float64-pinf":45,"@stdlib/math/base/assert/is-nan":59,"@stdlib/math/base/special/trunc":231}],106:[function(require,module,exports){
'use strict';

// MODULES //

var ldexp = require( '@stdlib/math/base/special/ldexp' );
var polyvalP = require( './polyval_p.js' );


// MAIN //

/**
* Computes \\(e^{r} 2^k\\) where \\(r = \mathrm{hi} - \mathrm{lo}\\) and \\(|r| \leq \ln(2)/2\\).
*
* @private
* @param {number} hi - upper bound
* @param {number} lo - lower bound
* @param {integer} k - power of 2
* @returns {number} function value
*/
function expmulti( hi, lo, k ) {
	var r;
	var t;
	var c;
	var y;

	r = hi - lo;
	t = r * r;
	c = r - ( t*polyvalP( t ) );
	y = 1.0 - ( lo - ( (r*c)/(2.0-c) ) - hi);

	return ldexp( y, k );
}


// EXPORTS //

module.exports = expmulti;

},{"./polyval_p.js":108,"@stdlib/math/base/special/ldexp":190}],107:[function(require,module,exports){
'use strict';

/**
* Evaluate the natural exponential function.
*
* @module @stdlib/math/base/special/exp
*
* @example
* var exp = require( '@stdlib/math/base/special/exp' );
*
* var v = exp( 4.0 );
* // returns ~54.5982
*
* v = exp( -9.0 );
* // returns ~1.234e-4
*
* v = exp( 0.0 );
* // returns 1.0
*
* v = exp( NaN );
* // returns NaN
*/

// MODULES //

var exp = require( './exp.js' );


// EXPORTS //

module.exports = exp;

},{"./exp.js":105}],108:[function(require,module,exports){
/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* ## Notes
*
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*/
function evalpoly( x ) {
	if ( x === 0.0 ) {
		return 0.16666666666666602;
	}
	return 0.16666666666666602 + (x * (-0.0027777777777015593 + (x * (0.00006613756321437934 + (x * (-0.0000016533902205465252 + (x * 4.1381367970572385e-8))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],109:[function(require,module,exports){
'use strict';

/*
* The original C code, long comment, copyright, license, and constants are from [netlib]{@link http://www.netlib.org/fdlibm/s_expm1.c}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* ====================================================
* Copyright (C) 2004 by Sun Microsystems, Inc. All rights reserved.
*
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*/

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var highWord = require( '@stdlib/number/float64/base/get-high-word' );
var setHighWord = require( '@stdlib/number/float64/base/set-high-word' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var BIAS = require( '@stdlib/constants/math/float64-exponent-bias' );
var LN2_HALF = require( '@stdlib/constants/math/float64-half-ln-two' );
var polyval = require( './polyval_q.js' );


// VARIABLES //

var OVERFLOW_THRESHOLD = 7.09782712893383973096e+02; // 0x40862E42 0xFEFA39EF

// High and low words of ln(2):
var LN2_HI = 6.93147180369123816490e-01; // 0x3FE62E42 0xFEE00000
var LN2_LO = 1.90821492927058770002e-10; // 0x3DEA39EF 0x35793C76

// 1 / ln(2):
var LN2_INV = 1.44269504088896338700e+00; // 0x3FF71547 0x652B82FE

// ln(2) * 56:
var LN2x56 = 3.88162421113569373274e+01; // 0x4043687A 0x9F1AF2B1

// ln(2) * 1.5:
var LN2_HALFX3 = 1.03972077083991796413e+00; // 0x3FF0A2B2 0x3F3BAB73


// MAIN //

/**
* Computes `exp(x) - 1`.
*
* ## Method
*
* 1.  Given \\(x\\), we use argument reduction to find \\(r\\) and an integer \\(k\\) such that
*
*     ```tex
*     x = k \cdot \ln(2) + r
*     ```
*
*     where
*
*     ```tex
*     |r| \leq \frac{\ln(2)}{2} \approx 0.34658
*     ```
*
*     <!-- <note> -->
*
*     A correction term \\(c\\) will need to be computed to compensate for the error in \\(r\\) when rounded to a floating-point number.
*
*     <!-- </note> -->
*
* 2.  To approximate \\(\operatorname{expm1}(r)\\), we use a special rational function on the interval \\([0,0.34658]\\). Since
*
*     ```tex
*     r \frac{e^r + 1}{e^r - 1} = 2 + \frac{r^2}{6} - \frac{r^4}{360} + \ldots
*     ```
*
*     we define \\(\operatorname{R1}(r^2)\\) by
*
*     ```tex
*     r \frac{e^r + 1}{e^r - 1} = 2 + \frac{r^2}{6} \operatorname{R1}(r^2)
*     ```
*
*     That is,
*
*     ```tex
*     \begin{align*}
*     \operatorname{R1}(r^2) &= \frac{6}{r} \biggl(\frac{e^r+1}{e^r-1} - \frac{2}{r}\biggr) \\
*     &= \frac{6}{r} \biggl( 1 + 2 \biggl(\frac{1}{e^r-1} - \frac{1}{r}\biggr)\biggr) \\
*     &= 1 - \frac{r^2}{60} + \frac{r^4}{2520} - \frac{r^6}{100800} + \ldots
*     \end{align*}
*     ```
*
*     We use a special Remes algorithm on \\([0,0.347]\\) to generate a polynomial of degree \\(5\\) in \\(r^2\\) to approximate \\(\mathrm{R1}\\). The maximum error of this polynomial approximation is bounded by \\(2^{-61}\\). In other words,
*
*     ```tex
*     \operatorname{R1}(z) \approx 1 + \mathrm{Q1} \cdot z + \mathrm{Q2} \cdot z^2 + \mathrm{Q3} \cdot z^3 + \mathrm{Q4} \cdot z^4 + \mathrm{Q5} \cdot z^5
*     ```
*
*     where
*
*     ```tex
*     \begin{align*}
*     \mathrm{Q1} &= -1.6666666666666567384\mbox{e-}2 \\
*     \mathrm{Q2} &= 3.9682539681370365873\mbox{e-}4 \\
*     \mathrm{Q3} &= -9.9206344733435987357\mbox{e-}6 \\
*     \mathrm{Q4} &= 2.5051361420808517002\mbox{e-}7 \\
*     \mathrm{Q5} &= -6.2843505682382617102\mbox{e-}9
*     \end{align*}
*     ```
*
*     where \\(z = r^2\\) and the values of \\(\mathrm{Q1}\\) to \\(\mathrm{Q5}\\) are listed in the source. The error is bounded by
*
*     ```tex
*     \biggl| 1 + \mathrm{Q1} \cdot z + \ldots + \mathrm{Q5} \cdot z - \operatorname{R1}(z) \biggr| \leq 2^{-61}
*     ```
*
*     \\(\operatorname{expm1}(r) = e^r - 1\\) is then computed by the following specific way which minimizes the accumulated rounding error
*
*     ```tex
*     \operatorname{expm1}(r) = r + \frac{r^2}{2} + \frac{r^3}{2} \biggl( \frac{3 - (\mathrm{R1} + \mathrm{R1} \cdot \frac{r}{2})}{6 - r ( 3 - \mathrm{R1} \cdot \frac{r}{2})} \biggr)
*     ```
*
*     To compensate for the error in the argument reduction, we use
*
*     ```tex
*     \begin{align*}
*     \operatorname{expm1}(r+c) &= \operatorname{expm1}(r) + c + \operatorname{expm1}(r) \cdot c \\
*     &\approx \operatorname{expm1}(r) + c + rc
*     \end{align*}
*     ```
*
*     Thus, \\(c + rc\\) will be added in as the correction terms for \\(\operatorname{expm1}(r+c)\\). Now, we can rearrange the term to avoid optimization screw up.
*
*     ```tex
*     \begin{align*}
*     \operatorname{expm1}(r+c) &\approx r - \biggl( \biggl( r + \biggl( \frac{r^2}{2} \biggl( \frac{\mathrm{R1} - (3 - \mathrm{R1} \cdot \frac{r}{2})}{6 - r (3 - \mathrm{R1} \cdot \frac{r}{2})} \biggr) - c \biggr) - c \biggr) - \frac{r^2}{2} \biggr) \\
*     &= r - \mathrm{E}
*     \end{align*}
*     ```
*
* 3.  To scale back to obtain \\(\operatorname{expm1}(x)\\), we have (from step 1)
*
*     ```tex
*     \operatorname{expm1}(x) = \begin{cases}
*     2^k  (\operatorname{expm1}(r) + 1) - 1 \\
*     2^k (\operatorname{expm1}(r) + (1-2^{-k}))
*     \end{cases}
*     ```
*
* ## Special Cases
*
* ```tex
* \begin{align*}
* \operatorname{expm1}(\infty) &= \infty \\
* \operatorname{expm1}(-\infty) &= -1 \\
* \operatorname{expm1}(\mathrm{NaN}) &= \mathrm{NaN}
* \end{align*}
* ```
*
*
* ## Notes
*
* -   For finite arguments, only \\(\operatorname{expm1}(0) = 0\\) is exact.
*
* -   To save one multiplication, we scale the coefficient \\(\mathrm{Qi}\\) to \\(\mathrm{Qi} \cdot {2^i}\\) and replace \\(z\\) by \\(\frac{x^2}{2}\\).
*
* -   To achieve maximum accuracy, we compute \\(\operatorname{expm1}(x)\\) by
*
*     -   if \\(x < -56 \cdot \ln(2)\\), return \\(-1.0\\) (raise inexact if \\(x\\) does not equal \\(\infty\\))
*
*     -   if \\(k = 0\\), return \\(r-\mathrm{E}\\)
*
*     -   if \\(k = -1\\), return \\(\frac{(r-\mathrm{E})-1}{2}\\)
*
*     -   if \\(k = 1\\),
*
*         -   if \\(r < -0.25\\), return \\(2((r+0.5)- \mathrm{E})\\)
*         -   else return \\(1+2(r-\mathrm{E})\\)
*
*     -   if \\(k < -2\\) or \\(k > 56\\), return \\(2^k(1-(\mathrm{E}-r)) - 1\\) (or \\(e^x-1\\))
*
*     -   if \\(k \leq 20\\), return \\(2^k((1-2^{-k})-(\mathrm{E}-r))\\)
*
*     -   else return \\(2^k(1-((\mathrm{E}+2^{-k})-r))\\)

* -   For IEEE 754 double, if \\(x > 7.09782712893383973096\mbox{e+}02\\), then \\(\operatorname{expm1}(x)\\) will overflow.
*
* -   The hexadecimal values listed in the source are the intended ones for the implementation constants. Decimal values may be used, provided that the compiler will convert from decimal to binary accurately enough to produce the intended hexadecimal values.
*
*
* ## Accuracy
*
* According to an error analysis, the error is always less than \\(1\\) ulp (unit in the last place).
*
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = expm1( 0.2 );
* // returns ~0.221
*
* @example
* var v = expm1( -9.0 );
* // returns ~-0.999
*
* @example
* var v = expm1( 0.0 );
* // returns 0.0
*
* @example
* var v = expm1( NaN );
* // returns NaN
*/
function expm1( x ) {
	var halfX;
	var sign;
	var hi;
	var lo;
	var hx;
	var r1;
	var y;
	var z;
	var c;
	var t;
	var e;
	var k;

	if ( x === PINF || isnan( x ) ) {
		return x;
	}
	if ( x === NINF ) {
		return -1.0;
	}
	if ( x === 0.0 ) {
		return x; // handles +-0 (IEEE 754-2008)
	}
	// Set y = |x|:
	if ( x < 0.0 ) {
		sign = true;
		y = -x;
	} else {
		sign = false;
		y = x;
	}
	// Filter out huge and non-finite arguments...
	if ( y >= LN2x56 ) { // if |x| >= 56*ln(2)
		if ( sign ) { // if x <= -56*ln(2)
			return -1.0;
		}
		if ( y >= OVERFLOW_THRESHOLD ) { // if |x| >= 709.78...
			return PINF;
		}
	}
	// Extract the more significant bits from |x|:
	hx = highWord( y )|0; // asm type annotation

	// Argument reduction...
	if ( y > LN2_HALF ) { // if |x| > 0.5*ln(2)
		if ( y < LN2_HALFX3 ) { // if |x| < 1.5*ln(2)
			if ( sign ) {
				hi = x + LN2_HI;
				lo = -LN2_LO;
				k = -1;
			} else {
				hi = x - LN2_HI;
				lo = LN2_LO;
				k = 1;
			}
		} else {
			if ( sign ) {
				k = (LN2_INV*x) - 0.5;
			} else {
				k = (LN2_INV*x) + 0.5;
			}
			k |= 0; // use a bitwise OR to cast `k` to an integer (see also asm.js type annotations: http://asmjs.org/spec/latest/#annotations)
			t = k;
			hi = x - (t*LN2_HI); // t*ln2_hi is exact here
			lo = t * LN2_LO;
		}
		x = hi - lo;
		c = (hi-x) - lo;
	}
	// if |x| < 2**-54 => high word: 0 01111001001 00000000000000000000 => 0x3c900000 = 1016070144  => exponent = 01111001001 = 969 = 1023-54
	else if ( hx < 1016070144 ) {
		return x;
	}
	else {
		k = 0;
	}
	// x is now in primary range...
	halfX = 0.5 * x;
	z = x * halfX;

	r1 = 1.0 + ( z * polyval( z ) );

	t = 3.0 - (r1*halfX);
	e = z * ( (r1-t) / (6.0 - (x*t)) );
	if ( k === 0 ) {
		return x - ( (x*e) - z );	// c is 0
	}
	e = ( x * (e-c) ) - c;
	e -= z;
	if ( k === -1 ) {
		return ( 0.5*(x-e) )- 0.5;
	}
	if ( k === 1 ) {
		if ( x < -0.25 ) {
			return -2.0 * ( e - (x+0.5) );
		}
		return 1 + ( 2.0 * (x-e) );
	}
	if ( k <= -2 || k > 56 ) { // suffice to return exp(x)-1
		y = 1.0 - (e-x);

		// Add k to y's exponent:
		hi = (highWord( y ) + (k<<20))|0; // asm type annotation
		y = setHighWord( y, hi );

		return y - 1.0;
	}
	t = 1.0;
	if ( k < 20 ) {
		// 0x3ff00000 - (0x200000>>k) = 1072693248 - (0x200000>>k) => 0x200000 = 0 00000000010 00000000000000000000
		hi = (1072693248 - (0x200000>>k))|0; // asm type annotation
		t = setHighWord( t, hi ); // t=1-2^-k
		y = t - (e-x);
	} else {
		hi = ( (BIAS-k)<<20 )|0; // asm type annotation
		t = setHighWord( t, hi ); // t=2^-k
		y = x - (e+t);
		y += 1.0;
	}
	// Add k to y's exponent:
	hi = (highWord( y ) + (k<<20))|0; // asm type annotation
	return setHighWord( y, hi );
}


// EXPORTS //

module.exports = expm1;

},{"./polyval_q.js":111,"@stdlib/constants/math/float64-exponent-bias":30,"@stdlib/constants/math/float64-half-ln-two":33,"@stdlib/constants/math/float64-ninf":43,"@stdlib/constants/math/float64-pinf":45,"@stdlib/math/base/assert/is-nan":59,"@stdlib/number/float64/base/get-high-word":248,"@stdlib/number/float64/base/set-high-word":257}],110:[function(require,module,exports){
'use strict';

/**
* Compute `exp(x) - 1`.
*
* @module @stdlib/math/base/special/expm1
*
* @example
* var expm1 = require( '@stdlib/math/base/special/expm1' );
*
* var v = expm1( 0.2 );
* // returns ~0.221
*
* v = expm1( -9.0 );
* // returns ~-0.999
*
* v = expm1( 0.0 );
* // returns 0.0
*
* v = expm1( NaN );
* // returns NaN
*/

// MODULES //

var expm1 = require( './expm1.js' );


// EXPORTS //

module.exports = expm1;

},{"./expm1.js":109}],111:[function(require,module,exports){
/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* ## Notes
*
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*/
function evalpoly( x ) {
	if ( x === 0.0 ) {
		return -0.03333333333333313;
	}
	return -0.03333333333333313 + (x * (0.0015873015872548146 + (x * (-0.0000793650757867488 + (x * (0.000004008217827329362 + (x * -2.0109921818362437e-7))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],112:[function(require,module,exports){
'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isInteger = require( '@stdlib/math/base/assert/is-integer' );
var gamma = require( '@stdlib/math/base/special/gamma' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var FACTORIALS = require( './factorials.json' );


// VARIABLES //

var MAX_FACTORIAL = 170; // TODO: consider extracting as a constant


// MAIN //

/**
* Evaluates the factorial of `x`.
*
* @param {number} x - input value
* @returns {number} factorial
*
* @example
* var v = factorial( 3.0 );
* // returns 6.0
*
* @example
* var v = factorial( -1.5 );
* // returns ~-3.545
*
* @example
* var v = factorial( -0.5 );
* // returns ~1.772
*
* @example
* var v = factorial( 0.5 );
* // returns ~0.886
*
* @example
* var v = factorial( -10.0 );
* // returns NaN
*
* @example
* var v = factorial( 171.0 );
* // returns Infinity
*
* @example
* var v = factorial( NaN );
* // returns NaN
*/
function factorial( x ) {
	if ( isnan( x ) ) {
		return NaN;
	}
	if ( isInteger( x ) ) {
		if ( x < 0 ) {
			return NaN;
		}
		if ( x <= MAX_FACTORIAL ) {
			return FACTORIALS[ x ];
		}
		return PINF;
	}
	return gamma( x + 1.0 );
}


// EXPORTS //

module.exports = factorial;

},{"./factorials.json":113,"@stdlib/constants/math/float64-pinf":45,"@stdlib/math/base/assert/is-integer":57,"@stdlib/math/base/assert/is-nan":59,"@stdlib/math/base/special/gamma":127}],113:[function(require,module,exports){
module.exports=[
	1,
	1,
	2,
	6,
	24,
	120,
	720,
	5040,
	40320,
	362880.0,
	3628800.0,
	39916800.0,
	479001600.0,
	6227020800.0,
	87178291200.0,
	1307674368000.0,
	20922789888000.0,
	355687428096000.0,
	6402373705728000.0,
	121645100408832000.0,
	0.243290200817664e19,
	0.5109094217170944e20,
	0.112400072777760768e22,
	0.2585201673888497664e23,
	0.62044840173323943936e24,
	0.15511210043330985984e26,
	0.403291461126605635584e27,
	0.10888869450418352160768e29,
	0.304888344611713860501504e30,
	0.8841761993739701954543616e31,
	0.26525285981219105863630848e33,
	0.822283865417792281772556288e34,
	0.26313083693369353016721801216e36,
	0.868331761881188649551819440128e37,
	0.29523279903960414084761860964352e39,
	0.103331479663861449296666513375232e41,
	0.3719933267899012174679994481508352e42,
	0.137637530912263450463159795815809024e44,
	0.5230226174666011117600072241000742912e45,
	0.203978820811974433586402817399028973568e47,
	0.815915283247897734345611269596115894272e48,
	0.3345252661316380710817006205344075166515e50,
	0.1405006117752879898543142606244511569936e52,
	0.6041526306337383563735513206851399750726e53,
	0.265827157478844876804362581101461589032e55,
	0.1196222208654801945619631614956577150644e57,
	0.5502622159812088949850305428800254892962e58,
	0.2586232415111681806429643551536119799692e60,
	0.1241391559253607267086228904737337503852e62,
	0.6082818640342675608722521633212953768876e63,
	0.3041409320171337804361260816606476884438e65,
	0.1551118753287382280224243016469303211063e67,
	0.8065817517094387857166063685640376697529e68,
	0.427488328406002556429801375338939964969e70,
	0.2308436973392413804720927426830275810833e72,
	0.1269640335365827592596510084756651695958e74,
	0.7109985878048634518540456474637249497365e75,
	0.4052691950487721675568060190543232213498e77,
	0.2350561331282878571829474910515074683829e79,
	0.1386831185456898357379390197203894063459e81,
	0.8320987112741390144276341183223364380754e82,
	0.507580213877224798800856812176625227226e84,
	0.3146997326038793752565312235495076408801e86,
	0.1982608315404440064116146708361898137545e88,
	0.1268869321858841641034333893351614808029e90,
	0.8247650592082470666723170306785496252186e91,
	0.5443449390774430640037292402478427526443e93,
	0.3647111091818868528824985909660546442717e95,
	0.2480035542436830599600990418569171581047e97,
	0.1711224524281413113724683388812728390923e99,
	0.1197857166996989179607278372168909873646e101,
	0.8504785885678623175211676442399260102886e102,
	0.6123445837688608686152407038527467274078e104,
	0.4470115461512684340891257138125051110077e106,
	0.3307885441519386412259530282212537821457e108,
	0.2480914081139539809194647711659403366093e110,
	0.188549470166605025498793226086114655823e112,
	0.1451830920282858696340707840863082849837e114,
	0.1132428117820629783145752115873204622873e116,
	0.8946182130782975286851441715398316520698e117,
	0.7156945704626380229481153372318653216558e119,
	0.5797126020747367985879734231578109105412e121,
	0.4753643337012841748421382069894049466438e123,
	0.3945523969720658651189747118012061057144e125,
	0.3314240134565353266999387579130131288001e127,
	0.2817104114380550276949479442260611594801e129,
	0.2422709538367273238176552320344125971528e131,
	0.210775729837952771721360051869938959523e133,
	0.1854826422573984391147968456455462843802e135,
	0.1650795516090846108121691926245361930984e137,
	0.1485715964481761497309522733620825737886e139,
	0.1352001527678402962551665687594951421476e141,
	0.1243841405464130725547532432587355307758e143,
	0.1156772507081641574759205162306240436215e145,
	0.1087366156656743080273652852567866010042e147,
	0.103299784882390592625997020993947270954e149,
	0.9916779348709496892095714015418938011582e150,
	0.9619275968248211985332842594956369871234e152,
	0.942689044888324774562618574305724247381e154,
	0.9332621544394415268169923885626670049072e156,
	0.9332621544394415268169923885626670049072e158,
	0.9425947759838359420851623124482936749562e160,
	0.9614466715035126609268655586972595484554e162,
	0.990290071648618040754671525458177334909e164,
	0.1029901674514562762384858386476504428305e167,
	0.1081396758240290900504101305800329649721e169,
	0.1146280563734708354534347384148349428704e171,
	0.1226520203196137939351751701038733888713e173,
	0.132464181945182897449989183712183259981e175,
	0.1443859583202493582204882102462797533793e177,
	0.1588245541522742940425370312709077287172e179,
	0.1762952551090244663872161047107075788761e181,
	0.1974506857221074023536820372759924883413e183,
	0.2231192748659813646596607021218715118256e185,
	0.2543559733472187557120132004189335234812e187,
	0.2925093693493015690688151804817735520034e189,
	0.339310868445189820119825609358857320324e191,
	0.396993716080872089540195962949863064779e193,
	0.4684525849754290656574312362808384164393e195,
	0.5574585761207605881323431711741977155627e197,
	0.6689502913449127057588118054090372586753e199,
	0.8094298525273443739681622845449350829971e201,
	0.9875044200833601362411579871448208012564e203,
	0.1214630436702532967576624324188129585545e206,
	0.1506141741511140879795014161993280686076e208,
	0.1882677176888926099743767702491600857595e210,
	0.237217324288004688567714730513941708057e212,
	0.3012660018457659544809977077527059692324e214,
	0.3856204823625804217356770659234636406175e216,
	0.4974504222477287440390234150412680963966e218,
	0.6466855489220473672507304395536485253155e220,
	0.8471580690878820510984568758152795681634e222,
	0.1118248651196004307449963076076169029976e225,
	0.1487270706090685728908450891181304809868e227,
	0.1992942746161518876737324194182948445223e229,
	0.269047270731805048359538766214698040105e231,
	0.3659042881952548657689727220519893345429e233,
	0.5012888748274991661034926292112253883237e235,
	0.6917786472619488492228198283114910358867e237,
	0.9615723196941089004197195613529725398826e239,
	0.1346201247571752460587607385894161555836e242,
	0.1898143759076170969428526414110767793728e244,
	0.2695364137888162776588507508037290267094e246,
	0.3854370717180072770521565736493325081944e248,
	0.5550293832739304789551054660550388118e250,
	0.80479260574719919448490292577980627711e252,
	0.1174997204390910823947958271638517164581e255,
	0.1727245890454638911203498659308620231933e257,
	0.2556323917872865588581178015776757943262e259,
	0.380892263763056972698595524350736933546e261,
	0.571338395644585459047893286526105400319e263,
	0.8627209774233240431623188626544191544816e265,
	0.1311335885683452545606724671234717114812e268,
	0.2006343905095682394778288746989117185662e270,
	0.308976961384735088795856467036324046592e272,
	0.4789142901463393876335775239063022722176e274,
	0.7471062926282894447083809372938315446595e276,
	0.1172956879426414428192158071551315525115e279,
	0.1853271869493734796543609753051078529682e281,
	0.2946702272495038326504339507351214862195e283,
	0.4714723635992061322406943211761943779512e285,
	0.7590705053947218729075178570936729485014e287,
	0.1229694218739449434110178928491750176572e290,
	0.2004401576545302577599591653441552787813e292,
	0.3287218585534296227263330311644146572013e294,
	0.5423910666131588774984495014212841843822e296,
	0.9003691705778437366474261723593317460744e298,
	0.1503616514864999040201201707840084015944e301,
	0.2526075744973198387538018869171341146786e303,
	0.4269068009004705274939251888899566538069e305,
	0.7257415615307998967396728211129263114717e307
]

},{}],114:[function(require,module,exports){
'use strict';

/**
* Evaluate the factorial function.
*
* @module @stdlib/math/base/special/factorial
*
* @example
* var factorial = require( '@stdlib/math/base/special/factorial' );
*
* var v = factorial( 3.0 );
* // returns 6.0
*
* v = factorial( -1.5 );
* // returns ~-3.545
*
* v = factorial( -0.5 );
* // returns ~1.772
*
* v = factorial( 0.5 );
* // returns ~0.886
*
* v = factorial( -10.0 );
* // returns NaN
*
* v = factorial( 171.0 );
* // returns Infinity
*
* v = factorial( NaN );
* // returns NaN
*/

// MODULES //

var factorial = require( './factorial.js' );


// EXPORTS //

module.exports = factorial;

},{"./factorial.js":112}],115:[function(require,module,exports){
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
var floor = Math.floor;


// EXPORTS //

module.exports = floor;

},{}],116:[function(require,module,exports){
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

},{"./floor.js":115}],117:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_64_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* Copyright John Maddock 2006-7, 2013-14.
* Copyright Paul A. Bristow 2007, 2013-14.
* Copyright Nikhar Agrawal 2013-14.
* Copyright Christopher Kormanyos 2013-14.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var abs = require( '@stdlib/math/base/special/abs' );
var floor = require( '@stdlib/math/base/special/floor' );
var gamma = require( '@stdlib/math/base/special/gamma' );
var factorial = require( '@stdlib/math/base/special/factorial' );
var gammaDeltaRatioLanczos = require( './gamma_delta_ratio_lanczos.js' );


// VARIABLES //

var MAX_FACTORIAL = 170; // TODO: consider moving to pkg


// MAIN //

/**
* Computes the ratio of two gamma functions.
*
* ## Notes
*
* -   Specifically, the function evaluates
*
*     ```tex
*     \frac{ \Gamma( z ) }{ \Gamma( z + \delta ) }
*     ```
*
* @param {number} z - first gamma parameter
* @param {number} delta - difference
* @returns {number} gamma ratio
*
* @example
* var y = gammaDeltaRatio( 2.0, 3.0 );
* // returns ~0.042
*
* @example
* var y = gammaDeltaRatio( 4.0, 0.5 );
* // returns 2.0
*
* @example
* var y = gammaDeltaRatio( 100.0, 0.0 );
* // returns 1.0
*/
function gammaDeltaRatio( z, delta ) {
	var result;
	var idelta;
	var iz;

	if ( z <= 0.0 || z + delta <= 0.0 ) {
		// This isn't very sophisticated, or accurate, but it does work:
		return gamma( z ) / gamma( z + delta );
	}
	idelta = floor( delta );
	if ( idelta === delta ) {
		iz = floor( z );
		if ( iz === z ) {
			// As both `z` and `delta` are integers, see if we can use a table lookup:
			if ( z <= MAX_FACTORIAL && ( z + delta <= MAX_FACTORIAL ) ) {
				return factorial( iz - 1.0 ) / factorial( idelta + iz - 1.0 ); // eslint-disable-line max-len
			}
		}
		if ( abs(delta) < 20.0 ) {
			// As `delta` is a small integer, we can use a finite product:
			if ( delta === 0.0 ) {
				return 1.0;
			}
			if ( delta < 0.0 ) {
				z -= 1.0;
				result = z;
				delta += 1.0;
				while ( delta !== 0.0 ) {
					z -= 1.0;
					result *= z;
					delta += 1.0;
				}
				return result;
			}
			result = 1.0 / z;
			delta -= 1.0;
			while ( delta !== 0.0 ) {
				z += 1.0;
				result /= z;
				delta -= 1.0;
			}
			return result;
		}
	}
	return gammaDeltaRatioLanczos( z, delta );
}


// EXPORTS //

module.exports = gammaDeltaRatio;

},{"./gamma_delta_ratio_lanczos.js":118,"@stdlib/math/base/special/abs":77,"@stdlib/math/base/special/factorial":114,"@stdlib/math/base/special/floor":116,"@stdlib/math/base/special/gamma":127}],118:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_64_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* Copyright John Maddock 2006-7, 2013-14.
* Copyright Paul A. Bristow 2007, 2013-14.
* Copyright Nikhar Agrawal 2013-14.
* Copyright Christopher Kormanyos 2013-14.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var lanczosSum = require( '@stdlib/math/base/special/gamma-lanczos-sum' );
var gamma = require( '@stdlib/math/base/special/gamma' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var abs = require( '@stdlib/math/base/special/abs' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var EPSILON = require( '@stdlib/constants/math/float64-eps' );
var E = require( '@stdlib/constants/math/float64-e' );
var G = require( '@stdlib/constants/math/float64-gamma-lanczos-g' );


// VARIABLES //

var MAX_FACTORIAL = 170; // TODO: consider moving to pkg
var FACTORIAL_169 = 4.269068009004705e+304;


/**
* Calculates the ratio of two gamma functions via Lanczos approximation.
*
* ## Notes
*
* -   When \\( z < \epsilon \\), we get spurious numeric overflow unless we're very careful. This can occur either inside `lanczosSum(z)` or in the final combination of terms. To avoid this, split the product up into 2 (or 3) parts:
*
*     ```tex
*     \begin{align}
*     G(z) / G(L) &= 1 / (z \cdot G(L)) ; z < \eps, L = z + \delta = \delta \\
*     z * G(L) &= z * G(lim) \cdot (G(L)/G(lim)) ; lim = \text{largest factorial}
*     \end{align}
*     ```
*
* @private
* @param {number} z - first gamma parameter
* @param {number} delta - difference
* @returns {number} gamma ratio
*/
function gammaDeltaRatioLanczos( z, delta ) {
	var result;
	var ratio;
	var zgh;

	if ( z < EPSILON ) {
		if ( delta > MAX_FACTORIAL ) {
			ratio = gammaDeltaRatioLanczos( delta, MAX_FACTORIAL-delta );
			ratio *= z;
			ratio *= FACTORIAL_169;
			return 1.0 / ratio;
		}
		return 1.0 / ( z * gamma( z+delta ) );
	}
	zgh = z + G - 0.5;
	if ( z + delta === z ) {
		if ( abs(delta) < 10.0 ) {
			result = exp( ( 0.5-z ) * log1p( delta/zgh ) );
		} else {
			result = 1.0;
		}
	} else {
		if ( abs(delta) < 10.0 ) {
			result = exp( ( 0.5-z ) * log1p( delta/zgh ));
		} else {
			result = pow( zgh / (zgh+delta), z-0.5 );
		}
		// Split up the calculation to avoid spurious overflow:
		result *= lanczosSum( z ) / lanczosSum( z + delta );
	}
	result *= pow( E / ( zgh+delta ), delta );
	return result;
}


// EXPORTS //

module.exports = gammaDeltaRatioLanczos;

},{"@stdlib/constants/math/float64-e":27,"@stdlib/constants/math/float64-eps":28,"@stdlib/constants/math/float64-gamma-lanczos-g":32,"@stdlib/math/base/special/abs":77,"@stdlib/math/base/special/exp":107,"@stdlib/math/base/special/gamma":127,"@stdlib/math/base/special/gamma-lanczos-sum":124,"@stdlib/math/base/special/log1p":196,"@stdlib/math/base/special/pow":207}],119:[function(require,module,exports){
'use strict';

/**
* Calculate the ratio of two gamma functions.
*
* @module @stdlib/math/base/special/gamma-delta-ratio
*
* @example
* var gammaDeltaRatio = require( '@stdlib/math/base/special/gamma-delta-ratio' );
*
* var y = gammaDeltaRatio( 2.0, 3.0 );
* // returns ~0.042
*
* y = gammaDeltaRatio( 4.0, 0.5 );
* // returns 2.0
*
* y = gammaDeltaRatio( 100.0, 0.0 );
* // returns 1.0
*/

// MODULES //

var gammaDeltaRatio = require( './gamma_delta_ratio.js' );


// EXPORTS //

module.exports = gammaDeltaRatio;

},{"./gamma_delta_ratio.js":117}],120:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_64_0/boost/math/special_functions/lanczos.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* Copyright John Maddock 2006.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MAIN //

/**
* Calculates the Lanczos sum for the approximation of the gamma function (scaled by `exp(-g)`, where `g = 10.900511`.
*
* @name gammaLanczosSumExpGScaled
* @type {Function}
* @param {number} x - input value
* @returns {number} Lanczos sum approximation
*
* @example
* var v = gammaLanczosSumExpGScaled( 4.0 );
* // returns ~0.018
*
* @example
* var v = gammaLanczosSumExpGScaled( -1.5 );
* // returns ~25.337
*
* @example
* var v = gammaLanczosSumExpGScaled( -0.5 );
* // returns ~-12.911
*
* @example
* var v = gammaLanczosSumExpGScaled( 0.5 );
* // returns ~1.772
*
* @example
* var v = gammaLanczosSumExpGScaled( 0.0 );
* // returns Infinity
*
* @example
* var v = gammaLanczosSumExpGScaled( NaN );
* // returns NaN
*/
var gammaLanczosSumExpGScaled = require( './rational_pq.js' );


// EXPORTS //

module.exports = gammaLanczosSumExpGScaled;

},{"./rational_pq.js":122}],121:[function(require,module,exports){
'use strict';

/**
* Calculate the Lanczos sum for the approximation of the gamma function (scaled by `exp(-g)`, where `g = 10.900511`.
*
* @module @stdlib/math/base/special/gamma-lanczos-sum-expg-scaled
*
* @example
* var gammaLanczosSumExpGScaled = require( '@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled' );
*
* var v = gammaLanczosSumExpGScaled( 4.0 );
* // returns ~0.018
*
* v = gammaLanczosSumExpGScaled( -1.5 );
* // returns ~25.337
*
* v = gammaLanczosSumExpGScaled( -0.5 );
* // returns ~-12.911
*
* v = gammaLanczosSumExpGScaled( 0.5 );
* // returns ~1.772
*
* v = gammaLanczosSumExpGScaled( 0.0 );
* // returns Infinity
*
* v = gammaLanczosSumExpGScaled( NaN );
* // returns NaN
*/

// MODULES //

var gammaLanczosSumExpGScaled = require( './gamma_lanczos_sum_expg_scaled.js' );


// EXPORTS //

module.exports = gammaLanczosSumExpGScaled;

},{"./gamma_lanczos_sum_expg_scaled.js":120}],122:[function(require,module,exports){
arguments[4][84][0].apply(exports,arguments)
},{"dup":84}],123:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_64_0/boost/math/special_functions/lanczos.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* Copyright John Maddock 2006.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MAIN //

/**
* Calculates the Lanczos sum approximation.
*
* @name gammaLanczosSum
* @type {Function}
* @param {number} x - input value
* @returns {number} Lanczos sum approximation
*
* @example
* var v = gammaLanczosSum( 4.0 );
* // returns ~950.366
*
* @example
* var v = gammaLanczosSum( -1.5 );
* // returns ~1373366.245
*
* @example
* var v = gammaLanczosSum( -0.5 );
* // returns ~-699841.735
*
* @example
* var v = gammaLanczosSum( 0.5 );
* // returns ~96074.186
*
* @example
* var v = gammaLanczosSum( 0.0 );
* // returns Infinity
*
* @example
* var v = gammaLanczosSum( NaN );
* // returns NaN
*/
var gammaLanczosSum = require( './rational_pq.js' );


// EXPORTS //

module.exports = gammaLanczosSum;

},{"./rational_pq.js":125}],124:[function(require,module,exports){
'use strict';

/**
* Calculate the Lanczos sum for the approximation of the gamma function.
*
* @module @stdlib/math/base/special/gamma-lanczos-sum
*
* @example
* var gammaLanczosSum = require( '@stdlib/math/base/special/gamma-lanczos-sum' );
*
* var v = gammaLanczosSum( 4.0 );
* // returns ~950.366
*
* v = gammaLanczosSum( -1.5 );
* // returns ~1373366.245
*
* v = gammaLanczosSum( -0.5 );
* // returns ~-699841.735
*
* v = gammaLanczosSum( 0.5 );
* // returns ~96074.186
*
* v = gammaLanczosSum( 0.0 );
* // returns Infinity
*
* v = gammaLanczosSum( NaN );
* // returns NaN
*/

// MODULES //

var gammaLanczosSum = require( './gamma_lanczos_sum.js' );


// EXPORTS //

module.exports = gammaLanczosSum;

},{"./gamma_lanczos_sum.js":123}],125:[function(require,module,exports){
/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a rational function, i.e., the ratio of two polynomials described by the coefficients stored in \\(P\\) and \\(Q\\).
*
* ## Notes
*
* -   Coefficients should be sorted in ascending degree.
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the rational function
* @returns {number} evaluated rational function
*/
function evalrational( x ) {
	var ax;
	var s1;
	var s2;
	if ( x === 0.0 ) {
		return Infinity;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = 38474670393.31777 + (x * (36857665043.51951 + (x * (15889202453.72942 + (x * (4059208354.298835 + (x * (680547661.1834733 + (x * (78239755.00312005 + (x * (6246580.776401795 + (x * (341986.3488721347 + (x * (12287.194511824551 + (x * (261.61404416416684 + (x * 2.5066282746310007))))))))))))))))))); // eslint-disable-line max-len
		s2 = 0.0 + (x * (362880.0 + (x * (1026576.0 + (x * (1172700.0 + (x * (723680.0 + (x * (269325.0 + (x * (63273.0 + (x * (9450.0 + (x * (870.0 + (x * (45.0 + (x * 1.0))))))))))))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = 2.5066282746310007 + (x * (261.61404416416684 + (x * (12287.194511824551 + (x * (341986.3488721347 + (x * (6246580.776401795 + (x * (78239755.00312005 + (x * (680547661.1834733 + (x * (4059208354.298835 + (x * (15889202453.72942 + (x * (36857665043.51951 + (x * 38474670393.31777))))))))))))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (45.0 + (x * (870.0 + (x * (9450.0 + (x * (63273.0 + (x * (269325.0 + (x * (723680.0 + (x * (1172700.0 + (x * (1026576.0 + (x * (362880.0 + (x * 0.0))))))))))))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

},{}],126:[function(require,module,exports){
'use strict';

/*
* The original C code, long comment, copyright, license, and constants are from [Cephes]{@link http://netlib.sandia.gov/cephes/cprob/gamma.c}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* COPYRIGHT
*
* Cephes Math Library Release 2.8:  June, 2000
* Copyright 1984, 1987, 1989, 1992, 2000 by Stephen L. Moshier
*
*
* LICENSE
*
* The README [file]{@link http://netlib.sandia.gov/cephes/} reads:
*   > Some software in this archive may be from the book _Methods and Programs for Mathematical Functions_ (Prentice-Hall or Simon & Schuster International, 1989) or from the Cephes Mathematical Library, a commercial product. In either event, it is copyrighted by the author. What you see here may be used freely but it comes with no support or guarantee.
*   > The two known misprints in the book are repaired here in the source listings for the gamma function and the incomplete beta integral.
*   > Stephen L. Moshier
*   > moshier@na-net.ornl.gov
*/

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isInteger = require( '@stdlib/math/base/assert/is-integer' );
var isNegativeZero = require( '@stdlib/math/base/assert/is-negative-zero' );
var abs = require( '@stdlib/math/base/special/abs' );
var floor = require( '@stdlib/math/base/special/floor' );
var sin = require( '@stdlib/math/base/special/sin' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var PI = require( '@stdlib/constants/math/float64-pi' );
var stirlingApprox = require( './stirling_approximation.js' );
var smallApprox = require( './small_approximation.js' );
var rateval = require( './rational_pq.js' );


// MAIN //

/**
* Evaluates the gamma function.
*
* ## Method
*
* 1.  Arguments \\(|x| \leq 34\\) are reduced by recurrence and the function approximated by a rational function of degree \\(6/7\\) in the interval \\((2,3)\\).
* 2.  Large negative arguments are made positive using a reflection formula.
* 3.  Large arguments are handled by Stirling's formula.
*
*
* ## Notes
*
* -   Relative error:
*
*     | arithmetic | domain    | # trials | peak    | rms     |
*     |:----------:|:---------:|:--------:|:-------:|:-------:|
*     | DEC        | -34,34    | 10000    | 1.3e-16 | 2.5e-17 |
*     | IEEE       | -170,-33  | 20000    | 2.3e-15 | 3.3e-16 |
*     | IEEE       | -33, 33   | 20000    | 9.4e-16 | 2.2e-16 |
*     | IEEE       | 33, 171.6 | 20000    | 2.3e-15 | 3.2e-16 |
*
* -   Error for arguments outside the test range will be larger owing to error amplification by the exponential function.
*
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = gamma( 4.0 );
* // returns 6.0
*
* @example
* var v = gamma( -1.5 );
* // returns ~2.363
*
* @example
* var v = gamma( -0.5 );
* // returns ~-3.545
*
* @example
* var v = gamma( 0.5 );
* // returns ~1.772
*
* @example
* var v = gamma( 0.0 );
* // returns Infinity
*
* @example
* var v = gamma( -0.0 );
* // returns -Infinity
*
* @example
* var v = gamma( NaN );
* // returns NaN
*/
function gamma( x ) {
	var sign;
	var q;
	var p;
	var z;
	if (
		(isInteger( x ) && x < 0) ||
		x === NINF ||
		isnan( x )
	) {
		return NaN;
	}
	if ( x === 0.0 ) {
		if ( isNegativeZero( x ) ) {
			return NINF;
		}
		return PINF;
	}
	if ( x > 171.61447887182298 ) {
		return PINF;
	}
	if ( x < -170.5674972726612 ) {
		return 0.0;
	}
	q = abs( x );
	if ( q > 33.0 ) {
		if ( x >= 0.0 ) {
			return stirlingApprox( x );
		}
		p = floor( q );

		// Check whether `x` is even...
		if ( (p&1) === 0 ) {
			sign = -1.0;
		} else {
			sign = 1.0;
		}
		z = q - p;
		if ( z > 0.5 ) {
			p += 1.0;
			z = q - p;
		}
		z = q * sin( PI * z );
		return sign * PI / ( abs(z)*stirlingApprox(q) );
	}
	// Reduce `x`...
	z = 1.0;
	while ( x >= 3.0 ) {
		x -= 1.0;
		z *= x;
	}
	while ( x < 0.0 ) {
		if ( x > -1.0e-9 ) {
			return smallApprox( x, z );
		}
		z /= x;
		x += 1.0;
	}
	while ( x < 2.0 ) {
		if ( x < 1.0e-9 ) {
			return smallApprox( x, z );
		}
		z /= x;
		x += 1.0;
	}
	if ( x === 2.0 ) {
		return z;
	}
	x -= 2.0;
	return z * rateval( x );
}


// EXPORTS //

module.exports = gamma;

},{"./rational_pq.js":129,"./small_approximation.js":130,"./stirling_approximation.js":131,"@stdlib/constants/math/float64-ninf":43,"@stdlib/constants/math/float64-pi":44,"@stdlib/constants/math/float64-pinf":45,"@stdlib/math/base/assert/is-integer":57,"@stdlib/math/base/assert/is-nan":59,"@stdlib/math/base/assert/is-negative-zero":61,"@stdlib/math/base/special/abs":77,"@stdlib/math/base/special/floor":116,"@stdlib/math/base/special/sin":226}],127:[function(require,module,exports){
'use strict';

/**
* Evaluate the gamma function.
*
* @module @stdlib/math/base/special/gamma
*
* @example
* var gamma = require( '@stdlib/math/base/special/gamma' );
*
* var v = gamma( 4.0 );
* // returns 6.0
*
* v = gamma( -1.5 );
* // returns ~2.363
*
* v = gamma( -0.5 );
* // returns ~-3.545
*
* v = gamma( 0.5 );
* // returns ~1.772
*
* v = gamma( 0.0 );
* // returns Infinity
*
* v = gamma( -0.0 );
* // returns -Infinity
*
* v = gamma( NaN );
* // returns NaN
*/

// MODULES //

var gamma = require( './gamma.js' );


// EXPORTS //

module.exports = gamma;

},{"./gamma.js":126}],128:[function(require,module,exports){
/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* ## Notes
*
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*/
function evalpoly( x ) {
	if ( x === 0.0 ) {
		return 0.08333333333334822;
	}
	return 0.08333333333334822 + (x * (0.0034722222160545866 + (x * (-0.0026813261780578124 + (x * (-0.00022954996161337813 + (x * 0.0007873113957930937))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],129:[function(require,module,exports){
/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a rational function, i.e., the ratio of two polynomials described by the coefficients stored in \\(P\\) and \\(Q\\).
*
* ## Notes
*
* -   Coefficients should be sorted in ascending degree.
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the rational function
* @returns {number} evaluated rational function
*/
function evalrational( x ) {
	var ax;
	var s1;
	var s2;
	if ( x === 0.0 ) {
		return 1.0;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = 1.0 + (x * (0.4942148268014971 + (x * (0.20744822764843598 + (x * (0.04763678004571372 + (x * (0.010421379756176158 + (x * (0.0011913514700658638 + (x * (0.00016011952247675185 + (x * 0.0))))))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (0.0714304917030273 + (x * (-0.23459179571824335 + (x * (0.035823639860549865 + (x * (0.011813978522206043 + (x * (-0.004456419138517973 + (x * (0.0005396055804933034 + (x * -0.000023158187332412014))))))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = 0.0 + (x * (0.00016011952247675185 + (x * (0.0011913514700658638 + (x * (0.010421379756176158 + (x * (0.04763678004571372 + (x * (0.20744822764843598 + (x * (0.4942148268014971 + (x * 1.0))))))))))))); // eslint-disable-line max-len
		s2 = -0.000023158187332412014 + (x * (0.0005396055804933034 + (x * (-0.004456419138517973 + (x * (0.011813978522206043 + (x * (0.035823639860549865 + (x * (-0.23459179571824335 + (x * (0.0714304917030273 + (x * 1.0))))))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

},{}],130:[function(require,module,exports){
'use strict';

// MODULES //

var EULER = require( '@stdlib/constants/math/float64-eulergamma' );


// MAIN //

/**
* Evaluates the gamma function using a small-value approximation.
*
* @private
* @param {number} x - input value
* @param {number} z - scale factor
* @returns {number} function value
*/
function gamma( x, z ) {
	return z / ( ( 1.0 + ( EULER*x ) ) * x );
}


// EXPORTS //

module.exports = gamma;

},{"@stdlib/constants/math/float64-eulergamma":29}],131:[function(require,module,exports){
'use strict';

// MODULES //

var SQRT_TWO_PI = require( '@stdlib/constants/math/float64-sqrt-two-pi' );
var pow = require( '@stdlib/math/base/special/pow' );
var exp = require( '@stdlib/math/base/special/exp' );
var polyval = require( './polyval_s.js' );


// VARIABLES //

var MAX_STIRLING = 143.01608;


// MAIN //

/**
* Evaluates the gamma function using Stirling's formula. The polynomial is valid for \\(33 \leq x \leq 172\\).
*
* @private
* @param {number} x - input value
* @returns {number} function value
*/
function gamma( x ) {
	var w;
	var y;
	var v;

	w = 1.0 / x;
	w = 1.0 + ( w * polyval( w ) );
	y = exp( x );

	// Check `x` to avoid `pow()` overflow...
	if ( x > MAX_STIRLING ) {
		v = pow( x, ( 0.5*x ) - 0.25 );
		y = v * (v/y);
	} else {
		y = pow( x, x-0.5 ) / y;
	}
	return SQRT_TWO_PI * y * w;
}


// EXPORTS //

module.exports = gamma;

},{"./polyval_s.js":128,"@stdlib/constants/math/float64-sqrt-two-pi":48,"@stdlib/math/base/special/exp":107,"@stdlib/math/base/special/pow":207}],132:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_64_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006-7, 2013-14.
* (C) Copyright Paul A. Bristow 2007, 2013-14.
* (C) Copyright Nikhar Agrawal 2013-14.
* (C) Copyright Christopher Kormanyos 2013-14.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var gamma = require( '@stdlib/math/base/special/gamma' );
var expm1 = require( '@stdlib/math/base/special/expm1' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var lgammaSmallImp = require( './lgamma_small_imp.js' );


// MAIN //

/**
* Computes `gamma(x+1) - 1`.
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = gammap1m1( 0.2 );
* // returns ~-0.082
*
* @example
* var v = gammap1m1( -9.2 );
* // returns -1.0
*
* @example
* var v = gammap1m1( 0.0 );
* // returns 0.0
*
* @example
* var v = gammap1m1( -3.0 );
* // returns NaN
*
* @example
* var v = gammap1m1( NaN );
* // returns NaN
*/
function gammap1m1( x ) {
	if ( isnan( x ) ) {
		return NaN;
	}
	if ( x < 0.0 ) {
		if ( x < -0.5 ) {
			// Best method is simply to subtract 1 from gamma:
			return gamma( 1.0+x ) - 1.0;
		}
		// Use expm1 on the logarithm of gamma:
		return expm1( -log1p( x ) + lgammaSmallImp( x+2.0, x+1.0, x ) );
	}
	if ( x < 2.0 ) {
		// Use expm1 on the logarithm of gamma:
		return expm1( lgammaSmallImp( x+1.0, x, x-1.0 ) );
	}
	// Best method is simply to subtract 1 from gamma:
	return gamma( 1.0+x ) - 1.0;
}


// EXPORTS //

module.exports = gammap1m1;

},{"./lgamma_small_imp.js":134,"@stdlib/math/base/assert/is-nan":59,"@stdlib/math/base/special/expm1":110,"@stdlib/math/base/special/gamma":127,"@stdlib/math/base/special/log1p":196}],133:[function(require,module,exports){
'use strict';

/**
* Compute `gamma(x+1) - 1` without cancellation errors.
*
* @module @stdlib/math/base/special/gamma1pm1
*
* @example
* var gamma1pm1 = require( '@stdlib/math/base/special/gamma1pm1' );
*
* var v = gamma1pm1( 0.2 );
* // returns ~-0.082
*
* v = gamma1pm1( -5.3 );
* // returns ~-1.102
*
* v = gamma1pm1( 0.0 );
* // returns 0.0
*
* v = gamma1pm1( NaN );
* // returns NaN
*/

// MODULES //

var gamma1pm1 = require( './gamma1pm1.js' );


// EXPORTS //

module.exports = gamma1pm1;

},{"./gamma1pm1.js":132}],134:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_64_0/boost/math/special_functions/detail/lgamma_small.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006-7, 2013-14.
* (C) Copyright Paul A. Bristow 2007, 2013-14.
* (C) Copyright Nikhar Agrawal 2013-14.
* (C) Copyright Christopher Kormanyos 2013-14.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var ln = require( '@stdlib/math/base/special/ln' );
var EPS = require( '@stdlib/constants/math/float64-eps' );
var rateval1 = require( './rational_p1q1.js' );
var rateval2 = require( './rational_p2q2.js' );
var rateval3 = require( './rational_p3q3.js' );


// VARIABLES //

var Y1 = 0.158963680267333984375;
var Y2 = 0.52815341949462890625;
var Y3 = 0.452017307281494140625;


// MAIN //

/**
* Evaluates the natural logarithm of the gamma function for small arguments.
*
* ## Method
*
* 1.  For \\( z > 2 \\), begin by performing argument reduction until \\( z \\) is in \\(\[2,3)\\). Use the following form:
*
*     ```tex
*     \operatorname{gammaln}(z) = (z-2)(z+1)(Y + R(z-2))
*     ```
*
*     where \\( R(z-2) \\) is a rational approximation optimized for low absolute error. As long as the absolute error is small compared to the constant \\( Y \\), then any rounding error in the computation will get wiped out.
*
* 2.  If \\( z < 1 \\), use recurrence to shift to \\( z \\) in the interval \\(\[1,2\]\\). Then, use one of two approximations: one for \\( z \\) in \\(\[1,1.5\]\\) and one for \\( z \\) in \\(\[1.5,2\]\\):
*
*     -   For \(( z \\) in \\(\[1,1.5\]\\), use
*
*         ```tex
*         \operatorname{gammaln}(z) = (z-1)(z-2)(Y + R(z-1))
*         ```
*
*         where \\( R(z-1) \\) is a rational approximation optimized for low absolute error. As long as the absolute error is small compared to the constant \\( Y \\), then any rounding error in the computation will get wiped out.
*
*     -   For \\( z \\) in \\(\[1.5,2\]\\), use
*
*         ```tex
*         \operatorname{gammaln}(z) = (2-z)(1-z)(Y + R(2-z))
*         ```
*
*         where \\( R(2-z) \\) is a rational approximation optimized for low absolute error. As long as the absolute error is small compared to the constant \\( Y \\), then any rounding error in the computation will get wiped out.
*
*
* ## Notes
*
* -   Relative error:
*
*     | function | peak         | maximum deviation |
*     |:--------:|:------------:|:-----------------:|
*     | R(Z-2)   | 4.231e-18    | 5.900e-24         |
*     | R(Z-1)   | 1.230011e-17 | 3.139e-021        |
*     | R(2-Z)   | 1.797565e-17 | 2.151e-021        |
*
*
* @private
* @param {number} z - input value
* @param {number} zm1 - `z` minus one
* @param {number} zm2 - `z` minus two
* @returns {number} function value
*/
function lgammaSmallImp( z, zm1, zm2 ) {
	var prefix;
	var result;
	var r;
	var R;

	if ( z < EPS ) {
		return -ln( z );
	}
	if ( zm1 === 0.0 || zm2 === 0.0 ) {
		return 0.0;
	}
	result = 0.0;
	if ( z > 2.0 ) {
		if ( z >= 3.0 ) {
			do {
				z -= 1.0;
				zm2 -= 1.0;
				result += ln(z);
			} while ( z >= 3.0 );
			zm2 = z - 2.0;
		}
		r = zm2 * ( z+1.0 );
		R = rateval1( zm2 );
		result += ( r*Y1 ) + ( r*R );
		return result;
	}
	if ( z < 1.0 ) {
		result += -ln(z);
		zm2 = zm1;
		zm1 = z;
		z += 1.0;
	}
	if ( z <= 1.5 ) {
		r = rateval2( zm1 );
		prefix = zm1 * zm2;
		result += ( prefix*Y2 ) + ( prefix*r );
		return result;
	}
	// Case: 1.5 < z <= 2
	r = zm2 * zm1;
	R = rateval3( -zm2 );
	result += ( r*Y3 ) + ( r*R );
	return result;
}


// EXPORTS //

module.exports = lgammaSmallImp;

},{"./rational_p1q1.js":135,"./rational_p2q2.js":136,"./rational_p3q3.js":137,"@stdlib/constants/math/float64-eps":28,"@stdlib/math/base/special/ln":192}],135:[function(require,module,exports){
/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a rational function, i.e., the ratio of two polynomials described by the coefficients stored in \\(P\\) and \\(Q\\).
*
* ## Notes
*
* -   Coefficients should be sorted in ascending degree.
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the rational function
* @returns {number} evaluated rational function
*/
function evalrational( x ) {
	var ax;
	var s1;
	var s2;
	if ( x === 0.0 ) {
		return -0.01803556856784494;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = -0.01803556856784494 + (x * (0.02512664961998968 + (x * (0.049410315156753225 + (x * (0.0172491608709614 + (x * (-0.0002594535632054381 + (x * (-0.0005410098692152044 + (x * (-0.00003245886498259485 + (x * 0.0))))))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (1.962029871977952 + (x * (1.4801966942423133 + (x * (0.5413914320717209 + (x * (0.09885042511280101 + (x * (0.008213096746488934 + (x * (0.00022493629192211576 + (x * -2.2335276320861708e-7))))))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = 0.0 + (x * (-0.00003245886498259485 + (x * (-0.0005410098692152044 + (x * (-0.0002594535632054381 + (x * (0.0172491608709614 + (x * (0.049410315156753225 + (x * (0.02512664961998968 + (x * -0.01803556856784494))))))))))))); // eslint-disable-line max-len
		s2 = -2.2335276320861708e-7 + (x * (0.00022493629192211576 + (x * (0.008213096746488934 + (x * (0.09885042511280101 + (x * (0.5413914320717209 + (x * (1.4801966942423133 + (x * (1.962029871977952 + (x * 1.0))))))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

},{}],136:[function(require,module,exports){
/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a rational function, i.e., the ratio of two polynomials described by the coefficients stored in \\(P\\) and \\(Q\\).
*
* ## Notes
*
* -   Coefficients should be sorted in ascending degree.
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the rational function
* @returns {number} evaluated rational function
*/
function evalrational( x ) {
	var ax;
	var s1;
	var s2;
	if ( x === 0.0 ) {
		return 0.04906224540690395;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = 0.04906224540690395 + (x * (-0.09691175301595212 + (x * (-0.4149833583594954 + (x * (-0.4065671242119384 + (x * (-0.1584135863906922 + (x * (-0.024014982064857155 + (x * -0.0010034668769627955))))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (3.0234982984646304 + (x * (3.4873958536072385 + (x * (1.9141558827442668 + (x * (0.5071377386143635 + (x * (0.05770397226904519 + (x * 0.001957681026011072))))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = -0.0010034668769627955 + (x * (-0.024014982064857155 + (x * (-0.1584135863906922 + (x * (-0.4065671242119384 + (x * (-0.4149833583594954 + (x * (-0.09691175301595212 + (x * 0.04906224540690395))))))))))); // eslint-disable-line max-len
		s2 = 0.001957681026011072 + (x * (0.05770397226904519 + (x * (0.5071377386143635 + (x * (1.9141558827442668 + (x * (3.4873958536072385 + (x * (3.0234982984646304 + (x * 1.0))))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

},{}],137:[function(require,module,exports){
/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a rational function, i.e., the ratio of two polynomials described by the coefficients stored in \\(P\\) and \\(Q\\).
*
* ## Notes
*
* -   Coefficients should be sorted in ascending degree.
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the rational function
* @returns {number} evaluated rational function
*/
function evalrational( x ) {
	var ax;
	var s1;
	var s2;
	if ( x === 0.0 ) {
		return -0.029232972183027003;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = -0.029232972183027003 + (x * (0.14421626775719232 + (x * (-0.14244039073863127 + (x * (0.05428096940550536 + (x * (-0.008505359768683364 + (x * (0.0004311713426792973 + (x * 0.0))))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (-1.5016935605448505 + (x * (0.846973248876495 + (x * (-0.22009515181499575 + (x * (0.02558279715597587 + (x * (-0.0010066679553914337 + (x * -8.271935218912905e-7))))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = 0.0 + (x * (0.0004311713426792973 + (x * (-0.008505359768683364 + (x * (0.05428096940550536 + (x * (-0.14244039073863127 + (x * (0.14421626775719232 + (x * -0.029232972183027003))))))))))); // eslint-disable-line max-len
		s2 = -8.271935218912905e-7 + (x * (-0.0010066679553914337 + (x * (0.02558279715597587 + (x * (-0.22009515181499575 + (x * (0.846973248876495 + (x * (-1.5016935605448505 + (x * 1.0))))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

},{}],138:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var exp = require( '@stdlib/math/base/special/exp' );


// MAIN //

/**
* Calculates normalized Q when a is an integer.
*
* @private
* @param {integer} a - function parameter
* @param {number} x - function parameter
* @returns {number} upper gamma fraction
*/
function finiteGammaQ( a, x ) {
	var term;
	var sum;
	var e;
	var n;

	e = exp( -x );
	sum = e;
	if ( sum !== 0.0 ) {
		term = sum;
		for ( n = 1; n < a; ++n ) {
			term /= n;
			term *= x;
			sum += term;
		}
	}
	return sum;
}


// EXPORTS //

module.exports = finiteGammaQ;

},{"@stdlib/math/base/special/exp":107}],139:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var erfc = require( '@stdlib/math/base/special/erfc' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var exp = require( '@stdlib/math/base/special/exp' );
var PI = require( '@stdlib/constants/math/float64-pi' );


// MAIN //

/**
* Calculates normalized Q when a is a half-integer.
*
* @private
* @param {number} a - function parameter
* @param {number} x - function parameter
* @returns {number} upper gamma fraction
*/
function finiteHalfGammaQ( a, x ) {
	var half;
	var term;
	var sum;
	var e;
	var n;

	e = erfc( sqrt(x) );
	if ( e !== 0 && a > 1.0 ) {
		term = exp( -x ) / sqrt( PI * x );
		term *= x;
		half = 0.5;
		term /= half;
		sum = term;
		for ( n = 2; n < a; ++n ) {
			term /= n - half;
			term *= x;
			sum += term;
		}
		e += sum;
	}
	return e;
}


// EXPORTS //

module.exports = finiteHalfGammaQ;

},{"@stdlib/constants/math/float64-pi":44,"@stdlib/math/base/special/erfc":96,"@stdlib/math/base/special/exp":107,"@stdlib/math/base/special/sqrt":230}],140:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var ln = require( '@stdlib/math/base/special/ln' );
var MAX_LN = require( '@stdlib/constants/math/float64-max-ln' );
var MIN_LN = require( '@stdlib/constants/math/float64-min-ln' );


// MAIN //

/**
* Calculates the power term prefix `(z^a)(e^-z)` used in the non-normalized incomplete gammas.
*
* @private
* @param {number} a - function parameter
* @param {number} z - function parameter
* @returns {number} power term prefix
*/
function fullIGammaPrefix( a, z ) {
	var prefix;
	var alz;

	alz = a * ln( z );
	if ( z >= 1.0 ) {
		if ( ( alz < MAX_LN ) && ( -z > MIN_LN ) ) {
			prefix = pow( z, a ) * exp( -z );
		}
		else if ( a >= 1.0 ) {
			prefix = pow( z / exp(z/a), a );
		}
		else {
			prefix = exp( alz - z );
		}
	}
	else {
		/* eslint-disable no-lonely-if */
		if ( alz > MIN_LN ) {
			prefix = pow( z, a ) * exp( -z );
		}
		else if ( z/a < MAX_LN ) {
			prefix = pow( z / exp(z/a), a );
		} else {
			prefix = exp( alz - z );
		}
	}
	return prefix;
}


// EXPORTS //

module.exports = fullIGammaPrefix;

},{"@stdlib/constants/math/float64-max-ln":39,"@stdlib/constants/math/float64-min-ln":42,"@stdlib/math/base/special/exp":107,"@stdlib/math/base/special/ln":192,"@stdlib/math/base/special/pow":207}],141:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_62_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006-7, 2013-14.
* (C) Copyright Paul A. Bristow 2007, 2013-14.
* (C) Copyright Nikhar Agrawal 2013-14.
* (C) Christopher Kormanyos 2013-14.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var gammaln = require( '@stdlib/math/base/special/gammaln' );
var floor = require( '@stdlib/math/base/special/floor' );
var gamma = require( '@stdlib/math/base/special/gamma' );
var abs = require( '@stdlib/math/base/special/abs' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var ln = require( '@stdlib/math/base/special/ln' );
var SQRT_EPSILON = require( '@stdlib/constants/math/float64-sqrt-eps' );
var FLOAT64_MAX = require( '@stdlib/constants/math/float64-max' );
var SQRT_TWO_PI = require( '@stdlib/constants/math/float64-sqrt-two-pi' );
var MAX_LN = require( '@stdlib/constants/math/float64-max-ln' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var finiteGammaQ = require( './finite_gamma_q.js' );
var finiteHalfGammaQ = require( './finite_half_gamma_q.js' );
var fullIGammaPrefix = require( './full_igamma_prefix.js' );
var igammaTemmeLarge = require( './igamma_temme_large.js' );
var lowerGammaSeries = require( './lower_gamma_series.js' );
var regularisedGammaPrefix = require( './regularised_gamma_prefix.js' );
var tgammaSmallUpperPart = require( './tgamma_small_upper_part.js' );
var upperGammaFraction = require( './upper_gamma_fraction.js' );


// VARIABLES //

var MAX_FACTORIAL = 170; // TODO: consider extracting as a constant


// MAIN //

/**
* Computes the regularized incomplete gamma function. The upper tail is calculated via the modified Lentz's method for computing continued fractions, the lower tail using a power expansion.
*
*
* ## Notes
*
* -   When `a >= MAX_FACTORIAL` and computing the non-normalized incomplete gamma, result is rather hard to compute unless we use logs. There are really two options a) if `x` is a long way from `a` in value then we can reliably use methods 2 and 4 below in logarithmic form and go straight to the result. Otherwise we let the regularized gamma take the strain (the result is unlikely to underflow in the central region anyway) and combine with `lgamma` in the hopes that we get a finite result.
*
* @param {NonNegativeNumber} x - function parameter
* @param {PositiveNumber} a - function parameter
* @param {boolean} [regularized=true] - boolean indicating if the function should evaluate the regularized or non-regularized incomplete gamma functions
* @param {boolean} [upper=false] - boolean indicating if the function should return the upper tail of the incomplete gamma function
* @returns {number} function value
*/
function gammainc( x, a, regularized, upper ) {
	var optimisedInvert;
	var normalized;
	var evalMethod;
	var initValue;
	var isHalfInt;
	var useTemme;
	var isSmallA;
	var invert;
	var result;
	var isInt;
	var sigma;
	var gam;
	var res;
	var fa;
	var g;

	if ( x < 0.0 || a <= 0.0 ) {
		return NaN;
	}
	normalized = ( regularized === void 0 ) ? true : regularized;
	invert = upper;
	result = 0.0;
	if ( a >= MAX_FACTORIAL && !normalized ) {
		if ( invert && ( a * 4.0 < x ) ) {
			// This is method 4 below, done in logs:
			result = ( a * ln(x) ) - x;
			result += ln( upperGammaFraction( a, x ) );
		}
		else if ( !invert && ( a > 4.0 * x ) ) {
			// This is method 2 below, done in logs:
			result = ( a * ln(x) ) - x;
			initValue = 0;
			result += ln( lowerGammaSeries( a, x, initValue ) / a );
		}
		else {
			result = gammainc( a, x, true, invert );
			if ( result === 0.0 ) {
				if ( invert ) {
					// Try http://functions.wolfram.com/06.06.06.0039.01
					result = 1.0 + ( 1.0 / (12.0*a) ) + ( 1.0 / (288.0*a*a) );
					result = ln( result ) - a + ( ( a-0.5 ) * ln(a) );
					result += ln( SQRT_TWO_PI );
				} else {
					// This is method 2 below, done in logs, we're really outside the range of this method, but since the result is almost certainly infinite, we should probably be OK:
					result = ( a * ln( x ) ) - x;
					initValue = 0.0;
					result += ln( lowerGammaSeries( a, x, initValue ) / a);
				}
			}
			else {
				result = ln( result ) + gammaln( a );
			}
		}
		if ( result > MAX_LN ) {
			return PINF;
		}
		return exp( result );
	}
	isSmallA = ( a < 30 ) && ( a <= x + 1.0 ) && ( x < MAX_LN );
	if ( isSmallA ) {
		fa = floor( a );
		isInt = ( fa === a );
		isHalfInt = isInt ? false : ( abs( fa - a ) === 0.5 );
	} else {
		isInt = isHalfInt = false;
	}
	if ( isInt && x > 0.6 ) {
		// Calculate Q via finite sum:
		invert = !invert;
		evalMethod = 0;
	}
	else if ( isHalfInt && x > 0.2 ) {
		// Calculate Q via finite sum for half integer a:
		invert = !invert;
		evalMethod = 1;
	}
	else if ( x < SQRT_EPSILON && a > 1.0 ) {
		evalMethod = 6;
	}
	else if ( x < 0.5 ) {
		// Changeover criterion chosen to give a changeover at Q ~ 0.33:
		if ( -0.4 / ln( x ) < a ) {
			evalMethod = 2;
		} else {
			evalMethod = 3;
		}
	}
	else if ( x < 1.1 ) {
		// Changeover here occurs when P ~ 0.75 or Q ~ 0.25:
		if ( x * 0.75 < a ) {
			evalMethod = 2;
		} else {
			evalMethod = 3;
		}
	}
	else {
		// Begin by testing whether we're in the "bad" zone where the result will be near 0.5 and the usual series and continued fractions are slow to converge:
		useTemme = false;
		if ( normalized && a > 20 ) {
			sigma = abs( (x-a)/a );
			if ( a > 200 ) {
				// Limit chosen so that we use Temme's expansion only if the result would be larger than about 10^-6. Below that the regular series and continued fractions converge OK, and if we use Temme's method we get increasing errors from the dominant erfc term as it's (inexact) argument increases in magnitude.
				if ( 20 / a > sigma * sigma ) {
					useTemme = true;
				}
			} else if ( sigma < 0.4 ) {
				useTemme = true;
			}
		}
		if ( useTemme ) {
			evalMethod = 5;
		}
		// Regular case where the result will not be too close to 0.5: Changeover occurs at P ~ Q ~ 0.5. Note that series computation of P is about x2 faster than continued fraction calculation of Q, so try and use the CF only when really necessary, especially for small x.
		else if ( x - ( 1.0 / (3.0 * x) ) < a ) {
			evalMethod = 2;
		} else {
			evalMethod = 4;
			invert = !invert;
		}
	}

	/* eslint-disable default-case */
	switch ( evalMethod ) {
	case 0:
		result = finiteGammaQ( a, x );
		if (normalized === false ) {
			result *= gamma( a );
		}
		break;
	case 1:
		result = finiteHalfGammaQ( a, x );
		if ( normalized === false ) {
			result *= gamma( a );
		}
		break;
	case 2:
		// Compute P:
		result = normalized ?
			regularisedGammaPrefix( a, x ) :
			fullIGammaPrefix( a, x );
		if ( result !== 0.0 ) {
			initValue = 0.0;
			optimisedInvert = false;
			if ( invert ) {
				initValue = normalized ? 1.0 : gamma(a);
				if (
					normalized ||
					result >= 1.0 ||
					FLOAT64_MAX * result > initValue
				) {
					initValue /= result;
					if (
						normalized ||
						a < 1.0 ||
						( FLOAT64_MAX / a > initValue )
					) {
						initValue *= -a;
						optimisedInvert = true;
					}
					else {
						initValue = 0.0;
					}
				}
				else {
					initValue = 0.0;
				}
			}
		}
		result *= lowerGammaSeries( a, x, initValue ) / a;
		if ( optimisedInvert ) {
			invert = false;
			result = -result;
		}
		break;
	case 3:
		// Compute Q:
		invert = !invert;
		res = tgammaSmallUpperPart( a, x, invert );
		result = res[ 0 ];
		g = res[ 1 ];
		invert = false;
		if ( normalized ) {
			result /= g;
		}
		break;
	case 4:
		// Compute Q:
		result = normalized ?
			regularisedGammaPrefix( a, x ) :
			fullIGammaPrefix( a, x );
		if ( result !== 0 ) {
			result *= upperGammaFraction( a, x );
		}
		break;
	case 5:
		result = igammaTemmeLarge( a, x );
		if ( x >= a ) {
			invert = !invert;
		}
		break;
	case 6:
		// Since x is so small that P is necessarily very small too, use http://functions.wolfram.com/GammaBetaErf/GammaRegularized/06/01/05/01/01/
		result = normalized ?
			pow(x, a) / gamma( a + 1.0 ) :
			pow( x, a ) / a;
		result *= 1.0 - ( a * x / ( a + 1.0 ) );
		break;
	}
	if ( normalized && result > 1.0 ) {
		result = 1.0;
	}
	if ( invert ) {
		gam = normalized ? 1.0 : gamma( a );
		result = gam - result;
	}
	return result;
}


// EXPORTS //

module.exports = gammainc;

},{"./finite_gamma_q.js":138,"./finite_half_gamma_q.js":139,"./full_igamma_prefix.js":140,"./igamma_temme_large.js":142,"./lower_gamma_series.js":144,"./regularised_gamma_prefix.js":155,"./tgamma_small_upper_part.js":157,"./upper_gamma_fraction.js":158,"@stdlib/constants/math/float64-max":40,"@stdlib/constants/math/float64-max-ln":39,"@stdlib/constants/math/float64-pinf":45,"@stdlib/constants/math/float64-sqrt-eps":47,"@stdlib/constants/math/float64-sqrt-two-pi":48,"@stdlib/math/base/special/abs":77,"@stdlib/math/base/special/exp":107,"@stdlib/math/base/special/floor":116,"@stdlib/math/base/special/gamma":127,"@stdlib/math/base/special/gammaln":161,"@stdlib/math/base/special/ln":192,"@stdlib/math/base/special/pow":207}],142:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var evalpoly = require( '@stdlib/math/base/tools/evalpoly' );
var erfc = require( '@stdlib/math/base/special/erfc' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var exp = require( '@stdlib/math/base/special/exp' );
var ln = require( '@stdlib/math/base/special/ln' );
var PI = require( '@stdlib/constants/math/float64-pi' );
var polyvalC0 = require( './polyval_c0.js' );
var polyvalC1 = require( './polyval_c1.js' );
var polyvalC2 = require( './polyval_c2.js' );
var polyvalC3 = require( './polyval_c3.js' );
var polyvalC4 = require( './polyval_c4.js' );
var polyvalC5 = require( './polyval_c5.js' );
var polyvalC6 = require( './polyval_c6.js' );
var polyvalC7 = require( './polyval_c7.js' );
var polyvalC8 = require( './polyval_c8.js' );


// VARIABLES //

// Pre-allocate workspace array:
var workspace = new Array( 10 ); // WARNING: not thread safe


// MAIN //

/**
* Asymptotic expansions of the incomplete gamma functions when `a` is large and `x ~ a` (IEEE double precision or 10^-17).
*
* @private
* @param {number} a - function parameter
* @param {number} x - function parameter
* @returns {number} value of asymptotic expansion
*/
function igammaTemmeLarge( a, x ) {
	var result;
	var sigma;
	var phi;
	var y;
	var z;

	sigma = ( x - a ) / a;
	phi = -ln( 1 + sigma ) + sigma;
	y = a * phi;
	z = sqrt( 2 * phi );
	if ( x < a ) {
		z = -z;
	}
	workspace[ 0 ] = polyvalC0( z );
	workspace[ 1 ] = polyvalC1( z );
	workspace[ 2 ] = polyvalC2( z );
	workspace[ 3 ] = polyvalC3( z );
	workspace[ 4 ] = polyvalC4( z );
	workspace[ 5 ] = polyvalC5( z );
	workspace[ 6 ] = polyvalC6( z );
	workspace[ 7 ] = polyvalC7( z );
	workspace[ 8 ] = polyvalC8( z );
	workspace[ 9 ] = -0.00059676129019274625;
	result = evalpoly( workspace, 1.0/a );
	result *= exp( -y ) / sqrt( 2.0 * PI * a );
	if ( x < a ) {
		result = -result;
	}
	result += erfc( sqrt(y) ) / 2.0;
	return result;
}


// EXPORTS //

module.exports = igammaTemmeLarge;

},{"./polyval_c0.js":146,"./polyval_c1.js":147,"./polyval_c2.js":148,"./polyval_c3.js":149,"./polyval_c4.js":150,"./polyval_c5.js":151,"./polyval_c6.js":152,"./polyval_c7.js":153,"./polyval_c8.js":154,"@stdlib/constants/math/float64-pi":44,"@stdlib/math/base/special/erfc":96,"@stdlib/math/base/special/exp":107,"@stdlib/math/base/special/ln":192,"@stdlib/math/base/special/sqrt":230,"@stdlib/math/base/tools/evalpoly":238}],143:[function(require,module,exports){
'use strict';

/**
* Evaluate the incomplete gamma function.
*
* @module @stdlib/math/base/special/gammainc
*
* @example
* var gammainc = require( '@stdlib/math/base/special/gammainc' );
*
* var v = gammainc( 6.0, 2.0 );
* // returns ~0.9826
*
* v = gammainc( 1.0, 2.0, true, true );
* // returns ~0.7358
*
* v = gammainc( 7.0, 5.0 );
* // returns ~0.8270
*
* v = gammainc( 7.0, 5.0, false );
* // returns ~19.8482
*
* v = gammainc( NaN, 2.0 );
* // returns NaN
*
* v = gammainc( 6.0, NaN );
* // returns NaN
*/

// MODULES //

var gammainc = require( './gammainc.js' );


// EXPORTS //

module.exports = gammainc;

},{"./gammainc.js":141}],144:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var sumSeries = require( '@stdlib/math/base/tools/sum-series' );
var lowerIncompleteGammaSeries = require( './lower_incomplete_gamma_series' );


// MAIN //

/**
* Sums elements of the series expansion of the lower incomplete gamma function.
*
* ## Method
*
* -   Multiply result by `((z^a) * (e^-z) / a)` to get the full lower incomplete integral.
* -   Divide by `tgamma(a)` to get the normalized value.
*
* @private
* @param {number} a - function parameter
* @param {number} z - function parameter
* @param {number} initialValue - initial value of the resulting sum
* @returns {number} sum of terms of lower gamma series
*/
function lowerGammaSeries( a, z, initialValue ) {
	var result;
	var s;

	initialValue = initialValue || 0.0;
	s = lowerIncompleteGammaSeries( a, z );
	result = sumSeries( s, {
		'initialValue': initialValue
	});
	return result;
}


// EXPORTS //

module.exports = lowerGammaSeries;

},{"./lower_incomplete_gamma_series":145,"@stdlib/math/base/tools/sum-series":241}],145:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MAIN //

/**
* Creates a function to evaluate a series expansion of the incomplete gamma function.
*
* @private
* @param {number} a1 - function parameter
* @param {number} z1 - function parameter
* @returns {Function} series function
*/
function lowerIncompleteGammaSeries( a1, z1 ) {
	var result = 1.0;
	var a = a1;
	var z = z1;
	return next;

	/**
	* Calculate the next term of the series.
	*
	* @private
	* @returns {number} series expansion term
	*/
	function next() {
		var r = result;
		a += 1.0;
		result *= z/a;
		return r;
	}
}


// EXPORTS //

module.exports = lowerIncompleteGammaSeries;

},{}],146:[function(require,module,exports){
/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* ## Notes
*
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*/
function evalpoly( x ) {
	if ( x === 0.0 ) {
		return -0.3333333333333333;
	}
	return -0.3333333333333333 + (x * (0.08333333333333333 + (x * (-0.014814814814814815 + (x * (0.0011574074074074073 + (x * (0.0003527336860670194 + (x * (-0.0001787551440329218 + (x * (0.00003919263178522438 + (x * (-0.0000021854485106799924 + (x * (-0.00000185406221071516 + (x * (8.296711340953087e-7 + (x * (-1.7665952736826078e-7 + (x * (6.707853543401498e-9 + (x * (1.0261809784240309e-8 + (x * (-4.382036018453353e-9 + (x * 9.14769958223679e-10))))))))))))))))))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],147:[function(require,module,exports){
/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* ## Notes
*
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*/
function evalpoly( x ) {
	if ( x === 0.0 ) {
		return -0.001851851851851852;
	}
	return -0.001851851851851852 + (x * (-0.003472222222222222 + (x * (0.0026455026455026454 + (x * (-0.0009902263374485596 + (x * (0.00020576131687242798 + (x * (-4.018775720164609e-7 + (x * (-0.000018098550334489977 + (x * (0.00000764916091608111 + (x * (-0.0000016120900894563446 + (x * (4.647127802807434e-9 + (x * (1.378633446915721e-7 + (x * (-5.752545603517705e-8 + (x * 1.1951628599778148e-8))))))))))))))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],148:[function(require,module,exports){
/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* ## Notes
*
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*/
function evalpoly( x ) {
	if ( x === 0.0 ) {
		return 0.004133597883597883;
	}
	return 0.004133597883597883 + (x * (-0.0026813271604938273 + (x * (0.0007716049382716049 + (x * (0.0000020093878600823047 + (x * (-0.00010736653226365161 + (x * (0.000052923448829120125 + (x * (-0.000012760635188618728 + (x * (3.423578734096138e-8 + (x * (0.0000013721957309062932 + (x * (-6.298992138380055e-7 + (x * 1.4280614206064242e-7))))))))))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],149:[function(require,module,exports){
/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* ## Notes
*
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*/
function evalpoly( x ) {
	if ( x === 0.0 ) {
		return 0.0006494341563786008;
	}
	return 0.0006494341563786008 + (x * (0.00022947209362139917 + (x * (-0.0004691894943952557 + (x * (0.00026772063206283885 + (x * (-0.00007561801671883977 + (x * (-2.396505113867297e-7 + (x * (0.000011082654115347302 + (x * (-0.0000056749528269915965 + (x * 0.0000014230900732435883))))))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],150:[function(require,module,exports){
/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* ## Notes
*
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*/
function evalpoly( x ) {
	if ( x === 0.0 ) {
		return -0.0008618882909167117;
	}
	return -0.0008618882909167117 + (x * (0.0007840392217200666 + (x * (-0.0002990724803031902 + (x * (-0.0000014638452578843418 + (x * (0.00006641498215465122 + (x * (-0.00003968365047179435 + (x * 0.000011375726970678419))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],151:[function(require,module,exports){
/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* ## Notes
*
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*/
function evalpoly( x ) {
	if ( x === 0.0 ) {
		return -0.00033679855336635813;
	}
	return -0.00033679855336635813 + (x * (-0.00006972813758365858 + (x * (0.0002772753244959392 + (x * (-0.00019932570516188847 + (x * (0.00006797780477937208 + (x * (1.419062920643967e-7 + (x * (-0.000013594048189768693 + (x * (0.000008018470256334202 + (x * -0.000002291481176508095))))))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],152:[function(require,module,exports){
/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* ## Notes
*
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*/
function evalpoly( x ) {
	if ( x === 0.0 ) {
		return 0.0005313079364639922;
	}
	return 0.0005313079364639922 + (x * (-0.0005921664373536939 + (x * (0.0002708782096718045 + (x * (7.902353232660328e-7 + (x * (-0.00008153969367561969 + (x * (0.0000561168275310625 + (x * -0.000018329116582843375))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],153:[function(require,module,exports){
/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* ## Notes
*
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*/
function evalpoly( x ) {
	if ( x === 0.0 ) {
		return 0.00034436760689237765;
	}
	return 0.00034436760689237765 + (x * (0.00005171790908260592 + (x * (-0.00033493161081142234 + (x * (0.0002812695154763237 + (x * -0.00010976582244684731))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],154:[function(require,module,exports){
/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* ## Notes
*
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*/
function evalpoly( x ) {
	if ( x === 0.0 ) {
		return -0.0006526239185953094;
	}
	return -0.0006526239185953094 + (x * (0.0008394987206720873 + (x * -0.000438297098541721))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],155:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_64_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* Copyright John Maddock 2006-7, 2013-14.
* Copyright Paul A. Bristow 2007, 2013-14.
* Copyright Nikhar Agrawal 2013-14.
* Copyright Christopher Kormanyos 2013-14.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var lanczosSumExpGScaled = require( '@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled' );
var gammaln = require( '@stdlib/math/base/special/gammaln' );
var gamma = require( '@stdlib/math/base/special/gamma' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var abs = require( '@stdlib/math/base/special/abs' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var max = require( '@stdlib/math/base/special/max' );
var min = require( '@stdlib/math/base/special/min' );
var ln = require( '@stdlib/math/base/special/ln' );
var MAX_LN = require( '@stdlib/constants/math/float64-max-ln' );
var MIN_LN = require( '@stdlib/constants/math/float64-min-ln' );
var G = require( '@stdlib/constants/math/float64-gamma-lanczos-g' );
var E = require( '@stdlib/constants/math/float64-e' );


// MAIN //

/**
* Computes `(z^a)*(e^-z) / gamma(a)`.
*
* @private
* @param {number} a - input value
* @param {number} z - input value
* @returns {number} function value
*/
function regularisedGammaPrefix( a, z ) {
	var prefix;
	var amza;
	var agh;
	var alz;
	var amz;
	var sq;
	var d;

	agh = a + G - 0.5;
	d = ( (z - a) - G + 0.5 ) / agh;
	if ( a < 1.0 ) {
		// Treat a < 1 as a special case because our Lanczos approximations are optimized against the factorials with a > 1, and for high precision types very small values of `a` can give rather erroneous results for gamma:
		if ( z <= MIN_LN ) {
			// Use logs, so should be free of cancellation errors:
			return exp( ( a * ln(z) ) - z - gammaln( a ) );
		}
		// No danger of overflow as gamma(a) < 1/a for small a, so direct calculation:
		return pow( z, a ) * exp( -z ) / gamma( a );
	}
	else if ( abs(d*d*a) <= 100.0 && a > 150.0 ) {
		// Special case for large a and a ~ z:
		prefix = ( a * ( log1p( d ) - d ) ) + ( z * ( 0.5-G ) / agh );
		prefix = exp( prefix );
	}
	else {
		// General case. Direct computation is most accurate, but use various fallbacks for different parts of the problem domain:
		alz = a * ln(z / agh);
		amz = a - z;
		if (
			min(alz, amz) <= MIN_LN ||
			max(alz, amz) >= MAX_LN
		) {
			amza = amz / a;
			if (
				min(alz, amz)/2.0 > MIN_LN &&
				max(alz, amz)/2.0 < MAX_LN
			) {
				// Compute square root of the result and then square it:
				sq = pow( z / agh, a / 2.0 ) * exp( amz / 2.0 );
				prefix = sq * sq;
			}
			else if (
				min(alz, amz)/4.0 > MIN_LN &&
				max(alz, amz)/4.0 < MAX_LN &&
				z > a
			) {
				// Compute the 4th root of the result then square it twice:
				sq = pow( z / agh, a / 4.0 ) * exp( amz / 4.0 );
				prefix = sq * sq;
				prefix *= prefix;
			}
			else if (
				amza > MIN_LN &&
				amza < MAX_LN
			) {
				prefix = pow( (z * exp(amza)) / agh, a );
			}
			else {
				prefix = exp( alz + amz );
			}
		}
		else
		{
			prefix = pow( z / agh, a ) * exp( amz );
		}
	}
	prefix *= sqrt( agh / E ) / lanczosSumExpGScaled( a );
	return prefix;
}


// EXPORTS //

module.exports = regularisedGammaPrefix;

},{"@stdlib/constants/math/float64-e":27,"@stdlib/constants/math/float64-gamma-lanczos-g":32,"@stdlib/constants/math/float64-max-ln":39,"@stdlib/constants/math/float64-min-ln":42,"@stdlib/math/base/special/abs":77,"@stdlib/math/base/special/exp":107,"@stdlib/math/base/special/gamma":127,"@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled":121,"@stdlib/math/base/special/gammaln":161,"@stdlib/math/base/special/ln":192,"@stdlib/math/base/special/log1p":196,"@stdlib/math/base/special/max":199,"@stdlib/math/base/special/min":203,"@stdlib/math/base/special/pow":207,"@stdlib/math/base/special/sqrt":230}],156:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

/**
* Series representation for upper fraction when `z` is small.
*
* @private
* @param {number} a - function parameter
* @param {number} x - function parameter
* @returns {Function}  series function
*/
function smallGamma2Series( a, x ) {
	var result;
	var apn;
	var n;
	var r;

	result = -x;
	x = -x;
	apn = a + 1.0;
	n = 1;
	return next;

	/**
	* Calculate the next term of the series.
	*
	* @private
	* @returns {number} series expansion term
	*/
	function next() {
		r = result / apn;
		result *= x;
		n += 1;
		result /= n;
		apn += 1.0;
		return r;
	};
}


// EXPORTS //

module.exports = smallGamma2Series;

},{}],157:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var powm1 = require( '@stdlib/math/base/special/powm1' );
var sumSeries = require( '@stdlib/math/base/tools/sum-series' );
var gamma1pm1 = require( '@stdlib/math/base/special/gamma1pm1' );
var smallGamma2Series = require( './small_gamma2_series.js' );


// MAIN //

/**
* Compute the full upper fraction (Q) when `a` is very small.
*
* @private
* @param {number} a - function parameter
* @param {number} x - function parameter
* @param {boolean} invert - boolean indicating if the upper tail of the incomplete gamma function should be evaluated
* @returns {Array} full upper fraction (Q) and pgam
*/
function tgammaSmallUpperPart( a, x, invert ) {
	var initialValue;
	var result;
	var pgam;
	var p;
	var s;

	result = gamma1pm1( a );
	pgam = ( result + 1.0 ) / a;
	p = powm1( x, a );
	result -= p;
	result /= a;
	s = smallGamma2Series( a, x );
	p += 1.0;
	initialValue = invert ? pgam : 0.0;
	result = -p * sumSeries( s, {
		'initialValue': (initialValue - result) / p
	});
	if ( invert ) {
		result = -result;
	}
	return [ result, pgam ];
}


// EXPORTS //

module.exports = tgammaSmallUpperPart;

},{"./small_gamma2_series.js":156,"@stdlib/math/base/special/gamma1pm1":133,"@stdlib/math/base/special/powm1":218,"@stdlib/math/base/tools/sum-series":241}],158:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var continuedFraction = require( '@stdlib/math/base/tools/continued-fraction' );
var upperIncompleteGammaFract = require( './upper_incomplete_gamma_fract' );


// MAIN //

/**
* Evaluate the lower incomplete gamma integral via a series expansion and divide by `gamma(z)` to normalize.
*
* @private
* @param {number} a - function parameter
* @param {number} z - function parameter
* @returns {number} function value
*/
function upperGammaFraction( a, z ) {
	var f = upperIncompleteGammaFract( a, z );
	return 1.0 / ( z - a + 1.0 + continuedFraction( f ) );
}


// EXPORTS //

module.exports = upperGammaFraction;

},{"./upper_incomplete_gamma_fract":159,"@stdlib/math/base/tools/continued-fraction":235}],159:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MAIN //

/**
* Creates a function to evaluate a series expansion of the upper incomplete gamma fraction.
*
* @private
* @param {number} a1 - function parameter
* @param {number} z1 - function parameter
* @returns {Function} series function
*/
function upperIncompleteGammaFract( a1, z1 ) {
	var z = z1 - a1 + 1.0;
	var a = a1;
	var k = 0;
	return next;

	/**
	* Calculate the next term of the series.
	*
	* @private
	* @returns {Array} series expansion terms
	*/
	function next() {
		k += 1;
		z += 2.0;
		return [
			k * (a - k),
			z
		];
	}
}


// EXPORTS //

module.exports = upperIncompleteGammaFract;

},{}],160:[function(require,module,exports){
'use strict';

/*
* The original C code, long comment, copyright, license, and constants are from [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_lgamma_r.c?revision=268523&view=co}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* ====================================================
* Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunPro, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*/

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
var abs = require( '@stdlib/math/base/special/abs' );
var ln = require( '@stdlib/math/base/special/ln' );
var trunc = require( '@stdlib/math/base/special/trunc' );
var sinpi = require( '@stdlib/math/base/special/sinpi' );
var PI = require( '@stdlib/constants/math/float64-pi' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var polyvalA1 = require( './polyval_a1.js' );
var polyvalA2 = require( './polyval_a2.js' );
var polyvalR = require( './polyval_r.js' );
var polyvalS = require( './polyval_s.js' );
var polyvalT1 = require( './polyval_t1.js' );
var polyvalT2 = require( './polyval_t2.js' );
var polyvalT3 = require( './polyval_t3.js' );
var polyvalU = require( './polyval_u.js' );
var polyvalV = require( './polyval_v.js' );
var polyvalW = require( './polyval_w.js' );


// VARIABLES //

var A1C = 7.72156649015328655494e-02; // 0x3FB3C467E37DB0C8
var A2C = 3.22467033424113591611e-01; // 0x3FD4A34CC4A60FAD
var RC = 1.0;
var SC = -7.72156649015328655494e-02; // 0xBFB3C467E37DB0C8
var T1C = 4.83836122723810047042e-01; // 0x3FDEF72BC8EE38A2
var T2C = -1.47587722994593911752e-01; // 0xBFC2E4278DC6C509
var T3C = 6.46249402391333854778e-02; // 0x3FB08B4294D5419B
var UC = -7.72156649015328655494e-02; // 0xBFB3C467E37DB0C8
var VC = 1.0;
var WC = 4.18938533204672725052e-01; // 0x3FDACFE390C97D69
var YMIN = 1.461632144968362245;
var TWO52 = 4503599627370496; // 2**52
var TWO58 = 288230376151711744; // 2**58
var TINY = 8.470329472543003e-22;
var TC = 1.46163214496836224576e+00; // 0x3FF762D86356BE3F
var TF = -1.21486290535849611461e-01; // 0xBFBF19B9BCC38A42
var TT = -3.63867699703950536541e-18; // 0xBC50C7CAA48A971F => TT = -(tail of TF)


// MAIN //

/**
* Evaluates the natural logarithm of the gamma function.
*
* ## Method
*
* 1.  Argument reduction for \\(0 < x \leq 8\\). Since \\(\Gamma(1+s) = s \Gamma(s)\\), for \\(x \in [0,8]\\), we may reduce \\(x\\) to a number in \\([1.5,2.5]\\) by
*
*     ```tex
*     \operatorname{lgamma}(1+s) = \ln(s) + \operatorname{lgamma}(s)
*     ```
*
*     For example,
*
*     ```tex
*     \begin{align}
*     \operatorname{lgamma}(7.3) &= \ln(6.3) + \operatorname{lgamma}(6.3) \\
*     &= \ln(6.3 \cdot 5.3) + \operatorname{lgamma}(5.3) \\
*     &= \ln(6.3 \cdot 5.3 \cdot 4.3 \cdot 3.3 \cdot2.3) + \operatorname{lgamma}(2.3)
*     \end{align}
*     ```
*
* 2.  Compute a polynomial approximation of \\(\mathrm{lgamma}\\) around its
minimum (\\(\mathrm{ymin} = 1.461632144968362245\\)) to maintain monotonicity. On the interval \\([\mathrm{ymin} - 0.23, \mathrm{ymin} + 0.27]\\) (i.e., \\([1.23164,1.73163]\\)), we let \\(z = x - \mathrm{ymin}\\) and use
*
*     ```tex
*     \operatorname{lgamma}(x) = -1.214862905358496078218 + z^2 \cdot \operatorname{poly}(z)
*     ```
*
*     where \\(\operatorname{poly}(z)\\) is a \\(14\\) degree polynomial.
*
* 3.  Compute a rational approximation in the primary interval \\([2,3]\\). Let \\( s = x - 2.0 \\). We can thus use the approximation
*
*     ```tex
*     \operatorname{lgamma}(x) = \frac{s}{2} + s\frac{\operatorname{P}(s)}{\operatorname{Q}(s)}
*     ```
*
*     with accuracy
*
*     ```tex
*     \biggl|\frac{\mathrm{P}}{\mathrm{Q}} - \biggr(\operatorname{lgamma}(x)-\frac{s}{2}\biggl)\biggl| < 2^{-61.71}
*     ```
*
*     The algorithms are based on the observation
*
*     ```tex
*     \operatorname{lgamma}(2+s) = s(1 - \gamma) + \frac{\zeta(2) - 1}{2} s^2 - \frac{\zeta(3) - 1}{3} s^3 + \ldots
*     ```
*
*     where \\(\zeta\\) is the zeta function and \\(\gamma = 0.5772156649...\\) is the Euler-Mascheroni constant, which is very close to \\(0.5\\).
*
* 3.  For \\(x \geq 8\\),
*
*     ```tex
*     \operatorname{lgamma}(x) \approx \biggl(x-\frac{1}{2}\biggr) \ln(x) - x + \frac{\ln(2\pi)}{2} + \frac{1}{12x} - \frac{1}{360x^3} + \ldots
*     ```
*
*     which can be expressed
*
*     ```tex
*     \operatorname{lgamma}(x) \approx \biggl(x-\frac{1}{2}\biggr)(\ln(x)-1)-\frac{\ln(2\pi)-1}{2} + \ldots
*     ```
*
*     Let \\(z = \frac{1}{x}\\). We can then use the approximation
*
*     ```tex
*     f(z) = \operatorname{lgamma}(x) - \biggl(x-\frac{1}{2}\biggr)(\ln(x)-1)
*     ```
*
*     by
*
*     ```tex
*     w = w_0 + w_1 z + w_2 z^3 + w_3 z^5 + \ldots + w_6 z^{11}
*     ```

*     where
*
*     ```tex
*     |w - f(z)| < 2^{-58.74}
*     ```
*
* 4.  For negative \\(x\\), since
*
*     ```tex
*     -x \Gamma(-x) \Gamma(x) = \frac{\pi}{\sin(\pi x)}
*     ```
*
*     where \\(\Gamma\\) is the gamma function, we have
*
*     ```tex
*     \Gamma(x) = \frac{\pi}{\sin(\pi x)(-x)\Gamma(-x)}
*     ```
*
*     Since \\(\Gamma(-x)\\) is positive,
*
*     ```tex
*     \operatorname{sign}(\Gamma(x)) = \operatorname{sign}(\sin(\pi x))
*     ```
*
*     for \\(x < 0\\). Hence, for \\(x < 0\\),
*
*     ```tex
*     \mathrm{signgam} = \operatorname{sign}(\sin(\pi x))
*     ```
*
*     and
*
*     ```tex
*     \begin{align}
*     \operatorname{lgamma}(x) &= \ln(|\Gamma(x)|) \\
*     &= \ln\biggl(\frac{\pi}{|x \sin(\pi x)|}\biggr) - \operatorname{lgamma}(-x)
*     \end{align}
*     ```
*
*     <!-- <note> -->
*
*     Note that one should avoid computing \\(\pi (-x)\\) directly in the computation of \\(\sin(\pi (-x))\\).
*
*     <!-- </note> -->
*
*
* ## Special Cases
*
* ```tex
* \begin{align}
* \operatorname{lgamma}(2+s) &\approx s (1-\gamma) & \mathrm{for\ tiny\ s} \\
* \operatorname{lgamma}(x) &\approx -\ln(x) & \mathrm{for\ tiny\ x} \\
* \operatorname{lgamma}(1) &= 0 & \\
* \operatorname{lgamma}(2) &= 0 & \\
* \operatorname{lgamma}(0) &= \infty & \\
* \operatorname{lgamma}(\infty) &= \infty & \\
* \operatorname{lgamma}(-\mathrm{integer}) &= \pm \infty
* \end{align}
* ```
*
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = gammaln( 1.0 );
* // returns 0.0
*
* @example
* var v = gammaln( 2.0 );
* // returns 0.0
*
* @example
* var v = gammaln( 4.0 );
* // returns ~1.792
*
* @example
* var v = gammaln( -0.5 );
* // returns ~1.266
*
* @example
* var v = gammaln( 0.5 );
* // returns ~0.572
*
* @example
* var v = gammaln( 0.0 );
* // returns Infinity
*
* @example
* var v = gammaln( NaN );
* // returns NaN
*/
function gammaln( x ) {
	var isNegative;
	var nadj;
	var flg;
	var p3;
	var p2;
	var p1;
	var p;
	var q;
	var t;
	var w;
	var y;
	var z;
	var r;

	// Special cases: NaN, +-infinity
	if ( isnan( x ) || isInfinite( x ) ) {
		return x;
	}
	// Special case: 0
	if ( x === 0.0 ) {
		return PINF;
	}
	if ( x < 0.0 ) {
		isNegative = true;
		x = -x;
	} else {
		isNegative = false;
	}
	// If |x| < 2**-70, return -ln(|x|)
	if ( x < TINY ) {
		return -ln( x );
	}
	if ( isNegative ) {
		// If |x| >= 2**52, must be -integer
		if ( x >= TWO52 ) {
			return PINF;
		}
		t = sinpi( x );
		if ( t === 0.0 ) {
			return PINF;
		}
		nadj = ln( PI / abs( t*x ) );
	}
	// If x equals 1 or 2, return 0
	if ( x === 1.0 || x === 2.0 ) {
		return 0.0;
	}
	// If x < 2, use lgamma(x) = lgamma(x+1) - log(x)
	if ( x < 2.0 ) {
		if ( x <= 0.9 ) {
			r = -ln( x );

			// 0.7316 <= x <=  0.9
			if ( x >= ( YMIN - 1.0 + 0.27 ) ) {
				y = 1.0 - x;
				flg = 0;
			}
			// 0.2316 <= x < 0.7316
			else if ( x >= (YMIN - 1.0 - 0.27) ) {
				y = x - (TC - 1.0);
				flg = 1;
			}
			// 0 < x < 0.2316
			else {
				y = x;
				flg = 2;
			}
		} else {
			r = 0.0;

			// 1.7316 <= x < 2
			if ( x >= (YMIN + 0.27) ) {
				y = 2.0 - x;
				flg = 0;
			}
			// 1.2316 <= x < 1.7316
			else if ( x >= (YMIN - 0.27) ) {
				y = x - TC;
				flg = 1;
			}
			// 0.9 < x < 1.2316
			else {
				y = x - 1.0;
				flg = 2;
			}
		}
		switch ( flg ) { // eslint-disable-line default-case
		case 0:
			z = y * y;
			p1 = A1C + (z*polyvalA1( z ));
			p2 = z * (A2C + (z*polyvalA2( z )));
			p = (y*p1) + p2;
			r += ( p - (0.5*y) );
			break;
		case 1:
			z = y * y;
			w = z * y;
			p1 = T1C + (w*polyvalT1( w ));
			p2 = T2C + (w*polyvalT2( w ));
			p3 = T3C + (w*polyvalT3( w ));
			p = (z*p1) - (TT - (w*(p2+(y*p3))));
			r += ( TF + p );
			break;
		case 2:
			p1 = y * (UC + (y*polyvalU( y )));
			p2 = VC + (y*polyvalV( y ));
			r += (-0.5*y) + (p1/p2);
			break;
		}
	}
	// 2 <= x < 8
	else if ( x < 8.0 ) {
		flg = trunc( x );
		y = x - flg;
		p = y * (SC + (y*polyvalS( y )));
		q = RC + (y*polyvalR( y ));
		r = (0.5*y) + (p/q);
		z = 1.0; // gammaln(1+s) = ln(s) + gammaln(s)
		switch ( flg ) { // eslint-disable-line default-case
		case 7:
			z *= y + 6.0;

			/* falls through */
		case 6:
			z *= y + 5.0;

			/* falls through */
		case 5:
			z *= y + 4.0;

			/* falls through */
		case 4:
			z *= y + 3.0;

			/* falls through */
		case 3:
			z *= y + 2.0;
			r += ln( z );
		}
	}
	// 8 <= x < 2**58
	else if ( x < TWO58 ) {
		t = ln( x );
		z = 1.0 / x;
		y = z * z;
		w = WC + (z*polyvalW( y ));
		r = ((x-0.5)*(t-1.0)) + w;
	}
	// 2**58 <= x <= Inf
	else {
		r = x * ( ln(x)-1.0 );
	}
	if ( isNegative ) {
		r = nadj - r;
	}
	return r;
}


// EXPORTS //

module.exports = gammaln;

},{"./polyval_a1.js":162,"./polyval_a2.js":163,"./polyval_r.js":164,"./polyval_s.js":165,"./polyval_t1.js":166,"./polyval_t2.js":167,"./polyval_t3.js":168,"./polyval_u.js":169,"./polyval_v.js":170,"./polyval_w.js":171,"@stdlib/constants/math/float64-pi":44,"@stdlib/constants/math/float64-pinf":45,"@stdlib/math/base/assert/is-infinite":55,"@stdlib/math/base/assert/is-nan":59,"@stdlib/math/base/special/abs":77,"@stdlib/math/base/special/ln":192,"@stdlib/math/base/special/sinpi":228,"@stdlib/math/base/special/trunc":231}],161:[function(require,module,exports){
'use strict';

/**
* Evaluate the natural logarithm of the gamma function.
*
* @module @stdlib/math/base/special/gammaln
*
* @example
* var gammaln = require( '@stdlib/math/base/special/gammaln' );
*
* var v = gammaln( 1.0 );
* // returns 0.0
*
* v = gammaln( 2.0 );
* // returns 0.0
*
* v = gammaln( 4.0 );
* // returns ~1.792
*
* v = gammaln( -0.5 );
* // returns ~1.266
*
* v = gammaln( 0.5 );
* // returns ~0.572
*
* v = gammaln( 0.0 );
* // returns Infinity
*
* v = gammaln( NaN );
* // returns NaN
*/

// MODULES //

var gammaln = require( './gammaln.js' );


// EXPORTS //

module.exports = gammaln;

},{"./gammaln.js":160}],162:[function(require,module,exports){
/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* ## Notes
*
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*/
function evalpoly( x ) {
	if ( x === 0.0 ) {
		return 0.06735230105312927;
	}
	return 0.06735230105312927 + (x * (0.007385550860814029 + (x * (0.0011927076318336207 + (x * (0.00022086279071390839 + (x * 0.000025214456545125733))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],163:[function(require,module,exports){
/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* ## Notes
*
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*/
function evalpoly( x ) {
	if ( x === 0.0 ) {
		return 0.020580808432516733;
	}
	return 0.020580808432516733 + (x * (0.0028905138367341563 + (x * (0.0005100697921535113 + (x * (0.00010801156724758394 + (x * 0.000044864094961891516))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],164:[function(require,module,exports){
/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* ## Notes
*
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*/
function evalpoly( x ) {
	if ( x === 0.0 ) {
		return 1.3920053346762105;
	}
	return 1.3920053346762105 + (x * (0.7219355475671381 + (x * (0.17193386563280308 + (x * (0.01864591917156529 + (x * (0.0007779424963818936 + (x * 0.000007326684307446256))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],165:[function(require,module,exports){
/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* ## Notes
*
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*/
function evalpoly( x ) {
	if ( x === 0.0 ) {
		return 0.21498241596060885;
	}
	return 0.21498241596060885 + (x * (0.325778796408931 + (x * (0.14635047265246445 + (x * (0.02664227030336386 + (x * (0.0018402845140733772 + (x * 0.00003194753265841009))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],166:[function(require,module,exports){
/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* ## Notes
*
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*/
function evalpoly( x ) {
	if ( x === 0.0 ) {
		return -0.032788541075985965;
	}
	return -0.032788541075985965 + (x * (0.006100538702462913 + (x * (-0.0014034646998923284 + (x * 0.00031563207090362595))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],167:[function(require,module,exports){
/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* ## Notes
*
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*/
function evalpoly( x ) {
	if ( x === 0.0 ) {
		return 0.01797067508118204;
	}
	return 0.01797067508118204 + (x * (-0.0036845201678113826 + (x * (0.000881081882437654 + (x * -0.00031275416837512086))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],168:[function(require,module,exports){
/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* ## Notes
*
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*/
function evalpoly( x ) {
	if ( x === 0.0 ) {
		return -0.010314224129834144;
	}
	return -0.010314224129834144 + (x * (0.0022596478090061247 + (x * (-0.0005385953053567405 + (x * 0.0003355291926355191))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],169:[function(require,module,exports){
/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* ## Notes
*
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*/
function evalpoly( x ) {
	if ( x === 0.0 ) {
		return 0.6328270640250934;
	}
	return 0.6328270640250934 + (x * (1.4549225013723477 + (x * (0.9777175279633727 + (x * (0.22896372806469245 + (x * 0.013381091853678766))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],170:[function(require,module,exports){
/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* ## Notes
*
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*/
function evalpoly( x ) {
	if ( x === 0.0 ) {
		return 2.4559779371304113;
	}
	return 2.4559779371304113 + (x * (2.128489763798934 + (x * (0.7692851504566728 + (x * (0.10422264559336913 + (x * 0.003217092422824239))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],171:[function(require,module,exports){
/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* ## Notes
*
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*/
function evalpoly( x ) {
	if ( x === 0.0 ) {
		return 0.08333333333333297;
	}
	return 0.08333333333333297 + (x * (-0.0027777777772877554 + (x * (0.0007936505586430196 + (x * (-0.00059518755745034 + (x * (0.0008363399189962821 + (x * -0.0016309293409657527))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],172:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_61_0/boost/math/special_functions/beta.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var gammaDeltaRatio = require( '@stdlib/math/base/special/gamma-delta-ratio' );
var factorial = require( '@stdlib/math/base/special/factorial' );
var gammainc = require( '@stdlib/math/base/special/gammainc' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var abs = require( '@stdlib/math/base/special/abs' );
var pow = require( '@stdlib/math/base/special/pow' );
var ln = require( '@stdlib/math/base/special/ln' );
var MIN_VALUE = require( '@stdlib/constants/math/float64-smallest-normal' );
var EPSILON = require( '@stdlib/constants/math/float64-eps' );
var fullIGammaPrefix = require( './full_igamma_prefix.js' );
var regularizedGammaPrefix = require( './regularized_gamma_prefix.js' );


// VARIABLES //

var p = new Array( 30 );


// MAIN //

/**
* This is DiDonato and Morris's BGRAT routine, see Eq's 9 through 9.6.
*
* @private
* @param {NonNegativeNumber} a - function parameter
* @param {NonNegativeNumber} b - function parameter
* @param {Probability} x - function parameter
* @param {Probability} y - probability equal to `1-x`
* @param {NonNegativeInteger} s0 - initial value
* @param {number} mult - initial value
* @param {boolean} normalized - boolean indicating whether to evaluate the regularized or non-regularized incomplete beta function
* @returns {number} function value
*/
function betaSmallBLargeASeries( a, b, x, y, s0, mult, normalized ) {
	var prefix;
	var tmp1;
	var tnp1;
	var sum;
	var b2n;
	var bm1;
	var lx2;
	var lxp;
	var mbn;
	var lx;
	var t4;
	var h;
	var j;
	var m;
	var n;
	var r;
	var t;
	var u;

	// Some values we'll need later, these are Eq 9.1:
	bm1 = b - 1.0;
	t = a + ( bm1 / 2.0 );
	if ( y < 0.35 ) {
		lx = log1p( -y );
	} else {
		lx = ln( x );
	}
	u = -t * lx;

	// And from from 9.2:
	h = regularizedGammaPrefix( b, u );
	if ( h <= MIN_VALUE ) {
		return s0;
	}
	if ( normalized ) {
		prefix = h / gammaDeltaRatio( a, b );
		prefix /= pow( t, b );
	} else {
		prefix = fullIGammaPrefix( b, u ) / pow( t, b );
	}
	prefix *= mult;

	// We need the quantity Pn. Unfortunately, this is computed recursively and requires a full history of all the previous values. No choice but to declare a big table and hope it's big enough...
	p[ 0 ] = 1;  // see 9.3.

	// Now an initial value for J, see 9.6: gammainc( u, b, regularized, upper )
	j = gammainc( u, b, true, true );
	j /= h;

	// Now we can start to pull things together and evaluate the sum in Eq 9:
	sum = s0 + ( prefix * j ); // Value at N = 0

	// Some variables we'll need...
	tnp1 = 1.0; // 2*N+1
	lx2 = lx / 2.0;
	lx2 *= lx2;
	lxp = 1.0;
	t4 = 4.0 * t * t;
	b2n = b;
	for ( n = 1; n < p.length; ++n ) {
		// Begin by evaluating the next Pn from Eq 9.4:
		tnp1 += 2.0;
		p[ n ] = 0.0;
		mbn = b - n;
		tmp1 = 3;
		for ( m = 1; m < n; ++m ) {
			mbn = ( m * b ) - n;
			p[ n ] += mbn * p[ n-m ] / factorial( tmp1 );
			tmp1 += 2;
		}
		p[ n ] /= n;
		p[ n ] += bm1 / factorial( tnp1 );

		// Now we want Jn from Jn-1 using Eq 9.6:
		j = ( ( b2n * ( b2n+1.0 ) * j ) + ( ( u+b2n+1.0 ) * lxp ) ) / t4;
		lxp *= lx2;
		b2n += 2.0;

		// Pull it together with Eq 9:
		r = prefix * p[ n ] * j;
		sum += r;
		if ( r > 1.0 ) {
			if ( abs( r ) < abs( EPSILON * sum ) ) {
				break;
			}
		} else if ( abs( r / EPSILON ) < abs( sum ) ) {
			break;
		}
	}
	return sum;
}


// EXPORTS //

module.exports = betaSmallBLargeASeries;

},{"./full_igamma_prefix.js":174,"./regularized_gamma_prefix.js":182,"@stdlib/constants/math/float64-eps":28,"@stdlib/constants/math/float64-smallest-normal":46,"@stdlib/math/base/special/abs":77,"@stdlib/math/base/special/factorial":114,"@stdlib/math/base/special/gamma-delta-ratio":119,"@stdlib/math/base/special/gammainc":143,"@stdlib/math/base/special/ln":192,"@stdlib/math/base/special/log1p":196,"@stdlib/math/base/special/pow":207}],173:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_61_0/boost/math/special_functions/beta.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var binomcoef = require( '@stdlib/math/base/special/binomcoef' );
var floor = require( '@stdlib/math/base/special/floor' );
var pow = require( '@stdlib/math/base/special/pow' );
var MIN_VALUE = require( '@stdlib/constants/math/float64-smallest-normal' );


// MAIN //

/**
* For integer arguments we can relate the incomplete beta to the complement of the binomial distribution cdf and use this finite sum.
*
* @private
* @param {NonNegativeInteger} n - number of trials
* @param {NonNegativeInteger} k - function input
* @param {Probability} x - function input
* @param {Probability} y - probability equal to `1-x`
* @returns {number} sum
*/
function binomialCCDF( n, k, x, y ) {
	var startTerm;
	var result;
	var start;
	var term;
	var i;

	result = pow( x, n );
	if ( result > MIN_VALUE ) {
		term = result;
		for ( i = floor( n - 1 ); i > k; i-- ) {
			term *= ((i + 1) * y) / ((n - i) * x);
			result += term;
		}
	} else {
		// First term underflows so we need to start at the mode of the distribution and work outwards:
		start = floor( n * x );
		if ( start <= k + 1 ) {
			start = floor( k + 2 );
		}
		result = pow( x, start ) * pow( y, n - start );
		result *= binomcoef( floor(n), floor(start) );
		if ( result === 0.0 ) {
			// OK, starting slightly above the mode didn't work, we'll have to sum the terms the old fashioned way:
			for ( i = start - 1; i > k; i-- ) {
				result += pow( x, i ) * pow( y, n - i );
				result *= binomcoef( floor(n), floor(i) );
			}
		} else {
			term = result;
			startTerm = result;
			for ( i = start - 1; i > k; i-- ) {
				term *= ((i + 1) * y) / ((n - i) * x);
				result += term;
			}
			term = startTerm;
			for ( i = start + 1; i <= n; i++ ) {
				term *= (n - i + 1) * x / (i * y);
				result += term;
			}
		}
	}
	return result;
}


// EXPORTS //

module.exports = binomialCCDF;

},{"@stdlib/constants/math/float64-smallest-normal":46,"@stdlib/math/base/special/binomcoef":88,"@stdlib/math/base/special/floor":116,"@stdlib/math/base/special/pow":207}],174:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var ln = require( '@stdlib/math/base/special/ln' );
var MAX_LN = require( '@stdlib/constants/math/float64-max-ln' );
var MIN_LN = require( '@stdlib/constants/math/float64-min-ln' );


// MAIN //

/**
* Calculates the power term prefix `(z^a)(e^-z)` used in the non-normalized incomplete gammas.
*
* @private
* @param {number} a - function parameter
* @param {number} z - function parameter
* @returns {number} power term prefix
*/
function fullIGammaPrefix( a, z ) {
	var prefix;
	var alz;

	alz = a * ln( z );
	if ( z >= 1.0 ) {
		if ( ( alz < MAX_LN ) && ( -z > MIN_LN ) ) {
			prefix = pow( z, a ) * exp( -z );
		}
		else if ( a >= 1.0 ) {
			prefix = pow( z / exp(z/a), a );
		}
		else {
			prefix = exp( alz - z );
		}
	}
	else if ( alz > MIN_LN ) {
		prefix = pow( z, a ) * exp( -z );
	}
	else if ( z/a < MAX_LN ) {
		prefix = pow( z / exp(z/a), a );
	}
	else {
		prefix = exp( alz - z );
	}
	return prefix;
}


// EXPORTS //

module.exports = fullIGammaPrefix;

},{"@stdlib/constants/math/float64-max-ln":39,"@stdlib/constants/math/float64-min-ln":42,"@stdlib/math/base/special/exp":107,"@stdlib/math/base/special/ln":192,"@stdlib/math/base/special/pow":207}],175:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_61_0/boost/math/special_functions/beta.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var ibetaPowerTerms = require( './ibeta_power_terms.js' );


// MAIN //

/**
* Computes the difference between `ibeta(a,b,x)` and `ibeta(a+k,b,x)`.
*
* @private
* @param {NonNegativeNumber} a - function parameter
* @param {NonNegativeNumber} b - function parameter
* @param {Probability} x - function parameter
* @param {Probability} y - probability equal to `1-x`
* @param {NonNegativeInteger} k - function input
* @param {boolean} normalized - boolean indicating whether to evaluate the power terms of the regularized or non-regularized incomplete beta function
* @param {(Array|TypedArray|Object)} out - output array holding the derivative as the second element
* @returns {number} difference between ibeta(a,b,x) and ibeta(a+k,b,x)
*/
function ibetaAStep( a, b, x, y, k, normalized, out ) {
	var prefix;
	var term;
	var sum;
	var i;

	prefix = ibetaPowerTerms( a, b, x, y, normalized );
	if ( out ) {
		out[ 1 ] = prefix;
	}
	prefix /= a;
	if ( prefix === 0.0 ) {
		return prefix;
	}
	sum = 1.0;
	term = 1.0;

	// Series summation from 0 to k-1:
	for ( i = 0; i < k-1; ++i ) {
		term *= (a+b+i) * x / (a+i+1.0);
		sum += term;
	}
	prefix *= sum;
	return prefix;
}


// EXPORTS //

module.exports = ibetaAStep;

},{"./ibeta_power_terms.js":177}],176:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_61_0/boost/math/special_functions/beta.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var continuedFraction = require( '@stdlib/math/base/tools/continued-fraction' );
var ibetaPowerTerms = require( './ibeta_power_terms.js' );


// VARIABLES //

var OPTS = {
	'keep': true,
	'maxIter': 1000
};


// FUNCTIONS //

/**
* Continued fraction for the incomplete beta.
*
* @private
* @param {NonNegativeNumber} a - function parameter
* @param {NonNegativeNumber} b - function parameter
* @param {Probability} x - function parameter
* @param {Probability} y - probability equal to `1-x`
* @returns {Function} series function
*/
function ibetaFraction2t( a, b, x, y ) {
	var m = 0;
	return next;

	/**
	* Calculate the numerator and denominator of the next term of the series.
	*
	* @private
	* @returns {Array} series expansion terms
	*/
	function next() {
		var denom;
		var aN;
		var bN;

		aN = (a + m - 1) * (a + b + m - 1) * m * (b - m) * x * x;
		denom = a + ( 2.0*m ) - 1.0;
		aN /= denom * denom;
		bN = m;
		bN += (m * (b - m) * x) / ( a + ( 2.0*m ) - 1.0 );
		bN += ( (a+m) * ( (a*y) - (b*x) + 1.0 + ( m*(2.0-x) ) ) ) / ( a + (2.0*m) + 1.0 ); // eslint-disable-line max-len
		m += 1;
		return [ aN, bN ];
	}
}


// MAIN //

/**
* Evaluates the incomplete beta via the continued fraction representation.
*
* @private
* @param {NonNegativeNumber} a - function parameter
* @param {NonNegativeNumber} b - function parameter
* @param {Probability} x - function parameter
* @param {Probability} y - probability equal to `1-x`
* @param {boolean} normalized - boolean indicating whether to evaluate the power terms of the regularized or non-regularized incomplete beta function
* @param {(Array|TypedArray|Object)} out - output array holding the derivative as the second element
* @returns {number} incomplete beta value
*/
function ibetaFraction2( a, b, x, y, normalized, out ) {
	var result;
	var fract;
	var f;

	result = ibetaPowerTerms( a, b, x, y, normalized );
	if ( out ) {
		out[ 1 ] = result;
	}
	if ( result === 0.0 ) {
		return result;
	}
	f = ibetaFraction2t( a, b, x, y );
	fract = continuedFraction( f, OPTS );
	return result / fract;
}


// EXPORTS //

module.exports = ibetaFraction2;

},{"./ibeta_power_terms.js":177,"@stdlib/math/base/tools/continued-fraction":235}],177:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_62_0/boost/math/special_functions/beta.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var lanczosSumExpGScaled = require( '@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled' );
var maxabs = require( '@stdlib/math/base/special/maxabs' );
var minabs = require( '@stdlib/math/base/special/minabs' );
var expm1 = require( '@stdlib/math/base/special/expm1' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var abs = require( '@stdlib/math/base/special/abs' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var min = require( '@stdlib/math/base/special/min' );
var ln = require( '@stdlib/math/base/special/ln' );
var MAX_LN = require( '@stdlib/constants/math/float64-max-ln' );
var MIN_LN = require( '@stdlib/constants/math/float64-min-ln' );
var G = require( '@stdlib/constants/math/float64-gamma-lanczos-g' );
var E = require( '@stdlib/constants/math/float64-e' );


// MAIN //

/**
* Computes the leading power terms in the incomplete beta function.
*
* When normalized,
*
* ```tex
* \frac{ x^a y^b }{ \operatorname{Beta}(a,b) }
* ```
*
* and otherwise
*
* ```tex
* x^a y^b
* ```
*
* ## Notes
*
* -   Almost all of the error in the incomplete beta comes from this function, particularly when \\( a \\) and \\( b \\) are large. Computing large powers are *hard* though, and using logarithms just leads to horrendous cancellation errors.
*
* -   For \\( l1 * l2 > 0 \\) or \\( \operatorname{min}( a, b ) < 1 \\), the two power terms both go in the same direction (toward zero or toward infinity). In this case if either term overflows or underflows, then the product of the two must do so also. Alternatively, if one exponent is less than one, then we can't productively use it to eliminate overflow or underflow from the other term.  Problems with spurious overflow/underflow can't be ruled out. In this case, but it is *very* unlikely since one of the power terms will evaluate to a number close to 1.
*
* -   If \\( \max( \abs(l1), \abs(l2) ) < 0.5 \\), both exponents are near one and both the exponents are greater than one, and, further, these two power terms tend in opposite directions (one toward zero, the other toward infinity), so we have to combine the terms to avoid any risk of overflow or underflow. We do this by moving one power term inside the other, we have:
*
*     ```tex
*     (1 + l_1)^a \cdot (1 + l_2)^b \\
*     = ((1 + l_1) \cdot (1 + l_2)^(b/a))^a \\
*     = (1 + l_1 + l_3 + l_1*l_3)^a
*     ```
*
*     and
*
*     ```tex
*     l_3 = (1 + l_2)^(b/a) - 1 \\
*     = \exp((b/a) * \ln(1 + l_2)) - 1
*     ```
*
*     The tricky bit is deciding which term to move inside. By preference, we move the larger term inside, so that the size of the largest exponent is reduced.  However, that can only be done as long as l3 (see above) is also small.
*
* @private
* @param {NonNegativeNumber} a - function parameter
* @param {NonNegativeNumber} b - function parameter
* @param {Probability} x - function parameter
* @param {Probability} y - probability equal to `1-x`
* @param {boolean} normalized - boolean indicating whether to evaluate the power terms of the regularized or non-regularized incomplete beta function
* @returns {number} power terms
*/
function ibetaPowerTerms( a, b, x, y, normalized ) {
	var result;
	var smallA;
	var ratio;
	var agh;
	var bgh;
	var cgh;
	var l1;
	var l2;
	var l3;
	var p1;
	var b1;
	var b2;
	var c;
	var l;

	if ( !normalized ) {
		// Can we do better here?
		return pow( x, a ) * pow( y, b );
	}
	c = a + b;

	// Combine power terms with Lanczos approximation:
	agh = a + G - 0.5;
	bgh = b + G - 0.5;
	cgh = c + G - 0.5;
	result = lanczosSumExpGScaled( c );
	result /= lanczosSumExpGScaled( a ) * lanczosSumExpGScaled( b );

	// Combine with the leftover terms from the Lanczos approximation:
	result *= sqrt( bgh / E );
	result *= sqrt( agh / cgh );

	// `l1` and `l2` are the base of the exponents minus one:
	l1 = ( ( x * b ) - ( y * agh ) ) / agh;
	l2 = ( ( y * a ) - ( x * bgh ) ) / bgh;
	if ( minabs( l1, l2 ) < 0.2 ) {
		// When the base of the exponent is very near 1 we get really gross errors unless extra care is taken:
		if ( l1 * l2 > 0 || min( a, b ) < 1 ) {
			if ( abs(l1) < 0.1 ) {
				result *= exp( a * log1p( l1 ) );
			} else {
				result *= pow( ( x*cgh ) / agh, a );
			}
			if ( abs(l2) < 0.1 ) {
				result *= exp( b * log1p( l2 ) );
			} else {
				result *= pow((y * cgh) / bgh, b);
			}
		}
		else if ( maxabs( l1, l2 ) < 0.5 ) {
			smallA = a < b;
			ratio = b / a;
			if (
				(smallA && (ratio * l2 < 0.1)) ||
				(!smallA && (l1 / ratio > 0.1))
			) {
				l3 = expm1( ratio * log1p( l2 ) );
				l3 = l1 + l3 + ( l3 * l1 );
				l3 = a * log1p( l3 );
				result *= exp( l3 );
			}
			else {
				l3 = expm1( log1p( l1 ) / ratio );
				l3 = l2 + l3 + ( l3 * l2 );
				l3 = b * log1p( l3 );
				result *= exp( l3 );
			}
		}
		else if ( abs(l1) < abs(l2) ) {
			// First base near 1 only:
			l = ( a * log1p( l1 ) ) + ( b * ln( ( y*cgh ) / bgh ) );
			if ( l <= MIN_LN || l >= MAX_LN ) {
				l += ln(result);
				if ( l >= MAX_LN ) {
					return NaN;
				}
				result = exp( l );
			} else {
				result *= exp( l );
			}
		}
		else {
			// Second base near 1 only:
			l = ( b * log1p( l2 ) ) + ( a * ln( (x*cgh) / agh ) );
			if ( l <= MIN_LN || l >= MAX_LN ) {
				l += ln(result);
				if ( l >= MAX_LN ) {
					return NaN;
				}
				result = exp( l );
			} else {
				result *= exp( l );
			}
		}
	}
	else {
		// General case:
		b1 = (x * cgh) / agh;
		b2 = (y * cgh) / bgh;
		l1 = a * ln(b1);
		l2 = b * ln(b2);
		if (
			l1 >= MAX_LN ||
			l1 <= MIN_LN ||
			l2 >= MAX_LN ||
			l2 <= MIN_LN
		) {
			// Oops, under/overflow, sidestep if we can:
			if ( a < b ) {
				p1 = pow( b2, b / a );
				l3 = a * ( ln(b1) + ln(p1) );
				if ( l3 < MAX_LN && l3 > MIN_LN ) {
					result *= pow( p1 * b1, a );
				} else {
					l2 += l1 + ln(result);
					if ( l2 >= MAX_LN ) {
						return NaN;
					}
					result = exp( l2 );
				}
			}
			else {
				p1 = pow( b1, a / b );
				l3 = ( ln(p1) + ln(b2) ) * b;
				if ( l3 < MAX_LN && l3 > MIN_LN ) {
					result *= pow( p1 * b2, b );
				} else {
					l2 += l1 + ln( result );
					if (l2 >= MAX_LN) {
						return NaN;
					}
					result = exp( l2 );
				}
			}
		}
		else {
			// Finally the normal case:
			result *= pow( b1, a ) * pow( b2, b );
		}
	}
	return result;
}


// EXPORTS //

module.exports = ibetaPowerTerms;

},{"@stdlib/constants/math/float64-e":27,"@stdlib/constants/math/float64-gamma-lanczos-g":32,"@stdlib/constants/math/float64-max-ln":39,"@stdlib/constants/math/float64-min-ln":42,"@stdlib/math/base/special/abs":77,"@stdlib/math/base/special/exp":107,"@stdlib/math/base/special/expm1":110,"@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled":121,"@stdlib/math/base/special/ln":192,"@stdlib/math/base/special/log1p":196,"@stdlib/math/base/special/maxabs":201,"@stdlib/math/base/special/min":203,"@stdlib/math/base/special/minabs":205,"@stdlib/math/base/special/pow":207,"@stdlib/math/base/special/sqrt":230}],178:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_64_0/boost/math/special_functions/beta.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var lanczosSumExpGScaled = require( '@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled' );
var sumSeries = require( '@stdlib/math/base/tools/sum-series' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var ln = require( '@stdlib/math/base/special/ln' );
var MIN_VALUE = require( '@stdlib/constants/math/float64-smallest-normal' );
var MAX_LN = require( '@stdlib/constants/math/float64-max-ln' );
var MIN_LN = require( '@stdlib/constants/math/float64-min-ln' );
var G = require( '@stdlib/constants/math/float64-gamma-lanczos-g' );
var E = require( '@stdlib/constants/math/float64-e' );


// VARIABLES //

var opts = {
	'maxTerms': 100
};


// FUNCTIONS //

/**
* Series approximation to the incomplete beta.
*
* @private
* @param {NonNegativeNumber} a - function parameter
* @param {NonNegativeNumber} b - function parameter
* @param {Probability} x - function parameter
* @param {number} result - initial result value
* @returns {Function} series function
*/
function ibetaSeriesT( a, b, x, result ) {
	var poch = 1.0 - b;
	var n = 1;
	return next;

	/**
	* Calculate the next term of the series.
	*
	* @private
	* @returns {number} series expansion term
	*/
	function next() {
		var r = result / a;
		a += 1.0;
		result *= poch * x / n;
		n += 1;
		poch += 1.0;
		return r;
	}
}


// MAIN //

/**
* Incomplete beta series.
*
* @private
* @param {NonNegativeNumber} a - function parameter
* @param {NonNegativeNumber} b - function parameter
* @param {Probability} x - function parameter
* @param {NonNegativeInteger} s0 - initial value
* @param {boolean} normalized - boolean indicating whether to evaluate the power terms of the regularized or non-regularized incomplete beta function
* @param {(Array|TypedArray|Object)} out - output array holding the derivative as the second element
* @param {Probability} y - probability equal to `1-x`
* @returns {number} function value
*/
function ibetaSeries( a, b, x, s0, normalized, out, y ) {
	var result;
	var agh;
	var bgh;
	var cgh;
	var l1;
	var l2;
	var c;
	var s;

	if ( normalized ) {
		c = a + b;

		// Incomplete beta power term, combined with the Lanczos approximation:
		agh = a + G - 0.5;
		bgh = b + G - 0.5;
		cgh = c + G - 0.5;
		result = lanczosSumExpGScaled( c ) / ( lanczosSumExpGScaled( a ) * lanczosSumExpGScaled( b ) ); // eslint-disable-line max-len

		l1 = ln( cgh / bgh ) * ( b - 0.5 );
		l2 = ln( x * cgh / agh ) * a;

		// Check for over/underflow in the power terms:
		if (
			l1 > MIN_LN &&
			l1 < MAX_LN &&
			l2 > MIN_LN &&
			l2 < MAX_LN
		) {
			if ( a * b < bgh * 10.0 ) {
				result *= exp( ( b-0.5 ) * log1p( a / bgh ) );
			} else {
				result *= pow( cgh / bgh, b - 0.5 );
			}
			result *= pow( x * cgh / agh, a );
			result *= sqrt( agh / E );

			if ( out ) {
				out[ 1 ] = result * pow( y, b );
			}
		}
		else {
			// We need logs, and this *will* cancel:
			result = ln( result ) + l1 + l2 + ( ( ln( agh ) - 1.0 ) / 2.0 );
			if ( out ) {
				out[ 1 ] = exp( result + ( b * ln( y ) ) );
			}
			result = exp( result );
		}
	}
	else {
		// Non-normalized, just compute the power:
		result = pow( x, a );
	}
	if ( result < MIN_VALUE ) {
		return s0; // Safeguard: series can't cope with denorms.
	}
	s = ibetaSeriesT( a, b, x, result );
	opts.initialValue = s0;
	return sumSeries( s, opts );
}


// EXPORTS //

module.exports = ibetaSeries;

},{"@stdlib/constants/math/float64-e":27,"@stdlib/constants/math/float64-gamma-lanczos-g":32,"@stdlib/constants/math/float64-max-ln":39,"@stdlib/constants/math/float64-min-ln":42,"@stdlib/constants/math/float64-smallest-normal":46,"@stdlib/math/base/special/exp":107,"@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled":121,"@stdlib/math/base/special/ln":192,"@stdlib/math/base/special/log1p":196,"@stdlib/math/base/special/pow":207,"@stdlib/math/base/special/sqrt":230,"@stdlib/math/base/tools/sum-series":241}],179:[function(require,module,exports){
'use strict';

/**
* Evaluate the incomplete beta function and its first derivative.
*
* @module @stdlib/math/base/special/kernel-betainc
*
* @example
* var kernelBetainc = require( '@stdlib/math/base/special/kernel-betainc' );
*
* var out = kernelBetainc( 2.0, 2.0, false, false );
* // returns [ ~0.083, ~1.5 ]
*
* out = kernelBetainc( 0.2, 1.0, 2.0, true, false );
* // returns [ 0.32, 1.6 ]
*
* var arr = new Array( 2 );
* out = kernelBetainc( arr, 0.2, 1.0, 2.0, true, true );
* // returns [ 0.64, 1.6 ]
*
* var bool = ( arr === out );
* // returns true
*/

// MODULES //

var kernelBetainc = require( './main.js' );


// EXPORTS //

module.exports = kernelBetainc;

},{"./main.js":181}],180:[function(require,module,exports){
/* eslint-disable max-statements */
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_61_0/boost/math/special_functions/beta.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var expm1 = require( '@stdlib/math/base/special/expm1' );
var floor = require( '@stdlib/math/base/special/floor' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var asin = require( '@stdlib/math/base/special/asin' );
var beta = require( '@stdlib/math/base/special/beta' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var max = require( '@stdlib/math/base/special/max' );
var min = require( '@stdlib/math/base/special/min' );
var MAX_FLOAT64 = require( '@stdlib/constants/math/float64-max' );
var MIN_FLOAT64 = require( '@stdlib/constants/math/float64-smallest-normal' );
var MAX_INT32 = require( '@stdlib/constants/math/int32-max' );
var HALF_PI = require( '@stdlib/constants/math/float64-half-pi' );
var PI = require( '@stdlib/constants/math/float64-pi' );
var betaSmallBLargeASeries = require( './beta_small_b_large_a_series.js' );
var risingFactorialRatio = require( './rising_factorial_ratio.js' );
var ibetaPowerTerms = require( './ibeta_power_terms.js' );
var ibetaFraction2 = require( './ibeta_fraction2.js');
var binomialCCDF = require( './binomial_ccdf.js' );
var ibetaAStep = require( './ibeta_a_step.js' );
var ibetaSeries = require( './ibeta_series.js' );


// VARIABLES //

var ONE_OVER_PI = 1.0 / PI;


// MAIN //

/**
* Evaluates the incomplete beta function and its first derivative. This function divides up the input range and selects the right implementation method for each domain.
*
* @private
* @param {(Array|TypedArray|Object)} out - output array
* @param {Probability} x - function input
* @param {NonNegativeNumber} a - function parameter
* @param {NonNegativeNumber} b - function parameter
* @param {boolean} invert - boolean indicating if the function should return the upper tail of the incomplete beta function instead
* @param {boolean} normalized - boolean indicating if the function should evaluate the regularized boolean beta function
* @returns {(Array|TypedArray|Object)} function value and first derivative
*
* @example
* var out = kernelBetainc( new Array( 2 ), 2.0, 2.0, false, false );
* // returns [ ~0.083, ~1.5 ]
*
* @example
* var out = kernelBetainc( new Array( 2 ), 0.2, 1.0, 2.0, true, false );
* // returns [ 0.32, 1.6 ]
*
* @example
* var out = kernelBetainc( new Array( 2 ), 0.2, 1.0, 2.0, true, true );
* // returns [ 0.64, 1.6 ]
*/
function ibetaImp( out, x, a, b, invert, normalized ) {
	var lambda;
	var prefix;
	var fract;
	var bbar;
	var div;
	var tmp;
	var k;
	var n;
	var p;
	var y;
	y = 1.0 - x;

	// Derivative not set...
	out[ 1 ] = -1;
	if ( x < 0.0 || x > 1.0 ) {
		out[ 0 ] = NaN;
		out[ 1 ] = NaN;
		return out;
	}
	if ( normalized ) {
		if ( a < 0.0 || b < 0.0 ) {
			out[ 0 ] = NaN;
			out[ 1 ] = NaN;
			return out;
		}
		// Extend to a few very special cases...
		if ( a === 0.0 ) {
			if ( b === 0.0 ) {
				out[ 0 ] = NaN;
				out[ 1 ] = NaN;
				return out;
			}
			if ( b > 0.0 ) {
				out[ 0 ] = invert ? 0.0 : 1.0;
				return out;
			}
		} else if ( b === 0.0 ) {
			if ( a > 0.0 ) {
				out[ 0 ] = invert ? 1.0 : 0.0;
				return out;
			}
		}
	} else if ( a <= 0.0 || b <= 0.0 ) {
		out[ 0 ] = NaN;
		out[ 1 ] = NaN;
		return out;
	}
	if ( x === 0.0 ) {
		if ( a === 1.0 ) {
			out[ 1 ] = 1.0;
		} else {
			out[ 1 ] = a < 1.0 ? MAX_FLOAT64 / 2.0 : MIN_FLOAT64 * 2.0;
		}
		if ( invert ) {
			out[ 0 ] = normalized ? 1.0 : beta( a, b );
			return out;
		}
		out[ 0 ] = 0.0;
		return out;
	}
	if ( x === 1.0 ) {
		if ( b === 1.0 ) {
			out[ 1 ] = 1.0;
		} else {
			out[ 1 ] = b < 1.0 ? MAX_FLOAT64 / 2.0 : MIN_FLOAT64 * 2.0;
		}
		if ( invert ) {
			out[ 0 ] = 0.0;
		} else {
			out[ 0 ] = normalized ? 1.0 : beta( a, b );
		}
		return out;
	}
	if ( a === 0.5 && b === 0.5 ) {
		out[ 1 ] = ONE_OVER_PI * sqrt( y * x );

		// We have an arcsine distribution:
		p = invert ? asin( sqrt(y) ) : asin( sqrt(x) );
		p /= HALF_PI;
		if ( !normalized ) {
			p *= PI;
		}
		out[ 0 ] = p;
		return out;
	}
	if ( a === 1.0 ) {
		tmp = b;
		b = a;
		a = tmp;

		tmp = y;
		y = x;
		x = tmp;

		invert = !invert;
	}
	if ( b === 1.0 ) {
		// Special case see: http://functions.wolfram.com/GammaBetaErf/BetaRegularized/03/01/01/
		if ( a === 1.0 ) {
			out[ 1 ] = 1.0;
			out[ 0 ] = invert ? y : x;
			return out;
		}
		out[ 1 ] = a * pow( x, a - 1.0 );
		if ( y < 0.5 ) {
			p = invert ? -expm1( a * log1p(-y) ) : exp( a * log1p(-y) );
		} else {
			p = invert ? -( pow( x, a ) - 1.0 ) : pow( x, a );
		}
		if ( !normalized ) {
			p /= a;
		}
		out[ 0 ] = p;
		return out;
	}
	if ( min( a, b ) <= 1.0 ) {
		if ( x > 0.5 ) {
			tmp = b;
			b = a;
			a = tmp;

			tmp = y;
			y = x;
			x = tmp;

			invert = !invert;
		}
		if ( max( a, b ) <= 1.0 ) {
			// Both a,b < 1:
			if ( (a >= min( 0.2, b ) ) || ( pow(x, a) <= 0.9 ) ) {
				if ( invert ) {
					fract = -(normalized ? 1.0 : beta( a, b ) );
					invert = false;
					fract = -ibetaSeries( a, b, x, fract, normalized, out, y );
				} else {
					fract = ibetaSeries( a, b, x, 0, normalized, out, y );
				}
			} else {
				tmp = b;
				b = a;
				a = tmp;

				tmp = y;
				y = x;
				x = tmp;

				invert = !invert;
				if ( y >= 0.3 ) {
					if ( invert ) {
						fract = -( normalized ? 1.0 : beta( a, b ) );
						invert = false;
						fract = -ibetaSeries( a, b, x, fract, normalized, out, y ); // eslint-disable-line max-len
					} else {
						fract = ibetaSeries( a, b, x, 0, normalized, out, y );
					}
				} else {
					// Sidestep on a, and then use the series representation:
					if ( normalized ) {
						prefix = 1;
					} else {
						prefix = risingFactorialRatio( a + b, a, 20 );
					}
					fract = ibetaAStep( a, b, x, y, 20, normalized, out );
					if ( invert ) {
						fract -= ( normalized ? 1 : beta( a, b ) );
						invert = false;
						fract = -betaSmallBLargeASeries(
							a + 20.0, b, x, y, fract, prefix, normalized
						);
					} else {
						fract = betaSmallBLargeASeries( a + 20.0, b, x, y, fract, prefix, normalized ); // eslint-disable-line max-len
					}
				}
			}
		} else if ( b <= 1.0 || ( x < 0.1 && ( pow( b * x, a ) <= 0.7 ) ) ) {
			if ( invert ) {
				fract = -( normalized ? 1 : beta( a, b ) );
				invert = false;
				fract = -ibetaSeries( a, b, x, fract, normalized, out, y );
			} else {
				fract = ibetaSeries( a, b, x, 0.0, normalized, out, y );
			}
		} else {
			tmp = b;
			b = a;
			a = tmp;

			tmp = y;
			y = x;
			x = tmp;
			invert = !invert;

			if ( y >= 0.3 ) {
				if (invert) {
					fract = -(normalized ? 1.0 : beta( a, b ));
					invert = false;
					fract = -ibetaSeries( a, b, x, fract, normalized, out, y );
				} else {
					fract = ibetaSeries( a, b, x, 0.0, normalized, out, y );
				}
			}
			else if ( a >= 15.0 ) {
				if ( invert ) {
					fract = -(normalized ? 1.0 : beta( a, b ));
					invert = false;
					fract = -betaSmallBLargeASeries( a, b, x, y, fract, 1.0, normalized ); // eslint-disable-line max-len
				} else {
					fract = betaSmallBLargeASeries( a, b, x, y, 0.0, 1.0, normalized ); // eslint-disable-line max-len
				}
			}
			else {
				if ( normalized ) {
					prefix = 1;
				} else {
					// Sidestep to improve errors:
					prefix = risingFactorialRatio( a + b, a, 20.0 );
				}
				fract = ibetaAStep( a, b, x, y, 20.0, normalized, out );
				if ( invert ) {
					fract -= ( normalized ? 1.0 : beta( a, b ) );
					invert = false;
					fract = -betaSmallBLargeASeries( a + 20.0, b, x, y, fract, prefix, normalized ); // eslint-disable-line max-len
				} else {
					fract = betaSmallBLargeASeries( a + 20.0, b, x, y, fract, prefix, normalized ); // eslint-disable-line max-len
				}
			}
		}
	} else {
		// Both a,b >= 1:
		if ( a < b ) {
			lambda = a - ( (a + b) * x );
		} else {
			lambda = ( (a + b) * y ) - b;
		}
		if ( lambda < 0.0 ) {
			tmp = b;
			b = a;
			a = tmp;

			tmp = y;
			y = x;
			x = tmp;
			invert = !invert;
		}
		if ( b < 40.0 ) {
			if (
				floor(a) === a &&
				floor(b) === b &&
				a < MAX_INT32 - 100
			) {
				// Relate to the binomial distribution and use a finite sum:
				k = a - 1.0;
				n = b + k;
				fract = binomialCCDF( n, k, x, y );
				if ( !normalized ) {
					fract *= beta( a, b );
				}
			}
			else if ( b * x <= 0.7 ) {
				if ( invert ) {
					fract = -( normalized ? 1.0 : beta( a, b ) );
					invert = false;
					fract = -ibetaSeries( a, b, x, fract, normalized, out, y );
				} else {
					fract = ibetaSeries( a, b, x, 0.0, normalized, out, y );
				}
			}
			else if ( a > 15.0 ) {
				// Sidestep so we can use the series representation:
				n = floor( b );
				if ( n === b ) {
					n -= 1;
				}
				bbar = b - n;
				if ( normalized ) {
					prefix = 1;
				} else {
					prefix = risingFactorialRatio( a + bbar, bbar, n );
				}
				fract = ibetaAStep( bbar, a, y, x, n, normalized );
				fract = betaSmallBLargeASeries( a, bbar, x, y, fract, 1.0, normalized ); // eslint-disable-line max-len
				fract /= prefix;
			}
			else if ( normalized ) {
				n = floor( b );
				bbar = b - n;
				if ( bbar <= 0 ) {
					n -= 1;
					bbar += 1;
				}
				fract = ibetaAStep( bbar, a, y, x, n, normalized );
				fract += ibetaAStep( a, bbar, x, y, 20.0, normalized );
				if ( invert ) {
					fract -= 1;
				}
				fract = betaSmallBLargeASeries( a + 20.0, bbar, x, y, fract, 1, normalized ); // eslint-disable-line max-len
				if ( invert ) {
					fract = -fract;
					invert = false;
				}
			}
			else {
				fract = ibetaFraction2( a, b, x, y, normalized, out );
			}
		} else {
			fract = ibetaFraction2( a, b, x, y, normalized, out );
		}
	}
	if ( out[ 1 ] < 0.0 ) {
		out[ 1 ] = ibetaPowerTerms( a, b, x, y, true );
	}
	div = y * x;
	if ( out[ 1 ] !== 0.0 ) {
		if ( ( MAX_FLOAT64 * div < out[ 1 ] ) ) {
			// Overflow, return an arbitrarily large value:
			out[ 1 ] = MAX_FLOAT64 / 2.0;
		} else {
			out[ 1 ] /= div;
		}
	}
	out[ 0 ] = invert ? ( normalized ? 1.0 : beta( a, b ) ) - fract : fract;
	return out;
}


// EXPORTS //

module.exports = ibetaImp;

},{"./beta_small_b_large_a_series.js":172,"./binomial_ccdf.js":173,"./ibeta_a_step.js":175,"./ibeta_fraction2.js":176,"./ibeta_power_terms.js":177,"./ibeta_series.js":178,"./rising_factorial_ratio.js":183,"@stdlib/constants/math/float64-half-pi":34,"@stdlib/constants/math/float64-max":40,"@stdlib/constants/math/float64-pi":44,"@stdlib/constants/math/float64-smallest-normal":46,"@stdlib/constants/math/int32-max":49,"@stdlib/math/base/special/asin":79,"@stdlib/math/base/special/beta":83,"@stdlib/math/base/special/exp":107,"@stdlib/math/base/special/expm1":110,"@stdlib/math/base/special/floor":116,"@stdlib/math/base/special/log1p":196,"@stdlib/math/base/special/max":199,"@stdlib/math/base/special/min":203,"@stdlib/math/base/special/pow":207,"@stdlib/math/base/special/sqrt":230}],181:[function(require,module,exports){
'use strict';

// MODULES //

var compute = require( './kernel_betainc.js' );


// MAIN //

/**
* Evaluates the incomplete beta function and its first derivative.
*
* @param {(Array|TypedArray|Object)} [out] - output array
* @param {Probability} x - function input
* @param {NonNegativeNumber} a - function parameter
* @param {NonNegativeNumber} b - function parameter
* @param {boolean} invert - boolean indicating if the function should return the upper tail of the incomplete beta function instead
* @param {boolean} normalized - boolean indicating if the function should evaluate the regularized boolean beta function
* @returns {(Array|TypedArray|Object)} function value and first derivative
*
* @example
* var out = kernelBetainc( 2.0, 2.0, false, false );
* // returns [ ~0.083, ~1.5 ]
*
* @example
* var out = kernelBetainc( 0.2, 1.0, 2.0, true, false );
* // returns [ 0.32, 1.6 ]
*
* @example
* var arr = new Array( 2 );
* var out = kernelBetainc( arr, 0.2, 1.0, 2.0, true, true );
* // returns [ 0.64, 1.6 ]
*
* var bool = ( arr === out );
* // returns true
*/
function kernelBetainc( out, x, a, b, invert, normalized ) {
	if ( arguments.length === 5 ) {
		return compute( new Array( 2 ), out, x, a, b, invert );
	}
	return compute( out, x, a, b, invert, normalized );
}


// EXPORTS //

module.exports = kernelBetainc;


},{"./kernel_betainc.js":180}],182:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_64_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* Copyright John Maddock 2006-7, 2013-14.
* Copyright Paul A. Bristow 2007, 2013-14.
* Copyright Nikhar Agrawal 2013-14.
* Copyright Christopher Kormanyos 2013-14.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var lanczosSumExpGScaled = require( '@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled' );
var gammaln = require( '@stdlib/math/base/special/gammaln' );
var gamma = require( '@stdlib/math/base/special/gamma' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var abs = require( '@stdlib/math/base/special/abs' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var max = require( '@stdlib/math/base/special/max' );
var min = require( '@stdlib/math/base/special/min' );
var ln = require( '@stdlib/math/base/special/ln' );
var MAX_LN = require( '@stdlib/constants/math/float64-max-ln' );
var MIN_LN = require( '@stdlib/constants/math/float64-min-ln' );
var G = require( '@stdlib/constants/math/float64-gamma-lanczos-g' );
var E = require( '@stdlib/constants/math/float64-e' );


// MAIN //

/**
* Computes `(z^a)*(e^-z) / gamma(a)`.
*
* @private
* @param {number} a - input value
* @param {number} z - input value
* @returns {number} function value
*/
function regularizedGammaPrefix( a, z ) {
	var prefix;
	var amza;
	var agh;
	var alz;
	var amz;
	var sq;
	var d;

	agh = a + G - 0.5;
	d = ( (z - a) - G + 0.5 ) / agh;
	if ( a < 1.0 ) {
		// Treat a < 1 as a special case because our Lanczos approximations are optimized against the factorials with a > 1, and for high precision types very small values of `a` can give rather erroneous results for gamma:
		if ( z <= MIN_LN ) {
			// Use logs, so should be free of cancellation errors:
			return exp( ( a * ln(z) ) - z - gammaln( a ) );
		}
		// No danger of overflow as gamma(a) < 1/a for small a, so direct calculation:
		return pow( z, a ) * exp( -z ) / gamma( a );
	}
	else if ( abs(d*d*a) <= 100.0 && a > 150.0 ) {
		// Special case for large a and a ~ z:
		prefix = ( a * ( log1p( d ) - d ) ) + ( z * ( 0.5-G ) / agh );
		prefix = exp( prefix );
	}
	else {
		// General case. Direct computation is most accurate, but use various fallbacks for different parts of the problem domain:
		alz = a * ln(z / agh);
		amz = a - z;
		if (
			min(alz, amz) <= MIN_LN ||
			max(alz, amz) >= MAX_LN
		) {
			amza = amz / a;
			if (
				min(alz, amz)/2.0 > MIN_LN &&
				max(alz, amz)/2.0 < MAX_LN
			) {
				// Compute square root of the result and then square it:
				sq = pow( z/agh, a/2.0 ) * exp( amz/2.0 );
				prefix = sq * sq;
			}
			else if (
				min(alz, amz)/4.0 > MIN_LN &&
				max(alz, amz)/4.0 < MAX_LN &&
				z > a
			) {
				// Compute the 4th root of the result then square it twice:
				sq = pow( z/agh, a/4.0 ) * exp( amz/4.0 );
				prefix = sq * sq;
				prefix *= prefix;
			}
			else if (
				amza > MIN_LN &&
				amza < MAX_LN
			) {
				prefix = pow( (z * exp(amza)) / agh, a );
			}
			else {
				prefix = exp( alz + amz );
			}
		}
		else
		{
			prefix = pow( z/agh, a ) * exp( amz );
		}
	}
	prefix *= sqrt( agh/E ) / lanczosSumExpGScaled( a );
	return prefix;
}


// EXPORTS //

module.exports = regularizedGammaPrefix;

},{"@stdlib/constants/math/float64-e":27,"@stdlib/constants/math/float64-gamma-lanczos-g":32,"@stdlib/constants/math/float64-max-ln":39,"@stdlib/constants/math/float64-min-ln":42,"@stdlib/math/base/special/abs":77,"@stdlib/math/base/special/exp":107,"@stdlib/math/base/special/gamma":127,"@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled":121,"@stdlib/math/base/special/gammaln":161,"@stdlib/math/base/special/ln":192,"@stdlib/math/base/special/log1p":196,"@stdlib/math/base/special/max":199,"@stdlib/math/base/special/min":203,"@stdlib/math/base/special/pow":207,"@stdlib/math/base/special/sqrt":230}],183:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/beta.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MAIN //

/**
* Computes the delta in `beta(a,b,x) = prefix + delta * beta(a+k,b,x)`.
*
* ## Notes
*
* Specifically, the function calculates
*
* ```tex
* \frac{ (a)(a+1)(a+2)...(a+k-1) }{ (b)(b+1)(b+2)...(b+k-1) }
* ```
*
* The function should only called with small `k`; for large `k`, it is grossly inefficient.
*
* @private
* @param {number} a - input value
* @param {number} b - input value
* @param {NonNegativeInteger} k - input value
* @returns {number} ratio value
*/
function risingFactorialRatio( a, b, k ) {
	var result;
	var i;
	if ( k === 0 ) {
		return 1.0;
	}
	result = 1.0;
	for ( i = 0; i < k; i++ ) {
		result *= ( a + i ) / ( b + i );
	}
	return result;
}


// EXPORTS //

module.exports = risingFactorialRatio;

},{}],184:[function(require,module,exports){
'use strict';

/**
* Compute the cosine of a number on `[-π/4, π/4]`.
*
* @module @stdlib/math/base/special/kernel-cos
*
* @example
* var kernelCos = require( '@stdlib/math/base/special/kernel-cos' );
*
* var v = kernelCos( 0.0, 0.0 );
* // returns ~1.0
*
* v = kernelCos( Math.PI/6.0, 0.0 );
* // returns ~0.866
*
* v = kernelCos( 0.785, -1.144e-17 );
* // returns ~0.707
*
* v = kernelCos( NaN, 0.0 );
* // returns NaN
*/

// MODULES //

var kernelCos = require( './kernel_cos.js' );


// EXPORTS //

module.exports = kernelCos;

},{"./kernel_cos.js":185}],185:[function(require,module,exports){
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/k_cos.c?view=co}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* ====================================================
* Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunSoft, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*/

// MODULES //

var polyval13 = require( './polyval_c13.js' );
var polyval46 = require( './polyval_c46.js' );


// MAIN //

/**
* Computes the cosine on \\( [-\pi/4, \pi/4] \\), where \\( \pi/4 \approx 0.785398164 \\).
*
* ## Method
*
* -   Since \\( \cos(-x) = \cos(x) \\), we need only to consider positive \\(x\\).
*
* -   If \\( x < 2^{-27} \\), return \\(1\\) which is inexact if \\( x \ne 0 \\).
*
* -   \\( cos(x) \\) is approximated by a polynomial of degree \\(14\\) on \\( [0,\pi/4] \\).
*
*     ```tex
*     \cos(x) \approx 1 - \frac{x \cdot x}{2} + C_1 \cdot x^4 + \ldots + C_6 \cdot x^{14}
*     ```
*
*     where the Remez error is
*
*     ```tex
*     \left| \cos(x) - \left( 1 - \frac{x^2}{2} + C_1x^4 + C_2x^6 + C_3x^8 + C_4x^{10} + C_5x^{12} + C_6x^{15} \right) \right| \le 2^{-58}
*     ```
*
* -   Let \\( C_1x^4 + C_2x^6 + C_3x^8 + C_4x^{10} + C_5x^{12} + C_6x^{14} \\), then
*
*     ```tex
*     \cos(x) \approx 1 - \frac{x \cdot x}{2} + r
*     ```
*
*     Since
*
*     ```tex
*     \cos(x+y) \approx \cos(x) - \sin(x) \cdot y \approx \cos(x) - x \cdot y
*     ```

*     a correction term is necessary in \\( \cos(x) \\). Hence,
*
*     ```tex
*     \cos(x+y) = 1 - \left( \frac{x \cdot x}{2} - (r - x \cdot y) \right)
*     ```
*
*     For better accuracy, rearrange to
*
*     ```tex
*     \cos(x+y) \approx w + \left( t + ( r - x \cdot y ) \right)
*     ```
*
*     where \\( w = 1 - \frac{x \cdot x}{2} \\) and \\( t \\) is a tiny correction term (\\( 1 - \frac{x \cdot x}{2} = w + t \\) exactly in infinite precision). The exactness of \\(w + t\\) in infinite precision depends on \\(w\\) and \\(t\\) having the same precision as \\(x\\).
*
*
* @param {number} x - input value (in radians, assumed to be bounded by ~pi/4 in magnitude)
* @param {number} y - tail of `x`
* @returns {number} cosine
*
* @example
* var v = kernelCos( 0.0, 0.0 );
* // returns ~1.0
*
* @example
* var v = kernelCos( Math.PI/6.0, 0.0 );
* // returns ~0.866
*
* @example
* var v = kernelCos( 0.785, -1.144e-17 );
* // returns ~0.707
*
* @example
* var v = kernelCos( NaN, 0.0 );
* // returns NaN
*/
function kernelCos( x, y ) {
	var hz;
	var r;
	var w;
	var z;

	z = x * x;
	w = z * z;
	r = z * polyval13( z );
	r += w * w * polyval46( z );
	hz = 0.5 * z;
	w = 1.0 - hz;
	return w + ( ((1.0-w) - hz) + ((z*r) - (x*y)) );
}


// EXPORTS //

module.exports = kernelCos;

},{"./polyval_c13.js":186,"./polyval_c46.js":187}],186:[function(require,module,exports){
/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* ## Notes
*
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*/
function evalpoly( x ) {
	if ( x === 0.0 ) {
		return 0.0416666666666666;
	}
	return 0.0416666666666666 + (x * (-0.001388888888887411 + (x * 0.00002480158728947673))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],187:[function(require,module,exports){
/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* ## Notes
*
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*/
function evalpoly( x ) {
	if ( x === 0.0 ) {
		return -2.7557314351390663e-7;
	}
	return -2.7557314351390663e-7 + (x * (2.087572321298175e-9 + (x * -1.1359647557788195e-11))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],188:[function(require,module,exports){
'use strict';

/**
* Compute the sine of a number on `[-π/4, π/4]`.
*
* @module @stdlib/math/base/special/kernel-sin
*
* @example
* var kernelSin = require( '@stdlib/math/base/special/kernel-sin' );
*
* var v = kernelSin( 0.0, 0.0 );
* // returns ~0.0
*
* v = kernelSin( Math.PI/6.0, 0.0 );
* // returns ~0.5
*
* v = kernelSin( 0.619, 9.279e-18 );
* // returns ~0.581
*
* v = kernelSin( NaN, 0.0 );
* // returns NaN
*
* v = kernelSin( 3.0, NaN );
* // returns NaN
*
* v = kernelSin( NaN, NaN );
* // returns NaN
*/

// MODULES //

var kernelSin = require( './kernel_sin.js' );


// EXPORTS //

module.exports = kernelSin;

},{"./kernel_sin.js":189}],189:[function(require,module,exports){
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/k_sin.c?view=co}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* ====================================================
* Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunSoft, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*/

// VARIABLES //

var S1 = -1.66666666666666324348e-01; // 0xBFC55555, 0x55555549
var S2 = 8.33333333332248946124e-03;  // 0x3F811111, 0x1110F8A6
var S3 = -1.98412698298579493134e-04; // 0xBF2A01A0, 0x19C161D5
var S4 = 2.75573137070700676789e-06;  // 0x3EC71DE3, 0x57B1FE7D
var S5 = -2.50507602534068634195e-08; // 0xBE5AE5E6, 0x8A2B9CEB
var S6 = 1.58969099521155010221e-10;  // 0x3DE5D93A, 0x5ACFD57C


// MAIN //

/**
* Computes the sine on \\( \approx [-\pi/4, \pi/4] \\) (except on \\(-0\\)), where \\( \pi/4 \approx 0.7854 \\).
*
* ## Method
*
* -   Since \\( \sin(-x) = -\sin(x) \\), we need only to consider positive \\(x\\).
*
* -   Callers must return \\( \sin(-0) = -0 \\) without calling here since our odd polynomial is not evaluated in a way that preserves \\(-0\\). Callers may do the optimization \\( \sin(x) \approx x \\) for tiny \\(x\\).
*
* -   \\( \sin(x) \\) is approximated by a polynomial of degree \\(13\\) on \\( \left[0,\tfrac{pi}{4}\right] \\)
*
*     ```tex
*     \sin(x) \approx x + S_1 \cdot x^3 + \ldots + S_6 \cdot x^{13}
*     ```
*
*     where
*
*     ```tex
*     \left| \frac{\sin(x)}{x} \left( 1 + S_1 \cdot x + S_2 \cdot x + S_3 \cdot x + S_4 \cdot x + S_5 \cdot x + S_6 \cdot x \right) \right| \le 2^{-58}
*     ```
*
* -   We have
*
*     ```tex
*     \sin(x+y) = \sin(x) + \sin'(x') \cdot y \approx \sin(x) + (1-x*x/2) \cdot y
*     ```
*
*     For better accuracy, let
*
*     ```tex
*     r = x^3 * \left( S_2 + x^2 \cdot \left( S_3 + x^2 * \left( S_4 + x^2 \cdot ( S_5+x^2 \cdot S_6 ) \right) \right) \right)
*     ```
*
*     then
*
*     ```tex
*     \sin(x) = x + \left( S_1 \cdot x + ( x \cdot (r-y/2) + y ) \right)
*     ```
*
*
* @param {number} x - input value (in radians, assumed to be bounded by `~pi/4` in magnitude)
* @param {number} y - tail of `x`
* @returns {number} sine
*
* @example
* var v = kernelSin( 0.0, 0.0 );
* // returns ~0.0
*
* @example
* var v = kernelSin( Math.PI/6.0, 0.0 );
* // returns ~0.5
*
* @example
* var v = kernelSin( 0.619, 9.279e-18 );
* // returns ~0.581
*
* @example
* var v = kernelSin( NaN, 0.0 );
* // returns NaN
*
* @example
* var v = kernelSin( 3.0, NaN );
* // returns NaN
*
* @example
* var v = kernelSin( NaN, NaN );
* // returns NaN
*/
function kernelSin( x, y ) {
	var r;
	var v;
	var w;
	var z;

	z = x * x;
	w = z * z;
	r = S2 + (z * (S3 + (z*S4))) + (z * w * (S5 + (z*S6)));
	v = z * x;
	if ( y === 0.0 ) {
		return x + (v * (S1 + (z*r)));
	}
	return x - (((z*((0.5*y) - (v*r))) - y) - (v*S1));
}


// EXPORTS //

module.exports = kernelSin;

},{}],190:[function(require,module,exports){
'use strict';

/**
* Multiply a double-precision floating-point number by an integer power of two.
*
* @module @stdlib/math/base/special/ldexp
*
* @example
* var ldexp = require( '@stdlib/math/base/special/ldexp' );
*
* var x = ldexp( 0.5, 3 ); // => 0.5 * 2^3 = 0.5 * 8
* // returns 4.0
*
* x = ldexp( 4.0, -2 ); // => 4 * 2^(-2) = 4 * (1/4)
* // returns 1.0
*
* x = ldexp( 0.0, 20 );
* // returns 0.0
*
* x = ldexp( -0.0, 39 );
* // returns -0.0
*
* x = ldexp( NaN, -101 );
* // returns NaN
*
* x = ldexp( Infinity, 11 );
* // returns Infinity
*
* x = ldexp( -Infinity, -118 );
* // returns -Infinity
*/

// MODULES //

var ldexp = require( './ldexp.js' );


// EXPORTS //

module.exports = ldexp;

},{"./ldexp.js":191}],191:[function(require,module,exports){
'use strict';

// NOTES //

/*
* => ldexp: load exponent (see [The Open Group]{@link http://pubs.opengroup.org/onlinepubs/9699919799/functions/ldexp.html} and [cppreference]{@link http://en.cppreference.com/w/c/numeric/math/ldexp}).
*/


// MODULES //

var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var BIAS = require( '@stdlib/constants/math/float64-exponent-bias' );
var MAX_EXPONENT = require( '@stdlib/constants/math/float64-max-base2-exponent' );
var MAX_SUBNORMAL_EXPONENT = require( '@stdlib/constants/math/float64-max-base2-exponent-subnormal' );
var MIN_SUBNORMAL_EXPONENT = require( '@stdlib/constants/math/float64-min-base2-exponent-subnormal' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
var copysign = require( '@stdlib/math/base/special/copysign' );
var normalize = require( '@stdlib/number/float64/base/normalize' );
var floatExp = require( '@stdlib/number/float64/base/exponent' );
var toWords = require( '@stdlib/number/float64/base/to-words' );
var fromWords = require( '@stdlib/number/float64/base/from-words' );


// VARIABLES //

// 1/(1<<52) = 1/(2**52) = 1/4503599627370496
var TWO52_INV = 2.220446049250313e-16;

// Exponent all 0s: 1 00000000000 11111111111111111111 => 2148532223
var CLEAR_EXP_MASK = 0x800fffff>>>0; // asm type annotation

// Normalization workspace:
var FRAC = [ 0.0, 0.0 ]; // WARNING: not thread safe

// High/low words workspace:
var WORDS = [ 0, 0 ]; // WARNING: not thread safe


// MAIN //

/**
* Multiplies a double-precision floating-point number by an integer power of two.
*
* @param {number} frac - fraction
* @param {integer} exp - exponent
* @returns {number} double-precision floating-point number
*
* @example
* var x = ldexp( 0.5, 3 ); // => 0.5 * 2^3 = 0.5 * 8
* // returns 4.0
*
* @example
* var x = ldexp( 4.0, -2 ); // => 4 * 2^(-2) = 4 * (1/4)
* // returns 1.0
*
* @example
* var x = ldexp( 0.0, 20 );
* // returns 0.0
*
* @example
* var x = ldexp( -0.0, 39 );
* // returns -0.0
*
* @example
* var x = ldexp( NaN, -101 );
* // returns NaN
*
* @example
* var x = ldexp( Infinity, 11 );
* // returns Infinity
*
* @example
* var x = ldexp( -Infinity, -118 );
* // returns -Infinity
*/
function ldexp( frac, exp ) {
	var high;
	var m;
	if (
		frac === 0.0 || // handles +-0
		isnan( frac ) ||
		isInfinite( frac )
	) {
		return frac;
	}
	// Normalize the input fraction:
	normalize( FRAC, frac );
	frac = FRAC[ 0 ];
	exp += FRAC[ 1 ];

	// Extract the exponent from `frac` and add it to `exp`:
	exp += floatExp( frac );

	// Check for underflow/overflow...
	if ( exp < MIN_SUBNORMAL_EXPONENT ) {
		return copysign( 0.0, frac );
	}
	if ( exp > MAX_EXPONENT ) {
		if ( frac < 0.0 ) {
			return NINF;
		}
		return PINF;
	}
	// Check for a subnormal and scale accordingly to retain precision...
	if ( exp <= MAX_SUBNORMAL_EXPONENT ) {
		exp += 52;
		m = TWO52_INV;
	} else {
		m = 1.0;
	}
	// Split the fraction into higher and lower order words:
	toWords( WORDS, frac );
	high = WORDS[ 0 ];

	// Clear the exponent bits within the higher order word:
	high &= CLEAR_EXP_MASK;

	// Set the exponent bits to the new exponent:
	high |= ((exp+BIAS) << 20);

	// Create a new floating-point number:
	return m * fromWords( high, WORDS[ 1 ] );
}


// EXPORTS //

module.exports = ldexp;

},{"@stdlib/constants/math/float64-exponent-bias":30,"@stdlib/constants/math/float64-max-base2-exponent":38,"@stdlib/constants/math/float64-max-base2-exponent-subnormal":37,"@stdlib/constants/math/float64-min-base2-exponent-subnormal":41,"@stdlib/constants/math/float64-ninf":43,"@stdlib/constants/math/float64-pinf":45,"@stdlib/math/base/assert/is-infinite":55,"@stdlib/math/base/assert/is-nan":59,"@stdlib/math/base/special/copysign":92,"@stdlib/number/float64/base/exponent":242,"@stdlib/number/float64/base/from-words":244,"@stdlib/number/float64/base/normalize":253,"@stdlib/number/float64/base/to-words":262}],192:[function(require,module,exports){
'use strict';

/**
* Evaluate the natural logarithm.
*
* @module @stdlib/math/base/special/ln
*
* @example
* var ln = require( '@stdlib/math/base/special/ln' );
*
* var v = ln( 4.0 );
* // returns ~1.386
*
* v = ln( 0.0 );
* // returns -Infinity
*
* v = ln( Infinity );
* // returns Infinity
*
* v = ln( NaN );
* // returns NaN
*
* v = ln( -4.0 );
* // returns NaN
*/

// MODULES //

var ln = require( './ln.js' );


// EXPORTS //

module.exports = ln;

},{"./ln.js":193}],193:[function(require,module,exports){
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_log.c?view=markup}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* ====================================================
* Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunSoft, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*/

// MODULES //

var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var setHighWord = require( '@stdlib/number/float64/base/set-high-word' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var BIAS = require( '@stdlib/constants/math/float64-exponent-bias' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var polyvalP = require( './polyval_p.js' );
var polyvalQ = require( './polyval_q.js' );


// VARIABLES //

var LN2_HI = 6.93147180369123816490e-01; // 3FE62E42 FEE00000
var LN2_LO = 1.90821492927058770002e-10; // 3DEA39EF 35793C76
var TWO54 = 1.80143985094819840000e+16;  // 0x43500000, 0x00000000
var ONE_THIRD = 0.33333333333333333;

// 0x000fffff = 1048575 => 0 00000000000 11111111111111111111
var HIGH_SIGNIFICAND_MASK = 0x000fffff|0; // asm type annotation

// 0x7ff00000 = 2146435072 => 0 11111111111 00000000000000000000 => biased exponent: 2047 = 1023+1023 => 2^1023
var HIGH_MAX_NORMAL_EXP = 0x7ff00000|0; // asm type annotation

// 0x00100000 = 1048576 => 0 00000000001 00000000000000000000 => biased exponent: 1 = -1022+1023 => 2^-1022
var HIGH_MIN_NORMAL_EXP = 0x00100000|0; // asm type annotation

// 0x3ff00000 = 1072693248 => 0 01111111111 00000000000000000000 => biased exponent: 1023 = 0+1023 => 2^0 = 1
var HIGH_BIASED_EXP_0 = 0x3ff00000|0; // asm type annotation


// MAIN //

/**
* Evaluates the natural logarithm.
*
* @param {NonNegativeNumber} x - input value
* @returns {number} function value
*
* @example
* var v = ln( 4.0 );
* // returns ~1.386
*
* @example
* var v = ln( 0.0 );
* // returns -Infinity
*
* @example
* var v = ln( Infinity );
* // returns Infinity
*
* @example
* var v = ln( NaN );
* // returns NaN
*
* @example
* var v = ln( -4.0 );
* // returns NaN
*/
function ln( x ) {
	var hfsq;
	var hx;
	var t2;
	var t1;
	var k;
	var R;
	var f;
	var i;
	var j;
	var s;
	var w;
	var z;

	if ( x === 0.0 ) {
		return NINF;
	}
	if ( isnan( x ) || x < 0.0 ) {
		return NaN;
	}
	hx = getHighWord( x );
	k = 0|0; // asm type annotation
	if ( hx < HIGH_MIN_NORMAL_EXP ) {
		// Case: 0 < x < 2**-1022
		k -= 54|0; // asm type annotation

		// Subnormal number, scale up `x`:
		x *= TWO54;
		hx = getHighWord( x );
	}
	if ( hx >= HIGH_MAX_NORMAL_EXP ) {
		return x + x;
	}
	k += ( ( hx>>20 ) - BIAS )|0; // asm type annotation
	hx &= HIGH_SIGNIFICAND_MASK;
	i = ( (hx+0x95f64) & 0x100000 )|0; // asm type annotation

	// Normalize `x` or `x/2`...
	x = setHighWord( x, hx|(i^HIGH_BIASED_EXP_0) );
	k += ( i>>20 )|0; // asm type annotation
	f = x - 1.0;
	if ( (HIGH_SIGNIFICAND_MASK&(2+hx)) < 3 ) {
		// Case: -2**-20 <= f < 2**-20
		if ( f === 0.0 ) {
			if ( k === 0 ) {
				return 0.0;
			}
			return (k * LN2_HI) + (k * LN2_LO);
		}
		R = f * f * ( 0.5 - (ONE_THIRD*f) );
		if ( k === 0 ) {
			return f - R;
		}
		return (k * LN2_HI) - ( (R-(k*LN2_LO)) - f );
	}
	s = f / (2.0 + f);
	z = s * s;
	i = ( hx - 0x6147a )|0; // asm type annotation
	w = z * z;
	j = ( 0x6b851 - hx )|0; // asm type annotation
	t1 = w * polyvalP( w );
	t2 = z * polyvalQ( w );
	i |= j;
	R = t2 + t1;
	if ( i > 0 ) {
		hfsq = 0.5 * f * f;
		if ( k === 0 ) {
			return f - ( hfsq - (s * (hfsq+R)) );
		}
		return (k * LN2_HI) - ( hfsq - ((s*(hfsq+R))+(k*LN2_LO)) - f );
	}
	if ( k === 0 ) {
		return f - (s*(f-R));
	}
	return (k * LN2_HI) - ( ( (s*(f-R)) - (k*LN2_LO) ) - f );
}


// EXPORTS //

module.exports = ln;

},{"./polyval_p.js":194,"./polyval_q.js":195,"@stdlib/constants/math/float64-exponent-bias":30,"@stdlib/constants/math/float64-ninf":43,"@stdlib/math/base/assert/is-nan":59,"@stdlib/number/float64/base/get-high-word":248,"@stdlib/number/float64/base/set-high-word":257}],194:[function(require,module,exports){
/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* ## Notes
*
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*/
function evalpoly( x ) {
	if ( x === 0.0 ) {
		return 0.3999999999940942;
	}
	return 0.3999999999940942 + (x * (0.22222198432149784 + (x * 0.15313837699209373))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],195:[function(require,module,exports){
/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* ## Notes
*
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*/
function evalpoly( x ) {
	if ( x === 0.0 ) {
		return 0.6666666666666735;
	}
	return 0.6666666666666735 + (x * (0.2857142874366239 + (x * (0.1818357216161805 + (x * 0.14798198605116586))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],196:[function(require,module,exports){
'use strict';

/**
* Evaluate the natural logarithm of \\(1+x\\).
*
* @module @stdlib/math/base/special/log1p
*
* @example
* var log1p = require( '@stdlib/math/base/special/log1p' );
*
* var v = log1p( 4.0 );
* // returns ~1.609
*
* v = log1p( -1.0 );
* // returns -Infinity
*
* v = log1p( 0.0 );
* // returns 0.0
*
* v = log1p( -0.0 );
* // returns -0.0
*
* v = log1p( -2.0 );
* // returns NaN
*
* v = log1p( NaN );
* // returns NaN
*/

// MODULES //

var log1p = require( './log1p.js' );


// EXPORTS //

module.exports = log1p;

},{"./log1p.js":197}],197:[function(require,module,exports){
'use strict';

/*
* The original C code, long comment, copyright, license, and constants are from [netlib]{http://www.netlib.org/fdlibm/s_log1p.c}.
*
* The long comment and implementation follow the original, but have been reformatted and modified for JavaScript.
*/

/*
* ====================================================
* Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunSoft, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*/

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var highWord = require( '@stdlib/number/float64/base/get-high-word' );
var setHighWord = require( '@stdlib/number/float64/base/set-high-word' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var BIAS = require( '@stdlib/constants/math/float64-exponent-bias' );
var polyval = require( './polyval_lp.js' );


// VARIABLES //

// High and low words of ln(2):
var LN2_HI = 6.93147180369123816490e-01; // 0x3fe62e42 0xfee00000
var LN2_LO = 1.90821492927058770002e-10; // 0x3dea39ef 0x35793c76

// sqrt(2)-1:
var SQRT2M1 = 4.142135623730950488017e-01; // 0x3fda8279 0x99fcef34

// sqrt(2)/2-1:
var SQRT2HALFM1 = -2.928932188134524755992e-01; // 0xbfd2bec3 0x33018866

// 2**-29:
var SMALL = 1.862645149230957e-09; // 0x3e200000 0x00000000

// 2**-54:
var TINY = 5.551115123125783e-17;

// Max integer (unsafe) => 2**53:
var TWO53 = 9007199254740992;

// 2/3:
var TWO_THIRDS = 6.666666666666666666e-01;


// MAIN //

/**
* Evaluates the natural logarithm of \\(1+x\\).
*
* ## Method
*
* 1.  Argument Reduction: find \\(k\\) and \\(f\\) such that
*
*     ```tex
*     1+x = 2^k (1+f)
*     ```
*
*     where
*
*     ```tex
*     \frac{\sqrt{2}}{2} < 1+f < \sqrt{2}
*     ```
*
*     <!-- <note> -->
*
*     If \\(k=0\\), then \\(f=x\\) is exact. However, if \\(k \neq 0\\), then \\(f\\) may not be representable exactly. In that case, a correction term is needed. Let
*
*     ```tex
*     u = \operatorname{round}(1+x)
*     ```
*
*     and
*
*     ```tex
*     c = (1+x) - u
*     ```
*
*     then
*
*     ```tex
*     \ln (1+x) - \ln u \approx \frac{c}{u}
*     ```
*
*     We can thus proceed to compute \\(\ln(u)\\), and add back the correction term \\(c/u\\).
*
*     <!-- </note> -->
*
*     <!-- <note> -->
*
*     When \\(x > 2^{53}\\), one can simply return \\(\ln(x)\\).
*
*     <!-- </note> -->
*
* 2.  Approximation of \\(\operatorname{log1p}(f)\\). Let
*
*     ```tex
*     s = \frac{f}{2+f}
*     ```
*
*     based on
*
*     ```tex
*     \begin{align*}
*     \ln 1+f &= \ln (1+s) - \ln (1-s) \\
*             &= 2s + \frac{2}{3} s^3 + \frac{2}{5} s^5 + ... \\
*             &= 2s + sR \\
*     \end{align*}
*     ```
*
*     We use a special Reme algorithm on \\(\[0,0.1716\]\\) to generate a polynomial of degree \\(14\\) to approximate \\(R\\). The maximum error of this polynomial approximation is bounded by \\(2^{-58.45}\\). In other words,
*
*     ```tex
*     R(z) \approx \mathrm{Lp}_1 s^2 + \mathrm{Lp}_2 s^4 + \mathrm{Lp}_3 s^6 + \mathrm{Lp}_4 s^8 + \mathrm{Lp}_5 s^{10} + \mathrm{Lp}_6 s^{12} + \mathrm{Lp}_7 s^{14}
*     ```
*
*     and
*
*     ```tex
*     | \mathrm{Lp}_1 s^2 + \ldots + \mathrm{Lp}_7 s^14 - R(z) | \leq 2^{-58.45}
*     ```
*
*     <!-- <note> -->
*
*     The values of \\(Lp1\\) to \\(Lp7\\) may be found in the source.
*
*     <!-- </note> -->
*
*     Note that
*
*     ```tex
*     \begin{align*}
*     2s &= f - sf \\
*        &= f - \frac{f^2}{2} + s \frac{f^2}{2} \\
*     \end{align*}
*     ```
*
*     In order to guarantee error in \\(\ln\\) below \\(1\ \mathrm{ulp}\\), we compute the log by
*
*     ```tex
*     \operatorname{log1p}(f) = f - \biggl(\frac{f^2}{2} - s\biggl(\frac{f^2}{2}+R\biggr)\biggr)
*     ```
*
* 3.  Finally,
*
*     ```tex
*     \begin{align*}
*     \operatorname{log1p}(x) &= k \cdot \mathrm{ln2} + \operatorname{log1p}(f) \\
*     &= k \cdot \mathrm{ln2}_{hi}+\biggl(f-\biggl(\frac{f^2}{2}-\biggl(s\biggl(\frac{f^2}{2}+R\biggr)+k \cdot \mathrm{ln2}_{lo}\biggr)\biggr)\biggr) \\
*     \end{align*}
*     ```
*
*     Here \\(\mathrm{ln2}\\) is split into two floating point numbers:
*
*     ```tex
*     \mathrm{ln2}_{hi} + \mathrm{ln2}_{lo}
*     ```
*
*     where \\(n \cdot \mathrm{ln2}_{hi}\\) is always exact for \\(|n| < 2000\\).
*
*
* ## Special Cases
*
* -   \\(\operatorname{log1p}(x) = \mathrm{NaN}\\) with signal if \\(x < -1\\) (including \\(-\infty\\))
* -   \\(\operatorname{log1p}(+\infty) = +\infty\\)
* -   \\(\operatorname{log1p}(-1) = -\infty\\) with signal
* -   \\(\operatorname{log1p}(\mathrm{NaN})= \mathrm{NaN}\\) with no signal
*
*
* ## Notes
*
* -   According to an error analysis, the error is always less than \\(1\\) ulp (unit in the last place).
*
* -   The hexadecimal values are the intended ones for the used constants. The decimal values may be used, provided that the compiler will convert from decimal to binary accurately enough to produce the hexadecimal values shown.
*
* -   Assuming \\(\ln(x)\\) is accurate, the following algorithm can be used to evaluate \\(\operatorname{log1p}(x)\\) to within a few ULP:
*
*     ```javascript
*     var u = 1.0 + x;
*     if ( u === 1.0 ) {
*         return x;
*     } else {
*         return ln(u) * (x/(u-1.0));
*     }
*     ```
*
*     See HP-15C Advanced Functions Handbook, p.193.
*
*
* @param {number} x - input value
* @returns {number} the natural logarithm of `1+x`
*
* @example
* var v = log1p( 4.0 );
* // returns ~1.609
*
* @example
* var v = log1p( -1.0 );
* // returns -Infinity
*
* @example
* var v = log1p( 0.0 );
* // returns 0.0
*
* @example
* var v = log1p( -0.0 );
* // returns -0.0
*
* @example
* var v = log1p( -2.0 );
* // returns NaN
*
* @example
* var v = log1p( NaN );
* // returns NaN
*/
function log1p( x ) {
	var hfsq;
	var hu;
	var y;
	var f;
	var c;
	var s;
	var z;
	var R;
	var u;
	var k;

	if ( x < -1.0 || isnan( x ) ) {
		return NaN;
	}
	if ( x === -1.0 ) {
		return NINF;
	}
	if ( x === PINF ) {
		return x;
	}
	if ( x === 0.0 ) {
		return x; // handle +-0 (IEEE 754-2008 spec)
	}
	// Set y = |x|:
	if ( x < 0.0 ) {
		y = -x;
	} else {
		y = x;
	}
	// Argument reduction...
	k = 1;

	// Check if argument reduction is needed and if we can just return a small value approximation requiring less computation but with equivalent accuracy...
	if ( y < SQRT2M1 ) { // if |x| < sqrt(2)-1 => ~0.41422
		if ( y < SMALL ) { // if |x| < 2**-29
			if ( y < TINY ) { // if |x| < 2**-54
				return x;
			}
			// Use a simple two-term Taylor series...
			return x - ( x*x*0.5 );
		}
		// Check if `f=x` can be represented exactly (no need for correction terms), allowing us to bypass argument reduction...
		if ( x > SQRT2HALFM1 ) { // if x > sqrt(2)/2-1 => ~-0.2929
			// => -0.2929 < x < 0.41422
			k = 0;
			f = x; // exact
			hu = 1;
		}
	}
	// Address case where `f` cannot be represented exactly...
	if ( k !== 0 ) {
		if ( y < TWO53 ) {
			u = 1.0 + x;
			hu = highWord( u );

			// Bit shift to isolate the exponent and then subtract the bias:
			k = (hu>>20) - BIAS;

			// Correction term...
			if ( k > 0 ) { // positive unbiased exponent
				c = 1.0 - (u-x);
			} else { // nonpositive unbiased exponent
				c = x - (u-1.0);
			}
			c /= u;
		} else {
			u = x;
			hu = highWord( u );

			// Bit shift to isolate the exponent and then subtract the bias:
			k = (hu>>20) - BIAS;

			// Correction term is zero:
			c = 0;
		}
		// Apply a bit mask (0 00000000000 11111111111111111111) to remove the exponent:
		hu &= 0x000fffff; // max value => 1048575

		// Check if u significand is less than sqrt(2) significand => 0x6a09e => 01101010000010011110
		if ( hu < 434334 ) {
			// Normalize u by setting the exponent to 1023 (bias) => 0x3ff00000 => 0 01111111111 00000000000000000000
			u = setHighWord( u, hu|0x3ff00000 );
		} else {
			k += 1;

			// Normalize u/2 by setting the exponent to 1022 (bias-1 => 2**-1 = 1/2) => 0x3fe00000 => 0 01111111110 00000000000000000000
			u = setHighWord( u, hu|0x3fe00000 );

			// Subtract hu significand from next largest hu => 0 00000000001 00000000000000000000 => 0x00100000 => 1048576
			hu = (1048576-hu)>>2;
		}
		f = u - 1.0;
	}
	// Approximation of log1p(f)...
	hfsq = 0.5 * f * f;
	if ( hu === 0 ) { // if |f| < 2**-20
		if ( f === 0.0 ) {
			c += k * LN2_LO;
			return ( k * LN2_HI ) + c;
		}
		R = hfsq * (1.0 - ( TWO_THIRDS*f ) ); // avoid division
		return ( k*LN2_HI ) - ( (R - ( (k*LN2_LO) + c)) - f );
	}
	s = f / (2.0 + f);
	z = s * s;

	R = z * polyval( z );

	if ( k === 0 ) {
		return f - ( hfsq - ( s*(hfsq+R) ) );
	}
	return ( k*LN2_HI ) - ( (hfsq - ( (s*(hfsq+R)) + ((k*LN2_LO) + c))) - f );
}


// EXPORTS //

module.exports = log1p;

},{"./polyval_lp.js":198,"@stdlib/constants/math/float64-exponent-bias":30,"@stdlib/constants/math/float64-ninf":43,"@stdlib/constants/math/float64-pinf":45,"@stdlib/math/base/assert/is-nan":59,"@stdlib/number/float64/base/get-high-word":248,"@stdlib/number/float64/base/set-high-word":257}],198:[function(require,module,exports){
/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* ## Notes
*
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*/
function evalpoly( x ) {
	if ( x === 0.0 ) {
		return 0.6666666666666735;
	}
	return 0.6666666666666735 + (x * (0.3999999999940942 + (x * (0.2857142874366239 + (x * (0.22222198432149784 + (x * (0.1818357216161805 + (x * (0.15313837699209373 + (x * 0.14798198605116586))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],199:[function(require,module,exports){
'use strict';

/**
* Return the maximum value.
*
* @module @stdlib/math/base/special/max
*
* @example
* var max = require( '@stdlib/math/base/special/max' );
*
* var v = max( 3.14, 4.2 );
* // returns 4.2
*
* v = max( 5.9, 3.14, 4.2 );
* // returns 5.9
*
* v = max( 3.14, NaN );
* // returns NaN
*
* v = max( +0.0, -0.0 );
* // returns +0.0
*/

// MODULES //

var max = require( './max.js' );


// EXPORTS //

module.exports = max;

},{"./max.js":200}],200:[function(require,module,exports){
'use strict';

// MODULES //

var isPositiveZero = require( '@stdlib/math/base/assert/is-positive-zero' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );


// MAIN //

/**
* Returns the maximum value.
*
* @param {number} [x] - first number
* @param {number} [y] - second number
* @param {...number} [args] - numbers
* @returns {number} maximum value
*
* @example
* var v = max( 3.14, 4.2 );
* // returns 4.2

* @example
* var v = max( 5.9, 3.14, 4.2 );
* // returns 5.9
*
* @example
* var v = max( 3.14, NaN );
* // returns NaN
*
* @example
* var v = max( +0.0, -0.0 );
* // returns +0.0
*/
function max( x, y ) {
	var len;
	var m;
	var v;
	var i;

	len = arguments.length;
	if ( len === 2 ) {
		if ( isnan( x ) || isnan( y ) ) {
			return NaN;
		}
		if ( x === PINF || y === PINF ) {
			return PINF;
		}
		if ( x === y && x === 0.0 ) {
			if ( isPositiveZero( x ) ) {
				return x;
			}
			return y;
		}
		if ( x > y ) {
			return x;
		}
		return y;
	}
	m = NINF;
	for ( i = 0; i < len; i++ ) {
		v = arguments[ i ];
		if ( isnan( v ) || v === PINF ) {
			return v;
		}
		if ( v > m ) {
			m = v;
		} else if (
			v === m &&
			v === 0.0 &&
			isPositiveZero( v )
		) {
			m = v;
		}
	}
	return m;
}


// EXPORTS //

module.exports = max;

},{"@stdlib/constants/math/float64-ninf":43,"@stdlib/constants/math/float64-pinf":45,"@stdlib/math/base/assert/is-nan":59,"@stdlib/math/base/assert/is-positive-zero":65}],201:[function(require,module,exports){
'use strict';

/**
* Return the maximum absolute value.
*
* @module @stdlib/math/base/special/maxabs
*
* @example
* var maxabs = require( '@stdlib/math/base/special/maxabs' );
*
* var v = maxabs( 3.14, -4.2 );
* // returns 4.2
*
* v = maxabs( 5.9, 3.14, 4.2 );
* // returns 5.9
*
* v = maxabs( 3.14, NaN );
* // returns NaN
*
* v = maxabs( +0.0, -0.0 );
* // returns +0.0
*/

// MODULES //

var maxabs = require( './maxabs.js' );


// EXPORTS //

module.exports = maxabs;

},{"./maxabs.js":202}],202:[function(require,module,exports){
'use strict';

// MODULES //

var abs = require( '@stdlib/math/base/special/abs' );
var max = require( '@stdlib/math/base/special/max' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );


// MAIN //

/**
* Returns the maximum absolute value.
*
* @param {number} [x] - first number
* @param {number} [y] - second number
* @param {...number} [args] - numbers
* @returns {number} maximum absolute value
*
* @example
* var v = maxabs( 3.14, -4.2 );
* // returns 4.2

* @example
* var v = maxabs( 5.9, 3.14, 4.2 );
* // returns 5.9
*
* @example
* var v = maxabs( 3.14, NaN );
* // returns NaN
*
* @example
* var v = maxabs( +0.0, -0.0 );
* // returns +0.0
*/
function maxabs( x, y ) {
	var nargs;
	var args;
	var i;

	nargs = arguments.length;
	if ( nargs === 0 ) {
		return PINF;
	}
	if ( nargs === 2 ) {
		return max( abs( x ), abs( y ) );
	}
	args = new Array( nargs );
	for ( i = 0; i < nargs; i++ ) {
		args[ i ] = abs( arguments[ i ] );
	}
	return max.apply( null, args );
}


// EXPORTS //

module.exports = maxabs;

},{"@stdlib/constants/math/float64-pinf":45,"@stdlib/math/base/special/abs":77,"@stdlib/math/base/special/max":199}],203:[function(require,module,exports){
'use strict';

/**
* Return the minimum value.
*
* @module @stdlib/math/base/special/min
*
* @example
* var min = require( '@stdlib/math/base/special/min' );
*
* var v = min( 3.14, 4.2 );
* // returns 3.14
*
* v = min( 5.9, 3.14, 4.2 );
* // returns 3.14
*
* v = min( 3.14, NaN );
* // returns NaN
*
* v = min( +0.0, -0.0 );
* // returns -0.0
*/

// MODULES //

var min = require( './min.js' );


// EXPORTS //

module.exports = min;

},{"./min.js":204}],204:[function(require,module,exports){
'use strict';

// MODULES //

var isNegativeZero = require( '@stdlib/math/base/assert/is-negative-zero' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );


// MAIN //

/**
* Returns the minimum value.
*
* @param {number} [x] - first number
* @param {number} [y] - second number
* @param {...number} [args] - numbers
* @returns {number} minimum value
*
* @example
* var v = min( 3.14, 4.2 );
* // returns 3.14

* @example
* var v = min( 5.9, 3.14, 4.2 );
* // returns 3.14
*
* @example
* var v = min( 3.14, NaN );
* // returns NaN
*
* @example
* var v = min( +0.0, -0.0 );
* // returns -0.0
*/
function min( x, y ) {
	var len;
	var m;
	var v;
	var i;

	len = arguments.length;
	if ( len === 2 ) {
		if ( isnan( x ) || isnan( y ) ) {
			return NaN;
		}
		if ( x === NINF || y === NINF ) {
			return NINF;
		}
		if ( x === y && x === 0.0 ) {
			if ( isNegativeZero( x ) ) {
				return x;
			}
			return y;
		}
		if ( x < y ) {
			return x;
		}
		return y;
	}
	m = PINF;
	for ( i = 0; i < len; i++ ) {
		v = arguments[ i ];
		if ( isnan( v ) || v === NINF ) {
			return v;
		}
		if ( v < m ) {
			m = v;
		} else if (
			v === m &&
			v === 0.0 &&
			isNegativeZero( v )
		) {
			m = v;
		}
	}
	return m;
}


// EXPORTS //

module.exports = min;

},{"@stdlib/constants/math/float64-ninf":43,"@stdlib/constants/math/float64-pinf":45,"@stdlib/math/base/assert/is-nan":59,"@stdlib/math/base/assert/is-negative-zero":61}],205:[function(require,module,exports){
'use strict';

/**
* Return the minimum absolute value.
*
* @module @stdlib/math/base/special/minabs
*
* @example
* var minabs = require( '@stdlib/math/base/special/minabs' );
*
* var v = minabs( -3.14, 4.2 );
* // returns 3.14
*
* v = min( 5.9, 3.14, 4.2 );
* // returns 3.14
*
* v = min( 3.14, NaN );
* // returns NaN
*
* v = min( +0.0, -0.0 );
* // returns +0.0
*/

// MODULES //

var minabs = require( './minabs.js' );


// EXPORTS //

module.exports = minabs;

},{"./minabs.js":206}],206:[function(require,module,exports){
'use strict';

// MODULES //

var abs = require( '@stdlib/math/base/special/abs' );
var min = require( '@stdlib/math/base/special/min' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );


// MAIN //

/**
* Returns the minimum absolute value.
*
* @param {number} [x] - first number
* @param {number} [y] - second number
* @param {...number} [args] - numbers
* @returns {number} minimum absolute value
*
* @example
* var v = minabs( -3.14, 4.2 );
* // returns 3.14

* @example
* var v = minabs( 5.9, 3.14, 4.2 );
* // returns 3.14
*
* @example
* var v = minabs( 3.14, NaN );
* // returns NaN
*
* @example
* var v = minabs( +0.0, -0.0 );
* // returns +0.0
*/
function minabs( x, y ) {
	var nargs;
	var args;
	var i;

	nargs = arguments.length;
	if ( nargs === 0 ) {
		return PINF;
	}
	if ( nargs === 2 ) {
		return min( abs( x ), abs( y ) );
	}
	args = new Array( nargs );
	for ( i = 0; i < nargs; i++ ) {
		args[ i ] = abs( arguments[ i ] );
	}
	return min.apply( null, args );
}


// EXPORTS //

module.exports = minabs;

},{"@stdlib/constants/math/float64-pinf":45,"@stdlib/math/base/special/abs":77,"@stdlib/math/base/special/min":203}],207:[function(require,module,exports){
'use strict';

/**
* Evaluate the exponential function.
*
* @module @stdlib/math/base/special/pow
*
* @example
* var pow = require( '@stdlib/math/base/special/pow' );
*
* var v = pow( 2.0, 3.0 );
* // returns 8.0
*
* v = pow( 4.0, 0.5 );
* // returns 2.0
*
* v = pow( 100.0, 0.0 );
* // returns 1.0
*
* v = pow( Math.PI, 5.0 );
* // returns ~306.0197
*
* v = pow( Math.PI, -0.2 );
* // returns ~0.7954
*
* v = pow( NaN, 3.0 );
* // returns NaN
*
* v = pow( 5.0, NaN );
* // returns NaN
*
* v = pow( NaN, NaN );
* // returns NaN
*/

// MODULES //

var pow = require( './pow.js' );


// EXPORTS //

module.exports = pow;

},{"./pow.js":213}],208:[function(require,module,exports){
'use strict';

// MODULES //

var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var setLowWord = require( '@stdlib/number/float64/base/set-low-word' );
var setHighWord = require( '@stdlib/number/float64/base/set-high-word' );
var BIAS = require( '@stdlib/constants/math/float64-exponent-bias' );
var polyvalL = require( './polyval_l.js' );


// VARIABLES //

// 0x000fffff = 1048575 => 0 00000000000 11111111111111111111
var HIGH_SIGNIFICAND_MASK = 0x000fffff|0; // asm type annotation

// 0x00100000 = 1048576 => 0 00000000001 00000000000000000000 => biased exponent: 1 = -1022+1023 => 2^-1022
var HIGH_MIN_NORMAL_EXP = 0x00100000|0; // asm type annotation

// 0x3ff00000 = 1072693248 => 0 01111111111 00000000000000000000 => biased exponent: 1023 = 0+1023 => 2^0 = 1
var HIGH_BIASED_EXP_0 = 0x3ff00000|0; // asm type annotation

// 0x20000000 = 536870912 => 0 01000000000 00000000000000000000 => biased exponent: 512 = -511+1023
var HIGH_BIASED_EXP_NEG_512 = 0x20000000|0; // asm type annotation

// 0x00080000 = 524288 => 0 00000000000 10000000000000000000
var HIGH_SIGNIFICAND_HALF = 0x00080000|0; // asm type annotation

// TODO: consider making an external constant
var HIGH_NUM_SIGNIFICAND_BITS = 20|0; // asm type annotation

var TWO53 = 9007199254740992.0;	// 0x43400000, 0x00000000

// 2/(3*LN2)
var CP = 9.61796693925975554329e-01; // 0x3FEEC709, 0xDC3A03FD

// (float)CP
var CP_HI = 9.61796700954437255859e-01; // 0x3FEEC709, 0xE0000000

// Low: CP_HI
var CP_LO = -7.02846165095275826516e-09; // 0xBE3E2FE0, 0x145B01F5

var BP = [
	1.0,
	1.5
];
var DP_HI = [
	0.0,
	5.84962487220764160156e-01 // 0x3FE2B803, 0x40000000
];
var DP_LO = [
	0.0,
	1.35003920212974897128e-08 // 0x3E4CFDEB, 0x43CFD006
];


// MAIN //

/**
* Computes \\(\operatorname{log2}(ax)\\).
*
* @private
* @param {Array} out - output array
* @param {number} ax - absolute value of `x`
* @param {number} ahx - high word of `ax`
* @returns {Array} output array containing a tuple comprised of high and low parts
*
* @example
* var t = log2ax( [ 0.0, 0.0 ], 9.0, 1075970048 ); // => [ t1, t2 ]
* // returns [ 3.169923782348633, 0.0000012190936795504075 ]
*/
function log2ax( out, ax, ahx ) {
	var tmp;
	var ss; // `hs + ls`
	var s2; // `ss` squared
	var hs;
	var ls;
	var ht;
	var lt;
	var bp; // `BP` constant
	var dp; // `DP` constant
	var hp;
	var lp;
	var hz;
	var lz;
	var t1;
	var t2;
	var t;
	var r;
	var u;
	var v;
	var n;
	var j;
	var k;

	n = 0|0; // asm type annotation

	// Check if `x` is subnormal...
	if ( ahx < HIGH_MIN_NORMAL_EXP ) {
		ax *= TWO53;
		n -= 53|0; // asm type annotation
		ahx = getHighWord( ax );
	}
	// Extract the unbiased exponent of `x`:
	n += ((ahx >> HIGH_NUM_SIGNIFICAND_BITS) - BIAS)|0; // asm type annotation

	// Isolate the significand bits of `x`:
	j = (ahx & HIGH_SIGNIFICAND_MASK)|0; // asm type annotation

	// Normalize `ahx` by setting the (biased) exponent to `1023`:
	ahx = (j | HIGH_BIASED_EXP_0)|0; // asm type annotation

	// Determine the interval of `|x|` by comparing significand bits...

	// |x| < sqrt(3/2)
	if ( j <= 0x3988E ) { // 0 00000000000 00111001100010001110
		k = 0;
	}
	// |x| < sqrt(3)
	else if ( j < 0xBB67A ) { // 0 00000000000 10111011011001111010
		k = 1;
	}
	// |x| >= sqrt(3)
	else {
		k = 0;
		n += 1|0; // asm type annotation
		ahx -= HIGH_MIN_NORMAL_EXP;
	}
	// Load the normalized high word into `|x|`:
	ax = setHighWord( ax, ahx );

	// Compute `ss = hs + ls = (x-1)/(x+1)` or `(x-1.5)/(x+1.5)`:
	bp = BP[ k ]; // BP[0] = 1.0, BP[1] = 1.5
	u = ax - bp; // (x-1) || (x-1.5)
	v = 1.0 / (ax + bp); // 1/(x+1) || 1/(x+1.5)
	ss = u * v;
	hs = setLowWord( ss, 0 ); // set all low word (less significant significand) bits to 0s

	// Compute `ht = ax + bp` (via manipulation, i.e., bit flipping, of the high word):
	tmp = ((ahx>>1) | HIGH_BIASED_EXP_NEG_512) + HIGH_SIGNIFICAND_HALF;
	tmp += (k << 18); // `(k<<18)` can be considered the word equivalent of `1.0` or `1.5`
	ht = setHighWord( 0.0, tmp );
	lt = ax - (ht - bp);
	ls = v * ( ( u - (hs*ht) ) - ( hs*lt ) );

	// Compute `log(ax)`...

	s2 = ss * ss;
	r = s2 * s2 * polyvalL( s2 );
	r += ls * (hs + ss);
	s2 = hs * hs;
	ht = 3.0 + s2 + r;
	ht = setLowWord( ht, 0 );
	lt = r - ((ht-3.0) - s2);

	// u+v = ss*(1+...):
	u = hs * ht;
	v = ( ls*ht ) + ( lt*ss );

	// 2/(3LN2) * (ss+...):
	hp = u + v;
	hp = setLowWord( hp, 0 );
	lp = v - (hp - u);
	hz = CP_HI * hp; // CP_HI+CP_LO = 2/(3*LN2)
	lz = ( CP_LO*hp ) + ( lp*CP ) + DP_LO[ k ];

	// log2(ax) = (ss+...)*2/(3*LN2) = n + dp + hz + lz
	dp = DP_HI[ k ];
	t = n;
	t1 = ((hz+lz) + dp) + t; // log2(ax)
	t1 = setLowWord( t1, 0 );
	t2 = lz - (((t1-t) - dp) - hz);

	out[ 0 ] = t1;
	out[ 1 ] = t2;
	return out;
}


// EXPORTS //

module.exports = log2ax;

},{"./polyval_l.js":210,"@stdlib/constants/math/float64-exponent-bias":30,"@stdlib/number/float64/base/get-high-word":248,"@stdlib/number/float64/base/set-high-word":257,"@stdlib/number/float64/base/set-low-word":259}],209:[function(require,module,exports){
'use strict';

// MODULES //

var setLowWord = require( '@stdlib/number/float64/base/set-low-word' );
var polyvalW = require( './polyval_w.js' );


// VARIABLES //

// 1/LN2
var INV_LN2 = 1.44269504088896338700e+00; // 0x3FF71547, 0x652B82FE

// High (24 bits): 1/LN2
var INV_LN2_HI = 1.44269502162933349609e+00; // 0x3FF71547, 0x60000000

// Low: 1/LN2
var INV_LN2_LO = 1.92596299112661746887e-08; // 0x3E54AE0B, 0xF85DDF44


// MAIN //

/**
* Computes \\(\operatorname{log}(x)\\) assuming \\(|1-x|\\) is small and using the approximation \\(x - x^2/2 + x^3/3 - x^4/4\\).
*
* @private
* @param {Array} out - output array
* @param {number} ax - absolute value of `x`
* @returns {Array} output array containing a tuple comprised of high and low parts
*
* @example
* var t = logx( [ 0.0, 0.0 ], 9.0 ); // => [ t1, t2 ]
* // returns [ -1265.7236328125, -0.0008163940840404393 ]
*/
function logx( out, ax ) {
	var t2;
	var t1;
	var t;
	var w;
	var u;
	var v;

	t = ax - 1.0; // `t` has `20` trailing zeros
	w = t * t * polyvalW( t );
	u = INV_LN2_HI * t; // `INV_LN2_HI` has `21` significant bits
	v = ( t*INV_LN2_LO ) - ( w*INV_LN2 );
	t1 = u + v;
	t1 = setLowWord( t1, 0 );
	t2 = v - (t1 - u);

	out[ 0 ] = t1;
	out[ 1 ] = t2;
	return out;
}


// EXPORTS //

module.exports = logx;

},{"./polyval_w.js":212,"@stdlib/number/float64/base/set-low-word":259}],210:[function(require,module,exports){
/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* ## Notes
*
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*/
function evalpoly( x ) {
	if ( x === 0.0 ) {
		return 0.5999999999999946;
	}
	return 0.5999999999999946 + (x * (0.4285714285785502 + (x * (0.33333332981837743 + (x * (0.272728123808534 + (x * (0.23066074577556175 + (x * 0.20697501780033842))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],211:[function(require,module,exports){
arguments[4][108][0].apply(exports,arguments)
},{"dup":108}],212:[function(require,module,exports){
/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* ## Notes
*
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*/
function evalpoly( x ) {
	if ( x === 0.0 ) {
		return 0.5;
	}
	return 0.5 + (x * (-0.3333333333333333 + (x * 0.25))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],213:[function(require,module,exports){
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_pow.c?view=markup}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* ====================================================
* Copyright (C) 2004 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunPro, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*/

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isOdd = require( '@stdlib/math/base/assert/is-odd' );
var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
var isInteger = require( '@stdlib/math/base/assert/is-integer' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var abs = require( '@stdlib/math/base/special/abs' );
var toWords = require( '@stdlib/number/float64/base/to-words' );
var setLowWord = require( '@stdlib/number/float64/base/set-low-word' );
var uint32ToInt32 = require( '@stdlib/number/uint32/base/to-int32' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var xIsZero = require( './x_is_zero.js' );
var yIsHuge = require( './y_is_huge.js' );
var yIsInfinite = require( './y_is_infinite.js' );
var log2ax = require( './log2ax.js' );
var logx = require( './logx.js' );
var pow2 = require( './pow2.js' );


// VARIABLES //

// 0x7fffffff = 2147483647 => 0 11111111111 11111111111111111111
var ABS_MASK = 0x7fffffff|0; // asm type annotation

// 0x3fefffff = 1072693247 => 0 01111111110 11111111111111111111 => biased exponent: 1022 = -1+1023 => 2^-1
var HIGH_MAX_NEAR_UNITY = 0x3fefffff|0; // asm type annotation

// 0x41e00000 = 1105199104 => 0 10000011110 00000000000000000000 => biased exponent: 1054 = 31+1023 => 2^31
var HIGH_BIASED_EXP_31 = 0x41e00000|0; // asm type annotation

// 0x43f00000 = 1139802112 => 0 10000111111 00000000000000000000 => biased exponent: 1087 = 64+1023 => 2^64
var HIGH_BIASED_EXP_64 = 0x43f00000|0; // asm type annotation

// 0x40900000 = 1083179008 => 0 10000001001 00000000000000000000 => biased exponent: 1033 = 10+1023 => 2^10 = 1024
var HIGH_BIASED_EXP_10 = 0x40900000|0; // asm type annotation

// 0x3ff00000 = 1072693248 => 0 01111111111 00000000000000000000 => biased exponent: 1023 = 0+1023 => 2^0 = 1
var HIGH_BIASED_EXP_0 = 0x3ff00000|0; // asm type annotation

// 0x4090cc00 = 1083231232 => 0 10000001001 00001100110000000000
var HIGH_1075 = 0x4090cc00|0; // asm type annotation

// 0xc090cc00 = 3230714880 => 1 10000001001 00001100110000000000
var HIGH_NEG_1075 = 0xc090cc00>>>0; // asm type annotation

var HIGH_NUM_NONSIGN_BITS = 31|0; // asm type annotation

var HUGE = 1.0e300;
var TINY = 1.0e-300;

// -(1024-log2(ovfl+.5ulp))
var OVT = 8.0085662595372944372e-17;

// High/low words workspace:
var WORDS = [ 0|0, 0|0 ]; // WARNING: not thread safe

// Log workspace:
var LOG_WORKSPACE = [ 0.0, 0.0 ]; // WARNING: not thread safe


// MAIN //

/**
* Evaluates the exponential function.
*
* ## Method
*
* 1.  Let \\(x = 2^n (1+f)\\).
*
* 2.  Compute \\(\operatorname{log2}(x)\\) as
*
*     ```tex
*     \operatorname{log2}(x) = w_1 + w_2
*     ```
*
*     where \\(w_1\\) has \\(53 - 24 = 29\\) bit trailing zeros.
*
* 3.  Compute
*
*     ```tex
*     y \cdot \operatorname{log2}(x) = n + y^\prime
*     ```
*
*     by simulating multi-precision arithmetic, where \\(|y^\prime| \leq 0.5\\).
*
* 4.  Return
*
*     ```tex
*     x^y = 2^n e^{y^\prime \cdot \mathrm{log2}}
*     ```
*
* ## Special Cases
*
* ```tex
* \begin{align*}
* x^{\mathrm{NaN}} &= \mathrm{NaN} & \\
* (\mathrm{NaN})^y &= \mathrm{NaN} & \\
* 1^y &= 1 & \\
* x^0 &= 1 & \\
* x^1 &= x & \\
* (\pm 0)^\infty &= +0 & \\
* (\pm 0)^{-\infty} &= +\infty & \\
* (+0)^y &= +0 & \mathrm{if}\ y > 0 \\
* (+0)^y &= +\infty & \mathrm{if}\ y < 0 \\
* (-0)^y &= -\infty & \mathrm{if}\ y\ \mathrm{is\ an\ odd\ integer\ and}\ y < 0 \\
* (-0)^y &= +\infty & \mathrm{if}\ y\ \mathrm{is\ not\ an\ odd\ integer\ and}\ y < 0 \\
* (-0)^y &= -0 & \mathrm{if}\ y\ \mathrm{is\ an\ odd\ integer\ and}\ y > 0 \\
* (-0)^y &= +0 & \mathrm{if}\ y\ \mathrm{is\ not\ an\ odd\ integer\ and}\ y > 0 \\
* (-1)^{\pm\infty} &= \mathrm{NaN} & \\
* x^{\infty} &= +\infty & |x| > 1 \\
* x^{\infty} &= +0 & |x| < 1 \\
* x^{-\infty} &= +0 & |x| > 1 \\
* x^{-\infty} &= +\infty & |x| < 1 \\
* (-\infty)^y &= (-0)^y & \\
* \infty^y &= +0 & y < 0 \\
* \infty^y &= +\infty & y > 0 \\
* x^y &= \mathrm{NaN} & \mathrm{if}\ y\ \mathrm{is\ not\ a\ finite\ integer\ and}\ x < 0
* \end{align*}
* ```
*
* ## Notes
*
* -   \\(\operatorname{pow}(x,y)\\) returns \\(x^y\\) nearly rounded. In particular, \\(\operatorname{pow}(<\mathrm{integer}>,<\mathrm{integer}>)\\) **always** returns the correct integer, provided the value is representable.
* -   The hexadecimal values shown in the source code are the intended values for used constants. Decimal values may be used, provided the compiler will accurately convert decimal to binary in order to produce the hexadecimal values.
*
*
* @param {number} x - base
* @param {number} y - exponent
* @returns {number} function value
*
* @example
* var v = pow( 2.0, 3.0 );
* // returns 8.0
*
* @example
* var v = pow( 4.0, 0.5 );
* // returns 2.0
*
* @example
* var v = pow( 100.0, 0.0 );
* // returns 1.0
*
* @example
* var v = pow( Math.PI, 5.0 );
* // returns ~306.0197
*
* @example
* var v = pow( Math.PI, -0.2 );
* // returns ~0.7954
*
* @example
* var v = pow( NaN, 3.0 );
* // returns NaN
*
* @example
* var v = pow( 5.0, NaN );
* // returns NaN
*
* @example
* var v = pow( NaN, NaN );
* // returns NaN
*/
function pow( x, y ) {
	var ahx; // absolute value high word `x`
	var ahy; // absolute value high word `y`
	var ax;  // absolute value `x`
	var hx;  // high word `x`
	var lx;  // low word `x`
	var hy;  // high word `y`
	var ly;  // low word `y`
	var sx;  // sign `x`
	var sy;  // sign `y`
	var y1;
	var hp;
	var lp;
	var t;
	var z;   // y prime
	var j;
	var i;
	if ( isnan( x ) || isnan( y ) ) {
		return NaN;
	}
	// Split `y` into high and low words:
	toWords( WORDS, y );
	hy = WORDS[ 0 ];
	ly = WORDS[ 1 ];

	// Special cases `y`...
	if ( ly === 0 ) {
		if ( y === 0.0 ) {
			return 1.0;
		}
		if ( y === 1.0 ) {
			return x;
		}
		if ( y === -1.0 ) {
			return 1.0 / x;
		}
		if ( y === 0.5 ) {
			return sqrt( x );
		}
		if ( y === -0.5 ) {
			return 1.0 / sqrt( x );
		}
		if ( y === 2.0 ) {
			return x * x;
		}
		if ( y === 3.0 ) {
			return x * x * x;
		}
		if ( y === 4.0 ) {
			x *= x;
			return x * x;
		}
		if ( isInfinite( y ) ) {
			return yIsInfinite( x, y );
		}
	}
	// Split `x` into high and low words:
	toWords( WORDS, x );
	hx = WORDS[ 0 ];
	lx = WORDS[ 1 ];

	// Special cases `x`...
	if ( lx === 0 ) {
		if ( hx === 0 ) {
			return xIsZero( x, y );
		}
		if ( x === 1.0 ) {
			return 1.0;
		}
		if (
			x === -1.0 &&
			isOdd( y )
		) {
			return -1.0;
		}
		if ( isInfinite( x ) ) {
			if ( x === NINF ) {
				// pow( 1/x, -y )
				return pow( -0.0, -y );
			}
			if ( y < 0.0 ) {
				return 0.0;
			}
			return PINF;
		}
	}
	if (
		x < 0.0 &&
		isInteger( y ) === false
	) {
		// signal NaN...
		return (x-x)/(x-x);
	}
	ax = abs( x );

	// Remove the sign bits (i.e., get absolute values):
	ahx = (hx & ABS_MASK)|0; // asm type annotation
	ahy = (hy & ABS_MASK)|0; // asm type annotation

	// Extract the sign bits:
	sx = (hx >>> HIGH_NUM_NONSIGN_BITS)|0; // asm type annotation
	sy = (hy >>> HIGH_NUM_NONSIGN_BITS)|0; // asm type annotation

	// Determine the sign of the result...
	if ( sx && isOdd( y ) ) {
		sx = -1.0;
	} else {
		sx = 1.0;
	}
	// Case 1: `|y|` is huge...

	// |y| > 2^31
	if ( ahy > HIGH_BIASED_EXP_31 ) {
		// `|y| > 2^64`, then must over- or underflow...
		if ( ahy > HIGH_BIASED_EXP_64 ) {
			return yIsHuge( x, y );
		}
		// Over- or underflow if `x` is not close to unity...

		if ( ahx < HIGH_MAX_NEAR_UNITY ) {
			// y < 0
			if ( sy === 1 ) {
				// signal overflow...
				return sx * HUGE * HUGE;
			}
			// signal underflow...
			return sx * TINY * TINY;
		}
		if ( ahx > HIGH_BIASED_EXP_0 ) {
			// y > 0
			if ( sy === 0 ) {
				// signal overflow...
				return sx * HUGE * HUGE;
			}
			// signal underflow...
			return sx * TINY * TINY;
		}
		// At this point, `|1-x|` is tiny (`<= 2^-20`). Suffice to compute `log(x)` by `x - x^2/2 + x^3/3 - x^4/4`.
		t = logx( LOG_WORKSPACE, ax );
	}
	// Case 2: `|y|` is not huge...
	else {
		t = log2ax( LOG_WORKSPACE, ax, ahx );
	}
	// Split `y` into `y1 + y2` and compute `(y1+y2) * (t1+t2)`...
	y1 = setLowWord( y, 0 );
	lp = ( (y-y1)*t[0] ) + ( y*t[1] );
	hp = y1 * t[0];
	z = lp + hp;

	// Note: *can* be more performant to use `getHighWord` and `getLowWord` directly, but using `toWords` looks cleaner.
	toWords( WORDS, z );
	j = uint32ToInt32( WORDS[0] );
	i = uint32ToInt32( WORDS[1] );

	// z >= 1024
	if ( j >= HIGH_BIASED_EXP_10 ) {
		// z > 1024
		if ( ((j-HIGH_BIASED_EXP_10)|i) !== 0 ) {
			// signal overflow...
			return sx * HUGE * HUGE;
		}
		else if ( (lp+OVT) > (z-hp) ) {
			// signal overflow...
			return sx * HUGE * HUGE;
		}
	}
	// z <= -1075
	else if ( (j&ABS_MASK) >= HIGH_1075 ) {
		// z < -1075
		if ( ((j-HIGH_NEG_1075)|i) !== 0 ) {
			// signal underflow...
			return sx * TINY * TINY;
		}
		else if ( lp <= (z-hp) ) {
			// signal underflow...
			return sx * TINY * TINY;
		}
	}
	// Compute `2^(hp+lp)`...
	z = pow2( j, hp, lp );

	return sx * z;
}


// EXPORTS //

module.exports = pow;

},{"./log2ax.js":208,"./logx.js":209,"./pow2.js":214,"./x_is_zero.js":215,"./y_is_huge.js":216,"./y_is_infinite.js":217,"@stdlib/constants/math/float64-ninf":43,"@stdlib/constants/math/float64-pinf":45,"@stdlib/math/base/assert/is-infinite":55,"@stdlib/math/base/assert/is-integer":57,"@stdlib/math/base/assert/is-nan":59,"@stdlib/math/base/assert/is-odd":63,"@stdlib/math/base/special/abs":77,"@stdlib/math/base/special/sqrt":230,"@stdlib/number/float64/base/set-low-word":259,"@stdlib/number/float64/base/to-words":262,"@stdlib/number/uint32/base/to-int32":266}],214:[function(require,module,exports){
'use strict';

// MODULES //

var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var setHighWord = require( '@stdlib/number/float64/base/set-high-word' );
var setLowWord = require( '@stdlib/number/float64/base/set-low-word' );
var uint32ToInt32 = require( '@stdlib/number/uint32/base/to-int32' );
var ldexp = require( '@stdlib/math/base/special/ldexp' );
var LN2 = require( '@stdlib/constants/math/float64-ln-two' );
var BIAS = require( '@stdlib/constants/math/float64-exponent-bias' );
var polyvalP = require( './polyval_p.js' );


// VARIABLES //

// 0x7fffffff = 2147483647 => 0 11111111111 11111111111111111111
var ABS_MASK = 0x7fffffff|0; // asm type annotation

// 0x000fffff = 1048575 => 0 00000000000 11111111111111111111
var HIGH_SIGNIFICAND_MASK = 0x000fffff|0; // asm type annotation

// 0x00100000 = 1048576 => 0 00000000001 00000000000000000000 => biased exponent: 1 = -1022+1023 => 2^-1022
var HIGH_MIN_NORMAL_EXP = 0x00100000|0; // asm type annotation

// 0x3fe00000 = 1071644672 => 0 01111111110 00000000000000000000 => biased exponent: 1022 = -1+1023 => 2^-1
var HIGH_BIASED_EXP_NEG_1 = 0x3fe00000|0; // asm type annotation

// TODO: consider making into an external constant
var HIGH_NUM_SIGNIFICAND_BITS = 20|0; // asm type annotation

// High: LN2
var LN2_HI = 6.93147182464599609375e-01; // 0x3FE62E43, 0x00000000

// Low: LN2
var LN2_LO = -1.90465429995776804525e-09; // 0xBE205C61, 0x0CA86C39


// MAIN //

/**
* Computes \\(2^{\mathrm{hp} + \mathrm{lp}\\).
*
* @private
* @param {number} j - high word of `hp + lp`
* @param {number} hp - first power summand
* @param {number} lp - second power summand
* @returns {number} function value
*
* @example
* var z = pow2( 1065961648, -0.3398475646972656, -0.000002438187359100815 );
* // returns 0.012345679012345678
*/
function pow2( j, hp, lp ) {
	var tmp;
	var t1;
	var t;
	var r;
	var u;
	var v;
	var w;
	var z;
	var n;
	var i;
	var k;

	i = (j & ABS_MASK)|0; // asm type annotation
	k = ((i>>HIGH_NUM_SIGNIFICAND_BITS) - BIAS)|0; // asm type annotation
	n = 0;

	// `|z| > 0.5`, set `n = z+0.5`
	if ( i > HIGH_BIASED_EXP_NEG_1 ) {
		n = (j + (HIGH_MIN_NORMAL_EXP>>(k+1)))>>>0; // asm type annotation
		k = (((n & ABS_MASK)>>HIGH_NUM_SIGNIFICAND_BITS) - BIAS)|0; // new k for n
		tmp = ((n & ~(HIGH_SIGNIFICAND_MASK >> k)))>>>0; // asm type annotation
		t = setHighWord( 0.0, tmp );
		n = (((n & HIGH_SIGNIFICAND_MASK)|HIGH_MIN_NORMAL_EXP) >> (HIGH_NUM_SIGNIFICAND_BITS-k))>>>0; // eslint-disable-line max-len
		if ( j < 0 ) {
			n = -n;
		}
		hp -= t;
	}
	t = lp + hp;
	t = setLowWord( t, 0 );
	u = t * LN2_HI;
	v = ( (lp - (t-hp))*LN2 ) + ( t*LN2_LO );
	z = u + v;
	w = v - (z - u);
	t = z * z;
	t1 = z - ( t*polyvalP( t ) );
	r = ( (z*t1) / (t1-2.0) ) - ( w + (z*w) );
	z = 1.0 - (r - z);
	j = getHighWord( z );
	j = uint32ToInt32( j );
	j += (n << HIGH_NUM_SIGNIFICAND_BITS)>>>0; // asm type annotation

	// Check for subnormal output...
	if ( (j>>HIGH_NUM_SIGNIFICAND_BITS) <= 0 ) {
		z = ldexp( z, n );
	} else {
		z = setHighWord( z, j );
	}
	return z;
}


// EXPORTS //

module.exports = pow2;

},{"./polyval_p.js":211,"@stdlib/constants/math/float64-exponent-bias":30,"@stdlib/constants/math/float64-ln-two":36,"@stdlib/math/base/special/ldexp":190,"@stdlib/number/float64/base/get-high-word":248,"@stdlib/number/float64/base/set-high-word":257,"@stdlib/number/float64/base/set-low-word":259,"@stdlib/number/uint32/base/to-int32":266}],215:[function(require,module,exports){
'use strict';

// MODULES //

var isOdd = require( '@stdlib/math/base/assert/is-odd' );
var copysign = require( '@stdlib/math/base/special/copysign' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );


// MAIN //

/**
* Evaluates the exponential function when \\(|x| = 0\\).
*
* @private
* @param {number} x - base
* @param {number} y - exponent
* @returns {number} function value
*
* @example
* var v = pow( 0.0, 2 );
* // returns 0.0
*
* @example
* var v = pow( -0.0, -9 );
* // returns -Infinity
*
* @example
* var v = pow( 0.0, -9 );
* // returns Infinity
*
* @example
* var v = pow( -0.0, 9 );
* // returns Infinity
*
* @example
* var v = pow( 0.0, -Infinity  );
* // returns Infinity
*
* @example
* var v = pow( 0.0, Infinity );
* // returns 0.0
*/
function pow( x, y ) {
	if ( y === NINF ) {
		return PINF;
	}
	if ( y === PINF ) {
		return 0.0;
	}
	if ( y > 0.0 ) {
		if ( isOdd( y ) ) {
			return x; // handles +-0
		}
		return 0.0;
	}
	// y < 0.0
	if ( isOdd( y ) ) {
		return copysign( PINF, x ); // handles +-0
	}
	return PINF;
}


// EXPORTS //

module.exports = pow;

},{"@stdlib/constants/math/float64-ninf":43,"@stdlib/constants/math/float64-pinf":45,"@stdlib/math/base/assert/is-odd":63,"@stdlib/math/base/special/copysign":92}],216:[function(require,module,exports){
'use strict';

// MODULES //

var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );


// VARIABLES //

// 0x7fffffff = 2147483647 => 0 11111111111 11111111111111111111
var ABS_MASK = 0x7fffffff|0; // asm type annotation

// 0x3fefffff = 1072693247 => 0 01111111110 11111111111111111111 => biased exponent: 1022 = -1+1023 => 2^-1
var HIGH_MAX_NEAR_UNITY = 0x3fefffff|0; // asm type annotation

var HUGE = 1.0e300;
var TINY = 1.0e-300;


// MAIN //

/**
* Evaluates the exponential function when \\(|y| > 2^64\\).
*
* @private
* @param {number} x - base
* @param {number} y - exponent
* @returns {number} overflow or underflow result
*
* @example
* var v = pow( 9.0, 3.6893488147419103e19 );
* // returns Infinity
*
* @example
* var v = pow( -3.14, -3.6893488147419103e19 );
* // returns 0.0
*/
function pow( x, y ) {
	var ahx;
	var hx;

	hx = getHighWord( x );
	ahx = (hx & ABS_MASK);

	if ( ahx <= HIGH_MAX_NEAR_UNITY ) {
		if ( y < 0 ) {
			// signal overflow...
			return HUGE * HUGE;
		}
		// signal underflow...
		return TINY * TINY;
	}
	// `x` has a biased exponent greater than or equal to `0`...

	if ( y > 0 ) {
		// signal overflow...
		return HUGE * HUGE;
	}
	// signal underflow...
	return TINY * TINY;
}


// EXPORTS //

module.exports = pow;

},{"@stdlib/number/float64/base/get-high-word":248}],217:[function(require,module,exports){
'use strict';

// MODULES //

var abs = require( '@stdlib/math/base/special/abs' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );


// MAIN //

/**
* Evaluates the exponential function when \\( y = \pm \infty\\).
*
* @private
* @param {number} x - base
* @param {number} y - exponent
* @returns {number} function value
*
* @example
* var v = pow( -1.0, Infinity );
* // returns NaN
*
* @example
* var v = pow( -1.0, -Infinity  );
* // returns NaN
*
* @example
* var v = pow( 1.0, Infinity );
* // returns 1.0
*
* @example
* var v = pow( 1.0, -Infinity  );
* // returns 1.0
*
* @example
* var v = pow( 0.5, Infinity );
* // returns 0.0
*
* @example
* var v = pow( 0.5, -Infinity  );
* // returns Infinity
*
* @example
* var v = pow( 1.5, -Infinity  );
* // returns 0.0
*
* @example
* var v = pow( 1.5, Infinity );
* // returns Infinity
*/
function pow( x, y ) {
	if ( x === -1.0 ) {
		// Julia (0.4.2) and Python (2.7.9) return `1.0` (WTF???). JavaScript (`Math.pow`), R, and libm return `NaN`. We choose `NaN`, as the value is indeterminate; i.e., we cannot determine whether `y` is odd, even, or somewhere in between.
		return (x-x)/(x-x); // signal NaN
	}
	if ( x === 1.0 ) {
		return 1.0;
	}
	// (|x| > 1 && y === NINF) || (|x| < 1 && y === PINF)
	if ( (abs(x) < 1.0) === (y === PINF) ) {
		return 0.0;
	}
	// (|x| > 1 && y === PINF) || (|x| < 1 && y === NINF)
	return PINF;
}


// EXPORTS //

module.exports = pow;

},{"@stdlib/constants/math/float64-pinf":45,"@stdlib/math/base/special/abs":77}],218:[function(require,module,exports){
'use strict';

/**
* Evaluate `bˣ - 1`.
*
* @module @stdlib/math/base/special/powm1
*
* @example
* var powm1 = require( '@stdlib/math/base/special/powm1' );
*
* var y = powm1( 2.0, 3.0 );
* // returns 7.0
*
* y = powm1( 4.0, 0.5 );
* // returns 1.0
*
* y = powm1( 0.0, 100.0 );
* // returns -1.0
*
* y = powm1( 100.0, 0.0 );
* // returns 0.0
*
* y = powm1( 0.0, 0.0 );
* // returns 0.0
*
* y = powm1( Math.PI, 5.0 );
* // returns ~305.0197
*
* y = powm1( NaN, 3.0 );
* // returns NaN
*
* y = powm1( 5.0, NaN );
* // returns NaN
*/

// MODULES //

var powm1 = require( './powm1.js' );


// EXPORTS //

module.exports = powm1;

},{"./powm1.js":219}],219:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_60_0/boost/math/special_functions/powm1.hpp}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var expm1 = require( '@stdlib/math/base/special/expm1' );
var ln = require( '@stdlib/math/base/special/ln' );
var pow = require( '@stdlib/math/base/special/pow' );
var trunc = require( '@stdlib/math/base/special/trunc' );


// MAIN //

/**
* Evaluates `bˣ - 1`.
*
* @param {number} b - base
* @param {number} x - exponent
* @returns {number} function value
*
* @example
* var y = powm1( 2.0, 3.0 );
* // returns 7.0
*
* @example
* var y = powm1( 4.0, 0.5 );
* // returns 1.0
*
* @example
* var y = powm1( 0.0, 100.0 );
* // returns -1.0
*
* @example
* var y = powm1( 100.0, 0.0 );
* // returns 0.0
*
* @example
* var y = powm1( 0.0, 0.0 );
* // returns 0.0
*
* @example
* var y = powm1( Math.PI, 5.0 );
* // returns ~305.0197
*
* @example
* var y = powm1( NaN, 3.0 );
* // returns NaN
*
* @example
* var y = powm1( 5.0, NaN );
* // returns NaN
*/
function powm1( b, x ) {
	var y;
	if (
		isnan( b ) ||
		isnan( x )
	) {
		return NaN;
	}
	if ( x === 0.0 ) {
		// Any number raised to zero (including 0) is always 1 => b^0 - 1 = 0
		return 0.0;
	}
	if ( b === 0.0 ) {
		// Zero raised to any number (except 0) is always zero => 0^x - 1 = -1
		return -1.0;
	}
	if ( b < 0.0 && x%2.0 === 0 ) {
		// If `x` is even, recognize that `(-b)**x == (b)**x`...
		b = -b;
	}
	if ( b > 0.0 ) {
		if (
			abs( x*(b-1.0) ) < 0.5 ||
			abs( x ) < 0.2
		) {
			// No good/quick approximation for ln(b)*x, so we have to evaluate...
			y = ln( b ) * x;
			if ( y < 0.5 ) {
				return expm1( y );
			}
		}
	} else if ( trunc( x ) !== x ) {
		// Exponentiation would yield a complex result...
		return NaN;
	}
	return pow( b, x ) - 1.0;
}


// EXPORTS //

module.exports = powm1;

},{"@stdlib/math/base/assert/is-nan":59,"@stdlib/math/base/special/abs":77,"@stdlib/math/base/special/expm1":110,"@stdlib/math/base/special/ln":192,"@stdlib/math/base/special/pow":207,"@stdlib/math/base/special/trunc":231}],220:[function(require,module,exports){
'use strict';

/**
* Compute `x - nπ/2 = r`.
*
* @module @stdlib/math/base/special/rempio2
*
* @example
* var rempio2 = require( '@stdlib/math/base/special/rempio2' );
*
* var y = new Array( 2 );
* var n = rempio2( 128.0, y );
* // returns 81
*
* var y1 = y[ 0 ];
* // returns ~0.765
*
* var y2 = y[ 1 ];
* // returns ~3.618e-17
*/

// MODULES //

var rempio2 = require( './rempio2.js' );


// EXPORTS //

module.exports = rempio2;

},{"./rempio2.js":222}],221:[function(require,module,exports){
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/k_rem_pio2.c?view=co}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* ====================================================
* Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunSoft, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*/

// MODULES //

var floor = require( '@stdlib/math/base/special/floor' );
var ldexp = require( '@stdlib/math/base/special/ldexp' );


// VARIABLES //

/*
* Table of constants for `2/π` (`396` hex digits, `476` decimal).
*
* Integer array which contains the (`24*i`)-th to (`24*i+23`)-th bit of `2/π` after binary point. The corresponding floating value is
*
* ```tex
* \operatorname{ipio2}[i] \cdot 2^{-24(i+1)}
* ```
*
* This table must have at least `(e0-3)/24 + jk` terms. For quad precision (`e0 <= 16360`, `jk = 6`), this is `686`.
*/
var IPIO2 = [
	0xA2F983, 0x6E4E44, 0x1529FC, 0x2757D1, 0xF534DD, 0xC0DB62,
	0x95993C, 0x439041, 0xFE5163, 0xABDEBB, 0xC561B7, 0x246E3A,
	0x424DD2, 0xE00649, 0x2EEA09, 0xD1921C, 0xFE1DEB, 0x1CB129,
	0xA73EE8, 0x8235F5, 0x2EBB44, 0x84E99C, 0x7026B4, 0x5F7E41,
	0x3991D6, 0x398353, 0x39F49C, 0x845F8B, 0xBDF928, 0x3B1FF8,
	0x97FFDE, 0x05980F, 0xEF2F11, 0x8B5A0A, 0x6D1F6D, 0x367ECF,
	0x27CB09, 0xB74F46, 0x3F669E, 0x5FEA2D, 0x7527BA, 0xC7EBE5,
	0xF17B3D, 0x0739F7, 0x8A5292, 0xEA6BFB, 0x5FB11F, 0x8D5D08,
	0x560330, 0x46FC7B, 0x6BABF0, 0xCFBC20, 0x9AF436, 0x1DA9E3,
	0x91615E, 0xE61B08, 0x659985, 0x5F14A0, 0x68408D, 0xFFD880,
	0x4D7327, 0x310606, 0x1556CA, 0x73A8C9, 0x60E27B, 0xC08C6B
];

// Double precision array, obtained by cutting `π/2` into `24` bits chunks...
var PIO2 = [
	1.57079625129699707031e+00, // 0x3FF921FB, 0x40000000
	7.54978941586159635335e-08, // 0x3E74442D, 0x00000000
	5.39030252995776476554e-15, // 0x3CF84698, 0x80000000
	3.28200341580791294123e-22, // 0x3B78CC51, 0x60000000
	1.27065575308067607349e-29, // 0x39F01B83, 0x80000000
	1.22933308981111328932e-36, // 0x387A2520, 0x40000000
	2.73370053816464559624e-44, // 0x36E38222, 0x80000000
	2.16741683877804819444e-51  // 0x3569F31D, 0x00000000
];
var TWO24 = 1.67772160000000000000e+07;  // 0x41700000, 0x00000000
var TWON24 = 5.96046447753906250000e-08; // 0x3E700000, 0x00000000

// Arrays for storing temporary values (note that, in C, this is not thread safe):
var F = zero( new Array( 20 ) );
var Q = zero( new Array( 20 ) );
var FQ = zero( new Array( 20 ) );
var IQ = zero( new Array( 20 ) );


// FUNCTIONS //

/**
* Zeros an array.
*
* @private
* @param {Array<number>} arr - array to zero
* @returns {Array<number>} input array
*/
function zero( arr ) {
	var len = arr.length;
	var i;
	for ( i = 0; i < len; i++ ) {
		arr[ i ] = 0.0;
	}
	return arr;
}

/**
* Performs the computation for `kernelRempio2()`.
*
* @private
* @param {PositiveNumber} x - input value
* @param {(Array|TypedArray|Object)} y - output object for storing double precision numbers
* @param {integer} jz - number of terms of `ipio2[]` used
* @param {Array<integer>} q - array with integral values, representing the 24-bits chunk of the product of `x` and `2/π`
* @param {integer} q0 - the corresponding exponent of `q[0]` (the exponent for `q[i]` would be `q0-24*i`)
* @param {integer} jk - `jk+1` is the initial number of terms of `IPIO2[]` needed in the computation
* @param {integer} jv - index for pointing to the suitable `ipio2[]` for the computation
* @param {integer} jx - `nx - 1`
* @param {Array<number>} f - `IPIO2[]` in floating point
* @returns {number} last three binary digits of `N`
*/
function compute( x, y, jz, q, q0, jk, jv, jx, f ) {
	var carry;
	var fw;
	var ih;
	var jp;
	var i;
	var k;
	var n;
	var j;
	var z;

	// `jp+1` is the number of terms in `PIO2[]` needed:
	jp = jk;

	// Distill `q[]` into `IQ[]` in reverse order...
	z = q[ jz ];
	j = jz;
	for ( i = 0; j > 0; i++ ) {
		fw = ( TWON24 * z )|0;
		IQ[ i ] = ( z - (TWO24*fw) )|0;
		z = q[ j-1 ] + fw;
		j -= 1;
	}
	// Compute `n`...
	z = ldexp( z, q0 );
	z -= 8.0 * floor( z*0.125 ); // Trim off integer >= 8
	n = z|0;
	z -= n;
	ih = 0;
	if ( q0 > 0 ) {
		// Need `IQ[jz-1]` to determine `n`...
		i = ( IQ[ jz-1 ] >> (24-q0) );
		n += i;
		IQ[ jz-1 ] -= ( i << (24-q0) );
		ih = ( IQ[ jz-1 ] >> (23-q0) );
	}
	else if ( q0 === 0 ) {
		ih = ( IQ[ jz-1 ] >> 23 );
	}
	else if ( z >= 0.5 ) {
		ih = 2;
	}
	// Case: q > 0.5
	if ( ih > 0 ) {
		n += 1;
		carry = 0;

		// Compute `1-q`:
		for ( i = 0; i < jz; i++ ) {
			j = IQ[ i ];
			if ( carry === 0 ) {
				if ( j !== 0 ) {
					carry = 1;
					IQ[ i ] = 0x1000000 - j;
				}
			} else {
				IQ[ i ] = 0xffffff - j;
			}
		}
		if ( q0 > 0 ) {
			// Rare case: chance is 1 in 12...
			switch ( q0 ) { // eslint-disable-line default-case
			case 1:
				IQ[ jz-1 ] &= 0x7fffff;
				break;
			case 2:
				IQ[ jz-1 ] &= 0x3fffff;
				break;
			}
		}
		if ( ih === 2 ) {
			z = 1.0 - z;
			if ( carry !== 0 ) {
				z -= ldexp( 1.0, q0 );
			}
		}
	}
	// Check if re-computation is needed...
	if ( z === 0.0 ) {
		j = 0;
		for ( i = jz-1; i >= jk; i-- ) {
			j |= IQ[ i ];
		}
		if ( j === 0 ) {
			// Need re-computation...
			for ( k = 1; IQ[ jk-k ] === 0; k++ ) {
				// `k` is the number of terms needed...
			}
			for ( i = jz+1; i <= jz+k; i++ ) {
				// Add `q[jz+1]` to `q[jz+k]`...
				f[ jx+i ] = IPIO2[ jv+i ];
				fw = 0.0;
				for ( j = 0; j <= jx; j++ ) {
					fw += x[ j ] * f[ jx + (i-j) ];
				}
				q[ i ] = fw;
			}
			jz += k;
			return compute( x, y, jz, q, q0, jk, jv, jx, f );
		}
	}
	// Chop off zero terms...
	if ( z === 0.0 ) {
		jz -= 1;
		q0 -= 24;
		while ( IQ[ jz ] === 0 ) {
			jz -= 1;
			q0 -= 24;
		}
	} else {
		// Break `z` into 24-bit if necessary...
		z = ldexp( z, -q0 );
		if ( z >= TWO24 ) {
			fw = (TWON24*z)|0;
			IQ[ jz ] = ( z - (TWO24*fw) )|0;
			jz += 1;
			q0 += 24;
			IQ[ jz ] = fw;
		} else {
			IQ[ jz ] = z|0;
		}
	}
	// Convert integer "bit" chunk to floating-point value...
	fw = ldexp( 1.0, q0 );
	for ( i = jz; i >= 0; i-- ) {
		q[ i ] = fw * IQ[i];
		fw *= TWON24;
	}
	// Compute `PIO2[0,...,jp]*q[jz,...,0]`...
	for ( i = jz; i >= 0; i-- ) {
		fw = 0.0;
		for ( k = 0; k <= jp && k <= jz-i; k++ ) {
			fw += PIO2[ k ] * q[ i+k ];
		}
		FQ[ jz-i ] = fw;
	}
	// Compress `FQ[]` into `y[]`...
	fw = 0.0;
	for ( i = jz; i >= 0; i-- ) {
		fw += FQ[ i ];
	}
	if ( ih === 0 ) {
		y[ 0 ] = fw;
	} else {
		y[ 0 ] = -fw;
	}
	fw = FQ[ 0 ] - fw;
	for ( i = 1; i <= jz; i++ ) {
		fw += FQ[i];
	}
	if ( ih === 0 ) {
		y[ 1 ] = fw;
	} else {
		y[ 1 ] = -fw;
	}
	return ( n & 7 );
}


// MAIN //

/**
* Returns the last three binary digits of `N` with `y = x - Nπ/2` so that `|y| < π/2`.
*
* ## Method
*
* -   The method is to compute the integer (`mod 8`) and fraction parts of `2x/π` without doing the full multiplication. In general, we skip the part of the product that is known to be a huge integer (more accurately, equals `0 mod 8` ). Thus, the number of operations is independent of the exponent of the input.
*
* @private
* @param {PositiveNumber} x - input value
* @param {(Array|TypedArray|Object)} y - remainder elements
* @param {PositiveInteger} e0 - the exponent of `x[0]` (must be <= 16360)
* @param {PositiveInteger} nx - dimension of `x[]`
* @returns {number} last three binary digits of `N`
*/
function kernelRempio2( x, y, e0, nx ) {
	var fw;
	var jk;
	var jv;
	var jx;
	var jz;
	var q0;
	var i;
	var j;
	var m;

	// Initialize `jk` for double-precision floating-point numbers:
	jk = 4;

	// Determine `jx`, `jv`, `q0` (note that `q0 < 3`):
	jx = nx - 1;
	jv = ( (e0 - 3) / 24 )|0;
	if ( jv < 0 ) {
		jv = 0;
	}
	q0 = e0 - (24 * (jv + 1));

	// Set up `F[0]` to `F[jx+jk]` where `F[jx+jk] = IPIO2[jv+jk]`:
	j = jv - jx;
	m = jx + jk;
	for ( i = 0; i <= m; i++ ) {
		if ( j < 0 ) {
			F[ i ] = 0.0;
		} else {
			F[ i ] = IPIO2[ j ];
		}
		j += 1;
	}
	// Compute `Q[0],Q[1],...,Q[jk]`:
	for ( i = 0; i <= jk; i++ ) {
		fw = 0.0;
		for ( j = 0; j <= jx; j++ ) {
			fw += x[ j ] * F[ jx + (i-j) ];
		}
		Q[ i ] = fw;
	}
	jz = jk;
	return compute( x, y, jz, Q, q0, jk, jv, jx, F );
}


// EXPORTS //

module.exports = kernelRempio2;

},{"@stdlib/math/base/special/floor":116,"@stdlib/math/base/special/ldexp":190}],222:[function(require,module,exports){
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_rem_pio2.c?view=co}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* ====================================================
* Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunSoft, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*
* Optimized by Bruce D. Evans.
*/

// MODULES //

var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var getLowWord = require( '@stdlib/number/float64/base/get-low-word' );
var fromWords = require( '@stdlib/number/float64/base/from-words' );
var rempio2Kernel = require( './kernel_rempio2.js' );
var rempio2Medium = require( './rempio2_medium.js' );


// VARIABLES //

var ZERO = 0.00000000000000000000e+00;    // 0x00000000, 0x00000000
var TWO24 = 1.67772160000000000000e+07;   // 0x41700000, 0x00000000

// 33 bits of π/2:
var PIO2_1 = 1.57079632673412561417e+00;  // 0x3FF921FB, 0x54400000

// PIO2_1T = π/2 - PIO2_1:
var PIO2_1T = 6.07710050650619224932e-11; // 0x3DD0B461, 0x1A626331
var TWO_PIO2_1T = 2.0 * PIO2_1T;
var THREE_PIO2_1T = 3.0 * PIO2_1T;
var FOUR_PIO2_1T = 4.0 * PIO2_1T;

// Absolute value mask: 0x7fffffff = 2147483647 => 01111111111111111111111111111111
var ABS_MASK = 0x7fffffff|0; // asm type annotation

// Exponent mask: 0x7ff00000 = 2146435072 => 01111111111100000000000000000000
var EXPONENT_MASK = 0x7ff00000|0; // asm type annotation

// High word significand mask: 0xfffff = 1048575 => 00000000000011111111111111111111
var SIGNIFICAND_MASK = 0xfffff|0; // asm type annotation

// High word significand for π and π/2: 0x921fb = 598523 => 00000000000010010010000111111011
var PI_HIGH_WORD_SIGNIFICAND = 0x921fb|0; // asm type annotation

// High word for π/4: 0x3fe921fb = 1072243195 => 00111111111010010010000111111011
var PIO4_HIGH_WORD = 0x3fe921fb|0; // asm type annotation

// High word for 3π/4: 0x4002d97c = 1073928572 => 01000000000000101101100101111100
var THREE_PIO4_HIGH_WORD = 0x4002d97c|0; // asm type annotation

// High word for 5π/4: 0x400f6a7a = 1074752122 => 01000000000011110110101001111010
var FIVE_PIO4_HIGH_WORD = 0x400f6a7a|0; // asm type annotation

// High word for 6π/4: 0x4012d97c = 1074977148 => 01000000000100101101100101111100
var THREE_PIO2_HIGH_WORD = 0x4012d97c|0; // asm type annotation

// High word for 7π/4: 0x4015fdbc = 1075183036 => 01000000000101011111110110111100
var SEVEN_PIO4_HIGH_WORD = 0x4015fdbc|0; // asm type annotation

// High word for 8π/4: 0x401921fb = 1075388923 => 01000000000110010010000111111011
var TWO_PI_HIGH_WORD = 0x401921fb|0; // asm type annotation

// High word for 9π/4: 0x401c463b = 1075594811 => 01000000000111000100011000111011
var NINE_PIO4_HIGH_WORD = 0x401c463b|0; // asm type annotation

// 2^20*π/2 = 1647099.3291652855 => 0100000100111001001000011111101101010100010001000010110100011000 => high word => 0x413921fb = 1094263291 => 01000001001110010010000111111011
var MEDIUM = 0x413921fb|0; // asm type annotation

// Arrays for storing temporary values:
var TX = new Array( 3 ); // WARNING: not thread safe
var TY = new Array( 2 ); // WARNING: not thread safe


// MAIN //

/**
* Computes `x - nπ/2 = r`.
*
* ## Notes
*
* -   Returns `n` and stores the remainder `r` as two numbers `y[0]` and `y[1]`, such that `y[0]+y[1] = r`.
*
*
* @param {number} x - input value
* @param {(Array|TypedArray|Object)} y - remainder elements
* @returns {integer} factor of `π/2`
*
* @example
* var y = new Array( 2 );
* var n = rempio2( 128.0, y );
* // returns 81
*
* var y1 = y[ 0 ];
* // returns ~0.765
*
* var y2 = y[ 1 ];
* // returns ~3.618e-17
*
* @example
* var y = new Array( 2 );
* var n = rempio2( NaN, y );
* // returns 0
*
* var y1 = y[ 0 ];
* // returns NaN
*
* var y2 = y[ 1 ];
* // returns NaN
*/
function rempio2( x, y ) {
	var low;
	var e0;
	var hx;
	var ix;
	var nx;
	var i;
	var n;
	var z;

	hx = getHighWord( x );
	ix = (hx & ABS_MASK)|0; // asm type annotation

	// Case: |x| ~<= π/4 (no need for reduction)
	if ( ix <= PIO4_HIGH_WORD ) {
		y[ 0 ] = x;
		y[ 1 ] = 0.0;
		return 0;
	}
	// Case: |x| ~<= 5π/4
	if ( ix <= FIVE_PIO4_HIGH_WORD ) {
		// Case: |x| ~= π/2 or π
		if ( (ix & SIGNIFICAND_MASK) === PI_HIGH_WORD_SIGNIFICAND ) {
			// Cancellation => use medium case
			return rempio2Medium( x, ix, y );
		}
		// Case: |x| ~<= 3π/4
		if ( ix <= THREE_PIO4_HIGH_WORD ) {
			if ( x > 0.0 ) {
				z = x - PIO2_1;
				y[ 0 ] = z - PIO2_1T;
				y[ 1 ] = (z - y[0]) - PIO2_1T;
				return 1;
			}
			z = x + PIO2_1;
			y[ 0 ] = z + PIO2_1T;
			y[ 1 ] = (z - y[0]) + PIO2_1T;
			return -1;
		}
		if ( x > 0.0 ) {
			z = x - ( 2.0*PIO2_1 );
			y[ 0 ] = z - TWO_PIO2_1T;
			y[ 1 ] = (z - y[0]) - TWO_PIO2_1T;
			return 2;
		}
		z = x + ( 2.0*PIO2_1 );
		y[ 0 ] = z + TWO_PIO2_1T;
		y[ 1 ] = (z - y[0]) + TWO_PIO2_1T;
		return -2;
	}
	// Case: |x| ~<= 9π/4
	if ( ix <= NINE_PIO4_HIGH_WORD ) {
		// Case: |x| ~<= 7π/4
		if ( ix <= SEVEN_PIO4_HIGH_WORD ) {
			// Case: |x| ~= 3π/2
			if ( ix === THREE_PIO2_HIGH_WORD ) {
				return rempio2Medium( x, ix, y );
			}
			if ( x > 0.0 ) {
				z = x - ( 3.0*PIO2_1 );
				y[ 0 ] = z - THREE_PIO2_1T;
				y[ 1 ] = (z - y[0]) - THREE_PIO2_1T;
				return 3;
			}
			z = x + ( 3.0*PIO2_1 );
			y[ 0 ] = z + THREE_PIO2_1T;
			y[ 1 ] = (z - y[0]) + THREE_PIO2_1T;
			return -3;
		}
		// Case: |x| ~= 4π/2
		if ( ix === TWO_PI_HIGH_WORD ) {
			return rempio2Medium( x, ix, y );
		}
		if ( x > 0.0 ) {
			z = x - ( 4.0*PIO2_1 );
			y[ 0 ] = z - FOUR_PIO2_1T;
			y[ 1 ] = (z - y[0]) - FOUR_PIO2_1T;
			return 4;
		}
		z = x + ( 4.0*PIO2_1 );
		y[ 0 ] = z + FOUR_PIO2_1T;
		y[ 1 ] = (z - y[0]) + FOUR_PIO2_1T;
		return -4;
	}
	// Case: |x| ~< 2^20*π/2 (medium size)
	if ( ix < MEDIUM ) {
		return rempio2Medium( x, ix, y );
	}
	// Case: x is NaN or infinity
	if ( ix >= EXPONENT_MASK ) {
		y[ 0 ] = NaN;
		y[ 1 ] = NaN;
		return 0.0;
	}
	// Set z = scalbn(|x|, ilogb(x)-23)...
	low = getLowWord( x );
	e0 = (ix >> 20) - 1046; // `e0 = ilogb(z) - 23` => unbiased exponent minus 23
	z = fromWords( ix - ((e0 << 20)|0), low );
	for ( i = 0; i < 2; i++ ) {
		TX[ i ] = z|0;
		z = (z - TX[i]) * TWO24;
	}
	TX[ 2 ] = z;
	nx = 3;
	while ( TX[ nx-1 ] === ZERO ) {
		// Skip zero term...
		nx -= 1;
	}
	n = rempio2Kernel( TX, TY, e0, nx, 1 );
	if ( x < 0.0 ) {
		y[ 0 ] = -TY[ 0 ];
		y[ 1 ] = -TY[ 1 ];
		return -n;
	}
	y[ 0 ] = TY[ 0 ];
	y[ 1 ] = TY[ 1 ];
	return n;
}


// EXPORTS //

module.exports = rempio2;

},{"./kernel_rempio2.js":221,"./rempio2_medium.js":223,"@stdlib/number/float64/base/from-words":244,"@stdlib/number/float64/base/get-high-word":248,"@stdlib/number/float64/base/get-low-word":250}],223:[function(require,module,exports){
'use strict';

/*
* The following copyright and license were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/k_rem_pio2.c?view=co}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* ====================================================
* Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunSoft, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*/

// MODULES //

var round = require( '@stdlib/math/base/special/round' );
var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );


// VARIABLES //

// 53 bits of 2/π:
var INVPIO2 = 6.36619772367581382433e-01; // 0x3FE45F30, 0x6DC9C883

// First 33 bits of π/2:
var PIO2_1 = 1.57079632673412561417e+00;  // 0x3FF921FB, 0x54400000

// PIO2_1T = π/2 - PIO2_1:
var PIO2_1T = 6.07710050650619224932e-11; // 0x3DD0B461, 0x1A626331

// Another 33 bits of π/2:
var PIO2_2 = 6.07710050630396597660e-11;  // 0x3DD0B461, 0x1A600000

// PIO2_2T = π/2 - ( PIO2_1 + PIO2_2 ):
var PIO2_2T = 2.02226624879595063154e-21; // 0x3BA3198A, 0x2E037073

// Another 33 bits of π/2:
var PIO2_3 = 2.02226624871116645580e-21;  // 0x3BA3198A, 0x2E000000

// PIO2_3T = π/2 - ( PIO2_1 + PIO2_2 + PIO2_3 ):
var PIO2_3T = 8.47842766036889956997e-32; // 0x397B839A, 0x252049C1

// Exponent mask (2047 => 0x7ff):
var EXPONENT_MASK = 0x7ff|0; // asm type annotation


// MAIN //

/**
* Computes `x - nπ/2 = r` for medium-sized inputs.
*
* @private
* @param {number} x - input value
* @param {uint32} ix - high word of `x`
* @param {(Array|TypedArray|Object)} y - remainder elements
* @returns {integer} factor of `π/2`
*/
function rempio2Medium( x, ix, y ) {
	var high;
	var n;
	var t;
	var r;
	var w;
	var i;
	var j;

	n = round( x * INVPIO2 );
	r = x - ( n * PIO2_1 );
	w = n * PIO2_1T;

	// First rounding (good to 85 bits)...
	j = (ix >> 20)|0; // asm type annotation
	y[ 0 ] = r - w;
	high = getHighWord( y[0] );
	i = j - ( (high >> 20) & EXPONENT_MASK );

	// Check if a second iteration is needed (good to 118 bits)...
	if ( i > 16 ) {
		t = r;
		w = n * PIO2_2;
		r = t - w;
		w = (n * PIO2_2T) - ((t-r) - w);
		y[ 0 ] = r - w;
		high = getHighWord( y[0] );
		i = j - ( (high >> 20) & EXPONENT_MASK );

		// Check if a third iteration is needed (151 bits accumulated)...
		if ( i > 49 ) {
			t = r;
			w = n * PIO2_3;
			r = t - w;
			w = (n * PIO2_3T) - ((t-r) - w);
			y[ 0 ] = r - w;
		}
	}
	y[ 1 ] = (r - y[0]) - w;
	return n;
}


// EXPORTS //

module.exports = rempio2Medium;

},{"@stdlib/math/base/special/round":224,"@stdlib/number/float64/base/get-high-word":248}],224:[function(require,module,exports){
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

},{"./round.js":225}],225:[function(require,module,exports){
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
var round = Math.round;


// EXPORTS //

module.exports = round;

},{}],226:[function(require,module,exports){
'use strict';

/**
* Compute the sine of a number.
*
* @module @stdlib/math/base/special/sin
*
* @example
* var sin = require( '@stdlib/math/base/special/sin' );
*
* var v = sin( 0.0 );
* // returns ~0.0
*
* v = sin( Math.PI/2.0 );
* // returns ~1.0
*
* v = sin( -Math.PI/6.0 );
* // returns ~-0.5
*
* v = sin( NaN );
* // returns NaN
*/

// MODULES //

var sin = require( './sin.js' );


// EXPORTS //

module.exports = sin;

},{"./sin.js":227}],227:[function(require,module,exports){
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_sin.c?view=log}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* ====================================================
* Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunPro, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*/

// MODULES //

var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var kernelCos = require( '@stdlib/math/base/special/kernel-cos' );
var kernelSin = require( '@stdlib/math/base/special/kernel-sin' );
var rempio2 = require( '@stdlib/math/base/special/rempio2' );


// VARIABLES //

// Absolute value mask: 0x7fffffff = 2147483647 => 01111111111111111111111111111111
var ABS_MASK = 0x7fffffff|0; // asm type annotation

// Exponent mask: 0x7ff00000 = 2146435072 => 01111111111100000000000000000000
var EXPONENT_MASK = 0x7ff00000|0; // asm type annotation

// High word for PI/4: 0x3fe921fb = 1072243195 => 00111111111010010010000111111011
var PIO4_HIGH_WORD = 0x3fe921fb|0; // asm type annotation

// 2^-26 = 1.4901161193847656e-8 => 0011111001010000000000000000000000000000000000000000000000000000 => high word => 00111110010100000000000000000000 => 0x3e500000 = 1045430272
var SMALL_HIGH_WORD = 0x3e500000|0; // asm type annotation

// Array for storing remainder elements:
var Y = [ 0.0, 0.0 ]; // WARNING: not thread safe


// MAIN //

/**
* Computes the sine of a number.
*
* ## Method
*
* -   Let \\(S\\), \\(C\\), and \\(T\\) denote the \\(\sin\\), \\(\cos\\), and \\(\tan\\), respectively, on \\(\[-\pi/4, +\pi/4\]\\).
*
* -   Reduce the argument \\(x\\) to \\(y1+y2 = x-k\pi/2\\) in \\(\[-\pi/4, +\pi/4\]\\), and let \\(n = k \mod 4\\).
*
* -   We have
*
*     | n | sin(x) | cos(x) | tan(x) |
*     | - | ------ | ------ | ------ |
*     | 0 |   S    |   C    |    T   |
*     | 1 |   C    |  -S    |  -1/T  |
*     | 2 |  -S    |  -C    |    T   |
*     | 3 |  -C    |   S    |  -1/T  |
*
*
* @param {number} x - input value (in radians)
* @returns {number} sine
*
* @example
* var v = sin( 0.0 );
* // returns ~0.0
*
* @example
* var v = sin( Math.PI/2.0 );
* // returns ~1.0
*
* @example
* var v = sin( -Math.PI/6.0 );
* // returns ~-0.5
*
* @example
* var v = sin( NaN );
* // returns NaN
*/
function sin( x ) {
	var ix;
	var n;

	ix = getHighWord( x );
	ix &= ABS_MASK;

	// Case: |x| ~< π/4
	if ( ix <= PIO4_HIGH_WORD ) {
		// Case: |x| ~< 2^-26
		if ( ix < SMALL_HIGH_WORD ) {
			return x;
		}
		return kernelSin( x, 0.0 );
	}
	// Case: x is NaN or infinity
	if ( ix >= EXPONENT_MASK ) {
		return NaN;
	}
	// Argument reduction...
	n = rempio2( x, Y );
	switch ( n & 3 ) {
	case 0:
		return kernelSin( Y[ 0 ], Y[ 1 ] );
	case 1:
		return kernelCos( Y[ 0 ], Y[ 1 ] );
	case 2:
		return -kernelSin( Y[ 0 ], Y[ 1 ] );
	default:
		return -kernelCos( Y[ 0 ], Y[ 1 ] );
	}
}


// EXPORTS //

module.exports = sin;

},{"@stdlib/math/base/special/kernel-cos":184,"@stdlib/math/base/special/kernel-sin":188,"@stdlib/math/base/special/rempio2":220,"@stdlib/number/float64/base/get-high-word":248}],228:[function(require,module,exports){
'use strict';

/**
* Compute the value of `sin(πx)`.
*
* @module @stdlib/math/base/special/sinpi
*
* @example
* var sinpi = require( '@stdlib/math/base/special/sinpi' );
*
* var y = sinpi( 0.0 );
* // returns 0.0
*
* y = sinpi( 0.5 );
* // returns 1.0
*
* y = sinpi( 0.9 );
* // returns ~0.309
*
* y = sinpi( NaN );
* // returns NaN
*/

// MODULES //

var sinpi = require( './sinpi.js' );


// EXPORTS //

module.exports = sinpi;

},{"./sinpi.js":229}],229:[function(require,module,exports){
'use strict';

/*
* Notes:
*	=> sin(-x) = -sin(x)
*	=> sin(+n) = +0, where `n` is a positive integer
*	=> sin(-n) = -sin(+n) = -0, where `n` is a positive integer
*	=> cos(-x) = cos(x)
*/


// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
var cos = require( '@stdlib/math/base/special/cos' );
var sin = require( '@stdlib/math/base/special/sin' );
var abs = require( '@stdlib/math/base/special/abs' );
var copysign = require( '@stdlib/math/base/special/copysign' );
var PI = require( '@stdlib/constants/math/float64-pi' );


// MAIN //

/**
* Computes the value of `sin(πx)`.
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var y = sinpi( 0.0 );
* // returns 0.0
*
* @example
* var y = sinpi( 0.5 );
* // returns 1.0
*
* @example
* var y = sinpi( 0.9 );
* // returns ~0.309
*
* @example
* var y = sinpi( NaN );
* // returns NaN
*/
function sinpi( x ) {
	var ar;
	var r;
	if ( isnan( x ) ) {
		return NaN;
	}
	if ( isInfinite( x ) ) {
		return NaN;
	}
	// Argument reduction (reduce to [0,2))...
	r = x % 2.0; // sign preserving
	ar = abs( r );

	// If `x` is an integer, the mod is an integer...
	if ( ar === 0.0 || ar === 1.0 ) {
		return copysign( 0.0, r );
	}
	if ( ar < 0.25 ) {
		return sin( PI*r );
	}
	// In each of the following, we further reduce to [-π/4,π/4)...
	if ( ar < 0.75 ) {
		ar = 0.5 - ar;
		return copysign( cos( PI*ar ), r );
	}
	if ( ar < 1.25 ) {
		r = copysign( 1.0, r ) - r;
		return sin( PI*r );
	}
	if ( ar < 1.75 ) {
		ar = ar - 1.5;
		return -copysign( cos( PI*ar ), r );
	}
	r = r - copysign( 2.0, r );
	return sin( PI*r );
}


// EXPORTS //

module.exports = sinpi;

},{"@stdlib/constants/math/float64-pi":44,"@stdlib/math/base/assert/is-infinite":55,"@stdlib/math/base/assert/is-nan":59,"@stdlib/math/base/special/abs":77,"@stdlib/math/base/special/copysign":92,"@stdlib/math/base/special/cos":94,"@stdlib/math/base/special/sin":226}],230:[function(require,module,exports){
'use strict';

/**
* Compute the principal square root.
*
* @module @stdlib/math/base/special/sqrt
*
* @example
* var sqrt = require( '@stdlib/math/base/special/sqrt' );
*
* var v = sqrt( 4.0 );
* // returns 2.0
*
* v = sqrt( 9.0 );
* // returns 3.0
*
* v = sqrt( 0.0 );
* // returns 0.0
*
* v = sqrt( -4.0 );
* // returns NaN
*
* v = sqrt( NaN );
* // returns NaN
*/

// MODULES //

var sqrt = Math.sqrt;


// EXPORTS //

module.exports = sqrt;

},{}],231:[function(require,module,exports){
'use strict';

/**
* Round a numeric value toward zero.
*
* @module @stdlib/math/base/special/trunc
*
* @example
* var trunc = require( '@stdlib/math/base/special/trunc' );
*
* var v = trunc( -4.2 );
* // returns -4.0
*
* v = trunc( 9.99999 );
* // returns 9.0
*
* v = trunc( 0.0 );
* // returns 0.0
*
* v = trunc( -0.0 );
* // returns -0.0
*
* v = trunc( NaN );
* // returns NaN
*
* v = trunc( Infinity );
* // returns Infinity
*
* v = trunc( -Infinity );
* // returns -Infinity
*/

// MODULES //

var trunc = require( './trunc.js' );


// EXPORTS //

module.exports = trunc;

},{"./trunc.js":232}],232:[function(require,module,exports){
'use strict';

// MODULES //

var floor = require( '@stdlib/math/base/special/floor' );
var ceil = require( '@stdlib/math/base/special/ceil' );


// MAIN //

/**
* Rounds a numeric value toward zero.
*
* @param {number} x - input value
* @returns {number} rounded value
*
* @example
* var v = trunc( -4.2 );
* // returns -4.0
*
* @example
* var v = trunc( 9.99999 );
* // returns 9.0
*
* @example
* var v = trunc( 0.0 );
* // returns 0.0
*
* @example
* var v = trunc( -0.0 );
* // returns -0.0
*
* @example
* var v = trunc( NaN );
* // returns NaN
*
* @example
* var v = trunc( Infinity );
* // returns Infinity
*
* @example
* var v = trunc( -Infinity );
* // returns -Infinity
*/
function trunc( x ) {
	if ( x < 0.0 ) {
		return ceil( x );
	}
	return floor( x );
}


// EXPORTS //

module.exports = trunc;

},{"@stdlib/math/base/special/ceil":90,"@stdlib/math/base/special/floor":116}],233:[function(require,module,exports){
'use strict';

// MODULES //

var abs = require( '@stdlib/math/base/special/abs' );
var TOLERANCE = require( '@stdlib/constants/math/float64-eps' );
var TINY = require( '@stdlib/constants/math/float32-smallest-normal' );


// VARIABLES //

var MAX_ITER = 1000000;


// FUNCTIONS //

/**
* Evaluates a continued fraction expansion.
*
* ```text
*           a1
*      ---------------
*      b1 +     a2
*           ----------
*            b2 +   a3
*                -----
*                b3 + ...
* ```
*
* @private
* @param {Function} gen - function giving terms of continued fraction expansion
* @param {PositiveNumber} factor - further terms are only added as long as factor*result is smaller than the next term
* @param {PositiveInteger} maxIter - maximum number of iterations
* @returns {number} evaluated expansion
*/
function continuedFractionA( gen, factor, maxIter ) {
	var delta;
	var a0;
	var C;
	var D;
	var f;
	var v;

	v = gen();
	f = v[ 1 ];
	a0 = v[ 0 ];
	if ( f === 0 ) {
		f = TINY;
	}
	C = f;
	D = 0.0;

	do {
		v = gen();
		if ( v ) {
			D = v[ 1 ] + ( v[ 0 ] * D );
			if ( D === 0.0 ) {
				D = TINY;
			}
			C = v[ 1 ] + ( v[ 0 ] / C );
			if ( C === 0.0 ) {
				C = TINY;
			}
			D = 1.0 / D;
			delta = C * D;
			f = f * delta;
		}
	} while ( v && ( abs( delta - 1.0 ) > factor ) && --maxIter ); // eslint-disable-line no-plusplus

	return a0 / f;
}

/**
* Evaluates a continued fraction expansion.
*
* ```text
*      b0 +   a1
*      ---------------
*      b1 +   a2
*           ----------
*           b2 +   a3
*                -----
*                b3 + ...
* ```
*
* @private
* @param {Function} gen - function giving terms of continued fraction expansion
* @param {PositiveNumber} factor - further terms are only added as long as factor*result is smaller than the next term
* @param {PositiveInteger} maxIter - maximum number of iterations
* @returns {number} evaluated expansion
*/
function continuedFractionB( gen, factor, maxIter ) {
	var delta;
	var C;
	var D;
	var f;
	var v;

	v = gen();
	f = v[ 1 ];
	if ( f === 0.0 ) {
		f = TINY;
	}
	C = f;
	D = 0.0;
	do {
		v = gen();
		if ( v ) {
			D = v[ 1 ] + ( v[ 0 ] * D );
			if ( D === 0.0 ) {
				D = TINY;
			}
			C = v[ 1 ] + ( v[ 0 ] / C );
			if ( C === 0.0 ) {
				C = TINY;
			}
			D = 1.0 / D;
			delta = C * D;
			f = f * delta;
		}
	} while ( v && ( abs( delta - 1.0 ) > factor ) && --maxIter ); // eslint-disable-line no-plusplus
	return f;
}


// MAIN //

/**
* Evaluates the continued fraction approximation for the supplied series generator using the modified Lentz algorithm.
*
* ## References
*
* -   Lentz, William J. 1976. "Generating bessel functions in Mie scattering calculations using continued fractions." _Applied Optics_ 15 (3): 668–71. doi:[10.1364/AO.15.000668](https://doi.org/10.1364/AO.15.000668).
*
* @param {Function} generator - function returning terms of continued fraction expansion
* @param {Object} [options] - function options
* @param {PositiveInteger} [options.maxIter=1000000] - maximum number of iterations
* @param {PositiveNumber} [options.tolerance=2.22e-16] - further terms are only added as long as the next term is greater than current term times the tolerance
* @param {boolean} [options.keep=false] - whether to keep the leading b term
* @returns {number} value of continued fraction
*
* @example
* // Continued fraction for (e-1)^(-1):
* var gen = generator()
* var out = continuedFraction( gen );
* // returns ~0.582
*
* function generator() {
*    var i = 0;
*    return function() {
*        i++;
*        return [ i, i ];
*    };
* }
*/
function continuedFraction( generator, options ) {
	var maxIter;
	var opts;
	var eps;

	opts = {};
	if ( arguments.length > 1 ) {
		opts = options;
	}
	eps = opts.tolerance || TOLERANCE;
	maxIter = opts.maxIter || MAX_ITER;

	if ( opts.keep ) {
		return continuedFractionB( generator, eps, maxIter );
	}
	return continuedFractionA( generator, eps, maxIter );
}


// EXPORTS //

module.exports = continuedFraction;

},{"@stdlib/constants/math/float32-smallest-normal":26,"@stdlib/constants/math/float64-eps":28,"@stdlib/math/base/special/abs":77}],234:[function(require,module,exports){
'use strict';

// MODULES //

var abs = require( '@stdlib/math/base/special/abs' );
var TOLERANCE = require( '@stdlib/constants/math/float64-eps' );
var TINY = require( '@stdlib/constants/math/float32-smallest-normal' );


// VARIABLES //

var MAX_ITER = 1000000;


// FUNCTIONS //

/**
* Evaluates a continued fraction expansion.
*
* ```text
*           a1
*      ---------------
*      b1 +     a2
*           ----------
*            b2 +   a3
*                -----
*                b3 + ...
* ```
*
* @private
* @param {Function} gen - function giving terms of continued fraction expansion
* @param {PositiveNumber} factor - further terms are only added as long as factor*result is smaller than the next term
* @param {PositiveInteger} maxIter - maximum number of iterations
* @returns {number} evaluated expansion
*/
function continuedFractionA( gen, factor, maxIter ) {
	var isgenerator = typeof gen.next === 'function';
	var f;
	var C;
	var D;
	var delta;
	var a0;
	var v = isgenerator ? gen.next().value : gen();
	f = v[ 1 ];
	a0 = v[ 0 ];
	if ( f === 0.0 ) {
		f = TINY;
	}
	C = f;
	D = 0;
	if ( isgenerator === true ) {
		do {
			v = gen.next().value;
			if ( v ) {
				D = v[ 1 ] + ( v[ 0 ] * D );
				if ( D === 0.0 ) {
					D = TINY;
				}
				C = v[ 1 ] + ( v[ 0 ] / C );
				if ( C === 0.0 ) {
					C = TINY;
				}
				D = 1.0 / D;
				delta = C * D;
				f *= delta;
			}
		} while ( ( abs( delta - 1.0 ) > factor ) && --maxIter ); // eslint-disable-line no-plusplus
	} else {
		do {
			v = gen();
			if ( v ) {
				D = v[ 1 ] + ( v[ 0 ] * D );
				if ( D === 0.0 ) {
					D = TINY;
				}
				C = v[ 1 ] + ( v[ 0 ] / C );
				if ( C === 0.0 ) {
					C = TINY;
				}
				D = 1.0 / D;
				delta = C * D;
				f *= delta;
			}
		} while ( v && ( abs( delta - 1.0 ) > factor ) && --maxIter ); // eslint-disable-line no-plusplus
	}
	return a0 / f;
}

/**
* Evaluates a continued fraction expansion.
*
* ```text
*      b0 +    a1
*      ---------------
*      b1 +     a2
*           ----------
*           b2 +   a3
*                -----
*                b3 + ...
* ```
*
* @private
* @param {Function} gen - function giving terms of continued fraction expansion
* @param {PositiveNumber} factor - further terms are only added as long as factor*result is smaller than the next term
* @param {PositiveInteger} maxIter - maximum number of iterations
* @returns {number} evaluated expansion
*/
function continuedFractionB( gen, factor, maxIter ) {
	var isgenerator = typeof gen.next === 'function';
	var f;
	var C;
	var D;
	var delta;
	var v = isgenerator ? gen.next().value : gen();
	f = v[ 1 ];
	if ( f === 0.0 ) {
		f = TINY;
	}
	C = f;
	D = 0.0;
	if ( isgenerator === true ) {
		do {
			v = gen.next().value;
			if ( v ) {
				D = v[ 1 ] + ( v[ 0 ] * D );
				if ( D === 0.0 ) {
					D = TINY;
				}
				C = v[ 1 ] + ( v[ 0 ] / C );
				if ( C === 0.0 ) {
					C = TINY;
				}
				D = 1.0 / D;
				delta = C * D;
				f *= delta;
			}
		} while ( v && ( abs( delta - 1.0 ) > factor ) && --maxIter ); // eslint-disable-line no-plusplus
	} else {
		do {
			v = gen();
			if ( v ) {
				D = v[ 1 ] + ( v[ 0 ] * D );
				if ( D === 0.0 ) {
					D = TINY;
				}
				C = v[ 1 ] + ( v[ 0 ] / C );
				if ( C === 0.0 ) {
					C = TINY;
				}
				D = 1.0 / D;
				delta = C * D;
				f *= delta;
			}
		} while ( v && ( abs( delta - 1.0 ) > factor ) && --maxIter ); // eslint-disable-line no-plusplus
	}
	return f;
}


// MAIN //

/**
* Evaluates the continued fraction approximation for the supplied series generator using the modified Lentz algorithm.
*
* ## References
*
* -   Lentz, William J. 1976. "Generating bessel functions in Mie scattering calculations using continued fractions." _Applied Optics_ 15 (3): 668–71. doi:[10.1364/AO.15.000668](https://doi.org/10.1364/AO.15.000668).
*
* @param {Function} generator - function returning terms of continued fraction expansion
* @param {Object} [options] - function options
* @param {PositiveInteger} [options.maxIter=1000] - maximum number of iterations
* @param {PositiveNumber} [options.tolerance=2.22e-16] - further terms are only added as long as the next term is greater than current term times the tolerance
* @param {boolean} [options.keep=false] - whether to keep the leading b term
* @returns {number} value of continued fraction
*
* @example
* // Continued fraction for (e-1)^(-1):
* var gen = generator();
* var out = continuedFraction( gen );
* // returns ~0.582
*
* function* generator() {
*    var i = 0;
*    while ( true ) {
*        i++;
*        yield [ i, i ];
*    }
* }
*/
function continuedFraction( generator, options ) {
	var maxIter;
	var opts;
	var eps;

	opts = {};
	if ( arguments.length > 1 ) {
		opts = options;
	}
	eps = opts.tolerance || TOLERANCE;
	maxIter = opts.maxIter || MAX_ITER;

	if ( opts.keep ) {
		return continuedFractionB( generator, eps, maxIter );
	}
	return continuedFractionA( generator, eps, maxIter );
}


// EXPORTS //

module.exports = continuedFraction;

},{"@stdlib/constants/math/float32-smallest-normal":26,"@stdlib/constants/math/float64-eps":28,"@stdlib/math/base/special/abs":77}],235:[function(require,module,exports){
'use strict';

/**
* Calculates a continued fraction approximation.
*
* @module @stdlib/math/base/tools/continued-fraction
*
* @example
* var continuedFraction = require( '@stdlib/math/base/tools/continued-fraction' );
*
* // Continued fraction for (e-1)^(-1):
* var gen = generator()
* var out = continuedFraction( gen );
* // returns ~0.582
*
* function generator() {
*    var i = 0;
*    return function() {
*        i++;
*        return [ i, i ];
*    };
* }
*/

// MODULES //

var hasGeneratorsSupport = require( '@stdlib/utils/detect-generator-support' );
var generator = require( './generators.js' );
var basic = require( './basic.js' );


// MAIN //

var continuedFraction;
if ( hasGeneratorsSupport() ) {
	continuedFraction = generator;
} else {
	continuedFraction = basic;
}


// EXPORTS //

module.exports = continuedFraction;

},{"./basic.js":233,"./generators.js":234,"@stdlib/utils/detect-generator-support":276}],236:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* ## Notes
*
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @param {NumericArray} c - polynomial coefficients sorted in ascending degree
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*
* @example
* var v = evalpoly( [3.0,2.0,1.0], 10.0 ); // 3*10^0 + 2*10^1 + 1*10^2
* // returns 123.0
*/
function evalpoly( c, x ) {
	var p;
	var i;

	i = c.length;
	if ( i < 2 || x === 0.0 ) {
		if ( i === 0 ) {
			return 0.0;
		}
		return c[ 0 ];
	}
	i -= 1;
	p = ( c[ i ] * x ) + c[ i-1 ];
	i -= 2;
	while ( i >= 0 ) {
		p = ( p * x ) + c[ i ];
		i -= 1;
	}
	return p;
}


// EXPORTS //

module.exports = evalpoly;

},{}],237:[function(require,module,exports){
'use strict';

// MODULES //

var evalpoly = require( './evalpoly.js' );


// MAIN //

/**
* Generates a function for evaluating a polynomial.
*
* ## Notes
*
* -   The compiled function uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: http://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @param {NumericArray} c - polynomial coefficients sorted in ascending degree
* @returns {Function} function for evaluating a polynomial
*
* @example
* var polyval = factory( [3.0,2.0,1.0] );
*
* var v = polyval( 10.0 ); // => 3*10^0 + 2*10^1 + 1*10^2
* // returns 123.0
*
* v = polyval( 5.0 ); // => 3*5^0 + 2*5^1 + 1*5^2
* // returns 38.0
*/
function factory( c ) {
	var f;
	var n;
	var m;
	var i;

	// Avoid exceeding the maximum stack size on V8 :(. Note that the choice of `500` was empirically determined...
	if ( c.length > 500 ) {
		return polyval;
	}
	// Code generation. Start with the function definition...
	f = 'return function evalpoly(x){';

	// Create the function body...
	n = c.length;

	// If no coefficients, the function always returns 0...
	if ( n === 0 ) {
		f += 'return 0.0;';
	}
	// If only one coefficient, the function always returns that coefficient...
	else if ( n === 1 ) {
		f += 'return ' + c[ 0 ] + ';';
	}
	// If more than one coefficient, apply Horner's method...
	else {
		// If `x == 0`, return the first coefficient...
		f += 'if(x===0.0){return ' + c[ 0 ] + ';}';

		// Otherwise, evaluate the polynomial...
		f += 'return ' + c[ 0 ];
		m = n - 1;
		for ( i = 1; i < n; i++ ) {
			f += '+x*';
			if ( i < m ) {
				f += '(';
			}
			f += c[ i ];
		}
		// Close all the parentheses...
		for ( i = 0; i < m-1; i++ ) {
			f += ')';
		}
		f += ';';
	}
	// Close the function:
	f += '}';

	// Add a source directive for debugging:
	f += '//# sourceURL=evalpoly.factory.js';

	// Create the function in the global scope:
	return ( new Function( f ) )(); // eslint-disable-line no-new-func

	/*
	* returns
	*    function evalpoly( x ) {
	*        if ( x === 0.0 ) {
	*            return c[ 0 ];
	*        }
	*        return c[0]+x*(c[1]+x*(c[2]+x*(c[3]+...+x*(c[n-2]+x*c[n-1]))));
	*    }
	*/

	/**
	* Evaluates a polynomial.
	*
	* @private
	* @param {number} x - value at which to evaluate a polynomial
	* @returns {number} evaluated polynomial
	*/
	function polyval( x ) {
		return evalpoly( c, x );
	}
}


// EXPORTS //

module.exports = factory;

},{"./evalpoly.js":236}],238:[function(require,module,exports){
'use strict';

/**
* Evaluate a polynomial.
*
* @module @stdlib/math/base/tools/evalpoly
*
* @example
* var evalpoly = require( '@stdlib/math/base/tools/evalpoly' );
*
* var v = evalpoly( [3.0,2.0,1.0], 10.0 ); // 3*10^0 + 2*10^1 + 1*10^2
* // returns 123.0
*
* @example
* var evalpoly = require( '@stdlib/math/base/tools/evalpoly' );
*
* var polyval = evalpoly.factory( [3.0,2.0,1.0] );
*
* var v = polyval( 10.0 ); // => 3*10^0 + 2*10^1 + 1*10^2
* // returns 123.0
*
* v = polyval( 5.0 ); // => 3*5^0 + 2*5^1 + 1*5^2
* // returns 38.0
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var evalpoly = require( './evalpoly.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( evalpoly, 'factory', factory );


// EXPORTS //

module.exports = evalpoly;

},{"./evalpoly.js":236,"./factory.js":237,"@stdlib/utils/define-read-only-property":271}],239:[function(require,module,exports){
'use strict';

// MODULES //

var abs = require( '@stdlib/math/base/special/abs' );
var TOLERANCE = require( '@stdlib/constants/math/float64-eps' );


// VARIABLES //

var MAX_TERMS = 1000000;


// MAIN //

/**
* Sum the elements of the series given by the supplied function.
*
* @param {Function} generator - series function
* @param {Object} [options] - function options
* @param {PositiveInteger} [options.maxTerms=1000000] - maximum number of terms to be added
* @param {PositiveNumber} [options.tolerance=2.22e-16] - further terms are only added as long as the next term is greater than current term times the tolerance
* @param {number} [options.initialValue=0] - initial value of the resulting sum
* @returns {number} sum of all series terms
*
* @example
* var gen = geometricSeriesClosure( 0.9 )
* var out = sumSeries( gen );
* // returns 10
*
* function geometricSeriesClosure( x ) {
*     var exponent = -1;
*     return function() {
*         exponent += 1;
*         return Math.pow( x, exponent );
*     };
* }
*/
function sumSeries( generator, options ) {
	var nextTerm;
	var tolerance;
	var counter;
	var result;
	var opts;

	opts = {};

	if ( arguments.length > 1 ) {
		opts = options;
	}
	tolerance = opts.tolerance || TOLERANCE;
	counter = opts.maxTerms || MAX_TERMS;
	result = opts.initialValue || 0;

	// Repeatedly call function...
	do {
		nextTerm = generator();
		result += nextTerm;
	}
	while ( ( abs(tolerance * result) < abs(nextTerm) ) && --counter ); // eslint-disable-line no-plusplus

	return result;
}


// EXPORTS //

module.exports = sumSeries;

},{"@stdlib/constants/math/float64-eps":28,"@stdlib/math/base/special/abs":77}],240:[function(require,module,exports){
'use strict';

// MODULES //

var abs = require( '@stdlib/math/base/special/abs' );
var TOLERANCE = require( '@stdlib/constants/math/float64-eps' );


// VARIABLES //

var MAX_TERMS = 1000000;


// MAIN //

/**
* Sum the elements of the series given by the supplied function.
*
* @param {Function} generator - series function
* @param {Object} [options] - function options
* @param {PositiveInteger} [options.maxTerms=1000000] - maximum number of terms to be added
* @param {PositiveNumber} [options.tolerance=2.22e-16] - further terms are only added as long as the next term is greater than current term times the tolerance
* @param {number} [options.initialValue=0] - initial value of the resulting sum
* @returns {number} sum of all series terms
*
* @example
* var gen = geometricSeriesGenerator( 0.9 );
* var out = sumSeries( gen );
* // returns 10
*
* function* geometricSeriesGenerator( x ) {
*     var exponent = 0;
*     while ( true ) {
*         yield Math.pow( x, exponent );
*         exponent += 1;
*     }
* }
*/
function sumSeries( generator, options ) {
	var isgenerator;
	var tolerance;
	var nextTerm;
	var counter;
	var result;
	var opts;

	opts = {};
	if ( arguments.length > 1 ) {
		opts = options;
	}
	tolerance = opts.tolerance || TOLERANCE;
	counter = opts.maxTerms || MAX_TERMS;
	result = opts.initialValue || 0;

	isgenerator = typeof generator.next === 'function';
	if ( isgenerator === true ) {
		// Case A: Iterate over generator object created by a generator function...
		for ( nextTerm of generator ) {
			result += nextTerm;
			if (
				abs(tolerance * result) >= abs(nextTerm) ||
				--counter === 0 // eslint-disable-line no-plusplus
			) {
				break;
			}
		}
	} else {
		// Case B: Repeatedly call function...
		do {
			nextTerm = generator();
			result += nextTerm;
		}
		while ( ( abs(tolerance * result) < abs(nextTerm) ) && --counter ); // eslint-disable-line no-plusplus
	}
	return result;
}


// EXPORTS //

module.exports = sumSeries;

},{"@stdlib/constants/math/float64-eps":28,"@stdlib/math/base/special/abs":77}],241:[function(require,module,exports){
'use strict';

/**
* Sum the elements of the series given by the supplied function.
*
* @module @stdlib/math/base/tools/sum-series
*
* @example
* var sumSeries = require( '@stdlib/math/base/tools/sum-series' );
*
* var gen = geometricSeriesClosure( 0.9 )
* var out = sumSeries( gen );
* // returns 10
*
* function geometricSeriesClosure( x ) {
*     var exponent = -1;
*     return function() {
*         exponent += 1;
*         return Math.pow( x, exponent );
*     };
* }
*/

// MODULES //

var hasGeneratorsSupport = require( '@stdlib/utils/detect-generator-support' );
var generator = require( './generators.js' );
var basic = require( './basic.js' );


// MAIN //

var sumSeries;
if ( hasGeneratorsSupport() ) {
	sumSeries = generator;
} else {
	sumSeries = basic;
}


// EXPORTS //

module.exports = sumSeries;

},{"./basic.js":239,"./generators.js":240,"@stdlib/utils/detect-generator-support":276}],242:[function(require,module,exports){
'use strict';

/**
* Return an integer corresponding to the unbiased exponent of a double-precision floating-point number.
*
* @module @stdlib/number/float64/base/exponent
*
* @example
* var exponent = require( '@stdlib/number/float64/base/exponent );
*
* var exp = exponent( 3.14e-307 ); // => 2**-1019 ~ 1e-307
* // returns -1019
*
* exp = exponent( -3.14 );
* // returns 1
*
* exp = exponent( 0.0 );
* // returns 0
*
* exp = exponent( NaN );
* // returns 1024
*/

// MODULES //

var exponent = require( './main.js' );


// EXPORTS //

module.exports = exponent;

},{"./main.js":243}],243:[function(require,module,exports){
'use strict';

// MODULES //

var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var EXP_MASK = require( '@stdlib/constants/math/float64-high-word-exponent-mask' );
var BIAS = require( '@stdlib/constants/math/float64-exponent-bias' );


// MAIN //

/**
* Returns an integer corresponding to the unbiased exponent of a double-precision floating-point number.
*
* @param {number} x - input value
* @returns {integer32} unbiased exponent
*
* @example
* var exp = exponent( 3.14e-307 ); // => 2**-1019 ~ 1e-307
* // returns -1019
* @example
* var exp = exponent( -3.14 );
* // returns 1
* @example
* var exp = exponent( 0.0 );
* // returns 0
* @example
* var exp = exponent( NaN );
* // returns 1024
*/
function exponent( x ) {
	// Extract from the input value a higher order word (unsigned 32-bit integer) which contains the exponent:
	var high = getHighWord( x );

	// Apply a mask to isolate only the exponent bits and then shift off all bits which are part of the fraction:
	high = ( high & EXP_MASK ) >>> 20;

	// Remove the bias and return:
	return (high - BIAS)|0; // asm type annotation
}


// EXPORTS //

module.exports = exponent;

},{"@stdlib/constants/math/float64-exponent-bias":30,"@stdlib/constants/math/float64-high-word-exponent-mask":35,"@stdlib/number/float64/base/get-high-word":248}],244:[function(require,module,exports){
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
* // returns 3.141592653589793
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

},{"./main.js":246}],245:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":18}],246:[function(require,module,exports){
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
* @example
* var v = fromWords( 3221823995, 1413754136 );
* // returns 3.141592653589793
* @example
* var v = fromWords( 0, 0 );
* // returns 0.0
* @example
* var v = fromWords( 2147483648, 0 );
* // returns -0.0
* @example
* var v = fromWords( 2146959360, 0 );
* // returns NaN
* @example
* var v = fromWords( 2146435072, 0 );
* // returns Infinity
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

},{"./indices.js":245,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],247:[function(require,module,exports){
'use strict';

// MODULES //

var isLittleEndian = require( '@stdlib/assert/is-little-endian' );


// MAIN //

var HIGH;
if ( isLittleEndian === true ) {
	HIGH = 1; // second index
} else {
	HIGH = 0; // first index
}


// EXPORTS //

module.exports = HIGH;

},{"@stdlib/assert/is-little-endian":18}],248:[function(require,module,exports){
'use strict';

/**
* Return an unsigned 32-bit integer corresponding to the more significant 32 bits of a double-precision floating-point number.
*
* @module @stdlib/number/float64/base/get-high-word
*
* @example
* var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
*
* var w = getHighWord( 3.14e201 ); // => 01101001110001001000001011000011
* // returns 1774486211
*/

// MODULES //

var getHighWord = require( './main.js' );


// EXPORTS //

module.exports = getHighWord;

},{"./main.js":249}],249:[function(require,module,exports){
'use strict';

// MODULES //

var Uint32Array = require( '@stdlib/array/uint32' );
var Float64Array = require( '@stdlib/array/float64' );
var HIGH = require( './high.js' );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );


// MAIN //

/**
* Returns an unsigned 32-bit integer corresponding to the more significant 32 bits of a double-precision floating-point number.
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
* @param {number} x - input value
* @returns {uinteger32} higher order word
*
* @example
* var w = getHighWord( 3.14e201 ); // => 01101001110001001000001011000011
* // returns 1774486211
*/
function getHighWord( x ) {
	FLOAT64_VIEW[ 0 ] = x;
	return UINT32_VIEW[ HIGH ];
}


// EXPORTS //

module.exports = getHighWord;

},{"./high.js":247,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],250:[function(require,module,exports){
'use strict';

/**
* Returns an unsigned 32-bit integer corresponding to the less significant 32 bits of a double-precision floating-point number.
*
* @module @stdlib/number/float64/base/get-low-word
*
* @example
* var getLowWord = require( '@stdlib/number/float64/base/get-low-word' );
*
* var w = getLowWord( 3.14e201 ); // => 10010011110010110101100010000010
* // returns 2479577218
*/

// MODULES //

var getLowWord = require( './main.js' );


// EXPORTS //

module.exports = getLowWord;

},{"./main.js":252}],251:[function(require,module,exports){
'use strict';

// MODULES //

var isLittleEndian = require( '@stdlib/assert/is-little-endian' );


// MAIN //

var LOW;
if ( isLittleEndian === true ) {
	LOW = 0; // first index
} else {
	LOW = 1; // second index
}


// EXPORTS //

module.exports = LOW;

},{"@stdlib/assert/is-little-endian":18}],252:[function(require,module,exports){
'use strict';

// MODULES //

var Uint32Array = require( '@stdlib/array/uint32' );
var Float64Array = require( '@stdlib/array/float64' );
var LOW = require( './low.js' );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );


// MAIN //

/**
* Returns a 32-bit unsigned integer corresponding to the less significant 32 bits of a double-precision floating-point number.
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
* In which Uint32 can we find the lower order bits? If little endian, the first; if big endian, the second.
*
*
* ## References
*
* -   [Open Group][1]
*
* [1]: http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm
*
* @param {number} x - input value
* @returns {uinteger32} lower order word
*
* @example
* var w = getLowWord( 3.14e201 ); // => 10010011110010110101100010000010
* // returns 2479577218
*/
function getLowWord( x ) {
	FLOAT64_VIEW[ 0 ] = x;
	return UINT32_VIEW[ LOW ];
}


// EXPORTS //

module.exports = getLowWord;

},{"./low.js":251,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],253:[function(require,module,exports){
'use strict';

/**
* Returns a normal number `y` and exponent `exp` satisfying \\(x = y \cdot 2^\mathrm{exp}\\).
*
* @module @stdlib/number/float64/base/normalize
*
* @example
* var normalize = require( '@stdlib/number/float64/base/normalize' );
* var pow = require( '@stdlib/math/base/special/pow' );
*
* var out = normalize( 3.14e-319 );
* // returns [ 1.4141234400356668e-303, -52 ]
*
* var y = out[ 0 ];
* var exp = out[ 1 ];
*
* var bool = ( y*pow(2.0,exp) === 3.14e-319 );
* // returns true
*
* @example
* var Float64Array = require( '@stdlib/array/float64' );
* var normalize = require( '@stdlib/number/float64/base/normalize' );
*
* var out = new Float64Array( 2 );
*
* var v = normalize( out, 3.14e-319 );
* // returns <Float64Array>[ 1.4141234400356668e-303, -52 ]
*
* var bool = ( v === out );
* // returns true
*/

// MODULES //

var normalize = require( './main.js' );


// EXPORTS //

module.exports = normalize;

},{"./main.js":254}],254:[function(require,module,exports){
'use strict';

// MODULES //

var fcn = require( './normalize.js' );


// MAIN //

/**
* Returns a normal number `y` and exponent `exp` satisfying \\(x = y \cdot 2^\mathrm{exp}\\).
*
* @param {(Array|TypedArray|Object)} [out] - output array
* @param {number} x - input value
* @returns {(Array|TypedArray|Object)} output array
*
* @example
* var pow = require( '@stdlib/math/base/special/pow' );
*
* var out = normalize( new Array( 2 ), 3.14e-319 );
* // returns [ 1.4141234400356668e-303, -52 ]
*
* var y = out[ 0 ];
* var exp = out[ 1 ];
*
* var bool = ( y*pow(2.0,exp) === 3.14e-319 );
* // returns true
*
* @example
* var Float64Array = require( '@stdlib/array/float64' );
* var pow = require( '@stdlib/math/base/special/pow' );
*
* var out = new Float64Array( 2 );
*
* var v = normalize( out, 3.14e-319 );
* // returns <Float64Array>[ 1.4141234400356668e-303, -52 ]
*
* var bool = ( v === out );
* // returns true
*
* @example
* var out = normalize( new Array( 2 ), 0.0 );
* // returns [ 0.0, 0 ];
*
* @example
* var out = normalize( new Array( 2 ), Infinity );
* // returns [ Infinity, 0 ]
*
* @example
* var out = normalize( new Array( 2 ), -Infinity );
* // returns [ -Infinity, 0 ]
*
* @example
* var out = normalize( new Array( 2 ), NaN );
* // returns [ NaN, 0 ]
*/
function normalize( out, x ) {
	if ( arguments.length === 1 ) {
		return fcn( [ 0.0, 0 ], out );
	}
	return fcn( out, x );
}


// EXPORTS //

module.exports = normalize;

},{"./normalize.js":255}],255:[function(require,module,exports){
'use strict';

// MODULES //

var FLOAT64_SMALLEST_NORMAL = require( '@stdlib/constants/math/float64-smallest-normal' );
var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );


// VARIABLES //

// (1<<52)
var SCALAR = 4503599627370496;


// MAIN //

/**
* Returns a normal number `y` and exponent `exp` satisfying \\(x = y \cdot 2^\mathrm{exp}\\).
*
* @private
* @param {(Array|TypedArray|Object)} out - output array
* @param {number} x - input value
* @returns {(Array|TypedArray|Object)} output array
*
* @example
* var pow = require( '@stdlib/math/base/special/pow' );
*
* var out = normalize( new Array( 2 ), 3.14e-319 );
* // returns [ 1.4141234400356668e-303, -52 ]
*
* var y = out[ 0 ];
* var exp = out[ 1 ];
*
* var bool = ( y*pow(2.0,exp) === 3.14e-319 );
* // returns true
*
* @example
* var out = normalize( new Array( 2 ), 0.0 );
* // returns [ 0.0, 0 ];
*
* @example
* var out = normalize( new Array( 2 ), Infinity );
* // returns [ Infinity, 0 ]
*
* @example
* var out = normalize( new Array( 2 ), -Infinity );
* // returns [ -Infinity, 0 ]
*
* @example
* var out = normalize( new Array( 2 ), NaN );
* // returns [ NaN, 0 ]
*/
function normalize( out, x ) {
	if ( isnan( x ) || isInfinite( x ) ) {
		out[ 0 ] = x;
		out[ 1 ] = 0;
		return out;
	}
	if ( x !== 0.0 && abs( x ) < FLOAT64_SMALLEST_NORMAL ) {
		out[ 0 ] = x * SCALAR;
		out[ 1 ] = -52;
		return out;
	}
	out[ 0 ] = x;
	out[ 1 ] = 0;
	return out;
}


// EXPORTS //

module.exports = normalize;

},{"@stdlib/constants/math/float64-smallest-normal":46,"@stdlib/math/base/assert/is-infinite":55,"@stdlib/math/base/assert/is-nan":59,"@stdlib/math/base/special/abs":77}],256:[function(require,module,exports){
arguments[4][247][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":18,"dup":247}],257:[function(require,module,exports){
'use strict';

/**
* Set the more significant 32 bits of a double-precision floating-point number.
*
* @module @stdlib/number/float64/base/set-high-word
*
* @example
* var setHighWord = require( '@stdlib/number/float64/base/set-high-word' );
*
* var high = 5 >>> 0; // => 0 00000000000 00000000000000000101
*
* var y = setHighWord( 3.14e201, high ); // => 0 00000000000 0000000000000000010110010011110010110101100010000010
* // returns 1.18350528745e-313
*
* @example
* var setHighWord = require( '@stdlib/number/float64/base/set-high-word' );
* var PINF = require( '@stdlib/constants/math/float64-pinf' ); //  => 0 11111111111 00000000000000000000 00000000000000000000000000000000
*
* var high = 1072693248 >>> 0; // => 0 01111111111 00000000000000000000
*
* // Set the higher order bits of `+infinity` to return `1`:
* var y = setHighWord( PINF, high ); => 0 01111111111 0000000000000000000000000000000000000000000000000000
* // returns 1.0
*/

// MODULES //

var setHighWord = require( './main.js' );


// EXPORTS //

module.exports = setHighWord;

},{"./main.js":258}],258:[function(require,module,exports){
'use strict';

// MODULES //

var Uint32Array = require( '@stdlib/array/uint32' );
var Float64Array = require( '@stdlib/array/float64' );
var HIGH = require( './high.js' );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );


// MAIN //

/**
* Sets the more significant 32 bits of a double-precision floating-point number.
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
* @param {number} x - double
* @param {uinteger32} high - unsigned 32-bit integer to replace the higher order word of `x`
* @returns {number} double having the same lower order word as `x`
*
* @example
* var high = 5 >>> 0; // => 0 00000000000 00000000000000000101
*
* var y = setHighWord( 3.14e201, high ); //  => 0 00000000000 0000000000000000010110010011110010110101100010000010
* // returns 1.18350528745e-313
*
* @example
* var PINF = require( '@stdlib/constants/math/float64-pinf' ); // => 0 11111111111 00000000000000000000 00000000000000000000000000000000
*
* var high = 1072693248 >>> 0; // => 0 01111111111 00000000000000000000
*
* // Set the higher order bits of `+infinity` to return `1`:
* var y = setHighWord( PINF, high ); => 0 01111111111 0000000000000000000000000000000000000000000000000000
* // returns 1.0
*/
function setHighWord( x, high ) {
	FLOAT64_VIEW[ 0 ] = x;
	UINT32_VIEW[ HIGH ] = ( high >>> 0 ); // identity bit shift to ensure integer
	return FLOAT64_VIEW[ 0 ];
}


// EXPORTS //

module.exports = setHighWord;

},{"./high.js":256,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],259:[function(require,module,exports){
'use strict';

/**
* Set the less significant 32 bits of a double-precision floating-point number.
*
* @module @stdlib/number/float64/base/set-low-word
*
* @example
* var setLowWord = require( '@stdlib/number/float64/base/set-low-word' );
*
* var low = 5 >>> 0; // => 00000000000000000000000000000101
*
* var x = 3.14e201; // => 0 11010011100 01001000001011000011 10010011110010110101100010000010
*
* var y = setLowWord( x, low ); // => 0 11010011100 01001000001011000011 00000000000000000000000000000101
* // returns 3.139998651394392e+201
*
* @example
* var setLowWord = require( '@stdlib/number/float64/base/set-low-word' );
* var PINF = require( '@stdlib/constants/math/float64-pinf' );
* var NINF = require( '@stdlib/constants/math/float64-ninf' );
*
* var low = 12345678;
*
* var y = setLowWord( PINF, low );
* // returns NaN
*
* y = setLowWord( NINF, low );
* // returns NaN
*
* y = setLowWord( NaN, low );
* // returns NaN
*/

// MODULES //

var setLowWord = require( './main.js' );


// EXPORTS //

module.exports = setLowWord;

},{"./main.js":261}],260:[function(require,module,exports){
arguments[4][251][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":18,"dup":251}],261:[function(require,module,exports){
'use strict';

// MODULES //

var Uint32Array = require( '@stdlib/array/uint32' );
var Float64Array = require( '@stdlib/array/float64' );
var LOW = require( './low.js' );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );


// MAIN //

/**
* Sets the less significant 32 bits of a double-precision floating-point number.
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
* In which Uint32 can we find the lower order bits? If little endian, the first; if big endian, the second.
*
*
* ## References
*
* -   [Open Group][1]
*
* [1]: http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm
*
* @param {number} x - double
* @param {uinteger32} low - unsigned 32-bit integer to replace the lower order word of `x`
* @returns {number} double having the same higher order word as `x`
*
* @example
* var low = 5 >>> 0; // => 00000000000000000000000000000101
*
* var x = 3.14e201; // => 0 11010011100 01001000001011000011 10010011110010110101100010000010
*
* var y = setLowWord( x, low ); // => 0 11010011100 01001000001011000011 00000000000000000000000000000101
* // returns 3.139998651394392e+201
*
* @example
* var PINF = require( '@stdlib/constants/math/float64-pinf' );
* var NINF = require( '@stdlib/constants/math/float64-ninf' );
*
* var low = 12345678;
*
* var y = setLowWord( PINF, low );
* // returns NaN
*
* y = setLowWord( NINF, low );
* // returns NaN
*
* y = setLowWord( NaN, low );
* // returns NaN
*/
function setLowWord( x, low ) {
	FLOAT64_VIEW[ 0 ] = x;
	UINT32_VIEW[ LOW ] = ( low >>> 0 ); // identity bit shift to ensure integer
	return FLOAT64_VIEW[ 0 ];
}


// EXPORTS //

module.exports = setLowWord;

},{"./low.js":260,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],262:[function(require,module,exports){
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

},{"./main.js":264}],263:[function(require,module,exports){
arguments[4][245][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":18,"dup":245}],264:[function(require,module,exports){
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

},{"./to_words.js":265}],265:[function(require,module,exports){
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

},{"./indices.js":263,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],266:[function(require,module,exports){
'use strict';

/**
* Convert an unsigned 32-bit integer to a signed 32-bit integer.
*
* @module @stdlib/number/uint32/base/to-int32
*
* @example
* var float64ToUint32 = require( '@stdlib/number/float64/base/to-uint32' );
* var uint32ToInt32 = require( '@stdlib/number/uint32/base/to-int32' );
*
* var y = uint32ToInt32( float64ToUint32( 4294967295 ) );
* // returns -1
*
* y = uint32ToInt32( float64ToUint32( 3 ) );
* // returns 3
*/

// MODULES //

var uint32ToInt32 = require( './main.js' );


// EXPORTS //

module.exports = uint32ToInt32;

},{"./main.js":267}],267:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Converts an unsigned 32-bit integer to a signed 32-bit integer.
*
* @param {uinteger32} x - unsigned 32-bit integer
* @returns {integer32} signed 32-bit integer
*
* @example
* var float64ToUint32 = require( '@stdlib/number/float64/base/to-uint32' );
* var y = uint32ToInt32( float64ToUint32( 4294967295 ) );
* // returns -1
*
* @example
* var float64ToUint32 = require( '@stdlib/number/float64/base/to-uint32' );
* var y = uint32ToInt32( float64ToUint32( 3 ) );
* // returns 3
*/
function uint32ToInt32( x ) {
	// NOTE: we could also use typed-arrays to achieve the same end.
	return x|0; // asm type annotation
}


// EXPORTS //

module.exports = uint32ToInt32;

},{}],268:[function(require,module,exports){
'use strict';

/**
* Creates a function which always returns the same value.
*
* @param {*} [value] - value to always return
* @returns {Function} constant function
*
* @example
* var fcn = wrap( 3.14 );
*
* var v = fcn();
* // returns 3.14
*
* v = fcn();
* // returns 3.14
*
* v = fcn();
* // returns 3.14
*/
function wrap( value ) {
	return constantFunction;

	/**
	* Constant function.
	*
	* @returns {*} constant value
	*/
	function constantFunction() {
		return value;
	}
}


// EXPORTS //

module.exports = wrap;

},{}],269:[function(require,module,exports){
'use strict';

/**
* Create a constant function.
*
* @module @stdlib/utils/constant-function
*
* @example
* var constantFunction = require( '@stdlib/utils/constant-function' );
*
* var fcn = constantFunction( 3.14 );
*
* var v = fcn();
* // returns 3.14
*
* v = fcn();
* // returns 3.14
*
* v = fcn();
* // returns 3.14
*/

// MODULES //

var constantFunction = require( './constant_function.js' );


// EXPORTS //

module.exports = constantFunction;

},{"./constant_function.js":268}],270:[function(require,module,exports){
'use strict';

/**
* Defines a read-only property.
*
* @param {Object} obj - object on which to define the property
* @param {string} prop - property name
* @param {*} value - value to set
*
* @example
* var obj = {};
* setReadOnly( obj, 'foo', 'bar' );
* obj.foo = 'boop'; // => throws
*/
function setReadOnly( obj, prop, value ) {
	Object.defineProperty( obj, prop, {
		'value': value,
		'configurable': false,
		'writable': false,
		'enumerable': true
	});
}


// EXPORTS //

module.exports = setReadOnly;

},{}],271:[function(require,module,exports){
'use strict';

/**
* Defines a read-only property.
*
* @module @stdlib/utils/define-read-only-property
*
* @example
* var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
*
* var obj = {};
* setReadOnly( obj, 'foo', 'bar' );
* obj.foo = 'boop'; // => throws
*/

// MODULES //

var setReadOnly = require( './define_read_only_property.js' );


// EXPORTS //

module.exports = setReadOnly;

},{"./define_read_only_property.js":270}],272:[function(require,module,exports){
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

},{"./float64array.js":273,"@stdlib/assert/is-float64array":15}],273:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Float64Array === 'function' ) ? Float64Array : null;

},{}],274:[function(require,module,exports){
'use strict';

/**
* Test for native `Float64Array` support.
*
* @module @stdlib/utils/detect-float64array-support
*
* @example
* var hasFloat64ArraySupport = require( '@stdlib/utils/detect-float64array-support' );
*
* var bool = hasFloat64ArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasFloat64ArraySupport = require( './detect_float64array_support.js' );


// EXPORTS //

module.exports = hasFloat64ArraySupport;

},{"./detect_float64array_support.js":272}],275:[function(require,module,exports){
'use strict';

// MODULES //

var evil = require( '@stdlib/utils/eval' );


// MAIN //

/**
* Tests for native `function*()` support.
*
* @returns {boolean} boolean indicating if an environment has native `function*()` support
*
* @example
* var bool = hasGeneratorSupport();
* // returns <boolean>
*/
function hasGeneratorSupport() {
	var bool;
	try {
		evil( '"use strict"; (function* () {})' );
		bool = true;
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasGeneratorSupport;

},{"@stdlib/utils/eval":290}],276:[function(require,module,exports){
'use strict';

/**
* Test for native `function*()` support.
*
* @module @stdlib/utils/detect-generator-support
*
* @example
* var hasGeneratorSupport = require( '@stdlib/utils/detect-generator-support' );
*
* var bool = hasGeneratorSupport();
* // returns <boolean>
*/

// MODULES //

var hasGeneratorSupport = require( './detect_generator_support.js' );


// EXPORTS //

module.exports = hasGeneratorSupport;

},{"./detect_generator_support.js":275}],277:[function(require,module,exports){
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

},{}],278:[function(require,module,exports){
'use strict';

/**
* Test for native `Symbol` support.
*
* @module @stdlib/utils/detect-symbol-support
*
* @example
* var hasSymbolSupport = require( '@stdlib/utils/detect-symbol-support' );
*
* var bool = hasSymbolSupport();
* // returns <boolean>
*/

// MODULES //

var hasSymbolSupport = require( './detect_symbol_support.js' );


// EXPORTS //

module.exports = hasSymbolSupport;

},{"./detect_symbol_support.js":277}],279:[function(require,module,exports){
'use strict';

// MODULES //

var hasSymbols = require( '@stdlib/utils/detect-symbol-support' )();


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
	return ( hasSymbols && typeof Symbol.toStringTag === 'symbol' );
}


// EXPORTS //

module.exports = hasToStringTagSupport;

},{"@stdlib/utils/detect-symbol-support":278}],280:[function(require,module,exports){
'use strict';

/**
* Test for native `toStringTag` support.
*
* @module @stdlib/utils/detect-tostringtag-support
*
* @example
* var hasToStringTagSupport = require( '@stdlib/utils/detect-tostringtag-support' );
*
* var bool = hasToStringTagSupport();
* // returns <boolean>
*/

// MODULES //

var hasToStringTagSupport = require( './has_tostringtag_support.js' );


// EXPORTS //

module.exports = hasToStringTagSupport;

},{"./has_tostringtag_support.js":279}],281:[function(require,module,exports){
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

},{"./uint16array.js":283,"@stdlib/assert/is-uint16array":20,"@stdlib/constants/math/uint16-max":50}],282:[function(require,module,exports){
'use strict';

/**
* Test for native `Uint16Array` support.
*
* @module @stdlib/utils/detect-uint16array-support
*
* @example
* var hasUint16ArraySupport = require( '@stdlib/utils/detect-uint16array-support' );
*
* var bool = hasUint16ArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasUint16ArraySupport = require( './detect_uint16array_support.js' );


// EXPORTS //

module.exports = hasUint16ArraySupport;

},{"./detect_uint16array_support.js":281}],283:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint16Array === 'function' ) ? Uint16Array : null;

},{}],284:[function(require,module,exports){
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

},{"./uint32array.js":286,"@stdlib/assert/is-uint32array":22,"@stdlib/constants/math/uint32-max":51}],285:[function(require,module,exports){
'use strict';

/**
* Test for native `Uint32Array` support.
*
* @module @stdlib/utils/detect-uint32array-support
*
* @example
* var hasUint32ArraySupport = require( '@stdlib/utils/detect-uint32array-support' );
*
* var bool = hasUint32ArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasUint32ArraySupport = require( './detect_uint32array_support.js' );


// EXPORTS //

module.exports = hasUint32ArraySupport;

},{"./detect_uint32array_support.js":284}],286:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint32Array === 'function' ) ? Uint32Array : null;

},{}],287:[function(require,module,exports){
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

},{"./uint8array.js":289,"@stdlib/assert/is-uint8array":24,"@stdlib/constants/math/uint8-max":52}],288:[function(require,module,exports){
'use strict';

/**
* Test for native `Uint8Array` support.
*
* @module @stdlib/utils/detect-uint8array-support
*
* @example
* var hasUint8ArraySupport = require( '@stdlib/utils/detect-uint8array-support' );
*
* var bool = hasUint8ArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasUint8ArraySupport = require( './detect_uint8array_support.js' );


// EXPORTS //

module.exports = hasUint8ArraySupport;

},{"./detect_uint8array_support.js":287}],289:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint8Array === 'function' ) ? Uint8Array : null;

},{}],290:[function(require,module,exports){
/* eslint-disable no-eval */
'use strict';

/**
* Alias for `eval` global.
*
* @module @stdlib/utils/eval
*
* @example
* var evil = require( '@stdlib/utils/@stdlib/utils/eval' );
*
* var v = evil( '5*4*3*2*1' );
* // returns 120
*/

// MODULES //

var evil = eval;


// EXPORTS //

module.exports = evil;

},{}],291:[function(require,module,exports){
'use strict';

/**
* Returns a string value indicating a specification defined classification of an object.
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

var hasToStringTag = require( '@stdlib/utils/detect-tostringtag-support' );
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

},{"./native_class.js":292,"./polyfill.js":293,"@stdlib/utils/detect-tostringtag-support":280}],292:[function(require,module,exports){
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

},{"./tostring.js":294}],293:[function(require,module,exports){
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

},{"./tostring.js":294,"./tostringtag.js":295,"@stdlib/assert/has-own-property":14}],294:[function(require,module,exports){
'use strict';

// MAIN //

var toStr = Object.prototype.toString;


// EXPORTS //

module.exports = toStr;

},{}],295:[function(require,module,exports){
'use strict';

// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{}],296:[function(require,module,exports){
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

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return (b64.length * 3 / 4) - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr((len * 3 / 4) - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0; i < l; i += 4) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}

},{}],297:[function(require,module,exports){

},{}],298:[function(require,module,exports){
arguments[4][297][0].apply(exports,arguments)
},{"dup":297}],299:[function(require,module,exports){
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

},{}],300:[function(require,module,exports){
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
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('Invalid typed array length')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  buf.__proto__ = Buffer.prototype
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
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species &&
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
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (isArrayBuffer(value)) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  return fromObject(value)
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
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
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
    throw new TypeError('"encoding" must be a valid string encoding')
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
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
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
  buf.__proto__ = Buffer.prototype
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

  if (obj) {
    if (isArrayBufferView(obj) || 'length' in obj) {
      if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
        return createBuffer(0)
      }
      return fromArrayLike(obj)
    }

    if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
      return fromArrayLike(obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
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
  return b != null && b._isBuffer === true
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
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
  if (isArrayBufferView(string) || isArrayBuffer(string)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

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
      case undefined:
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
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
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

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
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
  byteOffset = +byteOffset  // Coerce to Number.
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
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
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

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

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
    out += toHex(buf[i])
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
  newBuf.__proto__ = Buffer.prototype
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
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
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
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
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
      : new Buffer(val, encoding)
    var len = bytes.length
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

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
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

// ArrayBuffers from another context (i.e. an iframe) do not pass the `instanceof` check
// but they should be treated as valid. See: https://github.com/feross/buffer/issues/166
function isArrayBuffer (obj) {
  return obj instanceof ArrayBuffer ||
    (obj != null && obj.constructor != null && obj.constructor.name === 'ArrayBuffer' &&
      typeof obj.byteLength === 'number')
}

// Node 0.10 supports `ArrayBuffer` but lacks `ArrayBuffer.isView`
function isArrayBufferView (obj) {
  return (typeof ArrayBuffer.isView === 'function') && ArrayBuffer.isView(obj)
}

function numberIsNaN (obj) {
  return obj !== obj // eslint-disable-line no-self-compare
}

},{"base64-js":296,"ieee754":319}],301:[function(require,module,exports){
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

}).call(this,{"isBuffer":require("../../is-buffer/index.js")})
},{"../../is-buffer/index.js":321}],302:[function(require,module,exports){
var pSlice = Array.prototype.slice;
var objectKeys = require('./lib/keys.js');
var isArguments = require('./lib/is_arguments.js');

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer (x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}

},{"./lib/is_arguments.js":303,"./lib/keys.js":304}],303:[function(require,module,exports){
var supportsArgumentsClass = (function(){
  return Object.prototype.toString.call(arguments)
})() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object){
  return object &&
    typeof object == 'object' &&
    typeof object.length == 'number' &&
    Object.prototype.hasOwnProperty.call(object, 'callee') &&
    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
    false;
};

},{}],304:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],305:[function(require,module,exports){
'use strict';

var keys = require('object-keys');
var foreach = require('foreach');
var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';

var toStr = Object.prototype.toString;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		Object.defineProperty(obj, 'x', { enumerable: false, value: obj });
        /* eslint-disable no-unused-vars, no-restricted-syntax */
        for (var _ in obj) { return false; }
        /* eslint-enable no-unused-vars, no-restricted-syntax */
		return obj.x === obj;
	} catch (e) { /* this is IE 8. */
		return false;
	}
};
var supportsDescriptors = Object.defineProperty && arePropertyDescriptorsSupported();

var defineProperty = function (object, name, value, predicate) {
	if (name in object && (!isFunction(predicate) || !predicate())) {
		return;
	}
	if (supportsDescriptors) {
		Object.defineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value;
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = props.concat(Object.getOwnPropertySymbols(map));
	}
	foreach(props, function (name) {
		defineProperty(object, name, map[name], predicates[name]);
	});
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;

},{"foreach":315,"object-keys":325}],306:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],307:[function(require,module,exports){
'use strict';

var $isNaN = require('./helpers/isNaN');
var $isFinite = require('./helpers/isFinite');

var sign = require('./helpers/sign');
var mod = require('./helpers/mod');

var IsCallable = require('is-callable');
var toPrimitive = require('es-to-primitive/es5');

var has = require('has');

// https://es5.github.io/#x9
var ES5 = {
	ToPrimitive: toPrimitive,

	ToBoolean: function ToBoolean(value) {
		return !!value;
	},
	ToNumber: function ToNumber(value) {
		return Number(value);
	},
	ToInteger: function ToInteger(value) {
		var number = this.ToNumber(value);
		if ($isNaN(number)) { return 0; }
		if (number === 0 || !$isFinite(number)) { return number; }
		return sign(number) * Math.floor(Math.abs(number));
	},
	ToInt32: function ToInt32(x) {
		return this.ToNumber(x) >> 0;
	},
	ToUint32: function ToUint32(x) {
		return this.ToNumber(x) >>> 0;
	},
	ToUint16: function ToUint16(value) {
		var number = this.ToNumber(value);
		if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
		var posInt = sign(number) * Math.floor(Math.abs(number));
		return mod(posInt, 0x10000);
	},
	ToString: function ToString(value) {
		return String(value);
	},
	ToObject: function ToObject(value) {
		this.CheckObjectCoercible(value);
		return Object(value);
	},
	CheckObjectCoercible: function CheckObjectCoercible(value, optMessage) {
		/* jshint eqnull:true */
		if (value == null) {
			throw new TypeError(optMessage || 'Cannot call method on ' + value);
		}
		return value;
	},
	IsCallable: IsCallable,
	SameValue: function SameValue(x, y) {
		if (x === y) { // 0 === -0, but they are not identical.
			if (x === 0) { return 1 / x === 1 / y; }
			return true;
		}
		return $isNaN(x) && $isNaN(y);
	},

	// http://www.ecma-international.org/ecma-262/5.1/#sec-8
	Type: function Type(x) {
		if (x === null) {
			return 'Null';
		}
		if (typeof x === 'undefined') {
			return 'Undefined';
		}
		if (typeof x === 'function' || typeof x === 'object') {
			return 'Object';
		}
		if (typeof x === 'number') {
			return 'Number';
		}
		if (typeof x === 'boolean') {
			return 'Boolean';
		}
		if (typeof x === 'string') {
			return 'String';
		}
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-property-descriptor-specification-type
	IsPropertyDescriptor: function IsPropertyDescriptor(Desc) {
		if (this.Type(Desc) !== 'Object') {
			return false;
		}
		var allowed = {
			'[[Configurable]]': true,
			'[[Enumerable]]': true,
			'[[Get]]': true,
			'[[Set]]': true,
			'[[Value]]': true,
			'[[Writable]]': true
		};
		// jscs:disable
		for (var key in Desc) { // eslint-disable-line
			if (has(Desc, key) && !allowed[key]) {
				return false;
			}
		}
		// jscs:enable
		var isData = has(Desc, '[[Value]]');
		var IsAccessor = has(Desc, '[[Get]]') || has(Desc, '[[Set]]');
		if (isData && IsAccessor) {
			throw new TypeError('Property Descriptors may not be both accessor and data descriptors');
		}
		return true;
	},

	// http://ecma-international.org/ecma-262/5.1/#sec-8.10.1
	IsAccessorDescriptor: function IsAccessorDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		if (!this.IsPropertyDescriptor(Desc)) {
			throw new TypeError('Desc must be a Property Descriptor');
		}

		if (!has(Desc, '[[Get]]') && !has(Desc, '[[Set]]')) {
			return false;
		}

		return true;
	},

	// http://ecma-international.org/ecma-262/5.1/#sec-8.10.2
	IsDataDescriptor: function IsDataDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		if (!this.IsPropertyDescriptor(Desc)) {
			throw new TypeError('Desc must be a Property Descriptor');
		}

		if (!has(Desc, '[[Value]]') && !has(Desc, '[[Writable]]')) {
			return false;
		}

		return true;
	},

	// http://ecma-international.org/ecma-262/5.1/#sec-8.10.3
	IsGenericDescriptor: function IsGenericDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		if (!this.IsPropertyDescriptor(Desc)) {
			throw new TypeError('Desc must be a Property Descriptor');
		}

		if (!this.IsAccessorDescriptor(Desc) && !this.IsDataDescriptor(Desc)) {
			return true;
		}

		return false;
	},

	// http://ecma-international.org/ecma-262/5.1/#sec-8.10.4
	FromPropertyDescriptor: function FromPropertyDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return Desc;
		}

		if (!this.IsPropertyDescriptor(Desc)) {
			throw new TypeError('Desc must be a Property Descriptor');
		}

		if (this.IsDataDescriptor(Desc)) {
			return {
				value: Desc['[[Value]]'],
				writable: !!Desc['[[Writable]]'],
				enumerable: !!Desc['[[Enumerable]]'],
				configurable: !!Desc['[[Configurable]]']
			};
		} else if (this.IsAccessorDescriptor(Desc)) {
			return {
				get: Desc['[[Get]]'],
				set: Desc['[[Set]]'],
				enumerable: !!Desc['[[Enumerable]]'],
				configurable: !!Desc['[[Configurable]]']
			};
		} else {
			throw new TypeError('FromPropertyDescriptor must be called with a fully populated Property Descriptor');
		}
	},

	// http://ecma-international.org/ecma-262/5.1/#sec-8.10.5
	ToPropertyDescriptor: function ToPropertyDescriptor(Obj) {
		if (this.Type(Obj) !== 'Object') {
			throw new TypeError('ToPropertyDescriptor requires an object');
		}

		var desc = {};
		if (has(Obj, 'enumerable')) {
			desc['[[Enumerable]]'] = this.ToBoolean(Obj.enumerable);
		}
		if (has(Obj, 'configurable')) {
			desc['[[Configurable]]'] = this.ToBoolean(Obj.configurable);
		}
		if (has(Obj, 'value')) {
			desc['[[Value]]'] = Obj.value;
		}
		if (has(Obj, 'writable')) {
			desc['[[Writable]]'] = this.ToBoolean(Obj.writable);
		}
		if (has(Obj, 'get')) {
			var getter = Obj.get;
			if (typeof getter !== 'undefined' && !this.IsCallable(getter)) {
				throw new TypeError('getter must be a function');
			}
			desc['[[Get]]'] = getter;
		}
		if (has(Obj, 'set')) {
			var setter = Obj.set;
			if (typeof setter !== 'undefined' && !this.IsCallable(setter)) {
				throw new TypeError('setter must be a function');
			}
			desc['[[Set]]'] = setter;
		}

		if ((has(desc, '[[Get]]') || has(desc, '[[Set]]')) && (has(desc, '[[Value]]') || has(desc, '[[Writable]]'))) {
			throw new TypeError('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
		}
		return desc;
	}
};

module.exports = ES5;

},{"./helpers/isFinite":308,"./helpers/isNaN":309,"./helpers/mod":310,"./helpers/sign":311,"es-to-primitive/es5":312,"has":318,"is-callable":322}],308:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],309:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],310:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],311:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],312:[function(require,module,exports){
'use strict';

var toStr = Object.prototype.toString;

var isPrimitive = require('./helpers/isPrimitive');

var isCallable = require('is-callable');

// https://es5.github.io/#x8.12
var ES5internalSlots = {
	'[[DefaultValue]]': function (O, hint) {
		var actualHint = hint || (toStr.call(O) === '[object Date]' ? String : Number);

		if (actualHint === String || actualHint === Number) {
			var methods = actualHint === String ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
			var value, i;
			for (i = 0; i < methods.length; ++i) {
				if (isCallable(O[methods[i]])) {
					value = O[methods[i]]();
					if (isPrimitive(value)) {
						return value;
					}
				}
			}
			throw new TypeError('No default value');
		}
		throw new TypeError('invalid [[DefaultValue]] hint supplied');
	}
};

// https://es5.github.io/#x9
module.exports = function ToPrimitive(input, PreferredType) {
	if (isPrimitive(input)) {
		return input;
	}
	return ES5internalSlots['[[DefaultValue]]'](input, PreferredType);
};

},{"./helpers/isPrimitive":313,"is-callable":322}],313:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],314:[function(require,module,exports){
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

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],315:[function(require,module,exports){

var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

module.exports = function forEach (obj, fn, ctx) {
    if (toString.call(fn) !== '[object Function]') {
        throw new TypeError('iterator must be a function');
    }
    var l = obj.length;
    if (l === +l) {
        for (var i = 0; i < l; i++) {
            fn.call(ctx, obj[i], i, obj);
        }
    } else {
        for (var k in obj) {
            if (hasOwn.call(obj, k)) {
                fn.call(ctx, obj[k], k, obj);
            }
        }
    }
};


},{}],316:[function(require,module,exports){
'use strict';

/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};

},{}],317:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":316}],318:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":317}],319:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
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
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

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
  var eLen = nBytes * 8 - mLen - 1
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
      m = (value * c - 1) * Math.pow(2, mLen)
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

},{}],320:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],321:[function(require,module,exports){
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

},{}],322:[function(require,module,exports){
'use strict';

var fnToStr = Function.prototype.toString;

var constructorRegex = /^\s*class /;
var isES6ClassFn = function isES6ClassFn(value) {
	try {
		var fnStr = fnToStr.call(value);
		var singleStripped = fnStr.replace(/\/\/.*\n/g, '');
		var multiStripped = singleStripped.replace(/\/\*[.\s\S]*\*\//g, '');
		var spaceStripped = multiStripped.replace(/\n/mg, ' ').replace(/ {2}/g, ' ');
		return constructorRegex.test(spaceStripped);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionObject(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isCallable(value) {
	if (!value) { return false; }
	if (typeof value !== 'function' && typeof value !== 'object') { return false; }
	if (hasToStringTag) { return tryFunctionObject(value); }
	if (isES6ClassFn(value)) { return false; }
	var strClass = toStr.call(value);
	return strClass === fnClass || strClass === genClass;
};

},{}],323:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],324:[function(require,module,exports){
var hasMap = typeof Map === 'function' && Map.prototype;
var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, 'size') : null;
var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === 'function' ? mapSizeDescriptor.get : null;
var mapForEach = hasMap && Map.prototype.forEach;
var hasSet = typeof Set === 'function' && Set.prototype;
var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, 'size') : null;
var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === 'function' ? setSizeDescriptor.get : null;
var setForEach = hasSet && Set.prototype.forEach;

module.exports = function inspect_ (obj, opts, depth, seen) {
    if (!opts) opts = {};
    
    var maxDepth = opts.depth === undefined ? 5 : opts.depth;
    if (depth === undefined) depth = 0;
    if (depth >= maxDepth && maxDepth > 0
    && obj && typeof obj === 'object') {
        return '[Object]';
    }
    
    if (seen === undefined) seen = [];
    else if (indexOf(seen, obj) >= 0) {
        return '[Circular]';
    }
    
    function inspect (value, from) {
        if (from) {
            seen = seen.slice();
            seen.push(from);
        }
        return inspect_(value, opts, depth + 1, seen);
    }
    
    if (typeof obj === 'string') {
        return inspectString(obj);
    }
    else if (typeof obj === 'function') {
        var name = nameOf(obj);
        return '[Function' + (name ? ': ' + name : '') + ']';
    }
    else if (obj === null) {
        return 'null';
    }
    else if (isSymbol(obj)) {
        var symString = Symbol.prototype.toString.call(obj);
        return typeof obj === 'object' ? 'Object(' + symString + ')' : symString;
    }
    else if (isElement(obj)) {
        var s = '<' + String(obj.nodeName).toLowerCase();
        var attrs = obj.attributes || [];
        for (var i = 0; i < attrs.length; i++) {
            s += ' ' + attrs[i].name + '="' + quote(attrs[i].value) + '"';
        }
        s += '>';
        if (obj.childNodes && obj.childNodes.length) s += '...';
        s += '</' + String(obj.nodeName).toLowerCase() + '>';
        return s;
    }
    else if (isArray(obj)) {
        if (obj.length === 0) return '[]';
        var xs = Array(obj.length);
        for (var i = 0; i < obj.length; i++) {
            xs[i] = has(obj, i) ? inspect(obj[i], obj) : '';
        }
        return '[ ' + xs.join(', ') + ' ]';
    }
    else if (isError(obj)) {
        var parts = [];
        for (var key in obj) {
            if (!has(obj, key)) continue;
            
            if (/[^\w$]/.test(key)) {
                parts.push(inspect(key) + ': ' + inspect(obj[key]));
            }
            else {
                parts.push(key + ': ' + inspect(obj[key]));
            }
        }
        if (parts.length === 0) return '[' + obj + ']';
        return '{ [' + obj + '] ' + parts.join(', ') + ' }';
    }
    else if (typeof obj === 'object' && typeof obj.inspect === 'function') {
        return obj.inspect();
    }
    else if (isMap(obj)) {
        var parts = [];
        mapForEach.call(obj, function (value, key) {
            parts.push(inspect(key, obj) + ' => ' + inspect(value, obj));
        });
        return 'Map (' + mapSize.call(obj) + ') {' + parts.join(', ') + '}';
    }
    else if (isSet(obj)) {
        var parts = [];
        setForEach.call(obj, function (value ) {
            parts.push(inspect(value, obj));
        });
        return 'Set (' + setSize.call(obj) + ') {' + parts.join(', ') + '}';
    }
    else if (typeof obj === 'object' && !isDate(obj) && !isRegExp(obj)) {
        var xs = [], keys = [];
        for (var key in obj) {
            if (has(obj, key)) keys.push(key);
        }
        keys.sort();
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (/[^\w$]/.test(key)) {
                xs.push(inspect(key) + ': ' + inspect(obj[key], obj));
            }
            else xs.push(key + ': ' + inspect(obj[key], obj));
        }
        if (xs.length === 0) return '{}';
        return '{ ' + xs.join(', ') + ' }';
    }
    else return String(obj);
};

function quote (s) {
    return String(s).replace(/"/g, '&quot;');
}

function isArray (obj) { return toStr(obj) === '[object Array]' }
function isDate (obj) { return toStr(obj) === '[object Date]' }
function isRegExp (obj) { return toStr(obj) === '[object RegExp]' }
function isError (obj) { return toStr(obj) === '[object Error]' }
function isSymbol (obj) { return toStr(obj) === '[object Symbol]' }

var hasOwn = Object.prototype.hasOwnProperty || function (key) { return key in this; };
function has (obj, key) {
    return hasOwn.call(obj, key);
}

function toStr (obj) {
    return Object.prototype.toString.call(obj);
}

function nameOf (f) {
    if (f.name) return f.name;
    var m = f.toString().match(/^function\s*([\w$]+)/);
    if (m) return m[1];
}

function indexOf (xs, x) {
    if (xs.indexOf) return xs.indexOf(x);
    for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) return i;
    }
    return -1;
}

function isMap (x) {
    if (!mapSize) {
        return false;
    }
    try {
        mapSize.call(x);
        return true;
    } catch (e) {}
    return false;
}

function isSet (x) {
    if (!setSize) {
        return false;
    }
    try {
        setSize.call(x);
        return true;
    } catch (e) {}
    return false;
}

function isElement (x) {
    if (!x || typeof x !== 'object') return false;
    if (typeof HTMLElement !== 'undefined' && x instanceof HTMLElement) {
        return true;
    }
    return typeof x.nodeName === 'string'
        && typeof x.getAttribute === 'function'
    ;
}

function inspectString (str) {
    var s = str.replace(/(['\\])/g, '\\$1').replace(/[\x00-\x1f]/g, lowbyte);
    return "'" + s + "'";
    
    function lowbyte (c) {
        var n = c.charCodeAt(0);
        var x = { 8: 'b', 9: 't', 10: 'n', 12: 'f', 13: 'r' }[n];
        if (x) return '\\' + x;
        return '\\x' + (n < 0x10 ? '0' : '') + n.toString(16);
    }
}

},{}],325:[function(require,module,exports){
'use strict';

// modified from https://github.com/es-shims/es5-shim
var has = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var slice = Array.prototype.slice;
var isArgs = require('./isArguments');
var isEnumerable = Object.prototype.propertyIsEnumerable;
var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
var dontEnums = [
	'toString',
	'toLocaleString',
	'valueOf',
	'hasOwnProperty',
	'isPrototypeOf',
	'propertyIsEnumerable',
	'constructor'
];
var equalsConstructorPrototype = function (o) {
	var ctor = o.constructor;
	return ctor && ctor.prototype === o;
};
var excludedKeys = {
	$console: true,
	$external: true,
	$frame: true,
	$frameElement: true,
	$frames: true,
	$innerHeight: true,
	$innerWidth: true,
	$outerHeight: true,
	$outerWidth: true,
	$pageXOffset: true,
	$pageYOffset: true,
	$parent: true,
	$scrollLeft: true,
	$scrollTop: true,
	$scrollX: true,
	$scrollY: true,
	$self: true,
	$webkitIndexedDB: true,
	$webkitStorageInfo: true,
	$window: true
};
var hasAutomationEqualityBug = (function () {
	/* global window */
	if (typeof window === 'undefined') { return false; }
	for (var k in window) {
		try {
			if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
				try {
					equalsConstructorPrototype(window[k]);
				} catch (e) {
					return true;
				}
			}
		} catch (e) {
			return true;
		}
	}
	return false;
}());
var equalsConstructorPrototypeIfNotBuggy = function (o) {
	/* global window */
	if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
		return equalsConstructorPrototype(o);
	}
	try {
		return equalsConstructorPrototype(o);
	} catch (e) {
		return false;
	}
};

var keysShim = function keys(object) {
	var isObject = object !== null && typeof object === 'object';
	var isFunction = toStr.call(object) === '[object Function]';
	var isArguments = isArgs(object);
	var isString = isObject && toStr.call(object) === '[object String]';
	var theKeys = [];

	if (!isObject && !isFunction && !isArguments) {
		throw new TypeError('Object.keys called on a non-object');
	}

	var skipProto = hasProtoEnumBug && isFunction;
	if (isString && object.length > 0 && !has.call(object, 0)) {
		for (var i = 0; i < object.length; ++i) {
			theKeys.push(String(i));
		}
	}

	if (isArguments && object.length > 0) {
		for (var j = 0; j < object.length; ++j) {
			theKeys.push(String(j));
		}
	} else {
		for (var name in object) {
			if (!(skipProto && name === 'prototype') && has.call(object, name)) {
				theKeys.push(String(name));
			}
		}
	}

	if (hasDontEnumBug) {
		var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

		for (var k = 0; k < dontEnums.length; ++k) {
			if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
				theKeys.push(dontEnums[k]);
			}
		}
	}
	return theKeys;
};

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			return (Object.keys(arguments) || '').length === 2;
		}(1, 2));
		if (!keysWorksWithArguments) {
			var originalKeys = Object.keys;
			Object.keys = function keys(object) {
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				} else {
					return originalKeys(object);
				}
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;

},{"./isArguments":326}],326:[function(require,module,exports){
'use strict';

var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};

},{}],327:[function(require,module,exports){
(function (process){
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

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))
},{"_process":299}],328:[function(require,module,exports){
(function (process){
'use strict';

if (!process.version ||
    process.version.indexOf('v0.') === 0 ||
    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
  module.exports = nextTick;
} else {
  module.exports = process.nextTick;
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
},{"_process":299}],329:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":330}],330:[function(require,module,exports){
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

var processNextTick = require('process-nextick-args');
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

var keys = objectKeys(Writable.prototype);
for (var v = 0; v < keys.length; v++) {
  var method = keys[v];
  if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
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

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended) return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  processNextTick(onEndNT, this);
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

  processNextTick(cb, err);
};

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}
},{"./_stream_readable":332,"./_stream_writable":334,"core-util-is":301,"inherits":320,"process-nextick-args":328}],331:[function(require,module,exports){
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
},{"./_stream_transform":333,"core-util-is":301,"inherits":320}],332:[function(require,module,exports){
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

var processNextTick = require('process-nextick-args');
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

// TODO(bmeurer): Change this back to const once hole checks are
// properly optimized away early in Ignition+TurboFan.
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
  if (typeof emitter.prependListener === 'function') {
    return emitter.prependListener(event, fn);
  } else {
    // This is a hack to make sure that our error handler is attached before any
    // userland ones.  NEVER DO THIS. This is here only because this code needs
    // to continue to work with older versions of Node.js that do not include
    // the prependListener() method. The goal is to eventually remove this hack.
    if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
  }
}

function ReadableState(options, stream) {
  Duplex = Duplex || require('./_stream_duplex');

  options = options || {};

  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

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
    if (state.sync) processNextTick(emitReadable_, stream);else emitReadable_(stream);
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
    processNextTick(maybeReadMore_, stream, state);
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
  if (state.endEmitted) processNextTick(endFn);else src.once('end', endFn);

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
        processNextTick(nReadingNextTick, this);
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
    processNextTick(resume_, stream, state);
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
  var state = this._readableState;
  var paused = false;

  var self = this;
  stream.on('end', function () {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) self.push(chunk);
    }

    self.push(null);
  });

  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = self.push(chunk);
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
    stream.on(kProxyEvents[n], self.emit.bind(self, kProxyEvents[n]));
  }

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  self._read = function (n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return self;
};

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
    processNextTick(endReadableNT, state, stream);
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

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./_stream_duplex":330,"./internal/streams/BufferList":335,"./internal/streams/destroy":336,"./internal/streams/stream":337,"_process":299,"core-util-is":301,"events":314,"inherits":320,"isarray":323,"process-nextick-args":328,"safe-buffer":343,"string_decoder/":349,"util":297}],333:[function(require,module,exports){
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

function TransformState(stream) {
  this.afterTransform = function (er, data) {
    return afterTransform(stream, er, data);
  };

  this.needTransform = false;
  this.transforming = false;
  this.writecb = null;
  this.writechunk = null;
  this.writeencoding = null;
}

function afterTransform(stream, er, data) {
  var ts = stream._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb) {
    return stream.emit('error', new Error('write callback called multiple times'));
  }

  ts.writechunk = null;
  ts.writecb = null;

  if (data !== null && data !== undefined) stream.push(data);

  cb(er);

  var rs = stream._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    stream._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);

  Duplex.call(this, options);

  this._transformState = new TransformState(this);

  var stream = this;

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
  this.once('prefinish', function () {
    if (typeof this._flush === 'function') this._flush(function (er, data) {
      done(stream, er, data);
    });else done(stream);
  });
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
  var _this = this;

  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
    _this.emit('close');
  });
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);

  if (data !== null && data !== undefined) stream.push(data);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  var ws = stream._writableState;
  var ts = stream._transformState;

  if (ws.length) throw new Error('Calling transform done when ws.length != 0');

  if (ts.transforming) throw new Error('Calling transform done when still transforming');

  return stream.push(null);
}
},{"./_stream_duplex":330,"core-util-is":301,"inherits":320}],334:[function(require,module,exports){
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

// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.

'use strict';

/*<replacement>*/

var processNextTick = require('process-nextick-args');
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
var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : processNextTick;
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

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

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
  processNextTick(cb, er);
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
    processNextTick(cb, er);
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;
  var isBuf = _isUint8Array(chunk) && !state.objectMode;

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
    processNextTick(cb, er);
    // this can emit finish, and it will always happen
    // after error
    processNextTick(finishMaybe, stream, state);
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
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;

      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
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

  state.bufferedRequestCount = 0;
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
      processNextTick(callFinal, stream, state);
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
    if (state.finished) processNextTick(cb);else stream.once('finish', cb);
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
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./_stream_duplex":330,"./internal/streams/destroy":336,"./internal/streams/stream":337,"_process":299,"core-util-is":301,"inherits":320,"process-nextick-args":328,"safe-buffer":343,"util-deprecate":356}],335:[function(require,module,exports){
'use strict';

/*<replacement>*/

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Buffer = require('safe-buffer').Buffer;
/*</replacement>*/

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
},{"safe-buffer":343}],336:[function(require,module,exports){
'use strict';

/*<replacement>*/

var processNextTick = require('process-nextick-args');
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
      processNextTick(emitErrorNT, this, err);
    }
    return;
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
      processNextTick(emitErrorNT, _this, err);
      if (_this._writableState) {
        _this._writableState.errorEmitted = true;
      }
    } else if (cb) {
      cb(err);
    }
  });
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
},{"process-nextick-args":328}],337:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":314}],338:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":339}],339:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":330,"./lib/_stream_passthrough.js":331,"./lib/_stream_readable.js":332,"./lib/_stream_transform.js":333,"./lib/_stream_writable.js":334}],340:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":339}],341:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":334}],342:[function(require,module,exports){
(function (process){
var through = require('through');
var nextTick = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

module.exports = function (write, end) {
    var tr = through(write, end);
    tr.pause();
    var resume = tr.resume;
    var pause = tr.pause;
    var paused = false;
    
    tr.pause = function () {
        paused = true;
        return pause.apply(this, arguments);
    };
    
    tr.resume = function () {
        paused = false;
        return resume.apply(this, arguments);
    };
    
    nextTick(function () {
        if (!paused) tr.resume();
    });
    
    return tr;
};

}).call(this,require('_process'))
},{"_process":299,"through":355}],343:[function(require,module,exports){
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

},{"buffer":300}],344:[function(require,module,exports){
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

module.exports = Stream;

var EE = require('events').EventEmitter;
var inherits = require('inherits');

inherits(Stream, EE);
Stream.Readable = require('readable-stream/readable.js');
Stream.Writable = require('readable-stream/writable.js');
Stream.Duplex = require('readable-stream/duplex.js');
Stream.Transform = require('readable-stream/transform.js');
Stream.PassThrough = require('readable-stream/passthrough.js');

// Backwards-compat with node 0.4.x
Stream.Stream = Stream;



// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.

function Stream() {
  EE.call(this);
}

Stream.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (EE.listenerCount(this, 'error') === 0) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);

    source.removeListener('end', onend);
    source.removeListener('close', onclose);

    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);

    dest.removeListener('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
};

},{"events":314,"inherits":320,"readable-stream/duplex.js":329,"readable-stream/passthrough.js":338,"readable-stream/readable.js":339,"readable-stream/transform.js":340,"readable-stream/writable.js":341}],345:[function(require,module,exports){
'use strict';

var bind = require('function-bind');
var ES = require('es-abstract/es5');
var replace = bind.call(Function.call, String.prototype.replace);

var leftWhitespace = /^[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+/;
var rightWhitespace = /[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+$/;

module.exports = function trim() {
	var S = ES.ToString(ES.CheckObjectCoercible(this));
	return replace(replace(S, leftWhitespace, ''), rightWhitespace, '');
};

},{"es-abstract/es5":307,"function-bind":317}],346:[function(require,module,exports){
'use strict';

var bind = require('function-bind');
var define = require('define-properties');

var implementation = require('./implementation');
var getPolyfill = require('./polyfill');
var shim = require('./shim');

var boundTrim = bind.call(Function.call, getPolyfill());

define(boundTrim, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = boundTrim;

},{"./implementation":345,"./polyfill":347,"./shim":348,"define-properties":305,"function-bind":317}],347:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":345}],348:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":347,"define-properties":305}],349:[function(require,module,exports){
'use strict';

var Buffer = require('safe-buffer').Buffer;

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
// continuation byte.
function utf8CheckByte(byte) {
  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
  return -1;
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
  if (--j < i) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }
  if (--j < i) return 0;
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
// UTF-8 replacement characters ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
  if ((buf[0] & 0xC0) !== 0x80) {
    self.lastNeed = 0;
    return '\ufffd'.repeat(p);
  }
  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xC0) !== 0x80) {
      self.lastNeed = 1;
      return '\ufffd'.repeat(p + 1);
    }
    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xC0) !== 0x80) {
        self.lastNeed = 2;
        return '\ufffd'.repeat(p + 2);
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

// For UTF-8, a replacement character for each buffered byte of a (partial)
// character needs to be added to the output.
function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + '\ufffd'.repeat(this.lastTotal - this.lastNeed);
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
},{"safe-buffer":343}],350:[function(require,module,exports){
(function (process){
var defined = require('defined');
var createDefaultStream = require('./lib/default_stream');
var Test = require('./lib/test');
var createResult = require('./lib/results');
var through = require('through');

var canEmitExit = typeof process !== 'undefined' && process
    && typeof process.on === 'function' && process.browser !== true
;
var canExit = typeof process !== 'undefined' && process
    && typeof process.exit === 'function'
;

var nextTick = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

exports = module.exports = (function () {
    var harness;
    var lazyLoad = function () {
        return getHarness().apply(this, arguments);
    };
    
    lazyLoad.only = function () {
        return getHarness().only.apply(this, arguments);
    };
    
    lazyLoad.createStream = function (opts) {
        if (!opts) opts = {};
        if (!harness) {
            var output = through();
            getHarness({ stream: output, objectMode: opts.objectMode });
            return output;
        }
        return harness.createStream(opts);
    };
    
    lazyLoad.onFinish = function () {
        return getHarness().onFinish.apply(this, arguments);
    };

    lazyLoad.getHarness = getHarness

    return lazyLoad

    function getHarness (opts) {
        if (!opts) opts = {};
        opts.autoclose = !canEmitExit;
        if (!harness) harness = createExitHarness(opts);
        return harness;
    }
})();

function createExitHarness (conf) {
    if (!conf) conf = {};
    var harness = createHarness({
        autoclose: defined(conf.autoclose, false)
    });
    
    var stream = harness.createStream({ objectMode: conf.objectMode });
    var es = stream.pipe(conf.stream || createDefaultStream());
    if (canEmitExit) {
        es.on('error', function (err) { harness._exitCode = 1 });
    }
    
    var ended = false;
    stream.on('end', function () { ended = true });
    
    if (conf.exit === false) return harness;
    if (!canEmitExit || !canExit) return harness;

    var inErrorState = false;

    process.on('exit', function (code) {
        // let the process exit cleanly.
        if (code !== 0) {
            return
        }

        if (!ended) {
            var only = harness._results._only;
            for (var i = 0; i < harness._tests.length; i++) {
                var t = harness._tests[i];
                if (only && t.name !== only) continue;
                t._exit();
            }
        }
        harness.close();
        process.exit(code || harness._exitCode);
    });
    
    return harness;
}

exports.createHarness = createHarness;
exports.Test = Test;
exports.test = exports; // tap compat
exports.test.skip = Test.skip;

var exitInterval;

function createHarness (conf_) {
    if (!conf_) conf_ = {};
    var results = createResult();
    if (conf_.autoclose !== false) {
        results.once('done', function () { results.close() });
    }
    
    var test = function (name, conf, cb) {
        var t = new Test(name, conf, cb);
        test._tests.push(t);
        
        (function inspectCode (st) {
            st.on('test', function sub (st_) {
                inspectCode(st_);
            });
            st.on('result', function (r) {
                if (!r.ok && typeof r !== 'string') test._exitCode = 1
            });
        })(t);
        
        results.push(t);
        return t;
    };
    test._results = results;
    
    test._tests = [];
    
    test.createStream = function (opts) {
        return results.createStream(opts);
    };

    test.onFinish = function (cb) {
        results.on('done', cb);
    };
    
    var only = false;
    test.only = function (name) {
        if (only) throw new Error('there can only be one only test');
        results.only(name);
        only = true;
        return test.apply(null, arguments);
    };
    test._exitCode = 0;
    
    test.close = function () { results.close() };
    
    return test;
}

}).call(this,require('_process'))
},{"./lib/default_stream":351,"./lib/results":353,"./lib/test":354,"_process":299,"defined":306,"through":355}],351:[function(require,module,exports){
(function (process){
var through = require('through');
var fs = require('fs');

module.exports = function () {
    var line = '';
    var stream = through(write, flush);
    return stream;
    
    function write (buf) {
        for (var i = 0; i < buf.length; i++) {
            var c = typeof buf === 'string'
                ? buf.charAt(i)
                : String.fromCharCode(buf[i])
            ;
            if (c === '\n') flush();
            else line += c;
        }
    }
    
    function flush () {
        if (fs.writeSync && /^win/.test(process.platform)) {
            try { fs.writeSync(1, line + '\n'); }
            catch (e) { stream.emit('error', e) }
        }
        else {
            try { console.log(line) }
            catch (e) { stream.emit('error', e) }
        }
        line = '';
    }
};

}).call(this,require('_process'))
},{"_process":299,"fs":298,"through":355}],352:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":299}],353:[function(require,module,exports){
(function (process){
var EventEmitter = require('events').EventEmitter;
var inherits = require('inherits');
var through = require('through');
var resumer = require('resumer');
var inspect = require('object-inspect');
var bind = require('function-bind');
var has = require('has');
var regexpTest = bind.call(Function.call, RegExp.prototype.test);
var yamlIndicators = /\:|\-|\?/;
var nextTick = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

module.exports = Results;
inherits(Results, EventEmitter);

function Results () {
    if (!(this instanceof Results)) return new Results;
    this.count = 0;
    this.fail = 0;
    this.pass = 0;
    this._stream = through();
    this.tests = [];
}

Results.prototype.createStream = function (opts) {
    if (!opts) opts = {};
    var self = this;
    var output, testId = 0;
    if (opts.objectMode) {
        output = through();
        self.on('_push', function ontest (t, extra) {
            if (!extra) extra = {};
            var id = testId++;
            t.once('prerun', function () {
                var row = {
                    type: 'test',
                    name: t.name,
                    id: id
                };
                if (has(extra, 'parent')) {
                    row.parent = extra.parent;
                }
                output.queue(row);
            });
            t.on('test', function (st) {
                ontest(st, { parent: id });
            });
            t.on('result', function (res) {
                res.test = id;
                res.type = 'assert';
                output.queue(res);
            });
            t.on('end', function () {
                output.queue({ type: 'end', test: id });
            });
        });
        self.on('done', function () { output.queue(null) });
    }
    else {
        output = resumer();
        output.queue('TAP version 13\n');
        self._stream.pipe(output);
    }
    
    nextTick(function next() {
        var t;
        while (t = getNextTest(self)) {
            t.run();
            if (!t.ended) return t.once('end', function(){ nextTick(next); });
        }
        self.emit('done');
    });
    
    return output;
};

Results.prototype.push = function (t) {
    var self = this;
    self.tests.push(t);
    self._watch(t);
    self.emit('_push', t);
};

Results.prototype.only = function (name) {
    this._only = name;
};

Results.prototype._watch = function (t) {
    var self = this;
    var write = function (s) { self._stream.queue(s) };
    t.once('prerun', function () {
        write('# ' + t.name + '\n');
    });
    
    t.on('result', function (res) {
        if (typeof res === 'string') {
            write('# ' + res + '\n');
            return;
        }
        write(encodeResult(res, self.count + 1));
        self.count ++;

        if (res.ok) self.pass ++
        else self.fail ++
    });
    
    t.on('test', function (st) { self._watch(st) });
};

Results.prototype.close = function () {
    var self = this;
    if (self.closed) self._stream.emit('error', new Error('ALREADY CLOSED'));
    self.closed = true;
    var write = function (s) { self._stream.queue(s) };
    
    write('\n1..' + self.count + '\n');
    write('# tests ' + self.count + '\n');
    write('# pass  ' + self.pass + '\n');
    if (self.fail) write('# fail  ' + self.fail + '\n')
    else write('\n# ok\n')

    self._stream.queue(null);
};

function encodeResult (res, count) {
    var output = '';
    output += (res.ok ? 'ok ' : 'not ok ') + count;
    output += res.name ? ' ' + res.name.toString().replace(/\s+/g, ' ') : '';
    
    if (res.skip) output += ' # SKIP';
    else if (res.todo) output += ' # TODO';
    
    output += '\n';
    if (res.ok) return output;
    
    var outer = '  ';
    var inner = outer + '  ';
    output += outer + '---\n';
    output += inner + 'operator: ' + res.operator + '\n';
    
    if (has(res, 'expected') || has(res, 'actual')) {
        var ex = inspect(res.expected);
        var ac = inspect(res.actual);
        
        if (Math.max(ex.length, ac.length) > 65 || invalidYaml(ex) || invalidYaml(ac)) {
            output += inner + 'expected: |-\n' + inner + '  ' + ex + '\n';
            output += inner + 'actual: |-\n' + inner + '  ' + ac + '\n';
        }
        else {
            output += inner + 'expected: ' + ex + '\n';
            output += inner + 'actual:   ' + ac + '\n';
        }
    }
    if (res.at) {
        output += inner + 'at: ' + res.at + '\n';
    }
    if (res.operator === 'error' && res.actual && res.actual.stack) {
        var lines = String(res.actual.stack).split('\n');
        output += inner + 'stack: |-\n';
        for (var i = 0; i < lines.length; i++) {
            output += inner + '  ' + lines[i] + '\n';
        }
    }
    
    output += outer + '...\n';
    return output;
}

function getNextTest (results) {
    if (!results._only) {
        return results.tests.shift();
    }
    
    do {
        var t = results.tests.shift();
        if (!t) continue;
        if (results._only === t.name) {
            return t;
        }
    } while (results.tests.length !== 0)
}

function invalidYaml (str) {
    return regexpTest(yamlIndicators, str);
}

}).call(this,require('_process'))
},{"_process":299,"events":314,"function-bind":317,"has":318,"inherits":320,"object-inspect":324,"resumer":342,"through":355}],354:[function(require,module,exports){
(function (__dirname){
var deepEqual = require('deep-equal');
var defined = require('defined');
var path = require('path');
var inherits = require('inherits');
var EventEmitter = require('events').EventEmitter;
var has = require('has');
var trim = require('string.prototype.trim');

var nextTick = require('./next_tick');

module.exports = Test;

inherits(Test, EventEmitter);

var getTestArgs = function (name_, opts_, cb_) {
    var name = '(anonymous)';
    var opts = {};
    var cb;

    for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        var t = typeof arg;
        if (t === 'string') {
            name = arg;
        }
        else if (t === 'object') {
            opts = arg || opts;
        }
        else if (t === 'function') {
            cb = arg;
        }
    }
    return { name: name, opts: opts, cb: cb };
};

function Test (name_, opts_, cb_) {
    if (! (this instanceof Test)) {
        return new Test(name_, opts_, cb_);
    }

    var args = getTestArgs(name_, opts_, cb_);

    this.readable = true;
    this.name = args.name || '(anonymous)';
    this.assertCount = 0;
    this.pendingCount = 0;
    this._skip = args.opts.skip || false;
    this._timeout = args.opts.timeout;
    this._plan = undefined;
    this._cb = args.cb;
    this._progeny = [];
    this._ok = true;

    for (var prop in this) {
        this[prop] = (function bind(self, val) {
            if (typeof val === 'function') {
                return function bound() {
                    return val.apply(self, arguments);
                };
            }
            else return val;
        })(this, this[prop]);
    }
}

Test.prototype.run = function () {
    if (this._skip) {
        this.comment('SKIP ' + this.name);
    }
    if (!this._cb || this._skip) {
        return this._end();
    }
    if (this._timeout != null) {
        this.timeoutAfter(this._timeout);
    }
    this.emit('prerun');
    this._cb(this);
    this.emit('run');
};

Test.prototype.test = function (name, opts, cb) {
    var self = this;
    var t = new Test(name, opts, cb);
    this._progeny.push(t);
    this.pendingCount++;
    this.emit('test', t);
    t.on('prerun', function () {
        self.assertCount++;
    })
    
    if (!self._pendingAsserts()) {
        nextTick(function () {
            self._end();
        });
    }
    
    nextTick(function() {
        if (!self._plan && self.pendingCount == self._progeny.length) {
            self._end();
        }
    });
};

Test.prototype.comment = function (msg) {
    var that = this;
    trim(msg).split('\n').forEach(function (aMsg) {
        that.emit('result', trim(aMsg).replace(/^#\s*/, ''));
    });
};

Test.prototype.plan = function (n) {
    this._plan = n;
    this.emit('plan', n);
};

Test.prototype.timeoutAfter = function(ms) {
    if (!ms) throw new Error('timeoutAfter requires a timespan');
    var self = this;
    var timeout = setTimeout(function() {
        self.fail('test timed out after ' + ms + 'ms');
        self.end();
    }, ms);
    this.once('end', function() {
        clearTimeout(timeout);
    });
}

Test.prototype.end = function (err) { 
    var self = this;
    if (arguments.length >= 1 && !!err) {
        this.ifError(err);
    }
    
    if (this.calledEnd) {
        this.fail('.end() called twice');
    }
    this.calledEnd = true;
    this._end();
};

Test.prototype._end = function (err) {
    var self = this;
    if (this._progeny.length) {
        var t = this._progeny.shift();
        t.on('end', function () { self._end() });
        t.run();
        return;
    }
    
    if (!this.ended) this.emit('end');
    var pendingAsserts = this._pendingAsserts();
    if (!this._planError && this._plan !== undefined && pendingAsserts) {
        this._planError = true;
        this.fail('plan != count', {
            expected : this._plan,
            actual : this.assertCount
        });
    }
    this.ended = true;
};

Test.prototype._exit = function () {
    if (this._plan !== undefined &&
        !this._planError && this.assertCount !== this._plan) {
        this._planError = true;
        this.fail('plan != count', {
            expected : this._plan,
            actual : this.assertCount,
            exiting : true
        });
    }
    else if (!this.ended) {
        this.fail('test exited without ending', {
            exiting: true
        });
    }
};

Test.prototype._pendingAsserts = function () {
    if (this._plan === undefined) {
        return 1;
    }
    else {
        return this._plan - (this._progeny.length + this.assertCount);
    }
};

Test.prototype._assert = function assert (ok, opts) {
    var self = this;
    var extra = opts.extra || {};
    
    var res = {
        id : self.assertCount ++,
        ok : Boolean(ok),
        skip : defined(extra.skip, opts.skip),
        name : defined(extra.message, opts.message, '(unnamed assert)'),
        operator : defined(extra.operator, opts.operator)
    };
    if (has(opts, 'actual') || has(extra, 'actual')) {
        res.actual = defined(extra.actual, opts.actual);
    }
    if (has(opts, 'expected') || has(extra, 'expected')) {
        res.expected = defined(extra.expected, opts.expected);
    }
    this._ok = Boolean(this._ok && ok);
    
    if (!ok) {
        res.error = defined(extra.error, opts.error, new Error(res.name));
    }
    
    if (!ok) {
        var e = new Error('exception');
        var err = (e.stack || '').split('\n');
        var dir = path.dirname(__dirname) + '/';
        
        for (var i = 0; i < err.length; i++) {
            var m = /^[^\s]*\s*\bat\s+(.+)/.exec(err[i]);
            if (!m) {
                continue;
            }
            
            var s = m[1].split(/\s+/);
            var filem = /(\/[^:\s]+:(\d+)(?::(\d+))?)/.exec(s[1]);
            if (!filem) {
                filem = /(\/[^:\s]+:(\d+)(?::(\d+))?)/.exec(s[2]);
                
                if (!filem) {
                    filem = /(\/[^:\s]+:(\d+)(?::(\d+))?)/.exec(s[3]);

                    if (!filem) {
                        continue;
                    }
                }
            }
            
            if (filem[1].slice(0, dir.length) === dir) {
                continue;
            }
            
            res.functionName = s[0];
            res.file = filem[1];
            res.line = Number(filem[2]);
            if (filem[3]) res.column = filem[3];
            
            res.at = m[1];
            break;
        }
    }

    self.emit('result', res);
    
    var pendingAsserts = self._pendingAsserts();
    if (!pendingAsserts) {
        if (extra.exiting) {
            self._end();
        } else {
            nextTick(function () {
                self._end();
            });
        }
    }
    
    if (!self._planError && pendingAsserts < 0) {
        self._planError = true;
        self.fail('plan != count', {
            expected : self._plan,
            actual : self._plan - pendingAsserts
        });
    }
};

Test.prototype.fail = function (msg, extra) {
    this._assert(false, {
        message : msg,
        operator : 'fail',
        extra : extra
    });
};

Test.prototype.pass = function (msg, extra) {
    this._assert(true, {
        message : msg,
        operator : 'pass',
        extra : extra
    });
};

Test.prototype.skip = function (msg, extra) {
    this._assert(true, {
        message : msg,
        operator : 'skip',
        skip : true,
        extra : extra
    });
};

Test.prototype.ok
= Test.prototype['true']
= Test.prototype.assert
= function (value, msg, extra) {
    this._assert(value, {
        message : msg,
        operator : 'ok',
        expected : true,
        actual : value,
        extra : extra
    });
};

Test.prototype.notOk
= Test.prototype['false']
= Test.prototype.notok
= function (value, msg, extra) {
    this._assert(!value, {
        message : msg,
        operator : 'notOk',
        expected : false,
        actual : value,
        extra : extra
    });
};

Test.prototype.error
= Test.prototype.ifError
= Test.prototype.ifErr
= Test.prototype.iferror
= function (err, msg, extra) {
    this._assert(!err, {
        message : defined(msg, String(err)),
        operator : 'error',
        actual : err,
        extra : extra
    });
};

Test.prototype.equal
= Test.prototype.equals
= Test.prototype.isEqual
= Test.prototype.is
= Test.prototype.strictEqual
= Test.prototype.strictEquals
= function (a, b, msg, extra) {
    this._assert(a === b, {
        message : defined(msg, 'should be equal'),
        operator : 'equal',
        actual : a,
        expected : b,
        extra : extra
    });
};

Test.prototype.notEqual
= Test.prototype.notEquals
= Test.prototype.notStrictEqual
= Test.prototype.notStrictEquals
= Test.prototype.isNotEqual
= Test.prototype.isNot
= Test.prototype.not
= Test.prototype.doesNotEqual
= Test.prototype.isInequal
= function (a, b, msg, extra) {
    this._assert(a !== b, {
        message : defined(msg, 'should not be equal'),
        operator : 'notEqual',
        actual : a,
        notExpected : b,
        extra : extra
    });
};

Test.prototype.deepEqual
= Test.prototype.deepEquals
= Test.prototype.isEquivalent
= Test.prototype.same
= function (a, b, msg, extra) {
    this._assert(deepEqual(a, b, { strict: true }), {
        message : defined(msg, 'should be equivalent'),
        operator : 'deepEqual',
        actual : a,
        expected : b,
        extra : extra
    });
};

Test.prototype.deepLooseEqual
= Test.prototype.looseEqual
= Test.prototype.looseEquals
= function (a, b, msg, extra) {
    this._assert(deepEqual(a, b), {
        message : defined(msg, 'should be equivalent'),
        operator : 'deepLooseEqual',
        actual : a,
        expected : b,
        extra : extra
    });
};

Test.prototype.notDeepEqual
= Test.prototype.notEquivalent
= Test.prototype.notDeeply
= Test.prototype.notSame
= Test.prototype.isNotDeepEqual
= Test.prototype.isNotDeeply
= Test.prototype.isNotEquivalent
= Test.prototype.isInequivalent
= function (a, b, msg, extra) {
    this._assert(!deepEqual(a, b, { strict: true }), {
        message : defined(msg, 'should not be equivalent'),
        operator : 'notDeepEqual',
        actual : a,
        notExpected : b,
        extra : extra
    });
};

Test.prototype.notDeepLooseEqual
= Test.prototype.notLooseEqual
= Test.prototype.notLooseEquals
= function (a, b, msg, extra) {
    this._assert(!deepEqual(a, b), {
        message : defined(msg, 'should be equivalent'),
        operator : 'notDeepLooseEqual',
        actual : a,
        expected : b,
        extra : extra
    });
};

Test.prototype['throws'] = function (fn, expected, msg, extra) {
    if (typeof expected === 'string') {
        msg = expected;
        expected = undefined;
    }

    var caught = undefined;

    try {
        fn();
    } catch (err) {
        caught = { error : err };
        var message = err.message;
        delete err.message;
        err.message = message;
    }

    var passed = caught;

    if (expected instanceof RegExp) {
        passed = expected.test(caught && caught.error);
        expected = String(expected);
    }

    if (typeof expected === 'function' && caught) {
        passed = caught.error instanceof expected;
        caught.error = caught.error.constructor;
    }

    this._assert(typeof fn === 'function' && passed, {
        message : defined(msg, 'should throw'),
        operator : 'throws',
        actual : caught && caught.error,
        expected : expected,
        error: !passed && caught && caught.error,
        extra : extra
    });
};

Test.prototype.doesNotThrow = function (fn, expected, msg, extra) {
    if (typeof expected === 'string') {
        msg = expected;
        expected = undefined;
    }
    var caught = undefined;
    try {
        fn();
    }
    catch (err) {
        caught = { error : err };
    }
    this._assert(!caught, {
        message : defined(msg, 'should not throw'),
        operator : 'throws',
        actual : caught && caught.error,
        expected : expected,
        error : caught && caught.error,
        extra : extra
    });
};

Test.skip = function (name_, _opts, _cb) {
    var args = getTestArgs.apply(null, arguments);
    args.opts.skip = true;
    return Test(args.name, args.opts, args.cb);
};

// vim: set softtabstop=4 shiftwidth=4:


}).call(this,"/node_modules/tape/lib")
},{"./next_tick":352,"deep-equal":302,"defined":306,"events":314,"has":318,"inherits":320,"path":327,"string.prototype.trim":346}],355:[function(require,module,exports){
(function (process){
var Stream = require('stream')

// through
//
// a stream that does nothing but re-emit the input.
// useful for aggregating a series of changing but not ending streams into one stream)

exports = module.exports = through
through.through = through

//create a readable writable stream.

function through (write, end, opts) {
  write = write || function (data) { this.queue(data) }
  end = end || function () { this.queue(null) }

  var ended = false, destroyed = false, buffer = [], _ended = false
  var stream = new Stream()
  stream.readable = stream.writable = true
  stream.paused = false

//  stream.autoPause   = !(opts && opts.autoPause   === false)
  stream.autoDestroy = !(opts && opts.autoDestroy === false)

  stream.write = function (data) {
    write.call(this, data)
    return !stream.paused
  }

  function drain() {
    while(buffer.length && !stream.paused) {
      var data = buffer.shift()
      if(null === data)
        return stream.emit('end')
      else
        stream.emit('data', data)
    }
  }

  stream.queue = stream.push = function (data) {
//    console.error(ended)
    if(_ended) return stream
    if(data === null) _ended = true
    buffer.push(data)
    drain()
    return stream
  }

  //this will be registered as the first 'end' listener
  //must call destroy next tick, to make sure we're after any
  //stream piped from here.
  //this is only a problem if end is not emitted synchronously.
  //a nicer way to do this is to make sure this is the last listener for 'end'

  stream.on('end', function () {
    stream.readable = false
    if(!stream.writable && stream.autoDestroy)
      process.nextTick(function () {
        stream.destroy()
      })
  })

  function _end () {
    stream.writable = false
    end.call(stream)
    if(!stream.readable && stream.autoDestroy)
      stream.destroy()
  }

  stream.end = function (data) {
    if(ended) return
    ended = true
    if(arguments.length) stream.write(data)
    _end() // will emit or queue
    return stream
  }

  stream.destroy = function () {
    if(destroyed) return
    destroyed = true
    ended = true
    buffer.length = 0
    stream.writable = stream.readable = false
    stream.emit('close')
    return stream
  }

  stream.pause = function () {
    if(stream.paused) return
    stream.paused = true
    return stream
  }

  stream.resume = function () {
    if(stream.paused) {
      stream.paused = false
      stream.emit('resume')
    }
    drain()
    //may have become paused again,
    //as drain emits 'data'.
    if(!stream.paused)
      stream.emit('drain')
    return stream
  }
  return stream
}


}).call(this,require('_process'))
},{"_process":299,"stream":344}],356:[function(require,module,exports){
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
},{}]},{},[73,74,75]);