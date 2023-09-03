import { Button as ButtonNextUI } from '@nextui-org/react'

type ButtonProps = React.ComponentProps<typeof ButtonNextUI>

export function Button(props: ButtonProps) {
  const { children, ...restProps } = props

  return <ButtonNextUI {...restProps}>{children}</ButtonNextUI>
}
