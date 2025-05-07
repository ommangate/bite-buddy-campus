
import { Order } from "@/types";

interface OrderStatusBadgeProps {
  status: Order["status"];
  className?: string;
}

export const OrderStatusBadge = ({ status, className = "" }: OrderStatusBadgeProps) => {
  let bgColor = "";
  let textColor = "text-white";
  let statusText = "";

  switch (status) {
    case "pending":
      bgColor = "bg-yellow-500";
      statusText = "Pending";
      break;
    case "preparing":
      bgColor = "bg-blue-500";
      statusText = "Preparing";
      break;
    case "ready":
      bgColor = "bg-green-500";
      statusText = "Ready";
      break;
    case "completed":
      bgColor = "bg-gray-500";
      statusText = "Completed";
      break;
    case "cancelled":
      bgColor = "bg-red-500";
      statusText = "Cancelled";
      break;
    default:
      bgColor = "bg-gray-400";
      statusText = "Unknown";
  }

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor} ${className}`}>
      {statusText}
    </span>
  );
};

export default OrderStatusBadge;
