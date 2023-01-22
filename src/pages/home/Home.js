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

    function onInputChange(event) {
        setSearch(event.target.value);
    }

    return (
        <>
            <header>
                <img className="header-img" src="http://localhost:3000/static/media/oude-amsterdamse-huizen.fa56cf6e4823fbb51475.jpg" />
                <div className="search-bar-container">
                    <input className="search-bar" placeholder="Zoek..." value={search} onChange={onInputChange}/>
                    <button className="search-button" type="button">zoeken</button>
                </div>
            </header>
            <main>
                <section className="outer-container">
                    <div className="flex-container first-row">
                        <article className="article-container">
                            <img src="https://www.planjeafspraak.be/web/images/top.png" alt="afspraak-maken"/>
                            <Link to="/appointment"><p>Afspraak Maken</p></Link>
                        </article>
                        <article className="article-container">
                            <img src="https://media.istockphoto.com/id/942005032/nl/vector/vector-leeg-open-paspoort-sjabloon-internationaal-paspoort-met-persoonsgegevens.jpg?s=612x612&w=0&k=20&c=e8Mr49nNbIjnNuO5B05KJH5AjzC8iXPLmY-BTuJK_hs="
                            // https://thumbs.dreamstime.com/b/passport-21655298.jpg
                                alt="passpoort aanvragen" />
                            <Link to="/product/paspoort"><p>Paspoort/ID aanvragen</p></Link>
                        </article>
                        <article className="article-container">
                            <img src="https://thumbs.dreamstime.com/z/parking-illustration-car-traffic-sign-45751988.jpg" alt="parkeervergunning-aanvragen"/>
                            <Link to="/product/parkeervergunning"><p>Parkeervergunning aanvragen</p></Link>
                        </article>
                    </div>
                    <div className="flex-container second-row">
                        <article className="article-container">
                            <img src="https://media.istockphoto.com/id/1288083160/vector/happy-family-moving-into-new-house-flat-vector-illustration.jpg?s=170667a&w=0&k=20&c=6Q9wfa-kTLMxk6O_8D1pTmyaBDQzTbICXpSv7TtWo3g=" alt="verhuizing"/>
                            <Link to="/product/verhuizing"><p>Verhuizing</p></Link>
                        </article>
                        <article className="article-container">
                            <img src="https://www.heilooenergie.nl/wp-content/uploads/actueel/subsidie-1.webp" alt="subsidie"/>
                            <Link to="/product/subsidie"><p>Subsidie</p></Link>
                        </article>
                        <article className="article-container">
                            <Link to="/appointment"><p>Afspraak Maken</p></Link>
                        </article>
                    </div>
                    <div className="flex-container final-row">
                        <article className="article-container">
                            <Link to="/appointment"><p>Afspraak Maken</p></Link>
                        </article>
                        <article className="article-container">
                            <Link to="/appointment"><p>Afspraak Maken</p></Link>
                        </article>
                        <article className="article-container">
                            <Link to="/appointment"><p>Afspraak Maken</p></Link>
                        </article>
                    </div>
                    <div className="tekst-container">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus, quasi. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam atque commodi corporis deserunt dolorem, eaque, eos error esse incidunt ipsa laborum minus modi mollitia neque, non officia qui quidem quod reprehenderit rerum sapiente vitae voluptatum! Deleniti expedita hic obcaecati quos. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus adipisci aliquam asperiores atque aut deserunt dignissimos, doloremque dolorum ducimus eius esse et eveniet expedita facere fugiat, harum hic incidunt ipsum labore libero magnam maxime molestiae nemo nihil odit omnis placeat quibusdam reiciendis repellendus reprehenderit rerum sed tempora unde veritatis voluptatibus!</p>

                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, provident. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquam ducimus explicabo fugit id in nostrum quae recusandae, sapiente suscipit! A cupiditate dolorem nesciunt optio quisquam repudiandae veniam! Aliquam atque cupiditate delectus iusto nostrum odit perspiciatis porro quis quos sequi. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius iste quaerat temporibus. Aliquid, commodi consequatur distinctio dolor eos quas soluta. At consectetur doloribus illum mollitia natus nesciunt quasi quia velit. Ducimus nemo ut voluptatibus! Consequatur deleniti dicta dolorum eligendi enim est excepturi illum ipsam officiis ratione, recusandae repellendus, sapiente unde?
                        </p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, officiis. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, expedita. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus cupiditate delectus dicta dignissimos dolor dolore doloribus dolorum eaque earum, et ex fugiat fugit id illo impedit incidunt ipsam minus modi molestias mollitia nam nisi numquam odio officiis praesentium quaerat quas, recusandae rem repellendus reprehenderit rerum sequi similique sit sunt tempora, tempore voluptatibus! A adipisci aut autem blanditiis, consequuntur cupiditate deleniti dolore doloremque dolorum explicabo, facere hic illum iste natus nesciunt nobis numquam perspiciatis quaerat quidem quod tenetur unde veritatis voluptate.</p>
                    </div>
                </section>
            </main>

        </>
    );
}

export default Home;