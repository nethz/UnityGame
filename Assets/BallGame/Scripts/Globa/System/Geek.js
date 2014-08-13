#pragma strict


class Geek{
	
	public enum MagicType
	{
		
		Metal = 0,
		Wood = 1,
		Water = 2,
		Fire  = 3, //huo
		Earth = 4,
		Crystal = 5,
		Length = 6,
		None = 6,
		
	};
	class SoulKey{
		public var _type: MagicType = MagicType.None;
		public var _style: String = "";
		public function SoulKey(style:String, type:MagicType){
			_style = style;
			_type = type;
		
		}
		public function get style():String{
			return _style;
		}
		public function get type():MagicType{
			return _type;
		}
	}
	public enum Quality{
		Iron = 0,//white
		Brass  = 1,//green
		Silver= 2,//blue
		Gold = 3,//purple
		None = 4,
	}
	public static function GetReinforced(from:MagicType):Geek.MagicType{
		var ret:MagicType = MagicType.None;
		switch(from){
		case MagicType.Fire:
			ret = MagicType.Wood;
			break;
		case MagicType.Earth:
			ret = MagicType.Fire;
			break;
		case MagicType.Metal:
			ret = MagicType.Earth;
			break;
		case MagicType.Water:
			ret = MagicType.Metal;
			break;
		case MagicType.Wood:
			ret = MagicType.Water;
			break;
		
		}
		return ret;
	
	}
	public static function GetReinforce(from:MagicType):Geek.MagicType{
		var ret:MagicType = MagicType.None;
		switch(from){
		case MagicType.Wood:
			ret = MagicType.Fire;
			break;
		case MagicType.Fire:
			ret = MagicType.Earth;
			break;
		case MagicType.Earth:
			ret = MagicType.Metal;
			break;
		case MagicType.Metal:
			ret = MagicType.Water;
			break;
		case MagicType.Water:
			ret = MagicType.Wood;
			break;
		
		}
		return ret;
	
	}
	public static function Limit(text:String, length:int, dot:boolean){
		if(text.Length <= length){
			return text;
		}
		if(dot){
			return text.Substring(0, length-2) + "...";
		}
		return text.Substring(0, length);
	
	}
	public static function GetNeutralized(from:MagicType):Geek.MagicType{
		var ret:MagicType = MagicType.None;
		switch(from){
		case MagicType.Earth:
			ret = MagicType.Wood;
			break;
		case MagicType.Metal:
			ret = MagicType.Fire;
			break;
		case MagicType.Water:
			ret = MagicType.Earth;
			break;
		case MagicType.Wood:
			ret = MagicType.Metal;
			break;
		case MagicType.Fire:
			ret = MagicType.Water;
			break;
		
		}
		return ret;
	}
	public static function GetNeutralize(from:MagicType):Geek.MagicType{
		var ret:MagicType = MagicType.None;
		switch(from){
		case MagicType.Wood:
			ret = MagicType.Earth;
			break;
		case MagicType.Fire:
			ret = MagicType.Metal;
			break;
		case MagicType.Earth:
			ret = MagicType.Water;
			break;
		case MagicType.Metal:
			ret = MagicType.Wood;
			break;
		case MagicType.Water:
			ret = MagicType.Fire;
			break;
		
		}
		return ret;
	}
	
	public static function Reinforce(from:MagicType, to:MagicType):boolean{
		if((from == MagicType.Wood && to == MagicType.Fire)||
		(from == MagicType.Fire && to == MagicType.Earth)||
		(from == MagicType.Earth && to == MagicType.Metal)||
		(from == MagicType.Metal && to == MagicType.Water)||
		(from == MagicType.Water && to == MagicType.Wood)){
			return true;
		}
		return false;
	}
	
	
	public static function Neutralize(from:MagicType, to:MagicType):boolean{
		if((from == MagicType.Wood && to == MagicType.Earth)||
		(from == MagicType.Earth && to == MagicType.Water)||
		(from == MagicType.Water && to == MagicType.Fire)||
		(from == MagicType.Fire && to == MagicType.Metal)||
		(from == MagicType.Metal && to == MagicType.Wood)){
			return true;
		}
		return false;
	}
	
	public enum WebState{
		Unknow = 0,
		OutOfLine = 1, 
		Registering = 2, 
		Checking = 3, 
		Logining = 4, 
		Logined = 5, 
		Registered = 6, 
		Error = 7, 
		CheckPass = 8, 
		//CheckWrong  = 9,
	};
	public enum WebError{
		NoError = 0,
		LinkError = 1,
		CheckError = 2,
		NoUser = 3,
		HashError = 4,
		FormatError = 5,
		NoSugar = 6,
		NoData = 7,
		NoPermission = 8,
	
	};
	static function GetQualityType(q:int):Geek.Quality{
		var ret:Geek.Quality = Geek.Quality.None;
		switch(q){
		case 0:
			ret =  Geek.Quality.Iron;
			break;
		case 1:
			ret =  Geek.Quality.Brass;
			break;
		case 2:
			ret =  Geek.Quality.Silver;
			break;
		case 3:
			ret =  Geek.Quality.Gold;
			break;
		}
		return ret;
	
	}
	
	static function GetMagicName(type:Geek.MagicType):String{
	
		var ret:String = "";
		switch(type){
		case Geek.MagicType.Fire:
			ret = "Fire";
			break;
		case Geek.MagicType.Wood: 
			ret = "Wood";
			break;
		case Geek.MagicType.Metal: 
			ret = "Metal";
			break;
		case Geek.MagicType.Water: 
			ret = "Water";
			break;
		case Geek.MagicType.Earth:
			ret = "Earth";
			break;
		case Geek.MagicType.Crystal:
			ret = "Crystal";
			break;
		}
		return ret;
	
	}
	static function GetMagicType(type:String):Geek.MagicType{
		var ret = Geek.MagicType.None;
		
		switch(type.ToLower()){
		case "fire": 
			ret = Geek.MagicType.Fire;
			break;
		case "sky": 
			ret = Geek.MagicType.Crystal;
			break;
		case "grass": 
			ret = Geek.MagicType.Wood;
			break;
		case "sun": 
			ret = Geek.MagicType.Metal;
			break;
		case "dark":
			ret = Geek.MagicType.Earth;
			break;
		case "snow":
			ret = Geek.MagicType.Water;
			break;
			
			
		case "crystal": 
			ret = Geek.MagicType.Crystal;
			break;
		case "wood": 
			ret = Geek.MagicType.Wood;
			break;
		case "metal": 
			ret = Geek.MagicType.Metal;
			break;
		case "earth":
			ret = Geek.MagicType.Earth;
			break;
		case "water":
			ret = Geek.MagicType.Water;
			break;
		 
		}
		return ret;
	}
static function NumberFormat(number:int):String{
	if(number < 10000){
		return "" + number;
	}
	if(number < 100000){
		return Mathf.FloorToInt(number/1000) + "k";
	}
	return "999k";
	
}

static function Space2Screen(space:Vector2, orthographicSize:float): Vector2{
	
	var r:float =Screen.height/(orthographicSize *2);
	var screen = Vector2(space.x * r, space.y * r);
	return screen; 
}



static function Space2Screen(space:Rect, orthographicSize:float):Rect{
	var r:float =Screen.height/(orthographicSize *2);
	var screen = Rect(space.xMin * r, space.yMin * r,space.width *r,space.height *r);
	return screen; 
}




static function Screen2Space(screen:Vector2, orthographicSize:float) : Vector2{
	var r:float =Screen.height/(orthographicSize *2);
	var space = Vector2(screen.x / r, screen.y / r);
	return space; 
}

static function Screen2Space(screen:Rect,  orthographicSize:float) : Rect{
	var r:float =Screen.height/(orthographicSize *2);
	var space = Rect(screen.xMin / r, screen.yMin / r,screen.width /r,screen.height /r);//Vector2(screen.x / r, screen.y / r);
	return space; 
}

static function Coordinate(position:Vector2, t:Transform, orthographicSize:float){
	
	var worldScale:Vector3 = Geek.GetWorldScale(t);
	var matrix:Vector2 = GameSetup.getInstance().matrix;
	var bs:Vector2 = Geek.Screen2Space(AutoSize.getInstance().getBallSize(),orthographicSize);
	return Vector2((position.x-  (matrix.x-1)/2 )*bs.x /worldScale.x,( position.y-  (matrix.y-1)/2)*bs.y/worldScale.y);

}

static function InsideAddOffset(inside:Vector2, offset:Vector2, camera:Camera){
	
	var autoSize:AutoSize = AutoSize.getInstance();
	
	
	var inSize: Vector2 = autoSize.getInSize();
	var ballSize: Vector2 = autoSize.getBallSize();
	//var of = autoSize.getOffset(camera);
	
	if(inside.y <ballSize.y)
	{
		offset.y *= inside.y/ballSize.y;
	}else if((inSize.y -inside.y) < ballSize.y)
	{
		offset.y *= (inSize.y -inside.y)/ballSize.y;
	}
	
	
//	EZTheTest.GetInstance().inside = inside;
//	EZTheTest.GetInstance().inSize = inSize;
//	EZTheTest.GetInstance().ballSize = ballSize;
//	EZTheTest.GetInstance().offset = offset;
	return Vector2(inside.x , inside.y + offset.y);
}


static function Parabola(n1:Vector2, n2:Vector2, n3:Vector2){
	var z:float = n3.y - n1.y;
	var h1 = (n2.y- n1.y);
	var h2 = (n3.x*n3.x - n1.x*n1.x);
	var h3 = (n2.x*n2.x - n1.x*n1.x);
	var h:float = h1 * h2/h3;
	var q:float = (n3.x-n1.x) - ((n2.x - n1.x) *(n3.x * n3.x - n1.x *n1.x)/(n2.x*n2.x - n1.x*n1.x));
	var b:float = (z-h)/q;
	
	var a:float = ((n2.y - n1.y) - b*(n2.x - n1.x))/(n2.x*n2.x - n1.x*n1.x);
	var c:float = n1.y - a* n1.x* n1.x - b * n1.x;
	
	return Vector3(a,b,c);
}

static function ThrowParabola(parabola:Vector3, x:float){
	return (parabola.x * x* x + parabola.y * x + parabola.z);
}
static function Md5Sum(strToEncrypt: String)
{
	var encoding = System.Text.UTF8Encoding();
	var bytes = encoding.GetBytes(strToEncrypt);
 
	// encrypt bytes
	var md5 = System.Security.Cryptography.MD5CryptoServiceProvider();
	var hashBytes:byte[] = md5.ComputeHash(bytes);
 
	// Convert the encrypted bytes back to a string (base 16)
	var hashString = "";
	for (var i = 0; i < hashBytes.Length; i++)
	{
		hashString += System.Convert.ToString(hashBytes[i], 16).PadLeft(2, "0"[0]);
	}
 
	return hashString.PadLeft(32, "0"[0]);
}

static function GetWorldScale( transform:Transform) {

    var worldScale:Vector3 = transform.localScale;
    var parent:Transform = transform.parent;
    while (parent != null)
    {
        worldScale = Vector3.Scale(worldScale,parent.localScale);
        parent = parent.parent;

    }
    return worldScale;

}
static function GetColor(type:Geek.MagicType, alpha:float, brightness:float){
	
	var func = function(r:float, g:float, b:float){
		//return new Color(r/256 * brightness,g/256* 2,b/256* 2, alpha);
		return new Color(r/256 * brightness,g/256,b/256, alpha);
	};
	var color:Color = Color.grey;
	switch(type){
		case Geek.MagicType.Wood:
			//color = func(128,178,29);
			color = func(90,228,0);
			break;
		case Geek.MagicType.Fire:
			//color = func(215,37,37);
			color = func(251,67,9);
			break;
		case Geek.MagicType.Earth:
			//color = func(124,100,66);
			color = func(148,108,15);
			break;
		case Geek.MagicType.Metal:
			//color = func(241,190,83);
			color = func(221,212,32);
			break;
		case Geek.MagicType.Crystal:
			color = func(255,255,255);
			break;
		case Geek.MagicType.Water:
			//color = func(6,79,175);
			color = func(23,157,183);
			break;
		case Geek.MagicType.None:
			color = Color.grey;
			break;
	
	}
	return color;
}
static function GetQualityColor(quality:Geek.Quality, alpha:float, brightness:float){
	
	var func = function(r:float, g:float, b:float){
		return new Color(r/256 * brightness,g/256,b/256, alpha);
	};
	var color:Color = Color.grey;
	
	
	switch(quality){
		case Geek.Quality.Iron:
			//color = func(114,177,26);
			color = func(238,238,238);//#eeeeee
			break;
		case Geek.Quality.Brass:
			//color = func(105,165,219);
			color = func(102,175,6);//#66af06
			break;
		case Geek.Quality.Silver:
			//color = func(134,49,252);
			color = func(6,79,175);//#064faf
			break;
		case Geek.Quality.Gold:
			//color = func(241,190,83);
			color = func(136,86,185);//#8a56b9
			break;
		case Geek.Quality.None:
			color = Color.grey;
			break;
	
	}
	return color;
}

static function GetNameByProSty(type:Geek.MagicType,style:String):String{
	if(type == Geek.MagicType.None){
		return "none";
	}
	if(style.EndsWith("_")){
		style = style.Substring(0,style.Length-1);
	}
	var strType:String = Geek.GetMagicName(type);
	strType = strType.ToLower();
	style = style.ToLower();
	return strType + "_" + style;
}

//static function 
};