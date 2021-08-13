import { get as dotPropGet } from 'dot-prop';

const arrayify = x => Array.isArray(x) ? x : [x];

function compareFunc(prop) {
  return (a, b) => {
    let ret = 0;

    arrayify(prop).some(el => {
      let x;
      let y;

      if (typeof el === 'function') {
        x = el(a);
        y = el(b);
      } else if (typeof el === 'string') {
        x = dotPropGet(a, el);
        y = dotPropGet(b, el);
      } else {
        x = a;
        y = b;
      }

      if (x === y) {
        ret = 0;
        return;
      }

      if (typeof x === 'string' && typeof y === 'string') {
        ret = x.localeCompare(y);
        return ret !== 0;
      }

      ret = x < y ? -1 : 1;
      return true;
    });

    return ret;
  };
}

export default compareFunc;
