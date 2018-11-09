'use strict'

function home (req, h)  {
	return h.view('index', {
		title: 'hola'
	})
}

function register (req, h) {
	return h.view('register', {
		title: 'register'
	})
}

module.exports = {
	register,
	home
}