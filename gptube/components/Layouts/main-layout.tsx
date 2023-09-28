import { rubikFont } from '../Common/fonts'
import { Header } from '../header'

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className={rubikFont.className}>
      <Header />
      {children}
    </main>
  )
}
