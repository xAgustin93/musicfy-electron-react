import React from "react";
import { Icon, Image } from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";
import { Auth, User } from "../../../api";
import { defaultUser } from "../../../assets";
import "./TopBar.scss";

const auth = new Auth();
const user = new User();

export function TopBar() {
  const navigation = useNavigate();
  const userData = user.getMe();

  const displayName = userData.displayName || "Mi cuenta";
  const avatar = userData.photoURL || defaultUser;

  const goBack = () => {
    navigation(-1);
  };

  return (
    <div className="top-bar">
      <Icon name="angle left" className="top-bar__back" link onClick={goBack} />

      <div className="top-bar__right">
        <Link to="/profile">
          <Image src={avatar} avatar />
          <span>{displayName}</span>
        </Link>
        <Icon name="power" onClick={auth.logout} link />
      </div>
    </div>
  );
}
