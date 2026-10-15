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

    insert(value, root = this.root) {
        if (value === root.value) return;

        if (value < root.value) {
            if (!root.left) {
                root.left = new Node(value);
                return;
            }

            this.insert(value, root.left);
        } else if (value > root.value) {
            if (!root.right) {
                root.right = new Node(value);
                return;
            }

            this.insert(value, root.right);
        }
    }

    // Hello I've come back to coding after abandoning it for
    // a month because I couldn't solve this deleteItem
    // function. Today I have decided to wrestle with it again.
    // (is anyone gonna see this?)

    deleteItem(value, current = this.root) {
        if (current === null) return null;

        if (value < current.value) {
            current.left = this.deleteItem(value, current.left);
        } else if (value > current.value) {
            current.right = this.deleteItem(value, current.right);
        } else {
            if (current.left === null) {
                return current.right;

            } else if (current.right === null) {
                return current.left;

            } else {
                const succ = findSuccessor(current);
                current.value = succ.value;

                current.right = this.deleteItem(succ.value, current.right);
            }
        }

        return current;
    }
}

function findSuccessor(current) {
    current = current.right;
    while (current.left !== null) {
        current = current.left;
    }
    return current;
}

let t = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

console.log(t, t.deleteItem(4))