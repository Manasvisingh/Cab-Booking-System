import React, { useState } from 'react';
import { MDBInput } from 'mdb-react-ui-kit';

export default function App() {
  const [value, setValue] = useState('');

  return (
    <div>
    <MDBInput
      value={value}
      onChange={(e) => setValue(e.target.value)}
      label='Type Email'
      id='123'
      type='Email'
    />
    <MDBInput
      value={value}
      onChange={(e) => setValue(e.target.value)}
      label='Type Email'
      id='123'
      type='Email'
    />
    </div>
    
  );
}