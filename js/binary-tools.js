/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Cmd-R),
 * 2. Inspect to bring up an Object Inspector on the result (Cmd-I), or,
 * 3. Display to insert the result in a comment after the selection. (Cmd-L)
 */
function stringDivide(stringNumber, divideWith) {
  var result = {
  };
  result.value = '';
  result.mod = '';
  var digitsRegex = new RegExp('^[0-9]+$', 'i');
  if (stringNumber === undefined || divideWith === undefined) {
    console.log('Invalid input');
    return result;
  }
  if (!digitsRegex.test(divideWith)) {
    console.log('Input divideWith is not a valid number');
    return result;
  }
  if (!digitsRegex.test(stringNumber)) {
    console.log('Input stringNumber is not a valid number');
    return result;
  }
  var partialNumber = '';
  var startResult = false;
  for (var i = 0; i < stringNumber.length; i++) {
    partialNumber = partialNumber.toString() + stringNumber.substr(i, 1);
    var pd = Math.floor(partialNumber / divideWith);
    var mod = (partialNumber % divideWith).toString();
    //console.log(partialNumber + "-" + pd + "-" + mod);
    if (pd > 0) {
      partialNumber = mod;
      startResult = true;
    }
    if (startResult) {
      result.value += pd.toString();
    }
    result.mod = mod;
  }
  result.number = stringNumber;
  result.divider = divideWith;
  //console.log(result);
  return result;
}
function getBinary(stringNumber) {
  var result = stringDivide(stringNumber, '2');
  var binary = result.mod;
  while (result.value.length > 0 && result.value !== 0) {
    result = stringDivide(result.value, '2');
    binary = result.mod + binary;
    //    console.log(binary);
  }
  //  console.log(binary);
  return binary
}
function shiftLeft(number,bits, limit){
  
}
function shiftRight(number,bits){
  
}
//stringDivide('123456', '2');
/*stringDivide('12345', '2');
stringDivide('2004', '2');
stringDivide('123456789123456789', '10');
var y = stringDivide('123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123536256', '123456');
console.log(y.value);
console.log(y.number);
console.log('123456789:' + getBinary('123456789'));
*/



