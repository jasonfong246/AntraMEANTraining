//filter test
Array.prototype.myFilter = function (cb){
    const arr=[];
    for(let i = 0; i < this.length; i++){
        if(cb(this[i], i, this)){
            arr.push(this[i]);
        }
    }
    return arr;
}

// filter test
const words = ['spray', 'elite', 'exuberant', 'destruction', 'present'];
const result = words.filter((word) => word.length > 6);
console.log(result);
// Expected output: Array ["exuberant", "destruction", "present"]

/////////////////////////////////////////////////////////////////////////////////////////
//map
Array.prototype.myMap = function (cb) {
    const arr = [];
    for(let i = 0; i < this.length; i++){
        arr.push(cb(this[i], i, this));
    }
    return arr;
}

// map test
const array2 = [1, 4, 9, 16];
// Pass a function to map
const map1 = array2.map((x) => x * 2);
console.log(map1);
// Expected output: Array [2, 8, 18, 32]

/////////////////////////////////////////////////////////////////////////////////////////
//includes test
Array.prototype.myIncludes = function(search,from){
    const fromIndex = from == undefined?0 : from;
    let val = false;
    for(let i =fromIndex; i< this.length;i++){
        if(this[i]=== search){
            val= true;
        }
    }
    return val;
}
const array1 = [1, 2, 3];

console.log(array1.includes(2));
// Expected output: true
const pets = ['cat', 'dog', 'bat'];
console.log(pets.includes('cat'));
// Expected output: true
console.log(pets.includes('at'));
// Expected output: false

/////////////////////////////////////////////////////////////////////////////////////////
//indexOf test
Array.prototype.myIndexOf = function(seach,from){
    const fromIndex = from == undefined?0 : from;
    let val =0;
    for (let i =fromIndex ; i<this.length;i++){
        if(this[i]=search){
            val=i;
        }
    }
    return val;
}

const beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];
console.log(beasts.indexOf('bison'));
// Expected output: 1
// Start from index 2
console.log(beasts.indexOf('bison', 2));
// Expected output: 4
console.log(beasts.indexOf('giraffe'));
// Expected output: -1


/////////////////////////////////////////////////////////////////////////////////////////
//reduce test
Array.prototype.myReduce = function(arr, initial){
    const initialVal= initial == undefined?0 : initial;
    let total =initial;
    for(let i = 0;i<this.length;i++){
        total = arr(total, this[i], i, this);
    }
    return total;
}

// test
const array3 = [1, 2, 3, 4];
// 0 + 1 + 2 + 3 + 4
const initialValue = 2;
const sumWithInitial = array3.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  initialValue,
);
console.log("Reduce:" + sumWithInitial);
// Expected output: 10

/////////////////////////////////////////////////////////////////////////////////////////
//slice test
Array.prototype.mySlice = function(start, end=this.length){
    const startIndex= start == undefined? 0 : start;
    const endIndex = end == undefined? this.length : end;
    let arr =[];
    for(let i =startIndex; i<endIndex;i++){
        arr.push(this[i]);
    }
    return arr;
}
//test
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
console.log(animals.mySlice(2));

/////////////////////////////////////////////////////////////////////////////////////////
//splice test
Array.prototype.mySplice = function (start,deleteCount, ...item){
    let val;
    let newArr=[];
    const deleteIndex= deleteCount == undefined? 0 : deleteCount;
    for(let i =0; i<this.length;i++){
        if(i==start){
            newArr = newArr.concat(...item);
            if(deleteIndex>0){
                val = this[i];
            }else{
                newArr.push(this[i]);
            }
        }else{
            newArr.push(this[i]);
        }
    }
    for(let j=0;j<newArr.length;j++){
        this[j]=newArr[j];
    }
    return val;
}
const animals1 = ['ant', 'bison', 'camel', 'duck', 'elephant'];
console.log(animals1.mySplice(0,0,'jason','fong'));
console.log(animals1);
