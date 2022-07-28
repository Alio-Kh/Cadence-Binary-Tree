import {
  init,
  emulator,
  getContractAddress,
  getServiceAddress,
  getAccountAddress,
  shallPass,
} from "flow-js-testing";
import { deployContracts } from "../deployer/deployer";
import { getBasePath } from "../utils";
import { insertNode, removetNode, preorder, findMinNode, search } from "./binaryTree";

describe("BinaryTree Tests", () => {
  beforeAll(async () => {
    const port = 8080;
    const logging = false;
    await init(getBasePath(), { port, logging });
    await emulator.start(port);
    await deployContracts();
  });

  afterAll(async () => {
    await emulator.stop();
  });

  it("should have deployed the BinaryTree contract", async () => {
    const contract = await getContractAddress("BinaryTree");
    expect(contract).toEqual(await getServiceAddress());
  });

  it("Should insert a node in the tree with the given balance amount", async () => {
    const Alice = await getAccountAddress("Alice");
    const balance = 15;
    const [tx] = await shallPass(insertNode(balance, Alice));
    expect(tx).toBeDefined();

    expect(tx.events.length).toEqual(1);
    expect(tx.events[0].type).toContain("BinaryTree.NodeAdded");
    expect(parseFloat(tx.events[0].data.balance)).toEqual(balance);
  });

  it("Should insert a node in the tree with the given balance amount", async () => {
    const Alice = await getAccountAddress("Alice");
    let balances: number[] = [25, 10, 70, 22, 17, 130, 50, 90, 27];
    
    for (let index = 0; index < balances.length; index++) {
      const [tx] = await shallPass(insertNode(balances[index], Alice));
      expect(tx).toBeDefined();
      expect(tx.events.length).toEqual(1);
      expect(tx.events[0].type).toContain("BinaryTree.NodeAdded");
      expect(parseFloat(tx.events[0].data.balance)).toEqual(balances[index]);
    }

    let preorderedBalances = await preorder();
    expect(parseFloat(preorderedBalances[0][6])).toEqual(50);

    console.log(preorderedBalances);
  });

  it("Should find the node with the min balance", async () => {
    const Alice = await getAccountAddress("Alice");
    
    let balances: number[] = [];
    for (let index = 0; index < 10; index++) {
      balances[index] = Math.floor(Math.random() * 10000)/1000;
    }
    for (let index = 0; index < balances.length; index++) {
      const [tx] = await shallPass(insertNode(balances[index], Alice));
      expect(tx).toBeDefined();
      expect(tx.events.length).toEqual(1);
      expect(tx.events[0].type).toContain("BinaryTree.NodeAdded");
      expect(parseFloat(tx.events[0].data.balance)).toEqual(balances[index]);
    }

    let minNode = await findMinNode();
    expect(parseFloat(minNode[0].balance)).toEqual(Math.min(...balances));
  });

  it("Should find the node with the min balance", async () => {
    
    let node = await search(130);
    expect(parseFloat(node[0].balance)).toEqual(130);
  });

  //   it("Should remove a node in the tree with the given balance amount", async () => {
  //     const Alice = await getAccountAddress("Alice");
  //     const balance = 10.5;
  //     const [tx] = await shallPass(removeNode(balance, Alice));
  //     expect(tx).toBeDefined();
  //     expect(tx.events.length).toEqual(1);
  //     expect(tx.events[0].type).toContain("BinaryTree.NodeRemoved");
  //     expect(parseFloat(tx.events[0].data.balance)).toEqual(balance);
  //   });
});
