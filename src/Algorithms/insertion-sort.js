export function getInsertionSortAnimations(array){
    const animations = [];
    if(array.length <= 1) return array;
    const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
  if (arraysAreEqual(javaScriptSortedArray, array)) return animations;
    const auxiliaryArray = array.slice();
    doInsertionSort(auxiliaryArray, animations);
    
    return animations;
}

function arraysAreEqual(arrOne,arrTwo){
    if(arrOne !== arrTwo ) return false;
    for(let i=0; i < arrOne.lenght; i++){
        if(arrOne[i] !== arrTwo[i]){
            return false;
        }
    }
    return true;
}

export function doInsertionSort(arr, animations) {
    let currentVal;
    for(var i = 1; i < arr.length; i++ ){
        currentVal = arr[i];
        for(var j = i -1; j >= 0 && arr[j] > currentVal; j--){
            animations.push([j+1, arr[j]]);
            arr[j+1] = arr[j]    
        }
        animations.push([j+1,currentVal]);
        arr[j+1] = currentVal;
    }
    return arr;
}