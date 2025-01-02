function mergeSort(arr){
	if (arr.length <= 1){
		return arr;
	}

	let leftHalf = arr.slice(0, arr.length / 2);
	let rightHalf = arr.slice(arr.length / 2, arr.length);

	return merge(mergeSort(leftHalf), mergeSort(rightHalf));

}

function merge(left, right){
	const result = [];
	let leftIndex = 0;
	let rightIndex = 0;


	while (leftIndex < left.length && rightIndex < right.length){
		if (left[leftIndex] < right[rightIndex]){
			result.push(left[leftIndex]);
			leftIndex++;
		}
		else{
			result.push(right[rightIndex]);
			rightIndex++;
		}
	}

	console.log(result);
	console.log(left.slice(leftIndex));
	console.log(right.slice(rightIndex));
	return result.concat(right.slice(rightIndex), left.slice(leftIndex));
}

console.log(mergeSort([4,3,10,2, 1, 5]))