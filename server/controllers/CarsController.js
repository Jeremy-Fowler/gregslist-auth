import { carsService } from '../services/CarsService'
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class CarsController extends BaseController {
  constructor() {
    super('api/cars')
    this.router
      .get('', this.getCars)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createCar)
      .put('/:carId', this.editCar)
      .delete('/:carId', this.removeCar)
  }

  async getCars(req, res, next) {
    try {
      const cars = await carsService.getCars(req.query)
      res.send(cars)
    } catch (error) {
      next(error)
    }
  }

  async createCar(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const car = await carsService.createCar(req.body)
      res.send(car)
    } catch (error) {
      next(error)
    }
  }

  async editCar(req, res, next) {
    try {
      const car = await carsService.editCar(req.params.carId, req.userInfo.id, req.body)
      res.send(car)
    } catch (error) {
      next(error)
    }
  }

  async removeCar(req, res, next) {
    try {
      const car = await carsService.removeCar(req.params.carId, req.userInfo.id)
      res.send(car)
    } catch (error) {
      next(error)
    }
  }
}
