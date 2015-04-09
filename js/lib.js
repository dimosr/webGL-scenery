function degInRad(deg) {
    return deg * Math.PI / 180;
}  

function isNear(i, iTarget, range){
	if( (i >= (iTarget-range)) && (i <= (iTarget + range)) ){
		return true;
	} 
	else{
		return false;
	}
}