'use strict'

const users = require('../models/index').users

async function createUser (req, h) {
	let result

	try {
		result = await users.create(req.payload)
	} catch (error) {
		console.error(error)
		return h.response('Problemas creando usuario').code(500)
	}
	return h.response('Usuario creado ID: ' + result).code(200)
}

module.exports = {
	createUser
}