using UnityEngine;
using System.Collections;

public class EZCardMarkButton : MonoBehaviour {

	public string _mark = "";
	
	public void OnClick(){
		this.transform.parent.parent.SendMessage("close", SendMessageOptions.DontRequireReceiver);
		
		GameObject target = GameObject.FindGameObjectWithTag("Ctrl");
		if(target){
			target.SendMessage("OnAction", _mark, SendMessageOptions.DontRequireReceiver);
		}
		
		
		//this.transform.parent.parent.SendMessage("close", SendMessageOptions.DontRequireReceiver);
	}
}
