import { Route, Routes } from 'react-router-dom'
import { useProjects } from '@/contexts/ProjectsContext'

import { Home } from '@/pages/Home'
import { ProjectPage } from '@/pages/ProjectPage'
import { toast } from 'sonner'
import { useEffect } from 'react'
import { useNetwork } from './contexts/NetworkContext'
const pages = [
  {
    path: '',
    element: <Home />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/project/:donationAddress',
    element: <ProjectPage />,
  },
]

export const Content = () => {
  const { lightClientLoaded, isLight } = useNetwork()
  useEffect(() => {
    isLight && lightClientLoaded && toast.success('Light client: Synced')
  }, [isLight, lightClientLoaded])
  return (
    <>
      <Routes>
        {pages.map(({ path, element }, i) => {
          return <Route key={`page_${i}`} path={path} element={element} />
        })}
      </Routes>
    </>
  )
}
