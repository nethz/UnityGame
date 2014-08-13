#pragma strict

class EZAffix{

	protected var condition_:EZAffixCondition;
	
	
	private var mold_:EZAffixFactory.Mold = EZAffixFactory.Mold.Both;
	private var type_:String = "none";
	private var level_:float[] = null;
	private var lv_:int = 0;
	private var mark_:String = "none";
	public function set mold(value:EZAffixFactory.Mold){
		mold_ = value;
	}
	
	
	public function get mold():EZAffixFactory.Mold{
		return mold_;
	}

	public function get type():String{
		return type_;
	}
	
	public function get level():float[]{
		return this.level_;
	}
	public function get lv():int{
		return this.lv_;
	}
	public function get mark():String{
		return this.mark_;
	}
	public function setup(info:JsonData.JsonPack){ 
		this.type_ = info.toString("type");
		if(info.hasKey("level")){
			this.level_ = info.toFloatArray("level");
		}else{
			this.level_ = new float[20];
			for(var i:int =0;i<this.level_.length; ++i){
				this.level_[i] = 1;
			}
		}
		
		if(info.hasKey("lv")){
			this.lv_ = info.toInt("lv");
		}else{
			this.lv_ = 0;
		}
		if(info.hasKey("mark")){
			this.mark_ = info.toString("mark");
		}else{
			this.mark_ = "mark";
		}
		
		
	}
	
	
	public function clone():EZAffix{
		return null;
	}
	protected function clone(affix:EZAffix){
		affix.type_ = this.type_;
		affix.mark_ = this.mark_;
		affix.lv_ = this.lv_;
		affix.mold_ = this.mold_;
		
		affix.level_ = new float[this.level_.length];
		for(var i:int; i<this.level_.length; ++i){
			affix.level_[i] = this.level_[i];
		}
		
		
		if(this.condition_)
			affix.condition_ = this.condition_.clone();
	}
	private function lose(context:EZAffixContext):boolean{
		return false;
	}
	public function executeIt(context:EZAffixContext){
		if(context.root == null){
			
			if(mold_ !=  EZAffixFactory.Mold.Original && mold_ !=  EZAffixFactory.Mold.Crystal){
				return;
			}
			
		}else{
			if(mold_ == EZAffixFactory.Mold.Original || mold_ ==  EZAffixFactory.Mold.Crystal){
				return;
			}
			if(mold_ !=  EZAffixFactory.Mold.Both){
				if(context.root.type == "attack" && mold_ !=  EZAffixFactory.Mold.Attack){
					
					return;
				}
				if(context.root.type == "medical" && mold_ !=  EZAffixFactory.Mold.Medical){
					return;
				}
			}
		}
		
		this.execute(context);
	
	}
	
	
	protected function execute(context:EZAffixContext){
		Debug.LogError("aaa" + this.type_);
	}
	
};
