#pragma strict

public class EZShopBagCellView extends MonoBehaviour{

	public var _num:UILabel;
	public var _price:UILabel;
	public var _buyStr:UISprite;
	public var _bound:EZButtonCallback;
	public var _bg:UISprite;
	public var _box:BoxCollider;
	public function setup(price:int, bag:int){
		this._num.text = bag.ToString();
		this._price.text = price.ToString();
	}
	public function setup(callback:Function, mode:String){
		_bound.setup(callback, mode);
	}
	public function open(){
		this._num.enabled = true;
		this._price.enabled = true;
		_buyStr.enabled = true;
		this._bound.open();
		this._bg.enabled = true;
		this._box.enabled = true;
	}
	
	
	public function close(){
		this._num.enabled = false;
		this._price.enabled = false;
		_buyStr.enabled = false;
		this._bound.close();
		this._bg.enabled = false;
		this._box.enabled = false;
	}
	public function set num(value:int){
		_num.text = value+"";
	}
	
	public function set price(value:int){
		_price.text = value+"";
	}
	
 
}