#pragma strict

class EZIDDropTask extends Task{
	
	private var id_:int;
	private var quality_:int = 0;
	private var type_:Geek.MagicType = Geek.MagicType.None;
	private var over_:boolean = false;;
	public function EZIDDropTask(){
		
		this.isOver = function(){
			return over_;
		};
	}
	
	
	public function get quality():int{
		return quality_;
	}
	public function set quality(value:int){
		this.quality_ = value;
	}
	
	public function get magicType():Geek.MagicType{
		return type_;	
	}
	
	public function set magicType(value:Geek.MagicType){
		this.type_ = value;
	}
	
	public function get over():boolean{
		return over_;
	}
	public function set over(value:boolean){
		this.over_ = value;
	}
	
	public function get id():int{
		return id_;
	}
	public function set id(value:int){
		this.id_ = value;
	}
}