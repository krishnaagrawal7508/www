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

},{"./float64array.js":1,"./polyfill.js":3,"@stdlib/utils/detect-float64array-support":276}],3:[function(require,module,exports){
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

},{"./polyfill.js":5,"./uint16array.js":6,"@stdlib/utils/detect-uint16array-support":284}],5:[function(require,module,exports){
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

},{"./polyfill.js":8,"./uint32array.js":9,"@stdlib/utils/detect-uint32array-support":287}],8:[function(require,module,exports){
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

},{"./polyfill.js":11,"./uint8array.js":12,"@stdlib/utils/detect-uint8array-support":290}],11:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":293}],17:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":293}],22:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":293}],24:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":293}],26:[function(require,module,exports){
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
* Natural logarithm of `1/2`.
*
* @module @stdlib/constants/math/float64-ln-half
* @type {number}
*
* @example
* var LN_HALF = require( '@stdlib/constants/math/float64-ln-half' );
* // returns -0.6931471805599453
*/


// MAIN //

/**
* Natural logarithm of `1/2`.
*
* ```tex
* \ln (1/2)
* ```
*
* @constant
* @type {number}
* @default -0.6931471805599453
*/
var LN_HALF = -0.69314718055994530941723212145817656807550013436025525412;


// EXPORTS //

module.exports = LN_HALF;

},{}],37:[function(require,module,exports){
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

},{}],38:[function(require,module,exports){
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

},{}],39:[function(require,module,exports){
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

},{}],40:[function(require,module,exports){
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

},{}],41:[function(require,module,exports){
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

},{}],42:[function(require,module,exports){
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

},{}],43:[function(require,module,exports){
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

},{}],44:[function(require,module,exports){
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

},{}],45:[function(require,module,exports){
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

},{}],46:[function(require,module,exports){
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

},{}],47:[function(require,module,exports){
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

},{}],48:[function(require,module,exports){
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

},{}],49:[function(require,module,exports){
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

},{}],50:[function(require,module,exports){
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

},{}],51:[function(require,module,exports){
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

},{}],52:[function(require,module,exports){
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

},{}],53:[function(require,module,exports){
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

},{}],54:[function(require,module,exports){
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

},{"./is_even.js":55}],55:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-integer":58}],56:[function(require,module,exports){
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

},{"./is_infinite.js":57}],57:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-ninf":44,"@stdlib/constants/math/float64-pinf":46}],58:[function(require,module,exports){
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

},{"./is_integer.js":59}],59:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":118}],60:[function(require,module,exports){
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

},{"./is_nan.js":61}],61:[function(require,module,exports){
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

},{}],62:[function(require,module,exports){
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

},{"./is_negative_zero.js":63}],63:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-ninf":44}],64:[function(require,module,exports){
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

},{"./is_odd.js":65}],65:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-even":54}],66:[function(require,module,exports){
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

},{"./is_positive_zero.js":67}],67:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-pinf":46}],68:[function(require,module,exports){
'use strict';

// MODULES //

var constantFunction = require( '@stdlib/utils/constant-function' );
var betainc = require( '@stdlib/math/base/special/betainc' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var pow = require( '@stdlib/math/base/special/pow' );
var ln = require( '@stdlib/math/base/special/ln' );
var LN_HALF = require( '@stdlib/constants/math/float64-ln-half' );


// MAIN //

/**
* Returns a function for evaluating the natural logarithm of the cumulative distribution function (CDF) for a Student's t distribution with degrees of freedom `v`.
*
* @param {PositiveNumber} v - degrees of freedom
* @returns {Function} logCDF
*
* @example
* var logcdf = factory( 0.5 );
* var y = logcdf( 3.0 );
* // returns ~-0.203
*
* y = logcdf( 1.0 );
* // returns ~-0.358
*/
function factory( v ) {
	if ( isnan( v ) || v <= 0.0 ) {
		return constantFunction( NaN );
	}
	return logcdf;

	/**
	* Evaluates the natural logarithm of the cumulative distribution function (CDF) for a Student's t distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} evaluated logCDF
	*
	* @example
	* var y = logcdf( 2.0 );
	* // returns <number>
	*/
	function logcdf( x ) {
		var x2;
		var p;
		var z;
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x === 0.0 ) {
			return LN_HALF;
		}
		x2 = pow( x, 2.0 );
		if ( v > 2.0*x2 ) {
			z = x2 / ( v + x2 );
			p = betainc( z, 0.5, v/2.0, true, true ) / 2.0;
		} else {
			z = v / ( v + x2 );
			p = betainc( z, v/2.0, 0.5, true, false ) / 2.0;
		}
		return ( x > 0.0 ) ? log1p( -p ) : ln( p );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/constants/math/float64-ln-half":36,"@stdlib/math/base/assert/is-nan":60,"@stdlib/math/base/special/betainc":88,"@stdlib/math/base/special/ln":194,"@stdlib/math/base/special/log1p":198,"@stdlib/math/base/special/pow":209,"@stdlib/utils/constant-function":271}],69:[function(require,module,exports){
'use strict';

/**
* Natural logarithm of the cumulative distribution function (CDF) for a Student's t distribution.
*
* @module @stdlib/math/base/dists/t/logcdf
*
* @example
* var logcdf = require( '@stdlib/math/base/dists/t/logcdf' );
*
* var y = logcdf( 2.0, 0.1 );
* // returns ~-0.493
*
* y = logcdf( 1.0, 2.0 );
* // returns ~-0.237
*
* y = logcdf( -1.0, 4.0 );
* // returns ~-1.677
*
* var mylogcdf = logcdf.factory( 0.5 );
* y = mylogcdf( 3.0 );
* // returns ~-0.203
*
* y = mylogcdf( 1.0 );
* // returns ~-0.358
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var logcdf = require( './logcdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( logcdf, 'factory', factory );


// EXPORTS //

module.exports = logcdf;

},{"./factory.js":68,"./logcdf.js":70,"@stdlib/utils/define-read-only-property":273}],70:[function(require,module,exports){
'use strict';

// MODULES //

var betainc = require( '@stdlib/math/base/special/betainc' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var pow = require( '@stdlib/math/base/special/pow' );
var ln = require( '@stdlib/math/base/special/ln' );
var LN_HALF = require( '@stdlib/constants/math/float64-ln-half' );


// MAIN //

/**
* Evaluates the natural logarithm of the cumulative distribution function (CDF) for a Student's t distribution with degrees of freedom `v` at a value `x`.
*
* @param {number} x - input value
* @param {PositiveNumber} v - degrees of freedom
* @returns {number} evaluated logCDF
*
* @example
* var y = logcdf( 2.0, 0.1 );
* // returns ~-0.493
*
* @example
* var y = logcdf( 1.0, 2.0 );
* // returns ~-0.237
*
* @example
* var y = logcdf( -1.0, 4.0 );
* // returns ~-1.677
*
* @example
* var y = logcdf( NaN, 1.0 );
* // returns NaN
*
* @example
* var y = logcdf( 0.0, NaN );
* // returns NaN
*
* @example
* var y = logcdf( 2.0, -1.0 );
* // returns NaN
*/
function logcdf( x, v ) {
	var x2;
	var p;
	var z;
	if (
		isnan( x ) ||
		isnan( v ) ||
		v <= 0.0
	) {
		return NaN;
	}
	if ( x === 0.0 ) {
		return LN_HALF;
	}
	x2 = pow( x, 2.0 );
	if ( v > 2.0*x2 ) {
		z = x2 / ( v + x2 );
		p = betainc( z, 0.5, v/2.0, true, true ) / 2.0;
	} else {
		z = v / ( v + x2 );
		p = betainc( z, v/2.0, 0.5, true, false ) / 2.0;
	}
	return ( x > 0.0 ) ? log1p( -p ) : ln( p );
}


// EXPORTS //

module.exports = logcdf;

},{"@stdlib/constants/math/float64-ln-half":36,"@stdlib/math/base/assert/is-nan":60,"@stdlib/math/base/special/betainc":88,"@stdlib/math/base/special/ln":194,"@stdlib/math/base/special/log1p":198,"@stdlib/math/base/special/pow":209}],71:[function(require,module,exports){
module.exports={"v":[17.450788230527596,2.481830536488294,14.18876084405435,14.89464967957215,17.532383830409092,15.583586258415338,17.7169630430441,15.78386726128231,10.745784483924918,14.02595525941694,15.237612198954293,7.743624300797047,9.45044595550276,15.919264996040482,0.8663487670395975,11.287929044545013,14.278205582187159,2.2565500612984746,13.535692150790402,10.886274819726465,6.9288521451071805,5.975055435486261,10.235769684481241,19.876112596429408,16.0873991408937,18.330853545698304,15.42144402449062,14.95789648648623,16.277380599420894,5.282873942195354,16.929446953734466,19.167411751915733,12.47980511621721,9.633151910057652,9.465336136766513,12.8534746396382,15.75105529340723,14.432009558943388,3.3002705967452073,13.652973673364986,19.997712298086554,1.1502768150102582,17.005212274085928,5.330757592309956,12.296360289821537,19.70345119797966,6.5465901562015105,15.728670301510554,3.1461255987119863,12.235337254647774,15.868909839097697,9.753460338874817,9.512334986869853,13.643449951443284,19.350647359116767,15.853204185622465,11.75831008212091,9.487882810732163,1.4930187992595911,1.5819090671666292,15.11010762329465,14.341363154764522,3.417483016965437,12.958779456864793,14.663892285825671,18.525910360774812,18.25461435694254,11.531186512238882,9.297425284281111,5.181372587157043,1.4095192435181314,16.42966142001294,2.5456799921294904,7.410617813917559,3.040549550062157,3.7490664471222024,3.878462208150051,9.81672368522105,10.645629239406794,12.009549858354266,15.819816704521457,17.362458232760595,2.922253253128355,6.638647114406564,4.7721634556549075,3.5846587737702107,13.25164259210949,8.880471813554752,17.083952754430204,1.1336985777965003,8.051465243794533,19.699928695195016,4.343687822772506,15.092275617779226,11.230715579432772,10.060045213787344,4.236988581197707,19.213812354630022,19.161536532282124,2.202633690859175,13.714620701649345,9.356532956265662,13.884309595400893,1.4957251158891127,9.88065133659003,11.248926125382184,2.6657414047660355,7.434601542844179,12.973677595939964,2.9557578221027603,10.742867923748861,14.04786597452218,2.165348215863001,10.26302088334592,16.524069257416603,18.25791753794743,5.720067107027589,8.501531114694956,4.012365068493393,7.67788552387862,17.067225773699718,12.504849445429178,13.641078426872104,6.140516351858456,14.688276971183218,17.01398311913767,16.393690488498525,8.073928852535044,3.6472912989095985,8.302093242880456,12.329410773242909,6.8643270977968385,10.024841988715533,16.905509976565895,2.943229617464551,12.918989438777357,5.643238824806072,7.505225484036315,9.401456387072336,14.576610601791753,11.600960502026382,8.024871538760753,7.678539171551031,10.989070525824687,1.4814271297393145,6.525278358409885,1.7914821574508277,2.6753097906163825,15.671477858960703,16.746683969059745,3.4704841451231117,8.380748169984646,18.181132937561813,1.2132925642214554,17.12264521404505,7.7153352346108495,2.772499285312593,3.758304117586091,12.705824242926438,7.330496635937287,18.570246313284922,7.588230849492499,11.547103012506167,15.418159866184142,11.820650420712235,5.069580750506799,6.374225511299247,1.8832069933737294,0.4421828957769014,5.58159833633697,7.431344078643738,13.048897315324236,12.989613219282191,19.245085168865405,0.34617471340235184,13.084114176620357,19.8485273714858,7.343499913327909,17.969911427341657,16.99335753607332,13.608621102171924,5.50443245388657,2.4415987469368527,12.690283734296086,12.958793329070453,2.5367178062234164,9.520987744088174,17.886855774322704,18.25823422675899,3.357261140123202,8.86277163895886,3.0610443379578456,13.850953795551973,19.67616722331705,9.117554469520961,15.093761883271846,2.5748361239199413,4.515631561471531,12.14292066868186,12.850749733217928,12.438259841759391,1.7522413989147179,0.36167811342747047,18.072704745470553,3.878251392758223,7.931775801247629,6.867245018974355,18.985987515729978,7.390380445924647,11.623636202809141,12.156008890960583,14.054185219094503,19.37290183509541,6.345689115307187,8.230712342252925,15.746088299086502,14.386850279824394,18.536270544266596,15.514666020090274,5.082344213432424,8.551709312288263,9.854590140675779,0.054795442338284595,14.969379633871164,9.353373030479993,14.428105456353917,0.3714648304231627,6.58798708866994,0.37079125946807956,19.095815857602474,15.800349564130759,15.733741331120367,19.141135743527734,15.93705138799185,2.4328733490978127,2.0833408064512016,4.486101990630558,12.973014341023026,9.701618214212079,1.8239020708863407,10.081229767368463,0.7036585871211676,16.21388336264723,19.787588136443716,19.3252834364713,12.891841603372214,3.3844293428625694,5.167449731922296,17.079335464945615,2.7967918526540503,9.932962788609867,4.760968485780848,18.94212759955433,16.189764980388503,1.3845988023903866,10.723464519381562,10.4542806654505,6.417319178056147,14.774010245354635,12.594587712532842,16.602601133284665,6.038881576171118,15.517001963228928,10.518509824374537,12.591260363523249,9.686125858168424,3.7472536436708026,17.49654275348821,8.022091563137286,10.934503810892036,14.52487643738554,0.4539897113892222,12.805072962814549,14.33315709241715,3.4184807725720345,12.41165996466481,8.805769583587555,4.173718019697419,18.992271705360643,16.701484344163756,4.082573106467948,15.02710391558133,9.611838686570717,8.48748359737279,16.653580941078797,17.033533663639034,7.856709878141892,13.549252224692063,19.819717391647423,17.662996621107876,16.17215081453853,14.297105449679531,1.6002858440532552,8.682862189613875,1.8837891765294357,0.3755303155665102,16.812929200290117,3.916129339162784,16.445777683078614,18.44874247897508,2.0911852336367565,12.486461916091805,12.415007079961855,12.835926098762034,10.120429900738777,17.798117946355212,0.5598589917602892,18.509523287771646,2.1765483573699385,17.48250666587637,16.82331722870201,3.0109689219093827,11.935754003341227,1.5274320513238893,13.575099502785699,0.08148076023265283,17.90742057596901,12.350340980311575,18.544796558229734,12.024379854076788,17.32478562902535,2.5724224685946684,1.3613218317248688,11.993013898672743,3.180177561597737,17.28034239528933,18.2177768225354,11.361365530316645,19.54508829849874,15.545322018555083,0.31138150779753015,0.8905792060285078,16.928039578134154,18.71618836888414,13.811088577153221,14.237859953504115,5.741150100935144,4.51697486350886,7.429386451657312,8.230268781000705,7.246706270142114,1.4853540876865834,6.29349749323687,15.308537552642125,0.9632037260285076,18.929226182457278,15.10318794259938,9.313347719496935,4.956985932186524,10.97175289764448,18.246063708258696,14.720142334303485,13.022711411025526,6.30856194750657,14.239886524209062,19.980026992203843,3.3613345308271825,3.6002398896225696,2.215405260011596,2.866255169800791,18.53872023986338,12.42578677473626,7.296467793868122,15.58239350475041,6.651494839322449,7.387952134572133,10.762779481043218,16.897019809370008,4.797441914974732,7.360896817129405,18.99915684364708,0.1342204998621721,7.102468035495297,6.557936543797482,10.653401519116276,16.002511221849293,11.253076269423907,6.00898374736202,15.201122204974142,11.44873826071879,15.524915824868346,15.790446691539955,8.823154604253812,19.30671274193028,0.16649468697012004,8.115713140418674,19.477038856334513,0.34138618203791715,5.942154326943303,6.237244926451382,3.910976610788288,2.1706538988866475,10.022778733997114,12.135056928649494,16.608804712500206,7.558916248386289,10.217653314496925,2.6769806019365117,7.992478757242374,0.4005903818258627,17.423931988173113,2.727745255327574,18.56704322141112,13.759385240490909,4.133773907741158,1.96509341714723,5.455551499936444,7.769490440705602,1.3800309491964535,18.36032669712919,12.918217627567078,15.065200193928181,15.324322919001165,9.794377661287719,0.7803638195501739,14.703217059689937,9.984473223517906,19.665617054222086,18.015558623785477,2.8073498956531484,18.17691566807202,11.004834811590651,2.303271859859546,19.783764993044084,17.23921969055263,11.794397223309762,11.311109037813726,4.723115121671082,7.0122283080565495,18.917260903549558,3.0723505644482563,5.839423182515704,13.22030495056211,17.57219815351736,15.48534903471471,18.083435347649704,16.548443809940295,1.0458399898876403,0.43569488817822855,9.121179687831745,5.605349499936829,13.483254694696928,9.134373649902937,10.084633435405102,13.229146445604322,2.7428838510066766,3.8795278866009975,9.152787171756756,9.754715325306766,19.24989845176974,12.041074346879356,7.960078521771035,12.703048124196812,6.585008310567511,17.688604562052454,1.3263828261608657,12.493660684257307,7.544540704983489,17.507568316607735,10.41900546060786,8.681069665900388,19.015766589269887,7.64938066677165,10.687753229661471,12.645653286543537,19.376341250829615,6.418127878711326,8.718499193969018,15.821000851467538,3.1258306582467066,18.540206767714285,1.883885711496447,16.44545352614304,19.611002524337827,12.387135505256847,8.811925584479297,1.6209091371347961,9.714438114824585,14.448462882942327,2.6076651229929437,6.123541898886602,18.57735814344965,18.338464143382822,4.302906660856176,15.244309516854916,4.600864297710263,0.02452261619244389,4.764017776218967,4.839617533746479,8.943324930235006,5.826367048342247,7.465076815694478,16.335469992800387,10.493991487280244,4.403138547028669,6.875377349476488,16.904887464841657,14.683554789745825,2.9465656688877973,17.69746483600454,11.856975864436375,18.36729776669191,15.197320018050418,8.375780760676408,18.04482494473384,5.367635059479157,7.155890029327643,15.522446103299078,0.8131687288569056,8.657729500141741,13.197764875457253,8.848362658063431,1.1034501060541135,10.657103741990351,17.944341016846714,13.38420804346239,0.3825187258652285,6.883364039669799,13.202334052357632,17.11135244162989,13.918162248785574,0.10430696095905301,11.796212213303662,16.344443970901395,18.125316029608314,0.5625712932328852,17.818057198871887,11.248761050168273,0.027455144007570986,12.253181467812064,13.21767112381989,16.298037402844837,8.085076804408672,12.740139794531459,17.873109717805633,9.264449648104002,7.545349844772513,16.846312506838203,9.040463918057174,8.76976394732007,18.84489862302596,0.07051723397831555,12.514876395392536,15.220558706201572,13.786148304974738,11.967378687595552,3.513143984916538,8.926041034710806,18.019791641982295,10.41583408078683,7.835920421117821,9.833629629684202,3.030327284416412,18.561220204851935,16.513307069278163,16.964140137746703,19.7358780206918,6.718080246020839,14.665125160240384,7.052661354471184,3.2540985612488615,19.41068663977731,3.326660446487395,18.22571745777221,10.480247734131867,10.180298068541514,11.417441685318126,9.124276178267273,8.008869678104595,3.9677150606165767,8.113133135013367,1.6190235383016383,9.324344422902362,2.1387280963269095,15.169213171498516,6.858059519739399,12.288116805411846,2.347526107387412,5.452171353292785,2.0479353593846605,16.5025438030739,9.038738233951289,19.497908205703638,13.935143823907081,14.81887985400597,13.1453741576582,11.401164517536522,18.91681658320527,5.75403369580934,14.025213086831979,19.528749855919795,5.387628781439853,8.151890097064891,9.028409945366974,17.302617305767527,7.962401469567304,5.81484637936541,3.699424326511509,16.507205065911293,0.6592597671550315,18.70036831897525,6.473670281903745,5.16899638401068,19.494638845515592,18.73593539144222,9.0476570719962,13.887461250700248,12.353715806086484,18.183802159824722,19.28123139971214,3.8687077008010773,8.59598136184255,19.682216325010163,3.7292026840707093,7.006432585058446,2.2122477257457973,10.31296223920255,3.7680617487906343,16.254900246658316,3.2633617690916994,12.885253970135988,2.859124450514794,16.258316002669602,6.1483761414054205,19.214599595124056,11.541223158165096,19.553245706089317,13.075205222958894,0.05299010243580593,14.319849099801809,13.279392783508278,0.4023603570374368,18.270281093006965,11.52058595837184,1.5280127006109279,19.477311879494316,13.179316870605838,7.047377605568728,3.963391744123874,11.934481921071374,7.815286037178715,0.08352314175580133,14.795577337679461,9.017765533135753,14.621067874184304,9.572540662818025,6.545142544772613,1.1686796918369957,10.64291948147277,13.03156443879728,4.894315398689919,8.806341619933882,6.824379215209482,6.473830631083262,15.442689804564825,0.9523568914030633,19.130398178571568,16.63666552241338,4.970194234376666,12.379603394095021,0.26068126031317806,11.746292909103486,3.722861440197005,0.7407616389895777,6.315606072161808,8.9378809182723,0.1630739211666743,19.858328351184568,13.927326279975567,7.550058990333888,12.590579219643656,9.738770661684315,7.0072612989800875,18.705667504064635,11.736903264697931,7.39752145856265,13.957581003750459,7.1993144198136605,18.076886754170765,7.62855757263055,19.080048149263025,14.121092529726536,15.174748067018427,4.252489527315029,10.987395788875416,14.804820936465033,11.529752233797591,15.897394718637834,16.717522427268825,3.274769288738706,19.90312942137018,11.360765696002604,15.380856627438181,9.376886541624806,3.915466839900059,14.486595955135906,8.441312930132403,6.689688581174451,8.585521228271297,13.361764207828557,10.868604564146608,12.164677261624437,9.439526246358877,11.336639512679053,2.523115926834407,3.1991012226724402,11.381894217319921,15.554368024939276,5.720580561464406,17.438291877852663,17.62410640695551,11.14247001829353,9.804027785072172,19.30198882651524,8.49062088089028,2.891558528850089,6.371550939313013,13.958465184002403,0.35388126699473776,5.860319222917276,9.354412946395021,4.68085176325677,15.978714541186182,5.263643059298797,9.792651260808691,17.06823980294744,9.401082875834463,8.104990380405269,11.546989250626494,14.866156151372468,15.388034586002428,16.05115831279463,18.951608667415446,4.864033179002116,2.1962325354714407,2.732882168251125,16.56065912565776,14.29610302217949,18.293111280981865,5.270767891310411,0.8086810397492794,12.797981620992847,1.1473995878825072,16.445702775140624,17.883678846500505,16.15790533122327,6.546906259572971,18.958228524743305,6.970915025985405,3.168670334121244,17.69867173634642,5.516265611250453,4.164774996255001,17.60260418225767,2.7112228851963804,12.594169912751777,6.129877605165546,15.868930171691096,10.31369684165178,7.8869845311891895,19.910019223092235,1.8088656633719546,17.47692886627214,2.1938488808739143,5.763269117408032,5.406297662465698,1.2034793582862813,9.095340731390213,10.960919721967372,11.134091431742291,11.036502315017751,0.2779189402123672,2.2960836301733734,8.370838045834255,18.574589172679655,7.736813282659742,16.368301466579958,14.237312607981192,5.266196804750916,10.263925846845744,12.069938547015404,18.56089036543953,18.316235756133853,5.125348399790592,17.954988351518317,18.645224027632146,5.437305226373046,1.788224660840747,7.142803107995106,0.6595200728391815,5.155594031223498,17.699176439231902,19.481717920819676,13.88572960442318,8.13145726085111,0.30091879288380863,1.1755822304332675,11.188866045448783,11.722397263151958,13.46325123641873,15.725138584624183,13.188756752017206,16.957779805890087,16.463846441135246,2.1705618447440544,3.417434383178284,5.8148567837732745,0.32123495398328483,6.5364997054137985,3.383399695264857,16.504514996801948,15.272628876127797,5.220679417506426,0.21760199442893757,9.787525325654531,4.2080536115467915,14.394834027723839,4.883421709425058,5.527050753141984,7.84239711774382,4.886673573050113,15.669433186559672,11.570372349001916,4.991204042898674,16.684546796688412,16.897547879964314,14.961038675162328,3.7580103301390455,8.39833869086302,8.164676046708683,15.417091681782559,9.135620152552569,8.112719870382175,3.1630667980195692,17.56769746504301,17.283204265142196,11.945630782686694,7.586309472058712,8.984670255227755,5.02063215573846,4.665632684554812,5.812717376405554,12.884278453578112,8.879946389979963,13.618457988018339,8.947427966168053,14.472748687154397,13.44398223466075,16.085421343182364,11.940063104592102,18.454151352960476,16.814361302580853,18.552661341622667,7.925580081136543,1.1474708524025212,11.090892298569477,3.041229050018992,14.17605463672655,3.8111767245137163,19.837555567424165,12.129823285958846,0.32114976100334314,7.8245306437298545,7.087003851921421,11.948689714379256,13.61945249560426,9.832268362694032,16.24175707644113,16.621794631385267,11.057464667542924,6.1426483328494985,5.965803930048472,18.768294608844123,7.10437296363724,18.243590912804926,5.779021762907548,1.0065416931985816,11.761117963462269,7.011251009190915,7.900428672003148,1.6258701191174207,11.433649093961801,13.076592455065574,11.57614664125768,12.020426858035428,16.58910301370198,2.0607386658405336,19.27226137652355,3.2711611816295694,13.625764886718343,6.7836052307005845,9.397747518655812,13.598218648067775,15.965585738379616,8.146631500948276,4.691069942249011,13.998624999954679,8.931501948735686,11.239857738321897,11.775903573778308,9.808669725130684,6.37405708469855,18.041104291126494,8.833070675148624,6.455345672202015,4.0360666005569845,14.578111269397564,5.896657457901764,3.8441726042083157,18.894776616575157,0.2858482948257812,10.452727167977116,7.5406997404960885,0.3042613752945078,19.053255940493642,10.852248425956788,6.14228132566967,2.593431974408813,4.015924374776412,17.203860095770224,12.248337608143842,14.67133884260722,15.28236991251648,1.2062950220189261,16.394510765881233,1.6207537228581348,4.454206841879063,3.3504366248472195,11.532789924502813,18.378011064774924,13.626753648660097,5.801887501233627,13.737099428086136,5.230083795750864,14.995234397469904,3.42342544407483,3.20677529504791,4.447224728793593,6.822082114321684,8.934930056262056,6.28433746605725,19.929454529461992,13.980628598804724,8.637392991831021,7.568541253659009,6.765729744177733,3.286719338925317,6.637359745830307,10.009057201303651,18.11586945625411,15.782762329897292,15.79205897411223,6.526053084420327,19.735450647538922,7.309335527688328,14.192439171130244,13.688292408940583,14.010192535577183,12.662666707778518,5.109827156072728,1.61107166345686,14.24961068116762,8.866564812307466,6.151909739324148,7.658325540034929,17.92395681456235,2.141888379758705,3.439356576202486,15.494248673638133,1.9154644073118332,2.622731779815739,9.5302161563713,4.269268822357155,10.57469753701858,8.642907227579947,14.228480408590173,0.7467262534914543,4.2713760997264805,0.5018535742877894,4.2899646328666075,5.242375841189655,15.346974461957918,12.2684346461571,9.787273173373965,2.206606457395517,7.770020641159885,7.801142113748054,8.211583126202427,15.972346357408771,19.11764608243125,15.976026587579906,14.798089165678565,19.913401605604562,7.076054356288837,11.774410691315914,7.828466421575921,9.074028924652616,3.9610038151779436,18.824479930351142,17.24913954773262,19.84761272522205],"expected":[-6.484044435008599,-0.034271811097977535,-11.834200979731095,-14.54950094916272,-7.807189372817798e-5,-1.3812474508146138e-6,-7.368270506406166e-6,-17.65320643024282,-2.66300800352849e-6,-15.198801617385831,-0.01602763085556929,-5.1307156962116,-0.0013471230138767107,-6.592605331498814e-7,-2.275901688710478,-3.19328114310351,-12.337923303495083,-0.950304593926012,-13.657176111313305,-1.8370437476934063e-6,-9.085238397919959,-7.671227120016201,-3.612635254660397e-5,-17.837948730046463,-3.0398226247900824,-1.336057636035411e-8,-2.34515975630199,-1.9584509123313166e-7,-13.44480712819001,-0.001089379361534408,-17.513791782312722,-18.55054135066545,-5.667296951656955e-6,-0.527041694314556,-0.020586153470630777,-10.405603407032924,-8.359980288224627,-10.90938849377433,-0.00375080919575176,-7.257957994250162,-6.7702592313145304,-0.9347056407572762,-7.323961608106866,-0.6854589895265529,-14.986777945247812,-0.0001480815098228703,-8.7002604637826,-3.255755835192256e-5,-3.722079251085758,-7.10935977838758,-0.1443834735994161,-9.11534366208348,-0.00011908319332744657,-9.143881052642252,-12.068764025606887,-0.006782844546761654,-0.00024798741237497734,-6.237956828725238,-0.06460622648720649,-0.2965849289878813,-6.413661735574784e-8,-16.248621651847344,-0.0018449508970192513,-9.05610850768767,-0.009479996931643817,-5.2073474766798,-7.271524879784269,-0.04443756909107489,-10.060088877586088,-9.520871879999943,-3.9989413391178177,-9.767389518906143e-7,-5.558891404551764,-7.256775660700847,-5.5622703324107166,-7.778233280188278,-0.07835828213837423,-0.5480195978580539,-2.6367199588370016,-13.5284515315835,-7.268537913381805e-7,-7.982160585417454,-0.044331034930347825,-3.0095789455683146,-0.0012264910541203253,-0.0049407468937266415,-2.4583789805901843,-0.00020677126699453687,-0.003605126774501249,-0.05286859845481547,-3.399701081025165,-11.988734256545177,-0.0014274786973812648,-2.081671209980949e-5,-1.787349385788413,-1.807386485108384e-6,-0.0003713681228139014,-0.00012135021446543682,-7.506087316674476,-5.440393890456081,-1.914448704351007e-6,-12.043777824074844,-13.159227012429275,-0.020053967983875296,-1.6488917355022306,-1.8265805626295782e-6,-0.00852171604589272,-0.0003318085427792132,-10.946705191371827,-1.2419270124355295,-0.13136574545312416,-9.622769531755219e-8,-0.4565871499400648,-0.12627296093505427,-14.43903546173247,-0.07136028798555777,-2.267649610693548,-3.619568821198403e-5,-0.00033825114932469375,-1.955314728008732,-10.95609754221379,-0.0011442999104120904,-3.8808854627007516,-0.009086505270574342,-3.077985424626259,-15.244855669758005,-12.687221959237979,-10.27666240257929,-0.0017838128848411958,-8.043798122413756,-13.53596458402038,-0.00017247537907189088,-9.830654350543725,-0.0007659902919860964,-6.109358185969645,-2.6902572223840718e-6,-6.307883595300977,-5.870160545285073,-0.0016519626972444897,-1.9739615487006148e-5,-8.602005732401485,-1.9648358122956527e-5,-9.448556280383888e-6,-1.6720632007333527,-3.7980251974410058,-0.3096143822722762,-4.618490177553851,-0.3568565638224984,-3.582946805761661,-0.03444355269651617,-1.2732361957310716,-1.2344008717173809,-15.143154374987814,-3.8330458234811786,-3.263692626470953e-6,-8.475991596505708e-6,-0.0029932601129462437,-1.1447257549206422,-0.3051478840517206,-9.479792383460806e-5,-4.665849558479467,-11.793114251222418,-6.664133425038253,-8.080416530252428,-1.784326148080879e-6,-0.2350963417600405,-6.269226384715015,-4.358141883229959,-0.2811297005199959,-8.625233504315236,-10.595530541149902,-1.6524659972975287e-7,-0.7092979914319372,-1.965493739792969,-0.1902171772134125,-0.002764627985834414,-1.3429542518412767,-0.00046470572432004214,-0.002626302082070108,-16.541669604112972,-2.9268117805089195,-3.975512411341468,-0.033962418211966085,-15.00795167768116,-1.3916852229011404e-5,-5.857505821973467,-12.248065244534978,-17.00073237915269,-7.253318004040214,-6.1185052291309,-8.170099126022007,-0.06503987210826012,-2.9697780914720098,-2.1573252223878804e-9,-2.4476046166303274,-10.358505339413208,-2.9322881869788437,-2.2227737667446705,-1.6770538517822542e-5,-1.934892870309304e-6,-0.6295126121557184,-3.6995137011876245,-1.6487791116309327,-1.977203722530349e-8,-4.556297840562645,-6.534674135825342e-6,-0.000934027982881986,-12.77242462018114,-0.0012494662239505977,-12.655910400827064,-10.563821385742774,-2.537780166863055,-2.741529798135383e-7,-6.48884339829412e-5,-0.024644689480721224,-1.9855213033146498e-5,-11.173686596581506,-9.440283235833562,-1.7245630355844118e-7,-7.549486433886577,-2.6038253513203715,-6.559383535480489,-0.5653815709956185,-0.08551975101185019,-0.019255876533695333,-8.632396201352198e-5,-1.7478273695445448,-1.0689325174026516,-1.6508042684560733,-9.496403402665992,-1.2455077517738925e-6,-1.8324441256788454e-7,-14.645835123856395,-0.0037084497488687257,-5.085706549499349,-0.4170563346909564,-2.481691928411254,-16.01982574439556,-2.7833607935059246,-1.1387142466066984,-6.536659212535036,-2.7439950224693375,-0.23866392057855035,-0.11931256148341299,-16.671970026311566,-6.917525425211781e-5,-5.514240676433889,-0.5286144288658734,-9.900532051003708e-8,-1.4731735132930543,-0.0006036979537428895,-3.0738493301120027,-0.6715402946156863,-0.00010613128216173121,-0.019485444698305442,-5.328202227847928,-14.305045927045049,-0.0018836960680345886,-16.633752093196517,-2.05594064564145e-5,-13.360508783608374,-0.0006375661425928968,-13.604280681657118,-10.422740463249523,-8.058702873013972,-0.00043429839811690387,-0.0018290797916791302,-0.036429413128117184,-11.718333044464313,-0.0001978238877267964,-0.16048204930946516,-0.14378095089373386,-0.14962326969860495,-0.00036898800767236963,-0.6770608103203066,-2.423827079192602e-7,-8.040749110757723,-8.204148125791145,-6.926863384142852,-0.003020579327196204,-0.037799645355090075,-11.865478656984719,-12.806073128172637,-4.392577130407382,-14.891082807492324,-5.833150303362604,-10.936842655198348,-16.10705802244761,-9.105574632129086e-7,-0.31458481933063054,-6.27205893895023e-5,-13.585204408920463,-4.6123724326022595,-3.279180781600144,-2.9915171193864967,-1.7681359990928418,-0.00011477471561628544,-0.0004248762636531361,-2.344137367949271,-9.0690890337619e-7,-0.006543912038575381,-7.621759000288996,-6.880040448646626,-4.605960098978891,-2.505793297472352,-6.45858183831289,-0.23267077714319453,-1.1590646753112442e-7,-0.2304288424226962,-1.1161365786284507e-6,-1.6295622911466818,-0.0021502086205744124,-12.342758627897775,-0.01769069952660487,-4.397057795461434e-6,-0.9822392570725719,-17.795052465220227,-1.4998682462296488e-5,-9.243285095860644,-5.9019736660904635e-6,-0.8377399332003607,-0.038718347514373856,-0.03091601405463009,-6.846232071484442,-4.7583548970629765,-0.001720052404539004,-2.82587008406211e-7,-5.0056871296593215e-6,-11.907724951641843,-0.034326137642689616,-0.3012079421886144,-0.049405803012111366,-12.788378509075613,-4.1022488922159625e-9,-3.931338644784529e-6,-11.645534804736597,-9.277900769795291,-6.571497677858118,-0.1349658983114506,-7.920161113473599,-8.993021840911508,-0.43664142884241547,-10.587576719462326,-1.7755826242568716e-5,-0.6776047953295202,-0.00016548256454731138,-0.34642052848934074,-4.813380578542667,-0.03443957425263038,-7.640057717489961e-7,-0.056694910758641776,-1.351233376686936,-7.1558245019984055,-10.325548059876716,-0.5486118625273373,-0.6367766034082375,-5.975420657073286,-0.000913019715155138,-4.588213668060164,-0.001492579048920725,-0.5645652421392859,-1.5607264335851262e-7,-6.025026033808954,-5.726341574317141e-8,-0.024062118700598805,-11.740492056129108,-0.0011875466176239817,-1.5387947758588134,-1.2127815911744841,-0.054551097459023444,-0.10930563852701418,-0.4329132550467336,-0.0027929396445466647,-8.008449896600629,-8.286022321891796e-5,-4.6265494004942295e-8,-0.5967276618656443,-1.2946638129093382,-4.654770089657133e-6,-0.00026989008882318617,-0.0865309845211406,-3.5670355995571125e-7,-0.05153228962764148,-16.10464793027295,-0.9847737699276358,-10.846002128365628,-17.149980034164837,-0.23101273781231924,-7.503635117769862,-0.3036278267871674,-0.0009113792149649425,-0.20906135530991402,-7.720935122036779,-0.009433664342819717,-4.6936453353537283e-7,-11.792363640868782,-0.03067939475126423,-0.00462162484509302,-7.108809899583182,-0.24385309435536232,-0.7714009097036252,-5.275364907942898,-0.4020607355026914,-8.588079745673538,-0.0038169201383622476,-0.057796252847338914,-6.462907082664575,-7.630089730054073e-5,-1.0102190798560968,-7.2316454092488754e-6,-1.9561938739608937,-13.964215455220133,-2.024905960011782,-3.3326894916068137,-0.07084921789541335,-3.2867322298400805,-3.99078590670784,-5.439126907194328e-8,-0.00030574577483655826,-0.7220167794633817,-0.0006146092452420333,-0.00023367419866135813,-0.007714044036591319,-7.720938207658556,-8.274548786176318,-0.0024108173464678453,-1.7445144487689716e-5,-4.757861812896626,-7.922396257794165,-0.027331957155398934,-0.019891815516345536,-6.206900805300956,-15.68183068221558,-4.762658907223937,-0.5510241344104052,-1.3054035978182558e-8,-2.608523607983789e-7,-3.3908580479775696,-0.14954648276690158,-6.541261430694988e-5,-0.4711115679454344,-7.010838886393188e-8,-2.894601014533688,-7.333891351183685,-9.256476937313701,-0.003012001901809499,-0.24669792390633244,-7.638334348272461e-5,-0.0007891818579018799,-0.01524673408005607,-0.00010203030939530985,-1.7613183265735985,-10.734772431642803,-0.9522176202614707,-7.7140457440211625,-3.627367736748208,-13.981834529153181,-7.73050138867921e-5,-0.16613545136342817,-4.704817717080149,-8.668752824669733,-13.712046622598768,-0.0032842202749128603,-6.032688606518917,-5.581625188485212,-0.5845101304149102,-0.008997108801015676,-3.307893970550481e-5,-12.103517238110605,-0.013482751358418477,-4.252003589939745e-6,-0.04362467853463037,-1.1539814372307541e-8,-8.47730993914397e-7,-8.745462617503156,-0.00012785317558629562,-1.653497180237226,-12.510757443423705,-8.766030963914952,-3.7585754103802476,-5.868867957013671,-4.444527637450079,-0.002755832481851472,-0.06562963782483842,-15.266868939962077,-7.347397232591221,-0.794527243378353,-1.8882785358380123,-0.0008961766816334808,-1.9111483985044316e-5,-6.249100599029525,-0.005132333298203231,-0.01464672555448623,-13.176522659575657,-0.00027264600874180164,-7.684401025522508,-0.0014234504172740414,-1.7680821950688803,-0.004210450458442202,-6.127043237934091,-0.025544101826950084,-6.796738218084941e-5,-7.840685447477367e-6,-0.20138540524730625,-6.935640418690619,-9.641790542660802,-0.8542212873796045,-5.22060048951134e-7,-0.2260497563442672,-7.88641076006384,-2.8706997273634296,-5.435900610651504e-5,-3.165927891330255,-13.993253135169734,-1.3005407429460709e-6,-1.8905544110694126,-0.40914641704172666,-3.9197782089232622,-0.011190433319395602,-2.3793785036364046,-0.6448566658951026,-0.46833684843000206,-13.787409409083399,-0.003506603382716566,-2.0334519189786695,-0.11503352188862674,-14.723655395094346,-3.115020918029412,-0.8157601622113105,-8.330994268938165,-15.944822914121763,-1.4392760742349444e-8,-9.311658725156,-8.001425436259252,-6.829047912022543,-0.016781954158936095,-10.953666970693662,-11.234030867330583,-4.324339569809173,-12.2868729767133,-5.188559022821119e-9,-0.9522881428048091,-14.603445489206143,-2.2098134790784868e-5,-0.6157335877374868,-6.499593274887456,-0.08623153335528709,-1.6189026678482805,-9.48075598280133e-6,-8.290422102188847,-0.5147367223777533,-4.357562668143207,-4.710953234068281,-0.000647166612310756,-14.357677709209645,-8.018885091950821,-0.05271706215254875,-0.0013841555103590569,-9.148499329708202e-5,-2.1380006843413936e-5,-0.0011274823320313694,-2.66838429823265e-5,-0.001477894745463515,-15.533388470224088,-0.4801253939748424,-7.301041672266759,-0.00030142334883351274,-13.162682480116798,-0.27128476224092857,-0.005176462519525746,-10.611075963939692,-1.3633579226879955,-6.580803613466477e-6,-0.008742300973901464,-0.17758568608761718,-0.008644441231299461,-0.0002035696933384227,-0.03409810469435959,-8.586066823912102,-0.01686500143419578,-17.86457223960961,-0.7050071124761632,-7.699679117202461,-13.123567437586761,-2.825442757043925e-8,-4.259305396366803e-7,-8.152837281283038,-10.079570290755138,-6.8481531132268865,-1.2704207589665964e-5,-12.571205222671548,-5.44551354448071,-11.175343278668565,-10.663091308997874,-4.3278763623928226e-7,-2.800990785830195e-5,-6.241180668246869,-4.912095660694929,-0.23368635751155975,-2.3505201302824292,-1.619904083120131e-5,-1.8064633134973338e-5,-1.1024752972087262,-7.405123078577388,-1.342774396290823e-5,-2.0585120919184032e-5,-5.096433707416063,-0.010024892894134394,-0.45469586431786674,-3.414056387787336e-5,-5.092132385995535,-12.047789967403913,-2.334358110931867e-9,-6.887289439595217,-3.7663491951538895e-5,-1.2587852934452506,-0.016630488425634308,-5.020417432226914,-11.108419444656965,-6.567353686420109,-12.70015927527056,-0.009405181302452428,-1.1081890457364263e-5,-0.0022862569644072333,-0.17201490757413573,-4.670097071122514e-7,-16.208368262812314,-6.398573915060541,-0.8328436983011791,-16.11763159364057,-4.828253978614521e-6,-1.831499849639083,-6.238809883265535,-0.00041991109831685067,-0.1292476849212713,-2.106255413551773e-9,-0.0020012035070466525,-2.2843758264957406,-0.0005585460290277755,-14.971547708281932,-7.833903162232614,-0.48392723637323376,-7.219535900855298,-12.126006357732429,-16.210501104920098,-0.00010192173498064425,-2.331748660814637,-1.8658235835962889,-8.318887406821514,-15.300998328248772,-6.153336115112272,-12.363651475057338,-0.007466210169222251,-8.965968777512117,-4.158035953212368e-6,-0.039131316439271285,-2.352925671756306,-9.819155093614752,-8.640502525318603,-12.960511327458455,-0.28473312290970165,-5.559039806468064,-0.010630485896559365,-2.380230078578028,-0.0002394903919135451,-1.8442650633809108,-0.9626256084241724,-0.00020901796177629192,-9.066016900130918e-6,-1.948849433288161e-5,-0.0007509867568874915,-9.772753052098861e-5,-0.3325054890749669,-4.789785263337574e-8,-0.004911544521133452,-7.50493050520558,-0.00048368506157732367,-0.0008479500247668875,-2.303817957644135e-6,-9.054986010997318e-5,-7.359763888570567e-9,-5.4608225018155335e-8,-13.344662060870201,-0.0007666328298787365,-11.684948357680733,-0.577221679781236,-6.170364651804279,-9.24193259037943,-2.021401412153513,-0.0009329899516327278,-19.067892375922273,-6.534470011021139,-8.827643729583821,-0.0002909884480716354,-5.32129496851757,-10.651161994767026,-0.001117217718339768,-0.10770757943720237,-7.24213286985377,-14.17320118043849,-1.9730732888387714,-6.266905451128309,-2.6840788613007726e-6,-0.002411822680701385,-4.548905530468525,-0.051131273096985494,-5.027645727422151,-0.0020896779326821826,-0.0020887845845426016,-16.469740259514488,-5.583664794607528e-6,-7.016933813183497,-10.924740968524121,-5.121459236216406,-4.249924275719401e-5,-0.008379138475100053,-0.22228947137650087,-10.712227404696545,-1.2846928807967373,-0.3093156013077065,-7.422035260910318,-6.621702918220937,-7.449999557219439,-0.0059593366574681025,-4.249694518257688e-5,-0.000707114473707345,-2.302386863562193,-1.2418201224828345e-5,-1.2857752287141726e-5,-1.2316775635677876e-6,-3.428951650313293e-8,-18.073625899484473,-6.141756070548536,-0.0036525409312776693,-0.005433805547926003,-0.21652243226393048,-7.2018781121249855,-0.00039000293335214706,-1.9367613427969413e-8,-5.504351132302882,-0.16665512457849394,-1.1188869339101582e-7,-0.024336620864995797,-2.735648299688299e-8,-18.496013616347135,-1.2583619512954664e-8,-3.7260262301616924,-15.867556091724293,-4.898162819030897,-1.9639455481979256,-5.803401325016972e-5,-0.02881879259180676,-1.756687492815535,-18.060260896207463,-2.7681077660818563,-12.140362225288223,-8.325425439156023e-5,-10.719022634107079,-6.900799708809888,-1.3603583336136484,-1.4805375347283143e-7,-2.87753160644746,-12.949318681350201,-4.757935339508679,-0.5321010520559077,-0.7061837812456906,-0.6908683030887586,-10.204215224828214,-1.406843713471804,-12.618155199187393,-5.510466616702979,-1.1144475723599454,-5.338126804294637,-10.809076796252667,-14.32546561428418,-10.99153516816357,-1.2281615541151685e-5,-6.58870305298918,-6.632834238867085e-5,-13.815084964231458,-13.29911573052276,-3.875147904252514,-15.785476053239616,-7.255282223728813,-3.1594279215148265e-5,-2.907166037913631e-7,-9.810914701351804,-0.06293951419157569,-0.010454493397880807,-2.6714289920412972,-7.753826001682223,-4.60757640146927e-6,-17.14160633834701,-8.278399043083072,-3.468263269346851e-5,-1.297600090869906,-0.024483727336843716,-9.975149190092245e-5,-0.8805082110690392,-12.259103050393186,-14.422240195037654,-5.541329268292284,-2.4329549623744065e-6,-7.461901454380737,-5.333406893215586,-1.4548642205822357,-0.03651430310724395,-0.1979510478171016,-0.00037421559247816896,-7.115385188699113,-15.119758204947411,-1.811364500683959,-8.961726462712146e-5,-0.41186747072730884,-0.1096784750321523,-0.052588308922423596,-6.526520526878728,-0.0035759268276130515,-0.0001269163243278082,-0.001238467910221454,-8.420301253634925,-1.7258478973212153e-6,-2.307629578886069,-0.041008088742595025,-18.025179269517423,-11.781410251391527,-3.759891135976861e-7,-1.3228025814500892,-9.759835190556784,-0.005937007369027097,-5.87841711545368e-8,-8.60771817705208,-0.0009059397795430436,-0.00411255013478673,-4.111475059863877,-1.0430820514644359e-5,-14.22296332751005,-0.09434534573186544,-1.8800724913306297,-0.00011135389099629095,-3.512324611803867,-1.4060891706005005,-7.597492346045643,-11.380902254857277,-3.618014982615325e-7,-0.0003292497642233934,-0.39622081725414005,-15.149010234433339,-0.0009480473428795767,-0.9470920791158506,-9.626987769898196,-9.773881929180321,-4.599341331835649e-5,-1.4749897079765724e-5,-3.029415168307722,-1.2949561809870697e-6,-3.4460941241532352,-0.0003861796144110618,-0.00039310344100637124,-5.040806852506453,-11.33594582316983,-0.9045370251555296,-0.00024754933387899754,-1.2497099754031677e-5,-7.088836084023968,-0.0002149595827101822,-7.899087451225737,-16.598151656122166,-15.0080347137416,-6.196971928562912,-0.0005278163471341391,-0.00019259005591059985,-0.028072719056000263,-4.853560835421581,-3.2233078935775295e-7,-0.027642797466213384,-0.06140345404789886,-11.380788439582023,-2.763629126486512,-0.0042948663047171565,-0.02408476042793021,-12.605003283321638,-0.007972527188983454,-0.010656728947285171,-0.0767098924171836,-4.1513684093888845e-7,-0.02008613536959275,-11.86341109922826,-5.602746490899228,-1.5154414791314084,-0.19754393045700827,-0.6789215072810332,-7.689623369188431,-1.0402868438953385,-0.0022405127449189573,-5.195078023058459,-0.32398697787203645,-0.12527620396939715,-6.300998820338743,-0.6143672905583217,-1.2255703187916062e-6,-0.027119066569027864,-5.06290328829615,-2.3732351408312518,-8.645786377610404,-0.12217793244502587,-5.311939633813709e-5,-7.242568224893752,-6.724205026872735,-0.03002014637537546,-0.2165723039119094,-13.508012048256916,-2.1701227647125383,-0.33230250640188974,-16.69532510832817,-5.885262666234318,-0.00019879628359591208,-5.145525841527619,-5.035790980743195,-0.00032258652936882474,-15.570118566064572,-2.012520008435172,-3.104616034390494e-5,-0.06507691167110084,-10.953014539803473,-0.07061912208210472,-7.242259660135731,-7.058799457831403,-1.9263579326002404e-5,-7.469410661881301,-2.1537769704137357,-0.014067113598358192,-1.8409105572494364,-7.95635405128179,-0.01246213070520049,-0.004085629852026552,-5.955213609999406,-0.0071037724620733305,-3.848878625780136,-0.159570948000367,-5.050926929628567,-1.9628140264744416,-6.075935127132079,-6.651958438868888e-5,-1.0207859555063605,-0.005120247100732883,-0.0009930652859514934,-0.027141706059357715,-1.9105159158103246e-6,-4.4351069050942974e-8,-0.6511557984202389,-17.60219718854683,-7.619628543610807,-1.8925840485425604e-9,-0.948061453455121,-10.313232827446138,-15.069511479070348,-1.8699393321370126e-7,-11.720365864289171,-0.005608858864081875,-0.15437398711845576,-1.1582500777459741e-7,-0.0003711699600807067,-6.374959221565869,-1.7673361133046863e-5,-3.6355097924593533e-6,-3.740592455620053,-6.119483130626189,-0.08446251344224864,-0.04959931372172851,-4.1301842915493925,-1.560421555124459e-6,-2.6905024785321565,-14.35501145664138,-0.0001276157399826767,-12.498379576161225,-0.08797353481941657,-0.5224611843772287,-0.11091293082119907,-7.747476863248836,-8.25903663970486e-5,-4.885401608955015e-7,-0.2696484335209921,-9.603067953631596,-2.508782923261523,-0.010038432741264314,-9.489346075658231,-4.231081247385951e-5,-2.9600940785193995e-5,-7.262350166244211,-1.5468487866824776,-7.213495722027518,-6.884151207793545,-9.585737785966575,-0.29224221965504965,-10.015108221953586,-11.464288223237252,-5.325751412221722,-17.813076913196586,-1.445285091214524,-0.0022901474798375575],"x":[-3.4360833956260173,3.12318639144773,-6.440798982092453,-7.960214546521449,4.792764685177486,7.132871823338785,5.900901479760673,-9.767128118708154,8.304882248584239,-8.70076954437529,2.3633852644204936,-3.2730237443201204,4.0296421955374395,7.4953683230641985,-3.52970992015214,-1.9084784909211336,-6.72560247354081,-0.32444835618068524,-7.780986338351297,8.557624519498752,-6.975271819016333,-6.056950326413033,6.3812758713953315,-8.651382576644636,-1.7699258031017564,9.208134499673506,-1.3655655149364385,8.536699003238844,-6.9651276081767755,5.556887618049595,-9.251902645076537,-9.225405201648229,7.0181023490417935,0.23476946465526005,2.3679301477158745,-5.839598933035268,-4.394847750562381,-5.861483467240776,5.876795649188997,-3.9888480238439827,-3.4925239343247494,-0.3400424137730518,-3.837240212229842,0.010134818989463668,-9.333331613430502,4.383433982819888,-6.825193952361843,5.379322437124916,-3.1415916897399665,-4.020570149650244,1.1457382082207612,-5.692968970557275,5.703715749040352,-4.990670653211575,-5.850912270585393,2.7781651299859753,4.753934526959306,-3.7876460690279634,3.1610460756573246,0.8292710227509801,9.258615655470457,-9.346853517408169,7.100837613966892,-5.0283221866509775,2.6388751741041894,-2.8270680237020063,-3.7645833989967414,1.8709656684276066,-6.599282624615799,-9.899705871868981,-8.242884120978772,7.15772711630704,-7.787923796966503,-4.945309550090626,-6.323337399245594,-9.782880641135163,1.7868663599216248,0.20230023422192822,-1.5806388267583529,-8.26792752156627,7.460258522311879,-4.122956454546141,2.542369188043164,-1.9198078905460534,5.829481388671507,5.011933213574293,-1.4469604257973767,5.471185208962135,3.050709788601406,5.051930714925037,-2.11846479227912,-5.782044230001069,6.061534976623761,5.693087706053369,-1.0077222431269348,9.093145759563868,8.68921037396218,4.493527916412825,-3.836289916837492,-9.09985255367336,7.393007229709273,-8.39651603912567,-7.340716862081398,7.0742160921014055,-0.9099167772142316,8.3696150693758,5.373690406953244,5.596809528173123,-6.1492317411820085,-0.6236734741221639,1.2265218154080735,9.407428951793296,0.38761747086043385,1.2551490330717243,-7.481045449361066,1.5523205606253612,-1.4222814299215472,7.140399070083138,9.495308164215967,-1.1542950888747505,-5.548078574282602,3.8162438850876548,-2.2532363956627544,3.196721665522242,-1.80198553888828,-7.8381244133292105,-6.5274164956251335,-7.45593522178853,6.701954170332478,-5.303427765189324,-8.13607280014331,6.554947755905335,-6.147396944353405,3.772612652852839,-7.951342994570272,7.400998771277145,-4.7706268896638715,-3.8318858812162615,3.905426091829538,5.79634153395444,-4.9572966175035305,8.097946047749627,9.311531122715504,-0.9232213557182956,-6.60425678587627,0.658851469531264,-8.244477582891125,0.591756959882197,-2.067754816446774,1.9531893335069306,-0.6436344066232955,-0.5724914979187048,-7.538630084030116,-9.554195197259943,6.387192926356036,9.412751088210673,7.6994948436440644,-0.5129998718048867,0.652078950229793,6.887064737515914,-2.5735890551890472,-9.716432696331015,-3.8325654876995996,-4.281157900252794,8.118346757412272,0.87919739300232,-4.4380635199300755,-6.6273196940694,1.8462442595120052,-7.683904040630871,-8.331269044420084,9.461196528321636,-0.020470801582440856,-1.1111978570031056,7.032988980935318,3.316765212870676,-0.6515789711667974,5.3314020814836525,3.17545581003564,-8.618375600065722,-1.7250921116216347,-2.725759863910837,3.169566014776919,-9.143992420186255,6.30028178138771,-8.831461240043419,-8.489816298434576,-8.65338047626687,-3.7563337438399413,-6.847533360625122,-5.234915814821313,2.090205346729439,-1.7477433046221726,9.911335479349724,-1.4783767586835062,-5.4677543462300715,-2.4405667277893572,-1.4355082319937118,6.3728373543431935,7.656342123805665,0.08412345397652565,-4.9732602103882595,-4.730416099028534,9.04464089564118,-3.7547227034104935,9.51040083124105,4.892539597103962,-6.219077382955773,4.482332164220573,-7.742497105255981,-6.084894457318399,-1.4909189655947053,7.314860197786114,8.226916619915915,2.3116502491571467,5.632971191290528,-6.018708279211449,-4.7190630183911475,8.440972765767043,-6.697856588995341,-1.5903683124564783,-3.9446028156328605,1.7256408590802952,1.4638025973603774,2.412071280226007,5.015535670710607,-5.861715868721409,-0.421572453947082,-4.521123143673109,-4.710890219837265,7.147174047674405,8.335093577323217,-7.116814890496435,3.0667030300175835,-6.775122204041724,0.47156085360949973,-1.6466538298312638,-9.840474184961003,-1.685847663472666,-0.5530141303679805,-3.903675693458437,-9.357878425656923,0.819036980204384,1.2526395030268453,-8.137399436008002,5.339235895575705,-5.606803787407206,0.2378284755003115,8.34351781863759,-0.8574101964468905,4.475599602041417,-2.100548985497146,0.027742161292959366,4.746607588071976,8.19116494972608,-3.138934469512913,-9.90266320964638,4.429110802601862,-9.447807137509265,6.133441732956335,-6.85856989105365,5.663279054455117,-7.21345876309647,-6.4347348414181305,-4.511392579906128,4.737226888706218,6.478912624360916,1.9182522921209344,-9.13691168191129,5.022591634861042,1.0828280950760458,7.042419781501049,1.1331179097272468,4.270952121883461,0.02184772491295206,9.480823752429629,-5.152505538062027,-9.542103589848034,-3.5880291843714174,3.143003216572655,2.3860456964064305,-6.302471134714955,-8.992971574932467,-2.7234197283722983,-7.714736966197369,-3.147960760171169,-8.352371256076125,-9.606689321852201,6.662814651209988,0.6252276516570632,5.0053785440638965,-7.504029850341154,-9.949187120960573,-2.019609690961315,-3.038812643055495,-6.040072128885066,4.662568746275513,9.2191728507104,-1.3610431591041774,6.850482731459664,8.10377185609098,-4.279759690339318,-3.8805620390574536,-2.6553929616872862,-1.503642950525057,-3.414045099955967,2.0394227196677583,7.9231578278584855,1.0093356887482052,6.894039371206652,-0.8785311672897222,7.820976948363043,-7.383816190734778,7.444561463100104,6.887898688705441,-5.113900104157958,-9.126224417904538,6.394929609808532,-4.63016760678943,7.132008211579599,-0.1720724258903772,2.886347563351981,5.9979261978701714,-3.8961942952287876,-4.583312906303116,3.387365488927273,7.4974222070830905,7.495634134222961,-5.759035967409809,1.9654590696755836,2.4925276238793046,8.134387975731109,-6.497378583415698,9.815126865756696,6.900915754267775,-6.3192506295641016,-8.469690199018798,-5.897054316381922,1.2405685758571305,-5.2267272835280965,-6.65504232660044,0.4535108691862355,-9.730856117478265,5.748982578959287,0.024790878556268936,4.3714525608582555,0.5571767457311552,-2.9274263298598324,2.3294547046181755,9.312840927107736,1.6787967847592888,-0.66257811072321,-3.9814954094706856,-9.288083126756725,0.19975393641254335,0.07366390249485733,-6.5368396497086545,8.258431251695889,-6.065426569570169,9.491806256246033,0.17524704073942132,9.857362852281746,-3.989215592263311,9.15885736024353,2.425024001138736,-9.897327062906477,3.948944314892632,-0.809859454131372,-0.5693466291093774,1.8405603105584856,1.306172137838594,2.6537698810151156,3.9211155310412416,-6.04474312994892,5.658537203156428,9.153611191699909,0.13010620907515502,-0.6363928849798572,6.505561019174415,4.747165880653013,1.4542847556696046,7.899715256321649,1.8344371371912018,-7.839543527928945,-1.214060313395029,-8.035867223840295,-8.36387494412406,4.352237471875142,-5.887814557829341,0.6752822236639755,7.528778240559021,1.102710749839769,-4.6614817954779975,2.7104424265644766,7.539309474710695,-9.751548946331257,2.1103552950744664,6.809701313681838,-4.656123295546228,2.8695510129574764,-0.09585477523541108,-6.4011721449321035,0.44407626356017005,-4.677368219464633,4.859331609872779,2.7575888848277774,-5.032861111892339,6.833643995561051,-0.42388364439391424,5.840389255618007,-1.1207653252263547,-7.54039073365695,-1.1594701175109599,-2.0215123995596995,6.914552839355331,-1.9179427870785837,-2.4060059698510106,8.099333733576731,4.14191441014475,-0.03893559671147884,3.8224697355129287,4.90498471525016,6.586825017574881,-3.908143785841882,-4.263589240434782,3.461866077062483,6.576911641602415,-3.598345816560369,-5.707611691682715,2.05528229929131,3.4522463912512933,-4.581729987033585,-9.427941079937042,-2.633839570142693,0.19584083142511588,9.294717880419924,7.897805041015591,-8.60288543856945,7.136918998784644,6.314220292425507,0.3327895349710843,9.940611883238425,-1.766402055008033,-4.4011239152305714,-5.105679809341654,7.787142445546532,0.8649951509005138,6.173840319822741,4.33020411744328,2.3389919631402236,5.244157896455368,-1.0068332111497789,-6.073737598466407,-0.30226999100164775,-3.985782328190428,-6.918871159164266,-8.413099124787813,6.961330622841743,1.054169689827038,-2.8004250538773334,-5.682650272743213,-6.670371062658189,3.69800939450084,-3.544872494413438,-3.175352789000998,0.14624045164245558,3.158231782201945,7.105379587077216,-6.30267372015501,3.9528105584998876,6.075454895389427,3.350505104097685,9.940983329806148,6.723375237799477,-4.927280739552642,5.87762943130322,-1.179320352371791,-8.620739499200267,-4.703569926524431,-3.58049209360614,-4.165226365650541,-2.468163624813169,3.1450610441505944,1.887808108150475,-8.32410756470582,-6.99032846403187,-4.936078625940388,-1.1551357407682659,6.198866247216426,7.499871558646028,-4.628375695908753,3.409802049224261,2.3924112529224306,-8.759887890416284,8.96025581709075,-5.544256254527555,3.4865684804739683,-0.9834377250905835,6.33193465933925,-3.266030576013055,2.1768072104524485,4.800170505408596,6.212275211284819,0.9581899958634956,-3.6215270023461787,-9.740759826734049,-0.19445004598896176,7.734006014528578,1.5393048236162343,-5.075617131131711,-1.6960721505279341,6.588728875966424,-6.320126456314368,-9.436950280481211,6.741584621607242,-1.0736029646810863,0.8772980997588284,-2.531539421190576,2.5887554127109667,-1.380450228824861,0.06317625060551535,2.711602493294336,-8.579845898193646,3.0823063233019177,-1.1583265693835934,6.643888984721311,-7.380128722415682,-1.8630633396957386,-7.287263599619842,-4.705270818676581,-9.64456645582656,9.845109855030493,-6.493984172427356,-4.463760917021107,-3.5792225214342377,2.497897638493667,-8.664028356275505,-5.710084739828152,-2.6475492009591495,-9.109123457237356,9.630894064393942,-5.380157878274483,-8.899803022790902,5.6438055008375265,0.10291671325878937,-3.707439571409239,1.7479534874587586,-0.8911543685961387,5.7459079558136406,-4.96376846101759,0.25581037188810996,-2.6271043166406427,-4.683005420123325,3.7855671817264316,-7.436456377462699,-4.160131062903836,1.7112717441041845,4.59882450694959,4.9596167043823325,8.934334922391649,8.778631328375305,5.149837482438233,7.843465161265154,-7.741660945268691,0.3100668333467418,-4.366010144041925,4.6850489554956365,-9.794611234552054,0.7491345398462279,4.586829469226249,-7.782346913114844,-0.8285106690530561,8.305516936987274,6.826261763132763,1.0163036736779851,3.1232978229272934,4.798050166681914,3.2470159904055187,-7.791904697299024,5.1910890821219,-9.63413487864193,-0.015190628883367197,-3.90879193242891,-7.303501076867853,9.990960234137042,8.664226590049214,-4.714908009757868,-4.981685634382953,-5.279820098113808,6.140229707046778,-6.066022695388695,-4.0260582152270175,-8.374836334297155,-7.261670268857596,7.4405348716620665,7.7547631940588815,-4.625584811020609,-4.322491181199397,0.8329179316506661,-5.998632207023125,5.430356611113787,9.984470894185534,-0.46018415027050175,-3.781341947959884,5.513951670774402,7.370382355957943,-2.878154262781032,2.670851789429051,0.3495147098223548,5.049020901054945,-4.432328456365289,-8.988812239681918,9.862366579461419,-7.682645162543635,8.235341763536454,-0.6662512311616009,2.460353979964909,-4.414892029125572,-5.716015035637634,-8.153482684232376,-7.32411989730871,4.845794068523883,5.8712684383067035,4.347417653516722,1.02942102690883,9.409896526962918,-7.848347897172623,-3.580276950079564,-1.6326831187311655,-9.257997863091298,6.902851905587472,-6.086703233821673,-3.3017980860936325,4.474145397347936,1.853113259457345,9.986224604709445,3.4791055777888467,-1.4010097765254734,8.453934215871229,-9.52773032555131,-5.2936644767702745,3.5528781514379126,-3.896908721862573,-8.727334736469427,-9.200701096788402,5.803531322374273,-1.4462042414154155,-1.7074134027861554,-4.9404679674080665,-9.213282845366075,-5.028140303242927,-9.164382591518176,3.2344147492866995,-7.205192689759516,6.525822869976089,9.104958994881244,-1.3582719195193746,-5.034025958178607,-8.639130409594063,-7.681260255713616,4.111178651131269,-3.2083703285918874,3.8362613941237456,-5.079092040136115,6.579354586536983,-1.061544608559938,-1.0798745686048292,4.228411664754294,6.359594946901758,8.52530352397649,4.036711696159777,5.785172582206734,0.6026113764005139,8.369784136430862,3.0780837552875298,-5.162077723047638,4.16076235962306,4.859992932630535,6.432718028233829,6.745300139558822,9.3530436287198,9.814180633331727,-7.135006131469539,7.226935949261719,-7.236171773321467,0.15735920915802026,-3.557940114561462,-4.814984204375943,-1.1534790401595139,9.242969367567738,-9.330069023397964,-3.7754064783999697,-4.652731158566952,5.082138598548411,-4.704181627802613,-5.708833241237179,4.323896003101098,1.4067480775276842,-4.6141830527944405,-8.208019896208253,-1.1418277750917305,-3.566949478594985,9.148410992730941,3.4928049439688724,-5.178522115777908,2.2980576715565135,-2.935858921724903,3.3531461363512136,4.598666420768307,-8.454675309150744,6.048623164998247,-4.073427160575083,-7.112059858436557,-2.775345822547801,6.9926915971678625,5.012223286247238,0.9045107391318119,-5.825667471804299,-1.7198348350225388,0.6637096851557711,-4.583088355730673,-5.803148795521715,-3.944343413655469,3.7667214718153286,6.4099188705972665,3.8026951936977493,-1.3782490865421249,8.55365632730657,6.723786387401617,7.368452237778126,9.595971370670064,-9.957304411390062,-3.2418439474883876,4.428892512718537,8.241491317360566,1.0200262777595093,-3.7999149321963133,4.245544074081376,8.995753689225584,-4.127737977026502,2.2833044374329816,9.928707283562094,9.758859591024152,9.35077567333039,-9.57022891609746,9.996692465491044,-2.4243260182509863,-7.7795684592526015,-3.2110545045204297,-1.2982803175307378,4.918731773008638,2.401479107236714,-1.0636416180749073,-9.384355043930306,-2.1917719361840193,-7.025299318186478,8.1308698840615,-5.562013866751863,-4.09901084797653,-0.6847165268016973,7.539583252422251,-2.9159361122534744,-6.499849595619627,-6.650885067688348,0.23104725664443748,-0.016997845204969053,0.0034653689989117,-6.81331163155003,-0.7145424910301621,-7.925424197444384,-3.2226275336798382,-1.2609142719491029,-8.167033330533373,-7.808583669499782,-7.041521864346549,-8.525750224463632,5.804255377078613,-3.6138372303114874,9.913081598089732,-9.543870457800896,-8.060414711002078,-2.190143057806684,-7.86135267699124,-6.241794521323456,5.182168848786844,7.405563243922714,-9.920421190793004,2.791317006585823,2.9539876428910627,-9.7854423945607,-6.911620787587869,6.135039346362117,-8.358347215519526,-4.5012935118468755,7.409949439226185,-2.225606649334142,9.252239151700657,5.415216043681186,-0.22067214418409087,-6.867472769738745,-7.656234508043536,-3.130626607010547,6.565668176289989,-3.92585600496842,-8.853955332689223,-0.8173243472266698,2.198123560460248,7.631548183516795,5.933106831628638,-9.238209339364047,-7.884940082289371,-1.0129538446271766,9.426207451475456,1.493110987810308,1.3488761065714083,2.0810093500356963,-3.5749718854022428,4.4418753257235934,8.293852297831094,4.376381457683941,-8.388521506559012,6.984973729316923,-1.3624311170072154,2.1883686404050415,-9.67581722440249,-5.980284292583575,8.100070154223218,-0.6858364707513829,-6.75303300003296,3.2241143882006984,9.202048734528738,-5.490082380797996,4.548888895380072,5.938013129171292,-2.317529582852238,5.778516649119162,-8.870026141712843,1.4765336885463896,-1.0874262905533083,9.418346013170243,-2.4757127123115286,-0.7362695162057555,-4.2292722869094135,-8.049032779687732,8.592213856353599,5.098477641192147,0.45724439011213036,-8.903173249514111,3.707901538590125,-0.291415100124496,-4.808350543819171,-4.997061732998778,4.964744531180756,8.511397433674421,-5.256648921074469,8.754855937771229,-2.8562308343882714,4.259709016693623,9.742739829572127,-2.7309037208650944,-6.60598354274319,-0.45573271991528586,5.695689278818424,9.647796101361937,-4.0348376657733676,4.615114960824709,-4.815081709789739,-8.880394493014512,-7.790697294540654,-3.6090181789743525,5.8049130602715096,7.1569230842215426,2.042885483107341,-3.1609316772044105,7.422309600182931,2.4047172437820628,5.229899131100746,-6.743389349389655,-1.7357204816009961,3.472955731275107,5.578760847543688,-7.781795417906308,2.7687969956735614,2.6638562713126355,1.5473871466662281,7.6148405470939515,4.7152405014267895,-5.763573921962277,-5.95613240329981,-0.7964593460348404,0.9848498371568137,0.01844099574367064,-4.217415713214856,-0.38308872010354733,3.8859527120602735,-4.061013773527917,0.6071374758147172,1.271995519674416,-3.6533402142779092,0.1051406374220143,9.69138149279605,2.3642538978937075,-2.7680986851091927,-1.4327425786999157,-6.83345523399387,1.4126560159722423,5.256546783431411,-5.624845745830842,-7.107113235391163,2.0080859485245828,7.971968662968795,-9.10298005610436,-1.3111324879868036,1.9470549606373844,-8.206117984813064,-3.447248493497397,6.949677548520516,-6.438774889663441,-4.254287328625854,4.157135934796393,-9.873789152899084,-1.153119126095742,5.45594151144304,3.8986023238885625,-5.6202245723509225,2.779467434831556,-7.027401322779632,-9.197079312864368,6.441446892967264,-3.848180924608484,-1.2507099032516642,2.9130860750857224,-1.0376681736652813,-7.121968114384809,2.49466134528609,5.528692635226701,-6.82475824928884,3.912338959549807,-2.4875734366544178,1.1124434087374713,-3.441385468162106,-1.108308672586812,-3.369010603984557,6.50658379587972,-0.37125559592563917,3.5249995577757876,9.019908874823926,2.3432098621422615,9.073607261968139,8.55398183692742,0.05463547115994949,-9.72739631492428,-5.657797256705814,9.972042295838822,-0.2966551810208884,-5.563933457471486,-8.740136460107507,8.922395395735471,-6.721471788215219,3.8779448718075784,1.5654436272552186,9.178594747371022,5.0301886850305735,-4.615330759790592,8.541354106750923,6.224935442654626,-4.148981007342751,-6.678549661831963,1.4684592423581897,3.0695146880389768,-4.188116028459805,9.663382373759717,-1.8361517263486338,-9.860414043824335,5.941826466528433,-6.83487082953512,5.696595383909649,0.2503777992689784,9.229345197625424,-8.256438026554846,9.537829649087527,7.821682534328438,0.7408883628702476,-6.050298983330409,-2.0660844819304724,2.9177944585452664,-6.823220925714915,7.157824766630355,5.400967842883713,-3.7312765655677627,-0.8171963020059891,-3.893783212524884,-3.543879261901459,-7.435591864357716,0.6846395399066729,-7.348094554055069,-8.004463144725484,-4.672225146034696,-8.88672437883644,-0.736445241991861,3.1954273868716]}
},{}],72:[function(require,module,exports){
module.exports={"v":[0.48203217908875073,1.3070220087242563,1.4024559383258617,1.2618261110320326,1.0703177280845768,0.47275125928494566,1.4921114637775137,0.11280693040239376,1.7805789154953025,1.047195411841499,1.1851448334608023,1.109393715052577,1.8871609168066068,0.8220089820272793,1.8364718090163188,0.9442444354048347,0.307875619032834,1.7689827068354091,1.1389854960747567,1.5039264233930414,0.8773370745785232,1.127795586188597,1.4915430672810137,1.015618271434687,1.1861060438281519,1.704070448135727,0.8601405869868217,0.2915247398837506,1.4687191738803214,1.452285503765419,1.7351321852438715,0.7913547271096797,1.366215872670982,0.5070511293482403,1.021812447219435,0.32637196271674496,0.9218183929660975,0.059595776719044924,1.25083808517553,0.10533143355239316,1.3308925038154236,0.9098431588829485,1.2615505811561945,0.7842770794502698,1.5674656381008951,1.1282797852033437,0.8128766615980338,0.4324669199777311,1.1114536606966259,1.4930039250859344,0.4933281808349377,1.7844129565024134,0.4353430608667499,0.340015290156384,0.2443135741367879,1.7234283502223122,1.5127043930499569,0.34559416087994865,1.9587279658153958,1.6010730300611766,1.094538362589124,1.9080409718045312,0.5580740194471421,0.17216643985394997,1.8818607042248545,1.0677656201428753,1.4567692191929016,0.7297697016839528,1.7229340163352806,1.688469117279118,0.9361058289756885,0.5374331815934168,1.6282241666934936,0.9298638598582771,0.1720688545994613,1.208626441614355,1.8734835011001056,0.47060005634038227,1.3259426224133954,0.8393935069880967,0.21437454678989054,0.6970420996037769,1.3308696871648196,1.6606688614887446,0.8887069536986587,1.7110127607229537,1.8618392347382215,0.7182594098111319,1.147726458545577,1.898967151299535,0.3943331531593621,1.2096425152996169,0.2125261577611508,1.6658907906277944,0.2050672522355783,0.7900148352329355,1.5432575447780925,0.31787360945525567,0.37092304915394436,0.17823815837772994,0.7215559685645063,1.1360455085992003,0.21428242715772905,0.881424660700385,1.21590898195426,1.6834361888275313,1.2493049031444068,0.8458553534858635,1.9190487180520934,0.7472300029205337,0.19206030165765187,1.5767296601507357,1.469126805366174,0.2796033598181329,0.6999138150835327,1.8428252765322481,1.607562140248214,0.24519064353064834,0.6028256774505181,0.15810908828640224,0.9093594092328043,0.5343416281211808,1.764517459636303,0.6222590698211872,1.8562724706526645,1.9084041718116702,1.5709865339716318,1.7347298725602247,1.0578188523534502,0.33280375671396856,0.6273845129145013,1.9414494894168177,0.7626695942771922,1.6660196730436385,1.6120587343987554,0.4453982171758879,0.6959577907606254,0.9998325289465972,0.17262977754006403,0.6387787022770812,1.267099098908664,0.962164157293103,1.021778918017688,0.6053146237034994,0.05945453501693976,1.2990877223554063,0.9303728165791894,1.5679292224877703,0.7228345847265207,1.659986336288417,1.5977740163140655,1.0616493213252873,0.4222348099751345,0.6956389633735993,0.3995323436896303,0.24516161540117842,0.59159795637468,0.15399907196680962,0.10753766395000985,0.6637597675982003,1.4769877027887968,0.9444239947991804,0.8464588954980745,1.614598266587528,1.9278080338297645,0.6872111359676167,0.969830195221733,1.4385659170717728,1.0345113284952223,0.3449378108065799,0.8690159769516819,1.4330270234417735,1.6770387070394168,0.5553863153131986,0.47149314488304706,0.6712501953380166,1.306079665383685,1.1189523362007536,1.998911544587315,0.6949476807641446,0.9570956989923189,1.4357833344499582,0.9039767713103508,0.5068353896749396,1.683171326451924,1.316032043020301,0.08129372931153522,0.8527906552278277,0.47120095657027417,1.5566160616740463,0.9146231139853134,1.013597564971707,1.5853434815975387,1.52308970612367,0.5573105737121269,0.6000849682834337,1.1530933552445535,0.8336541343614177,0.37180205826949564,0.6329474483449276,0.12076463703405871,0.38580003399229845,0.5574738472562295,0.7445994282118171,0.20135476126816787,1.8063720010103816,1.1592661212002033,1.6972724330178801,0.5967769390071691,0.504707684468559,0.5467384671637605,0.2521472187830862,0.7264324556610173,0.4527535399659901,0.7012241441126115,0.27697977765260484,1.958734705732709,1.3213212354803345,0.6320968134251728,0.08407415535834284,1.5892758882464135,0.298500207860775,1.8221568633930638,0.3767056672747948,0.6686520093007791,1.6327521297870375,0.5782910374919221,0.011199865332017112,1.789077386297628,1.8293676520984028,1.3068013746426312,1.1136645888861256,0.7243228941200242,1.2395271483632357,0.42873552844434126,0.5151576969805345,0.06538421289376473,1.3042261559065245,0.2582897726460547,1.9831657295873342,0.8392146063857666,1.1256994404158318,1.728192320822982,0.8405891280198863,1.2617740219146167,0.37517662002734964,0.6111641235438965,0.9554469117767521,1.4579476252641155,1.4224156965464512,0.7755210717866152,1.873150903466891,1.5161380806475226,0.4158512158726695,0.31867938359986425,0.5283826629333448,1.3876564846428199,1.4990910613027557,0.9099136125203917,1.7669570426213657,1.3410635577790355,0.22886608463064473,0.5660658675217629,1.071223005810407,1.9700532192271818,1.1822588705848234,0.6464906779897488,1.652755934302565,0.0299872702198285,0.2607533272684286,0.23739569492464652,1.2565907795886884,1.5277562073579238,1.3969333656011833,1.7680895420219134,1.9663292818411433,0.5999267894557998,0.1571067160020294,0.404181683946665,1.6351171197995558,1.6831657921844667,0.7072221478999565,1.3009881024278855,0.28795327434149387,0.6677153136558429,0.5398051588129733,1.91287139348057,0.32460491510149625,1.0294975312344063,1.4541871365198622,1.7570896061714891,0.33585896562546935,0.6377680695679855,0.35822194375439675,1.6793179154045794,0.6459046062640725,0.9031557756271829,1.750503949687869,1.281045869722191,0.26512916949385223,1.5590110165611932,1.3720152341499658,0.6566916915490806,0.9331505714150685,1.5369335213591637,1.210015306370679,0.6466562661307385,0.3362573661928421,0.7127351742944055,0.25927397614284287,1.1627811335751566,1.8521508829940356,0.24521971687775856,0.9505772451022643,1.5116943075454539,1.262285002069341,0.37349735788418315,1.897811481834267,1.1234863000098954,1.7642372058813782,0.28400894958278,1.2091045296622087,0.06364905212908623,1.177452004303794,1.7288612733642732,0.5082678516639603,0.3721866735366417,0.8633219487634123,1.9116456389535172,1.7684063357530757,0.2216391909949409,1.5124955553973765,0.6129449111303069,1.3167784470607167,0.6882897742015488,1.1688837962706722,1.0256435745832126,0.16601993518695846,0.626582844605478,1.1935504965763934,0.8036892008953918,1.9158919704671682,0.008579929602036795,0.10839374739674446,1.7977170376110192,1.7847813624967208,1.226293477776609,1.8089136298488748,1.1839865425932006,1.831547993351903,0.74898237742799,1.8207433581163608,0.7342193232176881,1.3684249527443284,0.06715239560154584,0.06886327712977547,1.660484495048808,0.7749475310034253,1.2891746626787484,1.8029169347710607,0.7460453059073071,1.8068478183841834,1.8964761893116324,1.2569211649243397,1.042063814431979,0.2923871407585992,0.2816696997531376,1.4924085259287123,1.3185400448430178,1.3348988120778391,0.918860007548782,0.31827538190294913,0.40198974591865966,0.8283489090056362,1.135501571992887,1.8856762834916991,1.8045259738389183,0.993819665383116,1.8171674029290674,1.6192453321572562,1.0900808341854837,1.4700791033689335,1.4135476372149727,0.8209260822909941,0.2266047004559515,0.3452415994363385,0.005026896628993249,0.08384528203286346,1.3108576900718782,0.5570197174200788,0.611551174047122,0.16463160241482733,1.7040483532699486,1.436057140944064,0.9997443433945983,0.7330158851632986,1.2740880413064306,1.9904692667450443,0.7647037562523264,0.0591035619263538,0.24454765234775477,1.2781434794231958,0.9119144263331131,1.3327408152168618,1.6738642114761824,0.7482205746834172,1.7409312029395099,1.0557608328767936,1.7766873934682712,1.318015953335221,1.719727130784459,1.1150944165189771,0.6209331903989681,1.0327837646592921,0.6443099386368552,1.451405156832862,1.0710915584439742,1.7668797252457846,1.1970108381270843,0.2088797283318362,0.5064348523053943,0.4067936321479979,1.2467544445088627,0.5753999231740843,0.7865478040600449,0.8654148405666064,1.6812737741391177,0.40122734002311544,1.0683051982111746,0.4812367559512878,0.4259169975398698,1.0630491286327763,0.16712179598417176,1.6192190185832853,0.7196087994531584,0.7654570928335147,1.1471083631220838,1.500731869159953,0.6883790213420125,0.8787407065163286,0.6390992859956897,1.447452837114783,1.0630846028157577,1.2326505680124038,0.5478682114084945,1.1497312830395154,0.8392632911858855,1.9525704272791744,1.057568231933379,1.6603478718398579,1.0917176476494403,0.09083874029293737,1.0311679315630293,0.5022606146204547,1.06348514924691,0.0030171632893942757,0.4540849932055031,0.6533271853163791,0.09569948148424157,0.31877783794188286,1.3441519068889924,1.1895288985439922,0.5097624236036173,1.1664883018705536,1.1418777010855123,1.9662426903868289,1.2785271945808776,1.8147883919662835,0.32722199362673177,0.7531506415991664,0.9693816572622227,0.6317498892280207,0.7722443835718829,1.4298696642264983,1.990197387255345,1.7795168661339815,0.11204345602129662,0.853856635045597,1.60959054277426,0.8059277141697283,1.7063899590287828,0.9763129879980683,1.7018770394944962,1.1673075445099461,1.0584417924646443,1.498016829662344,1.9315385428316647,1.1061596381135073,0.14683650566329964,0.8035763961144493,1.4836236433322982,0.8359039841686813,1.7720470899953171,1.3725849178505292,1.1357410212570915,0.4070483713331736,0.37041813504185095,1.060973524422487,1.8395228815296778,0.40195294014659355,0.4765077236573352,1.2876511544641378,0.9291175605007402,0.8303770581806025,1.8037252357402593,1.9898293575344819,1.0461807541063433,1.33656441925555,0.9313369204298483,1.4561109236050584,0.22304302716808166,1.899980439969433,0.8422259001616927,1.329108830113522,1.4058018097228313,0.005764395907839948,1.9763268367574796,0.8227788138507726,0.5042044140433442,0.45612283702489753,0.7650216520462423,1.6839512436426607,1.4804279352904017,1.7513932674844463,1.8756303329055686,0.8836689926478982,0.6268598559013876,1.409672996174046,1.268947225507564,1.3922223513155503,0.3568600224246721,0.22512587711272536,1.7699815847193339,1.4459565171222488,0.3079450713387515,0.4077789740261011,1.8974226088841082,0.6717887022398767,0.6579025781435051,0.09176453987746447,1.7703261507407073,0.11968032629594294,1.6748493668386355,1.5704566017782189,0.5625067607609333,0.5783744246501614,0.1947883513284121,1.0379224567123657,0.37346747846629436,0.4118739045465323,1.7204159645643173,0.5711890951054075,1.9323938037658577,0.4685152332636551,1.874785630145543,0.09360134004558951,0.232322160204665,0.6351797750025083,0.49782916438826685,1.7104939267924535,1.8764155746631714,1.2869235036440325,1.047890916128424,1.1506317555199703,0.10934444671880339,0.5614331891912006,0.3534292248722086,1.0663776983710802,1.798151270136009,0.9006182686776323,0.024487381324368673,1.99985045185697,1.430493134310792,0.7081018883040939,0.13849671667887486,1.4382142951162176,1.557572523833858,1.834392225969355,1.646755436078514,1.1009019189196647,0.47815732842391245,0.9479485040877424,1.7364730612277746,0.8642899368734236,0.8702173767743653,0.3035725332964696,1.1623636845322527,0.69033163086586,1.1873588146882041,1.9811836630130104,0.735042593852131,1.1848171699887318,1.671149878483353,1.32951260388747,0.8457765931758501,0.0692839096454092,1.850506653328305,1.4385722023446794,0.8513891686858344,1.9679742373162,0.9619912365264498,0.24720117085153737,1.7110461934455445,0.4361745735597582,1.4156130251589638,0.3163383496220815,0.07129087404234413,1.5198478173226828,1.1239433492627855,1.05112911014443,1.8553885068275213,1.072653727570216,0.18891685236513522,0.9712666393137663,0.4240216425620442,1.9089785026142083,1.6347495110381618,1.3424542578803824,0.036615115605679094,1.2454052206104547,1.8271833271630773,0.8173947555878907,0.46470925172182564,1.6659533021752404,0.020500912080094302,1.6714089832390493,0.9226045001142662,1.5155481157936266,0.05173256322866937,1.334514161908725,1.1302275572304024,1.483207930600678,0.3349735620597549,1.0456151790973922,0.08226508162294977,1.2705676788349627,1.3447392362870305,0.5724533992063905,0.2364151467981208,0.7317619428704774,0.06356998471011055,0.7858730860574177,0.7216131943430311,0.4708827784995293,1.1831894833123489,0.7102872782753029,0.00308343869431571,1.9358398465598188,1.4805150193488186,0.6670193641254865,0.9767686373167379,0.17030956795774355,0.7248147215666116,0.5330522708669951,0.1522642061999191,0.7692060455982799,1.173807293782922,0.6987046998436286,1.4376037517401712,1.4986409825181135,0.6323164014706206,1.4145873388752248,0.6363245410119887,1.38757897276977,0.1710488010580491,0.16167669490658376,0.0916215091678203,0.23982864815009242,0.7933494681804292,0.20992826465847125,1.728736979187211,0.395719291181829,1.1887232152542366,1.9298544625062388,1.704980788715932,0.7797403299086962,0.28423141273198826,1.9619388753243268,0.11030502664933417,1.693198467547774,0.9460112344189375,1.1385160681011737,0.6935942660169654,1.571225045841,0.5504860298428809,1.9113834407203845,1.199655002239898,0.9206469820174519,1.5474673670841184,1.7880815362172218,1.2064876627592627,1.203349782970358,0.11050254466986198,0.5003040993572605,0.6804050939304735,0.43969321833811836,0.5733259754179332,0.0135329827576669,1.8533008552770087,0.004435934250476947,0.6014049507098429,0.17702346372406774,1.8651201317009196,1.5942683036035308,0.7506663193556085,0.29725837324154814,1.725124511495863,0.4919369848831887,1.4033568536290444,0.18851160367740682,1.7241487378890965,0.8227651531091009,0.2326957624128987,1.8576419372775441,1.4155467185263024,0.24985348314123845,0.7401459014473484,0.10419079607060944,1.5522082974070148,0.03828457087154691,0.7112647570652975,0.8125133292755158,1.698074341934511,1.2545857478651885,1.845641000647503,0.8259065885744454,0.27754468184028447,1.3296152132320178,0.9074348557678253,0.8248309020216773,0.9827615912446936,1.2224113956972755,1.994378190181048,0.4569747534933075,1.4187214238421353,0.5401315729425238,0.9168794467296371,1.7014086294557873,0.9657290711018431,1.9664795270617472,0.9311454710384512,1.0300394673462425,0.46390434889537646,0.6381232772030034,1.0052432006096956,0.8042841315404488,0.7968226359249626,0.1513985869467147,0.17117653822249324,0.5550352453641909,1.069375441704631,1.7550762836395393,1.273092907738234,1.376250299452158,1.1160573965135177,1.7900501119528043,1.4426414947823512,0.8099000586341569,0.805207497548313,0.6678138550981507,1.944046595505506,0.6332865719245513,1.839349727092178,1.4729454106714521,1.2932851830647842,0.28891685886238516,1.7550852423647636,1.6638968392472653,0.4503965358232782,1.1324745157817446,1.5610876255295754,1.8742131201272971,1.9572850073039434,1.9535175894899481,0.7681807336396878,1.793185254234785,0.2384821127574983,1.3237532680713557,0.3151525063469163,0.8613815653393004,0.5891468728671896,0.013543515681512908,1.492685644162754,1.0814236360087977,1.1759908748136683,0.9258534434755012,0.7451612114455846,0.8074899176298636,0.3367551471766119,1.4494949278138285,1.1134473417631563,0.7679127139700559,0.7669668323770584,1.416469417428078,0.04927419779289455,0.40099836081445117,0.7489990897570991,1.885739624048076,0.26819735459205374,1.7351783173442432,0.08287479893892868,1.0518538433459494,0.5686568308228508,0.4210815099827445,1.0219591833997468,1.5511682944850707,1.8465123964598282,0.2784035137950296,0.0410983592080858,1.8617643455271877,1.899112933428503,1.4290748626339504,1.2930883586680149,0.7337372326658067,0.2265622139189909,1.909569183665464,1.7224084817901675,1.9914826816293756,0.5097107548801727,0.049940076349472395,0.2907307909435213,0.04998035984017202,1.8857721523744093,0.296164746702404,1.4285644411773037,0.5455534451846806,0.36974426457032994,1.4957818658291453,1.513775537918598,0.8056537421280621,0.44473421378404243,0.05427229373841458,1.6627247793870659,1.391567038715162,1.6995608201289492,1.7573226541172255,0.7896527738486836,0.7014475663243918,0.8108208548056792,0.9776866132291198,1.4749138560812902,0.1441085347280815,0.6811265853147592,1.7117775613915476,0.9466781836543601,1.3960440790179662,0.2096934214799977,1.922506473775341,1.076007044904526,1.3079401177838728,1.6514146116299537,1.4500398846784939,1.810577453530322,0.5773125371303949,1.102544669635988,1.413994790752858,0.9802274506493918,0.6064228219105776,1.7256898071108169,0.012348892952938062,1.8730057577952928,1.7341473654159874,0.40305295221261606,0.7206961367753819,1.6344322318754418,1.4859715974728003,0.9614636115385027,1.589697990709014,1.109693642167437,0.6080371485885814,1.3437263971454523,1.5080385141151464,1.330963273630688,1.7740325054931239,0.07395105242952438,1.8038563964407297,0.4189405553250891,1.4920531628195688,0.668472682384714,1.2286017602295565,1.6594622843209184,0.7556444461629885,0.26082681803068963,1.0724369096508943,1.7814921621009079,1.8195150730060274,1.0200645678455236,1.3155011008232407,0.03360778341942838,1.3439727223208568,0.19763932867880252,0.5332038169827249,0.07489859746540795,1.306838561523672,0.5752929514904834,1.041064906136548,1.320093267201473,1.2042869346519098,1.9289453121084361,0.08305689756410217,0.9145126192448103,1.8786751495798026,1.2281337592745594,1.2617781184226775,0.11320285011742337,0.3278999103362539,0.22733489821831254,1.11735674906378,1.2016273803196658,1.274164877698059,1.4979195620718597,1.096371654076533,0.13992125858363247,0.8143161321836363,1.8296012724300317,0.15089919834980892,1.6988036259456258,1.6947757172857294,0.31469905615238325,1.6633795614207427,1.4200805733224593,0.7138285679761793,1.3515533225471712,1.0013464344106002,1.5456062699896402,1.7276252729213217,1.2818645168873442,0.6873769046713143,0.14922050504949969,1.2148340875902215,0.8060481802730033,0.7405731417830519,0.5864887021060752,1.9331962153805442,0.7131203216217545,1.5059399329635492,0.9356697544035937,1.7469705012015218,0.9792407936323393,1.0615937833320568,0.36277503007809564,0.5992461704080951,0.39667658517928217,0.570695930802021,1.21575706244408,1.103277760634716,0.6404734139832904,1.6512312813804262,1.875453648766828,0.7131131834869513,1.4571783340982734,0.20643571720356668,0.4587588618782932,1.4808883779208588,1.3684601861395813,0.04595981046941988,1.3893173057376194,0.9029547757064722,1.5949311046942696,0.54548678622732,0.5321950520804557,1.5893840865262896,1.8528785285684712,1.521120487857306,1.3935289155690072,1.422655744998134,1.7438424629770424,1.7162878126912746,0.4384320123006038,0.4878642160003399,1.351019827464667,1.7971884530624016,1.8661709444174162,1.6209769378676722,0.06309827738709162,1.2445661690817689,1.34773605471712,1.770987258676512,1.8177287728581453,0.7913001432812652,1.9915740645108873,1.202682314465779,1.693256679744839,1.6892542600846996,0.9767294802663073,0.7205068987632552,1.943721347649758,0.8029249679135453,0.7939599063226597,0.7687896358670647,1.8132820487264558,1.3181353716507074,1.1486446984758052,0.16229187177988846,0.4133966163524265,0.8405840973289154,1.937392423028316,1.085466298396859,0.6030813746530073,0.47234580738705434,1.0023390918471158],"expected":[-0.6358796148025541,-0.07554836261336981,-4.252740423428269,-1.9546848796435432,-2.8966431750126445,-0.5526949762510873,-0.847913900453971,-0.4803060863936942,-4.162765200652915,-2.9877425420554196,-0.026859889343208647,-0.06717047527309371,-5.010006109642745,-0.20310403994711787,-0.03199081760115367,-0.06072173461811909,-0.2141879627469221,-4.137840446874687,-2.9445059129142765,-0.46535026479125213,-3.037562201542107,-2.26806760901251,-0.23830543505482715,-2.238854160551366,-0.06129506757077221,-3.675838369079948,-2.6368160804162426,-1.4517417450349903,-0.014088214619348411,-3.037732383429975,-0.07593416524627127,-0.30606897917020814,-3.688411779284999,-1.701669109464191,-2.4854217398763594,-0.18550979656576677,-2.8056189297129612,-0.8471895191074316,-1.887414015316153,-1.0609882811038955,-0.019373178784754242,-0.04576290026629387,-0.03388059212658279,-2.798993108067625,-0.5993297966022503,-2.2858580465923666,-0.05465389758540857,-1.5847100854312812,-0.0573501370500508,-0.5450614728196337,-0.13709505734243888,-2.0056578992455854,-0.17405333586666993,-1.7872164449259595,-1.277840437249282,-3.921101585845331,-3.092269056905094,-1.4011009893154125,-4.197893809379547,-0.010624527394109838,-0.04287100574848304,-4.971855456834641,-2.2464420790027035,-0.3248715611843828,-0.012975818992175566,-0.028605940394565474,-3.1578123449233266,-0.0603719520775021,-0.008510922907865632,-2.953058996230562,-0.0920616775607689,-0.1470171477392678,-3.2931847197911814,-3.164548646563245,-0.38586111802404355,-0.027570381009078118,-0.0070816527551299975,-2.188317221851003,-0.0202102292962802,-0.0528061024551906,-1.3047144407333513,-1.0024545391104887,-3.894459875746194,-0.038278987472580274,-1.8983371026660807,-1.7408146806416718,-0.10961420800544583,-0.24812948431233414,-3.043040395328765,-3.612496869795126,-0.16434838992556727,-0.025741569298058625,-0.3053391999938226,-0.05101636960486513,-0.41267093806874044,-0.06022182886326955,-2.016959743186242,-0.27168943730418166,-1.6391536207088775,-0.31436003147559644,-2.6646750707336446,-3.664500876377188,-1.2485431410465204,-2.3106366771265705,-0.03045181214126785,-0.016499209735462532,-0.026460282027691878,-0.06123089087735677,-4.891856243894017,-0.069585927354407,-0.3023846176814504,-2.493787834481288,-2.222398701471001,-1.2566598663255406,-0.20555198976158465,-0.05851332481544845,-0.0731099889426314,-1.4933143779662692,-0.09487064382037771,-0.3457951226921549,-3.092761466160422,-0.19612841708437725,-0.023629656630249816,-2.5227641965968046,-0.05592945506040725,-4.563821675869147,-4.550113645048606,-0.27424689766265736,-0.3641468684222587,-1.3994033943470274,-0.08169736426721705,-1.9803872409971701,-0.08026226892146639,-0.1100594248362158,-0.012933531274211263,-0.1919654221458458,-1.4388512914736113,-0.09656710497402139,-1.267848131596419,-1.8454217706669915,-2.7943404103423766,-0.04647097234135097,-0.08867045761535812,-0.08403104600414024,-0.5512001204995398,-0.02347867838472416,-3.043451234855061,-0.1309955532424623,-2.310480682387556,-0.018515692225714798,-4.578743052010097,-0.24508938359741275,-0.5279828329771381,-2.6042774585345905,-0.26706392062312384,-1.4747375081686767,-1.790746040703286,-1.0659276543373823,-1.027113414225563,-2.534434310587559,-1.2354546447735608,-1.1302633850226407,-0.04775919806793338,-0.012187247860281301,-4.720061441288706,-2.175316190111118,-0.10566752929659523,-0.014627305241699839,-0.049431916391672194,-0.3170481417443207,-2.376354574766343,-3.6555557854999914,-0.06570864797334178,-0.09856682473480514,-0.16853274007452226,-0.07198624756001737,-0.03225699832900739,-3.5455447331419707,-2.893724694182145,-2.752743840974884,-2.1287307090544316,-0.015834036544294293,-0.08494353124440307,-1.8404990005984732,-3.960863606120192,-0.3808315276338284,-0.9954279465676923,-0.05144079318656078,-1.9095684755644644,-0.02594792129495254,-3.0726947044640185,-3.458566568235949,-4.496578215446947,-0.012261684197730311,-0.10023496197747624,-0.10578629723201818,-1.9937132660744084,-0.11483865937795493,-1.4389354614417829,-2.590811262022802,-1.119967750025088,-0.20429432542530124,-0.8520462976728224,-0.0651738749428332,-1.3053196976703922,-0.019559205840254473,-2.4133042579990898,-1.881361865169759,-0.14863568595538876,-0.4427793717111594,-1.0253194043609357,-0.23318571394008875,-0.15054598635892572,-0.3924135441061508,-2.7527197668572088,-0.9995185047620398,-4.370716289696316,-1.5490422826511911,-2.345511760723252,-0.4746078384586977,-3.273330430599655,-1.732560385856274,-0.05241327612662022,-1.6369842421028338,-0.15595734034160671,-0.016235315107615833,-1.9696089049571923,-0.748701354896638,-2.5723478127397565,-0.007200692847662833,-2.259255330546336,-0.3678113163162268,-2.6434315079831645,-0.02588733127734645,-0.46712660230127173,-2.099098025568717,-0.9507982063768208,-0.01995792403703957,-0.37685651436404083,-4.775033915543647,-0.10400390543251173,-0.9625408466236048,-0.9241020777688067,-0.04909085207874317,-1.4605402480613634,-0.22956179972139992,-2.5393330411915147,-0.042914633813454284,-0.09051984481613504,-0.09755234866347337,-0.05989384855464213,-0.009729841857574152,-0.07356982995306163,-1.8259477923876792,-0.2432111582535687,-1.724417943415979,-3.548306930149451,-4.201185019108024,-1.532831571980029,-3.303403714707606,-0.042898145777279816,-1.443548305970379,-2.117962171043244,-0.054446237589097876,-5.204650941294105,-0.08034105504835956,-2.6128708638051554,-4.643659142730887,-0.5901049312229718,-0.29571310080682933,-1.5340400173288355,-0.09231219422948789,-0.020655117743761043,-0.019369921558284816,-0.019582198572801097,-1.5286225772143032,-1.202869715514085,-0.44312636878760686,-0.45831215989222723,-0.017969423926990198,-0.015762856066710396,-0.19626239429558817,-2.8095135469165977,-0.24323792995382945,-0.20693817795264893,-2.20386776203541,-0.013073655822178466,-0.2357272357441628,-2.477596165195028,-0.04392542884226399,-4.636807717044903,-1.8100678702164843,-0.1037216341241726,-0.19763582059285012,-4.685141266492412,-2.473195250995343,-0.05410391455804083,-4.00683633686349,-3.574497990156736,-1.0000576899022215,-1.5601861826591918,-2.817126267726334,-0.08972111969823593,-0.04944887987487717,-0.019857981286745707,-0.060999799734776816,-1.891536708631539,-1.762981068676838,-2.621688757730603,-1.5931430725917175,-0.15027638095559576,-0.01165661407914563,-0.44950140482073164,-0.14739963560378727,-3.6525337436476417,-2.933081990366968,-0.2862032361921694,-0.02384104545138244,-0.1343840232475232,-2.3739899922148724,-0.20928613094492174,-1.6244209755691383,-0.4809620772412424,-0.11347914738711716,-2.8143999282432577,-2.2384068000724344,-0.16272760595700086,-0.10888603685816821,-3.5163504791543785,-0.009152038249404451,-1.315867319946358,-1.1649368637343875,-2.4597982093815585,-0.057702130485455715,-0.08424812546760749,-0.15538315488618,-3.1530491843064468,-0.34065056542721606,-1.9168732303469165,-0.026616094959310093,-2.929537149375653,-2.355856806038788,-0.6498754888761739,-0.42946004513731234,-0.763491457432775,-0.012924694906295938,-3.853456281526225,-4.3390259020908175,-0.10640938317336837,-3.3858254006847464,-1.3829094365664198,-0.8894103204036495,-2.581578568728695,-1.938346395326398,-0.4996493948244316,-0.9312340533385832,-0.04038300437323111,-2.6773330156764263,-2.388325064402332,-2.7810965502677747,-0.0592819034346998,-0.020865955955609465,-0.026967852459219954,-0.10287580296671761,-2.0759212924813,-1.6841853277324743,-1.6122731949437754,-2.505436206499352,-0.14697871922114747,-0.018281260038367577,-0.04266900921126132,-1.5280905202559385,-0.1909139579036599,-0.1600781517903072,-0.14943199894336015,-0.006475853311477817,-0.01327756195169976,-0.12136960553766256,-3.426779334654475,-3.770912284360286,-2.093615984386466,-0.04419541740666835,-3.3702770264057764,-0.07727126153617934,-0.36432955544554735,-1.5985157054849992,-0.6731272854314329,-0.44580592401449026,-0.5146968112575857,-2.3528784213376897,-0.26591057604273605,-1.2301365033605816,-0.19149399854122873,-2.9727349620172476,-0.054401310762875264,-2.1799093985176135,-2.0731348915170797,-4.982800225370806,-0.35751064626293433,-0.543263347628169,-0.26669801136683985,-0.5922090658351598,-2.9688326847057773,-3.57417052005775,-1.488410870123392,-0.06869856392080799,-4.838120747079189,-2.852628362495413,-3.560267336005573,-3.8329751316480944,-0.21903923125501248,-3.280087602888808,-0.14847536136004286,-0.07890736101970114,-2.4860706213322405,-4.03806830059142,-0.13567918277188293,-0.7150197605263755,-2.086516498464549,-0.35121981281998377,-0.4124047122131748,-0.1562584951482885,-0.12861676311286285,-0.09218028811326305,-2.831252635862673,-2.6221215877540716,-0.008923177732318373,-0.2820611327418973,-0.03242745971916953,-0.14150155640117804,-0.14438182892251428,-2.50865131319238,-0.3796336514366314,-0.020579898027117738,-2.048012112699614,-2.1234248741373376,-3.6074600038081295,-3.9073814491766092,-1.9556300446009978,-0.33825733127189567,-1.8407465026078023,-3.840755949795729,-3.349602138890533,-0.06667418234095504,-0.4698460753118848,-0.027763264970408763,-1.9844117340160383,-0.04194782616900181,-0.22530300215023855,-0.013205315613760038,-0.12514994728075915,-0.4216979182520536,-0.03639411253004866,-1.932197337267492,-3.334345345222733,-0.7108709808554898,-1.8253425308589808,-0.07214744683215425,-0.4108171558211308,-1.4826542862070236,-1.6826946555716646,-0.03997504308910703,-2.043055552187403,-0.024407110005961862,-0.03282688767397693,-3.6155325319190053,-3.4922852764991967,-0.04652618276558306,-1.696950918268021,-2.709871958950911,-2.625992262579532,-2.6135590838316167,-0.06093388426018797,-4.177980978570465,-5.264242969106954,-4.0934668563485985,-1.141974683264599,-0.09871884117427944,-0.018018782543146334,-1.8088023702006875,-0.05928520548409174,-1.6969572093316367,-0.0354828932846321,-0.034964883710364485,-1.1806029001502627,-0.01270176368392147,-1.662452091686764,-3.4047112443504948,-1.0984310334182292,-2.936418322289884,-0.026359093874703008,-0.2660770689943313,-0.025090174041634012,-1.4886312198552942,-3.110522625761144,-2.000953800099721,-0.45590315791336866,-0.42366988539755146,-3.677495603966947,-0.147512769834733,-0.19794005891530747,-0.040025118204289264,-0.03914260122195498,-2.7059379831777783,-4.78482709105796,-0.032316897261902885,-0.036958754453442356,-0.027815417352227634,-2.50424641933824,-4.223814981509337,-0.2549881601831368,-3.0050488573677487,-1.2041808871776332,-2.3553252080491687,-0.4622222670651801,-0.6627864588994479,-2.4962095315140425,-0.05552571104032828,-2.2738488587587358,-0.13707289935388842,-1.7529829955962848,-1.5129058011029222,-4.364484435172664,-0.013115420376636896,-3.8936058798337765,-2.445571664329068,-0.08033943512187908,-3.947230895530632,-3.7877154294319855,-0.041890628525504084,-0.20144937400163432,-1.2136987865726434,-0.22127020947505324,-4.123706134685645,-0.5227630091398898,-0.3566009490499139,-3.138710509390636,-0.09018501944769687,-1.056931881467892,-0.9908661902397335,-3.4136255008097875,-0.45212317481347786,-4.007695347509855,-0.12156300577820477,-0.1904139330429831,-0.17491347507362914,-0.2781810964858671,-0.07380458364009544,-0.37329324685761267,-0.902401944922784,-0.010231008325804378,-1.8594772004524676,-1.1850339652908093,-0.15445437128585854,-0.026725636440218414,-0.4720411033864141,-0.5179403923597699,-0.22433596775800513,-0.13428053532946688,-0.13999549600112715,-3.7742424212215067,-3.188370205075844,-1.5850076969297646,-1.4210423019938965,-0.40886908279926554,-0.13132016109911715,-1.8173623680790785,-2.7898626723088,-0.07701120541975269,-0.13596681223336846,-0.6477398440448351,-0.10115427741409086,-3.307789260338627,-2.525023607232449,-1.1338138870067271,-0.2108382670994014,-2.7657811477604684,-3.5048058514937,-0.015615661253392567,-3.319697249774431,-0.2794600206089241,-0.21471613179281074,-1.0150196731675485,-0.10456987108450978,-0.058181601760979834,-0.20275594872055527,-2.2826946292276444,-1.2641833009966037,-0.03669870517906993,-1.7668157542673435,-0.8973832140913277,-1.7385583078732516,-4.239124319919542,-0.029123983002798295,-2.796087280676819,-0.9537628689146723,-1.8847556719944119,-4.27397565158374,-2.871394682468097,-3.6389729914884987,-0.044089142455100955,-1.3100281879315299,-0.5249645734679448,-1.7403336846737072,-1.0159932431558865,-0.2069147239093404,-0.6826137543661495,-2.9035776260726913,-0.3248066991440549,-0.06316168495305925,-0.07254015682012836,-0.0332497334897582,-1.2791279442238377,-0.17218452496801884,-0.13435404820329502,-0.04647850999094054,-0.012991340532269767,-0.055017207808949496,-0.5688402523247713,-2.090467405180383,-4.939337079540303,-2.998995080776607,-0.16872618019749439,-4.303853611373972,-0.7934536548042181,-0.016312241716444322,-3.139090738292928,-0.043545272126378196,-0.5136221348123047,-0.027383721500740477,-1.9500746225314876,-4.3579362106109585,-1.5362844809744254,-0.08820810376117623,-0.8895944672880197,-0.01969760026426603,-3.9312341258709123,-0.11411339944676062,-1.3879038690962098,-0.06185944877240434,-0.9556209307080383,-0.05321400434638304,-0.06602495247263782,-1.6717630457580965,-0.04365531495455681,-0.08796459772669264,-0.7079821069074919,-3.8811503347809637,-2.7053241590769717,-0.0996266797154501,-0.1298615587450625,-1.2539774637304029,-0.06241420884181554,-0.19761947031966426,-0.3786800130167384,-2.8337789024590045,-1.8188420728749057,-2.5909955775632816,-0.05103508521110975,-2.135019090895145,-0.07941694764825326,-0.07895745190414648,-0.07653517033524249,-0.6970871706653273,-0.3021566536489308,-0.31427690894310656,-1.061694967991644,-1.491811124956871,-0.07615745678612908,-0.4025421965893225,-3.8061362134495984,-1.4549498452111924,-0.03490804542917778,-1.8892172131667397,-0.0110590867545654,-2.855775408993305,-1.2911504454027303,-2.4076586019459727,-0.664248519319062,-0.03058340328853557,-3.224051289135681,-1.3833992851661066,-2.6090620882196776,-0.018322467706881514,-1.946284015945126,-0.47525068320188685,-3.1587657395693176,-0.05308092129372185,-0.1733695342342687,-0.6451813407457909,-0.024243348844711993,-0.023220304237368608,-1.090005144259315,-0.2013208554159846,-0.09685979758810834,-0.2958553667842053,-0.09087190926768361,-0.6321096379691508,-3.857706373182702,-0.715590277602463,-0.8399468678462544,-1.3475364708945823,-3.2631259429132733,-0.013404476346431538,-0.08346838884758279,-0.708596641163103,-0.008144878799242595,-0.1651202851381545,-0.04496618848881044,-0.4015060026448137,-4.511171398452296,-2.821659369084145,-0.24664106161612118,-3.8003585876818535,-0.045730671404466745,-1.1322536080729078,-2.4380570665362473,-1.07463108621402,-0.022986453129266365,-0.5939365942028124,-0.12375597762524794,-0.6608506256059906,-1.12032025821435,-3.447865445663833,-4.0402696563861165,-1.7710606172491503,-1.2868405493530504,-3.936622117438857,-0.21422615990402116,-0.08266101997060367,-0.036516961323709726,-2.3692985062809884,-0.011873366449195297,-0.1912903910360152,-0.38973320902069136,-0.09980229668492568,-0.04470651811646929,-0.0115232787512846,-0.04097069603292451,-0.00596484874628563,-2.3569361198377368,-0.03246834668586928,-0.28265716962021215,-0.09807265155072704,-0.10805276458212681,-1.6174018352910235,-0.46380380730035886,-1.1936430400314355,-0.3795973630766472,-0.1518583205028757,-3.1465312603264173,-0.20265717191258947,-2.192522312760701,-4.060902074750329,-3.4280693551580987,-0.40736156456179246,-0.028472367080143002,-0.06738710999594875,-2.5673988634157494,-0.42238426173791205,-0.0067543183785617085,-1.314971003763994,-2.980739923215208,-3.930120906804456,-0.03254520650481564,-0.21349893159068542,-0.5129097567629566,-2.43446233027026,-1.211860060753604,-0.8448766333838313,-0.049920935633724205,-0.013289672586695948,-4.761328549764585,-0.005974724056087591,-2.644561865738808,-4.1632080487590635,-0.24518493577325043,-0.24747104947313414,-0.3843167938624152,-0.04985916674141503,-0.2194775822539829,-0.7569559301230078,-0.028136927312476884,-0.03397965078710267,-0.16882279712456577,-0.039379096932947166,-0.5900981579919479,-0.10152066148255326,-1.7881371009564004,-3.5061323837013587,-0.03851795439272309,-0.07765402677454962,-0.11117482902249272,-1.751601773333658,-0.5949115285032776,-1.8693039979533053,-0.06594990556809935,-3.520535712896327,-0.2332992863189799,-4.444114763603905,-1.0267777423843008,-0.028990946733121494,-0.08936175174202775,-0.45997458518495493,-2.89809894723413,-0.0974874931927493,-0.33954370101883635,-1.337716764356951,-0.5374858730947072,-5.001106164303907,-4.915842650354928,-3.90361454026922,-1.3283729106398678,-2.0071341969444916,-0.29520419381767954,-0.01014013539243757,-0.027315992500986198,-0.009604694816217759,-2.148967903975796,-0.884667389540722,-0.2079654037530964,-0.8627523434516465,-3.270155835071052,-1.3074767284805824,-4.036724302697986,-2.3919899191037075,-0.9044848513851458,-3.3452972029901415,-4.2897380014762385,-0.05023800260345656,-0.2995362585411371,-0.6900531016601479,-4.060997257808674,-3.749664866220179,-0.04930573119601328,-0.1334368326246558,-2.775854567456594,-2.6219607158633265,-1.9702262610998256,-3.3548295057485746,-4.1454142230120015,-0.342790715838851,-1.6411977612353799,-0.16056901320430172,-3.205210525918118,-3.9347232784129984,-0.46261953771288367,-0.5850885932376285,-0.03858697624440378,-0.11142816443358858,-3.6625414130501475,-0.015923519017629235,-1.8121497520607903,-0.11059413917217853,-0.1596699909273718,-0.014532450719501473,-1.492750312612717,-0.7538867286334467,-0.019944381135847403,-0.7498965306483721,-0.020457610979199438,-4.300813802498581,-0.14349233757889054,-2.801304571202929,-4.2297017272682105,-0.08472872340261334,-2.9871974600170876,-0.031258641998263365,-3.4489625834743975,-0.383405626481357,-0.016588697502216105,-2.827861512128517,-2.9936840968653984,-0.7336188451856128,-0.49659366024547835,-3.385546877924041,-1.8019745379597256,-0.05857129503666856,-0.8485456283885766,-2.841352576971662,-0.017069635023144875,-2.146975277725061,-1.3968331076091998,-2.904433057105187,-1.4250206295891759,-4.138761405687704,-0.09232886562437308,-0.058181120058116556,-0.588447109673541,-3.553415313407235,-0.30476532166139725,-2.3362515500460708,-0.48341066745082567,-0.0333165685354169,-0.941932111289213,-3.46357342300791,-0.01899026437151974,-2.9643443719818268,-4.509170533304174,-1.0409470315085854,-0.05211557146820073,-4.348432123335781,-1.650061452953807,-3.3967012050483505,-0.496864276712393,-1.4449045615205582,-1.2470394380764565,-0.08392812020530266,-1.4901134019596554,-3.874249023117436,-0.8014847323751526,-0.07217566337937928,-1.2259900202643919,-2.7936441464284356,-0.3878555230255524,-0.33424066435521954,-4.427264289330185,-4.571944935661609,-0.26649927871666007,-0.011970951016093636,-0.01849457899272577,-0.2032098435180565,-2.061243913351272,-3.192931188818529,-0.01619177679950142,-4.806498743593072,-0.02782861743936773,-1.4833310474267476,-1.1349827000288444,-0.17098064752248018,-0.07866476259325844,-1.8480152105523766,-2.0343987927149665,-0.036761252407970554,-2.615991924230066,-1.732184015292788,-0.19058289789458374,-0.033228311299366695,-3.0417579609061045,-0.030191441179843063,-1.3508043445504216,-0.08776528030788526,-0.15644515719358912,-2.307418710591961,-0.4549465856437989,-0.05665978964287127,-0.08131398898280244,-2.9411055920800124,-1.8879275758763958,-0.2626362684446828,-0.07592215099178969,-0.27959259071679343,-0.13948299287362897,-0.012965274617454194,-0.06349108834218202,-0.8928377037407285,-0.04256085960637802,-0.2300786386915488,-1.7929636499666062,-2.1310918963959886,-0.12232928525757358,-0.07378284207626896,-0.011072013490058806,-3.315704639007965,-4.102243050397533,-0.02978194052472484,-0.03069692525711784,-4.68356881359174,-0.1315458916557133,-2.1586422021065954,-4.07780397726094,-0.019881809686835904,-3.6748196043475976,-4.547861348594296,-0.5362634585949332,-1.3109765829306828,-3.1068264305953406,-3.6932808999209525,-0.008911409394200868,-1.6031101145145787,-2.569115126699148,-0.026564731070744863,-1.7484152479446018,-0.027665211569844264,-3.0937742689651007,-0.06992896574485061,-1.1227505282379568,-1.5123513550381433,-0.061096105690731664,-0.14192212094153206,-4.418896622483857,-3.1498137775815063,-3.180189394074443,-0.34570601772216153,-1.7910998351077945,-0.43015968787344544,-1.6604344199168923,-3.3462770222675258,-0.19217779026446252,-2.0144791734943133,-3.2151067716319854],"x":[0.11112849150326198,3.1699804262319464,-9.985960138577878,-1.7885285173767684,-5.142943742231441,0.2965133790913086,-0.21320924747676884,1.9170046800256344,-6.404209210201222,-5.807044891578017,8.424726959321038,4.19650534850113,-9.409211507066226,1.7549901573820659,4.101813055669741,5.854931931389791,6.7854542692358635,-6.368155803571551,-4.920991774091261,0.3907734466709414,-8.436258873049866,-2.6410680708001166,1.0801501976660575,-2.82956667259588,4.18543748304527,-5.063586665915407,-5.486073438836128,-4.00157863259051,9.272858851491769,-3.9488594965108703,2.524156335007369,1.0175338059470818,-6.912816312945709,-2.982106994308822,-3.6376816758719155,8.777985114048917,-5.924760283514834,-1.647802512769152,-1.679356864281445,-5.546100724335772,8.825833236652095,8.47094748995746,6.265679527621401,-7.956338773498879,0.1442510893978799,-2.686464037414824,8.748066044941865,-2.9166509661042594,4.829991376614068,0.2380356635947578,6.425322767979868,-1.5806791649121834,5.174395411409339,-8.134197535075511,-2.9241013999210175,-5.796992369426572,-3.93496835636328,-2.5159333627013014,-5.779539816409693,9.555340696768553,6.434661961629907,-9.05326542497422,-7.094944821313582,6.763439229404746,6.608348782185544,9.774680088471786,-4.2954841227887774,9.804752785978597,9.605513515302992,-3.2306578623299,3.8260792387728504,4.767249342673697,-4.178473938546032,-8.630869552216884,2.9320033047312997,7.953579068034202,9.238726854040134,-9.491507485528334,8.606659050683945,8.51453695194332,-4.318159444484939,-0.4929072642508139,-8.438219330507636,4.0647075214073745,-2.162169318837308,-1.26617394049922,1.8967197007609293,1.4767331959628827,-5.319471236884565,-4.338702038650166,7.33694446630242,8.404796169464014,5.087068449312637,3.3731023052835276,1.6076164185632855,8.255256134065853,-1.701785956318087,3.215835479289977,-4.376703402872821,7.177415626994655,-7.914861291258455,-9.412930325077227,-3.3185201800190134,-3.5995875041362613,7.251142015601907,6.721184918411648,7.756741093988406,7.058053411421504,-8.596445747343285,7.718457121703782,6.931134444369931,-2.465784108525644,-2.0831805876033727,-2.1471428836533146,1.9793521142172654,2.859350897902324,2.7306441704358786,-7.040964289213947,7.842253082806849,6.272998799203442,-8.346569605378527,2.903189793914649,5.105769337297282,-8.890003431053373,2.9238533894172214,-7.274558809295391,-9.889872660383215,0.889336582791799,0.6897407590799975,-2.6540399341578658,9.043215892118923,-1.4996949615979993,6.169358275506713,1.9997317885708643,8.346828572295998,4.03378424914461,-1.3242602141922752,3.361677687985205,-6.168931973656759,-2.8391035783817564,-3.7830653270332437,7.4720504935223,3.568884291738531,9.421196215060199,2.01094969331141,7.959552756027467,-7.559817890518792,1.8091023332733904,-4.801139228750375,6.390242655919497,-9.767507139263337,1.1945913714831704,0.3756054266842703,-7.851777544716749,2.3435132961661296,-6.527778996281399,-2.855588502032389,-2.319854797089538,-3.8058658560236625,-7.831407672078008,-0.6920990134569482,-0.632526825005165,9.401502955519415,8.64042385105833,-7.792524823568283,-4.282353371330201,3.17291573575044,9.383456696653578,6.183945287237268,1.8765147082681377,-3.9652527624002687,-6.275320492344316,2.844011957123138,8.901225387168537,4.722679869745043,9.325622782802661,6.176030703662818,-8.71697826664609,-2.7504251618840314,-9.754471293148633,-2.658389638619978,8.90889051070851,4.374948920040556,-3.952128953467877,-6.126492742070431,0.6036016396581765,-6.057977820782403,8.4922716141755,-5.2173357542866805,5.6280377516048965,-8.069573040897087,-9.795624743898115,-9.400662592190399,9.531119868635432,8.57726174164123,6.658947607773136,-1.9704414684805371,3.465020413904,-2.514588971471392,-9.522826356954198,-6.227979203518483,4.617815433263193,-0.2731382367936632,8.470546900689882,-5.032386672195979,5.53998780531427,-2.959630278473697,-1.4484526187277993,3.915725897361476,0.6084852354331751,-0.5821315335304575,8.876021815753607,2.9241712659319,0.8701759623340024,-9.55157014208455,-0.7850475614196384,-6.3347664302445095,-1.1237323882821126,-6.464404998037381,4.183754600887308,-4.230743058955606,-9.822213230749636,3.083233866181514,-4.221073923857301,3.0903135289805164,7.098619266005276,-4.047596253215886,-7.58141038109855,-2.4037068289326813,9.528330258239155,-2.325522043806787,0.6681899437208294,-7.622420184458947,8.004571620033005,0.5664413269058244,-6.394946042249696,-6.746210156625221,8.955868605545692,1.6406619991446938,-7.69358315415178,3.859621425224793,-0.3787599361581151,-0.30396499534415256,9.24410386299342,-1.0192539086579888,3.6887165269366395,-9.531012650690132,8.220974728041519,2.5137410439297945,2.4158396485545843,8.64599721656154,7.7798482397607245,2.84326365816597,-5.5848974389164585,4.359066193617224,-2.9430908266944833,-6.08375289548309,-8.536432232111167,-1.3044238882960144,-3.877730609947956,4.787320147559932,-6.874072894865075,-5.47149569980153,5.342315725106754,-9.70294447961161,3.326712752565303,-9.375771142458582,-9.574155043716509,4.040415381810011,3.6212788194906196,-9.139021029222857,2.7868611210776706,6.7161668959038,8.1016551364051,5.684915495061325,-0.975579636801637,-0.9011925992105994,1.73784917565448,0.6178366032731297,6.650278247128767,6.910949384059549,2.0925792774850738,-3.722248460336064,5.4516084992925595,2.050508163451763,-7.058600341225008,6.439672059775859,4.574685356719987,-3.5766855464537572,4.270907812452776,-8.59457993492979,-8.997616323840752,6.0738537787278055,5.8716768191347235,-9.547028564310288,-7.559378315597014,7.164685911976893,-5.979327671915962,-7.023504211410128,-0.8147361094628423,-1.076667854653902,-3.543340200390541,7.103064261476565,7.419770315198647,6.831888345028755,4.102261925701196,-3.0125759075726233,-7.7935112425557085,-7.646732814812713,-8.953632308383481,1.9108065578745048,7.164849432362843,0.9382598490504925,2.272390354678869,-5.806177349826966,-4.265345036406134,2.184393456153707,4.686078876852967,2.179776931203685,-2.1089066115550503,9.042712470815957,-1.2767623146536344,8.948380785384764,2.4589524829206333,-2.89334507996581,-8.671776664425686,8.703580599793352,3.5261823901159275,-4.082507619592537,8.81209015702549,-4.213367127381158,-0.603818804232251,-8.307582613128197,3.893522111423021,7.057453226301643,1.8439711099327596,-7.07345660412857,5.912144714636266,-3.2764660112855992,8.379059808599195,-8.915603154273374,-1.9959070515383104,9.049182296399692,4.707493045736268,-0.0975294382156342,7.1321190754653365,-9.516473250451881,-6.932428767998586,2.5934237349846825,-3.9402166615402345,-1.1457200757589003,-0.25921490058042096,-6.807800203702765,-1.6825069107698312,4.750013555500763,-4.27342738767492,3.929507280603275,-6.9627484506492054,-2.63290716962596,-2.747145189797817,9.547003544531925,5.336965678202205,4.379069619451506,2.5417050406561437,-2.3208235167039115,-8.844190170207945,-7.624830613666744,-2.5865525433396686,1.8045680367356454,9.168317592710075,8.95160649320195,-4.303462685897608,4.970592684600392,2.3445675386938483,1.95224605449026,9.590015989803607,6.914023418333059,2.6802725360512483,-4.06749848594421,-5.72687927591244,-2.2788289370671677,4.201204269110669,-5.201768183784581,5.669582804204776,2.2454928281989197,-4.510651580837908,2.0669188475871323,7.597130387859792,0.30020860203856614,-8.63355012851697,1.5004336050073253,-5.616341507944482,1.2757405141642941,-3.8084138087174324,5.958692670316452,-3.9093465013529682,-1.9947679916102778,-8.514880550716338,0.7997577770296704,2.453790623479396,5.986250683877072,0.16093834059785372,-7.235070429333144,-6.592170138621465,-0.9685947777270876,7.826907182219806,-9.812144155743287,-5.028279179127697,-4.50587083596564,-8.190188648286867,1.1244410241726577,-6.895611588729262,3.6891675145754874,3.948437223126188,-7.7541457113938295,-8.061933155949,2.2415590591436505,-0.031062259280423277,-2.1080162212216846,3.0018979552069744,0.7250246724169109,7.639755121271669,2.105096179726086,9.155373745412856,-8.242670060193085,-5.3376759194889445,9.750727612190843,2.058192199796757,8.690034113987878,6.380331945082123,8.135928879728716,-3.555106538153625,3.378866880345459,6.193616713630163,-3.3236471597866712,-3.4056971161056016,-8.782148544972678,-6.980737726959649,-3.071354392895027,0.8296709878040396,-2.8156184557650876,-7.049770386687624,-8.014090789059768,3.7278310763398004,0.4999883963743166,8.670623802117596,-2.5466917314999193,3.330905205246877,1.3213693850052,7.856222132404142,2.3885279945458073,9.553864088800957,8.346898821221739,-4.831268600655529,-7.893072735367959,-9.7834257610337,-4.665988630587785,9.909528224279946,9.9345649510289,-3.7136617233379843,-1.3046088019761193,5.990165239887348,-5.855153361364236,9.41936806422287,7.590099724685917,-4.2017116643269725,-6.599294634726447,3.324179151539287,-6.840729199223539,-7.69705739889508,-4.5122986102895135,-9.91819999788591,8.537671205133584,-9.131933787690269,-9.83509454040437,-6.156691917793542,-9.588270270305088,4.004516148029879,6.792310624476507,-2.0949724628984656,3.0017829273043652,-1.5637494569736976,4.15753851770598,6.918281027469,-0.6810797330687635,9.59586447604233,-1.1298063685886675,-7.8373307281146865,-3.185047264273946,-8.995504323516744,5.9442581915646375,1.2134342597188397,4.9050565477503625,-1.0277437909499945,-5.740946354101637,-9.011230834940935,0.6591708485404659,0.5199268024722237,-4.652485931552621,8.990471506467784,3.384237442668198,5.330049848470683,9.588155773665545,-6.337724318426914,-8.959678932719392,3.790152527908859,8.000782997928091,6.67352075211744,-4.179064797098135,-9.12547740687784,9.147678958754241,-3.044657778439719,-0.7725278182809436,-2.4974034739134554,0.4020926030160652,8.697488604902915,-2.160833413762968,8.36698394252619,-9.49054655310539,7.684565622171952,-2.02850803558424,-0.9960067161722463,-9.754597807990418,7.2702950729170865,-5.149723001819786,-4.204195802916599,9.297657962595878,-7.940077858479269,-8.460228209446953,4.651298454448764,5.641669241271607,-2.570101237162956,1.1043371027746307,-8.615872649975476,0.45117530935679184,1.178385417434562,-3.3016011708454096,6.729927610554995,-0.594396638481868,-4.018321261729749,-4.139941092073336,2.572236929641649,-6.348079474623711,1.9159661384692264,2.847934249925599,3.1556254695334296,9.642760753138745,4.185730873948788,1.1352309702670773,-0.4020270509557413,8.643342748493161,-3.390111287612587,-0.5996704769880026,5.6849206730754,4.452671567855791,3.2989341913932346,0.553730407519879,1.9046031582333,6.552551830275561,1.6488687418892756,-4.813005838632867,-5.125208651689239,-1.3004131374875527,-0.9971632433377344,6.602344890728823,5.334527763491007,-8.020781918121793,-4.664350343714632,2.4449342710971287,2.613560584681757,0.540037084528727,1.9366559943297688,-4.894447883418747,-6.755268926605162,-4.7128001369444394,1.2389085856053548,-3.0363323686061383,-4.22006130435244,7.179126730476803,-7.311444853337492,1.7180566375433912,1.4859430597916745,-0.4132326905156205,3.6878257239680536,7.089682790841071,8.27776384159013,-2.608672063651012,-0.9557164124372708,6.456303167005256,-1.239946248169339,-0.3220709745576045,-1.472718231954433,-7.339644620415746,6.498952171277978,-6.831150986818777,-5.813819069737143,-1.4076546416166344,-9.663218535564212,-7.378484390455986,-4.252610139213693,7.889616738539221,-3.265563218526535,0.2689626512132257,-4.145936691653906,-0.429045546137349,7.0009188485235825,0.04176573295555208,-3.424591607298182,0.8086230005543893,4.775884421058784,2.491466468603324,8.423893964541413,-5.164709463087891,1.883204123444262,9.64216193851422,3.196006329095722,8.13530115857056,3.954520395644657,4.688645740718149,-2.058813763472762,-9.559175281552253,-9.366433037348472,4.844937952987527,-7.672920681142461,-9.623821159250943,6.838077076884677,-8.529860438697611,4.106386096385641,7.995794809587011,6.76896458356639,-1.9081744924923782,-9.677479855115525,-3.983112528418018,3.492185643439875,-1.5993389744368294,9.505942090999966,-8.517383333950338,6.4923471227475105,-4.97738172026986,9.432248764556,-8.0258814527023,9.736550689205625,8.920504541272333,-3.1246960408968905,5.605449070545379,6.248325656878389,-3.4156231510223733,-4.9378737307792475,-3.0307345584888568,5.913208266287917,2.5394786143948203,-5.905132415812608,9.525959537589909,2.874338710779373,4.260840419547138,-8.672677049659612,-1.618493061049442,-7.631015126221237,3.8838615565212997,-1.9130438958011595,9.271717824166412,2.854888728450696,9.662119070324955,-0.005837311172399495,9.891192809703568,9.711536855403189,-8.752362832402593,-7.433179582564433,6.129409705865896,1.7191065268531514,-5.388186807372994,-2.4006446804326753,6.721561834042085,-1.393076905141477,8.377437661596169,-8.665659015624847,-2.3748390851583157,-2.044467082803436,0.09629797264108397,4.581142773133884,-8.882553440334355,-0.94681482598277,-7.9564833694279224,6.965387185764385,-4.212588657646945,0.3571407874430008,-5.5192068531208704,7.056867139763355,1.44320182989639,0.07051220166850669,8.875057604133026,9.243743956943721,-6.285322757608447,3.041756791246062,5.929420849897365,1.6672906409630208,9.459034347900047,7.131769668217167,-5.115725549107686,-5.254090250376371,-0.24703430856576247,-9.040222517114302,-3.6048194417536195,8.312178920241582,6.040624931169777,-0.03356105002769638,9.833933422935655,4.537951146285955,4.373978334097899,2.0586069208019264,-8.23344933433351,-7.4303131738296235,9.161243597089506,-4.9388017388614935,4.277604464795326,-1.536791847850445,-5.5067185661780504,-6.531753580419228,6.1172051453593745,1.7590529356683149,3.9190642139484986,0.05387890526107242,-0.5385270342855684,-6.56094990390558,-5.700380617516703,-1.9469980422565136,-2.428346024867265,-8.728237839075735,1.531399484096955,5.191512407009228,9.157659890045892,-2.7074189107266022,6.41598611508568,3.882843881677198,0.5703221482059249,9.321898721941682,8.552001382261409,8.2029148489422,8.441501124372284,9.339319874881177,-3.545475612353477,9.336139911137842,1.7329540760847593,6.600472933336498,2.9835000582985494,-1.5968655750145988,0.4555558561018067,-5.604470889461082,3.2081167796670726,4.258535162543563,-6.537872922656378,1.2011623924022974,-2.2312140481685283,-8.996223682059012,-7.876283725080939,0.504324415322559,5.859478379314083,6.846246101753977,-5.636034003896935,0.6057398664082001,8.920317016286575,-1.1137644769330546,-3.0729208035622646,-7.3003175813984855,6.225751195164875,8.096775005135576,0.2898927732265477,-2.2793134384950875,-1.1108221380279382,-0.21932591231078824,3.6307823739173006,6.558582078766797,-7.78724904711265,9.433301778797603,-6.784820969562468,-6.3452150128956,8.710439277631757,1.0798253934884805,1.2280419636196136,8.619949168680158,2.1287365518068313,-6.506170574222128,5.6375591846978566,8.129961777518528,1.6943774616008866,9.598918579908904,0.1838677419447876,4.194061423588797,-8.367618683447366,-5.550219085405637,6.88624417503458,6.352584026681946,4.039345123049895,-1.374219769425773,1.0205974370366278,-6.743295161085996,8.235810432030494,-4.145679419047683,7.453302380409394,-7.835248240625314,-8.324399782859807,9.959175622347782,9.927681375547923,0.5982939173058419,-5.523186373767741,2.2793295840446337,0.6719286440570826,-2.9125101050290914,9.161600482712615,-9.579693087904495,-8.85310271759517,-7.522995883957391,-0.8349242418975056,-3.056649071783246,4.969484660793153,7.3962904513900725,4.815075902512591,7.170590518554434,-7.219844934988009,-5.273760970588857,8.634358479526284,-3.390393729422807,-3.585838641470036,-2.3593718156571963,-8.27496394124013,-9.753775499969564,-0.4258259831486342,-4.760053134577773,-8.908666526523907,9.879677389176162,1.605051812521383,0.013804270956047304,-6.627364181678721,-7.025552707889404,3.388396043349813,1.6902705159441123,-7.616649084492173,-7.912617050700317,-2.5909242456558035,-9.51372186082072,-8.450791435040212,8.725822304310562,-1.8974699858099733,1.4786747577242032,-8.693535558257949,-7.999348899830525,0.9765902468126164,0.1632095779609486,7.297908451945911,2.3041140755262433,-5.214247930972853,8.719805710015535,-1.329237702980599,6.718170527028704,1.865241760127203,9.733055072151785,-1.1840314231413274,-0.10415740499603032,5.799984829838433,-5.530016176837789,5.175358346570778,-7.207132449650855,9.51497178824884,-9.602184958362411,-7.549909697455912,2.604760098328631,-6.699786051475978,4.854850291736614,-8.112574286443358,0.7767898265011084,9.737476623577038,-3.2652768226844264,-4.207558768178501,-0.056951201244427097,3.832797967297026,-3.996724015569204,-5.189117005198085,3.39183570935948,-0.25343650167482856,-4.077803673059126,6.720314090260185,-3.578171283978384,-4.1323845505224766,-5.166472893553391,-0.8806803552555031,-6.137531044783748,3.435960946403135,3.8725692387086283,3.0131741591644143,-6.4052433094458605,6.185744135621359,-9.30921096192817,4.890476643924192,6.018745016647806,-0.4225017748768334,-9.314106841272869,9.095580179077722,-4.645802912646078,-6.959246153264451,-9.798331089720026,7.287844013101147,-6.613619563141366,-1.3071060514145572,-6.23808755139966,1.502438610088955,-3.132030628713358,-2.9321586583947923,3.397676405618837,-1.0798806429126664,-8.994817396153092,-0.15165707880332135,3.9880298301809134,-8.876819893937373,-7.325421355810775,0.5482550425300747,8.6914515971879,-8.019197186555985,-8.779889195125126,3.4570492062351565,8.315647535939878,8.14118245922814,1.9753635973745443,-1.9017466735697006,-7.69141714056798,7.743282023700804,-9.763294932894775,7.13454525766625,-1.444232316645886,-3.9331853372355186,1.642499742917117,5.727748706692513,-2.4043396517976046,-4.42853240233501,3.6174744691167504,-7.576840928720614,-1.3140839392112156,1.7242254807458792,4.214157920967212,-6.8651570557499575,9.406113964256075,-2.0268280877203937,9.003070969242177,8.113335183314799,-7.529391911075982,0.4298737542450439,4.933914296362554,8.683102833088011,-3.265635048365154,-1.4050200767813905,1.3642388799009666,2.8690493531765604,7.909983914200968,7.314648786056463,9.665938027552787,3.4733460545315964,-8.413814361944363,4.609002046331202,1.4061007118460864,-1.3659047808896538,-6.0308415843928875,6.724672888544347,2.7363491849290753,7.366561366722877,-4.571769137013617,-9.063650174490036,5.7876485496976535,4.428212236713609,-9.18560163669325,9.246030438175428,-8.15379018137811,-9.427103094677323,5.522524438446975,-4.575451329843401,-9.336707967446415,2.4541151327583,-0.8214431576076251,-4.529274978826607,-4.8951999823395465,8.554586999002364,-1.581659881699613,-2.2564005708868207,8.275771213391394,-1.280110940800462,4.885093598613635,-7.279013399209324,8.283451014153421,-0.5293825833952059,-1.3626218563494863,8.025882653464201,2.9513592515549405,-7.228435884934119,-4.815967374732906,-6.004643693287819,5.837696821801455,-5.19558842697474,0.5370727442008949,-1.126603514327602,-7.6865165651834655,2.566837175082526,-6.495516312238165,-7.8507796664134455]}
},{}],73:[function(require,module,exports){
module.exports={"v":[10.909968174052906,1.2085685926603729,16.553539835141105,12.798317013740949,18.51952341954705,15.448384154049064,6.612892391480303,3.865151192392111,5.452222236730924,18.197904269278375,5.006616958958321,12.87652716616298,11.088441101590556,5.555382724695206,5.37570457412091,19.158847250310878,2.811406708088051,15.89782095116397,1.4354140726750542,10.334144219270925,10.65296342590971,7.288243684194544,6.74574292200981,9.252787527879644,4.046334907162006,13.814461882384737,9.583731297826388,17.614353597754274,10.435295581172781,5.7632557889159575,18.815850256685206,13.13213981752584,17.52804003087433,17.860766588010005,3.227907220571984,12.508478739437287,13.505247214410293,10.466014024272114,13.54448690713211,4.603467955589675,4.866322047337395,16.14180946841699,10.433153555449714,13.005687253412237,9.773920857944054,15.909203750348041,6.8580304177918805,15.28178568402299,17.86583380506068,5.091882617440144,7.934114796983702,12.018881560264694,12.504300084139919,10.549525113366283,11.693765252290378,19.403474436550567,8.311635485663853,16.70853998470472,10.040715231980029,13.77307795077619,18.897555776639695,0.8120424385793257,19.22546711832392,15.19225835535956,5.127602289638289,3.304937176311782,2.8733905570079976,7.186142472464101,16.17769024286656,7.26533472730531,9.300973726401445,15.716752177425718,18.614300170957996,13.319060781181285,5.4090371295284845,12.31529634718077,8.69287628274748,2.428763627446684,3.6432009508326324,15.165653593992005,7.343171201505521,1.2272535643138838,6.377545418494428,16.516429230031676,1.6661653707169677,1.4659311727222368,17.48988373698236,5.8824027998654405,18.184467510413356,2.7178655052205913,8.061862703495727,5.770930706351014,13.385040186189139,5.7675457280459375,1.9459911407435282,13.178300479088861,18.38174628486835,12.931257862151536,18.25482762435797,3.3676856535187394,3.088688685236516,12.402530811096796,16.95426012088888,19.834037190601343,17.405926901990455,0.4349270394119653,19.087134927480225,0.4359631471759995,2.9486048984515367,11.498195955080813,2.9324321098309314,9.4823703819787,6.78533272353937,9.69506175481104,8.47537267435499,4.937261706178928,11.868319641633867,11.196408575968197,5.134653586380309,1.56520946965653,16.860038509003374,10.634498886962174,12.41635159419371,18.744032397772415,1.5496384451304435,0.6085661019667077,13.343984941986907,3.2612527933556024,9.633636830567877,4.075620522872052,10.042045028031158,17.976654194844865,18.127442382398485,0.9602244988337105,2.4699705609277123,12.419706216111607,11.473789215979187,11.138320521909698,14.624460302032226,19.288132930408068,4.293530248648292,16.24878398658253,10.442574485203897,1.9102234351954017,19.655593484821967,6.601624130160446,12.358451319890587,3.842136726308505,2.67934285734166,15.136834383250214,16.56381778551037,11.971042590012232,11.68850860208337,0.7524241545838528,0.5644851107892412,14.641665473894893,0.38475996729771644,14.155208495921606,1.474620410974472,6.967540691563139,18.65297746446756,1.066580111922848,12.724326453535886,6.429116319101227,11.513151249209157,14.493414348913385,2.036317810441086,18.313017378991525,8.415865375532082,19.623237974838467,0.11835067868504634,8.737572161004339,9.014721910660572,5.840155887001353,10.58280666786668,1.9543219022062486,18.375776229496175,1.4958396180934885,9.030732276454243,0.7978025441992465,1.0740787365604954,8.336869397322948,6.379913184931669,12.726788101282999,7.756140622960834,15.405423411765726,15.02241936216783,2.4253747762284528,13.22140286548581,15.560885878499091,10.376841096038149,11.696502468549376,9.704577273399417,0.20547665256943404,7.7927550510305865,1.2174626070962136,16.033047224930982,7.592274545951225,6.720374941783085,4.45984239324984,5.655197767557443,15.490175303334727,12.041318259855514,13.507275792309477,1.2210549406359217,5.765231154727681,11.613811150278357,1.9783392733401106,16.118561303227477,19.810649047976653,8.438642596381207,13.933100688854205,7.031229652556754,8.113813891970224,14.82107858926569,12.557190918597364,14.646672940255808,16.938207518964198,10.954735687948647,19.0908704343674,16.90428339000027,11.35028960266498,8.343236380052197,15.79143093119583,11.704858515971148,2.068017335308796,15.970764343249515,6.827261479394915,13.281992847609473,0.9544096414683967,18.57166616073374,8.955527642337188,12.304273612645611,0.9943361730973788,19.018468961311584,9.140794122662115,4.337931811530287,18.274913191494324,18.71673161726283,10.574762734155808,1.8087160761736598,11.901620251273979,14.486132411241472,1.1224816867146137,15.676301179567327,4.836766551237277,12.392740850745994,1.4107844168538897,10.294593471458771,14.858215969240568,1.3435225338497414,4.5070973425442284,12.395533424509114,4.7037879651782255,17.098293351937436,12.99796821678768,1.0731478377099402,19.73336010550513,0.3866725339987198,17.84002738427356,13.261596337391467,1.1787126864927044,2.817427346961554,14.700169583138955,19.273257440853566,3.5023813752746458,18.255842211760246,13.559914374640677,1.02555751445232,8.647136572050695,5.502474918047073,8.61009327699536,15.08436491721222,19.563937706882037,13.799371200454008,14.382992185873018,3.196620920125115,6.283741063393764,6.853548764981707,3.4946995024422822,15.519369104009591,1.969782869799146,17.532423896937523,15.99530429497571,17.893192444404736,3.6811897989865505,12.65799219525659,18.022439435435395,2.1016710649234938,19.699871568435917,18.19948352635347,3.89114529135298,19.178792198416094,0.7027886668719985,5.594098191118557,12.959167488916098,0.8855876194495416,3.3989513019998974,8.261964711018198,10.039971700692924,11.244689878952467,3.1531620402291516,8.793949796615411,19.609464939625045,18.874749368142876,14.688245827536392,14.514600282870983,13.933406550864333,15.508329141644502,17.098686664153732,6.904327649019515,17.3879255811452,16.599567146329083,11.10777534744643,19.516653777520105,19.980534883320807,8.25207522662836,17.672508858442963,10.614704148346616,5.747705505350544,19.737724313464454,17.84440867711007,12.057183984825972,13.779995997740118,7.881662046212896,11.208552747080148,1.28118969133026,8.340547197742033,9.64962269942539,10.758831122532829,3.3256432575495465,11.684836589331852,13.65823265143157,2.4707014632549695,17.17631793263687,3.137782071366,5.135768897556003,8.51824092933037,13.395301987194834,4.202607542498242,5.8219765073099605,0.0650041595348183,18.72964261560702,19.385637006240568,13.217552913673284,18.820545295868044,15.480295593085982,14.258038409408282,12.543002285589647,1.4568978284058032,15.384038086605699,11.063198132744363,16.33588309349324,18.748399944987014,0.8096954417181479,5.951026440089473,9.894634465415688,0.387185826496661,12.87969782335438,1.7237593513107763,14.129483276573005,12.339293507635013,13.324948670657829,3.2548305854869453,1.5246187876551787,14.626515867734199,5.662949355031217,10.73872340218557,10.740643766328223,15.431273870125931,1.8590145412561032,14.032035255528346,9.33638529920055,7.275801342580177,0.42123972637900575,8.455681359054989,1.029447883470036,2.01609748546145,0.5325132485381223,6.867337452889237,17.11872809406058,15.937141092534151,16.28297086465057,16.38743933758098,0.25534808186248537,11.10452487740973,7.788198114920815,10.901476541132054,10.012768032362263,8.055741956064537,19.876090167257942,4.01468807824815,6.9736083568466345,9.173163972306199,2.1142609849062044,12.479740370368999,5.991912088893434,14.815186874307823,18.112686495909575,5.635551564406107,6.152846579656188,14.943413937290702,0.7517548881275093,14.74824663467032,15.4596441954811,16.138001406519365,0.34986733054144903,6.623544186529053,6.584088213406294,5.223384639185578,6.918575961583642,0.10263537215851493,5.357607812015299,12.997601302803204,8.500710518970536,6.344709240591424,2.5216621272676365,18.594481929636242,14.316298513214578,6.893794179908923,8.499815391460167,12.42441836846754,15.369566361418787,18.139295376167656,13.592451564687726,3.891487818343773,14.19941677589665,13.479810964673353,12.472978070126523,13.610937126400348,14.177003078437034,15.620874208026327,16.697728806111137,1.359987883935756,0.02931446560019868,11.8284282233085,18.97158683574025,17.583464588318375,1.9777406204911108,10.556223667768222,14.929943508172446,4.451779181149691,16.674275454231857,0.34571140264361144,13.780998852155726,15.482397152344527,18.31125507785455,12.546256980153032,18.328198524612098,14.13850223981954,19.84998194971087,18.4931030910056,14.613914693203887,0.15195394840557874,14.689750001859597,6.123004139903494,18.79500227285764,1.83220068987203,17.879831462173495,16.776293960576073,7.293319913160539,14.42335630045707,18.347747342347837,3.024695421940473,10.104122455125001,10.166796134925779,7.772869065170194,8.901019613312577,13.72784595180164,15.655258166173267,14.014399047670185,11.268818302897778,8.198966146666926,16.28967154200671,17.881188277650924,18.16075763009107,1.518282311301431,19.91635419423069,17.408920340303528,3.4617160806924163,3.2246781140542824,10.501032411357208,11.683775140970202,19.429131586148777,3.4345930412023273,10.940703576168293,18.74804622664434,12.368951130946645,3.6955149251113895,3.263455988250139,11.961516896310975,13.352719780006886,14.25809744273494,17.449975465243604,9.719869707661509,5.525944811419907,17.735618934406364,2.0524940926416413,10.993822969558561,14.15005330511471,6.738195257205355,13.536681001574632,15.91663056389741,14.447820355911176,17.998079546503988,6.056023633762351,0.15218549509807833,9.893416371749563,0.2642291575733413,14.16386530729785,15.33253833153176,9.156596905323209,17.437194217895005,15.410718010845752,7.442853869772552,16.290573357298147,13.21800208634835,8.117238267183078,5.084266716425656,16.203975776246363,9.978859707437486,11.134795809581561,5.298642264477813,3.8611783353440376,17.27787298555565,13.973618039690233,1.1573870573345157,15.026910454198434,17.597163066115733,1.6909321899527852,6.43782475963393,4.899325126330782,15.98899887355524,7.268185966194958,8.749562118650548,12.371435340777266,5.880602059918787,12.768389670374232,17.759754000726005,9.118713294402824,5.402276088488875,6.610221714991247,6.694021420016645,9.465595166197742,5.099047621434987,7.429078815343271,18.44500500729048,11.015610148856112,9.617136486899351,17.544464054450636,6.281525338990206,2.0069740548128223,6.07690518343015,9.4991064194971,12.488816022770237,19.381871916107862,14.768164647251648,16.951037936686735,18.616468332173284,15.443511082106607,11.504421238722284,19.598448946990246,0.1910279708174789,19.121866926296573,4.55495359872871,1.8326771557165111,14.341285849960123,15.180973092871701,8.449818635893633,2.264440590755523,13.647434929390453,9.426670104897354,0.026294762075358413,19.995566185585755,8.502567554444544,13.925250079193944,14.799443556694856,4.6308626917357465,13.76522237509322,7.146458089590597,2.8588633759635718,18.99021180816925,14.90676235672379,6.300557414227375,13.295194602030168,10.3879761185919,11.299289226370973,3.3594627773131247,12.845583261030997,7.174176821574227,10.430056653935903,17.784196120349904,10.982838684913943,5.035614440616318,6.28296968939885,1.303705982102441,7.285918986894244,15.487691514784018,19.53899554393344,10.292181863136225,16.562636894729536,1.905007227263562,8.646899271321228,8.290691520738868,7.64818710780605,1.579921483245732,14.52113016833962,16.111215384876452,15.941299842734772,15.496111770688966,11.802745350525292,2.045884516187062,4.722156817070768,4.161653360259625,6.162048744441684,11.895620605621385,19.48339842494036,12.333348628717808,8.25528176319995,12.62388715488433,17.524109667020596,9.153588662789222,13.360034703684889,1.7059939971059457,0.427813332556517,4.412459414554726,6.364017686695402,4.408911594946683,1.2793159593258219,17.142572182605033,3.2012458288783874,2.194053673583607,1.0456886838717594,17.308577189588128,2.9967831322049854,14.455408268801783,9.489056382388213,12.36174547368815,2.738753492175703,14.75162214309547,2.269938657917301,18.30565673725745,13.064954614381454,7.161556701160485,19.636462886205372,2.9002236984336927,1.5728683642522467,18.17762916835527,3.9309950072431965,9.775606290381491,6.799213457122284,1.5554947896009441,4.189957320258326,10.03692781030451,9.079083371868052,9.256616155190196,18.952100888256105,5.3228069306607395,11.258553412078424,9.557168633096422,4.001146371198709,15.18952061441324,0.041763347232346426,1.365179823625411,4.868264819253079,16.457052252602367,1.0734156660259453,19.870871164395382,15.503888979249304,1.618064921179303,6.244014002740612,9.2243693817808,17.604954275772677,4.679216386260947,5.622375211208928,15.19418544569552,10.432468729829223,3.1123807626239586,8.19406994265266,1.1213160788105503,2.714826166710078,7.717443485129691,6.74711346858313,7.0529698088348525,8.34463404919874,19.05728499351541,2.0500188666662345,7.860144419779083,4.776622409237614,13.511641189823735,1.577122544110554,17.802059222808566,14.457054941801974,7.689959877169836,4.164389752193669,14.52180002896398,8.237165146741795,16.932691777979176,13.391354538861435,3.057589731870718,1.7761523798982326,18.540570076276396,11.260881134612406,18.231456211959205,3.8565377338595397,16.908903210210354,3.5935231216761165,5.157505163380689,14.759133337590704,13.350364639897165,15.02118807919655,19.8691440597863,13.761505817867455,8.809834081314424,10.954541270303096,4.689398707217873,2.0641330538530633,1.3987589423266167,0.5221844569257916,8.124747368649423,5.985810152238145,5.603398342288477,9.076356219878402,2.4026291888867357,17.17070653590771,8.47948838258823,13.38443644694458,7.192075522622807,9.383709404105272,15.644702421238721,12.806192040132348,18.32317436755003,13.997634240944876,11.178693769224104,3.765583656071181,6.979236172560652,15.022814414542133,17.873743576119196,16.830153374658245,6.6925251474521374,0.3507349569697471,0.6048218031905117,18.784725177511262,14.1200343942399,18.693823015477456,7.556709027924455,19.664159398457357,14.016804614040762,19.632329836814748,6.227442649384023,11.466892755527445,12.234991813868824,13.944343697265552,1.6504771216868175,11.974120207270564,1.6815820027733919,18.56633553399677,7.37555553949127,3.762280618992464,4.909148742144329,9.240352278486238,15.660384452036546,17.936257394693683,12.853300871447772,8.059944974351868,18.96278302753292,4.185223992689329,13.662386101982577,19.028297418973853,8.113481652085133,15.551221903999298,19.941850085993146,15.792232640901748,13.940307794206227,7.683471633710259,2.4586217551458134,6.704897373220979,8.974913736058042,12.79593832860753,4.570688799646461,11.77308285259588,2.055944856187071,10.507780700606917,2.959751334267615,13.981981125897267,18.16214830463707,18.184197048145347,10.378972975988464,15.113762265599128,16.045667756646512,13.938073666964815,1.064756487951617,12.82275843921437,15.301443981741008,18.806032382903012,9.584060804084228,7.122813444028662,8.930685841420747,14.314503273094953,12.180763502809459,12.594863457936917,18.61571647940529,3.901479489505193,4.186961912932765,0.11201731670785531,19.730532069305138,15.784979164031846,15.96948930594424,3.581581971974228,19.922943384247645,18.662268691897104,5.950709341681075,17.71646186640147,14.857644829628413,6.376454012276294,2.7075291244481514,14.479578368424452,11.116455210519032,17.896198239263793,15.6822312783608,12.08121968871454,14.685674173923449,8.813326610468163,16.218313600080986,7.214996433464331,6.528455298208309,10.362609812113472,4.636846304335394,19.96712207269358,16.780749455007143,5.646528471417103,6.210001867622688,6.116275437840315,0.8241188339227801,5.917392506493209,3.7730023639230437,16.164858777014814,0.3847937780027877,13.658683391224082,16.71953541298877,11.615240368436574,14.67079342555861,11.170159506819758,6.845173705871939,10.643630806029375,19.740771727241896,4.952955323885484,6.806774491950103,11.554175970224424,19.221372075862178,13.060776709203964,13.049040229441854,6.020516659572501,1.8465505094366907,5.251306546202881,17.058287656295292,15.313242954510024,15.838175300914354,9.4918009760165,0.44574242493214733,15.007891433376962,14.43623307354516,5.678118414329751,11.901170158309782,9.52769687768932,18.22224860347489,12.284635908256035,16.749442285064077,17.617495632971803,5.20874074954917,17.357062600069955,3.8181393964015387,12.179626067131032,7.432286000578219,5.006040222835191,9.521017886273025,8.355233726046102,14.504001338907969,5.8369925696500635,18.87189875624305,7.375029386327618,18.54712411731274,14.72056989455275,2.2101403815091913,1.4144793950037338,1.4391488161946375,12.937427495175067,5.353113628574633,12.00562317223234,10.510058373070027,4.393666532291003,3.813673212292601,13.392481062094209,16.08967911070859,10.378444105820158,1.058546417969417,10.063036217889083,7.772572745321367,1.9322554001735437,19.83782361479742,16.30548338200532,14.268446885973471,19.929506102200165,2.0581788469529894,19.283001594735047,12.03289010870892,9.57160407952125,16.05582950459531,9.379734944003545,2.7588759824883446,8.921571372633807,17.718233096534558,18.12613313720472,7.493008917004369,3.355689276047058,4.274622020633569,19.156861673917405,0.4735405631869849,11.273461734148702,18.039433680476876,18.747312271683438,7.427456988837453,8.947906008820134,12.460966334277677,17.98961887430819,13.868235984012678,11.324987493756344,5.480912396617508,2.313964123484369,7.299358536056921,8.823851265014184,11.971687448932261,16.736944824005995,8.783821466717594,16.98312484184127,2.927255966804534,6.279729699567991,18.75214852875996,16.33042263122039,13.44874653617632,4.7357473042680365,2.148259782338706,19.337917918901756,6.8844254697145635,19.978914412394438,16.899971370908066,19.816002409686373,6.764427357283087,19.406939884680302,8.271270171281273,6.63949220491284,18.909580496517634,7.935664040809174,12.350329002236059,12.680267474574322,12.59363539101022,10.104874129454998,3.9236105727430726,14.429863789463194,10.534681328835278,8.27140795049198,13.165844654281734,2.2018903193863526,14.64789696626311,0.827787082649456,5.363201690664803,14.663686515805319,8.810901529209616,17.526727045913844,3.4571333375730395,9.06654202233629,6.8955914449718,12.583297859773147,15.237201206620643,12.179628971803535,19.66704863641921,19.970468605415718,11.470722837159922,8.28064532554011,10.99642934985306,19.59231704155135,11.331671114690188,18.07684575779416,1.0897870303247403,3.489648516374384,1.2397933690610996,2.584760615068853,16.70226203294877,0.6406085774417258,18.075800922153288,3.369632711460193,1.1016730632176586,18.100384522785987,13.480936665293356,1.749396219412933,8.196843594434648,16.54775820538258,14.103849254814946,0.5477765081092434,10.16044447904438,1.9489431273836288],"expected":[-1.3674926523405437,-0.8137662648770314,-0.9879590852746197,-0.5931251861673486,-1.2746645930118792,-0.6006383528573256,-0.9689289658147795,-0.9352854267896493,-0.37439980266875195,-1.732993442184366,-0.5834183740264662,-0.4367380887922085,-0.206949102226504,-1.4395751507804009,-0.4099853804123863,-0.7024389618529601,-0.6696953283949648,-0.7165763420932639,-0.2958174875775184,-1.1097576475362294,-0.26348844951963607,-1.47693415915939,-1.243378940245728,-0.9082027372074926,-0.22046470026759268,-1.0267377230489863,-1.3775493843399902,-0.23930056934526217,-0.299616785989389,-0.6008998938688788,-0.1811165017581647,-0.25588082150006936,-1.32049262336978,-0.28279804162719613,-0.6248717402790043,-1.422240605586523,-0.7094562144766752,-0.3281731934251021,-0.8375166321151728,-0.8348032563772212,-0.7740261369797851,-0.24901435653240167,-0.8134379859333367,-1.221892335936702,-0.8587747393697773,-1.1720490496155627,-1.186762494700611,-0.9898492788570088,-0.5258682830470081,-0.4356456803060913,-0.552207868533259,-0.5771785281399964,-1.7172376624748176,-0.22161825030894552,-0.7425063714164682,-0.32625402039082346,-0.30419221622331183,-1.3596511331726746,-0.9623715642406241,-0.2094650816872097,-0.5441460332743013,-1.2114585735267371,-0.5702930852135725,-0.35764692426749567,-0.8522825905510856,-1.1689345022378568,-1.0686099580733712,-0.6512889553603345,-0.26628392901425363,-0.7804481693670516,-0.9870406749119187,-0.22344655208988343,-1.1956374301146155,-0.33823668318191996,-0.6251820618941509,-1.5665220917752316,-0.3360650752946143,-0.8047822183061079,-1.4914421203910324,-1.0394220338347822,-1.4441044774762168,-0.49246241197962526,-0.8103921784927383,-0.22257477455274932,-0.335148984609266,-0.8905372987651583,-1.0044749596647864,-1.3753685177597652,-1.026875052645429,-0.9745560132824586,-1.129681933663245,-0.4570321144428484,-0.36477081148800805,-1.649986111447134,-0.8427560744989839,-0.21601305557963968,-0.936989431273708,-0.6393702503357763,-0.5492801393540064,-1.086705196938877,-1.414214932540935,-0.7469114319651354,-0.3050490242533563,-0.57317178541197,-1.2946355932581655,-0.656949695553962,-0.8295387320233685,-0.4227890871079877,-1.0808477927716698,-0.6372267552432422,-1.2620887974579025,-0.49432487000258724,-1.3093096149902586,-0.23003617519805758,-1.4690257981064279,-1.3803245794007344,-0.4727710960280665,-0.3115989184140115,-1.252800792511736,-0.3555903195570397,-1.2419917327327799,-0.35333902139787776,-1.2481513419038297,-0.8362417372356197,-0.3863128003523973,-0.6807490442382068,-0.915337244390006,-0.9372075190474473,-1.6947373704399422,-0.5682725943005297,-1.5380429007894485,-0.48973054028548657,-0.3891179248122531,-0.332596390573753,-0.47138421416584486,-0.25642631093120477,-0.39237595103789563,-0.8289665977326544,-0.22900836022448173,-1.7222703989350912,-0.7862666633466765,-0.29105266696742427,-0.47011670456077115,-0.3657809999118961,-1.5802778592205469,-1.2734632297300967,-0.5591671010646028,-0.5844852566185731,-0.7144655741337564,-1.6226445492382215,-1.1108953586859902,-1.4917677377296887,-0.4285895125530668,-0.47694434010427444,-0.7871945079585116,-0.5389007901979238,-0.6776844809626248,-0.5028505397713353,-1.0055015682557737,-1.138532323718222,-1.1252648728468164,-0.5456575715044281,-0.21003749533256463,-0.4267065877728115,-1.5396292914999292,-0.25655374732563774,-0.9937756959857272,-0.5407453402493143,-0.24461137992885656,-0.9038963342686197,-0.56093686939296,-1.1990693727103676,-0.26259271397092154,-1.5072960670997717,-0.5976548589502757,-0.260121724552567,-1.3160279167990891,-1.4044111123435594,-1.6633961569972442,-0.38148987821344355,-0.8745537449693189,-0.23504778443130842,-0.2957825277330371,-0.19305049537681934,-0.4449276789035282,-1.1811679585855426,-0.7688816904099696,-0.6563696588073243,-0.92715981269113,-0.33000982787844857,-0.9421722681526652,-0.24008384698736973,-1.1205647819210434,-0.827853934988003,-0.49504732793996176,-0.8345289765745534,-0.9119909200288648,-1.299988295054744,-0.6718306246468432,-1.0779467321891854,-0.2587886893792951,-0.6071001067726997,-0.6630269508623031,-0.4357503686514808,-0.27214984826164174,-1.445886310586805,-0.5649226383345325,-1.5476095781482577,-0.6574710944084031,-0.47642701634331264,-0.4734150194445241,-0.37984942723355286,-1.6997030709975665,-1.7367328678576834,-0.4579460914101541,-1.3758919377911358,-1.1686319188327379,-1.037436049119713,-1.2567091894158646,-1.1943980056171073,-0.2105894566071912,-0.27608432439003966,-0.8566840299972323,-0.9561845997399652,-1.1121628815479525,-1.0008373660454464,-1.6958742956990136,-0.5227867549929159,-0.8514638769124935,-1.0450697671892644,-1.1793643822182864,-1.1897105672884454,-0.5359304899696512,-0.6926271468860538,-0.6382206968108444,-1.3259594077986367,-0.4316354987386603,-1.142817070392399,-0.8333743273411408,-0.21240868941408517,-1.2944265531653842,-0.8163352408387616,-1.1338810641315566,-1.1680355826960969,-1.1174500483219423,-0.4556100866940046,-0.28763158247109866,-0.3714211918771409,-1.0909504940540702,-0.5081741868738413,-0.858862846849598,-0.4978014121834836,-0.24934377782112643,-1.5362505872600725,-0.8830216635226101,-0.7152940706113186,-0.5801327370376896,-0.4414343297017135,-0.5260079237931659,-0.3074255709823964,-0.30368462891205017,-1.0961270819852957,-0.5496090574065201,-0.8943752432184975,-0.4067463364916041,-0.3372688888702238,-0.388148992423832,-1.1217031860723647,-0.4841790161270615,-0.43872160625917633,-1.1931636232841392,-0.33480105933150617,-0.22944525105008023,-0.9465103611341573,-0.2130586289343107,-1.1529522157046976,-1.1444268531272521,-0.2747802025438252,-0.24344424634383657,-1.2727584067355844,-0.22599615775056991,-0.4475087640676871,-0.352303122970334,-1.0035732673392437,-0.7033307059381175,-0.2277626339080114,-0.21860172780302395,-0.3351180971226805,-0.48517278748232107,-1.467784936435027,-1.3364561002379234,-1.6277180753559795,-0.9924949991277323,-0.8247647383621497,-0.2216179437757496,-0.8618342494972562,-0.535966293356099,-1.6055211959600042,-0.647124159790075,-0.18923787375145557,-0.8691075357465474,-0.7051503371557164,-0.8603259349398195,-0.574325117673608,-1.1236167585869627,-0.40059400840699677,-0.22185980195272664,-1.1346805583545239,-1.4125484438579643,-1.6155619262546903,-0.22169213350862543,-0.4667884732305474,-0.7080963240246758,-0.9833107283320452,-0.25493101950742647,-1.33814263330998,-0.36046087416025274,-0.2387014041168763,-1.3561914396349468,-1.3412558753979802,-0.919415301378276,-0.38677946507298333,-1.0579992705770516,-0.19473391304885682,-0.32168194624498664,-1.2192961205779245,-1.0607015552147823,-0.32535156686899613,-1.1528795128979132,-1.441512430253368,-1.0589352202840452,-1.7740211578320415,-0.4470254621937767,-0.7813522254400328,-0.20151369774546263,-0.29710381660545543,-1.176325675504255,-0.35489780635100876,-0.2297292173205472,-0.4769411226904078,-0.6189491978768528,-0.7482663390671151,-0.43529218691930605,-0.3544969040630104,-1.0742697282741416,-0.24460836403930422,-0.49392759027817723,-1.3263421896763818,-0.6759507763701871,-0.6760720676295724,-0.5457825234892052,-0.8997377933050495,-0.962976602847532,-0.992976359155638,-0.38308348623378785,-0.27470000441711295,-1.5037341176055055,-0.734376674345347,-1.3682989258861462,-0.4346288041050029,-1.375490877044781,-1.7359407298866665,-0.8626892324706381,-0.8097426550143579,-1.3992319676498524,-1.081118934547976,-1.3354075835647303,-0.7128921920298344,-0.620146089456616,-1.6407227461191725,-0.6919545395874912,-0.40413760323264747,-0.4449259491252007,-0.2066223308757873,-0.4873494426349038,-0.5655462432785354,-0.43777393832338296,-1.0032671087807001,-0.7749384093719269,-0.2179801826257275,-0.2263855588163708,-1.1789294259466419,-0.4714989627596347,-0.19273147716100394,-0.4463655710750998,-0.2721479736007547,-0.4114030227055465,-0.8869995636910485,-0.21156317233479033,-0.5531631549247454,-0.7253101421243571,-1.0181328700206445,-0.22102941979161297,-0.5067049610873888,-0.6299909496140578,-0.36139983354084676,-0.9859177583966512,-0.24671475417989275,-0.18391589550354434,-0.4222504058990731,-0.5377513188081025,-1.4476897034956613,-0.532688782242658,-1.3410681095321726,-1.3028145858978808,-1.777871248551576,-0.6722198791507674,-0.20849293935804078,-1.1152383461956623,-1.1236316486743787,-0.23670826141474535,-0.7478805265747706,-0.4080437908789658,-0.436180553857495,-0.43930975406041917,-1.7108869437867833,-0.8584243481353117,-0.6401618269383959,-0.8858905461260678,-0.5788567255647136,-1.6977678137785648,-0.26498952488073424,-1.5583926679468383,-0.322865440200523,-0.81821895517121,-0.48744444069692716,-0.6951280386807677,-0.892015199876084,-1.0367603731214827,-1.6436274717828092,-0.6566467542104546,-1.6487098595476262,-0.2691600928441699,-0.5882780389205351,-0.6408115593850547,-1.7718187194543273,-1.401165186114744,-0.920683533732707,-0.34541837775229756,-0.2542593999696604,-0.7219545449175646,-0.5427838521723405,-0.7272188092579155,-0.737939067540192,-1.4817508100967782,-1.2844846017528462,-0.6553549879908762,-1.5509507761692314,-0.48409520288422614,-0.7677978789739742,-0.29590037714849304,-0.6747406891412402,-1.0949280477592178,-0.7322153385630821,-0.37110102953892604,-0.6021791315255127,-1.2521500390840221,-0.45848115037246034,-0.25513561751263025,-0.9790980868174466,-0.2282144769499691,-0.7172618547291933,-1.3630192623410662,-1.1338994671359073,-0.5107630082061188,-1.227327925173058,-0.34837322171382074,-0.6361155594731249,-0.3507494609570463,-1.221543380453395,-1.4202718379465855,-0.5672046043802161,-0.4866471592679673,-1.259044706426637,-0.7192767746135648,-0.3089719339900907,-0.6710368728585422,-0.20465821089526368,-0.3513576532761645,-0.2374287691811977,-1.2821813239193927,-1.4477159861168705,-1.4146066241339266,-1.3534899140060057,-0.24162694966797343,-0.2059199993638572,-0.7264110598991623,-0.6655002688269596,-0.4895788787006663,-0.955931383272396,-0.8039089347583437,-0.2083319837711586,-1.6520626425599376,-0.27329783755208537,-1.1568332760988664,-1.0933753940396786,-0.9289214048840521,-0.24718247770214302,-0.957481486095818,-0.39757718718941065,-0.5678725737456515,-1.700221557298958,-0.4839020391413761,-0.30256423298927626,-0.3526605166247565,-0.2697923375069632,-0.5327033203210241,-1.2057875823639073,-0.9847497101476024,-0.32249710717339586,-0.3045109789709788,-0.5788686720795555,-0.5168742435788061,-0.8695056098088654,-0.5816589434490623,-0.2992994738250568,-1.319857094511251,-0.9755311098849562,-0.6708377832103453,-1.3708181690806422,-1.0725960047264205,-1.2727583030467144,-1.1320600747824094,-1.4836902619246106,-1.469847110457043,-0.8435304282288559,-0.7990466764401781,-1.4280441980574246,-1.6024766319902468,-0.5125342125488817,-1.0743803218103172,-0.9430488784742014,-0.2904370773731335,-1.0102147782933089,-1.0869529831122486,-0.35473175626895137,-0.9206719969540782,-0.9021275979480441,-0.40062040607463756,-0.2700099446851885,-0.5771147799709072,-0.9723584027682395,-0.27524118774025386,-0.21789791068816033,-1.2846761115174603,-0.20796257783043504,-0.8091207250180544,-0.3024371923532527,-1.3660158057252,-0.4043227759378158,-0.3495186714174673,-0.4208241396292193,-1.4990592266630112,-1.35111884385439,-0.32590884087526106,-0.26649176668574226,-1.0393348015865689,-1.3597744117720756,-0.18159520075600277,-1.428481662586211,-0.1891200389365665,-1.7767207216788363,-0.9513426959343834,-1.0441078494931255,-1.1967122807275232,-1.1494642050316184,-0.32705883064529395,-1.3766561410060385,-1.126538460310269,-0.32267192418680485,-0.8891331369759472,-0.713753204657548,-0.743844393923081,-0.6271147950727194,-0.4091710772200126,-0.9902934904255156,-0.3083494723644099,-0.2924898885547879,-1.0990119057289236,-1.2244022424202434,-0.8815954744382986,-0.32990559450015805,-0.4082724280578212,-0.47173394273464886,-0.42344956753712504,-0.7511415563777707,-0.9563960333132341,-0.6368261405667056,-0.5758379957838539,-1.513558570950615,-0.34711150451333544,-1.2312448193264571,-0.40560331824053925,-0.34709261246924206,-1.6541062611514128,-0.46186508778593055,-0.4849495196249771,-1.1411267804195377,-1.2889630582604648,-1.2178429713110628,-1.231564814812875,-0.3954523749343118,-1.0466319338129202,-0.495276564221548,-0.9017349858546251,-0.34391560200433324,-0.6311793291721761,-0.5405161746424312,-1.0262593282869745,-1.0695745251396183,-0.5348470464588568,-0.3901821514640518,-0.2966038525411083,-0.5938456335980684,-0.5750794310020827,-1.1075644901763122,-0.8967948084725033,-0.4587577852774577,-0.8253797828791327,-0.4249506699585936,-0.5360155193691696,-0.2363117301617248,-0.4731635328760858,-0.30800347646107945,-0.660747204987315,-0.7563258723063235,-0.34624717032691515,-0.5484486032869371,-0.840844405795648,-0.4118216400205086,-1.5083935150032488,-0.884664693782765,-0.9150203163574637,-0.6887693103960089,-0.6164807375119186,-0.23643912689822214,-0.28859075676061985,-1.26691585505823,-0.46683383622637104,-1.5822845529324465,-0.3115919356003554,-1.4618165929401195,-1.7061020441142247,-0.8580374181735725,-0.37106708037499003,-0.3369058339475659,-1.4615112516688695,-0.1887962257196832,-0.4073313698341457,-0.2254348708621738,-1.466583343476777,-0.30344229265323264,-1.4170619249920762,-0.20951796904246767,-0.3549099962095298,-0.21060428947272727,-1.425728143082426,-0.9858224049963714,-1.39790440774106,-1.696355433901187,-1.056112810949737,-0.5700625886115845,-0.769784922212074,-1.4599200190918675,-0.3738171208768098,-0.7644326869680182,-1.2559521193043641,-1.6240503315174086,-0.9520198262138024,-0.7182835980088236,-0.7730605152148615,-0.7989246320331641,-1.2959478031961111,-0.28634432153334816,-0.2442743239578022,-0.7223232376755373,-0.9269914537315447,-0.9692171087535453,-1.4486119635511665,-1.2088707953782427,-0.3234610291603829,-0.24691483066737294,-0.9843060043466156,-0.2647628295447999,-1.0136933280148996,-1.2060809133614825,-0.3736398793012143,-1.748034762786169,-1.4648075432372385,-0.3311048695859098,-0.5502119975790438,-0.5018893008401362,-0.32411891473183935,-0.2871883560543274,-0.9843761538352621,-0.8229169731438736,-0.5528835978280571,-0.5501090085499067,-0.3627265039752231,-0.9081858145859428,-0.4766389937693323,-1.160829822410032,-0.25814357354444795,-0.26040050657454744,-0.3752700782294923,-1.7268137156915864,-0.36986342174231307,-0.7671451009688965,-1.2720171886859628,-0.30911307486173667,-0.39257984384877187,-0.3651489702681825,-1.3630001509133751,-0.6628047155331318,-1.4152801084546125,-0.712081824805804,-0.3150229830490707,-1.0133021216097882,-1.1874747897018434,-0.2096385036634598,-0.4477858350059598,-0.6593313540199626,-0.4700109011210033,-1.5062165719158749,-1.2340240701247662,-0.2323666360326893,-1.2970594535165003,-0.41657460743511965,-1.0099438479237262,-1.7782378669044046,-1.130730252068838,-0.9929206080700299,-0.48971529403543335,-0.4942726273283127,-0.8363635784198958,-1.0123586001955758,-0.8980756851607494,-0.7080807484542482,-1.265628106588851,-0.4346538261193606,-0.49214555627917234,-0.3818330716929338,-0.36580788954417365,-0.6513000719191775,-0.35260366230365886,-1.106646533871646,-1.174939801039817,-0.5062968620260968,-0.3607674626879993,-0.2761611566580881,-1.256955930614338,-1.6836392434342697,-1.2026754988870518,-1.3845515021359842,-1.6525301216127977,-0.92258359434944,-0.7947193804367252,-0.5252261503397999,-0.6874564865393495,-0.7408674003389716,-1.4169278692317127,-1.5315471763414148,-1.562919120019029,-0.6146602415772747,-1.4029848352877514,-0.5771867385919155,-1.3476175057886741,-0.38432654977729813,-0.38611714659260654,-0.23392896814179562,-1.4803340734366395,-0.49398144220706613,-0.2862134971478723,-0.21431284642757023,-0.47881328835887893,-1.4127547510671727,-0.6798489421248158,-0.3016820781593673,-1.0404557553706866,-0.8145820762539054,-1.3600416744872021,-1.429014285796621,-0.35937808625739426,-0.5179568659426163,-1.1152485150710825,-0.2712584337121545,-0.5973083182244925,-0.5162462791332338,-0.35855787453051496,-1.3777501125948266,-1.349932087936374,-0.5967492214830509,-0.1862074035688135,-0.34424237714325767,-1.421977644628043,-0.2862951665551625,-1.0867005299720869,-1.4305875269586728,-0.7728357250673439,-0.1977184428095523,-0.8706911773471425,-0.5232412048802171,-1.0924227197848726,-0.26519237396614764,-0.5946583974576722,-0.20100259876277757,-0.5159676787127783,-0.38730609043793746,-0.6320309846511581,-1.0835895807535338,-0.632630681404676,-1.1880248581510477,-1.241142605670564,-0.36837714762592216,-1.685387041230616,-1.5607122503155786,-0.2654309096455952,-1.0226654786609366,-0.5218359729808971,-0.18793565585400415,-0.2598802900243793,-0.9874939901101247,-0.23597273726884255,-1.2899446180333056,-0.19569107759559537,-1.645386375746654,-0.7283591979301419,-0.2998665368478025,-0.2526822641279535,-0.3294680872726298,-0.4133550971847932,-1.2198555730151242,-0.7452677399204357,-0.38843279551062804,-1.073048705137018,-0.7554653515474331,-0.8888715080653835,-0.881842219715586,-0.5288742805428941,-0.5711724876254984,-1.6580373078996828,-0.22972609025676005,-1.1670190623243974,-1.6986138513230764,-0.45857822119149183,-0.6963761880296946,-1.1365860949747106,-0.7140265646648631,-0.50684181100978,-0.3221199708561397,-0.7966102092189798,-0.4141662432123416,-0.971045514717275,-0.39324413964105326,-0.41581637651870546,-1.0903474161238886,-0.5146639693602006,-1.1567201200133879,-0.5449050834881501,-0.8467208442937961,-1.4561642242636275,-0.603316634676849,-0.3157046504869445,-1.7566707871740532,-0.8874023265481823,-1.3231994222020513,-0.2841202201141424,-0.35009974208268657,-1.1159199068456556,-0.6097247531606413,-0.6096524161445186,-1.6131547737537573,-1.7715870565756728,-1.060309686491334,-0.2261379767119395,-1.2958340739951248,-0.6230428770052019,-0.3001653096188871,-0.8454943289401797,-0.30634667603959326,-1.0221165626340813,-1.0372947835811148,-0.18874060814867016,-0.29344764529800677,-0.5606279536149392,-0.8367163291592845,-0.3130273775096276,-1.6396308169002416,-0.32473189617525955,-0.4034471885563218,-0.21829335676596923,-0.2594273373156406,-1.3398111021781984,-0.8648061283135727,-1.5610972953876248,-1.0255908023479927,-0.7390002495510534,-1.5760761955051303,-0.8062644826057878,-0.4674250097436039,-1.3813367763316906,-1.205777270760809,-0.5731037811399847,-1.1372505198104423,-1.0675413074434876,-0.7451695627852929,-1.4829095914721895,-1.261535198417775,-0.8767365891435476,-1.5973941234233437,-1.3327899680740944,-0.99680222180871,-1.1999813996265192,-1.1740410044086975,-0.5212938767765813,-0.32531604707959016,-0.8680975586133975,-0.6649173559477939,-0.5298366964007498,-1.3590370632817237,-1.4261129426067911,-0.4120772389029884,-1.2249388884042238,-1.0055317154589822,-0.4362916555153193,-0.2235295222220575,-0.5856311120924401,-0.6648449671981891,-0.789307503197494,-0.8986833008032149,-0.30498304171680957,-0.7494056695521212,-0.5651467093405994,-0.6819537724502993,-0.8505354209822757,-0.6663097647566384,-1.4771206332900104,-0.22337171546606213,-1.5894845720695905,-0.4683124650155834,-1.6630374910491645,-0.540287726725925,-0.18392416806555345,-0.5116572675253319,-1.7662067516811444,-0.2569521556711261,-0.9956086385808043,-0.23489289468066313,-1.1663312309876317,-1.0609035461326468,-1.525341363700642,-1.1236022314229142,-0.5285504606208753,-1.359801373335651,-1.1878397985634468,-1.262821672412495,-0.5812598032543961,-0.7522140306596413,-0.40298736477336145,-1.3245628371467202,-1.4610606086648783,-0.2896221186794795,-1.3587107678986823,-1.1904799611661256,-0.5576753817855679,-1.477759279152285,-0.7353046741010255,-0.2179360196467014,-0.7826797445093301,-0.26174845720389445,-0.8567208251594483,-1.4747319641409948,-0.7216859954808387,-0.28826904565747546,-0.7839120163162205,-1.7469105037251964,-0.779794437297818,-0.18992922286415942,-0.9344421485509686,-1.209768141427263,-0.8400772825969092,-0.4976322077349037,-0.1994221699566268,-0.3690235206403417,-0.4053517941158911,-1.2208704078109411,-0.32108572686755255,-0.7843134716590645,-0.3681038215113532,-0.8022962123416678,-0.5414400061298189,-0.9374657241872898,-1.1501072376474208,-0.43561165389262163,-1.4200854929201603,-1.694322882745972,-0.3838844347522801,-0.20988111666185863,-0.7251231343684825,-1.7368478119523951,-0.6853031555630461],"x":[-0.6819488602725485,-0.1740488790164041,-0.33116970347083896,0.13488016543916714,-0.5949920652456218,0.12379087686808621,-0.31980905546790384,-0.2924760000089588,0.518298230021303,-0.9521263501848112,0.15346605274753244,0.3833443004386141,0.9265689506346737,-0.7676297287598586,0.446459928504241,-0.011744046362318628,0.03245945809840167,-0.02948702190771657,0.8531876544596724,-0.4539097435729813,0.7608297983154979,-0.7859709600590397,-0.5862057499183515,-0.2520705414349447,0.9491697530111773,-0.37088730487360344,-0.6936068201447299,0.8155593392513056,0.669368946702142,0.12685581166089843,0.9971916772071285,0.7759430756238843,-0.6344086918733005,0.7004742022761934,0.09577458861736687,-0.7240702325598298,-0.02065459849605178,0.6027266947738452,-0.172535757673145,-0.17579950943257305,-0.10269074373524978,0.790206341803287,-0.14605369976316407,-0.5534493247203587,-0.19765929479949618,-0.5064846213606633,-0.533678995449614,-0.333531812594718,0.23364595227764973,0.3986703410655279,0.19717866684804397,0.15805319490687575,-0.9520293400382487,0.8817491923011476,-0.06170586294961877,0.5979997244459225,0.6641918011347436,-0.6676070431099981,-0.30854817775206556,0.9109996118268171,0.2055692192234697,-0.7956686148730463,0.16678543177863725,0.5335683832150937,-0.19500550922176263,-0.5433861445278154,-0.4461242472377065,0.05549792959212807,0.7439815902823779,-0.10867481344659602,-0.3345907495083824,0.8641828349788541,-0.5261130062223529,0.5764153436717203,0.09244484767999017,-0.8388479882120587,0.5890012079576121,-0.14711878336177442,-0.8448428033194402,-0.38260985402269476,-0.7582803761549854,0.3485045154331443,-0.14476053426262459,0.8656357979258349,0.6982406762658822,-0.2690200231466866,-0.3473492507652467,-0.7089056723340832,-0.3691917340545854,-0.345478297397507,-0.4766370112101299,0.35714307915437127,0.5203950246964091,-0.9416811308727189,-0.19909392690552785,0.8916900075666279,-0.27866687490069664,0.07065824246741625,0.19795310825245016,-0.458400194238616,-0.7889412073180697,-0.06699258256999663,0.6477442823188424,0.162532680777709,-0.6127025338736001,0.07140511171016328,-0.16265348423361203,0.7402289110748592,-0.4579628884148548,0.0737374952146661,-0.644477709609665,0.28733750921422985,-0.6451646542419422,0.8591628117753873,-0.7734212851704605,-0.7220629597428374,0.32145723843351703,0.6393619492580811,-0.6042101788601015,0.6489133219669778,-0.56785681680973,0.5475252429971205,-0.5772788652947844,-0.17020562357983993,0.5688173029426777,0.021929146114242126,-0.25744437010765964,-0.29836138760160713,-0.9459512163717645,0.17830897087146802,-0.8230300439064675,0.2909536527604697,0.4689566149714195,0.8237775099541462,0.35341943845255397,0.7758204360817516,0.4672063868685674,-0.16356951966419775,0.8493858523362365,-0.9430471669168186,-0.11840150199316923,0.681671874606057,0.3269825330037417,0.5986004684269592,-0.8384921081017143,-0.6140756215445422,0.18447953983660437,0.15419443896196183,-0.028971783648557015,-0.8759376879193668,-0.4500226688816533,-0.781039883229214,0.39891787598109874,0.42984051261506906,-0.16286164363877953,0.21436185812741781,0.03129036142758457,0.2708821943784203,-0.41293886427163295,-0.48793079969922903,-0.46241390669224636,0.25157336706714517,0.9116667910224807,0.41061741396579743,-0.8198994909547461,0.7719063378045106,-0.37933273150924274,0.2107991461858738,0.8215612629119455,-0.2437204103384496,0.6039171646499693,-0.5396010117017349,0.7684244765570782,-0.8226029137866746,0.12897012341601233,0.9165115795145455,-0.6300837272542803,-0.8955191443559913,-0.9250641707313818,0.698334395405602,-0.26273084560122806,0.8502499411254232,0.6940806519033758,0.9679200741661207,0.37422678824746436,-0.5150336076976831,-0.09308990911050463,0.051952824395465225,-0.2699693173258182,0.592287094009222,-0.28727036668902883,0.8231702820388485,-0.4649977511969241,-0.3484531264589701,0.28792085400397394,-0.20232782613809297,-0.2530477067405865,-0.633407499585243,0.02802703125465067,-0.4397683306277895,0.7999302525310359,0.11471814397760616,0.039138276772376024,0.3847097644642523,0.9946357199529463,-0.7710689413064205,0.17617406169634764,-0.9951214095421204,0.04624908788523552,0.31239673509138255,0.32340677023748166,0.48954787872174865,-0.9673095449606075,-0.9869307094649074,0.3451422357507625,-0.6859245174167694,-0.5042535214602184,-0.3799231000210068,-0.5868852800614888,-0.5247869350235939,0.9018894691260226,0.726066413101758,-0.19621769705393444,-0.29916815116395057,-0.45462682160274603,-0.38672185673314274,-0.9286832427648481,0.24417827133316905,-0.1881810688483685,-0.5092543125973532,-0.5116175385490669,-0.5305717670718875,0.21964312348291548,0.0008179781893433713,0.07176652555448104,-0.6509562470820329,0.410215287484359,-0.47868675332684374,-0.16700036918468797,0.910722861648309,-0.7301571510957681,-0.14893675048580945,-0.4725655856877742,-0.6526681800577547,-0.45659381167799307,0.3630695757096567,0.6949259507876677,0.6195602898294457,-0.43606246867109055,0.2621385648401109,-0.23133862919381798,0.29056976437484217,0.7953473311940908,-0.8621142553833021,-0.22184453169605378,-0.02798842280245939,0.18753910241131022,0.3721150249484153,0.39539003801475925,0.6415466490319384,0.654766478515008,-0.549849089925551,0.2132101292865105,-0.23463879753760697,0.43502876321182393,0.6212332767180069,0.47077520635725856,-0.46193896316901517,0.37996437475131684,0.3839584991919276,-0.545923973693597,0.5920433019863691,0.8473361782886997,-0.2882514923392412,0.8995626308528433,-0.4901693349446834,-0.5202113421811525,0.7497552711310611,0.8344381252855269,-0.6427241266899544,0.8568639560497142,0.41084217665866607,0.5431492159399656,-0.34697306701561414,-0.012877336375526571,0.934101449914265,0.8848871855401579,0.5793982885960585,0.33394433379971167,-0.7521216013395118,-0.6472505166221887,-0.9601749469576784,-0.3349459119687146,-0.2128416230966046,0.9157452866335039,-0.19975413186284197,0.28150051874230986,-0.9569952052405757,0.06088041744910866,0.9913160831329217,-0.20838990456602424,-0.016169173030381234,-0.19997432312682895,0.1608842373573789,-0.46080512584797084,0.4487577434421648,0.8709756204841606,-0.4737013068651019,-0.7119913644912459,-0.8677288986624583,0.9015048705846285,0.3291489514290684,-0.01887983923511216,-0.3291824607278966,0.7707942941104449,-0.6475222564216336,0.5372271640522941,0.8171904326935295,-0.6730842204187537,-0.6798271671139555,-0.2600689429294265,0.4736135164908277,-0.4025856502935743,0.9593931434443803,0.6241831046539259,-0.5533715539940625,-0.494355558679171,0.6142156196000848,-0.495328560267966,-0.7434376882832234,-0.429859513246059,-0.9962795043706749,0.36466626445661365,-0.1171779025520383,0.9304830785766889,0.7338084402492613,-0.5321686426772323,0.5483749802701716,0.8495498104234547,0.32795029834401923,0.10094548288055938,-0.25021501796964696,0.383251143620547,0.5376352439695617,-0.41738889659398826,0.7994964903798802,0.2848293534311592,-0.6422654718493428,0.022178007926363374,0.025383431754741004,0.2037448674447946,-0.24180804217520668,-0.3059467588393945,-0.33553810852499355,0.6890689075929193,0.7525822787554284,-0.7962024677286421,-0.08121287723649218,-0.6791253700940705,0.44646227872063715,-0.6833608865338436,-0.9662653941283121,-0.20058635686702253,-0.1495052140683466,-0.884580952485905,-0.42302410779378663,-0.6752632787747621,-0.025083180338396627,0.0973151606908611,-0.8889460121972097,0.0017021876244771583,0.4424665694704988,0.3719163250556452,0.94841875748304,0.5005722777997383,0.1767039166570168,0.48809848776348286,-0.3908318476937893,-0.1444705637251169,0.9139178442782541,0.8534780635004808,-0.5126677893923799,0.3215724417823145,0.9608467095880342,0.9273772830313591,0.736809869567379,0.4361562546162374,-0.22811441253325704,0.9156703322202233,0.1956296113318543,-0.04018218506726523,-0.38095580813799446,0.9030615358007985,0.26744187912474127,0.09181951282526457,0.5282394877115051,-0.33897386137025176,0.7983599641593457,0.9883772286344792,0.421689506693093,0.22148961389582622,-0.7409195383385101,0.30029830377929834,-0.6540753043398291,-0.6211812180863965,-0.9874536822730953,0.043822661344410374,0.9480765452295392,-0.4668280867269514,-0.4806957011112063,0.8542500917619953,-0.18812759020280234,0.4503509871843341,0.3842611138077201,0.3831156966426663,-0.983402689150294,-0.21256073476436255,0.06917884372845329,-0.2256101769788006,0.15808283269639123,-0.9545038940004424,0.7528400443328263,-0.826897222328371,0.606255339697856,-0.15069009979645287,0.3111880642286371,-0.0025242001933030167,-0.2324796191747045,-0.3815672655365221,-0.8945848418614943,0.047438878840208254,-0.8945662002423811,0.7359766629013662,0.16594227107627102,0.5568812168918829,-0.9941617888957519,-0.6996774053177108,-0.26183209954637077,0.6478906173691472,0.7862359888278578,-0.03619853747100388,0.21707222052895636,-0.042630678986516735,-0.0915083908066392,-0.7696838312668715,-0.6055518174854977,0.04895574407871006,-0.8262579817097975,0.3000827812524949,-0.09189913157446039,0.6672795547718158,0.023601775828516303,-0.43611447017753635,-0.10989448656877165,0.5064577706852793,0.12468496997701761,-0.5755012975018157,0.3926318015992787,0.7716906422153653,-0.32217584229846796,0.8776897583993906,-0.030388448233491072,-0.6690835921182292,-0.5122260398160416,0.2602136427359256,-0.5622172260894551,0.564498640701657,0.07572735806263076,0.5492157181048731,-0.5507933019442723,-0.7201080454770428,0.17291763309336705,0.3013731483525297,-0.5830411302811047,-0.032785508695921894,0.6377478457970311,0.032759244977005775,0.916932712090337,0.5451956704651155,0.9077986953113903,-0.6573506122057031,-0.7491541148122014,-0.7193883680625008,-0.6605224893678043,0.894472944660968,0.9304704433196123,-0.041567114042702524,0.03585856105592056,0.3085989201098496,-0.31923170874447937,-0.1346187159879526,0.9155821793435677,-0.8995357676292062,0.7246564375698523,-0.4988785062076353,-0.4494884302320008,-0.2704198522608259,0.9553529787251418,-0.3027701556629703,0.4548635624913606,0.17457802187077487,-0.9367776505158658,0.30107761510933706,0.6559629785482239,0.5421444762921062,0.7651728657213366,0.6684614195641112,-0.5433572951267611,-0.7613538007926905,0.610310073315742,0.6504454961409714,0.15662993853643092,0.24773066372895558,-0.20752486836484207,0.15353169981028358,0.6618430233227732,-0.6380381507324682,-0.32419863169005625,0.029696173287279137,-0.6772559509979423,-0.4187933549859508,-0.6006255889888541,-0.4885121087718556,-0.8323328662143457,-0.7558492070968024,-0.1791673934526865,-0.15479489132943547,-0.7250596049910563,-0.8573185352716113,0.2921278187546523,-0.4273972171811389,-0.2966772265833879,0.6834178808675322,-0.3611166536031414,-0.4344405844568513,0.5422526019206448,-0.26983908419508884,-0.2435994058159685,0.44712290636413643,0.748092155282158,0.16229973669354303,-0.32340188718387797,0.7456727130105749,0.8977432559177512,-0.633916437446477,0.9425931315220164,-0.1395875439897889,0.6613667613271517,-0.6837963446003812,0.44023490677726285,0.5676909938403125,0.4658539367014751,-0.8133985856164179,-0.6714951168825181,0.6046190472144906,0.7404964004303567,-0.38271958252216587,-0.6675017243553443,0.9957854785427029,-0.724914221023186,0.9855552451314256,-0.9813420284274605,-0.8470557817367412,-0.38565176142746616,-0.5560524231253412,-0.5647969988248702,0.5999245288155803,-0.6830895044799776,-0.4728319508519596,0.6948676146496102,-0.22931668818888395,-0.026250575933999265,-0.5516185210851599,0.08674285322685282,0.439008614764814,-0.3345701106743171,0.642015241899887,0.718239839314978,-0.4405187674586144,-0.5673207070647357,-0.23752882019765797,0.5901968056284326,0.4341403929209324,0.32991192077780207,0.4070738681711079,-0.07240440835525508,-0.30144487028859857,0.07824833454159741,0.15978837546808577,-0.8169285955616954,0.5611524990826604,-0.5579153741834357,0.44230689573999316,0.5806045175432994,-0.9387601653053994,0.4086432945117089,0.3054810536992183,-0.47858835818048373,-0.6065807208960057,-0.5535091018137854,-0.5589559806482489,0.526745166124003,-0.39524246041329336,0.2869455049298155,-0.24656959085286623,0.6805868982132437,0.0816089940546294,0.21155789608735498,-0.3694010137563719,-0.4115447535032559,0.2215088920835333,0.5332438286960044,0.7062754584461595,0.13942815395420283,0.16439634257842872,-0.45010825370638274,-0.2361909117383325,0.34505910707455323,-0.16077290714673564,0.4048055729836797,0.21812661830137214,0.8425839878542396,0.3199651287127554,0.7772820629396779,0.06407999311658052,-0.0812786657270741,0.5745425985214441,0.20824578277676986,-0.209109740801944,0.4264106259788458,-0.8744562657399619,-0.24761245021504186,-0.32000756503044236,0.005578860912161865,0.10868884724388561,0.8279977589221139,0.6989370006311741,-0.5937324871074163,0.3581517959491789,-0.8461040960619655,0.7258578508873175,-0.7485652955078903,-0.9422868818352947,-0.1987453451562602,0.5038038081774872,0.6348675529096468,-0.952570489659188,0.9714186451510232,0.460993184613415,0.8728756852458579,-0.7804537941570375,0.8092492868476344,-0.7654541489661622,0.9222185792144852,0.5470573098620131,0.9222450641123552,-0.7194089832297288,-0.3408458641141836,-0.706518037391632,-0.9475491955161526,-0.4206657663244173,0.1677152376306692,-0.6345910752428003,-0.9917180849256786,0.523153346747244,-0.08767116514072582,-0.7832444543784334,-0.8709214479585392,-0.29498163373630204,-0.03605526529864056,-0.10036976785099805,-0.1296522298829066,-0.6136773941706593,0.7341021392154898,0.8433193593170341,-0.036644654103508145,-0.2712574465256443,-0.3352625568217804,-0.7578158101552694,-0.7080698749707457,0.6748988056773757,0.8185505330021541,-0.3355562161221579,0.7719395669268376,-0.3628278175167359,-0.5351491809815978,0.5724485014064995,-0.9975076343700717,-0.7988221487888669,0.5918242990218228,0.2270035366376426,0.2713698888910492,0.6063707921913881,0.7089857475752601,-0.3442482200210213,-0.15584927334324306,0.19591608480292377,0.19693073668107486,0.5245851233833956,-0.2669396942359237,0.3581292549775519,-0.4949463652437358,0.773722849371679,0.7573555194975228,0.5289846566288441,-0.9495826407809966,0.5441150302144426,-0.0939717555569306,-0.5954986355230809,0.6419020302195606,0.4638938505964827,0.5156145349202164,-0.6734984022272488,0.03973210034919905,-0.7215025433793056,-0.024788596970310106,0.7275997631454523,-0.4266545780180975,-0.9414851881858182,0.9319061625614298,0.3731179323145639,0.04508105800935347,0.3284682378518786,-0.9127435880325052,-0.5607118949862224,0.8576098589873942,-0.6184362529359841,0.4276821933271582,-0.35770419555796673,-0.988667433729109,-0.47095394451829,-0.335597999132081,0.2922287866062878,0.28618424289780764,-0.17979966463279506,-0.36387863727981085,-0.238513770098566,-0.018840100660691306,-0.5883288302632739,0.39515050491859194,0.5301270809527523,0.7854209530226761,0.5147551821356,0.05454532683588509,0.541899757624901,-0.45581891196877855,-0.5071714066020996,0.26541538431897127,0.5246249963995147,0.7464425267674937,-0.5862967652798035,-0.9279187791057444,-0.5354440678317864,-0.8495491000351705,-0.9053621601344073,-0.30330013299642955,-0.12301647068760113,0.23960898780492768,0.0076385285907609735,-0.06148099449788402,-0.7275483957390119,-0.8058400913243884,-0.8271027505470689,0.10454480877761663,-0.7202564548375796,0.15681457088549333,-0.7020793469714661,0.48092263002204305,0.4743931747626582,0.8548436762219338,-0.7660404785000692,0.2836325151243373,0.6939496602373936,0.8953326358280216,0.31524909979497373,-0.8140600959415076,0.017414251268447423,0.6681415493447385,-0.38496313471066523,-0.15202231421604262,-0.6740446192322569,-0.8581830126300494,0.5350110636920649,0.2648061765729923,-0.4556074802195571,0.729229591031022,0.1281738538643875,0.2513008828959098,0.5317420063454272,-0.6830964793789067,-0.6624045932768676,0.15835031307226988,0.9914707461671752,0.5616537359691232,-0.7165226117783994,0.7044400006616933,-0.43757610127214,-0.7399380730103604,-0.09785571774384838,0.9536604179530661,-0.20961039676990145,0.23757402463752575,-0.45874561182821827,0.8014687752953673,0.39914006956055426,0.9288747022786623,0.24954882195599648,0.47354464727623924,0.08475600606522038,-0.4230957899231389,0.07932967939189073,-0.5386891452965719,-0.5665799600801189,0.5118376454411773,-0.9627586925135581,-0.9476933449140437,0.7483198939074125,-0.3687094854376065,0.23989234316524,0.9785371091741464,0.7671688484736268,-0.3314082435052801,0.8451167489975879,-0.6096007157589338,0.9872432002139306,-0.9291542711775311,-0.04443704138966531,0.698783556240004,0.7764733891592681,0.5925431546803899,0.43872672600582163,-0.5670948086164134,-0.06635073497944433,0.6668751973843525,-0.42779791862826544,-0.08096096599392588,-0.22834854131698457,-0.37120915074799,0.23004791443564754,0.16583640082622653,-0.9105803833720625,0.8471896442199753,-0.5061567360637733,-0.9682554142605375,0.3466143616334181,-0.004091917824906144,-0.4949215183295226,-0.026866207458207114,0.2656225203555378,0.6072722755433406,-0.12592465945336162,0.42435741961927365,-0.3233401387374135,0.5345822458613774,0.435682791463051,-0.4305315978041939,0.25172957066418755,-0.4926318736610913,0.20723243700055383,-0.2843664747668324,-0.7475953099306438,0.12016207301610304,0.6493811837822903,-0.9828570695060654,-0.2293463361906758,-0.6361882313312321,0.7038572090027935,0.5482335111849714,-0.4542047316592459,0.11466678008688058,0.11096074295852176,-0.9494859009188441,-0.9927927964012411,-0.41095530408471914,0.9094227696192623,-0.6239158301238703,0.09392798365989741,0.6615879085917928,-0.1860661978751721,0.643351233831889,-0.37296367236975847,-0.3792294798442324,0.9777425441612966,0.7833128054114322,0.21240827200368484,-0.199649687494738,0.6333511615892586,-0.9390766521138496,0.6079336387830097,0.4469607592740954,0.9481739818060593,0.8266448921654672,-0.6546299031646017,-0.20223711762478347,-0.840050440215875,-0.4693134230637188,-0.05761630366544823,-0.8637773519087606,-0.15275199783483062,0.32743033087232964,-0.6857830398044928,-0.5379271861126815,0.16262128614572635,-0.5409241706345931,-0.4080865428345106,-0.06491508475530106,-0.780523172579032,-0.5853675127468714,-0.2177631997392675,-0.980421589770359,-0.6574606716321378,-0.3396467816922013,-0.5302131807372894,-0.5197593901917559,0.25650645770827474,0.6391079533217252,-0.20530628808722584,0.05400796330798574,0.22949118237512556,-0.6660357338561966,-0.7198740167913824,0.43567689393862663,-0.5625573177256196,-0.3506601644592786,0.3817183476299162,0.8671459970123965,0.1459955214463351,0.03765871118262343,-0.12815184036191818,-0.2436472204419351,0.6606146249413762,-0.07007006541759964,0.17465446645139382,0.014514647129309832,-0.18635753546744382,0.03708701780058066,-0.7931797298745753,0.8605317244094097,-0.8491731178732218,0.32810537632081926,-0.9695890171226824,0.23483997695860648,0.9866439198550947,0.26198620538818274,-0.9734676732412466,0.7678199206630212,-0.33789328518140804,0.8610363755640575,-0.4995396561165024,-0.40990709096536726,-0.8305087326602227,-0.4607780740537435,0.23376841716858943,-0.6728703188788989,-0.5233455157257425,-0.5898728312497097,0.1527362558109875,-0.07665952245635754,0.44438152077927473,-0.6464182916152894,-0.7677623616907732,0.6887999568958834,-0.7727573783534032,-0.5239501424994604,0.24192098027460718,-0.8025800935585297,-0.05265326928861347,0.900810113106211,-0.10910521358046976,0.8287748057077255,-0.19577474881020507,-0.7866215893216184,-0.035977749072599874,0.6894916767232742,-0.1112474119175948,-0.9601764095340273,-0.10553964909071611,0.9828356225981842,-0.2809925351241711,-0.5451514645795386,-0.17438234933061025,0.28061495854822205,0.9360362380435059,0.668619549537453,0.4695076253328425,-0.7041532467775058,0.685730195377376,-0.11109398790579217,0.8214354914563247,-0.1318021427264746,0.22328169124679142,-0.346819077866789,-0.48541473278502467,0.3849737119223069,-0.8787803960216554,-0.9538319627478193,0.47990090791629036,0.9089666544274477,-0.05696576674494214,-0.9751111029139379,0.011170256301747283]}
},{}],74:[function(require,module,exports){
module.exports={"v":[1.4814066794597998,1.44847679324196,1.0011051824072204,0.22292295102761983,1.7451193075194422,1.363548532473109,0.13152190805241215,1.1379149215575661,1.7857068883267302,0.8218576759471898,1.4849179433683588,1.1863294262992405,0.5120068698983022,1.8599947428917796,1.2344766561227494,0.1082034908619045,1.387868131034672,1.506936535022994,0.7098562242329662,0.006460839637692839,0.0072552040276154806,0.09558540271592753,0.34519652141212154,0.5771540835032329,1.592557882462868,1.5096312364532687,0.7719795302854551,1.0647215471397908,1.0353069571273141,0.09083344266509652,0.12373812185059707,0.9412858057260767,1.6741604970518744,1.527999449486622,0.8640472881600103,0.8212889671283028,0.5449123012398602,0.33661197065177806,1.0509260755700338,1.5115374336652088,1.622198480334744,1.522252817455621,0.7240603653921673,0.18316953297908478,0.2664450004677237,1.5055938972831298,1.4278456091647431,0.8508669527909896,1.6179534510713016,0.40985867992009295,1.41745978596289,1.2686320262203497,1.5157442929976783,1.3145676194549818,0.4397504745819387,1.1960951622101832,0.24569503159763606,0.9551761076505629,1.984088342646786,0.7101283097040123,0.36650338772111235,1.4727994489058367,0.6280250364343778,0.6005952553841052,0.37014624210626756,0.5104445583473427,0.4521402670725556,0.5412378130629381,1.586312234865932,1.8407534484381838,1.0998257778953233,1.8082457735226756,0.956234861696796,1.012393221421537,0.11079194966636674,1.4236260046118896,1.5781795824734082,0.5112562652113208,0.6380603546979837,0.452423304770182,0.4819516384039306,0.6665661612015548,0.5865036287035412,1.4622116413928619,1.6816602214188325,0.4076797355589852,1.376574228699352,1.582399418164488,0.4293550643651658,1.407485009371101,0.3800619527535911,0.16665066297080822,1.3329096609784745,1.7085905186423318,0.477503827266911,1.2024760313084517,1.2398512732589242,0.6930050285333702,0.6250304757683618,1.1123351269837167,1.5363560474874642,0.3169873078756953,0.7447041664442358,1.0483172950758877,1.4906553027453238,1.1756501467926244,1.6670275437061242,1.2696487302581487,0.879631114124956,1.3775671002020968,0.757374555240947,1.4592837181164962,1.0366679800072935,1.99990613234548,0.15294459073472,1.7345319638375574,1.4933340596270166,0.6510688306189776,0.866693103180832,1.040134078736834,0.8774749108947346,0.11717866625718187,0.009143570347272867,0.7351700221446484,0.6783100555436437,1.3362179055263002,1.2711064581798572,1.3909111004969974,0.19845267730199945,0.7517032893473452,1.5733840073108003,1.3663584980387569,1.5479187159230836,0.18330976303910873,0.737667631203407,0.9037969085734732,0.8255930499671891,1.5995237816410417,0.2536438315329521,0.8517518582886066,1.31740638890631,1.1459762365066033,0.35493690533415867,1.3046818176248522,1.017002264990614,0.36070248482870637,0.7022456225450648,0.2841179863910539,0.3040054929181917,1.4560987827422545,0.8975342326127289,1.3998585406989537,1.553864463716399,1.2483521024241395,1.2608976373187573,0.6976811363992814,1.4797260209262806,0.10040601845816344,0.6811153454864489,0.3098138211623147,1.9461102309219234,1.1520990154585644,0.9622572356548691,1.0147198024792465,0.7631469394855661,1.162370898785659,1.4168575581916918,1.703419732508908,1.4826020307408956,1.1856667025434926,0.16431524281447452,1.2890083439139173,1.5440173861995903,1.1672661431590923,0.41710906202030484,0.30103478260560523,1.84517507860323,1.611911208526383,1.5323207462351425,1.5961891173368263,1.7250876338102574,1.6366892100386576,1.6007747402220716,1.191195651641248,0.44843860945570047,0.061754319938416735,0.9517810069926012,1.0284296737367296,1.896153337512879,0.6189501541154736,0.42972792003104,0.8537417927572362,0.24065121765735142,0.5277216823122322,0.6159185876880513,0.6619481301786045,0.8830478908972474,0.3043792187170342,1.3112206205060346,0.4264203042092829,0.6555794851683547,1.149258801393525,1.4273603869717424,0.15271374984159936,1.1051783842643235,1.928365772893926,0.7576379575808412,1.7810208712211382,1.212548503929776,0.9962354270295566,1.3113633426941846,1.0046116939710839,1.5602350526634017,0.7400256478069052,0.028295213537907316,0.7086284116893489,0.992496360858115,1.0815909257034715,0.7688364799128138,1.1652689327261565,1.3648476627690114,0.982698361051904,1.80007592300317,0.6862348614561675,0.9678038028965612,0.6527431584500758,0.7795266777539962,0.6043215024802504,0.6432252974615595,0.8504028869394884,1.908809363031065,0.03553563285874439,1.3410524947135274,0.035275525389447004,0.905674327680873,1.0911573237351178,1.0963126617667704,0.4371975961185961,0.9832086911367641,0.6643269136094809,1.0416506828249177,1.640300517451466,0.5131894982886065,1.7579925851187062,0.6054074254182793,1.8083336181850158,1.8972761331973769,0.6441830863635345,0.5889891945626271,1.453396276244328,0.12910767784182564,0.26013383400930845,0.7351886550880526,1.500865502489205,1.4213650821752224,1.9297544700602365,0.2527552258171806,1.3515069305704053,1.9215566780209121,1.0256040694459019,1.5501299917154694,1.4199511101779376,0.8965070325318694,0.3156101459450009,0.5181692119816077,1.4391624765181237,0.31803459600434136,1.6672667711439808,0.9635740980976468,1.3760956355157288,1.8725579818212434,0.11517668620852284,1.2971042378092439,1.2935024619534903,0.7638471383100023,1.419459355689002,1.2694655423890633,1.390112281040679,1.3829997411837889,0.7617170017146195,1.511783814848004,1.986740743443618,0.6776359277569433,0.47472614680634795,1.8874187501045911,1.0233928188794033,0.9679224041641703,0.03823497970404732,1.68922577086159,0.12280005369804536,0.3334995771181912,1.293771367839915,0.46019769502995134,0.8683751092160401,1.2992091570564184,1.0102937753416663,1.3318216297570777,1.7867054054128246,1.44806524653721,1.7736135571889262,0.9557028884688856,1.313039650913252,0.7767906975629302,0.9972392863416006,0.12536213708280108,0.9145230764728076,0.7519656161148274,1.1459310742439226,0.7049550474724242,1.4947747966331826,1.8173019758900821,1.5539568539043311,1.1279814508862822,1.863025771046075,0.9764804415423911,0.8139773160716346,0.15094903889532985,0.20272913992520625,1.7100199511123289,1.5480212666471087,1.672847401234927,1.534618833416022,1.3041297236240954,0.8392288198209372,1.8815371673109818,0.5664572048620511,0.5279858331257841,0.09619083824163566,0.09281557147382058,1.3176838822368144,1.8315290199088037,0.9507365210611094,0.11528475250035441,1.352793341079352,1.4005103639903025,1.8417120476470061,0.8775104077131655,0.8304909909208282,0.03311031766042216,0.41135013306681945,1.7579737684761834,0.5106604657308402,1.878085294306421,1.5507821597503568,1.2501232823227184,1.7000141046221264,1.517488346964083,0.48285034837064256,1.9456139822574867,1.6843310667024909,0.5030306587616002,0.6004550443610173,0.38358418522992155,1.2063252410561094,1.2878476521215645,0.04425069843002527,0.8661202626226463,1.06440152419448,1.3344955989818867,1.9405771936543874,1.9094646473186558,1.009430232107983,1.1553226979408673,0.17422854216337402,0.7961991841941147,1.2438171928253148,0.9735017830068564,1.2114382569865314,0.12988060536402068,0.555645853281237,1.105954462773826,1.2686813115888271,0.4574895039404141,0.5163782051038752,0.8687307858564646,1.1557282493840648,0.702746488612894,1.9631820959847084,0.6966838026586335,1.988133166691123,1.0209575503671005,1.1021525606169629,0.7385849040643695,1.9648670286093695,1.9225903175174435,1.4069002184029524,1.8165159036018346,0.24422857557046473,1.2020485374697296,1.703011626300671,1.5229185741759768,1.1670155975880254,0.1558181140527295,0.1079826577586096,1.8477247627831486,0.02686878748693644,0.3898683056852872,0.6287250944678644,1.976670248820199,0.9382872098814685,1.451734286263227,0.15141413259836334,1.696228690634995,1.9696256766069942,1.0499074331356817,0.4631653144119845,1.1696672717564551,1.277837958599759,0.062191514556988015,1.7198585369295198,1.750702285310457,1.6557026512363788,1.1862851735955209,1.0276457228948384,0.09011240900206996,0.8074637065081656,1.637289714191824,1.5894225910726756,1.3756830739786463,0.8775486163527719,1.1987501232033222,0.3498525448707004,1.328399708923227,0.5290162833055838,0.04520436641931269,0.6614856508091145,1.6986985424661114,1.5124850548464646,0.006341495671082775,0.43752081147273225,1.1456655607218043,0.493044113710118,1.1978580539676713,1.4109509544953518,1.2024219903214877,0.4523432611134641,1.185027962790389,1.9645221636314871,1.8536413438000015,1.3810783486868692,1.9047886693136769,0.5752852721626822,1.9720306596453918,1.9037857938922946,1.689464949026101,0.9267170852800208,1.895244802924215,0.8491957008673432,1.2066988257354048,0.4504314596325698,1.3555836148979554,0.8312432643670324,0.7673948022637793,0.6430972325138993,0.9812937176076195,1.8662600454245117,1.0268081397046962,0.9947859359281921,0.7201212209610173,0.6893467921035161,1.5584977491696597,0.9814879811785362,0.8894449350748705,0.16992310410851896,0.5523721724840724,0.5937631883873213,1.562101624282827,0.4242086089530295,0.1734574474926398,1.250578784311419,0.9622434441877319,0.5793933996472678,0.7912240198152491,1.127903191678179,0.26723980770105715,1.5533093987567113,0.6381037382073562,0.09401770895695494,1.779268671612896,0.4227880331771634,1.3477195836626326,0.49560800713380004,0.42851993514347786,1.6308080252666541,1.903799502624894,0.4884140862983535,1.5317555536867506,1.979808191600402,0.47872735990017645,0.7773661823931635,1.0943600895713654,0.9039712355543577,0.9737407039650603,1.9605330799118779,0.3761795408517168,1.0446049244525901,1.4060451462500967,1.6975963174478226,1.5928774737622544,0.11066952280777453,1.187231321787647,0.9520890425010213,1.4919868066605106,1.7560029729555255,1.5565925645480747,0.9150615027606013,1.9558695088529294,0.6321279259800292,1.835854723417258,1.189685251335853,0.7090536052578371,1.4456857489604884,0.6510532508092242,0.7658549573340783,1.2172505349409621,0.34131292868341045,1.1869148993602305,1.2325897032817892,0.54129504167638,1.7083323993693336,1.093841299958069,0.4574426263021132,1.7802867570893897,0.3331048473217999,0.7276098390010275,1.9112667605122606,0.6548635527884339,0.26235108183812006,0.8956808052017107,0.31300316930382,1.7389638518098862,0.9201125779287906,1.8175678764516072,1.7804717431815025,1.2706166179570322,1.1876965111082627,0.8065183094746646,0.11741215691882356,0.49826682091300745,1.0606975969113024,1.4585015650138922,0.2984645328692537,0.24499964853303036,0.8333357249793387,0.4379766610509659,0.5928090301040028,0.19227689036367357,0.6616461984798256,1.6955709537286014,1.6404705754376687,1.2076597384882763,0.4405910287152741,1.921875624557741,0.6486787768047306,1.1636952417353417,0.6902860859059863,0.36936476226378145,0.013332132938669083,0.5202577279356575,1.665288235614001,1.8399618597956335,1.3915127515083068,1.25060362168034,1.334001453550071,0.7298280581349172,1.655764465536075,1.6423254118555128,0.6067190523524761,1.259630218514919,1.4838263143488897,0.21376584461552106,1.0744658232024373,1.3749765894413404,0.6624039189742223,0.0800449952058524,0.05680684314136242,1.6094215788610335,0.37633727537010797,1.3112485994753613,1.34199381540979,1.4324794869833593,1.4818701453175018,1.7153752697840865,0.5449700770397574,1.0541846302305737,1.4478489257420177,1.807796011596431,0.2514906529255212,1.877619544557958,0.0057439741772769,0.8522843526514321,0.5788566919009632,0.5862270126681626,0.4131262514222107,0.06960789740967632,1.2877705653662197,0.8244883723854453,0.9836811966369292,0.46990833056351855,1.4944804784072754,0.26977451589107826,0.9750779204489528,1.445277997081003,0.36151276465095217,1.524747276654609,1.7577373258269136,1.8037771386391857,0.9792196361719312,1.3929937646649782,0.12276535957376389,1.2350438070706171,1.767921452405798,1.5661350760008537,0.46070204495969325,1.060014707425987,0.12348500307902865,1.090057540889506,1.6096031033515459,0.5178210971178228,0.818126513743771,0.9304896818706592,1.4201048772367386,0.37672482344725955,1.1929247655460409,1.3615058633718076,0.06349519930621028,0.4257890506777522,0.52324258634154,1.2967635573616727,0.929166764081828,1.6382135768745454,0.54521870569392,1.764440836038994,0.8227252775414522,1.6351011790893994,0.6319648564642444,0.7205856677565703,1.3822606748884452,1.951751396672917,0.5309288118419162,0.8755898723348752,0.26632904662189016,0.7857310331298302,1.4258249898628237,1.7260984620989102,1.1795640153073417,0.18590144902253947,1.5275980647791285,1.3832375026130213,1.1834288944232867,0.1289454684974829,0.0915993619102089,0.6411920912372295,1.279676803420899,0.9271970728408054,0.30301398244308997,0.7485153158058804,0.24189679946339382,1.0122474437479516,1.4314611327197113,0.6506606371429968,1.7399682942528676,0.9777359762933204,0.366170374059823,0.2611989538883055,1.934471741027136,0.5361390417977958,0.36751864740890383,0.04660460212283635,1.9224908021923857,0.24748586370063874,0.10985158423839536,0.5641240281818867,0.19822710182304082,1.0866236224747547,0.48476591319425655,0.13823519118517735,0.83566199831882,1.303856882312009,0.6598542200037971,0.14030109866047047,0.9312302112064947,0.6528602869140445,0.9358909479257997,1.5023353263612127,0.1307583503833314,1.98043151261213,0.4171991130956654,0.3106976344206709,0.11077988905294323,0.9021092340418364,0.8454048697785237,1.5100334107486275,0.788623513007527,0.2496900923527261,1.1123214216499888,0.05050548790236986,1.4446322206942588,0.17192860199161597,0.934813627201228,0.7031412397036081,0.18744046311803508,0.7434599332801679,0.3829554132156785,0.8715622192398431,0.5440670013117219,1.3629874268644055,1.8359587923148935,0.016440177171355153,0.052247795165999644,0.08127056286257694,0.2736992775798779,0.349743090110624,0.6893980166554958,1.1608667392393595,1.9318449885799005,0.7075939230260078,1.327836541145384,0.8523706463338363,0.6986366866677902,1.5197901752574805,0.9907200435851391,1.4194223668861312,0.5324899580664466,1.0275091393467788,1.2504766310110336,1.20956327825757,0.06181997013013696,1.1382571746127654,1.0673905958592496,1.732929733948986,1.4393964600487275,0.7384401303644723,1.9218839387034894,1.9385912621269474,1.0265839409856445,0.8223777334315847,0.20994456875495082,1.0154455008574823,1.1749851184712292,0.18744659486013138,1.5161272797989795,1.116060837325343,1.7897398399890578,1.8712566006237852,0.7216873369484684,0.7136565030671735,0.5268862183032437,1.3968624811096952,0.3649808601800455,0.5234222749526918,0.22915459385881176,0.5626820239773376,0.47723069143304375,1.880803297444242,1.5074142185378459,1.48089708208173,1.8081276038424052,0.8575710713522646,1.8316226429398093,1.7122881070703833,1.3665565934127448,1.1831082130541284,0.08278071318439162,1.4993954977909905,0.4857745771600781,0.7031976882528577,1.7338023815281582,0.4836794849672459,0.5332745953380229,0.2437342264012461,0.5110267596568496,1.4629103236024874,1.5588910845828123,1.3329242603739653,1.396722913486018,0.0005519283411605791,0.7416386346326518,0.7746841636957611,1.1811508235240091,0.2348676379017629,1.6024460968259624,1.2960924814372534,1.003056996850951,0.6429752250954479,0.2782587522118978,0.6774144987636586,0.9973350171534654,0.7460404666281479,0.8301810067948385,0.3589357728354483,1.4530843188965203,0.7689009632106099,0.745875737910008,1.8239127309268905,1.5581939555125497,1.8014305733465497,1.0367993426163662,1.2000238936302345,0.5812593350241859,1.1838571488672014,0.7115876283734197,0.02169705316527004,0.1972580020147885,1.094892440092527,1.408037857788143,0.6501537222866416,0.9245461220128925,0.5328002125621456,1.9192433890378258,0.705108326205452,1.3643041335863146,1.2349008619923914,0.3666063947781284,1.7509936318486785,0.057484786867621374,1.0344129376006337,1.3873251309561745,0.11525885426483518,0.3917237770209101,0.5860911895296987,1.5269709660763144,1.3994468851776327,1.7291451317332025,0.588686950719032,0.7674357149867448,0.5540211582006016,1.0335415954880878,1.0812251076694257,1.9162251536796253,1.1149737836816511,1.997729618401261,0.7575686917663056,0.3542605721356642,0.21015366585843465,1.6849682197038787,0.8276003500776845,1.7821101808137936,1.526599114239231,0.0013214924307183296,1.9505032094622323,0.9542099191944677,1.885053942318593,0.17140769977030068,0.47239774763932907,0.6533576061696396,1.6127077055714225,1.5611925325325893,1.1001871237275833,0.42974661937849357,1.7196251063339059,0.5513874901462779,0.1498850203705846,0.40416462470697345,0.9862569716131899,1.9716226657747433,0.2109095581989906,0.22685511267872727,1.3622702605389083,0.817934779996655,1.7779671601773641,0.32043624179513674,1.4283030666550203,0.7771271462337261,0.2969610513379841,1.1763882355685031,0.3113825169982136,1.1189765651798411,1.6974116122399416,1.3452365680320528,1.093969646954804,0.5783865068447125,0.44837869818980725,1.174379058194225,0.21451191586421858,0.7017784393470499,0.2939452106557914,1.4331287378087425,0.7228050558703147,1.3902060293607033,0.6740991712862017,0.5991973341502366,0.2982629860135222,0.2470056723463303,1.259877669661432,1.320828350318235,0.6083831828099076,1.8514912018794214,1.7374543781543226,0.8177034896397655,0.3443851306599086,0.7640262626772087,1.2589750148220151,1.1573231498945376,1.957966239931812,0.24678498055014764,1.9821912703156244,0.5123191778606087,0.531062910397472,1.7122851012489102,0.38807190663446356,0.5724820443850542,0.535416045046222,0.6647477454609567,1.5155945525510028,0.9653161909867771,0.5746938140464639,0.8612417595421706,0.10981152751871948,1.2228102386111002,1.4968022732805428,0.12330981170257616,1.3405597275928067,1.4840991298626371,1.2732209502246112,0.21266378867426505,0.6468420467822207,0.5743044090163161,1.5602025101400439,1.336408310774082,1.2480080460364205,0.872960939133264,0.9847911370873019,0.38440101662369175,0.8736241631640573,0.6194848390105152,0.10371716718816071,0.7395250904098458,0.28828566528058586,0.4330106970206473,0.7038339831111529,1.5219396497073343,1.5492652757793919,1.696401912083389,0.5875984938128753,0.5743639755029397,1.7391366287352406,0.5957769628128364,0.10431479199758265,1.1636088775742865,0.9789605370854173,0.7875574638637608,1.0896808619281466,1.7727248159026514,1.0812996969788027,0.6745012252410607,1.6212880104003835,1.1208174136781817,0.4423801805388181,1.0440836172136185,0.933631197160572,0.07622966445334933,1.8013490363931637,1.7581346347717952,0.11544452257020366,0.7618152964413754,0.6805886936462868,1.3771993636570916,0.611220108333129,1.834057469652027,1.894332551962468,0.6832378107378876,0.7201654838812765,1.8545109415505232,0.7353072359273884,1.1325476526606169,1.1259422273850208,1.1729738962351846,1.8562187664077667,1.0222002671078099,1.5382686087843065,0.32803503564913417,0.26058583353845677,0.6380398321029705,1.2507472958638486,1.51293216211663,0.7765224521885288,0.5800405622909603,0.24303033911833793,0.5215693381906177,1.0691206350261395,1.124771436817681,0.8621047175135192,1.2836148612485654,1.327013017705292,1.0993554638827163,0.41890608765884174,0.6680815391597577,0.0802119724244128,1.3080544331428543,0.593311772241429,0.4360398244999577,1.1382187200639877,1.533887462431378,0.3047598019093085,1.813396670860413,1.4476486709936287,0.6703477621838729,1.3584924916108996,1.283664593903346,0.9647429192999479],"expected":[-0.556134877001835,-0.7898986351254931,-0.3420373843022199,-0.8892235871295274,-1.4704986508922744,-0.6034466383959507,-0.610408340688758,-1.1175626206887528,-0.29799914620499185,-0.4614248715123288,-0.7695828041655245,-0.6376178531114952,-1.1502184569377625,-0.6841446054927475,-1.2914347569995852,-0.5314262115679831,-1.1448023815279629,-1.2583465322997436,-1.149855032063844,-0.674970477447148,-0.7142985757863748,-0.8422828523381422,-0.5856304413564408,-0.47949692387100007,-0.5380275946924659,-0.4226303204992093,-0.4819230643492598,-0.9135435659536761,-0.30221622642425977,-0.769730453187482,-0.5474136269305347,-1.1464718245837622,-0.7886520186158188,-0.46720972154731794,-0.6152720424186803,-0.3938220839730174,-0.35952398711040645,-1.0136547014340072,-1.3282352412424427,-0.7336870134884925,-0.2735213235910811,-1.0365585422956092,-1.035901245026689,-0.5693681098060726,-0.5038525234114748,-1.3349865256792608,-0.3995131650374952,-0.741721041180727,-0.7552402604412215,-1.0966405155599928,-1.3750975381360175,-1.224937210335482,-0.6322825341430421,-0.7200473652663321,-1.040266773913009,-0.30712219920042594,-0.9127025239111649,-0.998892812685181,-0.6680519642266234,-1.12612991472753,-0.4428401027862018,-0.3386002679910429,-0.9745707309136584,-1.0318118535451977,-0.6756945625502815,-0.7015461676793048,-0.5575015484826101,-1.099719593710362,-1.201481337913033,-0.4176863338730432,-0.4030951388356791,-0.3988535491316324,-0.5029090376670621,-0.6283697430220047,-0.5376465541209199,-0.31826415911951444,-0.9420477149798372,-0.9631499829327261,-0.8406937263874192,-1.130858762124785,-1.1382833028974995,-0.951569251655388,-0.4797406264345365,-0.2642758411561225,-1.258837569854281,-0.5142045539414818,-0.43708865022509985,-0.29309248386103226,-0.5175547856396028,-0.360915310445404,-0.5005680677329627,-0.5296681831662449,-0.38805115482014635,-0.6526913085124423,-0.41051298495033994,-0.6506379581187701,-0.580930368016686,-0.570579293811746,-1.1217030882188437,-0.320738113076164,-0.5253794679615167,-0.9096873179116631,-1.091101873835059,-1.135388532001798,-0.3250044962458481,-0.8080043855900568,-0.7980720749287968,-0.598748603709131,-0.7794137099933915,-0.2900757504665467,-0.5546280946261795,-0.29602258334022946,-1.3467024940310064,-1.0298949776265705,-0.7990666038735937,-0.4851490847570026,-0.9184315825909103,-0.6776453895340163,-1.1385269829379607,-0.6245478641547532,-0.3349859107132091,-0.6623373268792837,-0.7199793665233089,-0.32693207354889586,-0.5933940949957703,-1.2178261572656872,-0.500692271302928,-0.5867051840528557,-0.8682958085756105,-1.0655777290515207,-0.27637524353924947,-0.822420510106615,-1.226668337493765,-0.8766017693381666,-0.4969677713336159,-0.8058280328209557,-0.32336639244142207,-0.4859018032266344,-0.595254395713422,-0.3542962053708008,-1.2363681465014733,-0.3615916897779046,-0.8420273945414501,-0.4155966721639298,-0.9162495323082528,-0.7320127256343707,-0.8187494898844041,-0.44003068854600924,-0.9616797383546832,-0.7090985682708065,-1.3350951211945703,-1.394450291732162,-0.837748034312979,-0.6992806622787057,-1.4422612120854508,-0.4559262148472822,-1.3065809894544667,-0.8572125032620295,-1.240476548141854,-0.5090964975795413,-0.34958048847914724,-1.2107045513089667,-0.8679615182412233,-0.5700503364233344,-0.768920606131336,-0.8388656718263284,-0.8084642401669266,-0.4337172508435383,-0.5027193276896083,-0.7827133496369674,-0.5793423651492743,-0.6004758026028046,-1.0775574794014027,-1.3593952230739537,-0.6215323526038423,-0.983916564227097,-0.5407536570295637,-0.42528865753162326,-1.384954888302484,-0.4400628382878983,-0.9123248565133508,-1.1821054501695374,-0.9247846691780817,-1.291682593926788,-0.6833462910513337,-0.5796553229666358,-0.4256446037870665,-0.957244910467084,-0.27529247276181323,-0.6317554729348089,-0.9587027717576242,-1.1954711634807527,-0.4781282381178801,-0.5875656763542829,-0.8120946144496088,-0.8738761576214027,-0.47184237517647465,-0.6559374804057282,-0.5536980374964624,-0.8580390769723487,-1.2667004618218587,-0.3421072567167638,-0.9290132493984161,-0.8964163969691767,-0.6596983591580201,-0.6417046723406896,-0.3351680103968672,-0.2634344910767861,-0.43962559958633307,-1.2376528514997003,-0.9374478181951587,-0.44557622306869116,-0.39864600159603286,-1.1786184148864502,-0.6439608139667035,-1.2557282857433958,-1.0994711330867908,-1.01799676792273,-0.5144259201129973,-1.0404920961947257,-0.30035871341239606,-0.5613959844410356,-1.3481946567073395,-0.360755999460344,-0.5531009237759918,-0.34515190111431476,-0.7216705890214072,-0.6133285563674812,-0.8221881399311548,-0.47253284053532135,-1.105503204542066,-0.6191714655418628,-1.1771307532763298,-0.6294259128394291,-0.34272631176985524,-1.2388489398605835,-0.4503306782565961,-0.9272538988747612,-1.2419633714505813,-0.3518715108980698,-0.40306132764933167,-0.6051737616941606,-0.8667150315238519,-0.6205603216539675,-0.5409638521610077,-0.4703573137625603,-0.9902683066184643,-0.4129650680271407,-0.7647057602122487,-0.499881415709052,-0.775991642717412,-0.8197526615308802,-1.0044274144266834,-0.6257943765544864,-1.098181577174493,-1.2410459855040177,-0.5416901181380418,-0.2854599458204085,-1.1603503794462224,-1.2857988326205039,-0.8519414296126967,-0.591973307894718,-1.348944100530006,-0.48850757257576227,-0.9177349029999221,-1.075040198700946,-0.44319641763528184,-0.36853718267687385,-0.33082174650397955,-1.3146267419894102,-0.2649128171573562,-0.8877274076087174,-0.9065332506067415,-0.6308992030543146,-1.29843628951162,-1.148052265760755,-0.996828450781367,-0.5437980138253595,-0.9268024903555768,-0.8279701447444469,-0.3369302510843837,-0.24931154148897539,-1.0585736818026943,-0.7608178819903759,-1.4385457292159654,-0.514975334268045,-0.507038404536297,-0.6326128751853208,-1.0183905004966447,-0.6915034909551073,-0.652806233169923,-0.837537058969675,-0.4473113946079368,-0.3489158189439383,-0.8376296653369928,-1.1917571619000822,-1.3155181061003516,-0.9946732454805332,-1.2320815342256468,-0.25361808719931583,-0.8626517990171308,-0.28100981407384334,-0.48231778302277595,-0.36355357270697275,-0.7275332684486217,-0.3581792825825203,-1.1195395846285676,-1.3804944926629255,-1.0642453277165742,-0.34684104986834574,-1.033993343006962,-0.3582957081560915,-0.6006376824184113,-1.536887641364674,-0.3083929753294818,-1.243617130212602,-0.6365546473944754,-0.9198659315966755,-0.5369989135544178,-0.7925362017460891,-0.5257802967444694,-1.1353015080605564,-0.2726885256453599,-1.007062971791184,-1.2914872105503088,-0.9454341110422386,-0.5208145881119894,-0.6327786481614469,-0.8514168892681248,-0.4001609144728882,-0.530328028493916,-0.9103777336223335,-0.8114810674541159,-0.6098597441145971,-0.2931571430381129,-1.1107255389838149,-0.3846963622357306,-1.2180575883393714,-0.6316797027123312,-0.49525768057034747,-1.480131007585631,-0.45200917980736144,-0.3709866677820314,-1.2135718208138653,-0.9751804689467967,-0.4822874398801375,-0.7950287112278015,-0.7495689452747833,-0.959201094052428,-0.8361109022032194,-0.4851012316664702,-0.6664277141298781,-0.4098312892757766,-1.2039737947749845,-0.5973643739061756,-0.6589109196185459,-0.4209226971341668,-0.6025511346656699,-0.27725858854121266,-0.38139342907069884,-1.1283497252002648,-0.33370951333727816,-1.3089089669873415,-0.5912938886907924,-0.7819521119918397,-0.695493495371863,-0.7469851542701635,-0.72181321017884,-0.8974668093423808,-0.5423818528253357,-0.344477652700581,-1.2305708528839476,-1.1254916057761557,-1.1119905794240683,-0.548845633765167,-1.2013759738736196,-0.9310349740048227,-0.9522567715772593,-1.1039666002881803,-1.519547132634332,-0.810855564774677,-0.5311795584769113,-1.0040101479683567,-0.6905898264596715,-0.2783477257957427,-0.2925148625704224,-1.5094003663182107,-0.8055275444874919,-0.41989513109144694,-0.3532241751550072,-0.29026561674211465,-0.506649597709894,-0.8239688319102567,-0.6757390754583014,-0.32319029015444956,-0.7309715188851813,-0.6550333042447964,-0.3866351028618352,-0.3236846305550827,-1.0225942074125527,-1.454273125632663,-0.7625204959195331,-0.44207346845505807,-0.29060303873319326,-0.47759903111800595,-1.0966018591888333,-0.3876240070833797,-0.2978929488193498,-0.8120204986663105,-1.4827987294663485,-0.299483566900177,-0.5521773930584444,-0.2921562632111876,-0.7733618510519665,-0.7742231463371786,-0.3203358508612383,-1.162817666254515,-0.329254262125257,-0.4032059684458616,-0.48223208507714715,-0.7288196353644751,-0.477574285506643,-0.2742963400032793,-0.5064033686534314,-0.7839355723745332,-0.7974968731904546,-0.359362490658809,-1.4238181732282564,-0.7058493178738708,-0.713959783076293,-0.5232371522790283,-0.9910228076098708,-0.28303245295789176,-0.4428836222215613,-0.45499171046061315,-0.3971716009074524,-1.1674143850999608,-1.3890261209852963,-0.28863037942499375,-0.41875111233216744,-0.7865916437488534,-0.4334407269773895,-0.24976490294522788,-1.4750715116695852,-0.5225172536352447,-0.6622064519929542,-0.9110783123220567,-0.9799697007269719,-0.48387059801386817,-0.402601486338665,-1.2515035880819227,-0.5416379197406029,-0.33982040646352407,-1.151247963293763,-0.6606659883364472,-1.182937720342462,-0.847391824172406,-0.4081343089621477,-0.8021037496476786,-0.3324790553761925,-0.8886634383641621,-1.0839813226535178,-0.7021863394097543,-0.7482079904672995,-0.3582921441507092,-0.6887972085466826,-0.30614053393111407,-0.3891116781286728,-0.5284253009340141,-1.1373623962859316,-0.39963265135593673,-0.4205592355266926,-0.6670181623263209,-0.40208913281393277,-0.9963737302084499,-0.3643253756045276,-0.46972726965723577,-0.6576767883546545,-1.0407467745822612,-0.6442982738563026,-0.3361900231145595,-1.119939008843996,-1.0929736181126097,-0.27352184932546364,-0.9555684075504169,-0.5843438746747357,-1.0683620493684052,-0.7705839914038047,-0.6497916178707042,-0.7035274914151389,-0.962099530960135,-1.2846359771543268,-1.3215688140001354,-0.36713035560986834,-1.014217799319637,-0.3977256356098493,-1.3077600931041848,-0.5950327512952014,-0.883491924167727,-0.8357714542113276,-0.301398693352558,-0.7245147940542187,-1.1575374076877831,-0.5633063327795813,-1.2585393357782033,-0.7710203578267981,-0.6043113126010311,-0.5150810804359196,-1.2643256982061601,-0.6150642320897852,-0.8834805594971609,-0.8555336742060349,-1.1132374473607904,-0.3751995343781933,-1.3155151304476167,-0.4827412163394901,-0.7005188452385305,-0.34410183115285753,-0.4484943319956093,-0.4591168157017167,-0.3767032003641997,-0.8307488737522,-0.3852506936455878,-0.5516549754181879,-0.49169424484494567,-0.9464303495846832,-0.9809698501302258,-0.6308615370139072,-1.250997356792328,-1.0362757984583442,-0.9724337756494532,-0.7489926773216734,-0.33216081332718445,-0.4659995763992172,-0.3177602893022242,-0.5589180584116635,-0.5629897064349458,-0.8123513185941217,-0.5053035944051552,-1.1568299883443687,-0.5897599385302636,-0.5840846546862644,-0.573992295806837,-0.5685135732850156,-0.6442314641620264,-1.1198381390154273,-0.5973079771693437,-0.9023174549366157,-0.5049888525533737,-0.4031260161387919,-1.2698705791073888,-0.8773935057740614,-0.6124089149860888,-0.5248909907449151,-0.8952543700041509,-0.44077499197456305,-0.9490855765021731,-0.6700092961181572,-0.401773789610729,-0.6765999526426291,-0.7336493168791969,-0.5022711277744276,-0.75701403752035,-0.6737486641465011,-1.0963329685882965,-0.5421493477294598,-0.5147607072929745,-0.9336168548064836,-1.3749532785155247,-0.3258124175073811,-0.502135256672111,-0.8403656504152694,-1.3231260815108596,-0.7770862536771035,-0.7503237877915957,-0.6175596357344755,-0.4994434578855007,-0.6642618684273117,-0.47053825465361687,-1.0599833750794425,-0.3073148250855565,-0.8922180593352462,-0.5911552007250449,-0.4957185024588443,-0.3571388061811693,-0.5873351410497208,-0.3402142072871649,-1.002512781032745,-1.1286698545640497,-0.7049398231743216,-0.7125941421194371,-0.4358811075642328,-0.4397108006014511,-0.9616877648691136,-0.8005757308646706,-1.3194602645467626,-0.9385317315599608,-0.4675642302309927,-1.104388521848642,-0.8646151259666217,-0.4350994966872161,-1.2595171688892375,-1.3387159793486598,-1.1173831139927528,-0.5260407447567816,-0.6927571404404225,-1.3841808212804871,-0.838928600368132,-0.6114298451778415,-0.7953683496132737,-0.5011087355487923,-0.44863060870394705,-1.243507404823423,-0.3843347749175656,-0.3944363450796784,-0.5642620641789934,-0.5948396945766181,-1.1317193288057976,-0.43748061544207006,-0.9673450310652141,-0.5912806260590214,-0.517595883205777,-0.5051437337002624,-0.3613164115462967,-0.6183262004487674,-0.7012869063036651,-1.1581170777572034,-0.4215646181892069,-1.4265768930695022,-0.9502134863830054,-0.3612745656931208,-0.8325998104740875,-0.9684286282443304,-1.0306911628451614,-0.9127512458495344,-1.220253797078525,-1.234861423458952,-0.9170232453676195,-0.48932824451034446,-0.3934973543925513,-0.44213799274693383,-0.8552686306138519,-0.8527271228609823,-0.2774556146627483,-0.594924177058034,-0.47066227877202743,-0.9343873158517313,-1.3744930707215506,-0.6388457852716503,-1.3394855636219398,-0.825503663849939,-0.5634889676600627,-0.5795495662378977,-0.37692181836523325,-1.110891283329055,-0.444253502493796,-0.5034607332635762,-0.5268023189486873,-0.9735006661221743,-0.919064297517167,-1.112340405299642,-0.7152006910278285,-0.4501390258746889,-0.7628712513741491,-0.7924014863382676,-0.6742706477212509,-0.4414540869000491,-0.8740027136433368,-0.7653339252486174,-1.3297546163078042,-0.6516739483169808,-0.7972776264167354,-0.47963542978030343,-0.8906655365228562,-0.31857033131117507,-1.033338073925897,-0.5380546300700029,-0.4021176720885338,-0.39030921751391623,-1.0386072392031758,-0.561354252578551,-0.5124868708507005,-0.33283213334715417,-0.32847484541050115,-0.9474049716492685,-0.7500019468300455,-1.176760073816686,-1.0090617666088448,-0.9872009069966337,-0.8505124124737649,-0.3706487934958369,-0.3200161595275296,-1.405003046626852,-0.8111454699092241,-0.9841522928451263,-0.3149108373613176,-0.6405752408894951,-0.5121479617590433,-0.7292164034767388,-0.5114011038921005,-0.5221061800623593,-0.48345609022960523,-1.0432192645751734,-0.41060707773590954,-1.1876167548129015,-1.0284065286910442,-1.4100277277156277,-1.4682829555228543,-0.6666029673426466,-0.7052930518023577,-0.6083726146540053,-0.7350815852550754,-0.8019259034678367,-0.8064649007452442,-0.5095357623556354,-0.46570545073183195,-0.7559130918618876,-0.6636604843943336,-0.5520135170830115,-0.49704394560443427,-1.3487546443618001,-0.3139297083204319,-0.35404326283495346,-0.8516759734174982,-0.3471834170738446,-1.3244499882234546,-0.44719540426943294,-0.6583991392876235,-0.2822338539363951,-0.7737438904888078,-0.7108926652561168,-0.6670526774928537,-0.37542568637759455,-0.5263717237592602,-0.6456564696740122,-0.3385520008956871,-1.0465656857778907,-0.8381462359822197,-0.6721905773863821,-0.30245238386973367,-0.5658844979862332,-1.2619750491185222,-1.2366810656636726,-0.8516434811440855,-0.6947771453585736,-0.8744577870755778,-0.9652342305992831,-0.8609065896307707,-0.827356767057108,-0.7435054321690892,-1.066633987624738,-0.5589340370631515,-1.1798687777095658,-0.9182764937501181,-1.469419927106875,-0.5639024958416081,-1.306290210847322,-1.459043550670128,-1.1255026610267553,-0.7814448576970293,-0.5037855908276458,-0.7227928971700649,-1.0393867072144842,-0.6379460647618599,-1.0641226147922436,-0.8915431300581362,-0.6874090432854522,-0.759928165626334,-0.8474204596452635,-0.6076854319690207,-0.48064719555125424,-0.8525989743230301,-0.4093307580225175,-0.4939569687199783,-1.394950053934686,-0.42015793860118694,-0.6907274238818631,-0.5136696565557348,-0.6992534278459408,-0.8301236438445125,-0.6564872112454199,-1.0383860272879308,-0.3047828582769457,-1.1091097129957912,-0.5906241711414585,-0.7557377182075656,-0.9835111495954086,-0.5859951608632561,-1.1504894065135953,-0.7474236330584766,-0.9814430483564378,-0.9037294343629748,-1.0299804624082793,-0.5930363309912117,-0.2652315081296939,-0.28365605105963776,-0.8771899769377218,-0.30160177958014067,-0.5688785565493263,-0.42742958447635404,-0.6731099034260237,-0.5728218262860765,-0.7029590171630083,-0.4697156011459942,-0.8506724700198286,-0.9604826767446181,-0.5948698879401062,-0.5840706608869171,-0.36759225714727406,-0.631694300953171,-0.5125684153455559,-0.5664636000870881,-0.7594061482754829,-0.4479434858624592,-0.6924840469054977,-0.6111891255199617,-0.3141883981624789,-0.30504791083502575,-0.8650812647283198,-0.8832992232858619,-0.7966302656505104,-0.29463241929628514,-0.2808619226715937,-0.7997911552722575,-0.38582511411356524,-1.0357996375612277,-0.448024570851004,-1.0449510100451205,-0.29275981565084913,-1.135724251902693,-1.3913793541125565,-0.6467671812764451,-0.43053655828349424,-0.9918731543318455,-0.9498337462992433,-1.295251206246893,-1.0516885597210308,-0.6208616827175107,-1.4925857756335177,-0.698103378247638,-1.1941260546295887,-0.7976072882327682,-1.108971890838095,-0.6094778462916133,-0.8238358445433747,-0.8047449386195059,-1.048899927690989,-1.2683645249408229,-0.6643163339095897,-1.0237634571565242,-1.0707292287244492,-1.0872469543175918,-0.5808082180508852,-1.0605938784160989,-0.31995092446907014,-0.2461532813866434,-0.9456070641060835,-0.9516268176790444,-0.40389847874540447,-0.8661528039134301,-0.7315046755342413,-0.6951023581332244,-0.2689928613147064,-0.3343780813698626,-0.587884246673564,-1.3701721942908964,-0.4302381607607754,-1.3542125088759456,-0.4609407168820615,-0.3178637944370181,-0.3348932430085404,-1.0323789190701673,-0.6476220337275609,-0.3468128304231547,-0.6878537466117736,-0.5579705948264533,-0.8045796668591703,-0.4812226836471289,-0.8445675969454097,-0.6429768605042346,-0.5602109218117831,-1.1169300909815973,-0.7058242608264526,-0.7316212500761078,-1.1701078018589106,-0.8890218473369378,-0.590191438564406,-1.2556641214793491,-0.25888235248508884,-1.1618549800803328,-0.7541419253422856,-0.8436269838512798,-0.8467464385229337,-0.5453158635301387,-0.6863482268980899,-0.8032840407860568,-0.3518124901612584,-1.017109252181329,-0.4301941306857176,-1.4554471413535235,-0.9463640450067181,-1.2248721831099474,-1.0947340894217308,-0.43271557423426543,-0.3185012442627491,-0.4627204451491007,-1.1002680471881459,-1.343332498700387,-0.6769128510911265,-0.5478707413668185,-0.4360959823146278,-0.8275498972666469,-1.1160744245119623,-0.3071806397810138,-0.3008080991626285,-0.9490437234195679,-0.5120697239209199,-0.620765185012209,-1.0215894015461642,-1.1900815708610109,-0.41998023997115796,-0.3529843505689106,-0.5303334233030682,-0.8710586527815588,-0.5885015971983523,-0.9116803920786105,-0.683075338238111,-0.5993353243666838,-0.7322864638941482,-1.0436686608323995,-1.055648875728204,-0.7186703541025977,-0.95574651744705,-0.2797719773805819,-0.8426741992038769,-0.62329772576257,-0.44944399550952907,-0.37341009073172987,-0.6102352269536027,-1.0931488235572253,-0.505634675637249,-0.5883065351205219,-0.46901187073285266,-0.28888384382064985,-0.41762664771734076,-0.3525882182806773,-0.324432905310108,-1.045790407872941,-0.8004586605705767,-1.0166593065511154,-0.6109940711038061,-0.8090403450325327,-1.2478282830262861,-1.4649452845342852,-0.5454815149708923,-0.513902684758549,-0.35270428040987634,-0.48424130454834236,-1.1669636883411054,-0.9183378718332547,-0.39504349397504634,-0.7382788420962489,-0.8467476184964724,-1.2037647385069676,-0.6884619044479139,-1.3396235797650453,-0.4390309897449942,-0.5350061228720274,-0.5921074836079533,-1.1327468441048425,-0.29525998746488114,-0.4484813233670451,-0.7180199612968039,-0.6242423531667582,-0.5545516025323719,-0.9782289263214716,-0.33066857369812214,-0.8891568043171663,-0.4455685386795973,-1.132032891014317,-1.1607409667152666,-0.39582757327930346,-0.908485448479863,-1.0581977561245328,-0.3299671319203869,-0.28213409978675863,-0.6887104021999411,-0.605980202710819,-0.6055512348286073,-0.3380276391170168,-0.3999073478044325,-0.4066508895946945,-0.9601681629509473,-0.7542556418910582,-0.7191026142532098,-0.42079431199588774,-0.6877151775452082,-0.3455136190546197,-0.7590530318209198,-0.39497377244726356,-1.2273420255835703],"x":[0.21872687594529916,-0.13672803380703158,0.7770064919287836,-0.5149264162457481,-0.937410567342079,0.14047979810136102,0.2849884692809739,-0.5830187343954201,0.8017476172338243,0.4574843523215688,-0.10849537985689572,0.0871449206702759,-0.8650441613628406,0.012898889490218668,-0.7975351911290804,0.992371571764429,-0.5902452118836483,-0.71648054623066,-0.7340735295613077,0.7051871412742705,-0.7860068055379226,-0.730581558048709,0.2447465446229642,0.4622554165342727,0.24820818623856766,0.4838688048386781,0.414315963984377,-0.31675851373264985,0.921785895063505,-0.2969327092928844,0.6870789999976163,-0.6567293095153794,-0.13226563843878214,0.3858729272293786,0.13185416963532193,0.6501413834139744,0.9400695830933024,-0.7242560132036933,-0.8934470316053256,-0.058289854550992004,0.9070450277796773,-0.4484998369981712,-0.539872120658555,0.3931054796689164,0.5692821970401747,-0.8092177445808169,0.5448126192059783,-0.07713275265480624,-0.08759722471150821,-0.8513265020715686,-0.8722475320903609,-0.7051045845392552,0.09216592653629574,-0.03975178639636967,-0.6794397254630455,0.8574644873426887,-0.555509762480308,-0.4442322855838343,0.03598349879219542,-0.6931298129847736,0.7235537846589652,0.7071116517065201,-0.4642459921848858,-0.5714973900222531,0.03580174065061037,-0.015418146531201327,0.28922239242225123,-0.7312672652021139,-0.6411784189411236,0.47882096786772843,0.5691274488801068,0.5231976038596651,0.3451026830163584,0.1052551461891631,0.8835797653216853,0.7773679187535674,-0.3304047005681161,-0.48052065377070097,-0.2440998516140067,-0.8848807237807126,-0.8684288275629979,-0.4177531122810043,0.4588736760246852,0.970876153487215,-0.7000943019998935,0.4217468636358084,0.4590650923307913,0.8413479743138432,0.4028419740838052,0.6490963899222928,0.4797657434365328,0.6371476226473027,0.5825471345177062,0.059570343256820646,0.7567066852333171,0.06605682068597218,0.18124196161760153,0.22635753837695027,-0.7240756694312038,0.8262670436548274,0.2725203010787638,-0.4712989785764239,-0.622905954958942,-0.6203895720401404,0.7469262852595087,-0.16688579697795491,-0.14485597194187916,0.15002936669634925,-0.13407410454891222,0.8845541047762677,0.25351419237524064,0.8486476836603032,-0.9254973717800752,-0.421956023505508,-0.3134214284504786,0.3427509668811828,-0.3036663842831091,0.02699561318028776,-0.662855251133744,0.11114975425626561,0.8432138491530292,0.1001609359112261,-0.9002849739093111,0.949667147500147,0.18179058723298747,-0.6868192701641669,0.3295340372617237,0.16800451629288693,-0.4837151699362203,-0.5799535636093074,0.9034829781181437,-0.1821591357692749,-0.6744136054176226,-0.542044038876659,0.38319482613570965,-0.17257738379307952,0.9152146880811562,0.3455222596920553,0.24954105133839466,0.7777186644519039,-0.7127459902881226,0.6817896055850912,-0.30026230327658654,0.5151133413231959,-0.32365037651146755,-0.07840998640963859,-0.20344615463568738,0.8879492542000378,-0.6208042128168505,-0.02332575878483878,-0.9626890929574352,-0.899885820762782,-0.19868760138340313,-0.009231145447164302,-0.9943561933440836,0.4964305205986683,-0.7781224810528014,-0.8125263310996362,-0.9159764036835578,0.5001101880255994,0.6385958209248641,-0.7050254859604204,-0.2595456762844983,0.20809532137680753,-0.12204419593848481,-0.21000215288353452,-0.16237375430682865,0.4492968438033076,0.3168263184115063,-0.1311467806621387,0.37549918446400676,0.14674605813826824,-0.4968087397479617,-0.9048386806635511,0.14701783563451576,-0.6899754316598004,0.23843038826838248,0.47220272485105097,-0.8660541418545655,0.4403035695073325,-0.2895535351191585,-0.6144982022006578,-0.30828213728535836,-0.8064448974284089,0.018855110304907274,0.996617118048563,0.5299431879708538,-0.3791780371154636,0.8677276016542055,0.11138321300632192,-0.5087486816237328,-0.754745240537416,0.7537813284809411,0.20747993081645477,-0.1998496019372391,-0.2944100345792897,0.42308311431150614,0.08264345509041693,0.2274782583979107,-0.310411038168926,-0.9878878196153704,0.7434107100927307,-0.31939542681918187,-0.7301644126554141,0.052487208549099496,0.07507641006382038,0.8977681122781651,0.9238700231018449,0.4653149577558948,-0.7763549931142513,-0.33507933158121084,0.4717608930254089,0.5374960998242133,-0.7705586313695987,0.5158515970303053,-0.9267707951606212,-0.5797823752372318,-0.45668356160144175,0.3386149247268393,-0.4784607899329405,0.84865492429791,0.22570896272057261,-0.7915848369430964,0.8257664612364186,0.2423006964956924,0.9183321513077694,-0.046575968314394256,0.14769002057365554,-0.21377211141541475,0.42573318519908154,-0.5113516721168359,0.8954038372683146,-0.6351952023466585,0.6421063987423112,0.802839210529315,-0.7552824736426387,0.4505624297544575,-0.44118074907234517,-0.7862397869245346,0.8784733231402213,0.5775048144113963,0.13391676438300504,-0.30614080166000424,0.1084646804538556,0.3003638933266175,0.3695663743973503,-0.3788704709433972,0.64628414415087,-0.12323758221651682,0.32338262735511103,-0.26162618488752765,-0.2898259354056516,-0.4874656364396963,0.10252841345718533,-0.5300597822022066,-0.6620636236933946,0.4277622362736717,0.9074334880985369,-0.5726185593838977,-0.83869618430804,-0.21720749258268857,0.15861867042697853,-0.9862283321771423,0.5771308623826958,-0.3953612370729225,-0.5004053183388244,0.7946082072331286,0.6061704420387768,0.8295439484825411,-0.8029622673154493,0.9075482276456288,-0.9284767900091837,-0.2955847597437167,0.09666266736937024,-0.9712236655136199,-0.5913530429454026,-0.4137331844701353,0.24305079225214987,-0.31830550834813964,-0.21346504443625225,0.7078670622333001,0.9540393821717967,-0.5904944307978703,-0.12411992527257665,-0.8843472643029693,0.3147086102569756,0.3353234987547453,0.5172896630744881,-0.41904097366608895,0.005082628010894652,0.08700217726351678,-0.20425562166265987,0.6190505897722596,0.7921398554506758,-0.2042347395360884,-0.7066849909758162,-0.8113551420610197,-0.3873783533750368,-0.6911599305666822,0.9630519447285932,-0.25237497388571883,0.9334326152776606,0.4126106181986353,0.7043779465934308,-0.10519188641139676,0.743660862454278,-0.66687072677224,-0.940479568775038,-0.5912368350592447,0.680388588077709,-0.43261177041566157,0.6424057652885811,0.1499317286361821,-0.9976133218824872,0.9162383716469606,-0.8483171934170142,0.170806747193613,-0.6655880485168164,0.24749939191913573,-0.13894119963445295,0.26835447757513187,-0.5666171609383075,0.9702168033748744,-0.4721184228161399,-0.7212775865580503,-0.4309063946805747,0.3639935411729076,0.23300356236504705,-0.8407776501290156,0.5525562229614329,0.25693692614776964,-0.3203383656645369,-0.43334669266943227,0.13007009512503842,0.8688334878958548,-0.5202171916938654,0.6645493948370409,-0.799247427773258,0.6538621824826221,0.47975221797347745,-0.9468122573645594,0.5730162993250589,0.5871766111771999,-0.6585748515915157,-0.38708252017686284,0.349353604689997,-0.1426995559402222,-0.10329785674029646,-0.34099500451691434,-0.19431115864160864,0.47057384567224236,0.047805503645174774,0.8716802138489546,-0.6872173861760444,0.15200496726545243,0.19097818253298504,0.5579222439902773,0.14824549618253924,0.9439788940876155,0.5585152561673996,-0.537182634533107,0.8050360848377838,-0.8378068408483501,0.31453877397715324,-0.14100221179004002,-0.0035400445292950167,-0.0829564216596852,-0.04289906513063757,-0.8744839047486792,0.305157095358775,0.7441053157661148,-0.712352548591566,-0.8650874778068385,-0.7756383192148117,0.25669128150574405,-0.6919109864691464,-0.3786756208291111,-0.33236520719444274,-0.6605515584967194,-0.9631344422694426,-0.1754873227650413,0.2777365742411311,-0.4860931844533112,0.0036286452842206884,0.8545487527090123,0.870098486658327,-0.9725651434002085,-0.26316105363628584,0.5138719685053768,0.6444220988120555,0.8597072508982659,0.32293467010661736,-0.39700232100771693,0.05766023751091298,0.7185092102278019,-0.31847762772653754,0.07791679379120042,0.7514394276921128,0.7080868736796502,-0.47978309502701677,-0.9657339270551697,-0.19854454137527222,0.4315944171509254,0.8094547758309076,0.39244330195670063,-0.7886852571306933,0.6022521247428618,0.874593335181717,-0.8455781415968415,-0.9551883434108586,0.800344247083999,0.2220030756550555,0.9187562885592131,-0.12102751383083632,-0.3203292766816861,0.9383885644361696,-0.5918957825837117,0.7229327209066132,0.5397960274750067,0.39924261912122505,-0.05331009276165455,0.5879909999039743,0.9576529139989125,0.40168340413770753,-0.7921889811701326,-0.17259828827512358,0.6281878622109556,-0.9166371119053638,-0.2904892406655226,-0.03975234907232972,0.29106374485027864,-0.54153754772112,0.9537341620355639,0.4438851287470853,0.43077578846106146,0.8459838920876899,-0.6423840310251743,-0.8224106306248871,0.8261881440320638,0.5014540453085234,-0.12740265864207512,0.605735487897745,0.9538880473964477,-0.9232823009901949,0.27388101579495716,0.0501547576980137,-0.28434488503262,-0.43078822670956196,0.3675683993086185,0.820823783416937,-0.7265850261302584,0.27409143792270463,0.8719764725007306,-0.7695013903309746,0.05209719436092497,-0.6008522261807543,-0.22713373475350007,0.5707649122966307,-0.17612680662871139,0.9537488969851546,-0.26407979480808574,-0.5598534513406372,-0.014472208313892843,-0.14819052788447662,0.9389274224037374,0.0077110335471459734,0.7993661455095178,0.9273705637932954,0.6239664491338357,-0.5950514021641946,0.6004913699992627,0.648920029583012,0.04369659151619798,0.5681605229233275,-0.7961026298923533,0.6259994372241517,0.472861565471832,0.12912410671429786,-0.4419258583038639,0.09806938632018625,0.7301397101605267,-0.8114718073424005,-0.8176898779182324,0.9058058163439511,-0.3376689719378514,0.21967395987076666,-0.48646012829487706,-0.105797401024883,0.08348572442583091,-0.017102549124526245,-0.38048642274639954,-0.8779284351368393,-0.9094442071617275,0.5926402679730667,-0.6769942151037118,0.5919351553265177,-0.7897926250279101,0.14961058130982696,-0.25666464606367345,-0.5830788567867078,0.8815671538438106,-0.049017398532718914,-0.5966197425826296,0.20126381643584157,-0.7114588907129362,-0.12038058598116086,0.13229854920687778,0.3568695459704969,-0.6942245713460102,0.12417955054468743,-0.30372108660910735,-0.224241277964913,-0.6957601582100703,0.7319456599349792,-0.8330572091971344,0.5750514453597968,-0.01118256451227051,0.7223088871659433,0.5703278407476815,0.3954755170537867,0.6447740576894909,-0.25259337422354644,0.5571175583033101,0.34271934259767267,0.39748499447523633,-0.32659832814103495,-0.4681341168606279,0.14952864636275764,-0.8277194728893322,-0.8335283359762875,-0.3623298252686227,-0.08696730800181252,0.6947627678525032,0.3790989123519095,0.8035528768949418,0.22196287108067114,0.2328431558755888,-0.4314153277143258,0.41377049729291704,-0.647804456441083,0.16165819246013324,0.26364711059513724,0.3199246352814935,0.2202307614315595,0.09713435159354722,-0.7385845801630673,0.27723027508190423,-0.33974341178148837,0.3060435992994468,0.5218483707543649,-0.7739966577315078,-0.3432220104525787,0.11990072557710807,0.33090386978967157,-0.28654493845249274,0.5417944640487979,-0.5255997119141531,0.3332609811064904,0.7597277250564733,0.02413671909710402,-0.05673533854274959,0.32110681701202637,-0.09361775483367518,0.029262810005114215,-0.6361460238983567,0.2395204515966336,0.2892532847190066,-0.40089895853220625,-0.9034518414410941,0.7452019612758671,0.675277619617241,-0.21526940574613462,-0.8138637698475217,-0.13960548860959943,-0.2279460273977314,0.4857038528591806,0.3189708656851886,0.059357764524339274,0.3895788758548764,-0.48867602711188507,0.8130288541605051,-0.27070660178663886,0.15569143290613363,0.42631714923941955,0.7129845376291835,0.16590036178422585,0.672727862174741,-0.8613576919947414,-0.53899219756428,-0.2910879198004963,-0.031263800012411025,0.5958973890035679,0.58009608176362,-0.5246174706598583,-0.6060642151253215,-0.8243039019409113,-0.37314548380697055,0.42153058946170985,-0.8003140242946962,-0.23486439635656442,0.964821796608724,-0.8146850012412119,-0.8223904551587875,-0.9976679761655833,0.2716260740894456,0.0005603293026532619,-0.8319035795737726,-0.21731709255059206,0.12690611401821483,-0.3444293563859735,0.33049589819033587,0.4150217556202036,-0.6926710822979905,0.9035013722372138,0.5988123156525322,0.5565014520761751,0.16097633851114734,-0.5572103107040878,0.620261820654183,-0.4165662751436927,0.17260883303132024,0.29058133876902836,0.4663626311298539,0.6751507147553353,0.11611625250393454,-0.03367164027937575,-0.9981339689202406,0.6766129388822422,-0.9638541915507077,-0.3785149802511958,0.6274903366372668,-0.24189164192765933,-0.3567488019434699,-0.510160507740602,-0.29234988537850315,-0.9115833882586224,-0.8803892134182556,-0.30580358958269205,0.32926080728240237,0.7876526499372134,0.49847944147911427,-0.37365108705335404,-0.24928184917350782,0.9243798765760971,0.1494548744918438,0.39766199834738325,-0.7842236454811347,-0.854056800973598,0.08304062350876062,-0.8732099664596129,-0.4606973478473444,0.7675186355945072,0.2125615263122982,0.6183848227097877,-0.6079870748219198,0.817508971008472,0.36630904888767946,0.49982372706917877,-0.4029306492448277,-0.30659385751351165,-0.6943299755824262,-0.03137764416942668,0.4638014806854436,-0.13895193773053904,-0.22476964209278716,0.02705773716852633,0.5966390287633123,-0.3620359232573609,-0.4944695312511862,-0.7606235253200082,0.09972936031068613,-0.380733320607193,0.46578174381813797,-0.5634169427437841,0.840903020497588,-0.6314511251455754,0.6890979765142053,0.6202151174493853,0.5794861840599186,-0.5626215379792563,0.51793915648132,0.32674749306574613,0.9802879219820335,0.8479279634744787,-0.3397245771138322,-0.173032494408075,-0.5880834946506659,-0.6267133406209302,-0.6851634484801696,-0.6778626391734619,0.7042763209711285,0.9205734355854216,-0.8939394363584952,-0.18609481958137097,-0.7943228083569749,0.8481536485046028,0.3062614585834287,0.30007727021504627,-0.09620352932198539,0.3287544297503233,0.3295430686002576,0.9024636391337681,-0.546623304188794,0.8682851454361944,-0.7367631352176263,-0.5892065031821403,-0.9271444353129916,-0.9234311441683878,0.3267388631261592,-0.055255550923444474,0.4138547360892,-0.09310252407958286,-0.21973549882952703,-0.18499409365542885,0.3174582181093957,0.3753067189959296,-0.10341468632232198,0.044754409006459994,0.25149578237379133,0.3892163812695566,-0.8239708754157449,0.8879360121819797,0.6674657861116411,-0.2764709462978905,0.7523007188355133,-0.8381118071376372,0.4479833140126863,0.157774789323192,0.9748016295754645,-0.12070692578712494,-0.025313310937236988,0.03904679640003472,0.7420105827967083,0.26230500584527494,0.06911318416620693,0.7828456565446795,-0.5340813347832709,-0.37415500551052716,0.033180150622451166,0.8804557830494022,0.40238588551238097,-0.7198362558764244,-0.7470637893086658,-0.21249762515359238,-0.00232123753532143,-0.28832573021602537,-0.43035217142128834,-0.2933958602434106,-0.18812166094538219,-0.10087648107503133,-0.6754096873754203,0.384651967716104,-0.8838492639333064,-0.4087983248013689,-0.9195359637810787,0.20464637337774105,-0.7776156193578863,-0.9162798084757005,-0.6454183400406648,-0.1212208580965517,0.30785989926894697,-0.04348750606254237,-0.47538030183558355,0.22889838649946848,-0.48324472986143396,-0.3568793569248494,0.009755341943235685,-0.09315967569465444,-0.27772874579672413,0.16452932024826517,0.730912148036813,-0.28178972606221686,0.5181764631833756,0.33116234663294186,-0.9138220457966368,0.49697872083225514,0.9518973811052684,0.34369557859395883,-0.010089285027952588,-0.19737660472547747,0.08954818734333037,-0.446698770890146,0.8451856522631545,-0.5915092870185661,0.18991898993202883,-0.13777199750965075,-0.46694902292679163,0.1796528167445377,-0.7202844212123778,-0.08645355986772163,-0.6120407787889146,-0.2863007544111609,-0.5199839925270759,0.17817951619028038,0.9119044486072316,0.8785874472842772,-0.24439752909110313,0.9238932369339712,0.20360462078085684,0.623713382556335,0.030837213306058153,0.2202629638279494,-0.06969625283377168,0.9749575758818976,-0.22879100251069495,-0.35999920381299555,0.18089210768083763,0.18605468638315426,0.9102184460874474,0.09024765048451089,0.35121099786006393,0.2033930897055538,-0.0972343761291774,0.6993231295446356,0.0009532487518528754,0.5540552057153687,0.8727693637988336,0.8280162405980964,-0.7495996655264121,-0.37143049066471256,-0.17690978949665626,0.8435241507111901,0.9159949924262083,-0.14641194350445863,0.7790331886813258,-0.5293264453485582,0.5662825038031705,-0.4985208147746243,0.9470599276198368,-0.5451962231203362,-0.9656333438065015,0.06722058675921305,0.5542646598762322,-0.6433221457426481,-0.769045088351636,-0.741886320234463,-0.5407327534654915,0.10780718315993232,-0.999071479796549,-0.7732145653952922,-0.6088527741723837,-0.15858594299592488,-0.5162970422404287,0.2501285815655372,-0.23745433362405022,-0.18484242940973017,-0.4587896113949279,-0.7226591330463425,0.045162646464942835,-0.6501133825626333,-0.47954352556967406,-0.699515662838154,0.39124503280659395,-0.7638819098773144,0.8649695346169275,0.9680637977483402,-0.7486340422395066,-0.7282633770170075,0.5391841671400326,-0.2668178990283607,-0.054013237662736024,-0.004163452261842782,0.9581005756771708,0.8908050383521502,0.2536422289752074,-0.9174528060833822,0.8859031213955153,-0.9108004566718533,0.3921308915359285,0.7904398090909499,0.7795557065248175,-0.58137857115825,0.08953724471059843,0.7234231808451046,0.013082514832417402,0.25160683321592403,-0.24092454372924532,0.3613001174159183,-0.24202787959387617,0.0764815524350837,0.24962666439859005,-0.7292395582694895,-0.027536892246647238,-0.08880597274039026,-0.6358930330797441,-0.2717704273665218,0.19369408607264704,-0.6834073598602655,0.9471773704142854,-0.7133821171441168,-0.12433005275951103,-0.23719307486014118,-0.2176584089702458,0.24822322460271673,0.009671702232604051,-0.256476837441737,0.6307490467868115,-0.5830219716807652,0.639415778953178,-0.9243663091383603,-0.5067596687911236,-0.9744095052013786,-0.7249926465495129,0.5739333254604202,0.7646155959468279,0.4349256174141174,-0.7112051960319818,-0.9947717124424122,0.05330416567066676,0.24097376712729046,0.4540926564026324,-0.4871835139159555,-0.5589336821976558,0.8060655826374541,0.8645152135807233,-0.7578208400690141,0.3615777595036409,0.13505765226046673,-0.4284526124072552,-0.651950278938445,0.5093345515654426,0.7753190550521603,0.2860666227974926,-0.3493239442859304,0.18012396942895936,-0.3619944485466786,0.03370383693700374,0.16652188089758324,-0.08532060088224336,-0.6931046303280954,-0.5774402489907144,-0.036916381397341436,-0.348357576347758,0.8740310024241431,-0.2532432347422344,0.13008513858052861,0.41437146847590434,0.8282172368403709,0.33096264452646285,-0.5476616718111562,0.33742560226042206,0.18483580343610173,0.408247335982741,0.8334269716227336,0.5330063523572854,0.8685889294533475,0.7344036813369392,-0.48981935631854334,-0.1996956482967569,-0.458744652684147,0.13721363988456803,-0.620009037868885,-0.678112143763387,-0.9292831997303508,0.7581860462202896,0.34063818024397996,0.864240784411793,0.3576958767439522,-0.8194091721284535,-0.2944419427048306,0.5281686444557199,-0.07550293709469136,-0.24563621452329354,-0.624959541297569,0.007877308065201483,-0.8863224196296464,0.47456705605151406,0.2670502780185027,0.15258505059691263,-0.6212053442525307,0.8397257630041088,0.7490027892783808,-0.05645532882880566,0.12467357411673241,0.22780332297850414,-0.37755371788044645,0.9077351327164487,-0.33187345737027085,0.9775350879802582,-0.815135889597089,-0.6517062586845523,0.5855738994678705,-0.3251779753283346,-0.49097698805995726,0.7530574177416196,0.9880629133372123,0.008689362149636892,0.15793575877282384,0.4404052254363515,0.7300008322881615,0.7189451147575112,0.8170644436975372,-0.374715236045152,-0.08689009182397678,-0.055682733456706934,0.473042194426601,0.00803435288703147,0.9040068905920373,-0.09523857972937488,0.569268949702753,-0.769735605629621]}
},{}],75:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var LN_HALF = require( '@stdlib/constants/math/float64-ln-half' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var EPS = require( '@stdlib/constants/math/float64-eps' );
var factory = require( './../lib/factory.js' );


// FIXTURES //

var smallSmall = require( './fixtures/julia/small_small.json' );
var smallLarge = require( './fixtures/julia/small_large.json' );
var largeSmall = require( './fixtures/julia/large_small.json' );
var largeLarge = require( './fixtures/julia/large_large.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof factory, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a function', function test( t ) {
	var logcdf = factory( 0.0, 1.0 );
	t.equal( typeof logcdf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 1.0 );
	y = logcdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( NaN );
	y = logcdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a valid `v`, the function returns a function which returns `0` when provided `Infinity` for `x`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 1.0 );
	y = logcdf( PINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a valid `v`, the function returns a function which returns `-Infinity` when provided `-Infinity` for `x`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 1.0 );
	y = logcdf( NINF );
	t.equal( y, NINF, 'returns -Infinity' );

	t.end();
});

tape( 'if provided a valid `v`, the function returns a function which returns `ln(0.5)` when provided `0.0` for `x`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 1.0 );
	y = logcdf( 0.0 );
	t.equal( y, LN_HALF, 'returns ln(0.5)' );

	logcdf = factory( 2.5 );
	y = logcdf( 0.0 );
	t.equal( y, LN_HALF, 'returns ln(0.5)' );

	logcdf = factory( 5.0 );
	y = logcdf( 0.0 );
	t.equal( y, LN_HALF, 'returns ln(0.5)' );

	t.end();
});

tape( 'if provided a nonpositive `v`, the created function always returns `NaN`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 0.0 );

	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( -1.0 );

	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the logcdf for `x` given parameter `v` (when `x` and `v` are small)', function test( t ) {
	var expected;
	var logcdf;
	var delta;
	var tol;
	var i;
	var v;
	var x;
	var y;

	expected = smallSmall.expected;
	x = smallSmall.x;
	v = smallSmall.v;
	for ( i = 0; i < x.length; i++ ) {
		logcdf = factory( v[i] );
		y = logcdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+'. v: '+v[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 10.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. v: '+v[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the logcdf for `x` given parameter `v` (when `x` is large and `v` small)', function test( t ) {
	var expected;
	var logcdf;
	var delta;
	var tol;
	var i;
	var v;
	var x;
	var y;

	expected = largeSmall.expected;
	x = largeSmall.x;
	v = largeSmall.v;
	for ( i = 0; i < x.length; i++ ) {
		logcdf = factory( v[i] );
		y = logcdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+'. v: '+v[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 10.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. v: '+v[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the logcdf for `x` given parameter `v` (when `x` is small and `v` large)', function test( t ) {
	var expected;
	var logcdf;
	var delta;
	var tol;
	var i;
	var v;
	var x;
	var y;

	expected = smallLarge.expected;
	x = smallLarge.x;
	v = smallLarge.v;
	for ( i = 0; i < x.length; i++ ) {
		logcdf = factory( v[i] );
		y = logcdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+'. v: '+v[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 10.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. v: '+v[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the logcdf for `x` given parameter `v` (when `x` and `v` are large)', function test( t ) {
	var expected;
	var logcdf;
	var delta;
	var tol;
	var i;
	var v;
	var x;
	var y;

	expected = largeLarge.expected;
	x = largeLarge.x;
	v = largeLarge.v;
	for ( i = 0; i < x.length; i++ ) {
		logcdf = factory( v[i] );
		y = logcdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+'. v: '+v[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 30.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. v: '+v[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/t/logcdf/test/test.factory.js")
},{"./../lib/factory.js":68,"./fixtures/julia/large_large.json":71,"./fixtures/julia/large_small.json":72,"./fixtures/julia/small_large.json":73,"./fixtures/julia/small_small.json":74,"@stdlib/constants/math/float64-eps":28,"@stdlib/constants/math/float64-ln-half":36,"@stdlib/constants/math/float64-ninf":44,"@stdlib/constants/math/float64-pinf":46,"@stdlib/math/base/assert/is-nan":60,"@stdlib/math/base/special/abs":79,"tape":352}],76:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var logcdf = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof logcdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `logcdf` functions', function test( t ) {
	t.equal( typeof logcdf.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/t/logcdf/test/test.js")
},{"./../lib":69,"tape":352}],77:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var LN_HALF = require( '@stdlib/constants/math/float64-ln-half' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var EPS = require( '@stdlib/constants/math/float64-eps' );
var logcdf = require( './../lib' );


// FIXTURES //

var smallSmall = require( './fixtures/julia/small_small.json' );
var smallLarge = require( './fixtures/julia/small_large.json' );
var largeSmall = require( './fixtures/julia/large_small.json' );
var largeLarge = require( './fixtures/julia/large_large.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof logcdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = logcdf( NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = logcdf( 0.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided `+infinity` for `x` and a finite `v`, the function returns `0`', function test( t ) {
	var y = logcdf( PINF, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided `-infinity` for `x` and a finite `v`, the function returns `-Infinity`', function test( t ) {
	var y = logcdf( NINF, 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );
	t.end();
});

tape( 'if provided `0.0` for `x` and a valid `v`, the function returns `ln(0.5)`', function test( t ) {
	var y;

	y = logcdf( 0.0, 1.0 );
	t.equal( y, LN_HALF, 'returns ln(0.5)' );

	y = logcdf( 0.0, 1.0 );
	t.equal( y, LN_HALF, 'returns ln(0.5)' );

	y = logcdf( 0.0, 1.0 );
	t.equal( y, LN_HALF, 'returns ln(0.5)' );

	t.end();
});

tape( 'if provided a nonpositive `v`, the function always returns `NaN`', function test( t ) {
	var y;

	y = logcdf( 2.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 0.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 2.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the logcdf for `x` given parameter `v` (when `x` and `v` are small)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var y;
	var i;

	expected = smallSmall.expected;
	x = smallSmall.x;
	v = smallSmall.v;
	for ( i = 0; i < x.length; i++ ) {
		y = logcdf( x[i], v[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+'. v: '+v[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 10.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. v: '+v[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the logcdf for `x` given parameter `v` (when `x` is large and `v` small)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var y;
	var i;

	expected = largeSmall.expected;
	x = largeSmall.x;
	v = largeSmall.v;
	for ( i = 0; i < x.length; i++ ) {
		y = logcdf( x[i], v[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+'. v: '+v[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 10.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. v: '+v[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the logcdf for `x` given parameter `v` (when `x` is small and `v` large)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var y;
	var i;

	expected = smallLarge.expected;
	x = smallLarge.x;
	v = smallLarge.v;
	for ( i = 0; i < x.length; i++ ) {
		y = logcdf( x[i], v[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+'. v: '+v[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 10.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. v: '+v[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the logcdf for `x` given parameter `v` (when `x` and `v` are large)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var y;
	var i;

	expected = largeLarge.expected;
	x = largeLarge.x;
	v = largeLarge.v;
	for ( i = 0; i < x.length; i++ ) {
		y = logcdf( x[i], v[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+'. v: '+v[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 30.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. v: '+v[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/t/logcdf/test/test.logcdf.js")
},{"./../lib":69,"./fixtures/julia/large_large.json":71,"./fixtures/julia/large_small.json":72,"./fixtures/julia/small_large.json":73,"./fixtures/julia/small_small.json":74,"@stdlib/constants/math/float64-eps":28,"@stdlib/constants/math/float64-ln-half":36,"@stdlib/constants/math/float64-ninf":44,"@stdlib/constants/math/float64-pinf":46,"@stdlib/math/base/assert/is-nan":60,"@stdlib/math/base/special/abs":79,"tape":352}],78:[function(require,module,exports){
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

},{}],79:[function(require,module,exports){
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

},{"./abs.js":78}],80:[function(require,module,exports){
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

},{"./rational_pq.js":82,"./rational_rs.js":83,"@stdlib/constants/math/float64-fourth-pi":31,"@stdlib/math/base/assert/is-nan":60,"@stdlib/math/base/special/sqrt":232}],81:[function(require,module,exports){
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

},{"./asin.js":80}],82:[function(require,module,exports){
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

},{}],83:[function(require,module,exports){
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

},{}],84:[function(require,module,exports){
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

},{"./lanczos_sum_expg_scaled.js":86,"@stdlib/constants/math/float64-e":27,"@stdlib/constants/math/float64-eps":28,"@stdlib/math/base/assert/is-nan":60,"@stdlib/math/base/special/abs":79,"@stdlib/math/base/special/exp":109,"@stdlib/math/base/special/log1p":198,"@stdlib/math/base/special/pow":209,"@stdlib/math/base/special/sqrt":232}],85:[function(require,module,exports){
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

},{"./beta.js":84}],86:[function(require,module,exports){
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

},{}],87:[function(require,module,exports){
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

},{"@stdlib/math/base/special/kernel-betainc":181}],88:[function(require,module,exports){
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

},{"./betainc.js":87}],89:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-integer":58,"@stdlib/math/base/assert/is-nan":60,"@stdlib/math/base/assert/is-odd":64,"@stdlib/math/base/special/round":226}],90:[function(require,module,exports){
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

},{"./binomcoef.js":89}],91:[function(require,module,exports){
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

},{}],92:[function(require,module,exports){
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

},{"./ceil.js":91}],93:[function(require,module,exports){
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

},{"@stdlib/number/float64/base/from-words":246,"@stdlib/number/float64/base/get-high-word":250,"@stdlib/number/float64/base/to-words":264}],94:[function(require,module,exports){
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

},{"./copysign.js":93}],95:[function(require,module,exports){
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

},{"@stdlib/math/base/special/kernel-cos":186,"@stdlib/math/base/special/kernel-sin":190,"@stdlib/math/base/special/rempio2":222,"@stdlib/number/float64/base/get-high-word":250}],96:[function(require,module,exports){
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

},{"./cos.js":95}],97:[function(require,module,exports){
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

},{"./polyval_pa.js":99,"./polyval_pp.js":100,"./polyval_qa.js":101,"./polyval_qq.js":102,"./polyval_ra.js":103,"./polyval_rb.js":104,"./polyval_sa.js":105,"./polyval_sb.js":106,"@stdlib/constants/math/float64-ninf":44,"@stdlib/constants/math/float64-pinf":46,"@stdlib/math/base/assert/is-nan":60,"@stdlib/math/base/special/exp":109,"@stdlib/number/float64/base/set-low-word":261}],98:[function(require,module,exports){
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

},{"./erfc.js":97}],99:[function(require,module,exports){
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
		return -0.3250421072470015;
	}
	return -0.3250421072470015 + (x * (-0.02848174957559851 + (x * (-0.005770270296489442 + (x * -0.000023763016656650163))))); // eslint-disable-line max-len
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
		return 0.10642088040084423;
	}
	return 0.10642088040084423 + (x * (0.540397917702171 + (x * (0.07182865441419627 + (x * (0.12617121980876164 + (x * (0.01363708391202905 + (x * 0.011984499846799107))))))))); // eslint-disable-line max-len
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
		return 0.39791722395915535;
	}
	return 0.39791722395915535 + (x * (0.0650222499887673 + (x * (0.005081306281875766 + (x * (0.00013249473800432164 + (x * -0.000003960228278775368))))))); // eslint-disable-line max-len
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
		return -0.6938585727071818;
	}
	return -0.6938585727071818 + (x * (-10.558626225323291 + (x * (-62.375332450326006 + (x * (-162.39666946257347 + (x * (-184.60509290671104 + (x * (-81.2874355063066 + (x * -9.814329344169145))))))))))); // eslint-disable-line max-len
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
		return -0.799283237680523;
	}
	return -0.799283237680523 + (x * (-17.757954917754752 + (x * (-160.63638485582192 + (x * (-637.5664433683896 + (x * (-1025.0951316110772 + (x * -483.5191916086514))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],105:[function(require,module,exports){
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

},{}],106:[function(require,module,exports){
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

},{}],107:[function(require,module,exports){
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

},{"./expmulti.js":108,"@stdlib/constants/math/float64-ninf":44,"@stdlib/constants/math/float64-pinf":46,"@stdlib/math/base/assert/is-nan":60,"@stdlib/math/base/special/trunc":233}],108:[function(require,module,exports){
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

},{"./polyval_p.js":110,"@stdlib/math/base/special/ldexp":192}],109:[function(require,module,exports){
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

},{"./exp.js":107}],110:[function(require,module,exports){
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

},{}],111:[function(require,module,exports){
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

},{"./polyval_q.js":113,"@stdlib/constants/math/float64-exponent-bias":30,"@stdlib/constants/math/float64-half-ln-two":33,"@stdlib/constants/math/float64-ninf":44,"@stdlib/constants/math/float64-pinf":46,"@stdlib/math/base/assert/is-nan":60,"@stdlib/number/float64/base/get-high-word":250,"@stdlib/number/float64/base/set-high-word":259}],112:[function(require,module,exports){
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

},{"./expm1.js":111}],113:[function(require,module,exports){
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

},{}],114:[function(require,module,exports){
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

},{"./factorials.json":115,"@stdlib/constants/math/float64-pinf":46,"@stdlib/math/base/assert/is-integer":58,"@stdlib/math/base/assert/is-nan":60,"@stdlib/math/base/special/gamma":129}],115:[function(require,module,exports){
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

},{}],116:[function(require,module,exports){
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

},{"./factorial.js":114}],117:[function(require,module,exports){
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

},{}],118:[function(require,module,exports){
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

},{"./floor.js":117}],119:[function(require,module,exports){
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

},{"./gamma_delta_ratio_lanczos.js":120,"@stdlib/math/base/special/abs":79,"@stdlib/math/base/special/factorial":116,"@stdlib/math/base/special/floor":118,"@stdlib/math/base/special/gamma":129}],120:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-e":27,"@stdlib/constants/math/float64-eps":28,"@stdlib/constants/math/float64-gamma-lanczos-g":32,"@stdlib/math/base/special/abs":79,"@stdlib/math/base/special/exp":109,"@stdlib/math/base/special/gamma":129,"@stdlib/math/base/special/gamma-lanczos-sum":126,"@stdlib/math/base/special/log1p":198,"@stdlib/math/base/special/pow":209}],121:[function(require,module,exports){
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

},{"./gamma_delta_ratio.js":119}],122:[function(require,module,exports){
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

},{"./rational_pq.js":124}],123:[function(require,module,exports){
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

},{"./gamma_lanczos_sum_expg_scaled.js":122}],124:[function(require,module,exports){
arguments[4][86][0].apply(exports,arguments)
},{"dup":86}],125:[function(require,module,exports){
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

},{"./rational_pq.js":127}],126:[function(require,module,exports){
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

},{"./gamma_lanczos_sum.js":125}],127:[function(require,module,exports){
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

},{}],128:[function(require,module,exports){
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

},{"./rational_pq.js":131,"./small_approximation.js":132,"./stirling_approximation.js":133,"@stdlib/constants/math/float64-ninf":44,"@stdlib/constants/math/float64-pi":45,"@stdlib/constants/math/float64-pinf":46,"@stdlib/math/base/assert/is-integer":58,"@stdlib/math/base/assert/is-nan":60,"@stdlib/math/base/assert/is-negative-zero":62,"@stdlib/math/base/special/abs":79,"@stdlib/math/base/special/floor":118,"@stdlib/math/base/special/sin":228}],129:[function(require,module,exports){
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

},{"./gamma.js":128}],130:[function(require,module,exports){
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

},{}],131:[function(require,module,exports){
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

},{}],132:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-eulergamma":29}],133:[function(require,module,exports){
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

},{"./polyval_s.js":130,"@stdlib/constants/math/float64-sqrt-two-pi":49,"@stdlib/math/base/special/exp":109,"@stdlib/math/base/special/pow":209}],134:[function(require,module,exports){
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

},{"./lgamma_small_imp.js":136,"@stdlib/math/base/assert/is-nan":60,"@stdlib/math/base/special/expm1":112,"@stdlib/math/base/special/gamma":129,"@stdlib/math/base/special/log1p":198}],135:[function(require,module,exports){
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

},{"./gamma1pm1.js":134}],136:[function(require,module,exports){
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

},{"./rational_p1q1.js":137,"./rational_p2q2.js":138,"./rational_p3q3.js":139,"@stdlib/constants/math/float64-eps":28,"@stdlib/math/base/special/ln":194}],137:[function(require,module,exports){
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

},{}],138:[function(require,module,exports){
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

},{}],139:[function(require,module,exports){
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

},{}],140:[function(require,module,exports){
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

},{"@stdlib/math/base/special/exp":109}],141:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-pi":45,"@stdlib/math/base/special/erfc":98,"@stdlib/math/base/special/exp":109,"@stdlib/math/base/special/sqrt":232}],142:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-max-ln":40,"@stdlib/constants/math/float64-min-ln":43,"@stdlib/math/base/special/exp":109,"@stdlib/math/base/special/ln":194,"@stdlib/math/base/special/pow":209}],143:[function(require,module,exports){
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

},{"./finite_gamma_q.js":140,"./finite_half_gamma_q.js":141,"./full_igamma_prefix.js":142,"./igamma_temme_large.js":144,"./lower_gamma_series.js":146,"./regularised_gamma_prefix.js":157,"./tgamma_small_upper_part.js":159,"./upper_gamma_fraction.js":160,"@stdlib/constants/math/float64-max":41,"@stdlib/constants/math/float64-max-ln":40,"@stdlib/constants/math/float64-pinf":46,"@stdlib/constants/math/float64-sqrt-eps":48,"@stdlib/constants/math/float64-sqrt-two-pi":49,"@stdlib/math/base/special/abs":79,"@stdlib/math/base/special/exp":109,"@stdlib/math/base/special/floor":118,"@stdlib/math/base/special/gamma":129,"@stdlib/math/base/special/gammaln":163,"@stdlib/math/base/special/ln":194,"@stdlib/math/base/special/pow":209}],144:[function(require,module,exports){
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

},{"./polyval_c0.js":148,"./polyval_c1.js":149,"./polyval_c2.js":150,"./polyval_c3.js":151,"./polyval_c4.js":152,"./polyval_c5.js":153,"./polyval_c6.js":154,"./polyval_c7.js":155,"./polyval_c8.js":156,"@stdlib/constants/math/float64-pi":45,"@stdlib/math/base/special/erfc":98,"@stdlib/math/base/special/exp":109,"@stdlib/math/base/special/ln":194,"@stdlib/math/base/special/sqrt":232,"@stdlib/math/base/tools/evalpoly":240}],145:[function(require,module,exports){
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

},{"./gammainc.js":143}],146:[function(require,module,exports){
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

},{"./lower_incomplete_gamma_series":147,"@stdlib/math/base/tools/sum-series":243}],147:[function(require,module,exports){
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
		return -0.3333333333333333;
	}
	return -0.3333333333333333 + (x * (0.08333333333333333 + (x * (-0.014814814814814815 + (x * (0.0011574074074074073 + (x * (0.0003527336860670194 + (x * (-0.0001787551440329218 + (x * (0.00003919263178522438 + (x * (-0.0000021854485106799924 + (x * (-0.00000185406221071516 + (x * (8.296711340953087e-7 + (x * (-1.7665952736826078e-7 + (x * (6.707853543401498e-9 + (x * (1.0261809784240309e-8 + (x * (-4.382036018453353e-9 + (x * 9.14769958223679e-10))))))))))))))))))))))))))); // eslint-disable-line max-len
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
		return -0.001851851851851852;
	}
	return -0.001851851851851852 + (x * (-0.003472222222222222 + (x * (0.0026455026455026454 + (x * (-0.0009902263374485596 + (x * (0.00020576131687242798 + (x * (-4.018775720164609e-7 + (x * (-0.000018098550334489977 + (x * (0.00000764916091608111 + (x * (-0.0000016120900894563446 + (x * (4.647127802807434e-9 + (x * (1.378633446915721e-7 + (x * (-5.752545603517705e-8 + (x * 1.1951628599778148e-8))))))))))))))))))))))); // eslint-disable-line max-len
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
		return 0.004133597883597883;
	}
	return 0.004133597883597883 + (x * (-0.0026813271604938273 + (x * (0.0007716049382716049 + (x * (0.0000020093878600823047 + (x * (-0.00010736653226365161 + (x * (0.000052923448829120125 + (x * (-0.000012760635188618728 + (x * (3.423578734096138e-8 + (x * (0.0000013721957309062932 + (x * (-6.298992138380055e-7 + (x * 1.4280614206064242e-7))))))))))))))))))); // eslint-disable-line max-len
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
		return 0.0006494341563786008;
	}
	return 0.0006494341563786008 + (x * (0.00022947209362139917 + (x * (-0.0004691894943952557 + (x * (0.00026772063206283885 + (x * (-0.00007561801671883977 + (x * (-2.396505113867297e-7 + (x * (0.000011082654115347302 + (x * (-0.0000056749528269915965 + (x * 0.0000014230900732435883))))))))))))))); // eslint-disable-line max-len
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
		return -0.0008618882909167117;
	}
	return -0.0008618882909167117 + (x * (0.0007840392217200666 + (x * (-0.0002990724803031902 + (x * (-0.0000014638452578843418 + (x * (0.00006641498215465122 + (x * (-0.00003968365047179435 + (x * 0.000011375726970678419))))))))))); // eslint-disable-line max-len
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
		return -0.00033679855336635813;
	}
	return -0.00033679855336635813 + (x * (-0.00006972813758365858 + (x * (0.0002772753244959392 + (x * (-0.00019932570516188847 + (x * (0.00006797780477937208 + (x * (1.419062920643967e-7 + (x * (-0.000013594048189768693 + (x * (0.000008018470256334202 + (x * -0.000002291481176508095))))))))))))))); // eslint-disable-line max-len
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
		return 0.0005313079364639922;
	}
	return 0.0005313079364639922 + (x * (-0.0005921664373536939 + (x * (0.0002708782096718045 + (x * (7.902353232660328e-7 + (x * (-0.00008153969367561969 + (x * (0.0000561168275310625 + (x * -0.000018329116582843375))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],155:[function(require,module,exports){
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

},{}],156:[function(require,module,exports){
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

},{}],157:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-e":27,"@stdlib/constants/math/float64-gamma-lanczos-g":32,"@stdlib/constants/math/float64-max-ln":40,"@stdlib/constants/math/float64-min-ln":43,"@stdlib/math/base/special/abs":79,"@stdlib/math/base/special/exp":109,"@stdlib/math/base/special/gamma":129,"@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled":123,"@stdlib/math/base/special/gammaln":163,"@stdlib/math/base/special/ln":194,"@stdlib/math/base/special/log1p":198,"@stdlib/math/base/special/max":201,"@stdlib/math/base/special/min":205,"@stdlib/math/base/special/pow":209,"@stdlib/math/base/special/sqrt":232}],158:[function(require,module,exports){
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

},{}],159:[function(require,module,exports){
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

},{"./small_gamma2_series.js":158,"@stdlib/math/base/special/gamma1pm1":135,"@stdlib/math/base/special/powm1":220,"@stdlib/math/base/tools/sum-series":243}],160:[function(require,module,exports){
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

},{"./upper_incomplete_gamma_fract":161,"@stdlib/math/base/tools/continued-fraction":237}],161:[function(require,module,exports){
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

},{}],162:[function(require,module,exports){
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

},{"./polyval_a1.js":164,"./polyval_a2.js":165,"./polyval_r.js":166,"./polyval_s.js":167,"./polyval_t1.js":168,"./polyval_t2.js":169,"./polyval_t3.js":170,"./polyval_u.js":171,"./polyval_v.js":172,"./polyval_w.js":173,"@stdlib/constants/math/float64-pi":45,"@stdlib/constants/math/float64-pinf":46,"@stdlib/math/base/assert/is-infinite":56,"@stdlib/math/base/assert/is-nan":60,"@stdlib/math/base/special/abs":79,"@stdlib/math/base/special/ln":194,"@stdlib/math/base/special/sinpi":230,"@stdlib/math/base/special/trunc":233}],163:[function(require,module,exports){
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

},{"./gammaln.js":162}],164:[function(require,module,exports){
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
		return 0.020580808432516733;
	}
	return 0.020580808432516733 + (x * (0.0028905138367341563 + (x * (0.0005100697921535113 + (x * (0.00010801156724758394 + (x * 0.000044864094961891516))))))); // eslint-disable-line max-len
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
		return 1.3920053346762105;
	}
	return 1.3920053346762105 + (x * (0.7219355475671381 + (x * (0.17193386563280308 + (x * (0.01864591917156529 + (x * (0.0007779424963818936 + (x * 0.000007326684307446256))))))))); // eslint-disable-line max-len
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
		return 0.21498241596060885;
	}
	return 0.21498241596060885 + (x * (0.325778796408931 + (x * (0.14635047265246445 + (x * (0.02664227030336386 + (x * (0.0018402845140733772 + (x * 0.00003194753265841009))))))))); // eslint-disable-line max-len
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
		return -0.032788541075985965;
	}
	return -0.032788541075985965 + (x * (0.006100538702462913 + (x * (-0.0014034646998923284 + (x * 0.00031563207090362595))))); // eslint-disable-line max-len
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
		return 0.01797067508118204;
	}
	return 0.01797067508118204 + (x * (-0.0036845201678113826 + (x * (0.000881081882437654 + (x * -0.00031275416837512086))))); // eslint-disable-line max-len
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
		return -0.010314224129834144;
	}
	return -0.010314224129834144 + (x * (0.0022596478090061247 + (x * (-0.0005385953053567405 + (x * 0.0003355291926355191))))); // eslint-disable-line max-len
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
		return 0.6328270640250934;
	}
	return 0.6328270640250934 + (x * (1.4549225013723477 + (x * (0.9777175279633727 + (x * (0.22896372806469245 + (x * 0.013381091853678766))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],172:[function(require,module,exports){
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

},{}],173:[function(require,module,exports){
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

},{}],174:[function(require,module,exports){
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

},{"./full_igamma_prefix.js":176,"./regularized_gamma_prefix.js":184,"@stdlib/constants/math/float64-eps":28,"@stdlib/constants/math/float64-smallest-normal":47,"@stdlib/math/base/special/abs":79,"@stdlib/math/base/special/factorial":116,"@stdlib/math/base/special/gamma-delta-ratio":121,"@stdlib/math/base/special/gammainc":145,"@stdlib/math/base/special/ln":194,"@stdlib/math/base/special/log1p":198,"@stdlib/math/base/special/pow":209}],175:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-smallest-normal":47,"@stdlib/math/base/special/binomcoef":90,"@stdlib/math/base/special/floor":118,"@stdlib/math/base/special/pow":209}],176:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-max-ln":40,"@stdlib/constants/math/float64-min-ln":43,"@stdlib/math/base/special/exp":109,"@stdlib/math/base/special/ln":194,"@stdlib/math/base/special/pow":209}],177:[function(require,module,exports){
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

},{"./ibeta_power_terms.js":179}],178:[function(require,module,exports){
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

},{"./ibeta_power_terms.js":179,"@stdlib/math/base/tools/continued-fraction":237}],179:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-e":27,"@stdlib/constants/math/float64-gamma-lanczos-g":32,"@stdlib/constants/math/float64-max-ln":40,"@stdlib/constants/math/float64-min-ln":43,"@stdlib/math/base/special/abs":79,"@stdlib/math/base/special/exp":109,"@stdlib/math/base/special/expm1":112,"@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled":123,"@stdlib/math/base/special/ln":194,"@stdlib/math/base/special/log1p":198,"@stdlib/math/base/special/maxabs":203,"@stdlib/math/base/special/min":205,"@stdlib/math/base/special/minabs":207,"@stdlib/math/base/special/pow":209,"@stdlib/math/base/special/sqrt":232}],180:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-e":27,"@stdlib/constants/math/float64-gamma-lanczos-g":32,"@stdlib/constants/math/float64-max-ln":40,"@stdlib/constants/math/float64-min-ln":43,"@stdlib/constants/math/float64-smallest-normal":47,"@stdlib/math/base/special/exp":109,"@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled":123,"@stdlib/math/base/special/ln":194,"@stdlib/math/base/special/log1p":198,"@stdlib/math/base/special/pow":209,"@stdlib/math/base/special/sqrt":232,"@stdlib/math/base/tools/sum-series":243}],181:[function(require,module,exports){
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

},{"./main.js":183}],182:[function(require,module,exports){
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

},{"./beta_small_b_large_a_series.js":174,"./binomial_ccdf.js":175,"./ibeta_a_step.js":177,"./ibeta_fraction2.js":178,"./ibeta_power_terms.js":179,"./ibeta_series.js":180,"./rising_factorial_ratio.js":185,"@stdlib/constants/math/float64-half-pi":34,"@stdlib/constants/math/float64-max":41,"@stdlib/constants/math/float64-pi":45,"@stdlib/constants/math/float64-smallest-normal":47,"@stdlib/constants/math/int32-max":50,"@stdlib/math/base/special/asin":81,"@stdlib/math/base/special/beta":85,"@stdlib/math/base/special/exp":109,"@stdlib/math/base/special/expm1":112,"@stdlib/math/base/special/floor":118,"@stdlib/math/base/special/log1p":198,"@stdlib/math/base/special/max":201,"@stdlib/math/base/special/min":205,"@stdlib/math/base/special/pow":209,"@stdlib/math/base/special/sqrt":232}],183:[function(require,module,exports){
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


},{"./kernel_betainc.js":182}],184:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-e":27,"@stdlib/constants/math/float64-gamma-lanczos-g":32,"@stdlib/constants/math/float64-max-ln":40,"@stdlib/constants/math/float64-min-ln":43,"@stdlib/math/base/special/abs":79,"@stdlib/math/base/special/exp":109,"@stdlib/math/base/special/gamma":129,"@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled":123,"@stdlib/math/base/special/gammaln":163,"@stdlib/math/base/special/ln":194,"@stdlib/math/base/special/log1p":198,"@stdlib/math/base/special/max":201,"@stdlib/math/base/special/min":205,"@stdlib/math/base/special/pow":209,"@stdlib/math/base/special/sqrt":232}],185:[function(require,module,exports){
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

},{}],186:[function(require,module,exports){
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

},{"./kernel_cos.js":187}],187:[function(require,module,exports){
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

},{"./polyval_c13.js":188,"./polyval_c46.js":189}],188:[function(require,module,exports){
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

},{}],189:[function(require,module,exports){
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

},{}],190:[function(require,module,exports){
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

},{"./kernel_sin.js":191}],191:[function(require,module,exports){
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

},{}],192:[function(require,module,exports){
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

},{"./ldexp.js":193}],193:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-exponent-bias":30,"@stdlib/constants/math/float64-max-base2-exponent":39,"@stdlib/constants/math/float64-max-base2-exponent-subnormal":38,"@stdlib/constants/math/float64-min-base2-exponent-subnormal":42,"@stdlib/constants/math/float64-ninf":44,"@stdlib/constants/math/float64-pinf":46,"@stdlib/math/base/assert/is-infinite":56,"@stdlib/math/base/assert/is-nan":60,"@stdlib/math/base/special/copysign":94,"@stdlib/number/float64/base/exponent":244,"@stdlib/number/float64/base/from-words":246,"@stdlib/number/float64/base/normalize":255,"@stdlib/number/float64/base/to-words":264}],194:[function(require,module,exports){
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

},{"./ln.js":195}],195:[function(require,module,exports){
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

},{"./polyval_p.js":196,"./polyval_q.js":197,"@stdlib/constants/math/float64-exponent-bias":30,"@stdlib/constants/math/float64-ninf":44,"@stdlib/math/base/assert/is-nan":60,"@stdlib/number/float64/base/get-high-word":250,"@stdlib/number/float64/base/set-high-word":259}],196:[function(require,module,exports){
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

},{}],197:[function(require,module,exports){
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

},{}],198:[function(require,module,exports){
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

},{"./log1p.js":199}],199:[function(require,module,exports){
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

},{"./polyval_lp.js":200,"@stdlib/constants/math/float64-exponent-bias":30,"@stdlib/constants/math/float64-ninf":44,"@stdlib/constants/math/float64-pinf":46,"@stdlib/math/base/assert/is-nan":60,"@stdlib/number/float64/base/get-high-word":250,"@stdlib/number/float64/base/set-high-word":259}],200:[function(require,module,exports){
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

},{}],201:[function(require,module,exports){
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

},{"./max.js":202}],202:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-ninf":44,"@stdlib/constants/math/float64-pinf":46,"@stdlib/math/base/assert/is-nan":60,"@stdlib/math/base/assert/is-positive-zero":66}],203:[function(require,module,exports){
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

},{"./maxabs.js":204}],204:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-pinf":46,"@stdlib/math/base/special/abs":79,"@stdlib/math/base/special/max":201}],205:[function(require,module,exports){
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

},{"./min.js":206}],206:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-ninf":44,"@stdlib/constants/math/float64-pinf":46,"@stdlib/math/base/assert/is-nan":60,"@stdlib/math/base/assert/is-negative-zero":62}],207:[function(require,module,exports){
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

},{"./minabs.js":208}],208:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-pinf":46,"@stdlib/math/base/special/abs":79,"@stdlib/math/base/special/min":205}],209:[function(require,module,exports){
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

},{"./pow.js":215}],210:[function(require,module,exports){
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

},{"./polyval_l.js":212,"@stdlib/constants/math/float64-exponent-bias":30,"@stdlib/number/float64/base/get-high-word":250,"@stdlib/number/float64/base/set-high-word":259,"@stdlib/number/float64/base/set-low-word":261}],211:[function(require,module,exports){
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

},{"./polyval_w.js":214,"@stdlib/number/float64/base/set-low-word":261}],212:[function(require,module,exports){
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

},{}],213:[function(require,module,exports){
arguments[4][110][0].apply(exports,arguments)
},{"dup":110}],214:[function(require,module,exports){
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

},{}],215:[function(require,module,exports){
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

},{"./log2ax.js":210,"./logx.js":211,"./pow2.js":216,"./x_is_zero.js":217,"./y_is_huge.js":218,"./y_is_infinite.js":219,"@stdlib/constants/math/float64-ninf":44,"@stdlib/constants/math/float64-pinf":46,"@stdlib/math/base/assert/is-infinite":56,"@stdlib/math/base/assert/is-integer":58,"@stdlib/math/base/assert/is-nan":60,"@stdlib/math/base/assert/is-odd":64,"@stdlib/math/base/special/abs":79,"@stdlib/math/base/special/sqrt":232,"@stdlib/number/float64/base/set-low-word":261,"@stdlib/number/float64/base/to-words":264,"@stdlib/number/uint32/base/to-int32":268}],216:[function(require,module,exports){
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

},{"./polyval_p.js":213,"@stdlib/constants/math/float64-exponent-bias":30,"@stdlib/constants/math/float64-ln-two":37,"@stdlib/math/base/special/ldexp":192,"@stdlib/number/float64/base/get-high-word":250,"@stdlib/number/float64/base/set-high-word":259,"@stdlib/number/float64/base/set-low-word":261,"@stdlib/number/uint32/base/to-int32":268}],217:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-ninf":44,"@stdlib/constants/math/float64-pinf":46,"@stdlib/math/base/assert/is-odd":64,"@stdlib/math/base/special/copysign":94}],218:[function(require,module,exports){
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

},{"@stdlib/number/float64/base/get-high-word":250}],219:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-pinf":46,"@stdlib/math/base/special/abs":79}],220:[function(require,module,exports){
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

},{"./powm1.js":221}],221:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":60,"@stdlib/math/base/special/abs":79,"@stdlib/math/base/special/expm1":112,"@stdlib/math/base/special/ln":194,"@stdlib/math/base/special/pow":209,"@stdlib/math/base/special/trunc":233}],222:[function(require,module,exports){
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

},{"./rempio2.js":224}],223:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":118,"@stdlib/math/base/special/ldexp":192}],224:[function(require,module,exports){
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

},{"./kernel_rempio2.js":223,"./rempio2_medium.js":225,"@stdlib/number/float64/base/from-words":246,"@stdlib/number/float64/base/get-high-word":250,"@stdlib/number/float64/base/get-low-word":252}],225:[function(require,module,exports){
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

},{"@stdlib/math/base/special/round":226,"@stdlib/number/float64/base/get-high-word":250}],226:[function(require,module,exports){
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

},{"./round.js":227}],227:[function(require,module,exports){
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

},{}],228:[function(require,module,exports){
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

},{"./sin.js":229}],229:[function(require,module,exports){
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

},{"@stdlib/math/base/special/kernel-cos":186,"@stdlib/math/base/special/kernel-sin":190,"@stdlib/math/base/special/rempio2":222,"@stdlib/number/float64/base/get-high-word":250}],230:[function(require,module,exports){
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

},{"./sinpi.js":231}],231:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-pi":45,"@stdlib/math/base/assert/is-infinite":56,"@stdlib/math/base/assert/is-nan":60,"@stdlib/math/base/special/abs":79,"@stdlib/math/base/special/copysign":94,"@stdlib/math/base/special/cos":96,"@stdlib/math/base/special/sin":228}],232:[function(require,module,exports){
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

},{}],233:[function(require,module,exports){
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

},{"./trunc.js":234}],234:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ceil":92,"@stdlib/math/base/special/floor":118}],235:[function(require,module,exports){
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

},{"@stdlib/constants/math/float32-smallest-normal":26,"@stdlib/constants/math/float64-eps":28,"@stdlib/math/base/special/abs":79}],236:[function(require,module,exports){
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

},{"@stdlib/constants/math/float32-smallest-normal":26,"@stdlib/constants/math/float64-eps":28,"@stdlib/math/base/special/abs":79}],237:[function(require,module,exports){
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

},{"./basic.js":235,"./generators.js":236,"@stdlib/utils/detect-generator-support":278}],238:[function(require,module,exports){
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

},{}],239:[function(require,module,exports){
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

},{"./evalpoly.js":238}],240:[function(require,module,exports){
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

},{"./evalpoly.js":238,"./factory.js":239,"@stdlib/utils/define-read-only-property":273}],241:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-eps":28,"@stdlib/math/base/special/abs":79}],242:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-eps":28,"@stdlib/math/base/special/abs":79}],243:[function(require,module,exports){
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

},{"./basic.js":241,"./generators.js":242,"@stdlib/utils/detect-generator-support":278}],244:[function(require,module,exports){
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

},{"./main.js":245}],245:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-exponent-bias":30,"@stdlib/constants/math/float64-high-word-exponent-mask":35,"@stdlib/number/float64/base/get-high-word":250}],246:[function(require,module,exports){
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

},{"./main.js":248}],247:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":18}],248:[function(require,module,exports){
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

},{"./indices.js":247,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],249:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":18}],250:[function(require,module,exports){
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

},{"./main.js":251}],251:[function(require,module,exports){
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

},{"./high.js":249,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],252:[function(require,module,exports){
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

},{"./main.js":254}],253:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":18}],254:[function(require,module,exports){
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

},{"./low.js":253,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],255:[function(require,module,exports){
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

},{"./main.js":256}],256:[function(require,module,exports){
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

},{"./normalize.js":257}],257:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-smallest-normal":47,"@stdlib/math/base/assert/is-infinite":56,"@stdlib/math/base/assert/is-nan":60,"@stdlib/math/base/special/abs":79}],258:[function(require,module,exports){
arguments[4][249][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":18,"dup":249}],259:[function(require,module,exports){
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

},{"./main.js":260}],260:[function(require,module,exports){
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

},{"./high.js":258,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],261:[function(require,module,exports){
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

},{"./main.js":263}],262:[function(require,module,exports){
arguments[4][253][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":18,"dup":253}],263:[function(require,module,exports){
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

},{"./low.js":262,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],264:[function(require,module,exports){
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

},{"./main.js":266}],265:[function(require,module,exports){
arguments[4][247][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":18,"dup":247}],266:[function(require,module,exports){
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

},{"./to_words.js":267}],267:[function(require,module,exports){
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

},{"./indices.js":265,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],268:[function(require,module,exports){
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

},{"./main.js":269}],269:[function(require,module,exports){
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

},{}],270:[function(require,module,exports){
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

},{}],271:[function(require,module,exports){
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

},{"./constant_function.js":270}],272:[function(require,module,exports){
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

},{}],273:[function(require,module,exports){
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

},{"./define_read_only_property.js":272}],274:[function(require,module,exports){
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

},{"./float64array.js":275,"@stdlib/assert/is-float64array":15}],275:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Float64Array === 'function' ) ? Float64Array : null;

},{}],276:[function(require,module,exports){
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

},{"./detect_float64array_support.js":274}],277:[function(require,module,exports){
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

},{"@stdlib/utils/eval":292}],278:[function(require,module,exports){
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

},{"./detect_generator_support.js":277}],279:[function(require,module,exports){
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

},{}],280:[function(require,module,exports){
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

},{"./detect_symbol_support.js":279}],281:[function(require,module,exports){
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

},{"@stdlib/utils/detect-symbol-support":280}],282:[function(require,module,exports){
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

},{"./has_tostringtag_support.js":281}],283:[function(require,module,exports){
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

},{"./uint16array.js":285,"@stdlib/assert/is-uint16array":20,"@stdlib/constants/math/uint16-max":51}],284:[function(require,module,exports){
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

},{"./detect_uint16array_support.js":283}],285:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint16Array === 'function' ) ? Uint16Array : null;

},{}],286:[function(require,module,exports){
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

},{"./uint32array.js":288,"@stdlib/assert/is-uint32array":22,"@stdlib/constants/math/uint32-max":52}],287:[function(require,module,exports){
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

},{"./detect_uint32array_support.js":286}],288:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint32Array === 'function' ) ? Uint32Array : null;

},{}],289:[function(require,module,exports){
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

},{"./uint8array.js":291,"@stdlib/assert/is-uint8array":24,"@stdlib/constants/math/uint8-max":53}],290:[function(require,module,exports){
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

},{"./detect_uint8array_support.js":289}],291:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint8Array === 'function' ) ? Uint8Array : null;

},{}],292:[function(require,module,exports){
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

},{}],293:[function(require,module,exports){
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

},{"./native_class.js":294,"./polyfill.js":295,"@stdlib/utils/detect-tostringtag-support":282}],294:[function(require,module,exports){
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

},{"./tostring.js":296}],295:[function(require,module,exports){
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

},{"./tostring.js":296,"./tostringtag.js":297,"@stdlib/assert/has-own-property":14}],296:[function(require,module,exports){
'use strict';

// MAIN //

var toStr = Object.prototype.toString;


// EXPORTS //

module.exports = toStr;

},{}],297:[function(require,module,exports){
'use strict';

// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{}],298:[function(require,module,exports){
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

},{}],299:[function(require,module,exports){

},{}],300:[function(require,module,exports){
arguments[4][299][0].apply(exports,arguments)
},{"dup":299}],301:[function(require,module,exports){
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

},{}],302:[function(require,module,exports){
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

},{"base64-js":298,"ieee754":321}],303:[function(require,module,exports){
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
},{"../../is-buffer/index.js":323}],304:[function(require,module,exports){
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

},{"./lib/is_arguments.js":305,"./lib/keys.js":306}],305:[function(require,module,exports){
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

},{}],306:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],307:[function(require,module,exports){
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

},{"foreach":317,"object-keys":327}],308:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],309:[function(require,module,exports){
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

},{"./helpers/isFinite":310,"./helpers/isNaN":311,"./helpers/mod":312,"./helpers/sign":313,"es-to-primitive/es5":314,"has":320,"is-callable":324}],310:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],311:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],312:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],313:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],314:[function(require,module,exports){
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

},{"./helpers/isPrimitive":315,"is-callable":324}],315:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],316:[function(require,module,exports){
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

},{}],317:[function(require,module,exports){

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


},{}],318:[function(require,module,exports){
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

},{}],319:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":318}],320:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":319}],321:[function(require,module,exports){
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

},{}],322:[function(require,module,exports){
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

},{}],323:[function(require,module,exports){
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

},{}],324:[function(require,module,exports){
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

},{}],325:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],326:[function(require,module,exports){
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

},{}],327:[function(require,module,exports){
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

},{"./isArguments":328}],328:[function(require,module,exports){
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

},{}],329:[function(require,module,exports){
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
},{"_process":301}],330:[function(require,module,exports){
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
},{"_process":301}],331:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":332}],332:[function(require,module,exports){
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
},{"./_stream_readable":334,"./_stream_writable":336,"core-util-is":303,"inherits":322,"process-nextick-args":330}],333:[function(require,module,exports){
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
},{"./_stream_transform":335,"core-util-is":303,"inherits":322}],334:[function(require,module,exports){
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
},{"./_stream_duplex":332,"./internal/streams/BufferList":337,"./internal/streams/destroy":338,"./internal/streams/stream":339,"_process":301,"core-util-is":303,"events":316,"inherits":322,"isarray":325,"process-nextick-args":330,"safe-buffer":345,"string_decoder/":351,"util":299}],335:[function(require,module,exports){
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
},{"./_stream_duplex":332,"core-util-is":303,"inherits":322}],336:[function(require,module,exports){
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
},{"./_stream_duplex":332,"./internal/streams/destroy":338,"./internal/streams/stream":339,"_process":301,"core-util-is":303,"inherits":322,"process-nextick-args":330,"safe-buffer":345,"util-deprecate":358}],337:[function(require,module,exports){
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
},{"safe-buffer":345}],338:[function(require,module,exports){
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
},{"process-nextick-args":330}],339:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":316}],340:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":341}],341:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":332,"./lib/_stream_passthrough.js":333,"./lib/_stream_readable.js":334,"./lib/_stream_transform.js":335,"./lib/_stream_writable.js":336}],342:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":341}],343:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":336}],344:[function(require,module,exports){
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
},{"_process":301,"through":357}],345:[function(require,module,exports){
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

},{"buffer":302}],346:[function(require,module,exports){
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

},{"events":316,"inherits":322,"readable-stream/duplex.js":331,"readable-stream/passthrough.js":340,"readable-stream/readable.js":341,"readable-stream/transform.js":342,"readable-stream/writable.js":343}],347:[function(require,module,exports){
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

},{"es-abstract/es5":309,"function-bind":319}],348:[function(require,module,exports){
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

},{"./implementation":347,"./polyfill":349,"./shim":350,"define-properties":307,"function-bind":319}],349:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":347}],350:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":349,"define-properties":307}],351:[function(require,module,exports){
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
},{"safe-buffer":345}],352:[function(require,module,exports){
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
},{"./lib/default_stream":353,"./lib/results":355,"./lib/test":356,"_process":301,"defined":308,"through":357}],353:[function(require,module,exports){
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
},{"_process":301,"fs":300,"through":357}],354:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":301}],355:[function(require,module,exports){
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
},{"_process":301,"events":316,"function-bind":319,"has":320,"inherits":322,"object-inspect":326,"resumer":344,"through":357}],356:[function(require,module,exports){
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
},{"./next_tick":354,"deep-equal":304,"defined":308,"events":316,"has":320,"inherits":322,"path":329,"string.prototype.trim":348}],357:[function(require,module,exports){
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
},{"_process":301,"stream":346}],358:[function(require,module,exports){
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
},{}]},{},[75,76,77]);