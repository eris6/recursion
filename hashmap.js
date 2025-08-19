function HashMap(){
    const loadFactor = 0.75;
    let capacity = 16;
    let buckets = Array.from({ length: capacity }, () => []);

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

        if (length() > capacity * loadFactor){
            rehash();
        }
    }

    const rehash = () => {
        let oldBuckets = buckets;
        capacity *= 2;
        buckets = Array.from({ length: capacity }, () => []);

        oldBuckets.forEach((bucket) => {
            bucket.forEach(([key, value]) => {
                const index = hash(key);
                buckets[index].push([key, value]);
            })
        })
    }

    const get = (key) => {
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
        const valueList = [];

        for (let i = 0; i < capacity; i++){
            let currentBucket = buckets[i];

            currentBucket.forEach((item) => {
                valueList.push(item[1]);
            })
        }

        return valueList;
    }

        const entries = () => {
        const entryList = [];

        for (let i = 0; i < capacity; i++){
            let currentBucket = buckets[i];

            currentBucket.forEach((item) => {
                entryList.push([item[0], item[1]]);
            })
        }

        return entryList;
    }
    return {set, get, has, remove, length, clear, keys, values, entries, rehash}
}


export {HashMap}