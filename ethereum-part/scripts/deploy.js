async function main() {
  // We get the contract to deplo
  const MarketPlace = await ethers.getContractFactory("MarketPlace");
  const marketPlace = await MarketPlace.deploy();

  await marketPlace.deployed();
  console.log("MarketPlace deployed to:", marketPlace.address);

  fs = require('fs');
  fs.writeFileSync('./ADDRESS.txt', marketPlace.address, function (err) {
    if (err) return console.log(err);
    console.log('Unable to write address to file');
  });

  // fs.writeFile('../ABI', marketPlace, function (err) {
  //   if (err) return console.log(err);
  //   console.log('Hello World > helloworld.txt');
  // });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
