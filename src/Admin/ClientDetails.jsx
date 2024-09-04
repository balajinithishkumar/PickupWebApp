import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import apiURL from "../utility/GooglesheetAPI/apiURLs.js";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase.jsx";

function ClientDetails() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const fetchFromFirebase = async (awbNumber) => {
    try {
      const folders = ["FORM IMAGES", "PACKAGE WEIGHT", "PRODUCT IMAGES"];
      const allUrls = [];

      for (const folder of folders) {
        const folderRef = ref(storage, `${awbNumber}/${folder}/`);
        const folderList = await listAll(folderRef);

        const urls = await Promise.all(
          folderList.items.map((item) => getDownloadURL(item))
        );

        allUrls.push(...urls); // Add all URLs to the images array
      }

      setImages(allUrls); // Set images state with fetched URLs
      console.log("Fetched image URLs:", allUrls);
    } catch (error) {
      console.error("Error fetching data from Firebase:", error);
    }
  };

  useEffect(() => {
    fetchFromFirebase(291784);
  }, []);

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

  const handleBack = () => {
    navigate(-1);
  };

  const openLightbox = () => {
    if (images.length > 0) {
      setLightboxOpen(true);
    }
  };

  const moveNext = () => {
    setImageIndex((imageIndex + 1) % images.length);
  };

  const movePrev = () => {
    setImageIndex((imageIndex + images.length - 1) % images.length);
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
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
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
                <span className="font-semibold">Actual Weight:</span>{" "}
                {client.weightapx}
              </p>
              <p className="text-gray-700 mb-4">
                <span className="font-semibold">
                  Actual Number of Packages:
                </span>{" "}
                {client.actualNoOfPackages}
              </p>
              <div className="flex justify-around mt-4">
                <img
                  className="h-6 cursor-pointer"
                  src="Group 1.svg"
                  alt="Icon 1"
                  onClick={openLightbox} // Open lightbox on click
                />
                <img className="h-6" src="layer1.svg" alt="Icon 2" />
                <img className="h-6" src="Vector.svg" alt="Icon 3" />
              </div>
            </div>
          ))}
        </div>
      )}

      
    </div>
  );
}




export default ClientDetails;

// import LightGallery from 'lightgallery/react';

// // import styles
// import 'lightgallery/css/lightgallery.css';
// import 'lightgallery/css/lg-zoom.css';
// import 'lightgallery/css/lg-thumbnail.css';

// // If you want you can use SCSS instead of css
// import 'lightgallery/scss/lightgallery.scss';
// import 'lightgallery/scss/lg-zoom.scss';

// // import plugins if you need
// import lgThumbnail from 'lightgallery/plugins/thumbnail';
// import lgZoom from 'lightgallery/plugins/zoom';

// function ClientDetails() {
//     const onInit = () => {
//         console.log('lightGallery has been initialized');
//     };
//     return (
//         <div className="App">
//             <LightGallery
//                 onInit={onInit}
//                 speed={500}
//                 plugins={[lgThumbnail, lgZoom]}
//             >
//                 <a href="img/img1.jpg">
//                     <img alt="img1" src="img/thumb1.jpg" />
//                 </a>
//                 <a href="img/img2.jpg">
//                     <img alt="img2" src="img/thumb2.jpg" />
//                 </a>
//             </LightGallery>
//         </div>
//     );
// }
// export default ClientDetails;