import React from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

function Sort() {
    const options = [
        'one', 'two', 'three'
    ];

  return (
    <div>
        <Dropdown options={options} />
    </div>
  )
}

export default Sort