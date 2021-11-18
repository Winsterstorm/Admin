function addNumber(number) {
	expression += number
	updateExpression()
}

function addOperatin(oper) {
	if (expression.slice(-1) != " ") {
		expression += ` ${oper} `
		updateExpression()
	}
}

function addPoint() {
	if (expression.slice(-1) != " " && expression.split(" ")[expression.split(" ").length-1].indexOf(".") === -1) {
		expression += "."
		updateExpression()
	}
}

function clear(id) {
	if (id == "CE") {
		expression = ""
	} else {
		expression = expression.split(" ", expression.split(" ").length -2).join(" ")
	}
	updateExpression()
}

function updateExpression() {
	display.value = expression
}

function calculateResult() {
	arr = expression.split(" ")
	resultArray = []
	flagLastOperation = false
	console.log(arr)
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] == "*" ) {
			resultArray.pop()
			resultArray.push(Number(arr[i-1]) * Number(arr[i+1]))
			flagLastOperation = true
		} else if (arr[i] == "/") {
			if (Number(arr[i+1]) == 0) {
				alert("ДЕЛЕНИЕ НА НОЛЬ!!!")
				return
			}
			resultArray.pop()
			resultArray.push(Number(arr[i-1]) / Number(arr[i+1]))
			flagLastOperation = true
		} else {
			if (!flagLastOperation) {
				resultArray.push(arr[i])
			}
			flagLastOperation = false
		}
	}
	console.log(resultArray)
	result = Number(resultArray[0])
	for (let i = 1; i < resultArray.length; i += 2) {
		if (resultArray[i] == "+") {
			result += Number(resultArray[i+1])
		} else {
			result -= Number(resultArray[i+1])
		}
	}

	expression = result.toString()
	updateExpression()
}


let expression = ""
let resultBtn = document.getElementById('result')
let c = document.getElementById('clear_all')
let numbers = document.querySelectorAll('.number')
let operations = document.querySelectorAll('.operation')
let ce = document.getElementById('clear')
let pointBtn = document.getElementById('point')
let display = document.getElementById('form')

numbers.forEach((item, i) => {
	item.addEventListener('click', function(e) {
		addNumber(e.target.innerHTML)
	})
})

operations.forEach((item, i) => {
	item.addEventListener('click', function(e) {
        addOperatin(e.target.innerHTML)
    })
})

c.addEventListener('click', function(e) {
	clear(e.target.innerHTML)
})
ce.addEventListener('click', function(e) {
	clear(e.target.innerHTML)
})
pointBtn.addEventListener('click', function(e) {
	addPoint()
})

resultBtn.addEventListener("click", function(e) {
	calculateResult()
})
