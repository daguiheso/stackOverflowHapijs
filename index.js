'use strict'

const Hapi = require('hapi')
const handlebars = require('handlebars')
const path = require('path')
const routes = require('./routes')
const inert = require('inert')
const vision = require('vision')

const server = Hapi.server({
	port: process.env.PORT || 4000,
	host: 'localhost',
	routes: {
		files: {
			relativeTo: path.join(__dirname, 'public') // ruta relativa para todas las rutas de la app - __dirname significa el dir actual
		}
	}
})

async function init() {
	try {
		await server.register(inert)
		await server.register(vision)

		server.views({
			engines: {
				hbs: handlebars
			},
			relativeTo: __dirname,
			path: 'views',
			layout: true, // partials
			layoutPath: 'views'
		})

		server.route(routes)

		await server.start()
	} catch (error) {
		console.error(error) /* controlando error */
		process.exit(1) /* terminando proceso */
	}

	console.log(`Servidor lanzado en: ${server.info.uri}`)
}

init()