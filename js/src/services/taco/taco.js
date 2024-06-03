// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  tacoDataValidator,
  tacoPatchValidator,
  tacoQueryValidator,
  tacoResolver,
  tacoExternalResolver,
  tacoDataResolver,
  tacoPatchResolver,
  tacoQueryResolver
} from './taco.schema.js'
import { TacoService, getOptions } from './taco.class.js'

export const tacoPath = 'taco'
export const tacoMethods = ['find', 'get', 'create', 'patch', 'remove']

export * from './taco.class.js'
export * from './taco.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const taco = (app) => {
  // Register our service on the Feathers application
  app.use(tacoPath, new TacoService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: tacoMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(tacoPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(tacoExternalResolver), schemaHooks.resolveResult(tacoResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(tacoQueryValidator), schemaHooks.resolveQuery(tacoQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(tacoDataValidator), schemaHooks.resolveData(tacoDataResolver)],
      patch: [schemaHooks.validateData(tacoPatchValidator), schemaHooks.resolveData(tacoPatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
