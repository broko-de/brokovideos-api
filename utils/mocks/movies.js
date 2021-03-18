const moviesMock = [{"id":"e6f2b3141a494c998a941968","title":"Drum, The (Drums)","year":2004,"cover":"http://dummyimage.com/170x122.png/5fa2dd/ffffff","description":"Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.","duration":1888,"contentRaiting":"R","source":"https://home.pl/at/nunc.html","tags":["Comedy|Sci-Fi|Thriller","Drama","Crime|Drama|Film-Noir","Comedy","Horror"]},
{"id":"fbbae1c08bc449af9e76badb","title":"Acid House, The","year":1997,"cover":"http://dummyimage.com/142x177.bmp/ff4444/ffffff","description":"In congue. Etiam justo. Etiam pretium iaculis justo.","duration":2002,"contentRaiting":"NC-17","source":"https://meetup.com/posuere/cubilia/curae/nulla.jsp","tags":["Comedy|Drama|War","Drama|Fantasy|Horror|Romance","Drama","Romance","Comedy"]},
{"id":"aeb8159b3b9846ebb9ddbd2b","title":"Everybody's Got Somebody... Not Me","year":2003,"cover":"http://dummyimage.com/229x230.jpg/ff4444/ffffff","description":"Fusce consequat. Nulla nisl. Nunc nisl.","duration":1987,"contentRaiting":"PG","source":"http://kickstarter.com/sollicitudin/mi/sit/amet/lobortis/sapien/sapien.aspx","tags":["Horror|Thriller","Comedy|Horror"]},
{"id":"c33a9efbd4904b21947dc357","title":"Myra Breckinridge","year":1989,"cover":"http://dummyimage.com/221x128.bmp/ff4444/ffffff","description":"Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.","duration":1955,"contentRaiting":"R","source":"https://sogou.com/maecenas/leo.png","tags":["Documentary|Drama"]},
{"id":"fe5f789db47f4073895e3fef","title":"Jerichow","year":2008,"cover":"http://dummyimage.com/175x164.bmp/cc0000/ffffff","description":"Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.","duration":1933,"contentRaiting":"PG","source":"http://salon.com/lorem/integer/tincidunt/ante.xml","tags":["(no genres listed)","Comedy|Drama","Drama|Sci-Fi","Horror|Mystery"]},
{"id":"d181e00e910143a7937c4dd7","title":"World Traveler","year":1987,"cover":"http://dummyimage.com/219x246.jpg/dddddd/000000","description":"Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.","duration":2020,"contentRaiting":"R","source":"http://chicagotribune.com/mi/pede/malesuada/in/imperdiet/et/commodo.aspx","tags":["Action|Adventure|Drama","Drama|Horror|Mystery"]},
{"id":"fe156cf43a194a519f1521fb","title":"Late Mathias Pascal, The (a.k.a. The Living Dead Man) (Feu Mathias Pascal)","year":2012,"cover":"http://dummyimage.com/176x195.png/5fa2dd/ffffff","description":"Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.","duration":2065,"contentRaiting":"R","source":"https://devhub.com/mauris.aspx","tags":["Drama","Comedy|Drama","Comedy|Romance"]},
{"id":"2777907d34874a679971ec05","title":"Absolon","year":2005,"cover":"http://dummyimage.com/129x212.jpg/cc0000/ffffff","description":"Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.","duration":1947,"contentRaiting":"NC-17","source":"http://qq.com/sit/amet/erat/nulla/tempus.html","tags":["Comedy|Drama|Romance"]},
{"id":"f24efef92c6e4aceb803cd89","title":"Dinotopia: Quest for the Ruby Sunstone","year":2012,"cover":"http://dummyimage.com/122x144.bmp/ff4444/ffffff","description":"Phasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.","duration":2070,"contentRaiting":"R","source":"https://gmpg.org/eget/eleifend/luctus/ultricies/eu/nibh/quisque.aspx","tags":["Crime|Drama|Thriller"]},
{"id":"4300b55977ce4a7a94700c5c","title":"This Christmas","year":2012,"cover":"http://dummyimage.com/129x140.bmp/5fa2dd/ffffff","description":"Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.","duration":2020,"contentRaiting":"PG-13","source":"https://cocolog-nifty.com/nonummy/integer/non/velit.jpg","tags":["Documentary","Comedy","Comedy|Crime|Horror|Thriller","Drama","Documentary"]}];

/*
    Metodo para filtrar los mocks por medio de un tag, se usar para test
*/
function filteredMoviesMocks(tag){
    return moviesMock.filter(movie => movie.tags.includes(tag));
}

/*
    Servicio creado para test para simular que devuelva un valor de acuedo a la petición
*/
class MoviesServiceMook{
    //Obtener todas las peliculas
    async getMovies(){
        return Promise.resolve(moviesMock);
    }
    //Obtener una pelicula
    async getMovie({movieId}){
        return Promise.resolve(moviesMock[0]);
    }
    //Crear una pelicula
    async createMovie(){
        return Promise.resolve(moviesMock[0].id);
    }

    //Editar una pelicula
    async updateMovie(){
        return Promise.resolve(moviesMock[0].id);
    }

    //Eliminar una pelicula
    async deleteMovie({movieId}){
        return Promise.resolve(moviesMock[0].id);
    }
}

module.exports = {
    moviesMock,
    filteredMoviesMocks,
    MoviesServiceMook
};
