import React from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import s from './Sort.module.css'

function Sort(param) {

  return (
    <div className={s.sortbar}>
      <Dropdown
        onChange={(e) => {
          param.set(e.value);
        }}
        value={param.options[0]}
        options={param.options}
        className={s.root}
        controlClassName={s.control}
        placeholderClassName={s.placeholder}
        menuClassName={s.menu}
      />
    </div>
  );
}

export default Sort