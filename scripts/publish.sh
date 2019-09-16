#!/usr/bin/env bash

env=${1}

if [[ $env == "beta" ]]
then
    npm publish --tag beta --access=public ./dist/dss
    npm publish --tag beta --access=public ./dist/eva
    npm publish --tag beta --access=public ./dist/processor
else
    npm publish --access=public ./dist/dss
    npm publish --access=public ./dist/eva
    npm publish --access=public ./dist/processor
fi
