#pragma strict

public class EZShopMainMenuView extends EZApBase{
	public var _panel:UIPanel = null;
	public var _diamond:UIButton;
	public var _energy:UIButton;
	public var _bag:UIButton;
	private var _player:JsonData.Player;
	private var isOpen_:boolean = false;
	
	public function Awake(){
		close();
	}
	public function onFulled(){
		refresh();
	}
	public function onEmpty(){
		if(isOpen_){
			refresh();
		}
	}
	public function setup(player:JsonData.Player){
		_player = player;
		refresh();
	}
	public function open(){
		isOpen_ = true;
		_panel.enabled = true;
		_bag.isEnabled = true;
		_diamond.isEnabled = true;
		_energy.isEnabled = true;
		refresh();
	}
	public function refresh(){
		if(_panel.enabled){
			var ap:float = EZApData.GetAp(_player.ap, _player.apTime, _player.maxAp, _player.apPerTime);
			if(ap >= _player.maxAp){
				_energy.isEnabled = false;
				_energy.UpdateColor(false, true);
			}else{
				_energy.isEnabled = true;
				_energy.UpdateColor(true, true);
			}
		}
	}
	public function close(){
		isOpen_ = false;
		_panel.enabled = false;
		_bag.isEnabled = false;
		_diamond.isEnabled = false;
		_energy.isEnabled = false;
	}
}
