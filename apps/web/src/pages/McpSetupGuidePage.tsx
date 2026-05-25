import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  Check, Copy, Cable, Terminal, Code2,
  Bot, AppWindow, Sparkles, KeyRound
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { DatabasesSidebar } from './DynamicField/components/DatabasesSidebar';
import { logout } from '@/lib/auth-store';
import { api } from './DynamicField/api';
import type { DynDatabase } from './DynamicField/types';

function getMcpUrl() {
  return window.location.origin.replace(/:\d+$/, ':4002') + '/mcp';
}

const CLIENTS = [
  {
    id: 'claude-code',
    name: 'Claude Code',
    icon: Terminal,
    file: '~/.claude/settings.json',
  },
  {
    id: 'cursor',
    name: 'Cursor',
    icon: Code2,
    file: '.cursor/mcp.json',
  },
  {
    id: 'vscode',
    name: 'VS Code Copilot',
    icon: AppWindow,
    file: 'VS Code Settings → MCP',
    steps: [
      'Open VS Code Settings (Cmd/Ctrl + ,)',
      'Search for "mcp" in settings',
      'Add the server URL and API key',
      'Reload VS Code',
    ],
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    icon: Bot,
    file: '.windsurf/mcp.json',
  },
  {
    id: 'codex',
    name: 'Codex CLI',
    icon: Terminal,
    file: '~/.codex/config.json',
  },
  {
    id: 'gemini',
    name: 'Gemini CLI',
    icon: Sparkles,
    file: 'gemini settings',
  },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API unavailable in insecure context
    }
  };

  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={handleCopy}
      className="h-7 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? 'Copied' : 'Copy'}
    </Button>
  );
}

function ClientCard({ client }: { client: typeof CLIENTS[number] }) {
  const Icon = client.icon;
  const mcpUrl = getMcpUrl();

  const config = client.id === 'gemini'
    ? null
    : client.id === 'vscode'
      ? { 'mcp.servers': { namviek: { type: 'http', url: mcpUrl, headers: { 'x-api-key': 'your-api-key' } } } }
      : { mcpServers: { namviek: { type: 'http', url: mcpUrl, headers: { 'x-api-key': 'your-api-key' } } } };

  const configText = client.id === 'gemini'
    ? `gemini --mcp-endpoint ${mcpUrl} --mcp-header "x-api-key: your-api-key"`
    : JSON.stringify(config, null, 2);

  return (
    <div className="rounded-lg border bg-card p-4 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Icon size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold">{client.name}</h3>
          <p className="text-xs text-muted-foreground truncate">{client.file}</p>
        </div>
      </div>

      {client.steps && (
        <ol className="text-xs text-muted-foreground space-y-1 pl-4 list-decimal">
          {client.steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      )}

      <div className="relative">
        <pre className="rounded-md bg-muted/50 border p-3 text-xs overflow-x-auto font-mono leading-relaxed">
          <code>{configText}</code>
        </pre>
        <div className="absolute top-2 right-2">
          <CopyButton text={configText} />
        </div>
      </div>
    </div>
  );
}

export default function McpSetupGuidePage() {
  const navigate = useNavigate();
  const mcpUrl = getMcpUrl();
  const [databases, setDatabases] = useState<DynDatabase[]>([]);

  useEffect(() => {
    api.databases.list().then(setDatabases).catch(console.error);
  }, []);

  return (
    <SidebarProvider>
      <DatabasesSidebar
        databases={databases}
        onSelectDatabase={(db) => { void db; navigate(`/test/${db.id}`); }}
        onOpenCreateDatabase={() => navigate('/test')}
        onLogout={() => { logout(); navigate('/login'); }}
      />
      <SidebarInset className="h-svh overflow-auto">
        <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
          <Cable size={16} className="text-primary" />
          <span className="font-semibold text-sm">MCP Setup Guide</span>
        </header>

      <main className="mx-auto max-w-5xl px-6 py-8 space-y-8">
        {/* Hero */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Connect Your AI Tools</h1>
          <p className="text-muted-foreground">
            Get started with Namviek MCP Server in your favorite coding tools. Copy the config below and paste it into your client settings.
          </p>
        </div>

        {/* Quick Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { step: '1', title: 'Copy Server URL', desc: 'Copy the MCP endpoint URL below' },
            { step: '2', title: 'Pick Your Client', desc: 'Choose your AI coding tool below' },
            { step: '3', title: 'Paste & Connect', desc: 'Paste the config into your client' },
          ].map(({ step, title, desc }) => (
            <div key={step} className="flex items-start gap-3 rounded-lg border bg-card p-4">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                {step}
              </div>
              <div>
                <h3 className="text-sm font-semibold">{title}</h3>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Connection Info */}
        <div className="rounded-lg border bg-card p-4 space-y-3">
          <h2 className="text-sm font-semibold">Connection Info</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">MCP Server URL</label>
              <div className="flex items-center gap-2 rounded-md bg-muted/50 border px-3 py-2">
                <code className="text-xs font-mono flex-1 truncate">{mcpUrl}</code>
                <CopyButton text={mcpUrl} />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">API Key</label>
              <div className="flex items-center gap-2 rounded-md bg-muted/50 border px-3 py-2">
                <code className="text-xs font-mono flex-1 truncate">your-api-key</code>
                <CopyButton text="your-api-key" />
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <KeyRound size={12} />
                Get from your server <code className="bg-muted px-1 py-0.5 rounded">.env</code> file (<code className="bg-muted px-1 py-0.5 rounded">API_KEY</code>) or ask your admin
              </p>
            </div>
          </div>
        </div>

        {/* Client Cards */}
        <div>
          <h2 className="text-sm font-semibold mb-4">Client Configurations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CLIENTS.map((client) => (
              <ClientCard key={client.id} client={client} />
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="rounded-lg border border-dashed bg-muted/30 p-4 text-xs text-muted-foreground space-y-1">
          <p className="font-medium text-foreground">Note</p>
          <p>
            Replace <code className="bg-muted px-1 py-0.5 rounded">your-api-key</code> with your actual API key.
            The MCP server must be running with <code className="bg-muted px-1 py-0.5 rounded">MCP_TRANSPORT=http</code> and accessible at the URL above.
          </p>
        </div>
      </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
