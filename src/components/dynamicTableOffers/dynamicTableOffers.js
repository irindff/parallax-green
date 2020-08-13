import React from 'react';
import {Textfit} from 'react-textfit';
// ----------------- Style --------------------------
import './index.scss'
// --------------------- Button ---------------------------
import Button from '../Button/Button.js';
// --------------------- Rating ---------------------------
import Rating from "../Rating/Rating";

export default class DynamicTableOffers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLongTerms: false,
            termsIndex: false
        };
        this.showLongTerms = this.showLongTerms.bind(this);
        this.closeLongTerms = this.closeLongTerms.bind(this);
    }


    showLongTerms(index, brand) {
        this.setState({
            showLongTerms: true,
            termsIndex: index
        });
    }

    closeLongTerms() {
        this.setState({
            showLongTerms: !this.state.showLongTerms
        });
    }

    generateTableBody(tableOffers) {
        return tableOffers.map((value, key) => {
            return (
                <div className='row no-gutters tableBody' key={key}>
                    {/*=============== Logo And Stars  ================*/}
                    <div className='tableBody-col tableBody-logo'>
                        <img alt="" className='img-fluid' src={value.content.offer_logo}/>
                        <div className='rating'>
                            <Rating
                                totalRating={5}
                                currentRating={value.content.stars_raiting}
                            />
                        </div>
                    </div>
                    {/*=============== Texts ================*/}
                    <div className='tableBody-col tableBody-texts'>
                        <div dangerouslySetInnerHTML={{__html: value.content.offer_text_1}}/>
                        <div dangerouslySetInnerHTML={{__html: value.content.offer_text_2}}/>
                    </div>
                    {/*=============== btnBlock ================*/}
                    <div className='tableBody-col tableBody-btnBlock'>
                        <Button
                            buttonFunc={() =>  this.props.onClick(value)}>
                            <Textfit mode='single'>
                            <div dangerouslySetInnerHTML={{__html: value.content.offer_button_text}}/>
                            </Textfit>
                        </Button>
                    </div>
                    {/*=============== Terms ================*/}
                    <div className='tableBody-col tableBody-terms terms'>
                        {/*=============== Short Terms Cell ================*/}
                        <div className='row no-gutters  terms-short'
                             onClick={() => this.showLongTerms(key, value.brand)}>
                            <div className='tableBody-col terms-short-button'>
                                {/*<i className=" fas fa-plus-circle"/>*/}
                                <i className="fal fa-plus-circle"/>
                            </div>
                            <div className='tableBody-col  terms-short-text'
                                 dangerouslySetInnerHTML={{__html: value.content.short_terms_text}}/>
                        </div>
                        {/*=============== Long Terms Cell ================*/}
                        {this.state.showLongTerms && this.state.termsIndex === key &&
                        <div className='tableBody-col  terms-long '>
                            <div className=' terms-long-text'
                                 dangerouslySetInnerHTML={{__html: value.content.long_terms_text}}/>
                            <div className=' terms-long-closeBtn'
                                 onClick={this.closeLongTerms}>
                                &times;</div>
                        </div>}
                    </div>
                </div>
            )
        })
    }


    render() {
        return (
            <div className="dynamicTableContainer">
                    {this.generateTableBody(this.props.tableOffers)}
            </div>
        );
    }


}

