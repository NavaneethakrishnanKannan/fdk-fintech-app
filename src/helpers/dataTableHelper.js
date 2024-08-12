// const COLUMNS = [
//     { "key": "orderNo", "text": "Order No" },
//     { "key": "userName", "text": "Customer Name" },
//     { "key": "productId", "text": "Product Id" },
//     { "key": "title", "text": "Product Name" },
//     { "key": "orderDate", "text": "Order Date" },
//     { "key": "deliveryDate", "text": "Delivery Date" },
//     { "key": "orderStatus", "text": "Order Status" },
//     { "key": "returnEligible", "text": "Return Eligible" }
// ]

// { "key": "email", "text": "Email" },
const COLUMNS = [
    { "key": "ticketId", "text": "Ticket Id" },
    { "key": "userName", "text": "Name" },
    { "key": "email", "text": "Email" },
    { "key": "subject", "text": "Subject", "widthProperties": { "width": "300px" } },
    { "key": "category", "text": "Category" },
    { "key": "status", "text": "Status" },
    { "key": "priority", "text": "Priority" },
    { "key": "createdDate", "text": "Created On" },
    { "key": "resolvedDate", "text": "Resolved On" }
]
export const constructTableData = (data, cb) => {
    try {
        let tableData = {
            columns: COLUMNS,
            rows: [],
            rowActions: []
        };
        let hideButtonIds = [];
        data.reverse();
        let buttonName = "";
        data.map((value, index) => {
            let { user, ticketId, subject, category, status, priority, createdDate, resolvedDate } = value;
            if (status === "closed") {
                hideButtonIds.push(index);
            }
            tableData.rows.push(
                {
                    id: index, ticketId, userName: user.username, email: user.email, subject, category, status, priority,
                    createdDate: formatDate(new Date(createdDate)), resolvedDate: resolvedDate ? formatDate(new Date(resolvedDate)) : ""
                }
            )
        });
        tableData.rowActions.push({
            "name": "Resolve",
            "handler": (rowData) => cb(rowData),
            "disabled": "true",
            "hideForRowIds": hideButtonIds
        })
        console.log(tableData);
        return tableData;
    } catch (error) {
        console.log(error);
    }
}

export const formatDate = (date, isShort = false) => {
    try {
        let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
        let month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
        let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
        if(isShort) {
            year = year.substring(year.length -2, year.length);
        }
        return `${day} ${month} ${year}`;
    } catch (error) {
        console.log(error);
    }
}
const createElement = () => () => ('div', { className: 'greeting' }, [createElement('h2', "text")]);