import React from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import "./MenuDrawer.scss";

const MenuDrawer = ({ isOpen, setMenuOpen }) => {
  const handleClose = () => {
    setMenuOpen(false);
  };

  const listLinks = [
    { text: "Home", link: "/", category: null },
    { text: "Presentes", link: "/categories", category: "presentes" },
    {
      text: "Livros Infantis",
      link: "/categories",
      category: "livros infantis",
    },
    { text: "Canetas", link: "/categories", category: "canetas" },
    { text: "Cadernos", link: "/categories", category: "cadernos" },
    {
      text: "Materiais para colorir",
      link: "/categories",
      category: "materiais para colorir",
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
        {/* Add your menu content here */}
        <div>Menu</div>

        <div className="menu-items">
          {listLinks.map((linkItem) =>
            linkItem.category ? (
              <Link
                className="menu-link"
                to={linkItem.link}
                state={{ category: "presentes" }}
                onClick={onClickItem}
              >
                {linkItem.text}
              </Link>
            ) : (
              <Link
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
