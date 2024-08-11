import React, { Fragment } from 'react';
import Timeline from './Timeline.jsx';
import Ticket from './Ticket/index.jsx';

const CUSTOM_OVERFLOW_STYLE = ["tickets"];

export default function TicketSection(props) {
    const { selectedTab } = props;
    console.log(selectedTab)
    return (
        <div className='timeline-section' style={{ overflow: CUSTOM_OVERFLOW_STYLE.includes(selectedTab.id) ? "unset" : "scroll" }}>
            {
                selectedTab.id === "timeline" ? <Timeline {...props} /> :
                    selectedTab.id === "tickets" ? <Ticket {...props} /> : null
            }
        </div>
    )
}