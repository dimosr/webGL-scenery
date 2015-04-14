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

function insideCircle(positionX, positionY, centerX, centerY,  radius){
	if( (Math.pow((positionX - centerX),2) + Math.pow((positionY - centerY),2)) < Math.pow(radius,2) ){
			return true;
	}
	else{
		return false;
	}
}