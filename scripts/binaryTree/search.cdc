
import BinaryTree from "../../contracts/lib/BinaryTree.cdc"

pub fun main(balance: UFix64): BinaryTree.Node? {
  return BinaryTree.search(node: BinaryTree.root, balance: balance)
}