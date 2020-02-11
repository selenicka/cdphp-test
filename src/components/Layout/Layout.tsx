import React, {Fragment} from 'react';
import Header from './Header';

const Layout = (props: any) => (
    <Fragment>
        <Header />
        <main>
            {props.children}
        </main>
    </Fragment>
);

export default Layout;