import { Address, UFix64 } from "@onflow/types";
import {
  getContractAddress,
  getTransactionCode,
  sendTransaction,
  getScriptCode,
  executeScript,
} from "flow-js-testing";
import { toUFix64 } from "../utils";

export async function insertNode(
  balance: number,
  account: any
): Promise<[{ events: any[] }]> {
  return sendTransaction({
    code: await getTransactionCode({
      name: "binaryTree/insert_node",
      addressMap: {},
    }),
    args: [[toUFix64(balance), UFix64]],
    signers: [account],
  });
}

export async function removetNode(
  balance: number,
  account: any
): Promise<[{ events: any[] }]> {
  return sendTransaction({
    code: await getTransactionCode({
      name: "binaryTree/remove_node",
      addressMap: {},
    }),
    args: [[toUFix64(balance), UFix64]],
    signers: [account],
  });
}

export async function preorder(): Promise<number[]> {
  return executeScript({
    code: await getScriptCode({
      name: "binaryTree/preorder",
      addressMap: {},
    }),
    args: [],
  });
}

export async function search(balance: number): Promise<any> {
  return executeScript({
    code: await getScriptCode({
      name: "binaryTree/search",
      addressMap: {},
    }),
    args: [[toUFix64(balance), UFix64]],
  });
}

export async function findMinNode(): Promise<any> {
  return executeScript({
    code: await getScriptCode({
      name: "binaryTree/find_min_node",
      addressMap: {},
    }),
    args: [],
  });
}
