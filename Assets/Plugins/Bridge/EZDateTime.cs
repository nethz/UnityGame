using UnityEngine;
using System.Collections;

using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;
public class EZDateTime{

	public static System.DateTime GetDateTime(double epoch){
		
		return new System.DateTime((long)(epoch * 10000000) +621355968000000000, DateTimeKind.Utc).ToLocalTime();
	}
}
