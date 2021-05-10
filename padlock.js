let lockStatus = "locked";
let lockCode = [1, 2, 3, 4];
let resetCode = [9, 9, 9, 9];
let iputCode = [];
let isResetLockCode = false;
let mode = 0; // 0: lock, 1: reset

function checkCode(code, correctCode) {
  if (code === correctCode[0] && iputCode.length === 0) {
    if(correctCode === resetCode) {
      lockStatus = "locked";
    }
    iputCode.push(code);
  } else if (iputCode.length >= 1) {
    if (code === correctCode[iputCode.length]) {
      iputCode.push(code);
    } else {
      lockStatus = "locked";
      mode = 0;
      iputCode = [];
      if (code === correctCode[0]) {
        iputCode.push(code)
      }
    }
  } else if(lockStatus === "open") {
    lockStatus = "locked";
    mode = 0;
    iputCode = [];
  }
}

function checkLockStatus() {
  if (JSON.stringify(lockCode) === JSON.stringify(iputCode)) {
    lockStatus = "open";
    mode = 1;
    iputCode = [];
  }
}

function checkResetStatus() {
  if (JSON.stringify(resetCode) === JSON.stringify(iputCode)) {
    isResetLockCode = true;
    mode = 1;
    iputCode = [];
  }
}

function digit(code) {
  if (isResetLockCode === false) {
    mode === 0 ? checkCode(code, lockCode) : checkCode(code, resetCode);
  } else if (isResetLockCode === true) {
    iputCode.push(code)
    if (iputCode.length === 4) {
      if (JSON.stringify(lockCode) !== JSON.stringify(iputCode)) {
        lockCode = iputCode;
      }
      lockStatus = "locked";
      mode = 0;
      isResetLockCode = false;
      iputCode = [];
    }
  }
}

function status() {
  mode === 0 ? checkLockStatus() : checkResetStatus();
  return lockStatus;
}

module.exports.status = status;
module.exports.digit = digit;


