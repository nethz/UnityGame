#pragma strict
class EZLoading extends EZScreen{
	public var _panel:UIPanel;
	public var _label:UILabel;
	public var _texture:UITexture;
	public var _background:UISprite;
	public var _loadingText:UISprite;
	public var _loading:String;
	public var _light:UISprite;
	public var _box:BoxCollider;
	public var _position:Vector3[];
	public var _position5:Vector3[];
	public var _offset:Transform;
	class MagicTypeTexture{
		 var _metal:Texture;
		 var _wood:Texture;
		 var _water:Texture;
		 var _fire:Texture;
		 var _earth:Texture;
		 public function find(magicType:Geek.MagicType):Texture{
		 	var texture:Texture = null;
		 	switch(magicType){
		 		case Geek.MagicType.Metal:
		 		texture = _metal;
		 		break;
		 		case Geek.MagicType.Wood:
		 		texture = _wood;
		 		break;
		 		case Geek.MagicType.Water:
		 		texture = _water;
		 		break;
		 		case Geek.MagicType.Fire:
		 		texture = _fire;
		 		break;
		 		case Geek.MagicType.Earth:
		 		texture = _earth;
		 		break;
		 	}
		 	return texture;
		 }
	}
	
	public var _textures:MagicTypeTexture[];
	
	
	public function Awake(){
		
		super.Awake();
	}
	public function get isLoading():boolean{
		return _box.enabled;
	}
	public function showTask(time:float, alpha:float, text:String, magicType:Geek.MagicType, quality:int, index:int, soulAlpha:float):Task{
		
		var task:Task = new Task();
		var ap:TweenAlpha = null;
		task.init = function(){
			if(_box.enabled == false){
				if(iPhone5){
				
					if(index >=0 && index<_position5.Length){
						_offset.localPosition = _position5[index];
					}
				}else{
				
					if(index >=0 && index<_position.Length){
						_offset.localPosition = _position[index];
					}
				}
				
				if(quality >=0 && quality<_textures.Length){
					var texture:Texture = _textures[quality].find(magicType);
					if(texture != null){
						_texture.material.SetTexture("_MainTex", texture);
					}
					_texture.material.SetFloat("_alpha", soulAlpha); 
					if(soulAlpha < 1.0f){
						_light.enabled = false;
					}else{
					 	_light.enabled = true;
					}
					
				}
				_background.color.a = alpha;
				if(_loading == text){
					_loadingText.color.a = 1;
					_loadingText.enabled = true;
					_label.enabled = false;
				}else{
					_loadingText.enabled = false;
					_label.text = text;
					_label.color.a = 1.0f;
					_label.enabled = true;
				}
				ap = TweenAlpha.Begin(this._panel.gameObject, time, 1.0f);
				_box.enabled = true;
				_texture.enabled = true;
				_light.color.a = 1;
				_light.enabled = true;
				_background.enabled = true;
			}else{
				ap = null;
			}
		};
		task.isOver = function():boolean{
			if(ap && ap.enabled){
				return false;
			}
			
			return true;
		};
		
		return task;
	
		
	}
	public function overTask():Task{	
		if(!_box.enabled){
			return new Task();
		}
		var task:Task = new Task();
		
		var ap0:TweenAlpha = null;
		var ap1:TweenAlpha = null;
		var ap2:TweenAlpha = null;
		var ap3:TweenAlpha = null;
		var ap4:TweenAlpha = null;
		task.init = function(){
			ap0 = TweenAlpha.Begin(this.gameObject, 0.2f, 0.6f);
			ap1 = TweenAlpha.Begin(this._background.gameObject, 0.3f, 0.0f);
			ap2 = TweenAlpha.Begin(this._label.gameObject, 0.5f, 0.0f);
			ap3 = TweenAlpha.Begin(this._loadingText.gameObject, 0.3f, 0.0f);
			ap4 = TweenAlpha.Begin(this._light.gameObject, 0.3f, 0.0f);
		};
		
		task.isOver = function():boolean{
			if(ap0 && ap0.enabled){
				return false;
			}
			if(ap1 && ap1.enabled){
				return false;
			}
			if(ap2 && ap2.enabled){
				return false;
			}
			if(ap3 && ap3.enabled){
				return false;
			}
			if(ap4 && ap4.enabled){
				return false;
			}
			return true;
		};
		return task;
	}
	public function hideTask(time:float):Task{	
		if(!_box.enabled){
		
			return new Task();
		}
		var task:Task = new Task();
		var ap:TweenAlpha = null;
		task.init = function(){
			ap = TweenAlpha.Begin(this._panel.gameObject, time, 0.0f);
		};
		task.shutdown = function(){
			_box.enabled = false;
			_texture.enabled = false;
			_loadingText.enabled = false;
			_label.enabled = false;
			_light.enabled = false;
			_background.enabled = false;
		};
		task.isOver = function():boolean{
			if(ap && ap.enabled){
				return false;
			}
			return true;
		};
		
		return task;
	}
	
	
}