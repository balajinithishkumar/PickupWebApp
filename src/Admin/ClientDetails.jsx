import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import apiURL from "../utility/GooglesheetAPI/apiURLs.js";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase.jsx";
import LightGallery from "lightgallery/react";

// Import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

// Import plugins
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

function ClientDetails() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productImages, setProductImages] = useState([]);
  const [showLightbox, setShowLightbox] = useState(false);

  const navigate = useNavigate();

  // Fetch client details from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiURL.sheety);
        const data = await response.json();
        setClients(data.sheet1);
        console.log(data.sheet1);
      } catch (error) {
        console.error("Error fetching client details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleIconClick = (awbNumber) => {
    navigate(`/images/${awbNumber}`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="mb-4">
        <button
          onClick={handleBack}
          className="flex items-center text-purple-600 hover:text-purple-800 transition-colors duration-200"
        >
          <FaArrowLeft className="mr-2" />
          <span>Back</span>
        </button>
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client) => (
            <div
              key={client.awbNumber}
              className="bg-white p-6 relative rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                AWB Number:{" "}
                <span className="text-[#8847D9]">{client.awbNumber}</span>
              </h3>
              <p className="text-gray-700 mb-3">
                <span className="font-semibold">Phone Number:</span>{" "}
                {client.phonenumber}
              </p>
              <p className="text-gray-700 mb-3">
                <span className="font-semibold">Name:</span> {client.name}
              </p>
              <p className="text-gray-700 mb-3">
                <span className="font-semibold">Final Weight:</span>{" "}
                {client.weightapx}
              </p>
              <p className="text-gray-700 mb-4">
                <span className="font-semibold">
                  Final Number of Boxes:
                </span>{" "}
                {client.actualNoOfPackages}
              </p>
              <div className="flex absolute top-3 right-8 justify-around mt-4">
                <img
                  className="h-6 cursor-pointer"
                  src="Group 1.svg"
                  alt="Product Images Icon"
                  onClick={() => handleIconClick(client.awbNumber)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ClientDetails;