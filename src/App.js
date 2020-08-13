import React from 'react';
import * as _ from "lodash";
// -------------------- Parallax ------------------------------
import Parallax from 'parallax-js'
// ------------------- convertToMarkDown -------------------------
import {ConvertToMarkDown} from './utils/convertToMarkDown'
// -------------------- Style ------------------------------
import 'bootstrap/scss/bootstrap.scss';
import "./assets/style/index.scss";
// ------------------- PageLoader-------------------------
import Loader from './components/Loder/js/Loader';
// ------------------- DynamicTableOffers Container-------------------------
import DynamicTableOffers from "./components/dynamicTableOffers/dynamicTableOffers";
import FirstOffer from "./components/firstOffer/firstOffer";
// ------------------- RedirectPhase Container-------------------------
import RedirectPhase from "./components/redirectPhase/redirectPhase";
// --------------------- Footer COMPLIANT ---------------------------
import Footer from "./components/Footer/Footer";
// ----------------- Resources --------------------------
import {resources} from "./assets/resources";
// ----------------- Images --------------------------
import coins_1 from './assets/imgs/coins_1.png';
import coins_2 from './assets/imgs/coins_2.png';
import coins_3 from './assets/imgs/coins_3.png';
import bar_gem from './assets/imgs/bar_gem.png';
import seven_gem from './assets/imgs/seven_gem.png';
import lime from './assets/imgs/lime.png';
import star_gem from './assets/imgs/star_gem.png';
import elementsCombo from './assets/imgs/elementsCombo.png';
import elements from './assets/imgs/elements.png';
import raspberry from './assets/imgs/raspberry.png';
import mask from './assets/imgs/mask.png';
// ------------------- Fonts ----------------------------
require('./assets/fonts/styles/josefin_sans.scss');
require('./assets/fonts/styles/lilita_one.scss');
require('./assets/fonts/styles/open_sans.scss');
// --------------------- AND ---------------------------


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display_loader: true,
            offers: null,
            pageContent: null,
            display_redirect_phase: false,
        };

        this.onClick = this.onClick.bind(this);
    }

    getOffers() {
        resources.offers = _.sortBy(resources.offers, 'rating');
        this.setState({
            pageContent: ConvertToMarkDown(resources.offers[0].content),
            firstOffer: ConvertToMarkDown(resources.offers[1]),
            offers: ConvertToMarkDown(resources.offers.slice(2)),
        });
    }

    onClick(offer) {
        this.setState({
            brand: offer.brand,
            display_redirect_phase: true
        }, () => {
            this.goToOffer(offer)
        });
    }

    goToOffer(offer) {
        console.log('goToOffer')
        // let link = OffersDataService.getLink(offer.id);
        // setTimeout(() => {
        //   location.href = link;
        // }, 3000);
    }

    parallaxElements() {
        return (
            <div className='elements'>
                <div id="scene_bar_gem" className="scene bar_gem">
                    <div data-depth="1.00"><img alt="" src={bar_gem}/></div>
                </div>
                <div id="scene_seven_gem" className="scene seven_gem">
                    <div data-depth="1.00"><img alt="" src={seven_gem}/></div>
                </div>
                <div id="scene_coins_1" className="scene coins_1">
                    <div data-depth="1.00"><img alt="" src={coins_1}/></div>
                </div>
                <div id="scene_coins_2" className="scene coins_2">
                    <div data-depth="1.00"><img alt="" src={coins_2}/></div>
                </div>
                <div id="scene_coins_3" className="scene coins_3">
                    <div data-depth="1.00"><img alt="" src={coins_3}/></div>
                </div>
                <div id="scene_star_gem" className="scene star_gem">
                    <div data-depth="1.00"><img alt="" src={star_gem}/></div>
                </div>
                <div id="scene_lime" className="scene lime">
                    <div data-depth="0.50"><img alt="" src={lime}/></div>
                </div>
                <div id="scene_elementsCombo" className="scene elementsCombo">
                    <div data-depth="1.00"><img alt="" src={elementsCombo}/></div>
                </div>
                <div id="scene_raspberry" className="scene raspberry">
                    <div data-depth="1.00"><img alt="" src={raspberry}/></div>
                </div>
                <div id="scene_mask" className="scene mask">
                    <div data-depth="0.50"><img alt="" src={mask}/></div>
                </div>
            </div>

        )
    }

    runParallax() {
        let scene = document.querySelectorAll('.scene');
        for (let x = 0; x < scene.length; x++) {
            new Parallax(scene[x]);
        }
    }

    componentDidMount() {
        this.getOffers();
        setTimeout(() => {
            this.setState({
                display_loader: false
            });
            this.runParallax();
        }, 1500);
    }


    render() {
        return (
            <div>
                {this.state.display_loader && this.state.pageContent && <Loader color='#8bf059' bgColor='#131313'/>}
                {this.state.pageContent && this.state.offers && !this.state.display_loader && <div className='wrapper'>
                    <div className='topBg'>
                        <div className='willOTheWisps'>
                            <div className='wisp wisp-1'/>
                            <div className='wisp wisp-2'/>
                            <div className='wisp wisp-3'/>
                            <div className='wisp wisp-4'/>
                        </div>
                        {!this.state.display_redirect_phase && <div className='content'>
                            <div className='text1' dangerouslySetInnerHTML={{__html: this.state.pageContent.header_1}}/>
                            <FirstOffer
                                offer={this.state.firstOffer}
                                onClick={this.onClick}
                            />
                        </div>
                        }
                        {/* parallax Elements */}
                        {this.parallaxElements()}
                        <div className='liane'/>
                        <div className='leaves'>
                            <div className='leaves_mob'/>
                            <div className='leaves_2'/>
                            <div className='leaves_3'/>
                        </div>
                        {/* end of  parallax Elements */}

                        {/* RedirectPhase */}
                        {this.state.display_redirect_phase && <RedirectPhase
                            content={this.state.pageContent}
                            brand={this.state.brand}
                        />}
                    </div>
                    <div className={` ${this.state.display_redirect_phase ? 'invisible' : 'visible'}`}>
                        <div className='text4'
                             dangerouslySetInnerHTML={{__html: this.state.pageContent.table_header}}/>
                        < div className='offersCover'>
                            <DynamicTableOffers
                                onClick={this.onClick}
                                tableMainContent={this.state.pageContent}
                                tableOffers={this.state.offers}
                            />
                            <img alt="" className={` ${this.state.display_redirect_phase ? 'visible' : 'visible'}`}
                                 src={elements}/>
                        </div>
                    </div>
                    <Footer
                    ref={(Footer) => this.footer = Footer}
                    gambleAwareNotice={true}
                    footerBgColor='#000000'
                    footerCommonColor='#7c7d84'
                    footerBottomLogo={true}
                    />
                </div>
                }
            </div>
        );
    }
}
