export function buildSelectQuery(path: string, operator: string, value: string) {
  switch (operator) {
    case 'contains':
      return { [path]: value }

    case 'doesn\'t contain':
      return { [path]: { $ne: value } }

    case 'is':
      return { [path]: value }

    case 'is not':
      return { [path]: { $ne: value } }

    case 'is empty':
      return {
        $or: [
          { [path]: null },
          { [path]: '' },
          { [path]: { $size: 0 } }
        ]
      }

    case 'is not empty':
      return {
        [path]: {
          $exists: true,
          $nin: ['', null, []]
        }
      }

    default:
      return { [path]: value }
  }
} 