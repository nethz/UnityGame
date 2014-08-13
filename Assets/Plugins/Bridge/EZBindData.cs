using UnityEngine;
using System.Collections;
[System.Serializable]
public class EZBindData{
	public enum BindType{
		
		MedicalDot = 0,
		AttackDot = 1,
		MedicalBuff = 2,
		AttackBuff = 3,
		State = 4,
		None = 5,
	}
	
	public enum Action{
		Create,
		Flicker,
		Bright,
		Dark,
		Destroy,
		NumberFlicker,
	};
	public int count_ = -1;
	public string style_ = "";
	public string name_ = "";
	public float val_ = 0;
	public int number_ = -1;
	public BindType bindType_ = BindType.None;
	public int magicType_ = -1;
	public string title_ = "";
	public string title{ get { return title_; } set {title_ = value; }}
	
	public float val{ get { return val_; } set {val_ = value; }}
	public string name{ get { return name_; } set {name_ = value; }}
	public int count{ get { return count_; } set {count_ = value; }}
	public int number{ get { return number_; } set {number_ = value; }}
	
	public string style{ get { return style_; } set {style_ = value; }}
	public BindType bindType{ get { return bindType_; } set {bindType_ = value; }}
	public int magicType{ get { return magicType_; } set {magicType_ = value; }}
	
}
