import React from 'react';

function Popup(props: any) {
    return (
        <div className='modal-open'>
            <div className='modal fade show' role="dialog">
                <div className='modal-dialog' role="document">
                    <div className='modal-content'>
                        <div className="modal-body">
                            {props.children}
                            <div className="closeModal" onClick={props.toggleModal}>
                                <span>×</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-backdrop fade show" onClick={props.toggleModal} />
            </div>
        </div>
    );
}

export default Popup;
