import { useState, useCallback } from "react";

interface SetValueProps {
  key: string;
  data: Record<string, any>;
  callback?: (success: boolean) => void;
}

interface GetValueProps {
  key: string;
  callback: (data: Record<string, any> | null) => void;
  // callback: (data: string | null) => void;
}

interface RemoveValueProps {
  key: string;
  callback?: (success: boolean) => void;
}

export default function useLocalStorage() {
  const setValue = useCallback(({ key, data, callback }: SetValueProps) => {
    try {
      const value = JSON.stringify(data);
      localStorage.setItem(key, value);
      if (callback) callback(true);
    } catch (error) {
      console.error("Error setting item in local storage:", error);
      if (callback) callback(false);
    }
  }, []);

  const getValue = useCallback(({ key, callback }: GetValueProps) => {
    try {
      const value = localStorage.getItem(key);
      if (value) {
        const data = JSON.parse(value);
        return callback(data);
      }
      callback(null);
    } catch (error) {
      console.error("Error getting item from local storage:", error);
      callback(null);
    }
  }, []);

  const removeValue = useCallback(({ key, callback }: RemoveValueProps) => {
    try {
      localStorage.removeItem(key);
      if (callback) callback(true);
    } catch (error) {
      console.error("Error removing item from local storage:", error);
      if (callback) callback(false);
    }
  }, []);

  return { setValue, getValue, removeValue };
}
