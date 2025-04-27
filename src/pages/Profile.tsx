
import React from 'react';
import UserProfile from '@/components/profile/UserProfile';

const Profile = () => {
  return (
    <div className="container max-w-4xl py-6 px-4">
      <h1 className="text-2xl font-bold mb-6 text-foreground">Your Profile</h1>
      <div className="glass-card rounded-lg shadow-card overflow-hidden">
        <UserProfile />
      </div>
    </div>
  );
};

export default Profile;
