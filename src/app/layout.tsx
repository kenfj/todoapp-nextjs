'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import styles from './utils.module.css'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import { Toaster } from 'react-hot-toast'
import { SWRConfig } from 'swr'
import { swrConfigValue } from '@/swr-lib/swrConfig'

const inter = Inter({ subsets: ['latin'] })

// side menu
// https://www.js-craft.io/blog/responsive-sidebar-layout-nextjs-app-folder/

type Link = { label: string, path: string, targetSegment: string | null }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const activeSegment = useSelectedLayoutSegment()

  const links: Link[] = [
    { label: ' Home', path: '/', targetSegment: null },
    { label: ' Todos', path: '/todos', targetSegment: 'todos' },
    { label: ' TodoCellEdit', path: '/todo-cell-edit', targetSegment: 'todo-cell-edit' },
    { label: ' TodoRowEdit', path: '/todo-row-edit', targetSegment: 'todo-row-edit' },
    { label: ' TodoHistory', path: '/todo-history', targetSegment: 'todo-history' },
  ]

  const linkStyle = (link: Link) => ({
    textDecoration: (activeSegment === link.targetSegment)
      ? 'underline' : 'none'
  })

  return (
    <html lang="en">
      <head>
        <title>My Page Title</title>
      </head>
      <body className={inter.className}>

        <SWRConfig value={swrConfigValue}>
          <div className={`${styles.sidebar}`}>
            {links.map(link =>
              <Link key={link.label} href={link.path} style={linkStyle(link)}>
                {link.label}
              </Link>
            )}
          </div>

          <div className={`${styles.content}`}>
            {children}
          </div>
        </SWRConfig>

        <Toaster
          containerStyle={{ top: 20, right: 20, }}
          toastOptions={{
            // duration: 5000,
            position: 'top-right'
          }}
        />

      </body>
    </html>
  )
}
