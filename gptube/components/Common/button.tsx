import type { ButtonProps } from '@nextui-org/react'

import { Button as ButtonNextUI } from '@nextui-org/react'

export function Button(props: ButtonProps) {
  const { children, ...restProps } = props

  return <ButtonNextUI {...restProps}>{children}</ButtonNextUI>
}
