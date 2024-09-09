import Dashboard from './Dashboard'
import Sidenav from './Sidenav'

function Candididate() {
  return (
    <div className='flex flex-col bg-stone-300 h-screen'>
        <Sidenav ></Sidenav>
        <Dashboard/>
    </div>
  )
}

export default Candididate