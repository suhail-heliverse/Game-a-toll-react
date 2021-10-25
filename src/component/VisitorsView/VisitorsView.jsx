import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { fetchData } from "../../middleware/RequestHandler";
import ViewerView from "../ViewerView/ViewerView";
import "./VisitorView.css"

function VisitorsView(props) {
  const [currentMatchStatus, setCurrentMatchStatus] = useState(false);

  useEffect(async () => {
    const response = await fetchData("/getActiveMatch", { method: "GET" });
    if (response.status) {
      setCurrentMatchStatus(true);
      props.callback(response.message);
    }
  }, []);

  if (!currentMatchStatus) {
    return (
      <div className="alert_center">
        There is no active match on the server. Please wait for more players to
        join
      </div>
    );
  }

  return (
    <div className="viewer_view">
      <div className="visitor_viewer">
        <div className="viewer_screen">
          <ViewerView channel="game-a-toll-screen-one" />
        </div>
        <div className="viewer_camera_one">
          <ViewerView channel="game-a-toll-camera-one" />
        </div>
      </div>
      <div className="visitor_viewer">
        <div className="viewer_screen">
          <ViewerView channel="game-a-toll-screen-two" />
        </div>
        <div className="viewer_camera_two">
          <ViewerView channel="game-a-toll-camera-two" />
        </div>
      </div>
    </div>
  );
}

export default VisitorsView;
