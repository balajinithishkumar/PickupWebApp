import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useHistory } from "react-router-dom"; // or useNavigate if you're using react-router-dom v6

function ClientDetails() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory(); // or const navigate = useNavigate(); for react-router-dom v6

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.sheety.co/89a54f0c3804df72e39147b74d9f7f10/pickupdata/sheet1"
        );
        const data = await response.json();
        setClients(data.sheet1);
      } catch (error) {
        console.error("Error fetching client details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBack = () => {
    history.goBack(); // or navigate(-1); for react-router-dom v6
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
                AWB Number: <span className="text-[#8847D9]">{client.awbNumber}</span>
              </h3>
              <p className="text-gray-700 mb-3">
                <span className="font-semibold">Phone Number:</span> {client.phonenumber}
              </p>
              <p className="text-gray-700 mb-3">
                <span className="font-semibold">Name:</span> {client.name}
              </p>
              <p className="text-gray-700 mb-3">
                <span className="font-semibold">Actual Weight:</span> {client.weightapx}
              </p>
              <p className="text-gray-700 mb-4">
                <span className="font-semibold">Actual Number of Packages:</span> {client.actualNoOfPackages}
              </p>
              <div className="flex justify-around mt-4">
                <img className="h-6" src="Group 1.svg" alt="Icon 1" />
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