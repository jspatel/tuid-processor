
var tuids = [];
var historysize = 25;
function copyToClipboard(text){
    var toclip = document.getElementById('toclipboard');
    toclip.innerHTML = text;
    console.log(text);
    var range = document.createRange();
    range.selectNode(toclip);
    window.getSelection().addRange(range);
    try {
        // Now that we've selected the anchor text, execute the copy command
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copy TUID command was ' + msg);
    } catch(err) {
        console.log(err);
        console.log('Oops, unable to copy' + err);
    }

    // Remove the selections - NOTE: Should use
    // removeRange(range) when it is supported
    window.getSelection().removeAllRanges();
}

function loadTuids() {
    chrome.storage.local.get('history', function(items) {
        if(items !== undefined && items.history !== undefined){
            tuids =  items.history;
            for(var i=0; i< tuids.length; i++){
                addTuidRow(tuids[i].tuidtype,  tuids[i].tuid, tuids[i].localdate);
            }
            refreshHistoryCount();
        }
    });
}

function refreshHistoryCount() {
    var myNode = document.getElementById("history-count");
    if(tuids !== undefined){
        myNode.setAttribute("data-badge",tuids.length.toString());
    }
}
function clearTuids() {
    tuids = [];
    saveTuids();
    var myNode = document.getElementById("history-table");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    loadTuids();
}
function saveTuids() {
    chrome.storage.local.set({
        history: tuids
    }, function() {
        refreshHistoryCount();
    });
}

function addTuidRow(tuidtype, tuid, localdate){
    var tbody = document.getElementById("history-table");
    var tr = document.createElement("tr");
    var type =document.createElement("td");
    type.setAttribute("class", "mdl-data-table__cell--non-numeric");
    type.appendChild(document.createTextNode(tuidtype));

    var value =document.createElement("td");
    value.appendChild(document.createTextNode(tuid));

    var local =document.createElement("td");
    local.setAttribute("class", "mdl-data-table__cell--non-numeric");
    local.appendChild(document.createTextNode(localdate));

    tr.appendChild(type);
    tr.appendChild(value);
    tr.appendChild(local);
    tbody.insertBefore(tr, tbody.firstChild);
}

function addTuid(tuidtype, tuid) {

    if(tuids.length +1 > historysize){
        tuids.pop();
        var myNode = document.getElementById("history-table");
        myNode.removeChild(myNode.lastChild);
    }
    tuids.unshift({tuidtype: tuidtype, tuid: tuid.tuid.toString(), localdate: tuid.toLocaleDateString()});
    addTuidRow(tuidtype, tuid.tuid, tuid.toLocaleDateString());
    saveTuids(tuids);
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
        currentDate.setMilliseconds(0);
    }
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
    return number;
}
function generateTuid(millis, counter, serverid){
    var tuid = new TUID();
    tuid.generate(millis, counter, serverid);
    return tuid;
}

function tuidParser(){

    var tuidRegex = /^\d{17,20}$/g;

    document.getElementById("tuidResult").classList.add("invisible");

    var inputTuid = document.getElementById("inputTuid").value;
    var isValid = tuidRegex.test(inputTuid);

    if(isValid){
        var tuid = new TUID();
        tuid.parse(inputTuid);
        document.getElementById("tuidResult").classList.remove("invisible");
        document.getElementById("tuidCol").innerHTML = tuid.tuid.toString();
        document.getElementById("millisCol").innerHTML = tuid.millis.toString();
        document.getElementById("tuidBaseCol").innerHTML = tuid.tuidbase.toString();
        document.getElementById("counterCol").innerHTML = tuid.counter.toString();
        document.getElementById("serveridCol").innerHTML = tuid.serverid.toString();
        document.getElementById("localDateCol").innerHTML = tuid.toLocaleDateString();
        document.getElementById("utcDateCol").innerHTML = tuid.toUTCDateString();
        document.getElementById("inputTuid").value = "";
        addTuid('D', tuid);
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
    var tuid = generateTuid(millis, counter, serverid);

    document.getElementById("gentuidResult").classList.remove("invisible");
    document.getElementById("gentuidCol").innerHTML = tuid.tuid.toString();
    document.getElementById("genmillisCol").innerHTML = tuid.millis.toString();
    document.getElementById("gentuidBaseCol").innerHTML = tuid.tuidbase.toString();
    document.getElementById("gencounterCol").innerHTML = tuid.counter.toString();
    document.getElementById("genserveridCol").innerHTML = tuid.serverid.toString();
    document.getElementById("genlocalDateCol").innerHTML = tuid.toLocaleDateString();
    document.getElementById("genutcDateCol").innerHTML = tuid.toUTCDateString();

    document.getElementById("inputDate").value = "";
    document.getElementById("inputTime").value = "";
    document.getElementById("copied").classList.add("hidden");
    document.getElementById("copy").classList.remove("hidden");
    addTuid('G', tuid);
};

document.getElementById("generateTuid").onclick =  tuidGenerator;
document.getElementById("clearhistory").onclick =  clearTuids;
document.getElementById("dissectTuid").onclick  = tuidParser;
document.getElementById("copy").onclick  = function (e) {
    var tuid = document.getElementById("gentuidCol").innerText;
    copyToClipboard(tuid);
    document.getElementById("copy").classList.add("hidden");
    document.getElementById("copied").classList.remove("hidden");
    event.preventDefault();
};
document.getElementById("inputTuid").onkeypress  = function(e){
    if(e.keyCode == 13){
        tuidParser();
    }
};
loadTuids();

