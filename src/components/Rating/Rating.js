import React from "react";
import {Textfit} from 'react-textfit';
import './index.scss';

export default class Rating extends React.Component {
    constructor(props) {
        super(props);
    }

    isHalfStar(num) {
        let float = !/^[0-9]+$/.test(num);
        if (float) {
            num = num - 0.5
        }
        return num
    }

    _generateStars(totalRating, currentRating) {
        let stars = [];
        for (let x = 0; x < totalRating; x++) {
            if (x < currentRating) {
                if (x !== this.isHalfStar(currentRating)) {
                    stars.push("star")
                } else {
                    stars.push("star star-half")
                }
            } else {
                stars.push("star star-empty")
            }
        }
        return (
            <div className='starsRating'>
                {stars.map((value, key) =>
                    <i className={value} key={key}/>
                )}
            </div>
        )
    }

    render() {
        return (
            <Textfit mode="single">
                {this._generateStars(this.props.totalRating, this.props.currentRating)}
            </Textfit>
        );
    }

}


