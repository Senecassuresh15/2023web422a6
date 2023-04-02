import useSWR from "swr";
import Error from "next/error";
import { Card, Button } from "react-bootstrap";
import Link from "next/link";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { useState, useEffect } from "react";
import { addToFavourites, removeFromFavourites } from "@/lib/userData";

//accepts objectID prop
export default function ArtworkCard(props) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  useEffect(() => {
    setShowAdded(favouritesList?.includes(props.objectID));
  }, [favouritesList]);

  async function favouritesClicked() {
    if (showAdded) {
      setFavouritesList(await removeFromFavourites(props.objectID));
      setShowAdded(false);
    } else {
      setFavouritesList(await addToFavourites(props.objectID));
      setShowAdded(true);
    }
  }

  const { data, error } = useSWR(
    props.objectID
      ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`
      : null,
    props.fetcher
  );

  if (error) {
    return <Error statusCode={404} />;
  } else if (data) {
    return (
      <>
        <Card>
          {data.primaryImage && (
            <Card.Img variant="top" src={data.primaryImage} />
          )}
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
              <br />
              <strong>Artist: </strong>
              {data.artistDisplayName ? data.artistDisplayName : "N/A"}
              {data.artistDisplayName && (
                <a
                  href={data.artistWikidata_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  &nbsp;{"("}wiki{")"}
                </a>
              )}
              <br />
              <strong>Credit Line: </strong>
              {data.creditLine ? data.creditLine : "N/A"}
              <br />
              <strong>Dimensions: </strong>
              {data.dimensions ? data.dimensions : "N/A"}
              <br />
              <br />
              <Button
                variant={showAdded ? "primary" : "outline-primary"}
                onClick={favouritesClicked}
              >
                {showAdded ? "+ Favourite (added)" : "+ Favourite"}
              </Button>
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
