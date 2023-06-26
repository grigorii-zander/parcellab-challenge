import React from 'react'

type ComponentWithProps<Props extends Record<string, any>, WithChildren extends boolean = false> =
  WithChildren extends false
    ? (props: Props) => React.ReactNode
    : (props: Props & { children?: React.ReactNode }) => React.ReactNode

type ComponentWithEmptyProps<WithChildren extends boolean = false> =
  WithChildren extends false
    ? () => React.ReactNode
    : (props: { children?: React.ReactNode }) => React.ReactNode

declare global {
  type FC<Props extends (Record<string, any> | boolean) = false, WithChildren extends boolean = false> =
    Props extends boolean
      ? ComponentWithEmptyProps<Props>
      : ComponentWithProps<Props, WithChildren>

  type PageFC<Props extends (Record<string, any> | boolean) = false, WithChildren extends boolean = false> =
    FC<Props, WithChildren> & { requireAuth?: boolean }
}
