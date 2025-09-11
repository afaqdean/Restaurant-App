// Item Report Types for Admin Reports
export interface ItemReportData {
  itemId: string;
  itemName: string;
  categoryName: string;
  totalOrders: number;
  deliveredOrders: number;
  remainingOrders: number;
  revenue: number; // in cents
}

export interface ItemReportResponse {
  items: ItemReportData[];
  totalCount: number;
  hasMore: boolean;
}

export interface ItemReportFilters {
  category?: string;
  search?: string;
}
