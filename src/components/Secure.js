import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Secure() {
    const navigate = useNavigate();
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        const accessToken = Cookies.get("access_token");
        
        if (!accessToken) {
          navigate("/");
        }
    
        setAccessToken(accessToken);
      }, [navigate]);

    return (
        <div>
            <pre>{JSON.stringify(accessToken)}</pre>
            <button>Logout</button>
        </div>
    );
}