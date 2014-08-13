#pragma strict

public class EZShopDiamondView extends MonoBehaviour{
	public var _inputCamera:UICamera = null;
	public var _title:UISprite = null;
	public var _prototype:GameObject = null;
	public var _grid:UIGrid; 
	public var _draggable:UIDraggablePanel; 
	public var _sound:EZSound = null;
	private var items_:EZShopDiamondCellView[] = null; 
	private var isloaded_:boolean = false; 
	private var process_:boolean = false;
	public var _loadingText:String = "loading"; 
	
	public var _box:BoxCollider = null;
	public var _paymentOver:Function = null;
	public var succeed_:boolean = false;
	public var _inMethod:GeekTweener.Method = GeekTweener.Method.easeOutCirc;
	public function set paymentOver(value:Function){
		_paymentOver = value;
	}
	
	public function Awake(){
		isloaded_ = false;
		this.close(); 
	}
	public function create():EZShopDiamondCellView{
		 var obj:GameObject = GameObject.Instantiate(_prototype); 
		 obj.SetActive(true);  
		 obj.transform.parent = _grid.transform;  
		 obj.transform.position = _prototype.transform.position;
		 obj.transform.localScale = _prototype.transform.localScale;
		 var diamone:EZShopDiamondCellView = obj.GetComponent(EZShopDiamondCellView) as EZShopDiamondCellView; 
		 return diamone;
	}  
	public function paymentTask(product:JsonData.ProductData):Task{
		#if UNITY_IPHONE && !UNITY_EDITOR
			if(Payment.canMakePayment){ 
				 var task:Task = new Task();
				 task.init = function(){ 
				 	process_ = true;
				 	succeed_ = false;
				 	Payment.makePayment(product.id);
				 };
				 task.isOver = function():boolean{
				 	return !process_;
				 }; 
				 
				 return task;
			}
		#else
			var load:WebLoaderTask = new WebLoaderTask("payment_test", new JsonData.PlayerInfoLoader());
			load.setup(WebForGame.GetInstance().data);
			TaskManager.PushBack(
				load,
				function(){
					var info:JsonData.PlayerInfo = load.data as JsonData.PlayerInfo;
					if(info && info.succeed){
						EZPlayerTable.GetInstance().save(info.player);
						process_ = false;
				 		succeed_ = true;
					}else{
					
					
					Debug.Log("bbbbbbb");
					}
				}
			);
			return load;
		#endif
			
			
	}
	public function onPayment(product:JsonData.ProductData){
		Debug.Log("on payment" + product);
		var tl:TaskList = new TaskList();
		
		
		var loading:EZLoadingTask = TaskManager.Create("global.ui.loading") as EZLoadingTask;
		loading.time = 0.3;
		loading.alpha = 0.5;
		loading.text = _loadingText;
		 
		tl.push(loading);
		TaskManager.PushFront(loading, function(){
			_inputCamera.enabled = false;
		});
		TaskManager.PushBack(loading, function(){
			_inputCamera.enabled = true;
		});
		var pay:Task = this.paymentTask(product);
		tl.push(pay);
		
		var loaded:EZLoadedTask = TaskManager.Create("global.ui.loaded") as EZLoadedTask;
		TaskManager.PushFront(loaded, function(){
			var target:GameObject = GameObject.FindGameObjectWithTag("Ctrl");
			if(target){
				target.SendMessage("payment_over", SendMessageOptions.DontRequireReceiver);
			}
		
		});
		loaded.time = 0.3;  
		tl.push(loaded);
		TaskManager.PushBack(tl, function(){
			if(_paymentOver){
				_paymentOver(succeed_);
			}
		
		
		});
	
		TaskManager.Run(tl);
	}
	public function create(products:JsonData.ProductList){ 
		if(items_){
			for(var i:int = 0; i<items_.Length; ++i){
				GameObject.DestroyObject(items_[i].gameObject);
			}
		}
		items_ = null;
		 
		if(products && products.list){
			items_ = new EZShopDiamondCellView[products.list.Length]; 
		
			for(var j:int = 0; j<items_.Length; ++j){
				items_[j] = create();  
				var product:JsonData.ProductData = products.list[j];
				items_[j].setup(product, this.onPayment);
				items_[j].name = "Item"+j.ToString("D3");
			}
		}
		
		
	}
	public function close(){
		if(_title){
			_title.enabled = false; 
		}
		if(items_){
			for(var i:int = 0; i<items_.Length; ++i){
				items_[i].close();
			}
		}
		
		if(_box){
			_box.enabled = false;
		
		}
	}
	
	
	private function inTaskOne(object:GameObject):Task{
		var task:Task = new Task();
		var tp:GeekTweenPosition = null;
		task.init = function(){
			tp = GeekTweenPosition.Begin(object, 0.2f, object.transform.localPosition - Vector3(800, 0 ,0));
			tp.method = _inMethod;
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
		if(items_){
			Debug.LogWarning("Diamond Length is : " + items_.length);
			for(var i:int = 0; i<items_.length; ++i){
				var tl:TaskList = new TaskList();
				var wait:EZWaitTask = new EZWaitTask();
				wait.setAllTime((0.2/items_.length) *i);
				tl.push(wait);
				tl.push(inTaskOne(items_[i].gameObject));
				mt.push(tl);
			}
		}
		return mt;
	}
	
	
	public function openTask():Task{
		load();
		var tl:TaskList = new TaskList();
		TaskManager.PushFront(tl, function(){
			Debug.LogWarning("ppllaayy");
			_sound.play();
			this.open();
			Debug.Log("a");
			if(items_){
				for(var i:int = 0; i<items_.Length; ++i){
					Debug.Log("b" + i);
					items_[i].gameObject.transform.localPosition += Vector3(800, 0 , 0);
				}
			}
		});
		tl.push(this.inTask());
		return tl;
	}
	private function load(){
		if(!isloaded_){
			isloaded_ = true; 
			
			
		#if UNITY_IPHONE  && !UNITY_EDITOR
			this.paymentProducts(EZShopTable.GetInstance().products);
		#else
			var products:JsonData.ProductList = new JsonData.ProductList(); 
		 	products.list = new JsonData.ProductData[6];
		 	
			products.list[0] = JsonData.ProductData();
			products.list[0].setup(new Product("id", "title", "shuoming", 1, "$"));
			products.list[1] = JsonData.ProductData();
			products.list[1].setup(new Product("id", "title", "shuoming", 2, "$"));
			products.list[2] = JsonData.ProductData();
			products.list[2].setup(new Product("id", "title", "shuoming", 3, "$"));
			products.list[3] = JsonData.ProductData();
			products.list[3].setup(new Product("id", "title", "shuoming", 4, "$"));
			products.list[4] = JsonData.ProductData();
			products.list[4].setup(new Product("id", "title", "shuoming", 5, "$"));
			products.list[5] = JsonData.ProductData();
			products.list[5].setup(new Product("id", "title", "shuoming", 6, "$"));
			this.paymentProducts(products) ;
		#endif
		
		}
	
	}
	private function open(){ 
		_grid.Reposition(); 
		_draggable.ResetPosition();
		if(_title){
			_title.enabled = true;
		}
		if(_box){
			_box.enabled = true;
		
		}
		if(items_){
			for(var i:int = 0; i<items_.Length; ++i){
				 items_[i].open();
			} 
		}
		
		
	}  
	private var _products:JsonData.ProductList = null; 

	function paymentProducts(products:JsonData.ProductList)
	{
		_products = products;
		this.create(_products);
	}

	function paymentComplete(productID:String, receiptByte:byte[]){
		var receipt:String = System.Text.Encoding.Default.GetString(receiptByte);
		var table:EZShopTable = EZShopTable.GetInstance();
		
		var task:WebLoaderTask = table.payment(receipt); 
		TaskManager.PushBack(task, function(){ 
			
			var info:JsonData.PlayerInfo = task.data as JsonData.PlayerInfo;
			var warning:EZWarningTask = TaskManager.Create("global.ui.warning") as EZWarningTask;
			warning.addText(EZDictionary.LookUp("!payment_begin") + info.player.diamond.ToString() + EZDictionary.LookUp("!payment_end"));
			TaskManager.PushBack(warning, function(){
				succeed_ = true;
				process_ = false;
				
			});
			TaskManager.Run(warning);	
		});
		
		TaskManager.Run(task);
	}

	function paymentFailed(productID:String, description:String)
	{ 
		var warning:EZWarningTask = TaskManager.Create("global.ui.warning") as EZWarningTask;
		var message:String = EZTranscoding.Big5Gb2312(description);
		Debug.Log(description);
		Debug.Log(message);
		warning.addText(message);
		TaskManager.PushBack(warning, function(){
			succeed_ = false;
			process_ = false;
		});
		TaskManager.Run(warning);	
		//Debug.LogError("Failed payment: " + description);
	}

	function paymentCanceled(productID:String,  description:String)
	{ 
	
		var warning:EZWarningTask = TaskManager.Create("global.ui.warning") as EZWarningTask;
		var message:String = EZTranscoding.Big5Gb2312(description);
		Debug.Log(description);
		Debug.Log(message);
		warning.addText(message);
		TaskManager.PushBack(warning, function(){
			succeed_ = false;
			process_ = false;
		});
		TaskManager.Run(warning);	
		// process_ = false;
		//Debug.LogError("Cancel payment: " + description);
	}
	
	
	
	public function Start(){ 
#if UNITY_IPHONE && !UNITY_EDITOR  
	 		
		Payment.Complete += paymentComplete;
		Payment.Failed += paymentFailed;
		Payment.Canceled += paymentCanceled;
		
		
#endif	
		
	} 
	
	
	function OnDestroy(){
#if UNITY_IPHONE && !UNITY_EDITOR 
		Payment.Complete -= paymentComplete;
		Payment.Failed -= paymentFailed;
		Payment.Canceled -= paymentCanceled;	
#endif	
	}
	
	
}
