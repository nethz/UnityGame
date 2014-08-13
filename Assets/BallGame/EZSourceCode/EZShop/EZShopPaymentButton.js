#pragma strict

class EZShopPaymentButton extends MonoBehaviour{
	public var _box:BoxCollider;
	public var _sprite:UISprite;
	private var product_:JsonData.ProductData = null;
	private var func_:Function = null;
	public function setup(product:JsonData.ProductData, func:Function){
		product_ = product; 
		func_ = func;
	}
	public function open(){
		_box.enabled = true;
		_sprite.enabled = true;
	}
	public function close(){
		_box.enabled = false;
		_sprite.enabled = false;
	}
	public function OnClick(){
		 if(product_ && func_){
		 	func_(product_);
		 }
	}

}