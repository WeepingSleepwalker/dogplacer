import React from 'react'



const husky = require("./husky.jpeg")
const Dogwalker = () => {
    return (
        <div>
            <p>Sign in to meet:</p>
            <p>Solomon Crusty</p>
            <img src={husky.default} alt="Husky"></img>
            <div class="col">
                <div class="hide-md-lg">
                    
                    <p>Picture of dog required</p>
                </div>

                <input type="text" name="username" placeholder="Username" required></input>
                    <input type="password" name="password" placeholder="Password" required></input>
                        <input type="submit" value="Login"></input>
                        </div>
        </div>
                    
                    )
}

                    export default Dogwalker
