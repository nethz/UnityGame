#pragma strict
class EZMark extends MonoBehaviour{
	public var _mark:UISprite;
	public var _bg:UISprite;
	function refresh(mark:EZCard.Mark){
		if(mark == EZCard.Mark.No){
			_mark.enabled = false;
			_bg.enabled = false;
		}else{
			_mark.enabled = true;
			_bg.enabled = true;
			
			switch(mark){
				case EZCard.Mark.Circle:
					_mark.spriteName = "petCircle";
					break;
				case EZCard.Mark.Diamond:
					_mark.spriteName = "petDiamond";
					break;
				case EZCard.Mark.X:
					_mark.spriteName = "petX";
					break;
				case EZCard.Mark.Triangle:
					_mark.spriteName = "petTriangle";
					break;
				case EZCard.Mark.Star:
					_mark.spriteName = "petStar";
					break;
			
			}
		
		
		}
	
	}
}