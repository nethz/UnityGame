using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System;

[System.Serializable]
public class EZHudBindList : MonoBehaviour {

	public GameObject _prototype;
	public GeekTable _table;
	private int count_ = 0;
	private List<EZBindView> datas_ = new List<EZBindView>();
	
	public UIPanel _panel;
	
	private Vector3 tablePosition_;
	public float alpha{set { 
			
				_panel.alpha = value; 	
		
	}}
	public bool isEnabled{set { 
			
				_panel.enabled = value; 	
		
	}}
	public void Start(){
		_table.comparer = new EZBindComparer();
		tablePosition_ = _table.transform.localPosition;
	}
	public bool has(EZBindData data){
		
		Predicate<EZBindView> predicate = delegate(EZBindView view) { 
			if(view.data.count == data.count){
				
				return true;
			};
			return false;
		};
		EZBindView bind = datas_.Find(predicate);
		if(bind){
			return true;
		}
		return false;
	}
	public void Update(){
		repositionNow();
	}
	public void repositionNow(){
		_table.repositionNow = true;
		_table.transform.localPosition = tablePosition_;
	}
	public EZBindView create(EZBindData data){
		
		
		GameObject obj = (GameObject)GameObject.Instantiate(this._prototype);
		obj.transform.parent = this._table.transform;
		obj.name = data.style;
		obj.transform.localScale = this._prototype.transform.localScale;
		obj.transform.position = this._prototype.transform.position;
		obj.SetActive(true);
		EZBindView view = obj.GetComponent<EZBindView>();
		if(view){
			view.data = data;
			datas_.Add(view);
		}
		_table.repositionNow = true;
		_table.transform.localPosition = tablePosition_;
		data.count = count_;
		count_++;
		return view;
	}
	
	public void brightMagic(int magic){
		Predicate<EZBindView> predicate = delegate(EZBindView view) { 
			if(view.data.magicType == magic){
				return true;
			};
			return false;
		};
		List<EZBindView> datas = datas_.FindAll(predicate);
		for(int i=0; i<datas.Count; ++i){
			datas[i].bright();
		}
		
	}
	
	public void darkMagic(int magic){
		Predicate<EZBindView> predicate = delegate(EZBindView view) { 
			if(view.data.magicType == magic){
				return true;
			};
			return false;
		};
		List<EZBindView> datas = datas_.FindAll(predicate);
		for(int i=0; i<datas.Count; ++i){
			datas[i].dark();
		}
		
	}
	
	
	public void brightBind(EZBindData.BindType bind){
		Predicate<EZBindView> predicate = delegate(EZBindView view) { 
			if(view.data.bindType == bind){
				return true;
			};
			return false;
		};
		List<EZBindView> datas = datas_.FindAll(predicate);
		for(int i=0; i<datas.Count; ++i){
			datas[i].bright();
		}
		
	}
	
	public void darkBind(EZBindData.BindType bind){
		Predicate<EZBindView> predicate = delegate(EZBindView view) { 
			if(view.data.bindType == bind){
				return true;
			};
			return false;
		};
		List<EZBindView> datas = datas_.FindAll(predicate);
		for(int i=0; i<datas.Count; ++i){
			datas[i].dark();
		}
		
	}
	public EZBindView bright(EZBindData data){
		Predicate<EZBindView> predicate = delegate(EZBindView view) { 
			if(view.data.count == data.count){
				return true;
			};
			return false;
		};
		EZBindView bind = datas_.Find(predicate);
		if(bind){
			
			bind.bright();
			return bind;
		}
		return null;
	}
	
	public EZBindView dark(EZBindData data){
		Predicate<EZBindView> predicate = delegate(EZBindView view) { 
			if(view.data.count == data.count){
				return true;
			};
			return false;
		};
		EZBindView bind = datas_.Find(predicate);
		if(bind){
			bind.dark();
			return bind;
		}
		return null;
	}
	
	

	public void destroy(EZBindData data){
		Predicate<EZBindView> predicate = delegate(EZBindView view) { 
			if(view.data.count == data.count){
				data.count = -1;
				GameObject.DestroyObject(view.gameObject);
				return true;
			};
			return false;
		};
		datas_.RemoveAll(predicate);
		repositionNow();
	}
	
	public void clear(){
		for(int i =0; i<datas_.Count; ++i){
			GameObject.DestroyObject(datas_[i].gameObject);
		}
		datas_.Clear();
	}
}
