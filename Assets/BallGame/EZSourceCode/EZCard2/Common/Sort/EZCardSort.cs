using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class EZCardSort : MonoBehaviour {
	public enum Type{
		Lv,
		Quality, 
		MagicType,
		Attack,
		Speed,
		MaxHealth,
	};
	private EZCardSort.Type type_ = EZCardSort.Type.Lv;
	public void Awake(){
		if(PlayerPrefs.HasKey("card_sort")){
			type_ = (EZCardSort.Type)(PlayerPrefs.GetInt("card_sort"));
			
		}
		sort(type_);
	}
	public GeekTable _table;
	public void sort(EZCardSort.Type type){
		type_ = type;
		IComparer<Transform> comparer = null;
		switch(type){
		case EZCardSort.Type.Lv:
			comparer = new LvComparer();
			break;
		case EZCardSort.Type.Quality:
			comparer = new QualityComparer();
			break;
		case EZCardSort.Type.MagicType:
			comparer = new MagicTypeComparer();
			break;
		case EZCardSort.Type.Attack:
			comparer = new AttackComparer();
			break;
		case EZCardSort.Type.Speed:
			comparer = new SpeedComparer();
			break;
		case EZCardSort.Type.MaxHealth:
			comparer = new MaxHealthComparer();
			break;
			
		}
		
		_table.comparer = comparer;
		_table.repositionNow = true;
		
		setBtnByType(type);
		PlayerPrefs.SetInt("card_sort", (int)(type_));
		PlayerPrefs.Save();
		
	}
	
	private void setBtnByType(EZCardSort.Type type){
		
		string name = "";
		switch(type){
		case EZCardSort.Type.Lv:
			name = "bagLv";
			break;
		case EZCardSort.Type.Quality:
			name = "bagQua";
			break;
		case EZCardSort.Type.MagicType:
			name = "bagPro";
			break;
		case EZCardSort.Type.Attack:
			name = "bagAttack";
			break;
		case EZCardSort.Type.Speed:
			name = "bagSpeed";
			break;
		case EZCardSort.Type.MaxHealth:
			name = "bagHP";
			break;
		}
		GameObject target = GameObject.FindGameObjectWithTag("InfoView");
		if(target){
			target.SendMessage("setbtnSortBg", name, SendMessageOptions.DontRequireReceiver);
		
		}
	}
	
	
	//负责同步按钮
	//负责存取排序方式
	//排序之后负责光标更新
	//负责摄像机归零
	
}
