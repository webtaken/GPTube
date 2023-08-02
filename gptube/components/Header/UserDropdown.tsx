import React, { Fragment } from "react";

interface DropdownOptions {
  key: string;
  label: string;
  onClick?: () => void;
}

interface UserDropdownProp {
  userEmail: string;
  profileImage: JSX.Element;
  options: DropdownOptions[];
}

const UserDropdown: React.FC<UserDropdownProp> = ({
  profileImage,
  userEmail,
  options,
}) => {
  return (
    <div className="dropdown dropdown-end">
      <label
        tabIndex={0}
        className="bg-black-full border-none hover:bg-black-full btn"
      >
        {profileImage}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-black-medium rounded-md w-52"
      >
        <li className="text-center p-2">Welcome {userEmail}</li>
        {options.map((option) => {
          return (
            <li key={option.key}>
              <button
                onClick={() => {
                  option.onClick && option.onClick();
                }}
              >
                {option.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserDropdown;
