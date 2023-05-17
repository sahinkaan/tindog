// Create the Dog class here
class Dog {
    constructor(data){
        Object.assign(this, data)
    }
    
    isLiked() {
        this.hasBeenLiked = true
    }
    
    isSwiped() {
        this.hasBeenSwiped = true;
    }
}

export default Dog