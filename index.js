const sha256 = require("crypto-js/sha256");
class Block {
  constructor(timestamp, data, previousHash="") {
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }
  calculateHash() {
    return sha256(
      this.timestamp + JSON.stringify(this.data) + this.previousHash
    ).toString();
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.generateGenesisBlock()];
  }
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }
  generateGenesisBlock() {
    return new Block("1900-01-01", "genesis", "0000");
  }
  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }
}
const fozlolcoin = new Blockchain();
const block = new Block("2022-01-01", { amount: 5 });
fozlolcoin.addBlock(block);
console.log(block);
console.log(fozlolcoin);
