import React from 'react';
import { UserData } from './Dashboard';

interface AvatarProps {
  userData: UserData | null;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ userData, size = 'md', className = '' }) => {
  const initials = userData?.display_name ? userData.display_name.charAt(0) : '';

  const sizeClasses = {
    sm: 'h-10 w-10 text-sm',
    md: 'h-12 w-12 text-base',
    lg: 'h-20 w-20 text-xl',
    xl: 'h-32 w-32 text-2xl'
  };

  return (
    <div className={`flex items-center justify-center rounded-full bg-gray-300 text-white ${sizeClasses[size]} ${className}`}>
      {userData?.avatar_url ? (
        <img 
          src={userData.avatar_url} 
          alt="User Avatar" 
          className="h-full w-full rounded-full object-cover"
        />
      ) : (
        <span className="font-medium">{initials}</span>
      )}
    </div>
  );
};

export default Avatar;
