import React, { useEffect, useState } from 'react';
import Order from './DataTable.js';
import Filter from '../childComponents/Filter.jsx';
import Search from '../childComponents/Search.jsx';
import Axios from '../../../../../../../config/axiosconfig';
import { getSearchType } from '../../../../../../../helpers/filterHelper';
import { FwInlineMessage } from "@freshworks/crayons/react";
import { constructTableData } from '../../../../../../../helpers/dataTableHelper';

export default function index() {
    const [orderData, setOrderData] = useState({ columns: [], rows: [], rowActions: [] });
    const [selectedData, setSelectedData] = useState([]);
    const [showReturnForm, setShowReturnForm] = useState(false);
    const [otpStatus, setOtpStatus] = useState("");
    const [otp, setOtp] = useState(false);
    const [toastMsg, setToastMsg] = useState({ show: false, error: "", msg: "", type: "" });
    const [resetFilter, setResetFilter] = useState("");

    useEffect(() => {
        try {
            handleOnLoadOrders();
        } catch (error) {

        }
    }, []);

    const handleOnClickResolve = (data) => {
        try {
            let ticketId = data.ticketId;
            ticketId = ticketId.slice(1, ticketId.length);
            let query = `ticketId=${ticketId}`;
            Axios.put(`/ticket/resolve?${query}`).then((result => {
                console.log("Ticket Resolved");
                handleOnShowToast("Ticket Resolved", "info");
                handleOnLoadOrders();
            })).catch(error => {
                console.log("Error Occured");
                handleOnShowToast("Error While Resolving the Ticket", "error");
            });
        } catch (error) {

        }
    }

    const handleOnLoadOrders = (searchData = {}, type, loadAll = false) => {
        console.log(searchData, type)
        try {
            let query = `searchtype=all&searchParams=`;
            if (!loadAll) {
                if (Object.keys(searchData).length) {
                    if (type === "filter") {
                        query = `searchtype=${getSearchType(searchData.text)}`;
                    } else if (type === "search") {
                        query = `searchtype=${getSearchType(searchData.text)}&searchParams=${searchData.searchParams}`;
                    }
                }
            } else {
                query = `searchtype=all`;
            }
            Axios.get(`/ticket/search?${query}`).then(orderResponse => {
                console.log(orderResponse.data, orderResponse.data.data.length);
                if (orderResponse.status === 200 && orderResponse.data.data.length) {
                    // handleOnShowInfo("");
                    setOrderData(constructTableData(orderResponse.data.data, handleOnClickResolve));
                } else if (orderResponse.data.data.length === 0) {
                    // handleOnShowInfo("No Records Found");
                    setOrderData(constructTableData(orderResponse.data.data, handleOnClickResolve));
                }
            }).catch(error => {
                console.log(error);
            })
        } catch (error) {
            console.log(error);
        }
    }

    const handleOnShowToast = (msg, type) => {
        try {
            setToastMsg({ show: true, error: "", msg, type });
        } catch (error) {
            console.log(error);
        }
    }

    const handleOnCloseToast = () => {
        try {
            setToastMsg({ show: false, error: "", msg: "", type: "" });
        } catch (error) {
            console.log(error);
        }
    }

    const handleOnResetFilter = (value = false) => {
        try {
            setResetFilter(value)
        } catch (error) {

        }
    }

    return (
        <React.Fragment>
            <div class="flex-item-border fw-flex-grow header-container">
                <header className='header-container'>
                    <section className='header-section'>

                        <div className='options-container'>
                            <div className='header-menu-options'>
                                <Search handleOnLoadOrders={handleOnLoadOrders} />
                                <Filter handleOnLoadOrders={handleOnLoadOrders} resetFilter={resetFilter} handleUpdateResetFilter={handleOnResetFilter} />
                            </div>
                        </div>
                    </section>
                </header>
            </div>
            <div class="fw-flex flex-container-border ticket-table-wrapper">
                <div class={`flex-item-border fw-flex-grow table-container ${!orderData.rows.length ? "table-info-container" : ""}`}>
                    {
                        orderData.rows.length ? <Order orderData={orderData} /> : <div>No Data Found</div>
                    }
                </div>
            </div>
            {/* {showReturnForm ? <RetunOrder showModal={showReturnForm} modalType={"small"} setShowReturnForm={setShowReturnForm} data={selectedData} validateOTP={handleValidateOTP} generateOTP={handleGenerateOTP} otpStatus={otpStatus} setReturnOtp={handleOnUpdateOTP} /> : null} */}
            {
                <FwInlineMessage open={toastMsg.show} duration={2000} closable type={toastMsg.type} style={{ position: "fixed", top: "10px", right: "10px", zIndex: "999" }} onFwHide={handleOnCloseToast}>{toastMsg.msg}</FwInlineMessage>
            }
        </React.Fragment>

    )

}