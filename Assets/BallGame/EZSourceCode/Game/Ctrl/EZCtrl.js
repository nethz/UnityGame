#pragma strict

class EZCtrl extends MonoBehaviour{
	public static var index:int = 0;
	public static function Feedback(id:int, color:Color){
		var feedback:EZIDColorAction = ActionManager.Create("view.pet.feedback") as EZIDColorAction;
		feedback.id = id; 
		feedback.color = color;
		ActionManager.Run(feedback);
	}
	public static function Flicker(data:EZTechDataRoot){
	
		var datas:EZIDFlickerAction.Data[] = data.flicker;
		for(var i:int = 0; i< datas.length; ++i){
			var d:EZIDFlickerAction.Data = datas[i];
			if(d){
				var action:EZIDFlickerAction = ActionManager.Create("view.hud.flicker") as EZIDFlickerAction;
				action.data = d;
				action.id = i;
				ActionManager.Run(action);
				
			}
			data.clearFlicker(i);
			
		}
	}
	public static function BuffClose(close:Array){
		for(var i:int = 0; i< close.length; ++i){
			var buff:EZBuff = close[i] as EZBuff;
			if(buff){
				var soul:EZSoul = buff.gameObject.GetComponent(EZSoul) as EZSoul;
				BindAction(buff.data, buff.to, EZBindData.Action.Destroy);
				if(soul){
					EZCtrl.ViewHpBar(soul);
				}
			}
		}
	}
	
	public static function DotClose(close:Array){
		for(var i:int = 0; i< close.length; ++i){
			var dot:EZDot = close[i] as EZDot;
			if(dot){
				BindAction(dot.data, dot.to, EZBindData.Action.Destroy);
			}
		}
	}
	
	public static function UpdateState(soul:EZSoul){
		var boss:EZBossSoul = soul.gameObject.GetComponent(EZBossSoul);
		var action:EZIDSetBindDataAction = ActionManager.Create("view.pet.state") as EZIDSetBindDataAction;
		action.id = soul.seat;
		if(boss){
			action.data = EZBindTable.GetInstance().create(boss.state.name, Geek.MagicType.None);
			if(action.data != null){
				action.data.number = boss.state.number;
				
				action.data.val = boss.state.val;
			}
			
		}else{
			action.data = null;
		}
		
		ActionManager.Run(action);
	}
	
	
	public static function UpdateState(seat:EZSoul.Seat){
		
		var soul:EZSoul = EZContainerManager.GetSoul(seat) as EZSoul;
		UpdateState(soul);
		
	}
	
	
	public static function DotFlicker(dots:Array){
		for(var i:int = 0; i< dots.length; ++i){
			var dot:EZDot = dots[i] as EZDot;
			if(dot){
				BindAction(dot.data, dot.to, EZBindData.Action.Flicker);
			}
		}
	}
	public static function BuffFlicker(buffs:Array){
		for(var i:int = 0; i< buffs.length; ++i){
			var buff:EZBuff = buffs[i] as EZBuff;
			if(buff){
				BindAction(buff.data, buff.to, EZBindData.Action.Flicker);
			}
		}
	}
	
	
	
	public static function BuffFlickerNumber(buffs:Array){
		for(var i:int = 0; i< buffs.length; ++i){
			var buff:EZBuff = buffs[i] as EZBuff;
			if(buff){
				BindAction(buff.data, buff.to, EZBindData.Action.NumberFlicker);
			}
		}
	}

	
	
	public static function ViewMagicBar(seat:EZSoul.Seat, count:int){
		var soul:EZSoul = EZContainerManager.GetSoul(seat) as EZSoul;
		ViewMagicBar(soul, count);
	}
	public static function FlickerBindAction(data:EZBindData, seat:EZSoul.Seat){
		BindAction(data, seat, EZBindData.Action.Flicker);
	}
	
	
	public static function FlickerNumberBindAction(data:EZBindData, seat:EZSoul.Seat){
		BindAction(data, seat, EZBindData.Action.NumberFlicker);
	}
	
	public static function CloseBindAction(data:EZBindData, seat:EZSoul.Seat){
		BindAction(data, seat, EZBindData.Action.Destroy);
	}
	public static function CreateBindAction(bind:EZBind){
		var data:EZBindData = bind.data;
		if(data && !String.IsNullOrEmpty(data.style)){
			BindAction(data, bind.to, EZBindData.Action.Create);
		}
	}
	
	public static function BindAction(data:EZBindData, seat:EZSoul.Seat, act:EZBindData.Action){
		var action:EZIDBindAction = ActionManager.Create("view.hud.bind") as EZIDBindAction;
		action.id = seat;
		action.action = act;
		action.data = data;
		ActionManager.Run(action);
	}
	
	
	
	public static function ViewFoeBar(seat:EZSoul.Seat, timeOffset:int){
		var soul:EZSoul = EZContainerManager.GetSoul(seat) as EZSoul;
		ViewFoeBar(soul, timeOffset);
	}
	
	public static function ViewFoeBar(soul:EZSoul, timeOffset:int){
		if(soul){
			var foe:EZFoeInterface = soul.GetComponent(EZFoeInterface) as EZFoeInterface;
			if(foe != null){
				var time:EZIDSetTimeAction = ActionManager.Create("view.hud.time") as EZIDSetTimeAction;
				time.id = soul.seat;
				time.time = foe.getTime() + timeOffset; 
				
				time.val = foe.getMagic();  
				time.all =  foe.getAllMagic();
				
				var handler:EZBuffHandler = soul.getBuffHandler();
				handler.refresh();
				if(handler.deposit()){
					time.state = EZHudState.State.WeChant; 
				}else{
					time.state = foe.getState(); 
				}
				ActionManager.Run(time);
			}
		}
	}
	
	

	
	
	public static function ViewMagicBar(soul:EZSoul, count:int){
	
		var mp:EZIDMagicBarAction = ActionManager.Create("view.hud.mp") as EZIDMagicBarAction;
		mp.id = soul.seat; 
		mp.val = soul.magicPower;  
		mp.all = soul.magicMaxPower; 
		var handler:EZBuffHandler = soul.getBuffHandler();
		handler.refresh();
		var foe:EZFoeInterface = soul.GetComponent(EZFoeInterface) as EZFoeInterface;
		if(handler.deposit()){
			if(foe){
				mp.state = EZHudState.State.FoeChant; 
			}else{
				mp.state = EZHudState.State.WeChant; 
			}
		}else{
			if(foe){
				mp.state = foe.getState(); 
			}else{
			
			
				if(soul.hasMagic()){
					mp.state = EZHudState.State.WeMagic; 
				}else{
					mp.state = EZHudState.State.WeNoMagic; 
					mp.all = 0; 
					mp.val = 0;  
				}
				
				
			}
		}
		ActionManager.Run(mp);
		if(count != 0){
			var number1:EZIDNumberAction = ActionManager.Create("view.hud.number") as EZIDNumberAction;
			number1.color = EZHudNumber.EzColor.Blue;
			number1.from = count;
			number1.to = count;
			number1.id = soul.seat; 
			ActionManager.Run(number1);
		}
	
	}
	
	
	public static function ViewSkillBar(seat:EZSoul.Seat, show:boolean){
		
		var soul:EZSoul = EZContainerManager.GetSoul(seat) as EZSoul;
		
		if(seat == EZSoul.Seat.WeBattle || seat == EZSoul.Seat.FoeBattle && soul){
			var mp:EZIDMagicBarAction = ActionManager.Create("view.hud.mp") as EZIDMagicBarAction;
			mp.id = soul.seat; 
			
			if(soul.hasSkill()){
				if(show){
					mp.val = 1; 
				}else{
					mp.val = 0; 
				}
				mp.state = EZHudState.State.WeSkill;
			}else{
				mp.val = 0; 
				mp.state = EZHudState.State.WeNoSkill;
			}
			mp.all = 1; 
			ActionManager.Run(mp);
		}
		
		
				

	}
	public static function ViewCrystal(enable:boolean){

		if(EZCrystalInGame.GetInstance()){
		//	Debug.LogWarning("asdfasdfasdf");
			var battle:EZSoul = EZContainerManager.GetSoul(EZSoul.Seat.WeBattle);
			var crystal:EZModelCrystal = EZContainerManager.GetCrystal();
			EZCrystalInGame.GetInstance().canAction(enable, battle, crystal);
		}
		
		
		
	}
	public static function ViewHpBar(seat:EZSoul.Seat){
		ViewHpBar(seat, 0, 0, EZHudNumber.Size.Small);
	
	}
	public static function ViewHpBar(soul:EZSoul){
		ViewHpBar(soul, 0, 0, EZHudNumber.Size.Small);
	
	}
	public static function ViewHpBar(soul:EZFakeSoul){
		ViewHpBar(soul, 0, 0, EZHudNumber.Size.Small);
	
	}
	
	public static function ViewHpBar(seat:EZSoul.Seat, from:int, to:int, size:EZHudNumber.Size){
		var soul:EZSoul = EZContainerManager.GetSoul(seat) as EZSoul;
		ViewHpBar(soul, from, to, size);
	}
	
	public static function ViewHpBar(soul:EZSoul, from:int, to:int, size:EZHudNumber.Size){
		ViewHpBar(new EZFakeSoul(soul), from, to, size);
	}
	
	public static function ViewHpBar(soul:EZFakeSoul, from:int, to:int, size:EZHudNumber.Size){
		if(soul){
			var hp:EZIDSetHpAction = ActionManager.Create("view.hud.hp") as EZIDSetHpAction;
			hp.id = soul.seat; 
			hp.hp = soul.health; 
			hp.ad = soul.ad;
			hp.max = soul.baseMaxHealth; 
			ActionManager.Run(hp);
			if(to != 0){
				var action:EZIDNumberAction = ActionManager.Create("view.hud.number") as EZIDNumberAction; 
				if(to > 0){
					action.color = EZHudNumber.EzColor.Green;
				}else{
					if(from != to){
						if(from > to){
							action.color = EZHudNumber.EzColor.Red;
						}else if(from < to){
							action.color = EZHudNumber.EzColor.White;
						}
					}else{
						action.color = EZHudNumber.EzColor.Yellow;
					}
				}
				action.from = from;
				action.to = to;
				action.id = soul.seat;
				action.size = size;
				ActionManager.Run(action);
			}
		}
		
	}
	
	public static function SpeedBar(list:EZSoul.Seat[]){
		var speed:EZIDListAction = ActionManager.Create("view.hud.speed") as EZIDListAction;
		speed.list = list;
		ActionManager.Run(speed);
	}
}