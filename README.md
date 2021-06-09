# Pangan Kita
Pangan Kita is a food security backed by blockchain, Pangan Kita brings "trust" to food.

_Currently this codebase is intended for Ubuntu only._

## Prerequisites
- `node.js`
- `npm`
- `docker`
- `docker-compose`
- [optional] `screen`

_DISCLAIMER: Hyperledger Composer is deprecated, therefore please refer to Hyperledger Composer which version it needs for these prerequisites._

### Install Hyperledger Composer Prerequisites
```bash
curl -O https://hyperledger.github.io/composer/latest/prereqs-ubuntu.sh

chmod u+x prereqs-ubuntu.sh

./prereqs-ubuntu.sh
```

### Install some Hyperledger Composer CLI Tools
```bash
sudo npm install --unsafe-perm --verbose -g composer-cli@0.20

sudo npm install --unsafe-perm --verbose -g composer-rest-server@0.20

sudo npm install --unsafe-perm --verbose -g generator-hyperledger-composer@0.20

sudo npm install --unsafe-perm --verbose -g composer-playground@0.20

sudo npm install --unsafe-perm --verbose -g yo
```

## Deployment

### 1. Install HyperledgerFabric V.1.2.
```bash
mkdir ~/fabric-dev-servers && cd ~/fabric-dev-servers

curl -O https://raw.githubusercontent.com/hyperledger/composer-tools/master/packages/fabric-dev-servers/fabric-dev-servers.tar.gz
tar -xvf fabric-dev-servers.tar.gzcd ~/fabric-dev-servers

export FABRIC_VERSION=hlfv12

./downloadFabric.sh
```

### 2. Generate a PeerAdmin Card
```bash
./startFabric.sh

./createPeerAdminCard.sh
```

### 3. Start The Hyperledger Composer Playground

- Without `screen`
```bash
composer-playground

```

- With `screen` (recommended)
```bash
screen -dmS playground composer-playground
```

### 4. Import `foodnet.bna` as a new Business Network

- Import `foodnet.bna` from this repository as a new Business Network either under the `Connection: Web Browser` or `My Business Networks`
- Press `Connect Now` to connect into foodnet Business Network
- Now you are able to test out our proof of concept

### 5. [Optional] Deploy as a REST API Server

```bash
composer network install --card PeerAdmin@hlfv1 -a foodnet.bna

composer network start -c PeerAdmin@hlfv1 -n foodnet -V 0.0.2-deploy.13 -A admin -S admin

composer-rest-server -c admin@foodnet-network -n always -w true
```
