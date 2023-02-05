import React from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import s from './Sort.module.css'

function Sort({options}) {

  return (
    <div className={s.sortbar}>
      <Dropdown
        value={options[0]}
        options={options}
        className={s.root}
        controlClassName={s.control}
        placeholderClassName={s.placeholder}
        menuClassName={s.menu}
      />
    </div>
  );
}

export default Sort