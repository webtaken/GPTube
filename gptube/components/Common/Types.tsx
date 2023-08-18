import type { NextComponentType, NextPage } from 'next'
import type { AppProps } from 'next/app'
import type { LayoutKeys } from '../Layouts/Layouts'

export type MyPage<P = object, IP = P> = NextPage<P, IP> & {
  Layout?: LayoutKeys
}

export type MyAppProps = AppProps & {
  Component: NextComponentType & {
    Layout: LayoutKeys
  }
}
