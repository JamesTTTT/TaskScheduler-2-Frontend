import React, { useEffect, useState } from "react";
import { getUserDetails } from "../../api/authApi";
import { FaRegUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
const Header = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const { token, logout } = useAuth();

  useEffect(() => {
    console.log(token);
    const fetchUserDetails = async () => {
      const res = await getUserDetails(token);
      console.log(res);
      setUserDetails(res.data);
    };
    fetchUserDetails();
  }, []);

  return (
    <div className="w-full h-24 p-3 flex justify-between relative">
      <h1 className="text-2xl font-bold">TaskPhantom.net</h1>
      <div
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="text-3xl p-2 bg-dark-base2 h-fit rounded-full"
      >
        <FaRegUserCircle />
        {isHovering && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-md absolute right-5 bg-dark-base2 w-72 rounded-md"
          >
            <div className="absolute -top-2.5 right-2 w-5 h-5 bg-dark-base2 transform rotate-45"></div>
            {userDetails ? (
              <div>
                <h1 className="text-xl px-2 pt-2">{userDetails.fullName}</h1>
                <h1 className="text-lg px-2 pb-2 flex justify-between">
                  {userDetails.email}-{" "}
                  {userDetails.isVerified ? (
                    <p className="text-sm italic text-green-500">Verified</p>
                  ) : (
                    <p className="text-sm italic text-red-500">Unverified</p>
                  )}
                </h1>
              </div>
            ) : (
              <div className="text-center">
                <h1 className="text-xl">loading</h1>
              </div>
            )}
            <div className="p-0 text-lg flex justify-evenly border-t border-dark-primary">
              <button
                onClick={logout}
                className="p-2 bg-dark-base my-2 rounded-xl"
              >
                Logout
              </button>
              <button className="p-2 bg-dark-base my-2 rounded-xl">
                Settings
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Header;
