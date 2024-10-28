import React from 'react';
import { UserData } from './Dashboard'; // Import UserData type

interface AvatarProps {
  userData: UserData | null; // Accept userData as a prop
}

const Avatar: React.FC<AvatarProps> = ({ userData }) => {
  const initials = userData?.display_name ? userData.display_name.charAt(0) : '';

  return (
    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-300 text-white">
      {userData?.avatar_url ? (
        <img src={userData.avatar_url} alt="User Avatar" className="h-full w-full rounded-full" />
      ) : (
        <span className="text-sm font-medium">{initials}</span>
      )}
    </div>
  );
};

export default Avatar;
