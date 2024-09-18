/* eslint-disable react-hooks/exhaustive-deps */
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { RouterType, routes } from '@/lib/utils'
import { Link, useLocation } from 'react-router-dom'
import PolkadotIcon from '@/assets/img/polkadotIcon.svg?react'
import { FaCheckCircle, FaGithub } from 'react-icons/fa'
import { TbLoaderQuarter } from 'react-icons/tb'
import { BookOpenText, Twitter, Github, Moon, Sun, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/theme-provider'
import { collectiveClient } from './clients'
import { useEffect } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import { Resources } from './Resources'
import { SiElement } from 'react-icons/si'
import { useNetwork } from './contexts/NetworkContext'

const linkStyle = (pathname: string, link: string) => {
  return `link ${
    pathname === link
      ? 'bg-accent text-accent-foreground rounded-md'
      : 'text-muted-foreground'
  }`
}

interface Props {
  lightClientLoaded: boolean
  setLightClientLoaded: React.Dispatch<React.SetStateAction<boolean>>
}


export const Navigation = ({
  setLightClientLoaded,
}: Props) => {
  const { pathname } = useLocation()
  const { theme, setTheme } = useTheme()
  const { lightClientLoaded, isLight } = useNetwork()


  useEffect(() => {
    collectiveClient.finalizedBlock$.subscribe((finalizedBlock) => {
      if (finalizedBlock.number && !lightClientLoaded) {
        setLightClientLoaded(true)
      }
    })
  }, [lightClientLoaded])

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-[14rem] flex-col border-r bg-background sm:flex">
      <nav className="items-left flex flex-col gap-4 px-4 sm:py-5">
        <div className="flex text-2xl font-extrabold text-primary">
          <PolkadotIcon
            className="max-h-[100%] w-12 self-center"
            width={'2.2rem'}
            height={'2.2rem'}
          />
        </div>
        
        <Link
          to="/home"
          className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
        >
          All Submissions
        </Link>

        <h2>Submissions Under Active Development</h2>
        <Link
          to="/alibi"
          className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
        >
          Alibi
        </Link>
        <Link
          to="/nft-gated"
          className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
        >
          NFT Gated
        </Link>
        <Link
          to="/delegit"
          className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
        >
          Delegit
        </Link>
        <Link
          to="/papi-actions"
          className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
        >
          PAPI Actions
        </Link>

        <h2>Past Blockspace Events</h2>
        {routes.map((r) => {
          if (r.childs?.length) {
            return (
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="flex items-center justify-start gap-4 px-2.5 py-2 text-muted-foreground transition-colors hover:text-foreground">
                    <r.icon className="h-5 w-5" />
                    <span>{r.name}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pl-4">
                    {r.childs.map((c: RouterType) => (
                      <Link
                        className={
                          linkStyle(pathname, '/' + (c.link || '')) +
                          ' flex items-center gap-4 px-2.5 py-2 text-muted-foreground transition-colors hover:text-foreground'
                        }
                        to={c.link}
                      >
                        <c.icon className="h-5 w-5" />
                        <div className="left">{c.name}</div>
                      </Link>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )
          } else {
            return (
              <Link
                className={
                  linkStyle(pathname, '/' + (r.link || '')) +
                  ' flex items-center gap-4 px-2.5 py-2 text-muted-foreground transition-colors hover:text-foreground'
                }
                to={r.link}
              >
                <r.icon className="h-5 w-5" />
                <div className="left">{r.name}</div>
              </Link>
            )
          }
        })}
      
      </nav>
      
      <nav className="mt-auto flex flex-row items-center justify-center gap-8 px-2 sm:py-5">
        {/* <Tooltip>
          <TooltipTrigger asChild>
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <FaGithub
                className="h-5 w-5"
                onClick={() =>
                  window.open('https://github.com/polkadot-fellows', '_blank')
                }
              />
              <span className="sr-only">Github</span>
            </a>
          </TooltipTrigger>
          <TooltipContent side="top">Github</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              <Sun className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">Toggle theme</TooltipContent>
        </Tooltip> */}

        {/* Light client stuff */}

    </nav>
    
    <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        {isLight && (
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                {!lightClientLoaded ? (
                  <TbLoaderQuarter className="h-5 w-5 animate-spin" />
                ) : (
                  <FaCheckCircle className="text-[#00b300]" />
                )}
                <span className="sr-only">
                  Light Client {!lightClientLoaded ? `syncing` : `synced`}
                </span>
              </a>
            </TooltipTrigger>
            <TooltipContent side="right">
              Light Client {!lightClientLoaded ? `syncing` : `synced`}
            </TooltipContent>
          </Tooltip>
        )}
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href="https://github.com/JoinWebZero/"
              target="_blank"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">Github</span>
            </a>
          </TooltipTrigger>
          <TooltipContent side="right">Github</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href="https://x.com/JoinWebZero/"
              target="_blank"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </a>
          </TooltipTrigger>
          <TooltipContent side="right">Twitter</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              <Sun className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Toggle theme</TooltipContent>
        </Tooltip>
      </nav>
      <div className="flex flex-col items-center px-2 pb-5 text-sm text-slate-400">
        <span>Sacha Lansky</span>
        <span>©2024</span>
      </div>
    </aside>
  )
}

/* eslint-disable react-hooks/exhaustive-deps */

// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from '@/components/ui/tooltip'
// import { routes } from '@/lib/utils'
// import { useLocation } from 'react-router-dom'
// import PolkadotIcon from '@/assets/img/polkadotIcon.svg?react'
// import { TbLoaderQuarter } from 'react-icons/tb'
// import { FaCheckCircle } from 'react-icons/fa'

// import { Github, Moon, Sun } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { useTheme } from '@/components/theme-provider'
// import { useNetwork } from './contexts/NetworkContext'

// const linkStyle = (pathname: string, link: string) => {
//   return `link ${
//     pathname === link
//       ? 'bg-accent text-accent-foreground '
//       : 'text-muted-foreground'
//   } flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8`
// }

// export const Navigation = () => {
//   const { lightClientLoaded, isLight } = useNetwork()
//   const { pathname } = useLocation()
//   const { theme, setTheme } = useTheme()

//   return (
//     <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
//       <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
//         <PolkadotIcon
//           style={{
//             maxHeight: '100%',
//             width: '4rem',
//           }}
//           width={'2.2rem'}
//           height={'2.2rem'}
//         />
//         {routes.map((r) => (
//           <Tooltip key={r.name}>
    
//             <TooltipTrigger asChild>
//               <a
//                 className={linkStyle(pathname, '/' + (r.link || ''))}
//                 href={`/#/${r.link || ''}`}
//               >
//                 <r.icon className="h-5 w-5" />
//                 <span className="sr-only">{r.name}</span>
//               </a>
//             </TooltipTrigger>
//             <TooltipTrigger asChild>
//               <a
//                 className={linkStyle(pathname, '/' + (r.link || ''))}
//                 href={`/#/${r.link || ''}`}
//               >
//                 <r.icon className="h-5 w-5" />
//                 <span className="sr-only">{r.name}</span>
//               </a>
//             </TooltipTrigger>
//             <TooltipContent side="right">{r.name}</TooltipContent>
//           </Tooltip>
//         ))}
//       </nav>
//       <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
//         {isLight && (
//           <Tooltip>
//             <TooltipTrigger asChild>
//               <a
//                 href="#"
//                 className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
//               >
//                 {!lightClientLoaded ? (
//                   <TbLoaderQuarter className="h-5 w-5 animate-spin" />
//                 ) : (
//                   <FaCheckCircle className="text-[#00b300]" />
//                 )}
//                 <span className="sr-only">
//                   Light Client {!lightClientLoaded ? `syncing` : `synced`}
//                 </span>
//               </a>
//             </TooltipTrigger>
//             <TooltipContent side="right">
//               Light Client {!lightClientLoaded ? `syncing` : `synced`}
//             </TooltipContent>
//           </Tooltip>
//         )}
//         <Tooltip>
//           <TooltipTrigger asChild>
//             <a
//               href="https://github.com/JoinWebZero/hackathons/blob/main/past-submissions/symmetry-2024.md/"
//               target="_blank"
//               className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
//             >
//               <Github className="h-5 w-5" />
//               <span className="sr-only">Github</span>
//             </a>
//           </TooltipTrigger>
//           <TooltipContent side="right">Github</TooltipContent>
//         </Tooltip>
//         <Tooltip>
//           <TooltipTrigger asChild>
//             <a
//               href="https://x.com/JoinWebZero/"
//               target="_blank"
//               className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
//             >
//               <Github className="h-5 w-5" />
//               <span className="sr-only">Twitter</span>
//             </a>
//           </TooltipTrigger>
//           <TooltipContent side="right">Twitter</TooltipContent>
//         </Tooltip>
//         <Tooltip>
//           <TooltipTrigger asChild>
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
//             >
//               <Sun className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//               <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//               <span className="sr-only">Toggle theme</span>
//             </Button>
//           </TooltipTrigger>
//           <TooltipContent side="right">Toggle theme</TooltipContent>
//         </Tooltip>
//       </nav>
//     </aside>
//   )
// }
