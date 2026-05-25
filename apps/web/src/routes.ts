import { createBrowserRouter, redirect } from 'react-router';
import { isAuthenticated } from '@/lib/auth-store';

// Pages
import LoginPage from './pages/LoginPage';
import DynamicFieldPage from './pages/DynamicFieldPage';
import McpSetupGuidePage from './pages/McpSetupGuidePage';
import SetupPage from './pages/SetupPage';
import NotFound from './pages/NotFound';

export const router = createBrowserRouter([
  // Public routes
  {
    path: '/login',
    Component: LoginPage,
    loader: () => {
      if (isAuthenticated()) return redirect('/test');
      return null;
    },
  },
  {
    path: '/setup',
    Component: SetupPage,
  },
  {
    path: '/test',
    Component: DynamicFieldPage,
  },
  {
    path: '/test/:databaseId',
    Component: DynamicFieldPage,
  },
  // Public: MCP setup guide (documentation, no sensitive data)
  {
    path: '/mcp-setup',
    Component: McpSetupGuidePage,
  },

  // Root redirect
  {
    path: '/',
    loader: () => {
      if (isAuthenticated()) return redirect('/test');
      return redirect('/login');
    },
    Component: () => null,
  },

  // 404
  {
    path: '*',
    Component: NotFound,
  },
]);
