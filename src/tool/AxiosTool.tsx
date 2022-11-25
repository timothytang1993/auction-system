import axios from "axios";

function AxiosGet(url: string) {
  return axios
    .get(url)
    .then(function (response) {
      // handle success
      console.log(response);
      return response;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      return error;
    })
    .finally(function () {
      // always executed
    });
}

function AxiosPost(url: string, request: object) {
  return axios
    .post(url, request)
    .then(function (response) {
      console.log(response);
      return response;
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });
}

export default AxiosPost;

export { AxiosGet };
