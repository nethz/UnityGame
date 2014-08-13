#pragma strict

class EZPetBag extends EZPetContainer{
	private var fulled_:boolean = false;
	private var touch_:boolean = false;
	private function refersh(){
		
		if(_pet && _pet.specially && _pet.specially.effect){
			if(touch_){
				_pet.specially.effect.white(-1);
			}else if(fulled_){
				_pet.specially.effect.flicker(-1);
			}else{
				_pet.specially.effect.normal(-1);
			}
		}
	}
	public function fullIt(){
		fulled_ = true;
		refersh();
	}
	
	public function emptyIt(){
		
		fulled_ = false;
		refersh();

	}
	
	public function doTouch(){
		touch_ = true;
		refersh();
	}
	
	public function doOut(){
		touch_ = false;
		refersh();
	}
	public function feedback(color:Color){
		_pet.specially.effect.feedback(color,-1);
	}
}