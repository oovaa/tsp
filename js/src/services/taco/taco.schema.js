// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const tacoSchema = {
  $id: 'Taco',
  type: 'object',
  additionalProperties: false,
  required: ['id', 'text'],
  properties: {
    id: { type: 'number' },
    text: { type: 'string' }
  }
}
export const tacoValidator = getValidator(tacoSchema, dataValidator)
export const tacoResolver = resolve({})

export const tacoExternalResolver = resolve({})

// Schema for creating new data
export const tacoDataSchema = {
  $id: 'TacoData',
  type: 'object',
  additionalProperties: false,
  required: ['text'],
  properties: {
    ...tacoSchema.properties
  }
}
export const tacoDataValidator = getValidator(tacoDataSchema, dataValidator)
export const tacoDataResolver = resolve({})

// Schema for updating existing data
export const tacoPatchSchema = {
  $id: 'TacoPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...tacoSchema.properties
  }
}
export const tacoPatchValidator = getValidator(tacoPatchSchema, dataValidator)
export const tacoPatchResolver = resolve({})

// Schema for allowed query properties
export const tacoQuerySchema = {
  $id: 'TacoQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(tacoSchema.properties)
  }
}
export const tacoQueryValidator = getValidator(tacoQuerySchema, queryValidator)
export const tacoQueryResolver = resolve({})
