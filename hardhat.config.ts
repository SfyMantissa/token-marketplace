import * as dotenv from "dotenv";

import { HardhatUserConfig } from "hardhat/config";
import './tasks/index';
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import '@primitivefi/hardhat-dodoc';
import "hardhat-etherscan-abi";
import "hardhat-deploy";
import "solidity-coverage";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.8",
  defaultNetwork: "rinkeby",
  networks: {
    rinkeby: {
      url: process.env.ALCHEMY_HTTP_RINKEBY ?? "",
      accounts: [
        process.env.ACCOUNT1_KEY ?? "",
        process.env.ACCOUNT2_KEY ?? "",
        process.env.ACCOUNT3_KEY ?? ""
      ],
    },
    goerli: {
      url: process.env.ALCHEMY_HTTP_GOERLI ?? "",
      accounts: [
        process.env.ACCOUNT1_KEY ?? "",
        process.env.ACCOUNT2_KEY ?? "",
        process.env.ACCOUNT3_KEY ?? ""
      ],
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY ?? ""
  }
};
export default config;
