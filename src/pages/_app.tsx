import { ThemeProvider } from 'next-themes'
import Router from 'next/router'
import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import TopBarProgress from 'react-topbar-progress-indicator'
import { SWRConfig } from 'swr'

import progressBarConfig from '../config/progress-bar/index'
import { swrConfig } from '../config/swr'

import '../styles/globals.css'

const App: FC<{ Component: FC, pageProps: object }> = ({ Component, pageProps }) => {
  const [progress, setProgress] = useState(false)
  const swrOptions = swrConfig()

  Router.events.on('routeChangeStart', () => setProgress(true))
  Router.events.on('routeChangeComplete', () => setProgress(false))
  TopBarProgress.config(progressBarConfig())

  return (
    <SWRConfig
      value={swrOptions}
    >
      <ThemeProvider
        attribute="class"
        enableSystem={false}
      >
        {progress && <TopBarProgress />}
        <Toaster />
        <Component
          {...pageProps}
        />
      </ThemeProvider>
    </SWRConfig>
  )
}

export default App
