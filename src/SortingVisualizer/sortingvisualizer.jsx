import React from 'react';
import {getMergeSortAnimations} from '../Algorithms/merge-sort';
import {getBubbleSortAnimations} from '../Algorithms/bubble-sort';
import {getQuickSortAnimations} from '../Algorithms/quick-sort';
import {getInsertionSortAnimations} from '../Algorithms/insertion-sort';
import './sortingvisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 3;

// Change this value for the number of bars (value) in the array.
// const NUMBER_OF_ARRAY_BARS = 190;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';



export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray(90);
  }

  resetArray(num) {
    const array = [];
    for (let i = 0; i < num ; i++) {
      array.push(randomIntFromInterval(5, 600));
    }
    this.setState({array});
    const arrayBars = document.getElementsByClassName("array-bar");
    var arrayLength = arrayBars.length;
    for (let j = 0; j < arrayLength; j++) {
      var jBarStyle = arrayBars[j].style;
      jBarStyle.backgroundColor = PRIMARY_COLOR;
    }
  }
  
  handleChange(evt) {
    
    this.resetArray(Math.floor((parseInt(evt.target.value ) + 3 ) * 1.65));
  }

  

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    console.log(animations);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS); 
        
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
         
        }, i * ANIMATION_SPEED_MS);
      }
      
    }
  }

  quickSort() {
    const array = this.state.array;
    const animations = getQuickSortAnimations(array);
    console.log(animations);
    const arrayBars = document.getElementsByClassName("array-bar");
    for(let i = 0; i < animations.length; i++){
      setTimeout(() => {
      let [Old,New ] = animations[i];

      let oldBarStyle = arrayBars[Old].style;
      let newBarStyle = arrayBars[New].style;

      let num = array[Old];
      array[Old] = array[New];
      array[New] = num; 

      oldBarStyle.height = `${array[Old]}px`;
      newBarStyle.height = `${array[New]}px`;

      }, i * ANIMATION_SPEED_MS)
    }

    }

  insertionSort() {
    const array = this.state.array;
    const animations = getInsertionSortAnimations(array);
    console.log(animations);
    const arrayBars = document.getElementsByClassName("array-bar");
    for(let i = 0; i < animations.length; i++){
      setTimeout(() => {
      let [Old, New ] = animations[i];

      let oldBarStyle = arrayBars[Old].style;
      
      array[Old] = New;  

      oldBarStyle.height = `${array[Old]}px`;
      

      }, i * ANIMATION_SPEED_MS)
    }
  }

  bubbleSort() {
    const array = this.state.array
    const animations = getBubbleSortAnimations(array);
    console.log(animations);
    const arrayBars = document.getElementsByClassName("array-bar");
    
    for(let i=0; i < animations.length; i++ ){
      setTimeout(() => {
      
      let [Old,New ] = animations[i];

      let oldBarStyle = arrayBars[Old].style;
      let newBarStyle = arrayBars[New].style;

      let num = array[Old];
      array[Old] = array[New];
      array[New] = num; 

      oldBarStyle.height = `${array[Old]}px`;
      newBarStyle.height = `${array[New]}px`;

    
      // oldBarStyle.backgroundColor = SECONDARY_COLOR;
      // newBarStyle.backgroundColor = PRIMARY_COLOR;

     
      // var currentPosition = Old;
      // for (let j = 0; j < currentPosition; j++) {
      //   var jBarStyle = arrayBars[j].style;
      //   jBarStyle.backgroundColor = PRIMARY_COLOR;
      // }
      // if(i = animations.length-1){
      //   arrayBars.backgroundColor = PRIMARY_COLOR;
      // }
    }, i * ANIMATION_SPEED_MS)
    }
  
  }


  // NOTE: This method will only work if your sorting algorithms actually return
  // the sorted arrays; if they return the animations (as they currently do), then
  // this method will be broken.


  // testSortingAlgorithms() {
  //   for (let i = 0; i < 100; i++) {
  //     const array = [];
  //     const length = randomIntFromInterval(1, 1000);
  //     for (let i = 0; i < length; i++) {
  //       array.push(randomIntFromInterval(-1000, 1000));
  //     }
  //     const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
  //     // const mergeSortedArray = getMergeSortAnimations(array.slice());
  //     // const bubbleSortedArray = doBubbleSort(array.slice());
  //     // const quickSortedArray = doQuickSort(array.slice());
  //     const InsertionSortArray = doInsertionSort(array.slice());
  //     console.log(arraysAreEqual(javaScriptSortedArray, InsertionSortArray));
  //   }
  // }

  render() {
    const {array} = this.state;


    return (
      <div >
        <div className="buttons">
        
        <input
          id="changeSize"
          type="range"
          min="5"
          max="100"
          style={{cursor: "pointer"}}
          // disabled={isRunning ? "disabled" : null}
          onChange={this.handleChange}
        />
        <button className="reset" onClick={() => this.resetArray(array.length)} >Generate New Array</button>
        <div className='line'></div>
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
        <button onClick={() => this.quickSort()}>Quick Sort</button>
        <button onClick={() => this.insertionSort()}>Insertion Sort</button>
        {/* <button onClick={() => this.testSortingAlgorithms()}>
          Test Sorting Algorithms (BROKEN)
        </button> */}
        </div> 

      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}></div>
        ))}
        
      </div> 
      
      </div>
      
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}




