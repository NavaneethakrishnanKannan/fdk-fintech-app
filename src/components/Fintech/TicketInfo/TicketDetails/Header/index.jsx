import React, { Fragment, useState } from 'react';
import TicketSection from '../TicketSection/index.jsx';

const HEADER_OPTIONS = [
    { "label": "TIMELINE", id: "timeline" },
    { "label": "TICKETS", id: "tickets" },
    { "label": "NOTES", id: "notes", isDisabled: true },
    { "label": "FORUMS", id: "forums", isDisabled: true },
]

export default function Header() {

    const [selectedTab, setSelectedTab] = useState(HEADER_OPTIONS[0]);

    const handleOnSelectHeader = (header) => () => {
        try {
            if(header.isDisabled) {
                return;
            }
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
                        let diabledClass = header.isDisabled ? "disabled" : "";
                        return (
                            <Fragment key={`fr-header-${index}`}>
                                <div key={`ticker-header-${index}`} id={header.id} className={`header-text ${diabledClass}`} onClick={handleOnSelectHeader(header)}>
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