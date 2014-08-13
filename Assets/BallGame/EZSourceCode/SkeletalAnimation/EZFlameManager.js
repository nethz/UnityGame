#pragma strict

class EZFlameManager extends MonoBehaviour{
	private var flames_:EZFlame[] = null;
	private var alpha_:float = 1;
	private var type_:Geek.MagicType = Geek.MagicType.None;
	private var show_:boolean = false;
	public function refresh(obj:GameObject){
	
		flames_ = System.Array.ConvertAll(
				obj.GetComponentsInChildren(EZFlame), 
				function (component){component as EZFlame;}
			);
		refresh();
	}
	
	public function refresh(){
		if(flames_){
			for(var i:int =0 ; i< flames_.Length; ++i){
				flames_[i].setAlpha(alpha_);
				flames_[i].setMagicType(type_);
				if(show_){
					flames_[i].show();
				}else{
					flames_[i].hide();
				}
			}
		}
		
	}
	public function set alpha(value:float){
		this.alpha_ = value;
		refresh();
	}
	public function setMagicType(type:Geek.MagicType){
		this.type_ = type;
		refresh();
	
	}
	
	public function show(){
		show_ = true;
		refresh();
	}
	
	
	public function hide(){
		
		show_ = false;
		refresh();
	}

}