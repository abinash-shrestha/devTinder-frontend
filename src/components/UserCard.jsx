// import React from 'react';
// import { Heart, X } from 'lucide-react';
// import axios from 'axios';
// import { BASE_URL } from '../utils/constants';
// import { removeUserFromFeed } from '../utils/feedSlice';
// import { useDispatch } from 'react-redux';

// const UserCard = ({ user }) => {
//   const dispatch = useDispatch();
//   const { _id, firstName, lastName, age, photoUrl, gender, skills, about } =
//     user;

//   // Convert skills string to array if it's a string, otherwise use as-is
//   const skillsArray =
//     typeof skills === 'string'
//       ? skills
//           .split(',')
//           .map((skill) => skill.trim())
//           .filter(Boolean)
//       : Array.isArray(skills)
//       ? skills
//       : [];

//   const handleSendRequest = async (status, _id) => {
//     try {
//       const res = await axios.post(
//         BASE_URL + '/request/send/' + status + '/' + _id,
//         {},
//         { withCredentials: true }
//       );
//       dispatch(removeUserFromFeed(_id));
//     } catch (err) {
//       console.log(err.message);
//     }
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 w-80 h-145 overflow-hidden border border-gray-100">
//       {/* Profile Image */}
//       <div className="relative flex justify-center">
//         <img
//           src={photoUrl}
//           alt={`${firstName}'s photo`}
//           className="h-80 object-cover"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
//       </div>

//       {/* Card Content */}
//       <div className="p-6">
//         {/* Name and Age/Gender */}
//         <div className="mb-4">
//           <h2 className="text-2xl font-bold text-gray-900 mb-1">
//             {firstName} {lastName}
//           </h2>
//           {age && gender && (
//             <p className="text-gray-600 text-sm font-medium">
//               {age}, {gender}
//             </p>
//           )}
//         </div>

//         {/* About Section */}
//         {about && (
//           <div className="mb-4">
//             <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
//               {about}
//             </p>
//           </div>
//         )}

//         {/* Skills */}
//         {skillsArray.length > 0 && (
//           <div className="mb-6">
//             <div className="flex flex-wrap gap-2">
//               {skillsArray.slice(0, 4).map((skill, index) => (
//                 <span
//                   key={index}
//                   className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-200"
//                 >
//                   {skill}
//                 </span>
//               ))}
//               {skillsArray.length > 4 && (
//                 <span className="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-full border border-gray-200">
//                   +{skillsArray.length - 4} more
//                 </span>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Action Buttons */}
//         <div className="flex gap-3">
//           <button
//             onClick={() => handleSendRequest('ignored', _id)}
//             className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
//           >
//             <X size={18} />
//             Ignore
//           </button>
//           <button
//             onClick={() => handleSendRequest('interested', _id)}
//             className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
//           >
//             <Heart size={18} />
//             Interested
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserCard;

import React from 'react';
import {
  Heart,
  X,
  MapPin,
  Calendar,
  Github,
  ExternalLink,
  Star,
} from 'lucide-react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { removeUserFromFeed } from '../utils/feedSlice';
import { useDispatch } from 'react-redux';

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, age, photoUrl, gender, skills, about } =
    user;

  const skillsArray =
    typeof skills === 'string'
      ? skills
          .split(',')
          .map((skill) => skill.trim())
          .filter(Boolean)
      : Array.isArray(skills)
      ? skills
      : [];

  const handleSendRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + '/request/send/' + status + '/' + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(_id));
    } catch (err) {
      console.log(err.message);
    }
  };

  const getSkillColor = (index) => {
    const colors = [
      'from-blue-50 to-blue-100 text-blue-700 border-blue-200',
      'from-purple-50 to-purple-100 text-purple-700 border-purple-200',
      'from-green-50 to-green-100 text-green-700 border-green-200',
      'from-orange-50 to-orange-100 text-orange-700 border-orange-200',
      'from-pink-50 to-pink-100 text-pink-700 border-pink-200',
      'from-indigo-50 to-indigo-100 text-indigo-700 border-indigo-200',
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="glass-card rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
        {/* Profile Image */}
        <div className="relative h-80 overflow-hidden">
          <img
            src={
              photoUrl ||
              'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400'
            }
            alt={`${firstName}'s photo`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Online Status */}
          <div className="absolute top-4 right-4">
            <div className="w-3 h-3 bg-green-400 rounded-full border-2 border-white shadow-sm"></div>
          </div>

          {/* Basic Info Overlay */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h2 className="text-2xl font-bold mb-1">
              {firstName} {lastName}
            </h2>
            {age && gender && (
              <div className="flex items-center space-x-4 text-sm opacity-90">
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
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* About Section */}
          {about && (
            <div>
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                {about}
              </p>
            </div>
          )}

          {/* Skills Section */}
          {skillsArray.length > 0 && (
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Star className="w-4 h-4 text-gray-500" />
                <h3 className="text-sm font-semibold text-gray-700">
                  Tech Stack
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skillsArray.slice(0, 6).map((skill, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full border bg-gradient-to-r ${getSkillColor(
                      index
                    )} transition-all duration-200 hover:scale-105`}
                  >
                    {skill}
                  </span>
                ))}
                {skillsArray.length > 6 && (
                  <span className="px-3 py-1.5 text-xs font-medium rounded-full border bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600 border-gray-200">
                    +{skillsArray.length - 6} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-2">
            <button
              onClick={() => handleSendRequest('ignored', _id)}
              className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200 hover:scale-105"
            >
              <X className="w-5 h-5" />
              <span>Pass</span>
            </button>
            <button
              onClick={() => handleSendRequest('interested', _id)}
              className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Heart className="w-5 h-5" />
              <span>Connect</span>
            </button>
          </div>

          {/* Additional Actions */}
          <div className="flex justify-center space-x-4 pt-2 border-t border-gray-100">
            <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
              <Github className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
              <ExternalLink className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
