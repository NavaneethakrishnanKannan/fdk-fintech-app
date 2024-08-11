import { formatDate } from "./dataTableHelper";

export const filterData = [
    {
        value: '1',
        text: 'All Tickets',
    },
    {
        value: '2',
        text: 'In Progress',
    },
    {
        value: '3',
        text: 'New',
    },
    {
        value: '4',
        text: 'Closed',
    }
];
export const sortOrderData = [
    {
        value: 'vertical-align-bottom',
        text: 'Ascending',
        graphicsProps: { name: 'vertical-align-bottom' },
    },
    {
        value: 'vertical-align-top',
        text: 'Descending',
        graphicsProps: { name: 'vertical-align-top' },
    },
];

export const getSearchType = (type) => {
    try {
        switch (type) {
            case "All Tickets":
                return "all";
            case "In Progress":
                return "in progress";
            case "New":
                return "new";
            case "Closed":
                return "closed";
            default:
                return "all";
        }
    } catch (error) {
        console.log(error);
    }
}

const DAY = {
    0: "TODAY",
    1: "MON",
    2: "TUE",
    3: "WED",
    4: "THU",
    5: "FRI",
    6: "SAT"
}

export const constructTimelineData = (ticketData = [], timelineData = []) => {
    try {
        let resultData = [];
        for (let i = 0; i < timelineData.length; i++) {
            const { ticketId, action, group, date } = timelineData[i];
            let ticketIndex = ticketData.findIndex(d => d.ticketId === ticketId);
            if (ticketIndex !== -1) {
                const { subject, status, priority, createdDate, resolvedDate } = ticketData[ticketIndex];
                let day = new Date(createdDate).getDay();
                let timelineDate = `${DAY[new Date(createdDate).getDay()]}, ${formatDate(new Date(createdDate))}`;
                if(day === 0) {
                    timelineDate = `Today`;
                }
                resultData.push({ 
                    id: ticketId,
                    type: "ticket",
                    content: subject,
                    priority: priority,
                    status: status,
                    group: group ? group : "Support Team Fepse",
                    comment: action,
                    // createdTime: createdDate,
                    resolvedTime: resolvedDate ? resolvedDate : "",
                    timelineDate: timelineDate,
                    createdTime: new Date(date).toLocaleTimeString()
                })
            }
        }
        return resultData.reverse();
    } catch (error) {
        console.log(error);
    }
}