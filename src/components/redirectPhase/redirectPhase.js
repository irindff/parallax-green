import React from 'react';
// ----------------- Style --------------------------
import './index.scss'

import RedirectLoader from '../RedirectLoader/RedirectLoader';

export default class RedirectPhase extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="redirectPhase">
                <div className='redirectPhase-content'>
                    <div className='header' dangerouslySetInnerHTML={{__html: this.props.content.redirectPhase_header}}/>
                    <div className='subHeader'>
                        <div className='d-inline-block' dangerouslySetInnerHTML={{__html: this.props.content.redirectPhase_subHeader}}/>
                        &nbsp;
                        <div className='d-inline-block brand' dangerouslySetInnerHTML={{__html: this.props.brand}}/>
                    </div>
                    <RedirectLoader/>
                </div>
            </div>
        );
    }
}

