import React from 'react';

function SearchResult(props: any) {
    return (
        <table className='formErrors'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {props.searchResult.map((item: any, i: number) =>
                    <tr key={i}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default SearchResult;
