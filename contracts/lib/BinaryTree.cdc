pub contract BinaryTree {

    // Emitted when the contract is initialized
    pub event ContractInitialized()
    
    pub event NodeAdded(balance: UFix64)
    
    pub event NodeRemoved(balance: UFix64)


    pub var root: Node?
    // Declare a public field of type String.
    //
    // All fields must be initialized in the init() function.
    pub struct Node {
        pub var balance : UFix64
        pub(set) var left: Node?
        pub(set) var right: Node?

        pub fun setLeft(left: Node?){
            self.left = left
            log(self.left!.balance)
        }

        pub fun setRight(right: Node?){
            
            self.right = right
            log(self.right!.balance)
        }

        pub fun setBalance(balance: UFix64){
            self.balance = balance
        }

        init(balance: UFix64){
            self.balance = balance
            self.left = nil
            self.right = nil
        }
    }

    pub fun insert(balance : UFix64) {
      
      var newNode = Node(balance: balance)

      if self.root == nil {
        self.root = newNode
      } else {
        self.root = self.insertNode(node: self.root, newNode: newNode)
      }

      emit NodeAdded(balance: balance)
    }

    // Method to insert a node in a tree
    // it moves over the tree to find the location
    // to insert a node with a given balance 
    pub fun insertNode(node: Node?, newNode: Node): Node? {
        pre {
            node != nil : "node is nil"
        }
        // if the balance  is less than the node
        // balance  move left of the tree
        if newNode.balance  < node!.balance {
            // if left is null insert node here
            if node!.left == nil {
                node!.setLeft(left: newNode)
            } else {
                // if left is not null recur until
                // null is found
                node!.setLeft(left: self.insertNode(node: node!.left, newNode: newNode))
            }
        } else {
            // if right is null insert node here
            if(node!.right == nil){
                node!.setRight(right: newNode)
            } else {
                // if right is not null recur until
                // null is found
                node!.setRight(right: self.insertNode(node: node!.right, newNode: newNode))
            }
        }
         return node
    }


    pub fun remove(balance : UFix64){
      self.root = self.removeNode(node: BinaryTree.root, balance: balance)
      
      emit NodeRemoved(balance: balance)
    }
 

    
    pub fun removeNode(node: Node?, balance: UFix64): Node? {
        if node == nil {
            return nil
        }
        // if balance  to be delete is less than
        // roots balance  then move to left subtree
        else if balance < node!.balance  {
            let leftNode : Node? = self.removeNode(node: node!.left, balance: balance)
            node!.setLeft(left: leftNode) 
            return node
        }
  
        // if balance  to be delete is greater than
        // roots balance  then move to right subtree
        else if balance > node!.balance  {
            let rightNode : Node? = self.removeNode(node: node!.right, balance: balance)
            node!.setRight(right: rightNode)
            return node
        }
  
        // if balance  is similar to the root's balance 
        // then delete this node
        else {
            log("jdfshfskfhs")
            // deleting node with no children
            if node!.left == nil && node!.right == nil {
                return nil
            }

            // deleting node with one children
            if node!.left == nil {
                return node!.right
            }
            
            else if node!.right == nil {
                return node!.left
            }
            log("dfqkq;qqqq")
            // Deleting node with two children
            // minimum node of the right subtree
            // is stored in aux
            var aux: Node? = self.findMinNode(node: node!.right)
            log(aux)
            node!.setBalance(balance: aux!.balance)

            let rightNode: Node? = self.removeNode(node: node!.right, balance: aux!.balance)
            log(rightNode)
            node!.setRight(right: rightNode)
            return node
        }
    }

    pub fun findMinNode(node: Node?): Node? {
        if node == nil {
            return node
        }
        if node!.left == nil {
            return node
        } else {
            return self.findMinNode(node: node!.left)
        }
    }

    pub fun search(node: Node?, balance: UFix64): Node? {
        // if trees is empty return null
        if node == nil {
            return nil
        }
        // if data is less than node's data
        // move left
        else if balance < node!.balance {
            return self.search(node: node!.left, balance: balance)
        }
        // if data is less than node's data
        // move left
        else if balance > node!.balance {
            return self.search(node: node!.right, balance: balance)
        }
        // if data is equal to the node data
        // return node
        else {
            return node
        }
    }

    pub fun preorder(node: Node?): [UFix64] {
        var balances : [UFix64] = []
        var leftBalances : [UFix64] = []
        var rightBalances : [UFix64] = []
        
        if node != nil {
            balances.append(node!.balance)
            balances.appendAll(self.preorder(node: node!.left))
            balances.appendAll(self.preorder(node: node!.right))
            
        }
      
        return balances   
    }

    // returns root of the tree
    pub fun getRootNode(): Node? {
        return self.root
    }

    pub fun getRootRightNode(): Node? {
        return self.root!.right
    }
    pub fun getRootLeftNode(): Node? {
        return self.root!.right
    }

    init(){
        self.root = nil
        
        emit ContractInitialized()
    }
}