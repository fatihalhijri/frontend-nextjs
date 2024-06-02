import React, { useState } from 'react';
import { BiUser } from 'react-icons/bi';
import Link from 'next/link';

interface UserSession {
  user: {
    name: string;
  };
}

const UserDropdown: React.FC<{ session: UserSession }> = ({ session }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <div className="flex justify-center items-center">
        <p className="text-base px-2">
          hello..{JSON.stringify(session?.user?.name)}
        </p>
        <BiUser className="cursor-pointer" onClick={toggleDropdown} />
      </div>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
          <div className="py-1">
            <Link href="/edit-profile">
              <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Edit User
              </a>
            </Link>
            <button
              onClick={() => console.log('Logging out...')}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
