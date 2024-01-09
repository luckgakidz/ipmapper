import { useDialogOpen } from '@/hooks/useDialog'
import { Item, MappingTableCellSwitch } from '@/types'
import { Switch } from '@fluentui/react-components'

interface ActiveSwitchProps {
  active: boolean
}

export function ActiveSwitch(props: ActiveSwitchProps) {
  const [dialogOpen, switchDialogOpen] = useDialogOpen()

  function MappingTableCellSwitchHandle(item: Item, data: MappingTableCellSwitch) {
    console.log(item)
    console.log(data)
  }

  return (
    <Switch
      onChange={(_, data) => {
        MappingTableCellSwitchHandle(targetItem, data)
      }}
      defaultChecked={props.active}
    />
  )
}
