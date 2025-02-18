import { ProjectTemplate } from "../types/project"
import { FieldType } from "@prisma/client"



export const PROJECT_TEMPLATES: ProjectTemplate[] = [
  {
    id: 'project-tracker',
    name: 'Project Tracker',
    description: 'Track projects, tasks, clients and team members',
    icon: '📊',
    gridCollections: [
      {
        title: 'Projects',
        fields: [
          { name: 'Project Name', type: FieldType.TEXT },
          {
            name: 'Status', type: FieldType.SELECT, config: {
              options: [
                { id: 1, order: 1, value: 'In Progress', color: '#2563eb' },
                { id: 2, order: 2, value: 'Completed', color: '#16a34a' },
                { id: 3, order: 3, value: 'On Hold', color: '#ca8a04' }
              ]
            }
          },
          { name: 'Due Date', type: FieldType.DATE },
          {
            name: 'Team Lead', type: FieldType.CONNECTOR, config: {
              grid: 'Team',
              displayedField: 'Name'
            }
          }
        ],
        sampleData: [
          {
            'Project Name': 'Website Redesign',
            'Status': 'In Progress',
            'Due Date': '2024-06-30',
            'Client': 'Acme Corp',
            'Team Lead': 'Sarah Johnson'
          },
          {
            'Project Name': 'Mobile App Development',
            'Status': 'On Hold',
            'Due Date': '2024-07-15',
            'Client': 'TechStart Inc',
            'Team Lead': 'John Smith'
          },
          {
            'Project Name': 'E-commerce Platform',
            'Status': 'In Progress',
            'Due Date': '2024-08-30',
            'Client': 'Shop Direct',
            'Team Lead': 'Michael Chen'
          },
          {
            'Project Name': 'CRM Integration',
            'Status': 'Completed',
            'Due Date': '2024-05-01',
            'Client': 'Global Services Ltd',
            'Team Lead': 'Emily Brown'
          },
          {
            'Project Name': 'Data Analytics Dashboard',
            'Status': 'In Progress',
            'Due Date': '2024-09-15',
            'Client': 'DataCo Analytics',
            'Team Lead': 'David Wilson'
          }
        ]
      },
      {
        title: 'Tasks',
        fields: [
          { name: 'Task Name', type: FieldType.TEXT },
          {
            name: 'Project', type: FieldType.CONNECTOR, config: {
              grid: 'Projects',
              displayedField: 'Project Name'
            }
          },
          {
            name: 'Status', type: FieldType.SELECT, config: {
              options: [
                { id: 1, order: 1, value: 'To Do', color: '#6b7280' },
                { id: 2, order: 2, value: 'In Progress', color: '#2563eb' },
                { id: 3, order: 3, value: 'Done', color: '#16a34a' }
              ]
            }
          },
          {
            name: 'Assignee', type: FieldType.CONNECTOR, config: {
              grid: 'Team',
              displayedField: 'Name'
            }
          },
          { name: 'Due Date', type: FieldType.DATE }
        ],
        sampleData: [
          {
            'Task Name': 'Design Homepage Mockup',
            'Status': 'In Progress',
            'Due Date': '2024-05-15',
            'Project': 'Website Redesign',
            'Assignee': 'Sarah Johnson'
          },
          {
            'Task Name': 'Setup Development Environment',
            'Status': 'Done',
            'Due Date': '2024-05-01',
            'Project': 'Mobile App Development',
            'Assignee': 'John Smith'
          },
          {
            'Task Name': 'User Authentication Implementation',
            'Status': 'To Do',
            'Due Date': '2024-05-30',
            'Project': 'E-commerce Platform',
            'Assignee': 'David Wilson'
          },
          {
            'Task Name': 'Database Schema Design',
            'Status': 'In Progress',
            'Due Date': '2024-06-15',
            'Project': 'CRM Integration',
            'Assignee': 'John Smith'
          },
          {
            'Task Name': 'API Integration',
            'Status': 'To Do',
            'Due Date': '2024-06-30',
            'Project': 'Data Analytics Dashboard',
            'Assignee': 'David Wilson'
          }
        ]
      },
      {
        title: 'Team',
        fields: [
          { name: 'Name', type: FieldType.TEXT },
          {
            name: 'Role', type: FieldType.SELECT, config: {
              options: [
                { id: 1, order: 1, value: 'Developer', color: '#2563eb' },
                { id: 2, order: 2, value: 'Designer', color: '#9333ea' },
                { id: 3, order: 3, value: 'Product Manager', color: '#16a34a' },
                { id: 4, order: 4, value: 'QA Engineer', color: '#ca8a04' }
              ]
            }
          },
          { name: 'Email', type: FieldType.EMAIL },
          {
            name: 'Projects', type: FieldType.CONNECTOR, config: {
              grid: 'Projects',
              displayedField: 'Project Name'
            }
          },
          {
            name: 'Status', type: FieldType.SELECT, config: {
              options: [
                { id: 1, order: 1, value: 'Active', color: '#16a34a' },
                { id: 2, order: 2, value: 'On Leave', color: '#ca8a04' },
                { id: 3, order: 3, value: 'Inactive', color: '#6b7280' }
              ]
            }
          }
        ],
        sampleData: [
          {
            'Name': 'John Smith',
            'Role': 'Developer',
            'Email': 'john.smith@company.com',
            'Status': 'Active',
            'Projects': ['Mobile App Development', 'CRM Integration']
          },
          {
            'Name': 'Sarah Johnson',
            'Role': 'Designer',
            'Email': 'sarah.johnson@company.com',
            'Status': 'Active',
            'Projects': ['Website Redesign']
          },
          {
            'Name': 'Michael Chen',
            'Role': 'Product Manager',
            'Email': 'michael.chen@company.com',
            'Status': 'Active',
            'Projects': ['E-commerce Platform']
          },
          {
            'Name': 'Emily Brown',
            'Role': 'QA Engineer',
            'Email': 'emily.brown@company.com',
            'Status': 'On Leave',
            'Projects': ['CRM Integration']
          },
          {
            'Name': 'David Wilson',
            'Role': 'Developer',
            'Email': 'david.wilson@company.com',
            'Status': 'Active',
            'Projects': ['Data Analytics Dashboard', 'E-commerce Platform']
          }
        ]
      }
    ]
  },
  {
    id: 'swot-analysis',
    name: 'SWOT Analysis',
    description: 'Analyze Strengths, Weaknesses, Opportunities, and Threats',
    icon: '📈',
    gridCollections: [
      {
        title: 'Factors',
        fields: [
          { name: 'Factor', type: FieldType.TEXT },
          {
            name: 'Category', type: FieldType.SELECT, config: {
              options: [
                { id: 1, order: 1, value: 'Strength', color: '#16a34a' },
                { id: 2, order: 2, value: 'Weakness', color: '#dc2626' },
                { id: 3, order: 3, value: 'Opportunity', color: '#2563eb' },
                { id: 4, order: 4, value: 'Threat', color: '#ca8a04' }
              ]
            }
          },
          {
            name: 'Impact', type: FieldType.SELECT, config: {
              options: [
                { id: 1, order: 1, value: 'High', color: '#dc2626' },
                { id: 2, order: 2, value: 'Medium', color: '#ca8a04' },
                { id: 3, order: 3, value: 'Low', color: '#16a34a' }
              ]
            }
          }
        ],
        sampleData: [
          {
            'Factor': 'Strong Brand Recognition',
            'Category': 'Strength',
            'Impact': 'High'
          },
          {
            'Factor': 'Limited Online Presence',
            'Category': 'Weakness',
            'Impact': 'Medium'
          },
          {
            'Factor': 'Emerging Market Expansion',
            'Category': 'Opportunity',
            'Impact': 'High'
          },
          {
            'Factor': 'Increasing Competition',
            'Category': 'Threat',
            'Impact': 'High'
          },
          {
            'Factor': 'Skilled Workforce',
            'Category': 'Strength',
            'Impact': 'Medium'
          }
        ]
      },
      {
        title: 'Actions',
        fields: [
          { name: 'Action', type: FieldType.TEXT },
          {
            name: 'Status', type: FieldType.SELECT, config: {
              options: [
                { id: 1, order: 1, value: 'Planned', color: '#6b7280' },
                { id: 2, order: 2, value: 'In Progress', color: '#2563eb' },
                { id: 3, order: 3, value: 'Completed', color: '#16a34a' }
              ]
            }
          },
          { name: 'Due Date', type: FieldType.DATE }
        ],
        sampleData: [
          {
            'Action': 'Develop Social Media Strategy',
            'Status': 'In Progress',
            'Due Date': '2024-04-30'
          },
          {
            'Action': 'Market Research in Asia',
            'Status': 'Planned',
            'Due Date': '2024-06-15'
          },
          {
            'Action': 'Employee Training Program',
            'Status': 'Completed',
            'Due Date': '2024-03-31'
          },
          {
            'Action': 'Competitive Analysis',
            'Status': 'In Progress',
            'Due Date': '2024-05-15'
          },
          {
            'Action': 'Brand Awareness Campaign',
            'Status': 'Planned',
            'Due Date': '2024-07-01'
          }
        ]
      }
    ]
  }
] 
