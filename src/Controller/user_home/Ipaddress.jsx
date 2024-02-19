import React, { useState,useEffect} from 'react'
// import { castObject } from '../../../../backend/db/Schema'

const Ipaddress = () => {
    const [ipaddress,setipaddress] = useState()
      

    const fetchip=async()=>{
       try{
        const res = await fetch('https://api.ipify.org')
        const data = await res.text()
        setipaddress(data)
       }
       catch(err){
        console.log(err);
       }
    
    }
    // const url = process.env.REACT_APP_BASE_URL
    // const url = "http://localhost:5000/api"
    const url = "https://tech-mahindra.onrender.com/api"
    const handleSubmit = async () => {
      try {
        const response = await fetch(`${url}/user_enter_number`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
            //   phoneno: phoneNumber,
            //   countrycode: value,
            //   location: location,
              ipaddress : ipaddress
            })
          });
         const result = await response.json()
           if(result.status){
            console.log("got it");
           }
        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        fetchip()
        console.log(ipaddress);
        handleSubmit()
    }) 

    console.log(ipaddress);
  return (
    <>
         {/* <div className="container">
            ip <hr />
            <h2> {ipaddress && 
            (
                <a href={`https:www.ip2location.com/demo/${ipaddress}`}
                target='_blank'
                rel='noreferrer' >ip2location</a>
            )
            } </h2>
         </div> */}
    </>
  )
}

export default Ipaddress