const { assert, expect } = require("chai")
const { deployments, ethers, getNamedAccounts } = require("hardhat")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe", () => {
          let fundMe
          let deployer
          let MockV3Aggregator
          const sendValue = ethers.utils.parseEther("1") //1eth
          beforeEach(async () => {
              //const accounts = await ethers.getSigners()
              //const accountZero = accounts[0]
              const deployer = (await getNamedAccounts()).deployer
              await deployments.fixture(["all"])
              fundMe = await ethers.getContract("FundMe", deployer)
              MockV3Aggregator = await ethers.getContract(
                  "MockV3Aggregator",
                  deployer
              )
          })
          describe("constructor", () => {
              it("sets the aggregator addresses correctly", async function () {
                  const response = await fundMe.getPriceFeed()
                  assert.equal(response, MockV3Aggregator.address)
              })
          })

          describe("fund", () => {
              it("Fails if you dont send enough eth", async function () {
                  await expect(
                      fundMe
                          .fund()
                          .to.be.revertedWith("You need to spend more ETH!")
                  )
              })
          })

          it("updated the amount funded data structure", async function () {
              await expect(fundMe.fund({ value: sendValue }))
              const response = await fundMe.getAddressToAmountFunded(deployer)
              assert.equal(response.toString(), sendValue.toString())
          })

          it("Adds funder to array of funders", async () => {
              await fundMe.fund({ value: sendValue })
              const response = await fundMe.getFunder(0)
              assert.equal(response, deployer)
          })

          describe("withdraw", () => {
              beforeEach(async function () {
                  await fundMe.fund({ value: sendValue })
              })

              it("Withdraw Eth from a single founder", async () => {
                  //Arrange the test
                  const startingFundMeBalance =
                      await fundMe.provider.getBalance(fundMe.address)
                  const startingDeployerBalance =
                      await fundMe.provider.getBalance(deployer)

                  //Act on the test
                  const transactionResponse = await fundMe.withdraw()
                  const transactionReceipt = await transactionResponse.wait()

                  const { gasUsed, effectiveGasPrice } = transactionReceipt
                  const gasCost = gasUsed.mul(effectiveGasPrice)

                  const endingFundMeBalance = await fundMe.provider.getBalance(
                      fundMe.address
                  )
                  const endingDeployerBalance =
                      await fundMe.provider.getBalance(deployer)

                  //Assert the test
                  assert.equal(endingFundMeBalance, 0)
                  assert.equal(
                      startingFundMeBalance
                          .add(startingDeployerBalance)
                          .toString(),
                      endingDeployerBalance.add(gasCost).toString()
                  )
              })
          })

          // this test is overloaded. Ideally we'd split it into multiple tests
          // but for simplicity we left it as one
          it("is allows us to withdraw with multiple funders", async () => {
              // Arrange
              const accounts = await ethers.getSigners()
              for (i = 1; i < 6; i++) {
                  const fundMeConnectedContract = await fundMe.connect(
                      accounts[i]
                  )
                  await fundMeConnectedContract.fund({ value: sendValue })
              }
              const startingFundMeBalance = await fundMe.provider.getBalance(
                  fundMe.address
              )
              const startingDeployerBalance = await fundMe.provider.getBalance(
                  deployer
              )

              // Act
              const transactionResponse = await fundMe.cheaperWithdraw()
              // Let's comapre gas costs :)
              // const transactionResponse = await fundMe.withdraw()
              const transactionReceipt = await transactionResponse.wait()
              const { gasUsed, effectiveGasPrice } = transactionReceipt
              const withdrawGasCost = gasUsed.mul(effectiveGasPrice)
              console.log(`GasCost: ${withdrawGasCost}`)
              console.log(`GasUsed: ${gasUsed}`)
              console.log(`GasPrice: ${effectiveGasPrice}`)
              const endingFundMeBalance = await fundMe.provider.getBalance(
                  fundMe.address
              )
              const endingDeployerBalance = await fundMe.provider.getBalance(
                  deployer
              )
              // Assert
              assert.equal(
                  startingFundMeBalance.add(startingDeployerBalance).toString(),
                  endingDeployerBalance.add(withdrawGasCost).toString()
              )
              // Make a getter for storage variables
              await expect(fundMe.getFunder(0)).to.be.reverted

              for (i = 1; i < 6; i++) {
                  assert.equal(
                      await fundMe.getAddressToAmountFunded(
                          accounts[i].address
                      ),
                      0
                  )
              }
          })

          it("Only allows the owner to withdraw", async function () {
              const accounts = await ethers.getSigners()
              const fundMeConnectedContract = await fundMe.connect(accounts[1])
              await expect(
                  fundMeConnectedContract.withdraw()
              ).to.be.revertedWith("FundMe__NotOwner")
          })
      })
