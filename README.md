TUID Processor
===============
### What is this?
It is an extension for the [Chrome](https://www.google.com/chrome/browser/desktop/) browser to disect and generate Tuid. You can install it from [Chrome Store](https://chrome.google.com/webstore/detail/tuid-helper/nipadebnhocklcbfppfffkfonfkehigo).

### What is TUID?
TUID stands for **_Time based unique identifier_**. TUID is a 64 bit long unsigned integer value.

### How can I generate one?
It is generated using [epoch](https://en.wikipedia.org/wiki/Unix_time), and some _random_ value. It is constructed using three segments, epoch, serverid, and a counter value. You can add or remove different bit segments.

Following is the sample code (untested) to generate TUID in Java.
```java
//You can change the distribution of number of bits between segaments
static short counter = 1;
static byte serverid = 50;
public long generateTuid(){
    long epoch =  System.currentTimeMillis();
    //Increament counter between tuid generation call to avoid duplicates
    counter++;
    if(counter >= 1022){
        counter = 1;
    }
    long tuid = ( epoch << 18) + (counter << 10) + sreverid;
    return tuid;
}
```
Base on the above example, the bit segments distribution looks like following.

Epoch | Counter | Server id
:--- | :--- | :---
0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 00 | 00 0000 0000 | 0000 0000

* Max Epoch     2^46 = 70,368,744,177,664 = **GMT: Sun, 24 Nov 4199 01:22:57.664**
* Max Counter   2^10 = 1,024
* Max Server id 2^8  = 256

### Note
This extension only works with specific bit segments.

**_Epoch (46 bits) + Counter (10 bits) + Server id (8 bits) == Tuid (64 bites)_**


