import React from 'react';
import AppContext from '../../Context/AppContext';
import { useContext } from 'react';

const Profile = () => {
  const { user } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center p-6 rounded-lg shadow-lg max-w-sm mx-auto" 
         style={{ background: 'linear-gradient(135deg, #1b1c1d, #2e2a52, #49386a, #614387, #a37943)' }}>
      <h1 className="text-2xl font-semibold text-white mb-4">User Profile</h1>
      {user ? (
        <>
          <p className="text-lg text-gray-200 mb-2">
            <span className="font-medium text-gray-300">Name:</span> {user.username}
          </p>
          <p className="text-lg text-gray-200">
            <span className="font-medium text-gray-300">Email:</span> {user.email}
          </p>
        </>
      ) : (
        <p className="text-gray-400">Loading user information...</p>
      )}
    </div>
  );
};

export default Profile;
