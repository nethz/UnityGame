//----------------------------------------------
//            NGUI: Next-Gen UI kit
// Copyright © 2011-2012 Tasharen Entertainment
//----------------------------------------------

using UnityEngine;

/// <summary>
/// Tween the object's rotation.
/// </summary>

public class EZJointTween : EZTweener
{
	
	private Vector2 posFrom_;
	private Vector2 posTo_;
	
	private Vector2 skewFrom_;
	private Vector2 skewTo_;
	
	private float alphaFrom_;
	private float alphaTo_;
	
	private exSprite sprite_;
	private EZSkew skew_;
	
	//private bool enableFrom_;
	private bool enableTo_;
	
	
	
	public int _n = 0;
	public GameObject _joint;
	public GameObject _bone;
	public JsonSkeletalObj[] _datas;
	public float _speed = 1;
	
	Transform mTrans;
	
	public Transform cachedTransform { get { if (mTrans == null) mTrans = transform; return mTrans; } }
	
	public Vector3 scale { get { return cachedTransform.localScale; } set { cachedTransform.localScale = value; } }
	public Vector3 position { get { return cachedTransform.localPosition; } set { cachedTransform.localPosition = value; } }
	public float alpha { get { return skew_.alpha; } set { skew_.alpha = value; } }
	override protected void OnUpdate (float factor, bool isFinished){
		if(isFinished){
			skew_.skew = skewTo_;
			sprite_.offset = posTo_;
			sprite_.enabled = enableTo_;
			alpha = alphaTo_;
		}else{
			sprite_.offset = posFrom_ * (1f - factor) + posTo_ * factor;
			skew_.skew = skewFrom_ * (1f - factor) + skewTo_ * factor;
			alpha = alphaFrom_ * (1f - factor) + alphaTo_ * factor;
		}
	}

	public void setup(){
		JsonSkeletalObj data =  this._datas[_n];
		
			
		if(data._off){
			enableTo_ = false;
		}else{
			enableTo_ = true;
		}
		posFrom_ = sprite_.offset;
		posTo_ = new Vector3(-data.regX, data.regY);
		
		
		alphaFrom_ = sprite_.color.a;
		alphaTo_ = data.alpha;
		
		
		skewFrom_ = skew_.skew;
		skewTo_ = new Vector2(
			 data.skewX/360 * 2 * Mathf.PI,
			 -data.skewY/360 * 2 * Mathf.PI
			);
		
		
		if(data.info.ease){
			if(data.ease == -0.99){
				method = EZTweener.Method.EaseOut;
			}else if(data.ease == 1){
				method = EZTweener.Method.Linear;
			}else{
				method = EZTweener.Method.EaseIn;
			}
		}else{
			method = EZTweener.Method.Linear;
		}
		
	}
	
	public static void OnFinished_ (EZTweener tween){
		EZJointTween tw = (EZJointTween)(tween);
		if(tw._n+1 < tw._datas.Length){
			EZJointTween.Play(tw._bone, tw._joint, tw.sprite_, tw.skew_, tw._datas, tw._speed, tw._n+1, tw._time);
		}else{
			tw.enabled = false;
			tw._time = 0;
			tw._bone.SendMessage("OnFinished", tw, SendMessageOptions.DontRequireReceiver);
		}
	}
	
	static public EZJointTween Play(GameObject bone, GameObject joint, exSprite sprite, EZSkew skew, JsonSkeletalObj[] datas, float speed, int n, float time){
		
		int temp = 0;
		for(int m =0; m <n +1; ++m){
			temp += datas[m].d;
		}
		
		float duration = temp * speed - time;
		if(duration<0){
			duration = 0;
		}
		EZJointTween comp = EZTweener.Begin<EZJointTween>(joint, duration);
		
		comp.sprite_ = sprite;
		comp.skew_ = skew;
		comp._joint = joint;
		comp._bone = bone;
		comp._datas = datas;
		comp._speed = speed;
		comp._n = n;
		comp.setup();
		comp.onFinished = EZJointTween.OnFinished_;
		
		if (duration <= 0f)
		{
			comp.Sample(1f, true);
			EZJointTween.OnFinished_(comp);
		}
		return comp;
	}
	
	
	public static void onClose (EZTweener tween){
		if(tween){
			EZJointTween tw = (EZJointTween)(tween);
			tw.enabled = false;;
			tween._time = 0;
			tw._bone.SendMessage("OnFinished", tw, SendMessageOptions.DontRequireReceiver);
			
		}

		
		
	}
	override public void close(){
		this.mFactor = 1;
		this._n = _datas.Length;
		this.onFinished = onClose;
		this.doUpdate(1);
	}
	
	
	

	
	
	static public EZJointTween Begin(GameObject bone, GameObject joint, exSprite sprite, EZSkew skew, JsonSkeletalObj[] datas, float speed){
		return EZJointTween.Play(bone, joint, sprite, skew, datas, speed, 0, 0);
		
	}
	
}