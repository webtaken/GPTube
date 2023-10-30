/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/jsx-no-useless-fragment */

import Image from 'next/image'

import gptube_logo from '@/assets/icons/gptube_logo.svg'

export function LogoGPTube({ className }: { className?: string }) {
  return <Image alt="GPTube logo" className={className} src={gptube_logo} />
}
