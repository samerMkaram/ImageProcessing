About
==================================
this API making resize for given image
this API is extednable to have other functions than RESIZE 


Project structure
=================================
in src => routes directory , there are a route for each function (resize is first one and should be a directory for each new function route)

in resize subdirectory , tow folders 
	1- assets : where original images exists. 
	2- cached : where cashed images are saved and called by API


Depenecies 
==================================
npm init -y 
npm install typescript --save-dev
npx tsc --init
npm install eslint-config-prettier --save-dev
npm install eslint-plugin-prettier --save-dev
npx eslint --init
npm install sharp
npm install supertest jasmine-spec-reporter jasmine
npm install --save-dev @types/jasmine
npm install sharp
npm install supertest
npm install --save-dev @types/supertest
npm install @types/sharp


scripts
===================================
=> npm run test 	//start Jasmine unit test
=> npm run start	//start server
=> npm run lint		//run lint 
=> npm run lint:fix	//run lint and fix errors
=> npm run prettier	//run prettier formatter

API call
=================================
ex=> http://localhost:3000/api/resize?filename=encenadaport&width=1000&heigh=1000


