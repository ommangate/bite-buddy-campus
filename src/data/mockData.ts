
import { MenuItem, Category, Order, PaymentMethod } from "@/types";

export const categories: Category[] = [
  { id: "cat1", name: "Breakfast", slug: "breakfast" },
  { id: "cat2", name: "Lunch", slug: "lunch" },
  { id: "cat3", name: "Snacks", slug: "snacks" },
  { id: "cat4", name: "Beverages", slug: "beverages" },
  { id: "cat5", name: "Desserts", slug: "desserts" },
];

export const menuItems: MenuItem[] = [
  {
    id: "item1",
    name: "Egg Sandwich",
    description: "Fresh eggs with cheese and vegetables on whole wheat bread",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "cat1",
    available: true,
    popular: true,
  },
  {
    id: "item2",
    name: "Vegetable Pasta",
    description: "Penne pasta with fresh vegetables in tomato sauce",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "cat2",
    available: true,
    popular: false,
  },
  {
    id: "item3",
    name: "Chicken Wrap",
    description: "Grilled chicken with fresh vegetables in a whole wheat wrap",
    price: 7.49,
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "cat2",
    available: true,
    popular: true,
  },
  {
    id: "item4",
    name: "French Fries",
    description: "Crispy golden french fries with ketchup",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "cat3",
    available: true,
    popular: true,
  },
  {
    id: "item5",
    name: "Iced Coffee",
    description: "Cold brewed coffee served with ice",
    price: 4.49,
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "cat4",
    available: true,
    popular: false,
  },
  {
    id: "item6",
    name: "Chocolate Brownie",
    description: "Rich chocolate brownie with nuts",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "cat5",
    available: true,
    popular: true,
  },
  {
    id: "item7",
    name: "Green Salad",
    description: "Fresh green salad with various vegetables and vinaigrette",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "cat2",
    available: true,
    popular: false,
  },
  {
    id: "item8",
    name: "Fruit Smoothie",
    description: "Blend of fresh fruits with yogurt",
    price: 5.49,
    image: "https://images.unsplash.com/photo-1553530666-ba11a90bb0b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "cat4",
    available: true,
    popular: true,
  },
];

export const orders: Order[] = [
  {
    id: "order1",
    userId: "user-1",
    items: [
      { id: "item1", name: "Egg Sandwich", price: 5.99, quantity: 2 },
      { id: "item5", name: "Iced Coffee", price: 4.49, quantity: 1 },
    ],
    totalAmount: 16.47,
    status: "completed",
    createdAt: "2023-05-10T10:30:00Z",
    qrCode: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOSSURBVO3BQY4cSRIEQdNA/f/Lup4G9xQCmaruHRG2+YP1KIv1OIv1OIv1OIv1OIv1OIv1OIv1uIuHl6r4k5pMVdxUTKrIVJGpmKqYKjJVTCq+qeKbKn5SxZuXsViPs1iPs1iPu/gyVfGmikyVVDGpyFSRqZgqTlVkqjJVZCpuKt5U8U1VfNNiPc5iPc5iPe7iw1R8k1SRqZKKTEWmIlORqTipyFRJFZmKqUqqmCpuKr5JxW9arMdZrMdZrMdd/LKKTJVUkalSxZuKqeJNRaYiU5GpOFVkqshUZCpOFb9psR5nsR5nsR538WWq+BepIlORqZgqMhVTxaQiU5GpOKmYKjIVmYpTxb/JYj3OYj3OYj3u4sNU/KaKk4pJRabipCJTcVPxpiJTJVVMKv6fLdbjLNbjLNbjLh5eqiJTJVVMKt5UTBWZikzFpOJUMamYVGQqpopMRaYiUzFVZCpuKjIVX6ZissV6nMV6nMV6mD9Yj7JYj7NYj7NYj7NYj7NYj7NYj/ALl5Q+Z1hSAQAAAABJRU5ErkJggg=="
  },
  {
    id: "order2",
    userId: "user-1",
    items: [
      { id: "item3", name: "Chicken Wrap", price: 7.49, quantity: 1 },
      { id: "item4", name: "French Fries", price: 3.99, quantity: 1 },
      { id: "item8", name: "Fruit Smoothie", price: 5.49, quantity: 1 },
    ],
    totalAmount: 16.97,
    status: "ready",
    createdAt: "2023-05-15T12:45:00Z",
    qrCode: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOSSURBVO3BQY4cSRIEQdNA/f/Lup4G9xQCmaruHRG2+YP1KIv1OIv1OIv1OIv1OIv1OIv1OIv1uIuHl6r4k5pMVdxUTKrIVJGpmKqYKjJVTCq+qeKbKn5SxZuXsViPs1iPs1iPu/gyVfGmikyVVDGpyFSRqZgqTlVkqjJVZCpuKt5U8U1VfNNiPc5iPc5iPe7iw1R8k1SRqZKKTEWmIlORqTipyFRJFZmKqUqqmCpuKr5JxW9arMdZrMdZrMdd/LKKTJVUkalSxZuKqeJNRaYiU5GpOFVkqshUZCpOFb9psR5nsR5nsR538WWq+BepIlORqZgqMhVTxaQiU5GpOKmYKjIVmYpTxb/JYj3OYj3OYj3u4sNU/KaKk4pJRabipCJTcVPxpiJTJVVMKv6fLdbjLNbjLNbjLh5eqiJTJVVMKt5UTBWZikzFpOJUMamYVGQqpopMRaYiUzFVZCpuKjIVX6ZissV6nMV6nMV6mD9Yj7JYj7NYj7NYj7NYj7NYj7NYj/ALl5Q+Z1hSAQAAAABJRU5ErkJggg=="
  },
  {
    id: "order3",
    userId: "admin-1",
    items: [
      { id: "item2", name: "Vegetable Pasta", price: 8.99, quantity: 2 },
      { id: "item6", name: "Chocolate Brownie", price: 3.99, quantity: 2 },
    ],
    totalAmount: 25.96,
    status: "pending",
    createdAt: "2023-05-18T18:20:00Z"
  },
  {
    id: "order4",
    userId: "user-1",
    items: [
      { id: "item7", name: "Green Salad", price: 6.99, quantity: 1 },
      { id: "item8", name: "Fruit Smoothie", price: 5.49, quantity: 1 },
    ],
    totalAmount: 12.48,
    status: "preparing",
    createdAt: "2023-05-20T11:15:00Z"
  }
];

export const paymentMethods: PaymentMethod[] = [
  {
    id: "pm1",
    name: "Credit Card",
    icon: "credit-card"
  },
  {
    id: "pm2",
    name: "Mobile Wallet",
    icon: "smartphone"
  },
  {
    id: "pm3",
    name: "Cash on Delivery",
    icon: "dollar-sign"
  }
];

export const getFavorites = () => {
  const storedFavorites = localStorage.getItem("favorites");
  if (storedFavorites) {
    return JSON.parse(storedFavorites);
  }
  return [];
};

export const toggleFavorite = (itemId: string) => {
  let favorites = getFavorites();
  const index = favorites.indexOf(itemId);
  
  if (index >= 0) {
    favorites.splice(index, 1);
  } else {
    favorites.push(itemId);
  }
  
  localStorage.setItem("favorites", JSON.stringify(favorites));
  return favorites;
};

export const isFavorite = (itemId: string) => {
  const favorites = getFavorites();
  return favorites.includes(itemId);
};

export const getMenuItemsByCategory = (categoryId: string) => {
  return menuItems.filter(item => item.category === categoryId && item.available);
};

export const getPopularItems = () => {
  return menuItems.filter(item => item.popular && item.available);
};

export const searchMenuItems = (query: string) => {
  const lowerCaseQuery = query.toLowerCase();
  return menuItems.filter(
    item => item.available && (
      item.name.toLowerCase().includes(lowerCaseQuery) ||
      item.description.toLowerCase().includes(lowerCaseQuery)
    )
  );
};

export const getOrdersByUserId = (userId: string) => {
  return orders.filter(order => order.userId === userId);
};

export const getPendingOrders = () => {
  return orders.filter(order => order.status === "pending" || order.status === "preparing");
};

export const getOrderById = (orderId: string) => {
  return orders.find(order => order.id === orderId);
};

export const updateOrderStatus = (orderId: string, status: Order["status"]) => {
  const orderIndex = orders.findIndex(order => order.id === orderId);
  if (orderIndex >= 0) {
    orders[orderIndex].status = status;
  }
};
