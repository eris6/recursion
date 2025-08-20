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





    prettyPrint(root);

    return {insert, deleteItem, find}

}

let tree1 = Tree([34, 54, 65, 90, 100, 201, 302]);


console.log(tree1.find(90000))


