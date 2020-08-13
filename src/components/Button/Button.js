import React from 'react';
import './index.scss';

export default class ButtonComp extends React.Component {
    constructor(props) {
        super(props);
        this._callBackHandler = this._callBackHandler.bind(this);
        this.state = {
            content: this.props.content
        }
    }


    _callBackHandler(e) {
        this.props.buttonFunc(e.target, this.props)
    }

    render() {
        return (
            <div className="container-fluid btnCover" onClick={(e) => this._callBackHandler(e)}>
                <div className="textBox" >
                        {this.props.children}
                </div>
            </div>
        );
    }
}

ButtonComp.defaultProps = {
    buttonFunc: () => {

    }
};