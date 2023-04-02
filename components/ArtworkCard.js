import useSWR from "swr";
import Error from "next/error";
import {Card, Button} from "react-bootstrap";
import Link from "next/link";

//accepts objectID prop
export default function ArtworkCard(props) {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`,
    props.fetcher
  );

  if (error) {
    return <Error statusCode={404} />;
  } else if (data) {
    return (
      <>
        <Card>
          <Card.Img
            variant="top"
            src={
              data.primaryImageSmall ? data.primaryImageSmall : "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"
            }
          />
          <Card.Body>
            <Card.Title>{data.title ? data.title : "N/A"}</Card.Title>
            <Card.Text>
              <strong>Date: </strong>
              {data.objectDate ? data.objectDate : "N/A"}
              <br />
              <strong>Classification: </strong>
              {data.classification ? data.classification : "N/A"} <br />
              <strong>Medium: </strong>
              {data.medium ? data.medium : "N/A"}
              <br />
            </Card.Text>
            <Link href={`/artwork/${props.objectID}`} passHref legacyBehavior>
              <Button variant="outline-dark">
                <strong>ID: </strong>
                {props.objectID}
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    return null;
  }
}
