function checkCashRegister(price, cash, cid) {
    let change = cash - price;
    let changeLeft = change;
    let bank = cid.map(a => a[1]).reduce((a,b) => a + b).toFixed(2);
    if (bank == change) {
        return document.getElementById("answer").innerHTML = "status: CLOSED, change:", cid;
    }
    let changeArr = [];
    let valueArr = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];
    for (let i = cid.length; i >= 0; i--) {
        if (changeLeft >= valueArr[i] && cid[i][1] >= valueArr[i]) {
            changeLeft = changeLeft.toFixed(2) - valueArr[i].toFixed(2);
            cid[i][1] = cid[i][1] - valueArr[i]; 
            changeArr.unshift(cid[i][0],valueArr[i]);
            for (let j = 0; j < 1; j++) {
                if (changeLeft >= valueArr[i] && cid[i][1] >= valueArr[i]) {
                    changeLeft = changeLeft.toFixed(2) - valueArr[i].toFixed(2);
                    cid[i][1] = cid[i][1] - valueArr[i];
                    changeArr[1] = changeArr[1] + valueArr[i];
                    j--;
                }
            }  
        }
    }
    let reverseArr = changeArr.reverse();
    let finalArr = [];
    while (reverseArr.length != 0) {
        finalArr.push([reverseArr[1],reverseArr[0]]);
        reverseArr.splice(0, 2);
    } 
  
    if (bank < change || changeLeft > 0) {
        return document.getElementById("answer").innerHTML = ["status: INSUFFICIENT_FUNDS,   change: -" ];
    }  
    else if (bank > change) {
        return document.getElementById("answer").innerHTML = ["status: OPEN, change:", finalArr];
    } 
}

document.getElementById("button").addEventListener("click", function() {
    checkCashRegister(document.getElementById("str").value, document.getElementById("str2").value, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])();
});