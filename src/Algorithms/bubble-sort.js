export function getBubbleSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    doBubbleSort(auxiliaryArray, animations);
    return animations;
  }

export function doBubbleSort(arr, animations){
    let noSwaps;
    for(let i = arr.length; i > 0; i--){
        noSwaps = true;
        for(let j = 0; j < i-1; j++) {
            if(arr[j] > arr[j+1]){
                animations.push([j, j+1]);
                let num = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = num;
                
                noSwaps = false;
            }
        }
        if(noSwaps) break;
    }
    return arr;
}