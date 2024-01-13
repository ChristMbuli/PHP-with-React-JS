import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Logout = () => {
  const navigate = useNavigate();

  const handleClick = async (event) => {
    event.preventDefault();
    try {
      const userId = localStorage.getItem("userId");

      const response = await axios.post(
        "http://localhost/Material-MUI/server/admin/logout.php",
        { userId }
      );

      if (response.status === 200) {
        localStorage.clear();
        navigate("/auth/signin");
      }
    } catch (error) {
      toast.error("Erreur de Déconnexion");
    }
  };

  return { handleClick };
};

export default Logout;
