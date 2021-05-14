export function findIndex(arr, key, val) {
  let index = -1
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] == val) {
      index = i
      break
    }
  }
  return index
}

function _withSonArr(arr, parentItem, parentKey, key) {
  let returnArr = [];
  arr.forEach(item => {
    if (item[parentKey] == parentItem[key]) {
      let sonArr = _withSonArr(arr, item, parentKey, key);
      returnArr.push(item);
      returnArr = [...returnArr, ...sonArr];
    }
  })
  return returnArr;
}

//递归过滤数据
export function filterWithArr(arr, parentItem, parentKey, key) {
  let arrTemp = [];
  if (arr) {
    arrTemp = _withSonArr(arr, parentItem, parentKey, key);
  }

  return arrTemp
}
