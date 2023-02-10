import { useState, useEffect } from "react";
import axios from "axios";

export const useChatGPT = (prompt, loginCode, modal2Open) => {
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.post("/api/chatgpt", {
          prompt,
          loginCode,
        });

        setResponse({
          reply: response?.data?.reply,
          error: response?.data?.error,
        });
      } catch (error) {
        setResponse({
          reply: response?.data?.reply,
          error:
            error?.message ??
            "网络不稳定，连接超时！可以点击网页最下方的官方链接获取完整回答。",
        });
      } finally {
        setLoading(false);
      }
    };

    if (prompt && !modal2Open) {
      fetchData();
    }
  }, [prompt, loginCode, modal2Open]);

  return { ...response, loading };
};
