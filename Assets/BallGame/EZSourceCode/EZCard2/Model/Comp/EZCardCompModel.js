#pragma strict

class EZCardCompModel extends MonoBehaviour{
	private var main_:EZCard = null;
	private var material_:EZCard[] = new EZCard[6];


	public function get main():EZCard{
		return main_;
	}
	
	public function set main(value:EZCard){
		main_ = value;
	}
	public function get materials():EZCard[]{
		return material_;
	}
	
	public function goodMaterial():boolean{
		for(var i:int = 0; i< material_.length; ++i){
			if(material_[i]){
				if(material_[i].quality >= Geek.Quality.Silver || material_[i].lv >= 10){
					return true;
				}
			}
		}
		return false;
	}
	
	public function clearMain(){
		main_ = null;	
	}
	public function removeCard(data:EZCard){
		if(main_ == data){
			main_ = null;
			return;
		}
		var list:EZCard[] = new EZCard[6];
		var n:int = 0;
		for(var i:int = 0; i<material_.length; ++i){
			if(material_[i] != data){
				list[n] = material_[i];
				++n;
			}
		}
		material_ = list;
			
	}
	
	public function addCard(data:EZCard){
		
		if(main_ == null){
			main_ = data;
		}else{
			for(var i:int = 0; i< material_.length; ++i){
				if(material_[i] == null){
					material_[i] = data;
					break;
				}
			}
		}
	}
	
	public function full():boolean{
		for(var i:int=0; i<material_.length; ++i){
			if(this.material_[i] == null){
				return false;
			}
		}
		return true;
	}
	
	
	public function cleanMain(){
		main_ = null;
	}
	
	public function cleanMaterial(){
		material_ = new EZCard[6];
	}
	public function get materialMoney():int{
		if(main_ == null){
			return 0;
		}
		var exp:float = main_.soul.baseProp.exp;
		
		var setup:JsonData.Setup = EZSetupTable.GetInstance().data;
		
		return Mathf.FloorToInt(setup.soul.getXpMoney(exp));
	}
	
	public function typeArray():int[]{
		var ret:int[] = [0,0,0,0,0];
		for(var i:int = 0;i < material_.length;++i){
			if(material_[i]){
				switch(material_[i].magicType){
					case Geek.MagicType.Metal:
						ret[0]++;
						break;
					case Geek.MagicType.Wood:
						ret[1]++;
						break;
					case Geek.MagicType.Water:
						ret[2]++;
						break;
					case Geek.MagicType.Fire:
						ret[3]++;
						break;
					case Geek.MagicType.Earth:
						ret[4]++;
						break;
				}
			}
		}
		Debug.Log("<===========ComptypeArray==============>" + ret[0] + "," + ret[1] + "," + ret[2] + "," + ret[3] + "," + ret[4]);
		return ret;
	}
	
}