(function () {
    console.log("rest API")
    // URL de l'API REST de WordPress
    let pays = "France";
    let url = `https://gftnth00.mywhc.ca/tim33/wp-json/wp/v2/posts?search=${pays}&_embed=true`;
    let bouton__pays = document.querySelectorAll(".bouton__pays");
    for(const bouton of bouton__pays){
        bouton.addEventListener("click", function(e){
            console.log(e.target.id);
            pays = e.target.id;
            url = `https://gftnth00.mywhc.ca/tim33/wp-json/wp/v2/posts?search=${pays}&_embed=true`;
            ActualiserURL(url);
            
        });
    }
    ActualiserURL(url);
    function ActualiserURL(url){
    let indexCarte = 0;
    // Effectuer la requête HTTP en utilisant fetch()
    fetch(url)
      .then(function (response) {
        // Vérifier si la réponse est OK (statut HTTP 200)
        if (!response.ok) {
          throw new Error(
            "La requête a échoué avec le statut " + response.status
          );
        }
  
        // Analyser la réponse JSON
        return response.json();
        console.log(response.json());
      })
      .then(function (data) {
        // La variable "data" contient la réponse JSON
        console.log(data);
        let restapi = document.querySelector(".contenu__restapi_pays");
        // Maintenant, vous pouvez traiter les données comme vous le souhaitez
        // Par exemple, extraire les titres des articles comme dans l'exemple précédent
          restapi.innerHTML = "";
          data.forEach(function (article) {
          let titre = article.title.rendered;
          let contenu = article.content.rendered;
          contenu = contenu.substring(0, 75) + "...";
          console.log(titre);
          let carte = document.createElement("div");
          carte.classList.add("restapi__pays");
          carte.style.animation = "apparitionCarte 1s ease "+ indexCarte/10 +"s forwards";
              
         carte.innerHTML = `
          <h2>${titre}</h2>
          `;
            if(article._embedded['wp:featuredmedia']){
                carte.innerHTML += `
                <div class="pays_contenu">
                <img src="${article._embedded['wp:featuredmedia'][0].source_url}" alt="${article._embedded['wp:featuredmedia'][0].alt_text}" class="img_pays"">
                <p>${contenu}</p>
                `;
                
            }
            else{
                carte.innerHTML += `
                <div class="pays_contenu">
                <img src="https://via.placeholder.com/150" alt="Image Introuvable" class="img_pays">
                <p>${contenu}</p>
                `;
            
            }
         restapi.appendChild(carte);
        });
      })
      .catch(function (error) {
        // Gérer les erreurs
        console.error("Erreur lors de la récupération des données :", error);
      });
    }
  })();