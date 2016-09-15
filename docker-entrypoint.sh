#!/bin/bash

if [ "$(cat /app/config.local.json)" == "{}" ]; then
	cp -f /app/config.sample.json /app/config.local.json
fi

export no_proxy=localhost,127.0.0.1
export NO_PROXY=localhost,127.0.0.1
exec /apt/ezark
