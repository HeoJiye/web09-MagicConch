import { Route, Routes } from 'react-router-dom';

import BackgroundMusic from './components/BackgroundMusic';
import AIChatPage from './pages/AIChatPage';
import HomePage from './pages/HomePage';
import HumanChatPage from './pages/HumanChatPage';
import ReaderListPage from './pages/ReaderListPage';
import ResultSharePage from './pages/ResultSharePage';

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/chat/ai/:id?"
          element={<AIChatPage />}
        />
        <Route
          path="/chat/human/:id"
          element={<HumanChatPage />}
        />
        <Route
          path="/readers"
          element={<ReaderListPage />}
        />
        <Route
          path="/result"
          element={<ResultSharePage />}
        />
      </Routes>
      <BackgroundMusic />
    </>
  );
}

export default App;
