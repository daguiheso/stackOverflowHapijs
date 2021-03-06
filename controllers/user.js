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

async function validateUser (req, h) {
	let result

	try {
		result = await users.validateUser(req.payload)
	} catch (error) {
		console.error(error)
		return h.response('Problemas validando usuario').code(500)
	}
	return result
}

module.exports = {
	createUser: createUser,
	validateUser: validateUser
}