import * as React from 'react';
import {useEffect} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import axios from 'axios'
import PageLoading from '../components/Loading/PageLoading';

function BookedRequests() {


  const [bookings, setBookings] = React.useState([])
  const [expanded, setExpanded] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentTab, setCurrentTab] = React.useState('default');
  const nextTab = {
    'default' : 'fulfilled',
    'fulfilled': 'scheduled',
    'scheduled': 'done'
  }
    const handleChangeTab = (event, newValue) => {
      event.preventDefault()
      setCurrentTab(newValue); 
    };

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

    const constructPayload = React.useCallback((currentTab) => {
      let payload = {}
      if(currentTab=='default'){
        payload = { fulfilled:false, scheduled: false, done: false }
      }
      else if(currentTab=='fulfilled'){
        payload = { fulfilled:true, scheduled: false, done: false }
      }
      else if(currentTab=='scheduled'){
        payload = { fulfilled:true, scheduled: true, done: false }
      }
      else if(currentTab=='done'){
        payload = { fulfilled:true, scheduled: false, done: true }
      }
      return payload
    }, [currentTab]);

    const getBookingsData = (payload)=>{
      return axios.post(process.env.REACT_APP_API_HOST+':'+process.env.REACT_APP_API_PORT+'/api/appointment/data', payload)
        .then(function (response) {
          console.log(response);
          return response
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    const updateBooking = (id)=>{
      let payload = constructPayload(nextTab[currentTab])
      setIsLoading(true)
      return axios.put(process.env.REACT_APP_API_HOST+':'+process.env.REACT_APP_API_PORT+'/api/appointment/update/'+id, payload)
        .then(function (response) {
          console.log(response);
          setBookings([...(bookings.filter(booking=>booking._id!=id))])
          setExpanded(false)
          setIsLoading(false)
          return response
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  

    useEffect(()=>{
      let payload = constructPayload(currentTab)
      setIsLoading(true)
      getBookingsData(payload).then(response=>{
        if(response&&response.data){
          setBookings([...response.data])
          setIsLoading(false)
          setExpanded(false)
        }
      })
    }, [currentTab])

    

  return (
    <div className="booked-requests" style={{width:'80%'}}>
      <TabContext value={currentTab}>
        <Box sx={{ fontSize:'32px', background:'white', borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
            <Tab label="New Bookings" value="default" />
            <Tab label="Verified" value="fulfilled" />
            <Tab label="Scheduled" value="scheduled" />
            <Tab label="Done" value="done" />
          </TabList>
        </Box>
      </TabContext>
      <div className="detailed-form" 
       style={{background:'white', color: 'black', padding: '10%'}} >

         {bookings.map(booking=>{
           return  <Accordion expanded={expanded === booking._id} onChange={handleChange(booking._id)}>
           <AccordionSummary
             expandIcon={<ExpandMoreIcon />}
             aria-controls="panel1bh-content"
             id="panel1bh-header"
           >
             <Typography sx={{ width: '33%', flexShrink: 0 }}>
               {booking.name}
             </Typography>
             <Typography sx={{ color: 'text.secondary' }}>{booking.email}</Typography>
           </AccordionSummary>
           <AccordionDetails>
             <Typography style={{textAlign:'left'}}>
              <p><b>Message : </b>{booking.message}</p>
              <p><b>Name : </b>{booking.name}</p>
              <p><b>Mobile : </b>{booking.mobile}</p>
              <p><b>Email : </b>{booking.email}</p>
             </Typography>

             {booking.image&&<div>
             <img
                src={booking.image}
                alt={'payment'}
                width="500px"
                heigth="600px"
              />
             </div>}
            {(currentTab&&currentTab!='done')&&<>
              <Button fullWidth variant="contained" onClick={()=>updateBooking(booking._id)}>
                {currentTab=='default'?'Verify Payment':currentTab=='fulfilled'?'Scheduled Meeting':'Done'}
              </Button>
            </>}
           </AccordionDetails>
         </Accordion>
         })}
        

    
        <br/><br/>
        

        {isLoading&&<PageLoading />}
      </div>
    </div>
  );
}

export default BookedRequests;
