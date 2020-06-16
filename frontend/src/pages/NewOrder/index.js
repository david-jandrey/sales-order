import React, {useState, useEffect} from 'react';
import {Link, useHistory} from  'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import  api from '../../services/api';
import * as ReactBootStrap from "react-bootstrap";
import './styles.css';
import logoImg from "../../assets/logo.svg"



export default function NewOrder() {
    const company_id = localStorage.getItem('companyId');
    const user_id = localStorage.getItem('user');
    const [product, setProduct] = useState('');
    const [value, setValue] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [product_id, setProduct_Id] = useState('');
    const [order_id, setOrder_id] = useState('');
    const history = useHistory();
    const [products, setProducts] = useState([]);
    const  products_orders =[];
    const [testes, setTeste] = useState([]);

    useEffect(() => {
        api.get('products', {
            headers: {
                Authorization: company_id,
            }    
        }).then(response => {
            setProducts(response.data);
        })
        api.get('orders', {
            headers: {
                Authorization: company_id,
            }    
        }).then(response => {
            
            
            setOrder_id(response.data[0]+1);
            console.log(order_id);
        })
    }, [company_id]);


    function handleProduct(id,description){
       setProduct_Id(id);
       setProduct(description);
    
    }

    

    function handleAddItem(e){
        e.preventDefault();

        products_orders.push([product_id, value, amount, order_id]);
        
        console.log(products_orders);
    }
    async function handleSaveOrder(){

        try{
            const data = {
                products_orders,
                description,
            };
            const response = await api.post('products_orders', data, {
                headers: {
                authorization1: company_id, 
                authorization2: user_id,
                }
            });
            console.log(company_id);
            console.log(user_id);
            alert(response.data);
        }catch(err){
            
            alert('');
        }
    }

    return(
        <div className= "order-container">
            <div className="content">
            
                <form onSubmit={handleAddItem}> 
                    <ReactBootStrap.ButtonGroup horizontal className= "ButtonGroup">
                        <input 
                            disabled
                            value={product}
                            onChange={e => setProduct(e.target.value)}
                        />

                        <ReactBootStrap.DropdownButton id="dropdown-basic-button" title="Products">
                            {products.map(product =>(
                                <ReactBootStrap.Dropdown.Item onClick={() => handleProduct(product.product_id, product.description)}>{product.description}</ReactBootStrap.Dropdown.Item>
                            ))}
                        </ReactBootStrap.DropdownButton>
                    </ReactBootStrap.ButtonGroup>

                    <input
                        placeholder="Valor"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                     />

                    <input
                        placeholder="Amount"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                    />

                    <button className="button_add" type="submit"> add</button>

                     <textarea 
                        placeholder="Description" 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />           
                </form>
                <button className="button_confirm" onClick={() => handleSaveOrder()}> Confirm</button>
                <div className="table">  
                    <ReactBootStrap.Table  striped bordered hover variant="dark">
                        <thead>
                        <tr>
                        <th>#</th>
                        <th>Produtc</th>
                        <th>value</th>
                        <th>amount</th>
                        </tr>
                        </thead>
                        <tbody>
                        { testes.map(teste =>(         
                        <tr>
                        <th>#</th>
                        <th>{(teste[0])}</th>
                        <th>{teste[1]}</th>
                        <th>{teste[2]}</th>
                        </tr>))}                
                        
                        </tbody>
                    </ReactBootStrap.Table>
                </div>
            </div>
        </div>
        
        
    );
}