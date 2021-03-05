import React from 'react'
import "./Header.css"
import SearchIcon from '@material-ui/icons/Search'; 
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
// import LocationOnIcon from '@material-ui/icons/Location';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from "./firebase";
function Header() {
    const [{ basket, user }, dispatch] = useStateValue();
    const handleAuthentication = () => {
        if (user) {
            auth.signOut();
        }
    }
    return (
        <div className="header">
           <Link to="/"><img className="header__logo" src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" /></Link>
            <div className="header__location">
            <LocationOnIcon />

            </div>
            <div className="header__option">
                    <span className="header__optionLineOne">Hello </span>
                    <span className="header__optionLineTwo"><strong>Select Your Address</strong></span>
                </div>
            
            <div className="header__search">
                <select className="header__select">
                    <option>All Categories</option>
                    <option>Deals</option>
                    <option>Alexa Skills</option>
                    <option>Amazon Fashion</option>
                    <option>Amazon Fresh</option>
                    <option>Amazon Pantry</option>
                    <option>Apps & Games</option>
                    <option>Appliances</option>
                    <option>Baby</option>
                    <option>Beauty</option>
                    <option>Books</option>
                    <option>Car & Motobike</option>
                    <option>Clothing</option>
                    <option>Watches</option>
                </select>
            
                <input className="header__searchInput" type="text" />
                    <SearchIcon className="header__searchIcon" />
            </div>
            <div className="header__nav">
                <Link to={!user && "/login"}>
                    <div onClick={handleAuthentication} className="header__option">
                        <span className="header__optionLineOne">Hello {!user ? 'Guest' : user.email}</span>
                        <span className="header__optionLineTwo"><strong>{user ? 'Sign Out' : 'Sign In'}</strong></span>
                    </div>
                </Link>
                <div className="header__option">
                    <span className="header__optionLineOne">Returns </span>
                    <span className="header__optionLineTwo"><strong>& Orders</strong></span>
                </div>
                <div className="header__option">
                <span className="header__optionLineOne">Your</span>
                <span className="header__optionLineTwo"><strong>Prime</strong></span>
                </div>
                <Link to="/checkout">
                <div className="header__optionBasket">
                    <ShoppingBasketIcon />
                    <span className="header__option LineTwo header__basketCount">{basket.length}</span>
                </div>
                </Link>
            </div>
        </div>
    )
}

export default Header
