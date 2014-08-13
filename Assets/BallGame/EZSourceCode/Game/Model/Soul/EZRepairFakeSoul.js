#pragma strict

class EZRepairFakeSoul extends EZFakeSoul{
	private var repair_:float = 0;
	
	function EZRepairFakeSoul(ret:EZTechniqueHandler.MedicalResult){
	
		repair_ = ret.repair;
		super(ret.to);
	}
	
	protected function getHealth():float{
		return soul_.health + repair_;
	}
	function execute(){
		 soul_.health =  soul_.health + repair_;
		 repair_ = 0;
	}
}