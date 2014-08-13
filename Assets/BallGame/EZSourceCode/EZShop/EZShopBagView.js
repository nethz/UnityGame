#pragma strict

public class EZShopBagView extends MonoBehaviour{
	public var _title:UISprite = null;
	public var _diamond:EZShopBagCellView;
	public var _money:EZShopBagCellView;
	public var _sound:EZSound;
	public var _method:GeekTweener.Method = GeekTweener.Method.EaseOut;
	public function setup(shop:JsonData.SetupShop, bag:JsonData.Bag){
		_diamond.setup(shop.sellBag.diamond, 1);
		_money.setup(shop.sellBag.getMoney(bag.max), 1 + bag.max);
	
	}
	
	public function Awake(){
		this.close();
	}

	private function inTaskOne(object:GameObject):Task{
		var task:Task = new Task();
		var tp:GeekTweenPosition = null;
		task.init = function(){
			tp = GeekTweenPosition.Begin(object, 0.2, object.transform.localPosition - Vector3(800, 0 ,0));
			tp.method = _method;
		};
		task.isOver = function():boolean{
			if(tp && tp.enabled){
				return false;
			}
			return true;
		};
		return task;
	}
	
	
	public function inTask():Task{
		var mt:MultiTask = new MultiTask();
		
		for(var i:int = 0; i<2; ++i){
			var tl:TaskList = new TaskList();
			var wait:EZWaitTask = new EZWaitTask();
			wait.setAllTime((0.2/2) *i);
			tl.push(wait);
			
			
			if(i == 0){
				tl.push(inTaskOne(_money.gameObject));
			}else if(i == 1){
				tl.push(inTaskOne(_diamond.gameObject));
			}
			mt.push(tl);
		}
		
		return mt;
	}
	
	public function openTask():Task{
		
		var tl:TaskList = new TaskList();
		TaskManager.PushFront(tl, function(){
		
			_sound.play();
			_money.gameObject.transform.localPosition += Vector3(800, 0 , 0);
			_diamond.gameObject.transform.localPosition += Vector3(800, 0 , 0);
			this.open();
		});
		tl.push(this.inTask());
		return tl;
	}
	

	private function open(){
		_title.enabled = true;
		_diamond.open();
		_money.open();
	}
	
	public function close(){
	
		_title.enabled = false;
		_diamond.close();
		_money.close();
	
	}
}