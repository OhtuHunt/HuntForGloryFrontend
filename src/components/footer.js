import React from 'react'

const footerTable = {
  width: window.innerWidth,
}

const Footer = () => {
  return (
      <table style={footerTable}>
        <tbody>
          <tr>
            <td>
                Pisteet: 0
            </td>
            <td>
                Rank: 1
            </td>
            <td>
                Status: active
            </td>
          </tr>
        </tbody>
      </table>
  )
}

export default Footer
