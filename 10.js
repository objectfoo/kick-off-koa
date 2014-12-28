'use strict';

var koa = require('koa')
	, views = require('co-views')
	, app = koa()
	, render = views(__dirname + '/views', { ext: 'ejs' })
;


app.use(handler);
app.listen(process.argv[2]);


function* handler(next) {
	if (this.path !== '/') return yield next;

	this.body = yield render('index', fetchUser());
}


function fetchUser() {
	return {
		name: { first: 'Tobi', last: 'Holowaychuk' },
		species: 'ferret',
		age: 3
	};
}
