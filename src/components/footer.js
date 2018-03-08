import React from "react";

// const footerTable = {
//   width: window.innerWidth
// }

const Footer = ({ user, users }) => {
  let rank = null
  if (users !== undefined && user !== null) {
    const self = users.find(u => u.id === user.id)
    rank = users.indexOf(self) + 1
  }

  return (
    <div className="footer">
      <ul className="footerList">
        <li>{user === null ? null : <div>Points: {user.points}</div>}</li>
        <li>{user === null ? <div><a href="https://tmc.mooc.fi">TMC</a></div> : <div>{user.username}</div>}
        </li>
        <li>{user === null ? null : <div>Rank: {rank}</div>}</li>
      </ul>
    </div>
  );
};

export default Footer;
