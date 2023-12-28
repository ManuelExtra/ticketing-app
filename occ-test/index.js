const axios = require("axios")
 
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const cookie = 'session=eyJqd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJalkxT0RKa09Ea3dabVEyWlRSaU5qWmhPVEkwWldOak9DSXNJbVZ0WVdsc0lqb2lhbTlvYmtCbmJXRnBiQzVqYjIwaUxDSnBZWFFpT2pFM01ETXdOek01TXpaOS5UaFgyZ2MwR1p1dXhGZV8wdE5FMHdhUFZEUDVkYVNpY1U1T0xRMS1WaXJzIn0=';

const doRequest = async () => {
    // Create ticket of price 5
    const {data} = await axios.post('https://ticketing.dev/api/tickets', {
        "title": "Ticket",
        "price": 5
    }, {
        headers: {cookie}
    }).catch(err => console.error(err))

    // Update ticket to price 10
    await axios.put(`https://ticketing.dev/api/tickets/${data.id}`, {
        "title": "Ticket",
        "price": 10
    }, {
        headers: {cookie}
    }).catch(err => console.error(err))

    // Update ticket to price 15
    await axios.put(`https://ticketing.dev/api/tickets/${data.id}`, {
        "title": "Ticket",
        "price": 15
    }, {
        headers: {cookie}
    }).catch(err => console.error(err))

    console.log('Request complete')
}

(async () => {
    for (let i = 0; i < 400; i++) {
        doRequest();   
    }
})()