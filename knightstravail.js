const boardSize = 8;

const possibleMoves = [
	[2, 1],
	[1, 2],
	[-1, 2],
	[-2, 1],
	[-2, -1],
	[-1, -2],
	[1, -2],
	[2, -1]
]

function isValid(vertex) {
	return (0 <= vertex[0] && vertex[0] < boardSize && 0 <= vertex[1] && vertex[1] < boardSize);
}

function getMoves(vertex) {
	const res = []
	possibleMoves.forEach((move) => {
		const row = vertex[0] + move[0];
		const col = vertex[1] + move[1];

		if (isValid([row, col])) {
			res.push([row, col]);
		}
	});
	return res;
}


function sameArray(arr1, arr2) {
	return arr1[0] === arr2[0] && arr1[1] === arr2[1];
}

function knightMoves(start, end) {

	if (!isValid(start) || !isValid(end)) {
		throw new Error(`Out of bounds!`)
	}

	const queue = [
		[start]
	];
	const visited = new Set();
	visited.add(start.toString());

	while (queue.length) {
		const path = queue.shift();
		const current = path[path.length - 1];

		if (sameArray(current, end)) {
			return path;
		}

		const nextMoves = getMoves(current);

		nextMoves.forEach((move) => {
			const moveKey = move.toString();
			if (!visited.has(moveKey)) {
				queue.push([...path, move]);
				visited.add(moveKey);
			}
		})
	}
}