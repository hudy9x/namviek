export function buildNumberQuery(path: string, operator: string, value: string) {
  const numValue = parseFloat(value)
  
  switch (operator) {
    case 'is':
      return { [path]: numValue }

    case 'is not':
      return { [path]: { $ne: numValue } }

    case 'contains':
      return { [path]: { $regex: value, $options: 'i' } }

    case 'doesn\'t contain':
      return { [path]: { $not: { $regex: value, $options: 'i' } } }

    case 'higher than':
      return { [path]: { $gt: numValue } }

    case 'higher than or equal':
      return { [path]: { $gte: numValue } }

    case 'lower than':
      return { [path]: { $lt: numValue } }

    case 'lower than or equal':
      return { [path]: { $lte: numValue } }

    case 'is even and whole':
      return {
        $and: [
          { [path]: { $mod: [2, 0] } },
          { [path]: { $type: "int" } }
        ]
      }

    case 'is empty':
      return {
        $or: [
          { [path]: null },
          { [path]: '' }
        ]
      }

    case 'is not empty':
      return {
        [path]: {
          $exists: true,
          $nin: ['', null]
        }
      }

    default:
      return { [path]: numValue }
  }
} 