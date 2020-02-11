import React, {Fragment} from 'react';
import universeLogo from '../../assets/images/logo-universe.jpg'

const logo = (props: any) => (
    <div className="logo">
        <img src={universeLogo} alt="logo" />
    </div>
);

export default logo;