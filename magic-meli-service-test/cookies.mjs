// src/cookies.ts
import { parse } from "cookie";
import decodeURIComponent2 from "fast-decode-uri-component";

// src/utils.ts
import { Kind } from "@sinclair/typebox";
import { Value as Value4 } from "@sinclair/typebox/value";
import { TypeCompiler as TypeCompiler2 } from "@sinclair/typebox/compiler";

// src/index.ts
import EventEmitter from "eventemitter3";

// src/error.ts
import { Value } from "@sinclair/typebox/value";
var env = typeof Bun !== "undefined" ? Bun.env : typeof process !== "undefined" ? process?.env : void 0;
var ERROR_CODE = Symbol("ElysiaErrorCode");
var ELYSIA_RESPONSE = Symbol("ElysiaResponse");
var isProduction = (env?.NODE_ENV ?? env?.ENV) === "production";
var InvalidCookieSignature = class extends Error {
  constructor(key, message) {
    super(message ?? `"${key}" has invalid cookie signature`);
    this.key = key;
    this.code = "INVALID_COOKIE_SIGNATURE";
    this.status = 400;
  }
};
var ValidationError = class _ValidationError extends Error {
  constructor(type, validator, value) {
    if (typeof value === "object" && ELYSIA_RESPONSE in value)
      value = value.response;
    const error2 = isProduction ? void 0 : "Errors" in validator ? validator.Errors(value).First() : Value.Errors(validator, value).First();
    const customError = error2?.schema.error ? typeof error2.schema.error === "function" ? error2.schema.error(type, validator, value) : error2.schema.error : void 0;
    const accessor = error2?.path || "root";
    let message = "";
    if (customError) {
      message = typeof customError === "object" ? JSON.stringify(customError) : customError + "";
    } else if (isProduction) {
      message = JSON.stringify({
        type: "validation",
        on: type,
        message: error2?.message,
        found: value
      });
    } else {
      const schema = validator?.schema ?? validator;
      const errors = "Errors" in validator ? [...validator.Errors(value)] : [...Value.Errors(validator, value)];
      let expected;
      try {
        expected = Value.Create(schema);
      } catch (error3) {
        expected = {
          type: "Could not create expected value",
          // @ts-expect-error
          message: error3?.message,
          error: error3
        };
      }
      message = JSON.stringify(
        {
          type: "validation",
          on: type,
          property: accessor,
          message: error2?.message,
          expected,
          found: value,
          errors
        },
        null,
        2
      );
    }
    super(message);
    this.type = type;
    this.validator = validator;
    this.value = value;
    this.code = "VALIDATION";
    this.status = 422;
    Object.setPrototypeOf(this, _ValidationError.prototype);
  }
  get all() {
    return [...this.validator.Errors(this.value)];
  }
  static simplifyModel(validator) {
    const model = "schema" in validator ? validator.schema : validator;
    try {
      return Value.Create(model);
    } catch {
      return model;
    }
  }
  get model() {
    return _ValidationError.simplifyModel(this.validator);
  }
  toResponse(headers) {
    return new Response(this.message, {
      status: 400,
      headers: {
        ...headers,
        "content-type": "application/json"
      }
    });
  }
};

// src/compose.ts
import { Value as Value2 } from "@sinclair/typebox/value";
import { parse as parseQuery } from "fast-querystring";
import decodeURIComponent from "fast-decode-uri-component";

// src/handler.ts
import { serialize } from "cookie";
var hasHeaderShorthand = "toJSON" in new Headers();

// src/compose.ts
var headersHasToJSON = new Headers().toJSON;
var KindSymbol = Symbol.for("TypeBox.Kind");
var TransformSymbol = Symbol.for("TypeBox.Transform");

// src/dynamic-handle.ts
import { parse as parseQuery2 } from "fast-querystring";

// src/type-system.ts
import {
  TypeRegistry
} from "@sinclair/typebox";
import { TypeSystem } from "@sinclair/typebox/system";
import {
  Type,
  FormatRegistry
} from "@sinclair/typebox";
import { Value as Value3 } from "@sinclair/typebox/value";

// src/formats.ts
var fullFormats = {
  // date: http://tools.ietf.org/html/rfc3339#section-5.6
  date,
  // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
  time: getTime(true),
  "date-time": getDateTime(true),
  "iso-time": getTime(false),
  "iso-date-time": getDateTime(false),
  // duration: https://tools.ietf.org/html/rfc3339#appendix-A
  duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
  uri,
  "uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
  // uri-template: https://tools.ietf.org/html/rfc6570
  "uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
  // For the source: https://gist.github.com/dperini/729294
  // For test cases: https://mathiasbynens.be/demo/url-regex
  url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
  email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
  hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
  // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
  ipv4: /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/,
  ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
  regex,
  // uuid: http://tools.ietf.org/html/rfc4122
  uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
  // JSON-pointer: https://tools.ietf.org/html/rfc6901
  // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
  "json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/,
  "json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
  // relative JSON-pointer: http://tools.ietf.org/html/draft-luff-relative-json-pointer-00
  "relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
  // the following formats are used by the openapi specification: https://spec.openapis.org/oas/v3.0.0#data-types
  // byte: https://github.com/miguelmota/is-base64
  byte,
  // signed 32 bit integer
  int32: { type: "number", validate: validateInt32 },
  // signed 64 bit integer
  int64: { type: "number", validate: validateInt64 },
  // C-type float
  float: { type: "number", validate: validateNumber },
  // C-type double
  double: { type: "number", validate: validateNumber },
  // hint to the UI to hide input strings
  password: true,
  // unchecked string payload
  binary: true
};
function isLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
var DATE = /^(\d\d\d\d)-(\d\d)-(\d\d)$/;
var DAYS = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function date(str) {
  const matches = DATE.exec(str);
  if (!matches)
    return false;
  const year = +matches[1];
  const month = +matches[2];
  const day = +matches[3];
  return month >= 1 && month <= 12 && day >= 1 && day <= (month === 2 && isLeapYear(year) ? 29 : DAYS[month]);
}
var TIME = /^(\d\d):(\d\d):(\d\d(?:\.\d+)?)(z|([+-])(\d\d)(?::?(\d\d))?)?$/i;
function getTime(strictTimeZone) {
  return function time(str) {
    const matches = TIME.exec(str);
    if (!matches)
      return false;
    const hr = +matches[1];
    const min = +matches[2];
    const sec = +matches[3];
    const tz = matches[4];
    const tzSign = matches[5] === "-" ? -1 : 1;
    const tzH = +(matches[6] || 0);
    const tzM = +(matches[7] || 0);
    if (tzH > 23 || tzM > 59 || strictTimeZone && !tz)
      return false;
    if (hr <= 23 && min <= 59 && sec < 60)
      return true;
    const utcMin = min - tzM * tzSign;
    const utcHr = hr - tzH * tzSign - (utcMin < 0 ? 1 : 0);
    return (utcHr === 23 || utcHr === -1) && (utcMin === 59 || utcMin === -1) && sec < 61;
  };
}
var DATE_TIME_SEPARATOR = /t|\s/i;
function getDateTime(strictTimeZone) {
  const time = getTime(strictTimeZone);
  return function date_time(str) {
    const dateTime = str.split(DATE_TIME_SEPARATOR);
    return dateTime.length === 2 && date(dateTime[0]) && time(dateTime[1]);
  };
}
var NOT_URI_FRAGMENT = /\/|:/;
var URI = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
function uri(str) {
  return NOT_URI_FRAGMENT.test(str) && URI.test(str);
}
var BYTE = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
function byte(str) {
  BYTE.lastIndex = 0;
  return BYTE.test(str);
}
var MIN_INT32 = -(2 ** 31);
var MAX_INT32 = 2 ** 31 - 1;
function validateInt32(value) {
  return Number.isInteger(value) && value <= MAX_INT32 && value >= MIN_INT32;
}
function validateInt64(value) {
  return Number.isInteger(value);
}
function validateNumber() {
  return true;
}
var Z_ANCHOR = /[^\\]\\Z/;
function regex(str) {
  if (Z_ANCHOR.test(str))
    return false;
  try {
    new RegExp(str);
    return true;
  } catch (e) {
    return false;
  }
}

// src/type-system.ts
import {
  TypeSystemPolicy,
  TypeSystem as TypeSystem2,
  TypeSystemDuplicateFormat,
  TypeSystemDuplicateTypeKind
} from "@sinclair/typebox/system";
import { TypeCompiler, TypeCheck } from "@sinclair/typebox/compiler";
var isISO8601 = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/;
var isFormalDate = /(?:Sun|Mon|Tue|Wed|Thu|Fri|Sat)\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{2}\s\d{4}\s\d{2}:\d{2}:\d{2}\sGMT(?:\+|-)\d{4}\s\([^)]+\)/;
var isShortenDate = /^(?:(?:(?:(?:0?[1-9]|[12][0-9]|3[01])[/\s-](?:0?[1-9]|1[0-2])[/\s-](?:19|20)\d{2})|(?:(?:19|20)\d{2}[/\s-](?:0?[1-9]|1[0-2])[/\s-](?:0?[1-9]|[12][0-9]|3[01]))))(?:\s(?:1[012]|0?[1-9]):[0-5][0-9](?::[0-5][0-9])?(?:\s[AP]M)?)?$/;
var _validateDate = fullFormats.date;
var _validateDateTime = fullFormats["date-time"];
if (!FormatRegistry.Has("date"))
  TypeSystem.Format("date", (value) => {
    const temp = value.replace(/"/g, "");
    if (isISO8601.test(temp) || isFormalDate.test(temp) || isShortenDate.test(temp) || _validateDate(temp)) {
      const date2 = new Date(temp);
      if (!Number.isNaN(date2.getTime()))
        return true;
    }
    return false;
  });
if (!FormatRegistry.Has("date-time"))
  TypeSystem.Format("date-time", (value) => {
    const temp = value.replace(/"/g, "");
    if (isISO8601.test(temp) || isFormalDate.test(temp) || isShortenDate.test(temp) || _validateDateTime(temp)) {
      const date2 = new Date(temp);
      if (!Number.isNaN(date2.getTime()))
        return true;
    }
    return false;
  });
Object.entries(fullFormats).forEach((formatEntry) => {
  const [formatName, formatValue] = formatEntry;
  if (!FormatRegistry.Has(formatName)) {
    if (formatValue instanceof RegExp)
      TypeSystem.Format(formatName, (value) => formatValue.test(value));
    else if (typeof formatValue === "function")
      TypeSystem.Format(formatName, formatValue);
  }
});
var t = Object.assign({}, Type);
var parseFileUnit = (size) => {
  if (typeof size === "string")
    switch (size.slice(-1)) {
      case "k":
        return +size.slice(0, size.length - 1) * 1024;
      case "m":
        return +size.slice(0, size.length - 1) * 1048576;
      default:
        return +size;
    }
  return size;
};
var validateFile = (options, value) => {
  if (!(value instanceof Blob))
    return false;
  if (options.minSize && value.size < parseFileUnit(options.minSize))
    return false;
  if (options.maxSize && value.size > parseFileUnit(options.maxSize))
    return false;
  if (options.extension)
    if (typeof options.extension === "string") {
      if (!value.type.startsWith(options.extension))
        return false;
    } else {
      for (let i = 0; i < options.extension.length; i++)
        if (value.type.startsWith(options.extension[i]))
          return true;
      return false;
    }
  return true;
};
var File = TypeRegistry.Get("Files") ?? TypeSystem.Type("File", validateFile);
var Files = TypeRegistry.Get("Files") ?? TypeSystem.Type(
  "Files",
  (options, value) => {
    if (!Array.isArray(value))
      return validateFile(options, value);
    if (options.minItems && value.length < options.minItems)
      return false;
    if (options.maxItems && value.length > options.maxItems)
      return false;
    for (let i = 0; i < value.length; i++)
      if (!validateFile(options, value[i]))
        return false;
    return true;
  }
);
if (!FormatRegistry.Has("numeric"))
  FormatRegistry.Set("numeric", (value) => !!value && !isNaN(+value));
if (!FormatRegistry.Has("boolean"))
  FormatRegistry.Set(
    "boolean",
    (value) => value === "true" || value === "false"
  );
if (!FormatRegistry.Has("ObjectString"))
  FormatRegistry.Set("ObjectString", (value) => {
    let start = value.charCodeAt(0);
    if (start === 9 || start === 10 || start === 32)
      start = value.trimStart().charCodeAt(0);
    if (start !== 123 && start !== 91)
      return false;
    try {
      JSON.parse(value);
      return true;
    } catch {
      return false;
    }
  });
var ElysiaType = {
  Numeric: (property) => {
    const schema = Type.Number(property);
    return t.Transform(
      t.Union(
        [
          t.String({
            format: "numeric",
            default: 0
          }),
          t.Number(property)
        ],
        property
      )
    ).Decode((value) => {
      const number = +value;
      if (isNaN(number))
        return value;
      if (property && !Value3.Check(schema, number))
        throw new ValidationError("property", schema, number);
      return number;
    }).Encode((value) => value);
  },
  Date: (property) => {
    const schema = Type.Date(property);
    return t.Transform(
      t.Union(
        [
          Type.Date(property),
          t.String({
            format: "date",
            default: (/* @__PURE__ */ new Date()).toISOString()
          }),
          t.String({
            format: "date-time",
            default: (/* @__PURE__ */ new Date()).toISOString()
          })
        ],
        property
      )
    ).Decode((value) => {
      if (value instanceof Date)
        return value;
      const date2 = new Date(value);
      if (!Value3.Check(schema, date2))
        throw new ValidationError("property", schema, date2);
      return date2;
    }).Encode((value) => {
      if (typeof value === "string")
        return new Date(value);
      return value;
    });
  },
  BooleanString: (property) => {
    const schema = Type.Boolean(property);
    return t.Transform(
      t.Union(
        [
          t.String({
            format: "boolean",
            default: false
          }),
          t.Boolean(property)
        ],
        property
      )
    ).Decode((value) => {
      if (typeof value === "string")
        return value === "true";
      if (property && !Value3.Check(schema, value))
        throw new ValidationError("property", schema, value);
      return value;
    }).Encode((value) => value);
  },
  ObjectString: (properties = {}, options) => {
    const schema = t.Object(properties, options);
    const defaultValue = JSON.stringify(Value3.Create(schema));
    return t.Transform(
      t.Union([
        t.String({
          format: "ObjectString",
          default: defaultValue
        }),
        schema
      ])
    ).Decode((value) => {
      if (typeof value === "string") {
        try {
          value = JSON.parse(value);
        } catch {
          throw new ValidationError("property", schema, value);
        }
        if (!Value3.Check(schema, value))
          throw new ValidationError("property", schema, value);
        return value;
      }
      return value;
    }).Encode((value) => {
      if (typeof value === "string")
        try {
          value = JSON.parse(value);
        } catch {
          throw new ValidationError("property", schema, value);
        }
      if (!Value3.Check(schema, value))
        throw new ValidationError("property", schema, value);
      return JSON.stringify(value);
    });
  },
  File,
  Files: (options = {}) => t.Transform(Files(options)).Decode((value) => {
    if (Array.isArray(value))
      return value;
    return [value];
  }).Encode((value) => value),
  Nullable: (schema) => t.Union([t.Null(), schema]),
  /**
   * Allow Optional, Nullable and Undefined
   */
  MaybeEmpty: (schema) => t.Union([t.Null(), t.Undefined(), schema]),
  Cookie: (properties, {
    domain,
    expires,
    httpOnly,
    maxAge,
    path,
    priority,
    sameSite,
    secure,
    secrets,
    sign,
    ...options
  } = {}) => {
    const v = t.Object(properties, options);
    v.config = {
      domain,
      expires,
      httpOnly,
      maxAge,
      path,
      priority,
      sameSite,
      secure,
      secrets,
      sign
    };
    return v;
  }
};
t.BooleanString = ElysiaType.BooleanString;
t.ObjectString = ElysiaType.ObjectString;
t.Numeric = ElysiaType.Numeric;
t.File = (arg = {}) => ElysiaType.File({
  default: "File",
  ...arg,
  extension: arg?.type,
  type: "string",
  format: "binary"
});
t.Files = (arg = {}) => ElysiaType.Files({
  ...arg,
  elysiaMeta: "Files",
  default: "Files",
  extension: arg?.type,
  type: "array",
  items: {
    ...arg,
    default: "Files",
    type: "string",
    format: "binary"
  }
});
t.Nullable = (schema) => ElysiaType.Nullable(schema);
t.MaybeEmpty = ElysiaType.MaybeEmpty;
t.Cookie = ElysiaType.Cookie;
t.Date = ElysiaType.Date;

// src/utils.ts
var primitiveHooks = [
  "start",
  "request",
  "parse",
  "transform",
  "resolve",
  "beforeHandle",
  "afterHandle",
  "onResponse",
  "mapResponse",
  "trace",
  "error",
  "stop",
  "body",
  "headers",
  "params",
  "query",
  "response",
  "type",
  "detail"
];
var primitiveHookMap = primitiveHooks.reduce(
  (acc, x) => (acc[x] = true, acc),
  {}
);
var isBun = typeof Bun !== "undefined";
var hasHash = isBun && typeof Bun.hash === "function";
var StatusMap = {
  Continue: 100,
  "Switching Protocols": 101,
  Processing: 102,
  "Early Hints": 103,
  OK: 200,
  Created: 201,
  Accepted: 202,
  "Non-Authoritative Information": 203,
  "No Content": 204,
  "Reset Content": 205,
  "Partial Content": 206,
  "Multi-Status": 207,
  "Already Reported": 208,
  "Multiple Choices": 300,
  "Moved Permanently": 301,
  Found: 302,
  "See Other": 303,
  "Not Modified": 304,
  "Temporary Redirect": 307,
  "Permanent Redirect": 308,
  "Bad Request": 400,
  Unauthorized: 401,
  "Payment Required": 402,
  Forbidden: 403,
  "Not Found": 404,
  "Method Not Allowed": 405,
  "Not Acceptable": 406,
  "Proxy Authentication Required": 407,
  "Request Timeout": 408,
  Conflict: 409,
  Gone: 410,
  "Length Required": 411,
  "Precondition Failed": 412,
  "Payload Too Large": 413,
  "URI Too Long": 414,
  "Unsupported Media Type": 415,
  "Range Not Satisfiable": 416,
  "Expectation Failed": 417,
  "I'm a teapot": 418,
  "Misdirected Request": 421,
  "Unprocessable Content": 422,
  Locked: 423,
  "Failed Dependency": 424,
  "Too Early": 425,
  "Upgrade Required": 426,
  "Precondition Required": 428,
  "Too Many Requests": 429,
  "Request Header Fields Too Large": 431,
  "Unavailable For Legal Reasons": 451,
  "Internal Server Error": 500,
  "Not Implemented": 501,
  "Bad Gateway": 502,
  "Service Unavailable": 503,
  "Gateway Timeout": 504,
  "HTTP Version Not Supported": 505,
  "Variant Also Negotiates": 506,
  "Insufficient Storage": 507,
  "Loop Detected": 508,
  "Not Extended": 510,
  "Network Authentication Required": 511
};
var InvertedStatusMap = Object.fromEntries(
  Object.entries(StatusMap).map(([k, v]) => [v, k])
);
function removeTrailingEquals(digest) {
  let trimmedDigest = digest;
  while (trimmedDigest.endsWith("=")) {
    trimmedDigest = trimmedDigest.slice(0, -1);
  }
  return trimmedDigest;
}
var encoder = new TextEncoder();
var signCookie = async (val, secret) => {
  if (typeof val !== "string")
    throw new TypeError("Cookie value must be provided as a string.");
  if (secret === null)
    throw new TypeError("Secret key must be provided.");
  const secretKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const hmacBuffer = await crypto.subtle.sign(
    "HMAC",
    secretKey,
    encoder.encode(val)
  );
  return val + "." + removeTrailingEquals(Buffer.from(hmacBuffer).toString("base64"));
};
var unsignCookie = async (input, secret) => {
  if (typeof input !== "string")
    throw new TypeError("Signed cookie string must be provided.");
  if (null === secret)
    throw new TypeError("Secret key must be provided.");
  const tentativeValue = input.slice(0, input.lastIndexOf("."));
  const expectedInput = await signCookie(tentativeValue, secret);
  return expectedInput === input ? tentativeValue : false;
};
var isNumericString = (message) => {
  if (message.length < 16)
    return message.trim().length !== 0 && !Number.isNaN(Number(message));
  if (message.length === 16) {
    const numVal = Number(message);
    if (numVal.toString() === message)
      return message.trim().length !== 0 && !Number.isNaN(numVal);
  }
  return false;
};

// src/cookies.ts
var Cookie = class {
  constructor(name, jar, initial = {}) {
    this.name = name;
    this.jar = jar;
    this.initial = initial;
  }
  get cookie() {
    if (!(this.name in this.jar))
      return this.initial;
    return this.jar[this.name];
  }
  set cookie(jar) {
    if (!(this.name in this.jar))
      this.jar[this.name] = this.initial;
    this.jar[this.name] = jar;
  }
  get value() {
    return this.cookie.value;
  }
  set value(value) {
    if (!(this.name in this.jar))
      this.jar[this.name] = this.initial;
    this.jar[this.name].value = value;
  }
  get expires() {
    return this.cookie.expires;
  }
  set expires(expires) {
    this.cookie.expires = expires;
  }
  get maxAge() {
    return this.cookie.maxAge;
  }
  set maxAge(maxAge) {
    this.cookie.maxAge = maxAge;
  }
  get domain() {
    return this.cookie.domain;
  }
  set domain(domain) {
    this.cookie.domain = domain;
  }
  get path() {
    return this.cookie.path;
  }
  set path(path) {
    this.cookie.path = path;
  }
  get secure() {
    return this.cookie.secure;
  }
  set secure(secure) {
    this.cookie.secure = secure;
  }
  get httpOnly() {
    return this.cookie.httpOnly;
  }
  set httpOnly(httpOnly) {
    this.cookie.httpOnly = httpOnly;
  }
  get sameSite() {
    return this.cookie.sameSite;
  }
  set sameSite(sameSite) {
    this.cookie.sameSite = sameSite;
  }
  get priority() {
    return this.cookie.priority;
  }
  set priority(priority) {
    this.cookie.priority = priority;
  }
  get secrets() {
    return this.cookie.secrets;
  }
  set secrets(secrets) {
    this.cookie.secrets = secrets;
  }
  update(config) {
    this.cookie = Object.assign(
      this.cookie,
      typeof config === "function" ? config(this.cookie) : config
    );
    return this;
  }
  set(config) {
    this.cookie = Object.assign(
      {
        ...this.initial,
        value: this.value
      },
      typeof config === "function" ? config(this.cookie) : config
    );
    return this;
  }
  remove() {
    if (this.value === void 0)
      return;
    this.set({
      expires: /* @__PURE__ */ new Date(0),
      maxAge: 0,
      value: ""
    });
    return this;
  }
  toString() {
    return typeof this.value === "object" ? JSON.stringify(this.value) : this.value?.toString() ?? "";
  }
};
var createCookieJar = (set, store, initial) => {
  if (!set.cookie)
    set.cookie = {};
  return new Proxy(store, {
    get(_, key) {
      if (key in store)
        return new Cookie(
          key,
          set.cookie,
          Object.assign({}, initial ?? {}, store[key])
        );
      return new Cookie(
        key,
        set.cookie,
        Object.assign({}, initial)
      );
    }
  });
};
var parseCookie = async (set, cookieString, {
  secrets,
  sign,
  ...initial
} = {}) => {
  if (!cookieString)
    return createCookieJar(set, {}, initial);
  const isStringKey = typeof secrets === "string";
  if (sign && sign !== true && !Array.isArray(sign))
    sign = [sign];
  const jar = {};
  const cookies = parse(cookieString);
  for (const [name, v] of Object.entries(cookies)) {
    let value = decodeURIComponent2(v);
    if (sign === true || sign?.includes(name)) {
      if (!secrets)
        throw new Error("No secret is provided to cookie plugin");
      if (isStringKey) {
        const temp = await unsignCookie(value, secrets);
        if (temp === false)
          throw new InvalidCookieSignature(name);
        value = temp;
      } else {
        let decoded = true;
        for (let i = 0; i < secrets.length; i++) {
          const temp = await unsignCookie(value, secrets[i]);
          if (temp !== false) {
            decoded = true;
            value = temp;
            break;
          }
        }
        if (!decoded)
          throw new InvalidCookieSignature(name);
      }
    }
    const start = value.charCodeAt(0);
    if (start === 123 || start === 91)
      try {
        jar[name] = {
          value: JSON.parse(value)
        };
        continue;
      } catch {
      }
    if (isNumericString(value)) {
      jar[name] = {
        value: parseInt(value)
      };
      continue;
    }
    if (value === "true") {
      jar[name] = {
        value: true
      };
      continue;
    }
    if (value === "false") {
      jar[name] = {
        value: false
      };
      continue;
    }
    jar[name] = {
      value
    };
  }
  return createCookieJar(set, jar, initial);
};
export {
  Cookie,
  createCookieJar,
  parseCookie
};
/**
 * @license
 * 
 * MIT License
 * 
 * Copyright (c) 2020 Evgeny Poberezkin
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
