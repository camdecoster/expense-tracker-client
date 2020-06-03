// React
import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

// Configuration
import "./AddItemLinkButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AddItemLinkButton(props) {
    return (
        <Link
            id='AddItemLinkButton'
            to={props.to}
            title={props.name}
            key={props.name}
        >
            <button className='link_button' type='button'>
                <FontAwesomeIcon className='faIcon' icon={props.icon} />
            </button>
        </Link>
    );
}
