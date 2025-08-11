import React from 'react';
import EditProfile from './EditProfile';
import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector((store) => store.user);
  return (
    user && (
      <div className="min-h-screen bg-base-200 py-8">
        <div className="flex justify-center">
          <EditProfile user={user} />
        </div>
      </div>
    )
  );
};

export default Profile;
