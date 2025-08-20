// import axios from 'axios';
// import { BASE_URL } from '../utils/constants';
// import { useDispatch, useSelector } from 'react-redux';
// import UserCard from './UserCard';
// import { addFeed } from '../utils/feedSlice';
// import { useEffect } from 'react';

// const Feed = () => {
//   const feed = useSelector((store) => store.feed);
//   console.log(feed);
//   const dispatch = useDispatch();

//   const getFeed = async () => {
//     if (feed) return;

//     try {
//       const res = await axios.get(BASE_URL + '/user/feed', {
//         withCredentials: true,
//       });
//       dispatch(addFeed(res?.data?.data));
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   useEffect(() => {
//     getFeed();
//   }, []);

//   if (!feed) return;

//   if (feed.length <= 0) {
//     return (
//       <h2 className="text-2xl font-bold font-mono mt-4 text-center">
//         Currently there are no new users
//       </h2>
//     );
//   }

//   return (
//     feed && (
//       <div className="min-h-screen bg-base-200 py-5">
//         <div className="mx-auto flex items-center justify-center">
//           <UserCard user={feed[0]} />
//         </div>
//       </div>
//     )
//   );
// };

// export default Feed;

import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import UserCard from './UserCard';
import { addFeed } from '../utils/feedSlice';
import { useEffect } from 'react';
import { Users, Sparkles, RefreshCw } from 'lucide-react';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;

    try {
      const res = await axios.get(BASE_URL + '/user/feed', {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error(err.message);
    }
  };

  const refreshFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/feed', {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading amazing developers...</p>
        </div>
      </div>
    );
  }

  if (feed.length <= 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            No More Developers
          </h2>
          <p className="text-gray-600 mb-6">
            You've seen all available developers in your area. Check back later
            for new profiles!
          </p>
          <button
            onClick={refreshFeed}
            className="btn-primary inline-flex items-center space-x-2"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Refresh Feed</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="pt-8 pb-6 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="w-6 h-6 text-blue-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Discover Developers
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect with talented developers from around the world. Swipe right
            to connect, left to pass.
          </p>
        </div>
      </div>

      {/* Feed Content */}
      <div className="pb-8 px-4">
        <div className="max-w-4xl mx-auto flex justify-center">
          <UserCard user={feed[0]} />
        </div>
      </div>

      {/* Stats Bar */}
      <div className="fixed bottom-0 left-0 right-0 glass-card border-t border-white/20 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <span className="font-semibold text-blue-600">{feed.length}</span>{' '}
            developers remaining
          </div>
          <button
            onClick={refreshFeed}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feed;
