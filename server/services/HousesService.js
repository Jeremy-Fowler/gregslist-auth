import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class HousesService {
  async getHouseById(houseId) {
    const house = await dbContext.Houses.findById(houseId)
    if (!house) {
      throw new BadRequest('Invalid House ID')
    }
    return house
  }

  async editHouse(houseId, userId, houseData) {
    const house = await this.getHouseById(houseId)
    if (userId !== house.creatorId.toString()) {
      throw new Forbidden('this is not your house, amigo')
    }
    house.bedrooms = houseData.bedrooms || house.bedrooms
    house.bathrooms = houseData.bathrooms || house.bathrooms
    house.levels = houseData.levels || house.levels
    house.imgUrl = houseData.imgUrl || house.imgUrl
    house.year = houseData.year || house.year
    house.price = houseData.price || house.price
    house.description = houseData.description || house.description
    await house.save()
    return house
  }

  async createHouse(houseData) {
    const house = await dbContext.Houses.create(houseData)
    return house
  }

  async getHouses(query) {
    const houses = await dbContext.Houses.find(query)
    return houses
  }
}

export const housesService = new HousesService()
