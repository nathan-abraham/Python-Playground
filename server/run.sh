#!/bin/sh

cp temp/user_code.py files/user_code.py

cd files

timeout 10 python ./user_code.py
if [ $? -eq 124 ]; then
    >&2 echo "Timeout"
else
    echo "Done"
fi