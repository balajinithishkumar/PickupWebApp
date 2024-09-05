import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { FaArrowLeft, FaEye } from 'react-icons/fa';
import { storage } from './firebase.jsx';
import { useNavigate } from 'react-router-dom';

function ImageGallery() {
  const { awbNumber } = useParams();
  const [formImages, setFormImages] = useState([]);
  const [packageWeightImages, setPackageWeightImages] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const navigate = useNavigate();

  const fetchDocumentsFromFolder = async (folder, setter) => {
    try {
      const folderRef = ref(storage, `${awbNumber}/${folder}/`);
      const folderList = await listAll(folderRef);
      const urls = await Promise.all(
        folderList.items.map((item) => getDownloadURL(item))
      );
      setter(urls);
    } catch (error) {
      console.error(`Error fetching ${folder} documents:`, error);
    }
  };

  useEffect(() => {
    const fetchAllDocuments = async () => {
      await fetchDocumentsFromFolder("FORM IMAGES", setFormImages);
      await fetchDocumentsFromFolder("PACKAGE WEIGHT", setPackageWeightImages);
      await fetchDocumentsFromFolder("PRODUCT IMAGES", setProductImages);
    };

    fetchAllDocuments();
  }, [awbNumber]);

  const renderDocument = (url) => {
    if (url.endsWith('.pdf')) {
      return (
        <iframe
          src={url}
          title="PDF Viewer"
          className="w-full h-64 border-none rounded-lg shadow-lg"
        ></iframe>
      );
    }
    return (
      <img
        src={url}
        alt="Document"
        className="w-full h-48 object-cover rounded-lg shadow-lg"
      />
    );
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleView = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-6 flex items-center">
        <button
          onClick={handleBack}
          className="flex items-center text-purple-600 hover:text-purple-800 transition-colors duration-200"
        >
          <FaArrowLeft className="mr-2" />
          <span>Back</span>
        </button>
      </div>

      <div className="space-y-8">
        {formImages.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Form Images</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {formImages.map((url, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md relative">
                  {renderDocument(url)}
                  <button
                    onClick={() => handleView(url)}
                    className="absolute bottom-4 right-4 bg-purple-600 text-white p-2 rounded-lg flex items-center hover:bg-purple-700 transition-colors duration-200"
                  >
                    <FaEye className="mr-2" />
                    View
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {packageWeightImages.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Package Weight Images</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {packageWeightImages.map((url, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md relative">
                  {renderDocument(url)}
                  <button
                    onClick={() => handleView(url)}
                    className="absolute bottom-4 right-4 bg-purple-600 text-white p-2 rounded-lg flex items-center hover:bg-purple-700 transition-colors duration-200"
                  >
                    <FaEye className="mr-2" />
                    View
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {productImages.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Product Images</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {productImages.map((url, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md relative">
                  {renderDocument(url)}
                  <button
                    onClick={() => handleView(url)}
                    className="absolute bottom-4 right-4 bg-purple-600 text-white p-2 rounded-lg flex items-center hover:bg-purple-700 transition-colors duration-200"
                  >
                    <FaEye className="mr-2" />
                    View
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {formImages.length === 0 && packageWeightImages.length === 0 && productImages.length === 0 && (
          <p className="text-center text-gray-600">No documents available.</p>
        )}
      </div>
    </div>
  );
}

export default ImageGallery;