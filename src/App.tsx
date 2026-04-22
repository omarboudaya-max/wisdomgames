import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import MetaversePage from './pages/MetaversePage'
import './index.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/play" element={<MetaversePage />} />
      </Routes>
    </BrowserRouter>
  )
}
