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
} // end FUNCTION hasOwnProp()


// EXPORTS //

module.exports = hasOwnProp;

},{}],2:[function(require,module,exports){
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

},{"./has_own_property.js":1}],3:[function(require,module,exports){
'use strict';

/**
* Test if a value is an array-like object.
*
* @module @stdlib/assert/is-array-like-object
*
* @example
* var isArrayLikeObject = require( '@stdlib/assert/is-array-like-object' );
*
* var bool = isArrayLikeObject( [] );
* // returns true
*
* bool = isArrayLikeObject( { 'length':10 } );
* // returns true
*
* bool = isArrayLikeObject( 'beep' );
* // returns false
*/

// MODULES //

var isArrayLikeObject = require( './is_array_like_object.js' );


// EXPORTS //

module.exports = isArrayLikeObject;

},{"./is_array_like_object.js":4}],4:[function(require,module,exports){
'use strict';

// MODULES //

var isInteger = require( '@stdlib/math/base/assert/is-integer' );
var MAX_LENGTH = require( '@stdlib/math/constants/uint32-max' );


// MAIN //

/**
* Tests if a value is an array-like object.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is an array-like object
*
* @example
* var bool = isArrayLikeObject( [] );
* // returns true
*
* @example
* var bool = isArrayLikeObject( { 'length':10 } );
* // returns true
*
* @example
* var bool = isArrayLikeObject( 'beep' );
* // returns false
*/
function isArrayLikeObject( value ) {
	return (
		typeof value === 'object' &&
		value !== null &&
		typeof value.length === 'number' &&
		isInteger( value.length ) &&
		value.length >= 0 &&
		value.length <= MAX_LENGTH
	);
} // end FUNCTION isArrayLikeObject()


// EXPORTS //

module.exports = isArrayLikeObject;

},{"@stdlib/math/base/assert/is-integer":135,"@stdlib/math/constants/uint32-max":156}],5:[function(require,module,exports){
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

var isArrayLike = require( './is_array_like.js' );


// EXPORTS //

module.exports = isArrayLike;

},{"./is_array_like.js":6}],6:[function(require,module,exports){
'use strict';

// MODULES //

var isInteger = require( '@stdlib/math/base/assert/is-integer' );
var MAX_LENGTH = require( '@stdlib/math/constants/uint32-max' );


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
} // end FUNCTION isArrayLike()


// EXPORTS //

module.exports = isArrayLike;

},{"@stdlib/math/base/assert/is-integer":135,"@stdlib/math/constants/uint32-max":156}],7:[function(require,module,exports){
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

},{"./is_array.js":8}],8:[function(require,module,exports){
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
} // end FUNCTION isArray()


// EXPORTS //

module.exports = Array.isArray || isArray;

},{"@stdlib/utils/native-class":215}],9:[function(require,module,exports){
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
} // end FUNCTION isBoolean()


// EXPORTS //

module.exports = isBoolean;

},{"./object.js":11,"./primitive.js":12}],10:[function(require,module,exports){
'use strict';

/**
* Tests if a value is a boolean.
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

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isBoolean = require( './generic.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isBoolean, 'isPrimitive', isPrimitive );
setReadOnly( isBoolean, 'isObject', isObject );


// EXPORTS //

module.exports = isBoolean;

},{"./generic.js":9,"./object.js":11,"./primitive.js":12,"@stdlib/utils/define-read-only-property":194}],11:[function(require,module,exports){
'use strict';

// MODULES //

var hasToStringTag = require( '@stdlib/utils/detect-tostringtag-support' )();
var nativeClass = require( '@stdlib/utils/native-class' );
var test = require( './try2serialize.js' );


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
		if ( hasToStringTag ) {
			return test( value );
		}
		return ( nativeClass( value ) === '[object Boolean]' );
	}
	return false;
} // end FUNCTION isBoolean()


// EXPORTS //

module.exports = isBoolean;

},{"./try2serialize.js":14,"@stdlib/utils/detect-tostringtag-support":198,"@stdlib/utils/native-class":215}],12:[function(require,module,exports){
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
} // end FUNCTION isBoolean()


// EXPORTS //

module.exports = isBoolean;

},{}],13:[function(require,module,exports){
'use strict';

// eslint-disable-next-line no-redeclare
var toString = Boolean.prototype.toString; // non-generic


// EXPORTS //

module.exports = toString;

},{}],14:[function(require,module,exports){
'use strict';

// MODULES //

var toString = require( './tostring.js' ); // eslint-disable-line no-redeclare


// MAIN //

/**
* Attempts to serialize a value to a string.
*
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
} // end FUNCTION test()


// EXPORTS //

module.exports = test;

},{"./tostring.js":13}],15:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = true;

},{}],16:[function(require,module,exports){
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

},{"./is_buffer.js":17}],17:[function(require,module,exports){
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
} // end FUNCTION isBuffer()


// EXPORTS //

module.exports = isBuffer;

},{"@stdlib/assert/is-object-like":55}],18:[function(require,module,exports){
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

var isError = require( './is_error.js' );


// EXPORTS //

module.exports = isError;

},{"./is_error.js":19}],19:[function(require,module,exports){
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
} // end FUNCTION isError()


// EXPORTS //

module.exports = isError;

},{"@stdlib/utils/get-prototype-of":203,"@stdlib/utils/native-class":215}],20:[function(require,module,exports){
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

},{"./is_function.js":21}],21:[function(require,module,exports){
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
} // end FUNCTION isFunction()


// EXPORTS //

module.exports = isFunction;

},{"@stdlib/utils/type-of":232}],22:[function(require,module,exports){
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
} // end FUNCTION isInteger()


// EXPORTS //

module.exports = isInteger;

},{"./object.js":25,"./primitive.js":26}],23:[function(require,module,exports){
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

},{"./generic.js":22,"./object.js":25,"./primitive.js":26,"@stdlib/utils/define-read-only-property":194}],24:[function(require,module,exports){
'use strict';

// MODULES //

var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
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
} // end FUNCTION isInteger()


// EXPORTS //

module.exports = isInteger;

},{"@stdlib/math/base/assert/is-integer":135,"@stdlib/math/constants/float64-ninf":154,"@stdlib/math/constants/float64-pinf":155}],25:[function(require,module,exports){
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
} // end FUNCTION isInteger()


// EXPORTS //

module.exports = isInteger;

},{"./integer.js":24,"@stdlib/assert/is-number":50}],26:[function(require,module,exports){
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
} // end FUNCTION isInteger()


// EXPORTS //

module.exports = isInteger;

},{"./integer.js":24,"@stdlib/assert/is-number":50}],27:[function(require,module,exports){
'use strict';

var ctors = {
	'uint16': Uint16Array,
	'uint8': Uint8Array
};


// EXPORTS //

module.exports = ctors;

},{}],28:[function(require,module,exports){
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

},{"./is_little_endian.js":29}],29:[function(require,module,exports){
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

	// Set the uint16 view to a value having distinguishable lower and higher order words.
	// 4660 => 0x1234 => 0x12 0x34 => '00010010 00110100' => (0x12,0x34) == (18,52)
	uint16view[ 0 ] = 0x1234;

	// Create a uint8 view on top of the uint16 buffer:
	uint8view = new ctors[ 'uint8' ]( uint16view.buffer );

	// If little endian, the least significant byte will be first...
	return ( uint8view[ 0 ] === 0x34 );
} // end FUNCTION isLittleEndian()


// EXPORTS //

module.exports = isLittleEndian();

},{"./ctors.js":27}],30:[function(require,module,exports){
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
} // end FUNCTION isnan()


// EXPORTS //

module.exports = isnan;

},{"./object.js":32,"./primitive.js":33}],31:[function(require,module,exports){
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

},{"./generic.js":30,"./object.js":32,"./primitive.js":33,"@stdlib/utils/define-read-only-property":194}],32:[function(require,module,exports){
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
} // end FUNCTION isnan()


// EXPORTS //

module.exports = isnan;

},{"@stdlib/assert/is-number":50,"@stdlib/math/base/assert/is-nan":137}],33:[function(require,module,exports){
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
} // end FUNCTION isnan()


// EXPORTS //

module.exports = isnan;

},{"@stdlib/assert/is-number":50,"@stdlib/math/base/assert/is-nan":137}],34:[function(require,module,exports){
'use strict';

/**
* Test if a value is Node stream-like.
*
* @module @stdlib/assert/is-node-stream-like
*
* @example
* var transformStream = require( '@stdlib/streams/utils/transform' );
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

var isNodeStreamLike = require( './is_stream_like.js' );


// EXPORTS //

module.exports = isNodeStreamLike;

},{"./is_stream_like.js":35}],35:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Tests if a value is Node stream-like.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is Node stream-like
*
* @example
* var transformStream = require( '@stdlib/streams/utils/transform' );
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
} // end FUNCTION isNodeStreamLike()


// EXPORTS //

module.exports = isNodeStreamLike;

},{}],36:[function(require,module,exports){
'use strict';

/**
* Test if a value is Node writable stream-like.
*
* @module @stdlib/assert/is-node-writable-stream-like
*
* @example
* var transformStream = require( '@stdlib/streams/utils/transform' );
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

var isNodeWritableStreamLike = require( './is_writable_stream_like.js' );


// EXPORTS //

module.exports = isNodeWritableStreamLike;

},{"./is_writable_stream_like.js":37}],37:[function(require,module,exports){
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
* var transformStream = require( '@stdlib/streams/utils/transform' );
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
} // end FUNCTION isNodeWritableStreamLike()


// EXPORTS //

module.exports = isNodeWritableStreamLike;

},{"@stdlib/assert/is-node-stream-like":34}],38:[function(require,module,exports){
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
* // Use interface to check for primitives...
* var isNonNegativeIntegerArray = require( '@stdlib/assert/is-nonnegative-integer-array' ).primitives;
*
* var bool = isNonNegativeIntegerArray( [ 1.0, 0.0, 10.0 ] );
* // returns true
*
* bool = isNonNegativeIntegerArray( [ 3.0, new Number(1.0) ] );
* // returns false
*
* @example
* // Use interface to check for objects...
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
var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var arrayfun = require( '@stdlib/assert/tools/array-like-function' );


// MAIN //

var isNonNegativeIntegerArray = arrayfun( isNonNegativeInteger );
setReadOnly( isNonNegativeIntegerArray, 'primitives', arrayfun( isNonNegativeInteger.isPrimitive ) );
setReadOnly( isNonNegativeIntegerArray, 'objects', arrayfun( isNonNegativeInteger.isObject ) );


// EXPORTS //

module.exports = isNonNegativeIntegerArray;

},{"@stdlib/assert/is-nonnegative-integer":40,"@stdlib/assert/tools/array-like-function":79,"@stdlib/utils/define-read-only-property":194}],39:[function(require,module,exports){
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
} // end FUNCTION isNonNegativeInteger()


// EXPORTS //

module.exports = isNonNegativeInteger;

},{"./object.js":41,"./primitive.js":42}],40:[function(require,module,exports){
'use strict';

/**
* Tests if a value is a nonnegative integer.
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
* // Use interface to check for nonnegative integer primitives...
* var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;
*
* var bool = isNonNegativeInteger( 3.0 );
* // returns true
*
* bool = isNonNegativeInteger( new Number( 3.0 ) );
* // returns false
*
* @example
* // Use interface to check for nonnegative integer objects...
* var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isObject;
*
* var bool = isNonNegativeInteger( 3.0 );
* // returns false
*
* bool = isNonNegativeInteger( new Number( 3.0 ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isNonNegativeInteger = require( './generic.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isNonNegativeInteger, 'isPrimitive', isPrimitive );
setReadOnly( isNonNegativeInteger, 'isObject', isObject );


// EXPORTS //

module.exports = isNonNegativeInteger;

},{"./generic.js":39,"./object.js":41,"./primitive.js":42,"@stdlib/utils/define-read-only-property":194}],41:[function(require,module,exports){
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
} // end FUNCTION isNonNegativeInteger()


// EXPORTS //

module.exports = isNonNegativeInteger;

},{"@stdlib/assert/is-integer":23}],42:[function(require,module,exports){
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
} // end FUNCTION isNonNegativeInteger()


// EXPORTS //

module.exports = isNonNegativeInteger;

},{"@stdlib/assert/is-integer":23}],43:[function(require,module,exports){
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
} // end FUNCTION isNonNegativeNumber()


// EXPORTS //

module.exports = isNonNegativeNumber;

},{"./object.js":45,"./primitive.js":46}],44:[function(require,module,exports){
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
* // Use interface to check for nonnegative number primitives...
* var isNonNegativeNumber = require( '@stdlib/assert/is-nonnegative-number' ).isPrimitive;
*
* var bool = isNonNegativeNumber( 3.0 );
* // returns true
*
* bool = isNonNegativeNumber( new Number( 3.0 ) );
* // returns false
*
* @example
* // Use interface to check for nonnegative number objects...
* var isNonNegativeNumber = require( '@stdlib/assert/is-nonnegative-number' ).isObject;
*
* var bool = isNonNegativeNumber( 3.0 );
* // returns false
*
* bool = isNonNegativeNumber( new Number( 3.0 ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isNonNegativeNumber = require( './generic.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isNonNegativeNumber, 'isPrimitive', isPrimitive );
setReadOnly( isNonNegativeNumber, 'isObject', isObject );


// EXPORTS //

module.exports = isNonNegativeNumber;

},{"./generic.js":43,"./object.js":45,"./primitive.js":46,"@stdlib/utils/define-read-only-property":194}],45:[function(require,module,exports){
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
} // end FUNCTION isNonNegativeNumber()


// EXPORTS //

module.exports = isNonNegativeNumber;

},{"@stdlib/assert/is-number":50}],46:[function(require,module,exports){
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
} // end FUNCTION isNonNegativeNumber()


// EXPORTS //

module.exports = isNonNegativeNumber;

},{"@stdlib/assert/is-number":50}],47:[function(require,module,exports){
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

var isNull = require( './is_null.js' );


// EXPORTS //

module.exports = isNull;

},{"./is_null.js":48}],48:[function(require,module,exports){
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
} // end FUNCTION isNull()


// EXPORTS //

module.exports = isNull;

},{}],49:[function(require,module,exports){
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
} // end FUNCTION isNumber()


// EXPORTS //

module.exports = isNumber;

},{"./object.js":51,"./primitive.js":52}],50:[function(require,module,exports){
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

},{"./generic.js":49,"./object.js":51,"./primitive.js":52,"@stdlib/utils/define-read-only-property":194}],51:[function(require,module,exports){
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
} // end FUNCTION isNumber()


// EXPORTS //

module.exports = isNumber;

},{"./try2serialize.js":54,"@stdlib/utils/detect-tostringtag-support":198,"@stdlib/utils/native-class":215}],52:[function(require,module,exports){
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
} // end FUNCTION isNumber()


// EXPORTS //

module.exports = isNumber;

},{}],53:[function(require,module,exports){
'use strict';

// eslint-disable-next-line no-redeclare
var toString = Number.prototype.toString; // non-generic


// EXPORTS //

module.exports = toString;

},{}],54:[function(require,module,exports){
'use strict';

// MODULES //

var toString = require( './tostring.js' ); // eslint-disable-line no-redeclare


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
} // end FUNCTION test()


// EXPORTS //

module.exports = test;

},{"./tostring.js":53}],55:[function(require,module,exports){
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

},{"./is_object_like.js":56,"@stdlib/assert/tools/array-function":77,"@stdlib/utils/define-read-only-property":194}],56:[function(require,module,exports){
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
} // end FUNCTION isObjectLike()


// EXPORTS //

module.exports = isObjectLike;

},{}],57:[function(require,module,exports){
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

},{"./is_object.js":58}],58:[function(require,module,exports){
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
} // end FUNCTION isObject()


// EXPORTS //

module.exports = isObject;

},{"@stdlib/assert/is-array":7}],59:[function(require,module,exports){
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

},{"./is_plain_object.js":60}],60:[function(require,module,exports){
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
} // end FUNCTION ownProps()


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
} // end FUNCTION isPlainObject()


// EXPORTS //

module.exports = isPlainObject;

},{"@stdlib/assert/has-own-property":2,"@stdlib/assert/is-function":20,"@stdlib/assert/is-object":57,"@stdlib/utils/get-prototype-of":203,"@stdlib/utils/native-class":215}],61:[function(require,module,exports){
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
} // end FUNCTION isPositiveInteger()


// EXPORTS //

module.exports = isPositiveInteger;

},{"./object.js":63,"./primitive.js":64}],62:[function(require,module,exports){
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

},{"./generic.js":61,"./object.js":63,"./primitive.js":64,"@stdlib/utils/define-read-only-property":194}],63:[function(require,module,exports){
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
} // end FUNCTION isPositiveInteger()


// EXPORTS //

module.exports = isPositiveInteger;

},{"@stdlib/assert/is-integer":23}],64:[function(require,module,exports){
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
} // end FUNCTION isPositiveInteger()


// EXPORTS //

module.exports = isPositiveInteger;

},{"@stdlib/assert/is-integer":23}],65:[function(require,module,exports){
'use strict';

var exec = RegExp.prototype.exec; // non-generic


// EXPORTS //

module.exports = exec;

},{}],66:[function(require,module,exports){
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

var isRegExp = require( './is_regexp.js' );


// EXPORTS //

module.exports = isRegExp;

},{"./is_regexp.js":67}],67:[function(require,module,exports){
'use strict';

// MODULES //

var hasToStringTag = require( '@stdlib/utils/detect-tostringtag-support' )();
var nativeClass = require( '@stdlib/utils/native-class' );
var test = require( './try2exec.js' );


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
		if ( hasToStringTag ) {
			return test( value );
		}
		return ( nativeClass( value ) === '[object RegExp]' );
	}
	return false;
} // end FUNCTION isRegExp()


// EXPORTS //

module.exports = isRegExp;

},{"./try2exec.js":68,"@stdlib/utils/detect-tostringtag-support":198,"@stdlib/utils/native-class":215}],68:[function(require,module,exports){
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
} // end FUNCTION test()


// EXPORTS //

module.exports = test;

},{"./exec.js":65}],69:[function(require,module,exports){
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
* // Use interface to check for primitives...
* var isStringArray = require( '@stdlib/assert/is-string-array' ).primitives;
*
* var bool = isStringArray( [ 'abc', 'def' ] );
* // returns true
*
* bool = isStringArray( [ 'abc', new String( 'def' ) ] );
* // returns false
*
* @example
* // Use interface to check for objects...
* var isStringArray = require( '@stdlib/assert/is-string-array' ).objects;
*
* var bool = isStringArray( [ new String( 'abc' ), new String( 'def' ) ] );
* // returns true
*
* bool = isStringArray( [ new String( 'abc' ), 'def' ] );
* // returns false
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var arrayfun = require( '@stdlib/assert/tools/array-function' );
var isString = require( '@stdlib/assert/is-string' );


// MAIN //

var isStringArray = arrayfun( isString );
setReadOnly( isStringArray, 'primitives', arrayfun( isString.isPrimitive ) );
setReadOnly( isStringArray, 'objects', arrayfun( isString.isObject ) );


// EXPORTS //

module.exports = isStringArray;

},{"@stdlib/assert/is-string":71,"@stdlib/assert/tools/array-function":77,"@stdlib/utils/define-read-only-property":194}],70:[function(require,module,exports){
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
} // end FUNCTION isString()


// EXPORTS //

module.exports = isString;

},{"./object.js":72,"./primitive.js":73}],71:[function(require,module,exports){
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

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isString = require( './generic.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isString, 'isPrimitive', isPrimitive );
setReadOnly( isString, 'isObject', isObject );


// EXPORTS //

module.exports = isString;

},{"./generic.js":70,"./object.js":72,"./primitive.js":73,"@stdlib/utils/define-read-only-property":194}],72:[function(require,module,exports){
'use strict';

// MODULES //

var hasToStringTag = require( '@stdlib/utils/detect-tostringtag-support' )();
var nativeClass = require( '@stdlib/utils/native-class' );
var test = require( './try2valueof.js' );


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
		if ( hasToStringTag ) {
			return test( value );
		}
		return ( nativeClass( value ) === '[object String]' );
	}
	return false;
} // end FUNCTION isString()


// EXPORTS //

module.exports = isString;

},{"./try2valueof.js":74,"@stdlib/utils/detect-tostringtag-support":198,"@stdlib/utils/native-class":215}],73:[function(require,module,exports){
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
} // end FUNCTION isString()


// EXPORTS //

module.exports = isString;

},{}],74:[function(require,module,exports){
'use strict';

// MODULES //

var valueOf = require( './valueof.js' ); // eslint-disable-line no-redeclare


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
} // end FUNCTION test()


// EXPORTS //

module.exports = test;

},{"./valueof.js":75}],75:[function(require,module,exports){
'use strict';

// eslint-disable-next-line no-redeclare
var valueOf = String.prototype.valueOf; // non-generic


// EXPORTS //

module.exports = valueOf;

},{}],76:[function(require,module,exports){
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
	} // end FUNCTION every()
} // end FUNCTION arrayfcn()


// EXPORTS //

module.exports = arrayfcn;

},{"@stdlib/assert/is-array":7}],77:[function(require,module,exports){
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

},{"./arrayfcn.js":76}],78:[function(require,module,exports){
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
		throw new TypeError( 'invalid input argument. Must provide a function. Value: `' + predicate + '`.' );
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
	} // end FUNCTION every()
} // end FUNCTION arraylikefcn()


// EXPORTS //

module.exports = arraylikefcn;

},{"@stdlib/assert/is-array-like":5}],79:[function(require,module,exports){
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

},{"./arraylikefcn.js":78}],80:[function(require,module,exports){
'use strict';

// MODULES //

var TransformStream = require( '@stdlib/streams/utils/transform' );
var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
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
} // end FUNCTION done()

/**
* Creates a results stream.
*
* @memberof bench
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
} // end FUNCTION createStream()

/**
* Adds a listener for when a harness finishes running all benchmarks.
*
* @memberof bench
* @param {Callback} clbk - listener
* @throws {TypeError} must provide a function
* @throws {Error} must provide a listener only once
* @returns {void}
*/
function onFinish( clbk ) {
	var i;
	if ( !isFunction( clbk ) ) {
		throw new TypeError( 'invalid input argument. Must provide a function. Value: `'+clbk+'`.' );
	}
	// Allow adding a listener only once...
	for ( i = 0; i < listeners.length; i++ ) {
		if ( clbk === listeners[ i ] ) {
			throw new Error( 'invalid input argument. Attempted to add duplicate listener.' );
		}
	}
	listeners.push( clbk );
} // end FUNCTION onFinish()


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
} // end FUNCTION bench()


// EXPORTS //

module.exports = bench;

setReadOnly( bench, 'createHarness', createHarness );
setReadOnly( bench, 'createStream', createStream );
setReadOnly( bench, 'onFinish', onFinish );

},{"./get_harness.js":102,"./harness":103,"@stdlib/assert/is-function":20,"@stdlib/streams/utils/transform":165,"@stdlib/utils/define-read-only-property":194}],81:[function(require,module,exports){
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
	/* eslint-disable no-invalid-this */
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
} // end FUNCTION assert()


// EXPORTS //

module.exports = assert;

},{"@stdlib/assert/has-own-property":2}],82:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = clearTimeout;

},{}],83:[function(require,module,exports){
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
} // end FUNCTION comment()


// EXPORTS //

module.exports = comment;

},{"@stdlib/regexp/eol":157,"@stdlib/string/replace":175,"@stdlib/string/trim":179}],84:[function(require,module,exports){
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
} // end FUNCTION deepEqual()


// EXPORTS //

module.exports = deepEqual;

},{}],85:[function(require,module,exports){
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
	} // end FUNCTION onTick()
} // end FUNCTION end()


// EXPORTS //

module.exports = end;

},{"./../utils/next_tick.js":122}],86:[function(require,module,exports){
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
} // end FUNCTION ended()


// EXPORTS //

module.exports = ended;

},{}],87:[function(require,module,exports){
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
} // end FUNCTION equal()


// EXPORTS //

module.exports = equal;

},{}],88:[function(require,module,exports){
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
} // end FUNCTION exit()


// EXPORTS //

module.exports = exit;

},{}],89:[function(require,module,exports){
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
} // end FUNCTION fail()


// EXPORTS //

module.exports = fail;

},{}],90:[function(require,module,exports){
'use strict';

// MODULES //

var EventEmitter = require( 'events' ).EventEmitter;
var inherit = require( '@stdlib/utils/inherit' );
var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
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
	Object.defineProperty( this, '_benchmark', {
		'value': benchmark, // this may be `undefined`
		'configurable': false,
		'writable': false,
		'enumerable': false
	});

	Object.defineProperty( this, '_skip', {
		'value': opts.skip,
		'configurable': false,
		'writable': false,
		'enumerable': false
	});

	Object.defineProperty( this, '_ended', {
		'value': false,
		'configurable': false,
		'writable': true,
		'enumerable': false
	});

	Object.defineProperty( this, '_running', {
		'value': false,
		'configurable': false,
		'writable': true,
		'enumerable': false
	});

	Object.defineProperty( this, '_exited', {
		'value': false,
		'configurable': false,
		'writable': true,
		'enumerable': false
	});

	Object.defineProperty( this, '_count', {
		'value': 0,
		'configurable': false,
		'writable': true,
		'enumerable': false
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
	* * Using a scoped variable prevents nefarious mutation by bad actors hoping to manipulate benchmark results.
	* * The one attack vector which remains is manipulation of the `require` cache for `tic` and `toc`.
	* * One way to combat cache manipulation is by comparing the checksum of `Function#toString()` against known values.
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
	} // end FUNCTION start()

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
	} // end FUNCTION stop()
} // end FUNCTION Benchmark()

/*
* Inherit from the `EventEmitter` prototype.
*/
inherit( Benchmark, EventEmitter );

/**
* Runs a benchmark.
*
* @private
* @memberof Benchmark.prototype
* @function run
*/
Object.defineProperty( Benchmark.prototype, 'run', {
	'value': require( './run.js' ),
	'configurable': false,
	'writable': false,
	'enumerable': false
});

/**
* Forcefully ends a benchmark.
*
* @private
* @memberof Benchmark.prototype
* @function exit
*/
Object.defineProperty( Benchmark.prototype, 'exit', {
	'value': require( './exit.js' ),
	'configurable': false,
	'writable': false,
	'enumerable': false
});

/**
* Returns a `boolean` indicating if a benchmark has ended.
*
* @private
* @memberof Benchmark.prototype
* @function ended
* @returns {boolean} boolean indicating if a benchmark has ended
*/
Object.defineProperty( Benchmark.prototype, 'ended', {
	'value': require( './ended.js' ),
	'configurable': false,
	'writable': false,
	'enumerable': false
});

/**
* Generates an assertion.
*
* @private
* @memberof Benchmark.prototype
* @function _assert
* @param {boolean} ok - assertion outcome
* @param {Options} opts - options
*/
Object.defineProperty( Benchmark.prototype, '_assert', {
	'value': require( './assert.js' ),
	'configurable': false,
	'writable': false,
	'enumerable': false
});

/**
* Writes a comment.
*
* @memberof Benchmark.prototype
* @function comment
* @param {string} msg - comment message
*/
setReadOnly( Benchmark.prototype, 'comment', require( './comment.js' ) );

/**
* Generates an assertion which will be skipped.
*
* @memberof Benchmark.prototype
* @function skip
* @param {*} value - value
* @param {string} msg - message
*/
setReadOnly( Benchmark.prototype, 'skip', require( './skip.js' ) );

/**
* Generates an assertion which should be implemented.
*
* @memberof Benchmark.prototype
* @function todo
* @param {*} value - value
* @param {string} msg - message
*/
setReadOnly( Benchmark.prototype, 'todo', require( './todo.js' ) );

/**
* Generates a failing assertion.
*
* @memberof Benchmark.prototype
* @function fail
* @param {string} msg - message
*/
setReadOnly( Benchmark.prototype, 'fail', require( './fail.js' ) );

/**
* Generates a passing assertion.
*
* @memberof Benchmark.prototype
* @function pass
* @param {string} msg - message
*/
setReadOnly( Benchmark.prototype, 'pass', require( './pass.js' ) );

/**
* Asserts that a `value` is truthy.
*
* @memberof Benchmark.prototype
* @function ok
* @param {*} value - value
* @param {string} [msg] - message
*/
setReadOnly( Benchmark.prototype, 'ok', require( './ok.js' ) );

/**
* Asserts that a `value` is falsy.
*
* @memberof Benchmark.prototype
* @function notOk
* @param {*} value - value
* @param {string} [msg] - message
*/
setReadOnly( Benchmark.prototype, 'notOk', require( './not_ok.js' ) );

/**
* Asserts that `actual` is strictly equal to `expected`.
*
* @memberof Benchmark.prototype
* @function equal
* @param {*} actual - actual value
* @param {*} expected - expected value
* @param {string} [msg] - message
*/
setReadOnly( Benchmark.prototype, 'equal', require( './equal.js' ) );

/**
* Asserts that `actual` is not strictly equal to `expected`.
*
* @memberof Benchmark.prototype
* @function notEqual
* @param {*} actual - actual value
* @param {*} expected - expected value
* @param {string} [msg] - message
*/
setReadOnly( Benchmark.prototype, 'notEqual', require( './not_equal.js' ) );

/**
* Asserts that `actual` is deeply equal to `expected`.
*
* @memberof Benchmark.prototype
* @function deepEqual
* @param {*} actual - actual value
* @param {*} expected - expected value
* @param {string} [msg] message
*/
setReadOnly( Benchmark.prototype, 'deepEqual', require( './deep_equal.js' ) );

/**
* Asserts that `actual` is not deeply equal to `expected`.
*
* @memberof Benchmark.prototype
* @function notDeepEqual
* @param {*} actual - actual value
* @param {*} expected - expected value
* @param {string} [msg] message
*/
setReadOnly( Benchmark.prototype, 'notDeepEqual', require( './not_deep_equal.js' ) );

/**
* Ends a benchmark.
*
* @memberof Benchmark.prototype
* @function end
*/
setReadOnly( Benchmark.prototype, 'end', require( './end.js' ) );


// EXPORTS //

module.exports = Benchmark;

},{"./assert.js":81,"./comment.js":83,"./deep_equal.js":84,"./end.js":85,"./ended.js":86,"./equal.js":87,"./exit.js":88,"./fail.js":89,"./not_deep_equal.js":91,"./not_equal.js":92,"./not_ok.js":93,"./ok.js":94,"./pass.js":95,"./run.js":96,"./skip.js":98,"./todo.js":99,"@stdlib/time/tic":181,"@stdlib/time/toc":185,"@stdlib/utils/define-read-only-property":194,"@stdlib/utils/inherit":210,"events":244}],91:[function(require,module,exports){
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
} // end FUNCTION notDeepEqual()


// EXPORTS //

module.exports = notDeepEqual;

},{}],92:[function(require,module,exports){
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
} // end FUNCTION notEqual()


// EXPORTS //

module.exports = notEqual;

},{}],93:[function(require,module,exports){
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
} // end FUNCTION notOk()


// EXPORTS //

module.exports = notOk;

},{}],94:[function(require,module,exports){
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
} // end FUNCTION ok()


// EXPORTS //

module.exports = ok;

},{}],95:[function(require,module,exports){
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
} // end FUNCTION pass()


// EXPORTS //

module.exports = pass;

},{}],96:[function(require,module,exports){
/* eslint-disable no-underscore-dangle */
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
	} // end FUNCTION onTimeout()

	/**
	* Clears a timeout.
	*
	* @private
	*/
	function endTimeout() {
		clear( id );
	} // end FUNCTION endTimeout()
} // end FUNCTION run()


// EXPORTS //

module.exports = run;

},{"./clear_timeout.js":82,"./set_timeout.js":97}],97:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = setTimeout;

},{}],98:[function(require,module,exports){
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
} // end FUNCTION skip()


// EXPORTS //

module.exports = skip;

},{}],99:[function(require,module,exports){
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
} // end FUNCTION todo()


// EXPORTS //

module.exports = todo;

},{}],100:[function(require,module,exports){
module.exports={
	"skip": false,
	"iterations": null,
	"repeats": 3,
	"timeout": 300000
}

},{}],101:[function(require,module,exports){
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
			throw new TypeError( 'invalid input argument. Must provide either an options object or a callback function. Value: `'+arguments[ 0 ]+'`.' );
		}
	} else {
		options = arguments[ 0 ];
		if ( !isObject( options ) ) {
			throw new TypeError( 'invalid input argument. First argument must be an object. Value: `'+options+'`.' );
		}
		clbk = arguments[ 1 ];
		if ( !isFunction( clbk ) ) {
			throw new TypeError( 'invalid input argument. Second argument must be a function. Value: `'+clbk+'`.' );
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
	} // end FUNCTION done()

	/**
	* Callback invoked upon a stream `error` event.
	*
	* @private
	* @param {Error} error - error object
	*/
	function onError() {
		exitCode = 1;
	} // end FUNCTION onError()

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
	} // end FUNCTION onExit()
} // end FUNCTION createExitHarness()


// EXPORTS //

module.exports = createExitHarness;

},{"./harness":103,"./log":109,"./utils/can_emit_exit.js":120,"./utils/process.js":123,"@stdlib/assert/has-own-property":2,"@stdlib/assert/is-boolean":10,"@stdlib/assert/is-function":20,"@stdlib/assert/is-node-writable-stream-like":36,"@stdlib/assert/is-plain-object":59,"@stdlib/utils/noop":220,"@stdlib/utils/omit":222,"@stdlib/utils/pick":224}],102:[function(require,module,exports){
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
} // end FUNCTION getHarness()


// EXPORTS //

module.exports = getHarness;

},{"./exit_harness.js":101,"./utils/can_emit_exit.js":120}],103:[function(require,module,exports){
'use strict';

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
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
			throw new TypeError( 'invalid input argument. Must provide either an options object or a callback function. Value: `'+options+'`.' );
		}
	} else if ( arguments.length > 1 ) {
		if ( !isObject( options ) ) {
			throw new TypeError( 'invalid input argument. First argument must be an object. Value: `'+options+'`.' );
		}
		if ( hasOwnProp( options, 'autoclose' ) ) {
			opts.autoclose = options.autoclose;
			if ( !isBoolean( opts.autoclose ) ) {
				throw new TypeError( 'invalid option. `autoclose` option must be a boolean primitive. Option: `'+opts.autoclose+'`.' );
			}
		}
		cb = clbk;
		if ( !isFunction( cb ) ) {
			throw new TypeError( 'invalid input argument. Second argument must be a function. Value: `'+cb+'`.' );
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
			throw new TypeError( 'invalid input argument. First argument must be a string. Value: `'+name+'`.' );
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
				throw new TypeError( 'invalid input argument. Third argument must be a function. Value: `'+b+'`.' );
			}
		}
		// Add the benchmark to the initialization queue:
		queue.push( [ name, opts, b ] );

		// Perform initialization on the next turn of the event loop (note: this allows all benchmarks to be "registered" within the same turn of the loop; otherwise, we run the risk of registration-execution race conditions (i.e., a benchmark registers and executes before other benchmarks can register, depleting the benchmark queue and leading the harness to close)):
		if ( queue.length === 1 ) {
			nextTick( initialize );
		}
		return harness;
	} // end FUNCTION harness()

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
		} // end FUNCTION initBenchmark()

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
		} // end FUNCTION onInit()
	} // end FUNCTION initialize()

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
	} // end FUNCTION onResult()

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
	} // end FUNCTION createStream()

	/**
	* Closes a benchmark harness.
	*
	* @private
	*/
	function close() {
		runner.close();
	} // end FUNCTION close()

	/**
	* Forcefully exits a benchmark harness.
	*
	* @private
	*/
	function exit() {
		runner.exit();
	} // end FUNCTION exit()

	/**
	* Returns the harness exit code.
	*
	* @private
	* @returns {NonNegativeInteger} exit code
	*/
	function getExitCode() {
		return exitCode;
	} // end FUNCTION getExitCode()

	setReadOnly( harness, 'createStream', createStream );
	setReadOnly( harness, 'close', close );
	setReadOnly( harness, 'exit', exit );

	Object.defineProperty( harness, 'exitCode', {
		'configurable': false,
		'enumerable': true,
		'get': getExitCode
	});

	return harness;
} // end FUNCTION createHarness()


// EXPORTS //

module.exports = createHarness;

},{"./../benchmark-class":90,"./../defaults.json":100,"./../runner":117,"./../utils/next_tick.js":122,"./init.js":104,"./validate.js":107,"@stdlib/assert/has-own-property":2,"@stdlib/assert/is-boolean":10,"@stdlib/assert/is-function":20,"@stdlib/assert/is-plain-object":59,"@stdlib/assert/is-string":71,"@stdlib/utils/copy":191,"@stdlib/utils/define-read-only-property":194}],104:[function(require,module,exports){
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
	} // end FUNCTION onPreTest()

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
	} // end FUNCTION onEnd()
} // end FUNCTION init()


// EXPORTS //

module.exports = init;

},{"./iterations.js":105,"./pretest.js":106}],105:[function(require,module,exports){
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
	} // end FUNCTION next()

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
	} // end FUNCTION onResult()

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
	} // end FUNCTION onEnd()
} // end FUNCTION iterations()


// EXPORTS //

module.exports = iterations;

},{"./../benchmark-class":90,"@stdlib/assert/is-string":71,"@stdlib/utils/copy":191}],106:[function(require,module,exports){
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
	} // end FUNCTION onResult()

	/**
	* Callback invoked upon a `tic` event.
	*
	* @private
	*/
	function onTic() {
		tic += 1;
	} // end FUNCTION onTic()

	/**
	* Callback invoked upon a `toc` event.
	*
	* @private
	*/
	function onToc() {
		toc += 1;
	} // end FUNCTION onToc()

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
	} // end FUNCTION onEnd()
} // end FUNCTION pretest()


// EXPORTS //

module.exports = pretest;

},{"./../benchmark-class":90,"@stdlib/assert/is-string":71,"@stdlib/utils/copy":191}],107:[function(require,module,exports){
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
		return new TypeError( 'invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
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
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;

},{"@stdlib/assert/has-own-property":2,"@stdlib/assert/is-boolean":10,"@stdlib/assert/is-null":47,"@stdlib/assert/is-plain-object":59,"@stdlib/assert/is-positive-integer":62}],108:[function(require,module,exports){
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

},{"./bench.js":80}],109:[function(require,module,exports){
'use strict';

// MODULES //

var TransformStream = require( '@stdlib/streams/utils/transform' );
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
	} // end FUNCTION transform()

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
	} // end FUNCTION flush()
} // end FUNCTION createStream()


// EXPORTS //

module.exports = createStream;

},{"./log.js":110,"@stdlib/streams/utils/transform":165,"@stdlib/string/from-code-point":171}],110:[function(require,module,exports){
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
} // end FUNCTION log()


// EXPORTS //

module.exports = log;

},{}],111:[function(require,module,exports){
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
} // end FUNCTION clear()


// EXPORTS //

module.exports = clear;

},{}],112:[function(require,module,exports){
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
	} // end FUNCTION onClose()
} // end FUNCTION closeRunner()


// EXPORTS //

module.exports = closeRunner;

},{}],113:[function(require,module,exports){
/* eslint-disable no-underscore-dangle */
'use strict';

// MODULES //

var TransformStream = require( '@stdlib/streams/utils/transform' );
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
	} // end FUNCTION next()

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
	} // end FUNCTION onTick()

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
	} // end FUNCTION onRun()

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
		} // end FUNCTION onPreRun()

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
		} // end FUNCTION onResult()

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
		} // end FUNCTION onEnd()
	} // end FUNCTION onPush()

	/**
	* Callback invoked upon a `done` event.
	*
	* @private
	*/
	function onDone() {
		stream.destroy();
	} // end FUNCTION onDone()
} // end FUNCTION createStream()


// EXPORTS //

module.exports = createStream;

},{"./../utils/next_tick.js":122,"@stdlib/assert/is-string":71,"@stdlib/streams/utils/transform":165}],114:[function(require,module,exports){
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
} // end FUNCTION encodeAssertion()


// EXPORTS //

module.exports = encodeAssertion;

},{"@stdlib/assert/has-own-property":2,"@stdlib/regexp/eol":157,"@stdlib/string/replace":175}],115:[function(require,module,exports){
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
} // end FUNCTION encodeResult()


// EXPORTS //

module.exports = encodeResult;

},{}],116:[function(require,module,exports){
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
	} // end FUNCTION onClose()
} // end FUNCTION exit()


// EXPORTS //

module.exports = exit;

},{}],117:[function(require,module,exports){
'use strict';

// MODULES //

var EventEmitter = require( 'events' ).EventEmitter;
var inherit = require( '@stdlib/utils/inherit' );
var TransformStream = require( '@stdlib/streams/utils/transform' );


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
	Object.defineProperty( this, '_benchmarks', {
		'value': [],
		'configurable': false,
		'writable': false,
		'enumerable': false
	});

	Object.defineProperty( this, '_stream', {
		'value': new TransformStream(),
		'configurable': false,
		'writable': false,
		'enumerable': false
	});

	Object.defineProperty( this, '_closed', {
		'value': false,
		'configurable': false,
		'writable': true,
		'enumerable': false
	});

	Object.defineProperty( this, '_running', {
		'value': false,
		'configurable': false,
		'writable': true,
		'enumerable': false
	});

	// Public properties:
	Object.defineProperty( this, 'total', {
		'value': 0,
		'configurable': false,
		'writable': true,
		'enumerable': true
	});

	Object.defineProperty( this, 'fail', {
		'value': 0,
		'configurable': false,
		'writable': true,
		'enumerable': true
	});

	Object.defineProperty( this, 'pass', {
		'value': 0,
		'configurable': false,
		'writable': true,
		'enumerable': true
	});

	Object.defineProperty( this, 'skip', {
		'value': 0,
		'configurable': false,
		'writable': true,
		'enumerable': true
	});

	Object.defineProperty( this, 'todo', {
		'value': 0,
		'configurable': false,
		'writable': true,
		'enumerable': true
	});

	return this;
} // end FUNCTION Runner()

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
Object.defineProperty( Runner.prototype, 'push', {
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
Object.defineProperty( Runner.prototype, 'createStream', {
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
Object.defineProperty( Runner.prototype, 'run', {
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
Object.defineProperty( Runner.prototype, 'clear', {
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
Object.defineProperty( Runner.prototype, 'close', {
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
Object.defineProperty( Runner.prototype, 'exit', {
	'value': require( './exit.js' ),
	'configurable': false,
	'writable': false,
	'enumerable': false
});


// EXPORTS //

module.exports = Runner;

},{"./clear.js":111,"./close.js":112,"./create_stream.js":113,"./exit.js":116,"./push.js":118,"./run.js":119,"@stdlib/streams/utils/transform":165,"@stdlib/utils/inherit":210,"events":244}],118:[function(require,module,exports){
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
	} // end FUNCTION onPreRun()

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
	} // end FUNCTION onResult()
} // end FUNCTION push()


// EXPORTS //

module.exports = push;

},{"./encode_assertion.js":114,"./encode_result.js":115,"@stdlib/assert/is-string":71}],119:[function(require,module,exports){
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
} // end FUNCTION run()


// EXPORTS //

module.exports = run;

},{}],120:[function(require,module,exports){
'use strict';

// MODULES //

var IS_BROWSER = require( '@stdlib/assert/is-browser' );
var canExit = require( './can_exit.js' );


// EXPORTS //

module.exports = ( !IS_BROWSER && canExit );

},{"./can_exit.js":121,"@stdlib/assert/is-browser":15}],121:[function(require,module,exports){
'use strict';

// MODULES //

var proc = require( './process.js' );


// EXPORTS //

module.exports = ( proc && typeof proc.exit === 'function' );

},{"./process.js":123}],122:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Runs a function on a subsequent turn of the event loop.
*
* ## Notes
*
* * `process.nextTick` is only Node.js.
* * `setImmediate` is non-standard.
* * Everything else is browser based (e.g., mutation observer, requestAnimationFrame, etc).
* * Only API which is universal is `setTimeout`.
* * Note that `0` is not actually `0ms`. Browser environments commonly have a minimum delay of `4ms`. This is acceptable. Here, the main intent of this function is to give the runtime a chance to run garbage collection, clear state, and tend to any other pending tasks before returning control to benchmark tasks. The larger aim (attainable or not) is to provide each benchmark run with as much of a fresh state as possible.
*
*
* @private
* @param {Function} fcn - function to run upon a subsequent turn of the event loop
*/
function nextTick( fcn ) {
	setTimeout( fcn, 0 );
} // end FUNCTION nextTick()


// EXPORTS //

module.exports = nextTick;

},{}],123:[function(require,module,exports){
(function (process){
'use strict';

// EXPORTS //

module.exports = process;

}).call(this,require('_process'))
},{"_process":238}],124:[function(require,module,exports){
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

},{"@stdlib/bench/harness":108}],125:[function(require,module,exports){
'use strict';

// MODULES //

var bench = require( '@stdlib/bench' );
var pkg = require( './../package.json' ).name;
var isBuffer = require( '@stdlib/assert/is-buffer' );
var image = require( './../lib/browser.js' );


// MAIN //

bench( pkg+'::browser', function benchmark( b ) {
	var data;
	var i;
	b.tic();
	for ( i = 0; i < b.iterations; i++ ) {
		data = image();
		if ( !isBuffer( data ) ) {
			b.fail( 'should return a buffer object' );
		}
	}
	b.toc();
	if ( !isBuffer( data ) ) {
		b.fail( 'should return a buffer object' );
	}
	b.pass( 'benchmark finished' );
	b.end();
});

},{"./../lib/browser.js":129,"./../package.json":131,"@stdlib/assert/is-buffer":16,"@stdlib/bench":124}],126:[function(require,module,exports){
'use strict';

// MODULES //

var bench = require( '@stdlib/bench' );
var pkg = require( './../package.json' ).name;
var isBuffer = require( '@stdlib/assert/is-buffer' );
var image = require( './../lib' );


// MAIN //

bench( pkg, function benchmark( b ) {
	var data;
	var i;
	b.tic();
	for ( i = 0; i < b.iterations; i++ ) {
		data = image();
		if ( !isBuffer( data ) ) {
			b.fail( 'should return a buffer object' );
		}
	}
	b.toc();
	if ( !isBuffer( data ) ) {
		b.fail( 'should return a buffer object' );
	}
	b.pass( 'benchmark finished' );
	b.end();
});

},{"./../lib":129,"./../package.json":131,"@stdlib/assert/is-buffer":16,"@stdlib/bench":124}],127:[function(require,module,exports){
'use strict';

// MODULES //

var bench = require( '@stdlib/bench' );
var pkg = require( './../package.json' ).name;
var isBuffer = require( '@stdlib/assert/is-buffer' );
var image = require( './../lib/acanthus_mollis.js' );


// MAIN //

bench( pkg+'::non_browser', function benchmark( b ) {
	var data;
	var i;
	b.tic();
	for ( i = 0; i < b.iterations; i++ ) {
		data = image();
		if ( !isBuffer( data ) ) {
			b.fail( 'should return a buffer object' );
		}
	}
	b.toc();
	if ( !isBuffer( data ) ) {
		b.fail( 'should return a buffer object' );
	}
	b.pass( 'benchmark finished' );
	b.end();
});

},{"./../lib/acanthus_mollis.js":128,"./../package.json":131,"@stdlib/assert/is-buffer":16,"@stdlib/bench":124}],128:[function(require,module,exports){
(function (Buffer,__dirname){
'use strict';

// MODULES //

var resolve = require( 'path' ).resolve;
var readFile = require( '@stdlib/fs/read-file' ).sync;


// VARIABLES //

var fpath = resolve( __dirname, '..', 'data', 'image.jpg' );


// MAIN //

/**
* Returns Acanthus mollis.
*
** ## Notes
*
* * This function synchronously reads data from disk for each invocation. Such behavior is intentional and so is the avoidance of `require`. We assume that invocations are infrequent, and we want to avoid the `require` cache. This means that we allow data to be garbage collected and a user is responsible for explicitly caching data.
*
*
* @throws {Error} unable to read data
* @returns {Buffer} image
*
* @example
* var img = image();
* // returns <Buffer>
*/
function image() {
	var data = readFile( fpath );
	if ( data instanceof Error ) {
		throw data;
	}
	return new Buffer( data, 'base64' );
} // end FUNCTION image()


// EXPORTS //

module.exports = image;

}).call(this,require("buffer").Buffer,"/lib/node_modules/@stdlib/datasets/img-acanthus-mollis/lib")
},{"@stdlib/fs/read-file":133,"buffer":239,"path":252}],129:[function(require,module,exports){
(function (Buffer){
'use strict';

// MODULES //

var data = require( './data.js' );


// MAIN //

/**
* Returns Acanthus mollis.
*
* @returns {Buffer} image
*
* @example
* var img = image();
* // returns <Buffer>
*/
function image() {
	return new Buffer( data, 'base64' );
} // end FUNCTION image()


// EXPORTS //

module.exports = image;

}).call(this,require("buffer").Buffer)
},{"./data.js":130,"buffer":239}],130:[function(require,module,exports){
'use strict';

var data = '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YWN0SW5mbyByZGY6cGFyc2VUeXBlPSdSZXNvdXJjZSc+CiAgIDxJcHRjNHhtcENvcmU6Q2lBZHJDaXR5PkxvcyBBbmdlbGVzPC9JcHRjNHhtcENvcmU6Q2lBZHJDaXR5PgogICA8SXB0YzR4bXBDb3JlOkNpQWRyQ3RyeT5Vbml0ZWQgU3RhdGVzPC9JcHRjNHhtcENvcmU6Q2lBZHJDdHJ5PgogICA8SXB0YzR4bXBDb3JlOkNpQWRyRXh0YWRyPjEyMDAgR2V0dHkgQ2VudGVyIERyaXZlPC9JcHRjNHhtcENvcmU6Q2lBZHJFeHRhZHI+CiAgIDxJcHRjNHhtcENvcmU6Q2lBZHJQY29kZT45MDA0OTwvSXB0YzR4bXBDb3JlOkNpQWRyUGNvZGU+CiAgIDxJcHRjNHhtcENvcmU6Q2lBZHJSZWdpb24+Q2FsaWZvcm5pYTwvSXB0YzR4bXBDb3JlOkNpQWRyUmVnaW9uPgogICA8SXB0YzR4bXBDb3JlOkNpRW1haWxXb3JrPnJpZ2h0c0BnZXR0eS5lZHU8L0lwdGM0eG1wQ29yZTpDaUVtYWlsV29yaz4KICAgPElwdGM0eG1wQ29yZTpDaVVybFdvcms+d3d3LmdldHR5LmVkdTwvSXB0YzR4bXBDb3JlOkNpVXJsV29yaz4KICA8L0lwdGM0eG1wQ29yZTpDcmVhdG9yQ29udGFjdEluZm8+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOklwdGM0eG1wRXh0PSdodHRwOi8vaXB0Yy5vcmcvc3RkL0lwdGM0eG1wRXh0LzIwMDgtMDItMjkvJz4KICA8SXB0YzR4bXBFeHQ6QXJ0d29ya09yT2JqZWN0PgogICA8cmRmOkJhZz4KICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPgogICAgIDxJcHRjNHhtcEV4dDpBT0NyZWF0b3I+CiAgICAgIDxyZGY6U2VxPgogICAgICAgPHJkZjpsaT5LYXJsIEJsb3NzZmVsZHQ8L3JkZjpsaT4KICAgICAgPC9yZGY6U2VxPgogICAgIDwvSXB0YzR4bXBFeHQ6QU9DcmVhdG9yPgogICAgIDxJcHRjNHhtcEV4dDpBT0RhdGVDcmVhdGVkPjE5Mjg8L0lwdGM0eG1wRXh0OkFPRGF0ZUNyZWF0ZWQ+CiAgICAgPElwdGM0eG1wRXh0OkFPU291cmNlPlRoZSBKLiBQYXVsIEdldHR5IE11c2V1bSwgTG9zIEFuZ2VsZXM8L0lwdGM0eG1wRXh0OkFPU291cmNlPgogICAgIDxJcHRjNHhtcEV4dDpBT1NvdXJjZUludk5vPjg0LlhNLjE0Mi4yPC9JcHRjNHhtcEV4dDpBT1NvdXJjZUludk5vPgogICAgIDxJcHRjNHhtcEV4dDpBT1RpdGxlPgogICAgICA8cmRmOkFsdD4KICAgICAgIDxyZGY6bGkgeG1sOmxhbmc9J3gtZGVmYXVsdCc+QWNhbnRodXMgbW9sbGlzPC9yZGY6bGk+CiAgICAgIDwvcmRmOkFsdD4KICAgICA8L0lwdGM0eG1wRXh0OkFPVGl0bGU+CiAgICA8L3JkZjpsaT4KICAgPC9yZGY6QmFnPgogIDwvSXB0YzR4bXBFeHQ6QXJ0d29ya09yT2JqZWN0PgogPC9yZGY6RGVzY3JpcHRpb24+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczpkYz0naHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8nPgogIDxkYzpjcmVhdG9yPgogICA8cmRmOlNlcT4KICAgIDxyZGY6bGk+VGhlIEouIFBhdWwgR2V0dHkgTXVzZXVtPC9yZGY6bGk+CiAgIDwvcmRmOlNlcT4KICA8L2RjOmNyZWF0b3I+CiAgPGRjOmRlc2NyaXB0aW9uPgogICA8cmRmOkFsdD4KICAgIDxyZGY6bGkgeG1sOmxhbmc9J3gtZGVmYXVsdCc+QWNhbnRodXMgbW9sbGlzOyBLYXJsIEJsb3NzZmVsZHQgKEdlcm1hbiwgMTg2NSAtIDE5MzIpOyBCZXJsaW4sIEdlcm1hbnk7IDE5Mjg7IEdlbGF0aW4gc2lsdmVyIHByaW50OyAyNS44IMOXIDE5LjkgY20gKDEwIDMvMTYgw5cgNyAxMy8xNiBpbi4pOyA4NC5YTS4xNDIuMjwvcmRmOmxpPgogICA8L3JkZjpBbHQ+CiAgPC9kYzpkZXNjcmlwdGlvbj4KICA8ZGM6dGl0bGU+CiAgIDxyZGY6QWx0PgogICAgPHJkZjpsaSB4bWw6bGFuZz0neC1kZWZhdWx0Jz5BY2FudGh1cyBtb2xsaXM8L3JkZjpsaT4KICAgPC9yZGY6QWx0PgogIDwvZGM6dGl0bGU+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOnBob3Rvc2hvcD0naHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyc+CiAgPHBob3Rvc2hvcDpTb3VyY2U+VGhlIEouIFBhdWwgR2V0dHkgTXVzZXVtLCBMb3MgQW5nZWxlczwvcGhvdG9zaG9wOlNvdXJjZT4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6eG1wPSdodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvJz4KICA8eG1wOk1ldGFkYXRhRGF0ZT4yMDE2LTA0LTEzVDEyOjMyOjM4PC94bXA6TWV0YWRhdGFEYXRlPgogPC9yZGY6RGVzY3JpcHRpb24+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczp4bXBSaWdodHM9J2h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9yaWdodHMvJz4KICA8eG1wUmlnaHRzOlVzYWdlVGVybXM+CiAgIDxyZGY6QWx0PgogICAgPHJkZjpsaSB4bWw6bGFuZz0neC1kZWZhdWx0Jz5odHRwOi8vd3d3LmdldHR5LmVkdS9sZWdhbC9pbWFnZV9yZXF1ZXN0LzwvcmRmOmxpPgogICA8L3JkZjpBbHQ+CiAgPC94bXBSaWdodHM6VXNhZ2VUZXJtcz4KIDwvcmRmOkRlc2NyaXB0aW9uPgo8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSd3Jz8+/9sAQwACAQEBAQECAQEBAgICAgIEAwICAgIFBAQDBAYFBgYGBQYGBgcJCAYHCQcGBggLCAkKCgoKCgYICwwLCgwJCgoK/9sAQwECAgICAgIFAwMFCgcGBwoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoK/8AAEQgEAAMWAwERAAIRAQMRAf/EAB4AAAIBBQEBAQAAAAAAAAAAAAECAAMGBwgJBQQK/8QAURAAAQIEBQIEAwUFBQYEBQALAQIDAAQFEQYHEiExCEETIlFhCXGBFDJCkaEVI1KxwRYzYtHwCiRygpLhFyVD8Rg0RFNjJnOislQZJ4OzwjX/xAAaAQEBAQEBAQEAAAAAAAAAAAAAAQIDBAUG/8QAKBEBAQACAgMAAQUBAAMBAQAAAAECESExAxJBURMiMmFxBCMzQhSB/9oADAMBAAIRAxEAPwDrAVHVp1Kj8jqV97dN59QuSYaioVK5Bh6zabA+JbzKt8ompCWlGoAXMTUaE67Ak/lGvWds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';


// EXPORTS //

module.exports = data;

},{}],131:[function(require,module,exports){
module.exports={
  "name": "@stdlib/datasets/img-acanthus-mollis",
  "version": "0.0.0",
  "description": "Acanthus mollis.",
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
    "img-acanthus-mollis": "./bin/cli"
  },
  "scripts": {},
  "main": "./lib",
  "browser": "./lib/browser.js",
  "repository": {
    "type": "git",
    "url": "git://github.com/stdlib-js/stdlib.git"
  },
  "homepage": "https://github.com/stdlib-js/stdlib",
  "keywords": [
    "stdlib",
    "datasets",
    "dataset",
    "data",
    "image",
    "img",
    "plant"
  ],
  "bugs": {
    "url": "https://github.com/stdlib-js/stdlib/issues"
  },
  "dependencies": {},
  "devDependencies": {},
  "engines": {
    "node": ">=0.10.0",
    "npm": ">2.7.0"
  },
  "license": "Apache-2.0"
}

},{}],132:[function(require,module,exports){
'use strict';

// MODULES //

var fs = require( 'fs' );


// MAIN //

/**
* Asynchronously reads the entire contents of a file.
*
* @param {(string|Buffer|integer)} file - file path or file descriptor
* @param {(Object|string)} [options] - options
* @param {Function} clbk - callback to invoke after reading file contents
*
* @example
* function onFile( error, data ) {
*     if ( error ) {
*         throw error;
*     }
*     console.log( data );
* }
* readFile( __filename, onFile );
*/
function readFile() {
	var args;
	var i;
	args = new Array( arguments.length );
	for ( i = 0; i < args.length; i++ ) {
		args[ i ] = arguments[ i ];
	}
	fs.readFile.apply( null, args );
} // end FUNCTION readFile()


// EXPORTS //

module.exports = readFile;

},{"fs":237}],133:[function(require,module,exports){
'use strict';

/**
* Read the entire contents of a file.
*
* @module @stdlib/fs/read-file
*
* @example
* var readFile = require( '@stdlib/fs/read-file' );
*
* function onFile( error, data ) {
*     if ( error ) {
*         throw error;
*     }
*     console.log( data );
* }
* readFile( __filename, onFile );
*
* @example
* var readFileSync = require( '@stdlib/fs/read-file' ).sync;
*
* var out = readFileSync( __filename );
* if ( out instanceof Error ) {
*     throw out;
* }
* console.log( out );
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var readFile = require( './async.js' );
var sync = require( './sync.js' );


// MAIN //

setReadOnly( readFile, 'sync', sync );


// EXPORTS //

module.exports = readFile;

},{"./async.js":132,"./sync.js":134,"@stdlib/utils/define-read-only-property":194}],134:[function(require,module,exports){
/* eslint-disable no-sync */
'use strict';

// MODULES //

var fs = require( 'fs' );


// MAIN //

/**
* Synchronously reads the entire contents of a file.
*
* @param {(string|Buffer|integer)} file - file path or file descriptor
* @param {(Object|string)} [options] - options
* @returns {(Buffer|string|Error)} file contents or an error
*
* @example
* var out = readFileSync( __filename );
* if ( out instanceof Error ) {
*     throw out;
* }
* console.log( out );
*/
function readFileSync( file, options ) {
	var f;
	try {
		if ( arguments.length > 1 ) {
			f = fs.readFileSync( file, options );
		} else {
			f = fs.readFileSync( file );
		}
	} catch ( err ) {
		return err;
	}
	return f;
} // end FUNCTION readFileSync()


// EXPORTS //

module.exports = readFileSync;

},{"fs":237}],135:[function(require,module,exports){
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

},{"./is_integer.js":136}],136:[function(require,module,exports){
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
} // end FUNCTION isInteger()


// EXPORTS //

module.exports = isInteger;

},{"@stdlib/math/base/special/floor":140}],137:[function(require,module,exports){
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

},{"./is_nan.js":138}],138:[function(require,module,exports){
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
	return (x !== x);
} // end FUNCTION isnan()


// EXPORTS //

module.exports = isnan;

},{}],139:[function(require,module,exports){
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

},{}],140:[function(require,module,exports){
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

},{"./floor.js":139}],141:[function(require,module,exports){
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
*/

// MODULES //

var modf = require( './modf.js' );


// EXPORTS //

module.exports = modf;

},{"./modf.js":142}],142:[function(require,module,exports){
'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var toWords = require( '@stdlib/math/base/utils/float64-to-words' );
var fromWords = require( '@stdlib/math/base/utils/float64-from-words' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var FLOAT64_EXPONENT_BIAS = require( '@stdlib/math/constants/float64-exponent-bias' );
var FLOAT64_HIGH_WORD_EXPONENT_MASK = require( '@stdlib/math/constants/float64-high-word-exponent-mask' );
var FLOAT64_HIGH_WORD_SIGNIFICAND_MASK = require( '@stdlib/math/constants/float64-high-word-significand-mask' );


// VARIABLES //

// 4294967295 => 0xffffffff => 11111111111111111111111111111111
var ALL_ONES = 4294967295;


// MAIN //

/**
* Decomposes a double-precision floating-point number into integral and fractional parts, each having the same type and sign as the input value.
*
* @param {number} x - input value
* @returns {NumberArray} array containing integral and fractional parts
*
* @example
* var parts = modf( 3.14 );
* // returns [ 3.0, 0.14000000000000012 ]
*/
function modf( x ) {
	var parts;
	var words;
	var high;
	var low;
	var exp;
	var i;

	// Special cases...
	if ( x < 1.0 ) {
		if ( x < 0.0 ) {
			parts = modf( -x );
			parts[ 0 ] *= -1.0;
			parts[ 1 ] *= -1.0;
			return parts;
		}
		if ( x === 0.0 ) {
			return [ x, x ]; // [ +-0, +-0 ]
		}
		return [ 0.0, x ];
	}
	if ( isnan( x ) ) {
		return [ NaN, NaN ];
	}
	if ( x === PINF ) {
		return [ PINF, 0.0 ];
	}
	// Decompose |x|...

	// Extract the high and low words:
	words = toWords( x );
	high = words[ 0 ];
	low = words[ 1 ];

	// Extract the unbiased exponent from the high word:
	exp = (high & FLOAT64_HIGH_WORD_EXPONENT_MASK) >> 20;
	exp -= FLOAT64_EXPONENT_BIAS;

	// Handle smaller values (x < 2**20 = 1048576)...
	if ( exp < 20 ) {
		i = FLOAT64_HIGH_WORD_SIGNIFICAND_MASK >> exp;

		// Determine if `x` is integral by checking for significand bits which cannot be exponentiated away...
		if ( ((high&i)|low) === 0 ) {
			return [ x, 0.0 ];
		}
		// Turn off all the bits which cannot be exponentiated away:
		high &= (~i);

		// Generate the integral part:
		i = fromWords( high, 0 );

		// The fractional part is whatever is leftover:
		return [ i, x-i ];
	}
	// Check if `x` can even have a fractional part...
	if ( exp > 51 ) {
		// `x` is integral:
		return [ x, 0.0 ];
	}
	i = ALL_ONES >>> (exp-20);

	// Determine if `x` is integral by checking for less significant significand bits which cannot be exponentiated away...
	if ( (low&i) === 0 ) {
		return [ x, 0.0 ];
	}
	// Turn off all the bits which cannot be exponentiated away:
	low &= (~i);

	// Generate the integral part:
	i = fromWords( high, low );

	// The fractional part is whatever is leftover:
	return [ i, x-i ];
} // end FUNCTION modf()


// EXPORTS //

module.exports = modf;

},{"@stdlib/math/base/assert/is-nan":137,"@stdlib/math/base/utils/float64-from-words":146,"@stdlib/math/base/utils/float64-to-words":148,"@stdlib/math/constants/float64-exponent-bias":151,"@stdlib/math/constants/float64-high-word-exponent-mask":152,"@stdlib/math/constants/float64-high-word-significand-mask":153,"@stdlib/math/constants/float64-pinf":155}],143:[function(require,module,exports){
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
* v = round( Number.POSITIVE_INFINITY );
* // returns Number.POSITIVE_INFINITY
*
* v = round( Number.NEGATIVE_INFINITY );
* // returns Number.NEGATIVE_INFINITY
*
* v = round( NaN );
* // returns NaN
*/

// MODULES //

var round = require( './round.js' );


// EXPORTS //

module.exports = round;

},{"./round.js":144}],144:[function(require,module,exports){
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
* var v = round( Number.POSITIVE_INFINITY );
* // returns Number.POSITIVE_INFINITY
*
* @example
* var v = round( Number.NEGATIVE_INFINITY );
* // returns Number.NEGATIVE_INFINITY
*
* @example
* var v = round( NaN );
* // returns NaN
*/
var round = Math.round;


// EXPORTS //

module.exports = round;

},{}],145:[function(require,module,exports){
'use strict';

// MODULES //

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
* #### Notes
*
* ``` text
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
* ``` text
*                         <-- lower      higher -->
* |   f7       f6       f5       f4       f3       f2    e2 | f1 |s|  e1  |
* ```
*
* If big endian (more significant bits first):
*
* ``` text
*                         <-- higher      lower -->
* |s| e1    e2 | f1     f2       f3       f4       f5        f6      f7   |
* ```
*
*
* In which Uint32 should we place the higher order bits? If little endian, the second; if big endian, the first.
*
*
* #### References
*
* * [Open Group]{@link http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm}
*
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
* // returns Number.POSITIVE_INFINITY
* @example
* var v = fromWords( 4293918720, 0 );
* // returns Number.NEGATIVE_INFINITY
*/
function fromWords( high, low ) {
	UINT32_VIEW[ HIGH ] = high;
	UINT32_VIEW[ LOW ] = low;
	return FLOAT64_VIEW[ 0 ];
} // end FUNCTION fromWords()


// EXPORTS //

module.exports = fromWords;

},{"./indices.js":147}],146:[function(require,module,exports){
'use strict';

/**
* Create a double-precision floating-point number from a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
*
* @module @stdlib/math/base/utils/float64-from-words
*
* @example
* var fromWords = require( '@stdlib/math/base/utils/float64-from-words' );
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
* // returns Number.POSITIVE_INFINITY
*
* v = fromWords( 4293918720, 0 );
* // returns Number.NEGATIVE_INFINITY
*/

// MODULES //

var fromWords = require( './from_words.js' );


// EXPORTS //

module.exports = fromWords;

},{"./from_words.js":145}],147:[function(require,module,exports){
'use strict';

// MODULES //

var isLittleEndian = require( '@stdlib/assert/is-little-endian' );


// MAIN //

var HIGH;
var LOW;

if ( isLittleEndian === true ) {
	HIGH = 1; // second index
	LOW = 0; // first index
} else {
	HIGH = 0; // first index
	LOW = 1; // second index
}


// EXPORTS //

module.exports = {
	'HIGH': HIGH,
	'LOW': LOW
};

},{"@stdlib/assert/is-little-endian":28}],148:[function(require,module,exports){
'use strict';

/**
* Split a floating-point number into a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
*
* @module @stdlib/math/base/utils/float64-to-words
*
* @example
* var toWords = require( '@stdlib/math/base/utils/float64-to-words' );
*
* var w = toWords( 3.14e201 );
* // returns [ 1774486211, 2479577218 ]
*/

// MODULES //

var toWords = require( './to_words.js' );


// EXPORTS //

module.exports = toWords;

},{"./to_words.js":150}],149:[function(require,module,exports){
arguments[4][147][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":28,"dup":147}],150:[function(require,module,exports){
'use strict';

// MODULES //

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
* #### Notes
*
* ``` text
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
* ``` text
*                         <-- lower      higher -->
* |   f7       f6       f5       f4       f3       f2    e2 | f1 |s|  e1  |
* ```
*
* If big endian (more significant bits first):
*
* ``` text
*                         <-- higher      lower -->
* |s| e1    e2 | f1     f2       f3       f4       f5        f6      f7   |
* ```
*
* In which Uint32 can we find the higher order bits? If little endian, the second; if big endian, the first.
*
*
* #### References
*
* [Open Group]{@link http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm}
*
*
* @param {number} x - input value
* @returns {NumberArray} two-element array containing a higher order word and a lower order word
*
* @example
* var w = toWords( 3.14e201 );
* // returns [ 1774486211, 2479577218 ]
*/
function toWords( x ) {
	FLOAT64_VIEW[ 0 ] = x;
	return [ UINT32_VIEW[ HIGH ], UINT32_VIEW[ LOW ] ];
} // end FUNCTION toWords()


// EXPORTS //

module.exports = toWords;

},{"./indices.js":149}],151:[function(require,module,exports){
'use strict';

/**
* The bias of a double-precision floating-point number's exponent.
*
* @module @stdlib/math/constants/float64-exponent-bias
* @type {integer32}
*
* @example
* var FLOAT64_EXPONENT_BIAS = require( '@stdlib/math/constants/float64-exponent-bias' );
* // returns 1023
*/


// MAIN //

/**
* The bias of a double-precision floating-point number's exponent. The bias can be computed via
*
* ``` tex
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

},{}],152:[function(require,module,exports){
'use strict';

/**
* High word mask for the exponent of a double-precision floating-point number.
*
* @module @stdlib/math/constants/float64-high-word-exponent-mask
* @type {uinteger32}
*
* @example
* var FLOAT64_HIGH_WORD_EXPONENT_MASK = require( '@stdlib/math/constants/float64-high-word-exponent-mask' );
* // returns 2146435072
*/


// MAIN //

/**
* The high word mask for the exponent of a double-precision floating-point number is an unsigned 32-bit integer with the value \\( 2146435072 \\), which corresponds to the bit sequence
*
* ``` binarystring
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

},{}],153:[function(require,module,exports){
'use strict';

/**
* High word mask for the significand of a double-precision floating-point number.
*
* @module @stdlib/math/constants/float64-high-word-significand-mask
* @type {uinteger32}
*
* @example
* var FLOAT64_HIGH_WORD_SIGNIFICAND_MASK = require( '@stdlib/math/constants/float64-high-word-significand-mask' );
* // returns 1048575
*/


// MAIN //

/**
* The high word mask for the significand of a double-precision floating-point number is an unsigned 32-bit integer with the value \\( 1048575 \\), which corresponds to the bit sequence
*
* ``` binarystring
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

},{}],154:[function(require,module,exports){
'use strict';

/**
* Double-precision floating-point negative infinity.
*
* @module @stdlib/math/constants/float64-ninf
* @type {number}
*
* @example
* var FLOAT64_NINF = require( '@stdlib/math/constants/float64-ninf' );
* // returns Number.NEGATIVE_INFINITY
*/


// MAIN //

/**
* Double-precision floating-point negative infinity has the bit sequence
*
* ``` binarystring
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

},{}],155:[function(require,module,exports){
'use strict';

/**
* Double-precision floating-point positive infinity.
*
* @module @stdlib/math/constants/float64-pinf
* @type {number}
*
* @example
* var FLOAT64_PINF = require( '@stdlib/math/constants/float64-pinf' );
* // returns Number.POSITIVE_INFINITY
*/


// MAIN //

/**
* Double-precision floating-point positive infinity has the bit sequence
*
* ``` binarystring
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

},{}],156:[function(require,module,exports){
'use strict';

/**
* Maximum unsigned 32-bit integer.
*
* @module @stdlib/math/constants/uint32-max
* @type {uinteger32}
*
* @example
* var UINT32_MAX = require( '@stdlib/math/constants/uint32-max' );
* // returns 4294967295
*/


// MAIN //

/**
* The maximum unsigned 32-bit integer is given by
*
* ``` tex
* 2^{32} - 1
* ```
*
* which corresponds to the bit sequence
*
* ``` binarystring
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

},{}],157:[function(require,module,exports){
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
* * `\r?`
*   - match a carriage return character (optional)
* * `\n`
*   - match a line feed character
*
* @constant
* @type {RegExp}
* @default /\r?\n/
*/
var RE_EOL = /\r?\n/;


// EXPORTS //

module.exports = RE_EOL;

},{}],158:[function(require,module,exports){
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
* * `/^\s*`
*   - Match zero or more spaces at beginning
* * `function`
*   - Match the word `function`
* * `\s*`
*   - Match zero or more spaces after the word `function`
* * `()`
*   - Capture
* * `[^(]*`
*   - Match anything except a left parenthesis `(` zero or more times
* * `/i`
*   - ignore case
*
* @constant
* @type {RegExp}
* @default /^\s*function\s*([^(]*)/i
*/
var RE_FUNCTION_NAME = /^\s*function\s*([^(]*)/i;


// EXPORTS //

module.exports = RE_FUNCTION_NAME;

},{}],159:[function(require,module,exports){
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
* * `/^\/`
*   - match a string that begins with a `/`
* * `()`
*   - capture
* * `(?:)+`
*   - capture, but do not remember, a group of characters which occur one or more times
* * `\\\/`
*   - match the literal `\/`
* * `|`
*   - OR
* * `[^\/]`
*   - anything which is not the literal `\/`
* * `\/`
*   - match the literal `/`
* * `([imgy]*)`
*   - capture any characters matching `imgy` occurring zero or more times
* * `$/`
*   - string end
*
*
* @constant
* @type {RegExp}
* @default /^\/((?:\\\/|[^\/])+)\/([imgy]*)$/
*/
var RE_REGEXP = /^\/((?:\\\/|[^\/])+)\/([imgy]*)$/; // eslint-disable-line no-useless-escape


// EXPORTS //

module.exports = RE_REGEXP;

},{}],160:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'transform-stream' );


// MAIN //

/**
* Implements the `_transform` method as a pass through.
*
* @private
* @param {(Buffer|string)} chunk - streamed chunk
* @param {string} encoding - Buffer encoding
* @param {Callback} clbk - callback to invoke after transforming the streamed chunk
*/
function _transform( chunk, encoding, clbk ) {
	debug( 'Received a new chunk. Chunk: %s. Encoding: %s.', chunk.toString(), encoding );
	clbk( null, chunk );
} // end FUNCTION _transform()


// EXPORTS //

module.exports = _transform;

},{"debug":241}],161:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'transform-stream' );
var Transform = require( 'readable-stream' ).Transform;
var copy = require( '@stdlib/utils/copy' );
var DEFAULTS = require( './defaults.json' );
var validate = require( './validate.js' );
var destroy = require( './destroy.js' );
var _transform = require( './_transform.js' );


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
* @throws {TypeError} must provide valid options
* @returns {Function} Transform stream constructor
*
* @example
* var stdout = require( '@stdlib/streams/base/stdout' );
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
* // => '1\n2\n3\n'
*/
function ctor( options ) {
	var transform;
	var _opts;
	var err;
	_opts = copy( DEFAULTS );
	if ( arguments.length ) {
		err = validate( _opts, options );
		if ( err ) {
			throw err;
		}
	}
	if ( _opts.transform ) {
		transform = _opts.transform;
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
	* @throws {TypeError} must provide valid options
	* @returns {TransformStream} transform stream
	*
	* @example
	* var stdout = require( '@stdlib/streams/base/stdout' );
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
	* // => '1\n2\n3\n'
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
		opts = copy( _opts );
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
	} // end FUNCTION TransformStream()

	/*
	* Create a prototype which inherits from the parent prototype.
	*/
	TransformStream.prototype = Object.create( Transform.prototype );

	/*
	* Set the constructor.
	*/
	TransformStream.prototype.constructor = TransformStream;

	/**
	* Implements the `_transform` method.
	*
	* @private
	* @memberof TransformStream.prototype
	* @function _transform
	* @param {(Buffer|string)} chunk - streamed chunk
	* @param {string} encoding - Buffer encoding
	* @param {Callback} clbk - callback to invoke after transforming the streamed chunk
	*/
	TransformStream.prototype._transform = _transform;

	if ( _opts.flush ) {
		/**
		* Implements the `_flush` method.
		*
		* @private
		* @memberof TransformStream.prototype
		* @function _flush
		* @param {Callback} callback to invoke after performing flush tasks
		*/
		TransformStream.prototype.flush = _opts.flush;
	}

	/**
	* Gracefully destroys a stream, providing backwards compatibility.
	*
	* @private
	* @memberof TransformStream.prototype
	* @function destroy
	* @param {Object} [error] - optional error message
	* @returns {TransformStream} stream instance
	*/
	TransformStream.prototype.destroy = destroy;

	return TransformStream;
} // end FUNCTION ctor()


// EXPORTS //

module.exports = ctor;

},{"./_transform.js":160,"./defaults.json":162,"./destroy.js":163,"./validate.js":168,"@stdlib/utils/copy":191,"debug":241,"readable-stream":264}],162:[function(require,module,exports){
module.exports={
	"objectMode": false,
	"encoding": null,
	"allowHalfOpen": false,
	"decodeStrings": true
}

},{}],163:[function(require,module,exports){
(function (process){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'transform-stream' );


// MAIN //

/**
* Gracefully destroys a stream, providing backwards compatibility.
*
* @private
* @param {Object} [error] - optional error message
* @returns {Stream} stream instance
*/
function destroy( error ) {
	/* jshint validthis: true */ // TODO: eslint
	var self;
	if ( this._destroyed ) {
		debug( 'Attempted to destroy an already destroyed stream.' );
		return;
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
} // end FUNCTION destroy()


// EXPORTS //

module.exports = destroy;

}).call(this,require('_process'))
},{"_process":238,"debug":241}],164:[function(require,module,exports){
'use strict';

// MODULES //

var copy = require( '@stdlib/utils/copy' );
var Stream = require( './stream.js' );


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
		opts = copy( options );
	} else {
		opts = {};
	}
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
	return function createStream( transform, flush ) {
		opts.transform = transform;
		if ( arguments.length > 1 ) {
			opts.flush = flush;
		} else {
			delete opts.flush; // clear any previous `flush`
		}
		return new Stream( opts );
	};
} // end FUNCTION streamFactory()


// EXPORTS //

module.exports = streamFactory;

},{"./stream.js":167,"@stdlib/utils/copy":191}],165:[function(require,module,exports){
'use strict';

/**
* Transform stream.
*
* @module @stdlib/streams/utils/transform
*
* @example
* var stdout = require( '@stdlib/streams/base/stdout' );
* var transformStream = require( '@stdlib/streams/utils/transform' );
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
* var transformStream = require( '@stdlib/streams/utils/transform' );
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
* var stdout = require( '@stdlib/streams/base/stdout' );
* var transformStream = require( '@stdlib/streams/utils/transform' );
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
* var stdout = require( '@stdlib/streams/base/stdout' );
* var transformStream = require( '@stdlib/streams/utils/transform' );
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

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var transform = require( './stream.js' );
var objectMode = require( './object_mode.js' );
var factory = require( './factory.js' );
var ctor = require( './ctor.js' );


// MAIN //

setReadOnly( transform, 'objectMode', objectMode );
setReadOnly( transform, 'factory', factory );
setReadOnly( transform, 'ctor', ctor );


// EXPORTS //

module.exports = transform;

},{"./ctor.js":161,"./factory.js":164,"./object_mode.js":166,"./stream.js":167,"@stdlib/utils/define-read-only-property":194}],166:[function(require,module,exports){
'use strict';

// MODULES //

var Stream = require( './stream.js' );


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
* @throws {TypeError} must provide valid options
* @returns {TransformStream} transform stream
*
* @example
* var stdout = require( '@stdlib/streams/base/stdout' );
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
* // => '{"value":"a"}\n{"value":"b"}\n{"value":"c"}\n'
*/
function objectMode( options ) {
	var opts;
	if ( arguments.length ) {
		opts = options;
	} else {
		opts = {};
	}
	opts.objectMode = true;
	return new Stream( opts );
} // end FUNCTION objectMode()


// EXPORTS //

module.exports = objectMode;

},{"./stream.js":167}],167:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'transform-stream' );
var Transform = require( 'readable-stream' ).Transform;
var copy = require( '@stdlib/utils/copy' );
var DEFAULTS = require( './defaults.json' );
var validate = require( './validate.js' );
var destroy = require( './destroy.js' );
var _transform = require( './_transform.js' );


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
* var stdout = require( '@stdlib/streams/base/stdout' );
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
* // => '1\n2\n3\n'
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
} // end FUNCTION TransformStream()

/*
* Create a prototype which inherits from the parent prototype.
*/
TransformStream.prototype = Object.create( Transform.prototype );

/*
* Set the constructor.
*/
TransformStream.prototype.constructor = TransformStream;

/**
* Gracefully destroys a stream, providing backwards compatibility.
*
* @memberof TransformStream.prototype
* @function destroy
* @param {Object} [error] - optional error message
* @returns {TransformStream} stream instance
*/
TransformStream.prototype.destroy = destroy;


// EXPORTS //

module.exports = TransformStream;

},{"./_transform.js":160,"./defaults.json":162,"./destroy.js":163,"./validate.js":168,"@stdlib/utils/copy":191,"debug":241,"readable-stream":264}],168:[function(require,module,exports){
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
		return new TypeError( 'invalid input argument. Options must be an object. Value: `' + options + '`.' );
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
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;

},{"@stdlib/assert/has-own-property":2,"@stdlib/assert/is-boolean":10,"@stdlib/assert/is-function":20,"@stdlib/assert/is-nonnegative-number":44,"@stdlib/assert/is-plain-object":59,"@stdlib/assert/is-string":71}],169:[function(require,module,exports){
'use strict';

/**
* Maximum Unicode code point in the Basic Multilingual Plane (BMP).
*
* @module @stdlib/string/constants/unicode-max-bmp
* @type {integer32}
*
* @example
* var UNICODE_MAX_BMP = require( '@stdlib/string/constants/unicode-max-bmp' );
* // returns 65535
*/


// MAIN //

/**
* Maximum Unicode code point in the Basic Multilingual Plane (BMP).
*
* @constant
* @type {integer32}
* @see [Unicode]{@link https://en.wikipedia.org/wiki/Unicode}
* @default 65535
*/
var UNICODE_MAX_BMP = 0xFFFF|0; // asm type annotation


// EXPORTS //

module.exports = UNICODE_MAX_BMP;

},{}],170:[function(require,module,exports){
'use strict';

/**
* Maximum Unicode code point.
*
* @module @stdlib/string/constants/unicode-max
* @type {integer32}
*
* @example
* var UNICODE_MAX = require( '@stdlib/string/constants/unicode-max' );
* // returns 1114111
*/


// MAIN //

/**
* Maximum Unicode code point.
*
* @constant
* @type {integer32}
* @see [Unicode]{@link https://en.wikipedia.org/wiki/Unicode}
* @default 1114111
*/
var UNICODE_MAX = 0x10FFFF|0; // asm type annotation


// EXPORTS //

module.exports = UNICODE_MAX;

},{}],171:[function(require,module,exports){
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

},{"./main.js":172}],172:[function(require,module,exports){
'use strict';

// MODULES //

var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;
var isArrayLikeObject = require( '@stdlib/assert/is-array-like-object' );
var MAX_CODE_POINT = require( '@stdlib/string/constants/unicode-max' );
var MAX_BMP_CODE_POINT = require( '@stdlib/string/constants/unicode-max-bmp' );


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
* * UTF-16 encoding uses one 16-bit unit for non-surrogates (U+0000 to U+D7FF and U+E000 to U+FFFF).
*
* * UTF-16 encoding uses two 16-bit units (surrogate pairs) for U+10000 to U+10FFFF and encodes U+10000-U+10FFFF by subtracting 0x10000 from the code point, expressing the result as a 20-bit binary, and splitting the 20 bits of 0x0-0xFFFFF as upper and lower 10-bits. The respective 10-bits are stored in two 16-bit words: a high and a low surrogate.
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
	if ( len === 1 && isArrayLikeObject( args ) ) {
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
			throw new TypeError( 'invalid input argument. Must provide valid code points (nonnegative integers). Value: `'+pt+'`.' );
		}
		if ( pt > MAX_CODE_POINT ) {
			throw new RangeError( 'invalid input argument. Must provide a valid code point (cannot exceed max). Value: `'+pt+'`.' );
		}
		if ( pt <= MAX_BMP_CODE_POINT ) {
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
} // end FUNCTION fromCodePoint()


// EXPORTS //

module.exports = fromCodePoint;

},{"@stdlib/assert/is-array-like-object":3,"@stdlib/assert/is-nonnegative-integer":40,"@stdlib/string/constants/unicode-max":170,"@stdlib/string/constants/unicode-max-bmp":169}],173:[function(require,module,exports){
'use strict';

/**
* Trim whitespace characters from the beginning of a string.
*
* @module @stdlib/string/left-trim
*
* @example
* var ltrim = require( '@stdlib/string/left-trim' );
*
* var out = ltrim( '   Whitespace   ' );
* // returns 'Whitespace   '
*
* out = ltrim( '\t\t\tTabs\t\t\t' );
* // returns 'Tabs\t\t\t'
*/

// MODULES //

var ltrim = require( './left_trim.js' );


// EXPORTS //

module.exports = ltrim;

},{"./left_trim.js":174}],174:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var replace = require( '@stdlib/string/replace' );


// VARIABLES //

// The following regular expression should suffice to polyfill (most?) all environments.
var RE = /^[\u0020\f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/;


// MAIN //

/**
* Trims whitespace characters from the beginning of a string.
*
* @param {string} str - input string
* @throws {TypeError} must provide a string primitive
* @returns {string} trimmed string
*
* @example
* var out = ltrim( '   Whitespace   ' );
* // returns 'Whitespace   '
*
* @example
* var out = ltrim( '\t\t\tTabs\t\t\t' );
* // returns 'Tabs\t\t\t'
*
* @example
* var out = ltrim( '\n\n\nNew Lines\n\n\n' );
* // returns 'New Lines\n\n\n'
*/
function ltrim( str ) {
	if ( !isString( str ) ) {
		throw new TypeError( 'invalid input argument. Must provide a string primitive. Value: `' + str + '`.' );
	}
	return replace( str, RE, '' );
} // end FUNCTION ltrim()


// EXPORTS //

module.exports = ltrim;

},{"@stdlib/assert/is-string":71,"@stdlib/string/replace":175}],175:[function(require,module,exports){
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

},{"./replace.js":176}],176:[function(require,module,exports){
'use strict';

// MODULES //

var rescape = require( '@stdlib/utils/escape-regexp-string' );
var isFunction = require( '@stdlib/assert/is-function' );
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var isRegexp = require( '@stdlib/assert/is-regexp' );


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
* var capitalize = require( '@stdlib/utils/string/capitalize' );
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
		throw new TypeError( 'invalid input argument. First argument must be a string primitive. Value: `' + str + '`.' );
	}
	if ( isString( search ) ) {
		search = rescape( search );
		search = new RegExp( search, 'g' );
	}
	else if ( !isRegexp( search ) ) {
		throw new TypeError( 'invalid input argument. Second argument must be a string primitive or regular expression. Value: `' + search + '`.' );
	}
	if ( !isString( newval ) && !isFunction( newval ) ) {
		throw new TypeError( 'invalid input argument. Third argument must be a string primitive or replacement function. Value: `' + newval + '`.' );
	}
	return str.replace( search, newval );
} // end FUNCTION replace()


// EXPORTS //

module.exports = replace;

},{"@stdlib/assert/is-function":20,"@stdlib/assert/is-regexp":66,"@stdlib/assert/is-string":71,"@stdlib/utils/escape-regexp-string":200}],177:[function(require,module,exports){
'use strict';

/**
* Trim whitespace characters from the end of a string.
*
* @module @stdlib/string/right-trim
*
* @example
* var rtrim = require( '@stdlib/string/right-trim' );
*
* var out = rtrim( '   Whitespace   ' );
* // returns '   Whitespace'
*
* out = rtrim( '\t\t\tTabs\t\t\t' );
* // returns '\t\t\tTabs'
*
* out = rtrim( '\n\n\nNew Lines\n\n\n' );
* // returns '\n\n\nNew Lines'
*/

// MODULES //

var rtrim = require( './right_trim.js' );


// EXPORTS //

module.exports = rtrim;

},{"./right_trim.js":178}],178:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var replace = require( '@stdlib/string/replace' );


// VARIABLES //

// The following regular expression should suffice to polyfill (most?) all environments.
var RE = /[\u0020\f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+$/;


// MAIN //

/**
* Trims whitespace from the end of a string.
*
* @param {string} str - input string
* @throws {TypeError} must provide a string primitive
* @returns {string} trimmed string
*
* @example
* var out = rtrim( '   Whitespace   ' );
* // returns '   Whitespace'
*
* @example
* var out = rtrim( '\t\t\tTabs\t\t\t' );
* // returns '\t\t\tTabs'
*
* @example
* var out = rtrim( '\n\n\nNew Lines\n\n\n' );
* // returns '\n\n\nNew Lines'
*/
function rtrim( str ) {
	if ( !isString( str ) ) {
		throw new TypeError( 'invalid input argument. Must provide a string primitive. Value: `' + str + '`.' );
	}
	return replace( str, RE, '' );
} // end FUNCTION rtrim()


// EXPORTS //

module.exports = rtrim;

},{"@stdlib/assert/is-string":71,"@stdlib/string/replace":175}],179:[function(require,module,exports){
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

},{"./trim.js":180}],180:[function(require,module,exports){
'use strict';

// MODULES //

var ltrim = require( '@stdlib/string/left-trim' );
var rtrim = require( '@stdlib/string/right-trim' );


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
* var out = trim( '\n\n\nNew Lines\n\n\n' ) );
* // returns 'New Lines'
*/
function trim( str ) {
	return ltrim( rtrim( str ) );
} // end FUNCTION trim()


// EXPORTS //

module.exports = trim;

},{"@stdlib/string/left-trim":173,"@stdlib/string/right-trim":177}],181:[function(require,module,exports){
'use strict';

// MODULES //

var Global = require( 'system.global' )();
var isObject = require( '@stdlib/assert/is-object' );
var modf = require( '@stdlib/math/base/special/modf' );
var round = require( '@stdlib/math/base/special/round' );
var now = require( './now.js' );


// VARIABLES //

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
* #### Notes
*
* * Output format: `[seconds, nanoseconds]`.
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
} // end FUNCTION tic()


// EXPORTS //

module.exports = tic;

},{"./now.js":183,"@stdlib/assert/is-object":57,"@stdlib/math/base/special/modf":141,"@stdlib/math/base/special/round":143,"system.global":267}],182:[function(require,module,exports){
'use strict';

// MODULES //

var isFunction = require( '@stdlib/assert/is-function' );


// EXPORTS //

module.exports = isFunction( Date.now );

},{"@stdlib/assert/is-function":20}],183:[function(require,module,exports){
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

},{"./detect.js":182,"./polyfill.js":184}],184:[function(require,module,exports){
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
} // end FUNCTION now()


// EXPORTS //

module.exports = now;

},{}],185:[function(require,module,exports){
'use strict';

/**
* Return a high-resolution time difference.
*
* @module @stdlib/time/toc
*
* @example
* var tic = requrie( '@stdlib/time/tic' );
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

},{"./toc.js":186}],186:[function(require,module,exports){
'use strict';

// MODULES //

var isNonNegativeIntegerArray = require( '@stdlib/assert/is-nonnegative-integer-array' ).primitives;
var tic = require( '@stdlib/time/tic' );


// MAIN //

/**
* Returns a high-resolution time difference.
*
* #### Notes
*
* * Output format: `[seconds, nanoseconds]`.
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
		throw new TypeError( 'invalid input argument. Must provide an array of nonnegative integers. Value: `' + time + '`.' );
	}
	if ( time.length !== 2 ) {
		throw new RangeError( 'invalid input argument. Input array must have length `2`.' );
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
} // end FUNCTION toc()


// EXPORTS //

module.exports = toc;

},{"@stdlib/assert/is-nonnegative-integer-array":38,"@stdlib/time/tic":181}],187:[function(require,module,exports){
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
* @example
* var v = constructorName( 5 );
* // returns 'Number'
* @example
* var v = constructorName( null );
* // returns 'Null'
* @example
* var v = constructorName( undefined );
* // returns 'Undefined'
* @example
* var v = constructorName( function noop(){} );
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
} // end FUNCTION constructorName()


// EXPORTS //

module.exports = constructorName;

},{"@stdlib/assert/is-buffer":16,"@stdlib/regexp/function-name":158,"@stdlib/utils/native-class":215}],188:[function(require,module,exports){
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

},{"./constructor_name.js":187}],189:[function(require,module,exports){
'use strict';

// MODULES //

var isArray = require( '@stdlib/assert/is-array' );
var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var deepCopy = require( './deep_copy.js' );


// MAIN //

/**
* Copies or deep clones a value to an arbitrary depth.
*
* @param {*} value - value to copy
* @param {NonNegativeInteger} [level=+infinity] - copy depth
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
			throw new TypeError( 'invalid input argument. `level` must be a nonnegative integer. Value: `' + level + '`.' );
		}
		if ( level === 0 ) {
			return value;
		}
	} else {
		level = PINF;
	}
	out = ( isArray(value) ) ? [] : {};
	return deepCopy( value, out, [value], [out], level );
} // end FUNCTION copy()


// EXPORTS //

module.exports = copy;

},{"./deep_copy.js":190,"@stdlib/assert/is-array":7,"@stdlib/assert/is-nonnegative-integer":40,"@stdlib/math/constants/float64-pinf":155}],190:[function(require,module,exports){
(function (Buffer){
'use strict';

// MODULES //

var objectKeys = require( 'object-keys' ).shim();
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var isArray = require( '@stdlib/assert/is-array' );
var isBuffer = require( '@stdlib/assert/is-buffer' );
var isError = require( '@stdlib/assert/is-error' );
var typeOf = require( '@stdlib/utils/type-of' );
var regexp = require( '@stdlib/utils/regexp-from-string' );
var indexOf = require( '@stdlib/utils/index-of' );
var typedArrays = require( './typed_arrays.js' );


// FUNCTIONS //

/**
* Clones a class instance.
*
* #### Notes
*
* * This should __only__ be used for simple cases. Any instances with privileged access to variables (e.g., within closures) cannot be cloned. This approach should be considered __fragile__.
* * The function is greedy, disregarding the notion of a `level`. Instead, the function deep copies all properties, as we assume the concept of `level` applies only to the class instance reference but not to its internal state. This prevents, in theory, two instances from sharing state.
*
*
* @private
* @param {Object} val - class instance
* @returns {Object} new instance
*/
function cloneInstance( val ) {
	var cache = [];
	var refs = [];
	var names;
	var name;
	var desc;
	var tmp;
	var ref;
	var i;

	ref = Object.create( Object.getPrototypeOf( val ) );
	cache.push( val );
	refs.push( ref );

	names = Object.getOwnPropertyNames( val );
	for ( i = 0; i < names.length; i++ ) {
		name = names[ i ];
		desc = Object.getOwnPropertyDescriptor( val, name );
		if ( hasOwnProp( desc, 'value' ) ) {
			tmp = ( isArray( val[name] ) ) ? [] : {};
			desc.value = deepCopy( val[name], tmp, cache, refs, -1 );
		}
		Object.defineProperty( ref, name, desc );
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
} // end FUNCTION cloneInstance()

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
	/* jshint newcap:false */ // TODO: eslint
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
		desc = Object.getOwnPropertyDescriptor( error, key );
		if ( hasOwnProp( desc, 'value' ) ) {
			tmp = ( isArray( error[ key ] ) ) ? [] : {};
			desc.value = deepCopy( error[ key ], tmp, cache, refs, -1 );
		}
		Object.defineProperty( err, key, desc );
	}
	return err;
} // end FUNCTION copyError()


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
		return new Buffer( val );
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
					desc = Object.getOwnPropertyDescriptor( val, key );
					if ( hasOwnProp( desc, 'value' ) ) {
						desc.value = deepCopy( x );
					}
					Object.defineProperty( copy, key, desc );
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
			ref = ( isArray(x) ) ? [] : {};
			cache.push( x );
			refs.push( ref );
			if ( parent === 'array' ) {
				copy[ key ] = deepCopy( x, ref, cache, refs, level );
			} else {
				desc = Object.getOwnPropertyDescriptor( val, key );
				if ( hasOwnProp( desc, 'value' ) ) {
					desc.value = deepCopy( x, ref, cache, refs, level );
				}
				Object.defineProperty( copy, key, desc );
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
			desc = Object.getOwnPropertyDescriptor( val, key );
			Object.defineProperty( copy, key, desc );
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
} // end FUNCTION deepCopy()


// EXPORTS //

module.exports = deepCopy;

}).call(this,require("buffer").Buffer)
},{"./typed_arrays.js":192,"@stdlib/assert/has-own-property":2,"@stdlib/assert/is-array":7,"@stdlib/assert/is-buffer":16,"@stdlib/assert/is-error":18,"@stdlib/utils/index-of":207,"@stdlib/utils/regexp-from-string":227,"@stdlib/utils/type-of":232,"buffer":239,"object-keys":250}],191:[function(require,module,exports){
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

},{"./copy.js":189}],192:[function(require,module,exports){
/* eslint-disable no-new-func */
'use strict';

// MAIN //

var ctors = [
	'Int8Array',
	'Uint8Array',
	'Uint8ClampedArray',
	'Int16Array',
	'Uint16Array',
	'Int32Array',
	'Uint32Array',
	'Float32Array',
	'Float64Array'
];

/**
* Create functions for copying typed arrays.
*
* @private
* @returns {Object} typed array functions
*/
function createTypedArrayFcns() {
	var typedArrays = {};
	var ctor;
	var i;
	for ( i = 0; i < ctors.length; i++ ) {
		ctor = ctors[ i ];
		typedArrays[ ctor.toLowerCase() ] = new Function( 'arr', 'return new '+ctor+'( arr );' );
	}
	return typedArrays;
} // end FUNCTION createTypedArrayFcns()


// EXPORTS //

module.exports = createTypedArrayFcns();

},{}],193:[function(require,module,exports){
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
} // end FUNCTION setReadOnly()


// EXPORTS //

module.exports = setReadOnly;

},{}],194:[function(require,module,exports){
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

},{"./define_read_only_property.js":193}],195:[function(require,module,exports){
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
} // end FUNCTION hasSymbolSupport()


// EXPORTS //

module.exports = hasSymbolSupport;

},{}],196:[function(require,module,exports){
'use strict';

/**
* Tests for native `Symbol` support.
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

},{"./detect_symbol_support.js":195}],197:[function(require,module,exports){
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
} // end FUNCTION hasToStringTagSupport()


// EXPORTS //

module.exports = hasToStringTagSupport;

},{"@stdlib/utils/detect-symbol-support":196}],198:[function(require,module,exports){
'use strict';

/**
* Tests for native `toStringTag` support.
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

},{"./has_tostringtag_support.js":197}],199:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;


// VARIABLES //

var RE = /[-\/\\^$*+?.()|[\]{}]/g; // eslint-disable-line no-useless-escape


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
		throw new TypeError( 'invalid input argument. Must provide a regular expression string. Value: `' + str + '`.' );
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
	// If we searched the string to no avail or if the first letter is not `/`, assume that the string is not of the form `/[...]/[gimy]`:
	if ( i === void 0 || i <= 0 ) {
		return str.replace( RE, '\\$&' );
	}
	// We need to de-construct the string...
	s = str.substring( 1, i );

	// Only escape the characters between the `/`:
	s = s.replace( RE, '\\$&' );

	// Reassemble:
	str = str[ 0 ] + s + str.substring( i );

	return str;
} // end FUNCTION rescape()


// EXPORTS //

module.exports = rescape;

},{"@stdlib/assert/is-string":71}],200:[function(require,module,exports){
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

var rescape = require( './escape_regexp_string.js' );


// EXPORTS //

module.exports = rescape;

},{"./escape_regexp_string.js":199}],201:[function(require,module,exports){
'use strict';

// MODULES //

var isFunction = require( '@stdlib/assert/is-function' );


// MAIN //

var getProto;
if ( isFunction( Object.getPrototypeOf ) ) {
	getProto = require( './native.js' );
} else {
	getProto = require( './polyfill.js' );
}


// EXPORTS //

module.exports = getProto;

},{"./native.js":204,"./polyfill.js":205,"@stdlib/assert/is-function":20}],202:[function(require,module,exports){
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
} // end FUNCTION getPrototypeOf()


// EXPORTS //

module.exports = getPrototypeOf;

},{"./detect.js":201}],203:[function(require,module,exports){
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

},{"./get_prototype_of.js":202}],204:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = Object.getPrototypeOf;

},{}],205:[function(require,module,exports){
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
} // end FUNCTION getPrototypeOf()


// EXPORTS //

module.exports = getPrototypeOf;

},{"./proto.js":206,"@stdlib/utils/native-class":215}],206:[function(require,module,exports){
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
} // end FUNCTION getProto()


// EXPORTS //

module.exports = getProto;

},{}],207:[function(require,module,exports){
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

},{"./index_of.js":208}],208:[function(require,module,exports){
'use strict';

// MODULES //

var isnan = require( '@stdlib/assert/is-nan' );
var isArrayLike = require( '@stdlib/assert/is-array-like' );
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
	if ( !isArrayLike( arr ) ) {
		throw new TypeError( 'invalid input argument. First argument must be an array-like object. Value: `' + arr + '`.' );
	}
	len = arr.length;
	if ( len === 0 ) {
		return -1;
	}
	if ( arguments.length === 3 ) {
		if ( !isInteger( fromIndex ) ) {
			throw new TypeError( 'invalid input argument. `fromIndex` must be an integer. Value: `' + fromIndex + '`.' );
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
} // end FUNCTION indexOf()


// EXPORTS //

module.exports = indexOf;

},{"@stdlib/assert/is-array-like":5,"@stdlib/assert/is-integer":23,"@stdlib/assert/is-nan":31}],209:[function(require,module,exports){
'use strict';

// MODULES //

var objectCreate = require( './native.js' );
var createObject = require( './polyfill.js' );


// EXPORTS //

if ( typeof objectCreate === 'function' ) {
	module.exports = objectCreate;
} else {
	module.exports = createObject;
}

},{"./native.js":212,"./polyfill.js":213}],210:[function(require,module,exports){
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

},{"./inherit.js":211}],211:[function(require,module,exports){
'use strict';

// MODULES //

var validate = require( './validate.js' );
var createObject = require( './detect.js' );


// MAIN //

/**
* Implements prototypical inheritance by replacing the prototype of one constructor with the prototype of another constructor.
*
* #### Notes
*
* * This implementation is not designed to work with ES2015/ES6 classes. For ES2015/ES6 classes, use `class` with `extends`.
* * For reference, see [node#3455](https://github.com/nodejs/node/pull/3455), [node#4179](https://github.com/nodejs/node/issues/4179), [node#3452](https://github.com/nodejs/node/issues/3452), and [node commit](https://github.com/nodejs/node/commit/29da8cf8d7ab8f66b9091ab22664067d4468461e#diff-3deb3f32958bb937ae05c6f3e4abbdf5).
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
		throw new TypeError( 'invalid input argument. Second argument must have a prototype from which another object can inherit. Value: `'+superCtor.prototype+'`.' );
	}
	// Create a prototype which inherits from the parent prototype:
	ctor.prototype = createObject( superCtor.prototype );

	// Set the constructor to refer to the child constructor:
	ctor.prototype.constructor = ctor;

	return ctor;
} // end FUNCTION inherit()


// EXPORTS //

module.exports = inherit;

},{"./detect.js":209,"./validate.js":214}],212:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = Object.create;

},{}],213:[function(require,module,exports){
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
} // end FUNCTION createObject()


// EXPORTS //

module.exports = createObject;

},{}],214:[function(require,module,exports){
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
		return new TypeError( 'invalid input argument. A provided constructor must be either an object (except null) or a function. Value: `'+value+'`.' );
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;

},{}],215:[function(require,module,exports){
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

var hasToStringTag = require( '@stdlib/utils/detect-tostringtag-support' )();


// MAIN //

var nativeClass;
if ( hasToStringTag ) {
	nativeClass = require( './polyfill.js' );
} else {
	nativeClass = require( './native_class.js' );
}


// EXPORTS //

module.exports = nativeClass;

},{"./native_class.js":216,"./polyfill.js":217,"@stdlib/utils/detect-tostringtag-support":198}],216:[function(require,module,exports){
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
} // end FUNCTION nativeClass()


// EXPORTS //

module.exports = nativeClass;

},{"./tostring.js":218}],217:[function(require,module,exports){
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
} // end FUNCTION nativeClass()


// EXPORTS //

module.exports = nativeClass;

},{"./tostring.js":218,"./tostringtag.js":219,"@stdlib/assert/has-own-property":2}],218:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = Object.prototype.toString; // eslint-disable-line no-redeclare

},{}],219:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';

},{}],220:[function(require,module,exports){
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

},{"./noop.js":221}],221:[function(require,module,exports){
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

},{}],222:[function(require,module,exports){
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

},{"./omit.js":223}],223:[function(require,module,exports){
'use strict';

// MODULES //

var getKeys = require( 'object-keys' ).shim();
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
		throw new TypeError( 'invalid input argument. First argument must be an object. Value: `'+obj+'`.' );
	}
	ownKeys = getKeys( obj );
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
	throw new TypeError( 'invalid input argument. Second argument must be either a string primitive or an array of string primitives. Value: `'+keys+'`.' );
} // end FUNCTION omit()


// EXPORTS //

module.exports = omit;

},{"@stdlib/assert/is-string":71,"@stdlib/assert/is-string-array":69,"@stdlib/utils/index-of":207,"object-keys":250}],224:[function(require,module,exports){
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

},{"./pick.js":225}],225:[function(require,module,exports){
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
		throw new TypeError( 'invalid input argument. First argument must be an object. Value: `'+obj+'`.' );
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
	throw new TypeError( 'invalid input argument. Second argument must be either a string primitive or an array of string primitives. Value: `'+keys+'`.' );
} // end FUNCTION pick()


// EXPORTS //

module.exports = pick;

},{"@stdlib/assert/has-own-property":2,"@stdlib/assert/is-string":71,"@stdlib/assert/is-string-array":69}],226:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var RE = require( '@stdlib/regexp/regexp' );


// MAIN //

/**
* Parses a regular expression string and returns a new regular expression.
*
* @param {string} str - regular expression string
* @returns {(RegExp|null)} regular expression or null
*
* @example
* var re = reFromString( '/beep/' )
* // returns /beep/
*/
function reFromString( str ) {
	if ( !isString( str ) ) {
		throw new TypeError( 'invalid input argument. Must provide a regular expression string. Value: `' + str + '`.' );
	}
	// Capture the regular expression pattern and any flags:
	str = RE.exec( str );

	// Create a new regular expression:
	return ( str ) ? new RegExp( str[1], str[2] ) : null;
} // end FUNCTION reFromString()


// EXPORTS //

module.exports = reFromString;

},{"@stdlib/assert/is-string":71,"@stdlib/regexp/regexp":159}],227:[function(require,module,exports){
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

},{"./from_string.js":226}],228:[function(require,module,exports){
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
} // end FUNCTION check()


// EXPORTS //

module.exports = check;

},{"./fixtures/nodelist.js":229,"./fixtures/re.js":230,"./fixtures/typedarray.js":231}],229:[function(require,module,exports){
'use strict';

// MODULES //

var root = require( 'system.global' )(); // eslint-disable-line no-redeclare


// MAIN //

var nodeList = root.document && root.document.childNodes;


// EXPORTS //

module.exports = nodeList;

},{"system.global":267}],230:[function(require,module,exports){
'use strict';

var RE = /./;


// EXPORTS //

module.exports = RE;

},{}],231:[function(require,module,exports){
'use strict';

var typedarray = Int8Array;


// EXPORTS //

module.exports = typedarray;

},{}],232:[function(require,module,exports){
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

},{"./check.js":228,"./polyfill.js":233,"./typeof.js":234}],233:[function(require,module,exports){
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
} // end FUNCTION typeOf()


// EXPORTS //

module.exports = typeOf;

},{"@stdlib/utils/constructor-name":188}],234:[function(require,module,exports){
'use strict';

// MODULES //

var ctorName = require( '@stdlib/utils/constructor-name' );


// NOTES //

/*
* Built-in `typeof` operator behavior:
*
* ``` text
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
} // end FUNCTION typeOf()


// EXPORTS //

module.exports = typeOf;

},{"@stdlib/utils/constructor-name":188}],235:[function(require,module,exports){
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

},{}],236:[function(require,module,exports){

},{}],237:[function(require,module,exports){
arguments[4][236][0].apply(exports,arguments)
},{"dup":236}],238:[function(require,module,exports){
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

},{}],239:[function(require,module,exports){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
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

},{"base64-js":235,"ieee754":246}],240:[function(require,module,exports){
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
},{"../../is-buffer/index.js":248}],241:[function(require,module,exports){
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
},{"./debug":242,"_process":238}],242:[function(require,module,exports){

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

},{"ms":249}],243:[function(require,module,exports){
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

},{"foreach":245,"object-keys":250}],244:[function(require,module,exports){
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

},{}],245:[function(require,module,exports){

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


},{}],246:[function(require,module,exports){
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

},{}],247:[function(require,module,exports){
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

},{}],248:[function(require,module,exports){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
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

},{}],249:[function(require,module,exports){
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

},{}],250:[function(require,module,exports){
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

},{"./isArguments":251}],251:[function(require,module,exports){
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

},{}],252:[function(require,module,exports){
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
},{"_process":238}],253:[function(require,module,exports){
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
},{"_process":238}],254:[function(require,module,exports){
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
},{"./_stream_readable":256,"./_stream_writable":258,"core-util-is":240,"inherits":247,"process-nextick-args":253}],255:[function(require,module,exports){
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
},{"./_stream_transform":257,"core-util-is":240,"inherits":247}],256:[function(require,module,exports){
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
},{"./_stream_duplex":254,"./internal/streams/BufferList":259,"./internal/streams/destroy":260,"./internal/streams/stream":261,"_process":238,"core-util-is":240,"events":244,"inherits":247,"isarray":262,"process-nextick-args":253,"safe-buffer":265,"string_decoder/":263,"util":236}],257:[function(require,module,exports){
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
},{"./_stream_duplex":254,"core-util-is":240,"inherits":247}],258:[function(require,module,exports){
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
},{"./_stream_duplex":254,"./internal/streams/destroy":260,"./internal/streams/stream":261,"_process":238,"core-util-is":240,"inherits":247,"process-nextick-args":253,"safe-buffer":265,"util-deprecate":270}],259:[function(require,module,exports){
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
},{"safe-buffer":265}],260:[function(require,module,exports){
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
},{"process-nextick-args":253}],261:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":244}],262:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],263:[function(require,module,exports){
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
},{"safe-buffer":265}],264:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":254,"./lib/_stream_passthrough.js":255,"./lib/_stream_readable.js":256,"./lib/_stream_transform.js":257,"./lib/_stream_writable.js":258}],265:[function(require,module,exports){
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

},{"buffer":239}],266:[function(require,module,exports){
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
},{}],267:[function(require,module,exports){
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

},{"./implementation":266,"./polyfill":268,"./shim":269,"define-properties":243}],268:[function(require,module,exports){
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
},{"./implementation":266}],269:[function(require,module,exports){
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
},{"./polyfill":268,"define-properties":243}],270:[function(require,module,exports){
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
},{}]},{},[125,126,127]);