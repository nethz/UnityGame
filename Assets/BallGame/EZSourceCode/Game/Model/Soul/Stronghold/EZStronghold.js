#pragma strict
class EZThePosition{
	var soul:EZSoul = null;
	//var money:int = 0;
	var dropQuality:int = -1;
	var info:String = "";
	var pop:String = "";
};
class EZStronghold{
	enum Type{
		Wild,
		Rival,
		GameOver,
		None,
	};
	private var position_:float = 0;
	private var box_:boolean = false;
	private var type_:EZStronghold.Type = EZStronghold.Type.Wild;
	protected function EZStronghold(){
	}
	public function get type():EZStronghold.Type{
		return EZStronghold.Type.None;
	}
	
	
	public function load(data:JsonData.Stronghold, doc:JsonData.WaveDoc){
		this.position_  = data.position;
		box_ = data.box;
	}
	
	public function get box():boolean{
		return box_;
	}
	public function get battle():EZThePosition{
		return null;
	}
	
	public function get bag1():EZThePosition{
		return null;
	}
	
	public function get bag2():EZThePosition{
		return null;
	}
	
	function get position():float{
		return this.position_;
	}
	
	function set position(value:float){
		this.position_ = value;
	}

};


