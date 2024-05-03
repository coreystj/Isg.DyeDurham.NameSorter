/*
 * Summary: This exception is mainly used during raw data processing.
 * If the data being processed has an excpetion, this will be the exception used.
 * Date: 2024-05-02
 * Author: Corey St-Jacques
 * 
 */

using System;

namespace Isg.DyeDurham.NameSorter.Lib.Exceptions
{

	[Serializable]
	public class ContentProcessException : Exception
	{
		public ContentProcessException() { }
		public ContentProcessException(string message) : base(message) { }
		public ContentProcessException(string message, Exception inner) : base(message, inner) { }
		protected ContentProcessException(
		  System.Runtime.Serialization.SerializationInfo info,
		  System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
	}
}
