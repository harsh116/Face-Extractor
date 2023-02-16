

const Rank=(props)=>{
	return(
	       <div>
	       	<div className="white f3">
	       	 {`${props.userData.name}, your current entry count is...`}
	       	</div>
	       	<div className="white f1">
	       	 {`#${props.userData.entries}`}
	       	</div>
	       </div>
       )
}

export default Rank;