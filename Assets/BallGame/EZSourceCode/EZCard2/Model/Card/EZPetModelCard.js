#pragma strict
/*
class EZCard{
	public enum Mark{
		Star,
	}
	public var index:int = 0;
	public var style:String = "goblin";
	
	public var exp:float = 0;
	
	
	public var type:Geek.MagicType = Geek.MagicType.None;
	public var lv:int = 1;
	public var id:int = 0;
	public var speed:float = 0;
	public var attack:float = 0;
	public var maxHealth:float = 0;
	public var seat:EZSoul.Seat = EZSoul.Seat.None;
	public var mark:EZCard.Mark = EZCard.Mark.Star;
	public var quality:Geek.Quality = Geek.Quality.Gold;
	
	static function String2Seat(seat:String):EZSoul.Seat{
		var ret:EZSoul.Seat  = EZSoul.Seat.None;
		switch(seat){
		case "battle":
			ret = EZSoul.Seat.WeBattle;
		break;
		case "bag1":
			ret = EZSoul.Seat.WeBag1;
		break;
		case "bag2":
			ret = EZSoul.Seat.WeBag2;
		break;
		}
		return ret;
	}
	
	
	public function load(data:JsonData.Card){
		Debug.LogWarning(data.identity);
		Debug.LogWarning(data.exp);
		Debug.LogWarning(data.style);
		Debug.LogWarning(data.maxHealth);
		
		this.index = data.index;
		this.style = data.style;
		this.exp = data.exp;
		this.index = data.index;
		
		this.speed  = data.speed;
		this.attack = data.attack;
		this.maxHealth = data.maxHealth;
		this.type = Geek.GetMagicType(data.type);
		this.quality = Geek.GetQualityType(data.quality);
		this.id = data.identity;
	//	this.seat = EZCard.String2Seat(data.state);
		
	
	}
}*/