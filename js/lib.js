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

function EuclideanDistance(x1, y1, x2, y2){
	return Math.pow(Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2),1/2);
}

function reversePercentage(percentage){
	return (100 - percentage);
}