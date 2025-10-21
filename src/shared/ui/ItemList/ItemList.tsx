export type ItemList<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  isLoading?: boolean;
  error?: string | null;
  emptyMessage?: string;
};

