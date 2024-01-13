import { Link } from 'react-router-dom';
import React from 'react';

const NotFound = () => {
    return (
        <>
            <h1>Erreur</h1>
            <Link to={'/'}>Retour</Link>
        </>
    );
};

export default NotFound;