import imageNotFound from "../../assets/image-not-found.gif";
import "./notfound.css";

const NotFound = () => {
    return (
        <div className="not-found">
            <img className="image" alt="not-found" src={imageNotFound}></img>
        </div>
    );
};

export default NotFound