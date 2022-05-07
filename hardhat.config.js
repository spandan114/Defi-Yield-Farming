require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.4",
  hardhat: {
    chainId: 31337
  },
  paths: {
    artifacts: "./client/artifacts",
  },
};
