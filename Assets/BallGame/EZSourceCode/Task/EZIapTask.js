#pragma strict
#if UNITY_IPHONE || UNITY_STANDALONE_OSX
	class EZIapTask extends Task{
	
		private var nameList_:String[];
		private var products_:JsonData.ProductList = null;
		private var tableName_ :String = "game_iap";
		private var isOver_:boolean = false;
		public function set list(value:String[]){
			nameList_ = value;
		}
		public function get products():JsonData.ProductList{
			return products_;
		}
		public function EZIapTask(){
			super();
			this.init = initImpl;
			this.shutdown = shutdownImpl;
			this.isOver = isOverImpl;
		}
		private function initImpl(){
			
			Payment.Products += paymentProducts;
			isOver_ = false;
			
			Debug.Log("??heheh" + Payment.canMakePayment);
			if(Payment.canMakePayment){
				Payment.getProductInfo(nameList_);
			}else{
				Debug.Log("??nono");
				isOver_ = true;
			}
		}
		private function shutdownImpl(){
				Debug.Log("??xxx");
			Payment.Products -= paymentProducts;
		}
		
		
		
		function paymentProducts(products:Product[]){
			products_ = new JsonData.ProductList(); 
			products_.list = new JsonData.ProductData[products.Length];
			for(var i:int = 0; i<products.Length; ++i){
				var product:JsonData.ProductData = new  JsonData.ProductData();
				product.setup(products[i]);
				products_.list[i] = product;
			}
			Debug.Log("??paymentProducts");
			isOver_ = true;
			
		}
		
			
		
		private function isOverImpl():boolean{
			return isOver_;
		}
	
	}		
#else
		
	class EZIapTask extends Task{
		private var nameList_:String[];
		private var products_:JsonData.ProductList;
		
		public function set list(value:String[]){
			nameList_ = value;
		}
		public function get products():JsonData.ProductList{
			return products_;
		}
	}
#endif
	
