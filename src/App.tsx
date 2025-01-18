import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { TaskDetailPage } from './pages/TaskDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/task/:id" element={<TaskDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;