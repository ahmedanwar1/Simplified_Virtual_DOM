export default class HttpRequest {
  #reqMethods = {
    GET: "GET",
    POST: "POST",
    DELETE: "DELETE",
    PUT: "PUT",
    PATCH: "PATCH",
  };

  #httpRequest;

  constructor() {
    this.#httpRequest = new XMLHttpRequest();
  }

  #sendRequest(url, method, payload) {
    return new Promise((resolve, reject) => {
      try {
        //when req status changes
        this.#httpRequest.onreadystatechange = () => {
          if (this.#httpRequest.readyState === XMLHttpRequest.DONE) {
            //if req is fulfilled successfully
            if (
              this.#httpRequest.status >= 200 &&
              this.#httpRequest.status < 300
            ) {
              resolve(JSON.parse(this.#httpRequest.responseText));
            } else {
              reject("Request failed! Unexpected error occured!");
            }
          }
        };

        this.#httpRequest.open(method, url);

        if (payload) {
          // set json body in req header
          this.#httpRequest.setRequestHeader(
            "Content-Type",
            "application/json"
          );
          this.#httpRequest.send(JSON.stringify(payload));
        } else {
          this.#httpRequest.send();
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  async get(url) {
    const res = await this.#sendRequest(url, this.#reqMethods.GET);
    return res;
  }

  async post(url, payload) {
    const res = await this.#sendRequest(url, this.#reqMethods.POST, payload);
    return res;
  }

  async put(url, payload) {
    const res = await this.#sendRequest(url, this.#reqMethods.PUT, payload);
    return res;
  }

  async patch(url, payload) {
    const res = await this.#sendRequest(url, this.#reqMethods.PATCH, payload);
    return res;
  }

  async delete(url, payload) {
    const res = await this.#sendRequest(url, this.#reqMethods.DELETE, payload);
    return res;
  }
}
