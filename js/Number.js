/**
 * Created by Jigar on 4/5/16.
 */

function BigMath() {
}

// Based on https://en.wikipedia.org/wiki/Sch%C3%B6nhage%E2%80%93Strassen_algorithm
BigMath.prototype.multiply = function (bignumber1, bignumber2) {
    var regex = /^\d+$/;
    if (!regex.test(bignumber1)) {
        throw bignumber1 + " is not a valid number";
    }
    if (!regex.test(bignumber2)) {
        throw bignumber2 + " is not a valid number";
    }
    var m = bignumber1.length;
    var n = bignumber2.length;
    var rows = [];
    var acs = m + n - 1;
    for (var i = bignumber2.length - 1; i >= 0; i--) {
        var ii = bignumber2.slice(i, i + 1);
        var ac = [];
        for (var j = bignumber1.length - 1; j >= 0; j--) {
            var jj = bignumber1.slice(j, j + 1);
            ac.push(ii * jj)
        }
        rows.push(ac);
    }

    var lc = [];
    for (var i = 0; i < acs; i++) {
        var sum = 0;
        for (var j = 0; j < rows.length; j++) {
            if ((i - j) >= 0) {
                if (rows[j][i - j] !== undefined) {
                    sum += rows[j][i - j];
                }
            }
        }
        lc.push(sum);
    }

    var result = "";
    var carry =0;
    for (var i = 0; i < lc.length; i++) {
        lc[i] = parseInt(carry) + parseInt(lc[i]);
        result = (lc[i] % 10).toString() + result;
        carry = Math.floor(lc[i]/10);
    }
    return result.toString();
};

BigMath.prototype.subtract = function (bignumber1, bignumber2) {
    var regex = /^\d+$/;
    if (!regex.test(bignumber1)) {
        throw bignumber1 + " is not a valid number";
    }
    if (!regex.test(bignumber2)) {
        throw bignumber2 + " is not a valid number";
    }

    var result = "";
    var nc = 0;

    if(bignumber1.length < bignumber2.length){
        //Swap and negate the result

    }
    var l1 = bignumber1.length;
    var l2 = bignumber2.length;
    var j =l2-1;
    for (var i = l1-1; i >= 0; i--) {
        var t = parseInt(parseInt(bignumber1.slice(i,i+1)) + parseInt(nc));
        nc = 0;
        var b = 0;
        if(bignumber2.slice(j,j+1) !== ''){
           b = parseInt(bignumber2.slice(j,j+1));
        }
        console.log(t + " - " + b);
        if(t < b) {
            t += 10;
            nc = -1;
        }
        console.log(t + " - " + b);
        result = (t-b).toString() + result;
        j--;
    }
    result = result.replace(/^[0]+/,'').toString();
    console.log(result);
    return result;
};

var bm = new BigMath();
console.assert(bm.multiply("123456789", "12345") == "1524074060205");
console.assert(bm.multiply("1458702678713", "262144") == "382390155008540672");
// console.assert(bm.subtract("382390155008802044", "382390155008540672") == "261372");
console.assert(bm.subtract("382390155008802044", "45") =="382390155008801999");
console.assert(bm.subtract("45","382390155008802044") == "-382390155008801999");

// 99
// 382390155008797999
// 382390155008801999

/*

   3 2 1 9 8 7 6 5 4 3 2 1 0
 ----------------------------
           x x x x x x x x x | 0
         x x x x x x x x x   | 1
       x x x x x x x x x     | 2
     x x x x x x x x x       | 3
   x x x x x x x x x         | 4
 ----------------------------
 x
 */