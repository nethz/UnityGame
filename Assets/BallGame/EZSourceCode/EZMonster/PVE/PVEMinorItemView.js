#pragma strict

class PVEMinorItemView extends MissionItemView{
	//public var _mark:UISprite = null;
	public var _new:EZSub = null;
	public var _consume:UILabel = null;
	public var _enemy:UILabel = null;
	public var _bg:UISprite = null;
	public var _title:UILabel = null;
	public var _cards:EZCardCoreView[] = null;
	private var isOpen_:boolean = false;
	private var data_:JsonData.Mission = null;
	public var _enemyBegin:String;
	public var _enemyEnd:String;
	public var _consumeBegin:String;
	public var _box:BoxCollider;
	public function get data():JsonData.Mission{
		return data_;
	}
	public function Awake(){
		this.close();
	}
	public function refresh(){
		if(isOpen_){
			_box.enabled = true;
			_new.open();
			_consume.text = _consumeBegin + data_.ap.ToString();
			_consume.enabled = true;
			_enemy.text = _enemyBegin + data_.team.ToString() + _enemyEnd;
			_enemy.enabled = true;
			_bg.enabled = true;
			_title.text = data_.name;
			_title.enabled = true;
			for(var i:int = 0;i<_cards.length;++i){
				var cards:JsonData.MissionCard[] = data_.cards;
				if(i < cards.Length){
					var core:EZCardCoreData = new EZCardCoreData();
					core.quality = Geek.GetQualityType(cards[i].quality);
					core.magicType = Geek.GetMagicType(cards[i].magicType);
					if(cards[i].quality == -1){
						core.style = "none";
					}else{
						core.style = cards[i].style;
					}
					_cards[i].setupCore(core);
				}else{
					_cards[i].setupCore(null);
				};
				_cards[i].open();
			}
		}else{
			_box.enabled = false;
			_new.close();
			_consume.enabled = false;
			_enemy.enabled = false;
			_bg.enabled = false;
			_title.enabled = false;
			for(var j:int = 0;j<_cards.length;++j){
				_cards[j].close();
			}
		}
	}
	
	public function setup(subscript:EZSubscript, data:JsonData.Mission){
		data_ = data;
		_new.load(subscript, "m"+ data.id.ToString());
		refresh();
	}
	public function open(){
		
		isOpen_ = true;
		refresh();
		
	}
	
	public function close(){
		isOpen_ = false;
		refresh();
	}
	
	
}