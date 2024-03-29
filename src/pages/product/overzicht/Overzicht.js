import React from 'react';
import {Link} from "react-router-dom";
import './Overzicht.css';
import {FaCar, FaCoins, FaEuroSign, FaHouseUser, FaIdCard, FaParking, FaPassport} from "react-icons/fa";

function Overzicht() {



    return (
        <div className="overview">
            <h1>Overzicht Producten en Diensten</h1>
            <h2>
                <ul>
                <li><Link to="/product/paspoort">Paspoort aanvragen <FaPassport/><FaIdCard/></Link></li>
                    <li><Link to="/product/verhuizing">Verhuizing doorgeven<FaHouseUser/></Link></li>
                    <li><Link to="/product/subsidie">Subsidie en toeslagen<FaCoins/><FaEuroSign/></Link></li>
                    <li><Link to="/product/parkeervergunning">Parkeervergunning aanvragen <FaParking/><FaCar/></Link></li>
                </ul>
            </h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquam animi deserunt doloribus eaque, magni neque nesciunt nulla perspiciatis possimus provident, quas quasi, quia quod saepe sunt vitae! Asperiores, doloremque ducimus itaque minus mollitia quis repellat. Aliquid amet, deleniti ea esse et eveniet facere facilis impedit in iusto laborum laudantium, minima minus mollitia natus neque odio odit optio pariatur quaerat quasi qui ratione similique temporibus velit. Alias at cumque eligendi eos fugiat id iusto, nisi nostrum numquam odio perferendis, quidem, quisquam soluta suscipit totam velit voluptatibus. Ab amet aperiam beatae distinctio dolore ea eius eligendi, eveniet illum minima modi nisi placeat repellendus repudiandae sunt! Alias amet aperiam aspernatur aut autem commodi corporis dolor eligendi eos, eum ex exercitationem explicabo fugiat illum ipsam iste iure libero maxime nobis numquam odit officiis placeat possimus quisquam recusandae rem similique sint soluta, sunt velit veniam veritatis voluptatibus voluptatum? Adipisci hic laboriosam libero magni, molestiae repudiandae rerum sint voluptas? Architecto commodi cum cumque cupiditate dolor dolores doloribus ducimus eius eos est ex facilis illum ipsa ipsam iure labore magnam modi nemo quaerat quos reiciendis repudiandae sequi sit tempore vel veritatis, voluptate? Adipisci atque aut deleniti ducimus et nihil odit porro sequi voluptates voluptatibus! Atque corporis dolor earum error eveniet fugiat minima modi nam obcaecati officia placeat quisquam ratione, rerum sint, soluta, temporibus unde vitae voluptatibus. Alias assumenda cum debitis, dolorum est ex expedita explicabo illo iure magnam nam nobis officia perspiciatis quas quod ratione recusandae, sapiente similique sit, tempora ut velit voluptatem voluptatum. Alias architecto at consequatur dignissimos, eum id maxime nostrum, officia provident quod, reiciendis repellat sapiente sed. Corporis earum porro repellat ut? Ab accusamus alias amet animi architecto atque, commodi dolorum excepturi fugit inventore ipsum laboriosam minus mollitia natus nisi nobis nulla obcaecati odit placeat ratione recusandae rerum sequi suscipit tempora ullam, vero!</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci atque autem dolore dolores ea error, esse explicabo facere laborum natus nihil nobis perspiciatis, qui quibusdam quisquam voluptatem, voluptates? Dolores, facere illum in ipsa libero non voluptates. Accusamus assumenda commodi consequuntur culpa delectus deserunt dolorum eaque esse exercitationem expedita hic impedit ipsa, laudantium minima necessitatibus nobis quasi qui quibusdam sed vel veniam voluptate voluptates. A cupiditate eaque, eum illum ipsum iste, necessitatibus neque obcaecati omnis possimus quaerat quia ratione ullam vitae voluptate voluptatibus voluptatum? A adipisci deserunt distinctio dolor dolore dolorem ea et impedit in ipsum magni molestiae, nostrum, obcaecati odit perspiciatis praesentium provident quam quasi quidem ullam! Cupiditate dolor ipsam omnis quaerat quos sed ullam. Eligendi enim id illum minus natus quasi repellat, vel? Ab, accusamus adipisci asperiores atque beatae blanditiis consectetur dolor doloremque doloribus facilis hic id illum ipsum nihil nisi numquam odio officia perferendis, quae quisquam sit totam voluptatum? Beatae deserunt dolor eaque error et facilis fugit, laudantium placeat praesentium ratione totam ut vero. Aliquid, amet animi aspernatur autem commodi et expedita illum impedit ipsa itaque molestiae neque nostrum numquam possimus quibusdam ratione recusandae reiciendis reprehenderit sapiente suscipit tempora tenetur veniam voluptatum? Aliquam at dicta doloribus eius excepturi necessitatibus nemo nesciunt nihil non obcaecati reprehenderit, tempora ullam veritatis? Distinctio expedita nisi optio. Accusantium architecto debitis dolor dolorum earum enim eos, esse est impedit iste labore natus neque nulla optio, porro quaerat repudiandae rerum tempora totam voluptas. Accusamus adipisci alias asperiores aut autem beatae, consectetur consequatur corporis culpa cumque deleniti deserunt dicta dolor dolores ea eligendi esse facilis fuga illo inventore iste iure nisi nostrum quae quas qui quisquam reiciendis repellat rerum ullam velit vitae voluptate voluptatem. Architecto debitis delectus maiores nobis nostrum, tenetur voluptatibus? Aut autem, consequatur cum doloremque dolores in incidunt magnam, non officiis saepe sint.</p>

        </div>
    );
}

export default Overzicht;