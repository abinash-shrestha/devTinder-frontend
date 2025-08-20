// import axios from 'axios';
// import React, { useEffect } from 'react';
// import { BASE_URL } from '../utils/constants';
// import { useDispatch, useSelector } from 'react-redux';
// import { addRequests, removeRequest } from '../utils/requestSlice';
// import { Heart, X } from 'lucide-react';

// const Requests = () => {
//   const dispatch = useDispatch();
//   const requests = useSelector((store) => store.requests);

//   const reviewRequest = async (status, _id) => {
//     try {
//       const res = await axios.post(
//         BASE_URL + '/request/review/' + status + '/' + _id,
//         {},
//         { withCredentials: true }
//       );
//       dispatch(removeRequest(_id));
//     } catch (err) {
//       console.log(err.message);
//     }
//   };

//   const fetchRequests = async () => {
//     try {
//       const res = await axios.get(BASE_URL + '/user/request/received/', {
//         withCredentials: true,
//       });

//       dispatch(addRequests(res.data.data));
//     } catch (err) {
//       console.log(err.message);
//     }
//   };

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   if (!requests) return;

//   if (requests.length === 0)
//     return (
//       <h2 className="text-2xl font-bold font-mono mt-4 text-center">
//         Currently there are no requests
//       </h2>
//     );

//   return (
//     <div className="flex flex-col items-center">
//       <h2 className="text-2xl font-bold font-mono mt-4">Requests</h2>
//       {requests.map((request) => {
//         const { firstName, lastName, about, age, gender, photoUrl, skills } =
//           request.fromUserId;
//         return (
//           <div
//             key={request._id}
//             className="card card-side bg-base-300 shadow-sm w-125 px-4 m-4"
//           >
//             <div className="avatar flex items-center">
//               <div className="ring-primary ring-offset-base-100 w-24 h-24 rounded-full ring-2 ring-offset-2">
//                 <img src={photoUrl} />
//               </div>
//             </div>
//             <div className="card-body">
//               <h2 className="card-title">{firstName + ' ' + lastName}</h2>
//               <p>
//                 {age}, {gender}
//               </p>
//               <p>{about}</p>
//             </div>

//             {/* action buttons */}
//             <div className="flex flex-col gap-3 items-center justify-center py-4">
//               <button
//                 onClick={() => {
//                   reviewRequest('accepted', request._id);
//                 }}
//                 className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold w-25 px-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
//               >
//                 <X size={13} />
//                 Accept
//               </button>
//               <button
//                 onClick={() => {
//                   reviewRequest('rejected', request._id);
//                 }}
//                 className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold w-25 px-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
//               >
//                 <Heart size={13} />
//                 Reject
//               </button>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Requests;

import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequest } from '../utils/requestSlice';
import { Heart, X, Users, Clock, MapPin, Calendar } from 'lucide-react';

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
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

  if (!requests) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your requests...</p>
        </div>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-gradient-to-r from-pink-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-12 h-12 text-pink-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            No Requests Yet
          </h2>
          <p className="text-gray-600 mb-6">
            When developers are interested in connecting with you, their
            requests will appear here.
          </p>
          <button className="btn-primary">Update Your Profile</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Clock className="w-6 h-6 text-pink-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              Connection Requests
            </h1>
          </div>
          <p className="text-gray-600">
            {requests.length} developer{requests.length !== 1 ? 's' : ''} want
            to connect with you
          </p>
        </div>

        {/* Requests List */}
        <div className="space-y-6">
          {requests.map((request) => {
            const {
              firstName,
              lastName,
              about,
              age,
              gender,
              photoUrl,
              skills,
            } = request.fromUserId;
            const skillsArray =
              typeof skills === 'string'
                ? skills
                    .split(',')
                    .map((skill) => skill.trim())
                    .filter(Boolean)
                : Array.isArray(skills)
                ? skills
                : [];

            return (
              <div
                key={request._id}
                className="glass-card rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Profile Image */}
                  <div className="relative w-full md:w-48 h-48 md:h-auto overflow-hidden">
                    <img
                      src={
                        photoUrl ||
                        'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400'
                      }
                      alt={`${firstName} ${lastName}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <div className="w-3 h-3 bg-green-400 rounded-full border-2 border-white shadow-sm"></div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6">
                    <div className="flex flex-col h-full">
                      {/* Header */}
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {firstName} {lastName}
                        </h3>
                        {age && gender && (
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{age} years old</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{gender}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* About */}
                      {about && (
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {about}
                        </p>
                      )}

                      {/* Skills */}
                      {skillsArray.length > 0 && (
                        <div className="mb-6">
                          <div className="flex flex-wrap gap-2">
                            {skillsArray.slice(0, 5).map((skill, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 text-sm font-medium bg-blue-50 text-blue-700 rounded-full border border-blue-200"
                              >
                                {skill}
                              </span>
                            ))}
                            {skillsArray.length > 5 && (
                              <span className="px-3 py-1 text-sm font-medium bg-gray-50 text-gray-600 rounded-full border border-gray-200">
                                +{skillsArray.length - 5} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex space-x-3 mt-auto">
                        <button
                          onClick={() => reviewRequest('rejected', request._id)}
                          className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200 hover:scale-105"
                        >
                          <X className="w-5 h-5" />
                          <span>Decline</span>
                        </button>
                        <button
                          onClick={() => reviewRequest('accepted', request._id)}
                          className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                          <Heart className="w-5 h-5" />
                          <span>Accept</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Requests;
