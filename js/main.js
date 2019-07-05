var spanResult = document.getElementById('result');
var integers = Array.from (document.getElementsByClassName('integers'));
var operationButtons = [
	document.getElementById('divide'),
	document.getElementById('multiply'),
	document.getElementById('rest'),
	document.getElementById('sum')
];

var equalButton = document.getElementById('equal');

var inMemory;
var init = false;
var lastOperation = null;
var currentOperation = null;
var inOperation = false;
var blocked = false;

integers.forEach(function(btn){
	btn.addEventListener('click', onClickIntegers);
});

operationButtons.forEach(function(btn){
	btn.addEventListener('click', onClickOperation);
});

equalButton.addEventListener('click', onClickEqual);

function onClickEqual(e){
	e.preventDefault();

	if(blocked) return;
	
	if(init && lastOperation && inMemory){

		makeOperation();

		lastOperation = null;
	}
}

function onClickIntegers(e){
	e.preventDefault();

	if(blocked) return;

	init = true;
	
	var value = this.innerText;

	if( spanResult.innerText =="0" || inOperation){
		spanResult.innerText="";
		inOperation = false;
	}

	spanResult.innerText += value;	
}

function onClickOperation(e){
	e.preventDefault();

	if(blocked) return;

	if(init && lastOperation){
		makeOperation();

		lastOperation = this.innerText;

	}else{
		lastOperation = this.innerText;
		inOperation = true;
		inMemory = spanResult.innerText;
	}
}

function makeOperation(){
	var inMemoryToNumber = Number(inMemory);
	var spanValue = Number(spanResult.innerText);

	switch(lastOperation){
		case '+':
			result = inMemoryToNumber + spanValue;
		break;
		case '-':
			result = inMemoryToNumber - spanValue;
		break;
		case '*':
			result = inMemoryToNumber * spanValue;
		break;
		default:
			if(spanValue  != 0)
				result = inMemoryToNumber / spanValue;
			else{
				result = "Error";
				blocked = true;
			}
	}

	spanResult.innerText = result;
	inMemory = spanResult.innerText;
	inOperation = true;
}