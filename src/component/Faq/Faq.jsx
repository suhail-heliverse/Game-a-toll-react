// import React from "react";
// import Accordion from "@mui/material/Accordion";
// import AccordionDetails from "@mui/material/AccordionDetails";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import Typography from "@mui/material/Typography";
// import AddIcon from "@mui/icons-material/Add";
// import "./Faq.css";

// function Faq() {
//   const [expanded, setExpanded] = React.useState(false);

//   const handleChange = (panel) => (event, isExpanded) => {
//     setExpanded(isExpanded ? panel : false);
//   };

//   return (
//     <>
//       <div
//         style={{
//           backgroundColor: "#222",
//           display: "flex",
//           justifyContent: "center",
//           alignItem: "center",
//           flexDirection: "column",
//           // minHeight:"100vh"
//           padding:"160px 0px"
//         }}
//         className="container_faq"
//       >
//         <div style={{textAlign:"center",marginBottom:"120px"}}>
//         <h2 style={{ textAlign: "center", color: "white" }}>FAQ'S</h2>
//         <p style={{ textAlign: "center", color: "white" }}>
//           Lorem ipsum dolor sit amet consectetur adipisicing elit.
//         </p>
//         </div>
//         <div className="faqt_container">
//           <Accordion
//             sx={{ backgroundColor: "#000", color: "white", margin: "0px" }}
//             expanded={expanded === "panel1"}
//             onChange={handleChange("panel1")}
//           >
//             <AccordionSummary
//               expandIcon={<AddIcon sx={{ color: "white" }} />}
//               aria-controls="panel1bh-content"
//               id="panel1bh-header"
//             >
//               <Typography sx={{ width: "33%", flexShrink: 0 }}>
//                 General settings
//               </Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Typography>
//                 Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
//                 feugiat. Aliquam eget maximus est, id dignissim quam.
//               </Typography>
//             </AccordionDetails>
//           </Accordion>
//           <Accordion
//             sx={{ backgroundColor: "#000",width:"100%", color: "white" }}
//             expanded={expanded === "panel2"}
//             onChange={handleChange("panel2")}
//           >
//             <AccordionSummary
//               expandIcon={<AddIcon sx={{ color: "white" }} />}
//               aria-controls="panel2bh-content"
//               id="panel2bh-header"
//             >
//               <Typography sx={{ color: "white" }}>
//                 You are currently not an owner
//               </Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Typography>
//                 Donec placerat, lectus sed mattis semper, neque lectus feugiat
//                 lectus, varius pulvinar diam eros in elit. Pellentesque
//                 convallis laoreet laoreet.
//               </Typography>
//             </AccordionDetails>
//           </Accordion>
//           <Accordion
//             sx={{ backgroundColor: "#000", color: "white" }}
//             expanded={expanded === "panel3"}
//             onChange={handleChange("panel3")}
//           >
//             <AccordionSummary
//               expandIcon={<AddIcon sx={{ color: "white" }} />}
//               aria-controls="panel3bh-content"
//               id="panel3bh-header"
//             >
//               <Typography sx={{ width: "33%", flexShrink: 0 }}>
//                 Advanced settings
//               </Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Typography>
//                 Nunc vitae orci ultricies, auctor nunc in, volutpat nisl.
//                 Integer sit amet egestas eros, vitae egestas augue. Duis vel est
//                 augue.
//               </Typography>
//             </AccordionDetails>
//           </Accordion>
//           <Accordion
//             sx={{ backgroundColor: "#000", color: "white", margin: "0px" }}
//             expanded={expanded === "panel4"}
//             onChange={handleChange("panel4")}
//           >
//             <AccordionSummary
//               expandIcon={<AddIcon sx={{ color: "white" }} />}
//               aria-controls="panel4bh-content"
//               id="panel4bh-header"
//             >
//               <Typography sx={{ width: "33%", flexShrink: 0 }}>
//                 Personal data
//               </Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Typography>
//                 Nunc vitae orci ultricies, auctor nunc in, volutpat nisl.
//                 Integer sit amet egestas eros, vitae egestas augue. Duis vel est
//                 augue.
//               </Typography>
//             </AccordionDetails>
//           </Accordion>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Faq;

import React from "react";
import Accordion from "react-bootstrap/Accordion";
import "./Faq.css";

function Faq() {


  return (
    <div style={{ backgroundColor: "black", color: "white",padding:100 }}>
      <h2 style={{ textAlign: "center", color: "white" }}>FAQ'S</h2>
      <p style={{ textAlign: "center", color: "white" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      <div style={{ width: "60%", margin: "auto" }}>
        <Accordion defaultActiveKey="0">
          <Accordion.Item

          >
            <Accordion.Header
              varient="black"
              color="white"
       
              eventKey="0"
            >
              Accordion Item #1
            </Accordion.Header>
            
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header
         
            >
              Accordion Item #2
            </Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}

export default Faq;
