#pragma strict

class EZShopEnergyState extends StateWithEventMap{
	private var energy_:EZShopEnergyCtrl;
	public function EZShopEnergyState(energy:EZShopEnergyCtrl){
		energy_ = energy;
	}
}