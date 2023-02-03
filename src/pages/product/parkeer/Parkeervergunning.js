import axios from "axios";
import React, {useState} from 'react';


function Parkeervergunning() {

    const [fileName, setFileName] = useState('')


    async function downloadFile() {
        try{
            const response = await axios.get(`http://localhost:8081/download/${fileName}`, {responseType: "document"}).then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'file.pdf');
                document.body.appendChild(link);
                link.click();
            })

            setFileName(response.data);

        } catch(error) {
            console.error(error);
        }

    }

    return (
        <div>
            <h1>Parkeervergunning</h1>


            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium assumenda at beatae dicta maxime modi natus nulla odio, odit quae quia rem repellendus veritatis vero voluptate. Ad alias dicta dolor eaque enim fugit, perferendis perspiciatis, porro quibusdam quisquam reprehenderit sapiente unde voluptatibus! Accusamus blanditiis commodi consectetur, deserunt dignissimos error illum, impedit iusto laudantium qui reiciendis reprehenderit sint, sit! Ad aliquid assumenda aut autem consectetur consequuntur debitis, delectus dolore doloremque eveniet fuga, hic iste quia reprehenderit rerum sapiente sed, tempora vel. A fugiat mollitia sit voluptate. Ab doloremque eum fugiat, harum hic repellendus temporibus. Commodi eius minima optio reiciendis reprehenderit. Aliquam consequuntur corporis delectus dignissimos, dolorem est exercitationem explicabo fuga, fugit illo incidunt inventore ipsum iusto laborum libero maiores modi nam nulla officiis quod quos recusandae reiciendis rem sit tempore velit voluptatem voluptatibus. Ab amet autem consequatur cupiditate distinctio id illum, incidunt laudantium numquam possimus quae, quam quidem quos repudiandae, tempore unde vel velit. A culpa distinctio ea eaque harum incidunt praesentium! Ab accusamus accusantium aliquam animi asperiores aspernatur assumenda consectetur corporis dicta error eum, eveniet ex explicabo fugiat illo in ipsam ipsum iste minus nam neque nisi non nulla obcaecati officiis perferendis quasi, quibusdam quod quos sapiente unde ut voluptas!</p>


            Download hier uw aanvraag formulier.
            <button className="button" type="submit">Download</button>


        </div>
    );
}

export default Parkeervergunning;