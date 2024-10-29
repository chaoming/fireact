import React from 'react';

interface MessageProps {
  type: 'success' | 'error';
  children: React.ReactNode;
}

const Message: React.FC<MessageProps> = ({ type, children }) => {
  const baseClasses = "text-center mt-2 p-2 rounded-md";
  const typeClasses = {
    success: "bg-green-50 text-green-500 border border-green-200",
    error: "bg-red-50 text-red-500 border border-red-200"
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`}>
      {children}
    </div>
  );
};

export default Message;
