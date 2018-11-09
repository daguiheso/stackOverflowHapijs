'use strict'

const Hapi = require('hapi')
const handlebars = require('handlebars')
const path = require('path')
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

		await server.start()
	} catch (error) {
		console.error(error) /* controlando error */
		process.exit(1) /* terminando proceso */
	}

	server.route({
		method: 'GET',
		path: '/',
		handler: (req, h) => {
			// return h.response('Hola mundo...').code(200)
			return h.view('index', {
				title: 'hola'
			})
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