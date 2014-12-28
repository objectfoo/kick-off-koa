'use strict';

var koa = require('koa')
	, parse = require('co-body')
	, session = require('koa-session')
	, app = koa()
	, form
;

form = '<form action="/login" method="POST">\
	<input name="username" type="text" value="username">\
	<input name="password" type="password" placeholder="the password is \'password\'">\
	<button type="submit">Submit</button>\
	</form>';


app.keys = ['secret1', 'secret2', 'secret3'];
app.use(session(app));
app.use(home);
app.use(login);
app.use(logout);
app.listen(process.argv[2]);


function* home(next) {
	if (this.request.path !== '/') return yield next;
	if (this.session.authenticated) return this.body = 'hello world';
	this.status = 401;
}


function* login(next) {
	if (this.request.path !== '/login') return yield next;
	if (this.request.method === 'GET') return this.body = form;
	if (this.request.method === 'POST') {
		var body = yield parse(this, { limit: '1kb' });

		if (body.username !== 'username' || body.password !== 'password') {
			return this.status = 400;
		}

		this.session.authenticated = true;
		this.redirect('/');
	}
}


function* logout(next) {
	if (this.request.path !== '/logout') return yield next;

	this.session.authenticated = null;
	this.redirect('/login');
}
