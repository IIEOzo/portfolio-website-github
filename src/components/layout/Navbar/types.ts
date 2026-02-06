export interface NavItem {
  id: string;
  label: string;
  target: string;
  icon?: React.ReactNode;
}

export interface NavbarProps {
  logo?: {
    text: string;
    onClick?: () => void;
  };
  items?: NavItem[];
  className?: string;
  showBackgroundOnScroll?: boolean;
}
