import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests } from '../utils/requestSlice';

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/request/received/', {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0)
    return (
      <h2 className="text-2xl font-bold font-mono mt-4 text-center">
        Currently there are no requests
      </h2>
    );
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold font-mono mt-4">Connections</h2>
      {requests.map((request) => {
        const { firstName, lastName, about, age, gender, photoUrl, skills } =
          request.fromUserId;
        return (
          <div
            key={request._id}
            className="card card-side bg-base-300 shadow-sm w-1/3 px-4 m-4"
          >
            <div className="avatar flex items-center">
              <div className="ring-primary ring-offset-base-100 w-24 h-24 rounded-full ring-2 ring-offset-2">
                <img src={photoUrl} />
              </div>
            </div>
            <div className="card-body">
              <h2 className="card-title">{firstName + ' ' + lastName}</h2>
              <p>{age + ' ' + gender}</p>
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
