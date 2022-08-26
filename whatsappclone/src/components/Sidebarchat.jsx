import React from 'react';
import Avatar from './Avatar';

function Sidebarchat(props) {
    return (
        <div className="sidebarchat">
          <Avatar />
          <div className="sidebar_info">
              <h2>Room name</h2>
              <p>these is last massage</p>
          </div>
            
        </div>
    )
}

export default Sidebarchat
