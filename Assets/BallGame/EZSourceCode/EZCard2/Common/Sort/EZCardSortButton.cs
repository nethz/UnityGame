using UnityEngine;
using System.Collections;

public class EZCardSortButton : MonoBehaviour {

	public EZCardSort _sort;
	public EZCardSort.Type _type;
	public void OnClick(){
		_sort.sort(_type);
		this.transform.parent.parent.SendMessage("close", SendMessageOptions.DontRequireReceiver);
	}
	
	
}
