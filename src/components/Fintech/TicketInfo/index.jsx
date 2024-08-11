import React from 'react';
import CustomerDetails from './CustomerDetails/index.jsx';
import TicketDetails from './TicketDetails/index.jsx';

export default function TicketInfo() {

    return (

        <div className='left-container'>
            <div className='customer-info-section'>
                <CustomerDetails />
            </div>
            <div className='ticket-info-section'>
                <TicketDetails />
            </div>
        </div>

    )

}