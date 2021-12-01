const sha256 = require("crypto-js/sha256");
class Block {
  constructor(timestamp, data, previousHash="") {
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce=0;
  }
  mineBlock(difficulty) {
    while(
      this.hash.substring(0,difficulty) !== Array(difficulty+1).join("0")
    ){
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log('mining done: ', this.hash);
  }
  calculateHash() {
    return sha256(
      this.timestamp + JSON.stringify(this.data) + this.previousHash+ this.nonce
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
  isBlockchainValid(){
    for(let i=1; i<this.chain.length; i++){
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i-1];
      if(currentBlock.hash !== currentBlock.calculateHash()){
        return false;
      }
      if(currentBlock.previousHash !== previousBlock.hash){
        return false;
      }
    }
    return true;
  }
}
const fozlolcoin = new Blockchain();
const block = new Block("2022-01-01", { amount: 5 });
fozlolcoin.addBlock(block);
console.log(block);
console.log(fozlolcoin.isBlockchainValid());

fozlolcoin.chain[1].data="hacked";
console.log(fozlolcoin.isBlockchainValid());

