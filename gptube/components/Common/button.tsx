import type { ButtonProps } from '@nextui-org/button'

import { Button as ButtonNextUI } from '@nextui-org/button'

export function Button(props: ButtonProps) {
  const { children, ...restProps } = props

  return <ButtonNextUI {...restProps}>{children}</ButtonNextUI>
}
