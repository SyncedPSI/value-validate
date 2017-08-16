'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verify = exports.validation = undefined;

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  rules
    - 'required'
    - 'email'
    - 'phone'
    - 'number'
    - 'number-gt-#{value}'
    - 'number-it-#{value}'
    - 'number-gts-#{value}'
    - 'number-its-#{value}'
    - 'count-gts-#{value}'
    - 'count-its-#{value}'
*/

function validation(str, rules, cb) {
  var obj = undefined;

  for (var i = 0; i < rules.length; i += 1) {
    if ((0, _isString2.default)(rules[i])) {
      obj = verify(str, rules[i]);
    }

    if ((0, _isObject2.default)(rules[i])) {
      obj = verify(str, rules[i].type, rules[i].msg);
    }

    if (!obj.isPass) break;
  }

  if (cb && typeof cb === 'function') cb(obj);
  return obj;
}

function verify(str, rule, err) {
  var obj = { isPass: true, msg: '验证通过' };

  if (rule === 'required') {
    if (!required(str)) {
      obj = { isPass: false, msg: '' + (err || '不能为空') };
    }
  }

  if (rule === 'email') {
    if (!isEmail(str)) {
      obj = { isPass: false, msg: '' + (err || '请输入正确的邮箱格式！') };
    }
  }

  if (rule === 'number') {
    if (!isNumber(str)) {
      obj = { isPass: false, msg: '' + (err || '请输入一个数字！') };
    }
  }

  if (rule === 'phone') {
    if (!isPhone(str)) {
      obj = { isPass: false, msg: '' + (err || '请输入正确的手机号码！') };
    }
  }

  if (/^number-gt-[0-9]+$/.test(rule)) {
    var value = +rule.match(/[0-9]+/)[0];
    if (!NumberGt(str, value)) {
      obj = { isPass: false, msg: '' + (err || '请输入一个大于' + value + '的值') };
    }
  }

  if (/^number-it-[0-9]+$/.test(rule)) {
    var _value = +rule.match(/[0-9]+/)[0];
    if (!NumberIt(str, _value)) {
      obj = { isPass: false, msg: '' + (err || '请输入一个小于' + _value + '的值') };
    }
  }

  if (/^number-gts-[0-9]+$/.test(rule)) {
    var _value2 = +rule.match(/[0-9]+/)[0];
    if (!NumberGts(str, _value2)) {
      obj = { isPass: false, msg: '' + (err || '请输入一个不小于' + _value2 + '的值') };
    }
  }

  if (/^number-its-[0-9]+$/.test(rule)) {
    var _value3 = +rule.match(/[0-9]+/)[0];
    if (!NumberIts(str, _value3)) {
      obj = { isPass: false, msg: '' + (err || '请输入一个不超过' + _value3 + '的值') };
    }
  }

  if (/^count-gts-[0-9]+$/.test(rule)) {
    var _value4 = +rule.match(/[0-9]+/)[0];
    if (!CountGts(str, _value4)) {
      obj = { isPass: false, msg: '' + (err || '字数不能少于' + _value4) };
    }
  }

  if (/^count-its-[0-9]+$/.test(rule)) {
    var _value5 = +rule.match(/[0-9]+/)[0];
    if (!CountIts(str, _value5)) {
      obj = { isPass: false, msg: '' + (err || '字数不能超过' + _value5) };
    }
  }

  return obj;
}

function required(str) {
  return typeof str !== 'undefined' && str.length > 0;
}

function isEmail(str) {
  if ((0, _isEmpty2.default)(str)) return true;
  var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  return reg.test(str);
}

function isNumber(str) {
  if ((0, _isEmpty2.default)(str)) return true;
  var reg = /^[0-9]+$/;
  return reg.test(str);
}

function isPhone(str) {
  if ((0, _isEmpty2.default)(str)) return true;
  return (/^1\d{10}$/.test(str)
  );
}

function NumberGt(str, value) {
  if ((0, _isEmpty2.default)(str)) return true;
  return +str > value;
}

function NumberIt(str, value) {
  if ((0, _isEmpty2.default)(str)) return true;
  return +str < value;
}

function NumberGts(str, value) {
  if ((0, _isEmpty2.default)(str)) return true;
  return +str >= value;
}

function NumberIts(str, value) {
  if ((0, _isEmpty2.default)(str)) return true;
  return +str <= value;
}

function CountGts(str, value) {
  if ((0, _isEmpty2.default)(str)) return true;
  return str.toString().length >= value;
}

function CountIts(str, value) {
  if ((0, _isEmpty2.default)(str)) return true;
  return str.toString().length <= value;
}

exports.validation = validation;
exports.verify = verify;
