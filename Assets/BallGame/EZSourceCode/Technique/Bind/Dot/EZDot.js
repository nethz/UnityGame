#pragma strict


class EZDot extends EZBind{
	public var times_:int = 1;
	public var speed_:float = 0f;
	public var origin_:String = "";
	public var magicType_:Geek.MagicType = Geek.MagicType.None;
	private var physics_:float = 0;
	protected var number_:int = 0;
	public function set number(value:int){
		this.number_ = value;
	}
	public function get number():int{
		return this.number_;
	}
	
	public function get physics():float{
		return physics_;
	}

	public function setup(info:JsonData.JsonPack, context:EZAffixContext, seat:EZSoul.Seat){
		super.setup(info, context, seat);
		origin_ = context.root.type;
		times_ = info.toInt("times");
		var from:EZSoul = EZContainerManager.GetSoul(context.from) as EZSoul; 
		var to:EZSoul = EZContainerManager.GetSoul(seat) as EZSoul; 
		if(context.root.type == "attack"){
			if(to.healthBar > context.root.doubleDot){
				context.root.setFlickerBlood(context.to);
				times_ *= 2;
			}
		
		}else if(context.root.type == "medical"){
			if(to.healthBar < (1-context.root.doubleDot)){
				context.root.setFlickerBlood(context.to);
				times_ *= 2;
			}
		}
		
		if(data_ == null){
			data_ = EZBindTable.GetInstance().create(this.type, magicType_);
			if(data_)
				data_.number = times_;
		}
		
		physics_ = context.root.physics(seat);
		var fromHandler:EZBuffHandler = from.getBuffHandler();
		fromHandler.refresh();
		if(context.root.type == "attack"){
			physics_ = fromHandler.hurting(physics_);
		}
		
	}
	public function get origin():String{
		return origin_;
	}
	public function get magicType():Geek.MagicType{
		return magicType_;
	}
	
	
	public function set magicType(value:Geek.MagicType){
		magicType_ = value;
	}
	public function execute(context:EZDotContext){
		 times_--;
		 data_.number = times_;
		 context.to = this.to;
		 context.from = this.from;
		 if(times_ <= 0){
			close = true;
		 }
	}
	public function get attack():float{
		return 0;
	}
	
	
	public function get medical():float{
		return 0;
	}

};

