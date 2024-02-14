import Header from "../HeaderMain";
import Footer from "../FooterMain";

// Layout include header, body, footer
const MainLayout = ({ children, ...props }) => {
    return (
        <div className="container" {... props}>
            <Header/>
            {children}
            <Footer/>
        </div>
    );
};

export default MainLayout