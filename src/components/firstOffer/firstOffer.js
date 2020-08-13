import React from 'react';
import {Textfit} from 'react-textfit';
// ----------------- Style --------------------------
import './index.scss'

// --------------------- Button ---------------------------
import Button from '../Button/Button.js';



export default class FirstOffer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLongTerms: false,
            termsIndex: false
        };
        this.showLongTerms = this.showLongTerms.bind(this);
        this.closeLongTerms = this.closeLongTerms.bind(this);

    }


    showLongTerms( brand) {

        this.setState({
            showLongTerms: true
        });
    }

    closeLongTerms() {
        this.setState({
            showLongTerms: !this.state.showLongTerms
        });
    }


    render() {
        return (
            <div className="firstOfferContainer">
                <div className='OfferTexts'>
                    <div className='text2'>
                        <Textfit mode='single'>
                            <div
                                dangerouslySetInnerHTML={{__html: this.props.offer.content.offer_text_1}}/>
                            {this.props.offer.content.offer_text_2 && <div
                                dangerouslySetInnerHTML={{__html: this.props.offer.content.offer_text_2}}/>}
                        </Textfit>
                    </div>
                    <div className='text3'
                         dangerouslySetInnerHTML={{__html: this.props.offer.content.offer_text_3}}/>
                </div>
                <div className='buttonCover'>
                    <Button buttonFunc={() => this.props.onClick(this.props.offer)}>
                        <div dangerouslySetInnerHTML={{__html: this.props.offer.content.offer_button_text}}/>
                    </Button>
                </div>
                {/*=============== Terms ================*/}
                <div className='terms'>
                    {/*=============== Short Terms Cell ================*/}
                    <div className='row no-gutters  terms-short'
                         onClick={() => this.showLongTerms( this.props.offer.brand)}>
                        <div className='terms-short-button'>
                            <i className="fal fa-plus-circle"/>
                        </div>
                        <div className='terms-short-text'
                             dangerouslySetInnerHTML={{__html: this.props.offer.content.short_terms_text}}/>
                    </div>
                    {/*=============== Long Terms Cell ================*/}
                    {this.state.showLongTerms &&
                    <div className='tableBody-col  terms-long '>
                        <div className=' terms-long-text'
                             dangerouslySetInnerHTML={{__html: this.props.offer.content.long_terms_text}}/>
                        <div className=' terms-long-closeBtn'
                             onClick={this.closeLongTerms}>
                            &times;</div>
                    </div>}
                </div>
            </div>
        );
    }


}

