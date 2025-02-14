CUSTOM FIELDS AND FILTERING SYSTEM
=================================

1. DATABASE SCHEMA
-----------------
Core Models:

Field Model (Columns):
- id: string
- type: FieldType (TEXT, NUMBER, DATE, SELECT, etc.)
- name: string
- config: Json (field-specific configuration)
- data: Json (field-specific data like select options)

Grid Model (Rows):
- id: string
- customFields: Json (stores values as { fieldId: value })


2. FRONTEND ARCHITECTURE
-----------------------

2.1 Custom Fields (_features/CustomField/)
----------------------------------------
Purpose: Field definition and management

Components:
- CustomFieldModal: Main configuration modal
- CreateFieldFactory: Type-specific configuration forms
- CustomFieldDisplay: UI configuration (resize, sort, actions)
- CustomFieldInput: Type-specific value display/edit

2.2 Advanced Filtering (_features/FilterAdvanced/)
-----------------------------------------------
Purpose: Dynamic query building

Structure:
{
  condition: "AND" | "OR",
  list: [
    {
      type: FieldType,
      id: string,
      operator: string,
      value: string,
      subValue?: string
    }
  ]
}

Components:
- FilterAdvancedModal: Main filter UI
- FilterValue: Type-specific filter inputs
- FieldOperator: Type-specific operators

Field Type Operators:
- Text: is, contains, doesn't contain
- Number: higher than, lower than, is even
- Date: before, after, within
- Select: contains, doesn't contain
- Person: contains, doesn't contain
- Checkbox: is, is empty

2.3 Data Fetching (_components/DataFetcher/)
------------------------------------------
Purpose: Data retrieval and updates

Context Interface:
{
  data: Grid[]
  cursor: string
  totalRecords: number
  isLoading: boolean
  hasNextPage: boolean
  deleteRow: (ids: string[]) => void
  updateCustomFields: (taskIds: string[], customFields: Record<string, any>) => void
}

Key Hooks:
- useTaskFetcher: Main data fetching
- useTaskUpdate: Field value updates
- useTaskAdd: New row creation


3. DATA FLOW
------------
1. User defines custom fields (Field model)
2. User creates filter criteria
3. DataFetcher uses criteria to fetch Grid data
4. Grid UI displays data using CustomFieldInput
5. Updates sync back to database


4. IMPLEMENTATION EXAMPLES
-------------------------

Creating a Field:
const numberField = {
  type: FieldType.NUMBER,
  name: "Price",
  config: { 
    format: "us-dollar",
    shownAs: "number"
  }
}

Creating a Filter:
const filter = {
  condition: "AND",
  list: [{
    type: FieldType.NUMBER,
    id: "field_id",
    operator: "higher than",
    value: "100"
  }]
}

Using DataFetcher:
<DataFetcher 
  filter={filter}
  limit={20}
  orderBy={{ id: 'asc' }}
>
  <GridComponent />
</DataFetcher>

5. KEY FEATURES
--------------
- Dynamic field types with specific configurations
- Advanced filtering with type-specific operators
- Efficient data fetching with pagination
- Real-time updates
- Bulk operations
- UI customization (width, order)
- Filter persistence per project 