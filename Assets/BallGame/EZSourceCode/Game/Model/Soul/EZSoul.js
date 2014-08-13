#pragma strict
class EZSoul extends MonoBehaviour{

	public enum Seat{
		FighterBegin = 0,
		WeBattle = 0,
		WeBag1 = 1,
		WeBag2 = 2,
		FoeBattle = 3,
		FoeBag1 = 4,
		FoeBag2 = 5,
		FighterEnd = 6,
		Hero = 6,
		Rival = 7,
		All = 8,
		None = 9,
	}
	
	
	private var natureProp_:EZNatureProperty = new EZNatureProperty();
	public var _round:int = 0;
	
	private var buffHandler_:EZBuffHandler = null; 
	private var dotHandler_:EZDotHandler = null; 
	private var seat_:Seat = Seat.None;
	protected var attackPower_:float = 0;
	protected var skillPower_:float = 0;
	protected var magicPower_:float = 0;
 	protected var health_:float = 100;
 	private var alive_:boolean = true;
 	private var appear_:boolean[] = null;
 	
 	
 	public function get group():int{
 		return natureProp_.group;
 	}
 	
 	public function loadAppear(appear:boolean[]){
 		appear_ = appear;
 	} 

 	public function loadNature(data:JsonData.NatureProperty){
 		natureProp_.load(data);
 	} 

	
	public function Awake(){
		buffHandler_ = this.gameObject.AddComponent(EZBuffHandler) as EZBuffHandler;
		dotHandler_ = this.gameObject.AddComponent(EZDotHandler) as EZDotHandler;
		
		alive_ = true;
	}
	
	public static function CreateGameObject():GameObject{
		
		var parent:GameObject = GameObject.FindGameObjectWithTag("SoulsRoom");
		var obj:GameObject = new GameObject("Soul");
		
		if(parent){
			obj.transform.parent = parent.transform;
		}
		
		return obj;
	}
	
	
	public function reset(){
		var parent:GameObject = GameObject.FindGameObjectWithTag("SoulsRoom");

		if(parent){
			this.gameObject.transform.parent = parent.transform;
		}
	
	}
	




	public function getBuffHandler():EZBuffHandler{
		return buffHandler_;
	}
	public function getDotHandler():EZDotHandler{
		return dotHandler_;
	}
	
	public function get health():float{
		return health_;
	}
	private function set alive(value:boolean){
		alive_ = value;
	}
	public function get alive():boolean{
		return alive_;
	}
	public function appear(i:int):boolean{
		if(appear_ == null || i >= appear_.Length){
			return true;
		}
		
		return appear_[i];
	}
	public function set health(value:float){
		
		health_ = value;
		
	}
	public function castrate(){
		if(health_ <= 0){
			this.alive = false;
			health_ = 0;
		}else if(health_ > this.baseMaxHealth){
			health_ = this.baseMaxHealth;
		}
	}
	public function get seat():Seat{
		return this.seat_;
	}
	
	public function get title():String{
		return natureProp_.title;
	}
	public function set seat(value:Seat){
		 this.seat_ = value;
	}
	
	public function get harm():float{
		return (this.baseMaxHealth - this.health);
	}
	
	public function get baseLv():float{
		return 0;
	}
	public function get baseQuality():float{
		return 0;
	}
	  
	public function get attackPower(){
		return attackPower_;
	}
	public function set attackPower(value:float){
		attackPower_ = value;
	}
	
	
	public function set magicPower(value:float){
		magicPower_ = value;
		if(magicPower_ > magicMaxPower)
			this.magicPower_ = magicMaxPower;
	}
	
	public function get skillPower(){
		return skillPower_;
	}
	public function set skillPower(value:float){
		skillPower_ = value;
	}
	
	
	public function get magicPower():float{
		return magicPower_;
	}
	
	public function addSkillPower(pwr:float){
		 this.skillPower += pwr;
	
	}
	public function addMagicPower(pwr:float){
		 this.magicPower += pwr;
	
	}
	
	public function addAttackPower(pwr:float){
		 this.attackPower += pwr;
	}
	public function resetAttackPower(){
		this.attackPower = 0;
	}
	public function resetSkillPower(){
		this.skillPower = 0;
	}
	public function resetMagicPower(){
		this.magicPower = 0;
	}
	
	public function get skillBar():float{
		if(this.skillPower >= 10){
			return 1;
		} 
		return this.skillPower/10.0f;
	}
	
	public function get healthBar():float{
		if(this.baseMaxHealth == 0)
			return 0;
		var bar:float = this.health/ this.baseMaxHealth;
		
		if(bar < 0){
			return 0;
		}else if(bar > 1){
			return 1;
		}
		return bar;
	}
	
	public function get magicBar():float{ 
	
		if(this.magicMaxPower == 0)
			return 0;
		var bar:float = this.magicPower/ this.magicMaxPower;
		
		if(bar < 0){
			return 0;
		}else if(bar > 1){
			return 1;
		}
		return bar;
		
	}
	
	 
	 
		 
	 public function get style():String{  
		return natureProp_.style; 
	
	}  
	
	 
	   
	public function get type():Geek.MagicType{ 
		return natureProp_.type; 
	
	}  
	
	
	public function revive(extent:float){
	
		buffHandler_.refresh();
		buffHandler_.reset();
		dotHandler_.refresh();
		dotHandler_.reset(); 
		
		attackPower_ = 0;
		skillPower_ = 0;
		magicPower_ = 0;
		alive_ = true;
		//private var dotHandler_:EZDotHandler = null; 
	}
	
	
	
	


	


///////////////////
 
 	
	
	 
	public function get baseAttack():float{  
		return 0; 
	
	}  
	 	
	public function get baseMaxHealth():float{  
	
		return 0f; 
	}  
	
	
 	public function get baseSpeed():float{  
		return 0; 
	
	}  
	
	
	public function get skillInfo():JsonData.TechInfo{  
		return null; 
	}  
	
	
	
	public function get magicInfo():JsonData.TechInfo{  
		return null; 
	} 
	 
	
	public function get attack():EZTechnique{  
		return null; 
	}  
	
	
	
	public function get skill():EZTechnique{  
		return null; 
	}  
	
	
	
	public function get magic():EZTechnique{  
		return null; 
	}  
	
	public function get magicMaxPower():float{  
		
		return 1f; 
	}  
	public function hasMagic():boolean{
		return false;
	}
	public function hasSkill():boolean{
		return false;
	}
};
