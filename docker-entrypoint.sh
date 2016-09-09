#!/bin/bash

if [ "$(cat /app/config.local.json)" == "{}" ]; then
	cp -f /app/config.sample.json /app/config.local.json
fi

exec /app/ezark 
