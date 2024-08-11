import React, { Fragment, useState } from 'react';
import TicketSection from '../TicketSection/index.jsx';

const HEADER_OPTIONS = [
    { "label": "TIMELINE", id: "timeline" },
    { "label": "TICKETS", id: "tickets" },
    { "label": "NOTES", id: "notes" },
    { "label": "FORUMS", id: "forums" },
]

export default function Header() {

    const [selectedTab, setSelectedTab] = useState(HEADER_OPTIONS[0]);

    const handleOnSelectHeader = (header) => () => {
        try {
            setSelectedTab(header);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Fragment>

            <div className='ticket-header'>
                {
                    HEADER_OPTIONS.map((header, index) => {
                        let isSelected = selectedTab.id === header.id;
                        return (
                            <Fragment>
                                <div key={`ticker-header-${index}`} id={header.id} className='header-text' onClick={handleOnSelectHeader(header)}>
                                    <span className={`${isSelected ? "header-selected" : ""}`}>{header.label}</span>
                                    <span className={`${isSelected ? "header-selected-bar" : ""}`}></span>
                                </div>
                            </Fragment>
                        )
                    })
                }
            </div>
            {
                <TicketSection selectedTab = {selectedTab} /> 
            }
            
        </Fragment>

    )

}