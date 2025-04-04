import React from 'react';
import './HeaderAdmin.scss';

function HeaderAdmin({ page }) {
    return (
        <div className="admin-header">
            <h2>{page}</h2>
        </div>
    );
}

export default HeaderAdmin;