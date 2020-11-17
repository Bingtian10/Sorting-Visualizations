var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#34626c";
// ctx.fillRect(0, 0, 5, 300);

var arr = [];
let len = 100;
let w = canvas.width;
let h = canvas.height;
var time = 0;
generate();
let firstVisit = true;
const form = document.querySelector('form');
form.addEventListener('submit', function(){
  event.preventDefault();
  let sort = document.querySelector('form select').value;
  if(!firstVisit) {
    generate();
  }
  switch (sort) {
    case "MergeSort":
      mergeSort(arr, 0, len-1);
      break;
    case "InsertionSort":
      insertionSort(arr);
      break;
    case "BubbleSort":
      bubbleSort(arr);
      break;
    default:
      console.log("Unknown sort name error");
  }
  console.log(arr);
  time = 0;
  firstVisit = false;
});

function generate() {
  arr = [];
  for(let i = 0; i < len; i++) {
    let randNum = Math.floor(Math.random() * 100);
    ctx.clearRect(i*5, 0, 5, h);
    ctx.fillRect(i*5, h-randNum, 5, randNum);
    arr.push(randNum);
  }
}
function mergeSort(nums, l, h) {
  if(l < h) {
    let mid = Math.floor((l+h)/2);
    mergeSort(nums, l, mid);
    mergeSort(nums, mid+1, h);
    merge(nums, l, mid, h);
    for(let i = l; i <= h; i++) {
      setTimeout(drawArrElement, time, i, nums[i]);
      time += 15;
    }
  }
}

function merge(nums, l, m, h) {
  let n1 = m - l + 1;
  let n2 = h - m;

  let arr1 = [];
  let arr2 = [];

  for(let i = 0; i < n1; i++) {
    arr1.push(nums[l+i]);
  }

  for(let i = 0; i < n2; i++) {
    arr2.push(nums[m+1+i]);
  }

  let i = 0;
  let j = 0;

  for(var k = l; k <= h; k++) {
    if(i === n1) {
      nums[k] = arr2[j];
      j++;
    }

    else if(j === n2) {
      nums[k] = arr1[i];
      i++;
    }

    else {
      if(arr1[i] <= arr2[j]){
        nums[k] = arr1[i];
        i++;
      }
      else {
        nums[k] = arr2[j];
        j++;
      }
    }
  }
}

function drawArrElement(pos, num) {
  ctx.clearRect(pos*5, 0, 5, h);
  ctx.fillRect(pos*5, h-num, 5, num);
}

function insertionSort(nums) {
  for(let i = 1; i < nums.length; i++) {
    let temp = nums[i];
    let j = i-1;
    while(j >= 0 && nums[j] > temp) {
      nums[j+1] = nums[j];
      setTimeout(drawArrElement, time, j+1, nums[j+1]);
      time += 10;
      j--;
    }
    nums[j+1] = temp;
    setTimeout(drawArrElement, time, j+1, nums[j+1]);
    time += 10;
  }
}

function bubbleSort(nums) {
  for(let i = 0; i < nums.length; i++) {
    for(let j = nums.length-1; j > i; j--) {
      //Out of order, swap them
      if(nums[j-1] > nums[j]) {
        let temp = nums[j];
        nums[j] = nums[j-1];
        nums[j-1] = temp;
        setTimeout(drawArrElement, time, j-1, nums[j-1]);
        time += 10;
        setTimeout(drawArrElement, time, j, nums[j]);
        time += 10;
      }
    }
  }
}
