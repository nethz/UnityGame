

//----------------------------------------------
//            NGUI: Next-Gen UI kit
// Copyright © 2011-2013 Tasharen Entertainment
//----------------------------------------------

using UnityEngine;

/// <summary>
/// Tween the object's local scale.
/// </summary>


public class GeekTweenScale : GeekTweener
{
	public Vector3 from = Vector3.one;
	public Vector3 to = Vector3.one;
	public bool updateTable = false;

	Transform mTrans;
	UITable mTable;

	public Transform cachedTransform { get { if (mTrans == null) mTrans = transform; return mTrans; } }

	public Vector3 scale { get { return cachedTransform.localScale; } set { cachedTransform.localScale = value; } }

	override protected void OnUpdate (float factor, bool isFinished)
	{	
		cachedTransform.localScale = from * (1f - factor) + to * factor;

		
	}

	/// <summary>
	/// Start the tweening operation.
	/// </summary>

	static public GeekTweenScale Begin (GameObject go, float duration, Vector3 scale)
	{
		GeekTweenScale comp = GeekTweener.Begin<GeekTweenScale>(go, duration);
		comp.from = comp.scale;
		comp.to = scale;

		if (duration <= 0f)
		{
			comp.Sample(1f, true);
			comp.enabled = false;
		}
		return comp;
	}
}
