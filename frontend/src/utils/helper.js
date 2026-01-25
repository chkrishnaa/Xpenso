import moment from "moment";

export const validateEmail = (email) => {
  if (!email.trim()) {
    return "Email is required";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters";
  if (!/(?=.*[a-z])/.test(password))
    return "Password must contain at least one lowercase letter";
  if (!/(?=.*[A-Z])/.test(password))
    return "Password must contain at least one uppercase letter";
  if (!/(?=.*\d)/.test(password))
    return "Password must contain at least one number";
  return "";
};

export const validateAvatar = (file) => {
  if (!file) return "";

  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (!allowedTypes.includes(file.type)) {
    return "Avatar must be a JPG or PNG file";
  }

  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    return "Avatar must be less than 5MB";
  }
  return "";
};

export const getInitials = (name) => {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};


export const addThousandsSeperator = (num) => {
  if(num==null || isNaN(num)) return "";

  const [integerPart, fractionalPart] = num.toString().split('.');
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  return fractionalPart
  ? `${formattedIntegerPart}.${fractionalPart}`
  : formattedIntegerPart;
};

export const truncateLabel = (text, maxLength = 10) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
};


export const prepareExpenseBarChartData = (data = []) => {
  return [...data]
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)) // old → new
    .map((item) => ({
      name: `${item.category} ${new Date(item.createdAt).toLocaleTimeString()}`,
      label: item.category, // 👈 pure category (used for X-axis display)
      amount: Math.abs(Number(item.amount)),
      date: item.createdAt,
      createdAt: item.createdAt,
    }));
};



export const prepareIncomeBarChartData = (data = []) => {
  return [...data]
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)) // old → new
    .map((item) => ({
      name: `${item.source} ${new Date(item.createdAt).toLocaleTimeString()}`,
      label: item.source, // 👈 pure category (used for X-axis display)
      amount: Math.abs(Number(item.amount)),
      date: item.createdAt,
      createdAt: item.createdAt,
    }));
};




export const prepareIncomeBarChartVisualization = (data = []) => {
  if (!Array.isArray(data)) return [];

  const sortedData = [...data].sort(
    (a, b) =>
      new Date(a.date) - new Date(b.date) ||
      new Date(a.createdAt) - new Date(b.createdAt)
  );


  return sortedData.map((item) => ({
    month: moment(item.date).format("Do MMM"),
    amount: Math.abs(Number(item.amount)),
    source: item?.source,
  }));
};

export const prepareExpenseLineChartVisualization = (data = []) => {
  if (!Array.isArray(data)) return [];

  const sortedData = [...data].sort(
    (a, b) =>
      new Date(a.date) - new Date(b.date) ||
      new Date(a.createdAt) - new Date(b.createdAt)
  );


  return sortedData.map((item) => ({
    month: moment(item.date).format("Do MMM"),
    amount: Math.abs(Number(item.amount)),
    category: item?.category,
  }));
};


