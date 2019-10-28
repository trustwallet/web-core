#!/bin/bash
ng build --prod --output-hashing none
cat dist/ui-coins/runtime-es5.js dist/ui-coins/polyfills-es5.js dist/ui-coins/main-es5.js > dist/ui-coins/main.js
