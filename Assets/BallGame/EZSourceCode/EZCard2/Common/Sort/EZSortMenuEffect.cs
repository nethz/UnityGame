using UnityEngine;
using System.Collections;

public class EZSortMenuEffect : MonoBehaviour {
	public UICheckbox _lv;
	public UICheckbox _qua;
	public UICheckbox _pro;
	public UICheckbox _attack;
	public UICheckbox _speed;
	public UICheckbox _hp;

	private EZCardSort.Type type_ = EZCardSort.Type.Lv;
	private UICheckbox btn_ = null;
	
	public void Start(){
	}
	
	public void disClickedBtn(){
		if(PlayerPrefs.HasKey("card_sort")){
			type_ = (EZCardSort.Type)(PlayerPrefs.GetInt("card_sort"));
		}
		switch(type_){
			case EZCardSort.Type.Lv:
				btn_ = _lv;
				break;
			case EZCardSort.Type.Quality:
				btn_ = _qua;
				break;
			case EZCardSort.Type.MagicType:
				btn_ = _pro;
				break;
			case EZCardSort.Type.Attack:
				btn_ = _attack;
				break;
			case EZCardSort.Type.Speed:
				btn_ = _speed;
				break;
			case EZCardSort.Type.MaxHealth:
				btn_ = _hp;
				break;
		}
		btn_.isChecked = true;
		
	}
}
