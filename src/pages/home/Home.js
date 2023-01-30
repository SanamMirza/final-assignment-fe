import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import '../../component/nav/Nav'
import './Home.css'


function Home() {
    const [home, setHome] = useState();
    const [search, setSearch] = useState();

    useEffect(() => {
        async function fetchData() {
          try {
              const result = await axios.get('http://localhost:3000/');
              console.log(result);
              setHome(result.data)
          }
          catch(error) {
              console.error(error);
          }
        }
        void fetchData
    }, [])

    function handleSearch(e) {
        setSearch(e.target.value);
    }

    return (
        <>
            <header>
                <img className="header-img" src="https://cdn.webshopapp.com/shops/334194/files/399100706/1280x1000x3/oude-amsterdamse-huizen-met-weerspiegeling-in-wate.jpg" alt="img" />
                <div className="search-bar-container">
                    <input className="search-bar" placeholder="Zoek..." value={search} onChange={handleSearch}/>
                    <button className="search-button" type="button">Zoek</button>
                </div>
            </header>
            <main>
                <section className="home-container">
                    <div className="flex-container first-row">
                        <article className="article-container">
                            <Link to="/appointment"><img src="https://www.planjeafspraak.be/web/images/top.png" alt="afspraak-maken"/>
                            <p>Afspraak Maken</p></Link>
                        </article>
                        <article className="article-container">
                            <Link to="/product/paspoort"><img src="https://media.istockphoto.com/id/942005032/nl/vector/vector-leeg-open-paspoort-sjabloon-internationaal-paspoort-met-persoonsgegevens.jpg?s=612x612&w=0&k=20&c=e8Mr49nNbIjnNuO5B05KJH5AjzC8iXPLmY-BTuJK_hs="
                                alt="passpoort aanvragen" />
                            <p>Paspoort/ID aanvragen</p></Link>
                        </article>
                        <article className="article-container">
                            <Link to="/product/parkeervergunning"><img src="https://thumbs.dreamstime.com/z/parking-illustration-car-traffic-sign-45751988.jpg" alt="parkeervergunning-aanvragen"/>
                            <p>Parkeervergunning aanvragen</p></Link>
                        </article>
                    </div>
                    <div className="flex-container second-row">
                        <article className="article-container">
                            <Link to="/product/verhuizing"><img src="https://media.istockphoto.com/id/1288083160/vector/happy-family-moving-into-new-house-flat-vector-illustration.jpg?s=170667a&w=0&k=20&c=6Q9wfa-kTLMxk6O_8D1pTmyaBDQzTbICXpSv7TtWo3g=" alt="verhuizing"/>
                            <p>Verhuizing</p></Link>
                        </article>
                        <article className="article-container">
                            <Link to="/product/subsidie"><img src="https://www.heilooenergie.nl/wp-content/uploads/actueel/subsidie-1.webp" alt="subsidie"/>
                            <p>Subsidie</p></Link>
                        </article>
                        <article className="article-container">
                            <Link to="/nieuws"><img src="https://www.esdege-reigersdaal.nl/wp-content/uploads/2022/02/nieuws.png" alt="nieuws"/>
                            <p>Nieuws</p></Link>
                        </article>
                    </div>
                    <div className="flex-container final-row">
                        <article className="article-container">
                            <Link to="/melding"><img src="https://nkbv.nl/cache/media/29a1c3a68b67c985-files-images-600-600-VSO-202003-NKBV-SVS-02-Een-melding-maken.jpg" alt="melding"/>
                            <p>Melding</p></Link>
                        </article>
                        <article className="article-container">
                            <Link to="/bestuur"><img src="https://media.clubbase.sport.nl/sportplatform-base-cache/7/e/5/0/1/5/7e501554fd5a326bda2bdb3ed0ac375db302cc39.png" alt="bestuur"/>
                            <p>Bestuur en Organisatie</p></Link>
                        </article>
                        <article className="article-container">
                            <Link to="/product/overzicht"><img src="https://www.sdu.nl/sites/default/files/image/0046_VIND_Website_Doelgroep_Highlight_frontoffice_600x600_2.png" alt="product-en-diensten"/>
                            <p>Alle Producten en Diensten</p></Link>
                        </article>
                    </div>
                </section>
            </main>

        </>
    );
}

export default Home;