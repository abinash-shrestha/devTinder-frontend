import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequest } from '../utils/requestSlice';
import { Heart, X } from 'lucide-react';

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + '/request/review/' + status + '/' + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/request/received/', {
        withCredentials: true,
      });

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
      <h2 className="text-2xl font-bold font-mono mt-4">Requests</h2>
      {requests.map((request) => {
        const { firstName, lastName, about, age, gender, photoUrl, skills } =
          request.fromUserId;
        return (
          <div
            key={request._id}
            className="card card-side bg-base-300 shadow-sm w-125 px-4 m-4"
          >
            <div className="avatar flex items-center">
              <div className="ring-primary ring-offset-base-100 w-24 h-24 rounded-full ring-2 ring-offset-2">
                <img src={photoUrl} />
              </div>
            </div>
            <div className="card-body">
              <h2 className="card-title">{firstName + ' ' + lastName}</h2>
              <p>
                {age}, {gender}
              </p>
              <p>{about}</p>
            </div>

            {/* action buttons */}
            <div className="flex flex-col gap-3 items-center justify-center py-4">
              <button
                onClick={() => {
                  reviewRequest('accepted', request._id);
                }}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold w-25 px-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
              >
                <X size={13} />
                Accept
              </button>
              <button
                onClick={() => {
                  reviewRequest('rejected', request._id);
                }}
                className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold w-25 px-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Heart size={13} />
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
