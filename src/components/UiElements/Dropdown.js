import React, { useState } from "react";
import { Button, Popover, List, ListItem, ListItemText, buttonBaseClasses } from "@mui/material";

const Dropdown = ({ children, items }) => {
    const [anchor, setAnchor] = useState(null);

    const handleOpen = (event) => {
        setAnchor(event.currentTarget);
    }

    const handleClose = () => {
        setAnchor(null);
    }

    const open = Boolean(anchor);


    return (
        <div style={{ display: "inline-block" }}>
            {React.cloneElement(children, {
                onClick: (e) => {
                    e.stopPropagation();
                    handleOpen(e);
                    children.props.onClick?.(e);
                }
            })}

            <Popover
                open={open}
                anchorEl={anchor}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
            
                classes={{ paper: "toolbar-submenu" }}
                // sx={{
                //     "& .MuiPopover-paper": {
                //         marginTop: "10px", // Add space between anchor and popover
                //     },
                // }}
                // className="toolbar-submenu"
                // style={{
                //     top: 10
                // }}
                // transformOrigin={{
                //     vertical: "top",
                //     horizontal: "left",
                // }}
                // slotProps={{
                //     style: {
                //         maxHeight: 300, // Prevent overflow
                //         width: anchor?.offsetWidth || 200, // Match button width
                //     },
                // }}
            >
                <List>
                    {items.map((item) => (
                        <ListItem
                            sx={{
                                "& .MuiIconButton-root": {
                                    color: "white", // Enforce white color
                                },
                                padding: 1
                            }}
                            // button={true}
                            key={item.key}
                            // onClick={() => {
                            //     item.onClick?.();
                            //     // handleClose();
                            // }}
                        >
                            {/* <ListItemText primary={item.label} /> */}
                            {item.render}
                        </ListItem>
                    ))}
                </List>
            </Popover>
        </div>
    );
};

export default Dropdown;
