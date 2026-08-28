class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arr) {
        this.root = buildTree(arr);
    }
}

function buildTree(arr) {
    let sorted = arr.sort((a, b) => a - b);

    let deduplicated = [];

    sorted.forEach(item => {
        if (item !== deduplicated.at(-1)) {
            deduplicated.push(item);
        }
    })

    return deduplicated;
}

let t = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

console.log(t)