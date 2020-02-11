import React from 'react';

const navigation = (props: any) => (
    <ul className="nav">
        {/*{props.pages.map((page: any, index: number) =>*/}
            {/*<li*/}
                {/*key={index}*/}
                {/*data-ref={page.ref}*/}
                {/*className={'nav-item' + (this.state.pagesState[index] ? ' active' : '')}*/}
                {/*onClick={(e: any) => this.handleClick(e, index)}*/}
            {/*>*/}
                {/*<a className="nav-link" href="#">*/}
                    {/*{page.name}*/}
                {/*</a>*/}
            {/*</li>*/}
        {/*)}*/}
        <li>
            <a href="/" className=' nav-item active'>Factions</a>
        </li>
        <li>
            <a href="/" className="nav-item">Search</a>
        </li>
    </ul>
);

export default navigation;