# API_atelier_technique

API Rest utilisé dans le cadre des ateliers techniques. 
L'API est hébergé sur Vercel. 

# Lien vers API : 
>
> api-2-atelier-technique-geodecouverte.vercel.app
>
> # GET
> 
> /images/all  : récupération de toutes les images
> 
> /image/<FileName.png>  : récupération / affichage d'une image
> 
> /images/city_filter/:city/:radius  : récupération de toutes les images avec trie sur la ville par rapport à un rayon
>
> /images/country_filter/:country/:radius  : récupération de toutes les images avec trie sur le pays par rapport à un rayon
>
> /images/radius_filter/:lat/:lng/:radius : récupération de toutes les images avec trie par rapport à un rayon
>
> /admin_support : interface administrateur de gestion de contenue
>
> # POST
>
> /images/add  :  ajout d'une image à la base de donnée
> * paramètres : req.body.image, req.body.lat, req.body.lng
> * retour : { reponse : < EXECUTION DE LA REQUETE >} -> (true si succès, false sinon)
> 
> 
>


# Format des données : 

```
"Images": 
    [
      {
        "id": < id >,
        "city": < city >,
        "country": < country >,
        "filename" : < filename >,
        "geometry" : {
            "lat" : < latitude >,
            "lng" : < longitude >,
        }
        "url": < url >,
        "date" : < date >
      },
      {...}
    ]
```
