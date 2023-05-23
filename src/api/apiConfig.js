const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/', 
    apiKey: '646620d809e4fc0230a8f4acf8866d0f',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig