import dogsData from './data.js'
import Dog from './Dog.js'

let isWaiting = false
let likedDogs = []
let swipedDogs = []
let nextDog = getNewDog()

function getNewDog(){
    const newDogData = dogsData.shift()
    return newDogData ? new Dog(newDogData) : {}
}

function renderNextDog(dogData){
    document.getElementById('profile').innerHTML = `
        <img class="avatar" src=${dogData.avatar}>
        <div class="status" id="status"></div>
        <div class="desc">
            <h1 class="name">${dogData.name} , ${dogData.age}</h1>
            <h3 class="bio">${dogData.bio}</h3>
        </div>
        `
}

function renderSummary(){
    const likedDogsHtml = likedDogs.map((dog) => `
        <div class="liked-post">
            <img class="liked-img" src="${dog.avatar}">
            <div class="overlay">
                <div class="dog-name">${dog.name}</div>
            </div>
        </div>`).join('')
        
    const swipedDogsHtml = swipedDogs.map((dog) => `
    <div class="swiped-post">
        <img class="swiped-img" src="${dog.avatar}">
        <div class="overlay">
            <div class="dog-name">${dog.name}</div>
        </div>
    </div>`).join('')
    
    document.querySelector('main').innerHTML = `
    <h1>Here is your Summary</h1>
    <p>(click logo for swipe again)</p>
    <h3>❤️</h3>
    <div class="liked-post-container">
        ${likedDogsHtml}
    </div>
    <h3>👎</h3>
    <div class="swiped-post-container">
        ${swipedDogsHtml}
    </div>`
}

function reject(){
    if(!isWaiting){
        document.getElementById('status').innerHTML = `
        <img class="badge" src="./images/badge-nope.png">`
        isWaiting=true
        nextDog.isSwiped()
        swipedDogs.push(nextDog)
        nextDog = getNewDog()
        setTimeout(() => {
            Object.keys(nextDog).length ? renderNextDog(nextDog) : renderSummary()
            isWaiting = false
            },1000)    
    }
}

function heart(){
    if(!isWaiting){
        document.getElementById('status').innerHTML = `
        <img class="badge" src="./images/badge-like.png">`
        isWaiting = true
        nextDog.isLiked()
        likedDogs.push(nextDog)
        nextDog = getNewDog()
        setTimeout(() => {
            Object.keys(nextDog).length ? renderNextDog(nextDog) : renderSummary()
            isWaiting = false
            },1000) 
    }
}

document.getElementById('reject-btn').addEventListener('click', reject)
document.getElementById('heart-btn').addEventListener('click', heart)
document.getElementById('logo').addEventListener('click', ()=>window.location.reload())

renderNextDog(nextDog)
