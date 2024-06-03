import { taco } from './taco/taco.js'

export const services = (app) => {
  app.configure(taco)

  // All services will be registered here
}
