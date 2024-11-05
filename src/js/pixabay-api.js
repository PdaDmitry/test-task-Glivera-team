import axios from 'axios';

export class CustomServer {
  #numberOfUsers = 8;

  constructor() {
    this.KEY = '42263617-81d7156b9f7b88cd7b1016c2a';
    this.URL = 'https://pixabay.com';
    this.resources = '/api/';
  }

  async getCustomName(currentPage) {
    const params = {
      key: this.KEY,
      safesearch: true,
      per_page: this.#numberOfUsers,
      page: currentPage,
    };

    const url = `${this.URL}${this.resources}`;

    try {
      const response = await axios.get(url, { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response.status);
    }
  }

  get pageSize() {
    return this.#numberOfUsers;
  }
}
