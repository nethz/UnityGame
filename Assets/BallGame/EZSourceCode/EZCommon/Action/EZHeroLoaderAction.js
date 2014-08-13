#pragma strict

class EZHeroLoaderAction extends ActionObj{
	
	private var hero_:JsonData.Hero;
	public function get hero():JsonData.Hero{
		return hero_;
	}
	
	public function load(hero:JsonData.Hero){
		this.hero_ = hero;
	}
	
	
	public function set hero(value:JsonData.Hero){
		this.hero_ = value;
	}
	
	
	
}