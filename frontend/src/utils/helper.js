import moment from "moment";

export const validateEmail = (email) => {
  if (!email.trim()) {
    return "Email is required";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  if (!password || password.trim() === "") {
    return { valid: false, message: "Password is required" };
  }

  if (password.length < 8) {
    return { valid: false, message: "Password must be at least 8 characters" };
  }

  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: "Include at least one uppercase letter" };
  }

  if (!/[a-z]/.test(password)) {
    return { valid: false, message: "Include at least one lowercase letter" };
  }

  if (!/[0-9]/.test(password)) {
    return { valid: false, message: "Include at least one number" };
  }

  if (!/[!@#$%^&*]/.test(password)) {
    return {
      valid: false,
      message: "Include at least one special character",
    };
  }

  return { valid: true, message: "Strong password" };
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

export const formatNumber=(value)=> {
  if (value < 1000) return String(value);

  const units = [
    { value: 1e12, symbol: "T" },
    { value: 1e9, symbol: "B" },
    { value: 1e6, symbol: "M" },
    { value: 1e3, symbol: "K" },
  ];

  for (const unit of units) {
    if (value >= unit.value * 0.5) {
      const raw = value / unit.value;
      const rounded = Number(raw.toFixed(2));

      // Approximation (e.g. 999 → ~1K)
      if (value < unit.value && rounded >= 1) {
        return `~1${unit.symbol}`;
      }

      // Exact boundary (1000 → 1K, 100000 → 0.1M)
      if (Number.isInteger(raw)) {
        return `${raw}${unit.symbol}`;
      }

      // Exact decimal like 0.1M
      if ((raw * 10) % 1 === 0) {
        return `${raw}${unit.symbol}`;
      }

      // Above boundary → +
      return `${rounded}${unit.symbol}+`;
    }
  }

  return String(value);
}


export const formatTime = (sec) => {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
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
    // 🔑 UNIQUE X-AXIS KEY (date + time)
    xKey: `${item.source}__${item.createdAt}`,

    // 👀 DISPLAY VALUE (date only)
    displayDate: moment(item.date).format("Do MMM"),

    amount: Math.abs(Number(item.amount)),

    // 📦 full payload for tooltip
    source: item.source,
    icon: item.icon,
    date: item.date,
    createdAt: item.createdAt,
    description: item.description || "",
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
    // 🔑 UNIQUE X-AXIS KEY
    xKey: `${item.category}__${item.createdAt}`,

    // 👀 WHAT USER SEES ON X-AXIS
    displayDate: moment(item.date).format("Do MMM"),

    amount: Math.abs(Number(item.amount)),

    // 📦 FULL PAYLOAD FOR TOOLTIP
    category: item.category,
    date: item.date,
    createdAt: item.createdAt,
    description: item.description || "",
  }));
};



