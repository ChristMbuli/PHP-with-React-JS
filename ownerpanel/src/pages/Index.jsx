import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Index = () => {
  const history = useHistory();
  const [ownerInfo, setOwnerInfo] = useState(null);

  useEffect(() => {
    // Vérifier si l'utilisateur est authentifié en consultant le localStorage
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");

    if (!userId || !userName) {
      // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
      history.push("/login");
    } else {
      // Stocker les informations du propriétaire pour affichage
      setOwnerInfo({ id: userId, name: userName });
    }
  }, [history]);

  return <>{ownerInfo && <p>Bienvenue {ownerInfo.name}</p>}</>;
};

export default Index;
