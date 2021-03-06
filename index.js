const sha256 = require("crypto-js/sha256");
class Block {
  constructor(timestamp, transactions, previousHash="") {
    this.timestamp = timestamp;
    this.transactions = transactions;
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
      this.timestamp + JSON.stringify(this.transactions) + this.previousHash+ this.nonce
    ).toString();
  }
}

class Transaction{
  constructor(fromAddress, toAddress, amount){
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }
}
class Blockchain {
  constructor() {
    this.chain = [this.generateGenesisBlock()];
    this.difficulty =5; 

    this.pendingTransactions = [];
  }
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }
  generateGenesisBlock() {
    return new Block("1900-01-01", "genesis", "0000");
  }
  createTransaction (transaction){
    this.pendingTransactions.push(transaction);
  }
  minePendingTransactions(){
    let block = new Block(Date.now(),this.pendingTransactions)
    block.mineBlock(this.difficulty)
    this.chain.push(block)
    this.pendingTransactions = [];
  }
  // addBlock(newBlock) {
  //   newBlock.previousHash = this.getLatestBlock().hash;
  //   newBlock.mineBlock(this.difficulty);
  //   this.chain.push(newBlock);
  // }
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
// const block1 = new Block("2022-01-01", { amount: 5 });
// fozlolcoin.addBlock(block1);

// const block2 = new Block("2022-01-02", { amount: 10 });
// fozlolcoin.addBlock(block2);
fozlolcoin.createTransaction(new Transaction('address1', 'address2',100))
fozlolcoin.createTransaction(new Transaction('address2', 'address1',50))
fozlolcoin.minePendingTransactions();
console.log(fozlolcoin);

