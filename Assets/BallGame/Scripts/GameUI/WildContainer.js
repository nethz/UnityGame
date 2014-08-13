#pragma strict
/*
class WildContainer extends SoulContainer
{

	public var _health:UISlider = null;
	private var fighter_:Fighter = null;
	public var _buttonLayout:UIButtonLayout = null;
	public var _healthLayout:UIProgressBarLayout = null;
	public var _seat:Soul.Seat = Soul.Seat.Wild1;
	public var _healthLabel:UILabel = null;
	public var _uiVisible:UIVisible = null;
	private var _isTargeted:boolean = false;
	public function set isTargeted(value:boolean){
		_isTargeted = value;
	}
	public function get isTargeted():boolean{
		return _isTargeted;
	}
	protected var button_:UIButton = null;
	private var hasMagic_:boolean = false;
	
	protected var action_:WildAction = null;
	
	public function set action(value:WildAction){
		this.action_ = value as WildAction;
	}
	
	public function get button():UIButton{
		return button_;
	}
	
	private function createFighter():Fighter{
		
		var self = this;
		var fighter:Fighter = new Fighter();
		fighter.getAttack = function():Attack{
			
			self.soulEnchant.move = true;
			return new NormalAttack(self.soulEnchant.seat);
		};
		
		fighter.getSkill = function():Technique{
		
			if(self.soulEnchant && self.soulEnchant.skill)
			{
				
				
				var info :TechniqueInfo = new TechniqueInfo( 
							self.soulEnchant.seat,
							self.soulEnchant.attackPower,
							self.soulEnchant.baseSpeed
					);
					var skill:Technique = self.soulEnchant.skill.clone(info);
					return skill;
				
			}
			return null;
			
		};
		fighter.getMagic = function():Technique{
			if(self.soulEnchant && self.soulEnchant.magic)
			{
				
				
				var info :TechniqueInfo = new TechniqueInfo( 
							self.soulEnchant.seat,
							self.soulEnchant.magicPower,
							self.soulEnchant.baseSpeed
					);
					var magic:Technique = self.soulEnchant.magic.clone(info);
					return magic;
				
			}
			return null;
			
		};
		fighter.getName = function():String{
			return "wild";
		};
		fighter.getSeat = function():Soul.Seat{
			return self.seat;
		};
		fighter.start = function(){
			self.soulEnchant.move = false;
			var monster:MonsterSoul = this.soul_ as MonsterSoul;
			monster.thinking();
		};
		fighter.over = function(){
			
			self.refresh();
			self.soulEnchant.resetAttackPower();
			self.soulEnchant.resetSkillPower();
		};
		
		fighter.alive = function():boolean{
			return this.hasSoul()&& self.soulEnchant.health > 0;
		};
		fighter.getSpeed = function():float{
			return self.soul_.baseProperty.speed;
		};
		
		fighter.isTargeted = function():boolean{
			return this._isTargeted;
		};
		return fighter;
	}
	public function Awake() {
	
		this.button_ = this.gameObject.GetComponent(UIButton) as UIButton;
		Debug.LogError("nonono"+this.name);
	
	}
	function get seat():Soul.Seat{
		return this._seat;
	}
	public function get fighter():Fighter{
		if(fighter_ == null) 
		{
			fighter_ = this.createFighter();	
		}
		return this.fighter_;
	}
	
	
	
	public function refresh() {
		if(this.button_ == null )
			return;
			
			if(this.soul_ == null){
				_uiVisible.visible = false;
			}else
			{
			
				_uiVisible.visible = true;
				ButtonMagicType.setColor(this.button_, this.soulEnchant.type);
				_health.sliderValue = this.soulEnchant.healthBar;
			}
			
	}
	
	public function goOut(){
		this.soul = null;
	}
	
	public function comeIn(soul:Soul){
		this.soul = soul;
	}
}*/