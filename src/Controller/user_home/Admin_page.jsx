import React, { useEffect ,useState} from 'react'

const Admin_page = () => {
    const [userData, setUserData] = useState([]);
    const url = "http://localhost:5000/api"

    useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await fetch(`${url}/user_enter_number_get`);
          const data = await response.json();
          if (data.status) {
            setUserData(data.msg);
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
  return (
    <>
     <div>
      <h2>User Data</h2>
      <ul>
         <button onClick={deletehandelall}>deleteAll</button>
        {userData.map((user, index) => (
        //   <li key={index}>
        //     <p>Phone Number: {user.phoneno}</p>
        //     <p>Country Code: {user.countrycode.value} - {user.countrycode.label}</p>
        //     <p>Location: Latitude: {user.location.latitude}, Longitude: {user.location.longitude}</p>
            
        //   </li>
        <li key={index}>
            ip : <p>{user.ipaddress}</p>
            <h2> {user.ipaddress && 
            (
                <a href={`https:www.ip2location.com/demo/${user.ipaddress}`}
                target='_blank'
                rel='noreferrer' >ip2location</a>
            )
            } </h2>
        </li>
        ))}
      </ul>
    </div>
    </>
  )
}

export default Admin_page