import { Plus, Database, LogOut, Cable } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { useNavigate } from 'react-router';
import type { DynDatabase } from '../types';
import { DatabaseIcon } from './DatabaseIcon';
import { TemplateDialog } from './TemplateDialog';

type DatabasesSidebarProps = {
  databases: DynDatabase[];
  selectedDatabaseId?: string;
  onSelectDatabase: (database: DynDatabase) => void;
  onOpenCreateDatabase: () => void;
  onLogout: () => void;
};

export function DatabasesSidebar({
  databases,
  selectedDatabaseId,
  onSelectDatabase,
  onOpenCreateDatabase,
  onLogout,
}: DatabasesSidebarProps) {
  const { open } = useSidebar();
  const navigate = useNavigate();

  return (
    <Sidebar collapsible="icon" onClick={(e) => e.stopPropagation()}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            {!open ? (
              <SidebarTrigger className="w-full h-8" />
            ) : (
              <SidebarMenuButton size="lg" asChild>
                <div className="flex items-center gap-2 cursor-default select-none">
                  <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground shrink-0">
                    <Database size={14} />
                  </div>
                  <div className="flex flex-col leading-tight flex-1 min-w-0">
                    <span className="text-sm font-semibold">Databases</span>
                    <span className="text-xs text-muted-foreground">{databases.length} total</span>
                  </div>
                  <SidebarTrigger />
                </div>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Your Databases</SidebarGroupLabel>
          <SidebarMenu>
            {databases.map((db) => (
              <SidebarMenuItem key={db.id}>
                <SidebarMenuButton
                  isActive={selectedDatabaseId === db.id}
                  onClick={() => onSelectDatabase(db)}
                  tooltip={db.name}
                >
                  <DatabaseIcon icon={db.icon} />
                  <div className="flex flex-col leading-tight min-w-0">
                    <span className="truncate font-medium">{db.name}</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex flex-col gap-1">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={onOpenCreateDatabase} tooltip="New database">
                <Plus />
                <span>New database</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <TemplateDialog />
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => navigate('/mcp-setup')} tooltip="MCP Setup">
                <Cable size={16} />
                <span>MCP Setup</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={onLogout} tooltip="Logout" className="text-destructive hover:bg-destructive/10">
                <LogOut size={16} />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
