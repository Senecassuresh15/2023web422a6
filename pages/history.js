import { searchHistoryAtom } from "@/store";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { ListGroup, Card, Button } from "react-bootstrap";
import styles from "../styles/History.module.css";
import ReactHtmlParser from "react-html-parser"; // https://stackoverflow.com/questions/39758136/how-to-render-html-string-as-real-html
//installed using npm --force
import { removeFromHistory } from "@/lib/userData";

export default function History() {
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  let parsedHistory = [];

  if (!searchHistory) return null;

  function parseHistoryItem(item) {
    var itemString = "";
    var values = Object.values(item);
    var keys = Object.keys(item);
    for (var i = 0; i < values.length; i++) {
      itemString += keys[i];
      itemString += ": ";
      itemString += "<strong>";
      itemString += values[i];
      itemString += "</strong>";
      itemString += " ";
    }
    return itemString;
  }

  searchHistory?.forEach((h) => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });

  function historyClicked(e, index) {
    router.push(`/artwork?${searchHistory[index]}`);
  }

  async function removeHistoryClicked(e, index) {
    e.stopPropagation(); // stop the event from trigging other events
    //doesn't work
    setSearchHistory(await removeFromHistory(searchHistory[index]));
  }

  return (
    <>
      {parsedHistory?.length == 0 && (
        <Card>
          <Card.Body>Nothing Here. Try searching for some artwork.</Card.Body>
        </Card>
      )}
      {searchHistory?.length !== 0 && (
        <ListGroup>
          {parsedHistory.map((historyItem, index) => (
            <ListGroup.Item
              className={styles.historyListItem}
              key={index}
              onClick={(e) => historyClicked(e, index)}
            >
              {ReactHtmlParser(parseHistoryItem(historyItem))}
              {/* https://stackoverflow.com/questions/39758136/how-to-render-html-string-as-real-html */}
              <Button
                className="float-end"
                variant="danger"
                size="sm"
                onClick={(e) => removeHistoryClicked(e, index)}
              >
                &times;
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>
  );
}
