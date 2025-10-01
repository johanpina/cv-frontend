import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import DashboardPage from "./pages/DashboardPage";
import SearchPage from "./pages/SearchPage";
import UploadPage from "./pages/UploadPage";
import ProfileDetailPage from "./pages/ProfileDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="upload" element={<UploadPage />} />
          <Route path="profile/:profileId" element={<ProfileDetailPage />} />
          <Route path="*" element={<h2>404: Página No Encontrada</h2>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
