"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformDecode = exports.TransformDecodeError = exports.TransformDecodeCheckError = void 0;
const index_1 = require("../../type/symbols/index");
const index_2 = require("../../type/error/index");
const index_3 = require("../../type/keyof/index");
const index_4 = require("../../type/indexed/index");
const index_5 = require("../deref/index");
const index_6 = require("../check/index");
// ------------------------------------------------------------------
// ValueGuard
// ------------------------------------------------------------------
const index_7 = require("../guard/index");
// ------------------------------------------------------------------
// TypeGuard
// ------------------------------------------------------------------
const type_1 = require("../../type/guard/type");
// ------------------------------------------------------------------
// Errors
// ------------------------------------------------------------------
// thrown externally
// prettier-ignore
class TransformDecodeCheckError extends index_2.TypeBoxError {
    constructor(schema, value, error) {
        super(`Unable to decode value as it does not match the expected schema`);
        this.schema = schema;
        this.value = value;
        this.error = error;
    }
}
exports.TransformDecodeCheckError = TransformDecodeCheckError;
// prettier-ignore
class TransformDecodeError extends index_2.TypeBoxError {
    constructor(schema, path, value, error) {
        super(error instanceof Error ? error.message : 'Unknown error');
        this.schema = schema;
        this.path = path;
        this.value = value;
        this.error = error;
    }
}
exports.TransformDecodeError = TransformDecodeError;
// ------------------------------------------------------------------
// Decode
// ------------------------------------------------------------------
// prettier-ignore
function Default(schema, path, value) {
    try {
        return (0, type_1.IsTransform)(schema) ? schema[index_1.TransformKind].Decode(value) : value;
    }
    catch (error) {
        throw new TransformDecodeError(schema, path, value, error);
    }
}
// prettier-ignore
function FromArray(schema, references, path, value) {
    return ((0, index_7.IsArray)(value))
        ? Default(schema, path, value.map((value, index) => Visit(schema.items, references, `${path}/${index}`, value)))
        : Default(schema, path, value);
}
// prettier-ignore
function FromIntersect(schema, references, path, value) {
    if (!(0, index_7.IsStandardObject)(value) || (0, index_7.IsValueType)(value))
        return Default(schema, path, value);
    const knownKeys = (0, index_3.KeyOfPropertyKeys)(schema);
    const knownProperties = { ...value };
    for (const key of knownKeys)
        if (key in knownProperties) {
            knownProperties[key] = Visit((0, index_4.Index)(schema, [key]), references, `${path}/${key}`, knownProperties[key]);
        }
    if (!(0, type_1.IsTransform)(schema.unevaluatedProperties)) {
        return Default(schema, path, knownProperties);
    }
    const unknownKeys = Object.getOwnPropertyNames(knownProperties);
    const unevaluatedProperties = schema.unevaluatedProperties;
    const unknownProperties = { ...knownProperties };
    for (const key of unknownKeys)
        if (!knownKeys.includes(key)) {
            unknownProperties[key] = Default(unevaluatedProperties, `${path}/${key}`, unknownProperties[key]);
        }
    return Default(schema, path, unknownProperties);
}
function FromNot(schema, references, path, value) {
    return Default(schema, path, Visit(schema.not, references, path, value));
}
// prettier-ignore
function FromObject(schema, references, path, value) {
    if (!(0, index_7.IsStandardObject)(value))
        return Default(schema, path, value);
    const knownKeys = (0, index_3.KeyOfPropertyKeys)(schema);
    const knownProperties = { ...value };
    for (const key of knownKeys)
        if (key in knownProperties) {
            knownProperties[key] = Visit(schema.properties[key], references, `${path}/${key}`, knownProperties[key]);
        }
    if (!(0, type_1.IsSchema)(schema.additionalProperties)) {
        return Default(schema, path, knownProperties);
    }
    const unknownKeys = Object.getOwnPropertyNames(knownProperties);
    const additionalProperties = schema.additionalProperties;
    const unknownProperties = { ...knownProperties };
    for (const key of unknownKeys)
        if (!knownKeys.includes(key)) {
            unknownProperties[key] = Default(additionalProperties, `${path}/${key}`, unknownProperties[key]);
        }
    return Default(schema, path, unknownProperties);
}
// prettier-ignore
function FromRecord(schema, references, path, value) {
    if (!(0, index_7.IsStandardObject)(value))
        return Default(schema, path, value);
    const pattern = Object.getOwnPropertyNames(schema.patternProperties)[0];
    const knownKeys = new RegExp(pattern);
    const knownProperties = { ...value };
    for (const key of Object.getOwnPropertyNames(value))
        if (knownKeys.test(key)) {
            knownProperties[key] = Visit(schema.patternProperties[pattern], references, `${path}/${key}`, knownProperties[key]);
        }
    if (!(0, type_1.IsSchema)(schema.additionalProperties)) {
        return Default(schema, path, knownProperties);
    }
    const unknownKeys = Object.getOwnPropertyNames(knownProperties);
    const additionalProperties = schema.additionalProperties;
    const unknownProperties = { ...knownProperties };
    for (const key of unknownKeys)
        if (!knownKeys.test(key)) {
            unknownProperties[key] = Default(additionalProperties, `${path}/${key}`, unknownProperties[key]);
        }
    return Default(schema, path, unknownProperties);
}
// prettier-ignore
function FromRef(schema, references, path, value) {
    const target = (0, index_5.Deref)(schema, references);
    return Default(schema, path, Visit(target, references, path, value));
}
// prettier-ignore
function FromThis(schema, references, path, value) {
    const target = (0, index_5.Deref)(schema, references);
    return Default(schema, path, Visit(target, references, path, value));
}
// prettier-ignore
function FromTuple(schema, references, path, value) {
    return ((0, index_7.IsArray)(value) && (0, index_7.IsArray)(schema.items))
        ? Default(schema, path, schema.items.map((schema, index) => Visit(schema, references, `${path}/${index}`, value[index])))
        : Default(schema, path, value);
}
// prettier-ignore
function FromUnion(schema, references, path, value) {
    for (const subschema of schema.anyOf) {
        if (!(0, index_6.Check)(subschema, references, value))
            continue;
        // note: ensure interior is decoded first
        const decoded = Visit(subschema, references, path, value);
        return Default(schema, path, decoded);
    }
    return Default(schema, path, value);
}
// prettier-ignore
function Visit(schema, references, path, value) {
    const references_ = typeof schema.$id === 'string' ? [...references, schema] : references;
    const schema_ = schema;
    switch (schema[index_1.Kind]) {
        case 'Array':
            return FromArray(schema_, references_, path, value);
        case 'Intersect':
            return FromIntersect(schema_, references_, path, value);
        case 'Not':
            return FromNot(schema_, references_, path, value);
        case 'Object':
            return FromObject(schema_, references_, path, value);
        case 'Record':
            return FromRecord(schema_, references_, path, value);
        case 'Ref':
            return FromRef(schema_, references_, path, value);
        case 'Symbol':
            return Default(schema_, path, value);
        case 'This':
            return FromThis(schema_, references_, path, value);
        case 'Tuple':
            return FromTuple(schema_, references_, path, value);
        case 'Union':
            return FromUnion(schema_, references_, path, value);
        default:
            return Default(schema_, path, value);
    }
}
/**
 * `[Internal]` Decodes the value and returns the result. This function requires that
 * the caller `Check` the value before use. Passing unchecked values may result in
 * undefined behavior. Refer to the `Value.Decode()` for implementation details.
 */
function TransformDecode(schema, references, value) {
    return Visit(schema, references, '', value);
}
exports.TransformDecode = TransformDecode;
