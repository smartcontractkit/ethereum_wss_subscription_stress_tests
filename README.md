# WSS Subscription Stress Tests

This repo contains a few scripts for testing the limit on the number of WSS subscriptions that can be opened with an ethereum client. The purpose of determining this number is so that an appropriate upper bound can be set when developing the Chainlink core node.

#### Results:

- Fiews ~ 1000 (roughly, may be lower based on hardware limitations. Talked to Jonas Hals)
- Infura - 1000 (see link above)
- Geth & Parity - 100,000+ (my machine handled 100,000 with minimal lag, but froze at 1M)

## Prerequisites - Install Geth & Parity

I installed geth natively and ran parity through docker.

[Install Geth](https://geth.ethereum.org/docs/install-and-build/installing-geth)

[Install Parity](https://wiki.parity.io/Docker)

## Running the tests

First, run `npm install`

If you installed geth or parity differently from above, you will have to change how you start the service. The important part in the startup scripts are just the flags. I started both clients in light mode and opened both the http and wss endpoints. The http endpoint is nice to have open so that you can easily test the setup using curl.

Run either
`./lib/start_geth` or `./lib/start_parity`

Wait until the clients are up and running. You can test by curling the http endpoint, `http://localhost:8545`. Note that parity will download something like ~100MB worth of blockchain data before it is ready to open wss subscriptions, so you have to wait a bit longer - maybe as much as 20 min.

After the client is up and running you can start to stress test.

Note the `SUBSCRIPTION_COUNT` constant in `index.ts`. Change this value as you like to see where geth and parity start to choke. But be careful, as it may grind your machine to a hault. Right now the number of subscriptions is set to 100,000, which was manageable by my laptop.

Run the test by running `npm test`
