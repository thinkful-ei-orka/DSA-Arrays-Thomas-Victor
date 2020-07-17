const Memory = require('./memory');
const memory = new Memory


class Array {
     constructor() {
          this.length = 0;
          this._capacity = 0;
          this.ptr = memory.allocate(this.length)
     };

     push(value) {
          if (this.length >= this._capacity) {
               this._resize((this.length + 1) * Array.SIZE_RATIO);
          }
     
          memory.set(this.ptr + this.length, value);
          this.length++;
     }

     _resize(size) {
          const oldPtr = this.ptr;
          this.ptr = memory.allocate(size);
          if(this.ptr === null) {
               throw new Error('Out of memory');
          }
          memory.copy(this.ptr, oldPtr, this.length);
          memory.free(oldPtr);
          this._capacity = size;
     }

     get(index) {
          if (index < 0 || index >= this.length) {
               throw new Error('Index error');
          }
          return memory.get(this.ptr = index);
     }

     pop() {
          if (this.length == 0) {
               throw new Error('Index error');
          }
          const value = memory.get(this.ptr + this.length - 1);
          this.length--;
          return value;
     }

     insert(index, value) {
          if (index < 0 || index >= this.length) {
               throw new Error('Index error')
          }
          if (this.length >= this._capacity) {
               this._resize((this.length + 1) * Array.SIZE_RATIO);
          }

          memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
          memory.set(this.ptr + index, value);
          this.length++;
     }

     remove(index) {
          if (index < 0 || index >= this.length) {
               throw new Error('Index error')
          }
          memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1);
          this.length--;
     }
}

function main() {

Array.SIZE_RATIO = 8;

let arr = new Array();

arr.push(6);
arr.push(5);
arr.push(15);
arr.push(19);
arr.push(45);
arr.push(10);
console.log(arr);

arr.pop();
arr.pop();
arr.pop();
console.log(arr)

console.log(arr.get(0));

arr.push('tauhida')
console.log(arr.get(3));

}

function URLify(string) {
     const arr = string.split('');

     const newArr = arr.map(index => {
          if(index === ' ') {
               index = '%20'
          }
          return index;
     })
     console.log(newArr.join(''))
     return newArr.join('')
}

URLify('tauhida parveen');

function filter(arr, num) {
     let newArr = [];
     arr.forEach(el => {
          if (el < num) {
               newArr.push(el)
          }
     })
     console.log(newArr)
     return newArr
}

filter([1, 2, 3, 6, 7, 10], 5);

function max(arr) {
     const sumList = [];
     arr.reduce((acc, callback) => {
          sumList.push(acc + callback)
          return acc + callback
     })

     sumList.sort((x, y) => x < y)
     console.log(sumList[0])
     return sumList[0]
}

max([4, 6, -3, 5, -2, 1])

function merge(arr1, arr2) {
     const arrayMerge= [];
     let indexA = 0;
     let indexB = 0;
     while(arrayMerge.length < (arr1.length + arr2.length)) {
          if(arr1[indexA] < arr2[indexB] || !arr2[indexB]) {
               arrayMerge.push(arr1[indexA]);
               indexA++
          } else {
               arrayMerge.push(arr2[indexB]);
               indexB++
          }
     }
     return arrayMerge;
}

console.log(merge([1, 3, 6, 8, 11, 12], [2, 3, 5, 8, 9, 10, 15]));

function removeChar(string, filter) {
     let stringArray=[];
     let filteredStr = '';
     let filters = [];
     let filteredArray =[];

     for(let i = 0; i < string.length; i++) {
          stringArray.push(string.slice(i, i + 1))
     }
     console.log(stringArray)

     for(let i = 0; i < filter.length; i++) {
          filters.push(filter.slice(i, i + 1))
     }
     console.log(filters)

     for(let i = 0; i < string.length; i++) {
          let counter = 0;
          for(let j = 0; j < filter.length; j++) {
               if (stringArray[i] == filters[j]) {
                    break;
               }
               counter++;
          }
          if (counter == filter.length) {
               filteredArray.push(stringArray[i])
          }
     }

     for(let i = 0; i < filteredArray.length; i++) {
          filteredStr = filteredStr + filteredArray[i]
     }

     console.log(filteredStr)
     return filteredStr
}

// console.log(removeChar('Battle of the Vowels: Hawaii vs. Grozny', 'aeiou'))

function removeCharTwo(string, filter) {
     let newString = '';
     for(let i = 0; i < string.length; i++) {
          let valid = true
          for(let j = 0; j < filter.length; j++) {
               if (string[i] == filter[j]) {
                    valid = false
                    break;
               }
          }
          if (valid) {
               newString += string[i]
          }
     }
     return newString
}

console.log(removeCharTwo('Battle of the Vowels: Hawaii vs. Grozny', 'aeiou'))


function productArray(arr) {
     let newArray = [];
     
     for(let i = 0; i < arr.length; i++) {
          let product = 1;
          for(let j = 0; j < arr.length; j++) {
               if (i !== j) {
                    product *= arr[j]
               }
          }
     newArray.push(product)          
     }

     console.log(newArray)
     return newArray
}

console.log(productArray([1, 3, 9, 4]))

function twoD(arr) {
     let newArr = [];

     for(let i = 0; i < arr.length; i++) {
          let innerArr = [];
          for(let j = 0; j < arr[i].length; j++) {
               innerArr.push(1)
          }
          newArr.push(innerArr)
     }

     console.log(newArr)

     for(let i = 0; i < arr.length; i++) {
          for(let j = 0; j < arr.length; j++) {
               if(arr[i][j] === 0) {
                    for (let k = 0; k < arr[i].length; k++) {
                         newArr[i][k] = 0;
                    }
                    for (let k = 0; k < arr.length; k++) {
                         newArr[k][j] = 0;
                    }
                    
               }
          }
     }
     return newArr
};

const TwoDArr = [[1,0,1,1,0],
[0,1,1,1,0],
[1,1,1,1,1],
[1,0,1,1,1],
[1,1,1,1,1]]

console.log(twoD(TwoDArr))

//compare order of letters moved to the end with the original word based on the number of letters moved?

function rotate(str, str2) {
     if (str.length !== str2.length) {
          return false
     }

     let doubles = str + str;
     // for (let i = 1; i < str.length; i++) {
     //      let slicedString = doubles.slice(i, str.length + i)
     //      if (slicedString === str2) {
     //           return true
     //      }
     // }
     return doubles.includes(str2)
     // return false;
}

console.log(rotate('amazon', 'azonma'))
console.log(rotate('amazon','azonam'))


module.exports = 
     Array,
     main()
