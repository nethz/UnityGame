#pragma strict


class EZBuff extends EZBind{
	
	
	public function setup(info:JsonData.JsonPack, context:EZAffixContext, seat:EZSoul.Seat){
		super.setup(info, context, seat);
		if(data_ == null){
			data_ = EZBindTable.GetInstance().create(this.type, Geek.MagicType.None);
		}
	}
	
	//被伤害
	public function get hurted():float{
		return 0.0f;
	}
	
	//伤害
	public function hurting(hurt:float):float{
		return 0.0f;
	}
	//流血
	public function get blood():float{
		return 0.0f;
	}
	//injury
	
	public function injury():float{
		return 1.0f;
	}
	
	//是否忽略
	public function ignore():boolean{
		return false;
	}
	
	//是否储存
	public function deposit():boolean{
		return false;
	}
	//吟唱技能
	public function getTech(tech:Function):EZTechnique{
	
	     return null;
	}
	//盾牌测试
	public function shielding(hurt:float):float{
		return hurt;
	}
	//盾牌作用
	public function shielded(hurt:float):float{
		return hurt;
	}
	

	//盾牌值
	public function get shieldValue():float{
		return 0.0f;
	} 
	//交换测试
	public function doSwap(){
	
	}
	//回合测试
	public function doRound():boolean{
		return false;
	}
	
	//动作结束测试
	public function doActioned(){
	
	}
	//交换测试
	public function doShift(){
		
	}
};

