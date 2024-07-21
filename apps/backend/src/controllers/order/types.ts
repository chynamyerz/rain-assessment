export interface CreateOrderProps {
  items: string[];
}

export interface UpdateOrderProps {
  date?: string;
  items?: string;
  status?: string;
}
