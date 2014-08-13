#pragma strict

class EZLeadManager extends MonoBehaviour{
	enum Type{
		Info,
		Puzzle,
		Sawp,
		Magic,
		Over,
	};
	public var _ctrl:EZLeadCtrl = null;
	public class LeadData{
		var type:EZLeadManager.Type = EZLeadManager.Type.Puzzle;
		var id:int = 0;
	};

	public var _swap:EZLeadSwap = null;
	public var _magic:EZLeadMagic = null;
	public var _info:EZLeadInfo = null;
	public var _over:EZLeadOver = null;
	private var data_:EZLeadManager.LeadData = null;
	private static var instance_:EZLeadManager = null;
	public var _datas:LeadData[] = null;
	private var n_ = 0;
	public static function GetInstance():EZLeadManager{
		return this.instance_;
	}
	public function Awake(){
		this.instance_ = this;
		n_ = 0;
	}
	public function leadPuzzle():boolean{
		if(data_ == null){
			return false;
		}
		return data_.type == EZLeadManager.Type.Puzzle;
	}
	
	public function lead():Task{
		if(data_ == null ){
			return new Task();
		}
		
		if(!leadPuzzle()){
			var task:Task = _ctrl.show(0.5f);
			if(data_.type == EZLeadManager.Type.Sawp){
				TaskManager.PushFront(task, function(){
					_swap.open();
				});
			}else if(data_.type == EZLeadManager.Type.Magic){
				
				TaskManager.PushFront(task, function(){
					_magic.open();
				});
			}else if(data_.type == EZLeadManager.Type.Info){
				
				TaskManager.PushFront(task, function(){
					_info.open();
				});
			}else if(data_.type == EZLeadManager.Type.Over){
			
				TaskManager.PushFront(task, function(){
					_over.open();
				});
			}
			
			return task;
		}else{
			return _ctrl._leadRpg.show(0.3f, 0);
		}
		return new Task();
	}
	
	
	public function next(){
		
		_ctrl._camera.cullingMask = 0;
		data_ = null;
		_ctrl._lead.ready(-1);
		if(_datas == null || _datas.Length <= n_){
		
			return false;
		}
		
		data_ = _datas[n_];
		
		if(data_.type == EZLeadManager.Type.Puzzle){
			_ctrl._lead.ready(data_.id);
		}
		n_++;
	}
	
	//public function leadOver(){
		
	//}
	
	
};