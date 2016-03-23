# ezark

A quick application starter boilerplate based on castor-core.

Replace "ezark" by your name in all files to start a new project ...

[![Build Status](https://travis-ci.org/Inist-CNRS/ezark.svg?branch=master)](https://travis-ci.org/Inist-CNRS/ezark)
[![Dependencies Status](https://david-dm.org/Inist-CNRS/ezark.png)](https://david-dm.org/Inist-CNRS/ezark)
[![bitHound Overall Score](https://www.bithound.io/github/Inist-CNRS/ezark/badges/score.svg)](https://www.bithound.io/github/Inist-CNRS/ezark)

[![Docker status](http://dockeri.co/image/inistcnrs/ezark)](https://hub.docker.com/r/inistcnrs/ezark/)


## Install and run

Without docker:

```shell
git clone https://github.com/Inist-CNRS/ezark.git
cd ezark
npm install
npm start
```

Then navigate to [http://127.0.0.1:3000](http://127.0.0.1:3000)

### With docker:
```shell
git clone https://github.com/Inist-CNRS/ezark.git
cd ezark
docker-compose up
```

It will download and run the [inistcnrs/ezark](https://hub.docker.com/r/inistcnrs/ezark/) docker image sharing ``./data/`` and ``./config.local.js`` with the docker container.

## Install and run for developements

### With npm:
To start ezark from a local git clone, you can follow these steps (needs nodejs and mongodb installed localy):
```shell
git clone https://github.com/Inist-CNRS/ezark.git
cd ezark
npm install
npm run debug
# the app is listening at http://127.0.0.1:3000/
# then open another terminal and your can freely edit the code
```

### With docker:
The same but with docker (advantage: do not need to have mongodb and nodejs isntalled localy):
```shell
git clone https://github.com/Inist-CNRS/ezark.git
cd ezark
npm install
npm run debug-docker
# or just: docker-compose -f docker-compose.dev.yml up
# the app is listening at http://127.0.0.1:3000/
# then open another terminal and your can freely edit the code
```

or without npm/node
```shell
git clone https://github.com/Inist-CNRS/ezark.git
cd ezark
make install
make run
# the app is listening at http://127.0.0.1:3000/
# then open another terminal and your can freely edit the code
```

## Configuration

Create a ``config.local.js`` containing:

```javascript
module.exports = {
  "logLevel" : "dev"
}
```


