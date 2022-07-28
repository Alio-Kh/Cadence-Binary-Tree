import { init, emulator } from "flow-js-testing";
import { deployContracts } from "../deployer/deployer";
import { getBasePath } from "../utils";

describe("DeployerTests", () => {
  beforeEach(async () => {
    const port = 8080;
    const logging = false;
    await init(getBasePath(), { port, logging });
    return emulator.start(port);
  });

  afterEach(async () => {
    await emulator.stop();
  });

  it("should deploy the contracts", async () => {
    const response = await deployContracts();
    console.log("response", response.binaryTree.events);
    expect(response.binaryTree.status).toEqual(4);
    expect(response.binaryTree.statusString).toEqual("SEALED");
    expect(response.binaryTree.events[0].type).toContain(
      "BinaryTree.ContractInitialized"
    );
    expect(response.binaryTree.events[1].type).toContain(
      "flow.AccountContractAdded"
    );
    expect(response.binaryTree.events[1].data.contract).toEqual("BinaryTree");
    expect(response.binaryTree.events[2].type).toContain(
      "FlowManager.AccountAdded"
    );
  });
});
