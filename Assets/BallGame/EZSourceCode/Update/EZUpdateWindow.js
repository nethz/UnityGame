#pragma strict

class EZUpdateWindow extends MonoBehaviour{
	//public var _cancel:UIButton;
	public var _ok:UIButton;
	public var _message:UILabel;
	public var _title:UILabel;
	public var _button:UILabel;
	public var _web:WebTexture = null;
	public var _webTime:float = 0.5f;
	public function setupTask(data:JsonData.Update):Task{
		
		
		var isWeb:boolean = !String.IsNullOrEmpty(data.web);	
		
		var task:Task = new Task();
		task.init = function(){
			this.gameObject.SetActive(true);
			_button.text = data.button;
			_title.text = data.title;
			if(isWeb){
				_web.load(data.web);
			}else{
				_message.text = data.message;
				_web.gameObject.SetActive(false);
			}
		};
		task.isOver = function():boolean{
		
			return (!isWeb) || _web.isLoaded;
		};
		
		var tl:TaskList = new TaskList();
		tl.push(task);
		if(isWeb){
			var wait:EZWaitTask = new EZWaitTask();
			wait.setAllTime(_webTime);
			tl.push(wait);
		}
		return tl;
		
	}

}