#pragma strict


class EZNumberDivFoes extends EZNumber{
	private var value_:float = 0; 
	
	public function EZNumberDivFoes(info:JsonData.JsonPack){
		 this.value_ = info.toFloat("value");
	}
	
	public function getValue(context:EZAffixContext):float{
		var foes:float = 1;
		if(context.to == EZSoul.Seat.WeBattle || context.to == EZSoul.Seat.WeBag1 || context.to == EZSoul.Seat.WeBag2){
			foes = 0;
			if(EZContainerManager.Alive(EZSoul.Seat.WeBattle))
				foes++;
			if(EZContainerManager.Alive(EZSoul.Seat.WeBag1))
				foes++;
			if(EZContainerManager.Alive(EZSoul.Seat.WeBag2))
				foes++;
		}
		return (this.value_ * context.power)/foes;
	};
}