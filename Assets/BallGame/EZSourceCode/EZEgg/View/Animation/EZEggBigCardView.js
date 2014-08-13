#pragma strict

class EZEggBigCardView extends MonoBehaviour{
	
	public var _pet:EZPetTexture = null;
	public var _petSeal:GameObject = null;
	public var _quality:UISprite = null;
	public var _property:UISprite = null;
	
	private var rePosition_:Vector3 = Vector3.zero;
	private var reSize_:Vector3 = Vector3.one;
	
	public function Awake(){
		isShowBorder = false;
		rePosition_ = this.transform.localPosition;
		reSize_ = this.transform.localScale;
	}
	
	
	public function get pet():EZPetTexture{
		return _pet;
	}
	
	public function get petSeal():GameObject{
		return _petSeal;
	}
	
	public function setColor(qua:Color,pro:Color){
		_quality.color = qua;
		_property.color = pro;
	}
	
	public function set isShowBorder(value:boolean){
		_quality.enabled = value;
		_property.enabled = value;
	}
	
	public function reSet(){
		this.transform.localPosition = rePosition_;
		this.transform.localScale = reSize_;
		setAlpha(0f);
	}
	
	public function setAlpha(a:float){
		_quality.color.a = a;
		_property.color.a = a;
	}
	
	public function setPetAlpha(a:float){
		_pet.setAlpha(a);
	}
}