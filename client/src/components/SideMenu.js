import React, {  useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse, Divider, Box, Typography } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import "../styles/SideMenu.css";
import { commonMenu, courseMenus } from '../components/Course_Application';

const Sidebar = ({user, selectedCourse}) => {
  const [expandedMenu, setExpandedMenu] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  // 🔥 Merge common menu + course-based menu
  const menuItems = [
    ...commonMenu,
    ...(selectedCourse ? courseMenus[selectedCourse] || [] : [])
  ];

  const handleMenuClick = (item) => {
    if(item.hasSubMenu) {
      setExpandedMenu(expandedMenu === item.id ? null : item.id);
    }
    else{
      handleNavigation(item.subItems[0].path);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <Drawer variant="permanent" className = "custom-drawer">
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {menuItems.map((item) => (
            <React.Fragment key={item.id}>
              {(item.role && item.role.includes(user?.role)) && (
                <React.Fragment>
                  <ListItem button onClick={() => handleMenuClick(item)} selected={!item.hasSubMenu && isActive(item.path) || 
                    (item.hasSubMenu && item.subItems.some(sub => isActive(sub.path)))} className = "listitem_hover"
                >
                  <ListItemText primary={item.label} className = "listitem_label" />
                    {item.hasSubMenu && ( expandedMenu === item.id ? <ExpandLess /> : <ExpandMore /> )}
                  </ListItem>
                  {item.hasSubMenu && (
                    <Collapse in={expandedMenu === item.id} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding sx = {{backgroundColor : "#ede0fe"}}>
                        {item.subItems.map((subItem) => (
                          <ListItem key={subItem.id} button sx={{ pl: 4 }} onClick={() => handleNavigation(subItem.path)}
                            selected={isActive(subItem.path)} className = "listitem_hover">
                            <ListItemText primary={subItem.label} />
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                  )}
                </React.Fragment>
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default React.memo(Sidebar);
