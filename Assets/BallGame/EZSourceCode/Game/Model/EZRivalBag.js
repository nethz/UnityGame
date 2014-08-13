#pragma strict


class EZRivalBag extends EZContainer {

	
	  
	/*
	public var _label:UILabel = null;
	public var _health:UISlider = null;
	public var _healthLabel:UILabel = null;
	public var _uiVisible:UIVisible = null;
	*/
	
	//private var button_:UIButton = null;
	function Awake(){
		//this.button_ = this.gameObject.GetComponent(UIButton) as UIButton;
	
	}
	
	
	/*	
	function addPower(type:Geek.MagicType, pwr:float){
	
		if(type == this.soul_.type){
			//this.soulEnchant.skillProperty.power = this.soulEnchant.skillProperty.power + pwr;
			this.soulEnchant.addSkillPower(pwr);
		}
		this.soulEnchant.addAttackPower(pwr);
	
	}
	*/
	
	
	function changeTo(to:EZContainer):boolean{
		if(!this.isDie()){
			this.swap(to);
			return true;
		}
		return false;
	}
	
	

	
	

	
	
	public function goOut(){
		this.setSoul(null);
	}
	
	
	
};