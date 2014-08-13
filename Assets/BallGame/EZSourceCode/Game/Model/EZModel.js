#pragma strict

class EZModel extends MonoBehaviour{
	
	
	private static var instance_:EZModel = null;
	function Awake(){
		this.instance_ = this;
	}
		
	public static function GetInstance():EZModel{
		return this.instance_;
	}
	
	public static function  LevelLoader(data:JsonData.Stronghold[], docs:JsonData.WaveDoc[]){
		instance_._foeManager.load(data, docs);
	}
	public static function  HeroCrystalLoader(crystal:JsonData.CrystalTech){
		instance_._hero.crystal.load(crystal);
	}
	public static function HeroUseCrystal(){
		instance_._hero.crystal.useIt();
	}
	
	public static function  RivalCrystalLoader(crystal:JsonData.CrystalTech){
		instance_._rival.crystal.load(crystal);
	}
	
	public var _hero : EZModelPlayer = null;
	public var _rival : EZModelPlayer = null;
	public var _foeManager : EZModelFoeManager = null;



}