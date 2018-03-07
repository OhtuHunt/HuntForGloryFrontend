import React from "react";

// const footerTable = {
//   width: window.innerWidth
// }

const Footer = ({ user, users, handleLogout }) => {
  let rank = 0
  if (user !== null) {
    let index = 0
    users.forEach(function (u) {
      index++
      if (u.id === user._id) {
        rank = rank + index
      }
    })
  }

  return (
    <div className="footer">
      <ul className="footerList">
        <li>{user === null ? null : <div>Points: {user.points}</div>}</li>
        <li>{user === null ? <div>Status: offline</div> : <div>{user.username} <button onClick={handleLogout}>Logout</button></div>}
        </li>
        <li>{user === null ? null : <div>Rank: {rank}</div>}</li>
      </ul>
    </div>
  );
};

export default Footer;
