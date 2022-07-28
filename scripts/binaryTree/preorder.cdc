
import BinaryTree from "../../contracts/lib/BinaryTree.cdc"

pub fun main(): [UFix64] {
  return BinaryTree.preorder(node: BinaryTree.root)
}