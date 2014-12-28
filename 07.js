'use strict';

var koa = require('koa')
	, app = koa()
;


app.use(errorHandler());
app.use(function* () {
	if (this.path === '/error') throw new Error('ooops');
	this.body = 'OK';
});
app.listen(process.argv[2]);


function errorHandler() {
	return function* (next) {
		try {
			yield next;
		}
		catch(e) {
			this.status = 500;
			this.body = 'internal server error';
			this.app.emit('error', err, this);
		}
	};
}