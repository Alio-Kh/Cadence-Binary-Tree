import {
  getServiceAddress,
  deployContract,
  getContractCode,
} from "flow-js-testing";
import { getAddressMap } from "../utils";

export async function deployContracts(): Promise<{
  binaryTree: any;
}> {
  const to = await getServiceAddress();
  const addressMap = await getAddressMap(to);

  const [binaryTree] = await deployContract({
    to,
    name: "BinaryTree",
    code: await getContractCode({ name: "lib/BinaryTree", addressMap }),
  });

  return {
    binaryTree,
  };
}
