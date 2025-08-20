// import axios from 'axios';
// import { addConnections } from '../utils/connectionSlice';
// import { BASE_URL } from '../utils/constants';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// const Connections = () => {
//   const dispatch = useDispatch();
//   const connections = useSelector((store) => store.connections);

//   const fetchConnections = async () => {
//     try {
//       const res = await axios.get(BASE_URL + '/user/connections', {
//         withCredentials: true,
//       });
//       dispatch(addConnections(res.data.data));
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchConnections();
//   }, []);

//   if (!connections) return;
//   if (connections.length === 0)
//     return (
//       <h2 className="text-2xl font-bold font-mono mt-4 text-center">
//         Currently there are no connections
//       </h2>
//     );

//   return (
//     <div className="flex flex-col items-center">
//       <h2 className="text-2xl font-bold font-mono mt-4">Connections</h2>
//       {connections.map((connection) => {
//         const { firstName, lastName, about, age, gender, photoUrl, skills } =
//           connection;
//         return (
//           <div
//             key={connection._id}
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
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Connections;

import axios from 'axios';
import { addConnections } from '../utils/connectionSlice';
import { BASE_URL } from '../utils/constants';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Users,
  MessageCircle,
  Github,
  ExternalLink,
  MapPin,
  Calendar,
} from 'lucide-react';

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/connections', {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your connections...</p>
        </div>
      </div>
    );
  }

  if (connections.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            No Connections Yet
          </h2>
          <p className="text-gray-600 mb-6">
            Start swiping to connect with amazing developers and build your
            network!
          </p>
          <button className="btn-primary">Discover Developers</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Your Connections
          </h1>
          <p className="text-gray-600">
            {connections.length} developer{connections.length !== 1 ? 's' : ''}{' '}
            in your network
          </p>
        </div>

        {/* Connections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.map((connection) => {
            const {
              firstName,
              lastName,
              about,
              age,
              gender,
              photoUrl,
              skills,
            } = connection;
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
                key={connection._id}
                className="glass-card rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                {/* Profile Header */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={
                      photoUrl ||
                      'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400'
                    }
                    alt={`${firstName} ${lastName}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Online Status */}
                  <div className="absolute top-4 right-4">
                    <div className="w-3 h-3 bg-green-400 rounded-full border-2 border-white shadow-sm"></div>
                  </div>

                  {/* Name Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold mb-1">
                      {firstName} {lastName}
                    </h3>
                    {age && gender && (
                      <div className="flex items-center space-x-4 text-sm opacity-90">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{age}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{gender}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* About */}
                  {about && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {about}
                    </p>
                  )}

                  {/* Skills */}
                  {skillsArray.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {skillsArray.slice(0, 3).map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full border border-blue-200"
                          >
                            {skill}
                          </span>
                        ))}
                        {skillsArray.length > 3 && (
                          <span className="px-2 py-1 text-xs font-medium bg-gray-50 text-gray-600 rounded-full border border-gray-200">
                            +{skillsArray.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button className="flex-1 btn-primary text-sm py-2 flex items-center justify-center space-x-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>Message</span>
                    </button>
                    <button className="p-2 btn-secondary">
                      <Github className="w-4 h-4" />
                    </button>
                    <button className="p-2 btn-secondary">
                      <ExternalLink className="w-4 h-4" />
                    </button>
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

export default Connections;
