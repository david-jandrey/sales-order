import React, {useState} from 'react';
import {Link, useHistory} from  'react-router-dom';
import {FiLogIn} from 'react-icons/fi';
import  api from '../../services/api';
import './styles.css';

import heroesImg from "../../assets/heroes.png"
import logoImg from "../../assets/logo.svg"

export default function Logon() {
    const [company_id, setCompany_id] = useState('');
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('sessions', {user, password, company_id});

            localStorage.setItem('user', user);
            localStorage.setItem('companyId', company_id);
            localStorage.setItem('companyName', response.data.name);
            localStorage.setItem('userId', response.data.user_id);

           history.push('/profile');
        }catch(err){
            alert('Falha no Login, por favor tente novamente !');
        }
    }

    return(
        <div className= "logon-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Sales Order" />
                </section>
            
             <form onSubmit={handleLogin}> 
                
                <input 
                    placeholder="NameSpace"
                    value={company_id}
                    onChange={e => setCompany_id(e.target.value)}
                />

                <input 
                    placeholder="User"
                    value={user}
                    onChange={e => setUser(e.target.value)}
                />

                <input
                    type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                 />

                <button 
                    className="button"
                    type="submit"> 
                    Logon  <FiLogIn size={16} color="#ffff"/>
                </button>

             </form>  
            </div>
        </div>
        
        
    );
}