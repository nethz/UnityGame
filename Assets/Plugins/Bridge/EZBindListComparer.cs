using UnityEngine;
using System.Collections;

using System.Collections.Generic;

public class EZBindListComparer : IComparer<Transform> {

	private int compareType(EZBindData a, EZBindData b){
		if(a.bindType == EZBindData.BindType.State){
			if(b.bindType != EZBindData.BindType.State){
				return -1;
				
			}
		}else{
			if(b.bindType == EZBindData.BindType.State){
				return 1;
			}
		}
		return 0;
	}
	private int compareCount(EZBindData a, EZBindData b){
		
		if(a.count < b.count){
			return -1;
		}
		if(a.count > b.count){
			return 1;
		}
		return 0;
	}
	
    public int Compare(Transform a, Transform b){
		
		int ret = 0;
		EZBindComparerItem aItem = a.gameObject.GetComponent<EZBindComparerItem>();
		EZBindComparerItem bItem = b.gameObject.GetComponent<EZBindComparerItem>();
		
		ret = this.compareType(aItem.data, bItem.data);
		
		if(ret == 0){
			ret = this.compareCount(aItem.data, bItem.data);
		}
		
		
		return ret;
	
		
    }
}
