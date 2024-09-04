import React from "react";
import { useNavigate } from "react-router-dom";

const OutgoingManifestTab = ({
  userData = [],
  handleAssignmentChange,
  handleOpenMap,
  pickupPersons = [],
}) => {
  
  const navigate = useNavigate();

  const handleCardClick = (user) => {
    navigate(`/details/${user.AWB_NUMBER}`);
  };

  // Check if userData is not an array or is empty
  if (!Array.isArray(userData) || userData.length === 0) {
    return (
      <div className="text-center text-gray-500 p-4">
        No data available.
      </div>
    );
  }

  return (
    <div>
      {userData.map((user, index) => (
        <div
          key={index}
          className="bg-white shadow rounded-lg p-4 mb-4 cursor-pointer"
          onClick={() => handleCardClick(user)}
        >
          <div className="mb-4">
            <div
              className={`bg-${
                user.STATUS === "PENDING"
                  ? "red"
                  : user.STATUS === "COMPLETED"
                  ? "green"
                  : "gray"
              }-200 p-2 rounded text-${
                user.STATUS === "PENDING"
                  ? "red"
                  : user.STATUS === "COMPLETED"
                  ? "green"
                  : "gray"
              }-800`}
            >
              {user.STATUS}
            </div>
            <div className="flex justify-between mt-2">
              <span className="font-semibold text-gray-800">AWB No:</span>
              <span className="text-gray-700">{user.AWB_NUMBER || ""}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold text-gray-800">Consignee:</span>
              <span className="text-gray-700">{user.NAME || ""}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold text-gray-800">Destination:</span>
              <span className="text-gray-700">{user.DESTINATION || ""}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold text-gray-800">Post Pickup Boxes:</span>
              <span className="text-gray-700">{user.POST_NUMBER_OF_PACKAGES || ""}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold text-gray-800">
                Post Pickup Weight
              </span>
              <span className="text-gray-700">
                {user.POST_PICKUP_WEIGHT || ""}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold text-gray-800">Phone number:</span>
              <span className="text-gray-700">{user.PHONENUMBER || ""}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OutgoingManifestTab;