# Yeild farming
*Yeild farming :* lending or staking your cryptocurrency coins or tokens to get rewards in the form of interest.

https://user-images.githubusercontent.com/55044734/167285799-64d089c5-f884-428b-8a36-e87297b3ddfd.mp4

### Project features :bulb:

- [x] User can buy mTether token.
- [x] User can stake tether token.
- [x] User can unstake tether token.
- [x] Admin can send reword token.
- [x] If user stake 10 token then he will get same amount of reword token back .
- [x] Connect with waller.

### Test cases
![image](https://user-images.githubusercontent.com/55044734/167285858-72b092c9-c6f0-4b33-803f-67e6b3f7fe20.png)



### Tech stack & packages used 📦

| package                                                             | explain                                                               |
| ------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [Next.js](https://nextjs.org/docs/getting-started)                  | For building frontend                                                 |
| [solidity](https://docs.soliditylang.org/en/v0.8.13/)               | For writting smart contracts                                          |
| [tailwind css](https://tailwindcss.com/docs/installation)           | For building design                                                   |       
| [ether.js](https://docs.ethers.io/v5/)                              | Web3 client (contract testing ).                                      |
| [web3.js](https://www.npmjs.com/package/web3)                       | Web3 client (Frontend Next.js).                                       |
| [Chai](https://www.npmjs.com/package/chai)                          | javascript testing framework.                                         |
| [react-toastify](https://www.npmjs.com/package/react-toastify)      | For Notification.                                                     |   
| [hardhat](https://www.npmjs.com/package/hardhat)                    | Ethereum development environment.                                     | 
| [Redux](https://www.npmjs.com/package/hardhat)                      | For managing and centralizing application state.                      |   


----------------

### How to run :runner: :

- Run hardhat node
    ```
    npx hardhat node
    ```
- Run test cases
    ```
    npx hardhat test
    ```
- Deploy contract in local hardhat node
    ```
    npx hardhat run scripts/deploy.js --network localhost
    ```
- Connect hardhat with metamask
- Run Next.js frontend
    ```
    cd client
    npm run dev
    ```
### Web3.js 
------------
- [Load web3](https://web3js.readthedocs.io/en/v1.2.11/web3-eth.html#web3-eth)
- [Connect with contract](https://web3js.readthedocs.io/en/v1.2.11/web3-eth-contract.html#web3-eth-contract)
    ```
    new web3.eth.Contract(jsonInterface[, address][, options])
    ```
- [Callback promises events](https://web3js.readthedocs.io/en/v1.2.11/callbacks-promises-events.html#callbacks-promises-events)
    ```
    .on('transactionHash', function(hash){ ... })
    .on('error', function(error){ ... })
    ```
- [Subscribe to event](https://web3js.readthedocs.io/en/v1.2.11/web3-eth-contract.html#contract-events)
    ```
    contractName.events.EventName([options][, callback])
    ```
- [Fetch all data from contract event](https://web3js.readthedocs.io/en/v1.2.11/web3-eth-contract.html#getpastevents)
    - <small> An array with the past event Objects, matching the given event name and filter.</small>

    ```
    contractName.getPastEvents(EventName[, options][, callback])
    ```

### Hardhat commands
```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/deploy.js
npx hardhat help
npx hardhat run scripts/deploy.js --network <network name>
```
