
import React from "react";
import { PaymentMethod } from "@/types";
import { Check, CreditCard, Smartphone, DollarSign } from "lucide-react";

interface PaymentMethodCardProps {
  paymentMethod: PaymentMethod;
  selected: boolean;
  onSelect: () => void;
}

const PaymentMethodCard = ({
  paymentMethod,
  selected,
  onSelect,
}: PaymentMethodCardProps) => {
  const getIcon = () => {
    switch (paymentMethod.icon) {
      case "credit-card":
        return <CreditCard size={24} />;
      case "smartphone":
        return <Smartphone size={24} />;
      case "dollar-sign":
        return <DollarSign size={24} />;
      default:
        return <CreditCard size={24} />;
    }
  };

  return (
    <div
      className={`border rounded-lg p-4 cursor-pointer transition-all ${
        selected
          ? "border-canteen-primary bg-green-50"
          : "border-gray-200 hover:border-gray-300"
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="text-gray-600">{getIcon()}</div>
          <span className="font-medium">{paymentMethod.name}</span>
        </div>
        
        {selected && (
          <div className="h-5 w-5 rounded-full bg-canteen-primary text-white flex items-center justify-center">
            <Check size={14} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentMethodCard;
