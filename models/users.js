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

	static async encrypt(password) {
		const saltRounds = 10
		const hashedPassword = await bcrypt.hash(password, saltRounds)
		return hashedPassword
	}
}

module.exports = Users