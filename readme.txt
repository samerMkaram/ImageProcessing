About
==================================
this API making resize for given image with diffrent extentions(.jpg , .png)
this API is extednable to have other functions than RESIZE 


Project structure
=================================
in src/api/ routes directory , there are a route for each function (resize is first one and should be a directory for each new function route)

in resize subdirectory , tow folders 
	1- assets : where original images exists.  (./src/api/routes/resize/assets)
	2- cached : where cashed images are saved and called by API (./src/api/routes/resize/cached)


Depenecies 
==================================
typescript
prettier
eslint
eslint-config-prettier
eslint-plugin-prettier
@typescript-eslint/eslint-plugin
@typescript-eslint/parser
nodemon
express
@types/express
jasmine
jasmine-spec-reporter
@types/jasmine
sharp
@types/sharp
supertest
@types/supertest


scripts
===================================
=> npm run test 	//start Jasmine unit test
=> npm run start	//start server
=> npm run lint		//run lint 
=> npm run lint:fix	//run lint and fix errors
=> npm run prettier	//run prettier formatter


API call
=================================
ex=> http://localhost:5000/api/resize?filename=encenadaport&width=1000&heigh=1000


