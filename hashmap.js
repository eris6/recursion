function HashMap(){
    const loadFactor = 0.75;
    let capacity = 16;
    const buckets = Array.from({ length: capacity }, () => []);

    const hash = (key) => {
        let hashCode = 0;
      
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
        }

        return hashCode;
    }

    const set = (key, value) => {
        const index = hash(key);
        const bucket = buckets[index];

        if (index < 0 || index >= buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        for (let pair of bucket){
            if (pair[0] === key){
                pair[1] = value;
                return;
            }
        }

        bucket.push([key, value])
    }

    const get = (key) => {
        console.log(buckets)
        const index = hash(key);
        const bucket = buckets[index];

        if (index < 0 || index >= buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        for (let pair of bucket){
            if (pair[0] === key){
                return pair[1];
            }
        }

        return null;
    }

    const has = (key) => {
        const index = hash(key);
        const bucket = buckets[index];

        if (index < 0 || index >= buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        for (let pair of bucket){
            if (pair[0] === key){
                return true;
            }
        }
        return false;
    }

    const remove = (key) => {
        const index = hash(key);
        const bucket = buckets[index];

        if (index < 0 || index >= buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        for (let i = 0; i < bucket.length; i++){
            if (bucket[i][0] === key){
                bucket.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    const length = () => {
        let count = 0;
        
        for (let i = 0; i < capacity; i++){
            count += buckets[i].length         
        }

        return count;
    }

    const clear = () => {
        for (let i = 0; i < capacity; i++){
            buckets[i] = [];
        }
    }

    const keys = () => {
        const keyList = [];

        for (let i = 0; i < capacity; i++){
            let currentBucket = buckets[i];

            currentBucket.forEach((item) => {
                keyList.push(item[0]);
            })
        }

        return keyList;
    }


    const values = () => {
        const keyList = [];

        for (let i = 0; i < capacity; i++){
            let currentBucket = buckets[i];

            currentBucket.forEach((item) => {
                keyList.push(item[1]);
            })
        }

        return keyList;
    }

        const entries = () => {
        const keyList = [];

        for (let i = 0; i < capacity; i++){
            let currentBucket = buckets[i];

            currentBucket.forEach((item) => {
                keyList.push([item[0], item[1]]);
            })
        }

        return keyList;
    }
    return {set, get, has, remove, length, clear, keys, values, entries}

}

const test = new HashMap();
 test.set('apple', 'red')
 test.set('banana', 'yellow')
 test.set('carrot', 'orange')
 test.set('dog', 'brown')
 test.set('elephant', 'gray')
 test.set('frog', 'green')
 test.set('grape', 'purple')
 test.set('hat', 'black')
 test.set('ice cream', 'white')
 test.set('jacket', 'blue')
 test.set('kite', 'pink')
 test.set('butterfly', 'blue')
 test.set('lion', 'golden')
  test.set('moon', 'silver')


  test.get('banana')

console.log(test.keys());
console.log(test.entries());



