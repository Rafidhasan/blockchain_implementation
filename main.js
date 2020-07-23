// Package initialization

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
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while(this.hash.substring(0, difficulty !== Array(difficulty + 1).join("0"))) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("block mined" + this.hash);
    }
}

class BlockChain{
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 0;
    }

    createGenesisBlock() {
        return new Block(0, "10/2/1998", "Genesis block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    // addblock method for basic implementation

    // addBlock(newBlock) {
    //     newBlock.previousHash = this.getLatestBlock().hash;
    //     newBlock.hash = newBlock.calculateHash();
    //     this.chain.push(newBlock);
    // }

    // addblock method for data mining
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
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


// General Output
// cryptoCoin.addBlock(new Block(1, "10/07/2017", { amount: 4 }));
// cryptoCoin.addBlock(new Block(2, "12/07/2020", { amount: 10 }));

// console.log(JSON.stringify(cryptoCoin, null, 4));


// security checking - case 1

// console.log('Is blockchain valid? ' + cryptoCoin.isChainValid());

// cryptoCoin.chain[1].data = { amount: 100 };

// console.log('Is blockchain valid? ' + cryptoCoin.isChainValid());


// Prrof work: We dont want to people to create 100 and 1000 of blocks per second and spam our blockchain. 
// There is a security issue... 


// Proof of work: (mining)
// console.log('mining block 1...');
// cryptoCoin.addBlock(new Block(1, "10/07/2017", { amount: 4 }));
// console.log('mining block 2...');
// cryptoCoin.addBlock(new Block(2, "12/07/2020", { amount: 10 }));
