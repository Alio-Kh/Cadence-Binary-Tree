import BinaryTree from "../../contracts/lib/BinaryTree.cdc"

pub fun main(): BinaryTree.Node? {
  return  BinaryTree.findMinNode(node: BinaryTree.root)
}
