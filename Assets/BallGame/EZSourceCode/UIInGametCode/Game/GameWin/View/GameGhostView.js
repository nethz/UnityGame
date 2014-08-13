#pragma strict

class GameGhostView extends MonoBehaviour{
	public var _ghost:UISprite;
	public var _effect:GameWinEffect;
	public function open(){
		_ghost.enabled = true;
	}
	public function close(){
		_ghost.enabled = false;
	}
	
	public function set style(value:String){
		_ghost.spriteName = value;
	}
	
	public function flyTask():Task{
		var task:Task = _effect.effectTask();
		return task;
	}
	public function loadGhost(soul:JsonData.Soul){
		var qua:Geek.Quality = Geek.GetQualityType(soul.baseProp.quality);
		var pro:Geek.MagicType = Geek.GetMagicType(soul.natureProp.type);
		switch(pro){
			case Geek.MagicType.Metal:
				switch(qua){
					case Geek.Quality.Iron:
						_ghost.spriteName = "m0";
					break;
					case Geek.Quality.Brass:
						_ghost.spriteName = "m1";
					break;
					case Geek.Quality.Silver:
						_ghost.spriteName = "m2"; 
					break;
					case Geek.Quality.Gold:
						_ghost.spriteName = "m3";
					break;
				}
			break;
			case Geek.MagicType.Wood:
				switch(qua){
					case Geek.Quality.Iron:
						_ghost.spriteName = "w0";
					break;
					case Geek.Quality.Brass:
						_ghost.spriteName = "w1";
					break;
					case Geek.Quality.Silver:
						_ghost.spriteName = "w2";
					break;
					case Geek.Quality.Gold:
						_ghost.spriteName = "w3";
					break;
					}
			break;
			case Geek.MagicType.Water:
				switch(qua){
					case Geek.Quality.Iron:
						_ghost.spriteName = "t0";
					break;
					case Geek.Quality.Brass:
						_ghost.spriteName = "t1";
					break;
					case Geek.Quality.Silver:
						_ghost.spriteName = "t2";
					break;
					case Geek.Quality.Gold:
						_ghost.spriteName = "t3";
					break;
					}
			break;
			case Geek.MagicType.Fire:
				switch(qua){
					case Geek.Quality.Iron:
						_ghost.spriteName = "f0";
					break;
					case Geek.Quality.Brass:
						_ghost.spriteName = "f1";
					break;
					case Geek.Quality.Silver:
						_ghost.spriteName = "f2";
					break;
					case Geek.Quality.Gold:
						_ghost.spriteName = "f3";
					break;
					}
			break;
			case Geek.MagicType.Earth:
				switch(qua){
					case Geek.Quality.Iron:
						_ghost.spriteName = "e0";
					break;
					case Geek.Quality.Brass:
						_ghost.spriteName = "e1";
					break;
					case Geek.Quality.Silver:
						_ghost.spriteName = "e2";
					break;
					case Geek.Quality.Gold:
						_ghost.spriteName = "e3";
					break;
					}
			break;
		}
	}
}