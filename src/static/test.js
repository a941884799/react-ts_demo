const data = [1, [2, [[3, 4], 5], 6], 7];

function flat(data, result) {
  data.reduce((arr, item) => {
    if (Array.isArray(item)) {
      flat(item, arr);
    } else {
      arr.push(item);
    }
    return arr;
  }, result);
  return result;
}

const result = [];
flat(data, result);
console.log(result);
