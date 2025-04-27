
import React from 'react';
import UserProfile from '@/components/profile/UserProfile';

const Profile = () => {
  return (
    <div className="container max-w-4xl py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
      <UserProfile />
    </div>
  );
};

export default Profile;
