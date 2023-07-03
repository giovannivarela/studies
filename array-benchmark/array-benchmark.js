/*
    Theory: arrays in javascript are always sparse populated when declared with []
    but can be tight populated when declared with 'new Array'.

    This test serves to ensure that the different ways of declare a array has no
    effect on it's allocation in memory.

    Result: Seems like different approaches to array instatiation do generate better allocated
    arrays memory-wise. The best one beign '[...Array(size)]'.
    The explanation to that fact is not present in any post, article or video that I could find
    and should be something related to V8 but that is just a guess.
*/

const arraySize = 100000000

function generateLiteralArray() {
    let literalArray = []
    for(let i = 0; i < arraySize; i++) {
        literalArray.push(Math.random() * (10 - 0) + 0);
    }
    return literalArray;
}

function generateDeclarativeArray() {
    let literalArray = new Array(arraySize)
    for(let i = 0; i < arraySize; i++) {
        literalArray[i] = Math.random() * (10 - 0) + 0;
    }
    return literalArray;
}

function generateSecondDeclarativeArray() {
    let declarativeArray = new Array(arraySize).fill(0);
    return declarativeArray.map(x => Math.random() * (10 - 0) + 0);
}

function generateThirdDeclarativeArray() {
    let declarativeArray = Array.apply(null, {length: arraySize});
    return declarativeArray.map(x => Math.random() * (10 - 0) + 0);
}

function generateFourthDeclarativeArray() {
    let declarativeArray = Array.apply(null, Array(arraySize));
    return declarativeArray.map(x => Math.random() * (10 - 0) + 0);
}

function generateSecondLiteralArray() {
    let declarativeArray = [...Array(100)];
    return declarativeArray.map(x => Math.random() * (10 - 0) + 0);
}

function generateFifthDeclarativeArray() {
    let declarativeArray = Array.from({ length: arraySize });
    return declarativeArray.map(x => Math.random() * (10 - 0) + 0);
}

function TraverseTime(array) {
    let start = Date.now()
    console.log("Start time: ", start)
    for(let i = 0; i < arraySize; i++) {
        if(array[i] < 4) array[i] = 0
    }
    console.log("Duration: ", Date.now() - start);
    array.length = 0;
};

let isSparse = a => !!a.reduce(x=>x-1,a.length)

try {
    console.log("Literal array([]): ");
    let testArray1 = generateLiteralArray()
    console.log(isSparse(testArray1));
    TraverseTime(testArray1);
} catch (e) {
    console.log(e)
}
try {
    console.log("Declarative array(new Array()): ");
    let testArray2 = generateDeclarativeArray()
    TraverseTime(testArray2);
} catch (e) {
    console.log(e)
}
try {
    console.log("Declarative array(new Array().fill): ");
    let testArray3 = generateSecondDeclarativeArray()
    TraverseTime(testArray3);
} catch (e) {
    console.log(e)
}
try {
    console.log("Declarative array(Array.apply(null, {length})): ");
    let testArray4 = generateThirdDeclarativeArray()
    TraverseTime(testArray4);
} catch (e) {
    console.log(e)
}
try {
    console.log("Declarative array(Array.apply(null, Array())): ");
    let testArray5 = generateFourthDeclarativeArray()
    TraverseTime(testArray5);
} catch (e) {
    console.log(e)
}
try {
    console.log("Declarative array([...Array(100)]): ");
    let testArray6 = generateSecondLiteralArray()
    console.log(isSparse(testArray6));
    TraverseTime(testArray6);
} catch (e) {
    console.log(e)
}
try {
    console.log("Declarative array(Array.from({length})): ");
    let testArray7 = generateFifthDeclarativeArray()
    TraverseTime(testArray7);
} catch (e) {
    console.log(e)
}