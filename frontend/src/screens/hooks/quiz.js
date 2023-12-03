
import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetQuiz = (url, params) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set loading to true when the request starts
        setLoading(true);
console.log("I ran")
        // Make the GET request using Axios
        const response = await axios.get(url, {
            params: params,
        });
console.log(response, "RES_USEGT")
        // Set the data when the request is successful
        setData(response.data);

        // Reset error state
        setError(null);
        setLoading(false);
      } catch (error) {
        // Set error state when there's an error
        setError(error.message);

        // Reset data
        setData(null);
      } finally {
        // Set loading to false when the request is completed (whether it succeeded or failed)
        setLoading(false);
      }
    };

    // Call the fetchData function
    fetchData();
  }, [url]); // Re-run the effect whenever the URL changes

  // Return the state and a function to manually trigger a re-fetch
  return { data, loading, error, refetch: () => fetchData() };
};

export default useGetQuiz;