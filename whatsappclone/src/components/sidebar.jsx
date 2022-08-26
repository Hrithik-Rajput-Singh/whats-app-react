import React from 'react'
import "./sidebar.css";
import Avatar from "./Avatar"
import Sidebarchat from './Sidebarchat';

function sidebar(){
    return(
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar img="https://pbs.twimg.com/profile_images/625247595825246208/X3XLea04_400x400.jpg"/>    
                <div className="sidebar_headerright">
                <button class="material-icons">
                   autorenew
                </button>
                <button class="material-icons">
                   textsms
                </button>
                <button class="material-icons">
                    more_vert
                </button>

                </div>
            </div>
            <div className="sidebar_search">
                <form class="d-flex search">
                    <input class="form-control me-2 " type="search" placeholder="Search" aria-label="Search" />
                    <button class="btn btn-outline-success material-icons" type="submit">search</button>
                </form>
            </div>
            <div className="sidebar_chat">
               <Sidebarchat/>
               <Sidebarchat/>
               <Sidebarchat/>
            </div>
        </div>
    )
}

export default sidebar;