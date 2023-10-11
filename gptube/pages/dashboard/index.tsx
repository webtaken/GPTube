import { useAuth } from '@/hooks/use-auth'

function Dashboard() {
  const { user } = useAuth()

  return (
    <div className="mx-8">
      <h2 className="absolute text-2xl text-typo">Welcome {user?.displayName || user?.email}</h2>
    </div>
  )
}

export default Dashboard
