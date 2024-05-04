import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function Login() {
    const navigate = useNavigate();
    const [isLoggedin, setIsLoggedin] = useState(false);

    const clientId = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
    const clientSecret = "XXXXXXXX";

    const handleClick = () => {
        const callbackUrl = `${window.location.origin}`;
        
        const targetUrl = `https://auth.monday.com/oauth2/authorize?redirect_uri=${encodeURIComponent(
          callbackUrl
        )}&client_id=${clientId}&scope=boards:read`;
        window.location.href = targetUrl;
      };
    
    useEffect(() => {
      
      const callbackUrl = `${window.location.origin}`;
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code) {
        const tokenUrl = "https://auth.monday.com/oauth2/token";
          
        const fetchData = async () => {
          const response = await fetch(tokenUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `client_id=${clientId}
            &client_secret=${clientSecret}&code=${code}
            &redirect_uri=${callbackUrl}`,
          });

          const data = await response.json();

          console.log(data.access_token);

          Cookies.set("access_token", data.access_token);
          setIsLoggedin(true);
        };

        fetchData();
      }
      else {
        console.log("No code found");
      }
    }, []);

    useEffect(() => {
      if (isLoggedin) {
        navigate("/secure");
      }
    }, [isLoggedin, navigate]);

    return (
        <button style={{ margin: "24px" }} type="button" onClick={() => handleClick()}>
          Login
        </button>
      );
}