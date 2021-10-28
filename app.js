const searchInput = document.getElementById('search-input')
const btnSearch = document.getElementById('btn-search')


//getting data
let searchText = '';
let fullData = null;
let lyrics = '';

function getData() {
    let data = fetch(`https://api.lyrics.ovh/suggest/:${searchText}`)
        .then(res => res.json())
        .then(data => {
            let refineData = data.data

            fullData = refineData;


        })
    // .then (data =>  console.log("done"))
    return data;
}



async function getSearchData() {
    searchText = searchInput.value
    // console.log(searchText)
    await getData()
    // await console.log(fullData.data[0])
    await builtDom()

}

const showLyric = (id) => {
    const idElement = document.getElementById(`${id}`)
    const currentData = fullData.find(data => data.id == id);
    let albumName, albumAuthor;
    albumName = currentData.title;
    albumAuthor = currentData.artist.name
    fetch(`https://api.lyrics.ovh/v1/:${albumAuthor}/:${albumName}`)
        .then(res => res.json())
        .then(data => {
            // let refineData = data.data

            lyrics = data;
            if (lyrics.lyrics == undefined) {
                idElement.innerHTML = "No Lyrics Found"
            } else {
                idElement.innerHTML = lyrics.lyrics
            }
            // console.log(lyrics.lyrics)
        })

    // console.log("in show lyric", albumName,albumAuthor)
}


function builtDom() {
    const resultContainer = document.getElementById('result-container')

    resultContainer.innerHTML = '';
    // console.log("iam here", fullData)

    for (let i = 0; i < fullData.length; i++) {
        // let { description, severity, assignedTo, status } = fullData[i];
        let albumName, albumAuthor, title, id;
        albumName = fullData[i].album.title;
        albumAuthor = fullData[i].artist.name
        title = fullData[0].title
        id = fullData[i].id
        // console.log(albumName, albumAuthor);

        resultContainer.innerHTML += ` 
        <div class="search-result col-md-8 mx-auto py-4">
         <div class="single-result row align-items-center my-3 p-3">
          <div class="col-md-9">
          <h3 class="lyrics-name">${title}</h3>
              <h5 class="lyrics-name">${albumName}</h5>
              <p class="author lead">Album by <span>${albumAuthor}</span></p>
          </div>
          <div class="col-md-3 text-md-right text-center">
              <button class="btn btn-success"
              onclick="showLyric(${id})"
              >Get Lyrics</button>
         </div>
         </div>
         <p id="${id}"> <p>
        </div>`;
    }






}


//Event listener 
btnSearch.addEventListener('click', getSearchData)
