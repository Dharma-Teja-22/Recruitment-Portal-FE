import ManagerHeader from './ManagerHeader'
import Dashboard from './Dashboard'

function Manager() {
  return (
    <div className='flex flex-col bg-stone-300 h-screen'>
        <ManagerHeader/>
        <Dashboard/>
    </div>
  )
}

export default Manager