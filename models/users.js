'use strict'

const bcrypt = require('bcryptjs')

class Users {
	constructor(db) {
		this.db = db
		this.ref = this.db.ref('/') // raiz de la db
		this.collection = this.ref.child('users') // creando hijo en la raiz
	}

	async create(data) {
		data.password = await this.constructor.encrypt(data.password)
		const newUser = this.collection.push() // el metodo push crea una nueva referencia dentro de la colección
		newUser.set(data)

		return newUser.key
	}

	async validateUser(data) {
		/*
		* orderByChild permite ordenar por el hijo de la colección
		* once('value') garantiza que devolvera algun valor, ya sea valido o invalido
		*/
		const userQuery = await this.collection.orderByChild('email').equalTo(data.email).once('value')
		console.error(userQuery)
		const userFound = userQuery.val() // .val() transforma el valor total en un objeto
		console.error(userFound)
		if (userFound) {
			const userId = Object.keys(userFound)[0]
			const passwordRight = await bcrypt.compare(data.password, userFound[userId].password)
			const result = (passwordRight) ? userFound[userId] : false
			return result
		}
		return false
	}

	static async encrypt(password) {
		const saltRounds = 10
		const hashedPassword = await bcrypt.hash(password, saltRounds)
		return hashedPassword
	}
}

module.exports = Users