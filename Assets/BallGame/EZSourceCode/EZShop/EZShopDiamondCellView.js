#pragma strict

public class EZShopDiamondCellView extends MonoBehaviour{
	public var _num:UILabel;
	public var _price:UILabel;
	public var _buySprite:UISprite = null;
	public var _bound:EZShopPaymentButton;
	public var _bg:UISprite;
	//public var _sign:UILabel;
	public var _box:BoxCollider;
	public var _X:UILabel = null;
	
	public function Awake(){
		this.close();
	}
	public function setup(product:JsonData.ProductData, func:Function){
		var num:String = product.title;
		var strs:String[] = num.Split(" "[0]);
		_num.text = strs[0] + "        " + product.price.ToString() + " " + product.currency;
		//_price.text = product.price.ToString() + " " + product.currency;
		//_sign.text = product.currency;
		_bound.setup(product, func);
	}
	
	public function open(){
		_bound.open();// = true;
		_bg.enabled = true;
		if(_buySprite){
			_buySprite.enabled = true;
		}
		_num.enabled = true;
		_price.enabled = true;
		//_sign.enabled = true;
		_box.enabled = true;
		if(_X){
			_X.enabled = true;
		}
	}
	public function close(){
	
		_bound.close();
		_box.enabled = false;
		_bg.enabled = false;
		if(_buySprite){
			_buySprite.enabled = false;
		}
		_num.enabled = false;
		_price.enabled = false;
		//_sign.enabled = false;
		if(_X){
			_X.enabled = false;
		}
		
	
	}
	
}