import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="flex justify-end p-4 bg-white">
      <Link to="/ClientDetails">
        <img
          style={{ height: 26 }}
          src="client-profile-svgrepo-com.svg"
          alt=""
        />
      </Link>
    </div>
  );
}

export default Nav;