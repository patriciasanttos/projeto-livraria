import { Divider, IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';

function SearchInput({ setQuery }) {
  return (
    <Paper
      component="form"
      className='search-input-component'
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',

        marginTop: '0.4em',
        width: 'auto',
        height: '2.2em',
        backgroundColor: 'var(--input-color)',
        border: '1px solid var(--input-border)',
      }}
    >
      <InputBase
        sx={{
          ml: 1,
          flex: 1,
          color: 'var(--input-label)',
          '& .MuiInputBase-input::placeholder': {
            color: 'var(--input-label)',
            opacity: 1,
          },
        }}
        placeholder="O que você está buscando?"
        inputProps={{ 'aria-label': 'search' }}

        onChange={(e) => setQuery(e.target.value)}
      />
      <Divider sx={{ m: 0.1 }} style={{ height: "22px" }} orientation="vertical" />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default SearchInput;