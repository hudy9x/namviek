import { FieldType } from "@prisma/client"

export interface TemplateField {
  name: string
  type: FieldType
  config?: any
  width?: number
}

export interface TemplateGridCollection {
  title: string
  fields: TemplateField[]
  sampleData?: Record<string, any>[]
}

export interface ProjectTemplate {
  id: string
  name: string
  description: string
  icon?: string
  gridCollections: TemplateGridCollection[]
} 