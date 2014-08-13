using UnityEngine;
using System.Collections;

public class EZJsonTest : MonoBehaviour {
	public string json = "";
	[SerializeField]
	public JsonData.Soul soul = null;
	void Start () {
		soul = JsonData.Soul.Load(json);
		Debug.Log (soul.baseProp.maxHealth);
		Debug.Log ( JsonData.Soul.Save(soul));
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
