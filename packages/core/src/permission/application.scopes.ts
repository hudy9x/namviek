export const APPLICATION_SCOPES = {
  GRID: {
    label: 'Grid scope',
    scopes: [
      { value: 'grid:create:row', label: 'Create single row' },
      { value: 'grid:create:row-many', label: 'Create multiple rows' },
      { value: 'grid:delete:row', label: 'Delete single row' },
      { value: 'grid:delete:row-many', label: 'Delete multiple rows' },
      { value: 'grid:update:row', label: 'Update row' }
    ]
  },
  MEMBER: {
    label: 'Member scope',
    scopes: [
      { value: 'member:create', label: 'Create member' },
      { value: 'member:remove', label: 'Remove member' }
    ]
  }
} 