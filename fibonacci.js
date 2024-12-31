function fibs(n){
	let fibArray = [];
	fibArray.push(0);
	fibArray.push(1);

	for (let i = 2; i < n; i++){
		let sum = fibArray[i - 1] + fibArray[i - 2];
		fibArray.push(sum);
	}
	return fibArray;
}

function fibsRec(n){
	if (n == 1){
		return [0]
	}
	else if (n == 2){
		return [0, 1]
	}

	const arr = fibsRec(n - 1);
	arr.push(arr[arr.length - 1] + arr[arr.length - 2])

	return arr;
}


console.log(fibsRec(2))