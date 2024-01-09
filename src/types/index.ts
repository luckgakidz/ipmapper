export interface Item {
  mode: string
  host: string
  hostip: string
  hostport: string
  rootingip: string
  rootingport: string
  active: boolean
}

export interface TargetItem extends Item {
  targetIndex: number
}

export interface MappingTableColumn {
  columnKey: string
  label: string
}

export interface MappingTableCellSwitch {
  checked: boolean
}
