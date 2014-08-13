#pragma strict

function Start () {
}

function Update (){
	//this.transform.Rotate(Vector3(0, 0, 1));
}

function setType(type:Geek.MagicType){
	var cb:ColorBind = this.GetComponent(ColorBind) as ColorBind;
	cb.setType(type);
}


function setAlpha(alpha:float){
	var ab:AlphaBind = this.GetComponent(AlphaBind) as AlphaBind;
	ab.setAlpha(alpha);
}


