
const getAirline = (flight) => {
    let airline = ''
    const spanEl = flight.querySelector('div[class^="LogoImage_container"] span') !== null
    const imgEl = flight.querySelector('div[class^="LogoImage_container"] img') !== null 

    if (spanEl) {
        airline = flight.querySelector('div[class^="LogoImage_container"] span').textContent
    }
    else if (imgEl) {
        airline = flight.querySelector('img[alt]').alt
    }

    return airline
}

const getPrice = (flight) => {
    return flight.querySelector('div[class^="Price_mainPriceContainer"] span').textContent
}

const getRoute = () => {
    return document.querySelector('[class^="SearchDetails_places"]').textContent.split('-')
}

const getCabinType = () => {
    return document.querySelector('[class^="SearchDetails_info"] span:nth-child(2)').textContent
}

const getOutboundDate = () => {
   return document.querySelector('[name^="outbound_date_input"]').value
}

const getInboundDate = () => {
    return document.querySelector('[name^="inbound_date_input"]').value
 }

 const getDepartureTime = (flight) => {
     return flight.querySelector('div[class^="LegInfo_routePartialDepart"] span').textContent
 }

 const getArrivalTime = (flight) => {
     return flight.querySelector('div[class^="LegInfo_routePartialArrive"] span').textContent
 }

 const getFlightList = () => {
     return  document.querySelectorAll('div[role="button"][class^="BpkTicket_bpk-ticket"]')
 }

 const getFlightDetails = (flight) => {
     return flight.querySelectorAll('div[class^=LegDetails_container]')
 }

const skyScannerDetails = () => {
   const [origin, destination] = getRoute()
   const outboundDate =  getOutboundDate()
   const inbondDate =  getInboundDate()
   const cabinType = getCabinType()
   const details = []
   getFlightList().forEach((flight) => {
       const [outboundFlightDetails, inboundFlightDetails ] = getFlightDetails(flight)
       price = getPrice(flight)
       details.push({
        price,
        outboundFlight: {
            departure: getDepartureTime(outboundFlightDetails),
            arrival: getArrivalTime(outboundFlightDetails),
            airline: getAirline(outboundFlightDetails)
        },
        inboundFlight: {
            departure: getDepartureTime(inboundFlightDetails),
            arrival: getArrivalTime(inboundFlightDetails),
            airline: getAirline(inboundFlightDetails)
        }
    })
 } )

   return [origin, destination, outboundDate, inbondDate, cabinType, details]
}
const sendDetailsToApi = async (data) => {
    console.log("Sending details to api", data)
   const response =  await fetch('https://api.capturedata.com', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    return await rawResponse.json();
}

sendDetailsToApi(skyScannerDetails())
