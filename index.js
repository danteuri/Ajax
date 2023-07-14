function solicitudAJAX(params) {
  var url = "https://pokeapi.co/api/v2/pokemon/";
  let tarjetas = document.querySelector("#nPokemon");
  var objXMLHttpRequest = new XMLHttpRequest();

  objXMLHttpRequest.onreadystatechange = function () {
    if (objXMLHttpRequest.readyState === 4) {
      if (objXMLHttpRequest.status === 200) {
        let json = JSON.parse(objXMLHttpRequest.responseText);
        tarjetas.data = json;
        for (let i = 0; i < json.results.length; i++) {
          buscarPorURL(json.results[i].url);
        }
      } else {
        alert("Error Code: " + objXMLHttpRequest.status);
        alert("Error Message: " + objXMLHttpRequest.statusText);
      }
    }
  };
  objXMLHttpRequest.open("GET", url + '?limit:500');
  objXMLHttpRequest.send();
}

function buscarPorURL(urlPokemon) {
  var objXMLHttpRequest = new XMLHttpRequest();
  let div = document.querySelector("#ConteinerCard");

  objXMLHttpRequest.onreadystatechange = function () {
    if (objXMLHttpRequest.readyState === 4) {
      if (objXMLHttpRequest.status === 200) {
        let json = JSON.parse(objXMLHttpRequest.responseText);
        let nombre = json.name;
        let uriImg = json.sprites.other.home.front_default;

        let html =
          `<div class="card" style="width: 18rem;">
  <img src="` +
          uriImg +
          `" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">` +
          nombre +
          `</h5>
    <p class="card-text"></p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>`;
        div.appendChild(html);
        console.log(div);
      } else {
        alert("Error Code: " + objXMLHttpRequest.status);
        alert("Error Message: " + objXMLHttpRequest.statusText);
      }
    }
  };
  objXMLHttpRequest.open("GET", urlPokemon);
  objXMLHttpRequest.send();
}

function buscar2() {
  let tarjetas = document.querySelector("#ConteinerCard");
  var data = document.querySelector("#nPokemon").data;
  var busqueda = document.querySelector("#nPokemon").value - 1;
  var url = data.results[busqueda].url;

  if (busqueda >= 0) {
    var objXMLHttpRequest = new XMLHttpRequest();

    objXMLHttpRequest.onreadystatechange = function () {
      if (objXMLHttpRequest.readyState === 4) {
        if (objXMLHttpRequest.status === 200) {
          let json = JSON.parse(objXMLHttpRequest.responseText);
          let nombre = json.name;
          let uriImg = json.sprites.other.home.front_default;
          let vidapokemon = json.stats[0].base_stat;
          let velocidad = json.stats[5].base_stat;
          let nombredos= nombre.charAt(0).toUpperCase() + nombre.slice(1);
          let html =
          `<div class="card" style="width: 18rem;">
            <img src="` + uriImg + `" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">Name: ` + nombredos + `<br></h5>
              <h5 class="card-tittle">Speed: ` + velocidad +`</h5>
              <h5 class="card-tittle"> HP: ` + vidapokemon +`</h5>
              <p class="card-text"></p><br>
              </h5><a href="https://www.wikidex.net/wiki/` + nombre + `" class="btn btn-primary">Wiki del pokemon</a>
            </div>
        </div>`;
          tarjetas.innerHTML = html;
        } else {
          alert("Error Code: " + objXMLHttpRequest.status);
          alert("Error Message: " + objXMLHttpRequest.statusText);
        }
      }
    };
    objXMLHttpRequest.open("GET", url);
    objXMLHttpRequest.send();
  } else {
    alert("DEbe ingresar un numero de 1 a 20 para obtener un Pokemon valido");
  }
}
