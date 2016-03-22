var tuidRegex = /\d{17,20}/g;
var dateRegex = /\d{8,8}/g;

function disectTuid(tuid){
    var parsedTuid = {};
    parsedTuid.tuid = tuid;
    parsedTuid.millis = Math.floor(tuid / 262144);
    parsedTuid.tuidBase = (parsedTuid.millis * 262144).toString();
    parsedTuid.localDate = new Date(parsedTuid.millis);
    parsedTuid.utcDate = parsedTuid.localDate.toUTCString();
    var otherParts = tuid.substring(tuid.legnth-6, 6);
    parsedTuid.serverID = (otherParts & 0xFF).toString();
    parsedTuid.counter = ((otherParts & 0x3FF00) >> 8).toString();
    return parsedTuid;
    //((milliseconds * 262144) * 1000).toString()
}

function generateTuid(date){

}

document.getElementById("disectTuid").onclick = function(){

    document.getElementById("tuidResult").classList.add("invisible");
    document.getElementById("inputTuidError").classList.add("invisible");

    var inputTuid = document.getElementById("inputTuid").value;
    console.log("Disect TUID Clicked " + inputTuid) ;

    var isValid = tuidRegex.test(inputTuid);
    document.getElementById("inputTuid").value = "";
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
    }else{
        document.getElementById("inputTuidError").classList.remove("invisible");
    }
    
};

document.getElementById("generateTuid").onclick = function(){
    var inputDate = document.getElementById("inputDate").value;
    var isValid = dateRegex.test(inputDate);
    if(isValid){

    }else{

    }
    console.log("Generate TUID Clicked " + inputDate );
};
