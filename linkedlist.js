class Node {
    constructor(value, next) {
        this.value = value;
        this.next = next ? next : null;
    }
}

class LinkedList {
    constructor(initialValue = null){
        if (initialValue){
            const head = new Node(initialValue, null)
            this.head = head;
            this.tail = head;
        }
        else{
            this.head = null;
            this.tail = null;
        }    
    }

    printList(){
        let current = this.head;
        let printedString = ``;
        while (current){
            if (current === this.head){
                printedString += `Head: `;
            }
            if (current === this.tail){
                printedString += `Tail: `
            }
            printedString += current.value;
            printedString += ` ---> `
            current = current.next;
        }
        console.log(printedString);
    }
    
    append(value) {

        const newNode = new Node(value, null);

        if (this.head === null){
            this.head = newNode;
        }

        else{
            let tail = this.tail;
            tail.next = newNode;
        }

        this.tail = newNode; 
    }

    prepend(value){
        const newNode = new Node(value, null);

        if (this.head === null){
            this.tail = newNode;
        }
        else{
            let prevHead = this.head;
            newNode.next = prevHead;
        }
        this.head = newNode;
    }

    size(){
        let count = 0;
        let current = this.head;
        while(current){
            count++;
            current = current.next;
        }
        return count;
    }

    returnHead(){
        return this.head;
    }

    returnTail(){
        return this.tail;
    }

    at(index){
        let current = this.head;
        let count = 0;

        if (index > this.size() || index < 0){
            return(`Out of range!`)
        }

        while (current){
            if (count === index){
                return current;
            }
            count++;
            current = current.next;
        }
    }

    pop(){
        if (this.head === this.tail){
            this.head = null;
            this.tail = null;
        }
        else{
            let current = this.head;
            while (current){
                if (current.next === this.tail){
                    this.tail = current;
                    current.next = null;
                }
            current = current.next;
            }
        }
    }

    contains(value){
        let current = this.head;
        while (current){
            if (current.value === value){
                return true;
            }
            current = current.next;
        }
        return false;
    }

    find(value){
        let current = this.head;
        let count = 0;
        while (current){
            if (current.value === value){
                return count;
            }
            current = current.next;
            count++;
        }
        return `Couldn't find value!`;
    }

    insertAt(value, index){
        if (index < 0 || index > this.size()){
            console.log("Out of range!");
            return;
        }


        const newNode = new Node(value, null);

        if (index === 0){
            this.prepend(value);
            return;
        }
        if (index === this.size()){
            this.append(value);
            return;
        }

        let prevNode = this.at(index - 1);
        let nextNode = this.at(index);
        prevNode.next = newNode;
        newNode.next = nextNode;
    }

    removeAt(index){
        let prevNode = this.at(index - 1);
        let nextNode = this.at(index + 1);
        prevNode.next = nextNode;
    }


    toString(){
        let current = this.head;
        let printedString = ``;
        
        while (current){
            printedString += `( `;
            printedString += current.value;
            printedString += ` ) -> `
            
            if (current === this.tail){
                printedString += ` null`;
            }
            current = current.next;
            
        }
        console.log(printedString);
    }

}


const list = new LinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");
list.insertAt("butterflies", 6);



list.toString()