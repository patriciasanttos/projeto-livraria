import { Divider, IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';

function SearchInput() {
  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',

        marginTop: '1%',
        width: '50dvh',
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
            opacity: 1
          },
        }}
        placeholder="O que você está buscando?"
        inputProps={{ 'aria-label': 'search' }}
      />
      {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /> */}
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default SearchInput;