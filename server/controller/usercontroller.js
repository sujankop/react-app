const dummy=[
{
	name:'sujan',
	password:'sujan'
},
{
	name:'sijan',
	password:'sijan'
}
]


const login=(req,res)=>{
	const name=req.body.name;
	const password=req.body.password;
	if(!name){
		res.json({
				message:'failed'
			})
	}
	const value=dummy.filter(p=>p.name===name);
	if (value) {
		if (value[0].password===password) {
			res.json({
				message:'status okay'
			})
		}else{
			res.json({
				message:'failed'
			})
		}
	}else{
		res.json({
			message:'failed'
		})
	}
}

const get=(req,res)=>{
	res.json(dummy)
}




exports.login=login;

exports.get=get;