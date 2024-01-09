import { ActiveSwitch } from '@/components/ActiveSwitch'
import { useDialogOpen } from '@/hooks/useDialog'
import { useTable } from '@/hooks/useTable'
import { Item, MappingTableColumn } from '@/types'
import {
  Table,
  TableBody,
  TableCell,
  TableCellLayout,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableRowProps,
} from '@fluentui/react-components'

const MappingTableColumns: MappingTableColumn[] = [
  { columnKey: 'mode', label: 'Mode' },
  { columnKey: 'host', label: 'Host' },
  { columnKey: 'hostip', label: 'HostIP' },
  { columnKey: 'hostport', label: 'HostPort' },
  { columnKey: 'rootingip', label: 'RootingIP' },
  { columnKey: 'rootingport', label: 'RootingPort' },
  { columnKey: 'active', label: 'Active' },
]

const MappingTableRowProps: TableRowProps = {}

//////////////////////////////////////
// Component
//////////////////////////////////////
export function MappingTable() {
  const [dialogOpen, switchDialogOpen] = useDialogOpen()
  const { tableItems, useTableItems } = useTable()

  function MappingTableCellClickHandle(index: number, item: Item, label: string) {
    if (!(label == 'switch')) {
      switchDialogOpen('edit', index, item)
    }
  }

  function MappingTableCellComponent(index: number, item: Item, label: string) {
    return (
      <TableCell onClick={() => MappingTableCellClickHandle(index, item, label)}>
        <TableCellLayout>{label}</TableCellLayout>
      </TableCell>
    )
  }

  return (
    <Table arial-label='mapping table'>
      <TableHeader>
        <TableRow>
          {MappingTableColumns.map((column) => (
            <TableHeaderCell key={column.columnKey}>{column.label}</TableHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableItems.map((item, index) => (
          <TableRow key={index} {...MappingTableRowProps}>
            {MappingTableCellComponent(index, item, item.mode)}
            {MappingTableCellComponent(index, item, item.host)}
            {MappingTableCellComponent(index, item, item.hostip)}
            {MappingTableCellComponent(index, item, item.hostport)}
            {MappingTableCellComponent(index, item, item.rootingip)}
            {MappingTableCellComponent(index, item, item.rootingport)}
            <TableCell onClick={() => MappingTableCellClickHandle(index, item, 'switch')}>
              <TableCellLayout>
                <ActiveSwitch active={item.active} />
              </TableCellLayout>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
