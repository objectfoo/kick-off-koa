'use strict';

var koa = require('koa')
	, app = koa()
;

app
	.use(responseTime)
	.use(upperCase)
	.use(function* () {
		this.body = 'hello koa';
	})
	.listen(process.argv[2]);

function* responseTime(next) {
	var start = process.hrtime();

	yield next;
	this.set('X-Response-Time', msSince(start));
}

function* upperCase(next) {
	yield next;
	this.body = this.body.toUpperCase();
}

function msSince(start) {
	var diff = process.hrtime(start);

	return (diff[0] * 1e9 + diff[1]) / 1e6;
}