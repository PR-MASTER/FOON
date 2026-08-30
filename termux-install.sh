#!/data/data/com.termux/files/usr/bin/bash
set -e
pkg update -y
pkg install nodejs -y
npm install
node server.js
