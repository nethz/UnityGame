#pragma strict

class EZBind extends MonoBehaviour{
	//private var to_:EZSoul.Seat;
	
	private var toSoul_:EZSoul = null;
	private var fromSoul_:EZSoul = null;
	protected var level_:float[] = null;
	protected var power_:int = 0;	
	protected var type_:String = "none";
	protected var lv_:int = 0;
	public var data_:EZBindData = null;
	private var flicker_:boolean = false;
	public function set flicker(value:boolean){
		this.flicker_ = value;
	}
	public function get flicker():boolean{
		return this.flicker_;
	}
	
	private var close_:boolean = false;
	public function set close(value){
		close_ = value;
	}
	
	public function get close():boolean{
		return close_;
	}
	

	
	public function doClose(){
		if(close_){
			close_ = false;
			this.enabled = false;
		}
	}
		
		
		
		
	public function get type():String{
		return type_;
	}
	
	
	public function get level():float[]{
		return level_;
	}
	public function setup(info:JsonData.JsonPack, context:EZAffixContext, seat:EZSoul.Seat){
		
		toSoul_ = EZContainerManager.GetSoul(seat) as EZSoul;   
		fromSoul_ = EZContainerManager.GetSoul(context.from) as EZSoul; 
		close_ = false;
		this.enabled = true;
		//to_ = seat;
		power_ = context.power;
		this.type_ = info.toString("type");
		//this.name_ = info.toString("name");
		//this.info_ = info.toString("info");
		if(info.hasKey("level")){
			this.level_ = info.toFloatArray("level");
		}else{
			this.level_ = new float[5];
			for(var i:int =0;i<this.level_.length; ++i){
				this.level_[i] = 1;
			}
		}
		if(info.hasKey("lv")){
			this.lv_ = info.toInt("lv");
		}else{
			this.lv_ = 0;
		}
	//	if(data_ == null){
	//		data_ = new EZBindData();
	//		//data_.style = this.type;
	//	}
	}
	public function get data():EZBindData{
		return data_;
	}
	public function get to():EZSoul.Seat
	{
		if(toSoul_ == null || !toSoul_.alive){
			return EZSoul.Seat.None;
		}
		
		return toSoul_.seat;
	}
	public function get from():EZSoul.Seat
	{
		if(fromSoul_ == null){
			return EZSoul.Seat.None;
		}
		
		return fromSoul_.seat;
	}
	
}