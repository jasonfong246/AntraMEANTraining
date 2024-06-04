/* 1. find the most frequently occurring number  */
const findHighestFreq = (arr) => {
    let arrMap = new Map();
    for(key of arr){
        if(arrMap.has(key)){
            arrMap.set(key,arrMap.get(key)+1);
        }else{
            arrMap.set(key,1);
        }
    }
    let maxFreq = 0;
    let maxKey = null;
    for (let [key, val] of arrMap) {
        if (val > maxFreq) {
            maxFreq = val;
            maxKey = key;
        }
    }

    return maxFreq + ": " + "has "+maxFreq+" of "+ maxKey;
};
/* test */
const arr1 = [...'317111'];
console.log('findHighestFreq: ', findHighestFreq(arr1)); // 4: has 4 of 1

/*
  2. get the absolute difference between two digonal |(1+5+9)-(3+5+9)| = 2
*/
const getDiffBetweenDigonal = (matrix) => {
    let val1=0;
    let val2=0;
    for(let i =0;i<matrix.length;i++){
        val1 += matrix[i][i];
        val2 += matrix[i][matrix.length-1-i];
    }
    return Math.abs(val1-val2);
};
// /* test */
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [9, 8, 9],
];
console.log('getDiffBetweenDigonal: ', getDiffBetweenDigonal(matrix));

/* 3. Count the number of 3 as digit in all numbers from 0 to 50. */
const find3 = (start, end) => {
    let count=0;
    for(let i=0; i<=50;i++){
        let check = i.toString();
        for(let n =0; n<check.length;n++){
            if(check[n]=='3'){
                count++;
            }
        }
    }
    
    return count;
};
/* test */
console.log('find3: ', find3(0, 50)); // 15

/* 4. give a string “cvs health”, change it to “Cvs Health” */
const capitalFirstLetter = (str) => {
    let words = str.split(" ")
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].slice(1);  
    }
    return words.join(" ");
};

/* test */
const str2 = 'cvs health';
console.log('capitalFirstLetter: ', capitalFirstLetter(str2));

/*
  5. give a str: wave
  Output: ["Wave", "wAve", "waVe", "wavE"]
*/
const capEachCharInStr = (str) => {
    let arr=[];
    for(let i=0; i<str.length;i++){
        let chars = str.split('');
        chars[i] = chars[i].toUpperCase(); 
        arr.push(chars.join('')); 
    }
    return arr;
}
/* test */
const str3 = 'wave';
console.log('capEachCharInStr: ', capEachCharInStr(str3));

/*
  6. give a string, only have (){}[], create a function check if the string is valid
*/
const isValid = (str) => {
    const stack = [];
    const map = {
        '(': ')',
        '{': '}',
        '[': ']'
    };
    for (let char of str) {
        if (map[char]) {
            stack.push(map[char]);
        } else if (stack.length > 0 && stack[stack.length - 1] === char) {
            stack.pop();
        } else {
            return false;
        }
    }
    return stack.length === 0;
};
/* test */
console.log('isValid: ', isValid('()[{}{}]')); // true

/* 7. Fibonacci */
const fibonacci = num => {  
    let fib1 =0;
    let fib2 =1;
    let temp =0;
    while(num >= 0){
        temp = fib1;
        fib1 += fib2;
        fib2 = temp;
        num--;
    }
    return fib2;
  // for loop
}
// const fibonacci = (num) => {
//   // recursion
//if(num==0){
//    return 0;
//}else if(num==1){
//   return 1;
//}else{
//    return fibonacci(num-1) +fibonacci(num-2);
//}
// }
/* test */
console.log('fibonacci: ', fibonacci(4));

/* 8. looking for most close 3 numbers to the target */
const givenArr = [45, 45, 32, 55, 16, 25, 74, 22, 13, 27, 41];
function findCloseNums(givenNum, givenArr, find) {
    let map = new Map();
    for(let i =0; i<givenArr.length;i++){
        map.set(givenArr[i],Math.abs(givenArr[i]-givenNum));
    }
    let mapArray = Array.from(map);
    let sortedArray = mapArray.sort((a, b) => a[1] - b[1]);
    let closestNums = sortedArray.slice(0, find).map(pair => pair[0]);

    return closestNums;
}
console.log('findCloseNums: ', findCloseNums(30, givenArr, 3)); //[32, 27, 25];

/* 9. given the out string length, and how many char you have to use, create a function to generate the random string */
/*
  @param [number, number] N, K
  @return [string]
*/
function createRandomStr(N, K) {
    const chars = 'abcdefghijklmnopqrstuvwxyz'.split('').slice(0,K);
    let str="";
    for (let i=0;i<N;i++){
        str += chars[Math.floor(Math.random() * K)]
    }
    return str;
}
console.log('createRandomStr: ', createRandomStr(8, 3)); // acbaabca


/* 10. sort the array by the given sequence */
function sortBySeq(arr, sqs) {
    let order = [];
    for (let i = 0; i < sqs.length; i++) {
        order[sqs[i]] = i;
    }
    return arr.sort((a, b) => order[a] - order[b]);
}
const sqs = 'qwertyuiopasdfghjklzxcvbnm';
console.log('sortBySeq: ', sortBySeq([...'hello'], sqs));  // ["e", "o", "h", "l", "l"];
