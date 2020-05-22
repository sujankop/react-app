import React,{useEffect,useState,useReducer} from 'react';
import axios from 'axios';

const initial={
	data:[],
	filter:[]
}
const reduce=(state,action)=>{
	switch (action.type) {
		case 'set':
			return {...state,data:action.data}
			break;
		case 'filter':
			return {...state,filter:action.data}
			break;
		default:
			return state;
			break;
	}
}
const Data=()=>{
	const [loading,setLoading]=useState(true);
	const [state,dispatch]=useReducer(reduce, initial)

	useEffect(() => {
		axios.get("http://localhost:3004/videos")
		.then(response=>{
			dispatch({type:'set',data:response.data});
			setLoading(false);
			})
	}, [])
	const search=(key)=>{
		const filter=state.data.filter((value)=>{
			return (value.title.toUpperCase().indexOf(key.target.value.toUpperCase()))>-1
		})
		dispatch({type:'filter',data:filter})
	}
	return(
			<div>
			<input type="text" onChange={search}/>
				<ul>
					{loading?<div>loading</div>:null}
					{state.filter.length===0?state.data.map(p=><li key={p.id}>{p.title}</li>):state.filter.map(p=><li key={p.id}>{p.title}</li>)}
				</ul>
			</div>
		)

}

export default Data;