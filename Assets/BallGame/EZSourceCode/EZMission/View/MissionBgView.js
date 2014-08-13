#pragma strict

import System.Collections.Generic;
class MissionBgView extends MonoBehaviour{
	class KeyValue{
		var key:String;
		var val:String;
	}
	public var _keyValue:KeyValue[];
	public var _bg:UISprite;
	private var key_:String;
	private var title_:String;
	public var _title:UILabel;
	public var _topBg:UISprite;
	public var _hardColor:Color = Color.white;
	private function getBgTask(sprite:String, time:float):Task{
		var ta:TweenAlpha = null;
		var task:Task = new Task();
		
		task.init = function(){
			_bg.spriteName = sprite;
			ta = TweenAlpha.Begin(_bg.gameObject, time, 1.0f);
			
		};
		task.isOver = function():boolean{
			if(ta && ta.enabled){
				return false;
			}
			return true;
		};
		return  task;
	}
	public function setup(title:String, key:String){
		title_ = title;
		key_ = key;
	}
	
	public function setTopBg(name:String){
		_topBg.spriteName = name;
	}
	public function changeColorHardTask():Task{
		var task:Task = new Task();
		var tc:TweenColor = null;
		task.init = function(){
			tc = TweenColor.Begin(this.gameObject, 0.15f, _hardColor);
		};
		task.isOver = function():boolean{
			return tc && !tc.enabled;
		};
		TaskManager.Run(task);
		return task;
	
	}
	public function changeColorNomalTask():Task{
		var task:Task = new Task();
		var tc:TweenColor = null;
		task.init = function(){
			tc = TweenColor.Begin(this.gameObject, 0.15f, Color.white);
		};
		task.isOver = function():boolean{
			return tc && !tc.enabled;
		};
		TaskManager.Run(task);
		return task;
	
	}
	public function openBgTask(time:float):Task{
		var task:Task = null;
		for(var i:int=0; i<_keyValue.Length; ++i){
			if(_keyValue[i].key.ToLower() == key_.ToLower()){
				task = getBgTask(_keyValue[i].val, time);
				break; 
			}
		}
		if(task == null){
			task = new Task();
		}
		TaskManager.PushBack(task, function(){
			_title.text = title_;
			_title.enabled = true;
		});
		return task;
	}
	public function closeBgTask(time:float):Task{
		var ta:TweenAlpha = null;
		var task:Task = new Task();
		
		task.init = function(){
			_title.enabled = false;
			ta = TweenAlpha.Begin(_bg.gameObject, time, 0);
			
		};
		task.isOver = function():boolean{
			if(ta && ta.enabled){
				return false;
			}
			return true;
		};
		return  task;
		
	}

}