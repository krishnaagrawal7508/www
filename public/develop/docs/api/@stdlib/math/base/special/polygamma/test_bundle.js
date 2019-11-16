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

},{"./float64array.js":1,"./polyfill.js":3,"@stdlib/utils/detect-float64array-support":243}],3:[function(require,module,exports){
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

},{"./polyfill.js":5,"./uint16array.js":6,"@stdlib/utils/detect-uint16array-support":249}],5:[function(require,module,exports){
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

},{"./polyfill.js":8,"./uint32array.js":9,"@stdlib/utils/detect-uint32array-support":252}],8:[function(require,module,exports){
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

},{"./polyfill.js":11,"./uint8array.js":12,"@stdlib/utils/detect-uint8array-support":255}],11:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":257}],17:[function(require,module,exports){
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

},{"./object.js":22,"./primitive.js":23}],21:[function(require,module,exports){
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
* // Use interface to check for `NaN` primitives...
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
* // Use interface to check for `NaN` objects...
* var isnan = require( '@stdlib/assert/is-nan' ).isObject;
*
* var bool = isnan( NaN );
* // returns false
*
* bool = isnan( new Number( NaN ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isnan = require( './generic.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isnan, 'isPrimitive', isPrimitive );
setReadOnly( isnan, 'isObject', isObject );


// EXPORTS //

module.exports = isnan;

},{"./generic.js":20,"./object.js":22,"./primitive.js":23,"@stdlib/utils/define-read-only-property":240}],22:[function(require,module,exports){
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

},{"@stdlib/assert/is-number":25,"@stdlib/math/base/assert/is-nan":66}],23:[function(require,module,exports){
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

},{"@stdlib/assert/is-number":25,"@stdlib/math/base/assert/is-nan":66}],24:[function(require,module,exports){
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
* bool = isNumber( new Number( 3.14 ) );
* // returns true
*
* @example
* bool = isNumber( NaN );
* // returns true
*
* @example
* bool = isNumber( null );
* // returns false
*/
function isNumber( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
}


// EXPORTS //

module.exports = isNumber;

},{"./object.js":26,"./primitive.js":27}],25:[function(require,module,exports){
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
* // Use interface to check for number primitives...
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
* // Use interface to check for number objects...
* var isNumber = require( '@stdlib/assert/is-number' ).isObject;
*
* var bool = isNumber( 3.14 );
* // returns false
*
* bool = isNumber( new Number( 3.14 ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isNumber = require( './generic.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isNumber, 'isPrimitive', isPrimitive );
setReadOnly( isNumber, 'isObject', isObject );


// EXPORTS //

module.exports = isNumber;

},{"./generic.js":24,"./object.js":26,"./primitive.js":27,"@stdlib/utils/define-read-only-property":240}],26:[function(require,module,exports){
'use strict';

// MODULES //

var hasToStringTag = require( '@stdlib/utils/detect-tostringtag-support' )();
var nativeClass = require( '@stdlib/utils/native-class' );
var test = require( './try2serialize.js' );


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
		if ( hasToStringTag ) {
			return test( value );
		}
		return ( nativeClass( value ) === '[object Number]' );
	}
	return false;
}


// EXPORTS //

module.exports = isNumber;

},{"./try2serialize.js":29,"@stdlib/utils/detect-tostringtag-support":247,"@stdlib/utils/native-class":257}],27:[function(require,module,exports){
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

},{}],28:[function(require,module,exports){
'use strict';

// eslint-disable-next-line stdlib/no-redeclare
var toString = Number.prototype.toString; // non-generic


// EXPORTS //

module.exports = toString;

},{}],29:[function(require,module,exports){
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

},{"./tostring.js":28}],30:[function(require,module,exports){
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

},{"./is_uint16array.js":31}],31:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":257}],32:[function(require,module,exports){
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

},{"./is_uint32array.js":33}],33:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":257}],34:[function(require,module,exports){
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

},{"./is_uint8array.js":35}],35:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":257}],36:[function(require,module,exports){
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

},{}],37:[function(require,module,exports){
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

},{}],38:[function(require,module,exports){
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

},{}],39:[function(require,module,exports){
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

},{}],40:[function(require,module,exports){
'use strict';

/**
* Natural logarithm of the mathematical constant `π`.
*
* @module @stdlib/constants/math/float64-ln-pi
* @type {number}
*
* @example
* var LN_PI = require( '@stdlib/constants/math/float64-ln-pi' );
* // returns 1.1447298858494002
*/


// MAIN //

/**
* Natural logarithm of the mathematical constant `π`.
*
* @constant
* @type {number}
* @default 1.1447298858494002
* @see [Wikipedia]{@link https://en.wikipedia.org/wiki/Pi}
*/
var LN_PI = 1.1447298858494002;


// EXPORTS //

module.exports = LN_PI;

},{}],41:[function(require,module,exports){
'use strict';

/**
* Natural logarithm of the square root of `2π`.
*
* @module @stdlib/constants/math/float64-ln-sqrt-two-pi
* @type {number}
*
* @example
* var LN_SQRT_TWO_PI = require( '@stdlib/constants/math/float64-ln-sqrt-two-pi' );
* // returns 0.9189385332046728
*/


// MAIN //

/**
* Natural logarithm of the square root of `2π`.
*
* ```tex
* \ln \sqrt{2\pi}
* ```
*
* @constant
* @type {number}
* @default 0.9189385332046728
*/
var LN_SQRT_TWO_PI = 9.18938533204672741780329736405617639861397473637783412817151540482765695927260397694743298635954197622005646625e-01; // eslint-disable-line max-len


// EXPORTS //

module.exports = LN_SQRT_TWO_PI;

},{}],42:[function(require,module,exports){
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

},{}],43:[function(require,module,exports){
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

},{}],44:[function(require,module,exports){
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

},{}],45:[function(require,module,exports){
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

},{}],46:[function(require,module,exports){
'use strict';

/**
* Maximum safe double-precision floating-point integer.
*
* @module @stdlib/constants/math/float64-max-safe-integer
* @type {number}
*
* @example
* var FLOAT64_MAX_SAFE_INTEGER = require( '@stdlib/constants/math/float64-max-safe-integer' );
* // returns 9007199254740991
*/


// MAIN //

/**
* Maximum safe double-precision floating-point integer.
*
* ## Notes
*
* The integer has the value
*
* ```tex
* 2^{53} - 1
* ```
*
* @constant
* @type {number}
* @default 9007199254740991
* @see [Safe Integers]{@link http://www.2ality.com/2013/10/safe-integers.html}
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MAX_SAFE_INTEGER = 9007199254740991;


// EXPORTS //

module.exports = FLOAT64_MAX_SAFE_INTEGER;

},{}],47:[function(require,module,exports){
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

},{}],48:[function(require,module,exports){
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

},{}],49:[function(require,module,exports){
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

},{}],50:[function(require,module,exports){
'use strict';

/**
* Square of the mathematical constant `π`.
*
* @module @stdlib/constants/math/float64-pi-squared
* @type {number}
*
* @example
* var PI_SQUARED = require( '@stdlib/constants/math/float64-pi-squared' );
* // returns 9.869604401089358
*/


// MAIN //

/**
* Square of the mathematical constant `π`.
*
* @constant
* @type {number}
* @default 9.869604401089358
* @see [Wikipedia]{@link https://en.wikipedia.org/wiki/Pi}
*/
var PI_SQUARED = 9.86960440108935861883449099987615113531369940724079062641334937622004482241920524300177340371855223182402591377; // eslint-disable-line max-len


// EXPORTS //

module.exports = PI_SQUARED;

},{}],51:[function(require,module,exports){
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

},{}],52:[function(require,module,exports){
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

},{}],53:[function(require,module,exports){
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

},{}],54:[function(require,module,exports){
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

},{}],55:[function(require,module,exports){
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

},{}],56:[function(require,module,exports){
'use strict';

/**
* The mathematical constant `π` times `2`.
*
* @module @stdlib/constants/math/float64-two-pi
* @type {number}
*
* @example
* var TWO_PI = require( '@stdlib/constants/math/float64-two-pi' );
* // returns 6.283185307179586
*/


// MAIN //

/**
* The mathematical constant `π` times `2`.
*
* @constant
* @type {number}
* @default 6.283185307179586
* @see [Wikipedia]{@link https://en.wikipedia.org/wiki/Pi}
*/
var TWO_PI = 6.28318530717958647692528676655900576839433879875021164194988918461563281257241799725606965068423413596429617303; // eslint-disable-line max-len


// EXPORTS //

module.exports = TWO_PI;

},{}],57:[function(require,module,exports){
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

},{}],58:[function(require,module,exports){
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

},{}],59:[function(require,module,exports){
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

},{}],60:[function(require,module,exports){
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

},{"./is_even.js":61}],61:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-integer":64}],62:[function(require,module,exports){
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

},{"./is_infinite.js":63}],63:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-ninf":49,"@stdlib/constants/math/float64-pinf":52}],64:[function(require,module,exports){
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

},{"./is_integer.js":65}],65:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":101}],66:[function(require,module,exports){
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

},{"./is_nan.js":67}],67:[function(require,module,exports){
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

},{}],68:[function(require,module,exports){
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

},{"./is_negative_zero.js":69}],69:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-ninf":49}],70:[function(require,module,exports){
'use strict';

/**
* Test if a finite double-precision floating-point number is a nonnegative integer.
*
* @module @stdlib/math/base/assert/is-nonnegative-integer
*
* @example
* var isNonNegativeInteger = require( '@stdlib/math/base/assert/is-nonnegative-integer' );
*
* var bool = isNonNegativeInteger( 1.0 );
* // returns true
*
* bool = isNonNegativeInteger( 0.0 );
* // returns true
*
* bool = isNonNegativeInteger( -10.0 );
* // returns false
*/

// MODULES //

var isNonNegativeInteger = require( './is_nonnegative_integer.js' );


// EXPORTS //

module.exports = isNonNegativeInteger;

},{"./is_nonnegative_integer.js":71}],71:[function(require,module,exports){
'use strict';

// MODULES //

var floor = require( '@stdlib/math/base/special/floor' );


// MAIN //

/**
* Tests if a finite double-precision floating-point number is a nonnegative integer.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is a nonnegative integer
*
* @example
* var bool = isNonNegativeInteger( 1.0 );
* // returns true
*
* @example
* var bool = isNonNegativeInteger( 0.0 );
* // returns true
*
* @example
* var bool = isNonNegativeInteger( -10.0 );
* // returns false
*/
function isNonNegativeInteger( x ) {
	return (floor(x) === x && x >= 0);
}


// EXPORTS //

module.exports = isNonNegativeInteger;

},{"@stdlib/math/base/special/floor":101}],72:[function(require,module,exports){
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

},{"./is_odd.js":73}],73:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-even":60}],74:[function(require,module,exports){
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

},{}],75:[function(require,module,exports){
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

},{"./abs.js":74}],76:[function(require,module,exports){
module.exports=[
  1.00000000000000000000000000000000000000000,
  0.166666666666666666666666666666666666666667,
  -0.0333333333333333333333333333333333333333333,
  0.0238095238095238095238095238095238095238095,
  -0.0333333333333333333333333333333333333333333,
  0.0757575757575757575757575757575757575757576,
  -0.253113553113553113553113553113553113553114,
  1.16666666666666666666666666666666666666667,
  -7.09215686274509803921568627450980392156863,
  54.9711779448621553884711779448621553884712,
  -529.124242424242424242424242424242424242424,
  6192.12318840579710144927536231884057971014,
  -86580.2531135531135531135531135531135531136,
  1.42551716666666666666666666666666666666667e6,
  -2.72982310678160919540229885057471264367816e7,
  6.01580873900642368384303868174835916771401e8,
  -1.51163157670921568627450980392156862745098e10,
  4.29614643061166666666666666666666666666667e11,
  -1.37116552050883327721590879485616327721591e13,
  4.88332318973593166666666666666666666666667e14,
  -1.92965793419400681486326681448632668144863e16,
  8.41693047573682615000553709856035437430786e17,
  -4.03380718540594554130768115942028985507246e19,
  2.11507486380819916056014539007092198581560e21,
  -1.20866265222965259346027311937082525317819e23,
  7.50086674607696436685572007575757575757576e24,
  -5.03877810148106891413789303052201257861635e26,
  3.65287764848181233351104308429711779448622e28,
  -2.84987693024508822262691464329106781609195e30,
  2.38654274996836276446459819192192149717514e32,
  -2.13999492572253336658107447651910973926742e34,
  2.05009757234780975699217330956723102516667e36,
  -2.09380059113463784090951852900279701847092e38,
  2.27526964884635155596492603527692645814700e40,
  -2.62577102862395760473030497361582020814490e42,
  3.21250821027180325182047923042649852435219e44,
  -4.15982781667947109139170744952623589366896e46,
  5.69206954820352800238834562191210586444805e48,
  -8.21836294197845756922906534686173330145509e50,
  1.25029043271669930167323398297028955241772e53,
  -2.00155832332483702749253291988132987687242e55,
  3.36749829153643742333966769033387530162196e57,
  -5.94709705031354477186604968440515408405791e59,
  1.10119103236279775595641307904376916046305e62,
  -2.13552595452535011886583850190410656789733e64,
  4.33288969866411924196166130593792062184514e66,
  -9.18855282416693282262005552155018971389604e68,
  2.03468967763290744934550279902200200659751e71,
  -4.70038339580357310785752555350060606545967e73,
  1.13180434454842492706751862577339342678904e76,
  -2.83822495706937069592641563364817647382847e78,
  7.40642489796788506297508271409209841768797e80,
  -2.00964548027566044834656196727153631868673e83,
  5.66571700508059414457193460305193569614195e85,
  -1.65845111541362169158237133743199123014950e88,
  5.03688599504923774192894219151801548124424e90,
  -1.58614682376581863693634015729664387827410e93,
  5.17567436175456269840732406825071225612408e95,
  -1.74889218402171173396900258776181591451415e98,
  6.11605199949521852558245252642641677807677e100,
  -2.21227769127078349422883234567129324455732e103,
  8.27227767987709698542210624599845957312047e105,
  -3.19589251114157095835916343691808148735263e108,
  1.27500822233877929823100243029266798669572e111,
  -5.25009230867741338994028246245651754469199e113,
  2.23018178942416252098692981988387281437383e116,
  -9.76845219309552044386335133989802393011669e118,
  4.40983619784529542722726228748131691918758e121,
  -2.05085708864640888397293377275830154864566e124,
  9.82144332797912771075729696020975210414919e126,
  -4.84126007982088805087891967099634127611305e129,
  2.45530888014809826097834674040886903996737e132,
  -1.28069268040847475487825132786017857218118e135,
  6.86761671046685811921018885984644004360924e137,
  -3.78464685819691046949789954163795568144895e140,
  2.14261012506652915508713231351482720966602e143,
  -1.24567271371836950070196429616376072194583e146,
  7.43457875510001525436796683940520613117807e148,
  -4.55357953046417048940633332233212748767721e151,
  2.86121128168588683453638472510172325229190e154,
  -1.84377235520338697276882026536287854875414e157,
  1.21811545362210466995013165065995213558174e160,
  -8.24821871853141215484818457296893447301419e162,
  5.72258779378329433296516498142978615918685e165,
  -4.06685305250591047267679693831158655602196e168,
  2.95960920646420500628752695815851870426379e171,
  -2.20495225651894575090311752273445984836379e174,
  1.68125970728895998058311525151360665754464e177,
  -1.31167362135569576486452806355817153004431e180,
  1.04678940094780380821832853929823089643829e183,
  -8.54328935788337077185982546299082774593270e185,
  7.12878213224865423522884066771438224721245e188,
  -6.08029314555358993000847118686477458461988e191,
  5.29967764248499239300942910043247266228490e194,
  -4.71942591687458626443646229013379911103761e197,
  4.29284137914029810894168296541074669045521e200,
  -3.98767449682322074434477655542938795106651e203,
  3.78197804193588827138944181161393327898220e206,
  -3.66142336836811912436858082151197348755196e209,
  3.61760902723728623488554609298914089477541e212,
  -3.64707726451913543621383088655499449048682e215,
  3.75087554364544090983452410104814189306842e218,
  -3.93458672964390282694891288533713429355657e221,
  4.20882111481900820046571171111494898242731e224,
  -4.59022962206179186559802940573325591059371e227,
  5.10317257726295759279198185106496768539760e230,
  -5.78227623036569554015377271242917142512200e233,
  6.67624821678358810322637794412809363451080e236,
  -7.85353076444504163225916259639312444428230e239,
  9.41068940670587255245443288258762485293948e242,
  -1.14849338734651839938498599206805592548354e246,
  1.42729587428487856771416320087122499897180e249,
  -1.80595595869093090142285728117654560926719e252,
  2.32615353076608052161297985184708876161736e255,
  -3.04957517154995947681942819261542593785327e258,
  4.06858060764339734424012124124937318633684e261,
  -5.52310313219743616252320044093186392324280e264,
  7.62772793964343924869949690204961215533859e267,
  -1.07155711196978863132793524001065396932667e271,
  1.53102008959691884453440916153355334355847e274,
  -2.22448916821798346676602348865048510824835e277,
  3.28626791906901391668189736436895275365183e280,
  -4.93559289559603449020711938191575963496999e283,
  7.53495712008325067212266049779283956727824e286,
  -1.16914851545841777278088924731655041783900e290,
  1.84352614678389394126646201597702232396492e293,
  -2.95368261729680829728014917350525183485207e296,
  4.80793212775015697668878704043264072227967e299,
  -7.95021250458852528538243631671158693036798e302,
  1.33527841873546338750122832017820518292039e306
]

},{}],77:[function(require,module,exports){
'use strict';

// MODULES //

var isNonNegativeInteger = require( '@stdlib/math/base/assert/is-nonnegative-integer' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isOdd = require( '@stdlib/math/base/assert/is-odd' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var BERNOULLI = require( './bernoulli.json' );


// VARIABLES //

var MAX_BERNOULLI = 258|0; // asm type annotation


// MAIN //

/**
* Computes the nth Bernoulli number.
*
* @param {NonNegativeInteger} n - the Bernoulli number to compute
* @returns {number} Bernoulli number
*
* @example
* var y = bernoulli( 0 );
* // returns 1.0
*
* @example
* var y = bernoulli( 1 );
* // returns 0.0
*
* @example
* var y = bernoulli( 2 );
* // returns ~0.166
*
* @example
* var y = bernoulli( 3 );
* // returns 0.0
*
* @example
* var y = bernoulli( 4 );
* // returns ~-0.033
*
* @example
* var y = bernoulli( 5 );
* // returns 0.0
*
* @example
* var y = bernoulli( 20 );
* // returns ~-529.124
*
* @example
* var y = bernoulli( 260 );
* // returns -Infinity
*
* @example
* var y = bernoulli( 262 );
* // returns Infinity
*
* @example
* var y = bernoulli( NaN );
* // returns NaN
*/
function bernoulli( n ) {
	if ( isnan( n ) || !isNonNegativeInteger( n ) ) {
		return NaN;
	}
	if ( isOdd( n ) ) {
		return 0.0;
	}
	if ( n > MAX_BERNOULLI ) {
		return ( (n/2)&1 ) ? PINF : NINF;
	}
	return BERNOULLI[ n/2 ];
}


// EXPORTS //

module.exports = bernoulli;

},{"./bernoulli.json":76,"@stdlib/constants/math/float64-ninf":49,"@stdlib/constants/math/float64-pinf":52,"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/assert/is-nonnegative-integer":70,"@stdlib/math/base/assert/is-odd":72}],78:[function(require,module,exports){
'use strict';

/**
* Compute the nth Bernoulli number.
*
* @module @stdlib/math/base/special/bernoulli
*
* @example
* var bernoulli = require( '@stdlib/math/base/special/bernoulli' );
*
* var y = bernoulli( 0 );
* // returns 1.0
*
* y = bernoulli( 1 );
* // returns 0.0
*
* y = bernoulli( 2 );
* // returns ~0.166
*
* y = bernoulli( 3 );
* // returns 0.0
*
* y = bernoulli( 4 );
* // returns ~-0.033
*
* y = bernoulli( 5 );
* // returns 0.0
*
* y = bernoulli( 20 );
* // returns ~-529.124
*/

// MODULES //

var bernoulli = require( './bernoulli.js' );


// EXPORTS //

module.exports = bernoulli;

},{"./bernoulli.js":77}],79:[function(require,module,exports){
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

},{}],80:[function(require,module,exports){
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

},{"./ceil.js":79}],81:[function(require,module,exports){
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

},{"@stdlib/number/float64/base/from-words":215,"@stdlib/number/float64/base/get-high-word":219,"@stdlib/number/float64/base/to-words":233}],82:[function(require,module,exports){
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

},{"./copysign.js":81}],83:[function(require,module,exports){
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

},{"@stdlib/math/base/special/kernel-cos":120,"@stdlib/math/base/special/kernel-sin":124,"@stdlib/math/base/special/rempio2":173,"@stdlib/number/float64/base/get-high-word":219}],84:[function(require,module,exports){
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

},{"./cos.js":83}],85:[function(require,module,exports){
'use strict';

/*
* Notes:
*	=> cos(-x) = cos(x)
*	=> sin(-x) = -sin(x)
*	=> cos(π/2) = 0
*	=> cos(0) = 1
*	=> cos(π) = -1
*/


// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
var abs = require( '@stdlib/math/base/special/abs' );
var cos = require( '@stdlib/math/base/special/cos' );
var sin = require( '@stdlib/math/base/special/sin' );
var floor = require( '@stdlib/math/base/special/floor' );
var PI = require( '@stdlib/constants/math/float64-pi' );
var MAX_INTEGER = require( '@stdlib/constants/math/float64-max-safe-integer' );


// VARIABLES //

MAX_INTEGER += 1;


// MAIN //

/**
* Computes the value of `cos(πx)`.
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var y = cospi( 0.0 );
* // returns 1.0
*
* @example
* var y = cospi( 0.5 );
* // returns 0.0
*
* @example
* var y = cospi( 0.1 );
* // returns ~0.951
*
* @example
* var y = cospi( NaN );
* // returns NaN
*/
function cospi( x ) {
	var ax;
	var ix;
	var rx;
	var y;
	if ( isnan( x ) ) {
		return NaN;
	}
	if ( isInfinite( x ) ) {
		return NaN;
	}
	ax = abs( x );
	if ( ax > MAX_INTEGER ) {
		// Always even integer...
		return 1.0;
	}
	// Argument reduction (reduce to [0,1))...
	ix = floor( ax );
	rx = ax - ix;
	if ( rx === 0.5 ) {
		return 0.0;
	}
	if ( rx < 0.25 ) {
		y = cos( PI*rx );
	}
	else if ( rx < 0.75 ) {
		rx = 0.5 - rx;
		y = sin( PI*rx ); // recall sin(-x) = -sin(x), thus returned result will be properly signed
	}
	else {
		rx = 1.0 - rx;
		y = -cos( PI*rx );
	}
	// If the integer of `x` is odd, we need to flip the sign...
	return ( ix%2 === 1 ) ? -y : y;
}


// EXPORTS //

module.exports = cospi;

},{"@stdlib/constants/math/float64-max-safe-integer":46,"@stdlib/constants/math/float64-pi":51,"@stdlib/math/base/assert/is-infinite":62,"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/special/abs":75,"@stdlib/math/base/special/cos":84,"@stdlib/math/base/special/floor":101,"@stdlib/math/base/special/sin":192}],86:[function(require,module,exports){
'use strict';

/**
* Compute cos(πx).
*
* @module @stdlib/math/base/special/cospi
*
* @example
* var cospi = require( '@stdlib/math/base/special/cospi' );
*
* var y = cospi( 0.0 );
* // returns 1.0
*
* y = cospi( 0.5 );
* // returns 0.0
*
* y = cospi( 0.1 );
* // returns ~0.951
*
* y = cospi( NaN );
* // returns NaN
*/

// MODULES //

var cospi = require( './cospi.js' );


// EXPORTS //

module.exports = cospi;

},{"./cospi.js":85}],87:[function(require,module,exports){
'use strict';

// MODULES //

var ln = require( '@stdlib/math/base/special/ln' );
var polyval = require( './polyval_p.js' );


// MAIN //

/**
* Evaluates the digamma function via asymptotic expansion.
*
* @private
* @param {number} x - input value
* @returns {number} function value
*/
function digamma( x ) {
	var y;
	var z;
	x -= 1.0;
	y = ln(x) + ( 1.0 / (2.0*x) );
	z = 1.0 / (x*x);
	return y - ( z*polyval( z ) );
}


// EXPORTS //

module.exports = digamma;

},{"./polyval_p.js":90,"@stdlib/math/base/special/ln":132}],88:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_53_0/libs/math/doc/sf_and_dist/html/math_toolkit/special/sf_gamma/digamma.html}.
*
* The implementation follows the original but has been reformatted and modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var floor = require( '@stdlib/math/base/special/floor' );
var tan = require( '@stdlib/math/base/special/tan' );
var PI = require( '@stdlib/constants/math/float64-pi' );
var asymptoticApprox = require( './asymptotic_expansion.js' );
var rationalApprox = require( './rational_approximation.js' );


// VARIABLES //

var MIN_SAFE_ASYMPTOTIC = 10.0; // BIG!


// MAIN //

/**
* Evaluates the digamma function.
*
* ## Method
*
* 1.  For \\(x < 0\\), we use the reflection formula
*
*     ```tex
*     \psi(1-x) = \psi(x) + \frac{\pi}{\tan(\pi x)}
*     ```
*
*     to make \\(x\\) positive.
*
* 2.  For \\(x \in [0,1]\\), we use the recurrence relation
*
*     ```tex
*     \psi(x) = \psi(x+1) - \frac{1}{x}
*     ```
*
*     to shift the evaluation range to \\([1,2]\\).
*
* 3.  For \\(x \in [1,2]\\), we use a rational approximation of the form
*
*     ```tex
*     \psi(x) = (x - \mathrm{root})(Y + \operatorname{R}(x-1))
*     ```
*
*     where \\(\mathrm{root}\\) is the location of the positive root of \\(\psi\\), \\(Y\\) is a constant, and \\(R\\) is optimized for low absolute error compared to \\(Y\\).
*
*     <!-- <note>-->
*
*     Note that, since \\(\mathrm{root}\\) is irrational, we need twice as many digits in \\(\mathrm{root}\\) as in \\(x\\) in order to avoid cancellation error during subtraction, assuming \\(x\\) has an exact value. This means that, even if \\(x\\) is rounded to the next representable value, the result of \\(\psi(x)\\) will not be zero.
*
*     <!-- </note> -->
*
*     <!-- <note> -->
*
*     This approach gives 17-digit precision.
*
*     <!-- </note> -->
*
* 4.  For \\(x \in [2,\mathrm{BIG}]\\), we use the recurrence relation
*
*     ```tex
*     \psi(x+1) = \psi(x) + \frac{1}{x}
*     ```
*
*     to shift the evaluation range to \\([1,2]\\).
*
* 5.  For \\(x > \mathrm{BIG}\\), we use the asymptotic expression
*
*     ```tex
*     \psi(x) = \ln(x) + \frac{1}{2x} - \biggl( \frac{B_{21}}{2x^2} + \frac{B_{22}}{4x^4} + \frac{B_{23}}{6x^6} + \ldots \biggr)
*     ```
*
*     This expansion, however, is divergent after a few terms. The number of terms depends on \\(x\\). Accordingly, we must choose a value of \\(\mathrm{BIG}\\) which allows us to truncate the series at a term that is too small to have an effect on the result. Setting \\(\mathrm{BIG} = 10\\), allows us to truncate the series early and evaluate as \\(1/x^2\\).
*
*     <!-- <note> -->
*
*     This approach gives 17-digit precision for \\(x \geq 10\\).
*
*     <!-- </note> -->
*
* ## Notes
*
* -   Maximum deviation found: \\(1.466\\mbox{e-}18\\)
* -   Max error found: \\(2.452\mbox{e-}17\\) (double precision)
*
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = digamma( -2.5 );
* // returns ~1.103
*
* @example
* var v = digamma( 1.0 );
* // returns ~-0.577
*
* @example
* var v = digamma( 10.0 );
* // returns ~2.252
*
* @example
* var v = digamma( NaN );
* // returns NaN
*
* @example
* var v = digamma( -1.0 );
* // returns NaN
*/
function digamma( x ) {
	var rem;
	var tmp;
	if ( isnan( x ) || x === 0.0 ) {
		return NaN;
	}
	// If `x` is negative, use reflection...
	if ( x <= -1.0 ) {
		// Reflect:
		x = 1.0 - x;

		// Argument reduction for tan:
		rem = x - floor(x);

		// Shift to negative if > 0.5:
		if ( rem > 0.5 ) {
			rem -= 1.0;
		}
		// Check for evaluation at a negative pole:
		if ( rem === 0.0 ) {
			return NaN;
		}
		tmp = PI / tan( PI * rem );
	} else {
		tmp = 0.0;
	}
	// If we're above the lower-limit for the asymptotic expansion, then use it...
	if ( x >= MIN_SAFE_ASYMPTOTIC ) {
		tmp += asymptoticApprox( x );
		return tmp;
	}
	// If x > 2, reduce to the interval [1,2]...
	while ( x > 2.0 ) {
		x -= 1.0;
		tmp += 1.0/x;
	}
	// If x < 1, use recurrence to shift to > 1..
	while ( x < 1.0 ) {
		tmp -= 1.0/x;
		x += 1.0;
	}
	tmp += rationalApprox( x );
	return tmp;
}


// EXPORTS //

module.exports = digamma;

},{"./asymptotic_expansion.js":87,"./rational_approximation.js":91,"@stdlib/constants/math/float64-pi":51,"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/special/floor":101,"@stdlib/math/base/special/tan":197}],89:[function(require,module,exports){
'use strict';

/**
* Evaluate the digamma function.
*
* @module @stdlib/math/base/special/digamma
*
* @example
* var digamma = require( '@stdlib/math/base/special/digamma' );
*
* var v = digamma( -2.5 );
* // returns ~1.103
*
* v = digamma( 1.0 );
* // returns ~-0.577
*
* v = digamma( 10.0 );
* // returns ~2.252
*
* v = digamma( NaN );
* // returns NaN
*
* v = digamma( -1.0 );
* // returns NaN
*/

// MODULES //

var digamma = require( './digamma.js' );


// EXPORTS //

module.exports = digamma;

},{"./digamma.js":88}],90:[function(require,module,exports){
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
		return 0.08333333333333333;
	}
	return 0.08333333333333333 + (x * (-0.008333333333333333 + (x * (0.003968253968253968 + (x * (-0.004166666666666667 + (x * (0.007575757575757576 + (x * (-0.021092796092796094 + (x * (0.08333333333333333 + (x * -0.4432598039215686))))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],91:[function(require,module,exports){
'use strict';

// MODULES //

var rateval = require( './rational_pq.js' );


// VARIABLES //

var root1 = 1569415565.0 / 1073741824.0;
var root2 = ( 381566830.0 / 1073741824.0 ) / 1073741824.0;
var root3 = 0.9016312093258695918615325266959189453125e-19;
var Y = 0.99558162689208984;


// MAIN //

/**
* Evaluates the digamma function over interval `[1,2]`.
*
* @private
* @param {number} x - input value
* @returns {number} function value
*/
function digamma( x ) {
	var g;
	var r;
	g = x - root1;
	g -= root2;
	g -= root3;
	r = rateval( x-1.0 );
	return (g*Y) + (g*r);
}


// EXPORTS //

module.exports = digamma;

},{"./rational_pq.js":92}],92:[function(require,module,exports){
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
		return 0.25479851061131553;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = 0.25479851061131553 + (x * (-0.3255503118680449 + (x * (-0.6503185377089651 + (x * (-0.28919126444774784 + (x * (-0.04525132144873906 + (x * (-0.002071332116774595 + (x * 0.0))))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (2.076711702373047 + (x * (1.4606242909763516 + (x * (0.43593529692665967 + (x * (0.054151797245674226 + (x * (0.0021284987017821146 + (x * -5.578984132167551e-7))))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = 0.0 + (x * (-0.002071332116774595 + (x * (-0.04525132144873906 + (x * (-0.28919126444774784 + (x * (-0.6503185377089651 + (x * (-0.3255503118680449 + (x * 0.25479851061131553))))))))))); // eslint-disable-line max-len
		s2 = -5.578984132167551e-7 + (x * (0.0021284987017821146 + (x * (0.054151797245674226 + (x * (0.43593529692665967 + (x * (1.4606242909763516 + (x * (2.076711702373047 + (x * 1.0))))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

},{}],93:[function(require,module,exports){
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

},{"./expmulti.js":94,"@stdlib/constants/math/float64-ninf":49,"@stdlib/constants/math/float64-pinf":52,"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/special/trunc":206}],94:[function(require,module,exports){
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

},{"./polyval_p.js":96,"@stdlib/math/base/special/ldexp":130}],95:[function(require,module,exports){
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

},{"./exp.js":93}],96:[function(require,module,exports){
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

},{}],97:[function(require,module,exports){
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

},{"./factorials.json":98,"@stdlib/constants/math/float64-pinf":52,"@stdlib/math/base/assert/is-integer":64,"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/special/gamma":103}],98:[function(require,module,exports){
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

},{}],99:[function(require,module,exports){
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

},{"./factorial.js":97}],100:[function(require,module,exports){
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

},{}],101:[function(require,module,exports){
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

},{"./floor.js":100}],102:[function(require,module,exports){
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

},{"./rational_pq.js":105,"./small_approximation.js":106,"./stirling_approximation.js":107,"@stdlib/constants/math/float64-ninf":49,"@stdlib/constants/math/float64-pi":51,"@stdlib/constants/math/float64-pinf":52,"@stdlib/math/base/assert/is-integer":64,"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/assert/is-negative-zero":68,"@stdlib/math/base/special/abs":75,"@stdlib/math/base/special/floor":101,"@stdlib/math/base/special/sin":192}],103:[function(require,module,exports){
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

},{"./gamma.js":102}],104:[function(require,module,exports){
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

},{}],105:[function(require,module,exports){
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

},{}],106:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-eulergamma":37}],107:[function(require,module,exports){
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

},{"./polyval_s.js":104,"@stdlib/constants/math/float64-sqrt-two-pi":55,"@stdlib/math/base/special/exp":95,"@stdlib/math/base/special/pow":162}],108:[function(require,module,exports){
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

},{"./polyval_a1.js":110,"./polyval_a2.js":111,"./polyval_r.js":112,"./polyval_s.js":113,"./polyval_t1.js":114,"./polyval_t2.js":115,"./polyval_t3.js":116,"./polyval_u.js":117,"./polyval_v.js":118,"./polyval_w.js":119,"@stdlib/constants/math/float64-pi":51,"@stdlib/constants/math/float64-pinf":52,"@stdlib/math/base/assert/is-infinite":62,"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/special/abs":75,"@stdlib/math/base/special/ln":132,"@stdlib/math/base/special/sinpi":194,"@stdlib/math/base/special/trunc":206}],109:[function(require,module,exports){
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

},{"./gammaln.js":108}],110:[function(require,module,exports){
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

},{}],111:[function(require,module,exports){
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

},{}],112:[function(require,module,exports){
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

},{}],113:[function(require,module,exports){
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

},{}],114:[function(require,module,exports){
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

},{}],115:[function(require,module,exports){
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

},{}],116:[function(require,module,exports){
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

},{}],117:[function(require,module,exports){
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

},{}],118:[function(require,module,exports){
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

},{}],119:[function(require,module,exports){
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

},{}],120:[function(require,module,exports){
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

},{"./kernel_cos.js":121}],121:[function(require,module,exports){
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

},{"./polyval_c13.js":122,"./polyval_c46.js":123}],122:[function(require,module,exports){
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
		return -2.7557314351390663e-7;
	}
	return -2.7557314351390663e-7 + (x * (2.087572321298175e-9 + (x * -1.1359647557788195e-11))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],124:[function(require,module,exports){
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

},{"./kernel_sin.js":125}],125:[function(require,module,exports){
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

},{}],126:[function(require,module,exports){
'use strict';

/**
* Compute the tangent of a number on `[-π/4, π/4]`.
*
* @module @stdlib/math/base/special/kernel-tan
*
* @example
* var kernelTan = require( '@stdlib/math/base/special/kernel-tan' );
*
* var out = kernelTan( Math.PI/4.0, 0.0, 1 );
* // returns ~1.0
*
* out = kernelTan( Math.PI/4.0, 0.0, -1 );
* // returns ~-1.0
*
* out = kernelTan( Math.PI/6.0, 0.0, 1 );
* // returns ~0.577
*
* out = kernelTan( 0.664, 5.288e-17, 1 );
* // returns ~0.783
*/

// MODULES //

var kernelTan = require( './kernel_tan.js' );


// EXPORTS //

module.exports = kernelTan;

},{"./kernel_tan.js":127}],127:[function(require,module,exports){
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/k_tan.c?view=co}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* ====================================================
* Copyright 2004 Sun Microsystems, Inc.  All Rights Reserved.
*
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*/

// MODULES //

var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var setLowWord = require( '@stdlib/number/float64/base/set-low-word' );
var polyvalOdd = require( './polyval_t_odd.js' );
var polyvalEven = require( './polyval_t_even.js' );


// VARIABLES //

var PIO4 = 7.85398163397448278999e-01;
var PIO4LO = 3.06161699786838301793e-17;
var T0 = 3.33333333333334091986e-01; // 3FD55555, 55555563

// Absolute value mask: 2147483647 => 0x7fffffff => 01111111111111111111111111111111
var HIGH_WORD_ABS_MASK = 0x7fffffff|0; // asm type annotation


// MAIN //

/**
* Computes the tangent on \\( \approx[-\pi/4, \pi/4] \\) (except on -0), \\( \pi/4 \approx 0.7854 \\).
*
* ## Method
*
* -   Since \\( \tan(-x) = -\tan(x) \\), we need only to consider positive \\( x \\).
*
* -   Callers must return \\( \tan(-0) = -0 \\) without calling here since our odd polynomial is not evaluated in a way that preserves \\( -0 \\). Callers may do the optimization \\( \tan(x) \approx x \\) for tiny \\( x \\).
*
* -   \\( \tan(x) \\) is approximated by a odd polynomial of degree 27 on \\( [0, 0.67434] \\)
*
*     ```tex
*     \tan(x) \approx x + T_1 x^3 + \ldots + T_{13} x^{27}
*     ```
*     where
*
*     ```tex
*     \left| \frac{\tan(x)}{x} - \left( 1 + T_1 x^2 + T_2 x^4 + \ldots + T_{13} x^{26} \right) \right|  \le 2^{-59.2}
*     ```
*
* -   Note: \\( \tan(x+y) = \tan(x) + \tan'(x) \cdot y \approx \tan(x) + ( 1 + x \cdot x ) \cdot y \\). Therefore, for better accuracy in computing \\( \tan(x+y) \\), let
*
*     ```tex
*     r = x^3 \cdot \left( T_2+x^2 \cdot (T_3+x^2 \cdot (\ldots+x^2 \cdot (T_{12}+x^2 \cdot T_{13}))) \right)
*     ```
*
*     then
*
*     ```tex
*     \tan(x+y) = x^3 + \left( T_1 \cdot x^2 + (x \cdot (r+y)+y) \right)
*     ```
*
* -   For \\( x \\) in \\( [0.67434, \pi/4] \\),  let \\( y = \pi/4 - x \\), then
*
*     ```tex
*     \tan(x) = \tan\left(\tfrac{\pi}{4}-y\right) = \frac{1-\tan(y)}{1+\tan(y)} \\
*     = 1 - 2 \cdot \left( \tan(y) - \tfrac{\tan(y)^2}{1+\tan(y)} \right)
*     ```
*
*
* @param {number} x - input value (in radians, assumed to be bounded by ~π/4 in magnitude)
* @param {number} y - tail of `x`
* @param {integer} k - indicates whether tan (if k = 1) or -1/tan (if k = -1) is returned
* @returns {number} tangent
*
* @example
* var out = kernelTan( Math.PI/4.0, 0.0, 1 );
* // returns ~1.0
*
* @example
* var out = kernelTan( Math.PI/4.0, 0.0, -1 );
* // returns ~-1.0
*
* @example
* var out = kernelTan( Math.PI/6.0, 0.0, 1 );
* // returns ~0.577
*
* @example
* var out = kernelTan( 0.664, 5.288e-17, 1 );
* // returns ~0.783
*
* @example
* var out = kernelTan( NaN, 0.0, 1 );
* // returns NaN
*
* @example
* var out = kernelTan( 3.0, NaN, 1 );
* // returns NaN
*
* @example
* var out = kernelTan( NaN, NaN, 1 );
* // returns NaN
*/
function kernelTan( x, y, k ) {
	var hx;
	var ix;
	var a;
	var r;
	var s;
	var t;
	var v;
	var w;
	var z;

	hx = getHighWord( x );

	// High word of |x|:
	ix = (hx & HIGH_WORD_ABS_MASK)|0; // asm type annotation

	// Case: |x| >= 0.6744
	if ( ix >= 0x3FE59428 ) {
		if ( x < 0 ) {
			x = -x;
			y = -y;
		}
		z = PIO4 - x;
		w = PIO4LO - y;
		x = z + w;
		y = 0.0;
	}
	z = x * x;
	w = z * z;

	// Break x^5*(T[1]+x^2*T[2]+...) into x^5(T[1]+x^4*T[3]+...+x^20*T[11]) + x^5(x^2*(T[2]+x^4*T[4]+...+x^22*T[12]))...
	r = polyvalOdd( w );
	v = z * polyvalEven( w );
	s = z * x;
	r = y + (z * ((s * (r + v)) + y));
	r += T0 * s;
	w = x + r;
	if ( ix >= 0x3FE59428 ) {
		v = k;
		return ( 1.0 - ( (hx >> 30) & 2 ) ) * ( v - (2.0 * (x - ((w * w / (w + v)) - r)) )); // eslint-disable-line max-len
	}
	if ( k === 1 ) {
		return w;
	}
	// Compute -1/(x+r) accurately...
	z = w;
	setLowWord( z, 0 );
	v = r - (z - x); // z + v = r + x
	a = -1.0 / w; // a = -1/w
	t = a;
	setLowWord( t, 0 );
	s = 1.0 + (t * z);
	return t + (a * (s + (t * v)));
}


// EXPORTS //

module.exports = kernelTan;

},{"./polyval_t_even.js":128,"./polyval_t_odd.js":129,"@stdlib/number/float64/base/get-high-word":219,"@stdlib/number/float64/base/set-low-word":230}],128:[function(require,module,exports){
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
		return 0.05396825397622605;
	}
	return 0.05396825397622605 + (x * (0.0088632398235993 + (x * (0.0014562094543252903 + (x * (0.0002464631348184699 + (x * (0.00007140724913826082 + (x * 0.00002590730518636337))))))))); // eslint-disable-line max-len
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
		return 0.13333333333320124;
	}
	return 0.13333333333320124 + (x * (0.021869488294859542 + (x * (0.0035920791075913124 + (x * (0.0005880412408202641 + (x * (0.00007817944429395571 + (x * -0.000018558637485527546))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],130:[function(require,module,exports){
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

},{"./ldexp.js":131}],131:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-exponent-bias":38,"@stdlib/constants/math/float64-max-base2-exponent":44,"@stdlib/constants/math/float64-max-base2-exponent-subnormal":43,"@stdlib/constants/math/float64-min-base2-exponent-subnormal":48,"@stdlib/constants/math/float64-ninf":49,"@stdlib/constants/math/float64-pinf":52,"@stdlib/math/base/assert/is-infinite":62,"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/special/copysign":82,"@stdlib/number/float64/base/exponent":213,"@stdlib/number/float64/base/from-words":215,"@stdlib/number/float64/base/normalize":224,"@stdlib/number/float64/base/to-words":233}],132:[function(require,module,exports){
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

},{"./ln.js":133}],133:[function(require,module,exports){
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

},{"./polyval_p.js":134,"./polyval_q.js":135,"@stdlib/constants/math/float64-exponent-bias":38,"@stdlib/constants/math/float64-ninf":49,"@stdlib/math/base/assert/is-nan":66,"@stdlib/number/float64/base/get-high-word":219,"@stdlib/number/float64/base/set-high-word":228}],134:[function(require,module,exports){
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

},{}],135:[function(require,module,exports){
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

},{}],136:[function(require,module,exports){
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

},{"./min.js":137}],137:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-ninf":49,"@stdlib/constants/math/float64-pinf":52,"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/assert/is-negative-zero":68}],138:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_65_0/boost/math/special_functions/detail/polygamma.hpp}.
*
* The implementation follows the original but has been reformatted and modified for JavaScript.
*/

/*
* (C) Copyright Nikhar Agrawal 2013.
* (C) Copyright Christopher Kormanyos 2013.
* (C) Copyright John Maddock 2014.
* (C) Copyright Paul Bristow 2013.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var logger = require( 'debug' );
var bernoulli = require( '@stdlib/math/base/special/bernoulli' );
var factorial = require( '@stdlib/math/base/special/factorial' );
var gammaln = require( '@stdlib/math/base/special/gammaln' );
var abs = require( '@stdlib/math/base/special/abs' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var ln = require( '@stdlib/math/base/special/ln' );
var MAX_LN = require( '@stdlib/constants/math/float64-max-ln' );
var LN_TWO = require( '@stdlib/constants/math/float64-ln-two' );
var EPS = require( '@stdlib/constants/math/float64-eps' );


// VARIABLES //

var debug = logger( 'polygamma' );
var MAX_SERIES_ITERATIONS = 1000000;
var MAX_FACTORIAL = 172;


// MAIN //

/**
* Evaluates the polygamma function for large values of `x` such as for `x > 400`.
*
* @private
* @see {@link http://functions.wolfram.com/GammaBetaErf/PolyGamma2/06/02/0001/}
* @param {PositiveInteger} n - derivative to evaluate
* @param {number} x - input
* @returns {number} (n+1)'th derivative
*/
function atinfinityplus( n, x ) {
	var partTerm; // Value of current term excluding the Bernoulli number part
	var xsquared;
	var term; // Value of current term to be added to sum
	var sum; // Current value of accumulated sum
	var nlx;
	var k2;
	var k;

	if ( n+x === x ) {
		// If `x` is very large, just concentrate on the first part of the expression and use logs:
		if ( n === 1 ) {
			return 1.0 / x;
		}
		nlx = n * ln( x );
		if ( nlx < MAX_LN && n < MAX_FACTORIAL ) {
			return ( (n & 1) ? 1.0 : -1.0 ) * factorial( n-1 ) * pow( x, -n );
		}
		return ( (n & 1) ? 1.0 : -1.0 ) * exp( gammaln( n ) - ( n*ln(x) ) );
	}
	xsquared = x * x;

	// Start by setting `partTerm` to `(n-1)! / x^(n+1)`, which is common to both the first term of the series (with k = 1) and to the leading part. We can then get to the leading term by: `partTerm * (n + 2 * x) / 2` and to the first term in the series (excluding the Bernoulli number) by: `partTerm n * (n + 1) / (2x)`. If either the factorial would over- or the power term underflow, set `partTerm` to 0 and then we know that we have to use logs for the initial terms:
	if ( n > MAX_FACTORIAL && n*n > MAX_LN ) {
		partTerm = 0.0;
	} else {
		partTerm = factorial( n-1 ) * pow( x, -n-1 );
	}
	if ( partTerm === 0.0 ) {
		// Either `n` is very large, or the power term underflows. Set the initial values of `partTerm`, `term`, and `sum` via logs:
		partTerm = gammaln(n) - ( (n+1) * ln(x) );
		sum = exp( partTerm + ln( n + (2.0*x) ) - LN_TWO );
		partTerm += ln( n*(n+1) ) - LN_TWO - ln(x);
		partTerm = exp( partTerm );
	} else {
		sum = partTerm * ( n+(2.0*x) ) / 2.0;
		partTerm *= ( n*(n+1) ) / 2.0;
		partTerm /= x;
	}
	// If the leading term is 0, so is the result:
	if ( sum === 0.0 ) {
		return sum;
	}
	for ( k = 1; ; ) {
		term = partTerm * bernoulli( k*2 );
		sum += term;

		// Normal termination condition:
		if ( abs( term/sum ) < EPS ) {
			break;
		}

		// Increment our counter, and move `partTerm` on to the next value:
		k += 1;
		k2 = 2 * k;
		partTerm *= ( n+k2-2 ) * ( n-1+k2 );
		partTerm /= ( k2-1 ) * k2;
		partTerm /= xsquared;
		if ( k > MAX_SERIES_ITERATIONS ) {
			debug( 'Series did not converge, closest value was: %d.', sum );
			return NaN;
		}
	}
	if ( ( n-1 ) & 1 ) {
		sum = -sum;
	}
	return sum;
}


// EXPORTS //

module.exports = atinfinityplus;

},{"@stdlib/constants/math/float64-eps":36,"@stdlib/constants/math/float64-ln-two":42,"@stdlib/constants/math/float64-max-ln":45,"@stdlib/math/base/special/abs":75,"@stdlib/math/base/special/bernoulli":78,"@stdlib/math/base/special/exp":95,"@stdlib/math/base/special/factorial":99,"@stdlib/math/base/special/gammaln":109,"@stdlib/math/base/special/ln":132,"@stdlib/math/base/special/pow":162,"debug":268}],139:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_65_0/boost/math/special_functions/detail/polygamma.hpp}.
*
* The implementation follows the original but has been reformatted and modified for JavaScript.
*/

/*
* (C) Copyright Nikhar Agrawal 2013.
* (C) Copyright Christopher Kormanyos 2013.
* (C) Copyright John Maddock 2014.
* (C) Copyright Paul Bristow 2013.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var logger = require( 'debug' );
var factorial = require( '@stdlib/math/base/special/factorial' );
var gammaln = require( '@stdlib/math/base/special/gammaln' );
var trunc = require( '@stdlib/math/base/special/trunc' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var ln = require( '@stdlib/math/base/special/ln' );
var MAX_LN = require( '@stdlib/constants/math/float64-max-ln' );
var atinfinityplus = require( './atinfinityplus.js' );


// VARIABLES //

var debug = logger( 'polygamma' );
var MAX_SERIES_ITERATIONS = 1000000;
var DIGITS_BASE10 = 19;


// MAIN //

/**
* Evaluates the polygamma function.
*
* @private
* @see {@link http://functions.wolfram.com/GammaBetaErf/PolyGamma2/16/01/01/0017/}
* @param {PositiveInteger} n - derivative to evaluate
* @param {number} x - input
* @returns {number} (n+1)'th derivative
*/
function attransitionplus( n, x ) {
	var minusMminus1;
	var lnterm;
	var zpows;
	var iter;
	var sum0;
	var d4d;
	var N;
	var m;
	var k;
	var z;

	// Use N = (0.4 * digits) + (4 * n) for target value for x:
	d4d = 0.4 * DIGITS_BASE10;
	N = d4d + ( 4*n );
	m = n;
	iter = N - trunc( x );

	if ( iter > MAX_SERIES_ITERATIONS ) {
		debug( 'Exceeded maximum series evaluations when evaluated at n = %d and x = %d', n, x );
		return NaN;
	}
	minusMminus1 = -m - 1;
	z = x;
	sum0 = 0.0;
	zpows = 0.0;

	// Forward recursion to larger `x`, need to check for overflow first though:
	if ( ln( z+iter ) * minusMminus1 > -MAX_LN ) {
		for ( k = 1; k <= iter; k++ ) {
			zpows = pow( z, minusMminus1 );
			sum0 += zpows;
			z += 1;
		}
		sum0 *= factorial( n );
	} else {
		for ( k = 1; k <= iter; k++ ) {
			lnterm = ( ln( z ) * minusMminus1 ) + gammaln( n+1 );
			sum0 += exp( lnterm );
			z += 1;
		}
	}
	if ( ( n-1 ) & 1 ) {
		sum0 = -sum0;
	}
	return sum0 + atinfinityplus( n, z );
}


// EXPORTS //

module.exports = attransitionplus;

},{"./atinfinityplus.js":138,"@stdlib/constants/math/float64-max-ln":45,"@stdlib/math/base/special/exp":95,"@stdlib/math/base/special/factorial":99,"@stdlib/math/base/special/gammaln":109,"@stdlib/math/base/special/ln":132,"@stdlib/math/base/special/pow":162,"@stdlib/math/base/special/trunc":206,"debug":268}],140:[function(require,module,exports){
'use strict';

/**
* Evaluate the polygamma function.
*
* @module @stdlib/math/base/special/polygamma
*
* @example
* var polygamma = require( '@stdlib/math/base/special/polygamma' );
*
* var v = polygamma( 3, 1.2 );
* // returns ~3.245
*
* v = polygamma( 5, 1.2 );
* // returns ~41.39
*
* v = polygamma( 3, -4.9 );
* // returns ~60014.239
*
* v = polygamma( -1, 5.3 );
* // returns NaN
*
* v = polygamma( 2, -1.0 );
* // returns NaN
*/

// MODULES //

var polygamma = require( './polygamma.js' );


// EXPORTS //

module.exports = polygamma;

},{"./polygamma.js":143}],141:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_65_0/boost/math/special_functions/detail/polygamma.hpp}.
*
* The implementation follows the original but has been reformatted and modified for JavaScript.
*/

/*
* (C) Copyright Nikhar Agrawal 2013.
* (C) Copyright Christopher Kormanyos 2013.
* (C) Copyright John Maddock 2014.
* (C) Copyright Paul Bristow 2013.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var logger = require( 'debug' );
var factorial = require( '@stdlib/math/base/special/factorial' );
var zeta = require( '@stdlib/math/base/special/riemann-zeta' );
var abs = require( '@stdlib/math/base/special/abs' );
var pow = require( '@stdlib/math/base/special/pow' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var EPS = require( '@stdlib/constants/math/float64-eps' );
var MAX = require( '@stdlib/constants/math/float64-max' );


// VARIABLES //

var debug = logger( 'polygamma' );
var MAX_SERIES_ITERATIONS = 1000000;


// MAIN //

/**
* Evaluates the polygamma function near zero.
*
* ## Notes
*
* -   If we take this [expansion][1] for `polygamma` and substitute in this [expression][2] for `polygamma(n, 1)`, we get an alternating series for polygamma when `x` is small in terms of zeta functions of integer arguments (which are easy to evaluate, at least when the integer is even).
*
* [1]: http://functions.wolfram.com/06.15.06.0003.02
* [2]: http://functions.wolfram.com/06.15.03.0009.01
*
*
* @private
* @param {PositiveInteger} n - derivative to evaluate
* @param {number} x - input value
* @returns {number} (n+1)'th derivative
*/
function nearzero( n, x ) {
	var factorialPart;
	var prefix;
	var scale;
	var term;
	var sum;
	var AX;
	var k;

	// In order to avoid spurious overflow, save the `n!` term for later, and rescale at the end:
	scale = factorial( n );

	// "factorialPart" contains everything except the zeta function evaluations in each term:
	factorialPart = 1;

	// "prefix" is what we'll be adding the accumulated sum to, it will be `n! / z^(n+1)`, but since we're scaling by `n!` it is just `1 / z^(n+1)` for now:
	prefix = pow( x, n+1 );
	if ( prefix === 0.0 ) {
		return PINF;
	}
	prefix = 1.0 / prefix;

	// First term in the series is necessarily `< zeta(2) < 2`, so ignore the sum if it will have no effect on the result:
	if ( prefix > 2.0/EPS ) {
		if ( n & 1 ) {
			return ( AX/prefix < scale ) ? PINF : prefix * scale;
		}
		return ( AX/prefix < scale ) ? NINF : -prefix * scale;
	}
	sum = prefix;
	for ( k = 0; ; ) {
		// Get the k'th term:
		term = factorialPart * zeta( k+n+1 );
		sum += term;

		// Termination condition:
		if ( abs( term ) < abs(sum * EPS ) ) {
			break;
		}
		// Move on `k` and `factorialPart`:
		k += 1;
		factorialPart *= (-x * (n+k)) / k;

		// Last chance exit:
		if ( k > MAX_SERIES_ITERATIONS ) {
			debug( 'Series did not converge, best value is %d.', sum );
			return NaN;
		}
	}
	// We need to multiply by the scale, at each stage checking for overflow:
	if ( MAX/scale < sum ) {
		return PINF;
	}
	sum *= scale;
	return ( n & 1 ) ? sum : -sum;
}


// EXPORTS //

module.exports = nearzero;

},{"@stdlib/constants/math/float64-eps":36,"@stdlib/constants/math/float64-max":47,"@stdlib/constants/math/float64-ninf":49,"@stdlib/constants/math/float64-pinf":52,"@stdlib/math/base/special/abs":75,"@stdlib/math/base/special/factorial":99,"@stdlib/math/base/special/pow":162,"@stdlib/math/base/special/riemann-zeta":179,"debug":268}],142:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_65_0/boost/math/special_functions/detail/polygamma.hpp}.
*
* The implementation follows the original but has been reformatted and modified for JavaScript.
*/

/*
* (C) Copyright Nikhar Agrawal 2013.
* (C) Copyright Christopher Kormanyos 2013.
* (C) Copyright John Maddock 2014.
* (C) Copyright Paul Bristow 2013.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var logger = require( 'debug' );
var evalpoly = require( '@stdlib/math/base/tools/evalpoly' );
var gammaln = require( '@stdlib/math/base/special/gammaln' );
var signum = require( '@stdlib/math/base/special/signum' );
var cospi = require( '@stdlib/math/base/special/cospi' );
var sinpi = require( '@stdlib/math/base/special/sinpi' );
var abs = require( '@stdlib/math/base/special/abs' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var ln = require( '@stdlib/math/base/special/ln' );
var MAX_LN = require( '@stdlib/constants/math/float64-max-ln' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var LN_PI = require( '@stdlib/constants/math/float64-ln-pi' );
var PI = require( '@stdlib/constants/math/float64-pi' );
var polyval3 = require( './polyval_p3.js' );
var polyval4 = require( './polyval_p4.js' );
var polyval5 = require( './polyval_p5.js' );
var polyval6 = require( './polyval_p6.js' );
var polyval7 = require( './polyval_p7.js' );
var polyval8 = require( './polyval_p8.js' );
var polyval9 = require( './polyval_p9.js' );
var polyval10 = require( './polyval_p10.js' );
var polyval11 = require( './polyval_p11.js' );
var polyval12 = require( './polyval_p12.js' );


// VARIABLES //

var debug = logger( 'polygamma' );
var MAX_SERIES_ITERATIONS = 1000000;

// π raised to powers two to twelve (obtained from Wolfram Alpha):
var PI2 = 9.869604401089358;
var PI3 = 31.00627668029982;
var PI4 = 97.40909103400244;
var PI5 = 306.01968478528147;
var PI6 = 961.3891935753045;
var PI7 = 3020.2932277767923;
var PI8 = 9488.531016070574;
var PI9 = 29809.09933344621;
var PI10 = 93648.04747608303;
var PI11 = 294204.0179738906;
var PI12 = 924269.1815233742;

// Derivative memoization table:
var table = [
	[ -1.0 ]
];


// FUNCTIONS //

/**
* Returns an array of zeros of the specified length.
*
* @private
* @param {NonNegativeInteger} len - array length
* @returns {Array} array of zeros
*/
function zeros( len ) {
	var out;
	var i;

	out = new Array( len );
	for ( i = 0; i < len; i++ ) {
		out[ i ] = 0.0;
	}
	return out;
}

/**
* Updates the derivatives table.
*
* @private
* @param {PositiveInteger} n - derivative
*/
function calculateDerivatives( n ) {
	var noffset; // offset for next row
	var offset; // 1 if the first cos power is 0; otherwise 0
	var ncols; // how many entries there are in the current row
	var mcols; // how many entries there will be in the next row
	var mo; // largest order of the polynomial of cos terms
	var so; // order of the sin term
	var co; // order of the cosine term in entry "j"
	var i;
	var j;
	var k;

	for ( i = table.length-1; i < n-1; i++ ) {
		offset = ( i&1 )|0;
		so = ( i+2 )|0;
		mo = ( so-1 )|0;
		ncols = ( (mo-offset)/2 )|0;
		noffset = offset ? 0 : 1;
		mcols = ( (mo+1-noffset)/2 )|0;
		table.push( zeros( mcols+1 ) );
		for ( j = 0; j <= ncols; j++ ) {
			co = ( (2*j)+offset )|0;
			k = ( (co+1)/2 )|0;
			table[ i+1 ][ k ] += ((co-so)*table[i][j]) / (so-1);
			if ( co ) {
				k = ( (co-1)/2 )|0;
				table[ i+1 ][ k ] += (-co*table[i][j]) / (so-1);
			}
		}
	}
}


// MAIN //

/**
* Returns n'th derivative of \\(\operatorname{cot|(\pi x)\\) at \\(x\\).
*
* ## Notes
*
* -   The derivatives are simply tabulated for up to \\(n = 9\\), beyond that it is possible to calculate coefficients as follows. The general form of each derivative is:
*
*     ```tex
*     \pi^n * \sum_{k=0}^n C[k,n] \cdot \cos^k(\pi \cdot x) \cdot \operatorname{csc}^{(n+1)}(\pi \cdot x)
*     ```
*
*     with constant \\( C\[0,1\] = -1 \\) and all other \\( C\[k,n\] = 0 \)). Then for each \\( k < n+1 \\):
*
*     ```tex
*     \begin{align}
*     C[k-1, n+1]  &-= k * C[k, n]; \\
*     C[k+1, n+1]  &+= (k-n-1) * C[k, n];
*     \end{align}
*     ```
*
* -   Note that there are many different ways of representing this derivative thanks to the many trigonometric identities available. In particular, the sum of powers of cosines could be replaced by a sum of cosine multiple angles, and, indeed, if you plug the derivative into Mathematica, this is the form it will give. The two forms are related via the Chebeshev polynomials of the first kind and \\( T_n(\cos(x)) = \cos(n x) \\). The polynomial form has the great advantage that all the cosine terms are zero at half integer arguments - right where this function has it's minimum - thus avoiding cancellation error in this region.
*
* -   And finally, since every other term in the polynomials is zero, we can save space by only storing the non-zero terms. This greatly increases complexity when subscripting the tables in the calculation, but halves the storage space (and complexity for that matter).
*
*
* @private
* @param {PositiveInteger} n - derivative to evaluate
* @param {number} x - input
* @param {number} xc - one minus `x`
* @returns {number} n'th derivative
*/
function polycotpi( n, x, xc ) {
	var powTerms;
	var idx;
	var out;
	var sum;
	var c;
	var s;

	s = ( abs( x ) < abs( xc ) ) ? sinpi( x ) : sinpi( xc );
	c = cospi( x );
	switch ( n ) { // eslint-disable-line default-case
	case 1:
		return -PI / ( s * s );
	case 2:
		return 2.0 * PI2 * c / pow( s, 3.0 );
	case 3:
		return PI3 * polyval3( c*c ) / pow( s, 4.0 );
	case 4:
		return PI4 * c * polyval4( c*c ) / pow( s, 5.0 );
	case 5:
		return PI5 * polyval5( c*c ) / pow( s, 6.0 );
	case 6:
		return PI6 * c * polyval6( c*c ) / pow( s, 7.0 );
	case 7:
		return PI7 * polyval7( c*c ) / pow( s, 8.0 );
	case 8:
		return PI8 * c * polyval8( c*c ) / pow( s, 9.0 );
	case 9:
		return PI9 * polyval9( c*c ) / pow( s, 10.0 );
	case 10:
		return PI10 * c * polyval10( c*c ) / pow( s, 11.0 );
	case 11:
		return PI11 * polyval11( c*c ) / pow( s, 12.0 );
	case 12:
		return PI12 * c * polyval12( c*c ) / pow( s, 13.0 );
	}
	// We'll have to compute the coefficients up to `n`, complexity is O(n^2) which we don't worry about as the values are computed once and then cached. However, if the final evaluation would have too many terms just bail out right away:
	if ( n/2 > MAX_SERIES_ITERATIONS ) {
		debug( 'The value of `n` is so large that we\'re unable to compute the result in reasonable time.' );
		return NaN;
	}
	idx = n - 1;
	if ( idx >= table.length ) {
		// Lazily calculate derivatives:
		calculateDerivatives( n );
	}
	sum = evalpoly( table[ idx ], c*c );
	if ( idx & 1 ) {
		sum *= c; // First coefficient is order 1, and really an odd polynomial.
	}
	if ( sum === 0.0 ) {
		return sum;
	}
	// The remaining terms are computed using logs since the powers and factorials get real large real quick:
	powTerms = n * LN_PI;
	if ( s === 0.0 ) {
		return ( sum >= 0.0 ) ? PINF : NINF;
	}
	powTerms -= ln( abs( s ) ) * ( n+1 );
	powTerms += gammaln( n ) + ln( abs(sum) );

	if ( powTerms > MAX_LN ) {
		return ( sum >= 0.0 ) ? PINF : NINF;
	}
	out = exp( powTerms ) * signum( sum );
	if ( s < 0.0 && ( (n+1)&1 ) ) {
		out *= -1;
	}
	return out;
}


// EXPORTS //

module.exports = polycotpi;

},{"./polyval_p10.js":144,"./polyval_p11.js":145,"./polyval_p12.js":146,"./polyval_p3.js":147,"./polyval_p4.js":148,"./polyval_p5.js":149,"./polyval_p6.js":150,"./polyval_p7.js":151,"./polyval_p8.js":152,"./polyval_p9.js":153,"@stdlib/constants/math/float64-ln-pi":40,"@stdlib/constants/math/float64-max-ln":45,"@stdlib/constants/math/float64-ninf":49,"@stdlib/constants/math/float64-pi":51,"@stdlib/constants/math/float64-pinf":52,"@stdlib/math/base/special/abs":75,"@stdlib/math/base/special/cospi":86,"@stdlib/math/base/special/exp":95,"@stdlib/math/base/special/gammaln":109,"@stdlib/math/base/special/ln":132,"@stdlib/math/base/special/pow":162,"@stdlib/math/base/special/signum":190,"@stdlib/math/base/special/sinpi":194,"@stdlib/math/base/tools/evalpoly":210,"debug":268}],143:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_65_0/boost/math/special_functions/detail/polygamma.hpp}.
*
* The implementation follows the original but has been reformatted and modified for JavaScript.
*/

/*
* (C) Copyright Nikhar Agrawal 2013.
* (C) Copyright Christopher Kormanyos 2013.
* (C) Copyright John Maddock 2014.
* (C) Copyright Paul Bristow 2013.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var logger = require( 'debug' );
var isNonNegativeInteger = require( '@stdlib/math/base/assert/is-nonnegative-integer' );
var factorial = require( '@stdlib/math/base/special/factorial' );
var trigamma = require( '@stdlib/math/base/special/trigamma' );
var digamma = require( '@stdlib/math/base/special/digamma' );
var signum = require( '@stdlib/math/base/special/signum' );
var ldexp = require( '@stdlib/math/base/special/ldexp' );
var floor = require( '@stdlib/math/base/special/floor' );
var trunc = require( '@stdlib/math/base/special/trunc' );
var zeta = require( '@stdlib/math/base/special/riemann-zeta' );
var abs = require( '@stdlib/math/base/special/abs' );
var min = require( '@stdlib/math/base/special/min' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var MAX = require( '@stdlib/constants/math/float64-max' );
var PI = require( '@stdlib/constants/math/float64-pi' );
var attransitionplus = require( './attransitionplus.js' );
var atinfinityplus = require( './atinfinityplus.js' );
var polycotpi = require( './polycotpi.js' );
var nearzero = require( './nearzero.js' );


// VARIABLES //

var debug = logger( 'polygamma' );
var DIGITS_BASE10 = 19;


// MAIN //

/**
* Evaluates the polygamma function.
*
* @param {NonNegativeInteger} n - order of derivative
* @param {number} x - input value
* @returns {number} (n+1)'th derivative
*
* @example
* var v = polygamma( 3, 1.2 );
* // returns ~3.245
*
* @example
* var v = polygamma( 5, 1.2 );
* // returns ~41.39
*
* @example
* var v = polygamma( 3, -4.9 );
* // returns ~60014.239
*
* @example
* var v = polygamma( 2.5, -1.2 );
* // returns NaN
*
* @example
* var v = polygamma( -1, 5.3 );
* // returns NaN
*
* @example
* var v = polygamma( 2, 0.0 );
* // returns NaN
*
* @example
* var v = polygamma( 2, -1.0 );
* // returns NaN
*
* @example
* var v = polygamma( 2, -2.0 );
* // returns NaN
*
* @example
* var v = polygamma( NaN, 2.1 );
* // returns NaN
*
* @example
* var v = polygamma( 1, NaN );
* // returns NaN
*
* @example
* var v = polygamma( NaN, NaN );
* // returns NaN
*/
function polygamma( n, x ) {
	var xSmallLimit;
	var result;
	var z;

	if ( !isNonNegativeInteger( n ) ) {
		return NaN;
	}
	if ( n === 0 ) {
		return digamma( x );
	}
	if ( n === 1 ) {
		return trigamma( x );
	}
	if ( x < 0.0 ) {
		if ( floor(x) === x ) {
			// Result is infinity if `x` is odd, and a pole error if `x` is even.
			if ( trunc( x ) & 1 ) {
				return PINF;
			}
			debug( 'Evaluation at negative integer: %d.', x );
			return NaN;
		}
		z = 1.0 - x;
		result = polygamma( n, z ) + ( PI * polycotpi( n, z, x ) );
		return ( n & 1 ) ? -result : result;
	}
	// Limit for use of small-x series is chosen so that the series doesn't go too divergent in the first few terms. Ordinarily, this would mean setting the limit to `~1/n`, but we can tolerate a small amount of divergence:
	xSmallLimit = min( 5.0/n, 0.25 );
	if ( x < xSmallLimit ) {
		return nearzero( n, x );
	}
	if ( x > ( 0.4 * DIGITS_BASE10 ) + ( 4*n ) ) {
		return atinfinityplus( n, x );
	}
	if ( x === 1.0 ) {
		return ( ( n & 1 ) ? 1.0 : -1.0 ) * factorial( n ) * zeta( n+1 );
	}
	if ( x === 0.5 ) {
		result = ( ( n & 1 ) ? 1.0 : -1.0 ) * factorial( n ) * zeta( n+1 );
		if ( abs( result ) >= ldexp( MAX, -n-1 ) ) {
			return ( signum( result ) === 1 ) ? PINF : NINF;
		}
		result *= ldexp( 1.0, n+1 ) - 1.0;
		return result;
	}
	return attransitionplus( n, x );
}


// EXPORTS //

module.exports = polygamma;

},{"./atinfinityplus.js":138,"./attransitionplus.js":139,"./nearzero.js":141,"./polycotpi.js":142,"@stdlib/constants/math/float64-max":47,"@stdlib/constants/math/float64-ninf":49,"@stdlib/constants/math/float64-pi":51,"@stdlib/constants/math/float64-pinf":52,"@stdlib/math/base/assert/is-nonnegative-integer":70,"@stdlib/math/base/special/abs":75,"@stdlib/math/base/special/digamma":89,"@stdlib/math/base/special/factorial":99,"@stdlib/math/base/special/floor":101,"@stdlib/math/base/special/ldexp":130,"@stdlib/math/base/special/min":136,"@stdlib/math/base/special/riemann-zeta":179,"@stdlib/math/base/special/signum":190,"@stdlib/math/base/special/trigamma":199,"@stdlib/math/base/special/trunc":206,"debug":268}],144:[function(require,module,exports){
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
		return 353792.0;
	}
	return 353792.0 + (x * (1841152.0 + (x * (1304832.0 + (x * (128512.0 + (x * 512.0))))))); // eslint-disable-line max-len
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
		return -353792.0;
	}
	return -353792.0 + (x * (-9061376.0 + (x * (-21253376.0 + (x * (-8728576.0 + (x * (-518656.0 + (x * -1024.0))))))))); // eslint-disable-line max-len
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
		return 22368256.0;
	}
	return 22368256.0 + (x * (175627264.0 + (x * (222398464.0 + (x * (56520704.0 + (x * (2084864.0 + (x * 2048.0))))))))); // eslint-disable-line max-len
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
		return -2.0;
	}
	return -2.0 + (x * -4.0); // eslint-disable-line max-len
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
		return 16.0;
	}
	return 16.0 + (x * 8.0); // eslint-disable-line max-len
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
		return -16.0;
	}
	return -16.0 + (x * (-88.0 + (x * -16.0))); // eslint-disable-line max-len
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
		return 272.0;
	}
	return 272.0 + (x * (416.0 + (x * 32.0))); // eslint-disable-line max-len
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
		return -272.0;
	}
	return -272.0 + (x * (-2880.0 + (x * (-1824.0 + (x * -64.0))))); // eslint-disable-line max-len
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
		return 7936.0;
	}
	return 7936.0 + (x * (24576.0 + (x * (7680.0 + (x * 128.0))))); // eslint-disable-line max-len
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
		return -7936.0;
	}
	return -7936.0 + (x * (-137216.0 + (x * (-185856.0 + (x * (-31616.0 + (x * -256.0))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],154:[function(require,module,exports){
module.exports={"n":[149,65,179,155,48,62,26,131,45,157,70,196,57,104,186,14,10,171,119,69,32,56,168,110,33,71,100,120,200,39,71,71,9,43,42,59,79,69,67,15,46,36,188,72,137,95,193,148,88,166,189,62,1,158,122,192,161,11,46,16,187,22,153,115,166,105,115,191,159,42,66,145,44,146,62,16,117,50,166,89,58,137,80,180,173,0,123,149,199,195,40,44,166,193,135,188,50,51,95,163,80,46,120,174,160,168,21,154,165,196,169,54,71,137,86,31,115,154,140,18,149,179,152,157,78,109,86,32,192,23,115,24,170,110,55,99,125,142,118,110,193,96,17,110,100,19,104,65,18,191,181,100,177,200,88,139,157,6,29,13,124,107,52,22,89,33,169,173,39,83,61,92,97,168,67,3,160,176,198,154,31,88,47,63,141,71,75,99,195,156,195,121,129,142,172,21,80,120,127,192,198,57,112,60,187,165,144,98,97,199,128,76,178,86,39,13,79,3,199,176,80,177,132,194,181,42,200,107,131,120,21,196,7,32,124,161,113,141,193,158,149,191,133,99,105,126,52,197,193,149,108,114,6,112,139,50,104,185,11,12,178,12,66,154,46,180,22,168,62,36,45,56,131,89,13,122,55,4,56,198,176,174,89,45,151,175,121,175,157,108,22,95,196,74,170,155,10,170,93,185,65,136,126,10,46,105,116,123,121,192,120,63,90,55,7,82,103,155,81,190,21,111,92,15,90,159,110,136,161,110,140,88,175,124,10,23,44,100,92,58,192,97,158,166,90,73,67,128,11,121,148,83,101,116,40,144,85,169,33,189,151,27,74,14,189,134,3,85,166,92,125,8,108,46,130,174,146,185,18,74,176,123,2,66,59,184,36,45,186,27,13,65,116,153,128,96,130,6,173,20,11,74,164,106,106,144,139,137,42,119,109,10,141,161,192,51,89,20,17,166,11,65,126,26,160,77,138,62,69,146,190,180,104,128,191,35,14,5,41,139,155,66,183,66,157,197,59,71,30,171,170,171,157,5,54,178,45,43,64,167,166,125,165,32,114,120,114,116,57,140,140,180,160,9,88,166,89,120,93,93,56,148,135,157,181,121,182,195,150,42,52,120,138,7,26,80,24,24,38,46,29,58,117,165,14,73,165,43,145,127,186,62,99,82,131,147,178,171,108,15,56,3,196,135,7,187,65,74,195,183,73,123,62,92,24,109,184,35,27,192,66,174,180,16,100,152,123,187,117,19,140,120,5,80,106,200,6,115,166,61,68,37,170,34,49,45,116,149,188,61,9,163,10,156,4,139,136,172,120,152,22,31,160,181,124,9,14,133,13,59,27,139,158,113,18,18,47,165,48,52,21,45,172,60,140,61,147,12,130,82,103,74,65,188,133,115,23,47,29,98,3,52,193,34,195,44,24,172,93,168,131,23,58,90,151,95,112,162,85,46,53,60,151,76,180,46,146,42,81,71,188,45,51,134,107,162,191,100,53,3,50,117,186,168,13,0,60,129,118,176,40,79,127,45,160,21,100,77,130,48,159,151,46,185,120,42,22,183,103,30,168,191,185,52,100,144,55,19,131,121,184,68,102,19,195,119,39,78,22,183,59,134,79,36,84,173,62,167,139,199,18,146,80,181,59,174,61,64,21,26,119,182,56,175,31,60,0,174,57,110,110,39,175,91,8,150,181,165,26,60,167,37,160,123,184,105,27,16,101,183,81,27,34,33,115,130,121,117,43,11,104,198,198,188,98,2,139,131,82,185,6,8,58,25,161,33,69,185,16,164,102,175,73,111,148,9,105,119,161,60,164,86,38,159,24,150,165,21,128,51,3,37,180,103,103,47,109,82,121,71,152,89,171,159,76,51,17,155,147,161,66,189,168,132,74,170,166,168,35,66,26,96,176,67,8,95,138,131,147,33,87,54,76,87,196,159,80,134,88,106,31,80,65,172,63,104,179,161,49,20,62,131,82,178,142,120,28,133,175,26,16,106,92,120,6,143,151,45,140,122,43,61,136,29,112,87,170,113,112,50,181,72,84,17,71,169,98,121,51,3,186,42,93,26,51,119,86,53,141,193,80,158,36,43,172,81,117,10,75,88,44,75,44,185,104,199,87,174,149,13,14,118,170,139,136,79,27,160,172,92,40,38,122,85,109,182,32,72,1,193,155,128,153,40,84,161,11,14,117,177,35,45,146,92,107,163,50,148,184,40,152,32,178,109,13,43,36,85,148,13,140,117,156,95,100,119,85,105,122,193],"x":[1e+201,1.008908908908909e+201,1.0178178178178178e+201,1.0267267267267268e+201,1.0356356356356356e+201,1.0445445445445446e+201,1.0534534534534535e+201,1.0623623623623624e+201,1.0712712712712713e+201,1.0801801801801802e+201,1.0890890890890891e+201,1.097997997997998e+201,1.106906906906907e+201,1.1158158158158158e+201,1.1247247247247248e+201,1.1336336336336336e+201,1.1425425425425426e+201,1.1514514514514514e+201,1.1603603603603604e+201,1.1692692692692693e+201,1.1781781781781782e+201,1.1870870870870872e+201,1.195995995995996e+201,1.204904904904905e+201,1.2138138138138138e+201,1.2227227227227228e+201,1.2316316316316318e+201,1.2405405405405405e+201,1.2494494494494494e+201,1.2583583583583584e+201,1.2672672672672674e+201,1.2761761761761764e+201,1.2850850850850851e+201,1.293993993993994e+201,1.302902902902903e+201,1.311811811811812e+201,1.3207207207207207e+201,1.3296296296296296e+201,1.3385385385385386e+201,1.3474474474474476e+201,1.3563563563563565e+201,1.3652652652652652e+201,1.3741741741741742e+201,1.3830830830830832e+201,1.3919919919919922e+201,1.4009009009009009e+201,1.4098098098098098e+201,1.4187187187187188e+201,1.4276276276276278e+201,1.4365365365365367e+201,1.4454454454454454e+201,1.4543543543543544e+201,1.4632632632632634e+201,1.4721721721721723e+201,1.481081081081081e+201,1.48998998998999e+201,1.498898898898899e+201,1.507807807807808e+201,1.5167167167167169e+201,1.5256256256256256e+201,1.5345345345345346e+201,1.5434434434434436e+201,1.5523523523523525e+201,1.5612612612612612e+201,1.5701701701701702e+201,1.5790790790790792e+201,1.5879879879879881e+201,1.5968968968968971e+201,1.6058058058058058e+201,1.6147147147147148e+201,1.6236236236236238e+201,1.6325325325325325e+201,1.6414414414414414e+201,1.6503503503503504e+201,1.6592592592592594e+201,1.6681681681681683e+201,1.6770770770770773e+201,1.6859859859859863e+201,1.694894894894895e+201,1.703803803803804e+201,1.7127127127127126e+201,1.7216216216216216e+201,1.7305305305305306e+201,1.7394394394394396e+201,1.7483483483483485e+201,1.7572572572572575e+201,1.7661661661661665e+201,1.7750750750750752e+201,1.7839839839839841e+201,1.7928928928928928e+201,1.8018018018018018e+201,1.8107107107107108e+201,1.8196196196196198e+201,1.8285285285285287e+201,1.8374374374374377e+201,1.8463463463463467e+201,1.8552552552552554e+201,1.8641641641641643e+201,1.873073073073073e+201,1.881981981981982e+201,1.890890890890891e+201,1.8997997997997999e+201,1.9087087087087089e+201,1.9176176176176179e+201,1.9265265265265269e+201,1.9354354354354356e+201,1.9443443443443445e+201,1.9532532532532532e+201,1.9621621621621622e+201,1.9710710710710712e+201,1.9799799799799801e+201,1.9888888888888891e+201,1.9977977977977981e+201,2.006706706706707e+201,2.0156156156156157e+201,2.0245245245245247e+201,2.0334334334334334e+201,2.0423423423423424e+201,2.0512512512512514e+201,2.0601601601601603e+201,2.0690690690690693e+201,2.0779779779779783e+201,2.0868868868868872e+201,2.0957957957957959e+201,2.1047047047047049e+201,2.1136136136136136e+201,2.1225225225225226e+201,2.1314314314314315e+201,2.1403403403403405e+201,2.1492492492492495e+201,2.1581581581581585e+201,2.1670670670670674e+201,2.1759759759759761e+201,2.1848848848848851e+201,2.1937937937937938e+201,2.2027027027027028e+201,2.2116116116116117e+201,2.2205205205205207e+201,2.2294294294294297e+201,2.2383383383383386e+201,2.2472472472472476e+201,2.2561561561561566e+201,2.265065065065065e+201,2.273973973973974e+201,2.282882882882883e+201,2.2917917917917919e+201,2.3007007007007009e+201,2.3096096096096099e+201,2.3185185185185188e+201,2.3274274274274278e+201,2.3363363363363368e+201,2.3452452452452452e+201,2.3541541541541542e+201,2.3630630630630631e+201,2.3719719719719721e+201,2.3808808808808811e+201,2.3897897897897901e+201,2.398698698698699e+201,2.407607607607608e+201,2.416516516516517e+201,2.4254254254254254e+201,2.4343343343343344e+201,2.4432432432432433e+201,2.4521521521521523e+201,2.4610610610610613e+201,2.4699699699699702e+201,2.4788788788788792e+201,2.4877877877877882e+201,2.4966966966966972e+201,2.5056056056056056e+201,2.5145145145145146e+201,2.5234234234234235e+201,2.5323323323323325e+201,2.5412412412412415e+201,2.5501501501501504e+201,2.5590590590590594e+201,2.5679679679679684e+201,2.5768768768768774e+201,2.5857857857857858e+201,2.5946946946946947e+201,2.6036036036036037e+201,2.6125125125125127e+201,2.6214214214214217e+201,2.6303303303303306e+201,2.6392392392392396e+201,2.6481481481481486e+201,2.6570570570570575e+201,2.665965965965966e+201,2.6748748748748749e+201,2.6837837837837839e+201,2.6926926926926929e+201,2.7016016016016019e+201,2.7105105105105108e+201,2.7194194194194198e+201,2.7283283283283288e+201,2.7372372372372377e+201,2.7461461461461462e+201,2.7550550550550551e+201,2.7639639639639641e+201,2.7728728728728731e+201,2.781781781781782e+201,2.790690690690691e+201,2.7995995995996e+201,2.808508508508509e+201,2.8174174174174179e+201,2.8263263263263264e+201,2.8352352352352353e+201,2.8441441441441443e+201,2.8530530530530533e+201,2.8619619619619622e+201,2.8708708708708712e+201,2.8797797797797802e+201,2.8886886886886891e+201,2.8975975975975981e+201,2.9065065065065065e+201,2.9154154154154155e+201,2.9243243243243245e+201,2.9332332332332335e+201,2.9421421421421424e+201,2.9510510510510514e+201,2.9599599599599604e+201,2.9688688688688693e+201,2.9777777777777783e+201,2.9866866866866867e+201,2.9955955955955957e+201,3.0045045045045047e+201,3.0134134134134136e+201,3.0223223223223226e+201,3.0312312312312316e+201,3.0401401401401406e+201,3.0490490490490495e+201,3.0579579579579585e+201,3.0668668668668669e+201,3.0757757757757759e+201,3.0846846846846849e+201,3.0935935935935938e+201,3.1025025025025028e+201,3.1114114114114118e+201,3.1203203203203207e+201,3.1292292292292297e+201,3.1381381381381387e+201,3.1470470470470471e+201,3.1559559559559561e+201,3.1648648648648651e+201,3.173773773773774e+201,3.182682682682683e+201,3.191591591591592e+201,3.2005005005005009e+201,3.2094094094094099e+201,3.2183183183183189e+201,3.2272272272272273e+201,3.2361361361361363e+201,3.2450450450450452e+201,3.2539539539539542e+201,3.2628628628628632e+201,3.2717717717717722e+201,3.2806806806806811e+201,3.2895895895895901e+201,3.2984984984984991e+201,3.3074074074074075e+201,3.3163163163163165e+201,3.3252252252252254e+201,3.3341341341341344e+201,3.3430430430430434e+201,3.3519519519519524e+201,3.3608608608608613e+201,3.3697697697697703e+201,3.3786786786786793e+201,3.3875875875875877e+201,3.3964964964964967e+201,3.4054054054054056e+201,3.4143143143143146e+201,3.4232232232232236e+201,3.4321321321321325e+201,3.4410410410410415e+201,3.4499499499499499e+201,3.4588588588588589e+201,3.4677677677677679e+201,3.4766766766766768e+201,3.4855855855855858e+201,3.4944944944944948e+201,3.5034034034034038e+201,3.5123123123123127e+201,3.5212212212212212e+201,3.5301301301301301e+201,3.5390390390390391e+201,3.5479479479479481e+201,3.556856856856857e+201,3.565765765765766e+201,3.574674674674675e+201,3.583583583583584e+201,3.5924924924924929e+201,3.6014014014014013e+201,3.6103103103103103e+201,3.6192192192192193e+201,3.6281281281281283e+201,3.6370370370370372e+201,3.6459459459459462e+201,3.6548548548548552e+201,3.6637637637637641e+201,3.6726726726726731e+201,3.6815815815815815e+201,3.6904904904904905e+201,3.6993993993993995e+201,3.7083083083083085e+201,3.7172172172172174e+201,3.7261261261261264e+201,3.7350350350350354e+201,3.7439439439439443e+201,3.7528528528528533e+201,3.7617617617617617e+201,3.7706706706706707e+201,3.7795795795795797e+201,3.7884884884884886e+201,3.7973973973973976e+201,3.8063063063063066e+201,3.8152152152152156e+201,3.8241241241241245e+201,3.8330330330330335e+201,3.8419419419419419e+201,3.8508508508508509e+201,3.8597597597597599e+201,3.8686686686686688e+201,3.8775775775775778e+201,3.8864864864864868e+201,3.8953953953953957e+201,3.9043043043043047e+201,3.9132132132132137e+201,3.9221221221221221e+201,3.9310310310310311e+201,3.9399399399399401e+201,3.948848848848849e+201,3.957757757757758e+201,3.966666666666667e+201,3.9755755755755759e+201,3.9844844844844849e+201,3.9933933933933939e+201,4.0023023023023023e+201,4.0112112112112113e+201,4.0201201201201202e+201,4.0290290290290292e+201,4.0379379379379382e+201,4.0468468468468472e+201,4.0557557557557561e+201,4.0646646646646651e+201,4.0735735735735741e+201,4.0824824824824825e+201,4.0913913913913915e+201,4.1003003003003004e+201,4.1092092092092094e+201,4.1181181181181184e+201,4.1270270270270273e+201,4.1359359359359363e+201,4.1448448448448453e+201,4.1537537537537543e+201,4.1626626626626627e+201,4.1715715715715717e+201,4.1804804804804806e+201,4.1893893893893896e+201,4.1982982982982986e+201,4.2072072072072075e+201,4.2161161161161165e+201,4.2250250250250255e+201,4.2339339339339345e+201,4.2428428428428429e+201,4.2517517517517518e+201,4.2606606606606608e+201,4.2695695695695698e+201,4.2784784784784788e+201,4.2873873873873877e+201,4.2962962962962967e+201,4.3052052052052057e+201,4.3141141141141146e+201,4.3230230230230231e+201,4.331931931931932e+201,4.340840840840841e+201,4.34974974974975e+201,4.3586586586586589e+201,4.3675675675675679e+201,4.3764764764764769e+201,4.3853853853853859e+201,4.3942942942942948e+201,4.4032032032032033e+201,4.4121121121121122e+201,4.4210210210210212e+201,4.4299299299299302e+201,4.4388388388388391e+201,4.4477477477477481e+201,4.4566566566566571e+201,4.4655655655655661e+201,4.474474474474475e+201,4.4833833833833834e+201,4.4922922922922924e+201,4.5012012012012014e+201,4.5101101101101104e+201,4.5190190190190193e+201,4.5279279279279283e+201,4.5368368368368373e+201,4.5457457457457462e+201,4.5546546546546552e+201,4.5635635635635636e+201,4.5724724724724726e+201,4.5813813813813816e+201,4.5902902902902906e+201,4.5991991991991995e+201,4.6081081081081085e+201,4.6170170170170175e+201,4.6259259259259264e+201,4.6348348348348354e+201,4.6437437437437438e+201,4.6526526526526528e+201,4.6615615615615618e+201,4.6704704704704707e+201,4.6793793793793797e+201,4.6882882882882887e+201,4.6971971971971977e+201,4.7061061061061066e+201,4.7150150150150156e+201,4.723923923923924e+201,4.732832832832833e+201,4.741741741741742e+201,4.7506506506506509e+201,4.7595595595595599e+201,4.7684684684684689e+201,4.7773773773773778e+201,4.7862862862862868e+201,4.7951951951951958e+201,4.8041041041041042e+201,4.8130130130130132e+201,4.8219219219219222e+201,4.8308308308308311e+201,4.8397397397397401e+201,4.8486486486486491e+201,4.857557557557558e+201,4.866466466466467e+201,4.875375375375376e+201,4.8842842842842844e+201,4.8931931931931934e+201,4.9021021021021029e+201,4.9110110110110119e+201,4.9199199199199208e+201,4.9288288288288298e+201,4.9377377377377388e+201,4.9466466466466477e+201,4.9555555555555567e+201,4.9644644644644646e+201,4.9733733733733736e+201,4.9822822822822825e+201,4.9911911911911915e+201,5.0001001001001005e+201,5.0090090090090094e+201,5.0179179179179184e+201,5.0268268268268274e+201,5.0357357357357364e+201,5.0446446446446453e+201,5.0535535535535543e+201,5.0624624624624633e+201,5.0713713713713722e+201,5.0802802802802812e+201,5.0891891891891902e+201,5.0980980980980992e+201,5.1070070070070081e+201,5.1159159159159171e+201,5.124824824824825e+201,5.1337337337337339e+201,5.1426426426426429e+201,5.1515515515515519e+201,5.1604604604604609e+201,5.1693693693693698e+201,5.1782782782782788e+201,5.1871871871871878e+201,5.1960960960960967e+201,5.2050050050050057e+201,5.2139139139139147e+201,5.2228228228228237e+201,5.2317317317317326e+201,5.2406406406406416e+201,5.2495495495495506e+201,5.2584584584584595e+201,5.2673673673673685e+201,5.2762762762762775e+201,5.2851851851851854e+201,5.2940940940940943e+201,5.3030030030030033e+201,5.3119119119119123e+201,5.3208208208208212e+201,5.3297297297297302e+201,5.3386386386386392e+201,5.3475475475475482e+201,5.3564564564564571e+201,5.3653653653653661e+201,5.3742742742742751e+201,5.383183183183184e+201,5.392092092092093e+201,5.401001001001002e+201,5.4099099099099109e+201,5.4188188188188199e+201,5.4277277277277289e+201,5.4366366366366379e+201,5.4455455455455457e+201,5.4544544544544547e+201,5.4633633633633637e+201,5.4722722722722727e+201,5.4811811811811816e+201,5.4900900900900906e+201,5.4989989989989996e+201,5.5079079079079085e+201,5.5168168168168175e+201,5.5257257257257265e+201,5.5346346346346354e+201,5.5435435435435444e+201,5.5524524524524534e+201,5.5613613613613624e+201,5.5702702702702713e+201,5.5791791791791803e+201,5.5880880880880893e+201,5.5969969969969982e+201,5.6059059059059061e+201,5.6148148148148151e+201,5.6237237237237241e+201,5.632632632632633e+201,5.641541541541542e+201,5.650450450450451e+201,5.6593593593593599e+201,5.6682682682682689e+201,5.6771771771771779e+201,5.6860860860860869e+201,5.6949949949949958e+201,5.7039039039039048e+201,5.7128128128128138e+201,5.7217217217217227e+201,5.7306306306306317e+201,5.7395395395395407e+201,5.7484484484484497e+201,5.7573573573573586e+201,5.7662662662662665e+201,5.7751751751751755e+201,5.7840840840840844e+201,5.7929929929929934e+201,5.8019019019019024e+201,5.8108108108108114e+201,5.8197197197197203e+201,5.8286286286286293e+201,5.8375375375375383e+201,5.8464464464464472e+201,5.8553553553553562e+201,5.8642642642642652e+201,5.8731731731731742e+201,5.8820820820820831e+201,5.8909909909909921e+201,5.8998998998999e+201,5.9088088088088089e+201,5.9177177177177179e+201,5.9266266266266269e+201,5.9355355355355359e+201,5.9444444444444448e+201,5.9533533533533538e+201,5.9622622622622628e+201,5.9711711711711717e+201,5.9800800800800807e+201,5.9889889889889897e+201,5.9978978978978987e+201,6.0068068068068076e+201,6.0157157157157166e+201,6.0246246246246256e+201,6.0335335335335345e+201,6.0424424424424424e+201,6.0513513513513514e+201,6.0602602602602604e+201,6.0691691691691693e+201,6.0780780780780783e+201,6.0869869869869873e+201,6.0958958958958962e+201,6.1048048048048052e+201,6.1137137137137142e+201,6.1226226226226232e+201,6.1315315315315321e+201,6.1404404404404411e+201,6.1493493493493501e+201,6.158258258258259e+201,6.167167167167168e+201,6.176076076076077e+201,6.1849849849849859e+201,6.1938938938938949e+201,6.2028028028028028e+201,6.2117117117117118e+201,6.2206206206206207e+201,6.2295295295295297e+201,6.2384384384384387e+201,6.2473473473473476e+201,6.2562562562562566e+201,6.2651651651651656e+201,6.2740740740740746e+201,6.2829829829829835e+201,6.2918918918918925e+201,6.3008008008008015e+201,6.3097097097097104e+201,6.3186186186186194e+201,6.3275275275275284e+201,6.3364364364364374e+201,6.3453453453453463e+201,6.3542542542542553e+201,6.3631631631631632e+201,6.3720720720720721e+201,6.3809809809809811e+201,6.3898898898898901e+201,6.3987987987987991e+201,6.407707707707708e+201,6.416616616616617e+201,6.425525525525526e+201,6.4344344344344349e+201,6.4433433433433439e+201,6.4522522522522529e+201,6.4611611611611619e+201,6.4700700700700708e+201,6.4789789789789798e+201,6.4878878878878888e+201,6.4967967967967977e+201,6.5057057057057067e+201,6.5146146146146157e+201,6.5235235235235236e+201,6.5324324324324325e+201,6.5413413413413415e+201,6.5502502502502505e+201,6.5591591591591594e+201,6.5680680680680684e+201,6.5769769769769774e+201,6.5858858858858864e+201,6.5947947947947953e+201,6.6037037037037043e+201,6.6126126126126133e+201,6.6215215215215222e+201,6.6304304304304312e+201,6.6393393393393402e+201,6.6482482482482491e+201,6.6571571571571581e+201,6.6660660660660671e+201,6.6749749749749761e+201,6.6838838838838839e+201,6.6927927927927929e+201,6.7017017017017019e+201,6.7106106106106109e+201,6.7195195195195198e+201,6.7284284284284288e+201,6.7373373373373378e+201,6.7462462462462467e+201,6.7551551551551557e+201,6.7640640640640647e+201,6.7729729729729736e+201,6.7818818818818826e+201,6.7907907907907916e+201,6.7996996996997006e+201,6.8086086086086095e+201,6.8175175175175185e+201,6.8264264264264275e+201,6.8353353353353364e+201,6.8442442442442443e+201,6.8531531531531533e+201,6.8620620620620623e+201,6.8709709709709712e+201,6.8798798798798802e+201,6.8887887887887892e+201,6.8976976976976981e+201,6.9066066066066071e+201,6.9155155155155161e+201,6.9244244244244251e+201,6.933333333333334e+201,6.942242242242243e+201,6.951151151151152e+201,6.9600600600600609e+201,6.9689689689689699e+201,6.9778778778778789e+201,6.9867867867867879e+201,6.9956956956956968e+201,7.0046046046046047e+201,7.0135135135135137e+201,7.0224224224224226e+201,7.0313313313313316e+201,7.0402402402402406e+201,7.0491491491491496e+201,7.0580580580580585e+201,7.0669669669669675e+201,7.0758758758758765e+201,7.0847847847847854e+201,7.0936936936936944e+201,7.1026026026026034e+201,7.1115115115115124e+201,7.1204204204204213e+201,7.1293293293293303e+201,7.1382382382382393e+201,7.1471471471471482e+201,7.1560560560560572e+201,7.1649649649649651e+201,7.1738738738738741e+201,7.182782782782783e+201,7.191691691691692e+201,7.200600600600601e+201,7.2095095095095099e+201,7.2184184184184189e+201,7.2273273273273279e+201,7.2362362362362369e+201,7.2451451451451458e+201,7.2540540540540548e+201,7.2629629629629638e+201,7.2718718718718727e+201,7.2807807807807817e+201,7.2896896896896907e+201,7.2985985985985996e+201,7.3075075075075086e+201,7.3164164164164176e+201,7.3253253253253255e+201,7.3342342342342344e+201,7.3431431431431434e+201,7.3520520520520524e+201,7.3609609609609614e+201,7.3698698698698703e+201,7.3787787787787793e+201,7.3876876876876883e+201,7.3965965965965972e+201,7.4055055055055062e+201,7.4144144144144152e+201,7.4233233233233241e+201,7.4322322322322331e+201,7.4411411411411421e+201,7.4500500500500511e+201,7.45895895895896e+201,7.467867867867869e+201,7.476776776776778e+201,7.4856856856856859e+201,7.4945945945945948e+201,7.5035035035035038e+201,7.5124124124124128e+201,7.5213213213213217e+201,7.5302302302302307e+201,7.5391391391391397e+201,7.5480480480480486e+201,7.5569569569569576e+201,7.5658658658658666e+201,7.5747747747747756e+201,7.5836836836836845e+201,7.5925925925925935e+201,7.6015015015015025e+201,7.6104104104104114e+201,7.6193193193193204e+201,7.6282282282282294e+201,7.6371371371371384e+201,7.6460460460460462e+201,7.6549549549549552e+201,7.6638638638638642e+201,7.6727727727727731e+201,7.6816816816816821e+201,7.6905905905905911e+201,7.6994994994995001e+201,7.708408408408409e+201,7.717317317317318e+201,7.726226226226227e+201,7.7351351351351359e+201,7.7440440440440449e+201,7.7529529529529539e+201,7.7618618618618629e+201,7.7707707707707718e+201,7.7796796796796808e+201,7.7885885885885898e+201,7.7974974974974987e+201,7.8064064064064066e+201,7.8153153153153156e+201,7.8242242242242246e+201,7.8331331331331335e+201,7.8420420420420425e+201,7.8509509509509515e+201,7.8598598598598604e+201,7.8687687687687694e+201,7.8776776776776784e+201,7.8865865865865874e+201,7.8954954954954963e+201,7.9044044044044053e+201,7.9133133133133143e+201,7.9222222222222232e+201,7.9311311311311322e+201,7.9400400400400412e+201,7.9489489489489501e+201,7.9578578578578591e+201,7.966766766766767e+201,7.975675675675676e+201,7.9845845845845849e+201,7.9934934934934939e+201,8.0024024024024029e+201,8.0113113113113119e+201,8.0202202202202208e+201,8.0291291291291298e+201,8.0380380380380388e+201,8.0469469469469477e+201,8.0558558558558567e+201,8.0647647647647657e+201,8.0736736736736746e+201,8.0825825825825836e+201,8.0914914914914926e+201,8.1004004004004016e+201,8.1093093093093105e+201,8.1182182182182195e+201,8.1271271271271274e+201,8.1360360360360363e+201,8.1449449449449453e+201,8.1538538538538543e+201,8.1627627627627633e+201,8.1716716716716722e+201,8.1805805805805812e+201,8.1894894894894902e+201,8.1983983983983991e+201,8.2073073073073081e+201,8.2162162162162171e+201,8.2251251251251261e+201,8.234034034034035e+201,8.242942942942944e+201,8.251851851851853e+201,8.2607607607607619e+201,8.2696696696696709e+201,8.2785785785785799e+201,8.2874874874874878e+201,8.2963963963963967e+201,8.3053053053053057e+201,8.3142142142142147e+201,8.3231231231231236e+201,8.3320320320320326e+201,8.3409409409409416e+201,8.3498498498498506e+201,8.3587587587587595e+201,8.3676676676676685e+201,8.3765765765765775e+201,8.3854854854854864e+201,8.3943943943943954e+201,8.4033033033033044e+201,8.4122122122122133e+201,8.4211211211211223e+201,8.4300300300300313e+201,8.4389389389389403e+201,8.4478478478478481e+201,8.4567567567567571e+201,8.4656656656656661e+201,8.4745745745745751e+201,8.483483483483484e+201,8.492392392392393e+201,8.501301301301302e+201,8.5102102102102109e+201,8.5191191191191199e+201,8.5280280280280289e+201,8.5369369369369378e+201,8.5458458458458468e+201,8.5547547547547558e+201,8.5636636636636648e+201,8.5725725725725737e+201,8.5814814814814827e+201,8.5903903903903917e+201,8.5992992992993006e+201,8.6082082082082085e+201,8.6171171171171175e+201,8.6260260260260265e+201,8.6349349349349354e+201,8.6438438438438444e+201,8.6527527527527534e+201,8.6616616616616623e+201,8.6705705705705713e+201,8.6794794794794803e+201,8.6883883883883893e+201,8.6972972972972982e+201,8.7062062062062072e+201,8.7151151151151162e+201,8.7240240240240251e+201,8.7329329329329341e+201,8.7418418418418431e+201,8.7507507507507521e+201,8.759659659659661e+201,8.7685685685685689e+201,8.7774774774774779e+201,8.7863863863863868e+201,8.7952952952952958e+201,8.8042042042042048e+201,8.8131131131131138e+201,8.8220220220220227e+201,8.8309309309309317e+201,8.8398398398398407e+201,8.8487487487487496e+201,8.8576576576576586e+201,8.8665665665665676e+201,8.8754754754754766e+201,8.8843843843843855e+201,8.8932932932932945e+201,8.9022022022022035e+201,8.9111111111111124e+201,8.9200200200200214e+201,8.9289289289289293e+201,8.9378378378378383e+201,8.9467467467467472e+201,8.9556556556556562e+201,8.9645645645645652e+201,8.9734734734734741e+201,8.9823823823823831e+201,8.9912912912912921e+201,9.0002002002002011e+201,9.00910910910911e+201,9.018018018018019e+201,9.026926926926928e+201,9.0358358358358369e+201,9.0447447447447459e+201,9.0536536536536549e+201,9.0625625625625638e+201,9.0714714714714728e+201,9.0803803803803818e+201,9.0892892892892897e+201,9.0981981981981986e+201,9.1071071071071076e+201,9.1160160160160166e+201,9.1249249249249256e+201,9.1338338338338345e+201,9.1427427427427435e+201,9.1516516516516525e+201,9.1605605605605614e+201,9.1694694694694704e+201,9.1783783783783794e+201,9.1872872872872883e+201,9.1961961961961973e+201,9.2051051051051063e+201,9.2140140140140153e+201,9.2229229229229242e+201,9.2318318318318332e+201,9.2407407407407422e+201,9.2496496496496501e+201,9.258558558558559e+201,9.267467467467468e+201,9.276376376376377e+201,9.2852852852852859e+201,9.2941941941941949e+201,9.3031031031031039e+201,9.3120120120120128e+201,9.3209209209209218e+201,9.3298298298298308e+201,9.3387387387387398e+201,9.3476476476476487e+201,9.3565565565565577e+201,9.3654654654654667e+201,9.3743743743743756e+201,9.3832832832832846e+201,9.3921921921921936e+201,9.4011011011011026e+201,9.4100100100100104e+201,9.4189189189189194e+201,9.4278278278278284e+201,9.4367367367367373e+201,9.4456456456456463e+201,9.4545545545545553e+201,9.4634634634634643e+201,9.4723723723723732e+201,9.4812812812812822e+201,9.4901901901901912e+201,9.4990990990991001e+201,9.5080080080080091e+201,9.5169169169169181e+201,9.5258258258258271e+201,9.534734734734736e+201,9.543643643643645e+201,9.552552552552554e+201,9.5614614614614629e+201,9.5703703703703708e+201,9.5792792792792798e+201,9.5881881881881888e+201,9.5970970970970977e+201,9.6060060060060067e+201,9.6149149149149157e+201,9.6238238238238246e+201,9.6327327327327336e+201,9.6416416416416426e+201,9.6505505505505516e+201,9.6594594594594605e+201,9.6683683683683695e+201,9.6772772772772785e+201,9.6861861861861874e+201,9.6950950950950964e+201,9.7040040040040054e+201,9.7129129129129143e+201,9.7218218218218233e+201,9.7307307307307312e+201,9.7396396396396402e+201,9.7485485485485491e+201,9.7574574574574581e+201,9.7663663663663671e+201,9.7752752752752761e+201,9.784184184184185e+201,9.793093093093094e+201,9.802002002002004e+201,9.810910910910913e+201,9.819819819819822e+201,9.828728728728731e+201,9.8376376376376399e+201,9.8465465465465489e+201,9.8554554554554579e+201,9.8643643643643668e+201,9.8732732732732758e+201,9.8821821821821848e+201,9.8910910910910916e+201,9.9000000000000006e+201],"y":[0,0,0,0,-0,-0,-0,0,0,0,-0,-0,0,-0,-0,-0,-0,0,0,0,-0,-0,-0,-0,0,0,-0,-0,-0,0,0,0,0,0,-0,0,0,0,0,0,-0,-0,-0,-0,0,0,0,-0,-0,-0,0,-0,6.8340402243809002e-202,-0,-0,-0,0,0,-0,-0,0,-0,0,0,-0,0,0,0,0,-0,-0,0,-0,-0,-0,-0,0,-0,-0,0,-0,0,-0,-0,0,463.38335790876312,0,0,0,0,-0,-0,-0,0,0,-0,-0,0,0,0,-0,-0,-0,-0,-0,-0,0,-0,0,-0,0,-0,0,0,-0,0,0,-0,-0,-0,0,0,-0,0,-0,0,-0,-0,-0,0,0,-0,-0,-0,0,0,0,-0,-0,-0,0,-0,0,-0,-0,0,-0,0,-0,0,0,-0,0,-0,-0,0,0,-0,0,0,-0,0,-0,-0,0,0,0,0,0,0,0,-0,0,-0,0,0,-0,-0,-0,-0,0,-0,0,0,0,0,0,0,0,-0,0,0,0,-0,-0,0,-0,-0,0,-0,-0,0,-0,-0,0,0,-0,-0,0,0,-0,-0,-0,-0,0,0,0,0,0,-0,-0,0,-0,-0,0,-0,-0,0,0,-0,0,-0,0,-0,-0,0,0,0,0,-0,0,0,0,0,0,-0,-0,0,0,0,-0,-0,-0,-0,0,-0,-0,0,0,-0,-0,-0,-0,-0,-0,-0,-0,-0,-0,-0,0,-0,0,0,0,-0,0,-0,-0,-0,-0,-0,0,0,0,0,0,0,0,-0,-0,0,-0,-0,-0,0,-0,-0,0,0,0,-0,-0,-0,-0,0,-0,0,0,-0,-0,0,-0,0,0,-0,0,0,0,-0,0,0,-0,0,-0,0,-0,-0,0,-0,-0,-0,0,-0,-0,0,-0,-0,-0,-0,-0,0,-0,-0,-0,0,0,-0,0,0,-0,0,0,-0,-0,-0,0,0,0,0,0,0,-0,-0,0,-0,0,0,-0,-0,0,-0,-0,-0,-0,-0,-0,0,-0,-0,-0,0,-0,-0,0,-0,-0,0,-0,0,0,0,-0,0,-0,-0,-0,-0,0,-0,0,-0,-0,-0,-0,-0,0,0,-0,0,0,-0,0,0,-0,0,0,-0,0,-0,0,0,-0,-0,-0,0,-0,-0,0,-0,-0,-0,-0,-0,0,0,-0,0,0,0,0,-0,0,-0,0,0,0,0,-0,0,-0,0,0,0,-0,-0,0,0,-0,0,-0,0,0,-0,-0,-0,-0,-0,0,-0,-0,-0,-0,0,-0,-0,0,-0,0,0,-0,-0,0,0,0,0,-0,0,-0,-0,-0,-0,-0,0,-0,-0,-0,-0,-0,-0,0,-0,0,0,-0,0,0,0,0,0,-0,-0,0,-0,0,0,-0,0,-0,0,-0,0,-0,0,0,0,0,-0,0,0,0,0,-0,-0,-0,0,-0,0,0,-0,-0,-0,-0,-0,-0,-0,0,0,0,0,-0,-0,0,-0,-0,-0,-0,0,-0,0,-0,0,-0,-0,0,0,-0,0,-0,0,0,0,-0,-0,-0,0,-0,-0,-0,-0,-0,0,-0,0,-0,0,-0,0,0,0,0,0,-0,0,-0,-0,0,0,-0,-0,0,0,-0,-0,-0,0,0,-0,-0,-0,0,-0,0,-0,0,0,0,0,0,-0,0,-0,0,-0,0,-0,-0,-0,0,-0,0,0,-0,-0,0,0,-0,-0,0,-0,0,-0,0,-0,-0,-0,-0,-0,0,0,-0,0,0,-0,0,-0,0,-0,0,0,-0,0,-0,-0,0,464.7546586248157,-0,0,-0,-0,-0,0,0,0,-0,0,-0,0,-0,-0,0,0,-0,0,-0,-0,-0,0,0,-0,-0,0,0,-0,-0,-0,0,0,0,0,-0,-0,-0,0,0,0,0,-0,-0,0,0,-0,0,-0,-0,0,-0,0,0,0,-0,-0,-0,0,0,-0,0,-0,0,-0,0,-0,-0,0,0,-0,464.8420722820411,-0,0,-0,-0,0,0,0,-0,-0,0,0,-0,-0,0,0,-0,0,-0,0,0,-0,0,0,0,0,-0,0,0,-0,0,0,0,0,-0,-0,-0,-0,-0,-0,0,0,-0,0,-0,-0,-0,0,0,0,0,0,-0,-0,-0,0,0,0,-0,0,0,0,0,-0,-0,-0,-0,0,-0,-0,0,0,-0,0,0,0,-0,0,0,0,0,-0,0,0,-0,0,0,0,-0,0,0,0,0,0,-0,0,-0,-0,-0,-0,-0,-0,0,-0,-0,-0,-0,0,-0,0,-0,0,0,0,0,-0,-0,0,-0,0,-0,-0,-0,-0,0,-0,0,-0,0,-0,0,0,0,-0,-0,0,-0,-0,-0,-0,-0,0,0,-0,-0,-0,-0,-0,-0,0,0,0,-0,-0,0,0,-0,0,-0,0,-0,0,-0,-0,0,-0,-0,0,0,0,-0,0,0,0,-0,-0,0,-0,0,0,-0,0,0,0,-0,-0,-0,0,-0,0,0,-0,0,-0,-0,0,-0,0,-0,0,0,-0,0,0,-0,-0,-0,0,-0,0,0,-0,-0,-0,-0,-0,-0,0,0,-0,-0,-0,1.0487968756561541e-202,0,0,-0,0,-0,-0,0,0,-0,0,0,0,0,-0,-0,0,0,-0,-0,-0,-0,-0,-0,-0,0,0,0,-0,0,-0,0,-0,0,-0,0,-0,0,0,0,-0,0]}
},{}],155:[function(require,module,exports){
module.exports={"n":[52,57,40,55,31,39,18,26,42,19,23,46,34,38,54,12,51,23,54,5,57,31,49,58,0,42,0,24,5,48,15,43,1,47,25,52,20,13,33,59,56,0,18,36,20,55,52,15,20,18,8,41,30,4,52,0,23,38,42,35,38,8,27,48,28,7,57,2,5,2,17,53,27,27,35,5,53,4,28,1,26,60,45,18,28,38,52,15,28,23,30,34,29,60,13,36,5,15,4,15,54,51,14,0,52,21,43,7,53,54,57,13,8,36,24,30,59,10,39,11,54,58,29,23,0,32,37,39,14,35,32,9,44,53,37,26,35,35,26,28,14,0,26,5,0,58,37,39,58,14,5,32,2,33,54,7,15,59,0,36,49,20,8,9,53,34,5,32,21,47,36,21,35,60,40,25,39,3,26,36,8,6,45,10,14,5,39,25,52,29,5,56,59,42,1,4,50,44,50,51,3,33,33,42,57,60,19,3,49,6,36,33,48,49,48,39,3,13,17,12,39,15,29,58,59,56,45,9,34,59,18,47,15,56,54,12,27,40,49,13,5,13,52,20,1,42,54,44,54,13,31,51,7,30,10,3,43,3,50,39,2,15,46,54,58,59,20,31,38,35,20,47,13,59,47,55,44,31,17,16,35,4,25,27,5,39,1,59,29,56,16,13,20,39,17,44,10,57,24,55,42,1,12,38,40,23,27,53,26,6,10,49,11,20,37,38,16,36,34,23,57,50,43,40,41,58,58,55,47,48,37,40,57,49,3,12,16,28,60,46,47,7,28,8,41,20,25,32,23,19,13,4,23,52,1,12,28,14,20,36,59,29,33,47,51,28,24,6,28,14,50,42,60,28,31,4,56,44,45,11,34,57,59,52,50,52,58,11,39,24,23,50,29,54,55,50,0,47,9,10,28,60,33,36,3,45,40,35,54,10,6,18,26,46,17,57,60,35,37,36,15,2,8,20,33,15,50,55,51,1,50,2,12,45,33,41,53,13,7,39,52,31,54,59,13,57,4,53,28,25,50,16,28,23,25,9,30,17,7,26,8,50,53,48,36,26,16,55,52,28,3,27,27,26,44,34,20,56,24,38,32,2,54,54,47,7,4,1,17,2,23,17,52,39,25,38,14,29,36,19,29,51,54,11,57,15,49,36,43,30,45,22,54,52,3,23,20,13,0,36,50,25,30,27,22,15,13,59,32,56,17,3,4,31,5,25,4,8,24,25,7,49,27,32,54,6,21,21,7,9,34,49,53,27,21,28,2,2,8,45,4,16,45,20,27,22,40,51,42,35,34,56,38,58,53,45,40,38,53,2,28,4,8,37,4,2,43,5,18,58,40,24,39,14,32,32,43,4,30,54,29,10,30,45,57,14,23,1,7,60,14,10,41,2,51,26,59,27,13,34,46,27,35,26,24,14,31,19,30,59,39,1,45,1,18,35,5,21,50,28,23,11,47,55,10,26,6,6,55,37,53,41,60,28,52,22,2,15,33,51,60,23,31,27,53,38,4,28,60,34,56,6,34,38,26,34,20,58,43,0,0,8,22,12,56,57,33,46,28,60,30,45,18,32,58,51,59,4,31,57,60,16,27,0,25,4,13,11,11,12,50,53,44,35,32,27,50,55,31,11,33,57,13,54,35,57,8,45,3,15,41,55,37,33,13,30,24,48,38,11,33,44,7,51,10,40,0,38,25,49,29,59,9,55,40,47,1,13,7,27,58,44,59,51,1,8,30,59,52,56,14,13,50,55,49,22,38,0,0,56,23,27,55,47,41,44,23,56,38,28,14,36,34,13,59,32,51,6,17,37,41,10,21,54,60,46,5,48,15,22,49,20,5,11,32,0,48,14,45,56,8,21,26,24,21,31,29,56,35,47,8,8,55,11,39,29,9,4,34,47,56,16,47,37,41,39,28,10,15,21,34,33,15,10,19,9,55,16,53,41,48,12,56,53,10,52,31,3,38,0,55,43,40,30,23,27,45,17,49,12,36,9,5,53,56,18,3,60,32,45,7,45,23,28,49,50,14,12,53,54,43,40,23,12,15,39,15,12,46,4,3,56,41,34,37,17,45,34,59,48,23,25,15,46,53,31,49,27,28,40,5,5,34,43,11,39,32,13,21,49,19,50,44,48,31,11,48,52,12,40,41,4,3,17,48,12,41,60,57,16,5,55,55,7,31,1,37,27,19,28,4,43,51,20,8,5,22,21,37,4,60,55,31,9,60,52,13,53,24,52,42,55,3,53,45,54,25,44,49,50],"x":[-100.09999999999999,-100.19889889889889,-100.2977977977978,-100.39669669669669,-100.49559559559559,-100.59449449449448,-100.69339339339339,-100.79229229229229,-100.89119119119118,-100.99009009009008,-101.08898898898899,-101.18788788788788,-101.28678678678678,-101.38568568568569,-101.48458458458458,-101.58348348348348,-101.68238238238237,-101.78128128128128,-101.88018018018018,-101.97907907907907,-102.07797797797797,-102.17687687687688,-102.27577577577577,-102.37467467467467,-102.47357357357357,-102.57247247247247,-102.67137137137136,-102.77027027027026,-102.86916916916917,-102.96806806806806,-103.06696696696696,-103.16586586586585,-103.26476476476476,-103.36366366366366,-103.46256256256255,-103.56146146146146,-103.66036036036036,-103.75925925925925,-103.85815815815815,-103.95705705705706,-104.05595595595595,-104.15485485485485,-104.25375375375376,-104.35265265265265,-104.45155155155155,-104.55045045045044,-104.64934934934935,-104.74824824824825,-104.84714714714714,-104.94604604604604,-105.04494494494494,-105.14384384384384,-105.24274274274273,-105.34164164164164,-105.44054054054054,-105.53943943943943,-105.63833833833833,-105.73723723723724,-105.83613613613613,-105.93503503503503,-106.03393393393392,-106.13283283283283,-106.23173173173173,-106.33063063063062,-106.42952952952953,-106.52842842842843,-106.62732732732732,-106.72622622622622,-106.82512512512513,-106.92402402402402,-107.02292292292292,-107.12182182182181,-107.22072072072072,-107.31961961961962,-107.41851851851851,-107.51741741741742,-107.61631631631631,-107.71521521521521,-107.8141141141141,-107.91301301301301,-108.01191191191191,-108.1108108108108,-108.2097097097097,-108.30860860860861,-108.4075075075075,-108.5064064064064,-108.60530530530531,-108.7042042042042,-108.8031031031031,-108.90200200200199,-109.0009009009009,-109.0997997997998,-109.19869869869869,-109.29759759759759,-109.3964964964965,-109.49539539539539,-109.59429429429429,-109.6931931931932,-109.79209209209209,-109.89099099099099,-109.98988988988988,-110.08878878878879,-110.18768768768768,-110.28658658658658,-110.38548548548548,-110.48438438438438,-110.58328328328328,-110.68218218218217,-110.78108108108108,-110.87997997997998,-110.97887887887887,-111.07777777777777,-111.17667667667668,-111.27557557557557,-111.37447447447447,-111.47337337337336,-111.57227227227227,-111.67117117117117,-111.77007007007006,-111.86896896896897,-111.96786786786787,-112.06676676676676,-112.16566566566566,-112.26456456456457,-112.36346346346346,-112.46236236236236,-112.56126126126125,-112.66016016016016,-112.75905905905906,-112.85795795795795,-112.95685685685686,-113.05575575575575,-113.15465465465465,-113.25355355355354,-113.35245245245245,-113.45135135135135,-113.55025025025024,-113.64914914914914,-113.74804804804805,-113.84694694694694,-113.94584584584584,-114.04474474474475,-114.14364364364364,-114.24254254254254,-114.34144144144143,-114.44034034034034,-114.53923923923924,-114.63813813813813,-114.73703703703703,-114.83593593593594,-114.93483483483483,-115.03373373373373,-115.13263263263264,-115.23153153153153,-115.33043043043043,-115.42932932932932,-115.52822822822823,-115.62712712712712,-115.72602602602602,-115.82492492492491,-115.92382382382382,-116.02272272272272,-116.12162162162161,-116.22052052052052,-116.31941941941942,-116.41831831831831,-116.51721721721722,-116.61611611611612,-116.71501501501501,-116.81391391391391,-116.9128128128128,-117.01171171171171,-117.11061061061061,-117.2095095095095,-117.30840840840841,-117.40730730730731,-117.5062062062062,-117.60510510510511,-117.70400400400401,-117.8029029029029,-117.9018018018018,-118.00070070070069,-118.0995995995996,-118.19849849849849,-118.29739739739739,-118.3962962962963,-118.49519519519519,-118.59409409409409,-118.692992992993,-118.79189189189189,-118.89079079079079,-118.98968968968968,-119.08858858858858,-119.18748748748749,-119.28638638638638,-119.38528528528528,-119.48418418418419,-119.58308308308308,-119.68198198198198,-119.78088088088089,-119.87977977977978,-119.97867867867868,-120.07757757757757,-120.17647647647647,-120.27537537537538,-120.37427427427427,-120.47317317317317,-120.57207207207207,-120.67097097097097,-120.76986986986986,-120.86876876876877,-120.96766766766767,-121.06656656656656,-121.16546546546546,-121.26436436436435,-121.36326326326326,-121.46216216216216,-121.56106106106105,-121.65995995995996,-121.75885885885886,-121.85775775775775,-121.95665665665666,-122.05555555555556,-122.15445445445445,-122.25335335335335,-122.35225225225224,-122.45115115115115,-122.55005005005005,-122.64894894894894,-122.74784784784785,-122.84674674674675,-122.94564564564564,-123.04454454454455,-123.14344344344345,-123.24234234234234,-123.34124124124124,-123.44014014014013,-123.53903903903904,-123.63793793793793,-123.73683683683683,-123.83573573573574,-123.93463463463463,-124.03353353353353,-124.13243243243244,-124.23133133133133,-124.33023023023023,-124.42912912912912,-124.52802802802802,-124.62692692692693,-124.72582582582582,-124.82472472472472,-124.92362362362363,-125.02252252252252,-125.12142142142142,-125.22032032032033,-125.31921921921922,-125.41811811811812,-125.51701701701701,-125.61591591591591,-125.71481481481482,-125.81371371371371,-125.91261261261261,-126.01151151151151,-126.11041041041041,-126.2093093093093,-126.30820820820821,-126.40710710710711,-126.506006006006,-126.6049049049049,-126.70380380380379,-126.8027027027027,-126.9016016016016,-127.00050050050049,-127.0993993993994,-127.1982982982983,-127.29719719719719,-127.3960960960961,-127.494994994995,-127.59389389389389,-127.69279279279279,-127.79169169169168,-127.89059059059059,-127.98948948948949,-128.08838838838838,-128.18728728728729,-128.28618618618617,-128.38508508508508,-128.48398398398399,-128.58288288288287,-128.68178178178178,-128.78068068068069,-128.87957957957957,-128.97847847847848,-129.07737737737739,-129.17627627627627,-129.27517517517518,-129.37407407407409,-129.47297297297297,-129.57187187187188,-129.67077077077076,-129.76966966966967,-129.86856856856858,-129.96746746746746,-130.06636636636637,-130.16526526526525,-130.26416416416416,-130.36306306306307,-130.46196196196195,-130.56086086086086,-130.65975975975977,-130.75865865865865,-130.85755755755756,-130.95645645645646,-131.05535535535535,-131.15425425425425,-131.25315315315316,-131.35205205205204,-131.45095095095095,-131.54984984984986,-131.64874874874874,-131.74764764764765,-131.84654654654653,-131.94544544544544,-132.04434434434435,-132.14324324324323,-132.24214214214214,-132.34104104104102,-132.43993993993993,-132.53883883883884,-132.63773773773772,-132.73663663663663,-132.83553553553554,-132.93443443443442,-133.03333333333333,-133.13223223223224,-133.23113113113112,-133.33003003003003,-133.42892892892894,-133.52782782782782,-133.62672672672673,-133.72562562562564,-133.82452452452452,-133.92342342342343,-134.02232232232234,-134.12122122122122,-134.22012012012013,-134.31901901901901,-134.41791791791792,-134.5168168168168,-134.61571571571571,-134.71461461461462,-134.8135135135135,-134.91241241241241,-135.01131131131132,-135.1102102102102,-135.20910910910911,-135.30800800800802,-135.4069069069069,-135.50580580580581,-135.60470470470472,-135.7036036036036,-135.80250250250251,-135.90140140140142,-136.0003003003003,-136.09919919919921,-136.19809809809811,-136.296996996997,-136.3958958958959,-136.49479479479479,-136.59369369369369,-136.69259259259258,-136.79149149149148,-136.89039039039039,-136.98928928928927,-137.08818818818818,-137.18708708708709,-137.28598598598597,-137.38488488488488,-137.48378378378379,-137.58268268268267,-137.68158158158158,-137.78048048048049,-137.87937937937937,-137.97827827827828,-138.07717717717719,-138.17607607607607,-138.27497497497498,-138.37387387387389,-138.47277277277277,-138.57167167167168,-138.67057057057056,-138.76946946946947,-138.86836836836835,-138.96726726726726,-139.06616616616617,-139.16506506506505,-139.26396396396396,-139.36286286286287,-139.46176176176175,-139.56066066066066,-139.65955955955957,-139.75845845845845,-139.85735735735736,-139.95625625625627,-140.05515515515515,-140.15405405405406,-140.25295295295297,-140.35185185185185,-140.45075075075076,-140.54964964964967,-140.64854854854855,-140.74744744744746,-140.84634634634634,-140.94524524524525,-141.04414414414413,-141.14304304304304,-141.24194194194195,-141.34084084084083,-141.43973973973974,-141.53863863863864,-141.63753753753753,-141.73643643643643,-141.83533533533534,-141.93423423423422,-142.03313313313313,-142.13203203203204,-142.23093093093092,-142.32982982982983,-142.42872872872874,-142.52762762762762,-142.62652652652653,-142.72542542542544,-142.82432432432432,-142.92322322322323,-143.02212212212211,-143.12102102102102,-143.2199199199199,-143.31881881881881,-143.41771771771772,-143.5166166166166,-143.61551551551551,-143.71441441441442,-143.8133133133133,-143.91221221221221,-144.01111111111112,-144.11001001001,-144.20890890890891,-144.30780780780782,-144.4067067067067,-144.50560560560561,-144.60450450450452,-144.7034034034034,-144.80230230230231,-144.90120120120122,-145.0001001001001,-145.09899899899901,-145.19789789789789,-145.2967967967968,-145.39569569569568,-145.49459459459459,-145.5934934934935,-145.69239239239238,-145.79129129129129,-145.8901901901902,-145.98908908908908,-146.08798798798799,-146.1868868868869,-146.28578578578578,-146.38468468468469,-146.4835835835836,-146.58248248248248,-146.68138138138139,-146.78028028028029,-146.87917917917918,-146.97807807807808,-147.07697697697699,-147.17587587587587,-147.27477477477478,-147.37367367367366,-147.47257257257257,-147.57147147147145,-147.67037037037036,-147.76926926926927,-147.86816816816815,-147.96706706706706,-148.06596596596597,-148.16486486486485,-148.26376376376376,-148.36266266266267,-148.46156156156155,-148.56046046046046,-148.65935935935937,-148.75825825825825,-148.85715715715716,-148.95605605605607,-149.05495495495495,-149.15385385385386,-149.25275275275277,-149.35165165165165,-149.45055055055056,-149.54944944944944,-149.64834834834835,-149.74724724724726,-149.84614614614614,-149.94504504504505,-150.04394394394393,-150.14284284284284,-150.24174174174175,-150.34064064064063,-150.43953953953954,-150.53843843843845,-150.63733733733733,-150.73623623623624,-150.83513513513515,-150.93403403403403,-151.03293293293294,-151.13183183183185,-151.23073073073073,-151.32962962962964,-151.42852852852855,-151.52742742742743,-151.62632632632634,-151.72522522522522,-151.82412412412413,-151.92302302302303,-152.02192192192192,-152.12082082082082,-152.21971971971971,-152.31861861861861,-152.41751751751752,-152.5164164164164,-152.61531531531531,-152.71421421421422,-152.8131131131131,-152.91201201201201,-153.01091091091092,-153.1098098098098,-153.20870870870871,-153.30760760760762,-153.4065065065065,-153.50540540540541,-153.60430430430432,-153.7032032032032,-153.80210210210211,-153.90100100100102,-153.9998998998999,-154.09879879879881,-154.19769769769769,-154.2965965965966,-154.39549549549548,-154.49439439439439,-154.5932932932933,-154.69219219219218,-154.79109109109109,-154.88998998999,-154.98888888888888,-155.08778778778779,-155.1866866866867,-155.28558558558558,-155.38448448448449,-155.4833833833834,-155.58228228228228,-155.68118118118119,-155.7800800800801,-155.87897897897898,-155.97787787787789,-156.0767767767768,-156.17567567567568,-156.27457457457459,-156.37347347347347,-156.47237237237238,-156.57127127127126,-156.67017017017017,-156.76906906906908,-156.86796796796796,-156.96686686686687,-157.06576576576578,-157.16466466466466,-157.26356356356357,-157.36246246246247,-157.46136136136136,-157.56026026026026,-157.65915915915917,-157.75805805805805,-157.85695695695696,-157.95585585585587,-158.05475475475475,-158.15365365365366,-158.25255255255257,-158.35145145145145,-158.45035035035036,-158.54924924924924,-158.64814814814815,-158.74704704704703,-158.84594594594594,-158.94484484484485,-159.04374374374373,-159.14264264264264,-159.24154154154155,-159.34044044044043,-159.43933933933934,-159.53823823823825,-159.63713713713713,-159.73603603603604,-159.83493493493495,-159.93383383383383,-160.03273273273274,-160.13163163163165,-160.23053053053053,-160.32942942942944,-160.42832832832835,-160.52722722722723,-160.62612612612614,-160.72502502502502,-160.82392392392393,-160.92282282282281,-161.02172172172172,-161.12062062062063,-161.21951951951951,-161.31841841841842,-161.41731731731733,-161.51621621621621,-161.61511511511512,-161.71401401401403,-161.81291291291291,-161.91181181181182,-162.01071071071073,-162.10960960960961,-162.20850850850852,-162.30740740740742,-162.40630630630631,-162.50520520520521,-162.60410410410412,-162.703003003003,-162.80190190190191,-162.90080080080079,-162.9996996996997,-163.09859859859858,-163.19749749749749,-163.2963963963964,-163.39529529529528,-163.49419419419419,-163.5930930930931,-163.69199199199198,-163.79089089089089,-163.8897897897898,-163.98868868868868,-164.08758758758759,-164.1864864864865,-164.28538538538538,-164.38428428428429,-164.4831831831832,-164.58208208208208,-164.68098098098099,-164.7798798798799,-164.87877877877878,-164.97767767767766,-165.0765765765766,-165.17547547547548,-165.27437437437436,-165.37327327327327,-165.47217217217218,-165.57107107107106,-165.66996996996997,-165.76886886886888,-165.86776776776776,-165.96666666666667,-166.06556556556558,-166.16446446446446,-166.26336336336337,-166.36226226226228,-166.46116116116116,-166.56006006006007,-166.65895895895898,-166.75785785785786,-166.85675675675677,-166.95565565565568,-167.05455455455456,-167.15345345345344,-167.25235235235237,-167.35125125125126,-167.45015015015014,-167.54904904904905,-167.64794794794796,-167.74684684684684,-167.84574574574575,-167.94464464464465,-168.04354354354354,-168.14244244244244,-168.24134134134135,-168.34024024024023,-168.43913913913914,-168.53803803803805,-168.63693693693693,-168.73583583583584,-168.83473473473475,-168.93363363363363,-169.03253253253254,-169.13143143143145,-169.23033033033033,-169.32922922922921,-169.42812812812815,-169.52702702702703,-169.62592592592591,-169.72482482482482,-169.82372372372373,-169.92262262262261,-170.02152152152152,-170.12042042042043,-170.21931931931931,-170.31821821821822,-170.41711711711713,-170.51601601601601,-170.61491491491492,-170.71381381381383,-170.81271271271271,-170.91161161161162,-171.01051051051053,-171.10940940940941,-171.20830830830832,-171.30720720720723,-171.40610610610611,-171.50500500500499,-171.60390390390393,-171.70280280280281,-171.80170170170169,-171.90060060060063,-171.99949949949951,-172.09839839839839,-172.1972972972973,-172.29619619619621,-172.39509509509509,-172.493993993994,-172.59289289289291,-172.69179179179179,-172.7906906906907,-172.8895895895896,-172.98848848848849,-173.08738738738739,-173.1862862862863,-173.28518518518518,-173.38408408408409,-173.482982982983,-173.58188188188188,-173.68078078078076,-173.7796796796797,-173.87857857857858,-173.97747747747746,-174.0763763763764,-174.17527527527528,-174.27417417417416,-174.37307307307307,-174.47197197197198,-174.57087087087086,-174.66976976976977,-174.76866866866868,-174.86756756756756,-174.96646646646647,-175.06536536536538,-175.16426426426426,-175.26316316316317,-175.36206206206208,-175.46096096096096,-175.55985985985987,-175.65875875875878,-175.75765765765766,-175.85655655655654,-175.95545545545548,-176.05435435435436,-176.15325325325324,-176.25215215215218,-176.35105105105106,-176.44994994994994,-176.54884884884885,-176.64774774774776,-176.74664664664664,-176.84554554554555,-176.94444444444446,-177.04334334334334,-177.14224224224225,-177.24114114114116,-177.34004004004004,-177.43893893893895,-177.53783783783786,-177.63673673673674,-177.73563563563565,-177.83453453453455,-177.93343343343344,-178.03233233233232,-178.13123123123125,-178.23013013013014,-178.32902902902902,-178.42792792792795,-178.52682682682683,-178.62572572572572,-178.72462462462462,-178.82352352352353,-178.92242242242241,-179.02132132132132,-179.12022022022023,-179.21911911911911,-179.31801801801802,-179.41691691691693,-179.51581581581581,-179.61471471471472,-179.71361361361363,-179.81251251251251,-179.91141141141142,-180.01031031031033,-180.10920920920921,-180.20810810810809,-180.30700700700703,-180.40590590590591,-180.50480480480479,-180.60370370370373,-180.70260260260261,-180.80150150150149,-180.9004004004004,-180.99929929929931,-181.09819819819819,-181.1970970970971,-181.29599599599601,-181.39489489489489,-181.4937937937938,-181.59269269269271,-181.69159159159159,-181.7904904904905,-181.88938938938941,-181.98828828828829,-182.0871871871872,-182.18608608608611,-182.28498498498499,-182.3838838838839,-182.48278278278281,-182.58168168168169,-182.68058058058057,-182.77947947947951,-182.87837837837839,-182.97727727727727,-183.07617617617618,-183.17507507507509,-183.27397397397397,-183.37287287287288,-183.47177177177178,-183.57067067067067,-183.66956956956957,-183.76846846846848,-183.86736736736736,-183.96626626626627,-184.06516516516518,-184.16406406406406,-184.26296296296297,-184.36186186186188,-184.46076076076076,-184.55965965965967,-184.65855855855858,-184.75745745745746,-184.85635635635634,-184.95525525525528,-185.05415415415416,-185.15305305305304,-185.25195195195195,-185.35085085085086,-185.44974974974974,-185.54864864864865,-185.64754754754756,-185.74644644644644,-185.84534534534535,-185.94424424424426,-186.04314314314314,-186.14204204204205,-186.24094094094096,-186.33983983983984,-186.43873873873875,-186.53763763763766,-186.63653653653654,-186.73543543543545,-186.83433433433436,-186.93323323323324,-187.03213213213212,-187.13103103103106,-187.22992992992994,-187.32882882882882,-187.42772772772773,-187.52662662662664,-187.62552552552552,-187.72442442442443,-187.82332332332334,-187.92222222222222,-188.02112112112113,-188.12002002002004,-188.21891891891892,-188.31781781781783,-188.41671671671673,-188.51561561561562,-188.61451451451452,-188.71341341341343,-188.81231231231232,-188.91121121121122,-189.01011011011013,-189.10900900900901,-189.2079079079079,-189.30680680680683,-189.40570570570571,-189.50460460460459,-189.6035035035035,-189.70240240240241,-189.80130130130129,-189.9002002002002,-189.99909909909911,-190.09799799799799,-190.1968968968969,-190.29579579579581,-190.39469469469469,-190.4935935935936,-190.59249249249251,-190.69139139139139,-190.7902902902903,-190.88918918918921,-190.98808808808809,-191.086986986987,-191.18588588588591,-191.28478478478479,-191.38368368368367,-191.48258258258261,-191.58148148148149,-191.68038038038037,-191.77927927927928,-191.87817817817819,-191.97707707707707,-192.07597597597598,-192.17487487487489,-192.27377377377377,-192.37267267267268,-192.47157157157159,-192.57047047047047,-192.66936936936938,-192.76826826826829,-192.86716716716717,-192.96606606606608,-193.06496496496499,-193.16386386386387,-193.26276276276278,-193.36166166166169,-193.46056056056057,-193.55945945945945,-193.65835835835838,-193.75725725725727,-193.85615615615615,-193.95505505505506,-194.05395395395396,-194.15285285285285,-194.25175175175175,-194.35065065065066,-194.44954954954954,-194.54844844844845,-194.64734734734736,-194.74624624624624,-194.84514514514515,-194.94404404404406,-195.04294294294294,-195.14184184184185,-195.24074074074076,-195.33963963963964,-195.43853853853855,-195.53743743743746,-195.63633633633634,-195.73523523523522,-195.83413413413416,-195.93303303303304,-196.03193193193192,-196.13083083083086,-196.22972972972974,-196.32862862862862,-196.42752752752753,-196.52642642642644,-196.62532532532532,-196.72422422422423,-196.82312312312314,-196.92202202202202,-197.02092092092093,-197.11981981981984,-197.21871871871872,-197.31761761761763,-197.41651651651654,-197.51541541541542,-197.61431431431433,-197.71321321321324,-197.81211211211212,-197.911011011011,-198.00990990990994,-198.10880880880882,-198.2077077077077,-198.30660660660664,-198.40550550550552,-198.5044044044044,-198.60330330330331,-198.70220220220222,-198.8011011011011,-198.90000000000001],"y":[8.0658175171186872e+120,1.936714564446673e+117,3.0259678730668238e+69,3.8904514597159672e+95,7.3549867000214708e+43,9.7659607982170888e+61,-3.6416003072549637e+25,-1.0824266607014407e+45,-3.7249788676799321e+92,1.4578085525129682e+57,4.2503420588519305e+47,7.3676133510832013e+91,2.8549254446807378e+57,7.168250166000613e+60,4.4992044619796618e+88,-41653926036252.352,1.234828621126838e+92,1.7998302820386609e+38,-1.1072395794456662e+122,1431187250752.0874,7.4708388045564058e+140,9.7622024027493316e+57,5.7055710782404026e+90,3.3540195750392185e+103,4.8958955787654386,-1.0380567666067401e+67,2.7601470749787795,-5.784630578204604e+39,23929125.363511018,-2.4371050038492838e+134,7.9933630471675791e+30,1.2937125237541661e+87,18.056027359176635,3.1555269101888636e+80,8.0335872071753505e+33,-7.5898983234810242e+86,-1.7168740731105721e+28,2.835215449490411e+18,5.988766469779979e+65,1.4740606792274132e+162,1.6773686333423321e+146,10.59065575123013,1.3258792876519634e+27,2.0830054953499043e+58,4.2646499414648454e+25,3.5329877668590361e+92,-1.0673134697097247e+92,5.0227273534945509e+21,-3.2838256546841517e+35,-7.9049432781804751e+39,53875690386321888,7.8161910948816148e+84,3.0487806461535317e+51,4966.2783903902418,5.9620465494146018e+86,4.2725589138860656,1.0309452168439902e+33,-2.2674175755236943e+67,-8.4120335141223767e+84,5.7250744627976646e+82,1.0562975699954242e+102,3131638281799.3452,6.5673262467432765e+45,4.4268784775265166e+84,1.3403777628859493e+40,2890245.3299174518,2.9562816674990173e+101,-92.927150159089564,4196249.6941750385,-4559.3763107466903,1.1646853724710014e+44,1.0040825085443964e+119,2.5667042799408005e+46,8.0769378753408098e+41,4.2904942822058108e+53,15776.565925896832,1.2484305461275978e+92,-12689.565954572023,-4.7423627685365868e+50,135.48775178185568,3.581947789768817e+78,1.5873209840613977e+140,1.9202557030040924e+87,3.218016235450549e+25,6.168784783277173e+40,-3.0044936501347275e+56,-2.0174374722827403e+89,3.8073961561463744e+20,-8.9374483128445391e+49,4.2003119180165475e+46,6.7401943177834731e+126,3.1668402127402804e+73,1.001585743080867e+52,1.0685138840617394e+114,2631116040880485,3.557663294537363e+52,29657.88172875881,2.1215863028893552e+20,-61712.612263645795,3.2892838040962233e+27,-1.2639919730843632e+181,7.5166132477680242e+120,6.9003575434406349e+21,7.1988918748561117,7.0505464993580954e+89,5.3962199172049332e+26,3.2221535803638756e+69,48525846.614002436,1.8014671286997859e+105,-1.0101010059566982e+122,5.9451046479564386e+173,2.1004042498311803e+25,240384868954.64908,1.9126186748689073e+62,2.8651608184079511e+34,2.9929574812389409e+42,1.8705931290887629e+102,-746319513513.92175,7.0107551239287371e+71,1.5583529167901279e+18,-3.0313989216721108e+153,5.2736486440282643e+147,2.3418739926859077e+54,1.8695377147107956e+36,6.162962231434097,2.96993645730087e+46,5.4318401335825933e+56,1.1444938444549486e+65,-1.6283558052776916e+20,3.366851704744152e+70,-2.9382107491929221e+80,1.2498732214651953e+18,8.003216183903626e+90,6.4738163827435549e+101,2.2331426863470212e+60,8.5404918842231854e+35,3.2179866415903114e+52,2.4536997671271313e+56,-5.8889841997524817e+42,-1.3296058091280296e+53,-8.6284283850024334e+29,26.942563403408521,2.2849982932599599e+49,590132.58458567329,6.4521805020454952,2.4414696185334002e+99,8.4677674008032435e+55,9.2869378827434226e+63,-3.9572282276310195e+112,-5.1904662549850592e+22,1567069715.7211163,9.8638425159138636e+83,855.37220736016764,3.4828981325260061e+58,6.5150242398461851e+97,4814727.567143226,2.5275640609975018e+17,7.0530387110936384e+105,2.0548046007763046,-3.7259349016120465e+69,4.9334012657578551e+118,7.9516429083291954e+52,6925057899537.5469,1334364214890.6814,2.4854967497767676e+96,5.2169835815516891e+51,15767.488553141036,-1.385401434867162e+49,5.038025670576497e+31,2.9268487259831456e+94,-5.9400004542568671e+80,1.5801404625450323e+62,2.7387236727097277e+74,2.1220064640610426e+123,7.2022875154731873e+68,2.1512638620406315e+35,5.0655002089957266e+58,294.42844010062009,-7.6015375763265681e+40,-4.6490767554458311e+67,-47488543559200.312,8.681697190043685e+24,1.4386746962776294e+102,192501206082595.47,6.9238844116767355e+18,33481.779333254301,4.8299478248177602e+58,2.3529232293386493e+35,-1.2240217672681221e+95,2.4995900489539541e+51,70733894.315547317,-1.2456033248206589e+188,1.9923087883642414e+143,2.5696251950487892e+82,16.083800557195616,2556.0508475501465,3.3881370216922904e+80,-3.3294380481858177e+71,-7.2116861116587571e+89,2.9872449443005979e+100,28738.595879410655,5.7412408955417988e+93,4.8714068382088259e+74,3.468524608823811e+83,1.2361969515947862e+109,9.0278899579146063e+107,4.2916679896517002e+23,237.82108011363337,8.3636158185989412e+86,-21058563.716272324,-1.59646212976398e+74,4.0834432787945287e+87,5.6801145131125934e+118,7.0588930330555996e+101,2.5466311795815498e+89,7.9565698162834247e+63,206.05305253129606,652192897846022.12,9.6278719173323336e+22,-51381853317124352,1.543268489243474e+80,8.4283212590575371e+33,4.0245189188380054e+68,1.7058693061495032e+126,8.2875122445601105e+115,4.7995813533481323e+100,9.5290441788923409e+71,1210040053.22542,-2.4110426110559648e+54,1.102206182337845e+116,-1.9211296433370013e+31,1.3225715165207126e+120,5.4423597623545288e+33,8.3381310064539751e+122,1.6584655502705489e+105,562928609680088.88,1.0398015920450526e+38,-5.0200027258014017e+61,6.9976761780139737e+84,8.149466612376672e+17,6108737.8796840357,2.395590673938294e+26,1.138267917393682e+146,6.6718018845135991e+36,22.347449776467297,6.8953234087721693e+71,3.7237302672565464e+91,-1.2461731879850179e+69,-8.2158645859243806e+94,4.5910204069758784e+17,1.3060527480818098e+58,1.891361143972767e+124,76119214387244656,6.4640600613421788e+60,61117071981518.586,608.9565355998908,2.7796585509988806e+69,197.05440773482752,-4.7569984823792408e+85,1.2720571877573573e+68,-306.67393727327027,1.1306274451971407e+29,7.3679919516553567e+148,9.9487081276934803e+123,2.7838604204193631e+118,6.4769651213745735e+110,3.8201494127303214e+26,7.6092312805495364e+43,-2.7999904796420046e+60,1.0898619204857835e+59,-1.5437634690354106e+33,5.6136086100712944e+107,1.0060442678933905e+56,1.9906640929712542e+140,1.3847014906526507e+93,4.1037130599209141e+102,3.3386742920137366e+72,7.4407870554028942e+43,3.9447631844429755e+21,-1.0821447576823993e+22,3.4737242212392782e+64,-1530839.4306259013,4.2503686231618214e+76,3.4507759383788872e+57,2781018.9541478371,1.1057027546291138e+68,11.268795935212538,1.1517356511063247e+99,2.1818124903278599e+42,-1.5723219447348628e+103,-3.3289898798882773e+24,4.6182598883691559e+22,-2.4876668069763323e+53,5.8213652506346833e+90,1.3169791391211756e+28,4.3871554654158558e+79,180184883870.1041,2.938005137584303e+95,-1.0070456172947457e+33,1.3297534836557653e+100,-3.6862060386816817e+78,61.287215228250034,-1.0476220199877584e+28,4.5977664069398608e+90,9.2512428517830694e+79,1.9387454009693437e+36,2.277639408477793e+40,5.524640603774792e+87,-1.797931973290799e+36,-1350898.7127421251,-22429140389025.816,1.2651274392643206e+105,8.5915296515124421e+23,6.0224348732649407e+44,9.6766527042906737e+73,9.6954990062428696e+67,1.0673061702514589e+21,2.3305164669900239e+54,-4.0018454159003896e+50,2.0780954123521979e+33,1.9557658640287015e+111,-9.9601269620017727e+105,2.293939990810671e+108,2.4619391255785775e+103,9.3178306393259703e+84,5.1406632964543542e+114,8.6214340856967968e+105,1.1848173063129982e+93,3.5316993245715479e+75,-5.0324230035994932e+82,1.4375838940453534e+65,-1.1289897124704469e+80,1.7399890346408737e+145,4.3668432614089087e+136,19639.907611119343,89161447847504160,3.2004291716308203e+21,1.3959122711900001e+40,-6.3032677579602903e+101,-7.1664755154451722e+77,2.3560108149189385e+86,5606619101.8097477,-7.0041971428860885e+61,2.9299900803997893e+19,1.0330596963240213e+88,1.5497800037371647e+32,1.2342829322626201e+38,8.3977177606151445e+47,1.1819221069683483e+30,2.4664770265179579e+25,2.6196136776089357e+17,-106350.05856593877,6.2211815211621499e+47,1.1761474289506675e+171,85.692561013376263,3.2770915784621402e+17,2.069391160548413e+44,62582715362884016,-2.5166710074096852e+24,-3.050943753330921e+56,6.7553592415148934e+111,1.2014090785860881e+52,1.403073589119953e+71,3.090229679732832e+228,2.3562447673363787e+118,7.4922446256605044e+49,9.4168188860110465e+36,447874.18329085421,1.0050381980231258e+38,-63993074984800832,-4.0704660178362845e+90,-2.6629045592528273e+80,-3.0860883950390875e+140,-4.1630385066007078e+86,4.5907994697482845e+67,104652.71764555275,6.9217811717064633e+105,1.2153764895471515e+73,4.0296531872012268e+70,1456794322671.312,-7.3320982041167766e+55,6.3430958438383652e+114,1.8060512826863679e+135,-1.1252612775804778e+156,1.6639546718065981e+121,7.6653109474608507e+107,2.8370989752060689e+111,5362234914656.1807,2.133032820387676e+59,-9.9532928573559889e+32,9.6871714841719601e+33,-9.636602293006983e+96,2.3212979197778093e+57,-1.0946958652824874e+153,1.4062622563277664e+139,2.4135779754383372e+104,7.817333621211092,3.5077324630313429e+80,1001196122.0021408,-28720292202.824635,-1.1348740165960258e+43,-3.6113783881821857e+119,4.9454623388051197e+65,-7.188612034029457e+91,648359.32152637793,2.7851449804904543e+93,2.4378959546102329e+72,2.2145136817610635e+56,2.4934722037417632e+90,-20857422795.795631,-1072261.9968156258,-1.4509670034865372e+27,-3.7064739654377748e+48,-1.0832864271089273e+117,8.7771332734699026e+38,3.8964817012269976e+125,3.264329248332161e+119,6.9562317061483403e+56,4.9813079615898855e+56,-9.9907352299668469e+53,1.4734750000601758e+19,-104.94840621098234,-453019202695.33026,-1.6148311147952668e+43,1.7772990070990545e+87,1.5333125628977835e+26,8.8203831600464606e+96,1.2007278715763941e+100,2.0756336878447176e+85,9.9373387573784129,-1.9853042436926478e+86,-92.056751650042429,-3.1556275558680044e+18,2.27634234791467e+107,1.6389850091724145e+93,1.1073242074274427e+88,1.4081131436195666e+105,55548911341835248,5818928.5826192191,9.2744769936899993e+58,-8.092281622787307e+89,2.145164982522399e+51,-2.8319389457931005e+111,3.4353998361455665e+143,1.4245426245273809e+37,1.602048834514698e+132,60246.053689266802,1.8357948195827257e+97,6.5309222005488843e+40,2.1745111813936723e+33,-1.0687011040992865e+85,-1.9669559572505368e+22,-7.9450033003494845e+49,3.4550511545610765e+46,1.5112919632916144e+129,4012869155763415.5,1.7138920378701529e+54,1.1137887401423981e+24,8669574.4870573226,3.210208398732115e+34,-128606630.18795799,-3.9375329305236909e+90,2.3753817926921605e+106,-1.266172742493668e+108,-1.4780114198908912e+114,1.2769902515851187e+55,5.0556789647351456e+25,3.676256007350462e+103,7.8720689902285227e+89,3.6684712725653297e+38,252.46427887631972,8.8184159546961437e+41,2.9150752698069173e+46,-2.4422544875669342e+51,-1.2163572546200444e+129,2.8024301639092361e+77,1.7250150093563782e+34,6.7637521688541368e+106,3.0226791890431975e+34,2.5598400625749147e+57,-3.6711979986897359e+47,-49.701004198887816,-2.4689866356255055e+106,-5.7836532972095259e+119,3.6847487820682859e+130,14056303503367.824,196998.78429567083,18.163112320172981,3.0201901028000802e+22,7.6358860985079602,9.5899046323410396e+30,9.3268545551956961e+22,-3.8816029436873375e+100,1.3039041911378584e+80,2.9872450242958804e+60,7.2152781366424245e+93,1.3607635355769817e+23,7.339424264316685e+48,2.314017670951882e+58,1.0431649308009437e+24,2.1645094365059823e+41,6.2056409907615496e+89,-1.6407553878510484e+104,2.2691080018938627e+17,4.8679480269846522e+149,6.7626217798502364e+33,1.0994630126141096e+105,2.4351415739392133e+64,2.2914078288843081e+73,3.0937941703114991e+43,3.3389637035607038e+71,-1.5212483677833641e+31,-1.5721203844302674e+103,-2.5052929263686494e+109,316876.53827494307,9.758084960940917e+57,7.3400428526953021e+36,5.1381189731053363e+18,6.8856308534842769,1.5391271449973482e+55,-1.2121967872447141e+81,2.0222799405989945e+36,-6.5369836324069748e+49,1.4832253499184566e+49,-4.6181390608349896e+46,4.5966515719380802e+38,4.4085459339034206e+22,4.2646305911583206e+119,6.4896874918741382e+51,2.9744778780439556e+96,2.2217917223402825e+20,318.81328851607998,-12465.814766162044,1.6768693148726197e+57,258607671.50419757,1.6079014477323452e+76,1503132.013186123,53660258247.583252,3.9154246327016837e+36,2.2641948831250164e+35,2591749.5026698499,8.2421129644147091e+82,6.4287261434890075e+42,-4.3412297566299668e+58,-4.0144295076346941e+126,-7.1497509489801474e+30,6.665109578088447e+41,1.5714785353311676e+35,84243939.35234572,3931382401.5448418,8.1851696184618081e+48,2.0894797465536944e+82,1.8357948195827257e+97,1.1972583854206386e+47,6.2637644735551313e+40,-1.4360633413783939e+86,2954.9900619773507,304.68035061101892,3189930981.0308518,1.4906860595226357e+75,257.58197202055192,-5.8086433347548856e+19,8.2184559670354214e+78,-1.5796783800067336e+32,5.2105076419849221e+53,-1.3174997057156754e+59,4.1420960317941105e+93,2.9217305029581914e+105,1.9287879404467478e+75,2.5875053865404183e+55,7.2622257428664559e+49,-6.568425710275016e+95,-3.2004656646481756e+63,-8.4280541243699067e+115,1.3008932687222935e+117,1.3987387477096976e+124,2.3640133974332368e+96,1.8668280659638527e+75,8.0004466640354659e+100,34.678416605222161,1.6674389417183863e+39,-1026.1775238406512,-647751289.23545635,3.6117086581196024e+66,-400713.45256921649,-23248.766572074084,1.9524764042932718e+108,9118892.4467595443,1.4509670034834347e+27,1.4625693036972432e+105,1.3060246359563541e+62,-2.7617145487587136e+32,2.8522752381557419e+64,-7.8489580580265148e+19,-1.6863914982741202e+62,-8.868090090267133e+76,3.8092978018846367e+112,406369.87596840726,3.5556027281839003e+51,1.2619876874862127e+97,4.6007101194705491e+41,-14526578658.83769,-1.1793476890344564e+46,4.8613663332276713e+82,9.6326079233156008e+121,-4.2743372270793851e+28,1.1295880310885807e+58,61.113065051752407,631875954.20301008,2.1710449295040668e+111,28707839741782712,-9611484575.6078644,2.9510323622394388e+67,-91.625241177281154,2.5955343721766587e+105,-4.39965883963228e+56,8.4794730000592937e+179,5.7171442196505893e+53,1.031944442486077e+19,7.3320982041167766e+55,3.7900810882741021e+75,8.5536750983922158e+36,8.7563246642138818e+54,-1.9244681086169462e+41,-9.8086749199167651e+41,-5.7444975596176776e+26,9.1376918031579736e+96,1.9414311887608448e+36,3.3948676008562055e+53,7.5711858331308014e+110,9.0249055444012977e+61,9.8661093350994751,3.882271294170474e+74,15.283517784197334,-1.4642499121111394e+29,1.3801893216921346e+76,1.6362386503733053e+23,6.969274678923403e+41,2.5670446587429029e+100,6.3070484407061118e+44,1.2200876673411511e+32,330446112452.72162,1.4351741223919787e+78,5.5489174239196912e+101,-108557635075367.23,-2.9216594748391493e+52,-30390777406773552,18206837652.26239,8.8598868919744488e+113,6.7972175179187667e+63,1.1473147360397502e+92,6.5572844427730145e+62,-1.0804989805259447e+105,-7.4724004857441848e+43,-5.5677805823289904e+102,-1.3441803097522849e+42,-179808.89409775226,9.3532913001058698e+29,4.3184424811501923e+62,2.4933347406150035e+95,1.0630024026440522e+108,1.8325101717159004e+30,4.7723980685174501e+45,3.2921979666663714e+41,9.6065677175565638e+103,-9.6909114141407259e+78,-583199991.79869545,6.3174568041410095e+63,5.4926036559348285e+129,5.6328347285742752e+58,9.7174503388482988e+99,107741.56004503225,-8.939288072030895e+50,-8.6908309330692653e+62,-1.7207539023918743e+43,-1.0175822206648161e+68,-6.346314918053374e+46,7.9093675610570488e+152,3.9643623159063941e+88,8.2179891586764846,6.7082766325832264,44349710.296002015,-1.0024696670043977e+29,-375224610388404.25,-7.22800250460044e+108,4.8976626222136011e+123,4.6909177947006563e+79,5.1422426080398871e+121,1.0680654789451059e+54,3.7987419970879535e+119,8.6756916367237514e+46,3.2969985956845654e+72,-1.4261166207527704e+22,-8.7249615262656439e+49,-3.024205993163045e+112,7.0016859405261318e+106,6.6856123017909348e+150,658600221.85269618,1.3081156970865035e+62,3.9028155629828877e+113,2.2530630681011677e+111,3.8079252881054687e+19,1.4523060914161967e+37,3.8245306674180863,5.7650773259689006e+39,-140953.99947447371,2.2577935950763669e+25,4.0427795272957391e+27,4.2929323892101571e+18,1.7633453354724922e+17,6.9838973644974727e+89,1.3708552748451715e+90,-3.8213297893088879e+68,8.5939245868526541e+54,-2.2426718494735534e+53,2.5512346886374981e+48,-1.6478546033135257e+118,7.8117314325362456e+183,4.626709260881052e+64,5979662359525949,2.3228334953970141e+54,2.0260560892158541e+99,206198726793830.09,-3.0499106002991949e+93,9.652128854176731e+58,2.308034677496685e+117,-42566376311785.398,8.0390387181220843e+207,64017.033651360194,2.4806268169058945e+23,5.2250553289284959e+71,4.8796533812221157e+95,8.3918105932188388e+54,1.6165593201210913e+50,89220936869130176,-3.0144993363038018e+53,-5.2174111840558164e+47,-1.254363862792421e+156,1.0046597563954852e+86,22855204327692088,2.9131913549955457e+55,1.3347974039628225e+73,2689636.0722007756,7.6400770326281851e+85,-1034377606757.8705,-7.0211514441033787e+74,-2.671159046386911,-9.2567024583059382e+108,1.712814716974795e+54,3.9634371452563992e+100,6.3935563817489632e+47,6.8295065728124632e+105,876995208.07301188,4.7725778895613989e+93,-4.3667180171873723e+67,8.4998958164540352e+89,60.419174880288168,2.7388601241251612e+30,15123384447754.109,1.0040982075540995e+50,3.7834745102941841e+112,1.9026697925847889e+74,2.0999606751222007e+100,5.2956079452610625e+84,12.792085838788047,-13984333213.61315,-3.6860252645635073e+58,1.6381445968837795e+161,8.6941734458522037e+134,1.9209483915720529e+121,8.231294251169176e+19,14427006521431462,1.4848576890619952e+82,2.8950243491656799e+92,2.763223016150671e+85,-5.8217490768548562e+34,-2.2662269201246268e+76,-12.638198406763886,28.108039166204282,1.3466015968767889e+123,1.7297484332847952e+37,1.4260710142748107e+41,1.3460185524033369e+93,3.1829995585341794e+75,9.8884168497213903e+67,-2.6635954429216163e+80,1.4571949589375105e+41,-8.4385491590841992e+141,6.9610722230564423e+102,1.1509644821293878e+55,3.2419484174455603e+20,2.7093752701402099e+59,2.3560024463287509e+51,269882738835107.47,5.6315116036983112e+105,-7.9917773442164986e+53,2.3063764598701963e+105,-42577385319.499214,4.2895767362516024e+44,1.2577407860565311e+78,1.6438320531268484e+77,1078190836439.7581,1.1682218870962569e+28,-4.7223045647158191e+88,-1.5397388023851469e+107,-1.8357279594034385e+83,2763252.464561943,-4.7032433161995834e+112,8.0195837551108948e+43,1.4818476579874915e+43,7.4072126514926931e+96,1.4322227161068229e+29,29583.848631915153,329358182182.98621,-4.8474227611805667e+48,2.8776352205793243,-3.1901030706223166e+95,-9.2585817219170649e+25,1.5251567429021659e+201,2.0043250132957617e+132,89824974827.594131,2.1880413005337941e+31,3.16674946827931e+37,1.3154940160575253e+31,1.9506019531155807e+28,1.8322428932010423e+50,2.0437445732528125e+51,-2.2670010423380596e+129,3.4986395528626139e+109,1.8661199045689131e+110,150693559982.92203,3250970151.2841263,2.4461744619006534e+96,357876487692.76001,2.813912405736191e+61,6.5418313127055562e+45,1334364214892.4011,-901864.83098517708,-9.8639688054171612e+95,1.2171594088125317e+113,9.7293186341575346e+117,7.5781170661927177e+22,9.5005705110686358e+79,3.489823628584212e+55,8.8558099127789064e+64,3.5187112753208676e+65,-8.1366686491674153e+47,-16240849501926750,4.650171914131148e+35,6.3096156363803102e+45,8.8042692777808731e+65,4.59483385077228e+56,1.5130881650785436e+19,15024187501.533974,1.6326767921027551e+24,16873702629.31855,3.5938244588242513e+107,-4.4335394318699584e+27,3.0963808789431904e+142,5.151032569445954e+102,1.0880551927768161e+101,29054017749090488,6.0239907421537702e+100,2.3469406767546998e+88,-20237782658.148991,-8.1342953913905774e+91,9.6558679680284494e+52,10504.322692149946,-4.1041374662224103e+93,28.265208647032786,3.7011263052874375e+120,9.4859357920399838e+79,1.3470979094025811e+67,3.2738942673604919e+43,2.9133515436719912e+30,2.2084194243243967e+40,4.3787970361301889e+82,4.0260886859246948e+28,3.5982189265734265e+121,1.2306169419998765e+28,1.6892397449934256e+74,878638911106.37927,96262.235620928317,3.5308923622842445e+89,-2.3134089646556139e+93,-8.1525501676190169e+23,1065.5799636885497,-6.954122521059772e+127,-1.0518147047315853e+72,1.3830292837936847e+133,117057983155.71504,2.6593793967175885e+86,2.2920106936359146e+34,3.2264786148937838e+40,3.4937206638862914e+78,-3.9506205839993899e+85,-1.2066184398679753e+19,-1.3355857351553748e+18,2.6277567182478264e+126,1.263991972986646e+181,1.3576925769342314e+95,7.5671741256355059e+75,5.3423785101636695e+34,58958222122195.156,1.7338122117003421e+17,2.3988933005548183e+62,3.4548511732096873e+20,-6.3650476752929574e+17,-6.0460982294063757e+104,-40441395725342496,65069.462974031485,1.202965165600551e+115,5.5305083357024447e+71,3.9904268775185127e+52,8.5080397128511493e+54,3.7080220291411896e+21,3.6731797557174171e+79,-1.6349923927584159e+62,2.9315387543700067e+137,-2.3486408101972716e+155,7.3382332358761854e+47,1.549668750560801e+44,6.986043161085604e+20,1.967085034802819e+77,5.345831303242845e+86,1.0475233486676312e+46,3.5680698890073229e+87,2.5667042799408005e+46,-9.956649341571208e+55,-1.3822140700055798e+115,623912534.89717662,4196249.6941729942,1.4502741913981547e+58,4.3927304970747807e+71,414255971244.30536,9.7694278910920101e+60,-1.9135945555807224e+51,4.8359660023478815e+18,9.8997527841605123e+38,1.7881105653397215e+136,6.7843844446494938e+40,3.502935349301148e+104,3.5012850476815142e+80,5.4586794797041813e+82,4.927157750921189e+44,789463858121.28003,-8.8907743017349746e+83,-3.1181492042481602e+100,-4.2437552142677582e+19,-1.4181759112229436e+103,6.017987655073616e+102,287592.28743100486,1516.4046178637689,5.5377258570397382e+22,1.2817009235983124e+78,-13582721962458.498,3.4343805565627682e+68,-1.7824355989457533e+118,3.9093424588597614e+123,-4.0479222248677909e+34,19135086423.393059,4.0053127944040377e+120,5.4563664769435999e+107,28603145.136749648,2.349271125824421e+45,10.00229715905575,6.7942309795316152e+59,1.5736115077477989e+44,4.8972719036487826e+32,-3.421232315960915e+63,722911715.27246976,4.4248881698018506e+91,2.5547626773851431e+99,3.4301348959685141e+28,78392831.276729122,16298.671972420032,-7.1897448106561597e+30,1.0377897637464524e+32,5.336254628632602e+71,-8324350.5087277712,2.31604065397935e+184,5.0824794229102654e+124,1.0931286329688021e+55,34747593800.737213,1.3261998281321603e+105,-3.6746559243794136e+84,3869480236089656,8.3701030636294317e+98,-8.8152789631073249e+41,-3.9068427993588747e+123,2.0733892440251397e+137,1.1232943719576448e+127,3242.7255385815884,2.2673721005685918e+97,1.2881342950062497e+74,-8.3960594525088882e+87,4.2729765030553122e+35,-1.2535240323778234e+78,7.120097224523809e+97,-3.0414093201801548e+115]}
},{}],156:[function(require,module,exports){
module.exports={"n":[8,40,15,38,5,36,26,60,15,50,18,37,25,45,7,31,30,43,43,7,14,41,47,43,4,41,24,40,0,28,13,3,0,22,11,38,8,6,16,32,10,39,8,58,36,58,54,54,57,55,13,8,29,22,22,41,31,32,16,43,4,50,26,0,10,41,1,45,58,56,26,35,58,1,46,51,0,36,41,16,43,19,39,0,33,29,13,10,47,22,13,31,22,59,54,10,52,52,24,44,19,25,37,41,55,22,55,18,36,28,20,42,52,9,26,4,55,36,2,29,32,49,43,58,10,6,20,42,11,28,19,6,24,13,33,25,2,11,33,6,16,23,14,5,14,33,9,1,58,60,57,60,49,39,44,36,10,44,21,47,11,12,0,6,19,13,42,23,38,42,33,20,26,57,17,49,30,32,46,49,46,7,35,18,45,23,39,45,7,48,30,48,21,25,5,54,9,41,12,2,41,53,26,35,42,4,15,40,0,49,32,27,17,48,57,22,55,48,23,37,1,0,40,20,51,38,59,12,3,32,27,0,35,32,41,25,43,30,39,50,44,28,22,19,35,52,7,58,3,22,59,20,17,30,36,36,58,33,11,26,11,31,20,31,56,1,23,10,16,48,9,50,24,39,22,8,7,5,26,45,5,23,37,53,0,50,34,11,48,16,14,32,27,2,34,47,3,4,30,40,39,27,13,35,51,19,59,17,51,1,30,20,17,56,45,12,14,51,58,37,37,49,36,22,10,3,5,56,15,53,52,2,55,58,42,40,44,4,14,12,35,6,49,30,24,22,60,43,5,28,19,13,31,51,3,50,44,20,33,4,32,24,50,18,52,27,48,25,19,21,27,1,45,4,6,32,6,23,16,10,32,31,59,42,43,42,19,17,17,29,51,49,55,60,38,3,15,11,5,36,51,26,35,36,57,22,3,13,35,26,17,29,50,43,11,9,26,6,23,33,50,29,41,18,12,36,19,37,8,26,40,28,34,52,10,54,9,57,29,8,55,8,33,33,2,34,3,37,49,26,27,28,23,34,48,51,22,58,32,47,43,11,53,15,20,54,39,18,59,58,4,38,35,54,25,23,18,48,16,37,46,11,60,52,11,20,47,11,11,9,60,45,48,9,25,9,44,23,30,35,49,38,21,3,4,22,36,24,55,42,11,43,26,39,45,45,2,47,57,4,46,26,34,39,11,19,30,37,31,56,60,59,52,41,58,12,41,40,24,39,57,41,29,19,14,29,24,47,43,47,34,34,46,37,60,57,58,27,32,11,58,56,7,48,3,1,18,0,35,39,32,26,54,39,32,57,26,7,33,6,43,38,1,5,48,5,8,49,29,40,15,43,22,54,40,8,10,36,17,50,12,54,11,60,19,1,53,30,28,59,24,19,10,33,59,35,24,23,51,41,37,31,22,14,53,26,47,36,28,32,49,46,54,50,26,1,20,6,36,47,55,1,42,45,23,13,44,29,58,16,33,46,32,42,18,60,4,24,11,51,5,30,28,48,0,34,55,56,39,55,0,46,1,14,12,44,27,18,7,51,0,1,44,8,21,31,47,43,26,21,26,2,3,15,3,3,5,34,36,43,14,8,51,16,52,37,58,17,29,31,13,9,13,50,32,32,46,40,21,15,28,50,38,49,55,13,9,47,43,1,35,20,26,16,53,17,23,36,10,21,38,13,38,40,20,3,48,22,60,22,59,59,7,45,14,45,1,59,37,53,6,21,24,24,53,22,33,2,22,35,12,27,26,45,58,4,7,45,28,17,52,15,2,31,42,37,59,5,17,45,8,46,41,17,55,11,37,56,54,10,11,42,46,16,21,41,25,60,9,50,49,36,38,4,45,47,49,54,4,22,57,5,30,56,46,38,45,51,50,19,9,18,27,28,37,15,56,60,50,40,54,58,35,54,35,21,52,8,2,2,54,33,24,8,2,28,45,38,9,51,8,55,36,24,15,43,19,55,24,7,24,56,23,11,37,19,10,37,11,43,5,55,19,15,46,19,14,22,45,13,42,25,50,30,50,29,17,34,18,50,31,13,19,42,50,49,49,50,33,7,16,9,41,26,14,19,27,26,23,51,32,24,60,16,46,27,59,18,14,36,32,59,3,15,46,5,36,32,52,39,60,16,56,6,24,57,0,17,32,36,12,7,13,60,19,21,5,42,45,41,45,39,33,32,20,17,50,0,33,17,58,37,54,36,21,31,33,39,21,60,37,33,48,20,45,40,7,46,50,6,1,9,25,49,44,36,47,2,22,3],"x":[100,100.10010010010011,100.2002002002002,100.30030030030031,100.4004004004004,100.50050050050051,100.6006006006006,100.70070070070071,100.8008008008008,100.90090090090091,101.001001001001,101.10110110110111,101.2012012012012,101.30130130130131,101.4014014014014,101.50150150150151,101.6016016016016,101.70170170170171,101.8018018018018,101.90190190190191,102.002002002002,102.10210210210211,102.2022022022022,102.30230230230231,102.4024024024024,102.50250250250251,102.6026026026026,102.70270270270271,102.8028028028028,102.90290290290291,103.003003003003,103.10310310310311,103.2032032032032,103.30330330330331,103.4034034034034,103.50350350350351,103.6036036036036,103.70370370370371,103.8038038038038,103.90390390390391,104.004004004004,104.10410410410411,104.2042042042042,104.30430430430431,104.4044044044044,104.50450450450451,104.6046046046046,104.70470470470471,104.8048048048048,104.90490490490491,105.005005005005,105.10510510510511,105.2052052052052,105.30530530530531,105.4054054054054,105.50550550550551,105.6056056056056,105.70570570570571,105.8058058058058,105.90590590590591,106.006006006006,106.10610610610611,106.2062062062062,106.30630630630631,106.4064064064064,106.50650650650651,106.6066066066066,106.70670670670671,106.8068068068068,106.90690690690691,107.007007007007,107.10710710710711,107.2072072072072,107.30730730730731,107.4074074074074,107.50750750750751,107.6076076076076,107.70770770770771,107.80780780780781,107.90790790790791,108.00800800800801,108.10810810810811,108.20820820820821,108.30830830830831,108.40840840840841,108.50850850850851,108.60860860860861,108.70870870870871,108.80880880880881,108.90890890890891,109.00900900900901,109.10910910910911,109.20920920920921,109.30930930930931,109.40940940940941,109.50950950950951,109.60960960960961,109.70970970970971,109.80980980980981,109.90990990990991,110.01001001001001,110.11011011011011,110.21021021021021,110.31031031031031,110.41041041041041,110.51051051051051,110.61061061061061,110.71071071071071,110.81081081081081,110.91091091091091,111.01101101101101,111.11111111111111,111.21121121121121,111.31131131131131,111.41141141141141,111.51151151151151,111.61161161161161,111.71171171171171,111.81181181181181,111.91191191191191,112.01201201201201,112.11211211211211,112.21221221221221,112.31231231231232,112.41241241241241,112.51251251251252,112.61261261261261,112.71271271271272,112.81281281281281,112.91291291291292,113.01301301301301,113.11311311311312,113.21321321321321,113.31331331331332,113.41341341341341,113.51351351351352,113.61361361361361,113.71371371371372,113.81381381381381,113.91391391391392,114.01401401401401,114.11411411411412,114.21421421421421,114.31431431431432,114.41441441441441,114.51451451451452,114.61461461461461,114.71471471471472,114.81481481481481,114.91491491491492,115.01501501501502,115.11511511511512,115.21521521521521,115.31531531531532,115.41541541541542,115.51551551551552,115.61561561561561,115.71571571571572,115.81581581581582,115.91591591591592,116.01601601601601,116.11611611611612,116.21621621621622,116.31631631631632,116.41641641641641,116.51651651651652,116.61661661661662,116.71671671671672,116.81681681681681,116.91691691691692,117.01701701701703,117.11711711711712,117.21721721721721,117.31731731731732,117.41741741741743,117.51751751751752,117.61761761761761,117.71771771771772,117.81781781781783,117.91791791791792,118.01801801801801,118.11811811811812,118.21821821821823,118.31831831831832,118.41841841841841,118.51851851851852,118.61861861861863,118.71871871871872,118.81881881881881,118.91891891891892,119.01901901901903,119.11911911911912,119.21921921921921,119.31931931931932,119.41941941941943,119.51951951951952,119.61961961961961,119.71971971971972,119.81981981981983,119.91991991991992,120.02002002002001,120.12012012012012,120.22022022022023,120.32032032032032,120.42042042042041,120.52052052052052,120.62062062062063,120.72072072072072,120.82082082082081,120.92092092092092,121.02102102102103,121.12112112112112,121.22122122122121,121.32132132132132,121.42142142142143,121.52152152152152,121.62162162162163,121.72172172172172,121.82182182182183,121.92192192192192,122.02202202202203,122.12212212212212,122.22222222222223,122.32232232232232,122.42242242242243,122.52252252252252,122.62262262262263,122.72272272272272,122.82282282282283,122.92292292292292,123.02302302302303,123.12312312312312,123.22322322322323,123.32332332332332,123.42342342342343,123.52352352352352,123.62362362362363,123.72372372372372,123.82382382382383,123.92392392392392,124.02402402402403,124.12412412412412,124.22422422422423,124.32432432432432,124.42442442442443,124.52452452452452,124.62462462462463,124.72472472472472,124.82482482482483,124.92492492492492,125.02502502502503,125.12512512512512,125.22522522522523,125.32532532532532,125.42542542542543,125.52552552552552,125.62562562562563,125.72572572572572,125.82582582582583,125.92592592592592,126.02602602602603,126.12612612612612,126.22622622622623,126.32632632632632,126.42642642642643,126.52652652652652,126.62662662662663,126.72672672672672,126.82682682682683,126.92692692692692,127.02702702702703,127.12712712712712,127.22722722722723,127.32732732732732,127.42742742742743,127.52752752752752,127.62762762762763,127.72772772772772,127.82782782782783,127.92792792792793,128.02802802802802,128.12812812812814,128.22822822822823,128.32832832832833,128.42842842842842,128.52852852852854,128.62862862862863,128.72872872872873,128.82882882882882,128.92892892892894,129.02902902902903,129.12912912912913,129.22922922922922,129.32932932932934,129.42942942942943,129.52952952952953,129.62962962962962,129.72972972972974,129.82982982982983,129.92992992992993,130.03003003003005,130.13013013013014,130.23023023023023,130.33033033033033,130.43043043043042,130.53053053053054,130.63063063063063,130.73073073073073,130.83083083083085,130.93093093093094,131.03103103103103,131.13113113113113,131.23123123123122,131.33133133133134,131.43143143143143,131.53153153153153,131.63163163163165,131.73173173173174,131.83183183183183,131.93193193193193,132.03203203203202,132.13213213213214,132.23223223223223,132.33233233233233,132.43243243243245,132.53253253253254,132.63263263263264,132.73273273273273,132.83283283283282,132.93293293293294,133.03303303303304,133.13313313313313,133.23323323323325,133.33333333333334,133.43343343343344,133.53353353353353,133.63363363363362,133.73373373373374,133.83383383383384,133.93393393393393,134.03403403403405,134.13413413413414,134.23423423423424,134.33433433433433,134.43443443443442,134.53453453453454,134.63463463463464,134.73473473473473,134.83483483483485,134.93493493493494,135.03503503503504,135.13513513513513,135.23523523523522,135.33533533533534,135.43543543543544,135.53553553553553,135.63563563563565,135.73573573573574,135.83583583583584,135.93593593593593,136.03603603603602,136.13613613613614,136.23623623623624,136.33633633633633,136.43643643643645,136.53653653653654,136.63663663663664,136.73673673673673,136.83683683683682,136.93693693693695,137.03703703703704,137.13713713713713,137.23723723723725,137.33733733733735,137.43743743743744,137.53753753753753,137.63763763763762,137.73773773773775,137.83783783783784,137.93793793793793,138.03803803803805,138.13813813813815,138.23823823823824,138.33833833833833,138.43843843843842,138.53853853853855,138.63863863863864,138.73873873873873,138.83883883883885,138.93893893893895,139.03903903903904,139.13913913913913,139.23923923923923,139.33933933933935,139.43943943943944,139.53953953953953,139.63963963963965,139.73973973973975,139.83983983983984,139.93993993993993,140.04004004004003,140.14014014014015,140.24024024024024,140.34034034034033,140.44044044044045,140.54054054054055,140.64064064064064,140.74074074074073,140.84084084084083,140.94094094094095,141.04104104104104,141.14114114114113,141.24124124124126,141.34134134134135,141.44144144144144,141.54154154154153,141.64164164164163,141.74174174174175,141.84184184184184,141.94194194194193,142.04204204204206,142.14214214214215,142.24224224224224,142.34234234234233,142.44244244244243,142.54254254254255,142.64264264264264,142.74274274274273,142.84284284284286,142.94294294294295,143.04304304304304,143.14314314314316,143.24324324324326,143.34334334334335,143.44344344344344,143.54354354354354,143.64364364364366,143.74374374374375,143.84384384384384,143.94394394394396,144.04404404404406,144.14414414414415,144.24424424424424,144.34434434434434,144.44444444444446,144.54454454454455,144.64464464464464,144.74474474474476,144.84484484484486,144.94494494494495,145.04504504504504,145.14514514514514,145.24524524524526,145.34534534534535,145.44544544544544,145.54554554554556,145.64564564564566,145.74574574574575,145.84584584584584,145.94594594594594,146.04604604604606,146.14614614614615,146.24624624624624,146.34634634634637,146.44644644644646,146.54654654654655,146.64664664664664,146.74674674674674,146.84684684684686,146.94694694694695,147.04704704704704,147.14714714714717,147.24724724724726,147.34734734734735,147.44744744744744,147.54754754754754,147.64764764764766,147.74774774774775,147.84784784784785,147.94794794794797,148.04804804804806,148.14814814814815,148.24824824824825,148.34834834834834,148.44844844844846,148.54854854854855,148.64864864864865,148.74874874874877,148.84884884884886,148.94894894894895,149.04904904904905,149.14914914914914,149.24924924924926,149.34934934934935,149.44944944944945,149.54954954954957,149.64964964964966,149.74974974974975,149.84984984984985,149.94994994994994,150.05005005005006,150.15015015015015,150.25025025025025,150.35035035035037,150.45045045045046,150.55055055055055,150.65065065065065,150.75075075075074,150.85085085085086,150.95095095095095,151.05105105105105,151.15115115115117,151.25125125125126,151.35135135135135,151.45145145145145,151.55155155155154,151.65165165165166,151.75175175175175,151.85185185185185,151.95195195195197,152.05205205205206,152.15215215215215,152.25225225225225,152.35235235235234,152.45245245245246,152.55255255255256,152.65265265265265,152.75275275275277,152.85285285285286,152.95295295295296,153.05305305305305,153.15315315315314,153.25325325325326,153.35335335335336,153.45345345345345,153.55355355355357,153.65365365365366,153.75375375375376,153.85385385385385,153.95395395395394,154.05405405405406,154.15415415415416,154.25425425425425,154.35435435435437,154.45445445445446,154.55455455455456,154.65465465465465,154.75475475475474,154.85485485485486,154.95495495495496,155.05505505505505,155.15515515515517,155.25525525525526,155.35535535535536,155.45545545545545,155.55555555555554,155.65565565565566,155.75575575575576,155.85585585585585,155.95595595595597,156.05605605605606,156.15615615615616,156.25625625625625,156.35635635635634,156.45645645645646,156.55655655655656,156.65665665665665,156.75675675675677,156.85685685685687,156.95695695695696,157.05705705705705,157.15715715715714,157.25725725725727,157.35735735735736,157.45745745745745,157.55755755755757,157.65765765765767,157.75775775775776,157.85785785785785,157.95795795795794,158.05805805805807,158.15815815815816,158.25825825825825,158.35835835835837,158.45845845845847,158.55855855855856,158.65865865865865,158.75875875875874,158.85885885885887,158.95895895895896,159.05905905905905,159.15915915915917,159.25925925925927,159.35935935935936,159.45945945945945,159.55955955955955,159.65965965965967,159.75975975975976,159.85985985985985,159.95995995995997,160.06006006006007,160.16016016016016,160.26026026026028,160.36036036036037,160.46046046046047,160.56056056056056,160.66066066066065,160.76076076076077,160.86086086086087,160.96096096096096,161.06106106106108,161.16116116116117,161.26126126126127,161.36136136136136,161.46146146146145,161.56156156156158,161.66166166166167,161.76176176176176,161.86186186186188,161.96196196196198,162.06206206206207,162.16216216216216,162.26226226226225,162.36236236236238,162.46246246246247,162.56256256256256,162.66266266266268,162.76276276276278,162.86286286286287,162.96296296296296,163.06306306306305,163.16316316316318,163.26326326326327,163.36336336336336,163.46346346346348,163.56356356356358,163.66366366366367,163.76376376376376,163.86386386386386,163.96396396396398,164.06406406406407,164.16416416416416,164.26426426426428,164.36436436436435,164.46446446446447,164.56456456456456,164.66466466466466,164.76476476476478,164.86486486486487,164.96496496496496,165.06506506506508,165.16516516516515,165.26526526526527,165.36536536536536,165.46546546546546,165.56556556556558,165.66566566566567,165.76576576576576,165.86586586586589,165.96596596596595,166.06606606606607,166.16616616616616,166.26626626626626,166.36636636636638,166.46646646646647,166.56656656656656,166.66666666666669,166.76676676676675,166.86686686686687,166.96696696696696,167.06706706706706,167.16716716716718,167.26726726726727,167.36736736736736,167.46746746746749,167.56756756756755,167.66766766766767,167.76776776776777,167.86786786786786,167.96796796796798,168.06806806806807,168.16816816816817,168.26826826826829,168.36836836836838,168.46846846846847,168.56856856856859,168.66866866866866,168.76876876876878,168.86886886886887,168.96896896896897,169.06906906906909,169.16916916916918,169.26926926926927,169.36936936936939,169.46946946946946,169.56956956956958,169.66966966966967,169.76976976976977,169.86986986986989,169.96996996996998,170.07007007007007,170.17017017017019,170.27027027027026,170.37037037037038,170.47047047047047,170.57057057057057,170.67067067067069,170.77077077077078,170.87087087087087,170.970970970971,171.07107107107106,171.17117117117118,171.27127127127127,171.37137137137137,171.47147147147149,171.57157157157158,171.67167167167167,171.7717717717718,171.87187187187186,171.97197197197198,172.07207207207207,172.17217217217217,172.27227227227229,172.37237237237238,172.47247247247248,172.5725725725726,172.67267267267266,172.77277277277278,172.87287287287288,172.97297297297297,173.07307307307309,173.17317317317318,173.27327327327328,173.3733733733734,173.47347347347346,173.57357357357358,173.67367367367368,173.77377377377377,173.87387387387389,173.97397397397398,174.07407407407408,174.1741741741742,174.27427427427426,174.37437437437438,174.47447447447448,174.57457457457457,174.67467467467469,174.77477477477478,174.87487487487488,174.974974974975,175.07507507507506,175.17517517517518,175.27527527527528,175.37537537537537,175.47547547547549,175.57557557557558,175.67567567567568,175.7757757757758,175.87587587587586,175.97597597597598,176.07607607607608,176.17617617617617,176.27627627627629,176.37637637637638,176.47647647647648,176.5765765765766,176.67667667667666,176.77677677677679,176.87687687687688,176.97697697697697,177.07707707707709,177.17717717717719,177.27727727727728,177.3773773773774,177.47747747747746,177.57757757757759,177.67767767767768,177.77777777777777,177.87787787787789,177.97797797797799,178.07807807807808,178.1781781781782,178.27827827827826,178.37837837837839,178.47847847847848,178.57857857857857,178.67867867867869,178.77877877877879,178.87887887887888,178.978978978979,179.07907907907907,179.17917917917919,179.27927927927928,179.37937937937937,179.47947947947949,179.57957957957959,179.67967967967968,179.7797797797798,179.87987987987987,179.97997997997999,180.08008008008008,180.18018018018017,180.28028028028029,180.38038038038039,180.48048048048048,180.5805805805806,180.68068068068067,180.78078078078079,180.88088088088088,180.98098098098097,181.08108108108109,181.18118118118119,181.28128128128128,181.3813813813814,181.48148148148147,181.58158158158159,181.68168168168168,181.78178178178177,181.8818818818819,181.98198198198199,182.08208208208208,182.1821821821822,182.28228228228227,182.38238238238239,182.48248248248248,182.58258258258257,182.6826826826827,182.78278278278279,182.88288288288288,182.982982982983,183.08308308308307,183.18318318318319,183.28328328328328,183.38338338338338,183.4834834834835,183.58358358358359,183.68368368368368,183.7837837837838,183.88388388388387,183.98398398398399,184.08408408408408,184.18418418418418,184.2842842842843,184.38438438438439,184.48448448448448,184.5845845845846,184.68468468468467,184.78478478478479,184.88488488488488,184.98498498498498,185.0850850850851,185.18518518518519,185.28528528528528,185.3853853853854,185.4854854854855,185.58558558558559,185.68568568568571,185.78578578578578,185.8858858858859,185.98598598598599,186.08608608608608,186.18618618618621,186.2862862862863,186.38638638638639,186.48648648648651,186.58658658658658,186.6866866866867,186.78678678678679,186.88688688688688,186.98698698698701,187.0870870870871,187.18718718718719,187.28728728728731,187.38738738738738,187.4874874874875,187.58758758758759,187.68768768768768,187.78778778778781,187.8878878878879,187.98798798798799,188.08808808808811,188.18818818818818,188.2882882882883,188.38838838838839,188.48848848848849,188.58858858858861,188.6886886886887,188.78878878878879,188.88888888888891,188.98898898898898,189.0890890890891,189.18918918918919,189.28928928928929,189.38938938938941,189.4894894894895,189.58958958958959,189.68968968968971,189.78978978978978,189.8898898898899,189.98998998998999,190.09009009009009,190.19019019019021,190.2902902902903,190.39039039039039,190.49049049049052,190.59059059059058,190.6906906906907,190.79079079079079,190.89089089089089,190.99099099099101,191.0910910910911,191.19119119119119,191.29129129129132,191.39139139139138,191.4914914914915,191.59159159159159,191.69169169169169,191.79179179179181,191.8918918918919,191.99199199199199,192.09209209209212,192.19219219219218,192.2922922922923,192.3923923923924,192.49249249249249,192.59259259259261,192.6926926926927,192.7927927927928,192.89289289289292,192.99299299299298,193.0930930930931,193.1931931931932,193.29329329329329,193.39339339339341,193.4934934934935,193.5935935935936,193.69369369369372,193.79379379379378,193.8938938938939,193.993993993994,194.09409409409409,194.19419419419421,194.2942942942943,194.3943943943944,194.49449449449452,194.59459459459458,194.6946946946947,194.7947947947948,194.89489489489489,194.99499499499501,195.0950950950951,195.1951951951952,195.29529529529532,195.39539539539538,195.4954954954955,195.5955955955956,195.69569569569569,195.79579579579581,195.8958958958959,195.995995995996,196.09609609609612,196.19619619619618,196.2962962962963,196.3963963963964,196.49649649649649,196.59659659659661,196.6966966966967,196.7967967967968,196.89689689689692,196.99699699699698,197.09709709709711,197.1971971971972,197.29729729729729,197.39739739739741,197.49749749749751,197.5975975975976,197.69769769769772,197.79779779779778,197.89789789789791,197.997997997998,198.09809809809809,198.19819819819821,198.29829829829831,198.3983983983984,198.49849849849852,198.59859859859858,198.69869869869871,198.7987987987988,198.89889889889889,198.99899899899901,199.09909909909911,199.1991991991992,199.29929929929932,199.39939939939939,199.49949949949951,199.5995995995996,199.69969969969969,199.79979979979981,199.89989989989991,200],"y":[-5.2446234458058123e-13,-2.377979374106134e-34,9.1102681140105777e-20,-1.4758380482795683e-33,2.4116856968817262e-09,-1.0274195020033985e-32,-1.5066948337326139e-27,-1.2111729609291445e-40,8.3255094917671428e-20,-4.927868252335076e-38,-3.2463036323033556e-22,2.9629482634263952e-33,5.1961355938206582e-27,1.8405381401779751e-36,6.7600917593408489e-12,1.9397231773275509e-30,-6.340933127305747e-30,8.3419217281076051e-36,7.9948520434838734e-36,6.5299709989172966e-12,-5.049717511284593e-19,4.2230059765419029e-35,2.466637584731734e-37,6.4685142380928251e-36,-5.563892228302855e-08,3.5942790567825367e-35,-1.5652014669268665e-26,-8.4772253722344705e-35,4.6279410515897936,-5.5826375220341963e-29,3.4709467483681269e-18,1.8515177633810993e-06,4.6318472565026143,-2.775380705145189e-25,2.6473440606898389e-16,-4.4446479724016582e-34,-3.945637985322079e-13,-9.9297473519150124e-11,-7.7656455618002415e-21,-2.8057876313544498e-31,-2.5704298951765241e-15,1.3067528202784726e-34,-3.7665046079126607e-13,-4.5869565272623567e-41,-2.5892905460532315e-33,-4.1021631516258981e-41,-4.8150722707939586e-40,-4.5716535918121896e-40,6.353913133146855e-41,2.1309358316117246e-40,2.6993134578815629e-18,-3.5147014801686094e-13,8.0098859919299879e-30,-1.8158457608792953e-25,-1.7781130394305659e-25,1.0942815188542101e-35,5.6446195377978732e-31,-1.6145067835459124e-31,-5.7124035541467578e-21,1.4501397255454649e-36,-4.8418352612030773e-08,-3.940269924670421e-39,-3.6550817059437015e-28,4.6616138454175289,-2.0434465436199146e-15,7.4172591719100795e-36,0.0094244140913512728,1.7556899228471843e-37,-1.1527604214852059e-41,-3.8751121891451842e-41,-3.00395928391262e-28,3.1307289464605031e-33,-9.2700993965735989e-42,0.009362586891214152,-5.4958787754679992e-38,9.5228618616831162e-40,4.6738376396454395,-8.3946379473176531e-34,4.4984123099123253e-36,-4.1638301253069588e-21,6.2053507513434785e-37,1.5874225483621556e-23,2.8733438758504827e-35,4.6803583119165548,2.1262074762873803e-32,3.2547037187024891e-30,1.7372872807457063e-18,-1.6480520499333596e-15,1.2820331081627058e-38,-8.632485463196873e-26,1.6557774507383113e-18,2.0430832124784785e-31,-8.1228823139031834e-26,1.5939711163031042e-42,-4.2157351374448171e-41,-1.530917194416293e-15,-1.6504030740012278e-40,-1.5735792485007242e-40,-3.046260480773689e-27,-1.1472707444086176e-37,1.1380080722545431e-23,6.2439872295173056e-28,1.2002824049140594e-34,1.7486269112120667e-36,1.2635166946143401e-41,-6.2522423556256505e-26,1.143217536889895e-41,-6.1734902562933566e-23,-3.0061011848160535e-34,-6.7833256904995984e-30,-1.645741304512389e-24,-4.8107687095963642e-37,-7.7378902076692373e-41,1.6000408292523521e-14,-1.0476874602332613e-28,-3.9504795770503831e-08,6.9509750354141042e-42,-2.2431965681744219e-34,-8.0706540944114802e-05,1.3239037665677776e-30,-2.507227600412861e-32,5.6559082997497578e-40,1.1929200586314636e-37,-6.1717172677951293e-43,-1.1771222105261078e-15,-6.0746525736509068e-11,-1.234243309890024e-24,-2.6306984220488618e-37,1.0112333096349666e-16,-4.1017322212466157e-30,6.8068428770615595e-24,-5.8828467540333652e-11,-1.4596354504514232e-27,9.9860478742880239e-19,4.7640710192510458e-33,2.9075415417173259e-28,-7.8155898579031929e-05,9.2616274719056686e-17,4.2389458101367699e-33,-5.6379878519141258e-11,-1.7191986338111106e-21,5.9573157078927894e-27,-1.0293900283240395e-19,1.2565648448313596e-09,-1.0043521321255874e-19,3.4588106004418122e-33,1.2283554781886127e-14,0.008755383354290899,-1.710298082534693e-43,-4.2463938833168175e-44,3.1057029802444925e-43,-3.8236898315716107e-44,1.4761018991993146e-40,2.3789693623518599e-36,-1.3237108160747978e-38,-6.6862285109762214e-35,-8.8770863703567512e-16,-1.1801473843844027e-38,1.2185120812916179e-25,6.4717634858172464e-40,7.4219809983927561e-17,-6.9939748577009587e-18,4.7511438934999122,-4.9717136277494414e-11,3.8643414251387334e-24,6.9396035705265811e-19,-6.2581365924599812e-38,3.5387476590243039e-27,-4.3887604554233858e-36,-5.6149413109603261e-38,1.6897751285773989e-33,-5.6142273237916604e-25,-2.7810306722936783e-29,9.9904209955394839e-44,1.4664525834619687e-22,5.5767879977134129e-41,-7.7027543752522979e-32,-5.0798155035545699e-33,-7.6600446321259458e-40,4.7175320414212486e-41,-7.0823725570338169e-40,2.3117436226722553e-12,9.7497214968168096e-35,-1.8569152959303427e-23,1.587580599665668e-39,2.4842550074616546e-27,7.8719752042689496e-37,1.4159316711364498e-39,2.2176006495096036e-12,-7.6811375428860696e-41,-5.3913842320657594e-32,-7.0830909052171609e-41,6.6159172030826416e-26,8.3118278529421982e-29,1.0090413314221993e-09,-3.4974878853565297e-43,8.3474933663553984e-15,6.0142812217827245e-38,-4.7907820583061635e-18,-7.0119504057317096e-05,5.4249996532051295e-38,6.0174460928273444e-43,-1.4368279471876675e-29,5.2482129182541059e-35,-1.6167676531180365e-38,-2.891372884434046e-08,5.5698555885347998e-21,-1.2833977767261834e-37,4.7901645602336869,1.3691838572650445e-41,-2.0878422594366998e-33,2.5482888135700641e-30,8.509777862454138e-23,-2.9299833183308231e-41,1.3966965090071141e-44,-7.6690513574458248e-27,6.058080259807656e-44,-2.4998542535120385e-41,1.3167188998626629e-27,2.817205597896224e-36,0.0082289147309368184,4.8009216951479763,-7.8124939066990807e-38,-2.3444729503924314e-25,1.2291076177845497e-42,-7.1157036592796869e-37,1.7616338196922578e-45,-3.5904041246982733e-18,1.0926800148478995e-06,-1.2651441899039432e-33,1.6704378251413472e-30,4.8091183829582054,2.2709932810183475e-35,-1.139643752068079e-33,1.7161883336297344e-38,3.4851775608859329e-29,1.8228173876601871e-39,-1.6772641579123678e-32,1.464988493768738e-37,-1.6259743390161012e-42,-5.5174555636100345e-40,-2.8650461189249171e-31,-4.7178242832369992e-27,1.1030096986558062e-24,1.6150630894849149e-35,-2.1135636070013286e-43,1.5858462997243371e-12,-1.379347118392758e-45,1.0407403184255949e-06,-4.1666806669010401e-27,5.5835265122822151e-46,-1.4876245017392588e-25,4.8869816414961557e-23,-1.1386187887767426e-32,-3.4139690966155431e-36,-3.3169535816198655e-36,-9.072232860234982e-46,1.566717632733929e-34,3.0280612410004489e-17,-4.2832009072761836e-30,2.9753625026124956e-17,2.2441119019880898e-33,-1.2476604142136848e-25,2.1360435239100372e-33,-3.115305078452354e-45,0.0079347957995285889,5.3899288016058529e-28,-3.5328477195987791e-16,-3.1064321411895469e-22,-3.3243679857237501e-42,4.8503052688088127e-15,-4.5174593795761326e-43,-8.7688031517817251e-29,4.9143562909132873e-38,-2.6887801838214863e-27,-7.4330497707882872e-14,1.3414985336129233e-12,7.1989449457744641e-10,-2.8963829766374128e-30,4.8460487898648577e-41,7.1145861556139784e-10,4.1056928519868731e-28,4.3287484034229783e-37,1.7875077928214333e-44,4.8514735005831042,-2.6058936857624892e-43,-1.8941094938396374e-35,2.3538516169996887e-17,-1.6237681944519747e-42,-2.3855883584597023e-22,-1.853673150712677e-20,-2.6002145237034873e-34,4.4005848641276231e-31,-6.0250959379155797e-05,-1.5325733887065354e-35,3.4334668796230393e-42,9.288364656824637e-07,-2.151195279857251e-08,-3.9316258510327748e-33,-6.7054335260154257e-39,2.1596906828737511e-38,3.6453945821945859e-31,1.6240741715521139e-19,3.1669954913505539e-36,4.7971380189139413e-44,4.3558519093347685e-25,4.1591477895867412e-47,2.3451146520846132e-23,4.1006148244289119e-44,0.0076668555113884335,-2.9794679739948354e-33,-5.8038429425575758e-26,2.1970842765854578e-23,-3.6682094520572346e-46,1.430345628594257e-41,-1.5576917595234522e-18,-1.4000864711751822e-20,2.8860975818525091e-44,-5.4789921714246859e-47,1.5035943756269736e-37,1.4618382719636644e-37,1.7483166979628146e-43,-5.0574438985577977e-37,-1.1677091933576608e-27,-2.2705600639868289e-16,8.6890976681832702e-07,5.9584007485347158e-10,-2.0202313427938076e-46,1.303605748203455e-21,2.7410230724752872e-45,-6.7135987238213219e-45,-5.6844672727679234e-05,3.947101345072194e-46,-2.8342036306528286e-47,-2.1376881038668037e-40,-2.2359645297420198e-39,-2.0439258889553908e-41,-1.9040312346771186e-08,-1.1089232029552664e-20,-1.2525691517318214e-18,1.1834994678671012e-36,-2.1068531511300024e-11,8.0453767188377018e-44,-1.4079057133978599e-33,-2.3252812262334661e-29,-8.1108581602155962e-28,-3.0612188676724619e-48,4.442109802182092e-41,5.4857742579282283e-10,-2.7405028997260589e-32,2.2808078296307729e-25,1.0025267510848582e-19,2.5630387138367672e-34,7.2518640352367672e-45,8.1402927793506356e-07,-1.8162453696190817e-44,-1.0600147413025848e-41,-2.9030186786833022e-26,1.2090418398459256e-35,-1.7831828051417172e-08,-4.8778597176719309e-35,-1.7174918699182396e-29,-1.4022127918363283e-44,-1.4336592187125277e-24,-1.7967375385587059e-45,9.9124242700426131e-32,-9.5405499898598231e-44,2.7209241028295523e-30,1.7714142414311622e-25,3.5653690373045266e-27,8.9768253899502635e-32,0.0073186218437917517,2.0309177076054312e-42,-1.7112500095867849e-08,-1.8197324500744617e-11,-3.4287784712993861e-35,-1.803851795957097e-11,7.7329426545261571e-29,-8.1582202247259454e-23,-1.5086599494912558e-16,-3.0512787678231961e-35,1.3237642597126907e-34,1.457419787525483e-48,-4.6684147987757376e-41,1.3785187836242504e-41,-4.3923892481016256e-41,1.3803604623624394e-25,8.5040134978698364e-24,8.4000173550002777e-24,2.4368581366096195e-33,1.8213670080068172e-45,1.3778392876925494e-44,3.4631026519694487e-47,-3.8711693645595907e-49,-5.1283571726836175e-39,7.4405287814485688e-07,6.1435720578005753e-22,9.5114036956228558e-18,4.5688483980414093e-10,-6.5321363114393998e-38,1.2617485499731662e-45,-2.6286171833745198e-31,2.4140478435527883e-37,-5.8915836510730398e-38,3.3888688100740191e-48,-3.0923885763189364e-28,7.2665228540630592e-07,5.8993610457329667e-20,2.0776157383177941e-37,-2.2655044823874488e-31,6.4222246508046888e-24,1.5420067519077657e-33,-2.2946142101723704e-45,5.6306366529774552e-42,8.3217948570591228e-18,1.8252201219502477e-15,-1.9905542417065644e-31,-1.5113490034723377e-11,3.9268075017187726e-29,2.8188801635808583e-36,-1.7279528594745884e-45,1.2553777784711529e-33,4.9960218148518093e-41,-6.5804393755934932e-25,-5.9657951806496274e-19,-3.3571841456241975e-38,8.0211651082843874e-26,8.0754052085091632e-39,-2.9900686300208067e-14,-1.5680340763759361e-31,-1.4134641150275531e-40,-5.2147777556455839e-33,-4.8165994738458029e-37,-1.3661048074427527e-46,-1.018645867300337e-16,-1.7100768034973904e-47,1.5976897128188739e-15,8.9669601261056813e-49,8.879381198107e-34,-2.8113148176823652e-14,5.3263852267274371e-48,-2.7801228645237751e-14,1.6546435730106836e-36,1.6170707639906076e-36,-4.8261958771608883e-05,-3.537992094314656e-37,6.6776554912490925e-07,4.8151886884500315e-39,1.9103855130216285e-45,-1.0908776891626087e-31,1.9269831681168913e-32,-3.5299837829264437e-33,2.2719090933883993e-29,-2.9302556101838851e-37,-4.7078720685245964e-45,1.7541740040493487e-46,-1.4067637689617669e-28,-1.5951989303524861e-49,-5.2147537788889154e-36,1.2349971862340956e-44,1.3710267001062275e-42,5.7991116602276115e-18,1.71219304194464e-47,3.0322912339308001e-22,-6.3221880731132991e-27,-5.5702986818752641e-48,1.9517966323001989e-40,-3.7951363209182802e-25,4.0791240396759881e-50,-9.8946938877034656e-50,-1.3008466777941606e-08,-6.5931555609761392e-40,4.3567018297267692e-38,-4.1463490820043044e-48,4.1030802811696795e-31,1.5804316832214112e-29,-3.3979965689928652e-25,-2.2098925728288326e-45,-2.6471113079837278e-23,2.1366463761990663e-39,-2.0187251543871148e-44,4.9905157312978122e-18,-9.2822750443037775e-51,-2.279868386774232e-47,4.8802194880472783e-18,-4.7496858817129023e-27,5.1990034865932881e-45,4.772577176834112e-18,4.737274179898348e-18,1.1514696190250912e-15,-6.7117351848684674e-51,4.7380173449060235e-44,-1.3580527963320147e-45,1.1238919454698284e-15,2.9255205538134747e-31,1.1103789260051911e-15,-1.3808902777821051e-43,1.1228073721310724e-29,-5.2437384179425885e-35,2.3003417576518669e-38,3.3681176767307801e-46,-3.0521673279128037e-40,5.046999105908896e-28,5.9435652883348417e-07,-1.1867085092940034e-08,-6.7718964744811809e-29,-4.5518129270611599e-39,-1.4737168235022962e-30,4.1690013070990308e-49,-1.1814057153192658e-42,4.028431187403602e-18,3.1142648687315227e-43,-3.5917232687023358e-32,5.6736420407948434e-41,2.3728971099351808e-44,2.3031684523422083e-44,-4.376928514270143e-05,1.9627622498722643e-45,3.8900927316632049e-50,-1.1403442390445098e-08,-5.8920506932050419e-45,-3.0763130078226231e-32,-6.0139003849235911e-38,4.383871015519671e-41,3.6381009201349472e-18,2.229272116951893e-26,-3.002108552745075e-35,6.5242061746420165e-40,5.6822298094430997e-36,-7.0079655074003859e-50,-1.3612193725468017e-51,3.3867720462789027e-51,-4.1783617092636116e-48,2.2648459531152384e-42,-7.955400679951292e-51,-2.4149837773109312e-19,2.0897573178698852e-42,-7.7961050447806738e-42,-9.0231929417896759e-31,2.9119059499797849e-41,1.707819146288831e-50,1.8281413070288983e-42,1.1627546569448797e-34,1.7822332638992103e-26,-1.4812500750791592e-21,1.0987933918954132e-34,-7.9630284727102917e-31,7.7919018850248378e-46,1.0961496718659013e-43,7.3311733973805852e-46,-3.228163036551623e-38,-3.157884726054078e-38,-2.2515999032709412e-45,3.4850130622673034e-40,-5.3315976447235124e-52,9.8085792433306014e-51,-3.4725912123296475e-51,2.7974578349709936e-33,-6.1907940413490935e-37,2.831282341276511e-18,-2.9905200072475264e-51,-2.1876966754469112e-50,3.2372201023222221e-13,-1.4459069845235327e-46,5.2724320510124429e-07,0.0064079113387718383,-1.1660729975098903e-25,5.0515022374316336,4.7330373647186299e-39,1.3676274543525496e-41,-4.8385782839424423e-37,-1.3225800905188958e-32,-1.220243420984888e-49,1.2378929816652068e-41,-4.458861122442374e-37,4.7216414651494653e-51,-1.2173271584844888e-32,3.0269619998642709e-13,8.3566822148077333e-38,-7.8734106615609885e-12,4.5326646563370618e-44,-4.2114693390332164e-41,0.0063387911524195022,2.4482262333016191e-10,-7.6015985859459547e-47,2.432760903178634e-10,-1.2871663261444529e-14,2.1043623140581414e-47,4.9417955005988646e-35,-2.0498973050715129e-42,8.6570462309384646e-23,3.359834527478866e-44,-1.9575881285218376e-29,-5.9443680801868616e-50,-1.8069925757335534e-42,-1.2299878971400126e-14,-3.4781991459720792e-17,-5.4634238237380194e-40,7.5850706127810177e-25,-4.4638495901665379e-48,-1.4653945035073598e-19,-4.5311062566427203e-50,2.0965880379947819e-18,-8.2222092113119241e-53,8.5080899440125324e-27,0.0062476149264800362,1.1565692840643324e-49,-6.3251068896004747e-36,-1.9663327657921003e-34,1.786048494471771e-52,-2.9971459614666675e-31,7.8301043449552399e-27,-3.1468205060801817e-17,4.040918705375011e-38,1.4863123903191369e-52,1.6771405966857366e-39,-2.7402794636794012e-31,1.893042637901207e-30,7.6451862787116851e-49,2.3964669372839597e-43,7.2611213456177136e-41,9.0388599793050331e-37,-1.296269854959058e-29,-7.3467125475456827e-22,6.3931469556242325e-50,-5.4753506136951316e-33,7.4358046789748029e-47,-2.7889359587727088e-40,-1.3893063145351559e-34,-1.4796476511440254e-37,5.6514646066038488e-48,-2.2752585817247628e-46,-1.6027027177734257e-50,-1.5530914042114814e-48,-4.7404668030021917e-33,0.0061325586424390999,-6.7973594817123494e-28,-6.3359816273536475e-12,-2.1863220115086542e-40,5.1074961637688517e-47,4.058851258100336e-51,0.0061100540491861553,-3.3574337267331129e-44,5.9074795542593491e-46,1.2916690310577213e-30,7.6740098578166403e-21,-2.0300754663290673e-45,1.7091081278251236e-35,-1.2261207422804486e-52,-4.5618743835062619e-24,1.9066900464326443e-38,-1.2962551062050382e-46,-9.4322874192800876e-38,-2.5339114080724795e-44,-4.3427665514592783e-26,-1.202838001051442e-53,-8.0622989163282134e-09,-1.4986748460560996e-31,1.4347331445916679e-18,2.1241308149778783e-49,1.9290113778781026e-10,-2.3383592610929332e-36,-7.772413596172936e-35,-7.2899087193576549e-48,5.1117872713856407,-2.8074383511495583e-39,1.7036756048149765e-51,-5.4511548475062686e-52,1.2470806318731659e-42,1.5426429859907818e-51,5.1153995353087982,-7.4353628991879843e-47,0.0059963625958649397,-4.796716606869687e-22,-8.5010417762158461e-20,-9.3887856049860864e-46,3.8020515981893924e-34,-3.3839712132460829e-26,1.9570041084471501e-13,1.1503928551501827e-49,5.1213911291385363,0.0059641436218566511,-7.8098470702719501e-46,-7.9915928692916704e-15,4.5294488174797918e-29,2.7098379067428695e-37,1.3461962541466941e-47,2.681135167025185e-45,-2.0295093649554848e-33,4.2551203240333573e-29,-1.9677670059470061e-33,-3.5149954913894511e-05,4.1604687288313254e-07,3.365060339117141e-23,4.1456980637942669e-07,4.1383389457430648e-07,1.7321271409108144e-10,-1.4663403329520832e-39,-5.9606184029546709e-41,1.9746886837446493e-45,-3.8305345140895041e-22,-7.3373851747383127e-15,5.7341338041489026e-50,-2.7192361552277703e-24,-1.6199430787263973e-50,1.0873685517486053e-41,-1.6379273074509355e-53,2.4606333148105273e-25,5.9310787348072519e-36,1.7453363855099792e-37,4.628645123299153e-21,3.2811274356096612e-16,4.5586001058192364e-21,-1.4094856667040026e-49,-2.8894258411351738e-38,-2.8358160533379046e-38,-2.1807739069940296e-47,-9.1441304220826908e-44,2.9724164966733466e-29,2.6752448094572193e-23,-2.9646888022767471e-35,-1.11569498290782e-49,-1.6203625228928183e-42,3.6924259824684524e-49,2.5774728130261983e-52,4.1302303580548818e-21,3.0324077423891137e-16,4.3352386077611982e-48,9.5140010556091413e-46,0.0057979936298760823,1.4974186648491612e-40,-2.1894869993647729e-28,-1.0371215517389478e-33,-2.0544010602809004e-24,1.9588687692690352e-51,1.8642829631871774e-25,3.675789080858531e-31,-2.6245099639030636e-41,-1.4786326255440423e-17,2.3010496526114171e-29,-1.0899904020478447e-42,3.6615893466207484e-21,-1.0432800998490555e-42,-5.0024278992355749e-44,-1.8842256107821154e-28,3.7915501292679388e-07,-6.9820891986864129e-49,-2.5169978247029385e-30,-4.475211956146051e-55,-2.4542229388369756e-30,1.2362895328912608e-54,1.195183381291778e-54,1.4452379598202927e-13,3.1665453151821251e-47,-2.4687417362938754e-22,3.0076539375182107e-47,0.0057085396162474596,9.7610593688062497e-55,3.4899869816211907e-42,9.150225186598714e-52,-4.0960434971576196e-12,1.7655642176771095e-29,-3.4126903058446862e-32,-3.3663812340543929e-32,7.8683361908499786e-52,-2.0073067880285442e-30,2.0101119695887624e-39,-3.2181501580330637e-05,-1.9334519445014377e-30,6.8446446146011449e-41,-4.3436348211811047e-20,8.5370672258212912e-35,-5.716784794078558e-34,1.897360552487267e-47,-1.6847084004001614e-54,-6.1021857027900168e-09,1.3135214901175241e-13,1.7138186346935319e-47,-1.1676997704091242e-35,1.2161518350077637e-25,-1.6627184886620117e-51,1.5694931105322038e-23,-3.1640196569230161e-05,4.6695491280595073e-38,-1.0185053300257062e-45,1.9819882915900434e-42,3.7039734112691314e-55,1.3325880351768096e-10,1.1158537713181859e-25,1.2647538471751749e-47,-4.8724237525340497e-15,-3.0282080798147381e-48,3.678461895122821e-45,1.0639514677747358e-25,2.866828144948576e-53,5.9728530339396387e-19,1.5778260256959855e-42,-8.0192195155584258e-54,-8.4231448447508436e-53,-1.0460227275848491e-17,5.7922753771265453e-19,-6.8298312466755938e-46,-2.2827999411000938e-48,-1.0879445457504323e-24,1.0620208375826874e-29,2.7323893481607809e-45,2.5097928773219863e-33,-6.0676757889755639e-56,1.9941413633421954e-16,-9.1436016708994028e-51,3.2780090604201501e-50,-5.8160684447726011e-42,-2.3231927651367922e-43,-5.604859430478001e-09,6.7595888773486437e-48,4.1613526697142882e-49,2.7858600008179969e-50,-4.7661282239186099e-53,-5.543252175233002e-09,-1.0321163640590319e-30,1.2103074868304095e-54,1.2123642127044477e-10,-1.4437206535465518e-37,-3.578169505939814e-54,-1.3039785896814652e-48,-1.7690048788743245e-43,5.019406468921999e-48,1.5261726020615061e-51,-5.41395913028853e-51,6.9648136112623105e-28,1.7878325772712757e-16,-6.9232312279047337e-27,3.4113389451530195e-35,-4.9620903832301154e-36,7.2533007499760219e-43,1.001238948547209e-23,-2.400495851092492e-54,-2.2522248272000263e-56,-4.1178975915089938e-51,-5.8180521377308714e-45,-2.4112355825373413e-53,-1.9487131329196629e-55,1.6546146501084093e-41,-2.2075695464954363e-53,1.5927562606783901e-41,6.6147296657983275e-30,-2.4888197315695118e-52,-3.7885788971969799e-15,-2.9413463963600027e-05,-2.938155382964362e-05,-1.7977595173013959e-53,4.2395403480802882e-40,-1.0283934351027086e-32,-3.6912355499982925e-15,-2.9222779411792725e-05,-3.5491247577472005e-36,2.4053272677424441e-48,-9.119187909407523e-44,1.5587739497726982e-16,6.2779076663151048e-52,-3.5812068594002601e-15,3.7916240944635944e-54,-2.1332566969748558e-42,-8.9173999982713357e-33,7.9079144571676347e-24,3.5395016562535049e-47,4.7546531858804636e-28,3.174684810367084e-54,-8.3601382215643142e-33,9.1783292658676605e-14,-8.1475044239719008e-33,-8.3102154630391142e-55,6.4489960914529852e-32,3.7352074568588554e-19,3.2564439797749858e-43,4.3380052176535385e-28,-6.8696313697490783e-18,3.0687402701854504e-43,3.6269230029538286e-19,2.5635779991503394e-47,1.0331646298050245e-10,2.1023523374303157e-54,4.0405873019458644e-28,6.788693855933768e-24,-2.9286520449878576e-49,3.9197663170759372e-28,-8.909714763997499e-23,-4.5914254104695421e-31,1.1118770653051334e-48,1.2633580999756313e-21,-8.9498329313414881e-47,7.9195394786637442e-34,-9.637038887654065e-52,-4.5692026241085402e-38,-9.1396871827095295e-52,2.8862881687590966e-37,4.1040061979851851e-26,-3.2791441680318211e-41,-3.6180432454522905e-27,-8.0076869917697187e-52,6.4695819064954441e-39,1.1632206635991043e-21,3.3032720087078091e-28,-6.7049822833753851e-47,-7.0183380892771096e-52,2.6522372832683499e-51,2.5847022445440469e-51,-6.4854925144898213e-52,1.553418108544957e-40,7.9101274927169524e-14,-4.3124352485172693e-25,1.2092053323093456e-16,2.5579323226581545e-46,-7.75983034426919e-35,-7.2440237940842678e-23,2.9011004295154675e-28,1.0129347019996064e-35,-7.3484188255156639e-35,3.6834319078386894e-32,1.23619134841851e-52,-7.5582077340882536e-40,-4.2627792688182052e-33,-1.4803211818085525e-57,-3.8676025752180486e-25,-1.1109022170497049e-49,8.9219891739518393e-36,4.2556281314246114e-57,-2.7514843293143029e-27,-6.5393007951056376e-23,-5.9517559061864114e-43,-6.3974088980676372e-40,3.6503290997784651e-57,2.7909264245362177e-07,4.576477629338311e-24,-8.7457979800421387e-50,8.9404083732113566e-11,-5.2220505738209472e-43,-5.6955723402777064e-40,-1.9691974427735147e-53,3.449330144266671e-45,-8.4475734670273101e-58,-3.3304489448399315e-25,-1.0257672855607285e-55,-2.2582369522169015e-12,-3.2008127680005744e-33,2.7134140370400449e-56,5.2688623415853133,2.6099555523180768e-26,-4.7489860335450085e-40,-4.101023450989183e-43,-1.3536254264746392e-20,6.7892082012685709e-14,8.2362619647321769e-22,-5.6518027097939469e-58,1.9755735347829241e-28,1.9530269853457737e-30,8.4692667268854225e-11,-2.0628657763975023e-47,2.14992911833887e-49,9.4227487510609862e-47,2.0531119256786339e-49,2.2185576299571965e-45,6.1672951356790572e-41,-3.7125958997341141e-40,-1.7375233175736778e-29,2.2309233971208641e-26,-1.4070917321126064e-52,5.2796288645874139,5.574463042928185e-41,2.1548924594770493e-26,-3.7902781056618322e-57,5.0043246500868394e-44,-5.6559385769008512e-55,-2.6361617216154136e-43,1.593068075497579e-30,1.9412294892903568e-39,4.8740400055244683e-41,1.6144638856951762e-45,1.5265713506093907e-30,-2.5501481632462518e-58,4.2259239422650406e-44,4.4829406019654074e-41,-1.5591861530579656e-51,-1.4323692898130747e-29,1.185384012729987e-49,-2.7137702260549637e-46,5.9924043389069451e-14,-2.5124284134451427e-50,-8.0532376222402576e-53,-1.9616071313044593e-12,0.0050352589298074141,8.3505335309903035e-17,2.1480128981959883e-34,2.8823635840151475e-52,-4.2732185522421179e-49,-1.7664075830536123e-43,4.7094868264717926e-51,-2.5175815180603865e-05,-1.3006638551566336e-31,2.5188124992187761e-07]}
},{}],157:[function(require,module,exports){
module.exports={"n":[45,19,54,47,14,19,7,39,13,47,21,59,17,31,56,4,3,52,36,21,9,17,51,33,10,21,30,36,60,12,21,21,2,13,13,18,24,21,20,4,14,11,57,21,41,29,58,45,26,50,57,19,0,48,37,58,48,3,14,4,56,6,46,34,50,32,34,58,48,12,20,44,13,44,19,5,35,15,50,27,17,41,24,54,52,0,37,45,60,59,12,13,50,58,41,57,15,15,29,49,24,14,36,53,48,51,6,46,50,59,51,16,21,41,26,9,34,46,42,5,45,54,46,47,23,33,26,9,58,6,34,7,51,33,16,30,37,43,35,33,58,29,5,33,30,5,31,19,5,58,55,30,53,60,26,42,47,1,9,4,37,32,15,6,27,10,51,52,11,25,18,27,29,50,20,1,48,53,60,46,9,26,14,19,42,21,22,30,59,47,59,36,39,43,52,6,24,36,38,58,60,17,34,18,56,50,43,29,29,60,38,23,54,26,12,4,24,1,60,53,24,53,40,59,54,12,60,32,39,36,6,59,2,9,37,48,34,42,58,48,45,58,40,30,31,38,15,59,58,45,32,34,1,34,42,15,31,56,3,3,54,3,20,47,14,54,6,51,18,11,13,17,39,27,4,37,16,1,17,60,53,53,27,13,46,53,36,53,47,32,6,28,59,22,51,47,3,51,28,56,19,41,38,3,14,31,35,37,36,58,36,19,27,16,2,25,31,47,24,57,6,33,28,4,27,48,33,41,49,33,42,26,53,37,3,7,13,30,28,17,58,29,48,50,27,22,20,38,3,36,45,25,30,35,12,43,26,51,10,57,45,8,22,4,57,40,1,25,50,28,38,2,32,14,39,52,44,56,5,22,53,37,0,20,17,56,10,13,56,8,4,19,35,46,38,29,39,2,52,6,3,22,49,32,32,43,42,41,12,36,33,3,42,48,58,15,27,6,5,50,3,19,38,8,48,23,42,18,21,44,57,54,31,38,58,10,4,1,12,42,47,20,55,20,47,59,18,21,9,52,51,51,47,1,16,54,13,13,19,50,50,37,50,9,34,36,34,35,17,42,42,54,48,3,26,50,27,36,28,28,17,45,41,47,55,36,55,59,45,12,15,36,42,2,8,24,7,7,11,14,8,17,35,50,4,22,50,13,44,38,56,19,30,25,39,44,54,51,32,4,17,1,59,41,2,57,19,22,59,55,22,37,18,28,7,33,55,10,8,58,20,53,54,5,30,46,37,57,35,6,42,36,1,24,32,60,1,35,50,18,20,11,51,10,15,13,35,45,57,18,2,49,3,47,1,42,41,52,36,46,6,9,48,55,37,3,4,40,4,18,8,42,48,34,5,5,14,50,14,16,6,13,52,18,42,18,44,3,39,24,31,22,19,57,40,35,7,14,9,29,1,15,58,10,59,13,7,52,28,51,40,6,17,27,46,29,34,49,26,14,16,18,45,23,54,14,44,12,24,21,57,13,15,40,32,49,58,30,16,1,15,35,56,51,4,0,18,39,36,53,12,24,38,13,48,6,30,23,39,14,48,45,14,56,36,12,6,55,31,9,51,58,56,15,30,43,16,5,39,36,55,20,31,5,59,36,12,23,6,55,18,40,24,10,25,52,18,50,42,60,5,44,24,55,18,52,18,19,6,8,36,55,17,53,9,18,0,52,17,33,33,12,53,27,2,45,55,50,7,18,50,11,48,37,55,31,8,5,30,55,24,8,10,10,35,39,36,35,13,3,31,60,60,57,29,0,42,39,25,56,2,2,17,7,48,10,21,56,5,50,31,53,22,33,45,2,32,36,49,18,49,26,11,48,7,45,50,6,38,15,0,11,54,31,31,14,33,25,36,21,46,27,52,48,23,15,5,47,44,48,20,57,51,40,22,51,50,51,10,20,7,29,53,20,2,28,41,39,44,10,26,16,23,26,59,48,24,40,26,32,9,24,19,52,19,31,54,49,15,6,18,39,24,54,43,36,8,40,53,8,5,32,28,36,1,43,45,13,42,37,13,18,41,8,33,26,51,34,34,15,55,21,25,5,21,51,29,36,15,1,56,12,28,8,15,36,26,16,42,58,24,48,11,13,52,24,35,3,22,26,13,23,13,56,31,60,26,52,45,4,4,35,51,42,41,24,8,48,52,28,12,11,37,25,33,55,9,22,0,58,47,38,46,12,25,49,3,4,35,53,10,13,44,27,32,49,15,45,55,12,46,9,54,33,4,13,11,26,44,4,42,35,47,29,30,36,25,32,37,58],"x":[-0.01,-0.10998998998998999,-0.20997997997998,-0.30996996996997001,-0.40995995995995999,-0.50994994994994991,-0.60993993993994,-0.70992992992992998,-0.80991991991991996,-0.90990990990990994,-1.0098998998998998,-1.1098898898898899,-1.20987987987988,-1.3098698698698699,-1.40985985985986,-1.5098498498498498,-1.6098398398398399,-1.70982982982983,-1.8098198198198199,-1.90980980980981,-2.0097997997997998,-2.1097897897897897,-2.2097797797797796,-2.3097697697697694,-2.4097597597597598,-2.5097497497497496,-2.6097397397397395,-2.7097297297297298,-2.8097197197197197,-2.9097097097097095,-3.0096996996996994,-3.1096896896896897,-3.2096796796796796,-3.3096696696696695,-3.4096596596596598,-3.5096496496496496,-3.6096396396396395,-3.7096296296296294,-3.8096196196196197,-3.9096096096096096,-4.0095995995995999,-4.1095895895895893,-4.2095795795795796,-4.3095695695695699,-4.4095595595595594,-4.5095495495495497,-4.6095395395395391,-4.7095295295295294,-4.8095195195195197,-4.9095095095095092,-5.0094994994994995,-5.1094894894894898,-5.2094794794794792,-5.3094694694694695,-5.4094594594594598,-5.5094494494494493,-5.6094394394394396,-5.7094294294294299,-5.8094194194194193,-5.9094094094094096,-6.009399399399399,-6.1093893893893894,-6.2093793793793797,-6.3093693693693691,-6.4093593593593594,-6.5093493493493497,-6.6093393393393391,-6.7093293293293295,-6.8093193193193198,-6.9093093093093092,-7.0092992992992995,-7.1092892892892889,-7.2092792792792793,-7.3092692692692696,-7.409259259259259,-7.5092492492492493,-7.6092392392392396,-7.709229229229229,-7.8092192192192194,-7.9092092092092097,-8.0091991991992,-8.1091891891891894,-8.2091791791791788,-8.30916916916917,-8.4091591591591595,-8.5091491491491489,-8.6091391391391401,-8.7091291291291295,-8.8091191191191189,-8.9091091091091101,-9.0090990990990996,-9.109089089089089,-9.2090790790790784,-9.3090690690690696,-9.409059059059059,-9.5090490490490485,-9.6090390390390397,-9.7090290290290291,-9.8090190190190185,-9.9090090090090097,-10.008998998998999,-10.108988988988989,-10.20897897897898,-10.308968968968969,-10.408958958958959,-10.50894894894895,-10.608938938938939,-10.708928928928929,-10.80891891891892,-10.908908908908909,-11.008898898898899,-11.10888888888889,-11.208878878878879,-11.308868868868869,-11.40885885885886,-11.508848848848849,-11.608838838838839,-11.708828828828828,-11.808818818818819,-11.908808808808809,-12.008798798798798,-12.10878878878879,-12.208778778778779,-12.308768768768768,-12.40875875875876,-12.508748748748749,-12.608738738738738,-12.70872872872873,-12.808718718718719,-12.908708708708708,-13.0086986986987,-13.108688688688689,-13.208678678678679,-13.30866866866867,-13.408658658658659,-13.508648648648649,-13.60863863863864,-13.708628628628629,-13.808618618618619,-13.90860860860861,-14.008598598598599,-14.108588588588589,-14.208578578578578,-14.308568568568569,-14.408558558558559,-14.508548548548548,-14.608538538538539,-14.708528528528529,-14.808518518518518,-14.908508508508509,-15.008498498498499,-15.108488488488488,-15.208478478478479,-15.308468468468469,-15.408458458458458,-15.508448448448449,-15.608438438438439,-15.708428428428428,-15.80841841841842,-15.908408408408409,-16.008398398398398,-16.108388388388391,-16.208378378378381,-16.30836836836837,-16.40835835835836,-16.508348348348349,-16.608338338338342,-16.708328328328331,-16.808318318318321,-16.90830830830831,-17.0082982982983,-17.108288288288289,-17.208278278278282,-17.308268268268272,-17.408258258258261,-17.50824824824825,-17.60823823823824,-17.708228228228229,-17.808218218218222,-17.908208208208212,-18.008198198198201,-18.108188188188191,-18.20817817817818,-18.308168168168169,-18.408158158158159,-18.508148148148152,-18.608138138138141,-18.708128128128131,-18.80811811811812,-18.908108108108109,-19.008098098098099,-19.108088088088092,-19.208078078078081,-19.308068068068071,-19.40805805805806,-19.50804804804805,-19.608038038038039,-19.708028028028032,-19.808018018018021,-19.908008008008011,-20.007997997998,-20.10798798798799,-20.207977977977979,-20.307967967967972,-20.407957957957962,-20.507947947947951,-20.60793793793794,-20.70792792792793,-20.807917917917919,-20.907907907907909,-21.007897897897902,-21.107887887887891,-21.20787787787788,-21.30786786786787,-21.407857857857859,-21.507847847847849,-21.607837837837842,-21.707827827827831,-21.807817817817821,-21.90780780780781,-22.007797797797799,-22.107787787787789,-22.207777777777782,-22.307767767767771,-22.407757757757761,-22.50774774774775,-22.60773773773774,-22.707727727727729,-22.807717717717722,-22.907707707707711,-23.007697697697701,-23.10768768768769,-23.20767767767768,-23.307667667667669,-23.407657657657658,-23.507647647647651,-23.607637637637641,-23.70762762762763,-23.80761761761762,-23.907607607607609,-24.007597597597599,-24.107587587587592,-24.207577577577581,-24.30756756756757,-24.40755755755756,-24.507547547547549,-24.607537537537539,-24.707527527527532,-24.807517517517521,-24.907507507507511,-25.0074974974975,-25.107487487487489,-25.207477477477479,-25.307467467467472,-25.407457457457461,-25.507447447447451,-25.60743743743744,-25.707427427427429,-25.807417417417419,-25.907407407407408,-26.007397397397401,-26.107387387387391,-26.20737737737738,-26.30736736736737,-26.407357357357359,-26.507347347347348,-26.607337337337341,-26.707327327327331,-26.80731731731732,-26.90730730730731,-27.007297297297299,-27.107287287287289,-27.207277277277282,-27.307267267267271,-27.40725725725726,-27.50724724724725,-27.607237237237239,-27.707227227227229,-27.807217217217222,-27.907207207207211,-28.0071971971972,-28.10718718718719,-28.207177177177179,-28.307167167167169,-28.407157157157158,-28.507147147147151,-28.607137137137141,-28.70712712712713,-28.807117117117119,-28.907107107107109,-29.007097097097098,-29.107087087087091,-29.207077077077081,-29.30706706706707,-29.40705705705706,-29.507047047047049,-29.607037037037038,-29.707027027027031,-29.807017017017021,-29.90700700700701,-30.006996996997,-30.106986986986989,-30.206976976976978,-30.306966966966971,-30.406956956956961,-30.50694694694695,-30.60693693693694,-30.706926926926929,-30.806916916916919,-30.906906906906908,-31.006896896896901,-31.10688688688689,-31.20687687687688,-31.306866866866869,-31.406856856856859,-31.506846846846848,-31.606836836836841,-31.706826826826831,-31.80681681681682,-31.906806806806809,-32.006796796796799,-32.106786786786785,-32.206776776776778,-32.306766766766764,-32.406756756756756,-32.506746746746749,-32.606736736736735,-32.706726726726728,-32.806716716716714,-32.906706706706707,-33.006696696696693,-33.106686686686686,-33.206676676676679,-33.306666666666665,-33.406656656656658,-33.506646646646644,-33.606636636636637,-33.706626626626623,-33.806616616616616,-33.906606606606609,-34.006596596596594,-34.106586586586587,-34.206576576576573,-34.306566566566566,-34.406556556556559,-34.506546546546545,-34.606536536536538,-34.706526526526524,-34.806516516516517,-34.906506506506503,-35.006496496496496,-35.106486486486489,-35.206476476476475,-35.306466466466468,-35.406456456456453,-35.506446446446446,-35.606436436436439,-35.706426426426425,-35.806416416416418,-35.906406406406404,-36.006396396396397,-36.106386386386383,-36.206376376376376,-36.306366366366369,-36.406356356356355,-36.506346346346348,-36.606336336336334,-36.706326326326327,-36.806316316316313,-36.906306306306305,-37.006296296296298,-37.106286286286284,-37.206276276276277,-37.306266266266263,-37.406256256256256,-37.506246246246249,-37.606236236236235,-37.706226226226228,-37.806216216216214,-37.906206206206207,-38.006196196196193,-38.106186186186186,-38.206176176176179,-38.306166166166165,-38.406156156156158,-38.506146146146143,-38.606136136136136,-38.706126126126122,-38.806116116116115,-38.906106106106108,-39.006096096096094,-39.106086086086087,-39.206076076076073,-39.306066066066066,-39.406056056056059,-39.506046046046045,-39.606036036036038,-39.706026026026024,-39.806016016016017,-39.906006006006002,-40.005995995995995,-40.105985985985988,-40.205975975975974,-40.305965965965967,-40.405955955955953,-40.505945945945946,-40.605935935935939,-40.705925925925925,-40.805915915915918,-40.905905905905904,-41.005895895895897,-41.105885885885883,-41.205875875875876,-41.305865865865869,-41.405855855855854,-41.505845845845847,-41.605835835835833,-41.705825825825826,-41.805815815815812,-41.905805805805805,-42.005795795795798,-42.105785785785784,-42.205775775775777,-42.305765765765763,-42.405755755755756,-42.505745745745749,-42.605735735735735,-42.705725725725728,-42.805715715715714,-42.905705705705707,-43.005695695695692,-43.105685685685685,-43.205675675675678,-43.305665665665664,-43.405655655655657,-43.505645645645643,-43.605635635635636,-43.705625625625622,-43.805615615615615,-43.905605605605608,-44.005595595595594,-44.105585585585587,-44.205575575575573,-44.305565565565566,-44.405555555555559,-44.505545545545544,-44.605535535535537,-44.705525525525523,-44.805515515515516,-44.905505505505502,-45.005495495495495,-45.105485485485488,-45.205475475475474,-45.305465465465467,-45.405455455455453,-45.505445445445446,-45.605435435435439,-45.705425425425425,-45.805415415415418,-45.905405405405403,-46.005395395395396,-46.105385385385382,-46.205375375375375,-46.305365365365368,-46.405355355355354,-46.505345345345347,-46.605335335335333,-46.705325325325326,-46.805315315315312,-46.905305305305305,-47.005295295295298,-47.105285285285284,-47.205275275275277,-47.305265265265263,-47.405255255255256,-47.505245245245248,-47.605235235235234,-47.705225225225227,-47.805215215215213,-47.905205205205206,-48.005195195195192,-48.105185185185185,-48.205175175175178,-48.305165165165164,-48.405155155155157,-48.505145145145143,-48.605135135135136,-48.705125125125122,-48.805115115115115,-48.905105105105108,-49.005095095095093,-49.105085085085086,-49.205075075075072,-49.305065065065065,-49.405055055055058,-49.505045045045044,-49.605035035035037,-49.705025025025023,-49.805015015015016,-49.905005005005002,-50.004994994994995,-50.104984984984988,-50.204974974974974,-50.304964964964967,-50.404954954954952,-50.504944944944945,-50.604934934934938,-50.704924924924924,-50.804914914914917,-50.904904904904903,-51.004894894894896,-51.104884884884882,-51.204874874874875,-51.304864864864868,-51.404854854854854,-51.504844844844847,-51.604834834834833,-51.704824824824826,-51.804814814814812,-51.904804804804805,-52.004794794794797,-52.104784784784783,-52.204774774774776,-52.304764764764762,-52.404754754754755,-52.504744744744748,-52.604734734734734,-52.704724724724727,-52.804714714714713,-52.904704704704706,-53.004694694694692,-53.104684684684685,-53.204674674674678,-53.304664664664664,-53.404654654654657,-53.504644644644642,-53.604634634634635,-53.704624624624628,-53.804614614614614,-53.904604604604607,-54.004594594594593,-54.104584584584586,-54.204574574574572,-54.304564564564565,-54.404554554554558,-54.504544544544544,-54.604534534534537,-54.704524524524523,-54.804514514514516,-54.904504504504501,-55.004494494494494,-55.104484484484487,-55.204474474474473,-55.304464464464466,-55.404454454454452,-55.504444444444445,-55.604434434434438,-55.704424424424424,-55.804414414414417,-55.904404404404403,-56.004394394394396,-56.104384384384382,-56.204374374374375,-56.304364364364368,-56.404354354354354,-56.504344344344346,-56.604334334334332,-56.704324324324325,-56.804314314314311,-56.904304304304304,-57.004294294294297,-57.104284284284283,-57.204274274274276,-57.304264264264262,-57.404254254254255,-57.504244244244248,-57.604234234234234,-57.704224224224227,-57.804214214214213,-57.904204204204206,-58.004194194194191,-58.104184184184184,-58.204174174174177,-58.304164164164163,-58.404154154154156,-58.504144144144142,-58.604134134134135,-58.704124124124128,-58.804114114114114,-58.904104104104107,-59.004094094094093,-59.104084084084086,-59.204074074074072,-59.304064064064065,-59.404054054054058,-59.504044044044043,-59.604034034034036,-59.704024024024022,-59.804014014014015,-59.904004004004001,-60.003993993993994,-60.103983983983987,-60.203973973973973,-60.303963963963966,-60.403953953953952,-60.503943943943945,-60.603933933933938,-60.703923923923924,-60.803913913913917,-60.903903903903903,-61.003893893893895,-61.103883883883881,-61.203873873873874,-61.303863863863867,-61.403853853853853,-61.503843843843846,-61.603833833833832,-61.703823823823825,-61.803813813813811,-61.903803803803804,-62.003793793793797,-62.103783783783783,-62.203773773773776,-62.303763763763762,-62.403753753753755,-62.503743743743748,-62.603733733733733,-62.703723723723726,-62.803713713713712,-62.903703703703705,-63.003693693693691,-63.103683683683684,-63.203673673673677,-63.303663663663663,-63.403653653653656,-63.503643643643642,-63.603633633633635,-63.703623623623628,-63.803613613613614,-63.903603603603607,-64.003593593593592,-64.103583583583585,-64.203573573573578,-64.303563563563571,-64.403553553553564,-64.503543543543557,-64.603533533533536,-64.703523523523529,-64.803513513513522,-64.903503503503515,-65.003493493493508,-65.103483483483487,-65.20347347347348,-65.303463463463473,-65.403453453453466,-65.503443443443444,-65.603433433433437,-65.70342342342343,-65.803413413413423,-65.903403403403416,-66.003393393393395,-66.103383383383388,-66.203373373373381,-66.303363363363374,-66.403353353353367,-66.503343343343346,-66.603333333333339,-66.703323323323332,-66.803313313313325,-66.903303303303318,-67.003293293293297,-67.10328328328329,-67.203273273273282,-67.303263263263275,-67.403253253253254,-67.503243243243247,-67.60323323323324,-67.703223223223233,-67.803213213213226,-67.903203203203205,-68.003193193193198,-68.103183183183191,-68.203173173173184,-68.303163163163177,-68.403153153153156,-68.503143143143149,-68.603133133133142,-68.703123123123135,-68.803113113113127,-68.903103103103106,-69.003093093093099,-69.103083083083092,-69.203073073073085,-69.303063063063064,-69.403053053053057,-69.50304304304305,-69.603033033033043,-69.703023023023036,-69.803013013013015,-69.903003003003008,-70.002992992993001,-70.102982982982994,-70.202972972972987,-70.302962962962965,-70.402952952952958,-70.502942942942951,-70.602932932932944,-70.702922922922937,-70.802912912912916,-70.902902902902909,-71.002892892892902,-71.102882882882895,-71.202872872872888,-71.302862862862867,-71.40285285285286,-71.502842842842853,-71.602832832832846,-71.702822822822824,-71.802812812812817,-71.90280280280281,-72.002792792792803,-72.102782782782796,-72.202772772772775,-72.302762762762768,-72.402752752752761,-72.502742742742754,-72.602732732732747,-72.702722722722726,-72.802712712712719,-72.902702702702712,-73.002692692692705,-73.102682682682698,-73.202672672672676,-73.302662662662669,-73.402652652652662,-73.502642642642655,-73.602632632632634,-73.702622622622627,-73.80261261261262,-73.902602602602613,-74.002592592592606,-74.102582582582585,-74.202572572572578,-74.302562562562571,-74.402552552552564,-74.502542542542557,-74.602532532532535,-74.702522522522528,-74.802512512512521,-74.902502502502514,-75.002492492492507,-75.102482482482486,-75.202472472472479,-75.302462462462472,-75.402452452452465,-75.502442442442444,-75.602432432432437,-75.70242242242243,-75.802412412412423,-75.902402402402416,-76.002392392392395,-76.102382382382388,-76.20237237237238,-76.302362362362373,-76.402352352352366,-76.502342342342345,-76.602332332332338,-76.702322322322331,-76.802312312312324,-76.902302302302317,-77.002292292292296,-77.102282282282289,-77.202272272272282,-77.302262262262275,-77.402252252252254,-77.502242242242247,-77.60223223223224,-77.702222222222233,-77.802212212212225,-77.902202202202204,-78.002192192192197,-78.10218218218219,-78.202172172172183,-78.302162162162176,-78.402152152152155,-78.502142142142148,-78.602132132132141,-78.702122122122134,-78.802112112112127,-78.902102102102106,-79.002092092092099,-79.102082082082092,-79.202072072072085,-79.302062062062078,-79.402052052052056,-79.502042042042049,-79.602032032032042,-79.702022022022035,-79.802012012012014,-79.902002002002007,-80.001991991992,-80.101981981981993,-80.201971971971986,-80.301961961961965,-80.401951951951958,-80.501941941941951,-80.601931931931944,-80.701921921921937,-80.801911911911915,-80.901901901901908,-81.001891891891901,-81.101881881881894,-81.201871871871887,-81.301861861861866,-81.401851851851859,-81.501841841841852,-81.601831831831845,-81.701821821821824,-81.801811811811817,-81.90180180180181,-82.001791791791803,-82.101781781781796,-82.201771771771774,-82.301761761761767,-82.40175175175176,-82.501741741741753,-82.601731731731746,-82.701721721721725,-82.801711711711718,-82.901701701701711,-83.001691691691704,-83.101681681681697,-83.201671671671676,-83.301661661661669,-83.401651651651662,-83.501641641641655,-83.601631631631633,-83.701621621621626,-83.801611611611619,-83.901601601601612,-84.001591591591605,-84.101581581581584,-84.201571571571577,-84.30156156156157,-84.401551551551563,-84.501541541541556,-84.601531531531535,-84.701521521521528,-84.801511511511521,-84.901501501501514,-85.001491491491507,-85.101481481481486,-85.201471471471478,-85.301461461461471,-85.401451451451464,-85.501441441441443,-85.601431431431436,-85.701421421421429,-85.801411411411422,-85.901401401401415,-86.001391391391394,-86.101381381381387,-86.20137137137138,-86.301361361361373,-86.401351351351366,-86.501341341341345,-86.601331331331338,-86.701321321321331,-86.801311311311323,-86.901301301301316,-87.001291291291295,-87.101281281281288,-87.201271271271281,-87.301261261261274,-87.401251251251253,-87.501241241241246,-87.601231231231239,-87.701221221221232,-87.801211211211225,-87.901201201201204,-88.001191191191197,-88.10118118118119,-88.201171171171183,-88.301161161161176,-88.401151151151154,-88.501141141141147,-88.60113113113114,-88.701121121121133,-88.801111111111126,-88.901101101101105,-89.001091091091098,-89.101081081081091,-89.201071071071084,-89.301061061061077,-89.401051051051056,-89.501041041041049,-89.601031031031042,-89.701021021021035,-89.801011011011013,-89.901001001001006,-90.000990990990999,-90.100980980980992,-90.200970970970985,-90.300960960960964,-90.400950950950957,-90.50094094094095,-90.600930930930943,-90.700920920920936,-90.800910910910915,-90.900900900900908,-91.000890890890901,-91.100880880880894,-91.200870870870887,-91.300860860860865,-91.400850850850858,-91.500840840840851,-91.600830830830844,-91.700820820820823,-91.800810810810816,-91.900800800800809,-92.000790790790802,-92.100780780780795,-92.200770770770774,-92.300760760760767,-92.40075075075076,-92.500740740740753,-92.600730730730746,-92.700720720720724,-92.800710710710717,-92.90070070070071,-93.000690690690703,-93.100680680680696,-93.200670670670675,-93.300660660660668,-93.400650650650661,-93.500640640640654,-93.600630630630633,-93.700620620620626,-93.800610610610619,-93.900600600600612,-94.000590590590605,-94.100580580580584,-94.200570570570576,-94.300560560560569,-94.400550550550562,-94.500540540540555,-94.600530530530534,-94.700520520520527,-94.80051051051052,-94.900500500500513,-95.000490490490506,-95.100480480480485,-95.200470470470478,-95.300460460460471,-95.400450450450464,-95.500440440440443,-95.600430430430436,-95.700420420420429,-95.800410410410421,-95.900400400400414,-96.000390390390393,-96.100380380380386,-96.200370370370379,-96.300360360360372,-96.400350350350365,-96.500340340340344,-96.600330330330337,-96.70032032032033,-96.800310310310323,-96.900300300300316,-97.000290290290295,-97.100280280280288,-97.200270270270281,-97.300260260260274,-97.400250250250252,-97.500240240240245,-97.600230230230238,-97.700220220220231,-97.800210210210224,-97.900200200200203,-98.000190190190196,-98.100180180180189,-98.200170170170182,-98.300160160160175,-98.400150150150154,-98.500140140140147,-98.60013013013014,-98.700120120120133,-98.800110110110126,-98.900100100100104,-99.000090090090097,-99.10008008008009,-99.200070070070083,-99.300060060060076,-99.400050050050055,-99.500040040040048,-99.600030030030041,-99.700020020020034,-99.800010010010013,-99.900000000000006],"y":[1.1962222086548008e+148,1.8114709374156069e+36,4.4008247340669367e+108,6.7503413048929499e+83,55903516113450704,2.7668046659260198e+23,9668904.8690666277,6.448642221038093e+67,7.747611396361678e+19,3.8740973752537375e+109,6.3747952071428886e+63,4.8368130972537e+137,5.6963149010749705e+26,1.5750073193953144e+50,8.5438116557060167e+96,-152.23238284045266,305.07024368987851,-2.4324945613458824e+96,-1.7434951027636852e+68,4.9526683972241452e+42,4.4421272687629458e+25,6.6214537690967431e+31,2.8769779933296837e+101,1.7512920080780197e+54,65167329509.689568,4.7060157602319307e+26,-1.2350240732711175e+45,-2.7979537357682345e+61,-7.5362295681563933e+125,-1.8071879535355496e+22,9.9922101083767849e+63,6.678764628264908e+40,213.74388234816925,83503509263582848,1670919540790663.5,-2.5264960131238939e+21,-1.0140436251300862e+34,3.3372853754749341e+31,-3.2663191908559854e+33,-3977382.72382404,1.6092057210170386e+41,1.3302219562558398e+19,9.3218827105115211e+115,8.1594733427433141e+30,6.4137524161026458e+65,2.2313111586022284e+40,-2.9384947803517437e+102,5.9582731157313324e+80,-1.121130386856146e+46,-4.9696387196403257e+117,7.9634560972391176e+193,1.9844767036374866e+36,5.8072207069305026,1.1314518542726846e+86,7.4941560617329671e+57,-3.7277025957250182e+96,-1.262344531912211e+81,868.69387830923381,-5.4856572298213007e+21,-3933627.2382024117,2.4275199505652673e+190,3841545357.7176695,4.5360309415622468e+89,2.0112158486841773e+56,1.8438854181408045e+84,-2.9874348733842801e+45,-5.7170991171667793e+52,-1.0727537442226147e+110,-2.2849715803960465e+96,-1.7061677993539962e+22,1.1185872782231325e+61,4.8821067228397589e+97,2.0142486711589605e+19,2.2879407733091397e+77,7.0049650313366371e+24,15492.848665367746,5.0750301386947418e+54,5.0082722022780358e+20,-1.4990259779791825e+101,1.6285924743609001e+57,1.5979680741201174e+51,8.3345854022213699e+89,6.0220493186034105e+40,2.5265516623701339e+99,2.994730089929008e+88,2.1084295346169659,4.3842356964623456e+58,5.5924386140820695e+80,-6.218227220456766e+125,4.2736798119367341e+142,1.6343980261649307e+35,1.8422217336650483e+23,1.4035741732726073e+99,2.8700832193313823e+108,6.7517503929059932e+65,3.7819998571268428e+94,4.3926463535203569e+18,4.9534214384796054e+20,3.2872688681219176e+52,6.8262960349917061e+114,8.666636518200582e+74,2.3970052902219286e+25,5.3301427283026324e+66,1.4980338471085878e+97,1.3231289684834238e+80,2.0644385538911482e+82,-491634.19390287745,-8.562776833045998e+82,-1.3834793979744407e+101,3.74515117832123e+142,6.6858844395537207e+172,4.9192508289277795e+29,4.6845113933835764e+34,8.993218482072186e+70,1.2391282627719239e+37,756045506.74537909,-5.466559620990722e+52,-8.4255090021432241e+82,-1.1105475899438346e+82,208672161.09333998,4.3085988988438858e+150,2.2448650474781892e+124,5.1917181325430028e+89,8.1332848273978188e+83,5.461934073633529e+31,3.5458236646272274e+47,-4.0645382214145644e+37,82574579612.704407,-5.6558219292158018e+120,-13624702032.624489,3.883868491592703e+110,258794932864.93738,3.7825526657679289e+101,1.9766921095297688e+54,8.4464582462910988e+19,-6.4363209319088574e+41,4.1761389971015516e+58,2.2155626634218013e+76,7.3425005766517944e+65,1.8531298448648261e+72,1.7375556647698243e+200,7.4647139707334805e+59,1457879.1558781953,1.9986114361777143e+54,2.9838146392898697e+44,15476.694994267038,8.8914720845112076e+46,6.2111720602252742e+27,2435036.9833568321,-4.4638525895988161e+139,1.1495222930978404e+189,2.1221039950536896e+62,2.5212615827688091e+106,1.1976155851737127e+113,1.2723487195006277e+37,-1.9703707065120364e+64,9.0837477077506417e+78,15.626252142109935,5447857491646.3174,-3723320.729017016,1.0453721223301258e+122,1.8439141806873991e+67,1.034801733584959e+23,2706044.4308702094,8.4690691708097168e+38,-2749746977.0954838,2.2870192414342222e+87,-1.8503466706106276e+96,16225138056618730,1.4793333816019358e+52,2.2158951967535133e+55,1.1713888944867953e+55,2.4390429714103621e+51,3.529432765885167e+90,3.6000714481006924e+26,9.8207186041775536,-1.0859970101914536e+81,3.3005592998816173e+98,-4.665804614397149e+125,-3.0816893885770254e+106,2.6459333332180094e+26,4.8168501578471883e+52,1.4584122291488377e+21,2.0386333568835356e+27,7.6217282729958036e+67,4.5776263772398021e+26,-2.5626538869494214e+30,-1.006237572384706e+49,1.445391343850262e+123,1.4974843347791571e+109,4.3555358810897662e+205,2.0929326711520251e+77,3.8065537251660788e+73,1.908501596804996e+75,3.4544952034927085e+88,-20835.710372881382,-9.1537737733857005e+33,-2.2537830842672514e+61,-4.6920442974867337e+72,-3.235342188407957e+139,6.8915370132358353e+209,8.9188821042958937e+31,2.1855326537130698e+62,3.3476151725474821e+25,1.1137569080491475e+97,-1.2442371892443676e+80,4.7155744158913729e+70,9.5904253325853064e+46,2.7665159686406508e+52,-1.2665203232404365e+145,5.1948305446404968e+126,4.1797455457801625e+45,7.6535498354649005e+108,2.6289431728310214e+40,54991789528257.266,-120.92549447320454,-9.037657517826864e+33,15.597606691400475,-4.1084168898605724e+125,3.4469945391136865e+125,3.1146297963618434e+76,7.4502027960416941e+121,7.7639385105676415e+75,7.0572503157430913e+110,6.1829429312078549e+92,-1594234329424.9768,-5.1523647478089228e+106,-1.1199030279401932e+53,8.9539433863247536e+74,-7.2345935108738832e+79,4.4957953666728806e+17,1.6295230041099883e+138,220.18678558625069,47761187688.161476,8.8614376989030431e+57,-1.1550861142950113e+76,-4.9102949723036819e+52,-1.2954359690548108e+74,-4.0310573117790933e+120,-5.9942432225683738e+111,3.6872503737448803e+153,3.1419812193371411e+135,8.0769436117046089e+75,1.9838251747826629e+48,2.448939683413363e+46,-3.6007249665856102e+56,4.1317003345372677e+18,1.5028782799612684e+112,-3.9092201263891584e+120,4.3342468615717597e+103,3.5312858521082313e+105,2.3585099075560733e+72,26.781030708996504,2.4957071878053815e+56,8.2061702813646382e+67,1.766038811823553e+17,8.1271445127980522e+46,-1.8903966658164072e+105,4380.1266030615034,81643.403663351361,3.6641712459441681e+188,45131.238227512025,5.421702492571868e+32,1.0118012172011025e+84,61546505963610704,-1.50462929889961e+88,-476682.72850454698,8.6850440308297128e+93,-2.4793053579035553e+29,9.9222402052697211e+19,5.1287526585893842e+39,1.0027663561214876e+32,4.441373182392958e+73,2.4351540934474963e+42,1816.3455558707449,8.7789176789167656e+54,-1.6601247747444887e+20,15.562186255120926,2.6292997871875478e+27,-7.9763802293965844e+144,2.2085159765583255e+185,1.0074164780075753e+122,1.5115038949537895e+47,93548783725542464,1.2071249724460192e+76,2.0335213744054486e+86,-3.8337073042535015e+56,2.6930865132353118e+98,5.2308287535048593e+93,-2.9974340972941801e+69,7.939026794954688e+17,4.1856679014348395e+57,1.4931451419243412e+121,6.9887909369978863e+32,3.080137134156154e+86,1.8106504893521393e+74,298.75401931136469,8.234022047435898e+93,-1.5998872748706072e+50,-4.4689538455000285e+133,1.5376619609500363e+60,1.9612309349007151e+90,2.4978187902421636e+71,705.01389845577046,62466676663096792,7.7972005475089556e+43,4.1076391754849969e+54,2.4754375853726927e+63,-9.9540273373554611e+67,-1.6033983340168934e+139,3.4701400517953849e+121,3.2107467771548897e+36,1.5741574028330752e+47,1.1027299979832718e+22,20.376913813680432,2.2206544834709347e+33,7.7391259834266962e+46,9.7882403218629739e+84,-4.4002031015198042e+41,2.418022924724159e+136,1.074490287166094e+18,9.3130095442902805e+69,2.1606764824578404e+49,8689.1520894833848,9.4541013071594261e+38,-9.9744892502218425e+75,5.24144442438527e+50,7.92473036194932e+71,2.9811934074044514e+98,9.1996491875757396e+71,4.321864483235223e+144,7.0249442087235669e+52,4.0288853227851847e+106,4.4198457541473849e+62,270.72689310975335,2597323.3635551673,2938823144560988,-8.5825934538482658e+48,-1.5065562404566162e+50,1.2172442053775438e+33,1.0747214865254772e+207,1.3045543971943729e+60,4.5178943090981741e+94,4.6806976046561759e+90,9.5853191460825571e+38,-5.7767389593689599e+27,-7.8177706854383262e+26,-3.043233183877763e+65,4299.5061293906238,-4.4835683313524178e+79,4.9495790717705691e+156,3.0268349298772937e+50,4.5990918575160818e+53,3.1948174854797007e+58,57541369864631.672,2.4860971161092742e+66,-3.4690731133837191e+37,7.4022399697659076e+93,-253635004307714.34,1.885682107774866e+136,1.0110784272597657e+157,23096491029963.562,6.5100899658848405e+36,8747.4764392446687,1.9549437147153561e+99,-1.9594343617614072e+60,11.031550187664259,1.0620751867692542e+39,-6.9395293450578866e+100,-2.0162313696548307e+59,3.5826083868318044e+130,1664.2746300675788,1.1049570885936805e+58,4.4557297662702484e+18,9.0694866291002805e+61,-1.0382332330999655e+84,-4.355025536121546e+72,-1.4966714492121979e+105,2266570.8305266271,-4.9063918606022013e+44,7.1806800940290934e+188,1.4065397346563326e+80,7.8081926818027396,1.5171324114909795e+29,3.9360381275531494e+21,-1.5630839014851442e+92,-101660447943.92923,1.7379155010663494e+17,-2.8972849813064971e+115,-71086048179576.406,2850704620694.2993,3.7318663524096196e+36,5.1196456365908615e+64,8.077113078777288e+81,9.6308944035744648e+59,2.0295242444106112e+40,3.0997391521977286e+62,-73.655351375223503,-4.5191529893848544e+105,-11107894002.517155,4642008324.5682621,2.951565131628941e+43,1.239585251887358e+97,2.4714894955796321e+52,2.1896058774671699e+48,2.430940607301792e+66,-3.4538576589271769e+68,7.0671761717467716e+71,-8.6390894093652992e+17,-3.5377539968416911e+79,5.4953108492907135e+112,47745.237342662127,4.5987885585354814e+80,2.0085800498063652e+86,3.0007817654227478e+101,1.7459835727648608e+17,2.2804760656659112e+39,-3768450.3972794241,2238680.6628049244,-6.424568695234134e+116,5317395325.4347696,3.9495561602415485e+36,3.1343306617460034e+71,1724847452.3923004,1.9450869387155515e+80,9.0208132611726108e+29,-3.379242618656183e+68,-7.9441483296542538e+25,2.3052346130566342e+35,-3.7390019515280584e+100,6.1098487590394765e+206,1.1026272022336802e+125,7.8193008352454795e+55,6.221581290109423e+64,3.0894203642084013e+101,-1852248474.3706343,-2223.9525342700354,15.456512268772356,-8.4671860835252582e+17,-1.6787708566669911e+95,3.2812869178564951e+167,7.7701128447841616e+38,3.7781211307307294e+111,1.5810003201732558e+29,1.6836449597508727e+78,3.9470035201351915e+98,-3.0343446648275841e+23,2.4507301554962519e+31,4687202649788.8496,-1.622196912137828e+122,5.1320221828471349e+183,9.6521560792127655e+116,2.5129730694477087e+92,14.692580763794703,9.6591170261183709e+19,-1.0605393870185454e+88,2816491992505798,1.6809268637918579e+17,2.0087504656399913e+31,-5.1747877098271623e+116,1.412172491804725e+180,1.8753491135497396e+80,3.4922714289636364e+99,51485215187.776199,1.5700262952766307e+52,-4.1599198138793983e+52,-4.0010677448753912e+52,1.3118717797100255e+59,2.2034151410790817e+27,-1.4644526819286272e+95,1.048094185038508e+149,1.3586128496585159e+125,6.1576254938624744e+94,719.9625527730276,1.5737347772469329e+37,-7.7048025491352888e+79,2.1852989239273414e+39,-1.5826812206284386e+61,-1.2219261438257839e+50,-1.4367810447192687e+59,4.679881560148878e+55,1.1692338239364674e+101,2.6012780933019671e+78,1.4288597790988817e+84,1.193669332351099e+95,-3.9958923505117678e+52,5.0415626286960743e+95,9.1993559331594424e+111,5.5977905425091905e+88,-9.4662926302141103e+21,6.3396153071966898e+48,5.9362909912704819e+77,5.4378147594899672e+80,65.063423243506634,133054490.89490363,-1.062880482230333e+31,8791771.9283988811,88015727.179766834,13217268226398662,-1.8832045250698469e+26,2.083075480084393e+25,1.4817641628077045e+32,6.2087237109665971e+64,6.1140283309961097e+90,1884.2903722730239,-4.3315909867910869e+27,-1.129730547780476e+85,1.6414480821482038e+17,-2.3148151453459006e+86,-3.718381146459677e+84,3.439510162403025e+206,4.6863692371310613e+36,5.8547766680310988e+53,4.0165568097779788e+38,1.0413844868433696e+62,-8.4354679328521826e+67,-3.4712994832068762e+93,5.5781977583986987e+93,-6.8458229389665893e+58,-3069959.1550435121,1.9824765630165086e+56,94.419323003875789,2.9203585973231515e+121,1.5772815474427956e+71,20.949948156868651,2.7061765526245745e+94,1.4041371722513454e+25,-1.7200603354877312e+33,5.0332948133082116e+122,1.8865961431103732e+130,4.0160345388700275e+74,2.4164465928624736e+80,7.8726864299223478e+28,2.8398819893666913e+44,7330403.1963351471,3.1382241762907189e+47,4.6963222855550115e+95,-2430051126246.3188,-97160692436.377579,-3.7936237455578143e+138,3.0125445173686019e+67,3.7990042003835077e+122,1.847042560308839e+109,151442.05712384172,4.0491831084599702e+44,-6.8330263927473305e+71,2.8093864155880789e+58,2.0773040278494766e+107,3.420660947185814e+65,-9941507489.2382622,1.208931088331215e+152,7.3386874244772937e+77,27.480127592481352,5.0616299045994958e+36,2.4744173684429435e+48,-2.189510891530978e+100,10.995344146416063,1.1753441924009673e+59,-4.2159533277001976e+100,-1.5066807392109259e+35,7.6779440764000949e+67,2.3852247483108487e+19,1.1180729478492307e+102,1747359992320.3755,2.5655953172197545e+18,205667269846176.72,3.2390048158883598e+54,2.6320513404468429e+80,4.9810191038672383e+117,-1.4770164877321778e+35,25255419.276358921,7.4672660429597428e+111,3464.7475502078896,1.6467287405004848e+84,10.802068469416719,-9.2380753282163724e+63,2.7041047129185862e+66,-8.8232884971394944e+95,-5.9515801409611879e+67,-4.1427293758995775e+105,3.1534994040132661e+19,2408491288554716,8.0143667469904521e+94,1.1210634037474998e+102,1.2301250240028046e+58,194.95029070687127,-2172.8810940023941,-3.9459651803164592e+69,-83151.386918859906,-1.4195170853100844e+35,1.2476711857152247e+26,2.5127671500137962e+93,8.2092765869190694e+94,3.6845652113676389e+56,30279.7498861885,15403.339617927064,-94355964375773136,-2.8118706940616376e+91,-3.6060610866532518e+21,-4.1909894899139077e+30,4.4409986812029895e+19,3.6037111887067258e+23,3.1563580243447815e+104,4.2926063837884537e+25,1.1896194731892258e+68,-1.0105216276397992e+21,-3.3500846511460269e+72,808.54424946618963,4.0899119316313788e+74,-1.6790438943790297e+49,1.0537319528011748e+111,4.6790587195435962e+43,7.9042945897175542e+30,4.0959849285313179e+106,1.1388106579558428e+64,1.4764859024646109e+51,8592007.2092952039,-7.3647079128729887e+18,4296146851357.1431,2.8301003621977605e+61,69482.113569878609,7.218178312026833e+27,1.3533887777107173e+119,1785747716806.4104,5.9570221625816204e+103,205249722469449.62,8575614.2972933687,-8.0670338327238378e+95,-9.7798463515689753e+49,1.103943102576117e+119,4.4233272708329863e+147,5589326434.8816872,9.7777824830872938e+26,3.3883137868344016e+42,1.8119739923076078e+76,1.9458606103686819e+40,-3.4417283651960687e+52,1.5556993672926207e+89,-4.9159991023050099e+45,-1.5118070581346417e+26,7.5270927548696965e+54,3.279542895377341e+34,7.5270957840927217e+87,6.8945037402469194e+34,1.0933352401274864e+93,-608745706491841.25,-3.2011692634753343e+72,-3503144865732801,-2.8799735579186089e+41,1.1196696511116381e+42,1.2550676835495488e+219,3.8555448717204742e+23,1.5148681273958247e+23,1.397276166396318e+69,2.6852655437439497e+48,1.4534660877754429e+78,-1.176310165208448e+102,-6.1293976085927051e+48,-2.1389646211340609e+25,110.50707026499789,4.2301157520528662e+51,3.118932466497344e+75,1.9015400324693004e+114,1.3445044801912719e+93,1932.7264604500376,4.1717531097759428,-2.7296197702691381e+23,2.6196837005503805e+67,-5.0218237405782414e+67,2.6223810600316187e+124,8.9359686744327344e+40,2.7666536054396237e+48,5.0511414066743536e+71,1.1189401745454994e+17,2.6338599477924868e+80,-8374.6496082348549,-7.3971621571612756e+44,1.1862507470132395e+35,3.5460732206781564e+74,-1.4206711598517733e+26,2.4371050036898476e+183,2.8300979390290437e+101,2.1009363688928882e+21,2.4906473500364223e+104,1.4727962906742305e+56,-642236650721.22449,-439565.62224459817,4.3591703856212684e+102,3.1628924272619449e+56,4973525421872862,4.9001514851909577e+196,3.9184565074010965e+136,2.0686418305963347e+114,2.5820948272628384e+20,4.5439041833599935e+44,2.2041433105853211e+66,-1.3849678705528719e+20,175947.43610479878,3.404737051078358e+74,-1.1494192403603513e+79,2.7654225861119877e+214,1.312350383323615e+39,1.19398523085819e+56,156260.07590999696,6.710625980196936e+103,-2.2459468243001844e+52,-78198636606464.531,1.1578039169129e+35,-62330892.040853344,6.6089266658887657e+129,1.0990723549293072e+64,2.5443505015135303e+88,1.2945123212111611e+41,1845064844565.043,2.8632136785161351e+35,-4.4489422377014758e+83,-2.6649621073896887e+23,-2.2871084772267518e+91,-2.9369358498194481e+81,-4.7129909605402855e+143,2.5290007361022778e+17,7.7300555973576157e+98,1.3105834318977723e+41,1.4519209565567409e+102,2.043457319116408e+23,-4.2875660058272074e+83,-2.6522249693008049e+23,4.1865891357420515e+27,-61889450.85429889,-51595702793868.039,4.5042641684225363e+136,2.8829502427944297e+128,1.0684519886639688e+27,4.5619071937704904e+97,3302094769.0137591,-6.7547916371800936e+20,3.2558891090015232,-6.6271722741155808e+95,1.7191720316840855e+27,2.1285101109227331e+71,7.4425250968783393e+124,3.4385852304314173e+21,1.1900618002710535e+107,3.7510899365922589e+42,21.558758759849216,1.7308312406073671e+70,3.4897298100618567e+95,-2.1722823589821354e+91,2178311326.3061476,-1.0362513655479627e+35,1.7978277101598494e+197,2.9741308659672707e+19,1.2077455958750053e+95,7.4682783581689684e+62,1.7364581884999668e+95,7.1525680944858896e+43,-158631820.1205954,173844.87508748719,-1.7993292983850401e+54,4.9555238729057581e+129,2.0984341825382613e+89,32620712457866.105,155632201520016.69,1878944814682.6194,1.7717291043236831e+54,4.5665302567510631e+58,-2.4450323921900204e+56,9.1068245199004638e+58,4.4726572196238639e+19,65873.010534810106,2.4343440459691176e+118,2.1006312987670013e+142,1.8115791009942328e+124,5.5651354914361109e+106,6.4801832552989452e+42,4.3346140109983278,-2.3099677587825904e+68,2.2588827724538252e+67,3.0864509585590101e+43,-2.5299470689059093e+132,189842793.4726516,1873.2104807231071,1.1170785809625625e+27,72619010.498831615,3.0114754234751431e+80,-700812783.75503898,3.2669055384624928e+28,-6.7871651857522982e+104,1998820.4967016252,-8.987381513259809e+115,4.5335273113328937e+119,1.4049155321631566e+123,1.0571139698872136e+37,4.1249194355469042e+54,1.9090919432947078e+74,-0.3980049854391336,-4.2187458220024521e+48,-1.061013485876436e+61,8.9570037547006194e+97,-9.4018680604429054e+34,6.6027591976905822e+197,2.3740285039207841e+53,8662883600355497,3.7691993046178807e+86,7705147.2078552116,1.7110667295631473e+70,-7.6780419007819012e+84,-3435199.178995823,-1.3837078952374835e+72,1.7779936748912059e+28,532.96583698518486,3.1914806695608623e+19,3.838384420199721e+109,3.6404735792539846e+50,3.8451376211855214e+46,-315885011276499.06,3.4389334421818376e+50,7.149462595279564e+38,-3.7901618395128429e+67,7.6219569279735412e+41,6.855753329327817e+186,6.6408154309610178e+55,5.6110842581744208e+104,3.8937015980062626e+86,8.2706275377616156e+31,1.7168245946626518e+17,32621.834992043689,4.2739498937102932e+84,-1.1123244353670464e+86,-2.8784242817042223e+110,3.9028249498460594e+76,1.5405145989382673e+134,2.2341397811393813e+102,1.783693338678912e+69,1.4527184270118814e+30,1.4179329528300244e+82,-7.3883537810980376e+84,3.1823129316458127e+93,-193679741814085.38,-3.4148843098509627e+39,1.2239888107230711e+26,5.5219149151433693e+60,1.5550452909368758e+107,2.0855900835213329e+29,21.838567345703531,-2.9313226952629601e+37,2.0318076620686859e+66,2.05619448291186e+67,-1.0629424286435877e+86,-4.2858534881531488e+17,8.2767142505472512e+102,1.6294611731229403e+30,1.2923169113840184e+39,4.63831693123513e+40,8.3954050072997469e+103,-1.9813660003449109e+75,-6.0271872197741722e+33,-2.7179444373954606e+69,-3.637920620106359e+45,-4.1921542308458808e+68,1.3343504689296444e+34,4.4030189943203105e+48,1.0119057585290134e+31,3.2734614554249888e+95,1.0345373349711275e+25,7.0902238832653746e+43,-2.1362506122426781e+93,1.0565591091253755e+89,2.2168143041736904e+23,-7891370748.7845135,4.9760049171830733e+70,1.2257943153336103e+86,1.5781959614313858e+41,1.0505992168004342e+100,1.7014731239753836e+70,-9.4064079841559652e+51,-154209447.99475342,-2.6442676269078881e+69,3.294293825486172e+107,-44952675228345.57,4.2004169955624567e+19,1.7859946818453052e+68,4.794399705899905e+49,7.160997468531586e+60,10.874861938708371,2.1366448966333795e+66,2.7518537617412631e+74,1.3719870185048275e+17,-2.0296716658741675e+81,2.0963390843754462e+81,1.8374950606949815e+51,5.219312923451719e+34,6.0777955730497508e+78,1983390610.8063996,2.6909015274156394e+50,-6.0894109568797253e+33,8.7460285560823681e+86,-6.6487759587323672e+56,-1.0260015383844856e+63,1.5360549676669429e+28,2.1075464447830293e+241,4.1216682627200283e+41,2.0378822139206245e+43,162540.03196902131,2.756765250659572e+28,1.4039477310108561e+82,8.2242972520473296e+42,-9.2566078418833047e+60,2.1465462912374987e+23,105.1701429563944,5.1507585009620684e+248,4.2738739446620713e+21,5.0066693575345917e+49,1995309121.7223408,2.9476360149967283e+18,-6.3668384987056205e+51,-2.3679543881648155e+37,-1.6974075934971259e+22,-1.9021745738628765e+81,-3.7773721853265498e+137,2.1936411956976587e+101,8.4800922015317959e+109,9305718488226460,1.2565711758334224e+17,9.0013599181523526e+88,-1.5425289068754769e+30,2.3370121397590303e+54,776.08306907556869,-1.4542382045607536e+37,-4.8760939046666348e+53,1.1074136724129832e+54,2.1967821702209867e+46,3.6266503608124797e+19,3.9948650644582809e+104,4.2317070099247816e+46,-3.0024304305010566e+99,-2.3361116142399e+37,-4.6439608893355664e+95,1.956671257607368e+88,-2473363.1009721761,3.3402473227813203e+17,8.389260387698704e+75,2.9699567895447106e+102,3.9500496788082913e+73,1.6323788453002061e+66,-1.1254940890645974e+30,-151688998.04378888,-5.6483601051762295e+86,-1.0253860120127819e+105,-3.5264264748608335e+58,5.0366209831678718e+51,3.7685586675240772e+19,4.5795342205441136e+69,5.8637458509881297e+38,2.8315707807319471e+50,1.8320110472450079e+90,3557755248.6846151,-1.2330646029573173e+33,0.23170076091249453,-2.9783355729840873e+137,1.048841464260137e+223,4.5104079545846173e+83,3.5842240388874616e+90,2957846564020752.5,3.3667591785903682e+35,1.3705382291300069e+78,284.27705497954395,-9791.9934980761882,1.5901186547119847e+65,5.0287072217215228e+123,2.941747725941091e+45,5.9877377179861587e+23,7.1098030640877867e+85,4.6456105931934075e+42,3.4932353977205857e+48,1.3701321870173829e+78,3.0774502324160737e+18,1.3960609987488886e+80,1.8688587338290263e+112,-4.9164457683480656e+21,4.1565058302650094e+232,3564059522120932,6.1143924562704003e+109,5.1130735540247287e+54,2032.6144363637284,204048743351864.75,2406825342649.3477,-5.3461503098522562e+40,-7.7448329242925815e+85,-2412022.0331142368,1.2490111104235957e+225,1.0039624217252888e+76,9.0349465404946752e+92,4.2686747426273108e+46,5.7294687330283631e+44,-3.0297158237163213e+50,3.4510010123486686e+35,-4.7438044429329537e+52,5.0167567551022896e+69,-2.3505613312907619e+137]}
},{}],158:[function(require,module,exports){
module.exports={"n":[38,52,21,50,60,56,13,16,39,39,36,25,23,60,8,28,1,41,25,56,11,34,44,26,22,19,51,55,44,59,34,17,10,1,58,20,16,54,56,6,13,19,22,32,5,7,39,46,11,19,2,17,44,19,21,25,40,16,23,29,38,13,1,56,55,2,48,59,45,47,49,27,23,13,37,6,35,33,32,32,16,40,15,4,27,39,13,8,49,24,60,56,1,25,32,39,5,37,48,48,60,27,4,42,57,49,1,16,41,3,47,43,32,48,54,59,54,60,38,2,8,56,13,3,11,23,2,7,6,26,37,0,57,53,21,54,25,31,60,18,57,24,41,24,60,13,46,33,20,17,40,22,14,3,18,49,41,37,32,18,25,13,36,26,45,44,35,52,33,41,35,35,31,48,5,10,43,38,60,60,21,55,59,28,21,37,54,54,27,43,25,25,13,32,7,13,18,54,44,6,47,57,42,24,0,1,51,27,56,12,47,54,2,57,23,4,42,8,44,31,13,52,16,49,41,51,29,55,38,50,14,40,10,55,50,16,46,50,57,41,6,43,11,47,6,40,29,45,11,12,54,34,6,39,2,42,33,38,47,49,19,48,10,44,20,1,12,58,31,8,55,12,38,7,6,53,23,54,3,0,30,42,26,50,60,39,49,28,29,44,54,34,8,27,23,32,56,34,55,39,43,36,37,46,20,41,57,8,7,15,44,20,39,11,50,36,24,47,45,21,50,18,19,55,33,29,59,35,33,16,20,9,37,42,21,11,46,8,25,6,30,18,42,17,59,0,19,8,51,45,45,10,58,39,1,49,21,31,40,5,17,42,14,52,43,27,38,54,36,32,40,19,2,11,21,34,27,15,14,23,43,6,52,60,17,15,44,25,8,26,51,44,8,23,35,18,22,51,49,7,30,29,29,47,53,60,21,48,27,1,58,58,2,20,59,2,11,36,40,59,35,42,41,41,22,12,37,12,49,52,1,52,5,43,59,1,39,22,14,19,24,30,7,44,16,43,15,7,20,48,9,20,21,25,7,20,53,37,5,19,56,47,24,40,2,32,20,44,44,44,48,39,33,38,41,6,54,6,3,33,18,28,2,45,11,5,43,48,44,33,53,59,35,12,4,54,56,44,48,48,17,24,33,55,60,6,43,9,51,13,26,7,28,4,34,5,16,36,45,58,30,7,39,52,18,50,8,28,29,41,22,10,48,46,47,14,40,32,8,44,1,12,34,35,18,8,57,27,59,25,17,24,48,27,54,38,36,34,53,47,57,18,33,49,44,42,35,20,1,1,27,23,39,19,31,8,22,26,57,45,50,0,51,60,22,17,36,59,53,48,56,59,40,9,12,23,39,56,4,30,24,28,40,7,56,36,49,51,29,9,46,39,25,43,59,4,60,43,52,0,23,52,27,60,15,11,47,20,53,37,55,55,34,1,36,7,9,9,54,45,27,6,12,7,54,57,46,30,53,10,17,52,41,20,40,32,7,27,24,19,16,9,43,19,17,52,54,24,50,57,23,24,30,46,42,22,50,39,37,53,35,56,19,25,27,56,43,26,53,49,43,21,1,20,41,19,26,5,26,43,7,0,49,25,19,54,15,3,20,54,22,28,33,20,34,25,24,13,24,5,31,15,40,27,58,26,44,25,24,26,50,9,8,0,3,45,5,58,9,55,19,4,18,31,0,5,32,1,5,7,8,9,38,52,52,15,59,55,34,48,60,58,33,21,31,41,20,35,26,25,30,59,4,0,54,34,3,45,26,45,50,16,24,57,37,49,49,31,54,25,56,9,11,60,15,17,54,16,36,47,30,3,37,43,49,38,32,53,12,20,27,43,26,27,58,11,37,36,42,25,43,0,21,17,31,39,33,42,9,45,34,27,42,53,26,5,51,52,44,18,21,29,27,35,23,18,47,1,44,33,26,47,42,17,57,44,47,34,43,45,6,13,23,53,36,23,28,19,3,39,13,57,50,30,0,6,52,58,4,56,40,22,30,28,13,23,34,58,7,13,40,55,36,0,3,40,3,57,9,1,1,0,26,1,50,36,37,6,31,23,52,10,5,36,55,37,6,16,31,15,8,2,34,20,0,43,46,58,51,6,55,53,60,27,30,15,16,46,6,49,30,14,35,21,46,44,5,16,40,54,31,47,10,17,57,8,36,27,26,44,57,47,40,43,27,16,51,1,32,23,33,32,41,20,22,51,14,30,35,51,52,55,24,34,6,22,27,48,18,19,24,34,50,5,24,4,23,57,21,32],"x":[0.01,0.11009009009009008,0.21018018018018017,0.31027027027027027,0.41036036036036033,0.51045045045045045,0.61054054054054052,0.71063063063063059,0.81072072072072066,0.91081081081081072,1.0109009009009009,1.110990990990991,1.211081081081081,1.3111711711711711,1.4112612612612612,1.5113513513513512,1.6114414414414413,1.7115315315315314,1.8116216216216214,1.9117117117117115,2.0118018018018016,2.1118918918918914,2.2119819819819817,2.3120720720720715,2.4121621621621618,2.5122522522522517,2.612342342342342,2.7124324324324318,2.8125225225225221,2.912612612612612,3.0127027027027022,3.1127927927927921,3.2128828828828824,3.3129729729729727,3.4130630630630625,3.5131531531531528,3.6132432432432426,3.7133333333333329,3.8134234234234228,3.9135135135135131,4.0136036036036034,4.1136936936936932,4.213783783783783,4.3138738738738729,4.4139639639639636,4.5140540540540535,4.6141441441441433,4.7142342342342332,4.8143243243243239,4.9144144144144137,5.0145045045045036,5.1145945945945943,5.2146846846846842,5.314774774774774,5.4148648648648638,5.5149549549549546,5.6150450450450444,5.7151351351351343,5.8152252252252241,5.9153153153153148,6.0154054054054047,6.1154954954954945,6.2155855855855844,6.3156756756756751,6.415765765765765,6.5158558558558548,6.6159459459459455,6.7160360360360354,6.8161261261261252,6.9162162162162151,7.0163063063063058,7.1163963963963957,7.2164864864864855,7.3165765765765753,7.4166666666666661,7.5167567567567559,7.6168468468468458,7.7169369369369356,7.8170270270270263,7.9171171171171162,8.0172072072072069,8.1172972972972968,8.2173873873873866,8.3174774774774765,8.4175675675675663,8.5176576576576561,8.617747747747746,8.7178378378378376,8.8179279279279275,8.9180180180180173,9.0181081081081071,9.118198198198197,9.2182882882882868,9.3183783783783767,9.4184684684684665,9.5185585585585581,9.618648648648648,9.7187387387387378,9.8188288288288277,9.9189189189189175,10.019009009009007,10.119099099099097,10.219189189189189,10.319279279279279,10.419369369369369,10.519459459459458,10.619549549549548,10.719639639639638,10.819729729729728,10.919819819819818,11.019909909909909,11.119999999999999,11.220090090090089,11.320180180180179,11.420270270270269,11.520360360360359,11.620450450450448,11.72054054054054,11.82063063063063,11.92072072072072,12.02081081081081,12.120900900900899,12.220990990990989,12.321081081081079,12.421171171171169,12.521261261261261,12.62135135135135,12.72144144144144,12.82153153153153,12.92162162162162,13.02171171171171,13.1218018018018,13.221891891891891,13.321981981981981,13.422072072072071,13.522162162162161,13.622252252252251,13.722342342342341,13.82243243243243,13.92252252252252,14.022612612612612,14.122702702702702,14.222792792792792,14.322882882882881,14.422972972972971,14.523063063063061,14.623153153153151,14.723243243243243,14.823333333333332,14.923423423423422,15.023513513513512,15.123603603603602,15.223693693693692,15.323783783783782,15.423873873873871,15.523963963963963,15.624054054054053,15.724144144144143,15.824234234234233,15.924324324324322,16.024414414414416,16.124504504504504,16.224594594594596,16.324684684684684,16.424774774774775,16.524864864864863,16.624954954954955,16.725045045045047,16.825135135135135,16.925225225225226,17.025315315315314,17.125405405405406,17.225495495495494,17.325585585585586,17.425675675675677,17.525765765765765,17.625855855855857,17.725945945945945,17.826036036036037,17.926126126126125,18.026216216216216,18.126306306306308,18.226396396396396,18.326486486486488,18.426576576576576,18.526666666666667,18.626756756756755,18.726846846846847,18.826936936936935,18.927027027027027,19.027117117117118,19.127207207207206,19.227297297297298,19.327387387387386,19.427477477477478,19.527567567567566,19.627657657657657,19.727747747747749,19.827837837837837,19.927927927927929,20.028018018018017,20.128108108108108,20.228198198198196,20.328288288288288,20.42837837837838,20.528468468468468,20.628558558558559,20.728648648648647,20.828738738738739,20.928828828828827,21.028918918918919,21.12900900900901,21.229099099099098,21.32918918918919,21.429279279279278,21.52936936936937,21.629459459459458,21.729549549549549,21.829639639639637,21.929729729729729,22.029819819819821,22.129909909909909,22.23,22.330090090090088,22.43018018018018,22.530270270270268,22.63036036036036,22.730450450450451,22.830540540540539,22.930630630630631,23.030720720720719,23.130810810810811,23.230900900900899,23.33099099099099,23.431081081081082,23.53117117117117,23.631261261261262,23.73135135135135,23.831441441441441,23.93153153153153,24.031621621621621,24.131711711711713,24.231801801801801,24.331891891891892,24.431981981981981,24.532072072072072,24.63216216216216,24.732252252252252,24.83234234234234,24.932432432432432,25.032522522522523,25.132612612612611,25.232702702702703,25.332792792792791,25.432882882882883,25.532972972972971,25.633063063063062,25.733153153153154,25.833243243243242,25.933333333333334,26.033423423423422,26.133513513513513,26.233603603603601,26.333693693693693,26.433783783783785,26.533873873873873,26.633963963963964,26.734054054054052,26.834144144144144,26.934234234234232,27.034324324324324,27.134414414414412,27.234504504504503,27.334594594594595,27.434684684684683,27.534774774774775,27.634864864864863,27.734954954954954,27.835045045045042,27.935135135135134,28.035225225225226,28.135315315315314,28.235405405405405,28.335495495495493,28.435585585585585,28.535675675675673,28.635765765765765,28.735855855855856,28.835945945945944,28.936036036036036,29.036126126126124,29.136216216216216,29.236306306306304,29.336396396396395,29.436486486486487,29.536576576576575,29.636666666666667,29.736756756756755,29.836846846846846,29.936936936936934,30.037027027027026,30.137117117117114,30.237207207207206,30.337297297297297,30.437387387387385,30.537477477477477,30.637567567567565,30.737657657657657,30.837747747747745,30.937837837837836,31.037927927927928,31.138018018018016,31.238108108108108,31.338198198198196,31.438288288288287,31.538378378378376,31.638468468468467,31.738558558558559,31.838648648648647,31.938738738738738,32.038828828828827,32.138918918918911,32.239009009009003,32.339099099099094,32.439189189189186,32.539279279279278,32.639369369369362,32.739459459459454,32.839549549549545,32.939639639639637,33.039729729729721,33.139819819819813,33.239909909909905,33.339999999999996,33.440090090090088,33.540180180180172,33.640270270270264,33.740360360360356,33.840450450450447,33.940540540540539,34.040630630630623,34.140720720720715,34.240810810810807,34.340900900900898,34.440990990990983,34.541081081081074,34.641171171171166,34.741261261261258,34.841351351351349,34.941441441441434,35.041531531531525,35.141621621621617,35.241711711711709,35.341801801801793,35.441891891891885,35.541981981981976,35.642072072072068,35.74216216216216,35.842252252252244,35.942342342342336,36.042432432432427,36.142522522522519,36.242612612612611,36.342702702702695,36.442792792792787,36.542882882882878,36.64297297297297,36.743063063063055,36.843153153153146,36.943243243243238,37.043333333333329,37.143423423423421,37.243513513513506,37.343603603603597,37.443693693693689,37.54378378378378,37.643873873873865,37.743963963963957,37.844054054054048,37.94414414414414,38.044234234234231,38.144324324324316,38.244414414414408,38.344504504504499,38.444594594594591,38.544684684684682,38.644774774774767,38.744864864864859,38.84495495495495,38.945045045045042,39.045135135135126,39.145225225225218,39.24531531531531,39.345405405405401,39.445495495495493,39.545585585585577,39.645675675675669,39.745765765765761,39.845855855855852,39.945945945945937,40.046036036036028,40.14612612612612,40.246216216216212,40.346306306306303,40.446396396396388,40.546486486486479,40.646576576576571,40.746666666666663,40.846756756756754,40.946846846846839,41.04693693693693,41.147027027027022,41.247117117117114,41.347207207207198,41.44729729729729,41.547387387387381,41.647477477477473,41.747567567567565,41.847657657657649,41.947747747747741,42.047837837837832,42.147927927927924,42.248018018018016,42.3481081081081,42.448198198198192,42.548288288288283,42.648378378378375,42.748468468468459,42.848558558558551,42.948648648648643,43.048738738738734,43.148828828828826,43.24891891891891,43.349009009009002,43.449099099099094,43.549189189189185,43.64927927927927,43.749369369369361,43.849459459459453,43.949549549549545,44.049639639639636,44.149729729729721,44.249819819819812,44.349909909909904,44.449999999999996,44.550090090090087,44.650180180180172,44.750270270270263,44.850360360360355,44.950450450450447,45.050540540540531,45.150630630630623,45.250720720720714,45.350810810810806,45.450900900900898,45.550990990990982,45.651081081081074,45.751171171171165,45.851261261261257,45.951351351351342,46.051441441441433,46.151531531531525,46.251621621621616,46.351711711711708,46.451801801801793,46.551891891891884,46.651981981981976,46.752072072072067,46.852162162162159,46.952252252252244,47.052342342342335,47.152432432432427,47.252522522522518,47.352612612612603,47.452702702702695,47.552792792792786,47.652882882882878,47.75297297297297,47.853063063063054,47.953153153153146,48.053243243243237,48.153333333333329,48.253423423423421,48.353513513513505,48.453603603603597,48.553693693693688,48.65378378378378,48.753873873873864,48.853963963963956,48.954054054054048,49.054144144144139,49.154234234234231,49.254324324324315,49.354414414414407,49.454504504504499,49.55459459459459,49.654684684684675,49.754774774774766,49.854864864864858,49.95495495495495,50.055045045045041,50.155135135135126,50.255225225225217,50.355315315315309,50.455405405405401,50.555495495495492,50.655585585585577,50.755675675675668,50.85576576576576,50.955855855855852,51.055945945945936,51.156036036036028,51.256126126126119,51.356216216216211,51.456306306306303,51.556396396396387,51.656486486486479,51.75657657657657,51.856666666666662,51.956756756756747,52.056846846846838,52.15693693693693,52.257027027027021,52.357117117117113,52.457207207207198,52.557297297297289,52.657387387387381,52.757477477477472,52.857567567567564,52.957657657657649,53.05774774774774,53.157837837837832,53.257927927927923,53.358018018018008,53.4581081081081,53.558198198198191,53.658288288288283,53.758378378378374,53.858468468468459,53.958558558558551,54.058648648648642,54.158738738738734,54.258828828828818,54.35891891891891,54.459009009009002,54.559099099099093,54.659189189189185,54.759279279279269,54.859369369369361,54.959459459459453,55.059549549549544,55.159639639639636,55.25972972972972,55.359819819819812,55.459909909909904,55.559999999999995,55.66009009009008,55.760180180180171,55.860270270270263,55.960360360360355,56.060450450450446,56.160540540540531,56.260630630630622,56.360720720720714,56.460810810810806,56.560900900900897,56.660990990990982,56.761081081081073,56.861171171171165,56.961261261261257,57.061351351351341,57.161441441441433,57.261531531531524,57.361621621621616,57.461711711711708,57.561801801801792,57.661891891891884,57.761981981981975,57.862072072072067,57.962162162162151,58.062252252252243,58.162342342342335,58.262432432432426,58.362522522522518,58.462612612612602,58.562702702702694,58.662792792792786,58.762882882882877,58.862972972972969,58.963063063063053,59.063153153153145,59.163243243243237,59.263333333333328,59.363423423423413,59.463513513513504,59.563603603603596,59.663693693693688,59.763783783783779,59.863873873873864,59.963963963963955,60.064054054054047,60.164144144144139,60.264234234234223,60.364324324324315,60.464414414414406,60.564504504504498,60.66459459459459,60.764684684684674,60.864774774774766,60.964864864864857,61.064954954954949,61.165045045045041,61.265135135135125,61.365225225225217,61.465315315315308,61.5654054054054,61.665495495495485,61.765585585585576,61.865675675675668,61.965765765765759,62.065855855855851,62.165945945945936,62.266036036036027,62.366126126126119,62.46621621621621,62.566306306306302,62.666396396396387,62.766486486486478,62.86657657657657,62.966666666666661,63.066756756756746,63.166846846846838,63.266936936936929,63.367027027027021,63.467117117117112,63.567207207207197,63.667297297297289,63.76738738738738,63.867477477477472,63.967567567567556,64.067657657657662,64.167747747747754,64.267837837837831,64.367927927927923,64.468018018018014,64.568108108108106,64.668198198198198,64.768288288288289,64.868378378378381,64.968468468468473,65.068558558558564,65.168648648648642,65.268738738738733,65.368828828828825,65.468918918918916,65.569009009009008,65.6690990990991,65.769189189189191,65.869279279279283,65.969369369369375,66.069459459459452,66.169549549549544,66.269639639639635,66.369729729729727,66.469819819819818,66.56990990990991,66.670000000000002,66.770090090090093,66.870180180180185,66.970270270270262,67.070360360360354,67.170450450450446,67.270540540540537,67.370630630630629,67.47072072072072,67.570810810810812,67.670900900900904,67.770990990990995,67.871081081081087,67.971171171171164,68.071261261261256,68.171351351351348,68.271441441441439,68.371531531531531,68.471621621621622,68.571711711711714,68.671801801801806,68.771891891891897,68.871981981981975,68.972072072072066,69.072162162162158,69.17225225225225,69.272342342342341,69.372432432432433,69.472522522522524,69.572612612612616,69.672702702702708,69.772792792792785,69.872882882882877,69.972972972972968,70.07306306306306,70.173153153153152,70.273243243243243,70.373333333333335,70.473423423423426,70.573513513513518,70.673603603603596,70.773693693693687,70.873783783783779,70.97387387387387,71.073963963963962,71.174054054054054,71.274144144144145,71.374234234234237,71.474324324324328,71.574414414414406,71.674504504504498,71.774594594594589,71.874684684684681,71.974774774774772,72.074864864864864,72.174954954954956,72.275045045045047,72.375135135135139,72.47522522522523,72.575315315315308,72.6754054054054,72.775495495495491,72.875585585585583,72.975675675675674,73.075765765765766,73.175855855855858,73.275945945945949,73.376036036036041,73.476126126126118,73.57621621621621,73.676306306306302,73.776396396396393,73.876486486486485,73.976576576576576,74.076666666666668,74.17675675675676,74.276846846846851,74.376936936936929,74.47702702702702,74.577117117117112,74.677207207207204,74.777297297297295,74.877387387387387,74.977477477477478,75.07756756756757,75.177657657657662,75.277747747747739,75.377837837837831,75.477927927927922,75.578018018018014,75.678108108108106,75.778198198198197,75.878288288288289,75.97837837837838,76.078468468468472,76.178558558558564,76.278648648648641,76.378738738738733,76.478828828828824,76.578918918918916,76.679009009009008,76.779099099099099,76.879189189189191,76.979279279279282,77.079369369369374,77.179459459459451,77.279549549549543,77.379639639639635,77.479729729729726,77.579819819819818,77.67990990990991,77.780000000000001,77.880090090090093,77.980180180180184,78.080270270270262,78.180360360360353,78.280450450450445,78.380540540540537,78.480630630630628,78.58072072072072,78.680810810810812,78.780900900900903,78.880990990990995,78.981081081081072,79.081171171171164,79.181261261261255,79.281351351351347,79.381441441441439,79.48153153153153,79.581621621621622,79.681711711711714,79.781801801801805,79.881891891891883,79.981981981981974,80.082072072072066,80.182162162162157,80.282252252252249,80.382342342342341,80.482432432432432,80.582522522522524,80.682612612612616,80.782702702702707,80.882792792792785,80.982882882882876,81.082972972972968,81.183063063063059,81.283153153153151,81.383243243243243,81.483333333333334,81.583423423423426,81.683513513513518,81.783603603603595,81.883693693693687,81.983783783783778,82.08387387387387,82.183963963963961,82.284054054054053,82.384144144144145,82.484234234234236,82.584324324324328,82.684414414414405,82.784504504504497,82.884594594594589,82.98468468468468,83.084774774774772,83.184864864864863,83.284954954954955,83.385045045045047,83.485135135135138,83.585225225225216,83.685315315315307,83.785405405405399,83.885495495495491,83.985585585585582,84.085675675675674,84.185765765765765,84.285855855855857,84.385945945945949,84.48603603603604,84.586126126126118,84.686216216216209,84.786306306306301,84.886396396396393,84.986486486486484,85.086576576576576,85.186666666666667,85.286756756756759,85.386846846846851,85.486936936936928,85.58702702702702,85.687117117117111,85.787207207207203,85.887297297297295,85.987387387387386,86.087477477477478,86.187567567567569,86.287657657657661,86.387747747747738,86.48783783783783,86.587927927927922,86.688018018018013,86.788108108108105,86.888198198198197,86.988288288288288,87.08837837837838,87.188468468468471,87.288558558558549,87.38864864864864,87.488738738738732,87.588828828828824,87.688918918918915,87.789009009009007,87.889099099099099,87.98918918918919,88.089279279279282,88.189369369369373,88.289459459459451,88.389549549549542,88.489639639639634,88.589729729729726,88.689819819819817,88.789909909909909,88.890000000000001,88.990090090090092,89.090180180180184,89.190270270270261,89.290360360360353,89.390450450450444,89.490540540540536,89.590630630630628,89.690720720720719,89.790810810810811,89.890900900900903,89.990990990990994,90.091081081081072,90.191171171171163,90.291261261261255,90.391351351351346,90.491441441441438,90.59153153153153,90.691621621621621,90.791711711711713,90.891801801801805,90.991891891891882,91.091981981981974,91.192072072072065,91.292162162162157,91.392252252252248,91.49234234234234,91.592432432432432,91.692522522522523,91.792612612612615,91.892702702702692,91.992792792792784,92.092882882882876,92.192972972972967,92.293063063063059,92.39315315315315,92.493243243243242,92.593333333333334,92.693423423423425,92.793513513513517,92.893603603603594,92.993693693693686,93.093783783783778,93.193873873873869,93.293963963963961,93.394054054054052,93.494144144144144,93.594234234234236,93.694324324324327,93.794414414414405,93.894504504504496,93.994594594594588,94.09468468468468,94.194774774774771,94.294864864864863,94.394954954954954,94.495045045045046,94.595135135135138,94.695225225225215,94.795315315315307,94.895405405405398,94.99549549549549,95.095585585585582,95.195675675675673,95.295765765765765,95.395855855855856,95.495945945945948,95.596036036036026,95.696126126126117,95.796216216216209,95.8963063063063,95.996396396396392,96.096486486486484,96.196576576576575,96.296666666666667,96.396756756756758,96.49684684684685,96.596936936936928,96.697027027027019,96.797117117117111,96.897207207207202,96.997297297297294,97.097387387387386,97.197477477477477,97.297567567567569,97.39765765765766,97.497747747747738,97.59783783783783,97.697927927927921,97.798018018018013,97.898108108108104,97.998198198198196,98.098288288288288,98.198378378378379,98.298468468468471,98.398558558558548,98.49864864864864,98.598738738738732,98.698828828828823,98.798918918918915,98.899009009009006,98.999099099099098,99.09918918918919,99.199279279279281,99.299369369369359,99.39945945945945,99.499549549549542,99.599639639639634,99.699729729729725,99.799819819819817,99.899909909909908,100],"y":[-5.2302261746660068e+122,-4.943019854130633e+118,4.0862524262565011e+34,-2.5370352926675782e+90,-3.2891622374726133e+105,-3.1514761766458103e+91,6226984301667.9727,-6961022576134174,9.0101942844910135e+49,8.559689373560685e+47,-2.4906778389593172e+41,1.0050131271345155e+24,2.6081789354619296e+20,-5.5328888995447522e+74,-1831.0945377070757,-1.9166520389132934e+24,0.85045408266239775,5.2754915953627993e+39,3.026185387486825e+18,-6.4683259073258051e+58,9155.1251328974904,-1.2783690916139281e+27,-8.1176073928665681e+38,-59925078153837464,-1801219121828.3279,1214414030.2115619,3.1994873778164165e+44,6.8482675794803029e+48,-1.6416457162292179e+34,1.9277914880423249e+52,-5.0899558009546044e+21,475662.36729889357,-10.181155585518445,0.35190331313827411,-8.2348794394532841e+46,-8487321.8367044684,-6972.5521078398733,-1.0624350986759098e+40,-5.210900539205858e+41,-0.066126023535801298,23.190444064387645,63999.591083623294,-4859515.9930466404,-295116794195834.12,0.024195355882353966,0.037509818955373794,5.5732540557527245e+19,-1.2311096489069289e+26,0.28922094336848492,1848.0439654578965,-0.048480405314778326,64.682737914718288,-1.4109089872172466e+22,388.83417575988352,3803.4626136461802,824829.92093954433,-1.5441428447538032e+17,-3.0280417477755579,11824.993675768734,61838791.693027377,-212947757289730.56,0.069607947399869072,0.17451856126908338,-1.6905922672903327e+29,7.9048769873348282e+27,-0.027443655606873962,-7.6796778142050746e+20,3.2760273882853295e+30,5.4435662633200365e+17,1.2578909458555875e+19,3.0146320386254039e+20,15308.648467666435,68.049126658413741,0.0059893287339618049,11868379094.945946,-0.00097115850222903707,188587666.36924461,5923435.5838897293,-908112.62920640677,-597324.2895941094,-0.01042888578603475,-42610877846.587029,0.0036279751825720129,-0.0015850343754676458,141.66301387620604,1264634054.0014386,0.0006455126053202027,-0.00023202768430563271,3294638713233307,-1.170439359536467,-4.5587501564705614e+23,-1.3747087455588581e+20,0.11457623285935563,1.0479499706214093,-1971.8506887738902,14957781.52199373,0.00037506546153015128,417162.28278297844,-3067371547466.4575,-1866881223428.6301,-7.4332553119001254e+20,0.84313473417831564,-0.00066654884516625218,-37071065.539849073,3.759122036111561e+17,488781704269.01093,0.098738485847368995,-8.3213277382793686e-05,1253632.7982759662,0.0017597894418331075,2482746583.7383752,5788365.5603841767,-6.2734670128504142,-2897703972.7100143,-15683766724371.99,28643227807227344,-6035799855687.3447,-52159190365463552,-802.52400065924689,-0.0076521498626869223,-1.5880819093883418e-05,-12449781166080.273,5.7591865875134311e-06,0.0012064555450025261,5.0551997345835434e-06,0.00013996550193832999,-0.0067945585510866824,1.7408278455653802e-05,-3.3902110245222173e-05,-0.00046131766980112769,6.4367407969651476,2.5356868788543765,379421174306.16431,818592358.1395061,9.9972236319930195e-06,-1460501773.4512658,5.9876201179215018e-05,0.0036867767693558383,-2242450206828.8604,-1.646742244632078e-06,12582781507.757816,-1.3613831131016346e-05,13.340528019800008,-9.6269395012621848e-06,-167960594903.53281,5.687161334785297e-07,-1008.5207453084996,0.0018911048402827674,-8.4759731137440787e-07,3.8941754753156002e-07,-0.49722754481319165,-1.0855132257389912e-06,-2.6594653007525208e-07,0.00061258645738396494,-2.4775554139077967e-07,1793.7038626609699,0.26235102028522445,0.005173523073163047,-8.0444911076932326e-05,-1.3736655595621204e-07,9.335272951403891e-07,1.404550761466779e-07,-0.00070034964281121849,-9.0973478531182388e-07,1.5661681509432552,-0.43734970622018837,0.00013319754821443299,-1227.0206714737199,2.1046877999542243e-05,0.0092773015189705314,5.6951063962593764e-05,4.6198127874068912e-05,2.7370672792859749e-06,-2.6744309416276,1.7202549413692197e-05,-1.745349133500717e-07,0.0097996067147383334,-0.00011968486856212415,-418588.25532532588,-297682.28520670958,1.7458449103658612e-08,457.69186896526605,32968.561587954449,-9.1684771435772345e-08,1.0893517506605262e-08,1.0639474302014513e-05,-33.978271506523356,-25.327372972331315,2.9011093758411395e-08,0.00043432785877698049,1.1589127476545178e-08,1.013686626341965e-08,1.3454086387985063e-08,-1.1739041005203956e-07,8.2198920299971131e-07,1.0948053983785738e-08,-2.9138771634475813e-09,-1.4586977945500459,-0.00012536860375889018,-2.2213410820938758e-06,0.00095209011300249435,10.335426636113832,-1.1238920475423308e-05,-1.780618572074422e-09,2.9922496356343196,0.049918566712737186,0.0075412106979707415,2.0503663752194567e-09,-0.52415959071670482,-7.4390226118992597e-09,9.2797960039498311e-05,-0.033955113890049876,-0.0023258769651651433,0.36234281227296716,4.477025777381312e-10,-3.0621705213341415e-05,-6.4408428319199606e-07,-1.2134568207051207e-07,-1.7004491342616341e-06,1.330539444518727e-09,2.2067608949563132e-09,-0.0004646546086274322,-5.166703667785472e-10,2.4648283945135506e-05,7.3541053356669775e-08,7.8585511176958015e-05,2.8054859031670301e-10,0.0014959283884029026,-6.7374705853921687e-09,-1.4282537986775363e-05,-7.0468488363893183e-10,-1.1630201181169727e-08,-9.7669915935053233e-09,0.00034948780456113527,-4.7780444875675044e-06,-2.0428577621500897e-10,-1.7967339695587618e-07,-2.5049946542190279e-06,0.00059631479593971227,4.9536589562668284e-09,-7.0453181276560373e-07,1.0671336975994109e-08,2.6724100714187814e-09,8.8123510561863051e-08,-6.3677365221967049e-07,-1.0668371593615253e-09,2.3030312369095592e-11,1.162452207132788e-08,2.0310602202934402e-09,-8.7266756396103215e-10,-3.1604483992510667e-06,-3.9140382680102401e-11,-5.227713870925381e-07,1.8534883084667987e-10,-0.0016079793981990309,-5.4491457025046463e-10,1.515594161645497e-11,-6.6491198444127102e-11,5.078601789979003e-09,1.4560896171519932e-08,1.1502975814178027e-11,-5.3385845042142906e-09,-2.8298362600544129e-09,-3.9165168768292681e-10,-6.2600191666110979e-12,0.03840677398565303,-3.8956173932809168e-10,-1.6895969261062103e-06,2.3020471582375777e-12,-2.1049251467613773e-08,9.506946175988683e-08,-3.1036627712808414e-10,-7.4700514094267652e-12,7.1624699742216208e-08,-3.1351911613749413e-07,8.842791184364569e-09,1.1646588532251097e-12,-1.1599603789892682e-08,9.7854374178125498e-05,3.3118798405401164,-5.3457416879116021e-13,-8.7337693965254584e-12,-4.5229773226985584e-13,-3.1373282099537638e-10,-1.9562795192772421e-07,1.6697436716614981e-12,1.0616253692165803e-10,-2.4908971620100219e-13,2.2232923680607002e-13,-5.8577619113807719e-12,-9.4611839334908773e-10,-2.3863239147983798e-13,-1.079961967616353e-08,1.4823355988750122e-13,2.6649440967166136e-13,-1.1979409495033793e-13,-1.0702520643184723e-09,-1.181141423109343e-13,3.9181360564818705e-10,2.5105622432238664e-13,7.648262872209193e-13,-1.0026826397988008e-13,1.0719279973607204e-13,-1.5704882015132355e-12,-3.5677363503559725e-13,1.9661425384795516e-13,3.0140768957049546e-10,-7.188247798485855e-09,3.0363362542512388e-08,4.8365243702538321e-12,-2.5742072229117044e-13,-2.2482046165114773e-13,4.6749250996070405e-14,1.5041082523359597e-10,-1.6307270318958049e-12,-1.9108973374868127e-14,-3.6496673348908018e-14,2.8135677608570922e-13,1.1579466055388726e-13,8.5300882867679298e-14,-6.2609750562850534e-13,-3.4747855095013918e-13,1.85899533034386e-13,4.4375275772921463e-12,5.7257789376159857e-15,6.3703444418925034e-15,2.4888743274401121e-11,4.5181370648787957e-15,3.7999641681204722e-15,-8.602506534828715e-13,-6.7558217960506376e-14,9.5557522064599159e-10,3.0851816168694077e-15,-6.3934986294801112e-15,3.2080764729594134e-14,7.0487739333627235e-11,-1.2780393622416352e-14,-3.3723093196593606e-09,5.1040790706998917e-15,-8.5676678297377998e-08,-1.4608025136882548e-15,-1.1535841720895429e-13,-2.0591153999840519e-15,2.066767225069115e-13,1.010364698403137e-12,3.5276040137976121,4.6577877235991967e-14,-2.6602526727055385e-09,1.3080531512600163e-14,1.6785851590847973e-15,1.4736941504487259e-15,-1.4525306268506058e-10,-1.5434521698636943e-13,3.5782657523395989e-16,0.028616989858205572,2.364293122285494e-15,8.2606742006535533e-15,2.821016773876972e-16,-2.2615119114490935e-16,4.2871368040238204e-07,8.9856814967258001e-14,-2.0721663867132819e-16,-1.1135401829131208e-12,-2.1078053537598608e-15,1.6993572420097286e-16,3.6394699181123512e-16,-8.1952089064344874e-17,-2.4705495387068692e-15,-6.6218442708451395e-17,-8.4922750511762695e-17,-5.9612224151516226e-17,1.2170716293786516e-14,-0.00074055657603186204,2.1282546316126493e-11,2.8952187107543458e-15,-3.8621500332467229e-17,1.61739941176688e-16,2.3520565919879658e-13,-6.0320072648396233e-13,7.1754615302263326e-16,2.6204753341649801e-17,-4.2116119668600302e-08,-1.4453998167273664e-16,-2.6107588927567829e-15,2.9596313624997547e-14,1.7100392841925342e-13,-1.4918936919015358e-17,1.6610475192284058e-16,-1.0761668125885594e-09,-9.4678917311531974e-17,3.6890734679832411e-17,-8.4193568355150651e-18,-9.9039862748762615e-10,3.0857960294300239e-16,6.1556283241926041e-18,-7.9200476592685084e-15,-4.6062984895877794e-16,1.4758252374554842e-17,8.2355113525017296e-18,4.8379927790416812e-09,-1.0538203626870052e-17,1.3377372262495251e-17,1.243553789720077e-17,3.1405269643894712e-18,9.9190855765754954e-18,-8.8672208531729069e-17,5.062201042432657e-16,-2.2895758701618427e-18,1.7395273455032742e-17,0.024722546995978301,-2.0384047206516219e-17,-1.7675250785168494e-17,-0.00060220013704341676,-7.199601084533067e-16,1.631079235185369e-17,-0.00059342322267072489,6.3179908890000229e-12,-7.0121583328792194e-19,-4.308973627077395e-19,7.9815826599838767e-18,6.4249876778288298e-19,-3.040035799383171e-19,2.8047215663410755e-19,2.5429317973922235e-19,-1.008017220728964e-16,-1.3019126098309284e-12,2.750739382199858e-19,-1.229830022826898e-12,2.2617636193906416e-19,-3.2694970534331114e-19,0.023501377668772732,-2.5614369836491416e-19,1.6799202455829714e-07,9.032031343411328e-20,9.8359666217298998e-19,0.023228196880167661,8.7002544430598516e-20,-5.1512390818406753e-17,-7.4901465519920347e-14,4.7972129860539292e-16,-1.178050694643478e-17,-5.4740867226085164e-19,2.3440646626095021e-09,-3.2816814689900197e-20,-6.708339774873016e-15,2.7574528459202807e-20,1.8373741118056872e-14,2.1647306458017553e-09,-1.3909110876378271e-16,-1.9649005282447242e-20,5.8213535931296341e-11,-1.2154636328420511e-16,5.1899443919528844e-17,3.1090345379061361e-18,1.9393783392952347e-09,-1.0168900396903903e-16,1.5282610062912649e-20,1.9948184248410803e-20,1.2502606888587701e-07,2.0400091324460568e-16,-1.5854664121566385e-20,5.330944670833572e-21,-3.6105327410231219e-18,-6.9401555749460691e-21,-0.00047352564312475769,-4.8100046138439784e-20,-6.2766709257255122e-17,-3.1535005630201551e-21,-2.8678496915090769e-21,-2.6086061107515623e-21,-2.1481222410614319e-21,4.1644406857138699e-21,2.0294229455556654e-20,-4.3523937808547645e-21,2.2884824545058775e-21,-1.104906982950866e-08,-1.7283705087439827e-21,-1.0771252967073312e-08,1.883167503698139e-05,1.2429701572728211e-20,-2.2861006889922391e-16,-1.1064430468541344e-19,-0.00043847352399500943,6.4905022001759003e-22,1.1740638405854291e-12,9.3614338304204143e-08,6.0247115862862879e-22,-3.8462618047825647e-22,-4.4766303638024909e-22,6.2471033910312613e-21,3.2731109891717862e-22,6.3738028428880054e-22,2.3997790336278904e-21,-2.1534195538337411e-13,-1.0443105136886994e-06,-2.0519613928901648e-22,-2.2514390663747811e-22,-1.9896721060528045e-22,-1.3047732774253413e-22,-1.184054774662124e-22,3.1759610270143981e-16,-5.0694992080237175e-19,2.6081776683033579e-21,9.2693130424222426e-23,-1.5882685485043433e-22,-7.623729403932778e-09,1.0482132785082252e-22,1.9688387548806779e-11,4.5692604636474765e-23,3.4769177880331015e-14,-7.719955462303833e-20,8.4046454051960226e-10,-1.8950665410052211e-20,-8.9667525176815865e-07,-7.6861155136542741e-22,6.9143645678762768e-08,-5.9184851914619406e-16,-2.8452875388311195e-22,2.714313953049853e-23,-2.0941227620432838e-23,-3.7294447092571915e-21,7.3291294849837138e-10,7.2987364250496839e-23,-1.0052210292198078e-23,-4.6468213748293522e-17,-8.7733289910780504e-24,-9.1923229180734092e-11,-8.3842795874978302e-21,4.2463516669025957e-21,2.4447531659049516e-23,-7.0962524403331646e-19,-2.2101183432591203e-12,-5.3419817195633987e-24,-6.3215729628348536e-24,5.027042330603311e-24,-4.4299333717344535e-15,-1.8893453787471431e-23,-4.6121212495870096e-22,-7.6620741714125092e-11,-5.4443348758710071e-24,0.018670578475709909,-6.9902183431503421e-14,-1.2473183520562402e-22,7.3845997152142832e-23,-2.3539396441433918e-17,-6.9029469728048952e-11,1.0289495901894652e-24,5.8909973913386143e-21,9.3017506174212741e-25,2.437350219734725e-20,6.193828291493756e-17,-5.0683626956933889e-20,-8.9629294103836468e-25,4.3774353877156721e-21,-4.475352516637614e-25,-9.5096358216472084e-24,-2.0316638422811296e-23,-4.8938204636764113e-23,3.1652541148363738e-25,5.7572479793614267e-25,2.4046507756688802e-25,-1.3465443876759491e-17,6.093352356816872e-23,2.9620922583375829e-25,-7.2926964562211917e-25,-1.1759073375014923e-24,1.7090410115272047e-23,-1.1982201577040312e-18,0.017742246097083844,0.017710795681992998,1.9200903251096187e-21,5.2728727798325115e-20,2.0030708706186989e-24,2.9016987610997636e-18,9.8872163450473463e-23,-4.4798838690345123e-11,-1.1199599859650086e-19,-3.0356827680991645e-21,3.9107319580746467e-26,1.7423823966986572e-25,-5.7996565341924241e-26,4.054616845608245,4.2159178709801841e-26,-2.3912115086530577e-26,-8.2483900340900278e-20,2.1514249138589507e-17,-3.0193317937067483e-24,1.5644921603606954e-26,1.9332764537531062e-26,-3.8903729445139391e-26,-1.2590126136202124e-26,1.04508807255702e-26,-3.4417517684430218e-25,4.7472391810466618e-12,-2.2560264296746012e-14,2.0302555867793667e-20,3.9841922779918362e-25,-6.4741506130968778e-27,-4.8301391449381581e-07,-5.1782026140529993e-23,-6.4538527828370042e-21,-2.0553760223938063e-22,-1.7525264762638684e-25,2.6113991072551097e-10,-3.3552241555752679e-27,-9.4915184905218977e-25,7.8350179603995333e-27,4.8613295285250757e-27,6.8724120915276373e-23,3.7286148402394737e-12,-1.2162686848152086e-26,1.5006663770038309e-25,1.5782135733748928e-21,2.5740150515623784e-26,1.0819724643388872e-27,-4.3139314421116004e-07,-8.5922255378811941e-28,1.9421995871628931e-26,-1.6046327922187932e-27,4.1184913937422172,7.8220079976217998e-21,-1.245284991334013e-27,1.7856626957273654e-22,-4.3422137032387747e-28,1.1401285060922567e-16,6.8822188312530839e-14,2.7099094508354427e-27,-1.5777935631146388e-19,5.7674559096856085e-28,1.333685754438785e-25,3.5505485530015272e-28,3.2520646497925203e-28,-6.4623040939746317e-25,0.015906254266975527,-1.7381200884826226e-25,1.8132288439484198e-10,2.5158335609568475e-12,2.4802459391452264e-12,-2.0742245225720335e-28,1.9976462874667219e-27,8.2198504288704739e-23,-1.8008472989499945e-09,-8.8153932787788371e-15,1.6599858051768585e-10,-1.2470746275318424e-28,7.2248033547430899e-29,-8.5438045524544332e-28,-5.0416610174084049e-24,1.0829102032030604e-28,-2.9228789717304372e-13,3.5394385212561085e-18,-1.0537197965699149e-28,4.3477827879912743e-27,-6.9593698296064167e-20,-6.2281520844443709e-27,-7.6304091860921014e-25,1.4414578680134642e-10,4.0298890440420371e-23,-6.9340918881885346e-22,1.9953258060756579e-19,-1.1171983266360312e-17,1.7736450535834118e-12,9.2194804338308215e-28,1.7771597091315435e-19,2.4574153144102965e-18,-3.4602112012727883e-29,-2.0092532733986943e-29,-4.9935017345632116e-22,-4.7319890732454526e-29,8.8852169294552563e-30,1.2973450807811682e-21,-4.3217020269503671e-22,-1.6040834080926433e-24,-1.2831552491663836e-28,-6.7609221623028204e-28,-3.3309903551548546e-21,-2.5994423238541104e-29,2.6731391232159159e-27,8.155103029606089e-27,8.9552819337762364e-30,2.6516492842381968e-26,-3.8769155831083482e-30,1.0350419478746921e-19,9.9532699431977444e-23,1.3483980605532432e-23,-2.7872128605605645e-30,1.9739630094618175e-28,-3.1451053356395151e-23,4.4370818086959669e-30,1.3942642529244639e-29,1.5348713471554069e-28,6.4855551627593209e-21,0.014540472926246705,-2.1017737219848209e-20,3.3067453076035385e-28,7.212563456132415e-20,-2.2371364238371888e-23,1.5041275051451743e-08,-2.0752850902372359e-23,8.7605666491132155e-29,9.1208504885759453e-11,4.2438236494844679,5.5474594966269738e-30,4.8140894641604515e-23,5.639088254714546e-20,-9.1229977153836691e-31,1.7657142788810331e-17,5.7624568453647776e-06,-1.3656638463521683e-20,-6.7088869209446723e-31,-1.0872485708734919e-21,-1.7979055947313068e-24,2.3456676085233055e-26,-1.1852659598998361e-20,-9.9306954386768269e-27,3.1444805358651695e-23,-9.006740931675521e-23,3.9042466814136747e-16,-8.4198747786529575e-23,1.2862963001255982e-08,8.3673444388739967e-26,1.2854411292234506e-17,-1.1611973667282675e-28,2.9878006539130174e-24,-7.572776332337475e-32,-7.6869538367932414e-24,-1.0119779537135234e-29,2.0686199769599051e-23,-6.0285751920189671e-23,-6.6562918123277518e-24,-5.4426181552858398e-31,7.1236225652566621e-13,-6.4014999385112627e-12,4.2887677064046716,5.1457278001267464e-06,3.5293287823033162e-30,1.1435560625546887e-08,-2.6814408322807571e-32,6.534403351971333e-13,5.1863909763189725e-32,2.1727514382721614e-20,-2.0359288121440713e-07,-8.4600117908184184e-20,3.1376390938757464e-26,4.303762212868655,1.0757019803933794e-08,-1.1558501293342767e-26,0.013462860562200248,1.0541648518820549e-08,5.6620688243750336e-11,-5.2641788895179471e-12,5.5784353683244808e-13,-8.5232436361369947e-29,-5.1930745025572996e-32,-4.8448553974025914e-32,6.4113048097356634e-18,4.6829286815690301e-33,1.3700337447147397e-32,-1.283902071603015e-27,-1.861001969912324e-31,-2.6706635967622981e-33,-4.1359214855967647e-33,2.4637577934815522e-27,7.9827411488509255e-22,1.3154869282346305e-26,5.9489676543485947e-30,-2.799496699394733e-21,3.8199831533360789e-28,-1.7026304705168508e-24,5.0362001586184503e-24,-2.6322137083670398e-26,1.4597557458275925e-33,-1.7262656438924034e-07,4.3422481267588138,-5.7223913595885141e-33,-6.0129322888621804e-28,4.3499147285175317e-06,2.853190889768496e-31,-1.2138564472650607e-24,2.5398324467751987e-31,-1.9449485729741888e-32,-7.4251427507867653e-19,-1.0710536553604895e-23,1.0730259952554516e-33,3.6547090926841234e-29,2.2491637589557072e-32,2.1124091755481853e-32,5.2168239914808619e-27,-2.1619208094085741e-33,2.6404273192863021e-24,-9.0477531530397883e-34,3.4867091295034253e-13,4.9971299905181641e-15,-2.0556680856328184e-34,2.9979841155633173e-18,1.1283666079987533e-19,-1.2492539629025337e-33,-5.3572375168823584e-19,-4.1729669294980476e-29,2.6393929433721881e-32,-8.3067111380796969e-27,3.952869422830327e-06,1.5704183184936578e-29,2.1724331723532133e-31,6.9226281386089027e-33,-6.3114906925623915e-30,-9.5827230598167613e-28,8.9884598128104816e-34,-5.4797649434588987e-16,-9.3293611122075178e-22,1.364415652607829e-25,1.4151207117138556e-31,-3.966075630279882e-25,1.2340988147051354e-25,-8.1546348037159379e-35,3.640382476926275e-15,8.2484830509389998e-30,-1.7802739604931649e-29,-1.8920776772938167e-31,1.0331341792844227e-24,8.7814168298483106e-32,4.4028639476773099,1.6551394333495987e-22,6.2430597969058526e-20,1.2455279398699829e-27,1.1433861012139672e-30,1.6948034625941964e-28,-1.1919498634011101e-31,2.3049768148760809e-13,1.5216428730930211e-32,-5.7668043905784226e-29,6.8095480614915235e-26,-9.2409106231855666e-32,1.6592247937230786e-34,-1.971494287551367e-25,6.0605718629387017e-09,3.5792150605803135e-34,-2.0601663688157196e-34,-1.7702196535706202e-32,-9.1448014962261927e-21,1.0475146609516276e-22,5.3088453875875448e-27,4.7650095595232707e-26,1.3734378154216094e-29,6.2028180521535048e-24,-8.0381416309150809e-21,1.772159389774619e-33,0.011864184281167438,-1.0474736632015263e-32,6.8132357082602036e-29,-1.1995954721087283e-25,1.3414976340124301e-33,-3.3893666727517366e-32,3.3850478886797106e-20,7.422513693723655e-36,-7.2815724637506817e-33,1.0171586242955979e-33,-1.9305390878219518e-29,1.2390400903369473e-32,3.0471764601666696e-33,-3.0522222262561744e-10,3.5641586085652438e-17,3.8075014366916532e-24,2.5194274124707968e-35,-2.3509668971164952e-30,3.5135673176364433e-24,-6.9581603778946809e-27,1.0528104243690578e-21,3.1019704282382373e-06,1.4908047091688018e-31,3.1111647289621872e-17,2.3996519458859035e-36,-7.159405276000203e-35,-5.9624094422516287e-28,4.4657841767003514,-2.7498332196008911e-10,-1.9059980248781141e-35,-1.0568159045251271e-36,-1.0286670205568742e-07,-2.2218827977438431e-36,-4.0521731677084369e-32,-9.1689875409074289e-24,-4.3760996906278603e-28,-4.0256908713908553e-27,2.5252346986790792e-17,2.0710910795115311e-24,-6.1900541295752588e-30,-5.4574941483616095e-37,1.7075792899361299e-11,2.3457745254953456e-17,-2.5727003869268197e-32,1.6714081257574915e-36,-7.4133038723980819e-31,4.4874099908804075,2.8377298180597767e-06,-2.053872367293964e-32,2.8186664150979268e-06,4.4505290310469658e-37,1.10580088768866e-13,0.011174192887452521,0.011161709471417586,4.4963775174407834,-2.5408907263063824e-26,0.011124426014995846,-1.1704844761958216e-35,-4.3918317582838543e-31,1.6836988516885113e-31,-2.214117776022048e-10,6.0459698876174431e-29,1.1156437212880258e-24,-2.6056865009398416e-36,-9.6344704251537297e-15,3.8895879851161924e-09,-3.1941357053766208e-31,4.0864485996242866e-37,1.1658156814544918e-31,-2.0860969769371199e-10,-5.6096940103818717e-20,4.2979059021894538e-29,3.3043535964389871e-19,-1.0171416428419889e-12,-0.00011893645193940983,-1.5870805846677581e-30,-6.5846418176741773e-23,4.5217200547754439,4.8066118487751252e-34,-4.9776498738778129e-35,-4.1742224825683907e-38,1.6972057206844393e-36,-1.9161066671706081e-10,1.5661770532558888e-37,4.4354445790372247e-37,-1.2111048877830476e-38,2.9400973727434622e-27,-7.7790635692657325e-29,2.5472155873437719e-19,-4.0336829150982098e-20,-2.8838289998827737e-35,-1.8078658112486518e-10,3.3137021981804089e-36,-6.41334550554919e-29,-1.5482190807812206e-18,2.7625494533409392e-31,9.1135929834330283e-24,-2.0444067882910429e-35,-8.7127322462220551e-35,3.2359784477590165e-09,-3.3427542477139994e-20,-2.0334204235343503e-33,-8.9686409704320711e-38,1.4779500090211112e-29,7.0552531809853475e-36,-6.1894518610060723e-15,5.0909850548882888e-21,1.3063977964641841e-38,-7.533333206194114e-13,-6.0434301993526173e-32,1.4759493933027616e-27,-5.2653912176728385e-27,-4.5477847756157989e-35,9.1234035325243508e-39,4.3051953791198664e-36,-1.1280850486025267e-33,8.4410248469063902e-35,1.211149986233624e-27,-2.4695290930383002e-20,2.1710035531911689e-37,0.010384433550484899,-2.6479251972927055e-30,2.5459290511617327e-25,8.2061872044822291e-31,-2.3971557418414828e-30,3.0752755198383532e-34,-2.2804476202473956e-23,-9.9681629628907062e-25,1.3499335340049466e-37,-9.2614746061883578e-19,-2.002827253108959e-29,7.3874848246221193e-32,1.0944988099692014e-37,-5.4253896916658597e-38,8.1977362236605906e-39,-4.3993743154095401e-26,-1.7784761533332845e-31,-1.354508068768374e-10,-7.7767440266774665e-25,6.5664621587784101e-28,-5.8335751542422705e-37,-4.7489395142990571e-22,8.5196110656683481e-23,-3.6175812192271616e-26,-1.3483510964270991e-31,-1.10073343399689e-37,2.5362155209898263e-09,-3.2823908396736258e-26,-6.2205115474340807e-08,1.3489972262350348e-25,1.0465510655999644e-39,2.7553274736375076e-24,-9.6107107565303625e-31]}
},{}],159:[function(require,module,exports){
module.exports={"n":[17,2,19,17,2,20,19,4,13,6,2,11,5,3,11,20,20,20,20,20,3,15,20,20,20,2,10,16,16,6,2,0,8,2,19,13,16,18,20,10,13,16,0,7,17,4,19,14,14,8,15,15,15,9,8,8,13,3,3,6,14,16,0,6,5,18,0,3,2,20,17,17,14,2,6,16,19,10,0,13,9,2,8,4,16,1,16,0,3,8,10,9,9,10,13,16,14,19,15,16,5,14,14,0,13,14,3,13,2,9,10,16,20,12,7,18,12,16,4,0,15,17,5,17,10,19,14,8,18,8,20,12,11,3,2,15,3,4,5,17,17,20,5,6,17,6,5,0,19,4,7,19,4,17,5,20,12,16,9,20,7,1,17,16,12,12,11,15,19,14,6,14,15,8,15,11,7,4,11,11,1,8,1,7,11,12,16,7,19,20,2,3,11,8,9,8,0,15,7,8,3,19,16,9,6,18,11,13,3,2,12,9,5,7,13,11,14,15,15,20,9,15,1,19,4,10,19,11,3,10,17,9,11,11,20,9,1,17,9,12,2,10,20,20,0,0,16,20,17,7,18,14,1,7,8,17,5,0,16,13,9,15,19,2,3,20,5,2,3,5,2,16,18,1,12,13,11,0,3,14,17,11,13,9,7,4,10,2,8,8,1,16,5,0,2,5,3,10,5,17,8,20,1,17,18,6,19,1,10,5,10,11,7,18,18,7,7,0,2,3,16,18,8,4,5,5,8,10,2,4,2,10,19,20,20,13,12,15,1,9,4,11,7,1,17,6,0,8,0,19,3,16,13,5,15,2,13,10,9,7,11,15,6,6,15,13,3,17,14,6,3,8,7,7,13,17,16,14,1,7,19,9,16,6,10,19,9,10,9,15,6,2,10,8,10,18,17,7,16,19,13,11,7,2,17,4,11,19,7,20,19,5,18,0,11,8,13,16,12,10,4,11,6,0,9,18,4,4,17,18,4,9,4,3,3,5,4,16,9,9,6,1,19,13,9,13,3,12,19,15,20,7,9,14,2,14,5,3,8,2,12,9,5,0,12,16,14,3,4,17,2,6,6,13,6,8,8,16,10,2,1,20,5,3,16,16,0,5,19,5,15,2,10,7,12,5,4,20,9,4,20,12,11,4,10,3,4,8,10,8,13,3,14,6,8,13,7,3,20,16,0,18,18,20,19,0,16,12,2,16,5,6,7,2,14,6,2,17,15,4,2,10,13,0,10,0,16,6,15,2,18,8,18,7,7,15,14,1,4,10,0,8,15,14,10,5,10,8,18,5,12,19,12,9,18,12,16,10,12,10,3,5,5,6,18,10,0,12,10,6,3,20,20,4,14,15,10,6,9,6,1,20,14,11,0,18,1,19,10,14,2,6,17,1,17,4,15,14,3,4,13,8,10,19,20,2,13,13,16,9,9,9,9,5,17,10,1,19,2,1,3,14,8,12,17,3,16,8,1,5,8,18,11,19,8,12,13,3,13,10,6,17,9,7,0,17,20,6,3,3,2,10,7,4,4,18,10,4,7,12,19,18,19,8,1,19,15,3,5,20,8,11,11,12,19,2,8,11,20,11,6,6,14,2,13,15,11,5,14,17,13,3,3,6,2,18,20,14,3,15,0,1,11,2,18,1,14,0,3,9,7,13,9,11,20,10,3,7,17,5,13,4,7,3,4,12,8,15,10,18,2,14,12,4,4,10,8,0,12,15,5,13,6,1,12,9,5,20,17,11,20,18,15,16,7,4,12,19,2,7,19,17,18,6,17,6,5,13,12,12,0,1,8,16,6,10,3,10,3,9,8,8,1,16,12,20,9,15,14,13,14,1,13,13,0,11,1,6,6,6,11,13,13,20,8,10,17,15,15,5,20,6,11,15,6,14,2,14,12,1,16,9,8,14,1,1,5,1,3,11,5,5,9,10,11,2,9,1,18,2,10,20,19,15,13,5,20,15,5,8,14,9,6,1,14,12,14,10,1,18,5,19,4,19,14,6,17,16,7,4,16,9,14,10,0,4,12,14,8,20,19,13,0,5,9,9,8,0,9,9,16,20,6,6,16,4,9,5,0,16,3,10,15,8,9,4,3,11,7,15,12,5,4,11,15,15,5,6,19,16,5,17,16,0,3,18,6,12,1,1,12,19,14,19,11,20,8,18,13,19,13,19,14,0,13,16,19,0,4,12,14,13,4,6,2,2,12,2,9,20,9,11,13,13,16,14,7,1,13,4,8,9,17,0,17,1,5,7,12,6],"x":[1e-10,1.001100900900901e-06,2.0021018018018017e-06,3.0031027027027027e-06,4.0041036036036041e-06,5.0051045045045055e-06,6.0061054054054061e-06,7.0071063063063066e-06,8.008107207207208e-06,9.0091081081081094e-06,1.0010109009009011e-05,1.101110990990991e-05,1.2012110810810812e-05,1.3013111711711713e-05,1.4014112612612613e-05,1.5015113513513514e-05,1.6016114414414416e-05,1.7017115315315317e-05,1.8018116216216219e-05,1.901911711711712e-05,2.0020118018018021e-05,2.1021118918918919e-05,2.2022119819819821e-05,2.3023120720720722e-05,2.4024121621621624e-05,2.5025122522522525e-05,2.6026123423423426e-05,2.7027124324324328e-05,2.8028125225225226e-05,2.9029126126126127e-05,3.0030127027027029e-05,3.103112792792793e-05,3.2032128828828831e-05,3.3033129729729733e-05,3.4034130630630634e-05,3.5035131531531536e-05,3.6036132432432437e-05,3.7037133333333338e-05,3.803813423423424e-05,3.9039135135135141e-05,4.0040136036036043e-05,4.1041136936936937e-05,4.2042137837837839e-05,4.304313873873874e-05,4.4044139639639641e-05,4.5045140540540543e-05,4.6046141441441444e-05,4.7047142342342346e-05,4.8048143243243247e-05,4.9049144144144148e-05,5.005014504504505e-05,5.1051145945945951e-05,5.2052146846846852e-05,5.3053147747747754e-05,5.4054148648648655e-05,5.5055149549549557e-05,5.6056150450450451e-05,5.7057151351351353e-05,5.8058152252252254e-05,5.9059153153153155e-05,6.0060154054054057e-05,6.1061154954954958e-05,6.2062155855855853e-05,6.3063156756756761e-05,6.4064157657657656e-05,6.506515855855855e-05,6.6066159459459458e-05,6.7067160360360353e-05,6.8068161261261261e-05,6.9069162162162156e-05,7.0070163063063064e-05,7.1071163963963959e-05,7.2072164864864867e-05,7.3073165765765761e-05,7.407416666666667e-05,7.5075167567567564e-05,7.6076168468468472e-05,7.7077169369369367e-05,7.8078170270270275e-05,7.907917117117117e-05,8.0080172072072078e-05,8.1081172972972973e-05,8.2082173873873867e-05,8.3083174774774775e-05,8.408417567567567e-05,8.5085176576576578e-05,8.6086177477477473e-05,8.7087178378378381e-05,8.8088179279279276e-05,8.9089180180180184e-05,9.0090181081081078e-05,9.1091181981981987e-05,9.2092182882882881e-05,9.3093183783783789e-05,9.4094184684684684e-05,9.5095185585585592e-05,9.6096186486486487e-05,9.7097187387387381e-05,9.809818828828829e-05,9.9099189189189184e-05,0.00010010019009009009,0.00010110119099099099,0.0001021021918918919,0.00010310319279279279,0.0001041041936936937,0.00010510519459459459,0.0001061061954954955,0.0001071071963963964,0.0001081081972972973,0.0001091091981981982,0.00011011019909909911,0.0001111112,0.0001121122009009009,0.0001131132018018018,0.0001141142027027027,0.00011511520360360361,0.0001161162045045045,0.00011711720540540541,0.0001181182063063063,0.00011911920720720721,0.00012012020810810811,0.00012112120900900901,0.00012212220990990994,0.00012312321081081083,0.00012412421171171173,0.00012512521261261262,0.00012612621351351354,0.00012712721441441444,0.00012812821531531533,0.00012912921621621623,0.00013013021711711712,0.00013113121801801804,0.00013213221891891894,0.00013313321981981983,0.00013413422072072073,0.00013513522162162165,0.00013613622252252254,0.00013713722342342344,0.00013813822432432433,0.00013913922522522525,0.00014014022612612615,0.00014114122702702704,0.00014214222792792794,0.00014314322882882886,0.00014414422972972975,0.00014514523063063065,0.00014614623153153154,0.00014714723243243244,0.00014814823333333336,0.00014914923423423425,0.00015015023513513515,0.00015115123603603604,0.00015215223693693697,0.00015315323783783786,0.00015415423873873875,0.00015515523963963965,0.00015615624054054057,0.00015715724144144147,0.00015815824234234236,0.00015915924324324325,0.00016016024414414418,0.00016116124504504507,0.00016216224594594597,0.00016316324684684686,0.00016416424774774775,0.00016516524864864868,0.00016616624954954957,0.00016716725045045047,0.00016816825135135136,0.00016916925225225228,0.00017017025315315318,0.00017117125405405407,0.00017217225495495497,0.00017317325585585589,0.00017417425675675678,0.00017517525765765768,0.00017617625855855857,0.00017717725945945947,0.00017817826036036039,0.00017917926126126128,0.00018018026216216218,0.00018118126306306307,0.00018218226396396399,0.00018318326486486489,0.00018418426576576578,0.00018518526666666668,0.0001861862675675676,0.00018718726846846849,0.00018818826936936939,0.00018918927027027028,0.0001901902711711712,0.0001911912720720721,0.00019219227297297299,0.00019319327387387389,0.00019419427477477478,0.0001951952756756757,0.0001961962765765766,0.00019719727747747749,0.00019819827837837839,0.00019919927927927931,0.0002002002801801802,0.0002012012810810811,0.00020220228198198199,0.00020320328288288292,0.00020420428378378381,0.00020520528468468471,0.0002062062855855856,0.00020720728648648652,0.00020820828738738742,0.00020920928828828831,0.00021021028918918921,0.0002112112900900901,0.00021221229099099102,0.00021321329189189192,0.00021421429279279281,0.00021521529369369371,0.00021621629459459463,0.00021721729549549552,0.00021821829639639642,0.00021921929729729731,0.00022022029819819823,0.00022122129909909913,0.00022222230000000002,0.00022322330090090092,0.00022422430180180181,0.00022522530270270273,0.00022622630360360363,0.00022722730450450452,0.00022822830540540542,0.00022922930630630634,0.00023023030720720723,0.00023123130810810813,0.00023223230900900902,0.00023323330990990994,0.00023423431081081084,0.00023523531171171173,0.00023623631261261263,0.00023723731351351355,0.00023823831441441444,0.00023923931531531534,0.00024024031621621623,0.00024124131711711713,0.00024224231801801805,0.00024324331891891894,0.00024424431981981984,0.00024524532072072071,0.00024624632162162163,0.0002472473225225225,0.00024824832342342342,0.00024924932432432434,0.00025025032522522521,0.00025125132612612613,0.00025225232702702705,0.00025325332792792792,0.00025425432882882884,0.00025525532972972971,0.00025625633063063063,0.00025725733153153155,0.00025825833243243242,0.00025925933333333334,0.00026026033423423421,0.00026126133513513513,0.00026226233603603605,0.00026326333693693692,0.00026426433783783784,0.00026526533873873876,0.00026626633963963963,0.00026726734054054055,0.00026826834144144142,0.00026926934234234234,0.00027027034324324326,0.00027127134414414413,0.00027227234504504505,0.00027327334594594592,0.00027427434684684684,0.00027527534774774776,0.00027627634864864863,0.00027727734954954955,0.00027827835045045047,0.00027927935135135134,0.00028028035225225226,0.00028128135315315313,0.00028228235405405405,0.00028328335495495497,0.00028428435585585584,0.00028528535675675676,0.00028628635765765768,0.00028728735855855855,0.00028828835945945947,0.00028928936036036034,0.00029029036126126126,0.00029129136216216218,0.00029229236306306305,0.00029329336396396397,0.00029429436486486484,0.00029529536576576576,0.00029629636666666668,0.00029729736756756755,0.00029829836846846847,0.0002992993693693694,0.00030030037027027026,0.00030130137117117118,0.00030230237207207205,0.00030330337297297297,0.0003043043738738739,0.00030530537477477476,0.00030630637567567569,0.00030730737657657655,0.00030830837747747747,0.0003093093783783784,0.00031031037927927926,0.00031131138018018019,0.00031231238108108111,0.00031331338198198197,0.0003143143828828829,0.00031531538378378376,0.00031631638468468469,0.00031731738558558561,0.00031831838648648647,0.0003193193873873874,0.00032032038828828832,0.00032132138918918919,0.00032232239009009011,0.00032332339099099098,0.0003243243918918919,0.00032532539279279282,0.00032632639369369369,0.00032732739459459461,0.00032832839549549548,0.0003293293963963964,0.00033033039729729732,0.00033133139819819819,0.00033233239909909911,0.00033333340000000003,0.0003343344009009009,0.00033533540180180182,0.00033633640270270269,0.00033733740360360361,0.00033833840450450453,0.0003393394054054054,0.00034034040630630632,0.00034134140720720719,0.00034234240810810811,0.00034334340900900903,0.0003443444099099099,0.00034534541081081082,0.00034634641171171174,0.00034734741261261261,0.00034834841351351353,0.0003493494144144144,0.00035035041531531532,0.00035135141621621624,0.00035235241711711711,0.00035335341801801803,0.0003543544189189189,0.00035535541981981982,0.00035635642072072074,0.00035735742162162161,0.00035835842252252253,0.00035935942342342345,0.00036036042432432432,0.00036136142522522524,0.00036236242612612611,0.00036336342702702703,0.00036436442792792795,0.00036536542882882882,0.00036636642972972974,0.00036736743063063066,0.00036836843153153153,0.00036936943243243245,0.00037037043333333332,0.00037137143423423424,0.00037237243513513516,0.00037337343603603603,0.00037437443693693695,0.00037537543783783782,0.00037637643873873874,0.00037737743963963966,0.00037837844054054053,0.00037937944144144145,0.00038038044234234237,0.00038138144324324324,0.00038238244414414416,0.00038338344504504503,0.00038438444594594595,0.00038538544684684688,0.00038638644774774774,0.00038738744864864866,0.00038838844954954953,0.00038938945045045045,0.00039039045135135138,0.00039139145225225224,0.00039239245315315316,0.00039339345405405409,0.00039439445495495495,0.00039539545585585588,0.00039639645675675674,0.00039739745765765766,0.00039839845855855859,0.00039939945945945945,0.00040040046036036038,0.00040140146126126124,0.00040240246216216217,0.00040340346306306309,0.00040440446396396395,0.00040540546486486488,0.0004064064657657658,0.00040740746666666667,0.00040840846756756759,0.00040940946846846845,0.00041041046936936938,0.0004114114702702703,0.00041241247117117117,0.00041341347207207209,0.00041441447297297301,0.00041541547387387388,0.0004164164747747748,0.00041741747567567567,0.00041841847657657659,0.00041941947747747751,0.00042042047837837838,0.0004214214792792793,0.00042242248018018017,0.00042342348108108109,0.00042442448198198201,0.00042542548288288288,0.0004264264837837838,0.00042742748468468472,0.00042842848558558559,0.00042942948648648651,0.00043043048738738738,0.0004314314882882883,0.00043243248918918922,0.00043343349009009009,0.00043443449099099101,0.00043543549189189188,0.0004364364927927928,0.00043743749369369372,0.00043843849459459459,0.00043943949549549551,0.00044044049639639643,0.0004414414972972973,0.00044244249819819822,0.00044344349909909909,0.00044444450000000001,0.00044544550090090093,0.0004464465018018018,0.00044744750270270272,0.00044844850360360359,0.00044944950450450451,0.00045045050540540543,0.0004514515063063063,0.00045245250720720722,0.00045345350810810814,0.00045445450900900901,0.00045545550990990993,0.0004564565108108108,0.00045745751171171172,0.00045845851261261264,0.00045945951351351351,0.00046046051441441443,0.00046146151531531535,0.00046246251621621622,0.00046346351711711714,0.00046446451801801801,0.00046546551891891893,0.00046646651981981985,0.00046746752072072072,0.00046846852162162164,0.00046946952252252251,0.00047047052342342343,0.00047147152432432435,0.00047247252522522522,0.00047347352612612614,0.00047447452702702707,0.00047547552792792793,0.00047647652882882885,0.00047747752972972972,0.00047847853063063064,0.00047947953153153157,0.00048048053243243243,0.00048148153333333336,0.00048248253423423422,0.00048348353513513514,0.00048448453603603607,0.00048548553693693693,0.00048648653783783786,0.00048748753873873878,0.00048848853963963975,0.00048948954054054057,0.00049049054144144149,0.00049149154234234241,0.00049249254324324333,0.00049349354414414425,0.00049449454504504507,0.00049549554594594599,0.00049649654684684691,0.00049749754774774783,0.00049849854864864875,0.00049949954954954957,0.00050050055045045049,0.00050150155135135141,0.00050250255225225233,0.00050350355315315325,0.00050450455405405418,0.00050550555495495499,0.00050650655585585591,0.00050750755675675683,0.00050850855765765775,0.00050950955855855868,0.00051051055945945949,0.00051151156036036041,0.00051251256126126133,0.00051351356216216225,0.00051451456306306318,0.00051551556396396399,0.00051651656486486491,0.00051751756576576583,0.00051851856666666675,0.00051951956756756768,0.00052052056846846849,0.00052152156936936941,0.00052252257027027033,0.00052352357117117125,0.00052452457207207218,0.0005255255729729731,0.00052652657387387391,0.00052752757477477483,0.00052852857567567575,0.00052952957657657668,0.0005305305774774776,0.00053153157837837841,0.00053253257927927933,0.00053353358018018025,0.00053453458108108118,0.0005355355819819821,0.00053653658288288291,0.00053753758378378383,0.00053853858468468475,0.00053953958558558568,0.0005405405864864866,0.00054154158738738741,0.00054254258828828833,0.00054354358918918926,0.00054454459009009018,0.0005455455909909911,0.00054654659189189191,0.00054754759279279283,0.00054854859369369376,0.00054954959459459468,0.0005505505954954956,0.00055155159639639652,0.00055255259729729733,0.00055355359819819826,0.00055455459909909918,0.0005555556000000001,0.00055655660090090102,0.00055755760180180183,0.00055855860270270276,0.00055955960360360368,0.0005605606045045046,0.00056156160540540552,0.00056256260630630633,0.00056356360720720726,0.00056456460810810818,0.0005655656090090091,0.00056656660990991002,0.00056756761081081083,0.00056856861171171176,0.00056956961261261268,0.0005705706135135136,0.00057157161441441452,0.00057257261531531544,0.00057357361621621626,0.00057457461711711718,0.0005755756180180181,0.00057657661891891902,0.00057757761981981994,0.00057857862072072076,0.00057957962162162168,0.0005805806225225226,0.00058158162342342352,0.00058258262432432444,0.00058358362522522526,0.00058458462612612618,0.0005855856270270271,0.00058658662792792802,0.00058758762882882894,0.00058858862972972976,0.00058958963063063068,0.0005905906315315316,0.00059159163243243252,0.00059259263333333344,0.00059359363423423426,0.00059459463513513518,0.0005955956360360361,0.00059659663693693702,0.00059759763783783794,0.00059859863873873887,0.00059959963963963968,0.0006006006405405406,0.00060160164144144152,0.00060260264234234244,0.00060360364324324337,0.00060460464414414418,0.0006056056450450451,0.00060660664594594602,0.00060760764684684694,0.00060860864774774787,0.00060960964864864868,0.0006106106495495496,0.00061161165045045052,0.00061261265135135144,0.00061361365225225237,0.00061461465315315318,0.0006156156540540541,0.00061661665495495502,0.00061761765585585594,0.00061861865675675687,0.00061961965765765779,0.0006206206585585586,0.00062162165945945952,0.00062262266036036045,0.00062362366126126137,0.00062462466216216229,0.0006256256630630631,0.00062662666396396402,0.00062762766486486495,0.00062862866576576587,0.00062962966666666679,0.0006306306675675676,0.00063163166846846852,0.00063263266936936945,0.00063363367027027037,0.00063463467117117129,0.0006356356720720721,0.00063663667297297302,0.00063763767387387395,0.00063863867477477487,0.00063963967567567579,0.00064064067657657671,0.00064164167747747752,0.00064264267837837845,0.00064364367927927937,0.00064464468018018029,0.00064564568108108121,0.00064664668198198202,0.00064764768288288295,0.00064864868378378387,0.00064964968468468479,0.00065065068558558571,0.00065165168648648652,0.00065265268738738745,0.00065365368828828837,0.00065465468918918929,0.00065565569009009021,0.00065665669099099102,0.00065765769189189195,0.00065865869279279287,0.00065965969369369379,0.00066066069459459471,0.00066166169549549553,0.00066266269639639645,0.00066366369729729737,0.00066466469819819829,0.00066566569909909921,0.00066666670000000013,0.00066766770090090095,0.00066866870180180187,0.00066966970270270279,0.00067067070360360371,0.00067167170450450463,0.00067267270540540545,0.00067367370630630637,0.00067467470720720729,0.00067567570810810821,0.00067667670900900913,0.00067767770990990995,0.00067867871081081087,0.00067967971171171179,0.00068068071261261271,0.00068168171351351363,0.00068268271441441445,0.00068368371531531537,0.00068468471621621629,0.00068568571711711721,0.00068668671801801813,0.00068768771891891906,0.00068868871981981987,0.00068968972072072079,0.00069069072162162171,0.00069169172252252263,0.00069269272342342356,0.00069369372432432437,0.00069469472522522529,0.00069569572612612621,0.00069669672702702713,0.00069769772792792806,0.00069869872882882887,0.00069969972972972979,0.00070070073063063071,0.00070170173153153164,0.00070270273243243256,0.00070370373333333337,0.00070470473423423429,0.00070570573513513521,0.00070670673603603614,0.00070770773693693706,0.00070870873783783787,0.00070970973873873879,0.00071071073963963971,0.00071171174054054064,0.00071271274144144156,0.00071371374234234248,0.00071471474324324329,0.00071571574414414421,0.00071671674504504514,0.00071771774594594606,0.00071871874684684698,0.00071971974774774779,0.00072072074864864871,0.00072172174954954964,0.00072272275045045056,0.00072372375135135148,0.00072472475225225229,0.00072572575315315321,0.00072672675405405414,0.00072772775495495506,0.00072872875585585598,0.00072972975675675679,0.00073073075765765771,0.00073173175855855864,0.00073273275945945956,0.00073373376036036048,0.0007347347612612614,0.00073573576216216221,0.00073673676306306314,0.00073773776396396406,0.00073873876486486498,0.0007397397657657659,0.00074074076666666672,0.00074174176756756764,0.00074274276846846856,0.00074374376936936948,0.0007447447702702704,0.00074574577117117122,0.00074674677207207214,0.00074774777297297306,0.00074874877387387398,0.0007497497747747749,0.00075075077567567572,0.00075175177657657664,0.00075275277747747756,0.00075375377837837848,0.0007547547792792794,0.00075575578018018022,0.00075675678108108114,0.00075775778198198206,0.00075875878288288298,0.0007597597837837839,0.00076076078468468482,0.00076176178558558564,0.00076276278648648656,0.00076376378738738748,0.0007647647882882884,0.00076576578918918932,0.00076676679009009014,0.00076776779099099106,0.00076876879189189198,0.0007697697927927929,0.00077077079369369382,0.00077177179459459464,0.00077277279549549556,0.00077377379639639648,0.0007747747972972974,0.00077577579819819832,0.00077677679909909914,0.00077777780000000006,0.00077877880090090098,0.0007797798018018019,0.00078078080270270283,0.00078178180360360375,0.00078278280450450456,0.00078378380540540548,0.0007847848063063064,0.00078578580720720733,0.00078678680810810825,0.00078778780900900906,0.00078878880990990998,0.0007897898108108109,0.00079079081171171183,0.00079179181261261275,0.00079279281351351356,0.00079379381441441448,0.0007947948153153154,0.00079579581621621633,0.00079679681711711725,0.00079779781801801806,0.00079879881891891898,0.0007997998198198199,0.00080080082072072083,0.00080180182162162175,0.00080280282252252256,0.00080380382342342348,0.0008048048243243244,0.00080580582522522533,0.00080680682612612625,0.00080780782702702717,0.00080880882792792798,0.0008098098288288289,0.00081081082972972983,0.00081181183063063075,0.00081281283153153167,0.00081381383243243248,0.0008148148333333334,0.00081581583423423433,0.00081681683513513525,0.00081781783603603617,0.00081881883693693698,0.00081981983783783791,0.00082082083873873883,0.00082182183963963975,0.00082282284054054067,0.00082382384144144148,0.00082482484234234241,0.00082582584324324333,0.00082682684414414425,0.00082782784504504517,0.00082882884594594609,0.00082982984684684691,0.00083083084774774783,0.00083183184864864875,0.00083283284954954967,0.00083383385045045059,0.00083483485135135141,0.00083583585225225233,0.00083683685315315325,0.00083783785405405417,0.00083883885495495509,0.00083983985585585591,0.00084084085675675683,0.00084184185765765775,0.00084284285855855867,0.00084384385945945959,0.00084484486036036041,0.00084584586126126133,0.00084684686216216225,0.00084784786306306317,0.00084884886396396409,0.00084984986486486491,0.00085085086576576583,0.00085185186666666675,0.00085285286756756767,0.00085385386846846859,0.00085485486936936951,0.00085585587027027033,0.00085685687117117125,0.00085785787207207217,0.00085885887297297309,0.00085985987387387402,0.00086086087477477483,0.00086186187567567575,0.00086286287657657667,0.00086386387747747759,0.00086486487837837852,0.00086586587927927933,0.00086686688018018025,0.00086786788108108117,0.00086886888198198209,0.00086986988288288302,0.00087087088378378383,0.00087187188468468475,0.00087287288558558567,0.00087387388648648659,0.00087487488738738752,0.00087587588828828844,0.00087687688918918925,0.00087787789009009017,0.00087887889099099109,0.00087987989189189202,0.00088088089279279294,0.00088188189369369375,0.00088288289459459467,0.00088388389549549559,0.00088488489639639652,0.00088588589729729744,0.00088688689819819825,0.00088788789909909917,0.00088888890000000009,0.00088988990090090102,0.00089089090180180194,0.00089189190270270275,0.00089289290360360367,0.00089389390450450459,0.00089489490540540552,0.00089589590630630644,0.00089689690720720725,0.00089789790810810817,0.00089889890900900909,0.00089989990990991002,0.00090090091081081094,0.00090190191171171186,0.00090290291261261267,0.0009039039135135136,0.00090490491441441452,0.00090590591531531544,0.00090690691621621636,0.00090790791711711717,0.0009089089180180181,0.00090990991891891902,0.00091091091981981994,0.00091191192072072086,0.00091291292162162167,0.0009139139225225226,0.00091491492342342352,0.00091591592432432444,0.00091691692522522536,0.00091791792612612617,0.0009189189270270271,0.00091991992792792802,0.00092092092882882894,0.00092192192972972986,0.00092292293063063078,0.0009239239315315316,0.00092492493243243252,0.00092592593333333344,0.00092692693423423436,0.00092792793513513528,0.0009289289360360361,0.00092992993693693702,0.00093093093783783794,0.00093193193873873886,0.00093293293963963978,0.0009339339405405406,0.00093493494144144152,0.00093593594234234244,0.00093693694324324336,0.00093793794414414428,0.0009389389450450451,0.00093993994594594602,0.00094094094684684694,0.00094194194774774786,0.00094294294864864878,0.00094394394954954971,0.00094494495045045052,0.00094594595135135144,0.00094694695225225236,0.00094794795315315328,0.00094894895405405421,0.00094994995495495502,0.00095095095585585594,0.00095195195675675686,0.00095295295765765778,0.00095395395855855871,0.00095495495945945952,0.00095595596036036044,0.00095695696126126136,0.00095795796216216228,0.00095895896306306321,0.00095995996396396402,0.00096096096486486494,0.00096196196576576586,0.00096296296666666678,0.00096396396756756771,0.00096496496846846852,0.00096596596936936944,0.00096696697027027036,0.00096796797117117128,0.00096896897207207221,0.00096996997297297313,0.00097097097387387394,0.00097197197477477486,0.00097297297567567578,0.00097397397657657671,0.00097497497747747763,0.00097597597837837844,0.00097697697927927947,0.00097797798018018018,0.0009789789810810811,0.00097997998198198202,0.00098098098288288294,0.00098198198378378386,0.00098298298468468479,0.00098398398558558571,0.00098498498648648663,0.00098598598738738755,0.00098698698828828847,0.00098798798918918939,0.0009889889900900901,0.00098998999099099102,0.00099099099189189194,0.00099199199279279286,0.00099299299369369379,0.00099399399459459471,0.00099499499549549563,0.00099599599639639655,0.00099699699729729747,0.00099799799819819839,0.0009989989990990991,0.001],"y":[3.5568742809599978e+194,-1.9934091117466575e+18,1.1359821092142369e+131,9.0116680985328795e+113,-31154018792266032,-4.9939992306348888e+129,3.2601353264944605e+121,-1.4207501485390167e+27,1.3959247794763227e+81,-1.4947202128325279e+38,-1993946837012248.8,1.2565580188762425e+67,3.994526133245962e+31,2.0923128306803445e+20,6.9561426876630281e+65,-4.7755522515114323e+119,-1.2314710363707e+119,-3.4476235478674397e+118,-1.0380721927627693e+118,-3.3352409068284091e+117,3.7349493541584323e+19,8.9951072512135211e+86,-1.5349105477815469e+116,-6.0349907952239913e+115,-2.4690321384072018e+115,-127614892303329.98,-9.7781950891427802e+56,-9.5504167699690821e+90,-5.1466040525058559e+90,-4.1447158342647773e+34,-73851358378028.25,-32226.282988869516,-1.1356599261043892e+45,-55485669006997.703,2.797701607121017e+106,1.4832958589817666e+72,-7.1791103854326025e+88,-1.0051504817990736e+100,-1.5904545988237558e+111,-1.1304750109002315e+55,2.2874030501492732e+71,-7.8684661055934414e+87,-23786.237234899279,4.2775891867096e+38,9.1428618885921867e+92,-1.294110945482615e+23,6.6256693246505073e+103,-7.118846216489424e+75,-5.1910977654197769e+75,-2.4537912825087768e+43,8.4336226397593864e+80,6.1434409572232188e+80,4.5027856143511416e+80,2.0542413522073189e+48,-1.0234325817102343e+43,-8.6763887659997068e+42,2.0585173652990348e+69,5.6612314373844154e+17,5.280784081707376e+17,-2.8729097884831371e+32,-1.8264665572250828e+74,-9.1751747712129486e+84,-16113.455988149917,-1.8151083354387501e+32,1.7357633918820432e+27,-2.2527845730232744e+95,-15136.919346075507,2.9655931917569914e+17,-6341586759416.2852,-5.7697456941928317e+105,2.1452218327737974e+89,1.6618308188348087e+89,-1.1854816656516188e+73,-5125735918665.0811,-5.8838971923939988e+31,-2.7364172538432182e+83,2.8848417282134866e+99,-6.3617955233804319e+51,-12808.254272019956,1.6649867925953064e+67,3.3459007653532695e+46,-3752061317053.542,-2.3838607056519339e+41,-6.0624172614476303e+21,-3.9854465437295407e+82,138131330.87853611,-2.6714766616121511e+82,-11483.323656024932,99650783188456640,-1.1405015010033904e+41,-1.1436969805038231e+51,9.2257070176625572e+45,8.2705684450802334e+45,-7.973817936058683e+50,1.4601630270494515e+66,-4.9195409300040394e+81,-1.5842220445939632e+71,2.1926111760076027e+97,1.7779675204439187e+76,-2.440213770817461e+81,1.1928115419780748e+26,-7.3971474663124274e+70,-6.3809063422510692e+70,-9699.5977350869707,3.5458892659543587e+65,-4.1309091413695173e+70,47335642766381480,2.3813278728093211e+65,-1582902332315.8987,1.5175722958455951e+45,-1.2579402279520826e+50,-3.4892842316919636e+80,-2.2050283151604643e+101,-9.6530402933365309e+59,1.752721582078777e+35,-4.4138745629823737e+90,-6.8664166628618665e+59,-1.4258297704954172e+80,-1.0438233918425317e+21,-8395.5287949004269,6.9605313850879853e+74,1.1300690093737669e+85,3.6175398024095286e+25,8.4129775474968057e+84,-3.3677628007036306e+49,1.3746687257143618e+95,-2.6811924336173724e+69,-4.6491519982504423e+39,-5.768863437252874e+89,-4.0392421414788821e+39,-9.6423607269764547e+99,-1.4130506416365964e+59,1.4094542361661582e+54,19098774819947564,-828726495814.07397,1.0573108274467032e+74,17468534320021748,-4.9480545716207754e+20,1.7270226413432434e+25,9.3105655499139572e+83,8.1834769697805432e+83,-1.7514306844822846e+99,1.4549314658155297e+25,-5.8470503275451658e+29,4.928534534097471e+83,-5.3053386121405536e+29,1.2315598393098967e+25,-6796.4914021338427,4.6899162074726281e+93,-3.2516672881839322e+20,1.9508433759171526e+34,3.1395005390886666e+93,-2.943198361807213e+20,1.6549970576645651e+83,8.9422832173746911e+24,-2.3989944429248739e+98,-1.4590342320774384e+58,-9.614680192187782e+77,3.7054822217283154e+43,-1.404932440561465e+98,1.1641066204555301e+34,38501601.161848061,5.9152486148437393e+82,-5.0820605149450634e+77,-7.6157979204670715e+57,-7.0371074530016838e+57,9.0082805890734064e+52,3.51625548400101e+72,3.7171873865959957e+92,-3.2778336311943764e+67,-1.7423964673235416e+29,-2.7475516496562907e+67,2.1932540055309549e+72,-2.8786782276295754e+38,1.8228719223907734e+72,4.7806014473109993e+52,5.4306457639402526e+33,-1.3745841839607262e+20,3.8985144231085859e+52,3.6450443562627454e+52,30802473.614245124,-1.9164653749349389e+38,30129216.231898427,3.9750644561709415e+33,2.6189390557991057e+52,-1.5902058896315435e+57,-5.3890177596707173e+76,3.3436443826786903e+33,3.9196171887337364e+91,-3.7264738101733664e+96,-290713435039.85364,4490337655097382,1.5715371136328321e+52,-1.0754556464661066e+38,4.7577192798141291e+42,-9.8015961297730172e+37,-5097.5135803076737,2.5008346342130198e+71,2.1165645339351664e+33,-8.1645200232272143e+37,3735016516443784.5,1.0291526315953113e+91,-1.325124549986188e+76,3.02312310886653e+42,-4.8627120961631249e+28,-7.4947774341456226e+85,6.75356254334283e+51,2.3153144852692155e+61,3192708017168621.5,-218417337887.38327,-3.0608028584168414e+56,2.0539588583298192e+42,1.3138870813431824e+24,1.1800932673956842e+33,1.4534566870437797e+61,4.0427618368853814e+51,-8.2619401903592358e+65,5.3234009414001919e+70,4.9458510807292797e+70,-1.6891577483809079e+95,1.3526628703735804e+42,3.9743727602295434e+70,20249987.469407417,1.2891519273343078e+90,-4.2344581000389804e+19,-4.7970479631359556e+46,9.8680793244698571e+89,2.1068301175224185e+51,2211430157653138.5,-3.9517684654868089e+46,1.0768213091998216e+80,8.3041784325912449e+41,1.6221239447012001e+51,1.5405252148625196e+51,-4.202075801568744e+94,6.994197320913509e+41,17918709.535107423,6.2773242395974551e+79,6.1609396681289447e+41,-5.6952632534102125e+55,-144242195183.82657,-2.2531724505193471e+46,-2.074313200659188e+94,-1.9022398990781022e+94,-4094.8378421810066,-4078.1265778462202,-4.6487245410879761e+74,-1.3500848831064907e+94,2.7740525325447674e+79,3.3834410878753036e+32,-1.7267229433303348e+84,-8.6852617593481369e+64,15715553.551739041,2.9784426927273563e+32,-9.0804071390065626e+36,1.6808221964475491e+79,4.2377333600975374e+23,-3887.7352033623715,-2.0686916990501474e+74,1.0046128229806668e+60,2.5449731279130335e+41,2.7752195135238519e+69,5.1330573440598219e+88,-109612188848.38655,1230260306898936,-3.0820096261494619e+93,3.3673141673749858e+23,-104759235172.71048,1158440022372012.2,3.1481816866620452e+23,-101305917944.58665,-8.9691846588770138e+73,-3.4775542555534722e+83,13390768.583257919,-9.6367257684934635e+54,4.340480777291807e+59,2.0185114940688783e+50,-3607.0740145673276,1000537957314815.1,-1.7775668612038713e+64,3.1217687703646153e+78,1.6272879415217883e+50,3.0528684394295822e+59,1.0903161904590924e+41,1.1814268783803673e+32,-1.270029587749736e+19,-3.4273294124323898e+45,-84349098810.465698,-2.9314099841499972e+36,-2.8413738055260626e+36,11866832.94045647,-2.6733159193753638e+73,1.9243161990363358e+23,-3410.132225761608,-78466477481.755798,1.809845314095518e+23,778477287790069.38,-2.2628789979100977e+45,1.7032405105220824e+23,9.5755578251314244e+77,-2.0301013232320015e+36,-2.1237400015115611e+92,10942510.079511669,7.538382927169795e+77,-4.2022832437334787e+82,-2.9119998404593196e+27,2.3013034524617287e+87,10588979.247003006,-1.5167864841530913e+45,1.3703222737785181e+23,-1.4125496094715959e+45,4.8174338013309278e+49,5.5682269131475538e+31,-2.4140211717162492e+82,-2.2720620252758686e+82,5.1578565275246078e+31,5.0287150865389699e+31,-3151.9955741769245,-62007585587.77317,577098706317242.88,-5.3171840778735204e+72,-1.4944725346431047e+82,-1.0737575991532012e+36,-6.7924369641088461e+18,1.0311066108234983e+23,1.0122166322217118e+23,-9.6083919334612024e+35,-7.8515814873115198e+44,-56507313806.434425,-6.1952487804823665e+18,-55486122530.222824,-6.8686993570183859e+44,4.5044416617620697e+86,-2.5448907428190633e+91,-2.38958371964387e+91,2.7388525239985081e+58,-6.7963633759778099e+53,4.6501572985240065e+67,8735695.5068859179,1.7923387224578754e+40,-5.2558586483911014e+18,1.5954677250419435e+49,2.6714369360785493e+31,8482866.932020111,7.6770407960676437e+76,-1.2290135532727495e+27,-2887.8593381742357,-5.4782760170852865e+35,-2871.2657609561188,1.6591827690580317e+86,398236171161809,-1.1041054425498219e+72,1.3696157617550023e+58,6.1648919066994203e+22,2.1158942786911788e+67,-44569849217.693375,1.1692195859752912e+58,-2.989731361003497e+44,1.0389313970947642e+40,1.8121670697252275e+31,8.3235892856177147e+48,1.5467886056220552e+67,-8.7766824488073274e+26,-8.6088275083931802e+26,1.3549525048342306e+67,8.2432029618581905e+57,333033990522892.75,2.3947313544328538e+76,-2.7936518227676133e+62,-7.675485080708323e+26,318864383172170.69,-3.0008484931019743e+35,1.3633593396238293e+31,1.3343913089415513e+31,5.8612966820844644e+57,1.6243633546717184e+76,-3.4279802140056446e+71,-1.944327181363123e+62,6984693.2266056072,1.1744653114342734e+31,3.0250394206457389e+85,5.5740062832767305e+39,-2.6191147817000706e+71,-5.9142408586842401e+26,-1.3407233410744023e+44,2.3291014745312624e+85,4.892650332207012e+39,-1.2307278623992612e+44,4.6462221969993423e+39,4.6811516627123853e+66,-5.2100056000850289e+26,-33357691322.187599,-1.0686510735921222e+44,-1.7868017180528661e+35,-1.0104718741850806e+44,-2.9022793907091484e+80,6.0916194715318039e+75,8.1027018978582624e+30,-1.3038257487347269e+71,1.1401058283726042e+85,2.2874750323330621e+57,2.2814361990589388e+48,7.3307009235601336e+30,-30465697759.203281,4.2499280723717553e+75,-2.1916098733127816e+18,1.9662032635944084e+48,7.6650490411878541e+84,6.5113738982566946e+30,-3.3947600745896861e+89,6.6179884296048744e+84,2.4747017836976316e+22,-1.3032778561545143e+80,-2419.4623911672052,1.5557390284306819e+48,-1.0944010398572371e+35,1.3209600113930292e+57,-5.9009091542310315e+70,-3.9755375807841868e+52,-5.1360410884984297e+43,-1.8272245914568059e+18,1.2722009373204246e+48,-2.9998762632037166e+26,-2362.2783254427613,1.9131928988748843e+39,-7.222615759163031e+79,-1.7021208642905597e+18,-1.6822828472444242e+18,1.5040366462098774e+75,-6.0449908618537281e+79,-1.6244117326168266e+18,1.624219204413303e+39,-1.58715617736159e+18,170004881092796.81,168443423306542.09,1.7605091874064648e+22,-1.5156745421615764e+18,-2.6610161824650001e+70,1.382535379484762e+39,1.3513634195925575e+39,-2.2393490475820336e+26,5131612.1736665284,1.4721697992385849e+84,5.4770186697147689e+56,1.2066676538758876e+39,5.142286161261127e+56,151033592623501.38,-1.6622250124556405e+52,1.1241985931844769e+84,4.7163401059287375e+65,-4.5660006363307891e+88,2.9210681208526105e+30,1.0093296737135719e+39,-1.2371343343104908e+61,-21308787841.797619,-1.1580276970749628e+61,1.3267369029344151e+22,137008716219883.83,-4.5063005488939226e+34,-20619980512.262642,-1.1450800218341185e+52,8.2872063799718831e+38,1.2266538300246956e+22,-2158.2435903790492,-1.0231844065757333e+52,-9.2583127346076812e+69,-8.0928442071456463e+60,125645078823466.77,-1.0636755367100609e+18,2.8982460387137711e+74,-19205814944.224499,-1.390414292304421e+26,-1.3699243466790283e+26,2.1884695338403034e+56,-1.3299710437735171e+26,-3.2461381571720445e+34,-3.1852748571391115e+34,-6.0037091130245768e+69,-1.2058020556930654e+43,-18143446093.569942,4331602.2695709998,-1.1270736165847811e+88,9.5124342177835893e+21,109805601349125.67,-4.6866331497707334e+69,-4.5250413789375171e+69,-2056.1317542912575,8.9412890371754086e+21,2.0323899381103236e+83,8.7241022871945578e+21,1.1652239981241227e+65,-16845420220.933224,-8.77741799440219e+42,1.4327774294060193e+30,-4.5314521442663681e+51,8.1085409901339057e+21,-7.9548149301263514e+17,-5.6691087098882686e+87,3.8293410789578386e+38,-7.7185502723233152e+17,-4.9960740691804993e+87,-3.7739601803565069e+51,1.5399139563637234e+47,-7.4164921850947034e+17,-6.7335956447480929e+42,91885613820166.359,-7.1992273229853018e+17,-1.805252288302718e+34,-6.1727985863159504e+42,-1.7424065707212254e+34,7.6245480062719564e+55,87645462445771.734,-1.9716991135551316e+60,-7.6466122851998981e+25,-1.5956641129053948e+34,6.6511290370226689e+55,9.9484747960719681e+29,83647096177050.359,-2.3772456867917339e+87,-1.4301682334751158e+69,-1921.7300289544576,-1.5071892810435921e+78,-1.4532655729714109e+78,-1.9429587184430778e+87,4.8952836192355957e+82,-1903.4333225981488,-1.138871117482832e+69,-1.9550137111730766e+51,-13546421248.648039,-1.0339173258430583e+69,5.3816906147530224e+21,-6.0066039659174591e+25,7.7922177267522084e+29,-13168755047.992256,-1.0489897697397956e+60,-5.6992036536771495e+25,-12948873220.200312,2.533433378002354e+73,2.612344308599934e+64,-5.2492187517586214e+17,-12663246773.272398,-3.0889656776229684e+42,3.2524200326705865e+55,-1840.3551729505928,-2.9066658427962929e+42,-1833.6036888755089,-6.0388932844371891e+68,-4.8795455727557903e+25,1.9456195214054786e+64,-12050618016.219763,-5.3850969011016215e+77,-8.5358192476909884e+33,-5.0262276100844698e+77,5.7168014841386171e+29,5.634768075015774e+29,1.5880315880878955e+64,-5.7249049784263148e+59,3216775.4014791618,-4.4143576486875277e+17,-2.1550291081470309e+42,-1784.5047255385207,-7.2601210353962531e+33,1.2994687302302651e+64,-4.7453062747657463e+59,-1.9539475021177521e+42,3.6667667819571676e+21,-1.8793267471929513e+42,-6.597237055006786e+33,-2.9205610698976002e+77,3.5147980769362093e+21,-7.0520399245187284e+50,8.7837824255087261e+81,-6.7381320107225209e+50,9.4161067314153947e+37,-2.3919865319300775e+77,-6.2951475482704434e+50,-2.4324847892885812e+68,-1.5207194802975231e+42,-5.8833678145961431e+50,-1.4639250956150419e+42,52808168262850.227,3.1011101581343258e+21,3.0692769706215809e+21,-3.1232792347098572e+25,-1.7228228175505966e+77,-1.3069787857443596e+42,-1705.3542880295186,-4.8127421968090748e+50,-1.2354707919567731e+42,-2.9072584326511408e+25,49317952307628.664,-1.491633544840302e+86,-1.4396051825308134e+86,-3.256604865164969e+17,-2.1237019047841575e+59,5.2152544133978358e+63,-1.0648151539726477e+42,-2.6452723436393867e+25,6.1433574307297141e+37,-2.5840621469798009e+25,2772226.2747854362,-1.0486615718584801e+86,-1.7375722697897598e+59,1.7066068670476554e+46,-1654.54962333759,-8.8050665095161517e+76,2717602.5065630944,2.5860088290276328e+81,-8.5515280410173293e+41,-1.4609349161528923e+59,-8784901014.0435009,-2.2490662539931206e+25,2.408358917508545e+72,2655890.9645955544,2.2709947619027172e+72,-2.7143320102536832e+17,2.9940261975192363e+63,-1.2011930524658618e+59,40969361521569.094,-2.6277576218305021e+17,4.9512302938972932e+54,-2.9092783693537595e+33,-6.6571582706415362e+41,1.5368905079087507e+81,-4.7656587191997858e+85,-8167447103.9878626,4.3266934318561497e+54,4.2310798272577503e+54,-5.5965258480291428e+67,3.7060494105959998e+37,3.6476416520408988e+37,3.5902448624877265e+37,3.5338399824999054e+37,1.85417945505124e+21,1.275381788529346e+72,-5.3023959046206173e+41,2467271.7426820933,9.854060978188564e+80,-7678287166.071085,2444159.2731771204,35619942159260.5,-6.7767251021742779e+58,-2.1567233857969149e+33,-1.4721272451966732e+50,9.6227955752341877e+71,34528224709948.375,-3.4616223343887688e+67,-2.0112737190944883e+33,2376737.4970073928,1.5962681710589664e+21,-1.929254392954478e+33,-2.1879937276212005e+76,6.6829798334835247e+45,5.999848716759156e+80,-1.8256182827578385e+33,-1.1575802663492669e+50,2.24668963847694e+54,32073889940767.266,2.1529518934878986e+54,-3.5256857177472083e+41,-1.3106393687371811e+25,6.0203346480823328e+71,2.2224796837075126e+37,1.3392018449016521e+29,-1505.094119249527,5.4007900533614519e+71,-1.2135022922690014e+85,-1.2173344857517382e+25,30012852046437.059,29833804983787.457,-6629823831.3154192,-2.8909158350495997e+41,1.2022646803280541e+29,-1.7296700143746816e+17,-1.7168766551983818e+17,-1.0997987372093503e+76,-2.6642165374272974e+41,-1.6791722022547011e+17,1.1197387990782167e+29,-7.250717411083309e+49,2.6682451220149134e+80,-9.2958645051669095e+75,2.5160339032365047e+80,-1.2354449641932152e+33,2133138.5659299586,2.3045840813970587e+80,5.3500920515538115e+62,26827868946512.262,1.1247174368568377e+21,-5.9483402041959827e+84,-1.1271142116786713e+33,3.3281644394180034e+45,3.2709071192192037e+45,-5.5610399083955184e+49,1.7750663654086377e+80,-5939802294.059082,-1.0426212947448393e+33,3.0001848506140797e+45,-4.5293470765777233e+84,2.8987799190092687e+45,-8.6816945933323146e+24,-8.5953716379224524e+24,-1.7331402882298596e+58,-5739319878.1034489,8.3594878094570081e+53,3.4555824613823365e+62,2.5720828156151015e+45,9.5511922105140301e+20,-1.5254273977497901e+58,1.7045696447185354e+71,7.4230095963051613e+53,23384857618672.566,23253758547815.715,-7.6324520242055936e+24,-5478122924.062211,-3.6835805791035229e+75,-2.6535424563684666e+84,-1.2621270777744704e+58,22486163198496.652,2.5228121040939381e+62,-1388.0759769851559,1919821.2092584297,1.9655993776588343e+45,-5276081784.4701681,-2.9043718940396881e+75,1898695.4354667086,-1.0467455421166172e+58,-1374.7162704382586,21275884370672.391,8.475053942523493e+36,6.199710828157929e+28,4.9357556488708047e+53,8.1340520313348954e+36,1.6394330725446363e+45,-1.5753689525304701e+84,-1.0612617259970598e+41,20365819195992.684,5.7439997967821488e+28,8.2838554867059053e+70,7.3233105883518783e+20,4.1586547080894223e+53,-1.0689258193084526e+17,5.4415557087062715e+28,19609110254158.367,-1.0475479967660928e+17,-2.1709837503444916e+49,-5.5841919426345266e+32,1.3690444824221955e+62,-8.751160852390266e+40,-1.523808826484543e+75,-4726532267.6366158,-6.2992871407719998e+57,-1.9224550667253871e+49,-98642422863761632,-97990028263883424,-7.8989030074557328e+40,-4.9535167095684254e+32,-1320.2588867539212,-1.7337579212277247e+49,1.0609106000979967e+62,6.1900269489807111e+20,2.8106823508747337e+53,-4.7929844508971314e+24,1714282.098195449,-1.5648563476165629e+49,5.2336349953843506e+36,5.9047495039104044e+20,-6.2560030362547894e+83,4.043385110787906e+70,9.2220047857051372e+44,-5.7636071276628486e+83,-8.7912750836324454e+74,8.0848210761059338e+61,-1.637499896276463e+66,3.8817419031537052e+28,-85414205892649152,-1.2778673456708628e+49,1.853462320384161e+79,-4234358578.2722178,3.686843328426393e+28,1.7159794716263232e+79,2.9890176203779024e+70,-6.7167125022527689e+74,-3.9624016492973555e+24,2.7897029425944396e+70,-3.8922724648680506e+24,5.0586988780822266e+20,1.75610603238424e+53,-1.046760515689333e+49,-1.029644061489579e+49,-1265.1328441879095,1595065.1778265934,-3.2589911492181113e+32,-1.0606901050511848e+66,-3.5937455025824117e+24,-4.4765646979674884e+40,14885412974683.242,-4.354534612371917e+40,14736745863222.684,3.3880515787533408e+36,-2.9771446580046315e+32,-2.9438601593711699e+32,1551610.3876206281,-8.5717292279907455e+65,-8.0604546774487701e+48,-2.2661370019911384e+83,3.1050413858797235e+36,3.9771383784685978e+61,-2.102423052594744e+57,1.1937618788695733e+53,-2.0258871057434468e+57,1517363.7976521712,1.1334767131912102e+53,1.11411333944536e+53,-1227.8485755258782,4.5925104607460603e+44,1498825.6458150484,-2.9426353682922939e+24,-2.917546059753156e+24,-2.8927009277354886e+24,4.2675167498291187e+44,9.713881921927314e+52,9.5497406018743424e+52,-1.4243054468564035e+83,-2.2817335551929683e+32,-2.9784469458911955e+40,1.0904513330212439e+70,2.6881848264767901e+61,2.6367071123487038e+61,3.674911956025382e+20,-1.1922291716961917e+83,-2.6126647514628492e+24,3.5847721479848076e+44,2.394568481231118e+61,-2.5475839222804486e+24,-1.2840839428276269e+57,-3412774577.2143798,-1.2388213444066222e+57,-4.7045269458233963e+48,1417775.7424761842,-3.9855190638191193e+65,2.0298216275714765e+36,-1.8784559752092828e+32,-1.1129532846275281e+57,1401027.2310316209,1397713.1566778291,3.2535085325895225e+20,1391120.1878011452,11556591530086.684,2.8122194120628993e+44,3.1627187657523993e+20,3.1404853338518454e+20,1.7824686184155418e+36,-2.0632125875826973e+40,2.6208794162068874e+44,-3190274808.4021139,1.700905540505931e+36,1358844.7578179063,-1.1529930562638413e+74,-3145914737.5873942,-1.88582054342884e+40,-5.5199296515232538e+82,2.3241220507345691e+78,1.3594855060755764e+61,4.753403283606156e+52,2.8475902039836534e+20,-4.8879189639298688e+82,1.2625301476485666e+61,2.7890466925035943e+20,-1.4139428983347747e+32,-6.9358834963692131e+56,1.4296716365591293e+36,-1.8649855671186149e+24,1309492.517991595,-6.4746916845652859e+56,-2.6827706208869211e+48,-6.2564645979902148e+56,-1.5205048504032287e+40,1294620.5121897978,-7.2827693787972128e+73,2.5684913487677322e+20,1.5027478010870517e+78,-44739974103074688,1.4361182463027221e+78,-5.4589185634226474e+56,-1.6814655735646555e+24,3.0863147155151361e+69,-1.5795423090701402e+65,1.2931552657154421e+28,-43006079273494192,-1.4914293667224223e+65,1.1393071479457158e+36,-4.7688952337725768e+56,-1.2462848016990875e+40,-1118.0253958887834,-41583733705929704,-1.970988636941869e+48,-4.3853469209732617e+56,-1.0522594713435283e+32,-2.2286724359333527e+82,9.8074048057678281e+77,2.6427130646663881e+52,-1108.1145221787172,2.2001264685047031e+20,9.8567459874289517e+35,9.7483716492643034e+35,-9.7152973710417091e+31,-1102.0090086162195,9.4310356473784389e+35,9.327796010100959e+35,-1.0221841722636987e+65,-1.6869952706864779e+82,-1.3624702143260471e+24,-1.352058375003726e+24,-9.4874062511067599e+64,-37233442572534904,8.638993338187794e+35,2.006125683755898e+20,-1088.8109896336168,-8.6470732072954792e+64,8341840448497.418,-8.8741635965432129e+39,4.7190288002245701e+60,-8.218538161129866e+31,7.9195073769445495e+35,-35263872432645084,8127729527977.4414,9.7945553886686523e+43,9.0901407105241392e+27,4.1811519082464087e+60,-1.2145347295127437e+48,1.8317916309137677e+20,-33959329390874104,9.0648748987488339e+43,3.8370490832711367e+60,3.7719124279269791e+60,1.77385887601525e+20,-1.1274927492806979e+24,4.2889162089783704e+77,-5.9967753255869527e+64,1.7290479505727894e+20,1.0438402363327848e+69,-5.6802506683956079e+64,-1059.9605993938535,7525324223875.3818,-1.8402672092549304e+73,-1.0545154380459834e+24,-9.597067579460585e+47,1110490.735017512,1108151.6330303608,-9.2104619583955017e+47,3.2568218506316048e+77,-1.7961244199238236e+56,3.1228155340527769e+77,6.9400253324084356e+43,-6.2651146711173675e+81,-5.9908558436592036e+31,-1.4479662612626975e+73,1.1196441064975371e+52,2.7544329569804798e+77,1.0874263797650119e+52,2.6420230242888882e+77,-1.5355521479331765e+56,-1037.9588048157721,1.0259321858333854e+52,-3.7693680127207112e+64,2.3815616469724423e+77,-1033.6676583565409,-28097125372493156,-7.1199868557031723e+47,-1.356171589206949e+56,9.2710284822487641e+51,-27523734010984064,-8.6596636519627791e+23,-2157990790.005774,-2151357626.9295917,-6.4839650919357123e+47,-2138172633.6655805,4.4877572576273359e+35,-3.7201745991486667e+81,4.3970069268817189e+35,4.9649339877767235e+43,7.9183794980417931e+51,7.8063477154809315e+51,-2.7059278282405142e+64,-1.0773261676259813e+56,5.5967913700813798e+27,1024465.5677877527,7.2710967015376479e+51,-25238132883235816,-4.3741448693312225e+31,3.9326144148966939e+35,4.0367996817396351e+68,-1006.6178772615436,3.8930715010254619e+68,1008058.0039453736,1.2218507059194413e+20,5.1214528059930417e+27,-4.8527874935590232e+47,-7.1999999999999983e+23]}
},{}],160:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var factorial = require( '@stdlib/math/base/special/factorial' );
var pow = require( '@stdlib/math/base/special/pow' );
var atinfinityplus = require( './../lib/atinfinityplus.js' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof atinfinityplus, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided a large `x` and `n = 1`, the function returns `1/x`', function test( t ) {
	var val;
	var x;

	x = 4.27e17;
	val = atinfinityplus( 1, x );
	t.strictEqual( val, 1.0/x, 'returns 1/x' );

	x = 2.8e17;
	val = atinfinityplus( 1, x );
	t.strictEqual( val, 1.0/x, true, 'returns 1/x' );
	t.end();
});

tape( 'the function evaluates the polygamma function for large `x` and small `n` ', function test( t ) {
	var val;
	var x;
	var n;

	x = 4.27e17;
	n = 3;
	val = atinfinityplus( n, x );
	t.strictEqual( val, (1.0) * factorial( n-1 ) * pow( x, -n ), 'returns expected value' );

	x = 4.27e17;
	n = 4;
	val = atinfinityplus( n, x );
	t.strictEqual( val, (-1.0) * factorial( n-1 ) * pow( x, -n ), 'returns expected value' );

	t.end();
});


}).call(this,"/lib/node_modules/@stdlib/math/base/special/polygamma/test/test.atinifnityplus.js")
},{"./../lib/atinfinityplus.js":138,"@stdlib/math/base/special/factorial":99,"@stdlib/math/base/special/pow":162,"tape":319}],161:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var factorial = require( '@stdlib/math/base/special/factorial' );
var incrspace = require( '@stdlib/math/utils/incrspace' );
var isnan = require( '@stdlib/assert/is-nan' );
var ldexp = require( '@stdlib/math/base/special/ldexp' );
var zeta = require( '@stdlib/math/base/special/riemann-zeta' );
var abs = require( '@stdlib/math/base/special/abs' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var EPS = require( '@stdlib/constants/math/float64-eps' );
var polygamma = require( './../lib' );


// FIXTURES //

var largePositive = require( './fixtures/cpp/large_positive.json' );
var largeNegative = require( './fixtures/cpp/large_negative.json' );
var smallPositive = require( './fixtures/cpp/small_positive.json' );
var hugePositive = require( './fixtures/cpp/huge_positive.json' );
var positive = require( './fixtures/cpp/positive.json' );
var negative = require( './fixtures/cpp/negative.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof polygamma, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided a `NaN` for either parameter, the function returns `NaN` ', function test( t ) {
	var val = polygamma( NaN, 1.7 );
	t.strictEqual( isnan( val ), true, 'returns NaN' );

	val = polygamma( 4, NaN );
	t.strictEqual( isnan( val ), true, 'returns NaN' );

	val = polygamma( NaN, NaN );
	t.strictEqual( isnan( val ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided an even negative integer for `x`, the function returns `NaN` ', function test( t ) {
	var val = polygamma( 2, -2.0 );
	t.strictEqual( isnan( val ), true, 'returns NaN' );

	val = polygamma( 2, -4.0 );
	t.strictEqual( isnan( val ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided an odd negative integer for `x`, the function returns positive infinity', function test( t ) {
	var val = polygamma( 4, -1.0 );
	t.strictEqual( val, PINF, 'returns +infinity' );

	val = polygamma( 4, -3.0 );
	t.strictEqual( val, PINF, true, 'returns +infinity' );
	t.end();
});

tape( 'the function evaluates the polygamma function for small positive numbers', function test( t ) {
	var expected;
	var delta;
	var tol;
	var n;
	var x;
	var y;
	var i;

	n = smallPositive.n;
	x = smallPositive.x;
	expected = smallPositive.y;
	for ( i = 0; i < x.length; i++ ) {
		y = polygamma(n[i], x[i] );
		if ( y === expected[ i ] ) {
			t.strictEqual( y, expected[ i ], 'n: '+n[i]+'. x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 20.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. n: '+n[i]+'. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the polygamma function for positive numbers', function test( t ) {
	var expected;
	var delta;
	var tol;
	var n;
	var x;
	var y;
	var i;

	n = positive.n;
	x = positive.x;
	expected = positive.y;
	for ( i = 0; i < x.length; i++ ) {
		y = polygamma(n[i], x[i] );
		if ( y === expected[ i ] ) {
			t.strictEqual( y, expected[ i ], 'n: '+n[i]+'. x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 20.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. n: '+n[i]+'. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the polygamma function for negative numbers', function test( t ) {
	var expected;
	var delta;
	var tol;
	var n;
	var x;
	var y;
	var i;

	n = negative.n;
	x = negative.x;
	expected = negative.y;
	for ( i = 0; i < x.length; i++ ) {
		y = polygamma( n[i], x[i] );
		if ( y === expected[ i ] ) {
			t.strictEqual( y, expected[ i ], 'n: '+n[i]+'. x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 2300.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. n: '+n[i]+'. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the polygamma function for large positive numbers', function test( t ) {
	var expected;
	var delta;
	var tol;
	var n;
	var x;
	var y;
	var i;

	n = largePositive.n;
	x = largePositive.x;
	expected = largePositive.y;
	for ( i = 0; i < x.length; i++ ) {
		y = polygamma(n[i], x[i] );
		if ( y === expected[ i ] ) {
			t.strictEqual( y, expected[ i ], 'n: '+n[i]+'. x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 20.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. n: '+n[i]+'. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the polygamma function for large negative numbers', function test( t ) {
	var expected;
	var delta;
	var tol;
	var n;
	var x;
	var y;
	var i;

	n = largeNegative.n;
	x = largeNegative.x;
	expected = largeNegative.y;
	for ( i = 0; i < x.length; i++ ) {
		y = polygamma( n[i], x[i] );
		if ( y === expected[ i ] ) {
			t.strictEqual( y, expected[ i ], 'n: '+n[i]+'. x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );

			// The large discrepancies for a few input values seem to be mostly due to a slight difference in the calculation of `cospi`, which is used in `polycotpi.js`. For example, for `x = 128.69279279279279`, our `cospi` function returns `-0.5693183042040957`, whereas Boost returns `-0.56931830420405894`. These differences are then magnified as the result is used as the value at which polynomials are evaluated.
			tol = 2200.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. n: '+n[i]+'. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the polygamma function for huge positive numbers', function test( t ) {
	var expected;
	var delta;
	var tol;
	var n;
	var x;
	var y;
	var i;

	n = hugePositive.n;
	x = hugePositive.x;
	expected = hugePositive.y;
	for ( i = 0; i < x.length; i++ ) {
		y = polygamma(n[i], x[i] );
		if ( y === expected[ i ] ) {
			t.strictEqual( y, expected[ i ], 'n: '+n[i]+'. x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. n: '+n[i]+'. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'for positive odd `n` and `x` equal to `1.0`, the function computes the factorial of `n` multiplied the Riemann zeta function evaluated at `n+1`', function test( t ) {
	var expected;
	var actual;
	var values;
	var i;
	var n;

	values = incrspace( 1, 99, 2 );
	for ( i = 0; i < values.length; i++ ) {
		n = values[ i ];
		expected = factorial( n ) * zeta( n+1 );
		actual = polygamma( n, 1.0 );
		t.strictEqual( actual, expected, 'n: '+n+'. x: 1.0. E: '+expected );
	}
	t.end();
});

tape( 'for positive even `n` and `x` equal to `1.0`, the function computes the negative factorial of `n` multiplied by the Riemann zeta function evaluated at `n+1`', function test( t ) {
	var expected;
	var actual;
	var values;
	var i;
	var n;

	values = incrspace( 2, 100, 2 );
	for ( i = 0; i < values.length; i++ ) {
		n = values[ i ];
		expected = (-1.0) * factorial( n ) * zeta( n+1 );
		actual = polygamma( n, 1.0 );
		t.strictEqual( actual, expected, 'n: '+n+'. x: 1.0. E: '+expected );
	}
	t.end();
});

tape( 'for positive odd `n` and `x` equal to `0.5`, the function computes the factorial of `n` multiplied by the Riemann zeta function evaluated at `n+1`', function test( t ) {
	var expected;
	var actual;
	var values;
	var i;
	var n;

	values = incrspace( 1, 199, 2 );
	for ( i = 0; i < values.length; i++ ) {
		n = values[ i ];
		expected = factorial( n ) * zeta( n+1 );
		expected *= ldexp( 1.0, n + 1 ) - 1.0;
		actual = polygamma( n, 0.5 );
		t.strictEqual( actual, expected, 'n: '+n+'. x: 1.0. E: '+expected );
	}
	t.end();
});

tape( 'for positive even `n` and `x` equal to `0.5`, the function computes the negative factorial of `n` multiplied by the Riemann zeta function evaluated at `n+1`', function test( t ) {
	var expected;
	var actual;
	var values;
	var i;
	var n;

	values = incrspace( 2, 200, 2 );
	for ( i = 0; i < values.length; i++ ) {
		n = values[ i ];
		expected = (-1.0) * factorial( n ) * zeta( n+1 );
		expected *= ldexp( 1.0, n + 1 ) - 1.0;
		actual = polygamma( n, 0.5 );
		t.strictEqual( actual, expected, 'n: '+n+'. x: 1.0. E: '+expected );
	}
	t.end();
});


}).call(this,"/lib/node_modules/@stdlib/math/base/special/polygamma/test/test.js")
},{"./../lib":140,"./fixtures/cpp/huge_positive.json":154,"./fixtures/cpp/large_negative.json":155,"./fixtures/cpp/large_positive.json":156,"./fixtures/cpp/negative.json":157,"./fixtures/cpp/positive.json":158,"./fixtures/cpp/small_positive.json":159,"@stdlib/assert/is-nan":21,"@stdlib/constants/math/float64-eps":36,"@stdlib/constants/math/float64-pinf":52,"@stdlib/math/base/special/abs":75,"@stdlib/math/base/special/factorial":99,"@stdlib/math/base/special/ldexp":130,"@stdlib/math/base/special/riemann-zeta":179,"@stdlib/math/utils/incrspace":212,"tape":319}],162:[function(require,module,exports){
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

},{"./pow.js":168}],163:[function(require,module,exports){
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

},{"./polyval_l.js":165,"@stdlib/constants/math/float64-exponent-bias":38,"@stdlib/number/float64/base/get-high-word":219,"@stdlib/number/float64/base/set-high-word":228,"@stdlib/number/float64/base/set-low-word":230}],164:[function(require,module,exports){
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

},{"./polyval_w.js":167,"@stdlib/number/float64/base/set-low-word":230}],165:[function(require,module,exports){
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

},{}],166:[function(require,module,exports){
arguments[4][96][0].apply(exports,arguments)
},{"dup":96}],167:[function(require,module,exports){
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

},{}],168:[function(require,module,exports){
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

},{"./log2ax.js":163,"./logx.js":164,"./pow2.js":169,"./x_is_zero.js":170,"./y_is_huge.js":171,"./y_is_infinite.js":172,"@stdlib/constants/math/float64-ninf":49,"@stdlib/constants/math/float64-pinf":52,"@stdlib/math/base/assert/is-infinite":62,"@stdlib/math/base/assert/is-integer":64,"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/assert/is-odd":72,"@stdlib/math/base/special/abs":75,"@stdlib/math/base/special/sqrt":196,"@stdlib/number/float64/base/set-low-word":230,"@stdlib/number/float64/base/to-words":233,"@stdlib/number/uint32/base/to-int32":237}],169:[function(require,module,exports){
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

},{"./polyval_p.js":166,"@stdlib/constants/math/float64-exponent-bias":38,"@stdlib/constants/math/float64-ln-two":42,"@stdlib/math/base/special/ldexp":130,"@stdlib/number/float64/base/get-high-word":219,"@stdlib/number/float64/base/set-high-word":228,"@stdlib/number/float64/base/set-low-word":230,"@stdlib/number/uint32/base/to-int32":237}],170:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-ninf":49,"@stdlib/constants/math/float64-pinf":52,"@stdlib/math/base/assert/is-odd":72,"@stdlib/math/base/special/copysign":82}],171:[function(require,module,exports){
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

},{"@stdlib/number/float64/base/get-high-word":219}],172:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-pinf":52,"@stdlib/math/base/special/abs":75}],173:[function(require,module,exports){
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

},{"./rempio2.js":175}],174:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":101,"@stdlib/math/base/special/ldexp":130}],175:[function(require,module,exports){
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

},{"./kernel_rempio2.js":174,"./rempio2_medium.js":176,"@stdlib/number/float64/base/from-words":215,"@stdlib/number/float64/base/get-high-word":219,"@stdlib/number/float64/base/get-low-word":221}],176:[function(require,module,exports){
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

},{"@stdlib/math/base/special/round":188,"@stdlib/number/float64/base/get-high-word":219}],177:[function(require,module,exports){
module.exports=[1.00000000000000000000000000000000000000000,
0.166666666666666666666666666666666666666667,
-0.0333333333333333333333333333333333333333333,
0.0238095238095238095238095238095238095238095,
-0.0333333333333333333333333333333333333333333,
0.0757575757575757575757575757575757575757576,
-0.253113553113553113553113553113553113553114,
1.16666666666666666666666666666666666666667,
-7.09215686274509803921568627450980392156863,
54.9711779448621553884711779448621553884712,
-529.124242424242424242424242424242424242424,
6192.12318840579710144927536231884057971014,
-86580.2531135531135531135531135531135531136,
1.42551716666666666666666666666666666666667e6,
-2.72982310678160919540229885057471264367816e7,
6.01580873900642368384303868174835916771401e8,
-1.51163157670921568627450980392156862745098e10,
4.29614643061166666666666666666666666666667e11,
-1.37116552050883327721590879485616327721591e13,
4.88332318973593166666666666666666666666667e14,
-1.92965793419400681486326681448632668144863e16,
8.41693047573682615000553709856035437430786e17,
-4.03380718540594554130768115942028985507246e19,
2.11507486380819916056014539007092198581560e21,
-1.20866265222965259346027311937082525317819e23,
7.50086674607696436685572007575757575757576e24,
-5.03877810148106891413789303052201257861635e26,
3.65287764848181233351104308429711779448622e28,
-2.84987693024508822262691464329106781609195e30,
2.38654274996836276446459819192192149717514e32,
-2.13999492572253336658107447651910973926742e34,
2.05009757234780975699217330956723102516667e36,
-2.09380059113463784090951852900279701847092e38,
2.27526964884635155596492603527692645814700e40,
-2.62577102862395760473030497361582020814490e42,
3.21250821027180325182047923042649852435219e44,
-4.15982781667947109139170744952623589366896e46,
5.69206954820352800238834562191210586444805e48,
-8.21836294197845756922906534686173330145509e50,
1.25029043271669930167323398297028955241772e53,
-2.00155832332483702749253291988132987687242e55,
3.36749829153643742333966769033387530162196e57,
-5.94709705031354477186604968440515408405791e59,
1.10119103236279775595641307904376916046305e62,
-2.13552595452535011886583850190410656789733e64,
4.33288969866411924196166130593792062184514e66,
-9.18855282416693282262005552155018971389604e68,
2.03468967763290744934550279902200200659751e71,
-4.70038339580357310785752555350060606545967e73,
1.13180434454842492706751862577339342678904e76,
-2.83822495706937069592641563364817647382847e78,
7.40642489796788506297508271409209841768797e80,
-2.00964548027566044834656196727153631868673e83,
5.66571700508059414457193460305193569614195e85,
-1.65845111541362169158237133743199123014950e88,
5.03688599504923774192894219151801548124424e90,
-1.58614682376581863693634015729664387827410e93,
5.17567436175456269840732406825071225612408e95,
-1.74889218402171173396900258776181591451415e98,
6.11605199949521852558245252642641677807677e100,
-2.21227769127078349422883234567129324455732e103,
8.27227767987709698542210624599845957312047e105,
-3.19589251114157095835916343691808148735263e108,
1.27500822233877929823100243029266798669572e111,
-5.25009230867741338994028246245651754469199e113,
2.23018178942416252098692981988387281437383e116,
-9.76845219309552044386335133989802393011669e118,
4.40983619784529542722726228748131691918758e121,
-2.05085708864640888397293377275830154864566e124,
9.82144332797912771075729696020975210414919e126,
-4.84126007982088805087891967099634127611305e129,
2.45530888014809826097834674040886903996737e132,
-1.28069268040847475487825132786017857218118e135,
6.86761671046685811921018885984644004360924e137,
-3.78464685819691046949789954163795568144895e140,
2.14261012506652915508713231351482720966602e143,
-1.24567271371836950070196429616376072194583e146,
7.43457875510001525436796683940520613117807e148,
-4.55357953046417048940633332233212748767721e151,
2.86121128168588683453638472510172325229190e154,
-1.84377235520338697276882026536287854875414e157,
1.21811545362210466995013165065995213558174e160,
-8.24821871853141215484818457296893447301419e162,
5.72258779378329433296516498142978615918685e165,
-4.06685305250591047267679693831158655602196e168,
2.95960920646420500628752695815851870426379e171,
-2.20495225651894575090311752273445984836379e174,
1.68125970728895998058311525151360665754464e177,
-1.31167362135569576486452806355817153004431e180,
1.04678940094780380821832853929823089643829e183,
-8.54328935788337077185982546299082774593270e185,
7.12878213224865423522884066771438224721245e188,
-6.08029314555358993000847118686477458461988e191,
5.29967764248499239300942910043247266228490e194,
-4.71942591687458626443646229013379911103761e197,
4.29284137914029810894168296541074669045521e200,
-3.98767449682322074434477655542938795106651e203,
3.78197804193588827138944181161393327898220e206,
-3.66142336836811912436858082151197348755196e209,
3.61760902723728623488554609298914089477541e212,
-3.64707726451913543621383088655499449048682e215,
3.75087554364544090983452410104814189306842e218,
-3.93458672964390282694891288533713429355657e221,
4.20882111481900820046571171111494898242731e224,
-4.59022962206179186559802940573325591059371e227,
5.10317257726295759279198185106496768539760e230,
-5.78227623036569554015377271242917142512200e233,
6.67624821678358810322637794412809363451080e236,
-7.85353076444504163225916259639312444428230e239,
9.41068940670587255245443288258762485293948e242,
-1.14849338734651839938498599206805592548354e246,
1.42729587428487856771416320087122499897180e249,
-1.80595595869093090142285728117654560926719e252,
2.32615353076608052161297985184708876161736e255,
-3.04957517154995947681942819261542593785327e258,
4.06858060764339734424012124124937318633684e261,
-5.52310313219743616252320044093186392324280e264,
7.62772793964343924869949690204961215533859e267,
-1.07155711196978863132793524001065396932667e271,
1.53102008959691884453440916153355334355847e274,
-2.22448916821798346676602348865048510824835e277,
3.28626791906901391668189736436895275365183e280,
-4.93559289559603449020711938191575963496999e283,
7.53495712008325067212266049779283956727824e286,
-1.16914851545841777278088924731655041783900e290,
1.84352614678389394126646201597702232396492e293,
-2.95368261729680829728014917350525183485207e296,
4.80793212775015697668878704043264072227967e299,
-7.95021250458852528538243631671158693036798e302,
1.33527841873546338750122832017820518292039e306]

},{}],178:[function(require,module,exports){
module.exports=[
	-0.5,
	1.644934066848226436472415166646025189218949901206798437735,
	1.082323233711138191516003696541167902774750951918726907682,
	1.017343061984449139714517929790920527901817490032853561842,
	1.004077356197944339378685238508652465258960790649850020329,
	1.000994575127818085337145958900319017006019531564477517257,
	1.000246086553308048298637998047739670960416088458003404533,
	1.000061248135058704829258545105135333747481696169154549482,
	1.000015282259408651871732571487636722023237388990471531153,
	1.000003817293264999839856461644621939730454697218953331143,
	1.000000953962033872796113152038683449345943794187410595750,
	1.000000238450502727732990003648186752994935041821779658269,
	1.000000059608189051259479612440207935801227503918837302795,
	1.000000014901554828365041234658506630698628864788167885910,
	1.000000003725334024788457054819204018402423232893059295811,
	1.000000000931327432419668182871764735021219813567955136816,
	1.000000000232831183367650549200145597594049502482982284530,
	1.000000000058207720879027008892436859891063054173122604617,
	1.000000000014551921891041984235929632245318420983808894124,
	1.000000000003637979547378651190237236355873273512646028384,
	1.000000000000909494784026388928253311838694908753860000990,
	1.000000000000227373684582465251522682157797869121382982198,
	1.000000000000056843419876275856092771829675240685530571588,
	1.000000000000014210854828031606769834307141739537678698605,
	1.000000000000003552713691337113673298469534059342992145655,
	1.000000000000000888178421093081590309609138639138632560887,
	1.000000000000000222044605079804198399932009420465396423665,
	1.000000000000000055511151248454812437237365905094302816723
]

},{}],179:[function(require,module,exports){
'use strict';

/**
* Evaluate the Riemann zeta function.
*
* @module @stdlib/math/base/special/riemann-zeta
*
* @example
* var zeta = require( '@stdlib/math/base/special/riemann-zeta' );
*
* var v = zeta( 1.1 );
* // returns ~10.584
*
* v = zeta( -4.0 );
* // returns 0.0
*
* v = zeta( 70.0 );
* // returns 1.0
*
* v = zeta( 0.5 );
* // returns ~-1.46
*
* v = zeta( 1.0 ); // pole
* // returns NaN
*
* v = zeta( NaN );
* // returns NaN
*/

// MODULES //

var zeta = require( './zeta.js' );


// EXPORTS //

module.exports = zeta;

},{"./zeta.js":187}],180:[function(require,module,exports){
module.exports=[
	1.202056903159594285399738161511449990764986292340498881792,
	1.036927755143369926331365486457034168057080919501912811974,
	1.008349277381922826839797549849796759599863560565238706417,
	1.002008392826082214417852769232412060485605851394888756548,
	1.000494188604119464558702282526469936468606435758208617119,
	1.000122713347578489146751836526357395714275105895509845136,
	1.000030588236307020493551728510645062587627948706858177506,
	1.000007637197637899762273600293563029213088249090262679095,
	1.000001908212716553938925656957795101353258571144838630235,
	1.000000476932986787806463116719604373045966446694784937600,
	1.000000119219925965311073067788718882326387254997784519858,
	1.000000029803503514652280186063705069366011844730919543312,
	1.000000007450711789835429491981004170604119454719031882565,
	1.000000001862659723513049006403909945416948061665330469200,
	1.000000000465662906503378407298923325122007106269185336947,
	1.000000000116415501727005197759297383545630951652247172763,
	1.000000000029103850444970996869294252278840464106981987433,
	1.000000000007275959835057481014520869012338059264850925555,
	1.000000000001818989650307065947584832100730085030589309618,
	1.000000000000454747378304215402679911202948857033904529911,
	1.000000000000113686840768022784934910483802590643743590284,
	1.000000000000028421709768893018554550737049426620743688265,
	1.000000000000007105427395210852712877354479956800022742043,
	1.000000000000001776356843579120327473349014400279570155508,
	1.000000000000000444089210314381336419777094026812133645960,
	1.000000000000000111022302514106613372054456992138270248322,
	1.000000000000000027755575621361241725816324538540697689849,
	1.000000000000000006938893904544153697446085326249809274836,
	1.000000000000000001734723476047576572048972969937595907478,
	1.000000000000000000433680869002065048749702356590624136125,
	1.000000000000000000108420217249424140630127111654613825894,
	1.000000000000000000027105054312234688319546213119497764319,
	1.000000000000000000006776263578045189097995298741556686206,
	1.000000000000000000001694065894509799165406492747124861940,
	1.000000000000000000000423516473627283334786227048335793441,
	1.000000000000000000000105879118406802338522650015392383985,
	1.000000000000000000000026469779601698529611341166842038716,
	1.000000000000000000000006617444900424404067355245332308220,
	1.000000000000000000000001654361225106075646229923677181049,
	1.000000000000000000000000413590306276516092600938245550814,
	1.000000000000000000000000103397576569128709932840955917459,
	1.000000000000000000000000025849394142282142681277617708450,
	1.000000000000000000000000006462348535570531803438002161122,
	1.000000000000000000000000001615587133892632521206011405705,
	1.000000000000000000000000000403896783473158082562226281299,
	1.000000000000000000000000000100974195868289515336192507001,
	1.000000000000000000000000000025243548967072378244674341938,
	1.000000000000000000000000000006310887241768094495682609394,
	1.000000000000000000000000000001577721810442023616644432783,
	1.000000000000000000000000000000394430452610505903352639355,
	1.000000000000000000000000000000098607613152626475748329968,
	1.000000000000000000000000000000024651903288156618927101395,
	1.000000000000000000000000000000006162975822039154730666338,
	1.000000000000000000000000000000001540743955509788682543361,
	1.000000000000000000000000000000000385185988877447170622149,
	1.000000000000000000000000000000000096296497219361792654016
]

},{}],181:[function(require,module,exports){
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
		return 0.2433929443359375;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = 0.2433929443359375 + (x * (-0.4909247051635357 + (x * (0.055761621477604675 + (x * (-0.003209124988790859 + (x * (0.0004515345286457964 + (x * -0.000009332412703570615))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (-0.27996033431034445 + (x * (0.04196762233099861 + (x * (-0.00413421406552171 + (x * (0.00024978985622317937 + (x * -0.000010185578841856403))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = -0.000009332412703570615 + (x * (0.0004515345286457964 + (x * (-0.003209124988790859 + (x * (0.055761621477604675 + (x * (-0.4909247051635357 + (x * 0.2433929443359375))))))))); // eslint-disable-line max-len
		s2 = -0.000010185578841856403 + (x * (0.00024978985622317937 + (x * (-0.00413421406552171 + (x * (0.04196762233099861 + (x * (-0.27996033431034445 + (x * 1.0))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

},{}],182:[function(require,module,exports){
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
		return 0.5772156649015329;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = 0.5772156649015329 + (x * (0.24321064694010716 + (x * (0.04173646739882165 + (x * (0.003902520870728433 + (x * (0.0002496063671518772 + (x * 0.00001101084409767329))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (0.29520127712663174 + (x * (0.043460910607305496 + (x * (0.004349305820858264 + (x * (0.0002557842261404885 + (x * 0.000010991819782396113))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = 0.00001101084409767329 + (x * (0.0002496063671518772 + (x * (0.003902520870728433 + (x * (0.04173646739882165 + (x * (0.24321064694010716 + (x * 0.5772156649015329))))))))); // eslint-disable-line max-len
		s2 = 0.000010991819782396113 + (x * (0.0002557842261404885 + (x * (0.004349305820858264 + (x * (0.043460910607305496 + (x * (0.29520127712663174 + (x * 1.0))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

},{}],183:[function(require,module,exports){
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
		return -0.053725830002359504;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = -0.053725830002359504 + (x * (0.04451634732923656 + (x * (0.012867767353451996 + (x * (0.0009754177045739176 + (x * (0.00007698751015736541 + (x * (0.000003280325100003831 + (x * 0.0))))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (0.3338319455303405 + (x * (0.048779843129140764 + (x * (0.0047903970857355845 + (x * (0.00027077670395633634 + (x * (0.000010695186753205734 + (x * 2.3627662397497864e-8))))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = 0.0 + (x * (0.000003280325100003831 + (x * (0.00007698751015736541 + (x * (0.0009754177045739176 + (x * (0.012867767353451996 + (x * (0.04451634732923656 + (x * -0.053725830002359504))))))))))); // eslint-disable-line max-len
		s2 = 2.3627662397497864e-8 + (x * (0.000010695186753205734 + (x * (0.00027077670395633634 + (x * (0.0047903970857355845 + (x * (0.048779843129140764 + (x * (0.3338319455303405 + (x * 1.0))))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

},{}],184:[function(require,module,exports){
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
		return -2.497101906022594;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = -2.497101906022594 + (x * (-2.600133018094757 + (x * (-0.9392604353771099 + (x * (-0.13844861799574154 + (x * (-0.007017212405498024 + (x * (-0.000022925731059489392 + (x * (0.0 + (x * (0.0 + (x * 0.0))))))))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (0.7060390259377451 + (x * (0.15739599649558628 + (x * (0.010611795097684508 + (x * (-0.000036910273311764616 + (x * (0.0000049340956392759 + (x * (-2.3405548702528722e-7 + (x * (7.188337293654598e-9 + (x * -1.1292001134749475e-10))))))))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = 0.0 + (x * (0.0 + (x * (0.0 + (x * (-0.000022925731059489392 + (x * (-0.007017212405498024 + (x * (-0.13844861799574154 + (x * (-0.9392604353771099 + (x * (-2.600133018094757 + (x * -2.497101906022594))))))))))))))); // eslint-disable-line max-len
		s2 = -1.1292001134749475e-10 + (x * (7.188337293654598e-9 + (x * (-2.3405548702528722e-7 + (x * (0.0000049340956392759 + (x * (-0.000036910273311764616 + (x * (0.010611795097684508 + (x * (0.15739599649558628 + (x * (0.7060390259377451 + (x * 1.0))))))))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

},{}],185:[function(require,module,exports){
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
		return -4.785580284951356;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = -4.785580284951356 + (x * (-1.8919736488197254 + (x * (-0.21140713487441282 + (x * (-0.0001892047582600767 + (x * (0.0011514092388917874 + (x * (0.00006399492042131645 + (x * (0.000001393489324453249 + (x * (0.0 + (x * 0.0))))))))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (0.24434533737818856 + (x * (0.008733707544922887 + (x * (-0.0011759276533443448 + (x * (-0.00007437436828999331 + (x * (-0.0000021750464515767985 + (x * (4.710012640030765e-9 + (x * (-8.333784406253855e-11 + (x * 6.998415452048457e-13))))))))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = 0.0 + (x * (0.0 + (x * (0.000001393489324453249 + (x * (0.00006399492042131645 + (x * (0.0011514092388917874 + (x * (-0.0001892047582600767 + (x * (-0.21140713487441282 + (x * (-1.8919736488197254 + (x * -4.785580284951356))))))))))))))); // eslint-disable-line max-len
		s2 = 6.998415452048457e-13 + (x * (-8.333784406253855e-11 + (x * (4.710012640030765e-9 + (x * (-0.0000021750464515767985 + (x * (-0.00007437436828999331 + (x * (-0.0011759276533443448 + (x * (0.008733707544922887 + (x * (0.24434533737818856 + (x * 1.0))))))))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

},{}],186:[function(require,module,exports){
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
		return -10.39489505733089;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = -10.39489505733089 + (x * (-2.858272196711067 + (x * (-0.34772826653924577 + (x * (-0.025115606465534634 + (x * (-0.001194591734169687 + (x * (-0.00003825293235079675 + (x * (-7.855236337967234e-7 + (x * -8.214657090954655e-9))))))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (0.2081963335726719 + (x * (0.019568765731720502 + (x * (0.0011107963810248593 + (x * (0.000040850774626603926 + (x * (9.555611230656935e-7 + (x * (1.185071534740229e-8 + (x * 2.226094836273526e-15))))))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = -8.214657090954655e-9 + (x * (-7.855236337967234e-7 + (x * (-0.00003825293235079675 + (x * (-0.001194591734169687 + (x * (-0.025115606465534634 + (x * (-0.34772826653924577 + (x * (-2.858272196711067 + (x * -10.39489505733089))))))))))))); // eslint-disable-line max-len
		s2 = 2.226094836273526e-15 + (x * (1.185071534740229e-8 + (x * (9.555611230656935e-7 + (x * (0.000040850774626603926 + (x * (0.0011107963810248593 + (x * (0.019568765731720502 + (x * (0.2081963335726719 + (x * 1.0))))))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

},{}],187:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_60_0/boost/math/special_functions/zeta.hpp}.
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
var isInteger = require( '@stdlib/math/base/assert/is-integer' );
var abs = require( '@stdlib/math/base/special/abs' );
var exp = require( '@stdlib/math/base/special/exp' );
var floor = require( '@stdlib/math/base/special/floor' );
var gamma = require( '@stdlib/math/base/special/gamma' );
var gammaln = require( '@stdlib/math/base/special/gammaln' );
var sinpi = require( '@stdlib/math/base/special/sinpi' );
var pow = require( '@stdlib/math/base/special/pow' );
var ln = require( '@stdlib/math/base/special/ln' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var TWO_PI = require( '@stdlib/constants/math/float64-two-pi' );
var SQRT_EPSILON = require( '@stdlib/constants/math/float64-sqrt-eps' );
var LN_SQRT_TWO_PI = require( '@stdlib/constants/math/float64-ln-sqrt-two-pi' );
var ODD_POSITIVE_INTEGERS = require( './odd_positive_integers.json' );
var EVEN_NONNEGATIVE_INTEGERS = require( './even_nonnegative_integers.json' );
var BERNOULLI = require( './bernoulli.json' );
var rateval1 = require( './rational_p1q1.js' );
var rateval2 = require( './rational_p2q2.js' );
var rateval3 = require( './rational_p3q3.js' );
var rateval4 = require( './rational_p4q4.js' );
var rateval5 = require( './rational_p5q5.js' );
var rateval6 = require( './rational_p6q6.js' );


// VARIABLES //

var MAX_BERNOULLI_2N = 129;
var MAX_FACTORIAL = 170; // TODO: consider making external constant
var MAX_LN = 709; // TODO: consider making external constant
var Y1 = 1.2433929443359375;
var Y3 = 0.6986598968505859375;


// MAIN //

/**
* Evaluates the Riemann zeta function.
*
* ## Method
*
* 1.  First, we use the reflection formula
*
*     ```tex
*     \zeta(1-s) = 2 \sin\biggl(\frac{\pi(1-s)}{2}\biggr)(2\pi^{-s})\Gamma(s)\zeta(s)
*     ```
*
*     to make \\(s\\) positive.
*
* 2.  For \\(s \in (0,1)\\), we use the approximation
*
*     ```tex
*     \zeta(s) = \frac{C + \operatorname{R}(1-s) - s}{1-s}
*     ```
*
*     with rational approximation \\(\operatorname{R}(1-z)\\) and constant \\(C\\).
*
* 3.  For \\(s \in (1,4)\\), we use the approximation
*
*     ```tex
*     \zeta(s) = C + \operatorname{R}(s-n) + \frac{1}{s-1}
*     ```
*
*     with rational approximation \\(\operatorname{R}(z-n)\\), constant \\(C\\), and integer \\(n\\).
*
* 4.  For \\(s > 4\\), we use the approximation
*
*     ```tex
*     \zeta(s) = 1 + e^{\operatorname{R}(z-n)}
*     ```
*
*     with rational approximation \\(\operatorname{R}(z-n)\\) and integer \\(n\\).
*
* 5.  For negative odd integers, we use the closed form
*
*     ```tex
*     \zeta(-n) = \frac{(-1)^n}{n+1} B_{n+1}
*     ```
*
*     where \\(B_{n+1}\\) is a Bernoulli number.
*
* 6.  For negative even integers, we use the closed form
*
*     ```tex
*     \zeta(-2n) = 0
*     ```
*
* 7.  For nonnegative even integers, we could use the closed form
*
*     ```tex
*     \zeta(2n) = \frac{(-1)^{n-1}2^{2n-1}\pi^{2n}}{(2n)!} B_{2n}
*     ```
*
*     where \\(B_{2n}\\) is a Bernoulli number. However, to speed computation, we use precomputed values (Wolfram Alpha).
*
* 8.  For positive negative integers, we use precomputed values (Wolfram Alpha), as these values are useful for certain infinite series calculations.
*
*
* ## Notes
*
* -   \\(\[\approx 1.5\mbox{e-}8, 1)\\)
*
*     -   max deviation: \\(2.020\mbox{e-}18\\)
*     -   expected error: \\(-2.020\mbox{e-}18\\)
*     -   max error found (double): \\(3.994987\mbox{e-}17\\)
*
* -   \\(\[1,2\]\\)
*
*     -   max deviation: \\(9.007\mbox{e-}20\\)
*     -   expected error: \\(9.007\mbox{e-}20\\)
*
* -   \\((2,4\]\\)
*
*     -   max deviation: \\(5.946\mbox{e-}22\\)
*     -   expected error: \\(-5.946\mbox{e-}22\\)
*
* -   \\((4,7\]\\)
*
*     -   max deviation: \\(2.955\mbox{e-}17\\)
*     -   expected error: \\(2.955\mbox{e-}17\\)
*     -   max error found (double): \\(2.009135\mbox{e-}16\\)
*
* -   \\((7,15)\\)
*
*     -   max deviation: \\(7.117\mbox{e-}16\\)
*     -   expected error: \\(7.117\mbox{e-}16\\)
*     -   max error found (double): \\(9.387771\mbox{e-}16\\)
*
* -   \\(\[15,36)\\)
*
*     -   max error (in interpolated form): \\(1.668\mbox{e-}17\\)
*     -   max error found (long double): \\(1.669714\mbox{e-}17\\)
*
*
* @param {number} s - input value
* @returns {number} function value
*
* @example
* var v = zeta( 1.1 );
* // returns ~10.584
*
* @example
* var v = zeta( -4.0 );
* // returns 0.0
*
* @example
* var v = zeta( 70.0 );
* // returns 1.0
*
* @example
* var v = zeta( 0.5 );
* // returns ~-1.46
*
* @example
* var v = zeta( 1.0 ); // pole
* // returns NaN
*
* @example
* var v = zeta( NaN );
* // returns NaN
*/
function zeta( s ) {
	var tmp;
	var sc;
	var as;
	var is;
	var r;
	var n;

	// Check for `NaN`:
	if ( isnan( s ) ) {
		return NaN;
	}
	// Check for a pole:
	if ( s === 1.0 ) {
		return NaN;
	}
	// Check for large value:
	if ( s >= 56.0 ) {
		return 1.0;
	}
	// Check for a closed form (integers):
	if ( isInteger( s ) ) {
		// Cast `s` to a 32-bit signed integer:
		is = s|0; // asm type annotation

		// Check that `s` does not exceed MAX_INT32:
		if ( is === s ) {
			if ( is < 0 ) {
				as = (-is)|0; // asm type annotation

				// Check if even negative integer:
				if ( (as&1) === 0 ) {
					return 0.0;
				}
				n = ( (as+1) / 2 )|0; // asm type annotation

				// Check if less than max Bernoulli number:
				if ( n <= MAX_BERNOULLI_2N ) {
					return -BERNOULLI[ n ] / (as+1.0);
				}
				// fall through...
			}
			// Check if even nonnegative integer:
			else if ( (is&1) === 0 ) {
				return EVEN_NONNEGATIVE_INTEGERS[ is/2 ];
			}
			// Must be a odd positive integer:
			else {
				return ODD_POSITIVE_INTEGERS[ (is-3)/2 ];
			}
		}
		// fall through...
	}
	if ( abs(s) < SQRT_EPSILON ) {
		return -0.5 - (LN_SQRT_TWO_PI * s);
	}
	sc = 1.0 - s;
	if ( s < 0.0 ) {
		// Check if even negative integer:
		if ( floor(s/2.0) === s/2.0 ) {
			return 0.0;
		}
		// Swap `s` and `sc`:
		tmp = s;
		s = sc;
		sc = tmp;

		// Determine if computation will overflow:
		if ( s > MAX_FACTORIAL ) {
			tmp = sinpi( 0.5*sc ) * 2.0 * zeta( s );
			r = gammaln( s );
			r -= s * ln( TWO_PI );
			if ( r > MAX_LN ) {
				return ( tmp < 0.0 ) ? NINF : PINF;
			}
			return tmp * exp( r );
		}
		return sinpi( 0.5*sc ) * 2.0 * pow( TWO_PI, -s ) * gamma( s ) * zeta( s ); // eslint-disable-line max-len
	}
	if ( s < 1.0 ) {
		tmp = rateval1( sc );
		tmp -= Y1;
		tmp += sc;
		tmp /= sc;
		return tmp;
	}
	if ( s <= 2.0 ) {
		sc = -sc;
		tmp = 1.0 / sc;
		return tmp + rateval2( sc );
	}
	if ( s <= 4.0 ) {
		tmp = Y3 + ( 1.0 / (-sc) );
		return tmp + rateval3( s-2.0 );
	}
	if ( s <= 7.0 ) {
		tmp = rateval4( s-4.0 );
		return 1.0 + exp( tmp );
	}
	if ( s < 15.0 ) {
		tmp = rateval5( s-7.0 );
		return 1.0 + exp( tmp );
	}
	if ( s < 36.0 ) {
		tmp = rateval6( s-15.0 );
		return 1.0 + exp( tmp );
	}
	// s < 56
	return 1.0 + pow( 2.0, -s );
}


// EXPORTS //

module.exports = zeta;

},{"./bernoulli.json":177,"./even_nonnegative_integers.json":178,"./odd_positive_integers.json":180,"./rational_p1q1.js":181,"./rational_p2q2.js":182,"./rational_p3q3.js":183,"./rational_p4q4.js":184,"./rational_p5q5.js":185,"./rational_p6q6.js":186,"@stdlib/constants/math/float64-ln-sqrt-two-pi":41,"@stdlib/constants/math/float64-ninf":49,"@stdlib/constants/math/float64-pinf":52,"@stdlib/constants/math/float64-sqrt-eps":54,"@stdlib/constants/math/float64-two-pi":56,"@stdlib/math/base/assert/is-integer":64,"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/special/abs":75,"@stdlib/math/base/special/exp":95,"@stdlib/math/base/special/floor":101,"@stdlib/math/base/special/gamma":103,"@stdlib/math/base/special/gammaln":109,"@stdlib/math/base/special/ln":132,"@stdlib/math/base/special/pow":162,"@stdlib/math/base/special/sinpi":194}],188:[function(require,module,exports){
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

},{"./round.js":189}],189:[function(require,module,exports){
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

},{}],190:[function(require,module,exports){
'use strict';

/**
* Evaluate the signum function.
*
* @module @stdlib/math/base/special/signum
*
* @example
* var signum = require( '@stdlib/math/base/special/signum' );
*
* var sign = signum( -5.0 );
* // returns -1.0
*
* sign = signum( 5.0 );
* // returns 1.0
*
* sign = signum( -0.0 );
* // returns -0.0
*
* sign = signum( 0.0 );
* // returns 0.0
*
* sign = signum( NaN );
* // returns NaN
*/

// MODULES //

var signum = require( './signum.js' );


// EXPORTS //

module.exports = signum;

},{"./signum.js":191}],191:[function(require,module,exports){
'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );


// MAIN //

/**
* Evaluates the signum function.
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var sign = signum( -5.0 );
* // returns -1.0
*
* @example
* var sign = signum( 5.0 );
* // returns 1.0
*
* @example
* var sign = signum( -0.0 );
* // returns -0.0
*
* @example
* var sign = signum( 0.0 );
* // returns 0.0
*
* @example
* var sign = signum( NaN );
* // returns NaN
*/
function signum( x ) {
	if ( x === 0.0 || isnan( x ) ) {
		return x; // addresses both +-0
	}
	return ( x < 0.0 ) ? -1.0 : 1.0;
}


// EXPORTS //

module.exports = signum;

},{"@stdlib/math/base/assert/is-nan":66}],192:[function(require,module,exports){
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

},{"./sin.js":193}],193:[function(require,module,exports){
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

},{"@stdlib/math/base/special/kernel-cos":120,"@stdlib/math/base/special/kernel-sin":124,"@stdlib/math/base/special/rempio2":173,"@stdlib/number/float64/base/get-high-word":219}],194:[function(require,module,exports){
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

},{"./sinpi.js":195}],195:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-pi":51,"@stdlib/math/base/assert/is-infinite":62,"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/special/abs":75,"@stdlib/math/base/special/copysign":82,"@stdlib/math/base/special/cos":84,"@stdlib/math/base/special/sin":192}],196:[function(require,module,exports){
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

},{}],197:[function(require,module,exports){
'use strict';

/**
* Evaluate the tangent of a number.
*
* @module @stdlib/math/base/special/tan
*
* @example
* var v = tan( 0.0 );
* // returns ~0.0
*
* v = tan( -Math.PI/4.0 );
* // returns ~-1.0
*
* v = tan( Math.PI/4.0 );
* // returns ~1.0
*
* v = tan( NaN );
* // returns NaN
*/

// MODULES //

var tan = require( './tan.js' );


// EXPORTS //

module.exports = tan;

},{"./tan.js":198}],198:[function(require,module,exports){
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_tan.c?view=markup}.
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
var kernelTan = require( '@stdlib/math/base/special/kernel-tan' );
var rempio2 = require( '@stdlib/math/base/special/rempio2' );


// VARIABLES //

// Scratch buffer:
var buffer = new Array( 2 ); // WARNING: not thread safe

// High word absolute value mask: 0x7fffffff => 01111111111111111111111111111111
var HIGH_WORD_ABS_MASK = 0x7fffffff|0; // asm type annotation

// High word for pi/4: 0x3fe921fb => 00111111111010010010000111111011
var HIGH_WORD_PIO4 = 0x3fe921fb|0; // asm type annotation

// High word exponent mask: 0x7ff00000 => 01111111111100000000000000000000
var HIGH_WORD_EXPONENT_MASK = 0x7ff00000|0; // asm type annotation

// High word for a small value: 2^-27 = 7.450580596923828e-9 => high word => 0x3e400000 => 00111110010000000000000000000000
var HIGH_WORD_TWO_NEG_27 = 0x3e400000|0; // asm type annotation


// MAIN //

/**
* Evaluates the tangent of a number.
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
*     | 0 |    S   |    C   |   T    |
*     | 1 |    C   |   -S   |  -1/T  |
*     | 2 |   -S   |   -C   |   T    |
*     | 3 |   -C   |    S   |  -1/T  |
*
*
* @param {number} x - input value (in radians)
* @returns {number} tangent
*
* @example
* var v = tan( 0.0 );
* // returns ~0.0
*
* @example
* var v = tan( -Math.PI/4.0 );
* // returns ~-1.0
*
* @example
* var v = tan( Math.PI/4.0 );
* // returns ~1.0
*
* @example
* var v = tan( NaN );
* // returns NaN
*/
function tan( x ) {
	var ix;
	var n;

	ix = getHighWord( x );
	ix &= HIGH_WORD_ABS_MASK;

	// Case: |x| ~< π/4
	if ( ix <= HIGH_WORD_PIO4 ) {
		// Case: |x| < 2**-27
		if ( ix < HIGH_WORD_TWO_NEG_27 ) {
			return x;
		}
		return kernelTan( x, 0.0, 1 );
	}
	// Case: tan(Inf or NaN) is NaN
	if ( ix >= HIGH_WORD_EXPONENT_MASK ) {
		return NaN;
	}
	// Argument reduction needed...
	n = rempio2( x, buffer );
	return kernelTan( buffer[ 0 ], buffer[ 1 ], 1-((n&1)<<1) );
}


// EXPORTS //

module.exports = tan;

},{"@stdlib/math/base/special/kernel-tan":126,"@stdlib/math/base/special/rempio2":173,"@stdlib/number/float64/base/get-high-word":219}],199:[function(require,module,exports){
'use strict';

/**
* Evaluate the trigamma function.
*
* @module @stdlib/math/base/special/trigamma
*
* @example
* var trigamma = require( '@stdlib/math/base/special/trigamma' );
*
* var v = trigamma( -2.5 );
* // returns ~9.539
*
* v = trigamma( 1.0 );
* // returns ~1.645
*
* v = trigamma( 10.0 );
* // returns ~0.105
*
* v = trigamma( NaN );
* // returns NaN
*
* v = trigamma( -1.0 );
* // returns NaN
*/

// MODULES //

var trigamma = require( './trigamma.js' );


// EXPORTS //

module.exports = trigamma;

},{"./trigamma.js":205}],200:[function(require,module,exports){
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
		return -0.9999999999999991;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = -0.9999999999999991 + (x * (-4.712373111208652 + (x * (-7.94125711970499 + (x * (-5.746577466976647 + (x * (-0.4042133494563989 + (x * (2.4787778117864288 + (x * (2.0771415170245513 + (x * (0.8588778991623601 + (x * (0.20499222604410033 + (x * (0.027210314034819473 + (x * 0.001576484902087695))))))))))))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (4.712373111208634 + (x * (9.586191186553398 + (x * (11.094006726982938 + (x * (8.090754247493278 + (x * (3.877058901598914 + (x * (1.2275867870191448 + (x * (0.249092040606385 + (x * (0.02957504139006556 + (x * (0.0015764849020049815 + (x * 1.6126405034405948e-15))))))))))))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = 0.001576484902087695 + (x * (0.027210314034819473 + (x * (0.20499222604410033 + (x * (0.8588778991623601 + (x * (2.0771415170245513 + (x * (2.4787778117864288 + (x * (-0.4042133494563989 + (x * (-5.746577466976647 + (x * (-7.94125711970499 + (x * (-4.712373111208652 + (x * -0.9999999999999991))))))))))))))))))); // eslint-disable-line max-len
		s2 = 1.6126405034405948e-15 + (x * (0.0015764849020049815 + (x * (0.02957504139006556 + (x * (0.249092040606385 + (x * (1.2275867870191448 + (x * (3.877058901598914 + (x * (8.090754247493278 + (x * (11.094006726982938 + (x * (9.586191186553398 + (x * (4.712373111208634 + (x * 1.0))))))))))))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

},{}],201:[function(require,module,exports){
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
		return 0.0;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = 0.0 + (x * (0.5 + (x * (0.34562566988545623 + (x * (9.628954993608422 + (x * (3.5936085382439025 + (x * (49.45959911843888 + (x * (7.775192373218939 + (x * (74.4536074488178 + (x * (2.7520934039706906 + (x * (23.92923597114717 + (x * 0.0))))))))))))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (0.3579180064375791 + (x * (19.138603985070986 + (x * (0.8743490814641436 + (x * (98.65160974348555 + (x * (-16.10519728333829 + (x * (154.31686021625373 + (x * (-40.2026880424379 + (x * (60.167913667426475 + (x * (-13.341484462225642 + (x * 2.537956362006499))))))))))))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = 0.0 + (x * (23.92923597114717 + (x * (2.7520934039706906 + (x * (74.4536074488178 + (x * (7.775192373218939 + (x * (49.45959911843888 + (x * (3.5936085382439025 + (x * (9.628954993608422 + (x * (0.34562566988545623 + (x * (0.5 + (x * 0.0))))))))))))))))))); // eslint-disable-line max-len
		s2 = 2.537956362006499 + (x * (-13.341484462225642 + (x * (60.167913667426475 + (x * (-40.2026880424379 + (x * (154.31686021625373 + (x * (-16.10519728333829 + (x * (98.65160974348555 + (x * (0.8743490814641436 + (x * (19.138603985070986 + (x * (0.3579180064375791 + (x * 1.0))))))))))))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

},{}],202:[function(require,module,exports){
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
		return -2.5584373473990794;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = -2.5584373473990794 + (x * (-12.283020824054201 + (x * (-23.9195022162768 + (x * (-24.925643150482347 + (x * (-14.797912276547878 + (x * (-4.466544539286106 + (x * (-0.01914390334056497 + (x * (0.5154120525543513 + (x * (0.1953783487860643 + (x * (0.03347612826241743 + (x * (0.0023736652059422065 + (x * 0.0))))))))))))))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (4.800985584544199 + (x * (9.992207278431701 + (x * (11.889614616763133 + (x * (8.966132566838091 + (x * (4.4725413614962415 + (x * (1.4860098202819654 + (x * (0.31957073576676426 + (x * (0.040735834578768094 + (x * (0.0023736652059327163 + (x * (2.3955488790352614e-16 + (x * -2.9474924474061867e-18))))))))))))))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = 0.0 + (x * (0.0023736652059422065 + (x * (0.03347612826241743 + (x * (0.1953783487860643 + (x * (0.5154120525543513 + (x * (-0.01914390334056497 + (x * (-4.466544539286106 + (x * (-14.797912276547878 + (x * (-24.925643150482347 + (x * (-23.9195022162768 + (x * (-12.283020824054201 + (x * -2.5584373473990794))))))))))))))))))))); // eslint-disable-line max-len
		s2 = -2.9474924474061867e-18 + (x * (2.3955488790352614e-16 + (x * (0.0023736652059327163 + (x * (0.040735834578768094 + (x * (0.31957073576676426 + (x * (1.4860098202819654 + (x * (4.4725413614962415 + (x * (8.966132566838091 + (x * (11.889614616763133 + (x * (9.992207278431701 + (x * (4.800985584544199 + (x * 1.0))))))))))))))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

},{}],203:[function(require,module,exports){
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
		return 1.6662611269702147e-17;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = 1.6662611269702147e-17 + (x * (0.4999999999999977 + (x * (6.402709450190538 + (x * (41.38333741550006 + (x * (166.8033418545628 + (x * (453.39964786925367 + (x * (851.153712317697 + (x * (1097.7065756728507 + (x * (938.4312324784553 + (x * (487.26800160465194 + (x * 119.95344524233573))))))))))))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (12.472085567047449 + (x * (78.60931297532986 + (x * (307.47024605031834 + (x * (805.1406861011516 + (x * (1439.1201976029215 + (x * (1735.6105285756048 + (x * (1348.3250071285634 + (x * (607.2259858605709 + (x * (119.95231785727705 + (x * 0.00014016591835503607))))))))))))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = 119.95344524233573 + (x * (487.26800160465194 + (x * (938.4312324784553 + (x * (1097.7065756728507 + (x * (851.153712317697 + (x * (453.39964786925367 + (x * (166.8033418545628 + (x * (41.38333741550006 + (x * (6.402709450190538 + (x * (0.4999999999999977 + (x * 1.6662611269702147e-17))))))))))))))))))); // eslint-disable-line max-len
		s2 = 0.00014016591835503607 + (x * (119.95231785727705 + (x * (607.2259858605709 + (x * (1348.3250071285634 + (x * (1735.6105285756048 + (x * (1439.1201976029215 + (x * (805.1406861011516 + (x * (307.47024605031834 + (x * (78.60931297532986 + (x * (12.472085567047449 + (x * 1.0))))))))))))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

},{}],204:[function(require,module,exports){
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
		return -1.848283152741466e-20;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = -1.848283152741466e-20 + (x * (0.5 + (x * (3.0253386524731334 + (x * (13.599592751745737 + (x * (35.31322242830879 + (x * (67.16394245507142 + (x * (83.5767733658514 + (x * (71.07349121223571 + (x * (35.86215156147256 + (x * 8.721522316399835))))))))))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (5.717343971612935 + (x * (25.29340417962044 + (x * (62.26197679674682 + (x * (113.955048909239 + (x * (130.80713832893898 + (x * (102.42314690233765 + (x * (44.04247728052452 + (x * (8.89898032477904 + (x * -0.029662733687204))))))))))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = 8.721522316399835 + (x * (35.86215156147256 + (x * (71.07349121223571 + (x * (83.5767733658514 + (x * (67.16394245507142 + (x * (35.31322242830879 + (x * (13.599592751745737 + (x * (3.0253386524731334 + (x * (0.5 + (x * -1.848283152741466e-20))))))))))))))))); // eslint-disable-line max-len
		s2 = -0.029662733687204 + (x * (8.89898032477904 + (x * (44.04247728052452 + (x * (102.42314690233765 + (x * (130.80713832893898 + (x * (113.955048909239 + (x * (62.26197679674682 + (x * (25.29340417962044 + (x * (5.717343971612935 + (x * 1.0))))))))))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

},{}],205:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_65_0/boost/math/special_functions/trigamma.hpp}.
*
* The implementation follows the original but has been reformatted and modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var floor = require( '@stdlib/math/base/special/floor' );
var sinpi = require( '@stdlib/math/base/special/sinpi' );
var PI_SQUARED = require( '@stdlib/constants/math/float64-pi-squared' );
var rateval12 = require( './rational_p12q12.js' );
var rateval24 = require( './rational_p24q24.js' );
var rateval48 = require( './rational_p48q48.js' );
var rateval816 = require( './rational_p816q816.js' );
var rateval16INF = require( './rational_p16infq16inf.js' );


// VARIABLES //

var YOFFSET24 = 3.558437347412109375;


// MAIN //

/**
* Evaluates the trigamma function.
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = trigamma( -2.5 );
* // returns ~9.539
*
* @example
* var v = trigamma( 1.0 );
* // returns ~1.645
*
* @example
* var v = trigamma( 10.0 );
* // returns ~0.105
*
* @example
* var v = trigamma( NaN );
* // returns NaN
*
* @example
* var v = trigamma( -1.0 );
* // returns NaN
*/
function trigamma( x ) {
	var result;
	var s;
	var y;
	var z;

	result = 0.0;

	// Check for negative arguments and use reflection:
	if ( x <= 0 ) {
		if ( floor( x ) === x ) {
			return NaN;
		}
		s = sinpi( x );
		z = 1.0 - x;
		return -trigamma( z ) + ( PI_SQUARED / ( s*s ) );
	}
	if ( x < 1.0 ) {
		result = 1.0 / ( x*x );
		x += 1.0;
	}
	if ( x <= 2.0 ) {
		result += ( 2.0+rateval12( x ) ) / ( x*x );
	}
	else if ( x <= 4.0 ) {
		result += ( YOFFSET24+rateval24( x ) ) / ( x*x );
	}
	else if ( x <= 8.0 ) {
		y = 1.0 / x;
		result += ( 1.0+rateval48( y ) ) / x;
	}
	else if ( x <= 16.0 ) {
		y = 1.0 / x;
		result += ( 1.0+rateval816( y ) ) / x;
	}
	else {
		y = 1.0 / x;
		result += ( 1.0+rateval16INF( y ) ) / x;
	}
	return result;
}


// EXPORTS //

module.exports = trigamma;

},{"./rational_p12q12.js":200,"./rational_p16infq16inf.js":201,"./rational_p24q24.js":202,"./rational_p48q48.js":203,"./rational_p816q816.js":204,"@stdlib/constants/math/float64-pi-squared":50,"@stdlib/math/base/special/floor":101,"@stdlib/math/base/special/sinpi":194}],206:[function(require,module,exports){
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

},{"./trunc.js":207}],207:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ceil":80,"@stdlib/math/base/special/floor":101}],208:[function(require,module,exports){
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

},{}],209:[function(require,module,exports){
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

},{"./evalpoly.js":208}],210:[function(require,module,exports){
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

},{"./evalpoly.js":208,"./factory.js":209,"@stdlib/utils/define-read-only-property":240}],211:[function(require,module,exports){
'use strict';

// MODULES //

var ceil = require( '@stdlib/math/base/special/ceil' );
var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var MAX_LENGTH = require( '@stdlib/constants/math/uint32-max' );


// MAIN //

/**
* Generates a linearly spaced numeric array using a provided increment.
*
* @param {number} x1 - first array value
* @param {number} x2 - array element bound
* @param {number} [increment=1] - increment
* @throws {TypeError} first argument must be numeric
* @throws {TypeError} second argument must be numeric
* @throws {TypeError} third argument must be numeric
* @throws {RangeError} length of created array must be less than `4294967295` (`2**32 - 1`)
* @returns {Array} linearly spaced numeric array
*
* @example
* var arr = incrspace( 0, 11, 2 );
* // returns [ 0, 2, 4, 6, 8, 10 ]
*/
function incrspace( x1, x2, increment ) {
	var arr;
	var len;
	var inc;
	var i;
	if ( !isNumber( x1 ) || isnan( x1 ) ) {
		throw new TypeError( 'invalid input argument. Start must be numeric. Value: `' + x1 + '`.' );
	}
	if ( !isNumber( x2 ) || isnan( x2 ) ) {
		throw new TypeError( 'invalid input argument. Stop must be numeric. Value: `' + x2 + '`.' );
	}
	if ( arguments.length < 3 ) {
		inc = 1;
	} else {
		inc = increment;
		if ( !isNumber( inc ) || isnan( inc ) ) {
			throw new TypeError( 'invalid input argument. Increment must be numeric. Value: `' + inc + '`.' );
		}
	}
	len = ceil( ( x2-x1 ) / inc );

	if ( len > MAX_LENGTH ) {
		throw new RangeError( 'invalid input arguments. Generated array exceeds maximum array length.' );
	}
	if ( len <= 1 ) {
		return [ x1 ];
	}
	arr = [];
	arr.push( x1 );
	for ( i = 1; i < len; i++ ) {
		arr.push( x1 + (inc*i) );
	}
	return arr;
}


// EXPORTS //

module.exports = incrspace;

},{"@stdlib/assert/is-number":25,"@stdlib/constants/math/uint32-max":58,"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/special/ceil":80}],212:[function(require,module,exports){
'use strict';

/**
* Generate a linearly spaced numeric array using a provided increment.
*
* @module @stdlib/math/utils/incrspace
*
* @example
* var incrspace = require( '@stdlib/math/utils/incrspace' );
*
* var arr = incrspace( 0, 11, 2 );
* // returns [ 0, 2, 4, 6, 8, 10 ]
*/

// MODULES //

var incrspace = require( './incrspace.js' );


// EXPORTS //

module.exports = incrspace;

},{"./incrspace.js":211}],213:[function(require,module,exports){
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

},{"./main.js":214}],214:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-exponent-bias":38,"@stdlib/constants/math/float64-high-word-exponent-mask":39,"@stdlib/number/float64/base/get-high-word":219}],215:[function(require,module,exports){
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

},{"./main.js":217}],216:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":18}],217:[function(require,module,exports){
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

},{"./indices.js":216,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],218:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":18}],219:[function(require,module,exports){
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

},{"./main.js":220}],220:[function(require,module,exports){
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

},{"./high.js":218,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],221:[function(require,module,exports){
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

},{"./main.js":223}],222:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":18}],223:[function(require,module,exports){
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

},{"./low.js":222,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],224:[function(require,module,exports){
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

},{"./main.js":225}],225:[function(require,module,exports){
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

},{"./normalize.js":226}],226:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-smallest-normal":53,"@stdlib/math/base/assert/is-infinite":62,"@stdlib/math/base/assert/is-nan":66,"@stdlib/math/base/special/abs":75}],227:[function(require,module,exports){
arguments[4][218][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":18,"dup":218}],228:[function(require,module,exports){
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

},{"./main.js":229}],229:[function(require,module,exports){
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

},{"./high.js":227,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],230:[function(require,module,exports){
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

},{"./main.js":232}],231:[function(require,module,exports){
arguments[4][222][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":18,"dup":222}],232:[function(require,module,exports){
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

},{"./low.js":231,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],233:[function(require,module,exports){
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

},{"./main.js":235}],234:[function(require,module,exports){
arguments[4][216][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":18,"dup":216}],235:[function(require,module,exports){
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

},{"./to_words.js":236}],236:[function(require,module,exports){
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

},{"./indices.js":234,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],237:[function(require,module,exports){
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

},{"./main.js":238}],238:[function(require,module,exports){
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

},{}],239:[function(require,module,exports){
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

},{}],240:[function(require,module,exports){
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

},{"./define_read_only_property.js":239}],241:[function(require,module,exports){
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

},{"./float64array.js":242,"@stdlib/assert/is-float64array":15}],242:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Float64Array === 'function' ) ? Float64Array : null;

},{}],243:[function(require,module,exports){
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

},{"./detect_float64array_support.js":241}],244:[function(require,module,exports){
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

},{}],245:[function(require,module,exports){
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

},{"./detect_symbol_support.js":244}],246:[function(require,module,exports){
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

},{"@stdlib/utils/detect-symbol-support":245}],247:[function(require,module,exports){
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

},{"./has_tostringtag_support.js":246}],248:[function(require,module,exports){
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

},{"./uint16array.js":250,"@stdlib/assert/is-uint16array":30,"@stdlib/constants/math/uint16-max":57}],249:[function(require,module,exports){
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

},{"./detect_uint16array_support.js":248}],250:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint16Array === 'function' ) ? Uint16Array : null;

},{}],251:[function(require,module,exports){
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

},{"./uint32array.js":253,"@stdlib/assert/is-uint32array":32,"@stdlib/constants/math/uint32-max":58}],252:[function(require,module,exports){
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

},{"./detect_uint32array_support.js":251}],253:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint32Array === 'function' ) ? Uint32Array : null;

},{}],254:[function(require,module,exports){
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

},{"./uint8array.js":256,"@stdlib/assert/is-uint8array":34,"@stdlib/constants/math/uint8-max":59}],255:[function(require,module,exports){
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

},{"./detect_uint8array_support.js":254}],256:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint8Array === 'function' ) ? Uint8Array : null;

},{}],257:[function(require,module,exports){
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

},{"./native_class.js":258,"./polyfill.js":259,"@stdlib/utils/detect-tostringtag-support":247}],258:[function(require,module,exports){
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

},{"./tostring.js":260}],259:[function(require,module,exports){
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

},{"./tostring.js":260,"./tostringtag.js":261,"@stdlib/assert/has-own-property":14}],260:[function(require,module,exports){
'use strict';

// MAIN //

var toStr = Object.prototype.toString;


// EXPORTS //

module.exports = toStr;

},{}],261:[function(require,module,exports){
'use strict';

// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{}],262:[function(require,module,exports){
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

},{}],263:[function(require,module,exports){

},{}],264:[function(require,module,exports){
arguments[4][263][0].apply(exports,arguments)
},{"dup":263}],265:[function(require,module,exports){
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

},{}],266:[function(require,module,exports){
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

},{"base64-js":262,"ieee754":287}],267:[function(require,module,exports){
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
},{"../../is-buffer/index.js":289}],268:[function(require,module,exports){
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
},{"./debug":269,"_process":265}],269:[function(require,module,exports){

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

},{"ms":292}],270:[function(require,module,exports){
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

},{"./lib/is_arguments.js":271,"./lib/keys.js":272}],271:[function(require,module,exports){
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

},{}],272:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],273:[function(require,module,exports){
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

},{"foreach":283,"object-keys":294}],274:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],275:[function(require,module,exports){
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

},{"./helpers/isFinite":276,"./helpers/isNaN":277,"./helpers/mod":278,"./helpers/sign":279,"es-to-primitive/es5":280,"has":286,"is-callable":290}],276:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],277:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],278:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],279:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],280:[function(require,module,exports){
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

},{"./helpers/isPrimitive":281,"is-callable":290}],281:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],282:[function(require,module,exports){
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

},{}],283:[function(require,module,exports){

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


},{}],284:[function(require,module,exports){
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

},{}],285:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":284}],286:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":285}],287:[function(require,module,exports){
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

},{}],288:[function(require,module,exports){
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

},{}],289:[function(require,module,exports){
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

},{}],290:[function(require,module,exports){
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

},{}],291:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],292:[function(require,module,exports){
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

},{}],293:[function(require,module,exports){
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

},{}],294:[function(require,module,exports){
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

},{"./isArguments":295}],295:[function(require,module,exports){
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

},{}],296:[function(require,module,exports){
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
},{"_process":265}],297:[function(require,module,exports){
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
},{"_process":265}],298:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":299}],299:[function(require,module,exports){
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
},{"./_stream_readable":301,"./_stream_writable":303,"core-util-is":267,"inherits":288,"process-nextick-args":297}],300:[function(require,module,exports){
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
},{"./_stream_transform":302,"core-util-is":267,"inherits":288}],301:[function(require,module,exports){
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
},{"./_stream_duplex":299,"./internal/streams/BufferList":304,"./internal/streams/destroy":305,"./internal/streams/stream":306,"_process":265,"core-util-is":267,"events":282,"inherits":288,"isarray":291,"process-nextick-args":297,"safe-buffer":312,"string_decoder/":318,"util":263}],302:[function(require,module,exports){
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
},{"./_stream_duplex":299,"core-util-is":267,"inherits":288}],303:[function(require,module,exports){
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
},{"./_stream_duplex":299,"./internal/streams/destroy":305,"./internal/streams/stream":306,"_process":265,"core-util-is":267,"inherits":288,"process-nextick-args":297,"safe-buffer":312,"util-deprecate":325}],304:[function(require,module,exports){
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
},{"safe-buffer":312}],305:[function(require,module,exports){
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
},{"process-nextick-args":297}],306:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":282}],307:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":308}],308:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":299,"./lib/_stream_passthrough.js":300,"./lib/_stream_readable.js":301,"./lib/_stream_transform.js":302,"./lib/_stream_writable.js":303}],309:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":308}],310:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":303}],311:[function(require,module,exports){
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
},{"_process":265,"through":324}],312:[function(require,module,exports){
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

},{"buffer":266}],313:[function(require,module,exports){
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

},{"events":282,"inherits":288,"readable-stream/duplex.js":298,"readable-stream/passthrough.js":307,"readable-stream/readable.js":308,"readable-stream/transform.js":309,"readable-stream/writable.js":310}],314:[function(require,module,exports){
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

},{"es-abstract/es5":275,"function-bind":285}],315:[function(require,module,exports){
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

},{"./implementation":314,"./polyfill":316,"./shim":317,"define-properties":273,"function-bind":285}],316:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":314}],317:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":316,"define-properties":273}],318:[function(require,module,exports){
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
},{"safe-buffer":312}],319:[function(require,module,exports){
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
},{"./lib/default_stream":320,"./lib/results":322,"./lib/test":323,"_process":265,"defined":274,"through":324}],320:[function(require,module,exports){
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
},{"_process":265,"fs":264,"through":324}],321:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":265}],322:[function(require,module,exports){
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
},{"_process":265,"events":282,"function-bind":285,"has":286,"inherits":288,"object-inspect":293,"resumer":311,"through":324}],323:[function(require,module,exports){
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
},{"./next_tick":321,"deep-equal":270,"defined":274,"events":282,"has":286,"inherits":288,"path":296,"string.prototype.trim":315}],324:[function(require,module,exports){
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
},{"_process":265,"stream":313}],325:[function(require,module,exports){
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
},{}]},{},[160,161]);