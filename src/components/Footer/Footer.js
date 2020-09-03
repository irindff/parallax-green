import React from "react";
// ---------- Footer Icons  --------------
import FooterIcons from '../../utils/footerIcons/FooterIcons';
// ----------------- Style --------------------------
import './index.scss'
// ----------------- Resources --------------------------
import * as gl from "./lang/en";


/**
 * @props:
 * gambleAwareNotice = true | false | undefined (default)
 * gambleNoticeOperator = true | false | undefined (default = true)
 * footerIconsColor: an color for the footer icons
 * footerBgColor: an background color for the footer
 * footerCommonColor: an color for the footer texts and bottom logo
 * advertisement: = true | false | undefined (default)
 * footerBottomLogo: = true | false | undefined (default)
 * blur: = true | false | undefined (default) => need to create className="blur"
 */

export default class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            advertisement: this.props.advertisement === "yes",
        };
        this.handleModalWindow = this.handleModalWindow.bind(this);
        this.footerIconsColor = !this.props.footerCommonColor ? false : this.props.footerCommonColor;
        this.footerBgColor = !this.props.footerBgColor ? 'transparent' : this.props.footerBgColor;
        this.footerCommonColor = !this.props.footerCommonColor ? 'black' : this.props.footerCommonColor;
        this.gambleNoticeOperator = this.props.gambleNoticeOperator === undefined ? true : this.props.gambleNoticeOperator;
        this.modals = gl.footer_modals;
        this.gambleAware = this.setGambleAware();
        this.casinoTerms = this.setCasinoTerms();
    }

    handleModalWindow(modalName) {
        let modal = this.modals[modalName];
        this.setState({
            open: !this.state.open,
            modal_header: '',
            modal_body: ''
        });
        if (!this.state.open) {
            this.setState({
                modal_header: modal.title,
                modal_body: modal.content
            });
        }

    }


    setGambleAware() {
        let gambleAware = {};
        if (this.props.gambleAware !== undefined) {
            // eslint-disable-next-line array-callback-return
            this.props.gambleAware.map((v) => {
                if (gl.footer_gambleAware.hasOwnProperty(v)) {
                    gambleAware[v] = {};
                    gambleAware[v] = gl.footer_gambleAware[v];
                }
            });
        } else {
            gambleAware = gl.footer_gambleAware;
        }
        return gambleAware;
    }

    setCasinoTerms() {
        let casinoTerms = [];
        if (this.props.casinoTerms !== undefined) {
            return (
                <div>
                    {this.props.casinoTerms.length <= 1 &&
                    <div>
                        {
                            this.props.casinoTerms.map((value, key) => {
                                return (
                                    <span key={key} className="cursor" onClick={() => this.handleModalTerms(value)}>
                                     <u>{this.gambleAware.footer_gamble_notice}</u>
                                 </span>

                                )

                            })
                        }
                    </div>
                    }
                    {this.props.casinoTerms.length > 1 &&
                    <div>
                        {this.gambleAware.footer_gamble_notice}:&nbsp;
                        {
                            this.props.casinoTerms.map((value, key) => {
                                return (
                                    <span key={key}>
                                    <span className="cursor"
                                          onClick={() => this.handleModalTerms(value)}><u>{value.brand}</u></span>
                                    <span>
                                        {key !== (this.props.casinoTerms.length - 1) ? (", ") : (" ")}
                                    </span>
                                </span>
                                )
                            })
                        }
                    </div>
                    }
                </div>
            )
        } else {
            casinoTerms = this.gambleAware.footer_gamble_notice;
        }
        return casinoTerms
    }


    handleModalTerms(value) {
        setTimeout(() => {
            // eslint-disable-next-line no-restricted-globals
            location.href = value.url;
        }, 200);
    }

    _generateFooterLink(modal, index, modalName) {
        return (
            <div className="text cursor" key={index}>
                <span onClick={() => this.handleModalWindow(modalName)}>{modal.title}</span>
                <span className="footer_sep">|</span>
            </div>
        );
    }

    _generateGamble(gambleAware, index) {
        return (
            <div key={index}>
                <div className="text">{index === 0 ? (this.casinoTerms) : (gambleAware)}</div>
            </div>
        );
    }


    render() {
        return (
            <div className='footerCover'
                 style={{backgroundColor: this.footerBgColor, color: this.footerCommonColor}}>
                <div className="container-fluid p-0 mx-auto">
                    {/*  Modal Window  */}
                    {this.state.open &&
                    <div className="modal_window">
                        <div className="modal_container">
                            <div className="modal_container-top_close_button"
                                 onClick={this.handleModalWindow}>&times;
                            </div>
                            <div className="modal_container-header"
                                 dangerouslySetInnerHTML={{__html: this.state.modal_header}}/>
                            <div className="modal_container-content"
                                 dangerouslySetInnerHTML={{__html: this.state.modal_body}}/>
                            <div className="modal_container-bottom_close_button"
                                 onClick={this.handleModalWindow}>
                                Close
                            </div>
                        </div>
                    </div>
                    }
                    {/*  Footer  */}
                    <div className="container-fluid footer">
                        <div className={` ${this.props.blur ? 'blur' : ''}`}>
                            <div className="row no-gutters">
                                {/*  advertisement */}
                                {this.state.advertisement && <div className="col text">{gl.footer_advertisement}</div>}
                                {/*  gamble  */}
                                <div className="col gambleAware ">
                                    {this.props.gambleAwareNotice ? Object.keys(this.gambleAware).map((value, key) =>
                                        this._generateGamble(this.gambleAware[value], key, value)) : ""}
                                </div>
                                {/*Footer Icons Color */}
                                {this.footerIconsColor !== false &&
                                <FooterIcons iconsColor={this.footerIconsColor}/>
                                }
                                {/*  operator  */}
                                {this.gambleNoticeOperator &&
                                <div className="col gambleAware">
                                    <div className="text footer-mobile"
                                         dangerouslySetInnerHTML={{__html: gl.footer_notice_not_operator_mobile}}/>
                                    <div className="text footer-desktop"
                                         dangerouslySetInnerHTML={{__html: gl.footer_notice_not_operator_desktop}}/>
                                </div>
                                }
                                {/* FooterLinks */}
                                <div className="col">
                                    <div className="footerLinks">
                                        {Object.keys(this.modals).map((value, key) =>
                                            this._generateFooterLink(this.modals[value], key, value))}
                                    </div>
                                </div>
                                {/* copyrights */}
                                <div className="copyrights text">
                                    {gl.footer_copyrights}&nbsp;{new Date().getFullYear()}&nbsp;{gl.footer_copyrights_extend}&nbsp;{gl.footer_rights_reserved}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                { this.props.footerBottomLogo && <div className='footerCover-logo'>
                    <svg viewBox="0 0 578 434" fill={this.props.footerCommonColor}>
                        <path
                            d="M163 418l-3-1c-20-3-35-13-47-28-13-15-22-32-30-50-11-28-17-57-20-86-2-22-3-44-1-65 2-19 6-37 15-54 2-4 5-9 9-13 14-16 32-21 53-18l10 2c18 5 28 16 32 34 6 25 2 48-14 69-4 7-11 12-20 11-6 0-10-3-9-10l5-28c3-16 3-31-2-47-2-5-6-9-10-12-2-2-3-1-5 0-10 8-15 17-19 28-7 19-10 39-10 59-2 51 8 100 31 145a129 129 0 0 0 35 44c6 4 9 4 15-1 8-8 14-17 18-28 10-24 12-49 9-74 0-5-2-9-4-14l-4-3c-2-2-3-5 0-7l6-3c9-2 17 0 24 6 17 16 27 34 23 57-3 20-8 38-19 55a70 70 0 0 1-49 31l-3 1h-16zM568 177l-1 5c-3 20-10 38-24 53-8 9-17 16-30 18h-9c-12-1-19-7-21-19v-30c2-20 7-41 17-59l6-8c3-3 5-2 8 0l4-1c11-5 22-5 32 0 10 6 14 16 16 27l2 6v8zm-64 23l-1 3v22c0 5 2 9 3 14 1 2 3 3 5 1l10-10c14-19 20-41 22-65 0-7-2-14-7-20-2-2-3-2-5 0-5 4-7 9-8 15-2 12-2 25 1 37l3 9c2 3 2 5-3 6-7 1-14-2-18-9l-2-3zM10 103c5-3 12-3 18-4 12-2 19-9 22-19l3-24c1-7 5-9 11-8l10 6 9 7c3 2 5 2 6 0 3-3 6-6 7-9l11-25c2-4 4-6 9-5 4 0 6 1 6 5l3 25 3 22-1 3c-2 2-4 3-7 3-25 5-44 19-55 43l-2 5c-2 3-3 5-1 9 2 3 0 5-4 5l-7-3-15-16-16-11-10-6v-3zm101-46h-1l-2 2c-8 12-24 15-36 7l-3-1-1 2v10c-3 14-10 23-24 26l-11 2-4 1v1c9 3 18 7 24 15l2-4 5-10c11-18 28-29 48-34l3-2V57z"/>
                        <path
                            d="M199 203c1-16 5-36 17-52 11-16 31-20 46-9l4 3 6 5 5 6 3 19 9 52 2 17-3 4c-5 2-12 1-16-3l-6-7c-2-2-3-2-4 0l-7 9a27 27 0 0 1-41 3l-8-13c-5-7-7-21-7-34zm25-6l1 17c2 9 3 19 8 27 1 3 2 3 4 1 7-10 12-21 15-33v-4c-1-15-2-30 1-45 1-7-2-11-6-15-2-1-4-1-6 1-3 3-6 6-7 10-6 13-9 27-10 41zM419 164l2-3c5-10 11-19 18-28 6-7 13-10 22-9 8 1 13 6 13 15l-2 29-6 51-3 24v7c0 3-2 5-6 6-5 1-9-2-11-7-5-13-9-26-7-39l10-50 4-22 1-3-1-1-4 4c-8 10-14 21-18 33l-12 44c-2 8-2 17-3 26 0 5-2 7-8 7-7 1-10-1-11-6-3-13-3-26-2-39 1-21 4-41 6-62l1-5c1-2 3-4 5-4s4 2 5 4l4 15 1 10 1 3h1zM321 210l-1 14c0 4 2 8 4 11 0 2 3 2 4 0 2-2 4-5 4-8 3-17-1-32-13-44l-12-12a40 40 0 0 1-1-56c8-8 25-9 34-2l1 1c6 5 5 12 3 18-2 5-5 10-12 12-5 1-8-2-6-7l2-12-1-5-2-3-3 2c-8 16-10 34 5 48l15 12c13 11 20 24 18 41-1 14-8 22-21 27-10 3-20 3-30-1-9-4-14-13-14-24 1-7 3-14 8-20 3-4 8-5 13-4 3 1 5 3 4 6v6h1zM164 73l2 13-1 4h-3c-3-2-5-4-6-7-6-15-5-31 4-45 3-6 8-11 15-12 5-1 12-2 17-1 15 1 25 11 28 27v17c-2 13-12 22-25 24-3 1-3 2-2 4l8 38c0 2 1 5-2 6s-6 0-7-3l-4-14-14-61-1-10c-1-1 1-3 1-4 2 1 4 1 5 3l6 19 5 15c1 4 1 4 5 2 9-6 12-14 13-24s-1-18-7-26c-7-11-22-11-29 1-4 8-8 22-8 34zM363 173l-1-55c0-3 0-6 3-7 4-1 6 2 7 5l5 14c5 22 11 44 12 68 1 14-2 27-5 41-1 4-5 6-10 5-4 0-7-2-7-7l-2-36-1-28h-1zM311 65l-10 2c-5 1-9-2-12-7-4-9-3-17-1-26 0-2 2-4 4-3l3 4 4 22 2 4 3-3c4-6 6-12 5-19 0-2 0-5 4-5 3-1 6 0 7 4l3 27v26c0 5-3 10-8 13-4 4-9 4-14 3s-7-4-7-8c0-9 2-17 9-22l6-2c2-1 2-2 2-3v-7zm1 14h-2c-5 6-6 13-5 20l1 2 2-2c4-6 4-13 4-20zM370 304v-27l2-3c8 0 16-1 23 1 10 2 16 8 19 17 4 11 3 22-4 32-5 7-12 10-20 10h-16c-3 0-4-1-4-4v-26zm10 0v17c0 3 1 4 4 4h2c17 0 24-15 19-30-2-7-9-13-22-12-2 0-3 0-3 3v18zM361 304c0 16-13 30-29 30s-29-14-29-30c0-17 13-30 29-30s29 13 29 30zm-10 0c0-10-6-19-16-21-7-2-16 2-20 10s-3 18 3 25c5 6 13 8 20 6 8-3 13-11 13-20zM382 43c-1 11-4 21-11 30-3 4-7 7-13 7-4 0-7-2-9-6l-2-10c-1-11 1-21 7-31 4-6 12-9 18-7s10 8 10 16v1zm-25 13h-2l2 14 2 3 2-2c7-9 11-20 12-31l-2-8-2-2-2 2c-3 7-5 14-3 22 0 3-1 4-3 3l-4-1zM443 273l5 12 18 46c2 3 1 3-2 3-6 0-6 0-8-5l-3-7c0-3-2-3-4-3h-13c-3-1-4 1-5 3l-4 10c-1 2-7 4-9 2v-3l16-37 6-17 2-3 1-1zm0 23h-2l-5 15h6c6 0 6 0 4-6l-3-9zM399 39l2-2 3-4c3-2 7-3 10-2 4 2 6 5 6 9l-3 28-1 6c-1 4-2 6-6 5-4 0-5-1-5-5-1-11 2-21 4-32v-3-2l-3 4c-6 8-10 18-12 28 0 5-3 6-6 6-2 0-4-2-3-4l6-33 2-4 4-2 2 4-1 3h1zM479 59l3-3c3-4 8-5 13-3 4 2 5 6 5 11l-1 19-1 11c0 3-1 5-4 5-3 1-5-1-6-4-1-7-2-14-1-21l2-13-1-3-2 2c-6 7-11 15-12 24 0 4-2 6-6 5-3 0-4-1-4-4 1-11 3-23 6-34l2-3 4-1 2 4v7l1 1zM247 62c0-8 2-16 7-22 4-6 11-7 17-8 2 0 3 2 3 4l7 34 2 8c1 3 0 4-2 4l-6-3-4-5-2-3-2 2-2 3c-4 4-10 4-14 0s-4-9-4-14zm18-25l-2 2c-6 5-10 25-6 33l1 1 2-2c3-7 7-13 5-21V40v-3zM463 274h9l2 2 12 25 2 2 2-2 12-25 3-2h9l-9 17-11 22-1 4v14c0 2-1 3-3 3h-4c-2 0-3-1-3-3v-3c1-9-2-18-7-27l-13-27zM284 309v21c1 3 0 4-3 4-6 0-6 0-6-6v-41c0-4-1-5-4-5h-7c-2 0-3 0-3-2v-4c0-2 1-3 3-3l32 1 2 2c0 7 2 6-6 6-7 0-7 0-7 8l-1 19zM501 89c1-8 4-16 11-22 4-4 9-5 14-3 4 2 6 5 4 9-3 7-8 12-14 15-4 2-5 8-1 10h3l11-5c3-2 6-2 9-1 2 1 2 2 0 3-6 3-11 7-17 9-12 4-20-2-20-15zm12-7c3-1 9-9 8-12h-2c-3 3-5 7-6 12zM440 5l1 10-6 43-4 24c0 2 1 4-2 4s-5-3-5-5c0-7 0-15 2-22 2-15 5-31 9-46 0-3 2-6 3-8h2zM241 67l-1 22c1 1 0 3-1 3-3 2-5 2-5-2l-3-33-1-38 1-5 2-2 2 2v2l6 51zM445 75c0-9 2-18 5-27l2-3 5-2 2 4-6 33c-1 3-3 5-5 4-3 0-4-2-3-5v-4zM460 24c2 0 4 1 4 4s-3 5-6 5-5-1-5-4 3-5 7-5z"/>
                    </svg>
                </div>}
            </div>
        );
    }
}
