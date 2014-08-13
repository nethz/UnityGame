using UnityEngine;
using System.Collections;

public class EZCardViewInfo : MonoBehaviour {
	
	
	private int magicType_ = 0;
	public int magicType { get { return magicType_; } set { magicType_ = value; } }

	
	
	private int lv_ = 0;
	public int lv { get { return lv_; } set { lv_ = value; } }

	
	
	private int quality_ = 0;
	public int quality { get { return quality_; } set { quality_ = value; } }

	private int id_ = 0;
	public int id { get { return id_; } set { id_ = value; } }

	
	private float attack_ = 0;
	public float attack { get { return attack_; } set { attack_ = value; } }
	
	
	private float speed_ = 0;
	public float speed { get { return speed_; } set { speed_ = value; } }
	
	
	
	private float maxHealth_ = 0;
	public float maxHealth { get { return maxHealth_; } set { maxHealth_ = value; } }
	
	private int seat_ = 0;
	public int seat { get { return seat_; } set { seat_ = value; } }
	
	
	private int mark_ = 0;
	public int mark { get { return mark_; } set { mark_ = value; } }
	
	private int userLocked_ = 1;
	public int userLocked { get { return userLocked_; } set { userLocked_ = value; } }

	private bool mainSelected_ = false;
	public bool mainSelected{ get { return mainSelected_; } set { mainSelected_ = value; } }
	
	
	private bool selected_ = false;
	public bool selected{ get { return selected_; } set { selected_ = value; } }
	
}
