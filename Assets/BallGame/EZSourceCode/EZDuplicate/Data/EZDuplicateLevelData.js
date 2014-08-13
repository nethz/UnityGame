#pragma strict

class EZDuplicateLevelData{
	var _name:String;
	var _level:String;
	var _ap:float;
	var _team:int;
	var _timestamp:int;
	public function load(data:JsonData.LevelItem){
		_name = data.name;
		
		_level = data.level;
		_ap = data.ap;
		_team = data.team;
	}
}