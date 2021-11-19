// declare song values
let song;
let playSong;

// spotify client crede
const clientId="314d672abbde487898a52d7a84779f6b";
const clientSecret="673363fd4ed34c7090ecde4f963464ae";

const getToken = async () => {
    const result = await fetch(`https://accounts.spotify.com/api/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ":" + clientSecret)
        },
        body: 'grant_type=client_credentials'

    });

    //Access the data given by the response
    const data = await result.json();
    console.log(result)
    console.log(data)
    return data.access_token
}

// Function to get song info when the image is clicked
/**
 * @param img_index
 * @param item_index
 * 
 * function gets song from spotify using the image index from our gallery
 * then it finds th correct item_index of the JSON response object from Spotify
 * which will produce a prebiew url that will be used to play a song from the soundtrack
 * 
 */

async function clickedEvent(img_index, item_index){
    //get track name
    let track = document.getElementsByTagName('img')[img_index].attributes[1].value;
    
    //get token
    let token = await getToken();

    let headers = new Headers([
        ['Content-Type', 'application/json'],
        ['Accept', 'application/json'],
        ['Authorization', `Bearer ${token}`]
    ]);

    let request = new Request(`https://api.spotify.com/v1/search?q=${track}&type=track&limit=15`, {
        method: 'GET',
        headers: headers  //from line 45
    });

    
    let result = await fetch(request);
    console.log(result)

    let response = await result.json();
    console.log(response)
    song = response.tracks.items[item_index].preview_url

    //TODO: Add a songSnippet function to play the selected song
    if(playSong){
        stopSnippet();
    }
    songSnippet(song)
}

/** 
 * switch cases between the input we get
 * 
 * @param id
 * @param event
 * 
 * id = image id for gallery image
 * event= mouse event given by the cation of our user
 * 
 * function produces songs from the clickedEvent based on
 * the image index
 */

function getSong(id, event){
    event.stopPropagation();
    switch(id){
        case 'fig1':{
            clickedEvent(0,0)
            break;
        }
        case 'fig2':{
            clickedEvent(1,0)
            break;
        }
        case 'fig3':{
            clickedEvent(2,9)
            break;
        }
        case 'fig4':{
            clickedEvent(3,6)
            break;
        }
        case 'fig5':{
            clickedEvent(4,1)
            break;
        }
        case 'fig6':{
            clickedEvent(5,3)
            break;
        }
        case 'fig7': {
            clickedEvent(6,0)
            break;
        }
        case 'fig8': {
            clickedEvent(7,5)
            break;
        }
        case 'fig9': {
            clickedEvent(8,7)
            break;
        }
        case 'fig10': {
            clickedEvent(9,1)
            break;
        }
    }
}

/**
 * @param url
 * 
 * url= song preview_url
 * 
 * function will return an audio clip given by the preview_url
 */
function songSnippet(url){
    playSong = new Audio(url);
    return playSong.play()
}

/**
 * NO PARAMS
 * 
 * function reutnrs the event to stop the song snippet
 */
function stopSnippet(){
    return playSong.pause();
}