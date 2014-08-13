using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class CardComparer{
	
	public int magicType(EZCardViewInfo aCard, EZCardViewInfo bCard){
		
		if(aCard != null && bCard != null){
			if(aCard.magicType > bCard.magicType) {
				return 1;
			}
			
			if(aCard.magicType < bCard.magicType) {
				return -1;
			}
			
			return 0;
		}
		return 0;
	}
	public int seat(EZCardViewInfo aCard, EZCardViewInfo bCard){
		if(aCard != null && bCard != null){
			if(aCard.seat > bCard.seat) {
				return 1;
			}
			
			if(aCard.seat < bCard.seat) {
				return -1;
			}
			
			return 0;
		}
		return 0;
	}
	public int lv(EZCardViewInfo aCard, EZCardViewInfo bCard){
		if(aCard != null && bCard != null){
			if(aCard.lv < bCard.lv) {
				return 1;
			}
			
			if(aCard.lv > bCard.lv) {
				return -1;
			}
			
			return 0;
		}
		return 0;
	}
	
	public int mark(EZCardViewInfo aCard, EZCardViewInfo bCard){
		
		if(aCard != null && bCard != null){
			if(aCard.mark > bCard.mark) {
				return 1;
			}
			
			if(aCard.mark < bCard.mark) {
				return -1;
			}
			
			return 0;
		}
		return 0;
	}
	

	
	public int quality(EZCardViewInfo aCard, EZCardViewInfo bCard){
		
		if(aCard != null && bCard != null){
			if(aCard.quality < bCard.quality) {
				return 1;
			}
			
			if(aCard.quality > bCard.quality) {
				return -1;
			}
			
			return 0;
		}
		return 0;
	}
	
	public int id(EZCardViewInfo aCard, EZCardViewInfo bCard){
		
		if(aCard != null && bCard != null){
			if(aCard.id > bCard.id) {
				return 1;
			}
			
			if(aCard.id < bCard.id) {
				return -1;
			}
			
			return 0;
		}
		return 0;
	}
	
	public int attack(EZCardViewInfo aCard, EZCardViewInfo bCard){
		
		if(aCard != null && bCard != null){
			if(aCard.attack < bCard.attack) {
				return 1;
			}
			
			if(aCard.attack > bCard.attack) {
				return -1;
			}
			
			return 0;
		}
		return 0;
	}
	
	public int speed(EZCardViewInfo aCard, EZCardViewInfo bCard){
		
		if(aCard != null && bCard != null){
			if(aCard.speed < bCard.speed) {
				return 1;
			}
			
			if(aCard.speed > bCard.speed) {
				return -1;
			}
			
			return 0;
		}
		return 0;
	}
	
	public int maxHealth(EZCardViewInfo aCard, EZCardViewInfo bCard){
		
		if(aCard != null && bCard != null){
			if(aCard.maxHealth < bCard.maxHealth) {
				return 1;
			}
			
			if(aCard.maxHealth > bCard.maxHealth) {
				return -1;
			}
			
			return 0;
		}
		return 0;
	}
}

public class MagicTypeComparer: CardComparer, IComparer<Transform>
{
    public int Compare(Transform a, Transform b){
		
		int ret = 0;
		EZCardViewInfo aCard = a.gameObject.GetComponent<EZCardViewInfo>();
		EZCardViewInfo bCard = b.gameObject.GetComponent<EZCardViewInfo>();
		ret = this.seat(aCard, bCard);
		if(ret == 0){
			ret = this.mark(aCard, bCard);
		}
		
		if(ret == 0){
			ret = this.magicType(aCard, bCard);
		}
		
		if(ret == 0){
			ret = this.lv(aCard, bCard);
		}
	
		if(ret == 0){
			ret = this.quality(aCard, bCard);
		}
		
		if(ret == 0){
			ret = this.id(aCard, bCard);
		}
		return ret;
		
    }
}



public class AttackComparer: CardComparer, IComparer<Transform>
{
    public int Compare(Transform a, Transform b){
		
		int ret = 0;
		EZCardViewInfo aCard = a.gameObject.GetComponent<EZCardViewInfo>();
		EZCardViewInfo bCard = b.gameObject.GetComponent<EZCardViewInfo>();
		ret = this.seat(aCard, bCard);

		if(ret == 0){
			ret = this.mark(aCard, bCard);
		}
		
		if(ret == 0){
			ret = this.attack(aCard, bCard);
		}
	
		
		if(ret == 0){
			ret = this.lv(aCard, bCard);
		}
		
		
		if(ret == 0){
			ret = this.quality(aCard, bCard);
		}
		
		if(ret == 0){
			ret = this.magicType(aCard, bCard);
		}
		
		
		if(ret == 0){
			ret = this.id(aCard, bCard);
		}
		return ret;
		
    }
}



public class SpeedComparer: CardComparer, IComparer<Transform>
{
    public int Compare(Transform a, Transform b){
		
		int ret = 0;
		EZCardViewInfo aCard = a.gameObject.GetComponent<EZCardViewInfo>();
		EZCardViewInfo bCard = b.gameObject.GetComponent<EZCardViewInfo>();
		ret = this.seat(aCard, bCard);

		if(ret == 0){
			ret = this.mark(aCard, bCard);
		}
		
		if(ret == 0){
			ret = this.speed(aCard, bCard);
		}
		
		
		if(ret == 0){
			ret = this.lv(aCard, bCard);
		}
		
		
		if(ret == 0){
			ret = this.quality(aCard, bCard);
		}
		
		if(ret == 0){
			ret = this.magicType(aCard, bCard);
		}
		
		
		if(ret == 0){
			ret = this.id(aCard, bCard);
		}
		return ret;
		
    }
}



public class MaxHealthComparer: CardComparer, IComparer<Transform>
{
    public int Compare(Transform a, Transform b){
		
		int ret = 0;
		EZCardViewInfo aCard = a.gameObject.GetComponent<EZCardViewInfo>();
		EZCardViewInfo bCard = b.gameObject.GetComponent<EZCardViewInfo>();
		ret = this.seat(aCard, bCard);
		
		if(ret == 0){
			ret = this.mark(aCard, bCard);
		}
		
		if(ret == 0){
			ret = this.maxHealth(aCard, bCard);
		}
		
		if(ret == 0){
			ret = this.lv(aCard, bCard);
		}
		
		if(ret == 0){
			ret = this.quality(aCard, bCard);
		}
		
		if(ret == 0){
			ret = this.magicType(aCard, bCard);
		}
		
		
		if(ret == 0){
			ret = this.id(aCard, bCard);
		}
		return ret;
		
    }
}




public class LvComparer: CardComparer, IComparer<Transform>
{
    public int Compare(Transform a, Transform b){
		
		int ret = 0;
		EZCardViewInfo aCard = a.gameObject.GetComponent<EZCardViewInfo>();
		EZCardViewInfo bCard = b.gameObject.GetComponent<EZCardViewInfo>();
		ret = this.seat(aCard, bCard);
		
		if(ret == 0){
			ret = this.mark(aCard, bCard);
		}
		
		if(ret == 0){
			ret = this.lv(aCard, bCard);
		}
		
		if(ret == 0){
			ret = this.quality(aCard, bCard);
		}

		if(ret == 0){
			ret = this.magicType(aCard, bCard);
		}
		
		if(ret == 0){
			ret = this.id(aCard, bCard);
		}
		return ret;
    }
}

public class QualityComparer: CardComparer, IComparer<Transform>
{
    public int Compare(Transform a, Transform b){
		 
		int ret = 0;
		EZCardViewInfo aCard = a.gameObject.GetComponent<EZCardViewInfo>();
		EZCardViewInfo bCard = b.gameObject.GetComponent<EZCardViewInfo>();
		ret = this.seat(aCard, bCard);

		if(ret == 0){
			ret = this.mark(aCard, bCard);
		}
		
		if(ret == 0){
			ret = this.quality(aCard, bCard);
		}
		
		if(ret == 0){
			ret = this.lv(aCard, bCard);
		}

		if(ret == 0){
			ret = this.magicType(aCard, bCard);
		}

		if(ret == 0){
			ret = this.id(aCard, bCard);
		}
		return ret;
    }
}



