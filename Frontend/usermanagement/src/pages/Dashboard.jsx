// // src/components/Dashboard.jsx
// import React from "react";
// import { useNavigate, Link } from "react-router-dom";
// import {
//   Box,
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
//   Typography,
//   Button,
// } from "@mui/material";

// const menuItems = [
//   { label: "Yesterday", path: "/yesterday" },
//   { label: "Today", path: "/today" },
//   { label: "Tomorrow", path: "/tomorrow" },
// ];

// const Dashboard = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("isLoggedIn");
//     navigate("/login");
//   };

//   return (
//     <Box sx={{ display: "flex", height: "100vh" }}>
//       {/* Sidebar */}
//       <Drawer
//         variant="permanent"
//         sx={{
//           width: 240,
//           flexShrink: 0,
//           [`& .MuiDrawer-paper`]: {
//             width: 240,
//             boxSizing: "border-box",
//             backgroundColor: "#f5f5f5",
//           },
//         }}
//       >
//         <Box sx={{ p: 2 }}>
//           <Typography variant="h6">Menu</Typography>
//         </Box>
//         <List>
//           {menuItems.map((item) => (
//             <ListItem key={item.label} disablePadding>
//               <ListItemButton component={Link} to={item.path}>
//                 <ListItemText primary={item.label} />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//       </Drawer>

//       {/* Main Content */}
//       <Box sx={{ flexGrow: 1, p: 3 }}>
//         <Typography variant="h4" gutterBottom>
//           Welcome to Dashboard
//         </Typography>
//         <Button variant="contained" color="secondary" onClick={handleLogout}>
//           Logout
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default Dashboard;
// src/components/Dashboard.jsx


import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Button,
  Divider,
  Collapse,
  Slide,
  useTheme,
} from "@mui/material";
import {
  Group,
  GroupAdd,
  ListAlt,
  Home,
  CalendarToday,
  Folder,
  ExpandLess,
  ExpandMore,
  Logout,
} from "@mui/icons-material";

const menuItems = [
  { label: "Master", path: "/master", icon: <Folder /> },
  {
    label: "Members",
    icon: <Group />,
    submenu: [
      {
        label: "Add Member",
        path: "/dashboard/members/add",
        icon: <GroupAdd />,
      },
      {
        label: "View Members",
        path: "/dashboard/members/view",
        icon: <ListAlt />,
      },
    ],
  },
  //   { label: "Group", path: "/group", icon: <CalendarToday />

  //    },

  {
    label: "Group",
    icon: <CalendarToday />,
    submenu: [
      { label: "Add Group", path: "/dashboard/group/add", icon: <GroupAdd /> },
      { label: "View Group", path: "/dashboard/group/view", icon: <ListAlt /> },
    ],
  },
];

const drawerWidth = 260;

const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [openSubMenu, setOpenSubMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const toggleSubMenu = () => {
    setOpenSubMenu(!openSubMenu);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#F4F6F8" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#1E1E2F",
            color: "#fff",
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "#FFD700" }}
          >
            Dashboard
          </Typography>
        </Box>
        <Divider sx={{ borderColor: "#444" }} />
        <List>
          {menuItems.map((item, index) => (
            <React.Fragment key={item.label}>
              <ListItem disablePadding>
                <ListItemButton
                  component={item.path ? Link : "div"}
                  to={item.path}
                  sx={{
                    px: 3,
                    py: 1.5,
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#2C2C3E",
                      transform: "scale(1.02)",
                      transition: "all 0.3s ease",
                    },
                  }}
                  onClick={item.submenu ? toggleSubMenu : undefined}
                >
                  <Box sx={{ mr: 2 }}>{item.icon}</Box>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: "1rem",
                      fontWeight: 500,
                    }}
                  />
                  {item.submenu &&
                    (openSubMenu ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
              </ListItem>
              {item.submenu && (
                <Collapse in={openSubMenu} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.submenu.map((subItem) => (
                      <ListItem key={subItem.label} disablePadding>
                        <ListItemButton
                          component={Link}
                          to={subItem.path}
                          sx={{
                            pl: 6,
                            py: 1,
                            color: "#aaa",
                            "&:hover": {
                              backgroundColor: "#2C2C3E",
                              color: "#fff",
                              transition: "all 0.3s ease",
                            },
                          }}
                        >
                          <Box sx={{ mr: 2 }}>{subItem.icon}</Box>
                          <ListItemText primary={subItem.label} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Slide direction="up" in mountOnEnter unmountOnExit>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 4,
            backgroundColor: "#F4F6F8",
            overflowY: "auto",
          }}
        >
          <Outlet /> {/* Renders nested route content like Add/View Members */}
        </Box>
      </Slide>
    </Box>
  );
};

export default Dashboard;
