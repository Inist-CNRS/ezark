#!/bin/bash

if [ "$(cat /app/data.json)" == "{}" ]; then
	cp -f /app/config.local.json /app/data.json
fi

exec /app/ezark 
