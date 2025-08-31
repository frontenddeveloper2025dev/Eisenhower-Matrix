import { Header } from '@/components/Header'
import { EisenhowerMatrix } from '@/components/EisenhowerMatrix'

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <EisenhowerMatrix />
      </main>
    </div>
  )
}

export default HomePage