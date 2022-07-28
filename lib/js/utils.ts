import { getServiceAddress } from "flow-js-testing";
import path from "path";

export function getBasePath() {
  return path.resolve(__dirname, "../../");
}

export function toUFix64(num: number) {
  return Number.isInteger(num) ? num + ".0" : num.toString();
}

export async function getAddressMap(to?: any) {
  const account = to ?? (await getServiceAddress());

  return {
    NonFungibleToken: account,
    FUSD: account,
    MetadataViews: account,
  };
}
