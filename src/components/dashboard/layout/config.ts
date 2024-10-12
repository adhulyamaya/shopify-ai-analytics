import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'chart-pie' },
  // { key: 'customers', title: 'Customers', href: paths.dashboard.customers, icon: 'users' },
  { key: 'Products', title: 'Products', href: paths.dashboard.products, icon: 'plugs-connected' },
  { key: 'chat', title: 'Chat', href: paths.dashboard.chat, icon: 'gear-six' },
] satisfies NavItemConfig[];
