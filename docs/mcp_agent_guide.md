# MCP Agent Guide — Namviek Dynamic Field Server

> **Stack:** Model Context Protocol · Hono API (port 4001) · MCP server (port 4002 / stdio / remote HTTP)
> **Entry point for agents:** call `mcp_help` first, then use task-specific tools.

---

## 1. What Is This MCP Server?

The Namviek MCP server is a thin adapter over the REST API at `apps/api`. It exposes every database operation — creating tables, managing fields, writing records, querying data, and running analytics — as typed MCP tools that AI agents can call in natural language.

---

## 2. Start the Servers

```bash
# Terminal 1 — REST API (required by MCP)
pnpm --filter api dev

# Terminal 2 — MCP server (stdio or HTTP)
pnpm --filter mcp dev
```

Environment variables (`.env` in `apps/mcp/`):

```env
API_URL=http://localhost:4001
API_KEY=namviek-mcp-dev-key
MCP_TRANSPORT=stdio   # or "http"
PORT=4002             # only used when MCP_TRANSPORT=http
```

---

## 3. Connect via Remote HTTP (Any MCP Client)

Run the MCP server with `MCP_TRANSPORT=http` and expose port 4002. Set `ORIGINS` to control CORS access.

```env
MCP_TRANSPORT=http
PORT=4002
ORIGINS=*
API_KEY=your-production-key
```

### Claude Desktop

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "namviek": {
      "type": "http",
      "url": "http://YOUR_SERVER:4002/mcp",
      "headers": { "x-api-key": "your-production-key" }
    }
  }
}
```

### Cursor

Add to `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "namviek": {
      "type": "http",
      "url": "http://YOUR_SERVER:4002/mcp",
      "headers": { "x-api-key": "your-production-key" }
    }
  }
}
```

### Gemini CLI

```bash
gemini --mcp-endpoint http://YOUR_SERVER:4002/mcp --mcp-header "x-api-key: your-production-key"
```

### Codex CLI

```json
{
  "mcpServers": {
    "namviek": {
      "type": "http",
      "url": "http://YOUR_SERVER:4002/mcp",
      "headers": { "x-api-key": "your-production-key" }
    }
  }
}
```

Replace `YOUR_SERVER` with your server hostname/IP and `your-production-key` with the actual API key.

---

## 4. Connect via Local CLI (Claude Desktop)

Add this to `claude_desktop_config.json` (stdio mode):

```json
{
  "mcpServers": {
    "namviek": {
      "command": "node",
      "args": ["/absolute/path/to/namviek-v2/apps/mcp/dist/index.js"],
      "env": {
        "API_URL": "http://localhost:4001",
        "API_KEY": "namviek-mcp-dev-key"
      }
    }
  }
}
```

Build first if `dist/` is missing:

```bash
pnpm --filter mcp build
```

---

## 5. Tool Reference

### 5.1 Discovery

| Tool | Input | Description |
|---|---|---|
| `mcp_help` | `category?`, `toolName?` | List all tools grouped by category. Use this first. |

**Example prompt:** "Call mcp_help with category='database'."

---

### 5.2 Database Tools

| Tool | Required Input | Description |
|---|---|---|
| `list_databases` | — | List all databases with field/record counts |
| `get_database` | `id` | Get one database by ID |
| `create_database` | `name`, `description?` | Create a blank database |
| `delete_database` | `id` | Delete a database and all its data |
| `list_templates` | — | List all predefined bootstrap templates |
| `create_database_from_template` | `templateId`, `name?` | Create a database from a template |
| `create_database_from_template_by_id` | `templateId`, `name?` | Explicit alias of above |

**Typical flow:**

```
list_templates
  → pick a templateId
create_database_from_template_by_id { templateId: "...", name: "My CRM" }
  → returns { id, name, ... }   ← save this as <DATABASE_ID>
```

---

### 5.3 Field Tools

| Tool | Required Input | Description |
|---|---|---|
| `list_fields` | `databaseId` | List all fields (columns) ordered by position |
| `create_field` | `databaseId`, `name`, `type` | Add a field. `type` is one of: `text \| number \| select \| multi_select \| date \| person \| checkbox \| file \| url \| email \| id \| created_time \| created_by \| updated_time \| updated_by` |
| `bulk_create_fields` | `databaseId`, `fields[]` | Add multiple fields in one call. Each entry accepts the same shape as `create_field` except `databaseId`. |
| `update_field` | `fieldId`, `name?`, `config?` | Rename or update config |
| `bulk_update_fields` | `updates[]` | Update multiple fields in one call. Each entry accepts the same shape as `update_field`. |
| `delete_field` | `fieldId`, `databaseId` | Delete field and all its values |
| `reorder_field` | `fieldId`, `direction` (`left`/`right`), `databaseId?` | Move column left or right |
| `duplicate_field` | `fieldId` | Clone a field next to the original |

---

### 5.4 Record Tools

| Tool | Required Input | Description |
|---|---|---|
| `list_records` | `databaseId` | List all rows with field values |
| `create_record` | `databaseId` | Add a new empty row |
| `create_records_with_data` | `databaseId`, `records[]` | Create one or more rows and populate their initial values in the same call |
| `delete_records` | `ids[]`, `databaseId?` | Delete one or more rows by ID |
| `set_field_value` | `recordId`, `fieldId`, `databaseId`, + one value key | Set a single cell |
| `bulk_set_values` | `updates[]` (array of above) | Set many cells in one call |
| `preview_table` | `databaseId`, `limit?` (default 20) | Render rows as a markdown table |

**Value keys for `set_field_value` / `bulk_set_values`:**

| Key | Used for field type |
|---|---|
| `textValue` | text, url, email |
| `numberValue` | number |
| `selectValue` | select (option ID) |
| `multiSelectValue` | multi_select (array of option IDs) |
| `dateValue` | date (ISO string, e.g. `2026-04-30`) |
| `boolValue` | checkbox |
| `personValue` | person (array of user IDs) |

---

### 5.5 Query Tools

| Tool | Required Input | Description |
|---|---|---|
| `query_records` | `databaseId`, `filters?[]`, `textSearch?`, `dateRange?`, `sort?`, `limit?` | Structured filter + sort. Returns `humanReadableRecords` with labels resolved. |
| `search_records` | `databaseId`, `query`, `limit?` | Full-text search across all field values |

**Filter operators for `query_records`:**

`eq` · `neq` · `contains` · `starts_with` · `gt` · `gte` · `lt` · `lte` · `in` · `is_empty` · `not_empty`

**Example prompt:**
"Call query_records on database `<ID>` where field 'Status' equals 'Active', sorted by 'Created' descending, limit 50."

---

### 5.6 Stats Tools

| Tool | Required Input | Description |
|---|---|---|
| `get_database_stats` | `databaseId` | Total records + daily counts (last 30 days) |
| `get_stats` | `databaseId`, `field` (ID or name) | count / sum / avg / min / max on a number field |
| `get_distribution` | `databaseId`, `field` | Value counts for select / multi_select fields |
| `get_timeline` | `databaseId`, `dateSource?`, `bucket?` | Record counts bucketed by day / week / month |
| `get_person_activity` | `databaseId`, `field` | Records assigned per person |

---

### 5.7 User Tools

| Tool | Required Input | Description |
|---|---|---|
| `list_users` | — | List all users (id, name, email) |
| `search_users` | `query` | Search users by name or email |

---

## 6. Common Workflows

### Bootstrap a new database from a template

```
1. list_templates
2. create_database_from_template_by_id { templateId, name }
3. list_fields { databaseId }          ← confirm schema
4. list_users                          ← collect user IDs for person fields
5. create_records_with_data { databaseId, records: [...] } ← add and populate initial rows
7. preview_table { databaseId }        ← visual check
```

### Query and analyse existing data

```
1. list_databases                      ← find your database ID
2. list_fields { databaseId }          ← find field IDs / names
3. query_records { databaseId, filters, sort }
4. get_stats { databaseId, field }     ← numeric summary
5. get_distribution { databaseId, field } ← category breakdown
6. get_timeline { databaseId }         ← activity over time
```

### Find and update a specific record

```
1. search_records { databaseId, query: "keyword" }
2. set_field_value { recordId, fieldId, databaseId, textValue: "new value" }
3. preview_table { databaseId, limit: 5 }
```

---

## 7. Tips for Agents

- **Always call `mcp_help` on first interaction** to enumerate available tools.
- **Prefer `humanReadableRecords`** from `query_records` / `search_records` — select and person values are already resolved to labels/names.
- **Use `preview_table`** for quick visual validation before reporting data to the user.
- **Chain `list_templates` → `create_database_from_template_by_id`** when the user asks to set up a new workspace (CRM, project tracker, etc.).
- **Never guess IDs** — always resolve them via `list_databases`, `list_fields`, or `list_users` first.
- **Prefer bulk tools** for throughput: `bulk_create_fields`, `bulk_update_fields`, `bulk_set_values`, and `create_records_with_data` reduce round-trips significantly.

---

## 8. Error Handling

All tools return a `content` array with a JSON text body. On failure the API returns:

```json
{ "error": "Human-readable message" }
```

Check for `error` keys before proceeding in multi-step workflows.
