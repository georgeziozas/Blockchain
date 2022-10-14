const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

describe("SimpleStorage", function () {
    let simpleStorageFactory, simpleStorageContract
    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorageContract = await simpleStorageFactory.deploy()
    })

    it("Should start with a favourite number of 0", async function () {
        const currentValue = await simpleStorageContract.retrieve()
        const expectedValue = "0"
        assert.equal(currentValue.toString(), expectedValue)
    })

    //if we write it.only it will run only this one test
    it("Should update when we call store", async function () {
        const expectedValue = "7"
        const transactionResponse = await simpleStorageContract.store(
            expectedValue
        )
        await transactionResponse.wait(1)

        const currentValue = await simpleStorageContract.retrieve()
        assert.equal(currentValue.toString(), expectedValue)
    })
})
