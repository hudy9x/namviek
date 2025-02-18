import { ProjectTemplate } from "@namviek/core/types/project"

interface TemplateSelectorProps {
  templates: ProjectTemplate[]
  value: string | null
  onChange: (templateId: string) => void
}

export default function TemplateSelector({ templates, value, onChange }: TemplateSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {templates.map((template) => (
        <div
          key={template.id}
          className={`p-4 border rounded-lg cursor-pointer hover:border-indigo-500 transition-colors ${
            value === template.id ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-gray-200 dark:border-gray-700'
          }`}
          onClick={() => onChange(template.id)}
        >
          <div className="flex items-start gap-3">
            <div className="text-2xl">{template.icon}</div>
            <div>
              <h3 className="font-medium">{template.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {template.description}
              </p>
              <div className="mt-3">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Includes:
                </span>
                <div className="mt-1 flex flex-wrap gap-2">
                  {template.gridCollections.map((collection) => (
                    <span
                      key={collection.title}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs"
                    >
                      {collection.title}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 