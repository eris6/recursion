import { HashMap } from "./hashmap.js"; 

function HashSet(){
    const map = HashMap();

    const add = (key) => {
        map.set(key, true);
    }

    const has = (key) => {
        return map.has(key)
    }

    const remove = (key) => {
        map.remove(key);
    }

    const length = () => {
        return map.length();
    }

    const clear = () => {
        map.clear();
    }

    const keys = () => {
        return map.keys();
    }

    return { add, has, remove, length, clear, keys }
}





