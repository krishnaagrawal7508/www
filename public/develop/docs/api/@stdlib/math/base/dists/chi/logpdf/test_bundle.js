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

},{"./float64array.js":1,"./polyfill.js":3,"@stdlib/utils/detect-float64array-support":176}],3:[function(require,module,exports){
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

},{"./polyfill.js":5,"./uint16array.js":6,"@stdlib/utils/detect-uint16array-support":182}],5:[function(require,module,exports){
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

},{"./polyfill.js":8,"./uint32array.js":9,"@stdlib/utils/detect-uint32array-support":185}],8:[function(require,module,exports){
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

},{"./polyfill.js":11,"./uint8array.js":12,"@stdlib/utils/detect-uint8array-support":188}],11:[function(require,module,exports){
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

var isArray = require( './is_array.js' );


// EXPORTS //

module.exports = isArray;

},{"./is_array.js":16}],16:[function(require,module,exports){
'use strict';

// MODULES //

var nativeClass = require( '@stdlib/utils/native-class' );


// MAIN //

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


// EXPORTS //

module.exports = Array.isArray || isArray;

},{"@stdlib/utils/native-class":196}],17:[function(require,module,exports){
'use strict';

/**
* Tests if a value is a Buffer instance.
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

var isBuffer = require( './is_buffer.js' );


// EXPORTS //

module.exports = isBuffer;

},{"./is_buffer.js":18}],18:[function(require,module,exports){
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

},{"@stdlib/assert/is-object-like":37}],19:[function(require,module,exports){
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

},{"./is_float64array.js":20}],20:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":196}],21:[function(require,module,exports){
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

var isFunction = require( './is_function.js' );


// EXPORTS //

module.exports = isFunction;

},{"./is_function.js":22}],22:[function(require,module,exports){
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

},{"@stdlib/utils/type-of":205}],23:[function(require,module,exports){
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

},{"./object.js":26,"./primitive.js":27}],24:[function(require,module,exports){
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

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isInteger = require( './generic.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isInteger, 'isPrimitive', isPrimitive );
setReadOnly( isInteger, 'isObject', isObject );


// EXPORTS //

module.exports = isInteger;

},{"./generic.js":23,"./object.js":26,"./primitive.js":27,"@stdlib/utils/define-read-only-property":173}],25:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-ninf":62,"@stdlib/constants/math/float64-pinf":64,"@stdlib/math/base/assert/is-integer":72}],26:[function(require,module,exports){
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

},{"./integer.js":25,"@stdlib/assert/is-number":32}],27:[function(require,module,exports){
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

},{"./integer.js":25,"@stdlib/assert/is-number":32}],28:[function(require,module,exports){
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

},{"@stdlib/array/uint16":4,"@stdlib/array/uint8":10}],29:[function(require,module,exports){
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

},{"./is_little_endian.js":30}],30:[function(require,module,exports){
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

},{"./ctors.js":28}],31:[function(require,module,exports){
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

},{"./object.js":33,"./primitive.js":34}],32:[function(require,module,exports){
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

},{"./generic.js":31,"./object.js":33,"./primitive.js":34,"@stdlib/utils/define-read-only-property":173}],33:[function(require,module,exports){
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

},{"./try2serialize.js":36,"@stdlib/utils/detect-tostringtag-support":180,"@stdlib/utils/native-class":196}],34:[function(require,module,exports){
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

},{}],35:[function(require,module,exports){
'use strict';

// eslint-disable-next-line stdlib/no-redeclare
var toString = Number.prototype.toString; // non-generic


// EXPORTS //

module.exports = toString;

},{}],36:[function(require,module,exports){
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

},{"./tostring.js":35}],37:[function(require,module,exports){
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

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var arrayfun = require( '@stdlib/assert/tools/array-function' );
var isObjectLike = require( './is_object_like.js' );


// MAIN //

setReadOnly( isObjectLike, 'isObjectLikeArray', arrayfun( isObjectLike ) );


// EXPORTS //

module.exports = isObjectLike;

},{"./is_object_like.js":38,"@stdlib/assert/tools/array-function":54,"@stdlib/utils/define-read-only-property":173}],38:[function(require,module,exports){
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

},{}],39:[function(require,module,exports){
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

var isObject = require( './is_object.js' );


// EXPORTS //

module.exports = isObject;

},{"./is_object.js":40}],40:[function(require,module,exports){
'use strict';

// MODULES //

var isArray = require( '@stdlib/assert/is-array' );


// MAIN //

/**
* Tests if a value is an object; e.g., {}.
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

},{"@stdlib/assert/is-array":15}],41:[function(require,module,exports){
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

var isPlainObject = require( './is_plain_object.js' );


// EXPORTS //

module.exports = isPlainObject;

},{"./is_plain_object.js":42}],42:[function(require,module,exports){
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

},{"@stdlib/assert/has-own-property":14,"@stdlib/assert/is-function":21,"@stdlib/assert/is-object":39,"@stdlib/utils/get-prototype-of":192,"@stdlib/utils/native-class":196}],43:[function(require,module,exports){
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

},{"./object.js":45,"./primitive.js":46}],44:[function(require,module,exports){
'use strict';

/**
* Tests if a value is a positive integer.
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
* // Use interface to check for positive integer primitives...
* var isPositiveInteger = require( '@stdlib/assert/is-positive-integer' ).isPrimitive;
*
* var bool = isPositiveInteger( 3.0 );
* // returns true
*
* bool = isPositiveInteger( new Number( 3.0 ) );
* // returns false
*
* @example
* // Use interface to check for positive integer objects...
* var isPositiveInteger = require( '@stdlib/assert/is-positive-integer' ).isObject;
*
* var bool = isPositiveInteger( 3.0 );
* // returns false
*
* bool = isPositiveInteger( new Number( 3.0 ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isPositiveInteger = require( './generic.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isPositiveInteger, 'isPrimitive', isPrimitive );
setReadOnly( isPositiveInteger, 'isObject', isObject );


// EXPORTS //

module.exports = isPositiveInteger;

},{"./generic.js":43,"./object.js":45,"./primitive.js":46,"@stdlib/utils/define-read-only-property":173}],45:[function(require,module,exports){
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

},{"@stdlib/assert/is-integer":24}],46:[function(require,module,exports){
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

},{"@stdlib/assert/is-integer":24}],47:[function(require,module,exports){
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

},{"./is_uint16array.js":48}],48:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":196}],49:[function(require,module,exports){
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

},{"./is_uint32array.js":50}],50:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":196}],51:[function(require,module,exports){
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

},{"./is_uint8array.js":52}],52:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":196}],53:[function(require,module,exports){
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
		throw new TypeError( 'invalid input argument. Must provide a function. Value: `' + predicate + '`.' );
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

},{"@stdlib/assert/is-array":15}],54:[function(require,module,exports){
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

},{"./arrayfcn.js":53}],55:[function(require,module,exports){
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

},{}],56:[function(require,module,exports){
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

},{}],57:[function(require,module,exports){
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

},{}],58:[function(require,module,exports){
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

},{}],59:[function(require,module,exports){
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

},{}],60:[function(require,module,exports){
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

},{}],61:[function(require,module,exports){
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

},{}],62:[function(require,module,exports){
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

},{}],63:[function(require,module,exports){
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

},{}],64:[function(require,module,exports){
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

},{}],65:[function(require,module,exports){
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

},{}],66:[function(require,module,exports){
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

},{}],67:[function(require,module,exports){
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

},{}],68:[function(require,module,exports){
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

},{}],69:[function(require,module,exports){
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

},{}],70:[function(require,module,exports){
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

},{"./is_infinite.js":71}],71:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-ninf":62,"@stdlib/constants/math/float64-pinf":64}],72:[function(require,module,exports){
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

},{"./is_integer.js":73}],73:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":95}],74:[function(require,module,exports){
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

},{"./is_nan.js":75}],75:[function(require,module,exports){
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

},{}],76:[function(require,module,exports){
'use strict';

// MODULES //

var constantFunction = require( '@stdlib/utils/constant-function' );
var degenerate = require( '@stdlib/math/base/dists/degenerate/logpdf' ).factory;
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var gammaln = require( '@stdlib/math/base/special/gammaln' );
var ln = require( '@stdlib/math/base/special/ln' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var LN2 = require( '@stdlib/constants/math/float64-ln-two' );


// MAIN //

/**
* Returns a function for evaluating the natural logarithm of the probability density function (PDF) for a chi distribution with degrees of freedom `k`.
*
* @param {NonNegativeNumber} k - degrees of freedom
* @returns {Function} logPDF
*
* @example
* var logpdf = factory( 0.5 );
*
* var y = logpdf( 2.0 );
* // returns ~-3.219
*
* y = logpdf( 1.0 );
* // returns ~-1.269
*/
function factory( k ) {
	var km1;
	var kh;

	if ( isnan( k ) || k < 0.0 ) {
		return constantFunction( NaN );
	}
	if ( k === 0.0 ) {
		return degenerate( 0.0 );
	}

	kh = k / 2.0;
	km1 = k - 1.0;
	return logpdf;

	/**
	* Evaluates the natural logarithm of the probability density function (PDF) for a chi distribution with degrees of freedom `k`.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} evaluated logPDF
	*
	* @example
	* var y = logpdf( 1.0 );
	* // returns <number>
	*/
	function logpdf( x ) {
		var out;
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x < 0.0 || x === PINF ) {
			return NINF;
		}
		out = ( ( 1.0-kh ) * LN2 ) + ( km1 * ln( x ) ) - ( (x*x) / 2.0 );
		out -= gammaln( kh );
		return out;
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/constants/math/float64-ln-two":58,"@stdlib/constants/math/float64-ninf":62,"@stdlib/constants/math/float64-pinf":64,"@stdlib/math/base/assert/is-nan":74,"@stdlib/math/base/dists/degenerate/logpdf":84,"@stdlib/math/base/special/gammaln":97,"@stdlib/math/base/special/ln":116,"@stdlib/utils/constant-function":169}],77:[function(require,module,exports){
'use strict';

/**
* Natural logarithm of the probability density function (PDF) for a chi distribution.
*
* @module @stdlib/math/base/dists/chi/logpdf
*
* @example
* var logpdf = require( '@stdlib/math/base/dists/chi/logpdf' );
*
* var y = logpdf( 2.0, 1.0 );
* // returns ~-2.226
*
* @example
* var factory = require( '@stdlib/math/base/dists/chi/logpdf' ).factory;
*
* var logpdf = factory( 6.0 );
*
* var y = logpdf( 3.0 );
* // returns ~-1.088
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var logpdf = require( './logpdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( logpdf, 'factory', factory );


// EXPORTS //

module.exports = logpdf;

},{"./factory.js":76,"./logpdf.js":78,"@stdlib/utils/define-read-only-property":173}],78:[function(require,module,exports){
'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var gammaln = require( '@stdlib/math/base/special/gammaln' );
var ln = require( '@stdlib/math/base/special/ln' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var LN2 = require( '@stdlib/constants/math/float64-ln-two' );


// MAIN //

/**
* Evaluates the natural logarithm of the probability density function (PDF) for a chi distribution with degrees of freedom `k` at a value `x`.
*
* @param {number} x - input value
* @param {NonNegativeNumber} k - degrees of freedom
* @returns {number} evaluated logPDF
*
* @example
* var y = logpdf( 0.3, 4.0 );
* // returns ~-4.35
*
* @example
* var y = logpdf( 0.7, 0.7 );
* // returns ~-0.622
*
* @example
* var y = logpdf( -1.0, 0.5 );
* // returns -Infinity
*
* @example
* var y = logpdf( 0.0, NaN );
* // returns NaN
*
* @example
* var y = logpdf( NaN, 2.0 );
* // returns NaN
*
* @example
* // Negative degrees of freedom:
* var y = logpdf( 2.0, -1.0 );
* // returns NaN
*/
function logpdf( x, k ) {
	var out;
	var kh;
	if (
		isnan( x ) ||
		isnan( k ) ||
		k < 0.0
	) {
		return NaN;
	}
	if ( k === 0.0 ) {
		// Point mass at 0...
		return x === 0.0 ? PINF : NINF;
	}
	if ( x < 0.0 || x === PINF ) {
		return NINF;
	}
	kh = k / 2.0;
	out = ( ( 1.0-kh ) * LN2 ) + ( ( k-1.0 ) * ln( x ) ) - ( (x*x) / 2.0 );
	out -= gammaln( kh );
	return out;
}


// EXPORTS //

module.exports = logpdf;

},{"@stdlib/constants/math/float64-ln-two":58,"@stdlib/constants/math/float64-ninf":62,"@stdlib/constants/math/float64-pinf":64,"@stdlib/math/base/assert/is-nan":74,"@stdlib/math/base/special/gammaln":97,"@stdlib/math/base/special/ln":116}],79:[function(require,module,exports){
module.exports={"expected":[-6.601933731552721,-15.315564407758814,-14.349407406031963,-131.10703752849258,-8.197817589715935,-159.47711765395158,-6.9606213256620855,-42.704001380013466,-93.75893815560921,-2.881654344726076,-106.95267689715598,-87.87263840615967,-96.29229489728273,-119.502291952988,-3.4343456042807627,-92.10310483743748,-16.102039079490254,-23.086447955540976,-102.00017428753166,-38.56174575406901,-23.419787883959874,-54.81424434200451,-129.50643448650493,-1.4990185360183692,-2.618469631353747,-35.823599340146856,-99.32257340719684,-1.3155616663502023,-38.497472342590925,-13.967049229470206,-38.94717889050771,-133.46619179441524,-17.953213479085118,-57.138248248683794,-42.682256423029045,-0.7587773742037929,-26.420508936650364,-136.8367468510315,-8.124554742800761,-131.40407481973168,-25.84033895931116,-107.21295445087158,-0.593221566326144,-84.94437321781447,-19.344618278294558,-188.11557382691782,-20.90611033632791,-6.369224176666738,-0.7779144616540772,-73.61869715934783,-165.50024333643046,-0.583352548300657,-52.05464865332656,-32.44705770512525,-163.72003743298816,-25.122693745111675,-1.5030029527772069,-0.7106049587129573,-6.643872785664632,-29.383641010574344,-84.95971087868251,-15.431310477277803,-2.805473370276383,-33.7410480765889,-129.70784494116612,-113.14758190309256,-158.51552144932137,-119.21432538837715,-17.225766196975037,-156.60737888515112,-114.29776378513446,-29.666472392122067,-105.91372313389601,-33.584011323740356,-135.8010285229172,-176.94192494893105,-92.62378554444572,-120.27953816373767,-5.89834511575228,-150.93844239380243,-9.883395966481421,-2.7178933380779,-24.773414985342225,-2.289100197839545,-2.588706596877288,-151.89024685529702,-60.405716626665544,-6.1180396997454585,-171.17034315664532,-150.64854684169018,-21.68176678591026,-77.44379858744684,-39.06843272998992,-44.62574332256208,-28.11273798518112,-59.645277602613184,-6.595608104753408,-182.5904207155024,-31.468509108105554,-64.98342452903988,-37.850269945768275,-26.610276558704992,-13.132780193460373,-90.52458113826971,-15.428288236108957,-70.10981663817698,-5.38691410302487,-19.787659620851443,-39.86531669987507,-32.5017780650977,-16.907754859420685,-34.6657548458763,-23.118656359592087,-1.7182503130419935,-140.9799204025419,-0.5659349615992104,-44.791965566451566,-3.320652295497232,-14.5305796601181,-7.869382229695258,-0.8012975384962076,-3.4706258485198465,-158.76109517202545,-135.7246544812874,-20.833726820607275,-22.420175423421043,-10.62979000583319,-116.48165000112377,-34.30463188051158,-1.9307467093671544,-60.536320934997036,-10.725147237918549,-58.41664608538928,-82.4131468979732,-3.0038073954852447,-2.0705155753552393,-23.392073732655568,-50.8463671455064,-13.865724101773104,-103.27209340299736,-146.9740997318925,-10.011166000951622,-86.08252687357505,-17.474493898507085,-72.247633218002,-3.2883393897643236,-78.76018397304348,-133.32260898440467,-110.29114726078964,-100.23203329687281,-113.75111531042656,-12.669482469146203,-56.92384864826012,-20.735919880963053,-34.845530779932304,-142.9205388983944,-61.85292207030015,-0.6847832596374532,-165.74275909357115,-161.07206936857364,-8.091357761745824,-0.5602668917501981,-42.12996243229955,-20.052250358031635,-68.08270495567304,-101.91380690802262,-33.83241277246488,-16.033717898629213,-67.00500616355598,-13.312072057773332,-100.07992245363663,-42.70825639230674,-1.0396712897957299,-31.858574596828802,-0.5426344815332598,-1.5429958709234022,-32.321084116834605,-145.0646842175013,-48.899605846537966,-21.752343415910303,-18.979782049433354,-71.46055338494085,-7.812210843996576,-26.908005156500792,-8.376051374797017,-35.853496135855224,-62.99825188470449,-46.942216737391085,-66.2453528120656,-114.69169068825467,-0.5690750018610489,-11.5259476200701,-1.952624491647878,-7.7263025844420925,-132.21908201516408,-30.074929184971335,-143.3407186964031,-1.5738491047643355,-11.130914428458354,-66.54067802091514,-143.15151603954047,-66.06828672065396,-81.97581958154805,-0.6816595456445613,-52.30536858974474,-48.27595321277007,-30.014218940201104,-99.49363635359417,-164.6711667967463,-26.372312051587052,-181.7431435117872,-5.408560887702253,-129.39203083694733,-15.614312170074346,-0.9656068534366185,-71.79001125608025,-6.294859245318688,-4.4986789741722975,-82.06681434219738,-11.847244877811345,-7.476514739305243,-0.7206693796567976,-188.29752791584175,-33.058537557282946,-1.1577923367705292,-145.57702417739256,-92.35386498850133,-0.5512177278381526,-149.40892954624545,-81.44593124485701,-83.12160818697828,-1.9654480911656993,-66.57925743453485,-74.70888417659829,-21.193608093431372,-36.7164277004393,-65.56159772679436,-127.23806222106882,-160.96104185848975,-20.54014101005101,-24.42156401413058,-132.63283615134165,-22.432768304387146,-0.8372882399990358,-36.262424328824096,-4.591761551875473,-0.5373042907297578,-11.444089548866168,-42.26865089730153,-1.0888406157051171,-4.757785995240293,-80.25005496909756,-54.675500446879674,-34.60837572393384,-112.11817674402602,-21.430304697568886,-56.16890508968143,-1.3560523154312936,-169.97068146634007,-4.7208930956898545,-9.569164628514287,-141.94745758852451,-7.040051927810827,-127.81099679207374,-129.6423456735718,-4.056411835212089,-173.2556575258365,-0.612341154296737,-1.187552514911629,-0.6880016085812594,-1.275211052796763,-16.26571884396824,-108.22479622733256,-31.477139938265086,-10.541702837239118,-17.323670415302896,-26.777626567034275,-52.38219709735224,-18.554832035650744,-127.7172265939697,-19.712470247321974,-11.582303949922569,-3.456735825840044,-43.22334296889957,-19.66427612390916,-5.82085925620997,-28.67138836953636,-129.30106342897147,-103.24475090265094,-136.3650519152995,-135.31904916825735,-2.652197352686146,-9.761888296024338,-148.71071844458731,-1.5860478075982094,-14.67650916962587,-6.8247103629201105,-44.48909080471456,-28.868190431463262,-22.5639463847002,-17.024552912015757,-40.64362401149562,-41.62708241145431,-90.73769223020724,-1.9834192552515302,-198.48596448651466,-3.056473223196322,-47.29132767862599,-51.48404471021246,-163.98853668194883,-6.36761575618061,-71.90010409341119,-15.56055040176722,-0.6987025286790782,-5.1923399119773395,-29.981526671108618,-2.3536325027054197,-171.48673044917305,-6.876476000522587,-81.05947838232657,-3.21128132389091,-21.510052174623482,-24.136772290845744,-25.16085617702354,-47.608686285049764,-5.226714758615716,-47.15065486329845,-112.89792756387806,-63.769674054811425,-19.029195655475686,-20.37541403011052,-132.08885098135244,-11.530226579980983,-0.593114155856278,-65.36655936769385,-15.149889349683342,-90.89862038396802,-29.617016035024072,-18.641659025414945,-6.724187044487189,-7.66389502766501,-24.773210215028282,-4.604444787769628,-1.4497245340056815,-10.448973359798691,-48.8297752367056,-0.5465040941563161,-18.40438983238402,-131.3586409474109,-35.60736090220708,-3.134025050619828,-97.09998794188468,-11.04513547631571,-90.9203303454243,-34.799038914053355,-51.61265618169199,-114.72490883338092,-76.60873271419662,-1.9143645299572605,-8.596500998651115,-173.04514064795433,-21.23825588316674,-149.9675906498562,-66.98197641743975,-59.094673934678354,-7.709290087607597,-0.5671221611708195,-11.096778965514101,-47.81494576834214,-49.363705399657356,-11.273510521795995,-43.318031108917765,-11.694451631520788,-125.54712191284348,-165.2474609968846,-15.390759385158718,-183.9801966014236,-54.383091151714574,-103.7376957655736,-172.40097107488836,-7.7075727761944925,-134.23204257228844,-13.533792284075389,-2.8438808799782813,-6.519015200309913,-173.69283854937507,-9.678027264648778,-143.08448862861965,-0.896643705570142,-157.54207371030782,-166.50077540102208,-41.74713738587312,-4.217546003416734,-153.18224483684318,-12.355242147559947,-28.927152414727512,-17.981621816657423,-18.39672378748775,-44.80329543215365,-0.7268577775720528,-70.82595607076968,-1.1863858716402906,-56.06588747815014,-18.069942041771334,-36.72343817369296,-74.76924428487727,-9.977386963746348,-1.6028568525208442,-4.37200292087142,-69.18897749559004,-111.4274764374564,-3.6598501704456052,-0.6074056353393438,-124.17365113554611,-3.5403912790601693,-3.151727282185833,-0.931982448771465,-165.70977327783436,-25.020775038040536,-106.0256542765901,-12.723661045825029,-6.771026304750964,-7.46580222686492,-32.47571533617118,-34.34216575162962,-160.20956896639382,-3.533418212718469,-12.387758540949548,-106.0411279631562,-2.9454014006735862,-21.736739502812277,-37.55718884694272,-6.742603832239148,-89.29214913385961,-3.1340748963046376,-116.70695514649331,-43.91212490926284,-6.21807254477096,-15.860881013360345,-70.10439379768383,-79.78935367184502,-110.10918466398132,-38.709040598504544,-117.51820100680348,-2.6517784355472007,-172.62572816117205,-125.35933329470423,-132.94820517714294,-158.711325253116,-85.53610938074621,-115.09507667877003,-3.6507211705765394,-14.204568066476517,-160.84440744481094,-158.50044841866765,-117.93702480986897,-94.48622929005788,-30.13525121242315,-103.02302586357052,-18.62259451620764,-57.24407332386585,-59.55425765174105,-116.66714413518761,-30.56514186789499,-95.45221513115031,-2.3625560513182773,-20.368352692038464,-0.7780508419825996,-2.501010789718271,-62.465347602715205,-151.2660837348586,-98.16723903848758,-0.5304495706955723,-147.33384271787557,-27.692524610985227,-103.2214333847557,-29.400564009961894,-60.953321663276874,-1.1575122400676954,-76.07293976492721,-81.15857413544876,-82.42619073801451,-82.9742321706241,-30.830468360848812,-94.58379871178008,-3.267375481569031,-8.215224579386359,-26.403424556010982,-64.13843637850427,-0.7054886817902557,-131.94785227302893,-22.583796516930697,-167.31410704007607,-1.1503406454555216,-31.92241231198783,-115.27772556035514,-20.464469454653454,-4.4701744720588215,-138.3347039539215,-0.7886478552965883,-56.09786087732553,-57.56811869492084,-154.55741983402498,-100.84468021113246,-98.15261342466535,-10.65726796476416,-1.1060933685853733,-72.94865413937714,-39.34757444104308,-13.483551466905606,-28.138027100446372,-23.52175583095724,-50.57924799472332,-120.05829568637874,-16.4419966347778,-14.001594177785897,-97.61722128432186,-11.839438142007507,-18.754746640984912,-0.6367379881180284,-0.49928208715009115,-28.40624973226981,-45.39318555325607,-0.9335399260045705,-74.2234024042278,-8.48789811581694,-102.35223722316057,-93.82037615729782,-95.3511136180852,-67.9949577453001,-8.24897689006265,-13.672434106576722,-118.1276162339182,-25.08795587805345,-9.029497470343294,-1.3223859884229476,-147.9344467144873,-161.58614129169217,-121.16232950336678,-116.69301329934362,-12.723944336636904,-51.299757253592986,-95.84734012687976,-93.95631718960402,-60.93534672456573,-11.139278572244525,-0.9095332699260079,-12.66867871797498,-14.34666687448117,-27.9796797382238,-4.90740892574836,-122.97919226738654,-90.82931748248247,-76.02716115839316,-4.331301415924994,-118.6478783527798,-60.62974631540792,-41.83101669183427,-54.997220704872824,-80.33615367849589,-47.884103165579376,-3.0032286170953846,-89.51921396005415,-86.81183332778383,-2.583621392866265,-75.091199505127,-6.024587264945951,-0.9605193090008264,-2.3769458293045016,-37.07808188007828,-1.6361707881166954,-42.854809174792386,-77.68766486844542,-39.11390676066475,-144.02598247482123,-0.6057772729753232,-25.759766177186535,-22.374951858115423,-44.35259514337339,-135.04495999551207,-54.48186336234368,-163.60957123537418,-165.10024220229772,-8.193561000976706,-14.074199828552308,-5.071816061848476,-42.28426838045282,-7.340918556650076,-1.9021965344433207,-0.617861861927838,-104.70846945496768,-142.14920961365777,-35.366301238623635,-102.25384668470014,-99.22874240569092,-2.2624939526523677,-75.43603515052376,-44.37268918011045,-3.3082044110813635,-22.828915898342288,-1.573498179735295,-92.57233580737392,-168.36341096807652,-12.179484731090781,-61.77431980437469,-5.856511708358948,-83.73894554595536,-16.735743265848345,-57.80091739111638,-22.427502969316702,-0.5731268301549073,-46.10728963081878,-51.777343689489385,-139.6436127421613,-159.00200467904267,-124.83003565829702,-5.303926529634039,-20.013005289713835,-43.919333547260834,-160.17009537763207,-10.918147914987516,-117.10551936002274,-107.00071550049572,-13.908598584978254,-5.566365343712511,-44.78613190065489,-59.67095706066661,-25.200166638333886,-141.5455015222021,-40.89664328225124,-72.0627131431127,-7.947066166669177,-88.55763182590718,-47.35716905036319,-0.6371215930855652,-58.2854335262873,-1.605381750476686,-12.626097001904759,-63.10921820252641,-85.8546124099189,-81.63857173065978,-83.33563391180667,-149.22651356080553,-58.14586980550333,-0.564175083396363,-39.38327822367822,-99.59330785178355,-160.9371796256188,-3.9352082779282,-92.84046740961728,-42.24611276361433,-71.99531283028803,-155.8321141565788,-3.3899750520860525,-0.9830376057726893,-113.63250106955739,-32.759023059388454,-46.82868143184355,-162.58637104482935,-8.288785718998072,-61.47682855528571,-0.5667226201603848,-40.39450876919663,-156.2569997992696,-13.860755562336063,-3.5582859843594257,-93.70174582842908,-160.95849717047375,-45.82453084600062,-6.476699145790549,-9.096428959716286,-82.78766833933383,-0.5809477898588158,-22.00873004020642,-1.1724976045302924,-136.95807786772124,-114.07368675898906,-57.48962457152643,-5.326843679184402,-141.9562098866571,-70.42416359731124,-123.66324167395236,-106.11700680898534,-28.379104576101412,-62.01630518033102,-46.18691675305115,-0.860898346500087,-3.810481819150869,-3.0060116485851287,-12.257219198573031,-26.6556876281208,-63.28993861412515,-65.11177224956842,-7.2183626446186775,-146.16820581118398,-76.06381252154178,-16.929627971821446,-4.972003726557563,-92.15542470531493,-36.64449268567347,-34.24242091802347,-16.846927723023413,-181.19128401077327,-30.026444550350142,-67.21901654096446,-2.070101819647701,-62.29093489757629,-14.535291192197478,-59.082105780863984,-43.45341787482862,-1.9138063768984233,-139.60054027427708,-177.07615624641815,-3.523081927891343,-123.0515375622277,-0.618533804396951,-79.53292967731747,-22.82689555714792,-21.590016095112716,-156.69095721544434,-37.67015768403161,-0.839403783918997,-17.60085841624849,-67.63662789084273,-7.137367469889252,-5.903125701841647,-18.395874840291782,-0.5669374204252664,-70.8948105405785,-85.46427098071348,-90.1457078991167,-11.117366948280225,-2.401521273940208,-53.27694953680208,-83.30170996113422,-8.889481913696843,-130.821922083335,-99.35936903103726,-129.8308626275403,-27.49939832961897,-178.55233099441884,-152.7406934619183,-115.00105440394029,-161.05320864208426,-27.849314342888373,-29.057074840336345,-17.95361306180741,-3.7030820259707253,-134.62434291395567,-5.400792545847015,-4.036821285286855,-26.778539914147387,-36.151372590261886,-10.904629480896634,-154.1184562224012,-29.549897832154173,-6.176451675922365,-90.50836040506732,-5.904187594797326,-133.92068715229374,-65.87571533276216,-100.90270356187723,-66.13752484795087,-73.91967746546392,-177.07038740220412,-144.00860065864472,-11.737714318579707,-91.09511929460022,-55.313699205308396,-122.48834707159742,-14.889954251485543,-52.000029181102775,-21.925402855809804,-49.675528134646264,-141.12916038338042,-116.57069969678555,-13.820244103650095,-38.89080984538116,-4.415460984946449,-48.773210677829894,-22.686365286003046,-7.506834167050666,-21.39605649865454,-33.19099812337747,-28.857418304526423,-154.40114887513298,-75.98172554729607,-36.597189455377915,-156.74967961848472,-11.171010442136833,-118.54468640821558,-143.2037622523398,-20.34994826184169,-32.86703870678585,-61.76593368895981,-20.41445285725838,-130.29917550657044,-112.07436506295885,-67.95440638449071,-61.337559250501215,-72.13051685322111,-47.30106229792681,-54.52790989554949,-68.70593624624243,-115.42782575005339,-92.17920426813151,-9.01193329353983,-112.60605878361096,-94.51477774349733,-5.306068725368037,-11.703782517051764,-107.81349271344384,-197.79211110498966,-26.73049622014625,-0.5586074949420219,-2.2671138826578954,-15.586642028875666,-27.896582803222923,-60.35787789929425,-0.8168554736254734,-79.94330402248048,-164.83107823037074,-27.383689370634727,-18.777840436679533,-1.879234573423811,-20.748313196529928,-130.30479169626565,-19.045261119238866,-18.412233899509367,-62.43523437056326,-8.031333105117717,-18.624639295479604,-118.16102090190634,-18.46977481189477,-116.19011616315314,-76.87563148798527,-59.34510509995158,-43.720888624409284,-27.48576979191921,-52.17920882092799,-92.9425263459059,-140.57679779204557,-18.51178536288556,-171.18165069926553,-30.666694219491323,-70.92472187959366,-36.64711005236143,-11.44621236884106,-168.67112206097485,-38.89964382786327,-47.01886463047538,-106.68514096625935,-138.83187910595888,-66.11275744614683,-0.9675195467926443,-78.0196160669029,-28.554166238535014,-63.20101795588861,-120.4327053625532,-14.695739395898924,-7.554434311973797,-13.874794294368625,-33.92060312895811,-103.8045052914641,-141.17732455956093,-0.5787647991803324,-0.558456736377256,-0.5715700688057641,-118.3821762447473,-2.7090853654314273,-165.06556859639608,-8.00166762489809,-95.3891258577744,-7.5937143656926445,-13.192946374889097,-89.75390939844559,-74.4930678009654,-31.820321742487128,-158.17598182472702,-2.7398297047836553,-163.85416142023848,-189.67703059191408,-7.478111788447898,-164.52627812058708,-2.3564985792860456,-99.8137724223151,-167.30088335985346,-142.92834286439228,-33.84151659882319,-40.27219151796929,-27.220967732358968,-130.99836229695873,-76.17739036532325,-20.05701785654998,-5.044486721629074,-79.59156964578095,-16.886487798790956,-38.79403678015317,-167.14180707011968,-4.84618757296303,-44.76476464826973,-85.69339999907012,-64.07838832433043,-9.692263299177162,-61.33775904104536,-93.56609071773657,-26.42387003348836,-45.22110398408662,-3.484543344121935,-51.98212877217061,-0.9974639099878675,-1.2148048537476983,-0.7556048347385627,-1.5074318564191724,-169.41930116458897,-182.28902376283946,-72.8958080311768,-3.654366640343667,-184.64944988722712,-10.052480696671354,-192.3054589805689,-42.61898766195709,-107.81964832144133,-8.88658488974338,-0.589044694887221,-15.271569036608035,-148.30183176732072,-165.0333601982491,-30.54625920106481,-112.24052554657717,-0.7059866238026196,-93.07862396388927,-169.83651057212668,-13.35664203220575,-72.99372112056906,-34.24496360986021,-160.92810675035187,-92.50204134753767,-150.55546550263855,-181.17125746736352,-1.9651183854446637,-17.292679913197595,-112.2079495443637,-86.67260139214545,-50.130619569434295,-0.5677825878943388,-2.2943561594626853,-59.42328646120932,-149.51803033035233,-182.94514714291694,-157.98998325661236,-15.723935625951313,-47.5656125367193,-128.43928355351807,-8.75658685948097,-11.34215773071594,-15.573559304640739,-167.470709348203,-137.46944288368283,-1.4744101726811727,-99.37336267301919,-0.6498534975971605,-92.97110790675319,-20.385711965293872,-7.881160108798949,-178.24663772346807,-54.23152709581182,-72.32889450467204,-100.1798674656809,-33.52847840467634,-146.52730274337458,-145.26939086928869,-12.31068273320524,-16.909447542313632,-91.30451600461335,-11.371388067556172,-4.891652456663615,-50.288780091675676,-181.4849241473399,-37.937543945664714,-46.39034445623603,-17.47248024051429,-1.562994504795944,-42.96203906173001,-89.62653354138587,-58.231781189911544,-0.8647658823458233,-0.6675465015411967,-7.852563418656198,-0.5664483937232228,-177.08076165035126,-2.2096901494221513,-0.7296112973607443,-173.01224288501257,-41.85926133508947,-45.15477383476215,-3.048733766072321,-3.9847764375188,-1.3931586870675208,-106.73634178754438,-43.896794873023154,-3.0098423925203077,-114.60562908024765,-156.76598886932177,-15.528935119748306,-89.81796741570587,-1.014994959180049,-82.2838311758854,-119.39177261692643,-91.62159325285346,-40.68974033324933,-0.6600738435879977,-117.17257728197492,-78.95028499644575,-187.67990166087796,-92.04594470916135,-6.983761342410522,-3.0271106557865415,-91.98241764405326,-73.71616660618129,-163.58116158562132,-1.49523972277425,-54.39290095297381,-0.9576218151162266,-63.893087199480135,-3.5734335912982447,-6.488363832372556,-58.50654694654419,-45.52978879689373,-7.647592800647715,-0.8758197463113901,-143.34572739009062,-125.86639048089631,-53.91129381934434,-25.43859189183889,-11.7801137410648,-0.7277753717870752,-10.832469010874313,-1.7214090645803548,-136.97152013481227,-105.83273623106972,-11.827328117771161,-60.6411649352851,-29.944606101791454,-66.90943425871498,-46.700216900978994,-124.81000136558548,-10.481817426380468,-5.089094667335104,-8.778206900161637,-119.48443622114807,-1.3454638545872377,-49.83247691155486,-143.52831280236123,-58.50173086548066,-54.9449735677896,-35.061973194230774,-96.65333254370421,-93.01881466227069,-166.33649437745228,-90.88730521082205,-4.075386094644688,-59.066460124401395,-73.18319489958628,-93.2180780151223,-108.14959377984916,-83.22833955754602,-0.6074047199359045,-10.191926195229211,-56.60812208836099,-14.441975459717902,-9.25333208739584,-186.47427802993457,-5.291189042732332,-79.44881573917796,-0.7020730258074046,-125.25227548089507,-2.76718061449497,-40.77695074490887,-162.16135845108963,-87.84383454056372,-119.70358249765712,-35.09866051124758,-0.7992031264082273,-25.476664880300167,-32.246819090207836,-119.8545614014057,-0.5028179278432346,-1.985888128129245,-24.800122487747668,-25.090859240185928,-0.8095986458057219,-52.16674970070979,-12.405745372757428,-2.4815187556335028,-5.057047365487581,-1.6935942676539155,-54.83241309210924,-104.06800704584528,-14.549121096726749,-96.51376574219091,-155.65566170706597,-40.50190828623437,-7.3563258331478565,-52.26727970366123,-33.64755809436389,-8.893514132486448,-88.18356169425444,-28.31891889446627,-29.05988557246628,-36.47321105227292,-42.56768225857587,-37.108868466280356,-3.555865573435529,-106.76506277138948,-155.22490085031012,-14.512798053944433,-115.1243377948327,-2.0852100813290857,-57.20973347417586,-80.19137839204102,-0.7211102991304501,-50.34564724456929,-117.02328026664448,-58.829278194057714,-27.821199259467477,-1.5146702893242436,-0.7959961525289815,-46.145215109962564,-0.7621527864320448,-20.102964985294278,-79.27736054239618,-1.1870034378580794,-0.6789126323459818,-12.004261097018015,-88.40185906176994,-10.00450379462507,-14.723732335252752,-75.58183019625123,-47.45632835787426,-0.6314875926232049,-25.06451225903826,-7.620889067669949,-121.31233655948179,-47.20317425402603,-121.99302399024852,-1.2820326094559964,-38.46468487098333,-16.182389479724925,-96.1026455888382,-2.082403569234276,-12.754351424830602,-1.2956503841426805,-151.04496806718885,-30.707520138925304,-37.25059545024535,-157.4306149373048,-1.4803067684918587,-97.26764141648648,-7.986453074378959,-104.9000090191761,-5.117612497719266,-127.10657642646471,-20.88886804295253,-53.59722758235489,-149.35159227242517,-68.8212207942575,-82.57633365854878,-50.18875718981101,-79.52489770441824,-144.25375263128356,-75.39430603474996,-14.628333708619811,-57.48440694916951,-29.429075369257433,-1.3313233014535095,-126.48179657816532,-1.6141055958381916,-139.34936158210778,-36.29429514014501,-1.6364721682236505,-129.6565759926966,-88.36249154021347,-106.76475665294791,-60.16905272614509,-1.1699218678650163,-126.86082611699793,-35.88442864305891,-151.8472685704453,-101.25286563986477,-129.1408071753392,-1.084369224014802,-17.184929337001783,-19.986511457372778,-56.512220724143695,-35.214751730647194,-138.85256987118638,-3.8530179740985706,-5.246978250262081,-5.294125527722148,-126.6242204845768,-16.27527436599369,-113.5207527468345,-60.48639264122602,-23.52131401979269,-121.04891494241174,-153.4497708465785,-152.42355902415244,-60.02183530013833,-30.974946709756335,-25.060670066126377,-89.96349790901589,-1.6102363996401179,-12.191014635547862,-26.725993450294872,-18.338237961819587,-1.0932197506991632,-49.57080093675211,-119.24681441081259,-4.375045567015701,-88.66630566849746,-162.5413843178931,-77.92685077647724,-152.2312469331883,-2.1388534316557752,-20.837197557631125,-78.65680437201026,-31.01493130258111,-1.9539309120721564,-32.0146445434066,-25.12546416342145,-25.269825008997454,-24.94621477440512,-2.4175472498399353,-53.482563318479606,-58.102806740356726,-127.4275051322353,-176.7370004689773,-25.3674763474226,-4.825748361417247,-124.72486055107863,-16.96329408790507,-2.027072391868015,-9.407593177755782,-9.859463447732438,-90.1044862893769,-3.0324979573732724,-5.442885236351513,-2.8544290152340026,-1.6969325059779927,-101.26350625330123,-158.84854822876005,-138.43909107759586,-13.253896150785334,-3.7698468275628656,-114.80067275758216,-1.2368687153665772,-0.5870781958800038,-71.56354209362482,-4.091310199145643,-152.9513596473948,-139.48359093635813,-42.31388607329381,-11.703874714556889,-19.11471220353429,-110.2231273499142,-147.92126726922103,-131.15040324696537,-85.96747352078572,-24.684668588167863,-82.07823955681003,-115.10688153608416,-116.20825666957343,-0.8171669040599385,-2.701122600619998,-31.27183372425557,-10.309227867213213,-152.46282338305141,-53.81295888997888,-4.776797656774286,-22.758272069910518,-164.3648718396688,-0.44504751285450955,-4.470429490672892,-66.77468293100722,-32.334058849452774,-77.12183864917856,-0.8233759296075043,-79.36366873709636,-56.10948983479064,-1.0804529266043656,-123.54415582862914,-72.52691943194046,-116.64220171982276,-49.11816404339146,-8.945747337459823,-6.811718349487814,-79.89557049010318,-0.5681800917315103,-1.908113670115231,-1.460992516745458,-0.6147100485332313,-139.40078947068946,-0.17833751449595014,-37.51176556991748,-7.253420506412953,-14.501329138179017,-23.35293157465412,-9.278834698429543,-0.5624948855794213,-54.141225264755434,-72.39083588820895,-0.6157552529473156,-56.73458952131667,-19.934352829849647,-6.408061172836313,-7.889744893632639,-11.93519610658654,-178.7690792075646,-2.7534510139914827,-174.5424519899656,-18.328805237849327,-2.79005547012274,-36.560879123953306,-9.590510009138615,-148.1376115807572,-32.37594426838768,-116.00426638221927,-14.078758937984283,-3.233174031864445,-14.176277359603805,-36.752618760035865,-62.351804879248,-12.167535409673517,-109.33505473833294,-3.0710023654359384,-15.004548909815055,-103.3422060947299,-63.63990885035356,-0.5517899257240507,-1.2035708007108665,-118.53179444394118,-72.63834521271876,-0.5694409755542233,-151.0063320270644,-4.849854570230275,-136.2143035245183,-91.84726153622377,-0.5858597350806525,-0.863909386136634,-149.5791330197896,-7.108948193356689,-65.05862864974573,-169.53333943291966,-4.676731684367661,-10.950690207507199,-100.9917074840183,-105.12759994638402,-101.84361193300606,-40.49743135842614,-42.079659868815426,-90.75996806381268,-18.930990129997493,-107.6181351198043,-96.83491933029414,-74.17152606973337,-59.3078260299021,-22.145352065463193,-4.2523715769599395,-47.018554650981955,-164.41063684948,-21.63813992992743,-161.71701351392892,-2.7788000066113736,-47.30478109542088,-180.82959618225604,-32.6865063900257,-155.89843600701656,-12.464703944892696,-0.5641180807390862,-1.5055411435688772,-45.670455325193,-76.99963365010497,-67.77880848509456,-177.03576123748408,-7.524825281460542,-171.6710757994107,-42.50413794158424,-2.726802345572663,-38.19859410893998,-152.5357634904145,-159.10820630388497,-11.122072886897453,-37.01933843309254,-119.35425863959,-98.48132274780001,-115.30508649674857,-0.9525324017979822,-107.6921033837166,-67.86508536256345,-69.32707115524592,-171.0187022157366,-5.799751883102086,-76.14167803771451,-22.153016612989347,-127.49530176761078,-163.83723522313733,-0.8348939867645371,-53.388547123783624,-40.47233140723128,-0.9564281548791762,-63.01006602971355,-26.843119851378958,-78.29390299349063,-52.541526903379584,-78.30472835841171,-12.61937549077577,-17.066729597896384,-1.0925585754381228,-24.53985638122076,-193.5310709350795,-100.67812576867676,-124.77647458652697,-104.78122556322923,-102.73186494209462,-88.71457522361285,-167.84058537780288,-23.96167365634969,-11.897435763766719,-95.81343331176335,-1.4017072588678245,-147.642355117837,-105.67748530690298,-110.74552227653135,-0.5832968805315355,-70.45524604231433,-60.641167981764085,-9.131443698390921,-0.9218543285023246,-13.94794466551717,-14.043906246728023,-2.291947569942759,-18.29714322246876,-13.141259117800073,-61.77964611324462,-28.0352387943261,-127.39805687193477,-43.83836213016214,-6.946670641727298,-115.98740929541053,-172.69853838396787,-52.85514856148429,-0.6557039275455576,-106.11082033785142,-25.330410497288185,-19.65580324287758,-91.56437765489144,-0.7892431801084072,-14.192931001154825,-175.33317306739062,-0.6090316056659303,-89.6816102135763,-59.30144826369881,-81.87576066502584,-22.364573036555285,-1.9849564862175497,-50.79514200662788,-109.23204557214623,-100.34283307461318,-11.660825027536214,-94.45409163228564,-144.11072559002127,-0.6671257488908737,-101.09711186952107,-3.213273421093371,-147.36373926788846,-7.3425940553552245,-1.3548286562298604,-20.69179805714557,-3.318978995306085,-13.54710805875522,-2.8581668672192784,-173.58499213426188,-35.13807773919555,-100.9998601691271,-100.25366940278275,-12.268754433110225,-14.746921085061201,-6.3988176545046915,-172.20185002268752,-96.11073057226172,-27.782222162225438,-67.69823093586342,-63.93735343293922,-19.06504803384774,-74.70151036027016,-181.5828266299168,-5.9543142381734615,-60.21602361040699,-94.07288080445683,-6.161828111847931,-3.0758067457997225,-26.572329109688777,-29.881678163874593,-32.85521344936031,-10.39010017072528,-42.188396013692056,-100.00057138793768,-107.3818023029192,-6.801183618822778,-0.6308842833294879,-0.7163738776986456,-6.1703429901758,-131.155073263352,-50.017709724973415,-12.89050768222567,-42.28683379334964,-124.13851880741035,-4.1370981125057575,-63.989119713773206,-134.1415442832418,-1.0059415340847204,-122.17651560111463,-77.23135137720917,-0.5665468479031857,-1.8296959906870747,-78.59904879993292,-121.7190917233601,-31.06547710853231,-107.46411202871326,-1.1396990686594362,-74.46728615048197,-32.263265969012465,-4.42116641661973,-49.537087960278825,-2.0602487442696513,-16.601545828437924,-141.26444850134828,-98.55164477772333,-7.897619167215418,-17.991905228115062,-3.3779654554396483,-34.3141052615418,-16.274272531639856,-12.718137135109533,-94.13016972710614,-3.844912670849462,-20.123133274881695,-96.04788212047599,-160.120705585652,-0.7615284295520635,-16.578912636156108,-69.72604977304904,-1.5642506020352211,-0.6848210154242771,-44.662702907151484,-108.21780365983209,-49.87833471611108,-0.242568626547968,-3.4206598813493745,-2.077713383650888,-1.0273754324172426,-125.75788298994287,-123.06608005306444,-21.21451453798412,-4.585323243532177,-1.53522880875905,-4.087591563874624,-62.70651333935527,-4.9040837722345145,-48.336100159436185,-92.87451291966596,-28.803860903311868,-140.65115516879598,-124.04037193775379,-50.15966399051494,-31.22746142381552,-5.895778372094285,-153.32285392669218,-11.52286195774918,-88.39029724591029,-97.32587592100732,-2.4473895753605213,-2.646031214785329,-89.00507645763659,-1.7091026803196936,-23.34713328106543,-95.43974251627932,-1.6176896113967647,-0.6080438793488794,-33.994642975318584,-61.20373538126644,-4.1234498649292055,-126.066462002635,-195.8274594254263,-141.14765295096626,-134.81777603183247,-6.742759665837253,-79.4025648695545,-15.951662060503384,-2.285323252899939,-121.4663400783757,-41.76110813092751,-107.99022244633572,-109.15006515179878,-27.753491552787967,-7.110727369277704,-14.297250333078424,-1.3138440299097933,-30.995871421482292,-13.345674470764791,-129.58341513761516,-48.131238877802424,-0.5703581228924879,-95.25181093707762,-0.24499490736191243,-119.62484290663184,-19.710305423700532,-79.09468318882936,-14.747814392223017,-2.1630127958895073,-178.29716193738085,-4.59116301456522,-122.09240830215901,-13.993364071071625,-0.6711793406428264,-68.07407554624601,-147.51268125095353,-16.325582035845976,-0.5896116122316233,-99.55015039264798,-112.77138873169021,-176.76690659890005,-71.094625713003,-185.23708118377698,-159.22326307941668,-84.958835890521,-89.92631816532942,-64.51066926197598,-3.552767400162115,-147.1342113110363,-9.026137976336976,-86.36665213693286,-141.04921744626364,-14.190364389648344,-136.09707623238342,-21.876250791561578,-4.576407668885141,-121.98948486428516,-20.341969577790405,-8.916452924197463,-17.86514880923069,-5.136708032987535,-3.2483922907388427,-15.034693349642618,-70.63058421753979,-104.00841143655136,-158.21235500167114,-135.51104418707948,-10.967801585516042,-62.27540248913218,-28.162578581311134,-116.86506827008952,-3.3649494277179235,-180.70762975674478,-172.35347817219792,-32.237345822072555,-77.32808619018188,-13.431358468626412,-15.875306304678675,-7.289108612009652,-141.6432634304825,-67.40928932923211,-19.80609812832204,-5.395532133220927,-26.221467208848225,-11.662202637961084,-1.4448681824964709,-33.228479463154,-2.4580560106779674,-83.06442898549666,-69.23052425896128,-55.326437501629286,-0.6022216651714007,-1.78660232730377,-10.74023539744269,-115.27517769895286,-1.4191459174318641,-26.06834595188213,-145.13777814076033,-98.60412368739559,-116.69214937112208,-2.6380931771771152,-93.69328096455686,-0.7684729521374282,-11.106340416026486,-21.488845178546914,-5.451969100336192,-143.58747158146315,-59.92777770045309,-53.18758589012772,-0.9714163356100558,-12.991224494511155,-51.0945308982262,-8.974515408377428,-70.75730263917339,-115.21577677375149,-2.9507743926659984,-29.76665189071633,-115.03730688068751,-9.861636956419144,-111.74974252635955,-26.25356408222611,-75.50270442450696,-6.257175079859369,-17.248030455766898,-160.39691899978124,-29.00834537410647,-180.43111326475776,-72.45222477777794,-4.352290698866166,-2.324713717655861,-81.59642052937569,-13.210906778226937,-24.48442975333994,-108.70113929553266,-8.148787797570886,-94.01166364085536,-9.46206607556156,-84.62988629395389,-75.30899848714465,-79.07807013820309,-2.1260427773405803,-24.242711455956048,-156.6550023787114,-0.5822862689913987,-4.697090557021476,-1.9568404989594224,-20.632225005166177,-4.173953226078285,-7.995159739765501,-6.231644465664294,-39.9326635838964,-95.99923593517997,-0.7152247747669689,-26.43761797708295,-101.84045547113149,-44.8036128142628,-10.313140405920214,-51.06250966196296,-44.79209514217438,-7.603080387081034,-25.191270142510554,-3.178380924106448,-47.235230115603265,-184.1096976283959,-50.362147219348024,-133.39411518398447,-2.4382532685893534,-15.646509946764406,-29.171652377212368,-17.35314359731624,-10.568335744423358,-5.921287399267829,-0.8863750210046577,-73.88078377227376,-34.49428849773558,-89.03679550101693,-109.56987697342511,-157.79849855051503,-41.656931750417094,-23.515598829650187,-1.8655638002941677,-35.2306596416252,-24.460856075850486,-16.996751871843088,-124.33591913215473,-32.68751148798198,-131.48523264546643,-43.55396126394501,-85.81577180486661,-8.610069271810698,-5.558791317281265,-25.42779369143212,-51.29740048857537,-114.67316193213561,-97.11383658908476,-14.398678309958356,-71.08146306458829,-0.8834144414167123,-10.459456353518716,-38.16046826757979,-56.90608671268246,-6.3923657958401385,-85.97390788603258,-36.67492669066261,-55.27946890963726,-169.61269985978598,-16.40301829573916,-97.04578388979158,-22.269818137720684,-10.341540198523802,-122.3724364171365,-0.8973029511375401,-1.0004188571134982,-52.70811146172602,-93.087980501172,-20.8820785480655,-32.12395973508975,-0.5718030132653633,-34.46625171835653,-62.57323806983772,-124.10849020253251,-13.06127616603818,-28.839595483534737,-13.818723786017282,-7.852516653432347,-0.8402040962447066,-180.13566064077196,-72.7045711617192,-61.481365672243186,-9.580601160319677,-31.26940013910402,-32.62962157227762,-3.4711118963240803,-183.01765129113545,-37.298493052122936,-0.5680312689513833,-112.85861427560279,-75.4356179252598,-37.5701655972118,-7.1591073647203025,-6.329908249779962,-31.577320106250063,-6.4217657935455135,-70.46177007259772,-133.05840090192444,-11.530296000419746,-3.243764100183105,-172.8794194080311,-0.6819817382583553,-31.493136085687425,-10.340441617956106,-83.11294037623132,-61.94549498536725,-4.538095354823713,-17.94158080874887,-168.1670798674935,-33.10222817194635,-116.32416913679407,-44.662372887693536,-52.78734737785357,-7.347140582204703,-177.40357359087446,-143.6917174392157,-19.505144120530126,-27.167027121051557,-55.172965682626746,-134.6809436559288,-10.779763717968507,-23.503511196093474,-3.9591274404078898,-118.16112233490121,-162.13021534108495,-123.36262891504352,-11.305587780221217,-95.89259666415965,-0.8515493207682878,-69.72362324717992,-1.0087330856788304,-150.9775311147229,-195.60090554100663,-26.256759876317773,-15.198991921416184,-104.25656663052592,-25.511257484221197,-0.5733644477956998,-12.59831950587719,-99.32060212205884,-113.1918910838688,-11.05832303453014,-57.419151009760704,-53.47667995344133,-9.824372067358714,-33.090956690413556,-21.43966265216072,-93.97325853515112,-14.621827298626737,-104.20316594418672,-93.16518922759671,-122.62255620273741,-14.51298468377469,-34.1895622867283,-71.90261900107889,-5.023101922786457,-59.79615946084103,-109.08338277392397,-2.962536393160063,-0.6273541944453198,-190.41252757426528,-16.595567835417928,-2.230539010430551,-52.693274951394486,-180.6396622173203,-9.096479446393381,-64.15361086657796,-22.57803882592929,-1.4787099590417474,-23.262691733549374,-72.74008864898761,-0.8192376180792973,-14.192848669601721,-72.76714671131404,-152.31919983574,-110.12450168198586,-156.0643477630809,-11.134543485636536,-5.043268689163634,-31.903661951656076,-104.25371234235746,-165.41874252141525,-0.6597737916706565,-159.04119436461306,-4.8889446005256225,-2.9202009393209103,-86.49162938926466,-114.2304632836225,-23.850396138651483,-35.382869587419194,-96.5289398733649,-8.220627510644222,-5.294624684122081,-36.46266323119378,-143.55025117142517,-2.6083272229997436,-3.4379000091157987,-47.10449595576897,-16.22753241581391,-80.6416789665764,-140.5683056567549,-191.12124188014803,-48.527563533086045,-5.0885928614437335,-60.16268879075392,-0.7999429913665184,-24.86270135895873,-20.274758168874065,-177.8675336981574,-121.70975913291744,-2.469060280941922,-23.334129190512556,-132.2797279301038,-68.04046004087554,-3.385203275090129,-38.21308011946174,-65.19894520754198,-16.51104379229249,-9.36083547559584,-5.44691154135103,-106.59181840457201,-64.22352678765434,-149.44870608474588,-136.6968548562713,-18.146493265799958,-4.730927905805615,-2.950550592622605,-135.00931409720513,-128.05625061880326,-97.11660182147669,-38.69345140020054,-4.510231295185004,-24.8638886948552,-56.69891843554192,-88.1674226090525,-119.21251392630592,-146.83103075774756,-138.75194954840381,-38.544075015923866,-38.19858784857226,-161.72045520984722,-5.197081951410295,-164.66266266905666,-3.373065637418314,-59.58989734898675,-153.26649537893954,-133.91262575136557,-97.58394525053122,-30.325093418087352,-12.563778853291936,-79.82246553052755,-76.15306318222466,-45.49021487130368,-59.72983868292964,-55.52507173838225,-110.42632276321868,-105.12420154673853,-16.50639980720083,-20.490440869179267,-116.01556020220079,-54.420483511245024,-9.931660975528171,-20.45590524004117,-73.08329222786696,-119.2088280651529,-21.49354953578368,-31.875126594661513,-105.32093919821408,-64.7608620748683,-0.9496336175701869,-28.992849758338064,-24.14319805876948,-2.0187151054198127,-19.909626986680898,-47.684376621449424,-57.23857690816076,-0.5763342327272625,-60.27622765162547,-123.5893294798375,-6.774856415589687,-23.597788103159385,-2.676224437641518,-5.228594480681574,-60.729725473458004,-0.7390111458725892,-106.68500513000131,-146.56857344846253,-129.11938492093697,-2.094144636390919,-38.13828087145907,-16.94403892346887,-10.089293188077928,-1.1066442166424522,-20.017173492983943,-73.3654356052363,-2.5458873938753364,-76.96590398125096,-160.3961644936413,-17.4350768465363,-175.30781520040912,-27.766611369864034,-125.2836703553655,-62.73865435190636,-86.13987747393848,-139.30851896489588,-47.1846288360924,-63.71007711209015,-67.75633518589244,-36.54615228086773,-79.27398305585467,-139.18494370395456,-172.90575608078612,-126.39336911882008,-98.55508350520319,-5.58990309110927,-173.28422282415627,-2.4592854575082685,-36.91074488430875,-98.16347484771943,-1.0943730681066008,-0.5536608482480154,-73.8630531636129,-22.82687397129725,-105.37882813469707,-41.32233501213779,-165.33101885429616,-0.9151651625591786,-32.91358029519664,-102.7528003801892,-8.587624401774274,-82.44132264490436,-59.22634343492914,-118.5343306929176,-6.711537757781526,-158.8783432831574,-78.82091230858532,-39.60239369172307,-24.875055349516845,-1.3072835255518618,-0.8024121850719483,-50.508763667504574,-2.452053947216273,-0.5889013695061274,-9.239410718197266,-0.9162773024241364,-2.4817035915479657,-92.61784720158707,-1.7119838427762417,-1.9558969676166953,-10.275973265984808,-10.550516434117842,-35.01174897956304,-151.94055123214665,-3.6219117495556237,-24.433951436578173,-7.503293194825638,-35.246122815922156,-172.53256029287618,-188.5558764923473,-65.51416978350277,-46.05873021470126,-22.31514702377353,-70.20748752377514,-133.17118065778473,-84.15540104394633,-76.43798074147813,-14.965171812629904,-3.7861592316325385,-113.05789852742816,-6.255173442229887,-104.14140409501114,-182.20005570003408,-1.7785121550756928,-43.244921601982234,-27.563920081379695,-112.72008075376358,-35.827828644152156,-121.80273770685929,-9.563394166836746,-1.4365844755339394,-23.764775287507813,-52.048600131231694,-85.401870077484,-9.744669598018529,-0.5806330476188615,-8.792989628135228,-1.8819258555597453,-2.9674286793861686,-108.69668018451843,-42.36593021056703,-79.9105869996671,-27.89792103185014,-38.02527614616311,-130.11984355306654,-22.477975382062848,-20.078286351360543,-158.27199420682828,-9.008080492166256,-0.9865828148685996,-34.29910760730171,-60.698483543324535,-0.4828832807180781,-81.83568482255578,-87.98626144663754,-95.3940523738948,-177.34314519513057,-50.62875716846635,-1.023144517990986,-2.4382675361485404,-20.028780407816186,-80.37596672012153,-3.6671606603228497,-11.972926328239229,-77.07447596213314,-74.65650212794881,-7.453576588146639,-53.59836536828536,-109.7382772138032,-5.181403380139199,-66.27522672878918,-51.86122106685255,-23.088741815998716,-20.619091876275267,-1.2666808604758124,-4.657865813319429,-9.592979189231665,-1.8359439015271666,-66.3131567272349,-76.17913277929804,-5.738254867483769,-21.55411834618031,-39.376314548050495,-31.55388283318134,-7.724480228354623,-14.872475978314142,-114.67058650977087,-14.393215288389671,-13.14460684490263,-0.9655595170553344,-63.82607315219247,-13.006085515641063,-183.03622534399562,-2.6474583670456573,-5.910216374794494,-101.12044655124521,-22.899192481393122,-91.69533079020165,-1.7676412890810482,-22.107880527135798,-63.87295968174059,-154.56801666667397,-165.42152422679712,-69.35666820239024,-6.742665487536026,-164.0798849452405,-62.32850634953724,-21.58973687230512,-64.31195381703381,-106.85769308808436,-89.49702667789275,-4.844362467924993,-51.75527370183623,-113.96564547447903,-45.34060436021617,-73.34252136550566,-31.469429002492298,-29.81721468528052,-12.683375964690796,-69.15775298311083,-22.717094075750122,-10.579646089908184,-55.19458450459892,-1.0979063739105719,-0.690757183852746,-153.82116633830634,-121.03834615066069,-3.2599793614925665,-4.077987461161566,-17.123945503149535,-6.176238951667905,-145.26938034236184,-117.20532835337062,-0.6675084706775056,-154.6828007099321,-61.761262509762986,-18.0300256514022,-3.528064761254627,-153.33008055923176,-20.13829506897868,-89.79309660341931,-52.68492345738152,-157.1811058295443,-17.62854425514971,-59.62868491393411,-67.60948387595575,-46.01545873938786,-32.47726942521023,-149.59260497097307,-7.358379433146466,-100.68870853519019,-14.792387007121825,-5.531910346068727,-49.404260796832745,-2.460367263009553,-66.13662117273289,-0.9627335779494095,-0.7277110335189161,-6.89752840441677,-88.44025153843448,-6.297767480280331,-147.27495693950715,-17.058443324040383,-47.69600407608464,-20.801058500290136,-18.8150896167419,-1.1182741144968604,-3.923831106128963,-25.634704092263107,-86.23405515702457,-148.73822786855368,-145.02260108181483,-151.5241805424637,-0.5693056849300131,-101.23274825344481,-173.03640877623272,-24.29645331551843,-3.579036593197537,-23.18109052901496,-1.3858142030214742,-6.002842614331993,-106.28473845938197,-4.0522314272271975,-29.020390924672135,-2.328187858771916,-11.12936763877235,-30.701566150381954,-61.76918280091128,-151.05749686815741,-105.56957901991804,-12.67613726999193,-109.66405018146995,-0.7067242489272872,-25.280948235625992,-179.57170034564697,-10.267384164189115,-16.909456299974398,-3.62178704930917,-86.9785769790127,-105.89453915154449,-1.8388987641809584,-18.473175609342533,-126.03922121379505,-11.007069773991903,-85.56995810025916,-5.028835278900289,-42.79048960375963,-18.607276622856073,-179.8847928408319,-69.5084448912313,-123.96213645450476,-20.0613007088974,-1.299910001990206,-30.18328954733633,-11.204496154733224,-27.857285321554727,-2.9097568467952035,-14.021695185878501,-21.969368880251864,-0.5824620785372359,-29.94226570744164,-11.674383561299496,-88.37502088727905,-26.344924923322083,-10.55715576876172,-2.5676031752974167,-13.022498305807911,-85.99018200091949,-132.99441807968287,-154.743120538913,-81.65444453477905,-50.2463133270952,-125.68731552499742,-4.717377989399931,-3.7355578538710126,-64.69573137091481,-1.2410872162855242,-25.544666172150237,-95.15412878203668,-23.154612141917585,-34.976715601491264,-9.20698657933956,-7.505961101823461,-18.984619989383305,-8.937710696847658,-5.4104298784349325,-89.7625737372706,-33.15668100120612,-6.711834705592373,-20.72032130192148,-5.35981639700163,-9.021512639371203,-2.0194212338781568,-10.317583055783313,-0.9087754960259944,-13.869199035993981,-0.974971553051308,-3.175787784312723,-54.472843992997056,-32.03204681271883,-47.92852145804355,-1.7046348128255984,-3.9467520234743017,-125.3533551332534,-6.119437989461409,-46.116098265585364,-58.04162271118489,-0.5815388522655596,-87.84534146406907,-34.01552191195921,-27.651832037780075,-20.397263184294122,-58.647526177288405,-25.616818149103068,-61.36538706027575,-102.53452310379636,-6.635397928884993,-12.316168539999975,-23.772577786568785,-117.4126056974064,-28.825378219392576,-0.6643208597902168,-26.652068220034344,-118.30247807051055,-25.087139120766743,-34.10999734326045,-166.6275171494635,-162.6315676427148,-92.9779608935204,-63.36075153793968,-110.24126674151152,-20.787284767772483,-37.00641133517499,-38.67325328318005,-21.26406981908262,-201.51474736483874,-151.6820064613804,-155.93122624163723,-99.07915192545218,-113.27147811815296,-36.42769550790861,-147.59841961048474,-49.66759264688401,-14.179706221108937,-150.35287584374927,-31.818828394197958,-95.18583567799594,-6.329939439313647,-0.6767634873945304,-55.161993212195334,-15.086187659344734,-15.818943854384703,-80.59203834089239,-101.21367939006481,-0.5795892140737893,-105.33169844976129,-1.3270167714023857,-99.73246984653369,-137.8447261739397,-0.6239224601672582,-2.1011130163422163,-124.0722974010866,-123.1632166691653,-191.26562729156223,-76.42298992660905,-15.26419649849306,-19.82458784014044,-87.4126215858416,-137.95875897781153,-0.7853312003669395,-15.450763689466607,-28.809492218077093,-124.1980438378376,-4.037356320645833,-30.74674120722595,-2.7158678403888414,-8.628822838259296,-80.05020336436517,-10.30267058996568,-159.9505504636004,-89.83324038285818,-3.682816322876164,-6.50519882620828,-136.88027818215306,-44.24723236097254,-40.134157638786576,-11.158791652699378,-158.6152840202552,-123.54618399806071,-38.048891560912594,-0.6963606567379372,-5.713644861249415,-19.377542010925737,-34.46307087236517,-6.899163498341857,-1.8000427557089096,-44.534258992431404,-68.44003714567214,-29.75678952690638,-66.22417069094098,-5.793865184051697,-6.513490615945851,-76.57252287089499,-2.0614627539808934,-125.5313489927778,-0.566964805519973,-3.2010574056183736,-0.7496583507545989,-174.10586496029222,-32.04047520462846,-69.35084621581039,-70.33532035162963,-148.5125022716844,-0.5672235806613468,-99.89140351996252,-55.8151656497222,-25.544953938419866,-54.16613730643103,-5.300540891171009,-53.74163824793771,-10.695324786647896,-6.167121991406332,-60.431393070754304,-8.596172060457917,-12.10458160434236,-125.4434258333674,-6.618541497737723,-20.514128241281718,-0.5595256569468265,-93.25473719074022,-121.76405543639981,-0.571079740131637,-5.131108666337683,-15.18067757688943,-97.78890872577567,-3.618787586496248,-5.029869165671071,-3.0034630803802242,-194.85950892663533,-81.4342384928291,-10.94638662912277,-78.45006985484322,-4.923289134422956,-1.9052646927864307,-1.9662525296294326,-137.04495671892252,-70.0842947649317,-3.2256816599307734,-0.5642461950379789,-52.554365571607605,-57.53159588237703,-1.9587547844396118,-172.00904917934406,-3.7243604838389164,-87.55941912367643,-114.9293098814986,-49.415991894305634,-88.94122907478358,-25.230683139744446,-1.7618990463504312,-109.1699339480578,-186.3835225577892,-27.248983876717364,-1.2041822712011907,-20.535832519135212,-155.80892219246797,-21.098726489053245,-39.332767343320384,-14.749194953565897,-76.89733485671019,-12.720126789212193,-1.901657007208672,-119.64593564157478,-33.704171240647376,-17.865613837109574,-86.13137683083467,-0.9505993072479406,-12.28522425014409,-0.5966921723283174,-12.062416681613493,-39.291506966328996,-131.53227497686186,-0.7810673603022951,-169.07698882186924,-3.139212077486036,-5.639018520657501,-103.63082437773063,-127.43961201625663,-1.8009774133037588,-49.51074536540898,-75.75451663201322,-53.2394897214872,-131.94016361480465,-9.584787631390505,-71.68836513588231,-112.9762245731831,-123.28975068657653,-48.33367948523993,-14.061740405381315,-80.25324692189956,-1.3843163853415832,-77.2555011278168,-133.32144305715315,-20.599232892490797,-152.28197719855706,-55.31140162863798,-11.882541271617322,-172.18201942268362,-14.754219237802177,-65.57760564446079,-12.884666593773293,-0.964457463390467,-0.6303980269841015,-4.055973458049678,-3.2244883361733585,-1.2331054987198584,-21.82928442261938,-110.49431457366792,-36.82223807899568,-20.858524582899918,-173.1758896157403,-2.5487874551883847,-73.83224528621706,-1.1343128087563459,-114.1162506612325,-0.7523311370974186,-60.566949024482284,-0.6238728933666664,-85.25038703198756,-79.83423109615897,-182.53741040714567,-84.05627620696282,-60.69163895832328,-0.8589094221311626,-65.62757413505842,-122.31766915799662,-6.214812776938507,-10.176764092092016,-152.62783300553605,-0.6900663684016517,-164.2679641857071,-31.67534204755864,-39.82355861486004,-114.13160321427547,-131.0637842424712,-0.6211426169030596,-42.39595539444442,-102.82657831523777,-68.84036767337423,-116.33879985944513,-6.691483803570261,-13.587650635811428,-82.51786219261744,-3.9301711389026566,-1.8312664502327838,-133.79764045524402,-14.417208740243613,-182.43319294380714,-11.721999528734035,-45.00255176812058,-28.958618110283552,-24.90070752442147,-185.9857510180867,-24.47318762682462,-64.0165703679588,-40.93048730714435,-129.614635996565,-200.17112375133817,-8.411618972951622,-25.612941643418957,-45.206741859180035,-140.13920719233826,-0.884621796950297,-45.05661313433138,-5.664306252282778,-2.83027769020532,-90.9889842666527,-144.61916556529374,-36.74805941951326,-90.91319837601405,-0.6366122768095561,-83.15659821997194,-89.87460805404267,-0.7162142681149697,-11.295378002589334,-164.05691673530455,-12.13975470779878,-30.279251846564627,-42.776228684640905,-56.363160056851434,-21.540839058908784,-3.68605559523398,-62.965820359707585,-19.21666197233383,-120.5832425060161,-2.8605336364478218,-42.755831084582695,-104.62041842002233,-17.217486230354357,-56.905664297855644,-108.13324286006163,-63.48296815773789,-15.307352985772102,-111.35013232899003,-6.512912350755791,-165.5761187547992,-15.055927999331129,-112.01913960993754,-25.323914735781486,-105.7675226153577,-5.319906104845118,-54.36712905587403,-115.0151185766241,-32.02531981124854,-72.84815028746868,-152.73603845469387,-9.474293840564709,-5.89246153695525,-2.4399502982050807,-27.356470685685707,-0.6285097864885998,-61.66965266770434,-4.47906967994669,-0.7734084678256714,-0.6069105346207042,-99.58056093817106,-26.366320976081777,-10.633882566944372,-29.64814819004993,-6.176326740721317,-7.764152903435707,-135.15074929559955,-2.1228683323011905,-2.2810260618024203,-119.72817054553657,-1.5858934557603657,-23.27304121102153,-1.048852482664361,-47.30184478762596,-50.328549054178204,-5.622356182794858,-63.849717532070805,-79.75651834724084,-67.91930343044228,-50.32279954087729,-90.06596562598561,-160.78108083194067,-34.00273775453614,-79.74656022166388,-146.78289872525215,-0.7486107689739718,-57.2643185240272,-37.172084423139516,-1.1211243878652346,-2.207672226128079,-117.40459166039464,-99.53256820578518,-28.380670883462813,-7.402986706222022,-0.8583169384798719,-55.554285277890415,-1.5882137884862702,-0.578995791804773,-129.04527357866192,-0.9442322165478828,-95.98476712428494,-13.536326663517686,-113.35506403009866,-25.92617898261853,-2.785289784728622,-0.5829419802574929,-165.51598008336424,-115.76388102776782,-99.81483128768075,-4.911327741926353,-69.22582644526541,-11.43884649276751,-8.130908017022369,-6.449870751575093,-5.43239740380488,-181.84370022338064,-9.046809667432038,-37.75672249716499,-0.5797603340687054,-23.154318478817885,-93.91178885380545,-3.1683005739184633,-2.931880672671044,-1.447666794853264,-32.508798597385166,-15.59045195340149,-114.19876149898501,-1.4363513234561274,-144.17751177736565,-181.2544198717317,-155.5449099990777,-42.89305277206482,-35.81595168891337,-9.951234689403556,-111.64205161744508,-31.468369444400278,-11.144119906487656,-4.24750885159278,-51.600137606989335,-21.822546055456765,-8.956118033821927,-172.84413163924057,-157.41995450893992,-56.13758040540933,-148.44919287586575,-16.461812543798604,-2.6439149727522175,-15.789497006787524,-1.494594814046085,-41.13027146249313,-81.1646231701541,-67.61798298294867,-0.6522856722684874,-4.127261928644231,-150.5964875619854,-0.5796253203534896,-128.67053228834814,-16.936948917088756,-110.07326996605153,-13.772260014555336,-81.256102266492,-1.1208469876090508,-3.669128548863501,-129.66526852775982,-2.944356239987823,-65.64482820729226,-62.75482313845772,-4.604068897225818,-127.4479018277511,-3.3060150630301552,-7.388540673264799,-125.22541917186743,-6.650022684869876,-60.77261208630201,-62.408241030795686,-9.371616090927343,-11.73848576839745,-1.5753132371878023,-100.22267052847107,-84.55968407234819,-94.03441273285458,-51.72129685181774,-148.16663199175076,-5.8191289147245655,-161.26748442550652,-39.659251302200325,-6.353480737309603,-0.6946153683198695,-1.7209547460673225,-3.4653125266727,-0.5879654126105134,-81.61804583777766,-36.30355194697932,-156.30668712079745,-26.01239856993937,-114.64202566523865,-129.116291106786,-67.38750192056004,-5.798728275660546,-23.16038636105995,-111.40145028784609,-135.1205958805027,-16.20280202606248,-24.133750172767385,-1.4905473113235885,-3.552060620913694,-173.1580920440835,-99.5056495386363,-63.242914682654316,-1.6636316223565364,-1.5998678911095654,-82.7347215430762,-141.4016091462206,-8.40574989960371,-64.56746710326503,-3.0622498644496705,-16.025838749471795,-19.257487889890296,-161.87975514555785,-4.709932569086865,-57.12386185160436,-1.2822343007996988,-52.23704156068236,-28.943449018797764,-1.5898472550154437,-3.770419776224733,-16.737357347790983,-28.91449404999463,-95.10833216964573,-128.85607146074318,-21.000872883602383,-43.81927624860847,-0.576030385606451,-43.4115602305122,-7.394606521386988,-72.40864924105391,-111.07217573281585,-14.257506753812269,-1.1873783582881319,-116.99510947246263,-22.166727958889986,-88.98226750993271,-75.91609798173033,-107.2810645040269,-29.0456120528308,-32.30894292317444,-106.6506671116818,-16.53652795991788,-19.885459060567882,-166.40073029276118,-50.09575562771087,-130.31112734343458,-108.55085332323428,-50.08788512508773,-16.311833066417165,-126.73611210748737,-97.48218430808838,-0.6510175927847663,-100.36201454658534,-50.17539472288529,-82.07307490642474,-10.028394532211365,-77.45773438207122,-90.06342695619854,-4.036980878834415,-105.29786650076244,-148.93720417801237,-155.4788110371664,-92.2164502301859,-104.06251348549306,-44.77665639836425,-47.22627151816413,-67.08379307454346,-9.578334463602175,-115.04946459006081,-18.82789007062514,-15.204966893562371,-61.4106611376987,-24.31858905592339,-77.3610182322432,-46.43555414086756,-3.144708704291955,-145.84907716425124,-2.417498217374846,-9.174929161449624,-0.8950858642619455,-40.67751188018842,-134.11053939036483,-0.5934148460626236,-45.13856347666426,-83.62408445760572,-95.19970701210067,-1.819254785134687,-37.18480033173955,-16.012316196307175,-2.995413228842808,-10.635411214871937,-83.47977158318754,-109.46068121691985,-50.03811224023567,-1.0721692442580917,-136.85725717408,-8.19774967526907,-117.60359541951215,-9.343775867463076,-0.571753778593358,-31.798476567203426,-97.7526768551958,-0.6659784752913348,-3.732306975575,-106.04008875679423,-134.15245644223435,-6.408387423293767,-26.832424656564882,-2.603785420842164,-140.2945714021467,-0.6435630434075676,-115.9954674734513,-182.93776038104195,-55.337007518111534,-1.9537891312954185,-72.03405895320434,-0.7840772045281916,-8.164925820959398,-85.81310678201862,-84.69022810810912,-109.35208320172842,-138.62818667059332,-17.593088701903216,-103.00671625407213,-147.59666702057896,-8.323838150921231,-52.73027472147376,-139.68513862405663,-93.87494406925218,-157.34663661700577,-34.551314315344705,-53.29021524260197,-27.160158164210568,-78.99537434277634,-158.83808888479257,-1.7744476033492376,-7.852559709349208,-11.41541883867954,-13.048296083261771,-9.397037224413202,-16.83178687337601,-29.91283322955227,-18.539163391091616,-37.73127752480121,-8.877582933096168,-26.060523175764104,-0.5899045486624557,-56.83964012388224,-169.0721079950153,-60.91239535771045,-172.3726729121802,-146.75414376684682,-6.845965269500529,-20.544792721247994,-161.94596105838784,-10.20769770491463,-2.436630835280374,-43.86508744987131,-139.73718580238096,-56.16315139827582,-42.27546539133861,-145.61733330112062,-12.566751786429089,-42.78573355168909,-0.7640754780495032,-18.811472051276958,-0.6519654337865517,-9.094417956376441,-6.959745518117896,-127.99767729611575,-12.382384483217058,-176.8690621743031,-47.18693920151333,-49.62298485268397,-77.94457863211323,-55.5569053767057,-180.69082109503668,-53.64216935914225,-51.13145177024688,-168.68604527626977,-2.2156909895585777,-11.966160501036917,-23.801123050231432,-140.78408727922883,-39.01452154458929,-3.5456729518466554,-170.7242555410351,-25.66328119860025,-126.22763200171795,-0.8044952305506676,-33.4333761323991,-12.045184816348005,-2.73074859247133,-6.419977746269274,-0.5881640771083285,-51.24694887645665,-10.894318021320647,-143.9788526887556,-26.157281574112396,-113.01776466871434,-140.3701272979573,-1.6453107664634086,-60.909940392329545,-43.652735077224385,-0.5708494193838103,-5.035354615072862,-87.61879780707427,-3.136348624421747,-27.664913183108858,-2.871386278013146,-145.43431356440038,-35.97936889967324,-31.43953897275522,-0.5758773816340357,-96.0160034474236,-34.40645185753057,-63.51752432610122,-47.07909817796749,-123.73065025088651,-13.52607443079899,-117.42878218650888,-5.566625173281793,-20.95792684127978,-15.457727554737515,-136.58789908870136,-0.7801575586151053,-134.83238873781474,-41.59940254994243,-1.0818966213648016,-73.29945240965695,-158.36214819397895,-24.55826572692707,-0.6201850082492424,-70.3182252216223,-22.91663659165796,-1.363637739470331,-23.194318020953357,-2.9506545424217387,-48.73640247285006,-3.7719666199619897,-106.82048505345529,-4.777823587357417,-60.84469705465685,-25.007835647634153,-11.045988544821387,-23.679065431437085,-7.9499255039670444,-126.7764598288963,-14.932802153703285,-9.253802791841457,-3.325743368339631,-6.228201288696457,-15.263773511041855,-65.74984570625668,-57.823574712779,-65.39047749228712,-12.278451485476435,-163.9072043551386,-61.775412200726876,-117.7869523497728,-141.9677830754441,-113.7130709394729,-22.668546512303962,-40.89554743384234,-1.6087295860390627,-128.76612952897983,-185.94187401679764,-53.172366592793026,-89.79922999431477,-25.0502441705977,-34.63167175674683,-115.97749290327076,-175.7028240028143,-90.3093327163066,-12.546535299445898,-3.3046065640091946,-111.25692031902736,-108.0213634017617,-79.54700008890607,-1.58970067960708,-1.499545991822873,-74.44891272722566,-0.7218710140700786,-18.008538946004904,-2.3068025327938475,-1.3785679334197845,-139.43182280521705,-80.01494260375188,-0.6092770244225605,-0.9215899031117548,-37.12053656595348,-0.6045013706573537,-174.9849543665348,-9.25789319343158,-161.4355937434336,-4.8217511533808475,-0.6483296488067616,-120.12404324488539,-60.34427122387086,-14.69113982403124,-57.30897494202786,-113.44501178113819,-34.738048265596966,-34.34780902677836,-3.6457482509517996,-99.42187554123775,-1.0004234605328253,-5.242450789352985,-85.9619873578334,-106.3545215882763,-17.395796937273293,-76.93104441223475,-0.575396655037614,-78.15022303607034,-105.66965297306261,-33.423673961589515,-36.07406728607072,-51.61401494596175,-116.55867056967017,-68.68563001211044,-53.75580272004396,-8.071063822812512,-156.53233037828073,-10.890151754656616,-119.097401180253,-1.3645434938425776,-46.75785703470089,-3.861085197472508,-99.16043217931326,-73.75996623733073,-1.686103173611309,-1.958893504623239,-70.56201145785525,-0.7095707060645423,-4.333221271911097,-4.597269643855382,-14.392211173734795,-56.57409603806115,-83.4826940526765,-13.239600543006642,-75.45131412546924,-28.246414593400985,-7.404548928073261,-23.075523325343447,-126.69878553871295,-63.50469814233223,-50.68832615867082,-59.53153829769178,-1.0248741504061534,-167.75283638983876,-5.3538075028994365,-64.77258467379971,-127.6496179612333,-11.542302325954493,-16.86097226142043,-163.46433752387563,-29.497689416891326,-2.945242827059745,-40.045634544160166,-1.5452098424175569,-83.60862544652086,-10.248771392207248,-156.66135476345303,-55.343507005713306,-5.607564198893527,-8.11824151942355,-1.0465738224012995,-91.34266676576615,-46.0606751539831,-3.858397038067384,-96.19176944052539,-19.92976228226404,-0.6456347076116467,-166.68344315252918,-27.911237765283794,-42.63699172934547,-46.058031119104676,-0.6091873283614282,-9.734862174301119,-1.2600776719105529,-42.108460516131075,-148.45546283023015,-37.51734611476298,-5.653377242420291,-1.0185705399181872,-5.558395376200627,-165.18514326240327,-25.451018600142046,-32.045330103213644,-90.97060987285504,-19.71583859016492,-6.051556253257742,-111.27597867133329,-3.2165920974609747,-1.0962751744676007,-3.988509034867918,-1.0850509999036204,-81.27987774319712,-14.424156941363714,-25.72621672069263,-56.86214758310781,-84.72710567461195,-98.81937592036634,-44.73645976824184,-78.74156881669711,-1.0361932152504956,-20.597531372315686,-42.26825805431895,-9.816853065524992,-75.62650189221779,-8.475539919155835,-90.97173059984148,-160.96488540196313,-56.196830500088936,-1.6198285742517786,-58.97607798787309,-2.510516144403876,-11.251309255556219,-138.05851623219522,-40.85588714931062,-11.083149012877715,-135.76576231348884,-8.802906960643329,-0.5965634400528899,-28.375345480086455,-75.80674498917209,-8.64393593418296,-6.18541551111497,-86.2406316744372,-144.54675644276443,-63.93188289402862,-143.51497305693727,-86.57516310674058,-46.17947909656517,-67.31497897360084,-109.06406973976503,-104.25969692042034,-29.486592994248973,-172.95528282559653,-169.38197622538098,-16.388383509848012,-138.36975209531806,-35.0269440686044,-2.417873421339907,-0.5904611419737281,-0.5627641068419322,-165.0761405959018,-8.308524205687885,-70.39712627636449,-112.94261128662178,-47.5038370656937,-13.17365853285802,-107.47189783180688,-129.05662179535454,-12.96448998829133,-137.0083920436213,-5.643216582979098,-30.498163789693887,-64.04727819521628,-30.8644873807402,-80.20299397279446,-70.7626958779323,-79.17150387423172,-164.66645065982723,-133.31741988802034,-137.11393861224613,-1.0058898172998116,-2.638626503702995,-9.172330943469996,-6.042909520932955,-49.42821070789719,-148.2949993161965,-157.90831626046685,-0.5244888724833613,-2.3366903452332846,-145.10988056827358,-0.27743279040696867,-15.36879870951877,-69.94567319807891,-10.523014631634908,-132.8374915056894,-52.58489143802319,-75.01119298321402,-77.8056557700921,-0.7774525156395833,-122.1992879856458,-26.608863881332184,-0.6840085442069679,-30.523761664314755,-145.76164867175345,-67.34104134459591,-17.728263048464406,-142.0878575788951,-100.3634335477571,-174.62947934591318,-2.3479915572575423,-80.15064777851256,-22.129246666898197,-63.28139490803207,-0.8267644491250281,-2.702573475803029,-12.333585322488975,-6.814193535503619,-9.448185557300835,-14.564640910014386,-10.219345092761738,-7.604906345686034,-3.2246077049924686,-163.53641046389805,-44.05318080776532,-1.0825547301377711,-136.96322713194328,-123.99838083279813,-193.69571317684094,-89.90191899967269,-89.46326646669483,-57.30322086440638,-178.19904563549454,-54.26506995143082,-0.565168128903415,-180.2596773027649,-80.85966897049784,-0.5746656371410213,-3.2527353096197165,-118.13507599816637,-51.150763283844725,-2.786530646108597,-87.08069594876679,-119.96005505372845,-20.390522615703684,-2.6926889546917265,-16.25236393615293,-169.35337626684108,-10.98059483711588,-6.9114607791721605,-14.060901911205908,-86.70787868596551,-61.47711064377057,-51.92715447593794,-18.480247813226086,-170.44104224852705,-54.71924670813441,-144.8399114601352,-95.46282568803814,-0.7823411569508558,-145.40612145876128,-48.59620711680293,-131.81593930416685,-74.46999056456691,-115.75401323481854,-0.7662350494224164,-22.218736555675783,-9.222540479761669,-1.086543519345593,-137.66202447547138,-30.63990831833825,-9.84412218247764,-134.66395974192957,-1.914364704352296,-2.29589611268884,-15.901088331148701,-0.77624321409417,-1.8034006611716196,-0.5625270199645378,-1.21347243961044,-189.6850875598648,-21.81938540652556,-0.6322789517208207,-162.68602695337938,-25.67487549735104,-7.07111783436091,-0.6239989980547118,-1.3649414612074562,-10.209437605038861,-25.650721666833896,-3.6301609036666402,-108.396557232766,-67.66084753758108,-5.028986746771945,-45.828380003227146,-17.489571573629238,-96.47939527126792,-18.79172856201121,-0.5748594760908565,-0.5817362923137273,-129.91190059390192,-81.04190419980418,-9.396479331076284,-1.3801467395513192,-7.474791662719475,-6.795057205208789,-5.185672196887938,-114.09427849057674,-5.095032642561842,-177.73964364763714,-54.1525475867415,-150.81781873032438,-28.14978082274713,-60.46963490863935,-87.2019815012949,-87.26890060889473,-3.4439627575585856,-23.72148798462759,-81.51134989451721,-23.51346262862067,-3.1804747657341057,-0.5422312865940948,-152.52921174374737,-58.546735186315374,-24.920049530648754,-7.361724401047287,-53.759038331920536,-6.05628341207761,-162.65512730901213,-103.67814995615349,-15.400393659743086,-97.68450169161149,-10.624441510193755,-16.246332082730838,-73.87296663338914,-142.22702845828394,-52.47221178522606,-2.146800921963386,-162.08854641913805,-3.6901539606713976,-125.88323033453231,-21.139284273133708,-85.61453294458546,-93.74592889846154,-1.693669342448592,-21.420816664177377,-53.375578767753034,-117.93273166017691,-151.7165343537283,-113.48015756619088,-134.11005755919518,0.0489341010915294,-0.7746254812072757,-106.93921920704294,-7.389964634198746,-42.67947912304313,-60.530781807343054,-26.079589049909522,-127.6575690335876,-68.9204763487956,-114.5117657489602,-11.216979447439963,-50.027925605772,-10.964325864055567,-85.05712073879336,-42.310188153841494,-22.145675724020986,-90.63386123632374,-95.32580084186793,-51.70339179123616,-1.338124136494416,-0.6910112600878939,-51.26135188973341,-50.71756523774563,-1.4909750254999374,-115.08974575489508,-98.7013694316366,-3.863840734229714,-158.22931685305946,-115.41212516977612,-31.729285407293442,-29.43547969995891,-17.196714531663144,-8.215047152559068,-71.62307748751022,-2.6846183090467814,-18.05198192512063,-36.14278970314971,-103.87309247022222,-2.616188062405067,-1.8837667507060751,-108.83727374245825,-48.800767797638535,-10.046289794448596,-15.486411662929374,-5.971099409812556,-4.389863562054538,-28.839732091933676,-45.353714522989875,-11.483793967687575,-81.88488986095028,-0.6086658601554964,-8.549598794991645,-39.180085902365015,-45.548488923908195,-5.9070978114575015,-65.45139691613856,-164.65051481324392,-5.044987537284555,-45.48433621553633,-29.897848692985495,-2.5718895384589135,-134.3833093672851,-38.9579285533968,-7.446743016536597,-69.6133249755666,-121.18414072029394,-116.72726815825042,-13.966770121614486,-3.7450567758699798,-75.71733482816661,-9.937491138873863,-31.258831465038337,-0.56746261621646,-32.275981066045865,-22.017794015249972,-106.3297756085646,-16.98334990562866,-13.388940330002507,-12.630816700676615,-28.026313344428228,-50.041918287310814,-0.5869271406195393,-54.71738986960789,-117.9003461085416,-170.18662060149856,-19.37535364476968,-109.94531232397665,-138.6627091578437,-99.06105886018668,-23.661772241979314,-9.456374864291629,-172.26934977444958,-68.8563626617929,-5.209978107723649,-36.27174173915167,-154.13034469336864,-88.0294762719618,-17.153054036374623,-112.40072943237546,-43.47581494549686,-1.3433553711542854,-10.704262703216607,-77.11865380215077,-15.926258026223035,-148.0356005382443,-128.18522157446972,-57.45467664384679,-192.64286434827758,-66.55514262610863,-8.678822471191591,-2.4180822137994267,-22.859221179912808,-83.94443843492793,-26.882519844972244,-42.03686904484953,-19.99001957438887,-87.59963667965346,-0.5817089640078112,-144.8857841010676,-82.22030281649323,-0.6089673515020437,-96.78442700986021,-1.4599763341061007,-62.135999486282984,-5.366759655428754,-82.15789312674818,-110.64875800384345,-99.97285551896852,-122.9336933764316,-10.827822978941107,-5.488210718249281,-40.37955379518071,-19.151753717835746,-10.037922239543827,-1.8488369773718443,-51.93361389792705,-3.136929259731386,-4.300611328655052,-19.119542827383462,-146.92406619032326,-30.25494165737791,-18.071347934876243,-91.80287745743715,-28.532550600075457,-0.6355763693956638,-23.081202005545006,-124.58857284362317,-0.6708526353176383,-45.32711679399303,-57.85607295754845,-18.00184158851984,-112.51463347976099,-160.8393108741928,-135.19639332191457,-167.22627298591493,-1.7206880481199707,-32.9062358476114,-3.5795849247720106,-0.6240946926866489,-74.1287822403208,-135.46204758307604,-116.56945071681436,-0.5667117638864987,-5.2168740288274265,-167.25281006894915,-5.053790588345727,-110.38552519595731,-10.769087974764396,-80.67173200879502,-30.95632379714985,-9.563345557414172,-4.39336605929544,-73.18312262578338,-128.67989274368696,-145.75550508611835,-1.9353568761742386,-95.48764276280838,-1.7068337641513196,-135.8756915315692,-43.02904969648644,-0.7490742352897781,-74.42331721166545,-4.198698480011948,-2.8819587804698346,-76.44048854760692,-1.0089314099698985,-5.639016186277457,-56.02697689911452,-196.09539549588908,-91.16494790980053,-33.915444811093344,-4.396561777108511,-1.7178116041100946,-117.85504485000126,-34.47562274198425,-30.20172846443998,-19.706058926467886,-34.69920084657177,-171.459473145601,-1.253057413749634,-78.13231563757137,-56.42232650576625,-4.950672286996892,-78.99785774644721,-2.265811563349166,-93.08436579174203,-96.26023470066988,-169.3361873316982,-0.9606120849297444,-74.94981863380647,-0.592745524987702,-130.3944467087271,-101.97110509383786,-78.54627165860154,-70.71332020424681,-80.43282472187123,-4.954250032542417,-0.710504182752346,-145.26737124913873,-153.28506116617666,-160.8570074287074,-3.7472054453435772,-3.250674200089888,-83.77600396698918,-32.97151455999361,-141.17279986948958,-1.2493860012026499,-10.88544048679876,-0.6282632636917143,-71.48940002233972,-1.7485362540081595,-63.29631074042976,-8.52963470882068,-74.39596339376506,-130.32459438197475,-137.86556692425523,-0.5976411170508387,-6.217199005842118,-3.6377170375236636,-6.815915218687762,-19.685552894850666,-172.81046677719618,-26.56522497271183,-7.867095967609886,-139.81524080057065,-1.3508258727207743,-140.4154177868744,-45.108046904235,-12.2203627429817,-150.70089083818817,-65.99263891181312,-74.57458019014521,-96.22390483545126,-2.148850553434471,-44.10569314249177,-2.851357331709056,-15.618620286181557,-97.64379726536063,-43.38408819849866,-0.692304300196203,-123.17665440530354,-92.33068865264423,-28.311738819360407,-48.90316427367685,-116.41018574896955,-32.0102677600596,-15.131055691781492,-14.011759465071615,-24.547841800340972,-117.59897588563061,-3.07931833721286,-136.56149597325347,-4.259139061429801,-14.743704874912792,-2.3688435231214022,-1.0598902903728404,-54.0985910065124,-34.38232259706557,-22.042867969398408,-75.6854514283612,-64.53083806975245,-33.076300747512356,-184.0345325791633,-32.470794685653544,-150.0776628130403,-105.33255808929175,-3.344135770701738,-19.103380569260914,-0.578072530978794,-35.31202056697508,-36.06125728991672,-164.50517961185662,-142.19473696011823,-25.259765210492606,-30.05976128969812,-2.5258165814609397,-48.62012508219864,-33.58685541202442,-12.159672581383473,-17.634973021456716,-73.19685869537507,-0.812014306370064,-107.58319276234538,-13.1288242858331,-19.50099922777241,-178.48625975394037,-3.722523463915012,-28.261502933952965,-23.191374683993132,-1.032489047271179,-1.4495065363032404,-4.164478982578661,-25.299253094412677,-155.00784332871686,-2.6082190897523088,-80.56569058832434,-22.196796650252644,-58.063343629565885,-185.77967562957747,-23.783786515619305,-120.03261913302848,-60.62901810235233,-22.70320556327832,-27.880162924015245,-52.08799722872798,-24.518342417385536,-109.66292519262305,-10.927977381413552,-28.037780185540175,-37.72899100849079,-2.202836823072233,-0.8250254939076385,-3.666715648503809,-94.25935499572888,-0.7792059614239086,-26.33514822966442,-194.64284851179636,-1.7100484997606542,-101.15793410346325,-19.377510973572566,-1.9926376608589138,-2.385640110145081,-108.3696113651357,-20.782294128265583,-55.82454349484644,-47.64961089118734,-5.440440022625189,-47.24756940573995,-10.00007105201646,-15.22731354671384,-11.82132481582667,-161.98307782342505,-39.00220683650687,-74.80667794256065,-174.16591370324883,-43.27262864552983,-27.323965771143516,-9.49409649371405,-18.130746112973128,-10.742803203091182,-93.35731684899275,-18.10421594525304,-27.755617426119862,-182.983483312265,-41.046796304909414,-15.077565861099963,-3.0414410839920554,-12.884387031369947,-169.97384508027275,-1.5939437841750415,-29.0291959800002,-0.7030673340689229,-67.6920035726878,-48.510599586399096,-164.98634545009568,-0.7613902400025779,-144.81130994257012,-83.56327310608408,-24.296363486856595,-6.675381633224939,-107.48107478792708,-73.34966951775577,-16.482003188560576,-13.801921331765048,-132.9003773775627,-169.5919655117657,-150.51450880896135,-185.32348003140078,-49.97455169726712,-107.63952624034407,-78.22530036521738,-1.1860161541296836,-141.70205937497244,-0.5804306455589696,-24.19480695377107,-102.83023916660369,-82.72916412155338,-96.88621249750558,-125.90422900176632,-118.32984996733677,-0.5852800892199479,-52.01127795889001,-1.4741581117106453,-38.9183200624126,-112.38341170715269,-71.51221768109646,-0.9951173155290562,-104.86247838711618,-65.0153377355375,-48.77611593484005,-0.5711085164039709,-16.00806681254199,-20.44326869634483,-75.197756890004,-71.20757689996499,-28.7855978435566,-7.275770028295604,-7.479037138472599,-0.7089553274890414,-3.0451796080554256,-68.81420299992985,-130.7233813454318,-21.44438733797182,-112.80581473143707,-121.14685987102742,-134.64174349577357,-147.0465421408439,-5.736409112479887,-41.851563706187065,-23.066824986903885,-154.30042019132003,-145.5585319235703,-3.20988318895459,-1.3507761068856152,-95.85757653802969,-15.790381536271635,-19.00340822418812,-21.8009843095301,-76.95279360797956,-4.393243326226576,-109.70621860683859,-1.2115277477704227,-83.50493629439346,-2.9146316796475746,-156.45558553181726,-134.35052313633457,-9.284953899890509,-8.032603907712904,-59.228426723750566,-11.091973060206882,-65.46124360866595,-146.33625181659096,-1.6514528711288934,-65.4717619844971,-46.85665839485528,-13.413692045050174,-71.77908800242733,-0.5201953400524103,-3.1501232273853974,-70.9508497536552,-84.70774166972586,-93.28454842179998,-58.698194111095816,-9.983891177172719,-33.22371953870672,-47.785523372258616,-1.2085871035734366,-167.2965260070707,-3.2538315950568633,-123.30340309809108,-35.32039336574218,-139.17972336685136,-10.258741878454485,-5.619489015062683,-180.01437978835435,-0.963739947575994,-26.53719609370804,-23.018867668482226,-23.206748420810012,-5.027494879650545,-116.28189910731075,-156.62673257339665,-10.119386745594369,-54.723775144651334,-141.45461861353039,-61.365261245098935,-80.63203385937818,-7.839326702866176,-11.294537178378306,-28.385448257799865,-4.0266089299925,-66.7350858359993,-12.926771239762802,-77.25094182362493,-142.84761203467107,-60.68649999081033,-166.30804229261483,-2.6901741625470232,-6.737051992231733,-65.77802194726105,-13.627483965098222,-91.87074425469584,-35.19320354104949,-8.889424992328966,-159.55880127839072,-115.20919597932667,-5.129643688088365,-12.817756814001994,-84.58183798979694,-49.8133025304663,-137.00711299259848,-62.78187096276159,-5.27300783289601,-0.7669036374043161,-1.1497086241703054,-29.94580757925462,-28.80015620197235,-56.40942524861858,-69.17836982481363,-52.06287447373683,-11.462607778419528,-11.890921386836,-0.8225450268455607,-97.93766461602092,-2.4402462162808263,-82.53359710144788,-159.589906735387,-0.6320315625269783,-69.93197883673488,-0.7342336754876728,-80.35433489827649,-39.1363303429617,-4.373671350050164,-30.446739684040622,-41.00934353623563,-23.208731734078228,-114.96794338972698,-96.93923206308915,-166.99692348262087,-105.50536506909503,-39.0858581904493,-113.00907149108485,-6.863115000165444,-29.978639360845506,-7.866499171659373,-71.90548934150193,-140.82654221729618,-103.78855659117343,-14.440604427436796,-82.03495636714894,-36.541786847531434,-0.9296372373755871,-7.98643797444572,-20.484881046104018,-125.49704201974225,-0.9817082521683731,-51.65502754928037,-43.399311254374204,-15.82253982305204,-51.240328918198756,-148.49320944186275,-46.87964688423278,-48.68016047956824,-0.5748852739808576,-151.04295667993514,-153.9933630157215,-19.15144092312866,-45.76669005466568,-85.495996467739,-32.21919611485292,-61.485062144872074,-121.9218045573434,-88.23261146770898,-4.464718967089628,-27.053640039561245,-32.22177223769799,-46.601994972528765,-175.33471178220742,-165.92612265009532,-156.83174093241544,-20.70345216349663,-68.07215387558773,-89.08400405970436,-33.97033102582188,-28.697323461051045,-14.224309889171625,-52.17153246847022,-2.2337255491505363,-28.25365658217504,-105.25094515954017,-2.0348361918656703,-149.05168706978162,-0.5703417692941185,-16.252313253743452,-26.457788976778026,-0.6005585418142614,-1.49287378029466,-149.66739747678216,-0.8279833647067188,-63.63057662164112,-0.6101602032393065,-28.320367178758048,-52.8964912766275,-9.11023587521522,-11.885066263132053,-26.78989510108751,-2.8095527217449714,-82.04558464187028,-28.46584930046647,-129.1377846104603,-28.841424144861556,-17.050552832449828,-1.829539548934302,-146.69238715830954,-4.568051284387753,-11.037220612114469,-199.0527127377196,-1.0029417403516314,-0.9721394761103199,-130.25067286355608,-58.927544986412514,-41.38935910958378,-110.63565567910882,-125.86927689889754,-1.0356520387082222,-23.316282146677416,-135.08106473187127,-15.53432884763308,-133.31438452246286,-131.24418367985243,-21.9307219594094,-37.906428020400334,-20.623024171822987,-3.5020585728624365,-30.77143764577817,-20.716985138873824,-126.12805095747552,-1.3303330514482203,-177.45110360181883,-106.13962408658317,-103.84372291731994,-128.12716775595834,-139.22620449811984,-11.184782969180134,-33.081047810864945,-89.51681417312126,-114.122013622819,-2.534626899811181,-86.29755990373356,-70.20389682456766,-11.582809640053377,-58.19885321602853,-14.400169035545993,-15.472880361523272,-91.66170868432283,-59.77633743094554,-54.21442112368108,-2.017907002193813,-24.124030715914632,-84.2964295817976,-86.08172453302913,-17.85828047955961,-20.1270444998108,-8.283849358494269,-118.55854519778869,-52.02949677813292,-65.52206990017835,-10.807378787580731,-112.40066220958397,-115.09645451327407,-75.05794275102406,-198.98864359015488,-15.918618700406613,-0.762455415995593,-3.478668368752837,-18.220562309367587,-23.290998559725587,-88.8268010963391,-130.0238241653316,-39.10791657519664,-95.28377801294994,-29.38575879224757,-8.486169345677657,-117.12496436162574,-5.960819503974458,-5.954620673038651,-107.22501426267809,-28.368006256342504,-41.39799624717723,-94.36073651372931,-41.38979533733192,-144.85699177842932,-24.291372695188038,-0.9320604415762594,-33.082325655151244,-187.607498745212,-171.7221948392822,-167.02496925152533,-55.2345114166069,-85.05324211220818,-16.704925078300242,-4.7126292483205265,-1.312861788663004,-98.50655172968331,-107.76622926180276,-167.0727280537369,-1.733811918222026,-1.584881650142206,-119.8974601878634,-194.15233603662975,-109.98604637470478,-35.79188966351759,-99.55050818686773,-3.6372806092702623,-1.8409711771228001,-44.75191811659349,-37.189453750548665,-12.262052009372773,-160.36395793862417,-112.89006712021052,-181.59761233820916,-33.805275967500094,-141.7808030838487,-7.064190197407695,-173.35693255687585,-93.74196473687859,-1.9381260315933417,-81.83614037424529,-113.54075687587094,-154.76720305290618,-38.430723355648865,-44.04598496154069,-11.005129603239455,-27.955657533037588,-10.260919717241483,-69.24500188140314,-30.624218291542704,-12.388613415405983,-142.6123556417894,-138.30676937966578,-36.1163702845401,-1.216916075740766,-129.81651976684702,-93.72702855167081,-141.6969703751273,-150.6375895529858,-5.3892532661804005,-131.61741895423592,-42.58968325901989,-39.097087297385464,-75.52251944459667,-1.6936849445918556,-7.682557221935722,-167.1918630613957,-2.3286420469925,-81.64265067115377,-2.7532747201708325,-171.7553322248939,-11.187664787871007,-7.3512396026161415,-3.5203325873677245,-56.29403926670015,-31.196967223433667,-6.103143541857314,-27.722313818831825,-137.96345444600368,-166.0941880057719,-53.465172249996264,-16.82447187825823,-9.256265806787088,-161.34732134877402,-131.099156413825,-33.62424899109216,-167.01130111190395,-120.6172047395082,-12.885074673479927,-67.99092534399533,-150.51528024430476,-4.155051156545176,-170.44382347753125,-9.125573000340687,-102.55566077763244,-1.3224507173766753,-44.75386787021184,-136.56722210188238,-20.603693510557584,-2.470817250696468,-0.5682706220553868,-63.163599116760295,-1.5832003702635822,-58.24152216952903,-30.439826344327805,-45.972490967486834,-125.165716641222,-1.1144925247161062,-96.41016989392077,-49.78906534038656,-72.65821919962133,-148.1157605969705,-171.38956873501996,-6.648621187276829,-63.28248945609867,-4.287982547538411,-1.6534390117120985,-1.0566187333346966,-128.99537411306795,-102.45650808801078,-50.163471158788866,-67.09016340438727,-25.30539800537479,-61.513740713268454,-6.4267567296356205,-34.49241657383282,-97.87726430367239,-156.7711565604928,-0.5538589561100703,-29.47872424773851,-163.04622758715442,-0.5919222930866765,-148.23682402364685,-2.9109548924004125,-134.4177346435815,-27.24982678335115,-61.45302990719222,-42.40766057451872,-3.240789767108703,-87.64920405459894,-47.57075154436343,-3.7382591803452865,-4.2336528282440815,-0.7595325464266818,-1.810221328273311,-82.2603368967432,-12.520634202252591,-166.79143883487635,-23.77415792052221,-156.6213777083407,-26.800583387101884,-2.500868524444302,-148.1887081237134,-40.09436952533913,-130.84664433719152,-33.375141122925335,-15.813125338790668,-2.346463308740186,-35.29078254597952,-77.87165043499152,-10.119096496057749,-82.18754661501123,-30.20494570439292,-7.468993941687651,-70.69567613975515,-10.933471409840795,-8.675317299637467,-12.791131824406316,-8.531754801325034,-17.883838082399773,-0.7045077894138956,-15.72483517248875,-48.7360183343428,-74.47156991194899,-0.5627315105245545,-103.6146645385656,-47.67328264127628,-50.09135004712005,-11.286735715851925,-86.30851587410879,-23.160947828010258,-64.6143507320585,-12.891056275354979,-76.99387048243332,-56.43749505858102,-2.0258233778841497,-6.183042876498771,-81.77961421660035,-1.1312880133730108,-180.60544592038892,-2.167933104760266,-87.16770153797493,-82.81841924833617,-104.54518507207722,-101.82108137131019,-119.66113091229347,-9.732438237878355,-157.65296949898533,-80.74936992811044,-2.4827402179467852,-44.888321185044404,-23.291428829798118,-25.793452274722714,-10.145090903144471,-99.63350705361195,-35.583487405172676,-108.59682450112358,-28.83785784402787,-11.761760359691147,-5.674070103618883,-1.66735794576263,-7.290542131408429,-1.9873166465842345,-2.5291362744340233,-73.53322158090093,-118.97945541830566,-1.2130170712779922,-146.02123157126434,-194.4833440444405,-160.5094506925916,-56.04468290574728,-183.72444571990434,-28.918461589065455,-139.2735940228886,-1.0939972365674953,-71.93332925203009,-76.5469616226168,-121.61810832763283,-181.70547605501307,-83.33413549628834,-87.08184397317011,-159.55565237621238,-40.1326298334943,-107.61591968587354,-8.84194151877195,-0.7273785697838244,-41.40892706051091,-13.034752155241828,-8.330109416632178,-78.17641994205073,-6.714130477345981,-1.9075513944797748,-13.232765392766739,-151.03438470265522,-132.7102858838569,-141.31827304724615,-35.78192618778321,-160.40043179942847,-76.72472811807582,-129.41414707515054,-132.09298576263976,-95.74618426327064,-136.0578999509911,-2.6201051449947776,-26.618309442658525,-4.27172155446776,-71.43509154135303,-11.431517026044201,-69.37870797420128,-5.272175576052394,-1.601911343084668,-151.16357253572275,-14.396992992092427,-7.3413487655708485,-78.53055959344866,-15.13447890845007,-0.7884354281375696,-0.8199763988746964,-113.66493146847222,-195.63718952156873,-16.64581599770831,-21.607523286691094,-28.16469223095329,-137.69714771422483,-37.64873457566728,-2.3620852640382255,-3.4175725246885325,-2.5245169174639006,-60.62430037648751,-70.7036602156165,-35.67620586973914,-8.858681566755614,-0.5930283620496363,-1.043925175534687,-59.56446666938309,-1.7282397646515761,-134.54400566190935,-138.09335716905971,-57.55534408957969,-11.501551690744206,-131.14403113661868,-15.040767147620226,-22.206196775567506,-0.506693382993201,-1.908836151201426,-132.3954391040806,-102.59656459042775,-64.8134401786143,-7.636492025819502,-23.363820659500597,-18.540678056193205,-149.45375238810433,-175.81607582821854,-141.59672519320856,-105.41828881931846,-23.89804928270956,-0.5825205372504628,-60.400858397273566,-1.5083534446883304,-1.0191105495877597,-33.45044995919034,-161.65463746876674,-0.5706413696639103,-106.80548312260021,-20.48519477973183,-70.05337191838578,-37.91241208436742,-0.5976464676811073,-61.00664585713255,-2.223453253818941,-0.8703418072433182,-179.8542515497205,-74.97080445435702,-120.19877312544536,-8.044008060486947,-4.978814688849733,-2.977393959862658,-44.31296845621142,-59.99589506675786,-12.475925758621841,-8.096428571701182,-170.56742353749556,-1.1060126980139457,-25.95350765334527,-167.91210905058557,-77.45096451722172,-23.68828387992624,-41.88718915738073,-9.098594154511375,-8.39665914978891,-171.76723595689597,-2.7829813310475857,-80.40498986838075,-2.270338489426761,-5.980977156316428,-159.28306427460132,-78.95197801667848,-13.659099915181848,-34.14730198790147,-5.896548117450946,-46.28719429346555,-108.34312639942226,-3.1067451238063644,-158.99170314618365,-60.48688786250773,-58.67016924375234,-16.418254610183144,-128.43425908032492,-19.605908106229727,-9.012286047626036,-134.56231835370684,-16.06916032753096,-17.011679648913137,-30.15949505502301,-0.6530714333486461,-92.84910048435658,-2.436256560069784,-19.10024925418986,-31.22697356319584,-20.413026999056143,-0.9406079427592922,-33.77908689510348,-39.67479379441935,-31.81775053268436,-137.3796888979736,-20.807858869024628,-171.4668688559804,-2.7423208109972363,-1.5397135996900513,-49.45547135821558,-20.049668418164334,-66.8556944852288,-42.20356979660422,-95.31028806736869,-22.46785539820146,-1.3670990281117392,-176.43894883842268,-45.5746945577196,-158.4919197410595,-153.03197759834075,-101.12279937316251,-64.2083159697473,-6.780105910347767,-24.363622720663,-10.34897003378131,-43.80129259282258,-17.106494204016823,-112.88503129776436,-36.64421519718021,-2.7176898212449925,-0.5238862035919257,-33.40946054302088,-47.979023525553146,-147.0677998610378,-21.46064217743278,-160.2983182516036,-50.321921497524556,-171.43141962183157,-44.84506770691972,-70.37221815589756,-126.87058541463577,-145.33023712211545,-152.37444447790665,-89.9258690664297,-0.6184379351070213,-23.3573431629739,-1.0712425147484705,-0.5928790283967178,-1.0107259614562292,-21.950703542372736,-21.608368003658757,-128.30947315466193,-0.9349910430535857,-104.49643729072693,-1.7151611164199996,-11.212125360373687,-166.66138509137332,-111.35428865328359,-121.52380320629196,-68.26499814775772,-40.74698368583941,-146.36234049402833,-52.33504469122253,-24.124074026273515,-13.719135706160797,-5.172406084000537,-49.19436003541739,-5.013435099017315,-14.53021461982353,-41.616899936926174,-83.91248004787174,-5.684886766566549,-0.6386160761939204,-2.183997484963118,-17.519668108461225,-65.60196602390269,-3.3154072778434793,-96.77658346503809,-154.16741647739056,-32.83737023613025,-0.6410906326860726,-23.302675887085574,-1.089406684679867,-14.072171768962367,-93.79913475324912,-89.65207354738097,-2.4047730594309056,-41.89885795705668,-154.62555700329054,-1.6876496103823015,-146.14278760245574,-133.5253952570207,-0.9187009437398803,-157.32698854516812,-59.96794391635509,-0.9805978918296476,-142.00306804547495,-22.843678503864748,-4.530642454871227,-43.347692956975116,-38.114369821043134,-140.21696612206478,-50.658554429378945,-97.76441957234861,-171.5558327239211,-107.69615414722716,-9.589293522679416,-24.988959022365272,-1.3376955617319615,-61.85932484283581,-16.840091442244862,-47.25646580614795,-20.537702454320844,-40.779334425873586,-6.123720822592887,-167.72654358373322,-74.7576396685137,-33.66917905596188,-107.11581938388196,-8.131049444245512,-18.34534988278058,-14.699656539899658,-7.382070264341012,-26.168587781573695,-179.13780908502667,-107.22037375502968,-86.10628526942389,-0.9288801210227359,-153.88544767860034,-21.839471556147835,-189.85259165480696,-2.0371806349246344,-56.27742970097752,-71.73607813729221,-73.48720945701726,-1.0660130189842403,-1.2307834006979217,-4.3448925815489154,-8.454234222389156,-21.696099786200264,-18.41678347567331,-31.62107049859224,-123.35303277924574,-101.55219727412548,-10.301456653423894,-6.945165336567843,-13.455006487079471,-5.0218966775058105,-56.14200774351307,-76.56919031448291,-44.826637691328266,-9.381694616845722,-125.72911004272515,-69.65136180845667,-6.001723866428305,-11.058677510587604,-1.2004045342839171,-22.814327310024723,-137.03221075417207,-114.68661754101416,-63.92539484851595,-6.300727910023966,-11.556847112216683,-1.6847888147514105,-2.9474127930559475,-72.98097475324519,-2.768378810088308,-131.64611342944247,-166.6967878121835,-6.463719121158816,-8.11967556694811,-4.412394483205118,-68.91660068794643,-57.371661431198255,-163.59227680997543,-120.19460244101239,-89.30614268707387,-53.09124800051854,-91.31296048045598,-166.1965485551973,-7.070232169271556,-23.80405350121957,-47.0098469297642,-13.991035123249205,-11.34945992291698,-58.043306846360906,-33.77746087965332,-12.996085415666665,-34.1846440773397,-12.685691291599145,-0.5765503564081929,-20.845691686986108,-121.73001792198173,-61.72729176437481,-115.96744301649571,-34.783402816922234,-2.9509487616530548,-1.0293738242118593,-141.24678236925308,-114.86009145452925,-149.53315677310724,-20.447012573609697,-106.07602639808248,-5.76517288891922,-14.009420717386783,-53.82381202225439,-117.62993970715476,-182.6464262848387,-0.6956686865076342,-93.69156824760445,-19.778207038305563,-4.861114333627029,-81.26015570381682,-0.6306495913758132,-34.932885217317676,-115.50457134556532,-73.53817820388926,-73.71283826052715,-164.91883275805156,-2.501406088303664,-3.2191125143796953,-47.8040913856131,-100.08745621652756,-8.710118335332206,-0.8667452754929128,-154.40319981520636,-82.03723544564457,-1.0570491631944767,-3.9244029395415914,-112.54172240403948,-92.15999271638202,-55.155152647072626,-104.39924246414628,-169.31284743884723,-0.6659372417769376,-62.91978536793506,-5.34120679232516,-4.741976764843552,-2.258096073124044,-100.52025449548117,-36.658831593211694,-0.8951048791263609,-4.328830616230066,-44.50444352684223,-12.036847472389857,-7.111894845669797,-57.52353313469258,-1.4543161132602782,-31.248619151822467,-11.695871482319552,-10.137426116848518,-2.9277004590839777,-3.978372454336508,-23.558260733025858,-63.06674368962701,-3.252490986899399,-110.54197062157505,-65.42188241068048,-159.58133951381072,-25.1794190277791,-178.49864359472855,-1.611317353668373,-74.48825170521117,-9.02828305844042,-97.383141751177,-8.533363769915352,-160.89153950839423,-145.55457421113593,-1.3553695496784695,-2.4548304331964865,-44.11843006309096,-133.4602260876552,-99.79669968753115,-37.029222631979515,-5.315448391670738,-163.6458454017624,-142.66105158147306,-2.2673627230696836,-49.752624819403025,-11.356404827919167,-23.537379675311996,-18.031583876055606,-0.9280094828242813,-90.31672552289018,-38.2305769159801,-129.67480898495538,-24.00206247051745,-18.274143073195773,-7.8814340328436145,-124.5130519720861,-2.2741426506746305,-20.525885218038802,-3.630157978481991,-3.793679081813255,-143.43075064688,-0.5694227607589024,-133.8474684739144,-1.3619913828541397,-11.395013442696733,-171.10519237368095,-18.77600749791025,-32.028615118610176,-89.54494142847146,-48.86062423017348,-28.339833637114513,-0.9003547138509029,-163.6643304607266,-30.030811396849373,-1.2782451901849692,-49.72186548846969,-16.292727377897307,-35.07518513290289,-161.49627579575548,-120.90576652540587,-49.72082678133985,-67.85133227588635,-1.0080298566009724,-99.3019842797036,-2.428580871077896,-10.300225879446074,-11.461620063617858,-2.302362392733348,-7.172972107687738,-70.18503114147077,-129.30489669639013,-13.499288172545654,-155.52673836946616,-64.33310537676181,-90.61041439577033,-1.2598819773953025,-158.37088059405284,-58.194357429060965,-60.3609391550491,-16.893831813876997,-54.72571978425175,-23.483417128079612,-61.68030603812773,-2.0296123207589654,-26.957061155353735,-134.25747926561735,-21.61645563136998,-2.1896375499088,-0.677548409799221,-51.17355946416251,-62.03117458009021,-0.9592297970965884,-2.215640381781556,-53.35675680240628,-99.38946291820469,-14.85854193029897,-76.26816170852354,-0.6333420466708204,-42.52286228108487,-133.911030389297,-1.1942382743164348,-51.324152161524,-1.8982035414237077,-57.0522513154056,-100.52073904592574,-8.492452269804938,-1.8372589802464159,-3.696293019793937,-24.399705480243618,-129.0674098988465,-0.6412331521204422,-14.821819306109267,-7.801878790069261,-26.410794207316613,-24.609045427458728,-138.3817610401388,-153.1578991827528,-132.53213407480564,-150.44432737672471,-114.83705873886794,-82.54309860760384,-5.394972759913578,-83.25517615381757,-177.03968194507283,-125.40649119108524,-25.70997725108515,-125.85156518945006,-182.6430233412012,-9.835523309525435,-87.51600315852575,-0.9124002804914415,-0.582440113490744,-1.3735122317439252,-111.1979221469631,-140.7112244070434,-60.42228814697313,-117.50593142706714,-98.87687374812538,-0.8638417905538152,-42.89298184494778,-24.671078461036473,-0.567077759824218,-15.167598156308733,-56.91532083146833,-25.940513552147127,-21.52751838398075,-152.95165461441712,-149.27053341428245,-6.247265488333903,-31.997535655487436,-123.58972904455946,-65.48205722685572,-1.1747731027776158,-154.48448957499627,-147.66747752968334,-121.45827846106442,-57.585994158398194,-17.04895558926145,-13.034825585119709,-160.50192203534596,-163.33475793373123,-104.79947303699966,-66.4704268383071,-128.07300008567768,-1.509326061986493,-2.5999915173303663,-190.17568902441653,-106.96408546079795,-18.569152794837592,-64.13059982677618,-119.8128103121859,-67.98456980754908,-0.5673575181970305,-29.19150738605709,-3.285566251393533,-163.81305284897854,-50.81031608061555,-11.384276053626854,-0.6260057815701412,-88.04899820933949,-131.55632379212526,-157.04002204743375,-5.433318848808158,-48.876400502127666,-8.511105611846993,-138.8810545557839,-14.21158199668352,-167.03225279016488,-5.351206134414392,-72.32524937844684,-89.09054539560394,-56.73365739387295,-122.29310178015932,-73.56345547894261,-49.31686389032559,-51.90423522343945,-5.010687989941756,-124.29953658578464,-0.8868972874364924,-29.917637148457892,-111.38860645519178,-8.544108876011544,-55.84672059441417,-43.65047581989476,-152.3393824017139,-91.57396675603356,-53.243878851306775,-23.68484581312007,-40.05095995394849,-34.02952476133138,-85.24158328069919,-105.84971393690157,-9.69796013823788,-114.79723466697496,-36.03914164732058,-8.6146303651264,-25.584080230631443,-32.58332632163444,-140.23498928621777,-51.711807196258505,-105.52137986691658,-120.32498219076618,-37.02652302554435,-20.01456352015488,-2.2825589834167186,-63.41223981753093,-4.680857417210206,-12.491039515857098,-2.0176988463679937,-110.90875901958066,-0.6325504022783434,-145.55012473706722,-34.902821205114634,-0.585230543797735],"k":[18.271250518533414,11.118723172872237,7.751289254225737,12.99520494873125,14.952278053264303,13.362823183665636,19.90603276955597,7.590257122524431,5.836781337725543,12.595533687850441,13.198794762669245,5.243674003251195,7.336574913319325,6.725342274842654,11.201148431191363,12.870587891941767,4.916206619625458,1.859308627404892,7.88070445043084,5.005021464972699,9.548826184171823,5.403127524797147,4.1949733027374725,2.8479710410492975,17.563932770092194,17.901219738644293,19.75441520449383,16.96733478489383,8.764059761365992,18.067588427760107,6.319349200731237,3.8833336043267863,2.465308480792192,5.475535628048589,11.151426973552393,2.3543021286411747,19.317809312283345,5.644236070321735,3.3555674981287087,3.920810373445631,16.447789410834233,2.8508660607514402,7.577859132316891,11.829018839500307,19.528018149244076,3.6276257446480953,15.385457891118715,10.655690574138582,9.482972344685443,8.992462036872965,11.402619921896378,9.187067842597747,12.89563960984053,10.951990499711336,9.953526528907775,1.0472168276373273,3.1440793267386757,3.84433745563431,5.908387523462277,13.31982338470949,0.20529619036560032,4.136129228283485,19.564883455052488,6.8271615837152355,11.861288395827977,15.04182954869728,18.183471077832046,18.409147805807216,15.326971256565475,11.423996746843915,19.392209265035348,1.9335792668404617,2.8231887608262607,18.00957512306699,1.3793927033410913,4.927165225101664,9.609058597159152,9.102441762968887,16.23759668091502,13.385186641403518,3.2050078808601246,7.0141789732229,6.057182237472785,15.318845883367192,13.065959476161243,17.065937847824575,13.264392236830611,0.7798902166250032,9.526089299370906,4.821791544879348,8.283468725487548,1.341173250800347,8.075253866672352,10.645303383385446,15.321665407740767,16.597523263991437,15.87627918095781,6.708750831977164,5.763611058121714,17.990797041864997,3.1306270092600785,8.512151500091099,14.206201758420711,13.413313631134326,7.073012205179534,8.691263322481134,6.89642306432976,13.257759706726038,16.930782514956046,8.185663174239743,10.483887470989455,3.1745517332642104,13.473445099976328,4.006255533583429,0.8484108109001642,13.389788372224182,0.25205578551947383,5.843808684578438,17.767206537945697,18.546511422316346,14.901918031942554,9.304845854618598,12.140453984550255,6.929847886921161,17.72661033714617,6.240676972024328,19.024269122140502,6.083221180005141,2.557019669307339,17.50760586578721,15.739929702107368,19.43579825776066,10.252671802750793,13.344844181651263,16.003894476241204,13.271932131317627,19.665543160969126,6.460812356155858,15.500491873724487,11.659357425755008,16.63586530109147,0.44765890188364743,7.987082387827824,5.325360490496998,6.724918972403202,2.9449422452562724,15.372466997791498,8.51283091204361,1.2836330706391497,1.0928710817254839,1.4443785625600425,14.34449091347819,18.400233331723953,0.39070866968771156,19.419197605845902,4.108950708257955,14.11326758368688,10.411468888218035,1.0899673491913031,11.333792725580167,4.851293749068217,7.171225089608271,15.962518855842603,18.42176881088929,4.33189320259884,4.509590599764093,10.405914502981904,0.4398431051814544,6.749806492902293,9.679841996135474,9.300514638440415,5.102852647938478,6.877207776434946,15.375442412865548,1.9026549834738349,18.220037670721894,3.3973017388477755,6.777628390133779,19.922575742782623,15.95182626551419,0.7290200417522508,8.877513379380932,1.261663313054755,4.497658870740282,19.98662941200319,13.848966872194787,9.321792216290259,17.441312439174634,8.477366776783274,4.541028467153296,15.026791246321917,19.620568284608147,11.098742150395378,1.853311448192425,18.763325087702924,8.990727409078696,1.3310238617465409,5.605161798696958,12.900144176357342,4.126800081813684,5.078725205625894,18.92386406896232,19.775599701904024,15.923338252167412,4.798767623936575,17.89904063692258,0.28017365780460324,11.929762954634002,15.794674858270007,14.027370633214344,2.0540756229282,18.689113352824794,5.540994133563997,17.800264240983623,14.25202373711092,1.45686078090852,5.740698433067548,7.737306060142641,0.7314999716180681,16.924168920069057,12.070132685667803,16.20105472036247,0.5786415206936901,10.338206120751039,5.066177796263451,3.7113872808563064,5.6782213721786245,2.6283020769776355,15.31514279867013,9.299963530122625,0.14818146692753498,11.385871973221708,13.822146333045886,11.489645005357456,5.119414292227438,16.43375029299017,12.578636748013974,17.89767524237067,3.733916629387344,4.707787862211954,5.488479732627214,19.238444065178726,9.27692062119926,3.1588279339377756,6.9895741211057505,0.15258759594316995,3.0908720708978477,10.336245373164271,19.330672404818042,8.035413267495187,14.681088601581255,8.760939642583082,13.457450080055358,8.278837206328923,13.79818053138337,4.731665513202232,6.926621372106601,15.310245309262097,0.7932054338309102,19.19675978415494,17.772245718572727,10.25584978329591,17.88386610738438,14.064817803553197,15.679802468645047,3.2617891637340435,13.124368830631585,11.12906656684888,13.705666825323268,4.369858383979093,14.034364215039234,4.4629346929718405,12.7450629720655,1.8068433599045486,7.831594303315494,5.869093171615933,17.598826274651863,15.525763985705998,15.239779556450742,4.705932316040995,1.2341892065333404,3.6976114223012813,5.061220029830102,16.466828635992,7.918778976996741,15.019245140066456,16.401856940204354,0.6304916483967427,15.349987560364289,4.893324369143053,7.411974830212187,3.1789952761997675,5.873975553757065,14.215388690941024,4.881330898433505,6.153503416356285,7.754048782687448,14.230488394281755,7.907716884351532,4.779703439227547,6.135646177003142,17.791862156665523,14.727440724604985,18.963188263834798,5.609018093597387,1.3745154524159764,4.300732214334828,19.28124757374227,5.305040793516529,8.526777818787195,12.461013890751769,13.460885950244847,10.796051549824508,13.4475962834018,10.451267698436396,11.341537459814873,18.573855847272682,5.324025278354294,9.301958815041642,13.473550690841938,18.37994471876176,12.36660498249774,3.0962175680765647,12.509141760738167,15.192747321347152,9.681109510379118,2.6871371575896363,9.537243141627316,6.260825842665576,10.072192210733828,4.969417507662932,15.152001996930862,16.67834058459075,12.181259508359204,17.810180368985442,17.256677220781445,2.7776156461645707,19.778776022286895,5.635397747788318,15.384191396681741,15.132966813804053,6.21262085035017,7.787961860656161,5.466272062579067,6.784774240019886,9.808151537936496,3.665102762468102,18.442921943192268,4.1269629822303555,18.534666026523187,8.832402579491845,3.541631428639369,10.19777068021324,0.6305175292853482,5.224817126724619,0.42725562680673956,3.253348241767302,12.9460329324192,6.410197628967271,11.323097521567247,13.066636630305046,8.08323609951897,14.795968232004913,17.696684990109578,8.451814978223911,13.63055696455515,7.0040968113626745,10.98976260156551,15.889461757443883,16.317416418202498,15.632602210656303,14.000091402319551,11.43234254700841,4.957791819249722,12.029417209159936,12.72732518194176,6.58515316164801,0.4259150685593527,7.802674878127411,1.3282167396502897,17.25181083537943,11.015555724551337,6.995866723695885,13.492375130552672,11.852000921458652,3.022532789669703,9.388123244594215,7.116660376456432,6.7530029488439425,12.04165647296028,5.417600255358255,7.166514202897485,19.231736425497182,4.091849445012854,1.6007247569421157,0.7528427606389787,14.418800285892651,16.087124130741216,15.157146750640088,13.243975052043218,8.503257242118032,11.470711725698575,1.080367395138584,8.231751184677467,5.5248212720385625,10.805551566429186,14.925493009643503,17.3427096332313,5.39298934642809,0.0446030912688089,9.285138648732847,0.7570196246120897,15.665849720260407,14.835942097397776,2.057163751790516,15.698821744471317,5.753443146737394,13.883518583915464,6.31738697374133,8.189747618214223,4.448006249472267,10.278363098262844,8.462843326101659,6.499964875341968,1.7055565718016963,2.549131012737851,6.651914679900357,11.691600436318733,12.675774984572175,4.663804804011842,0.9842774936984844,14.95519374534437,18.908759742446275,1.222565465491976,19.15619190414874,16.228550545825332,2.0907216132466333,17.800888132018166,14.138268609141264,17.702499348388958,18.48915724877921,18.74196788718055,11.986035452669048,18.15970584699912,3.403520047336137,6.7020571882448765,3.010216609933334,15.977604267279979,17.652275452156662,17.819968221797616,18.27138280919836,9.531173974931075,16.048088318409647,13.874964108131511,13.491688721633167,6.574873437367064,8.04932412406675,19.97813633105098,18.270311436609123,14.696549818944797,15.156952835411023,6.839446538741623,4.345640091529832,3.623697434489608,6.432219583125445,16.292859496141112,10.988577831835663,8.38660844897015,15.556788571204002,17.363733895093972,17.82529343559311,19.489179657246183,1.9747069068884704,8.153462615667486,8.9297956344911,5.9401501088397035,12.127726437045716,19.378723150130057,3.133511260619999,18.69302137229713,5.063178524172569,17.633572107770746,7.92360112599813,16.79210923595904,3.20291862349249,7.658193055120135,7.583773001474117,1.5219277505065287,16.075801210190136,7.979056820233432,9.148684369171157,19.54100414836597,10.600569557920663,5.428054374207667,10.752271841612533,8.871826109680153,14.843662377706735,2.7076841605735558,0.6479511064665866,17.392032056922492,5.08361622908307,11.377022376870688,1.087874427129858,6.470654199934356,10.7444092624335,14.826828377387073,11.997928056819731,6.238812483563243,9.527408331422645,8.44500930301669,19.362585145613696,17.030657493410033,15.518125899096482,3.4397134780937666,3.2451540933084067,8.4251904144008,11.515992622677018,9.813350213728963,9.875922793756548,2.992536391778553,1.9849726274833257,7.917443802936486,16.211445764084573,16.2063361717626,6.5069034546075954,17.05854465203403,2.268001702023783,13.889853314629494,10.312490900966193,0.5063180950738522,16.920718299320402,17.291160103365378,13.565341249707284,13.834705399232723,4.566450793050696,18.952441749998666,9.868209165772882,2.668065305378744,14.714075372572157,7.835113022479141,13.29449658394958,17.02941256198054,4.128378098362857,0.5356143697591298,17.809232640079344,5.198006126368044,3.7490967575610235,18.161851655165403,15.758461710046507,16.852947157472258,9.80842461565949,12.760019318392434,10.251783448559898,1.1829405264633674,5.6555164707940575,0.3966245060116602,8.476738911905478,5.325914525970021,10.307551209345323,3.063749899144632,8.147557719189788,14.870348354864444,1.6501540500493794,18.382742627043626,19.854115149252017,3.084754780138357,10.75380725220163,13.552840300392539,11.783961567166127,13.203237532760927,12.96819828170863,1.1412668248246316,9.542873372017105,7.770184618424216,5.129422649033,8.110666329502445,18.988988652439062,8.004432019237214,7.935354304778861,9.259484097610656,8.982776410259579,2.9535424514044895,9.060056897345934,7.004158500854234,3.2092530949539455,12.737979676337488,4.22972460467312,12.112243507107907,13.707505667545266,12.601802585466825,6.473657103744577,18.78964797771132,4.674689968659691,18.720045017712824,11.432868644557018,5.009314808553786,7.139474733652396,15.628168361105995,1.926771709771713,5.038056405223572,7.917379732951191,12.701617818078827,9.979890972711019,0.14208371910204853,3.294467434743029,17.498466598553545,9.632075901501125,10.486048959016966,15.451020617009505,4.19238195237968,0.5584173349744237,6.162521609728726,18.983913756393815,6.531965237853896,18.760472441833052,8.632976400280663,12.191077430599591,4.358752478948524,12.438504967206248,17.125643162498708,11.320166953633596,16.262565400730537,16.78726723965766,2.109363286899595,3.6844178966986707,17.77119181873448,19.490281401365856,11.307500262124615,14.401907788245904,5.980379265337552,0.3061418666354143,17.960657605074914,11.867001575005629,16.256383445584504,19.04528135606376,12.100016054509561,3.2243439711354416,13.108408371756507,7.9291582090947665,1.401634800250604,4.468382056343656,5.432826289197217,12.093117913085184,13.122463665272326,8.168184930291652,12.539061301466159,9.053905659468239,0.5146758678786201,14.939603658078578,4.940489804119319,5.859366089691149,13.005410847043969,7.680667684857125,13.837859540862869,11.57611349283647,8.5333820820154,3.1396085189708556,10.30149430533488,7.879557429656487,1.0841546341615205,3.5026500435012453,14.692168101173465,7.923835155273169,12.254815278958171,6.17296005747201,10.413199900281738,18.606122076355437,12.83326770933611,19.676425365919567,0.05461579352959767,0.5147068152023282,19.358229738334444,15.921190167172966,5.192911626058314,15.832612871160606,10.693179235138786,16.639042955440935,18.463106975477068,6.314767484226946,0.662650917899632,17.650759045169615,16.811922392761414,15.562756392306252,6.868981646729475,4.0721486712652855,13.741537821391073,12.198770780010895,14.003954555466178,0.07694418847860263,0.6856049908242134,7.74220669186477,5.93204022634485,15.229743334621656,7.815342217291561,15.539714355786733,8.034697716892127,13.915857961844683,14.3679964877353,4.77850355797218,12.598012601408088,6.9156482522063145,16.55556356316859,0.35698701506878816,17.981722803637364,16.897892710972418,14.564033072120179,2.3754688553235104,2.254774030507485,11.33609989384155,13.552266761942429,8.172068486163187,13.078783549090613,4.291217522360395,18.214524781786857,14.455180656770255,14.916002267066691,4.7353319712934505,14.642359097225164,17.703393590031297,8.751690008851764,9.1876208012944,7.946216165205304,17.891279806293568,17.079799115396696,17.458260754279834,13.726445976126875,16.84341798317182,14.30668624785826,8.427831072730196,16.185484706357588,10.782749540715194,11.217839909305827,16.365776436981566,5.742859112970029,0.0767876554333835,14.043245109513478,10.370060387159974,5.54644315179718,0.9620338987908506,12.39083041236369,2.4962581739561607,13.487460733294117,8.562376739511013,13.157830141723386,10.93909098735756,19.558892639603826,15.68773142913634,13.182350213500818,1.3054950593268932,13.94136674172767,19.687058795005953,17.30723184626058,13.387732322156833,3.784791427591294,3.8720757340168444,8.391193434051555,12.990794721851282,7.764933108699661,11.991680327068739,0.3171590176212735,11.226698531229982,10.038720301690706,9.72798163383592,0.5113329384941956,1.55583681425008,8.633386667596184,18.291291608397948,19.731892282412208,15.818410331315697,5.194344430400335,13.783698295284395,6.340636960046933,3.977165313330837,10.937311633492047,15.083295108696237,12.679732270067237,4.803864911837543,4.466588451480593,19.80188790902583,3.2565068509028405,4.023178861552417,19.360386797404363,10.1361100140487,17.99398731360165,9.048433260485051,18.753243524516915,6.844213352203807,5.245124152959648,9.245474055342125,12.693274066797414,15.390407376766087,8.078482220515895,0.7880988645069298,17.324345484404454,1.2497900752688906,11.27793098159842,16.223308001777234,2.5392083095061,6.478910304001979,4.645632439924721,13.608420610237552,2.3956651345834112,2.83886410895982,17.67126936412362,5.062379430475574,2.7448008894713505,3.3957937449071274,16.68626864515877,14.671413860366878,14.646867571475415,3.7722418956190484,0.37257379021469195,0.12517192729422977,18.266626495884715,4.881448306882499,7.936847432406826,17.39770497170701,6.204083007169503,0.3452437325018609,11.965461975172849,11.13226427993208,0.2985927315232484,2.645936763947523,11.460026869263814,9.334903916122745,1.3408512529216843,5.45313497028812,10.513666852101174,9.709450065439537,9.330763178185304,13.068498289326183,5.162091682412822,3.6272920432705558,5.640965686025217,17.524414243818715,3.9812536062230963,2.9990454571051917,6.3060278691357885,19.570543767231058,1.1811722268925484,8.108890712330306,19.06940887976687,14.286991415659731,10.08247452291851,0.5252594778212494,4.302689880532959,14.728495635547905,17.3784379866548,1.1135277029526502,19.01233647625345,1.501666082727806,9.525073220932732,13.202789445119123,8.161688926007603,11.878447331745473,4.393464247818404,11.013860730705737,6.132529626511549,4.657897677968541,9.035401967256874,17.770130062705498,8.33166047282429,7.0763702864302225,5.796872783671878,15.4927450467083,5.030307607790689,3.5106437833159143,18.16604394467869,5.3861965557462765,14.991665646578234,13.037360628029502,9.879861006224617,16.096154105413394,5.544094224339591,12.04207364013027,13.555985113826434,18.54967542928971,6.89263226988579,9.716388532581433,5.929891136934451,2.2285795968040256,3.429648173920259,5.004133151967669,14.178367344683164,9.775983999037301,15.330060888862764,8.891656075665772,17.498266988866614,17.14765964625233,16.033526592781357,11.064737762559567,3.790887376858949,0.9139187315534603,1.5391035451673796,19.21117422552118,15.443566602214016,3.300501500442139,0.3519880114602181,9.864291739099556,9.176702586055683,14.608264540608204,12.64910762563385,14.641829825691897,17.749593667115818,6.812615555809169,1.964604383473807,17.190331643986035,3.861378159251858,7.967546391496048,17.755190911050278,8.830343756281533,0.3523510392490392,18.406485605251362,18.85775845377963,13.618429323754274,1.0102368114224358,13.386705815832771,1.9247933843352794,3.58106486932261,7.028591082918392,1.8267769682132107,0.6882211208652445,10.884929488610414,8.078744910489792,8.82086619346885,4.446006789608141,1.728863691685314,5.062331817761261,11.589322013021794,2.186330127231564,16.306541341226847,9.229846836540636,2.507526306888943,18.300697202703024,6.860854458633421,11.25882411447622,7.020578384197038,11.638212365038347,19.179571973535552,8.22812104652909,9.906438024725901,15.734266564529996,14.597010447165726,19.478234790088464,6.004155804376086,18.993902433658427,3.291899708051087,9.324788381650828,9.264940890976172,2.08175259048498,0.2110438570624229,10.087111823321152,14.529975806660907,12.612278865662478,6.057836104448029,19.988052898422616,0.43063732021362267,15.118181621438938,2.2011695722341296,8.711726656690168,3.5010915623128414,3.2890912346887413,8.747283589839547,15.463759313426886,5.9141652656359955,0.09653649925388752,4.715325356243083,14.851520085069607,17.37488351126954,11.248776079774956,17.93557746765897,16.39909728733313,13.205556718011252,14.707151600344094,2.5277703230060933,2.420645146440017,10.945308433329824,18.336029034108897,8.643414252713843,11.256194555132343,19.997072478956028,4.034233307372497,7.08607070768736,1.1957660822313976,0.8730360154947325,6.7313425907346325,5.397752003943901,3.0687834114153034,13.44595640525528,2.8712668298728516,6.703791759642597,16.405625941982215,19.0244894742689,6.347243739061992,6.143514274385211,14.807491533293762,6.648515396287946,11.689613103815496,17.81031055199161,18.828415005462773,3.448060108921842,12.693088693342002,4.135664823484961,19.65956993394503,15.636256482131486,2.490497925625288,12.796609159250583,4.905267279956167,8.197340206952394,13.703911553622978,8.370767735249407,4.644168908360347,7.271746205717853,8.856775757471404,3.156124009075034,18.866818167732177,8.395376485049958,10.198688688722797,12.448138697396253,6.88260292182532,9.131096825110387,16.898993981486846,5.982734429144019,19.68226899332977,8.611008202338063,18.67198698415144,10.52477530825394,10.93934710662153,1.949615704108254,16.02903546640546,7.3945999495239345,15.991393716314555,3.641623173464299,14.76118874452907,17.187738330702842,16.187798183586246,18.764809165191654,14.590717882901227,15.478715298595752,6.103479485377292,7.624259025143614,14.753359856022836,15.1243223255671,4.158204580140565,0.17034274279719153,4.505366417819712,4.294229884428988,6.284044087030289,13.939261144279218,17.5834623856972,8.350232927965976,6.758879396759436,17.5199969328866,17.434263157273122,16.33803767086638,3.230794597118516,14.191008431337977,14.269746988093278,16.230929265356924,6.446756867765759,13.152944381943605,8.410538261523879,12.854282992873308,1.0969597711968149,0.8936835294010947,14.206748023045591,4.6997198682790575,10.14793044298418,9.159946530801456,14.646434219577781,10.839276633966342,4.739429759287823,0.39032084965120895,3.8913005301942416,13.9518360091086,13.594253279958002,14.451832763852774,8.734476381491834,7.3046424579255875,6.977261635660921,2.9899741630960275,16.449133375294135,10.827153035166033,13.81468550536927,3.764685401721306,5.594607958959941,9.176036134259192,0.4983558696795187,19.60319111697963,2.086500222151755,15.062900726182438,4.276273934064432,14.582985028707292,16.852500324899083,14.4611600085008,7.1359937239841065,12.311193601412498,17.754910345170146,10.172154031956072,6.78066082135564,13.217978662827337,17.856406532575413,19.694788996912024,2.833693170976246,19.45232985586393,11.619657329791448,12.264514951784896,2.5788484041106674,10.805737263067838,16.031462644756388,7.213086112911231,6.460119511309879,15.929689876572887,16.130566950366507,0.19331421370659463,14.640307619549233,17.74506098178594,1.4124547367807638,14.607254406719377,1.8460722906457683,6.489670721918173,9.20782059753277,13.756176230754171,6.72285176382319,11.77235644325512,7.0977777357719996,1.54278899190468,6.162208900343615,2.000265588432768,6.209974542350243,18.805790196540766,14.313550797022767,14.374035375840144,10.529398107461429,5.32780646598654,7.79267709765088,14.040403882922163,15.585885851520626,10.600063153115018,11.160481686703637,8.16020704755048,7.454540455379255,14.35312740970085,13.729501845185577,19.579059478155514,18.799150981228276,9.89110360452608,0.5794878526777625,7.523048630864837,9.749449330699225,1.7270223141547003,1.7873631981567772,14.422690787373401,10.755055126104395,4.21851795234319,3.6978200624380975,15.328057882750642,3.8087374486972303,14.909268868312026,15.475052403206714,3.7619822208602383,14.009167481033327,11.365946582294434,0.14394362395747873,14.840633953437962,15.446014443198788,17.284763823521324,9.982698315744374,0.9582733616371719,5.30944735791119,11.22293644218598,0.12098694830712464,16.498853872035184,11.07698386908969,10.595729153465898,1.1742054617528863,10.01478052836851,11.933054201065417,10.954410325177593,0.9781541488409662,6.071944286528881,17.307904952653935,15.99195016151716,12.473341884165997,9.682634371736821,8.73814887914634,13.459937553041513,11.060068986083325,4.8212467491631905,9.636962231698805,14.016224317549625,11.277239699412815,15.444246788184994,12.56092353001273,7.3932992773161255,3.3852207834367443,1.138028269110607,3.949877031988378,0.5653459618501833,17.77940931335668,19.81670987542104,13.545081002929313,10.607085323388365,17.889727100076716,18.86864160416738,3.0693423039794876,13.22178421892433,8.042718811916473,15.933298032103362,12.613002328086713,8.307797938135725,1.1274651710497663,15.351556824593423,0.6152114259761943,17.61011565222971,7.071742561982668,5.978090024069971,6.29341113433187,16.988123459115787,1.1732863476560462,2.4772196989230633,4.133797471818408,17.691920759592172,13.139521789791102,15.887924885346422,15.667480819445242,3.2529054852730033,18.306681187920724,5.649052484306116,7.6813129753726495,8.544788015250923,3.8971809555482606,1.530762882470551,8.16405998097656,18.280504341897895,19.930598309190533,5.752714249654112,0.268460579174028,14.716135359034034,8.904501170878273,3.756415673280844,8.040309171263281,6.873655311804323,15.082125913327209,7.478092372740992,6.48163190327014,2.6291275513746415,0.17903644961317244,10.91448642989194,0.6907335213999799,10.957126170311934,9.736506222759566,7.434625886794075,7.759843061645708,16.676506660805423,0.16159446898483143,7.726036209317724,16.74917685457092,19.104296305406354,5.2529387561969765,12.906908886172861,19.952454540303272,12.267441589961994,14.424712083609915,0.7683279358906958,15.418827390934077,6.035822536284989,16.66628454648827,5.318791043440569,0.012421593085218952,4.771612490139434,13.161506778071379,6.352845361449924,7.127518562788997,8.176989947927073,6.850210581765492,7.107990375308573,16.42646155970131,9.0898926761249,2.981807347222598,12.473418081535677,18.520252139463636,1.4439368058376312,6.717866939196977,17.56994814882408,4.142417486363574,19.11768911306622,19.810767193074923,17.88358441560868,0.5059244005856689,1.1746023647897985,11.710276572541733,14.78655495761438,0.8775806256769014,11.692241422400937,16.17487948524382,19.432068111505508,15.552930979684065,11.598741927064093,18.02440998108768,13.068517496976884,15.686465613432699,1.1930398584585022,0.7899161392044629,0.5423850906714067,16.78990653148878,6.4648017018849036,3.0840369863451667,12.442469455108505,5.081073268056646,10.057547365414678,15.03227694109781,11.482744940027816,10.862770191966774,19.884893502752092,12.912012794609264,7.788000728870217,7.111856934178662,5.086813717821448,12.413682701452672,3.8072775693051675,4.3270668084391195,9.087870488474827,13.219550823842052,13.819683506567856,18.487967124872107,11.543206032694266,18.119281983997062,12.577400216152363,8.73238369978965,14.153562647210105,14.064065318857129,7.469533977286642,1.3400239799837932,19.73401417366611,13.94345859151656,11.360621248448917,3.387236988242397,14.703954296260777,4.979087104082849,14.884578354053337,19.947435400566015,12.8354318269088,13.912129377483282,1.2476720207318381,5.191961545963162,18.7571199710402,19.38825082369756,14.68895828100969,5.044422636711521,19.395196618194383,19.18377347865707,12.070741154606765,7.044858157563256,6.389916382093288,18.66678273733672,11.55854400525965,0.8717277931312006,7.606545856524947,11.293591104226032,7.904943809375635,19.80757624062433,8.53396308595681,8.69695143946316,0.3031148875969958,16.326775857906036,15.075730747878811,5.709931687803631,8.567172416401242,3.100072319610616,0.2215062290485692,5.781879324776411,2.4583181423191425,4.094763462044235,9.930559070815722,7.123850203098727,16.537418055752504,7.937661614644154,8.183932951334558,10.7967167819622,10.904875488747553,17.60973062679544,12.99709662352804,19.544584716829053,1.8477938343220446,16.42995555132062,10.06422779332551,1.6584540996510766,18.279240538344155,1.782376806814674,2.7439941414717506,14.861642792801115,12.611121014274719,4.279253971993993,7.496499328220079,13.922388156471538,19.73125093073325,14.27053906311475,12.663723139331609,17.360883500764707,8.438942305436052,4.864546474546829,0.5758283743521053,11.573130132999303,3.0631831386113406,19.043318567680846,17.026441339317614,6.666779212382141,17.691972676603257,7.834497779212857,4.75148152599429,7.911363258456636,10.57107263305622,15.24302588928203,15.429497152409581,4.5180031040722035,11.109849499815061,11.46433800607689,7.4115941866997925,15.353072994344469,1.238670061981919,1.0601053732950172,17.5285720392392,0.5554507589130697,10.11008749969589,6.263351046342378,11.895693761795044,2.127454488740126,19.699485214068034,4.880321502547993,9.69983310254673,4.338479514191049,2.649720758755345,3.86808447137736,7.004462921858572,16.474474610523828,16.888054841911128,10.945829427401605,12.87686387106123,14.568980494888656,0.5367176659800821,11.789529070075663,15.501034283187396,14.200043572444931,8.941782625464217,10.135395607424066,19.86035760318204,13.95006446765629,19.793969436060685,7.074573845122245,6.507429047298068,14.896303410090228,17.59678291455536,2.3839120130598745,5.417683894029728,13.990530083785142,7.066703912050993,18.42170227880896,3.535386002012575,3.930800283716347,4.529587564575537,5.682312822604807,5.066272548618342,16.914968547564694,15.986330994790139,3.7065597107540915,1.6306831530799704,11.810870894649582,18.076344170230797,10.548552608393692,0.202158683384277,14.742389008117026,8.642011858159204,17.139220608534504,1.7398649079194106,19.017190056399265,17.10912511662681,5.639061059109687,2.655122865524482,10.062984361370205,1.650586185873708,19.71281444962449,3.5020293185167928,8.665314094006922,13.987627689927805,18.55382660562322,9.573554224937508,8.452024619952944,19.730318241630243,13.736347839360544,14.429829953063539,7.219747931142559,14.371809827472482,3.74104876329568,9.780340886920293,6.707317003888851,7.841587650159623,19.02020625542809,8.877424154163478,8.972106403401199,1.9714766122217098,13.483424562042575,1.679557049266771,10.972508278451443,3.5596412269647804,11.727099918420226,8.439303018314867,16.41862580245678,13.815815870159213,6.506335220372708,15.670297498878556,2.5515091125597245,9.737794990014548,9.859585362302266,7.281786443255802,18.74857533454584,2.1358123322143596,19.073478862303972,16.134238595930896,19.85717475728942,0.45651023969897064,10.401928553478212,19.2938341744022,6.643882787264879,12.824387557837778,15.325083743002669,7.980364215107363,0.6143738184496472,7.813536480631376,9.004986738311938,0.7241331023074427,10.940532296880367,12.927835145950644,9.389187022010939,9.557827771036642,3.140358398429668,18.595782943605673,15.856921892471432,6.743570140116564,7.549479995882082,15.718334304872336,11.557270388146277,6.820612773589261,18.86043012973545,4.71422697411636,7.496700632775495,18.51369032732135,18.873211288742766,6.641865673171883,15.305417245828338,19.98274360927217,8.600982759638613,0.8867399620471383,13.446800743103138,2.2118974726766094,11.495524707969654,0.3710061221453831,10.887199923608994,0.962866528446038,17.15312570104983,18.272205183259334,15.508193482798958,8.247422545611887,10.166545839757175,0.5046525395138168,0.5172862094232888,14.839319294524582,13.519372644299166,13.102599398854785,1.4200139192329964,12.37505565149943,12.182813412251242,4.13710660023761,1.8914553361233466,1.4412819822253642,6.249441059072187,3.8072489179740288,14.535137797445561,12.655059082531954,1.842269041259117,11.717265786361232,2.5682699322590086,9.270465850656642,11.03901351747374,2.937899947495568,9.159528680892986,14.693837484714148,3.0941923516919756,18.827648571575946,14.843916503723346,6.497062825605995,17.266801032012474,14.051573913311577,17.123461727510602,2.1209604009669114,18.95033985535644,3.8926078415138976,17.47403755807902,15.958560818754076,18.54223696224192,7.854378890463631,9.643336384517255,12.435408776868325,3.3937762740726107,18.575095220825588,3.6177232063959908,7.499231361480221,19.79131290190862,10.44960033968604,1.1490268942222404,11.646513388920319,12.778948446604836,17.77385152769947,17.04134641236059,8.789076253218418,0.2542047015835891,12.062577856435786,19.345453087534704,6.9246039406050075,8.320691048020215,18.615049187361585,3.1528194364907014,18.54425582208961,1.3560433331695032,1.738790729413191,14.00517102908903,13.445869794644496,4.302510283132586,0.6285109293608393,16.99263824658262,14.404539971257204,16.013686077875743,0.2466392111629956,12.538085906603982,0.5096961709912762,10.75833396724268,4.290481912221935,16.688366442319648,1.4658790197626104,4.5695267919736215,7.285639061779783,5.419135150681265,14.281933843347815,11.178567009035124,15.245292257295734,18.6659985020508,3.2859606291854737,19.298573446273984,5.390276874824624,9.738541318004067,17.240240482954672,8.427930684582968,19.332792512505222,0.7344040304716515,3.561326664723947,1.811121029639331,18.84003896527538,3.998433259946852,11.106056403486239,19.63635369582036,0.3137606944911653,2.672937704980809,4.951408334650806,10.467114393959672,2.617595112029276,11.423513174707285,4.826118617878841,7.7173546621803,1.2852178035541195,19.951951437742956,6.291202308455399,12.633624904061653,15.595494565223472,2.3286534036880635,4.042083173285409,11.317971772570017,6.722751799370328,3.8050724431380623,2.9186161202918592,13.58177140354735,15.739901790418124,0.21237466093710466,19.742280790179624,19.620525434119113,15.721303404615936,1.8293164420111152,17.310960680003575,14.59763335496083,17.185978709473222,8.734093273539521,11.654835973133476,3.008847124990357,9.089797359468337,4.60285606158739,1.9349797150804582,1.2581225288046172,1.3664751964536581,12.848688193265554,3.680458716558026,10.891984207913401,1.4638008208802855,16.22710134605399,4.682519840983068,0.30455880827254145,14.157985312416574,14.305783302974682,10.609504419945864,19.005222824870284,9.662212718601566,7.519815273222554,15.318742681315488,14.641563703786794,6.902465285455701,15.584011216005727,1.9667877830959757,5.845739129993737,6.862543106287351,17.6035907857999,4.975003851379927,11.061817776538167,5.88807179529403,15.00467905877187,4.973427515625843,15.001025349621088,17.821409124240837,0.7863848018895769,5.666790137705555,18.792355042602686,13.64404451114372,6.305269606285919,15.583291253117025,2.2008231918357124,14.007937407379512,17.224682351437608,1.4560537804772045,2.5792706974347146,2.064867589104691,1.3829517737010244,6.981643554909334,12.918910060339254,16.10970150819711,1.5853949546825552,17.77576666557739,9.069784752378514,1.2346078709224484,17.726476938509805,8.933823766235452,6.8436296940740915,7.794283419057693,13.16569129759067,5.964303278072078,3.6722618930726547,11.196882576818389,8.085619468491974,14.264579966346723,5.618743767598184,9.675385997476766,17.858245994982394,6.119634773627611,19.400431061597306,16.2590432553244,14.280533164154757,15.079778604532645,6.0992685691255755,15.42313709751478,19.432630589192957,14.190135595140166,0.553460951275575,7.2507394147975335,16.125735861752712,4.522510422553125,17.201395659912592,8.393478119606982,6.113145931014947,13.33138303441913,10.238084700412733,12.279027599556471,9.264087594707572,13.612574865245385,13.500070517044236,17.798843221303848,13.389977002241661,16.029516750691034,18.142140910403725,7.676338821320958,15.275981038896575,18.65738725391468,9.27087069110713,16.637814263821443,4.290377935390675,3.4143459456109504,12.758688932722833,0.1883730071848122,9.74858334998661,14.33690519810109,1.6298012422687647,16.965983429476566,12.016932455228403,13.785908956610072,14.491132495966234,12.317272964012588,17.202381244668707,12.140711637674535,2.311169576098071,18.72504505722215,13.742241105788153,13.110304254326138,1.312781111373864,13.124214697958617,5.354449141490023,1.16753003933169,3.0446253915294275,1.6294290181045845,3.6989232361541324,18.267383940376973,10.503108579666765,11.770864367092733,5.816271592663234,1.7688504536895655,12.407342014769075,16.475287229702403,15.429959076896708,19.657180779128076,0.3332667867591921,7.139928352551732,0.114901002604344,2.2622115645814045,17.87739193795926,10.26239439965645,4.831872217798385,10.084265200565996,11.241952554556587,0.980069811069062,3.417114794901539,8.664269914860068,13.466814258989842,16.83298911394558,18.880857025208144,8.72467149540546,2.388671685144761,12.046982124248737,2.572032535677047,18.67588548078134,9.566882425726044,4.859641416290095,5.373982093693095,0.11487050425861067,15.436341168213858,18.920639038761877,13.211491205529358,17.397579632343266,18.217474666932766,2.349722786889581,1.586169736652976,19.91894206144536,7.293082878396202,3.6641481146853527,0.14295536238268625,3.903248545033451,13.800477588549164,16.366457950333114,10.600271241024736,2.278392600057111,18.28350361108445,4.338045095381253,12.140020537214884,15.753849161588892,10.338500611199443,5.907793070926548,6.502395526318612,9.041739094785957,0.9199343544574567,18.395395910985606,16.51969135884405,10.119690044381159,3.772077020072051,7.135159700769433,8.07602449043943,6.193987403833292,16.694210005781358,19.47457090827324,5.490633173476662,5.0244949846860365,2.371578103010643,10.957679017945413,9.758629879482559,17.139343577383904,1.4438957299732014,12.111437083990179,14.987727327472737,9.223814177078747,0.12213626962105373,15.442297276255212,3.744248101098,18.48370401744458,1.7314777144813975,17.8651012039569,16.19518130974873,11.128698081917898,3.9809264510391573,2.1868055026383626,18.94242505813786,4.612245163163258,3.1572548356380503,17.901631408763595,15.645761939285237,16.946628132807945,1.5227646401478578,0.5362815968045398,18.69807219905304,13.387993609761267,14.986557237562387,8.877287456296106,1.4062196471492694,2.425263241838782,4.364232337938185,7.528871663568628,15.554144205227525,10.984292606294876,14.323454549946447,11.832800208010337,13.26677013487684,16.848450906752074,2.2845379086224593,5.159101632893712,3.308257793773368,11.411541473070553,4.678913018244031,2.024112289919131,10.698856552437551,14.230102467784974,18.624082513983986,10.882616284488794,8.729594767221327,6.515896744607157,12.775546993422694,2.2216463675719123,10.47061511487664,9.98148961175865,1.77319883521458,2.884700486426266,16.38145494525459,14.87166497548911,14.16875717270122,10.560048020331486,17.614431493397372,9.753525971146026,9.409103342547937,17.338309469728635,0.5839075823495143,14.743774028826442,16.050936978467718,6.392445669687836,19.092622977857015,9.98753741806285,12.856721904396654,10.83023233411243,2.27514810530971,3.775129047726913,11.119333074642324,1.6948461091787959,7.063134771915274,3.2352574553334223,13.92798414454992,10.761039596808729,18.941097536428238,3.714205805330697,8.462065817131608,11.990078147506566,18.082695650890752,5.7964804056819075,12.692883156200123,7.120401441664241,15.575618332757344,18.46944837832604,6.0262533152069775,15.946977109854341,16.081544292432383,7.689119700722364,17.660769381344327,15.668659823403509,8.872009620588859,16.850397519609615,16.60785031833434,3.1380402017593934,4.84134145661959,15.055880514589543,3.4030610351143675,1.9530173658429462,12.531602502612799,14.483622480319225,10.21834200537295,12.083489488585851,12.762637108669281,6.019903097965069,14.942953944728835,11.542740868853398,13.174034219118603,3.05962321570326,0.2064970945647726,14.223215294511764,7.923504591294317,1.5286395257769847,13.917369960253666,2.625656781061978,8.83766558425668,1.9498950618545718,15.126344860725611,6.84540984783601,8.877258755867206,12.04528125538297,12.492815906742237,18.75114536436427,5.634607431627612,15.106512911681884,17.05555403842095,13.19815874458774,13.576925827712444,17.877808900968233,3.3169775855262484,2.3665405075937196,17.910722682147476,6.806086053043714,15.319079061653934,8.761644171075984,13.604346227773775,2.122832787091573,4.474368283013059,13.903668799661112,8.203027726528948,12.093597876132609,11.406411597045274,15.141956172569007,4.921982426651645,15.990983916183538,19.240511436630833,12.711083925613206,18.458658307564065,11.894446784242803,0.4409544746616012,17.32542189425441,18.72149983681158,3.242620202214912,2.581904663915582,0.6984514878812886,11.617292628362147,16.310085300512785,13.809107639011966,12.367953390261652,1.6982819106287916,11.703179917012548,15.659395641466926,16.26750512683968,19.04655866445291,10.12736638288818,11.764476993596729,4.23965051580959,13.455051318332355,4.496028003235559,1.6389673177459585,11.087757104971478,10.62290159831695,17.961560653582698,16.19238342174109,12.573948739556648,17.09685485125132,0.6200942740251447,14.95869735043434,13.211205756813875,10.55095500139036,13.57121982023125,15.081201170547128,16.182470275667924,10.737016295863722,5.6297398274063815,9.229330977161316,8.785842674908992,3.065000297565552,11.336144396019323,10.607985432435658,17.9532886753248,8.632314389905762,6.338690632625537,18.04506336173236,3.4146685519886777,7.6688972253347965,15.339426431681641,14.313416419009455,15.063940239094148,12.843019549722081,4.857415806440022,19.33573726819465,0.8296449151480267,2.725710606468512,18.98854059957721,15.21636587037301,5.093541818739773,0.13416535124832318,12.642265959238008,17.696061021187816,9.03127864011151,0.8549430468043173,19.278346358560018,0.39379794193283413,9.603065358585763,6.493049968487212,11.483315209561278,11.610085388441181,5.18729162756582,19.945067866655318,0.722159738572814,2.9509144829257616,15.490088472848736,9.632157833940958,9.186349484331746,18.442253674268496,7.124779365250307,4.504972829096503,3.256678874909702,5.089702415912751,19.260040753621666,16.491060875311355,13.873250131389913,14.116244139948023,15.165513435977314,2.08959815793595,14.811192402345949,9.704092921954448,13.961424768828676,3.073000137389843,16.159557903214704,17.83485989790038,6.067436148040386,1.6598400872662777,13.876790442831135,1.8144497291824324,4.297046434262164,13.531379849506514,5.644965362452776,5.751402651501096,1.718382122294706,16.387201243288956,9.805598308710683,17.071763229733506,1.985857403240292,12.442431291572959,1.4247458787157052,11.828779913046429,0.28580600986745974,0.029981087679256113,10.50735510769357,1.7725683436545259,15.804877742062002,18.367597752469564,11.100305360393769,3.4442196944572467,19.38519022714203,14.017796737510636,16.881222984416546,6.842164372083062,17.36801126976023,8.660937428462852,18.10812762821479,16.196396282673415,17.413491622434517,11.597981748295956,1.5395992813593162,7.617561333964571,9.633014466105623,3.755192605380908,4.193220979146202,11.377108447697179,12.342748981837431,8.84556420883818,16.899535938856268,1.2275144050377218,15.069957379677872,11.513206881920874,2.256015057466114,0.14590093836616358,1.5596098199066022,8.30934637541137,19.33182244887974,3.4578884482616568,16.565630277769174,14.519783205587103,1.672000118164898,5.512658925403877,1.9877748018882269,18.185732139745152,11.850543691278904,7.140265743620833,19.715799306638246,18.473675231134496,19.849732619646122,2.465403354189486,9.781927981867419,17.491026678737672,18.630088018732913,9.47959661128975,12.19745315196656,4.669037613139424,12.18018927795573,3.689660633332368,11.408344572231574,10.255345177914936,17.035322604295104,10.846653593381648,19.305519406509653,6.245006427956161,15.529967647822133,19.598399428440274,16.857388558984944,1.6363075061486576,16.366526457882348,4.409188726072233,0.45133949674333707,5.641927014842656,3.0769665878432573,0.957212007980357,3.30222794337351,17.11235945586946,4.174884600076543,6.416190675785356,1.786845817344238,12.560101549154584,13.755579718830244,9.005609249537091,4.82168076053441,17.948989835270005,15.767343755751746,13.795506033480027,8.591286773935462,5.91951159831035,0.8084688563286901,9.669270949492415,3.4682625099384534,9.085901988209319,0.16124228727870893,16.809831388836642,12.59839657734529,5.49807934754921,4.360328143005776,1.2376837677741381,7.538758781339419,1.3461134576461609,11.537270157986868,9.428578904174492,14.756920106511089,0.8782384307006197,6.673788588556944,0.923168829494907,14.25631097953226,17.93818528673453,16.29936384642887,8.69057366899225,12.089121974715864,12.379589485690659,14.88554108508887,6.256219589408927,1.603653929497626,10.656157103114907,13.590522751941476,11.349530399864761,9.142836629139044,3.8035090967262564,4.682671943834484,10.289722810588735,10.59860374332736,16.356246033596875,8.075129978876001,8.728522831831755,5.556710690326252,19.883361603211785,19.28872879326427,9.392111566108547,17.91925056129243,0.3326072639856248,10.937254694845615,0.9671646596173655,2.2445501359522746,8.477260678098023,5.405264824269453,14.284464932338551,17.305989873433223,10.438233344847688,11.807697537361461,11.816234601343076,4.863441826969823,7.817197459106193,6.080890471883911,17.36364919486192,19.789833645607523,15.99677880432283,19.62497673390704,17.059898963098906,5.638341025340816,12.206912045943099,1.1519419671318865,18.744892557405137,17.842395207132597,6.176507410093062,12.556872751885022,6.107071210887538,14.501449334044775,1.3955204971425639,15.982407948086896,10.34116192546823,1.396446888596321,11.700905585806861,19.42038513420638,18.818663840836344,15.861560936646143,8.094674825715117,3.7095158263603523,6.210747910677443,8.020773322690719,2.1892697452485166,4.305906053110182,13.20888109530063,19.825493078286065,3.458953379956191,10.321206231170263,14.621318350365708,1.6444457784366806,6.074307845736304,7.423739716822126,1.9975411391690479,2.422145323835201,11.701680559163519,11.78053236585123,13.582293568206643,4.578738855155788,6.511914143051332,13.803801569907442,6.090654515130658,8.514993298103546,18.90547381305361,12.43158003673678,14.285767577046702,5.828802906453294,4.029472047213178,9.098764471825756,11.809273154731601,1.2274543978841868,5.022348330724782,19.898761951126108,19.92037694196961,13.730390475369184,15.037797442973503,6.948389447439545,16.72351228325273,16.274674645165913,13.040096208375891,17.54212038531221,12.887613399028277,0.755501045173399,14.91270406148303,12.029439273446588,17.730272896173403,10.960559444517063,0.1557869444130544,12.852379231116435,12.698820867270042,16.657324022992963,4.42438151047722,18.00547003100176,7.472865291103781,19.7326723392529,12.579774501016692,11.234332550343943,6.440559831115604,3.3100663547456133,14.964269430480503,3.455763723188614,11.785655655401,15.39435726281376,2.9228757169926833,7.002455125953784,15.950035472884615,13.468257188928906,1.3554992311125913,17.50179963014489,0.10188381686500048,9.04746881333324,9.626150784486732,14.626330431063241,14.27564479005413,19.344485634298607,2.7401518334567987,8.418573241560058,7.367638806055461,2.6687328323524584,6.150885875508623,1.6817210507566394,3.2338438092704314,6.605404632485037,9.396275696534794,14.811812182996755,14.788052546947167,12.89424009741348,12.015015288121713,11.167970485322524,4.915178556123632,5.878582395154104,19.915611127677366,11.155072268761632,3.8478729771014697,9.036556725126218,11.155520262809944,11.981522897555251,3.4133921198869555,17.13469677198123,15.293888200360794,17.73864832674758,10.079526174302247,4.8605348879406085,6.043109050885107,10.080019687580787,11.097610560220264,14.613792753296519,12.384995788403415,6.3164585928242545,16.06561631454925,4.273026964660174,18.148091976470585,11.460588772547911,17.04900516855156,9.516148036085923,12.270270786554175,14.60495783982665,15.875123008251313,10.359992478523239,10.864092346447674,8.42522978494964,12.225755224055845,14.385552685733124,1.2280127255264706,15.813687338431919,4.687906971656806,6.743076322447608,17.914434668909337,3.590871647643712,7.393602442309959,5.296560670868198,6.138736844543278,16.87843673537909,1.683571837465716,17.86854001995126,12.391443354127665,3.348094500263663,9.982293233489123,12.034936863060071,13.043568782470945,10.900138106735113,12.027001960308784,1.529118855262399,1.1476033249697615,11.805827468045758,14.899768397251227,4.324708833455397,16.171282718725323,4.0405193361310054,15.478045045724427,4.118247854818318,11.6156623658445,0.27482415496664636,11.836751351269097,0.7049372386698671,12.284302169136323,2.2376362645810177,9.498962551794339,18.88460623053287,18.014006448666375,16.635851099104528,17.11111649444696,7.050324185812289,12.34500487488463,7.3188629436155805,17.21654959060203,16.890721500617417,12.14551224362786,4.066074852098152,5.15070264605888,17.486394031832337,15.25583642240182,2.30550163632278,2.9048005501702168,14.559743391385215,2.0649668978569213,13.96855064347978,10.617466560511906,14.808008749770615,6.998433234032673,5.113914031614022,3.4946547088451485,9.581140893318253,13.409387012316017,2.358555639278288,16.552592878693662,8.934502354900292,16.929685205365313,13.672195060314172,11.411205220432272,16.71822603947318,0.9956001807158144,5.69647855703459,8.748370882186878,2.273964025214714,3.0678055763118195,4.905943285843075,18.224084372447976,16.23047882772157,18.509502542776524,3.9224096484134696,18.436616999626843,11.085680567299612,17.503626106122688,2.466246991200922,11.949848938624982,19.54662243009364,2.547090906251399,10.6605637687233,19.086849987246488,5.2068365610461775,9.140868658122994,9.809094966619485,19.879539756501615,14.612380983804147,9.866353396185325,5.8393299377039565,6.138759149642592,10.299744444680714,4.381980073924945,18.028469255012148,19.452104118488748,10.946800508073746,14.399041292980073,12.729847987154228,6.193692309655963,5.475972941002483,3.6085113351341747,13.858934531222564,3.739775269523733,3.1061311507881273,12.37610200690414,13.527927459648396,16.141415962443038,5.634367988965665,14.694929866293634,1.69969851872799,9.249300729995614,2.3727197146208567,13.645988842798396,0.8326667592917225,11.908327315517738,17.18098976832481,18.743584013320547,0.8224115839290436,4.713028492021865,3.230433967497075,11.672791682277786,18.464729664738407,18.626760791978768,17.183536235970355,8.783188244523261,8.757537867335824,2.91814968596797,6.552786453314745,1.00274488997103,5.998576197833101,12.402672723849516,13.038591240580066,2.6008382672527963,19.381365978115888,19.49428269256294,7.749994430752971,17.231345265162563,0.07711984593765653,17.578079321795123,0.7914337651816084,19.116099372702568,10.835649968909351,11.037080461285331,19.083297525327442,19.793620259941335,0.8759609399031953,8.906083321304088,8.181613630407632,3.7610831374037668,17.026429245545582,6.507412752398025,13.755536121465752,6.991976359772409,6.235030582673051,7.157579032928458,7.630432041457902,6.370344526143579,7.23674660387291,9.930114278368013,4.538422113688125,5.792239479422352,11.86274893472461,2.706106555498886,15.741886791388847,3.7039894757038283,13.501946887723143,10.94884507020387,16.600114775202623,3.243910916242001,1.3850052983418681,4.1585192804337945,18.019416140042726,7.47481768815438,6.671600563069755,0.070563846489482,15.430352668433835,12.988088797549398,15.507560694945184,7.059419339816837,11.261420691081451,16.08641440283513,18.965444437690323,8.816252852077815,14.987206286217711,15.305723653422207,11.845673223809898,13.813513230875722,12.156762879968003,3.480938350954781,3.8964918396575188,10.559638265588172,6.4027831015549586,1.3113115213387605,3.1478956272300618,12.72733348378901,11.939474816336691,11.701256650530274,16.589723117871458,13.916493407442392,15.210461751693538,15.848526009479125,0.8647034324236946,5.24297752449014,16.809727929822106,13.87069653449442,5.930610092725033,6.720566641025694,8.123060733238052,5.51869148094716,6.714164838525587,10.700011145665718,19.380999297764223,7.937972683558701,16.87511847734566,8.351619700108813,18.027296301460268,6.855194686685961,15.201134618007174,0.6030345861323028,8.755136346230486,7.743353837373461,2.893555222732229,7.378231565337678,2.0181070144917435,6.073830505565061,9.748847894043578,17.674078710897028,15.120736911755737,18.241451272791505,8.605269756013637,17.579552203705013,11.198962515297524,8.864753273595284,8.059174397466634,7.029777151341352,5.636955014572704,15.500061444063316,10.155424130543821,2.3440842133778528,8.99046528940902,10.116659932512611,1.3991262555166273,1.9044592591543719,9.52220268232895,14.134938284524857,6.812637721404204,2.4620427635831543,17.730797108198995,19.035075986679544,16.204131213124523,12.661913644863336,1.7776969429101364,0.389074278128656,7.364099599385376,11.359812161952178,2.5136045225681025,1.8655986751606557,10.530023520408731,2.7504055175823616,2.7957595976387584,9.922873404483315,4.537955812619909,17.44199321966072,17.582036685052582,6.233851323180271,10.595131906162383,17.818471468203843,14.605604680973098,9.3474074060902,4.443145811387086,18.509586259345344,6.10929428083566,13.150931534706288,0.1346916900767825,18.029238505010596,9.88418440204871,11.360933408650652,12.67457368360095,11.941286081481977,2.8857074685299633,1.0368513015281655,19.74405047258362,17.510467979328183,15.134127786062184,10.00933874920495,17.07863948389128,17.485079019951463,7.4934659417149785,1.384550601705019,0.7563178468862919,14.996997952520088,18.988432803373648,10.131773967927703,8.761122055851152,13.068788592157512,12.167209680548702,2.5135411737056623,19.930032625401108,19.491916500474737,9.671697647413215,4.00789203124833,7.259271922735051,14.324072791968048,4.628673722576209,9.539449789580567,14.473073565063448,2.431367201557144,10.885587750909549,0.9612456250441426,0.03561460330859134,19.58626732503014,2.9895059175858707,4.695016178714351,8.04809335934599,0.2928803399525792,1.7950514618958824,13.403762348741548,11.504237711294966,8.27260984713174,8.184572846793117,14.346071673767003,11.248896414665444,11.796617563360785,10.995665124728827,3.8329331608510664,16.72692729859857,11.010116597654207,17.922866775861767,16.36179617952923,14.916978250765155,4.357333572463,15.739002868713623,9.479212132651288,14.468801506499407,7.891437564662405,1.623832843202777,4.488522693329116,11.989997119144626,2.725724293003564,3.1138123042827193,4.536750165544197,9.199629219624077,3.5511603822735305,13.979118685538161,9.462590893132887,3.723054574676712,0.5356268927948094,19.288587337061447,10.061681064997071,11.96029855508824,15.982744190852781,12.344026200264043,8.033044969196347,18.193632749583557,16.232963223832655,2.719701431470858,7.47026085626882,11.10848619312927,17.826324494209654,17.824760165152323,14.704869150231424,11.73309279567777,16.85620480481619,17.91960361438583,13.33096934319772,6.139199870983254,11.019180360615701,2.368463881800622,19.551662322944402,11.91445395874808,10.846339655163803,12.764594026442486,2.690759446978639,14.726613644979473,18.157591020010546,15.575720144564343,19.111052371017784,14.856943522609125,6.723321912291724,12.370003885829476,13.754760111002486,1.919662070574697,8.566182780599583,8.285662338574223,5.362322900284635,7.089404926761116,12.257896163640156,5.991664536510872,18.847596442802992,16.378714117027183,7.451066346642881,2.6737508563950874,5.681065561791683,17.280751092853357,15.291513396466927,7.8766934662413135,8.43415630098419,16.41498776968808,1.6333409842737678,1.2002907649551364,12.746561540564588,10.270105029008478,14.268141248132826,0.6677949596581145,4.793905311095044,12.316646839420176,14.534585656579612,2.32791393567763,9.98784513253515,1.49587344502359,10.73649824426699,4.9351447849949,6.729379390246284,18.57600661446041,7.431770113800629,5.663672300150937,13.207764733137456,5.756494686340581,0.35822786626218406,8.10053850651033,0.7291688190575973,16.620538491064593,14.532921428362325,14.76665825779957,0.9494507665127339,0.5402843569653726,11.736315920415796,3.973875210877935,12.555339934374539,4.53721098589539,3.2422157578844146,13.583907507877061,10.34530684242863,13.205896551978835,8.816204117267205,4.791436978913413,13.55520382976836,17.15969493090235,14.15453301138049,4.570413186533302,18.33118555048904,8.408062490379692,0.34717732054377226,11.861810081127825,11.717830066196967,14.807068581590666,10.850351512903478,6.794281067615611,17.56802362806535,8.881783370656358,17.307949961859556,8.9913076493781,4.78152700333232,8.212969975701965,5.666592203642606,8.399089781286563,14.915167062839778,16.073721618477204,8.35525749623792,18.846136800671648,13.37856217296408,1.9432965486898057,1.5760118679661783,6.5085192963569805,0.6851908472791823,3.973641427698591,15.379876828609444,11.077353778993974,17.329574762173223,18.059043681177,2.254903188916342,7.937517799605023,11.556504010957047,6.168373015519886,16.670845579145862,6.1439925584053645,10.133230467507133,16.90258821721382,14.059842211162428,19.125731599796087,3.210575678748815,13.927276472670416,6.677595305633881,2.8317438251001192,8.435607303250553,1.4907845150842114,3.3467515931916703,5.170074492466403,11.55476710168914,11.93201645429335,6.8248299419588365,4.547019980331983,15.07157739882199,18.19300708436369,7.137198773038116,10.70344690709415,5.670544780049789,19.239422505547456,16.885966099773448,9.563207310364387,17.34161717439511,9.626029670264543,1.9521382903372464,16.242353510976674,15.809452699147876,10.862930256536206,11.97699987703714,13.613712023937712,2.531971651567404,18.597834960033136,10.464976599063984,7.378496077035743,4.055309864265619,1.1156438053693751,19.56145978180052,2.2443123519907227,15.047450049302524,18.409640050450875,12.0548780719535,10.889135777658971,2.2659545811021564,8.845041902964631,19.914825234018668,19.34086442251878,5.027327994524957,16.196519347042123,0.9210447025280111,14.220099625826169,1.562603853944604,5.61437505516361,8.802196165038625,15.079912525391457,11.273815424328259,6.6888341878816515,15.636834487388489,10.441890854057654,14.076395313399232,1.5605127903556104,9.485303207230462,19.448291810172332,2.2959718979861776,13.033704883833185,9.147678893280752,8.691048956829203,8.411394153939046,19.793321419965938,6.2192809359006995,12.006010349153788,16.424976698968802,0.3302811779776782,16.09557495874226,8.179670668731895,3.6291566364059014,9.536634641646256,8.145339867554092,17.28960165203601,14.873301026644757,1.5999298000259676,13.656572255810238,17.244347748587376,17.509523970072642,17.814625570501597,13.030415667800135,0.6671001362699469,4.66760527474424,5.119883465598658,10.647701056475354,12.621418652448654,16.166950285414043,2.71202047674147,11.161794740611022,15.041019230092228,13.102831290791649,2.8290317902980355,8.780398701490984,3.555526747549451,19.201683955751538,1.3247279557315883,10.556224091233556,17.01337993185401,13.912743816038988,12.795634491844732,8.149009372713776,12.404687750322951,8.21716013997413,7.676487444388993,1.9411321999290498,18.12957125212501,12.509253654235994,5.925454525860214,5.461752606011259,12.763314903937463,10.428431540221986,13.260674041668818,4.039463812680704,6.570763172348664,11.182450605104686,14.225789368947886,16.69003281036703,19.825429786498955,11.404593514219448,5.222381566340255,10.978500233979972,17.92278028863215,5.108870325186601,13.585923026635056,4.379265285910261,16.006601447939403,3.3860213093158054,1.3223865507837784,16.41602276729547,3.2383269055969244,0.7054428502319166,18.59658420663952,8.149635601847196,5.069936727405038,10.445766206923057,5.792344360473578,14.87922880438636,7.448243594935242,7.621766370999441,15.398395837689826,14.494953007047675,5.512557455682576,15.72382237522515,14.716942486760924,7.440824395176939,4.2418597846271355,10.155709791615966,7.364014161156192,10.157122324514734,13.383551412674318,8.279205075319522,10.406142563782828,3.009658124607948,9.927162311035564,16.048086836179593,9.47513806114551,6.5629842512643455,7.432856903056666,8.09443978539246,10.916818645137067,7.448759198365602,7.978192387185934,5.043614806821846,18.78814043248034,12.462067977976176,6.20020847813977,19.040752705276255,10.204123449944413,10.523647114412276,2.4239894380371263,18.52201205878679,16.86437473450516,8.7084757174596,2.890632702117748,5.703980198841054,9.732677727567287,12.898224421123562,7.18612945511754,19.375734158670074,16.364042559947652,13.144414703119626,18.166755053822556,0.8946964959728021,3.3794656114828525,17.980379164200517,2.0722765714009483,11.062537416787714,10.580510475266314,1.7674316148758384,18.73425680502936,10.96825826062477,16.270784488445386,9.902557448233939,17.437410018470764,1.8257433517994137,11.73586408326103,2.3961008978878118,8.35663766161877,9.60923049919856,0.969404684322841,12.986343596839166,7.623854954221869,4.977179467950155,14.41277855496586,3.586217349558658,17.17277246546992,12.307183149179078,0.771000846111054,13.340553486270451,6.649182856662765,6.932664145347922,6.434689624193219,2.8110408490673544,18.69060039964499,0.7322163214676181,12.764086936231948,7.323916249754552,14.59124308965729,12.270595024387433,3.0091320842932756,14.685125465046927,7.195420234235228,16.719297979563375,0.9134869967523818,13.71791921300761,13.205761777724714,0.09621496175411526,16.779983083602566,7.542984611521271,3.4013748957766365,0.31752235377183524,10.651568184810865,6.621788027445654,10.925169711462551,15.461383141366621,8.240814146606104,5.938788756273894,18.8365413073803,12.701814557947223,18.104459125102533,2.98778510212494,15.418647991742557,15.269192119195822,8.280729527616732,7.79604582250212,0.4556720326765529,14.807149676428626,0.3835004144893883,5.203217570075247,3.2013871936787774,17.05834655027802,5.286106052917194,10.791231482405003,7.187500271373675,7.1647425205439275,1.6258020951616015,9.148666594409537,18.35508104093897,7.916298191656206,8.230001048027269,16.15931361530889,13.094936711937795,19.62293800006713,16.004955086699177,13.281478067349827,16.861406421241625,0.6423141932388887,10.658915874499009,4.466913701272808,6.711302563654207,19.176307544869,10.470416628704937,12.574486834168844,12.641989263488519,17.090467393704856,10.712414193230595,19.392337080525166,13.181518522780987,1.3204771266164173,14.699780610208366,2.0139955061903425,13.907449514130686,13.262597505338185,8.885174400164564,13.320282666806197,6.957157058465855,16.147108306319105,17.074952126006178,2.266189187530996,19.6021930674381,10.123950090040154,3.2314421835154583,7.127588499625768,1.016394012482631,18.227652738917705,11.3493825920916,18.477917386834527,3.084590446838593,19.417883319502067,15.681562458677636,1.7343640683942851,17.678693320057796,7.042287081981349,0.8784657940898821,12.886407605238608,12.531743948978317,17.332451898155774,16.50298597480279,2.0478003730418592,12.392269971458827,18.72869006923677,12.331387119265177,10.022067637534207,18.626985176700323,6.612567405245562,19.17180264803289,1.7887456323808548,16.37935050837896,18.798054857338947,12.533220039366295,14.701801790543136,0.9884845663547326,9.5829893219145,11.141366525840134,10.088176125371792,16.293914236701287,6.586164876659835,17.20215762341398,9.013767180761239,0.9711638469970518,14.73460375406226,16.75332950784755,10.908281369677017,6.397029641549419,0.28141644459541926,14.512630180991355,11.699901598821704,5.111594936969723,1.5671686122417317,16.049522144666916,3.025543118623739,8.71635601813213,4.405137172628644,14.130587424777223,13.874867946458412,18.216971903244314,11.645865367649439,14.539506070551248,11.25877312891857,9.134465571340694,9.630626783060015,1.5273726236878593,19.26360604840116,10.32987353408644,10.072928225182709,11.788054603168705,2.393937839720528,14.559573378173688,2.0199489628188028,1.8803778310769514,3.037098269298162,4.425396884758248,16.523487981778125,8.278520590061538,7.899467599910692,6.3915293226763525,13.974197501538509,11.485208360821613,13.517245740126814,1.8851575362510165,18.935473426102813,7.129579303705791,0.8412125063514608,4.44782807731992,5.869336688061826,14.783078091181675,10.091934301948822,19.900971630676402,13.136877987887456,18.14728787421625,10.638080628629858,17.373816891550533,1.749208971648577,16.15261598193304,16.45611536021149,10.444780905740497,8.480232017948776,18.080015692879808,17.628030920650698,4.442169440157704,8.129608071586546,5.569865345071725,11.389896572873447,0.06685616420777585,8.232666615763478,8.46884293936486,5.886968337036369,16.439705555426364,13.419774862911487,7.055622621326698,11.491106075048862,15.66029888082129,11.813841443570045,16.19446715069038,2.888136798994232,5.629926412049979,3.6282358943286486,2.9130231907624538,11.470801048594645,1.2815308521732272,10.420799051177205,2.0837411808012973,7.244662958142429,8.223937822191388,1.7721457664468598,12.286980641095845,4.57560123387279,16.622633315360105,12.702603743475915,1.7733867976616402,17.64532926235789,8.874578992043759,19.761762914468584,4.647472770634664,2.7835118100708156,13.052629539628914,2.1992651060545443,8.237411917428057,5.753593963861898,4.7753087257689675,9.5529890624731,19.94425988092182,6.44445876558589,15.910358583150636,12.853488305797974,12.618954137335713,11.973201820775605,5.63961685929006,16.643075049976087,1.2741513717572017,1.6470987173736251,17.41629391213749,4.154561585576508,12.996265113406196,7.222949440895001,12.114199449915514,11.167910813897986,18.826311476690933,6.355826618027498,12.240680861574035,18.39204571194535,16.041025538338207,5.971427750309717,17.02274922035905,4.801291117915403,11.440062334660093,10.5936328821149,11.622484300297833,10.317343841221476,9.327282491109727,15.356893832670448,0.6360625464069258,17.262254660250065,11.898888336041678,14.925544376218745,5.4010910829050385,0.9246975623565756,1.3017807411229754,16.94146624894902,19.470810026102928,1.1155153526575923,8.301974315457347,17.38125451787483,16.164490598198974,10.398538459454919,19.5988919042744,17.822981740259294,5.630085091595349,15.288328917032072,14.218187059659568,7.591726478969605,9.285025695294248,9.556325998458375,12.887926180641172,4.588073568897442,9.187322595300792,0.839216046509752,12.570364534226695,1.0958861164749223,16.507178118758752,8.030238994265876,16.1708933957302,18.974349842567317,6.952245558134353,5.576245640991702,17.515777218131895,7.363420459509942,19.561030465385244,0.5759709383060052,3.6947240620716526,18.780870123740137,8.076806253922095,1.8038049533767264,15.406123239760628,5.599933910123482,8.262976798246626,16.66687138568692,13.523093795650368,11.630014753132961,11.218014540882173,6.695664816123688,5.318911836689688,11.057909638002563,2.093945573850138,16.89148088743967,2.6028056292439405,9.412270212119687,7.941624878113123,7.18569259994013,2.2515065611952467,3.777403842354352,0.10795047164560145,10.658741592536929,4.874498819142867,13.419701953079981,15.538078926244197,3.8211547526369483,17.28763681495845,9.337414550179028,10.51414868994486,5.453311244240795,5.7798240618557095,0.7966156392783574,2.727868725479703,7.237825058301546,12.725967001544468,0.9991126054528232,17.216325735210592,15.032041991581115,2.730190024322159,10.56882926650382,10.354909492834054,11.028954284822303,1.3791366120809379,15.420700614788965,16.024120724150368,2.032741119767061,5.7556191348127905,4.304055096391259,14.004183930614689,18.354814061603694,4.046581572962706,8.760799357962256,18.8283810003401,9.763191948475978,10.953859818344327,4.191921752084635,4.650565557661799,12.317086342629935,7.267970154396566,7.273065727804835,12.293417648215748,15.566189437361079,6.489517745342583,17.248867305020678,8.611612033246491,1.3616362997673859,1.3452619407694977,15.044966686647303,2.7399927158167214,13.737566954031756,7.938156735438007,19.08035116749408,10.900927855658097,6.157672482305476,18.227953618127316,3.442920961397702,19.14911382001987,12.71696611196031,5.858779445867119,0.9579261035680053,1.8377934045481625,12.750407287934276,9.148042952169234,4.663169286426334,3.7919508513344002,5.063279405310173,8.48294385560905,5.131201412206847,5.896344356354004,19.98097644516529,9.1297653193914,17.64390091602864,12.33429421193421,3.8576816474785858,15.07786336945166,8.115445715349892,8.160126866573943,19.32411589795457,3.678972208786635,14.93375799852165,8.230466019599358,11.998006724126164,13.691731613255232,17.66686719926476,8.929104209748404,14.51599082080348,6.350474773535182,13.591068238495527,8.404920334625618,18.989664028086615,17.760537517568174,11.658897933424202,13.864708929626048,2.4734696465941797,7.865656356811441,2.3624492744027448,7.777780896309561,13.90229606072133,1.7020032794309659,12.541817542099526,11.78526598037234,8.029152160068854,5.169925275078597,12.851996526833208,7.277897853036164,10.172049559570642,7.714547386869377,17.103493550083396,2.6499998373877753,1.7554392281705278,17.595419114752787,10.552542672316495,15.448144715374287,4.201245412114694,0.3517096607142989,0.7815653742033613,9.17951764804442,13.439678211550877,2.284312672023807,19.913880885841127,15.886306942916079,4.608851913716303,1.3229820234862055,8.225012068348803,15.773042824934738,6.255830629833339,9.24708224721666,4.510780728638726,17.458415433084834,0.2486477100994744,5.257353871995671,10.416048923160425,10.558401427756653,10.472937804712661,0.20885243628863126,0.04796117349219475,19.33177462817403,19.955773551798686,3.0153393141974805,5.709213871162566,0.2092775485129783,17.60093600213008,9.984309820826542,12.916839761716856,1.3327290964163918,16.975844493089248,12.33706637860383,2.4436168686025628,2.39848473901088,3.5844531960139303,18.086125411843565,3.9111907112264754,12.50516060597298,15.494205890290917,11.692795438315784,11.970940642739244,4.815970166166004,3.5251350641488832,2.3619311433445844,12.03365888684067,6.7343367189331005,9.39910463854404,7.256721724467008,15.813583532340182,9.980235405633042,4.414358163268344,4.080327635993535,2.992001010597516,19.818326351907785,18.083526492823996,6.95674246966933,16.711863552396856,9.6428459109902,15.713767382711893,6.916985385691303,10.495182277420332,17.964580977550494,7.533871872765285,10.61414694849724,12.076590670868757,4.537864296914633,15.558009736357725,7.959617817061644,3.054818693564685,7.137539616167099,3.474012589489619,7.907001854579905,0.586912396260777,17.134038982390386,9.690313593378761,4.986732998695369,11.467002458065476,17.16446436940902,5.755835231425244,2.482006456296477,2.7896639280319757,15.968386898399212,18.91822086114932,18.18067440225611,0.5398485222172766,17.79019720653789,2.9505798049641774,12.680023537125852,18.439190489517227,2.0243732304650575,8.083201904585732,11.006188021713129,13.702517806644586,9.91826171237172,9.217331070725967,5.623241371464132,0.20297317580602936,15.131372413741367,14.89430952070634,14.596517933127554,3.4330878680510946,1.1914321175113285,15.689022931967965,11.706012796928608,17.463774736208485,17.511657005652577,12.548713885135374,15.478729442692583,11.277159904975168,3.255526859042721,10.493787099630225,4.2813483708169375,5.749799626163168,12.647941814616551,13.53618927781028,12.22990620896065,0.8286354110047434,14.689103614765298,5.910179399646465,7.063913530892396,17.681074314094438,10.243878683488532,10.524034132640256,18.613328776970754,19.526048418373136,15.10681494714516,11.487596109517373,11.324061147416007,15.485252221011677,18.808680740488523,14.687454257376142,5.406229765499613,15.63842148605763,8.639157920699162,15.437228776886837,3.6635847355736706,2.052125441946071,3.6384705212524615,13.919093373683058,19.021276517202676,12.133457547433139,18.765870996457522,1.4482597260028918,2.086096117215157,17.067993694285217,3.040460363042299,6.2462054516554355,17.698110196555774,7.050676600515464,17.458900006835037,2.817115262089538,11.070295057222435,1.7910139289586535,12.14586279709053,7.351916894763995,11.978694699377535,10.763553217424363,10.922826702006434,15.015616943078168,19.85785103437095,19.600114202905136,4.053141132448443,8.786543294067549,16.814255178358117,1.1819142993048493,11.53155449717608,15.89450477883096,1.1212163349686266,6.397954450736432,3.034511184478532,9.206184192092323,7.233377734201345,4.073791729284397,2.2615428406597182,16.994073054869876,19.831796847544286,12.817115033729296,14.303260517724187,7.230707820445708,14.727830981187822,6.51429820108512,3.1524405407674783,4.436237115876809,10.826301825560481,7.370473528567709,18.99913432726422,13.553583010712948,1.289989243642129,12.607093688846343,17.038525201559267,1.4607856639316008,12.908926475512338,9.474238103837532,10.288252742762012,17.491745523851105,15.073232105665472,3.116509044943725,5.497543881247249,18.078039952683717,17.403618470669684,11.335232511853185,1.7115281943230665,9.688279536847567,4.458287707809072,1.0917354080267705,18.69243800139126,16.498470293499317,10.15256582839324,13.429068813219134,2.7100905268342323,14.830418377177995,16.78911327110859,2.7362861461365906,19.18078727605247,5.858068155143177,15.582869421280572,15.435285452745493,19.957886426205576,13.383568334396747,8.207200742264176,9.74849968000894,0.21498397939619718,5.501560261175271,17.989037626309713,14.159805194704926,5.534767317749423,10.415090925898006,8.802838751516529,8.082999832757082,16.674439674506726,9.869060981418457,16.84919922309597,2.207603072076787,5.581771809360507,10.805255616739785,0.8840727212298694,2.596795210010665,13.377459347561853,14.932076616290132,14.387696347898817,11.19863380314385,18.12333089678468,3.5198798994908875,9.475614941597271,4.176026468705403,10.407272961330802,8.614682387505406,15.524684378226862,18.499924588276265,4.729265171028816,2.093453256433757,17.380131800607998,2.2589628833577713,17.89061602997475,5.268836758817894,15.613908741688265,17.609397235867917,3.3797964498584943,2.096329848445211,2.9238967813599537,4.611570699577063,7.487344836494936,10.090250104345092,0.32692728016376016,12.19034032072354,5.215087419435838,14.094819653496437,1.8406669069404868,3.124312775559366,17.602974171847094,14.112187167050529,0.820849561503767,7.5906342203403865,13.380215377061745,4.850857295020354,9.790080958132506,13.98792965142766,15.264899264066333,3.8179503416003957,14.66128498606861,1.4278534343928984,6.913007137027671,4.90811870401159,1.248811498414395,14.081506588139918,10.361157477884735,11.856931660814706,15.147339865207584,5.751248833071845,18.422792976773263,1.2598820117374876,14.066608288805696,7.747303845292937,15.487903447587312,8.091948732123221,15.661589125315324,11.854484908337994,5.040752162537765,15.224623255872647,15.400351942452168,10.556129220833306,6.084004712572653,8.552456392106143,7.218634309824843,13.892594519193997,1.0245293379080334,17.161754155822358,4.8944230373034125,17.378922856455908,16.915721592966776,7.913456637644476,3.43549425160135,5.82565057284278,14.121431589966056,2.0919045197810027,1.6672153822731506,13.726086467590424,7.876612345785232,0.30647591991700196,1.6354588773178902,10.045755694433453,2.454236472056879,11.060273788691157,18.205974095711753,18.175676543989873,9.39323156088362,13.243805420991425,7.909403612526238,5.715051033412477,8.218433833790243,18.23800113530837,14.584363984613923,11.023526883958748,15.82939630145368,14.522951838163758,6.439792737428722,17.687678034533192,14.694274982401513,13.861911798540572,8.510820090663064,4.074496800088516,0.2924198303840253,11.862954239312415,15.225166650264068,9.21508289919434,15.1940360529893,13.600080116699726,15.8828270142758,12.387246835699447,3.1343729230676276,1.7187131520663579,16.618942369038358,6.012188295554242,1.9188671878614993,6.365419664564089,12.498153287049512,15.57070610644983,6.799525345153135,15.186770153627375,10.162940621221171,15.474189593557512,10.04129054146237,12.722235019576367,11.850330116821963,2.273021924942644,6.826519587989086,17.818198028653907,11.132886604714084,15.062344512345023,0.7964852454879656,2.846958510456279,6.443313629460956,15.313848325396474,6.788137041464228,0.8742367422787556,13.274198360369333,10.809709484993641,18.888181508555473,19.686680925691388,13.034604151013433,0.8571838966860001,6.453035406104792,1.8441121049100806,17.788710049685147,6.8761309259634595,17.16983240513531,19.95823500443587,8.797553613420668,7.050965131286753,14.273145992555172,1.4553243129612348,11.406843323594131,15.938971667445596,0.10587794048011911,0.7628989066730485,0.7924543770393244,4.150058683627966,13.802682551525187,11.598593289530168,6.898154779176013,10.067711595671671,0.872085854214899,0.26197073780855895,15.97004999901185,3.940163187289163,10.254907688882158,7.696751750656414,8.957940017340352,18.488883986207853,10.22759304196192,7.739098250674403,12.582691591222922,9.401416848876716,15.89296575743342,1.7298528944819047,14.704517922434746,11.249223415481202,18.86384427210048,10.418711719111023,1.0450048136004009,9.607043748484454,6.688832535706815,7.425443095278865,13.501050709296516,5.439149031888744,4.781788014233328,5.663044984296111,4.634881308961267,14.698819960847409,9.033768034653175,2.9712322079161035,16.846034122464218,9.748193107761232,12.841933343731494,13.517542366239631,6.213481744748064,2.7680663060528854,5.659012230045466,4.067942287072004,8.903814840774071,10.345868336048781,3.1315345691026586,19.0479577152936,9.075959221464114,19.60412870367193,1.2876201968650625,5.9334299116007205,3.7185181073749796,2.7533491689581258,7.616373498062856,14.86768297280987,7.9646356643783545,8.891277280976224,5.310314520427011,16.204171396996813,14.849212436657737,3.790946375712938,14.773260296210239,10.726193799529113,19.623535716417003,8.053904108124472,6.347916865309555,16.245988386439173,16.634085096374932,17.588003761976296,16.257209976708893,1.222055602206109,14.833593109167449,14.44770025097284,14.245124287705039,16.550215417416112,18.08023102769728,6.493044947883764,9.713344363351176,6.947028348037962,0.2146985579666838,13.71111339016592,10.664005886134209,1.67942729343304,11.287149556654349,2.173749195705197,14.253299184274372,11.204135781566364,19.472938785365088,1.6473921464357177,5.438085294070136,19.170003653695357,11.71544817646879,1.9651569558393556,18.287945477883454,15.27878553732343,10.374909444945697,12.702025912716426,17.816521535679627,6.476986210232321,17.206464825508398,5.845357884140099,13.383729601878315,15.101199327732227,8.546162667483657,15.069758605829144,8.60101916789926,18.367748315878675,15.141738158400045,3.3596652371920888,7.130733936393527,11.695994038783478,5.544685636568341,7.804499314813729,5.090289930477048,3.4945021364743933,17.201332991652617,0.9154881489657773,8.023500954694569,11.786918724667013,0.8374259123603878,7.828073065646497,9.169258224051028,19.165641456862318,14.506072514560273,14.740333960300603,12.815488216160201,12.827508575121982,13.227854842184495,6.497712428605351,12.693623913924386,14.24250266013317,14.793282713127965,2.371505088298984,16.028954411651558,14.111180841451873,18.906135285505012,2.619779108667446,12.605658225343426,8.141709528964087,0.6680703371633712,7.123897488391839,3.432662077956996,18.257004583795737,11.08468587957201,6.121079810927421,16.91218758401977,6.059033797688751,9.607509414643523,9.823913696549319,16.91215457748089,19.957911158787518,10.102320138010302,0.7459858499007677,15.439804002088335,12.083759188924983,4.069100522258076,15.724274161627022,12.492558689651423,19.01769733663882,13.621869967065635,0.6015592096240319,6.292448735610421,0.2456973960886666,14.856093867628534,9.253576642813988,14.667949383890676,14.905302536493297,19.881964089560284,16.056851423014848,1.0948507077905534,4.465841215402353,0.697940735114182,13.879117473009583,1.9785664693529181,19.52047718670054,1.1932743865948225,18.800227413157806,19.247642235474235,4.984518505500817,18.216619445747302,11.352285003654927,13.651062573363046,13.00377204914363,1.341999790667292,9.347292055976197,15.708078322987795,13.139121256306655,0.12545120751133343,2.525963369839399,4.07877619870102,8.47005664146339,9.105625448825219,10.11545592903805,11.957326455050477,2.4619935182678754,0.7919267878155223,13.121436720046646,6.711164506249556,8.457624036011024,11.42033650708347,7.612238666467035,12.660369208829604,9.14638154775512,2.4809695412988964,4.115615534838781,16.621367598787124,0.5293363555464436,12.432113874468937,1.084223967273652,0.3962300800712981,16.628899325631718,18.56696051873886,9.767656656095154,16.02759225131921,8.461240504021514,7.44158850409856,16.259444470486088,17.548984547419426,4.603833270135023,11.964279497966665,5.998667211596973,1.169017066115119,14.04355755898909,15.73414836351333,6.1221761789646845,5.420318649189695,13.774581286681315,17.47477921933963,16.97270107952933,2.603887339569755,18.32421285207639,2.826785478207059,14.34637137550415,3.9520510927437913,4.570856166731949,10.981867511992544,5.948517742365169,8.07253982214133,8.897231307617389,19.098034362035587,2.457989093064503,2.821439398332144,18.873605157149346,5.282633368800043,13.704648369052892,19.531444250366953,7.956455389161592,19.85216120892879,18.370208608872744,17.068989369339135,2.079584310470186,7.139770627489614,5.80978907163173,6.333808004690278,2.623120562848049,5.613812060267307,18.37784710083276,3.15028512399103,11.04449211026775,1.5868500194780966,3.3197599486076124,0.35828118604464443,4.059498225111162,9.604339419812007,19.9561688483395,0.638455525404531,7.692368897648234,15.473167547533503,17.119995752395578,18.20275722211027,15.177119894595918,8.624574890059167,16.962659074438612,9.367006352232416,18.041393663981708,19.064424995070468,5.694372785609416,6.609882441231232,16.818475223969287,14.30147788850238,11.309266600996937,17.039901122833992,14.76369775836043,19.50798595794069,7.371163053109262,16.972155625955324,10.136286306223084,19.98052268452462,0.3591303778264132,14.443625872579023,12.956499269489242,9.502342946794528,12.32335928594265,3.038960604285732,0.8132279109024498,14.463577695608087,11.772835776453515,16.23791171622326,18.113562186209023,3.329579511936638,6.771954799312616,1.2455380573155583,18.851642798055547,17.908589184379533,1.2647845372684907,19.17238642497075,2.5287547932831123,10.373475623119175,10.451181106319245,12.375583947810217,12.233285633647832,15.633778109936639,16.44604998970532,3.4897695708399645,17.170151362129246,2.5339004987956315,8.376904754378405,5.332133480675849,10.868233533914218,15.596092649268147,4.129863121078392,19.243475356493928,19.66354606382353,19.65906364605708,12.007893012664113,8.99333668159442,5.280368355677831,0.7778443452236283,0.8862924230799063,4.464932712796599,11.82596201824408,13.364497358607927,18.485085069508905,16.581897754264222,5.455019106485128,4.418942076932453,5.676018768062869,4.831268571376701,5.1414485380687625,11.28700096636949,1.4649602636338166,9.10697829456895,3.519629486995206,7.5175143058272775,1.8421543810623042,8.623277250726105,15.460387661464328,7.321857211431295,8.244316394996769,18.807300362716827,0.8550093743488008,17.82344789878527,8.112578027851072,4.5088377166975,7.03394313428781,12.17935498544473,9.062041559704728,18.271566784836367,0.8125002484776189,19.653215259641108,19.353638301728235,9.55364683926673,6.904800406533447,10.32645356654648,2.314847558648121,9.62544805582214,8.054396395772564,8.683294176387708,13.225863704650923,10.806116924067402,8.893186321279352,12.48941798034946,5.571732991246265,10.532467394049355,6.718848383327494,14.276091394336676,5.523782717040642,11.96266311772819,6.8537074565518985,15.05540077781963,17.89353105987715,1.10380595863667,1.8039745838013932,12.365591889235631,19.743753566044617,5.1639168594951235,11.306154846453573,10.03339195476499,11.591178005004972,5.801210933902863,6.140579426070367,18.880938797585088,18.69064167167751,10.126454917614263,1.7050228371304055,2.1359705026383757,11.652880844556828,17.367760354143044,17.22294425950806,10.86848692415774,15.827119787234283,10.500156947725706,2.506899962897031,19.468453044443454,1.2808807556507729,0.1499390262923228,8.367732983066865,10.416300152291473,2.250645755893861,6.0028878956784215,1.2242450677693606,8.507093223899647,13.649414687852662,11.248143248931823,12.928938542218354,3.399180044574104,6.078184970741218,0.10015922014190437,14.811316846259,3.1050613400840454,2.4299253473368365,19.93953241082014,9.020083223335007,4.388617968451807,12.41615379994383,19.09093989151685,7.229367642221596,10.646207228116902,15.588615229129523,9.113555944364155,19.906253544811726,11.289489638303255,15.047296383962628,3.433879922674148,17.90431808241534,18.27793874790213,11.92517156038647,16.658493408606255,2.4958698716656302,11.211595503593488,16.887352288949668,19.211560877728118,15.299845852703733,11.676119678913132,16.38595237303114,5.942612057404406,6.734175555182116,11.956997066167094,16.17514668259573,18.60796446022514,2.3711640963117286,17.648525550223564,18.973719521952855,16.389503032646108,12.87242350714504,12.262805095696363,2.305174945527475,19.0457030719852,4.412958443296144,14.853982598181993,12.99792713427587,12.039629394232257,8.204386764245623,8.970937182302453,17.027048539149,15.82993206541683,2.2956769191442117,6.609273126621735,19.439114088681766,3.2852962019163323,11.981119892407559,13.051918469543931,19.433406331507797,18.310926597134,15.197317430147997,9.798113125597734,8.989181280211804,13.078846837853867,10.777995794159345,8.819516278902825,2.089424161367157,5.161310090613234,17.1633408989347,9.696150770812416,12.020959694631133,0.1832177508750732,8.579774159297159,10.25965577031538,10.360739518189558,6.62780707303571,17.452324826751067,18.273137680302426,10.908874356600919,2.0091050220416307,1.959440939700423,4.731204749823741,11.924632171450803,8.295643745682648,9.953005518581271,14.528393637728074,13.655315996371291,10.45371057148493,0.5999879994027424,6.341825518471236,16.950161925818957,3.4291952904953904,3.0011338299497936,8.967229745508645,2.3974494453445727,3.7811902463866653,3.2952250184834586,17.290275445945746,6.946448218634296,13.875695343840908,18.538534734225163,7.617866207795498,8.17679660366176,18.492784918683142,9.741978168968046,1.6429264262462695,16.3297235389864,10.056682840671503,11.012760029713204,10.462868397320829,0.14233041573033844,11.853180264448554,3.9451758741739384,12.89780780546188,3.9147278172973676,7.112982965806758,18.42181044184702,18.027901671264587,9.08827794830621,0.8339913018880463,12.292667273665515,19.579928811728177,2.2575720763227514,6.854136166986331,0.9786060382062223,5.069476794320491,14.185811713459842,17.96797350096833,5.81174576621756,3.7887254385762237,2.1938307901425125,16.476135830607138,5.787588085868585,0.465214273682677,0.3168597598698497,3.2389510092443885,1.1550517154058593,4.607290099200787,0.20774409109400427,2.884865742790108,6.13461618263845,5.256774469449597,16.656897489031934,3.3905614506382875,12.677883250494286,8.557726905280925,7.603956822530793,12.051412078184862,19.514124988225092,10.272748328684838,10.302586676196741,7.824910690254945,9.98896025715843,7.706187895019707,7.054457914090069,1.7578665977739716,11.566872808042877,5.4071753752645835,6.212986247235128,10.210274273805666,15.997414995227658,10.943685444298543,7.545915472611715,5.703429797897845,12.310939202789815,4.429405261651094,7.002908019642664,19.22949121738239,3.736433759766018,3.2689979990214812,4.86385616185439,17.774857966692807,13.20025677461218,2.5214939535667424,5.379208521371321,13.403789867837483,14.047381987850587,19.492637869445662,9.491748399837796,8.741463127701547,0.633555919632558,6.0579360521217485,19.644694211455228,1.655480507648206,11.043033700345681,11.581499872830605,0.6245429566789173,19.89453129106665,3.7115658017985798,1.36765745816271,1.613771023921573,19.79939667568516,13.403631797376798,3.722372711026898,16.830973840142818,16.369893306805295,5.486768803862838,2.919063392753123,9.538423003836707,13.236636960923143,17.203837376772046,13.016871968064198,3.0954395676000734,5.064889595054307,2.2083479660811323,17.821463960108616,2.1530008750065566,12.841913546509511,14.6890541267673,12.452869132659599,8.43495610731618,10.016151987352169,18.478636586182958,0.5273767177267974,0.7622945882548127,13.691317913190634,6.319166033011041,19.036023283159558,8.768100742022003,11.994394198256018,11.595676707260395,6.88870922311942,5.022497607611798,11.205228524388522,7.510312919214539,11.996532603155519,15.27908870656077,2.5033726730204053,9.65167546317443,4.789146151565995,19.48897488994415,14.388710542433776,19.428679290996552,11.191046614888647,18.70456310435685,10.487421053632545,19.87803167337328,12.160185179908032,4.327269366902167,9.799031657028303,17.603709458696425,14.210644776238365,14.660661963329211,2.628021931438389,19.501570252480267,19.09934293831015,15.920546249981161,5.525587426499707,10.609779084013539,8.302750026959874,5.994761814363598,15.353093704877754,9.263731832338031,11.903562947428647,12.93710833296364,17.507103595888015,1.8728118347768197,7.922374108005492,8.32555789633275,5.616919534547016,17.0813079386103,18.89479654020078,13.589601502093277,16.79207047949658,10.23736363553887,7.74238196019613,4.177145489142844,8.695279422676307,6.291636197655497,12.521284117415199,2.701129945749443,13.80974380320838,17.007339200070483,3.039474184468971,9.75400411552592,7.886998874997908,10.530562385679225,0.6225950740527919,0.3125013369994134,18.50388219884067,12.049703091245512,2.0749261990587,6.478805026418857,4.206971245669484,15.560722129211587,7.737346356147765,8.306446556533661,2.993172338428489,15.67290695097582,7.511866640803713,5.6762095508450505,1.1666641974608272,4.778375819666789,1.7708186722078834,14.355871175876661,17.484525271360823,14.97302056368429,15.223878079878151,12.158568035155856,3.615645876670275,2.07174812511171,16.099751648711237,6.501507932145705,8.089578309577647,17.561034990447997,12.913271092875803,18.04633622579319,4.6009016233302535,9.597144082669566,10.89832128794277,4.714249401808108,14.860468062248135,3.036053545292261,18.944246512202817,11.741255980933873,2.1890808584568155,7.976409966834455,10.106153259266426,6.076670242376929,10.858911980733176,13.510030779643403,13.48377507463239,14.850743138801011,18.04449972472885,13.674649133843113,10.032799502074926,14.942599234886105,8.469108489405862,1.7372661568404935,1.19895389100519,17.88673086082746,16.93717333569503,2.7224493269047567,19.81707378852896,6.06058967555005,14.488524382220834,5.704125920921461,9.254371660083214,4.843229347424307,15.318485632797714,17.347482304538303,3.5550503821565416,7.889401591535665,16.131771008761596,14.103983151450162,8.359636796176142,15.449913985045288,13.341478332035068,16.239170278457628,13.885011625023944,4.650192536674584,17.67673587202967,4.677750341845268,5.545928175090458,10.156402255665903,16.316708928521628,11.538812329299235,15.387260289582123,4.020299617863077,1.16725382669153,6.0508124968852695,14.023873068872597,16.37140253797583,12.838706532911356,7.104425070288536,13.449458224545836,3.3507935203406625,13.543893330835726,4.411186995682068,10.764354873864225,14.28020980164986,14.401798818639131,1.918559140767413,14.54526944596143,0.1736068943708835,15.202671571064034,15.25525049347365,15.886706480844989,5.555996762359237,16.80115660797825,9.44375989822538,19.120269021864686,16.378597811180803,7.82983884333555,16.808460738418418,17.973292030551143,15.961879694335654,6.344579202460863,6.933719570243362,0.3978906406819993,3.566218552689957,15.879682817904769,5.512347514283591,2.168132031373653,12.519943047438211,15.913003009361248,16.291963074026086,18.81529441563623,5.926795271862222,10.061030261200056,8.879008976104847,4.399768389088745,11.766178603944875,2.852383453427496,10.865429514201352,0.091769643146149,8.257109036687869,15.191434562762085,13.582043632570517,2.781066520890101,12.381664465986288,17.758843280187836,3.0278250463570666,3.548985156878879,8.984921383019726,7.762332115995174,3.9761786655827436,5.277765125024687,12.053152674501604,8.574301184241131,12.869103199863275,19.902602901634715,15.850296917327613,0.3234812549095123,17.935526710869006,11.208376124323687,11.507826294675061,14.989602796101206,2.483390847190945,14.70936832689738,6.988283898158736,17.575799790836058,5.045856610279382,9.33755970212462,11.230071086544964,10.169399036209015,7.615268567756703,4.285996038656799,18.601693100917977,8.164171359718724,7.049981425146523,10.250984964914744,2.740722625186618,17.00547166974551,18.893626993113028,5.630542751592866,0.448915691139784,17.846441288381346,6.382433029421257,18.388805467842957,16.664150632259837,2.365179588210098,7.503685067225332,12.793875021010574,1.8781752396997575,6.280409298216045,6.217875800380108,7.02935289055036,6.489935412644572,5.691065599944682,3.012202083210216,16.785365597747607,14.504440301148534,12.727254342956527,2.321950920925002,11.447501498532194,13.361038385454655,9.000977679753213,3.814481452302325,0.9920639364638628,10.728219252358162,19.147673480477323,1.2766641724577532,19.938308722030264,3.109799233755446,18.104194998014222,0.8164253032278079,8.48024299704052,15.394825246516216,2.205429620603474,1.8840838379525415,17.432612745900926,18.420348551087322,18.65647968702152,5.774374567407352,13.341063285676874,18.663821776555373,13.962093963811801,19.826883699619057,11.783947616286756,2.9118592131560206,6.122460927931779,7.245837360376939,1.8975510935663609,4.886998643018314,14.742375155753287,19.824217974226038,11.709426609728597,18.89721011434157,5.57150047417359,9.098224853209004,7.610680674342198,10.86126024183653,6.954088153107834,12.948615477511488,11.786568459023187,7.882547777245521,11.973332340560736,6.268204673510831,11.244195642525213,6.832269171151815,5.281533837777648,2.925523641675465,6.177914643277673,12.770573840273993,17.45548881677368,1.3918704963781847,5.947792586146892,14.906771256109472,13.695882731349878,9.956370276412368,5.759444715458701,10.243923533256613,5.631387110020523,0.29474512758195015,9.00651349717414,17.71258000348048,19.151236559683404,18.782939661398874,11.304664788309736,12.576838278921375,3.8174799626610545,1.3221932548767867,15.951819154337743,16.018150108774204,15.498084941754303,18.75920468181382,8.82342111585058,13.242751937447284,16.680499471601593,14.669617126966198,2.8561350176391898,0.5806936944049612,5.44931920730062,14.632235533846337,10.150930203388636,15.557200009346284,0.08153136657323312,9.353927264940957,15.744103870093035,8.65154157024843,19.461553941887875,4.8627839382626314,16.012854668501134,17.93661757842561,9.258293898383867,4.056241268431027,7.566785522003676,12.510016720435576,8.948341782530651,4.615652430131099,9.327324723573573,7.582200357516293,0.005340454289570751,8.309333020429278,3.467568664595646,11.720180087355402,1.8372790323068022,1.4923977537021171,10.267178997477195,2.660097059655997,19.26305374415337,9.509919297254754,13.461583292097998,15.47173349991828,18.574030010025723,1.8788278599119446,5.756131891106406,17.478763560516363,19.420806946396446,12.646679820221514,10.921254259403081,13.928175277578166,10.88619830339824,13.381164952122253,15.441661479638116,1.488266935844531,9.538647538512667,19.620294458984677,6.425810023011267,11.700842207778269,0.9631054238772263,19.925005156263328,19.01348143189853,8.571031569324745,1.6270746434411087,18.103410357437614,12.023083903508166,4.66665761738787,10.952006548317748,5.235720907923067,13.139559340654365,18.53933751681509,6.618835687207847,11.942076930547909,19.73382765466484,16.165281871350544,11.260782802795735,18.766358195319196,4.478847783095201,6.405130183319643,19.977152848013734,4.272497155605635,14.051973405181023,14.863706415765678,9.859745808650624,17.11828204457781,16.202042723780995,18.596823980527475,6.345657456171461,0.8567494027921096,17.128782246791147,14.479654673059482,14.589321152044414,6.690762442143963,13.939493754382841,14.389522109048567,5.031201573540609,1.4721482177766854,3.3103278048836104,16.909157861255267],"x":[1.9942468960878523,7.558959722769902,0.20505192309126397,17.668371104730983,6.767502624436963,19.29457528141409,2.1173823925379898,10.459113732332286,14.473101517260393,2.014987116226936,16.198942231005145,13.968850302513264,14.84212107697013,16.29669829077578,5.014389616440664,15.170293416620485,6.673734511807519,7.038065694884628,15.297931468459772,9.62308297824794,8.517270607212609,11.302791363402264,16.593749316791133,2.4385212705510684,5.57695712442388,10.983180715586167,16.30956186439402,4.8900916919899196,10.18650762716514,1.1913428690591,9.878031904518728,16.791097511364306,6.420406361629909,11.524659355432725,10.927505158812675,1.6866288000792773,10.067854316597682,17.219526863019627,4.783716295930502,16.671708103070358,9.688603820325907,14.96979757083993,2.3840426695204986,14.55289900922204,9.171252974854326,19.77169974139818,8.927018849130256,5.7608951357129445,2.4615041527197556,13.377271588275361,19.432944882321387,3.0078821943771006,12.024390269029892,9.813601511882935,19.197720877826324,7.073602716173282,2.537111459999939,2.1101426360119424,5.009388600281173,9.753933823216245,12.754062265471195,6.400393408064051,2.9101187472997614,9.381548275891474,17.475262958093772,16.771775562437185,19.6615935463565,17.450595824018812,8.394557278668792,18.958236946445595,17.23417046589324,7.950462249943184,14.877568903825388,10.753876856808269,16.54128457054911,19.354792645450623,14.854535498716807,16.617110940907637,1.8719500853024806,18.832937403655563,5.135319176225579,4.043044571686889,8.156162424469162,5.164244507000961,4.981019294158022,19.211121009067718,12.795620662976933,3.303057395595248,19.549011501672723,17.91507233525372,8.094790277238024,12.508883054979822,10.15096805386933,11.057383100184746,0.3367050801588478,13.081033563116065,6.525111603850298,19.84807106880172,8.945983035393485,13.657651464141832,9.198122308734824,8.780832629985639,7.605697262780797,15.115805051747056,6.958453151507191,13.0623875264525,4.875950513382503,8.513930082682597,0.20569656701686423,9.442662229268638,7.7204242033987125,8.844534972213914,8.994434205155034,2.9093075859652773,16.746049745605404,3.503019672469212,9.135897968098199,4.028896104153983,8.259797030218717,7.127701429659581,3.2548110227543203,1.3814399535476962,19.142872000529465,17.306654948241807,9.182358511223754,7.868171644863651,1.5789659998421879,16.027287489314936,8.669336485787898,5.281520738825036,13.068669685494756,7.7928085960603966,12.27936218704826,14.52884416809287,2.432481893607177,4.793766961301085,9.726743351061199,11.092766920600074,0.9523901831864467,15.801638654208023,18.904448108908298,4.090509660080208,14.195792289383014,6.973833665966054,12.979425484320103,3.284968043728549,14.465559647333265,17.342300671098986,14.897563298537024,14.163781069792943,15.160298158524013,0.9235976152622172,13.02871904263922,6.106119792624982,11.034605863119292,17.380610660417442,13.008677176108169,3.422365246306729,18.211559548418464,19.19052404835149,5.131877472368753,2.4478797249623208,11.423414303176358,9.151177744145048,12.29272392605807,14.85848615515633,0.05413943827567991,5.331662300445035,12.557226577152282,7.01747024058184,15.3326335943072,10.078765801236624,3.148255085006104,10.277652832414287,0.7385739232142852,5.173591827259836,8.613367664913469,17.831069147952302,0.2053814331365844,9.107116167470565,6.006996477890603,13.193137508706862,4.019881394381248,8.155836638015375,7.395227406272937,10.542627101591187,12.55680323323201,12.040790792970565,12.721487025363327,15.711633736548198,3.796773452472495,1.5498193543371563,4.4207420339813375,4.233576103808558,18.252065971916743,9.273804558636186,16.982662752674166,1.229043948005324,0.890229219878278,12.130888528470539,17.51857474437928,13.83365727410515,15.116619785930459,3.5292483549478915,10.974437702440367,0.14824771372991208,7.385284642820413,15.57794007345982,19.785484844846653,9.475656780861371,19.227877873988653,6.568206297650785,16.761513938973742,8.434541543001192,4.289683334973651,12.073856524387363,0.4002017926615098,4.77909307188507,12.722785742617164,7.7113793946884535,6.226412126391581,3.513502709920955,19.308483442382432,9.802963572008384,2.838871944481287,17.481167102330637,14.352106908810146,1.442790895922701,18.923184175682962,14.011573014586759,12.573217893098505,4.470685389286446,13.365022734839634,13.751879820529904,7.494269970958891,10.922243079835937,13.148122059351488,17.88669754171989,18.350215464408546,7.3205790612549215,8.010152009283784,18.316096574714376,8.34550349086368,0.9586483168107129,9.689204174955268,2.045419871070031,1.3909634203708476,6.781067917408223,11.783395246178486,3.4095976228285885,5.904287295980497,13.857829692136736,12.321764537233495,9.695095811926976,16.588208637769593,7.454525728325665,11.649207020884917,4.703629188671723,18.38376604879475,2.418358884983558,1.5618616386382245,18.026659451094474,6.868674640885004,17.574959358111208,17.831966420768918,3.6482009698282702,19.997279058937227,2.965691127618233,2.8073120858355027,2.2216317677372555,2.8035665628272177,6.608646860548908,16.23585907651814,8.145253882972812,0.3715040725464247,7.051158378356841,9.929399828769828,12.340603184242127,8.579531720733332,16.55255543995701,6.330501916857942,5.603440996860978,3.904049988714351,11.584360130690548,7.75120809240692,1.738911368989542,10.024939962587931,15.981730002497159,16.16637615736309,17.09779943831725,17.337878625570724,3.107401895320452,5.704428960689336,18.78603750931541,3.0615396399031614,6.671158146393998,5.400258063189898,0.07979210170442563,8.971331508320004,7.624749444641767,7.052122868875488,11.467536810716421,11.239016403805074,15.660737220328205,1.0851508822365918,19.977368167838794,3.5761917921342556,12.257017007179712,10.977743417179337,19.06741235810872,6.022406485395986,13.748224197720461,7.5531079036121085,3.169898123320687,5.426866534456587,9.578649888844314,2.9347496616655233,19.114795784931008,5.672519582512532,14.442870524107313,5.887990216247436,0.32540608982139396,7.496327180330109,9.13836041766848,11.867975991016362,5.315368060884502,10.092301531111527,16.200410754594998,12.218322743598682,7.980176653695739,7.346893852496064,17.927370861188553,1.2549692605003582,3.1773738215156477,13.671028644298957,8.300530599139314,13.81415616585819,10.492294574808042,7.212301046170326,6.493930608192593,6.675005821210642,8.182505414207014,0.9279249699821124,3.120953594552418,6.014160247612952,11.357065600142327,1.7001646608184462,8.92161571229488,16.6970958662041,11.02570440161692,4.529998855307058,14.38198270476763,6.686104526112722,13.371096971105402,9.24226470541404,9.938625383215047,15.52931307468199,14.05518745312274,1.2760187277948587,6.363782687182882,19.98121206465005,8.002088439197719,18.90769892754125,13.789182206618985,12.113047763991682,1.3105958606785384,2.358450112123167,6.811464576209718,11.961462387909073,12.149662280126918,7.454700898347206,11.325329519562363,6.984577902969389,16.45209319626153,19.478643602986097,7.787701120895982,19.90562144039186,10.211472494199786,15.40524250830375,18.616497103245727,6.942698583649607,17.65748562244115,6.624237115438918,2.149109189502183,1.238879443036014,18.94243145137881,0.6056522778944817,17.75620000673307,1.8421248420300218,19.067754067496608,18.85996557992641,10.299876771183918,6.303571393240692,17.964839214277287,5.162945737151543,7.48368316751546,8.397230710235961,0.7356977558867506,11.597576515862595,3.9081421914109526,13.09628396088771,2.4819720835003345,10.59027797547472,7.563494858577662,9.508651718803662,13.679601355647986,7.124464935233603,3.071439607931956,4.277556086847434,11.292477359727533,16.07857354947605,2.457127874805556,4.0331268123339425,17.42959353489949,0.035274221780805526,5.539803237281826,2.8205022304399874,19.67250261599901,8.23283257150544,15.602670817069795,5.989495129697113,0.9985318966040957,5.6725379256291,9.184396258030798,8.467254509633118,18.144570147526768,0.9175838072705078,0.6702535348142247,16.087437804406793,3.6237467063950968,6.553052787368854,10.848610256486534,6.9184006869242065,13.398365107187065,5.951803415417505,17.103047361020014,9.630747834605348,6.666885264453701,8.041557147434144,14.03537194589505,14.840305260861445,16.916221288486124,10.623910795013177,17.32536809555772,0.4038594496308656,19.33099039265898,16.16938314535998,18.051885989614274,19.627806358019647,15.19240844236554,17.18611474133818,1.3789641777321693,8.008788988942182,19.414094024756913,19.25389681667708,16.18002318420107,14.802943737316511,10.571784181303613,16.4207771323159,8.52436326210607,12.728703332984622,11.936764210476012,15.811917236538289,8.446095072883972,14.670000826815448,2.656476970925934,8.299706300146891,2.2661742369337867,2.5200485435194775,13.391714061749038,19.24146153788009,16.209848414781707,1.1710832908017954,18.11259316680474,8.976467340901827,15.14029969937788,9.609711262114722,13.461373691916787,2.3094210650946723,14.584276962966571,13.442291895335345,14.95226712561022,13.959142459637945,10.317620826015602,14.150368822486437,4.36856057769575,0.49568643838384663,7.405756987989083,13.400328193474614,2.2705921783104577,17.329514316007835,9.609389767020971,19.451849716004062,2.918614582829062,9.727864119041957,16.278328162337367,0.5418163254107933,3.6153178754167703,16.54087773536031,4.527967424981751,11.370307617070626,12.339245838882139,17.58606553782901,15.047011393843238,15.361569943506787,7.241607733377871,4.077326537286026,12.969062739218504,10.379083455028177,6.856337268131245,0.5845151174570828,9.460979594433322,12.176990818864134,15.899673960285732,6.368115826859899,6.9421688279600025,15.407732007998236,6.775878107569722,7.9118571451889075,1.7458349874902046,0.979706641525766,8.916252014349997,11.766855833542444,4.519933324612593,13.106642045905321,7.085516557152727,14.540784394522785,15.392370264522125,15.122748694719842,11.491951843977741,1.6225233443173392,8.06595165394354,16.941082360849617,9.29215962555868,0.10641909377365533,5.133490769651221,18.325927256117623,18.237934370187965,17.236156667159804,16.250456391910873,7.418852777660958,12.398945152298548,14.382033504983243,13.567425314299598,13.309023659637646,5.845819466533038,2.296293696270051,1.304475666633933,7.997561717175237,9.99264440930174,1.1915127659316793,17.159843833779327,14.800717800021532,12.357895502193665,4.3216052305135255,15.233335364265512,12.248962535261555,10.02437493118467,11.985217586514722,13.068348835085693,11.048902253250201,5.3805406444487724,13.505874400097081,15.334562108925605,3.0087554115121407,12.659031549430036,5.690182721745125,4.188832286304409,2.043257793538018,10.597860666871316,2.4817807634598,9.275990210560945,13.757140007706745,10.112302425752201,17.575391593519605,2.8816454903696265,9.952990345510973,8.147750750578219,10.673872365867485,17.523961639434546,11.773204411586473,18.389604189647297,19.181599287609153,5.582234175990779,5.951042548340446,5.72889407414797,9.88516039601917,1.1684439523406276,4.776982379987618,3.6381556745847687,15.308156543855844,18.819247895575074,9.211041517901212,16.41071952832288,15.507974469330712,3.425950188100484,13.285865464047234,11.606816317999389,0.028084337293177164,7.7105020858383755,1.6965743114793064,15.18544324504829,19.446553499893934,4.2372487791224955,11.58026148161933,2.0243263925573984,14.22000168241832,0.34171842521260487,12.807217795261657,7.490299901505213,0.560440042681658,10.590423946972066,12.636209911727079,17.49007191516981,19.734997490833216,16.845428862852906,5.714239716746157,7.1732305205140445,11.204930671909121,19.661145210243376,6.825055403833109,17.130707763218837,16.543652920560913,5.624201493856171,4.22053413275028,11.87033402004352,13.365409985866524,8.989102934111145,18.402247488842903,10.031599638355058,11.758674847818465,1.7737504204848742,14.81606266256442,11.957247412284255,4.5140244904169435,12.484714147368145,2.6212876754168235,0.8003967554285607,12.389218969923794,13.178601769647337,13.391515492137195,13.659223716105998,18.617119220741216,12.587370863919421,2.6193864622264673,10.760310235139379,15.2716930634875,17.821143436695994,5.697371683176127,14.285383339800642,10.153051462914075,13.707143028934015,18.53503536473129,5.376413379646245,3.919126138534743,16.13581393727693,8.612443369503747,11.228467275673534,18.924108580760652,4.057125274366871,11.590696466709467,3.679423506791202,10.268756444260077,19.018230061980166,6.534570414835095,4.93443724578801,15.831347995848386,19.32529498030911,12.15841752394596,2.348726287541454,3.9218899928547657,15.137326660174097,3.7444091102406407,7.624251127644914,3.1010718779281543,17.783812507820382,16.977160977237723,13.083104673605073,4.746752123747027,16.76167955453463,14.05527174992946,17.57858661300178,16.3732176230739,8.751374973255555,11.734369954086983,11.574127503156252,3.9044490301961154,5.535037082557248,0.9665377513996765,4.746972398991369,8.671417092475338,12.130471685711065,13.393317395791069,5.504539880081314,18.763810119601338,13.44926769036309,8.178222139380228,1.800587087454426,14.21347711128039,10.479986534653865,9.452201433457311,8.481549707287641,18.8799962811808,10.353141222979815,13.730156637137547,2.5327379238442926,11.45394192093216,5.780920301201369,12.46536159049107,11.28797832184425,3.9144220454923095,18.16879326879276,19.284898515794573,2.566345470778497,17.32644293117479,3.961062615770623,13.270014577086426,9.097093927502735,9.281716879953695,18.695830525530237,10.156135982716975,3.180267326599746,8.744394496660913,13.781159795339164,6.840847663443461,1.566541006474682,8.742604592767886,3.676624875515082,13.092353221837927,15.032726977106886,14.81122021758203,6.847881965920886,2.653075894177288,11.213009724885579,12.521659240819156,1.225793693166235,17.39085883003007,14.825292536631466,16.091896421478378,9.414328410770135,19.125568338179693,18.9412192693271,16.22617140599324,19.36016158182599,9.270996850040918,10.405241700074725,0.7244076674879851,1.8966486790082815,16.455931245710747,5.980582526500777,6.301686374202213,0.4945849354141485,10.520859160035677,5.489998152269546,17.98860175067842,9.12516156309373,1.4329702521254273,14.48786054180192,1.3429085026808396,16.176155230751444,13.021860904782914,15.470347080658424,12.867095758558179,11.9964264380955,18.90419016672213,17.97549324818641,7.848522149840602,15.754008817100846,12.63035346695987,16.293022662404653,7.84327021725884,11.183412937595723,7.374756687864532,11.5764301708401,18.44048352049149,16.75801315584578,6.262396715668559,9.565423586255912,6.425399349718051,10.365641588326685,7.492479022422218,7.1409822485408325,8.325586715656375,0.36813961013411056,9.135861020843503,19.488451034053146,13.289516931245737,9.447933357592945,18.75001990587654,0.8645656678362457,17.1391516657743,17.86974472733926,6.256097665274267,10.603000509031633,11.159527018250142,8.345301987523403,17.9193392288746,15.243558460011357,12.59826820646988,11.767790890014886,13.781727965131868,10.046773651005099,10.838824258098976,13.92298906628541,15.82904308950745,13.901867285158298,4.99564317181544,16.889770313270933,15.51728935038669,1.7774734704533168,5.644715302728511,14.498315825652185,19.65188395458651,9.995135986339264,1.884732066842969,4.032257794239542,8.384930465031907,8.583492309445973,10.74217795996162,2.8226917459104195,14.108983317328665,17.975627849602517,7.8305793841958815,8.13538037192199,4.101376014830058,6.5296396417769165,16.805796451645534,8.044719369096395,7.837141041978382,12.510477728823929,6.48620332815995,7.121236680925285,15.806108863326829,7.187103005517188,17.187759239369154,12.948187088282118,11.310958441359054,10.373201010888927,0.6197974349778823,10.24418161877541,14.701926686696467,18.75444151334382,8.458613317677411,19.604456912235605,7.612908760199213,12.522227208782656,0.16243598665688808,1.333856854918336,18.376095903070834,0.30729660108984813,9.811706218468053,15.797357522036059,18.136531773517515,12.670315912034944,3.952017978036513,13.101557447394399,9.36625391219117,12.151705533010407,16.09366074838855,7.154044701912965,6.970058182104051,0.26849908686771506,9.44026299434051,15.16103658713683,18.479912751942287,2.1734329755382165,1.4514487037559132,4.079670971287506,16.059684195760507,2.3856622281179485,19.562130247454736,0.8116261474584263,15.71398604556109,5.163695006291729,0.6548413737465086,15.076309605610302,14.452163263785875,9.169494252911345,18.875515184387893,3.830989686510007,18.29764604694168,19.8258167138621,5.022606568714747,19.636487916559275,4.388874943076715,15.938144038426776,19.281393713160867,18.753586493851525,10.691013013957198,11.24545880975746,9.210478802785067,16.629125473865507,12.30252536627518,6.487258274244314,6.532316307632495,14.534168753770032,6.45459762446841,8.522610589473295,19.370674621411045,5.127976046732536,11.533899048761075,14.694112545771878,13.248218679584491,1.5461496564689226,12.087755105249203,13.863917691995727,9.84209796294643,10.12195459820398,1.158709714904318,12.533315193505326,3.4823673423374535,0.7703161720606166,3.746268201606746,3.2964807844957678,19.84287259105308,19.08401725048341,13.817671553454524,3.063639394875506,19.588453608021542,5.978870012850481,19.737016616681714,9.103051866545968,16.018305966671708,0.5068739748064477,2.6330278226014014,6.4392742286983395,17.3424851899848,18.73874299476018,9.67639328665399,15.195452659062884,3.5455652955673855,14.84306252032145,18.66395737745212,8.127616880197994,13.056988858663559,10.05441420015699,18.741424316155168,15.069005745224139,19.315398879362466,19.93519255976313,1.8897524913954378,8.452734253665103,16.670591401830524,15.424160419136035,10.956974899835465,4.235177043212799,0.44546730699640325,12.252498649175969,18.35262446072241,19.294603365951687,17.558619137720356,0.34703823585521487,11.792069243019725,17.47354033913487,5.527757056478673,1.6035064554706313,5.239930650916724,19.873570768291927,16.78318171359753,3.7813824622248493,14.534902379508697,1.8599683938914646,14.779564675149528,0.5931706722120689,0.305703173155929,18.615028110386326,11.140641582908138,13.925959311271443,16.153459283610022,9.973442451393426,18.990859175267303,18.789306666002513,7.334965686349415,8.27247722868596,13.8009357914801,5.227533904267951,5.419424477291175,12.438834497096707,19.993371798175737,0.05079764295467637,12.242605056576782,6.713842141423845,3.528582657700139,9.303321227493013,13.340196897138794,11.805454875745905,2.677538531004684,1.0895703792611044,1.2714529933693974,1.1820608913662634,19.563768783683596,2.721166669663102,4.6540098476716185,19.312077380871322,10.157418448798632,11.593333031098743,1.016240105983961,5.2643497553703655,5.039950872517598,16.709729037354982,9.90960555313395,1.9949365051057244,15.649911151396672,19.689205413336733,8.171681536080694,13.685377804721988,4.125664357221228,13.50485952770498,16.46126924241877,15.221754169629357,10.362081498797892,2.250029528406845,16.215078141624065,13.771278285198939,19.68856011767865,15.74191279772839,5.548742812087646,1.6243505212417064,15.118137548883936,13.117049992952419,19.107688468351455,3.0660453264847076,11.3518595706234,4.96089679675475,12.542962427970444,2.606988740906764,5.770131854246152,12.369229769087543,9.766919278442785,6.782648675689029,3.1106450985483436,18.64615854126365,16.29322245523767,12.395762393578714,9.720567737464588,7.612673095531672,4.621088944202194,1.0982071032694218,4.925816693420582,17.283023888970096,15.523446256699597,1.0309700837045765,13.013852946195556,8.474734978468534,11.235380565022277,10.383529720959515,16.318355136403007,5.928460329515435,5.897405570498453,7.206762656810217,16.484292910372407,3.33565429001744,12.315773397408263,18.781644767967244,0.054370532797851645,10.951559591511323,10.496764260100818,15.623257921144296,15.565180774602446,18.969202259451237,15.11456839054302,4.7698665946410435,12.636599073556258,12.104153347193026,13.61174067952081,16.3748665491987,13.546200543434747,3.23698838935242,6.363191858506778,12.61983658529386,7.377322073035044,5.364322242293023,19.166725732805844,4.196292728825379,14.373152907159863,3.9242320773135253,17.458552723814602,1.4540714875914995,10.219551999872184,18.803481320471395,13.624926008158633,17.306746153996208,10.09350196314045,3.1080822471104153,7.822694630434297,9.009649700909538,16.598781629699438,0.47003069208697124,3.1824695591236862,7.3429977805789415,9.437702217126805,1.324574132939289,12.220832973512238,1.197313273567211,5.129866849042597,4.829747916519285,2.3630631850398265,12.78473670537538,15.695980055731953,0.12981982466999664,15.508798608452064,19.481453132927633,0.31055279975757966,4.455980934045578,12.725134520091528,10.033489387323051,6.558562391754461,13.579974072427872,9.310512727948051,10.029515107816502,9.746020034782742,10.279004953064641,10.908946688536698,5.729601061924163,14.349515162493955,19.180703847751147,8.254447740947759,15.244557031581557,2.5331352452897526,10.884248609549916,13.566100833730342,2.476035447744249,0.0437473023460333,16.140146358464904,12.494070126980379,8.718180800805154,1.92206271625726,1.8014187874385623,9.841998352529568,1.8451016267788267,0.8728651741587434,14.397428952639157,2.8995247777371125,3.432488052700746,6.037543001846002,14.340190363623284,7.017473419546807,8.037908077576565,13.7187372551917,11.39433672476677,2.946029978043385,8.422352027618846,6.566103511317345,17.15218168141497,12.277868149385952,17.65222938730251,2.178072380881604,8.593034087616243,7.1561050647971225,15.111898596588201,0.0572009429279019,5.3048413582043175,4.548536281129256,18.588062290564352,8.579814087416935,9.243169421327266,19.360435049947363,2.7212912760494623,15.72723424153474,6.787811751928201,14.953663355201261,1.729677369423479,17.270630986104763,5.902251594651893,12.37638380059446,18.931606244682598,13.89465020094445,14.174766592794064,9.983922033530286,13.352723049080328,18.25432636937061,11.92422730704644,8.130280105008127,12.296757557069329,9.416092195959408,1.6006633693706318,17.094180026629285,4.37869361243906,17.94815257949341,8.486178597304201,3.3604024623975937,17.97753193431106,15.219244108783641,16.11403268838255,12.361025926606498,3.5949263685849386,17.46110040149798,10.208844824342771,17.982591629059357,15.449403044195051,17.64921615419091,3.952100806083605,8.402386465947558,8.453536621353814,11.74462496719698,8.950958710586194,16.678847045058262,3.768624625574657,2.873006346161362,6.43255987975643,18.014196185135255,8.03155135847961,16.354801762875976,13.279557749916172,9.65974728160958,15.907400424041299,18.955519020212517,18.38564818989559,13.045307040198978,9.853590335221059,8.552202021544616,13.426866574016913,2.81701747795148,4.691827682447691,0.5158989311390982,7.417031580008233,3.0003340017788505,10.946923248251759,17.327324633891507,2.9770681878799055,13.597936564152366,18.488587181774992,14.628472424247224,18.881234258861447,2.6804130947026694,8.950451396647265,12.969568082252989,10.499858186346023,3.429810263124242,9.312204254312753,8.595805252665386,7.822090177418488,7.206975299921736,1.451102531774997,12.718445924184048,13.275360650268105,16.66832954120143,18.614697009132072,0.37013222312273,5.076934095005687,16.238591226009163,0.15688310971529784,3.7214956094628704,1.2886396756452845,0.37130282606997245,14.297294884018111,3.0856499028670115,2.43889186284318,4.765984223412998,1.4715728496167824,15.59403708505271,18.914026546702466,17.52329998150412,6.704854097054773,2.3266618680998885,14.8795019891885,3.4553726418387987,3.8279533586932812,14.28070248839131,0.5651821867814188,18.899088958041517,18.766085694581932,11.025662755233547,7.3832689132612295,6.047557084084336,16.622591874688283,17.907669915776484,18.008457102898866,13.839225658740574,6.084774299426798,13.469812271826456,16.714101197510352,16.043280027555937,2.999889947302692,4.2537412452113665,9.098280784414676,0.30609170974623456,19.187430443734538,11.726508060832499,3.794907602431614,0.29807128640122027,19.997908165150623,0.6381463108145535,4.5797958348836865,13.760416112637856,8.76127325644748,14.701710285532975,3.841935948959301,14.752588217397658,10.410972291565312,1.4211134989266405,17.090216895924712,13.934633681058557,15.23123832533338,11.614851285590708,7.073794078931619,6.99327933221066,14.567410726355249,3.195248660072423,5.333322635117264,4.45959136003804,4.05346032597762,16.722475226853444,0.29598262854758417,8.466089846686952,6.787516958611675,6.697556961820528,7.384082550576143,1.0009172417426937,1.9196291281837974,11.87785350515247,13.949144037648647,3.466834233596474,12.20582157757136,0.96903583477423,6.094632281481882,5.653770883881997,6.3567918830422565,19.468774420202344,4.951427909248052,19.090995315041454,6.910294300385131,4.446865590212408,10.544850646191417,6.90784256806404,19.125938101463284,9.880913491782323,17.228857878569176,7.554726410884496,4.54791403286785,0.8009247746947867,10.663232431303609,12.264127644834076,5.029262347360999,16.953574681808377,5.281097712618581,7.542245413684148,14.7912029976643,13.218768913928095,2.00372705056576,2.958581160178211,17.541083211345608,13.738927384192618,3.5341717893371882,17.41333993537166,0.45675038571965754,18.48115662112309,15.775015770995324,3.56084190964411,1.480994673414795,19.279896662683576,7.03293921682441,13.050619812280825,19.205354704998555,4.576636163492531,1.5109519539370853,15.63953270383772,14.45453219052383,15.254662663783481,10.723935487013918,10.440053763490674,15.737689895427302,7.738997288011551,15.765651228265384,13.695421825480931,14.214901103055029,12.896424569479002,7.73728662852363,1.1115914539385807,10.16112842549238,17.923954375169014,7.678552038226751,18.21448864039241,3.415744249664221,0.009665786267940568,19.80245014358802,10.498446548358821,18.566378632167563,6.634281534161244,3.1145247202557202,4.1626292159180345,11.938100463387169,14.090167995739229,14.027320493896674,18.949070474164603,1.6593937824540816,19.62822528463938,9.377796820395744,2.784900172630156,8.934682077339682,17.743231803148937,19.40932161690542,7.041292821478442,9.32589602164622,16.378559678360574,15.712196091686659,17.325383833865622,3.0399553496532272,16.193309946748574,13.826659969373578,12.96792161855143,19.035432758712677,3.0594016525872414,13.870943069843825,7.208182398444838,18.000204451400563,19.84641376510288,1.874966565117231,12.651858682236142,10.264178123587122,2.6053803419742394,12.378505356992612,9.098288037950045,14.418006231272646,12.344729075899249,13.142593709632404,7.104719754963673,7.880627757817118,3.2941926394550114,0.4353210982013289,19.70468244100816,14.187866608643812,17.708484044236062,14.347180041047753,15.600513514699603,14.168430963971531,19.602766972873717,7.236354031453067,1.5225020264538491,14.48757586640372,3.9082864067745593,17.682846038569675,14.833302607618615,15.359650340412582,2.6092841043408788,13.943233004627672,13.193575560628027,6.420423030143785,4.05963660506131,0.8561625259363437,5.018079684351022,4.6759760500799175,0.691344463005712,7.606367212892766,12.406409276145896,0.09065692792161073,18.063389015940853,11.370696022739807,7.064387366434106,16.116623219465133,19.313372775149226,12.316205542944747,4.374690158494858,14.818341026249332,8.118539568762246,0.5078947315946669,14.476453370535417,3.7123174134290737,6.050586516438896,19.148400082816156,2.128493207572526,14.160799806543771,11.654706787707191,14.84441142394093,0.5539378298772579,0.6301642623438397,10.222691118573618,16.20600451777775,16.227875017038013,6.8520804867519125,13.47298927308644,18.577644921150323,3.0955403062560993,16.192355376989166,2.821686763947846,19.127400635838192,1.759846693020748,3.1025346147908284,6.895353711471013,1.533943465493226,5.410781023870692,2.9117364004588753,19.000829452704643,9.808687517775576,15.886768483390036,0.008684283768007894,6.817438205323114,7.071783769187641,2.183810902729273,19.99769225460254,15.602239620990428,8.732410250160584,13.512633184263375,11.845579998933209,7.94364364770892,13.171226847958227,19.916427338968713,6.74340412009566,12.26457177229356,14.882772500288542,3.867102399904412,5.219949466667586,7.4746070980354595,9.519192115252917,8.709951078562618,6.781879956584347,10.525488729164753,16.05330470701628,16.287449283335814,5.165646224648914,4.086279672034743,1.709122428806804,5.56997621747223,17.357640032227856,11.132457823915551,8.099080746842052,9.46874765221148,17.80406763561536,2.180822561689415,13.754291999203762,16.23437397500233,3.7537918843259277,17.705581139969127,13.359818829084036,3.47361695700116,2.7224199783968395,13.637098281368942,15.496549422768657,9.220705648103834,15.790385600960612,1.13749801497955,13.671607107842153,0.14702870240971944,1.2102215840388109,11.391885118908004,2.8314997292819966,1.0557665362143043,18.517214097385853,14.9244935230783,5.613827272272451,0.7250570306715787,5.048788963871682,9.445694035962626,1.1005327496920536,6.044974861563177,14.711037348798296,6.108734595613914,9.209552993521948,14.738349316438963,19.50235063616156,3.9246337429314204,7.3910050735042,11.759311527979385,2.580606495494142,1.541626604864712,11.165354280973183,14.525536553414389,11.589254854594788,0.28094799188087105,2.4661742485547755,2.99399125014959,4.506756189081829,16.859217965853638,16.902642923860185,6.252450580039146,2.602096133385108,4.744239371356129,1.8597896069299136,12.97066732506476,3.272377046647863,11.621644943599678,15.152419032441768,8.32855474158837,16.92197033129378,15.825066939213466,10.996508828843012,8.563576691901194,6.185321617186474,18.895917274828705,5.078459534141828,14.788162816320916,14.240770450163517,4.342477588657112,1.8531718284076737,13.702119292071778,3.9866683563265415,9.171300445762402,14.193947420439002,5.285244383460128,3.926759248707681,9.35895706953692,13.277989970565436,5.637595437134406,17.7495962954888,19.958622211300735,18.776562565335112,16.873492740992194,6.752489269883859,14.5709210718248,8.5688174605923,1.4346290101062653,16.748980148644574,10.990177945443085,15.106490646324922,16.840989407922244,8.09128726059425,5.423457646748253,1.3270161407843073,2.2525585373833,7.8943015612193435,7.305572180139195,17.557603484939307,12.18519419096614,3.948876423857133,14.943496985668364,0.20735356625394719,16.885763858551734,9.20284925819519,13.539996720348597,0.23723452894697683,5.517525403792609,19.20284653076459,6.33165569801275,15.684851803849167,5.523791593847451,3.9353539311090646,13.444904796850526,17.670772937595473,5.499197367864492,4.149845975216269,15.83117040843662,16.838611646977057,18.60851565938394,13.586240417531332,19.133152390634788,19.035454245900567,13.615366929191719,15.394908959747124,11.455096369653388,3.821727623676332,18.0061367789412,5.458741345693645,14.909961026276616,18.067864673807954,7.910448106219001,18.46676943276175,7.218808282920102,6.414116220288011,16.2870532222927,8.121577976474335,7.194760992053797,7.562956264719234,2.354478010175156,2.27336318915349,6.2040251578008165,12.05429870122571,16.535319207406868,18.233226254480734,17.74122404344655,7.859222973489488,10.903190833855003,7.938361671467571,15.906407011588502,4.8780495909310195,19.255530489692887,19.79405573018132,8.875352258405464,13.506741356556745,5.256736002228712,1.2248816964914866,0.39674034565575056,18.242941364656375,13.615354443419058,6.676683388049396,4.263877830165881,9.119501907887209,6.236916794915728,0.8338432938385276,8.62145953434534,2.272774444791299,14.817151730061017,11.46635407203139,13.020561282544193,4.501738852766715,4.989547355558788,4.912002099797936,17.11224078253167,2.8059060744789788,9.798115720009113,18.050409920453863,15.489223856852629,15.619505676385565,1.547617205359204,14.2982690543618,1.5283931374308324,4.77748457303214,6.65148085242079,1.52468420309678,17.361730655133773,12.485849615482918,10.415072273233253,3.2844227030034556,6.088376466066814,9.826601674544753,1.2299309624027366,13.747559086876521,16.462181004223257,5.870113215457438,9.33054290164165,16.108798105355486,1.2684753728579468,16.645903189881146,8.4889218440882,14.242508355928516,3.891678847006892,0.042613552513319775,18.695068744314085,10.195085273709239,19.541751874769403,13.528717789329626,4.37705118230038,5.138060899643788,13.462622892402454,0.9499765217021583,9.67012952052289,14.678801345821961,0.2592856309900071,15.86914547160632,1.1215856274080238,13.87461478908936,14.22777381752625,12.815726606162823,2.4386249275331684,9.574527407213536,17.772344589710073,1.5071172874131333,3.4690161674605324,2.0887256059700565,7.74027296898709,5.498043272732667,6.867775535080796,3.7384797464680863,11.394517687377324,15.027636078532263,1.1284825032925516,9.901865149644156,15.409633929380405,10.562623948518324,0.38030406304683684,11.964595408355759,10.42886632282119,4.741955129308453,8.973426410731724,4.414843873795178,11.731815564460831,19.805163043474778,11.48405656796244,18.24265509638382,3.7487864446434838,8.615111488333312,0.36507376450654494,8.287089011298804,1.1746850059660696,0.48964274201388935,3.2470407187546035,14.487776140567368,10.434996205471187,13.206434754918345,15.7245315857989,19.449484227925367,9.870807510906555,9.47904295988295,1.6690675651826004,9.437882510887562,9.151179140908816,7.699186941800784,17.194802323446122,9.616244326388536,17.749332088433746,11.291909701529065,15.21028542485407,6.652156662918767,1.9027716216516222,9.822474982424708,11.307624281145024,16.889120313497386,16.065834419033415,7.140509515406195,14.007979263933915,1.2687509786398632,5.309278073738346,10.65931499103617,10.32704178949514,5.626682225846893,14.887439438693995,8.721156771622812,12.74472876691885,19.706865083459185,0.6385700853294507,15.671534008856401,8.736607749231204,7.468725394421827,17.061915134609343,1.8105764400857716,3.570326834101394,12.177860647942808,15.263135925373597,6.540766110812735,10.046677368035652,1.9527536163483195,8.329003825329039,11.605454214590862,15.864337479070079,5.884179519300319,10.245873314677091,7.225085229194459,1.0667534824730174,1.6842555081542532,19.10001421366184,13.697784641336543,13.22212052314998,7.109673128509089,10.667501170963153,7.7619623780777935,4.341925242735232,18.88089568851494,8.94830466572011,4.132726858350115,16.27617086546379,12.964956724865937,10.264621118880854,1.0791725281251097,3.48319906766974,8.527699480582541,0.8163999898245455,13.636324377495676,18.134078286778927,7.877500659361023,4.550300767426725,18.80974834799207,2.987514375732405,8.334743108566256,7.636935413516026,14.166368005338711,11.854243329100962,4.32402480090472,5.345036262844611,19.93740765284802,10.79548649698038,16.794942715254756,11.8203058963431,0.1212907237479266,4.306858865428822,18.926800392145747,18.998694872915863,7.6276815129401765,8.024971973229142,10.122405709796794,16.866754003240267,7.134218165559312,9.384469783024464,1.478570629333431,15.597559353291842,19.86121671265442,16.234254212256893,0.7940727083590327,15.715564955353791,2.535827134907076,12.663147649646035,3.0467841586207234,18.41083222476386,19.752531695935247,9.951267982221182,8.22356936809198,15.702741078588387,7.8288459223061,2.3574977115196827,6.640668168798851,14.907449339941437,16.927150530913437,7.858002758544922,11.552143132867858,11.120178628870438,4.889487766449303,9.887174662220296,8.278335530032596,15.71560899258837,5.538890623512915,15.90978247377397,15.455722099715373,16.77488976975102,4.699336634290536,10.543363933958606,12.512450683072792,2.2809284933634677,11.095599810254008,16.773851173831066,2.4673769576841087,2.9345672487679053,19.932383495335593,6.120108568271507,3.0188307474053877,10.980476775941561,19.325747270217907,1.628252375539252,13.357960546437099,9.328982703208183,0.062300611596137756,6.585121825475162,14.332921138039051,3.028679897367623,0.8802918136767746,13.296397758432379,17.517476374454247,15.095347402542005,18.161030094892432,6.278323684999942,6.0945275499384,9.755777100138395,16.133817506719026,19.469272154561672,3.2001036974648134,19.577669536724184,3.606857481115142,3.7306934679098314,13.576708644530946,16.483448138681645,7.783689738429258,8.671034939975716,15.245940991277616,1.3213607452938225,2.2472117638263622,10.248807236574349,17.959606437948636,1.0948936847097412,5.245428764421325,9.989364259127878,7.612760564539882,14.030957630839712,16.89711133653924,19.827539898319095,12.079242344019656,1.8428924673881841,12.872860772406689,2.619279316079819,9.69525452694796,8.114178421904153,19.884645551814522,17.50781701542632,1.7856209498551134,0.43192139012114605,18.01958227420053,12.593371639674235,2.7010880880045907,10.320275434956123,13.14905374519328,0.37823241573603283,4.7580009641613685,4.210606361656111,15.963106910191712,11.481849746494879,18.111890121751685,16.893662699595268,8.361157863126882,5.346248758721437,2.7980446002885095,16.860390398692395,17.02226067403483,15.423552260208734,11.300364382150176,4.405927524196609,9.123617387124803,11.723684717328794,15.165305218000228,17.455725982311176,17.844578807586828,18.382783896877353,11.074481188301245,10.003125350408354,19.788042901395826,6.150128186764636,19.139053924739105,2.441477950087245,13.077414337019327,17.84090308276054,16.9451080403702,15.762706834729357,8.371427583551707,5.321514335066064,14.252277929302002,14.180765844158888,11.08842585773527,12.606695595137909,12.319250889035507,15.628890065558751,16.250170324065422,0.4381027821439165,8.601981727785981,15.58356683175199,10.098298836636857,1.1410510288655873,7.866307031905793,12.19679322857444,17.041461490277857,7.007435135258722,9.463422020069459,14.688481843906217,13.354180249173911,1.8215205240092436,9.127946701125587,8.948934947864092,4.659400918846153,9.16700780984323,10.664243239452723,12.722936565155813,4.102997396637509,12.777419652706374,17.275763598933104,6.807273217571299,7.470542045880726,2.849791177904546,6.430833473298265,12.034338458292657,3.376653915584664,15.711802392433905,18.611130823014012,16.262884350658883,3.218913938744339,10.790461676523929,7.386013966931295,6.774606831825332,2.5197576707079694,8.775602619373796,12.813919500418422,2.561293537015552,14.7014181342555,19.283928977211403,0.9919939500242014,19.99063287844621,7.181068784939995,17.720852011130617,13.545659467041835,13.539746487695137,16.952337636250043,9.593435441119711,12.888271587780697,13.714704024784265,10.611986944299252,14.193896963220611,16.801927184504923,19.848892999794778,17.637958600577804,15.943053451150973,2.2422706281027693,19.718355726392048,2.015294813363937,9.306569473876065,15.644257452942906,2.6510647327411396,1.1019141361258855,13.64150026380091,8.587552598010419,16.545679182029282,11.36779434476522,19.533626881502194,4.6157500492992165,7.942712935065899,16.096793694617773,6.623650165833741,14.229358385210267,12.72906315203791,17.109817521505253,6.589991883976825,19.014742698718283,13.343883727356754,10.365984944356686,0.07455232438406956,2.3903019923168767,3.7146734169087336,11.61380229694915,5.558667835091895,2.598785598850153,0.2775832032649195,4.732587702561211,0.43871893006110163,14.625772963029231,2.771940630160512,4.884772823141059,7.199054358006909,6.9651400882324,9.202962870740885,19.403418355093805,2.4949085900537016,7.451856465220588,7.098470094530853,10.632622243786534,19.142945661704275,19.18218818059573,13.151257425227572,11.983620698839118,8.293729093123856,11.791308155925218,18.350499027111535,12.777095305584947,13.668751109436572,6.780854424994178,5.171564675848543,16.4297005054523,4.760594051302167,16.640465604937198,19.02221303032605,2.6291509607780794,11.482287580802947,9.059546046514235,16.150497710283837,11.039554123486726,16.487666333975074,5.378840227011206,0.6768978008459037,7.849030252989415,12.687158119014406,15.057592989429134,6.945190680258779,3.743184839204896,1.3638619815099107,2.3735922705330204,5.359957217660276,15.948270151590819,11.22693913138618,13.036914219664343,9.906332278374483,11.206252294922091,16.87033013077789,6.891347704819797,8.631697076735453,17.92349981214146,0.08471331953283201,4.207357229786064,9.255965014832071,11.880752371580666,0.9088381970358439,14.790866651454975,14.548198271787953,15.805736498944993,18.986628274287447,11.842517492840003,1.519331540375859,4.742424186766061,5.911844142109719,12.20166254985008,4.984818743741739,5.1459627505675165,14.382706081187777,14.447448433777335,6.081964972912712,10.864579730781877,16.94887428501083,1.7198123117089725,13.653200085438066,11.243198616528698,9.442224695850516,8.002719169419326,4.998727530316804,6.068917198279111,1.5214660785072276,2.2010174380414416,11.628787097631701,13.405394805591829,5.443372937413109,7.274611077336952,9.569163139154915,9.766002171188042,6.3197985459318184,7.154063268187856,17.037839724661556,5.416257619712832,7.71483217316463,2.631094865403396,11.564879698979942,4.426728470108392,19.21827041163832,4.256388927993537,6.76782390726014,14.649408047835832,9.328422609861153,15.308334740047549,2.131215002355855,7.696683174456318,11.514107639982228,19.45042783161133,19.47108582957199,12.80246001569267,7.009043464668143,19.97918668675307,13.618687025140082,6.981439673241159,12.722873268559285,16.598408612310163,15.54483105827173,1.1528637810961495,11.91734247619407,15.682124152042736,11.31310727400152,12.620109205338807,9.760269527662677,9.41691932310533,7.869975651069341,13.243548982945903,9.602061149477578,0.20633143439531487,12.589932914356261,5.059983529152672,4.33878761304888,17.64305626528435,17.380404190101903,0.5265075925301055,2.3454970683404675,0.03681731362143115,4.222138296232232,17.023158779171762,15.69701695555132,4.334796704223782,18.059721219653305,12.068709668392895,6.240722107535603,5.2447321016451065,18.997948524369384,7.985682024305496,14.04921746184105,12.615180567781215,19.38536452708113,8.268175979180906,12.17736803319784,12.491332324527708,9.509063066246458,9.647584785072937,17.67832931134805,5.7503644012467925,13.90263945314902,1.0130850000925307,5.831711130324768,10.809710470649954,3.353120254722297,11.542301199729309,3.2161718647253057,1.2028968329101453,6.01756415132483,14.53752311565367,6.312856973182268,17.124025420154783,7.152020277911295,9.720377560068885,8.77830188764003,8.925039779027513,3.1939496543804458,4.770655088423532,9.145176022010109,14.704582878338691,18.847961264557895,17.76835966450112,17.506527186575767,3.1822260343177877,15.86295973568765,19.822506677371763,8.574974670067096,3.636385236615407,7.69224664480149,2.1907493588032034,5.66123657267656,16.45800160392399,1.0675049747997445,0.04243727427873267,3.5800758864636695,1.6141941779397362,10.566008442870757,12.461699567113516,19.238001761150947,14.328409274399117,7.090221130712768,14.78703989432811,0.707486115417022,8.605944637220396,19.547417601281385,1.116185169943451,0.9228003632671111,1.5241237948688457,14.697109649578106,15.990205735890273,3.191162318541112,7.558866914258613,16.623817477855027,7.6111502725991675,15.374374882535822,6.1461406240407745,11.863268637101685,8.797502757446946,19.590312538509934,13.42471423145858,15.763167879358107,0.8700813436265564,3.27999926574432,8.860327262919082,7.049252152300025,8.562431412722562,2.2658536213466363,5.410238339625062,9.139623924846422,3.195173115440011,7.836402103377549,7.018406526123417,15.538109524023124,10.006626511995403,7.350047962392483,4.186114020812459,5.879496925644281,13.962506142047374,17.26872407183448,17.784725217688905,13.368255371215971,11.894633271996916,17.9596278950141,0.17500945159480974,1.4824959811899463,13.296490963257526,1.7943941136272823,8.26067139448337,14.773665703831135,7.086340036303849,8.717607864215658,6.544255897780187,1.10722351692627,0.5027395390883971,5.26076896764565,4.808457725766413,15.102022403213242,9.19777787207147,5.503792432396892,9.294602028389175,5.763141107431826,1.2395449738750752,3.5005579684195354,5.428183974285665,2.278814518329355,7.416554885059488,1.3687090821029324,3.7947374034299397,12.961473800381182,10.779079355540544,11.737752756917832,4.859693086167192,4.462264062217947,17.67173252338827,1.8415252173194219,11.487789624331,13.039764135471138,3.575785360695134,13.175031290796056,0.20467973933764316,9.387473846634444,0.7719384514395822,12.383916067350963,6.654867931324944,12.831162789810385,15.859704297971348,6.629967569363369,5.908532729224394,9.599666743156256,16.253832252615922,10.396066953327509,3.093050164513347,9.162290805709503,16.18674317485659,7.6739839768008355,10.4811729041934,18.622255801361952,19.316858849033327,15.482316313906463,11.651949522715345,15.738399393120602,8.97628733347188,10.621272455314138,8.875138133711783,0.7138835986755865,19.82625314942124,18.45057782372487,18.744062900195516,15.821329638581428,16.706890520916772,11.19432319942456,17.460581608066605,11.255358784482583,6.799397507734319,17.608006941296267,9.051332665690644,13.926748907303988,4.306864157785464,2.031188278874736,11.88691483454599,0.8065820490113929,8.114954413647935,14.347812691446622,15.701936652112916,3.065437620552207,15.146391906213053,3.1383143214434783,16.35064242777983,17.881461276220026,1.412951673778271,1.69911260235859,17.0662107939876,17.094199391466205,19.904193748360864,14.463317102159552,8.089065479683626,9.04502062678402,14.538100561732797,17.187824502117714,1.7850718249119835,7.433175083410184,9.407879067460026,17.410389670390863,5.381272427709356,8.950879809265619,2.520270596312253,5.12349109583079,14.827678564606362,6.727542012226251,19.643022643765935,14.647007444837431,1.776029194756017,6.343077574174174,18.269519602199324,10.984367240735855,10.633133906562167,6.432382370702268,19.143031508577742,17.34977297284533,8.767492413448124,3.4946254599201954,0.2905002942311219,7.51756154532881,0.3373959404139182,4.54860206980225,3.7133124593488986,10.297241484922441,12.590774112768223,10.203832705575984,11.653215152019968,6.570725744635331,1.3092974207316788,12.821587661992533,4.294104493087301,17.24279558812944,3.4316223348859953,4.888693568674136,3.7595068083397187,18.74204081745019,8.025387133950916,13.367683221005692,13.775735553935714,17.73073531793971,3.876448626951303,14.651824980029925,12.63864148259799,7.903290964891356,12.067212515286382,2.567004854293131,12.054999991697981,4.422268342518634,1.3434246752962453,11.26084880390776,6.089998799284846,7.979151787071319,17.790527919948424,1.8081502194516208,9.070562607526975,2.4889372978941537,15.195714607585833,16.507986366844104,4.089176864015034,6.283335069266487,7.677217010592576,14.509283007909604,0.6181250324614451,6.327797141764262,5.430837013446204,19.936433150654093,13.126019676646496,1.0848438121289572,12.740135941381237,5.856164406303503,4.3233056582305895,4.955680722607441,17.39219226264495,12.577408453751126,3.4244786189444687,2.8899229701612583,12.127172511424975,11.022420841719494,2.8290011722629105,19.533547900015385,2.3674686244770893,14.93319411791925,16.527436363627693,12.195941412599316,13.319252156866433,8.154472239816869,1.7700699910948225,15.006000953797098,19.610527249748348,8.275778967578397,4.972092917211763,8.97399775809638,19.543969467303764,7.243633501842721,11.401575692425387,7.462497082966242,0.024155640653047428,5.505229278161559,4.5253833089288475,17.57462454606761,8.596060154954785,7.8908368169318255,15.350753388134862,2.7110035190324178,6.754020385069324,3.1536057210077484,8.080522656680511,10.989923570832243,17.380721698633014,2.6909196718540196,19.080725467170442,4.773356136747369,0.2498681983127593,16.438623407736937,18.031525396097017,4.324321171771115,11.95884288437012,13.967261953111198,11.276949615135528,16.907215301305367,5.173896333716068,13.77364825075938,15.487395981544406,16.054315169004475,11.621539062571342,7.675601631452511,14.651407651503607,3.1196741453912757,14.28528285307391,16.44859382011076,0.1537498483473243,17.673520253011176,12.398575110027075,4.747771645827035,19.830489383561236,1.0504807397524596,0.06549883339686424,4.947809352372654,2.6026207007283997,1.8097630985407243,1.6140884067524075,5.902431978622995,5.038962647657952,9.256319230144928,15.962461531373965,10.006007748008926,6.984272875261879,19.34345183540442,2.1572414421453656,13.00594749793827,2.6525891130624846,16.639924768812207,0.8213680230177767,13.429635274138484,4.5392953022532945,14.105671574177556,14.725505772694461,18.828719443382926,15.06432096443584,10.936532109731768,4.806808109240701,12.95640188432091,16.947206810602957,2.1429655709109108,7.72971373651715,17.433214134587395,3.1771162196151215,19.04636035332437,8.608689099833512,11.305559879429694,15.929555438642389,17.73806025297164,2.2020664794903677,10.226976977196006,15.266543823689261,12.825079253674687,16.053739956190455,5.275363260811763,7.102154809309922,13.468730302279601,4.223974012028235,4.478583156847771,16.64126694168216,8.007040521936926,19.48991986645272,7.268629311822754,11.131872913878556,0.3900639324813904,7.634169161541675,19.34266289358064,7.767143021528713,13.582262404986771,10.260241192270087,16.912166425020473,19.735390877040253,1.4370192589577169,0.26065003902570716,11.674158015904688,17.57968466619793,3.7850730218771345,11.721456984202355,2.2205919581668487,1.4515913108539902,15.30528805652009,18.65666685848644,10.399774005215217,15.183482664452658,3.6114316889499154,13.353661808440984,13.918727385814872,3.490322208694483,6.109097901004588,18.159311361384685,5.576523274640532,9.786972463994893,11.032648010594013,12.271715677663689,0.6317540709626934,5.483850652054056,13.21594837142436,8.745779454068462,15.484738629032432,3.726906033159527,11.574660048019272,16.113600569796645,7.045626845596122,11.686144353256264,15.73348250987304,12.086486033463068,6.876701497993056,16.22633091994187,6.918219422322642,19.090662596321877,8.242028029036256,16.01183157716295,9.797301630897465,15.426150106784661,6.123397387385894,10.279667951413312,16.248679917513826,9.322669414295985,12.444600641375523,18.330755400418845,4.700838878507612,4.850872673984816,1.711360261735071,10.007245097764761,4.0095258288861135,13.411787884784637,1.0787563978905634,4.533872895761806,3.4023979467023535,15.249180524616705,8.68268811646625,6.094487092503815,8.705092005155306,6.377782133326035,6.010323309598848,16.666718709983634,1.6841576063412989,4.412412658279892,15.541558926589548,2.1328944024459995,8.493921538692938,4.33991448713829,10.804506745437665,10.361520728388598,6.511357566629621,13.665858759350598,14.620985130911276,13.347841737492473,10.210962541501045,13.228249093461283,18.771063266947273,10.040325483287468,12.926100733534254,17.277342454638116,2.667458286505715,11.0753106540176,9.052277439995207,2.2739450595250954,3.2870641476920026,17.255109434214425,16.129557200614492,8.648846471161363,0.9671339515015598,3.574034097497565,12.523748485446262,1.9429539022123743,2.0325703117596827,18.04567975644087,2.9094431510154273,15.466021134782855,4.519917461725691,17.056855968164662,0.10412942976010697,4.808155952857267,3.5507123615270197,19.484589479962715,15.54037068140088,14.121557837535743,2.4419015318125536,13.948265402616782,7.42376737823359,6.068824962687427,6.63685157018294,2.094072467338628,19.893459138013586,4.37196183916051,8.580157562441805,3.626349132178346,9.62525745579866,15.003131251899994,4.529956857658695,5.110711414378972,4.321439022086229,8.445102067625928,8.663088162463657,17.23661589844619,2.0651406690000496,17.440116798358446,19.838617210338896,19.169737841523286,10.01809008898071,10.003124809887666,7.06242583523057,15.19718469764638,9.692990916797726,4.654710620670417,1.2071616890638293,12.678690925286462,7.143142573524668,0.12009180839746669,19.486239164821683,17.55746328355048,10.773137125840627,18.69716063452725,0.4367230965233837,4.248440867248382,7.200021923619526,2.735945432751934,10.783003828117508,14.272746397700553,13.136901310922635,1.3650945335100229,5.980903856296704,18.588316307147835,4.0038730016910895,17.83602439607719,8.302033611388229,15.384908562271939,0.9821753674064393,14.018472922652471,2.9521966854395965,1.108734732100909,16.210657458553396,3.580474627981207,13.089522991079171,11.562359095244283,0.12912427564303552,16.51368907557202,4.6526692092860245,4.659330517802949,17.41251649654639,5.64402723485355,11.566676955884795,11.007867566805697,1.7413435971362379,6.79459259437714,4.361953946528261,16.027180904743727,14.580066971912498,14.769417907187425,12.553617312589687,18.935343825600196,4.01955455152847,18.808948356661173,10.614672508394767,1.9825886049035102,4.463471320035786,4.82383369479261,5.104148043969796,4.127246682522077,14.920546933289152,10.530479400888005,18.389013651847307,0.15159178383072902,15.384112221139263,18.13817505910643,13.222477800571593,5.646777220407726,8.91186266534807,15.223694945547855,18.06457663878247,8.564823466974563,9.375512036263697,5.2498765748497345,5.565484707916664,19.36126613698295,15.624319281623592,13.08566713827394,2.1842314872548707,3.8255029774921168,13.985861942395822,17.452240534703808,5.644480663850615,13.031216137387695,0.8875057933879082,8.613547180388267,8.812731628942153,18.840000089830568,3.6798859276608153,11.55438004928508,4.908072578413689,12.302863982138327,8.975862789510334,3.7964992752361226,5.8333768131663755,5.976700344307337,7.642115997571151,15.364878367446746,17.26343827749845,8.807163063034329,9.225959178021599,1.790957750546478,11.140560698564128,6.539218542674208,12.304646072507968,16.132489663067812,5.490200712394162,2.366947386452516,15.912554643056925,7.915274157861325,15.50414450806175,13.361164038653474,15.376125129874922,9.70049385394379,9.044068912808868,14.412956487900779,7.305838325784206,6.1549197304803815,19.94641870300598,12.027240321984745,17.787971525598216,14.70751076037892,9.832276523316107,0.4630488454206283,16.39360190405993,15.50692602606059,1.5712229497496288,14.563450479827985,11.930137778257581,14.178924047365346,6.913165589187487,13.652792995790325,14.064506304991378,1.87496659388946,16.468047060289397,18.793030202014386,18.154500164433934,15.705138684278456,15.497810940591021,9.189959120934027,11.456484391850266,13.175884997749865,7.031661482019067,16.476932038821566,7.444295229813149,8.344485762963561,12.367437122050834,9.59328348407421,13.666542233658937,10.403616305200046,4.425597541548694,17.745714896258413,4.179412800520166,1.294401027298222,4.46883461001244,10.35866327145115,18.36817006490744,3.6862618558200166,9.724904856669522,13.045049690595008,14.662120094553055,1.5379160013930715,9.288028539387918,8.21637414798969,4.842715697962885,7.538591412538667,15.067847562859239,15.02221742080549,11.225308293414002,3.9858252994728804,17.284046859515673,6.978649666472658,16.10608380668694,0.721117830131357,3.9199973819629985,10.120394279824524,16.150181126236625,1.1422787314496352,5.500038952105695,15.422341492383417,16.68171185474684,0.7852337716739077,7.454730821458537,0.3985748242636378,17.363911792825913,2.9717795873673047,16.64735836777204,19.87833277865514,11.215157930131667,2.641864692492364,14.231328904689269,2.018932923647778,6.180925351457054,13.876514955666144,15.26250200045272,16.702705857880446,17.764606367712524,8.68192732766818,15.565495176008547,17.33870580211793,6.953607260264381,12.401450882097835,17.95830016372017,15.200066010805315,19.202889867300836,8.692705834029777,12.732638049617812,9.123361626842934,13.5911711310554,18.275183880639574,1.8355364280539765,1.95659311085842,5.1840694023057665,0.9664933950428667,7.425560154102331,7.92403352670382,9.512002406891348,6.460969078248038,10.115969433596451,7.489799133202761,10.02646653298589,1.8152593220443514,12.801578897431703,18.3609563703077,0.02296344952846141,18.654757480405955,17.79112941512588,5.583859956767188,8.841482597237253,19.2315755913585,5.948684041111809,2.550222823045174,10.956897999549366,18.269704355916218,10.7213402508483,10.674787876117087,19.06672752338252,5.4267283096223995,11.162527124231353,3.3149418181430246,7.745261376044423,3.02907275013641,7.519919344043733,5.148531360311419,17.387803896755102,7.746698884405534,18.642000709896912,11.924417230975589,11.219017915081642,12.975789749463909,11.939812970660393,19.902145719429903,12.633934842894035,12.158492815873313,18.461951574678487,4.91081552381031,7.769541594404434,9.549475459812271,18.660263369829593,0.08612449860347038,2.340831227507789,18.99595815660173,8.108891970845935,17.144628526076616,3.9093483639060933,10.540512734096549,5.443375798307262,4.757267853075011,1.6505644688620036,3.6305609788667415,10.524739355877015,0.454314951529855,17.367323830890168,10.023802891649861,15.088023399512064,17.96679427088323,3.012332575359351,12.908352785639941,11.220501870755113,2.5739553176229,5.6721374109748846,14.335385968209202,1.183236392303697,7.692561484097009,5.738983014976489,18.44513816220861,9.491480180842915,8.891514667097313,3.3274061467471405,15.181248483819978,10.316976285280779,11.859099184735417,10.74724065368657,17.048198003062684,0.8509117713564818,17.18930915735513,2.33130496568267,8.43816806512212,6.627282309318474,17.79105089862613,4.5832426538328885,17.034130686426213,11.10780452275173,1.1630201160930254,14.116743164494338,18.16021297633599,7.087174667522289,4.159235287755889,12.297637732978215,6.615470756460029,5.116507772549892,8.281414988836211,3.721788488346909,11.428103192673124,0.7158637204918739,16.353889136430176,0.8464348844616509,12.155379734393179,9.466017248757401,7.272299245550968,7.914063952547554,6.810758303982909,17.574274567137067,6.938538651357256,5.253365748660972,1.5466791305713201,0.6489840420045967,7.414175140026371,13.251055475587247,11.979412970588008,12.886630407227884,5.567705963679579,19.205095248301017,13.203347797534008,16.50247432876103,17.62846751611726,16.014005917550108,8.20172298793886,10.71783834782089,3.624167809266785,17.011260658163685,19.832625112621436,12.740828486888685,14.966717210369946,8.217032838545538,10.973406622010927,16.467267111448642,19.881788540151387,13.709799538840706,1.3499705167610232,5.737665417236246,16.00324784685853,15.030490204532402,13.409985193859338,4.02023494118847,2.5324522875632782,13.214760792433102,3.90039140773899,8.631594080059099,4.878095534865139,5.074237029137247,16.663470180701164,13.096222302099779,3.9179561137181285,0.47204842839958516,10.342124227573777,2.89546422335079,18.82760154562449,7.4347561990665545,19.17484835041543,2.061666641264197,3.280386399519095,17.420627973466356,11.166043543053332,0.5404089537414647,11.009579836106944,16.10380619514272,9.893883072279213,8.250749177483886,1.8828313717070033,15.092420990804172,2.6977641942321595,6.001055019711425,13.581753365875585,16.537306407034986,8.04303893751416,12.324547211086415,3.6122366242263038,13.431348019182451,15.42915462701452,9.283734808256888,8.930640578122087,12.592980023839697,15.190892239318847,13.420238218727075,11.486015897502204,6.694597277273062,19.034650337667788,5.293220324504895,17.10733361005827,3.4345495933646797,11.949255236128256,2.6425049680058477,15.737458597688336,13.865213691573185,0.43309316635429695,5.2051387947865635,12.952781437045275,1.1565382773097665,2.274818600077051,5.2912625384153245,6.706867069621696,12.199154199750932,14.82010695129581,6.781087447558032,13.125261632146369,0.5472894326786415,6.298027044536081,9.520708927092677,16.249275296925557,13.281668544672737,0.06833227390008023,12.12877727178423,3.315887925244758,18.18367554209615,6.0817436408738335,11.160374588182144,16.612803376676357,5.473700054758446,8.541149970442948,18.680621021311993,9.450017374931189,1.1394176635940712,10.122512485423712,1.9814299550174752,14.153964186698772,1.5501306947598126,18.605975461933994,11.752576697614199,6.318085716147461,6.508504918350058,5.0248314923110815,15.428241445360516,11.510051748904182,2.3289703781281412,13.762278689366955,8.192373377081719,2.181426918626741,19.017210701985142,10.231685040222036,10.838048119161776,11.428470819167948,3.204542328038813,7.339489739847815,2.3227903063670263,11.773820335414221,18.676888164949183,8.733348128915095,1.7266271241707853,0.39599747687766307,6.0170659060692655,19.588937205955155,8.687616106545534,10.061202386759174,14.420309647117836,8.850674439508994,6.540396244860842,15.145160642466458,2.801750994109482,2.322406365058982,3.6169087038626513,1.7890971621296359,12.736251339094977,8.294240903821875,9.061337049640809,13.031000484361051,13.407523374658684,16.2467833424608,11.64762617411271,12.697063955393538,3.4194908564803006,7.7452831196991,9.130900907473759,6.829235507563758,13.93623775087653,7.11520371557584,15.449930598476115,18.110582555025978,12.336390336072665,3.229998674880825,12.570315444638611,4.492159580594217,7.7991806136122355,17.406934365578604,11.628383753973877,4.969989546789937,18.25030608585633,7.350748680945012,3.5748072791800523,9.797653298800423,12.291840010984494,6.113292265879395,1.189843634333867,14.454579508510106,18.73986206091519,12.277736398302084,18.760986392168086,14.354820600395474,9.578068223807295,13.519700003586879,16.672325329288906,15.787811099010622,8.811714483996035,18.415342569197705,19.920209928632527,7.808087322727735,17.243796140633442,8.511555294059093,2.608328180718811,1.6690611218793006,2.743884015152309,18.66060445139488,6.685904683840573,13.674334657683346,17.04771709280952,11.457205151317073,0.9066512098360535,16.035018972424844,17.1555890593234,6.949562194044958,16.641300995450855,2.256937845702951,9.507166833235958,12.735908618876138,9.738482898362438,12.939851092892436,13.774234536305233,12.788247190878312,18.288190504031547,16.661844984008386,17.08161234100926,3.2971428977156902,4.247410107476943,5.950407403216267,0.522149423604028,11.904556481394781,18.5067829825492,19.2243713360916,0.7685420169565127,5.627882820911245,17.87358562039045,0.39891695321038867,6.456098772164474,12.675769787071381,7.21088130066303,17.481348281987685,12.796238525402405,13.953901022666916,14.662345027678505,3.577738397133685,17.54046051871645,7.499214561407319,4.239761070304744,10.245972997281907,18.26209095642811,12.811800962882312,8.783911939688828,18.71760101806093,14.74248638018912,19.587817256256237,3.5915604255935696,14.152961454130928,5.958810919267146,12.4431772025138,3.263412692874552,3.8071187737915047,1.1619415517153486,6.260049964443297,0.34731592326070704,7.48843158632142,7.261676627095035,1.1000137675269572,2.3985547353450665,18.376421704437846,10.301874935806179,2.4047210343602687,16.862546856439423,17.093689305535275,19.720334594054307,14.75397762528631,13.585616836261076,11.794643678047203,19.78230258685163,10.591436111216876,3.34646840891355,19.485299754005524,14.742392333130825,3.324366593986925,2.851323162811532,17.317857067556155,11.454456920009672,2.9378268919655115,13.825683098991428,15.794267669514976,8.572791060849049,2.794989961118697,7.282513900480563,19.05148321189617,5.726858200783109,5.720873533762814,8.422820819543603,14.046065045018477,13.164580538178598,12.008057423372701,8.24461833364067,19.746010992786104,11.33022177960636,18.786609801389943,13.863019786078521,1.4131174871887664,18.884657383055096,10.510532347379975,17.71014553817512,13.221228159061994,16.650621400866328,3.648292750915121,9.486280015016382,5.684452270701548,4.099070457957716,18.53274251313634,0.3196218507796056,5.740265256629158,18.243436134025345,3.2137053203525667,2.0176715678554746,7.578725694806634,2.810449638324486,4.2260897065833,2.874037986856335,3.0153034260150635,19.39299803850776,9.263725747348923,3.5645630416298424,19.605306613387263,8.160925929781811,3.659548257634504,0.1747788354589197,4.916813177951087,1.6675963675991534,7.171911398702879,4.60817718523622,16.686806838491414,13.692604448898415,5.3740422303275,12.151225502534317,0.9336889033755691,14.636727717912756,8.619415611751453,3.7298403087693144,2.420741625538154,17.222897993232337,14.011514728340405,6.745970398929,1.068739229543536,0.7738002499296703,3.534554254409006,5.7362132942904065,15.111875255708508,6.226978406824526,19.73865139832835,12.565004091757356,19.312776089555047,8.736136147037762,11.834827364896508,15.281874816798155,14.20487100073553,2.7393665384560384,6.674028980824271,13.26246325933704,0.7138483807239338,1.2427562273740467,0.6720346966434487,19.102125094758534,11.669122372612573,0.05713980471731883,1.707700225810096,12.247686289598976,5.8275558353498,19.264121054632458,15.26684897123502,6.636433405696662,15.363521177859965,4.974382295761406,8.429038722323945,12.475380014382026,17.955881900801046,11.452779475896726,3.83759722610292,18.204017177013544,3.667879245693344,15.569175794996877,8.362453453621042,13.750054552137616,15.339964383164965,4.9194697925411734,7.269253714885839,12.610210862984639,16.496624429371142,18.60136723781299,15.754714503907227,17.074498198595634,0.11520001679216296,0.8525215176651013,15.550342525303344,1.2390584235353819,9.21424472714667,13.21701548195055,9.55743184358747,16.269440196422632,13.192399604364446,16.390883127111486,0.6794577406511326,10.084197942159436,1.1748771717932982,14.988087769044544,9.447470231597684,7.745442408714038,14.035077039995976,15.506797740458671,12.567949422624931,2.699894691689697,3.152878963325909,12.574902628495725,11.52822602350033,2.2464480947586862,15.689095124936117,14.657060068278103,5.317799043554738,18.621569676381633,16.103609345579464,9.900877035625202,10.021338865340809,7.141774084456958,7.0509201757232365,13.173232954684266,2.425481512745127,6.100477853495034,10.709430034453922,14.725062633064745,5.084939884528814,3.8571096942649064,16.86545488938121,11.49004965021216,5.81721205075139,8.46230065173311,4.2678086730855425,6.3441228472642575,9.61621282916726,10.468784876316919,4.725424889733993,12.964200198887168,3.638234815645225,6.024562537552525,9.631285563347433,10.142592634718461,4.642508005366164,12.65657497127159,18.726323736824504,0.5535693366090255,0.24831795391727862,9.27229509896864,5.568640472366795,17.796516969232417,9.461981668469281,1.5144102929296732,12.95009875217116,16.568528238530323,17.37787195999507,6.0437900378634035,5.637341722541196,13.446919634936481,6.7317129769053174,10.015806951506017,4.0921773096981795,9.522541105632003,8.974648561348623,15.400757108044697,8.145706844274642,6.833512207941643,1.3880380602502562,10.096363833812445,11.696915777103985,3.732724913408676,10.78448114277306,16.33004974376549,18.66161260565358,7.686628368068331,16.46031987697725,16.771384435454685,15.612094410995606,8.852649970959785,0.46050012201721113,19.13806935323683,13.443382395300304,4.898744221465057,10.136560040377734,18.444830211221166,15.30146633140098,6.338253634375972,15.129711174015053,0.18638311924732864,2.2540031185764464,1.2015161348550674,13.001650586927735,5.246495469369603,17.147391637470303,17.10811316598909,12.562706859832758,19.821541828613164,13.964885693736209,1.45735655140375,3.3972169995727697,6.841776563277859,14.06800537315084,9.740615747323357,10.193143674161242,8.00007166165203,13.843937032551047,4.1774954486263205,16.8135182239472,13.550552182280224,3.2841114804500693,15.248130800341585,2.1848704733140245,10.831834816640837,1.8623330522116088,15.089618558017111,17.055261418673858,14.500400911290608,16.386212304906685,4.034845525446231,6.461772370161802,10.546191613878598,0.443776823005404,4.57639232859508,5.177803858043886,11.949676972638814,0.11945434909285346,0.048002235420554484,6.873987978674099,19.02546088833523,8.465088835100065,8.16973343483327,15.410986104702232,9.451276873611905,3.5817784217775417,7.70380323508558,16.197117792964505,1.5797758249831029,11.294470395230647,11.772636091343074,7.73035808659714,15.916153732557516,19.584724987721355,17.60830003258382,18.77774450258476,0.8083103291922011,8.598765218619665,6.175038583712071,3.8976334445491867,13.159411672979871,18.262129856949173,16.444316033070546,3.833759770014167,4.833105124468342,19.43839327136326,6.390780713073592,15.811323603009608,6.695257451749885,14.266544981667689,8.669737218246052,7.122034685000278,4.787561907494693,12.500153902569163,16.91024622402186,17.45895268885182,1.556822015515924,13.695059929922477,5.127594840947891,17.61786967957841,10.092615416085415,3.674092216761635,14.31545357632853,4.301713730173939,2.9756140577865065,12.715096011890413,4.551823064481488,2.219699943880249,12.930264682141281,19.69887760591623,15.583396784588782,8.709684220682217,5.530546200943078,3.153588205471949,15.534699510275578,9.652148270263856,9.561253127758263,8.557830455517191,9.930909404681367,19.533300924240283,3.033676858976091,12.208482651262127,12.65503853585297,5.985143853933872,14.405401697139752,3.0156490655233625,13.671897258811207,15.734242668158451,19.66338129400075,4.700048576119595,14.388585435696054,3.5657548522157523,17.85793197893137,15.67523512938057,12.961365837236993,13.326646188284744,13.271074126275423,4.526837626512412,3.0391152948938327,18.53211151948685,18.85385377221889,17.88899042382141,5.606059573089035,4.018086643744292,13.910330079033484,0.3564276995065896,17.981151847009578,2.29853580855095,1.5119958705606606,4.55223501161337,13.886873384814585,2.218526504784175,12.820327473707342,6.903899171206902,14.468990545042256,17.781462226098668,17.250860115768063,3.6514262018927157,5.402920670346081,5.668166199337272,0.09404762054616267,6.582494882758092,18.977554059540658,9.486524773451798,7.180938301629203,18.090733675072535,3.363231644084732,16.830919914005552,9.754527002537895,7.793686454754987,17.68170997486716,12.403312489828089,14.37799221450522,14.801998295875531,5.37326450763536,9.80727314845466,1.8019904904878414,5.833753832971853,15.475564579856158,10.493923619401393,2.962968371347765,16.97153843581956,14.980038420037761,0.31474907597625723,12.461427357314427,17.382072770716785,8.705648196887052,7.187458110994216,8.066897274956467,7.039041697109334,16.706737788283263,2.398819250318369,16.53749061958974,0.7474622059300273,6.0265271161884515,4.299081998146117,1.8257663824058623,11.021847812072426,8.61045810771162,9.263648054024433,14.66003604671859,13.090031150813441,10.291943455227095,19.977478412084736,10.27309786954023,18.085044000082963,14.89037446915566,3.7156913340834308,8.096522370433439,2.6619990114513614,0.37483630334424145,10.530593488075205,18.180201569944074,18.271712137756747,9.681956089176591,7.870479962793704,4.934093021674273,11.294613113163955,9.85587290924495,7.831946953789366,8.425148411050841,12.51197484826931,2.6473948800692204,16.69741077382058,7.988073609084649,0.3135774936887614,19.004196642092786,4.872542976375569,8.321545409028648,6.8110076920461315,4.905481312911233,3.0378699696390576,5.085483818471297,9.269703406687624,17.877846588981964,5.22863543596356,14.736881261655995,7.137388266109688,13.200918779359334,19.91718962370168,0.4750085819084404,17.23431143951826,0.11117009132886047,8.928522852205699,8.894536964138112,11.652856877834186,6.554944312157445,15.51226222001488,7.668409679531738,0.2735908452360647,9.620898984048715,1.8905080284254083,2.296937516207316,1.1414501353059192,15.691721940527795,3.454571945360776,9.79388171350601,19.911538066903425,1.1719890563396174,15.570719162267487,6.1414628274977545,2.6197505853422864,4.943352115511899,16.458487110195087,0.49472910141590276,12.165534725462974,12.175681499420353,0.13825157160884505,11.16375196776968,5.39632035709297,7.444318570640536,6.586657356046488,19.620375650023725,11.37446818581278,12.89986308902321,18.834477923327707,11.684337295747792,7.729237783589986,1.5825149150478701,7.065531313313249,7.354687586610296,15.717088402389695,6.669269386499148,7.744986282315862,19.416036688156225,9.821922445082624,6.970320472300688,4.705077566177831,4.62519140790282,19.74179919831726,1.1325835969570885,9.804325986658835,0.5007093703454979,12.058872466917379,12.202980028755768,19.654840368760226,0.9122867125057033,17.908023151877195,14.616309741151333,7.876878913412724,5.701967438390159,16.310631378623164,14.046504467437844,6.506154288840995,0.8749929913567067,16.37379994502048,19.1940890727787,17.91825087834375,19.285146895229452,0.05022307238427892,15.95079876771698,14.059994849318716,3.003641276834399,17.517086531085845,4.061243493461686,7.014823749448977,16.01546226957268,13.91900342100056,15.757265341399442,16.850731195817175,17.150984270191923,3.152222427774505,10.985658892209504,2.862515296764947,11.038893568217079,16.27710969360512,12.832685914464204,3.4310778179165347,15.410289046481909,13.245760519556239,9.861204504680966,3.9579192469719127,6.6539351054551865,9.090665479225457,14.350067159907688,13.052269106565063,8.185394356402353,5.146118053951012,6.50458315615678,0.6309257003782909,2.723251244191811,13.533644796849739,17.11736643743675,6.1587757019271105,15.134289898363678,16.772139738708084,16.653364322348587,18.39546678195987,2.124040855976639,11.62665064180809,8.44789248907622,19.003943975320524,17.98558001867354,3.9617494130767206,1.8527184655966167,15.9438402877114,8.085612101963768,8.109052174848834,9.09956460865808,14.245074257147037,4.5018367854005525,16.79745568730732,4.530903659451546,14.661567705575491,1.3791543809510776,18.145613127666476,16.193654651799886,6.582775709886213,1.4585286275108933,12.221914158652908,7.367856704593829,13.250846984883896,18.803421061915643,2.3917310329056285,11.872300734793445,9.848797809129897,7.945222885339365,12.844090133475813,0.8044348200860618,4.0764145365196836,13.570598938065306,14.918993882806184,14.564590982064324,12.856270814181121,0.6731341868707519,10.440942248998972,11.287398933002502,4.2548426875447065,19.569933994303504,3.0469450083976923,16.54532786603204,10.921069923635706,17.95618683084941,7.195569762472243,3.162618562466699,19.251188756771644,1.7273037077310294,9.646204190578445,8.04240351260546,6.730640572639612,1.6507601903085867,16.550114975557054,19.618928697485533,1.6989281124881916,12.27903659720865,16.776272215924028,12.039790035921193,12.86797273665667,7.034076266918237,6.194780462125924,10.075243155885936,2.6472031966931153,12.801987642084804,0.19383005641608442,14.241980096946634,16.976312751058515,12.61056964310734,19.88363299633624,0.9663552021520561,3.4713783326027237,11.391680962055709,6.089249717863656,15.249006720693203,10.20129477950003,0.3627589104516238,18.98557401930401,15.135633733572579,2.4858023349592617,7.767828009067239,13.533770000931774,11.505540240350545,17.469044039224677,12.493292155530282,6.5099004244614145,2.59827364295655,1.8699098196834196,9.73031045539984,9.178495494857266,12.73325979214571,11.915232069743041,12.22456987018274,6.916325045331138,1.4415046110277707,3.5912334096665166,13.989851943373948,4.39574366226712,13.769074056489966,18.712999354974205,3.7962663855225554,12.612813142656494,2.387767234596434,13.465964309549982,9.621624848196255,5.797189914923244,9.323933322550872,9.511482551455185,9.400044556413212,16.354780837187207,15.499468315534507,19.7072508836319,15.328571754503955,9.259951532581328,15.750787320116615,4.658875131032008,9.25005849940732,6.061992234272027,12.409505936065074,18.766684261251534,15.555934904234379,8.447492383753055,12.85942117411997,9.555217875473732,2.3055622005189402,4.585503789532996,7.821985662985833,17.511885682890146,3.3126390501811365,11.503358643605353,10.18390035006644,0.8899827786502224,12.16578449025782,17.65936890387043,11.753991692461131,11.457342847354406,4.399385689664803,18.309995593737362,18.28487990098566,8.78247444100031,11.846716858645067,15.167946388795697,10.415876606523206,11.127284917429021,17.29343217457921,15.058956709456389,5.763908772550468,9.848269202821225,10.611356098941066,10.688941200178391,19.784097726355423,19.002697054779638,17.49424635106617,8.698284051646006,13.135229931242204,13.479384398180771,10.027544275292314,7.887381710893129,0.8074851099328217,11.838623572073242,5.647256663454159,7.6898173909835466,15.21117511870897,5.526113818561429,18.571178496086883,0.7267913624149225,8.58676328448479,9.632447004004518,2.871399573249187,2.5073772368949987,19.153464146087728,1.8407639584830404,13.471601723710155,1.9713589969507206,9.635358911073393,12.341719249614073,6.045560113893078,1.059090783152845,8.816460439444214,5.744552042224522,14.684278833366191,8.128832644170023,16.937105823862705,9.488716427556131,6.948119109993267,1.5756638237226817,17.72363518236674,3.8769426429840026,7.597851156286892,19.925649284904896,2.015337753800863,2.6680721313324707,16.090490102558455,12.016606781473147,10.54274175092111,16.986304093708977,17.500544479831955,4.411738148834017,8.938752934937902,17.884620335460014,7.875297805447348,17.113368489268176,17.647423390683265,8.930167273300288,10.866990799057671,6.8127884144364215,5.699354889442896,10.00920569437605,0.849994146301869,16.157343655048003,2.572795606835774,19.735276525849486,14.472802402968528,15.330710601431106,16.402939841889335,18.609974477333687,6.841485216200844,9.193955894666495,15.387489863332187,15.873317765326673,4.434103909928466,14.428624214222188,13.966587244644554,8.004699894290814,12.242198150070887,5.205213178131389,0.8413039948038881,15.057602774472581,11.536887768392553,12.524165178637375,2.2652548233775027,9.752179351649243,14.694313889434728,12.996264855707164,0.05309399131325776,5.892292712056908,6.773587196834816,16.526576937597206,12.217628309372337,13.393113024747706,1.6464094057270184,16.819322707745926,15.177853573918059,12.879884150848465,19.879597226576003,8.01822560893212,1.540365446532883,6.108764940460412,6.073776428430833,9.622941658157593,15.554054873833095,16.729330793766795,0.2688719129937711,15.230924898762295,9.793828009882851,6.57451463063611,15.361630321974475,5.454688396384264,6.349342179465345,16.210636440303997,7.011214103573433,9.459998444686214,14.269328776442084,10.448026560100692,18.073643998672747,8.711500602421388,2.723808978494313,8.502365833588502,19.31853979529718,19.91776620224592,19.03543335274278,11.772760361559582,14.516546288003642,7.2537568891522985,1.625288989704874,3.7603046565225684,14.309201905590596,15.197733612642637,19.981522311216217,1.328237557048273,4.436579164356957,15.488819951585068,19.564184061379226,16.719482432399072,11.048548160646634,15.34919370749282,2.277942543855036,3.9310525327192103,10.64405610934486,10.953090410608848,7.856344522032814,18.428642345378382,16.455192086693966,19.719190409076983,8.249531165736395,18.382703615095792,1.6413609120412387,19.30500209359281,14.415859211150664,4.803095158774302,14.89461821882955,16.97412546782093,17.84873713356019,11.298242031743019,9.803037855150642,7.245979254388479,8.18475357380871,5.538347439446425,13.266055757984576,8.87586831076376,6.602333181154405,17.923822070157527,18.628756612035467,8.85790008970639,2.2487839682960997,18.121799586977474,14.395977147751267,18.34663827439412,19.348704390958687,5.070181938610294,18.30874305340819,11.718768829590633,11.236254166830712,12.509531443131984,1.50078316473659,0.30518591921290916,19.002265075437247,2.7882236692389073,13.556948330396255,5.724939656205201,18.8566823120407,6.836276049514902,4.038602518473717,3.481451126477726,10.36550523167719,8.608928601821768,5.531955399421973,10.289375678534928,16.51610165681098,19.092254722364125,12.431634212468033,8.542664032729522,7.374215499699361,19.556380386049934,17.222482905340726,10.647541991463383,19.314177641783473,17.503608443498887,1.3734554214825012,12.490546391872822,18.12056827859767,2.2594941949747227,19.956755595199112,6.471781876308018,16.278924858194713,2.8771399270062314,12.04060741630637,17.40666071726167,9.067280832478275,1.7641288138487088,4.373801702904796,11.005200944971252,4.7172780152346006,12.577216594197953,9.388305612963567,11.390932551655215,16.161635388774158,1.1939759235725589,15.625849814291213,11.686903323002715,14.090398295869733,19.0933826334645,18.861264975325675,0.5192642619685417,11.293815479519331,6.2805545025971465,3.11782576120732,1.456589780389228,18.099142161189455,14.592637041936495,11.55288938967541,13.030892562617957,9.139867007545451,12.774647176368067,6.454924959374142,10.686346378165217,14.428605696080194,19.483600640516872,1.4213262415305516,9.114517663694448,18.66342029352881,3.310111152980082,18.883399947183186,0.526945691954781,18.419249443540583,10.203294178720451,13.52901841106756,11.004073129485196,1.3822023766866476,13.957614875669222,9.660739881557475,2.5783739677049455,0.3988438476643319,2.8591888105271446,2.4663454386973527,15.019523964520122,7.789113196638735,18.87995805268838,7.7230460297178105,18.352356271013765,8.204358557071174,3.5593104123259423,18.48155222214821,9.064440360731417,17.259596344085544,8.76350509362993,7.095738170587644,0.06151030651044831,9.819700960401484,14.40817568708499,0.3392288410379818,13.940103248342242,10.459972485190896,3.72724682637267,14.092899001715145,6.33815418351483,5.187448090654918,6.499300806928892,1.044098180045192,7.66242013630551,3.791479920265677,5.48388401482343,12.426399601518128,14.5251326557863,2.933523338585533,15.288487982807727,11.312456200436642,10.307423823483091,6.6452704191605205,14.220505895215524,8.35705422964283,13.141437362211686,7.109159589466008,13.626602526676205,12.368459971657785,1.063798805716134,1.1076034927256106,13.716436943660945,2.9195531385475793,19.61444335668027,4.648416558044293,14.132791146584204,14.731915995773996,16.485761387953083,14.278020501503633,15.612402974480455,6.741991819753639,19.743270579385694,13.425592853724432,1.9403887051736346,11.006094722332769,8.778638033441535,8.246475105229521,5.833954749184422,16.253088205225012,11.039146570193296,15.98771941657095,7.78231835548481,5.220636855284586,1.3317944215236066,3.0463089293843337,6.847430522355524,2.0341716075137484,5.326905743318449,13.548881143757603,15.68764684716399,5.124238721782874,17.13065122095937,19.49604080245868,18.863501630394126,12.09145651072883,19.359940500232383,8.677140837546293,16.720900111395306,3.4994553948620633,13.770711672616018,13.865731113093549,17.093515199534476,19.41299984243208,13.747764711378764,12.843355674345762,19.428796048427706,9.443927751289717,14.927953763986231,7.485316528305073,2.4355336903663405,9.821273424786368,7.356718244147968,7.28648947071576,13.509394506450882,5.842808749590911,2.7263293936816835,6.917597062478329,19.40077924453852,17.595705105457068,18.447936770863148,9.025726674835397,19.738511989238464,14.594224836318581,17.46414542465387,18.062675089340274,14.116102074356451,17.783577633838526,2.6499529683502265,10.080772166245682,5.845038417361055,13.51805421230515,7.573758873483647,12.639952414881876,0.6632873496108083,2.3496516810257706,19.094842748587478,1.2096394098764662,4.31223461123158,14.669053580756199,8.489233071385133,4.402605626621687,3.961970204221008,16.534327323570682,19.975484793054747,8.728948691834288,7.417521004641521,9.790133473491975,18.05203342400627,10.519160513368476,1.4742833953611445,1.3393275272958016,5.475149150602681,13.085253198080586,12.15781962003681,9.565957756090672,7.433615482808307,1.2820452043223707,4.028469415723066,12.70095161979011,5.412113948605133,18.347667256391563,18.278164147906622,12.14878351572581,6.586844430300878,17.678559239358094,7.466818074840926,8.247658684628147,1.0011290991441557,1.0094872755550988,18.124580484772842,15.545928677094526,13.024928025936706,3.1569602297483934,8.36891295144432,7.934988220354731,18.460518349741385,19.48972202004246,18.67498239584052,16.576047088083946,8.768024191773156,1.3032843671643057,11.20007147359637,2.9806201245132735,4.000727503077037,9.567022438689182,19.087070150813208,3.611751299139847,16.234492924836374,8.242694277287725,11.701184090381012,9.7700438039523,4.169666274810893,11.53643142580838,0.3823037193106771,3.3950316574920736,19.179643680478993,12.765482883664582,15.887290614218706,7.019578245831974,4.77196146935948,5.238537520544302,11.90247230696016,12.081509601279272,6.635139368849754,1.8118117682830759,19.53885098202786,1.6954891154245377,9.68940103385799,19.430323220205544,13.908097326755907,8.680143565484858,8.725523301067764,6.543439947449188,4.9940866479226775,19.899854065972864,3.3698050272899938,13.664053888261583,5.540229086916311,6.635721649496413,18.871769458701436,12.50460404750231,7.446577548989146,10.975913806331693,3.8930859768426673,10.711241941669275,14.700065059577344,3.7802303962107686,19.342969360620543,13.287233498009133,11.711596149808905,6.489159971836731,16.232242408424767,0.7086909984622114,0.22808673508091015,16.262749581346924,5.244094048885848,6.460575686069241,7.789328510703877,1.5872927077401355,13.35691593184761,0.3108122955798809,7.3713003940135335,8.830815311314076,9.005613960925576,0.9619180731986088,10.178216547588438,10.28220762939152,9.277709413303246,17.942811798154704,0.8937029746106173,19.637897777633317,1.7139860128879558,1.6937407106989655,11.438808276010594,7.773584842942212,12.586210751471011,9.370221926778877,15.255589300962376,7.728049924903551,1.4504343536172248,19.889512915008154,0.11687524347955058,19.013975483916564,18.365599203114233,14.966984217051799,13.00757301412387,0.18341386074089527,0.028172788699305507,7.700159325286164,9.95365310326549,6.483156363162905,15.638355151485532,11.056488174236346,2.1441394013422066,1.282075266057725,9.108957938235918,11.705834872853123,18.67962384607447,0.8597467889349897,18.96777812684241,11.359712093256276,18.428158866704784,10.44863159595128,14.238924800765753,16.042627540822888,18.29733744344277,18.741992905075172,13.294916254604594,4.573365403892922,7.521924111637355,1.5263706452770842,1.1593056897833076,5.0174314905177875,0.3832064450240491,7.2754794399901845,17.85643631546924,4.541977208581329,15.166955343583677,0.48159835689665975,6.617989279262297,19.66426934489274,16.858003475357748,17.09632797002245,12.101903150879103,9.867370631949148,17.308204971798045,12.571397898957958,7.265975051984319,7.529560027709334,1.8056082675868357,11.710964674228975,5.0501574992951515,7.273514968177288,0.2425935086540587,12.805156869794825,3.1603858903486426,3.2961519064609046,1.1722451025013614,8.85752657861596,12.704991804744399,5.0919743967290065,15.35896118542512,18.355863378293066,8.98075132591709,3.475719591429338,8.197110042211872,2.62017999937481,7.895156338496667,13.977726981431084,14.649624168715757,3.435455783261925,11.762821547737282,19.125709491545333,5.391166791041511,18.357625310083154,18.32251698689089,3.694093426851417,19.736748895924322,12.635667525703465,2.5171194257312157,17.983131765478166,0.6544656798757087,1.8619422999034052,11.40181147805842,9.122084626186293,18.77013459813488,12.547188129411584,15.857475740872836,19.141955627019126,15.981083302989823,6.104137744808766,8.174052507915732,4.6981231345666785,12.453432250588602,7.905137288935347,11.584625090437646,9.117804630645558,9.243848787912171,5.256501571690331,19.245680760316933,13.025473878213978,0.31143342388532336,16.739797291408806,6.577260822377591,0.79782679105314,7.333723362879896,5.529967065249544,7.997474663456741,19.87855514046194,15.45240654217714,14.710350644342105,1.9826974091260796,19.033158011339452,9.238083268349474,19.78382027534525,4.245627952633981,11.790519142638676,13.41170614837431,11.997487460624745,0.6214497023465659,5.02289748458721,5.425565664514025,4.486019327041557,7.80745785070323,6.899084038750867,10.271623011347408,16.654448399219067,15.317863786227814,5.167539091836195,6.5812088595615,6.6986332647845215,4.53079496105119,10.62075233085686,13.046162979297087,9.651528794996382,1.2101595739626037,17.761312581752478,13.729542141803135,6.300064157690302,6.968110041958462,2.486837624099336,7.057394010282634,18.29818214315017,15.964404842569975,12.478858483501366,6.65855254090145,0.8582294144892755,3.1208506916989887,0.62426080372747,13.400042827931337,1.7982737941114024,16.79248198830676,19.810664120384395,4.286761966713284,1.8567792058239174,5.400609156796103,11.987672041854761,11.89962694687734,19.20600465780271,16.261033128911883,14.76012977685214,12.186577049013074,15.178004030621395,19.78361902569673,6.8941677546706615,9.108478639858264,11.212074266449035,0.8895881254232618,6.475471312759775,10.936817167540923,8.255423428941867,8.020598564759984,10.705840465046128,5.569512876804654,4.245402285490583,7.614511808915148,17.249522259052362,11.963051995448243,16.364145632743497,9.174435898678034,2.360301806341787,3.383575266339789,17.207858598926645,16.140505569080915,19.001745914195073,8.71089041307715,15.62567222837961,1.799777942181331,0.732648962922422,12.543058239027944,16.941094376593895,19.61749390499252,4.446986959002062,14.308854203569311,7.3665657741176105,5.289625118457075,14.742127923545674,3.5069089251289842,10.617883340999231,15.691740217098097,12.15076384698341,13.003749438166778,19.643410721532767,5.384746641815177,5.180122519624986,10.895456956390941,15.772687563112559,4.916623100032389,3.0080092210249987,18.07435787371014,14.22347946644232,4.365956022426527,2.0091590409380267,15.16857417821023,15.343024885306495,10.146264146217483,16.22775969098205,19.981318568178157,4.177402180425607,12.043827770327828,2.03073528664512,5.142097044146405,5.616809174074748,16.083963760846494,9.857014017606488,4.561814055033451,6.190012104359668,11.655169778222433,6.238194498795111,5.321011822140149,10.500789956622981,2.6362344887307065,10.264993612611262,6.015854952061774,4.894317994957338,5.031384632814286,2.1875870213226145,9.38313556271245,13.581378212758878,4.022250310629243,16.10631125830888,12.703967240995375,18.36010330799622,9.046125298428835,19.17264131065277,4.214313104585772,11.819447186014834,5.980574996571266,15.762268610422524,6.661534454058109,18.215872511649508,18.439749710926208,3.240583069882197,2.9768781849692827,9.95154035121763,17.401467036888715,15.13461341408278,9.27113707233893,4.528482226561801,19.395985065311898,17.892220501763028,4.8225676737169465,12.543008572985904,1.184981131485161,6.496777002214977,8.81215475076604,2.6121236617439436,14.902027788145809,10.922568993672087,16.3553684810514,9.257884085205905,0.07707475947361875,7.018313325052201,16.39962262435212,4.281163364952096,0.27668815261983504,1.4816895825401,4.538286476276978,17.433548207618475,4.15321592243405,17.335096239266807,3.404295104568993,0.5826617332714301,18.765374408870095,8.815517485549446,10.674301858950086,14.143883270517374,9.669106949734868,10.142601540331269,1.7608965515547714,19.950465406379337,10.212119784133385,2.1270576966102173,11.135551021301321,7.938027912593553,8.59867309553767,18.68942352623806,16.32294524370762,11.068493065391003,12.591314198502047,1.5313713212560254,14.453105778346709,5.407262314406873,7.133543880970721,7.119367650566657,0.1826985622069799,6.068538241285983,13.603298585998381,17.15609118387111,5.990897206551096,17.622320917757776,12.837227910667014,15.66854937928801,1.613137263857305,19.797095955549352,11.227591647584019,13.290005989396526,5.693652965069966,11.7299533445619,9.270958833142435,11.365742291281823,2.363932432267717,9.933145198755069,18.34051755276322,9.388463638853928,1.0581616417059614,3.852683012406195,12.550907150279759,13.007392369730129,3.7292397004898303,4.642593199248903,10.742566165715566,14.902951004372689,6.893391299874567,12.533255085626074,1.6922893034890896,11.329647912407982,18.43862803903471,4.095636299776997,12.587254587878295,3.3853988126150547,12.0170529438208,15.165629069262355,6.274565317757426,3.6461485595800314,5.354157924676914,8.948792490792847,17.018664337316594,3.0400653190404636,6.716525361467527,6.180846022148865,8.497807377405572,7.998196065245784,16.948870402570584,18.2187713589655,17.730488262972205,19.16541054631311,15.221624291046037,13.670806936486652,1.7945678985546865,14.62643688535113,19.895781348286445,16.545331939632423,8.91171441589873,16.556715559635844,18.93744147273295,0.5492046312482923,15.322272409361775,4.86035389131557,4.339041955799856,4.147982359461717,16.409488495981734,17.212477873037763,11.056300281531378,17.126991987229793,15.94106837642257,4.365220716786529,11.787425009486089,8.577638814954781,3.5378826037539213,8.237242085012282,12.64889191520998,7.687724553196076,6.342655356239164,18.121351460818126,18.854616713333563,5.653728824129254,10.31363318447652,15.399059740839064,12.767676534619557,4.644268638473714,18.564246597961883,19.18071947217983,16.18535815750502,12.846842374377886,8.667817497201247,6.905293598300175,18.36695363918669,18.930957555430062,15.98960067275704,12.799033564489317,16.56244036846467,3.9078116203057256,4.104832910183753,19.079311902379118,15.678353906597833,6.762442933772204,12.934763306015906,15.628071370793496,11.761525670382431,3.1073544139722165,8.067402332317695,6.015599124815707,19.15839977970814,11.974714646195821,1.1430971482799812,4.436033723919293,13.441458781455564,16.918824245186073,19.524025977009565,2.3106588246981508,0.032695821900956545,0.8926869555753658,18.207148800605918,7.345693028058675,19.696807765325588,1.8672503640656801,12.125285687410937,14.596683751353115,13.129798068119989,16.434713086392165,13.686864908701967,9.897697360310854,12.738220887672664,2.3425235383985488,16.806192831559255,1.5057068319741784,0.4536703345390869,16.365776129119986,5.193430368240519,12.138270475194023,10.19745960882637,18.88716577484772,15.679972599174139,11.33934296519968,8.875965334766551,11.603855396286997,10.605564445801718,14.512778565146686,16.647472782532727,5.401415853117912,15.959643943153413,0.4093774904521341,5.120203031572372,9.380613050847941,0.224708676841181,17.888023877235835,12.445002098713998,16.39445749249466,17.5342186990828,9.674060628768792,6.232472467152355,5.389780413620282,13.176557501767657,5.870773349252367,6.384491749658818,2.467548509314108,16.568597017052056,1.7309319551550972,17.138023651688105,8.89983135767688,4.123908434973149]}
},{}],80:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var randu = require( '@stdlib/random/base/randu' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var EPS = require( '@stdlib/constants/math/float64-eps' );
var factory = require( './../lib/factory.js' );


// FIXTURES //

var decimalDecimal = require( './fixtures/julia/decimal_decimal.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof factory, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a function', function test( t ) {
	var logpdf = factory( 0.0, 1.0 );
	t.equal( typeof logpdf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 1.0 );
	y = logpdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NaN );
	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a finite `k`, the function returns a function which returns `-Infinity` when provided `Infinity` for `x`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 1.0 );
	y = logpdf( PINF );
	t.equal( y, NINF, 'returns -Infinity' );

	t.end();
});

tape( 'if provided a finite `k`, the function returns a function which returns `-Infinity` when provided `-Infinity` for `x`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 1.0 );
	y = logpdf( NINF );
	t.equal( y, NINF, 'returns -Infinity' );

	t.end();
});

tape( 'if provided a negative `k`, the created function always returns `NaN`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( -1.0 );

	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if `k` equals `0`, the created function evaluates a degenerate distribution centered at `0.0`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 0.0 );

	y = logpdf( -2.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpdf( 0.0 );
	t.equal( y, PINF, 'returns Infinity for x equal to 0' );

	y = logpdf( 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpdf( PINF );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpdf( NINF );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the returned function returns `-Infinity` for all `x < 0`', function test( t ) {
	var logpdf;
	var x;
	var y;
	var i;

	logpdf = factory( 1.0 );
	for ( i = 0; i < 100; i++ ) {
		x = -( randu()*100.0 ) - EPS;
		y = logpdf( x );
		t.equal( y, NINF, 'returns -Infinity for x='+x );
	}
	t.end();
});

tape( 'the created function evaluates the logpdf for `x` given degrees of freedom `k`', function test( t ) {
	var expected;
	var logpdf;
	var delta;
	var tol;
	var k;
	var x;
	var y;
	var i;

	expected = decimalDecimal.expected;
	x = decimalDecimal.x;
	k = decimalDecimal.k;
	for ( i = 0; i < x.length; i++ ) {
		logpdf = factory( k[i] );
		y = logpdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+'. k:'+k[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 2.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. k: '+k[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/chi/logpdf/test/test.factory.js")
},{"./../lib/factory.js":76,"./fixtures/julia/decimal_decimal.json":79,"@stdlib/constants/math/float64-eps":55,"@stdlib/constants/math/float64-ninf":62,"@stdlib/constants/math/float64-pinf":64,"@stdlib/math/base/assert/is-nan":74,"@stdlib/math/base/special/abs":87,"@stdlib/random/base/randu":164,"tape":266}],81:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var logpdf = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof logpdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `logpdf` functions', function test( t ) {
	t.equal( typeof logpdf.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/chi/logpdf/test/test.js")
},{"./../lib":77,"tape":266}],82:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var randu = require( '@stdlib/random/base/randu' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var EPS = require( '@stdlib/constants/math/float64-eps' );
var logpdf = require( './../lib' );


// FIXTURES //

var decimalDecimal = require( './fixtures/julia/decimal_decimal.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof logpdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = logpdf( NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = logpdf( 0.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided `+infinity` for `x` and a finite `k`, the function returns `-Infinity`', function test( t ) {
	var y = logpdf( PINF, 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );
	t.end();
});

tape( 'if provided `-infinity` for `x` and a finite `k`, the function returns `-Infinity`', function test( t ) {
	var y = logpdf( NINF, 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );
	t.end();
});

tape( 'if provided a negative `k`, the function always returns `NaN`', function test( t ) {
	var y;

	y = logpdf( 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 0.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if `k` equals `0`, the function evaluates a degenerate distribution centered at `0`', function test( t ) {
	var y;

	y = logpdf( 0.0, 0.0 );
	t.equal( y, PINF, 'returns Infinity for x equal to 0' );

	y = logpdf( 1.0, 0.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpdf( -1.5, 0.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpdf( PINF, 0.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpdf( NINF, 0.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpdf( NaN, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function returns `-Infinity` for all `x < 0`', function test( t ) {
	var x;
	var y;
	var i;

	for ( i = 0; i < 100; i++ ) {
		x = -( randu()*100.0 ) - EPS;
		y = logpdf( x, 1.0 );
		t.equal( y, NINF, 'returns -Infinity for x='+x );
	}
	t.end();
});

tape( 'the function evaluates the logpdf for `x` given degrees of freedom `k`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var k;
	var y;
	var i;

	expected = decimalDecimal.expected;
	x = decimalDecimal.x;
	k = decimalDecimal.k;
	for ( i = 0; i < x.length; i++ ) {
		y = logpdf( x[i], k[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+'. k:'+k[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 2.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. k: '+k[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/chi/logpdf/test/test.logpdf.js")
},{"./../lib":77,"./fixtures/julia/decimal_decimal.json":79,"@stdlib/constants/math/float64-eps":55,"@stdlib/constants/math/float64-ninf":62,"@stdlib/constants/math/float64-pinf":64,"@stdlib/math/base/assert/is-nan":74,"@stdlib/math/base/special/abs":87,"@stdlib/random/base/randu":164,"tape":266}],83:[function(require,module,exports){
'use strict';

// MODULES //

var constantFunction = require( '@stdlib/utils/constant-function' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );


// MAIN //

/**
* Returns a function for evaluating the natural logarithm of the probability density function (logPDF) of a degenerate distribution centered at a provided mean value.
*
* @param {number} mu - value at which to center the distribution
* @returns {Function} function to evaluate the natural logarithm of the probability density function
*
* @example
* var logpdf = factory( 5.0 );
*
* var y = logpdf( 0.0 );
* // returns -Infinity
*
* y = logpdf( 5.0 );
* // returns Infinity
*/
function factory( mu ) {
	if ( isnan( mu ) ) {
		return constantFunction( NaN );
	}
	return logpdf;

	/**
	* Evaluates the natural logarithm of the probability density function (logPDF) of a degenerate distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} natural logarithm of the probability density function
	*
	* @example
	* var y = logpdf( 10.0 );
	* // returns <number>
	*/
	function logpdf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		return ( x === mu ) ? PINF : NINF;
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/constants/math/float64-ninf":62,"@stdlib/constants/math/float64-pinf":64,"@stdlib/math/base/assert/is-nan":74,"@stdlib/utils/constant-function":169}],84:[function(require,module,exports){
'use strict';

/**
* Degenerate distribution logarithm of probability density function (logPDF).
*
* @module @stdlib/math/base/dists/degenerate/logpdf
*
* @example
* var logpdf = require( '@stdlib/math/base/dists/degenerate/logpdf' );
*
* var y = logpdf( 2.0, 0.0 );
* // returns -Infinity
*
* @example
* var factory = require( '@stdlib/math/base/dists/degenerate/logpdf' ).factory;
*
* var logPDF = factory( 10.0 );
*
* var y = logPDF( 10.0 );
* // returns Infinity
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var logpdf = require( './logpdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( logpdf, 'factory', factory );


// EXPORTS //

module.exports = logpdf;

},{"./factory.js":83,"./logpdf.js":85,"@stdlib/utils/define-read-only-property":173}],85:[function(require,module,exports){
'use strict';

// MODULES //

var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );


// MAIN //

/**
* Evaluates the natural logarithm of the probability density function (logPDF) for a degenerate distribution centered at `mu`.
*
* @param {number} x - input value
* @param {number} mu - constant value of the distribution
* @returns {number} natural logarithm of probability density function
*
* @example
* var y = logpdf( 2.0, 3.0 );
* // returns -Infinity
*
* @example
* var y = logpdf( 3.0, 3.0 );
* // returns Infinity
*
* @example
* var y = logpdf( NaN, 0.0 );
* // returns NaN
*
* @example
* var y = logpdf( 0.0, NaN );
* // returns NaN
*/
function logpdf( x, mu ) {
	if ( isnan( x ) || isnan( mu ) ) {
		return NaN;
	}
	return ( x === mu ) ? PINF : NINF;
}


// EXPORTS //

module.exports = logpdf;

},{"@stdlib/constants/math/float64-ninf":62,"@stdlib/constants/math/float64-pinf":64,"@stdlib/math/base/assert/is-nan":74}],86:[function(require,module,exports){
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

},{}],87:[function(require,module,exports){
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

},{"./abs.js":86}],88:[function(require,module,exports){
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

},{}],89:[function(require,module,exports){
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

},{"./ceil.js":88}],90:[function(require,module,exports){
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

},{"@stdlib/number/float64/base/from-words":134,"@stdlib/number/float64/base/get-high-word":138,"@stdlib/number/float64/base/to-words":149}],91:[function(require,module,exports){
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

},{"./copysign.js":90}],92:[function(require,module,exports){
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

},{"@stdlib/math/base/special/kernel-cos":108,"@stdlib/math/base/special/kernel-sin":112,"@stdlib/math/base/special/rempio2":120,"@stdlib/number/float64/base/get-high-word":138}],93:[function(require,module,exports){
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

},{"./cos.js":92}],94:[function(require,module,exports){
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

},{}],95:[function(require,module,exports){
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

},{"./floor.js":94}],96:[function(require,module,exports){
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

},{"./polyval_a1.js":98,"./polyval_a2.js":99,"./polyval_r.js":100,"./polyval_s.js":101,"./polyval_t1.js":102,"./polyval_t2.js":103,"./polyval_t3.js":104,"./polyval_u.js":105,"./polyval_v.js":106,"./polyval_w.js":107,"@stdlib/constants/math/float64-pi":63,"@stdlib/constants/math/float64-pinf":64,"@stdlib/math/base/assert/is-infinite":70,"@stdlib/math/base/assert/is-nan":74,"@stdlib/math/base/special/abs":87,"@stdlib/math/base/special/ln":116,"@stdlib/math/base/special/sinpi":128,"@stdlib/math/base/special/trunc":130}],97:[function(require,module,exports){
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

},{"./gammaln.js":96}],98:[function(require,module,exports){
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
		return 0.020580808432516733;
	}
	return 0.020580808432516733 + (x * (0.0028905138367341563 + (x * (0.0005100697921535113 + (x * (0.00010801156724758394 + (x * 0.000044864094961891516))))))); // eslint-disable-line max-len
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
		return 1.3920053346762105;
	}
	return 1.3920053346762105 + (x * (0.7219355475671381 + (x * (0.17193386563280308 + (x * (0.01864591917156529 + (x * (0.0007779424963818936 + (x * 0.000007326684307446256))))))))); // eslint-disable-line max-len
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
		return 0.21498241596060885;
	}
	return 0.21498241596060885 + (x * (0.325778796408931 + (x * (0.14635047265246445 + (x * (0.02664227030336386 + (x * (0.0018402845140733772 + (x * 0.00003194753265841009))))))))); // eslint-disable-line max-len
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
		return -0.032788541075985965;
	}
	return -0.032788541075985965 + (x * (0.006100538702462913 + (x * (-0.0014034646998923284 + (x * 0.00031563207090362595))))); // eslint-disable-line max-len
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
		return 0.01797067508118204;
	}
	return 0.01797067508118204 + (x * (-0.0036845201678113826 + (x * (0.000881081882437654 + (x * -0.00031275416837512086))))); // eslint-disable-line max-len
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
		return -0.010314224129834144;
	}
	return -0.010314224129834144 + (x * (0.0022596478090061247 + (x * (-0.0005385953053567405 + (x * 0.0003355291926355191))))); // eslint-disable-line max-len
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
		return 0.6328270640250934;
	}
	return 0.6328270640250934 + (x * (1.4549225013723477 + (x * (0.9777175279633727 + (x * (0.22896372806469245 + (x * 0.013381091853678766))))))); // eslint-disable-line max-len
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
		return 2.4559779371304113;
	}
	return 2.4559779371304113 + (x * (2.128489763798934 + (x * (0.7692851504566728 + (x * (0.10422264559336913 + (x * 0.003217092422824239))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],107:[function(require,module,exports){
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

},{}],108:[function(require,module,exports){
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

},{"./kernel_cos.js":109}],109:[function(require,module,exports){
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

},{"./polyval_c13.js":110,"./polyval_c46.js":111}],110:[function(require,module,exports){
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
		return -2.7557314351390663e-7;
	}
	return -2.7557314351390663e-7 + (x * (2.087572321298175e-9 + (x * -1.1359647557788195e-11))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],112:[function(require,module,exports){
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

},{"./kernel_sin.js":113}],113:[function(require,module,exports){
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

},{}],114:[function(require,module,exports){
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

},{"./ldexp.js":115}],115:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-exponent-bias":56,"@stdlib/constants/math/float64-max-base2-exponent":60,"@stdlib/constants/math/float64-max-base2-exponent-subnormal":59,"@stdlib/constants/math/float64-min-base2-exponent-subnormal":61,"@stdlib/constants/math/float64-ninf":62,"@stdlib/constants/math/float64-pinf":64,"@stdlib/math/base/assert/is-infinite":70,"@stdlib/math/base/assert/is-nan":74,"@stdlib/math/base/special/copysign":91,"@stdlib/number/float64/base/exponent":132,"@stdlib/number/float64/base/from-words":134,"@stdlib/number/float64/base/normalize":143,"@stdlib/number/float64/base/to-words":149}],116:[function(require,module,exports){
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

},{"./ln.js":117}],117:[function(require,module,exports){
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

},{"./polyval_p.js":118,"./polyval_q.js":119,"@stdlib/constants/math/float64-exponent-bias":56,"@stdlib/constants/math/float64-ninf":62,"@stdlib/math/base/assert/is-nan":74,"@stdlib/number/float64/base/get-high-word":138,"@stdlib/number/float64/base/set-high-word":147}],118:[function(require,module,exports){
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
		return 0.6666666666666735;
	}
	return 0.6666666666666735 + (x * (0.2857142874366239 + (x * (0.1818357216161805 + (x * 0.14798198605116586))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],120:[function(require,module,exports){
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

},{"./rempio2.js":122}],121:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":95,"@stdlib/math/base/special/ldexp":114}],122:[function(require,module,exports){
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

},{"./kernel_rempio2.js":121,"./rempio2_medium.js":123,"@stdlib/number/float64/base/from-words":134,"@stdlib/number/float64/base/get-high-word":138,"@stdlib/number/float64/base/get-low-word":140}],123:[function(require,module,exports){
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

},{"@stdlib/math/base/special/round":124,"@stdlib/number/float64/base/get-high-word":138}],124:[function(require,module,exports){
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

},{"./round.js":125}],125:[function(require,module,exports){
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

},{}],126:[function(require,module,exports){
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

},{"./sin.js":127}],127:[function(require,module,exports){
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

},{"@stdlib/math/base/special/kernel-cos":108,"@stdlib/math/base/special/kernel-sin":112,"@stdlib/math/base/special/rempio2":120,"@stdlib/number/float64/base/get-high-word":138}],128:[function(require,module,exports){
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

},{"./sinpi.js":129}],129:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-pi":63,"@stdlib/math/base/assert/is-infinite":70,"@stdlib/math/base/assert/is-nan":74,"@stdlib/math/base/special/abs":87,"@stdlib/math/base/special/copysign":91,"@stdlib/math/base/special/cos":93,"@stdlib/math/base/special/sin":126}],130:[function(require,module,exports){
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

},{"./trunc.js":131}],131:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ceil":89,"@stdlib/math/base/special/floor":95}],132:[function(require,module,exports){
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

},{"./main.js":133}],133:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-exponent-bias":56,"@stdlib/constants/math/float64-high-word-exponent-mask":57,"@stdlib/number/float64/base/get-high-word":138}],134:[function(require,module,exports){
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

},{"./main.js":136}],135:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":29}],136:[function(require,module,exports){
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

},{"./indices.js":135,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],137:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":29}],138:[function(require,module,exports){
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

},{"./main.js":139}],139:[function(require,module,exports){
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

},{"./high.js":137,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],140:[function(require,module,exports){
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

},{"./main.js":142}],141:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":29}],142:[function(require,module,exports){
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

},{"./low.js":141,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],143:[function(require,module,exports){
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

},{"./main.js":144}],144:[function(require,module,exports){
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

},{"./normalize.js":145}],145:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-smallest-normal":65,"@stdlib/math/base/assert/is-infinite":70,"@stdlib/math/base/assert/is-nan":74,"@stdlib/math/base/special/abs":87}],146:[function(require,module,exports){
arguments[4][137][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":29,"dup":137}],147:[function(require,module,exports){
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

},{"./main.js":148}],148:[function(require,module,exports){
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

},{"./high.js":146,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],149:[function(require,module,exports){
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

},{"./main.js":151}],150:[function(require,module,exports){
arguments[4][135][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":29,"dup":135}],151:[function(require,module,exports){
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

},{"./to_words.js":152}],152:[function(require,module,exports){
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

},{"./indices.js":150,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],153:[function(require,module,exports){
'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );


// VARIABLES //

var NUM_WARMUPS = 8;
var TABLE_SIZE = 32;


// MAIN //

/**
* Initializes a shuffle table.
*
* @private
* @param {Function} rand - pseudorandom number generator
* @returns {NumberArray} shuffle table
*/
function createTable( rand ) {
	var table;
	var v;
	var i;

	// "warm-up" the PRNG...
	for ( i = 0; i < NUM_WARMUPS; i++ ) {
		v = rand();
	}
	// Prevent the above loop from being discarded by the compiler...
	if ( isnan( v ) ) {
		throw new Error( 'unexpected error. PRNG returned `NaN`.' );
	}
	// Create the shuffle table...
	table = new Array( TABLE_SIZE );
	for ( i = TABLE_SIZE-1; i >= 0; i-- ) {
		table[ i ] = rand();
	}
	return table;
}


// EXPORTS //

module.exports = createTable;

},{"@stdlib/math/base/assert/is-nan":74}],154:[function(require,module,exports){
'use strict';

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isPositiveInteger = require( '@stdlib/assert/is-positive-integer' ).isPrimitive;
var floor = require( '@stdlib/math/base/special/floor' );
var INT32_MAX = require( '@stdlib/constants/math/int32-max' );
var minstd = require( '@stdlib/random/base/minstd' ).factory;
var createTable = require( './create_table.js' );


// VARIABLES //

var NORMALIZATION_CONSTANT = (INT32_MAX - 1)|0; // asm type annotation
var MAX_SEED = (INT32_MAX - 1)|0; // asm type annotation


// MAIN //

/**
* Returns a linear congruential pseudorandom number generator (LCG) whose output is shuffled.
*
* @param {PositiveInteger} [seed] - pseudorandom number generator seed
* @throws {TypeError} must provide a positive integer
* @throws {RangeError} must provide a positive integer less than the maximum signed 32-bit integer
* @returns {Function} shuffled LCG
*
* @example
* var minstd = factory();
*
* var v = minstd();
* // returns <number>
*
* @example
* // Return a seeded LCG:
* var minstd = factory( 1234 );
*
* var v = minstd();
* // returns 1421600654
*/
function factory( seed ) {
	var table;
	var state;
	var rand;
	if ( arguments.length ) {
		if ( !isPositiveInteger( seed ) ) {
			throw new TypeError( 'invalid input argument. Must provide a positive integer. Value: `' + seed + '`.' );
		}
		if ( seed > MAX_SEED ) {
			throw new RangeError( 'invalid input argument. Must provide a positive integer less than the maximum signed 32-bit integer. Value: `' + seed + '`.' );
		}
		rand = minstd( seed );
	} else {
		rand = minstd();
	}
	table = createTable( rand );
	state = table[ 0 ];

	setReadOnly( minstdShuffle, 'NAME', 'minstd-shuffle' );
	setReadOnly( minstdShuffle, 'SEED', rand.SEED );
	setReadOnly( minstdShuffle, 'MIN', 1 );
	setReadOnly( minstdShuffle, 'MAX', INT32_MAX-1 );
	setReadOnly( minstdShuffle, 'normalized', normalized );

	setReadOnly( normalized, 'NAME', minstdShuffle.NAME );
	setReadOnly( normalized, 'SEED', minstdShuffle.SEED );
	setReadOnly( normalized, 'MIN', (minstdShuffle.MIN-1) / NORMALIZATION_CONSTANT );
	setReadOnly( normalized, 'MAX', (minstdShuffle.MAX-1) / NORMALIZATION_CONSTANT );

	return minstdShuffle;

	/**
	* Generates a pseudorandom integer on the interval \\( [1,2^{31}-1) \\).
	*
	* @private
	* @returns {PositiveInteger} pseudorandom integer
	*
	* @example
	* var v = minstd();
	* // returns <number>
	*/
	function minstdShuffle() {
		var i = floor( table.length * (state/INT32_MAX) );

		// Pull a state from the table and replace:
		state = table[ i ];
		table[ i ] = rand();

		return state;
	}

	/**
	* Generates a pseudorandom number on the interval \\( [0,1) \\).
	*
	* @private
	* @returns {number} pseudorandom number
	*
	* @example
	* var v = normalized()
	* // returns <number>
	*/
	function normalized() {
		return (minstdShuffle()-1) / NORMALIZATION_CONSTANT;
	}
}


// EXPORTS //

module.exports = factory;

},{"./create_table.js":153,"@stdlib/assert/is-positive-integer":44,"@stdlib/constants/math/int32-max":66,"@stdlib/math/base/special/floor":95,"@stdlib/random/base/minstd":159,"@stdlib/utils/define-read-only-property":173}],155:[function(require,module,exports){
'use strict';

/**
* A linear congruential pseudorandom number generator (LCG) whose output is shuffled.
*
* @module @stdlib/random/base/minstd-shuffle
*
* @example
* var minstd = require( '@stdlib/random/base/minstd-shuffle' );
*
* var v = minstd();
* // returns <number>
*
* @example
* var factory = require( '@stdlib/random/base/minstd' ).factory;
*
* var minstd = factory( 1234 );
*
* var v = minstd();
* // returns 1421600654
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var minstd = require( './minstd_shuffled.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( minstd, 'factory', factory );


// EXPORTS //

module.exports = minstd;

},{"./factory.js":154,"./minstd_shuffled.js":156,"@stdlib/utils/define-read-only-property":173}],156:[function(require,module,exports){
'use strict';

// MODULES //

var factory = require( './factory.js' );
var randint32 = require( './rand_int32.js' );


// MAIN //

/**
* Generates a pseudorandom integer on the interval \\( [1,2^{31}-1) \\).
*
* ## Method
*
* This implementation shuffles the output of a linear congruential pseudorandom number generator (LCG) using a shuffle table in accordance with the Bays-Durham algorithm.
*
*
* ## References
*
* -   Bays, Carter, and S. D. Durham. 1976. "Improving a Poor Random Number Generator." _ACM Transactions on Mathematical Software_ 2 (1). New York, NY, USA: ACM: 59–64. doi:[10.1145/355666.355670](http://dx.doi.org/10.1145/355666.355670).
* -   Herzog, T.N., and G. Lord. 2002. _Applications of Monte Carlo Methods to Finance and Insurance_. ACTEX Publications. [https://books.google.com/books?id=vC7I\\\_gdX-A0C](https://books.google.com/books?id=vC7I\_gdX-A0C).
* -   Press, William H., Brian P. Flannery, Saul A. Teukolsky, and William T. Vetterling. 1992. _Numerical Recipes in C: The Art of Scientific Computing, Second Edition_. Cambridge University Press.
*
*
* @function minstd
* @type {Function}
* @returns {PositiveInteger} pseudorandom integer
*
* @example
* var v = minstd();
* // returns <number>
*/
var minstd = factory( randint32() );


// EXPORTS //

module.exports = minstd;

},{"./factory.js":154,"./rand_int32.js":157}],157:[function(require,module,exports){
'use strict';

// MODULES //

var INT32_MAX = require( '@stdlib/constants/math/int32-max' );
var floor = require( '@stdlib/math/base/special/floor' );


// VARIABLES //

var MAX = INT32_MAX - 1;


// MAIN //

/**
* Returns a pseudorandom integer on the interval \\([1, 2^{31}-1)\\).
*
* @private
* @returns {PositiveInteger} pseudorandom integer
*
* @example
* var v = randint();
* // returns <number>
*/
function randint32() {
	var v = floor( 1.0 + (MAX*Math.random()) );
	return v|0; // asm type annotation
}


// EXPORTS //

module.exports = randint32;

},{"@stdlib/constants/math/int32-max":66,"@stdlib/math/base/special/floor":95}],158:[function(require,module,exports){
'use strict';

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isPositiveInteger = require( '@stdlib/assert/is-positive-integer' ).isPrimitive;
var INT32_MAX = require( '@stdlib/constants/math/int32-max' );
var randint32 = require( './rand_int32.js' );


// VARIABLES //

var NORMALIZATION_CONSTANT = (INT32_MAX - 1)|0; // asm type annotation
var MAX_SEED = (INT32_MAX - 1)|0; // asm type annotation
var A = 16807|0; // asm type annotation


// MAIN //

/**
* Returns a linear congruential pseudorandom number generator (LCG) based on Park and Miller.
*
* @param {PositiveInteger} [seed] - pseudorandom number generator seed
* @throws {TypeError} must provide a positive integer
* @throws {RangeError} must provide a positive integer less than the maximum signed 32-bit integer
* @returns {Function} LCG
*
* @example
* var minstd = factory();
*
* var v = minstd();
* // returns <number>
*
* @example
* // Return a seeded LCG:
* var minstd = factory( 1234 );
*
* var v = minstd();
* // returns 20739838
*/
function factory( seed ) {
	var state;
	if ( arguments.length ) {
		if ( !isPositiveInteger( seed ) ) {
			throw new TypeError( 'invalid input argument. Must provide a positive integer. Value: `' + seed + '`.' );
		}
		if ( seed > MAX_SEED ) {
			throw new RangeError( 'invalid input argument. Must provide a positive integer less than the maximum signed 32-bit integer. Value: `' + seed + '`.' );
		}
		state = seed|0; // asm type annotation
	} else {
		state = randint32()|0; // asm type annotation
	}
	setReadOnly( minstd, 'NAME', 'minstd' );
	setReadOnly( minstd, 'SEED', state );
	setReadOnly( minstd, 'MIN', 1 );
	setReadOnly( minstd, 'MAX', INT32_MAX-1 );
	setReadOnly( minstd, 'normalized', normalized );

	setReadOnly( normalized, 'NAME', minstd.NAME );
	setReadOnly( normalized, 'SEED', minstd.SEED );
	setReadOnly( normalized, 'MIN', (minstd.MIN-1.0) / NORMALIZATION_CONSTANT );
	setReadOnly( normalized, 'MAX', (minstd.MAX-1.0) / NORMALIZATION_CONSTANT );

	return minstd;

	/**
	* Generates a pseudorandom integer on the interval \\( [1,2^{31}-1) \\).
	*
	* @private
	* @returns {PositiveInteger} pseudorandom integer
	*
	* @example
	* var v = minstd();
	* // returns <number>
	*/
	function minstd() {
		state = ( (A*state)%INT32_MAX )|0; // asm type annotation
		return state;
	}

	/**
	* Generates a pseudorandom number on the interval \\( [0,1) \\).
	*
	* @private
	* @returns {number} pseudorandom number
	*
	* @example
	* var v = normalized()
	* // returns <number>
	*/
	function normalized() {
		return (minstd()-1) / NORMALIZATION_CONSTANT;
	}
}


// EXPORTS //

module.exports = factory;

},{"./rand_int32.js":161,"@stdlib/assert/is-positive-integer":44,"@stdlib/constants/math/int32-max":66,"@stdlib/utils/define-read-only-property":173}],159:[function(require,module,exports){
'use strict';

/**
* A linear congruential pseudorandom number generator (LCG) based on Park and Miller.
*
* @module @stdlib/random/base/minstd
*
* @example
* var minstd = require( '@stdlib/random/base/minstd' );
*
* var v = minstd();
* // returns <number>
*
* @example
* var factory = require( '@stdlib/random/base/minstd' ).factory;
*
* var minstd = factory( 1234 );
*
* var v = minstd();
* // returns 20739838
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var minstd = require( './minstd.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( minstd, 'factory', factory );


// EXPORTS //

module.exports = minstd;

},{"./factory.js":158,"./minstd.js":160,"@stdlib/utils/define-read-only-property":173}],160:[function(require,module,exports){
'use strict';

// MODULES //

var factory = require( './factory.js' );
var randint32 = require( './rand_int32.js' );


// MAIN //

/**
* Generates a pseudorandom integer on the interval \\( [1,2^{31}-1) \\).
*
* ## Method
*
* Linear congruential generators (LCGs) use the recurrence relation
*
* ```tex
* X_{n+1} = ( a \cdot X_n + c ) \operatorname{mod}(m)
* ```
*
* where the modulus \\( m \\) is a prime number or power of a prime number and \\( a \\) is a primitive root modulo \\( m \\).
*
* <!-- <note> -->
*
* For an LCG to be a Lehmer RNG, the seed \\( X_0 \\) must be coprime to \\( m \\).
*
* <!-- </note> -->
*
* In this implementation, the constants \\( a \\), \\( c \\), and \\( m \\) have the values
*
* ```tex
* \begin{align*}
* a &= 7^5 = 16807 \\
* c &= 0 \\
* m &= 2^{31} - 1 = 2147483647
* \end{align*}
* ```
*
* <!-- <note> -->
*
* The constant \\( m \\) is a Mersenne prime (modulo \\(31\\)).
*
* <!-- </note> -->
*
* <!-- <note> -->
*
* The constant \\( a \\) is a primitive root (modulo \\(31\\)).
*
* <!-- </note> -->
*
* Accordingly, the maximum possible product is
*
* ```tex
* 16807 \cdot (m - 1) \approx 2^{46}
* ```
*
* The values for \\( a \\), \\( c \\), and \\( m \\) are taken from Park and Miller, "Random Number Generators: Good Ones Are Hard To Find". Park's and Miller's article is also the basis for a recipe in the second edition of _Numerical Recipes in C_.
*
*
* ## Notes
*
* -   The generator has a period of approximately \\(2.1\mbox{e}9\\) (see [Numerical Recipes in C, 2nd Edition](#references), p. 279).
*
*
* ## References
*
* -   Park, S. K., and K. W. Miller. 1988. "Random Number Generators: Good Ones Are Hard to Find." _Communications of the ACM_ 31 (10). New York, NY, USA: ACM: 1192–1201. doi:[10.1145/63039.63042](http://dx.doi.org/10.1145/63039.63042).
* -   Press, William H., Brian P. Flannery, Saul A. Teukolsky, and William T. Vetterling. 1992. _Numerical Recipes in C: The Art of Scientific Computing, Second Edition_. Cambridge University Press.
*
*
* @function minstd
* @type {Function}
* @returns {PositiveInteger} pseudorandom integer
*
* @example
* var v = minstd();
* // returns <number>
*/
var minstd = factory( randint32() );


// EXPORTS //

module.exports = minstd;

},{"./factory.js":158,"./rand_int32.js":161}],161:[function(require,module,exports){
arguments[4][157][0].apply(exports,arguments)
},{"@stdlib/constants/math/int32-max":66,"@stdlib/math/base/special/floor":95,"dup":157}],162:[function(require,module,exports){
module.exports={
	"name": "minstd-shuffle"
}

},{}],163:[function(require,module,exports){
'use strict';

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isObject = require( '@stdlib/assert/is-plain-object' );
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var defaults = require( './defaults.json' );
var PRNGS = require( './prngs.js' );


// MAIN //

/**
* Returns a pseudorandom number generator for generating uniformly distributed random numbers on the interval \\( [0,1) \\).
*
* @param {Options} opts - function options
* @param {string} [opts.name='minstd-shuffle'] - name of pseudorandom number generator
* @param {*} [opts.seed] - pseudorandom number generator seed
* @throws {TypeError} must provide an object
* @throws {Error} must provide the name of a supported pseudorandom number generator
* @returns {Function} pseudorandom number generator
*
* @example
* var uniform = factory();
* var v = uniform();
* // returns <number>
*
* @example
* var uniform = factory({
*     'name': 'minstd'
* });
* var v = uniform();
* // returns <number>
*
* @example
* var uniform = factory({
*     'seed': 12345
* });
* var v = uniform();
* // returns <number>
*
* @example
* var uniform = factory({
*     'name': 'minstd',
*     'seed': 12345
* });
* var v = uniform();
* // returns <number>
*/
function factory( opts ) {
	var rand;
	var name;
	var prng;
	var seed;
	if ( arguments.length ) {
		if ( !isObject( opts ) ) {
			throw new TypeError( 'invalid input argument. Must provide an object. Value: `' + opts + '`.' );
		}
		if ( hasOwnProp( opts, 'name' ) ) {
			name = opts.name;
		} else {
			name = defaults.name;
		}
		if ( hasOwnProp( opts, 'seed' ) ) {
			seed = opts.seed;
		}
	} else {
		name = defaults.name;
	}
	prng = PRNGS[ name ];
	if ( prng === void 0 ) {
		throw new Error( 'invalid option. Unrecognized/unsupported PRNG. Option: `' + name + '`.' );
	}
	if ( seed === void 0 ) {
		rand = prng.factory();
	} else {
		rand = prng.factory( seed );
	}
	setReadOnly( uniform, 'NAME', 'uniform' );
	setReadOnly( uniform, 'SEED', rand.normalized.SEED );
	setReadOnly( uniform, 'MIN', rand.normalized.MIN );
	setReadOnly( uniform, 'MAX', rand.normalized.MAX );
	setReadOnly( uniform, 'PRNG', rand );

	return uniform;

	/**
	* Returns a uniformly distributed pseudorandom number on the interval \\( [0,1) \\).
	*
	* @private
	* @returns {number} pseudorandom number
	*
	* @example
	* var v = uniform();
	* // returns <number>
	*/
	function uniform() {
		return rand.normalized();
	}
}


// EXPORTS //

module.exports = factory;

},{"./defaults.json":162,"./prngs.js":165,"@stdlib/assert/has-own-property":14,"@stdlib/assert/is-plain-object":41,"@stdlib/utils/define-read-only-property":173}],164:[function(require,module,exports){
'use strict';

/**
* Uniformly distributed pseudorandom numbers on the interval \\( [0,1) \\).
*
* @module @stdlib/random/base/randu
*
* @example
* var randu = require( '@stdlib/random/base/randu' );
*
* var v = randu();
* // returns <number>
*
* @example
* var factory = require( '@stdlib/random/base/randu' ).factory;
*
* var randu = factory({
*     'name': 'minstd',
*     'seed': 12345
* });
*
* var v = randu();
* // returns <number>
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var randu = require( './uniform.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( randu, 'factory', factory );


// EXPORTS //

module.exports = randu;

},{"./factory.js":163,"./uniform.js":166,"@stdlib/utils/define-read-only-property":173}],165:[function(require,module,exports){
'use strict';

// MAIN //

var prngs = {};

prngs[ 'minstd' ] = require( '@stdlib/random/base/minstd' );
prngs[ 'minstd-shuffle' ] = require( '@stdlib/random/base/minstd-shuffle' );


// EXPORTS //

module.exports = prngs;

},{"@stdlib/random/base/minstd":159,"@stdlib/random/base/minstd-shuffle":155}],166:[function(require,module,exports){
'use strict';

// MODULES //

var factory = require( './factory.js' );


// MAIN //

/**
* Returns a uniformly distributed random number on the interval \\( [0,1) \\).
*
* @name uniform
* @type {Function}
* @returns {number} pseudorandom number
*
* @example
* var v = uniform();
* // returns <number>
*/
var uniform = factory();


// EXPORTS //

module.exports = uniform;

},{"./factory.js":163}],167:[function(require,module,exports){
'use strict';

/**
* Regular expression to capture everything that is not a space immediately after the `function` keyword and before the first left parenthesis.
*
* @module @stdlib/regexp/function-name
* @type {RegExp}
*
* @example
* var RE_FUNCTION_NAME = require( '@stdlib/utils/regexp/function-name' );
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

},{}],168:[function(require,module,exports){
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

},{}],169:[function(require,module,exports){
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

},{"./constant_function.js":168}],170:[function(require,module,exports){
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
	var name;
	var ctor;
	name = nativeClass( v ).slice( 8, -1 );
	if ( (name === 'Object' || name === 'Error') && v.constructor ) {
		ctor = v.constructor;
		if ( typeof ctor.name === 'string' ) {
			return ctor.name;
		}
		return RE.exec( ctor.toString() )[ 1 ];
	}
	if ( isBuffer( v ) ) {
		return 'Buffer';
	}
	return name;
}


// EXPORTS //

module.exports = constructorName;

},{"@stdlib/assert/is-buffer":17,"@stdlib/regexp/function-name":167,"@stdlib/utils/native-class":196}],171:[function(require,module,exports){
'use strict';

/**
* Determines the name of a value's constructor.
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

var constructorName = require( './constructor_name.js' );


// EXPORTS //

module.exports = constructorName;

},{"./constructor_name.js":170}],172:[function(require,module,exports){
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

},{}],173:[function(require,module,exports){
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

},{"./define_read_only_property.js":172}],174:[function(require,module,exports){
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

},{"./float64array.js":175,"@stdlib/assert/is-float64array":19}],175:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Float64Array === 'function' ) ? Float64Array : null;

},{}],176:[function(require,module,exports){
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

},{"./detect_float64array_support.js":174}],177:[function(require,module,exports){
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

},{}],178:[function(require,module,exports){
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

},{"./detect_symbol_support.js":177}],179:[function(require,module,exports){
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

},{"@stdlib/utils/detect-symbol-support":178}],180:[function(require,module,exports){
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

},{"./has_tostringtag_support.js":179}],181:[function(require,module,exports){
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

},{"./uint16array.js":183,"@stdlib/assert/is-uint16array":47,"@stdlib/constants/math/uint16-max":67}],182:[function(require,module,exports){
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

},{"./detect_uint16array_support.js":181}],183:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint16Array === 'function' ) ? Uint16Array : null;

},{}],184:[function(require,module,exports){
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

},{"./uint32array.js":186,"@stdlib/assert/is-uint32array":49,"@stdlib/constants/math/uint32-max":68}],185:[function(require,module,exports){
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

},{"./detect_uint32array_support.js":184}],186:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint32Array === 'function' ) ? Uint32Array : null;

},{}],187:[function(require,module,exports){
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

},{"./uint8array.js":189,"@stdlib/assert/is-uint8array":51,"@stdlib/constants/math/uint8-max":69}],188:[function(require,module,exports){
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

},{"./detect_uint8array_support.js":187}],189:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint8Array === 'function' ) ? Uint8Array : null;

},{}],190:[function(require,module,exports){
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

},{"./native.js":193,"./polyfill.js":194,"@stdlib/assert/is-function":21}],191:[function(require,module,exports){
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

},{"./detect.js":190}],192:[function(require,module,exports){
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

},{"./get_prototype_of.js":191}],193:[function(require,module,exports){
'use strict';

// MAIN //

var getProto = Object.getPrototypeOf;


// EXPORTS //

module.exports = getProto;

},{}],194:[function(require,module,exports){
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

},{"./proto.js":195,"@stdlib/utils/native-class":196}],195:[function(require,module,exports){
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

},{}],196:[function(require,module,exports){
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

},{"./native_class.js":197,"./polyfill.js":198,"@stdlib/utils/detect-tostringtag-support":180}],197:[function(require,module,exports){
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

},{"./tostring.js":199}],198:[function(require,module,exports){
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

},{"./tostring.js":199,"./tostringtag.js":200,"@stdlib/assert/has-own-property":14}],199:[function(require,module,exports){
'use strict';

// MAIN //

var toStr = Object.prototype.toString;


// EXPORTS //

module.exports = toStr;

},{}],200:[function(require,module,exports){
'use strict';

// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{}],201:[function(require,module,exports){
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

},{"./fixtures/nodelist.js":202,"./fixtures/re.js":203,"./fixtures/typedarray.js":204}],202:[function(require,module,exports){
'use strict';

// MODULES //

var root = require( 'system.global' )(); // eslint-disable-line stdlib/no-redeclare


// MAIN //

var nodeList = root.document && root.document.childNodes;


// EXPORTS //

module.exports = nodeList;

},{"system.global":263}],203:[function(require,module,exports){
'use strict';

var RE = /./;


// EXPORTS //

module.exports = RE;

},{}],204:[function(require,module,exports){
'use strict';

var typedarray = Int8Array;


// EXPORTS //

module.exports = typedarray;

},{}],205:[function(require,module,exports){
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


// EXPORTS //

module.exports = ( usePolyfill() ) ? polyfill : typeOf;

},{"./check.js":201,"./polyfill.js":206,"./typeof.js":207}],206:[function(require,module,exports){
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

},{"@stdlib/utils/constructor-name":171}],207:[function(require,module,exports){
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

},{"@stdlib/utils/constructor-name":171}],208:[function(require,module,exports){
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

},{}],209:[function(require,module,exports){

},{}],210:[function(require,module,exports){
arguments[4][209][0].apply(exports,arguments)
},{"dup":209}],211:[function(require,module,exports){
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

},{}],212:[function(require,module,exports){
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

},{"base64-js":208,"ieee754":231}],213:[function(require,module,exports){
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
},{"../../is-buffer/index.js":233}],214:[function(require,module,exports){
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

},{"./lib/is_arguments.js":215,"./lib/keys.js":216}],215:[function(require,module,exports){
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

},{}],216:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],217:[function(require,module,exports){
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

},{"foreach":227,"object-keys":237}],218:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],219:[function(require,module,exports){
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

},{"./helpers/isFinite":220,"./helpers/isNaN":221,"./helpers/mod":222,"./helpers/sign":223,"es-to-primitive/es5":224,"has":230,"is-callable":234}],220:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],221:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],222:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],223:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],224:[function(require,module,exports){
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

},{"./helpers/isPrimitive":225,"is-callable":234}],225:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],226:[function(require,module,exports){
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

},{}],227:[function(require,module,exports){

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


},{}],228:[function(require,module,exports){
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

},{}],229:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":228}],230:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":229}],231:[function(require,module,exports){
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

},{}],232:[function(require,module,exports){
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

},{}],233:[function(require,module,exports){
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

},{}],234:[function(require,module,exports){
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

},{}],235:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],236:[function(require,module,exports){
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

},{}],237:[function(require,module,exports){
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

},{"./isArguments":238}],238:[function(require,module,exports){
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

},{}],239:[function(require,module,exports){
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
},{"_process":211}],240:[function(require,module,exports){
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
},{"_process":211}],241:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":242}],242:[function(require,module,exports){
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
},{"./_stream_readable":244,"./_stream_writable":246,"core-util-is":213,"inherits":232,"process-nextick-args":240}],243:[function(require,module,exports){
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
},{"./_stream_transform":245,"core-util-is":213,"inherits":232}],244:[function(require,module,exports){
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
},{"./_stream_duplex":242,"./internal/streams/BufferList":247,"./internal/streams/destroy":248,"./internal/streams/stream":249,"_process":211,"core-util-is":213,"events":226,"inherits":232,"isarray":235,"process-nextick-args":240,"safe-buffer":255,"string_decoder/":261,"util":209}],245:[function(require,module,exports){
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
},{"./_stream_duplex":242,"core-util-is":213,"inherits":232}],246:[function(require,module,exports){
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
},{"./_stream_duplex":242,"./internal/streams/destroy":248,"./internal/streams/stream":249,"_process":211,"core-util-is":213,"inherits":232,"process-nextick-args":240,"safe-buffer":255,"util-deprecate":272}],247:[function(require,module,exports){
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
},{"safe-buffer":255}],248:[function(require,module,exports){
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
},{"process-nextick-args":240}],249:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":226}],250:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":251}],251:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":242,"./lib/_stream_passthrough.js":243,"./lib/_stream_readable.js":244,"./lib/_stream_transform.js":245,"./lib/_stream_writable.js":246}],252:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":251}],253:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":246}],254:[function(require,module,exports){
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
},{"_process":211,"through":271}],255:[function(require,module,exports){
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

},{"buffer":212}],256:[function(require,module,exports){
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

},{"events":226,"inherits":232,"readable-stream/duplex.js":241,"readable-stream/passthrough.js":250,"readable-stream/readable.js":251,"readable-stream/transform.js":252,"readable-stream/writable.js":253}],257:[function(require,module,exports){
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

},{"es-abstract/es5":219,"function-bind":229}],258:[function(require,module,exports){
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

},{"./implementation":257,"./polyfill":259,"./shim":260,"define-properties":217,"function-bind":229}],259:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":257}],260:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":259,"define-properties":217}],261:[function(require,module,exports){
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
},{"safe-buffer":255}],262:[function(require,module,exports){
(function (global){
/* globals self, window, global */
/* eslint no-negated-condition: 0, no-new-func: 0 */

'use strict';

if (typeof self !== 'undefined') {
	module.exports = self;
} else if (typeof window !== 'undefined') {
	module.exports = window;
} else if (typeof global !== 'undefined') {
	module.exports = global;
} else {
	module.exports = Function('return this')();
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],263:[function(require,module,exports){
'use strict';

var defineProperties = require('define-properties');

var implementation = require('./implementation');
var getPolyfill = require('./polyfill');
var shim = require('./shim');

var polyfill = getPolyfill();

var getGlobal = function () { return polyfill; };

defineProperties(getGlobal, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = getGlobal;

},{"./implementation":262,"./polyfill":264,"./shim":265,"define-properties":217}],264:[function(require,module,exports){
(function (global){
'use strict';

var implementation = require('./implementation');

module.exports = function getPolyfill() {
	if (typeof global !== 'object' || !global || global.Math !== Math || global.Array !== Array) {
		return implementation;
	}
	return global;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./implementation":262}],265:[function(require,module,exports){
(function (global){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimGlobal() {
	var polyfill = getPolyfill();
	if (define.supportsDescriptors) {
		var descriptor = Object.getOwnPropertyDescriptor(polyfill, 'global');
		if (!descriptor || (descriptor.configurable && (descriptor.enumerable || descriptor.writable || global !== polyfill))) {
			Object.defineProperty(polyfill, 'global', {
				configurable: true,
				enumerable: false,
				value: polyfill,
				writable: false
			});
		}
	} else if (typeof global !== 'object' || global !== polyfill) {
		polyfill.global = polyfill;
	}
	return polyfill;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./polyfill":264,"define-properties":217}],266:[function(require,module,exports){
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
},{"./lib/default_stream":267,"./lib/results":269,"./lib/test":270,"_process":211,"defined":218,"through":271}],267:[function(require,module,exports){
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
},{"_process":211,"fs":210,"through":271}],268:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":211}],269:[function(require,module,exports){
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
},{"_process":211,"events":226,"function-bind":229,"has":230,"inherits":232,"object-inspect":236,"resumer":254,"through":271}],270:[function(require,module,exports){
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
},{"./next_tick":268,"deep-equal":214,"defined":218,"events":226,"has":230,"inherits":232,"path":239,"string.prototype.trim":258}],271:[function(require,module,exports){
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
},{"_process":211,"stream":256}],272:[function(require,module,exports){
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
},{}]},{},[80,81,82]);