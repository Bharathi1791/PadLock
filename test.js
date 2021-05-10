const assert =  require('assert');
const lock = require('./padlock');

describe('Lock function', () => {
  it('Check lock open with incorrect code:', () => {
    assert.strictEqual('locked', lock.status());
    lock.digit(1);
    lock.digit(1);
    lock.digit(5);
    lock.digit(3);
    lock.digit(4);
    assert.strictEqual('locked', lock.status());
  });
  it('Check lock open with correct code:', () => {
    assert.strictEqual('locked', lock.status());
    lock.digit(1);
    lock.digit(2);
    lock.digit(3);
    lock.digit(4);
    assert.strictEqual('open', lock.status());
  });
  it('Check lock with incorrect reset code:', () => {
    assert.strictEqual('open', lock.status());
    lock.digit(9);
    lock.digit(8);
    assert.strictEqual('locked', lock.status());
  });
  it('Check lock with correct code again:', () => {
    assert.strictEqual('locked', lock.status());
    lock.digit(1);
    lock.digit(2);
    lock.digit(3);
    lock.digit(4);
    assert.strictEqual('open', lock.status());
  });
  it('Check lock with incorrect reset code:', () => {
    assert.strictEqual('open', lock.status());
    lock.digit(9);
    assert.strictEqual('locked', lock.status());
    lock.digit(9);
    lock.digit(9);
    lock.digit(9);
    assert.strictEqual('locked', lock.status());
  });
  it('Reset Lock code:', () => {
    assert.strictEqual('locked', lock.status());
    lock.digit(5);
    lock.digit(6);
    lock.digit(7);
    lock.digit(8);
    assert.strictEqual('locked', lock.status());
  });
  it('Check lock with newly updated code', () => {
    assert.strictEqual('locked', lock.status());
    lock.digit(5);
    lock.digit(6);
    lock.digit(7);
    lock.digit(8);
    assert.strictEqual('open', lock.status());
  });
  it('Check with old lock code', () => {
    assert.strictEqual('open', lock.status());
    lock.digit(1);
    lock.digit(2);
    lock.digit(3);
    lock.digit(4);
    assert.strictEqual('locked', lock.status());
  });
});

