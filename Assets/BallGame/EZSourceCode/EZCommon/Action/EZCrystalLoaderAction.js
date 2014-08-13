#pragma strict

class EZCrystalLoaderAction extends ActionObj{
	
	private var crystal_:JsonData.CrystalTech;
	public function get crystal():JsonData.CrystalTech{
		return crystal_;
	}
	
	public function load(crystal:JsonData.CrystalTech){
		this.crystal_ = crystal;
	}
	
	
	public function set crystal(value:JsonData.CrystalTech){
		this.crystal_ = value;
	}
	
	
	
}