import React from 'react';

function Popup(props: any) {
    return (
        <div className='modal-open'>
            <div className='modal fade show' role="dialog">
                <div className='modal-dialog' role="document">
                    <div className='modal-content'>
                        <div className="modal-body">
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"></div>
        </div>
    );
}

export default Popup;
