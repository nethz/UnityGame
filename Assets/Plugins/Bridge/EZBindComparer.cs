using UnityEngine;
using System.Collections;

using System.Collections.Generic;


public class EZBindComparer: IComparer<Transform>
{
	private int compareType(EZBindView a, EZBindView b){
		if(a.getBindType() == EZBindData.BindType.State){
			if(b.getBindType() != EZBindData.BindType.State){
				return -1;
				
			}
		}else{
			if(b.getBindType() == EZBindData.BindType.State){
				return 1;
			}
		}
		return 0;
	}
	private int compareCount(EZBindView a, EZBindView b){
		
		if(a.getCount() < b.getCount()){
			return -1;
		}
		if(a.getCount() > b.getCount()){
			return 1;
		}
		return 0;
	}
	
    public int Compare(Transform a, Transform b){
		
		int ret = 0;
		EZBindView aBind = a.gameObject.GetComponent<EZBindView>();
		EZBindView bBind = b.gameObject.GetComponent<EZBindView>();
		
		
		
		
		ret = this.compareType(aBind, bBind);
		
		if(ret == 0){
			ret = this.compareCount(aBind, bBind);
		}
		
		
		return ret;
	
		
    }
}
