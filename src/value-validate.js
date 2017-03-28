import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import isEmpty from 'lodash/isEmpty';

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
*/

function validation(str, rules, cb) {
  let obj;

  for (let i = 0; i < rules.length; i += 1) {
    if (isString(rules[i])) {
      obj = verify(str, rules[i]);
    }

    if (isObject(rules[i])) {
      obj = verify(str, rules[i].type, rules[i].msg);
    }

    if (!obj.isPass) break;
  }

  if (cb && typeof cb === 'function') cb(obj);
  return obj;
}


function verify(str, rule, err) {
  let obj = { isPass: true, msg: '验证通过' };

  if (rule === 'required') {
    if (!required(str)) {
      obj = { isPass: false, msg: `${err || '不能为空'}` };
    }
  }

  if (rule === 'email') {
    if (!isEmail(str)) {
      obj = { isPass: false, msg: `${err || '请输入正确的邮箱格式！'}` };
    }
  }

  if (rule === 'number') {
    if (!isNumber(str)) {
      obj = { isPass: false, msg: `${err || '请输入一个数字！'}` };
    }
  }

  if (rule === 'phone') {
    if (!isPhone(str)) {
      obj = { isPass: false, msg: `${err || '请输入正确的手机号码！'}` };
    }
  }

  if (/^number-gt-[0-9]+$/.test(rule)) {
    const value = +rule.match(/[0-9]+/)[0];
    if (!NumberGt(str, value)) {
      obj = { isPass: false, msg: `${err || `请输入一个大于${value}的值`}` };
    }
  }

  if (/^number-it-[0-9]+$/.test(rule)) {
    const value = +rule.match(/[0-9]+/)[0];
    if (!NumberIt(str, value)) {
      obj = { isPass: false, msg: `${err || `请输入一个小于${value}的值`}` };
    }
  }

  if (/^number-gts-[0-9]+$/.test(rule)) {
    const value = +rule.match(/[0-9]+/)[0];
    if (!NumberGts(str, value)) {
      obj = { isPass: false, msg: `${err || `请输入一个不小于${value}的值`}` };
    }
  }

  if (/^number-its-[0-9]+$/.test(rule)) {
    const value = +rule.match(/[0-9]+/)[0];
    if (!NumberIts(str, value)) {
      obj = { isPass: false, msg: `${err || `请输入一个不超过${value}的值`}` };
    }
  }

  return obj;
}


function required(str) {
  return (typeof str !== 'undefined') && str.length > 0;
}

function isEmail(str) {
  if (isEmpty(str)) return true;
  const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  return reg.test(str);
}

function isNumber(str) {
  if (isEmpty(str)) return true;
  const reg = /^[0-9]+$/;
  return reg.test(str);
}

function isPhone(str) {
  if (isEmpty(str)) return true;
  return /^1\d{10}$/.test(str);
}

function NumberGt(str, value) {
  if (isEmpty(str)) return true;
  return +str > value;
}

function NumberIt(str, value) {
  if (isEmpty(str)) return true;
  return +str < value;
}

function NumberGts(str, value) {
  if (isEmpty(str)) return true;
  return +str >= value;
}

function NumberIts(str, value) {
  if (isEmpty(str)) return true;
  return +str <= value;
}


export { validation, verify };
