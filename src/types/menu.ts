export interface MenuItem {
  id: string;
  title: string;
  icon?: string;
  path?: string;
  children?: MenuItem[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}