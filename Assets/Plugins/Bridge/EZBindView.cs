using UnityEngine;
using System.Collections;
[System.Serializable]
public class EZBindView : MonoBehaviour {
	

	private EZBindData data_ = null;
	public UISprite _sprite;
	public UILabel _number;
	private EZBindData.BindType type = EZBindData.BindType.None;
	private int count = 0;
	private Vector3 scale_ = Vector3.one;
	public void Awake(){
		scale_ = _sprite.transform.localScale;
	}
	public EZBindData.BindType getBindType(){
		
		if(data_ != null){
			return data_.bindType;
		}
		return type;
	}
	
	
	public int getCount(){
		if(data_!= null){
			return data_.count;
		}
		return count;
	}
	public EZBindData data{ get { return data_; } set {data_ = value;
			_sprite.spriteName = data_.style;
		}}
	public UISprite sprite{ get { return _sprite; } set {_sprite = value; }}
	public void dark(){
		TweenScale.Begin(_sprite.gameObject, 0.3f, scale_);
	}
	public void bright(){
		TweenScale.Begin(_sprite.gameObject, 0.1f, scale_*1.4f);
	}
	public void numberFlicker(int number){
		_number.text = (number) + "";
		_number.color = new Color(_number.color.r, _number.color.g, _number.color.b, 1);
		TweenAlpha.Begin(_number.gameObject, 0.8f, 0);
	}
	
	
	public float alpha{
		set {
			_sprite.alpha = value;
			_number.alpha = value;
		//	_panel.alpha = value; 
		}
	}
}
