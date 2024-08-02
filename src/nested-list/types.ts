export interface NestedListItem {
  id: number;
  title: string;
  children?: NestedListItem[];
}
