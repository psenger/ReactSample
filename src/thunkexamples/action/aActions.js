/**
 * Created by psenger on 7/24/16.
 */

export function goRedit() {
  return new Promise(function(reject,resolve){
    setTimeout(() => {
      resolve(true);
    }, 100);
  });
}

// These are the normal action creators you have seen so far.
// The actions they return can be dispatched without any middleware.
// However, they only express “facts” and not the “async flow”.

export function AA(aValue) {
  return {
    type: 'AA',
    value: aValue
  };
}

export function BB(aValue) {
  return {
    type: 'BB',
    value: aValue
  };
}

export function ONEONE(aValue) {
  return {
    type: '11',
    value: aValue
  };
}

export function TWOTWO(aValue) {
  return {
    type: '22',
    value: aValue
  };
}
