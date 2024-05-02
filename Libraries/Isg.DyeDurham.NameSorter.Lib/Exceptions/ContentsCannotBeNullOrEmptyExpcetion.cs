using System;

namespace Isg.DyeDurham.NameSorter.Lib.Exceptions
{

	[Serializable]
	public class ContentsCannotBeNullOrEmptyExpcetion : Exception
	{
		public ContentsCannotBeNullOrEmptyExpcetion() { }
		public ContentsCannotBeNullOrEmptyExpcetion(string message) : base(message) { }
		public ContentsCannotBeNullOrEmptyExpcetion(string message, Exception inner) : base(message, inner) { }
		protected ContentsCannotBeNullOrEmptyExpcetion(
		  System.Runtime.Serialization.SerializationInfo info,
		  System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
	}
}
