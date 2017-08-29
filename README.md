## value-validate
[![npm](https://img.shields.io/npm/v/npm.svg?style=flat-square)](https://www.npmjs.com/package/value-validate)

Verify that a value matches the rules.

###Install
```bash
$ npm install value-validate --save
# or
$ yarn add value-validate
```
###Usage

```javascript
import { validation } from 'value-validate';

/**
 *
 * @param  {String}         value   String that need to be validated
 * @param  {Object|String}  rules   Validation rules
 */

validation(
  'cedcn@qq.com',
  ['required', { type: 'email', msg: 'Please input the correct email format!'}],
  result => console.log(result);
);
```

####Rules
+ `required`
+ `email`
+ `phone`
+ `number`
+ `number-gt-#{number}`
+ `number-lt-#{number}`
+ `number-gts-#{number}`
+ `number-lts-#{number}`
+ `count-gts-#{value}`
+ `count-lts-#{value}`

####Callback

 *retrun* { isPass: [Bool], mag: [String] }
