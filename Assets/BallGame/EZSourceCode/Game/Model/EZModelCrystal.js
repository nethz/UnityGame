#pragma strict
class EZModelCrystal  extends MonoBehaviour{

	private var group_:int = 0;
	private var power_:int = 0;
	//private var use_:boolean = false;
	private var maxPower_:int = 10;
	private var standBy_:boolean = true;
	private var tech_:EZTechnique = null;
	//private var crystal_:JsonData.CrystalTech = null;
//	public function get use():boolean{
//		return use_;
	//}
	public function useIt(){
		//use_ = true;
		power_ = 0;
		EZHarvestTable.GetInstance().useCrystal = true;
	}
	public function get technique():EZTechnique{
		return tech_;
	}
	public function Awake(){
		standBy_ = true;
	}
	public function OnDestroy(){
		EZContainerManager.SetCrystal(null);
	}

	public function get power():int{
		return power_;
	}
	public function get maxPower():int{
		return maxPower_;
	}
	public function get group():int{
		return group_;
	}
	public function get filled():boolean{
		return power_ >= maxPower_;
	}
	//public function get data():JsonData.CrystalTech{
//		return crystal_;/
	//}
	public function load(crystal:JsonData.CrystalTech){
		
		power_ = 0;
		if(crystal){
			tech_ = EZTechniqueManager.instance().create(crystal.tech);
		
			maxPower_ = crystal.maxMp;
			group_ = crystal.group;
			EZContainerManager.SetCrystal(this);
		}else{
			EZContainerManager.SetCrystal(null);
		}
	}
	public function addPower(type:Geek.MagicType, power:int){
		if(this.power_ >= this.maxPower_){
			return;
		}
		if(type == Geek.MagicType.Crystal){
			
			this.power_ += power;
			if(this.power_ > this.maxPower_){
				this.power_ = this.maxPower_;
			}
		}
	}
	
	public function get standBy():boolean{
		return standBy_;
	}
	
	//public function testAction(){
//		return this.power_ >= this.group_;/
	//}
	
	public function doTechnique():EZTechnique{
		if(standBy_){
			standBy_ = false;
		}
		return null;
	}
	


}
