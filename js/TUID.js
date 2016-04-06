/**
 * Created by Jigar Patel on 4/5/16.
 */
/**
 * Created by Jigar on 4/5/16.
 */
function TUID () {
    this.tuid = null;
    this.tuidbase = null;
    this.millis = null;
    this.serverid = null;
    this.counter = null;
    this.shiftvalue = 262144;
}

TUID.prototype.isNumber = function (tuidString) {
    var tuidregex = /^\d+$/;
    return tuidregex.test(tuidString);
};

TUID.prototype.toUTCDateString = function () {
    var localDate = new Date(this.millis);
    return localDate.toUTCString();
};

TUID.prototype.toLocaleDateString = function () {
    var localDate = new Date(this.millis);
    return localDate.toString();
};

TUID.prototype.parse = function (tuidString) {
    if(!this.isNumber(tuidString)){
        throw "Invalid tuid string: " + tuidString;
    }
    this.tuid = new BigInteger(tuidString);
    this.millis = this.tuid.quotient(this.shiftvalue);
    this.tuidbase = this.millis.multiply(this.shiftvalue);
    var other = this.tuid.subtract(this.tuidbase).toJSValue();
    this.serverid = other & 0xFF;
    this.counter = (other >> 8) & 0x3FF;
    return this;
};

TUID.prototype.generate = function (millis, counter, serverid) {
    if(!this.isNumber(millis)){
        throw "Invalid value for milliseconds: " + millis;
    }
    if(!this.isNumber(counter)){
        throw "Invalid value for counter: " + counter;
    }
    if(!this.isNumber(serverid)){
        throw "Invalid value for serverid: " + serverid;
    }
    this.millis = new BigInteger(millis) ;
    this.serverid = serverid;
    this.counter = counter;
    this.tuidbase =  this.millis.multiply(this.shiftvalue);
    this.tuid = new BigInteger(this.tuidbase);
    this.tuid = this.tuid.add(this.counter << 8);
    this.tuid = this.tuid.add(this.serverid);
    return this;
};
