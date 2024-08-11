import React, { Fragment, useEffect, useState } from 'react';
import Axios from '../../../../config/axiosconfig';
import user from "../../Assets/images/user.png";

export default function CustomerDetails() {
    const [userData, setUserData] = useState({});

    useEffect(() => {
        Axios.get(`/users/getuser?userId=1`).then(userResponse => {
            if (userResponse.status === 200) {
                setUserData(userResponse.data.userData);
            } else {
                console.log("Some Error Occured");
            }
        }).catch(error => {
            console.log(error);
        });
    }, []);

    return Object.keys(userData).length ? (
        <div className='profile-container'>
            <div className='contact-info-container'>
                <div className='profile-image'>
                    <img src={user}/>
                    {/* <svg xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512">
                        <path
                            d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
                    </svg> */}
                </div>
            </div>
            <div className='profile-info-container'>
                <div className='profile-name'>{`${userData.name.firstname} ${userData.name.lastname}`}</div>
                <div className='profile-company-info'>
                <div className='profile-role'>{`${userData.role}`}</div>
                <a className='profile-company' href='#'>{`${userData.company}`}</a>
                </div>
            </div>
        </div>

    ) : null

}