const searchInput = document.getElementById('searchinput');
const searchBtn = document.getElementById('btn');
const  resultcontainer= document.getElementById('result-container');
const wordTitle = document.getElementById('wordTitle');
const wrodDescription = document.getElementById('wordDescription');
const audioBtn = document.getElementById('audioButton');

searchBtn.addEventListener('click',()=>
{search();}
)

searchInput.addEventListener('keyup',(event)=>{
   if(event.key==='Enter'){
     search();
   }
});

function search(){
    const  searchItem = searchInput.value.trim();
   
    if(searchItem === ''){
        alert('Please Enter a word to Search..')
        return;
    }
    fetchDictionaryData(searchItem);
}


async function fetchDictionaryData(searchTerm){
        
        try{
                const  response =await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`);
                if(!response.ok){
                    throw new  Error('Failed to fetch data'); 
                }
                const data= await  response.json();
                displayData(data);
        }
        catch(error){
            console.log(error);
            alert ('Error occured');
        }
}

function displayData(data){
       resultcontainer.style.display = 'block';

       const wordData = data[0]
       wordTitle.textContent = wordData.word;
       wrodDescription.innerHTML = `
       <ul>
       ${wordData.meanings.map(meaning =>
           `<li>
               <p><strong>Part Of Speech: </strong>${meaning.partOfSpeech}</p>
               <p><strong>Definition:</strong>${meaning.definitions[0].definition}</p>
           </li>`
       ).join('\n')}
   </ul>
       ` ;
}

audioBtn.addEventListener('click',()=>{
    const  searchItem = searchInput.value.trim();
   
    if(searchItem === ''){
        alert('Please Enter a word to Search..')
        return;
    }

    speak(searchItem);
})

function speak(searchItem){
    const speech = new SpeechSynthesisUtterance(searchItem);
    speech.lang = 'en-US';
    speech.volume = 2;
    speech.rate=1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
}
