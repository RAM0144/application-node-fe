import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Redirection = () => {
  const { urlId } = useParams();

  // use the above urlId to get the long url from backend

  const longUlr =
    "https://worldwideweb"
    
  useEffect(() => {
    location.replace(longUlr);
  }, []);

  return <h1>Test Content</h1>;
};

export default Redirection;