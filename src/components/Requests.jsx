import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';

const Requests = () => {
  const getRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/request/received/', {
        withCredentials: true,
      });
      console.log(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getRequests();
  }, []);
  return <div>Requests</div>;
};

export default Requests;
