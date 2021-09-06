#!/bin/bash

valid='1'

if [[ $1 == "development" ]];
  then
	VUE_APP_API_URL=http://localhost:5001 
elif [[ $1 == "production" ]];
  then
   	VUE_APP_API_URL= 
else
	valid='0'
fi

if [[ $valid == 1 ]];
	then
cat >.env <<EOL
VUE_APP_API_URL=${VUE_APP_API_URL}
EOL
echo "Environment '$1' created."

else
	echo "WRONG INPUT - try development | production"
fi
