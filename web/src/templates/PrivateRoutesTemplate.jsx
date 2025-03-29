import React from 'react';
import { Outlet } from 'react-router-dom';

function PrivateRoutesTemplate() {
  return (
    <>
      <main><Outlet /></main>
    </>
  );
}

export default PrivateRoutesTemplate;