import { decodeJwt, ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";

import { serve } from '@hono/node-server'
import { cors } from "hono/cors";
import { Hono } from 'hono'
import { sharedLibs } from "@shared/libs";

const app = new Hono()
app.use('*', cors())

app.get('/api/user', async (c) => {
	const headers = c.req.headers
	const token = headers.get('authorization').replace('Bearer ', '')

	console.log('client', decodeJwt(token))





	
	// console.log(token)

	return c.json({greeting: "Hello world"})
})

app.get('/', (c) => c.text(`Hello hono 2 ${sharedLibs()}`))

serve({ 
	fetch: app.fetch, 
	port: 3410 
	}, (listener) => {
	console.log(`Listening on http://localhost:${listener.port}`)
})

