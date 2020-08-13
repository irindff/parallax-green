import React from "react";
import "../styles/default/index.scss";

export default class Loader extends React.Component {
    constructor(props) {
        super(props);
        this.bgColor = !this.props.bgColor ? '#fff' : this.props.bgColor;
        this.color = !this.props.color ? '#3bc2bb' : this.props.color;

    }

    render() {
        return (
            <div id="loader" style={{background: this.bgColor}}>
                <style dangerouslySetInnerHTML={{
                    __html: [
                        ` .loading, .loading:before, .loading:after { background: ${ this.color}}`,

                    ]
                }}>
                </style>
                <strong className="loading">Loading…</strong>
            </div>
        )
    }
}
