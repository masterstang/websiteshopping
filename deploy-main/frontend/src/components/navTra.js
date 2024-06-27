import React from "react";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';



export default function BasicSelect() {
  const { t, i18n } = useTranslation();
  const [age, setAge] = React.useState('EN');

  const handleChange = (event) => {
    setAge(event.target.value);
    window.localStorage.setItem('lang', event.target.value);
  };
  useEffect(() => {
    let lang = window.localStorage.getItem('lang')
    if (lang) {
      i18n.changeLanguage(lang.toLowerCase())
      setAge(lang)
    }
  }, [])

  return (
  
      <FormControl sx={{ bgcolor:'whitesmoke' ,borderRadius:'2rem' }}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          onChange={handleChange}
          >
          <MenuItem
            value='TH'
            onClick={() => i18n.changeLanguage('th')}>
            ไทย
          </MenuItem>

          <MenuItem
            value='EN'
            onClick={() => i18n.changeLanguage('en')}>
            ENG
          </MenuItem>
        </Select>

      </FormControl>
  
  )
}