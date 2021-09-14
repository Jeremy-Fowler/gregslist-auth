import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class CarsService {
  async getCarById(carId) {
    const car = await dbContext.Cars.findById(carId)
    if (!car) {
      throw new BadRequest('Invalid Car ID')
    }
    return car
  }

  async editCar(carId, userId, carData) {
    const car = await this.getCarById(carId)
    if (userId !== car.creatorId.toString()) {
      throw new Forbidden('No sir')
    }
    car.make = carData.make || car.make
    car.model = carData.model || car.model
    car.price = carData.price || car.price
    car.description = carData.description || car.description
    car.year = carData.year || car.year
    car.imgUrl = carData.imgUrl || car.imgUrl
    await car.save()
    return car
  }

  async createCar(carData) {
    const car = await dbContext.Cars.create(carData)
    return car
  }

  async getCars(query) {
    const cars = await dbContext.Cars.find(query)
    return cars
  }

  async removeCar(carId, userId) {
    const car = await this.getCarById(carId)
    if (userId !== car.creatorId.toString()) {
      throw new Forbidden('you messed up hombre')
    }
    await car.remove()
    return car
  }
}

export const carsService = new CarsService()
