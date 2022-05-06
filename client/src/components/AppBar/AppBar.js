import React, { useState, useEffect } from "react";
import { Layout, Image, Typography, Button, Avatar } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../img/mickey-mouse-fuck-logo.png";
import styles from "./style";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../constants/actionTypes";
import decode from "jwt-decode";

const { Header } = Layout;
const { Title } = Typography;
const AppBar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const location = useLocation();

  useEffect((logout) => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profil")));
  }, []);

  const logout = () => {
    dispatch({ type: LOGOUT });
    navigate("/authform");
    setUser(null);
  };
  return (
    <Header style={styles.header}>
      <Link to="/">
        <div style={styles.homeLink}>
          <Image preview={false} width={45} src={Logo} />
          &nbsp;
          <Title style={styles.title}>InstaSlut</Title>
        </div>
      </Link>
      {!user ? (
        <Link to="/authform">
          <Button style={styles.login} htmlType="button">
            Connexion
          </Button>
        </Link>
      ) : (
        <div style={styles.userInfo}>
          <Avatar style={styles.avatar} alt="nom" size="large">
            {user.result.username.charAt(0).toUpperCase()}
          </Avatar>
          <Title style={styles.title} level={4}>
            {user.result.username}
          </Title>
          <Button htmlType="button" onClick={logout}>
            Déconnexion
          </Button>
        </div>
      )}
    </Header>
  );
};

export default AppBar;
