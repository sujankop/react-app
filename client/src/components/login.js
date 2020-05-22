import React,{useReducer,useEffect,useState} from 'react';
import axios from 'axios';

const initial={
	name:'',
	password:''
}
const reduce=(state,action)=>{
	switch (action.type) {
		case 'username' :
			return {...state,name:action.data}
			break;
		case 'password' :
			return {...state,password:action.data}
			break;
		default:
		 return state;
	}
}
const Login =()=>{
	
	const [loading,setLoading]=useState(true);
	const [data,setData]=useState([]);
	const [show,setShow]=useState([]);
	const [state,dispatch]=useReducer(reduce, initial);
	useEffect(() => {
		axios.get("http://localhost:5000/api/user/get")
		.then(response=>{
			setLoading(false);
			setData(response.data);
		})
	}, []);
	const changeUser=(e)=>{
		dispatch({type:'username',data:e.target.value});
	}
	const changePass=(e)=>{
		dispatch({type:'password',data:e.target.value});
	}
	const search=(key)=>{
		const d=data.filter(p=>{
			return(p.name.toUpperCase().indexOf(key.target.value.toUpperCase()))>-1
		})
		setShow(d);
	}
 const transfer=(e)=>{
	e.preventDefault();
 	axios.post('http://localhost:5000/api/user/',state)
 	.then(response=>{console.log(response.data.message)})
 	.catch(err=>console.log(err));
 }

	return (
	<div>
		<input type="text" placeholder="search" onChange={search}/>
		{loading?<div>loading</div>:null}
		{show.length===0?data.map((p)=><div key={p.password}>{p.name}</div>):show.map((p)=><div key={p.password}>{p.name}</div>)}
		
		{/*<form method="post" onSubmit={transfer}>
			<label>name:</label>
			<input type="text" value={state.username} onChange={changeUser}/>
			<label>password:</label>
			<input type="password" value={state.password} onChange={changePass}/>
			<input type="submit" value="button"/>
		</form>	*/}
	</div>
	)
}

export default Login; 