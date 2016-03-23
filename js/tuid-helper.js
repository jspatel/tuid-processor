


function disectTuid(tuid){
    var parsedTuid = {};
    parsedTuid.tuid = tuid;
    parsedTuid.millis = Math.floor(tuid / 262144).toString();
    parsedTuid.tuidBase = (parsedTuid.millis * 262144).toString();
    parsedTuid.localDate = new Date(parsedTuid.millis);
    parsedTuid.utcDate = parsedTuid.localDate.toUTCString();
    parsedTuid.otherParts = tuid.substr(tuid.length-6);
    parsedTuid.otherParts = (parsedTuid.otherParts & 0x3FFFF).toString();
    parsedTuid.serverID = (parsedTuid.otherParts & 0xFF).toString();
    parsedTuid.counter = (parsedTuid.otherParts >>> 8).toString();
    parsedTuid.counter = (parsedTuid.counter & 0x3FF).toString();
    return parsedTuid;
    //((milliseconds * 262144) * 1000).toString()
}
function bitwiseAnd(a, b){
    var w = 4294967296; // 2^32
    var aHI = a / w;
    var aLO = a % w;
    var bHI = b / w;
    var bLO = b % w;
    var result = ((aHI & bHI) * w + (aLO & bLO)).toString();
    console.log(result);
    return result;
}
function bitwiseOr(a, b){
    var w = 4294967296; // 2^32
    var aHI = a / w;
    var aLO = a % w;
    var bHI = b / w;
    var bLO = b % w;
    var result = ((aHI | bHI) * w + (aLO | bLO)).toString();
    console.log(result);
    return result;
}
function getMillis(inputDate, inputTime){
    var validateDate = /^\d{8}$/g;
    var validateTime = /^\d{6}$/g;
    var date = null;
    var month = null;
    var year = null;
    var currentDate = new Date();
    if(validateDate.test(inputDate)){
        currentDate.setFullYear(inputDate.substr(0,4));
        currentDate.setMonth(inputDate.substr(4,2)-1);
        currentDate.setDate(inputDate.substr(6,2));
    }
    if(validateTime.test(inputTime)){
        currentDate.setHours(inputTime.substr(0,2));
        currentDate.setMinutes(inputTime.substr(2,2));
        currentDate.setSeconds(inputTime.substr(4,2));
    }
    currentDate.setMilliseconds(0);
    //console.log(currentDate);
    return currentDate.getTime();
}
function getNumber(inputNumber, max){
    var digitsOnly = /^\d+$/g;
    var number = Math.floor(Math.random() * max);    
    if(digitsOnly.test(inputNumber)){
        if(inputNumber < max){
            number = inputNumber;
        }
    }
    //console.log(number);
    return number;
}
function generateTuid(millis, serverid, counter){
    var tuid = {};
    tuid.millis = millis;
    tuid.serverID = serverid;
    tuid.counter = counter;
    tuid.tuidBase = ((tuid.millis * 262144)).toString();
    var other = (counter & 0x3FF00) | serverid;
    bitwiseOr(tuid.tuidBase, other);
    return tuid;
}

function tuidParser(){

    var tuidRegex = /^\d{17,20}$/g;

    document.getElementById("tuidResult").classList.add("invisible");
    document.getElementById("inputTuidError").classList.add("invisible");

    var inputTuid = document.getElementById("inputTuid").value;
    console.log("Disect TUID Clicked " + inputTuid) ;
    
    var isValid = tuidRegex.test(inputTuid);
    if(isValid){
        var parsedTuid = disectTuid(inputTuid);
        console.log(parsedTuid);
        document.getElementById("tuidResult").classList.remove("invisible");
        document.getElementById("tuidCol").innerHTML = parsedTuid.tuid;
        document.getElementById("millisCol").innerHTML = parsedTuid.millis.toString();
        document.getElementById("tuidBaseCol").innerHTML = parsedTuid.tuidBase.toString();
        document.getElementById("counterCol").innerHTML = parsedTuid.counter.toString();
        document.getElementById("serveridCol").innerHTML = parsedTuid.serverID.toString();
        document.getElementById("localDateCol").innerHTML = parsedTuid.localDate.toString();
        document.getElementById("utcDateCol").innerHTML = parsedTuid.utcDate.toString();
        document.getElementById("inputTuid").value = "";
    }else{
        document.getElementById("inputTuidError").classList.remove("invisible");
    }
    
};

function tuidGenerator(){
    var inputDate = document.getElementById("inputDate").value;
    var inputTime = document.getElementById("inputTime").value;
    var inputServerId = document.getElementById("inputServerId").value;
    var inputCounter = document.getElementById("inputCounter").value;
    var millis = getMillis(inputDate, inputTime);
    var serverid = getNumber(inputServerId, 255);
    var counter = getNumber(inputCounter, 1023);
    var tuid = generateTuid(millis, serverid, counter);
    console.log(tuid);
};

document.getElementById("generateTuid").onclick =  tuidGenerator;
document.getElementById("disectTuid").onclick  = tuidParser;
document.getElementById("inputTuid").onkeypress  = function(e){
    if(e.keyCode == 13){
        tuidParser();
    }
};