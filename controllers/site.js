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

function login (req, h) {
	return h.view('login', {
		title: 'Ingrese'
	})
}

module.exports = {
	register,
	home,
	login
}