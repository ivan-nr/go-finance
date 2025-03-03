import type { User } from "@/types/user";
import type { Transaction } from "@/types/transaction";

// Use environment variable for API base URL
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://reqres.in/api";

// Helper function to get auth token
const getAuthToken = () => localStorage.getItem("authToken");

// Helper functions for localStorage
const getTransactions = (): Transaction[] => {
  const storedTransactions = localStorage.getItem("transactions");
  return storedTransactions ? JSON.parse(storedTransactions) : [];
};

const setTransactions = (transactions: Transaction[]) => {
  localStorage.setItem("transactions", JSON.stringify(transactions));
};

// Simulate authentication with reqres.in API
export const loginUser = async (
  email: string,
  password: string
): Promise<{ user: User; token: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Login failed");
    }

    const data = await response.json();

    // Fetch user data immediately after successful login
    const userResponse = await fetch(`${API_BASE_URL}/users/2`, {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    });

    if (!userResponse.ok) {
      throw new Error("Failed to fetch user data");
    }

    const userData = await userResponse.json();

    const user: User = {
      id: userData.data.id.toString(),
      email: userData.data.email,
      fullName: `${userData.data.first_name} ${userData.data.last_name}`,
      avatar: userData.data.avatar,
    };

    return {
      user,
      token: data.token,
    };
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const registerUser = async (
  fullName: string,
  email: string,
  password: string
): Promise<{ user: User; token: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Registration failed");
    }

    const data = await response.json();

    // Create user data
    const user: User = {
      id: data.id || "1",
      email,
      fullName,
      avatar: `https://reqres.in/img/faces/${
        Math.floor(Math.random() * 12) + 1
      }-image.jpg`,
    };

    return {
      user,
      token: data.token,
    };
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const fetchCurrentUser = async (): Promise<User> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/2`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const data = await response.json();

    // Map API response to our User type
    return {
      id: data.data.id.toString(),
      email: data.data.email,
      fullName: `${data.data.first_name} ${data.data.last_name}`,
      avatar: data.data.avatar,
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const updateProfile = async (userData: User): Promise<User> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to update profile");
    }

    // Reqres.in will return the data we sent
    return userData;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

// Transaction API functions
export const fetchTransactions = async (): Promise<Transaction[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return getTransactions();
};

export const createTransaction = async (
  transaction: Omit<Transaction, "id">
): Promise<Transaction> => {
  const transactions = getTransactions();
  const newTransaction: Transaction = {
    ...transaction,
    id: Date.now().toString(), // Generate a unique ID
  };
  transactions.push(newTransaction);
  setTransactions(transactions);
  return newTransaction;
};

export const updateTransaction = async (
  transaction: Transaction
): Promise<Transaction> => {
  const transactions = getTransactions();
  const index = transactions.findIndex((t) => t.id === transaction.id);
  if (index !== -1) {
    transactions[index] = transaction;
    setTransactions(transactions);
    return transaction;
  }
  throw new Error("Transaction not found");
};

export const deleteTransaction = async (id: string): Promise<void> => {
  const transactions = getTransactions();
  const updatedTransactions = transactions.filter((t) => t.id !== id);
  setTransactions(updatedTransactions);
};
