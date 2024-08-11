import React, { Fragment, useEffect, useState } from 'react';
import Axios from '../../../../../config/axiosconfig';
import { constructTimelineData } from '../../../../../helpers/filterHelper';

const TIMELINE_INFO = [
    {
        id: "47770",
        type: "ticket",
        content: "Trouble Logging into my account",
        priority: "Low",
        status: "Resolved",
        group: "Support Team Fepse",
        comment: "Resolved on time",
        createdTime: "03.00PM",
        resolvedTime: "04.00PM",
        staffId: "staff1"
    },
    {
        id: "2",
        type: "ticket",
        content: "I tried to buy a Bitcoin, the transaction failed but amount debited. Please check the reason and let me know",
        priority: "High",
        status: "Resolved",
        group: "Support Team Fepse",
        comment: "In Progress",
        createdTime: "01.00PM",
        resolvedTime: "03.00PM",
        staffId: "staff2"
    },
    {
        id: "3",
        type: "feedback",
        content: "How would you rate your overall support expirence",
        status: "Average",
        createdTime: "11.00AM",
        resolvedTime: "11.05AM",
        staffId: "staff2"
    },
]

export default function Timeline(props) {
    const { selectedTab } = props;
    const [timelineData, setTimelineData] = useState([]);


    useEffect(() => {
        Axios.get("timeline/gettimeline").then(response => {
            if(response.status === 200) {
                const { data } = response.data;
                let constructedData = constructTimelineData(data.matchedTickets, data.matchedTimeline);
                setTimelineData(constructedData);
                console.log(response.data, constructedData);
            }
        }).catch(error => {
            console.log(error);
        })
    }, []);

    const getHeaderWidth = () => {
        try {
            let span = document.createElement("span");
            span.className = "header-text";
            span.innerText = selectedTab.label;
            span.style.opacity = 0;
            document.body.appendChild(span);
            let width = span.getBoundingClientRect().width;
            // console.log({ width });
            document.body.removeChild(span);
            return width;
        } catch (error) {
            console.log(error);
            return 100;
        }
    }

    return (

        <Fragment>
            {
                timelineData.map((timeline, index) => {
                    const { id, type, content, status, createdTime, resolvedTime, comment, group, priority, timelineDate } = timeline;
                    let headerWidth = getHeaderWidth();
                    return (
                        <div key={`timeline-${index}`} className='timeline-container'>
                            {
                                type === "feedbacks" ?
                                    (
                                        <Fragment>
                                            <div className='timeline-wrapper'>
                                                <div className='timeline-bar-container' style={{ width: `${100}px` }}>
                                                    <div className='timeline-bar' />
                                                </div>
                                            </div>
                                        </Fragment>
                                    ) :
                                    (
                                        <div className='timeline-wrapper'>
                                            <div className='timeline-bar-container' style={{ width: `${100}px` }}>
                                                <div className='timeline-day-container'>
                                                    <span>{timelineDate}</span>
                                                </div>
                                                <div className='timeline-bar-top' />
                                                {
                                                    type === "feedback" ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" width={22} height={22}>
                                                            <path
                                                                d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm80 168c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zm-160 0c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zm194.8 170.2C334.3 380.4 292.5 400 248 400s-86.3-19.6-114.8-53.8c-13.6-16.3 11-36.7 24.6-20.5 22.4 26.9 55.2 42.2 90.2 42.2s67.8-15.4 90.2-42.2c13.4-16.2 38.1 4.2 24.6 20.5z" />
                                                        </svg>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width={22} height={22}>
                                                            <path
                                                                d="M64 64C28.7 64 0 92.7 0 128l0 64c0 8.8 7.4 15.7 15.7 18.6C34.5 217.1 48 235 48 256s-13.5 38.9-32.3 45.4C7.4 304.3 0 311.2 0 320l0 64c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-64c0-8.8-7.4-15.7-15.7-18.6C541.5 294.9 528 277 528 256s13.5-38.9 32.3-45.4c8.3-2.9 15.7-9.8 15.7-18.6l0-64c0-35.3-28.7-64-64-64L64 64zm64 112l0 160c0 8.8 7.2 16 16 16l288 0c8.8 0 16-7.2 16-16l0-160c0-8.8-7.2-16-16-16l-288 0c-8.8 0-16 7.2-16 16zM96 160c0-17.7 14.3-32 32-32l320 0c17.7 0 32 14.3 32 32l0 192c0 17.7-14.3 32-32 32l-320 0c-17.7 0-32-14.3-32-32l0-192z" />
                                                        </svg>
                                                    )
                                                }
                                                <div className='timeline-bar-bottom' />
                                            </div>
                                            <div className='timeline-info-container'>
                                                <span className='time-text'>{createdTime}</span>
                                                <span className='timeline-content'>{content}</span>
                                                <div className='ticket-status-info'>
                                                    <div className='ticket-info'>
                                                        {
                                                            type === "feedback" ?
                                                                (
                                                                    <span>{`${status}`}</span>
                                                                ) : (
                                                                    <Fragment>
                                                                        <span>{`Priority: ${priority}`}</span>
                                                                        <div className='circle' />
                                                                        <span>{`Status: ${status}`}</span>
                                                                        <div className='circle' />
                                                                        <span>{`Group: ${group}`}</span>
                                                                    </Fragment>
                                                                )
                                                        }
                                                    </div>
                                                    <div className='ticket-status'>
                                                        <span>{comment}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                            }

                        </div>
                    )
                })
            }
        </Fragment>

    )

}

/**
 *     {
        id: "1",
        type: "query",
        header: "Payment Related",
        description: "I tried to buy a Bitcoin, the transaction failed but amount debited. Please check the reason and let me know",
        userId: "user1"
    },
    {
        id: "2",
        type: "reply",
        header: "Payment Related",
        content: "Hi, Sorry for your inconvenience. Give me a minute, Checking your Details",
        staffId: "staff1"
    },
    {
        id: "2",
        type: "query",
        header: "Payment Related",
        content: "sure",
        staffId: "staff1"
    }
 */

