


function disectTuid(tuid){
    var parsedTuid = {};
    parsedTuid.tuid = tuid;
    parsedTuid.millis = Math.floor(tuid / 262144);
    parsedTuid.tuidBase = (parsedTuid.millis * 262144).toString();
    parsedTuid.localDate = new Date(parsedTuid.millis);
    parsedTuid.utcDate = parsedTuid.localDate.toUTCString();
    parsedTuid.otherParts = tuid.substr(tuid.length-6);
    parsedTuid.serverID = (parsedTuid.otherParts & 0xFF).toString();
    parsedTuid.counter = ((parsedTuid.otherParts & 0x3FF00) >> 8).toString();
    return parsedTuid;
    //((milliseconds * 262144) * 1000).toString()
}
function getMillis(inputDate, inputTime){
    var digitsOnly = /^\d{8}$/g;
    var date = null;
    var month = null;
    var year = null;
    var currentDate = new Date();
    console.log(inputDate);
    if(digitsOnly.test(inputDate)){
        currentDate.setFullYear(inputDate.substr(0,4));
        currentDate.setMonth(inputDate.substr(4,2)-1);
        currentDate.setDate(inputDate.substr(6,2));
    }
    if(digitsOnly.test(inputTime)){

    }
}
function getNumber(inputNumber, max){
    var digitsOnly = /^\d+$/g;
}
function generateTuid(millis, serverid, counter){

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
    console.log("Generate TUID Clicked "  );
};

document.getElementById("generateTuid").onclick =  tuidGenerator;
document.getElementById("disectTuid").onclick  = tuidParser;
document.getElementById("inputTuid").onkeypress  = function(e){
    if(e.keyCode == 13){
        tuidParser();
    }
};