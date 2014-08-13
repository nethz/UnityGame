using UnityEngine;
using System.Collections;

public abstract class EZInputHandlerCSharp : MonoBehaviour {
	
	#region Inspector Fields
	
	public Vector2 _position = Vector2.zero;
	public BoxCollider _box = null;
	
	
	#endregion
	static Vector3 GetWorldScale(Transform transform) {
		
		Vector3 worldScale = transform.localScale;
		Transform parent = transform.parent;
		while (parent != null)
		{
			worldScale = Vector3.Scale(worldScale,parent.localScale);
			parent = parent.parent;
			
		}
		return worldScale;
		
	}

	private EZMouseEventCSharp dealEvent(EZMouseEventCSharp evt){ 
		Camera cam =  UICamera.currentCamera;
		Vector3 position  = cam.WorldToScreenPoint(this.gameObject.transform.position);
		Vector3 abc  = cam.ScreenToViewportPoint(evt.absolute - position);  
		evt.worldPoint = cam.ScreenToWorldPoint(evt.absolute); 
		
		Vector3 scale = GetWorldScale(this.gameObject.transform); 
		var r = (cam.GetScreenWidth()/ cam.GetScreenHeight()) ;   
		
		Vector3 v = new Vector3((_box.size.x* scale.x)/(r *2), (_box.size.y* scale.y)/2 , 1);
		evt.position = new Vector3(abc.x/v.x, (abc.y)/v.y , 1);   
		evt.position.x = Mathf.Clamp01(evt.position.x);
		if(evt.position.x == 1.0f){
			evt.position.x = 0.99999f;
		}
		evt.position.y = Mathf.Clamp01(evt.position.y);
		if(evt.position.y == 1.0f){
			evt.position.y = 0.99999f;
		}
		_position = evt.position;
		//evt.worldPoint.y = (evt.position.y * _box.size.y *2)/scale.y + this.gameObject.transform.position;
		return evt;
	}
	abstract protected void inputMove (EZMouseEventCSharp evt);
	abstract protected void inputUp (EZMouseEventCSharp evt);
	abstract protected void inputDown (EZMouseEventCSharp evt);
	
	public void doMove(EZMouseEventCSharp evt){
		inputMove(dealEvent(evt));
	}
	public void doUp(EZMouseEventCSharp evt){
		inputUp(dealEvent(evt));
	}
	public void doDown(EZMouseEventCSharp evt){
		Debug.Log("A");
		inputDown(dealEvent(evt));
	}
	
	
	public void OnPress(bool isPressed){

		if(isPressed){
			doDown(new EZMouseEventCSharp(0, UICamera.lastTouchPosition));
		}else{
			doUp(new EZMouseEventCSharp(0,  UICamera.lastTouchPosition));
		}
	}
	public void OnDrag(Vector2 delta){
		doMove(new EZMouseEventCSharp(0, UICamera.lastTouchPosition));
	}

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
