const Node  = (_data) => {
    return {
        data: _data,
        left: null,
        right: null
    }
}

const Tree = (array) => {

    const buildTreeRecursive = (array, start, end) => {
        if (start > end) return null;

        let mid = start + Math.floor((end - start) / 2);
        let node = Node(array[mid]);

        node.left = buildTreeRecursive(array, start, mid - 1);
        node.right = buildTreeRecursive(array, mid + 1, end);

        return node;
    }


    const buildTree = (array) => {
        const sortedArray = array.sort((a, b) => a - b);
        const uniqueArray = [...new Set(sortedArray)];
        return buildTreeRecursive(uniqueArray, 0, uniqueArray.length - 1);
    }


    const prettyPrint = (node, prefix = '', isLeft = true) => {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left !== null) {
            prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    };

    const insertRecurse = (node, value) => {
        if (node === null) {
            return Node(value);
        }

        if (node.data === value){
            return node;
        }

        if (value < node.data){
            node.left = insertRecurse(node.left, value);
        }

        else {
            node.right = insertRecurse(node.right, value);
        }
        return node;
    }

    let root = buildTree(array);


    const insert = (value) => {
        root = insertRecurse(root, value);
        prettyPrint(root);

    }

    const getSuccessor = (curr) => {
        curr = curr.right;
        while (curr !== null && curr.left !== null){
            curr = curr.left;
        }
        return curr;
    }

    const deleteRecurse = (node, value) => {
        if (node === null){
            return node;
        }

        if (node.data > value){
            node.left = deleteRecurse(node.left, value);
        }
        else if (node.data < value){
            node.right = deleteRecurse(node.right, value);
        }
        else{
            if (node.left === null){
                return node.right;
            }
            if (node.right === null){
                return node.left;
            }
            let successor = getSuccessor(node);
            node.data = successor.data;
            node.right = deleteRecurse(node.right, successor.data);
        }
        return node;
    }

    const deleteItem = (value) => {
        root = deleteRecurse(root, value);
        prettyPrint(root);
    }

    const findRecurse = (node, value) => {

        let current = node;

        while (current) {
            if (value === current.data){
                return current;
            }
            else if (value < current.data){
                current = current.left;
            }
            else{
                current = current.right;
            }
        }
        return null;
    }


    const find = (value) => {
        return findRecurse(root, value);
    }

    const logValueCallback = (node) => {
    console.log(node.data);
    };


    const levelOrderIterative = (node, callback) => {
        if (typeof callback !== 'function'){
            throw new Error('Not a function!');
        }

        if (node === null){
            return [];
        }

        const queue = [];
        queue.push(node);

        while (queue.length) {
            const currentNode = queue.shift();
            callback(currentNode);

            if (currentNode.left){
            queue.push(currentNode.left);
            }

            if (currentNode.right){
                queue.push(currentNode.right);
            }
        }
    }

    const levelOrderForEach = (callback) => {
        levelOrderIterative(root, callback);
    }

    const inOrderRecursive = (node, callback) => {
        if (node === null){
            return;
        }

        inOrderRecursive(node.left, callback);
        callback(node);
        inOrderRecursive(node.right, callback);

    }

    const inOrderForEach = (callback) => {
        inOrderRecursive(root, callback);
    }

    const preOrderRecursive = (node, callback) => {
        if (node === null){
            return;
        }

        callback(node);
        preOrderRecursive(node.left, callback);
        preOrderRecursive(node.right, callback);
    }

    const preOrderForEach = (callback) => {
        preOrderRecursive(root, callback);
    }

    const postOrderRecursive = (node, callback) => {
        if (node === null){
            return;
        }
        postOrderRecursive(node.left, callback);
        postOrderRecursive(node.right, callback);
        callback(node);
    }

    const postOrderForEach = (callback) => {
        postOrderRecursive(root, callback);
    }

    const heightRecurse = (node) => {
        if (node === null){
            return 0;
        }

        const left = heightRecurse(node.left);
        const right = heightRecurse(node.right);

        return 1 + Math.max(left, right);
    }


    const height = (value) => {
        const givenNode = find(value);
        return heightRecurse(givenNode);
    }

    const depthRecurse = (node, value, currentDepth = 0) => {
        if (node === null){
            return -1;
        }

        if (node.data === value){
            return currentDepth;
        }

        if (value < node.data){
            return depthRecurse(node.left, value, currentDepth + 1);
        }

        else{
            return depthRecurse(node.right, value, currentDepth + 1);
        }

    } 

    const depth = (value) => {
        return depthRecurse(root, value);
    }

    const checkHeightAndBalance = (node) => {
        if (node === null){
            return 0;
        }

        const leftHeight = checkHeightAndBalance(node.left);
        if (leftHeight === -1){
            return -1;
        }

        const rightHeight = checkHeightAndBalance(node.right);
        if (rightHeight === -1){
            return -1;
        }

        if (Math.abs(leftHeight - rightHeight) > 1) {
            return -1;
        }

        return (1 + Math.max(leftHeight, rightHeight))
    }


    const isBalanced = () => {
        return checkHeightAndBalance(root) !== -1;
    }

    const rebalanceRecurse = (node, res= []) => {
        if (node === null){
            return;
        }

        res.push(node.data);
        rebalanceRecurse(node.left, res);
        rebalanceRecurse(node.right, res);

        return res;

    }


    const rebalance = () => {
        const newNodes = rebalanceRecurse(root);
        console.log(newNodes);
        root = buildTree(newNodes);
    }






    prettyPrint(root);

    return {insert, deleteItem, find, levelOrderForEach, logValueCallback, inOrderForEach, preOrderForEach, postOrderForEach, 
        height, depth, isBalanced, rebalance
    }

}

let tree1 = Tree([34, 54, 65, 90, 100, 201, 302]);


console.log(tree1.isBalanced());
tree1.insert(305)
tree1.insert(306)
tree1.insert(307)
tree1.insert(308)
tree1.insert(309)
console.log(tree1.isBalanced());

console.log(tree1.rebalance())
tree1.insert(310)




