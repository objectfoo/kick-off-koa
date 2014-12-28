'use strict';

var koa = require('koa')
	, app = koa()
	, opts = { signed: true };

app.keys = ['secret', 'keys']

app.use(function* (next) {
	var count = ~~this.cookies.get('view', opts) + 1;

	this.cookies.set('view', count, opts);
	this.body = count + ' views';
});

app.listen(process.argv[2]);
