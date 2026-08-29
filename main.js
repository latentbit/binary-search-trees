class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arr) {
        this.root = this.buildTree(Tree.#sanitizeArray(arr));
    }

    static #sanitizeArray(arr) {
        let sorted = arr.sort((a, b) => a - b);

        let deduplicated = [];

        sorted.forEach(item => {
            if (item !== deduplicated.at(-1)) {
                deduplicated.push(item);
            }
        })

        return deduplicated;
    }
    
    buildTree(arr) {
        if (arr.length === 0) return null;
        if (arr.length === 1) return new Node(arr[0]);

        const mid = Math.floor((arr.length - 1) / 2);
        let root = new Node(arr[mid]);

        root.left = this.buildTree(arr.slice(0, mid));
        root.right = this.buildTree(arr.slice(mid + 1));
        
        return root;
    }

    includes(value, root = this.root) {
        if (!root) return false;

        if (value === root.value) {
            return true;
        } else if (value < root.value) {
            return this.includes(value, root.left);
        } else if (value > root.value) {
            return this.includes(value, root.right);
        }
    }
}



let t = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

console.log(t, t.includes(324))