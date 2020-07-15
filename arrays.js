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

module.exports = 
     Array,
     main()
