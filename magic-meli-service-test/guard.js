"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValueType = exports.IsSymbol = exports.IsFunction = exports.IsString = exports.IsBigInt = exports.IsInteger = exports.IsNumber = exports.IsBoolean = exports.IsNull = exports.IsUndefined = exports.IsArray = exports.IsObject = exports.HasPropertyKey = exports.IsBigUint64Array = exports.IsBigInt64Array = exports.IsFloat64Array = exports.IsFloat32Array = exports.IsUint32Array = exports.IsInt32Array = exports.IsUint16Array = exports.IsInt16Array = exports.IsUint8ClampedArray = exports.IsUint8Array = exports.IsInt8Array = exports.IsTypedArray = exports.IsRegExp = exports.IsSet = exports.IsMap = exports.IsDate = exports.IsPromise = exports.IsInstanceObject = exports.IsStandardObject = exports.IsIterator = exports.IsAsyncIterator = void 0;
// --------------------------------------------------------------------------
// Iterators
// --------------------------------------------------------------------------
/** Returns true if this value is an async iterator */
function IsAsyncIterator(value) {
    return IsObject(value) && Symbol.asyncIterator in value;
}
exports.IsAsyncIterator = IsAsyncIterator;
/** Returns true if this value is an iterator */
function IsIterator(value) {
    return IsObject(value) && Symbol.iterator in value;
}
exports.IsIterator = IsIterator;
// --------------------------------------------------------------------------
// Object Instances
// --------------------------------------------------------------------------
/** Returns true if this value is not an instance of a class */
function IsStandardObject(value) {
    return IsObject(value) && !IsArray(value) && IsFunction(value.constructor) && value.constructor.name === 'Object';
}
exports.IsStandardObject = IsStandardObject;
/** Returns true if this value is an instance of a class */
function IsInstanceObject(value) {
    return IsObject(value) && !IsArray(value) && IsFunction(value.constructor) && value.constructor.name !== 'Object';
}
exports.IsInstanceObject = IsInstanceObject;
// --------------------------------------------------------------------------
// JavaScript
// --------------------------------------------------------------------------
/** Returns true if this value is a Promise */
function IsPromise(value) {
    return value instanceof Promise;
}
exports.IsPromise = IsPromise;
/** Returns true if this value is a Date */
function IsDate(value) {
    return value instanceof Date && Number.isFinite(value.getTime());
}
exports.IsDate = IsDate;
/** Returns true if this value is an instance of Map<K, T> */
function IsMap(value) {
    return value instanceof globalThis.Map;
}
exports.IsMap = IsMap;
/** Returns true if this value is an instance of Set<T> */
function IsSet(value) {
    return value instanceof globalThis.Set;
}
exports.IsSet = IsSet;
/** Returns true if this value is RegExp */
function IsRegExp(value) {
    return value instanceof globalThis.RegExp;
}
exports.IsRegExp = IsRegExp;
/** Returns true if this value is a typed array */
function IsTypedArray(value) {
    return ArrayBuffer.isView(value);
}
exports.IsTypedArray = IsTypedArray;
/** Returns true if the value is a Int8Array */
function IsInt8Array(value) {
    return value instanceof globalThis.Int8Array;
}
exports.IsInt8Array = IsInt8Array;
/** Returns true if the value is a Uint8Array */
function IsUint8Array(value) {
    return value instanceof globalThis.Uint8Array;
}
exports.IsUint8Array = IsUint8Array;
/** Returns true if the value is a Uint8ClampedArray */
function IsUint8ClampedArray(value) {
    return value instanceof globalThis.Uint8ClampedArray;
}
exports.IsUint8ClampedArray = IsUint8ClampedArray;
/** Returns true if the value is a Int16Array */
function IsInt16Array(value) {
    return value instanceof globalThis.Int16Array;
}
exports.IsInt16Array = IsInt16Array;
/** Returns true if the value is a Uint16Array */
function IsUint16Array(value) {
    return value instanceof globalThis.Uint16Array;
}
exports.IsUint16Array = IsUint16Array;
/** Returns true if the value is a Int32Array */
function IsInt32Array(value) {
    return value instanceof globalThis.Int32Array;
}
exports.IsInt32Array = IsInt32Array;
/** Returns true if the value is a Uint32Array */
function IsUint32Array(value) {
    return value instanceof globalThis.Uint32Array;
}
exports.IsUint32Array = IsUint32Array;
/** Returns true if the value is a Float32Array */
function IsFloat32Array(value) {
    return value instanceof globalThis.Float32Array;
}
exports.IsFloat32Array = IsFloat32Array;
/** Returns true if the value is a Float64Array */
function IsFloat64Array(value) {
    return value instanceof globalThis.Float64Array;
}
exports.IsFloat64Array = IsFloat64Array;
/** Returns true if the value is a BigInt64Array */
function IsBigInt64Array(value) {
    return value instanceof globalThis.BigInt64Array;
}
exports.IsBigInt64Array = IsBigInt64Array;
/** Returns true if the value is a BigUint64Array */
function IsBigUint64Array(value) {
    return value instanceof globalThis.BigUint64Array;
}
exports.IsBigUint64Array = IsBigUint64Array;
// --------------------------------------------------------------------------
// Standard
// --------------------------------------------------------------------------
/** Returns true if this value has this property key */
function HasPropertyKey(value, key) {
    return key in value;
}
exports.HasPropertyKey = HasPropertyKey;
/** Returns true of this value is an object type */
function IsObject(value) {
    return value !== null && typeof value === 'object';
}
exports.IsObject = IsObject;
/** Returns true if this value is an array, but not a typed array */
function IsArray(value) {
    return Array.isArray(value) && !ArrayBuffer.isView(value);
}
exports.IsArray = IsArray;
/** Returns true if this value is an undefined */
function IsUndefined(value) {
    return value === undefined;
}
exports.IsUndefined = IsUndefined;
/** Returns true if this value is an null */
function IsNull(value) {
    return value === null;
}
exports.IsNull = IsNull;
/** Returns true if this value is an boolean */
function IsBoolean(value) {
    return typeof value === 'boolean';
}
exports.IsBoolean = IsBoolean;
/** Returns true if this value is an number */
function IsNumber(value) {
    return typeof value === 'number';
}
exports.IsNumber = IsNumber;
/** Returns true if this value is an integer */
function IsInteger(value) {
    return Number.isInteger(value);
}
exports.IsInteger = IsInteger;
/** Returns true if this value is bigint */
function IsBigInt(value) {
    return typeof value === 'bigint';
}
exports.IsBigInt = IsBigInt;
/** Returns true if this value is string */
function IsString(value) {
    return typeof value === 'string';
}
exports.IsString = IsString;
/** Returns true if this value is a function */
function IsFunction(value) {
    return typeof value === 'function';
}
exports.IsFunction = IsFunction;
/** Returns true if this value is a symbol */
function IsSymbol(value) {
    return typeof value === 'symbol';
}
exports.IsSymbol = IsSymbol;
/** Returns true if this value is a value type such as number, string, boolean */
function IsValueType(value) {
    // prettier-ignore
    return (IsBigInt(value) ||
        IsBoolean(value) ||
        IsNull(value) ||
        IsNumber(value) ||
        IsString(value) ||
        IsSymbol(value) ||
        IsUndefined(value));
}
exports.IsValueType = IsValueType;
