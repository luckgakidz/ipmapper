import { useDialogOpen } from '@/hooks/useDialog'
import { Button, ButtonProps } from '@fluentui/react-components'
import { AddRegular } from '@fluentui/react-icons'

export function EntryButton() {
  const [dialogOpen, switchDialogOpen] = useDialogOpen()

  const NewEntryButtonProps: ButtonProps = {
    onClick: () => {
      switchDialogOpen('create')
    },
    appearance: 'secondary',
    icon: <AddRegular />,
    shape: 'rounded',
  }

  return <Button {...NewEntryButtonProps}>New Entry</Button>
}
