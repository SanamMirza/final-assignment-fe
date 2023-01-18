import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";


function Home() {
    const [home, setHome] = useState();

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

    return (
        <>
            <header>
                <h1>Gemeente</h1>
            </header>
            <main>
                <section className="outer-container">
                    <div className="inner-container">
                        <h2>Home</h2>
                    <article className="article-container">
                        <Link to="/appointment"><p>Afspraak Maken</p></Link>
                    </article>
                        </div>
                </section>
            </main>

        </>
    );
}

export default Home;