export function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
  if (arraysAreEqual(javaScriptSortedArray, array)) return animations;
    const auxiliaryArray = array.slice();
    doQuickSort(auxiliaryArray, 0 , auxiliaryArray.length-1, animations);
    
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

function pivot(arr,start= 0, end = arr.length-1, animations) {

    const swap = (arr,n1,n2) =>{
        [arr[n1], arr[n2]] = [arr[n2], arr[n1]];
    }

    let pivotno = arr[start];
    let swapIdx = start;
   
    for(let i= start+1; i <= end; i++){
        if(pivotno > arr[i]){
            swapIdx++;    
           animations.push([swapIdx, i])
            swap(arr,swapIdx, i);
        } 
    }
    animations.push([start, swapIdx]);
    swap(arr, start, swapIdx);
    return swapIdx; 
}
export function doQuickSort(arr, left = 0, right = arr.length-1,animations) {
    if(left < right ){
        let pivotIndex = pivot(arr, left, right, animations);
        doQuickSort(arr, left, pivotIndex - 1, animations);
        doQuickSort(arr, pivotIndex + 1, right, animations);
    }
    return arr;

}