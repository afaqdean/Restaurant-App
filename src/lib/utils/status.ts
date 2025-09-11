export const getStatusColor = (status: string) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "ACCEPTED":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "IN_KITCHEN":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "READY":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "COMPLETED":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "CANCELLED":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export const getPaymentStatusColor = (status: string) => {
  switch (status) {
    case "PAID":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "UNPAID":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "REFUNDED":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export const getStatusIconName = (status: string) => {
  switch (status) {
    case "PENDING":
      return "Clock";
    case "ACCEPTED":
      return "CheckCircle";
    case "IN_KITCHEN":
      return "Package";
    case "READY":
      return "Truck";
    case "COMPLETED":
      return "CheckCircle";
    case "CANCELLED":
      return "Clock";
    default:
      return "Clock";
  }
};

export const formatStatusText = (status: string) => {
  return status.replace("_", " ");
};
