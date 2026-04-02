const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8084/api';

// Admin API calls
export const adminAPI = {
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      throw new Error('Login failed');
    }
    
    return response.json();
  },
  
  initialize: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/initialize`, {
      method: 'POST',
    });
    return response.json();
  },
  
  health: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/health`);
    return response.text();
  }
};

// Dashboard API calls
export const dashboardAPI = {
  getOverview: async () => {
  const response = await fetch(`${API_BASE_URL}/dashboard/overview`, { headers: authHeader() });
    if (!response.ok) {
      throw new Error('Failed to fetch dashboard data');
    }
    return response.json();
  },
  
  getAllOrders: async () => {
    const response = await fetch(`${API_BASE_URL}/dashboard/orders`);
    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }
    return response.json();
  },
  
  getOrdersByStatus: async (status) => {
    const response = await fetch(`${API_BASE_URL}/dashboard/orders/status/${status}`);
    if (!response.ok) {
      throw new Error('Failed to fetch orders by status');
    }
    return response.json();
  },
  
  getOrderById: async (orderId) => {
    const response = await fetch(`${API_BASE_URL}/dashboard/orders/${orderId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch order details');
    }
    return response.json();
  },
  
  getLoyalCustomers: async (limit = 5) => {
    const response = await fetch(`${API_BASE_URL}/dashboard/loyal-customers?limit=${limit}`, { headers: authHeader() });
    if (!response.ok) {
      throw new Error('Failed to fetch loyal customers');
    }
    return response.json();
  }
};

// Admin-level watch management and sales
export const adminWatchAPI = {
  createWatch: async (watch) => {
    const response = await fetch(`${API_BASE_URL}/watches`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeader() },
      body: JSON.stringify(watch),
    });
    if (!response.ok) throw new Error('Failed to create watch');
    return response.json();
  },
  updateWatch: async (id, watch) => {
    const response = await fetch(`${API_BASE_URL}/watches/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeader() },
      body: JSON.stringify(watch),
    });
    if (!response.ok) throw new Error('Failed to update watch');
    return response.json();
  },
  deleteWatch: async (id) => {
    const response = await fetch(`${API_BASE_URL}/watches/${id}`, {
      method: 'DELETE',
      headers: authHeader(),
    });
    if (!response.ok) throw new Error('Failed to delete watch');
    return true;
  }
};

export const salesAPI = {
  getWeekly: async (weeks = 4) => {
    const response = await fetch(`${API_BASE_URL}/dashboard/sales/week?weeks=${weeks}`, { headers: authHeader() });
    if (!response.ok) throw new Error('Failed to fetch weekly sales');
    return response.json();
  },
  getMonthly: async (months = 6) => {
    const response = await fetch(`${API_BASE_URL}/dashboard/sales/month?months=${months}`, { headers: authHeader() });
    if (!response.ok) throw new Error('Failed to fetch monthly sales');
    return response.json();
  }
};

// Watch API calls
export const watchAPI = {
  // options: { page, size, sortBy, sortDir }
  getAllWatches: async (options = {}) => {
    const { page = 0, size = 12, sortBy = 'createdAt', sortDir = 'desc' } = options;
    const qs = `?page=${page}&size=${size}&sortBy=${encodeURIComponent(sortBy)}&sortDir=${encodeURIComponent(sortDir)}`;
    const response = await fetch(`${API_BASE_URL}/watches/paged${qs}`);
    if (!response.ok) {
      throw new Error('Failed to fetch watches');
    }
    return response.json();
  },

  getWatchById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/watches/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch watch');
    }
    return response.json();
  },

  getActiveWatches: async () => {
    const response = await fetch(`${API_BASE_URL}/watches/active`);
    if (!response.ok) {
      throw new Error('Failed to fetch active watches');
    }
    return response.json();
  },

  searchWatches: async (query) => {
    const response = await fetch(`${API_BASE_URL}/watches/search?query=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Failed to search watches');
    }
    return response.json();
  }
};

// Order API calls
export const orderAPI = {
  cancelOrder: async (orderId) => {
    const res = await fetch(`${API_BASE_URL}/orders/${orderId}/cancel`, {
      method: 'PUT',
      headers: authHeader(),
    });
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg);
    }
    return res.text();
  },
  createOrder: async (orderData) => {
    const response = await fetch(`${API_BASE_URL}/orders/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create order');
    }
    
    return response.json();
  },
  
  getOrderById: async (orderId) => {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch order');
    }
    return response.json();
  }
  ,
  getOrdersForUser: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/orders/user/${userId}`, { headers: authHeader() });
    if (!response.ok) {
      throw new Error('Failed to fetch user orders');
    }
    return response.json();
  }
};

// User API calls
export const userAPI = {
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }
    
    return response.json();
  },
  
  getUserById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    return response.json();
  },
  
  getUserByEmail: async (email) => {
    const response = await fetch(`${API_BASE_URL}/users/email/${encodeURIComponent(email)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    return response.json();
  }
  ,
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!response.ok) {
      const err = await response.text();
      throw new Error(err || 'Login failed');
    }
    return response.json();
  }
};

// Utility function to check backend connection
export const checkBackendConnection = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/health`);
    return response.ok;
  } catch (error) {
    return false;
  }
};

export default {
  adminAPI,
  dashboardAPI,
  watchAPI,
  adminWatchAPI,
  salesAPI,
  orderAPI,
  userAPI,
  checkBackendConnection
};

function authHeader() {
  const token = localStorage.getItem('adminToken');
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
}
