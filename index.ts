import Web3 from 'web3'
const web3 = new Web3('ws://localhost:8546')

const SUBSCRIPTION_COUNT = 1000000
const receivedCount: { [key: number]: number } = {}
const subscriptions: any[] = []

function receiveHeader(blockNumber: number) {
  receivedCount[blockNumber] = receivedCount[blockNumber] || 0
  receivedCount[blockNumber]++
  if (receivedCount[blockNumber] === SUBSCRIPTION_COUNT) {
    console.log(
      `Received ${SUBSCRIPTION_COUNT} responses for block # ${blockNumber}`,
    )
  }
}

async function main() {
  for (let idx = 0; idx < SUBSCRIPTION_COUNT; idx++) {
    const subscription = web3.eth.subscribe(
      'newBlockHeaders',
      (err, blockHeader) => {
        if (err) {
          console.log('error:', err)
        } else {
          receiveHeader(blockHeader.number)
        }
      },
    )
    subscriptions.push(subscription)
  }
}

main()
