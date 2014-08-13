#pragma strict

public class EZShopBagManager extends GameBaseView{
	public var _cell:GameObject;
	public var _draggablePanel:UIDraggablePanel;
	private var _grid:UIGrid;
	
	private var cells_:EZShopBagCellView[];
	
	
	private function cteate(num:int){
		for(var i:int;i<num;++i){
			var cell:EZShopBagCellView = createCell();
			cell.transform.parent = this.transform;
			cell.transform.localScale = _cell.transform.localScale;
			cell.gameObject.SetActive(true);
			_grid.repositionNow = true;
		}
	}
	
	private function createCell():EZShopBagCellView{
		var obj:GameObject = GameObject.Instantiate(_cell);
		var cell:EZShopBagCellView = obj.GetComponent(EZShopBagCellView) as EZShopBagCellView;
		var drag:UIDragPanelContents = obj.GetComponent(UIDragPanelContents) as UIDragPanelContents;
		drag.draggablePanel = this._draggablePanel;
		return cell;
	}
}