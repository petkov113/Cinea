import axios from "axios";

export default class Movie {
  constructor(id) {
    this.id = id;
  }

  async getMovie() {
    try {
      let res = await axios(
        `${process.env.PROXY}http://www.omdbapi.com/?i=${this.id}&apikey=${process.env.KEY}`
      );
      this.title = res.data.Title;
      this.country = res.data.Country;
      this.year = res.data.Year;
      this.genre = res.data.Genre;
      this.director = res.data.Director;
      this.actors = res.data.Actors;
      this.plot = res.data.Plot;
      this.poster = res.data.Poster;
      this.imdbRating = this.addColor(res.data.imdbRating);
      this.RTRating = this.findRTRating(res);
      this.MSRating = this.addColor(res.data.Metascore);
    } catch (e) {
      console.log(e);
    }
  }

  findRTRating(obj) {
    if (obj.data.Ratings[1]) return this.addColor(obj.data.Ratings[1].Value);
    else return ["—", "lightgray"];
  }

  addColor(rating) {
    if (rating === "N/A") {
      return ["—", "lightgray"];
    } else {
      let number = +rating[0];

      if (number >= 7) return [rating, "MediumSeaGreen"];
      else if (number >= 5 && number <= 7) return [rating, "orange"];
      else return [rating, "red"];
    }
  }
}
