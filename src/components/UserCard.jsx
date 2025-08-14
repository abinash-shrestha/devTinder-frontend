import React from 'react';
import { Heart, X } from 'lucide-react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { removeUserFromFeed } from '../utils/feedSlice';
import { useDispatch } from 'react-redux';

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, age, photoUrl, gender, skills, about } =
    user;

  // Convert skills string to array if it's a string, otherwise use as-is
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
      const res = await axios.post(
        BASE_URL + '/request/send/' + status + '/' + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(_id));
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 w-80 h-145 overflow-hidden border border-gray-100">
      {/* Profile Image */}
      <div className="relative flex justify-center">
        <img
          src={photoUrl}
          alt={`${firstName}'s photo`}
          className="h-80 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Name and Age/Gender */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            {firstName} {lastName}
          </h2>
          {age && gender && (
            <p className="text-gray-600 text-sm font-medium">
              {age}, {gender}
            </p>
          )}
        </div>

        {/* About Section */}
        {about && (
          <div className="mb-4">
            <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
              {about}
            </p>
          </div>
        )}

        {/* Skills */}
        {skillsArray.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {skillsArray.slice(0, 4).map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-200"
                >
                  {skill}
                </span>
              ))}
              {skillsArray.length > 4 && (
                <span className="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-full border border-gray-200">
                  +{skillsArray.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => handleSendRequest('ignored', _id)}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
          >
            <X size={18} />
            Ignore
          </button>
          <button
            onClick={() => handleSendRequest('interested', _id)}
            className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
          >
            <Heart size={18} />
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
