import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Toolbar from "@mui/material/Toolbar";
import {UserDashboard, Profile} from "../index";
import { useHistory } from 'react-router';


export default function UserHeader() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDashboard,setOpenDashboard]=React.useState(true);
  const [openProfile, setOpenProfile]=React.useState(false);
  const [userAmount, setUserAmount]=React.useState(0);
  const router = useHistory();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
      console.log("this is more icon status")
      console.log(event);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
      console.log("this is handleclosed function");
    setAnchorEl(null);
  };

  const logout = ()=>{
    localStorage.clear();
    router.push('/')
  }




 
  return (
      <>
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:"flex-end",backgroundColor:"black",color:"white" }}>
      <Avatar sx={{ width: 32, height: 32,margin:2 }}>M</Avatar>

        <div style={{display:"flex",flexDirection:"column",marginRight:37}}> 
          <div style={{margin:2}}>{JSON.parse(localStorage.user).username}</div>
         <div style={{margin:2}}>Amount: $ {userAmount}</div>
        </div>

        <Tooltip title="Account settings">
          <IconButton onClick={handleClick} size="small" sx={{ mr: 2 }}>
            <ExpandMoreIcon sx={{ width: 32, height: 32,color:"white" }}></ExpandMoreIcon>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={()=>{
            setOpenProfile(false);
            setOpenDashboard(true)
        }}>
          <Avatar /> Dashboard
        </MenuItem>
        <MenuItem onClick={()=>{
            setOpenProfile(true);
            setOpenDashboard(false)
        }}>
          <Avatar /> Edit Proile
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
   {openDashboard &&<UserDashboard callback={(amount)=>{setUserAmount(amount)}}/>}
   {openProfile && <Profile/>}

    </>
  );
}
