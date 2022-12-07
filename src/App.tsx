import React, { useState } from "react";
import "./App.css";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState, selectToken } from "./store/store";
import { updateToken } from "./store/store";
import { InputText } from "primereact/inputtext";
import AlbumList from "./components/AlbumList";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Toolbar } from "primereact/toolbar";

function App() {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const [albumsList, setAlbumsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  /**
   * Login to spotify
   */
  const connect = () => {
    dispatch(updateToken(""));
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
    var width = 800;
    var height = 600;
    var left = screen.width / 2 - width / 2;
    var top = screen.height / 2 - height / 2;
    const popup = window.open(
      // `https://accounts.spotify.com/fr/authorize?client_id=${clientId}&response_type=code&redirect_uri=${location.origin}/callback&scope=user-read-private user-read-email&show_dialog=true`,
      `https://accounts.spotify.com/fr/authorize?client_id=${clientId}&response_type=token&redirect_uri=${location.origin}/callback&scope=user-read-private user-read-email&show_dialog=true`,
      "Login with Spotify",
      `width=${width},height=${height},top=${top},left=${left}`
    );

    const callbackAfterAuthorize = async (windowLocationHash: string) => {
      //const code = windowLocationHash.substring(1).split("&")[0].split("=")[1];
      const token = windowLocationHash.substring(1).split("&")[0].split("=")[1];
      //return code & state

      /*
      try {
        const res: any = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          body: new URLSearchParams({
            code: code,
            redirect_uri: `${location.origin}/callbackToken`,
            grant_type: "authorization_code",
          }),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
          },
        });
        console.log(res);
      } catch (e) {
        console.log(e);
      }
      */

      //@ts-ignore
      popup.close();
      dispatch(updateToken(token));
    };

    const callbackAfterToken = async (windowLocationHash: string) => {
      const code = windowLocationHash.substring(1).split("&")[0].split("=")[1];
      //return code & state

      //@ts-ignore
      popup.close();
      dispatch(updateToken(token));
    };
    // @ts-ignore
    window.spotifyCallbackAfterAuthorize = callbackAfterAuthorize;
    // @ts-ignore
    window.spotifyCallbackAfterToken = callbackAfterToken;
  };

  /**
   * Recherche des albums
   */
  const searchAlbum = async () => {
    const result: AxiosResponse = await axios({
      method: "GET",
      responseType: "json",
      params: {
        q: searchTerm,
        type: "album",
      },
      url: "https://api.spotify.com/v1/search",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    setAlbumsList(result.data.albums.items);
  };

  const disconnect = () => {
    dispatch(updateToken(""));
  };

  if (token == "") {
    return (
      <div className="content">
        <Button label="Se connecter à spotify" onClick={connect} />
      </div>
    );
  } else {
    return (
      <div className="content">
        <Toolbar
          left={
            <React.Fragment>
              <span className="p-input-icon-left">
                <InputText
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Rechercher un album"
                />
              </span>
              <Button
                style={{ margin: "5px" }}
                label="Go !"
                className="p-button-success"
                aria-label="Search"
                onClick={searchAlbum}
              />
            </React.Fragment>
          }
          right={
            <React.Fragment>
              <Button
                label="Se déconnecter"
                className="p-button-danger"
                onClick={disconnect}
              />
            </React.Fragment>
          }
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        />
        <AlbumList albums={albumsList}></AlbumList>
      </div>
    );
  }
}

export default App;
