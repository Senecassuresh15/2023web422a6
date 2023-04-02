/*********************************************************************************
*  WEB422 – Assignment 6
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Stephen Suresh         Student ID: 117916213      Date: 2023-04-01
*
********************************************************************************/

import Image from "react-bootstrap/Image";
import { Row, Col } from "react-bootstrap";

export default function Home() {
  return (
    <div>
      <Image
        fluid={true}
        rounded={true}
        src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg"
        alt="Image of the entrance Metropolitan Museum of Art."
      />
      <br />
      <br />
      <Row>
        <Col md={6}>
          The Metropolitan Museum of Art of New York City, colloquially &quot;the
          Met&quot;, is the largest art museum in the Americas. Its permanent
          collection contains over two million works, divided among 17
          curatorial departments. The main building at 1000 Fifth Avenue, along
          the Museum Mile on the eastern edge of Central Park on Manhattan&lsquo;s
          Upper East Side, is by area one of the world&lsquo;s largest art museums. A
          much smaller second location, The Cloisters at Fort Tryon Park in
          Upper Manhattan, contains an extensive collection of art,
          architecture, and artifacts from medieval Europe. The Metropolitan
          Museum of Art was founded in 1870 with its mission to bring art and
          art education to the American people. The museum&lsquo;s permanent
          collection consists of works of art from classical antiquity and
          ancient Egypt, paintings, and sculptures from nearly all the European
          masters, and an extensive collection of American and modern art. The
          Met maintains extensive holdings of African, Asian, Oceanian,
          Byzantine, and Islamic art. The museum is home to encyclopedic
          collections of musical instruments, costumes, and accessories, as well
          as antique weapons and armor from around the world. Several notable
          interiors, ranging from 1st-century Rome through modern American
          design, are installed in its galleries.
        </Col>
        <Col md={6}>
          The Fifth Avenue building opened on March 30, 1880. In 2021, despite
          the COVID-19 pandemic in New York City, the museum attracted 1,958,000
          visitors, ranking fourth on the list of most-visited art museums in
          the world.
          <br />
          <br />
          <p>
            <a
              href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art"
              target="_blank"
              rel="noreferrer"
            >
              Wikipedia: Metropolitan Museum of Art
            </a>
          </p>
        </Col>
      </Row>
    </div>
  );
}