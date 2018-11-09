'use strict'

const Hapi = require('hapi')
const inert = require('inert')
const path = require('path')

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
		await server.start()
	} catch (error) {
		console.error(error) /* controlando error */
		process.exit(1) /* terminando proceso */
	}

	server.route({
		method: 'GET',
		path: '/home',
		handler: (req, h) => {
			// return h.response('Hola mundo...').code(200)
			return h.file('index.html')
		}
	})

	server.route({
		method: 'GET',
		path: '/{param*}',
		handler: {
			directory: {
				path: '.',
				index: ['index.html']
			}
		}
	})

	console.log(`Servidor lanzado en: ${server.info.uri}`)
}

init()