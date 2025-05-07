
import React from "react";
import { Link } from "react-router-dom";
import { Order } from "@/types";
import OrderStatusBadge from "./OrderStatusBadge";
import { formatDistanceToNow } from "date-fns";
import { ChevronRight } from "lucide-react";

interface OrderCardProps {
  order: Order;
}

const OrderCard = ({ order }: OrderCardProps) => {
  const date = new Date(order.createdAt);
  const timeAgo = formatDistanceToNow(date, { addSuffix: true });

  return (
    <Link
      to={`/orders/${order.id}`}
      className="block border rounded-lg p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-center mb-3">
        <div className="font-medium">Order #{order.id.slice(-5)}</div>
        <OrderStatusBadge status={order.status} />
      </div>
      
      <div className="text-sm text-gray-500 mb-3">
        {timeAgo} • {order.items.length} items
      </div>
      
      <div className="flex justify-between items-center">
        <div className="font-semibold text-canteen-secondary">
          ${order.totalAmount.toFixed(2)}
        </div>
        <div className="text-gray-400">
          <ChevronRight size={18} />
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;
