using UnityEngine;
using System.Collections;

public class GeekTweenValue : GeekTweener {

	public float from = 0f;
	public float to = 1f;
	public string fun = "fun";
	public GameObject receiver = null;
	//public GameObject obj = null;
	
	override protected void OnUpdate (float factor, bool isFinished)
	{	
		float val = from * (1f - factor) + to * factor;
		this.receiver.SendMessage(fun, val,SendMessageOptions.DontRequireReceiver);
		
	}

	/// <summary>
	/// Start the tweening operation.
	/// </summary>

	static public GeekTweenValue Begin (GameObject go, float duration, float from, float to, GameObject receiver, string fun)
	{
		GeekTweenValue comp = GeekTweener.Begin<GeekTweenValue>(go, duration);
		comp.from = from;
		comp.to = to;
		comp.fun = fun;
		comp.receiver = receiver;
		if (duration <= 0f)
		{
			comp.Sample(1f, true);
			comp.enabled = false;
		}
		return comp;
	}
}
