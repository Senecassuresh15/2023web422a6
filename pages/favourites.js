import { useAtom } from "jotai";
import { favouritesAtom } from "../store.js";
import { Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ArtworkCard from "../components/ArtworkCard";

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);

  if (!favouritesList) return null;

  return (
    <div>
      <Row className="gy-4">
        {favouritesList.length > 0 &&
          favouritesList.map((objectID) => (
            <Col lg={3} key={objectID}>
              <ArtworkCard objectID={objectID} />
            </Col>
          ))}
        {favouritesList.length == 0 && (
          <Card>
            <Card.Body>
              Nothing Here. Try adding some new artwork to your favourites.
            </Card.Body>
          </Card>
        )}
      </Row>
    </div>
  );
}
