//asignar el nombre y version al cache
const CACHE_NAME ="v1_cache_PWA";

//Ficheros quen se van a estar guardando en la aplicacion
//que se van a ver offline
var urlsToCache=[
    './',
    './src/icons/favicon.png',
    './src/icons/favicon16px.png',
    './src/icons/favicon32px.png',
    './src/icons/favicon64px.png',
    './src/icons/favicon96px.png',
    './src/icons/favicon128px.png',
    './src/icons/favicon192px.png',
    './src/icons/favicon256px.png',
    './src/icons/favicon384px.png',
    './src/icons/favicon512px.png',
    './src/icons/favicon1024px.png',
    './src/icons/img/autosenrenta.jpeg',
    './src/icons/img/download.jpeg',
    './src/icons/img/siia.jpeg',
    './stylesheet/index.css'
]

//install del sw

self.addEventListener('install',e=>{
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache =>{
                return cache.addAll(urlsToCache)
                                    .then(()=>{
                                        self.skipwaiting();
                                    })
                                    .catch(err=>{
                                        console.log('No se ha cargado la cache',err)
                                    })
            })
    )
})

//Evento activate activa el sw y permite que trabaje offline

self.addEventListener('activate',e =>{
    //anadimos todos lo elementos en la cache
    const cacheWhiteList = [CACHE_NAME];
    e.waitUntil(
        caches.keys()
            .then(cacheNames =>{
                return Promise.all(
                    cacheNames.map(cacheName=>{
                        if(cacheWhiteList.indexOf(cacheName) === -1){
                            //borrar los elementos que ya no esten en la cache o no se necesitan
                            return caches.delete(cacheName)
                        }
                    })
                );
            }
        ).then(()=>{
            //activar el cache en el dispositivo
            self.clients.claim()
            }
        )
    )
})

self.addEventListener('fetch',e=>{
    e.respondWith(
        caches.match(e.request)
                .then(res =>{
                    if(res){
                        //devuelvo datos desde cache
                        return res;
                    }
                    return fetch(e.request)
                })
    )
})