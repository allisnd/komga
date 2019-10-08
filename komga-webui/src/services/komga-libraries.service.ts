import { AxiosInstance } from 'axios'

const API_LIBRARIES = '/api/v1/libraries'

export default class KomgaLibrariesService {
  private http: AxiosInstance;

  constructor (http: AxiosInstance) {
    this.http = http
  }

  async getLibraries (): Promise<LibraryDto[]> {
    try {
      return (await this.http.get(API_LIBRARIES)).data
    } catch (e) {
      let msg = 'An error occurred while trying to retrieve libraries'
      if (e.response.data.message) {
        msg += `: ${e.response.data.message}`
      }
      throw new Error(msg)
    }
  }

  async postLibrary (library: LibraryCreationDto): Promise<LibraryDto> {
    try {
      return (await this.http.post(API_LIBRARIES, library)).data
    } catch (e) {
      let msg = `An error occurred while trying to add library '${library.name}'`
      if (e.response.data.message) {
        msg += `: ${e.response.data.message}`
      }
      throw new Error(msg)
    }
  }

  async deleteLibrary (library: LibraryDto) {
    try {
      await this.http.delete(`${API_LIBRARIES}/${library.id}`)
    } catch (e) {
      let msg = `An error occurred while trying to delete library '${library.name}'`
      if (e.response.data.message) {
        msg += `: ${e.response.data.message}`
      }
      throw new Error(msg)
    }
  }
}