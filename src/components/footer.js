import React from "react";

// const footerTable = {
//   width: window.innerWidth
// }

const Footer = ({ user, handleLogout }) => {
  return (
    <div className="footer">
      <ul className="footerList">
        <li>{user === null ? <div>Points: 0</div> : <div>Points: {user.points}</div>}</li>
        <li>{user === null ? <div>Status: offline</div> : <div>{user.username} <button onClick={handleLogout}>Logout</button></div>}
        </li>
        <li>Rank: 1</li>
      </ul>
    </div>
  );
};

export default Footer;
