const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash='') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }

    mineBlock(difficulty) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash);
    }
}

class BlockChain{
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
    }

    createGenesisBlock() {
        return new Block(0, "10/2/1998", "Genesis block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        this.chain.push(newBlock);
    }

    isChainValid() {
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}

let cryptoCoin = new BlockChain();

console.log('mining block 1...');
console.log(cryptoCoin.addBlock(new Block(1, "29/12/1997", { amount : 4 })));
console.log('mining block 2...');
console.log(cryptoCoin.addBlock(new Block(2, "10/4/2016", { amount : 10 })));
console.log('mining block 3...');
console.log(cryptoCoin.addBlock(new Block(3, "4/6/2018", { amount : 6 })));
console.log('mining block 4...');
console.log(cryptoCoin.addBlock(new Block(4, "7/6/2019", { amount : 12 })));
console.log('mining block 5...');
console.log(cryptoCoin.addBlock(new Block(5, "1/4/2012", { amount : 2 })));


// console.log('is valid: ' + cryptoCoin.isChainValid());
// console.log(JSON.stringify(cryptoCoin, null, 4));

