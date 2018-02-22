import React from "react";

// const footerTable = {
//   width: window.innerWidth
// }

const Footer = ({ username, handleLogout }) => {
  return (
    <div className="footer">
      <ul className="footerList">
        <li>Pisteet: 0</li>
        <li>{handleLogout === undefined ? <div>{username}</div> : <div>{username} <button onClick={handleLogout}>Logout</button></div>}
        </li>
        <li>Rank: 1</li>
      </ul>
    </div>
  );
};

export default Footer;
