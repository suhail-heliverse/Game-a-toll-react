// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepLabel from '@mui/material/StepLabel';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import BasicDetails from "./BasicDetails";
// import AccountDetails from "./AccountDetail"
// const steps = ['User Information', 'Acoount Detail', 'Create an ad'];

// export default function HorizontalLinearStepper() {
//   const [activeStep, setActiveStep] = React.useState(0);
//   const [skipped, setSkipped] = React.useState(new Set());
//   const [showBasicDetail, setShowBasicDetail]= React.useState(true);
//   const [showAccountDetail, setShowAccountDetail]= React.useState(false);

//   const isStepOptional = (step) => {
//     return step === 1;
//   };

//   const isStepSkipped = (step) => {
//     return skipped.has(step);
//   };

//   const handleNext = () => {
//     let newSkipped = skipped;
//     if (isStepSkipped(activeStep)) {
//       newSkipped = new Set(newSkipped.values());
//       newSkipped.delete(activeStep);
//     }

//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     setSkipped(newSkipped);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleSkip = () => {
//     if (!isStepOptional(activeStep)) {
//       // You probably want to guard against something like this,
//       // it should never occur unless someone's actively trying to break something.
//       throw new Error("You can't skip a step that isn't optional.");
//     }

//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     setSkipped((prevSkipped) => {
//       const newSkipped = new Set(prevSkipped.values());
//       newSkipped.add(activeStep);
//       return newSkipped;
//     });
//   };

//   const handleReset = () => {
//     setActiveStep(0);
//   };

//   return (
//     <Box sx={{ width: '100%' }}>
//       <Stepper activeStep={activeStep}>
//         {steps.map((label, index) => {
//           const stepProps = {};
//           const labelProps = {};
//           if (isStepOptional(index)) {
//             labelProps.optional = (
//               <Typography variant="caption">Optional</Typography>
//             );
//           }
//           if (isStepSkipped(index)) {
//             stepProps.completed = false;
//           }
//           return (
//             <Step key={label} {...stepProps}>
//               <StepLabel {...labelProps}>{label}</StepLabel>
//             </Step>
//           );
//         })}
//       </Stepper>
//       {activeStep === steps.length ? (
//         <React.Fragment>
//           <Typography sx={{ mt: 2, mb: 1 }}>
//             All steps completed - you&apos;re finished
//           </Typography>
//           <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//             <Box sx={{ flex: '1 1 auto' }} />
//             <Button onClick={handleReset}>Reset</Button>
//           </Box>
//         </React.Fragment>
//       ) : (
//         <React.Fragment>
//           <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
//           <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
//           {activeStep+1==1 && <BasicDetails/>}
//            {activeStep+1==2 && <AccountDetails/>}
//            {activeStep+1==3 && <AccountDetails/>}

//           </div>
       

//           <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//             <Button
//               color="inherit"
//               disabled={activeStep === 0}
//               onClick={handleBack}
//               sx={{ mr: 1 }}
//             >
//               Back
//             </Button>
//             <Box sx={{ flex: '1 1 auto' }} />
//             {isStepOptional(activeStep) && (
//               <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
//                 Skip
//               </Button>
//             )}

//             <Button onClick={handleNext}>
//               {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
//             </Button>
//           </Box>
//         </React.Fragment>
//       )}
//     </Box>
//   );
// }


import React from 'react';
import './Profile.css'
import bannerImage from "../../assests/images/profile.png";

function Profile() {
  return (
    <div className="account_setting">
      <h3>Account setting</h3>
      <div className="profile_info">
      <div className="profile_image">
       <img src={bannerImage}/>
        <button className="im_change_btn">Change</button>
      </div>
      <div className="pi">
       <h3 className="pi_heading">Personal Information</h3> 
        <div>
          <div className="pi_field">
          <label>Name</label>
          <input/>
          </div>

          <div className="pi_field">
          <label>Email</label>
          <input/>
          </div>

          <div className="pi_field">
          <label>Phone</label>
          <input/>
          </div>

          <div className="pi_field">
          <label>Address</label>
          <textarea rows="4" cols="70" style={{borderRadius:10}}/>
          </div>
          <h3 className="pi_heading">Personal Information</h3> 
        </div>
        <div className="pi_field">
          <label>Current Password</label>
          <input/>
          </div>
          <div className="pi_field">
          <label>New Password</label>
          <input/>
          </div>
          <div>
            <button className="im_save_btn">Save</button>
          </div>
      </div>
    </div>
    </div>
  )
}

export default Profile
