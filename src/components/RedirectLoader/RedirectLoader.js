import React from "react";

import './index.scss'


export default class RedirectLoader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="loader">
                <div className="loader-outer"/>
                <div className="loader-inner"/>
            </div>
        )
    }
}
