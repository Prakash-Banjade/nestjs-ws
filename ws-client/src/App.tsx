import { useEffect } from 'react'
import { useSocket } from './providers/socket-provider'
import { Button } from './components/ui/button';

function App() {
  const { socket } = useSocket()

  useEffect(() => {
    if (!socket) return;

    // socket.emit('new-message', 'Hi there how are you?')

  }, [socket])

  return (
    <div className='min-h-screen grid place-items-center'>
      <section className='space-x-4 p-5 px-8 border shadow-md'>
        <Button variant={'secondary'}>Join room</Button>
        <Button variant={'default'}>Create new room</Button>
      </section>
    </div>
  )
}

export default App
