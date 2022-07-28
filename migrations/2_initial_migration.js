const WinLose = artifacts.require("WinLose");

module.exports = function (deployer) {
  deployer.deploy(WinLose);
};
