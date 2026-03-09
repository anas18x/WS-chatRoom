// import './App.css'
import { Routes , Route} from 'react-router-dom'
import { Home } from './pages/Home'
import { ChatRoom } from './pages/ChatRoom'

function App() {
  return (
    <div className= "min-h-screen bg-zinc-900 text-white flex items-center justify-center">
      <Routes>

        <Route path='/' element={<Home/>}/>
        <Route path='/room/:roomId' element={<ChatRoom/>}/>

      </Routes>
     
    </div>
  )
}

export default App
