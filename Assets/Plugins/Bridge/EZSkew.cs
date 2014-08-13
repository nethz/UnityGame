using UnityEngine;
using System.Collections;

public class EZSkew : MonoBehaviour {

	
	private Vector2 _offset = Vector2.zero;
	private Vector2 _skew = Vector2.zero;
	private float _alpha = 1f;
	private float _baseAlpha = 1f;

	
	public Vector2 skew { get {return _skew; } set { 
		_skew = value; 
		if(_skew != null){
			this.renderer.material.SetFloat("_skewX",_skew.x);
			this.renderer.material.SetFloat("_skewY",_skew.y);
		}
	} }
	
	
	
	public Vector2 offset { get {return _offset; } set { 
		_offset = value; 
		this.renderer.material.SetFloat("_offsetX",_offset.x);
		this.renderer.material.SetFloat("_offsetY",_offset.y);
	} }
	
	public float baseAlpha { get {return _baseAlpha; } set { 
		_baseAlpha = value; 
		updateAlpha();
	} }
	
	private void updateAlpha(){
		
		this.renderer.material.SetFloat("_alpha", (_alpha * _baseAlpha));
	}
	public float alpha { get {return _alpha; } set { 
		_alpha = value; 
		updateAlpha();
	} }
	
	

	
}
