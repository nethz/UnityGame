class AttackMedicalAnimation extends MonoBehaviour{
	public var _mFPS:int = 30;
	public var _mPrefix:String = "";

	private var mLoop_:boolean = false;
	private var mSprite_:UISprite = null;
	private var mDelta_:float = 0f;
	private var mIndex_:int = 0;
	private var mActive_:boolean = false;
	private var mSpriteNames_:List.<String> = new List.<String>();

	public function get frames():int {return mSpriteNames_.Count;}

	public function get framesPerSecond():int {return _mFPS;}
	public function set framesPerSecond(value:int) {_mFPS = value;}

	public function get namePrefix():String {return _mPrefix;}
	public function set namePrefix(value:String) {_mPrefix = value;}

	
	public function get loop():boolean {return mLoop_;}
	public function set loop(value:boolean) {mLoop_ = value;}

	
	public function get isPlaying():boolean {return mActive_;}

	
	function Start () { RebuildSpriteList(); }

	
	function Update (){
		if (mActive_ && mSpriteNames_.Count > 1 && Application.isPlaying && _mFPS > 0f){
			mDelta_ += Time.deltaTime;
			var rate:float = 1f / _mFPS;
			if (rate < mDelta_)
			{
				mDelta_ = (rate > 0f) ? mDelta_ - rate : 0f;
				if (++mIndex_ >= mSpriteNames_.Count)
				{
					mIndex_ = 0;
					mSprite_.enabled = false;
					mActive_ = false;
				}else{
					mSprite_.spriteName = mSpriteNames_[mIndex_];
					mSprite_.MakePixelPerfect();
				}
			}
		}
	}

	
	function RebuildSpriteList ()
	{
		if (mSprite_ == null) mSprite_= GetComponent.<UISprite>();
		mSprite_.enabled = false;
		mSpriteNames_.Clear();
		if (mSprite_!= null && mSprite_.atlas != null)
		{
			var sprites:List.<UIAtlas.Sprite> = mSprite_.atlas.spriteList;
			
			for (var i:int = 0; i < sprites.Count; ++i)
			{
				var sprite:UIAtlas.Sprite = sprites[i];
				
				if (String.IsNullOrEmpty(_mPrefix) || sprite.name.StartsWith(_mPrefix))
				{
					mSpriteNames_.Add(sprite.name);
				}
			}
			mSpriteNames_.Sort();
		}
	}

	
	public function Reset()
	{
		mActive_ = true;
		mIndex_ = 0;
		
		if (mSprite_!= null && mSpriteNames_.Count > 0)
		{
			mSprite_.spriteName = mSpriteNames_[mIndex_];
			mSprite_.MakePixelPerfect();
		}
		mSprite_.enabled = true;
	}
}
