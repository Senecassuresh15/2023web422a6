import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Row, Col, Pagination, Card } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";
import Error from "next/error";

import validObjectIDList from "../../public/data/validObjectIDList.json";

const PER_PAGE = 12;

export default function Artwork(props) {
  const [page, setPage] = useState(1);
  const [artworkList, setArtworkList] = useState(null);

  const router = useRouter();
  let finalQuery = router.asPath.split("?")[1];

  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`,
    props.fetcher
  );

  function previousPage() {
    if (page > 1) setPage(page - 1);
  }

  function nextPage() {
    if (page < artworkList?.length) setPage(page + 1);
  }

  useEffect(() => {
    var results = [];

    if (data) {
      let filteredResults = validObjectIDList.objectIDs.filter((x) =>
        data.objectIDs?.includes(x)
      );

      for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
        const chunk = filteredResults.slice(i, i + PER_PAGE);
        results.push(chunk);
      }
      setArtworkList(results);
      setPage(1);
    }
  }, [data]);

  if (error) {
    return <Error statusCode={404} />;
  } else if (artworkList) {
    return (
      <>
        <Row className="gy-4">
          {artworkList.length > 0 ? (
            artworkList[page - 1].map((objectID) => (
              <Col lg={3} key={objectID}>
                <ArtworkCard objectID={objectID} />
              </Col>
            ))
          ) : (
            <Card>
              <Card.Body>
                Nothing Here. Try searching for something else.
              </Card.Body>
            </Card>
          )}
        </Row>
        {artworkList.length > 0 && (
          <>
            <br />
            <Row>
              <Col>
                <Pagination>
                  <Pagination.Prev onClick={previousPage} />
                  <Pagination.Item>{page}</Pagination.Item>
                  <Pagination.Next onClick={nextPage} />
                </Pagination>
              </Col>
            </Row>
          </>
        )}
      </>
    );
  } else return null;
}
