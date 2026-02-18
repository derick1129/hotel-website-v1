export interface NavItem {
  label: string;
  href?: string;
  to?: string;
  children?: NavItem[];
}
  
  export interface FeatureItem {
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
  }