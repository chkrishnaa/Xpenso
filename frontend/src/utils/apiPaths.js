export const BASE_URL =
  import.meta.env.VITE_BACKEND_URL

export const API_PATHS = {
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    SIGNUP: "/api/v1/auth/register",
    GET_USER_DETAILS: "/api/v1/auth/get-user",
    SEND_VERIFY_OTP: "/api/v1/auth/send-verify-otp",
    VERIFY_EMAIL: "/api/v1/auth/verify-email",
    SEND_RESET_OTP: '/api/v1/auth/send-reset-otp',
    RESET_PASSWORD: '/api/v1/auth/reset-password',
    GOOGLE_AUTH_URL: "/api/v1/auth/google",
  },
  DASHBOARD: {
    GET_DATA: "/api/v1/dashboard",
  },

  INCOME: {
    ADD_INCOME: "/api/v1/income/add-income",
    GET_ALL_INCOMES: "/api/v1/income/incomes",
    DELETE_INCOME: (incomeId) => `/api/v1/income/${incomeId}`,
    DELETE_ALL_INCOMES: "/api/v1/income/",
    EXPORT_INCOME: "/api/v1/income/export-income-details",
  },

  EXPENSE: {
    ADD_EXPENSE: "/api/v1/expense/add-expense",
    GET_ALL_EXPENSES: "/api/v1/expense/expenses",
    DELETE_EXPENSE: (expenseId) => `/api/v1/expense/${expenseId}`,
    DELETE_ALL_EXPENSES: "/api/v1/expense/",
    EXPORT_EXPENSE: "/api/v1/expense/export-expense-details",
  },

  IMAGE: {
    UPLOAD_AVATAR: "/api/v1/auth/upload-avatar",
  },
};
