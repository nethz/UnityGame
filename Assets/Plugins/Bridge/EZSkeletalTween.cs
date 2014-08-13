//----------------------------------------------
//            NGUI: Next-Gen UI kit
// Copyright © 2011-2012 Tasharen Entertainment
//----------------------------------------------

using UnityEngine;

/// <summary>
/// Tween the object's rotation.
/// </summary>

public class EZSkeletalTween : EZTweener
{
	private Vector3 rotFrom_;
	private Vector3 rotTo_;
	
	private Vector3 posFrom_;
	private Vector3 posTo_;
	
	public Vector3 scaFrom = Vector3.one;
	public Vector3 scaTo = Vector3.one;
	
	public delegate void Callback();
	public int _n = 0;
	public GameObject _bone;
	public JsonSkeletalObj[] _datas;
	public float _speed = 1;
	Transform mTrans;
	
	public Transform cachedTransform { get { if (mTrans == null) mTrans = transform; return mTrans; } }
	
	public Vector3 scale { get { return cachedTransform.localScale; } set { cachedTransform.localScale = value; } }
	public Vector3 position { get { return cachedTransform.localPosition; } set { cachedTransform.localPosition = value; } }
	public Quaternion rotation { get { return cachedTransform.localRotation; } set { cachedTransform.localRotation = value; } }

	override protected void OnUpdate (float factor, bool isFinished){
		if(_bone){
			if(isFinished){
				
				_bone.transform.localRotation = Quaternion.Euler(rotTo_);
				
				_bone.transform.localPosition = new Vector3(posTo_.x, posTo_.y, _bone.transform.localPosition.z);
				_bone.transform.localScale = scaTo ;
			}else{
				
				_bone.transform.localRotation = Quaternion.Slerp(Quaternion.Euler(rotFrom_), Quaternion.Euler(rotTo_), factor);
				Vector3 position = posFrom_ * (1f - factor) + posTo_ * factor;
				_bone.transform.localPosition = new Vector3(position.x, position.y, _bone.transform.localPosition.z);
				_bone.transform.localScale = scaFrom * (1f - factor) + scaTo * factor;
			}
		}
	}

	public void setup(){
		
		JsonSkeletalObj data =  this._datas[_n];
		Quaternion rot = Quaternion.AngleAxis( data.rotation, Vector3.back);
		rotFrom_ = _bone.transform.localRotation.eulerAngles;
		rotTo_ = rot.eulerAngles;
		
		posFrom_ = _bone.transform.localPosition;
		posTo_ = new Vector3(data.x, -data.y, posFrom_.z);
		
		scaFrom = _bone.transform.localScale;
		scaTo =  new Vector3(data.scaleX, data.scaleY, 1);
		
		if(data.info.ease){
			if(data.ease >= -0.99 && data.ease <0){
				method = EZTweener.Method.EaseIn;
			}else if(data.ease <= 1 && data.ease >0){
				method = EZTweener.Method.EaseOut;
			}else{
				method = EZTweener.Method.Linear;
			}
		}else{
			method = EZTweener.Method.Linear;
		}
	}
	
	
	public static void onClose (EZTweener tween){
		if(tween){
			EZSkeletalTween tw = (EZSkeletalTween)(tween);
			tw.enabled = false;;
			tween._time = 0;
			tw._bone.SendMessage("OnFinished", tw, SendMessageOptions.DontRequireReceiver);
		}
		
		
	}
	override public void close(){
		this._n = _datas.Length;
		this.mFactor = 1;
		this.onFinished = onClose;
		this.doUpdate(1);
	}
	
	
	
	
	public static void OnFinished_ (EZTweener tween){
		
		EZSkeletalTween tw = (EZSkeletalTween)(tween);
		
		if(tw._n+1 < tw._datas.Length){
			EZSkeletalTween.Play(tw._bone, tw._datas, tw._speed, tw._n+1, tw._time);
		}else{
			tw.enabled = false;
			tw._time = 0;
			tw._bone.SendMessage("OnFinished", tw, SendMessageOptions.DontRequireReceiver);
		
		}
		
	}
	static public EZSkeletalTween Play(GameObject bone, JsonSkeletalObj[] datas, float speed, int n, float time){
		
		int temp = 0;
		for(int m =0; m <n +1; ++m){
			temp += datas[m].d;
		}
		
		float duration = temp * speed - time;
		if(duration<0){
			duration = 0;
		}
		EZSkeletalTween comp = EZTweener.Begin<EZSkeletalTween>(bone, duration);
		comp._bone = bone;
		comp._datas = datas;
		comp._speed = speed;
		comp._n = n;
		comp.setup();
		comp.onFinished = EZSkeletalTween.OnFinished_;
		
		if (duration <= 0f){
			comp.Sample(1f, true);
			EZSkeletalTween.OnFinished_(comp);
		}
		return comp;
	}
	static public EZSkeletalTween Begin(GameObject bone, JsonSkeletalObj[] datas, float speed){
		EZSkeletalTween comp = EZSkeletalTween.Play(bone, datas, speed, 0, 0);
		comp._time = 0;
		return comp;
		
	}
	
}