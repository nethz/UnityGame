using UnityEngine;
using System.Collections;
using System.Collections.Generic;

#if UNITY_IPHONE || UNITY_STANDALONE_OSX
using System.Runtime.InteropServices;
#endif

public class Product
{
	public string ID { get; set; }
    public string Title { get; set; }
	public string Description { get; set; }
    public double Price { get; set; }
	public string Currency { get; private set; }
	
	public Product( string _ID, string _Title, string _Description, double _Price, string _Currency )
	{
		this.ID 			= _ID;
		this.Title 			= _Title;
		this.Description 	= _Description;
		this.Price 			= _Price;
		this.Currency		= _Currency;
	}
}

#if UNITY_IPHONE || UNITY_STANDALONE_OSX

public class Payment
{
	#region Declare a delegate type for button click
	
	public delegate void CompleteDelegate( string _ProductID, byte[] _Receipt );	
	public delegate void FailedDelegate( string _ProductID, string _Description );
	public delegate void CanceledDelegate( string _ProductID, string _Description );
	public delegate void ProductsDelegate( Product[] _Products );
	public delegate void RestoreFailedDelegate( string _Description );
	public delegate void RestoreFinishedDelegate();
	public delegate void RestoredDelegate( string _ProductID, byte[] _Receipt );
	
	#endregion
	
	#region Interface to native implementation
	
#if UNITY_IPHONE	
	[DllImport ("__Internal")]
	private static extern bool Payment_CanMakePayment();
	[DllImport ("__Internal")]
	private static extern bool Payment_MakePayment( string _ProductID );
	[DllImport ("__Internal")]
	private static extern bool Payment_GetProductInfo( System.IntPtr _ProductIDs, int _Count );	
	[DllImport ("__Internal")]
	private static extern void Payment_RestoreCompletedTransactions();	
#elif UNITY_STANDALONE_OSX
	[DllImport ("PaymentPluginOSX")]
	private static extern bool Payment_CanMakePayment();
	[DllImport ("PaymentPluginOSX")]
	private static extern bool Payment_MakePayment( string _ProductID );
	[DllImport ("PaymentPluginOSX")]
	private static extern bool Payment_GetProductInfo( System.IntPtr _ProductIDs, int _Count );	
	[DllImport ("PaymentPluginOSX")]
	private static extern void Payment_RestoreCompletedTransactions();	
#endif	
	
	#endregion
	
	#region Attributes
	
	static public event CompleteDelegate Complete;
	static public event FailedDelegate Failed;
	static public event CanceledDelegate Canceled;
	static public event ProductsDelegate Products;
	static public event RestoreFailedDelegate RestoreFailed;
	static public event RestoreFinishedDelegate RestoreFinished;
	static public event RestoredDelegate Restored;
	
	static private bool m_CanMakePayment = false;
	
	#endregion
	
	#region construction
	
	static Payment()
	{
		if (!Application.isEditor)
			m_CanMakePayment = Payment_CanMakePayment();
	}	
	
	#endregion
	
	#region public methods	
	
	static public bool canMakePayment { get { return m_CanMakePayment; } } 
	
	static public void makePayment( string _ProductID )
	{
		// make payment
		if ( !Application.isEditor )
			Payment_MakePayment( _ProductID );
		else
			OnComplete( _ProductID, new byte[1] );
	}
	
	static public void getProductInfo( string[] _ProductIDs )
	{
		if ( !Application.isEditor )
		{
			System.IntPtr productsIDs = ParamsToIntPtr( _ProductIDs );
			Payment_GetProductInfo( productsIDs, _ProductIDs.Length );
			FreeParamsIntPtr( productsIDs, _ProductIDs.Length );
		}
	}
	
	static public void restoreCompletedTransactions()
	{
		if ( !Application.isEditor )
			Payment_RestoreCompletedTransactions();
	}
	
	#endregion
	
	#region service events
	
	static void OnComplete( string _ProductID, byte[] _Receipt )
	{
		Debug.Log("OnComplete");
		
		if ( Complete != null )
			Complete( _ProductID, _Receipt );
	}
	
	static void OnFailed( string _ProductID, string _Description )
	{
		Debug.Log("OnFailed");
		if ( Failed != null )
			Failed( _ProductID, _Description );
	}
	
	static void OnCanceled( string _ProductID, string _Description )
	{
		Debug.Log("OnCanceled");
		if ( Canceled != null )
			Canceled( _ProductID, _Description );
	}	
	
	static void OnProducts( Product[] _Products )
	{
		if ( Products != null )
			Products( _Products );
	}
	
	static void OnRestoreFailed( string _Description )
	{
		if ( RestoreFailed != null )
			RestoreFailed( _Description );
	}
	
	static void OnRestoreFinished()
	{
		if ( RestoreFinished != null )
			RestoreFinished();
	}
	
	static void OnRestored( string _ProductID, byte[] _Receipt )
	{
		if ( Restored != null )
			Restored( _ProductID, _Receipt );
	}
	
	#endregion
	
	#region service methods	
	
	static System.IntPtr ParamsToIntPtr( string[] _params )
	{
		int numStrings = _params.Length;
		System.IntPtr[] inPointers = new System.IntPtr[ numStrings ];
		
		for ( int i = 0; i < numStrings; i++ )
			inPointers[i] = Marshal.StringToCoTaskMemAnsi( _params[i] );
		
		System.IntPtr result = Marshal.AllocCoTaskMem( System.IntPtr.Size * numStrings );
		Marshal.Copy( inPointers, 0, result, numStrings );
		return result;
	}
	
	static void FreeParamsIntPtr( System.IntPtr _params, int _Size )
	{
		int numStrings = _Size;
		System.IntPtr[] outPointers = new System.IntPtr[ numStrings ];
        Marshal.Copy( _params, outPointers, 0, numStrings );
		
		for ( int i = 0; i < _Size; i++ )
			Marshal.FreeCoTaskMem( outPointers[i] );
		
		Marshal.FreeCoTaskMem( _params );
	}
	
	#endregion
}

#endif
