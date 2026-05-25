import 'dotenv/config'
import { randomUUID } from 'node:crypto'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js'
import { isInitializeRequest } from '@modelcontextprotocol/sdk/types.js'
import { createServer } from 'http'

import {
  registerDatabaseTools,
  registerFieldTools,
  registerMetaTools,
  registerQueryTools,
  registerRecordTools,
  registerStatsTools,
  registerUserTools,
} from './tools/index.js'

const PORT = Number(process.env.PORT) || 4002
const TRANSPORT = process.env.MCP_TRANSPORT || 'stdio'
const MCP_API_KEY = process.env.API_KEY || 'namviek-mcp-dev-key'
const ORIGINS = process.env.ORIGINS || '*'

const TOOL_NAMES = [
  'mcp_help',
  'list_databases', 'list_templates', 'get_database', 'create_database', 'delete_database', 'create_database_from_template', 'create_database_from_template_by_id',
  'list_fields', 'list_field_options', 'create_field_option', 'delete_field_option', 'get_field_config_contract', 'create_field', 'update_field', 'delete_field', 'reorder_field', 'duplicate_field', 'bulk_create_fields', 'bulk_update_fields',
  'list_records', 'create_record', 'delete_records', 'set_field_value', 'bulk_set_values', 'preview_table', 'create_records_with_data',
  'query_records', 'search_records',
  'get_database_stats', 'get_stats', 'get_distribution', 'get_timeline', 'get_person_activity',
  'list_users', 'search_users',
] as const

function log(message: string) {
  process.stderr.write(`${message}\n`)
}

function createMcpServer() {
  const server = new McpServer({
    name: 'namviek-dynamic-field',
    version: '1.0.0',
  })

  registerDatabaseTools(server)
  registerFieldTools(server)
  registerMetaTools(server)
  registerQueryTools(server)
  registerRecordTools(server)
  registerStatsTools(server)
  registerUserTools(server)

  return server
}

function headerValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

function setCorsHeaders(res: ServerResponse, req: IncomingMessage) {
  const origin = headerValue(req.headers['origin']) || ''
  const isWildcard = ORIGINS === '*'
  const allowed = isWildcard
    ? origin || '*'
    : ORIGINS.split(',').map(o => o.trim()).find(o => o === origin)

  if (allowed) {
    res.setHeader('Access-Control-Allow-Origin', allowed)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key, mcp-session-id')
    if (!isWildcard) {
      res.setHeader('Access-Control-Allow-Credentials', 'true')
    }
  }
}

function validateApiKey(req: IncomingMessage): boolean {
  const fromHeader = headerValue(req.headers['x-api-key'])
  if (fromHeader) return fromHeader === MCP_API_KEY

  const fromQuery = new URL(req.url || '', 'http://localhost').searchParams.get('x-api-key')
  return fromQuery === MCP_API_KEY
}

async function readJsonBody(req: IncomingMessage) {
  const chunks: Buffer[] = []

  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }

  const raw = Buffer.concat(chunks).toString('utf8').trim()
  if (!raw) return undefined

  return JSON.parse(raw) as unknown
}

async function start() {
  if (TRANSPORT === 'http') {
    const transports = new Map<string, StreamableHTTPServerTransport>()

    const httpServer = createServer(async (req, res) => {
      setCorsHeaders(res, req)

      // Preflight
      if (req.method === 'OPTIONS') {
        res.writeHead(204)
        res.end()
        return
      }

      const pathname = new URL(req.url || '', 'http://localhost').pathname

      if (req.method === 'GET' && pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          name: 'namviek-dynamic-field MCP server',
          version: '1.0.0',
          endpoint: '/mcp',
          tools: TOOL_NAMES,
        }))
        return
      }

      if (pathname !== '/mcp') {
        res.writeHead(404)
        res.end('Not found')
        return
      }

      // Authenticate /mcp requests
      if (!validateApiKey(req)) {
        res.writeHead(401, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: 'Unauthorized: invalid or missing x-api-key' }))
        return
      }

      try {
        const sessionId = headerValue(req.headers['mcp-session-id'])

        if (req.method === 'POST') {
          const body = await readJsonBody(req)

          if (sessionId) {
            const transport = transports.get(sessionId)
            if (!transport) {
              res.writeHead(404)
              res.end('Invalid session ID')
              return
            }

            await transport.handleRequest(req, res, body)
            return
          }

          if (!isInitializeRequest(body)) {
            res.writeHead(400)
            res.end('Bad Request: No valid session ID provided')
            return
          }

          const server = createMcpServer()
          const transport = new StreamableHTTPServerTransport({
            sessionIdGenerator: () => randomUUID(),
            onsessioninitialized: (initializedSessionId) => {
              transports.set(initializedSessionId, transport)
            },
          })

          transport.onclose = () => {
            if (transport.sessionId) {
              transports.delete(transport.sessionId)
            }
          }

          await server.connect(transport)
          await transport.handleRequest(req, res, body)
          return
        }

        if (req.method === 'GET' || req.method === 'DELETE') {
          if (!sessionId) {
            res.writeHead(400)
            res.end('Invalid or missing session ID')
            return
          }

          const transport = transports.get(sessionId)
          if (!transport) {
            res.writeHead(404)
            res.end('Invalid session ID')
            return
          }

          await transport.handleRequest(req, res)
          return
        }

        res.writeHead(405)
        res.end('Method not allowed')
      } catch (error) {
        log(error instanceof Error ? error.stack || error.message : String(error))

        if (!res.headersSent) {
          res.writeHead(500)
          res.end('Internal server error')
        }
      }
    })

    httpServer.listen(PORT, () => {
      log(`Namviek MCP server running on http://localhost:${PORT}/mcp`)
      log(`Health check: http://localhost:${PORT}/`)
      log(`API proxy target: ${process.env.API_URL || 'http://localhost:4001'}`)
    })
    return
  }

  const server = createMcpServer()
  const transport = new StdioServerTransport()
  await server.connect(transport)
  log(`Namviek MCP server connected via stdio`)
}

start().catch((error) => {
  log(error instanceof Error ? error.stack || error.message : String(error))
  process.exit(1)
})
