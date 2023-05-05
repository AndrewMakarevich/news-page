#!/bin/bash

npm run build 

npm run sequelize:pre:seed 

node dist/main | while read line; do
echo $line
if [[ "$line" == *"Nest application successfully started"* ]]; 
    then
        npm run sequelize:post:seed | while read seedLine; do
            echo $seedLine
        done
fi
done