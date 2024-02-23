// import React from 'react'
import React, { useState, useMemo } from 'react';

const UserComponent2 = () => {

    const [eventTarget, setEventTarget] = useState('');
  const [eventArgument, setEventArgument] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to handle form submission
    console.log('Form submitted');
  };

  return (
    <div>
      <div id="moe-osm-pusher" style={{ display: 'block', height: '0px' }}></div>
      <form onSubmit={handleSubmit} id="form1">
        <div className="aspNetHidden">
          <input type="hidden" name="__EVENTTARGET" id="__EVENTTARGET" value={eventTarget} />
          <input type="hidden" name="__EVENTARGUMENT" id="__EVENTARGUMENT" value={eventArgument} />
          <input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="" />
        </div>

         {/* Other form elements go here */}

         <div className="aspNetHidden">
          <input type="hidden" name="__VIEWSTATEGENERATOR" id="__VIEWSTATEGENERATOR" value="B0403316" />
          <input type="hidden" name="__VIEWSTATEENCRYPTED" id="__VIEWSTATEENCRYPTED" value="" />
          <input type="hidden" name="__EVENTVALIDATION" id="__EVENTVALIDATION" value="SCvUysNWw9kHppPZB3NXnw/baRGfLHALrE1++qusWistwkxUjMMAfdtasraSuADlwMi44X3vKukYvRVZ8wIPP9AriEwTOlo6QWaPhjvIKfiJvagJh74N0MmivbgFBkEiHDP4DA==" />
        </div>
        as
      </form>
    </div>
  );
}

export default UserComponent2