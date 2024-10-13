import React from "react";
import PropTypes from "prop-types";

const StatusIcon = ({status}) => {

    let primaryColor = '#3dbf11';
    let borderColor = '#2a8f0a';

    switch (status) {
        case 'connected':
            primaryColor = '#3dbf11';
            borderColor = '#2a8f0a';
            break;
        case 'onhold':
            primaryColor = '#fbc02d';
            borderColor = '#cc891d';
            break;
        case 'disconnected':
            primaryColor = '#f44336';
            borderColor = '#d32f2f';
            break;
    }
    
    return (
        <svg width="24px" height="24px" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
            <circle cx="6" cy="6" r="5.5" fill={primaryColor} stroke={borderColor} strokeWidth="1" />
            <circle cx="8.5" cy="3.5" r="1.5" fill="rgba(255, 255, 255, 0.4)" />
        </svg>
    )
}

StatusIcon.propTypes = {
    status: PropTypes.oneOf(['connected', 'onhold', 'disconnected'])
}

export default StatusIcon;