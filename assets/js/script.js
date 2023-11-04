const reqUrl = "api.openweathermap.org/data/2.5/forecast?lat=44&lon=11&appid=f6eb6271b9295e567afce5c507e2465d";

function apiObjGrabber(link) {
  fetch(link).then(function (response) {
    return response.json();
  }).then(function (data) {
    console.log(data);  /////////////////// Test
  });
}

apiObjGrabber(reqUrl);