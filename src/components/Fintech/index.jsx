import React from 'react';
import "./Assets/style.css";
import TicketInfo from './TicketInfo/index.jsx';
import TransactionInfo from './TransactionInfo/index.jsx';

export default function Fintech (){

    return(

        <div className='app-container'>
            <div className='ticket-info-contaier'>
                <TicketInfo />
            </div>
            <div className='transaction-info-container'>
                <TransactionInfo />
            </div>
        </div>

    )

}