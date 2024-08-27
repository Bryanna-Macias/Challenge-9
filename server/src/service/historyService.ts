class City {
  constructor(public name: string, public id: string) {}
}


import * as fs from 'fs';
import * as path from 'path';

class HistoryService {
  private filePath = path.resolve(__dirname, 'searchHistory.json');

  //searchHistory.json file
  private async read(): Promise<City[]> {
    try {
      const data = await fs.promises.readFile(this.filePath, 'utf-8');
      return JSON.parse(data) as City[];
    } catch (error) {
      console.error('Error reading file:', error);
      return [];
    }
  }

  //searchHistory.json file
  private async write(cities: City[]): Promise<void> {
    try {
      const data = JSON.stringify(cities, null, 2);
      await fs.promises.writeFile(this.filePath, data, 'utf-8');
    } catch (error) {
      console.error('Error writing file:', error);
    }
  }

  public async getCities(): Promise<City[]> {
    return await this.read();
  }

  public async addCity(cityName: string): Promise<void> {
    const cities = await this.read();
    const city = new City(cityName, new Date().toISOString());
    cities.push(city);
    await this.write(cities);
  }

  public async removeCity(id: string): Promise<void> {
    let cities = await this.read();
    cities = cities.filter(city => city.id !== id);
    await this.write(cities);
  }
}

export default new HistoryService();

  