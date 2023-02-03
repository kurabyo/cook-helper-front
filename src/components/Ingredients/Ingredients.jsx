import React, { useEffect, useState } from 'react'
import './Ingredients.css'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import axios from 'axios';

function Ingredients() {
    const [data, setData] = useState();

    const options = [
        '1', '2', '3'
    ]

    useEffect(() => {
        const fetchData = async () => {
          const result = await axios(
            'https://63dbfdc1a3ac95cec5af619c.mockapi.io/cook/ingredients',
          );
          setData(result.data)
        };
        fetchData();
      }, []);

  return (
    <div className='container'>
        <Dropdown className='sortbar' options={options}/>
        <div className='ingredients'>
            {data?.map(e => <li key={e.id}>{e.name}</li>)}
        </div>
        <div className='amount'>
            <div className='colums'>
                <div>
                    {data?.map(e => <li key={e.id}>{e.amount}</li>)}
                </div>
                <div>
                    {data?.map(e => <li key={e.id}>{e.measurment}</li>)}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Ingredients