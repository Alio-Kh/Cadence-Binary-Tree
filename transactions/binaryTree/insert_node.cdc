import BinaryTree from "../../contracts/lib/BinaryTree.cdc"

transaction(balance: UFix64) {
  
  prepare(signer: AuthAccount) {}

  execute {
    BinaryTree.insert(balance: balance)
  }
}
