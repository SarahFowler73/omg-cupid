import React from 'react'

function PopUpComponent(props) {
    return (
        <span className='popuptext' style={{ display: props.display }}>
            { props.warning }
        </span>
    )
}

export function FormGroup(props) {
    return (
        <div className='form-group'>
            <label htmlFor={ props.name }>{ props.label }</label>
            <div className='popup'>
                { props.children }
                <PopUpComponent
                    display={ props.existsInArray(props.name, 'warnings') ? 'block' : 'none' }
                    warning={ props.warning }
                />
            </div>
        </div>
    )
}
