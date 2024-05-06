/*
 * Summary: This exception is mainly used during raw data processing.
 * The data being cannot be invalid, such as binary data.
 * 
 * Date: 2024-05-02
 * Author: Corey St-Jacques
 * 
 */


using System;

namespace Isg.DyeDurham.NameSorter.Lib.Exceptions
{

	[Serializable]
	public class InvalidContentException : Exception
	{
		public InvalidContentException() { }
		public InvalidContentException(string message) : base(message) { }
		public InvalidContentException(string message, Exception inner) : base(message, inner) { }
		protected InvalidContentException(
		  System.Runtime.Serialization.SerializationInfo info,
		  System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
	}
}
