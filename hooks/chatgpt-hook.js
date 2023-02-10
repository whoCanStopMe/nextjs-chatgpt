import { useState, useEffect } from "react";
import axios from "axios";

export const useChatGPT = (prompt, loginCode) => {
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await axios.post("/api/chatgpt", { prompt, loginCode });
      setLoading(false);
      setResponse({
        reply: response?.data?.reply,
        error: response?.data?.error,
      });
    };

    if (prompt) {
      fetchData();
    }
  }, [prompt, loginCode]);

  return { ...response, loading };
};
