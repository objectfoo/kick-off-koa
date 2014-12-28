'use strict';

var koa = require('koa')
	, app = koa();

app.use(handler)
	.listen(process.argv[2]);


function* handler() {
	this.body = 'hello koa';
}
