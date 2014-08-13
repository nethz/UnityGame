#pragma strict

public class EZShopDiamondManager extends GameBaseView{
	public var _cell:GameObject;
	public var _draggablePanel:UIDraggablePanel;
	public var _grid:UIGrid;
	
	private var cells_:EZShopDiamondCellView[];
	
	
	private function cteate(num:int){
		for(var i:int;i<num;++i){
			var cell:EZShopDiamondCellView = createCell();
			cell.transform.parent = this.transform;
			cell.transform.localScale = _cell.transform.localScale;
			cell.gameObject.SetActive(true);
			_grid.repositionNow = true;
		}
	}
	
	private function createCell():EZShopDiamondCellView{
		var obj:GameObject = GameObject.Instantiate(_cell);
		var cell:EZShopDiamondCellView = obj.GetComponent(EZShopDiamondCellView) as EZShopDiamondCellView;
		var drag:UIDragPanelContents = obj.GetComponent(UIDragPanelContents) as UIDragPanelContents;
		drag.draggablePanel = this._draggablePanel;
		return cell;
	}
	
}