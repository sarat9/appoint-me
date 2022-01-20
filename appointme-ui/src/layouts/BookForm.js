import * as React from 'react';
import TextField from '@mui/material/TextField';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import axios from 'axios'

function BookForm() {


    const [payload, setPayload] = React.useState({})

    const handleChange= (event)=>{
        
        event.preventDefault()

        console.log(process.env.REACT_APP_HI)
        console.log(process.env.REACT_APP_API_HOST)
        console.log(process.env.REACT_APP_API_PORT)
        let name = event.target.name
        let value = event.target.value

        if(name=='image'){
            console.log(event.target.files[0]);
            let file = event.target.files[0]
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => { 
                console.log(reader.result)
                setPayload({...payload, [name]:reader.result})
            }
            reader.onerror = (error) => { console.log('error', error)}
        } else {
            setPayload({...payload, [name]:value})
        }
        console.log(payload)
    }

    const handleSubmit = (event)=>{
        event.preventDefault()
        axios.post(process.env.REACT_APP_API_HOST+':'+process.env.REACT_APP_API_PORT+'/api/appointment', {...payload})
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

  return (
    <div className="Book-form" style={{width:'50%'}}>
        
      <div className="detailed-form" 
       style={{background:'white', color: 'black', padding: '10%', width:'100%'}} >

        
        <FormControl fullWidth>
            <TextField id="outlined-basic" name="name" fullWidth label="Name" variant="outlined" onChange={handleChange}/>
            <FormHelperText id="my-helper-text">Fill in your sweet name.</FormHelperText>
        </FormControl>
        <br/>
        <FormControl fullWidth>
            <TextField id="outlined-basic" fullWidth name="email" label="Email" variant="outlined" onChange={handleChange}/>
            <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
        </FormControl>
        <br/>
        <FormControl fullWidth>
            <TextField id="outlined-basic" fullWidth name="mobile" label="Mobile" variant="outlined" onChange={handleChange}/>
            <FormHelperText id="my-helper-text">We are just a call away!.</FormHelperText>
        </FormControl>
        <br/>
        <FormControl fullWidth>
            <TextField id="outlined-basic" fullWidth name="message" label="Message" variant="outlined" onChange={handleChange}/>
            <FormHelperText id="my-helper-text">How can I help you ?.</FormHelperText>
        </FormControl>
        <br/>
        <br/>
        <FormControl fullWidth>
            <p style={{fontSize:'16px'}}>Make a payment and upload a screenshot of the transaction!</p>
            <TextField type="file" name="image" onChange={handleChange} />
        </FormControl>
    
        <br/><br/>
        <Button fullWidth variant="contained" onClick={handleSubmit}>Submit</Button>


      </div>
    </div>
  );
}

export default BookForm;
