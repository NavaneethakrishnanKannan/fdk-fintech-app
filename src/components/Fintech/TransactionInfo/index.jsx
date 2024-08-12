import React, { Fragment, useEffect, useState } from 'react';
import { formatDate } from '../../../helpers/dataTableHelper';
import { TRANSACTION_STATUS_DATA } from '../../../helpers/filterHelper';
import Axios from '../../../config/axiosconfig';

const transactionData1 = [
    {
        "id": "wth",
        "action": "withdrawal",
        "status": "pending",
        "date": "2024-08-11T15:35:00.000",
        "amount": 4000,
        "userId": 1
    },
    {
        "id": "btc",
        "action": "BTC sell",
        "status": "completed",
        "date": "2024-08-09T09:35:00.000",
        "amount": 5000,
        "userId": 1
    },
    {
        "id": "eth",
        "action": "ETH Sell",
        "status": "completed",
        "date": "2024-08-07T01:35:00.000",
        "amount": 2000,
        "userId": 1
    },
    {
        "id": "dst",
        "action": "bank deposit",
        "status": "completed",
        "date": "2024-08-05T16:35:00.000",
        "amount": 1200,
        "userId": 1
    },
    {
        "id": "btc",
        "action": "bank transfer",
        "status": "failed",
        "date": "2024-08-02T19:35:00.000",
        "amount": 2000,
        "userId": 1
    },
    {
        "id": "btc",
        "action": "BTC Buy",
        "status": "completed",
        "date": "2024-08-10T16:35:00.000",
        "amount": 5000,
        "userId": 1
    },
    {
        "id": "dst",
        "action": "bank deposit",
        "status": "completed",
        "date": "2024-08-11T11:35:00.000",
        "amount": 1200,
        "userId": 1
    },
    {
        "id": "dst",
        "action": "bank deposit",
        "status": "completed",
        "date": "2024-08-11T17:35:00.000",
        "amount": 2200,
        "userId": 1
    }
]

export default function TransactionInfo() {

    const [showAcc, setShowAcc] = useState(true);
    const [transactionData, setTransactionData] = useState([]);

    useEffect(() => {
        Axios.get("transaction/gettransaction?userId=1").then(response => {
            if (response.status === 200) {
                const { data } = response.data;
                setTransactionData(data);
            } else {

            }
        }).catch(error => {
            console.log(error);
        })
    },[])

    const handleOnShowAccordion = () => {
        try {
            setShowAcc(!showAcc);
        } catch (error) {

        }
    }

    return (
        <Fragment>
            <div className={`accordion`}>
                <div className='accordion-header'>
                    <div className='accordian-icon-container'>
                        <svg xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512" width={16} height={16}>
                            <path
                                d="M504 255.5c.3 136.6-111.2 248.4-247.8 248.5-59 0-113.2-20.5-155.8-54.9-11.1-8.9-11.9-25.5-1.8-35.6l11.3-11.3c8.6-8.6 22.4-9.6 31.9-2C173.1 425.1 212.8 440 256 440c101.7 0 184-82.3 184-184 0-101.7-82.3-184-184-184-48.8 0-93.1 19-126.1 49.9l50.8 50.8c10.1 10.1 2.9 27.3-11.3 27.3H24c-8.8 0-16-7.2-16-16V38.6c0-14.3 17.2-21.4 27.3-11.3l49.4 49.4C129.2 34.1 189.6 8 256 8c136.8 0 247.7 110.8 248 247.5zm-180.9 78.8l9.8-12.6c8.1-10.5 6.3-25.5-4.2-33.7L288 256.3V152c0-13.3-10.7-24-24-24h-16c-13.3 0-24 10.7-24 24v135.7l65.4 50.9c10.5 8.1 25.5 6.3 33.7-4.2z" />
                        </svg>
                    </div>
                    <div className='accordian-header-container'>
                        <span>Transaction History</span>
                    </div>
                    <div className='accordian-icon-container accordian-arrow'>
                        {/* <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: `rotate(${showAcc ? '0deg' : '180deg'})`, transformOrigin: "center" }}>
                            <g id="chevron-down-solid 1">
                                <path id="Vector"
                                    d="M8.20542 4.20546C8.64487 3.766 9.35855 3.766 9.798 4.20546L16.548 10.9555C16.9875 11.3949 16.9875 12.1086 16.548 12.548C16.1085 12.9875 15.3949 12.9875 14.9554 12.548L8.99995 6.59257L3.04448 12.5445C2.60503 12.984 1.89136 12.984 1.4519 12.5445C1.01245 12.1051 1.01245 11.3914 1.4519 10.9519L8.2019 4.20194L8.20542 4.20546Z"
                                    fill="#2C5DC6" />
                            </g>
                        </svg> */}
                    </div>
                </div>
            </div>
            <div className='accordion-content'>
                {
                    transactionData.map((data, index) => {
                        return (
                            <div key={`acc-${index}`} className='transaction-container'>
                                <div className='transaction-info-body'>
                                    <div className='trans-icon-container'>
                                        <div className='trans-icon'>
                                            <img src={TRANSACTION_STATUS_DATA[data.status]["icon"]} alt='trans-status-icon' />
                                        </div>
                                    </div>
                                    <div className='trans-action-container'>
                                        <span className='trans-action-label'>{data.action}</span>
                                        <span className='trans-status-label' style={{ "--color": TRANSACTION_STATUS_DATA[data.status]["color"] }}>{data.status}</span>
                                    </div>
                                    <div className='trans-amount-container'>
                                        <span className='trans-date-label'>
                                            {`${formatDate(new Date(data.date), true)}, ${new Date(data.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}</span>
                                        <div className='trans-amount-label'>
                                            {/* <svg xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 320 512" width={18} height={18}>
                                                <path
                                                    d="M308 96c6.6 0 12-5.4 12-12V44c0-6.6-5.4-12-12-12H12C5.4 32 0 37.4 0 44v44.7c0 6.6 5.4 12 12 12h85.3c27.3 0 48.3 10 61 27.3H12c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h158.8c-6.2 36.1-33 58.6-74.8 58.6H12c-6.6 0-12 5.4-12 12v53c0 3.3 1.4 6.5 3.9 8.8l165.1 152.4a12 12 0 0 0 8.1 3.2h82.6c10.9 0 16.2-13.4 8.1-20.8L116.9 319.9c76.5-2.3 131.1-53.4 138.3-127.9H308c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-58.7c-3.5-11.5-8.3-22.2-14.3-32H308z" />
                                            </svg> */}
                                            <span>{`₹${(parseFloat(data.amount)).toLocaleString()}`}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </Fragment>

    )

}