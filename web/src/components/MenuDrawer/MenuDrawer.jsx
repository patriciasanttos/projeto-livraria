import React from "react";
import Drawer from "@mui/material/Drawer";
import { Link } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import "./MenuDrawer.scss";

const MenuDrawer = ({ isOpen, setMenuOpen }) => {
  const handleClose = () => {
    setMenuOpen(false);
  };

  const listLinks = [
    { text: "Home", link: "/", category: null },
    { text: "Presentes", link: "/categories/presente", category: "presentes" },
    {
      text: "Livros Infantis",
      link: "/categories/livros%20infantis",
      category: "livros infantis",
    },
    { text: "Papelaria", link: "/categories/papelaria", category: "papelaria" },
    { text: "Cadernos", link: "/categories", category: "cadernos" },
    {
      text: "Atividades",
      link: "/categories/atividades",
      category: "atividades",
    },
    { text: "Ver tudo", link: "/categories", category: null },
  ];

  const onClickItem = () => {
    setMenuOpen(false);
  };

  return (
    <Drawer anchor="left" open={isOpen} onClose={handleClose}>
      <div style={{ width: 250, padding: "16px", position: "relative" }}>
        <IconButton
          onClick={handleClose}
          style={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <div>Menu</div>

        <div className="menu-items">
          {listLinks.map((linkItem, index) =>
            linkItem.category ? (
              <Link
                key={index}
                className="menu-link"
                to={linkItem.link}
                state={{ category: "presentes" }}
                onClick={onClickItem}
              >
                {linkItem.text}
              </Link>
            ) : (
              <Link
                key={index}
                className="menu-link"
                to={linkItem.link}
                onClick={onClickItem}
              >
                {linkItem.text}
              </Link>
            )
          )}
        </div>
      </div>
    </Drawer>
  );
};

export default MenuDrawer;
