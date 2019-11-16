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

},{"./float64array.js":1,"./polyfill.js":3,"@stdlib/utils/detect-float64array-support":235}],3:[function(require,module,exports){
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

},{"./polyfill.js":5,"./uint16array.js":6,"@stdlib/utils/detect-uint16array-support":243}],5:[function(require,module,exports){
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

},{"./polyfill.js":8,"./uint32array.js":9,"@stdlib/utils/detect-uint32array-support":246}],8:[function(require,module,exports){
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

},{"./polyfill.js":11,"./uint8array.js":12,"@stdlib/utils/detect-uint8array-support":249}],11:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":252}],17:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":252}],22:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":252}],24:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":252}],26:[function(require,module,exports){
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

},{}],32:[function(require,module,exports){
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

},{}],33:[function(require,module,exports){
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

},{}],34:[function(require,module,exports){
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

},{}],35:[function(require,module,exports){
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

},{}],36:[function(require,module,exports){
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

},{}],37:[function(require,module,exports){
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

},{}],38:[function(require,module,exports){
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

},{}],39:[function(require,module,exports){
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

},{}],40:[function(require,module,exports){
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

},{}],41:[function(require,module,exports){
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

},{}],42:[function(require,module,exports){
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

},{}],43:[function(require,module,exports){
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

},{}],44:[function(require,module,exports){
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

},{}],45:[function(require,module,exports){
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

},{}],46:[function(require,module,exports){
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

},{}],47:[function(require,module,exports){
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

},{}],48:[function(require,module,exports){
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

},{}],49:[function(require,module,exports){
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

},{}],50:[function(require,module,exports){
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

},{"./is_even.js":51}],51:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-integer":54}],52:[function(require,module,exports){
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

},{"./is_infinite.js":53}],53:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-ninf":41,"@stdlib/constants/math/float64-pinf":43}],54:[function(require,module,exports){
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

},{"./is_integer.js":55}],55:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":99}],56:[function(require,module,exports){
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

},{"./is_nan.js":57}],57:[function(require,module,exports){
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

},{}],58:[function(require,module,exports){
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

},{"./is_negative_zero.js":59}],59:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-ninf":41}],60:[function(require,module,exports){
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

},{"./is_odd.js":61}],61:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-even":50}],62:[function(require,module,exports){
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

},{"./is_positive_zero.js":63}],63:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-pinf":43}],64:[function(require,module,exports){
'use strict';

// MODULES //

var gammainc = require( '@stdlib/math/base/special/gammainc' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );


// MAIN //

/**
* Evaluates the cumulative distribution function (CDF) for an inverse gamma distribution with shape parameter `alpha` and scale parameter `beta` at a value `x`.
*
* @param {number} x - input value
* @param {PositiveNumber} alpha - shape parameter
* @param {PositiveNumber} beta - scale parameter
* @returns {Probability} evaluated CDF
*
* @example
* var y = cdf( 2.0, 1.0, 1.0 );
* // returns ~0.607
*
* @example
* var y = cdf( 2.0, 3.0, 1.0 );
* // returns ~0.986
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
* var y = cdf( NaN, 0.0, 1.0 );
* // returns NaN
*
* @example
* var y = cdf( 0.0, NaN, 1.0 );
* // returns NaN
*
* @example
* var y = cdf( 0.0, 0.0, NaN );
* // returns NaN
*
* @example
* var y = cdf( 2.0, -1.0, 1.0 );
* // returns NaN
*
* @example
* var y = cdf( 2.0, 1.0, -1.0 );
* // returns NaN
*/
function cdf( x, alpha, beta ) {
	if (
		isnan( x ) ||
		isnan( alpha ) ||
		isnan( beta ) ||
		alpha <= 0.0 ||
		beta <= 0.0
	) {
		return NaN;
	}
	if ( x <= 0.0 ) {
		return 0.0;
	}
	return gammainc( beta / x, alpha, true, true );
}


// EXPORTS //

module.exports = cdf;

},{"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/gammainc":120}],65:[function(require,module,exports){
'use strict';

// MODULES //

var constantFunction = require( '@stdlib/utils/constant-function' );
var gammainc = require( '@stdlib/math/base/special/gammainc' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );


// MAIN //

/**
* Returns a function for evaluating the cumulative distribution function (CDF) for an inverse gamma distribution with shape parameter `alpha` and scale parameter `beta`.
*
* @param {PositiveNumber} alpha - shape parameter
* @param {PositiveNumber} beta - scale parameter
* @returns {Function} CDF
*
* @example
* var cdf = factory( 3.0, 1.5 );
*
* var y = cdf( 1.0 );
* // returns ~0.809
*
* y = cdf( 2.0 );
* // returns ~0.96
*/
function factory( alpha, beta ) {
	if (
		isnan( alpha ) ||
		isnan( beta ) ||
		alpha <= 0.0 ||
		beta <= 0.0
	) {
		return constantFunction( NaN );
	}
	return cdf;

	/**
	* Evaluates the cumulative distribution function (CDF) for an inverse gamma distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {Probability} evaluated CDF
	*
	* @example
	* var y = cdf( 2.0 );
	* // returns <number>
	*/
	function cdf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x <= 0 ) {
			return 0;
		}
		return gammainc( beta / x, alpha, true, true );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/gammainc":120,"@stdlib/utils/constant-function":230}],66:[function(require,module,exports){
'use strict';

/**
* Inverse gamma distribution cumulative distribution function (CDF).
*
* @module @stdlib/math/base/dists/invgamma/cdf
*
* @example
* var cdf = require( '@stdlib/math/base/dists/invgamma/cdf' );
*
* var y = cdf( 1.0, 8.0, 3.0 );
* // returns ~0.988
*
* y = cdf( 0.0, 1.0, 1.0 );
* // returns 0.0
*
* var mycdf = cdf.factory( 2.0, 0.5 );
* y = mycdf( 0.5 );
* // returns ~0.736
*
* y = mycdf( 2.0 );
* // returns ~0.973
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var cdf = require( './cdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( cdf, 'factory', factory );


// EXPORTS //

module.exports = cdf;

},{"./cdf.js":64,"./factory.js":65,"@stdlib/utils/define-read-only-property":232}],67:[function(require,module,exports){
module.exports={"expected":[1.823025331259278e-105,0.9996435377883127,0.9800032284957347,0.9999820030967078,0.9999764607386108,0.9273843949332004,0.0025270778463117346,0.9999989880411716,0.9999999583958549,0.9987645998077765,0.5700713595016297,0.9895135065122446,0.9999999999999998,0.9956853526166828,0.9959004656711519,0.9999870359414873,0.9986359913166646,0.9620047591241998,0.6087698929467126,1.5628232449378787e-36,0.00602201233002031,0.9983704572056842,6.915795266424078e-9,0.9998223997952423,0.9999979703454417,0.9999529625462306,0.998359463593359,0.9999865911419593,0.9999999988998677,0.2281997226178294,0.9999999999635074,5.937784136866247e-10,0.8844664834491942,0.9997885440021718,0.999999974187347,0.9825942086404679,0.9896184265808338,0.18063966382793578,0.8901594489869091,0.2767475118966379,0.883367169460778,0.9999761033783383,0.9999999630522267,1.8664361944783358e-7,0.999986484977663,0.999999997103247,0.9999999434710218,0.8917500334149984,0.9999272845022787,3.9762311039738345e-50,0.7221685393348958,7.057703396363573e-39,6.135799717210331e-14,0.6351299536085209,2.357419962205733e-68,0.0002240249543402079,0.9999142817556406,0.9999218260842091,0.9994586891538481,0.15557324432682548,0.9999999999971737,0.9999882893413914,0.9998451839889156,0.2559920492576191,0.9647168534139152,0.9999998828288982,0.999960472131279,0.9999178984869628,0.8633981561465692,0.9491753506784264,0.4615921443964168,0.9999999999998742,0.999999966586268,0.0,0.9999999994487682,0.9999999975521744,0.7551656352218828,0.9999886537919472,0.9999999999671849,0.9859681439677792,0.16207709468328405,0.9999999847759725,0.9999999999986388,0.9509496739820028,0.9987226799245309,5.161474763213933e-5,0.9999999999890683,0.9999999999999993,0.8828628176059334,0.9999999997508561,0.6677802917373068,0.00594807596150227,0.9519074288061105,0.19782844277143113,0.0017624542756783908,0.9958665451167239,0.9999999621508306,0.01133982950413102,0.9999951282919396,0.9990559977282494,0.9998000370957406,0.9959423161964224,0.4742354844880275,0.9912021161605282,0.023552314956210515,0.9890536560538908,0.021403213733441145,3.885290034184788e-29,0.9999999999999726,0.9999928452376369,0.1375963330718954,0.9702850274742052,0.9999998575514357,0.9999291228085601,0.9846467422249746,0.9999999999999539,0.11513662388361849,0.9999999913737538,0.9965329344591587,0.9999986542357651,0.9999982166072554,0.9996926270831553,0.28290331099561433,1.515926987806723e-32,0.8300039747258003,0.904829071374608,0.9446212560199205,0.9999860570852495,0.35595943502423427,0.9999998879321539,0.9999999999658438,3.1477741546125154e-8,0.9999999999731217,0.9870259121878406,0.006317811497923308,0.03450875396633376,0.9939203386097494,0.9999031067518557,0.9886221725115888,0.9999998201043026,0.8350185463337672,0.438666922253268,4.823415924031343e-56,0.9988853699372987,0.9999998343618108,0.9944331798175647,0.793724045887924,0.3862273584418424,1.175237231830441e-76,0.9922590817531075,0.9999999999546649,0.9999999941772015,0.9995359647418123,7.98651496768941e-7,0.8992870509662615,0.996684879157854,6.2689593189083e-77,0.8336043613164204,0.14259637269608125,0.9436764942854761,0.999999999999999,0.9999673465918237,0.9993255824807872,0.0011845978308883548,0.7487671666312874,0.9999703367759425,1.5535314608584672e-26,0.004559435925031137,0.997402358877931,0.9813772787741821,0.9999999999999937,1.0,0.9295030464022644,0.9999608818969711,0.999954490594093,0.4234102421761095,0.9999999266220928,0.2774493157615175,0.9983278301244802,0.9999986239150082,1.2395770177019183e-22,0.9999999999999702,0.9966234244053942,0.9999422391545215,2.671825937657985e-231,0.9999459262973764,0.10393412969316727,0.9255492435858779,0.4917219146576284,9.80367153677188e-7,0.9997930048731885,0.9948809694475002,0.9954388843652386,0.9998838449260135,0.9992254981609862,0.9821610530135495,0.9999997151135401,0.999545869010216,0.997819198609612,0.9909839079644899,0.9555789946762931,0.9999999995811305,0.0019196388270906542,0.0,0.9999913745558934,0.999996013121214,0.9999999999999993,0.9999999995304435,0.9999974694145514,0.9635595734894967,0.9999999637553131,0.5371322746464453,0.9952208277425082,5.9060446326497194e-12,0.9960804337539405,0.5399229238280062,0.9999999519201314,0.9999999886816681,0.999999992431369,1.645424554461092e-7,0.9035570536553534,0.99939310352948,0.9999999996614674,0.9995909909285932,0.9942421925513263,0.9819731164460307,0.3032496562418322,1.0,0.9999999999999314,3.0457386762071207e-16,0.9999976521988533,1.0,0.9988112679000408,0.08607479864503008,0.877640482595003,0.6235757078548272,0.9993519528158656,0.9999999995863696,0.9999948352021296,0.009391306359718235,0.9997676736520039,0.9999999981132767,0.9805035775907589,0.042015863637158715,2.3417725714997933e-14,0.9997650305766531,0.9998116462306108,0.9999967682631039,0.999999934437755,0.9999999999999978,0.999999998758893,0.9293051184991769,0.9999986200214174,0.9999480776942639,0.9999999241826616,0.9999999778469864,0.9999662123879911,5.359719391328167e-47,0.9720567426933832,0.025382840027277313,0.998605727929224,0.9999922764250941,0.6571230415989576,0.9999999999929863,7.388030467413962e-29,0.7407695507920138,0.9992475309106703,0.9999999999651539,0.40728768313255187,0.9999994122114408,0.999999909510263,0.9999999683090092,2.9525624281197e-249,0.3245337838851883,9.745857091587528e-9,0.903340465355408,0.9999999305448695,0.29117796413652125,0.9999967697674406,0.9990366177970045,0.9999707164403056,0.9859439131465274,0.9999900764369828,2.2138199948430646e-5,0.9997684731586203,0.9504638985196504,0.00012024744873769878,0.9997076092653211,0.885164740537299,0.9999851929392812,0.9954413884279005,0.9992694044452377,0.9999932483549225,0.9999942900214739,0.7937005558654275,0.21622920359809733,0.6927422440272153,0.9999338095754742,0.999993672057777,7.507260578992358e-31,0.9998266661591405,0.9877281441083464,0.47558117717982107,0.9997195886277445,1.0,0.9999909055021248,0.07861041238002885,0.9999998896975776,0.7933670876830305,0.9865179946754863,0.033261450548314433,0.9999999997931405,0.9830363339446371,0.999882738378204,0.9999635034361609,0.9999999971441816,0.03946136784002641,0.8724275123774738,0.9999999999914589,0.001643867052705757,0.7547525240015226,0.9999993242457786,0.008402561643002507,1.1579082361736401e-52,0.5266351663496582,0.0547144838496839,0.9999997235123455,0.9971685208475812,0.9999986568716013,0.9970663569872033,0.9999999082646794,9.956224754923663e-27,0.9999999999991876,0.20905124295237437,0.8953281306526057,0.9999999999999654,0.9999999996218039,0.9860463496869311,0.9999659715149554,0.90447066115524,0.5503509398972601,0.6408174133977813,0.9999999965673794,0.9993211215369655,0.4233835247128652,3.7356321763302146e-8,0.999999969478459,0.9993579518942899,0.017280262758358225,1.8928766994272781e-84,0.9999941104041005,0.9999229527949601,0.9954633890940233,0.9999999999923901,0.9999999999954352,0.9994361881335767,0.20202418006123604,0.9992586679844601,0.988607449366365,0.07565971644025736,4.203013122540233e-9,0.9966350350608904,0.993388391069734,0.9999999999972792,0.9999999749021714,0.6361642708686881,0.4208520736026345,3.633762713963238e-27,3.232294936266515e-7,0.9999999788036977,0.9999999999960703,0.9999999994409713,0.2058503622676062,0.999997824350278,0.9999409484417184,0.9999999999999645,0.999969659056549,0.999895050170419,0.9999999999999493,0.9999999989711885,0.9999999997659736,0.9993333648421449,0.9278110199164634,0.9999998186250203,0.9761849064208816,0.9999999999915308,0.9999741532734091,0.9999999436231636,0.9999999999033751,0.021832802418890806,0.9999999759237281,0.07051541849817049,0.974729452159555,0.24585790587781356,0.9999996076169486,0.9997002513248562,0.9999763147248766,0.9999999962337913,0.9998089746953035,0.9999999994858907,0.999999878899144,6.503595939241871e-15,0.9999963846366751,0.998218625440792,0.9858390833679606,0.9987007979900278,0.3683390172006632,0.0009583073131495069,0.003940194694582485,0.9999999999925655,0.999996391669024,0.508351522239216,4.305091627479455e-12,0.9772526562842438,0.9988181484964499,0.9939545133229059,6.4071878900034366e-21,0.9999999998270078,0.8952486406831324,1.9312524965068666e-5,0.70199830803486,1.0,0.9986047058991024,0.37247422276875064,0.9999999999997168,0.0408818857287855,0.9999994622560836,0.9951759049729354,0.9997309167142592,0.9993432065931097,5.542797674360233e-54,0.9999999999999898,0.9999999970682877,0.9999786804409292,0.0002565897396749903,4.395745426249843e-192,1.0,0.9999999982927331,1.0,0.9859739890607954,0.9999345961346258,0.9999999999995063,0.2003684090941237,0.9999873470388869,0.9999999997283686,0.9999998856133586,0.9988407550100337,0.9776318669631672,0.9837261953324653,0.9528766962232081,1.0,5.341531126370945e-7,0.8156046812410661,0.9352861412245949,0.9999798017592905,0.9999997175547465,0.13900408236528608,0.2322112722765936,0.9999998903675288,0.9952450185886081,0.9732168271777453,0.8314316129458816,0.9978100620681041,0.9999999999999987,0.9042953622848549,0.9976894228563411,0.9999297583983446,0.9646423113999281,0.919246203262164,0.9950543998467714,0.7654110218171641,0.9692351773567971,0.9999687388740726,2.5960509624191687e-103,0.6750409893507376,0.9998855549425466,0.9849011873387684,0.9999972973052388,0.9999915634256429,0.9999999999999999,0.9996569306594569,0.9999999999999994,0.996433477483956,7.801418298920615e-7,0.976995390277395,0.9999999999992484,0.9999999974397588,0.9999999984426533,0.9954999504508384,0.9999999943641429,0.7973313861825401,0.27628329520839334,0.018769248394031008,0.9555580170709378,0.8842033622667831,0.9995708039823827,0.0001363214134639792,0.777791448077525,0.0008610680984917867,0.6041854817420209,0.9609617123712312,0.9999645768412777,0.9999999999966641,0.9999999998656892,0.999999999999995,0.9973936565555332,0.9999515724498181,0.9999889828765297,0.9999999999848824,0.9999999986542021,0.9999999999949868,0.9999999814598945,0.09344525867029266,0.9999524932806827,0.9991306733379077,0.9884318869900511,0.9999999708728999,0.9999485117413011,0.9998575961289758,0.9992066317868809,0.9991686742797966,0.9999999972507485,0.8618774978569943,0.9999999727298118,0.3759425640285885,0.9988285564382609,0.9981240245508429,0.9999814677219835,0.9850138544553647,0.9999335686019657,0.9999999874219283,0.9985422875030627,0.9908460612582638,1.470668786539737e-16,0.9999233794714184,0.9957662236291565,0.9999999919935579,0.9999998925281193,0.0036148203084699015,0.9999963544326199,1.3840004606920263e-6,7.205485928195852e-23,0.06432943747877548,0.9999999990291547,0.8645908084541034,0.9504634171630156,0.9999999999992687,0.9999994112676414,0.9999678746049535,0.9970529996146126,1.1831802360476293e-17,0.9979933551023613,0.9999604745979506,0.02120932414806768,0.9999756925269361,0.0671004408569643,0.9999999947996284,0.999999999999946,0.9999996595572276,4.284155361880248e-238,2.8859817470753877e-35,0.9999693401628191,0.9996180525261121,0.9999647057528255,0.9939592906623627,0.7486029286284497,0.9999999999998698,0.06494093819913511,0.999734072531506,0.9999999999984378,0.7375397707366521,7.737430411152038e-5,4.946776511263445e-7,0.6450355231628379,0.9999999999999998,0.999998259897537,0.6162773797933481,0.17941068364081192,0.9539218825537001,3.1785517276814943e-17,0.9999999999999998,2.3376765705801055e-155,0.9999999967568375,0.9900039479788626,0.0047328555802526595,0.11156601434613843,0.9999071255617293,0.40512462660663495,0.9999997367986616,0.9997594176350236,0.49950197129667256,0.9999960777972328,6.339319955072627e-5,0.9777745246788352,0.6446412998438994,0.6038569983716051,0.9999999999699345,0.9999999997231674,0.9625604738530386,0.9999999999999767,0.9942113000380375,0.9999431320078748,0.854268057335761,0.5629623094826912,0.9999999965791441,0.9999999999884142,0.9999999962061847,0.9999999999771594,8.160787764937719e-76,0.8703223046927716,0.9996093503035975,0.9995974611739417,5.3772299299457635e-6,2.843285578678919e-17,0.999999935277231,0.9999999731660117,0.9913845948806242,0.11290107911816435,1.0817163591476662e-7,0.07826306253198798,0.999999450496221,0.9923295177805295,0.999979574463458,0.4520429815918476,0.9999999817987267,8.471610553012703e-12,4.7223275814370534e-39,0.9983887669324472,0.9210026488600741,0.9999999999586638,0.9808516987647826,0.9952503051042687,0.9999999999942211,0.6883184406586346,0.9999999949862857,0.9999999999999956,0.9999843391803072,0.9999584537636146,0.005658297587133509,0.9999997223551617,0.9999507719638638,0.9991042262085056,0.9999999958050607,0.008091733108605396,0.9999406465102492,0.9999999954881157,0.9999680905312617,7.277630720787332e-20,1.3200230342400704e-17,0.9999999999860536,0.9958955362712734,8.19212323113107e-5,0.8374168832914105,0.9955072663978553,9.301903252002838e-5,0.9999615494918712,0.9999989416613296,0.9997199053314124,1.4386488296179676e-13,0.06344126899268512,0.9670667652844117,0.9999998774208022,0.999999999994512,0.9999971459607103,0.9999999930770643,0.9998734655998608,4.825627771885212e-99,0.9770095345134556,0.9969850515850837,0.8752652800919652,0.9997710111832042,0.9999785278397048,9.342939007180982e-31,0.9999999996257156,0.9999917573154004,7.088591341747361e-165,0.9078750622017969,0.9856416498106668,0.18760008242745926,0.9999999998914625,0.7575350047270838,0.002785004441595082,1.0846853427367975e-6,1.2984667196141006e-16,0.9995957533869287,0.9987808614090469,0.9999999326457312,0.8595318707012062,0.9405881577049788,0.999999986588867,0.010195855640661236,0.9999996710918299,0.9786928389629067,0.9888849986999133,5.759012560921043e-26,0.7546107240995868,0.999999977405857,0.008670945836220719,0.9995840641967949,0.9999999876006697,0.9999999826246354,0.9403977784619242,0.9999681392693329,0.9999723915135893,0.9604483731335279,0.9999999999999997,0.9913876746729098,0.32479447442568105,0.9623383851911075,0.9999999870629676,0.999999999999901,0.995765948843707,0.9998879812997029,0.9854002184640058,0.001270094352175963,0.9999999992098075,0.9999994409860876,0.9999999999999862,0.7803434029635375,0.9999998921059066,0.9999999732981888,1.0,0.9999999379615234,0.9998087144771928,0.03506495497127805,3.5077105831511197e-15,0.9671850639477709,0.9999949963522914,0.9998439168993676,0.9999999999791089,0.000503384467877659,0.999999997301905,0.9999980086139669,0.08730823071650914,0.2841476341265391,0.9999863152563041,0.7646141324178083,0.9990112908417651,0.9709692335785747,0.9487265660411979,0.7965491999819065,0.9999999991062384,0.9999713700527597,0.9999866233498502,0.9998666704562156,0.4051516234826839,0.9999999999998471,0.9999978524231704,0.04789391535770153,1.0,8.49333108342985e-29,2.1079491817515368e-16,0.9999872943878045,0.9999985187710987,0.8359582227900377,0.9999999999999999,2.5022945721377872e-37,0.283843560999881,0.9999996740174731,0.09348024828693122,0.9999965752867268,1.397894179175681e-23,0.9990618058694853,0.3658166211447247,0.9999993907923052,0.002825808428005539,0.9647215428530899,0.9999995207666346,0.9999999999999857,0.5602648967895358,0.999993126507529,0.9999985461953488,0.9998915044943963,0.42104026953882473,0.9999893953022528,0.9999999999999969,0.9999999999996151,0.9999997084299524,0.9935921347858105,0.639430670903655,0.9999991611722086,0.9999989628643108,0.9999999999997918,0.9999999999995848,0.9999980949229064,0.9999324136870952,0.9999995557435518,0.9999999999220962,0.9842630212548331,0.9998272360098054,0.9394081746399876,3.6297477121615226e-12,0.9989832207058936,0.9775460637647352,0.9999996357669911,1.0,0.036516478547771986,0.9999999999999999,0.9965563561934067,0.9630062925866645,0.9999998854772503,1.300287357896123e-6,0.9999999959708618,0.5708960064467473,0.9999981585295884,1.069087997910917e-83,0.999996601995383,0.9995713318832613,0.9999999728072474,0.9999049928939097,0.9999999772060875,0.9974903736408636,0.6964956994128944,0.9999999998729272,0.010211246448738122,0.9999999975764594,0.999992192378443,2.899459941900787e-9,0.9999990899219938,0.9871042842181613,0.4495692044125577,0.9998329389895027,0.7757987234509021,0.9999796737436657,5.293199513925509e-146,0.9996331399904562,0.8175140298928381,0.9415405856118557,0.9165654131226134,0.9999999992943718,0.9264254209918575,4.6145304901791495e-7,0.9999999999999957,0.030065732959535636,0.9999999999980498,0.9998662256522549,0.9661081624354871,0.9999993938076338,0.999999998120074,0.10511206907526754,0.07460175422041128,0.7842372864906362,1.0,0.9995392553148653,1.0,0.9999999999995606,0.9999949316241038,0.8892412343141528,8.918474579464626e-17,0.9999999990618396,2.9293139131743262e-9,7.85836699268206e-9,0.0001869497357235763,0.9999999999888262,0.999999999516422,0.9999999999982486,0.6769555631779285,0.9999999998401167,0.9995645115532533,0.9999965383795683,0.9999995706306437,0.9993539502032041,0.9999979645984693,0.9999996650233927,0.232006987799634,0.13974189003410603,0.9999912974295109,0.36660992444277096,4.589292956096224e-9,0.999378378965902,0.9998861289944594,0.9974756337882704,0.9999994440032548,0.9999981962663838,3.19199515514048e-10,0.09654925981945377,0.9994566795689306,5.735632618471195e-10,9.960966495201324e-307,0.9335004290800759,2.142804663720485e-14,0.9999999998668909,5.388646386082489e-28,0.999999999998961,5.159738730536069e-12,0.8645276761830244,0.9999873294867749,0.999999999999476,0.9783330483647023,0.9940351607363165,0.9999999999998362,0.9999999999999966,0.9999999549481179,0.01435437142952487,0.8617892873277159,0.49556747231433335,1.0,0.9331679975602309,0.9905900772501194,0.9992443681911553,2.914935402062302e-25,0.6805948327591492,1.2033826917424539e-11,0.9430610202091078,0.9909328240014156,0.04180326901230609,0.2673671705307625,0.9999998984761955,0.46625526223517594,0.9999999999938594,8.336444991933163e-20,0.9948240151065755,0.09155995671827771,0.9999885558283717,0.9999999497544397,0.9999982728693719,0.03286187555870317,0.023259472676758604,0.9999993745609316,0.9999999367956846,0.9999999857050101,1.337349929146958e-19,0.9999790738674262,0.9855780982192235,0.99999645212926,0.9999981623272217,0.4446355488728331,0.9999927468449851,0.9850252133959781,0.9944841670762129,0.9999997234052955,0.9763611158293065,0.9770034570674196,0.8542749743145085,0.9999999999963247,0.05275656069759273,0.0031783843784728254,0.9993054209801724,0.07656309110073829,0.00046916224082090875,0.9935356224939844,0.8622136717453389,0.9855962832588333,0.9998221548734025,0.9999999999936217,0.999087481397301,0.9999961079308277,0.46844560418052555,0.9999999999999831,0.8718183770218167,0.9999992049703194,9.149251166902013e-9,0.9933067252263722,0.9999999999999996,0.9995833634232711,0.2317762903358262,0.18779057084002204,0.9999999974705043,0.9943455071564617,0.999999785106838,0.774332321970437,0.9999999999997776,0.9999999999537934,0.6950698617213027,1.0,0.9999997325648897,0.9934586464576677,1.25255842495177e-20,0.9977952204240722,0.9977237413120231,0.9999964063694768,0.9999969824128864,0.9962118512281546,0.9999617637054619,6.305440265506816e-50,0.9999999980670963,0.9626774141293318,0.9999999993234271,0.9999667912959921,0.17796069656141314,0.7009507701931761,1.0393840678386474e-6,0.8976463706547038,0.004537289765085009,0.005562785594162169,0.6590076249369072,0.9996581160974939,0.999972924085342,0.0035368161682375744,0.9995622817357247,0.5174611028501135,0.9999878892400035,0.9999999998333413,0.9999568415993199,0.9998917236539265,1.2356204345292623e-5,0.9999999999999651,0.9999999999953663,0.9999999710586168,1.0],"alpha":[16.643562059498286,28.87384948027521,10.823827286732147,14.433906303700098,11.96517786424899,11.751898001997816,26.011717832551504,25.258138372489555,28.83272843582565,11.01321214934272,16.02213613906335,10.307675532208393,25.773598233697157,15.405253746414619,13.841610759630726,25.80362767246455,17.806833719143732,16.54605896698415,16.090907273734437,17.018241090820837,11.709433499982982,19.7940593948982,13.859379053135882,27.701590320146185,26.395457310129412,25.150545972550333,26.67436768872146,21.657170240833686,28.813514619754432,13.398194154168376,28.396720004918738,25.394401618596287,10.346643580924116,15.71379136934857,23.27242780748258,16.737451940194482,11.453516742830123,17.377381858397793,14.364583856483929,10.398673110506804,11.105605259524683,25.518604388918792,29.24585600486999,20.91654780236141,19.79069707426715,23.782889611675664,21.581813224007544,29.098887510957514,20.478799814907163,20.65367266460571,15.420627361062188,12.099079437707285,12.153385884127603,11.860549367911148,25.565124084163905,28.193765716602456,20.897352648986974,27.218347082126897,14.820583500445785,15.915224303467582,26.296711594967164,29.743581516768568,20.179653912203435,17.65024269599721,25.3592939766653,28.076815145457907,15.03604667791858,28.69436068477683,14.09932880485572,28.36130993985546,15.263238792995683,22.868696033189195,27.995377405071093,17.286953022208582,26.63342461909106,23.808164023382027,27.710363361764344,20.506262255860573,22.495155534422544,12.521154021371586,12.187115970144493,29.343118205701852,27.340140660194066,15.655720125010353,16.890872324929795,19.217726910277143,24.282094681100684,26.755674052432425,20.342113572911664,27.07323634428213,19.005410441127523,16.50690682783676,13.912821402134451,14.46256849386366,24.72676837399089,14.202560062416598,25.169400233934986,17.246552924135162,13.362440109184295,17.702223692866127,19.330676721313253,20.44969514956104,16.21457500981834,18.235335382305724,29.99452673982208,10.010565308735554,27.680895347384475,20.662608376002044,28.10341463171509,16.796267600588678,11.391167766174375,20.38885809747018,24.293828374071424,20.4708380140902,13.46904250061094,29.385404724780738,19.99761966663177,29.690118752694048,20.837005410910162,22.543751973428712,23.806960169959495,18.268737552007785,14.136609476755112,29.512528707702707,24.86360001072414,14.210333202833532,14.051122692256408,20.231471692474972,27.779365068876555,24.132151315603217,28.660989804962718,22.175679072295658,19.10754119821593,21.27440777392635,21.82268417051813,15.67435353863106,15.876638909889515,21.15290203724445,10.531202119076521,15.338677619588314,11.35417702145408,15.603037533366116,13.371241568008191,22.74268765683196,16.708580385143147,12.141966527862529,10.084863131796356,22.035529842626865,11.319771483284722,10.061719955892507,27.082688894987026,18.71022466287969,17.47926981736079,20.34108967342184,16.521590048849077,12.963090487047179,23.117012852487193,13.739270867577925,18.9061503396514,17.47275555316886,28.721874673352264,23.93300674068478,20.319992512596173,27.068950251078952,13.560203544936256,12.321095647060956,18.68065698867816,14.393070463240623,21.01885664041298,13.024152067317502,27.97624483273661,29.386688692533077,15.175116373531225,18.96603294528843,29.145793025662705,11.69753454329145,27.736388245868678,14.132595680004364,13.377865565045116,26.52469438155397,10.631074259340467,26.078209122584877,10.920459730698786,14.984937988791378,15.144316210614615,18.759830205171784,15.902129190365454,29.382445145669912,10.746142108582442,29.44069382908058,22.140879590251622,13.3148604682499,16.6958617797335,24.89802806523223,10.445026682859787,14.769807158629291,24.069294724789124,19.033777547206974,17.70340929771447,19.59059573170263,14.891557460050455,19.303822388279418,28.253813586877058,14.949501746815233,28.339209376601158,13.818119077040638,29.28935340509042,27.393465090644614,23.323422678383466,22.238348019119123,21.338552193016614,10.06990654039992,15.790675200102733,27.160932857722763,13.071912833832911,17.28885454025737,22.118270276115073,24.029171226878248,22.500468749159673,25.63674201543586,10.665683427785737,16.295878910193125,27.93544312506041,10.33874588484947,23.535645429516098,12.723914412617411,14.481122581677788,29.70538351701814,28.869159497429667,13.861982135681373,24.700608670552295,26.617926783040602,24.986549952174244,25.18411792075836,15.60563212610585,16.036155597046,16.98203136823198,22.158261649500872,25.206382389337627,18.877881126175907,15.391319763614334,26.75826025149878,10.381673030907654,21.34147377442334,16.308102439197928,21.8971332290557,20.270123590534894,26.975123111745635,16.76172461455537,27.200414604735386,26.361994016354902,14.664750626418112,23.240247725931006,17.202427547909412,26.40910665621972,18.505865443541147,26.99325702769331,19.077123939570946,23.375290914509456,23.99843916345375,14.068275831903012,15.342541884296775,18.604856217747017,28.730866927820998,28.26845004826328,19.9344264985558,12.228544694400236,28.194641163850314,12.534654646289969,13.994148167388047,26.012707142248907,22.83691138603057,27.02786893915735,15.087948356158808,10.993223976198534,15.25123611288941,25.58196085991969,26.378484552737387,18.76697576075388,10.508122855889788,22.240423655568065,10.72309661221249,21.96240524330375,16.353207824075135,17.99805551585807,14.468359048382657,21.289067232898805,18.468678556718547,21.51415743025399,18.541814766277362,13.965509375261842,28.3552138994024,29.220817218433098,24.60180095395385,15.222004950090762,14.131456876839895,15.03917579999169,25.595952491250458,29.82369184661333,26.303161932871557,16.306341903366267,22.155858591313105,10.476293484813155,16.02371180375853,28.924762594795148,16.706488381821515,15.97711174891141,14.738220218300398,14.871105348873108,20.76468066710895,19.59832903967169,26.352026489380957,12.604352407931106,16.98260000947564,23.772680474171853,20.62720818856488,26.16263149484249,17.660086229765867,24.117254981401047,27.134711508386957,13.533186641785022,26.453310975645326,12.807232373782877,16.989445963194694,25.582283301563354,17.719395043211165,14.660988289582622,12.547131719932132,25.823971056794424,23.110610105339354,26.637605777210233,16.664367890653025,29.654097206624872,13.530919108676024,12.60194532347359,23.864695153490935,27.503350820459143,14.757055791094334,15.543930925940685,11.310613322533136,20.33018906295637,10.24152791367706,29.030107995983276,27.116188892021672,26.652156634392263,21.73955805324319,19.181004844953616,26.230256453319804,18.13115067914541,11.810353433095596,22.635989779417454,10.911172335136051,19.944317363449322,25.70347786111489,26.802160763792667,22.694525825175855,18.0768706592253,14.2789996027365,24.527855990009524,16.89272126404014,14.3680922386626,20.165380994367222,10.074300479100335,25.041792858445675,19.05483081350015,11.805372906241537,16.871429522975685,24.937778016741508,20.566935648884325,23.819268215644055,22.33914227408697,26.06160573551055,14.09710447065969,20.91765907766254,15.551533821999776,25.65384903934564,20.031578464655663,20.7281976882253,28.239122133417904,27.648589609488724,29.60737688435914,16.0665072004613,26.68215133674426,23.162028791182316,11.209951614200872,22.323958142341095,13.254529120079038,21.038254901027734,21.918084814467175,12.966057896012497,27.566638787601132,14.380025262675957,16.42778112059355,12.506801429737777,20.927435825008335,25.666735030576827,21.734875179311036,25.08193597274015,20.47986846593908,20.55567026857457,23.350501521186185,14.438983413899273,27.056218542723755,12.723710162805691,26.425183530102423,11.36501535938741,18.670065701810884,23.72368585085656,12.20533186562462,22.436689382798292,20.558027221001616,12.176179917724244,18.501056093368433,20.086839936705886,13.605359606391927,13.864011876067913,26.923485594044006,26.26895014717631,17.533272040629125,26.07625765411492,11.781598264360218,27.95484537234596,13.244637403540578,14.59005494448232,24.322883946009437,13.111211426728069,18.353977840117732,10.809907564523972,26.02677739974783,16.84614213817358,15.449393125076782,23.824685029127416,22.839296234785174,29.575794460004797,26.54166754314652,27.75240044943992,29.724544296417697,29.913644101766486,29.224082473444767,19.33675249873152,11.019820772176265,28.446275414781134,22.873642896421025,22.850182595138545,29.19487739739717,16.12043217142753,11.27516036025915,12.929542192506114,14.252717554724775,17.246935955554555,29.8147884672399,16.663507945565144,13.413434950752574,12.153018407772006,29.033310638554056,24.55985227678083,16.403047712463255,10.879997635907097,27.221635454074104,10.960515768621008,11.10820033444405,28.443413312765525,24.177991994310787,29.220592522296375,17.208495579195066,23.9912701226622,12.636118543670772,12.500942875673232,19.73312324697346,20.72354628957473,21.17552634265319,17.298400683152664,12.224654710238463,20.388820880730268,12.978983006691713,29.231202264412083,29.58472568410837,19.306702348226445,27.80889993953653,29.809780891087215,16.16802300439096,25.816546118612962,21.661217501484636,20.317748799083756,19.73124881906095,27.104971451949975,25.91408276926351,27.119590453591105,29.050372751005117,25.523994414794885,10.191147558457573,25.750304292620378,12.959240052148147,11.795519204363444,16.030019922645586,10.351301635744683,11.983427498974923,10.635942024076094,12.600678837333671,12.271791784305929,19.54625240710492,12.316633388202405,24.802862515877322,26.838636945125266,25.42877647645379,26.66754251981128,19.453473142568075,12.992407906773646,23.747511113070388,29.09255215891186,29.896404951818617,24.530233761416163,14.284866649360346,14.121520601116316,18.904852864841697,22.41397197975253,27.399882308019635,19.582237247474122,13.086040943384894,25.666865898925806,12.365896490332911,25.536442500585842,17.19513055081893,26.146201439986875,10.55560059631894,14.930548522322852,12.40963189552016,24.341818760757214,19.718761764421796,17.28389612288121,19.60982117811788,10.247611436091827,14.17163780684497,26.82382042503867,22.974387957633603,19.149487284363392,19.06517109352389,18.216965421974937,12.55095849222728,18.583186657869287,10.54772594833192,22.466662987251738,13.568788883470578,27.384198372573024,13.280288796878477,16.110048113534745,23.28803843386691,24.474821492894353,17.211074268319933,12.943965029970187,20.224683289635124,11.439763413918275,25.460304076018943,27.380655509037943,20.30733953102856,12.359059319173822,25.690366051990953,26.759585660892157,21.70219985548506,13.615861027092508,14.883908913434079,21.925876150789865,25.765154268706688,26.98330117847378,15.244206353344754,17.141394023969482,29.473267969662324,13.022812001815215,12.702370247340724,29.338560838143543,22.111119595306672,15.196725586755422,10.10232685844269,16.681801769115975,23.13178747265369,24.185611969329045,13.485471657831871,25.857746426809772,19.038186414640723,17.351208886882038,29.732471486136454,13.445750819791664,17.131335696989662,13.925952115851544,10.017586408345904,19.900383802041443,22.977367405305614,28.632304070868532,18.71705255107074,29.298797516190625,12.685079897577856,17.04309497525356,25.732312887132053,18.24030745949035,12.109921241973822,14.167417889449446,23.47064767185187,24.362778096664414,16.218495412211723,26.44335162175039,24.97794984367758,19.52705822112961,26.34707801708748,26.239925185758427,23.696757871950098,27.868175502102645,27.448636724620293,24.25749795594954,29.90762387986399,27.92396063887191,18.701074634726407,18.086016286417927,11.206925982319923,11.109038337831247,19.447742702012917,25.77520645229537,11.738433945862358,12.450730170807391,21.118936895458745,16.095642698633725,26.73471433965556,22.093782679923915,21.65807327298801,21.821685516218942,24.68099509068088,28.46767610348181,24.31081002617703,16.342605610824805,12.023434087712882,29.441785084464964,16.248885554401834,14.945348108271315,21.244877106454496,13.9520376166195,23.973352219380576,28.44395235524669,25.329216364867598,22.43896714382113,13.01492882658129,20.929207315694672,19.184579390648302,21.22260956841291,28.008915691381024,26.26941472477351,14.727672906450525,24.335941255774202,15.799162250613271,13.701395720178851,10.359277727288605,28.55927419250196,16.304473865927246,10.754384726474381,23.159255779556183,24.489890574516608,21.450004064771782,14.947810175255327,19.111935737413617,19.436161378385624,23.323587191146782,22.6103115386741,26.72277583471211,29.21264122558132,29.789759191791426,14.120841244320257,23.75860740909282,19.81911926909337,21.54129592719117,12.13339076439449,14.224603547007382,17.50311042433845,28.98415995206967,19.871218031795603,19.653190755894606,20.40234087223383,13.763370600022235,14.050790322897857,28.981796570339476,14.216234864490715,16.56815748155045,26.441956209521326,12.280367514097414,27.60104455077827,21.809905043781423,10.562538775342482,21.532202981191375,18.544326061715637,24.433503309055496,24.54778478191532,10.80292626695963,26.871746953664115,17.927885357974645,20.417137613421428,16.66935151812904,11.681363036265946,28.255392703640535,12.125765859901364,22.678449302760075,18.050879647571378,25.82206468359925,21.521561176212217,25.01216120496632,15.979607398689918,19.884461505071528,15.929705526976123,24.019315660595446,26.70689851764005,14.729794599915195,10.23851501441321,19.510763049861094,24.60627559742401,24.148184577877544,11.357842561314593,17.303310895728732,12.07370242300632,12.831352987403903,28.449461328609562,25.167919111497127,27.63689440962855,10.074073686334915,18.938465355268036,22.059599824846536,27.334092507069503,15.253053307352463,28.692245613481113,13.592761084872254,21.57483161847983,24.738312291121023,22.564723481002208,12.600836770436823,22.811822067509752,10.300113222406782,27.82644043440543,19.604354726081738,25.430158865908602,12.02568094837031,19.437029536649607,15.587284110797764,23.284465254122736,11.583583590454785,11.22399323938222,15.489808234179883,25.699630952968647,20.75556954423128,18.12353689488912,17.404351817500007,11.122409952281544,25.460189617168187,27.580235891910185,12.897017225041632,29.210231231222615,18.373005814981536,28.074176751725712,20.30693431239683,14.340577384459854,27.842933978516314,28.267028657794995,20.782315591869533,12.23824906923821,18.171549300878056,16.172214658371548,19.992807806694554,21.722215700363627,25.802246192408,10.500794632541751,25.491930319539343,11.747266923714829,16.316567128626097,15.50855181759875,27.773898263770768,11.348241186669439,19.467414974263107,27.82378637684054,14.244526007519198,24.325494659272373,11.541439756845332,26.424873422060998,29.64404676296755,20.943974629438806,16.06729574901493,13.029878241282189,21.48908867966764,23.45820644913505,21.975907837373878,23.40342501755579,26.202803785278338,19.742183014998503,23.411450349197118,24.905606371882637,20.60372908565035,15.994084337619455,13.869660509508028,18.89080528438597,20.596871430526797,19.56212399268063,23.939173953741808,27.64487738022668,11.915819257991602,24.69300782981158,18.433583139496214,13.115251793385422,29.54594806636298,16.24692368670169,29.231805953217233,21.696296236155973,17.752866768697654,11.125379447822823,19.970192879620896,10.791188575764652,27.123875232169365,26.324969855266957,28.33194052418595,21.74943891070622,22.53405532042601,28.154600530643172,13.54266049654842,24.884867846249797,20.725763981119407,21.348859471226085,27.927424180265014,13.682915102977265,19.75482316963746,20.974281556411768,14.068812773625385,20.069962428237893,29.423993651537582,23.031936271484938,26.410580310127116,19.239654170692184,14.690657333649577,26.322779343141782,16.5010638520873,11.46668380924571,29.52929271795203,11.953571119137711,25.987710192579485,22.4873944954065,25.302751273229266,18.79944752568036,29.99170473635623,11.07913121176804,17.608264905800965,11.679079375781258,27.305813705163942,16.184725000334566,24.37918274037568,28.12292741493407,28.79253033773981,12.470611088387065,28.58370174633866,26.409552439701542,13.749225894418888,16.369444004611985,10.47851564945693,20.925390288992553,29.908728551049922,28.476419667173737,15.346874124675459,27.1519143748461,21.973244609495367,13.988699551147935,22.861181821005623,11.321489144102678,24.797222720924687,29.219357284763262,15.155496167843253,11.361568813469574,21.96148535319709,24.716758265148272,19.929506227412993,11.576170200948459,14.750194451974728,11.910481012546885,25.629848583261424,19.45739076344969,18.584227468986168,16.23363327605989,18.722734324081646,24.381742555840717,12.227933952362097,22.79590302513167,16.462807598694205,29.511616987422546,19.72004475610585,26.869663348576047,10.042451005045372,10.710395431117314,16.454655711742042,23.051377558529623,27.00387498190358,20.401867029562307,26.209451643416713,29.7976162206482,19.27718531647091,10.797918974541577,11.100158184225046,27.47561603241545,26.9104964593441,24.332692593536443,11.247150394547845,19.057296576316922,21.039720374889484,15.532606739611104,20.24904769834511,28.559883738539483,10.56658826035903,13.451239925713047,21.376956368875657,24.69041079304594,10.693896515849065,28.495163037414866,16.829782496391147,15.424604516744278,27.117715472368296,20.267422642083595,25.86045090758859,21.33043986878075,15.54055316324376,18.70037892602966,18.8675039655794,14.953878915716206,27.446640796627744,22.295593843632613,17.678111027898517,11.924233149375683,16.426773406287932,15.47604264947367,27.062014121301065,20.71866992804179,13.93677441728212,25.496220943387307,22.733859398278238,20.020723998801554,27.35048394744306,12.67210640711157,20.15924928171522,13.138456060338179,19.301655061663944,17.333070619904184,12.651552784779208,19.232765528608656,14.03516321342584,22.363438741589,24.479865602393897,28.29615169129658,22.711242116842456,24.523165120972266,16.83362693144973,20.504678030372553,22.12663648981816,12.398576981134593,16.587134773125097,13.071838504514833,19.62219168941647,24.368648408716005,18.82126110675501,13.357247052740636,26.39748025862623,19.834093734602078,18.23524660865833,21.773101926087296,29.07158689415768,29.86057316382531,21.220016080227907,11.158005127394745,28.024369159220758,21.876055508155115,13.591188280680292,11.872572475631502,16.301774719009106,16.36413535137873,15.993048128647441,12.697052810406877,17.295822151741355,23.649590751516083,14.797302767346778,20.213607441029442,16.087085841108205,21.996312706537505,18.582990902547927,24.47729983948484,15.35053930568456,18.223653824723748,10.062257863053192,25.451708377549778,24.044685775086023,14.973449675687473,16.629122096615866,25.87549478102992,19.077514049189944,14.724406078458848,16.56065866578864,27.999655057934106,27.22522631561086,16.51359850056331,29.578993360487193,23.158505201066397,24.795586605520864,29.641946892665445,15.923630430399736,28.843671641335128],"x":[0.08876428208365872,0.9854445022220293,3.399482478511764,4.315346792245325,4.323196597876182,1.6962625556006605,0.39301244576945504,2.6455192750597902,2.2595718937669904,3.59838292565265,0.9815839174413965,3.260663444245119,4.143875743274037,4.058374127253313,3.189255926221474,2.4995992445942283,2.213527301481176,1.3875481987789717,1.7354178455443936,0.13877373049201225,1.1578220134037753,1.8998462862306875,0.6127631253277932,2.3281148707545842,2.866605086514836,1.7862252974834425,2.075140970838294,2.0646282215069633,2.3804360703832117,1.3172518681732837,4.374848870840617,0.2341315030410862,3.8864521172406796,2.178434709243499,4.552011249652508,2.268929970631799,2.7736433739068653,0.997278110888602,2.541840503601991,1.4752714618044416,3.4105638178432063,1.50811213877306,2.531859518460289,0.48278324235475734,3.308668145682554,4.62894927100076,3.933675060698577,1.2386338853831103,3.176557787665102,0.16494858002556234,2.1444152769091507,0.2339765719142073,0.3424042758283252,2.8767528510408615,0.07629444616093606,0.5635942265958405,3.191743512498931,2.4690089092203205,3.1496611761009294,1.0259774081649442,3.4999133392386925,2.0411354587134465,1.809011515732707,0.5389765275370728,0.9787299534726679,1.255568310776568,2.4580695426101795,2.1041717629640866,2.7708589802175263,0.5664678773359555,1.2149587417186147,3.971902474066603,2.149490974061856,0.0009200787727436932,4.9411749192368335,4.301413388997384,1.1920908389822926,3.9376518393041082,4.391369004292435,2.1900982572691285,1.9182669160499344,2.7674075780643106,3.313420255681936,2.410874836170934,3.2326418782278843,0.34572114029087886,3.0277507449388508,3.660362481856162,1.9171556371763032,3.0366364439911875,1.0327357594248898,0.935053557556863,2.288048107371683,0.6895431397591523,0.3788073722404661,3.8573512535041488,2.5832504179918834,0.6821522676308078,4.548323697140145,3.8393533748878217,2.4659988171794076,1.170638828269981,1.718382200656855,2.1911366022915555,0.6742110390599321,2.701394345184922,0.45117005829182544,0.15780731328909892,3.381699674058367,4.1916372235567545,1.2367553134878018,1.8046948502181681,4.154099621380716,2.590010545709427,4.148617573447385,4.263495493702236,0.7249127297625524,2.3339857413372878,1.1861066405306997,3.013557849087918,2.800918323202295,2.5779609529697045,1.7550898781482438,0.11144812384326852,1.420876543799784,2.981066518245844,2.574081847121039,2.0736347444965286,0.7045018096098232,4.441259977393756,3.7840512050480712,0.35850230747172307,4.475317605063887,1.9592694867915417,0.5134125886691532,1.0842877918382443,2.7720779012672168,2.4678455902000396,2.296599916676425,4.5183721449367695,3.4514337449850485,1.4507761343543724,0.14215156085935265,2.32121304829941,4.468232236336943,3.955881953777948,2.3946385622194564,0.9075771511338304,0.07388281477842318,4.802656564574481,4.502713825573937,4.221035353893083,4.054498602707552,0.2813447721831952,1.728120551279716,2.23408266210231,0.052039111389047266,1.7912528564958963,1.1531748126354757,1.4181819824483977,4.94570744610194,2.4013368675142766,2.218974867122202,0.649231341594525,2.568647758423067,3.538741407112801,0.26813921098070015,0.878085401335138,2.2845841918936163,3.128473865485326,4.5922758900904395,4.3710095340386275,2.480141251216211,2.485931810213775,1.9932190826157958,2.428481632922843,2.666491714617427,0.8904273813280028,2.1928111310652465,1.7035134871827962,0.3691826242218299,3.0199142174246574,3.88564684833687,2.7440795289183018,0.017773401801159938,2.342353097557066,0.8858752475655685,1.0048347598020668,2.5504448643167033,0.4214111591391423,3.1860208484422268,3.9967580142208927,3.173776287731642,2.449646877370303,3.9718176706831656,3.4695704914793035,3.0842207944394917,3.2811863001666275,2.9724114144181035,2.5360019522242894,2.790948987107278,4.677378236615044,0.6257707097737042,0.01377637254871611,2.474930294548978,4.666094755649568,3.2919723866074593,3.7696277047438977,4.020993098957636,1.0622817398532236,4.5226792161011105,2.6459258604312197,3.7773447330722676,0.3602674689572949,4.214902995941348,0.6740056278706374,4.495727372607146,3.981561742559524,3.2708730667829777,0.2961092794244824,2.636035874902969,4.707139201822695,3.5652203894634815,4.978081447273074,2.130672464412433,2.5427835258821387,1.7858769503820215,4.4553410117273895,2.919828380413767,0.2500255645248106,3.30428213708288,4.991587645637621,1.7884533915415701,0.7350646211901368,1.3597637277662977,1.2050098167484014,3.6634140304898724,3.0729604187033157,3.3058529976931226,0.9257768093503327,3.0538926457825974,3.965654715741075,4.691279799826161,0.47092194563996825,0.438860781629703,1.123655664670361,2.1909036068056476,2.0692622374410865,4.471259544754398,3.3101320639654364,1.8860557419781365,2.649164501765796,2.6720093483725735,4.910050238134057,3.8480941420683443,4.346170482155674,2.324820060792031,0.07956767835038292,1.9852715334639037,0.5271358357903866,4.777409318705287,3.0362616644793086,1.0125389285896103,4.49149522377359,0.19300839500019817,1.4867626665300626,3.825494585024387,4.438454651438911,2.1573741071340713,4.991330666118681,2.557567456696824,2.2106027902731853,0.02595282735404103,1.7755984591496066,0.6017743046185986,2.8004489301121582,2.0973838979665005,0.8767159656031576,4.618122350647339,3.9173061088505734,1.9814139522619045,3.7684156633841024,3.8091496116197963,0.6888026462452501,2.6990593152533093,2.8278712390501672,0.6126061589928,3.733048482028135,1.3990224100191873,3.4358415870995005,2.972408006075844,0.7947393274835801,2.4015707786153073,2.4730614426572153,2.4696198179227844,0.7236385981625215,2.2828502250792306,2.077887227902756,1.5825885199299472,0.21034030626663758,2.315990844125846,1.8748363490278874,2.491017744219076,3.641972807650471,4.156483651858855,2.726982390672137,1.2175908871334629,4.488149319970929,1.4451796995917032,0.9880315171494425,0.8100586057323578,4.3934453162540095,3.820844568919167,3.409110206878807,3.094218681859855,4.889018308240471,0.6022566441628618,1.4772644316949202,4.691014325319981,0.40670837502653434,2.4561171752418085,1.7568879905372226,0.7827697521630572,0.06432133257016526,1.1719134255911978,0.9963495991931137,4.663287835026695,2.6193032336587208,2.732661656878287,1.958274057021513,2.2396995990032877,0.22167894983324055,3.810445412374781,1.4166477494156593,2.0796536540161368,4.502569825733361,2.2337799026253355,2.5178298831901005,4.723282978815052,4.0932848160878486,1.5068588539285033,1.6350547268817062,3.283635665162845,1.0415194616293066,0.8018274307096807,0.5231451717372249,3.1446713009494287,0.8744958033736105,0.5840847045219244,0.12587273049484482,3.5530192954690065,4.483857063126742,1.1493118921042933,3.7669510729350164,4.514889902395918,1.809947305049715,0.6223199308782656,3.987506980587762,1.0093011620296377,0.8364555777055838,0.3568020575357589,1.1476028594501209,4.008595740159148,4.99078421020355,4.326438934403557,1.5116796800832422,1.4464462359682528,0.18715063917601138,0.5521541113097961,3.0588582617616398,3.400849863610053,4.117455247755904,1.3972754876506166,4.361988741892292,4.747346899971884,4.273725849420891,3.8455898505959496,3.1464264456480873,3.940612354031283,1.5434908230006883,1.6924739161579772,2.0800088118150937,1.2655139245191382,4.21393160159674,2.027403307367328,4.514255038082727,4.261691531224786,3.347642144556784,4.330046832609846,0.5682627670065965,3.060297919377577,1.1869406894890677,2.736556149232446,0.8246599378043107,4.426186565924819,2.256890987698461,3.565141988580854,2.8097346393911113,3.533714505170412,3.021176769308318,3.388686614197083,0.3237393172544256,2.783736031267916,4.419840633874045,0.8077391320186667,4.007297616535257,1.467473304715956,0.5987373713191824,1.1815207130437166,3.8232540911293897,3.169201850392768,1.4181380649437703,0.45940093532644055,0.9036184756034704,4.952173541409567,2.6988878004087677,0.23290853303729264,4.931021583015092,2.3504465797042418,0.518379772551455,1.9659323731092548,4.901556536966646,4.112821069677226,1.0158515875440965,3.561558709767655,0.8923793593894114,4.582652439665616,4.370628964710496,0.8809028543542896,4.44160059357868,0.11954625292099674,4.5281780550435204,2.9691926034792404,1.6793428501939212,0.33571088585245046,0.0507905038423484,3.49475469941778,3.5538482648720784,3.966571582641878,2.2589651306289493,4.450647989284013,4.673742484830296,0.8250613834071163,3.33475757000505,2.6112561670560916,3.4302860415510414,3.537954068299669,4.2610597786644435,2.95293687045631,2.2933183440955416,3.8996375621910784,0.425115493394409,2.0308416364585122,2.7237997011528723,1.6459230337063846,2.819432356628094,0.610679701924669,1.063057520251538,3.587165999639722,3.0884630976901684,2.0510373581934527,1.0601208886090419,1.178738648179899,4.887007417360349,2.1445474367019846,0.9856142804213541,3.7312600887701564,3.640968594820826,2.1023903542958333,1.1757605853081787,1.509812331255369,2.6563897266840986,4.760750745057797,0.09478365029460867,2.348736077330893,1.9888706596920147,1.1751006706720746,4.849571599439567,2.0124145454888898,3.560219931807932,2.403613634280691,4.2719252621302575,2.3326022538962055,0.42303430363961114,1.548114198789109,4.114071223826805,3.7266767028646255,4.492307639866197,0.7306953877481059,4.252690907836811,3.2965864834660996,0.7743196155903886,0.970736009500166,3.4444827911423967,2.5728879042708597,3.748667738589165,0.531094235440549,2.636663699673133,0.9382679379819725,2.174526518363886,2.2339139219789352,4.340862008511487,2.5286084904324313,2.9329298267491213,4.378255370518781,1.4072216896729017,4.185594403887665,4.9778513114850185,3.1641510194673064,3.121696079604029,3.556396491086619,4.808359191914323,1.505939837345528,3.2417248031561483,1.721211047204857,1.8964684280511401,2.4141517168836413,1.9135953693044472,4.865961382523865,1.1690855782994525,4.661261210471382,4.353446340302488,1.864246177043285,4.108327134247683,2.3859331617696364,4.81493230915845,4.118828818594907,1.3432778607135831,1.7001818298917182,2.8792766456052643,2.8558960254444523,3.40882226806046,3.4277618581168268,0.1965530759086731,1.629773526267736,2.6995003653780127,3.5842662861016628,4.676667529125474,0.4506101476691904,2.2440133145531216,0.4420371864974726,0.21320795770590095,1.2884444672124318,2.9431021091613907,1.3960359070369477,2.0564583144960946,4.66281127444641,1.996534702493793,2.757193256257181,4.1821708691472645,0.25764981119980157,3.3384109462202494,2.2535760480458524,0.4834640930147538,3.44424265347131,1.6215613084184177,4.574298518984675,4.985672021125437,3.8800011235214993,0.020603041866338323,0.09373130567169041,3.0166648577620894,1.3638821590041283,0.9975721314337194,2.3436023214814403,0.7670938342677336,4.241308042212766,1.3981652857322302,3.287700663229376,2.877270113599547,0.6664422744956644,0.7922665497514991,0.6795503236429734,1.2094916093164654,4.628279440122918,3.2787158491176696,1.3608044927345797,0.6392294923170472,2.3269114203156285,0.3126927903615151,3.4255732592866783,0.05157849974056217,4.84374173977403,2.4544587979125754,0.7055553574077211,1.1299975045882904,2.5435171116552646,0.3958354860444635,4.1082536147137905,1.019608804266987,2.358557386556863,4.745360673764589,0.31485981396448315,2.683931541275343,1.3102656787295908,2.284377378294278,3.0489279007862846,3.602894965732124,1.9998905081788876,4.892006214536532,1.4052108937632402,3.434763558520003,1.3001880960238976,1.108658521225131,2.3441168937042054,4.371840579366868,3.284188101680501,2.408561311456663,0.08487261064316298,1.2191433910219773,3.930817513115098,2.5586929084211754,0.7352101298746472,0.23520525938916292,4.682136468718615,3.863470503176184,3.6359809069142326,1.6785565913213862,0.3214002516338954,0.7132713927378709,2.7987823439080675,1.9683998172684791,3.3359389119763225,0.6519827263429889,2.9842514896182495,0.3321730467850337,0.19549020087289315,3.884516567143983,2.7131104515384497,3.178087021228979,1.6456515231847912,3.4760825172552567,4.413015370956642,2.162010215987805,4.362864304547253,2.7858008678254373,3.003813131799321,3.3933739709035384,1.012791306183588,4.37587316928154,2.50829955491346,1.7860450003473283,2.618524734809048,0.7134130122658822,3.788311517101617,2.720364028254394,3.8514018468180145,0.23481717704690874,0.33184444293771653,4.458502452445485,3.923894913403305,0.862416079215419,0.7634648019299484,0.9716301265564609,0.5010557701894169,4.945199125874037,3.6979486344757904,2.4367826299549264,0.3537958314382561,0.8908231039116365,0.8167304981663548,3.0163586220217375,4.385862096378977,3.834984579376699,2.0324179816276877,3.234799382612109,0.09096942232325711,4.0719834623732885,3.792160421872742,1.3880976471126294,2.1790511128229806,3.4121683342249245,0.16596764824538202,3.025433700546495,3.4191515644297743,0.029318259229433874,1.224099269808503,2.3286651230164157,0.7854750835546753,4.630875318950753,1.5175079588326823,0.40487789530760376,0.30348302455101783,0.3500081268804289,2.1135182662263707,2.0948979100308875,2.7738655069102913,1.3012367540057823,3.9692422502585947,3.4541230312576277,0.6294756292116666,3.6174628191864375,2.8524684954471824,2.693889149686007,0.1090920632361303,1.9260269277412922,2.9702461660645563,0.426028087912117,1.1453878824772479,3.6090964268223855,3.0778200755232277,2.4855598174592055,1.752160334184878,3.999505729611923,1.2845538930218403,4.800796036381874,2.1877590941658633,2.1374305614915903,1.387222216817966,2.8662504397993196,4.579258186285431,3.4462992459857302,2.67421610391273,2.2144126625705605,0.5492259107856245,3.104785877671362,2.870572595780503,2.631326450844036,3.8026330678846687,3.2610301524751817,4.593607535381423,3.5722635733870733,4.948585472148758,1.1796983541955541,1.1794123075992224,0.33044523061406594,1.0852935668947672,3.8733991268579815,3.4854281679249386,4.071394945283899,0.8906426102992637,4.101379603688864,3.2125306179568183,0.6566900840518797,2.0292840015155433,2.561400398077823,1.7705362823643855,2.2853107972875373,4.001119187841247,2.616609059971645,2.291066530826699,3.720599070492414,3.2496075253321974,4.555881017753334,2.9823243851135817,2.5118497329715184,4.673526628899999,2.376171742188488,1.349866658648936,3.149929239946908,0.2487895530732398,0.1869761706861206,3.3996882578810728,4.851160483362214,1.0015133918474894,3.824485848587128,0.16780544631407102,1.9460853240453824,3.5454004725521693,1.3302380512680811,2.3516699709023814,0.13438648906513584,1.951535954555832,2.4243533342204238,3.119614691966528,0.6072405614865595,2.032411701204783,3.473704858918072,4.424919198712179,2.329524201374329,4.332268950230568,2.3712643924595858,4.959887141797985,1.0077166479932675,4.4328556821360685,4.017634201529697,4.475401958626605,1.8919404360915093,1.58597713075875,2.4923161589331744,1.9768161455032063,1.4107627917954668,4.220913410939721,4.830080623372314,2.378318920151923,3.5002816395487457,2.1916987545361977,3.3231132813235598,2.2371377834912076,2.7013360075771486,2.9298077221061067,0.37198712305812065,2.291058294427404,1.6674121134083375,4.069605359035106,3.4283691642829703,0.8666350688940638,4.14216106628982,2.800575902490785,2.951228617225403,3.196686450826901,0.5765246524138523,2.1717377647819402,1.310228506049238,2.9232741616199363,0.10501649409615621,4.835660814344073,4.148307072451621,3.3195787852184977,1.9133565060337654,3.415617214317226,2.5052597410508834,0.94591827719398,1.7663855603950451,0.7282959956241386,3.8159385783542166,2.247442820420088,0.46514672187947803,2.7432015790087263,3.3382727019481018,1.069839614611393,1.4022442272257485,1.224597958560124,3.5818260010503336,0.034072610455929686,1.9310863919236432,1.2561250167345284,2.1780949480919465,1.4029722014811974,4.377346249199112,2.2988629702392993,0.7905515066381996,3.746369583664838,0.5357371626576446,3.0760582161513272,1.968710893525265,1.6838148623974636,2.2268542186961504,3.6217517709672853,0.901540949125964,0.44554991978744574,2.1657806148820447,4.757363025125992,4.588996585188698,4.743980611562012,3.939033590633284,2.0691688897914484,3.282660099687843,0.15275926267593776,3.292014351252639,0.30926957264082566,0.3861339392488927,1.0173383973396355,4.477681973273983,2.1191514807567415,3.815442559726331,1.358636197462506,4.732052292737453,1.3266775701690803,4.93600307663427,2.1339565721505913,4.977627408183924,3.1829693694918424,2.5943191415351374,0.735303463367547,1.653556842349988,4.066205359427713,1.0181040334438474,0.26164280633727555,3.4112547651096636,3.339430002511242,4.534281273653877,2.5629683637314393,3.491869806175422,0.37040896041451665,1.2171349155743705,1.5669200732794764,0.4426966055947634,0.03675484857121658,0.672658082882821,0.3241588598136136,2.6593564858497407,0.1444166924890844,4.915965072089531,0.37493761379517987,2.0378408127915693,4.756643847928078,4.465060710537618,1.6178323169498088,2.4585441660614915,4.09628499743966,3.5644301149291326,3.9808605674023836,0.7267755288116307,2.597167393127362,0.8621784119896969,4.645323553947916,1.518114142899808,4.1757071340088086,2.0530418544395,0.11404533372426418,2.0274900694163813,0.4389864726744841,1.4286509432361005,2.590678983765703,0.9008396058026513,0.6925305819518934,2.096933740206973,1.5049190190827288,3.895217789786475,0.21056579394354458,4.156569778721987,0.7235726298601708,3.9191232880610616,2.520344117717076,4.14350465031816,1.170377863908828,0.7204354991809903,4.034455684094694,4.288017321629809,3.790635139755505,0.2814236794602998,3.6431108187815875,3.9141804655765675,4.0665064145839525,2.8988129921230374,0.7640385410127615,3.906911797285171,2.930055847517962,2.002020166563425,4.766302907390573,1.4198250876282614,1.4086629039871812,2.2119529681321506,4.939867667892537,0.7219754180098648,0.8559975795804331,2.4830413058281975,1.284537147227155,0.6668798387443409,4.484379121221154,0.6856699374597319,1.186226353068296,2.2701911127767804,4.927468841489986,1.2853343580277499,4.661709672837193,1.377506504884899,4.964065463802388,1.7402342165077456,3.197082807575695,0.6337322255244571,1.1983467635304534,4.033620887680516,2.468463927359873,1.3201906416123221,0.9680135790653643,3.669413381448564,2.650963237221081,2.1710938066304655,1.0681891344443062,3.0396253370884683,4.476858558467047,1.6519317173020875,3.637205066765361,4.5416272827379975,3.9102011462577724,0.17827769571646113,2.4921872766121176,3.804592259936234,3.7263063182590628,4.645444707722662,3.1560500262762337,2.176324799273596,0.11063480957036353,3.660601001884767,2.3619625107323463,2.5147976910756564,2.4390330580370225,0.950525546053228,2.1703389981996724,0.5515705790715808,1.6473674012188044,0.5814239815855193,0.4589138775960211,1.5747613101352964,3.5737235270465453,2.9447624713558165,0.8364993229362694,2.610760741516067,1.514227955413694,2.714610288584475,4.672898511163535,2.661201644333403,1.7240531891510669,0.5270989086880917,4.158647501229387,4.762753705484157,4.347925318548697,4.96687228266789],"beta":[26.70187174355928,13.867666728378962,17.604908263018512,15.937741085630241,11.465369341756237,12.193621197436286,16.74254497949457,21.354144016157406,19.35724148108291,12.932867735698048,14.726009914244456,14.207562823780687,12.00101617158122,28.604968749496543,19.083433747929575,24.242802390069784,17.17492275613791,13.9976161127349,25.493100013533233,18.012630681954633,25.52055853122271,17.49139174738238,28.31625902931671,29.53621774714179,25.894673180294483,18.02989598692686,29.04727619122273,15.127792618797029,17.174493997320127,20.99761679739164,26.34350958476751,16.122238274335366,26.026325173129187,11.689529277885766,25.84064249168744,21.065927750746365,14.130622404796442,21.033116459994574,25.242673267842566,17.792705097761036,24.99609294760517,14.919918040016267,22.10511609494139,25.541512291784922,20.865556341886045,24.313248120478633,20.266490231182775,28.045952362855203,23.96192741462691,28.695456507764266,27.701203519423608,28.934915280207115,19.876526002886884,29.91278114613714,17.788165894855034,28.563912736193554,25.166337077649604,28.99361909925283,16.820805097854326,20.44014432951093,16.048432961859458,24.540133423591325,14.11964352642553,10.880604827995528,16.682411578055216,10.812984628199018,10.496457247824655,26.795317396636374,27.983554814176962,11.464992905867263,18.596429417667885,11.467483764341807,17.303583524949808,26.797822406902267,29.737006005356754,22.438182784208553,28.519422059026947,26.04126062027514,16.228428422143338,13.25273831071673,29.873302698721552,23.302214629934575,15.970273108315665,23.473920779005724,23.032318682181867,14.204611865037386,12.482285529529733,12.099966152397172,29.057818966934686,18.169217063037806,17.415560814067994,26.630262154001972,19.09703850933438,12.109587884770963,15.816509750192429,24.006854493898032,17.30467062806371,19.15058574461507,12.850153523764988,28.536845393348976,18.36416711735124,12.25503261485034,27.736378535619615,21.154958115696004,28.192366323878186,11.334835857780657,17.748517347112465,18.63692141579735,14.63687414342925,18.90223509629234,18.65729580286463,23.03723831964605,28.065729100482926,19.48813707181089,28.173530738716263,20.790139322796314,18.46152621097477,19.54157493187717,12.562074721043386,20.369442052109477,21.14449470456097,18.211301546786856,28.160513840112785,16.266713349654953,28.571903081249932,28.506629565725888,22.234996166085892,13.602064503733313,20.730044566438988,29.254219331719725,23.139540330430552,20.668639531504486,11.30930443698496,24.184687551190347,18.068902306822704,25.580491308690267,21.198624412710107,20.013952327370127,10.465821174242201,12.773034232569863,27.9704592172466,23.03980604372953,24.17375259742853,25.260683683508027,14.971843549328492,20.190665149177825,17.768067695177653,20.94368820070258,15.841852620206303,19.249268857039276,24.912562109274408,14.20015839580599,27.713346624919662,13.984950479000986,20.022391466458096,11.800255152533028,12.943454374557435,18.223116443734916,27.16964026587917,16.1568971509317,19.61103867808763,21.920152091628715,19.68673642997741,29.639542190052527,28.105312311714208,10.17580402464655,28.61311943107601,23.00781240628193,23.86911322207533,20.818158151335005,18.512514043949206,12.789512159148128,24.501425855857725,15.796378100763523,25.085683433080188,29.209956335122428,21.962371255853213,14.342272523556531,11.22213536776095,15.180237506131476,28.91741442924971,11.078214310367848,15.726233404127253,12.055030494853959,10.588324681671981,14.988166694528786,18.667329951736807,22.06143218189368,26.732850260233274,26.45743992059647,29.31448913647795,23.18250620334596,25.27496965587647,25.830749092739538,12.270205361232795,27.293758161888412,21.315417286617794,25.52628652009853,23.910155179347015,27.050239144382964,25.131386563526284,14.277677057638902,28.838302161034512,20.47009231226969,27.154055980102076,13.835352937334937,13.418890580991398,23.768543125409472,29.948854352423044,15.46350985788533,22.203812974656568,25.007813039335574,27.90818770225873,28.336939589460556,23.013659599577103,11.153400338539544,24.03130808993158,22.94537871143532,16.250037387058505,17.85152626256954,17.669970632639384,29.559833972801755,22.98900207833299,13.9101488206998,27.85347073025777,16.304242655055088,28.881398196313977,14.467348879108117,13.92653548377892,17.005070572644037,26.973376900922375,10.797505828529435,22.33365412908156,23.731364673017644,15.194373096082256,17.462080556089845,24.682514801738424,12.599432716680447,29.23162751504652,28.297186459259656,15.976064360029882,25.551253050866592,22.78344429612752,14.100108777058335,29.549680118318427,10.263245278439385,17.4838840253871,19.875612076321175,14.093754803068514,11.977280741926833,11.574474794336492,25.090077000574105,19.06287044611227,27.101805201120577,29.137818321118026,15.591135179781062,25.61406902496763,12.890725577672203,29.87930050194651,18.169798905060897,25.930190391349427,11.664142894340156,16.80782267738408,25.765125890384162,25.64731246106345,25.103045071310177,15.433337843553856,26.29695698813216,28.1294207959208,12.832175495085686,19.03218047225641,12.251933887293816,17.666894992286522,29.42212644795824,24.466228142008795,29.266321224170035,14.941477910335085,25.38196020546946,23.956025536543105,12.582190982947745,15.984735738822465,18.221140440766565,27.99319571455728,26.384471693066907,18.18055534037262,24.93374504685631,26.039114394498707,26.70999267054213,22.56643979558074,19.518086375668386,18.251237643529898,11.43034781645726,27.265821446258755,21.147566189451467,29.52090578033413,12.242711042631317,29.363983313411474,22.018745785354863,18.481665100704205,28.318798022946986,12.971209316616484,24.267520136156246,25.758870218685054,20.711463208848514,12.805178468046714,12.413753367303144,26.68314445850056,11.209964393944784,16.827771068064585,11.86116543135276,23.05920125550578,24.71310423352307,23.969400477218777,19.72613764264302,28.153162962063956,19.289038646442442,21.564560652577782,19.233081160731086,18.827209599164732,18.3052261550907,26.66595063933029,14.988891200809359,17.926910885678936,11.017056706689527,29.19922326112185,24.839276546528872,12.410128123459767,12.903354259900986,23.26161194019989,23.578935129621826,17.389058938731647,22.806922211121364,21.2962439508961,23.17164830369628,17.44927800077867,13.516620961761427,14.050751482558855,19.173315114672963,21.109725333438508,29.49826732917259,29.29038761508751,14.422642248592377,25.306820469166794,14.005755701962745,21.90784727362654,29.66429096535965,12.388716193449035,11.179934923945773,16.498371643852956,29.554413031835665,26.536777758515644,11.321908960321828,11.74448319769449,17.228732203081645,22.025798950805036,18.623693669474957,13.373358110939769,20.713405124739637,14.79958689774184,19.31752582834376,17.047584656766,11.580818576564887,15.718048314270634,20.56441588065965,16.607721593078203,15.626348470378328,25.115307983890553,22.717877318282646,28.43417702786306,17.94062557477995,11.074714598015882,23.774027198071245,23.799714852278893,26.685681596124194,22.294213884925686,15.217458918877838,26.241738267399683,24.86509324876877,17.688147522147034,10.276363794400162,11.989657069078694,12.890222948536083,24.74925475791235,26.498065098534926,11.344977179702598,15.277662741492254,13.887911020788124,16.42695116389681,16.025848425610512,12.048487778527095,23.5875654143847,24.092028190851007,25.946594837096917,12.146033100762455,24.261360879436044,26.53400375843337,27.31487728379041,16.576774358113116,28.68397495459343,10.70130186724465,21.125102120482204,21.161120892795292,27.03712928484469,21.04804383589098,13.28237350916282,15.279427383617726,29.075689645878153,24.99359826175011,27.758465923039488,12.997110544335913,19.45691665369779,16.695429882505366,29.603171990618357,10.984397196681833,25.034535911972604,16.95922974685353,24.889189238049887,27.330236958836885,29.416117381215223,27.259861992498372,19.17306968947317,10.436725318648449,20.29435657733067,15.765530317085341,12.352173428320533,17.878229428480402,20.0909637981993,18.286393986969394,10.490901683390558,29.59251470033356,20.39134649143088,12.774789469307809,14.41202672581602,20.691011569854307,16.18159027919194,27.706941454946428,10.29150712330737,28.020014122623742,13.376327600441718,24.79545516019462,11.241740388764834,23.452042977576603,22.082206288556492,26.576821123932856,18.132529813448322,10.388607638688864,13.122699058264754,28.80966612374545,21.859726004622114,25.09407801006065,13.293671949098371,18.96801928304636,20.51324962466883,20.03307450851483,19.65924432169395,20.178582444926803,12.709719056645433,13.925565069109958,29.190223536670405,13.179026897539078,11.545637269638046,24.731410525433514,14.744163610829034,20.39089364448802,25.885903408085895,12.250282145301966,12.299291876229681,25.176868177667092,29.175839468413955,12.76822127987019,26.746449253262895,27.610926048605627,13.557783975918785,29.07990473955927,26.08141321406034,26.54639286431314,22.385269011727193,26.13240995650345,21.41123215426948,14.246206867918243,14.129959764360036,12.808623867324588,26.130695818122142,21.028855975285307,18.41530096109363,18.96479235276827,22.94078553879098,29.41247513089975,12.353909901364934,26.473266619084953,24.655882691783972,22.08929796799447,20.876944062269086,22.86028747348218,29.409076440902865,10.56260125055687,15.293829834980265,21.21648314107551,25.060063347613237,24.033748245373182,27.920766795906292,12.70436376569613,10.303671253123042,16.759753849211286,13.989742802324002,20.384716336014396,28.18679286039636,14.373391109451777,12.635855238198808,23.139432591264864,21.789917506924926,29.57643598357832,29.319284704403866,12.584893445507763,14.015581132421126,24.778990966828403,18.58260878351144,13.08681425099843,18.382555518600725,14.715478087264744,19.38212953320607,26.15516832978531,23.833930581761344,28.983002619125948,26.879572820936964,28.153015367408806,18.96557147480155,12.144396877795899,19.284761918757315,16.35000307969375,11.11958389148815,11.080378613271357,23.395145814594844,18.317190025313273,14.781234574577557,25.897882698692108,12.799985094743427,18.073518527728215,10.87187017315189,11.537425315660851,14.678750474255807,22.19916729041563,25.184935821987906,19.18962737405441,13.104787804880154,20.790895486840732,15.329799430393148,14.807996501483501,14.643670353290075,21.727805993380613,21.77675087115981,13.596121752668061,22.924558305881963,18.857783829051105,23.65501373907673,29.157609626338985,28.706983750407623,19.90772526439352,22.52228206673815,12.482326062485146,11.378960315903983,23.861452367322617,16.394429110769003,11.013697012356198,16.897698537547218,10.903323506658506,21.712243974740083,26.374320362388914,12.594978462765912,16.162525081174813,12.628065894291884,27.357857005485435,22.997488712971897,18.01411232513725,10.171872457891254,25.383116537891834,16.482476864175148,19.458577506926048,28.724659287287686,24.30959425037002,13.808131094661707,21.138506649282863,12.952841469988758,16.521031940152913,14.193965391695809,28.76340401927646,23.3829596148584,11.71474214080677,17.79559103665935,14.289316582150917,29.146408588146212,20.96695597355638,15.701090660756627,28.72812605372548,13.82820005450213,29.424821243317645,12.292508604529239,17.573266040602743,19.62545889932653,18.329572540569913,19.885965497479432,23.5592423667951,27.308788112519395,27.83829664566899,12.334500315345892,24.09777197352873,22.952379493372664,10.274921451792544,22.33543256377989,26.929057602143125,29.38737023703411,18.212007154377336,23.82252027527954,15.3167784321972,19.90243218677355,26.537738102015535,18.712342842747226,28.245942888134277,17.380103490389224,15.739106229770696,24.035815089521346,24.27533372888834,25.155153523825447,14.377519819792845,18.54798456054788,26.65302281887488,29.929821319622505,26.94264045021677,20.387493215227934,20.65677495705245,14.856743064588045,23.695861768391833,13.076373364073088,25.708051133813917,23.96258045681574,11.494512871962037,28.618705432204727,28.437752121881942,24.23933523932412,23.470588949138744,16.531255574907448,17.288576478117573,19.08411908403313,28.65620209695759,16.183772972413134,15.292715065181262,17.61621107915611,18.25972989685568,21.365089446108207,26.032345648064556,29.865763915011886,23.871778098129024,14.08465469572073,13.112695234947886,21.647286871427703,20.84503713657691,18.32852535945383,18.80698281871038,27.43667921158785,26.965078321694524,14.735855209633662,27.85506719247127,26.78119516969529,11.522402814964892,11.163059580052689,24.16255973804628,27.255486414643496,25.31634577573896,22.813113318468268,17.819422620255907,29.979946511571157,22.40359710096993,19.975325109353733,10.352238181260166,10.746967380985142,12.741415304176087,27.08156691423187,16.900110848539697,15.764055728088525,25.435465481507382,14.719231993830114,17.974186453078993,15.608494596871365,21.752215865631165,19.617457841942727,17.084823116284905,18.165339684040216,25.107837712135872,24.655706210210703,24.701083454702154,18.365035779965076,18.73543007072896,26.992629155415596,14.267236032606348,13.574149234459645,18.46764127340055,15.937255064697972,12.646938886465392,13.89334721733723,16.907057679405277,19.559336316649652,25.53880250267147,11.854694628275823,18.331715027606805,20.739261610233047,15.315907125908161,15.65825172730452,24.37231133776942,17.224205424446694,17.395611824375866,14.858442783872183,15.304249076152745,15.895512326437856,12.792330532035425,14.484485653666681,21.546476783307153,22.271439597953993,10.657768587738538,28.63515424127574,13.60851605802399,23.606506691242053,10.258234904841794,12.719667878974143,15.818524716645515,24.739278200340227,26.28290283935913,17.812958147680554,28.478939560140528,12.432361217043182,15.149268706611046,21.54755528241692,28.921876839950578,17.417598949668548,21.354219389576436,27.903178675415262,15.68062445276086,22.33318204341945,25.477041962220536,24.182237903509428,16.65482817322271,27.85814612299209,21.393174088726763,23.40587161347908,24.688508088654714,18.16285561639393,29.129026083997353,17.473968979496505,23.128557035926104,26.20550240997523,11.478079440164297,27.92325100789266,17.7404900224347,22.293317651583227,14.199841881507599,22.733751319612985,13.24692410118467,23.591733951788875,27.213895031154394,14.723637822640319,28.836706858694903,13.703290636842333,14.069197166065823,25.0478008080446,27.394007875146134,24.857279506941204,14.237956896672856,19.941533137475645,10.853186295255108,18.15114308832274,24.51191368790417,25.30448734443879,22.923847559359217,21.159586519105922,25.173778241367884,10.057769772512572,13.777703872051603,24.240443504561476,10.192251097252768,12.408184049973002,28.589355726395706,11.926025873599917,10.053326215293673,11.363566988646244,15.618463795463832,21.15146933401954,24.76146493550308,14.801721745110905,15.91342868574731,27.012680177432774,14.650491339380483,25.244445332560858,24.312574753373383,21.45541274951703,19.56279615454969,28.253818460666498,10.678348895707703,16.278530668912605,10.13663439873952,24.959150315056853,21.90883131989051,29.992683971009868,24.563358932874696,17.07433033615868,26.924923341260563,13.154434591420635,24.236727164982817,28.106579354533775,12.597382474954708,25.009606576117417,21.64324755024788,27.561590927059584,27.372582289013586,18.79386903668702,11.058505353801742,17.112189727000185,21.67922649049831,14.746495453870864,27.897607728720345,26.023900498824304,22.646817113384166,21.381456596184194,11.688910605168816,13.618459330360793,23.81591562729543,14.929109107981011,19.659783278162717,27.290328937703975,28.08082732133101,13.673650201693444,26.061298158140033,25.34956572679693,28.693918178260557,16.79167133951637,10.308066604863381,13.521113753847622,17.9674991858972,28.504937320552784,10.300162828905929,28.814843870876274,13.867967448488994,10.681204805022588,19.288292235577075,10.673279060843083,27.776346157369687,10.162472779871244,19.19584390802836,22.60170310900801,27.47965953935692,14.812163065166303,19.99847026713056,14.594250304421937,19.431320277804428,26.45014365194495,13.284630666683302,15.795114135018075,20.249614429339537,18.081088567384217,27.891401842615117,12.763678266062946,14.807240439220713,13.791007593609116,17.295951659930342,25.9343816168842,25.190807360566943,13.102110793275475,24.822867510742626,29.621343636963502,26.576919269030377,14.911094718471801,12.259468807315725,15.202567897541876,20.28676556171827,20.505924776998214,18.55100589227183,21.709099566657663,26.363995835840647,12.070928817103166,29.791623524166493,27.97199546114685,10.817945244028376,21.958243513125943,18.267292789478624,16.311101514559986,22.56252427830114,18.135117603171786,14.739116081102273,21.642313537449446,14.102244332380888,28.40943327923865,26.60050064509068,16.397153318684992,16.162121437827288,16.244400135520802,13.952738344648496,19.70922883056271,23.45201123959919,11.175232818286727,26.400266571619753,20.415367178227722,16.714004559026332,12.326739105483613,27.262737801160185,29.001019828001585,29.496878591807658,11.465794446034465,18.382530952303526,16.633460270174048,14.311932139883176,16.007432019678582,21.84851814462273,17.708192559895437,29.95227047428646,24.796791400258403,25.427124813761388,17.994898375821244,25.83893538851074,27.55189359532144,20.35517617557387,18.828451166811796,10.573143523822765,28.253731377230533,26.517053950655193,19.577764657715147,22.17189091350408,16.65054050778273,10.048287935533073,20.976638471128975,25.49110109854788,20.799310839395275,28.992225002475244,29.709571632388048,17.260057737505914,25.268117276754506,19.914955511248117,12.624616571596645,14.070952237037035,28.620435441719316,17.376351250915164,23.15185168124314,24.75180444535168,28.922445839302902,11.867361942016643,17.728985946335136,29.70217818375478,17.076615708738338,15.328069942869899,20.121082978011135,28.27957430672249,11.956030891206556,14.878031283685168,11.87362024143647,28.171073932527065,12.433616938040387,10.423260189070351,18.73934236591664,20.920992243176183,29.862184578882683,13.246898019825775,24.446652835516755,12.325343542137999,26.58911172321327,16.347455670156535,14.825877568538095,15.2593678986436,10.502166245270752,26.354856547432185,24.0979902170468,13.522721319044129,17.775028764724823,27.37851204395564,14.525249551115982,11.310085666668282,25.930624740587263,19.701549169449155,17.550325527247846,13.529514972132537,22.92770120950033,10.433817641531334,14.792400796417935,27.530883734438135,28.36819577930116,25.39284449144536,10.380882664050022,23.57151410520855,17.57337811423725,20.6796381079176,21.968329707649307,29.99778974248084,27.537165949173826,13.505803339968235,24.308066631098818,29.795072378175078,27.742142739800578,13.490248425839138,23.33227069028169,25.966061734114,13.669771357091435,28.59041084301955,11.576066719907292,15.947719317008687]}
},{}],68:[function(require,module,exports){
module.exports={"expected":[0.8239261019466189,0.0005119372004244938,0.99918258744628,3.4805520204113656e-6,0.03353360736372145,0.0008847132444132997,0.010009827934141265,0.12625519576583116,0.8099831215484505,2.218462642049078e-67,0.2798661744041514,0.0012686962264248018,0.9665076943987191,0.0006323412457547807,0.12569962398801296,0.5169403393459938,2.2534494045898544e-11,0.9925228008214604,0.7805335023640203,0.5980927984416343,8.054069583707597e-10,0.6716009278898071,0.17037178108418807,0.1832402398744896,0.9917957347764202,0.5073209627430777,0.00070122811314952,0.9960263666025213,0.5953551827608032,0.2732746727264107,1.1335349696678705e-19,0.338572903866656,0.0742380773445426,0.9768672640464497,4.112984069456585e-20,1.2878090885361514e-12,0.6439437317060601,0.10400860563297451,0.9996966466136467,0.0636884912221233,7.912285666150712e-8,0.846264043135581,0.0023512488872463096,0.970506995232144,0.00048761979184162483,0.16865250753674152,0.9901564300974373,0.8404382941934218,0.37039454484412704,0.05629932221465294,0.07113865752389362,5.868873579028658e-6,0.09036748554925904,0.9003019389066137,6.256523840857899e-5,0.5423654106468856,0.17519323315868326,1.1373283010890176e-5,7.715555734313432e-89,0.8897100429297001,0.723708469045504,1.6466180255890612e-9,0.47620053761084913,0.02883500353472628,4.46755842179475e-6,6.211573220216927e-7,0.08188812050082574,0.8498692581655909,0.5438864181385089,8.205967370116236e-6,0.08588975075831524,0.38952494097288165,0.0022256831834815837,4.886768503448349e-35,0.9113728927266825,0.0,0.05210170417133166,0.00021574360193473354,0.6748762447677199,0.21103438670750974,3.069845922710941e-16,0.9484359764448942,1.4960662900960948e-15,0.8765803216206257,0.29368973225885286,0.12138494635638071,0.32147273467543763,0.001008191561437948,0.03184101345937982,0.00043274694103490107,0.1293550774868801,0.004928231691144784,0.3492026555233828,0.21757522217689318,0.0012708367680752976,0.9971734119704784,0.4826736359010919,4.231687882283788e-18,9.561627455446894e-18,0.0010458946216251276,0.6302599369014676,0.004529434462856107,0.30660722965113923,0.9304931481187411,0.3151630157402372,0.12643655032001042,0.998454990205452,0.286262150219725,3.6103229068951656e-5,0.0007914018755930941,0.9473710943680337,0.9583006932772538,0.0327628998599698,0.1459453294282649,0.6148403828024889,1.0059527268391596e-17,0.9445095994217286,0.5863837010853872,0.0014659683634852133,0.0003981304533210574,0.0003457449119046534,0.9751839135206402,0.489998219537315,0.007134082167042769,0.23130816808954982,0.4230303552877793,0.9994517203033304,0.8765226588507496,6.1721592612315766e-6,4.315084193561339e-19,0.7184559619688856,0.9773419718171521,9.754755858336384e-8,0.22093747262249372,5.494693127243943e-215,3.3778451906817417e-7,3.223650958642279e-29,0.00037466292797715616,0.43515685571498935,2.0602044647634153e-15,0.018553947490505606,0.8933468529514527,3.2731029740428443e-22,1.804860951727047e-21,0.5441087001929705,0.0011282240884235972,0.560058579264738,0.977639371605974,0.2684553524174087,8.698425258960123e-9,0.7531749801252364,0.3856863952531225,0.3880831783418593,0.4134207232091185,1.1544539175163955e-14,1.5715501850392129e-112,0.8346047905783243,0.9659241519760785,0.035396260458804264,0.029518488899827573,0.004236803017231008,0.00015181791255453815,0.5330009496112812,0.0007736314461949513,8.985589342493617e-12,0.307041329221191,0.11548057308001096,0.2398386263242184,0.9817751863914302,0.9867372544759887,0.03915073724946022,1.734765196668648e-9,0.17035964679830923,0.09098484610807031,0.24349769112680142,0.943380293376233,3.264368368899085e-42,0.4074605245683855,0.9093065939895935,1.1611936806180741e-5,0.05445218670787494,0.46289366843207314,0.008749238329181157,1.6070595215034945e-18,0.12073476348995803,0.9981378199554387,0.08076152770565397,0.13144841330949508,1.3028539615859232e-32,0.00021035025026693247,0.9072427403877145,0.8967787294546341,2.971411029436847e-12,0.117609078403813,0.8478097322208341,0.9693637564472639,0.8711564535727071,0.07715595493677879,0.7370078666264546,0.8760782306549848,0.035646486562409,0.11715157152910016,0.06450108293710918,0.02876702856447367,0.418372518660852,1.453855677097478e-5,0.7438982895623516,0.9928904554471896,0.9758759296493642,0.9885041128913273,7.765087611990532e-11,0.9705057812508423,0.0010859976399801964,0.8759028075188199,0.49220970587338536,2.3371295071878593e-5,0.10143394138091097,2.163408284655295e-6,0.6391957063379418,0.9822581281283048,0.11426348890926288,0.0752793699425564,0.6778649022371251,0.3322711571287006,0.4453423830113895,0.006348333692232425,0.6168572204668555,0.2876419515445193,0.9543089827748863,0.008530540164006154,0.5677836306111715,0.017852048809360907,0.663984742179021,0.5804851166668897,0.433988969717972,9.813386459565631e-10,2.470925072076983e-133,0.6217654229868395,0.38743294980534176,0.013868012592118496,0.11719308741524934,0.7633817360112487,0.05231561581839269,0.014512246820766114,2.909394345708659e-195,0.019409850441050553,3.8808183197217094e-7,0.24280821267536956,0.7371789646837341,4.983949269953324e-6,7.613283496413582e-6,0.009671647087126907,3.008462100335384e-41,0.0009206182648385746,0.0017071782663589166,0.7421847008958613,2.833079528087665e-6,0.22071980339283193,0.9478111503511554,0.36451916160733255,0.23506557515950666,0.8291113411718345,0.5996884921681881,0.9466523136313345,0.6413464655814876,5.1218179025328935e-8,0.4870077936330881,1.4578229112362612e-5,0.9983024187602672,4.802657020583337e-8,0.00018679501458588793,2.845908069018357e-7,9.766024446708397e-5,0.021474350539347934,0.994403452628098,1.2421228370847242e-10,0.7981221338104925,0.3111508354169329,0.8229696278552969,2.966028563261782e-7,0.09194135970455501,0.9852112835012931,0.5339339117122045,6.27439918202259e-8,0.23514478817977782,0.00044757569537204025,0.9872742670821342,1.2216246010639489e-5,0.00011451662234574009,0.02316545494831166,0.9804826380452435,0.010564763297696645,0.2512397040165907,0.968245846892223,1.7893738499254547e-8,0.18469472134250062,2.497526937782696e-8,0.4883525375745017,0.4368730501263234,0.01926814405472848,0.7094598110875744,0.9885523438417544,0.00139797924548591,0.0015151410806210914,0.49459393037860455,0.03146791020024654,0.0025575793201192483,1.1090454192562895e-10,8.57008757697217e-35,0.7213373210917653,0.9948282916182445,0.7365873581675535,0.0016765351555633784,0.007819912471706896,0.9964638674638812,0.005201253463340279,0.9542550345928544,0.5271529887361885,0.8027646873052313,0.13177401223459811,0.9547664772927974,1.0232494934275581e-39,0.0916553924106148,0.021925661633625436,1.5089001062024425e-8,0.024365960658544978,0.9582603751007353,0.9830870107250254,0.8211288037990088,3.174247804006267e-83,0.007266371479363157,8.605178262029983e-15,0.20935311879952528,0.9884144641790993,0.12604451451964432,0.0005296050439484802,0.9474121330234996,5.288780884299012e-6,0.2274781753546327,0.21546910815218237,4.3840909911203554e-5,0.04382717340226958,1.04570927049013e-5,0.9095174252133605,5.468274249376276e-6,0.11183534040578855,0.8237133678839094,0.9770299791106277,0.00924314254390042,1.3786371777238486e-6,3.010253792650236e-14,0.027264568444083006,0.2756319390052914,0.3789836701710643,0.20310368022605654,0.3085752080120812,3.188260222458438e-66,0.2972617353648939,0.9625356620780995,1.616791306149123e-44,0.7448554552743167,0.23333561137524372,0.7397869697494543,0.002923001451863832,0.4846133350848876,0.40009382122320214,5.052601844357078e-10,0.9702465639251852,0.724429610242061,4.5383147317429654e-8,0.2778092559604524,0.9709385174876727,0.9151207328049193,0.004987597570578979,0.008141872856424853,0.01786593281885208,0.5132616611646553,1.0947721238802534e-5,0.006290237291515924,0.014367577025540573,0.9197673021760961,0.6912841083968057,1.3010825744933995e-8,2.1178678361739873e-22,0.8784107469038247,0.23637820186901046,0.26391292790796056,8.969673305468554e-22,0.007324672794080721,0.8841885320697015,1.281648701397372e-6,0.99283134719739,0.6418684844141278,7.964334482151414e-5,5.397265781738545e-8,0.9349975098497763,0.8113776972275483,0.39892063791689986,0.07546042056224334,0.4138177445147562,0.9644570484337011,0.588054908268959,6.268792130285317e-60,0.8936948275331041,0.008107992324173084,0.8957604590337577,0.6405822253581889,0.991018427432403,6.419973935960585e-10,0.25509096861210245,0.00333439287500193,0.699537626055392,0.14428591080021513,0.10940567724573273,2.5258796364129294e-43,0.03860708453586469,0.05912748595543888,0.1397081966566119,0.03527287536230565,0.9762723860643958,1.0140021513039195e-44,0.39651427905007924,9.276593663266773e-5,1.1091576665629287e-13,0.007885078402914233,0.34329626013750103,0.25897219230936647,0.010319605475196445,0.7655242668966823,0.6606592708425564,0.0005784814718382229,0.1154702174256056,1.3380320117612018e-8,0.034081731143845204,0.0014738950772309246,0.7788230213946179,0.0009535325476734272,0.7418769195355892,0.353346783615372,0.005450922132929565,0.03368519310817075,0.2364926798815166,0.49071224546992787,0.18193171854507226,2.2863540473519533e-6,0.9570919649272975,0.3691575991803511,1.9677509232361744e-12,0.0014229703823158883,0.3765944897950073,0.7656619311431496,0.0022037972671598268,0.041234673012655786,6.402280981288793e-6,9.656527375272608e-14,0.0035055141247575467,0.9835545195818378,0.9401410105874508,0.0379173724015378,0.8821569902968311,0.10884331700719256,0.0004671221708791782,1.743065165896171e-61,0.1868181528087135,0.605875007296395,0.11994801264309392,0.9250470425580269,0.22153563003969026,0.8309074841525534,0.9821031455166738,0.1601475855635569,0.01985535909998699,0.0002527609774810144,0.08507777146941296,0.028591946360664772,0.04690594857381995,0.9819631702429223,0.4759695888814795,0.7650062001488893,0.17257356158393683,0.9734795409891805,0.7636048447787984,1.5732580171604593e-6,0.10809522796831425,0.0005151871654407172,0.8443437734633747,0.899592689426356,0.09697482174219661,1.666115450450095e-23,0.0012607171624123923,8.107306696350967e-6,0.9223121512486764,0.008455641305702628,0.002002648502051257,0.0352366992629023,0.8243809359693496,0.3244258766889566,0.0372614073294878,0.5050439936326356,0.9182734673361089,8.066443839300382e-5,0.45645820495168193,0.34797819394895513,0.11717639330139888,0.9725471608234948,6.665293454057701e-14,0.848886337773992,0.07135165375304033,0.789442804753369,0.5855378441289306,0.8279086877021915,0.2917903066908139,0.007742086473179157,0.7942934097642658,0.012625267000661775,0.828814012738887,0.08745566371948536,1.3071683558882594e-18,0.9342575764813338,0.09013301625626917,0.9570343287131421,0.12305249362011232,0.8740347139163928,0.005278314637271501,0.6405796888265984,0.6174177071104463,0.016592839248871515,2.8413633013417494e-12,0.02011989892530288,0.007932483377067206,0.003879533891078335,0.9284174824527076,1.6595982963021686e-11,0.0009336766866627033,3.2869455329017514e-46,0.14843216036522114,0.12333536017344651,2.3661717793962863e-133,0.001229238315853322,0.0007125976397336063,2.9753518633035028e-5,1.9039231333153946e-5,0.9420583215597848,9.683981266212376e-16,0.11858261625620611,0.6901698831178826,0.9835768058340781,0.007408138579001577,0.921644446765214,0.43142386774984987,0.995179659895805,0.9921837084750434,0.003088524128474447,0.9699113796436357,0.6315211791396581,0.009916723834008772,0.018431220268229465,0.0001007513391708949,0.6577394709206286,0.08490196341913311,0.6475008631755765,4.468158713407826e-6,0.06596909510935575,0.0027993216044545632,0.023729464586805117,0.7620287371393469,0.22896638393227645,0.9663290225337139,0.13437691678324146,0.4078237206588002,3.157223500975238e-8,0.9194472711473753,0.9542735394271732,0.4473309289973155,0.3067742824865231,0.007725395056276605,0.1289976521645019,0.004088407267386778,0.134614035839154,0.845213622795201,0.48734068255929885,2.3948099993226734e-5,0.7620322845919816,0.09838366058024638,0.19208806091210165,0.7209439027601249,0.00010272293018528327,0.5159282540999325,4.824931300971081e-7,0.10750237458255144,0.41700452325601334,3.469848307849253e-7,0.9131178128782522,0.0068894835815010115,0.9152040643353089,0.990705654174024,0.0037644569482877042,0.17017639688946357,0.0009231835712695576,0.004234101205602718,3.133272351761763e-5,0.34379578539329914,1.4388741731231942e-7,0.024847201588162147,0.9612069751245463,0.07521587394207732,0.3647681663596416,0.5278204069291541,0.6355189570890838,0.43291715533253583,0.11367702554516496,0.0642541178004666,0.9729450462407986,0.6902336852895172,0.048704344175096184,0.4065882092450548,4.668278047802085e-5,0.019728934017234676,0.5953281887368871,0.8646667175800687,0.007535513727908524,0.012721722535001473,0.06278725396458727,0.5901607588141874,0.39258350264510894,6.248829077484839e-9,0.6813542690881875,0.0642238967728092,0.08737682104177164,0.4927467979099854,0.9956625687852473,0.9683787654294141,1.793227596494708e-5,8.555719953529566e-7,0.034090681920223284,0.4864303116520697,0.32009965417137204,0.10792684361785053,0.3197930615037471,0.5978793377763438,0.7976376770618856,0.004925555330961627,6.244575930932929e-8,0.0010811319247384067,0.6738668702698601,0.3591097313687413,0.26238229378081235,0.6253831561909285,0.12721161016272284,0.16935377577061678,0.8764153260614495,0.40914552745172333,0.8043327055973712,1.7575378798467308e-24,0.011387416711303883,0.807672953585587,0.0010881616243530845,2.5144945700917072e-6,0.0059195744318591365,0.38666871060241076,0.3338020600019417,6.461360013027467e-9,0.3501056249940747,7.650652787776605e-52,0.0061667505978936854,0.39175287513989204,4.2048235831563865e-6,0.9921184040799507,1.3625789390622474e-13,0.9545777802929062,0.8823444458940353,0.5434450250415646,3.2357533761456525e-7,0.7884443348213219,0.08351685745044941,0.3741615172006299,2.54991659194702e-44,0.14228523293490802,6.637445099744464e-5,0.8794397328111451,0.9805987190296018,0.40822042234338324,0.8418432716845549,0.7044276873023372,0.026803427594939273,0.07126203994201404,0.014432241668193032,0.9096065213309908,0.0017264476770961833,0.9375094889229966,0.04157323726161032,6.263125972159379e-6,0.03999356494047995,2.6546802694501287e-17,0.0306765984117218,0.05519474512979822,0.057414704336646374,0.8182743956292502,0.002671392375567989,0.45168221915996526,0.9971631268010515,0.9969626432209677,2.7583931240311686e-31,1.5285260282670485e-50,0.871757889799686,1.0449961816315081e-7,0.15361230402487536,9.558128684520307e-6,0.20182233068683372,0.13495187170777628,0.027268170680385884,0.0702253416849151,1.0113851790925211e-5,0.8679977106521147,0.6315568249428116,3.556891403976433e-5,0.9836778072230172,0.057900256856621465,0.580397693136408,0.005561316593590975,8.523446207048294e-5,0.16156853731153314,0.4447947868590888,0.7023877990771494,3.347091139072342e-186,0.9871094869055214,0.9798641850679526,0.9957017428928215,0.01653208840308193,0.31639564287730343,2.4044179020998757e-16,0.32490384792450494,0.13712515563325842,0.2403434711193947,7.072141270641535e-16,2.6020908744190796e-30,0.0022409607199577134,0.049978876449908914,0.6616599746607941,0.9676184830206337,0.051184051756619754,1.89753223207982e-5,4.466267481346925e-6,0.04842453834579988,0.6749543618110194,0.026412301356525388,0.9973946661477253,0.9024768706884191,0.977876315311034,0.5333793613850474,0.12655780836431837,0.45519265461851394,0.6196546524831884,0.01150319831100545,0.9217035599558634,1.810292901227656e-9,0.00029976605299397827,0.05904667893937747,0.04954679475736066,0.00034522170381112623,0.924785971072616,0.985277415887645,0.00020317298424109918,1.4817473654107449e-5,0.9656338247501399,0.029195066756527097,0.7317211162037188,2.1218248191091725e-5,0.01206448245304569,0.33465340498033397,0.18911784390947922,0.7813164307312006,0.0,0.018105689659393458,0.20699801633023446,0.0005453393242003916,0.9545002548811623,5.579850792656845e-6,0.05784855634257017,0.1083113360304713,0.06951454470856287,2.321089106997231e-9,0.9627788226939756,0.8629707817049089,8.272054081410667e-5,0.6146673810031766,0.7671815451272908,0.07629341098625556,0.030694684912037792,0.987906740366461,4.977487081315044e-22,0.00010192196469006933,0.9902857575391031,8.080825611554283e-5,4.181348579833572e-13,0.983128671558305,0.9141878139550382,0.9997173000353701,0.0887263072239969,4.631556578383307e-6,0.41424868234660717,0.0753219690040325,0.5872261528864272,8.174525601693697e-13,0.0012404616718517233,0.0791819369910009,0.2874993323261318,0.8927049126966536,8.960285672559574e-42,0.0020379193643750553,0.01911330992107779,0.01551194735487016,0.0012255061244692276,0.9762190348026241,0.8673624890432924,0.020468953293328297,0.6036289824752612,0.5122936455430145,0.7073408607234569,4.469899554083523e-14,0.7795509636710994,0.9125398530805411,1.499162649816998e-8,0.000445770458006065,0.32846680939518286,0.004444965996587841,0.7846397008129271,0.1879584688337874,0.34070635012297856,0.04708798825652871,0.9426670101122174,0.8752521825035504,0.13532764289694466,0.887748519662191,3.3269710858706433e-64,0.9613790902743634,1.405436361048667e-38,0.031809388673174795,0.03855412525000362,0.0002039467901857596,0.9981108143353429,0.40394705525447794,0.2430773479072665,0.958421924497567,0.8930554700809945,0.007087199891936034,0.9451958708104502,0.695325559044526,0.15609462267242977,0.9303892448823566,0.08688776407905748,0.7802506611615748,0.3087922054792126,0.2868486722005449,0.08772517578182153,0.09441070831381745,0.04958919700160535,0.2585505924311587,7.301407476098276e-17,4.2266110194703754e-32,0.8531333731282638,0.910871899147036,0.005622376483105285,0.6673059552914318,1.3659004534204554e-5,0.8817501503488282,0.08359785938782896,0.004138613034108815,8.486241918835183e-7,0.8769874089679649,1.2155909924708054e-23,1.1026226860469547e-45,3.0091127619932367e-7,0.029403276758735785,0.7676170687041721,0.8984201357371423,0.11834332996284247,0.2257636858732561,0.0010570745024235286,0.013463942032412352,0.024766025983812032,0.25735814172255705,0.9959191932459742,0.5331175629196229,0.9642856620050791,0.712847659000305,0.569009762924503,0.04155332106408204,0.6181907663493642,0.17898381036586317,0.4854808811598117,0.12784177045957587,4.54994823304194e-42,4.397029406461563e-15,0.6460889980860814,0.8563843400354528,8.423539746068944e-5,0.012451078391039816,0.10389384692342031,0.7294978019009392,0.340642524067915,0.9009258357945548,0.8125875785396186,4.624499153961473e-18,2.5852594915068576e-19,0.9751912035133502,0.07154327726369973,0.5136122370777917,0.09378610590063435,0.103165786996697,1.5464592673873224e-9,0.3478214266271209,0.8703719573718685,0.0011237502034747871,0.6682363085799659,0.9565926670931743,0.9699827605839659,6.47500836609774e-5,0.0026791923563281588,8.188656220921652e-43,0.0058853821818972115,4.454971741490063e-8,2.0249336344770763e-5,0.9442918873238567,0.025363930562299675,0.011561094409562824,0.7283139319597125,0.8661755937933278,0.040164346364916,2.483119500280681e-13,1.3810518027603544e-6,0.73408389069259,0.09627474843350343,0.6232691166682859,0.000180214419384082,0.7465332422606428,0.0119043812406459,0.8792817581763264,0.6533417066424336,5.462709844852229e-12,0.9165708637763824,0.0002279137113778101,0.982414924572627,0.6723753564161721,0.7765344193255589,0.0734840077825917,0.06456533348145377,0.0027639844204439827,2.669569250246769e-16,0.21688537999328858,7.020336190872452e-10,0.420863429038016,0.015417151707387906,0.4253886049900051,0.6069782058064522,9.0504789263423e-6,0.0030617986630955773,0.9606021153420935,4.0102711325312044e-16,5.3471868666100534e-5,0.0015585379874314153,0.04213631826418818,1.381849342142942e-65,1.2097544726018483e-6,0.0520662923830043,0.48712032929541066,0.09917478426373057,0.00013054429566536257,2.290599648087857e-9,1.133394336147233e-6,0.3167088287488863,0.050213570751676206,0.8035454105791764,0.28515580645727856,2.44696935451236e-34,0.001505171879804107,0.3392363894603818,7.594824036271614e-16,0.0023219736108054316,0.6161767579287847,1.9398401207785744e-33,0.996861477633304,0.040556346003032186,0.024437184254804414,0.0008598394789592365,0.5358548479661709,4.003096952259127e-65,5.104089845778791e-13,0.04484831857421143,0.9532010113682272,0.012541419474139016,0.001502068186661956,0.2030891275160802,4.463508975661712e-13,4.3651748468154354e-7,0.9955038669644142,0.8876776711500423,0.12215235052931207,9.490199294595921e-6,0.005619805009022468],"alpha":[7.508574326838033,0.06295872813569137,9.77223735616379,5.082017291339231,3.615733442465796,7.2687763399612955,0.26848462632108827,3.785897204862152,9.089098464240447,2.6895542486803103,4.381069305696855,3.624375275985361,7.273620969746513,5.51212812323886,2.8638774132396927,4.518862043817071,0.321108842239346,8.10018633104239,5.612190860144346,6.251733239212425,2.907227018492544,9.919916306036162,4.6155599927690965,3.949787080635856,9.025272939169739,7.563874219313842,8.286609021881784,8.6054138440468,4.201972551145299,4.890143081258358,2.617363188577031,3.7037587122255555,0.9706887676785869,8.174304750067742,8.253620908015648,4.817477885600385,6.639131831490612,4.117500721679996,9.367990923250893,2.247859141506221,1.3360266297292323,8.648119600434427,7.069982024622872,9.37867510482974,6.016075115232686,4.559251890494833,9.017005564911598,5.669247153089774,4.994436659832228,2.4203715625014888,7.4877649063840135,1.501875051636612,6.020715750436438,9.380533476309079,8.517148025542184,7.436218964240961,6.0797991062924055,0.09662266782819007,4.337586290627071,7.199674040148578,8.094622275741813,3.643220957411344,3.988828388074692,6.4537277679041765,9.351792369141092,3.4079538935564813,1.995401819155651,7.257663892063608,4.102996730116861,7.017530863172661,3.0177521220251458,3.1562838142233707,1.1941287564169079,2.9664328109675253,9.841296152146146,7.378717208728363,1.4928445006678892,0.573824693890248,4.4463637117323955,2.376699657025736,1.7214762051927313,7.564646833153265,8.01959914830145,8.053104250528945,3.0348766489434764,7.035604639806346,3.536418970990731,2.6571620652422356,1.1384290429225885,0.6504019519704385,5.764624684282216,9.571920869536577,4.341605017086135,3.904070172755949,1.5782041183571383,9.889028724285197,3.1707356245784246,1.778532367895529,4.749673274678063,8.10825885784428,6.954828470035315,0.4547588287895876,2.9303463813184827,7.033224006249698,2.74613708800566,2.934226594138809,9.28760124199313,2.8766450373375974,6.518651351638054,5.485857752544987,9.750529803871345,9.589179378801864,8.898004859214844,3.455377901611554,6.743436733705426,1.995108078101555,6.154872768920498,5.640260619618685,4.338848868468672,0.022195693486948276,1.9783838507472429,6.807319146502135,6.863701190702027,8.392261820261478,4.555555788030885,3.3753354142473246,9.581114723555956,6.83409323713188,0.12336369381510615,1.4372690446632608,5.613484716175505,8.767876782036229,2.843660046850216,4.8314017231071755,5.06365852603428,5.094378086181264,7.745954758495593,0.7805516868797935,3.7701734579819424,1.751705358304796,0.600976251004337,6.42966111103166,1.4008002818860654,4.6674530637991225,9.52819308372903,0.08951245030986099,3.990635993493483,9.875006703939583,2.7894164558856804,8.279222339772346,6.993023281565323,4.43509151294214,9.874617106769604,8.496649204863441,2.9140175104187915,9.474612155585236,6.877191664818996,9.732618828373445,1.8995945029678785,1.379837470491183,0.3248422516536742,2.2418951495624273,5.0589214608464195,8.901845847935068,8.25370553359969,8.220833387151302,2.3466853787157627,3.201963181423706,9.859407002980108,8.62700742093911,3.476812576263637,0.8002488653722173,1.3366816352381816,4.931442906237078,4.207758465053004,6.095750274887335,6.398732062739589,2.6883896574816446,6.979490051500119,5.740918665710515,1.4964805140133897,3.2191608772399594,1.7474992955451718,0.5409107970792149,3.1503512565479164,8.99152659649169,6.577481124626583,2.564331069596877,6.79780808589596,5.309349169402218,7.853412646959028,9.151043058875665,1.9410027147509568,3.601162824113353,6.464058908582457,8.0455032000728,6.534192182689981,1.0186960598352868,3.8669494796199233,7.040242416715419,1.1642763985261784,1.9325627850722626,4.126713819502694,6.915646720063158,4.145290544255147,6.030871018933206,5.130413331142314,8.14684464587293,9.34213799271988,9.5014439009212,6.944307148916023,9.710362316541092,0.0316173393503516,7.645151618373964,9.529647496803948,0.2569374488694387,4.542505995813255,0.7595944251453557,6.503347990561814,9.681195100467722,1.6020541192327187,7.726963034998877,6.796641745678615,8.387384808898261,4.999401690425418,5.980125867327719,5.477556693679677,2.539732805881627,5.623102700487534,0.7528497185003014,4.430949395106307,2.8335947651575633,9.66692887387115,6.190102496418238,4.690261696955497,1.4089789489910975,6.609676080076678,5.958498480488304,4.481897976696311,9.862598946852463,3.0660393835990085,5.199262358895272,4.015573493392511,1.196331118292937,1.0494956259794463,4.793513053074461,2.9126238874466104,3.9403590025106183,7.641554463820728,3.040727188946062,8.845511692340754,1.545332572132161,9.380985764307816,0.891230964806744,1.719037792953757,5.946845044287075,1.5022823973945565,2.93905433408455,6.27928165537311,5.357318922993299,7.2210692086237405,5.489950649471512,4.229802057117123,7.6138269018627325,9.045467343594177,4.952619667839915,4.130556183231608,1.5759212349924479,9.811424903559045,2.3457153874868175,1.2895514048364398,8.835279945751918,8.234226144254794,2.0456855230182414,9.098098471330884,8.672448335488053,6.989810856225899,3.2958994891327587,8.912991379699001,8.74180949165353,2.0254216215251586,9.283756510165286,5.994809611818148,7.217883506996476,2.314398442612755,0.4699799625778267,9.911008185280025,0.8580713880398361,8.794389578791897,1.0122144793019139,6.153284601324451,0.46598520806415245,3.918450969646101,9.356186028777309,4.734564668334718,4.060357513045874,0.4743906983357804,6.371294452647051,3.8812353238960173,7.004722867635014,8.608636036829775,8.546478691881426,0.6324807081537331,1.3212499605030903,8.921699001926328,1.7110751551916548,0.15261155647787739,0.5355951842898277,6.901035804721014,9.159107408561763,9.126357438524144,7.805991097011981,1.4674543736875378,4.278297393959381,8.716343944607388,3.679607171201902,6.5583957298264135,8.419139607180501,7.1752107321980425,2.012566869768724,6.937868528196011,6.44859890209986,4.953602463362314,4.220955490627027,6.708416381718156,2.078773338483366,7.8419540696770484,9.819981286108936,5.1723634944557,0.569539485252557,0.9844993192330298,3.517821888189816,2.9394305376018903,9.469286543782097,1.3356165776485396,3.9144907367363646,8.53628030988217,0.6360382718600666,9.528298157693962,2.5177868379344903,0.3511566153614343,1.3454389800747024,4.070713964048512,7.133375562944703,6.854217954089812,8.042181272521873,8.384804274129621,8.306322960221307,2.3028055726954766,4.289361795187272,1.4404697155277457,7.221984169374771,7.771426970829259,2.5263786620240403,3.3470276959290146,9.664202841554514,5.749234809997066,3.2705513178765755,9.883297434919353,4.328871614191662,5.497834570746772,3.173700448447121,4.571260918637954,8.346509950990036,3.344162950594569,3.249493450554346,3.97174035123264,7.244930854925109,5.092778072787258,4.4549939281299995,4.89824507956822,9.518758427644094,5.950522246879089,7.533986636115728,1.0195545631767433,0.9234205880356527,7.866177250860165,1.976893597146716,1.3295885524444806,7.447501532290666,9.234489848547739,5.229650532707351,3.539242804609566,3.621332301548592,6.1831473982553975,7.266275866648737,4.66280769691503,2.3747968265209485,3.5426914671299348,5.755021178021915,1.0182515502048806,9.852799327334896,4.97700707059413,0.25508003105260135,1.954400490240431,9.291282286022158,7.213457403181707,4.27288375163765,6.223698131274402,2.7324926480960143,6.206547406242202,6.402680442140561,0.7488420662451589,6.612201974718794,1.8604533363045594,8.209008130938859,7.689280671797163,8.20024532905597,1.5366813953934266,3.1877370344472955,5.626807986723541,8.137664942735244,2.9883524870603617,1.2150973516726937,2.4585631636380767,1.43135094530483,1.300307087320387,1.4659201691844426,1.5065842379217353,7.372067270046811,2.2033976672425615,4.639295226958639,0.35166249233828717,3.956790336959526,8.414448698443355,4.717344451530153,4.240443907877336,3.8437125576678755,5.059526601505344,4.747029524118194,0.6703266238036698,1.767670193723485,4.306957195660508,5.839038972602677,3.1645872280731813,5.431483827649785,1.0344234408552233,9.141083213356819,2.5622416466427445,4.00750223292272,7.577116764944649,3.7624252078707743,7.954855969982835,4.272442951887823,0.04335787183397777,8.639654805470997,2.8860415989122856,0.646886193672882,7.98743645491631,4.20370939410984,6.078082988290889,0.6480665750284231,5.367725378948631,6.184777250169347,6.399784407961868,5.141827309453455,9.279575550395107,5.839487338599072,1.9730358693495909,9.758107353570509,2.646369796414676,0.8499581042251747,2.274049366278763,2.2864182361269725,7.7802420526950495,3.4052012415211053,6.085671074272216,2.3591557736615165,4.786046111026576,6.6522395026331305,4.599024350053449,2.054575317070617,5.366227532598186,2.909895813312149,2.54225397489356,1.4869125740539313,7.325549209284095,7.297536639971913,8.053245270446732,2.909220155287453,7.007295181811539,9.961402171361964,0.02270275490140028,2.3932348777372447,9.083483587490331,8.433487384306225,8.29505504074718,1.718911976603652,7.4839179109938065,0.18859762019735937,0.17371817123239985,8.246595393021979,3.8896722643315362,0.8093366373850452,3.171211111570884,7.761700637298857,3.0659910098946352,2.6101412228970378,7.51101972548168,8.834937423848778,1.5711195478071516,8.206962159104789,2.909423251557932,4.4567445236123575,6.783750609594835,7.377167687786789,6.004153106198871,6.243503204248679,4.91199163377916,6.7979367483473085,6.357184948983543,8.388046068418248,5.386295654377882,9.510164405911192,4.856352063513006,7.732328311758909,1.0835779452253558,9.845788534660418,8.49968045825426,2.612844408291841,6.3360213460358805,4.025085454945376,5.7130738714844504,3.623512743948434,8.878463634917996,6.6028820961762635,1.0265536574264589,3.3028223427187786,1.236190281387064,0.4071192685124525,9.81402200216495,7.762461431850105,3.8114753348080654,8.55756300738527,1.2315317393938985,2.1465969574019383,7.760001532147207,5.497732463034566,1.3074933139768086,1.588873086051028,1.6684752048466245,0.2608354285237824,9.2254876591143,9.661983863605945,7.01612699820468,4.297439592412351,9.731987990063613,4.246071889443037,7.756843655246093,8.50906937231062,7.620812418172829,9.99365900405593,5.314956266949382,7.614734866941997,4.226951403498653,3.6642756446570557,4.739739548168734,0.3524400238462433,7.753265368886404,4.95496198151725,5.1455457756128675,5.659312817965249,4.639915841532314,0.2769749971053992,6.332829588319826,5.822513489362155,3.5244507428817484,6.53396473318776,2.335201674344296,3.923699009809476,9.57943835633073,9.70832752851845,8.34796089081898,6.1752927777985285,5.61490442778836,7.602374034071355,3.0852543715113767,5.2033841672900705,3.071976246315107,6.264274782741969,8.684567961941664,3.012228357394542,7.6671859033499,4.108249677568221,2.000414228654863,8.26379701107699,9.49362062004009,8.263304629499766,1.4925417898434779,1.2527054529571013,3.7090974733818993,8.020854969768298,9.218863882673356,2.25645165779754,5.646633170599489,9.039133826816242,0.41263604544432564,1.6976113831602246,9.58419128840758,0.4708911303039831,8.726214871875085,5.811502838329714,2.812512947210506,8.602341248543981,8.399306285412788,6.886009231357524,8.195565960736799,4.376303688719673,3.8450525137818947,4.0834371779290946,2.8442469777430257,3.450246681271578,7.510121518305393,5.701150204484664,9.757029897183768,2.237280128140553,1.0551000025451551,2.6214038132645734,4.519169594182921,5.422872037898281,3.798122477997228,6.269058880144267,1.7516397562011687,5.387636934819162,3.561646416088773,3.23208622379364,6.666869529957104,1.475629164462997,4.531693910035504,3.740872138368443,9.538095567139173,8.43321209144547,3.25357919853279,0.6658528684581788,9.92639139569194,4.7921674738478455,4.3376284448480025,3.2237626785703877,2.9815799661005538,2.7810163214803185,8.19744342137997,1.065053033045913,5.912756239467298,1.2045842029180065,6.582115565412144,5.698923747238389,7.080882622154087,4.482050636162594,4.5229132488499335,3.9689952628583858,7.812849049224777,9.712104317275605,6.936724393342903,1.1518130505115276,2.2732933673869526,4.7488789486283505,5.08666471368498,2.8547539281359913,7.149037126706612,6.002664048632777,2.475996446249311,5.722973909448248,4.460040237708074,3.385591846314717,4.307391744517721,6.066078359655036,8.556327334778295,6.897824735981429,0.4255556058729604,6.6781142517556225,9.233889761589477,8.720668579674527,0.28480102812559416,6.164024954358953,3.0785334895418903,3.9922568195289787,2.416234384986351,1.9450173752236877,2.136973853247508,9.087124971837572,8.913506935728364,5.05750515750687,6.692913580591164,4.206664476233173,0.8940493558492735,5.558401739496233,8.087072548035577,5.943944359443599,5.639315351059231,8.3494350295074,3.2881292587709154,0.08728550415761038,3.4148794264740423,1.1127216882284463,2.3510360283142306,6.4719928881446815,1.4869825156954009,7.552311027102476,0.8928057059834904,5.27679822718812,7.733838990867961,9.77105992563789,5.645227724848243,4.9755894489298065,7.534266357265671,0.8638503260637531,9.957047516320191,8.515386339737896,5.555769846550678,2.1475721432758,9.617423616443585,1.2826994458779106,4.83608500446624,5.113578399054067,5.980094952973911,5.686358729397167,9.3849057016558,1.219042718620733,7.6918730777219935,1.4223292884530636,0.2687040729815937,2.3153629728873004,4.003404991752467,8.397072935478517,4.679791890140963,7.817261072146239,7.197700810789522,9.977546416439399,5.676779055242496,6.211779243368579,4.427385383542228,2.3142112447413687,5.136776834348245,3.5589454722806413,0.27930913435404436,1.0629377542440843,8.593513790548851,3.6987653779164,5.11321344757831,9.420289584587486,3.7708539229922455,4.086027005128656,0.3058270897585502,0.9009003341295685,7.842346001361071,3.086150657470801,9.840084069288311,6.886764452399465,8.636309200988743,5.699327493451751,8.710831297651936,3.937573270415713,4.800014856901907,0.9658969511620263,7.515984517603411,4.019614514913843,5.992611257005429,2.452942408637453,2.8567877843755496,1.1558186672859105,9.516652971566055,9.235581904377142,1.7238464253618502,7.711195164926206,5.961438311800881,1.1913303888013949,7.31106061404274,3.932713571199151,3.0882246657316825,9.584292852697821,7.243480036952937,9.472628350512933,5.516709801352411,1.5988718207401886,9.877235096621071,7.237863435740701,6.725008233318082,8.6938016094645,3.1763765327380877,2.6448198872147355,4.018757227389473,8.186206966125996,9.969279434111813,5.891288774907421,7.008473980135566,7.952088071695236,6.008845314785032,3.1081670517556526,3.620709255397916,8.638477669460059,0.2525360462981885,0.10393164687477974,9.112750743682973,4.1298883705877065,3.8151720838243808,7.173785357403981,9.601460187718736,9.032198789062631,2.3725260055896347,0.035270443573371946,5.354887242553177,3.18200778932082,8.2909240648689,9.876163797802475,7.972422176756289,3.6484056614733062,8.03176832753191,5.149308346558696,1.3034288992659215,0.41125975847019713,2.286902305200529,1.2654917651714004,0.3855891995350702,6.813253975620716,5.113128684042301,9.28150258356241,8.904980438826795,4.683044162542154,9.200289752415362,3.141542597627478,4.534551494216162,8.200271642675842,0.1586511343816399,2.3115602706445615,9.38998654932339,7.830761780765052,5.197659140965456,2.508740799430549,3.9980817843294925,1.5337078491344514,5.880729999465113,7.0101219116759905,3.530536381091718,5.965739854629184,4.04588863922744,7.345700426039734,0.9670851838492811,0.8328918229382376,2.1856865842579443,6.80913423182393,8.654751918850355,7.5252264587602085,2.2366734300667046,7.809193950832389,7.968697588765085,0.6493997266556906,9.308702574625208,6.684866897578288,3.305987283087153,7.520336594410604,9.890506373451258,8.70095545933032,4.986726970808508,6.284566668236087,5.204655449102457,1.5401610690047463,2.623449441978054,6.966391069546958,2.915069130982777,2.7243622172385096,7.468236196985572,5.997990691951309,2.9354691916070252,6.356680595388838,0.08438407957812366,6.0994533541738,5.139951633293887,4.354803162890328,5.850314262714289,6.60107394989031,1.8842428174853465,3.575201416775924,4.359896347743952,0.6007969654386214,7.22455069096501,6.833392824576967,4.339188702338088,7.4875958993515646,2.8259531347456823,2.0135930586653616,1.1846176289692267,3.8088526273103773,9.512809761704933,6.305529611569094,8.592028772593746,6.9156741321852255,4.931487916823483,9.629031536182,7.270657871306076,1.696361373883566,3.0058488046942555,7.897662833778867,0.967014850998904,0.21480948385059984,9.182744205824404,6.940860919124439,9.479257602990984,1.9712716010191356,3.990225201114459,8.316463289470173,7.444561526143816,8.548906260635098,5.777135657686642,3.8504219915657334,5.93954056782384,9.455878106425706,2.0630158744967386,8.148155618053316,2.1903063271520007,9.018291684640925,0.13697761145836207,7.89538431696198,7.684962486716569,0.6390168024742771,9.280129678854241,7.852227139379535,7.625925146177702,0.691291902021387,1.5027469989641684,5.986580068529586,0.4485264937863609,1.0658592842406578,0.4408085095927605,9.564625990768373,0.8066612073982671,3.5767779443379455,9.73926094364596,4.899029491307183,1.2797570746092202,5.180257480413848,0.22740340074719034,8.380433832903364,4.231669266448764,4.6031956870485935,3.1361609412629,6.102468533171357,8.610964322685744,5.70053620013698,9.671380142494302,0.3100657054584133,6.908166060940976,0.08162287284610548,8.8768695918629,5.6030085511582195,6.137481239476232,2.9465337645602263,1.302067353929408,5.662828839464266,5.277759387965528,9.481571588288979,1.6831951720975513,2.5721266139999988,1.8407686619586872,5.616113159555947,6.036003369987379,1.6222839386376853,7.49265822855585,8.01641422973841,0.933820700218968,8.596687690587137,0.2472128392171835,2.3897629460654857,6.037214551534673,3.24512389346562,7.97670718002125,3.0710841105573405,3.990166650230995,9.911681939925444,3.8466409065579454,0.2157237724941341,4.231382122845922,9.165691538415452,4.091418298496807,6.6026620039663175,3.483682790494338,6.1718781225006865,8.781427259300669,9.805455531388125,0.32812265220816483,7.107319441112434,2.0639314000792353,8.850391264013513,0.9520907704431192,1.331595752332173,7.964258315303194,9.634358868410908,5.002561617808925,8.848166071767169,8.82042331719519,8.285807888416596,0.5861363259827779,3.345356883185646,2.4496584953932565,7.544766366726543,4.124669748881999,9.979800193671487,4.76163198183982,3.6460008066133964,2.9479214341319904,4.753022609808957],"x":[2.603279289292412,4.501314533983162,4.099143170751329,0.7714979849215986,2.525610938450943,0.9456062675074928,4.452537567444477,3.1528798500187483,3.040134485816064,0.0665164451092104,2.6185420849827903,1.5481381270406769,3.994115110758243,0.6405545431772464,2.220147912260094,4.613410739323679,0.7072314976748006,4.872648975483886,4.3924742644810575,2.7246762483147213,0.6750863533828388,2.2133511901741967,2.3636729362183626,3.412131277413301,4.305927207242222,1.7853663054127678,0.5237272260832093,3.667092875470158,4.3828224153152915,2.2237509159556943,0.35147440811622466,3.349644658937768,4.451580929752187,3.651412121056332,0.265696814863956,0.5120901792269361,2.895734678653732,2.283409869912515,4.794798234202648,2.9493572345244887,0.7155379113351845,3.3605433896101813,0.9470492868940938,3.300675522882112,0.8495238777613912,2.600172434651066,4.364761755626523,4.13638080866323,3.471247153923044,1.935249210094241,1.3566989185661416,1.3972342179483088,1.3570349656170266,3.1993239331931145,0.44464901900467146,2.501654873638024,1.900124576336114,2.351468713413066,0.08046644078595455,3.4936990419314773,3.116650697825861,0.36336506777560285,4.661573835701933,1.0011600337451787,0.6654899291868555,0.9624578638154357,3.4735541438225104,2.594071159205159,3.2988000585646504,0.6538634537863219,2.5534174561176814,3.4277750088370507,1.652367264314084,0.1654849806008185,1.790019057902582,0.0016205406260694222,3.940155550024077,2.7159540765876278,3.1261462048364983,4.265437541036431,0.27950828373283554,2.7793213844442475,0.2524498204816217,2.802047712210868,3.5133931379670824,1.767305814548018,2.571254208937628,1.3888889754751743,3.9535465943983295,1.899176520938517,1.2965111271847474,0.9994940839329203,3.7217795902209905,3.019280826403079,1.912601291834628,4.394889756451241,3.9158188047601383,0.4020758794990209,0.2203049457143702,0.8107267761172887,3.148779885225499,4.753076827338266,3.0613932222424642,3.5426096117954153,3.3540902528168104,3.166169127513432,4.728682053026599,3.9721546625945416,0.857325919177071,1.1846605024363877,3.625067904853271,2.765351115974987,1.2612597276615978,3.5081689540064973,3.390918501173461,0.36317677787733316,3.6266769966402546,2.5915305622966245,1.1774552718258058,4.6568112503857675,1.7240910850195634,3.8900725787602064,2.375440852619298,0.6925623561644001,1.8279055631012808,4.117090934615783,4.029485422533231,3.1369156792214814,1.8036690434052416,0.33328581141378266,4.811911801702562,2.6021881780446012,0.5347137635985144,2.286594348037526,0.023210007826814927,0.722744440234534,0.19050843870418777,1.5405833143089465,4.605858896083031,0.4546028421178572,4.4194778899592535,4.4723797225290305,0.3828044171895095,0.2448649714019535,1.7918251530025386,3.467486274446878,4.9578177049938175,2.45213438414149,4.049861856999179,0.33891105434587177,2.05300181534404,2.7835303945685466,1.887758339630905,2.0702387441623147,0.3190392349867399,0.06359827754433778,2.678056823461313,2.394381843250942,2.7192648790615523,3.5394301680939453,3.8195098226668645,1.2465922956267406,3.7679920072931283,0.7745615417650453,0.2896882409595969,2.1144148415068664,2.739580528291653,4.049319791352492,3.688427492941575,4.824185294475801,2.0688703162197166,0.9250938972122646,4.6619719093276455,1.9554519735293052,2.829970457857196,4.892799749503438,0.1143427599166491,4.440660976238241,4.8950324261872975,0.7467212506473553,3.82318120952407,3.807648006619062,3.0571308684407783,0.40167904217542794,2.5279308191105487,4.689456546877918,1.136304757258143,2.9475503709419404,0.12013341695311874,0.6064810085167927,4.43461135294565,2.190155210247735,0.6302515333184255,2.3845940351138006,4.342328592439424,3.062824187386414,3.1110685489214185,4.846367199255564,4.447534055175386,4.383633740725463,4.748362507179841,3.9034533493301526,1.986119375765385,1.5684536645158687,4.304081905234528,0.5308488930489919,2.9822441129607755,4.673918822624134,2.335796155663703,3.646971297326713,0.27951607273770107,2.914108209710985,4.636785462207316,3.980401302168186,1.880714275748746,2.2787523254854722,1.7320932630397745,1.4531947199928463,3.7114597578193855,3.6373870321879167,4.507979425256422,1.377675399436733,2.0083428502422382,1.6963930152187168,3.1260204910500566,0.7780275835451678,2.716440873317932,4.767913993738114,4.577675183678723,3.762130190713896,3.593656543254361,2.6779965443307576,2.290481172838603,3.4370792175599307,3.041651378773306,0.7112939068137791,0.05329229076463271,3.82147378474627,2.834987473844496,0.8899703328265041,3.1610134580946045,4.0508698559915315,1.8175097758917846,4.029435562781498,0.03878181518689128,1.1363783601256638,0.8880495286221612,3.13703890927145,2.754593746738929,0.8179464448435392,0.6621669663941787,2.5876449970330997,0.08284200519349527,2.8989316687463296,2.0160926396747456,3.4615397554295892,1.1245303981345822,3.616459541793071,4.470197452800982,2.7938417324064924,2.1983393213347657,3.6163520997478917,4.510232250993389,3.236463115103727,2.2526773386894314,0.5089398928643996,2.831173121724777,1.406012449272226,3.7794824503783686,0.7105355616609044,1.7938559979167756,0.6039745990431322,0.49593630331172256,2.083744578470893,3.605371498443427,0.2755035210011869,4.215288949726709,3.0910522252226267,1.9707869018242685,0.5904766246264637,3.8511230988375478,4.755199296116705,1.928186103666123,0.39104888395654513,4.179101173120289,2.498674033461221,3.2601927274572287,1.0197795763906314,0.4263706545057866,4.377127523454693,4.898154046435106,3.630383102224105,3.894944996569012,3.855783953072077,0.4393092158954326,2.1490267054465937,0.9652554156385396,3.1540546246608745,3.604638747964557,1.1329568986752914,2.2101983126587763,4.9414641962562476,2.1600252581213706,1.5580518686945044,1.56269272282075,4.004148620737247,4.25974281547425,0.8475087802071501,0.15924044456028463,2.322435518255962,3.2993176928543466,2.147397983799184,2.20209434219768,1.6498780508514532,4.454473724478251,1.8248736951294409,4.833726310357703,2.1935766529197744,2.4824903488384322,3.718782420118807,4.044854992198353,0.17556201922264147,1.6524091718098732,1.7316485303551754,0.43876937664172444,2.579851142779993,3.97888337389525,3.5772651211711617,4.8234563426683845,0.09523178126457643,2.657044206285486,0.45199525881501446,4.470505743609669,3.2901508679191735,4.308996552761655,1.2038603734300324,3.053462476002282,1.278745103221437,1.5819853580326348,3.871278262236175,2.3784221183469825,4.721323386380673,0.7966342620804234,4.8780558444276165,0.6335227564518375,1.1489438361933146,2.954255113645491,3.6858372603955636,2.3415859970171304,0.592688134795013,0.5247630157175387,0.8891845971125267,1.1145038204350732,4.531353654431587,2.940391851680225,1.4287462205701063,0.09499809836856832,3.2032179011243214,2.690713404648707,0.14874879015887243,3.2278853853689613,2.3933204480869428,4.517333884748869,0.8508745770665882,3.447858094480801,4.519636754272971,0.4759699909309145,3.8429372200571086,3.9090951458782106,0.6852142396629723,3.108710574050302,4.2473555683550135,4.436715842335788,0.8583907373285105,3.498338477679823,3.614779258520543,2.028136423665461,1.1817688681439265,2.496676821376048,1.050219389849183,2.751939674919379,3.7283084125136448,0.6585238708191599,0.18997608897817098,4.458000714525156,1.5128019627408928,3.166844538587924,0.21358655279990812,2.005216107247282,4.44102517544934,1.1703938269645842,3.4106985175710824,4.917290589984658,2.7376714363502153,0.9749814613776875,3.4928553623276937,3.544541300910118,2.678164396751619,1.839825190789911,4.8336718208385445,4.859787905202715,3.483450822492482,0.14340984596449058,3.2952764661946734,2.766158043148199,3.9934748130421314,2.926532522846058,3.3853753201337233,0.7206115822358139,4.344991678347643,1.308857044816395,2.3188405090804762,2.996965714132224,4.610402626578711,0.14458975604128121,3.514729079205191,4.598363882882212,4.466919994981416,4.461962363248503,3.477635105663582,0.1409791518536574,2.326494728657289,2.794101178396028,0.46137861811746617,0.9991014331776238,3.435753084639873,3.7225668103512777,1.0524802419954682,4.990855318744108,4.472945877602052,1.9788957413933217,3.8658828260736366,0.629854486287037,1.6464708296725827,1.544937928972231,4.7650424538905565,2.827310908320216,1.6832809971496387,4.334001844727061,1.1036328781378146,0.9264418595962387,3.3093275537893785,1.8163144190769853,2.2198667835685484,1.6387681008550958,4.624618424046067,3.8565293893245736,0.7633024034644487,0.5481065642726168,3.987366005312855,2.805721156160097,2.475095054100034,1.7014236413260975,0.7670821242989367,0.2285689071874164,0.786511661625563,2.815668098856733,4.1228197047440425,3.352298922616356,2.9240559507734485,4.117688266255173,2.32594597992573,0.11901797910593759,4.9154015452314495,2.354528521970165,2.9017018222335578,4.17720924195721,4.241478185533172,4.181005546940421,4.985275550510401,1.6202064392168658,1.6881874285407472,0.9307998582259902,2.4913485684680636,2.8281864293236625,4.092612803169377,4.42946063801722,2.2906317865767187,3.2305161636617985,3.289849841994077,3.837910205730286,2.442317109016201,1.3348356347140833,3.6703789595354,0.8637277369292973,2.432590548275646,3.949384029498557,3.9872730099968177,0.1769486962580391,3.6200226015746417,1.8095059462911234,3.0848506893504313,1.9773573655233267,2.8460327396516916,2.7896725134269253,3.7905104083956074,4.6483404653732,2.940262091707778,1.7351896065611894,3.7189828191259866,1.1324437707492163,1.225707003038018,3.7880797875046834,2.719265505494175,4.382022338247436,0.3783927886003502,3.6076683504470397,1.477497311116539,4.699017499383547,3.024674079032158,2.714039133485431,1.393658856995782,1.4878375800363475,2.5104996511688107,1.5639599773006718,3.711882203800132,4.922886444948941,0.2371455362023156,3.831050969230322,2.33344407674052,4.933032638830376,3.025339013912408,4.303578583419946,1.8801203547866407,1.402501515845257,2.4426032605447867,3.780924194850621,0.37424358498461263,2.559080612151229,3.6257884391935837,0.8613589046182946,4.796184597484936,0.5953564925879828,0.8483733962102835,0.13785638958195623,4.890320860497798,1.455471890315615,0.0538598198770468,2.464794416862609,1.2922283131816725,0.8508666500575868,1.8367617190955554,3.904048251012121,0.1842734002218671,1.0072336943920324,4.671398207700587,4.106603944983024,1.13110714178836,4.358202664089079,2.14267890680036,4.993371432428926,4.7008595834551805,0.8171544331139302,3.31099679084937,3.7455768558591385,1.76026606234432,1.781436052908767,2.111165812904958,3.061068737071034,1.8898068575293758,3.741836105263725,0.701053531903032,1.5135044993797597,2.9789524218394217,1.3135970934621677,3.1438966220914355,3.8655845433753475,4.9938383966598865,4.7710494356610464,4.820696532535606,0.3573258239914734,2.215153699848825,4.183486506637425,1.9161527358158492,2.8581615231799775,0.8054318102597535,3.647981078022735,0.9551524809045275,2.679183891150113,3.3082889648472147,1.8829491395295528,1.1673917985770854,3.02707496288206,2.2283409983299496,3.5907045990790873,1.7910655285594246,0.40347351775687046,2.4763862070306617,1.190930269478242,4.801857030731851,2.716030237934869,0.5749356686052509,3.558571887864219,2.0008854624273487,4.258892225092764,2.985915818509808,3.867532398198902,4.2941762895778135,0.762028012974274,2.660959889566076,0.4838561564316346,1.882661880785541,0.6648948645574682,1.0431849517951397,3.5486990919209838,1.5872290843314163,1.48622829166983,4.625701822172559,4.5164540360322185,4.851051639189182,2.8758870336133135,2.4128789317669854,3.69508453520508,3.674097866474415,0.9824865763224011,4.966851871195118,1.6076091638749057,2.2050882308531916,3.0895415041560534,4.067420717996741,1.3068404277557855,1.486868970184968,3.4078007211357573,3.5166598706207832,4.767495347643348,0.44201327345908314,2.8446764750498965,3.5001903130635617,1.9858904109841302,4.9404736422883,4.493348388604533,2.698463828923048,0.8374365367129899,1.3149078371487144,0.6861024436476504,4.263025548508393,2.25320881778266,3.1042681934187577,4.04442246768167,4.918981960095831,2.289763437571517,2.4393630973037195,0.5614099643388826,1.9577523404093988,2.4647635667230414,2.434568418395755,1.4314366891714059,4.726980087294944,2.849314105118376,2.212078993256924,2.830571789600247,1.280180676108903,3.5645376171799734,0.2906833061891656,2.227757160482058,4.952039440668946,0.9637068536793314,1.071348917769095,0.8273116780339806,1.6729890785032053,4.468258475116844,0.4688210525577896,3.3063518145240414,0.14429741962857734,1.0789945348092267,1.6249257992591026,0.6791040312364915,4.782242190385916,0.5615891821892782,4.078881873186788,1.9409307985862145,2.4188450691635555,1.4549490082308192,3.0774493507112357,2.141759343249099,3.0494543199777713,0.13005102431332793,4.158664085433314,1.580061928886175,2.306847072874013,2.9832925207931016,2.439454638458116,4.6419054506261315,4.0987739020994916,3.455084279325341,1.5546302391220046,1.1193741096633258,4.239605079380704,0.8971512492465861,2.372537577318361,2.786511236212368,2.1508420798005945,2.505165537034012,0.28251905434406255,2.0179616223420718,1.6535879876965331,3.6912561285227232,3.2678907095345187,3.050693951525317,2.91799449862145,4.65132224051426,3.9574264828848604,0.2272093124660124,0.13593659882842335,4.170104835117144,0.9186013888403755,1.0597091322868002,0.7252837410526813,2.6085554945117604,3.7439244350246295,1.0283693216805034,3.5150083117975663,0.9026963195956617,4.23368562293374,3.407283783187384,0.8735063627525275,4.357536194783425,3.652521557540923,2.6456795787365808,2.9280926491756665,2.558521552644529,4.87857158743152,3.4988684605779286,2.2127333553891027,0.036513976434061624,4.703135474036875,4.848045508377089,4.197074894816294,1.4914583777745227,2.4512937245743736,0.37503738385176066,4.488506981138389,1.9380805727036687,2.2140185876088534,0.41404546532131437,0.24989331815252647,0.5771880905383464,2.2282034868415277,4.963279871599764,3.435693811258619,2.5793951291080672,0.6429361675067136,1.2360976510770694,4.912617328648324,1.5959366065670788,2.73564587094468,4.310408837736964,4.750262791130155,4.623315939813288,3.2475380757175056,1.495535530846499,3.3183162612533734,3.7926166486705917,3.8047776732327208,4.019551798288275,0.513085110166901,0.5846830438800543,3.2156345386162766,3.2814955533309265,1.447889702947186,3.1476525789076613,4.203613909497946,1.8766553554481902,0.7768322069717215,4.569560125386852,3.3302472693064034,3.261815130859398,0.9871369869420343,1.4831044027723006,1.3917762028767056,1.5812774278746788,1.8025680906990627,0.009929823650438596,3.4273964906078547,0.9312674887702832,0.636514643403534,4.147265878040006,0.7001142937963123,2.5512952372161433,3.473792358031531,2.317798572112401,0.44801419376145013,3.3556794977261726,4.7980414580456285,0.736315369055327,2.6308629103052352,2.7008334103715637,1.7764669769091368,1.8192699574503135,4.229212637821178,0.43286824902347143,1.9164295312415125,3.9248535766321835,1.1977448440810579,0.4675417370917312,3.8484536858620766,3.3977641800481595,4.906937345833371,3.2593877837126484,1.9949627105233858,1.9539041010553537,3.175811839509147,1.467422533267193,0.373541937705123,0.7522248436466183,2.3916326159477053,1.8775663694695377,4.927531552653804,0.16677937253130493,4.166869458997727,2.1938621160578817,3.247736771665407,4.069391521892736,4.493501764237934,4.819935049327971,0.990428480774822,2.2413594310673823,4.238352998208601,2.3908364951897787,0.31477611171176867,4.01813307708231,3.363914962686143,0.9345342616680541,1.0803353479831324,1.6205507399281993,1.1481462438582202,3.9412506318898135,2.916516091338602,3.499983910663417,4.906948740333428,4.394973995831331,3.204540198381033,3.045987058197106,3.5724785446257634,0.10468620015143704,3.5673982830798545,0.15910332976440844,4.960402518157556,3.239880870487876,0.8201385307044506,4.147274918773098,2.0013205568556467,3.7171900314346917,4.9753155753603115,3.0410600338324234,3.2193527611206485,3.801570005749709,2.639223582592792,3.1617063869824467,4.998603064533841,1.168172757444249,2.6407580430163033,3.181112244913985,1.6823090556168896,2.3435791354282722,4.946433766231802,2.8681961369514486,1.952260427764102,0.29079372604348674,0.22975424652152632,3.3280874700674126,3.9032747986167706,1.6704442253914087,2.0976182049639958,2.4812879228152642,3.7509641308466812,1.9409525716591158,1.5505314162379102,0.46764925068940033,4.243077928990207,0.18005818238460813,0.11466740454492252,0.7633475788644217,4.424453321390386,2.5081564805258107,4.428550801548598,2.149558955550855,1.4885800833251006,1.4156713164850143,2.3798555683382885,2.6928746872070985,2.646854340573308,4.283710129969986,3.1121172232564334,3.5475242757006753,3.77328947354719,2.384285187824249,1.138992177234921,2.50224208056526,4.961305399351029,4.825037119836634,1.67096050580399,0.15060087751776918,0.4258529092187624,2.503820986186309,4.664425824765761,0.3929600718691828,2.82399053803284,2.940568380845133,2.789240918542758,2.28528192660285,2.8070433282159337,4.798731531775047,0.2214986307081146,0.2772860044056702,3.5206107691455535,3.884635681419039,1.7191594184717984,3.2450044731252303,0.9400828665979655,1.0858641387315215,2.184494348262014,4.151279650731858,2.033183967901122,2.219566719817495,3.3345341593510867,3.1095147684945825,2.149931355121657,1.9632890200592412,0.09593793051183241,2.9192816034084434,0.7633894353016402,1.7516832315925246,2.957964785026548,4.741508932287665,1.8717452419126435,1.3666570867812178,4.889933149945996,4.555732553744171,0.46171919346151613,1.752726076172585,2.87125541426395,2.8157706771501334,3.2259029206395393,1.3463002879042352,3.5172416168943377,0.9077395126073518,3.5449728361721933,2.2395316026392154,0.5530765181611952,4.989920794570234,3.2807017793924365,4.84873760541701,4.241207392404048,4.559010981619146,2.1114250129810266,4.464132794343439,1.1065822369435974,0.2977218913146973,1.329582561356758,0.8539620956877081,4.5933044794621525,1.8417692756488935,2.1077987030048417,3.4671501894515266,1.2242586981971304,0.6512789495162563,4.6850102470353585,0.49722603980205116,0.739582186620602,2.535388019659636,1.8279279510771407,0.11192414787714822,0.7132952658972203,1.3720705464390148,4.007929137647417,2.644491812124954,0.40696959389823095,0.4454175695171747,1.88750958614607,3.7708788938999516,1.273282524488537,4.34152503222773,1.9461934986083829,0.1775515662574778,1.1592485596497593,1.251291624765849,0.19755639723419982,2.7918680736936685,1.7258992686682273,0.2472712867560667,4.005887905287605,4.156155507578659,2.9088680858534133,0.9729724776653281,1.9006776873782039,0.0810615897627398,0.3772090919648541,1.2801589555714477,4.475889365774152,4.203785698898872,1.4348457395238767,4.001682764654225,0.41507812543016276,0.5817290330803015,4.916658281426974,4.544356191949827,3.393333970399479,0.9276068755357303,1.2850004897237333],"beta":[12.947772471470964,15.645810981878938,11.334940719636283,17.045712089758922,19.632254030231536,17.649478305050778,11.183004881552387,18.98932720306778,19.511336864627395,10.752546165509258,13.966935443575714,18.719506867197108,12.695469401599894,10.424078992932797,10.664394616508552,18.935707926623422,15.122288975648193,13.72132686976175,16.27807352356939,14.55089571369325,18.00034881125366,18.330034077096478,15.501203929119695,19.132724841996538,14.679712971014771,12.826474890466905,10.789901426199426,10.271776225320115,14.994928195786665,13.262703619333475,17.433094990438462,14.046075628587412,11.336844094353978,12.833066255719297,17.56622851197548,19.72053458237089,15.726184206693798,15.466015983563624,10.71782193669383,14.2616669510323,12.48251846622917,19.219463217831613,16.016663401377595,14.86087913408943,14.842653532435206,16.92005071234939,15.314287056958172,13.923488864717479,18.787365209283834,10.177523287894406,16.027069579437377,18.874369140164298,12.876562606437524,18.324147711469717,10.883463461340977,17.078625008363918,15.726565808915074,16.94255921098425,17.594135092721572,14.495734638911088,19.41679390584175,10.080388609646437,17.599370940370676,12.079346122926866,19.664702452177018,19.819496379598917,14.353737748746866,11.817833042857968,11.764688166193052,16.116067378417032,14.211924683772047,11.392211298620904,10.878257090606315,14.421915334934335,10.63800514911259,13.802425211364053,15.165863017989343,19.319565833599604,10.225034862049739,14.539870575547178,10.750586233051978,10.285503665886196,13.54793506810725,13.855692069300492,12.972650055141443,18.002720865822184,10.554823014965839,14.664204446152864,14.726246457928303,12.742955606504403,11.012284135112669,19.407869163052972,17.99281076676216,15.847026822481943,15.407665419230733,14.757989515254689,11.424469054966064,17.300327623918584,11.28266910598927,15.992198305058986,18.289769710020106,18.444380187845447,10.708507974206347,12.67359611184057,10.864671868773438,15.483172446109688,13.070333645169649,14.102745922647566,18.706644577566628,18.86732641012518,19.18828555482856,13.691205312584556,19.072546290493182,18.804033960776568,19.345495513408064,15.581578517552206,10.112629026309754,12.506828585844678,15.498263376760358,12.959923747301893,17.85458071265306,10.463222494109992,15.671785841469731,11.856123698173942,10.804532616724646,13.985254749431995,10.180824289114716,12.518806495969748,14.502748836484303,14.689034154627512,19.58550257685315,10.119466459340579,11.397840412323287,14.46443092735194,11.96390840261225,18.008093376206215,16.737879972993255,11.179506610744879,17.280676512728718,16.65067454719148,13.462330342399598,15.790723911632764,19.59030854739935,14.731449386719618,15.886527845892651,10.95617719888373,16.773496057651037,11.330108376499766,14.384698069740038,12.103806569838012,10.37831979611408,13.13734468328076,19.719866794625904,18.227833054707112,12.287820720784744,18.69783953207116,11.70998568841119,11.663945516445189,13.567489628304807,15.107720383796394,13.230209306198065,14.764450446259898,17.155709141646845,16.577093608230395,12.75288393728995,19.848224518078815,11.521500361318749,17.139819116740327,16.428143591851263,16.623551367684712,15.200668370671508,17.96375846131219,10.602245249769094,15.775384633974065,15.290778584355888,13.51873401048863,13.23429853067677,12.154987631047193,18.51618743647326,16.329230401975977,14.551213777372187,11.622489535799511,19.28759418790578,15.579238485154008,13.27235504029548,12.588913250155597,11.828798671622227,12.76562342578973,11.24372532582738,10.541285031196912,19.78687227222927,12.243251834015103,18.775685464239054,14.052057425881463,17.104407874062666,11.108050580717606,11.838957038848072,12.580124862097088,11.051106631581211,18.2124539362417,17.371561822917357,14.018728673492337,14.982767291181624,19.925308747360106,18.21023731509918,11.742032045851793,10.47411928548685,13.170475152912026,10.087448250544535,14.24040186552677,10.816167130807413,13.789552791197327,10.65400725364514,18.427053932090182,17.410978654760143,17.76604958546603,12.771816861606883,17.7736821219476,19.79540143175231,15.699210206509457,14.106754363207925,16.54040889797259,10.778752251284661,15.855102166571744,15.542021547527408,10.709503766344985,12.241155725617197,14.99504392434705,10.577288508895355,15.661713493040658,13.543056305636993,19.794699810713205,18.564140798575412,18.50648542867894,14.343170687788882,15.75300204560758,17.6963440522555,18.8328280924868,13.49358872226424,16.023723258334755,16.376417737187943,14.024146087086859,14.008893998852903,18.757397249390408,17.3845323236149,11.728063900784342,17.734619045255215,15.977233293182369,15.790703415461397,14.254964082549254,18.50895205798495,15.007463350145473,10.125299479795808,19.412156841043824,16.223710535305308,14.610630854167878,16.03949357825176,14.636003296002256,12.643068415819364,16.317735231466184,19.688156556682017,11.938022454830207,15.457549838916497,12.180422283459295,17.327918905158985,13.657799608018564,10.94482328496946,17.941717388745715,11.646317154388854,14.792150740678466,16.80511814911043,19.518428083016094,11.595792939739738,12.14943870789261,11.704140109241383,11.494683443026322,19.97527240374641,12.030157381839446,12.127076389392661,18.950021118653662,15.532617035432013,18.69003140927763,10.538855879113262,12.200053267911791,13.262430786674564,15.116494830927108,13.800158772513667,11.077317758227611,10.261398448586851,16.5934206884412,10.60995564197015,11.489621318348117,19.491717804196913,17.534749341030434,12.116136434760943,12.31364969517138,14.876297871517286,19.28061001341596,13.91042966229434,15.300963606304528,15.018225528128921,16.350809697545774,11.961341929863277,11.344891404763073,13.486540441001944,19.217474195526577,12.854573341126677,17.782774281593557,15.802755785053389,16.72731351953784,10.631022661492635,12.630686858083118,16.542075431962953,17.86086630712461,12.51510743370172,18.963176352990303,14.123449145228344,17.322120562080492,12.064750000496005,13.229158706249768,12.814576167338625,19.287553939572206,13.357750316970288,16.08319358660239,14.01002247704584,14.803828348944123,14.812640787151903,15.643608897862546,14.95673580221791,17.832906366178474,12.987802619513003,18.328650892503546,18.46835870600144,12.79666077282624,11.238425554701212,16.50044204687655,13.458006933004526,13.944689090174485,18.422916500061987,13.772472052431134,18.327569987684242,17.838362477371042,14.94232257860354,18.998908873060657,15.760839517195336,13.31302876415759,16.850397991011974,13.25290703969009,17.059699549743804,12.796036318956126,17.215409991524815,11.750127070647437,10.231205591088147,12.167246276435604,13.780970154155916,15.630135580060802,16.234187991317945,12.634676904243227,13.6236378263374,17.02002699903064,12.329871945647513,10.158080552529702,13.826014443109514,15.73978760493047,10.634095438693489,15.24406436104935,14.204130766651577,11.83709354501583,14.01534374655659,17.744673634950736,18.462532740236934,19.482559665857806,13.195824340830466,14.124512289672584,16.98804942950244,13.93889721131577,15.0992944431101,16.642592025044294,14.509931229439566,15.349874513031445,14.738778657068208,14.47362478483467,16.600927671482083,11.268668367239323,15.493818947786428,13.606206289209801,18.288843265672362,11.483682971525225,19.483239780074726,13.79430833683008,15.948434618047989,13.074691581154198,19.23769802423139,18.242464598734244,19.15122342336924,18.055851187624206,17.10984838966659,11.975668124620764,18.545802305585667,13.326375258954364,12.285746494390155,19.30895178401178,19.343314665436246,12.075526029252458,18.29283092693309,19.428067130004962,18.81267946877258,10.046223374105525,16.56717647105607,17.866335203551778,18.531372276322646,14.93343306278846,14.28433677386697,11.851459039559105,15.127759046354715,14.310498807558274,15.518781268840456,12.01741772896435,19.21654720792695,10.490780729449655,15.061318826348607,11.341147437222283,19.596646586408347,17.994430923019326,16.968843955440672,18.1515100782141,19.81796719880497,10.26434290624598,16.63652466901548,16.142281474807007,12.854959205020188,13.012389109385596,16.980088990361278,18.0085912697212,17.101818727562488,16.992943329330757,19.920664876915215,11.828000320565945,12.313022105030011,12.002031441656412,12.341171942093617,16.313482615937644,13.964466103285424,13.358041809314292,12.787662871444837,19.89030355673071,12.057416204341385,19.439665125291782,10.454838818436565,18.03539131954249,11.753012736384248,12.759303361143461,16.969254300156187,17.984734812282543,10.328192917971625,10.474413984247759,11.261376220932453,10.843225399012162,16.867975250497423,18.270163112905344,19.38914587749607,16.85575538735555,17.391189132342895,17.030892037003163,15.87663400741842,16.25420845685625,12.399301485666056,14.065835017892326,11.453567071142245,12.039196571561657,10.774782503074023,10.025532885689994,16.047844047707233,13.51913065079182,17.86461118555476,16.189078672250574,12.510123137456336,16.324649710537173,19.032476401860634,14.448674042525507,10.957178045870037,18.504335538761573,10.022689631489651,16.004955429355373,19.261574809048223,13.52629827796412,19.306246986724933,13.964682455611431,12.889418636860803,13.88592027193006,14.877265957694082,14.105932053466068,19.96159814832604,16.249043866562047,19.617754616363612,19.63258395700615,16.52834753073222,17.89836492276367,12.400966758336853,18.859612682096525,12.408675810714442,10.033577171971919,12.335239498633044,19.083499516657636,11.985878254218774,18.106014191203073,12.873553461835352,15.081723394013697,14.46649062486813,17.954206017292982,10.862809143729482,13.531219102926118,18.699110460479602,17.36494507354068,17.277259428574,18.99922668107451,12.718707001383988,15.631098849050879,17.59439771068315,11.483945112474563,13.478294415292954,19.291166541034166,13.577902372435348,19.32391017262036,10.5762548048933,13.574170962191584,15.71610736948861,12.63825227123698,11.251135723517582,11.691920743261882,17.370456470379757,19.822103072896617,19.76242961853321,17.466161968693655,14.599614064610712,17.55516348716455,16.06244433407705,17.638584931659338,18.40280916779375,11.238725073663087,10.42427283525263,14.70852276439905,19.53015810616819,10.656319412835998,10.284115377540054,14.327615394070158,17.633649124676342,12.270524083410471,18.375579128429692,18.599417416465194,11.733450080841374,18.671030922562792,11.253666948480141,11.02162686560272,12.274627990271501,16.751575108900106,18.379562029152094,14.653441583796189,19.51115946670712,15.527272555730153,15.106361729874145,16.059022816797917,12.429992255001334,10.771039294929444,16.053049704281463,12.558993955842805,18.171952894167603,13.497317855783145,19.01100373642982,19.536665863494143,13.055120501021074,12.681141589932851,17.36118155917748,11.82223039218259,18.65309876144338,12.77068086843135,18.471578068655244,12.607759869244568,13.346860303956745,12.57333620025868,15.90218736960161,18.200704580861775,16.885003268797014,15.26666779866385,10.946564033641053,11.464935884770611,10.227317205222947,19.367605852568747,19.12895367510969,12.727180054008993,10.262280384871945,17.574112346248405,19.341728978038766,15.100912544873824,11.7468366035218,10.416923224243721,15.081265910188241,11.982609068155233,16.88820040895958,10.630433923052045,12.481050166396773,12.186186873062589,13.840342597810215,15.902062919072408,14.368005141913752,17.36200170957497,13.18435085204725,18.08667119806691,13.151022024744005,19.839982666252823,14.155263610733538,15.922424499356202,11.783575000440123,15.824483787861091,15.180880843122736,11.19976874172208,16.291684995000743,15.245872636451764,11.490237463329759,12.225669012911371,13.199322072890975,19.52281040342637,13.865473386833349,16.055208505768242,17.85542004682604,11.169986559801195,14.870991790630772,12.551835267275198,15.108817486841485,17.028636780429938,15.14472611741645,10.553790427958475,13.764185758936605,16.819667881064984,11.24141030600728,19.333144960046056,11.293706664607306,17.128473441661303,14.09349133379898,10.289482910137941,13.19507487761623,13.339196444725449,16.059428131421075,14.388613839505526,12.808515202559253,15.203295782919708,12.214566462586454,16.732806422009098,19.836186566313664,12.758077748923863,13.463857195392555,12.929949238774086,16.57251108562717,16.098094692508738,15.560427670988254,14.088970392888642,14.289220054042886,19.038978598659813,12.921091865306844,10.67901047670275,12.669950902532356,14.485698596422253,16.39498828979133,18.50187009624092,12.081855401747939,10.426006366764664,19.188978446592166,10.367756584653545,15.150304653323552,12.223290872388064,11.304793918565569,19.540979551933475,17.407193093512138,12.664559476728032,12.190537478346881,13.137965589619258,13.88662297875297,13.986246681100942,19.778386144721708,13.239337236724557,11.561108294929713,12.80254208998382,19.346242696434942,11.974441719702272,11.726493676877457,14.47813838399954,17.352121890442447,12.814470384939323,13.553526833787421,10.517499659051495,19.45426437349981,16.409817295099103,18.09999206133483,10.915838449663086,11.938573295168558,18.13726459356662,13.770560700854894,16.519402476322888,17.240503372348627,15.234542508774693,10.226255316966455,13.163235546624545,19.760249748357985,17.804324310646855,19.105108155097103,14.327352850022821,13.92479080542713,19.637128403872953,19.207397514342368,13.91709637563594,16.881510146752305,11.104334591915883,18.339581690948215,11.642515287570872,16.670511929038376,17.7738722103187,17.703689188694263,11.880901349987942,18.060439618862414,17.980626539813372,17.08273923509798,18.075298136602527,13.806422979272226,14.725328267693708,16.315478470604035,13.799321857052472,13.618887566862611,15.20064291485798,17.68957176548359,17.433689496483655,17.578471695936713,12.08176666231667,14.734622824229497,10.31278360939062,12.923298902237086,17.09801726598714,11.130912659130532,16.31567132063186,19.525593648584913,15.833748147002805,19.06464917355555,11.62446328235193,11.877094572978336,13.912152239624858,10.118842648349748,19.937748713555774,14.187528637070105,17.978160655744258,17.501055549197968,16.818716870227256,18.13288474425022,12.696209165916581,14.645244386182972,16.69366406260378,16.228958910812324,14.643757070941936,10.578297624186284,16.873404054813996,19.993590004579723,12.149229832816763,17.307614485974344,16.37960717023212,19.422812433134165,19.4923837179237,10.75671521456772,13.050080431918145,17.86990435516976,17.41338994420321,12.331309525431102,14.766311731761139,14.998681086758982,12.611621762350136,10.870441482695277,17.87614024065885,11.444377119808419,12.29400348018004,12.56336612899762,19.68270474607994,16.211448585248135,16.373389622424494,16.870009823791314,16.651397425252405,17.176699144175593,16.195566451839106,15.87643697681115,18.014935908918957,11.129544784222222,10.416148290079708,14.381893601772918,14.36891967458668,19.442064382392715,10.235536900626288,13.970539177388108,19.669269604134406,17.390244737313793,10.370948637271235,19.42479739120485,10.124170281420632,14.972870080553944,13.900023789916693,10.79353343110694,19.013117176619154,10.794996462871062,18.777835709005736,14.487354005604953,15.705804094668656,17.569322304718078,12.789451006931127,16.012929198728767,18.51285971903464,14.013903672951319,15.35733471056262,19.54065296971185,11.99096553186452,13.27433442444322,16.350551065177505,17.549550512042735,18.185419200830033,17.564866897788516,11.880764714856305,11.355717061082844,15.683616140441554,13.058476256187179,11.659142795935038,16.947502517949076,19.60285419751495,13.160472245537527,10.92642379033266,15.775527557316929,19.789430694047823,11.547701767487567,13.262665964973696,16.990614658078815,11.551708511973102,16.727511538150495,11.86891284923998,13.840496671319055,15.355225643586621,17.375986028126235,16.396632468089027,10.43132991383172,15.738507898995007,11.25728858808004,18.39504178864881,14.317324543071038,13.077230239007736,19.039776611869335,13.611388455496572,15.998658183235541,19.645148505001476,16.808570602099426,16.72904847047419,18.491228187783598,12.49616819179191,19.891220997533647,16.100441084839012,16.452945286094742,16.477045768418716,12.743324240290562,18.231183441937766,15.631682714799817,11.902550639607906,15.0590684399874,10.553117197006646,17.101205758049932,12.694199256591341,16.471199538385534,18.319425063266195,11.842047086244154,16.153455410808593,10.153442678261158,13.125226053383646,17.946509475754702,11.642548134353687,12.931090932735966,16.763245946017072,14.722553715704583,13.926853632131353,15.332030393307166,15.039919814772965,10.97751042067529,12.787689568940603,14.243233414434632,17.974332324027458,14.59836273343161,19.820229588473712,10.113474740639766,17.77798803318494,15.466029636609838,13.5269688072725,13.217168017694247,18.59006532524615,14.310539228119543,12.324632582395562,19.49553767478532,19.81482012325025,10.065795953797442,17.883460112926027,19.42661799839826,17.812235091670455,18.880695674761704,14.230869141254077,17.46359406555392,10.961458113023607,16.160840848561143,15.551487137231835,17.108190700720883,13.276494907640217,13.802290707327838,12.1728792512273,17.292569804749334,18.97907886605416,19.56756277631454,11.720776685822845,17.12120884293651,12.541087632433092,10.368683048573978,18.6499384317411,13.924412248862907,11.117926901412948,10.58574956729441,13.093687111954006,15.476416524486844,15.421253406145365,15.428844504845053,17.1646740649848,10.482548426310139,12.728201697567133,17.09070444671114,19.03263573634718,17.947813801948882,18.40272056690838,19.852135802426655,11.812242051803556,18.20213809628317,15.22436155916897,15.03260349189561,11.00594541906599,18.341047309364427,12.548886137304208,18.218102955970913,14.429474441646018,18.349826646247347,18.31611692190461,19.0119940526006,12.002787392910246,14.656435051001196,16.026166906676554,14.585854528939544,15.581228500580186,19.946328200614325,11.742320968752244,10.769464884112567,12.074710370458277,17.630877640920467,16.381393523815596,11.171426670708568,17.78996230012128,17.48899757015848,18.36338274654063,10.083668849445736,10.20199856934255,19.07248374007646,13.892296911842507,17.89285235352527,11.215155965791103,17.667710079829916,10.441583739150989,12.412723145933944,19.52848213624447,18.53500985019375,18.63789692309273,10.20415750576004,15.173617645304791,15.50737655160377,18.730046197237467,12.14915342104498,11.542560139492048,11.167655266984776,10.423843642654793,19.774128463536883,11.335823978614375,12.921438735195864,12.738551102677276,19.261509986631058,17.167241652536426,13.421702527238564,18.365319457482876,18.45734820673357,18.467260048396383,14.131175980103809,16.32509472093348,14.236870201836815,19.104719987715512,13.13225324195706,17.93170473728081,10.702750055037802,19.99432644118245,15.30339408192364,15.469766263710216]}
},{}],69:[function(require,module,exports){
module.exports={"expected":[0.4687687438432495,0.9999999999999999,0.9999763904646761,1.0,0.9999998483798852,0.99999995521467,0.9999999933675336,0.9996319629556201,0.999999999999878,1.0,1.0,0.9999999930385625,1.0,0.9999999999714099,0.9999999999999989,0.9999999993251455,0.9999999999999999,0.9999999987428031,0.9358524161082337,0.9997571150067296,0.9999999928469734,0.08696622814502628,0.9999996084651042,0.9999999999999999,0.9999999994718579,0.9999320631990419,0.9999999999999932,0.9999999998658593,0.9999999999999907,1.0,0.7166004278459968,0.9999998595521773,0.9999999999999942,1.0,0.9999999999894446,0.9999999999999999,0.002964157784397906,0.9999999954278745,0.9999999999999853,0.9952521973624607,0.9999999999999791,0.9999996370874448,0.999993605799857,0.9999999998998166,1.0,1.0,0.7230937693708632,0.9999998601702145,0.999999346399761,0.9999999995367664,0.9999999995016401,0.9999984969090293,0.9999921552314688,0.8627161112991601,0.9094922779756315,0.999999999995003,1.0,0.9999997827811529,0.9999987348009398,0.9999999999999998,0.9999960280559496,0.9999987568127018,1.0,1.0,0.999999080384099,0.9999999970148751,0.9999999999999999,1.0,3.2643651396832457e-10,1.0,0.9999999999999998,1.0,0.9999999999999828,0.9977813410811068,1.0,0.999999682288504,0.9999999999987701,0.9999999999999829,0.9999980818373945,1.0,1.0,0.9999999999880907,0.9999999999945829,0.8319849023724566,0.7387661368610394,0.9999999999773475,0.9999999999999999,0.9934039452244955,0.9999828821268789,0.9999999934555189,0.9999963611034498,0.9999999948817229,0.9999999999999998,0.9999936667368865,1.0,0.9999999971373198,0.9999999998288952,0.9999999846241303,1.0,0.9998382708758693,0.47646921410762505,0.9999986552518937,0.9997129145868494,1.0,0.9999954288484965,1.0,0.9997333302567134,0.9999999968996873,0.9999999999925323,1.0,0.9999999999999949,0.9998654951921139,1.0,0.9999999999999993,0.999999999545351,0.9999999999995345,0.9999999999999836,0.9999999942889148,1.0,0.10329176528508498,0.9999767355450703,1.0,0.9999999473267949,1.0,0.9777111064892927,0.9999953607813948,0.9999999999892345,0.9999990470158377,0.999999999282514,0.9999970603444527,0.9999956969192081,0.9999999999999998,0.5667693759028524,0.9999997665619853,0.9367868239518191,1.1475130264509562e-5,0.9999999403958357,0.4936409794574825,0.9999999950088659,0.9999999975955337,1.0,0.999999999999364,0.8647552867597896,0.9999999851452412,0.9999751673216173,0.999999999996174,0.99999999997782,0.9999989477525945,0.9999999996918676,0.9999999988963268,0.9999850840775304,0.9999999999997168,0.9999999738257811,0.9999999999996904,0.9999944988211243,0.9999952506236244,0.9999999999999999,0.8809196682444591,0.9999999991193572,1.0,0.9999999870829845,1.0,1.0,1.0,0.8456622817450046,0.9999987369314743,0.9999999999997556,0.9999999979695544,0.9999999999999822,0.9999999999999962,0.9999972174438053,0.9999999808049389,0.9999993893266848,0.9999999999974206,0.02006342043945142,0.9173760372049605,0.9382977675037135,0.9999992564207483,0.9999972841031067,0.9932197350971369,0.9999998231636286,0.9999999620022488,1.0,0.9999999368081629,0.9999996603149015,0.9996179186166086,1.0,0.9999999970121718,0.9999955374353001,0.999999984085877,0.7694412578527704,0.999999999877002,0.8149485088514983,0.9999998296276479,0.9999999417628269,0.9999994782283776,0.9999988164447207,0.9999999622102954,0.9999999948188513,0.9999917153872402,0.9998492046523044,0.9994587487002693,0.9999907350801346,6.273070169017831e-9,0.9999997001274105,0.9901028781985274,0.9999848205697374,1.0,0.9999999999996861,0.9999999999993698,0.9927163007415577,0.9999997950487864,0.9999756340309176,0.9999999996848817,0.5763829203178819,0.9999999997837478,0.999973934602888,0.9999999702124467,0.9999993508069994,1.0,0.9999988061765359,0.9999999966058293,0.9999861164659336,0.9999999999610755,0.9919339127402544,1.0,0.9999999878410357,0.9999999999996717,1.0,0.9999800256669459,1.0,0.9999996775092217,1.0,0.9999999999496859,0.30706514024271453,1.0,0.9999999999999999,0.9999999999999998,0.9999999983682554,0.9981987171189166,0.999971807222742,1.0,0.9999989201147474,0.9999953630638623,1.0,0.6330403784655083,0.9999995091153807,4.451704237054674e-6,0.9999999999841076,0.999999994317574,0.8605201720399156,0.9999999979142944,0.9999999999999989,0.9999999999999999,0.9999999999999953,0.9999999979577991,0.9999997743456351,0.9999999889530972,0.9944924218256265,1.0,0.9999992581423376,0.9999999999124226,0.9999999978725054,0.9999992467227465,3.497404273885991e-28,0.9713298635868051,0.9999999999999236,0.9999960203527826,0.9999982937588996,1.0,0.9958573197992567,0.9928410490305781,0.9890882450111464,0.9999999999927913,0.9999999999900744,1.0,1.0,0.999999940357048,0.9459141760258888,0.9999999999999999,0.9514255873595057,0.9997809780743294,0.9999100940846185,0.999457851076952,0.9999825893526118,0.9999999999110638,1.0,0.9999999999999999,0.9999999999283622,0.9999999997477841,0.9999999999999996,0.9999999999417301,0.9999999999996906,0.9999999979423979,0.9999871705461613,0.9999999999819641,0.9999999999999999,0.9999999954766222,0.9999735076627168,0.9999966692221088,0.9999998810299822,1.0,0.9924962028575383,0.9999999999996582,0.9999999999999993,0.9927377888627416,0.9999999994316997,0.9999999999882084,0.9999999999999527,1.0,1.0,0.9999999992389084,0.9999978440311309,0.9999074880168857,0.9999999999999998,0.9999999999973019,1.0,0.9999999902084686,0.9992571089361991,1.0,0.9999431699794505,0.00015174829741237888,0.0012874805127490426,0.9999996238220231,0.999999999998956,0.9999036483777399,1.0,0.9999999979302968,0.9999999882489922,0.9980832049219894,1.0,0.9999999999998663,0.9999999999963057,0.9999823759703194,0.8564127404759252,0.9999999883408539,0.9948819636842625,0.9999966407493021,0.9999999806485418,0.98704978269921,0.990585491511999,0.9999999919309069,0.9999999997644898,0.9999998800041886,0.9999999986081869,0.9999975202192941,0.9999999999999999,0.9999999999999035,0.9999999999999891,0.9999999998879898,0.9983044551520768,0.9999999701911311,1.0,0.9999999999999999,0.9999999999999818,0.999997988783754,0.9999689353627588,0.9999748949094074,0.9999999994571537,0.9999999932792274,0.999999943522188,0.9999999999999998,0.9999999999999969,0.9973294156340705,0.9999999999394868,0.9999999341981489,1.0,0.9527751626302431,0.9999999999999998,0.9999999999977737,1.0,0.9999999327580058,0.9999999483632486,0.9999999999368347,1.0,1.0,0.9999988398870365,0.9999949742635189,0.9999999999999999,0.9999999999965206,0.9598013239141419,5.080469650036184e-8,1.0,0.9999999999999997,0.8688201416203658,0.9999999999958391,1.0,0.9999999999997806,1.0,1.1513988253294148e-35,0.9999941278363557,9.037284659578822e-10,0.9999998718331041,0.9999999062061978,0.9999999979971395,1.0,0.9999337665230708,0.9999999877789657,0.9999990221664556,0.9999999999888838,0.9999928479031858,0.9754735649154276,0.9999999969077352,0.9999999958893638,0.9999999993848432,0.9999999999922567,0.9999999999999999,0.9999999996642248,0.9999999999830389,1.0,0.8659101609676025,0.9999998894600525,0.9999991275318926,0.9762535201439231,0.9963929392623586,0.9999999999999999,0.9974509009193527,0.9999999858521348,0.9997351333138467,1.0,0.9999999748934435,0.9999999999807931,0.9998673606615172,0.9999999999939159,0.9999999999999944,1.0,0.9985759554479913,0.9814029745421429,0.9999996176472832,1.0,0.6395368349390784,0.9999999999999999,0.999999008029933,1.0,0.9961125893559009,0.9999999999999999,0.9999999922234946,6.268086537314053e-13,0.9999997624793396,0.9742408488108474,0.9999999650785933,0.9999999999990329,0.9999999999999998,0.999999976515449,9.8083516029895e-32,0.999813233973301,0.9447495961833094,0.9999999820549478,1.0,0.9999837242916909,0.9990140250217361,0.9999999999999971,0.9999999059809084,0.9999826537760682,0.9999909324062812,0.9999827781811785,0.9999991054861121,0.0025928693141638623,0.9991834488307366,0.6155271014080013,0.9999999999988186,0.9999999999994413,0.9999999999999998,0.9999999999999706,1.0,1.0,0.9999999983931611,0.9999981958558276,0.9999999974126151,0.9999997355996164,0.9999999999999725,0.9966449398858866,0.9999999885330735,0.9999999999998831,0.9999291828648756,0.9999999999999997,9.361246775571786e-7,0.999999999999988,0.9999999999979232,0.9999989695797709,0.15968316336160998,0.9999995976976149,0.9999996627530514,0.998562092229665,0.9999999998345334,0.9999997907312118,0.9999999999999999,1.042231059226492e-6,0.9999998493156723,8.581755943997218e-19,0.9999999999811191,1.0,0.9996242667074411,0.9999999999999833,0.9999999999999999,0.9995642273884253,1.0,0.9999999999984656,0.9999999620537342,0.9999922125229399,0.9999697828629099,0.9999994868600256,0.999350084584211,3.060257518402013e-40,1.0,0.9999999999908795,0.9999999999999999,1.0,0.9999999999999787,0.9153402051525222,1.0,0.9993810074367439,0.9999999941616767,0.9847768770532487,0.9999999318905044,0.9999898775340639,0.9999999999999996,1.0,2.8525217005892116e-9,0.9999988981932213,0.9999999874947261,0.999999999972356,0.999744922898236,0.8810905687070204,0.999999999999982,0.9993023436164415,0.0103826942005682,0.9999999328901145,0.9999999991372548,0.9922480947761586,0.9999999999999843,0.9999991298019871,0.9999999999999931,1.0,0.9992695870576689,0.9999999999999989,0.9999998825835998,0.9943181318465791,1.0,1.3821104654827692e-31,0.9999999999989964,1.0,0.9999999957002724,0.9999999999997974,0.9999999999996777,0.9999999904055725,0.9999999999966919,0.9999999993015715,0.999999994487281,0.9999978340653303,0.9999999999983367,0.9997157288203038,0.9999982004549641,0.9999999992981897,0.999999667843066,0.999999999999998,0.9999999832553338,0.9999999999996385,0.9999999829789714,1.0,0.999999992923783,0.9974381656412925,0.9928217599315539,1.0,0.9999999992598068,0.0007411434166390561,0.9999992776267602,0.9998837018954799,0.9999999975730228,0.9999998308712141,0.9999999992801826,0.9999998529536239,0.9999153106095877,8.355086943288486e-38,0.9999999945697278,6.269315751721966e-5,1.0,0.9998967225186721,1.0,1.0,0.999997728328203,0.9999999670413046,0.9999633243696867,0.9999909095096393,0.9999999999999999,0.999999863626174,0.9999999999997801,0.9999998484760338,0.35694252475714067,1.0,1.0,0.9556179663919239,0.6844323877682967,0.9999999999946168,1.0,1.0,0.9999665247131607,0.9999999988766106,0.9999999972348931,0.9999999900805688,0.9999994889491584,0.9976032484037102,0.9999999999999635,1.0,0.015195313704173808,0.9999999999721604,0.9999999272009913,0.942413826966756,0.6012042028567395,0.9999999989053309,0.9999999999622511,0.9999999999162652,0.999999999729313,0.999880932351211,0.9999872684830027,0.9999912654799049,1.0,0.9999990699263732,0.9999103802459147,0.9917982534965839,0.9999999999999922,0.9995522350220951,0.7374337544691436,0.9999999922893358,0.999999999997617,0.9999999998818714,0.999999997386804,0.9999999999988102,4.415683849165625e-10,0.9772300475820733,0.9999764005232604,1.0,0.8029035161028374,0.9999999999998528,0.9999999999994904,0.9999805575981865,0.9999999814773334,1.0,0.9999996149987246,0.9999999988792019,0.9999998313755233,0.8713662219607464,0.9999999999999519,0.9945179592097512,0.9999997173109696,0.9999999999999974,0.9999998364334652,0.9931774389147481,0.9886062224633444,0.9999644587121026,0.9999998295371022,0.9927578717993136,0.9999999939586658,0.9999999999999907,0.9999999999842806,0.7759059951903843,0.9999968646882496,0.9999999999921195,0.999999649716721,0.9999999883420395,0.9999999999998614,0.00645229134966605,0.9999999602873565,9.055219169450213e-286,0.99999999846704,1.0,0.9999999553959195,1.0,0.9999999999999994,0.9999999997869294,1.0,0.9998212571421609,0.9999999999999999,0.9998479848594176,0.9998112092206678,0.9999999999999999,0.9999999999871223,0.9999410401865284,0.999999999958412,0.9999999987136173,0.9999999999999999,1.0,0.9999999999850915,0.9700479953655706,0.8479302707152654,0.9999959086307346,0.46425617808066527,0.9999999999042494,0.9999999378311145,0.9999849739933344,0.612109977414254,1.0,0.9999999999999983,0.9999999999925304,0.8141335364429516,0.9999999999989124,0.9999999999999909,0.9999999999976988,0.9999999999999944,0.9999999481851775,0.9999999812677207,0.9999999999869915,1.0,0.9993996995219527,0.9999999999999808,0.9999999999999992,0.964891342434174,0.9999999998170802,0.999998590567653,0.14646399228651097,1.0,0.9999999985341523,0.7626500362312024,1.0,0.9999998135172298,0.9995924242777139,0.9999999889475815,0.7457319568149582,0.07393076961944255,0.9999999999999738,0.999999010562171,0.9999999999999848,1.0,0.9999798943924318,1.0,0.9999991774063806,0.9999816910554552,1.0,0.9999780741916895,1.0,0.9999981281529594,0.9000000986243815,0.7485863843565612,0.99999999998924,0.9999990258507745,0.9999787907812023,0.9988829756145161,0.9999999990487548,0.9999999496853388,0.9999999995518107,0.9999908103902689,0.999999999659886,1.0,0.999999999999902,0.9999999999659545,0.9987793851547426,0.999997800059491,0.9999966887529492,0.9999992725902763,0.9999999999999449,6.2315948466348166e-9,0.9999984228896169,0.99995915017987,1.0,0.9999999978663493,0.9999999978155922,0.9999999999999128,1.0,0.9999998678768377,0.9999999999927544,0.9999997841927701,0.9999999999999999,0.9999991092921866,0.09516796544744843,0.999999999984029,0.999999998772022,0.9999999999999999,0.999999999999978,0.9999999689310594,0.9999999999999245,0.9999993569834297,0.9999968370860544,0.9999999999637071,8.236885703961562e-25,0.9959223706876222,0.9894244556670823,0.9997246732818484,0.9999999999996427,0.9999999968217899,0.9999999999479422,0.9832516972074542,0.9999999774758432,0.9999999615349079,0.9999809597644882,0.8845255689276563,0.9999999999999993,0.999999999938976,0.9999999999999966,0.9999999999999988,0.9814892806518706,0.9999956628345663,1.0,0.9999999993522081,0.9999999999886229,6.369715309397876e-5,0.9999999999999996,0.9999999619082671,0.9999998538703683,1.0,0.9999999999999946,0.9999978699537586,0.9999449681162034,0.9999999998795013,9.510600616545497e-9,0.9999999999999999,0.9999999971647758,0.9975896667249673,0.9999999988197281,0.9999999794137069,0.9999387164023287,0.0017300716946441947,1.0,0.37986626481083297,0.9968499851655038,0.9999999992514412,1.0,0.9998804410493056,0.9999244869252932,1.0,1.0,0.9999985819006248,0.9999995576367748,0.9999986649215745,0.9394251106995479,0.9999999998482296,0.9999999999986662,0.9999999995554412,0.6822607741838689,0.82361342053441,0.9999983656172092,0.9998019210085805,0.9999999999999996,0.9999891546049176,0.9999999669768952,1.0,0.9999999999491878,0.9999852431878602,0.9999999999999999,0.9999999758293215,1.5122524529508605e-30,0.9999999999999998,0.999992457961378,0.9999999999995935,0.9999993127835806,0.999999999999481,0.9999999999845566,0.9998229157853792,0.9999999999999973,0.9999999998967166,0.9770732503800845,0.9999999999999999,0.24021284434637624,0.9999999999930445,0.9966284144131424,0.9999999999867349,0.9999976196684891,0.9020153732135756,0.9999999999989272,1.0,0.9999999999999997,1.0,0.9999985584192046,1.0,0.9965701435893486,1.0,0.1303918252005758,0.9999998666413686,0.9999999999995028,0.9987309543412184,0.9940973144170998,0.9999999999884249,0.9999999999255046,0.9999999994642629,0.9999304535177863,1.0,0.9985497812569435,0.9999999771901257,0.9999999996986106,0.9999999993221654,0.9999994171337493,0.9999999999999999,0.7259425656066949,1.0,0.9999979298855326,0.9999997430088412,0.9999999999991276,0.9999999999907815,0.9999999453171762,0.9998592889814987,0.9854714287258305,0.9947008803722713,1.0,0.999999995563302,0.9999998669186656,0.9999944473799192,0.9999999500761487,0.9107911416089265,0.9999472916217471,0.9999999999999781,0.9999999999999762,0.9999922045277151,0.9999999999999936,1.0,0.9819117177903735,0.9999999999997493,1.0,0.9999999999993513,0.9999999999969504,0.9999999999922855,0.999978693798799,0.009293238156823055,0.9999651327052933,0.9999993469404291,0.9999999999999998,0.9999999999934773,0.00018921881692747811,0.9162143948737537,0.37644706555416135,0.9965295088165254,0.999999999291446,0.9999999989668605,1.0,1.0,0.9999999999964226,1.0,1.0,0.9999999999999999,0.9999999999931019,0.9996465109771149,0.9999999999687689,1.0,7.118002558614074e-7,0.9999999978480536,1.0,0.9999674554224895,0.9999994512552939,1.317518571399046e-15,0.9999848212455116,0.9999980120006612,0.9155268816623702,1.0,0.999898000542229,0.9999999996109373,0.999999999993111,0.9999990407733322,0.9999996219543529,0.9999999396412225,0.9999999999999959,0.9999999999999981,0.9999999680093368,0.9999999892229312,0.6577821230133507,0.9999999503483922,0.9999999999999948,4.237179020771648e-5,0.999999912128031,0.9999997975347605,0.9999999999700316,0.9999966501106208,0.9999570494931433,0.9999999999997261,0.9999998556309624,0.9999999999999936,0.999999999999994,0.999999999999989,0.9999999977632192,0.9999999967506029,1.5118447762088934e-26,0.9999972847834777,0.9999999994251527,0.999999999999805,0.985743304505431,0.999999999999635,0.9983615809339625,0.0020398519061177144,0.9999999999854817,0.9999998500325229,1.0,0.999999999991645,0.9997806450238472,0.9386489236674546,0.999999999200345,1.0,1.0,0.9999998978156922,0.9999999998952873,0.9999999982861802,0.9999999997141027,0.9999999998060498,4.5134373970189716e-58,0.9999942022839388,4.1487540138998434e-181,0.9999899424250246,1.0,0.9027322063761043,1.0,0.99999927376074,0.9999999986923406,1.0,0.9999999999902357],"alpha":[14.130239372407562,13.635106979264393,10.385362600914021,19.494125567134105,14.52482103736708,17.999051899454994,12.909810964061654,10.367163409395896,14.666515272364048,19.523823314124456,16.86898792480223,11.949324912952763,16.147376764162086,19.73584565658632,15.77912703844645,17.96991554527514,18.92391755190993,15.47396354042255,14.225871924616865,12.890268733136816,11.23992664691876,10.525036914693718,14.863883135275898,16.20421132938345,12.620614438739606,19.563527411089208,15.087073162266263,19.557724017977456,17.955468504264445,18.160930381565123,10.781156873513511,14.763119081427615,18.622537644411082,15.307979051392813,17.515742130484096,17.273055258473423,10.233051414740936,13.338665518920811,14.006989821000879,11.832584784083721,16.249078485615524,19.89845978776604,12.75271309219919,10.714112238111744,17.51302428197795,17.95127361962122,14.206021687561396,13.764614878249702,17.663673901742865,13.187652421767847,13.809482443641434,12.713706625743903,16.748640583538783,11.923457870208615,17.570596319394696,14.104623456575142,19.350865630300373,12.837025019163313,13.774046968968454,19.884227990758806,11.249115603401926,11.670802315949986,19.77261473783375,19.949622448471608,18.080285536688887,15.995208671358107,15.776468148006135,18.598893238085576,11.354631256793011,10.86142284865316,16.81844200277262,10.909364352154878,14.607573301031362,10.849956462886844,18.5876823856274,12.166755620769614,13.78924333047289,12.615466097195382,10.115063016364253,17.553718066848283,13.67469261179031,12.205379295538354,12.98007194367425,13.470774561061225,14.870575181015813,15.05163376682519,16.321508846189047,12.83236070480267,18.133153504751938,17.97091388284346,18.073456329249474,12.589237262648112,15.540325155300778,19.245940310588967,15.88153321572225,14.993590520794012,17.194883083445603,16.325374376138434,19.16269825478014,12.639432483857686,10.12541357890002,17.506063161088356,15.653765527786822,16.266714319262764,18.122368938964556,18.367913393776206,10.575971676218748,15.67315869194749,12.121840050599811,16.6491026743416,12.067228685093339,14.255374777959434,13.022372394402094,15.84460725458312,18.989740181616913,18.52823382184055,17.024945468030523,14.057609058824028,18.376735520022223,15.507139710058839,16.67113118222911,16.754839516060954,19.09205635299769,18.013869971164446,10.982941980917877,11.505114534240048,15.071101286294748,13.69381681109985,15.746639566118844,10.141398969194555,10.273178942602001,13.169063694124361,11.408431112493068,15.6832520076578,10.836438935507655,19.68981064721072,13.771953606599823,16.60068664903372,13.330240688145041,16.526622145179502,11.186812725225078,17.85369193261171,10.787651114438798,15.013203847344682,12.318687410465907,15.52661840163255,16.205565793250436,19.99976707085824,10.810188597256092,11.491657815953825,15.524091749255593,18.314686240627818,14.845582407128767,19.266689260728615,17.70564045382084,14.592023171793134,15.047626455554981,13.388068424386736,19.336509297195974,18.220221885401532,17.247915624404616,15.46905869724159,14.990085576203118,17.937234437680424,10.426280717420632,19.016163100153793,17.897779009635478,18.566512274835254,15.253280316354827,14.26532982529923,19.225828319402964,12.253125520954596,13.336954109754227,16.290424816737808,14.816607476838687,12.235714240196412,10.900811212436906,17.38837259509354,18.180531896794093,10.396368516071357,17.021428076166625,17.35046628877417,19.941780439706246,10.17813183777459,17.128245164721726,10.235289989064897,19.83677403741907,15.626683709696813,16.635759616501552,13.616999171209232,19.019544807206387,15.15339963260802,17.68887549327962,13.436112232247236,14.384896283099701,17.822319000682697,14.255979829862547,11.47458804340268,15.07228885005793,12.430923531930532,12.861350888920363,13.907660067012737,16.07244557378102,10.641533553846383,12.380358209531998,17.951013808801275,10.564814322415854,17.729381350618315,17.080133738024998,11.083933595292992,18.916832503389408,14.820164883516998,11.043883302924417,16.73801420188284,10.098017518702997,13.459648696315368,14.195924276904726,14.294529287768054,11.309745327563004,16.49480713753756,16.7884163753288,19.775863440700128,16.244438194511112,18.64052335510279,19.10885060628692,16.68012762493921,19.74152786300187,17.443538721485826,17.506938540592962,10.807755063732023,18.836054060467713,10.54457656565021,13.617338410831113,16.716406266319417,14.584001499172249,10.133284028595547,19.47695900428949,13.89687635656472,14.70756492667399,10.93892122847606,11.308488316614858,16.080673025469828,18.721650798328163,10.86653383151889,15.655240442396405,10.98149840401334,13.809064651737106,10.982077096072796,17.142457437454212,10.843356463736722,10.309841890083964,14.868964114618095,19.73716018144162,18.353656935667047,12.157761456369936,12.20206395378122,10.558308971358732,13.9168016080875,13.00219480669279,15.968170142264633,12.667609648059434,12.217301181469676,14.434649720083414,17.881649319529906,11.912199392225656,12.49319079028821,13.667716628717933,10.903445919590842,13.94985013530422,17.968583823663437,12.880518951926259,11.884465411513535,13.54468918011654,16.76798623488918,14.02946984529776,15.84557058467708,19.96130397414819,17.165296270307827,13.87692512915729,18.664197238972875,10.942396891964103,13.446984513322871,10.182458388091218,12.80706840847361,14.965661910474928,11.182358799669522,16.008868252754336,12.780958529216173,16.0679522715679,16.717212634492324,13.504433483454598,12.589457367498335,19.589163974108597,11.360314658533177,12.132081754623936,15.421939097769876,17.1382721071495,15.690659923608564,15.296071200778332,15.332895960142011,17.04558622940573,11.590606407147728,12.708763062567034,15.6035196347005,13.002097725368122,11.921538737829394,17.388200042514512,14.157734290799462,18.052902936499265,15.571662910196684,16.878888203919402,18.406421769708864,18.278108958626433,12.835152200820275,18.724172644029416,11.082722466553017,12.132473632526473,17.397441386148717,10.121958123179766,15.160457138064952,18.10050092595387,10.193287565272968,12.487973582516325,14.100334063383528,15.61190522931529,12.065797773157696,17.437957172810446,15.869469891970581,19.378577002918973,11.632205300338645,19.77265248859975,11.620836361057464,17.475142586790884,18.049605768129585,11.363466738021145,12.8597290102371,17.983514895126845,12.375765090822968,10.534075232198765,14.701208168439525,10.335981315376294,17.102036246464813,15.36886610498497,16.483767287955388,11.129576262449135,19.81931966040139,19.131191705083488,11.548242055563184,10.46485522328057,11.439273176845559,16.145525390334186,17.87110169926638,11.00998905025499,17.4364535910254,19.2804859503453,13.615465723079216,16.10179621657734,18.61194780214555,15.98747260198505,17.524701379030702,15.702545794501741,15.884547661071993,19.206752789879864,11.071511200454722,12.358484080272728,17.65767416962118,14.5453034328631,12.000579003691696,18.925207815908998,19.875429547162273,12.994678737136491,16.57975751266362,19.648281255141093,16.704608007637653,19.011927109337805,18.862303235758052,18.145119615258345,19.04631753519388,19.18577590077065,15.152505447501802,11.401718292536422,11.049651963525282,15.107732552100565,12.00007787191437,14.79554038338958,15.746440462287364,14.839246284421161,16.27633806172865,12.212821216560831,15.062976746421278,11.55980088217011,19.978553501317013,19.6795261281209,15.131329941603234,13.541185818754258,17.02640241416755,12.196404210243365,11.33612746937921,10.752591124978707,13.199103417919497,15.027840693586462,11.69672608245568,15.362521957276826,11.880742260742572,10.6613052793028,12.00580379478338,10.755709194714818,10.231614123673378,17.72619975144684,19.638920759006805,11.974866523420783,15.472585616269281,14.137567661338446,11.277934654225202,14.66462287933014,18.41500702688425,11.17507636719216,15.190983355740846,15.913059590930443,19.316576199370026,11.072325712912118,17.200315180769962,18.286182668358965,18.139753081289207,19.269338321509267,17.91144602832289,13.539959374496295,13.142283470332634,18.23708427501485,18.32519881433028,10.066416909850421,18.11925018894459,15.646415954059874,16.874187111837863,10.130660897609769,14.706210840250442,19.398669288036753,18.510237308174595,16.788861892646977,12.06029291842813,10.377144048877845,19.336271468164213,11.542254875896532,17.80525046999085,14.409592913818955,11.729140477790201,12.586320720610209,18.590211472663512,17.255064967505916,14.519211144672376,10.770697437264307,13.625515249732237,15.119717484056071,10.627570577838512,10.110172089347213,13.562487928773773,11.835806636659118,13.813179083635035,13.08655911303875,15.318666804760488,19.379201295464792,15.199484806196784,13.562688832986238,18.321945628274246,18.675580655490222,14.137835840228231,10.272442423016981,16.520072067958854,15.961567371559333,12.642806907046523,10.954588755911864,11.38998255626776,11.154958155803033,15.688705398076308,10.987213249586416,18.401655510233585,11.785015067649649,14.532750205315734,15.073165698805342,14.383736734385266,10.647501134247326,13.400432308656043,18.362446223065774,14.066847829973259,16.400373967192778,13.964209456946628,18.92251997255442,11.17915911568181,17.834777982323686,15.114050609887197,11.051874600940739,15.984565672519711,13.441313533294085,16.07100564703203,10.490434987455865,14.772974816049281,15.576273051622255,18.053973189809028,13.04381961809458,11.208789686647462,12.296342147819333,16.121183474817084,13.154478198107372,15.531846966149427,11.40731863580265,19.79938887098446,10.326163340240369,16.46720385713609,19.87975210651765,10.632474329129149,13.215546928463604,13.983437582506388,15.51126605160534,14.936280751574316,12.187178820744567,13.502984456603945,15.482500495747162,12.259396826728771,17.392028564459842,19.266885589107204,11.247296354849077,19.763191887201195,18.71458880245201,13.717904908157506,12.749519297315988,14.04793732460066,17.794828594687985,19.096667230765426,15.09967997119168,10.972564386009614,18.117977259420925,18.109099165235982,14.04409433788796,10.71132421781826,11.228437454023359,15.432900815941474,12.943907967878996,15.781818988689128,15.231992249278568,15.227161808694,12.483690769649861,17.06004009729053,18.818014266026662,18.049456673151774,16.140962493426397,11.60366638964809,17.042863056825205,16.199759118677466,12.835597580233005,14.65817684804872,16.86359301665894,14.526010268677837,12.110539876454434,12.144521414767539,16.367908408728304,18.589863587772204,10.96410026084891,17.322873551124374,13.511616947465718,10.217996196353907,13.92666459715591,10.863681193341233,18.2747486279837,18.56922951305293,14.857517072356504,19.21012322895567,11.705029639683758,18.824911165752063,13.475526002253746,12.548896336719906,17.530024143146186,14.18849436181684,13.404543829813889,19.685479079998302,14.754055985513597,14.878177961614835,15.88152301732226,14.754988913004123,15.782693841998533,18.279773454519567,17.93027848034258,15.833515864916803,19.6288438620236,14.795913126954225,17.095967023312117,15.123073167974807,18.814278870296956,13.504908723587313,12.299113754806928,11.11912833807365,19.723865292993814,15.624183684669067,12.435570833944556,13.516932745416439,14.85850526505484,19.492772060174296,10.569054154309843,17.639752583125663,10.096361787469233,14.633471087326003,19.76124639612258,13.6718268097497,10.930695599283977,13.022783692428412,15.861251145776514,11.548064371631515,14.171464605247994,12.972923130176525,11.317952957550698,17.787054286419,19.322475534360557,14.668620506090527,18.78750306561056,14.201868534371817,10.652501844549377,13.510306131488468,14.333380356624705,11.423997813470429,12.88485305563389,12.324226702032346,11.966701424190342,10.69475455222391,18.95844121046274,14.266497958109536,18.731339895045636,16.227357385988135,11.606103075964473,13.929105219625203,11.710263864391903,14.012440287866799,11.697529230243585,18.775236078785234,13.061193751754807,19.894563204325124,11.220437621555252,13.568877064958617,17.250238362514757,16.177790855634328,10.282112787037471,15.815362187961725,18.72228176511331,15.032316946154634,13.24501154184141,16.905266119546646,12.868830344866977,17.344120420536825,12.106009111103631,16.267212448663273,18.58789476555227,12.737117007238885,10.714376049610905,10.995016590838533,13.015621554144928,11.813839032365614,18.09847270466708,16.401087893826997,11.5670179701455,10.579017228032757,15.178174563005147,13.033723216665836,18.18633511051434,13.957603351119758,12.46630303628441,18.868326749382227,16.545467599041167,17.879721615205632,10.127206355310804,18.015656161138534,12.081509994067458,10.234948764688138,17.853850118156025,14.036958540810833,15.661580430865556,16.19224089992937,19.441802226245102,13.937037730572516,15.46521531979572,17.503974854269885,13.747818525381213,14.95635342434305,15.238067670824687,14.718944854560313,17.665185635710053,11.631946040434148,18.61997866754804,16.53324633548748,13.260863952330821,16.488574686140375,13.058119662368018,10.719465384556322,11.950182383654095,18.847461999392607,18.421286382137005,11.438272502152323,10.80205247733399,19.768115907681796,17.986838872803794,16.450160133518967,17.858754120261622,10.099727025395765,10.461245809734336,13.167310356969104,19.95529859836401,15.758907099897808,19.747174813911208,19.31271191026383,17.48370784582279,13.59971227270493,18.595245795749094,11.136878032792353,19.45007799236638,14.704090937901713,11.015244148279864,18.857785633738047,16.19695915219659,10.119777192059306,15.179043032408694,15.12900573318513,15.971980711541221,15.212013571173626,13.840723562094224,18.25013070798671,15.779116620362878,15.504448431861235,16.041471298523668,14.843414822138808,13.7464501277831,19.27575475132855,11.814894944725047,18.32481043635304,14.000868558180093,16.748688841404554,15.910086707053503,16.915922578819547,12.648616584123909,11.534780791420605,18.937514074279598,13.86882398895664,14.062407013539897,11.743453085225832,16.040850775785117,18.109243408488304,18.95419243131647,18.796647885071806,19.279118419021305,10.624485765320038,18.644682796891054,18.297869502783215,11.559483814985736,17.705503087598277,13.230606090017634,10.660391453240958,10.727118553219409,18.974305904603,16.522944211646895,19.176760516395202,18.06538705863622,15.114699023412506,15.085612769625737,15.356894903966689,10.459366031446969,19.285089019828874,14.725587393817452,19.056642643478305,11.945696348830383,14.91250296925047,16.757360185333685,16.989800032921988,15.039659247805933,10.275004873514694,10.13029795346857,10.580296000556276,11.762466401685675,11.382489292039786,10.136145049129784,12.305352144424806,14.504636218387292,15.134249921972593,15.835980922999216,16.960842417030005,13.075811137281901,10.182549342246656,12.741714308873542,10.171004530370947,16.8881491764055,14.865617431015455,13.181479132213864,16.082243052167765,13.71220091477067,11.464905905698144,11.384686204130855,12.454212793418822,16.682439455534364,13.212935190667183,15.992665991550115,16.328750124005392,14.56795570250901,13.730001480932241,14.871622821853867,15.262510092675136,11.118685882201468,12.477955081936432,12.228505042327267,10.355991643286643,18.521214270304498,19.89034776728523,12.142506955605361,18.715354746195807,14.40155041971434,11.396001749289598,14.480973205807423,16.023848563171363,14.466096988672728,15.023975873911265,15.684047898984314,18.970660302922024,11.459156126202792,12.28435531141217,15.802199641959378,19.510744741170612,11.608318261373821,11.143334264792031,14.810998253132968,12.67051263673527,15.10319379486649,14.776284153662084,14.120875651267518,15.498080557293655,12.09313362922934,10.269679220496535,17.381182147130787,10.017237140853991,13.039164089101757,15.934272723710832,19.993681065140493,14.064926150723425,19.449977887334413,18.627807926688213,12.191240628727222,13.833836930016453,19.292879158652745,15.297808201210168,17.498958062665942,15.125957986402982,19.576750156459177,16.825305790166,15.363802781606893,13.526594320758111,16.313486210180077,11.894079501534131,15.267334756711982,10.94077758550946,18.2592926171087,18.05407839500673,19.457415996339588,17.531066220284206,12.397293595794498,15.755751834712537,16.352082707572976,17.721295711125492,17.517258147983135,13.961921955690794,15.77841691257106,12.408727133325005,17.90547892059329,15.545492698934357,16.984611871120567,18.08444776848023,17.714784448703423,10.447228242585906,15.069168385386462,15.190139042409342,18.529246436098475,10.137904576714728,18.519680838356713,12.299449578239624,15.775353466297462,15.14843632902629,12.523014698914164,13.223724538904506,19.044871532520645,13.814221591407787,19.299424308825888,12.196965691035121,16.6582970725269,12.990985640778455,19.84597509259449,12.547566659200013,14.418781092489946,12.72851961233279,12.539351919409935,19.394276522729086,17.430654135780845,17.565009107812934,19.668590618311413,12.560427317380821,15.388186898483418,12.882000168383382,18.978441187954907,13.584386141269306,15.605238989025151,18.117003239318493,16.57385633542738,13.512086438184149,12.363959499520378,19.25288693173048,18.447049837609526,19.81053707427334,12.19307945719558,11.376722063277489,14.215781244352454,14.703545284584614,12.339719531958018,16.01827255307119,11.806139493798982,16.83291916127781,15.293541119084741,18.50734132369264,11.069039274558257,18.244121399624973,11.091787111135321,19.274781150936185,11.1332636337917,14.88366046757446,19.006141481409273,17.283070041519093,13.009535290804282,11.575784410962424,14.437888759988233,15.678947820366673,18.03625862436388,11.21577587169449,15.465987583108916,18.68423995008113,11.204147598607088,12.563180496997749,18.617147224811546,11.311368898728738,10.349300959777567,10.064699792487456,19.971696258214813,11.93251330026137,17.203939017078238,17.40765248899997,12.922754982033087,18.57993987945013,18.436436762921552,17.961342384427006,18.481617513025768,12.48133207924846,12.462923130191667,17.87521419247431,10.099486043126248,17.242528495982917,15.998961936912679,15.251531698375667,18.117735507002237,13.64253300411856,10.777661327879633,12.623277080411984,18.58359556090034,10.613800835349457,17.327806771951334,11.865397754533149,16.772663863667564,12.902493070231984,16.977769838900283,19.750223408359854,15.72903284323113,18.998007462933405,19.114862000609627,18.484329923509762,18.060384681075938,16.649051380009425,11.183969528919405,17.635608573795793,11.156813887115757,15.650918639097169,15.717079302909628,14.179215955989566,15.539403660199469,15.600926223462483,16.936288554957247,18.8311713839133,16.74486288422131,19.15601200431961,18.037172129829848,19.706241671973523,10.523205285976548,17.039771873980555,17.355495781926102,16.02045575112667,11.893452734626521,19.198484909971967,12.763446878535582,18.065042825038226,13.740100295016163,13.637252011147346,17.081864862460975,16.907639771381895],"x":[0.32267244140573026,4.225933813450977,1.8833003723997932,4.201584065502722,3.382320373694483,2.5831916563863846,4.8693061862797045,3.1447359411547504,3.4379808612937754,4.329260914479,2.857830923712017,3.652918368959488,4.3733801215728825,3.067793959047912,4.405953420485611,3.322878959353217,4.493124096564177,4.03978627835175,0.534147230202533,1.9996551367541404,1.7424551699557533,0.6084037416495802,2.6922328145342345,2.187595128302301,4.879165234061977,1.2493275560114325,3.781124857624217,2.310205673830014,4.0635628012001765,2.7037310608691065,0.9139808303157537,1.9099763776443934,4.509008118155714,3.558156568846731,4.004366126340346,3.3610971032747217,0.33443548066960815,4.351371397214878,1.8136957527152375,0.8891858758700855,1.6604251024332095,1.3400814581427745,3.3175643184537518,4.630707265627225,0.8107123426198548,0.17426162384854393,0.7017760357687375,4.075115770064368,0.8148052912891501,3.860038336946058,3.7969393979618893,2.8279853078558115,1.3945888618913782,0.9623313151811452,0.6898932896391763,2.491475125217862,2.7299861152756923,4.590165047931626,0.5426453934933195,3.4997948947359947,2.4659175566740332,2.072482798667652,4.046286871074241,3.997677418990823,1.538672171730372,3.4719670596683327,3.729813862921624,2.350205817716333,0.18778989058238382,4.9515319795021915,3.814073307672816,1.771681977295696,2.3008884130469265,0.8501831449669206,3.3967009214091815,3.717186206319373,4.702276790346942,2.391157418640766,4.445294056286199,2.6151996550042442,3.436927813447298,2.8758941666634574,3.3101367027761217,0.836706637261242,0.6872261815287395,2.6325551248040724,4.676865063193787,1.281528775192775,1.2954135669938582,2.837507156035406,1.2010170550690957,3.5223879168291115,4.43684330293917,1.564849171662952,4.554929186082247,4.980437084941181,4.451723645363107,3.3018565096941654,3.9035791297721154,1.8528816678093052,0.1795240891416472,2.256679954981624,1.065715907928928,4.931149546586751,1.9854627683227144,3.746339688238849,2.9091512445371737,2.357215978955182,2.423522584098794,2.813011751894696,2.0996359210869175,2.1678134432118537,3.517065758735165,3.7503914023927587,3.0105769991299116,1.9629697986885009,2.0816592572837367,3.2343950650605335,3.538504723606887,0.437462193496454,1.2935610610115111,1.1825981116470485,1.0551376836763615,1.3368835047243677,0.8952692987900635,4.664859251194616,2.540670374103372,2.8432298894536934,2.21097347349,4.846015039263863,4.381406875163608,4.06279381407535,0.36384837005997483,3.1170385630213104,1.3087278793399004,0.2183829717196928,2.3519386953354395,0.47994442266371284,2.042036583458713,3.1212314734995585,1.7991529912727444,4.298071712652781,0.5204749873239756,2.2762323386633057,1.9561543965543737,2.403532100318413,4.608753701721372,1.387291048271151,4.402363456171596,4.951609964548381,1.5567830946860572,1.4828714061311288,3.6803669882885526,4.869311561874041,1.4882120885667938,2.3860333156730595,4.610399026876638,0.9595219532791299,0.5098076031698839,1.83525207817408,2.4354816978186724,0.09480684507249038,3.1991398355585488,3.2110967632980536,1.319484535611698,1.7891878221539137,3.9143253371677176,2.6122183499551896,3.502820931802353,4.616490920026567,1.0591566170620204,3.219871824252567,2.997438951804786,1.749005381137565,0.2258095093575785,1.1924690047736364,0.14762211142540393,2.3371406901223093,1.4111547115895862,2.36261265204896,1.833418993562832,2.7221129091688843,3.7367951346479735,4.440657237962281,1.381735404714457,2.9849633136543474,2.362716325559985,3.5269262539887993,0.8928147030620681,2.1283377633441436,0.4323296926297515,3.3657476594608395,0.1551243060414098,4.447755700356931,1.6459196718150604,2.1558322912077066,2.3275745135451453,3.301680334171065,2.837512886282724,1.609823550879741,2.7112989603933846,1.7228408955352403,2.027452765834518,0.03965027464977955,2.8847786736785572,0.9057808424171143,2.5210796186950524,0.9492999276851954,4.67909187289067,1.214413095304191,0.5315155770619084,3.5940415193071473,2.4907957429445804,1.4381239509082655,0.8287180187411702,4.655911860410521,1.7293012682914566,3.111831224087517,4.913098934273972,2.5462031459776044,1.7887909707660377,1.6020591931581774,2.2266403017573353,2.547865892191071,0.9374283081118573,1.1815923526053795,2.532398838436729,4.115751692691609,4.171317127648543,3.5751139193132584,3.2276936211568397,4.510784899648974,3.4910040575417534,2.336830002837459,0.16452526783770516,4.204629308023124,4.934953081731859,1.2377110847514028,3.081123184196729,0.4599901277203622,3.9813936944468664,3.2482880044878604,1.5931687097045788,4.4870630106625065,2.2291521623802266,0.9409940782068449,3.1188311450730954,0.19585176020366912,4.705557086127451,3.865715891729481,0.4974281455722318,4.310200638384357,0.4285200328122041,4.026677037444707,3.3902835856220195,4.384931818534655,3.157327978275868,2.6599490085430855,1.2345077458136866,0.9160633798980466,3.0507101224937507,3.893100333685031,3.3091425622584083,1.9288484512946225,0.06549624690249223,0.8826734895247745,1.1268319567905716,2.209315083036545,3.0205076489983607,4.7905167937325785,0.49124534016561805,1.0532342632403702,1.3576621204884298,4.81808310722489,4.942631025008514,3.1916065479486075,2.950250316153731,1.4744064905704912,1.0785480233570732,4.209631388435673,0.5546462634781313,1.763637990907354,3.3120473566583266,1.5520713218276583,1.1641174610223504,4.40339471161262,2.1604219295475113,4.040980587037389,4.233010235615486,1.241851805179297,3.423585998827794,3.5905513680602397,4.454907804515987,4.46940326735216,3.136301529363049,4.939250801335245,2.252852211407946,4.201902568382715,1.3196466589280487,1.0339961598474645,2.552575068573193,4.679803681986943,1.3508522433222248,4.877072620022087,2.7879536504050275,0.7175736360026186,3.1515420685312003,2.6460060964880294,4.887127042875043,3.0742548553427773,2.739597977813811,3.2896534103505246,1.7164929235058524,1.9059539305951423,3.5373765571282845,4.692224724138181,4.305193177997726,0.8621454727338851,2.7505659928232973,3.822028489834995,0.8310563002499094,0.30040638459586155,0.12017797649393258,3.756728280890802,4.9476887220076105,1.4978350367935056,4.9321259012325385,4.229129506876529,2.364086005460716,1.0553156842259104,4.956307200621489,3.4884454548483665,3.754428583168238,0.7359481705935567,0.8407809209322614,3.749824890280198,0.8132274286340324,1.7965351018927123,3.2632628277779063,1.3207930603559426,2.1146133634859234,1.6658253498477693,3.4691249160610225,1.7757328620481672,4.6759933511139575,0.42455008118408966,2.6061396930391534,1.3672994253541892,4.6750062151169525,0.6519968991981107,1.1001118497516482,2.874290726390055,4.157718866452644,4.0547518978028405,1.3617484623126663,3.0540976201214742,1.9484505654958995,0.9127851484217364,1.369897981554108,3.279843957349564,2.542403070622833,3.944952832208961,2.6403819837287856,2.2299866584324457,3.136537276086785,2.153344904953458,2.8201371162684374,0.521494814085206,3.670691059501574,2.715021992630733,3.9995762336693286,0.4929101098949207,1.9006152118613129,4.716375987394691,4.328256774749612,3.9354718220369342,1.8604287175848322,1.7474654951650526,2.9841341876034866,2.884806205021986,1.121169474677327,0.2029414339065716,2.7495822201262543,3.309165895122433,0.530426933793503,1.9151214231098512,4.2918102479679145,4.487131687143048,2.063673648399662,0.05648828038128939,2.882623507529435,0.12592997466218003,1.330276984789056,2.7877828101961355,3.2026230426416538,2.7881241108545463,2.502809688163292,3.5038559164468963,4.577031810525573,2.197049177913062,2.459199870988394,1.0733269269515322,1.2420554199709122,2.03078823458788,2.0154012220519615,2.3137006746160136,2.879038575039438,2.8918642446736884,2.627604392253331,4.406209628948893,0.8384530367311749,2.2246846404714384,3.6632930451817147,1.2119632086726617,0.600577122202306,4.033575274390784,1.9806585161832657,3.4500074770090503,0.3504501577822383,2.002149488716254,3.8335222335342554,4.510826705119233,1.4916680409426641,4.64039272389128,3.71845510683419,3.8910496934885974,0.8939190884920634,0.914604293005894,1.1670674222826616,3.5907959820072866,0.7986302703516313,3.0644405769472174,2.8231960949286172,4.293900402986834,2.1523621143358254,4.469641795364768,1.5079316384058639,0.1102032436127931,2.2441722371468042,1.3811988606407744,3.7010263627785123,1.794006471105919,3.6780691590768844,2.131158840592887,0.029640548657725585,2.868583460257026,0.49886204100892284,1.7479716369586173,2.490114650944504,2.0474771589799157,2.860607028327198,3.165607298736041,1.7298530482322871,1.5756235064363422,1.1030507624820252,2.627708298288157,3.611930943532835,0.1171990706776993,2.1704131477428823,0.4430913570132522,2.772583447361506,1.478784773836177,4.488527903929475,1.622688301514006,2.1075583039478776,3.939113312640954,3.8058838665429153,0.9529664673420835,4.0741433977308095,2.7908061940887774,2.8129475878750556,1.7879999735384366,0.6922619501145055,3.7598765194335937,0.8857453198224763,2.160234188084619,0.10834270214785668,3.195435221760541,4.852547310922619,2.915898002657409,0.4559669106357789,2.827774816950356,1.763233885963622,0.4104988900728801,1.63667116933372,2.0121786582754666,1.784292743769632,0.24427998084217584,1.6173677856275726,0.07130902753610058,4.337775534735673,1.394767711047673,2.2036606854694076,3.344772684202504,2.2858560826403194,1.384182944661213,3.99907719128338,2.7051732496297776,1.5122660118513154,3.3762419332839775,3.481712008730806,1.9271213681783672,1.9846598442033292,0.06792940896332533,3.534807225959912,3.0743614848162015,3.676747733509141,3.038179270517569,3.4641474580294638,1.1281108446782717,3.7768007446126983,1.4625096142024818,4.019997155793388,0.8750775575680225,1.441985448873806,1.7123125079050838,2.639120754308072,4.533125890073167,0.16393352852250298,1.9145281350342302,3.217584397500952,1.9554387632733894,1.1659931972031956,0.37099331664664614,3.549020730943655,1.596725606702305,0.08785312074129248,2.206625954185073,3.4763606529022804,1.0696440482666603,0.9290635384302082,1.0996101566384697,4.660553590950017,4.219005896866933,2.5674510334722846,2.750113695403887,4.497048835375881,0.5624884759279025,2.117718902821857,0.054987040524534514,3.6513507480624394,3.2530049506757397,2.8086057852362654,3.3012573665217126,0.9052472029997993,2.087512995877275,3.5585380155429713,3.499445467763106,4.6169313582676335,2.828134072383577,3.3607556694352025,0.9188379648570233,4.051366104047992,3.160046895276114,2.6692464099364175,4.163656893879253,4.764871917856449,3.883730669547494,0.32712471500805806,4.196420135723437,3.9084930730803977,1.4825544337854568,0.7331680693762532,4.250396205577084,4.791742970258181,0.23531870644464492,4.960940013054694,0.8549579496610904,3.6694043047763647,2.1557717624283477,2.9822037583783487,4.024239396554271,2.189740159038638,0.04583906604909149,4.866634555831839,0.21757098060416147,4.157385742738128,1.0548534675913401,2.5365824206946153,4.335968559932484,0.8684585310575033,1.511083461241297,1.3975384249528633,0.5172520690016047,2.5178788569985056,2.194000363312462,3.553179144964828,4.6557615863366735,0.523679911525402,1.871447588294174,4.591389075574531,0.8060481005007625,0.9284130549205283,3.8557405603587833,2.5516161519767957,2.2305780263953157,3.0805922855852605,3.6865682724170212,4.762810456042919,4.168697610668613,1.4756210110556267,1.7066846288151039,4.166816623161472,4.020940222038804,0.35122586618837603,3.1357868181163995,2.223133768440558,0.7907313681689576,0.8929314954739942,0.10214893026657013,2.0927002825798424,4.653622549508752,3.0565892803666106,1.6845575452014194,3.1003738167342973,1.9347511291592523,3.0274902160166572,1.5170027098236893,2.2061552173678898,1.0562199824064655,2.120789834469724,1.3281064603970816,0.5888126045219833,2.1250821077996553,1.9722941736506183,4.734487995188299,4.1576823127281965,0.8600802352898806,0.1134026886029793,1.0576470560098628,3.7997465216083235,3.0172832013089734,0.09021207728129421,4.173685485335469,4.750325630394375,2.4276827686303895,2.6504166904592052,1.0701018554660613,4.592950529463784,2.923661395291657,0.9882068691675838,0.6766039978735494,4.768684272789812,0.9417678484895586,0.8037319950652877,3.432584129164573,2.2570896229156565,0.6141071809154486,0.6748074113856639,2.5348771503709564,3.862714422557356,2.092276536891161,4.844989684257051,3.5011818164371498,4.613959372298765,0.6139051803585505,2.9197340712046627,3.7126519000346137,1.4118681548658552,1.3492499673161873,3.5590080366228483,0.08936160256331371,4.312779897135973,0.013277881755670018,3.0527701350839687,3.726108911382463,2.751109858847901,4.767851136085699,2.363130401068332,4.560445633489452,3.6392929917175043,0.4502519816890882,4.412398565288668,1.4534422953155834,1.2751432743054691,4.06251980030302,2.261769431473124,1.1097478983362585,2.3451250105219,1.2011900559423705,4.408303570417269,4.371576025613276,4.133151296128666,1.1702308594939947,0.6705401113084286,2.009001250680967,0.5244546656302262,3.3096068291540828,4.9319237049964855,1.716971930698794,0.7156510698501506,4.264932490656687,4.780312349932836,4.580675205501212,1.0034315877147304,3.265377182607999,4.92487788788467,3.642043480823091,3.5843890075251728,4.65476172720334,1.2879512184045516,4.82401709190882,3.9538259875281967,1.2310941588247082,3.5523749288745545,3.318692627014345,0.5721873602354555,3.260874411463559,1.6056643281533367,0.22869354689252996,2.216491176795045,3.0328065317774335,1.1017624121988656,1.737640560147572,1.3413652444879365,2.847901206224024,2.113093866588729,0.6997155008825906,0.4457541274366983,3.3661894937101566,1.94674530229206,2.0618418462511445,2.659750755399044,1.9869688082674153,4.192777565356081,1.0540637113043494,1.1598757602291576,4.560019148591223,2.752791620283823,4.135947349780784,2.439775434933551,0.7835317442268519,0.34835662173332893,2.289363428936925,2.728316427685203,2.5945036108765573,0.4900661943964546,4.691472142458057,4.635744078334243,3.4277685081636013,0.5719364803148996,3.7301143497728315,2.98415172352691,2.317569637303319,0.7033321024922279,2.461139263866804,1.710378108111209,1.5522611175141487,4.115355815556362,2.664742562655623,0.16145737952352524,2.2834922287898496,2.1349508461331954,2.176099936433565,2.859139663054399,1.4021202374275687,2.6306982092211637,3.048854654868233,2.026198644210444,4.29677583686427,4.925315501244755,0.7265502397637624,3.2934576551710357,0.056433671235862626,4.528733453514739,3.9571412925846428,4.984568133405604,4.944038229489546,4.198714713720781,3.227464115289952,1.028305202086801,0.5050445704635698,2.9508225129796664,0.08921736832465998,2.1094899720005875,1.5756879982397032,0.6720869906679017,0.27631415498759804,2.7029820484266285,1.8476963960479553,0.948318003746913,3.882079974685891,2.354090789332158,3.9885057521556666,0.3030943651520135,2.108391012111329,2.9621999830986434,2.0540022422978774,2.8762190241301,1.4515743475539677,1.9830312854639087,4.882042882089033,3.921914270739478,4.066090741938341,0.1892954779511269,4.538623986271297,3.377988043229271,3.359818528733687,4.7231898926099545,4.393835766075122,4.857733589087365,1.1902375634859574,2.428385765453205,0.20246534556128015,3.894672491689888,2.097259489988541,2.106740595593827,1.9072659531917147,2.4234370606159175,2.731291702596814,0.22456380390908026,2.820854467425822,0.2472918289335302,0.47363279995113694,4.857988116867794,4.837095258535689,2.6051535755246613,1.8895804016247586,4.589099843147176,3.904034042369422,4.019426099550598,4.782768727160603,3.0360634235531023,0.8100714816088306,3.5825191787938926,3.4208569625855247,4.0769729585088355,0.36566867701695815,1.064343876383066,3.903588557126525,1.3894845350710727,4.666084707159008,3.4160949740618793,2.8535072320992105,1.2100687047241188,3.047569900985633,1.2658372392712014,3.768200961110418,2.460030659549155,0.08375627935153895,3.2795417100700264,2.567596502864343,2.7082137709360765,2.0584507249396378,3.911915746545296,2.0399509686898876,1.3617966586722763,4.546778632913756,1.1466994171499134,0.8609537524410737,3.80182300024849,0.4580738041399057,4.019422080430637,0.845477791699244,1.9215080165652398,2.143419707011638,0.9283729734535673,4.2811686703538046,1.9578963920277748,3.634353381173212,4.108705934095268,3.501212518620319,0.33813668150885934,1.713170168260948,3.1798085730007717,0.09587369121206502,2.031342412348285,4.6120301369910575,1.277763448099879,1.5089420897111194,4.089850697949913,3.151546684621364,1.720884639877458,1.7598047949696416,4.4159580978989075,2.0732385779348848,1.5719046257723979,4.749972245527138,1.1654759979344764,2.7299512061516285,0.5394784477433634,0.4992305101354988,3.909954172728034,4.447926275464758,2.492331027281074,4.68354494915565,0.939646400611398,4.44651758611689,1.8226349651836171,1.3653350031792977,0.3465590011012676,3.8132500510042275,2.6869628369676137,1.5404426722020992,1.570194182685456,4.723465103321772,0.6601243250314648,2.553021827861577,4.832668712921046,3.4599713863367167,1.442087528999646,4.979485058859976,3.5711231917793427,0.9622122597798599,2.2567842877092104,4.583942615293943,1.6858426962778061,3.361108630466539,3.6155530115899692,3.491105170274711,0.37813556597141473,2.0655428486130067,1.6717479499870702,4.48623378997402,2.980128844213068,0.14505425487173373,0.7290740176685717,0.06568016150817035,2.0204612675446896,2.79335630754429,4.338173525761963,3.5926273338688466,1.3358025422902575,3.556117345684041,4.887471792563614,3.7436827119219718,4.953272498940317,3.9453659984494136,1.643138328736976,3.758710444595763,3.445490276479638,0.09078624033515337,2.078491249164908,3.4774757132515646,3.812025244061612,4.816157244636639,0.1024740371726629,4.382418356400092,2.726874401673861,1.4502246200699886,4.188420958214526,3.0397472831218977,3.7985248234890756,2.5535958273909234,4.0657318099685344,1.166290101120746,1.3999014048138092,3.2849427746002355,3.007753230349711,3.776189857240463,2.4456587326799815,0.44200711627733313,4.914625839978221,3.483944175708027,0.2493589182907241,1.9774341584738264,2.348159459296588,4.652092138767284,3.9749083346382488,2.670491728732075,4.288963850685315,2.611021350450086,3.82642496820882,4.321692918355337,4.506741754271843,3.653885634828341,1.093463140548132,0.08831405842521733,1.4844235241583004,1.6745840626694009,2.7455014046877713,0.820596522284287,3.7447542615855376,0.951352767300987,0.3017068537058287,1.9468159759965975,4.612476498645181,4.683848195983398,4.654572894033729,1.8183438610711733,0.5252245677501011,4.706364113546581,3.2931588086549435,4.80873586059497,0.9687402009413848,2.613831728083702,2.869401937766333,2.3269190157142483,4.296437543658005,0.032945832173385536,1.5972097914898375,0.01013781719106377,3.8973700178512924,4.166302386594377,1.157124340905693,2.8182374024816284,2.686416009116015,3.45914368147458,4.3061025725216755,4.076115875623754],"beta":[4.546743150137667,1.0109579615313202,3.755867395084691,4.70301029272404,8.400521332139297,9.178531248372579,7.079066721257226,8.713809375144015,3.014904981717863,3.597594079241715,2.101126222431884,4.384024089189323,0.3397445927712983,8.390032399473117,3.5259817045818287,8.908267485574504,4.382948763624864,7.9952400847123055,4.795663270202648,7.782276099507017,1.7852775152686595,9.222354303898843,7.5862451341228665,0.33059116927032894,5.377177779655216,8.712598738180805,2.9481571243536386,6.779094904741574,5.437148006627006,2.741714684503793,7.9612776429310195,4.881989841780352,6.4942392442444685,1.347443115228908,7.737337836670514,0.0002509742651457536,7.0961955311198555,6.646536603309421,1.17870710855148,4.27241370806084,1.7511729784344898,6.658932594818934,8.759242391208033,2.7254675634639725,0.39219438833789644,0.07348828883840808,8.272746021618701,8.941228144277424,3.367133388019239,4.731715911339471,5.281058247581565,6.4626559230591285,6.30256973593772,7.9553067651114295,8.46664263106317,2.5646598169334145,2.855168666804977,8.961746569385298,1.4430935430401814,5.0240949865149975,4.780194855253102,3.8636702100554654,5.1511310577947445,2.7200359221087544,6.811412491343594,7.9064926919758705,0.0017131259439806534,1.3805585833802358,8.587799711935663,0.22945137567550677,3.218555486980139,0.20178297237206877,1.7296261377152655,3.2175649317306787,0.9417753742895818,6.659641549856879,4.070553788606928,1.107106211955291,6.27642733018811,2.4209252382406232,0.9409137846498639,2.0756118585667327,2.691000082673878,8.333585523871527,8.410869731509854,3.6257724419774084,1.3925953127777957,7.264524441547766,7.160531109648442,8.829659798610086,5.872682290507784,4.699824216062181,3.0364536421672983,8.90774967245963,1.8023872414103237,9.725209606065457,9.852170882596491,8.859641125352278,3.72348275948986,6.670465360992126,1.791548192489727,9.66564814625814,5.847508570814586,3.139366760218041,9.922164516885063,1.759866023158465,8.031834787569135,5.136351578722329,1.6447141337723448,0.40407690898824455,0.7505933676838028,9.455492641179218,0.7033305897192177,2.8923722980673405,8.906680980387204,3.610227781418054,2.4762423740994177,5.7174884329643945,0.49069258402592686,9.025196592593991,6.331348806815196,0.3045181381147133,4.267102110768926,1.1362896275829737,4.816133216797991,9.643584066279576,3.3271892098478273,7.285694196857547,4.379908986538201,7.224529138335313,7.0220222225065765,1.500949118848376,3.8305989040223465,9.417457047816853,8.256109173916022,9.68545062246498,4.806780084028601,7.838854572014622,3.137251814189259,7.541574379543647,0.009466750741686791,7.314748674167437,3.7964261721164982,5.056988630211352,5.52111404718241,3.1702001531030355,7.6837689091747,7.466633001605425,2.9730645159860325,4.509175512213883,6.46382091763865,2.568727977839327,8.33162076375633,9.667433846589105,7.232702322541393,7.993264118570515,0.5625577845254459,8.878196300849979,1.6344971722807466,0.38484388036766237,7.268748188431038,0.029572613527255598,1.7781972884602704,0.6240621440037564,9.50593771610875,8.895038785089772,6.323288916485319,8.079801581150301,3.020463616003062,2.8853258279346017,5.676360127015537,4.518935449700052,6.983014072220588,2.555682506094812,5.361069749611252,9.235971788416101,0.9343981235884802,9.460481040302772,6.825996724466994,9.767476295472687,6.408356250497578,8.867368848314602,1.0972812566638446,4.371727668964114,5.128488533625415,8.118124887059528,2.7620966943708303,7.611796790998762,3.811022321222366,3.7933740764703416,6.780744563028984,5.336513357027544,2.1548428432186695,9.40949187354736,3.701918061603391,8.916898500900176,6.603307790394699,4.193509605232024,5.867795186697455,4.14117674185287,9.992882415769294,8.296613810162324,8.616446758767601,1.6093520647695958,5.34709218762872,8.668410697047577,4.952523876028745,0.5831833665308195,6.769688573691002,0.4920306014425413,5.290591682904036,9.549452191398242,5.653301967125572,3.110603528621394,7.6065139308568614,5.660753164679262,6.407586132605532,6.535293738580775,7.991605442822268,0.5882419767387459,7.013624146105066,5.852202001407047,9.974528611698705,6.211837914305098,9.559115719408236,0.9913242645770937,9.973842944002033,6.321125627049408,2.9777220042318375,7.5943810826343805,0.7420742666710978,5.78146596697787,1.2627460059846252,4.452102248561369,2.671435235745716,0.19263459988162923,4.0146849183789435,0.5632322753938479,5.504169664879271,1.716479536956399,9.629362719224172,0.7175923819199004,7.612425350140118,8.205757671910106,0.14157300450949428,9.016343204579503,7.675742519408939,6.326085759758162,8.845280082027688,3.513619503070684,3.455153287574124,8.054604263603256,0.6626553964634074,4.354854006448345,1.239457172245546,4.972683862750813,3.90851396766152,4.843088918859881,6.974413894024433,0.5176885626041106,6.474737167997313,3.3525225749976717,5.765980147808807,8.243344966652181,6.277194684383014,5.905852714241657,0.766606091416413,4.003463179177398,8.463888566385968,1.2369811666943553,2.640763263444872,5.382681339780886,8.88337388401755,8.131185692961612,5.281093849392362,1.0227045206512342,0.828808505926184,4.849000973861259,9.135456421563164,3.9850752421544144,3.3804042139239643,7.304659731093047,7.444109136805772,6.519352673003502,4.58200396348134,2.9219634033748942,0.8927667732808842,0.8128113000236525,7.487165517751777,2.637938415669936,1.4774912418115282,3.2541609512540393,9.225452683975846,4.181532467769489,8.029398070156205,7.136863164822429,1.8961432228456476,9.437622757524828,5.607122044548722,3.6970339628528603,8.694527812558977,0.7917420072199643,7.675943589431171,5.516224797016999,1.0927046377150895,3.6915952191184354,7.751519899605698,2.938657404622007,7.315685488676637,0.6606242346224755,1.7295608209001534,9.378304013940937,8.244625465628257,6.651457985696352,4.244034476328908,2.1774541083463594,0.8898278429099649,2.571636389849521,7.994672662183364,1.7885374579816515,5.032057802598622,7.772379316981368,3.1078229163198046,9.446176894637306,6.052965660073033,4.68883471950913,3.460964735756653,9.210124638171502,8.946291873702934,4.390350487496654,5.933604547892413,1.4469131797602497,6.746705975381837,4.044843294741058,6.6185264511231745,5.670441288942132,7.280917729626091,4.19060508242201,3.105962472482835,9.911810250067676,9.101043382804226,4.7250917537636,5.9756890414085095,5.651575916018324,3.9797510011171844,2.3826626647851334,1.8426394555762293,0.5388302910172493,1.0381421364889398,0.47335910481093535,7.530756319046475,9.789091176321387,0.5773958178020933,3.407172186425571,2.3043759045427237,8.26570846794092,9.193239417792647,5.432357379231334,2.7586099028183764,9.686471961348724,6.906443255407108,2.9312278426847738,4.004497802292772,8.940081570163505,2.7038188320336554,7.556177509586521,0.7371756516527439,3.5770361464193123,4.595993055327132,6.518776059362745,0.09643641609975218,1.521596650820738,8.124373636887558,9.107828451936781,1.5433786790961679,3.955193689208063,8.430595911744103,9.606219424323134,0.3975117051469712,3.535231576291362,6.991720808579693,7.827629269559029,0.44941658219418423,0.9444185466524724,5.631238199838194,2.63929429793629,2.1907022043642876,5.551279235884737,0.17428931531660252,6.9406433021523295,6.168300711162886,7.4869077576243015,6.048124931965382,7.274381587621177,4.742836845973464,0.2908842499928088,7.6781183904819645,3.867306859957118,6.915434333990489,1.9893336212961454,9.0277547126363,6.403929410645556,2.5828978351247756,2.287113111585064,1.3984417783484604,1.528973099816937,0.022280920707433705,1.6665549021720039,5.389554569567139,5.344771930608935,6.93420413163766,6.1661004487146425,9.952241383884438,6.836753313828132,3.859123716578079,0.834993730271798,8.011317458944696,7.841941907202273,1.9602618791488857,1.9303152142948177,4.271256981546204,8.656769481133917,9.837372778240244,9.451043532551239,5.87346767335781,2.0847277023926236,4.578661529624348,6.1617965095237786,4.935190976426657,0.4875071029467781,6.920738311456027,0.7833994351336715,9.51343428119234,3.2883897504971293,7.873572555721258,2.3603589949575166,5.5717007228326,7.390514321074124,7.79706494042845,8.663188287646523,3.5996595153398103,3.8381714491299945,0.8312747060597547,7.086817546386516,3.2919625355484117,9.174765413921877,3.7380935638072943,6.242243488493067,0.8690549231308187,7.575864120952865,9.616677882454233,1.6651234263879622,4.507264260805172,3.181596583398427,1.8588909469285664,8.601129345023358,6.722811019020463,3.102613282863751,9.889308411142386,6.150154183921693,6.033932000058391,1.6056290186479183,1.8985562602754635,2.458871193743055,0.6143602827873429,0.46025980024572366,2.6093858428015215,3.740149735876148,9.1382827560812,5.3604357147532955,0.8157107807221364,7.731427790993239,0.7278823272379986,4.01418787949769,2.2448352445219566,2.540320637918021,3.88379084579882,2.304539385173252,5.64832887089225,8.324953271330418,6.312211797066938,6.413090976188814,7.4890453902503,2.2352152755133403,3.2259225365284516,4.714975628636648,1.287802850773223,8.470299311953589,6.134937953139403,5.543865648770579,2.3964179937708274,0.7761646797967647,9.649389248694325,3.3638987883867566,0.026482684041768678,7.195888158099402,1.186893748663158,5.002123306634347,2.6229483675765897,6.976439604932441,9.992230808028975,6.5433459509172724,8.892859399482768,9.228041914481981,0.07045934127229758,7.928636142189109,0.4984808408951191,0.6371606757598824,6.4160061293468935,7.339501562267117,0.6046682622239419,7.206664798284173,8.962167566346293,6.850215681891738,2.2443039848218382,5.286593825160935,1.8656984941396648,0.005755816191930219,8.767966724338274,9.65748515989512,3.4867489483943115,5.354514379946613,8.420112809685701,3.534312576648193,1.7112323050033007,8.027538037537983,2.5447268021512515,9.07092952508825,6.308427265104903,4.899467705286515,1.3149735634603732,4.86308656432562,2.8930826249474606,0.41186026898716976,8.928273241158372,2.033213468993864,8.46527625521998,4.232773335968069,1.0643738369389077,6.191322513207296,2.2889806415946,1.44750131118085,9.380016120715576,5.392319846547204,1.1223056546351429,2.392382326601321,5.952986388668002,7.401968665367811,6.511121390013019,8.934145637172513,5.230222822289779,4.452894398694973,8.492503661307218,3.2160578196310508,9.037224007439601,5.6100612344054035,4.969937900264869,5.8900339354367,0.5756525923071631,0.17083285040656815,6.874164325918864,5.731762335001216,6.9497901909482,0.9147958488693786,8.262790893261956,8.522098533871143,8.818690186730898,5.844941114400378,5.4539003917057265,3.907528566769194,7.5903527670666175,9.476695000594315,8.18925625834271,6.3881992285397775,9.60930699529558,7.484908989925081,0.8714515849050852,4.760792216194927,0.16516549992792617,2.988833229878427,4.042424657256449,4.012719413815429,9.353233543448237,1.8827778286884067,2.0841507212063326,5.889741530268655,6.505158340567729,9.8609875555763,6.953389203629358,0.24376700216114155,1.1066117600292191,7.718248221176218,9.760501108633445,3.5309603179353566,1.2906421856121408,0.7852780390580305,6.631800654888014,9.800351423305308,3.2855881036136148,8.463377925199616,7.404297985161012,9.41518791578696,1.2297273684238275,1.1618975518488184,9.016619421040646,2.0609241076090057,4.925965061519291,6.2036118462746455,9.07240026144612,0.2761949907525296,5.539327795151971,6.594833383026382,8.550227505010387,7.213923916741041,6.075149513754193,5.897758814569594,1.1993592088935112,2.618530017934806,7.727786795685518,5.803667593987896,0.7621270828407067,3.9903589367436854,9.433075534635602,3.985413451853459,4.110219388524074,8.884210553678342,4.217920947030159,0.7652753513802169,5.217291489521932,8.001169474693464,9.640695722344304,2.0507735997733056,0.8960457273761602,8.621564790631664,1.9689193207610822,8.045420744101257,8.11276744486019,0.4963037530349679,5.642436142084122,6.042963460611412,4.155280175879279,7.294512985309236,2.827479561228048,7.784442433785679,1.616023016006578,3.84215447783955,3.7538040308453358,4.923472152483585,6.872813868658342,7.909391884417216,4.813728385977312,9.520075741663714,7.13059973705195,1.2201425960252243,9.910429970956454,8.117236224641925,5.863374174991803,1.6338370845179706,4.117071686135995,2.1084570907029243,5.7972993386893235,2.22939581659654,6.74412738236283,9.8038417027869,7.166356092400137,1.156922559427187,2.5743498546366994,1.9742975962899845,0.7102706290509109,2.510568654554477,3.0093722646782095,1.9667013010359136,0.034082317710155685,7.9524747254346995,9.537391911711603,1.2780838737375322,3.214699650878996,6.373451026585036,2.64713034069183,2.194705858264736,1.2605409580807803,0.08750480979772268,8.337480426856452,7.148761586402337,9.551293623409872,8.41997157023405,6.9509339671395605,6.36659956583472,8.95503530559408,3.4729496945234084,7.640887132518546,0.8671040198275248,6.20946734787611,2.5904625909390067,7.873815583777304,7.42878083941382,6.611037805544195,5.42075706604868,4.574452981797828,4.39489213416036,1.199199472518102,4.3930651695442435,0.19453579137273191,7.326210834687872,6.4261829466621245,4.7402034749102135,6.130566448785492,4.02102933325152,7.7205657875487805,3.3459863706624415,0.678508168774774,5.370456313845979,9.387036206905254,1.1612367947215518,4.25606364865663,7.649147109926435,4.704998428170304,8.677859786007879,9.837769602887889,2.958107628254607,5.117235669252118,2.972780822144243,1.5703774205250576,8.444967394213915,1.926474592649512,3.1480926608424076,3.9169380397408826,2.6549445865875,7.0682865131061146,0.611744164387642,6.943661380339119,9.21774695539262,4.558378977610166,4.0567918113399415,5.920663473275873,6.32942920543599,4.090382341603278,6.9469893827240226,9.79250815188661,3.051421750829253,2.420314736083282,9.738104249331387,2.6764193537531122,4.037325746257707,1.840669207276009,8.309553391113646,8.53029379215309,7.707598846481423,7.116814699717644,3.816810935539532,7.30640759117585,3.560536013074076,4.8455552395480606,1.512924614161022,6.8472491646444595,4.670843316499152,4.093179806936407,1.1403347079160486,5.397136886217593,5.754193076144518,5.928834357982118,0.929779171538001,9.742741766258135,1.409007126776165,3.140885960232831,7.153766293172017,3.9695262892231953,5.95607925012597,9.9163090856608,0.8079426735617767,1.2891248940818345,0.8352384928039158,2.1010548710629218,7.654388355825892,7.777104204305585,8.942017015986055,3.238835569140126,0.2871126478567132,6.042830861686557,3.656612129035264,6.252429127819859,3.4260401614425318,3.8674761477480146,7.425661993314701,3.6842145702918994,1.3261391264455957,3.068926958605942,1.8675667340424695,1.4461880863345433,8.065023349570877,3.980706990529652,0.27531850487150233,8.841436850178589,3.699822639949928,6.820347234078232,3.6934727255786015,7.5518227572595915,7.3585251455392715,0.12065126211654009,3.4944773249203043,8.597419337381664,3.7369604000534284,2.156127809714359,8.001882200017798,4.308050241941997,7.669402987639778,9.662767081686033,5.799617023507738,5.025052804160928,7.306513791973996,6.318261347735876,0.10394273284515254,3.7867819727768692,3.107608117443086,9.56144841895668,1.8134523527162116,7.590763234010483,5.957190598898903,0.35134929268447745,2.271814270363577,7.503687094717688,7.228331485860369,9.399008341345667,6.216755228805391,5.719961756056604,3.6457576316749596,5.950676271216537,4.899011038752925,9.432948646855815,5.60741071037715,8.735072823273073,0.6277114022047625,9.918386745858431,7.683350972188265,0.3038884267145825,3.7184143236278677,7.800891567290895,3.52440515332602,3.4822832442837304,8.927695065640798,4.3963683934999125,9.790286793112868,4.251170835069722,6.293701873340587,8.32942188479295,3.6517390502298475,6.924129953892855,2.308643702252553,2.1599078935148652,5.20408768154172,1.7169763551020045,5.9870532265865,8.389312394945074,7.300101389822777,4.860340509964203,9.604667251004575,7.540421624868294,5.382827695201316,0.478255412236519,3.867200491388134,3.173653515965391,9.683855732153898,0.1138431269254303,8.49505857677783,2.1663918623560785,1.9196031806764768,6.92591603289207,7.995934580940636,9.771868931416474,6.15939799431948,5.38221155467046,4.847444420584077,4.869830009887237,3.800094085661645,1.4657817953639452,9.12365463692921,4.02850827362794,8.03670923898057,1.2852725666280085,6.218664552106283,0.3517168620658895,5.691222647425169,4.6134458609351086,9.597399587566116,8.574628856185535,3.290110543936322,2.4382791135219306,7.269515850325401,8.142955682359187,8.498162175901161,1.8452105195167445,3.9080727389478276,7.625687163592936,5.619096449404603,9.19634225939082,7.67761043649231,6.884200529174271,8.467113085391487,7.920145762949467,2.1101846767962718,5.722180410449971,6.682094126417349,1.324292902715154,6.710970556242062,1.2200976832634702,4.834909555209476,3.1269803699361765,8.1512766332864,2.505419107757587,8.288801020436765,9.290597548466131,8.379045349007434,3.310200393256766,3.184147049589572,1.8407256090025825,5.1343337224030305,7.471039785549259,1.2839421033233833,8.386843708150735,7.772089193423728,3.553027454435529,3.4253734444778483,0.04461784558501991,4.1550752137602505,0.753166208085545,0.02276688015746764,0.3554433862110784,2.3011468189359974,8.056054088941835,5.894812859005418,1.9224582615616148,3.201767571833658,4.274337205244835,3.129487408149423,9.195809809448168,9.759813459151328,7.7261860216847245,9.914194015229151,4.0753402428514285,8.78607083995011,2.5487146839878583,9.380387607682351,8.888715616653833,4.72756397012459,9.224788602003875,5.106764759599242,5.328078501700588,4.190734213470034,3.9808843043852593,5.807441443157943,3.398554537709557,7.027022883607243,4.618609659670197,4.00193987324603,9.154906518369783,5.221370887837471,9.37872781372739,5.0094293015750875,6.892028286772391,8.35215172664747,7.70296712654837,3.1238499348328808,4.521901250843571,1.4752720886881443,5.0066739740826005,4.831102571035599,2.866466361418656,9.626733181254533,5.480454340041632,5.031370515332847,5.200690189739536,8.499971046375045,6.349369638090736,6.796269496719514,7.002911530148093,3.904352281518082,6.263832745757735,0.4847427028505469,6.6989722673465035,8.246540569099196,5.233466836602794,9.18963174948567,1.0398504776023842,5.381098582123398,3.147028821927751,7.209934011229913,8.240932098545372,7.264628385250118,2.553835639170108,6.097968501807749,7.51807537218869,4.867769480506087,9.350376575277778,2.6938370404501,9.730959509098643,1.0242714282118492,6.769044895413396,5.036193423154563,1.5740768065095567,7.168182982572837]}
},{}],70:[function(require,module,exports){
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

var largeShape = require( './fixtures/julia/large_shape.json' );
var largeRate = require( './fixtures/julia/large_rate.json' );
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

tape( 'if provided `+infinity` for `x` and a finite `alpha` and `beta`, the function returns `1`', function test( t ) {
	var y = cdf( PINF, 0.5, 1.0 );
	t.equal( y, 1.0, 'returns 1' );
	t.end();
});

tape( 'if provided `-infinity` for `x` and a finite `alpha` and `beta`, the function returns `0`', function test( t ) {
	var y = cdf( NINF, 0.5, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided a negative `alpha`, the function returns `NaN`', function test( t ) {
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

tape( 'if provided a negative `beta`, the function returns `NaN`', function test( t ) {
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

tape( 'the function evaluates the cdf for `x` given large `alpha` and `beta`', function test( t ) {
	var expected;
	var delta;
	var alpha;
	var beta;
	var tol;
	var x;
	var y;
	var i;

	expected = bothLarge.expected;
	x = bothLarge.x;
	alpha = bothLarge.alpha;
	beta = bothLarge.beta;
	for ( i = 0; i < x.length; i++ ) {
		y = cdf( x[i], alpha[i], beta[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha:'+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 950.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the cdf for `x` given large shape parameter `alpha`', function test( t ) {
	var expected;
	var delta;
	var alpha;
	var beta;
	var tol;
	var i;
	var x;
	var y;

	expected = largeShape.expected;
	x = largeShape.x;
	alpha = largeShape.alpha;
	beta = largeShape.beta;
	for ( i = 0; i < x.length; i++ ) {
		y = cdf( x[i], alpha[i], beta[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha:'+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 400.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the cdf for `x` given large rate parameter `beta`', function test( t ) {
	var expected;
	var delta;
	var alpha;
	var beta;
	var tol;
	var i;
	var x;
	var y;

	expected = largeRate.expected;
	x = largeRate.x;
	alpha = largeRate.alpha;
	beta = largeRate.beta;
	for ( i = 0; i < x.length; i++ ) {
		y = cdf( x[i], alpha[i], beta[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha:'+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 350.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/invgamma/cdf/test/test.cdf.js")
},{"./../lib":66,"./fixtures/julia/both_large.json":67,"./fixtures/julia/large_rate.json":68,"./fixtures/julia/large_shape.json":69,"@stdlib/constants/math/float64-eps":28,"@stdlib/constants/math/float64-ninf":41,"@stdlib/constants/math/float64-pinf":43,"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/abs":74,"tape":311}],71:[function(require,module,exports){
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

var largeShape = require( './fixtures/julia/large_shape.json' );
var largeRate = require( './fixtures/julia/large_rate.json' );
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

tape( 'if provided a finite `alpha` and `beta`, the function returns a function which returns `1` when provided `+infinity` for `x`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.5, 1.0 );
	y = cdf( PINF );
	t.equal( y, 1.0, 'returns 1' );

	t.end();
});

tape( 'if provided a finite `alpha` and `beta`, the function returns a function which returns `0` when provided `-infinity` for `x`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.5, 1.0 );
	y = cdf( NINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a negative `beta`, the created function always returns `NaN`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.0, -1.0 );

	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( 0.0, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( PINF, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NINF, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a negative `alpha`, the created function always returns `NaN`', function test( t ) {
	var cdf;
	var y;

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

	cdf = factory( NINF, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NINF, NaN );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the cdf for `x` given large `alpha` and `beta`', function test( t ) {
	var expected;
	var delta;
	var alpha;
	var beta;
	var cdf;
	var tol;
	var i;
	var x;
	var y;

	expected = bothLarge.expected;
	x = bothLarge.x;
	alpha = bothLarge.alpha;
	beta = bothLarge.beta;
	for ( i = 0; i < x.length; i++ ) {
		cdf = factory( alpha[i], beta[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha:'+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 950.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the cdf for `x` given large shape parameter `alpha`', function test( t ) {
	var expected;
	var delta;
	var alpha;
	var beta;
	var cdf;
	var tol;
	var i;
	var x;
	var y;

	expected = largeShape.expected;
	x = largeShape.x;
	alpha = largeShape.alpha;
	beta = largeShape.beta;
	for ( i = 0; i < x.length; i++ ) {
		cdf = factory( alpha[i], beta[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha:'+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 400.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the cdf for `x` given large rate parameter `beta`', function test( t ) {
	var expected;
	var delta;
	var alpha;
	var beta;
	var cdf;
	var tol;
	var i;
	var x;
	var y;

	expected = largeRate.expected;
	x = largeRate.x;
	alpha = largeRate.alpha;
	beta = largeRate.beta;
	for ( i = 0; i < x.length; i++ ) {
		cdf = factory( alpha[i], beta[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha:'+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 350.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/invgamma/cdf/test/test.factory.js")
},{"./../lib/factory.js":65,"./fixtures/julia/both_large.json":67,"./fixtures/julia/large_rate.json":68,"./fixtures/julia/large_shape.json":69,"@stdlib/constants/math/float64-eps":28,"@stdlib/constants/math/float64-ninf":41,"@stdlib/constants/math/float64-pinf":43,"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/abs":74,"tape":311}],72:[function(require,module,exports){
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

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/invgamma/cdf/test/test.js")
},{"./../lib":66,"tape":311}],73:[function(require,module,exports){
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

},{}],74:[function(require,module,exports){
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

},{"./abs.js":73}],75:[function(require,module,exports){
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

},{}],76:[function(require,module,exports){
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

},{"./ceil.js":75}],77:[function(require,module,exports){
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

},{"@stdlib/number/float64/base/from-words":205,"@stdlib/number/float64/base/get-high-word":209,"@stdlib/number/float64/base/to-words":223}],78:[function(require,module,exports){
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

},{"./copysign.js":77}],79:[function(require,module,exports){
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

},{"@stdlib/math/base/special/kernel-cos":149,"@stdlib/math/base/special/kernel-sin":153,"@stdlib/math/base/special/rempio2":181,"@stdlib/number/float64/base/get-high-word":209}],80:[function(require,module,exports){
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

},{"./cos.js":79}],81:[function(require,module,exports){
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

},{"./polyval_pa.js":83,"./polyval_pp.js":84,"./polyval_qa.js":85,"./polyval_qq.js":86,"./polyval_ra.js":87,"./polyval_rb.js":88,"./polyval_sa.js":89,"./polyval_sb.js":90,"@stdlib/constants/math/float64-ninf":41,"@stdlib/constants/math/float64-pinf":43,"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/exp":93,"@stdlib/number/float64/base/set-low-word":220}],82:[function(require,module,exports){
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

},{"./erfc.js":81}],83:[function(require,module,exports){
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

},{}],84:[function(require,module,exports){
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

},{}],85:[function(require,module,exports){
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

},{}],86:[function(require,module,exports){
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

},{}],87:[function(require,module,exports){
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

},{}],88:[function(require,module,exports){
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

},{}],89:[function(require,module,exports){
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

},{}],90:[function(require,module,exports){
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

},{}],91:[function(require,module,exports){
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

},{"./expmulti.js":92,"@stdlib/constants/math/float64-ninf":41,"@stdlib/constants/math/float64-pinf":43,"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/trunc":192}],92:[function(require,module,exports){
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

},{"./polyval_p.js":94,"@stdlib/math/base/special/ldexp":155}],93:[function(require,module,exports){
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

},{"./exp.js":91}],94:[function(require,module,exports){
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

},{}],95:[function(require,module,exports){
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

},{"./polyval_q.js":97,"@stdlib/constants/math/float64-exponent-bias":30,"@stdlib/constants/math/float64-half-ln-two":32,"@stdlib/constants/math/float64-ninf":41,"@stdlib/constants/math/float64-pinf":43,"@stdlib/math/base/assert/is-nan":56,"@stdlib/number/float64/base/get-high-word":209,"@stdlib/number/float64/base/set-high-word":218}],96:[function(require,module,exports){
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

},{"./expm1.js":95}],97:[function(require,module,exports){
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

},{}],98:[function(require,module,exports){
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

},{}],99:[function(require,module,exports){
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

},{"./floor.js":98}],100:[function(require,module,exports){
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

},{"./rational_pq.js":102}],101:[function(require,module,exports){
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

},{"./gamma_lanczos_sum_expg_scaled.js":100}],102:[function(require,module,exports){
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

},{}],103:[function(require,module,exports){
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

},{"./rational_pq.js":106,"./small_approximation.js":107,"./stirling_approximation.js":108,"@stdlib/constants/math/float64-ninf":41,"@stdlib/constants/math/float64-pi":42,"@stdlib/constants/math/float64-pinf":43,"@stdlib/math/base/assert/is-integer":54,"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/assert/is-negative-zero":58,"@stdlib/math/base/special/abs":74,"@stdlib/math/base/special/floor":99,"@stdlib/math/base/special/sin":187}],104:[function(require,module,exports){
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

},{"./gamma.js":103}],105:[function(require,module,exports){
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

},{}],106:[function(require,module,exports){
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

},{}],107:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-eulergamma":29}],108:[function(require,module,exports){
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

},{"./polyval_s.js":105,"@stdlib/constants/math/float64-sqrt-two-pi":46,"@stdlib/math/base/special/exp":93,"@stdlib/math/base/special/pow":168}],109:[function(require,module,exports){
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

},{"./lgamma_small_imp.js":111,"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/expm1":96,"@stdlib/math/base/special/gamma":104,"@stdlib/math/base/special/log1p":161}],110:[function(require,module,exports){
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

},{"./gamma1pm1.js":109}],111:[function(require,module,exports){
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

},{"./rational_p1q1.js":112,"./rational_p2q2.js":113,"./rational_p3q3.js":114,"@stdlib/constants/math/float64-eps":28,"@stdlib/math/base/special/ln":157}],112:[function(require,module,exports){
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

},{}],113:[function(require,module,exports){
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

},{}],114:[function(require,module,exports){
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

},{}],115:[function(require,module,exports){
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

},{"@stdlib/math/base/special/exp":93}],116:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-pi":42,"@stdlib/math/base/special/erfc":82,"@stdlib/math/base/special/exp":93,"@stdlib/math/base/special/sqrt":191}],117:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-max-ln":37,"@stdlib/constants/math/float64-min-ln":40,"@stdlib/math/base/special/exp":93,"@stdlib/math/base/special/ln":157,"@stdlib/math/base/special/pow":168}],118:[function(require,module,exports){
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

},{"./finite_gamma_q.js":115,"./finite_half_gamma_q.js":116,"./full_igamma_prefix.js":117,"./igamma_temme_large.js":119,"./lower_gamma_series.js":121,"./regularised_gamma_prefix.js":132,"./tgamma_small_upper_part.js":134,"./upper_gamma_fraction.js":135,"@stdlib/constants/math/float64-max":38,"@stdlib/constants/math/float64-max-ln":37,"@stdlib/constants/math/float64-pinf":43,"@stdlib/constants/math/float64-sqrt-eps":45,"@stdlib/constants/math/float64-sqrt-two-pi":46,"@stdlib/math/base/special/abs":74,"@stdlib/math/base/special/exp":93,"@stdlib/math/base/special/floor":99,"@stdlib/math/base/special/gamma":104,"@stdlib/math/base/special/gammaln":138,"@stdlib/math/base/special/ln":157,"@stdlib/math/base/special/pow":168}],119:[function(require,module,exports){
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

},{"./polyval_c0.js":123,"./polyval_c1.js":124,"./polyval_c2.js":125,"./polyval_c3.js":126,"./polyval_c4.js":127,"./polyval_c5.js":128,"./polyval_c6.js":129,"./polyval_c7.js":130,"./polyval_c8.js":131,"@stdlib/constants/math/float64-pi":42,"@stdlib/math/base/special/erfc":82,"@stdlib/math/base/special/exp":93,"@stdlib/math/base/special/ln":157,"@stdlib/math/base/special/sqrt":191,"@stdlib/math/base/tools/evalpoly":199}],120:[function(require,module,exports){
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

},{"./gammainc.js":118}],121:[function(require,module,exports){
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

},{"./lower_incomplete_gamma_series":122,"@stdlib/math/base/tools/sum-series":202}],122:[function(require,module,exports){
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

},{}],123:[function(require,module,exports){
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

},{}],124:[function(require,module,exports){
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

},{}],125:[function(require,module,exports){
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

},{}],126:[function(require,module,exports){
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

},{}],127:[function(require,module,exports){
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

},{}],128:[function(require,module,exports){
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

},{}],129:[function(require,module,exports){
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

},{}],130:[function(require,module,exports){
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

},{}],131:[function(require,module,exports){
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

},{}],132:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-e":27,"@stdlib/constants/math/float64-gamma-lanczos-g":31,"@stdlib/constants/math/float64-max-ln":37,"@stdlib/constants/math/float64-min-ln":40,"@stdlib/math/base/special/abs":74,"@stdlib/math/base/special/exp":93,"@stdlib/math/base/special/gamma":104,"@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled":101,"@stdlib/math/base/special/gammaln":138,"@stdlib/math/base/special/ln":157,"@stdlib/math/base/special/log1p":161,"@stdlib/math/base/special/max":164,"@stdlib/math/base/special/min":166,"@stdlib/math/base/special/pow":168,"@stdlib/math/base/special/sqrt":191}],133:[function(require,module,exports){
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

},{}],134:[function(require,module,exports){
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

},{"./small_gamma2_series.js":133,"@stdlib/math/base/special/gamma1pm1":110,"@stdlib/math/base/special/powm1":179,"@stdlib/math/base/tools/sum-series":202}],135:[function(require,module,exports){
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

},{"./upper_incomplete_gamma_fract":136,"@stdlib/math/base/tools/continued-fraction":196}],136:[function(require,module,exports){
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

},{}],137:[function(require,module,exports){
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

},{"./polyval_a1.js":139,"./polyval_a2.js":140,"./polyval_r.js":141,"./polyval_s.js":142,"./polyval_t1.js":143,"./polyval_t2.js":144,"./polyval_t3.js":145,"./polyval_u.js":146,"./polyval_v.js":147,"./polyval_w.js":148,"@stdlib/constants/math/float64-pi":42,"@stdlib/constants/math/float64-pinf":43,"@stdlib/math/base/assert/is-infinite":52,"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/abs":74,"@stdlib/math/base/special/ln":157,"@stdlib/math/base/special/sinpi":189,"@stdlib/math/base/special/trunc":192}],138:[function(require,module,exports){
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

},{"./gammaln.js":137}],139:[function(require,module,exports){
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

},{}],140:[function(require,module,exports){
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

},{}],141:[function(require,module,exports){
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

},{}],142:[function(require,module,exports){
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

},{}],143:[function(require,module,exports){
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

},{}],144:[function(require,module,exports){
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

},{}],145:[function(require,module,exports){
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
		return 0.6328270640250934;
	}
	return 0.6328270640250934 + (x * (1.4549225013723477 + (x * (0.9777175279633727 + (x * (0.22896372806469245 + (x * 0.013381091853678766))))))); // eslint-disable-line max-len
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
		return 2.4559779371304113;
	}
	return 2.4559779371304113 + (x * (2.128489763798934 + (x * (0.7692851504566728 + (x * (0.10422264559336913 + (x * 0.003217092422824239))))))); // eslint-disable-line max-len
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
		return 0.08333333333333297;
	}
	return 0.08333333333333297 + (x * (-0.0027777777772877554 + (x * (0.0007936505586430196 + (x * (-0.00059518755745034 + (x * (0.0008363399189962821 + (x * -0.0016309293409657527))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],149:[function(require,module,exports){
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

},{"./kernel_cos.js":150}],150:[function(require,module,exports){
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

},{"./polyval_c13.js":151,"./polyval_c46.js":152}],151:[function(require,module,exports){
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
		return -2.7557314351390663e-7;
	}
	return -2.7557314351390663e-7 + (x * (2.087572321298175e-9 + (x * -1.1359647557788195e-11))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],153:[function(require,module,exports){
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

},{"./kernel_sin.js":154}],154:[function(require,module,exports){
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

},{}],155:[function(require,module,exports){
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

},{"./ldexp.js":156}],156:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-exponent-bias":30,"@stdlib/constants/math/float64-max-base2-exponent":36,"@stdlib/constants/math/float64-max-base2-exponent-subnormal":35,"@stdlib/constants/math/float64-min-base2-exponent-subnormal":39,"@stdlib/constants/math/float64-ninf":41,"@stdlib/constants/math/float64-pinf":43,"@stdlib/math/base/assert/is-infinite":52,"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/copysign":78,"@stdlib/number/float64/base/exponent":203,"@stdlib/number/float64/base/from-words":205,"@stdlib/number/float64/base/normalize":214,"@stdlib/number/float64/base/to-words":223}],157:[function(require,module,exports){
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

},{"./ln.js":158}],158:[function(require,module,exports){
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

},{"./polyval_p.js":159,"./polyval_q.js":160,"@stdlib/constants/math/float64-exponent-bias":30,"@stdlib/constants/math/float64-ninf":41,"@stdlib/math/base/assert/is-nan":56,"@stdlib/number/float64/base/get-high-word":209,"@stdlib/number/float64/base/set-high-word":218}],159:[function(require,module,exports){
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

},{}],160:[function(require,module,exports){
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

},{}],161:[function(require,module,exports){
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

},{"./log1p.js":162}],162:[function(require,module,exports){
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

},{"./polyval_lp.js":163,"@stdlib/constants/math/float64-exponent-bias":30,"@stdlib/constants/math/float64-ninf":41,"@stdlib/constants/math/float64-pinf":43,"@stdlib/math/base/assert/is-nan":56,"@stdlib/number/float64/base/get-high-word":209,"@stdlib/number/float64/base/set-high-word":218}],163:[function(require,module,exports){
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

},{}],164:[function(require,module,exports){
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

},{"./max.js":165}],165:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-ninf":41,"@stdlib/constants/math/float64-pinf":43,"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/assert/is-positive-zero":62}],166:[function(require,module,exports){
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

},{"./min.js":167}],167:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-ninf":41,"@stdlib/constants/math/float64-pinf":43,"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/assert/is-negative-zero":58}],168:[function(require,module,exports){
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

},{"./pow.js":174}],169:[function(require,module,exports){
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

},{"./polyval_l.js":171,"@stdlib/constants/math/float64-exponent-bias":30,"@stdlib/number/float64/base/get-high-word":209,"@stdlib/number/float64/base/set-high-word":218,"@stdlib/number/float64/base/set-low-word":220}],170:[function(require,module,exports){
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

},{"./polyval_w.js":173,"@stdlib/number/float64/base/set-low-word":220}],171:[function(require,module,exports){
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

},{}],172:[function(require,module,exports){
arguments[4][94][0].apply(exports,arguments)
},{"dup":94}],173:[function(require,module,exports){
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

},{}],174:[function(require,module,exports){
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

},{"./log2ax.js":169,"./logx.js":170,"./pow2.js":175,"./x_is_zero.js":176,"./y_is_huge.js":177,"./y_is_infinite.js":178,"@stdlib/constants/math/float64-ninf":41,"@stdlib/constants/math/float64-pinf":43,"@stdlib/math/base/assert/is-infinite":52,"@stdlib/math/base/assert/is-integer":54,"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/assert/is-odd":60,"@stdlib/math/base/special/abs":74,"@stdlib/math/base/special/sqrt":191,"@stdlib/number/float64/base/set-low-word":220,"@stdlib/number/float64/base/to-words":223,"@stdlib/number/uint32/base/to-int32":227}],175:[function(require,module,exports){
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

},{"./polyval_p.js":172,"@stdlib/constants/math/float64-exponent-bias":30,"@stdlib/constants/math/float64-ln-two":34,"@stdlib/math/base/special/ldexp":155,"@stdlib/number/float64/base/get-high-word":209,"@stdlib/number/float64/base/set-high-word":218,"@stdlib/number/float64/base/set-low-word":220,"@stdlib/number/uint32/base/to-int32":227}],176:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-ninf":41,"@stdlib/constants/math/float64-pinf":43,"@stdlib/math/base/assert/is-odd":60,"@stdlib/math/base/special/copysign":78}],177:[function(require,module,exports){
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

},{"@stdlib/number/float64/base/get-high-word":209}],178:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-pinf":43,"@stdlib/math/base/special/abs":74}],179:[function(require,module,exports){
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

},{"./powm1.js":180}],180:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/abs":74,"@stdlib/math/base/special/expm1":96,"@stdlib/math/base/special/ln":157,"@stdlib/math/base/special/pow":168,"@stdlib/math/base/special/trunc":192}],181:[function(require,module,exports){
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

},{"./rempio2.js":183}],182:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":99,"@stdlib/math/base/special/ldexp":155}],183:[function(require,module,exports){
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

},{"./kernel_rempio2.js":182,"./rempio2_medium.js":184,"@stdlib/number/float64/base/from-words":205,"@stdlib/number/float64/base/get-high-word":209,"@stdlib/number/float64/base/get-low-word":211}],184:[function(require,module,exports){
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

},{"@stdlib/math/base/special/round":185,"@stdlib/number/float64/base/get-high-word":209}],185:[function(require,module,exports){
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

},{"./round.js":186}],186:[function(require,module,exports){
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

},{}],187:[function(require,module,exports){
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

},{"./sin.js":188}],188:[function(require,module,exports){
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

},{"@stdlib/math/base/special/kernel-cos":149,"@stdlib/math/base/special/kernel-sin":153,"@stdlib/math/base/special/rempio2":181,"@stdlib/number/float64/base/get-high-word":209}],189:[function(require,module,exports){
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

},{"./sinpi.js":190}],190:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-pi":42,"@stdlib/math/base/assert/is-infinite":52,"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/abs":74,"@stdlib/math/base/special/copysign":78,"@stdlib/math/base/special/cos":80,"@stdlib/math/base/special/sin":187}],191:[function(require,module,exports){
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

},{}],192:[function(require,module,exports){
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

},{"./trunc.js":193}],193:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ceil":76,"@stdlib/math/base/special/floor":99}],194:[function(require,module,exports){
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

},{"@stdlib/constants/math/float32-smallest-normal":26,"@stdlib/constants/math/float64-eps":28,"@stdlib/math/base/special/abs":74}],195:[function(require,module,exports){
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

},{"@stdlib/constants/math/float32-smallest-normal":26,"@stdlib/constants/math/float64-eps":28,"@stdlib/math/base/special/abs":74}],196:[function(require,module,exports){
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

},{"./basic.js":194,"./generators.js":195,"@stdlib/utils/detect-generator-support":237}],197:[function(require,module,exports){
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

},{}],198:[function(require,module,exports){
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

},{"./evalpoly.js":197}],199:[function(require,module,exports){
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

},{"./evalpoly.js":197,"./factory.js":198,"@stdlib/utils/define-read-only-property":232}],200:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-eps":28,"@stdlib/math/base/special/abs":74}],201:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-eps":28,"@stdlib/math/base/special/abs":74}],202:[function(require,module,exports){
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

},{"./basic.js":200,"./generators.js":201,"@stdlib/utils/detect-generator-support":237}],203:[function(require,module,exports){
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

},{"./main.js":204}],204:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-exponent-bias":30,"@stdlib/constants/math/float64-high-word-exponent-mask":33,"@stdlib/number/float64/base/get-high-word":209}],205:[function(require,module,exports){
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

},{"./main.js":207}],206:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":18}],207:[function(require,module,exports){
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

},{"./indices.js":206,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],208:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":18}],209:[function(require,module,exports){
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

},{"./main.js":210}],210:[function(require,module,exports){
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

},{"./high.js":208,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],211:[function(require,module,exports){
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

},{"./main.js":213}],212:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":18}],213:[function(require,module,exports){
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

},{"./low.js":212,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],214:[function(require,module,exports){
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

},{"./main.js":215}],215:[function(require,module,exports){
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

},{"./normalize.js":216}],216:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-smallest-normal":44,"@stdlib/math/base/assert/is-infinite":52,"@stdlib/math/base/assert/is-nan":56,"@stdlib/math/base/special/abs":74}],217:[function(require,module,exports){
arguments[4][208][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":18,"dup":208}],218:[function(require,module,exports){
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

},{"./main.js":219}],219:[function(require,module,exports){
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

},{"./high.js":217,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],220:[function(require,module,exports){
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

},{"./main.js":222}],221:[function(require,module,exports){
arguments[4][212][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":18,"dup":212}],222:[function(require,module,exports){
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

},{"./low.js":221,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],223:[function(require,module,exports){
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

},{"./main.js":225}],224:[function(require,module,exports){
arguments[4][206][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":18,"dup":206}],225:[function(require,module,exports){
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

},{"./to_words.js":226}],226:[function(require,module,exports){
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

},{"./indices.js":224,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],227:[function(require,module,exports){
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

},{"./main.js":228}],228:[function(require,module,exports){
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

},{}],229:[function(require,module,exports){
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

},{}],230:[function(require,module,exports){
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

},{"./constant_function.js":229}],231:[function(require,module,exports){
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

},{}],232:[function(require,module,exports){
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

},{"./define_read_only_property.js":231}],233:[function(require,module,exports){
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

},{"./float64array.js":234,"@stdlib/assert/is-float64array":15}],234:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Float64Array === 'function' ) ? Float64Array : null;

},{}],235:[function(require,module,exports){
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

},{"./detect_float64array_support.js":233}],236:[function(require,module,exports){
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

},{"@stdlib/utils/eval":251}],237:[function(require,module,exports){
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

},{"./detect_generator_support.js":236}],238:[function(require,module,exports){
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

},{}],239:[function(require,module,exports){
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

},{"./detect_symbol_support.js":238}],240:[function(require,module,exports){
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

},{"@stdlib/utils/detect-symbol-support":239}],241:[function(require,module,exports){
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

},{"./has_tostringtag_support.js":240}],242:[function(require,module,exports){
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

},{"./uint16array.js":244,"@stdlib/assert/is-uint16array":20,"@stdlib/constants/math/uint16-max":47}],243:[function(require,module,exports){
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

},{"./detect_uint16array_support.js":242}],244:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint16Array === 'function' ) ? Uint16Array : null;

},{}],245:[function(require,module,exports){
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

},{"./uint32array.js":247,"@stdlib/assert/is-uint32array":22,"@stdlib/constants/math/uint32-max":48}],246:[function(require,module,exports){
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

},{"./detect_uint32array_support.js":245}],247:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint32Array === 'function' ) ? Uint32Array : null;

},{}],248:[function(require,module,exports){
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

},{"./uint8array.js":250,"@stdlib/assert/is-uint8array":24,"@stdlib/constants/math/uint8-max":49}],249:[function(require,module,exports){
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

},{"./detect_uint8array_support.js":248}],250:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint8Array === 'function' ) ? Uint8Array : null;

},{}],251:[function(require,module,exports){
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

},{}],252:[function(require,module,exports){
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

},{"./native_class.js":253,"./polyfill.js":254,"@stdlib/utils/detect-tostringtag-support":241}],253:[function(require,module,exports){
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

},{"./tostring.js":255}],254:[function(require,module,exports){
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

},{"./tostring.js":255,"./tostringtag.js":256,"@stdlib/assert/has-own-property":14}],255:[function(require,module,exports){
'use strict';

// MAIN //

var toStr = Object.prototype.toString;


// EXPORTS //

module.exports = toStr;

},{}],256:[function(require,module,exports){
'use strict';

// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{}],257:[function(require,module,exports){
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

},{}],258:[function(require,module,exports){

},{}],259:[function(require,module,exports){
arguments[4][258][0].apply(exports,arguments)
},{"dup":258}],260:[function(require,module,exports){
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

},{}],261:[function(require,module,exports){
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

},{"base64-js":257,"ieee754":280}],262:[function(require,module,exports){
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
},{"../../is-buffer/index.js":282}],263:[function(require,module,exports){
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

},{"./lib/is_arguments.js":264,"./lib/keys.js":265}],264:[function(require,module,exports){
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

},{}],265:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],266:[function(require,module,exports){
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

},{"foreach":276,"object-keys":286}],267:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],268:[function(require,module,exports){
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

},{"./helpers/isFinite":269,"./helpers/isNaN":270,"./helpers/mod":271,"./helpers/sign":272,"es-to-primitive/es5":273,"has":279,"is-callable":283}],269:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],270:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],271:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],272:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],273:[function(require,module,exports){
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

},{"./helpers/isPrimitive":274,"is-callable":283}],274:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],275:[function(require,module,exports){
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

},{}],276:[function(require,module,exports){

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


},{}],277:[function(require,module,exports){
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

},{}],278:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":277}],279:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":278}],280:[function(require,module,exports){
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

},{}],281:[function(require,module,exports){
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

},{}],282:[function(require,module,exports){
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

},{}],283:[function(require,module,exports){
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

},{}],284:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],285:[function(require,module,exports){
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

},{}],286:[function(require,module,exports){
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

},{"./isArguments":287}],287:[function(require,module,exports){
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

},{}],288:[function(require,module,exports){
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
},{"_process":260}],289:[function(require,module,exports){
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
},{"_process":260}],290:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":291}],291:[function(require,module,exports){
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
},{"./_stream_readable":293,"./_stream_writable":295,"core-util-is":262,"inherits":281,"process-nextick-args":289}],292:[function(require,module,exports){
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
},{"./_stream_transform":294,"core-util-is":262,"inherits":281}],293:[function(require,module,exports){
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
},{"./_stream_duplex":291,"./internal/streams/BufferList":296,"./internal/streams/destroy":297,"./internal/streams/stream":298,"_process":260,"core-util-is":262,"events":275,"inherits":281,"isarray":284,"process-nextick-args":289,"safe-buffer":304,"string_decoder/":310,"util":258}],294:[function(require,module,exports){
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
},{"./_stream_duplex":291,"core-util-is":262,"inherits":281}],295:[function(require,module,exports){
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
},{"./_stream_duplex":291,"./internal/streams/destroy":297,"./internal/streams/stream":298,"_process":260,"core-util-is":262,"inherits":281,"process-nextick-args":289,"safe-buffer":304,"util-deprecate":317}],296:[function(require,module,exports){
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
},{"safe-buffer":304}],297:[function(require,module,exports){
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
},{"process-nextick-args":289}],298:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":275}],299:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":300}],300:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":291,"./lib/_stream_passthrough.js":292,"./lib/_stream_readable.js":293,"./lib/_stream_transform.js":294,"./lib/_stream_writable.js":295}],301:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":300}],302:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":295}],303:[function(require,module,exports){
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
},{"_process":260,"through":316}],304:[function(require,module,exports){
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

},{"buffer":261}],305:[function(require,module,exports){
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

},{"events":275,"inherits":281,"readable-stream/duplex.js":290,"readable-stream/passthrough.js":299,"readable-stream/readable.js":300,"readable-stream/transform.js":301,"readable-stream/writable.js":302}],306:[function(require,module,exports){
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

},{"es-abstract/es5":268,"function-bind":278}],307:[function(require,module,exports){
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

},{"./implementation":306,"./polyfill":308,"./shim":309,"define-properties":266,"function-bind":278}],308:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":306}],309:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":308,"define-properties":266}],310:[function(require,module,exports){
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
},{"safe-buffer":304}],311:[function(require,module,exports){
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
},{"./lib/default_stream":312,"./lib/results":314,"./lib/test":315,"_process":260,"defined":267,"through":316}],312:[function(require,module,exports){
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
},{"_process":260,"fs":259,"through":316}],313:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":260}],314:[function(require,module,exports){
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
},{"_process":260,"events":275,"function-bind":278,"has":279,"inherits":281,"object-inspect":285,"resumer":303,"through":316}],315:[function(require,module,exports){
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
},{"./next_tick":313,"deep-equal":263,"defined":267,"events":275,"has":279,"inherits":281,"path":288,"string.prototype.trim":307}],316:[function(require,module,exports){
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
},{"_process":260,"stream":305}],317:[function(require,module,exports){
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
},{}]},{},[70,71,72]);