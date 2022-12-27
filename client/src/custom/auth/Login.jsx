import {useState} from 'react'
const API_BASE = 'http://localhost:3001'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const login = async () => {
        const data = await fetch(API_BASE + "/user/login", {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email:email,
                password:password
            })
        }).then(res => res.json())

        console.log(data)
        
        if(data){
            window.location.href = API_BASE + password
        }
    }

    return (
        <div className="content">
            <form>
                <label htmlFor="email">email</label>
                <input type="email" id="email" name="email" onChange={e => setEmail(e.target.value)}/>
                <label htmlFor="password">password</label>
                <input type="password" id="password" name="password" onChange={e => setPassword(e.target.value)}/>
                <button onClick={() => login()}></button>
            </form>
            {email}{password}
        </div>
    )
}

export default Login