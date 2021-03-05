import React from 'react';
import { Link } from 'react-router-dom';
import "./BottomPage.css";
function BottomPage() {
    return (
        <div className="bottompage">
            <Link to="/">
            <button onclick="/" id="myBtn" title="Go to top" className="bottompage__button">Back to Top</button>
            </Link>
        </div>
    )
}

export default BottomPage
