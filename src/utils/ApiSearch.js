class ApiSearch {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  Search() {
    this.label = this.queryStr.label
      ? { label: { $regex: this.queryStr.label, $options: "i" } }
      : {};
    this.query = this.query.find(this.label);
    return this;
  }
}
module.exports = ApiSearch;
