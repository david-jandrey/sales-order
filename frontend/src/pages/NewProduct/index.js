import React, {useState} from 'react';
import {Link, useHistory} from  'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import  api from '../../services/api';
import './styles.css';
import logoImg from "../../assets/logo.svg"

export default function Register() {
    const company_id = localStorage.getItem('companyId');
    const [description, setDescripition] = useState('');
    const history = useHistory();

     async function handleRegister(e){
        e.preventDefault();

        const data = {
            description,
        };
        try{
            const response = await api.post('products', data, {
                headers: {
                Authorization: company_id,
                }
                });
            alert(response.data);
            history.push('/profile');
        } catch(err){
            alert('Error registering');
            
        }
    }

    return(
        <div className= "logon-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041"/>
                        come back home
                    </Link>
                </section>
            
             <form onSubmit={handleRegister}> 
                
                <input 
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescripition(e.target.value)}
                />

                <button 
                    className="button"
                    type="submit"> 
                    Register
                </button>

             </form>  
            </div>
        </div>
        
        
    );
}