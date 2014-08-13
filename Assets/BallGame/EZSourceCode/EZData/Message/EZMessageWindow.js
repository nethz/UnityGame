#pragma strict
import System.Collections.Generic;
class EZMessageWindow  extends MonoBehaviour{

	public var _windowShow:EZWindowShow = null;
	public var _button:EZMessageWindowButton;
	public var _title:UILabel;
	public var _content:UILabel;
	public var _sprite:UISprite;
	public var _background:UISprite;
	public var _award:EZAward;
	public var _table:UITable;
	public var _boxs:BoxCollider[];
	public var _nextText:String;
	public var _collectText:String;
	public var _closeText:String;
	private var mode_:EZMessageBagTable.Mode = EZMessageBagTable.Mode.News ;
	public var _callback:EZButtonCallback;
	
	
	private static var instance_:EZMessageWindow = null;
	
	public function Awake(){ 
		this.instance_ = this;
		this.close();
		
	} 
	
	public static function GetInstance():EZMessageWindow{
		return this.instance_;
	}
	
	
	
	private var list_:JsonData.Message[] = null;
	private var iterator_:int = 0;
	public function refresh(){
		if(iterator_ < list_.Length){
			_title.text = list_[iterator_].title;
			_content.text =  list_[iterator_].content;
			_award.setup(list_[iterator_].award);
			_table.repositionNow = true;
			if(iterator_ < list_.Length-1){
				_button.text = _nextText;
				_callback.setup(this.callback, "next");
			}else{
				_button.text = _collectText;
				_callback.setup(this.callback, "collect");
			}
		}else{
			_button.text = _closeText;
			_callback.setup(null, "close");
		}
	}
	public function callback(button:String){
		if(button == "next"){
			iterator_++;
		}else if(button == "collect")
		{
	
			this.close(); 
			var target:GameObject = GameObject.FindGameObjectWithTag("Ctrl");
			if(mode_ == EZMessageBagTable.Mode.News){
				target.SendMessage("OnAction", "news_web", SendMessageOptions.DontRequireReceiver);
			}else{
				target.SendMessage("OnAction", "quest_web", SendMessageOptions.DontRequireReceiver);
			}
	
		}
		refresh();
		
	}
	
	public function open(mode:EZMessageBagTable.Mode){
		_windowShow.shrink();
		this.setMode(mode);
		_sprite.enabled = true;
		_title.enabled = true;
		_content.enabled = true;
		_background.enabled = true;
		_button.show(mode);
		iterator_ = 0;
		for(var i:int = 0; i<_boxs.Length;++i){
			_boxs[i].enabled = true;
		} 
		_award.setup(null);
		_award.open();
		refresh();
		_windowShow.show();
	}
	public function close(){
		_award.setup(null);
		_award.close();
		_sprite.enabled = false;
		_title.enabled = false;
		_content.enabled = false;
		for(var i:int = 0; i<_boxs.Length;++i){
			_boxs[i].enabled = false;
		}
		_background.enabled = false;
		_button.hide();
	}
	public function setMode(mode:EZMessageBagTable.Mode){
		mode_ = mode;
		if(mode_ == EZMessageBagTable.Mode.News){
			_sprite.spriteName = "News";
			list_ = EZMessageBagTable.GetInstance().news;
		}else{
			_sprite.spriteName = "Quest";
			list_ = EZMessageBagTable.GetInstance().quest;
		}
		_button.setMode(mode_);
	}
	
}