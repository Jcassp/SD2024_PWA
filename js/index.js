if('serviceWorker' in navigator){
    console.log('si tiene sw')

    navigator.serviceWorker.register('./js/serviceworker.js')
    .then(res => console.log('serviceWorker cargado correctamente',res))
    .catch(err => console.log('serviceWorker no se pudo registrar',err))
}