import React from 'react';
import {Link} from 'react-router';

class Navigation extends React.Component {
  render() {
    let navigationItems = [
      {
        name: "Home",
        path: "/"
      },
      {
        name: "Nowhere",
        path: "/nowhere"
      }
    ];

    return (
      <navigation>
        <ul role="navigation">
          {navigationItems.map((item, key) => (
            <li key={key}><Link to={item.path}>{item.name}</Link></li>
          ))}
        </ul>
      </navigation>
    )
  }
}

export default Navigation;
