'use strict';

var koa = require('koa')
	, app = koa()
	, parse = require('co-body')
;

app.use(function* (next) {
	var request;

	if (this.path === '/' && this.method === 'POST') {
		request = yield parse(this, {limit: '1kb'});
		this.body = request.name.toUpperCase();
	}
	else yield next;
});

app.listen(process.argv[2]);
