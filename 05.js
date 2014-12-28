'use strict';

var koa = require('koa')
	, app = koa()
;

app.use(function* () {
	this.body = this.request.is('json') ?
		{ message: 'hi!' } :
		'ok';
});

app.listen(process.argv[2]);
