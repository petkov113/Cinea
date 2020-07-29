import axios from "axios";

export default class Search {
  constructor(name) {
    this.name = name;
  }

  async getResults() {
    try {
      const request = await axios(
        `${process.env.PROXY}http://www.omdbapi.com/?s=${this.name}&apikey=${process.env.KEY}`
      );
      this.data = request.data.Search;
    } catch (error) {
      console.log(`not found: ${error}`);
    }
  }
}
