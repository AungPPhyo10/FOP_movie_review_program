const transactionBlocks1 = [
    {transaction_fee: 10n},
    {transaction_fee: 9n},
    {transaction_fee: 8n},
    {transaction_fee: 7n},
    {transaction_fee: 6n},
    {transaction_fee: 5n},
    {transaction_fee: 4n},
    {transaction_fee: 3n},
    {transaction_fee: 2n},
    {transaction_fee: 1n},
];

const transactionBlocks2 = [
    {transaction_fee: 20n},
    {transaction_fee: 4n},
    {transaction_fee: 1n}
];

var top_10_transactions = [];       // global ariable

function processBlock(block) {      
    // no 'map', no new array, objects, no concat
    top_10_transactions = [];       // refresh

    block.sort((a,b) => parseInt(b.transaction_fee) - parseInt(a.transaction_fee));     // final block in descending order

    if (block.length < 10) {
        var length = block.length;
    } else length = 10;

    for (let i=0; i < length; i++ ) {
        top_10_transactions.push(block[i]);
    }  
}

processBlock(transactionBlocks1);
console.log(top_10_transactions);

console.log('$===============$');

processBlock(transactionBlocks2);
console.log(top_10_transactions);

function getRandomFloat() {
    return parseFloat((Math.random() * 4 + 1).toFixed(1));
}
// finally product a random value
console.log(getRandomFloat());

