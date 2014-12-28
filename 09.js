'use strict';

var koa = require('koa')
	, session = require('koa-session')
	, app = koa()
;


app.keys = ['secret', 'keys']
app.use(session(app));
app.use(handler);
app.listen(process.argv[2]);


function* handler() {
	var views = ~~this.session.views + 1;

	this.session.views = views;
	this.body = views + ' views';
}
