const { ethers } = require('hardhat')

const main = async () => {
  const TransactionsContractFactory = await ethers.getContractFactory('Transactions');
  console.log('Deploying contract....')
  const contract = await TransactionsContractFactory.deploy();
  await contract.deployed();
  console.log(`Deployed contract to: ${contract.address}`)
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err)
    process.exit(1)
  })