async function main() {
  // We get the contract to deplo
  const MarketPlace = await ethers.getContractFactory("MarketPlace");
  const marketPlace = await MarketPlace.deploy();

  await marketPlace.deployed();
  console.log("MarketPlace deployed to:", marketPlace.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
