import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from '../page/Theme/MainLayout';
import { urlPages } from './urlPage';

// Class display bodys 
const MainRouting = () => {
    return (
        // Render page
        // Reference: https://www.w3schools.com/react/react_router.asp
        <BrowserRouter>
            <MainLayout>
                <Routes>
                    {/* Display page for URL */}
                    {
                        urlPages.map((item, itemKey) => (
                            <Route key={itemKey} path={item.path} element={item.component} />
                        ))
                    }
                </Routes>
            </MainLayout>
        </BrowserRouter>
    );
};

export default MainRouting