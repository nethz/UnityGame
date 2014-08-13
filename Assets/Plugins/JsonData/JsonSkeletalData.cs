using UnityEngine;
using System.Collections;
using Pathfinding.Serialization.JsonFx;


public class JsonSkeletalObjInfo{
	public bool x = false;
	public bool y = false;
	public bool regY = false;
	public bool regX = false;
	public bool scaleX = false;
	public bool scaleY = false;
	public bool skewX = false;
	public bool skewY = false;
	public bool rotation = false;
	public bool d = false;
	public bool _off = false;
	public bool alpha = false;
	public bool startPosition = false;
	public bool ease = false;
	
	public void clear(){
		x = true;
		y = true;
		regY = true;
	 	regX = true;
		scaleX = true;
	 	scaleY = true;
		skewX = true;
		skewY = true;
		rotation = true;
		d = true;
		_off = true;
		alpha = true;
		startPosition = true;
		ease = true;
	}
}
[JsonOptIn]
public class JsonSkeletalObj{
	public JsonSkeletalObjInfo info = new JsonSkeletalObjInfo();
	
	private float x_ = 0f;
	private float y_ = 0f;
	private float scaleX_ = 1f;
	private float scaleY_ = 1f;
	private float rotation_ = 0f;
	private float skewX_ = 0f;
	private float skewY_ = 0f;
	private float regX_ = 0f;
	private float regY_ = 0f;
	private int d_ = 1;
	private bool _off_ = false;
	private float alpha_ = 1f;
	private int startPosition_ = 0;
	private float ease_ = 0f;

	public void init(JsonSkeletalObj data){
		
		
		if(!info.x){
			x = data.x;
		}
		
		if(!info.y){
			y = data.y;
		}
			
		if(!info.regX){
			regX = data.regX;
		}
			
		if(!info.regY){
			regY = data.regY;
		}
		if(!info.scaleX){
			scaleX = data.scaleX;
		}
		if(!info.scaleY){
			scaleY = data.scaleY;
		}
		if(!info.skewX){
			skewX = data.skewX;
		}
		if(!info.skewY){
			skewY = data.skewY;
		}
		if(!info.rotation){
			rotation = data.rotation;
		}
		if(!info.d){
			d = data.d;
		}
		if(!info._off){
			_off = data._off;
		}
		
		
		if(!info.alpha){
			alpha = data.alpha;
		}
		if(!info.startPosition){
			startPosition = data.startPosition;
		}
	}
	
	[JsonMember]
	public float x { get { return x_; } set { info.x = true;  x_ = value; } }
	
	[JsonMember]
	public float y { get { return y_; } set {  info.y = true; y_ = value; } }
	
	[JsonMember]
	public float regY { get {return regY_; } set { info.regY = true; regY_ = value; } }
	
	[JsonMember]
	public float regX { get {return regX_; } set { info.regX = true; regX_ = value; } }
	
	[JsonMember]
	public float scaleX { get {return scaleX_; } set { info.scaleX = true; scaleX_ = value; } }
	
	[JsonMember]
	public float scaleY { get {return scaleY_; } set { info.scaleY = true; scaleY_ = value; } }
	
	[JsonMember]
	public float skewX { get {return skewX_; } set { info.skewX = true; skewX_ = value; } }
	
	[JsonMember]
	public float skewY { get {return skewY_; } set { info.skewY = true; skewY_ = value; } }
	
	[JsonMember]
	public float rotation { get {return rotation_; } set { info.rotation = true; rotation_ = value; } }
	
	[JsonMember]
	public int d { get {return d_; } set { info.d = true; d_ = value; } }
	
	[JsonMember]
	public bool _off { get {return _off_; } set { info._off = true; _off_ = value; } }
	
	[JsonMember]
	public float alpha { get {return alpha_; } set { info.alpha = true; alpha_ = value; } }
	
	[JsonMember]
	public float ease { get {return ease_; } set { info.ease = true; ease_ = value; } }
	
	[JsonMember]
	public int startPosition { get {return startPosition_; } set { info.startPosition = true; startPosition_ = value; } }
	
	static public JsonSkeletalObj Load(string json){
		JsonSkeletalObj obj = JsonDataHandler.reader<JsonSkeletalObj>(json);
		return obj;
	}
}

[JsonOptIn]
public class JsonSkeletalPart{
	
	[JsonMember]
	public string target;
	
	[JsonMember]
	public JsonSkeletalObj init;
	
	[JsonMember]
	public JsonSkeletalObj[] steps;
	
	public void setup(){
		
		if(steps.Length > 0){
			steps[0].init(init);
		}
		
		
		for(int i = 1; i < steps.Length; ++i){
			steps[i].init(steps[i-1]);
		}
		
		
	}
	
}


[JsonOptIn]
public class JsonSkeletalAnimation{
	public float speed = 0.04f;
	[JsonMember]
	public string name;
	
	[JsonMember]
	public JsonSkeletalPart[] parts;
	
	static public JsonSkeletalAnimation Load(string json){
		JsonSkeletalAnimation data = JsonDataHandler.reader<JsonSkeletalAnimation>(json);
		return data;
	}
	
	public void setup(){
		for(int i = 0; i<this.parts.Length; ++i){
			this.parts[i].setup ();
		}
	}
}
